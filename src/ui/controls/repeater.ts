import { VrControlOptions, VrControl } from "../common";
import { ControlTypeEnum, GridToolbarItem, GridHeightModeEnum, GridCheckboxModeEnum, GridModeEnum, createGrid, GridColumnTypeEnum, puma, GridAlignEnum, createLabel, TextAlignEnum, GridSortDirectionEnum, GridGroupBySettings, ControlPositionEnum, GridGroupByItem, GridSortSettings } from "../vr";
import { GridRebindRequest, GridFooterSettings, GridOnDataBoundEvent, GridOnRowDataBoundEvent, GridSelectRowEvent, GridSelectAllRowsEvent, GridUnselectRowEvent, GridUnselectAllRowsEvent, GridTemplateEvent, GridCustomSettings, Grid, GridFilterSettings, GridRow } from "./grid";
import { Button } from "./button";
import { SplitButton } from "./splitButton";
import { Switch } from "./switch";
import { UtilityManager } from "../../../src/managers/utilityManager";

//#region Options
export class RepeaterOptions extends VrControlOptions
{
    toolbar?: GridToolbarItem[];
    declare height?: string | number | GridHeightModeEnum;
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
    rowColorProperty?: string;
    rowTextColorProperty?: string;

    template?: (templateEvent: GridTemplateEvent) => string;
    onDataSourceChanged?: () => void;
    onDataBound?: (e: GridOnDataBoundEvent) => void;
    onRowDataBound?: (e: RepeaterOnRowDataBoundEvent) => void | string;
    onSelectRow?: (e: GridSelectRowEvent) => void;
    onSelectAllRows?: (e: GridSelectAllRowsEvent) => void;
    onUnselectRow?: (e: GridUnselectRowEvent) => void;
    onUnselectAllRows?: (e: GridUnselectAllRowsEvent) => void;
}
//#endregion

//#region Control
export class Repeater extends VrControl
{
    private _grid: Grid;

    constructor(element: HTMLElement, options?: RepeaterOptions | null)
    {
        //#region Options
        if (options == null)
            options = new RepeaterOptions();

        options.hideEditButton = true;
        if (options.pageSize == null) options.pageSize = false;
        if (options.alternateRowColors == null) options.alternateRowColors = true;

        if (options.footer == null || options.footer === true) options.footer = new GridFooterSettings();
        if (options.footer !== false)
        {
            if (options.footer.showPagination == null) options.footer.showPagination = true;
            if (options.footer.showSettings == null) options.footer.showSettings = false;
            if (options.pageSize === false) options.pageSize = 50;
        }

        if (options.padding == null) options.padding = 10;
        if (typeof (options.padding) != "number")
        {
            if (options.padding.left == null) options.padding.left = 10;
            if (options.padding.top == null) options.padding.top = 10;
            if (options.padding.right == null) options.padding.right = 10;
            if (options.padding.bottom == null) options.padding.bottom = 10;
        }

        if (options.emptyMessage == null) options.emptyMessage = "Nessun risultato";
        if (options.title == null) options.title = false;
        if (options.title === true) options.title = "";
        //#endregion

        let internalHeight = UtilityManager.duplicate(options.height);
        options.height = undefined;

        let datasource = options.dataSource;
        options.dataSource = undefined;

        super(element, options, ControlTypeEnum.Repeater);

        this.container().id = this.container().id + "_Repeater";

        //#region Repeater
        this._grid = createGrid(
            {
                addToControlList: options.addToControlList,
                toolbar: options.toolbar,
                classContainer: "vrRepeaterContainer",
                columns: [
                    {
                        field: "custom" + this.element().id, type: GridColumnTypeEnum.Custom, cellSettings: { textAlign: GridAlignEnum.Left },
                        filterable: true, customFilterProperties: options.customFilterProperties, fitSpace: true, title: (options.title !== false) ? options.title : "",
                        customSettings: (e) =>
                        {
                            //#region Padding
                            if (typeof (options!.padding) == "number")
                                e.element!.style.cssText += "padding: " + options!.padding + "px;";
                            else
                                e.element!.style.cssText += "padding-left: " + options!.padding!.left + "px; padding-top: " + options!.padding!.top + "px; padding-right: " + options!.padding!.right + "px; padding-bottom: " + options!.padding!.bottom + "px;";
                            //#endregion

                            if (options!.template != null)
                                return { template: options!.template(e) };
                            else
                                return undefined;
                        }
                    }
                ],
                height: internalHeight,
                rebind: options.rebind,
                checkboxes: options.checkboxes,
                dataSourceFieldId: options.dataSourceFieldId,
                rowHeight: options.rowHeight,
                hideEditButton: options.hideEditButton,
                mode: options.mode,
                filterable: options.filterable,
                pageSize: options.pageSize,
                largePageSize: options.largePageSize,
                footer: options.footer,
                header: options.title !== false,
                alternateRowColors: options.alternateRowColors,
                hoverRowColor: options.hoverRowColor,
                multilineRows: true,
                resizable: false,
                reorderable: false,
                groupable: true,
                rowColorProperty: options.rowColorProperty,
                rowTextColorProperty: options.rowTextColorProperty,
                groupBy: options.groupBy,
                layoutSettings: false,
                tooltip: false,
                onDataSourceChanged: options.onDataSourceChanged,
                onDataBound: options.onDataBound,
                onRowDataBound: (e) =>
                {
                    //#region Empty
                    puma(this.element()).find(".toRemove").parent().remove();
                    if (e.empty)
                    {
                        puma(e.rowElement).empty();
                        createLabel(
                            {
                                text: options!.emptyMessage,
                                fontSize: 14,
                                width: "100%",
                                align: TextAlignEnum.Center,
                                class: "toRemove"
                            }, puma(this.element()).find(".grid_Body"), ControlPositionEnum.Before);
                        return;
                    }
                    //#endregion

                    if (options!.onRowDataBound != null)
                    {
                        let event = new RepeaterOnRowDataBoundEvent();
                        event.dataItem = e.dataItem;
                        event.realDataItem = e.realDataItem;
                        event.empty = e.empty;
                        event.rowElement = e.rowElement;
                        event.sender = e.sender;
                        event.cell = puma(e.rowElement).find("td[field='custom" + this.element().id + "']")[0];
                        event.index = Number(e.rowElement.getAttribute("row"));
                        options!.onRowDataBound(event);
                    }
                },
                onSelectRow: (e) =>
                {
                    if (options!.onSelectRow != null && !e.empty)
                        options!.onSelectRow(e);
                },
                onSelectAllRows: options.onSelectAllRows,
                onUnselectRow: options.onUnselectRow,
                onUnselectAllRows: options.onUnselectAllRows
            }, this.element());
        //#endregion

        if (datasource != null)
            this._grid.dataSource(datasource);
    }

