import { VrControlOptions, VrControl } from "../common";
import { GridToolbarItem, GridHeightModeEnum, GridCheckboxModeEnum, GridModeEnum, GridSortDirectionEnum, GridGroupBySettings, GridGroupByItem, GridSortSettings } from "../vr";
import { GridRebindRequest, GridFooterSettings, GridOnDataBoundEvent, GridOnRowDataBoundEvent, GridSelectRowEvent, GridSelectAllRowsEvent, GridUnselectRowEvent, GridUnselectAllRowsEvent, GridTemplateEvent, GridFilterSettings, GridRow } from "./grid";
import { Button } from "./button";
import { SplitButton } from "./splitButton";
import { Switch } from "./switch";
export declare class RepeaterOptions extends VrControlOptions {
    toolbar?: GridToolbarItem[];
    height?: string | number | GridHeightModeEnum;
    dataSource?: any[];
    rebind?: GridRebindRequest;
    checkboxes?: boolean | GridCheckboxModeEnum;
    dataSourceFieldId?: string;
    rowHeight?: number;
    hideEditButton?: boolean;
    mode?: GridModeEnum;
    filterable?: boolean;
    pageSize?: number | boolean;
    largePageSize?: boolean;
    footer?: boolean | GridFooterSettings;
    padding?: number | PaddingSettings;
    alternateRowColors?: boolean | string;
    hoverRowColor?: boolean;
    customFilterProperties?: string[];
    emptyMessage?: string;
    groupBy?: string[] | GridGroupBySettings | null;
    title?: string | boolean;
    groupable?: boolean;
    template?: (templateEvent: GridTemplateEvent) => string;
    onDataSourceChanged?: () => void;
    onDataBound?: (e: GridOnDataBoundEvent) => void;
    onRowDataBound?: (e: RepeaterOnRowDataBoundEvent) => void | string;
    onSelectRow?: (e: GridSelectRowEvent) => void;
    onSelectAllRows?: (e: GridSelectAllRowsEvent) => void;
    onUnselectRow?: (e: GridUnselectRowEvent) => void;
    onUnselectAllRows?: (e: GridUnselectAllRowsEvent) => void;
}
export declare class Repeater extends VrControl {
    private _grid;
    constructor(element: HTMLElement, options?: RepeaterOptions | null);
    rebind(parameters?: any | null, keepInfo?: boolean): void;
    rebindSpecificRows(itemIdList: number[], update?: boolean): void;
    clear(): void;
    originalDataSource(): any[];
    dataSource(dataItems?: any[], clearFilters?: boolean): any[];
    update(triggerDataBound?: boolean, keepInfo?: boolean): void;
    updateRow(dataItem: any, rebind?: boolean): void;
    updateRows(dataItems: any[], rebind?: boolean): void;
    addRow(dataItem: any, rebind?: boolean): void;
    addRows(dataItems: any[], rebind?: boolean): void;
    deleteRow(dataItemId: any, rebind?: boolean): void;
    deleteRows(dataItemIdList: any[], rebind?: boolean): void;
    rows(): GridRow[];
    getAllItems(): any[];
    getCheckedItems(): any[];
    getCheckedValues(): any[];
    getDeletedItems(): any[];
    getDeletedItemValues(key?: string): any[];
    clearSelection(triggerChange?: boolean): void;
    checkAllRows(triggerChange?: boolean): void;
    unCheckAllRows(triggerChange?: boolean): void;
    selectRowsByIndexes(indexes: number[], triggerChange?: boolean): void;
    selectRowByIndex(index: number, triggerChange?: boolean): void;
    selectRows(itemIdList: string[], property?: string, triggerChange?: boolean): void;
    selectRow(itemId: string, triggerChange?: boolean): void;
    unselectRows(itemIdList: string[], property?: string, triggerChange?: boolean): void;
    unselectRow(itemId: string): void;
    removeGroup(field: string, updateDataSource?: boolean): void;
    removeGroups(fields: string[], updateDataSource?: boolean): void;
    removeAllGroups(updateDataSource?: boolean): void;
    addGroup(field: string | GridGroupByItem, updateDataSource?: boolean, sortBySettings?: GridSortSettings, internalSortBy?: GridSortSettings): void;
    addGroups(fields: (string | GridGroupByItem)[], updateDataSource?: boolean, sortBy?: GridSortSettings, internalSortBy?: GridSortSettings): void;
    removeSort(updateDataSource?: boolean): void;
    sort(field: string, tableSortModeEnum?: GridSortDirectionEnum): void;
    clearFilters(updateDataSource?: boolean): void;
    addFilter(field: string, filterCondition: GridFilterSettings, applyFilters?: boolean): void;
    removeFilter(field: string, applyFilters?: boolean): void;
    updateFilter(field: string, filterCondition: GridFilterSettings, applyFilters?: boolean): void;
    pageSelected(page?: number, update?: boolean): number;
    height(height?: number | string): any;
    recalculateHeight(afterFilter?: boolean): void;
    recalculateWidth(): void;
    visibleToolbar(state?: boolean): any;
    showToolbar(): void;
    hideToolbar(): void;
    toolbarItem<T extends Button | SplitButton | Switch>(value: string): T;
    showToolbarItem(value: string): void;
    hideToolbarItem(value: string): void;
    enableToolbarItem<T extends VrControl>(value: string): void;
    disableToolbarItem<T extends VrControl>(value: string): void;
    removeToolbarItem(value: string): void;
    addToolbarItem(toolbarItem: GridToolbarItem): void;
    hideCheckboxColumn(updateDataSource?: boolean): void;
    showCheckboxColumn(updateDataSource?: boolean): void;
    pageSize(pageSize?: number, update?: boolean, triggerDataBound?: boolean): number;
}
declare class PaddingSettings {
    left?: number;
    top?: number;
    right?: number;
    bottom?: number;
}
declare class RepeaterOnRowDataBoundEvent extends GridOnRowDataBoundEvent {
    cell: HTMLElement;
    index: number;
}
export {};
