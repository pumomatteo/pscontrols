import { VrControl, VrControlOptions, VrControlsEvent } from "../common";
import { SwitchLabelSettings } from "../vr";
export declare class SwitchOptions extends VrControlOptions {
    labelOff?: string | SwitchLabelSettings;
    labelOn?: string | SwitchLabelSettings;
    checked?: boolean;
    onChange?(e: SwitchChangeEvent): void;
}
export declare class Switch extends VrControl {
    private _badgeLabelOff;
    private _badgeLabelOn;
    constructor(element: HTMLElement, options?: SwitchOptions | null);
    check(): boolean;
    checked(state?: boolean, triggerChange?: boolean): boolean;
    clear(triggerChange?: boolean): void;
    labelOff(text?: string): string;
    labelOn(text?: string): string;
    badgeLabelOff(text?: string | number): any;
    badgeBackgroundColorLabelOff(color: string): void;
    badgeColorLabelOff(color: string): void;
    showBadgeLabelOff(): void;
    hideBadgeLabelOff(): void;
    visibleBadgeLabelOff(state: boolean): void;
    badgeLabelOn(text?: string | number): any;
    badgeBackgroundColorLabelOn(color: string): void;
    badgeColorLabelOn(color: string): void;
    showBadgeLabelOn(): void;
    hideBadgeLabelOn(): void;
    visibleBadgeLabelOn(state: boolean): void;
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
