import { VrControl, VrControlOptions, VrControlsEvent } from '../common';
import { ColorPickerModeEnum, ColorPickerRgbaValue } from '../vr';
export declare class ColorPickerOptions extends VrControlOptions {
    showInput?: boolean;
    mode?: ColorPickerModeEnum;
    palette?: boolean | string[];
    closeButton?: boolean | string;
    alphaChannel?: boolean;
    value?: string | ColorPickerRgbaValue;
    hexUppercase?: boolean;
    clearButton?: boolean;
    hideOnPaletteClick?: boolean;
    emptyMessage?: string;
    onChange?: (e: ColorPickerChangeEvent) => void;
}
export declare class ColorPicker extends VrControl {
    private _picker;
    private _value;
    constructor(element: HTMLElement, options?: ColorPickerOptions | null);
    value(value?: string | ColorPickerRgbaValue, triggerChange?: boolean): string | null;
    valueHex(value?: string, triggerChange?: boolean): any;
    valueRgba(value?: ColorPickerRgbaValue, triggerChange?: boolean): any;
    randomize(triggerChange?: boolean): string | null;
    open(): void;
    close(): void;
    mode(): ColorPickerModeEnum;
    triggerChange(): void;
    clear(triggerChange?: boolean): void;
    enable(): void;
    disable(): void;
    getOptions(): ColorPickerOptions;
}
declare class ColorPickerEvent extends VrControlsEvent {
    sender: ColorPicker;
}
declare class ColorPickerChangeEvent extends ColorPickerEvent {
    value: string | null;
    valueHex: string;
    valueRgba: string;
}
export {};
