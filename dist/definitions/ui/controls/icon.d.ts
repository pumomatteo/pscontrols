import { VrControl, VrControlOptions, VrControlsEvent } from "../common";
import { IconClassLight } from "../vr";
export declare class IconOptions extends VrControlOptions {
    value?: string | IconClassLight;
    color?: string;
    fontSize?: number | string;
    cursorPointer?: boolean;
    confirmationMessage?: string;
    tooltip?: string;
    onClick?: (e: VrIconClickEvent) => void;
    onRejectedConfirm?: () => void;
}
export declare class Icon extends VrControl {
    constructor(element: HTMLElement, options?: IconOptions | null);
    value(value?: string | IconClassLight): string | undefined;
    fontSize(fontSize?: number | string): string | number | undefined;
    color(color?: string): string | undefined;
    click(): void;
    private internalClick;
    private rejectedConfirm;
    getOptions(): IconOptions;
}
declare class VrIconClickEvent extends VrControlsEvent {
    sender: Icon;
    value?: string | IconClassLight;
}
export {};
