import { VrControl, VrControlOptions, VrControlsEvent } from "../common";
import { SwitchLabelSettings } from "../vr";
export declare class SwitchOptions extends VrControlOptions {
    labelOff?: string | SwitchLabelSettings;
    labelOn?: string | SwitchLabelSettings;
    checked?: boolean;
    onChange?(e: SwitchChangeEvent): void;
}
export declare class Switch extends VrControl {
    constructor(element: HTMLElement, options?: SwitchOptions | null);
    checked(state?: boolean, triggerChange?: boolean): boolean;
    clear(triggerChange?: boolean): void;
    labelOff(text?: string): string;
    labelOn(text?: string): string;
    getOptions(): SwitchOptions;
    enable(): void;
    disable(): void;
}
declare class SwitchEvent extends VrControlsEvent {
    sender: Switch;
}
declare class SwitchChangeEvent extends SwitchEvent {
    checked: boolean;
}
export {};
