import { ControlTypeEnum, LabelModeEnum, PositionEnum, TextAlignEnum, PopupSettings, ColorSettings, VrMarginSettings, LabelUnderlineMode } from "./vr";
import { Label, LabelClickEvent } from "./controls/label";
export declare class VrControl {
    private _element;
    _options: VrControlOptions;
    private _labelOutside;
    private _typeEnum;
    private _tag;
    constructor(element?: HTMLElement | HTMLInputElement, options?: VrControlOptions, typeEnum?: ControlTypeEnum);
    controlType(): ControlTypeEnum;
    id(id?: string): string;
    tag(tag?: any): any;
    uniqueName(uniqueName?: string): any;
    attribute(name: string, value: any, toContainer?: boolean): void;
    tooltip(tooltip?: string, container?: boolean): any;
    element<T extends HTMLElement>(): T;
    container(): HTMLElement;
    label(): Label | null;
    options<T extends VrControlOptions>(): T;
    settingPopup(popup: HTMLElement, popupSettings?: PopupSettings): void;
    private fixWidthHeightValue;
    width(value?: string | number): number;
    height(value?: string | number): number;
    enabled(state?: boolean): boolean;
    enable(): void;
    disable(): void;
    visible(state?: boolean): boolean;
    show(): void;
    hide(): void;
    focus(): void;
    blur(): void;
    cssContainer(value: string): void;
    css(value: string): void;
    class(className?: string): string[];
    classContainer(className?: string): string[];
    removeClass(className: string): void;
}
export declare class VrControlOptions {
    width?: string | number;
    height?: string | number;
    id?: string;
    css?: string;
    cssContainer?: string;
    class?: string;
    classContainer?: string;
    margin?: number | VrMarginSettings;
    enable?: boolean;
    visible?: boolean;
    label?: string;
    labelSettings?: LabelControlsSettings;
    tag?: any;
    uniqueName?: string;
    attributes?: AttributeSettings[];
    tabIndex?: number;
    shadowRoot?: boolean;
    addToControlList?: boolean;
}
export declare class LabelControlsSettings {
    id?: string;
    mode?: LabelModeEnum;
    width?: number;
    class?: string;
    position?: PositionEnum;
    fontSize?: number | string;
    textAlign?: TextAlignEnum;
    tooltip?: boolean | string;
    bold?: boolean;
    css?: string;
    cssContainer?: string;
    colorSettings?: ColorSettings;
    underlineMode?: LabelUnderlineMode | undefined;
    onClick?: (e: LabelClickEvent) => void;
}
export declare class AttributeSettings {
    name: string;
    value: any;
    container?: boolean;
}
export declare class VrControlsEvent {
    private _defaultPrevented;
    preventDefault(): void;
    isDefaultPrevented(): boolean;
}
