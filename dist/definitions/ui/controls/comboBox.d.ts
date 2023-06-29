import { VrControlOptions, VrControl, VrControlsEvent } from "../common";
import { ComboBoxTypeEnum, ComboBoxTreeModeEnum, ComboBoxItem, IconClass, TextAlignEnum, PopupSettings, ComboBoxWebServiceSettings, ComboBoxTemplateEvent, ComboBoxChangeEvent, ComboBoxChangingEvent, ComboBoxClearEvent, SortByComboSettings } from "../vr";
import { Button, ButtonOptions } from "./button";
export declare class ComboBoxOptions extends VrControlOptions {
    mode?: ComboBoxTypeEnum;
    checkboxes?: boolean;
    freeText?: boolean;
    filter?: boolean;
    treeMode?: ComboBoxTreeModeEnum;
    value?: string | number | string[] | number[];
    webService?: ComboBoxWebServiceSettings;
    items?: ComboBoxItem[];
    clearButton?: boolean;
    addButton?: boolean | ButtonOptions;
    nullable?: boolean | ComboBoxNullableItem;
    textAlign?: TextAlignEnum;
    placeholder?: string;
    popupSettings?: PopupSettings;
    allSelectedMessage?: string;
    textEllipsis?: boolean;
    noBr?: boolean;
    onlyIcon?: boolean;
    icon?: IconClass;
    imageUrl?: string;
    checkAll?: boolean;
    showCheckAll?: boolean | CheckAllSettings;
    tooltip?: string;
    template?: (e: ComboBoxTemplateEvent) => string;
    onBeforeChange?(e: ComboBoxChangingEvent): void;
    onAfterChange?(e: ComboBoxChangeEvent): void;
    onKeyDown?(e: ComboBoxKeyDownEvent): void;
    onKeyUp?(e: ComboBoxKeyUpEvent): void;
    onEnterKey?(e: ComboBoxEnterKeyEvent): void;
    onBeforeOpen?(e: ComboBoxOpenEvent): void;
    onAfterOpen?(e: ComboBoxOpenEvent): void;
    onClose?(e: ComboBoxCloseEvent): void;
    onItemDataBound?(e: ComboBoxItemDataBoundEvent): void;
    onBlur?(e: ComboBoxBlurEvent): void;
    onClear?(e: ComboBoxClearEvent): void;
    onPaste?(e: ComboBoxPasteEvent): void;
}
export declare class ComboBox extends VrControl {
    private _items;
    private _popup;
    private _isDivElement;
    private _value?;
    private _tempValueWebService?;
    private _txtSearchFilter;
    private _chkCheckAll;
    private _typedTextWebService;
    private _isChecked;
    private _tempCheckedValue;
    private _openPopupAfterFocus;
    private _btnCombo;
    private _divPickerIcon;
    private _allCheckedOnlyIcon;
    private _iconCombo;
    private _dictionaryValueLi;
    private _checkedValues;
    private _openedValue;
    private _lastAjaxCallGuid;
    private _focusWithArrows;
    private _callbackAfterValue?;
    constructor(element: HTMLElement, options?: ComboBoxOptions | null);
    close(): void;
    open(): void;
    private limitInputByDataSource;
    private filter;
    private drawDataSource;
    private drawItems;
    private getFilteredArrayByInputText;
    datasource(items?: ComboBoxItem[], triggerChange?: boolean): ComboBoxItem[];
    items(items?: ComboBoxItem[], triggerChange?: boolean): ComboBoxItem[];
    values(): any[];
    getCheckedItems(onlyChildren?: boolean): ComboBoxItem[];
    getCheckedValues(onlyChildren?: boolean): string[];
    getSelectedItem<T extends ComboBoxItem>(): T;
    addItem(item: ComboBoxItem, reloadCombo?: boolean, triggerChange?: boolean, sortBy?: SortByComboSettings): void;
    addItems(items: ComboBoxItem[], reloadCombo?: boolean, triggerChange?: boolean): void;
    removeItem(itemOrId: ComboBoxItem | string | number, reloadCombo?: boolean): void;
    removeItems(items: ComboBoxItem[] | string[] | number[], reloadCombo?: boolean): void;
    getItemByValue(value: string): ComboBoxItem;
    getItemByText(text: string): ComboBoxItem;
    getElementsByValue(value: string): HTMLElement[] | undefined;
    getRootItems(): ComboBoxItem[];
    getRootValues(): string[];
    private getRootTexts;
    getLeafItems(): ComboBoxItem[];
    getLeafValues(): string[];
    private getLeafTexts;
    getChildrenItems(): ComboBoxItem[];
    getChildrenValues(): string[];
    private getChildrenTexts;
    private getOnlyChildrenItems;
    private getAllChildrenItems;
    private getAllChildrenValues;
    private getDataChildrenItems;
    private getChildrenCheckboxElements;
    private getParentItem;
    private manageCheckParent;
    text(text?: string): string;
    placeholder(text?: string): string;
    private valueInternal;
    value<T extends string | string[] | number>(value?: ComboBoxItem | string | number | string[] | number[] | null, triggerChange?: boolean, callback?: null | ((e: ComboBoxChangeEvent) => void)): T | null;
    private manageCallbackAfterValue;
    private writeTextByValue;
    select(index?: number, triggerChange?: boolean): void;
    index(index?: number, triggerChange?: boolean): void;
    icon(icon?: IconClass | string | null): HTMLElement | null;
    isEmpty(): boolean;
    error(): void;
    hideError(): void;
    checkAll(triggerChange?: boolean): void;
    unCheckAll(triggerChange?: boolean): void;
    check(value: string, triggerChange?: boolean): void;
    unCheck(value: string, triggerChange?: boolean): void;
    allChecked(): boolean;
    clear(triggerChange?: boolean): void;
    clearItems(): void;
    popup(): any;
    focus(open?: boolean): void;
    private getOptions;
    private doAjaxCall;
    showClearButton(): void;
    hideClearButton(): void;
    button(): Button;
    buttonVisible(state?: boolean): boolean;
    showButton(): void;
    hideButton(): void;
    buttonEnabled(state?: boolean): boolean;
    enableButton(): void;
    disableButton(): void;
    enable(): void;
    disable(): void;
    change(callBack?: Function): void;
}
export declare class DropDown extends ComboBox {
}
declare class ComboBoxNullableItem {
    text?: string;
    value?: string;
}
declare class CheckAllSettings {
    triggerChange?: boolean;
}
declare class ComboBoxKeyDownEvent extends VrControlsEvent {
    sender: ComboBox;
    event: any;
}
declare class ComboBoxKeyUpEvent extends VrControlsEvent {
    sender: ComboBox;
    event: any;
}
declare class ComboBoxPasteEvent extends VrControlsEvent {
    sender: ComboBox;
    event: any;
    pastedValue: string;
    value: string;
}
declare class ComboBoxEnterKeyEvent extends VrControlsEvent {
    sender: ComboBox;
    value: any;
}
declare class ComboBoxCloseEvent extends VrControlsEvent {
    sender: ComboBox;
    beforeValue: any;
    afterValue: any;
}
declare class ComboBoxOpenEvent extends VrControlsEvent {
    sender: ComboBox;
    value: any;
}
declare class ComboBoxItemDataBoundEvent extends VrControlsEvent {
    sender: ComboBox;
    element: HTMLElement;
    dataItem: any;
}
declare class ComboBoxBlurEvent extends VrControlsEvent {
    sender: ComboBox;
    value: any;
}
export {};
