import { UtilityManager } from "../../managers/utilityManager.js";
import { VrControl, VrControlOptions, VrControlsEvent } from "../common.js";
import { ControlTypeEnum, puma, div, createButton, IconClassicLight, createLabel, TextAlignEnum, createComboBox, ComboBoxTypeEnum, createScheduler, SchedulerViewEnum } from "../vr.js";
class MultiSchedulerOptions extends VrControlOptions {
  resources;
  datasource;
  dates;
  startTime;
  endTime;
  timeslotIntervalDuration;
  exportPdf;
  showNavigateButtons;
  maxDatesNumber;
  onTimeslotClick;
  onAvailabilityClick;
  onAppointmentClick;
  onNavigate;
}
class MultiScheduler extends VrControl {
  //#region Variables
  _resources;
  _datasource;
  _availabilities;
  _dates;
  _dictionaryDateScheduler;
  _cmbTimeslotIntervalDuration;
  //#endregion
  constructor(element, options) {
    if (options == null)
      options = new MultiSchedulerOptions();
    if (options.dates == null) options.dates = [];
    if (options.datasource == null) options.datasource = [];
    if (options.resources == null) options.resources = [];
    if (options.showNavigateButtons == null) options.showNavigateButtons = true;
    if (options.maxDatesNumber == null) options.maxDatesNumber = 6;
    if (options.timeslotIntervalDuration == null) options.timeslotIntervalDuration = 30;
    super(element, options, ControlTypeEnum.MultiScheduler);
    this._resources = options.resources;
    this._dates = options.dates;
    this._dictionaryDateScheduler = /* @__PURE__ */ new Map();
    this.element().style.cssText += "display: flex; flex-direction: column;";
    if (options.dates != null)
      this.dates(options.dates);
    if (options.datasource != null)
      this.datasource(options.datasource);
  }
  //#region Methods
  dates(dates) {
    if (dates != null && dates.length > 0) {
      let options = this.getOptions();
      this._dictionaryDateScheduler.clear();
      puma(this.element()).empty();
      dates = dates.slice(0, options.maxDatesNumber);
      let divDates = div(this.element(), { class: "vrMultiSchedulerDivDates", css: "display: flex; height: 22px;" });
      if (options.showNavigateButtons) {
        createButton({
          icon: IconClassicLight.ChevronLeft,
          cssContainer: "position: absolute; left: 10px; z-index: 9999999999999;",
          css: "border: none; background: none;",
          onClick: (e) => {
            if (options.onNavigate != null) {
              let navigateEvent = new MultiSchedulerNavigateEvent();
              navigateEvent.sender = this;
              navigateEvent.action = 1;
              navigateEvent.dates = this.dates();
              options.onNavigate(navigateEvent);
            }
          }
        }, divDates);
        createButton({
          icon: IconClassicLight.ChevronRight,
          cssContainer: "position: absolute; right: 10px; z-index: 9999999999999;",
          css: "border: none; background: none;",
          onClick: (e) => {
            if (options.onNavigate != null) {
              let navigateEvent = new MultiSchedulerNavigateEvent();
              navigateEvent.sender = this;
              navigateEvent.action = 0;
              navigateEvent.dates = this.dates();
              options.onNavigate(navigateEvent);
            }
          }
        }, divDates);
      }
      let widthPercentage = 100 / dates.length;
      for (let i = -1; i < dates.length; i++) {
        let lblDate = createLabel({
          align: TextAlignEnum.Center,
          class: "vrMultiSchedulerLblDate",
          css: "width: 100%;",
          cssContainer: (i == -1 ? "width: 63px; border-right: solid 1px #CCC; padding-left: 0px; padding-right: 0px;" : "border-right: solid 1px #CCC; width: " + widthPercentage + "%; padding-left: 5px; padding-right: 5px;") + "text-align: left; background-color: #f0f0f0; border-bottom: solid 1px #CCC; border-top: solid 1px #CCC;"
        }, divDates);
        if (i == -1) {
          let divTimeslotIntervalDuration = puma("<div>").vrPrependToPuma(lblDate.container())[0];
          divTimeslotIntervalDuration.classList.add("vrMultiSchedulerTimeslotIntervalDuration");
          this._cmbTimeslotIntervalDuration = createComboBox({
            mode: ComboBoxTypeEnum.DropDown,
            value: options.timeslotIntervalDuration,
            cssContainer: "width: 100%; top: 0px; left: 0px; height: 21px; border-right: solid 1px #CCC;",
            css: "width: Calc(100% - 6px); border-bottom-right-radius: 0px; border-bottom-left-radius: 0px; padding-left: 6px; padding-right: 0px; text-align: left; height: 20px; border-top-right-radius: 0px; border-top-left-radius: 0px; background-color: #f0f0f0;border-top: 0px; border-bottom: 0px; top: 0px; position: absolute; border-right: solid 1px #CCC;",
            popupSettings: { width: 50 },
            width: 60,
            items: [
              { text: "5 min", value: "5" },
              { text: "10 min", value: "10" },
              { text: "15 min", value: "15" },
              { text: "25 min", value: "25" },
              { text: "30 min", value: "30" },
              { text: "60 min", value: "60" }
            ],
            onAfterChange: (e) => {
              this.timeslotInterval(e.value);
              this.rebind();
            }
          }, divTimeslotIntervalDuration);
        } else {
          let day = dates[i];
          let dateString = day.vrToLongDateString();
          lblDate.value(dateString);
        }
      }
      div(divDates, { class: "vrMultiSchedulerDivBorderOverflow", css: "min-width: 17px; background-color: #f0f0f0; border-bottom: solid 1px #CCC;" });
      let divSchedulers = div(this.element(), { class: "vrMultiSchedulerDivSchedulers", css: "display: flex; overflow-y: auto;" });
      for (let i = -1; i < dates.length; i++) {
        let date = i == -1 ? /* @__PURE__ */ new Date() : dates[i];
        date.setHours(0, 0, 0, 0);
        let scheduler = createScheduler({
          addToControlList: false,
          resources: this._resources,
          views: [{ type: SchedulerViewEnum.Day, selected: true }],
          date,
          cssContainer: "width: " + (i == -1 ? "63px;" : widthPercentage + "%;"),
          startTime: options.startTime,
          endTime: options.endTime,
          timeColumn: i == -1,
          timeslotIntervalDuration: options.timeslotIntervalDuration,
          height: "auto",
          exportPdf: options.exportPdf,
          showHeader: this._resources.length > 1,
          showToolbar: false,
          editable: {
            move: false,
            resize: false
          },
          onTimeslotClick: options.onTimeslotClick,
          onAvailabilityClick: options.onAvailabilityClick,
          onAppointmentClick: options.onAppointmentClick
        }, divSchedulers);
        puma(scheduler.container()).find(".vrSchedulerDivContent")[0].style.cssText += "overflow-y: hidden !important;";
        if (!this._dictionaryDateScheduler.has(date))
          this._dictionaryDateScheduler.set(date, scheduler);
      }
      this.adaptHeight();
      this.fixWidth();
      this._dates = dates;
    }
    return this._dates;
  }
  datasource(datasource) {
    if (datasource != null) {
      this._datasource = datasource;
      this.drawData(datasource, (scheduler, items) => {
        scheduler.datasource(items);
      });
    }
    return this._datasource;
  }
  availabilities(availabilities) {
    if (availabilities != null) {
      this._availabilities = availabilities;
      this.drawData(availabilities, (scheduler, items) => {
        scheduler.availabilities(items);
      });
    }
    return this._availabilities;
  }
  drawData(datasource, callback) {
    let newDatasource = [];
    for (let data of datasource) {
      let overlappedList = null;
      if (data.overlappedList != null) {
        overlappedList = data.overlappedList;
        data.overlappedList = void 0;
      }
      let newData = UtilityManager.duplicate(data);
      let newDataDate = new Date(newData.start);
      newDataDate.setHours(0, 0, 0, 0);
      newData.groupingField = newDataDate;
      newData.overlappedList = overlappedList;
      newDatasource.push(newData);
    }
    let datasourceGrouped = newDatasource.vrGroupBy((k) => k.groupingField);
    for (let keyDate in datasourceGrouped) {
      let schedulerDataList = datasourceGrouped[keyDate];
      let date = new Date(keyDate);
      date.setHours(0, 0, 0, 0);
      this._dictionaryDateScheduler.forEach((value, key) => {
        if (Date.vrEquals(date, key)) {
          let scheduler = this._dictionaryDateScheduler.get(key);
          if (scheduler != null)
            callback(scheduler, schedulerDataList);
        }
      });
    }
  }
  resources(resources) {
    if (resources != null) {
      this._resources = resources;
      this.rebind();
    }
    return this._resources;
  }
  startTime() {
    return this.getOptions().startTime;
  }
  endTime() {
    return this.getOptions().endTime;
  }
  timeslotInterval(timeslotIntervalDuration) {
    let options = this.getOptions();
    if (timeslotIntervalDuration != null) {
      options.timeslotIntervalDuration = timeslotIntervalDuration;
      this._cmbTimeslotIntervalDuration.value(timeslotIntervalDuration, false);
      this._dictionaryDateScheduler.forEach((value, key) => {
        let scheduler = this._dictionaryDateScheduler.get(key);
        if (scheduler != null)
          scheduler.timeslotInterval(timeslotIntervalDuration);
      });
    }
    return options.timeslotIntervalDuration;
  }
  rebind() {
    this.dates(this._dates);
    this.datasource(this._datasource);
    this.availabilities(this._availabilities);
    this.adaptHeight();
    this.fixWidth();
  }
  adaptHeight() {
    let divContent = puma(this.container()).find(".vrMultiSchedulerDivSchedulers")[0];
    let options = this.getOptions();
    let height = 0;
    if (options.height == null) {
      let multiSchedulerOffset = puma(this.container()).offset().top;
      let contentHeight = window.innerHeight - multiSchedulerOffset;
      let divDatesHeight = puma(this.container()).find(".vrMultiSchedulerDivDates").outerHeight();
      height = contentHeight - divDatesHeight;
    } else
      height = options.height;
    puma(divContent).height(height);
  }
  fixWidth() {
    let divScrollable = puma(this.container()).find(".vrMultiSchedulerDivSchedulers")[0];
    if (divScrollable != null) {
      if (divScrollable.scrollHeight > divScrollable.clientHeight && divScrollable.clientHeight > 0)
        puma(this.container()).find(".vrMultiSchedulerDivBorderOverflow").show();
      else
        puma(this.container()).find(".vrMultiSchedulerDivBorderOverflow").hide();
    }
  }
  getOptions() {
    return this.options();
  }
  //#endregion
}
class MultiSchedulerNavigateEvent extends VrControlsEvent {
  sender;
  action;
  dates;
}
export {
  MultiScheduler,
  MultiSchedulerOptions
};
//# sourceMappingURL=multiScheduler.js.map
