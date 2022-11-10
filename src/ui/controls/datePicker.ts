import { VrControlOptions, VrControl, VrControlsEvent } from "../common";
import { ControlTypeEnum, IconClassicLight, IconClass, createLabel, DefaultDayEnum, DateModeEnum, PositionEnum, puma, shadowRoot, DateFormatEnum, KeyEnum, createCalendar, DateDepthEnum, notify, PopupSettings } from "../vr";
import { UtilityManager } from "../../../src/managers/utilityManager";

//#region Options
export class DatePickerOptions extends VrControlOptions
{
    defaultDay?: DefaultDayEnum;
    mode?: DateModeEnum;
    value?: Date;
    min?: Date;
    max?: Date;
    timeInterval?: number;
    format?: DateFormatEnum | Intl.DateTimeFormatOptions;
    todayLabel?: boolean;
    otherMonthDays?: boolean;
    tooltip?: string;
    depth?: DateDepthEnum;
    nullable?: boolean;
    popupSettings?: PopupSettings;

    onBeforeChange?(e: DatePickerChangingEvent): void;
    onAfterChange?(e: DatePickerChangeEvent): void;
    onKeyUp?(e: DatePickerKeyUpEvent): void;
    onKeyDown?(e: DatePickerKeyDownEvent): void;
    onEnterKey?(): void;
    onFocus?(e: DatePickerFocusEvent): void;
    onBlur?(e: DatePickerBlurEvent): void;
}
//#endregion

//#region Control
export class DatePicker extends VrControl
{
    private _value: Date | null;
    private _currentCursorPosition: number;
    private _popup: HTMLElement;
    private _justOpened: boolean;

