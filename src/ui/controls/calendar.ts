import { VrControlOptions, VrControl, VrControlsEvent } from "../common";
import { ControlTypeEnum, puma, createLabel, createButton, IconClassicLight, TextAlignEnum, DateDepthEnum } from "../vr";
import { ActualViewEnum } from "./datePicker";
import { Label } from "./label";

//#region Options
export class CalendarOptions extends VrControlOptions
{
    value?: Date;
    selectedColor?: string;
    todayLabel?: boolean;
    otherMonthDays?: boolean;
    disabledDates?: Date[];
    highlightedDates?: Date[];
    dateSlotWidth?: number;
    depth?: DateDepthEnum;
    availableFrom?: Date;
    availableTo?: Date;

    onBeforeChange?(e: CalendarChangingEvent): void;
    onAfterChange?(e: CalendarChangeEvent): void;
    onDisableDate?(e: CalendarDisableDateEvent): boolean;
    onDayDraw?(e: CalendarDayDrawEvent): void;
    onFinishedDraw?(e: CalendarFinishedDrawEvent): void;
}
//#endregion

//#region Control
export class Calendar extends VrControl
{
    private _value: Date | null;
    private _actualView: ActualViewEnum;
    private _tempNavigationDate: Date;
    private _lblNavigation: Label;

    constructor(element: HTMLElement, options?: CalendarOptions | null)
    {
        //#region Options
        if (options == null)
            options = new CalendarOptions();

        if (options.selectedColor == null) options.selectedColor = "#51B3E1";
        if (!options.selectedColor.startsWith("#")) options.selectedColor = "#" + options.selectedColor;
        if (options.todayLabel == null) options.todayLabel = true;
        if (options.otherMonthDays == null) options.otherMonthDays = true;
        if (options.dateSlotWidth == null) options.dateSlotWidth = 40;
        if (options.depth == null) options.depth = DateDepthEnum.Day;
        //#endregion

        super(element, options, ControlTypeEnum.Calendar);
        this.draw();

        //#region Value
        if (options.value != null)
            this.value(options.value, false);
        //#endregion
    }

    //#region Methods
    private draw()
    {
        let options = this.getOptions();

        //#region Value
        let value = this.value();
        if (value == null)
            value = new Date();

        this._tempNavigationDate = value;

        const months = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
        let month = this._tempNavigationDate.getMonth();
        let monthString = months[month];
        let year = this._tempNavigationDate.getFullYear();
        //#endregion

        //#region Header
        let divHeader = puma("<div class='vrDivPickerPopup_Header'></div>").vrAppendToPuma(this.element())[0];
        this._lblNavigation = createLabel(
            {
                text: monthString + " " + year,
                noBr: true,
                width: "Calc(100% - 65px)",
                align: TextAlignEnum.Left,
                class: "vrDatePickerNavigationLabel",
                css: "padding-left: 10px;",
                onClick: (e) =>
                {
                    switch (this._actualView)
                    {
                        case ActualViewEnum.Day: this.drawMonths(); break;
                        case ActualViewEnum.Month: this.drawYears(); break;
                        case ActualViewEnum.Year: this.drawDecades(); break;
                    }
                }
            }, divHeader);

        let prevButton = createButton(
            {
                icon: IconClassicLight.CaretLeft,
                css: "border: none;",
                cssContainer: "top: 2px;",
                width: 30,
                onClick: (e) => 
                {
                    switch (this._actualView)
                    {
                        case ActualViewEnum.Day:
                            {
                                this._tempNavigationDate = this._tempNavigationDate.vrAddMonths(-1);
                                this.drawDays();
                            }
                            break;
                        case ActualViewEnum.Month:
                            {
                                this._tempNavigationDate = this._tempNavigationDate.vrAddYears(-1);
                                this.drawMonths();
                            }
                            break;
                        case ActualViewEnum.Year:
                            {
                                this._tempNavigationDate = this._tempNavigationDate.vrAddYears(-10);
                                this.drawYears();
                            }
                            break;
                        case ActualViewEnum.Decade:
                            {
                                this._tempNavigationDate = this._tempNavigationDate.vrAddYears(-100);
                                this.drawDecades();
                            }
                            break;
                    }
                }
            }, divHeader);

        let nextButton = createButton(
            {
                icon: IconClassicLight.CaretRight,
                css: "border: none;",
                cssContainer: "top: 2px;",
                width: 30,
                onClick: (e) => 
                {
                    switch (this._actualView)
                    {
                        case ActualViewEnum.Day:
                            {
                                this._tempNavigationDate = this._tempNavigationDate.vrAddMonths(1);
                                this.drawDays();
                            }
                            break;
                        case ActualViewEnum.Month:
                            {
                                this._tempNavigationDate = this._tempNavigationDate.vrAddYears(1);
                                this.drawMonths();
                            }
                            break;
                        case ActualViewEnum.Year:
                            {
                                this._tempNavigationDate = this._tempNavigationDate.vrAddYears(10);
                                this.drawYears();
                            }
                            break;
                        case ActualViewEnum.Decade:
                            {
                                this._tempNavigationDate = this._tempNavigationDate.vrAddYears(100);
                                this.drawDecades();
                            }
                            break;
                    }
                }
            }, divHeader);
        //#endregion

        //#region Days
        puma("<table class='vrDatePickerPopup_table'></table>").vrAppendToPuma(this.element())[0];
        //#endregion

        //#region Depth
        switch (options.depth)
        {
            case DateDepthEnum.Day: this.drawDays(); break;
            case DateDepthEnum.Month: this.drawMonths(); break;
            case DateDepthEnum.Year: this.drawYears(); break;
            default:
                this.drawDays(); break;
        }
        //#endregion

        //#region Today
        let weekDaysLong = ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"];
        let today = new Date();
        let todayDay = today.getDate();
        let todayWeek = weekDaysLong[today.getDay()];
        let todayMonth = today.getMonth();
        let todayYear = today.getFullYear();

        let divToday = puma("<div style='padding: 5px; border-top: solid 1px #CCC; margin-top: 5px; text-align: center;'></div>").vrAppendToPuma(this.element())[0];
        createLabel(
            {
                text: todayWeek + " " + todayDay + " " + months[todayMonth] + " " + todayYear,
                colorSettings: { textColor: options.selectedColor },
                css: "text-decoration: underline;",
                visible: (options.todayLabel) ? true : false,
                onClick: (e) =>
                {
                    this.value(new Date());
                }
            }, divToday);
        //#endregion
    }