    //#region Methods
    rebind(parameters?: any | null, keepInfo = true): any
    {
        let promise = new Promise<void>((callback: Function) =>
        {
            this._grid.rebind(parameters, false, keepInfo).then(() =>
            {
                if (callback != null)
                    callback();
            });
        });
        return promise;
    }

    rebindSpecificRows(itemIdList: number[], update = true)
    {
        this._grid.rebindSpecificRows(itemIdList, update);
    }

    clear()
    {
        this._grid.clear();
    }

    //#region Items
    originalDataSource()
    {
        return this._grid.originalDataSource();
    }

    dataSource(dataItems?: any[], clearFilters = false)
    {
        return this._grid.dataSource(dataItems, clearFilters);
    }

    update(triggerDataBound = true, keepInfo = true)
    {
        this._grid.update(triggerDataBound, keepInfo);
    }

    updateRow(dataItem: any, rebind = true)
    {
        this._grid.updateRow(dataItem, rebind);
    }

    updateRows(dataItems: any[], rebind = true)
    {
        this._grid.updateRows(dataItems, rebind);
    }

    addRow(dataItem: any, rebind = true)
    {
        this._grid.addRow(dataItem, rebind);
    }

    addRows(dataItems: any[], rebind = true)
    {
        this._grid.addRows(dataItems, rebind);
    }

    deleteRow(dataItemId: any, rebind = false)
    {
        this._grid.deleteRow(dataItemId, rebind);
    }

    deleteRows(dataItemIdList: any[], rebind = false)
    {
        this._grid.deleteRows(dataItemIdList, rebind);
    }

    rows(): GridRow[]
    {
        return this._grid.rows();
    }

    getAllItems()
    {
        return this._grid.getAllItems();
    }

    getCheckedItems()
    {
        return this._grid.getCheckedItems();
    }

    getCheckedValues()
    {
        return this._grid.getCheckedValues();
    }

    getDeletedItems()
    {
        return this._grid.getDeletedItems();
    }

    getDeletedItemValues(key?: string)
    {
        return this._grid.getDeletedItemValues(key);
    }
    //#endregion

    //#region Selection
    clearSelection(triggerChange = true)
    {
        this._grid.clearSelection(triggerChange);
    }

    checkAllRows(triggerChange = true)
    {
        this._grid.checkAllRows(triggerChange);
    }

    unCheckAllRows(triggerChange = true)
    {
        this._grid.unCheckAllRows(triggerChange);
    }

    selectRowsByIndexes(indexes: number[], triggerChange = true)
    {
        this._grid.selectRowsByIndexes(indexes, triggerChange);
    }

    selectRowByIndex(index: number, triggerChange = true)
    {
        this._grid.selectRowByIndex(index, triggerChange);
    }