    constructor(element: HTMLElement, options?: DatePickerOptions | null)
    {
        //#region Options
        if (options == null)
            options = new DatePickerOptions();

        if (options.defaultDay == null) options.defaultDay = DefaultDayEnum.First;
        if (options.mode == null) options.mode = DateModeEnum.Date;
        if (options.todayLabel == null) options.todayLabel = true;
        if (options.otherMonthDays == null) options.otherMonthDays = true;
        if (options.depth == null) options.depth = DateDepthEnum.Day;
        if (options.nullable == null) options.nullable = true;

        if (options.format == null)
        {
            switch (options.depth)
            {
                case DateDepthEnum.Day: options.format = DateFormatEnum.ShortDate; break;
                case DateDepthEnum.Month: options.format = DateFormatEnum.Month; break;
                case DateDepthEnum.Year: options.format = DateFormatEnum.Year; break;
                default:
                    options.format = DateFormatEnum.ShortDate; break;
            }
        }

        if (options.timeInterval == null)
            options.timeInterval = 15;

        if (options.mode == DateModeEnum.Time)
        {
            if (options.width == null)
                options.width = 92;

            if (options.min == null)
            {
                let defaultDateMin = new Date();
                defaultDateMin.setHours(6, 0);
                options.min = defaultDateMin;
            }

            if (options.max == null)
            {
                let defaultDateMax = new Date();
                defaultDateMax.setHours(23, 15);
                options.max = defaultDateMax;
            }
        }
        else
        {
            if (options.min == null)
            {
                let defaultDateMin = Date.MIN_VALUE;
                defaultDateMin.setHours(6, 0);
                options.min = defaultDateMin;
            }

            if (options.max == null)
            {
                let defaultDateMax = Date.MAX_VALUE;
                defaultDateMax = defaultDateMax.vrAddDays(-1);
                defaultDateMax.setHours(23, 15);
                options.max = defaultDateMax;
            }

            if (options.mode == DateModeEnum.DateTime && options.width == null)
                options.width = 180;
        }
        //#endregion

        super(element, options, ControlTypeEnum.DatePicker);
        this._currentCursorPosition = 0;

        puma(element).attr("type", "text");

        if (options.label != null && options.labelSettings!.position == PositionEnum.Top)
            this.element().style.cssText += "padding-left: 0px !important; width: calc(100% - 12px) !important;";

        //#region Picker icon
        let pickerIcon = null;
        switch (options.mode)
        {
            case DateModeEnum.Date: pickerIcon = UtilityManager.createIcon(IconClassicLight.Calendar); break;
            case DateModeEnum.Time: pickerIcon = UtilityManager.createIcon(IconClassicLight.Clock); break;
            case DateModeEnum.DateTime:
                {
                    let divPickerIcon = puma("<div class='vrDivPickerDateTimeIcon'></div>").vrAppendToPuma(this.container())[0];
                    let pickerIcon = UtilityManager.createIcon(IconClassicLight.Calendar);
                    puma(divPickerIcon).vrAppendPuma(pickerIcon);
                    puma(divPickerIcon).click(() => 
                    {
                        if (!this.enabled())
                            return;

                        this.close();
                        this.openPopupDatePicker();
                    });

                    if (options.label != null && options.labelSettings!.position == PositionEnum.Top)
                        divPickerIcon.style.cssText += "bottom: 1px; top: inherit;";

                    let divPickerTimeIcon = puma("<div class='vrDivPickerIcon'></div>").vrAppendToPuma(this.container())[0];
                    let pickerTimeIcon = UtilityManager.createIcon(IconClassicLight.Clock);
                    puma(divPickerTimeIcon).vrAppendPuma(pickerTimeIcon);
                    puma(divPickerTimeIcon).click((e: any) => 
                    {
                        if (!this.enabled())
                            return;

                        this.close();
                        this.openPopupTimePicker();
                    });

                    if (options.label != null && options.labelSettings!.position == PositionEnum.Top)
                        divPickerTimeIcon.style.cssText += "bottom: 1px; top: inherit;";
                }
                break;
        }

        if (pickerIcon != null)
        {
            let divPickerIcon = puma("<div class='vrDivPickerIcon'></div>").vrAppendToPuma(this.container())[0];
            if (options.label != null && options.labelSettings!.position == PositionEnum.Top)
                divPickerIcon.style.cssText += "bottom: 1px; top: inherit;";

            puma(divPickerIcon).vrAppendPuma(pickerIcon);
            puma(divPickerIcon).click(() => 
            {
                if (!this.enabled())
                    return;

                if (puma(this._popup).is(":visible"))
                    this.close();
                else
                    this.open();
            });
        }
        //#endregion

        //#region Tooltip
        if (options.tooltip != null)
            puma(this.element()).attr("title", options.tooltip);
        //#endregion

        //#region Input events
        puma(this.element()).keyup((e: JQuery.KeyUpEvent) =>
        {
            let value = (e.target as HTMLInputElement).value;
            if (value == "")
            {
                this.formatDateInput(value);
                e.preventDefault();
                return;
            }

            if (e.key == KeyEnum.Enter)
            {
                this.formatDateInput((e.target as HTMLInputElement).value);

                if (options!.onEnterKey != null)
                    options!.onEnterKey();
            }
            else
            {
                if (options!.onKeyUp != null)
                {
                    let event = new DatePickerKeyUpEvent();
                    event.sender = this;
                    event.text = (e.target as HTMLInputElement).value;
                    event.key = e.key;
                    event.shiftKey = e.shiftKey;
                    event.altKey = e.altKey;
                    event.ctrlKey = e.ctrlKey;
                    event.enterKey = e.key == KeyEnum.Enter;
                    event.backSpaceKey = e.key == KeyEnum.Backspace;
                    event.tabKey = e.key == KeyEnum.Tab;
                    options!.onKeyUp(event);
                }
            }
        });
        puma(this.element()).blur((e: JQuery.BlurEvent) => 
        {
            let value = (this._value != null) ? new Date(this._value) : null;
            this._value = this.formatDateInput((e.target as HTMLInputElement).value, true) as any;
            if (this._value != null)
                this.formatValue();

            if (!UtilityManager.equals(value, this._value))
            {
                let changingEvent = new DatePickerChangingEvent();
                if (options!.onBeforeChange != null)
                {
                    changingEvent.sender = this;
                    changingEvent.value = (this._value != null) ? new Date(this._value!) : null;
                    changingEvent.previousValue = value;
                    options!.onBeforeChange(changingEvent);

                    if (changingEvent.isDefaultPrevented())
                        return;
                }

                this.change();
            }

            if (options!.onBlur != null)
            {
                let event = new DatePickerBlurEvent();
                event.sender = this;
                options!.onBlur(event);
            }
        });
        puma(this.element()).click((e: JQuery.ClickEvent) => this._currentCursorPosition = (e.target as HTMLInputElement).selectionStart!);
        puma(this.element()).focus((e: JQuery.FocusEvent) => 
        {
            (this.element() as HTMLInputElement).select();

            if (options!.onFocus != null)
            {
                let event = new DatePickerFocusEvent();
                event.sender = this;
                options!.onFocus(event);
            }
        });
        //#endregion

        //#region Cursor management
        puma(element).keydown((e: JQuery.KeyDownEvent) =>
        {
            let cursorStartPosition = (e.target as HTMLInputElement).selectionStart!;
            if (cursorStartPosition != this._currentCursorPosition)
                this._currentCursorPosition = cursorStartPosition;

            if (e.key == KeyEnum.ArrowRight)
                this._currentCursorPosition = cursorStartPosition + 1;
            else if (e.key == KeyEnum.ArrowLeft) // Arrow left
                this._currentCursorPosition = cursorStartPosition - 1;
            else if (e.key == KeyEnum.ArrowUp)
            {
                if (this.value() != null)
                {
                    if (this._currentCursorPosition >= 0 && this._currentCursorPosition <= 2)
                        this.value(this.value()!.vrAddDays(1));
                    else if (this._currentCursorPosition >= 3 && this._currentCursorPosition <= 5)
                        this.value(this.value()!.vrAddMonths(1));
                    else if (this._currentCursorPosition >= 6)
                        this.value(this.value()!.vrAddYears(1));
                }
            }
            else if (e.key == KeyEnum.ArrowDown)
            {
                if (this.value() != null)
                {
                    if (this._currentCursorPosition >= 0 && this._currentCursorPosition <= 2)
                        this.value(this.value()!.vrAddDays(-1));
                    else if (this._currentCursorPosition >= 3 && this._currentCursorPosition <= 5)
                        this.value(this.value()!.vrAddMonths(-1));
                    else if (this._currentCursorPosition >= 6)
                        this.value(this.value()!.vrAddYears(-1));
                }
            }

            if (e.key == KeyEnum.ArrowRight || e.key == KeyEnum.ArrowLeft || e.key == KeyEnum.ArrowUp || e.key == KeyEnum.ArrowDown)
            {
                this.updateCursorPosition();
                e.preventDefault();
            }

            if (options!.onKeyDown != null)
            {
                let event = new DatePickerKeyDownEvent();
                event.sender = this;
                event.key = e.key;
                event.shiftKey = e.shiftKey;
                event.altKey = e.altKey;
                event.ctrlKey = e.ctrlKey;
                event.enterKey = e.key == KeyEnum.Enter;
                event.backSpaceKey = e.key == KeyEnum.Backspace;
                event.tabKey = e.key == KeyEnum.Tab;
                options!.onKeyDown(event);
            }
        });
        //#endregion

        //#region Value
        if (options.value != null)
            this.value(options.value, false);
        //#endregion

        window.addEventListener("click", (e: any) =>
        {
            if (puma(this._popup).is(":visible") && !puma(this._popup)[0].contains(e.target) && !puma(this.container())[0].contains(e.target) && !this._justOpened)
                this.close();
        });

        let baseListener = (shadowRoot() != null) ? shadowRoot() : document;
        baseListener!.addEventListener("scroll", (e) =>
        {
            if (!puma(e.target).hasClass("vrDivPickerPopup") && puma(this._popup).is(":visible"))
                this.close();
        }, true);
    }