    private drawDays(): void
    {
        let options = this.getOptions();
        this._actualView = ActualViewEnum.Day;
        this._lblNavigation.enable();

        let table = puma(this.element()).find(".vrDatePickerPopup_table")[0];
        puma(table).empty();

        //#region WeekDays
        let weekDays = ["LU", "MA", "ME", "GI", "VE", "SA", "DO"];
        let trWeekDays = puma("<tr class='vrPicker_tableWeekDays'></tr>").vrAppendToPuma(table)[0];

        let tdWeekdayFragment = document.createDocumentFragment();
        for (let weekDay of weekDays)
        {
            let td = document.createElement("td");
            td.style.cssText += "font-size: 14px; text-align: center; color: #7a7a7a;";
            td.innerHTML = weekDay;
            tdWeekdayFragment.appendChild(td);
        }
        trWeekDays.appendChild(tdWeekdayFragment);
        //#endregion

        let year = this._tempNavigationDate.getFullYear();
        let month = this._tempNavigationDate.getMonth();

        const months = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
        let monthString = months[month];
        this._lblNavigation.value(monthString + " " + year);

        let firstDayOfTheMonth = new Date(year, month, 1);
        let lastDayOfTheMonth = new Date(year, month + 1, 0);
        let offset = firstDayOfTheMonth.getDay();
        if (offset == 0)
            offset = 7;
        offset -= 1;

        //#region Today/Actual value
        let today = new Date();
        let todayMonth = today.getMonth();
        let todayYear = today.getFullYear();
        let todayDay = (todayMonth == month && todayYear == year) ? today.getDate() : null;

        let actualValueDay = null;
        let actualValue = this.value();

        if (actualValue != null)
        {
            let actualValueMonth = actualValue.getMonth();
            let actualValueYear = actualValue.getFullYear();
            actualValueDay = (actualValueMonth == month && actualValueYear == year) ? actualValue.getDate() : null;
        }
        //#endregion

        let prevMonthLastDay = Date.vrGetLastDayOfMonthByDate(new Date(year, month - 1, 1)).getDate() + 1 - offset;
        let dayCount = 1;
        let reachLimit = false;

        let trRowListFragment = document.createDocumentFragment();
        for (let i = 0; i < 6; i++)
        {
            let tr = document.createElement("tr");
            tr.classList.add("vrDatePickerPopup_rowDays");
            tr.setAttribute("row", String(i));

            for (let j = 0; j < 7; j++)
            {
                if (offset == 0)
                {
                    //#region Day
                    let css = "";
                    if (actualValueDay != null && actualValueDay == dayCount && !reachLimit)
                        css += "background-color: " + options.selectedColor + "; color: #FFF; border: none;";
                    else if (todayDay != null && todayDay == dayCount && !reachLimit)
                        css += "border: solid 1px " + options.selectedColor + ";";
                    else if (reachLimit)
                    {
                        css = "color: #CCC; border: none;";
                        if (!options.otherMonthDays)
                            css += "display: none;";
                    }
                    else
                        css = "box-shadow: 0 0px 2px rgba(0, 0, 0, .3); border: none;"

                    let td = document.createElement("td");
                    td.setAttribute("day", String(dayCount));
                    tr.appendChild(td);

                    this.createTdDay(dayCount, year, month, td, css);
                    //#endregion

                    if (dayCount >= lastDayOfTheMonth.getDate())
                    {
                        month++;
                        dayCount = 0;
                        reachLimit = true;
                    }
                    dayCount++;
                }
                else
                {
                    let css = "color: #CCC; border: none;";
                    if (!options.otherMonthDays)
                        css += "display: none;";

                    let td = document.createElement("td");
                    td.setAttribute("day", String(prevMonthLastDay));
                    tr.appendChild(td);

                    this.createTdDay(prevMonthLastDay++, year, month - 1, td, css);
                    offset--;
                }
            }
            trRowListFragment.appendChild(tr);
        }
        table.appendChild(trRowListFragment);

        //#region On finished draw
        if (options.onFinishedDraw != null)
        {
            let event = new CalendarFinishedDrawEvent();
            event.sender = this;
            options.onFinishedDraw(event);
        }
        //#endregion
    }

