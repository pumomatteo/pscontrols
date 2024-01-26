import { UtilityManager } from "../../../src/managers/utilityManager";
import { VrControl, VrControlOptions, VrControlsEvent } from "../common";
import { confirm, ButtonGroupItem, ComboBoxTypeEnum, ControlTypeEnum, createButton, createButtonGroup, createComboBox, createDatePicker, DateFormatEnum, DayOfWeekEnum, div, IconClassicLight, IconClass, NotifierTypeEnum, notify, puma, SchedulerData, SchedulerNavigateActionEnum, SchedulerResource, SchedulerSlotElement, SchedulerView, SchedulerViewEnum, createSwitch, showLoader, hideLoader, SchedulerSaturationInfo, SchedulerSaturationDay, SchedulerSaturationWeekByResource, SchedulerSaturationFourWeeks, SaturationResource } from "../vr";
import { Button } from "./button";
import { ButtonGroup } from "./buttonGroup";
import { ComboBox } from "./comboBox";
import { DatePicker } from "./datePicker";
import { Switch } from "./switch";

declare var html2canvas: any;
declare var jsPDF: any;

//#region Options
export class SchedulerOptions extends VrControlOptions
{
	date?: Date;
	startTime?: Date;
	endTime?: Date;
	timeslotIntervalDuration?: number;
	numberOfWorkDays?: number;
	resources?: SchedulerResource[];
	firstDayOfWeek?: DayOfWeekEnum;
	views?: SchedulerView[];
	daysOfWeekNames?: string[];
	exportPdf?: boolean;
	maxResourcesNumber?: SchedulerMaxResourceNumber;
	availabilities?: SchedulerData[];
	datasource?: SchedulerData[];
	saturation?: SchedulerSaturationInfo;
	editable?: SchedulerEditable;
	timeColumn?: boolean;
	showHeader?: boolean;
	showToolbar?: boolean;

	onNavigate?: (e: SchedulerNavigateEvent) => void;
	onViewChange?: (e: SchedulerViewChangeEvent) => void;
	onIntervalChange?: (e: SchedulerIntervalChangeEvent) => void;
	onResourcesChange?: (e: SchedulerResourcesChangeEvent) => void;
	onTimeslotClick?: (e: SchedulerTimeslotClickEvent) => void;
	onAvailabilityClick?: (e: SchedulerAvailabilityClickEvent) => void;
	onAppointmentClick?: (e: SchedulerAppointmentClickEvent) => void;
	onMoveStart?: (e: SchedulerMoveStartEvent) => void;
	onMoving?: (e: SchedulerMovingEvent) => void;
	onMoveEnd?: (e: SchedulerMoveEndEvent) => void;
	onExpand?: (e: SchedulerExpandEvent) => void;
	onCollapse?: (e: SchedulerCollapseEvent) => void;
	onResizeStart?: (e: SchedulerResizeStartEvent) => void;
	onResizing?: (e: SchedulerResizingEvent) => void;
	onResizeEnd?: (e: SchedulerResizeEndEvent) => void;
}
//#endregion

//#region Control
export class Scheduler extends VrControl
{
	private _dtpSchedulerDate: DatePicker;
	private _swtGroupByDateResource: Switch;
	private _btgMenuView: ButtonGroup;
	private _btnExpand: Button;
	private _btnCollapse: Button;
	private _cmbInterval: ComboBox;

	private _actualView: SchedulerViewEnum;
	private _actualNavigateAction: SchedulerNavigateActionEnum | null;
	private _isMoving: boolean;
	private _isResizing: boolean;
	private _timeColumnWidth: number;
	private _saturationData?: SchedulerSaturationInfo;
	private _saturationVisible: boolean;

	private _datasource: any[];
	private _slotElementList: SchedulerSlotElement[];
	private _availabilities: SchedulerData[];

