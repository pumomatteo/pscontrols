import { VrControl, VrControlOptions, VrControlsEvent } from "../common";
import { SchedulerData, SchedulerResource } from "../vr";
import { SchedulerAppointmentClickEvent, SchedulerAvailabilityClickEvent, SchedulerTimeslotClickEvent } from "./scheduler";
export declare class MultiSchedulerOptions extends VrControlOptions {
    resources?: SchedulerResource[];
    datasource?: SchedulerData[];
    dates?: Date[];
    startTime?: Date;
    endTime?: Date;
    timeslotIntervalDuration?: number;
    exportPdf?: boolean;
    showNavigateButtons?: boolean;
    maxDatesNumber?: number;
    onTimeslotClick?: (e: SchedulerTimeslotClickEvent) => void;
    onAvailabilityClick?: (e: SchedulerAvailabilityClickEvent) => void;
    onAppointmentClick?: (e: SchedulerAppointmentClickEvent) => void;
    onNavigate?: (e: MultiSchedulerNavigateEvent) => void;
}
export declare class MultiScheduler extends VrControl {
    private _resources?;
    private _datasource;
    private _availabilities;
    private _dates;
    private _dictionaryDateScheduler;
    private _cmbTimeslotIntervalDuration;
    constructor(element: HTMLElement, options?: MultiSchedulerOptions | null);
    dates(dates?: Date[]): Date[];
    datasource<T extends SchedulerData>(datasource?: T[]): T[];
    availabilities<T extends SchedulerData>(availabilities?: T[]): T[];
    private drawData;
    resources(resources?: SchedulerResource[]): SchedulerResource[] | undefined;
    startTime(): Date;
    endTime(): Date;
    timeslotInterval(timeslotIntervalDuration?: number): number;
    rebind(): void;
    private adaptHeight;
    private fixWidth;
    getOptions(): MultiSchedulerOptions;
}
declare class MultiSchedulerNavigateEvent extends VrControlsEvent {
    sender: MultiScheduler;
    action?: MultiSchedulerNavigateActionEnum;
    dates?: Date[];
}
declare enum MultiSchedulerNavigateActionEnum {
    NextDate = 0,
    PrevDate = 1
}
export {};