    private createTdDay(day: number, year: number, month: number, td: HTMLElement, css: string): void
    {
        let options = this.getOptions();
        let enable = this.checkAvailability(year, month, day);

        let button = createButton(
            {
                text: String(day),
                width: options.dateSlotWidth,
                css: css,
                enable: enable,
                onClick: (e) =>
                {
                    let dateToSelect = new Date(year, month, Number(button.text()), 0, 0, 0);
                    this.value(dateToSelect);
                }
            }, td);

        let date = new Date(year, month, day, 0, 0, 0);

        //#region Disable date
        if (options.onDisableDate != null)
        {
            let event = new CalendarDisableDateEvent();
            event.sender = this;
            event.day = date;

            let disable = options.onDisableDate(event);
            button.enabled(disable);
        }
        //#endregion

        //#region On day draw
        if (options.onDayDraw != null)
        {
            let event = new CalendarDayDrawEvent();
            event.sender = this;
            event.day = date;
            options.onDayDraw(event);
        }
        //#endregion

        //#region Disabled/Highlighted
        if (options.disabledDates != null)
        {
            let millisecondDates = options.disabledDates.map(k => k.getTime());
            if (millisecondDates.includes(date.getTime()))
                button.disable();
        }

        if (options.highlightedDates != null)
        {
            let millisecondDates = options.highlightedDates.map(k => k.getTime());
            if (millisecondDates.includes(date.getTime()))
                button.element().style.cssText += "background-color: " + options.selectedColor + "; color: #FFF; border: none; border-radius: 15px;";
        }
        //#endregion
    }

    private checkAvailability(year: number, month?: number, day?: number)
    {
        let options = this.getOptions();
        let enable = true;

        if (options.availableFrom != null)
        {
            if (year < options.availableFrom.getFullYear())
                enable = false;
            else if (year == options.availableFrom.getFullYear() && month != null)
            {
                if (month < options.availableFrom.getMonth())
                    enable = false;
                else if (month == options.availableFrom.getMonth() && day != null
                    && day < options.availableFrom.getDate())
                    enable = false;
            }
        }

        if (options.availableTo != null)
        {
            if (year > options.availableTo.getFullYear())
                enable = false;
            else if (year == options.availableTo.getFullYear() && month != null)
            {
                if (month > options.availableTo.getMonth())
                    enable = false;
                else if (month == options.availableTo.getMonth() && day != null
                    && day > options.availableTo.getDate())
                    enable = false;
            }
        }
        return enable;
    }

    disabledDates(dates?: Date[])
    {
        let options = this.getOptions();
        if (dates != null)
            options.disabledDates = dates;

        return options.disabledDates;
    }

    highlightedDates(dates?: Date[])
    {
        let options = this.getOptions();
        if (dates != null)
            options.highlightedDates = dates;

        return options.highlightedDates;
    }