    //#region Methods
    close(): void
    {
        puma(this._popup).remove();
        (this._popup as any) = null;
    }

    open(): void
    {
        if (!this.enabled())
            return;

        if (this._popup == null)
            this._popup = puma("<div class='vrDivPickerPopup vrPopup' id='" + this.element().id + "_divPopup'></div>").vrAppendToPuma((shadowRoot() != null) ? shadowRoot() : document.body)[0];

        let options = this.getOptions();
        switch (options.mode)
        {
            case DateModeEnum.Date:
            case DateModeEnum.DateTime:
                this.openPopupDatePicker(); break;
            case DateModeEnum.Time: this.openPopupTimePicker(); break;
        }

        this._justOpened = true;
        window.setTimeout(() => this._justOpened = false, 500);
    }

    private formatDateInput(inputText: string, onlyFormat = false)
    {
        let options = this.getOptions();
        switch (options.mode)
        {
            case DateModeEnum.Date: return this.formatInputDatePicker(inputText, onlyFormat); break;
            case DateModeEnum.DateTime: return this.formatInputDateTimePicker(inputText); break;
            case DateModeEnum.Time: return this.formatInputTimePicker(inputText, onlyFormat); break;
        }
        return null;
    }

    //#region DatePicker
    private openPopupDatePicker(): void
    {
        let options = this.getOptions();

        if (this._popup == null)
            this._popup = puma("<div class='vrDivPickerPopup vrPopup' id='" + this.element().id + "_divPopup'></div>").vrAppendToPuma((shadowRoot() != null) ? shadowRoot() : document.body)[0];

        puma(this._popup).removeClass("timePickerPopup");
        puma(this._popup).addClass("datePickerPopup");

        createCalendar({
            value: (this.value() != null) ? new Date(this.value()!.toString()) : undefined,
            dateSlotWidth: 30,
            depth: options.depth,
            onAfterChange: (e) =>
            {
                this.close();
                if (e.value != null)
                {
                    let actualHours = (this.value() != null) ? this.value()!.getHours() : ((options.mode == DateModeEnum.DateTime) ? new Date().getHours() : 0);
                    let actualMinutes = (this.value() != null) ? this.value()!.getMinutes() : ((options.mode == DateModeEnum.DateTime) ? new Date().getMinutes() : 0);

                    let dateToSelect = new Date(e.value.getFullYear(), e.value.getMonth(), e.value.getDate(), actualHours, actualMinutes);
                    this.value(dateToSelect);
                }
            }
        }, this._popup);

        super.settingPopup(this._popup, options.popupSettings);
    }