	constructor(element: HTMLElement, options?: SchedulerOptions | null)
	{
		//#region Options
		if (options == null)
			options = new SchedulerOptions();

		if (options.startTime == null) options.startTime = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 8, 0);
		if (options.endTime == null) options.endTime = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 19, 0);
		if (options.maxResourcesNumber == null) options.maxResourcesNumber = new SchedulerMaxResourceNumber();
		if (options.views == null) options.views = [{ type: SchedulerViewEnum.Day, selected: true }];
		if (options.timeslotIntervalDuration == null) options.timeslotIntervalDuration = 30;
		if (options.firstDayOfWeek == null) options.firstDayOfWeek = DayOfWeekEnum.Monday;
		if (options.daysOfWeekNames == null) options.daysOfWeekNames = ["DOM", "LUN", "MAR", "MER", "GIO", "VEN", "SAB"];
		if (options.numberOfWorkDays == null) options.numberOfWorkDays = 6;
		if (options.exportPdf == null) options.exportPdf = true;
		if (options.date == null) options.date = new Date();
		if (options.timeColumn == null) options.timeColumn = true;
		if (options.showHeader == null) options.showHeader = true;
		if (options.showToolbar == null) options.showToolbar = true;
		if (options.editable == null) options.editable = new SchedulerEditable();
		if (options.editable.move == null) options.editable.move = true;
		if (options.editable.resize == null) options.editable.resize = true;
		//#endregion

		options.width = "100%";
		super(element, options, ControlTypeEnum.Scheduler);

		puma(this.container()).css({ "flex-direction": "column" });
		this._timeColumnWidth = (options.timeColumn) ? 63 : 0; // 63 = time column width + border
		this._saturationData = undefined;

		if (options.resources == null)
			options.resources = [{ value: "", text: "" }];

		//#region View
		let viewSelected = options.views!.filter(k => k.selected === true)[0];
		if (viewSelected == null)
			viewSelected = { type: SchedulerViewEnum.Day, selected: true };

		this._actualView = viewSelected.type;
		//#endregion

		//#region Structure
		this.drawToolbar();
		this.drawScheduler();
		this.manageSchedulerClick();
		//#endregion

		//#region Datasource/Availabilities
		if (options.datasource != null)
			this.datasource(options.datasource);

		if (options.availabilities != null)
			this.availabilities(options.availabilities);
		//#endregion

		//#region Saturation
		if (options.saturation != null)
			this.saturation(options.saturation);
		//#endregion

		puma(window).resize(() =>
		{
			this.drawScheduler();
			this.rebind();

			if (this._saturationData != null)
				this.saturation(this._saturationData);
		});
	}

	//#region Methods

	//#region Draw 
	drawToolbar()
	{
		let options = this.getOptions();
		let divToolbar = div(this.container(), { class: "vrSchedulerDivToolbar" }, true);

		if (!options.showToolbar)
			divToolbar.style.cssText += "display: none;";

		let timeout = 0;
		createButton({
			icon: IconClassicLight.CaretLeft,
			width: 30,
			onClick: (e) =>
			{
				let date = this.date()!.vrAddDays((this.view() == SchedulerViewEnum.Day) ? -1 : -7);
				this._dtpSchedulerDate.value(date, false);

				clearTimeout(timeout);
				timeout = window.setTimeout(() =>
				{
					this._actualNavigateAction = SchedulerNavigateActionEnum.PrevDate;
					this.date(date);
				});
			}
		}, divToolbar);

		createButton({
			icon: IconClassicLight.CaretRight,
			width: 30,
			cssContainer: "margin-left: 5px;",
			onClick: (e) =>
			{
				let date = this.date()!.vrAddDays((this.view() == SchedulerViewEnum.Day) ? 1 : 7);
				this._dtpSchedulerDate.value(date, false);

				clearTimeout(timeout);
				timeout = window.setTimeout(() =>
				{
					this._actualNavigateAction = SchedulerNavigateActionEnum.NextDate;
					this.date(date);
				});
			}
		}, divToolbar);

		createButton({
			text: "Oggi",
			cssContainer: "margin-left: 5px;",
			onClick: (e) =>
			{
				this._actualNavigateAction = SchedulerNavigateActionEnum.Today;
				let today = new Date();
				today.setHours(0, 0, 0);
				this.date(today);
			}
		}, divToolbar);

		this._dtpSchedulerDate = createDatePicker({
			format: DateFormatEnum.LongDate,
			value: options.date,
			width: 250,
			cssContainer: "margin-left: 5px;",
			onBeforeChange: (e) =>
			{
				if (e.value == null)
					e.preventDefault();
			},
			onAfterChange: (e) => 
			{
				this._actualNavigateAction = SchedulerNavigateActionEnum.ChangeDate;
				this.date(this._dtpSchedulerDate.value()!);
			}
		}, divToolbar);

		this._swtGroupByDateResource = createSwitch({
			labelSettings: { colorSettings: { textColor: "#000" } },
			labelOff: "Risorsa",
			labelOn: "Data",
			cssContainer: "border-left: solid 1px #000; margin-left: 10px; padding-left: 10px; flex-direction: row; height: 24px;",
			classContainer: "vrSchedulerSwitchGroupByDateResource",
			visible: this.view() == SchedulerViewEnum.Week,
			onChange: (e) => window.setTimeout(() => this.groupWeekByDate(e.checked), 50)
		}, divToolbar);

		this._btnExpand = createButton({
			icon: IconClassicLight.Expand,
			cssContainer: "float: right; margin-left: 5px;",
			onClick: (e) => 
			{
				if (options.onExpand != null)
				{
					let expandEvent = new SchedulerExpandEvent();
					expandEvent.sender = this;
					expandEvent.buttonExpand = this._btnExpand;
					expandEvent.buttonCollpase = this._btnCollapse;
					options.onExpand(expandEvent);

					if (expandEvent.isDefaultPrevented())
						return;
				}

				UtilityManager.enterFullScreen(this.container(), () => notify("Modalità fullScreen non supportata", { type: NotifierTypeEnum.Error }));
				this._btnCollapse.show();
				this._btnExpand.hide();
				window.setTimeout(() => this.adaptHeight(), 100);
			}
		}, divToolbar);

		this._btnCollapse = createButton({
			icon: IconClassicLight.Collapse,
			cssContainer: "float: right; margin-left: 5px;",
			visible: false,
			onClick: (e) => 
			{
				if (options.onCollapse != null)
				{
					let collapseEvent = new SchedulerCollapseEvent();
					collapseEvent.sender = this;
					collapseEvent.buttonExpand = this._btnExpand;
					collapseEvent.buttonCollpase = this._btnCollapse;
					options.onCollapse(collapseEvent);

					if (collapseEvent.isDefaultPrevented())
						return;
				}

				UtilityManager.exitFullScreen();
				this._btnCollapse.hide();
				this._btnExpand.show();
				window.setTimeout(() => this.adaptHeight(), 100);
			}
		}, divToolbar);

		let viewItems: ButtonGroupItem[] = [];
		let viewTypes = options.views!.map(k => k.type);
		if (viewTypes.includes(SchedulerViewEnum.Day))
			viewItems.push({ text: "Giorno", value: SchedulerViewEnum.Day, selected: (this.view() == SchedulerViewEnum.Day) });
		if (viewTypes.includes(SchedulerViewEnum.Week))
			viewItems.push({ text: "Settimana", value: SchedulerViewEnum.Week, selected: (this.view() == SchedulerViewEnum.Week) });
		if (viewTypes.includes(SchedulerViewEnum.FourWeeks))
			viewItems.push({ text: "Mese", value: SchedulerViewEnum.FourWeeks, selected: (this.view() == SchedulerViewEnum.FourWeeks) });

		this._btgMenuView = createButtonGroup({
			items: viewItems,
			cssContainer: "float: right;",
			width: "auto",
			onSelect: (e) => 
			{
				let maxResourceNumberBasedOnView: number | null | undefined = null;
				switch (Number(e.value))
				{
					case SchedulerViewEnum.Day: maxResourceNumberBasedOnView = options.maxResourcesNumber!.dayView; break;
					case SchedulerViewEnum.Week: maxResourceNumberBasedOnView = options.maxResourcesNumber!.weekView; break;
					case SchedulerViewEnum.FourWeeks: maxResourceNumberBasedOnView = options.maxResourcesNumber!.fourWeeksView; break;
				}

				if (maxResourceNumberBasedOnView != null && this.resources().length > maxResourceNumberBasedOnView)
				{
					confirm("Verranno visualizzate un numero di risorse maggiore<br /> del limite massimo impostato (" + maxResourceNumberBasedOnView + ").<br /> Continuare comunque?")
						.then(() => this.view(Number(e.value!)),
							() => e.sender.select([this.view()], false)); // If not
				}
				else
					this.view(Number(e.value!));

			}
		}, divToolbar);
	}

	private drawScheduler()
	{
		this.drawHeader();
		this.drawContent();

		if (this._saturationData != null)
			this.saturation(this._saturationData);

		let divContent = puma(this.getDivContent());
		if (divContent.vrHasScrollBar())
			puma(this.container()).find(".vrSchedulerDivHeader").find("table").css({ "width": "Calc(100% - 17px)" });
		else
			puma(this.container()).find(".vrSchedulerDivHeader").find("table").css({ "width": "100%" });

		if (this.view() == SchedulerViewEnum.Week)
			this._swtGroupByDateResource.show();
	}

	private drawHeader()
	{
		let options = this.getOptions();
		let divHeader = puma(this.container()).find(".vrSchedulerDivHeader")[0];
		if (divHeader == null)
			divHeader = div(this.element(), { class: "vrSchedulerDivHeader" });

		if (!options.showHeader)
			divHeader.style.cssText += "display: none;";

		puma(divHeader).empty();
		let contentFragment = document.createDocumentFragment();

		let table = document.createElement("table");
		table.style.cssText += "width: 100%; table-layout: fixed; border-spacing: 0;";
		contentFragment.appendChild(table);

		switch (this.view())
		{
			case SchedulerViewEnum.Day:
				{
					//#region Day
					let rowHeader = document.createElement("tr");
					table.appendChild(rowHeader);

					let thInterval = document.createElement("th");
					thInterval.className = "vrSchedulerThInterval";
					rowHeader.appendChild(thInterval);
					this.createIntervalCombo(thInterval);

					for (let resource of this.resources())
					{
						let resourceText = (resource.text != null) ? resource.text : "";

						let th = document.createElement("th");
						th.title = resourceText.toUpperCase();
						th.className = "vrSchedulerDayResource";
						th.setAttribute("resourceId", resource.value);
						th.setAttribute("resourceName", resourceText.replace(" ", "~"));
						rowHeader.appendChild(th);

						//#region Text
						let spanResouceText = document.createElement("span");
						spanResouceText.innerHTML = resourceText.toUpperCase();
						th.appendChild(spanResouceText);
						//#endregion

						//#region Saturation
						let divSaturation = document.createElement("div");
						divSaturation.classList.add("vrSchedulerDivSaturation");
						th.appendChild(divSaturation);

						if (this.saturationVisible())
							divSaturation.style.cssText += "display: flex;";

						let spanSaturationBar = document.createElement("span");
						spanSaturationBar.classList.add("vrSchedulerSpanSaturation");
						divSaturation.appendChild(spanSaturationBar);
						//#endregion
					}
					//#endregion
				}
				break;
			case SchedulerViewEnum.Week:
			case SchedulerViewEnum.FourWeeks:
				{
					//#region Week/FourWeeks
					let numberOfDays = (this.view() == SchedulerViewEnum.FourWeeks) ? options.numberOfWorkDays! * 4 : options.numberOfWorkDays!;

					if (!this.groupWeekByDate())
					{
						//#region GroupedByResources
						let rowResources = document.createElement("tr");
						table.appendChild(rowResources);

						let thInterval = document.createElement("th");
						thInterval.className = "vrSchedulerThInterval";
						rowResources.appendChild(thInterval);
						this.createIntervalCombo(thInterval);

						let rowDays = rowResources;
						if (this.groupedByResource())
						{
							for (let resource of this.resources())
							{
								let resourceText = (resource.text != null) ? resource.text : "";

								let th = document.createElement("th");
								th.title = resourceText.toUpperCase();
								th.className = "vrSchedulerDayResource";
								th.setAttribute("resourceId", resource.value);
								th.setAttribute("resourceName", resourceText.replace(" ", "~"));
								th.colSpan = numberOfDays;
								rowResources.appendChild(th);

								//#region Text
								let spanResouceText = document.createElement("span");
								spanResouceText.innerHTML = resourceText.toUpperCase();
								th.appendChild(spanResouceText);
								//#endregion

								//#region Saturation
								let spanSaturationPercentage = document.createElement("span");
								spanSaturationPercentage.classList.add("vrSchedulerSaturationPercentage");
								th.appendChild(spanSaturationPercentage);
								//#endregion
							}

							rowDays = document.createElement("tr");
							table.appendChild(rowDays);

							let thInterval2 = document.createElement("th");
							thInterval2.className = "vrSchedulerThInterval";
							rowDays.appendChild(thInterval2);
						}

						for (let resource of this.resources())
						{
							let firstDayOfWeek = Date.vrGetFirstDayOfWeekByDate(this.date()!);
							let addingDays = 0;
							for (let i = 0; i < numberOfDays; i++)
							{
								addingDays = (i % options.numberOfWorkDays! == 0 && i > 0) ? addingDays + (7 - options.numberOfWorkDays!) : addingDays;
								let dayOfWeek = firstDayOfWeek.vrAddDays(addingDays);
								let dayName = options.daysOfWeekNames![dayOfWeek.getDay()];
								let dayNumber = dayOfWeek.getDate();

								let th = document.createElement("th");
								th.title = dayNumber + " " + dayName;
								th.className = "vrSchedulerWeekDay";
								th.setAttribute("day", String(dayNumber));
								th.setAttribute("month", String(dayOfWeek.getMonth()));
								th.setAttribute("year", String(dayOfWeek.getFullYear()));
								th.setAttribute("resourceId", resource.value);
								rowDays.appendChild(th);

								//#region Text
								let spanResouceText = document.createElement("span");
								spanResouceText.innerHTML = dayNumber + " " + dayName;
								th.appendChild(spanResouceText);
								//#endregion

								//#region Saturation
								let divSaturation = document.createElement("div");
								divSaturation.classList.add("vrSchedulerDivSaturation");
								th.appendChild(divSaturation);

								if (this.saturationVisible())
									divSaturation.style.cssText += "display: flex;";

								let spanSaturationBar = document.createElement("span");
								spanSaturationBar.classList.add("vrSchedulerSpanSaturation");
								divSaturation.appendChild(spanSaturationBar);
								//#endregion

								addingDays++;
							}
						}
						//#endregion
					}
					else
					{
						//#region GroupedByDate
						let rowDays = document.createElement("tr");
						table.appendChild(rowDays);

						let thInterval = document.createElement("th");
						thInterval.className = "vrSchedulerThInterval";
						rowDays.appendChild(thInterval);
						this.createIntervalCombo(thInterval);

						let firstDayOfWeek = Date.vrGetFirstDayOfWeekByDate(this.date()!);
						let addingDays = 0;
						for (let i = 0; i < numberOfDays; i++)
						{
							addingDays = (i % options.numberOfWorkDays! == 0 && i > 0) ? addingDays + (7 - options.numberOfWorkDays!) : addingDays;
							let dayOfWeek = firstDayOfWeek.vrAddDays(addingDays);
							let dayName = options.daysOfWeekNames![dayOfWeek.getDay()];
							let dayNumber = dayOfWeek.getDate();

							let th = document.createElement("th");
							th.title = dayNumber + " " + dayName;
							th.colSpan = this.resources().length;
							th.className = "vrSchedulerWeekDay";
							th.setAttribute("day", String(dayNumber));
							th.setAttribute("month", String(dayOfWeek.getMonth()));
							th.setAttribute("year", String(dayOfWeek.getFullYear()));
							th.innerHTML = dayNumber + " " + dayName;
							th.innerHTML = dayNumber + " " + dayName;
							rowDays.appendChild(th);

							addingDays++;
						}

						let rowResources = document.createElement("tr");
						table.appendChild(rowResources);

						let thInterval2 = document.createElement("th");
						thInterval2.className = "vrSchedulerThInterval";
						rowResources.appendChild(thInterval2);

						let addingDaysForResources = 0;
						for (let i = 0; i < numberOfDays; i++)
						{
							addingDaysForResources = (i % options.numberOfWorkDays! == 0 && i > 0) ? addingDaysForResources + (7 - options.numberOfWorkDays!) : addingDaysForResources;
							let dayOfWeek = firstDayOfWeek.vrAddDays(addingDaysForResources);
							let dayNumber = dayOfWeek.getDate();

							for (let resource of this.resources())
							{
								let resourceText = (resource.text != null) ? resource.text : "";

								let th = document.createElement("th");
								th.title = resourceText.toUpperCase();
								th.className = "vrSchedulerDayResource";
								th.setAttribute("resourceId", resource.value);
								th.setAttribute("resourceName", resourceText.replace(" ", "~"));
								th.setAttribute("day", String(dayNumber));
								th.setAttribute("month", String(dayOfWeek.getMonth()));
								th.setAttribute("year", String(dayOfWeek.getFullYear()));
								rowResources.appendChild(th);

								//#region Text
								let spanResouceText = document.createElement("span");
								spanResouceText.innerHTML = resourceText.toUpperCase();;
								th.appendChild(spanResouceText);
								//#endregion

								//#region Saturation
								let divSaturation = document.createElement("div");
								divSaturation.classList.add("vrSchedulerDivSaturation");
								th.appendChild(divSaturation);

								if (this.saturationVisible())
									divSaturation.style.cssText += "display: flex;";

								let spanSaturationBar = document.createElement("span");
								spanSaturationBar.classList.add("vrSchedulerSpanSaturation");
								divSaturation.appendChild(spanSaturationBar);
								//#endregion
							}
							addingDaysForResources++;
						}
						//#endregion
					}
					//#endregion
				}
				break;
		}
		divHeader.appendChild(contentFragment);
	}

	private createIntervalCombo(th: HTMLTableCellElement)
	{
		let options = this.getOptions();

		if (this._cmbInterval != null)
			this._cmbInterval.container().parentNode!.removeChild(this._cmbInterval.container());

		this._cmbInterval = createComboBox({
			mode: ComboBoxTypeEnum.DropDown,
			value: options.timeslotIntervalDuration,
			cssContainer: "top: 2px;",
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
			onAfterChange: (e) => window.setTimeout(() => this.timeslotInterval(Number(e.sender.value()!)))
		}, th);
	}

	private drawContent()
	{
		let options = this.getOptions();
		let divContent = this.getDivContent();
		if (divContent == null)
		{
			divContent = div(this.element(), { class: "vrSchedulerDivContent" });

			let height: number | string = 0;
			if (options.height == null)
			{
				let schedulerOffset = puma(this.container()).offset().top;
				let contentHeight = window.innerHeight - schedulerOffset;

				let toolbarHeight = puma(this.container()).find(".vrSchedulerDivToolbar").outerHeight();
				if (!options.showToolbar)
					toolbarHeight = 0;

				let headerHeight = puma(this.container()).find(".vrSchedulerDivHeader").outerHeight();
				if (!options.showHeader)
					headerHeight = 0;

				height = contentHeight - toolbarHeight - headerHeight;
			}
			else
				height = options.height;

			puma(divContent).height(height);
		}

		puma(divContent).empty();
		let contentFragment = document.createDocumentFragment();

		let table = document.createElement("table");
		table.style.cssText += "width: 100%; table-layout: fixed; border-spacing: 0;";
		contentFragment.appendChild(table);

		let schedulerTotalMinutes = Date.vrDifferenceBetweenDatesInMinutes(options.startTime!, options.endTime!);
		let numberOfRows = schedulerTotalMinutes / options.timeslotIntervalDuration!;
		this._slotElementList = [];

		switch (this.view())
		{
			case SchedulerViewEnum.Day:
				{
					//#region Day
					let date = new Date(this.date()!.setHours(options.startTime!.getHours(), options.startTime!.getMinutes()));
					for (let i = 0; i < numberOfRows; i++)
					{
						let row = document.createElement("tr");
						table.appendChild(row);

						let realDate = new Date(date);
						realDate.setSeconds(0, 0);

						// Time
						let timeString = realDate.toTimeString();
						let textTime = (i % 2 == 0) ? timeString : "";

						let thTime = document.createElement("th");
						thTime.innerHTML = textTime;
						thTime.classList.add("vrSchedulerThTime");
						if (i % 2 == 0 && i > 0) thTime.classList.add("borderTopSolid");
						row.appendChild(thTime);

						if (!options.timeColumn)
							thTime.style.cssText += "display: none;";

						let endSlot = new Date(date);
						endSlot.vrAddMinutes(options.timeslotIntervalDuration!);
						endSlot.setSeconds(0, 0);

						// Slots
						let columnIndex = 0;
						let borderTopClass = (i == 0) ? "" : ((i % 2 == 0) ? "borderTopSolid" : "borderTopDotted");
						let borderBottomClass = ((i == (numberOfRows - 1)) ? "borderBottomSolid" : "");
						for (let resource of this.resources())
						{
							let td = document.createElement("td");
							if (borderTopClass != "") td.classList.add(borderTopClass);
							if (borderBottomClass != "") td.classList.add(borderBottomClass);
							td.title = timeString;
							row.appendChild(td);

							// To fast appointment collocation
							let slotElement = new SchedulerSlotElement();
							slotElement.resourceId = (resource != null) ? resource.value : "0";
							slotElement.start = realDate;
							slotElement.end = endSlot;
							slotElement.columnIndex = columnIndex;
							slotElement.rowIndex = i;
							this._slotElementList.push(slotElement);

							columnIndex++;
						}
						date.vrAddMinutes(options.timeslotIntervalDuration!);
					}
					//#endregion
				}
				break;
			case SchedulerViewEnum.Week:
			case SchedulerViewEnum.FourWeeks:
				{
					//#region Week/FourWeeks
					let numberOfDays = (this.view() == SchedulerViewEnum.FourWeeks) ? options.numberOfWorkDays! * 4 : options.numberOfWorkDays!;
					let firstDayOfWeek = Date.vrGetFirstDayOfWeekByDate(this.date()!);

					let minutes = Date.vrDifferenceBetweenDatesInMinutes(options.startTime!, options.endTime!);
					let numberOfRows = minutes / options.timeslotIntervalDuration!;

					if (!this.groupWeekByDate())
					{
						//#region GroupedByResources
						let date = new Date(options.startTime!);
						for (let i = 0; i < numberOfRows; i++)
						{
							let row = document.createElement("tr");
							table.appendChild(row);

							// Time
							let timeString = date.toTimeString();
							let textTime = (i % 2 == 0) ? timeString : "";

							let thTime = document.createElement("th");
							thTime.innerHTML = textTime;
							thTime.classList.add("vrSchedulerThTime");
							if (i % 2 == 0 && i > 0) thTime.classList.add("borderTopSolid");
							row.appendChild(thTime);

							if (!options.timeColumn)
								thTime.style.cssText += "display: none;";

							let borderTopClass = (i == 0) ? "" : ((i % 2 == 0) ? "borderTopSolid" : "borderTopDotted");
							let borderBottomClass = (i == (numberOfRows - 1)) ? "borderBottomSolid" : "";

							// Slots
							let columnIndex = 0;
							for (let resource of this.resources())
							{
								firstDayOfWeek.setHours(date.getHours(), date.getMinutes(), 0, 0);

								let addingDays = 0;
								for (let j = 0; j < numberOfDays; j++)
								{
									addingDays = (j % options.numberOfWorkDays! == 0 && j > 0) ? addingDays + (7 - options.numberOfWorkDays!) : addingDays;
									let dayOfWeek = firstDayOfWeek.vrAddDays(addingDays);
									let endSlot = new Date(dayOfWeek);
									endSlot.vrAddMinutes(options.timeslotIntervalDuration!);

									let td = document.createElement("td");
									if (borderTopClass != "") td.classList.add(borderTopClass);
									if (borderBottomClass != "") td.classList.add(borderBottomClass);
									td.title = timeString;
									row.appendChild(td);

									if (j == numberOfDays - 1)
										td.classList.add("borderRightSolid");

									addingDays++;

									// To fast appointment collocation
									let slotElement = new SchedulerSlotElement();
									slotElement.resourceId = (resource != null) ? resource.value : "0";
									slotElement.start = dayOfWeek;
									slotElement.end = endSlot;
									slotElement.columnIndex = columnIndex;
									slotElement.rowIndex = i;
									this._slotElementList.push(slotElement);

									columnIndex++;
								}
							}
							date.vrAddMinutes(options.timeslotIntervalDuration!);
						}
						//#endregion
					}
					else
					{
						//#region GroupedByDate
						let date = new Date(options.startTime!);
						for (let i = 0; i < numberOfRows; i++)
						{
							let row = document.createElement("tr");
							table.appendChild(row);

							// Time
							let timeString = date.toTimeString();
							let textTime = (i % 2 == 0) ? timeString : "";

							let thTime = document.createElement("th");
							thTime.innerHTML = textTime;
							thTime.classList.add("vrSchedulerThTime");
							if (i % 2 == 0 && i > 0) thTime.classList.add("borderTopSolid");
							row.appendChild(thTime);

							if (!options.timeColumn)
								thTime.style.cssText += "display: none;";

							let borderTopClass = (i == 0) ? "" : ((i % 2 == 0) ? "borderTopSolid" : "borderTopDotted");
							let borderBottomClass = (i == (numberOfRows - 1)) ? "borderBottomSolid" : "";

							// Slots
							let columnIndex = 0;
							for (let j = 0; j < numberOfDays; j++)
							{
								let dayOfWeek = new Date(firstDayOfWeek);
								dayOfWeek.setHours(date.getHours(), date.getMinutes(), 0, 0);
								dayOfWeek = dayOfWeek.vrAddDays(j);

								for (let resource of this.resources())
								{
									let endSlot = new Date(dayOfWeek);
									endSlot.vrAddMinutes(options.timeslotIntervalDuration!);

									let td = document.createElement("td");
									if (borderTopClass != "") td.classList.add(borderTopClass);
									if (borderBottomClass != "") td.classList.add(borderBottomClass);
									td.title = timeString;
									row.appendChild(td);

									if (((columnIndex + 1) % this.resources().length) == 0)
										td.classList.add("borderRightSolid");

									// To fast appointment collocation
									let slotElement = new SchedulerSlotElement();
									slotElement.resourceId = (resource != null) ? resource.value : "0";
									slotElement.start = dayOfWeek;
									slotElement.end = endSlot;
									slotElement.columnIndex = columnIndex;
									slotElement.rowIndex = i;
									this._slotElementList.push(slotElement);

									columnIndex++;
								}
							}
							date.vrAddMinutes(options.timeslotIntervalDuration!);
						}
						//#endregion
					}
					//#endregion
				}
				break;
		}
		divContent.appendChild(contentFragment);

		//#region Now line
		puma(this.getDivContent()).remove(".vrSchedulerNowLine");
		let nowDate = this.date()!;
		nowDate.setHours(new Date().getHours(), new Date().getMinutes(), 0, 0);

		let nowTimeslot = this._slotElementList.filter(k => Date.vrArePeriodsOverlapped(k.start, k.end, nowDate, nowDate, true))[0];
		if (nowTimeslot != null)
		{
			let divNowLine = puma("<div class='vrSchedulerNowLine'><i class='fa fa-caret-left'></i></div>").vrAppendToPuma(this.getDivContent())[0];
			divNowLine.style.cssText += "left: " + this._timeColumnWidth + "px; top: " + ((nowTimeslot.rowIndex * 33) - 1) + "px; width: Calc(100% - " + this._timeColumnWidth + "px);";
		}
		//#endregion

		this.adaptHeight();
	}

	adaptHeight()
	{
		let divContent = this.getDivContent();
		let options = this.getOptions();

		let height: number | string = 0;
		if (options.height == null)
		{
			let schedulerOffset = puma(this.container()).offset().top;
			let contentHeight = (window.innerHeight - schedulerOffset);

			let toolbarHeight = puma(this.container()).find(".vrSchedulerDivToolbar").outerHeight();
			if (!options.showToolbar)
				toolbarHeight = 0;

			let headerHeight = puma(this.container()).find(".vrSchedulerDivHeader").outerHeight();
			if (!options.showHeader)
				headerHeight = 0;

			let diff = toolbarHeight + headerHeight;
			height = contentHeight - diff;
		}
		else
			height = options.height;

		puma(divContent).height(height);
	}

	height(value?: string | number)
	{
		let height = super.height(value);
		puma(this.getDivContent()).height("100%");
		return height;
	}
	//#endregion

	//#region Properties
	view(view?: SchedulerViewEnum): SchedulerViewEnum
	{
		if (view != null)
		{
			//#region Event
			let options = this.getOptions();
			if (options.onViewChange != null)
			{
				let viewChangeEvent = new SchedulerViewChangeEvent();
				viewChangeEvent.sender = this;
				viewChangeEvent.previousView = this._actualView;
				viewChangeEvent.view = view;
				options.onViewChange(viewChangeEvent);

				if (viewChangeEvent.isDefaultPrevented())
					return this._actualView;
			}

			this._actualView = view;
			this._btgMenuView.select([view], false);
			this.drawScheduler();
			//#endregion			

			switch (view)
			{
				case SchedulerViewEnum.Day:
					{
						this._swtGroupByDateResource.hide();
						this._dtpSchedulerDate.format(DateFormatEnum.LongDate);
					}
					break;
				case SchedulerViewEnum.Week:
					{
						this._swtGroupByDateResource.show();
						this._dtpSchedulerDate.format(DateFormatEnum.WeekRange);
					}
					break;
				case SchedulerViewEnum.FourWeeks:
					{
						this._swtGroupByDateResource.hide();
						this._dtpSchedulerDate.format(DateFormatEnum.FourWeeksRange);
					}
					break;
			}

			if (!this.groupedByResource())
				this._swtGroupByDateResource.hide();
		}
		return this._actualView;
	}

	date(date?: Date, triggerChange = true): Date | null
	{
		let options = this.getOptions();
		if (date != null)
		{
			if (this._dtpSchedulerDate.value() != date)
				this._dtpSchedulerDate.value(date, false);

			if (this._dtpSchedulerDate.value() != null)
				this.drawScheduler();

			if (options.onNavigate != null)
			{
				if (this._actualNavigateAction == null)
					this._actualNavigateAction = SchedulerNavigateActionEnum.ChangeDate;

				if (triggerChange)
				{
					let navigateEvent = new SchedulerNavigateEvent();
					navigateEvent.sender = this;
					navigateEvent.action = this._actualNavigateAction;
					navigateEvent.previousDate = this._dtpSchedulerDate.value();
					navigateEvent.date = date;
					navigateEvent.view = this.view();
					options.onNavigate!(navigateEvent);
				}

				this._actualNavigateAction = null;
			}
		}
		return this._dtpSchedulerDate.value();
	}

	resources(resources?: SchedulerResource[])
	{
		let options = this.getOptions();
		if (resources != null)
		{
			let maxResourceNumberBasedOnView: number | null | undefined = null;
			switch (this.view())
			{
				case SchedulerViewEnum.Day: maxResourceNumberBasedOnView = options.maxResourcesNumber!.dayView; break;
				case SchedulerViewEnum.Week: maxResourceNumberBasedOnView = options.maxResourcesNumber!.weekView; break;
				case SchedulerViewEnum.FourWeeks: maxResourceNumberBasedOnView = options.maxResourcesNumber!.fourWeeksView; break;
			}

			if (maxResourceNumberBasedOnView != null && resources.length > maxResourceNumberBasedOnView)
			{
				confirm("Stai impostando un numero di risorse maggiore<br /> del limite massimo impostato (" + maxResourceNumberBasedOnView + ").<br /> Continuare comunque?")
					.then(() =>
					{
						options.resources = resources;
						this.drawScheduler();
						this.triggerResourceChangeEvent();
					},
						() => this.triggerResourceChangeEvent()); // If not
			}
			else
			{
				options.resources = resources;
				this.drawScheduler();
				this.triggerResourceChangeEvent();
			}
		}
		return options.resources!;
	}

	groupedByResource()
	{
		return (this.resources().length > 1 || (this.resources()[0] != null && this.resources()[0].value != ""));
	}

	private triggerResourceChangeEvent()
	{
		let options = this.getOptions();
		if (options.onResourcesChange != null)
		{
			let resourcesChangeEvent = new SchedulerResourcesChangeEvent();
			resourcesChangeEvent.resources = options.resources!;
			resourcesChangeEvent.view = this.view();
			resourcesChangeEvent.sender = this;
			options.onResourcesChange(resourcesChangeEvent);
		}
	}

	timeslotInterval(timeslotIntervalDuration?: number): number
	{
		let options = this.getOptions();
		if (timeslotIntervalDuration != null)
		{
			if (options.onIntervalChange != null)
			{
				let intervalChangeEvent = new SchedulerIntervalChangeEvent();
				intervalChangeEvent.sender = this;
				intervalChangeEvent.previousValue = options.timeslotIntervalDuration;
				intervalChangeEvent.value = timeslotIntervalDuration;
				intervalChangeEvent.view = this.view();
				options.onIntervalChange(intervalChangeEvent);

				if (intervalChangeEvent.isDefaultPrevented())
					return options.timeslotIntervalDuration!;
			}

			options.timeslotIntervalDuration = timeslotIntervalDuration;
			this.drawScheduler();
		}
		return options.timeslotIntervalDuration!;
	}

	firstDayOfWeek(): DayOfWeekEnum
	{
		return this.getOptions().firstDayOfWeek!;
	}

	startTime(): Date
	{
		return this.getOptions().startTime!;
	}

	endTime(): Date
	{
		return this.getOptions().endTime!;
	}

	groupWeekByDate(group?: boolean): boolean
	{
		if (group != null)
		{
			this._swtGroupByDateResource.checked(group, false);
			this.drawScheduler();
			this.rebind();
		}

		if (this.view() != SchedulerViewEnum.Week)
			return false;

		return this._swtGroupByDateResource.checked();
	}

	fullscreen(state?: boolean)
	{
		if (state != null)
		{
			if (state) this._btnExpand.click();
			else this._btnCollapse.click();
		}

		let doc = window.document as any;
		return !(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement);
	}
	//#endregion

	//#region Datasource
	datasource<T extends SchedulerData>(datasource?: T[]): T[]
	{
		if (datasource != null && this._slotElementList.length > 0)
		{
			if (datasource.length == 0)
			{
				this._datasource = datasource;
				puma(this.container()).find(".vrSchedulerAppointment").remove();
				return datasource;
			}

			let options = this.getOptions();

			//#region Appointments on several days
			let realDatasource = [];
			for (let appointment of datasource)
			{
				(appointment as InternalSchedulerAppointment).positioned = false;
				realDatasource.push(appointment);

				let end = new Date(appointment.end);
				let start = new Date(appointment.start);
				let daysDifference = Date.vrDifferenceBetweenDatesInDays(end, start);
				if (daysDifference > 1)
				{
					if (appointment.attributes == null) appointment.attributes = [];
					appointment.attributes.push({ key: "multiday", value: "true" });

					for (let i = 1; i <= daysDifference; i++)
					{
						let newApp = UtilityManager.duplicate(appointment) as T;

						let newStart = start.vrAddDays(i);
						newStart.setHours(this.startTime().getHours());
						newApp.start = newStart;
						newApp.end = new Date(newApp.start).vrAddHours(1);

						if (newApp.attributes == null) newApp.attributes = [];
						newApp.attributes.push({ key: "multiday", value: "true" });

						realDatasource.push(newApp);
					}
				}
			}
			//#endregion

			datasource = realDatasource;

			this.checkMandatorySchedulerDataFields(datasource[0]);
			this._datasource = datasource;
			puma(this.container()).find(".vrSchedulerAppointment").remove();

			let appointmentFragment = document.createDocumentFragment();
			let slotWidthList: number[] = Array.from(puma(this.container()).find(".vrSchedulerDivContent table tr:first-child td")).map(k => { return puma(k).outerWidth() });
			let slotWidth = slotWidthList[0];

			let schedulerStartTime = new Date(options.startTime!);

			//#region Draw appointments
			let dictionaryResourceAppointments: any = datasource.vrGroupBy(k => k.resourceId);
			for (let appointment of datasource)
			{
				if ((appointment as InternalSchedulerAppointment).positioned == true)
					continue;

				if (appointment.resourceId != "0" && (this.resources()[0] == null || !this.resources().map(k => k.value).includes(String(appointment.resourceId))))
					continue;

				//#region Overlapped appointments
				let resourceAppointments = dictionaryResourceAppointments[appointment.resourceId];
				let appointmentsOverlapped = this.findOverlappedAppointments(appointment, resourceAppointments);

				let maxOverlapped = 1;
				for (let apt of appointmentsOverlapped)
				{
					// Find how many appointments in same slots per row
					for (let slot of (apt as InternalSchedulerAppointment).slotsOccupied!)
					{
						slot.columnPosition = [];
						let maxOverlappedSlot = 1;
						let overlappedList: any[] = [];
						for (let apt2 of appointmentsOverlapped)
						{
							if (apt2.id == apt.id)
								continue;

							for (let slot2 of (apt2 as InternalSchedulerAppointment).slotsOccupied!)
							{
								if (Date.vrArePeriodsOverlapped(slot.start, slot.end, slot2.start, slot2.end))
								{
									overlappedList.push(appointment);
									maxOverlappedSlot++;
								}
							}
						}

						// Get max overlapped number
						if (maxOverlappedSlot > maxOverlapped)
							maxOverlapped = maxOverlappedSlot;

						(apt as InternalSchedulerAppointment).overlappedList = overlappedList.vrDistinctBy(k => k.id);
					}
				}
				//#endregion

				appointmentsOverlapped.vrSortDesc("duration");
				for (let apt of appointmentsOverlapped)
				{
					// Set correct dates based on timeslotInterval
					let start = new Date(apt.start);
					this.adaptDateToTimeslotDuration(start, SchedulerDateTypeEnum.Start);

					let end = new Date(apt.end);
					this.adaptDateToTimeslotDuration(end, SchedulerDateTypeEnum.End);

					// Find slot to position appointment
					let slotFiltered: SchedulerSlotElement = (apt as InternalSchedulerAppointment).slotsOccupied![0];
					if (slotFiltered != null)
					{
						//#region If appointment starts before the scheduler's start time
						let differenceFromStartTime = 0;
						let schedulerStart = new Date(start);
						schedulerStart.setHours(schedulerStartTime.getHours(), schedulerStartTime.getMinutes());
						if (start.vrIsLessThan(schedulerStart))
							differenceFromStartTime = Date.vrDifferenceBetweenDatesInMinutes(start, schedulerStart);
						//#endregion

						//#region Position appointment
						let duration = Date.vrDifferenceBetweenDatesInMinutes(start, end) - differenceFromStartTime;
						let timeslotInterval = this.timeslotInterval();
						let height = Math.round(duration / timeslotInterval) * 33 + duration / timeslotInterval - 6;
						height -= Math.round(duration / timeslotInterval);

						//#region Fix max height
						let maxPositionY = this._slotElementList[this._slotElementList.length - 1].rowIndex * 33 + 33;
						let finalAppointmentPositionY = (slotFiltered.rowIndex * 33) + height;
						if (finalAppointmentPositionY > maxPositionY)
							height = height - (finalAppointmentPositionY - maxPositionY) - 1;
						//#endregion

						//#region Know if a piece of slot is already occupied
						let occupiedSlotList = (apt as InternalSchedulerAppointment).slotsOccupied!.map(k => k.columnPosition);
						let index = 0;
						for (let i = 0; i < maxOverlapped; i++)
						{
							let goTo = true;
							index = i;
							for (let occupiedSlot of occupiedSlotList)
							{
								if (occupiedSlot[i] == true)
									goTo = false;
							}

							if (goTo)
								break;
						}
						//#endregion

						// Fix width
						let width = (slotWidth * 85 / 100) / maxOverlapped;
						width = width;
						if (width <= 0)
							width = 1;

						// Get xPosition
						let slotFilteredWidth = slotWidthList.slice(0, slotFiltered.columnIndex).vrSum();
						let newSlotFilteredWidth = slotWidthList[0] * slotFiltered.columnIndex; // 21/06/2021 - old: slotFilteredWidth + this._timeColumnWidth
						let positionX = newSlotFilteredWidth + (index * width) + index + this._timeColumnWidth;

						// Set slot as occupied at specified index
						for (let slot of (apt as InternalSchedulerAppointment).slotsOccupied!)
							slot.columnPosition[index] = true;

						// Draw appointment
						let divAppointment = document.createElement("div");
						divAppointment.style.cssText += "top: " + (slotFiltered.rowIndex * 33) + "px; left: " + positionX + "px;";
						divAppointment.className = "vrSchedulerAppointment";

						//#region Width/Height
						divAppointment.style.cssText += "width: " + width + "px; height: " + height + "px;";
						//#endregion

						this.managePropertiesSchedulerData(divAppointment, apt);
						appointmentFragment.appendChild(divAppointment);
						//#endregion

						//#region Move appointment
						puma(divAppointment).on("mousedown", (emd: JQuery.MouseDownEvent) =>
						{
							if (!this.enabled() || !options.editable!.move || this._isResizing)
							{
								emd.preventDefault();
								return;
							}

							// Main mouse button (usually left)
							if (emd.button != 0)
							{
								emd.preventDefault();
								return;
							}

							let schedulerOffsetTop = puma(this.getDivContent()).offset().top;
							let schedulerScrollOffset = this.getDivContent().scrollTop;
							let schedulerOffsetLeft = puma(this.getDivContent()).offset().left;

							let slotToMove: SchedulerSlotElement | null = null;

							//#region Starting position
							let startingXPosition = emd.clientX;
							let startingYPosition = emd.clientY;
							let slotStartingPosition: SchedulerSlotElement | null = null;
							let sum = 0;
							let slotColumnIndex = 0;
							for (let slotsss of slotWidthList)
							{
								sum += slotsss;
								if ((sum + this._timeColumnWidth) > startingXPosition)
									break;

								slotColumnIndex++;
							}
							slotStartingPosition = this._slotElementList[slotColumnIndex];
							let diffYMouseAppointment = Math.abs(divAppointment.offsetTop - (emd.clientY + schedulerScrollOffset - schedulerOffsetTop));
							//#endregion

							puma(document).on("mousemove", (emm: MouseEvent) =>
							{
								if (!this.enabled() || !options.editable!.move || this._isResizing)
								{
									emm.preventDefault();
									return;
								}

								// Position of the mouse
								let xPositionMouse = emm.clientX - schedulerOffsetLeft;
								let yPositionMouse = emm.clientY + schedulerScrollOffset - schedulerOffsetTop;

								// Position of appointment
								let appointmentYPosition = divAppointment.offsetTop;
								let appointmentHeight = divAppointment.clientHeight;
								let appointmentXPosition = divAppointment.offsetLeft;
								let appointmentWidth = divAppointment.clientWidth;

								// Sensibility
								if (yPositionMouse >= appointmentYPosition && yPositionMouse <= (appointmentYPosition + appointmentHeight)
									&& xPositionMouse >= appointmentXPosition && xPositionMouse <= (appointmentXPosition + appointmentWidth)
									&& slotToMove == null)
									slotToMove = null;
								// If it is only a click
								else if (emm.clientX == startingXPosition && emm.clientY == startingYPosition)
									slotToMove = null;
								// If you are moving
								else
								{
									let appointmentDataSource = null;
									if (apt.resourceId != null)
										appointmentDataSource = this.datasource().filter(k => k.id == divAppointment.id && k.resourceId == apt.resourceId)[0];
									else
										appointmentDataSource = this.datasource().filter(k => k.id == divAppointment.id)[0];

									let appointmentIndex = this.datasource().indexOf(appointmentDataSource);
									appointmentDataSource = this.datasource()[appointmentIndex];

									//#region Find slot
									let sum = 0;
									let slotColumnIndex = 0;
									for (let slotsss of slotWidthList)
									{
										sum += slotsss;
										if ((sum + this._timeColumnWidth) > xPositionMouse)
											break;

										slotColumnIndex++;
									}
									slotToMove = this._slotElementList.filter(k => k.columnIndex == slotColumnIndex && k.rowIndex == Math.trunc((yPositionMouse - diffYMouseAppointment) / 33))[0];
									//#endregion

									let duration = Date.vrDifferenceBetweenDatesInMinutes(apt.end, apt.start);
									let start = new Date(apt.start);
									let end = new Date(start).vrAddMinutes(duration);

									let options = this.getOptions();
									if (options.onMoveStart != null && !this._isMoving)
									{
										//#region Move start event
										this._isMoving = true;

										let moveAppointmentEvent = new SchedulerMoveStartEvent();
										moveAppointmentEvent.sender = this;
										moveAppointmentEvent.divElement = divAppointment;
										moveAppointmentEvent.start = start;
										moveAppointmentEvent.end = end;
										moveAppointmentEvent.dataItem = appointmentDataSource;
										moveAppointmentEvent.resourceId = slotStartingPosition!.resourceId;
										options.onMoveStart(moveAppointmentEvent);

										if (moveAppointmentEvent.isDefaultPrevented())
										{
											emm.preventDefault();
											puma(document).unbind("mouseup");
											puma(document).unbind("mousemove");
											slotToMove = null;
											this._isMoving = false;
											return;
										}
										//#endregion
									}
									else if (options.onMoving != null)
									{
										//#region Moving event
										start = new Date(slotToMove.start);
										end = new Date(slotToMove.start).vrAddMinutes(duration);

										let moveAppointmentEvent = new SchedulerMovingEvent();
										moveAppointmentEvent.sender = this;
										moveAppointmentEvent.divElement = divAppointment;
										moveAppointmentEvent.start = start;
										moveAppointmentEvent.end = end;
										moveAppointmentEvent.dataItem = appointmentDataSource;
										moveAppointmentEvent.resourceId = slotToMove.resourceId;
										options.onMoving(moveAppointmentEvent);

										if (moveAppointmentEvent.isDefaultPrevented())
										{
											emm.preventDefault();
											puma(document).unbind("mouseup");
											puma(document).unbind("mousemove");
											slotToMove = null;
											return;
										}
										//#endregion
									}

									let yMovePosition = Math.trunc((yPositionMouse - diffYMouseAppointment) / 33) * 33;
									let xMovePosition = slotWidthList.slice(0, slotToMove.columnIndex).vrSum() + this._timeColumnWidth;

									divAppointment.style.top = yMovePosition + "px";
									divAppointment.style.left = xMovePosition + "px";

									divAppointment.classList.add("vrSchedulerAppointmentMoving");
								}
							});

							// Stop moving
							puma(document).on("mouseup", () =>
							{
								if (!this.enabled() || !options.editable!.move || this._isResizing)
									return;

								puma(document).unbind("mouseup");
								puma(document).unbind("mousemove");

								puma(divAppointment).removeClass("vrSchedulerAppointmentMoving");
								puma(this.getDivContent()).remove(".vrSchedulerAppointmentMoving");

								window.setTimeout(() => this._isMoving = false, 100);
								if (slotToMove != null)
								{
									let duration = Date.vrDifferenceBetweenDatesInMinutes(apt.end, apt.start);
									let start = new Date(slotToMove.start);
									let end = new Date(start).vrAddMinutes(duration);

									let appointmentDataSource = null;
									if (apt.resourceId != null)
										appointmentDataSource = this.datasource().filter(k => k.id == divAppointment.id && k.resourceId == apt.resourceId)[0];
									else
										appointmentDataSource = this.datasource().filter(k => k.id == divAppointment.id)[0];

									//#region Move end event
									let options = this.getOptions();
									if (options.onMoveEnd != null)
									{
										let moveAppointmentEvent = new SchedulerMoveEndEvent();
										moveAppointmentEvent.sender = this;
										moveAppointmentEvent.divElement = divAppointment;
										moveAppointmentEvent.start = start;
										moveAppointmentEvent.end = end;
										moveAppointmentEvent.dataItem = appointmentDataSource;
										moveAppointmentEvent.resourceId = slotToMove.resourceId;
										options.onMoveEnd(moveAppointmentEvent);

										if (moveAppointmentEvent.isDefaultPrevented())
										{
											slotToMove = null;
											return;
										}
									}
									//#endregion

									//#region Update appointment into datasource
									let appointmentIndex = this.datasource().indexOf(appointmentDataSource);
									appointmentDataSource = this.datasource()[appointmentIndex];
									appointmentDataSource.start = start;
									appointmentDataSource.end = end;
									appointmentDataSource.resourceId = slotToMove.resourceId;
									//#endregion

									slotToMove = null;
								}
							});
						});
						//#endregion

						//#region Resize appointment
						this.setResizing(divAppointment, apt);
						//#endregion
					}
				}
			}
			this.getDivContent().appendChild(appointmentFragment);
			//#endregion
		}
		return (this._datasource == null) ? [] : this._datasource as T[];
	}

	private setResizing(divAppointment: HTMLDivElement, apt: SchedulerData)
	{
		let options = this.getOptions();
		if (!this.enabled() || !options.editable!.resize)
			return;

		let divResizable = document.createElement("div");
		divResizable.classList.add("vrSchedulerDivResize");

		let divInside = document.createElement("div");
		divInside.classList.add("vrSchedulerDivResizeInside");
		divResizable.appendChild(divInside);
		divAppointment.appendChild(divResizable);

		puma(divAppointment).on("mouseover", (e: JQuery.MouseOverEvent) => divResizable.style.display = "block");
		puma(divAppointment).on("mouseout", (e: JQuery.MouseOutEvent) => divResizable.style.display = "none");

		let pageY: number | null = null;
		let slotToResize: SchedulerSlotElement | null;

		let schedulerOffsetTop = puma(this.getDivContent()).offset().top;
		let schedulerScrollOffset = this.getDivContent().scrollTop;
		let schedulerOffsetLeft = puma(this.getDivContent()).offset().left;

		let resizing = false;

		//#region Div events
		puma(divResizable).on("mousedown", (e: JQuery.MouseDownEvent) =>
		{
			// Main mouse button (usually left)
			if (e.button != 0)
			{
				e.preventDefault();
				return;
			}

			this._isResizing = true;
			pageY = e.pageY;
			let divAppointmentHeight = divAppointment!.offsetHeight;

			//#region Document events
			puma(document).on("mousemove", (e: JQuery.MouseMoveEvent) =>
			{
				if (divAppointment != null)
				{
					let appointmentDataSource = null;
					if (apt.resourceId != null)
						appointmentDataSource = this.datasource().filter(k => k.id == divAppointment.id && k.resourceId == apt.resourceId)[0];
					else
						appointmentDataSource = this.datasource().filter(k => k.id == divAppointment.id)[0];

					let appointmentIndex = this.datasource().indexOf(appointmentDataSource);
					appointmentDataSource = this.datasource()[appointmentIndex];

					// Position of the mouse
					let xPositionMouse = e.clientX - schedulerOffsetLeft;
					let yPositionMouse = e.clientY + schedulerScrollOffset - schedulerOffsetTop;

					slotToResize = this._slotElementList.filter(k => k.resourceId == apt.resourceId && k.rowIndex == Math.trunc(yPositionMouse / 33))[0];

					if (options.onResizeStart != null && !resizing)
					{
						//#region Move start event
						this._isResizing = true;
						resizing = true;

						let resizeStartEvent = new SchedulerResizeStartEvent();
						resizeStartEvent.sender = this;
						resizeStartEvent.divElement = divAppointment;
						resizeStartEvent.start = apt.start;
						resizeStartEvent.end = apt.end;
						resizeStartEvent.dataItem = appointmentDataSource;
						resizeStartEvent.resourceId = apt.resourceId;
						options.onResizeStart(resizeStartEvent);

						if (resizeStartEvent.isDefaultPrevented())
						{
							e.preventDefault();
							puma(document).unbind("mouseup");
							puma(document).unbind("mousemove");
							slotToResize = null;
							this._isResizing = false;
							resizing = false;
							return;
						}
						//#endregion
					}
					else if (options.onResizing != null)
					{
						//#region Moving event
						let resizingEvent = new SchedulerResizingEvent();
						resizingEvent.sender = this;
						resizingEvent.divElement = divAppointment;
						resizingEvent.start = apt.start;
						resizingEvent.end = slotToResize.end;
						resizingEvent.dataItem = appointmentDataSource;
						resizingEvent.resourceId = apt.resourceId;
						options.onResizing(resizingEvent);

						if (resizingEvent.isDefaultPrevented())
						{
							e.preventDefault();
							puma(document).unbind("mouseup");
							puma(document).unbind("mousemove");
							slotToResize = null;
							return;
						}
						//#endregion
					}

					let diffY = e.pageY - pageY!;
					let diffToAdd = Math.trunc(diffY / 33) * 33;
					let height = (divAppointmentHeight! + diffToAdd);
					height -= height % 33;
					divAppointment.style.height = height + "px";
				}
			});

			puma(document).on("mouseup", () =>
			{
				puma(document).unbind("mouseup");
				puma(document).unbind("mousemove");
				window.setTimeout(() => this._isResizing = false, 100);

				if (slotToResize != null)
				{
					let appointmentDataSource = null;
					if (apt.resourceId != null)
						appointmentDataSource = this.datasource().filter(k => k.id == divAppointment.id && k.resourceId == apt.resourceId)[0];
					else
						appointmentDataSource = this.datasource().filter(k => k.id == divAppointment.id)[0];

					//#region Move end event
					let options = this.getOptions();
					if (options.onResizeEnd != null)
					{
						let moveAppointmentEvent = new SchedulerMoveEndEvent();
						moveAppointmentEvent.sender = this;
						moveAppointmentEvent.divElement = divAppointment;
						moveAppointmentEvent.start = apt.start;
						moveAppointmentEvent.end = slotToResize.end;
						moveAppointmentEvent.dataItem = apt;
						moveAppointmentEvent.resourceId = apt.resourceId;
						options.onResizeEnd(moveAppointmentEvent);

						if (moveAppointmentEvent.isDefaultPrevented())
						{
							slotToResize = null;
							return;
						}
					}
					//#endregion

					//#region Update appointment into datasource
					let appointmentIndex = this.datasource().indexOf(appointmentDataSource);
					appointmentDataSource = this.datasource()[appointmentIndex];
					appointmentDataSource.start = apt.start;
					appointmentDataSource.end = slotToResize.end;
					appointmentDataSource.resourceId = apt.resourceId;
					//#endregion

					slotToResize = null;
					pageY = null;
				}
			});
			//#endregion
		});
	}

	availabilities<T extends SchedulerData>(availabilities?: T[]): T[]
	{
		if (availabilities != null)
		{
			if (availabilities.length == 0)
			{
				this._availabilities = [];
				puma(this.container()).find(".vrSchedulerAvailability").remove();
				return this._availabilities as T[];
			}

			let options = this.getOptions();
			this.checkMandatorySchedulerDataFields(availabilities[0]);
			this._availabilities = availabilities;

			puma(this.container()).find(".vrSchedulerAvailability").remove();

			let availabilityFragment = document.createDocumentFragment();
			let slotWidthList = Array.from(puma(this.container()).find(".vrSchedulerDivContent table tr:first-child td")).map(k => { return puma(k).outerWidth() });
			let totalMinutes = Date.vrDifferenceBetweenDatesInMinutes(options.startTime!, options.endTime!);

			let contentHeight = puma(this.getDivContent()).find("table").height();
			for (let availability of availabilities)
			{
				// Fixed date
				let dateFrom = Date.vrConvertDateFromServer(new Date(availability.start));
				let dateTo = Date.vrConvertDateFromServer(new Date(availability.end));

				let slotForAvailability: SchedulerSlotElement = this._slotElementList.filter(k => (availability.resourceId == k.resourceId || availability.resourceId == null) && Date.vrArePeriodsOverlapped(k.start, k.end, dateFrom, dateTo))[0];
				if (slotForAvailability != null)
				{
					// Get xPosition
					let newSlotFilteredWidth = slotWidthList[0] * slotForAvailability.columnIndex;
					let positionX = newSlotFilteredWidth + this._timeColumnWidth;
					let positionY = slotForAvailability.rowIndex * 33;

					//#region Height
					let duration = Date.vrDifferenceBetweenDatesInMinutes(slotForAvailability.start, availability.end);
					if (duration > totalMinutes)
						duration = totalMinutes;

					let height = Math.round(duration / this.timeslotInterval()) * 33;
					height = height - (height % 33);
					if (height <= 0)
						height = 33;

					if ((positionY + height) > contentHeight)
						height -= ((positionY + height) - contentHeight);
					//#endregion

					// Draw availability
					let divAvailability = document.createElement("div");
					divAvailability.style.cssText = "top: " + positionY + "px; left: " + positionX + "px;";
					divAvailability.className = "vrSchedulerAvailability";

					//#region Width/Height
					divAvailability.style.cssText += "width: " + slotWidthList[slotForAvailability.columnIndex] + "px; height: " + height + "px;";
					//#endregion

					this.managePropertiesSchedulerData(divAvailability, availability);
					availabilityFragment.appendChild(divAvailability);
				}
			}
			this.getDivContent().appendChild(availabilityFragment);
		}
		return this._availabilities as T[];
	}

	private checkMandatorySchedulerDataFields(schedulerData: SchedulerData)
	{
		let error = [];
		if (schedulerData.id == null)
			error.push("id");
		if (schedulerData.start == null)
			error.push("start");
		if (schedulerData.end == null)
			error.push("end");

		if (error.length > 0)
			throw Error("Prevedere i seguenti campi: " + error.toString());
	}

	private managePropertiesSchedulerData(divElement: HTMLElement, schedulerData: SchedulerData)
	{
		divElement.id = schedulerData.id;

		//#region Color
		if (schedulerData.tooltip != null)
			divElement.setAttribute("title", schedulerData.tooltip);

		if (schedulerData.backgroundColor != null)
			divElement.style.backgroundColor = schedulerData.backgroundColor;

		if (schedulerData.textColor != null)
			divElement.style.color = schedulerData.textColor;
		//#endregion

		//#region Text
		if (schedulerData.text != null)
			divElement.insertAdjacentHTML("afterbegin", schedulerData.text);
		//#endregion

		//#region Custom CSS/Class
		if (schedulerData.css != null && schedulerData.css != "")
			divElement.style.cssText += schedulerData.css;

		if (schedulerData.class != null && schedulerData.class != "")
			divElement.classList.add(schedulerData.class);
		//#endregion

		//#region Attributes
		divElement.setAttribute("resourceId", schedulerData.resourceId);
		divElement.setAttribute("start", schedulerData.start.toString());
		divElement.setAttribute("end", schedulerData.end.toString());

		if (schedulerData.attributes != null)
		{
			for (let attribute of schedulerData.attributes)
				divElement.setAttribute(attribute.key, attribute.value);
		}
		//#endregion
	}

	rebind(appointments = true, availabilities = true)
	{
		if (appointments) this.rebindAppointments();
		if (availabilities) this.rebindAvailabilities();
	}

	rebindAppointments()
	{
		this.datasource(this._datasource);
	}

	rebindAvailabilities()
	{
		this.availabilities(this._availabilities);
	}
	//#endregion

	//#region Saturation
	saturation(saturationData?: SchedulerSaturationInfo)
	{
		if (saturationData != null)
		{
			if (saturationData.manual == null) saturationData.manual = false;
			this._saturationData = saturationData;

			this._saturationVisible = true;
			if (!saturationData.manual)
				this.internalHideSaturation();

			switch (this.view())
			{
				case SchedulerViewEnum.Day:
					{
						//#region Day
						let saturationDay = saturationData.dayMode;
						if (saturationDay != null)
						{
							for (let saturation of saturationDay)
							{
								if (saturation.date != null && typeof (saturation.date) == "string")
								{
									saturation.date = new Date(saturation.date);
									saturation.date.setHours(0, 0, 0);
								}

								let schedulerDate = this.date();
								schedulerDate!.setHours(0, 0, 0);
								if (saturation.date != null && !Date.vrEquals(saturation.date, schedulerDate!))
									break;

								let divSaturation = puma(".vrSchedulerDayResource[resourceId='" + saturation.resourceId + "'] .vrSchedulerDivSaturation")[0];
								let spanPercentage = puma(".vrSchedulerDayResource[resourceId='" + saturation.resourceId + "'] .vrSchedulerSpanSaturation")[0];
								this.manageSaturationPercentage(saturation, divSaturation, spanPercentage);
							}
							this.adaptHeight();
						}
						//#endregion
					}
					break;
				case SchedulerViewEnum.Week:
					{
						//#region Week
						let saturationWeek = saturationData.weekMode;
						if (saturationWeek != null)
						{
							if (!this.groupWeekByDate())
							{
								//#region GroupedByResources
								let saturationWeekGroupedByResource = saturationWeek.groupedByResource;
								if (saturationWeekGroupedByResource != null)
								{
									for (let saturation of saturationWeekGroupedByResource)
										this.manageWeekDateList(saturation);
								}
								//#endregion
							}
							else
							{
								//#region GroupedByDate
								let saturationWeekGroupedByDate = saturationWeek.groupedByDate;
								if (saturationWeekGroupedByDate != null)
								{
									for (let saturation of saturationWeekGroupedByDate)
									{
										if (typeof (saturation.date) == "string")
										{
											saturation.date = new Date(saturation.date);
											saturation.date.setHours(0, 0, 0);
										}

										let day = saturation.date.getDate();
										let month = saturation.date.getMonth();
										let year = saturation.date.getFullYear();

										if (saturation.resourceList != null)
										{
											for (let saturationResource of saturation.resourceList)
											{
												let thResource = puma(".vrSchedulerDayResource[resourceId='" + saturationResource.id + "'][day='" + day + "'][month='" + month + "'][year='" + year + "']")[0];
												if (thResource != null)
												{
													let divSaturation = puma(thResource).find(".vrSchedulerDivSaturation")[0];
													let spanPercentage = puma(thResource).find(".vrSchedulerSpanSaturation")[0];
													this.manageSaturationPercentage(saturationResource, divSaturation, spanPercentage);
												}
											}
										}
									}
								}
								//#endregion
							}
							this.adaptHeight();
						}
						//#endregion
					}
					break;
				case SchedulerViewEnum.FourWeeks:
					{
						//#region FourWeeks
						let saturationFourWeeks = saturationData.fourWeeksMode;
						if (saturationFourWeeks != null)
						{
							for (let saturation of saturationFourWeeks)
								this.manageWeekDateList(saturation);

							this.adaptHeight();
						}
						//#endregion
					}
					break;
			}
		}
		return this._saturationData;
	}

	private manageSaturationPercentage(saturation: SchedulerSaturationDay | SaturationResource, divSaturation: HTMLElement, spanPercentage: HTMLElement)
	{
		let borderColor = (saturation.borderColor != null) ? saturation.borderColor : "#CCC";
		if (divSaturation != null)
			divSaturation.style.cssText += "border-color: " + borderColor + ";";

		let color = (saturation.color != null) ? saturation.color : "#bbb8b8";
		if (spanPercentage != null)
		{
			puma(spanPercentage).width(saturation.percentageValue + "%");
			spanPercentage.style.cssText += "background-color: " + color + ";";
			spanPercentage.parentElement!.title = saturation.percentageValue + "%";

			if (saturation.percentageValue != null)
				puma(spanPercentage).parent().css("display", "flex");
		}
	}

	private manageWeekDateList(saturation: SchedulerSaturationWeekByResource | SchedulerSaturationFourWeeks)
	{
		let spanPercentageResource = puma(".vrSchedulerDayResource[resourceId='" + saturation.resourceId + "'] .vrSchedulerSaturationPercentage")[0];
		if (spanPercentageResource != null)
		{
			puma(spanPercentageResource).show();
			spanPercentageResource.innerHTML = " " + ((saturation.percentageValue != null) ? saturation.percentageValue : "") + "%";

			if (saturation.titleColor == null) saturation.titleColor = "#000";
			spanPercentageResource.style.cssText += "color: " + saturation.titleColor;
		}

		if (saturation.dateList != null)
		{
			for (let saturationDate of saturation.dateList)
			{
				if (typeof (saturationDate.date) == "string")
				{
					saturationDate.date = new Date(saturationDate.date);
					saturationDate.date.setHours(0, 0, 0);
				}

				let color = (saturationDate.color != null) ? saturationDate.color : "#bbb8b8";
				let day = saturationDate.date.getDate();
				let month = saturationDate.date.getMonth();
				let year = saturationDate.date.getFullYear();

				let thWeekDay = puma(".vrSchedulerWeekDay[resourceId='" + saturation.resourceId + "'][day='" + day + "'][month='" + month + "'][year='" + year + "']")[0];
				if (thWeekDay != null)
				{
					let divSaturation = puma(thWeekDay).find(".vrSchedulerDivSaturation")[0];
					let borderColor = (saturationDate.borderColor != null) ? saturationDate.borderColor : "#CCC";
					if (divSaturation != null)
						divSaturation.style.cssText += "border-color: " + borderColor + ";";

					let spanPercentage = puma(thWeekDay).find(".vrSchedulerSpanSaturation")[0];
					if (spanPercentage != null)
					{
						puma(spanPercentage).width(saturationDate.percentageValue + "%");
						spanPercentage.style.cssText += "background-color: " + color + ";";
						spanPercentage.parentElement!.title = saturationDate.percentageValue + "%";

						if (saturationDate.percentageValue != null)
							puma(spanPercentage).parent().css("display", "flex");
					}
				}
			}
		}
	}

	clearSaturation()
	{
		this._saturationData = undefined;
		this.hideSaturation();
	}

	showSaturation()
	{
		this.internalShowSaturation();
		this._saturationVisible = true;
	}

	private internalShowSaturation()
	{
		for (let divSaturation of Array.from<HTMLElement>(puma(".vrSchedulerDivSaturation")))
			divSaturation.style.cssText += "display: flex;";

		puma(".vrSchedulerSaturationPercentage").show();
		this.adaptHeight();
	}

	hideSaturation()
	{
		this.internalHideSaturation();
		this._saturationVisible = false;
	}

	private internalHideSaturation()
	{
		puma(".vrSchedulerDivSaturation").hide();
		puma(".vrSchedulerSaturationPercentage").hide();
		this.adaptHeight();
	}

	saturationVisible()
	{
		return this._saturationVisible;
	}
	//#endregion

	//#region Methods
	bounceAppointment(divElementId: string)
	{
		if (!divElementId.startsWith("#"))
			divElementId = "#" + divElementId;

		let divAppointment = puma(divElementId)[0];
		if (divAppointment != null)
		{
			divAppointment.classList.add("vrSchedulerAppointmentAnimated");
			divAppointment.classList.add("vrSchedulerAppointmentBounce");
		}
	}

	private manageSchedulerClick()
	{
		puma(this.element()).on("click", ".vrSchedulerDivContent td, .vrSchedulerAppointment, .vrSchedulerAvailability", (e: any) =>
		{
			let options = this.getOptions();
			if (!this.enabled())
				return;

			let target = puma(e.currentTarget);
			let schedulerOffsetTop = puma(this.getDivContent()).offset().top;
			let schedulerScrollOffset = this.getDivContent().scrollTop;
			let schedulerOffsetLeft = puma(this.getDivContent()).offset().left;

			let slotWidth = puma(this.container()).find(".vrSchedulerDivContent table td").outerWidth();
			let xPositionMouse = e.clientX - schedulerOffsetLeft;
			let yPositionMouse = e.clientY + schedulerScrollOffset - schedulerOffsetTop;
			let slotElement = this._slotElementList.filter(k => k.columnIndex == (Math.trunc((xPositionMouse - 63) / slotWidth)) && k.rowIndex == Math.trunc(yPositionMouse / 33))[0];
			if (slotElement == null)
				return;

			let duplicatedSlotElement = UtilityManager.duplicate(slotElement);
			duplicatedSlotElement.start = new Date(duplicatedSlotElement.start);
			duplicatedSlotElement.end = new Date(duplicatedSlotElement.end);

			// 0 = Main mouse button (usually left)
			if (e.button == 0 && !this._isMoving && !this._isResizing)
			{
				if (target.hasClass("vrSchedulerAppointment"))
				{
					let appointmentDataSource = this.datasource().filter(k => k.id == target[0].id)[0];
					let duration = Date.vrDifferenceBetweenDatesInMinutes(appointmentDataSource.end, appointmentDataSource.start);
					let start = new Date(appointmentDataSource.start);
					let end = new Date(start).vrAddMinutes(duration);

					//#region Click on appointment
					if (options.onAppointmentClick != null)
					{
						let clickOnAppointmentEvent = new SchedulerAppointmentClickEvent();
						clickOnAppointmentEvent.sender = this;
						clickOnAppointmentEvent.slotElement = duplicatedSlotElement;
						clickOnAppointmentEvent.start = start;
						clickOnAppointmentEvent.end = end;
						clickOnAppointmentEvent.resourceId = appointmentDataSource.resourceId;
						clickOnAppointmentEvent.dataItem = appointmentDataSource;
						clickOnAppointmentEvent.element = target[0];
						options.onAppointmentClick(clickOnAppointmentEvent);
					}
					//#endregion
				}
				else if (target.hasClass("vrSchedulerAvailability"))
				{
					let availabilityDataSource = this.availabilities().filter(k => k.id == target[0].id)[0];
					let duration = Date.vrDifferenceBetweenDatesInMinutes(availabilityDataSource.end, availabilityDataSource.start);
					let start = new Date(availabilityDataSource.start);
					let end = new Date(start).vrAddMinutes(duration);

					//#region Click on availability
					if (options.onAvailabilityClick != null)
					{
						let clickOnAvailabilityEvent = new SchedulerAvailabilityClickEvent();
						clickOnAvailabilityEvent.sender = this;
						clickOnAvailabilityEvent.slotElement = duplicatedSlotElement;
						clickOnAvailabilityEvent.start = start;
						clickOnAvailabilityEvent.end = end;
						clickOnAvailabilityEvent.resourceId = availabilityDataSource.resourceId;
						clickOnAvailabilityEvent.dataItem = availabilityDataSource;
						clickOnAvailabilityEvent.element = target[0];
						options.onAvailabilityClick(clickOnAvailabilityEvent);
					}
					//#endregion
				}
				else
				{
					//#region Click on timeslot
					if (options.onTimeslotClick != null)
					{
						let clickOnTimeslotEvent = new SchedulerTimeslotClickEvent();
						clickOnTimeslotEvent.sender = this;
						clickOnTimeslotEvent.slotElement = duplicatedSlotElement;
						clickOnTimeslotEvent.start = duplicatedSlotElement.start;
						clickOnTimeslotEvent.end = duplicatedSlotElement.end;
						clickOnTimeslotEvent.resourceId = slotElement.resourceId;
						clickOnTimeslotEvent.element = target[0];
						options.onTimeslotClick(clickOnTimeslotEvent);
					}
					//#endregion
				}
			}
			else
			{
				this._isMoving = false;
				this._isResizing = false;
			}
		});

		puma(this.element()).on("click", ".vrSchedulerDayResource", (e: any) =>
		{
			// Only if left key
			if (e.button == 0)
			{
				let target = puma(e.currentTarget);
				let resourceId = target[0].getAttribute("resourceId")!;
				let resourceName = target[0].getAttribute("resourceName")!.replace("~", " ");

				let resource = new SchedulerResource();
				resource.value = resourceId;
				resource.text = resourceName;
				this.resources([resource]);

				this.view(SchedulerViewEnum.FourWeeks);
			}
		});

		puma(this.element()).on("click", ".vrSchedulerWeekDay", (e: any) =>
		{
			// Only if left key
			if (e.button == 0)
			{
				let target = puma(e.currentTarget);
				let day = target[0].getAttribute("day")!;
				let month = target[0].getAttribute("month")!;
				let year = target[0].getAttribute("year")!;

				this.view(SchedulerViewEnum.Day);
				let date = new Date(year, month, day);
				this.date(date);
			}
		});
	}

	private getDivContent(): HTMLElement
	{
		return puma(this.container()).find(".vrSchedulerDivContent")[0];
	}
	//#endregion

	//#region Utilities
	private findOverlappedAppointments(appointment: SchedulerData, resourceAppointments: SchedulerData[]): SchedulerData[]
	{
		// Set correct dates based on timeslotInterval
		let start = new Date(appointment.start);
		this.adaptDateToTimeslotDuration(start, SchedulerDateTypeEnum.Start);

		let end = new Date(appointment.end);
		this.adaptDateToTimeslotDuration(end, SchedulerDateTypeEnum.End);

		// Get appointment slots
		let appointmentSlots = this.getAppointmentSlots(appointment);

		let appointmentsOverlapped: any[] = [];
		(appointment as InternalSchedulerAppointment).positioned = true;
		(appointment as InternalSchedulerAppointment).slotsOccupied = appointmentSlots;
		appointmentsOverlapped.push(appointment);

		// Get overlapped appointments
		for (let resAppointment of resourceAppointments)
		{
			if ((resAppointment as InternalSchedulerAppointment).positioned)
				continue;

			// Set dates based on timeslotInterval
			let resAppointmentStart = new Date(resAppointment.start);
			this.adaptDateToTimeslotDuration(resAppointmentStart, SchedulerDateTypeEnum.Start);

			let resAppointmentEnd = new Date(resAppointment.end);
			this.adaptDateToTimeslotDuration(resAppointmentEnd, SchedulerDateTypeEnum.End);

			// If overlap
			if (/*start.getDate() == resAppointmentStart.getDate() && end.getDate() == resAppointmentEnd.getDate()
				&&*/ start < resAppointmentEnd && end > resAppointmentStart)
			{
				let overlappedList = this.findOverlappedAppointments(resAppointment, resourceAppointments);
				for (let overlappedApt of overlappedList)
					appointmentsOverlapped.push(overlappedApt);
			}
		}
		return appointmentsOverlapped;
	}

	private adaptDateToTimeslotDuration(date: Date, dateType: SchedulerDateTypeEnum)
	{
		let minutes = date.getMinutes();
		let timeslotInterval = this.timeslotInterval();

		if (dateType == SchedulerDateTypeEnum.Start)
		{
			if (minutes % timeslotInterval > 0)
				date.setMinutes(minutes - (minutes % timeslotInterval));
		}
		else if (dateType == SchedulerDateTypeEnum.End)
		{
			if (minutes % timeslotInterval > 0)
				date.setMinutes(minutes + (timeslotInterval - (minutes % timeslotInterval)));
		}
		return date;
	}

	private getAppointmentSlots(appointment: SchedulerData): SchedulerSlotElement[]
	{
		let start = new Date(appointment.start);
		let end = new Date(appointment.end);
		return this._slotElementList.filter(k => (appointment.resourceId == k.resourceId || appointment.resourceId == null) && k.start.getDate() == start.getDate() && Date.vrArePeriodsOverlapped(k.start, k.end, start, end));
	}

	exportPdf(fileName = "Calendario.pdf", onlyVisible = false, autoPrint = false, loader = true)
	{
		if (loader)
			showLoader();

		if (!onlyVisible)
			puma(this.container()).find(".vrSchedulerDivContent")[0].style.cssText += "height: unset;";

		window.setTimeout(() =>
		{
			html2canvas(this.container()).then((canvas: any) =>
			{
				//#region Height and Width
				let elementWidth = $(this.container()).width();
				let elementHeight = $(this.container()).height();
				let topLeftMargin = 0;
				let pdfWidth = elementWidth! + (topLeftMargin * 2);
				let pdfHeight = (pdfWidth * 1) + (topLeftMargin * 2);
				let totalPDFPages = Math.ceil(elementHeight! / pdfHeight) - 1;
				//#endregion

				let pdf = new jsPDF({
					orientation: "landscape",
					unit: "pt",
					format: [pdfWidth, pdfHeight]
				});

				var imgData = canvas.toDataURL("image/png", 1.0);
				pdf.addImage(imgData, "png", topLeftMargin, topLeftMargin, elementWidth, elementHeight);

				for (let i = 1; i <= totalPDFPages; i++)
				{
					pdf.addPage([pdfWidth, pdfHeight], "landscape");
					pdf.addImage(imgData, "png", topLeftMargin, -(pdfHeight * i) + (topLeftMargin * 4), elementWidth, elementHeight);
				}

				if (autoPrint)
					pdf.autoPrint();

				pdf.save(fileName);

				if (loader)
					hideLoader();
			});
		}, 100);
	}

	getOptions()
	{
		return this.options<SchedulerOptions>();
	}
	//#endregion

	//#endregion
}
//#endregion

