import { VrControlOptions, VrControl, VrControlsEvent } from "../common";
import { DefaultDayEnum, DateModeEnum, DateFormatEnum, DateDepthEnum, PopupSettings } from "../vr";
export declare class DatePickerOptions extends VrControlOptions {
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
export declare class DatePicker extends VrControl {
    private _value;
    private _currentCursorPosition;
    private _popup;
    private _justOpened;
    constructor(element: HTMLElement, options?: DatePickerOptions | null);
    close(): void;
    open(): void;
    private formatDateInput;
    private openPopupDatePicker;
    private formatInputDatePicker;
    private openPopupTimePicker;
    private createTimeLabel;
    private formatInputTimePicker;
    private formatInputDateTimePicker;
    private getFinalYear;
    private updateCursorPosition;
    value(date?: Date | null, triggerChange?: boolean): Date | null;
    private formatValue;
    mode(mode?: DateModeEnum): DateModeEnum | undefined;
    min(min?: Date): Date | undefined;
    max(max?: Date): Date | undefined;
    format(format?: DateFormatEnum, changeText?: boolean): DateFormatEnum | Intl.DateTimeFormatOptions | undefined;
    clear(triggerChange?: boolean): void;
    isEmpty(): boolean;
    error(): void;
    hideError(): void;
    private getOptions;
    enable(): void;
    disable(): void;
    change(): void;
}
export declare class TimePicker extends DatePicker {
}
export declare class DateTimePicker extends DatePicker {
}
export declare class MonthPicker extends DatePicker {
}
export declare class YearPicker extends DatePicker {
}
declare class DatePickerEvent extends VrControlsEvent {
    sender: DatePicker;
    value: Date | null;
}
declare class DatePickerChangeEvent extends DatePickerEvent {
}
declare class DatePickerChangingEvent extends DatePickerEvent {
    previousValue?: Date | null;
}
export declare enum ActualViewEnum {
    Day = 0,
    Month = 1,
    Year = 2,
    Decade = 3
}
declare class DatePickerFocusEvent extends DatePickerEvent {
}
declare class DatePickerBlurEvent extends DatePickerEvent {
}
declare class DatePickerKeyUpPressEvent extends VrControlsEvent {
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
declare class DatePickerKeyUpEvent extends DatePickerKeyUpPressEvent {
}
declare class DatePickerKeyDownEvent extends DatePickerKeyUpPressEvent {
}
export {};
