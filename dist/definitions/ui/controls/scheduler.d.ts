import { VrControl, VrControlOptions, VrControlsEvent } from "../common";
import { DayOfWeekEnum, SchedulerData, SchedulerNavigateActionEnum, SchedulerResource, SchedulerSlotElement, SchedulerView, SchedulerViewEnum, SchedulerSaturationInfo } from "../vr";
import { Button } from "./button";
export declare class SchedulerOptions extends VrControlOptions {
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
export declare class Scheduler extends VrControl {
    private _dtpSchedulerDate;
    private _swtGroupByDateResource;
    private _btgMenuView;
    private _btnExpand;
    private _btnCollapse;
    private _cmbInterval;
    private _actualView;
    private _actualNavigateAction;
    private _isMoving;
    private _isResizing;
    private _timeColumnWidth;
    private _saturationData?;
    private _saturationVisible;
    private _datasource;
    private _slotElementList;
    private _availabilities;
    constructor(element: HTMLElement, options?: SchedulerOptions | null);
    drawToolbar(): void;
    private drawScheduler;
    private drawHeader;
    private createIntervalCombo;
    private drawContent;
    adaptHeight(): void;
    height(value?: string | number): number;
    view(view?: SchedulerViewEnum): SchedulerViewEnum;
    date(date?: Date, triggerChange?: boolean): Date | null;
    resources(resources?: SchedulerResource[]): SchedulerResource[];
    groupedByResource(): boolean;
    private triggerResourceChangeEvent;
    timeslotInterval(timeslotIntervalDuration?: number): number;
    firstDayOfWeek(): DayOfWeekEnum;
    startTime(): Date;
    endTime(): Date;
    groupWeekByDate(group?: boolean): boolean;
    fullscreen(state?: boolean): boolean;
    datasource<T extends SchedulerData>(datasource?: T[]): T[];
    private setResizing;
    availabilities<T extends SchedulerData>(availabilities?: T[]): T[];
    private checkMandatorySchedulerDataFields;
    private managePropertiesSchedulerData;
    rebind(appointments?: boolean, availabilities?: boolean): void;
    rebindAppointments(): void;
    rebindAvailabilities(): void;
    saturation(saturationData?: SchedulerSaturationInfo): SchedulerSaturationInfo | undefined;
    private manageSaturationPercentage;
    private manageWeekDateList;
    clearSaturation(): void;
    showSaturation(): void;
    private internalShowSaturation;
    hideSaturation(): void;
    private internalHideSaturation;
    saturationVisible(): boolean;
    bounceAppointment(divElementId: string): void;
    private manageSchedulerClick;
    private getDivContent;
    private findOverlappedAppointments;
    private adaptDateToTimeslotDuration;
    private getAppointmentSlots;
    exportPdf(fileName?: string, onlyVisible?: boolean, autoPrint?: boolean, loader?: boolean): void;
    getOptions(): SchedulerOptions;
}
declare class SchedulerEvent extends VrControlsEvent {
    sender: Scheduler;
}
declare class SchedulerNavigateEvent extends SchedulerEvent {
    action?: SchedulerNavigateActionEnum;
    date?: Date;
    view?: SchedulerViewEnum;
    previousDate: Date | null;
}
declare class SchedulerViewChangeEvent extends SchedulerEvent {
    previousView: SchedulerViewEnum;
    view: SchedulerViewEnum;
}
declare class SchedulerIntervalChangeEvent extends SchedulerEvent {
    value?: number;
    view?: SchedulerViewEnum;
    previousValue: number | undefined;
}
declare class SchedulerResourcesChangeEvent extends SchedulerEvent {
    resources: SchedulerResource[];
    view?: SchedulerViewEnum;
}
declare class SchedulerClickEvent extends SchedulerEvent {
    start: Date;
    end: Date;
    resourceId: string;
    element: HTMLElement;
    slotElement: SchedulerSlotElement;
}
export declare class SchedulerTimeslotClickEvent extends SchedulerClickEvent {
}
export declare class SchedulerAppointmentClickEvent extends SchedulerClickEvent {
    dataItem: SchedulerData;
}
export declare class SchedulerAvailabilityClickEvent extends SchedulerClickEvent {
    dataItem: SchedulerData;
}
declare class SchedulerMoveEvent extends SchedulerEvent {
    start: Date;
    end: Date;
    resourceId: string;
    divElement: HTMLDivElement;
    dataItem: SchedulerData;
}
declare class SchedulerMoveStartEvent extends SchedulerMoveEvent {
}
declare class SchedulerMovingEvent extends SchedulerMoveEvent {
}
declare class SchedulerMoveEndEvent extends SchedulerMoveEvent {
}
declare class SchedulerResizeEvent extends SchedulerEvent {
    start: Date;
    end: Date;
    resourceId: string;
    divElement: HTMLDivElement;
    dataItem: SchedulerData;
}
declare class SchedulerResizeStartEvent extends SchedulerResizeEvent {
}
declare class SchedulerResizingEvent extends SchedulerResizeEvent {
}
declare class SchedulerResizeEndEvent extends SchedulerResizeEvent {
}
declare class SchedulerMaxResourceNumber {
    dayView?: number;
    weekView?: number;
    fourWeeksView?: number;
}
declare class SchedulerExpandCollapseEvent extends SchedulerEvent {
    buttonExpand: Button;
    buttonCollpase: Button;
}
declare class SchedulerExpandEvent extends SchedulerExpandCollapseEvent {
}
declare class SchedulerCollapseEvent extends SchedulerExpandCollapseEvent {
}
declare class SchedulerEditable {
    move?: boolean;
    resize?: boolean;
}
export {};
