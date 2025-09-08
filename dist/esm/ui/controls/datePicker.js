import { VrControl, VrControlOptions, VrControlsEvent } from "../common.js";
import { DefaultDayEnum, DateModeEnum, DateDepthEnum, DateFormatEnum, ControlTypeEnum, puma, PositionEnum, IconClassicLight, KeyEnum, createCalendar, createLabel, notify, shadowRoot } from "../vr.js";
import { UtilityManager } from "../../managers/utilityManager.js";
class DatePickerOptions extends VrControlOptions {
  defaultDay;
  mode;
  value;
  min;
  max;
  timeInterval;
  format;
  todayLabel;
  otherMonthDays;
  tooltip;
  depth;
  nullable;
  popupSettings;
  placeholder;
}
class DatePicker extends VrControl {
  _value;
  _currentCursorPosition;
  _popup;
  _justOpened;
  constructor(element, options) {
    if (options == null)
      options = new DatePickerOptions();
    if (options.defaultDay == null) options.defaultDay = DefaultDayEnum.First;
    if (options.mode == null) options.mode = DateModeEnum.Date;
    if (options.todayLabel == null) options.todayLabel = true;
    if (options.otherMonthDays == null) options.otherMonthDays = true;
    if (options.depth == null) options.depth = DateDepthEnum.Day;
    if (options.nullable == null) options.nullable = true;
    if (options.format == null) {
      switch (options.depth) {
        case DateDepthEnum.Day:
          options.format = DateFormatEnum.ShortDate;
          break;
        case DateDepthEnum.Month:
          options.format = DateFormatEnum.Month;
          break;
        case DateDepthEnum.Year:
          options.format = DateFormatEnum.Year;
          break;
        default:
          options.format = DateFormatEnum.ShortDate;
          break;
      }
    }
    if (options.timeInterval == null)
      options.timeInterval = 15;
    if (options.mode == DateModeEnum.Time) {
      if (options.width == null)
        options.width = 92;
      if (options.min == null) {
        let defaultDateMin = /* @__PURE__ */ new Date();
        defaultDateMin.setHours(6, 0);
        options.min = defaultDateMin;
      }
      if (options.max == null) {
        let defaultDateMax = /* @__PURE__ */ new Date();
        defaultDateMax.setHours(23, 15);
        options.max = defaultDateMax;
      }
    } else {
      if (options.min == null) {
        let defaultDateMin = Date.MIN_VALUE;
        defaultDateMin.setHours(6, 0);
        options.min = defaultDateMin;
      }
      if (options.max == null) {
        let defaultDateMax = Date.MAX_VALUE;
        defaultDateMax = defaultDateMax.vrAddDays(-1);
        defaultDateMax.setHours(23, 15);
        options.max = defaultDateMax;
      }
      if (options.mode == DateModeEnum.DateTime && options.width == null)
        options.width = 180;
    }
    super(element, options, ControlTypeEnum.DatePicker);
    this._currentCursorPosition = 0;
    puma(element).attr("type", "text");
    if (options.label != null && options.labelSettings.position == PositionEnum.Top)
      this.element().style.cssText += "padding-left: 0px !important; width: calc(100% - 12px) !important;";
    let pickerIcon = null;
    switch (options.mode) {
      case DateModeEnum.Date:
        pickerIcon = UtilityManager.createIcon(IconClassicLight.Calendar);
        break;
      case DateModeEnum.Time:
        pickerIcon = UtilityManager.createIcon(IconClassicLight.Clock);
        break;
      case DateModeEnum.DateTime:
        {
          let divPickerIcon = puma("<div class='vrDivPickerDateTimeIcon'></div>").vrAppendToPuma(this.container())[0];
          let pickerIcon2 = UtilityManager.createIcon(IconClassicLight.Calendar);
          puma(divPickerIcon).vrAppendPuma(pickerIcon2);
          puma(divPickerIcon).click(() => {
            if (!this.enabled())
              return;
            this.close();
            this.openPopupDatePicker();
          });
          if (options.label != null && options.labelSettings.position == PositionEnum.Top)
            divPickerIcon.style.cssText += "bottom: 1px; top: inherit;";
          let divPickerTimeIcon = puma("<div class='vrDivPickerIcon'></div>").vrAppendToPuma(this.container())[0];
          let pickerTimeIcon = UtilityManager.createIcon(IconClassicLight.Clock);
          puma(divPickerTimeIcon).vrAppendPuma(pickerTimeIcon);
          puma(divPickerTimeIcon).click((e) => {
            if (!this.enabled())
              return;
            this.close();
            this.openPopupTimePicker();
          });
          if (options.label != null && options.labelSettings.position == PositionEnum.Top)
            divPickerTimeIcon.style.cssText += "bottom: 1px; top: inherit;";
        }
        break;
    }
    if (pickerIcon != null) {
      let divPickerIcon = puma("<div class='vrDivPickerIcon'></div>").vrAppendToPuma(this.container())[0];
      if (options.label != null && options.labelSettings.position == PositionEnum.Top)
        divPickerIcon.style.cssText += "bottom: 1px; top: inherit;";
      puma(divPickerIcon).vrAppendPuma(pickerIcon);
      puma(divPickerIcon).click(() => {
        if (!this.enabled())
          return;
        if (puma(this._popup).is(":visible"))
          this.close();
        else
          this.open();
      });
    }
    if (options.tooltip != null)
      puma(this.element()).attr("title", options.tooltip);
    if (options.placeholder != null)
      this.placeholder(options.placeholder);
    puma(this.element()).keyup((e) => {
      let value = e.target.value;
      if (value == "") {
        this.formatDateInput(value);
        e.preventDefault();
        return;
      }
      if (e.key == KeyEnum.Enter) {
        this.formatDateInput(e.target.value);
        if (options.onEnterKey != null)
          options.onEnterKey();
      } else {
        if (options.onKeyUp != null) {
          let event = new DatePickerKeyUpEvent();
          event.sender = this;
          event.text = e.target.value;
          event.key = e.key;
          event.shiftKey = e.shiftKey;
          event.altKey = e.altKey;
          event.ctrlKey = e.ctrlKey;
          event.enterKey = e.key == KeyEnum.Enter;
          event.backSpaceKey = e.key == KeyEnum.Backspace;
          event.tabKey = e.key == KeyEnum.Tab;
          options.onKeyUp(event);
        }
      }
    });
    puma(this.element()).blur((e) => {
      let value = this._value != null ? new Date(this._value) : null;
      this._value = this.formatDateInput(e.target.value, true);
      if (this._value != null)
        this.formatValue();
      if (!UtilityManager.equals(value, this._value)) {
        let changingEvent = new DatePickerChangingEvent();
        if (options.onBeforeChange != null) {
          changingEvent.sender = this;
          changingEvent.value = this._value != null ? new Date(this._value) : null;
          changingEvent.previousValue = value;
          options.onBeforeChange(changingEvent);
          if (changingEvent.isDefaultPrevented())
            return;
        }
        this.change();
      }
      if (options.onBlur != null) {
        let event = new DatePickerBlurEvent();
        event.sender = this;
        options.onBlur(event);
      }
    });
    puma(this.element()).click((e) => this._currentCursorPosition = e.target.selectionStart);
    puma(this.element()).focus((e) => {
      this.element().select();
      if (options.onFocus != null) {
        let event = new DatePickerFocusEvent();
        event.sender = this;
        options.onFocus(event);
      }
    });
    puma(element).keydown((e) => {
      let cursorStartPosition = e.target.selectionStart;
      if (cursorStartPosition != this._currentCursorPosition)
        this._currentCursorPosition = cursorStartPosition;
      if (e.key == KeyEnum.ArrowRight)
        this._currentCursorPosition = cursorStartPosition + 1;
      else if (e.key == KeyEnum.ArrowLeft)
        this._currentCursorPosition = cursorStartPosition - 1;
      else if (e.key == KeyEnum.ArrowUp) {
        if (this.value() != null) {
          if (this._currentCursorPosition >= 0 && this._currentCursorPosition <= 2)
            this.value(this.value().vrAddDays(1));
          else if (this._currentCursorPosition >= 3 && this._currentCursorPosition <= 5)
            this.value(this.value().vrAddMonths(1));
          else if (this._currentCursorPosition >= 6)
            this.value(this.value().vrAddYears(1));
        }
      } else if (e.key == KeyEnum.ArrowDown) {
        if (this.value() != null) {
          if (this._currentCursorPosition >= 0 && this._currentCursorPosition <= 2)
            this.value(this.value().vrAddDays(-1));
          else if (this._currentCursorPosition >= 3 && this._currentCursorPosition <= 5)
            this.value(this.value().vrAddMonths(-1));
          else if (this._currentCursorPosition >= 6)
            this.value(this.value().vrAddYears(-1));
        }
      }
      if (e.key == KeyEnum.ArrowRight || e.key == KeyEnum.ArrowLeft || e.key == KeyEnum.ArrowUp || e.key == KeyEnum.ArrowDown) {
        this.updateCursorPosition();
        e.preventDefault();
      }
      if (options.onKeyDown != null) {
        let event = new DatePickerKeyDownEvent();
        event.sender = this;
        event.key = e.key;
        event.shiftKey = e.shiftKey;
        event.altKey = e.altKey;
        event.ctrlKey = e.ctrlKey;
        event.enterKey = e.key == KeyEnum.Enter;
        event.backSpaceKey = e.key == KeyEnum.Backspace;
        event.tabKey = e.key == KeyEnum.Tab;
        options.onKeyDown(event);
      }
    });
    if (options.value != null)
      this.value(options.value, false);
    window.addEventListener("click", (e) => {
      if (puma(this._popup).is(":visible") && !puma(this._popup)[0].contains(e.target) && !puma(this.container())[0].contains(e.target) && !this._justOpened)
        this.close();
    });
    let baseListener = shadowRoot() != null ? shadowRoot() : document;
    baseListener.addEventListener("scroll", (e) => {
      if (!puma(e.target).hasClass("vrDivPickerPopup") && puma(this._popup).is(":visible"))
        this.close();
    }, true);
  }
  //#region Methods
  close() {
    puma(this._popup).remove();
    this._popup = null;
  }
  open() {
    if (!this.enabled())
      return;
    if (this._popup == null)
      this._popup = puma("<div class='vrDivPickerPopup vrPopup' id='" + this.element().id + "_divPopup'></div>").vrAppendToPuma(shadowRoot() != null ? shadowRoot() : document.body)[0];
    let options = this.getOptions();
    switch (options.mode) {
      case DateModeEnum.Date:
      case DateModeEnum.DateTime:
        this.openPopupDatePicker();
        break;
      case DateModeEnum.Time:
        this.openPopupTimePicker();
        break;
    }
    this._justOpened = true;
    window.setTimeout(() => this._justOpened = false, 500);
  }
  formatDateInput(inputText, onlyFormat = false) {
    let options = this.getOptions();
    switch (options.mode) {
      case DateModeEnum.Date:
        return this.formatInputDatePicker(inputText, onlyFormat);
      case DateModeEnum.DateTime:
        return this.formatInputDateTimePicker(inputText);
      case DateModeEnum.Time:
        return this.formatInputTimePicker(inputText, onlyFormat);
    }
    return null;
  }
  placeholder(value) {
    if (value != null)
      this.element().placeholder = value;
    return this.element().placeholder;
  }
  //#region DatePicker
  openPopupDatePicker() {
    let options = this.getOptions();
    if (this._popup == null)
      this._popup = puma("<div class='vrDivPickerPopup vrPopup' id='" + this.element().id + "_divPopup'></div>").vrAppendToPuma(shadowRoot() != null ? shadowRoot() : document.body)[0];
    puma(this._popup).removeClass("timePickerPopup");
    puma(this._popup).addClass("datePickerPopup");
    createCalendar({
      value: this.value() != null ? new Date(this.value().toString()) : void 0,
      dateSlotWidth: 30,
      depth: options.depth,
      onAfterChange: (e) => {
        this.close();
        if (e.value != null) {
          let actualHours = this.value() != null ? this.value().getHours() : options.mode == DateModeEnum.DateTime ? (/* @__PURE__ */ new Date()).getHours() : 0;
          let actualMinutes = this.value() != null ? this.value().getMinutes() : options.mode == DateModeEnum.DateTime ? (/* @__PURE__ */ new Date()).getMinutes() : 0;
          let dateToSelect = new Date(e.value.getFullYear(), e.value.getMonth(), e.value.getDate(), actualHours, actualMinutes);
          this.value(dateToSelect);
        }
      }
    }, this._popup);
    super.settingPopup(this._popup, options.popupSettings);
  }
  formatInputDatePicker(inputText, onlyFormat = false) {
    let options = this.getOptions();
    if (inputText == null || inputText == "") {
      if (!options.nullable) {
        UtilityManager.interval(() => puma(this.element()).toggleClass("errorInput"), 200, 800);
        this.value(this.value(), false);
        return;
      }
      this._value = null;
      if (!onlyFormat)
        this.change();
      return;
    }
    let todayYear = (/* @__PURE__ */ new Date()).getFullYear();
    let todayMonth = (/* @__PURE__ */ new Date()).getMonth();
    let specialDates = [
      "oggi",
      "adesso",
      "ieri",
      "domani",
      "dopodomani",
      "natale",
      "vettore",
      "pumo",
      "pumetta",
      "pumettina",
      "sanvalentino",
      "fineanno",
      "inizioanno"
    ];
    if (specialDates.includes(inputText.toLowerCase())) {
      switch (inputText.toLowerCase()) {
        case "oggi":
          {
            let today = /* @__PURE__ */ new Date();
            today.setHours(0, 0);
            this.value(today, !onlyFormat);
          }
          break;
        case "adesso":
          this.value(/* @__PURE__ */ new Date(), !onlyFormat);
          break;
        case "ieri":
          this.value((/* @__PURE__ */ new Date()).vrAddDays(-1), !onlyFormat);
          break;
        case "domani":
          this.value((/* @__PURE__ */ new Date()).vrAddDays(1), !onlyFormat);
          break;
        case "dopodomani":
          this.value((/* @__PURE__ */ new Date()).vrAddDays(2), !onlyFormat);
          break;
        case "natale":
          this.value(new Date(todayYear, 11, 25), !onlyFormat);
          break;
        case "vettore":
          this.value(new Date(2013, 0, 1), !onlyFormat);
          break;
        case "doctolib":
          this.value(new Date(2022, 9, 1), !onlyFormat);
          break;
        case "pumo":
          {
            this.value(new Date(1993, 9, 10), !onlyFormat);
          }
          break;
        case "pumetta":
          {
            this.value(new Date(1992, 6, 9), !onlyFormat);
          }
          break;
        case "pumettina":
          {
            this.value(new Date(2022, 8, 24), !onlyFormat);
          }
          break;
        case "sanvalentino":
          this.value(new Date(todayYear, 1, 14), !onlyFormat);
          break;
        case "fineanno":
          this.value(new Date(todayYear, 1, 31), !onlyFormat);
          break;
        case "inizioanno":
          this.value(new Date(todayYear, 2, 1), !onlyFormat);
          break;
        case "owner":
          {
            this.value(new Date(1993, 9, 10), !onlyFormat);
          }
          break;
      }
      return this.value();
    }
    let monthNumber = UtilityManager.getMonthNumberByName(inputText.toLowerCase());
    if (monthNumber != -1) {
      this.value(new Date(todayYear, monthNumber, this.getOptions().defaultDay == DefaultDayEnum.First ? 1 : Date.vrGetLastDayOfMonthByDate(new Date(todayYear, monthNumber, 1)).getDate()), !onlyFormat);
      return this.value();
    }
    let inputTextArray = inputText.toLowerCase().split(" ");
    if (inputTextArray.length > 1) {
      let monthNumber2 = UtilityManager.getMonthNumberByName(inputTextArray[0]);
      if (monthNumber2 != -1) {
        if (inputTextArray[1].length == 2 || inputTextArray[1].length == 4) {
          let year2 = parseInt(inputTextArray[1]);
          if (inputTextArray[1].length == 2)
            year2 = this.getFinalYear(inputTextArray[1]);
          let day2 = this.getOptions().defaultDay == DefaultDayEnum.First ? 1 : Date.vrGetLastDayOfMonthByDate(new Date((/* @__PURE__ */ new Date()).getFullYear(), monthNumber2, 1)).getDate();
          this.value(new Date(year2, monthNumber2, day2), !onlyFormat);
          return this.value();
        }
      }
    }
    if (inputText.includes("/") || inputText.includes("-") || inputText.includes(",") || inputText.includes(".")) {
      let splittedDate = [];
      if (inputText.includes("/"))
        splittedDate = inputText.split("/");
      else if (inputText.includes("-"))
        splittedDate = inputText.split("-");
      else if (inputText.includes(","))
        splittedDate = inputText.split(",");
      else if (inputText.includes("."))
        splittedDate = inputText.split(".");
      let day2 = splittedDate[0];
      if (day2 == null)
        day2 = String(-1);
      day2 = String(day2.vrGetNumericPart());
      let month2 = splittedDate[1];
      if (month2 == null)
        month2 = String((/* @__PURE__ */ new Date()).getMonth());
      month2 = String(month2.vrGetNumericPart());
      let year2 = splittedDate[2];
      if (year2 == null)
        year2 = String((/* @__PURE__ */ new Date()).getFullYear());
      year2 = String(year2.vrGetNumericPart());
      year2 = String(this.getFinalYear(year2));
      let dateToReturn2 = new Date(Number(year2), Number(month2) - 1, Number(day2));
      if (dateToReturn2 != null && Date.vrIsValidDate(dateToReturn2) && Number(month2) >= 1 && Number(month2) <= 12 && dateToReturn2.getMonth() + 1 == Number(month2)) {
        if (this.value() == null || !Date.vrEquals(this.value(), dateToReturn2))
          this.value(dateToReturn2, !onlyFormat);
        else
          this.formatValue();
      } else {
        UtilityManager.interval(() => puma(this.element()).toggleClass("errorInput"), 200, 800);
        this.clear();
      }
      return dateToReturn2;
    }
    let originalInput = inputText;
    inputText = inputText.replace(/[^\w\s]/gi, "");
    inputText = inputText.replace(/\s/g, "");
    let inputTextNumeric = Number(inputText);
    let day = 0;
    let month = 0;
    let year = 0;
    let dateToReturn = null;
    let yearStringToday = (/* @__PURE__ */ new Date()).getFullYear().toString();
    let todayYearFull = parseInt(yearStringToday.substr(0, 2) + "00");
    if (inputText.length == 1 || inputText.length == 2) {
      if (originalInput.length == 3) {
        let regexForSpecialChars = /^[A-Za-z0-9 ]+$/;
        let hasNotSeparator = regexForSpecialChars.test(originalInput);
        if (!hasNotSeparator) {
          day = Number(originalInput[0]);
          month = Number(originalInput[2]) - 1;
          year = todayYear;
        }
      } else {
        day = Number(inputText);
        month = todayMonth;
        year = todayYear;
      }
    } else if (inputText.length == 3) {
      day = Number(inputText[0]);
      month = Number(inputText[1] + inputText[2]) - 1;
      if (month > 11) {
        day = Number(inputText[0] + inputText[1]);
        month = Number(inputText[2]) - 1;
      }
      year = todayYear;
    } else if (inputText.length == 4) {
      let yearString = inputText[2] + inputText[3];
      let yearNumber = Number(yearString);
      if (yearNumber <= 12 && Number(inputText[0] + inputText[1]) <= 31) {
        day = Number(inputText[0] + inputText[1]);
        month = Number(inputText[2] + inputText[3]) - 1;
        year = todayYear;
      } else {
        let finalYear = this.getFinalYear(yearString);
        if (inputTextNumeric >= todayYearFull && inputTextNumeric <= (/* @__PURE__ */ new Date()).getFullYear()) {
          day = 1;
          month = 0;
          year = finalYear;
          if (this.getOptions().defaultDay == DefaultDayEnum.Last) {
            day = 31;
            month = 11;
          }
        } else {
          day = Number(inputText[0]);
          month = Number(inputText[1]) - 1;
          year = finalYear;
        }
      }
    } else if (inputText.length == 5) {
      let yearString = inputText[3] + inputText[4];
      let finalYear = this.getFinalYear(yearString);
      day = Number(inputText[0]);
      month = Number(inputText[1] + inputText[2]) - 1;
      if (month > 11) {
        day = Number(inputText[0] + inputText[1]);
        month = Number(inputText[2]) - 1;
      }
      year = finalYear;
    } else if (inputText.length == 6) {
      let yearString = inputText[4] + inputText[5];
      let finalYear = this.getFinalYear(yearString);
      day = Number(inputText[0] + inputText[1]);
      month = Number(inputText[2] + inputText[3]) - 1;
      if (month > 11) {
        day = Number(inputText[0]);
        month = Number(inputText[1]) - 1;
        finalYear = Number(inputText[2] + inputText[3] + inputText[4] + inputText[5]);
      }
      year = finalYear;
    } else if (inputText.length == 7) {
      let finalYear = Number(inputText[3] + inputText[4] + inputText[5] + inputText[6]);
      day = Number(inputText[0]);
      month = Number(inputText[1] + inputText[2]) - 1;
      if (month > 11) {
        day = Number(inputText[0] + inputText[1]);
        month = Number(inputText[2]) - 1;
      }
      year = finalYear;
    } else if (inputText.length == 8) {
      day = Number(inputText[0] + inputText[1]);
      month = Number(inputText[2] + inputText[3]) - 1;
      year = Number(inputText[4] + inputText[5] + inputText[6] + inputText[7]);
    }
    dateToReturn = new Date(year, month, day);
    if (onlyFormat) {
      if (dateToReturn != null && Date.vrIsValidDate(dateToReturn) && Number(month) >= 0 && Number(month) <= 11 && dateToReturn.getMonth() == Number(month))
        return dateToReturn;
      else {
        UtilityManager.interval(() => puma(this.element()).toggleClass("errorInput"), 200, 800);
        this.clear();
      }
    } else {
      if (dateToReturn != null && Date.vrIsValidDate(dateToReturn) && Number(month) >= 0 && Number(month) <= 11 && dateToReturn.getMonth() == Number(month)) {
        if (this.value() == null || !Date.vrEquals(this.value(), dateToReturn))
          this.value(dateToReturn);
        else
          this.formatValue();
      } else {
        UtilityManager.interval(() => puma(this.element()).toggleClass("errorInput"), 200, 800);
        this.clear();
      }
    }
  }
  //#endregion
  //#region TimePicker
  openPopupTimePicker() {
    let value = this.value();
    let hours = value != null ? value.getHours() : 0;
    let minutes = value != null ? value.getMinutes() : 0;
    if (this._popup == null)
      this._popup = puma("<div class='vrDivPickerPopup vrPopup' id='" + this.element().id + "_divPopup'></div>").vrAppendToPuma(shadowRoot() != null ? shadowRoot() : document.body)[0];
    puma(this._popup).removeClass("datePickerPopup");
    puma(this._popup).addClass("timePickerPopup");
    super.settingPopup(this._popup, { right: true });
    let options = this.getOptions();
    let tempMin = new Date(options.min);
    let tempMax = new Date(options.max);
    tempMin.setFullYear(1900, 1, 1);
    tempMax.setFullYear(1900, 1, 1);
    let differenceBetweenMinMax = Date.vrDifferenceBetweenDatesInMinutes(tempMin, tempMax);
    let interval = Math.round(differenceBetweenMinMax / options.timeInterval);
    let topPosition = 0;
    let time = new Date(options.min);
    for (let i = 0; i < interval; i++) {
      let text = time.toTimeString();
      let textHours = Number(text.split(":")[0]);
      let textMinutes = Number(text.split(":")[1]);
      let selected = hours == textHours && minutes == textMinutes;
      let label = this.createTimeLabel(text, selected);
      time.vrAddMinutes(options.timeInterval);
      if (hours == textHours) {
        if (minutes % options.timeInterval != 0 && minutes > textMinutes && minutes < textMinutes + options.timeInterval) {
          selected = true;
          text = String(hours).padStart(2, "0") + ":" + String(minutes).padStart(2, "0");
          label = this.createTimeLabel(text, selected);
        }
      }
      if (selected)
        topPosition = puma(label.element()).offset().top - puma(this._popup).offset().top - puma(this._popup).height() / 2;
    }
    if (topPosition < 0) topPosition = 0;
    this._popup.scrollTo(0, topPosition);
  }
  createTimeLabel(text, selected = false) {
    let label = createLabel(
      {
        text,
        width: "Calc(100% - 10px)",
        onClick: (e) => {
          let value = label.value();
          let hours = value.split(":")[0];
          let minutes = value.split(":")[1];
          let actualYear = this.value() != null ? this.value().getFullYear() : (/* @__PURE__ */ new Date()).getFullYear();
          let actualMonth = this.value() != null ? this.value().getMonth() : (/* @__PURE__ */ new Date()).getMonth();
          let actualDays = this.value() != null ? this.value().getDate() : (/* @__PURE__ */ new Date()).getDate();
          this.close();
          let dateToSelect = new Date(actualYear, actualMonth, actualDays, Number(hours), Number(minutes));
          this.value(dateToSelect);
        },
        css: "cursor: pointer;",
        cssContainer: "padding: 5px; padding-top: 2px; cursor: pointer; border-bottom: solid 1px #DCDCDC;" + (selected ? "background-color: #51B3E1; color: #FFF;" : "")
      },
      this._popup
    );
    return label;
  }
  formatInputTimePicker(inputText, onlyFormat = false) {
    let options = this.getOptions();
    if (inputText == null || inputText == "") {
      if (!options.nullable) {
        UtilityManager.interval(() => puma(this.element()).toggleClass("errorInput"), 200, 800);
        this.value(this.value(), false);
        return;
      }
      this._value = null;
      this.change();
      return;
    }
    inputText = inputText.replace(/[^\w\s]/gi, "");
    inputText = inputText.replace(/\s/g, "");
    let inputTextNumeric = Number(inputText);
    let today = /* @__PURE__ */ new Date();
    today.setHours(0, 0);
    switch (inputText.toLowerCase()) {
      case "adesso":
        this.value(/* @__PURE__ */ new Date());
        return;
      case "pumo":
        {
          this.value(new Date(1993, 9, 10, 10, 10));
        }
        return;
    }
    if (inputText.length == 1 || inputText.length == 3)
      inputText = "0" + inputText;
    if (isNaN(inputTextNumeric)) {
      UtilityManager.interval(() => puma(this.element()).toggleClass("errorInput"), 200, 800);
      this.clear();
      return;
    }
    let dateToReturn = today;
    if (inputText.length == 2)
      dateToReturn = dateToReturn.vrAddHours(inputTextNumeric);
    else if (inputText.length == 4) {
      let hours = Number(inputText[0] + inputText[1]);
      let minutes = Number(inputText[2] + inputText[3]);
      dateToReturn = dateToReturn.vrAddHours(hours).vrAddMinutes(minutes);
    }
    if (onlyFormat)
      return dateToReturn;
    this.value(dateToReturn);
  }
  //#endregion
  //#region DateTimePicker
  formatInputDateTimePicker(inputText) {
    let timeString = inputText.split(" ")[1];
    if (timeString == null)
      timeString = String((/* @__PURE__ */ new Date()).getHours()) + String((/* @__PURE__ */ new Date()).getMinutes());
    let time = this.formatInputTimePicker(timeString, true);
    let dateString = inputText.split(" ")[0];
    let date = this.formatInputDatePicker(dateString, true);
    if (date != null) {
      date.setHours(time.getHours(), time.getMinutes());
      this.value(date);
    }
    return date;
  }
  //#endregion
  //#region Utility
  getFinalYear(yearString) {
    if (yearString.length == 4)
      return Number(yearString);
    let yearStringToday = (/* @__PURE__ */ new Date()).getFullYear().toString();
    let todayYearFull = Number(yearStringToday.substr(0, 2) + "00");
    let todayYear2digits = Number(yearStringToday.substr(0, 2));
    let yearStringFinal = yearString.length == 1 ? "0" + yearString : yearString.substr(0, 2);
    let inputYear = Number(yearStringFinal);
    let yearFinalString = "";
    if (inputYear <= (/* @__PURE__ */ new Date()).getFullYear() + 10 - todayYearFull)
      yearFinalString = todayYear2digits + yearStringFinal;
    else
      yearFinalString = todayYear2digits - 1 + yearStringFinal;
    return Number(yearFinalString);
  }
  updateCursorPosition() {
    if (this.element().createTextRange) {
      var range = this.element().createTextRange();
      range.move("character", this._currentCursorPosition);
      range.select();
    } else {
      if (this.element().selectionStart >= 0) {
        this.element().focus();
        this.element().setSelectionRange(this._currentCursorPosition, this._currentCursorPosition);
      } else
        this.element().focus();
    }
  }
  //#endregion
  value(date, triggerChange = true) {
    let options = this.getOptions();
    if (date === null) {
      let changingEvent = new DatePickerChangingEvent();
      if (options.onBeforeChange != null) {
        changingEvent.sender = this;
        changingEvent.value = new Date(date);
        changingEvent.previousValue = this._value != null ? new Date(this._value) : null;
        options.onBeforeChange(changingEvent);
        if (changingEvent.isDefaultPrevented())
          return null;
      }
      if (!options.nullable) {
        UtilityManager.interval(() => puma(this.element()).toggleClass("errorInput"), 200, 800);
        return this._value;
      } else {
        this.clear();
        return null;
      }
    }
    if (date != null) {
      if (typeof date == "string")
        date = Date.vrFixDateString(date);
      if (date == null)
        throw Error("Formato data non valido!");
      if (options.mode == DateModeEnum.Time) {
        date.setFullYear((/* @__PURE__ */ new Date()).getFullYear());
        date.setMonth((/* @__PURE__ */ new Date()).getMonth());
      }
      if (options.mode != DateModeEnum.Time) {
        if (date.vrIsLessThan(options.min)) {
          notify("Data minima consentita: " + options.min.vrToItalyString());
          UtilityManager.interval(() => puma(this.element()).toggleClass("errorInput"), 200, 800);
          this.clear();
          return null;
        }
        if (date.vrIsGreaterThan(options.max)) {
          notify("Data massima consentita: " + options.max.vrToItalyString());
          UtilityManager.interval(() => puma(this.element()).toggleClass("errorInput"), 200, 800);
          this.clear();
          return null;
        }
      }
      if (triggerChange) {
        let changingEvent = new DatePickerChangingEvent();
        if (options.onBeforeChange != null) {
          changingEvent.sender = this;
          changingEvent.value = new Date(date);
          changingEvent.previousValue = this._value != null ? new Date(this._value) : null;
          options.onBeforeChange(changingEvent);
        }
        if (!changingEvent.isDefaultPrevented()) {
          this._value = new Date(date);
          this.formatValue();
          this.change();
        }
      } else {
        this._value = new Date(date);
        this.formatValue();
      }
    }
    if (this._value != null)
      this._value.setSeconds(0);
    if (this.mode() == DateModeEnum.Time && this._value != null) {
      let hours = this._value.getHours();
      let minutes = this._value.getMinutes();
      this._value = new Date(1900, 0, 1, hours, minutes);
    }
    return this._value;
  }
  formatValue() {
    let options = this.getOptions();
    let element = this.element();
    if (typeof options.format == "number") {
      let dateOptions = {};
      switch (options.format) {
        case DateFormatEnum.ShortDate:
        case DateFormatEnum.ShortDateWithoutYear:
          {
            dateOptions = {
              year: options.format == DateFormatEnum.ShortDate ? "numeric" : void 0,
              month: "2-digit",
              day: "2-digit",
              hour12: false
            };
          }
          break;
        case DateFormatEnum.LongDate:
        case DateFormatEnum.LongDateWithoutYear:
          {
            dateOptions = {
              weekday: "long",
              year: options.format == DateFormatEnum.LongDate ? "numeric" : void 0,
              month: "long",
              day: "2-digit",
              hour12: false
            };
          }
          break;
        case DateFormatEnum.WeekDay:
          {
            dateOptions = {
              weekday: "long",
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour12: false
            };
          }
          break;
        case DateFormatEnum.Month:
          {
            dateOptions = {
              year: "numeric",
              month: "long"
            };
          }
          break;
        case DateFormatEnum.Year:
          {
            dateOptions = {
              year: "numeric"
            };
          }
          break;
      }
      dateOptions.timeZone = "Europe/Rome";
      let dateFormatter = new Intl.DateTimeFormat(
        /*navigator.language*/
        "it",
        dateOptions
      );
      let dateString = dateFormatter.format(this._value).vrCapitalize();
      if (options.format == DateFormatEnum.WeekRange) {
        let firstDayOfWeek = Date.vrGetFirstDayOfWeekByDate(this._value);
        let lastDayOfWeek = firstDayOfWeek.vrAddDays(5);
        dateString = firstDayOfWeek.vrToItalyString() + " - " + lastDayOfWeek.vrToItalyString();
      } else if (options.format == DateFormatEnum.LongWeekRange) {
        let firstDayOfWeek = Date.vrGetFirstDayOfWeekByDate(this._value);
        let lastDayOfWeek = firstDayOfWeek.vrAddDays(5);
        dateOptions = {
          timeZone: "Europe/Rome",
          year: "numeric",
          month: "long",
          day: "2-digit"
        };
        dateFormatter = new Intl.DateTimeFormat("it", dateOptions);
        dateString = dateFormatter.format(firstDayOfWeek) + " - " + dateFormatter.format(lastDayOfWeek);
      } else if (options.format == DateFormatEnum.FourWeeksRange) {
        let firstDayOfWeek = Date.vrGetFirstDayOfWeekByDate(this._value);
        let lastDayOfWeek = firstDayOfWeek.vrAddDays(26);
        dateString = firstDayOfWeek.vrToItalyString() + " - " + lastDayOfWeek.vrToItalyString();
      } else if (options.format == DateFormatEnum.LongFourWeeksRange) {
        let firstDayOfWeek = Date.vrGetFirstDayOfWeekByDate(this._value);
        let lastDayOfWeek = firstDayOfWeek.vrAddDays(26);
        dateOptions = {
          timeZone: "Europe/Rome",
          year: "numeric",
          month: "long",
          day: "2-digit"
        };
        dateFormatter = new Intl.DateTimeFormat("it", dateOptions);
        dateString = dateFormatter.format(firstDayOfWeek) + " - " + dateFormatter.format(lastDayOfWeek);
      }
      switch (options.mode) {
        case DateModeEnum.Date:
          element.value = dateString;
          break;
        case DateModeEnum.Time:
          element.value = this._value.toTimeString();
          break;
        case DateModeEnum.DateTime:
          element.value = dateString + " " + this._value.toTimeString();
          break;
      }
    } else
      element.value = this._value.vrFormatString(options.format, "it");
  }
  mode(mode) {
    let options = this.getOptions();
    if (mode != null)
      options.mode = mode;
    return options.mode;
  }
  min(min) {
    let options = this.getOptions();
    if (min != null)
      options.min = min;
    return options.min;
  }
  max(max) {
    let options = this.getOptions();
    if (max != null)
      options.max = max;
    return options.max;
  }
  format(format, changeText = true) {
    let options = this.getOptions();
    if (format != null) {
      options.format = format;
      if (changeText)
        this.value(this.value(), false);
    }
    return options.format;
  }
  clear(triggerChange = false) {
    this._value = null;
    this.element().value = "";
    if (triggerChange)
      this.change();
  }
  isEmpty() {
    return this.value() == null;
  }
  error() {
    puma(this.element()).addClass("vrDatePickerError");
  }
  hideError() {
    puma(this.element()).removeClass("vrDatePickerError");
  }
  getOptions() {
    return this.options();
  }
  //#endregion
  //#region Overrides
  enable() {
    super.enable();
    puma(this.container()).find(".vrDivPickerIcon").removeClass("vrDivPickerIconDisable");
    puma(this.container()).find(".vrDivPickerDateTimeIcon").removeClass("vrDivPickerIconDisable");
  }
  disable() {
    super.disable();
    puma(this.container()).find(".vrDivPickerIcon").addClass("vrDivPickerIconDisable");
    puma(this.container()).find(".vrDivPickerDateTimeIcon").addClass("vrDivPickerIconDisable");
  }
  //#endregion
  //#region Events
  change() {
    let changeCallBack = this.getOptions().onAfterChange;
    if (changeCallBack != null) {
      let changeEvent = new DatePickerChangeEvent();
      changeEvent.sender = this;
      changeEvent.value = this.value() != null ? new Date(this.value()) : null;
      changeCallBack(changeEvent);
    }
  }
  //#endregion
}
class DatePickerEvent extends VrControlsEvent {
  sender;
  value;
}
class DatePickerChangeEvent extends DatePickerEvent {
}
class DatePickerChangingEvent extends DatePickerEvent {
  previousValue;
}
var ActualViewEnum = /* @__PURE__ */ ((ActualViewEnum2) => {
  ActualViewEnum2[ActualViewEnum2["Day"] = 0] = "Day";
  ActualViewEnum2[ActualViewEnum2["Month"] = 1] = "Month";
  ActualViewEnum2[ActualViewEnum2["Year"] = 2] = "Year";
  ActualViewEnum2[ActualViewEnum2["Decade"] = 3] = "Decade";
  return ActualViewEnum2;
})(ActualViewEnum || {});
class DatePickerFocusEvent extends DatePickerEvent {
}
class DatePickerBlurEvent extends DatePickerEvent {
}
class DatePickerKeyUpPressEvent extends VrControlsEvent {
  sender;
  text;
  key;
  shiftKey;
  altKey;
  ctrlKey;
  enterKey;
  backSpaceKey;
  tabKey;
}
class DatePickerKeyUpEvent extends DatePickerKeyUpPressEvent {
}
class DatePickerKeyDownEvent extends DatePickerKeyUpPressEvent {
}
export {
  ActualViewEnum,
  DatePicker,
  DatePickerOptions
};
//# sourceMappingURL=datePicker.js.map
