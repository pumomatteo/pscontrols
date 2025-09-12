import { ButtonModeEnum, ColorSettings, IconClass, PopupSettings } from '../vr';
import { VrControlOptions, VrControl } from '../common';
import { Button } from './button';
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
    itemVisible(value: string | number, state?: boolean): boolean;
    showItem(value: string | number): void;
    showItems(values: string[] | number[]): void;
    showOnlyThisItem(value: string | number): void;
    hideItem(value: string | number): void;
    hideItems(values: string[] | number[]): void;
    hideOnlyThisItem(value: string | number): void;
    itemEnable(value: string | number, state?: boolean): boolean;
    enableAllItems(): void;
    enableItems(values: string[] | number[]): void;
    enableItem(value: string | number): void;
    disableAllItems(): void;
    disableItems(values: string[] | number[]): void;
    disableItem(value: string | number): void;
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
