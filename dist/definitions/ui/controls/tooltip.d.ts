import { VrControl, VrControlOptions, VrControlsEvent } from "../common";
import { AnimationHideEnum, AnimationShowEnum, ColorSettings, IconClass, TooltipHideOnEnum, TooltipPositionEnum, TooltipShowOnEnum, TooltipTypeEnum } from "../vr";
export declare class TooltipOptions extends VrControlOptions {
    target?: HTMLElement | JQuery | string;
    elementToAppend?: HTMLElement | JQuery | string;
    content?: string;
    type?: TooltipTypeEnum;
    position?: TooltipPositionEnum;
    hideSettings?: TooltipHideSettings;
    showSettings?: TooltipShowSettings;
    colorSettings?: ColorSettings;
    showOn?: TooltipShowOnEnum;
    hideOn?: TooltipHideOnEnum;
    icon?: IconClass;
    onShow?: (e: TooltipShowEvent) => void;
    onHide?: (e: TooltipHideEvent) => void;
}
export declare class Tooltip extends VrControl {
    private _notifier;
    constructor(element: HTMLElement, options?: TooltipOptions | null);
    show(content?: any): void;
    hide(): void;
    visible(state?: boolean): any;
    content(content?: string): string | undefined;
    target(): HTMLElement;
    getOptions(): TooltipOptions;
}
declare class TooltipHideSettings {
    clickToHide?: boolean;
    hideAfter?: number;
    animation?: AnimationHideEnum;
}
declare class TooltipShowSettings {
    showAfter?: number;
    animation?: AnimationShowEnum;
}
declare class TooltipShowEvent extends VrControlsEvent {
    sender: Tooltip;
    content: string;
}
declare class TooltipHideEvent extends VrControlsEvent {
    sender: Tooltip;
    content: string;
}
export {};
