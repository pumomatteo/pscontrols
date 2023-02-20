import { VrControlOptions, VrControl, VrControlsEvent } from "../common";
import { OrientationEnum, CheckBoxItem } from "../vr";
export declare class CheckBoxListOptions extends VrControlOptions {
    items?: CheckBoxItem[];
    orientation?: OrientationEnum;
    allChecked?: boolean;
    listName?: string;
    marginBetween?: number;
    onBeforeSelect?(e: CheckBoxListSelectEvent): void;
    onSelect?(e: CheckBoxListSelectEvent): void;
}
export declare class CheckBoxList extends VrControl {
    private _checkboxControls;
    private _items;
    constructor(element: HTMLElement, options?: CheckBoxListOptions | null);
    items(items?: CheckBoxItem[]): CheckBoxItem[];
    checkAll(triggerChange?: boolean): void;
    unCheckAll(triggerChange?: boolean): void;
    value(values?: string[], state?: boolean, triggerChange?: boolean): string[];
    valueTag(tagList?: any[], state?: boolean, triggerChange?: boolean): any[];
    isChecked(value: string): boolean;
    text(value: string, text?: string): string;
    clear(checkAll?: boolean, triggerChange?: boolean): void;
    clearItems(): void;
    getOptions(): CheckBoxListOptions;
    enable(): void;
    disable(): void;
}
declare class CheckBoxListSelectEvent extends VrControlsEvent {
    sender: CheckBoxList;
    checkedValues?: string[];
    value?: string;
    checked?: boolean;
}
export {};