    private formatInputDatePicker(inputText: string, onlyFormat = false): void | Date
    {
        let options = this.getOptions();
        if (inputText == null || inputText == "")
        {
            if (!options.nullable)
            {
                UtilityManager.interval(() => puma(this.element()).toggleClass("errorInput"), 200, 800);
                this.value(this.value(), false);
                return;
            }

            this._value = null;
            if (!onlyFormat)
                this.change();

            return;
        }

        if (this.format() != DateFormatEnum.ShortDate && this.value() != null)
            inputText = this.value()!.vrToItalyString();

        //#region Slash or Minus
        if (inputText.includes("/") || inputText.includes("-") || inputText.includes(",") || inputText.includes("."))
        {
            let splittedDate: string[] = [];
            if (inputText.includes("/"))
                splittedDate = inputText.split("/");
            else if (inputText.includes("-"))
                splittedDate = inputText.split("-");
            else if (inputText.includes(","))
                splittedDate = inputText.split(",");
            else if (inputText.includes("."))
                splittedDate = inputText.split(".");

            let day = splittedDate[0];
            if (day == null)
                day = String(-1);

            let month = splittedDate[1];
            if (month == null)
                month = String(new Date().getMonth());

            let year = splittedDate[2];
            if (year == null)
                year = String(new Date().getFullYear());

            year = String(this.getFinalYear(year));

            let dateToReturn = new Date(Number(year), Number(month) - 1, Number(day));
            if (dateToReturn != null && Date.vrIsValidDate(dateToReturn) && Number(month) >= 1 && Number(month) <= 12
                && (dateToReturn.getMonth() + 1) == Number(month))
            {
                if (this.value() == null || !Date.vrEquals(this.value()!, dateToReturn))
                    this.value(dateToReturn);
                else
                    this.formatValue();
            }
            else
            {
                UtilityManager.interval(() => puma(this.element()).toggleClass("errorInput"), 200, 800);
                this.clear();
            }
            return dateToReturn;
        }
        //#endregion

        //#region Month and Year
        let inputTextArray = inputText.toLowerCase().split(" ");
        if (inputTextArray.length > 1)
        {
            let monthNumber = UtilityManager.getMonthNumberByName(inputTextArray[0]);
            if (monthNumber != -1)
            {
                if (inputTextArray[1].length == 2 || inputTextArray[1].length == 4)
                {
                    let year = parseInt(inputTextArray[1]);
                    if (inputTextArray[1].length == 2)
                        year = this.getFinalYear(inputTextArray[1]);

                    let day = (this.getOptions().defaultDay == DefaultDayEnum.First) ? 1 : Date.vrGetLastDayOfMonthByDate(new Date(new Date().getFullYear(), monthNumber, 1)).getDate();
                    this.value(new Date(year, monthNumber, day));
                    return;
                }
            }
        }
        //#endregion

        let originalInput = inputText;
        inputText = inputText.replace(/[^\w\s]/gi, '');
        inputText = inputText.replace(/\s/g, '');
        let inputTextNumeric = Number(inputText);

        let day: number | null = 0;
        let month: number | null = 0;
        let year: number | null = 0;
        let dateToReturn: Date | null = null;

        let todayYear = new Date().getFullYear();
        let todayMonth = new Date().getMonth();

        //#region Special
        let specialDates = ["oggi", "adesso", "ieri", "domani", "dopodomani", "natale", "vettore", "pumo", "pumetta", "pumettina",
            "sanvalentino", "fineanno", "inizioanno"];
        if (specialDates.includes(inputText.toLowerCase()))
        {
            switch (inputText.toLowerCase())
            {
                case "oggi":
                    {
                        let today = new Date();
                        today.setHours(0, 0);
                        this.value(today);
                    }
                    break;
                case "adesso": this.value(new Date()); break;
                case "ieri": this.value(new Date().vrAddDays(-1)); break;
                case "domani": this.value(new Date().vrAddDays(1)); break;
                case "dopodomani": this.value(new Date().vrAddDays(2)); break;
                case "natale": this.value(new Date(todayYear, 11, 25)); break;
                case "vettore": this.value(new Date(2013, 0, 1)); break;
                case "doctolib": this.value(new Date(2022, 9, 1)); break;
                case "pumo": { this.value(new Date(1993, 9, 10)); } break;
                case "pumetta": { this.value(new Date(1992, 6, 9)); } break;
                case "pumettina": { this.value(new Date(2022, 8, 24)); } break;
                case "sanvalentino": this.value(new Date(todayYear, 1, 14)); break;
                case "fineanno": this.value(new Date(todayYear, 12, 31)); break;
                case "inizioanno": this.value(new Date(todayYear, 1, 1)); break;
            }
            return this.value()!;
        }
        //#endregion

        //#region Months
        let monthNumber = UtilityManager.getMonthNumberByName(inputText.toLowerCase());
        if (monthNumber != -1)
        {
            this.value(new Date(todayYear, monthNumber, ((this.getOptions().defaultDay == DefaultDayEnum.First) ? 1 : Date.vrGetLastDayOfMonthByDate(new Date(todayYear, monthNumber, 1)).getDate())));
            return;
        }
        //#endregion

        let yearStringToday = new Date().getFullYear().toString();
        let todayYearFull = parseInt(yearStringToday.substr(0, 2) + "00");

        //#region Normal use
        if (inputText.length == 1 || inputText.length == 2)
        {
            if (originalInput.length == 3)
            {
                let regexForSpecialChars = /^[A-Za-z0-9 ]+$/;
                let hasNotSeparator = regexForSpecialChars.test(originalInput);
                if (!hasNotSeparator)
                {
                    day = Number(originalInput[0]);
                    month = Number(originalInput[2]) - 1;
                    year = todayYear;
                }
            }
            else
            {
                day = Number(inputText);
                month = todayMonth;
                year = todayYear;
            }
        }
        else if (inputText.length == 3)
        {
            day = Number(inputText[0]);
            month = Number(inputText[1] + inputText[2]) - 1;
            if (month > 11)
            {
                day = Number(inputText[0] + inputText[1]);
                month = Number(inputText[2]) - 1;
            }
            year = todayYear;
        }
        else if (inputText.length == 4)
        {
            let yearString = inputText[2] + inputText[3];
            let yearNumber = Number(yearString);
            if (yearNumber <= 12 && (Number(inputText[0] + inputText[1]) <= 31))
            {
                day = Number(inputText[0] + inputText[1]);
                month = Number(inputText[2] + inputText[3]) - 1;
                year = todayYear;
            }
            else
            {
                let finalYear = this.getFinalYear(yearString);
                if (inputTextNumeric >= todayYearFull && inputTextNumeric <= new Date().getFullYear())
                {
                    day = 1;
                    month = 0;
                    year = finalYear;

                    if (this.getOptions().defaultDay == DefaultDayEnum.Last)
                    {
                        day = 31;
                        month = 11;
                    }
                }
                else
                {
                    day = Number(inputText[0]);
                    month = Number(inputText[1]) - 1;
                    year = finalYear;
                }
            }
        }
        else if (inputText.length == 5)
        {
            let yearString = inputText[3] + inputText[4];
            let finalYear = this.getFinalYear(yearString);

            day = Number(inputText[0]);
            month = Number(inputText[1] + inputText[2]) - 1;
            if (month > 11)
            {
                day = Number(inputText[0] + inputText[1]);
                month = Number(inputText[2]) - 1;
            }
            year = finalYear;
        }
        else if (inputText.length == 6)
        {
            let yearString = inputText[4] + inputText[5];
            let finalYear = this.getFinalYear(yearString);

            day = Number(inputText[0] + inputText[1]);
            month = Number(inputText[2] + inputText[3]) - 1;
            if (month > 11)
            {
                day = Number(inputText[0]);
                month = Number(inputText[1]) - 1;
                finalYear = Number(inputText[2] + inputText[3] + inputText[4] + inputText[5]);
            }

            year = finalYear;
        }
        else if (inputText.length == 7)
        {
            let finalYear = Number(inputText[3] + inputText[4] + inputText[5] + inputText[6]);

            day = Number(inputText[0]);
            month = Number(inputText[1] + inputText[2]) - 1;
            if (month > 11)
            {
                day = Number(inputText[0] + inputText[1]);
                month = Number(inputText[2]) - 1;
            }

            year = finalYear;
        }
        else if (inputText.length == 8)
        {
            day = Number(inputText[0] + inputText[1]);
            month = Number(inputText[2] + inputText[3]) - 1;
            year = Number(inputText[4] + inputText[5] + inputText[6] + inputText[7]);
        }
        //#endregion

        dateToReturn = new Date(year, month, day);
        if (onlyFormat)
            return dateToReturn;

        if (dateToReturn != null && Date.vrIsValidDate(dateToReturn) && Number(month) >= 0 && Number(month) <= 11
            && (dateToReturn.getMonth()) == Number(month))
        {
            if (this.value() == null || !Date.vrEquals(this.value()!, dateToReturn))
                this.value(dateToReturn);
            else
                this.formatValue();
        }
        else
        {
            UtilityManager.interval(() => puma(this.element()).toggleClass("errorInput"), 200, 800);
            this.clear();
        }
    }
    //#endregion