    private drawMonths()
    {
        this._actualView = ActualViewEnum.Month;
        this._lblNavigation.enable();

        let table = puma(this.element()).find(".vrDatePickerPopup_table")[0];
        puma(table).empty();

        this._lblNavigation.value(this._tempNavigationDate.getFullYear());
        const months = ["GEN", "FEB", "MAR", "APR", "MAG", "GIU", "LUG", "AGO", "SET", "OTT", "NOV", "DIC"];

        let trRowListFragment = document.createDocumentFragment();
        for (let i = 0; i < 3; i++)
        {
            let tr = document.createElement("tr");
            tr.classList.add("vrDatePickerPopup_rowMonths");
            tr.setAttribute("row", String(i));

            for (let j = 0; j < 4; j++)
            {
                let monthIndex = (i * 4 + j);
                let td = document.createElement("td");
                td.setAttribute("month", String(monthIndex));
                tr.appendChild(td);

                let monthAttribute = monthIndex;
                let enable = this.checkAvailability(this._tempNavigationDate.getFullYear(), monthAttribute);

                createButton(
                    {
                        text: "<span style='color: #CCC;'>" + (monthIndex + 1) + "</span><br />" + months[monthIndex],
                        width: 55,
                        height: 58,
                        enable: enable,
                        css: "height: 100%; border: none;" + ((this.value() != null && monthIndex == this.value()!.getMonth()) ? "background-color: #e3f1fa;" : ""),
                        onClick: (e) =>
                        {
                            let newMonth = monthIndex;
                            this._tempNavigationDate.setMonth(newMonth);

                            if (this.depth() == DateDepthEnum.Month)
                            {
                                let dateToSelect = new Date(this._tempNavigationDate.getFullYear(), newMonth, 1);
                                this.value(dateToSelect);
                            }
                            else
                                this.drawDays();
                        }
                    }, td);
            }
            trRowListFragment.appendChild(tr);
        }
        table.appendChild(trRowListFragment);
    }

    private drawYears()
    {
        this._actualView = ActualViewEnum.Year;
        this._lblNavigation.enable();

        let table = puma(this.element()).find(".vrDatePickerPopup_table")[0];
        puma(table).empty();

        let year = this._tempNavigationDate.getFullYear();
        let year2digitsFirst = Number(year.toString().substring(0, 2));
        let year2digitsLast = Number(year.toString().substr(-2));
        let lastYear2Digits = Math.ceil((year2digitsLast + 1) / 10) * 10; // Nearest multiple of 10

        let firstYear = (year2digitsFirst * 100) + lastYear2Digits - 10 - 1;
        let lastYear = (year2digitsFirst * 100) + lastYear2Digits;
        this._lblNavigation.value((firstYear + 1) + "-" + (lastYear - 1));

        let trRowListFragment = document.createDocumentFragment();
        let tdYear = firstYear;
        for (let i = 0; i < 3; i++)
        {
            let tr = document.createElement("tr");
            tr.classList.add("vrDatePickerPopup_rowYears");
            tr.setAttribute("row", String(i));

            for (let j = 0; j < 4; j++)
            {
                let td = document.createElement("td");
                td.setAttribute("year", String(tdYear));
                tr.appendChild(td);

                let yearAttribute = Number(puma(td).attr("year"));
                let enable = this.checkAvailability(yearAttribute);

                createButton(
                    {
                        text: String(tdYear),
                        width: 55,
                        height: 58,
                        enable: enable,
                        css: "height: 100%; border: none;" + ((this.value() != null && tdYear == this.value()!.getFullYear()) ? "background-color: #e3f1fa;" : "") + ((yearAttribute == firstYear || yearAttribute == lastYear) ? "color: #CCC;" : ""),
                        onClick: (e) =>
                        {
                            let newYear = Number(puma(td).attr("year"));
                            this._tempNavigationDate.setFullYear(newYear);

                            if (this.depth() == DateDepthEnum.Year)
                            {
                                let dateToSelect = new Date(newYear, 0, 1);
                                this.value(dateToSelect);
                            }
                            else
                                this.drawMonths();
                        }
                    }, td);
                tdYear++;
            }
            trRowListFragment.appendChild(tr);
        }
        table.appendChild(trRowListFragment);
    }

