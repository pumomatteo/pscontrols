import { ButtonModeEnum, ColorSettings, IconClass, PopupSettings } from "../vr";
import { VrControlOptions, VrControl } from "../common";
import { Button } from "./button";
export declare class SplitButtonOptions extends VrControlOptions {
    text?: string;
    icon?: IconClass;
    imageUrl?: string;
    colorSettings?: ColorSettings;
    popupSettings?: PopupSettings;
    tooltip?: string;
    items?: SplitButtonItem[];
    hoverMode?: boolean;
    modal?: boolean;
    showDefault?: boolean;
    separator?: boolean;
    onClick?: (e: SplitButtonMainClickEvent) => void;
    onSelect?: (e: SplitButtonSelectClickEvent) => void;
}
export declare class SplitButton extends VrControl {
    private _popup;
    private _btnMain;
    private _items;
    private _itemButtonList;
    constructor(element: HTMLElement, options?: SplitButtonOptions | null);
    open(): void;
    close(): void;
    items(items?: SplitButtonItem[]): SplitButtonItem[];
    private drawItem;
    addItem(item: SplitButtonItem): void;
    removeItem(value: string | number): void;
    clearItems(): void;
    enable(): void;
    disable(): void;
    itemVisible(value: string, state?: boolean): boolean;
    showItem(value: string): void;
    showItems(values: string[]): void;
    showOnlyThisItem(value: string): void;
    hideItem(value: string): void;
    hideItems(values: string[]): void;
    hideOnlyThisItem(value: string): void;
    itemEnable(value: string, state?: boolean): boolean;
    enableAllItems(): void;
    enableItems(values: string[]): void;
    enableItem(value: string): void;
    disableAllItems(): void;
    disableItems(values: string[]): void;
    disableItem(value: string): void;
    item(value: string | number): Button | null;
    mainItem(): Button;
    private getOptions;
    click(): void;
}
export declare class SplitButtonItem {
    text?: string;
    value?: string | number;
    icon?: IconClass;
    imageUrl?: string;
    separator?: boolean;
    mode?: ButtonModeEnum;
    colorSettings?: ColorSettings;
    confirmationMessage?: string;
    visible?: boolean;
    enable?: boolean;
    tooltip?: string;
    css?: string;
    cssContainer?: string;
    class?: string;
    onClick?: (e: SplitButtonClickEvent) => void;
}
declare class SplitButtonClickEvent {
    sender: SplitButton;
    item: SplitButtonItem;
}
declare class SplitButtonMainClickEvent {
    sender: SplitButton;
    text?: string;
    value?: string;
    items?: SplitButtonItem[];
}
declare class SplitButtonSelectClickEvent {
    text?: string;
    value?: string;
    mainButton?: boolean;
}
export {};
