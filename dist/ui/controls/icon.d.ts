import { VrControl, VrControlOptions, VrControlsEvent } from '../common';
import { IconClassicLight } from '../vr';
export declare class IconOptions extends VrControlOptions {
    value?: string | IconClassicLight;
    color?: string;
    fontSize?: number | string;
    cursorPointer?: boolean;
    confirmationMessage?: string;
    tooltip?: string;
    onClick?: (e: VrIconClickEvent) => void;
    onMouseDown?: (e: VrIconClickEvent) => void;
    onRejectedConfirm?: () => void;
}
export declare class Icon extends VrControl {
    constructor(element: HTMLElement, options?: IconOptions | null);
    value(value?: string | IconClassicLight): string | undefined;
    fontSize(fontSize?: number | string): string | number | undefined;
    color(color?: string): string | undefined;
    click(): void;
    private internalClick;
    mouseDown(): void;
    private internalMouseDown;
    private rejectedConfirm;
    getOptions(): IconOptions;
}
declare class VrIconClickEvent extends VrControlsEvent {
    sender: Icon;
    value?: string | IconClassicLight;
}
export {};
