import { ControlTypeEnum, IconClassicLight, IconClass, WindowAutoSizeDirectionEnum, dialog, confirm, alert, ButtonModeEnum, createSplitButton, createComboBox, ComboBoxTypeEnum, prompt, createButton, DateModeEnum, createTextBox, createCheckBox, createWindow, WindowFooterItemTypeEnum, createDatePicker, PositionEnum, TextModeEnum, WindowFooterItemAlignEnum, GridHeightModeEnum, GridCheckboxModeEnum, GridModeEnum, GridColumnTypeEnum, GridAlignEnum, GridAggregateMode, GridLabelUnderlineMode, GridToolbarItemType, GridDateFilterTypeEnum, GridNumberFilterTypeEnum, createGrid, createSwitch, GridColumn, GridToolbarItem, puma, GridButtonSettings, KeyEnum, GridSortDirectionEnum, GridGroupBySettings, GridSortSettings, GridGroupByItem, createButtonGroup, SelectionModeEnum, createLabel, createColorPicker, GridGroupExpandCollapseEvent, GridGroupEditClickEvent, GridGroupDisplayValueEvent, notify, showLoader, hideLoader, IconClassicRegular, IconClassicSolid, notifyError, NumberFormatRoundingSettings, NumberFormatSettings, RoundingModeEnum, GridPageSelectedEvent, notifyWarning, GridScrollEvent, div, ControlPositionEnum, GridStringFilterTypeEnum, CheckboxStateEnum, GridServerBindSettings, GridStickerSettings, TextAlignEnum, GridStickerClickEvent, GridBeforeExcelExportEvent, GridAfterExcelExportEvent, ComboBoxItem, DateTime, GridBeforeGroupCheckEvent, GridAfterGroupCheckEvent, GridCartSettings } from "../vr";
import { VrControl, VrControlOptions, VrControlsEvent } from "../common";
import { Window } from "./window";
import { SplitButton, SplitButtonOptions } from "./splitButton";
import { ControlManager } from "../../../src/managers/controlManager";
import { ComboBox, ComboBoxOptions } from "./comboBox";
import { CheckBox } from "./checkbox";
import { TextBox, TextBoxOptions } from "./textbox";
import { DatePicker, DatePickerOptions } from "./datePicker";
import { Dictionary } from "../../../src/managers/dictionary";
import { ColorPicker } from "./colorPicker";
import { Button } from "./button";
import { UtilityManager } from "../../../src/managers/utilityManager";
import { Switch } from "./switch";
import { Label } from "./label";

//#region Options
export class GridOptions extends VrControlOptions
{
    //#region Properties
    columns?: GridColumn[];
    toolbar?: GridToolbarItem[];
    declare height?: string | number | GridHeightModeEnum;
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

    //**********************TODO//**********************
    layoutSettings?: GridLayoutSettings | boolean;
    //#endregion

    //#region Events
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
    //#endregion
}
//#endregion

//#region Control
export class Grid extends VrControl
{
    //#region Variables
    private _fitSpaceColumnPercentage: number;
    private _showTotals: boolean;
    private _isResizing: boolean;
    private _isDragging: boolean;
    private _actualSortingInfo: GridSortingInfo | null;
    private _columnOptions: GridColumnPosition[];
    private _actualPageSize: number;
    private _actualPageSelected: number;
    private _internalOptions: GridOptions;
    private _tempRebindInfo: TempRebindInfo | null;
    private _pageSizeUnlimited: boolean;
    private _rowCheckedIdList: string[];
    private _timeoutFilterText: number;
    private _firstDraw: boolean;

    //#region DataSource
    private _dataSource: any[] | null;
    private _originalDataSource: any[];
    private _deletedItems: any[];
    private _actualEditedItem: any | null;
    private _lastIndexAdded: number;
    private _responseForServerBinding: any;
    private _serverBindingPagination: GridServerBindPagination;
    //#endregion

    //#region Filtering
    private _wndFiltering: Window;
    private _dictionaryDataValues: Map<string, string[]>;
    private _dictionaryFilterConditions: Map<string, GridFilterSettings>;
    //#endregion

    //#region Cart
    private _wndCart: Window;
    private _grdCart: Grid;
    //#endregion

    //#region Show/Hide & Group
    private _wndActions: Window;
    private _groupByActualValue: any;
    private _originalHiddenColumnFields: string[];
    //#endregion

    //#region Auto window
    private _wndAutoWindow: Window;
    //#endregion

    //#region Layout
    private _wndLayout: Window;
    private _grdLayout: Grid;
    private _actualLayout: GridLayout | null;
    private _originalOptionsForLayout: GridLayoutStructure;
    private _customLayouts: GridLayout[];
    //#endregion

    //#region Controls
    private _cellButtons: Map<string, GridControlData>;
    private _cellIcons: Map<string, GridControlData>;
    private _cellCustoms: Map<string, GridControlData>;
    private _cellLabels: Map<string, GridControlData>;
    private _cellImages: Map<string, GridControlData>;
    //#endregion

    //#region Structure
    private _elementId: string;
    private _elementLocked: HTMLElement;
    private _lblSticker: Label;
    private _divToolbar: HTMLElement;
    private _divHeaderContainer: HTMLElement;
    private _divHeader: HTMLElement;
    private _divHeaderLocked: HTMLElement;
    private _divFilters: HTMLElement;
    private _divFiltersLocked: HTMLElement;
    private _divBody: HTMLElement;
    private _divBodyLocked: HTMLElement;
    private _divTotals: HTMLElement;
    private _divTotalsLocked: HTMLElement;
    private _divFooter: HTMLElement;
    private _spanFitHeaderSpace: HTMLSpanElement;
    private _spanFitFilterSpace: HTMLSpanElement;
    private _spanFitTotalsSpace: HTMLSpanElement;
    private _vrDateTimeFields: string[];
    //#endregion

    //#endregion

    constructor(element: HTMLElement, options?: GridOptions | null)
    {
        //#region Options
        if (options == null)
            options = new GridOptions();

        if (options.addToControlList == null) options.addToControlList = false;
        if (options.width == null) options.width = "100%";
        if (options.tooltip == null) options.tooltip = true;
        if (options.dataSourceFieldId == null) options.dataSourceFieldId = "id";
        if (options.multilineRows == null) options.multilineRows = true;
        if (options.multilineHeader == null) options.multilineHeader = false;
        if (options.rowHeight == null) options.rowHeight = 27;
        if (options.columns == null) options.columns = [];
        if (options.hideEditButton == null) options.hideEditButton = false;
        if (options.mode == null) options.mode = GridModeEnum.Sync;
        if (options.pageSize == null || options.pageSize === true) options.pageSize = 50;
        if (options.filterable == null) options.filterable = true;
        if (options.alternateRowColors == null) options.alternateRowColors = true;
        if (options.hoverRowColor == null) options.hoverRowColor = false;
        if (options.footer == null) options.footer = true;
        if (options.header == null) options.header = true;
        if (options.resizable == null) options.resizable = true;
        if (options.reorderable == null) options.reorderable = true;
        if (options.enable == null) options.enable = true;
        if (options.excel == null) options.excel = options.rebind;
        if (options.lockable == null) options.lockable = false;
        if (!options.lockable && options.columns!.vrAny(k => k.locked === true))
            options.lockable = true;

        if (options.checkboxes == null || options.checkboxes === false) options.checkboxes = GridCheckboxModeEnum.None;
        if (options.checkboxes === true) options.checkboxes = GridCheckboxModeEnum.MultiCheck;

        //#region Server binding
        if (options.serverBinding == null) options.serverBinding = false;
        if (options.serverBinding === true)
            options.serverBinding = new GridServerBindSettings();

        if (options.serverBinding !== false)
        {
            if (options.serverBinding.itemCountPropertyName == null) options.serverBinding.itemCountPropertyName = "itemCount";
            if (options.serverBinding.totalsPropertyName == null) options.serverBinding.totalsPropertyName = "totals";
            if (options.serverBinding.excelDownloadUrlPropertyName == null) options.serverBinding.excelDownloadUrlPropertyName = "excelDownloadUrl";
        }
        //#endregion

        //#region Sticker options
        if (options.sticker == null) options.sticker = new GridStickerSettings();
        if (typeof (options.sticker) == "string")
        {
            let text = options.sticker;
            options.sticker = new GridStickerSettings();
            options.sticker.text = text;
        }

        if (options.sticker.textColor == null) options.sticker.textColor = "#000";
        if (options.sticker.backgroundColor == null) options.sticker.backgroundColor = "#e3f1fa";
        //#endregion

        //#region Layout
        if (options.layoutSettings == null || options.layoutSettings === true)
            options.layoutSettings = new GridLayoutSettings();

        if (options.layoutSettings !== false)
            if (options.layoutSettings.name == null) options.layoutSettings.name = "";
        //#endregion

        //#region Sort
        if (options.sortable == null) options.sortable = true;
        if (options.sortBy != null)
        {
            let sortByField = options.sortBy;
            if (typeof (options.sortBy) == "string")
            {
                options.sortBy = new GridSortSettings();
                options.sortBy.field = String(sortByField);
            }

            if ((options.sortBy as GridSortSettings).direction == null) (options.sortBy as GridSortSettings).direction = GridSortDirectionEnum.Asc;
        }
        //#endregion

        //#region GroupBy
        if (options.groupable == null)
            options.groupable = true;

        if (options.groupBy != null)
        {
            if (Array.isArray(options.groupBy))
            {
                let groupByFields = options.groupBy;
                options.groupBy = new GridGroupBySettings();
                options.groupBy.fields = groupByFields;
                options.groupBy.sortBy = { field: groupByFields[0], direction: GridSortDirectionEnum.Asc };
            }

            if (options.groupBy.sortBy == null) options.groupBy.sortBy = new GridSortSettings();
            if (options.groupBy.sortBy.direction == null) options.groupBy.sortBy.direction = GridSortDirectionEnum.Asc;

            let groupByFields = options.groupBy.fields;
            options.groupBy.fields = [];
            if (groupByFields != null)
            {
                for (let field of groupByFields)
                {
                    if (typeof (field) == "string")
                        options.groupBy.fields.push({ field: field } as any);
                    else
                        options.groupBy.fields.push(field as any);
                }
            }
        }
        //#endregion

        //#region Check columns field
        for (let column of options.columns)
        {
            let fieldList = options.columns.map(k => k.field);
            let fieldListFiltered = fieldList.filter(k => k == column.field);
            if (fieldListFiltered.length > 1)
                throw new Error("La proprietà 'field' delle colonne deve essere univoca!!!");
        }
        //#endregion

        //#region Footer default
        if (options.footer == null || options.footer === true)
            options.footer = new GridFooterSettings();

        if (options.footer !== false)
        {
            if (options.footer.maxVisiblePages == null) options.footer.maxVisiblePages = 10;
            if (options.footer.showPagination == null) options.footer.showPagination = true;
            if (options.footer.showPageSize == null) options.footer.showPageSize = true;
            if (options.footer.showSettings == null) options.footer.showSettings = true;
            if (options.footer.totalElements == null) options.footer.totalElements = true;
        }
        //#endregion

        //#endregion

        super(element, options, ControlTypeEnum.Grid);

        this._originalHiddenColumnFields = [];
        this._originalDataSource = [];
        this._dictionaryFilterConditions = new Map<string, GridFilterSettings>();
        this._rowCheckedIdList = [];

        if (options.pageSize === false)
            this._pageSizeUnlimited = true;

        this._elementId = element.id;
        this._actualLayout = null;

        //#region Add columns from groupBy if not included
        if (options.groupBy != null)
        {
            let optionsFields = options.columns.map(k => k.field);
            for (let groupByItem of options.groupBy.fields as GridGroupByItem[])
            {
                if (!optionsFields.includes(groupByItem.field))
                {
                    let column = new GridColumn();
                    column.field = groupByItem.field;
                    column.title = groupByItem.displayField;
                    column.hidden = true;
                    options.columns.push(column);
                }
            }
        }
        //#endregion

        //#region Original options for layout
        let layoutList: GridLayout[] = [];
        if (options.layoutSettings !== false)
        {
            let layoutJson = new GridLayoutStructure();
            layoutJson.filterConditions = null;
            layoutJson.pageSize = options.pageSize;
            layoutJson.sortingInfo = null;

            if (options.groupBy != null)
                layoutJson.groupBy = JSON.parse(JSON.stringify(options.groupBy));

            let index = 0;
            let layoutColumns: GridLayoutColumn[] = [];
            for (let column of options.columns!)
            {
                let layoutColumn = new GridLayoutColumn();
                layoutColumn.field = (column.type == GridColumnTypeEnum.EditButton) ? "editButton" : column.field;
                layoutColumn.fitSpace = column.fitSpace;
                layoutColumn.hidden = column.hidden;
                layoutColumn.locked = column.locked;
                layoutColumn.index = index;

                let width = (column.width != null) ? (column.width) : ((column.type == GridColumnTypeEnum.EditButton) ? 32 : 100);
                layoutColumn.width = width;

                layoutColumns.push(layoutColumn);
                index++;

                if (column.hidden === true)
                    this._originalHiddenColumnFields.push(column.field);
            }

            layoutJson.columns = layoutColumns;
            this._originalOptionsForLayout = layoutJson;

            let getLayoutListRequest = new GetLayoutListRequest();
            getLayoutListRequest.gridName = options.layoutSettings.name;
            getLayoutListRequest.pageName = window.location.href;

            //**********************TODO//**********************
            this.doWebApiCallLayout(GridLayoutOperationTypeEnum.Get, getLayoutListRequest, (response: any) =>
            {
                layoutList = response.tableLayoutList;
                if (layoutList.length > 0)
                {
                    this._customLayouts = layoutList;
                    let layoutToLoad = layoutList[0];
                    let layoutClass = JSON.parse(layoutToLoad.layoutJson) as GridLayoutStructure;

                    // //#region Check if saved layout match with current layout
                    // let columnFieldsToDelete = [];
                    // for (let layoutColumn of layoutClass.columns)
                    // {
                    //     if (layoutColumn.field == "editButton" && !options!.hideEditButton)
                    //         continue;

                    //     if (!options!.columns!.map(k => k.field).includes(layoutColumn.field))
                    //         columnFieldsToDelete.push(layoutColumn.field);
                    // }

                    // for (let fieldToDelete of columnFieldsToDelete)
                    // {
                    //     let indexToDelete = layoutClass.columns.map(k => k.field).indexOf(fieldToDelete);
                    //     if (indexToDelete != -1)
                    //         layoutClass.columns.splice(indexToDelete, 1);
                    // }
                    // //#endregion

                    let same = true;
                    for (let layoutColumn of layoutClass.columns)
                    {
                        if (layoutColumn.field == "editButton" && !options!.hideEditButton)
                            continue;

                        if (!options!.columns!.map(k => k.field).includes(layoutColumn.field))
                        {
                            same = false;
                            break;
                        }
                    }
                    //#endregion

                    if (same)
                    {
                        this._actualLayout = layoutToLoad;
                        //this.changeLayout();
                    }

                    //this._actualLayout = layoutToLoad;
                }
            });
            //**********************TODO//**********************
        }
        //#endregion

        //#region Instantiate variables
        this._lastIndexAdded = -1;
        this._dictionaryDataValues = new Map<string, string[]>();
        this._groupByActualValue = {};
        this._actualPageSize = (options.pageSize === false) ? 50 : ((typeof (options.pageSize) == "number") ? options.pageSize : ((options.pageSize.value != null) ? options.pageSize.value : 50));
        this._actualPageSelected = 1;

        this._serverBindingPagination = new GridServerBindPagination();
        this._serverBindingPagination.indexFrom = 0 * this._actualPageSize;
        this._serverBindingPagination.indexTo = this._serverBindingPagination.indexFrom + this._actualPageSize - 1;
        //#endregion

        //#region Structure
        let divContainer = document.createElement("div");
        divContainer.id = element.id + "_divContainer";
        divContainer.classList.add("p-grid-container");
        element.parentNode!.insertBefore(divContainer, element);

        //#region Sticker
        this._lblSticker = createLabel({
            text: options.sticker.text,
            align: TextAlignEnum.Center,
            bold: options.sticker.bold,
            visible: options.sticker.text != null && options.sticker.text.length > 0,
            colorSettings: { background: options.sticker.backgroundColor, textColor: options.sticker.textColor },
            cssContainer: "width: 30px; border: solid 1px #d9d9d9; border-right: none; border-top: solid 2px #25a0da;" + options.sticker.cssContainer,
            css: "transform: rotate(180deg); writing-mode: tb; width: 100%; height: 100%; font-size: 16px;" + options.sticker.css,
            onClick: (e) =>
            {
                if ((options!.sticker! as GridStickerSettings).onClick != null)
                {
                    let clickEvent = new GridStickerClickEvent();
                    clickEvent.sender = this;
                    clickEvent.control = e.sender;
                    clickEvent.value = e.sender.value();
                    (options!.sticker! as GridStickerSettings).onClick!(clickEvent);
                }
            }
        }, this.container(), ControlPositionEnum.Before)
        //#endregion

        //#region Header
        this._divHeaderContainer = document.createElement("div");
        this._divHeaderContainer.style.cssText += "height: 35px;";
        divContainer.appendChild(this._divHeaderContainer);

        if (options.lockable)
        {
            this._divHeaderLocked = document.createElement("div");
            this._divHeaderLocked.classList.add("grid_Header", "grid_Header_locked");
            this._divHeaderLocked.style.cssText += "overflow-x: hidden; display: inline-block;";
            this._divHeaderContainer.appendChild(this._divHeaderLocked);
        }

        this._divHeader = document.createElement("div");
        this._divHeader.id = element.id + "Header";
        this._divHeader.classList.add("grid_Header");
        this._divHeader.style.cssText += "overflow-x: hidden; display: inline-block;";
        this._divHeaderContainer.appendChild(this._divHeader);

        if (!options.header)
        {
            this._divHeaderContainer.style.cssText += "display: none;";
            this._divHeader.style.cssText += "display: none;";

            if (this._divHeaderLocked != null)
                this._divHeaderLocked.style.cssText += "display: none;";
        }

        this._spanFitHeaderSpace = puma("<span id='" + element.id + "FitHeaderSpace' class='grid_fitHeaderSpace'></span>").vrAppendToPuma("#" + element.id + "_divContainer")[0];
        //#endregion

        //#region Filters
        let divFilters = div("#" + element.id + "_divContainer", { css: "height: 31px; display: none;" })
        if (options.lockable)
            this._divFiltersLocked = puma("<div id='" + element.id + "Filters' class='grid_Filters grid_Filters_locked' style='overflow-x: hidden; display: none;'></div>").vrAppendToPuma(divFilters)[0] as HTMLDivElement;

        this._divFilters = puma("<div id='" + element.id + "Filters' class='grid_Filters' style='overflow-x: hidden; display: none;'></div>").vrAppendToPuma(divFilters)[0] as HTMLDivElement;
        this._spanFitFilterSpace = puma("<span id='" + element.id + "FitFilterSpace' class='grid_fitFilterSpace'></span>").vrAppendToPuma("#" + element.id + "_divContainer")[0];
        //#endregion

        //#region Body
        let divBodyContainer = div("#" + element.id + "_divContainer", { id: element.id + "_grid_body_container" })
        if (options.lockable)
            this._divBodyLocked = div(divBodyContainer, { class: "grid_body_locked", css: "overflow-y: auto; vertical-align: top; display: inline-block; overflow-x: hidden; border-top: none; border: solid 1px #d9d9d9; border-right: solid 1px #a5a5a5; border-bottom: none;" })

        this._divBody = puma("<div id='" + element.id + "Body' class='grid_Body'></div>").vrAppendToPuma(divBodyContainer)[0] as HTMLDivElement;
        puma(this._divBody).scroll((e: any) =>
        {
            puma(this._divFilters).scrollLeft(puma(this._divBody).scrollLeft());
            puma(this._divHeader).scrollLeft(puma(this._divBody).scrollLeft());
            puma(this._divTotals).scrollLeft(puma(this._divBody).scrollLeft());
            puma(this._divBodyLocked).scrollTop(puma(this._divBody).scrollTop());

            if (options!.onScroll != null)
            {
                let scrollEvent = new GridScrollEvent();
                scrollEvent.sender = this;
                scrollEvent.target = e.target;
                scrollEvent.scrollLeft = puma(this._divBody).scrollLeft();
                scrollEvent.scrollTop = puma(this._divBody).scrollTop();
                options!.onScroll(scrollEvent);
            }
        });

        puma(this._divBodyLocked).scroll((e: any) =>
        {
            puma(this._divBody).scrollTop(puma(this._divBodyLocked).scrollTop());

            if (options!.onScroll != null)
            {
                let scrollEvent = new GridScrollEvent();
                scrollEvent.sender = this;
                scrollEvent.target = e.target;
                scrollEvent.scrollLeft = puma(this._divBody).scrollLeft();
                scrollEvent.scrollTop = puma(this._divBody).scrollTop();
                options!.onScroll(scrollEvent);
            }
        });
        //#endregion

        //#region Totals
        let divTotals = div("#" + element.id + "_divContainer", { css: "height: 23px; display: none;" });
        if (options.lockable)
            this._divTotalsLocked = puma("<div id='" + element.id + "Totals' class='grid_Totals grid_Totals_locked' style='overflow-x: hidden; display: none;'></div>").vrAppendToPuma(divTotals)[0] as HTMLDivElement;

        this._divTotals = puma("<div id='" + element.id + "Totals' class='grid_Totals' style='overflow-x: hidden; display: none;'></div>").vrAppendToPuma(divTotals)[0] as HTMLDivElement;

        this._showTotals = options.columns!.vrAny(k => k.aggregate != null && k.aggregate !== false);

        this._spanFitTotalsSpace = puma("<span id='" + element.id + "FitTotalsSpace' class='grid_fitTotalsSpace'></span>").vrAppendToPuma("#" + element.id + "_divContainer")[0];
        //#endregion

        //#endregion

        //#region Footer
        if (options.footer !== false)
        {
            this._divFooter = puma("<div id='" + element.id + "Footer' class='p-grid-footer'></div>").vrAppendToPuma("#" + element.id + "_divContainer")[0] as HTMLDivElement;

            let divPagination = document.createElement("div");
            divPagination.id = element.id + "_footerPagination";
            this._divFooter.appendChild(divPagination);

            //#region Footer page size
            if (options.footer.showPageSize && typeof (options.pageSize) != "boolean")
            {
                //#region PageSize items
                let pageSizeItems =
                    [
                        { text: "50", value: "50", numberValue: 50 },
                        { text: "100", value: "100", numberValue: 100 }
                    ];

                if (this._actualPageSize > 100)
                {
                    pageSizeItems.push({ text: "200", value: "200", numberValue: 200 });
                    pageSizeItems.push({ text: "500", value: "500", numberValue: 500 });
                }

                if (typeof (options.pageSize) != "number")
                {
                    let otherValues = options.pageSize.otherValues;
                    options.pageSize = (options.pageSize.value != null) ? options.pageSize.value : 50;
                    for (let otherValue of otherValues)
                        pageSizeItems.push({ text: String(otherValue), value: String(otherValue), numberValue: otherValue });
                }

                pageSizeItems.push({ text: String(options.pageSize!), value: String(options.pageSize!), numberValue: Number(options.pageSize!) });

                pageSizeItems = pageSizeItems.vrDistinctBy(k => k.numberValue);
                pageSizeItems.vrSortBy(["numberValue"], true);
                //#endregion

                createComboBox(
                    {
                        width: 65,
                        mode: ComboBoxTypeEnum.DropDown,
                        cssContainer: "margin-top: 3px;",
                        css: "border: solid 1px #d9d9d9 !important;",
                        items: pageSizeItems,
                        value: String(options.pageSize!),
                        onAfterChange: (e) =>
                        {
                            if (options!.columns!.length > 10)
                                showLoader();

                            window.setTimeout(() =>
                            {
                                this.pageSize(Number(e.sender.value()), true);
                                hideLoader();
                            }, 200);
                        }
                    }, this._divFooter, null, element.id + "_ddlPageSize");
            }
            //#endregion

            //#region Footer settings
            if (options.footer.showSettings)
            {
                //#region Settings split button
                let spbSettingsControl = createSplitButton(
                    {

                        icon: IconClassicLight.Gear,
                        cssContainer: "top: 2px; margin-left: 5px;",
                        items:
                            [
                                {
                                    text: "Salva layout", icon: IconClassicLight.Table, onClick: (e) =>
                                    {
                                        if (this._actualLayout == null)
                                            prompt("Assegna un nome a questo layout", { title: "Salva layout" }).then((value) => this.saveLayout(value));
                                        else
                                        {
                                            dialog("Vuoi sovrascrivere questo layout, o crearne uno nuovo?",
                                                {
                                                    title: "Salva layout",
                                                    footerItems:
                                                        [
                                                            { text: "Annulla", type: WindowFooterItemTypeEnum.Close },
                                                            {
                                                                text: "Sovrascrivi", mode: ButtonModeEnum.Primary, onClick: (e) => 
                                                                {
                                                                    this.saveLayout(this._actualLayout!.layoutName)
                                                                    e.sender.close();
                                                                }
                                                            },
                                                            {
                                                                text: "Crea nuovo", mode: ButtonModeEnum.Primary, onClick: (e) =>
                                                                {
                                                                    prompt("Assegna un nome a questo layout", { title: "Nome layout" }).then((value) =>
                                                                    {
                                                                        this._actualLayout = null;
                                                                        this.saveLayout(value);
                                                                        e.sender.close();
                                                                    });
                                                                }
                                                            }
                                                        ]
                                                });
                                        }
                                    }
                                },
                                {
                                    text: "Gestisci layout", icon: IconClassicLight.Table, value: "manageLayout",
                                    onClick: (e) => this.openWindowLayout()
                                },
                                {
                                    text: "Ripristina layout di base", icon: IconClassicLight.Table, value: "restoreBaseLayout",
                                    confirmationMessage: "Confermi di voler ripristinare il layout di base?",
                                    onClick: (e) => 
                                    {
                                        this._actualLayout = null;
                                        this.changeLayout(true, this._originalOptionsForLayout);
                                    }
                                },
                                {
                                    text: "Mostra/Nascondi", icon: IconClassicLight.Eye,
                                    onClick: (e) => this.openWindowActions(GridActionEnum.ShowHide)
                                },
                                {
                                    text: "Raggruppa per...", icon: IconClassicLight.Users, visible: options.groupable,
                                    onClick: (e) => this.openWindowActions(GridActionEnum.GroupBy)
                                },
                                {
                                    text: "Blocca/Sblocca", icon: IconClassicLight.Lock, visible: options.lockable!,
                                    onClick: (e) => this.openWindowActions(GridActionEnum.LockUnlock)
                                }
                            ]
                    }, this._divFooter, null, this._elementId + "_spbSettings");
                //#endregion

                //#region Hide manage layout button
                if (layoutList.length == 0)
                    window.setTimeout(() => spbSettingsControl.hideItem("manageLayout"));
                //#endregion
            }
            //#endregion

            //#region Footer Cart
            if (options.footer.cartSettings != null)
            {
                if (!options.footer.cartSettings.fields.vrAny(k => k != "" && k != null))
                    throw Error("Cart fields required");

                let btnCart = createButton({
                    icon: IconClassicLight.CartShopping,
                    cssContainer: "position: absolute; border: none; border-left: solid 1px #CCC; right: 10px; margin-top: 3px;",
                    css: "background: none; border: none;",
                    onClick: (e) =>
                    {
                        let cartSettings = (options!.footer! as GridFooterSettings).cartSettings!;
                        if (cartSettings.onClick != null)
                            cartSettings.onClick!({ sender: this, selectedValues: this.getCheckedValues() });
                        else
                        {
                            let checkedValues = this.getCheckedValues();
                            if (checkedValues.length > 0)
                                this.openWindowCart();
                        }
                    }
                }, this._divFooter, null, element.id + "_btnCart");
                btnCart.badge("0");
            }
            //#endregion
        }
        //#endregion

        //#region CSS
        if (options.css != null)
            puma("#" + element.id + "_divContainer")[0].style.cssText += options.css;

        puma(element).addClass("p-grid");
        puma(element).css("border-collapse", "collapse");

        if (typeof (options.alternateRowColors) === "string")
            puma("<style>#" + element.id + " .p-grid tr.p-grid-body:nth-child(odd) { background-color: " + options.alternateRowColors + "; }</style>").vrAppendToPuma("head");
        else if (options.alternateRowColors === true)
            puma(element).addClass("alternateRowsColor");

        if (options.hoverRowColor)
            puma(element).addClass("p-grid-hover");
        //#endregion

        //#region Height
        if (options.height == null) options.height = GridHeightModeEnum.FitContent;
        if (options.height == GridHeightModeEnum.FitContent)
            options.height = "auto";

        puma(this._divBody).height(options.height!);
        let heightContainer = (typeof (options.height!) == "number") ? options.height! + 2 : options.height;
        puma("#" + this.element().id + "_grid_body_container").height(heightContainer);
        if (options.lockable) puma(this._divBodyLocked).height(options.height!);

        if (this._lblSticker != null)
        {
            let headerHeight = (puma(this._divHeader).is(":visible")) ? 34 : 0;
            let filtersHeight = (options.filterable) ? 30 : 0;
            let totalsheight = (this._showTotals) ? 25 : 0;
            puma(this._lblSticker.container()).height(puma("#" + this.element().id + "_grid_body_container").height() + headerHeight + filtersHeight + totalsheight - 1);
        }
        //#endregion

        puma(this._divBody).vrAppendPuma(element);

        if (options.lockable)
        {
            this._elementLocked = puma("<table class='p-grid p-grid-locked' style='border-collapse: collapse;'></table>")[0];
            if (options.alternateRowColors === true) puma(this._elementLocked).addClass("alternateRowsColor");
            if (options.hoverRowColor) puma(this._elementLocked).addClass("p-grid-hover")
            puma(this._divBodyLocked).vrAppendPuma(this._elementLocked);
        }

        //#region Edit button
        let editButtonColumnsNumber = options.columns.filter(k => k.type == GridColumnTypeEnum.EditButton).length;
        if (editButtonColumnsNumber > 1)
            throw Error("Non possono coesistere due o più colonne di edit!");

        if (editButtonColumnsNumber == 1)
        {
            let indexEditButtonColumn = options.columns.findIndex(k => k.type == GridColumnTypeEnum.EditButton);
            options.columns[indexEditButtonColumn].field = "editButton";
            options.columns[indexEditButtonColumn].locked = this.thereAreLockedColumns();
        }

        if (editButtonColumnsNumber == 0 && !options.hideEditButton)
            options.columns.unshift({ type: GridColumnTypeEnum.EditButton, field: "editButton", locked: this.thereAreLockedColumns() });
        //#endregion

        //#region Width
        puma(element).width(options.width);
        puma("#" + element.id + "_divContainer").width(options.width);
        //#endregion

        //#region Fit space
        this.recalculateFitSpacePercentage();
        //#endregion

        //#region Toolbar
        if (options.toolbar != null)
        {
            this._divToolbar = puma("<div id='" + element.id + "Toolbar' class='grid_divToolbar'></div>").vrPrependToPuma("#" + element.id + "_divContainer")[0] as HTMLDivElement;

            let separatorCount = 0;
            for (let toolbarItem of options.toolbar)
            {
                //#region Value if separator
                if (toolbarItem.type != null && toolbarItem.type == GridToolbarItemType.Separator
                    && (toolbarItem.value == "" || toolbarItem.value == null))
                {
                    toolbarItem.value = "separator" + separatorCount;
                    separatorCount++;
                }
                //#endregion

                this.addToolbarItem(toolbarItem);
            }
        }
        //#endregion

        //#region Header columns
        puma(this._divHeader).vrAppendPuma("<table class='p-grid'><thead><tr class='p-grid-headerColumn'></tr></thead></table>");
        if (options.lockable)
            puma(this._divHeaderLocked).vrAppendPuma("<table class='p-grid p-grid-locked'><thead><tr class='p-grid-headerColumn'></tr></thead></table>");

        if (options.groupable! || options.groupBy != null)
        {
            let tdHeaderFragment = document.createDocumentFragment();
            let tdHeaderLockedFragment = document.createDocumentFragment();
            for (let column of options.columns!)
            {
                let display = "";
                if (options.groupBy == null || (!(options.groupBy.fields as GridGroupByItem[]).map(k => k.field).includes(column.field)))
                    display = "display: none;";

                let thHeader = document.createElement("th");
                thHeader.setAttribute("field", "groupBy" + column.field);
                thHeader.classList.add("groupBy" + column.field, "groupByHeader");
                thHeader.style.cssText += display;
                tdHeaderFragment.appendChild(thHeader);

                if (options.lockable)
                {
                    let thHeaderLocked = document.createElement("th");
                    thHeaderLocked.setAttribute("field", "groupBy" + column.field);
                    thHeaderLocked.classList.add("groupBy" + column.field, "groupByHeader");
                    thHeaderLocked.style.cssText += display;
                    tdHeaderLockedFragment.appendChild(thHeaderLocked);
                }
            }

            puma(this._divHeader).find(".p-grid-headerColumn")[0].appendChild(tdHeaderFragment)
            if (options.lockable)
                puma(this._divHeaderLocked).find(".p-grid-headerColumn")[0].appendChild(tdHeaderLockedFragment)
        }

        //#region Checkbox column
        if (options.checkboxes != GridCheckboxModeEnum.None)
        {
            let thCheckbox = document.createElement("th");
            thCheckbox.style.cssText += "width: 20px;";
            puma(thCheckbox).attr("field", "vrGridCheckboxColumn");
            puma(thCheckbox).css("background-color", "#51B3E1");
            puma(thCheckbox).css("color", "#FFF");

            let textHTML = "<input id='" + element.id + "header_CheckboxColumn' class='vrCheckBox' type='checkbox'></input>"
                + "<label class='vrCheckBoxLabel vr-checkboxColumnHeader-label' for='header_CheckboxColumn'></label>";
            thCheckbox.innerHTML = textHTML;

            puma(thCheckbox).css("text-align", "center");

            if (this.thereAreLockedColumns())
                puma(this._divHeaderLocked).find(".p-grid-headerColumn").vrAppendPuma(thCheckbox);
            else
                puma(this._divHeader).find(".p-grid-headerColumn").vrAppendPuma(thCheckbox);

            if (options.checkboxes == GridCheckboxModeEnum.SingleCheck)
                puma(thCheckbox).children().hide();
            else
            {
                puma(thCheckbox).click((e: any) =>
                {
                    let isChecked = (e.target as HTMLInputElement).checked;
                    if (isChecked)
                        this.checkAllRows();
                    else
                        this.unCheckAllRows();
                });
            }
        }
        //#endregion

        //#region Columns
        let thColumnHeaderFragment = document.createDocumentFragment();
        let thColumnHeaderLockedFragment = document.createDocumentFragment();
        for (let column of options.columns)
        {
            let th = document.createElement("th");
            th.setAttribute("field", column.field);

            let title = (column.title != null) ? column.title : "";
            th.setAttribute("title", title);

            //#region Icon
            if (column.headerSettings != null && column.headerSettings.icon != null)
                title = "<i class='" + column.headerSettings.icon + "'></i>" + title;
            //#endregion

            //#region Bold
            if (column.bold === true)
                th.style.cssText += "font-weight: 600;";
            //#endregion

            //#region Css
            if (column.headerSettings != null && column.headerSettings!.css != null)
                th.style.cssText += column.headerSettings!.css;
            //#endregion

            th.innerHTML = "<div class='grid_headerTh'><span class='grid_headerThContent'>" + title + "</span><i></i></div>";

            let thWidth = String((column.width != null) ? column.width : ((column.fitSpace == true) ? this._fitSpaceColumnPercentage + "%" : (column.type == GridColumnTypeEnum.EditButton) ? 32 : 100));
            th.style.cssText += "width: " + thWidth + "px;";

            if (column.fitSpace == true)
                th.setAttribute("fitSpace", "true");

            //#region Color
            if (column.headerSettings != null)
            {
                if (column.headerSettings.backgroundColor != null)
                    th.style.cssText += "background-color: " + column.headerSettings.backgroundColor + ";";

                if (column.headerSettings.color != null)
                    th.style.cssText += "color: " + column.headerSettings.color + ";";
            }
            //#endregion

            //#region Text align
            if (column.headerSettings != null && column.headerSettings.textAlign != null)
                th.style.cssText += "text-align: " + column.headerSettings.textAlign + ";";
            //#endregion

            //#region Tooltip
            if (options.tooltip)
            {
                let tooltip = "";
                if (column.headerSettings != null)
                {
                    if (column.headerSettings.tooltip == true)
                        tooltip = (column.title == null) ? "" : column.title;
                    else if (typeof (column.headerSettings.tooltip) == "string")
                        tooltip = column.headerSettings.tooltip;
                }

                if (tooltip.length > 0)
                    th.setAttribute("title", tooltip);
            }
            //#endregion

            //#region Sort
            let sortGridColumnTypes = [GridColumnTypeEnum.Currency, GridColumnTypeEnum.Date, GridColumnTypeEnum.DateTime,
            GridColumnTypeEnum.Duration, GridColumnTypeEnum.Label, GridColumnTypeEnum.Number, GridColumnTypeEnum.Percentage,
            GridColumnTypeEnum.String, GridColumnTypeEnum.Time, GridColumnTypeEnum.LongDate, GridColumnTypeEnum.LongDateTime,
            GridColumnTypeEnum.LongWeekDate, GridColumnTypeEnum.ShortWeekDate];

            if (sortGridColumnTypes.includes(column.type!))
            {
                th.onclick = (() =>
                {
                    if (this._isResizing === true || this._isDragging === true)
                        return;

                    if (puma(th).attr("sortMode") == null)
                        this.sort(column.field, GridSortDirectionEnum.Asc);
                    else
                    {
                        let sortMode = Number(puma(th).attr("sortMode")) as GridSortDirectionEnum;
                        if (sortMode == GridSortDirectionEnum.Asc)
                            this.sort(column.field, GridSortDirectionEnum.Desc);
                        else
                            this.removeSort();
                    }
                });
            }
            else
                th.style.cssText += "cursor: grab;"
            //#endregion

            // Append th
            if (options.lockable && column.locked)
            {
                th.setAttribute("locked", "locked");
                thColumnHeaderLockedFragment.appendChild(th);
            }
            else
                thColumnHeaderFragment.appendChild(th);

            if (column.hidden == true)
                th.style.display = "none";
        }

        puma(this._divHeader).find(".p-grid-headerColumn")[0].appendChild(thColumnHeaderFragment)
        if (options.lockable)
            puma(this._divHeaderLocked).find(".p-grid-headerColumn")[0].appendChild(thColumnHeaderLockedFragment)

        if (options.lockable && this.thereAreLockedColumns())
            puma(this._divHeader).width("Calc(100% - " + (puma(this._divHeaderLocked).width() + 5) + "px)")
        //#endregion

        //#endregion

        //#region Filters
        if (options.filterable)
        {
            puma(divFilters).show();
            puma(this._divFilters)[0].style.cssText += "display: inline-block";
            puma(this._divFilters).vrAppendPuma("<table class='p-grid'><thead><tr class='p-grid-filters'></tr></thead></table>");

            if (options.lockable)
            {
                puma(this._divFiltersLocked)[0].style.cssText += "display: inline-block";
                puma(this._divFiltersLocked).vrAppendPuma("<table class='p-grid p-grid-locked'><thead><tr class='p-grid-filters'></tr></thead></table>");
            }

            if (options.groupable! || options.groupBy != null)
            {
                let tdFilterFragment = document.createDocumentFragment();
                let tdFilterLockedFragment = document.createDocumentFragment();
                for (let column of options.columns!)
                {
                    let display = "";
                    if (options.groupBy == null || (!(options.groupBy.fields as GridGroupByItem[]).map(k => k.field).includes(column.field)))
                        display = "display: none;";

                    let tdFilter = document.createElement("td");
                    tdFilter.setAttribute("field", "groupBy" + column.field);
                    tdFilter.classList.add("groupBy" + column.field, "groupByFilter");
                    tdFilter.style.cssText += display;
                    tdFilterFragment.appendChild(tdFilter);

                    if (options.lockable)
                    {
                        let tdFilterLocked = document.createElement("td");
                        tdFilterLocked.setAttribute("field", "groupBy" + column.field);
                        tdFilterLocked.classList.add("groupBy" + column.field, "groupByFilter");
                        tdFilterLocked.style.cssText += display;
                        tdFilterLockedFragment.appendChild(tdFilterLocked);
                    }
                }

                puma(this._divFilters).find(".p-grid-filters")[0].appendChild(tdFilterFragment)
                if (options.lockable)
                    puma(this._divFiltersLocked).find(".p-grid-filters")[0].appendChild(tdFilterLockedFragment)
            }

            //#region Checkbox column
            if (options.checkboxes != GridCheckboxModeEnum.None)
            {
                let thCheckbox = document.createElement("td");
                puma(thCheckbox).attr("field", "vrGridCheckboxColumn");
                thCheckbox.style.cssText += "width: 20px;";

                if (this.thereAreLockedColumns())
                    puma(this._divFiltersLocked).find(".p-grid-filters").vrAppendPuma(thCheckbox);
                else
                    puma(this._divFilters).find(".p-grid-filters").vrAppendPuma(thCheckbox);
            }
            //#endregion

            //#region Columns
            let tdColumnFilterFragment = document.createDocumentFragment();
            let tdColumnFilterLockedFragment = document.createDocumentFragment();
            for (let column of options.columns)
            {
                //#region Create dictionary
                if (column.type != GridColumnTypeEnum.EditButton)
                    this._dictionaryDataValues.set(column.field, []);
                //#endregion

                let td = document.createElement("td");
                td.setAttribute("field", column.field);

                let tdWidth = String((column.width != null) ? column.width : ((column.fitSpace == true) ? this._fitSpaceColumnPercentage + "%" : (column.type == GridColumnTypeEnum.EditButton) ? 32 : 100));
                td.style.cssText += "width: " + tdWidth + "px;";

                if (column.fitSpace == true)
                    td.setAttribute("fitSpace", "true");

                //#region Filter type
                if ((column.type == GridColumnTypeEnum.Custom && column.filterable == null) || column.type == GridColumnTypeEnum.Color)
                    column.filterable = false;

                if (column.type != null && column.filterable !== false)
                {
                    switch (column.type)
                    {
                        case GridColumnTypeEnum.Checkbox:
                        case GridColumnTypeEnum.Boolean:
                            {
                                td.style.cssText += "text-align: center;";

                                let checkbox = document.createElement("input");
                                checkbox.id = element.id + "_CheckboxFilter_" + column.field;
                                checkbox.classList.add("vrCheckBox", "indeterminateVrCheckbox");
                                checkbox.setAttribute("type", "checkbox");
                                td.appendChild(checkbox);

                                let lblCheckbox = document.createElement("label");
                                lblCheckbox.classList.add("vrLabel", "vr-checkboxFilter-label");
                                lblCheckbox.setAttribute("for", element.id + "_CheckboxFilter_" + column.field);
                                td.appendChild(lblCheckbox);

                                //#region Create filter
                                checkbox.onclick = ((e: any) =>
                                {
                                    if (checkbox.checked && !checkbox.classList.contains("indeterminateVrCheckbox"))
                                    {
                                        checkbox.classList.add("indeterminateVrCheckbox");
                                        this.removeFilter(column.field);
                                        e.preventDefault();
                                    }
                                    else
                                    {
                                        checkbox.classList.remove("indeterminateVrCheckbox");

                                        let filterSettings = new GridFilterSettings();
                                        filterSettings.type = column.type!;
                                        filterSettings.checkboxFilterSettings = new GridCheckboxFilterSettings();
                                        filterSettings.checkboxFilterSettings.value = checkbox.checked;
                                        this.updateFilter(column.field, filterSettings, false);
                                        this.applyFilters(true);
                                    }
                                });
                                //#endregion
                            }
                            break;
                        case GridColumnTypeEnum.DateTime:
                        case GridColumnTypeEnum.Time:
                        case GridColumnTypeEnum.Date:
                        case GridColumnTypeEnum.LongDate:
                        case GridColumnTypeEnum.LongDateTime:
                        case GridColumnTypeEnum.LongWeekDate:
                        case GridColumnTypeEnum.ShortWeekDate:
                            {
                                td.style.cssText += "text-align: center;";

                                //#region Create filter
                                let dateFilter = createButton(
                                    {
                                        id: this._elementId + "_DateFilter_" + column.field,
                                        icon: IconClassicLight.Filter,
                                        tooltip: "Applica filtro",
                                        onClick: (e) =>
                                        {
                                            this.openWindowFiltering(column);
                                        }
                                    }, td);

                                let dateFilterRemove = createButton(
                                    {
                                        id: this._elementId + "_DateFilterRemove_" + column.field,
                                        icon: IconClassicRegular.Xmark,
                                        tooltip: "Rimuovi filtro",
                                        colorSettings: { background: "#CCC" },
                                        visible: false,
                                        cssContainer: "margin-left: 5px;",
                                        onClick: (e) =>
                                        {
                                            this.removeFilter(column.field);

                                            dateFilter.tooltip("");
                                            dateFilter.element().style.cssText += "background-color: #f3f3f3; color: #000;";
                                            dateFilterRemove.hide();
                                            this.recalculateHeight(true);
                                        }
                                    }, td);
                                //#endregion
                            }
                            break;
                        case GridColumnTypeEnum.Number:
                        case GridColumnTypeEnum.Currency:
                        case GridColumnTypeEnum.Percentage:
                        case GridColumnTypeEnum.Duration:
                            {
                                td.style.cssText += "text-align: center;";

                                //#region Create filter
                                let numberFilter = createButton(
                                    {
                                        id: this._elementId + "_NumberFilter_" + column.field,
                                        icon: IconClassicLight.Filter,
                                        tooltip: "Applica filtro",
                                        onClick: (e) =>
                                        {
                                            this.openWindowFiltering(column);
                                        }
                                    }, td);

                                let numberFilterRemove = createButton(
                                    {
                                        id: this._elementId + "_NumberFilterRemove_" + column.field,
                                        icon: IconClassicRegular.Xmark,
                                        tooltip: "Rimuovi filtro",
                                        colorSettings: { background: "#CCC" },
                                        visible: false,
                                        cssContainer: "margin-left: 5px;",
                                        onClick: (e) =>
                                        {
                                            this.removeFilter(column.field);

                                            numberFilter.tooltip("");
                                            numberFilter.element().style.cssText += "background-color: #f3f3f3; color: #000;";
                                            numberFilterRemove.hide();
                                            this.recalculateHeight(true);
                                        }
                                    }, td);
                                //#endregion
                            }
                            break;
                        case GridColumnTypeEnum.String:
                        case GridColumnTypeEnum.Custom:
                        case GridColumnTypeEnum.Label:
                            {
                                //#region Create filter
                                this._timeoutFilterText = 0;
                                let txtValue = createTextBox(
                                    {
                                        icon: (column.type == GridColumnTypeEnum.Custom) ? IconClassicLight.Search : undefined,
                                        placeholder: (column.type == GridColumnTypeEnum.Custom) ? "Cerca..." : undefined,
                                        width: (this.isRepeater()) ? "100%" : "Calc(100% - 27px)",
                                        attributes: [{ name: "field", value: column.field }],
                                        onPaste: (e) =>
                                        {
                                            clearTimeout(this._timeoutFilterText);
                                            let textToSearch = String(e.value).trim().toLowerCase();
                                            let field = e.sender.element().getAttribute("field")!;

                                            this.manageFilterTextByColumn(textToSearch, column, field, false);
                                        },
                                        onKeyUp: (e) =>
                                        {
                                            if (e.tabKey)
                                                return;

                                            //#region Filter button
                                            btnStringFilter.tooltip("");
                                            btnStringFilter.element().style.cssText += "background-color: #f3f3f3; color: #000;";
                                            btnStringFilterRemove.hide();

                                            if (this.isRepeater())
                                                e.sender.width("100%");
                                            else
                                                e.sender.width("Calc(100% - 27px)");
                                            //#endregion

                                            clearTimeout(this._timeoutFilterText);
                                            let textToSearch = e.sender.value<string>().toLowerCase();
                                            let field = e.sender.element().getAttribute("field")!;

                                            //#region Server binding
                                            if (options!.serverBinding !== false)
                                            {
                                                let filterSettings = new GridFilterSettings();
                                                filterSettings.type = column.type!;
                                                filterSettings.stringFilterSettings = new GridStringFilterSettings();
                                                filterSettings.stringFilterSettings.filterTypeEnum = GridStringFilterTypeEnum.IncludesFromSimpleSearch;
                                                filterSettings.stringFilterSettings.text = textToSearch.toLowerCase();

                                                if (e.key == KeyEnum.Enter)
                                                    this.updateFilter(column.field, filterSettings);

                                                return;
                                            }
                                            //#endregion

                                            if (textToSearch.length == 0)
                                            {
                                                this.removeFilter(e.sender.element().getAttribute("field")!, false);
                                                window.setTimeout(() =>
                                                {
                                                    if (column.filterWebService === true)
                                                        this.rebind(null, true);
                                                    else
                                                        this.applyFilters(true);
                                                }, 100);
                                                return;
                                            }

                                            this.manageFilterTextByColumn(textToSearch, column, field, e.backSpaceKey);
                                        }
                                    }, td, null, this._elementId + "_StringFilter_" + column.field);
                                //#endregion

                                //#region Create filter button
                                let btnStringFilter = createButton(
                                    {
                                        icon: IconClassicLight.Filter,
                                        tooltip: "Applica filtro",
                                        visible: !this.isRepeater(),
                                        onClick: (e) =>
                                        {
                                            this.openWindowFiltering(column);
                                        }
                                    }, td, null, this._elementId + "_StringFilterBtn_" + column.field);

                                let btnStringFilterRemove = createButton(
                                    {
                                        icon: IconClassicRegular.Xmark,
                                        tooltip: "Rimuovi filtro",
                                        colorSettings: { background: "#CCC" },
                                        visible: false,
                                        cssContainer: "margin-left: 5px;",
                                        onClick: (e) =>
                                        {
                                            this.removeFilter(column.field);

                                            btnStringFilter.tooltip("");
                                            btnStringFilter.element().style.cssText += "background-color: #f3f3f3; color: #000;";
                                            btnStringFilterRemove.hide();
                                            this.recalculateHeight(true);

                                            txtValue.width("Calc(100% - 27px");
                                        }
                                    }, td, null, this._elementId + "_StringFilterBtnRemove_" + column.field);
                                //#endregion
                            }
                            break;
                        default:
                            td.innerHTML = "";
                            break;
                    }
                }
                //#endregion

                // Append td
                if (options.lockable && column.locked)
                    tdColumnFilterLockedFragment.appendChild(td);
                else
                    tdColumnFilterFragment.appendChild(td);

                if (column.hidden === true)
                    td.style.display = "none";
            }

            puma(this._divFilters).find(".p-grid-filters")[0].appendChild(tdColumnFilterFragment)
            if (options.lockable)
                puma(this._divFiltersLocked).find(".p-grid-filters")[0].appendChild(tdColumnFilterLockedFragment)
            //#endregion

            if (options.lockable && this.thereAreLockedColumns())
                puma(this._divFilters).width("Calc(100% - " + (puma(this._divHeaderLocked).width() + 5) + "px)")
        }
        //#endregion

        //#region Totals
        if (this._showTotals)
        {
            puma(divTotals).show();
            puma(this._divTotals)[0].style.cssText += "display: inline-block";
            puma(this._divTotals).vrAppendPuma("<table class='p-grid'><thead><tr class='p-grid-totals'></tr></thead></table>");

            if (options.lockable)
            {
                puma(this._divTotalsLocked)[0].style.cssText += "display: inline-block";
                puma(this._divTotalsLocked).vrAppendPuma("<table class='p-grid p-grid-locked'><thead><tr class='p-grid-totals'></tr></thead></table>");
            }

            if (options.groupable! || options.groupBy != null)
            {
                let tdTotalsFragment = document.createDocumentFragment();
                let tdTotalsLockedFragment = document.createDocumentFragment();
                for (let column of options.columns!)
                {
                    let display = "";
                    if (options.groupBy == null || (!(options.groupBy.fields as GridGroupByItem[]).map(k => k.field).includes(column.field)))
                        display = "display: none;";

                    let tdTotals = document.createElement("td");
                    tdTotals.setAttribute("field", "groupBy" + column.field);
                    tdTotals.classList.add("groupBy" + column.field, "groupByTotal");
                    tdTotals.style.cssText += display;
                    tdTotalsFragment.appendChild(tdTotals);

                    if (options.lockable)
                    {
                        let tdTotalsLocked = document.createElement("td");
                        tdTotalsLocked.setAttribute("field", "groupBy" + column.field);
                        tdTotalsLocked.classList.add("groupBy" + column.field, "groupByTotal");
                        tdTotalsLocked.style.cssText += display;
                        tdTotalsLockedFragment.appendChild(tdTotalsLocked);
                    }
                }

                puma(this._divTotals).find(".p-grid-totals")[0].appendChild(tdTotalsFragment)
                if (options.lockable)
                    puma(this._divTotalsLocked).find(".p-grid-totals")[0].appendChild(tdTotalsLockedFragment)
            }

            //#region Checkbox column
            if (options.checkboxes != GridCheckboxModeEnum.None)
            {
                let thCheckbox = document.createElement("td");
                thCheckbox.setAttribute("field", "vrGridCheckboxColumn");
                thCheckbox.style.cssText += "width: 20px;";

                if (this.thereAreLockedColumns())
                    puma(this._divTotalsLocked).find(".p-grid-totals").vrAppendPuma(thCheckbox);
                else
                    puma(this._divTotals).find(".p-grid-totals").vrAppendPuma(thCheckbox);
            }
            //#endregion

            //#region Columns
            let tdColumnTotalsFragment = document.createDocumentFragment();
            let tdColumnTotalsLockedFragment = document.createDocumentFragment();
            for (let column of options.columns!)
            {
                let td = document.createElement("td");
                td.setAttribute("field", column.field);

                let tdWidth = String((column.width != null) ? column.width : ((column.fitSpace == true) ? this._fitSpaceColumnPercentage + "%" : (column.type == GridColumnTypeEnum.EditButton) ? 32 : 100));
                td.style.cssText += "width: " + tdWidth + "px;";

                if (column.fitSpace == true)
                    td.setAttribute("fitSpace", "true");

                //#region TextAlign
                let textAlign = GridAlignEnum.Right;
                switch (column.type)
                {
                    case GridColumnTypeEnum.Number:
                    case GridColumnTypeEnum.Currency:
                    case GridColumnTypeEnum.Percentage:
                        textAlign = GridAlignEnum.Right;
                        break;
                    case GridColumnTypeEnum.Duration:
                        textAlign = GridAlignEnum.Center;
                        break;
                    case GridColumnTypeEnum.Date:
                    case GridColumnTypeEnum.DateTime:
                    case GridColumnTypeEnum.Time:
                    case GridColumnTypeEnum.LongDate:
                    case GridColumnTypeEnum.LongDateTime:
                    case GridColumnTypeEnum.LongWeekDate:
                    case GridColumnTypeEnum.ShortWeekDate:
                        textAlign = GridAlignEnum.Center;
                        break;
                    case GridColumnTypeEnum.String:
                        textAlign = GridAlignEnum.Left;
                        break;
                }

                if (column.cellSettings != null)
                    textAlign = (column.cellSettings.textAlign != null) ? column.cellSettings.textAlign : textAlign;

                td.style.cssText += "text-align: " + textAlign + ";";
                //#endregion

                //#region Format
                if (column.aggregate != null && column.aggregate !== false)
                {
                    if (typeof (column.aggregate) == "boolean")
                    {
                        switch (column.type)
                        {
                            case GridColumnTypeEnum.Number: column.aggregate = GridAggregateMode.Sum; break;
                            case GridColumnTypeEnum.Currency: column.aggregate = GridAggregateMode.Sum; break;
                            case GridColumnTypeEnum.Duration: column.aggregate = GridAggregateMode.Sum; break;
                            case GridColumnTypeEnum.Percentage: column.aggregate = GridAggregateMode.Average; break;
                        }
                    }

                    //#region Type
                    switch (column.type)
                    {
                        case GridColumnTypeEnum.Number:
                            column.decimalDigits = (column.decimalDigits != null) ? column.decimalDigits : 0;
                            break;
                        case GridColumnTypeEnum.Currency:
                            column.decimalDigits = (column.decimalDigits != null) ? column.decimalDigits : 2;
                            break;
                        case GridColumnTypeEnum.Duration:
                            column.decimalDigits = (column.decimalDigits != null) ? column.decimalDigits : 0;
                            break;
                        case GridColumnTypeEnum.Percentage:
                            column.decimalDigits = (column.decimalDigits != null) ? column.decimalDigits : 2;
                            break;
                    }
                    //#endregion
                }
                //#endregion

                if (column.type == GridColumnTypeEnum.Custom && column.exportable == null)
                    column.exportable = false;

                //Append th
                if (options.lockable && column.locked)
                    tdColumnTotalsLockedFragment.appendChild(td);
                else
                    tdColumnTotalsFragment.appendChild(td);

                //Hidden
                if (column.hidden == true)
                    td.style.display = "none";
            }

            puma(this._divTotals).find(".p-grid-totals")[0].appendChild(tdColumnTotalsFragment)
            if (options.lockable)
                puma(this._divTotalsLocked).find(".p-grid-totals")[0].appendChild(tdColumnTotalsLockedFragment)
            //#endregion

            if (this.thereAreLockedColumns())
                puma(this._divTotals).width("Calc(100% - " + (puma(this._divHeaderLocked).width() + 5) + "px)")
        }
        else
            puma(this._divTotals).hide();

        if (options.lockable)
        {
            if (!this.thereAreLockedColumns())
            {
                if (this._divHeaderLocked != null) this._divHeaderLocked.style.cssText += "display: none;";
                if (this._divFiltersLocked != null) this._divFiltersLocked.style.cssText += "display: none;";
                if (this._divBodyLocked != null) this._divBodyLocked.style.cssText += "display: none;";
                if (this._divTotalsLocked != null) this._divTotalsLocked.style.cssText += "display: none;";
            }
            else
            {
                puma(this._divBody).width("Calc(100% - " + (puma(this._divHeaderLocked).width() + 5) + "px)")
                puma(this._divBodyLocked).width(puma(this._divHeaderLocked).width())
            }
        }
        //#endregion

        this._internalOptions = options;

        if (this._actualLayout != null)
            this.changeLayout();

        //#region DataSource
        if (options.dataSource != null)
            this.dataSource(options.dataSource);
        else
            this.recalculateHeight();
        //#endregion

        //#region Rebind
        if (options.rebind != null && options.rebind.rebindAtStartup === true)
            this.doWebApiCall(options.rebind, GridRequestTypeEnum.Rebind);
        //#endregion

        if (options.enable === false)
            this.enable(options.enable);

        //#region Column options
        let thHeaderList = Array.from<HTMLElement>(puma(this._divHeader).find("table th"));
        if (options.lockable)
            thHeaderList.vrPushRange(Array.from<HTMLElement>(puma(this._divHeaderLocked).find("table th")));

        this._columnOptions = [];
        for (let th of thHeaderList)
        {
            let columnPosition = new GridColumnPosition();
            columnPosition.field = th.getAttribute("field")!;
            columnPosition.left = th.offsetLeft;
            columnPosition.right = puma(th).offset().left + puma(th).width();
            columnPosition.index = puma(th).index();
            columnPosition.th = th;
            this._columnOptions.push(columnPosition);
        }
        //#endregion

        if (options.resizable)
            this.resizable();

        if (options.reorderable)
            this.draggableColumns();

        //#region GroupBy
        if (options.groupBy != null)
        {
            for (let groupByProperty of options.groupBy.fields as GridGroupByItem[])
                this._groupByActualValue[groupByProperty.field] = undefined
        }
        //#endregion

        puma(window).on("resize", () => 
        {
            this.recalculateHeight();
            this.recalculateWidth();
        });
    }

    //#region Methods

    //#region DataSource
    rebind(parameters?: any | null, filterWithWebService = false, keepInfo = true, loadingElement?: boolean | HTMLElement | JQuery | string): any
    {
        let promise = new Promise<void>((callback: Function) =>
        {
            //#region Filter with webService
            if (filterWithWebService)
            {
                let tableSearchingInfoList: GridSearchingInfo[] = [];
                this._dictionaryFilterConditions.forEach((value, key, dic) =>
                {
                    if (value.stringFilterSettings != null)
                    {
                        let tableSearchingInfo = new GridSearchingInfo();
                        tableSearchingInfo.field = key;
                        tableSearchingInfo.text = value.stringFilterSettings.text;
                        tableSearchingInfoList.push(tableSearchingInfo);
                    }
                });
                parameters = { tableSearchingInfoList: tableSearchingInfoList };
            }
            //#endregion

            let options = this.getOptions();
            if (options.rebind != null)
            {
                options.rebind.otherParameters = undefined;
                if (parameters != null)
                    options.rebind.otherParameters = parameters;

                //#region Keep info after rebind
                if (keepInfo)
                {
                    this._tempRebindInfo = new TempRebindInfo();
                    this._tempRebindInfo.checkedValues = this.getCheckedValues();
                    this._tempRebindInfo.page = this.pageSelected();
                    this._tempRebindInfo.yPosition = puma(this.container()).find(".grid_Body")[0].scrollTop;
                }
                else
                    this._tempRebindInfo = null;
                //#endregion

                (options.rebind as any).tempLoadingElement = loadingElement;

                this.clearSelection();
                this.doWebApiCall(options.rebind, GridRequestTypeEnum.Rebind, callback);
            }
        });
        return promise;
    }

    rebindSpecificRows(itemIdList: number[], update = true, keepInfo = true, loadingElement?: boolean | HTMLElement | JQuery | string)
    {
        let options = this.getOptions();
        if (options.rebind != null)
        {
            if (options.rebind.specificItemIdListPropertyName == null)
                options.rebind.specificItemIdListPropertyName = "specificItemIdList";

            options.rebind.otherParameters = {};
            options.rebind.otherParameters[options.rebind.specificItemIdListPropertyName] = itemIdList;
            options.rebind.otherParameters["update"] = update;
            (options.rebind as any).loadingElement = loadingElement;

            if (keepInfo)
            {
                //#region Keep info after rebind
                this._tempRebindInfo = new TempRebindInfo();
                this._tempRebindInfo.checkedValues = this.getCheckedValues();
                this._tempRebindInfo.page = this.pageSelected();
                this._tempRebindInfo.yPosition = puma(this.container()).find(".grid_Body")[0].scrollTop;
                //#endregion
            }

            this.clearSelection();
            this.doWebApiCall(options.rebind, GridRequestTypeEnum.RebindSpecificRows);
        }
    }

    clear(triggerChange = false, clearFilters = true)
    {
        this._vrDateTimeFields = [];

        if (this.dataSource().filter(k => k["defaultRow"] == null || k["defaultRow"] == false).length > 0)
        {
            if (clearFilters)
                this.clearFilters(false);

            this.dataSource([]);
            this.clearSelection(triggerChange);
        }
    }

    private manageDataSourceControls(GridControlData: GridControlData, className: string)
    {
        puma(this.element()).add(puma(this._elementLocked)).off("click", "." + className);
        puma(this.element()).add(puma(this._elementLocked)).on("click", "." + className, (e: any) =>
        {
            e.target.setAttribute("disabled", "disabled");
            let options = this.getOptions();
            let rowId = e.currentTarget.getAttribute("dataItemId")!;
            if (rowId == null)
                rowId = e.target.closest(".vrButton").getAttribute("dataItemId")!;

            let dataItem = this.dataSource()!.find(k => k[options.dataSourceFieldId!] == rowId);

            //#region Control settings
            let controlSettings: GridButtonSettings = new GridButtonSettings();
            switch (GridControlData.columnType)
            {
                case GridColumnTypeEnum.Button:
                case GridColumnTypeEnum.EditButton:
                    controlSettings = GridControlData.GridControlsSettings as GridButtonSettings;
                    break;
                case GridColumnTypeEnum.Icon:
                    controlSettings = GridControlData.GridControlsSettings as GridIconSettings;
                    break;
                case GridColumnTypeEnum.Custom:
                    controlSettings = GridControlData.GridControlsSettings as GridCustomSettings;
                    break;
                case GridColumnTypeEnum.Label:
                    controlSettings = GridControlData.GridControlsSettings as GridLabelSettings;
                    break;
            }
            //#endregion

            //#region Control click
            if (controlSettings != null)
            {
                let tableClickEvent = new GridControlsClickEvent();
                tableClickEvent.dataItem = dataItem;

                if (controlSettings.onClick != null && controlSettings.enabled !== false)
                {
                    if (controlSettings.confirmationMessage != null && controlSettings.confirmationMessage.length > 0)
                    {
                        confirm(controlSettings.confirmationMessage).then(() =>
                        {
                            controlSettings!.onClick!(tableClickEvent);
                        });
                    }
                    else
                        controlSettings!.onClick!(tableClickEvent);
                }
                else if (GridControlData.columnType == GridColumnTypeEnum.EditButton)
                    this.openAutoWindow(dataItem);

                window.setTimeout(() => e.target.removeAttribute("disabled"), 500);
            }
            //#endregion
            return false;
        });
    }

    private manageControls()
    {
        let controlList = [this._cellButtons, this._cellIcons, this._cellCustoms, this._cellLabels, this._cellImages];
        for (let control of controlList)
        {
            control.forEach((GridControlData: GridControlData, className: string) =>
            {
                this.manageDataSourceControls(GridControlData, className);
            });
        }
    }

    originalDataSource()
    {
        return this._originalDataSource;
    }

    dataSource(dataItems?: any[], clearFilters = false, keepInfo = true)
    {
        if (dataItems != null)
        {
            let options = this.getOptions();

            //#region DataSourceFieldId not defined
            if (dataItems.length > 0 && dataItems[0][options.dataSourceFieldId!] == null)					
            {
                let index = -1;
                for (let item of dataItems)
                {
                    item[options.dataSourceFieldId!] = index;
                    index--;
                }
                this._lastIndexAdded = index;
            }
            //#endregion

            //#region Manage vr.DateTime type
            this.fixDatasourceWithDate(dataItems);
            //#endregion

            //#region GroupBy & Filterable
            if (options.groupBy != null)
                this.sortingGroupFields(dataItems);

            if (options.sortBy != null)
            {
                let sortByField = (options.sortBy as GridSortSettings).field;
                this.sort(sortByField, (options.sortBy as GridSortSettings).direction, false);
            }

            this._originalDataSource = UtilityManager.duplicate(dataItems);
            if (options.filterable)
            {
                this._dictionaryDataValues.clear();
                window.setTimeout(() =>
                {
                    for (let column of options.columns!)
                    {
                        if (column.type != GridColumnTypeEnum.EditButton)
                            this._dictionaryDataValues.set(column.field, dataItems.map(k => String(k[column.field]).toLowerCase()));
                    }
                }, 200);
            }
            //#endregion

            //#region Keep info after rebind
            if (keepInfo)
            {
                this._tempRebindInfo = new TempRebindInfo();
                this._tempRebindInfo.checkedValues = this.getCheckedValues();
                this._tempRebindInfo.page = this.pageSelected();
                this._tempRebindInfo.yPosition = this.container().querySelector(".grid_Body")!.scrollTop;
            }
            //#endregion

            if (clearFilters)
            {
                this.clearFilters(false);
                this.setDataSource(dataItems);
            }
            else
            {
                if (options.serverBinding !== false)
                    this.setDataSource(dataItems);
                else
                    this.applyFilters(true, !options.serverBinding);
            }
        }

        if (this._dataSource == null)
            this._dataSource = [];

        return this._dataSource;
    }

    update(triggerDataBound = true, keepInfo = true)
    {
        //#region Keep info after rebind
        if (keepInfo)
        {
            this._tempRebindInfo = new TempRebindInfo();
            this._tempRebindInfo.checkedValues = this.getCheckedValues();
            this._tempRebindInfo.page = this.pageSelected();
            this._tempRebindInfo.yPosition = this.container().querySelector(".grid_Body")!.scrollTop;
        }
        //#endregion

        this.setDataSource(this.dataSource(), triggerDataBound);
    }

    private setDataSource(dataItems: any[], triggerDataBound = true)
    {
        let options = this.getOptions();
        this._dataSource = dataItems;

        this._rowCheckedIdList = this._rowCheckedIdList.filter(k => dataItems.map(j => String(j[options.dataSourceFieldId!])).includes(k));

        if (this._actualSortingInfo != null && !options.serverBinding)
            this.applySorting();
        else
        {
            this._cellButtons = new Map<string, GridControlData>();
            this._cellIcons = new Map<string, GridControlData>();
            this._cellCustoms = new Map<string, GridControlData>();
            this._cellLabels = new Map<string, GridControlData>();
            this._cellImages = new Map<string, GridControlData>();

            //#region Keep info after rebind
            if (this._tempRebindInfo != null && !options.serverBinding)
            {
                let page = this._tempRebindInfo.page;
                let checkedValues = this._tempRebindInfo.checkedValues;
                let yPosition = this._tempRebindInfo.yPosition;
                this._tempRebindInfo = null;

                this.pageSelected(page, false);
                this.drawTable(dataItems, triggerDataBound);
                this.manageControls();

                this.selectRows(checkedValues, undefined, false);
                this.container().querySelector(".grid_Body")!.scrollTo({ top: yPosition });
            }
            else
            {
                this.drawTable(dataItems, triggerDataBound);
                this.manageControls();
            }
            //#endregion
        }
    }

    private drawTable(dataItems: any[], triggerDataBound = true)
    {
        let options = this.getOptions();
        if (typeof (options.pageSize) == "boolean" || this._pageSizeUnlimited)
            options.pageSize = dataItems.length;

        if (typeof (options.pageSize) != "number" && options.pageSize != null)
            options.pageSize = (options.pageSize!.value != null) ? options.pageSize!.value : 50;

        //#region Body
        let tbody = this.element().getElementsByTagName("tbody")[0];
        if (this.element().getElementsByTagName("tbody").length == 0)
        {
            tbody = document.createElement("tbody");
            this.element().appendChild(tbody);
        }

        tbody.innerHTML = "";

        let tbodyLocked = null;
        if (options.lockable)
        {
            tbodyLocked = this._elementLocked.getElementsByTagName("tbody")[0];
            if (this._elementLocked.getElementsByTagName("tbody").length == 0)
            {
                tbodyLocked = document.createElement("tbody");
                this._elementLocked.appendChild(tbodyLocked);
            }

            tbodyLocked.innerHTML = "";
        }
        //#endregion

        //#region Rows
        let items: any[];
        let firstIndex: number;
        let lastIndex: number;
        if (!options.serverBinding)
        {
            firstIndex = (this.pageSelected() - 1) * options.pageSize!;
            lastIndex = this.pageSelected() * options.pageSize!;
            items = dataItems.slice(firstIndex, lastIndex);
        }
        else
        {
            items = dataItems;
            firstIndex = 0;
            lastIndex = dataItems.length - 1;
        }

        //#region Default row if empty
        if (items.length == 0)
        {
            let defaultRow: any = {};
            for (let column of options.columns!)
            {
                defaultRow[column.field] = null;
                defaultRow["defaultRow"] = true;
            }
            items.push(defaultRow);

            if (dataItems.length == 0)
                dataItems.push(defaultRow);
        }
        else
        {
            if (items.filter(k => k["defaultRow"] != null).length > 0)
                items.splice(0, 1);

            if (dataItems.filter(k => k["defaultRow"] != null).length > 0)
                dataItems.splice(0, 1);
        }
        //#endregion

        //#region GroupBy
        let visibleColumns = [];
        if (options.groupable! || options.groupBy != null)
        {
            this._groupByActualValue = {};
            visibleColumns = options.columns!.filter(k => k.hidden !== true);
        }
        //#endregion

        let i = (!options.serverBinding) ? ((this.pageSelected() - 1) * options.pageSize!) : 0;
        if (i > dataItems.length)
        {
            i = 0;
            this.pageSelected(1, false);
        }

        let rowFragment = document.createDocumentFragment();
        let rowFragmentLocked = document.createDocumentFragment();
        for (let row of items)
        {
            let dataItem = dataItems[i];
            if (dataItem == null)
                continue;

            let dataItemId = dataItem[options.dataSourceFieldId!];
            let rowId = "row" + i + "_" + dataItemId;

            //#region GroupBy
            let rowAdded = 0;
            if (options.groupable !== false && options.groupBy != null)
            {
                if ((options.groupBy as GridGroupBySettings).fields != null)
                {
                    let groupByIndex = 0;
                    for (let groupByField of ((options.groupBy as GridGroupBySettings).fields as GridGroupByItem[]))
                    {
                        let cellValue = row[groupByField.field];
                        let column = options.columns!.find(k => k.field == groupByField.field);

                        if (this._groupByActualValue[groupByField.field] !== cellValue)
                        {
                            if (rowAdded == 0)
                            {
                                for (let p = groupByIndex; p < ((options.groupBy as GridGroupBySettings).fields as GridGroupByItem[]).length; p++)
                                {
                                    options.groupBy = options.groupBy as GridGroupBySettings;
                                    this._groupByActualValue[(options.groupBy.fields as GridGroupByItem[])[p].field] = undefined;
                                }
                            }

                            //#region Add tr groupBy
                            let trGroupBy = document.createElement("tr");
                            trGroupBy.setAttribute("field", (cellValue == null || cellValue === "") ? "nosetted" : this.fixValueWithoutSpecialChars(cellValue));
                            trGroupBy.setAttribute("level", String(groupByIndex));
                            trGroupBy.classList.add("grid_trGroupBy", "p-grid-body");

                            if (options.rowHeight != 27)
                                trGroupBy.style.cssText += "height: " + options.rowHeight! + "px;";

                            rowFragment.appendChild(trGroupBy);

                            let trGroupByLocked = null;
                            if (options.lockable)
                            {
                                trGroupByLocked = document.createElement("tr");
                                trGroupByLocked.setAttribute("field", (cellValue == null || cellValue === "") ? "nosetted" : this.fixValueWithoutSpecialChars(cellValue));
                                trGroupByLocked.setAttribute("level", String(groupByIndex));
                                trGroupByLocked.classList.add("grid_trGroupBy", "grid_trGroupByLocked", "p-grid-body");

                                if (options.rowHeight != 27)
                                    trGroupByLocked.style.cssText += "height: " + options.rowHeight! + "px;";

                                rowFragmentLocked!.appendChild(trGroupByLocked);
                            }
                            //#endregion

                            rowAdded++;
                            if (groupByIndex > 0)
                            {
                                for (let p = 0; p < groupByIndex; p++)
                                {
                                    let groupByFieldValue = typeof (groupByField) == "string" ? groupByField : groupByField.field;

                                    let td = document.createElement("td");
                                    td.classList.add("groupBy" + groupByFieldValue);
                                    td.style.cssText += "width: 16px;";
                                    trGroupBy.appendChild(td);

                                    if (options.lockable)
                                    {
                                        let td = document.createElement("td");
                                        td.classList.add("groupBy" + groupByFieldValue);
                                        td.style.cssText += "width: 16px;";
                                        trGroupByLocked!.appendChild(td);
                                    }
                                }
                            }

                            //#region Group title
                            let cellText = String(cellValue);
                            if (column != null)
                            {
                                if (column.type == GridColumnTypeEnum.Date)
                                    cellText = (row[groupByField.field] == null) ? "" : Date.vrFixDateString(row[groupByField.field]).vrToItalyString();
                                else if (column.type == GridColumnTypeEnum.Checkbox || column.type == GridColumnTypeEnum.Boolean)
                                    cellText = (Boolean(row[groupByField.field])) ? "Sì" : "No";
                            }

                            let colspan = visibleColumns.length - groupByIndex + ((options.groupBy as GridGroupBySettings).fields as GridGroupByItem[]).length;
                            if (options.checkboxes == GridCheckboxModeEnum.None)
                                colspan -= 1;

                            let groupByDisplayText = cellText;
                            if (groupByField.displayField != null)
                                groupByDisplayText = row[groupByField.displayField!];

                            if (groupByField.displayValue != null)
                            {
                                let groupByDisplayValueEvent = new GridGroupDisplayValueEvent();
                                groupByDisplayValueEvent.sender = this;
                                groupByDisplayValueEvent.dataItem = row;
                                groupByDisplayValueEvent.field = groupByField.field;
                                groupByDisplayValueEvent.displayField = groupByField.displayField;
                                groupByDisplayText = groupByField.displayValue!(groupByDisplayValueEvent);
                            }

                            if (groupByDisplayText == null) groupByDisplayText = cellText;

                            let groupByCaret = IconClassicLight.CaretDown;
                            let groupByFieldValue = typeof (groupByField) == "string" ? groupByField : groupByField.field;

                            let tdExpandCollapse = document.createElement("td");
                            tdExpandCollapse.classList.add("grid_tdGroupByCollapse", "groupBy" + groupByFieldValue);
                            tdExpandCollapse.style.cssText += "width: 16px; border-right-color: transparent !important;";
                            tdExpandCollapse.innerHTML = "<i class='grid_tdGroupByCollapse " + groupByCaret + "'></i>";
                            trGroupBy.appendChild(tdExpandCollapse);

                            let tdGroupByName = document.createElement("td");
                            tdGroupByName.classList.add("grid_tdGroupByName");
                            tdGroupByName.style.cssText += "font-weight: 600;";
                            tdGroupByName.setAttribute("colspan", String(colspan));
                            trGroupBy.appendChild(tdGroupByName);

                            let divGroupByName = document.createElement("div");
                            divGroupByName.classList.add("grid_divGroupByName");
                            if (dataItems.length == 1 && dataItems[0]["defaultRow"] != null)
                                divGroupByName.innerHTML = "Nessun gruppo o elemento presente";
                            else
                            {
                                if (groupByDisplayText == null || groupByDisplayText === "" || groupByDisplayText == "null")
                                    divGroupByName.innerHTML = (groupByField.groupNameIfEmpty == null) ? "Non impostato" : groupByField.groupNameIfEmpty;
                                else
                                    divGroupByName.innerHTML = groupByDisplayText;
                            }
                            tdGroupByName.appendChild(divGroupByName);

                            if (options.lockable)
                            {
                                let tdExpandCollapse = document.createElement("td");
                                tdExpandCollapse.classList.add("grid_tdGroupByCollapse", "groupBy" + groupByFieldValue);
                                tdExpandCollapse.style.cssText += "width: 16px; border-right-color: transparent !important;";
                                tdExpandCollapse.innerHTML = "<i class='grid_tdGroupByCollapse " + groupByCaret + "'></i>";
                                trGroupByLocked!.appendChild(tdExpandCollapse);

                                let tdGroupByName = document.createElement("td");
                                tdGroupByName.classList.add("grid_tdGroupByName");
                                tdGroupByName.style.cssText += "font-weight: 600;";
                                tdGroupByName.setAttribute("colspan", String(colspan));
                                trGroupByLocked!.appendChild(tdGroupByName);

                                let divGroupByName = document.createElement("div");
                                divGroupByName.classList.add("grid_divGroupByName");
                                if (dataItems.length == 1 && dataItems[0]["defaultRow"] != null)
                                    divGroupByName.innerHTML = "Nessun gruppo o elemento presente";
                                else
                                {
                                    if (groupByDisplayText == null || groupByDisplayText === "" || groupByDisplayText == "null")
                                        divGroupByName.innerHTML = "Non impostato";
                                    else
                                        divGroupByName.innerHTML = groupByDisplayText;
                                }
                                tdGroupByName.appendChild(divGroupByName);
                            }

                            if (options.onGroupEditClick != null || groupByField.onEditClick != null)
                            {
                                let divEdit = document.createElement("div");
                                divEdit.style.cssText += "position: relative; display: inline-flex; margin-left: 6px; " + ((options.checkboxes !== false) ? "top: -4px;" : "");
                                divEdit.innerHTML = "<i class='grid_groupByEdit " + IconClassicLight.Pencil + "' style='cursor: pointer;'></i>";
                            }

                            this._groupByActualValue[groupByField.field] = cellValue;

                            if (this.thereAreLockedColumns())
                            {
                                let groupByEdit = trGroupBy.querySelector("i.grid_groupByEdit");
                                if (groupByEdit != null)
                                {
                                    if (groupByEdit.parentElement != null)
                                        groupByEdit.parentElement.style.display = "none";
                                }
                            }
                            //#endregion

                            //#region Checkbox group
                            if (groupByField.checkbox == null) groupByField.checkbox = true;
                            if (options.checkboxes != GridCheckboxModeEnum.None)
                            {
                                let checkboxContainer = trGroupBy.querySelector("div.grid_divGroupByName")!;
                                if (this.thereAreLockedColumns())
                                    checkboxContainer = trGroupByLocked!.querySelector("div.grid_divGroupByName")!;

                                createCheckBox(
                                    {
                                        visible: groupByField.checkbox,
                                        cssContainer: "margin-right: 5px;",
                                        onCheck: (e) =>
                                        {
                                            let parentGroupRow = e.sender.element().parentElement!.parentElement!.parentElement!.parentElement!;

                                            let childrenRows = this.getChildrenGroupRows(parentGroupRow, this._divBody);
                                            if (this.thereAreLockedColumns())
                                                childrenRows = this.getChildrenGroupRows(parentGroupRow, this._divBodyLocked);

                                            if (options!.onBeforeGroupCheck != null)
                                            {
                                                let beforeGroupCheckEvent = new GridBeforeGroupCheckEvent();
                                                beforeGroupCheckEvent.sender = this;
                                                beforeGroupCheckEvent.checked = e.checked;
                                                beforeGroupCheckEvent.childrenIdList = childrenRows.children.map(k => k.getAttribute("id")!.split("_")[1]);
                                                options!.onBeforeGroupCheck(beforeGroupCheckEvent);

                                                if (beforeGroupCheckEvent.isDefaultPrevented())
                                                    return;
                                            }

                                            if (e.checked)
                                                this.selectRows(childrenRows.children.map(k => k.getAttribute("id")!.split("_")[1]), undefined, false);
                                            else
                                                this.unselectRows(childrenRows.children.map(k => k.getAttribute("id")!.split("_")[1]), undefined, false);

                                            this.manageGroupCheckParent(childrenRows.children.vrLast().getElementsByClassName("vr-checkbox-column")[0] as HTMLElement);

                                            if (options!.onAfterGroupCheck != null)
                                            {
                                                let beforeGroupCheckEvent = new GridAfterGroupCheckEvent();
                                                beforeGroupCheckEvent.sender = this;
                                                beforeGroupCheckEvent.checked = e.checked;
                                                beforeGroupCheckEvent.childrenIdList = childrenRows.children.map(k => k.getAttribute("id")!.split("_")[1]);
                                                options!.onAfterGroupCheck(beforeGroupCheckEvent)
                                            }
                                        }
                                    }, checkboxContainer as HTMLElement, ControlPositionEnum.Before);
                            }
                            //#endregion

                            //#region Expand/Collapse
                            puma(trGroupBy).find("td.grid_tdGroupByCollapse").add(puma(trGroupByLocked).find("td.grid_tdGroupByCollapse")).click((e: any) =>
                            {
                                //#region Group icon
                                let icon = puma(e.currentTarget).find("i");
                                let collapse = icon.hasClass("fa-caret-down");
                                //#endregion

                                //#region Collapse/Expand
                                let childrenRows = this.getChildrenGroupRows(e.currentTarget.parentElement! as HTMLElement, this._divBody);
                                childrenRows.allRows.vrPushRange(this.getChildrenGroupRows(e.currentTarget.parentElement! as HTMLElement, this._divBodyLocked).allRows)

                                for (let childRow of childrenRows.allRows)
                                {
                                    if (collapse)
                                        puma(childRow).hide();
                                    else
                                    {
                                        puma(childRow).show();

                                        //#region Subgroup icon
                                        let childrenIcon = puma(childRow).find("i.grid_tdGroupByCollapse");
                                        childrenIcon.removeClass(IconClassicLight.CaretRight);
                                        childrenIcon.addClass(IconClassicLight.CaretDown);
                                        //#endregion
                                    }
                                }
                                //#endregion

                                //#region Icon
                                let indexIcon = puma(e.currentTarget.parentElement!).index() + 1;
                                let iconNormal = puma(puma(this._divBody).find("tr:nth-child(" + indexIcon + ")").find("i")[0]);
                                if (collapse)
                                {
                                    iconNormal.removeClass(IconClassicLight.CaretDown);
                                    iconNormal.addClass(IconClassicLight.CaretRight);

                                    if (options.lockable)
                                    {
                                        let iconLocked = puma(puma(this._divBodyLocked).find("tr:nth-child(" + indexIcon + ")").find("i")[0]);
                                        iconLocked.removeClass(IconClassicLight.CaretDown);
                                        iconLocked.addClass(IconClassicLight.CaretRight);
                                    }
                                }
                                else
                                {
                                    iconNormal.removeClass(IconClassicLight.CaretRight);
                                    iconNormal.addClass(IconClassicLight.CaretDown);

                                    if (options.lockable)
                                    {
                                        let iconLocked = puma(puma(this._divBodyLocked).find("tr:nth-child(" + indexIcon + ")").find("i")[0]);
                                        iconLocked.removeClass(IconClassicLight.CaretRight);
                                        iconLocked.addClass(IconClassicLight.CaretDown);
                                    }
                                }
                                //#endregion

                                if (options.onGroupExpandCollapse != null || groupByField.onExpandCollapse != null)
                                {
                                    let expandCollapseEvent = new GridGroupExpandCollapseEvent();
                                    expandCollapseEvent.sender = this;
                                    expandCollapseEvent.groupByField = groupByField.field;
                                    expandCollapseEvent.groupByDisplayField = groupByField.displayField;
                                    expandCollapseEvent.collapse = collapse;

                                    expandCollapseEvent.value = row[groupByField.field];
                                    if (groupByField.displayField != null)
                                        expandCollapseEvent.displayValue = row[groupByField.displayField!];

                                    let childrenItems: any[] = [];
                                    for (let childRow of childrenRows.allRows)
                                    {
                                        let dataItemId = puma(childRow).attr("dataitemid");
                                        let dataItem = this.dataSource().find(k => k[options.dataSourceFieldId!] == dataItemId);
                                        childrenItems.push(dataItem);
                                    }
                                    expandCollapseEvent.childrenItems = childrenItems;
                                    expandCollapseEvent.childrenRows = childrenRows.allRows;

                                    if (options.onGroupExpandCollapse != null)
                                        options.onGroupExpandCollapse(expandCollapseEvent);
                                    else if (groupByField.onExpandCollapse != null)
                                        groupByField.onExpandCollapse!(expandCollapseEvent);
                                }
                            });
                            //#endregion

                            //#region Edit click
                            puma(trGroupBy).find(".grid_groupByEdit").add(puma(trGroupByLocked).find(".grid_groupByEdit")).click((e: any) =>
                            {
                                if (options.onGroupEditClick != null || groupByField.onEditClick != null)
                                {
                                    let editClickEvent = new GridGroupEditClickEvent();
                                    editClickEvent.sender = this;
                                    editClickEvent.groupByField = groupByField.field;
                                    editClickEvent.groupByDisplayField = groupByField.displayField;

                                    editClickEvent.value = row[groupByField.field];
                                    if (groupByField.displayField != null)
                                        editClickEvent.displayValue = row[groupByField.displayField!];

                                    let childrenRows = this.getChildrenGroupRows(e.currentTarget.parentElement! as HTMLElement, this._divBody)
                                    let childrenItems: any[] = [];
                                    for (let childRow of childrenRows.allRows)
                                    {
                                        let dataItemId = puma(childRow).attr("dataitemid");
                                        let dataItem = this.dataSource().find(k => k[options.dataSourceFieldId!] == dataItemId);
                                        childrenItems.push(dataItem);
                                    }
                                    editClickEvent.childrenItems = childrenItems;
                                    editClickEvent.childrenRows = childrenRows.allRows;

                                    if (options.onGroupEditClick != null)
                                        options.onGroupEditClick(editClickEvent);
                                    else if (groupByField.onEditClick != null)
                                        groupByField.onEditClick!(editClickEvent);
                                }
                            });
                            //#endregion
                        }
                        groupByIndex++;
                    }
                }
            }
            //#endregion

            let tr = document.createElement("tr");
            tr.id = rowId;
            tr.classList.add("p-grid-body");
            tr.setAttribute("dataItemId", dataItemId)
            tr.setAttribute("row", String(i));

            let trLocked = null;
            if (options.lockable)
            {
                trLocked = document.createElement("tr");
                trLocked.id = rowId;
                trLocked.classList.add("p-grid-body");
                trLocked.setAttribute("dataItemId", dataItemId)
                trLocked.setAttribute("row", String(i))
            }

            //#region Checkbox column
            if (options.checkboxes != GridCheckboxModeEnum.None)
            {
                let tdCheckbox = document.createElement("td");
                tdCheckbox.style.cssText += "text-align: center; width: 20px;";
                tdCheckbox.classList.add("vrGridTdCheckboxColumn");
                tdCheckbox.setAttribute("field", "vrGridCheckboxColumn");

                let textHTML = "<input dataItemId='" + dataItemId + "' id='" + rowId + "_CheckboxColumn' class='vrCheckBox vr-checkbox-column' type='checkbox'></input>"
                    + "<label style='display: none;' class='vrLabel vrCheckBoxLabel vr-checkboxColumn-label' for='" + rowId + "_CheckboxColumn'></label>";
                tdCheckbox.innerHTML = textHTML;

                if (this.thereAreLockedColumns())
                    trLocked!.appendChild(tdCheckbox);
                else
                    tr.appendChild(tdCheckbox);

                tdCheckbox.onclick = ((e) =>
                {
                    if (e.shiftKey && options.checkboxes == GridCheckboxModeEnum.MultiCheck)
                        this.selectRangeShiftKey(tdCheckbox);
                    else
                        this.selectRowInternal(dataItemId, true, { fromCheckboxInput: true, fromGroupOrRow: false, fromMethodCall: false, shiftKey: false });
                });
            }
            //#endregion

            //#region Columns
            let k = (options.checkboxes != GridCheckboxModeEnum.None) ? 2 : 1;
            if (options.groupable! || options.groupBy != null)
                k += options.columns!.length;

            for (let column of options.columns!)
            {
                let td = document.createElement("td");

                let tdLocked = null;
                if (options.lockable)
                    tdLocked = document.createElement("td");

                let field = column.field;
                td.setAttribute("field", field);
                if (options.lockable) tdLocked!.setAttribute("field", field);

                //#region Width
                let width = (column.width != null) ? (column.width) : ((column.fitSpace == true) ? this._fitSpaceColumnPercentage + "%" : (column.type == GridColumnTypeEnum.EditButton) ? 32 : 100);
                td.style.cssText += "width: " + width + "px;";
                if (options.lockable) tdLocked!.style.cssText += "width: " + width + "px;";

                if (column.fitSpace == true)
                {
                    td.setAttribute("fitspace", "true");
                    if (options.lockable)
                        tdLocked!.setAttribute("fitSpace", "true");
                }
                //#endregion

                //#region Hidden
                if (column.hidden === true)
                {
                    td.style.display = "none";
                    tr.appendChild(td);

                    if (options.lockable)
                    {
                        tdLocked!.style.display = "none"
                        trLocked!.appendChild(tdLocked!);
                    }

                    k++;
                    continue;
                }
                //#endregion

                if (!options.multilineRows)
                {
                    td.classList.add("grid_singleLineGridRow");
                    if (options.lockable) tdLocked!.classList.add("grid_singleLineGridRow");
                }

                //#region Cell
                let textAlign = GridAlignEnum.Left;
                let textHTML = (row[field] == null) ? "" : String(row[field]);

                //#region Type
                switch (column.type)
                {
                    //#region Password
                    case GridColumnTypeEnum.PasswordViewable:
                        {
                            let result = "";
                            for (let char of textHTML)
                                result += "*";

                            textHTML = result;
                        }
                        break;
                    //#endregion

                    //#region Number, Currency, Percentage & Duration
                    case GridColumnTypeEnum.Number:
                    case GridColumnTypeEnum.Currency:
                    case GridColumnTypeEnum.Percentage:
                        {
                            textAlign = GridAlignEnum.Right;
                            let decimalDigits = (column.decimalDigits != null) ? column.decimalDigits : 0;
                            if (column.type == GridColumnTypeEnum.Currency || column.type == GridColumnTypeEnum.Percentage)
                                decimalDigits = (column.decimalDigits != null) ? column.decimalDigits : 2;

                            if (column.cellSettings == null) column.cellSettings = new GridCellSettings();
                            if (column.cellSettings.zeroIfNull == null) column.cellSettings.zeroIfNull = false;

                            if (textHTML === "" && column.cellSettings.zeroIfNull === false)
                                textHTML = "";
                            else
                            {
                                let valueFormatted = this.formatValue(Number(textHTML), column.type, decimalDigits, column.roundingSettings, undefined, column.milesSeparator);
                                textHTML = valueFormatted;
                            }
                        }
                        break;
                    case GridColumnTypeEnum.Duration:
                        {
                            textAlign = GridAlignEnum.Center;
                            if (column.cellSettings == null) column.cellSettings = new GridCellSettings();
                            if (column.cellSettings.zeroIfNull == null) column.cellSettings.zeroIfNull = false;

                            if (textHTML === "" && column.cellSettings.zeroIfNull === false)
                                textHTML = "";
                            else
                            {
                                let valueFormatted = this.formatValue(Number(textHTML), column.type, undefined, undefined, undefined, column.milesSeparator);
                                textHTML = valueFormatted;
                            }
                        }
                        break;
                    //#endregion

                    //#region Date, Time, DateTime
                    case GridColumnTypeEnum.Date:
                    case GridColumnTypeEnum.DateTime:
                    case GridColumnTypeEnum.Time:
                    case GridColumnTypeEnum.LongDate:
                    case GridColumnTypeEnum.LongDateTime:
                    case GridColumnTypeEnum.LongWeekDate:
                    case GridColumnTypeEnum.ShortWeekDate:
                        {
                            textAlign = GridAlignEnum.Center;
                            let date = new Date(textHTML);
                            let valueFormatted = this.formatValue(date, column.type, undefined, undefined, column.showSeconds);
                            textHTML = valueFormatted;
                        }
                        break;
                    //#endregion

                    //#region Checkbox
                    case GridColumnTypeEnum.Checkbox:
                    case GridColumnTypeEnum.Boolean:
                        {
                            let checked = (row[field] != null && Boolean(row[field]) == true) ? "checked='checked'" : "";

                            textAlign = GridAlignEnum.Center;
                            textHTML = "<input " + checked + " disabled='disabled' dataItemId='" + dataItemId + "' id='" + rowId + "_" + column.field + "' class='vrCheckBox' type='checkbox'></input>"
                                + "<label class='vrLabel vrCheckBoxLabel' for='" + rowId + "_" + column.field + "'></label>";
                        }
                        break;
                    //#endregion

                    //#region Button
                    case GridColumnTypeEnum.Button:
                    case GridColumnTypeEnum.EditButton:
                        {
                            let buttonSettings = null;
                            textAlign = GridAlignEnum.Center;

                            let className = "btn_" + column.field + "_" + rowId;

                            //#region Button settings
                            if (column.buttonSettings != null && (dataItem[options.dataSourceFieldId!] != null))
                            {
                                let templateEvent = new GridTemplateEvent();
                                templateEvent.dataItem = dataItem;
                                templateEvent.className = className;
                                templateEvent.element = td;
                                templateEvent.empty = (dataItem[options.dataSourceFieldId!] == null);
                                templateEvent.field = column.field;
                                templateEvent.sender = this;
                                buttonSettings = column.buttonSettings(templateEvent);
                            }

                            if (buttonSettings == null)
                            {
                                buttonSettings = new GridButtonSettings();
                                buttonSettings.text = "";
                                buttonSettings.value = column.field;
                            }
                            //#endregion

                            let customCss = "max-width: 100%;";
                            let buttonClass = "vrButton grid-button";

                            //#region Color
                            if (buttonSettings.isPrimaryButton == true)
                                customCss += "color: #FFF; background-color: #51B3E1;";

                            if (buttonSettings.color != null)
                                customCss += "color: " + buttonSettings.color + ";";
                            if (buttonSettings.backgroundColor != null)
                                customCss += "background-color: " + buttonSettings.backgroundColor + ";";
                            //#endregion

                            //#region Custom CSS & Class
                            if (buttonSettings.css != null)
                                customCss += buttonSettings.css;

                            if (buttonSettings.class != null)
                                buttonClass += " " + buttonSettings.class;
                            //#endregion

                            //#region Icon/Image
                            let iconClass = (column.type == GridColumnTypeEnum.EditButton) ? IconClassicLight.Pencil : "";
                            let spanIcon = "";
                            if (buttonSettings.icon != null)
                                iconClass = buttonSettings.icon;

                            let imageUrl = "";
                            let spanImage = "";
                            if (buttonSettings.imageUrl != null)
                                imageUrl = buttonSettings.imageUrl;

                            if (iconClass.length > 0)
                            {
                                let marginRight = (buttonSettings.text != null) ? "margin-right: 5px;" : "";
                                spanIcon = "<span style='" + marginRight + "'><i class='vrIcon " + iconClass + "'></i></span> ";
                            }
                            else if (imageUrl.length > 0)
                            {
                                let marginRight = (buttonSettings.text != null) ? "margin-right: 5px;" : "";
                                spanImage = "<img style='" + marginRight + "' src='" + imageUrl + "' />";
                            }
                            //#endregion

                            //#region Tooltip
                            let tooltip = (column.type == GridColumnTypeEnum.EditButton) ? "Premi per modificare la riga" : "";
                            if (buttonSettings.tooltip != null)
                                tooltip = buttonSettings.tooltip;
                            //#endregion

                            //#region Width
                            if (column.type == GridColumnTypeEnum.EditButton)
                                customCss += "width: 29px;";
                            //#endregion

                            //#region Enabled
                            let disabled = "";
                            if (buttonSettings.enabled === false)
                            {
                                disabled = " disabled='disabled' ";
                                customCss += "opacity: 0.5; cursor: default;";
                            }
                            //#endregion

                            this._cellButtons.set(className, { GridControlsSettings: buttonSettings, columnType: column.type });

                            let buttonText = (buttonSettings.text != null) ? buttonSettings.text : "";
                            textHTML = "<button title='" + tooltip + "' style='" + customCss + "' class='" + buttonClass + " " + className + "' dataItemId='" + dataItemId + "' id='" + rowId + "_" + column.field + "'" + disabled + ">" + spanIcon + spanImage + buttonText + "</button>";

                            if (buttonSettings.visible === false)
                                textHTML = "";
                        }
                        break;
                    //#endregion

                    //#region Custom
                    case GridColumnTypeEnum.Custom:
                        {
                            let customSettings = null;
                            textAlign = GridAlignEnum.Center;

                            let className = "btn_" + column.field + "_" + rowId;

                            //#region Custom settings
                            if (column.customSettings != null && (dataItem[options.dataSourceFieldId!] != null))
                            {
                                let templateEvent = new GridTemplateEvent();
                                templateEvent.dataItem = dataItem;
                                templateEvent.className = className;
                                templateEvent.element = td;
                                templateEvent.empty = (dataItem[options.dataSourceFieldId!] == null);
                                templateEvent.field = column.field;
                                templateEvent.sender = this;
                                customSettings = column.customSettings(templateEvent);
                            }

                            if (customSettings == null)
                            {
                                customSettings = new GridCustomSettings();
                                customSettings.value = column.field;
                                customSettings.template = "<div></div>";
                            }

                            let customCss = "";
                            if (customSettings.css != null)
                                customCss += customSettings.css;
                            //#endregion

                            this._cellCustoms.set(className, { GridControlsSettings: customSettings, columnType: column.type });
                            if (customSettings.template !== "")
                                textHTML = "<div style='" + customCss + "'>" + customSettings.template + "</div>";

                            if (customSettings.visible === false)
                                textHTML = "";
                        }
                        break;
                    //#endregion

                    //#region Icon
                    case GridColumnTypeEnum.Icon:
                        {
                            let iconSettings = null;
                            textAlign = GridAlignEnum.Center;

                            let className = "btn_" + column.field + "_" + rowId;

                            //#region Icon settings
                            if (column.iconSettings != null && (dataItem[options.dataSourceFieldId!] != null))
                            {
                                let templateEvent = new GridTemplateEvent();
                                templateEvent.dataItem = dataItem;
                                templateEvent.className = className;
                                templateEvent.element = td;
                                templateEvent.empty = (dataItem[options.dataSourceFieldId!] == null);
                                templateEvent.field = column.field;
                                templateEvent.sender = this;
                                iconSettings = column.iconSettings(templateEvent);
                            }

                            if (iconSettings == null)
                            {
                                iconSettings = new GridIconSettings();
                                iconSettings.value = column.field;
                            }
                            //#endregion

                            let customCss = "";
                            let iconCustomClass = "";

                            //#region Color
                            if (iconSettings.color != null)
                                customCss += "color: " + iconSettings.color + ";";
                            //#endregion

                            //#region Custom CSS & Class
                            if (iconSettings.css != null)
                                customCss += iconSettings.css;

                            if (iconSettings.class != null)
                                iconCustomClass += " " + iconSettings.class;
                            //#endregion

                            //#region Tooltip
                            let tooltip = "";
                            if (iconSettings.tooltip != null)
                                tooltip = iconSettings.tooltip;
                            //#endregion

                            //#region Click
                            if (iconSettings.onClick != null && iconSettings.enabled !== false)
                                customCss += "cursor: pointer;";
                            //#endregion

                            //#region Icon or Image url
                            let icon = "";
                            let imageUrl = "";
                            if (iconSettings.icon != null)
                                icon = "<i class='vrIcon " + iconSettings.icon + "'></i>";
                            else if (iconSettings.imageUrl != null)
                                imageUrl = "<img src='" + iconSettings.imageUrl + "' />";
                            else
                                icon = "<i class='vrIcon " + row[field] + "'></i>";
                            //#endregion

                            this._cellIcons.set(className, { GridControlsSettings: iconSettings, columnType: column.type });

                            textHTML = "<span title='" + tooltip + "' style='" + customCss + "' class='" + iconCustomClass + " " + className + "' dataItemId='" + dataItemId + "' id='" + rowId + "_" + column.field + "'>" + icon + imageUrl + "</span>";

                            if (iconSettings.visible === false)
                                textHTML = "";
                        }
                        break;
                    //#endregion

                    //#region Image
                    case GridColumnTypeEnum.Image:
                        {
                            let imageSettings = null;
                            textAlign = GridAlignEnum.Center;

                            let className = "btn_" + column.field + "_" + rowId;

                            //#region Image settings
                            if (column.imageSettings != null && (dataItem[options.dataSourceFieldId!] != null))
                            {
                                let templateEvent = new GridTemplateEvent();
                                templateEvent.dataItem = dataItem;
                                templateEvent.className = className;
                                templateEvent.element = td;
                                templateEvent.empty = (dataItem[options.dataSourceFieldId!] == null);
                                templateEvent.field = column.field;
                                templateEvent.sender = this;
                                imageSettings = column.imageSettings(templateEvent);
                            }

                            if (imageSettings == null)
                            {
                                imageSettings = new GridImageSettings();
                                imageSettings.value = column.field;
                            }
                            //#endregion

                            let customCss = "";
                            let imageCustomClass = "";

                            //#region Custom CSS & Class
                            if (imageSettings.css != null)
                                customCss += imageSettings.css;

                            if (imageSettings.class != null)
                                imageCustomClass += " " + imageSettings.class;
                            //#endregion

                            //#region Tooltip
                            let tooltip = "";
                            if (imageSettings.tooltip != null)
                                tooltip = imageSettings.tooltip;
                            //#endregion

                            //#region Click
                            if (imageSettings.onClick != null && imageSettings.enabled !== false)
                                customCss += "cursor: pointer;";
                            //#endregion

                            //#region Icon or Image url
                            let imageUrl = textHTML;
                            if (imageSettings.imageUrl != null)
                                imageUrl = imageSettings.imageUrl;
                            //#endregion

                            this._cellImages.set(className, { GridControlsSettings: imageSettings, columnType: column.type });

                            let url = imageUrl;
                            if (imageSettings.base64Bytes != null)
                                url = "data:image/png;base64," + imageSettings.base64Bytes;

                            textHTML = "<img title='" + tooltip + "' style='" + customCss + "' class='" + imageCustomClass + " " + className + "' dataItemId='" + dataItemId + "' id='" + rowId + "_" + column.field + "' src='" + url + "' />";

                            if (imageSettings.visible === false)
                                textHTML = "";
                        }
                        break;
                    //#endregion

                    //#region Label
                    case GridColumnTypeEnum.Label:
                        {
                            let labelSettings = null;
                            textAlign = GridAlignEnum.Left;

                            let className = "lbl_" + column.field + "_" + rowId;

                            //#region Label settings
                            if (column.labelSettings != null && (dataItem[options.dataSourceFieldId!] != null))
                            {
                                let templateEvent = new GridTemplateEvent();
                                templateEvent.dataItem = dataItem;
                                templateEvent.className = className;
                                templateEvent.element = td;
                                templateEvent.empty = (dataItem[options.dataSourceFieldId!] == null);
                                templateEvent.field = column.field;
                                templateEvent.sender = this;
                                labelSettings = column.labelSettings(templateEvent);
                            }

                            if (labelSettings == null)
                            {
                                labelSettings = new GridLabelSettings();
                                labelSettings.value = column.field;
                            }
                            //#endregion

                            let customCss = "";

                            //#region Color
                            if (labelSettings.color != null)
                                customCss += "color: " + labelSettings.color + ";";
                            //#endregion

                            //#region Custom CSS & Class
                            if (labelSettings.css != null)
                                customCss += labelSettings.css;
                            //#endregion

                            //#region Tooltip
                            let tooltip = "";
                            if (labelSettings.tooltip != null)
                                tooltip = labelSettings.tooltip;
                            //#endregion

                            //#region Click
                            if (labelSettings.onClick != null && labelSettings.enabled !== false)
                                customCss += "cursor: pointer;";
                            //#endregion

                            //#region Bold
                            if (labelSettings.bold === true)
                                customCss += "font-weight: 500;";
                            //#endregion

                            //#region Underline mode
                            let underlineOnFocus = "";
                            if (labelSettings.underlineMode != null)
                            {
                                switch (labelSettings.underlineMode)
                                {
                                    case GridLabelUnderlineMode.Always: customCss += "text-decoration: underline"; break;
                                    case GridLabelUnderlineMode.None: customCss += "text-decoration: none"; break;
                                    case GridLabelUnderlineMode.OnFocus: underlineOnFocus = "grid_labelhover"; break;
                                }
                            }
                            //#endregion

                            //#region NoBr
                            if (labelSettings.noBr !== false)
                            {
                                if (labelSettings.noBr === true)
                                {
                                    customCss += "white-space: nowrap; overflow:hidden; margin-bottom: -6px; text-overflow: ellipsis; display: inline-block;";
                                }
                                else
                                    customCss += "overflow: hidden; display: -webkit-inline-box; -webkit-line-clamp: " + labelSettings.noBr + "; -webkit-box-orient: vertical;white-space: pre-wrap; white-space: -moz-pre-wrap; white-space: -pre-wrap; white-space: -o-pre-wrap; word-wrap: break-word;";
                            }
                            //#endregion

                            //#region Icon or Image url
                            let icon = "";
                            if (labelSettings.icon != null)
                                icon = "<i class='vrIcon " + labelSettings.icon + "'></i> ";
                            //#endregion

                            this._cellLabels.set(className, { GridControlsSettings: labelSettings, columnType: column.type });

                            textHTML = icon + "<label title='" + tooltip + "' style='" + customCss + "' class='" + className + " " + underlineOnFocus + "' dataItemId='" + dataItemId + "' id='" + rowId + "_" + column.field + "'>" + labelSettings.text + "</label>";

                            if (labelSettings.visible === false)
                                textHTML = "";
                        }
                        break;
                    //#endregion

                    //#region ComboBox, DropDownList, DropDownTree
                    case GridColumnTypeEnum.ComboBox:
                    case GridColumnTypeEnum.DropDownList:
                    case GridColumnTypeEnum.DropDownTree:
                    case GridColumnTypeEnum.DropDownTreeCheckboxes:
                        {
                            textAlign = GridAlignEnum.Left;
                            if (column.displayField != null)
                                textHTML = row[column.displayField];
                        }
                        break;
                    //#endregion

                    //#region Color
                    case GridColumnTypeEnum.Color:
                        {
                            textAlign = GridAlignEnum.Center;
                            if (textHTML.vrIsNotNullOrEmpty())
                                textHTML = "<i class='" + IconClassicSolid.Circle + "' style='height: 20px; color: " + textHTML + "; display: inline-flex; align-items: center;'></i>";
                        }
                        break;
                    //#endregion
                }
                //#endregion

                //#region Text
                if (row["defaultRow"] === true)
                {
                    textHTML = "";
                    if (tr.getAttribute("defaultrow") == null)
                        tr.setAttribute("defaultrow", "defaultrow");
                }

                if (td.innerHTML === "")
                    td.innerHTML = textHTML;

                if (options.lockable && tdLocked!.innerHTML === "")
                    tdLocked!.innerHTML = textHTML;
                //#endregion

                //#region Color
                if (column.cellSettings != null)
                {
                    if (column.cellSettings.backgroundColor != null)
                    {
                        td.style.cssText += "background-color: " + column.cellSettings.backgroundColor + ";";
                        if (options.lockable) tdLocked!.style.cssText += "background-color: " + column.cellSettings.backgroundColor + ";";
                    }

                    if (column.cellSettings.color != null)
                    {
                        td.style.cssText += "color: " + column.cellSettings.color + ";";
                        if (options.lockable) tdLocked!.style.cssText += "color: " + column.cellSettings.color + ";";
                    }

                    if (column.cellSettings.css != null)
                    {
                        td.style.cssText += column.cellSettings.css + ";";
                        if (options.lockable) tdLocked!.style.cssText += column.cellSettings.css + ";";
                    }
                }

                if (options.rowColorProperty != null && row[options.rowColorProperty] != null && row[options.rowColorProperty] !== "")
                {
                    td.style.cssText += "background-color: " + row[options.rowColorProperty] + ";";
                    if (options.lockable) tdLocked!.style.cssText += "background-color: " + row[options.rowColorProperty] + ";";
                }

                if (options.rowTextColorProperty != null && row[options.rowTextColorProperty] != null && row[options.rowTextColorProperty] !== "")
                {
                    td.style.cssText += "color: " + row[options.rowTextColorProperty] + ";";
                    if (options.lockable) tdLocked!.style.cssText += "color: " + row[options.rowTextColorProperty] + ";";
                }
                //#endregion

                //#region Text align
                if (column.cellSettings != null)
                    textAlign = (column.cellSettings.textAlign != null) ? column.cellSettings.textAlign : textAlign;

                if (textAlign != GridAlignEnum.Left)
                {
                    td.style.cssText += "text-align: " + textAlign + ";";
                    if (options.lockable) tdLocked!.style.cssText += "text-align: " + textAlign + ";";
                }
                //#endregion

                //#region Tooltip
                if (options.tooltip === true && column.type != GridColumnTypeEnum.Custom)
                {
                    let tooltip = "";
                    if (column.cellSettings != null)
                    {
                        if (column.cellSettings.tooltip === true)
                            tooltip = (column.title == null) ? "" : column.title;
                        else if (typeof (column.cellSettings.tooltip) == "string")
                            tooltip = column.cellSettings.tooltip;
                        else if (typeof (column.cellSettings.tooltip) == "function")
                        {
                            let tooltipEvent = new GridTooltipEvent();
                            tooltipEvent.dataItem = dataItem;
                            tooltipEvent.element = td;
                            tooltipEvent.empty = (dataItem[options.dataSourceFieldId!] == null);
                            tooltip = column.cellSettings.tooltip(tooltipEvent);
                        }
                    }

                    if (tooltip == null || tooltip.length == 0)
                        tooltip = textHTML;

                    if (tooltip != null && tooltip.length > 0)
                    {
                        td.setAttribute("title", puma("<span>" + tooltip + "</span>").text())
                        if (options.lockable) tdLocked!.setAttribute("title", puma("<span>" + tooltip + "</span>").text())
                    }
                }
                //#endregion

                //#region Bold
                if (column.bold === true)
                {
                    td.style.cssText += "font-weight: 600;";
                    if (options.lockable) tdLocked!.style.cssText += "font-weight: 600;";
                }
                //#endregion

                //#endregion

                // Append td
                if (options.lockable && column.locked)
                    trLocked!.appendChild(tdLocked!)
                else
                    tr.appendChild(td);

                k++;
            }
            //#endregion

            //#region GroupBy
            if (options.groupable! || options.groupBy != null)
            {
                for (let i = options.columns!.length - 1; i >= 0; i--)
                {
                    let column = options.columns![i];

                    let display = "";
                    if (options.groupBy == null || (options.groupBy as GridGroupBySettings).fields == null || ((options.groupBy as GridGroupBySettings).fields != null && !((options.groupBy as GridGroupBySettings).fields as GridGroupByItem[]).map(k => k.field).includes(column.field)))
                        display = "display: none;";

                    let tdGroupBy = document.createElement("td");
                    tdGroupBy.style.cssText += display + "; width: 16px;";
                    tdGroupBy.classList.add("groupBy" + column.field);
                    tr.insertBefore(tdGroupBy, tr.firstChild);

                    if (options.lockable)
                    {
                        let tdGroupByLocked = document.createElement("td");
                        tdGroupByLocked.style.cssText += display + "; width: 16px;";
                        tdGroupByLocked.classList.add("groupBy" + column.field);
                        trLocked!.insertBefore(tdGroupByLocked, trLocked!.firstChild);
                    }
                }
            }
            //#endregion

            if (options.rowHeight != 27)
                tr.style.cssText += "height: " + options.rowHeight! + "px;";

            //#region Select row
            if (options.checkboxes != GridCheckboxModeEnum.None)
            {
                puma(tr).add(puma(trLocked)).off("click");
                puma(tr).add(puma(trLocked)).click((e: any) =>
                {
                    if (e.shiftKey && options.checkboxes == GridCheckboxModeEnum.MultiCheck)
                        this.selectRangeShiftKey(e.target);
                    else
                    {
                        if (!puma(e.target).is("input") && !puma(e.target).hasClass("vrButton") && !puma(e.target).hasClass("vrIcon"))
                            this.selectRowInternal(dataItemId, true, { fromCheckboxInput: false, fromGroupOrRow: true, fromMethodCall: false, shiftKey: false });
                    }
                });
            }
            else
            {
                puma(tr).add(puma(trLocked)).off("click");
                puma(tr).add(puma(trLocked)).click((e: any) =>
                {
                    //#region Event
                    if (options.onSelectRow != null)
                    {
                        let selectRowEvent = new GridSelectRowEvent();
                        selectRowEvent.sender = this;
                        selectRowEvent.rowElement = e.currentTarget;
                        selectRowEvent.dataItem = dataItem;
                        selectRowEvent.checked = true;
                        selectRowEvent.empty = (dataItem[options.dataSourceFieldId!] == null);
                        options.onSelectRow(selectRowEvent);
                    }
                    //#endregion
                });
            }
            //#endregion

            //#region OnRowDataBound
            if (options.onRowDataBound != null)
            {
                let onRowDataBoundEvent = new GridOnRowDataBoundEvent();
                onRowDataBoundEvent.sender = this;
                onRowDataBoundEvent.rowElement = tr;

                let dataItem: any = {};
                for (let property of Object.getOwnPropertyNames(row))
                    dataItem[property] = row[property];

                onRowDataBoundEvent.dataItem = dataItem;
                onRowDataBoundEvent.realDataItem = row;
                onRowDataBoundEvent.empty = (dataItem[options.dataSourceFieldId!] == null);

                let backgroundColor = options.onRowDataBound(onRowDataBoundEvent);
                if (backgroundColor != null && backgroundColor.length > 0)
                {
                    Array.from(tr.getElementsByTagName("td")).forEach((td) => td.style.cssText += "background-color: " + backgroundColor + ";");
                    if (options.lockable)
                        Array.from(trLocked!.getElementsByTagName("td")).forEach((td) => td.style.cssText += "background-color: " + backgroundColor + ";");
                }
            }
            //#endregion

            // Append tr
            rowFragment.appendChild(tr);
            if (options.lockable)
                rowFragmentLocked.appendChild(trLocked!);

            i++;
        }

        tbody.appendChild(rowFragment);
        if (options.lockable)
            tbodyLocked!.appendChild(rowFragmentLocked);
        //#endregion

        //#region OnDataBound
        if (options.onDataBound != null && triggerDataBound)
        {
            let onDataBoundEvent = new GridOnDataBoundEvent();
            onDataBoundEvent.sender = this;
            options.onDataBound(onDataBoundEvent);
        }
        //#endregion

        this._actualPageSize = options.pageSize!;
        window.setTimeout(() =>
        {
            //#region Footer
            if (options.footer !== false)
            {
                let divPagination = document.getElementById(this._elementId + "_footerPagination")!;
                divPagination.innerHTML = "";
                let footer = options.footer as GridFooterSettings;

                let maxLength = (options.serverBinding !== false) ? this._responseForServerBinding[(options.serverBinding! as GridServerBindSettings).itemCountPropertyName!] : dataItems.length;
                if (options.pageSize! < maxLength)
                {
                    let pageSelected = this.pageSelected();
                    let numberOfPages = Math.trunc(maxLength / Number(options.pageSize!));
                    if (maxLength % Number(options.pageSize!) > 0)
                        numberOfPages += 1;

                    //#region Pages
                    if (footer.showPagination && options.pageSize! != 0)
                    {
                        let spanPagination = document.createElement("span");
                        spanPagination.id = this._elementId + "_divPagination";
                        spanPagination.classList.add("p-grid-pagination");
                        divPagination.appendChild(spanPagination);

                        //#region Previous buttons
                        createButton(
                            {
                                icon: IconClassicLight.Backward,
                                css: "border-left: none; border-top-left-radius: 5px; border-bottom-left-radius: 5px;",
                                onClick: (e) =>
                                {
                                    this.pageSelected(1);
                                }
                            }, spanPagination);

                        createButton(
                            {
                                icon: IconClassicLight.BackwardStep,
                                onClick: (e) =>
                                {
                                    let pageToSelect = this.pageSelected() - 1;
                                    if (pageToSelect < 1)
                                        pageToSelect = 1;

                                    this.pageSelected(pageToSelect);
                                }
                            }, spanPagination);
                        //#endregion

                        //#region Index
                        let maxVisiblePages = (options.footer! as GridFooterSettings).maxVisiblePages!;
                        let startingIndex = 1;
                        if (pageSelected % maxVisiblePages == 0)
                            startingIndex = (((pageSelected / maxVisiblePages) - 1) * maxVisiblePages) + 1;
                        else
                            startingIndex = (Math.trunc(pageSelected / maxVisiblePages) * maxVisiblePages) + 1;

                        let endIndex = 0;
                        let noMore = false;
                        if (numberOfPages <= maxVisiblePages)
                        {
                            endIndex = startingIndex + numberOfPages;
                            noMore = true;
                        }
                        else
                            endIndex = startingIndex + maxVisiblePages;

                        if (endIndex >= (numberOfPages + 1))
                        {
                            endIndex = (numberOfPages + 1);
                            noMore = true;
                        }
                        //#endregion

                        //#region Page numbers
                        if (startingIndex > 1)
                        {
                            let button = document.createElement("button");
                            button.id = this._elementId + "_btnPage_" + (startingIndex - 1);
                            button.innerHTML = "...";
                            button.onclick = (e) => 
                            {
                                this.pageSelected(startingIndex - 1);
                                return false;
                            }
                            spanPagination.appendChild(button);
                        }

                        let buttonsFragment = document.createDocumentFragment();
                        for (let i = startingIndex; i <= endIndex; i++)
                        {
                            if (i == endIndex && noMore)
                                break;

                            let button = document.createElement("button");
                            button.id = this._elementId + "_btnPage_" + i;
                            button.style.cssText += "cursor: pointer;";
                            button.innerHTML = (i == endIndex) ? ((startingIndex == endIndex) ? String(i) : "...") : String(i);
                            if (i == pageSelected)
                                button.classList.add("p-grid-pageSelected");

                            button.onclick = (e) =>
                            {
                                this.pageSelected(i);
                                return false;
                            };
                            buttonsFragment.appendChild(button);
                        }
                        spanPagination.appendChild(buttonsFragment);
                        //#endregion

                        //#region Next buttons
                        createButton(
                            {
                                icon: IconClassicLight.ForwardStep,
                                onClick: (e) =>
                                {
                                    let pageToSelect = this.pageSelected() + 1;
                                    if (pageToSelect > numberOfPages)
                                        pageToSelect = numberOfPages;

                                    this.pageSelected(pageToSelect);
                                }
                            }, spanPagination);

                        createButton(
                            {
                                icon: IconClassicLight.Forward,
                                css: "border-top-right-radius: 5px; border-bottom-right-radius: 5px;",
                                onClick: (e) =>
                                {
                                    this.pageSelected(numberOfPages);
                                }
                            }, spanPagination);
                        //#endregion
                    }
                    //#endregion

                    //#region Total elements
                    if (footer.totalElements)
                    {
                        let spanTotalElements = document.createElement("span");
                        spanTotalElements.id = this._elementId + "TotalsLabel";
                        spanTotalElements.classList.add("p-grid-totalElements");
                        divPagination.appendChild(spanTotalElements);

                        if (footer.cartSettings != null)
                            spanTotalElements.style.cssText += "right: 50px;";

                        if (typeof (footer.totalElements) == "boolean" && footer.totalElements === true)
                        {
                            if (options.pageSize == 0)
                                spanTotalElements.innerHTML = "Nessun elemento";
                            else
                            {
                                if (lastIndex > maxLength)
                                    lastIndex = maxLength;

                                let pagesText = firstIndex + " - " + lastIndex + " di " + maxLength + ((maxLength == 1) ? " elemento" : " elementi") +
                                    " - " + pageSelected + " di " + numberOfPages + " pagine";

                                if (options.serverBinding !== false)
                                {
                                    let indexFrom = Number(options.pageSize!) * (this.pageSelected() - 1) + 1;
                                    let indexTo = Number(options.pageSize!) * (this.pageSelected() - 1) + dataItems.length;

                                    pagesText = indexFrom + " - " + indexTo + " di " + maxLength + ((maxLength == 1) ? " elemento" : " elementi") +
                                        " - " + pageSelected + " di " + numberOfPages + " pagine";
                                }

                                spanTotalElements.innerHTML = pagesText;
                            }
                        }
                        else
                        {
                            let totalElementTemplateEvent = new GridTotalElementTemplateEvent();
                            totalElementTemplateEvent.dataItems = dataItems;
                            totalElementTemplateEvent.firstIndex = firstIndex;
                            totalElementTemplateEvent.lastIndex = lastIndex;
                            totalElementTemplateEvent.numberOfPages = numberOfPages;
                            totalElementTemplateEvent.pageSelected = pageSelected;
                            let totalElementsText = footer.totalElements(totalElementTemplateEvent);

                            spanTotalElements.innerHTML = String(totalElementsText);
                        }
                    }
                    //#endregion                
                }
                else
                {
                    //#region Clear footer
                    if (footer.totalElements)
                    {
                        let spanTotalElements = document.createElement("span");
                        spanTotalElements.id = this._elementId + "TotalsLabel";
                        spanTotalElements.classList.add("p-grid-totalElements");
                        divPagination.appendChild(spanTotalElements);

                        if (footer.cartSettings != null)
                            spanTotalElements.style.cssText += "right: 50px;";

                        let realDataItems = dataItems.filter(k => k["defaultRow"] == null || k["defaultRow"] == false);

                        if (typeof (footer.totalElements) == "boolean" && footer.totalElements === true)
                        {
                            if (realDataItems.length == 0)
                                spanTotalElements.innerHTML = "Nessun elemento";
                            else
                                spanTotalElements.innerHTML = dataItems.length + ((realDataItems.length == 1) ? " elemento" : " elementi");
                        }
                        else
                        {
                            let totalElementTemplateEvent = new GridTotalElementTemplateEvent();
                            totalElementTemplateEvent.dataItems = realDataItems;
                            totalElementTemplateEvent.firstIndex = firstIndex;
                            totalElementTemplateEvent.lastIndex = lastIndex;
                            let totalElementsText = footer.totalElements(totalElementTemplateEvent);

                            spanTotalElements.innerHTML = String(totalElementsText);
                        }
                    }

                    if (!footer.showPageSize)
                    {
                        let ddlPageSize = ControlManager.get<ComboBox>(this._elementId + "_ddlPageSize");
                        if (ddlPageSize != null)
                            ddlPageSize.hide();
                    }
                    //#endregion
                }
            }
            //#endregion

            //#region Totals
            if (this._showTotals && options.columns!.filter(k => k.aggregate != null && k.aggregate !== false).length > 0)
            {
                if (options.serverBinding !== false)
                    this.createTotals(this._responseForServerBinding[(options.serverBinding as GridServerBindSettings).totalsPropertyName!], false);
                else
                {
                    let totals = this.getTotals(dataItems);
                    this.createTotals(totals, false);
                }
            }
            //#endregion
        })

        //#region Recalculate Width/Height & AdjustTrHeight
        if (!this._firstDraw)
            this.recalculateHeightWidth();
        else
            window.setTimeout(() => this.recalculateHeightWidth());

        this._firstDraw = true;
        this.adjustTrHeight();
        //#endregion

        this._deletedItems = [];
        this.selectRows(this._rowCheckedIdList, undefined, false);

        //#region GroupBy
        if (options.groupable! && options.groupBy != null)
        {
            //#region Group totals
            let groupItems: TotalsGroupItem[] = [];
            let trGroupByList = Array.from(this.element().getElementsByClassName("grid_trGroupBy")) as HTMLElement[];
            if (options.lockable)
                trGroupByList.vrPushRange(Array.from(this._elementLocked.getElementsByClassName("grid_trGroupByLocked")))

            for (let tr of trGroupByList)
            {
                let children = [];
                if (tr.classList.contains("grid_trGroupByLocked"))
                    children = this.getChildrenGroupRows(tr, this._divBodyLocked).children;
                else
                    children = this.getChildrenGroupRows(tr, this._divBody).children;

                //#region Children number
                if (!options.serverBinding)
                {
                    let td = tr.getElementsByClassName("grid_tdGroupByName")[0];
                    let childrenNumber = children.length;

                    if (this.dataSource().length > 1)
                    {
                        let divGroupByName = td.getElementsByClassName("grid_divGroupByName")[0];
                        let spanChildrenNumber = document.createElement("span");
                        spanChildrenNumber.style.cssText += "margin-left: 5px;";
                        spanChildrenNumber.innerHTML = "(" + childrenNumber + ")";
                        divGroupByName.appendChild(spanChildrenNumber);
                    }
                }
                //#endregion

                //#region Totals group
                if (this._showTotals)
                {
                    let value = this.fixValueWithoutSpecialChars(tr.getAttribute("field")!);

                    let lastChildren = children.vrLast()!;
                    if (lastChildren != null)
                    {
                        let clonedTr = lastChildren.cloneNode(true) as HTMLElement;
                        clonedTr.classList.add("p-grid-totalsGroup", this._elementId + "_totalGroupBy" + value);
                        lastChildren.parentNode!.insertBefore(clonedTr, lastChildren.nextSibling);
                    }

                    let totalsGroupItem = new TotalsGroupItem();
                    totalsGroupItem.groupValue = value;

                    let childrenItems = [];
                    for (let child of children)
                    {
                        let dataItemId = child.getAttribute("dataitemid")!;
                        childrenItems.push(dataItems.find(k => k[options.dataSourceFieldId!] == dataItemId));
                    }
                    totalsGroupItem.dataItems = childrenItems;
                    groupItems.push(totalsGroupItem);
                }
                //#endregion
            }

            if (this._showTotals)
            {
                if (!(groupItems.length == 0 || groupItems[0].dataItems[0] == null))
                {
                    let totalGroupList: any[] = [];
                    for (let group of groupItems)
                    {
                        let totals = this.getTotals(group.dataItems);
                        totalGroupList.push({ totals: totals, groupValue: group.groupValue });
                    }
                    this.createTotals(totalGroupList, true);
                }
            }
            //#endregion
        }
        //#endregion
    }

    private createTotals(data: any[], isGroup: boolean)
    {
        if (!isGroup)
        {
            //#region Totals global (data is the datasource)
            let tdFragment = document.createDocumentFragment();
            let trTotals = this._divTotals.querySelector(".p-grid-totals")!;
            let tdList = trTotals.getElementsByTagName("td");
            for (let td of Array.from(tdList))
            {
                let newTd = td.cloneNode(true) as HTMLElement;

                let field = td.getAttribute("field")!;
                let total = data.find(k => k.field == field);
                if (total != null)
                    this.writeTotals(total, newTd);
                else
                    newTd.innerHTML = "";

                tdFragment.appendChild(newTd);
            }
            trTotals.innerHTML = "";
            trTotals.appendChild(tdFragment);
            //#endregion
        }
        else
        {
            //#region Totals group
            let dataGrouped = data.vrGroupBy(k => k.groupValue);
            let trTdList: any[] = [];
            for (let key in dataGrouped)
            {
                let totalsGroup = dataGrouped[key];
                let groupValue = totalsGroup[0].groupValue;
                let totalsGroupTotals: any[][] = [];
                for (let totGroup of totalsGroup)
                    totalsGroupTotals.push(totGroup.totals);

                let trList = this.element().querySelectorAll("." + this._elementId + "_totalGroupBy"
                    + this.fixValueWithoutSpecialChars(groupValue))!;

                let i = 0;
                for (let tr of Array.from(trList))
                {
                    let tdFragment = document.createDocumentFragment();
                    let tdList = tr.getElementsByTagName("td");
                    for (let td of Array.from(tdList))
                    {
                        let newTd = td.cloneNode(true) as HTMLElement;

                        let field = td.getAttribute("field")!;
                        let total = totalsGroupTotals[i].find(k => k.field == field);
                        if (total != null)
                            this.writeTotals(total, newTd);
                        else
                            newTd.innerHTML = "";

                        tdFragment.appendChild(newTd);
                    }

                    trTdList.push({ tr: tr, tdFragment: tdFragment });
                    tr.innerHTML = "";
                    i++;
                }
            }

            for (let trTd of trTdList)
                trTd.tr.appendChild(trTd.tdFragment);
            //#endregion
        }
    }

    private writeTotals(total: TotalsResult, td: HTMLElement)
    {
        if (td != null)
        {
            let valueFormatted = this.formatValue(total.total, total.type, total.decimalDigits, total.roundingSettings, undefined, total.milesSeparator);
            td.innerHTML = valueFormatted;
            td.setAttribute("title", td.innerText);
        }
    }

    private formatValue(value: any, columnType?: GridColumnTypeEnum, decimalDigits?: number,
        roundingSettings?: NumberFormatRoundingSettings, showSeconds?: boolean, milesSeparator?: boolean)
    {
        let options = this.getOptions();
        if (columnType == null) columnType = GridColumnTypeEnum.String;

        //#region Number, Currency, Percentage
        if (columnType == GridColumnTypeEnum.Number || columnType == GridColumnTypeEnum.Currency || columnType == GridColumnTypeEnum.Percentage)
        {
            if (roundingSettings == null)
                roundingSettings = options.roundingSettings;

            let formatSettings = new NumberFormatSettings(roundingSettings);
            formatSettings.useGrouping = milesSeparator;
            formatSettings.minimumFractionDigits = decimalDigits;
            formatSettings.maximumFractionDigits = decimalDigits;

            if (roundingSettings != null)
            {
                if (roundingSettings.minimumFractionDigits != null) formatSettings.minimumFractionDigits = roundingSettings.minimumFractionDigits;
                if (roundingSettings.maximumFractionDigits != null) formatSettings.maximumFractionDigits = roundingSettings.maximumFractionDigits

                if (roundingSettings.roundingMode == RoundingModeEnum.None)
                {
                    if (roundingSettings.maximumFractionDigits == null)
                        formatSettings.maximumFractionDigits = 8;
                }
            }

            if (columnType == GridColumnTypeEnum.Percentage)
                value = Number(value) / 100;

            if (columnType == GridColumnTypeEnum.Number)
                return Number(value).vrToNumberString(formatSettings);
            else if (columnType == GridColumnTypeEnum.Currency)
                return Number(value).vrToCurrencyString(formatSettings);
            else if (columnType == GridColumnTypeEnum.Percentage)
                return Number(value).vrToPercentageString(formatSettings);
        }
        //#endregion

        //#region Duration
        else if (columnType == GridColumnTypeEnum.Duration)
        {
            let hours: number = Math.trunc(value / 60);
            let hoursString = String(hours);
            if (hours < 10)
                hoursString = "0" + hoursString;

            let minutes: number = Math.trunc(value % 60);
            let minutesString = String(minutes);
            if (minutes < 10)
                minutesString = "0" + minutesString;

            return hoursString + ":" + minutesString;
        }
        //#endregion

        //#region Date, DateTime, Time
        else if (columnType == GridColumnTypeEnum.Date || columnType == GridColumnTypeEnum.DateTime
            || columnType == GridColumnTypeEnum.Time || columnType == GridColumnTypeEnum.LongDate
            || columnType == GridColumnTypeEnum.LongDateTime || columnType == GridColumnTypeEnum.LongWeekDate
            || columnType == GridColumnTypeEnum.ShortWeekDate)
        {
            value = Date.vrFixDateString(value);
            let dateModeEnum: DateModeEnum = DateModeEnum.Date;

            if (columnType == GridColumnTypeEnum.Date) dateModeEnum = DateModeEnum.Date;
            else if (columnType == GridColumnTypeEnum.DateTime) dateModeEnum = DateModeEnum.DateTime;
            else if (columnType == GridColumnTypeEnum.Time) dateModeEnum = DateModeEnum.Time;
            else if (columnType == GridColumnTypeEnum.LongDate) dateModeEnum = DateModeEnum.LongDate;
            else if (columnType == GridColumnTypeEnum.LongDateTime) dateModeEnum = DateModeEnum.LongDateTime;
            else if (columnType == GridColumnTypeEnum.LongWeekDate) dateModeEnum = DateModeEnum.LongWeekDate;
            else if (columnType == GridColumnTypeEnum.ShortWeekDate) dateModeEnum = DateModeEnum.ShortWeekDate;

            return (value == "" || !Date.vrIsValidDate(value)) ? "" : new Date(value).vrToItalyString(dateModeEnum, showSeconds);
        }
        //#endregion

        //#region String, Label
        else if (columnType == GridColumnTypeEnum.String || columnType == GridColumnTypeEnum.Label)
        {
            value = String(value);
            return value;
        }
        //#endregion

        return "";
    }
    //#endregion

    //#region Manage rows
    updateRow(dataItem: any, rebind = true)
    {
        let options = this.getOptions();
        let dataItemId = dataItem[options.dataSourceFieldId!];

        let itemOriginalDatasource = this.originalDataSource().find(k => k[options.dataSourceFieldId!] == dataItemId);
        let itemOriginalDatasourceIndex = this.originalDataSource().indexOf(itemOriginalDatasource);
        let itemDatasource = this.dataSource().find(k => k[options.dataSourceFieldId!] == dataItemId);
        let itemDatasourceIndex = this.dataSource().indexOf(itemDatasource);
        if (itemOriginalDatasource != null)
        {
            this.fixDatasourceWithDate([dataItem]);
            this.originalDataSource()[itemOriginalDatasourceIndex] = dataItem;
            this.dataSource()[itemDatasourceIndex] = dataItem;

            if (rebind)
                this.update();
        }
        else
            this.addRow(dataItem, rebind);
    }

    updateRows(dataItems: any[], rebind = true)
    {
        for (let dataItem of dataItems)
            this.updateRow(dataItem, false);

        if (rebind)
            this.update();
    }

    addRow(dataItem: any, rebind = true)
    {
        this.addRows([dataItem], rebind);
    }

    addRows(dataItems: any[], rebind = true)
    {
        this.fixDatasourceWithDate(dataItems);
        let options = this.getOptions();
        for (let dataItem of dataItems)
        {
            if (dataItem[options.dataSourceFieldId!] == null)
            {
                dataItem[options.dataSourceFieldId!] = this._lastIndexAdded;
                this._lastIndexAdded--;
            }
        }

        if (this._originalDataSource == null)
            this._originalDataSource = [];

        this.dataSource().vrPushRange(dataItems);
        this._originalDataSource.vrPushRange(dataItems);

        if (options.groupable! && options.groupBy != null)
            this.sortingGroupFields(dataItems);

        if (rebind)
            this.setDataSource(this.dataSource());

        //#region Add to dictionary for filter
        for (let column of options.columns!)
        {
            if (column.type != GridColumnTypeEnum.EditButton)
                this._dictionaryDataValues.set(column.field, this._originalDataSource.map(k => String(k[column.field]).toLowerCase()));
        }
        //#endregion
    }

    deleteRow(dataItemId: number | string, rebind = false)
    {
        this.deleteRows([dataItemId], rebind);
    }

    deleteRows(dataItemIdList: (number | string)[], rebind = false)
    {
        let options = this.getOptions();

        //#region Delete row element
        let rows = Array.from(puma(this._divBody).find("tr"));
        for (let row of rows)
        {
            if (dataItemIdList.vrToStringArrayList().includes(puma(row).attr("dataItemId")))
                puma(row).remove();
        }

        if (this.thereAreLockedColumns())
        {
            let rows = Array.from(puma(this._divBodyLocked).find("tr"));
            for (let row of rows)
            {
                if (dataItemIdList.vrToStringArrayList().includes(puma(row).attr("dataItemId")))
                    puma(row).remove();
            }
        }
        //#endregion

        //#region Delete item
        for (let itemId of dataItemIdList)
        {
            let itemToDelete = this.dataSource().find(k => k[options.dataSourceFieldId!] == itemId);
            if (itemToDelete != null)
            {
                this.dataSource().vrDeleteItem(itemToDelete, options.dataSourceFieldId!);
                this._originalDataSource.vrDeleteItem(itemToDelete, options.dataSourceFieldId!);
            }
        }
        //#endregion

        //#region Remove from dictionary for filter
        for (let column of options.columns!)
        {
            if (column.type != GridColumnTypeEnum.EditButton)
                this._dictionaryDataValues.set(column.field, this._originalDataSource.map(k => String(k[column.field]).toLowerCase()));
        }
        //#endregion

        if (rebind)
            this.setDataSource(this.dataSource());
    }

    rows()
    {
        let rows: GridRow[] = [];
        let rowElements = Array.from<HTMLElement>(puma(this._divBody).find("tr"));
        for (let rowElement of rowElements)
        {
            let row = new GridRow();
            row.element = rowElement;
            row.cells = Array.from<HTMLElement>(puma(rowElement).find("td"));
            row.id = rowElement.id;
            row.dataItemId = rowElement.getAttribute("dataItemId")!;
            row.index = Number(rowElement.getAttribute("row")!);
            rows.push(row);
        }
        return rows;
    }
    //#endregion

    //#region Items
    public getAllItems(toSavePurpose: boolean = false)
    {
        let rows = UtilityManager.duplicate(this.dataSource()) as any[];
        if (toSavePurpose)
        {
            for (let row of rows)
            {
                for (let property in row)
                {
                    let propertyValue = row[property];
                    if (Date.vrIsValidDate(propertyValue))
                        row[property] = Date.vrConvertDateFromClient(propertyValue);
                }
            }
        }
        return rows.filter(k => k.defaultRow !== true);
    }

    getCheckedItems()
    {
        let options = this.getOptions();
        let checkedValues = this.getCheckedValues();

        let checkedItems: any[] = [];
        for (let value of checkedValues)
        {
            let item = this.dataSource().find(k => k[options.dataSourceFieldId!] == value);
            if (item != null)
                checkedItems.push(item);
        }
        return checkedItems;
    }

    getCheckedValues(): string[]
    {
        return this._rowCheckedIdList.vrDistinct();
    }

    getCheckedNumberValues(): number[]
    {
        return this._rowCheckedIdList.vrToNumberArrayList().vrDistinct();
    }

    getDeletedItems()
    {
        return this._deletedItems;
    }

    getDeletedItemValues(key?: string)
    {
        let options = this.getOptions();
        return this.getDeletedItems().map(k => key != null ? k[key] : k[options.dataSourceFieldId!]);
    }
    //#endregion

    //#region Check/Select
    clearSelection(triggerChange = true)
    {
        this._rowCheckedIdList = [];
        this.unCheckAllRows(triggerChange);
    }

    checkAllRows(triggerChange = true)
    {
        let options = this.getOptions();
        if (options.checkboxes == GridCheckboxModeEnum.SingleCheck)
            return;

        let headerCheckbox = document.getElementById(this._elementId + "header_CheckboxColumn") as HTMLInputElement;
        if (headerCheckbox != null)
        {
            headerCheckbox.classList.remove("indeterminateVrCheckbox");
            headerCheckbox.checked = true;
        }

        let checkboxList = this._divBody.getElementsByClassName("vr-checkbox-column");
        if (this.thereAreLockedColumns())
            checkboxList = this._divBodyLocked.getElementsByClassName("vr-checkbox-column");

        for (let checkbox of Array.from(checkboxList) as HTMLInputElement[])
            checkbox.checked = true;

        //#region Group by
        if (options.groupable! && options.groupBy != null && options.checkboxes != GridCheckboxModeEnum.None)
        {
            let groupByRows = this._divBody.getElementsByClassName("grid_trGroupBy");
            if (this.thereAreLockedColumns())
                groupByRows = this._divBodyLocked.getElementsByClassName("grid_trGroupBy");

            for (let groupByRow of Array.from(groupByRows))
            {
                let checkBox = groupByRow.getElementsByTagName("input")[0];
                (checkBox as HTMLInputElement).checked = true;
                checkBox.classList.remove("indeterminateVrCheckbox");
            }
        }
        //#endregion

        //#region Update checkedValues
        let checkedIdList: string[] = [];
        let datasourceIdList = this.dataSource().map(k => k[options.dataSourceFieldId!]);
        let checkboxCheckedList = Array.from(checkboxList).filter(k => (k as HTMLInputElement).checked);
        for (let checkboxChecked of checkboxCheckedList)
        {
            let dataItemId = checkboxChecked.getAttribute("dataItemId")!;
            let checkedId = datasourceIdList.find(k => k == dataItemId);
            if (checkedId != null)
                checkedIdList.push(checkedId);
        }

        this._rowCheckedIdList.vrPushRange(checkedIdList.vrToStringArrayList());
        this.updateCart();
        //#endregion

        //#region Event
        if (triggerChange && options.onSelectAllRows != null)
        {
            let selectAllRowsEvent = new GridSelectAllRowsEvent();
            selectAllRowsEvent.sender = this;
            selectAllRowsEvent.checked = true;
            options.onSelectAllRows(selectAllRowsEvent);
        }
        //#endregion
    }

    unCheckAllRows(triggerChange = true)
    {
        let options = this.getOptions();

        let headerCheckbox = document.getElementById(this._elementId + "header_CheckboxColumn") as HTMLInputElement;
        if (headerCheckbox != null)
        {
            headerCheckbox.classList.remove("indeterminateVrCheckbox");
            headerCheckbox.checked = false;
        }

        let checkboxList = this._divBody.getElementsByClassName("vr-checkbox-column");
        if (this.thereAreLockedColumns())
            checkboxList = this._divBodyLocked.getElementsByClassName("vr-checkbox-column");

        for (let checkbox of Array.from(checkboxList) as HTMLInputElement[])
            checkbox.checked = false;

        //#region Group by
        if (options.groupable! && options.groupBy != null && options.checkboxes != GridCheckboxModeEnum.None)
        {
            let groupByRows = this._divBody.getElementsByClassName("grid_trGroupBy");
            if (this.thereAreLockedColumns())
                groupByRows = this._divBodyLocked.getElementsByClassName("grid_trGroupBy");

            for (let groupByRow of Array.from(groupByRows))
            {
                let checkBox = groupByRow.getElementsByTagName("input")[0];
                (checkBox as HTMLInputElement).checked = false;
                checkBox.classList.remove("indeterminateVrCheckbox");
            }
        }
        //#endregion

        //#region Update checkedValues
        let uncheckedIdList: string[] = [];
        let datasourceIdList = this.dataSource().map(k => k[options.dataSourceFieldId!]);
        for (let checkbox of Array.from(checkboxList))
        {
            let dataItemId = checkbox.getAttribute("dataItemId")!;
            let uncheckedId = datasourceIdList.find(k => k == dataItemId);
            if (uncheckedId != null)
                uncheckedIdList.push(uncheckedId);
        }

        for (let uncheckedId of uncheckedIdList)
            this._rowCheckedIdList.vrDelete(String(uncheckedId));

        this.updateCart();
        //#endregion

        //#region Event
        if (triggerChange && options.onSelectAllRows != null)
        {
            let selectAllRowsEvent = new GridSelectAllRowsEvent();
            selectAllRowsEvent.sender = this;
            selectAllRowsEvent.checked = false;
            options.onSelectAllRows(selectAllRowsEvent);
        }
        //#endregion
    }

    selectRowsByIndexes(indexes: number[], triggerChange = true)
    {
        for (let index of indexes)
            this.selectRowByIndex(index, triggerChange);
    }

    selectRowByIndex(index: number, triggerChange = true)
    {
        let tr = puma(this._divBody).find("tr[row='" + index + "']");
        let dataItemId = tr.attr("dataItemId");
        this.selectRowInternal(dataItemId, triggerChange, { fromCheckboxInput: false, fromGroupOrRow: false, fromMethodCall: false, shiftKey: false });
    }

    selectRows(itemIdList: string[], property?: string, triggerChange = true)
    {
        if (itemIdList.length == 0)
            return;

        let options = this.getOptions();
        if (options.checkboxes == GridCheckboxModeEnum.SingleCheck)
            itemIdList = [itemIdList.vrLast()];

        // Other property instead of 'id'
        if (property != null)
            itemIdList = this.dataSource().filter(k => itemIdList.includes(String(k[property]))).map(k => k[options.dataSourceFieldId!]);

        itemIdList = itemIdList.vrToStringArrayList().vrDistinct();
        for (let itemId of itemIdList)
            this.selectRow(itemId, triggerChange);
    }

    selectRow(itemId: string, triggerChange = true)
    {
        this.selectRowInternal(itemId, triggerChange, { fromCheckboxInput: false, fromGroupOrRow: false, fromMethodCall: true, shiftKey: false });
    }

    private selectRangeShiftKey(target: HTMLElement)
    {
        let rowIndex = Number(puma(target).closest("tr").attr("row"));
        let checkboxList: HTMLInputElement[] = Array.from<HTMLInputElement>(puma(this._divBody).find(".vr-checkbox-column:checked") as any);
        if (this.thereAreLockedColumns())
            checkboxList = Array.from<HTMLInputElement>(puma(this._divBodyLocked).find(".vr-checkbox-column:checked") as any);

        let trSelectedList: HTMLElement[] = [];
        for (let checkbox of checkboxList)
            trSelectedList.push(puma(checkbox).closest("tr")[0]);

        let minDifferenceTr: number | null = null;
        let finalRowIndex = 0;
        for (let trSelected of trSelectedList)
        {
            let rowIndexSelected = Number(puma(trSelected).attr("row"));
            let diff = Math.abs(rowIndex - rowIndexSelected);
            if (minDifferenceTr == null || (diff < minDifferenceTr && diff > 0))
            {
                minDifferenceTr = diff;
                finalRowIndex = Number(puma(trSelected).attr("row"));
            }
        }

        let start = (finalRowIndex < rowIndex) ? finalRowIndex : rowIndex;
        let end = (finalRowIndex < rowIndex) ? rowIndex : finalRowIndex;
        for (let i = start + 1; i <= end; i++)
        {
            let tr = puma(this._divBody).find("tr[row='" + i + "']");
            let dataItemId = tr.attr("dataItemId");
            this.selectRowInternal(dataItemId, true, { fromCheckboxInput: true, fromGroupOrRow: true, fromMethodCall: false, shiftKey: true });
        }
    }

    private selectRowInternal(itemId: string, triggerChange = true, settings: { fromCheckboxInput: boolean, fromGroupOrRow: boolean, fromMethodCall: boolean, shiftKey: boolean })
    {
        let options = this.getOptions();

        let bodyWhereSearch = (this.thereAreLockedColumns() ? this._divBodyLocked : this._divBody);
        let checkboxList = Array.from(bodyWhereSearch.getElementsByClassName("vr-checkbox-column")) as HTMLInputElement[];
        let checkboxGroupList = Array.from(bodyWhereSearch.querySelectorAll(".grid_divGroupByName input")) as HTMLInputElement[];

        //#region Select checkbox
        let dataItem = null;
        let checkboxToSelect = checkboxList.find(k => k.getAttribute("dataItemId") == itemId)! as HTMLInputElement;
        if (checkboxToSelect != null)
        {
            if (checkboxToSelect.checked)
            {
                let checkedCheckboxList = checkboxList.filter(k => k.checked);
                if (options.checkboxes == GridCheckboxModeEnum.SingleCheck || (options.checkboxes == GridCheckboxModeEnum.MultiCheck && !settings.fromCheckboxInput && checkedCheckboxList.length > 1))
                {
                    if (!settings.fromMethodCall)
                    {
                        for (let checkbox of checkboxList)
                        {
                            checkbox.checked = false;
                            checkbox.classList.remove("indeterminateVrCheckbox");
                            this._rowCheckedIdList.vrDelete(String(checkbox.getAttribute("dataItemId")));
                        }

                        for (let checkbox of checkboxGroupList)
                        {
                            checkbox.checked = false;
                            checkbox.classList.remove("indeterminateVrCheckbox");
                        }

                        this._rowCheckedIdList.vrDelete(String(itemId));
                    }

                    checkboxToSelect.checked = true;
                    this._rowCheckedIdList.push(String(itemId));
                }
                else 
                {
                    if (settings.fromGroupOrRow)
                        this.unselectRow(itemId, triggerChange);
                    else
                        this._rowCheckedIdList.push(String(itemId));
                }
            }
            else
            {
                if ((options.checkboxes == GridCheckboxModeEnum.SingleCheck || !settings.fromCheckboxInput) && !settings.fromMethodCall)
                {
                    for (let checkbox of checkboxList)
                    {
                        checkbox.checked = false;
                        this._rowCheckedIdList.vrDelete(String(checkbox.getAttribute("dataItemId")));
                    }

                    for (let checkbox of checkboxGroupList)
                    {
                        checkbox.checked = false;
                        checkbox.classList.remove("indeterminateVrCheckbox");
                    }
                }

                if (!settings.fromGroupOrRow && !settings.fromMethodCall)
                {
                    checkboxToSelect.checked = false;
                    this._rowCheckedIdList.vrDelete(String(itemId));
                }
                else
                {
                    checkboxToSelect.checked = true;
                    this._rowCheckedIdList.push(String(itemId));
                }
            }

            dataItem = this.dataSource().find(k => k[options.dataSourceFieldId!] == itemId);
        }
        this.updateCart();
        //#endregion

        let headerCheckbox = document.getElementById(this._elementId + "header_CheckboxColumn") as HTMLInputElement;
        if (headerCheckbox != null)
            headerCheckbox.classList.add("indeterminateVrCheckbox");

        //#region All rows checked
        let checkedIdList: string[] = [];
        let datasourceIdList = this.dataSource().map(k => k[options.dataSourceFieldId!]);
        let checkboxCheckedList = checkboxList.filter(k => (k as HTMLInputElement).checked);
        for (let checkboxChecked of checkboxCheckedList)
        {
            let dataItemId = checkboxChecked.getAttribute("dataItemId")!;
            let checkedId = datasourceIdList.find(k => k == dataItemId);
            if (checkedId != null)
                checkedIdList.push(checkedId);
        }

        if (headerCheckbox != null)
        {
            if (checkedIdList.length == checkboxList.length)
            {
                headerCheckbox.classList.remove("indeterminateVrCheckbox");
                headerCheckbox.checked = true;
            }
            else if (checkedIdList.length == 0)
            {
                headerCheckbox.checked = false;
                headerCheckbox.classList.remove("indeterminateVrCheckbox");
            }
        }
        //#endregion

        //#region Group
        this.manageGroupCheckParent(checkboxToSelect);
        //#endregion

        //#region Event
        if (options.onSelectRow != null && dataItem != null && triggerChange)
        {
            let rowElement = checkboxToSelect.closest("tr") as HTMLTableRowElement;

            let dataSourceIdList = this.dataSource().map(k => k[options!.dataSourceFieldId!]);
            let index = dataSourceIdList.indexOf(dataItem[options!.dataSourceFieldId!]);
            if (index == -1 || options!.dataSourceFieldId == null)
                index = puma(rowElement).index();

            let selectRowEvent = new GridSelectRowEvent();
            selectRowEvent.sender = this;
            selectRowEvent.rowElement = rowElement;
            selectRowEvent.dataItem = dataItem;
            selectRowEvent.checked = (checkboxToSelect != null) ? checkboxToSelect.checked : false;
            selectRowEvent.empty = (dataItem != null && dataItem[options.dataSourceFieldId!] == null);
            selectRowEvent.index = index;
            selectRowEvent.shiftKey = settings.shiftKey;
            selectRowEvent.fromCheckbox = settings.fromCheckboxInput && !settings.shiftKey;
            options.onSelectRow(selectRowEvent);
        }
        //#endregion
    }

    private manageGroupCheckParent(checkbox: HTMLElement)
    {
        let options = this.getOptions();
        if (options.groupable! && options.groupBy != null && (options.groupBy as GridGroupBySettings).fields != null && (options.groupBy as GridGroupBySettings).fields.length > 0 && options.checkboxes != GridCheckboxModeEnum.None && checkbox != null)
        {
            //#region Parent group row
            let parentGroupRow = checkbox.parentElement!.parentElement! as any;
            let i = parentGroupRow.rowIndex;
            while (parentGroupRow != null && !parentGroupRow.classList.contains("grid_trGroupBy"))
            {
                parentGroupRow = this._divBody.querySelector("tr:nth-child(" + i + ")")!;
                if (this.thereAreLockedColumns())
                    parentGroupRow = this._divBodyLocked.querySelector("tr:nth-child(" + i + ")")!;

                i--;
            }
            //#endregion

            //#region Checkbox management
            while (parentGroupRow != null && ((Number(parentGroupRow.getAttribute("level")) == 0 && parentGroupRow.classList.contains("grid_trGroupBy")) || (Number(parentGroupRow.getAttribute("level")) > 0 || !parentGroupRow.classList.contains("grid_trGroupBy"))))
            {
                if (!parentGroupRow.classList.contains("grid_trGroupBy"))
                {
                    parentGroupRow = this._divBody.querySelector("tr:nth-child(" + i + ")")!;
                    if (this.thereAreLockedColumns())
                        parentGroupRow = this._divBodyLocked.querySelector("tr:nth-child(" + i + ")")!;

                    i--;
                    continue;
                }

                let checkBoxParentGroup = parentGroupRow.getElementsByTagName("input")[0];

                //#region Check or not 
                let childrenRows = this.getChildrenGroupRows(parentGroupRow, this._divBody);
                if (this.thereAreLockedColumns())
                    childrenRows = this.getChildrenGroupRows(parentGroupRow, this._divBodyLocked);

                let numberOfCheckedChildren = this.getCheckedChildrenGroupRows(parentGroupRow, this._divBody).length;
                if (this.thereAreLockedColumns())
                    numberOfCheckedChildren = this.getCheckedChildrenGroupRows(parentGroupRow, this._divBodyLocked).length;

                checkBoxParentGroup.checked = false;
                checkBoxParentGroup.classList.remove("indeterminateVrCheckbox");

                if (numberOfCheckedChildren == childrenRows.children.length)
                    checkBoxParentGroup.checked = true;
                else if (numberOfCheckedChildren == 0)
                    checkBoxParentGroup.checked = false;
                else
                    checkBoxParentGroup.classList.add("indeterminateVrCheckbox");
                //#endregion

                if (Number(parentGroupRow.getAttribute("level")) == 0)
                    break;

                parentGroupRow = this._divBody.querySelector("tr:nth-child(" + i + ")")!;
                if (this.thereAreLockedColumns())
                    parentGroupRow = this._divBodyLocked.querySelector("tr:nth-child(" + i + ")")!;

                i--;
            }
        }
    }

    unselectRows(itemIdList: string[], property?: string, triggerChange = true)
    {
        if (itemIdList.length == 0)
            return;

        // Other property instead of 'id'
        let options = this.getOptions();
        if (property != null)
            itemIdList = this.dataSource().filter(k => itemIdList.includes(String(k[property]))).map(k => k[options.dataSourceFieldId!]);

        itemIdList = itemIdList.vrToStringArrayList().vrDistinct();
        for (let itemId of itemIdList)
            this.unselectRow(itemId, triggerChange);
    }

    unselectRow(itemId: string, triggerChange = true)
    {
        let options = this.getOptions();

        let bodyWhereSearch = (this.thereAreLockedColumns() ? this._divBodyLocked : this._divBody);
        let checkboxList = Array.from(bodyWhereSearch.getElementsByClassName("vr-checkbox-column")) as HTMLInputElement[];

        let headerCheckbox = document.getElementById(this._elementId + "header_CheckboxColumn") as HTMLInputElement;
        if (headerCheckbox != null)
            headerCheckbox.checked = false;

        this._rowCheckedIdList.vrDelete(String(itemId));
        this.updateCart();

        let checkedValues = this.getCheckedValues();
        if (checkedValues.length == 0)
            headerCheckbox.classList.remove("indeterminateVrCheckbox");
        else
            headerCheckbox.classList.add("indeterminateVrCheckbox");

        let dataItem = null;
        let checkboxToDeselect = checkboxList.find(k => k.getAttribute("dataItemId") == itemId);
        if (checkboxToDeselect != null)
        {
            if (checkboxToDeselect.checked)
                checkboxToDeselect.checked = false;

            dataItem = this.dataSource().find(k => k[options.dataSourceFieldId!] == itemId);
            this.manageGroupCheckParent(checkboxToDeselect);
        }

        //#region Event
        if (options.onSelectRow != null && checkboxToDeselect != null && triggerChange)
        {
            let rowElement = checkboxToDeselect.closest("tr") as HTMLTableRowElement;

            let dataSourceIdList = this.dataSource().map(k => k[options!.dataSourceFieldId!]);
            let index = dataSourceIdList.indexOf(dataItem[options!.dataSourceFieldId!]);
            if (index == -1 || options!.dataSourceFieldId == null)
                index = puma(rowElement).index();

            let selectRowEvent = new GridSelectRowEvent();
            selectRowEvent.sender = this;
            selectRowEvent.rowElement = rowElement;
            selectRowEvent.dataItem = dataItem;
            selectRowEvent.checked = false;
            selectRowEvent.empty = (dataItem != null && dataItem[options.dataSourceFieldId!] == null);
            selectRowEvent.index = index;
            selectRowEvent.shiftKey = false;
            selectRowEvent.fromCheckbox = false;
            options.onSelectRow(selectRowEvent);
        }
        //#endregion
    }
    //#endregion

    //#region Cart
    private updateCart()
    {
        let btnCart = ControlManager.get<Button>(this._elementId + "_btnCart");
        if (btnCart != null)
        {
            let checkedValues = this.getCheckedValues();
            btnCart.badge(String(checkedValues.length));
        }
    }

    private openWindowCart()
    {
        let options = this.getOptions();
        this.createWindowCart();
        this._wndCart.open();

        this._grdCart.dataSource(this.getCheckedItems());
        this._grdCart.removeAllGroups(false);

        if (options.groupBy != null)
            this._grdCart.addGroups((options.groupBy as GridGroupBySettings).fields);
    }

    private createWindowCart()
    {
        if (this._wndCart != null)
            return;

        let options = this.getOptions();
        this._wndCart = createWindow(
            {
                addToControlList: false,
                classContainer: this.element().id + "_wndUtility",
                width: puma(this.container()).width() / 2 + 100,
                height: puma(this.container()).height() / 2 + 100,
                position: { right: 10, bottom: 40 },
                title: "Gestisci elementi selezionati",
                onClose: (e) =>
                {
                    puma(this._wndCart.container()).remove();
                    (this._wndCart as any) = null;
                },
                footer: [
                    { text: "Chiudi", type: WindowFooterItemTypeEnum.Close },
                    {
                        text: "Rimuovi tutto", type: WindowFooterItemTypeEnum.Ok, confirmationMessage: "Confermi di voler rimuovere tutti gli elementi?", onClick: (e) =>
                        {
                            this.clearSelection();
                            this._grdCart.clear();
                            this._wndCart.close();
                        }
                    }
                ]
            });
        puma(this.container()).append(this._wndCart.container());

        puma(this._wndCart.element()).vrAppendPuma("<div id='" + this._elementId + "_divWindowCartContainer' class='vrContainer'></div>");
        let divContainer = puma("#" + this._elementId + "_divWindowCartContainer")[0];

        let columns = options.columns!.filter(k => (options.footer! as GridFooterSettings).cartSettings!.fields.includes(k.field));
        columns.unshift({
            field: "remove",
            type: GridColumnTypeEnum.Button,
            width: 40,
            buttonSettings: (e) =>
            {
                return {
                    icon: IconClassicLight.Remove,
                    onClick: (e) => 
                    {
                        this.unselectRow(e.dataItem[options.dataSourceFieldId!])
                        this._grdCart.dataSource(this.getCheckedItems());
                        if (this.getCheckedValues().length == 0)
                            this._wndCart.close();
                    }
                }
            }
        })

        columns.forEach(k =>
        {
            k.fitSpace = undefined;
            if (k.width == null || k.fitSpace != null)
                k.width = 100;
        })

        this._grdCart = createGrid(
            {
                addToControlList: false,
                dataSourceFieldId: options.dataSourceFieldId,
                footer: { totalElements: true },
                pageSize: 500,
                filterable: false,
                height: this._wndCart.height() - 180,
                groupable: true,
                hideEditButton: true,
                columns: columns
            }, divContainer);
    }
    //#endregion

    //#region Sorting
    private applySorting(rebind = true)
    {
        if (this._actualSortingInfo != null)
            this.sort(this._actualSortingInfo.field, this._actualSortingInfo.mode, rebind);
    }

    removeSort(updateDataSource = true)
    {
        if (this._actualSortingInfo != null)
        {
            let options = this.getOptions();
            let field = this._actualSortingInfo.field;
            let thJq = puma(this._divHeader).find("th[field='" + field + "']");
            if (options.lockable && thJq[0] == null)
                thJq = puma(this._divHeaderLocked).find("th[field='" + field + "']");

            if (thJq[0] != null)
            {
                thJq[0].style.cssText += "background-color: #e3f1fa !important; color: #000 !important;";

                if (thJq.find(".grid_headerThContent")[0] != null)
                    thJq.find(".grid_headerThContent")[0].style.cssText += "color: #000 !important;";
            }

            thJq.find("i").removeClass(IconClassicLight.CaretUp);
            thJq.find("i").removeClass(IconClassicLight.CaretDown);
            thJq.removeAttr("sortMode");
            this._actualSortingInfo = null;

            if (options.groupBy != null)
                (options.groupBy as GridGroupBySettings).sortBy = undefined;

            if (updateDataSource)
            {
                if (options.serverBinding !== false)
                    this.rebind();
                else
                    this.update();
            }
        }
    }

    sort(field: string, gridSortModeEnum?: GridSortDirectionEnum, rebind = true)
    {
        let options = this.getOptions();
        if (options.sortable === false)
            return;

        if (this._actualSortingInfo != null && this._actualSortingInfo.field !== field)
            this.removeSort(false);

        let thJq = puma(this._divHeader).find("th[field='" + field + "']");
        if (options.lockable && thJq[0] == null)
            thJq = puma(this._divHeaderLocked).find("th[field='" + field + "']");

        if (thJq[0] != null)
        {
            thJq[0].style.cssText += "background-color: coral !important; color: #FFF !important;";

            if (thJq.find(".grid_headerThContent")[0] != null)
                thJq.find(".grid_headerThContent")[0].style.cssText += "color: #FFF !important;";
        }

        //#region Sort mode
        if (gridSortModeEnum == null) gridSortModeEnum = GridSortDirectionEnum.Asc;
        this._actualSortingInfo = { field: field, mode: gridSortModeEnum };
        if (gridSortModeEnum == GridSortDirectionEnum.Asc)
        {
            thJq.find("i").removeClass(IconClassicLight.CaretDown);
            thJq.find("i").removeClass(IconClassicLight.CaretUp);

            thJq.find("i").addClass(IconClassicLight.CaretUp);
            thJq.attr("sortMode", GridSortDirectionEnum.Asc);
        }
        else
        {
            thJq.find("i").removeClass(IconClassicLight.CaretDown);
            thJq.find("i").removeClass(IconClassicLight.CaretUp);

            thJq.find("i").addClass(IconClassicLight.CaretDown);
            thJq.attr("sortMode", GridSortDirectionEnum.Desc);
        }
        //#endregion

        //#region Server binding
        if (options.serverBinding !== false && rebind)
        {
            this.rebind();
            return;
        }
        //#endregion

        if (this.dataSource().length > 2500)
        {
            showLoader();
            window.setTimeout(() => 
            {
                this.sortInternal(field, gridSortModeEnum, rebind)
                hideLoader();
            });
        }
        else
            this.sortInternal(field, gridSortModeEnum, rebind)
    }

    private sortInternal(field: string, gridSortModeEnum?: GridSortDirectionEnum, rebind = true)
    {
        let options = this.getOptions();
        this._cellButtons = new Map<string, GridControlData>();
        this._cellIcons = new Map<string, GridControlData>();
        this._cellCustoms = new Map<string, GridControlData>();
        this._cellLabels = new Map<string, GridControlData>();
        this._cellImages = new Map<string, GridControlData>();

        let items: any[] = this.dataSource().map(k => k);
        if (options.groupBy != null)
        {
            (options.groupBy as GridGroupBySettings).sortBy = { field: field, direction: gridSortModeEnum };
            this.sortingGroupFields(items);
        }
        else
            items.vrSortBy([field], (gridSortModeEnum == GridSortDirectionEnum.Asc));

        if (rebind)
        {
            this.drawTable(items);
            this.manageControls();
        }
    }

    private sortingGroupFields(dataItems: any[])
    {
        let options = this.getOptions();
        let sortingFields: string[] = [];
        let groupBySettings = (options.groupBy as GridGroupBySettings);

        let sortByField = groupBySettings.sortBy != null ? (groupBySettings.sortBy! as GridSortSettings).field : null;
        if (sortByField != null)
        {
            //#region External group sort
            if (groupBySettings.sortBy!.direction == GridSortDirectionEnum.Desc)
                sortingFields.push("-" + sortByField);
            else
                sortingFields.push(sortByField);

            //#region Color
            let thJq = puma(this._divHeader).find("th[field='" + sortByField + "']");
            if (options.lockable && thJq[0] == null)
                thJq = puma(this._divHeaderLocked).find("th[field='" + sortByField + "']");

            if (thJq[0] != null)
            {
                thJq[0].style.cssText += "background-color: coral !important; color: #FFF !important;";

                if (thJq.find(".grid_headerThContent")[0] != null)
                    thJq.find(".grid_headerThContent")[0].style.cssText += "color: #FFF !important;";
            }

            if (groupBySettings.sortBy!.direction == null) groupBySettings.sortBy!.direction = GridSortDirectionEnum.Asc;
            this._actualSortingInfo = { field: sortByField, mode: groupBySettings.sortBy!.direction };
            if (groupBySettings.sortBy!.direction == GridSortDirectionEnum.Asc)
            {
                thJq.find("i").removeClass(IconClassicLight.CaretDown);
                thJq.find("i").removeClass(IconClassicLight.CaretUp);

                thJq.find("i").addClass(IconClassicLight.CaretUp);
                thJq.attr("sortMode", GridSortDirectionEnum.Asc);
            }
            else
            {
                thJq.find("i").removeClass(IconClassicLight.CaretDown);
                thJq.find("i").removeClass(IconClassicLight.CaretUp);

                thJq.find("i").addClass(IconClassicLight.CaretDown);
                thJq.attr("sortMode", GridSortDirectionEnum.Desc);
            }
            //#endregion

            //#endregion
        }
        else
        {
            //#region Sort for fields
            let automaticSort = groupBySettings.automaticSort;
            if (automaticSort == null)
                automaticSort = true;

            if (groupBySettings.fields != null && automaticSort)
            {
                for (let groupByField of (groupBySettings.fields as GridGroupByItem[]))
                {
                    if (groupByField == null)
                        continue;

                    if (!sortingFields.includes((groupByField as GridGroupByItem).field))
                        sortingFields.push((groupByField as GridGroupByItem).field);
                }
            }
            //#endregion
        }

        //#region Internal group sort
        let internalSortByField = groupBySettings.internalSortBy != null ? (groupBySettings.internalSortBy! as GridSortSettings).field : null;
        if (internalSortByField != null)
        {
            if (groupBySettings.internalSortBy!.direction == GridSortDirectionEnum.Desc)
                sortingFields.push("-" + internalSortByField);
            else
                sortingFields.push(internalSortByField);
        }
        //#endregion

        sortingFields = sortingFields.vrDistinct();
        if (sortingFields.length > 0)
            dataItems.vrSortBy(sortingFields);
    }
    //#endregion

    //#region Column
    column(field: string)
    {
        let options = this.getOptions();
        let column = options.columns!.find(k => k.field == field)!;
        let columnIndex = options.columns!.indexOf(column);
        return options.columns![columnIndex];
    }

    columnTitle(field: string, title?: string)
    {
        let column = this.column(field);
        if (column != null)
        {
            if (title != null)
            {
                column.title = title;
                puma(this._divHeader).find("th[field='" + field + "']").find("span.grid_headerThContent").html(title);

                let options = this.getOptions();
                if (options.lockable)
                    puma(this._divHeaderLocked).find("th[field='" + field + "']").find("span.grid_headerThContent").html(title);
            }
            return column.title;
        }
        else
            return "";
    }

    hideColumns(fields: string[], update = true)
    {
        for (let field of fields)
            this.hideColumn(field, false);

        if (update)
            this.update();
    }

    hideColumn(field: string, updateDataSource = true)
    {
        puma(this._divHeader).find("th[field='" + field + "']").hide();
        puma(this._divFilters).find("td[field='" + field + "']").hide();
        puma(this._divBody).find("td[field='" + field + "']").hide();
        puma(this._divTotals).find("td[field='" + field + "']").hide();

        let options = this.getOptions();
        if (options.lockable)
        {
            puma(this._divHeaderLocked).find("th[field='" + field + "']").hide();
            puma(this._divFiltersLocked).find("td[field='" + field + "']").hide();
            puma(this._divBodyLocked).find("td[field='" + field + "']").hide();
            puma(this._divTotalsLocked).find("td[field='" + field + "']").hide();
        }

        let column = this.column(field);
        if (column != null)
        {
            column.hidden = true;
            this.removeFilter(field);
        }

        if (updateDataSource)
            this.update();
    }

    hideCheckboxColumn(updateDataSource = false)
    {
        this.hideColumn("vrGridCheckboxColumn", updateDataSource);
    }

    hideEditButtonColumn(updateDataSource = false)
    {
        this.hideColumn("editButton", updateDataSource);
    }

    hideOnlyThisColumns(fieldList: string[], updateDataSource = true)
    {
        let options = this.getOptions();
        for (let column of options.columns!)
            this.showColumn(column.field, false);

        for (let field of fieldList)
            this.hideColumn(field, false);

        if (updateDataSource)
            this.update();
    }

    showColumns(fields: string[], update = true)
    {
        for (let field of fields)
            this.showColumn(field, false);

        if (update)
            this.update();
    }

    showColumn(field: string, updateDataSource = true)
    {
        puma(this._divHeader).find("th[field='" + field + "']").show();
        puma(this._divFilters).find("td[field='" + field + "']").show();
        puma(this._divBody).find("td[field='" + field + "']").show();
        puma(this._divTotals).find("td[field='" + field + "']").show();

        let options = this.getOptions();
        if (options.lockable)
        {
            puma(this._divHeaderLocked).find("th[field='" + field + "']").show();
            puma(this._divFiltersLocked).find("td[field='" + field + "']").show();
            puma(this._divBodyLocked).find("td[field='" + field + "']").show();
            puma(this._divTotalsLocked).find("td[field='" + field + "']").show();
        }

        let column = this.column(field);
        if (column != null)
            column.hidden = false;

        if (updateDataSource)
            this.update();
    }

    showCheckboxColumn(updateDataSource = false)
    {
        this.showColumn("vrGridCheckboxColumn", updateDataSource);
    }

    showEditButtonColumn(updateDataSource = false)
    {
        this.showColumn("editButton", updateDataSource);
    }

    showOnlyThisColumns(fieldList: string[], updateDataSource = true)
    {
        let options = this.getOptions();
        for (let column of options.columns!)
            this.hideColumn(column.field, false);

        for (let field of fieldList)
            this.showColumn(field, false);

        if (updateDataSource)
            this.update();
    }

    columnVisible(value: string, state: boolean, updateDataSource = true)
    {
        if (state) this.showColumn(value, updateDataSource);
        else this.hideColumn(value, updateDataSource);
    }

    columnCheckboxVisible(state: boolean, updateDataSource = false)
    {
        if (state) this.showCheckboxColumn(updateDataSource);
        else this.hideCheckboxColumn(updateDataSource);
    }
    //#endregion

    //#region Lock/Unlock
    lockColumns(fields: string[], update = true)
    {
        let options = this.getOptions();
        if (options.lockable)
        {
            for (let field of fields)
                this.lockColumn(field, false);

            if (update)
                this.update();
        }
    }

    lockColumn(field: string, update = true)
    {
        let options = this.getOptions();
        if (options.lockable)
        {
            if (this._divHeaderLocked != null) this._divHeaderLocked.style.cssText += "display: inline-block;";
            if (this._divFiltersLocked != null) this._divFiltersLocked.style.cssText += "display: inline-block;";
            if (this._divBodyLocked != null) this._divBodyLocked.style.cssText += "display: inline-block;";
            if (this._divTotalsLocked != null) this._divTotalsLocked.style.cssText += "display: inline-block;";

            if (!this.thereAreLockedColumns())
            {
                //#region Edit Button
                let columnEditButton = this.column("editButton");
                if (columnEditButton != null)
                {
                    columnEditButton.locked = true;
                    this.showColumn("editButton", false);

                    //#region Move column to correct index
                    let columnToMoveIndex = options.columns!.indexOf(columnEditButton);
                    let columnToMove = options.columns!.splice(columnToMoveIndex, 1)[0];
                    options.columns!.splice(0, 0, columnToMove);
                    //#endregion

                    puma(this._divHeader).find("th[field='" + "editButton" + "']").attr("locked", "locked");
                    puma(this._divHeader).find("th[field='" + "editButton" + "']").vrAppendToPuma(puma(this._divHeaderLocked).find("tr"));
                    puma(this._divFilters).find("td[field='" + "editButton" + "']").vrAppendToPuma(puma(this._divFiltersLocked).find("tr"));
                    puma(this._divTotals).find("td[field='" + "editButton" + "']").vrAppendToPuma(puma(this._divTotalsLocked).find("tr"));
                }
                //#endregion

                //#region Checkboxes
                if (options.checkboxes !== false)
                {
                    let firstColumnField = options.columns![0].field;
                    puma(this._divHeader).find("th[field='" + "vrGridCheckboxColumn" + "']").vrInsertBeforePuma(puma(this._divHeaderLocked).find("tr th[field='" + firstColumnField + "']"));
                    puma(this._divFilters).find("td[field='" + "vrGridCheckboxColumn" + "']").vrInsertBeforePuma(puma(this._divFiltersLocked).find("tr td[field='" + firstColumnField + "']"));
                    puma(this._divTotals).find("td[field='" + "vrGridCheckboxColumn" + "']").vrInsertBeforePuma(puma(this._divTotalsLocked).find("tr td[field='" + firstColumnField + "']"));
                }
                //#endregion
            }

            puma(this._divHeader).find("th[field='" + field + "']").vrAppendToPuma(puma(this._divHeaderLocked).find("tr"));
            puma(this._divHeaderLocked).find("th[field='" + field + "']").attr("locked", "locked");
            puma(this._divFilters).find("td[field='" + field + "']").vrAppendToPuma(puma(this._divFiltersLocked).find("tr"));
            puma(this._divTotals).find("td[field='" + field + "']").vrAppendToPuma(puma(this._divTotalsLocked).find("tr"));

            let column = this.column(field);
            if (column != null)
            {
                column.locked = true;
                this.showColumn(field, false);

                //#region Move column to correct index
                let columnToMoveIndex = options.columns!.indexOf(column);
                let columnToMove = options.columns!.splice(columnToMoveIndex, 1)[0];
                let lastLockedColumn = options.columns!.filter(k => k.locked == true).vrLast();
                let lastLockedColumnIndex = (lastLockedColumn == null) ? 0 : options.columns!.lastIndexOf(lastLockedColumn);
                options.columns!.splice((lastLockedColumn == null) ? 0 : (lastLockedColumnIndex + 1), 0, columnToMove);
                //#endregion    
            }

            this.recalculateHeightWidth();
            if (update)
                this.update();
        }
    }

    unlockColumns(fields: string[], update = true)
    {
        let options = this.getOptions();
        if (options.lockable)
        {
            for (let field of fields)
                this.unlockColumn(field, false);

            if (update)
                this.update();
        }
    }

    unlockColumn(field: string, update = true)
    {
        let options = this.getOptions();
        if (options.lockable)
        {
            puma(this._divHeaderLocked).find("th[field='" + field + "']").removeAttr("locked");
            puma(this._divHeaderLocked).find("th[field='" + field + "']").vrAppendToPuma(puma(this._divHeader).find("tr"));
            puma(this._divFiltersLocked).find("td[field='" + field + "']").vrAppendToPuma(puma(this._divFilters).find("tr"));
            puma(this._divTotalsLocked).find("td[field='" + field + "']").vrAppendToPuma(puma(this._divTotals).find("tr"));

            let column = this.column(field);
            if (column != null)
            {
                column.locked = false;

                //#region Move column to correct index
                let columnToMoveIndex = options.columns!.indexOf(column);
                let columnToMove = options.columns!.splice(columnToMoveIndex, 1)[0];
                options.columns!.splice(options.columns!.length, 0, columnToMove);
                //#endregion
            }

            if (!this.thereAreLockedColumns())
            {
                if (this._divHeaderLocked != null) this._divHeaderLocked.style.cssText += "display: none;";
                if (this._divFiltersLocked != null) this._divFiltersLocked.style.cssText += "display: none;";
                if (this._divBodyLocked != null) this._divBodyLocked.style.cssText += "display: none;";
                if (this._divTotalsLocked != null) this._divTotalsLocked.style.cssText += "display: none;";

                //#region Edit Button
                let columnEditButton = this.column("editButton");
                if (columnEditButton != null)
                {
                    columnEditButton.locked = false;

                    //#region Move column to correct index
                    let columnToMoveIndex = options.columns!.indexOf(columnEditButton);
                    let columnToMove = options.columns!.splice(columnToMoveIndex, 1)[0];
                    options.columns!.splice(0, 0, columnToMove);
                    //#endregion

                    let fieldAfterEditButton = options.columns![1].field;
                    puma(this._divHeaderLocked).find("th[field='" + "editButton" + "']").removeAttr("locked");
                    puma(this._divHeaderLocked).find("th[field='" + "editButton" + "']").vrInsertBeforePuma(puma(this._divHeader).find("tr th[field='" + fieldAfterEditButton + "']"));
                    puma(this._divFiltersLocked).find("td[field='" + "editButton" + "']").vrInsertBeforePuma(puma(this._divFilters).find("tr td[field='" + fieldAfterEditButton + "']"));
                    puma(this._divTotalsLocked).find("td[field='" + "editButton" + "']").vrInsertBeforePuma(puma(this._divTotals).find("tr td[field='" + fieldAfterEditButton + "']"));
                }
                //#endregion

                //#region Checkboxes
                if (options.checkboxes !== false)
                {
                    let firstColumnField = options.columns![0].field;
                    puma(this._divHeaderLocked).find("th[field='" + "vrGridCheckboxColumn" + "']").vrInsertBeforePuma(puma(this._divHeader).find("tr th[field='" + firstColumnField + "']"));
                    puma(this._divFiltersLocked).find("td[field='" + "vrGridCheckboxColumn" + "']").vrInsertBeforePuma(puma(this._divFilters).find("tr td[field='" + firstColumnField + "']"));
                    puma(this._divTotalsLocked).find("td[field='" + "vrGridCheckboxColumn" + "']").vrInsertBeforePuma(puma(this._divTotals).find("tr td[field='" + firstColumnField + "']"));
                }
                //#endregion
            }

            this.recalculateHeightWidth();
            if (update)
                this.update();
        }
    }

    lockedColumns()
    {
        let options = this.getOptions();
        return options.columns!.filter(k => k.locked && k.field != "editButton");
    }

    thereAreLockedColumns()
    {
        let options = this.getOptions();
        return options.lockable && options.columns!.filter(k => k.field != "editButton").vrAny(k => k.locked);
    }
    //#endregion

    //#region GroupBy
    removeGroup(field: string, updateDataSource = true)
    {
        this.removeGroups([field], updateDataSource);
    }

    removeGroups(fields: string[], updateDataSource = true)
    {
        let options = this.getOptions();
        if (options.groupable! && options.groupBy != null)
        {
            for (let field of fields)
            {
                if (((options.groupBy as GridGroupBySettings).fields as GridGroupByItem[]).map(k => k.field).includes(field))
                    ((options.groupBy as GridGroupBySettings).fields as GridGroupByItem[]).vrDeleteAllBy(k => (k as GridGroupByItem).field == field);

                puma("#" + this._elementId + "_divContainer").find(".groupBy" + field).hide();
            }

            if ((options.groupBy as GridGroupBySettings).fields == null || ((options.groupBy as GridGroupBySettings).fields as GridGroupByItem[]).length == 0)
                options.groupBy = null;

            if (updateDataSource)
                this.update();
        }
    }

    removeAllGroups(updateDataSource = true)
    {
        this.removeSort(false);
        let options = this.getOptions();
        if (options.groupable! && options.groupBy != null)
            this.removeGroups(((options.groupBy as GridGroupBySettings).fields as GridGroupByItem[]).map(k => k.field), false);

        options.groupBy = null;
        if (updateDataSource)
            this.update();
    }

    addGroup(field: string | GridGroupByItem, updateDataSource = true, sortBy?: GridSortSettings, internalSortBy?: GridSortSettings)
    {
        this.addGroups([field], updateDataSource, sortBy, internalSortBy);
    }

    addGroups(fields: (string | GridGroupByItem)[], updateDataSource = true, sortBy?: GridSortSettings, internalSortBy?: GridSortSettings)
    {
        if (fields.length == 0)
            return;

        let options = this.getOptions();
        if (options.groupBy == null)
            options.groupBy = new GridGroupBySettings();
        else
        {
            if (options.groupBy != null && (options.groupBy as GridGroupBySettings).fields != null && (options.groupBy as GridGroupBySettings).fields.length > 0)
            {
                // If grid is grouped, then remove all groups and re-added all
                let allFields: any[] = UtilityManager.duplicate((options.groupBy as GridGroupBySettings).fields);
                for (let field of fields)
                {
                    let realField = "";
                    if (typeof (field) == "string")
                        realField = field;
                    else
                        realField = field.field;

                    if (!allFields.map(k => k.field).includes(realField))
                        allFields.push(field);
                }

                this.removeAllGroups(false);
                this.addGroups(allFields, updateDataSource, sortBy, internalSortBy);
                return;
            }
        }

        if (!options.groupable)
            throw new Error("Griglia non raggruppabile! Mettere opzione .groupable: true");

        if (sortBy != null)
            (options.groupBy as GridGroupBySettings).sortBy = sortBy;

        if (internalSortBy != null)
            (options.groupBy as GridGroupBySettings).internalSortBy = internalSortBy;

        for (let field of fields)
        {
            let groupByItem = field;
            if (typeof (field) == "string")
            {
                groupByItem = new GridGroupByItem();
                groupByItem.field = field;
            }

            if ((options.groupBy as GridGroupBySettings).fields == null) (options.groupBy as GridGroupBySettings).fields = [];
            if (!((options.groupBy as GridGroupBySettings).fields as GridGroupByItem[]).map(k => k.field).includes((groupByItem as GridGroupByItem).field))
                ((options.groupBy as GridGroupBySettings).fields as GridGroupByItem[]).push(groupByItem as GridGroupByItem);

            let groupByField = field;
            if (typeof (field) != "string")
                groupByField = field.field;

            puma("#" + this._elementId + "_divContainer").find(".groupBy" + groupByField).show();

            let headerClasses = Array.from(puma(this._divHeader).find(">table tr:first-child th")).map(k => (k as any).classList[0]);
            if (!headerClasses.includes("groupBy" + (groupByItem as GridGroupByItem).field))
                puma(this._divHeader).find(">table tr:first-child").vrPrependPuma("<th class='groupBy" + (groupByItem as GridGroupByItem).field + " groupByHeader' field='" + (groupByItem as GridGroupByItem).field + "'></th>");

            let filterClasses = Array.from(puma(this._divFilters).find(">table tr:first-child td")).map(k => (k as any).classList[0]);
            if (!filterClasses.includes("groupBy" + (groupByItem as GridGroupByItem).field))
                puma(this._divFilters).find(">table tr:first-child").vrPrependPuma("<td class='groupBy" + (groupByItem as GridGroupByItem).field + " groupByFilter'></td>");

            if (options.lockable)
            {
                let headerLockedClasses = Array.from(puma(this._divHeaderLocked).find(">table tr:first-child th")).map(k => (k as any).classList[0]);
                if (!headerLockedClasses.includes("groupBy" + (groupByItem as GridGroupByItem).field))
                    puma(this._divHeaderLocked).find(">table tr:first-child").vrPrependPuma("<th class='groupBy" + (groupByItem as GridGroupByItem).field + " groupByHeader' field='" + (groupByItem as GridGroupByItem).field + "'></th>");

                let filterLockedClasses = Array.from(puma(this._divFiltersLocked).find(">table tr:first-child td")).map(k => (k as any).classList[0]);
                if (!filterLockedClasses.includes("groupBy" + (groupByItem as GridGroupByItem).field))
                    puma(this._divFiltersLocked).find(">table tr:first-child").vrPrependPuma("<td class='groupBy" + (groupByItem as GridGroupByItem).field + " groupByFilter'></td>");
            }

            let columnFields = options.columns!.map(k => k.field);
            if (!columnFields.includes((groupByItem as GridGroupByItem).field))
                options.columns!.push({ field: (groupByItem as GridGroupByItem).field, hidden: true });
        }

        this.sortingGroupFields(this.dataSource());

        if (updateDataSource)
            this.update();
    }

    private getChildrenGroupRows(tr: HTMLElement, divBody: HTMLElement)
    {
        let childrenGroupRows: GridChildrenGroupRows = new GridChildrenGroupRows();
        let childrenList: HTMLElement[] = [];

        //#region Group level
        let level = Number(puma(tr).attr("level"));
        let i = puma(tr).index() + 2;
        let childrenRow = puma(divBody).find("tr:nth-child(" + i + ")");
        let childrenLevel = Number(puma(divBody).find("tr:nth-child(" + i + ")").attr("level"));
        childrenList.push(childrenRow[0]);
        //#endregion

        //#region Get children
        while ((level == 0 && childrenLevel != level) || (level != childrenLevel && !childrenRow.hasClass("grid_trGroupBy")))
        {
            if (childrenRow.length == 0)
                break;

            if (!childrenList.map(k => puma(k).attr("id")).includes(childrenRow.attr("id")) || childrenRow.hasClass("grid_trGroupBy"))
                childrenList.push(childrenRow[0]);

            i++;
            childrenRow = puma(divBody).find("tr:nth-child(" + i + ")");
            childrenLevel = Number(puma(divBody).find("tr:nth-child(" + i + ")").attr("level"));
        }
        //#endregion

        childrenList = childrenList.filter(k => !puma(k).hasClass("p-grid-totalsGroup"));
        childrenGroupRows.children = childrenList.filter(k => !puma(k).hasClass("grid_trGroupBy"));
        childrenGroupRows.groupRows = childrenList.filter(k => puma(k).hasClass("grid_trGroupBy"));
        childrenGroupRows.allRows = childrenList;
        return childrenGroupRows;
    }

    private getCheckedChildrenGroupRows(tr: HTMLElement, divBody: HTMLElement)
    {
        let checkedChildren = [];
        let childrenRows = this.getChildrenGroupRows(tr, divBody);
        for (let childRow of childrenRows.children)
        {
            let checkBox = puma(childRow).find(".vr-checkbox-column")[0] as HTMLInputElement;
            if (checkBox != null && checkBox.checked)
                checkedChildren.push(childRow);
        }
        return checkedChildren;
    }
    //#endregion

    //#region Table actions (Show/Hide & GroupBy)
    private createWindowActions()
    {
        if (this._wndActions != null)
            return;

        this._wndActions = createWindow(
            {
                addToControlList: false,
                width: 530,
                height: 400,
                closeable: false,
                title: "Mostra/Nascondi colonne",
                classContainer: this.element().id + "_wndUtility",
                onClose: (e) =>
                {
                    puma(this._wndActions.container()).remove();
                    (this._wndActions as any) = null;
                },
                footer:
                    [
                        {
                            type: WindowFooterItemTypeEnum.Custom, text: "Reimposta", mode: ButtonModeEnum.Primary,
                            value: "restoreOriginal", icon: IconClassicLight.RotateLeft, align: WindowFooterItemAlignEnum.Left,
                            onClick: (e) =>
                            {
                                let wndTableActionsContainer = puma("#" + this._elementId + "_divWindowTableActionsContainer");
                                for (let checkBoxElement of Array.from<HTMLInputElement>(wndTableActionsContainer.find("input")))
                                {
                                    let checkBox = ControlManager.get<CheckBox>(checkBoxElement.id);
                                    let field = puma(checkBoxElement).attr("field");

                                    let newValue = !this._originalHiddenColumnFields.includes(field);
                                    if (checkBox.checked() != newValue)
                                        checkBox.checked(newValue);
                                }
                            }
                        },
                        {
                            type: WindowFooterItemTypeEnum.Custom, text: "Seleziona tutti", mode: ButtonModeEnum.Primary,
                            value: "checkAll", icon: IconClassicLight.Check, align: WindowFooterItemAlignEnum.Left,
                            onClick: (e) =>
                            {
                                let wndTableActionsContainer = puma("#" + this._elementId + "_divWindowTableActionsContainer");
                                for (let checkBoxElement of Array.from<HTMLInputElement>(wndTableActionsContainer.find("input")))
                                {
                                    let checkBox = ControlManager.get<CheckBox>(checkBoxElement.id);
                                    if (!checkBox.checked())
                                        checkBox.checked(true, true);
                                }
                            }
                        },
                        {
                            type: WindowFooterItemTypeEnum.Custom, text: "Deseleziona tutti", icon: IconClassicLight.Check,
                            align: WindowFooterItemAlignEnum.Left,
                            onClick: (e) =>
                            {
                                let wndTableActionsContainer = puma("#" + this._elementId + "_divWindowTableActionsContainer");
                                for (let checkBoxElement of Array.from<HTMLInputElement>(wndTableActionsContainer.find("input")))
                                {
                                    let checkBox = ControlManager.get<CheckBox>(checkBoxElement.id);
                                    if (checkBox.checked())
                                        checkBox.checked(false, true);
                                }
                            }
                        },
                        { type: WindowFooterItemTypeEnum.Close, align: WindowFooterItemAlignEnum.Right },
                        { type: WindowFooterItemTypeEnum.Ok, value: "ok", text: "Applica", align: WindowFooterItemAlignEnum.Right }
                    ]
            });
        puma(this._wndActions.element()).vrAppendPuma("<div id='" + this._elementId + "_divWindowTableActionsContainer'  class='vrContainer'></div>");
    }

    private openWindowActions(gridActionEnum: GridActionEnum)
    {
        this.createWindowActions();

        let groupFieldAddedList: string[] = [];
        let groupFieldRemovedList: string[] = [];
        let columnFieldToShowList: string[] = [];
        let columnFieldToHideList: string[] = [];
        let columnFieldToLockList: string[] = [];
        let columnFieldToUnlockList: string[] = [];
        let editTableActions = false;

        let options = this.getOptions();
        this._wndActions.open([
            {
                value: "ok", callback: () =>
                {
                    if (!editTableActions)
                        return;

                    if (this.dataSource().length > 1000)
                        showLoader();

                    this._wndActions.close();
                    window.setTimeout(() =>
                    {
                        if (gridActionEnum == GridActionEnum.GroupBy && (groupFieldRemovedList.length > 0 || groupFieldAddedList.length > 0))
                        {
                            //#region Manage groups
                            this.removeGroups(groupFieldRemovedList, false);
                            this.addGroups(groupFieldAddedList, false);
                            this.update();
                            //#endregion
                        }
                        else if (gridActionEnum == GridActionEnum.ShowHide && (columnFieldToShowList.length > 0 || columnFieldToHideList.length > 0))
                        {
                            //#region Show/Hide
                            this.showColumns(columnFieldToShowList, false);
                            this.hideColumns(columnFieldToHideList, false);
                            this.removeFilters(columnFieldToHideList, false);

                            if (columnFieldToHideList.length > 0)
                                this.applyFilters(true);
                            else
                                this.update();
                            //#endregion
                        }
                        else if (gridActionEnum == GridActionEnum.LockUnlock && (columnFieldToLockList.length > 0 || columnFieldToUnlockList.length > 0))
                        {
                            //#region Lock/Unlock
                            if (columnFieldToLockList.length > 0 || (this.lockedColumns().length - columnFieldToUnlockList.length > 0))
                            {
                                this.lockColumns(columnFieldToLockList, false);
                                this.unlockColumns(columnFieldToUnlockList, false);
                                this.update();
                            }
                            else
                            {
                                confirm("Vuoi ripristinare il layout di base?").then(() =>
                                {
                                    this.lockColumns(columnFieldToLockList, false);
                                    this.unlockColumns(columnFieldToUnlockList, false);

                                    this._actualLayout = null;
                                    this.changeLayout(true, this._originalOptionsForLayout);
                                },
                                    () => 
                                    {
                                        this.lockColumns(columnFieldToLockList, false);
                                        this.unlockColumns(columnFieldToUnlockList, false);
                                        this.update()
                                    });
                            }
                            //#endregion
                        }

                        hideLoader();
                    }, 100)
                }
            }]);
        this.clearWindowActions();

        let divContainer = puma("#" + this._elementId + "_divWindowTableActionsContainer")[0];
        divContainer.style.cssText += "overflow-y: auto;";

        if (gridActionEnum == GridActionEnum.ShowHide)
            this._wndActions.title("Mostra o nascondi colonne");
        else if (gridActionEnum == GridActionEnum.GroupBy)
            this._wndActions.title("Raggruppa per colonne");
        else if (gridActionEnum == GridActionEnum.LockUnlock)
            this._wndActions.title("Blocca o sblocca colonne");

        //#region Write columns
        for (let column of options.columns!)
        {
            if (column.type == GridColumnTypeEnum.EditButton || column.title === "" || column.title == null)
                continue;

            if ((gridActionEnum == GridActionEnum.ShowHide && column.hideable === false)
                || (gridActionEnum == GridActionEnum.GroupBy && column.groupable === false)
                || (gridActionEnum == GridActionEnum.LockUnlock && column.lockable === false))
                continue;

            let div = puma("<div id='" + this._elementId + "_divActionColumn" + column.field + "' field='" + column.field + "' class='grid_divActionColumn'></div>").vrAppendToPuma(divContainer);

            //#region CheckBox
            let checked = false;
            if (gridActionEnum == GridActionEnum.ShowHide)
            {
                checked = (column.hidden !== true);
                this._wndActions.footerItem("restoreOriginal")!.show();
            }
            else if (gridActionEnum == GridActionEnum.GroupBy)
            {
                checked = (options.groupable! && options.groupBy != null && (options.groupBy as GridGroupBySettings).fields != null) ? (((options.groupBy! as GridGroupBySettings).fields as GridGroupByItem[]).map(k => k.field).includes(column.field)) : false;
                this._wndActions.footerItem("restoreOriginal")!.hide();
            }
            else if (gridActionEnum == GridActionEnum.LockUnlock)
            {
                checked = (column.locked === true);
                this._wndActions.footerItem("restoreOriginal")!.hide();
                this._wndActions.footerItem("checkAll")!.hide();
            }

            let checkBoxElement = puma("<input id='" + this._elementId + "_chkActionColumn" + column.field + "' field='" + column.field + "' />").vrAppendToPuma(div);
            createCheckBox(
                {
                    checked: checked,
                    text: column.title,
                    cssContainer: "width: 100%",
                    onCheck: (e) =>
                    {
                        editTableActions = true;
                        let field = puma(e.sender.element()).attr("field");

                        if (gridActionEnum == GridActionEnum.ShowHide)
                        {
                            //#region Show/Hide
                            if (e.checked && !columnFieldToShowList.includes(field))
                            {
                                columnFieldToShowList.push(field);
                                if (columnFieldToHideList.includes(field))
                                    columnFieldToHideList.vrDelete(field);
                            }
                            else if (!e.checked && !columnFieldToHideList.includes(field))
                            {
                                columnFieldToHideList.push(field);
                                if (columnFieldToShowList.includes(field))
                                    columnFieldToShowList.vrDelete(field);
                            }
                            //#endregion
                        }
                        else if (gridActionEnum == GridActionEnum.GroupBy)
                        {
                            //#region Manage groups
                            if (e.checked && !groupFieldAddedList.includes(field)) // Add
                            {
                                groupFieldAddedList.push(field);
                                if (groupFieldRemovedList.includes(field))
                                    groupFieldRemovedList.vrDelete(field);
                            }
                            else if (!e.checked && !groupFieldRemovedList.includes(field)) // Remove
                            {
                                groupFieldRemovedList.push(field);
                                if (groupFieldAddedList.includes(field))
                                    groupFieldAddedList.vrDelete(field);
                            }
                            //#endregion
                        }
                        else if (gridActionEnum == GridActionEnum.LockUnlock)
                        {
                            //#region Lock/Unlock
                            if (e.checked && !columnFieldToLockList.includes(field))
                            {
                                columnFieldToLockList.push(field);
                                if (columnFieldToUnlockList.includes(field))
                                    columnFieldToUnlockList.vrDelete(field);
                            }
                            else if (!e.checked && !columnFieldToUnlockList.includes(field))
                            {
                                columnFieldToUnlockList.push(field);
                                if (columnFieldToLockList.includes(field))
                                    columnFieldToLockList.vrDelete(field);
                            }
                            //#endregion
                        }
                    }
                }, null, null, this._elementId + "_chkActionColumn" + column.field);
            //#endregion
        }
        //#endregion
    }

    private clearWindowActions()
    {
        puma("#" + this._elementId + "_divWindowTableActionsContainer").empty();
    }
    //#endregion

    //#region Filtering
    private manageFilterTextByColumn(textToSearch: string, column: GridColumn, field: string, backSpace: boolean)
    {
        let filteredArray: any[] = [];
        if (column.type == GridColumnTypeEnum.Custom)
        {
            //#region Custom column
            filteredArray = this._originalDataSource.filter(k => 
            {
                let properties = (column.customFilterProperties != null && column.customFilterProperties.length > 0) ? column.customFilterProperties : Object.keys(k);
                for (let value in k)
                {
                    if (!properties.includes(value))
                        continue;

                    if (String(k[value]).toLowerCase().indexOf(textToSearch) != -1)
                        return true;
                }
                return false;
            });
            //#endregion
        }
        else
            filteredArray = this.getFilteredArrayByInputText(field, textToSearch);

        if (!Array.vrEquals(filteredArray, this.dataSource()) || column.filterWebService === true)
        {
            this._timeoutFilterText = window.setTimeout(() =>
            {
                this.removeFilter(column.field, false);
                if (column.filterWebService === true)
                {
                    //#region Add filter condition
                    let filterSettings = new GridFilterSettings();
                    filterSettings.type = column.type!;
                    filterSettings.stringFilterSettings = new GridStringFilterSettings();
                    filterSettings.stringFilterSettings.filterTypeEnum = GridStringFilterTypeEnum.IncludesFromSimpleSearch;
                    filterSettings.stringFilterSettings.text = textToSearch.toLowerCase();
                    this.updateFilter(column.field, filterSettings, false);
                    //#endregion

                    this.rebind(null, true);
                }
                else
                {
                    this.pageSelected(1, false);
                    this.setDataSource(filteredArray);

                    if (this._dictionaryFilterConditions.size > 0)
                        this.applyFilters();

                    //#region Add filter condition
                    let filterSettings = new GridFilterSettings();
                    filterSettings.type = column.type!;
                    filterSettings.stringFilterSettings = new GridStringFilterSettings();
                    filterSettings.stringFilterSettings.filterTypeEnum = GridStringFilterTypeEnum.IncludesFromSimpleSearch;
                    filterSettings.stringFilterSettings.text = textToSearch.toLowerCase();
                    this.updateFilter(column.field, filterSettings, false);
                    //#endregion
                }
            }, 500);
        }
    }

    clearFilters(updateDataSource = true, rebind = false)
    {
        let options = this.getOptions();
        this._dictionaryFilterConditions.forEach((value, key) =>
        {
            //#region Type
            let column = options.columns!.find(k => k.field == key)!;
            switch (column.type)
            {
                case GridColumnTypeEnum.Checkbox:
                case GridColumnTypeEnum.Boolean:
                    {
                        let checkboxJq = puma("#" + this._elementId + "_CheckboxFilter_" + column.field);
                        checkboxJq.addClass("indeterminateVrCheckbox");

                        let checkbox = checkboxJq[0] as HTMLInputElement;
                        checkbox.checked = false;
                    }
                    break;
                case GridColumnTypeEnum.Date:
                    {
                        let dateFilter = ControlManager.get<Button>(this._elementId + "_DateFilter_" + column.field);
                        dateFilter.tooltip("");
                        puma(dateFilter.element()).css("background-color", "#f3f3f3");
                        puma(dateFilter.element()).css("color", "#000");

                        let dateFilterRemove = ControlManager.get<Button>(this._elementId + "_DateFilterRemove_" + column.field);
                        dateFilterRemove.hide();
                        this.recalculateHeight(true);
                    }
                    break;
                case GridColumnTypeEnum.Number:
                case GridColumnTypeEnum.Currency:
                case GridColumnTypeEnum.Percentage:
                case GridColumnTypeEnum.Duration:
                    {
                        let numberFilter = ControlManager.get<Button>(this._elementId + "_NumberFilter_" + column.field);
                        numberFilter.tooltip("");
                        puma(numberFilter.element()).css("background-color", "#f3f3f3");
                        puma(numberFilter.element()).css("color", "#000");

                        let numberFilterRemove = ControlManager.get<Button>(this._elementId + "_NumberFilterRemove_" + column.field);
                        numberFilterRemove.hide();
                        this.recalculateHeight(true);
                    }
                    break;
                case GridColumnTypeEnum.String:
                case GridColumnTypeEnum.Custom:
                case GridColumnTypeEnum.Label:
                    {
                        let textBox = ControlManager.get<TextBox>(this._elementId + "_StringFilter_" + column.field);
                        textBox.clear();
                        textBox.width("Calc(100% - 27px)");

                        let stringFilter = ControlManager.get<Button>(this._elementId + "_StringFilterBtn_" + column.field);
                        stringFilter.tooltip("");
                        puma(stringFilter.element()).css("background-color", "#f3f3f3");
                        puma(stringFilter.element()).css("color", "#000");

                        let stringFilterRemove = ControlManager.get<Button>(this._elementId + "_StringFilterBtnRemove_" + column.field);
                        stringFilterRemove.hide();
                        this.recalculateHeight(true);
                    }
                    break;
            }
            //#endregion

            this.removeFilter(key, false);
        });

        if (updateDataSource)
            this.update();

        if (rebind)
            this.rebind();
    }

    private getFilteredArrayByInputText(field: string, value: string)
    {
        value = value.toLowerCase();
        let filteredArray: any[] = [];

        let arrayWhereSearch = this._dictionaryDataValues.get(field);
        arrayWhereSearch!.forEach((k, index) => 
        {
            if (k.indexOf(value) !== -1)
                filteredArray.push(this._originalDataSource[index]);
        });
        return filteredArray;
    }

    private createWindowFiltering()
    {
        if (this._wndFiltering != null)
            return;

        this._wndFiltering = createWindow(
            {
                addToControlList: false,
                classContainer: this.element().id + "_wndUtility",
                width: 430,
                autoSize: WindowAutoSizeDirectionEnum.Height,
                title: "Gestisci filtro",
                onClose: (e) =>
                {
                    puma(this._wndFiltering.container()).remove();
                    (this._wndFiltering as any) = null;
                },
                footer:
                    [
                        { type: WindowFooterItemTypeEnum.Ok, text: "Applica" },
                        { type: WindowFooterItemTypeEnum.Close },
                        { type: WindowFooterItemTypeEnum.Separator, value: "removeFilterSeparator" },
                        { type: WindowFooterItemTypeEnum.Custom, text: "Rimuovi filtro", value: "removeFilter", cssContainer: "margin-right: 18px;" }
                    ]
            });

        puma(this._wndFiltering.element()).vrAppendPuma("<div id='" + this._elementId + "_divWindowFilteringContainer' class='vrContainer'></div>");
        let divContainer = puma("#" + this._elementId + "_divWindowFilteringContainer")[0];

        puma("<div id='" + this._elementId + "_switchFilterSearch'></div>").vrAppendToPuma(divContainer);
        createSwitch({
            labelOff: "Ricerca con parametri",
            labelOn: { text: "Ricerca puntuale", tooltip: "Max 100 valori" },
            cssContainer: "margin-bottom: 5px;",
            onChange: (e) =>
            {
                puma(divSearchIntervals).vrVisible(!e.checked);
                puma(divSearchSpecific).vrVisible(e.checked);
                let lblCheckboxSelected = this._wndFiltering.footerItem<Label>("lblCheckboxSelectedSpecificValues");
                lblCheckboxSelected.visible(e.checked);

                this._wndFiltering.center();
                if (e.checked)
                    txtFilterSpecificValues.focus();
            }
        }, null, null, this._elementId + "_switchFilterSearch")

        //#region Search intervals
        let divSearchIntervals = div(divContainer);

        //#region Filter date
        let divFilterDate = puma("<div id='" + this._elementId + "DivFilterDate' style='display: none;'></div>").vrAppendToPuma(divSearchIntervals);
        let dateFilterType = puma("<div id='" + this._elementId + "_ddlFilterDateType'></div>").vrAppendToPuma(divFilterDate);

        let datePickerDateFilterValueFrom: DatePicker;
        let datePickerDateFilterValueTo: DatePicker;
        let datePickerDateTimeFilterValueFrom: DatePicker;
        let datePickerDateTimeFilterValueTo: DatePicker;
        let numericTextBoxFilterValueTo: TextBox;
        createComboBox(
            {
                mode: ComboBoxTypeEnum.DropDown,
                label: "Tipo di filtro",
                width: "100%",
                cssContainer: "margin-bottom: 10px;",
                items:
                    [
                        { text: "Data maggiore di", value: String(GridDateFilterTypeEnum.GreaterThan) },
                        { text: "Data minore di", value: String(GridDateFilterTypeEnum.LessThan) },
                        { text: "Data uguale a", value: String(GridDateFilterTypeEnum.EqualsTo) },
                        { text: "Data compresa tra", value: String(GridDateFilterTypeEnum.Between) }
                    ],
                onAfterChange: (e) =>
                {
                    if (datePickerDateFilterValueTo == null || datePickerDateTimeFilterValueTo == null)
                        return;

                    if (Number(e.sender.value()) == GridDateFilterTypeEnum.Between)
                    {
                        if (datePickerDateFilterValueFrom.visible())
                            datePickerDateFilterValueTo.show();
                        else
                            datePickerDateTimeFilterValueTo.show();
                    }
                    else
                    {
                        if (datePickerDateFilterValueFrom.visible())
                            datePickerDateFilterValueTo.hide();
                        else
                            datePickerDateTimeFilterValueTo.hide();
                    }
                }
            }, null, null, this._elementId + "_ddlFilterDateType");

        //#region Date/Time
        puma("<input id='" + this._elementId + "_dtpFilterDateFrom' />").vrAppendToPuma(divFilterDate);
        datePickerDateFilterValueFrom = createDatePicker(
            {
                width: 200,
                cssContainer: "margin-right: 5px;"
            }, null, null, this._elementId + "_dtpFilterDateFrom");

        puma("<input id='" + this._elementId + "_dtpFilterDateTo' />").vrAppendToPuma(divFilterDate);
        datePickerDateFilterValueTo = createDatePicker(
            {
                width: 198,
                label: "e",
                labelSettings: { position: PositionEnum.Left },
                visible: false
            }, null, null, this._elementId + "_dtpFilterDateTo");
        //#endregion

        //#region DateTime
        puma("<input id='" + this._elementId + "_dtpDateTimeFilterDateFrom' />").vrAppendToPuma(divFilterDate);
        datePickerDateTimeFilterValueFrom = createDatePicker(
            {
                width: 200,
                cssContainer: "margin-right: 5px;",
                visible: false,
                mode: DateModeEnum.DateTime
            }, null, null, this._elementId + "_dtpDateTimeFilterDateFrom");

        puma("<input id='" + this._elementId + "_dtpDateTimeFilterDateTo' />").vrAppendToPuma(divFilterDate);
        datePickerDateTimeFilterValueTo = createDatePicker(
            {
                width: 198,
                label: "e",
                labelSettings: { position: PositionEnum.Left },
                visible: false,
                mode: DateModeEnum.DateTime
            }, null, null, this._elementId + "_dtpDateTimeFilterDateTo");
        //#endregion

        //#endregion

        //#region Filter number
        let divFilterNumber = puma("<div id='" + this._elementId + "DivFilterNumber' style='display: none;'></div>").vrAppendToPuma(divSearchIntervals);
        puma("<div id='" + this._elementId + "_ddlFilterNumberType'></div>").vrAppendToPuma(divFilterNumber);
        createComboBox(
            {
                mode: ComboBoxTypeEnum.DropDown,
                label: "Tipo di filtro",
                width: "100%",
                cssContainer: "margin-bottom: 10px;",
                items:
                    [
                        { text: "Numero maggiore di", value: String(GridNumberFilterTypeEnum.GreaterThan) },
                        { text: "Numero minore di", value: String(GridNumberFilterTypeEnum.LessThan) },
                        { text: "Numero uguale a", value: String(GridNumberFilterTypeEnum.EqualsTo) },
                        { text: "Numero compreso tra", value: String(GridNumberFilterTypeEnum.Between) }
                    ],
                onAfterChange: (e) =>
                {
                    if (numericTextBoxFilterValueTo == null)
                        return;

                    if (Number(e.sender.value()) == GridNumberFilterTypeEnum.Between)
                        numericTextBoxFilterValueTo.show();
                    else
                        numericTextBoxFilterValueTo.hide();
                }
            }, null, null, this._elementId + "_ddlFilterNumberType");

        puma("<input id='" + this._elementId + "_ntbFilterNumberFrom' />").vrAppendToPuma(divFilterNumber);
        createTextBox(
            {
                mode: TextModeEnum.Numeric,
                cssContainer: "margin-right: 5px;",
                decimals: 2,
                validation: { minValue: 0 }
            }, null, null, this._elementId + "_ntbFilterNumberFrom");

        puma("<input id='" + this._elementId + "_ntbFilterNumberTo' />").vrAppendToPuma(divFilterNumber);
        numericTextBoxFilterValueTo = createTextBox(
            {
                mode: TextModeEnum.Numeric,
                label: "e",
                labelSettings: { position: PositionEnum.Left },
                visible: false,
                decimals: 2
            }, null, null, this._elementId + "_ntbFilterNumberTo");
        //#endregion

        //#region Filter string
        let divFilterString = puma("<div id='" + this._elementId + "DivFilterString' style='display: none;'></div>").vrAppendToPuma(divSearchIntervals);
        puma("<div id='" + this._elementId + "_ddlFilterStringType'></div>").vrAppendToPuma(divFilterString);
        createComboBox(
            {
                mode: ComboBoxTypeEnum.DropDown,
                label: "Tipo di filtro",
                width: "100%",
                cssContainer: "margin-bottom: 10px;",
                items:
                    [
                        { text: "Inizia con", value: String(GridStringFilterTypeEnum.StartsWith) },
                        { text: "Finisce con", value: String(GridStringFilterTypeEnum.EndsWith) },
                        { text: "Uguale a", value: String(GridStringFilterTypeEnum.EqualsTo) },
                        { text: "Contiene", value: String(GridStringFilterTypeEnum.Includes) }
                    ],
                onAfterChange: (e) =>
                {
                    if (numericTextBoxFilterValueTo == null)
                        return;

                    if (Number(e.sender.value()) == GridNumberFilterTypeEnum.Between)
                        numericTextBoxFilterValueTo.show();
                    else
                        numericTextBoxFilterValueTo.hide();
                }
            }, null, null, this._elementId + "_ddlFilterStringType");

        puma("<input id='" + this._elementId + "_txtFilterStringValue' />").vrAppendToPuma(divFilterString);
        createTextBox(
            {
                width: "100%",
            }, null, null, this._elementId + "_txtFilterStringValue");
        //#endregion

        //#endregion

        //#region Search specific vlaues
        let divSearchSpecific = div(divContainer, { css: "display: none;", class: "vrGridDivSpecificValues" });
        let divFilterSpecificValues = div(divSearchSpecific);
        let timeoutSearch = 0;

        createCheckBox({
            cssContainer: "top: 4px;",
            onCheck: (e) =>
            {
                let allCheckboxes = Array.from<HTMLInputElement>(puma(this._wndFiltering.element()).find(".vrGrid_divSearchSpecificValues input"));
                for (let checkbox of allCheckboxes)
                    checkbox.checked = e.checked;

                puma(e.sender.element()).removeClass("indeterminateVrCheckbox");
                let lblCheckboxSelected = this._wndFiltering.footerItem<Label>("lblCheckboxSelectedSpecificValues");
                if (e.checked)
                    lblCheckboxSelected.value(allCheckboxes.length + " di " + allCheckboxes.length + " elementi");
                else
                    lblCheckboxSelected.value(allCheckboxes.length + " elementi");
            }
        }, divFilterSpecificValues, null, this._elementId + "_checkAllFilterSearchSpecificValues")

        let txtFilterSpecificValues = createTextBox({
            width: "Calc(100% - 27px)",
            css: "border: solid 1px #ddd !important;",
            onKeyUp: (e) =>
            {
                window.clearTimeout(timeoutSearch);
                timeoutSearch = window.setTimeout(() =>
                {
                    let checkboxToShowList = [];
                    let checkboxToHideList = [];
                    for (let checkbox of Array.from<HTMLInputElement>(puma(this._wndFiltering.element()).find(".vrGrid_divSearchSpecificValues input")))
                    {
                        if (e.value != "")
                        {
                            let tag = String(JSON.parse(checkbox.getAttribute("tag")!));
                            if (tag.toLowerCase().indexOf(String(e.value!).toLowerCase()) !== -1)
                                checkboxToShowList.push(checkbox.parentElement!);
                            else
                                checkboxToHideList.push(checkbox.parentElement!);
                        }
                        else
                            checkboxToShowList.push(checkbox.parentElement!);
                    }

                    for (let checkboxToShow of checkboxToShowList) checkboxToShow.style.display = "flex";
                    for (let checkboxToHide of checkboxToHideList) checkboxToHide.style.display = "none";
                }, 300)
            }
        }, divFilterSpecificValues, null, this._elementId + "_txtFilterSearchSpecificValues")

        let dtpFilterSpecificValues = createDatePicker({
            width: "Calc(100% - 27px)",
            css: "border: solid 1px #ddd !important;",
            onAfterChange: (e) =>
            {
                let checkboxToShowList = [];
                let checkboxToHideList = [];
                for (let checkbox of Array.from<HTMLInputElement>(puma(this._wndFiltering.element()).find(".vrGrid_divSearchSpecificValues input")))
                {
                    if (e.value != null)
                    {
                        e.value.setHours(0, 0, 0);
                        let tag = new Date(JSON.parse(checkbox.getAttribute("tag")!));
                        if (Date.vrEquals(tag, e.value))
                            checkboxToShowList.push(checkbox.parentElement!);
                        else
                            checkboxToHideList.push(checkbox.parentElement!);
                    }
                    else
                        checkboxToShowList.push(checkbox.parentElement!);
                }

                for (let checkboxToShow of checkboxToShowList) checkboxToShow.style.display = "flex";
                for (let checkboxToHide of checkboxToHideList) checkboxToHide.style.display = "none";
            }
        }, divFilterSpecificValues, null, this._elementId + "_dtpFilterSearchSpecificValues")

        let divSpecificValues = div(divSearchSpecific, { id: this._elementId + "_specificValues", css: "height: 300px; overflow-y: auto;" })

        this._wndFiltering.addFooterItem({
            type: WindowFooterItemTypeEnum.Label,
            value: "lblCheckboxSelectedSpecificValues",
            cssContainer: "margin-left: 10px;"
        })
        //#endregion
    }

    private openWindowFiltering(column: GridColumn)
    {
        this.createWindowFiltering();

        this._wndFiltering.open([
            { value: "ok", callback: () => this.saveWindowFiltering(column) },
            {
                value: "removeFilter", callback: () =>
                {
                    this._wndFiltering.close();
                    this.removeFilter(column.field);
                    this.recalculateHeight(true);

                    switch (column.type)
                    {
                        case GridColumnTypeEnum.DateTime:
                        case GridColumnTypeEnum.Time:
                        case GridColumnTypeEnum.Date:
                        case GridColumnTypeEnum.LongDate:
                        case GridColumnTypeEnum.LongDateTime:
                        case GridColumnTypeEnum.LongWeekDate:
                        case GridColumnTypeEnum.ShortWeekDate:
                            {
                                let filterButton = ControlManager.get<Button>(this._elementId + "_DateFilter_" + column.field);
                                puma(filterButton.element()).css("background-color", "#f3f3f3");
                                puma(filterButton.element()).css("color", "#000");

                                let filterButtonRemove = ControlManager.get<Button>(this._elementId + "_DateFilterRemove_" + column.field);
                                filterButtonRemove.hide();
                            }
                            break;
                        case GridColumnTypeEnum.Number:
                        case GridColumnTypeEnum.Currency:
                        case GridColumnTypeEnum.Duration:
                        case GridColumnTypeEnum.Percentage:
                            {
                                let filterButton = ControlManager.get<Button>(this._elementId + "_NumberFilter_" + column.field);
                                puma(filterButton.element()).css("background-color", "#f3f3f3");
                                puma(filterButton.element()).css("color", "#000");

                                let filterButtonRemove = ControlManager.get<Button>(this._elementId + "_NumberFilterRemove_" + column.field);
                                filterButtonRemove.hide();
                            }
                            break;
                        case GridColumnTypeEnum.String:
                        case GridColumnTypeEnum.Label:
                            {
                                let filterButton = ControlManager.get<Button>(this._elementId + "_StringFilterBtn_" + column.field);
                                puma(filterButton.element()).css("background-color", "#f3f3f3");
                                puma(filterButton.element()).css("color", "#000");

                                let filterButtonRemove = ControlManager.get<Button>(this._elementId + "_StringFilterBtnRemove_" + column.field);
                                filterButtonRemove.hide();

                                let textBox = ControlManager.get<TextBox>(this._elementId + "_StringFilter_" + column.field);
                                textBox.width("Calc(100% - 27px)");
                            }
                            break;
                    }
                }
            }
        ]);
        this.clearWindowFiltering();
        this._wndFiltering.autoSize(WindowAutoSizeDirectionEnum.Height);

        if (column.title != null)
            this._wndFiltering.title("Filtro campo: '" + column.title + "'");
        else
            this._wndFiltering.title("Imposta filtro");

        let dtpFrom = ControlManager.get<DatePicker>(this._elementId + "_dtpFilterDateFrom");
        let dtpTo = ControlManager.get<DatePicker>(this._elementId + "_dtpFilterDateTo");
        let dtpDateTimeFrom = ControlManager.get<DatePicker>(this._elementId + "_dtpDateTimeFilterDateFrom");
        let dtpDateTimeTo = ControlManager.get<DatePicker>(this._elementId + "_dtpDateTimeFilterDateTo");
        let ntbFrom = ControlManager.get<TextBox>(this._elementId + "_ntbFilterNumberFrom");
        let ntbTo = ControlManager.get<TextBox>(this._elementId + "_ntbFilterNumberTo");
        let txtStringValue = ControlManager.get<TextBox>(this._elementId + "_txtFilterStringValue");
        let txtFilterSearchSpecificValues = ControlManager.get<TextBox>(this._elementId + "_txtFilterSearchSpecificValues");
        let dtpFilterSearchSpecificValues = ControlManager.get<DatePicker>(this._elementId + "_dtpFilterSearchSpecificValues");

        //#region Hide/Show
        switch (column.type!)
        {
            case GridColumnTypeEnum.DateTime:
            case GridColumnTypeEnum.Time:
            case GridColumnTypeEnum.Date:
            case GridColumnTypeEnum.LongDate:
            case GridColumnTypeEnum.LongDateTime:
            case GridColumnTypeEnum.LongWeekDate:
            case GridColumnTypeEnum.ShortWeekDate:
                {
                    puma("#" + this._elementId + "DivFilterDate").show();
                    puma("#" + this._elementId + "DivFilterNumber").hide();
                    puma("#" + this._elementId + "DivFilterString").hide();
                    txtFilterSearchSpecificValues.hide();
                    dtpFilterSearchSpecificValues.show();

                    switch (column.type!)
                    {
                        case GridColumnTypeEnum.DateTime:
                        case GridColumnTypeEnum.LongDateTime:
                            {
                                dtpFrom.hide();
                                dtpTo.hide();
                                dtpDateTimeFrom.show();
                            }
                            break;
                        case GridColumnTypeEnum.Time:
                            {
                                dtpFrom.show();
                                dtpDateTimeFrom.hide();
                                dtpDateTimeTo.hide();

                                dtpFrom.mode(DateModeEnum.Time);
                                dtpTo.mode(DateModeEnum.Time);

                                let defaultDateMin = new Date();
                                defaultDateMin.setHours(0, 0, 0, 1);
                                dtpFrom.min(defaultDateMin);
                                dtpTo.min(defaultDateMin);

                                let defaultDateMax = new Date();
                                defaultDateMax.setHours(23, 59, 59, 59);
                                dtpFrom.max(defaultDateMax);
                                dtpTo.max(defaultDateMax);
                            }
                            break;
                        case GridColumnTypeEnum.Date:
                        case GridColumnTypeEnum.LongDate:
                        case GridColumnTypeEnum.LongWeekDate:
                        case GridColumnTypeEnum.ShortWeekDate:
                            {
                                dtpFrom.show();
                                dtpDateTimeFrom.hide();
                                dtpDateTimeTo.hide();

                                dtpFrom.mode(DateModeEnum.Date);
                                dtpTo.mode(DateModeEnum.Date);

                                let defaultDateMin = Date.MIN_VALUE;
                                defaultDateMin.setHours(7, 0);
                                dtpFrom.min(defaultDateMin);
                                dtpTo.min(defaultDateMin);

                                let defaultDateMax = Date.MAX_VALUE;
                                defaultDateMax.setHours(22, 0);
                                dtpFrom.max(defaultDateMax);
                                dtpTo.max(defaultDateMax);
                            }
                            break;
                    }
                }
                break;
            case GridColumnTypeEnum.Number:
            case GridColumnTypeEnum.Currency:
            case GridColumnTypeEnum.Duration:
            case GridColumnTypeEnum.Percentage:
                {
                    puma("#" + this._elementId + "DivFilterDate").hide();
                    puma("#" + this._elementId + "DivFilterNumber").show();
                    puma("#" + this._elementId + "DivFilterString").hide();
                    txtFilterSearchSpecificValues.show();
                    dtpFilterSearchSpecificValues.hide();

                    switch (column.type)
                    {
                        case GridColumnTypeEnum.Number:
                        case GridColumnTypeEnum.Duration:
                            {
                                ntbFrom.type(TextModeEnum.Numeric);
                                ntbTo.type(TextModeEnum.Numeric);
                            }
                            break;
                        case GridColumnTypeEnum.Currency:
                            {
                                ntbFrom.type(TextModeEnum.Currency);
                                ntbTo.type(TextModeEnum.Currency);
                            }
                            break;
                        case GridColumnTypeEnum.Percentage:
                            {
                                ntbFrom.type(TextModeEnum.Percentage);
                                ntbTo.type(TextModeEnum.Percentage);
                            }
                            break;
                    }
                }
                break;
            case GridColumnTypeEnum.String:
            case GridColumnTypeEnum.Label:
                {
                    puma("#" + this._elementId + "DivFilterDate").hide();
                    puma("#" + this._elementId + "DivFilterNumber").hide();
                    puma("#" + this._elementId + "DivFilterString").show();
                    txtFilterSearchSpecificValues.show();
                    dtpFilterSearchSpecificValues.hide();
                }
                break;
        }
        //#endregion

        this._wndFiltering.hideFooterItem("removeFilter");
        this._wndFiltering.hideFooterItem("removeFilterSeparator");
        let isSearchIntervals = true;
        if (this._dictionaryFilterConditions.has(column.field))
        {
            this._wndFiltering.showFooterItem("removeFilter");
            this._wndFiltering.showFooterItem("removeFilterSeparator");

            let filterSettings = this._dictionaryFilterConditions.get(column.field);
            if (filterSettings != null)
            {
                if (filterSettings.dateFilterSettings != null && filterSettings.dateFilterSettings.specificValues != null
                    && filterSettings.dateFilterSettings.specificValues.length > 0)
                    isSearchIntervals = false;
                else if (filterSettings.numberFilterSettings != null && filterSettings.numberFilterSettings.specificValues != null
                    && filterSettings.numberFilterSettings.specificValues.length > 0)
                    isSearchIntervals = false;
                else if (filterSettings.stringFilterSettings != null && filterSettings.stringFilterSettings.specificValues != null
                    && filterSettings.stringFilterSettings.specificValues.length > 0)
                    isSearchIntervals = false;
            }
        }

        //#region Fill CheckboxList specific values
        let items = this.originalDataSource().map(k =>
        {
            let text = this.formatValue(k[column.field], column.type!, column.decimalDigits, column.roundingSettings, column.showSeconds, column.milesSeparator);
            let tag = k[column.field];
            if (tag != null)
            {
                if (column.type == GridColumnTypeEnum.Date || column.type == GridColumnTypeEnum.LongDate || column.type == GridColumnTypeEnum.LongWeekDate || column.type == GridColumnTypeEnum.ShortWeekDate)
                {
                    let date = new Date(k[column.field]);
                    date.setHours(0, 0, 0);
                    tag = date;
                }
                else if (column.type == GridColumnTypeEnum.Time || column.type == GridColumnTypeEnum.DateTime || column.type == GridColumnTypeEnum.LongDateTime)
                    tag = new Date(k[column.field]);
                else if (column.type == GridColumnTypeEnum.String || column.type == GridColumnTypeEnum.Label)
                    tag = String(tag).toLowerCase();
            }
            else
            {
                text = "";
                tag = "";
            }

            return { text: text, value: tag, tag: tag }
        }).vrDistinctBy(k => k.text).vrSortAsc("tag");

        let divContent = puma("#" + this._elementId + "_specificValues")[0];
        let contentFragment = document.createDocumentFragment();
        let divRecords = document.createElement("div");
        divRecords.classList.add("vrGrid_divSearchSpecificValues");
        contentFragment.appendChild(divRecords);
        for (let data of items)
        {
            let divRow = document.createElement("div");
            divRecords.appendChild(divRow);

            let checkbox = document.createElement("input");
            checkbox.setAttribute("type", "checkbox");
            checkbox.classList.add("vrControls", "vrCheckBox");
            checkbox.setAttribute("tag", JSON.stringify(data.tag));
            checkbox.onclick = (e: any) =>
            {
                let checkboxCheckedList = Array.from<HTMLElement>(puma('.vrGrid_divSearchSpecificValues input:checkbox:checked'));
                if (checkboxCheckedList.length == 0)
                {
                    lblCheckboxSelected.value(items.length + " elementi")
                    chkCheckAllSpecificValues.checked(false, false);
                }
                else
                {
                    if (checkboxCheckedList.length == items.length)
                        chkCheckAllSpecificValues.checked(true, false);
                    else
                        chkCheckAllSpecificValues.checked(CheckboxStateEnum.Undefined, false);

                    lblCheckboxSelected.value(checkboxCheckedList.length + " di " + items.length + " elementi");
                }
            }
            divRow.appendChild(checkbox);

            let lblText = document.createElement("label");
            lblText.innerHTML = data.text;
            lblText.style.cssText += "display: block; width: 100%; user-select: none;";
            lblText.onclick = (e: any) => puma(checkbox).click();
            divRow.appendChild(lblText);
        }
        divContent.appendChild(contentFragment);

        let lblCheckboxSelected = this._wndFiltering.footerItem<Label>("lblCheckboxSelectedSpecificValues");
        lblCheckboxSelected.value(items.length + " elementi");

        let chkCheckAllSpecificValues = ControlManager.get<CheckBox>(this._elementId + "_checkAllFilterSearchSpecificValues");
        //#endregion

        let switchSearch = ControlManager.get<Switch>(this._elementId + "_switchFilterSearch");
        if (isSearchIntervals)
        {
            //#region Search intervals
            switchSearch.checked(false);
            switch (column.type!)
            {
                case GridColumnTypeEnum.DateTime:
                case GridColumnTypeEnum.Time:
                case GridColumnTypeEnum.Date:
                case GridColumnTypeEnum.LongDate:
                case GridColumnTypeEnum.LongDateTime:
                case GridColumnTypeEnum.LongWeekDate:
                case GridColumnTypeEnum.ShortWeekDate:
                    {
                        if (this._dictionaryFilterConditions.has(column.field))
                        {
                            let filterSettings = this._dictionaryFilterConditions.get(column.field);
                            if (filterSettings != null && filterSettings.dateFilterSettings != null)
                            {
                                let ddlType = ControlManager.get<ComboBox>(this._elementId + "_ddlFilterDateType");
                                ddlType.value(filterSettings.dateFilterSettings.filterTypeEnum, true);

                                if (column.type == GridColumnTypeEnum.DateTime || column.type == GridColumnTypeEnum.LongDateTime)
                                {
                                    dtpDateTimeFrom.value(filterSettings.dateFilterSettings.dateFrom);
                                    dtpDateTimeTo.value(filterSettings.dateFilterSettings.dateTo);
                                }
                                else
                                {
                                    dtpFrom.value(filterSettings.dateFilterSettings.dateFrom);
                                    dtpTo.value(filterSettings.dateFilterSettings.dateTo);
                                }
                            }
                        }
                    }
                    break;
                case GridColumnTypeEnum.Number:
                case GridColumnTypeEnum.Currency:
                case GridColumnTypeEnum.Duration:
                case GridColumnTypeEnum.Percentage:
                    {
                        if (this._dictionaryFilterConditions.has(column.field))
                        {
                            let filterSettings = this._dictionaryFilterConditions.get(column.field);
                            if (filterSettings != null && filterSettings.numberFilterSettings != null)
                            {
                                let ddlType = ControlManager.get<ComboBox>(this._elementId + "_ddlFilterNumberType");
                                ddlType.value(filterSettings.numberFilterSettings.filterTypeEnum, true);
                                ntbFrom.value(filterSettings.numberFilterSettings.numberFrom);
                                ntbTo.value(filterSettings.numberFilterSettings.numberTo);
                            }
                        }
                    }
                    break;
                case GridColumnTypeEnum.String:
                case GridColumnTypeEnum.Label:
                    {
                        if (this._dictionaryFilterConditions.has(column.field))
                        {
                            let filterSettings = this._dictionaryFilterConditions.get(column.field);
                            if (filterSettings != null && filterSettings.stringFilterSettings != null)
                            {
                                let ddlType = ControlManager.get<ComboBox>(this._elementId + "_ddlFilterStringType");
                                ddlType.value(filterSettings.stringFilterSettings.filterTypeEnum, true);
                                txtStringValue.value(filterSettings.stringFilterSettings.text);
                            }
                        }
                    }
                    break;
            }
            //#endregion
        }
        else
        {
            //#region Search specific values
            switchSearch.checked(true);
            switch (column.type!)
            {
                case GridColumnTypeEnum.DateTime:
                case GridColumnTypeEnum.Time:
                case GridColumnTypeEnum.Date:
                case GridColumnTypeEnum.LongDate:
                case GridColumnTypeEnum.LongDateTime:
                case GridColumnTypeEnum.LongWeekDate:
                case GridColumnTypeEnum.ShortWeekDate:
                    {
                        //#region Load filter data
                        if (this._dictionaryFilterConditions.has(column.field))
                        {
                            let filterSettings = this._dictionaryFilterConditions.get(column.field);
                            if (filterSettings != null && filterSettings.dateFilterSettings != null
                                && filterSettings.dateFilterSettings.specificValues != null
                                && filterSettings.dateFilterSettings.specificValues.length > 0)
                            {
                                for (let value of filterSettings.dateFilterSettings.specificValues)
                                {
                                    for (let checkbox of Array.from<HTMLInputElement>(puma(this._wndFiltering.element()).find(".vrGrid_divSearchSpecificValues input")))
                                    {
                                        let tag = new Date(JSON.parse(checkbox.getAttribute("tag")!));
                                        if (Date.vrEquals(new Date(value), tag))
                                        {
                                            checkbox.checked = true;
                                            break;
                                        }
                                    }
                                }

                                lblCheckboxSelected.value(filterSettings.dateFilterSettings.specificValues.length + " di " + items.length + " elementi")
                                if (filterSettings.dateFilterSettings.specificValues.length == items.length)
                                    chkCheckAllSpecificValues.checked(true, false);
                                else
                                    chkCheckAllSpecificValues.checked(CheckboxStateEnum.Undefined, false);
                            }
                        }
                        //#endregion
                    }
                    break;
                case GridColumnTypeEnum.Number:
                case GridColumnTypeEnum.Currency:
                case GridColumnTypeEnum.Duration:
                case GridColumnTypeEnum.Percentage:
                    {
                        //#region Load filter data
                        if (this._dictionaryFilterConditions.has(column.field))
                        {
                            let filterSettings = this._dictionaryFilterConditions.get(column.field);
                            if (filterSettings != null && filterSettings.numberFilterSettings != null
                                && filterSettings.numberFilterSettings.specificValues != null
                                && filterSettings.numberFilterSettings.specificValues.length > 0)
                            {
                                for (let value of filterSettings.numberFilterSettings.specificValues)
                                {
                                    for (let checkbox of Array.from<HTMLInputElement>(puma(this._wndFiltering.element()).find(".vrGrid_divSearchSpecificValues input")))
                                    {
                                        let tag = Number(JSON.parse(checkbox.getAttribute("tag")!));
                                        if (UtilityManager.equals(value, tag))
                                        {
                                            checkbox.checked = true;
                                            break;
                                        }
                                    }
                                }

                                lblCheckboxSelected.value(filterSettings.numberFilterSettings.specificValues.length + " di " + items.length + " elementi")
                                if (filterSettings.numberFilterSettings.specificValues.length == items.length)
                                    chkCheckAllSpecificValues.checked(true, false);
                                else
                                    chkCheckAllSpecificValues.checked(CheckboxStateEnum.Undefined, false);
                            }
                        }
                        //#endregion
                    }
                    break;
                case GridColumnTypeEnum.String:
                case GridColumnTypeEnum.Label:
                    {
                        if (this._dictionaryFilterConditions.has(column.field))
                        {
                            let filterSettings = this._dictionaryFilterConditions.get(column.field);
                            if (filterSettings != null && filterSettings.stringFilterSettings != null
                                && filterSettings.stringFilterSettings.specificValues != null
                                && filterSettings.stringFilterSettings.specificValues.length > 0)
                            {
                                for (let value of filterSettings.stringFilterSettings.specificValues)
                                {
                                    for (let checkbox of Array.from<HTMLInputElement>(puma(this._wndFiltering.element()).find(".vrGrid_divSearchSpecificValues input")))
                                    {
                                        let tag = String(JSON.parse(checkbox.getAttribute("tag")!));
                                        if (UtilityManager.equals(value, tag))
                                        {
                                            checkbox.checked = true;
                                            break;
                                        }
                                    }
                                }

                                lblCheckboxSelected.value(filterSettings.stringFilterSettings.specificValues.length + " di " + items.length + " elementi")
                                if (filterSettings.stringFilterSettings.specificValues.length == items.length)
                                    chkCheckAllSpecificValues.checked(true, false);
                                else
                                    chkCheckAllSpecificValues.checked(CheckboxStateEnum.Undefined, false);
                            }
                        }
                    }
                    break;
            }
            //#endregion
        }
    }

    private saveWindowFiltering(column: GridColumn)
    {
        let options = this.getOptions();
        let filterSettings = new GridFilterSettings();
        filterSettings.type = column.type!;
        let checkboxCheckedList = [];
        let checkboxAllList = [];

        let switchSearch = ControlManager.get<Switch>(this._elementId + "_switchFilterSearch");
        if (!switchSearch.checked())
        {
            //#region Search intervals
            switch (column.type!)
            {
                case GridColumnTypeEnum.DateTime:
                case GridColumnTypeEnum.Time:
                case GridColumnTypeEnum.Date:
                case GridColumnTypeEnum.LongDate:
                case GridColumnTypeEnum.LongDateTime:
                case GridColumnTypeEnum.LongWeekDate:
                case GridColumnTypeEnum.ShortWeekDate:
                    {
                        //#region Date filter settings
                        let dtpFrom = ControlManager.get<DatePicker>(this._elementId + "_dtpFilterDateFrom");
                        let dtpTo = ControlManager.get<DatePicker>(this._elementId + "_dtpFilterDateTo");
                        let dtpDateTimeFrom = ControlManager.get<DatePicker>(this._elementId + "_dtpDateTimeFilterDateFrom");
                        let dtpDateTimeTo = ControlManager.get<DatePicker>(this._elementId + "_dtpDateTimeFilterDateTo");

                        if (column.type! == GridColumnTypeEnum.DateTime || column.type! == GridColumnTypeEnum.LongDateTime)
                        {
                            if (dtpDateTimeFrom.value() == null)
                            {
                                notifyWarning("Inserire almeno una data");
                                return;
                            }
                        }
                        else
                        {
                            if (dtpFrom.value() == null)
                            {
                                notifyWarning("Inserire almeno una data");
                                return;
                            }
                        }

                        let ddlType = ControlManager.get<ComboBox>(this._elementId + "_ddlFilterDateType")
                        filterSettings.dateFilterSettings = new GridDateFilterSettings();
                        filterSettings.dateFilterSettings.filterTypeEnum = Number(ddlType.value());
                        filterSettings.dateFilterSettings.dateFrom = (column.type! == GridColumnTypeEnum.DateTime || column.type! == GridColumnTypeEnum.LongDateTime) ? dtpDateTimeFrom.value()! : dtpFrom.value()!;
                        filterSettings.dateFilterSettings.dateTo = (column.type! == GridColumnTypeEnum.DateTime || column.type! == GridColumnTypeEnum.LongDateTime) ? dtpDateTimeTo.value()! : dtpTo.value();
                        //#endregion
                    }
                    break;
                case GridColumnTypeEnum.Number:
                case GridColumnTypeEnum.Currency:
                case GridColumnTypeEnum.Duration:
                case GridColumnTypeEnum.Percentage:
                    {
                        //#region Number filter settings
                        let ntbFrom = ControlManager.get<TextBox>(this._elementId + "_ntbFilterNumberFrom");
                        let ntbTo = ControlManager.get<TextBox>(this._elementId + "_ntbFilterNumberTo");
                        if (ntbFrom.isEmpty())
                        {
                            notifyWarning("Inserire almeno un numero");
                            return;
                        }

                        let ddlType = ControlManager.get<ComboBox>(this._elementId + "_ddlFilterNumberType");
                        filterSettings.numberFilterSettings = new GridNumberFilterSettings();
                        filterSettings.numberFilterSettings.filterTypeEnum = Number(ddlType.value());
                        filterSettings.numberFilterSettings.numberFrom = ntbFrom.value();
                        filterSettings.numberFilterSettings.numberTo = (ntbTo.value() == 0) ? null : Number(ntbTo.value());
                        //#endregion
                    }
                    break;
                case GridColumnTypeEnum.String:
                case GridColumnTypeEnum.Label:
                    {
                        //#region String filter settings
                        let txtStringValue = ControlManager.get<TextBox>(this._elementId + "_txtFilterStringValue");
                        if (txtStringValue.isEmpty())
                        {
                            notifyWarning("Inserire un testo");
                            return;
                        }

                        let ddlType = ControlManager.get<ComboBox>(this._elementId + "_ddlFilterStringType");
                        filterSettings.stringFilterSettings = new GridStringFilterSettings();
                        filterSettings.stringFilterSettings.filterTypeEnum = Number(ddlType.value());
                        filterSettings.stringFilterSettings.text = txtStringValue.value();
                        //#endregion
                    }
                    break;
            }
            //#endregion
        }
        else
        {
            //#region Search specific values
            checkboxCheckedList = Array.from<HTMLElement>(puma('.vrGrid_divSearchSpecificValues input:checkbox:checked'));
            checkboxAllList = Array.from<HTMLInputElement>(puma(this._wndFiltering.element()).find(".vrGrid_divSearchSpecificValues input"));
            let filterButton = null;
            let filterButtonRemove = null;

            switch (column.type!)
            {
                case GridColumnTypeEnum.DateTime:
                case GridColumnTypeEnum.Time:
                case GridColumnTypeEnum.Date:
                case GridColumnTypeEnum.LongDate:
                case GridColumnTypeEnum.LongDateTime:
                case GridColumnTypeEnum.LongWeekDate:
                case GridColumnTypeEnum.ShortWeekDate:
                    {
                        filterSettings.dateFilterSettings = new GridDateFilterSettings();
                        filterSettings.dateFilterSettings.specificValues = [];
                        for (let checkbox of checkboxCheckedList)
                            filterSettings.dateFilterSettings.specificValues.push(new Date(JSON.parse(checkbox.getAttribute("tag")!)));

                        if (checkboxCheckedList.length == 0 || checkboxAllList.length == checkboxCheckedList.length)
                        {
                            filterButton = ControlManager.get<Button>(this._elementId + "_DateFilter_" + column.field);
                            puma(filterButton.element()).css("background-color", "#f3f3f3");
                            puma(filterButton.element()).css("color", "#000");

                            filterButtonRemove = ControlManager.get<Button>(this._elementId + "_DateFilterRemove_" + column.field);
                            filterButtonRemove.hide();
                        }
                    }
                    break;
                case GridColumnTypeEnum.Number:
                case GridColumnTypeEnum.Currency:
                case GridColumnTypeEnum.Duration:
                case GridColumnTypeEnum.Percentage:
                    {
                        filterSettings.numberFilterSettings = new GridNumberFilterSettings();
                        filterSettings.numberFilterSettings.specificValues = [];
                        for (let checkbox of checkboxCheckedList)
                            filterSettings.numberFilterSettings.specificValues.push(Number(JSON.parse(checkbox.getAttribute("tag")!)));

                        if (checkboxCheckedList.length == 0 || checkboxAllList.length == checkboxCheckedList.length)
                        {
                            filterButton = ControlManager.get<Button>(this._elementId + "_NumberFilter_" + column.field);
                            puma(filterButton.element()).css("background-color", "#f3f3f3");
                            puma(filterButton.element()).css("color", "#000");

                            filterButtonRemove = ControlManager.get<Button>(this._elementId + "_NumberFilterRemove_" + column.field);
                            filterButtonRemove.hide();
                        }
                    }
                    break;
                case GridColumnTypeEnum.String:
                case GridColumnTypeEnum.Label:
                    {
                        filterSettings.stringFilterSettings = new GridStringFilterSettings();
                        filterSettings.stringFilterSettings.specificValues = [];
                        for (let checkbox of checkboxCheckedList)
                            filterSettings.stringFilterSettings.specificValues.push(String(JSON.parse(checkbox.getAttribute("tag")!)));

                        if (checkboxCheckedList.length == 0 || checkboxAllList.length == checkboxCheckedList.length)
                        {
                            filterButton = ControlManager.get<Button>(this._elementId + "_StringFilterBtn_" + column.field);
                            puma(filterButton.element()).css("background-color", "#f3f3f3");
                            puma(filterButton.element()).css("color", "#000");

                            filterButtonRemove = ControlManager.get<Button>(this._elementId + "_StringFilterBtnRemove_" + column.field);
                            filterButtonRemove.hide();

                            let textBox = ControlManager.get<TextBox>(this._elementId + "_StringFilter_" + column.field);
                            textBox.width("Calc(100% - 27px)");
                        }
                    }
                    break;
            }
            //#endregion
        }

        if (switchSearch.checked() && (checkboxCheckedList.length == 0 || checkboxAllList.length == checkboxCheckedList.length))
            this.removeFilter(column.field);
        else
        {
            this.removeFilter(column.field, !options.serverBinding);
            this.updateFilter(column.field, filterSettings);
        }
        this._wndFiltering.close();
    }

    private clearWindowFiltering()
    {
        //#region Date filter
        ControlManager.get<ComboBox>(this._elementId + "_ddlFilterDateType").clear();
        ControlManager.get<DatePicker>(this._elementId + "_dtpFilterDateFrom").clear();
        ControlManager.get<DatePicker>(this._elementId + "_dtpFilterDateTo").clear();
        ControlManager.get<DatePicker>(this._elementId + "_dtpFilterDateTo").hide();
        ControlManager.get<DatePicker>(this._elementId + "_dtpDateTimeFilterDateFrom").clear();
        ControlManager.get<DatePicker>(this._elementId + "_dtpDateTimeFilterDateTo").clear();
        ControlManager.get<DatePicker>(this._elementId + "_dtpDateTimeFilterDateFrom").hide();
        ControlManager.get<DatePicker>(this._elementId + "_dtpDateTimeFilterDateTo").hide();
        //#endregion

        //#region Number filter
        ControlManager.get<ComboBox>(this._elementId + "_ddlFilterNumberType").clear();
        ControlManager.get<TextBox>(this._elementId + "_ntbFilterNumberFrom").clear();
        ControlManager.get<TextBox>(this._elementId + "_ntbFilterNumberTo").clear();
        ControlManager.get<TextBox>(this._elementId + "_ntbFilterNumberTo").hide();
        //#endregion

        //#region Search specific values
        ControlManager.get<ComboBox>(this._elementId + "_ddlFilterStringType").clear();
        ControlManager.get<TextBox>(this._elementId + "_txtFilterStringValue").clear();
        puma(this._wndFiltering.element()).find(this._elementId + "_specificValues").empty();
        ControlManager.get<TextBox>(this._elementId + "_txtFilterSearchSpecificValues").show();
        ControlManager.get<DatePicker>(this._elementId + "_dtpFilterSearchSpecificValues").hide();
        this._wndFiltering.footerItem<Label>("lblCheckboxSelectedSpecificValues").clear();
        ControlManager.get<CheckBox>(this._elementId + "_checkAllFilterSearchSpecificValues").clear();
        //#endregion
    }

    addFilter(field: string, filterCondition: GridFilterSettings, applyFilters = true)
    {
        this._dictionaryFilterConditions.set(field, filterCondition);
        if (applyFilters)
            this.applyFilters();
    }

    removeFilters(fields: string[], applyFilters = true)
    {
        for (let field of fields)
            this.removeFilter(field, false);

        if (applyFilters)
            this.applyFilters(true);
    }

    removeFilter(field: string, applyFilters = true)
    {
        if (this._dictionaryFilterConditions.has(field))
        {
            this._dictionaryFilterConditions.delete(field);
            if (applyFilters)
                this.applyFilters(true);
        }
    }

    updateFilter(field: string, filterCondition: GridFilterSettings, applyFilters = true)
    {
        this._dictionaryFilterConditions.set(field, filterCondition);
        if (applyFilters)
            this.applyFilters();
    }

    private applyFilters(onOriginalDataSource = false, applyFilters = true)
    {
        let options = this.getOptions();

        //#region Server binding
        if (options.serverBinding !== false)
        {
            this.pageSelected(1, false);
            if (applyFilters)
                this.rebind();
            else
                this.setDataSource((onOriginalDataSource) ? this._originalDataSource : this.dataSource());

            return;
        }
        //#endregion

        let filteredArray: any[] = (onOriginalDataSource) ? this._originalDataSource : this.dataSource();
        this._dictionaryFilterConditions.forEach((valueFilterSettings, columnField, dic) =>
        {
            let column = options.columns!.find(k => k.field == columnField)!;
            if (column != null && column.hidden === true)
                return;

            if (valueFilterSettings.numberFilterSettings != null)
            {
                //#region Number filter
                let filterButton = ControlManager.get<Button>(this._elementId + "_NumberFilter_" + columnField);
                puma(filterButton.element()).css("background-color", "coral");
                puma(filterButton.element()).css("color", "#FFF");

                let filterButtonRemove = ControlManager.get<Button>(this._elementId + "_NumberFilterRemove_" + columnField);
                filterButtonRemove.show();
                this.recalculateHeight(true);

                if (valueFilterSettings.numberFilterSettings.specificValues != null && valueFilterSettings.numberFilterSettings.specificValues.length > 0)
                {
                    //#region Search specific values
                    filteredArray = filteredArray.filter(k => valueFilterSettings.numberFilterSettings!.specificValues.includes(k[columnField]));
                    filterButton.tooltip("Ricerca specifica su questi valori: " + valueFilterSettings.numberFilterSettings.specificValues.join(" - "));
                    //#endregion
                }
                else
                {
                    //#region Search intervals
                    switch (valueFilterSettings.numberFilterSettings.filterTypeEnum)
                    {
                        case GridNumberFilterTypeEnum.GreaterThan:
                            filteredArray = filteredArray.filter(k => k[columnField] > valueFilterSettings.numberFilterSettings!.numberFrom);
                            break;
                        case GridNumberFilterTypeEnum.LessThan:
                            filteredArray = filteredArray.filter(k => k[columnField] < valueFilterSettings.numberFilterSettings!.numberFrom);
                            break;
                        case GridNumberFilterTypeEnum.EqualsTo:
                            filteredArray = filteredArray.filter(k => k[columnField] == valueFilterSettings.numberFilterSettings!.numberFrom);
                            break;
                        case GridNumberFilterTypeEnum.Between:
                            {
                                if (valueFilterSettings.numberFilterSettings!.numberTo != null)
                                    filteredArray = filteredArray.filter(k => k[columnField] >= valueFilterSettings.numberFilterSettings!.numberFrom && k[columnField] <= valueFilterSettings.numberFilterSettings!.numberTo!);
                                else
                                    filteredArray = filteredArray.filter(k => k[columnField] > valueFilterSettings.numberFilterSettings!.numberFrom);
                            }
                            break;
                    }

                    // Filter button
                    let valueTooltip = String(valueFilterSettings.numberFilterSettings!.numberFrom);
                    if (valueFilterSettings.numberFilterSettings!.filterTypeEnum == GridNumberFilterTypeEnum.Between)
                        valueTooltip += " e " + valueFilterSettings.numberFilterSettings!.numberTo;

                    let ddlType = ControlManager.get<ComboBox>(this._elementId + "_ddlFilterNumberType");
                    let type = "";
                    switch (Number(ddlType!.value()))
                    {
                        case GridNumberFilterTypeEnum.GreaterThan: type = "Maggiore di "; break;
                        case GridNumberFilterTypeEnum.LessThan: type = "Minore di "; break;
                        case GridNumberFilterTypeEnum.EqualsTo: type = "Uguale a "; break;
                        case GridNumberFilterTypeEnum.Between: type = "Compreso tra "; break;
                    }

                    filterButton.tooltip(type + valueTooltip);
                    //#endregion
                }
                //#endregion
            }
            else if (valueFilterSettings.dateFilterSettings != null)
            {
                //#region Date filter
                let filterButton = ControlManager.get<Button>(this._elementId + "_DateFilter_" + columnField);
                puma(filterButton.element()).css("background-color", "coral");
                puma(filterButton.element()).css("color", "#FFF");

                let filterButtonRemove = ControlManager.get<Button>(this._elementId + "_DateFilterRemove_" + columnField);
                filterButtonRemove.show();
                this.recalculateHeight(true);

                if (valueFilterSettings.dateFilterSettings.specificValues != null && valueFilterSettings.dateFilterSettings.specificValues.length > 0)
                {
                    //#region Search specific values
                    let dateFilteredArray = [];
                    for (let filterValue of filteredArray)
                    {
                        for (let specificValue of valueFilterSettings.dateFilterSettings.specificValues)
                        {
                            let date = new Date(filterValue[columnField]);
                            if (column.type == GridColumnTypeEnum.Date || column.type == GridColumnTypeEnum.LongDate || column.type == GridColumnTypeEnum.LongWeekDate || column.type == GridColumnTypeEnum.ShortWeekDate)
                                date.setHours(0, 0, 0);

                            if (Date.vrEquals(date, specificValue))
                                dateFilteredArray.push(filterValue);
                        }
                    }
                    filteredArray = dateFilteredArray;

                    let tooltipValues: string[] = [];
                    let dateModeEnum: DateModeEnum = DateModeEnum.Date;

                    if (column.type == GridColumnTypeEnum.Date) dateModeEnum = DateModeEnum.Date;
                    else if (column.type == GridColumnTypeEnum.DateTime) dateModeEnum = DateModeEnum.DateTime;
                    else if (column.type == GridColumnTypeEnum.Time) dateModeEnum = DateModeEnum.Time;
                    else if (column.type == GridColumnTypeEnum.LongDate) dateModeEnum = DateModeEnum.LongDate;
                    else if (column.type == GridColumnTypeEnum.LongDateTime) dateModeEnum = DateModeEnum.LongDateTime;
                    else if (column.type == GridColumnTypeEnum.LongWeekDate) dateModeEnum = DateModeEnum.LongWeekDate;
                    else if (column.type == GridColumnTypeEnum.ShortWeekDate) dateModeEnum = DateModeEnum.ShortWeekDate;

                    tooltipValues = valueFilterSettings.dateFilterSettings.specificValues.map(k => { return new Date(k).vrToItalyString(dateModeEnum, column.showSeconds) });
                    filterButton.tooltip("Ricerca specifica su questi valori: " + tooltipValues.join(" - "));
                    //#endregion
                }
                else
                {
                    //#region Search intervals
                    let filterDateFrom = Date.vrFixDateString(valueFilterSettings.dateFilterSettings!.dateFrom);
                    let filterDateTo = Date.vrFixDateString(valueFilterSettings.dateFilterSettings!.dateTo);

                    switch (valueFilterSettings.dateFilterSettings.filterTypeEnum)
                    {
                        case GridDateFilterTypeEnum.GreaterThan:
                            {
                                switch (column.type)
                                {
                                    case GridColumnTypeEnum.Date:
                                    case GridColumnTypeEnum.LongDate:
                                    case GridColumnTypeEnum.LongWeekDate:
                                    case GridColumnTypeEnum.ShortWeekDate:
                                        filteredArray = filteredArray.filter(k => Date.vrFixDateString(k[columnField]) != null && Date.vrFixDateString(k[columnField]).vrIsGreaterThan(filterDateFrom, false, false));
                                        break;
                                    case GridColumnTypeEnum.DateTime:
                                    case GridColumnTypeEnum.LongDateTime:
                                        filteredArray = filteredArray.filter(k => Date.vrFixDateString(k[columnField]) != null && Date.vrFixDateString(k[columnField]).vrIsGreaterThan(filterDateFrom));
                                        break;
                                    case GridColumnTypeEnum.Time:
                                        filteredArray = filteredArray.filter(k => Date.vrFixDateString(k[columnField]) != null && (Date.vrFixDateString(k[columnField]).getHours() > filterDateFrom.getHours() || (Date.vrFixDateString(k[columnField]).getHours() == filterDateFrom.getHours() && Date.vrFixDateString(k[columnField]).getMinutes() > filterDateFrom.getMinutes())))
                                        break;
                                }
                            }
                            break;
                        case GridDateFilterTypeEnum.LessThan:
                            {
                                switch (column.type)
                                {
                                    case GridColumnTypeEnum.Date:
                                    case GridColumnTypeEnum.LongDate:
                                    case GridColumnTypeEnum.LongWeekDate:
                                    case GridColumnTypeEnum.ShortWeekDate:
                                        filteredArray = filteredArray.filter(k => Date.vrFixDateString(k[columnField]) != null && Date.vrFixDateString(k[columnField]).vrIsLessThan(filterDateFrom, false, false));
                                        break;
                                    case GridColumnTypeEnum.DateTime:
                                    case GridColumnTypeEnum.LongDateTime:
                                        filteredArray = filteredArray.filter(k => Date.vrFixDateString(k[columnField]) != null && Date.vrFixDateString(k[columnField]).vrIsLessThan(filterDateFrom));
                                        break;
                                    case GridColumnTypeEnum.Time:
                                        filteredArray = filteredArray.filter(k => Date.vrFixDateString(k[columnField]) != null && (Date.vrFixDateString(k[columnField]).getHours() < filterDateFrom.getHours() || (Date.vrFixDateString(k[columnField]).getHours() == filterDateFrom.getHours() && Date.vrFixDateString(k[columnField]).getMinutes() < filterDateFrom.getMinutes())))
                                        break;
                                }
                            }
                            break;
                        case GridDateFilterTypeEnum.EqualsTo:
                            {
                                switch (column.type)
                                {
                                    case GridColumnTypeEnum.Date:
                                    case GridColumnTypeEnum.LongDate:
                                    case GridColumnTypeEnum.LongWeekDate:
                                    case GridColumnTypeEnum.ShortWeekDate:
                                        filteredArray = filteredArray.filter(k => Date.vrFixDateString(k[columnField]) != null && Date.vrFixDateString(k[columnField]).vrIsEqualsTo(filterDateFrom, false));
                                        break;
                                    case GridColumnTypeEnum.DateTime:
                                    case GridColumnTypeEnum.LongDateTime:
                                        filteredArray = filteredArray.filter(k => Date.vrFixDateString(k[columnField]) != null && Date.vrFixDateString(k[columnField]).vrIsEqualsTo(filterDateFrom));
                                        break;
                                    case GridColumnTypeEnum.Time:
                                        filteredArray = filteredArray.filter(k => Date.vrFixDateString(k[columnField]) != null && (Date.vrFixDateString(k[columnField]).getHours() == filterDateFrom.getHours() && Date.vrFixDateString(k[columnField]).getMinutes() == filterDateFrom.getMinutes()))
                                        break;
                                }
                            }
                            break;
                        case GridDateFilterTypeEnum.Between:
                            {
                                switch (column.type)
                                {
                                    case GridColumnTypeEnum.Date:
                                    case GridColumnTypeEnum.DateTime:
                                    case GridColumnTypeEnum.LongDate:
                                    case GridColumnTypeEnum.LongWeekDate:
                                    case GridColumnTypeEnum.ShortWeekDate:
                                    case GridColumnTypeEnum.LongDateTime:
                                        {
                                            if (valueFilterSettings.dateFilterSettings!.dateTo != null)
                                                filteredArray = filteredArray.filter(k => Date.vrFixDateString(k[columnField]) != null && Date.vrFixDateString(k[columnField]).vrIsBetween(filterDateFrom, filterDateTo));
                                            else
                                                filteredArray = filteredArray.filter(k => Date.vrFixDateString(k[columnField]) != null && Date.vrFixDateString(k[columnField]).vrIsGreaterThan(filterDateFrom));
                                        }
                                        break;
                                    case GridColumnTypeEnum.Time:
                                        {
                                            if (valueFilterSettings.dateFilterSettings!.dateTo != null)
                                            {
                                                filteredArray = filteredArray.filter(k => Date.vrFixDateString(k[columnField]) != null && (Date.vrFixDateString(k[columnField]).getHours() > filterDateFrom.getHours() || (Date.vrFixDateString(k[columnField]).getHours() == filterDateFrom.getHours() && Date.vrFixDateString(k[columnField]).getMinutes() > filterDateFrom.getMinutes())))
                                                filteredArray = filteredArray.filter(k => Date.vrFixDateString(k[columnField]) != null && (Date.vrFixDateString(k[columnField]).getHours() < filterDateTo.getHours() || (Date.vrFixDateString(k[columnField]).getHours() == filterDateTo.getHours() && Date.vrFixDateString(k[columnField]).getMinutes() < filterDateTo.getMinutes())))
                                            }
                                            else
                                                filteredArray = filteredArray.filter(k => Date.vrFixDateString(k[columnField]) != null && (Date.vrFixDateString(k[columnField]).getHours() > filterDateFrom.getHours() || (Date.vrFixDateString(k[columnField]).getHours() == filterDateFrom.getHours() && Date.vrFixDateString(k[columnField]).getMinutes() > filterDateFrom.getMinutes())))
                                        }
                                        break;
                                }
                            }
                            break;
                    }

                    // Filter button
                    let dateModeEnum: DateModeEnum = DateModeEnum.Date;

                    if (column.type == GridColumnTypeEnum.Date) dateModeEnum = DateModeEnum.Date;
                    else if (column.type == GridColumnTypeEnum.DateTime) dateModeEnum = DateModeEnum.DateTime;
                    else if (column.type == GridColumnTypeEnum.Time) dateModeEnum = DateModeEnum.Time;
                    else if (column.type == GridColumnTypeEnum.LongDate) dateModeEnum = DateModeEnum.LongDate;
                    else if (column.type == GridColumnTypeEnum.LongDateTime) dateModeEnum = DateModeEnum.LongDateTime;
                    else if (column.type == GridColumnTypeEnum.LongWeekDate) dateModeEnum = DateModeEnum.LongWeekDate;
                    else if (column.type == GridColumnTypeEnum.ShortWeekDate) dateModeEnum = DateModeEnum.ShortWeekDate;

                    let tooltip = Date.vrFixDateString(valueFilterSettings.dateFilterSettings!.dateFrom).vrToItalyString(dateModeEnum);
                    if (valueFilterSettings.dateFilterSettings!.filterTypeEnum == GridDateFilterTypeEnum.Between)
                        tooltip += " e " + Date.vrFixDateString(valueFilterSettings.dateFilterSettings!.dateTo!).vrToItalyString(dateModeEnum);

                    let type = "";
                    switch (valueFilterSettings.dateFilterSettings!.filterTypeEnum)
                    {
                        case GridDateFilterTypeEnum.GreaterThan: type = "Maggiore di "; break;
                        case GridDateFilterTypeEnum.LessThan: type = "Minore di "; break;
                        case GridDateFilterTypeEnum.EqualsTo: type = "Uguale a "; break;
                        case GridDateFilterTypeEnum.Between: type = "Compreso tra "; break;
                    }

                    filterButton.tooltip(type + tooltip);
                    //#endregion
                }
                //#endregion
            }
            else if (valueFilterSettings.stringFilterSettings != null)
            {
                //#region String filter
                if ((valueFilterSettings.stringFilterSettings!.text == null || valueFilterSettings.stringFilterSettings!.text == "")
                    && (valueFilterSettings.stringFilterSettings.specificValues == null || valueFilterSettings.stringFilterSettings.specificValues.length == 0))
                    return;

                let textBox = ControlManager.get<TextBox>(this._elementId + "_StringFilter_" + column.field);
                let filterButton: Button | null = null;
                if ((valueFilterSettings.stringFilterSettings.specificValues != null && valueFilterSettings.stringFilterSettings.specificValues.length > 0)
                    || valueFilterSettings.stringFilterSettings.filterTypeEnum != GridStringFilterTypeEnum.IncludesFromSimpleSearch)
                {
                    filterButton = ControlManager.get<Button>(this._elementId + "_StringFilterBtn_" + columnField);
                    puma(filterButton.element()).css("background-color", "coral");
                    puma(filterButton.element()).css("color", "#FFF");

                    let filterButtonRemove = ControlManager.get<Button>(this._elementId + "_StringFilterBtnRemove_" + columnField);
                    filterButtonRemove.show();
                    this.recalculateHeight(true);

                    textBox.width("Calc(100% - 60px)");
                }
                else if (valueFilterSettings.stringFilterSettings.filterTypeEnum == GridStringFilterTypeEnum.IncludesFromSimpleSearch)
                    textBox.value(valueFilterSettings.stringFilterSettings.text, false);

                if (valueFilterSettings.stringFilterSettings.specificValues != null && valueFilterSettings.stringFilterSettings.specificValues.length > 0)
                {
                    //#region Search specific values
                    filteredArray = filteredArray.filter(k => k[columnField] != null && valueFilterSettings.stringFilterSettings!.specificValues.map(k => { return k.toLowerCase() }).includes(k[columnField].toLowerCase()));
                    if (filterButton != null)
                        filterButton.tooltip("Ricerca specifica su questi valori: " + valueFilterSettings.stringFilterSettings.specificValues.join(" - "));
                    //#endregion
                }
                else
                {
                    //#region Search intervals
                    let type = "";
                    switch (valueFilterSettings.stringFilterSettings.filterTypeEnum)
                    {
                        case GridStringFilterTypeEnum.StartsWith:
                            {
                                type = "Inizia con: ";
                                filteredArray = filteredArray.filter(k => k[columnField] != null && k[columnField].toLowerCase().startsWith(valueFilterSettings.stringFilterSettings!.text.toLowerCase()));
                            }
                            break;
                        case GridStringFilterTypeEnum.EndsWith:
                            {
                                type = "Finisce con: ";
                                filteredArray = filteredArray.filter(k => k[columnField] != null && k[columnField].toLowerCase().endsWith(valueFilterSettings.stringFilterSettings!.text.toLowerCase()));
                            }
                            break;
                        case GridStringFilterTypeEnum.EqualsTo:
                            {
                                type = "Uguale a: ";
                                filteredArray = filteredArray.filter(k => k[columnField] != null && k[columnField].toLowerCase() == valueFilterSettings.stringFilterSettings!.text.toLowerCase());
                            }
                            break;
                        case GridStringFilterTypeEnum.Includes:
                            {
                                type = "Contiene: ";
                                filteredArray = filteredArray.filter(k => k[columnField] != null && k[columnField].toLowerCase().indexOf(valueFilterSettings.stringFilterSettings!.text.toLowerCase()) !== -1);
                            }
                            break;
                        case GridStringFilterTypeEnum.IncludesFromSimpleSearch:
                            {
                                type = "Contiene: ";
                                filteredArray = filteredArray.filter(k => k[columnField] != null && k[columnField].toLowerCase().indexOf(valueFilterSettings.stringFilterSettings!.text.toLowerCase()) !== -1);
                            }
                            break;
                        default:
                            {
                                type = "Contiene: ";
                                filteredArray = filteredArray.filter(k => k[columnField] != null && k[columnField].toLowerCase().indexOf(valueFilterSettings.stringFilterSettings!.text.toLowerCase()) !== -1);
                            }
                            break;
                    }

                    if (filterButton != null)
                        filterButton.tooltip(type + valueFilterSettings.stringFilterSettings!.text);
                    //#endregion
                }
                //#endregion
            }
            else if (valueFilterSettings.checkboxFilterSettings != null)
            {
                filteredArray = filteredArray.filter(k => k[columnField] === valueFilterSettings.checkboxFilterSettings!.value);

                //#region Filter checkbox
                let checkboxJq = puma("#" + this._elementId + "_CheckboxFilter_" + columnField);
                checkboxJq.removeClass("indeterminateVrCheckbox");

                let checkbox = checkboxJq[0] as HTMLInputElement;
                checkbox.checked = valueFilterSettings.checkboxFilterSettings!.value;
                //#endregion
            }
        });

        this.pageSelected(1, false);

        if (applyFilters)
        {
            this._dataSource = UtilityManager.duplicate(filteredArray);
            if (options.groupBy != null)
                this.sortingGroupFields(this.dataSource());

            this.setDataSource(this._dataSource!);
        }
    }
    //#endregion

    //#region Resizing
    private resizable()
    {
        let options = this.getOptions();
        let headerTable = puma(this._divHeader).find("table")[0];
        let tableHeight = headerTable.offsetHeight;

        let thList = Array.from<HTMLElement>(puma(headerTable).find("th"));
        if (options.lockable)
            thList.vrPushRange(Array.from<HTMLElement>(puma(this._divHeaderLocked).find("table").find("th")));

        for (let th of thList)
        {
            let divResizable = document.createElement("div");
            divResizable.classList.add("divResizable");
            divResizable.style.cssText += "height: " + tableHeight + "px;";
            th.appendChild(divResizable);
            this.setResizingEvents(divResizable);
        }
    }

    private setResizingEvents(divResizable: HTMLDivElement)
    {
        let pageX: number | null = null;
        let currentColumn: HTMLElement | null = null;
        let currentColumnWidth: number | null = null;
        let timeoutRecalculateWidthWhileMoving: number = 0;

        //#region Div events
        puma(divResizable).on("mousedown", (e: any) =>
        {
            this._isResizing = true;
            currentColumn = e.target.parentElement;
            pageX = e.pageX;

            //#region Padding
            let padding = 0;
            if (puma(currentColumn!).css("box-sizing") == "border-box")
                padding = 0;
            else
            {
                let padLeft = puma(currentColumn!).css("padding-left");
                let padRight = puma(currentColumn!).css("padding-right");
                padding = (padLeft.getNumericPart() + padRight.getNumericPart());
            }
            //#endregion

            currentColumnWidth = currentColumn!.offsetWidth - padding;
        });

        puma(divResizable).on("mouseover", (e: any) => (e.target as HTMLElement).style.borderRight = "2px solid #0000ff");
        puma(divResizable).on("mouseout", (e: any) => (e.target as HTMLElement).style.borderRight = "");
        //#endregion

        //#region Document events
        puma(this.container()).on("mousemove", (e: any) =>
        {
            if (currentColumn != null && !this._isDragging)
            {
                let options = this.getOptions();
                let field = puma(puma(this._divHeader).find("th")[puma(currentColumn).index()]).attr("field");
                let isColumnLocked = (currentColumn.getAttribute("locked") != null);
                if (isColumnLocked)
                    field = puma(puma(this._divHeaderLocked).find("th")[puma(currentColumn).index()]).attr("field");

                let index = puma(currentColumn!).index();
                let column = this.column(field);

                let diffX = e.pageX - pageX!;
                currentColumn.style.width = (currentColumnWidth! + diffX) + "px"; // Header
                currentColumn.removeAttribute("fitspace");
                column.width = (currentColumnWidth! + diffX);
                column.fitSpace = false;

                if (options.filterable) // Filter
                {
                    let tdFilter = puma(this._divFilters).find("td")[index];
                    if (isColumnLocked && tdFilter == null)
                        tdFilter = puma(this._divFiltersLocked).find("td")[index];

                    tdFilter.style.width = (currentColumnWidth! + diffX) + "px";
                }

                if (this._showTotals) // Total
                {
                    let tdTotal = puma(this._divTotals).find("td")[index];
                    if (isColumnLocked && tdTotal == null)
                        tdTotal = puma(this._divTotalsLocked).find("td")[index];

                    tdTotal.style.width = (currentColumnWidth! + diffX) + "px";
                }

                let colGroupList = puma(this._divBody).find("colgroup"); // Col group 
                colGroupList.find("col[field='" + column.field + "']")[0].style.cssText += "width: " + (currentColumnWidth! + diffX) + "px";
            }
        });

        puma(this.container()).on("mouseup", () =>
        {
            if (currentColumn != null && this._isResizing)
            {
                window.setTimeout(() =>
                {
                    this._isResizing = false;
                    currentColumn = null;
                    pageX = null;
                    currentColumnWidth = null;

                    this.recalculateFitSpacePercentage();
                    this.recalculateWidth();
                    this.updateColumnPositions();
                });
            }
        });
        //#endregion
    }
    //#endregion

    //#region Columns Drag&Drop
    private updateColumnPositions()
    {
        let headerTable = puma(this._divHeader).find("table")[0];
        for (let th of Array.from(puma(headerTable).find("th")))
        {
            let field = puma(th).attr("field");
            let index = this._columnOptions.findIndex(k => k.field == field);
            let columnPosition = this._columnOptions[index];
            columnPosition.field = field;
            columnPosition.left = puma(th).offset().left;
            columnPosition.right = puma(th).offset().left + puma(th).width();
            columnPosition.index = puma(th).index();
        }
    }

    private draggableColumns()
    {
        let options = this.getOptions();
        let headerTable = puma(this._divHeader).find("table")[0];
        for (let th of Array.from<HTMLElement>(puma(headerTable).find("th")))
        {
            let field = puma(th).attr("field");
            if (field == "vrGridCheckboxColumn" || field == "editButton" || field.startsWith("groupBy"))
                continue;

            this.drag(th,
                {
                    onDragging: (e) =>
                    {
                        //#region Dragging
                        puma(this._divHeader).find("table th").removeClass("grid_tdDraggedOn");

                        let draggingColumnPosition = this._columnOptions.find(k => e.left >= k.left && e.left <= k.right);
                        if (draggingColumnPosition == null)
                        {
                            if (e.left < this._columnOptions[0].left)
                                draggingColumnPosition = this._columnOptions[0];
                            else if (e.left > this._columnOptions[this._columnOptions.length - 1].right)
                                draggingColumnPosition = this._columnOptions[this._columnOptions.length - 1];
                        }
                        else if (draggingColumnPosition.index !== puma(th).index())
                        {
                            puma(th).addClass("grid_dragging");

                            if (draggingColumnPosition.index < puma(th).index())
                                puma(puma(this._divHeader).find("table th")[draggingColumnPosition.index]).addClass("grid_tdDraggedOn");
                            else
                                puma(puma(this._divHeader).find("table th")[draggingColumnPosition.index + 1]).addClass("grid_tdDraggedOn");
                        }
                        //#endregion
                    },
                    onDragged: (e) =>
                    {
                        //#region Dragged
                        puma(this._divHeader).find("table th").removeClass("grid_tdDraggedOn");
                        puma(th).removeClass("grid_dragging");
                        puma(th)[0].style.cssText += "top: 0px; left: 0px;";

                        let toDragColumnPosition = this._columnOptions.find(k => e.left >= k.left && e.left <= k.right);
                        if (toDragColumnPosition == null)
                        {
                            if (e.left < this._columnOptions[0].left)
                                toDragColumnPosition = this._columnOptions[0];
                            else if (e.left > this._columnOptions[this._columnOptions.length - 1].right)
                                toDragColumnPosition = this._columnOptions[this._columnOptions.length - 1];
                        }
                        else
                        {
                            let columnIndex = puma(th).index();

                            //#region Swap column
                            if (toDragColumnPosition.index > columnIndex)
                                puma(puma(this._divHeader).find("table th")[toDragColumnPosition.index]).vrAfterPuma(puma(this._divHeader).find("table th")[columnIndex]);
                            else
                                puma(puma(this._divHeader).find("table th")[toDragColumnPosition.index]).vrBeforePuma(puma(this._divHeader).find("table th")[columnIndex]);

                            if (options.filterable)
                            {
                                if (toDragColumnPosition.index > columnIndex)
                                    puma(puma(this._divFilters).find("table td")[toDragColumnPosition.index]).vrAfterPuma(puma(this._divFilters).find("table td")[columnIndex]);
                                else
                                    puma(puma(this._divFilters).find("table td")[toDragColumnPosition.index]).vrBeforePuma(puma(this._divFilters).find("table td")[columnIndex]);
                            }

                            if (this._showTotals)
                            {
                                if (toDragColumnPosition.index > columnIndex)
                                    puma(puma(this._divTotals).find("table td")[toDragColumnPosition.index]).vrAfterPuma(puma(this._divTotals).find("table td")[columnIndex]);
                                else
                                    puma(puma(this._divTotals).find("table td")[toDragColumnPosition.index]).vrBeforePuma(puma(this._divTotals).find("table td")[columnIndex]);
                            }

                            for (let row of Array.from(puma(this._divBody).find("table tr")))
                            {
                                let field = puma(th).attr("field");
                                let tdJq = puma(row).find("td[field='" + field + "']");
                                let tdJqToDrag = puma(row).find("td[field='" + toDragColumnPosition.field + "']");
                                if (toDragColumnPosition.index > columnIndex)
                                    tdJqToDrag.vrAfterPuma(tdJq);
                                else
                                    tdJqToDrag.vrBeforePuma(tdJq);
                            }

                            if (options.groupable)
                            {
                                if (toDragColumnPosition.index > columnIndex)
                                    puma(this._divBody).find("colgroup").find("col[field='" + toDragColumnPosition.field + "']").vrAfterPuma(puma(this._divBody).find("colgroup").find("col[field='" + field + "'"));
                                else
                                    puma(this._divBody).find("colgroup").find("col[field='" + toDragColumnPosition.field + "']").vrBeforePuma(puma(this._divBody).find("colgroup").find("col[field='" + field + "'"));
                            }
                            //#endregion

                            this.updateColumnPositions();

                            //#region Update options.columns
                            let column = options.columns!.find(k => k.field == field)!;
                            let fieldToDrag = toDragColumnPosition.field;
                            let columnToDrag = options.columns!.find(k => k.field == fieldToDrag)!;
                            let indexToDrag = options.columns!.indexOf(columnToDrag);

                            let fromIndex = options.columns!.indexOf(column);
                            let tempColumn = options.columns![fromIndex];
                            options.columns!.splice(fromIndex, 1);
                            options.columns!.splice(indexToDrag, 0, tempColumn);
                            //#endregion
                        }
                        //#endregion
                    }
                });
        }
    }

    //#region Drag column support
    drag(element: HTMLElement | JQuery | string, dragEvent?: DragSupportEvent)
    {
        let targetStartingXPosition: number | null = null;
        puma(element).mousedown((emd: JQuery.MouseDownEvent) =>
        {
            if (this._isResizing === true)
                return;

            let startingXPosition = emd.clientX;
            let startingYPosition = emd.clientY;

            let target = puma(emd.currentTarget);
            targetStartingXPosition = target.offset().left;
            let targetStartingYPosition = target.offset().top;

            let moved = false;
            let tttt = window.setTimeout(() => targetStartingXPosition = null, 100);

            //#region Moving
            let that = this;
            function mouseMoveDrag(emm: JQuery.MouseMoveEvent)
            {
                clearTimeout(tttt);
                if (targetStartingXPosition == null || that._isResizing === true)
                    return;

                let actualXPosition = emm.clientX;
                let actualYPosition = emm.clientY;
                let xDiff = startingXPosition - actualXPosition;
                let yDiff = startingYPosition - actualYPosition;

                if (xDiff >= -50 && xDiff <= 50)
                    return;

                if (!(emm.clientX == startingXPosition && emm.clientY == startingYPosition))
                {
                    //#region Change position
                    let leftPosition = (emm.clientX - (puma(target[0]).width() / 2));
                    let topPosition = targetStartingYPosition;
                    target.offset({ top: topPosition, left: leftPosition });
                    //#endregion

                    //#region Dragging event
                    if (dragEvent!.onDragging != null)
                    {
                        let dragEveryEvent = new DragEveryEvent();
                        dragEveryEvent.left = target.position().left;
                        dragEveryEvent.top = target.position().top;
                        dragEveryEvent.element = puma(element)[0];
                        dragEvent!.onDragging(dragEveryEvent);
                    }
                    //#endregion
                }

                //#region Drag direction
                if (Math.abs(xDiff) > Math.abs(yDiff))
                {
                    if (dragEvent == null && xDiff != 0)
                        return;

                    moved = true;
                    that._isDragging = true;
                }
                else if (Math.abs(xDiff) < Math.abs(yDiff))
                {
                    if (dragEvent == null && xDiff != 0)
                        return;

                    moved = true;
                    that._isDragging = true;
                }
                //#endregion
            };
            puma(this.container()).on("mousemove", mouseMoveDrag);
            //#endregion

            //#region Stop moving
            puma(this.container()).on("mouseup", function mouseUpDrag(e: any)
            {
                puma(that.container()).off("mouseup", mouseUpDrag);
                puma(that.container()).off("mousemove", mouseMoveDrag);
                that._isDragging = false;

                if (targetStartingXPosition == null || that._isResizing === true)
                {
                    targetStartingXPosition = null;
                    return;
                }

                //#region Events
                if (moved && dragEvent!.onDragged != null)
                {
                    let dragEveryEvent = new DragEveryEvent();
                    dragEveryEvent.left = target.position().left;
                    dragEveryEvent.top = target.position().top;
                    dragEveryEvent.element = puma(element)[0];
                    dragEvent!.onDragged(dragEveryEvent);
                }
                //#endregion

                targetStartingXPosition = null;
            });
            //#endregion
        });
    }
    //#endregion

    //#endregion

    //#region Sticker
    sticker(text?: string)
    {
        if (text != null && text.length > 0)
        {
            this.showSticker();
            this._lblSticker.value(text);
        }

        return this._lblSticker;
    }

    stickerVisible(state?: boolean)
    {
        if (state != null)
            this._lblSticker.visible(state);

        return this._lblSticker.visible();
    }

    showSticker()
    {
        this._lblSticker.show();
    }

    hideSticker()
    {
        this._lblSticker.hide();
    }
    //#endregion

    //#region Utility
    getTotals(dataItems: any[])
    {
        let options = this.getOptions();
        let totals: TotalsResult[] = [];
        for (let column of options.columns!.filter(k => k.aggregate != null && k.aggregate !== false))
        {
            let aggregateResult = 0;
            switch (column.aggregate)
            {
                case GridAggregateMode.Count: aggregateResult = dataItems.map(k => k[column.field]).length; break;
                case GridAggregateMode.Sum: aggregateResult = dataItems.map(k => k[column.field]).vrSum(); break;
                case GridAggregateMode.Average:
                    {
                        if (column.type == 3)
                            aggregateResult = dataItems.map(k => k[column.field]).vrAvg(undefined, column.countZeroInAverage) / 100;
                        else
                            aggregateResult = dataItems.map(k => k[column.field]).vrAvg(undefined, column.countZeroInAverage);
                    }
                    break;
                case GridAggregateMode.Min:
                    {
                        if (column.type != null && (column.type == 5 || column.type == 6 || column.type == 7))
                            aggregateResult = dataItems.map(k => new Date(k[column.field])).vrMin();
                        else
                            aggregateResult = dataItems.map(k => k[column.field]).vrMin();
                    }
                    break;
                case GridAggregateMode.Max:
                    {
                        if (column.type != null && (column.type == 5 || column.type == 6 || column.type == 7))
                            aggregateResult = dataItems.map(k => new Date(k[column.field])).vrMax();
                        else
                            aggregateResult = dataItems.map(k => k[column.field]).vrMax();
                    }
                    break;
            }

            let total = new TotalsResult();
            total.field = column.field;
            total.total = aggregateResult;
            total.decimalDigits = column.decimalDigits;
            total.roundingSettings = column.roundingSettings;
            total.type = column.type!;
            total.milesSeparator = column.milesSeparator;
            totals.push(total);
        }
        return totals;
    }

    fixDatasourceWithVrDatetime(items: any[])
    {
        let newItems: any[] = [];
        if (this._vrDateTimeFields != null && this._vrDateTimeFields.length > 0)
        {
            for (let item of items.filter(k => k))
            {
                for (let field of this._vrDateTimeFields)
                {
                    if (item[field] != null)
                        item[field] = new DateTime(item[field]);
                }
                newItems.push(item);
            }
        }
        else
            newItems.vrPushRange(items);

        return newItems;
    }

    fixDatasourceWithDate(items: any[])
    {
        let options = this.getOptions();
        if (options.fixDatasourceWithDate === true)
        {
            this._vrDateTimeFields = [];
            let dateTypes = [GridColumnTypeEnum.Date, GridColumnTypeEnum.DateTime, GridColumnTypeEnum.Time, GridColumnTypeEnum.LongDate,
            GridColumnTypeEnum.LongDateTime, GridColumnTypeEnum.LongWeekDate, GridColumnTypeEnum.ShortWeekDate];
            if (options.columns!.vrAny(k => dateTypes.includes(k.type!)))
            {
                let columnDateTypes = options.columns!.filter(k => dateTypes.includes(k.type!));
                for (let column of columnDateTypes)
                {
                    for (let row of items)
                    {
                        if (row[column.field] != null)
                        {
                            let dateTime = new DateTime(row[column.field]);
                            if (!this._vrDateTimeFields.includes(column.field) && dateTime.isCreatedByDateTime())
                                this._vrDateTimeFields.push(column.field);

                            row[column.field] = dateTime.toDate();
                        }
                    }
                }
            }
        }
    }

    pageSize(pageSize?: number | boolean, update = false, triggerDataBound = false)
    {
        if (pageSize != null)
        {
            let options = this.getOptions();
            if (pageSize === true)
                pageSize = 50;

            options.pageSize = pageSize;

            if (pageSize === false)
                this._pageSizeUnlimited = true;
            else
            {
                this._pageSizeUnlimited = false;
                this._actualPageSize = pageSize;

                if (options.serverBinding !== false)
                {
                    let pageSelected = 0; // Get back to first page
                    this._serverBindingPagination.indexFrom = pageSelected * pageSize;
                    this._serverBindingPagination.indexTo = this._serverBindingPagination.indexFrom + pageSize - 1;
                }

                if (update)
                {
                    if (options.serverBinding !== false)
                        this.rebind();
                    else
                        this.update(triggerDataBound);
                }

                let newPageSizeItem = { text: String(pageSize), value: String(pageSize), numberValue: pageSize };
                let ddlPageSize = ControlManager.get<ComboBox>(this._elementId + "_ddlPageSize");
                if (ddlPageSize != null)
                {
                    if (!ddlPageSize.items().vrAny(k => k.value == String(pageSize)))
                        ddlPageSize.addItem(newPageSizeItem, true, false, { field: "numberValue" });

                    ddlPageSize.value(String(pageSize), false);
                }
            }
        }
        return this._actualPageSize;
    }

    pageSelected(page?: number, update = true)
    {
        if (page != null)
        {
            let options = this.getOptions();
            if (options.footer !== false)
                puma("#" + this._divFooter.id + " button").removeClass("p-grid-pageSelected");

            let buttonSelected = document.getElementById(this._elementId + "_btnPage_" + page);
            if (buttonSelected != null)
                buttonSelected.classList.add("p-grid-pageSelected")

            //#region Event
            if (options.onPageSelected != null)
            {
                let event = new GridPageSelectedEvent();
                event.sender = this;
                event.pageSelected = page;
                options.onPageSelected(event);

                if (event.isDefaultPrevented())
                    return this._actualPageSelected;
            }
            //#endregion

            this._actualPageSelected = page;
            if (update)
            {
                if (options.serverBinding !== false)
                {
                    let pageSelected = (this._actualPageSelected == 0) ? 0 : (this._actualPageSelected - 1);
                    this._serverBindingPagination.indexFrom = pageSelected * this.pageSize();
                    this._serverBindingPagination.indexTo = this._serverBindingPagination.indexFrom + this.pageSize() - 1;
                    window.setTimeout(() => this.rebind());
                }
                else
                    this.update();
            }
            return page;
        }
        return this._actualPageSelected;
    }

    checkboxesMode(mode?: GridCheckboxModeEnum)
    {
        let options = this.getOptions();
        if (mode != null)
            options.checkboxes = mode;

        return options.checkboxes;
    }

    focus(field?: string)
    {
        let options = this.getOptions();
        if (field != null && options.filterable)
            puma("#" + this._elementId + "_StringFilter_" + field).focus();
    }

    scrollTo(rowIndex: number)
    {
        let rowAtIndex = this.rows().find(k => k.index == rowIndex);
        if (rowAtIndex != null)
        {
            let position = puma(rowAtIndex.element).position();
            puma(this._divBody).scrollTop(position.top);
        }
    }

    private isRepeater()
    {
        return puma(this.container()).hasClass("vrRepeaterContainer");
    }

    private fixValueWithoutSpecialChars(value: string)
    {
        return String(value)
            .replace(/%/, "").replace(/ /g, "").replace(/\./g, "").replace(/-/g, "").replace(/\//g, "").replace(/&/g, "e")
            .replace(/\(/g, "").replace(/\)/g, "").replace(/,/g, "").replace(/\[/g, "").replace(/\]/g, "").replace(/:/g, "")
            .replace(/'/g, "").replace(/@/g, "").replace(/\s/g, "").replace(/€/g, "").replace(/∞/g, "").replace(/>/g, "")
            .replace(/</g, "").replace(/\+/g, "");
    }

    getOptions()
    {
        return (this._internalOptions != null) ? this._internalOptions : this.options<GridOptions>();
    }

    private recalculateHeightWidth()
    {
        this.recalculateFitSpacePercentage();
        this.recalculateHeight();
        this.recalculateWidth();
        this.recalculateHeight();
    }

    recalculateWidth()
    {
        let options = this.getOptions();
        let bodyJQuery = puma(this._divBody);
        let divHeaderJQuery = puma(this._divHeader);
        let divFilterJQuery = puma(this._divFilters);
        let divTotalJQuery = puma(this._divTotals);

        let bodyJQueryLocked = null;
        let divHeaderJQueryLocked = null;
        if (this.thereAreLockedColumns())
        {
            bodyJQueryLocked = puma(this._divBodyLocked);
            divHeaderJQueryLocked = puma(this._divHeaderLocked);
        }

        if (bodyJQuery.css('overflow-y') == 'scroll' || bodyJQuery.css('overflow-y') == 'auto')
        {
            let minusWidth = (this._divBody.scrollHeight > this._divBody.clientHeight && this._divBody.clientHeight > 0) ? 19 : 2;
            if (this.thereAreLockedColumns())
                minusWidth += puma(this._divHeaderLocked).width() + 5;

            //#region Structure
            this._divHeader.style.cssText += "width: Calc(100% - " + minusWidth + "px);";
            divHeaderJQuery.find("th[fitSpace='true']").each((index: number, element: HTMLElement) =>
            {
                element.style.cssText += "width: " + this._fitSpaceColumnPercentage + "%;";
                if (element.clientWidth == 0)
                    element.style.cssText += "width: 100px;";
            });

            this._divFilters.style.cssText += "width: Calc(100% - " + minusWidth + "px);";
            divFilterJQuery.find("td[fitSpace='true']").each((index: number, element: HTMLElement) =>
            {
                element.style.cssText += "width: " + this._fitSpaceColumnPercentage + "%;";
                if (element.clientWidth == 0)
                    element.style.cssText += "width: 100px;";
            });

            if (this.thereAreLockedColumns())
            {
                bodyJQuery.width("Calc(100% - " + (puma(this._divHeaderLocked).width() + 5) + "px)")
                bodyJQueryLocked.width(puma(this._divHeaderLocked).width())
            }
            else
                this._divBody.style.cssText += "width: Calc(100% - 2px);";

            this._divTotals.style.cssText += "width: Calc(100% - " + minusWidth + "px);";
            divTotalJQuery.find("td[fitSpace='true']").each((index: number, element: HTMLElement) =>
            {
                element.style.cssText += "width: " + this._fitSpaceColumnPercentage + "%;";
                if (element.clientWidth == 0)
                    element.style.cssText += "width: 100px;";
            });
            //#endregion

            //#region Manage spanFitSpace
            if (this._divBody.scrollHeight > this._divBody.clientHeight && this._divBody.clientHeight > 0)
            {
                if (divHeaderJQuery.is(":visible"))
                {
                    this._spanFitHeaderSpace.style.cssText += "top: " + (divHeaderJQuery.position().top) + "px; left: " + (divHeaderJQuery.position().left + divHeaderJQuery.width()) + "px";
                    puma(this._spanFitHeaderSpace).show();
                }

                if (options.filterable)
                {
                    this._spanFitFilterSpace.style.cssText += "top: " + (divFilterJQuery.position().top) + "px; left: " + (divFilterJQuery.position().left + divFilterJQuery.width()) + "px";
                    puma(this._spanFitFilterSpace).show();
                }
                else
                    puma(this._spanFitFilterSpace).hide();

                if (this._showTotals && this.getAllItems().length > 0)
                {
                    this._spanFitTotalsSpace.style.cssText += "top: " + (divTotalJQuery.position().top) + "px; left: " + (divTotalJQuery.position().left + divTotalJQuery.width()) + "px";
                    puma(this._spanFitTotalsSpace).show();
                }
                else
                    puma(this._spanFitTotalsSpace).hide();
            }
            else
            {
                puma(this._spanFitHeaderSpace).hide();
                puma(this._spanFitFilterSpace).hide();
                puma(this._spanFitTotalsSpace).hide();
            }
            //#endregion
        }
        else
        {
            puma(this._spanFitHeaderSpace).hide();
            puma(this._spanFitFilterSpace).hide();
            puma(this._spanFitTotalsSpace).hide();
        }

        //#region Colgroup
        if (options.groupable! || options.groupBy != null)
        {
            let i = 0;
            bodyJQuery.find("table colgroup").remove();
            let colGroup = puma("<colgroup></colgroup>").prependTo(bodyJQuery.find(">table"));

            puma(this._divHeaderContainer).show();
            divHeaderJQuery.show();

            let colFragment = document.createDocumentFragment();
            for (let column of Array.from<HTMLElement>(divHeaderJQuery.find(">table tr:first-child th")))
            {
                let field = column.getAttribute("field")!;

                let display = "";
                if (column.offsetParent == null) // is hidden
                    display = "display: none;";
                else
                    i++;

                let width = column.offsetWidth;
                if (i == 1)
                    width -= 1;

                if (field == "vrGridCheckboxColumn")
                    width = 30;

                let col = document.createElement("col");
                col.setAttribute("field", field);
                col.style.cssText += "width: " + width + "px; " + display + ";";
                colFragment.appendChild(col);
            }
            colGroup[0].appendChild(colFragment);

            if (options.header === false)
                divHeaderJQuery.hide();

            if (this.thereAreLockedColumns())
            {
                let i = 0;
                bodyJQueryLocked.find("table colgroup").remove();
                let colGroupLocked = puma("<colgroup></colgroup>").prependTo(bodyJQueryLocked.find(">table"));

                divHeaderJQueryLocked.show();

                let colLockedFragment = document.createDocumentFragment();
                for (let column of Array.from<HTMLElement>(divHeaderJQueryLocked.find(">table tr:first-child th")))
                {
                    let field = column.getAttribute("field")!;

                    let display = "";
                    if (column.offsetParent == null) // is hidden
                        display = "display: none;";
                    else
                        i++;

                    let width = column.offsetWidth;
                    if (i == 1)
                        width -= 1;

                    if (field == "vrGridCheckboxColumn")
                        width = 30;

                    let colLocked = document.createElement("col");
                    colLocked.setAttribute("field", field);
                    colLocked.style.cssText += "width: " + width + "px; " + display + ";";
                    colLockedFragment.appendChild(colLocked);
                }
                colGroupLocked[0].appendChild(colLockedFragment);

                if (options.header === false)
                    divHeaderJQueryLocked.hide();
            }

            if (options.header === false)
                puma(this._divHeaderContainer).hide();
        }
        //#endregion
    }

    private recalculateFitSpacePercentage()
    {
        let options = this.getOptions();
        let tableWidth = puma(this.element()).width();
        let columnsWidthOccupied = 0;
        let fitSpaceColumnsNumber = 0;

        for (let column of options.columns!)
        {
            if (column.hidden == true)
                continue;

            if (this.thereAreLockedColumns() && column.type == GridColumnTypeEnum.EditButton)
                continue;

            if ((column.fitSpace == null || column.fitSpace == false))
                columnsWidthOccupied += (column.width != null) ? column.width : ((column.type == GridColumnTypeEnum.EditButton) ? 32 : 100);
            else
                fitSpaceColumnsNumber++;
        }

        let remainingSpace = tableWidth - columnsWidthOccupied;
        if (!this.thereAreLockedColumns() && options.checkboxes != GridCheckboxModeEnum.None)
            remainingSpace -= 20;

        if (options.groupBy != null && (options.groupBy as GridGroupBySettings).fields != null)
            remainingSpace -= 20 * (options.groupBy as GridGroupBySettings).fields.length;

        let fitSpaceColumnPercentage = (100 * (remainingSpace / fitSpaceColumnsNumber) / tableWidth);
        this._fitSpaceColumnPercentage = fitSpaceColumnPercentage;
    }

    height(height?: number | string)
    {
        if (height != null)
        {
            let options = this.getOptions();
            if (typeof (height) == "number" && height > 0)
            {
                puma(this._divBody).height(height);
                puma("#" + this.element().id + "_grid_body_container").height(height);

                if (this._lblSticker != null)
                {
                    let headerHeight = (puma(this._divHeader).is(":visible")) ? 34 : 0;
                    let filtersHeight = (options.filterable) ? 30 : 0;
                    let totalsheight = (this._showTotals) ? 25 : 0;
                    puma(this._lblSticker.container()).height(puma(this._divBody).height() + headerHeight + filtersHeight + totalsheight - 1);
                }

                if (options.lockable && this._divBody != null)
                {
                    if (this._divBody.scrollWidth > this._divBody.clientWidth && this._divBody.clientWidth > 0)
                        puma(this._divBodyLocked).height(Number(height) - 17);
                    else
                        puma(this._divBodyLocked).height(height);
                }
            }
        }
        return puma(this._divBody).height();
    }

    recalculateHeight(afterFilter = false)
    {
        let options = this.getOptions();

        let headerHeight = (puma(this._divHeader).is(":visible")) ? 34 : 0;
        let filtersHeight = (options.filterable) ? 30 : 0;
        let totalsheight = (this._showTotals) ? 25 : 0;

        if ((typeof (options.height) == "number" && options.height! < 0) || options.height == GridHeightModeEnum.FitScreen)
        {
            let footerHeight = (options.footer !== false) ? 34 : 0;
            let toolbarHeight = (options.toolbar != null) ? 34 : 0;
            let diffHeaderElement = 4;
            let diffHeight = headerHeight + filtersHeight + toolbarHeight + totalsheight + footerHeight + diffHeaderElement;

            let containerOffset = puma("#" + this._elementId + "_divContainer").offset();
            let containerOffsetTop = (containerOffset != null) ? containerOffset.top : 0;
            let height = document.body.offsetHeight - containerOffsetTop - diffHeight + "px";
            puma(this._divBody).height(height);

            let heightContainer = document.body.offsetHeight - containerOffsetTop - diffHeight + 2 + "px";
            puma("#" + this.element().id + "_grid_body_container").height(heightContainer);

            if (options.lockable && this._divBody != null)
            {
                if (this._divBody.scrollWidth > this._divBody.clientWidth && this._divBody.clientWidth > 0)
                    puma(this._divBodyLocked).height(height.vrGetNumericPart() - 17);
                else
                    puma(this._divBodyLocked).height(height);
            }

            if (this._lblSticker != null)
                puma(this._lblSticker.container()).height(puma(this._divBody).height() + headerHeight + filtersHeight + totalsheight - 1);
        }
        else if (afterFilter && typeof (options.height) == "number")
        {
            if (puma(this._divFilters).height() > 32)
                puma(this._divBody).height(options.height - 58.5);
            else
                puma(this._divBody).height(options.height - 31);

            let height = puma(this._divBody).height();
            puma("#" + this.element().id + "_grid_body_container").height(height + 2);

            if (this._lblSticker != null)
                puma(this._lblSticker.container()).height(height + headerHeight + filtersHeight + totalsheight - 1);

            if (options.lockable && this._divBody != null)
            {
                if (this._divBody.scrollWidth > this._divBody.clientWidth && this._divBody.clientWidth > 0)
                    puma(this._divBodyLocked).height(Number(puma(this._divBody).height()) - 17);
                else
                    puma(this._divBodyLocked).height(puma(this._divBody).height());
            }
        }
    }

    private adjustTrHeight()
    {
        let options = this.getOptions();
        if (this.thereAreLockedColumns())
        {
            let trLockedList = Array.from<HTMLElement>(puma(this._elementLocked).find(">tbody tr"));
            let trList = Array.from<HTMLElement>(puma(this.element()).find(">tbody tr"));
            for (let i = 0; i < trLockedList.length; i++)
            {
                let trLocked = trLockedList[i];
                let tr = trList[i];
                let heightToSet = (puma(trLocked).height() > puma(tr).height()) ? puma(trLocked).height() : puma(tr).height();
                if (heightToSet < options.rowHeight!)
                    heightToSet = options.rowHeight!;

                trLocked.style.cssText += "height: " + heightToSet + "px;";
                tr.style.cssText += "height: " + heightToSet + "px;";
            }
        }
    }

    //#region WebApi
    private doWebApiCall(request: GridWebApiRequest, requestType: GridRequestTypeEnum, promiseCallback?: Function)
    {
        let that = this;
        let options = this.getOptions();

        let json: any = {};
        json.AuthKey = request.authKey;

        //#region Type
        if (requestType == GridRequestTypeEnum.Delete)
        {
            if ((request as GridToolbarDeleteRequest).deletedValuesPropertyName == null)
                (request as GridToolbarDeleteRequest).deletedValuesPropertyName = "itemValues";

            if ((request as GridToolbarDeleteRequest).valuePropertyName == null)
                (request as GridToolbarDeleteRequest).valuePropertyName = options.dataSourceFieldId!;

            json[(request as GridToolbarDeleteRequest).deletedValuesPropertyName!] = this.getDeletedItemValues((request as GridToolbarDeleteRequest).valuePropertyName);
        }
        else if (requestType == GridRequestTypeEnum.Rebind || requestType == GridRequestTypeEnum.Excel)
        {
            if (requestType == GridRequestTypeEnum.Rebind)
            {
                if ((request as GridRebindRequest).itemsPropertyName == null)
                    (request as GridRebindRequest).itemsPropertyName = "items";
            }

            //#region Server binding
            if (options.serverBinding !== false)
            {
                //#region Fix date for server
                for (const [key, value] of this._dictionaryFilterConditions.entries())
                {
                    if (value.dateFilterSettings != null)
                    {
                        value.dateFilterSettings.dateFrom = Date.vrConvertDateFromClient(value.dateFilterSettings.dateFrom);
                        if (value.dateFilterSettings.dateTo != null)
                            value.dateFilterSettings.dateTo = Date.vrConvertDateFromClient(value.dateFilterSettings.dateTo);
                    }
                }
                //#endregion

                let gridServerBindingSettings = new VrGridServerBindingSettings();
                gridServerBindingSettings.indexFrom = this._serverBindingPagination.indexFrom;
                gridServerBindingSettings.indexTo = this._serverBindingPagination.indexTo;
                gridServerBindingSettings.columns = options.columns;
                gridServerBindingSettings.sortingInfo = this._actualSortingInfo;
                gridServerBindingSettings.filters = Dictionary.fromMap(this._dictionaryFilterConditions);
                gridServerBindingSettings.groupByFields = (options.groupBy == null) ? [] : ((options.groupBy as GridGroupBySettings).fields as GridGroupByItem[]).map(k => k.field);
                gridServerBindingSettings.excel = requestType == GridRequestTypeEnum.Excel;

                if ((request as GridExcelRequest).fileName != null)
                    gridServerBindingSettings.excelFileName = (request as GridExcelRequest).fileName;

                json.serverBindingSettings = gridServerBindingSettings;
            }
            //#endregion
        }
        else if (requestType == GridRequestTypeEnum.Save)
        {
            for (let property in this._actualEditedItem)
            {
                let propertyValue = this._actualEditedItem[property];
                if (Object.prototype.toString.call(propertyValue) === '[object Date]')
                    this._actualEditedItem[property] = Date.vrConvertDateFromClient(propertyValue);
            }

            if ((request as GridSaveRequest).itemPropertyName == null)
                (request as GridSaveRequest).itemPropertyName = "item";
            json[(request as GridSaveRequest).itemPropertyName!] = this._actualEditedItem;
        }
        //#endregion

        //#region Method
        if (request.method != null)
        {
            if (!request.method!.startsWith("/api/"))
            {
                if (request.method!.startsWith("/"))
                    request.method!.substring(1);

                request.method = "/api/" + request.method;
            }
        }
        //#endregion

        //#region Paramaters
        if (request.otherParameters != null)
        {
            let jsonParameters = Object.getOwnPropertyNames(request.otherParameters);
            for (let param of jsonParameters)
                json[param] = request.otherParameters[param];
        }

        if (request.parameters != null)
        {
            let parameters = request.parameters();
            let jsonParameters = Object.getOwnPropertyNames(parameters);
            for (let param of jsonParameters)
                json[param] = parameters[param];
        }
        //#endregion

        let jsonS = JSON.stringify(json);

        //#region Loader
        let loadingElement = request.loadingElement;
        if (loadingElement == null)
            loadingElement = true;

        if (typeof (loadingElement) == "boolean")
        {
            if (loadingElement === false)
                loadingElement = undefined;
            else
                loadingElement = this.container();
        }

        if (loadingElement != null)
            showLoader((request as any).tempLoadingElement != null ? (request as any).tempLoadingElement : loadingElement, true, "vrGridLoaderRebind" + this._elementId);

        (request as any).tempLoadingElement = undefined;
        //#endregion

        $.ajax({
            type: "POST",
            contentType: "application/json",
            data: jsonS,
            method: "POST",
            processData: false,
            dataType: "json",
            url: request.method,
            success: (response: any, textStatus: string, jqXHR: JQueryXHR) =>
            {
                hideLoader("vrGridLoaderRebind" + this._elementId);

                that._deletedItems = [];

                if (response != null && (response.Success || response.success))
                {
                    //#region Success notification message
                    let successMessage = request!.successNotificationMessage;
                    successMessage = (successMessage == null) ? false : successMessage;

                    if (typeof (successMessage) == "string")
                        successMessage = successMessage;
                    else if (successMessage == true)
                    {
                        if (requestType == GridRequestTypeEnum.Delete)
                            successMessage = "Eliminazione avvenuta correttamente";
                        else if (requestType == GridRequestTypeEnum.Save)
                            successMessage = "Salvataggio effettuato correttamente";
                    }

                    if (typeof (successMessage) == "string")
                        notify(successMessage);
                    //#endregion

                    //#region Rebind
                    let rebindAfterSave = request!.rebindGridAfterSave;
                    rebindAfterSave = (rebindAfterSave == null) ? false : rebindAfterSave;

                    if (rebindAfterSave && requestType != GridRequestTypeEnum.Rebind)
                        that.rebind();
                    else
                    {
                        if (requestType == GridRequestTypeEnum.Save)
                            that.updateRow(that._actualEditedItem);
                        else if (requestType == GridRequestTypeEnum.RebindSpecificRows)
                        {
                            let specificItemIdListRequested: any[] = [];
                            if (request.otherParameters != null)
                                specificItemIdListRequested = request.otherParameters[(request as GridRebindRequest).specificItemIdListPropertyName!];

                            let specificItems: any[] = response[(request as GridRebindRequest).itemsPropertyName!];
                            if (specificItems != null && specificItems.length > 0)
                            {
                                let itemToRemoveIdList = specificItemIdListRequested.filter(k => !specificItems.map(k => k[options.dataSourceFieldId!]).includes(k));
                                let itemsToAddIdList = specificItems.filter(k => !this.originalDataSource().map(j => j[options.dataSourceFieldId!]).includes(k[options.dataSourceFieldId!])).map(k => k[options.dataSourceFieldId!]);

                                for (let specificItem of specificItems)
                                {
                                    let specificItemId = specificItem[options.dataSourceFieldId!];
                                    if (itemToRemoveIdList.includes(specificItemId) || itemsToAddIdList.includes(specificItemId))
                                        continue;

                                    this.updateRow(specificItem, false);
                                }

                                for (let itemToRemoveId of itemToRemoveIdList)
                                    this.deleteRow(itemToRemoveId, false);

                                for (let itemToAddId of itemsToAddIdList)
                                    this.addRow(specificItems.find(k => k[options.dataSourceFieldId!] == itemToAddId), false);
                            }
                            else
                            {
                                for (let itemToRemoveId of specificItemIdListRequested)
                                    this.deleteRow(itemToRemoveId, false);
                            }

                            if (request.otherParameters["update"])
                            {
                                if (this._actualSortingInfo != null)
                                    this.applySorting(false);

                                if (this._dictionaryFilterConditions.size > 0)
                                    this.applyFilters(false, false);

                                if (options.groupBy != null)
                                    this.sortingGroupFields(this.dataSource());

                                this.update(true, false);
                            }
                        }
                    }
                    //#endregion

                    if (request!.callbackBeforeDatasourceChange != null)
                        request!.callbackBeforeDatasourceChange(response);

                    //#region Set data source if rebind
                    if (requestType == GridRequestTypeEnum.Rebind && response[(request as GridRebindRequest).itemsPropertyName!] != null)
                    {
                        if (options.serverBinding !== false)
                        {
                            this._responseForServerBinding = response;

                            let maxLength = this._responseForServerBinding[(options.serverBinding! as GridServerBindSettings).itemCountPropertyName!];
                            let pageSelected = this.pageSelected();
                            let numberOfPages = Math.trunc(maxLength / Number(options.pageSize!));
                            if (maxLength % Number(options.pageSize!) > 0)
                                numberOfPages += 1;

                            if (pageSelected > numberOfPages)
                                this.pageSelected(1, false);
                        }

                        let clearFilters = ((request as GridRebindRequest).clearFilters == null) ? false : (request as GridRebindRequest).clearFilters;

                        let newDatasource = response[(request as GridRebindRequest).itemsPropertyName!];
                        if (newDatasource.length == 0)
                            this.clear(undefined, clearFilters);
                        else
                            that.dataSource(newDatasource, clearFilters);
                    }
                    //#endregion

                    //#region Excel for Server binding
                    if (requestType == GridRequestTypeEnum.Excel && options.serverBinding !== false)
                    {
                        let downloadUrl = response[(options.serverBinding as GridServerBindSettings).excelDownloadUrlPropertyName!];
                        if (downloadUrl != null && downloadUrl.length > 0)
                            location.replace(downloadUrl);
                    }
                    //#endregion

                    if (that._wndAutoWindow != null)
                        that._wndAutoWindow.close();

                    if (request!.callback != null)
                        request!.callback(response);

                    if (options.onDataSourceChanged != null)
                        options.onDataSourceChanged();

                    if (promiseCallback != null)
                        promiseCallback(response);
                }
                else
                {
                    let exception = (response.Exception || response.exception);
                    let exceptionCode = (exception.Code || exception.code);
                    if (response != null && exceptionCode == "403")
                    {
                        location.replace("/Default.aspx");
                        return;
                    }

                    //#region Error notification message
                    let errorMessage = request!.errorNotificationMessage;
                    errorMessage = (errorMessage == null) ? true : errorMessage;

                    if (errorMessage == true || typeof (errorMessage) == "string")
                        notifyError((typeof (errorMessage) == "string") ? errorMessage! : ((response != null) ? (response.ExceptionMessage! || response.exceptionMessage) : "Errore nel salvataggio"));
                    //#endregion

                    //#region Rebind
                    let rebindAfterError = request!.rebindGridAfterError;
                    rebindAfterError = (rebindAfterError == null) ? false : rebindAfterError;

                    if (rebindAfterError && requestType != GridRequestTypeEnum.Rebind)
                        that.rebind();
                    //#endregion

                    let closeWindowAfterError = request!.closeWindowAfterError;
                    closeWindowAfterError = (closeWindowAfterError == null) ? false : closeWindowAfterError;
                    if (that._wndAutoWindow != null && closeWindowAfterError)
                        that._wndAutoWindow.close();

                    if (request!.errorCallback != null)
                        request!.errorCallback((response != null) ? (response.ExceptionMessage! || response.exceptionMessage) : "Errore nel salvataggio");
                }
            },
            error: (response: JQueryXHR, textStatus: string, errorThrown: string) =>
            {
                hideLoader("vrGridLoaderRebind" + this._elementId);

                //#region Error notification message
                let errorMessage = request!.errorNotificationMessage;
                errorMessage = (errorMessage == null) ? true : errorMessage;

                let message = "Errore nel salvataggio";
                if (response.responseJSON != null)
                    message = (response.responseJSON.errorMessage != null) ? response.responseJSON.errorMessage : ((response.responseJSON.Message || response.responseJSON.message) + "<br />" + (response.responseJSON.ExceptionMessage || response.responseJSON.exceptionMessage));
                else if (response.responseText != null && response.responseText != "")
                    message = response.responseText;
                else if (response.statusText != null && response.statusText != "")
                    message = response.statusText;
                else
                    message = "Si è verificato un problema";

                if (response.status == 401)
                    message = "Auth key errata";
                else if (response.status == 404)
                    message = "Web Api non trovata";
                else if (response.status == 403)
                {
                    location.replace("/Default.aspx");
                    return;
                }

                let finalMessage = "Errore nel salvataggio";
                if (errorMessage == true || typeof (errorMessage) == "string")
                {
                    finalMessage = (errorMessage == true) ? message : errorMessage;
                    notifyError(finalMessage);
                }
                //#endregion

                //#region Rebind
                let rebindAfterError = request!.rebindGridAfterError;
                rebindAfterError = (rebindAfterError == null) ? false : rebindAfterError;

                if (rebindAfterError && requestType != GridRequestTypeEnum.Rebind)
                    that.rebind();
                //#endregion

                let closeWindowAfterError = request!.closeWindowAfterError;
                closeWindowAfterError = (closeWindowAfterError == null) ? false : closeWindowAfterError;
                if (that._wndAutoWindow != null && closeWindowAfterError)
                    that._wndAutoWindow.close();

                if (request!.errorCallback != null)
                    request!.errorCallback(finalMessage);
            }
        });
    }
    //#endregion

    //#endregion    
    enable(state?: boolean | string)
    {
        if (state == null)
            state = true;

        puma("#" + puma(this.element()).attr("id") + "_divContainer").find(".grid_divTableDisabled").remove();
        if (state !== true)
        {
            let options = this.getOptions();
            let message = (typeof (state) == "string") ? ("<span>" + state + "</span>") : "";
            if (message == "" && typeof (options.enable) == "string")
                message = "<span>" + options.enable + "</span>";

            puma("<div class='grid_divTableDisabled'>" + message + "</div>").vrAppendToPuma("#" + puma(this.element()).attr("id") + "_divContainer");
        }
    }
    //#endregion

    //#region Toolbar
    private toolbarCustomLogic(toolbarItem: GridToolbarItem, toolbarClickEvent: GridToolbarClickEvent)
    {
        if (toolbarItem.onBeforeClick != null)
        {
            toolbarItem.onBeforeClick(toolbarClickEvent);
            if (toolbarClickEvent.isDefaultPrevented)
                return;
        }

        switch (toolbarItem.type)
        {
            case GridToolbarItemType.Add:
                {
                    if (toolbarItem.onClick == null)
                        this.openAutoWindow();
                }
                break;
            case GridToolbarItemType.Delete:
                {
                    let options = this.getOptions();
                    let checkedItems = this.getCheckedItems();
                    this._deletedItems.vrPushRange(checkedItems);
                    toolbarClickEvent.deletedItems = this._deletedItems;

                    this.deleteRows(checkedItems.map(k => k[options.dataSourceFieldId!]));
                    this.clearSelection();

                    //#region Delete request
                    let deleteRequest = toolbarItem.deleteRequest;
                    if (deleteRequest != null && options.mode == GridModeEnum.Sync)
                        this.doWebApiCall(deleteRequest, GridRequestTypeEnum.Delete);
                    else
                    {
                        this.update();
                        if (options.onDataSourceChanged != null)
                            options.onDataSourceChanged();
                    }
                    //#endregion
                }
                break;
            case GridToolbarItemType.Rebind:
                {
                    this._deletedItems = [];
                    this.rebind();
                    this.clearSelection();
                }
                break;
            case GridToolbarItemType.Excel:
                {
                    this.excelExport(toolbarItem.excelFileName);
                }
                break;
            case GridToolbarItemType.ExcelWithHiddenColumns:
                {
                    this.excelExport(toolbarItem.excelFileName, true);
                }
                break;
        }

        if (toolbarItem.onClick != null)
            toolbarItem.onClick(toolbarClickEvent);
    }

    //#region Excel
    excelExport(fileName = "Esportazione_excel", exportHiddenColumns = false, download = true)
    {
        let promise = new Promise((callback: (e: ExcelExportPromise) => void) =>
        {
            let options = this.getOptions();

            //#region Before excel export
            if (options.onBeforeExcelExport != null)
            {
                let event = new GridBeforeExcelExportEvent();
                event.sender = this;
                event.fileName = fileName;
                event.exportHiddenColumns = exportHiddenColumns;
                options.onBeforeExcelExport(event);

                if (event.isDefaultPrevented())
                    return;
            }
            //#endregion

            if (!options.serverBinding)
                showLoader(this.container(), true, "vrGridLoaderExcel" + this._elementId);

            window.setTimeout(() =>
            {
                if (!options.serverBinding)
                {
                    //#region Header rows
                    let headerRow = new GridExcelRow();
                    headerRow.cells = [];
                    for (let column of options.columns!)
                    {
                        if (column.exportable !== true && ((!exportHiddenColumns && column.hidden == true
                            && (options.groupBy == null
                                || ((options.groupBy as GridGroupBySettings).fields != null && !((options.groupBy as GridGroupBySettings).fields as GridGroupByItem[]).map(k => k.field).includes(column.field))))
                            || column.type == GridColumnTypeEnum.EditButton || column.type == GridColumnTypeEnum.Image
                            || column.type == GridColumnTypeEnum.Button || column.type == GridColumnTypeEnum.Icon || column.exportable === false))
                            continue;

                        let excelCell = new GridExcelCell();
                        excelCell.field = column.field;
                        excelCell.title = column.title;
                        excelCell.text = column.title;
                        excelCell.bold = column.bold;
                        excelCell.type = column.type;
                        excelCell.width = column.width;
                        excelCell.cellSettings = column.headerSettings;
                        excelCell.hidden = column.hidden;
                        excelCell.locked = column.locked;
                        headerRow.cells.push(excelCell);
                    }
                    //#endregion

                    //#region Content rows
                    let contentRows: GridExcelRow[] = [];
                    this.fixDatasourceWithDate(this.dataSource());
                    for (let item of this.dataSource())
                    {
                        let contentRow = new GridExcelRow();
                        contentRow.cells = [];

                        for (let column of options.columns!)
                        {
                            if (column.exportable !== true && ((!exportHiddenColumns && column.hidden == true
                                && (options.groupBy == null
                                    || ((options.groupBy as GridGroupBySettings).fields != null && !((options.groupBy as GridGroupBySettings).fields as GridGroupByItem[]).map(k => k.field).includes(column.field))))
                                || column.type == GridColumnTypeEnum.EditButton || column.type == GridColumnTypeEnum.Image
                                || column.type == GridColumnTypeEnum.Button || column.type == GridColumnTypeEnum.Icon
                                || column.exportable === false))
                                continue;

                            let textHTML = (item[column.field] == null) ? "" : String(item[column.field]);
                            let textAlign = GridAlignEnum.Left;

                            //#region Type
                            switch (column.type)
                            {
                                //#region Date, DateTime, Time
                                case GridColumnTypeEnum.Date:
                                case GridColumnTypeEnum.DateTime:
                                case GridColumnTypeEnum.Time:
                                case GridColumnTypeEnum.LongDate:
                                case GridColumnTypeEnum.LongDateTime:
                                case GridColumnTypeEnum.LongWeekDate:
                                case GridColumnTypeEnum.ShortWeekDate:
                                    {
                                        textAlign = GridAlignEnum.Center;
                                        let dateModeEnum: DateModeEnum = DateModeEnum.Date;

                                        if (column.type == GridColumnTypeEnum.Date) dateModeEnum = DateModeEnum.Date;
                                        else if (column.type == GridColumnTypeEnum.DateTime) dateModeEnum = DateModeEnum.DateTime;
                                        else if (column.type == GridColumnTypeEnum.Time) dateModeEnum = DateModeEnum.Time;
                                        else if (column.type == GridColumnTypeEnum.LongDate) dateModeEnum = DateModeEnum.LongDate;
                                        else if (column.type == GridColumnTypeEnum.LongDateTime) dateModeEnum = DateModeEnum.LongDateTime;
                                        else if (column.type == GridColumnTypeEnum.LongWeekDate) dateModeEnum = DateModeEnum.LongWeekDate;
                                        else if (column.type == GridColumnTypeEnum.ShortWeekDate) dateModeEnum = DateModeEnum.ShortWeekDate;

                                        textHTML = (textHTML == "") ? "" : new Date(new Date(textHTML)).vrToItalyString(dateModeEnum, column.showSeconds);
                                    }
                                    break;
                                //#endregion

                                //#region Number, Currency, Percentage, Duration
                                case GridColumnTypeEnum.Number:
                                case GridColumnTypeEnum.Currency:
                                case GridColumnTypeEnum.Percentage:
                                case GridColumnTypeEnum.Duration:
                                    {
                                        textAlign = GridAlignEnum.Right;
                                    }
                                    break;
                                //#endregion

                                //#region Custom
                                case GridColumnTypeEnum.Custom:
                                    {
                                        textAlign = GridAlignEnum.Center;
                                        if (column.customSettings != null)
                                        {
                                            try
                                            {
                                                let settings = column.customSettings({ dataItem: item, field: column.field, sender: this });
                                                if (settings && settings.template !== "" && textHTML == "")
                                                    textHTML = settings.template;
                                            }
                                            catch (e) { }
                                        }
                                        else
                                            textHTML = puma(textHTML).text();
                                    }
                                    break;
                                //#endregion

                                //#region Label
                                case GridColumnTypeEnum.Label:
                                    {
                                        textAlign = GridAlignEnum.Center;
                                        if (column.labelSettings != null)
                                        {
                                            try
                                            {
                                                let settings = column.labelSettings({ dataItem: item, field: column.field, sender: this });
                                                textHTML = (settings.text == null) ? "" : settings.text;
                                            }
                                            catch (e) { }
                                        }
                                        else
                                            textHTML = puma(textHTML).text();
                                    }
                                    break;
                                //#endregion

                                //#region String
                                case GridColumnTypeEnum.String:
                                    {
                                        textAlign = GridAlignEnum.Left;
                                        textHTML = puma("<span>" + textHTML + "</span>").text();
                                    }
                                    break;
                                //#endregion

                                //#region Password
                                case GridColumnTypeEnum.PasswordViewable:
                                    {
                                        textAlign = GridAlignEnum.Left;
                                        textHTML = puma("<span>" + textHTML + "</span>").text();
                                    }
                                    break;
                                //#endregion

                                //#region CheckBox
                                case GridColumnTypeEnum.Checkbox:
                                case GridColumnTypeEnum.Boolean:
                                    {
                                        textAlign = GridAlignEnum.Center;
                                        textHTML = (item[column.field] == true) ? "true" : "false";
                                    }
                                    break;
                                //#endregion

                                //#region ComboBox, DropDownList, DropDownTree
                                case GridColumnTypeEnum.ComboBox:
                                case GridColumnTypeEnum.DropDownList:
                                case GridColumnTypeEnum.DropDownTree:
                                case GridColumnTypeEnum.DropDownTreeCheckboxes:
                                    {
                                        textAlign = GridAlignEnum.Left;
                                        let itemValue = item[column.displayField!];
                                        if (itemValue != null)
                                            textHTML = itemValue.toString();
                                        else
                                            textHTML = "";
                                    }
                                    break;
                                //#endregion

                                //#region Color
                                case GridColumnTypeEnum.Color:
                                    {
                                        textAlign = GridAlignEnum.Center;
                                    }
                                    break;
                                //#endregion
                            }
                            //#endregion

                            if (column.cellSettings == null)
                                column.cellSettings = new GridHeaderAndCellSettings();

                            if (column.cellSettings.textAlign == null)
                                column.cellSettings.textAlign = textAlign;

                            let excelCell = new GridExcelCell();
                            excelCell.field = column.field;
                            excelCell.title = column.title;
                            excelCell.text = textHTML;
                            excelCell.bold = column.bold;
                            excelCell.type = column.type;
                            excelCell.width = column.width;
                            excelCell.cellSettings = column.cellSettings;
                            excelCell.decimalDigits = column.decimalDigits;
                            excelCell.roundingSettings = (column.roundingSettings != null) ? column.roundingSettings : options.roundingSettings;
                            excelCell.hidden = column.hidden;
                            excelCell.locked = column.locked;

                            //#region Aggregate mode
                            if (column.aggregate === true)
                            {
                                switch (column.type)
                                {
                                    case GridColumnTypeEnum.Number: column.aggregate = GridAggregateMode.Sum; break;
                                    case GridColumnTypeEnum.Currency: column.aggregate = GridAggregateMode.Sum; break;
                                    case GridColumnTypeEnum.Duration: column.aggregate = GridAggregateMode.Sum; break;
                                    case GridColumnTypeEnum.Percentage: column.aggregate = GridAggregateMode.Average; break;
                                    default: column.aggregate = GridAggregateMode.Sum;
                                }
                            }
                            excelCell.aggregate = (column.aggregate == null || column.aggregate === false) ? GridAggregateMode.None : column.aggregate;
                            //#endregion

                            //#region Background color
                            let backgroundColor = "";
                            let color = "";
                            if (column.cellSettings != null)
                            {
                                if (column.cellSettings.backgroundColor != null)
                                    backgroundColor = column.cellSettings.backgroundColor;

                                if (column.cellSettings.color != null)
                                    color = column.cellSettings.color;
                            }

                            if (options.rowColorProperty != null && item[options.rowColorProperty] != null && item[options.rowColorProperty] !== "")
                                backgroundColor = item[options.rowColorProperty];

                            excelCell.backgroundColor = backgroundColor;
                            excelCell.color = color;
                            //#endregion

                            contentRow.cells.push(excelCell);
                        }
                        contentRows.push(contentRow);
                    }
                    //#endregion

                    //#region Footer rows
                    let footerRow = new GridExcelRow();
                    footerRow.cells = [];
                    for (let td of Array.from<HTMLElement>(puma(this._divTotals).find("td")))
                    {
                        let field = puma(td).attr("field");
                        if (field == null)
                            continue;

                        let column = options.columns!.find(k => k.field == field);
                        if (column == null || (column != null && column.exportable !== true))
                        {
                            if (column == null || (!exportHiddenColumns && column.hidden == true
                                && (options.groupBy == null
                                    || ((options.groupBy as GridGroupBySettings).fields != null && !((options.groupBy as GridGroupBySettings).fields as GridGroupByItem[]).map(k => k.field).includes(column.field))))
                                || column.type == GridColumnTypeEnum.EditButton || column.type == GridColumnTypeEnum.Image
                                || column.type == GridColumnTypeEnum.Button || column.type == GridColumnTypeEnum.Icon || column.exportable === false)
                                continue;
                        }

                        let excelCell = new GridExcelCell();
                        excelCell.field = column.field;
                        excelCell.title = column.title;
                        excelCell.text = String(Number(td.innerHTML.replace("€", "").replace("%", "").replace(".", "").replace(",", ".")));
                        excelCell.bold = column.bold;
                        excelCell.type = column.type;
                        excelCell.width = column.width;
                        excelCell.decimalDigits = column.decimalDigits;
                        excelCell.roundingSettings = (column.roundingSettings != null) ? column.roundingSettings : options.roundingSettings;
                        excelCell.hidden = column.hidden;
                        excelCell.locked = column.locked;

                        //#region Aggregate mode
                        if (column.aggregate === true)
                        {
                            switch (column.type)
                            {
                                case GridColumnTypeEnum.Number: column.aggregate = GridAggregateMode.Sum; break;
                                case GridColumnTypeEnum.Currency: column.aggregate = GridAggregateMode.Sum; break;
                                case GridColumnTypeEnum.Duration: column.aggregate = GridAggregateMode.Sum; break;
                                case GridColumnTypeEnum.Percentage: column.aggregate = GridAggregateMode.Average; break;
                                default: column.aggregate = GridAggregateMode.Sum;
                            }
                        }
                        excelCell.aggregate = (column.aggregate == null || column.aggregate === false) ? GridAggregateMode.None : column.aggregate;
                        //#endregion

                        footerRow.cells.push(excelCell);
                    }
                    //#endregion

                    //#region Generate Excel
                    if (options.excel != null && options.excel.fileName != null) fileName = options.excel.fileName;

                    let generateExcelRequest = new GenerateExcelRequest();
                    generateExcelRequest.headerRow = headerRow;
                    generateExcelRequest.contentRows = contentRows;
                    generateExcelRequest.footerRow = footerRow;
                    generateExcelRequest.excelFileName = fileName;
                    generateExcelRequest.AuthKey = "10(P9m+U3a@Mtt-Oeo";
                    generateExcelRequest.exportHiddenColumns = exportHiddenColumns;

                    if (options.groupBy != null)
                    {
                        let groupByFields = (options.groupBy as GridGroupBySettings).fields;
                        generateExcelRequest.groupBy = groupByFields as GridGroupByItem[];
                    }

                    if (download)
                    {
                        //#region Download Excel directly
                        let jsonString = JSON.stringify(generateExcelRequest);

                        //#region Multipart
                        let formDataMultipart = null;
                        formDataMultipart = new FormData();
                        formDataMultipart.append("file", new Blob([jsonString], { type: "application/json" }));
                        //#endregion

                        $.ajax(
                            {
                                type: "POST",
                                beforeSend: (xhr: any) =>
                                {
                                    //#region Header parameters
                                    xhr.setRequestHeader("Accept-Language", "it");
                                    xhr.setRequestHeader("AuthKey", "10(P9m+U3a@Mtt-Oeo");
                                    //#endregion
                                },
                                contentType: false,
                                data: formDataMultipart,
                                method: "POST",
                                processData: false,
                                dataType: "JSON",
                                url: "/api/UtilityWebApi/GenerateExcel",
                                success: (response: GenerateExcelResponse, textStatus: string, jqXHR: JQueryXHR) =>
                                {
                                    hideLoader("vrGridLoaderExcel" + this._elementId);

                                    //#region After excel export
                                    if (options.onAfterExcelExport != null)
                                    {
                                        let event = new GridAfterExcelExportEvent();
                                        event.sender = this;
                                        event.headerRow = headerRow;
                                        event.contentRows = contentRows;
                                        event.footerRow = footerRow;
                                        event.excelFileName = fileName;
                                        event.exportHiddenColumns = exportHiddenColumns;

                                        if (options.groupBy != null)
                                        {
                                            let groupByFields = (options.groupBy as GridGroupBySettings).fields;
                                            event.groupBy = (groupByFields != null) ? (groupByFields as GridGroupByItem[]).map(k => k.field) : null;
                                        }

                                        options.onAfterExcelExport(event);

                                        if (event.isDefaultPrevented())
                                            return;
                                    }
                                    //#endregion

                                    if (response.downloadUrl != null && response.downloadUrl.length > 0)
                                        location.replace(response.downloadUrl);

                                    if (!(response as any).Success)
                                        notifyError((response as any).ErrorMessage);
                                },
                                error: (response: JQueryXHR, textStatus: string, errorThrown: string) =>
                                {
                                    hideLoader();
                                    alert("Errore nell'esportazione Excel. Contattare l'assistenza. <br /><br />" + response);
                                }
                            });
                        //#endregion
                    }
                    else
                        hideLoader("vrGridLoaderExcel" + this._elementId);

                    let excelExportPromise = new ExcelExportPromise();
                    excelExportPromise.fileName = fileName;
                    excelExportPromise.headerRow = headerRow;
                    excelExportPromise.contentRows = contentRows;
                    excelExportPromise.footerRow = footerRow;
                    if (options.groupBy != null)
                        excelExportPromise.groupByFields = (options.groupBy as GridGroupBySettings).fields as GridGroupByItem[];

                    callback(excelExportPromise);
                }
                else
                {
                    if (options.excel != null)
                    {
                        if (options.excel.fileName == null) options.excel.fileName = fileName;
                        this.doWebApiCall(options.excel, GridRequestTypeEnum.Excel);
                    }
                }
                //#endregion
            }, 200);
        });
        return promise;
    }
    //#endregion

    //#region Toolbar
    visibleToolbar(state?: boolean)
    {
        if (state != null)
        {
            if (state) puma(this._divToolbar).show();
            else puma(this._divToolbar).hide();
        }
        return puma(this._divToolbar).is(":visible");
    }

    showToolbar()
    {
        this.visibleToolbar(true);
    }

    hideToolbar()
    {
        this.visibleToolbar(false);
    }

    toolbar()
    {
        return this._divToolbar;
    }

    toolbarItem<T extends VrControl>(value: string)
    {
        return ControlManager.get<T>("grid-" + value + "_" + this._elementId);
    }

    visibleToolbarItem(value: string, state?: boolean)
    {
        let toolbarItem = this.toolbarItem(value);
        if (toolbarItem != null)
        {
            if (state != null)
                toolbarItem.visible(state)

            return toolbarItem.visible();
        }
        return false;
    }

    showToolbarItem<T extends VrControl>(value: string)
    {
        let toolbarItem = this.toolbarItem<T>(value);
        if (toolbarItem != null)
            toolbarItem.show();
    }

    hideToolbarItem<T extends VrControl>(value: string)
    {
        let toolbarItem = this.toolbarItem<T>(value);
        if (toolbarItem != null)
            toolbarItem.hide();
    }

    enabledToolbarItem(value: string, state?: boolean)
    {
        let toolbarItem = this.toolbarItem(value);
        if (toolbarItem != null)
        {
            if (state != null)
                toolbarItem.enabled(state)

            return toolbarItem.enabled();
        }
        return false;
    }

    enableToolbarItem<T extends VrControl>(value: string)
    {
        let toolbarItem = this.toolbarItem<T>(value);
        if (toolbarItem != null)
            toolbarItem.enable();
    }

    disableToolbarItem<T extends VrControl>(value: string)
    {
        let toolbarItem = this.toolbarItem<T>(value);
        if (toolbarItem != null)
            toolbarItem.disable();
    }

    removeToolbarItem(value: string)
    {
        let toolbarItem = this.toolbarItem(value);
        if (toolbarItem != null)
            puma(toolbarItem.container()).remove();
    }

    addToolbarItems(toolbarItems: GridToolbarItem[])
    {
        for (let toolbarItem of toolbarItems)
            this.addToolbarItem(toolbarItem);
    }

    addToolbarItem(toolbarItem: GridToolbarItem)
    {
        if (toolbarItem.visible == null) toolbarItem.visible = true;
        if (toolbarItem.type == null) toolbarItem.type = GridToolbarItemType.Custom;

        //#region Toolbar control settings
        let text = "";
        let iconClass: IconClass | undefined = undefined;
        let buttonClass = "";
        let enabled = toolbarItem.enable;
        let vrButton = false;
        if (toolbarItem.css == null) toolbarItem.css = "";
        if (toolbarItem.cssContainer == null) toolbarItem.cssContainer = "";
        let toolbarItemValue = (toolbarItem.value == null) ? ((toolbarItem.text != null) ? toolbarItem.text.replace(/[^a-z0-9\s]/gi, "").replace(/[_\s]/g, "") : "noValue") : toolbarItem.value;

        //#region Toolbar item type
        switch (toolbarItem.type)
        {
            case GridToolbarItemType.Add:
                {
                    text = (toolbarItem.text != null) ? toolbarItem.text : "Aggiungi";
                    iconClass = (toolbarItem.icon != null) ? toolbarItem.icon : IconClassicLight.Plus;
                    buttonClass = (toolbarItem.value != null) ? "grid-" + toolbarItem.value : "grid-add";
                    vrButton = true;
                }
                break;
            case GridToolbarItemType.Custom:
                {
                    text = (toolbarItem.text != null) ? toolbarItem.text : "";
                    iconClass = (toolbarItem.icon != null) ? toolbarItem.icon : undefined;
                    buttonClass = "grid-" + toolbarItemValue;
                    vrButton = true;
                }
                break;
            case GridToolbarItemType.SplitButton:
                {
                    text = (toolbarItem.text != null) ? toolbarItem.text : "";
                    iconClass = (toolbarItem.icon != null) ? toolbarItem.icon : undefined;
                    vrButton = false;
                }
                break;
            case GridToolbarItemType.Switch:
            case GridToolbarItemType.ButtonGroup:
            case GridToolbarItemType.CheckBox:
            case GridToolbarItemType.ComboBox:
            case GridToolbarItemType.DatePicker:
            case GridToolbarItemType.Label:
            case GridToolbarItemType.TextBox:
                {
                    vrButton = false;
                }
                break;
            case GridToolbarItemType.Delete:
                {
                    text = (toolbarItem.text != null) ? toolbarItem.text : "Elimina";
                    iconClass = (toolbarItem.icon != null) ? toolbarItem.icon : IconClassicRegular.Xmark;
                    buttonClass = (toolbarItem.value != null) ? "grid-" + toolbarItem.value : "grid-delete";
                    vrButton = true;
                }
                break;
            case GridToolbarItemType.Excel:
                {
                    text = (toolbarItem.text != null) ? toolbarItem.text : "Excel";
                    iconClass = (toolbarItem.icon != null) ? toolbarItem.icon : IconClassicLight.FileExcel;
                    buttonClass = (toolbarItem.value != null) ? "grid-" + toolbarItem.value : "grid-excel";
                    vrButton = true;
                    toolbarItem.backgroundColor = "#008a00";
                    toolbarItem.textColor = "#FFF";
                }
                break;
            case GridToolbarItemType.ExcelWithHiddenColumns:
                {
                    text = (toolbarItem.text != null) ? toolbarItem.text : "Excel";
                    iconClass = (toolbarItem.icon != null) ? toolbarItem.icon : IconClassicLight.FileExcel;
                    buttonClass = (toolbarItem.value != null) ? "grid-" + toolbarItem.value : "grid-excelHiddenColumns";
                    vrButton = true;
                    toolbarItem.backgroundColor = "#008a00";
                    toolbarItem.textColor = "#FFF";
                }
                break;
            case GridToolbarItemType.Separator:
                {
                    buttonClass = (toolbarItem.value != null) ? "grid-" + toolbarItem.value : "grid-separator";
                    enabled = false;
                    vrButton = true;
                }
                break;
            case GridToolbarItemType.Rebind:
                {
                    text = (toolbarItem.text != null) ? toolbarItem.text : "Aggiorna";
                    iconClass = (toolbarItem.icon != null) ? toolbarItem.icon : IconClassicLight.Refresh;
                    buttonClass = (toolbarItem.value != null) ? "grid-" + toolbarItem.value : "grid-rebind";
                    vrButton = true;
                }
                break;
        }
        //#endregion

        //#endregion

        if (vrButton)
        {
            //#region Create button
            createButton(
                {
                    icon: iconClass,
                    imageUrl: toolbarItem.imageUrl,
                    enable: enabled,
                    text: text,
                    colorSettings: { background: toolbarItem.backgroundColor, textColor: toolbarItem.textColor },
                    visible: toolbarItem.visible,
                    cssContainer: toolbarItem.cssContainer,
                    css: toolbarItem.css,
                    mode: (toolbarItem.primary === true) ? ButtonModeEnum.Primary : undefined,
                    classContainer: "grid-toolbarItemsContainer " + ((toolbarItem.classContainer != null) ? toolbarItem.classContainer : ""),
                    class: ((toolbarItem.type == GridToolbarItemType.Separator) ? "grid-separator" : "") + " grid-toolbarItems " + buttonClass,
                    badgeSettings: toolbarItem.badge,
                    onClick: (e) =>
                    {
                        //#region Delete
                        if (toolbarItem.type == GridToolbarItemType.Delete)
                        {
                            let checkedValues = this.getCheckedValues();
                            if (checkedValues.length == 0)
                            {
                                notifyWarning("Selezionare almeno una riga per proseguire");
                                return;
                            }
                            else
                            {
                                if (toolbarItem.confirmationMessage == null)
                                {
                                    if (checkedValues.length == 1) toolbarItem.confirmationMessage = "Proseguendo, verrà eliminato l'elemento selezionato. Continuare?";
                                    else if (checkedValues.length > 1) toolbarItem.confirmationMessage = "Proseguendo, verranno eliminati gli elementi selezionati. Continuare?";
                                }
                            }
                        }
                        //#endregion

                        //#region Event
                        let toolbarClickEvent = new GridToolbarClickEvent();
                        toolbarClickEvent.sender = e.sender;
                        toolbarClickEvent.type = toolbarItem.type!;
                        //#endregion

                        //#region Confirmation message
                        if (toolbarItem.confirmationMessage != null && toolbarItem.confirmationMessage.length > 0)
                        {
                            confirm(toolbarItem.confirmationMessage).then(() =>
                            {
                                this.toolbarCustomLogic(toolbarItem, toolbarClickEvent);
                            });
                        }
                        else
                            this.toolbarCustomLogic(toolbarItem, toolbarClickEvent);
                        //#endregion
                    }
                }, this._divToolbar, null, buttonClass + "_" + this._elementId);
            //#endregion
        }
        else
        {
            //#region SplitButton
            if (toolbarItem.type == GridToolbarItemType.SplitButton)
            {
                let value = (toolbarItem.value != null) ? toolbarItem.value : "splitButton";
                if (toolbarItem.value == null && toolbarItem.text != null)
                    value = toolbarItem.text.replace(/[^a-z0-9\s]/gi, "").replace(/[_\s]/g, "") + "splitButton";

                if (toolbarItem.splitButtonOptions == null) toolbarItem.splitButtonOptions = new SplitButtonOptions();
                if (toolbarItem.splitButtonItems != null) toolbarItem.splitButtonOptions.items = toolbarItem.splitButtonItems;
                if (toolbarItem.splitButtonOptions.separator == null) toolbarItem.splitButtonOptions.separator = false;

                let itemClass = "grid-" + value;
                createSplitButton(
                    {
                        text: text,
                        icon: iconClass,
                        enable: enabled,
                        imageUrl: toolbarItem.imageUrl,
                        items: toolbarItem.splitButtonOptions.items,
                        visible: toolbarItem.visible,
                        separator: toolbarItem.splitButtonOptions.separator,
                        colorSettings: toolbarItem.splitButtonOptions.colorSettings,
                        popupSettings: toolbarItem.splitButtonOptions.popupSettings,
                        tooltip: toolbarItem.splitButtonOptions.tooltip,
                        hoverMode: toolbarItem.splitButtonOptions.hoverMode,
                        modal: toolbarItem.splitButtonOptions.modal,
                        showDefault: toolbarItem.splitButtonOptions.showDefault,
                        cssContainer: toolbarItem.cssContainer + " vertical-align: top;",
                        css: toolbarItem.css,
                        classContainer: "grid-toolbarItemsContainer " + ((toolbarItem.classContainer != null) ? toolbarItem.classContainer : ""),
                        class: "grid-toolbarItems grid-splitButton " + itemClass,
                        onClick: (toolbarItem.onClick == null) ? undefined : (e) =>
                        {
                            //#region Event
                            let toolbarClickEvent = new GridToolbarClickEvent();
                            toolbarClickEvent.sender = e.sender;
                            toolbarClickEvent.type = toolbarItem.type!;
                            //#endregion

                            //#region Confirmation message
                            if (toolbarItem.confirmationMessage != null && toolbarItem.confirmationMessage.length > 0)
                            {
                                confirm(toolbarItem.confirmationMessage).then(() =>
                                {
                                    this.toolbarCustomLogic(toolbarItem, toolbarClickEvent);
                                });
                            }
                            else
                                this.toolbarCustomLogic(toolbarItem, toolbarClickEvent);
                            //#endregion
                        }
                    }, this._divToolbar, null, itemClass + "_" + this._elementId);
            }
            //#endregion

            //#region ButtonGroup
            if (toolbarItem.type == GridToolbarItemType.ButtonGroup)
            {
                let itemClass = "grid-" + ((toolbarItem.value != null) ? toolbarItem.value : "buttonGroup");
                createButtonGroup(
                    {
                        enable: enabled,
                        selectionMode: SelectionModeEnum.Single,
                        items: toolbarItem.buttonGroupItems!,
                        visible: toolbarItem.visible,
                        cssContainer: "top: -1px; " + toolbarItem.cssContainer,
                        css: toolbarItem.css,
                        classContainer: "grid-toolbarItemsContainer " + toolbarItem.classContainer,
                        class: "grid-toolbarItems grid-buttonGroup " + itemClass,
                        width: "auto",
                        onSelect: (e) => 
                        {
                            //#region Event
                            let toolbarClickEvent = new GridToolbarClickEvent();
                            toolbarClickEvent.sender = e.sender;
                            toolbarClickEvent.type = toolbarItem.type!;
                            //#endregion

                            //#region Confirmation message
                            if (toolbarItem.confirmationMessage != null && toolbarItem.confirmationMessage.length > 0)
                            {
                                confirm(toolbarItem.confirmationMessage).then(() =>
                                {
                                    this.toolbarCustomLogic(toolbarItem, toolbarClickEvent);
                                });
                            }
                            else
                                this.toolbarCustomLogic(toolbarItem, toolbarClickEvent);
                            //#endregion
                        }
                    }, this._divToolbar, null, itemClass + "_" + this._elementId);
            }
            //#endregion

            //#region CheckBox
            if (toolbarItem.type == GridToolbarItemType.CheckBox)
            {
                let itemClass = "grid-" + ((toolbarItem.value != null) ? toolbarItem.value : "checkbox");
                createCheckBox(
                    {
                        enable: enabled,
                        text: toolbarItem.text,
                        visible: toolbarItem.visible,
                        cssContainer: "top: 3px; " + toolbarItem.cssContainer,
                        css: toolbarItem.css,
                        classContainer: "grid-toolbarItemsContainer " + toolbarItem.classContainer,
                        class: "grid-toolbarItems grid-checkBox " + itemClass,
                        onCheck: (e) => 
                        {
                            //#region Event
                            let toolbarClickEvent = new GridToolbarClickEvent();
                            toolbarClickEvent.sender = e.sender;
                            toolbarClickEvent.type = toolbarItem.type!;
                            //#endregion

                            //#region Confirmation message
                            if (toolbarItem.confirmationMessage != null && toolbarItem.confirmationMessage.length > 0)
                            {
                                confirm(toolbarItem.confirmationMessage).then(() =>
                                {
                                    this.toolbarCustomLogic(toolbarItem, toolbarClickEvent);
                                });
                            }
                            else
                                this.toolbarCustomLogic(toolbarItem, toolbarClickEvent);
                            //#endregion
                        }
                    }, this._divToolbar, null, itemClass + "_" + this._elementId);
            }
            //#endregion

            //#region Label
            if (toolbarItem.type == GridToolbarItemType.Label)
            {
                let itemClass = "grid-" + ((toolbarItem.value != null) ? toolbarItem.value : "label");
                createLabel(
                    {
                        enable: enabled,
                        text: toolbarItem.text,
                        visible: toolbarItem.visible,
                        cssContainer: toolbarItem.cssContainer,
                        css: toolbarItem.css,
                        classContainer: "grid-toolbarItemsContainer " + toolbarItem.classContainer,
                        class: "grid-toolbarItems grid-label " + itemClass,
                        colorSettings:
                        {
                            background: toolbarItem.backgroundColor,
                            textColor: toolbarItem.textColor
                        },
                        onClick: (e) => 
                        {
                            //#region Event
                            let toolbarClickEvent = new GridToolbarClickEvent();
                            toolbarClickEvent.sender = e.sender;
                            toolbarClickEvent.type = toolbarItem.type!;
                            //#endregion

                            //#region Confirmation message
                            if (toolbarItem.confirmationMessage != null && toolbarItem.confirmationMessage.length > 0)
                            {
                                confirm(toolbarItem.confirmationMessage).then(() =>
                                {
                                    this.toolbarCustomLogic(toolbarItem, toolbarClickEvent);
                                });
                            }
                            else
                                this.toolbarCustomLogic(toolbarItem, toolbarClickEvent);
                            //#endregion
                        }
                    }, this._divToolbar, null, itemClass + "_" + this._elementId);
            }
            //#endregion

            //#region ComboBox
            if (toolbarItem.type == GridToolbarItemType.ComboBox)
            {
                let itemClass = "grid-" + ((toolbarItem.value != null) ? toolbarItem.value : "comboBox");

                if (toolbarItem.comboBoxOptions == null) toolbarItem.comboBoxOptions = new ComboBoxOptions();
                toolbarItem.comboBoxOptions.classContainer = "grid-toolbarItemsContainer " + toolbarItem.comboBoxOptions.classContainer;
                toolbarItem.comboBoxOptions.class = "grid-toolbarItems grid-comboBox " + itemClass + " " + toolbarItem.comboBoxOptions.class;
                if (toolbarItem.comboBoxOptions.visible == null) toolbarItem.comboBoxOptions.visible = toolbarItem.visible;
                if (toolbarItem.comboBoxOptions.css == null) toolbarItem.comboBoxOptions.css = toolbarItem.css;
                if (toolbarItem.comboBoxOptions.cssContainer == null) toolbarItem.comboBoxOptions.cssContainer = toolbarItem.cssContainer + ";";
                toolbarItem.comboBoxOptions.cssContainer += "vertical-align: top;";
                if (toolbarItem.comboBoxOptions.enable == null) toolbarItem.comboBoxOptions.enable = enabled;

                createComboBox(toolbarItem.comboBoxOptions, this._divToolbar, null, itemClass + "_" + this._elementId);
            }
            //#endregion

            //#region DatePicker
            if (toolbarItem.type == GridToolbarItemType.DatePicker)
            {
                let itemClass = "grid-" + ((toolbarItem.value != null) ? toolbarItem.value : "datePicker");

                if (toolbarItem.datePickerOptions == null) toolbarItem.datePickerOptions = new DatePickerOptions();
                toolbarItem.datePickerOptions.classContainer = "grid-toolbarItemsContainer " + toolbarItem.datePickerOptions.classContainer;
                toolbarItem.datePickerOptions.class = "grid-toolbarItems grid-datePicker " + itemClass + " " + toolbarItem.datePickerOptions.class;
                if (toolbarItem.datePickerOptions.visible == null) toolbarItem.datePickerOptions.visible = toolbarItem.visible;
                if (toolbarItem.datePickerOptions.css == null) toolbarItem.datePickerOptions.css = toolbarItem.css;
                if (toolbarItem.datePickerOptions.cssContainer == null) toolbarItem.datePickerOptions.cssContainer = toolbarItem.cssContainer;
                toolbarItem.datePickerOptions.cssContainer += "top: -1px; " + toolbarItem.datePickerOptions.cssContainer;
                if (toolbarItem.datePickerOptions.enable == null) toolbarItem.datePickerOptions.enable = enabled;

                createDatePicker(toolbarItem.datePickerOptions, this._divToolbar, null, itemClass + "_" + this._elementId);
            }
            //#endregion

            //#region TextBox
            if (toolbarItem.type == GridToolbarItemType.TextBox)
            {
                let itemClass = "grid-" + ((toolbarItem.value != null) ? toolbarItem.value : "textBox");

                if (toolbarItem.textBoxOptions == null) toolbarItem.textBoxOptions = new TextBoxOptions();
                toolbarItem.textBoxOptions.classContainer = "grid-toolbarItemsContainer " + toolbarItem.textBoxOptions.classContainer;
                toolbarItem.textBoxOptions.class = "grid-toolbarItems grid-textBox " + itemClass + " " + toolbarItem.textBoxOptions.class;
                if (toolbarItem.textBoxOptions.visible == null) toolbarItem.textBoxOptions.visible = toolbarItem.visible;
                if (toolbarItem.textBoxOptions.css == null) toolbarItem.textBoxOptions.css = toolbarItem.css;
                if (toolbarItem.textBoxOptions.cssContainer == null) toolbarItem.textBoxOptions.cssContainer = toolbarItem.cssContainer;
                toolbarItem.textBoxOptions.cssContainer += "top: -1px; " + toolbarItem.textBoxOptions.cssContainer;
                if (toolbarItem.textBoxOptions.enable == null) toolbarItem.textBoxOptions.enable = enabled;

                createTextBox(toolbarItem.textBoxOptions, this._divToolbar, null, itemClass + "_" + this._elementId);
            }
            //#endregion

            //#region Switch
            else if (toolbarItem.type == GridToolbarItemType.Switch)
            {
                if (toolbarItem.switchSettings == null)
                {
                    toolbarItem.switchSettings = new GridToolbarSwitchSettings();
                    toolbarItem.switchSettings.labelOff = "";
                    toolbarItem.switchSettings.labelOn = "";
                }

                if (toolbarItem.switchSettings.checked == null) toolbarItem.switchSettings.checked = false;
                let itemClass = "grid-" + ((toolbarItem.value != null) ? toolbarItem.value : "switch");
                puma(this._divToolbar).vrAppendPuma("<div id='" + itemClass + "_" + this._elementId + "' class='grid-toolbarItems-switch'></div>");
                createSwitch(
                    {
                        labelOff: toolbarItem.switchSettings!.labelOff,
                        labelOn: toolbarItem.switchSettings!.labelOn,
                        checked: toolbarItem.switchSettings.checked,
                        cssContainer: "top: -2px; " + toolbarItem.cssContainer,
                        css: toolbarItem.css,
                        classContainer: "grid-toolbarItemsContainer " + toolbarItem.classContainer,
                        visible: toolbarItem.visible,
                        enable: enabled,
                        onChange: (e) =>
                        {
                            if (toolbarItem.switchSettings!.onCheck != null)
                            {
                                let tableSwitchEvent = new GridToolbarSwitchEvent();
                                tableSwitchEvent.checked = e.checked;
                                toolbarItem.switchSettings!.onCheck(tableSwitchEvent);
                            }
                        }
                    }, null, null, itemClass + "_" + this._elementId);
            }
            //#endregion
        }
    }
    //#endregion

    //#endregion

    //#region Auto Window
    private createAutoWindow()
    {
        if (this._wndAutoWindow != null)
            return;

        let options = this.getOptions();

        //#region Default options
        if (options.autoWindowSettings == null)
            options.autoWindowSettings = new GridAutoWindowSettings();

        if (options.autoWindowSettings.options == null)
            options.autoWindowSettings.options = new GridAutoWindowOption();

        if (options.autoWindowSettings.options.width == null) options.autoWindowSettings.options.width = 400;
        if (options.autoWindowSettings.options.titleNew == null) options.autoWindowSettings.options.titleNew = "Nuovo";
        if (options.autoWindowSettings.options.titleEdit == null) options.autoWindowSettings.options.titleEdit = "Modifica";
        //#endregion

        //#region Create window
        this._wndAutoWindow = createWindow(
            {
                addToControlList: false,
                classContainer: this.element().id + "_wndUtility",
                width: options.autoWindowSettings.options.width,
                height: options.autoWindowSettings.options.height,
                title: options.autoWindowSettings.options.titleNew,
                onBeforeClose: (e) =>
                {
                    //#region OnBeforeClose event
                    if (options.autoWindowSettings!.onBeforeClose != null)
                    {
                        let event = new AutowindowBeforeCloseEvent();
                        event.sender = this;
                        event.window = this._wndAutoWindow;
                        event.dataItem = this._actualEditedItem;
                        event.columns = options.columns;
                        options.autoWindowSettings!.onBeforeClose(event);

                        if (event.isDefaultPrevented())
                            return;
                    }
                    //#endregion
                },
                onClose: (e) =>
                {
                    puma(this._wndAutoWindow.container()).remove();
                    (this._wndAutoWindow as any) = null;

                    //#region OnAfterClose event
                    if (options.autoWindowSettings!.onAfterClose != null)
                    {
                        let event = new AutowindowAfterCloseEvent();
                        event.sender = this;
                        event.window = this._wndAutoWindow;
                        event.dataItem = this._actualEditedItem;
                        event.columns = options.columns;
                        options.autoWindowSettings!.onAfterClose(event);

                        if (event.isDefaultPrevented())
                            return;
                    }
                    //#endregion

                    this._actualEditedItem = null;
                },
                footer:
                    [
                        {
                            type: WindowFooterItemTypeEnum.Close
                        },
                        {
                            type: WindowFooterItemTypeEnum.Ok, onClick: (e) =>
                            {
                                //#region Confirmation message
                                if (options.autoWindowSettings!.options!.confirmationMessage != null
                                    && options.autoWindowSettings!.options!.confirmationMessage.length > 0)
                                {
                                    confirm(options.autoWindowSettings!.options!.confirmationMessage).then(() =>
                                    {
                                        this.saveAutoWindow();
                                    });
                                }
                                else
                                    this.saveAutoWindow();
                                //#endregion								
                            }
                        }
                    ]
            });
        puma(this._wndAutoWindow.element()).addClass("grid_autoWindow");
        //#endregion

        this.createControlsAutoWindow(options);
    }

    private createControlsAutoWindow(options: GridOptions)
    {
        let columnsOrdered = [];
        let autoWindowId = this._wndAutoWindow.element().id;

        //#region Checkboxes after all
        for (let column of options.columns!.slice(1).reverse())
        {
            if (column.hidden)
                continue;

            if (column.type == GridColumnTypeEnum.Checkbox || column.type == GridColumnTypeEnum.Boolean)
                columnsOrdered.unshift(column);
            else
                columnsOrdered.push(column);
        }
        //#endregion

        for (let column of columnsOrdered.reverse())
        {
            let label = (column.title == null) ? column.field : column.title;
            let tooltip = (column.cellSettings != null && column.cellSettings.tooltip != null) ? column.cellSettings.tooltip : undefined;
            if (tooltip === true)
                tooltip = label;
            else if (tooltip === false)
                tooltip = undefined;
            else if (typeof (tooltip) == "function")
                tooltip = undefined;

            //#region Type
            switch (column.type)
            {
                //#region CheckBox
                case GridColumnTypeEnum.Checkbox:
                case GridColumnTypeEnum.Boolean:
                    {
                        let checkBox = createCheckBox(
                            {
                                label: label,
                                tooltip: tooltip
                            }, autoWindowId, null, this._elementId + "_checkBox_" + column.field);

                        puma(checkBox.element()).parent().css("margin-top", "10px");
                        puma(checkBox.element()).parent().css("display", "inline-block");
                        puma(checkBox.element()).parent().css("margin-right", "5px");
                    }
                    break;
                //#endregion

                //#region String
                case GridColumnTypeEnum.String:
                    {
                        let textBox = createTextBox(
                            {
                                label: label,
                                width: "100%",
                                tooltip: tooltip
                            }, autoWindowId, null, this._elementId + "_textBox_" + column.field);
                    }
                    break;
                //#endregion

                //#region Password
                case GridColumnTypeEnum.PasswordViewable:
                    {
                        let txtPasswordViewable = createTextBox({
                            label: label,
                            width: "100%",
                            mode: TextModeEnum.PasswordViewable,
                            tooltip: tooltip
                        }, autoWindowId, null, this._elementId + "_textBox_" + column.field);
                    }
                    break;
                //#endregion

                //#region Date, DateTime, Time
                case GridColumnTypeEnum.Date:
                case GridColumnTypeEnum.LongDate:
                case GridColumnTypeEnum.LongWeekDate:
                case GridColumnTypeEnum.ShortWeekDate:
                    {
                        let datePicker = createDatePicker(
                            {
                                label: label,
                                width: "100%",
                                tooltip: tooltip
                            }, autoWindowId, null, this._elementId + "_datePicker_" + column.field);
                    }
                    break;
                case GridColumnTypeEnum.DateTime:
                case GridColumnTypeEnum.LongDateTime:
                    {
                        let dateTimePicker = createDatePicker(
                            {
                                mode: DateModeEnum.DateTime,
                                label: label,
                                width: "100%",
                                tooltip: tooltip
                            }, autoWindowId, null, this._elementId + "_dateTimePicker_" + column.field);
                    }
                    break;
                case GridColumnTypeEnum.Time:
                    {
                        let timePicker = createDatePicker(
                            {
                                mode: DateModeEnum.Time,
                                label: label,
                                width: "100%",
                                tooltip: tooltip
                            }, autoWindowId, null, this._elementId + "_timePicker_" + column.field);
                    }
                    break;
                //#endregion

                //#region ComboBox, DropDownList, DropDownTree
                case GridColumnTypeEnum.DropDownList:
                    {
                        if (column.dataItems == null)
                            throw new Error("Property 'dataItems' of column '" + column.field + "' is null; please, consider to fill it with an array of dropDownListItem[]");

                        let dropDownList = createComboBox(
                            {
                                mode: ComboBoxTypeEnum.DropDown,
                                label: label,
                                width: "100%",
                                items: column.dataItems,
                                nullable: column.ddlNullable,
                                clearButton: column.ddlNullable,
                                tooltip: tooltip,
                                filter: column.filterable
                            }, autoWindowId, null, this._elementId + "_dropDownList_" + column.field);
                    }
                    break;
                case GridColumnTypeEnum.DropDownTree:
                case GridColumnTypeEnum.DropDownTreeCheckboxes:
                    {
                        if (column.dataItems == null)
                            throw new Error("Property 'dataItems' of column '" + column.field + "' is null; please, consider to fill it with an array of dropDownTreeItem[]");

                        for (let item of column.dataItems!)
                        {
                            if (item.expanded == null)
                                item.expanded = true;
                        }

                        let dropDownTree = createComboBox(
                            {
                                label: label,
                                width: "100%",
                                items: column.dataItems,
                                checkboxes: (column.type == GridColumnTypeEnum.DropDownTreeCheckboxes),
                                clearButton: column.ddlNullable,
                                tooltip: tooltip,
                                filter: column.filterable
                            }, autoWindowId, null, this._elementId + "_dropDownTree_" + column.field);
                    }
                    break;
                case GridColumnTypeEnum.ComboBox:
                    {
                        if (column.dataItems == null)
                            throw new Error("Property 'dataItems' of column '" + column.field + "' is null; please, consider to fill it with an array of comboBoxItem[]");

                        let comboBox = createComboBox(
                            {
                                label: label,
                                width: "100%",
                                items: column.dataItems,
                                tooltip: tooltip,
                                clearButton: column.ddlNullable,
                                filter: column.filterable
                            }, autoWindowId, null, this._elementId + "_comboBox_" + column.field);
                    }
                    break;
                //#endregion

                //#region Number, Currency, Percentage, Duration
                case GridColumnTypeEnum.Number:
                case GridColumnTypeEnum.Currency:
                case GridColumnTypeEnum.Percentage:
                case GridColumnTypeEnum.Duration:
                    {
                        let type = TextModeEnum.Numeric;
                        if (column.type == GridColumnTypeEnum.Currency) type = TextModeEnum.Currency;
                        else if (column.type == GridColumnTypeEnum.Percentage) type = TextModeEnum.Percentage;

                        let numericTextBox = createTextBox(
                            {
                                label: label,
                                width: "100%",
                                mode: type,
                                tooltip: tooltip,
                                roundingSettings: (column.roundingSettings != null) ? column.roundingSettings : options.roundingSettings
                            }, autoWindowId, null, this._elementId + "_numericTextBox_" + column.field);
                    }
                    break;
                //#endregion

                //#region Color
                case GridColumnTypeEnum.Color:
                    {
                        let colorPicker = createColorPicker({
                            label: label,
                            width: "100%",
                            cssContainer: "align-items: flex-start;",
                            addToControlList: true
                        }, autoWindowId, null, this._elementId + "_colorPicker_" + column.field);
                    }
                    break;
                //#endregion

                //#region Color
                case GridColumnTypeEnum.Icon:
                    {
                        let iconItems: ComboBoxItem[] = [];
                        for (let value of Object.values(IconClassicLight))
                            iconItems.push({ text: value, value: value });

                        let comboIcons = createComboBox({
                            label: label,
                            width: "100%",
                            cssContainer: "margin-right: 5px;",
                            items: iconItems,
                            tooltip: tooltip,
                            clearButton: true,
                            placeholder: "Scrivi per cercare un'icona...",
                            template: (e) => { return "<i class='" + e.dataItem.value + "'></i>" },
                            onAfterOpen: (e) => comboIcons.text(""),
                            onAfterChange: (e) => 
                            {
                                comboIcons.text("");
                                if (e.value == null) comboIcons.icon(IconClassicLight.Pumo)
                                else comboIcons.icon(e.value);
                            },
                            icon: IconClassicLight.Pumo
                        }, autoWindowId, null, this._elementId + "_comboIcons_" + column.field);
                    }
                    break;
                //#endregion
            }
            //#endregion
        }
    }

    openAutoWindow(dataItem?: any)
    {
        let options = this.getOptions();
        if (options.autoWindowSettings != null || !options.hideEditButton)
            this.createAutoWindow();

        if (this._wndAutoWindow == null)
            return;

        //#region OnBeforeOpen event
        if (options.autoWindowSettings!.onBeforeOpen != null)
        {
            let event = new AutowindowBeforeOpenEvent();
            event.sender = this;
            event.window = this._wndAutoWindow;
            event.dataItem = dataItem;
            event.columns = options.columns;
            options.autoWindowSettings!.onBeforeOpen(event);

            if (event.isDefaultPrevented())
                return;
        }
        //#endregion

        //#region Main options
        let title = (dataItem != null) ? options.autoWindowSettings!.options!.titleEdit : options.autoWindowSettings!.options!.titleNew;
        this._wndAutoWindow.title(title);
        this._wndAutoWindow.open();

        if (options.autoWindowSettings!.options!.height == null)
        {
            puma(this._wndAutoWindow.element()).css("height", "auto");
            puma(this._wndAutoWindow.element()).parent().css("height", "auto");
            this._wndAutoWindow.center();
            puma(this._wndAutoWindow.element()).css("overflow-y", "auto");
        }
        //#endregion

        //#region OnAfterOpen event
        if (options.autoWindowSettings!.onAfterOpen != null)
        {
            let event = new AutowindowAfterOpenEvent();
            event.sender = this;
            event.window = this._wndAutoWindow;
            event.dataItem = dataItem;
            event.columns = options.columns;
            options.autoWindowSettings!.onAfterOpen(event);

            if (event.isDefaultPrevented())
                return;
        }
        //#endregion

        let index = 0;
        this._actualEditedItem = dataItem;
        for (let column of options.columns!.slice(1))
        {
            if (column.hidden && !column.editable)
                continue;

            let columnValue = (dataItem != null) ? dataItem[column.field] : null;

            //#region Type
            switch (column.type)
            {
                //#region CheckBox
                case GridColumnTypeEnum.Checkbox:
                case GridColumnTypeEnum.Boolean:
                    {
                        let checkBox = ControlManager.get<CheckBox>(this._elementId + "_checkBox_" + column.field);
                        checkBox.clear();

                        if (columnValue != null)
                            checkBox.checked(columnValue);
                        else if (column.defaultValue != null)
                            checkBox.checked(column.defaultValue);
                        else if (column.field == "Active" || column.field == "IsActive")
                            checkBox.checked(true);

                        if (index == 0)
                            checkBox.focus();

                        if (column.editable == false)
                            checkBox.enabled(false);
                        else
                            checkBox.enabled(true);
                    }
                    break;
                //#endregion

                //#region String
                case GridColumnTypeEnum.String:
                    {
                        let textBox = ControlManager.get<TextBox>(this._elementId + "_textBox_" + column.field);
                        textBox.clear();

                        if (columnValue != null)
                            textBox.value(columnValue);
                        else if (column.defaultValue != null)
                            textBox.value(column.defaultValue);

                        if (index == 0)
                            textBox.focus();

                        if (column.editable == false)
                            textBox.enabled(false);
                        else
                            textBox.enabled(true);
                    }
                    break;
                //#endregion

                //#region Password
                case GridColumnTypeEnum.PasswordViewable:
                    {
                        let textBox = ControlManager.get<TextBox>(this._elementId + "_textBox_" + column.field);
                        textBox.clear();

                        if (columnValue != null)
                            textBox.value(columnValue);
                        else if (column.defaultValue != null)
                            textBox.value(column.defaultValue);

                        if (index == 0)
                            textBox.focus();

                        if (column.editable == false)
                            textBox.enabled(false);
                        else
                            textBox.enabled(true);
                    }
                    break;
                //#endregion

                //#region Date, DateTime, Time
                case GridColumnTypeEnum.Date:
                case GridColumnTypeEnum.LongDate:
                case GridColumnTypeEnum.LongWeekDate:
                case GridColumnTypeEnum.ShortWeekDate:
                    {
                        let datePicker = ControlManager.get<DatePicker>(this._elementId + "_datePicker_" + column.field);
                        datePicker.clear();

                        if (columnValue != null)
                            datePicker.value(new Date(columnValue));
                        else if (column.defaultValue != null)
                            datePicker.value(new Date(column.defaultValue));

                        if (index == 0)
                            datePicker.focus();

                        if (column.editable == false)
                            datePicker.enabled(false);
                        else
                            datePicker.enabled(true);
                    }
                    break;
                case GridColumnTypeEnum.DateTime:
                case GridColumnTypeEnum.LongDateTime:
                    {
                        let dateTimePicker = ControlManager.get<DatePicker>(this._elementId + "_dateTimePicker_" + column.field);
                        dateTimePicker.clear();

                        if (columnValue != null)
                            dateTimePicker.value(new Date(columnValue));
                        else if (column.defaultValue != null)
                            dateTimePicker.value(new Date(column.defaultValue));

                        if (index == 0)
                            dateTimePicker.focus();

                        if (column.editable == false)
                            dateTimePicker.enabled(false);
                        else
                            dateTimePicker.enabled(true);
                    }
                    break;
                case GridColumnTypeEnum.Time:
                    {
                        let timePicker = ControlManager.get<DatePicker>(this._elementId + "_timePicker_" + column.field);
                        timePicker.clear();

                        if (columnValue != null)
                            timePicker.value(columnValue);
                        else if (column.defaultValue != null)
                            timePicker.value(new Date(column.defaultValue));

                        if (index == 0)
                            timePicker.focus();

                        if (column.editable == false)
                            timePicker.enabled(false);
                        else
                            timePicker.enabled(true);
                    }
                    break;
                //#endregion

                //#region ComboBox, DropDownList, DropDownTree
                case GridColumnTypeEnum.DropDownList:
                    {
                        let dropDownList = ControlManager.get<ComboBox>(this._elementId + "_dropDownList_" + column.field);
                        dropDownList.clearItems();
                        dropDownList.items(column.dataItems);

                        if (columnValue != null)
                            dropDownList.value(columnValue);
                        else if (column.defaultValue != null)
                            dropDownList.value(column.defaultValue);

                        if (column.editable == false)
                            dropDownList.enabled(false);
                        else
                            dropDownList.enabled(true);
                    }
                    break;
                case GridColumnTypeEnum.DropDownTree:
                case GridColumnTypeEnum.DropDownTreeCheckboxes:
                    {
                        let dropDownTree = ControlManager.get<ComboBox>(this._elementId + "_dropDownTree_" + column.field);
                        dropDownTree.clearItems();
                        dropDownTree.items(column.dataItems);

                        if (columnValue != null)
                        {
                            let value = this._actualEditedItem[column.field];
                            if (typeof (value) === "string")
                                value = value.split(",");
                            else if (!Array.isArray(value))
                                value = [value];

                            dropDownTree.value(value);
                        }
                        else if (column.defaultValue != null)
                        {
                            let value = column.defaultValue;
                            if (typeof (value) === "string")
                                value = value.split(",");
                            else if (!Array.isArray(value))
                                value = [value];

                            dropDownTree.value((typeof (value) === "string") ? value.split(",") : [value]);
                        }

                        if (column.editable == false)
                            dropDownTree.enabled(false);
                        else
                            dropDownTree.enabled(true);
                    }
                    break;
                case GridColumnTypeEnum.ComboBox:
                    {
                        let comboBox = ControlManager.get<ComboBox>(this._elementId + "_comboBox_" + column.field);
                        comboBox.clearItems();
                        comboBox.items(column.dataItems);

                        if (columnValue != null)
                            comboBox.value(columnValue);
                        else if (column.defaultValue != null)
                            comboBox.value(column.defaultValue);

                        if (column.editable == false)
                            comboBox.enabled(false);
                        else
                            comboBox.enabled(true);
                    }
                    break;
                //#endregion

                //#region Number, Currency, Percentage, Duration
                case GridColumnTypeEnum.Number:
                case GridColumnTypeEnum.Currency:
                case GridColumnTypeEnum.Percentage:
                case GridColumnTypeEnum.Duration:
                    {
                        let numericTextBox = ControlManager.get<TextBox>(this._elementId + "_numericTextBox_" + column.field);

                        numericTextBox.clear();
                        if (columnValue != null)
                            numericTextBox.value(columnValue);
                        else if (column.defaultValue != null)
                            numericTextBox.value(column.defaultValue);

                        if (index == 0)
                            numericTextBox.focus();

                        if (column.editable == false)
                            numericTextBox.enabled(false);
                        else
                            numericTextBox.enabled(true);
                    }
                    break;
                //#endregion

                //#region Color
                case GridColumnTypeEnum.Color:
                    {
                        let colorPicker = ControlManager.get<ColorPicker>(this._elementId + "_colorPicker_" + column.field);
                        colorPicker.clear();

                        if (columnValue != null)
                            colorPicker.value(columnValue);
                        else if (column.defaultValue != null)
                            colorPicker.value(column.defaultValue);

                        if (column.editable == false)
                            colorPicker.enabled(false);
                        else
                            colorPicker.enabled(true);
                    }
                    break;
                //#endregion

                //#region Icon
                case GridColumnTypeEnum.Icon:
                    {
                        let comboIcons = ControlManager.get<ComboBox>(this._elementId + "_comboIcons_" + column.field);
                        comboIcons.clear();

                        if (columnValue != null)
                            comboIcons.value(columnValue);
                        else if (column.defaultValue != null)
                            comboIcons.value(column.defaultValue);

                        comboIcons.icon(comboIcons.value<string>());

                        if (column.editable == false || column.editable == null)
                        {
                            comboIcons.enabled(false);
                            comboIcons.hide();
                        }
                        else
                            comboIcons.enabled(true);
                    }
                    break;
                //#endregion
            }
            //#endregion

            index++;
        }
    }

    private saveAutoWindow()
    {
        let options = this.getOptions();

        //#region Get edited item
        if (this._actualEditedItem == null)
            this._actualEditedItem = {};

        let oldItem = jQuery.extend(true, {}, this._actualEditedItem);
        for (let column of options.columns!.slice(1))
        {
            if (column.hidden)
                continue;

            //#region Type
            switch (column.type)
            {
                //#region CheckBox
                case GridColumnTypeEnum.Checkbox:
                case GridColumnTypeEnum.Boolean:
                    {
                        let checkBox = ControlManager.get<CheckBox>(this._elementId + "_checkBox_" + column.field);
                        this._actualEditedItem[column.field] = checkBox.checked();
                    }
                    break;
                //#endregion

                //#region String
                case GridColumnTypeEnum.String:
                    {
                        let textBox = ControlManager.get<TextBox>(this._elementId + "_textBox_" + column.field);
                        this._actualEditedItem[column.field] = textBox.value();
                    }
                    break;
                //#endregion

                //#region Password
                case GridColumnTypeEnum.PasswordViewable:
                    {
                        let txtPassword = ControlManager.get<TextBox>(this._elementId + "_textBox_" + column.field);
                        this._actualEditedItem[column.field] = txtPassword.value();
                    }
                    break;
                //#endregion

                //#region Date, DateTime, Time
                case GridColumnTypeEnum.Date:
                case GridColumnTypeEnum.LongDate:
                case GridColumnTypeEnum.LongWeekDate:
                case GridColumnTypeEnum.ShortWeekDate:
                    {
                        let datePicker = ControlManager.get<DatePicker>(this._elementId + "_datePicker_" + column.field);
                        this._actualEditedItem[column.field] = datePicker.value();
                    }
                    break;
                case GridColumnTypeEnum.DateTime:
                case GridColumnTypeEnum.LongDateTime:
                    {
                        let dateTimePicker = ControlManager.get<DatePicker>(this._elementId + "_dateTimePicker_" + column.field);
                        this._actualEditedItem[column.field] = dateTimePicker.value();
                    }
                    break;
                case GridColumnTypeEnum.Time:
                    {
                        let timePicker = ControlManager.get<DatePicker>(this._elementId + "_timePicker_" + column.field);
                        this._actualEditedItem[column.field] = timePicker.value();
                    }
                    break;
                //#endregion

                //#region ComboBox, DropDownList, DropDownTree
                case GridColumnTypeEnum.DropDownList:
                    {
                        let dropDownList = ControlManager.get<ComboBox>(this._elementId + "_dropDownList_" + column.field);
                        this._actualEditedItem[column.field] = dropDownList.value();
                        this._actualEditedItem[column.displayField!] = dropDownList.text();
                    }
                    break;
                case GridColumnTypeEnum.DropDownTree:
                    {
                        let dropDownTree = ControlManager.get<ComboBox>(this._elementId + "_dropDownTree_" + column.field);
                        this._actualEditedItem[column.field] = dropDownTree.value();
                        this._actualEditedItem[column.displayField!] = dropDownTree.text();
                    }
                    break;
                case GridColumnTypeEnum.DropDownTreeCheckboxes:
                    {
                        let dropDownTree = ControlManager.get<ComboBox>(this._elementId + "_dropDownTree_" + column.field);
                        this._actualEditedItem[column.field] = dropDownTree.getCheckedValues();
                        this._actualEditedItem[column.displayField!] = dropDownTree.getCheckedItems().map(k => k.text).vrToCommaSeparatedList();
                    }
                    break;
                case GridColumnTypeEnum.ComboBox:
                    {
                        let comboBox = ControlManager.get<ComboBox>(this._elementId + "_comboBox_" + column.field);
                        this._actualEditedItem[column.field] = comboBox.value();
                        this._actualEditedItem[column.displayField!] = comboBox.text();
                    }
                    break;
                //#endregion

                //#region Number, Currency, Percentage, Duration
                case GridColumnTypeEnum.Number:
                case GridColumnTypeEnum.Currency:
                case GridColumnTypeEnum.Percentage:
                case GridColumnTypeEnum.Duration:
                    {
                        let numericTextBox = ControlManager.get<TextBox>(this._elementId + "_numericTextBox_" + column.field);
                        this._actualEditedItem[column.field] = numericTextBox.value();
                    }
                    break;
                //#endregion

                //#region Color
                case GridColumnTypeEnum.Color:
                    {
                        let colorPicker = ControlManager.get<ColorPicker>(this._elementId + "_colorPicker_" + column.field);
                        this._actualEditedItem[column.field] = colorPicker.value();
                    }
                    break;
                //#endregion

                //#region Icon
                case GridColumnTypeEnum.Icon:
                    {
                        let comboIcons = ControlManager.get<ComboBox>(this._elementId + "_comboIcons_" + column.field);
                        this._actualEditedItem[column.field] = comboIcons.value();
                        this._actualEditedItem[column.displayField!] = comboIcons.text();
                    }
                    break;
                //#endregion
            }
            //#endregion
        }
        //#endregion

        //#region OnBeforeSave event
        if (options.autoWindowSettings!.onBeforeSave != null)
        {
            let event = new AutowindowBeforeSaveEvent();
            event.sender = this;
            event.window = this._wndAutoWindow;
            event.dataItem = this._actualEditedItem;
            event.columns = options.columns;
            options.autoWindowSettings!.onBeforeSave(event);

            if (event.isDefaultPrevented())
                return;
        }
        //#endregion

        //#region Save request
        let saveRequest = options.autoWindowSettings!.save;
        if (saveRequest != null)
        {
            if (options.mode == GridModeEnum.Sync)
                this.doWebApiCall(saveRequest, GridRequestTypeEnum.Save);
            else
            {
                if (saveRequest.callback != null)
                    saveRequest.callback({ actualItem: this._actualEditedItem, oldItem: oldItem });

                this._wndAutoWindow.close();
            }
        }
        else
        {
            if (options.columns!.vrAny(k => k != null && k.type == GridColumnTypeEnum.Percentage && k.ignoreFactor != true))
            {
                for (let property of Object.getOwnPropertyNames(this._actualEditedItem))
                {
                    let column = options.columns!.find(k => k.field == property);
                    if (column != null && column.type == GridColumnTypeEnum.Percentage && column.ignoreFactor != true)
                        this._actualEditedItem[property] *= 100;
                }
            }

            this.updateRow(this._actualEditedItem);

            //#region OnAfterSave event
            if (options.autoWindowSettings!.onAfterSave != null)
            {
                let event = new AutowindowAfterSaveEvent();
                event.sender = this;
                event.window = this._wndAutoWindow;
                event.dataItem = this._actualEditedItem;
                event.columns = options.columns;
                options.autoWindowSettings!.onAfterSave(event);

                if (event.isDefaultPrevented())
                    return;
            }
            //#endregion

            this._wndAutoWindow.close();

            if (options.onDataSourceChanged != null)
                options.onDataSourceChanged();
        }
        //#endregion        
    }
    //#endregion

    //#region Layout
    private createWindowLayout()
    {
        if (this._wndLayout != null)
            return;

        let options = this.getOptions();
        if (typeof (options.layoutSettings) === "boolean")
            return;

        this._wndLayout = createWindow(
            {
                addToControlList: false,
                width: 500,
                height: 300,
                title: "Gestisci layout",
                classContainer: this.element().id + "_wndUtility",
                onClose: (e) =>
                {
                    puma(this._wndLayout.container()).remove();
                    (this._wndLayout as any) = null;
                },
                footer:
                    [
                        { type: WindowFooterItemTypeEnum.Close },
                        {
                            type: WindowFooterItemTypeEnum.Custom, text: "Layout base", mode: ButtonModeEnum.Primary,
                            align: WindowFooterItemAlignEnum.Left, onClick: (e) =>
                            {
                                this._actualLayout = null;
                                this.changeLayout(true, this._originalOptionsForLayout);
                            }
                        },
                        {
                            type: WindowFooterItemTypeEnum.Custom, text: "Carica", mode: ButtonModeEnum.Primary,
                            onClick: (e) =>
                            {
                                let checkedItems = this._grdLayout.getCheckedItems();
                                if (checkedItems.length == 0)
                                {
                                    notifyWarning("Selezionare almeno un layout");
                                    return;
                                }

                                let checkedItem = checkedItems[0];
                                if (this._actualLayout == null || (this._actualLayout != null && checkedItem.id != this._actualLayout.id))
                                    this.loadLayout(checkedItem.layoutName);
                            }
                        }
                    ]
            });

        puma(this._wndLayout.element()).vrAppendPuma("<div id='" + this._elementId + "_divWindowLayoutContainer' class='vrContainer'></div>");
        let divContainer = puma("#" + this._elementId + "_divWindowLayoutContainer")[0];
        puma("<table id='" + this._elementId + "_tblLayout'></table>").vrAppendToPuma(divContainer);

        //#region Grid layout
        this._grdLayout = createGrid(
            {
                addToControlList: false,
                footer: false,
                pageSize: 500,
                filterable: false,
                checkboxes: GridCheckboxModeEnum.SingleCheck,
                height: 144,
                groupBy: null,
                groupable: false,
                rebind:
                {//**********************TODO//**********************
                    authKey: "10(P9m+U3a@Mtt-Oeo", method: "/api/GridLayoutPersisterWebApi/GetLayoutList",
                    itemsPropertyName: "tableLayoutList", parameters: () =>
                    {
                        let options = this.getOptions();
                        if (typeof (options.layoutSettings) === "boolean")
                            return;

                        return { pageName: window.location.href, gridName: options!.layoutSettings!.name }
                    },
                    callback: (response: any) =>
                    {
                        if (this._actualLayout != null)
                            this.selectRowInternal(String(this._actualLayout.id), false, { fromCheckboxInput: false, fromGroupOrRow: true, fromMethodCall: false, shiftKey: false });
                    }
                },
                autoWindowSettings:
                {
                    save:
                    {
                        authKey: "10(P9m+U3a@Mtt-Oeo", method: "/api/GridLayoutPersisterWebApi/EditLayout",
                        rebindGridAfterSave: true
                    }
                },
                toolbar:
                    [
                        {
                            type: GridToolbarItemType.Custom, icon: IconClassicRegular.Xmark, text: "Elimina",
                            confirmationMessage: "Confermi di voler eliminare questo layout?",
                            onClick: (e) =>
                            {
                                let checkedItem = this._grdLayout.getCheckedItems()[0];
                                this._grdLayout.deleteRow(checkedItem.id);

                                let loadOriginalLayout = (this._actualLayout != null && checkedItem.id == this._actualLayout!.id);
                                this.clearLayout(checkedItem.layoutName, loadOriginalLayout);

                                if (this._grdLayout.getAllItems().length == 0)
                                {
                                    //#region Settings
                                    ControlManager.get<SplitButton>(this._elementId + "_spbSettings").hideItem("manageLayout");
                                    window.setTimeout(() => this._wndLayout.close(), 300);
                                    //#endregion
                                }
                            }
                        },
                        {
                            type: GridToolbarItemType.Custom, icon: IconClassicLight.Plus, text: "Crea nuovo",
                            onClick: (e) =>
                            {
                                prompt("Assegna un nome a questo layout", { title: "Nuovo layout" }).then((value) =>
                                {
                                    this.saveLayout(value, () => this._grdLayout.rebind());
                                });
                            }
                        }
                    ],
                columns:
                    [
                        { type: GridColumnTypeEnum.String, title: "Nome", field: "layoutName", fitSpace: true },
                        {
                            type: GridColumnTypeEnum.DateTime, title: "Ultima modifica", field: "layoutLastEditDate",
                            width: 200, editable: false, headerSettings: { textAlign: GridAlignEnum.Center }
                        }
                    ]
            }, null, null, this._elementId + "_tblLayout");
        //#endregion
    }

    private openWindowLayout()
    {
        this.createWindowLayout();
        this._wndLayout.open();
        this._grdLayout.rebind();
    }

    private doWebApiCallLayout<T>(layoutOperationType: GridLayoutOperationTypeEnum, request: any, callBack?: (e: T) => void)
    {
        let url = "";
        switch (layoutOperationType)
        {
            case GridLayoutOperationTypeEnum.Save: url = "/api/GridLayoutPersisterWebApi/SaveLayout"; break;
            case GridLayoutOperationTypeEnum.Load: url = "/api/GridLayoutPersisterWebApi/LoadLayout"; break;
            case GridLayoutOperationTypeEnum.Clear: url = "/api/GridLayoutPersisterWebApi/ClearLayout"; break;
            case GridLayoutOperationTypeEnum.Get: url = "/api/GridLayoutPersisterWebApi/GetLayoutList"; break;
        }

        //#region Call
        request.AuthKey = "10(P9m+U3a@Mtt-Oeo";
        $.ajax({
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(request),
            method: "POST",
            processData: false,
            async: !(layoutOperationType == GridLayoutOperationTypeEnum.Get),
            dataType: "json",
            url: url,
            success: function (response: T, textStatus: string, jqXHR: JQueryXHR)
            {
                if (callBack != null)
                    callBack(response);
            }
        });
        //#endregion
    }

    //#region SaveLayout
    saveLayout(layoutName: string, callBack?: Function)
    {
        let options = this.getOptions();
        if (typeof (options.layoutSettings) === "boolean")
            return;

        if (layoutName == "")
        {
            notify("Inserire un nome del layout");
            return;
        }

        //#region LayoutJson
        let layoutJson = new GridLayoutStructure();
        layoutJson.filterConditions = Array.from(this._dictionaryFilterConditions.entries());

        if (options.groupBy != null)
        {
            if ((options.groupBy as GridGroupBySettings).fields != null)
            {
                layoutJson.groupBy = new GridGroupBySettings();
                layoutJson.groupBy.fields = (options.groupBy as GridGroupBySettings).fields;
                layoutJson.groupBy.internalSortBy = (options.groupBy as GridGroupBySettings).internalSortBy;
                layoutJson.groupBy.sortBy = (options.groupBy as GridGroupBySettings).sortBy;
            }
        }

        layoutJson.pageSize = ((typeof (options.pageSize) == "boolean") || this._pageSizeUnlimited) ? 50 : options.pageSize!;
        layoutJson.sortingInfo = this._actualSortingInfo;

        let index = 0;
        let layoutColumns: GridLayoutColumn[] = [];
        for (let column of options.columns!)
        {
            let layoutColumn = new GridLayoutColumn();
            layoutColumn.field = column.field;
            layoutColumn.fitSpace = column.fitSpace;
            layoutColumn.hidden = column.hidden;
            layoutColumn.locked = column.locked;
            layoutColumn.index = index;

            let width = (column.width != null) ? (column.width) : ((column.type == GridColumnTypeEnum.EditButton) ? 32 : 100);
            layoutColumn.width = width;

            layoutColumns.push(layoutColumn);
            index++;
        }
        layoutJson.columns = layoutColumns;
        //#endregion

        //#region Call
        let saveLayoutRequest = new SaveLayoutRequest();
        saveLayoutRequest.layoutJson = JSON.stringify(layoutJson);
        saveLayoutRequest.pageName = window.location.href;
        saveLayoutRequest.gridName = options.layoutSettings!.name;
        saveLayoutRequest.layoutName = layoutName;

        this.doWebApiCallLayout(GridLayoutOperationTypeEnum.Save, saveLayoutRequest, (response: any) =>
        {
            //#region Settings
            if (this._actualLayout == null)
            {
                ControlManager.get<SplitButton>(this._elementId + "_spbSettings").showItem("manageLayout");
                let topSettingsBtnPosition = 0;
                if (options.groupable) topSettingsBtnPosition = -127;
                else topSettingsBtnPosition = -95;

                puma(`<style>.vrContainer .grid_spbSettings .k-animation-container
					{
						top: ` + topSettingsBtnPosition + `px !important;
					}</style>`).vrAppendToPuma("head");
            }
            //#endregion
            //**********************TODO//**********************
            if (saveLayoutRequest.layoutPropertyName == null)
                saveLayoutRequest.layoutPropertyName = "tableLayout";

            this._actualLayout = response[saveLayoutRequest.layoutPropertyName];
            notify("Layout salvato correttamente");

            if (callBack != null)
                callBack();
        });
        //#endregion
    }
    //#endregion

    //#region ClearLayout
    private clearLayout(layoutName: string, updateDataSource = false)
    {
        let options = this.getOptions();
        if (typeof (options.layoutSettings) === "boolean")
            return;

        //#region Call
        let clearLayoutRequest = new ClearLayoutRequest();
        clearLayoutRequest.pageName = window.location.href;
        clearLayoutRequest.gridName = options.layoutSettings!.name!;
        clearLayoutRequest.layoutName = layoutName;

        this.doWebApiCallLayout<ClearLayoutResponse>(GridLayoutOperationTypeEnum.Clear, clearLayoutRequest, (response) =>
        {
            if (updateDataSource)
            {
                this._actualLayout = null;
                this.changeLayout(true, this._originalOptionsForLayout);
            }
        });
        //#endregion
    }
    //#endregion

    //#region LoadLayout
    customLayouts()
    {
        return this._customLayouts;
    }

    activeLayout()
    {
        return this._actualLayout;
    }

    private loadLayout(layoutName: string)
    {
        let options = this.getOptions();
        if (typeof (options.layoutSettings) === "boolean")
            return;

        //#region Call
        let loadLayoutRequest = new LoadLayoutRequest();
        loadLayoutRequest.pageName = window.location.href;
        loadLayoutRequest.gridName = options.layoutSettings!.name;
        loadLayoutRequest.layoutName = layoutName;

        this.doWebApiCallLayout<LoadLayoutResponse>(GridLayoutOperationTypeEnum.Load, loadLayoutRequest, (response) =>
        {
            if (response.tableLayout != null && response.tableLayout.layoutJson != null)
            {
                this._actualLayout = response.tableLayout;
                this.changeLayout(true);
                notify("Layout caricato correttamente");
                this._wndLayout.close();
            }
            else
                notify("Errore nel caricamento del layout");
        });
        //#endregion
    }

    private changeLayout(updateDataSource = false, layoutJson?: GridLayoutStructure)
    {
        if (this._actualLayout != null || layoutJson != null)
        {
            let options = this.getOptions();
            let json = (layoutJson != null) ? layoutJson : JSON.parse(this._actualLayout!.layoutJson) as GridLayoutStructure;

            let editButtonColumnIndex = json.columns.findIndex(k => k.field.toLowerCase() == "editbutton");
            let editButtonColumn = json.columns[editButtonColumnIndex];
            if (editButtonColumn != null)
                editButtonColumn.field = "editButton";

            //#region GroupBy
            if (options.groupable! && options.groupBy != null)
            {
                let oldGroupByList = [];
                if ((options.groupBy as GridGroupBySettings).fields != null)
                {
                    for (let group of ((options.groupBy as GridGroupBySettings).fields as GridGroupByItem[]).map(k => k.field))
                        oldGroupByList.push(group);
                }

                for (let groupRemoved of oldGroupByList)
                    this.removeGroup(groupRemoved, false);
            }

            if (json.groupBy != null)
            {
                let groupByFields: GridGroupByItem[] = [];
                if (Array.isArray(json.groupBy))
                {
                    for (let groupByField of json.groupBy)
                        groupByFields.push({ field: UtilityManager.duplicate(groupByField) });

                    options.groupBy = new GridGroupBySettings();
                    options.groupBy.fields = UtilityManager.duplicate(groupByFields);
                }
                else
                {
                    groupByFields = UtilityManager.duplicate(json.groupBy.fields as GridGroupByItem[]);
                    options.groupBy = UtilityManager.duplicate(json.groupBy);
                }

                if (groupByFields != null)
                    this.addGroups(groupByFields, updateDataSource);
            }
            //#endregion

            //#region PageSize
            if (json.pageSize != null)
            {
                if (typeof (json.pageSize) == "boolean")
                    options.pageSize = 50;
                else if (typeof (json.pageSize) == "number")
                    options.pageSize = json.pageSize;
                else
                    options.pageSize = (json.pageSize.value == null) ? 50 : json.pageSize.value;

                if (updateDataSource)
                {
                    let ddlPageSize = ControlManager.get<ComboBox>(this._elementId + "_ddlPageSize");
                    if (!ddlPageSize.items().map(k => k.value).includes(String(options.pageSize)))
                    {
                        let items = ddlPageSize.items();
                        items.push({ text: String(options.pageSize), value: String(options.pageSize) });
                        ddlPageSize.items(items);
                    }
                    ddlPageSize.value(String(options.pageSize), true);
                }
            }
            //#endregion

            //#region Filtering
            this.clearFilters(false);
            if (json.filterConditions != null && json.filterConditions.length > 0)
            {
                let dictionaryFilterConditions = new Map<string, GridFilterSettings>();
                for (let filterCondition of json.filterConditions)
                    dictionaryFilterConditions.set(filterCondition[0], filterCondition[1]);

                this._dictionaryFilterConditions = dictionaryFilterConditions;
            }
            //#endregion

            //#region Sorting
            this.removeSort(false);
            if (json.sortingInfo != null)
                this._actualSortingInfo = json.sortingInfo;
            //#endregion

            //#region Columns
            if (json.columns != null)
            {
                for (let jsonColumn of json.columns)
                {
                    let optionsColumn = options.columns!.find(k => k.field == jsonColumn.field);
                    if (optionsColumn != null)
                    {
                        let optionsColumnIndex = options.columns!.indexOf(optionsColumn);
                        (options.columns![optionsColumnIndex] as any).index = jsonColumn.index;

                        if (jsonColumn.fitSpace !== true)
                            options.columns![optionsColumnIndex].width = jsonColumn.width;

                        //#region Header columns width
                        if (jsonColumn.fitSpace !== true)
                        {
                            let thHeader = puma(this._divHeader).find("th[field='" + jsonColumn.field + "']")[0];
                            if (options.lockable && thHeader == null)
                                thHeader = puma(this._divHeaderLocked).find("th[field='" + jsonColumn.field + "']")[0];

                            thHeader.style.width = jsonColumn.width + "px";

                            if (options.filterable)
                            {
                                let tdFilter = puma(this._divFilters).find("td[field='" + jsonColumn.field + "']")[0];
                                if (options.lockable && tdFilter == null)
                                    tdFilter = puma(this._divFiltersLocked).find("td[field='" + jsonColumn.field + "']")[0];

                                tdFilter.style.width = jsonColumn.width + "px";
                            }

                            if (this._showTotals)
                            {
                                let tdTotals = puma(this._divTotals).find("td[field='" + jsonColumn.field + "']")[0];
                                if (options.lockable && tdTotals == null)
                                    tdTotals = puma(this._divTotalsLocked).find("td[field='" + jsonColumn.field + "']")[0];

                                tdTotals.style.width = jsonColumn.width + "px";
                            }
                        }
                        //#endregion

                        if (jsonColumn.hidden)
                            this.hideColumn(jsonColumn.field, false);
                        else
                            this.showColumn(jsonColumn.field, false);

                        if (jsonColumn.locked)
                            this.lockColumn(jsonColumn.field, false);
                        else
                            this.unlockColumn(jsonColumn.field, false);
                    }
                }
                options.columns!.vrSortAsc("index");

                //#region Order columns
                let lastIndex = puma(this._divHeader).find("table th:last-child").index();
                for (let column of options.columns!)
                {
                    //#region Header
                    let headerTh = puma(this._divHeader).find("table th[field='" + column.field + "']")[0];
                    puma(puma(this._divHeader).find("table th")[lastIndex]).vrAfterPuma(headerTh);
                    //#endregion

                    //#region Filters
                    if (options.filterable)
                    {
                        let filtersTd = puma(this._divFilters).find("table td[field='" + column.field + "']")[0];
                        puma(puma(this._divFilters).find("table td")[lastIndex]).vrAfterPuma(filtersTd);
                    }
                    //#endregion

                    //#region Totals
                    if (this._showTotals)
                    {
                        let totalsTd = puma(this._divTotals).find("table td[field='" + column.field + "']")[0];
                        puma(puma(this._divTotals).find("table td")[lastIndex]).vrAfterPuma(totalsTd);
                    }
                    //#endregion

                    //#region Groups
                    if (options.groupable)
                    {
                        let colGroupCol = puma(this._divBody).find("colgroup col[field='" + column.field + "']")[0];
                        puma(puma(this._divBody).find("colgroup col")[lastIndex]).vrAfterPuma(colGroupCol);
                    }
                    //#endregion
                }
                //#endregion

                this.recalculateFitSpacePercentage();
                this.recalculateWidth();
            }
            //#endregion

            if (updateDataSource)
            {
                hideLoader("vrGridLoaderLayout" + this._elementId);
                if (this._originalDataSource.length > 2000)
                    showLoader(this.container(), true, "vrGridLoaderLayout" + this._elementId);

                window.setTimeout(() =>
                {
                    puma(this.element()).find("tbody").remove();
                    this.dataSource(this._originalDataSource);
                    hideLoader("vrGridLoaderLayout" + this._elementId);
                }, 50);
            }
        }
    }
    //#endregion

    //#endregion

    //#endregion
}
//#endregion

//#region Classes

//#region Common
class GridWebApiRequest
{
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

enum GridRequestTypeEnum
{
    Delete = 0,
    Rebind = 1,
    Save = 2,
    Excel = 3,
    RebindSpecificRows = 4
}
//#endregion

//#region Header columns
export class GridHeaderAndCellSettings
{
    textAlign?: GridAlignEnum;
    backgroundColor?: string;
    color?: string;
    tooltip?: boolean | string | ((e: GridTooltipEvent) => string);
    css?: string;
}

export class GridHeaderSettings extends GridHeaderAndCellSettings
{
    icon?: IconClass;
}

export class GridCellSettings extends GridHeaderAndCellSettings
{
    zeroIfNull?: boolean;
}
//#endregion

//#region Controls settings
class GridControlData
{
    GridControlsSettings: GridControlsSettings;
    columnType: GridColumnTypeEnum;
}

export class GridControlsSettings
{
    onClick?: (e: GridControlsClickEvent) => void;
    confirmationMessage?: string;
    value?: string;
    css?: string;
    class?: string;
    visible?: boolean;
    enabled?: boolean;
    tooltip?: string;
}

export class GridCustomSettings extends GridControlsSettings
{
    template: string;
    filterFields?: string[];
}

export class GridIconSettings extends GridControlsSettings
{
    icon?: IconClass;
    imageUrl?: string;
    color?: string;
}

export class GridImageSettings extends GridControlsSettings
{
    imageUrl?: string;
    base64Bytes?: string;
}

export class GridLabelSettings extends GridControlsSettings
{
    text?: string;
    underlineMode?: GridLabelUnderlineMode;
    bold?: boolean;
    color?: string;
    noBr?: boolean | number;
    icon?: IconClass;
}
//#endregion

//#region Rebind
export class GridRebindRequest extends GridWebApiRequest
{
    itemsPropertyName?: string;
    rebindAtStartup?: boolean;
    clearFilters?: boolean;
    specificItemIdListPropertyName?: string;
}

class GridSearchingInfo
{
    public field: string;
    public text: string;
}

class VrGridServerBindingSettings
{
    indexFrom?: number;
    indexTo?: number;
    columns?: GridColumn[];
    sortingInfo?: GridSortingInfo | null;
    filters?: Dictionary<string, GridFilterSettings>;
    groupByFields?: string[] | null;
    excel?: boolean;
    excelFileName: string | undefined;
}

class GridServerBindPagination
{
    indexFrom?: number;
    indexTo?: number;
}
//#endregion

//#regon Excel
export class GridExcelRequest extends GridWebApiRequest
{
    fileName?: string;
}
//#endregion

//#region Events
class GridControlsClickEvent
{
    dataItem: any;
}

export class GridTemplateEvent
{
    dataItem: any;
    className?: string;
    element?: HTMLTableCellElement;
    empty?: boolean;
    field: string;
    sender: Grid;
}

export class GridTooltipEvent
{
    dataItem: any;
    element?: HTMLTableCellElement;
    empty: boolean;
}

export class GridOnDataBoundEvent
{
    sender: Grid;
}

export class GridOnRowDataBoundEvent
{
    sender: Grid;
    rowElement: HTMLTableRowElement;
    dataItem: any;
    realDataItem: any;
    empty?: boolean;
}

export class GridSelectRowEvent
{
    sender: Grid;
    rowElement: HTMLTableRowElement;
    dataItem: any;
    checked: boolean;
    empty: boolean;
    index: number;
    shiftKey: boolean;
    fromCheckbox: boolean;
}

export class GridSelectAllRowsEvent
{
    sender: Grid;
    checked: boolean;
}

export class GridUnselectRowEvent
{
    sender: Grid;
    rowElement: HTMLTableRowElement;
    dataItem: any;
}

export class GridUnselectAllRowsEvent
{
    sender: Grid;
}

export class GridToolbarClickEvent
{
    sender: any;
    type: GridToolbarItemType;
    isDefaultPrevented: boolean;
    deletedItems?: any[];

    preventDefault()
    {
        this.isDefaultPrevented = true;
    }
}
//#endregion

//#region Toolbar
export class GridToolbarSwitchSettings
{
    labelOff?: string;
    labelOn?: string;
    checked?: boolean;
    onCheck?: (e: GridToolbarSwitchEvent) => void;
}

class GridToolbarSwitchEvent
{
    checked: boolean;
}

export class GridToolbarDeleteRequest extends GridWebApiRequest
{
    deletedValuesPropertyName?: string;
    valuePropertyName?: string;
}
//#endregion

//#region Footer
export class GridFooterSettings
{
    maxVisiblePages?: number;
    totalElements?: boolean | ((e: GridTotalElementTemplateEvent) => string | number);
    showPagination?: boolean;
    showPageSize?: boolean;
    showSettings?: boolean;
    cartSettings?: GridCartSettings;
}

class GridTotalElementTemplateEvent
{
    firstIndex?: number;
    lastIndex?: number;
    dataItems: any[];
    pageSelected: number;
    numberOfPages: number;
}

export class GridPageSettings
{
    value?: number;
    otherValues: number[];
}
//#endregion

//#region Totals
class TotalsGroupItem
{
    groupValue: string;
    dataItems: any[];
}

class TotalsResult
{
    field: string;
    total: number;
    decimalDigits?: number;
    roundingSettings?: NumberFormatRoundingSettings;
    type: GridColumnTypeEnum;
    milesSeparator?: boolean;
}
//#endregion

//#region Excel
export class GridExcelRow
{
    cells: GridExcelCell[];
}

export class ExcelExportPromise
{
    fileName: string;
    headerRow: GridExcelRow;
    contentRows: GridExcelRow[];
    footerRow: GridExcelRow;
    groupByFields: GridGroupByItem[];
}

class GridExcelCell
{
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

class GenerateExcelRequest
{
    public headerRow: GridExcelRow;
    public contentRows: GridExcelRow[];
    public footerRow: GridExcelRow;
    public excelFileName: string;
    public AuthKey: string;
    public groupBy?: GridGroupByItem[] | null;
    public exportHiddenColumns: boolean;
}

class GenerateExcelResponse
{
    public downloadUrl: string;
}
//#endregion

//#region Sorting
class GridSortingInfo
{
    field: string;
    mode: GridSortDirectionEnum;
}
//#endregion

//#region Auto window
class GridAutoWindowSettings
{
    save?: GridSaveRequest;
    options?: GridAutoWindowOption;

    onBeforeOpen?: (e: AutowindowBeforeOpenEvent) => void;
    onAfterOpen?: (e: AutowindowAfterOpenEvent) => void;
    onBeforeSave?: (e: AutowindowBeforeSaveEvent) => void;
    onAfterSave?: (e: AutowindowAfterSaveEvent) => void;
    onBeforeClose?: (e: AutowindowBeforeCloseEvent) => void;
    onAfterClose?: (e: AutowindowAfterCloseEvent) => void;
}

class GridAutoWindowOption
{
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

class GridSaveRequest extends GridWebApiRequest
{
    itemPropertyName?: string;
}

class AutoWindowEvent extends VrControlsEvent
{
    sender: Grid;
    window: Window;
    dataItem: any;
    columns?: GridColumn[];
}

class AutowindowBeforeOpenEvent extends AutoWindowEvent { }
class AutowindowAfterOpenEvent extends AutoWindowEvent { }
class AutowindowBeforeSaveEvent extends AutoWindowEvent { }
class AutowindowAfterSaveEvent extends AutoWindowEvent { }
class AutowindowBeforeCloseEvent extends AutoWindowEvent { }
class AutowindowAfterCloseEvent extends AutoWindowEvent { }
//#endregion

//#region Grid actions (Show/Hide and GroupBy)
enum GridActionEnum
{
    ShowHide,
    GroupBy,
    LockUnlock
}
//#endregion

//#region Filtering
export class GridFilterSettings
{
    type: GridColumnTypeEnum;

    dateFilterSettings?: GridDateFilterSettings | null;
    numberFilterSettings?: GridNumberFilterSettings | null;
    checkboxFilterSettings?: GridCheckboxFilterSettings | null;
    stringFilterSettings?: GridStringFilterSettings | null;
}

class GridDateFilterSettings
{
    filterTypeEnum: GridDateFilterTypeEnum;
    dateFrom: Date;
    dateTo?: Date | null;
    specificValues: any[];
}

class GridNumberFilterSettings
{
    filterTypeEnum: GridNumberFilterTypeEnum;
    numberFrom: number;
    numberTo?: number | null;
    specificValues: any[];
}

class GridCheckboxFilterSettings
{
    value: boolean;
}

class GridStringFilterSettings
{
    text: string;
    filterTypeEnum: GridStringFilterTypeEnum;
    specificValues: any[];
}
//#endregion

//#region Drag&Drop
class DragSupportEvent
{
    onDragged?: null | ((e: DragEveryEvent) => void);
    onDragging?: null | ((e: DragEveryEvent) => void);
}

class DragEveryEvent
{
    left: number;
    top: number;
    element: HTMLElement;
}

class GridColumnPosition
{
    left: number;
    right: number;
    field: string;
    index: number;
    th: HTMLElement;
}
//#endregion

//#region GroupBy
class GridChildrenGroupRows
{
    children: HTMLElement[];
    groupRows: HTMLElement[];
    allRows: HTMLElement[];
}
//#endregion

//#region Layout
class GridLayoutSettings
{
    //*****************TODO*************************** */
    name?: string;
    get?: GetLayoutListRequest;
    save?: SaveLayoutRequest;
    load?: LoadLayoutRequest;
}

class GridLayoutStructure
{
    filterConditions?: any[] | null;
    groupBy?: GridGroupBySettings | null;
    pageSize?: number | boolean | GridPageSettings;
    sortingInfo?: GridSortingInfo | null;
    columns: GridLayoutColumn[];
}

class GridLayoutColumn
{
    width?: number;
    fitSpace?: boolean;
    hidden?: boolean;
    locked?: boolean;
    index: number;
    field: string;
}

class SaveLayoutRequest
{
    public method: string;
    public authKey?: string;
    public layoutJson?: string;
    public pageName?: string;
    public gridName?: string;
    public layoutName?: string;
    public layoutPropertyName?: string;
}

class LoadLayoutRequest
{
    public method: string;
    public authKey?: string;
    public pageName?: string;
    public gridName?: string;
    public layoutName?: string;
    public layoutPropertyName?: string;
}

class LoadLayoutResponse
{
    public tableLayout: GridLayout;
}

class ClearLayoutRequest
{
    public AuthKey: string;
    public pageName: string;
    public gridName: string;
    public layoutName: string;
}

class ClearLayoutResponse
{

}

class GetLayoutListRequest
{
    public method: string;
    public authKey?: string;
    public pageName?: string;
    public gridName?: string;
    public layoutsPropertyName?: string;
}

class GridLayout
{
    layoutName: string;
    layoutLastEditDate: Date;
    id: number;
    layoutJson: string;
}

enum GridLayoutOperationTypeEnum
{
    Save,
    Load,
    Clear,
    Get
}
//#endregion

class TempRebindInfo
{
    yPosition: number;
    checkedValues: string[];
    page: number;
}

export class GridRow 
{
    element: HTMLElement;
    cells: HTMLElement[];
    index: number;
    dataItemId: string;
    id: string;

    findControl<T extends VrControl>(uniqueName: string)
    {
        let controlElement = puma(this.element).find("*[uniqueName='" + uniqueName + "']")[0];
        if (controlElement != null)
            return ControlManager.get<T>(controlElement.id);
        else
            return null;
    }
}
//#endregion