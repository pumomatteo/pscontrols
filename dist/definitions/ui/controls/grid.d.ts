import { IconClass, GridHeightModeEnum, GridCheckboxModeEnum, GridModeEnum, GridColumnTypeEnum, GridAlignEnum, GridAggregateMode, GridLabelUnderlineMode, GridToolbarItemType, GridDateFilterTypeEnum, GridNumberFilterTypeEnum, GridColumn, GridToolbarItem, GridSortDirectionEnum, GridGroupBySettings, GridSortSettings, GridGroupByItem, GridGroupExpandCollapseEvent, GridGroupEditClickEvent, NumberFormatRoundingSettings, GridPageSelectedEvent, GridScrollEvent, GridStringFilterTypeEnum, GridServerBindSettings, GridStickerSettings, GridBeforeExcelExportEvent, GridAfterExcelExportEvent, GridBeforeGroupCheckEvent, GridAfterGroupCheckEvent, GridCartSettings } from "../vr";
import { VrControl, VrControlOptions, VrControlsEvent } from "../common";
import { Window } from "./window";
import { Label } from "./label";
export declare class GridOptions extends VrControlOptions {
    columns?: GridColumn[];
    toolbar?: GridToolbarItem[];
    height?: string | number | GridHeightModeEnum;
    dataSource?: any[];
    rebind?: GridRebindRequest;
    excel?: GridExcelRequest;
    tooltip?: boolean;
    checkboxes?: boolean | GridCheckboxModeEnum;
    dataSourceFieldId?: string;
    rowHeight?: number;
    multilineRows?: boolean;
    multilineHeader?: boolean;
    hideEditButton?: boolean;
    autoWindowSettings?: GridAutoWindowSettings;
    mode?: GridModeEnum;
    filterable?: boolean;
    alternateRowColors?: boolean | string;
    hoverRowColor?: boolean;
    rowColorProperty?: string;
    rowTextColorProperty?: string;
    pageSize?: number | boolean | GridPageSettings;
    footer?: boolean | GridFooterSettings;
    header?: boolean;
    resizable?: boolean;
    reorderable?: boolean;
    lockable?: boolean;
    groupBy?: string[] | GridGroupBySettings | null;
    groupable?: boolean;
    sortable?: boolean;
    sortBy?: string | GridSortSettings | null;
    serverBinding?: boolean | GridServerBindSettings;
    roundingSettings?: NumberFormatRoundingSettings;
    sticker?: string | GridStickerSettings;
    fixDatasourceWithDate?: boolean;
    layoutSettings?: GridLayoutSettings | boolean;
    onDataSourceChanged?: () => void;
    onDataBound?: (e: GridOnDataBoundEvent) => void;
    onRowDataBound?: (e: GridOnRowDataBoundEvent) => void | string;
    onSelectRow?: (e: GridSelectRowEvent) => void;
    onSelectAllRows?: (e: GridSelectAllRowsEvent) => void;
    onGroupExpandCollapse?: (e: GridGroupExpandCollapseEvent) => void;
    onGroupEditClick?: (e: GridGroupEditClickEvent) => void;
    onPageSelected?: (e: GridPageSelectedEvent) => void;
    onScroll?: (e: GridScrollEvent) => void;
    onBeforeExcelExport?: (e: GridBeforeExcelExportEvent) => void;
    onAfterExcelExport?: (e: GridAfterExcelExportEvent) => void;
    onBeforeGroupCheck?: (e: GridBeforeGroupCheckEvent) => void;
    onAfterGroupCheck?: (e: GridAfterGroupCheckEvent) => void;
}
export declare class Grid extends VrControl {
    private _fitSpaceColumnPercentage;
    private _showTotals;
    private _isResizing;
    private _isDragging;
    private _actualSortingInfo;
    private _columnOptions;
    private _actualPageSize;
    private _actualPageSelected;
    private _internalOptions;
    private _tempRebindInfo;
    private _pageSizeUnlimited;
    private _rowCheckedIdList;
    private _timeoutFilterText;
    private _firstDraw;
    private _dataSource;
    private _originalDataSource;
    private _deletedItems;
    private _actualEditedItem;
    private _lastIndexAdded;
    private _responseForServerBinding;
    private _serverBindingPagination;
    private _wndFiltering;
    private _dictionaryDataValues;
    private _dictionaryFilterConditions;
    private _wndCart;
    private _grdCart;
    private _wndActions;
    private _groupByActualValue;
    private _originalHiddenColumnFields;
    private _wndAutoWindow;
    private _wndLayout;
    private _grdLayout;
    private _actualLayout;
    private _originalOptionsForLayout;
    private _customLayouts;
    private _cellButtons;
    private _cellIcons;
    private _cellCustoms;
    private _cellLabels;
    private _cellImages;
    private _elementId;
    private _elementLocked;
    private _lblSticker;
    private _divToolbar;
    private _divHeaderContainer;
    private _divHeader;
    private _divHeaderLocked;
    private _divFilters;
    private _divFiltersLocked;
    private _divBody;
    private _divBodyLocked;
    private _divTotals;
    private _divTotalsLocked;
    private _divFooter;
    private _spanFitHeaderSpace;
    private _spanFitFilterSpace;
    private _spanFitTotalsSpace;
    private _vrDateTimeFields;
    constructor(element: HTMLElement, options?: GridOptions | null);
    rebind(parameters?: any | null, filterWithWebService?: boolean, keepInfo?: boolean, loadingElement?: boolean | HTMLElement | JQuery | string): any;
    rebindSpecificRows(itemIdList: number[], update?: boolean, keepInfo?: boolean, loadingElement?: boolean | HTMLElement | JQuery | string): void;
    clear(triggerChange?: boolean, clearFilters?: boolean): void;
    private manageDataSourceControls;
    private manageControls;
    originalDataSource(): any[];
    dataSource(dataItems?: any[], clearFilters?: boolean, keepInfo?: boolean): any[];
    update(triggerDataBound?: boolean, keepInfo?: boolean): void;
    private setDataSource;
    private drawTable;
    private createTotals;
    private writeTotals;
    private formatValue;
    updateRow(dataItem: any, rebind?: boolean): void;
    updateRows(dataItems: any[], rebind?: boolean): void;
    addRow(dataItem: any, rebind?: boolean): void;
    addRows(dataItems: any[], rebind?: boolean): void;
    deleteRow(dataItemId: number | string, rebind?: boolean): void;
    deleteRows(dataItemIdList: (number | string)[], rebind?: boolean): void;
    rows(): GridRow[];
    getAllItems(toSavePurpose?: boolean): any[];
    getCheckedItems(): any[];
    getCheckedValues(): string[];
    getCheckedNumberValues(): number[];
    getDeletedItems(): any[];
    getDeletedItemValues(key?: string): any[];
    clearSelection(triggerChange?: boolean): void;
    checkAllRows(triggerChange?: boolean): void;
    unCheckAllRows(triggerChange?: boolean): void;
    selectRowsByIndexes(indexes: number[], triggerChange?: boolean): void;
    selectRowByIndex(index: number, triggerChange?: boolean): void;
    selectRows(itemIdList: string[], property?: string, triggerChange?: boolean): void;
    selectRow(itemId: string, triggerChange?: boolean): void;
    private selectRangeShiftKey;
    private selectRowInternal;
    private manageGroupCheckParent;
    unselectRows(itemIdList: string[], property?: string, triggerChange?: boolean): void;
    unselectRow(itemId: string, triggerChange?: boolean): void;
    private updateCart;
    private openWindowCart;
    private createWindowCart;
    private applySorting;
    removeSort(updateDataSource?: boolean): void;
    sort(field: string, gridSortModeEnum?: GridSortDirectionEnum, rebind?: boolean): void;
    private sortInternal;
    private sortingGroupFields;
    column(field: string): GridColumn;
    columnTitle(field: string, title?: string): string | undefined;
    hideColumns(fields: string[], update?: boolean): void;
    hideColumn(field: string, updateDataSource?: boolean): void;
    hideCheckboxColumn(updateDataSource?: boolean): void;
    hideEditButtonColumn(updateDataSource?: boolean): void;
    hideOnlyThisColumns(fieldList: string[], updateDataSource?: boolean): void;
    showColumns(fields: string[], update?: boolean): void;
    showColumn(field: string, updateDataSource?: boolean): void;
    showCheckboxColumn(updateDataSource?: boolean): void;
    showEditButtonColumn(updateDataSource?: boolean): void;
    showOnlyThisColumns(fieldList: string[], updateDataSource?: boolean): void;
    columnVisible(value: string, state: boolean, updateDataSource?: boolean): void;
    columnCheckboxVisible(state: boolean, updateDataSource?: boolean): void;
    lockColumns(fields: string[], update?: boolean): void;
    lockColumn(field: string, update?: boolean): void;
    unlockColumns(fields: string[], update?: boolean): void;
    unlockColumn(field: string, update?: boolean): void;
    lockedColumns(): GridColumn[];
    thereAreLockedColumns(): boolean | undefined;
    hasGroup(): boolean;
    removeGroup(field: string, updateDataSource?: boolean): void;
    removeGroups(fields: string[], updateDataSource?: boolean): void;
    removeAllGroups(updateDataSource?: boolean): void;
    addGroup(field: string | GridGroupByItem, updateDataSource?: boolean, sortBy?: GridSortSettings, internalSortBy?: GridSortSettings): void;
    addGroups(fields: (string | GridGroupByItem)[], updateDataSource?: boolean, sortBy?: GridSortSettings, internalSortBy?: GridSortSettings): void;
    private getChildrenGroupRows;
    private getCheckedChildrenGroupRows;
    private createWindowActions;
    private openWindowActions;
    private clearWindowActions;
    private manageFilterTextByColumn;
    clearFilters(updateDataSource?: boolean, rebind?: boolean): void;
    private getFilteredArrayByInputText;
    private createWindowFiltering;
    private openWindowFiltering;
    private saveWindowFiltering;
    private clearWindowFiltering;
    addFilter(field: string, filterCondition: GridFilterSettings, applyFilters?: boolean): void;
    removeFilters(fields: string[], applyFilters?: boolean): void;
    removeFilter(field: string, applyFilters?: boolean): void;
    updateFilter(field: string, filterCondition: GridFilterSettings, applyFilters?: boolean): void;
    private applyFilters;
    private resizable;
    private setResizingEvents;
    private updateColumnPositions;
    private draggableColumns;
    drag(element: HTMLElement | JQuery | string, dragEvent?: DragSupportEvent): void;
    sticker(text?: string): Label;
    stickerVisible(state?: boolean): boolean;
    showSticker(): void;
    hideSticker(): void;
    getTotals(dataItems: any[]): TotalsResult[];
    fixDatasourceWithVrDatetime(items: any[]): any[];
    fixDatasourceWithDate(items: any[]): void;
    pageSize(pageSize?: number | boolean, update?: boolean, triggerDataBound?: boolean): number;
    pageSelected(page?: number, update?: boolean): number;
    checkboxesMode(mode?: GridCheckboxModeEnum): boolean | GridCheckboxModeEnum | undefined;
    focus(field?: string): void;
    scrollTo(rowIndex: number): void;
    private isRepeater;
    private fixValueWithoutSpecialChars;
    getOptions(): GridOptions;
    private recalculateHeightWidth;
    recalculateWidth(): void;
    private recalculateFitSpacePercentage;
    height(height?: number | string): any;
    recalculateHeight(afterFilter?: boolean): void;
    private adjustTrHeight;
    private doWebApiCall;
    enable(state?: boolean | string): void;
    private toolbarCustomLogic;
    excelExport(fileName?: string, exportHiddenColumns?: boolean, download?: boolean): Promise<ExcelExportPromise>;
    visibleFooter(state?: boolean): any;
    showFooter(): void;
    hideFooter(): void;
    footer(): HTMLElement;
    visibleToolbar(state?: boolean): any;
    showToolbar(): void;
    hideToolbar(): void;
    toolbar(): HTMLElement;
    toolbarItem<T extends VrControl>(value: string): T;
    visibleToolbarItem(value: string, state?: boolean): boolean;
    showToolbarItem<T extends VrControl>(value: string): void;
    hideToolbarItem<T extends VrControl>(value: string): void;
    enabledToolbarItem(value: string, state?: boolean): boolean;
    enableToolbarItem<T extends VrControl>(value: string): void;
    disableToolbarItem<T extends VrControl>(value: string): void;
    removeToolbarItem(value: string): void;
    addToolbarItems(toolbarItems: GridToolbarItem[]): void;
    addToolbarItem(toolbarItem: GridToolbarItem): void;
    private createAutoWindow;
    private createControlsAutoWindow;
    openAutoWindow(dataItem?: any): void;
    private saveAutoWindow;
    private createWindowLayout;
    private openWindowLayout;
    private doWebApiCallLayout;
    saveLayout(layoutName: string, callBack?: Function): void;
    private clearLayout;
    customLayouts(): GridLayout[];
    activeLayout(): GridLayout | null;
    private loadLayout;
    private changeLayout;
}
declare class GridWebApiRequest {
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
export declare class GridHeaderAndCellSettings {
    textAlign?: GridAlignEnum;
    backgroundColor?: string;
    color?: string;
    tooltip?: boolean | string | ((e: GridTooltipEvent) => string);
    css?: string;
}
export declare class GridHeaderSettings extends GridHeaderAndCellSettings {
    icon?: IconClass;
}
export declare class GridCellSettings extends GridHeaderAndCellSettings {
    zeroIfNull?: boolean;
}
export declare class GridControlsSettings {
    onClick?: (e: GridControlsClickEvent) => void;
    confirmationMessage?: string;
    value?: string;
    css?: string;
    class?: string;
    visible?: boolean;
    enabled?: boolean;
    tooltip?: string;
}
export declare class GridCustomSettings extends GridControlsSettings {
    template: string;
    filterFields?: string[];
}
export declare class GridIconSettings extends GridControlsSettings {
    icon?: IconClass;
    imageUrl?: string;
    color?: string;
}
export declare class GridImageSettings extends GridControlsSettings {
    imageUrl?: string;
    base64Bytes?: string;
}
export declare class GridLabelSettings extends GridControlsSettings {
    text?: string;
    underlineMode?: GridLabelUnderlineMode;
    bold?: boolean;
    color?: string;
    noBr?: boolean | number;
    icon?: IconClass;
}
export declare class GridRebindRequest extends GridWebApiRequest {
    itemsPropertyName?: string;
    rebindAtStartup?: boolean;
    clearFilters?: boolean;
    specificItemIdListPropertyName?: string;
}
export declare class GridExcelRequest extends GridWebApiRequest {
    fileName?: string;
}
declare class GridControlsClickEvent {
    dataItem: any;
}
export declare class GridTemplateEvent {
    dataItem: any;
    className?: string;
    element?: HTMLTableCellElement;
    empty?: boolean;
    field: string;
    sender: Grid;
}
export declare class GridTooltipEvent {
    dataItem: any;
    element?: HTMLTableCellElement;
    empty: boolean;
}
export declare class GridOnDataBoundEvent {
    sender: Grid;
}
export declare class GridOnRowDataBoundEvent {
    sender: Grid;
    rowElement: HTMLTableRowElement;
    dataItem: any;
    realDataItem: any;
    empty?: boolean;
}
export declare class GridSelectRowEvent {
    sender: Grid;
    rowElement: HTMLTableRowElement;
    dataItem: any;
    checked: boolean;
    empty: boolean;
    index: number;
    shiftKey: boolean;
    fromCheckbox: boolean;
}
export declare class GridSelectAllRowsEvent {
    sender: Grid;
    checked: boolean;
}
export declare class GridUnselectRowEvent {
    sender: Grid;
    rowElement: HTMLTableRowElement;
    dataItem: any;
}
export declare class GridUnselectAllRowsEvent {
    sender: Grid;
}
export declare class GridToolbarClickEvent {
    sender: any;
    type: GridToolbarItemType;
    isDefaultPrevented: boolean;
    deletedItems?: any[];
    preventDefault(): void;
}
export declare class GridToolbarSwitchSettings {
    labelOff?: string;
    labelOn?: string;
    checked?: boolean;
    onCheck?: (e: GridToolbarSwitchEvent) => void;
}
declare class GridToolbarSwitchEvent {
    checked: boolean;
}
export declare class GridToolbarDeleteRequest extends GridWebApiRequest {
    deletedValuesPropertyName?: string;
    valuePropertyName?: string;
}
export declare class GridFooterSettings {
    maxVisiblePages?: number;
    totalElements?: boolean | ((e: GridTotalElementTemplateEvent) => string | number);
    showPagination?: boolean;
    showPageSize?: boolean;
    showSettings?: boolean;
    cartSettings?: GridCartSettings;
}
declare class GridTotalElementTemplateEvent {
    firstIndex?: number;
    lastIndex?: number;
    dataItems: any[];
    pageSelected: number;
    numberOfPages: number;
}
export declare class GridPageSettings {
    value?: number;
    otherValues: number[];
}
declare class TotalsResult {
    field: string;
    total: number;
    decimalDigits?: number;
    roundingSettings?: NumberFormatRoundingSettings;
    type: GridColumnTypeEnum;
    milesSeparator?: boolean;
}
export declare class GridExcelRow {
    cells: GridExcelCell[];
}
export declare class ExcelExportPromise {
    fileName: string;
    headerRow: GridExcelRow;
    contentRows: GridExcelRow[];
    footerRow: GridExcelRow;
    groupByFields: GridGroupByItem[];
}
declare class GridExcelCell {
    title: string | undefined;
    field: string;
    text?: string;
    bold?: boolean;
    type?: GridColumnTypeEnum;
    width?: number;
    cellSettings?: GridHeaderAndCellSettings;
    aggregate?: GridAggregateMode;
    decimalDigits?: number;
    hidden?: boolean;
    locked?: boolean;
    backgroundColor: string;
    color: string;
    roundingSettings?: NumberFormatRoundingSettings;
}
declare class GridAutoWindowSettings {
    save?: GridSaveRequest;
    options?: GridAutoWindowOption;
    onBeforeOpen?: (e: AutowindowBeforeOpenEvent) => void;
    onAfterOpen?: (e: AutowindowAfterOpenEvent) => void;
    onBeforeSave?: (e: AutowindowBeforeSaveEvent) => void;
    onAfterSave?: (e: AutowindowAfterSaveEvent) => void;
    onBeforeClose?: (e: AutowindowBeforeCloseEvent) => void;
    onAfterClose?: (e: AutowindowAfterCloseEvent) => void;
}
declare class GridAutoWindowOption {
    titleNew?: string;
    titleEdit?: string;
    height?: number | string;
    width?: number | string;
    showSaveButton?: boolean;
    showCancelButton?: boolean;
    textSaveButton?: string;
    textCancelButton?: string;
    confirmationMessage?: string;
}
declare class GridSaveRequest extends GridWebApiRequest {
    itemPropertyName?: string;
}
declare class AutoWindowEvent extends VrControlsEvent {
    sender: Grid;
    window: Window;
    dataItem: any;
    columns?: GridColumn[];
}
declare class AutowindowBeforeOpenEvent extends AutoWindowEvent {
}
declare class AutowindowAfterOpenEvent extends AutoWindowEvent {
}
declare class AutowindowBeforeSaveEvent extends AutoWindowEvent {
}
declare class AutowindowAfterSaveEvent extends AutoWindowEvent {
}
declare class AutowindowBeforeCloseEvent extends AutoWindowEvent {
}
declare class AutowindowAfterCloseEvent extends AutoWindowEvent {
}
export declare class GridFilterSettings {
    type: GridColumnTypeEnum;
    dateFilterSettings?: GridDateFilterSettings | null;
    numberFilterSettings?: GridNumberFilterSettings | null;
    checkboxFilterSettings?: GridCheckboxFilterSettings | null;
    stringFilterSettings?: GridStringFilterSettings | null;
}
declare class GridDateFilterSettings {
    filterTypeEnum: GridDateFilterTypeEnum;
    dateFrom: Date;
    dateTo?: Date | null;
    specificValues: any[];
}
declare class GridNumberFilterSettings {
    filterTypeEnum: GridNumberFilterTypeEnum;
    numberFrom: number;
    numberTo?: number | null;
    specificValues: any[];
}
declare class GridCheckboxFilterSettings {
    value: boolean;
}
declare class GridStringFilterSettings {
    text: string;
    filterTypeEnum: GridStringFilterTypeEnum;
    specificValues: any[];
}
declare class DragSupportEvent {
    onDragged?: null | ((e: DragEveryEvent) => void);
    onDragging?: null | ((e: DragEveryEvent) => void);
}
declare class DragEveryEvent {
    left: number;
    top: number;
    element: HTMLElement;
}
declare class GridLayoutSettings {
    name?: string;
    get?: GetLayoutListRequest;
    save?: SaveLayoutRequest;
    load?: LoadLayoutRequest;
}
declare class SaveLayoutRequest {
    method: string;
    authKey?: string;
    layoutJson?: string;
    pageName?: string;
    gridName?: string;
    layoutName?: string;
    layoutPropertyName?: string;
}
declare class LoadLayoutRequest {
    method: string;
    authKey?: string;
    pageName?: string;
    gridName?: string;
    layoutName?: string;
    layoutPropertyName?: string;
}
declare class GetLayoutListRequest {
    method: string;
    authKey?: string;
    pageName?: string;
    gridName?: string;
    layoutsPropertyName?: string;
}
declare class GridLayout {
    layoutName: string;
    layoutLastEditDate: Date;
    id: number;
    layoutJson: string;
}
export declare class GridRow {
    element: HTMLElement;
    cells: HTMLElement[];
    index: number;
    dataItemId: string;
    id: string;
    findControl<T extends VrControl>(uniqueName: string): T | null;
}
export {};