    //#region TimePicker
    private openPopupTimePicker(): void
    {
        //#region Value
        let value = this.value();
        let hours = (value != null) ? value.getHours() : 0;
        let minutes = (value != null) ? value.getMinutes() : 0;
        //#endregion

        if (this._popup == null)
            this._popup = puma("<div class='vrDivPickerPopup vrPopup' id='" + this.element().id + "_divPopup'></div>").vrAppendToPuma((shadowRoot() != null) ? shadowRoot() : document.body)[0];

        puma(this._popup).removeClass("datePickerPopup");
        puma(this._popup).addClass("timePickerPopup");

        super.settingPopup(this._popup, { right: true });

        let options = this.getOptions();

        let tempMin = new Date(options.min!);
        let tempMax = new Date(options.max!);
        tempMin.setFullYear(1900, 1, 1);
        tempMax.setFullYear(1900, 1, 1);

        let differenceBetweenMinMax = Date.vrDifferenceBetweenDatesInMinutes(tempMin, tempMax);
        let interval = Math.round(differenceBetweenMinMax / options.timeInterval!);

        let topPosition = 0;
        let time = new Date(options.min!);
        for (let i = 0; i < interval; i++)
        {
            let text = time.toTimeString();
            let textHours = Number(text.split(":")[0]);
            let textMinutes = Number(text.split(":")[1]);

            let selected = hours == textHours && minutes == textMinutes;
            let label = this.createTimeLabel(text, selected);
            time.vrAddMinutes(options.timeInterval!);

            //#region Time not included in interval
            if (hours == textHours)
            {
                if (minutes % options.timeInterval! != 0 && minutes > textMinutes && minutes < (textMinutes + options.timeInterval!))
                {
                    selected = true;
                    text = String(hours).padStart(2, "0") + ":" + String(minutes).padStart(2, "0");
                    label = this.createTimeLabel(text, selected);
                }
            }
            //#endregion

            if (selected)
                topPosition = puma(label.element()).offset().top - puma(this._popup).offset().top - (puma(this._popup).height() / 2);
        }

        if (topPosition < 0) topPosition = 0;
        this._popup.scrollTo(0, topPosition);
    }

