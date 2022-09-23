import { VrControl, VrControlOptions, VrControlsEvent } from "../common";
import { SelectionModeEnum, ButtonGroupItem } from "../vr";
export declare class ButtonGroupOptions extends VrControlOptions {
    items?: ButtonGroupItem[];
    selectionMode?: SelectionModeEnum;
    checkboxes?: boolean;
    tooltip?: boolean;
    onSelect?(e: ButtonGroupSelectEvent): void;
    onItemAdded?(e: ButtonGroupItemAddedEvent): void;
    onItemRemoved?(e: ButtonGroupItemRemovedEvent): void;
}
export declare class ButtonGroup extends VrControl {
    private _items;
    private _btnScrollBack;
    private _btnScrollForward;
    private _populating;
    constructor(element: HTMLElement, options?: ButtonGroupOptions | null);
    items(items?: ButtonGroupItem[]): ButtonGroupItem[];
    addItem(item: ButtonGroupItem): void;
    private manageScrolling;
    private scrollBack;
    private scrollForward;
    item(value: string): ButtonGroupItem;
    removeItem(value: string): void;
    showItems(values: any[]): void;
    showItem(value: any): void;
    showAllItems(): void;
    hideItems(values: any[]): void;
    hideItem(value: any): void;
    hideAllItems(): void;
    visibleItem(value: any, state?: boolean): boolean;
    select(values: string[] | number[], triggerChange?: boolean): void;
    selectIndex(index: number, triggerChange?: boolean): void;
    private changeGlobal;
    private changeItem;
    getSelectedValues(): string[];
    value(): any;
    clear(): void;
    selectionMode(): SelectionModeEnum | undefined;
    getItemByValue(value: string): HTMLElement;
    getItemByIndex(index: number): HTMLElement;
    itemTooltip(value: string, tooltip?: string): string;
    itemText(value: string, text?: string, updateTooltip?: boolean): string;
    itemTextByIndex(index: number, text?: string): string;
    enableItem(value: any): void;
    disableItem(value: any): void;
    enable(): void;
    disable(): void;
    getOptions(): ButtonGroupOptions;
}
declare class ButtonGroupEvent extends VrControlsEvent {
    sender: ButtonGroup;
    value?: string | null;
}
declare class ButtonGroupSelectEvent extends ButtonGroupEvent {
    selectedValues: string[];
    selected?: boolean;
}
declare class ButtonGroupItemAddedEvent extends ButtonGroupEvent {
}
declare class ButtonGroupItemRemovedEvent extends ButtonGroupEvent {
}
export declare class ButtonGroupClickEvent extends ButtonGroupEvent {
    value: string;
    selected: boolean;
}
export declare class ButtonGroupIconClickEvent extends ButtonGroupEvent {
    value: string;
    selected: boolean;
}
export {};