    private drawDecades()
    {
        this._actualView = ActualViewEnum.Decade;
        this._lblNavigation.disable();

        let table = puma(this.element()).find(".vrDatePickerPopup_table")[0];
        puma(table).empty();

        let year = this._tempNavigationDate.getFullYear();
        let year2digitsFirst = Number(year.toString().substring(0, 2));
        let year2digitsLast = Number(year.toString().substr(-2));

        let firstYear = year2digitsFirst * 100;
        let lastYear = year2digitsFirst * 100 + 99;
        let firstYearCycle = year2digitsFirst * 100 - 10;
        let lastYearCycle = year2digitsFirst * 100 + 109;
        this._lblNavigation.value(firstYear + "-" + lastYear);

        let trRowListFragment = document.createDocumentFragment();
        let tdDecade = firstYearCycle;
        for (let i = 0; i < 3; i++)
        {
            let tr = document.createElement("tr");
            tr.classList.add("vrDatePickerPopup_rowDecades");
            tr.setAttribute("row", String(i));

            for (let j = 0; j < 4; j++)
            {
                let td = document.createElement("td");
                td.setAttribute("decade", String(tdDecade));
                tr.appendChild(td);

                let yearAttribute = Number(puma(td).attr("decade"));
                createButton(
                    {
                        text: tdDecade + "<br />" + (tdDecade + 9),
                        width: 55,
                        height: 58,
                        css: "height: 100%; border: none;" + ((this.value() != null && this.value()!.getFullYear() >= tdDecade && this.value()!.getFullYear() <= (tdDecade + 9)) ? "background-color: #e3f1fa;" : "") + ((yearAttribute == firstYearCycle || yearAttribute == (lastYearCycle - 9)) ? "color: #CCC;" : ""),
                        onClick: (e) =>
                        {
                            let year = Number(puma(td).attr("decade"));
                            this._tempNavigationDate.setFullYear(year);
                            this.drawYears();
                        }
                    }, td);
                tdDecade += 10;
            }
            trRowListFragment.appendChild(tr);
        }
        table.appendChild(trRowListFragment);
    }

    getOptions()
    {
        return this.options<CalendarOptions>();
    }

    depth()
    {
        return this.getOptions().depth!;
    }

    value(date?: Date | null, triggerChange: boolean = true): Date | null
    {
        let options = this.getOptions();
        if (date === null)
        {
            this.clear();
            return null;
        }

        if (date != null)
        {
            if (typeof (date) == "string")
                date = Date.vrFixDateString(date);

            if (date == null)
                throw Error("Formato data non valido!");

            if (triggerChange)
            {
                let changingEvent = new CalendarChangingEvent();
                if (options.onBeforeChange != null)
                {
                    changingEvent.sender = this;
                    changingEvent.value = date;
                    changingEvent.previousValue = this._value;
                    options.onBeforeChange(changingEvent);
                }

                if (!changingEvent.isDefaultPrevented())
                {
                    this._value = date;
                    this.change();
                }
            }
            else
                this._value = date;

            this._tempNavigationDate = date;

            //#region Set value
            const months = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
            let year = date.getFullYear();
            let month = date.getMonth();

            switch (options.depth)
            {
                case DateDepthEnum.Day: this.drawDays(); break;
                case DateDepthEnum.Month: this.drawMonths(); break;
                case DateDepthEnum.Year: this.drawYears(); break;
                default:
                    this.drawDays(); break;
            }

            let monthString = months[month];
            this._lblNavigation.value(monthString + " " + year);
            //#endregion
        }
        return this._value;
    }

    clear(triggerChange = false): void
    {
        this._value = null;

        if (triggerChange)
            this.change();
    }
    //#endregion

    //#region Events
    change(): void
    {
        let changeCallBack = this.getOptions().onAfterChange;
        if (changeCallBack != null)
        {
            let changeEvent = new CalendarChangeEvent();
            changeEvent.sender = this;
            changeEvent.value = this.value();
            changeCallBack(changeEvent);
        }
    }
    //#endregion
}
//#endregion

//#region Classes
class CalendarEvent extends VrControlsEvent
{
    sender: Calendar;
    value: Date | null;
}

class CalendarChangeEvent extends CalendarEvent
{

}

class CalendarChangingEvent extends CalendarEvent
{
    previousValue?: Date | null;
}

class CalendarDayDrawEvent extends VrControlsEvent
{
    sender: Calendar;
    day: Date;
    element: HTMLElement;
}

class CalendarFinishedDrawEvent extends VrControlsEvent
{
    sender: Calendar;
}

class CalendarDisableDateEvent extends VrControlsEvent
{
    sender: Calendar;
    day: Date;
}
//#endregion