    private createTimeLabel(text: string, selected = false)
    {
        let label = createLabel(
            {
                text: text,
                width: "Calc(100% - 10px)",
                onClick: (e) => 
                {
                    let value = label.value();
                    let hours = value.split(":")[0];
                    let minutes = value.split(":")[1];

                    let actualYear = (this.value() != null) ? this.value()!.getFullYear() : new Date().getFullYear();
                    let actualMonth = (this.value() != null) ? this.value()!.getMonth() : new Date().getMonth();
                    let actualDays = (this.value() != null) ? this.value()!.getDate() : new Date().getDate();

                    this.close();
                    let dateToSelect = new Date(actualYear, actualMonth, actualDays, Number(hours), Number(minutes));
                    this.value(dateToSelect);
                },
                css: "cursor: pointer;",
                cssContainer: "padding: 5px; padding-top: 2px; cursor: pointer; border-bottom: solid 1px #DCDCDC;" + ((selected) ? "background-color: #51B3E1; color: #FFF;" : "")
            }, this._popup);

        return label;
    }

    private formatInputTimePicker(inputText: string, onlyFormat = false): void | Date
    {
        let options = this.getOptions();
        if (inputText == null || inputText == "")
        {
            if (!options.nullable)
            {
                UtilityManager.interval(() => puma(this.element()).toggleClass("errorInput"), 200, 800);
                this.value(this.value(), false);
                return;
            }

            this._value = null;
            this.change();
            return;
        }

        inputText = inputText.replace(/[^\w\s]/gi, '');
        inputText = inputText.replace(/\s/g, '');
        let inputTextNumeric = Number(inputText);

        let today = new Date();
        today.setHours(0, 0);

        //#region Special
        switch (inputText.toLowerCase())
        {
            case "adesso": this.value(new Date()); return;
            case "pumo": { this.value(new Date(1993, 9, 10, 10, 10)); } return;
        }
        //#endregion

        //#region Normal use
        if (inputText.length == 1 || inputText.length == 3)
            inputText = "0" + inputText;

        if (isNaN(inputTextNumeric))
        {
            UtilityManager.interval(() => puma(this.element()).toggleClass("errorInput"), 200, 800);
            this.clear();
            return;
        }

        let dateToReturn = today;
        if (inputText.length == 2)
            dateToReturn = dateToReturn.vrAddHours(inputTextNumeric);
        else if (inputText.length == 4)
        {
            let hours = Number(inputText[0] + inputText[1]);
            let minutes = Number(inputText[2] + inputText[3]);
            dateToReturn = dateToReturn.vrAddHours(hours).vrAddMinutes(minutes);
        }

        if (onlyFormat)
            return dateToReturn;

        this.value(dateToReturn);
        //#endregion
    }
    //#endregion

    //#region DateTimePicker
    private formatInputDateTimePicker(inputText: string)
    {
        let timeString = inputText.split(" ")[1];
        let time = this.formatInputTimePicker(timeString, true) as Date;

        let dateString = inputText.split(" ")[0];
        let date = this.formatInputDatePicker(dateString, true) as Date;

        if (date != null)
        {
            date.setHours(time.getHours(), time.getMinutes());
            this.value(date);
        }
        return date;
    }
    //#endregion

