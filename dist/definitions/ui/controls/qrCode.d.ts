import { VrControl, VrControlOptions, VrControlsEvent } from "../common";
import { BorderStyleEnum } from "../vr";
export declare class QrCodeOptions extends VrControlOptions {
    value?: string | number;
    color?: string;
    border?: boolean | QrCodeBorderSettings;
    wrap?: boolean;
    onClick?: (e: QrCodeClickEvent) => void;
}
export declare class QrCode extends VrControl {
    private _value;
    private _svg;
    constructor(element: HTMLElement, options?: QrCodeOptions | null);
    value(value?: string | number): string;
    svg(): SVGElement;
    clear(): void;
    getOptions(): QrCodeOptions;
}
declare class QrCodeBorderSettings {
    size?: number;
    color?: string;
    style?: string | BorderStyleEnum;
}
declare class QrCodeClickEvent extends VrControlsEvent {
    sender: QrCode;
    value: string;
}
export {};
