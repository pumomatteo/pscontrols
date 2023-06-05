import { VrControl, VrControlOptions, VrControlsEvent } from "../common";
import { IconClass, WindowFooterItemTypeEnum as WindowFooterItemTypeEnum, ButtonModeEnum, ColorSettings, WindowFooterItemAlignEnum, WindowAutoSizeDirectionEnum, TextAlignEnum, ButtonGroupItem, IconSettings } from "../vr";
import { SplitButtonItem } from "./splitButton";
import { ComboBoxOptions } from "./comboBox";
import { DatePickerOptions } from "./datePicker";
import { TextBoxOptions } from "./textbox";
export declare class WindowOptions extends VrControlOptions {
    maximized?: boolean | WindowMaximizeSettings;
    padding?: number;
    modal?: boolean;
    closeable?: boolean;
    hideCloseIcon?: boolean;
    removeOnClose?: boolean;
    title?: string | boolean | WindowTitleSettings;
    footer?: boolean | WindowFooterItem[];
    draggable?: boolean;
    position?: WindowPosition;
    content?: string;
    iframe?: boolean;
    loader?: boolean;
    autoSize?: boolean | WindowAutoSizeDirectionEnum;
    cssHeader?: string;
    onOpen?(e: WindowOpenEvent): void;
    onBeforeClose?(e: WindowBeforeCloseEvent): void;
    onClose?(e: WindowCloseEvent): void;
    onDragStart?(e: WindowDragStartEvent): void;
    onDragEnd?(e: WindowDragEndEvent): void;
    onContentLoaded?(e: WindowContentLoadEvent): void;
}
export declare class Window extends VrControl {
    private _divHeader;
    private _divFooter;
    private _callbackFooterItems?;
    private _openCloseCallback?;
    private _additionalCloseCallbacks?;
    private _additionalOpenCallbacks?;
    private _additionalContentLoadedCallbacks;
    private _background;
    private _iframe;
    private _animateAutosize;
    constructor(element: HTMLElement, options?: WindowOptions | null);
    open(callBackFooterItems?: CallBackFooterItem[] | null, center?: boolean, position?: WindowPosition): Promise<any>;
    close(triggerEvents?: boolean): void;
    remove(): void;
    addCloseCallbacks(...callback: Function[]): void;
    addOpenCallbacks(...callback: Function[]): void;
    addContentLoadedCallbacks(...callback: Function[]): void;
    closeIconVisible(state?: boolean): any;
    title(text?: string): string;
    maximize(padding?: boolean): void;
    resize(width?: number | string, height?: number | string): void;
    autoSize(direction?: WindowAutoSizeDirectionEnum, animate?: boolean, center?: boolean): void;
    content(content: string, loader?: boolean | HTMLElement | JQuery | string, open?: boolean, triggerChange?: boolean): void;
    private autoSizeIfRequired;
    clear(): void;
    background(): HTMLElement;
    center(): void;
    position(left?: number | string | null, top?: number | string | null, right?: number | string | null, bottom?: number | string | null): {
        left: number;
        top: number;
    };
    footerItem<T extends VrControl>(value: string | number): T;
    hideFooterItem(value: string | number): void;
    showFooterItem(value: string | number): void;
    visibleFooterItem(value: string | number, state?: boolean): boolean;
    enableFooterItem(value: string | number): void;
    disableFooterItem(value: string | number): void;
    addFooterItem(footerItem: WindowFooterItem): void;
    footer(): HTMLElement;
    header(): HTMLElement;
    titleElement(): HTMLElement;
    private getOptions;
    private onContentLoaded;
    height(height?: number | string, center?: boolean): number;
    width(width?: number | string, center?: boolean): number;
}
export declare class WindowFooterItem {
    value?: string;
    type?: WindowFooterItemTypeEnum;
    text?: string;
    icon?: IconClass;
    iconSettings?: IconSettings;
    imageUrl?: string;
    mode?: ButtonModeEnum;
    colorSettings?: ColorSettings;
    tooltip?: string;
    confirmationMessage?: string;
    align?: WindowFooterItemAlignEnum;
    visible?: boolean;
    enable?: boolean;
    css?: string;
    cssContainer?: string;
    class?: string;
    width?: string | number;
    splitButtonItems?: SplitButtonItem[];
    switchSettings?: SplitButtonSwitchSettings;
    buttonGroupItems?: ButtonGroupItem[];
    comboBoxOptions?: ComboBoxOptions;
    datePickerOptions?: DatePickerOptions;
    textBoxOptions?: TextBoxOptions;
    onClick?(e: WindowFooterItemClickEvent): void;
}
declare class CallBackFooterItem {
    value: string;
    callback: Function;
}
export declare class SplitButtonSwitchSettings {
    labelOff?: string;
    labelOn?: string;
    checked?: boolean;
    onCheck?: (e: SplitButtonSwitchEvent) => void;
}
declare class SplitButtonSwitchEvent {
    checked: boolean;
}
declare class WindowPosition {
    left?: number | string;
    top?: number | string;
    right?: number | string;
    bottom?: number | string;
}
declare class WindowMaximizeSettings {
    padding: boolean;
}
declare class WindowTitleSettings {
    text?: string;
    colorSettings?: ColorSettings;
    fontSize?: number;
    cssContainer?: string;
    css?: string;
    align?: TextAlignEnum;
}
export declare class WindowEvent extends VrControlsEvent {
    sender: Window;
}
declare class WindowFooterItemClickEvent extends WindowEvent {
}
export declare class WindowOpenEvent extends WindowEvent {
}
declare class WindowBeforeCloseEvent extends WindowEvent {
}
declare class WindowCloseEvent extends WindowEvent {
}
declare class WindowDragStartEvent extends WindowEvent {
    left: number;
    top: number;
}
declare class WindowDragEndEvent extends WindowEvent {
    left: number;
    top: number;
}
declare class WindowContentLoadEvent extends WindowEvent {
}
export {};