    //#region Utility
    private getFinalYear(yearString: string): number
    {
        if (yearString.length == 4)
            return Number(yearString);

        let yearStringToday = new Date().getFullYear().toString();
        let todayYearFull = Number(yearStringToday.substr(0, 2) + "00");
        let todayYear2digits = Number(yearStringToday.substr(0, 2));

        let yearStringFinal = (yearString.length == 1) ? "0" + yearString : yearString.substr(0, 2);

        let inputYear = Number(yearStringFinal);
        let yearFinalString = "";
        if (inputYear <= ((new Date().getFullYear() + 10) - todayYearFull))
            yearFinalString = todayYear2digits + yearStringFinal;
        else
            yearFinalString = (todayYear2digits - 1) + yearStringFinal;

        return Number(yearFinalString);
    }

    private updateCursorPosition(): void
    {
        if ((this.element() as any).createTextRange)
        {
            var range = (this.element() as any).createTextRange();
            range.move('character', this._currentCursorPosition);
            range.select();
        }
        else
        {
            if ((this.element() as any).selectionStart >= 0)
            {
                (this.element() as any).focus();
                (this.element() as any).setSelectionRange(this._currentCursorPosition, this._currentCursorPosition);
            }
            else
                (this.element() as any).focus();
        }
    }
    //#endregion

    value(date?: Date | null, triggerChange: boolean = true): Date | null
    {
        let options = this.getOptions();
        if (date === null)
        {
            let changingEvent = new DatePickerChangingEvent();
            if (options.onBeforeChange != null)
            {
                changingEvent.sender = this;
                changingEvent.value = new Date(date!);
                changingEvent.previousValue = (this._value != null) ? new Date(this._value!) : null;
                options.onBeforeChange(changingEvent);

                if (changingEvent.isDefaultPrevented())
                    return null;
            }

            if (!options.nullable)
            {
                UtilityManager.interval(() => puma(this.element()).toggleClass("errorInput"), 200, 800);
                return this._value;
            }
            else
            {
                this.clear();
                return null;
            }
        }

        if (date != null)
        {
            if (typeof (date) == "string")
                date = Date.vrFixDateString(date);

            if (date == null)
                throw Error("Formato data non valido!");

            //#region Check
            if (options.mode == DateModeEnum.Time)
            {
                date.setFullYear(new Date().getFullYear());
                date.setMonth(new Date().getMonth());
                //date.setDate(new Date().getDate());
            }

            if (options.mode != DateModeEnum.Time)
            {
                if (date.vrIsLessThan(options.min!))
                {
                    notify("Data minima consentita: " + options.min!.vrToItalyString());
                    UtilityManager.interval(() => puma(this.element()).toggleClass("errorInput"), 200, 800);
                    this.clear();
                    return null;
                }
                if (date.vrIsGreaterThan(options.max!))
                {
                    notify("Data massima consentita: " + options.max!.vrToItalyString());
                    UtilityManager.interval(() => puma(this.element()).toggleClass("errorInput"), 200, 800);
                    this.clear();
                    return null;
                }
            }
            //#endregion

            if (triggerChange)
            {
                let changingEvent = new DatePickerChangingEvent();
                if (options.onBeforeChange != null)
                {
                    changingEvent.sender = this;
                    changingEvent.value = new Date(date);
                    changingEvent.previousValue = (this._value != null) ? new Date(this._value!) : null;
                    options.onBeforeChange(changingEvent);
                }

                if (!changingEvent.isDefaultPrevented())
                {
                    this._value = new Date(date);
                    this.formatValue();
                    this.change();
                }
            }
            else
            {
                this._value = new Date(date);
                this.formatValue();
            }
        }

        if (this._value != null)
            this._value.setSeconds(0);

        if (this.mode() == DateModeEnum.Time && this._value != null)
        {
            let hours = this._value.getHours();
            let minutes = this._value.getMinutes();
            this._value = new Date(1900, 0, 1, hours, minutes);
        }

        return this._value;
    }

