import { LabelModeEnum, ColorSettings, TextAlignEnum, LabelUnderlineMode, IconClass } from "../vr";
import { VrControlOptions, VrControl, VrControlsEvent } from "../common";
export declare class LabelOptions extends VrControlOptions {
    text?: string | number | Date;
    value?: string | number | Date;
    key?: string;
    tooltip?: boolean | string;
    colorSettings?: ColorSettings;
    fontSize?: number | string;
    fontFamily?: string;
    bold?: boolean;
    noBr?: boolean | number;
    mode?: LabelModeEnum;
    align?: TextAlignEnum;
    linkCss?: string;
    underlineMode?: LabelUnderlineMode;
    icon?: IconClass;
    onClick?: (e: LabelClickEvent) => void;
    onHover?: (e: LabelHoverEvent) => void;
}
export declare class Label extends VrControl {
    constructor(element: HTMLElement, options?: LabelOptions | null);
    value(value?: string | number | Date): string;
    appendText(value: string | number): void;
    tooltip(value?: string | number | Date): string;
    toTel(phoneNumber: string, customText?: string): void;
    toMail(mail: string, customText?: string): void;
    toLink(url: string, customText?: string): void;
    private formatLinkLabel;
    color(value?: string): string;
    backgroundColor(value?: string): string;
    borderColor(value?: string): string;
    isEmpty(): boolean;
    clear(): void;
    getOptions(): LabelOptions;
    click(): void;
}
export declare class LabelClickEvent extends VrControlsEvent {
    sender: Label;
    text: string;
}
declare class LabelHoverEvent extends VrControlsEvent {
    sender: Label;
    text: string;
}
export {};
