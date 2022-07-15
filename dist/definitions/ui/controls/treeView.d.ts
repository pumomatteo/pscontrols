import { VrControl, VrControlOptions, VrControlsEvent } from "../common";
import { IconClass, TreeModeEnum, TreeViewAlignEnum, TreeViewColumn, TreeViewContextMenuItem, TreeViewFilterSettings, TreeViewItem, TreeViewNumericTypeEnum, TreeViewToolbarItem } from "../vr";
export declare class TreeViewOptions extends VrControlOptions {
    checkboxes?: boolean;
    treeMode?: TreeModeEnum;
    datasource?: any[];
    rebind?: TreeViewRebindRequest;
    dataSourceFieldId?: string;
    filter?: boolean | TreeViewFilterSettings;
    showLink?: boolean;
    title?: string;
    rightClickForContextMenu?: boolean;
    leftClickForContextMenu?: boolean;
    parentClickable?: boolean;
    contextMenuItems?: TreeViewContextMenuItem[];
    showEditButton?: boolean;
    draggable?: boolean;
    selectable?: boolean;
    alternateColor?: boolean;
    spaceBetweenGroups?: boolean;
    rowHeight?: number;
    rowLine?: number;
    export?: boolean | TreeViewExportSettings;
    columns?: TreeViewColumn[];
    toolbar?: TreeViewToolbarItem[];
    template?: (e: TreeViewTemplateEvent) => void | string;
    onBeforeSelect?(e: TreeViewChangingEvent): void;
    onAfterSelect?(e: TreeViewChangeEvent): void;
    onDoubleClick?(e: TreeViewDoubleClickEvent): void;
    onEdit?(e: TreeViewEditEvent): void;
    onDragStart?(e: TreeViewDragStartEvent): void;
    onDragMove?(e: TreeViewDragMoveEvent): void;
    onDragEnd?(e: TreeViewDragEndEvent): void;
}
export declare class TreeView extends VrControl {
    private _items;
    private _dictionaryValueLi;
    private _dictionaryLiValue;
    private _checkedValues;
    private _isChecked;
    private _tempCheckedValue;
    private _value?;
    private _divContextMenu;
    private _dataItemContextMenu;
    private _actualDraggedItem;
    private _lblTitle;
    private _tempRebindInfo;
    private _divContent;
    private _divHeaderSpace;
    private _divTitle;
    private _divToolbar;
    private _timeoutClick;
    private _txtSearchFilter;
    constructor(element: HTMLElement, options?: TreeViewOptions | null);
    datasource(items?: any[]): any[];
    rebind(parameters?: any | null, loadingElement?: boolean | HTMLElement | JQuery | string): any;
    update(): void;
    private drawDataSource;
    private manageScrollbar;
    private drawItems;
    private getOnlyChildrenItems;
    getRootItems(): TreeViewItem[];
    getRootValues(): string[];
    private getAllChildrenItems;
    private getAllChildrenValues;
    private getDataChildrenItems;
    private getChildrenCheckboxElements;
    getCheckedItems(): TreeViewItem[];
    getCheckedValues(): string[];
    getSelectedItem<T extends TreeViewItem>(): T;
    private getParentItem;
    private manageCheckParent;
    private limitInputByDataSource;
    private getFilteredArrayByInputText;
    private filter;
    isParent(value: string): boolean;
    focus(): void;
    value<T extends string | string[] | number>(value?: TreeViewItem | string | number | string[] | number[] | null, triggerChange?: boolean): T | null;
    title(title?: string): string;
    clear(triggerChange?: boolean): void;
    clearItems(): void;
    excelExport(): void;
    column(field: string): TreeViewColumn;
    columnTitle(field: string, title?: string): string | undefined;
    showColumns(fields: string[], update?: boolean): void;
    showColumn(field: string, update?: boolean): void;
    hideColumns(fields: string[], update?: boolean): void;
    hideColumn(field: string, update?: boolean): void;
    showOnlyThisColumns(fieldList: string[], update?: boolean): void;
    private widthColumns;
    checkAll(triggerChange?: boolean): void;
    unCheckAll(triggerChange?: boolean): void;
    private createContextMenu;
    private clickOnContextMenuItem;
    private showContextMenu;
    private closeContextMenu;
    updateRow(dataItem: any, rebind?: boolean): void;
    updateRows(dataItems: any[], rebind?: boolean): void;
    addItem(item: TreeViewItem, rebind?: boolean): void;
    updateItem(item: TreeViewItem, rebind?: boolean): void;
    private manageAddUpdateItem;
    deleteItem(value: number | string): void;
    visibleToolbar(state?: boolean): any;
    showToolbar(): void;
    hideToolbar(): void;
    toolbar(): HTMLElement;
    toolbarItem<T extends VrControl>(value: string): T;
    showToolbarItem<T extends VrControl>(value: string): void;
    hideToolbarItem<T extends VrControl>(value: string): void;
    enableToolbarItem<T extends VrControl>(value: string): void;
    disableToolbarItem<T extends VrControl>(value: string): void;
    removeToolbarItem(value: string): void;
    addToolbarItem(toolbarItem: TreeViewToolbarItem): void;
    private toolbarCustomLogic;
    private doWebApiCall;
    change(callBack?: Function): void;
    getOptions(): TreeViewOptions;
}
declare class TreeViewTemplateEvent {
    sender: TreeView;
    dataItem: any;
    container: HTMLElement;
}
declare class TreeViewEvent extends VrControlsEvent {
    sender: TreeView;
    value: any;
    childrenValues: string[];
    selectedItem?: TreeViewItem;
    checked: boolean;
    isParent?: boolean;
}
declare class TreeViewChangeEvent extends TreeViewEvent {
}
declare class TreeViewChangingEvent extends TreeViewEvent {
    previousValue?: string | null;
    previousCheckedValues?: string[] | null;
}
export declare class TreeViewContextMenuClickEvent extends VrControlsEvent {
    sender: TreeView;
    text?: string;
    value?: string;
    dataItem: any;
    targets?: HTMLElement[];
}
declare class TreeViewDoubleClickEvent extends VrControlsEvent {
    sender: TreeView;
    text?: string;
    value?: string;
    dataItem: any;
}
declare class TreeViewEditEvent extends VrControlsEvent {
    sender: TreeView;
    text?: string;
    value?: string;
    dataItem: any;
}
declare class TreeViewDragEvent extends VrControlsEvent {
    sender: TreeView;
    target: HTMLElement;
    source: TreeViewItem;
    destination?: TreeViewItem;
}
declare class TreeViewDragStartEvent extends TreeViewDragEvent {
}
declare class TreeViewDragMoveEvent extends TreeViewDragEvent {
}
declare class TreeViewDragEndEvent extends TreeViewDragEvent {
}
declare class TreeViewExportSettings {
    fileName?: string;
    sheetName?: string;
    numericValueTypeEnum?: TreeViewNumericTypeEnum;
    decimalDigits?: number;
}
export declare class TreeViewHeaderAndCellSettings {
    textAlign?: TreeViewAlignEnum;
    backgroundColor?: string;
    color?: string;
    css?: string;
}
export declare class TreeViewHeaderSettings extends TreeViewHeaderAndCellSettings {
    icon?: IconClass;
}
export declare class TreeViewCellSettings extends TreeViewHeaderAndCellSettings {
    zeroIfNull?: boolean;
}
declare class TreeViewWebApiRequest {
    authKey?: string;
    method?: string;
    successNotificationMessage?: boolean | string;
    errorNotificationMessage?: boolean | string;
    rebindGridAfterSave?: boolean;
    rebindGridAfterError?: boolean;
    closeWindowAfterError?: boolean;
    otherParameters?: any;
    loadingElement?: boolean | HTMLElement | JQuery | string;
    callback?: (response?: any) => void;
    callbackBeforeDatasourceChange?: (response?: any) => void;
    errorCallback?: (message?: string) => void;
    parameters?: () => any;
}
declare class TreeViewRebindRequest extends TreeViewWebApiRequest {
    itemsPropertyName?: string;
    rebindAtStartup?: boolean;
}
export {};