//#region Classes
class SchedulerEvent extends VrControlsEvent
{
	sender: Scheduler;
}

class SchedulerNavigateEvent extends SchedulerEvent
{
	action?: SchedulerNavigateActionEnum;
	date?: Date;
	view?: SchedulerViewEnum;
	previousDate: Date | null;
}

class SchedulerViewChangeEvent extends SchedulerEvent
{
	previousView: SchedulerViewEnum;
	view: SchedulerViewEnum;
}

class SchedulerIntervalChangeEvent extends SchedulerEvent
{
	value?: number;
	view?: SchedulerViewEnum;
	previousValue: number | undefined;
}

class SchedulerResourcesChangeEvent extends SchedulerEvent
{
	resources: SchedulerResource[];
	view?: SchedulerViewEnum;
}

enum SchedulerDateTypeEnum
{
	Start = 0,
	End = 1
}

//#region Click events
class SchedulerClickEvent extends SchedulerEvent
{
	start: Date;
	end: Date;
	resourceId: string;
	element: HTMLElement;
	slotElement: SchedulerSlotElement;
}

export class SchedulerTimeslotClickEvent extends SchedulerClickEvent
{
}

export class SchedulerAppointmentClickEvent extends SchedulerClickEvent
{
	dataItem: SchedulerData;
}