    selectRows(itemIdList: string[], property?: string, triggerChange = true)
    {
        this._grid.selectRows(itemIdList, property, triggerChange);
    }

    selectRow(itemId: string, triggerChange = true)
    {
        this._grid.selectRow(itemId, triggerChange);
    }

    unselectRows(itemIdList: string[], property?: string, triggerChange = true)
    {
        this._grid.unselectRows(itemIdList, property, triggerChange);
    }

    unselectRow(itemId: string)
    {
        this._grid.unselectRow(itemId);
    }
    //#endregion

    //#region GroupBy
    removeGroup(field: string, updateDataSource = true)
    {
        this.removeGroups([field], updateDataSource);
    }

    removeGroups(fields: string[], updateDataSource = true)
    {
        this._grid.removeGroups(fields, updateDataSource);
    }

    removeAllGroups(updateDataSource = true)
    {
        this._grid.removeAllGroups(updateDataSource);
    }

    addGroup(field: string | GridGroupByItem, updateDataSource = true, sortBySettings?: GridSortSettings, internalSortBy?: GridSortSettings)
    {
        this.addGroups([field], updateDataSource, sortBySettings, internalSortBy);
    }

    addGroups(fields: (string | GridGroupByItem)[], updateDataSource = true, sortBy?: GridSortSettings, internalSortBy?: GridSortSettings)
    {
        this._grid.addGroups(fields, updateDataSource, sortBy, internalSortBy);
    }
    //#endregion

    //#region Sort
    removeSort(updateDataSource = true)
    {
        this._grid.removeSort(updateDataSource);
    }

    sort(field: string, tableSortModeEnum?: GridSortDirectionEnum)
    {
        this._grid.sort(field, tableSortModeEnum);
    }
    //#endregion

    //#region Filter
    clearFilters(updateDataSource = true)
    {
        this._grid.clearFilters(updateDataSource);
    }

    addFilter(field: string, filterCondition: GridFilterSettings, applyFilters = true)
    {
        this._grid.addFilter(field, filterCondition, applyFilters);
    }

    removeFilter(field: string, applyFilters = true)
    {
        this._grid.removeFilter(field, applyFilters);
    }

    updateFilter(field: string, filterCondition: GridFilterSettings, applyFilters = true)
    {
        this._grid.updateFilter(field, filterCondition, applyFilters);
    }
    //#endregion

    pageSelected(page?: number, update = true)
    {
        return this._grid.pageSelected(page, update);
    }

    //#region Height
    height(height?: number | string)
    {
        return this._grid.height(height);
    }

    recalculateHeight(afterFilter = false)
    {
        this._grid.recalculateHeight(afterFilter);
    }

    recalculateWidth()
    {
        this._grid.recalculateWidth();
    }
    //#endregion

    //#region Visible toolbar
    visibleToolbar(state?: boolean)
    {
        return this._grid.visibleToolbar(state);
    }

    showToolbar()
    {
        this._grid.showToolbar();
    }

    hideToolbar()
    {
        this._grid.hideToolbar();
    }

    toolbarItem<T extends Button | SplitButton | Switch>(value: string)
    {
        return this._grid.toolbarItem<T>(value);
    }

    showToolbarItem(value: string)
    {
        this._grid.showToolbarItem(value);
    }

    hideToolbarItem(value: string)
    {
        this._grid.hideToolbarItem(value);
    }

    enableToolbarItem<T extends VrControl>(value: string)
    {
        this._grid.enableToolbarItem<T>(value);
    }

    disableToolbarItem<T extends VrControl>(value: string)
    {
        this._grid.disableToolbarItem<T>(value);
    }

    removeToolbarItem(value: string)
    {
        this._grid.removeToolbarItem(value);
    }

    addToolbarItem(toolbarItem: GridToolbarItem)
    {
        this._grid.addToolbarItem(toolbarItem);
    }
    //#endregion

    //#region Column
    hideCheckboxColumn(updateDataSource = false)
    {
        this._grid.hideColumn("vrGridCheckboxColumn", updateDataSource);
    }

    showCheckboxColumn(updateDataSource = false)
    {
        this._grid.showColumn("vrGridCheckboxColumn", updateDataSource);
    }
    //#endregion

    //#region Utility
    pageSize(pageSize?: number | boolean, update = false, triggerDataBound = false)
    {
        return this._grid.pageSize(pageSize, update, triggerDataBound);
    }
    //#endregion

    //#endregion
}
//#endregion

//#region Classes
class PaddingSettings
{
    left?: number;
    top?: number;
    right?: number;
    bottom?: number;
}

class RepeaterOnRowDataBoundEvent extends GridOnRowDataBoundEvent
{
    cell: HTMLElement;
    index: number;
}
//#endregion