import { ButtonModeEnum, ColorSettings, IconClass, PositionEnum, IconSettings } from "../vr";
import { VrControlOptions, VrControl, VrControlsEvent } from "../common";
export declare class ButtonOptions extends VrControlOptions {
    text?: string;
    value?: string;
    mode?: ButtonModeEnum;
    tooltip?: string;
    colorSettings?: ColorSettings;
    icon?: IconClass;
    imageUrl?: string;
    iconSettings?: IconSettings;
    confirmationMessage?: string;
    badgeSettings?: ButtonBadgeSettings;
    onContextMenu?: boolean | ((e: ContextMenuEvent) => void);
    onClick?: (e: ButtonClickEvent) => void;
    onRightClick?: (e: ButtonRightClickEvent) => void;
    onMiddleClick?: (e: ButtonMiddleClickEvent) => void;
    onHover?: (e: ButtonHoverEvent) => void;
    onBlur?: (e: ButtonBlurEvent) => void;
    onRejectedConfirm?: () => void;
    onMouseDown?: (e: ButtonMouseDownEvent) => void;
    onMouseUp?: (e: ButtonMouseUpEvent) => void;
}
export declare class Button extends VrControl {
    private _mouseDownEvent;
    constructor(element: HTMLElement, options?: ButtonOptions | null);
    text(value?: string): string;
    value(value?: string): string;
    tooltip(value?: string | number): string;
    badge(text?: string | number): any;
    badgeBackgroundColor(color: string): void;
    badgeColor(color: string): void;
    showBadge(): void;
    hideBadge(): void;
    hide(): void;
    mode(mode?: ButtonModeEnum): ButtonModeEnum;
    colorSettings(settings?: ColorSettings): ColorSettings | undefined;
    color(value?: string): string;
    backgroundColor(value?: string): string;
    borderColor(value?: string): string;
    icon(icon?: IconClass, iconPosition?: PositionEnum | null, iconTooltip?: string): HTMLElement | null;
    imageUrl(imageUrl?: string, imagePosition?: PositionEnum): HTMLElement | null;
    getOptions(): ButtonOptions;
    click(callback?: (e: ButtonClickEvent) => void): void;
    private internalClick;
    private rejectedConfirm;
}
declare class ButtonEvent extends VrControlsEvent {
    sender: Button;
}
declare class ButtonClickEvent extends ButtonEvent {
    text: string;
}
declare class ButtonRightClickEvent extends ButtonEvent {
    text: string;
    leftButton?: boolean;
    middleButton?: boolean;
    rightButton?: boolean;
}
declare class ButtonMiddleClickEvent extends ButtonEvent {
    text: string;
    leftButton?: boolean;
    middleButton?: boolean;
    rightButton?: boolean;
}
declare class ButtonHoverEvent extends ButtonEvent {
}
declare class ButtonBlurEvent extends ButtonEvent {
}
declare class ContextMenuEvent extends ButtonEvent {
}
declare class ButtonMouseDownEvent extends ButtonEvent {
}
declare class ButtonMouseUpEvent extends ButtonEvent {
}
export declare class ButtonBadgeSettings {
    text?: string | number;
    color?: string;
    backgroundColor?: string;
    visible?: boolean;
    css?: string;
    click?: (e: ButtonBadgeClickEvent) => void;
}
declare class ButtonBadgeClickEvent {
    sender: Button;
    text: string;
    leftButton?: boolean;
    middleButton?: boolean;
    rightButton?: boolean;
}
export {};
