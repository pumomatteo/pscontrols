import { VrControlOptions, VrControl, VrControlsEvent } from "../common";
import { AutoCompleteBoxItem, AutoCompleteBoxComboSettings, AutoCompleteBoxItemSettings } from "../vr";
export declare class AutoCompleteBoxOptions extends VrControlOptions {
    value?: string[] | AutoCompleteBoxItem[];
    rows?: number;
    placeholder?: string;
    border?: boolean;
    itemSettings?: AutoCompleteBoxItemSettings;
    comboSettings?: AutoCompleteBoxComboSettings;
    tooltip?: boolean;
    onItemClick?: (e: AutoCompleteBoxItemClickEvent) => void;
    onItemAdded?: (e: AutoCompleteBoxItemAddedEvent) => void;
    onItemRemoved?: (e: AutoCompleteBoxItemRemovedEvent) => void;
    onFocus?: (e: AutoCompleteBoxFocusEvent) => void;
    onBlur?: (e: AutoCompleteBoxBlurEvent) => void;
}
export declare class AutoCompleteBox extends VrControl {
    private _txtInput;
    private _spanForWidth;
    private _items;
    private _comboItems;
    private _popup;
    private _lastAjaxCallGuid;
    private _typedTextWebService;
    private _dictionaryValueLi;
    private _dictionaryLiValue;
    constructor(element: HTMLElement, options?: AutoCompleteBoxOptions | null);
    private manageInput;
    private manageInputWidth;
    items(items?: string[] | AutoCompleteBoxItem[]): AutoCompleteBoxItem[];
    addItem(item: string | AutoCompleteBoxItem): void;
    removeItem(value: string): void;
    item(value: string): AutoCompleteBoxItemInfo;
    color(value: string, settings: AutoCompleteBoxItemSettings): void;
    text(): string[];
    value(items?: string[] | AutoCompleteBoxItem[]): (string | undefined)[];
    placeholder(value?: string): string;
    private textWidth;
    focus(): void;
    private focusEvent;
    private blurEvent;
    clear(): void;
    private close;
    private open;
    private doAjaxCall;
    private comboItems;
    private getOnlyChildrenItems;
    private getRootItems;
    private getRootValues;
    private drawDataSource;
    private drawItems;
    private valueCombo;
    private filter;
    private getFilteredArrayByInputText;
    getOptions(): AutoCompleteBoxOptions;
}
declare class AutoCompleteBoxEvent extends VrControlsEvent {
    sender: AutoCompleteBox;
}
declare class AutoCompleteBoxItemClickEvent extends AutoCompleteBoxEvent {
    item: AutoCompleteBoxItemInfo;
    text: string;
}
declare class AutoCompleteBoxItemAddedEvent extends AutoCompleteBoxEvent {
    item: AutoCompleteBoxItemInfo;
}
declare class AutoCompleteBoxItemRemovedEvent extends AutoCompleteBoxEvent {
    item: AutoCompleteBoxItemInfo;
}
declare class AutoCompleteBoxItemInfo {
    item: AutoCompleteBoxItem;
    element: HTMLElement;
}
declare class AutoCompleteBoxFocusEvent extends AutoCompleteBoxEvent {
    element: HTMLElement;
}
declare class AutoCompleteBoxBlurEvent extends AutoCompleteBoxEvent {
    element: HTMLElement;
}
export {};