    private formatValue()
    {
        let options = this.getOptions();
        let element = (this.element() as HTMLInputElement);

        if (typeof (options.format!) == "number") // DateFormatEnum
        {
            let dateOptions: Intl.DateTimeFormatOptions = {};
            switch (options.format)
            {
                case DateFormatEnum.ShortDate:
                case DateFormatEnum.ShortDateWithoutYear:
                    {
                        dateOptions = {
                            year: (options.format == DateFormatEnum.ShortDate) ? 'numeric' : undefined,
                            month: '2-digit',
                            day: '2-digit',
                            hour12: false
                        }
                    }
                    break;
                case DateFormatEnum.LongDate:
                case DateFormatEnum.LongDateWithoutYear:
                    {
                        dateOptions = {
                            weekday: 'long',
                            year: (options.format == DateFormatEnum.LongDate) ? 'numeric' : undefined,
                            month: 'long',
                            day: '2-digit',
                            hour12: false
                        }
                    }
                    break;
                case DateFormatEnum.WeekDay:
                    {
                        dateOptions = {
                            weekday: 'long',
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour12: false
                        }
                    }
                    break;
                case DateFormatEnum.Month:
                    {
                        dateOptions = {
                            year: 'numeric',
                            month: 'long',
                        }
                    }
                    break;
                case DateFormatEnum.Year:
                    {
                        dateOptions = {
                            year: 'numeric',
                        }
                    }
                    break;
            }
            let dateFormatter = new Intl.DateTimeFormat(/*navigator.language*/"it", dateOptions);
            let dateString = dateFormatter.format(this._value!).vrCapitalize();

            if (options.format == DateFormatEnum.WeekRange)
            {
                let firstDayOfWeek = Date.vrGetFirstDayOfWeekByDate(this._value!);
                let lastDayOfWeek = firstDayOfWeek.vrAddDays(5);
                dateString = firstDayOfWeek.vrToItalyString() + " - " + lastDayOfWeek.vrToItalyString();
            }
            else if (options.format == DateFormatEnum.FourWeeksRange)
            {
                let firstDayOfWeek = Date.vrGetFirstDayOfWeekByDate(this._value!);
                let lastDayOfWeek = firstDayOfWeek.vrAddDays(26);
                dateString = firstDayOfWeek.vrToItalyString() + " - " + lastDayOfWeek.vrToItalyString();
            }

            switch (options.mode)
            {
                case DateModeEnum.Date: element.value = dateString; break;
                case DateModeEnum.Time: element.value = this._value!.toTimeString(); break;
                case DateModeEnum.DateTime: element.value = dateString + " " + this._value!.toTimeString(); break;
            }
        }
        else
            element.value = this._value!.vrFormatString(options.format!, "it")
    }

    mode(mode?: DateModeEnum)
    {
        let options = this.getOptions();
        if (mode != null)
            options.mode = mode;

        return options.mode;
    }

    min(min?: Date)
    {
        let options = this.getOptions();
        if (min != null)
            options.min = min;

        return options.min;
    }

    max(max?: Date)
    {
        let options = this.getOptions();
        if (max != null)
            options.max = max;

        return options.max;
    }

    format(format?: DateFormatEnum, changeText = true)
    {
        let options = this.getOptions();
        if (format != null)
        {
            options.format = format;
            if (changeText)
                this.value(this.value(), false);
        }
        return options.format;
    }

    clear(triggerChange = false): void
    {
        this._value = null;
        (this.element() as HTMLInputElement).value = "";

        if (triggerChange)
            this.change();
    }

    isEmpty()
    {
        return this.value() == null;
    }

    error()
    {
        puma(this.element()).addClass("vrDatePickerError");
    }

    hideError()
    {
        puma(this.element()).removeClass("vrDatePickerError");
    }

    private getOptions(): DatePickerOptions
    {
        return this.options<DatePickerOptions>();
    }
    //#endregion

    //#region Overrides
    enable(): void
    {
        super.enable();
        puma(this.container()).find(".vrDivPickerIcon").removeClass("vrDivPickerIconDisable");
        puma(this.container()).find(".vrDivPickerDateTimeIcon").removeClass("vrDivPickerIconDisable");
    }

    disable(): void
    {
        super.disable();
        puma(this.container()).find(".vrDivPickerIcon").addClass("vrDivPickerIconDisable");
        puma(this.container()).find(".vrDivPickerDateTimeIcon").addClass("vrDivPickerIconDisable");
    }
    //#endregion

    //#region Events
    change(): void
    {
        let changeCallBack = this.getOptions().onAfterChange;
        if (changeCallBack != null)
        {
            let changeEvent = new DatePickerChangeEvent();
            changeEvent.sender = this;
            changeEvent.value = (this.value() != null) ? new Date(this.value()!) : null;
            changeCallBack(changeEvent);
        }
    }
    //#endregion
}

export class TimePicker extends DatePicker { }
export class DateTimePicker extends DatePicker { }
export class MonthPicker extends DatePicker { }
export class YearPicker extends DatePicker { }
//#endregion

//#region Classes
class DatePickerEvent extends VrControlsEvent
{
    sender: DatePicker;
    value: Date | null;
}

class DatePickerChangeEvent extends DatePickerEvent
{

}

class DatePickerChangingEvent extends DatePickerEvent
{
    previousValue?: Date | null;
}

export enum ActualViewEnum
{
    Day,
    Month,
    Year,
    Decade
}

class DatePickerFocusEvent extends DatePickerEvent
{
}

class DatePickerBlurEvent extends DatePickerEvent
{
}

class DatePickerKeyUpPressEvent extends VrControlsEvent
{
    sender: DatePicker;
    text: string;
    key: string;
    shiftKey: boolean;
    altKey: boolean;
    ctrlKey: boolean;
    enterKey: boolean;
    backSpaceKey: boolean;
    tabKey: boolean;
}

class DatePickerKeyUpEvent extends DatePickerKeyUpPressEvent
{
}

class DatePickerKeyDownEvent extends DatePickerKeyUpPressEvent
{
}
//#endregion