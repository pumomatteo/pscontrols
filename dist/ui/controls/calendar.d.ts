import { VrControlOptions, VrControl, VrControlsEvent } from '../common';
import { DateDepthEnum } from '../vr';
export declare class CalendarOptions extends VrControlOptions {
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
export declare class Calendar extends VrControl {
    private _value;
    private _actualView;
    private _tempNavigationDate;
    private _lblNavigation;
    constructor(element: HTMLElement, options?: CalendarOptions | null);
    private draw;
    private drawDays;
    private createTdDay;
    private checkAvailability;
    disabledDates(dates?: Date[]): Date[] | undefined;
    highlightedDates(dates?: Date[]): Date[] | undefined;
    private drawMonths;
    private drawYears;
    private drawDecades;
    getOptions(): CalendarOptions;
    depth(): DateDepthEnum;
    value(date?: Date | null, triggerChange?: boolean): Date | null;
    clear(triggerChange?: boolean): void;
    change(): void;
}
declare class CalendarEvent extends VrControlsEvent {
    sender: Calendar;
    value: Date | null;
}
declare class CalendarChangeEvent extends CalendarEvent {
}
declare class CalendarChangingEvent extends CalendarEvent {
    previousValue?: Date | null;
}
declare class CalendarDayDrawEvent extends VrControlsEvent {
    sender: Calendar;
    day: Date;
    element: HTMLElement;
}
declare class CalendarFinishedDrawEvent extends VrControlsEvent {
    sender: Calendar;
}
declare class CalendarDisableDateEvent extends VrControlsEvent {
    sender: Calendar;
    day: Date;
}
export {};
