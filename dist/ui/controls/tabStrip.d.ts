import { VrControl, VrControlOptions, VrControlsEvent } from '../common';
import { TabStripItem } from '../vr';
export declare class TabStripOptions extends VrControlOptions {
    items?: TabStripItem[];
    backgroundColor?: string;
    tooltip?: boolean;
    onSelect?(e: TabStripSelectEvent): void;
    onItemAdded?(e: TabStripItemAddedEvent): void;
    onItemRemoved?(e: TabStripItemRemovedEvent): void;
}
export declare class TabStrip extends VrControl {
    private _buttonGroup;
    constructor(element: HTMLElement, options?: TabStripOptions | null);
    items(items?: TabStripItem[]): TabStripItem[];
    addItem(item: TabStripItem, show?: boolean): void;
    item(value: string): TabStripItem;
    removeItem(value: string): void;
    removeAllItems(): void;
    showItems(values: any[]): void;
    showItem(value: any): void;
    showAllItems(): void;
    hideItems(values: any[]): void;
    hideItem(value: any, hide?: boolean): void;
    hideAllItems(hideElement?: boolean): void;
    visibleItem(value: any, state?: boolean): boolean;
    enableItem(value: any): void;
    enableItems(values: any[]): void;
    disableItem(value: any): void;
    disableItems(values: any[]): void;
    select(values: string[] | number[], triggerChange?: boolean): void;
    selectIndex(index: number, triggerChange?: boolean): void;
    value(): any;
    getItemByValue(value: string): HTMLElement;
    getItemByIndex(index: number): HTMLElement;
    itemTooltip(value: string, tooltip?: string): string;
    itemText(value: string, text?: string, updateTooltip?: boolean): string;
    itemTextByIndex(index: number, text?: string): string;
    enable(): void;
    disable(): void;
    getOptions(): TabStripOptions;
}
declare class TabStripEvent extends VrControlsEvent {
    sender: TabStrip;
}
declare class TabStripSelectEvent extends TabStripEvent {
    value?: string | null;
    selectedValues: string[];
    selected?: boolean;
}
declare class TabStripItemAddedEvent extends TabStripEvent {
}
declare class TabStripItemRemovedEvent extends TabStripEvent {
}
export {};