export class SchedulerAvailabilityClickEvent extends SchedulerClickEvent
{
	dataItem: SchedulerData;
}
//#endregion

//#region Move events
class SchedulerMoveEvent extends SchedulerEvent
{
	start: Date;
	end: Date;
	resourceId: string;
	divElement: HTMLDivElement;
	dataItem: SchedulerData;
}

class SchedulerMoveStartEvent extends SchedulerMoveEvent
{
}

class SchedulerMovingEvent extends SchedulerMoveEvent
{

}

class SchedulerMoveEndEvent extends SchedulerMoveEvent
{
}
//#endregion

//#region Resize events
class SchedulerResizeEvent extends SchedulerEvent
{
	start: Date;
	end: Date;
	resourceId: string;
	divElement: HTMLDivElement;
	dataItem: SchedulerData;
}

class SchedulerResizeStartEvent extends SchedulerResizeEvent
{
}

class SchedulerResizingEvent extends SchedulerResizeEvent
{

}

class SchedulerResizeEndEvent extends SchedulerResizeEvent
{
}
//#endregion

class SchedulerMaxResourceNumber
{
	dayView?: number;
	weekView?: number;
	fourWeeksView?: number;
}

class InternalSchedulerAppointment
{
	slotsOccupied?: SchedulerSlotElement[];
	positioned?: boolean;
	overlappedList?: SchedulerData[];
}

class SchedulerExpandCollapseEvent extends SchedulerEvent
{
	buttonExpand: Button;
	buttonCollpase: Button;
}

class SchedulerExpandEvent extends SchedulerExpandCollapseEvent
{
}

class SchedulerCollapseEvent extends SchedulerExpandCollapseEvent
{
}

class SchedulerEditable
{
	move?: boolean;
	resize?: boolean;
	//delete?: boolean;
}
//#endregion