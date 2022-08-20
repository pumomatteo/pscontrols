import { ControlTypeEnum, IconClassLight, IconClass, WindowAutoSizeDirectionEnum, dialog, confirm, alert, ButtonModeEnum, createSplitButton, createComboBox, ComboBoxTypeEnum, prompt, createButton, DateModeEnum, createTextBox, createCheckBox, createWindow, WindowFooterItemTypeEnum, createDatePicker, PositionEnum, TextModeEnum, WindowFooterItemAlignEnum, GridHeightModeEnum, GridCheckboxModeEnum, GridModeEnum, GridColumnTypeEnum, GridAlignEnum, GridAggregateMode, GridLabelUnderlineMode, GridToolbarItemType, GridDateFilterTypeEnum, GridNumberFilterTypeEnum, createGrid, createSwitch, GridColumn, GridToolbarItem, puma, GridButtonSettings, KeyEnum, GridSortDirectionEnum, GridGroupBySettings, GridSortSettings, GridGroupByItem, createButtonGroup, SelectionModeEnum, createLabel, createColorPicker, GridGroupExpandCollapseEvent, GridGroupEditClickEvent, GridGroupDisplayValueEvent, notify, showLoader, hideLoader, IconClassRegular, IconClassSolid, notifyError, NumberFormatRoundingSettings, NumberFormatSettings, RoundingModeEnum, GridPageSelectedEvent, notifyWarning, GridScrollEvent, div, ControlPositionEnum, createCheckBoxList, OrientationEnum, GridStringFilterTypeEnum, CheckboxStateEnum } from "../vr";
import { VrControl, VrControlOptions, VrControlsEvent } from "../common";
import { Window } from "./Window";
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
    pageSize?: number | boolean;
    largePageSize?: boolean;
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

    //**********************TODO//**********************
    layoutSettings?: GridLayoutSettings | boolean;
    //#endregion

    //#region Events
    onDataSourceChanged?: () => void;
    onDataBound?: (e: GridOnDataBoundEvent) => void;
    onRowDataBound?: (e: GridOnRowDataBoundEvent) => void | string;
    onSelectRow?: (e: GridSelectRowEvent) => void;
    onSelectAllRows?: (e: GridSelectAllRowsEvent) => void;
    onUnselectRow?: (e: GridUnselectRowEvent) => void;
    onUnselectAllRows?: (e: GridUnselectAllRowsEvent) => void;
    onAutoWindowOpen?: (e: AutoWindowOpenEvent) => void;
    onGroupExpandCollapse?: (e: GridGroupExpandCollapseEvent) => void;
    onGroupEditClick?: (e: GridGroupEditClickEvent) => void;
    onPageSelected?: (e: GridPageSelectedEvent) => void;
    onScroll?: (e: GridScrollEvent) => void;
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
    private _checkedItemsForFiltering: any[] | null;
    private _timeoutFilterText: number;
    private _workerTotals: Worker;
    private _workerTotalsGroup: Worker;

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
        if (options.multilineRows == null) options.multilineRows = false;
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
        if (options.largePageSize == null) options.largePageSize = false;
        if (options.enable == null) options.enable = true;
        if (options.excel == null) options.excel = options.rebind;
        if (options.lockable == null) options.lockable = true;

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
            layoutJson.pageSize = JSON.parse(JSON.stringify(options.pageSize!));
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

                    //#region Check if saved layout correspond with actual layout
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
                }
            });
            //**********************TODO//**********************
        }
        //#endregion

        //#region Instantiate variables
        this._lastIndexAdded = -1;
        this._dictionaryDataValues = new Map<string, string[]>();
        this._groupByActualValue = {};
        this._actualPageSize = (options.pageSize === false) ? 50 : options.pageSize;
        this._actualPageSelected = 1;

        this._serverBindingPagination = new GridServerBindPagination();
        this._serverBindingPagination.indexFrom = 0 * this._actualPageSize;
        this._serverBindingPagination.indexTo = this._serverBindingPagination.indexFrom + this._actualPageSize - 1;
        //#endregion

        //#region Structure
        puma(element).vrBeforePuma("<div id='" + element.id + "_divContainer' class='p-grid-container'></div>");

        //#region Header
        this._divHeaderContainer = div("#" + element.id + "_divContainer", { css: "height: 35px;" })
        if (options.lockable)
            this._divHeaderLocked = puma("<div class='grid_Header grid_Header_locked' style='overflow-x: hidden; display: inline-block;'></div>").vrAppendToPuma(this._divHeaderContainer)[0] as HTMLDivElement;

        this._divHeader = puma("<div id='" + element.id + "Header' class='grid_Header' style='overflow-x: hidden; display: inline-block;'></div>").vrAppendToPuma(this._divHeaderContainer)[0] as HTMLDivElement;
        if (!options.header)
        {
            this._divHeaderContainer.style.cssText += "display: none;";
            this._divHeader.style.cssText += "display: none;";
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
        if (this._showTotals)
            this.createTotalsFunction();

        this._spanFitTotalsSpace = puma("<span id='" + element.id + "FitTotalsSpace' class='grid_fitTotalsSpace'></span>").vrAppendToPuma("#" + element.id + "_divContainer")[0];
        //#endregion

        //#endregion

        //#region Footer
        if (options.footer !== false)
        {
            this._divFooter = puma("<div id='" + element.id + "Footer' class='p-grid-footer'></div>").vrAppendToPuma("#" + element.id + "_divContainer")[0] as HTMLDivElement;

            //#region Footer page size
            if (options.footer.showPageSize && typeof (options.pageSize) != "boolean")
            {
                //#region PageSize items
                let pageSizeItems =
                    [
                        { text: "50", value: "50", numberValue: 50 },
                        { text: "100", value: "100", numberValue: 100 }
                    ];

                if (options.pageSize! >= 200)
                    options.largePageSize = true;

                if (options.largePageSize)
                {
                    pageSizeItems.push({ text: "200", value: "200", numberValue: 200 });
                    pageSizeItems.push({ text: "500", value: "500", numberValue: 500 });
                }

                if (options.pageSize! != 50 && options.pageSize! != 100 && options.pageSize! != 200 && options.pageSize != 500)
                    pageSizeItems.push({ text: String(options.pageSize!), value: String(options.pageSize!), numberValue: Number(options.pageSize!) });

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
                            options!.pageSize = Number(e.sender.value());

                            if (options!.columns!.length > 10)
                                showLoader();

                            window.setTimeout(() =>
                            {
                                this.update();
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

                        icon: IconClassLight.Gear,
                        cssContainer: "top: 2px; margin-left: 5px;",
                        items:
                            [
                                {
                                    text: "Salva layout", icon: IconClassLight.Table, onClick: (e) =>
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
                                    text: "Gestisci layout", icon: IconClassLight.Table, value: "manageLayout",
                                    onClick: (e) => this.openWindowLayout()
                                },
                                {
                                    text: "Ripristina layout di base", icon: IconClassLight.Table, value: "restoreBaseLayout",
                                    confirmationMessage: "Confermi di voler ripristinare il layout di base?",
                                    onClick: (e) => 
                                    {
                                        this._actualLayout = null;
                                        this.changeLayout(true, this._originalOptionsForLayout);
                                    }
                                },
                                {
                                    text: "Mostra/Nascondi", icon: IconClassLight.Eye,
                                    onClick: (e) => this.openWindowActions(GridActionEnum.ShowHide)
                                },
                                {
                                    text: "Raggruppa per...", icon: IconClassLight.Users, visible: options.groupable,
                                    onClick: (e) => this.openWindowActions(GridActionEnum.GroupBy)
                                },
                                {
                                    text: "Blocca/Sblocca", icon: IconClassLight.Lock, visible: options.lockable!,
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
        //#endregion

        puma(this._divBody).vrAppendPuma(element);

        if (options.lockable)
        {
            this._elementLocked = puma("<table class='p-grid p-grid-locked' style='border-collapse: collapse;'></table>");
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
        let tableWidth = puma(this.element()).width();
        let columnsWidthOccupied = 0;
        let fitSpaceColumnsNumber = 0;
        for (let column of options.columns)
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

        if (options.groupBy != null && options.groupBy.fields != null)
            remainingSpace -= 20 * options.groupBy.fields.length;

        let fitSpaceColumnPercentage = (100 * (remainingSpace / fitSpaceColumnsNumber) / tableWidth);
        this._fitSpaceColumnPercentage = fitSpaceColumnPercentage;
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
            for (let column of options.columns!)
            {
                let display = "";
                if (options.groupBy == null || (!(options.groupBy.fields as GridGroupByItem[]).map(k => k.field).includes(column.field)))
                    display = "display: none;";

                puma(this._divHeader).find(".p-grid-headerColumn").vrAppendPuma("<th width=16 style='border: 1px solid rgb(221, 221, 221); background-color: #51B3E1; " + display + "' value='groupBy" + column.field + "' class='groupBy" + column.field + "'></th>");
                if (options.lockable)
                    puma(this._divHeaderLocked).find(".p-grid-headerColumn").vrAppendPuma("<th width=16 style='border: 1px solid rgb(221, 221, 221); background-color: #51B3E1; " + display + "' value='groupBy" + column.field + "' class='groupBy" + column.field + "'></th>");
            }
        }

        //#region Checkbox column
        if (options.checkboxes != GridCheckboxModeEnum.None)
        {
            let thCheckbox = document.createElement("th");
            thCheckbox.style.cssText += "border: 1px solid #dddddd;";
            puma(thCheckbox).attr("width", 20);
            puma(thCheckbox).attr("value", "vrGridCheckboxColumn");
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
        for (let column of options.columns)
        {
            let th = document.createElement("th");
            puma(th).attr("value", column.field);
            th.style.cssText += "border: 1px solid #dddddd;";

            let title = (column.title != null) ? column.title : "";
            puma(th).attr("title", title);

            //#region Icon
            if (column.headerSettings != null && column.headerSettings.icon != null)
                title = "<i class='" + column.headerSettings.icon + "'></i>" + title;
            //#endregion

            //#region Bold
            if (column.bold === true)
                puma(th).css("font-weight", "500");
            //#endregion

            //#region Css
            if (column.headerSettings != null && column.headerSettings!.css != null)
                th.style.cssText += column.headerSettings!.css;
            //#endregion

            th.innerHTML = "<div class='grid_headerTh'><span class='grid_headerThContent'>" + title + "</span><i style='position: absolute; top: 10px; right: 5px;'></i></div>";

            puma(th).attr("width", (column.width != null) ? column.width : ((column.fitSpace == true) ? fitSpaceColumnPercentage + "%" : (column.type == GridColumnTypeEnum.EditButton) ? 32 : 100));
            if (column.fitSpace == true)
                puma(th).attr("fitSpace", "true");

            //#region Color
            let backgroundColor = "#51B3E1";
            let color = "#000";
            if (column.headerSettings != null)
            {
                backgroundColor = (column.headerSettings.backgroundColor != null) ? column.headerSettings.backgroundColor : backgroundColor;
                color = (column.headerSettings.color != null) ? column.headerSettings.color : "#000";
            }
            puma(th).css("background-color", backgroundColor);
            puma(th).css("color", color);
            //#endregion

            //#region Text align
            let textAlign = GridAlignEnum.Left;
            if (column.headerSettings != null && column.headerSettings.textAlign != null)
                textAlign = column.headerSettings.textAlign;
            puma(th).css("text-align", textAlign);
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
                    puma(th).attr("title", tooltip);
            }
            //#endregion

            //#region Sort
            let sorGridColumnTypes = [GridColumnTypeEnum.Currency, GridColumnTypeEnum.Date, GridColumnTypeEnum.DateTime,
            GridColumnTypeEnum.Duration, GridColumnTypeEnum.Label, GridColumnTypeEnum.Number, GridColumnTypeEnum.Percentage,
            GridColumnTypeEnum.String, GridColumnTypeEnum.Time];
            if (sorGridColumnTypes.includes(column.type!))
            {
                puma(th).css("cursor", "pointer");
                puma(th).click(() =>
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
                puma(th).css("cursor", "grab");
            //#endregion

            // Append th
            if (options.lockable && column.locked)
            {
                th.setAttribute("locked", "locked");
                puma(this._divHeaderLocked).find(".p-grid-headerColumn").vrAppendPuma(th);
            }
            else
                puma(this._divHeader).find(".p-grid-headerColumn").vrAppendPuma(th);

            if (column.hidden == true)
                puma(th).hide();
        }

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
                for (let column of options.columns!)
                {
                    let display = "";
                    if (options.groupBy == null || (!(options.groupBy.fields as GridGroupByItem[]).map(k => k.field).includes(column.field)))
                        display = "display: none;";

                    puma(this._divFilters).find(".p-grid-filters").vrAppendPuma("<td style='border: 1px solid rgb(221, 221, 221); " + display + "' value='groupBy" + column.field + "' width=16 class='groupBy" + column.field + "'></td>");
                    if (options.lockable)
                        puma(this._divFiltersLocked).find(".p-grid-filters").vrAppendPuma("<td style='border: 1px solid rgb(221, 221, 221); " + display + "' width=16 class='groupBy" + column.field + "'></td>");
                }
            }

            //#region Checkbox column
            if (options.checkboxes != GridCheckboxModeEnum.None)
            {
                let thCheckbox = document.createElement("td");
                puma(thCheckbox).attr("value", "vrGridCheckboxColumn");
                thCheckbox.style.cssText += "border: 1px solid #dddddd;";
                puma(thCheckbox).attr("width", 20);

                if (this.thereAreLockedColumns())
                    puma(this._divFiltersLocked).find(".p-grid-filters").vrAppendPuma(thCheckbox);
                else
                    puma(this._divFilters).find(".p-grid-filters").vrAppendPuma(thCheckbox);
            }
            //#endregion

            //#region Columns
            for (let column of options.columns)
            {
                //#region Create dictionary
                if (column.type != GridColumnTypeEnum.EditButton)
                    this._dictionaryDataValues.set(column.field, []);
                //#endregion

                let td = document.createElement("td");
                puma(td).attr("value", column.field);
                td.style.cssText += "border: 1px solid #dddddd;";

                puma(td).attr("width", (column.width != null) ? column.width : ((column.fitSpace == true) ? fitSpaceColumnPercentage + "%" : (column.type == GridColumnTypeEnum.EditButton) ? 32 : 100));
                if (column.fitSpace == true)
                    puma(td).attr("fitSpace", "true");

                // Append th
                if (options.lockable && column.locked)
                    puma(this._divFiltersLocked).find(".p-grid-filters").vrAppendPuma(td);
                else
                    puma(this._divFilters).find(".p-grid-filters").vrAppendPuma(td);

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
                                puma(td).css("text-align", "center");
                                td.innerHTML = "<input id='" + element.id + "_CheckboxFilter_" + column.field + "' class='vrCheckBox' type='checkbox'></input>"
                                    + "<label class='vrLabel vr-checkboxFilter-label' for='" + element.id + "_CheckboxFilter_" + column.field + "'></label>";

                                //#region Create filter
                                let checkboxJq = puma("#" + element.id + "_CheckboxFilter_" + column.field);
                                checkboxJq.addClass("indeterminateVrCheckbox");
                                checkboxJq.click((e: any) =>
                                {
                                    let checkbox = checkboxJq[0] as HTMLInputElement;
                                    if (checkbox.checked && !puma(checkbox).hasClass("indeterminateVrCheckbox"))
                                    {
                                        puma(checkbox).addClass("indeterminateVrCheckbox");
                                        this.removeFilter(column.field);
                                        e.preventDefault();
                                    }
                                    else
                                    {
                                        puma(checkbox).removeClass("indeterminateVrCheckbox");

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
                            {
                                puma(td).css("text-align", "center");
                                td.innerHTML = "<button id='" + this._elementId + "_DateFilter_" + column.field + "'></button>" +
                                    "<button id='" + this._elementId + "_DateFilterRemove_" + column.field + "'></button>";

                                //#region Create filter
                                let dateFilter = createButton(
                                    {
                                        icon: IconClassLight.Filter,
                                        tooltip: "Applica filtro",
                                        onClick: (e) =>
                                        {
                                            this.openWindowFiltering(column);
                                        }
                                    }, null, null, this._elementId + "_DateFilter_" + column.field);

                                let dateFilterRemove = createButton(
                                    {
                                        icon: IconClassRegular.Xmark,
                                        tooltip: "Rimuovi filtro",
                                        colorSettings: { background: "#CCC" },
                                        visible: false,
                                        cssContainer: "margin-left: 5px;",
                                        onClick: (e) =>
                                        {
                                            this.removeFilter(column.field);

                                            dateFilter.tooltip("");
                                            puma(dateFilter.element()).css("background-color", "#f3f3f3");
                                            puma(dateFilter.element()).css("color", "#000");
                                            dateFilterRemove.hide();
                                            this.recalculateHeight(true);
                                        }
                                    }, null, null, this._elementId + "_DateFilterRemove_" + column.field);
                                //#endregion
                            }
                            break;
                        case GridColumnTypeEnum.Number:
                        case GridColumnTypeEnum.Currency:
                        case GridColumnTypeEnum.Percentage:
                        case GridColumnTypeEnum.Duration:
                            {
                                puma(td).css("text-align", "center");
                                td.innerHTML = "<button id='" + this._elementId + "_NumberFilter_" + column.field + "'></button>" +
                                    "<button id='" + this._elementId + "_NumberFilterRemove_" + column.field + "'></button>";

                                //#region Create filter
                                let numberFilter = createButton(
                                    {
                                        icon: IconClassLight.Filter,
                                        tooltip: "Applica filtro",
                                        onClick: (e) =>
                                        {
                                            this.openWindowFiltering(column);
                                        }
                                    }, null, null, this._elementId + "_NumberFilter_" + column.field);

                                let numberFilterRemove = createButton(
                                    {
                                        icon: IconClassRegular.Xmark,
                                        tooltip: "Rimuovi filtro",
                                        colorSettings: { background: "#CCC" },
                                        visible: false,
                                        cssContainer: "margin-left: 5px;",
                                        onClick: (e) =>
                                        {
                                            this.removeFilter(column.field);

                                            numberFilter.tooltip("");
                                            puma(numberFilter.element()).css("background-color", "#f3f3f3");
                                            puma(numberFilter.element()).css("color", "#000");
                                            numberFilterRemove.hide();
                                            this.recalculateHeight(true);
                                        }
                                    }, null, null, this._elementId + "_NumberFilterRemove_" + column.field);
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
                                        icon: (column.type == GridColumnTypeEnum.Custom) ? IconClassLight.Search : undefined,
                                        placeholder: (column.type == GridColumnTypeEnum.Custom) ? "Cerca..." : undefined,
                                        width: "Calc(100% - 27px)",
                                        attributes: [{ name: "field", value: column.field }],
                                        onPaste: (e) =>
                                        {
                                            clearTimeout(this._timeoutFilterText);
                                            let textToSearch = String(e.value).trim().toLowerCase();
                                            let field = puma(e.sender.element()).attr("field");

                                            this.manageFilterTextByColumn(textToSearch, column, field, false);
                                        },
                                        onKeyUp: (e) =>
                                        {
                                            if (e.tabKey)
                                                return;

                                            //#region Filter button
                                            btnStringFilter.tooltip("");
                                            puma(btnStringFilter.element()).css("background-color", "#f3f3f3");
                                            puma(btnStringFilter.element()).css("color", "#000");
                                            btnStringFilterRemove.hide();
                                            e.sender.width("Calc(100% - 27px)");
                                            //#endregion

                                            clearTimeout(this._timeoutFilterText);
                                            let textToSearch = e.sender.value<string>().toLowerCase();
                                            let field = puma(e.sender.element()).attr("field");

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
                                                this.removeFilter(puma(e.sender.element()).attr("field"), false);
                                                window.setTimeout(() =>
                                                {
                                                    if (column.filterWebService === true)
                                                        this.rebind(null, true);
                                                    else
                                                        this.applyFilters(true);

                                                    this._checkedItemsForFiltering = this.getCheckedItems();
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
                                        icon: IconClassLight.Filter,
                                        tooltip: "Applica filtro",
                                        onClick: (e) =>
                                        {
                                            this.openWindowFiltering(column);
                                        }
                                    }, td, null, this._elementId + "_StringFilterBtn_" + column.field);

                                let btnStringFilterRemove = createButton(
                                    {
                                        icon: IconClassRegular.Xmark,
                                        tooltip: "Rimuovi filtro",
                                        colorSettings: { background: "#CCC" },
                                        visible: false,
                                        cssContainer: "margin-left: 5px;",
                                        onClick: (e) =>
                                        {
                                            this.removeFilter(column.field);

                                            btnStringFilter.tooltip("");
                                            puma(btnStringFilter.element()).css("background-color", "#f3f3f3");
                                            puma(btnStringFilter.element()).css("color", "#000");
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

                if (column.hidden === true)
                    puma(td).hide();
            }
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
                for (let column of options.columns!)
                {
                    let display = "";
                    if (options.groupBy == null || (!(options.groupBy.fields as GridGroupByItem[]).map(k => k.field).includes(column.field)))
                        display = "display: none;";

                    puma(this._divTotals).find(".p-grid-totals").vrAppendPuma("<td style='border: 1px solid rgb(221, 221, 221); " + display + "' width=16 class='groupBy" + column.field + "'></td>");
                    if (options.lockable)
                        puma(this._divTotalsLocked).find(".p-grid-totals").vrAppendPuma("<td style='border: 1px solid rgb(221, 221, 221); " + display + "' width=16 class='groupBy" + column.field + "'></td>");
                }
            }

            //#region Checkbox column
            if (options.checkboxes != GridCheckboxModeEnum.None)
            {
                let thCheckbox = document.createElement("td");
                puma(thCheckbox).attr("value", "vrGridCheckboxColumn");
                thCheckbox.style.cssText += "border: 1px solid #dddddd;";
                puma(thCheckbox).attr("width", 20);

                if (this.thereAreLockedColumns())
                    puma(this._divTotalsLocked).find(".p-grid-totals").vrAppendPuma(thCheckbox);
                else
                    puma(this._divTotals).find(".p-grid-totals").vrAppendPuma(thCheckbox);
            }
            //#endregion

            //#region Columns
            for (let column of options.columns!)
            {
                let td = document.createElement("td");
                puma(td).attr("value", column.field);
                td.style.cssText += "border: 1px solid #dddddd;";

                puma(td).attr("width", (column.width != null) ? column.width : ((column.fitSpace == true) ? this._fitSpaceColumnPercentage + "%" : (column.type == GridColumnTypeEnum.EditButton) ? 32 : 100));
                if (column.fitSpace == true)
                    puma(td).attr("fitSpace", "true");

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
                        textAlign = GridAlignEnum.Center;
                        break;
                    case GridColumnTypeEnum.String:
                        textAlign = GridAlignEnum.Left;
                        break;
                }

                if (column.cellSettings != null)
                    textAlign = (column.cellSettings.textAlign != null) ? column.cellSettings.textAlign : textAlign;

                puma(td).css("text-align", textAlign);
                //#endregion

                //Append th
                if (options.lockable && column.locked)
                    puma(this._divTotalsLocked).find(".p-grid-totals").vrAppendPuma(td);
                else
                    puma(this._divTotals).find(".p-grid-totals").vrAppendPuma(td);

                //#region Format
                if (column.aggregate != null && column.aggregate !== false)
                {
                    let decimalDigits = 0;
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
                            decimalDigits = (column.decimalDigits != null) ? column.decimalDigits : 0;
                            break;
                        case GridColumnTypeEnum.Currency:
                            decimalDigits = (column.decimalDigits != null) ? column.decimalDigits : 2;
                            break;
                        case GridColumnTypeEnum.Duration:
                            decimalDigits = (column.decimalDigits != null) ? column.decimalDigits : 0;
                            break;
                        case GridColumnTypeEnum.Percentage:
                            decimalDigits = (column.decimalDigits != null) ? column.decimalDigits : 2;
                            break;
                    }
                    //#endregion						

                    puma(td).attr("field", column.field);
                    puma(td).attr("decimalDigits", decimalDigits);
                    puma(td).attr("aggregate", String(column.aggregate));
                }
                //#endregion

                if (column.type == GridColumnTypeEnum.Custom && column.exportable == null)
                    column.exportable = false;

                //Hidden
                if (column.hidden == true)
                    puma(td).hide();
            }
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
            columnPosition.field = puma(th).attr("value");
            columnPosition.left = puma(th).offset().left;
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

    clear(triggerChange = false)
    {
        if (this.dataSource().filter(k => k["defaultRow"] == null || k["defaultRow"] == false).length > 0)
        {
            this.dataSource([]);
            this.clearSelection(triggerChange);
        }
    }

    private manageDataSourceControls(GridControlData: GridControlData, className: string)
    {
        puma(this.element()).add(puma(this._elementLocked)).off("click", "." + className);
        puma(this.element()).add(puma(this._elementLocked)).on("click", "." + className, (e: any) =>
        {
            puma(e.target).attr("disabled", "disabled");
            let options = this.getOptions();
            let rowId = puma(e.currentTarget).attr("dataItemId");
            if (rowId == null)
                rowId = puma(e.target).closest(".vrButton").attr("dataItemId");

            let dataItem = this.dataSource()!.filter(k => k[options.dataSourceFieldId!] == rowId)[0];

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

                window.setTimeout(() => puma(e.target).removeAttr("disabled"), 500);
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

    dataSource(dataItems?: any[], clearFilters = false)
    {
        if (dataItems != null)
        {
            let options = this.getOptions();

            //#region DataSourceFieldId not defined
            if (dataItems.length > 0 && dataItems[0][options.dataSourceFieldId!] == null)					
            {
                //console.log("Grid null Id!! (" + options.dataSourceFieldId!) + "): " + this.element().id;
                let index = -1;
                for (let item of dataItems)
                {
                    item[options.dataSourceFieldId!] = index;
                    index--;
                }
                this._lastIndexAdded = index;
            }
            //#endregion

            //#region GroupBy & Filterable
            if (options.groupBy != null)
                this.sortingGroupFields(dataItems);

            if (options.sortBy != null)
            {
                let sortByField = (options.sortBy as GridSortSettings).field;
                this.sort(sortByField, (options.sortBy as GridSortSettings).direction, false);
            }

            this._originalDataSource = JSON.parse(JSON.stringify(dataItems));
            if (options.filterable)
            {
                this._dictionaryDataValues.clear();
                for (let column of options.columns!)
                {
                    if (column.type != GridColumnTypeEnum.EditButton)
                        this._dictionaryDataValues.set(column.field, dataItems.map(k => String(k[column.field]).toLowerCase()));
                }
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
            this._tempRebindInfo.yPosition = puma(this.container()).find(".grid_Body")[0].scrollTop;
        }
        //#endregion

        this.setDataSource(this.dataSource(), triggerDataBound);
    }

    private setDataSource(dataItems: any[], triggerDataBound = true)
    {
        let options = this.getOptions();
        this._dataSource = dataItems;

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
                puma(this.container()).find(".grid_Body").scrollTop(yPosition);
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

        //#region Body
        if (puma(this.element()).find("tbody").length == 0)
            puma(this.element()).vrAppendPuma("<tbody></tbody>");
        else
        {
            puma(this.element()).find("tbody tr").empty();
            puma(this.element()).find("tbody td").css("background-color", "");
        }

        if (options.lockable)
        {
            if (puma(this._elementLocked).find("tbody").length == 0)
                puma(this._elementLocked).vrAppendPuma("<tbody></tbody>");
            else
            {
                puma(this._elementLocked).find("tbody tr").empty();
                puma(this._elementLocked).find("tbody td").css("background-color", "");
            }
        }
        //#endregion

        //#region Rows
        let items: any[];
        let firstIndex;
        let lastIndex;
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
            let defaultRow = puma(this._divBody).find("table tr[defaultrow='defaultrow']");
            if (defaultRow.length > 0)
            {
                defaultRow.find("td").empty();
                defaultRow.removeAttr("defaultRow");
            }

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
            puma(this.container()).find(".grid_trGroupBy").remove();
            puma(this.container()).find(".p-grid-totalsGroup").remove();
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

        let j = 1;
        for (let row of items)
        {
            let dataItem = dataItems[i];
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
                        let cellValue = row[(groupByField as GridGroupByItem).field];
                        let column = options.columns!.filter(k => k.field == (groupByField as GridGroupByItem).field)[0];

                        if (this._groupByActualValue[(groupByField as GridGroupByItem).field] !== cellValue)
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
                            let trOld = puma(this.element()).find("tbody tr:nth-child(" + (j + rowAdded) + ")")[0] as HTMLTableRowElement;
                            let trGroupBy: HTMLElement | null = null;

                            let newTr = puma("<tr value='" + ((cellValue == null || cellValue === "") ? "nosetted" : String(cellValue).replace(/%/, "").replace(/ /g, "").replace(/\./g, "").replace(/-/g, "").replace(/\//g, "")) + "' level='" + groupByIndex + "' class='grid_trGroupBy p-grid-body'></tr>");
                            if (trOld == null)
                                trGroupBy = newTr.vrAppendToPuma(puma(this.element()).find("tbody"))[0];
                            else
                                trGroupBy = newTr.vrInsertBeforePuma(trOld)[0];

                            puma(trGroupBy).height(options.rowHeight!);

                            let trGroupByLocked = null;
                            if (options.lockable)
                            {
                                let trOldLocked = puma(this._elementLocked).find("tbody tr:nth-child(" + (j + rowAdded) + ")")[0] as HTMLTableRowElement;
                                let newTr = puma("<tr value='" + ((cellValue == null || cellValue === "") ? "nosetted" : String(cellValue).replace(/%/, "").replace(/ /g, "").replace(/\./g, "").replace(/-/g, "").replace(/\//g, "")) + "' level='" + groupByIndex + "' class='grid_trGroupBy grid_trGroupByLocked p-grid-body'></tr>");
                                if (trOldLocked == null)
                                    trGroupByLocked = newTr.vrAppendToPuma(puma(this._elementLocked).find("tbody"))[0];
                                else
                                    trGroupByLocked = newTr.vrInsertBeforePuma(trOldLocked)[0];

                                puma(trGroupByLocked).height(options.rowHeight!);
                            }
                            //#endregion

                            rowAdded++;
                            if (groupByIndex > 0)
                            {
                                for (let p = 0; p < groupByIndex; p++)
                                {
                                    puma(trGroupBy!).vrAppendPuma("<td width=16 class='groupBy" + groupByField + "'></td>");
                                    if (options.lockable) puma(trGroupByLocked!).vrAppendPuma("<td width=16 class='groupBy" + groupByField + "'></td>");
                                }
                            }

                            //#region Group title
                            let cellText = String(cellValue);
                            if (column != null)
                            {
                                if (column.type == GridColumnTypeEnum.Date)
                                    cellText = (row[(groupByField as GridGroupByItem).field] == null) ? "" : Date.vrFixDateString(row[(groupByField as GridGroupByItem).field]).vrToItalyString();
                                else if (column.type == GridColumnTypeEnum.Checkbox || column.type == GridColumnTypeEnum.Boolean)
                                    cellText = (Boolean(row[(groupByField as GridGroupByItem).field])) ? "Sì" : "No";
                            }

                            let colspan = visibleColumns.length - groupByIndex + ((options.groupBy as GridGroupBySettings).fields as GridGroupByItem[]).length;
                            if (options.checkboxes == GridCheckboxModeEnum.None)
                                colspan -= 1;

                            let groupByDisplayText = cellText;
                            if ((groupByField as GridGroupByItem).displayField != null)
                                groupByDisplayText = row[(groupByField as GridGroupByItem).displayField!];

                            if ((groupByField as GridGroupByItem).displayValue != null)
                            {
                                let groupByDisplayValueEvent = new GridGroupDisplayValueEvent();
                                groupByDisplayValueEvent.sender = this;
                                groupByDisplayValueEvent.dataItem = row;
                                groupByDisplayValueEvent.field = (groupByField as GridGroupByItem).field;
                                groupByDisplayValueEvent.displayField = (groupByField as GridGroupByItem).displayField;
                                groupByDisplayText = (groupByField as GridGroupByItem).displayValue!(groupByDisplayValueEvent);
                            }

                            if (groupByDisplayText == null) groupByDisplayText = cellText;

                            let groupByCaret = IconClassLight.CaretDown;
                            let childrenRows = this.getChildrenGroupRows(trGroupBy!, this._divBody);
                            if (this.thereAreLockedColumns())
                                childrenRows = this.getChildrenGroupRows(trGroupBy!, this._divBodyLocked);

                            if (this.pageSelected() > 1 && !puma(childrenRows.allRows.vrFirst()).is(":visible"))
                                groupByCaret = IconClassLight.CaretRight;

                            let text = "<td width=16 class='grid_tdGroupByCollapse groupBy" + groupByField + "' style='border-right-color: transparent !important;'>"
                                + "<i class='grid_tdGroupByCollapse " + groupByCaret + "'></i></td>"
                                + "<td class='grid_tdGroupByName' style='font-weight: 500;' colspan=" + colspan + "><div class='grid_divGroupByName'>"
                                + ((dataItems.length == 1 && dataItems[0]["defaultRow"] != null) ? "Nessun gruppo o elemento presente" : (groupByDisplayText == null || groupByDisplayText === "" || groupByDisplayText == "null") ? "Non impostato" : groupByDisplayText)
                                + "</div>"
                                + ((options.onGroupEditClick != null || (groupByField as GridGroupByItem).onEditClick != null) ? "<div style='position: relative; display: inline-flex; margin-left: 6px;" + ((options.checkboxes !== false) ? "top: -4px;" : "") + "'><i class='grid_groupByEdit " + IconClassLight.Pencil + "' style='cursor: pointer;'></div></i>" : "")
                                + "</td>";
                            puma(trGroupBy).vrAppendPuma(text);
                            if (options.lockable) puma(trGroupByLocked).vrAppendPuma(text);
                            this._groupByActualValue[(groupByField as GridGroupByItem).field] = cellValue;

                            if (this.thereAreLockedColumns())
                                puma(trGroupBy).find("i.grid_groupByEdit").parent().hide();
                            //#endregion

                            //#region Checkbox group
                            if (options.checkboxes != GridCheckboxModeEnum.None)
                            {
                                let checkboxContainer = puma(trGroupBy).find("div.grid_divGroupByName")[0];
                                if (this.thereAreLockedColumns())
                                    checkboxContainer = puma(trGroupByLocked).find("div.grid_divGroupByName")[0];

                                createCheckBox(
                                    {
                                        cssContainer: "margin-right: 5px;",
                                        onCheck: (e) =>
                                        {
                                            let parentGroupRow = e.sender.element().parentElement!.parentElement!.parentElement!.parentElement!;
                                            let childrenRows = this.getChildrenGroupRows(parentGroupRow, this._divBody);
                                            if (this.thereAreLockedColumns())
                                                childrenRows = this.getChildrenGroupRows(parentGroupRow, this._divBodyLocked);

                                            for (let childRow of childrenRows.children)
                                            {
                                                let dataItemIdNotSplitted = puma(childRow).attr("id");
                                                if (dataItemIdNotSplitted != null && dataItemIdNotSplitted.length > 0)
                                                {
                                                    let dataItemId = dataItemIdNotSplitted.split("_")[1];
                                                    if (e.checked)
                                                    {
                                                        let checkBox = puma(childRow).find(".vr-checkbox-column")[0] as HTMLInputElement;
                                                        if (checkBox.checked)
                                                            this.unselectRow(dataItemId);
                                                    }
                                                    this.selectRowInternal(dataItemId, true, true, false, true, false, true);
                                                }
                                            }
                                        }
                                    }, checkboxContainer, ControlPositionEnum.Before);
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
                                        childrenIcon.removeClass(IconClassLight.CaretRight);
                                        childrenIcon.addClass(IconClassLight.CaretDown);
                                        //#endregion
                                    }
                                }
                                //#endregion

                                //#region Icon
                                let indexIcon = puma(e.currentTarget.parentElement!).index() + 1;
                                let iconNormal = puma(puma(this._divBody).find("tr:nth-child(" + indexIcon + ")").find("i")[0]);
                                if (collapse)
                                {
                                    iconNormal.removeClass(IconClassLight.CaretDown);
                                    iconNormal.addClass(IconClassLight.CaretRight);

                                    if (options.lockable)
                                    {
                                        let iconLocked = puma(puma(this._divBodyLocked).find("tr:nth-child(" + indexIcon + ")").find("i")[0]);
                                        iconLocked.removeClass(IconClassLight.CaretDown);
                                        iconLocked.addClass(IconClassLight.CaretRight);
                                    }
                                }
                                else
                                {
                                    iconNormal.removeClass(IconClassLight.CaretRight);
                                    iconNormal.addClass(IconClassLight.CaretDown);

                                    if (options.lockable)
                                    {
                                        let iconLocked = puma(puma(this._divBodyLocked).find("tr:nth-child(" + indexIcon + ")").find("i")[0]);
                                        iconLocked.removeClass(IconClassLight.CaretRight);
                                        iconLocked.addClass(IconClassLight.CaretDown);
                                    }
                                }
                                //#endregion

                                if (options.onGroupExpandCollapse != null || (groupByField as GridGroupByItem).onExpandCollapse != null)
                                {
                                    let expandCollapseEvent = new GridGroupExpandCollapseEvent();
                                    expandCollapseEvent.sender = this;
                                    expandCollapseEvent.groupByField = groupByField.field;
                                    expandCollapseEvent.groupByDisplayField = groupByField.displayField;
                                    expandCollapseEvent.collapse = collapse;

                                    expandCollapseEvent.value = row[(groupByField as GridGroupByItem).field];
                                    if ((groupByField as GridGroupByItem).displayField != null)
                                        expandCollapseEvent.displayValue = row[(groupByField as GridGroupByItem).displayField!];

                                    let childrenItems: any[] = [];
                                    for (let childRow of childrenRows.allRows)
                                    {
                                        let dataItemId = puma(childRow).attr("dataitemid");
                                        let dataItem = this.dataSource().filter(k => k[options.dataSourceFieldId!] == dataItemId)[0];
                                        childrenItems.push(dataItem);
                                    }
                                    expandCollapseEvent.childrenItems = childrenItems;
                                    expandCollapseEvent.childrenRows = childrenRows.allRows;

                                    if (options.onGroupExpandCollapse != null)
                                        options.onGroupExpandCollapse(expandCollapseEvent);
                                    else if ((groupByField as GridGroupByItem).onExpandCollapse != null)
                                        (groupByField as GridGroupByItem).onExpandCollapse!(expandCollapseEvent);
                                }
                            });
                            //#endregion

                            //#region Edit click
                            puma(trGroupBy).find(".grid_groupByEdit").add(puma(trGroupByLocked).find(".grid_groupByEdit")).click((e: any) =>
                            {
                                if (options.onGroupEditClick != null || (groupByField as GridGroupByItem).onEditClick != null)
                                {
                                    let editClickEvent = new GridGroupEditClickEvent();
                                    editClickEvent.sender = this;
                                    editClickEvent.groupByField = groupByField.field;
                                    editClickEvent.groupByDisplayField = groupByField.displayField;

                                    editClickEvent.value = row[(groupByField as GridGroupByItem).field];
                                    if ((groupByField as GridGroupByItem).displayField != null)
                                        editClickEvent.displayValue = row[(groupByField as GridGroupByItem).displayField!];

                                    let childrenRows = this.getChildrenGroupRows(e.currentTarget.parentElement! as HTMLElement, this._divBody)
                                    let childrenItems: any[] = [];
                                    for (let childRow of childrenRows.allRows)
                                    {
                                        let dataItemId = puma(childRow).attr("dataitemid");
                                        let dataItem = this.dataSource().filter(k => k[options.dataSourceFieldId!] == dataItemId)[0];
                                        childrenItems.push(dataItem);
                                    }
                                    editClickEvent.childrenItems = childrenItems;
                                    editClickEvent.childrenRows = childrenRows.allRows;

                                    if (options.onGroupEditClick != null)
                                        options.onGroupEditClick(editClickEvent);
                                    else if ((groupByField as GridGroupByItem).onEditClick != null)
                                        (groupByField as GridGroupByItem).onEditClick!(editClickEvent);
                                }
                            });
                            //#endregion
                        }
                        groupByIndex++;
                    }
                }
            }
            j += rowAdded;
            //#endregion

            let isNewRow = false;
            let tr = puma(this.element()).find(">tbody>tr:nth-child(" + j + ")")[0] as HTMLTableRowElement;
            if (tr == null)
            {
                tr = document.createElement("tr");
                isNewRow = true;
            }
            puma(tr).addClass("p-grid-body");
            puma(tr).attr("id", rowId);
            puma(tr).attr("dataItemId", dataItemId);
            puma(tr).attr("row", i);

            let trLocked = null;
            let isNewRowLocked = false;
            if (options.lockable)
            {
                trLocked = puma(this._elementLocked).find(">tbody>tr:nth-child(" + j + ")")[0] as HTMLTableRowElement;
                if (trLocked == null)
                {
                    trLocked = document.createElement("tr");
                    isNewRowLocked = true;
                }
                puma(trLocked).addClass("p-grid-body");
                puma(trLocked).attr("id", rowId);
                puma(trLocked).attr("dataItemId", dataItemId);
                puma(trLocked).attr("row", i);
            }

            //#region Checkbox column
            if (options.checkboxes != GridCheckboxModeEnum.None)
            {
                let index = (options.groupable! || options.groupBy != null) ? (1 + options.columns!.length) : 1;
                let isNewCellCheckbox = false;
                let tdCheckbox = null;

                if (this.thereAreLockedColumns())
                    tdCheckbox = puma(trLocked).find(">td:nth-child(" + index + ")")[0] as HTMLTableCellElement;
                else
                    tdCheckbox = puma(tr).find(">td:nth-child(" + index + ")")[0] as HTMLTableCellElement;

                if (tdCheckbox == null)
                {
                    tdCheckbox = document.createElement("td");
                    isNewCellCheckbox = true;
                }
                tdCheckbox.style.cssText += "border-left: none !important;";

                puma(tdCheckbox).attr("width", 20);
                puma(tdCheckbox).addClass("vrGridTdCheckboxColumn");
                puma(tdCheckbox).attr("value", "vrGridCheckboxColumn");

                let textHTML = "<input dataItemId='" + dataItemId + "' id='" + rowId + "_CheckboxColumn' class='vrCheckBox vr-checkbox-column' type='checkbox'></input>"
                    + "<label style='display: none;' class='vrLabel vrCheckBoxLabel vr-checkboxColumn-label' for='" + rowId + "_CheckboxColumn'></label>";
                tdCheckbox.innerHTML = textHTML;

                puma(tdCheckbox).css("text-align", "center");

                if (isNewCellCheckbox)
                {
                    if (this.thereAreLockedColumns())
                        puma(trLocked).vrAppendPuma(tdCheckbox);
                    else
                        puma(tr).vrAppendPuma(tdCheckbox);
                }

                puma(tdCheckbox).off("click");
                puma(tdCheckbox).click((e: JQuery.ClickEvent) =>
                {
                    if (e.shiftKey && options.checkboxes == GridCheckboxModeEnum.MultiCheck)
                        this.selectRangeShiftKey(e.target);
                    else
                        this.selectRowInternal(dataItemId, true, false, false, true, false, true);
                });
            }
            //#endregion

            //#region Columns
            let k = (options.checkboxes != GridCheckboxModeEnum.None) ? 2 : 1;
            if (options.groupable! || options.groupBy != null)
                k += options.columns!.length;

            for (let column of options.columns!)
            {
                let isNewCell = false;
                let td = puma(tr).find(">td:nth-child(" + k + ")")[0] as HTMLTableCellElement;
                if (td == null)
                {
                    td = document.createElement("td");
                    isNewCell = true;
                }

                let tdLocked = null;
                let isNewCellLocked = false;
                if (options.lockable)
                {
                    tdLocked = puma(trLocked).find(">td:nth-child(" + k + ")")[0] as HTMLTableCellElement;
                    if (tdLocked == null)
                    {
                        tdLocked = document.createElement("td");
                        isNewCellLocked = true;
                    }
                }

                let field = column.field;
                puma(td).attr("value", column.field);
                puma(td).attr("field", field);
                td.style.cssText += "border-left: none !important;";

                if (options.lockable)
                {
                    puma(tdLocked).attr("value", column.field);
                    puma(tdLocked).attr("field", field);
                    tdLocked!.style.cssText += "border-left: none !important;";
                }

                //#region Width
                let width = (column.width != null) ? (column.width) : ((column.fitSpace == true) ? this._fitSpaceColumnPercentage + "%" : (column.type == GridColumnTypeEnum.EditButton) ? 32 : 100);
                puma(td).attr("width", width);
                if (options.lockable) puma(tdLocked).attr("width", width);

                if (column.fitSpace == true)
                {
                    puma(td).attr("fitSpace", "true");
                    if (options.lockable) puma(tdLocked).attr("fitSpace", "true");
                }
                //#endregion

                //#region Hidden
                if (column.hidden === true)
                {
                    td.style.display = "none"
                    if (isNewCell)
                        puma(tr).vrAppendPuma(td);

                    if (options.lockable)
                    {
                        tdLocked!.style.display = "none"
                        if (isNewCellLocked)
                            puma(trLocked).vrAppendPuma(tdLocked);
                    }

                    k++;
                    continue;
                }
                else
                {
                    td.style.display = "table-cell"
                    if (options.lockable) tdLocked!.style.display = "table-cell"
                }
                //#endregion

                if (!options.multilineRows)
                {
                    puma(td).addClass("grid_singleLineTableRow");
                    if (options.lockable) puma(tdLocked).addClass("grid_singleLineTableRow");
                }
                else
                {
                    puma(td).addClass("grid_multilineTableRow");
                    if (options.lockable) puma(tdLocked).addClass("grid_multilineTableRow");
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
                                let valueFormatted = this.formatValue(Number(textHTML), column.type, decimalDigits, column.roundingSettings);
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
                                let valueFormatted = this.formatValue(Number(textHTML), column.type);
                                textHTML = valueFormatted;
                            }
                        }
                        break;
                    //#endregion

                    //#region Date, Time, DateTime
                    case GridColumnTypeEnum.Date:
                    case GridColumnTypeEnum.DateTime:
                    case GridColumnTypeEnum.Time:
                        {
                            textAlign = GridAlignEnum.Center;
                            let valueFormatted = this.formatValue(new Date(textHTML), column.type, undefined, undefined, column.showSeconds);
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
                            let iconClass = (column.type == GridColumnTypeEnum.EditButton) ? IconClassLight.Pencil : "";
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
                            if (labelSettings.bold != null)
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
                            if (labelSettings.noBr === true)
                                customCss += "white-space: nowrap; overflow: hidden; text-overflow: ellipsis;";
                            //#endregion

                            this._cellLabels.set(className, { GridControlsSettings: labelSettings, columnType: column.type });

                            textHTML = "<label title='" + tooltip + "' style='" + customCss + "' class='" + className + " " + underlineOnFocus + "' dataItemId='" + dataItemId + "' id='" + rowId + "_" + column.field + "'>" + labelSettings.text + "</label>";

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
                                textHTML = "<i class='" + IconClassSolid.Circle + "' style='height: 20px; color: " + textHTML + "; display: inline-flex; align-items: center;'></i>";
                        }
                        break;
                    //#endregion
                }
                //#endregion

                //#region Text
                if (row["defaultRow"] === true)
                {
                    textHTML = "";
                    if (puma(tr).attr("defaultrow") == null)
                        puma(tr).attr("defaultrow", "defaultrow");
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
                        puma(td).css("background-color", column.cellSettings.backgroundColor);
                        if (options.lockable) puma(tdLocked).css("background-color", column.cellSettings.backgroundColor);
                    }

                    if (column.cellSettings.color != null)
                    {
                        puma(td).css("color", column.cellSettings.color);
                        if (options.lockable) puma(tdLocked).css("color", column.cellSettings.color);
                    }

                    if (column.cellSettings.css != null)
                    {
                        td.style.cssText += column.cellSettings.css;
                        if (options.lockable) tdLocked!.style.cssText += column.cellSettings.css;
                    }
                }

                if (options.rowColorProperty != null && row[options.rowColorProperty] != null && row[options.rowColorProperty] !== "")
                {
                    puma(td).css("background-color", row[options.rowColorProperty]);
                    if (options.lockable) puma(tdLocked).css("background-color", row[options.rowColorProperty]);
                }
                //#endregion

                //#region Text align
                if (column.cellSettings != null)
                    textAlign = (column.cellSettings.textAlign != null) ? column.cellSettings.textAlign : textAlign;

                puma(td).css("text-align", textAlign);
                if (options.lockable) puma(tdLocked).css("text-align", textAlign);
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
                        puma(td).attr("title", puma("<span>" + tooltip + "</span>").text());
                        if (options.lockable) puma(tdLocked).attr("title", puma("<span>" + tooltip + "</span>").text());
                    }
                }
                //#endregion

                //#region Bold
                if (column.bold === true)
                {
                    puma(td).css("font-weight", "500");
                    if (options.lockable) puma(tdLocked).css("font-weight", "500");
                }
                //#endregion

                //#endregion

                // Append td
                if (options.lockable && isNewCellLocked && column.locked)
                    puma(trLocked).vrAppendPuma(tdLocked)
                else if (isNewCell)
                    puma(tr).vrAppendPuma(td);

                k++;
            }
            //#endregion

            // Append tr
            if (isNewRow)
                puma(this.element()).find(">tbody").vrAppendPuma(tr);

            if (options.lockable && isNewRowLocked)
                puma(this._elementLocked).find(">tbody").vrAppendPuma(trLocked);

            //#region GroupBy
            if (options.groupable! || options.groupBy != null)
            {
                for (let i = options.columns!.length - 1; i >= 0; i--)
                {
                    let column = options.columns![i];

                    let display = "";
                    if (options.groupBy == null || (options.groupBy as GridGroupBySettings).fields == null || ((options.groupBy as GridGroupBySettings).fields != null && !((options.groupBy as GridGroupBySettings).fields as GridGroupByItem[]).map(k => k.field).includes(column.field)))
                        display = "display: none;";

                    let tdGroupBy = puma(tr).find("td.groupBy" + column.field);
                    if (tdGroupBy.length == 0)
                        puma(tr).prepend("<td width=16 style='border-left: none !important;" + display + "' class='groupBy" + column.field + "'></td>");
                    else
                    {
                        if (options.groupBy == null || (options.groupBy as GridGroupBySettings).fields == null)
                            tdGroupBy[0].style.display = "none";
                        else if (((options.groupBy as GridGroupBySettings).fields as GridGroupByItem[]).map(k => k.field))
                            tdGroupBy[0].style.display = "table-cell";
                    }

                    if (options.lockable)
                    {
                        let tdGroupByLocked = puma(trLocked).find("td.groupBy" + column.field);
                        if (tdGroupByLocked.length == 0)
                            puma(trLocked).prepend("<td width=16 style='border-left: none !important;" + display + "' class='groupBy" + column.field + "'></td>");
                        else
                        {
                            if (options.groupBy == null || (options.groupBy as GridGroupBySettings).fields == null)
                                tdGroupByLocked[0].style.display = "none";
                            else if (((options.groupBy as GridGroupBySettings).fields as GridGroupByItem[]).map(k => k.field))
                                tdGroupByLocked[0].style.display = "table-cell";
                        }
                    }
                }
            }
            //#endregion

            puma(tr).height(options.rowHeight!);

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
                            this.selectRowInternal(dataItemId, false, true);
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
                    puma(tr).find("td").css("background-color", backgroundColor);
                    if (options.lockable)
                        puma(trLocked).find("td").css("background-color", backgroundColor);
                }
            }
            //#endregion

            i++;
            j++;
        }
        //#endregion

        //#region Remove empty rows
        if (items.length < options.pageSize!)
        {
            let trGroupByNumber = puma(this.element()).find(".grid_trGroupBy").length;
            let to = (options.groupable && options.groupBy != null) ? options.pageSize! + trGroupByNumber : options.pageSize!;
            let from = (options.groupable && options.groupBy != null) ? items.length + 1 + trGroupByNumber : items.length + 1;
            for (let i = from; i <= to; i++)
                puma(this._divBody).find("tbody tr:nth-child(" + from + ")").remove();

            if (options.lockable)
            {
                let trGroupByNumber = puma(this._elementLocked).find(".grid_trGroupBy").length;
                let to = (options.groupable && options.groupBy != null) ? options.pageSize! + trGroupByNumber : options.pageSize!;
                let from = (options.groupable && options.groupBy != null) ? items.length + 1 + trGroupByNumber : items.length + 1;
                for (let i = from; i <= to; i++)
                    puma(this._divBodyLocked).find("tbody tr:nth-child(" + from + ")").remove();
            }
        }

        if (this._actualPageSize > options.pageSize!)
        {
            let trGroupByNumber = puma(this.element()).find(".grid_trGroupBy").length;
            for (let i = options.pageSize! + 1 + trGroupByNumber; i <= this._actualPageSize + trGroupByNumber; i++)
                puma(this._divBody).find("tbody tr:nth-child(" + (options.pageSize! + 1 + trGroupByNumber) + ")").remove();

            if (options.lockable)
            {
                let trGroupByNumber = puma(this._elementLocked).find(".grid_trGroupBy").length;
                for (let i = options.pageSize! + 1 + trGroupByNumber; i <= this._actualPageSize + trGroupByNumber; i++)
                    puma(this._divBodyLocked).find("tbody tr:nth-child(" + (options.pageSize! + 1 + trGroupByNumber) + ")").remove();
            }
        }
        this._actualPageSize = options.pageSize!;
        //#endregion

        //#region OnDataBound
        if (options.onDataBound != null && triggerDataBound)
        {
            let onDataBoundEvent = new GridOnDataBoundEvent();
            onDataBoundEvent.sender = this;
            options.onDataBound(onDataBoundEvent);
        }
        //#endregion

        //#region Footer
        if (options.footer !== false)
        {
            let footer = options.footer as GridFooterSettings;
            let maxLength = (options.serverBinding !== false) ? this._responseForServerBinding[(options.serverBinding! as GridServerBindSettings).itemCountPropertyName!] : dataItems.length;
            if (options.pageSize! < maxLength)
            {
                let pageSelected = this.pageSelected();
                let numberOfPages = Math.trunc(maxLength / options.pageSize!);
                if (maxLength % options.pageSize! > 0)
                    numberOfPages += 1;

                //#region Pages
                if (footer.showPagination && options.pageSize! != 0)
                {
                    puma("#" + this._elementId + "_divPagination").remove();
                    let spanPagination = puma("<span id='" + this._elementId + "_divPagination' class='p-grid-pagination'></span>").prependTo(this._divFooter);

                    //#region Previous buttons
                    createButton(
                        {
                            icon: IconClassLight.Backward,
                            css: "border-left: none; border-top-left-radius: 5px; border-bottom-left-radius: 5px;",
                            onClick: (e) =>
                            {
                                this.pageSelected(1);
                            }
                        }, spanPagination, null, this._elementId + "_btnFirstPage");

                    createButton(
                        {
                            icon: IconClassLight.BackwardStep,
                            onClick: (e) =>
                            {
                                let pageToSelect = this.pageSelected() - 1;
                                if (pageToSelect < 1)
                                    pageToSelect = 1;

                                this.pageSelected(pageToSelect);
                            }
                        }, spanPagination, null, this._elementId + "_btnPreviousPage");
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
                        puma("<button id='" + this._elementId + "_btnPage_" + (startingIndex - 1) + "'></button>").vrAppendToPuma(spanPagination);
                        createButton(
                            {
                                text: "...",
                                onClick: (e) =>
                                {
                                    this.pageSelected(startingIndex - 1);
                                }
                            }, null, null, this._elementId + "_btnPage_" + (startingIndex - 1));
                    }

                    for (let i = startingIndex; i <= endIndex; i++)
                    {
                        if (i == endIndex && noMore)
                            break;

                        puma("<button id='" + this._elementId + "_btnPage_" + i + "'></button>").vrAppendToPuma(spanPagination);
                        createButton(
                            {
                                text: (i == endIndex) ? ((startingIndex == endIndex) ? String(i) : "...") : String(i),
                                class: (i == pageSelected) ? "p-grid-pageSelected" : undefined,
                                onClick: (e) =>
                                {
                                    let index = Number(puma(e.sender.element()).attr("id").split("_").last());
                                    this.pageSelected(index);
                                }
                            }, null, null, this._elementId + "_btnPage_" + i);
                    }
                    //#endregion

                    //#region Next buttons
                    puma("<button id='" + this._elementId + "_btnNextPage'></button>").vrAppendToPuma(spanPagination);
                    createButton(
                        {
                            icon: IconClassLight.ForwardStep,
                            onClick: (e) =>
                            {
                                let pageToSelect = this.pageSelected() + 1;
                                if (pageToSelect > numberOfPages)
                                    pageToSelect = numberOfPages;

                                this.pageSelected(pageToSelect);
                            }
                        }, null, null, this._elementId + "_btnNextPage");

                    puma("<button id='" + this._elementId + "_btnLastPage'></button>").vrAppendToPuma(spanPagination);
                    createButton(
                        {
                            icon: IconClassLight.Forward,
                            css: "border-top-right-radius: 5px; border-bottom-right-radius: 5px;",
                            onClick: (e) =>
                            {
                                this.pageSelected(numberOfPages);
                            }
                        }, null, null, this._elementId + "_btnLastPage");
                    //#endregion
                }
                //#endregion

                //#region Total elements
                if (footer.totalElements)
                {
                    puma("#" + this._elementId + "TotalsLabel").remove();
                    puma("<span id='" + this._elementId + "TotalsLabel' class='p-grid-totalElements'></span>").vrAppendToPuma(this._divFooter);

                    if (typeof (footer.totalElements) == "boolean" && footer.totalElements === true)
                    {
                        if (options.pageSize == 0)
                            puma("#" + this._elementId + "TotalsLabel").html("Nessun elemento");
                        else
                        {
                            if (lastIndex > maxLength)
                                lastIndex = maxLength;

                            let pagesText = firstIndex + " - " + lastIndex + " di " + maxLength + ((maxLength == 1) ? " elemento" : " elementi") +
                                " - " + pageSelected + " di " + numberOfPages + " pagine";

                            if (options.serverBinding !== false)
                            {
                                let indexFrom = options.pageSize! * (this.pageSelected() - 1) + 1;
                                let indexTo = options.pageSize! * (this.pageSelected() - 1) + dataItems.length;

                                pagesText = indexFrom + " - " + indexTo + " di " + maxLength + ((maxLength == 1) ? " elemento" : " elementi") +
                                    " - " + pageSelected + " di " + numberOfPages + " pagine";
                            }

                            puma("#" + this._elementId + "TotalsLabel").html(pagesText);
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

                        puma("#" + this._elementId + "TotalsLabel").html(totalElementsText);
                    }
                }
                //#endregion                
            }
            else
            {
                //#region Clear footer
                if (footer.showPagination)
                    puma("#" + this._elementId + "_divPagination").remove();

                if (footer.totalElements)
                {
                    puma("#" + this._elementId + "TotalsLabel").remove();
                    puma("<span id='" + this._elementId + "TotalsLabel' class='p-grid-totalElements'></span>").vrAppendToPuma(this._divFooter);
                    let realDataItems = dataItems.filter(k => k["defaultRow"] == null || k["defaultRow"] == false);

                    if (typeof (footer.totalElements) == "boolean" && footer.totalElements === true)
                    {
                        if (realDataItems.length == 0)
                            puma("#" + this._elementId + "TotalsLabel").html("Nessun elemento");
                        else
                            puma("#" + this._elementId + "TotalsLabel").html(dataItems.length + ((realDataItems.length == 1) ? " elemento" : " elementi"));
                    }
                    else
                    {
                        let totalElementTemplateEvent = new GridTotalElementTemplateEvent();
                        totalElementTemplateEvent.dataItems = realDataItems;
                        totalElementTemplateEvent.firstIndex = firstIndex;
                        totalElementTemplateEvent.lastIndex = lastIndex;
                        let totalElementsText = footer.totalElements(totalElementTemplateEvent);

                        puma("#" + this._elementId + "TotalsLabel").html(totalElementsText);
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
                //#region Worker totals request
                puma(this._divTotals).find("td").empty();
                if (options.lockable)
                    puma(this._divTotalsLocked).find("td").empty();

                let workerTotalsRequest = new WorkerTotalsRequest();
                workerTotalsRequest.isGroup = false;
                workerTotalsRequest.dataItems = dataItems;
                workerTotalsRequest.columnOptions = options.columns!.filter(k => k.aggregate != null && k.aggregate !== false && k.hidden !== true).map(k => 
                {
                    let td = puma(this._divTotals).find("td[field='" + k.field + "']")[0];
                    if (options.lockable && td == null)
                        td = puma(this._divTotalsLocked).find("td[field='" + k.field + "']")[0];

                    let decimalDigits = puma(td).attr("decimalDigits");
                    let aggregateMode = Number(puma(td).attr("aggregate"));

                    return {
                        field: k.field,
                        decimalDigits: decimalDigits,
                        aggregateMode: aggregateMode,
                        type: k.type!,
                        countZeroInAverage: k.countZeroInAverage,
                        roundingSettings: k.roundingSettings
                    }
                });
                this._workerTotals.postMessage(workerTotalsRequest);
                //#endregion

                //#region Worker totals response
                this._workerTotals.onmessage = (e) =>
                {
                    this.createTotals(e.data, false);
                };
                //#endregion
            }
        }
        //#endregion

        //#region GroupBy
        if (options.groupable! && options.groupBy != null)
        {
            //#region Group totals
            let workerTotalsGroupRequest = new WorkerTotalsRequest();
            workerTotalsGroupRequest.groupItems = [];
            workerTotalsGroupRequest.isGroup = true;

            let trGroupByList = Array.from<HTMLElement>(puma(this.element()).find(".grid_trGroupBy"));
            trGroupByList.vrPushRange(Array.from<HTMLElement>(puma(this._elementLocked).find(".grid_trGroupByLocked")))

            for (let tr of trGroupByList)
            {
                let children = [];
                if (puma(tr).hasClass("grid_trGroupByLocked"))
                    children = this.getChildrenGroupRows(tr, this._divBodyLocked).children;
                else
                    children = this.getChildrenGroupRows(tr, this._divBody).children;

                let level = Number(puma(tr).attr("level"));

                //#region Children number
                if (!options.serverBinding)
                {
                    let td = puma(tr).find("td.grid_tdGroupByName");
                    let childrenNumber = children.length;

                    if (this.dataSource().length > 1)
                        td.find("div.grid_divGroupByName").vrAppendPuma("<span style='margin-left: 5px;'>(" + childrenNumber + ")</span>");
                }
                //#endregion

                //#region Totals group
                if (this._showTotals && level == 0)
                {
                    let value = puma(tr).attr("value").replace(/\(/g, "").replace(/\)/g, "").replace(/,/g, "").replace(/\[/g, "").replace(/\]/g, "").replace(/:/g, "");

                    let clonedTr = puma(children.vrLast()).clone();
                    clonedTr.addClass("p-grid-totalsGroup");
                    clonedTr.find("td").empty();
                    clonedTr.vrInsertAfterPuma(children.vrLast());
                    clonedTr.addClass(this._elementId + "_totalGroupBy" + value);

                    let workerTotalsGroupItem = new WorkerTotalsGroupItem();
                    workerTotalsGroupItem.groupValue = value;

                    let childrenItems = [];
                    for (let child of children)
                    {
                        let dataItemId = puma(child).attr("dataitemid");
                        childrenItems.push(dataItems.filter(k => k[options.dataSourceFieldId!] == dataItemId)[0]);
                    }
                    workerTotalsGroupItem.dataItems = childrenItems;
                    workerTotalsGroupRequest.groupItems.push(workerTotalsGroupItem);
                }
                //#endregion
            }

            if (this._showTotals && options.columns!.filter(k => k.aggregate != null && k.aggregate !== false).length > 0)
            {
                //#region WorkerTotalsGroupRequest
                workerTotalsGroupRequest.columnOptions = options.columns!.filter(k => k.aggregate != null && k.aggregate !== false && k.hidden !== true).map(k =>
                {
                    let td = puma(this._divTotals).find("td[field='" + k.field + "']")[0];
                    if (options.lockable && td == null)
                        td = puma(this._divTotalsLocked).find("td[field='" + k.field + "']")[0];

                    let decimalDigits = puma(td).attr("decimalDigits");
                    let aggregateMode = Number(puma(td).attr("aggregate"));

                    return {
                        field: k.field,
                        decimalDigits: decimalDigits,
                        aggregateMode: aggregateMode,
                        type: k.type!,
                        countZeroInAverage: k.countZeroInAverage,
                        roundingSettings: k.roundingSettings
                    }
                });
                this._workerTotalsGroup.postMessage(workerTotalsGroupRequest);
                //#endregion

                //#region WorkerTotalsGroupResponse
                this._workerTotalsGroup.onmessage = (e) =>
                {
                    this.createTotals(e.data, true);
                };
                //#endregion
            }

            //#endregion
        }
        //#endregion

        //#region Recalculate Width/Height & AdjustTrHeight
        this.recalculateHeight();
        this.recalculateWidth();
        this.recalculateHeight();

        this.adjustTrHeight();
        //#endregion

        this._deletedItems = [];
        if (this._checkedItemsForFiltering != null && this._checkedItemsForFiltering.length > 0)
            this.selectRows(this._checkedItemsForFiltering.map(k => k[options.dataSourceFieldId!]), undefined, false);
    }

    private createTotals(data: any[], isGroup: boolean)
    {
        if (!isGroup)
        {
            for (let total of data)
            {
                let td = puma(this._divTotals).find("td[field='" + total.field + "']")[0];

                let options = this.getOptions();
                if (options.lockable && td == null)
                    td = puma(this._divTotalsLocked).find("td[field='" + total.field + "']")[0];

                this.writeTotals(total, td);
            }
        }
        else
        {
            for (let totalsGroup of data)
            {
                for (let total of totalsGroup.totals)
                {
                    let tdList = Array.from<HTMLElement>(puma("." + this._elementId + "_totalGroupBy" + totalsGroup.groupValue).find("td[field='" + total.field + "']"))
                    for (let td of tdList)
                        this.writeTotals(total, td);
                }
            }
        }
    }

    private writeTotals(total: WorkerTotalsResult, td: HTMLElement)
    {
        if (td != null)
        {
            let valueFormatted = this.formatValue(total.total, total.type, total.decimalDigits, total.roundingSettings);
            td.innerHTML = valueFormatted;
            puma(td).attr("title", td.innerHTML);
        }
    }

    private formatValue(value: any, columnType?: GridColumnTypeEnum, decimalDigits?: number, roundingSettings?: NumberFormatRoundingSettings, showSeconds?: boolean)
    {
        let options = this.getOptions();
        if (columnType == null) columnType = GridColumnTypeEnum.String;

        //#region Number, Currency, Percentage
        if (columnType == GridColumnTypeEnum.Number || columnType == GridColumnTypeEnum.Currency || columnType == GridColumnTypeEnum.Percentage)
        {
            if (roundingSettings == null)
                roundingSettings = options.roundingSettings;

            let formatSettings = new NumberFormatSettings(roundingSettings);
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
        else if (columnType == GridColumnTypeEnum.Date || columnType == GridColumnTypeEnum.DateTime || columnType == GridColumnTypeEnum.Time)
        {
            value = Date.vrFixDateString(value);
            if (columnType == GridColumnTypeEnum.Date)
                return (value == "" || !Date.vrIsValidDate(value)) ? "" : new Date(value).vrToItalyString(DateModeEnum.Date);
            else if (columnType == GridColumnTypeEnum.DateTime)
                return (value == "" || !Date.vrIsValidDate(value)) ? "" : new Date(value).vrToItalyString(DateModeEnum.DateTime, showSeconds);
            else if (columnType == GridColumnTypeEnum.Time)
                return (value == "" || !Date.vrIsValidDate(value)) ? "" : new Date(value).vrToItalyString(DateModeEnum.Time, showSeconds);
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

        let itemOriginalDatasource = this.originalDataSource().filter(k => k[options.dataSourceFieldId!] == dataItemId)[0];
        let itemOriginalDatasourceIndex = this.originalDataSource().indexOf(itemOriginalDatasource);
        let itemDatasource = this.dataSource().filter(k => k[options.dataSourceFieldId!] == dataItemId)[0];
        let itemDatasourceIndex = this.dataSource().indexOf(itemDatasource);
        if (itemOriginalDatasource != null)
        {
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
            let itemToDelete = this.dataSource().filter(k => k[options.dataSourceFieldId!] == itemId)[0];
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
            row.cells = puma(rowElement).find("td");
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
        let rows = this.dataSource();
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
        let checkboxList: HTMLInputElement[] = Array.from<HTMLInputElement>(puma(this._divBody).find(".vr-checkbox-column") as any);
        if (this.thereAreLockedColumns())
            checkboxList = Array.from<HTMLInputElement>(puma(this._divBodyLocked).find(".vr-checkbox-column") as any);

        let checkboxCheckedList = checkboxList.filter(k => k.checked);

        let checkedItems: any[] = [];
        for (let checkboxChecked of checkboxCheckedList)
        {
            let rowElement = checkboxChecked.closest("tr");
            if (rowElement != null)
            {
                let rowId = puma(rowElement).attr("dataItemId");
                let checkedItem = this.dataSource().filter(k => k[options.dataSourceFieldId!] == rowId)[0];
                if (checkedItem != null)
                    checkedItems.push(checkedItem);
            }
        }
        return checkedItems;
    }

    getCheckedValues()
    {
        let options = this.getOptions();
        return this.getCheckedItems().map(k => k != null && k[options.dataSourceFieldId!]);
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
        this.unCheckAllRows(triggerChange);
    }

    checkAllRows(triggerChange = true)
    {
        let options = this.getOptions();
        if (options.checkboxes == GridCheckboxModeEnum.SingleCheck)
            return;

        let headerCheckbox = puma("#" + puma(this.element()).attr("id") + "header_CheckboxColumn");
        headerCheckbox.attr("checked", "checked");
        if (headerCheckbox[0] != null)
            headerCheckbox[0].checked = true;

        let checkboxList: HTMLInputElement[] = Array.from<HTMLInputElement>(puma(this._divBody).find(".vr-checkbox-column") as any);
        if (this.thereAreLockedColumns())
            checkboxList = Array.from<HTMLInputElement>(puma(this._divBodyLocked).find(".vr-checkbox-column") as any);

        for (let checkbox of checkboxList)
        {
            puma(checkbox).attr("checked", "checked");
            checkbox.checked = true;
        }

        headerCheckbox.removeClass("indeterminateVrCheckbox");

        //#region Group by
        if (options.groupable! && options.groupBy != null && options.checkboxes != GridCheckboxModeEnum.None)
        {
            let groupByRows = puma(this._divBody).find(".grid_trGroupBy");
            if (this.thereAreLockedColumns())
                groupByRows = puma(this._divBodyLocked).find(".grid_trGroupBy");

            for (let groupByRow of Array.from(groupByRows))
            {
                let checkBox = puma(groupByRow).find("input");
                (checkBox[0] as HTMLInputElement).checked = true;
                checkBox.removeClass("indeterminateVrCheckbox");
            }
        }
        //#endregion

        this._checkedItemsForFiltering = this.getCheckedItems();

        //#region Event
        if (triggerChange && options.onSelectAllRows != null)
        {
            let selectAllRowsEvent = new GridSelectAllRowsEvent();
            selectAllRowsEvent.sender = this;
            options.onSelectAllRows(selectAllRowsEvent);
        }
        //#endregion
    }

    unCheckAllRows(triggerChange = true)
    {
        let options = this.getOptions();
        let headerCheckbox = puma("#" + puma(this.element()).attr("id") + "header_CheckboxColumn");
        headerCheckbox.removeAttr("checked");
        if (headerCheckbox[0] != null)
            headerCheckbox[0].checked = false;

        let checkboxList: HTMLInputElement[] = Array.from<HTMLInputElement>(puma(this._divBody).find(".vr-checkbox-column") as any);
        if (this.thereAreLockedColumns())
            checkboxList = Array.from<HTMLInputElement>(puma(this._divBodyLocked).find(".vr-checkbox-column") as any);

        for (let checkbox of checkboxList)
        {
            puma(checkbox).removeAttr("checked");
            checkbox.checked = false;
        }

        headerCheckbox.removeClass("indeterminateVrCheckbox");

        //#region Group by
        if (options.groupable! && options.groupBy != null && options.checkboxes != GridCheckboxModeEnum.None)
        {
            let groupByRows = puma(this._divBody).find(".grid_trGroupBy");
            if (this.thereAreLockedColumns())
                groupByRows = puma(this._divBodyLocked).find(".grid_trGroupBy");

            for (let groupByRow of Array.from(groupByRows))
            {
                let checkBox = puma(groupByRow).find("input");
                (checkBox[0] as HTMLInputElement).checked = false;
                puma(checkBox).removeAttr("checked");
                checkBox.removeClass("indeterminateVrCheckbox");
            }
        }
        //#endregion

        this._checkedItemsForFiltering = [];

        //#region Event
        if (triggerChange && options.onUnselectAllRows != null)
        {
            let unselectAllRowsEvent = new GridUnselectAllRowsEvent();
            unselectAllRowsEvent.sender = this;
            options.onUnselectAllRows(unselectAllRowsEvent);
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
        this.selectRowInternal(dataItemId, false, false, triggerChange);
    }

    selectRows(itemIdList: string[], property?: string, triggerChange = true)
    {
        let options = this.getOptions();
        if (options.checkboxes == GridCheckboxModeEnum.SingleCheck)
            itemIdList = [itemIdList.vrLast()];

        //#region Other property instead of 'id'
        if (property != null)
        {
            let options = this.getOptions();
            let filteredDataSourceList: any[] = [];
            itemIdList = itemIdList.vrDistinct();
            for (let itemId of itemIdList)
                filteredDataSourceList.vrPushRange(this.dataSource().filter(k => k[property] == itemId));

            itemIdList = filteredDataSourceList.map(k => k[options.dataSourceFieldId!]);
        }
        //#endregion

        for (let itemId of itemIdList)
            this.selectRow(itemId, triggerChange);
    }

    selectRow(itemId: string, triggerChange = true)
    {
        this.selectRowInternal(itemId, false, false, true, triggerChange);
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
            this.selectRowInternal(dataItemId, true, true, false, true, true);
        }
    }

    private selectRowInternal(itemId: string, fromCheckboxInput = false, fromGroupOrRow = false, fromMethodCall = false, triggerChange = true, shiftKey = false, checkbox = false)
    {
        let options = this.getOptions();
        let checkboxList: HTMLInputElement[] = Array.from<HTMLInputElement>(puma(this._divBody).find(".vr-checkbox-column") as any);
        let checkboxGroupList: HTMLInputElement[] = Array.from<HTMLInputElement>(puma(this._divBody).find(".grid_divGroupByName input") as any);

        if (this.thereAreLockedColumns())
        {
            checkboxList = Array.from<HTMLInputElement>(puma(this._divBodyLocked).find(".vr-checkbox-column") as any);
            checkboxGroupList = Array.from<HTMLInputElement>(puma(this._divBodyLocked).find(".grid_divGroupByName input") as any);
        }

        //#region Select checkbox
        let dataItem = null;
        let checkboxToSelect = checkboxList.filter(k => puma(k as any).attr("dataItemId") == itemId)[0];
        if (checkboxToSelect != null)
        {
            if (checkboxToSelect.checked)
            {
                let checkedCheckboxList = checkboxList.filter(k => k.checked);
                if (options.checkboxes == GridCheckboxModeEnum.SingleCheck || (options.checkboxes == GridCheckboxModeEnum.MultiCheck && !fromCheckboxInput && checkedCheckboxList.length > 1))
                {
                    if (!fromMethodCall)
                    {
                        for (let checkbox of checkboxList)
                        {
                            puma(checkbox).removeAttr("checked");
                            checkbox.checked = false;
                        }

                        for (let checkbox of checkboxGroupList)
                        {
                            puma(checkbox).removeAttr("checked");
                            checkbox.checked = false;
                            puma(checkbox).removeClass("indeterminateVrCheckbox");
                        }

                        if (this._checkedItemsForFiltering != null)
                            this._checkedItemsForFiltering.vrDeleteAllBy(k => k[options.dataSourceFieldId!] == itemId);
                    }

                    puma(checkboxToSelect).attr("checked", "checked");
                    checkboxToSelect.checked = true;
                }
                else if (fromGroupOrRow)
                    this.unselectRow(itemId, triggerChange);
            }
            else
            {
                if ((options.checkboxes == GridCheckboxModeEnum.SingleCheck || !fromCheckboxInput) && !fromMethodCall)
                {
                    for (let checkbox of checkboxList)
                    {
                        puma(checkbox).removeAttr("checked");
                        checkbox.checked = false;

                        if (this._checkedItemsForFiltering != null)
                            this._checkedItemsForFiltering.vrDeleteAllBy(k => k[options.dataSourceFieldId!] == itemId);
                    }

                    for (let checkbox of checkboxGroupList)
                    {
                        puma(checkbox).removeAttr("checked");
                        checkbox.checked = false;
                        puma(checkbox).removeClass("indeterminateVrCheckbox");
                    }
                }

                if (!fromGroupOrRow && !fromMethodCall)
                {
                    puma(checkboxToSelect).removeAttr("checked");
                    checkboxToSelect.checked = false;

                    if (this._checkedItemsForFiltering != null)
                        this._checkedItemsForFiltering.vrDeleteAllBy(k => k[options.dataSourceFieldId!] == itemId);
                }
                else
                {
                    puma(checkboxToSelect).attr("checked", "checked");
                    checkboxToSelect.checked = true;
                }
            }

            dataItem = this.dataSource().filter(k => k[options.dataSourceFieldId!] == itemId)[0];
        }
        //#endregion

        let headerCheckbox = puma("#" + puma(this.element()).attr("id") + "header_CheckboxColumn");
        headerCheckbox.addClass("indeterminateVrCheckbox");

        //#region All rows checked
        let checkedItems = this.getCheckedItems();
        if (this._checkedItemsForFiltering != null)
        {
            for (let checkedItem of checkedItems)
            {
                if (this._checkedItemsForFiltering.length == 0 || !this._checkedItemsForFiltering.map(k => k[options.dataSourceFieldId!]).includes(checkedItem[options.dataSourceFieldId!]))
                    this._checkedItemsForFiltering.push(checkedItem);
            }
        }

        if (checkedItems.length == checkboxList.length)
        {
            headerCheckbox.removeClass("indeterminateVrCheckbox");
            headerCheckbox.attr("checked", "checked");

            if (headerCheckbox[0] != null)
                headerCheckbox[0].checked = true;
        }
        else if (checkedItems.length == 0)
            headerCheckbox.removeClass("indeterminateVrCheckbox");
        //#endregion

        //#region Group
        this.manageGroupCheckParent(checkboxToSelect);
        //#endregion

        //#region Event
        if (options.onSelectRow != null && dataItem != null && triggerChange)
        {
            let rowElement = puma(checkboxToSelect).closest("tr")[0] as HTMLTableRowElement;

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
            selectRowEvent.shiftKey = shiftKey;
            selectRowEvent.fromCheckbox = checkbox;
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
            let parentGroupRow = checkbox.parentElement!.parentElement!;
            let i = puma(parentGroupRow).index();
            while (!puma(parentGroupRow).hasClass("grid_trGroupBy"))
            {
                parentGroupRow = puma(this._divBody).find("tr:nth-child(" + i + ")")[0];
                if (this.thereAreLockedColumns())
                    parentGroupRow = puma(this._divBodyLocked).find("tr:nth-child(" + i + ")")[0];

                i--;
            }
            //#endregion

            //#region Checkbox management
            while ((Number(puma(parentGroupRow).attr("level")) == 0 && puma(parentGroupRow).hasClass("grid_trGroupBy")) || (Number(puma(parentGroupRow).attr("level")) > 0 || !puma(parentGroupRow).hasClass("grid_trGroupBy")))
            {
                if (!puma(parentGroupRow).hasClass("grid_trGroupBy"))
                {
                    parentGroupRow = puma(this._divBody).find("tr:nth-child(" + i + ")")[0];
                    if (this.thereAreLockedColumns())
                        parentGroupRow = puma(this._divBodyLocked).find("tr:nth-child(" + i + ")")[0];

                    i--;
                    continue;
                }

                let checkBoxParentGroup = puma(parentGroupRow).find("input");

                //#region Check or not 
                let childrenRows = this.getChildrenGroupRows(parentGroupRow, this._divBody);
                if (this.thereAreLockedColumns())
                    childrenRows = this.getChildrenGroupRows(parentGroupRow, this._divBodyLocked);

                let numberOfCheckedChildren = this.getCheckedChildrenGroupRows(parentGroupRow, this._divBody).length;
                if (this.thereAreLockedColumns())
                    numberOfCheckedChildren = this.getCheckedChildrenGroupRows(parentGroupRow, this._divBodyLocked).length;

                (checkBoxParentGroup[0] as HTMLInputElement).checked = false;
                checkBoxParentGroup.removeClass("indeterminateVrCheckbox");

                if (numberOfCheckedChildren == childrenRows.children.length)
                    (checkBoxParentGroup[0] as HTMLInputElement).checked = true;
                else if (numberOfCheckedChildren == 0)
                    (checkBoxParentGroup[0] as HTMLInputElement).checked = false;
                else
                    checkBoxParentGroup.addClass("indeterminateVrCheckbox");
                //#endregion

                if (Number(puma(parentGroupRow).attr("level")) == 0)
                    break;

                parentGroupRow = puma(this._divBody).find("tr:nth-child(" + i + ")")[0];
                if (this.thereAreLockedColumns())
                    parentGroupRow = puma(this._divBodyLocked).find("tr:nth-child(" + i + ")")[0];

                i--;
            }
        }
    }

    unselectRows(itemIdList: string[], property?: string, triggerChange = true)
    {
        //#region Other property instead of 'id'
        if (property != null)
        {
            let options = this.getOptions();
            let filteredDataSourceList: any[] = [];
            itemIdList = itemIdList.vrDistinct();
            for (let itemId of itemIdList)
                filteredDataSourceList.vrPushRange(this.dataSource().filter(k => k[property] == itemId));

            itemIdList = filteredDataSourceList.map(k => k[options.dataSourceFieldId!]);
        }
        //#endregion

        for (let itemId of itemIdList)
            this.unselectRow(itemId, triggerChange);
    }

    unselectRow(itemId: string, triggerChange = true)
    {
        let options = this.getOptions();
        let checkboxList: HTMLInputElement[] = Array.from<HTMLInputElement>(puma(this._divBody).find(".vr-checkbox-column") as any);
        if (this.thereAreLockedColumns())
            checkboxList = Array.from<HTMLInputElement>(puma(this._divBodyLocked).find(".vr-checkbox-column") as any);

        let headerCheckbox = puma("#" + puma(this.element()).attr("id") + "header_CheckboxColumn");
        headerCheckbox.removeAttr("checked");
        if (headerCheckbox[0] != null)
            headerCheckbox[0].checked = false;

        let checkedItems = this.getCheckedItems();
        if (this._checkedItemsForFiltering != null)
        {
            for (let checkedItem of checkedItems)
                this._checkedItemsForFiltering.vrDeleteItem(checkedItem, options.dataSourceFieldId!);
        }

        if (checkedItems.length == 0)
            headerCheckbox.removeClass("indeterminateVrCheckbox");
        else
            headerCheckbox.addClass("indeterminateVrCheckbox");

        let dataItem = null;
        let checkboxToSelect = checkboxList.filter(k => puma(k as any).attr("dataItemId") == itemId)[0];
        if (checkboxToSelect != null)
        {
            if (checkboxToSelect.checked)
            {
                puma(checkboxToSelect).removeAttr("checked");
                checkboxToSelect.checked = false;
            }
            dataItem = this.dataSource().filter(k => k[options.dataSourceFieldId!] == itemId)[0];
        }

        //#region Event
        if (options.onUnselectRow != null && triggerChange)
        {
            let unselectRowEvent = new GridUnselectRowEvent();
            unselectRowEvent.sender = this;
            unselectRowEvent.rowElement = checkboxToSelect.closest("tr") as HTMLTableRowElement;
            unselectRowEvent.dataItem = dataItem;
            options.onUnselectRow(unselectRowEvent);
        }
        //#endregion
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
            let thJq = puma(this._divHeader).find("th[value='" + field + "']");
            if (options.lockable && thJq[0] == null)
                thJq = puma(this._divHeaderLocked).find("th[value='" + field + "']");

            if (thJq[0] != null)
            {
                thJq[0].style.cssText += "background-color: #e3f1fa !important; color: #000 !important;";

                if (thJq.find(".grid_headerThContent")[0] != null)
                    thJq.find(".grid_headerThContent")[0].style.cssText += "color: #000 !important;";
            }

            thJq.find("i").removeClass(IconClassLight.CaretUp);
            thJq.find("i").removeClass(IconClassLight.CaretDown);
            thJq.removeAttr("sortMode");
            this._actualSortingInfo = null;

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

        let thJq = puma(this._divHeader).find("th[value='" + field + "']");
        if (options.lockable && thJq[0] == null)
            thJq = puma(this._divHeaderLocked).find("th[value='" + field + "']");

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
            thJq.find("i").removeClass(IconClassLight.CaretDown);
            thJq.find("i").removeClass(IconClassLight.CaretUp);

            thJq.find("i").addClass(IconClassLight.CaretUp);
            thJq.attr("sortMode", GridSortDirectionEnum.Asc);
        }
        else
        {
            thJq.find("i").removeClass(IconClassLight.CaretDown);
            thJq.find("i").removeClass(IconClassLight.CaretUp);

            thJq.find("i").addClass(IconClassLight.CaretDown);
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
            showLoader();

        window.setTimeout(() =>
        {
            this._cellButtons = new Map<string, GridControlData>();
            this._cellIcons = new Map<string, GridControlData>();
            this._cellCustoms = new Map<string, GridControlData>();
            this._cellLabels = new Map<string, GridControlData>();
            this._cellImages = new Map<string, GridControlData>();

            let items: any[] = this.dataSource().map(k => k);
            if (options.groupBy != null)
            {
                (options.groupBy as GridGroupBySettings).internalSortBy = { field: field, direction: gridSortModeEnum };
                this.sortingGroupFields(items);
            }
            else
                items.vrSortBy([field], (gridSortModeEnum == GridSortDirectionEnum.Asc));

            if (rebind)
            {
                this.drawTable(items);
                this.manageControls();
            }
            hideLoader();
        });
    }

    private sortingGroupFields(dataItems: any[])
    {
        let options = this.getOptions();
        let sortingFields: string[] = [];

        //#region External group sort
        let sortByField = (options.groupBy as GridGroupBySettings).sortBy != null ? ((options.groupBy as GridGroupBySettings).sortBy! as GridSortSettings).field : null;
        if (sortByField != null)
        {
            if (((options.groupBy as GridGroupBySettings).sortBy! as GridSortSettings).direction == GridSortDirectionEnum.Desc)
                sortingFields.push("-" + sortByField);
            else
                sortingFields.push(sortByField);
        }
        else
        {
            if ((options.groupBy as GridGroupBySettings).fields != null)
            {
                for (let groupByField of ((options.groupBy as GridGroupBySettings).fields as GridGroupByItem[]))
                {
                    if (groupByField == null)
                        continue;

                    if (!sortingFields.includes((groupByField as GridGroupByItem).field))
                        sortingFields.push((groupByField as GridGroupByItem).field);
                }
            }
        }
        //#endregion

        //#region Internal group sort
        if ((options.groupBy as GridGroupBySettings).internalSortBy != null)
        {
            let internalSortByField = ((options.groupBy as GridGroupBySettings).internalSortBy as GridSortSettings).field;
            if (internalSortByField != null)
            {
                if (((options.groupBy as GridGroupBySettings).internalSortBy! as GridSortSettings).direction == GridSortDirectionEnum.Desc)
                    sortingFields.push("-" + internalSortByField);
                else
                    sortingFields.push(internalSortByField);
            }
        }
        //#endregion

        dataItems.vrSortBy(sortingFields);
    }
    //#endregion

    //#region Column
    column(field: string)
    {
        let options = this.getOptions();
        let column = options.columns!.filter(k => k.field == field)[0];
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
                puma(this._divHeader).find("th[value='" + field + "']").find("span.grid_headerThContent").html(title);

                let options = this.getOptions();
                if (options.lockable)
                    puma(this._divHeaderLocked).find("th[value='" + field + "']").find("span.grid_headerThContent").html(title);
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
        puma(this._divHeader).find("th[value='" + field + "']").hide();
        puma(this._divFilters).find("td[value='" + field + "']").hide();
        puma(this._divBody).find("td[value='" + field + "']").hide();
        puma(this._divTotals).find("td[value='" + field + "']").hide();

        let options = this.getOptions();
        if (options.lockable)
        {
            puma(this._divHeaderLocked).find("th[value='" + field + "']").hide();
            puma(this._divFiltersLocked).find("td[value='" + field + "']").hide();
            puma(this._divBodyLocked).find("td[value='" + field + "']").hide();
            puma(this._divTotalsLocked).find("td[value='" + field + "']").hide();
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

    showColumns(fields: string[], update = true)
    {
        for (let field of fields)
            this.showColumn(field, false);

        if (update)
            this.update();
    }

    showColumn(field: string, updateDataSource = true)
    {
        puma(this._divHeader).find("th[value='" + field + "']").show();
        puma(this._divFilters).find("td[value='" + field + "']").show();
        puma(this._divBody).find("td[value='" + field + "']").show();
        puma(this._divTotals).find("td[value='" + field + "']").show();

        let options = this.getOptions();
        if (options.lockable)
        {
            puma(this._divHeaderLocked).find("th[value='" + field + "']").show();
            puma(this._divFiltersLocked).find("td[value='" + field + "']").show();
            puma(this._divBodyLocked).find("td[value='" + field + "']").show();
            puma(this._divTotalsLocked).find("td[value='" + field + "']").show();
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

                    puma(this._divHeader).find("th[value='" + "editButton" + "']").attr("locked", "locked");
                    puma(this._divHeader).find("th[value='" + "editButton" + "']").vrAppendToPuma(puma(this._divHeaderLocked).find("tr"));
                    puma(this._divFilters).find("td[value='" + "editButton" + "']").vrAppendToPuma(puma(this._divFiltersLocked).find("tr"));
                    puma(this._divTotals).find("td[value='" + "editButton" + "']").vrAppendToPuma(puma(this._divTotalsLocked).find("tr"));
                }
                //#endregion

                //#region Checkboxes
                if (options.checkboxes !== false)
                {
                    let firstColumnField = options.columns![0].field;
                    puma(this._divHeader).find("th[value='" + "vrGridCheckboxColumn" + "']").vrInsertBeforePuma(puma(this._divHeaderLocked).find("tr th[value='" + firstColumnField + "']"));
                    puma(this._divFilters).find("td[value='" + "vrGridCheckboxColumn" + "']").vrInsertBeforePuma(puma(this._divFiltersLocked).find("tr td[value='" + firstColumnField + "']"));
                    puma(this._divTotals).find("td[value='" + "vrGridCheckboxColumn" + "']").vrInsertBeforePuma(puma(this._divTotalsLocked).find("tr td[value='" + firstColumnField + "']"));
                }
                //#endregion
            }

            puma(this._divHeader).find("th[value='" + field + "']").vrAppendToPuma(puma(this._divHeaderLocked).find("tr"));
            puma(this._divHeaderLocked).find("th[value='" + field + "']").attr("locked", "locked");
            puma(this._divFilters).find("td[value='" + field + "']").vrAppendToPuma(puma(this._divFiltersLocked).find("tr"));
            puma(this._divTotals).find("td[value='" + field + "']").vrAppendToPuma(puma(this._divTotalsLocked).find("tr"));

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
            puma(this._divHeaderLocked).find("th[value='" + field + "']").removeAttr("locked");
            puma(this._divHeaderLocked).find("th[value='" + field + "']").vrAppendToPuma(puma(this._divHeader).find("tr"));
            puma(this._divFiltersLocked).find("td[value='" + field + "']").vrAppendToPuma(puma(this._divFilters).find("tr"));
            puma(this._divTotalsLocked).find("td[value='" + field + "']").vrAppendToPuma(puma(this._divTotals).find("tr"));

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
                    puma(this._divHeaderLocked).find("th[value='" + "editButton" + "']").removeAttr("locked");
                    puma(this._divHeaderLocked).find("th[value='" + "editButton" + "']").vrInsertBeforePuma(puma(this._divHeader).find("tr th[value='" + fieldAfterEditButton + "']"));
                    puma(this._divFiltersLocked).find("td[value='" + "editButton" + "']").vrInsertBeforePuma(puma(this._divFilters).find("tr td[value='" + fieldAfterEditButton + "']"));
                    puma(this._divTotalsLocked).find("td[value='" + "editButton" + "']").vrInsertBeforePuma(puma(this._divTotals).find("tr td[value='" + fieldAfterEditButton + "']"));
                }
                //#endregion

                //#region Checkboxes
                if (options.checkboxes !== false)
                {
                    let firstColumnField = options.columns![0].field;
                    puma(this._divHeaderLocked).find("th[value='" + "vrGridCheckboxColumn" + "']").vrInsertBeforePuma(puma(this._divHeader).find("tr th[value='" + firstColumnField + "']"));
                    puma(this._divFiltersLocked).find("td[value='" + "vrGridCheckboxColumn" + "']").vrInsertBeforePuma(puma(this._divFilters).find("tr td[value='" + firstColumnField + "']"));
                    puma(this._divTotalsLocked).find("td[value='" + "vrGridCheckboxColumn" + "']").vrInsertBeforePuma(puma(this._divTotals).find("tr td[value='" + firstColumnField + "']"));
                }
                //#endregion
            }

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
        let options = this.getOptions();
        if (options.groupable! && options.groupBy != null)
            this.removeGroups(((options.groupBy as GridGroupBySettings).fields as GridGroupByItem[]).map(k => k.field), false);

        options.groupBy = null;
        if (updateDataSource)
            this.update();
    }

    addGroup(field: string | GridGroupByItem, updateDataSource = true, sortBySettings?: GridSortSettings, internalSortBy?: GridSortSettings)
    {
        this.addGroups([field], updateDataSource, sortBySettings, internalSortBy);
    }

    addGroups(fields: (string | GridGroupByItem)[], updateDataSource = true, sortBy?: GridSortSettings, internalSortBy?: GridSortSettings)
    {
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
                puma(this._divHeader).find(">table tr:first-child").vrPrependPuma("<th width=16 style='border: 1px solid rgb(221, 221, 221); background-color: #51B3E1;' class='groupBy" + (groupByItem as GridGroupByItem).field + "' value='" + (groupByItem as GridGroupByItem).field + "'></th>");

            let filterClasses = Array.from(puma(this._divFilters).find(">table tr:first-child td")).map(k => (k as any).classList[0]);
            if (!filterClasses.includes("groupBy" + (groupByItem as GridGroupByItem).field))
                puma(this._divFilters).find(">table tr:first-child").vrPrependPuma("<td width=16 style='border: 1px solid rgb(221, 221, 221);' class='groupBy" + (groupByItem as GridGroupByItem).field + "'></td>");

            if (options.lockable)
            {
                let headerLockedClasses = Array.from(puma(this._divHeaderLocked).find(">table tr:first-child th")).map(k => (k as any).classList[0]);
                if (!headerLockedClasses.includes("groupBy" + (groupByItem as GridGroupByItem).field))
                    puma(this._divHeaderLocked).find(">table tr:first-child").vrPrependPuma("<th width=16 style='border: 1px solid rgb(221, 221, 221); background-color: #51B3E1;' class='groupBy" + (groupByItem as GridGroupByItem).field + "' value='" + (groupByItem as GridGroupByItem).field + "'></th>");

                let filterLockedClasses = Array.from(puma(this._divFiltersLocked).find(">table tr:first-child td")).map(k => (k as any).classList[0]);
                if (!filterLockedClasses.includes("groupBy" + (groupByItem as GridGroupByItem).field))
                    puma(this._divFiltersLocked).find(">table tr:first-child").vrPrependPuma("<td width=16 style='border: 1px solid rgb(221, 221, 221);' class='groupBy" + (groupByItem as GridGroupByItem).field + "'></td>");
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
                            value: "restoreOriginal", icon: IconClassLight.RotateLeft, align: WindowFooterItemAlignEnum.Left,
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
                            value: "checkAll", icon: IconClassLight.Check, align: WindowFooterItemAlignEnum.Left,
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
                            type: WindowFooterItemTypeEnum.Custom, text: "Deseleziona tutti", icon: IconClassLight.Check,
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
        let options = this.getOptions();
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
            let column = options.columns!.filter(k => k.field == key)[0];
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
                        { type: WindowFooterItemTypeEnum.Close }
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

        this._wndFiltering.open([{ value: "ok", callback: () => this.saveWindowFiltering(column) }]);
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
                {
                    puma("#" + this._elementId + "DivFilterDate").show();
                    puma("#" + this._elementId + "DivFilterNumber").hide();
                    puma("#" + this._elementId + "DivFilterString").hide();
                    txtFilterSearchSpecificValues.hide();
                    dtpFilterSearchSpecificValues.show();

                    switch (column.type!)
                    {
                        case GridColumnTypeEnum.DateTime:
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

        let isSearchIntervals = true;
        if (this._dictionaryFilterConditions.has(column.field))
        {
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
            let text = this.formatValue(k[column.field], column.type!, column.decimalDigits, column.roundingSettings, column.showSeconds);
            let tag = k[column.field];
            if (column.type == GridColumnTypeEnum.Date || column.type == GridColumnTypeEnum.DateTime || column.type == GridColumnTypeEnum.Time)
                tag = new Date(k[column.field]);
            else if (column.type == GridColumnTypeEnum.String || column.type == GridColumnTypeEnum.Label)
                tag = tag.toLowerCase();

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
                    {
                        if (this._dictionaryFilterConditions.has(column.field))
                        {
                            let filterSettings = this._dictionaryFilterConditions.get(column.field);
                            if (filterSettings != null && filterSettings.dateFilterSettings != null)
                            {
                                let ddlType = ControlManager.get<ComboBox>(this._elementId + "_ddlFilterDateType");
                                ddlType.value(filterSettings.dateFilterSettings.filterTypeEnum, true);

                                if (column.type == GridColumnTypeEnum.DateTime)
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
                                        if (UtilityManager.equals(value, tag))
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
                    {
                        //#region Date filter settings
                        let dtpFrom = ControlManager.get<DatePicker>(this._elementId + "_dtpFilterDateFrom");
                        let dtpTo = ControlManager.get<DatePicker>(this._elementId + "_dtpFilterDateTo");
                        let dtpDateTimeFrom = ControlManager.get<DatePicker>(this._elementId + "_dtpDateTimeFilterDateFrom");
                        let dtpDateTimeTo = ControlManager.get<DatePicker>(this._elementId + "_dtpDateTimeFilterDateTo");

                        if (column.type! == GridColumnTypeEnum.DateTime)
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
                        filterSettings.dateFilterSettings.dateFrom = (column.type! == GridColumnTypeEnum.DateTime) ? dtpDateTimeFrom.value()! : dtpFrom.value()!;
                        filterSettings.dateFilterSettings.dateTo = (column.type! == GridColumnTypeEnum.DateTime) ? dtpDateTimeTo.value()! : dtpTo.value();
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
                        if (ntbFrom.value() == "")
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
                        if (txtStringValue.value() == "")
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
        this._dictionaryFilterConditions.forEach((valueFilterSettings, keyField, dic) =>
        {
            let column = options.columns!.filter(k => k.field == keyField)[0];
            if (column != null && column.hidden === true)
                return;

            if (valueFilterSettings.numberFilterSettings != null)
            {
                //#region Number filter
                let filterButton = ControlManager.get<Button>(this._elementId + "_NumberFilter_" + keyField);
                puma(filterButton.element()).css("background-color", "coral");
                puma(filterButton.element()).css("color", "#FFF");

                let filterButtonRemove = ControlManager.get<Button>(this._elementId + "_NumberFilterRemove_" + keyField);
                filterButtonRemove.show();
                this.recalculateHeight(true);

                if (valueFilterSettings.numberFilterSettings.specificValues != null && valueFilterSettings.numberFilterSettings.specificValues.length > 0)
                {
                    //#region Search specific values
                    filteredArray = filteredArray.filter(k => valueFilterSettings.numberFilterSettings!.specificValues.includes(k[keyField]));
                    filterButton.tooltip("Ricerca specifica su questi valori: " + valueFilterSettings.numberFilterSettings.specificValues.join(" - "));
                    //#endregion
                }
                else
                {
                    //#region Search intervals
                    switch (valueFilterSettings.numberFilterSettings.filterTypeEnum)
                    {
                        case GridNumberFilterTypeEnum.GreaterThan:
                            filteredArray = filteredArray.filter(k => k[keyField] > valueFilterSettings.numberFilterSettings!.numberFrom);
                            break;
                        case GridNumberFilterTypeEnum.LessThan:
                            filteredArray = filteredArray.filter(k => k[keyField] < valueFilterSettings.numberFilterSettings!.numberFrom);
                            break;
                        case GridNumberFilterTypeEnum.EqualsTo:
                            filteredArray = filteredArray.filter(k => k[keyField] == valueFilterSettings.numberFilterSettings!.numberFrom);
                            break;
                        case GridNumberFilterTypeEnum.Between:
                            {
                                if (valueFilterSettings.numberFilterSettings!.numberTo != null)
                                    filteredArray = filteredArray.filter(k => k[keyField] >= valueFilterSettings.numberFilterSettings!.numberFrom && k[keyField] <= valueFilterSettings.numberFilterSettings!.numberTo!);
                                else
                                    filteredArray = filteredArray.filter(k => k[keyField] > valueFilterSettings.numberFilterSettings!.numberFrom);
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
                let filterButton = ControlManager.get<Button>(this._elementId + "_DateFilter_" + keyField);
                puma(filterButton.element()).css("background-color", "coral");
                puma(filterButton.element()).css("color", "#FFF");

                let filterButtonRemove = ControlManager.get<Button>(this._elementId + "_DateFilterRemove_" + keyField);
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
                            if (Date.vrEquals(new Date(filterValue[keyField]), specificValue))
                                dateFilteredArray.push(filterValue);
                        }
                    }
                    filteredArray = dateFilteredArray;

                    let tooltipValues: string[] = [];
                    if (column.type == GridColumnTypeEnum.Date)
                        tooltipValues = valueFilterSettings.dateFilterSettings.specificValues.map(k => { return new Date(k).vrToItalyString(DateModeEnum.Date) });
                    else if (column.type == GridColumnTypeEnum.DateTime)
                        tooltipValues = valueFilterSettings.dateFilterSettings.specificValues.map(k => { return new Date(k).vrToItalyString(DateModeEnum.DateTime) });
                    else if (column.type == GridColumnTypeEnum.Time)
                        tooltipValues = valueFilterSettings.dateFilterSettings.specificValues.map(k => { return new Date(k).vrToItalyString(DateModeEnum.Time) });

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
                                        filteredArray = filteredArray.filter(k => Date.vrFixDateString(k[keyField]) != null && Date.vrFixDateString(k[keyField]).vrIsGreaterThan(filterDateFrom, false, false));
                                        break;
                                    case GridColumnTypeEnum.DateTime:
                                        filteredArray = filteredArray.filter(k => Date.vrFixDateString(k[keyField]) != null && Date.vrFixDateString(k[keyField]).vrIsGreaterThan(filterDateFrom));
                                        break;
                                    case GridColumnTypeEnum.Time:
                                        filteredArray = filteredArray.filter(k => Date.vrFixDateString(k[keyField]) != null && (Date.vrFixDateString(k[keyField]).getHours() > filterDateFrom.getHours() || (Date.vrFixDateString(k[keyField]).getHours() == filterDateFrom.getHours() && Date.vrFixDateString(k[keyField]).getMinutes() > filterDateFrom.getMinutes())))
                                        break;
                                }
                            }
                            break;
                        case GridDateFilterTypeEnum.LessThan:
                            {
                                switch (column.type)
                                {
                                    case GridColumnTypeEnum.Date:
                                        filteredArray = filteredArray.filter(k => Date.vrFixDateString(k[keyField]) != null && Date.vrFixDateString(k[keyField]).vrIsLessThan(filterDateFrom, false, false));
                                        break;
                                    case GridColumnTypeEnum.DateTime:
                                        filteredArray = filteredArray.filter(k => Date.vrFixDateString(k[keyField]) != null && Date.vrFixDateString(k[keyField]).vrIsLessThan(filterDateFrom));
                                        break;
                                    case GridColumnTypeEnum.Time:
                                        filteredArray = filteredArray.filter(k => Date.vrFixDateString(k[keyField]) != null && (Date.vrFixDateString(k[keyField]).getHours() < filterDateFrom.getHours() || (Date.vrFixDateString(k[keyField]).getHours() == filterDateFrom.getHours() && Date.vrFixDateString(k[keyField]).getMinutes() < filterDateFrom.getMinutes())))
                                        break;
                                }
                            }
                            break;
                        case GridDateFilterTypeEnum.EqualsTo:
                            {
                                switch (column.type)
                                {
                                    case GridColumnTypeEnum.Date:
                                        filteredArray = filteredArray.filter(k => Date.vrFixDateString(k[keyField]) != null && Date.vrFixDateString(k[keyField]).vrIsEqualsTo(filterDateFrom, false));
                                        break;
                                    case GridColumnTypeEnum.DateTime:
                                        filteredArray = filteredArray.filter(k => Date.vrFixDateString(k[keyField]) != null && Date.vrFixDateString(k[keyField]).vrIsEqualsTo(filterDateFrom));
                                        break;
                                    case GridColumnTypeEnum.Time:
                                        filteredArray = filteredArray.filter(k => Date.vrFixDateString(k[keyField]) != null && (Date.vrFixDateString(k[keyField]).getHours() == filterDateFrom.getHours() && Date.vrFixDateString(k[keyField]).getMinutes() == filterDateFrom.getMinutes()))
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
                                        {
                                            if (valueFilterSettings.dateFilterSettings!.dateTo != null)
                                                filteredArray = filteredArray.filter(k => Date.vrFixDateString(k[keyField]) != null && Date.vrFixDateString(k[keyField]).vrIsBetween(filterDateFrom, filterDateTo));
                                            else
                                                filteredArray = filteredArray.filter(k => Date.vrFixDateString(k[keyField]) != null && Date.vrFixDateString(k[keyField]).vrIsGreaterThan(filterDateFrom));
                                        }
                                        break;
                                    case GridColumnTypeEnum.Time:
                                        {
                                            if (valueFilterSettings.dateFilterSettings!.dateTo != null)
                                            {
                                                filteredArray = filteredArray.filter(k => Date.vrFixDateString(k[keyField]) != null && (Date.vrFixDateString(k[keyField]).getHours() > filterDateFrom.getHours() || (Date.vrFixDateString(k[keyField]).getHours() == filterDateFrom.getHours() && Date.vrFixDateString(k[keyField]).getMinutes() > filterDateFrom.getMinutes())))
                                                filteredArray = filteredArray.filter(k => Date.vrFixDateString(k[keyField]) != null && (Date.vrFixDateString(k[keyField]).getHours() < filterDateTo.getHours() || (Date.vrFixDateString(k[keyField]).getHours() == filterDateTo.getHours() && Date.vrFixDateString(k[keyField]).getMinutes() < filterDateTo.getMinutes())))
                                            }
                                            else
                                                filteredArray = filteredArray.filter(k => Date.vrFixDateString(k[keyField]) != null && (Date.vrFixDateString(k[keyField]).getHours() > filterDateFrom.getHours() || (Date.vrFixDateString(k[keyField]).getHours() == filterDateFrom.getHours() && Date.vrFixDateString(k[keyField]).getMinutes() > filterDateFrom.getMinutes())))
                                        }
                                        break;
                                }
                            }
                            break;
                    }

                    // Filter button
                    let tooltipTypeEnum = DateModeEnum.Date;
                    if (column.type == GridColumnTypeEnum.DateTime)
                        tooltipTypeEnum = DateModeEnum.DateTime;
                    else if (column.type == GridColumnTypeEnum.Time)
                        tooltipTypeEnum = DateModeEnum.Time;

                    let tooltip = Date.vrFixDateString(valueFilterSettings.dateFilterSettings!.dateFrom).vrToItalyString(tooltipTypeEnum);
                    if (valueFilterSettings.dateFilterSettings!.filterTypeEnum == GridDateFilterTypeEnum.Between)
                        tooltip += " e " + Date.vrFixDateString(valueFilterSettings.dateFilterSettings!.dateTo!).vrToItalyString(tooltipTypeEnum);

                    let ddlType = ControlManager.get<ComboBox>(this._elementId + "_ddlFilterDateType");
                    let type = "";
                    switch (Number(ddlType!.value()))
                    {
                        case GridNumberFilterTypeEnum.GreaterThan: type = "Maggiore di "; break;
                        case GridNumberFilterTypeEnum.LessThan: type = "Minore di "; break;
                        case GridNumberFilterTypeEnum.EqualsTo: type = "Uguale a "; break;
                        case GridNumberFilterTypeEnum.Between: type = "Compreso tra "; break;
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

                let filterButton: Button | null = null;
                if ((valueFilterSettings.stringFilterSettings.specificValues != null && valueFilterSettings.stringFilterSettings.specificValues.length > 0)
                    || valueFilterSettings.stringFilterSettings.filterTypeEnum != GridStringFilterTypeEnum.IncludesFromSimpleSearch)
                {
                    filterButton = ControlManager.get<Button>(this._elementId + "_StringFilterBtn_" + keyField);
                    puma(filterButton.element()).css("background-color", "coral");
                    puma(filterButton.element()).css("color", "#FFF");

                    let filterButtonRemove = ControlManager.get<Button>(this._elementId + "_StringFilterBtnRemove_" + keyField);
                    filterButtonRemove.show();
                    this.recalculateHeight(true);

                    let textBox = ControlManager.get<TextBox>(this._elementId + "_StringFilter_" + column.field);
                    textBox.width("Calc(100% - 60px)");
                }

                if (valueFilterSettings.stringFilterSettings.specificValues != null && valueFilterSettings.stringFilterSettings.specificValues.length > 0)
                {
                    //#region Search specific values
                    filteredArray = filteredArray.filter(k => k[keyField] != null && valueFilterSettings.stringFilterSettings!.specificValues.map(k => { return k.toLowerCase() }).includes(k[keyField].toLowerCase()));
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
                                filteredArray = filteredArray.filter(k => k[keyField] != null && k[keyField].toLowerCase().startsWith(valueFilterSettings.stringFilterSettings!.text.toLowerCase()));
                            }
                            break;
                        case GridStringFilterTypeEnum.EndsWith:
                            {
                                type = "Finisce con: ";
                                filteredArray = filteredArray.filter(k => k[keyField] != null && k[keyField].toLowerCase().endsWith(valueFilterSettings.stringFilterSettings!.text.toLowerCase()));
                            }
                            break;
                        case GridStringFilterTypeEnum.EqualsTo:
                            {
                                type = "Uguale a: ";
                                filteredArray = filteredArray.filter(k => k[keyField] != null && k[keyField].toLowerCase() == valueFilterSettings.stringFilterSettings!.text.toLowerCase());
                            }
                            break;
                        case GridStringFilterTypeEnum.Includes:
                            {
                                type = "Contiene: ";
                                filteredArray = filteredArray.filter(k => k[keyField] != null && k[keyField].toLowerCase().indexOf(valueFilterSettings.stringFilterSettings!.text.toLowerCase()) !== -1);
                            }
                            break;
                        case GridStringFilterTypeEnum.IncludesFromSimpleSearch:
                            {
                                type = "Contiene: ";
                                filteredArray = filteredArray.filter(k => k[keyField] != null && k[keyField].toLowerCase().indexOf(valueFilterSettings.stringFilterSettings!.text.toLowerCase()) !== -1);
                            }
                            break;
                        default:
                            {
                                type = "Contiene: ";
                                filteredArray = filteredArray.filter(k => k[keyField] != null && k[keyField].toLowerCase().indexOf(valueFilterSettings.stringFilterSettings!.text.toLowerCase()) !== -1);
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
                filteredArray = filteredArray.filter(k => k[keyField] === valueFilterSettings.checkboxFilterSettings!.value);

                //#region Filter checkbox
                let checkboxJq = puma("#" + this._elementId + "_CheckboxFilter_" + keyField);
                checkboxJq.removeClass("indeterminateVrCheckbox");

                let checkbox = checkboxJq[0] as HTMLInputElement;
                checkbox.checked = valueFilterSettings.checkboxFilterSettings!.value;
                //#endregion
            }
        });

        this.pageSelected(1, false);

        if (applyFilters)
        {
            this._dataSource = JSON.parse(JSON.stringify(filteredArray));
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
            divResizable.style.cssText += "position: absolute; top: 0px; right: 0px; width: 5px; cursor: col-resize; user-select: none; height: " + tableHeight + "px;";
            th.appendChild(divResizable);
            th.style.position = "relative";
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
                let field = puma(puma(this._divHeader).find("th")[puma(currentColumn).index()]).attr("value");
                let isColumnLocked = (currentColumn.getAttribute("locked") != null);
                if (isColumnLocked)
                    field = puma(puma(this._divHeaderLocked).find("th")[puma(currentColumn).index()]).attr("value");

                let index = puma(currentColumn!).index();

                let column = this.column(field);
                if (isColumnLocked)
                {
                    for (let headerColumn of Array.from(puma(this._divHeaderLocked).find("th[fitSpace='true']")))
                        puma(headerColumn).css({ "width": puma(headerColumn).width() + "px" });

                    for (let filterColumn of Array.from(puma(this._divFiltersLocked).find("td[fitSpace='true']")))
                        puma(filterColumn).css({ "width": puma(filterColumn).width() + "px" });

                    for (let totalColumn of Array.from(puma(this._divTotalsLocked).find("td[fitSpace='true']")))
                        puma(totalColumn).css({ "width": puma(totalColumn).width() + "px" });
                }
                else
                {
                    for (let headerColumn of Array.from(puma(this._divHeader).find("th[fitSpace='true']")))
                        puma(headerColumn).css({ "width": puma(headerColumn).width() + "px" });

                    for (let filterColumn of Array.from(puma(this._divFilters).find("td[fitSpace='true']")))
                        puma(filterColumn).css({ "width": puma(filterColumn).width() + "px" });

                    for (let totalColumn of Array.from(puma(this._divTotals).find("td[fitSpace='true']")))
                        puma(totalColumn).css({ "width": puma(totalColumn).width() + "px" });
                }

                let diffX = e.pageX - pageX!;
                currentColumn.style.width = (currentColumnWidth! + diffX) + "px";
                column.width = (currentColumnWidth! + diffX);

                if (options.filterable)
                {
                    if (isColumnLocked)
                    {
                        if (puma(this._divFiltersLocked).find("td")[index] != null)
                            puma(this._divFiltersLocked).find("td")[index].style.width = (currentColumnWidth! + diffX) + "px";
                    }
                    else
                    {
                        if (puma(this._divFilters).find("td")[index] != null)
                            puma(this._divFilters).find("td")[index].style.width = (currentColumnWidth! + diffX) + "px";
                    }
                }

                if (this._showTotals)
                {
                    if (isColumnLocked)
                    {
                        if (puma(this._divTotalsLocked).find("td")[index] != null)
                            puma(this._divTotalsLocked).find("td")[index].style.width = (currentColumnWidth! + diffX) + "px";
                    }
                    else
                    {
                        if (puma(this._divTotals).find("td")[index] != null)
                            puma(this._divTotals).find("td")[index].style.width = (currentColumnWidth! + diffX) + "px";
                    }
                }

                let indexColumn = this._columnOptions.findIndex(k => k.field == field);
                let columnPosition = this._columnOptions[indexColumn];
                if (options.groupable)
                {
                    let col = puma(this._divBody).find("colgroup").find("col[field='" + field + "'");
                    if (isColumnLocked)
                    {
                        col = puma(this._divBodyLocked).find("colgroup").find("col[field='" + field + "'");
                        puma(this._divBodyLocked).find("td[value='" + field + "']")[0].style.width = (currentColumnWidth! + diffX) + "px";
                    }

                    if (col[0] != null)
                    {
                        col[0].style.width = (currentColumnWidth! + diffX + 12) + "px";
                        let colWidth = col[0].style.width.getNumericPart();
                        columnPosition.right = columnPosition.left + colWidth;
                    }
                }
                else
                {
                    if (isColumnLocked)
                        puma(this._divBodyLocked).find("td[value='" + field + "']")[0].style.width = (currentColumnWidth! + diffX) + "px";
                    else
                        puma(this._divBody).find("td[value='" + field + "']")[0].style.width = (currentColumnWidth! + diffX) + "px";

                    columnPosition.field = field;
                    columnPosition.left = columnPosition.left;
                    columnPosition.right = columnPosition.left + column.width;
                    columnPosition.index = index;
                }

                this.recalculateWidth(false);
                window.clearTimeout(timeoutRecalculateWidthWhileMoving);
                timeoutRecalculateWidthWhileMoving = window.setTimeout(() => this.recalculateWidth(), 1000);
            }
        });

        puma(this.container()).on("mouseup", () =>
        {
            window.setTimeout(() => this._isResizing = false);

            currentColumn = null;
            pageX = null;
            currentColumnWidth = null;
        });
        //#endregion
    }
    //#endregion

    //#region Columns Drag&Drop
    private updateColumnOptions()
    {
        let headerTable = puma(this._divHeader).find("table")[0];
        for (let th of Array.from(puma(headerTable).find("th")))
        {
            let field = puma(th).attr("value");
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
            this.drag(th,
                {
                    onDragging: (e) =>
                    {
                        //#region Dragging
                        puma(this._divHeader).find("table th").removeClass("grid_tdDraggedOn");

                        let draggingColumnPosition = this._columnOptions.filter(k => e.left >= k.left && e.left <= k.right)[0];
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

                        let toDragColumnPosition = this._columnOptions.filter(k => e.left >= k.left && e.left <= k.right)[0];
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
                            let field = puma(th).attr("value");

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
                                let field = puma(th).attr("value");
                                let tdJq = puma(row).find("td[value='" + field + "']");
                                let tdJqToDrag = puma(row).find("td[value='" + toDragColumnPosition.field + "']");
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

                            this.updateColumnOptions();

                            //#region Update options.columns
                            let column = options.columns!.filter(k => k.field == field)[0];
                            let fieldToDrag = toDragColumnPosition.field;
                            let columnToDrag = options.columns!.filter(k => k.field == fieldToDrag)[0];
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

    //#region Utility
    createTotalsFunction()
    {
        function calculateTotals(e: any)
        {
            let response: any[] = [];

            //#region Utility
            Array.prototype.vrSum = function (callbackfn?: (value: any, index: number, array: any[]) => any)
            {
                if (Array.isArray(this))
                {
                    if (callbackfn == null)
                        return this.reduce((ty, u) => ty + u, 0);
                    else
                    {
                        let property = callbackfn.toString().split("=>")[1];
                        let sum: number = 0;
                        this.forEach(k => sum += eval(property));
                        return sum;
                    }
                }

                return 0;
            }

            Array.prototype.vrAvg = function (callbackfn?: (value: any, index: number, array: any[]) => any, countZeroInAverage?: boolean)
            {
                if (Array.isArray(this))
                {
                    let length = this.length;
                    if (countZeroInAverage === false)
                        length = this.length - this.filter(k => k == 0).length;

                    if (length == 0)
                        return 0;

                    if (callbackfn == null)
                        return this.vrSum() / length;
                    else
                    {
                        let sum = this.vrSum(callbackfn);
                        return sum / length;
                    }
                }

                return 0;
            }

            Array.prototype.vrMax = function (callbackfn?: (value: any, index: number, array: any[]) => any)
            {
                if (Array.isArray(this))
                {
                    if (callbackfn != null)
                    {
                        let property = callbackfn.toString().split(".")[1];
                        return this.reduce((oa, u) => Math.max(oa, u[property]), 0);
                    }
                    else
                        return Math.max.apply(null, this);
                }

                return 0;
            };

            Array.prototype.vrMin = function (callbackfn?: (value: any, index: number, array: any[]) => any)
            {
                if (Array.isArray(this))
                {
                    if (callbackfn != null)
                    {
                        let property = callbackfn.toString().split(".")[1];
                        return this.reduce((oa, u) => Math.min(oa, u[property]), Number.MAX_VALUE);
                    }
                    else
                        return Math.min.apply(null, this);
                }

                return 0;
            };
            //#endregion

            //#region Get totals
            let request = e.data as WorkerTotalsRequest;
            if (request.isGroup)
            {
                if (request.groupItems == null || request.groupItems.length == 0 || request.groupItems[0].dataItems[0] == null)
                {
                    (self as any).postMessage(response);
                    return;
                }
            }

            function getTotals(dataItems: any[])
            {
                let totals = [];
                for (let column of request.columnOptions)
                {
                    let aggregateResult = 0;
                    switch (column.aggregateMode)
                    {
                        case 1: aggregateResult = dataItems.map(k => k[column.field]).length; break;
                        case 4: aggregateResult = dataItems.map(k => k[column.field]).vrSum(); break;
                        case 0:
                            {
                                if (column.type == 3)
                                    aggregateResult = dataItems.map(k => k[column.field]).vrAvg(undefined, column.countZeroInAverage) / 100;
                                else
                                    aggregateResult = dataItems.map(k => k[column.field]).vrAvg(undefined, column.countZeroInAverage);
                            }
                            break;
                        case 3:
                            {
                                if (column.type != null && (column.type == 5 || column.type == 6 || column.type == 7))
                                    aggregateResult = dataItems.map(k => new Date(k[column.field])).vrMin();
                                else
                                    aggregateResult = dataItems.map(k => k[column.field]).vrMin();
                            }
                            break;
                        case 2:
                            {
                                if (column.type != null && (column.type == 5 || column.type == 6 || column.type == 7))
                                    aggregateResult = dataItems.map(k => new Date(k[column.field])).vrMax();
                                else
                                    aggregateResult = dataItems.map(k => k[column.field]).vrMax();
                            }
                            break;
                    }

                    let total: any = {};
                    total.field = column.field;
                    total.total = aggregateResult;
                    total.decimalDigits = column.decimalDigits;
                    total.roundingSettings = column.roundingSettings;
                    total.type = column.type;
                    totals.push(total);
                }
                return totals;
            }

            if (request.isGroup)
            {
                for (let group of request.groupItems)
                {
                    let totals = getTotals(group.dataItems);
                    response.push({ totals: totals, groupValue: group.groupValue });
                }
            }
            else
            {
                let totals = getTotals(request.dataItems);
                response = totals;
            }
            //#endregion

            (self as any).postMessage(response);
        }

        let scriptCalculateTotalsWorker = puma("head").find("script[id='vr_workerTotals']")[0];
        if (scriptCalculateTotalsWorker == null)
            puma("<script id='vr_workerTotals'> self.onmessage=" + calculateTotals.toString() + " </script>").vrAppendToPuma("head");

        let workerTotalsData = new Blob([document.getElementById("vr_workerTotals")!.textContent!],
            {
                type: "text/javascript"
            });
        this._workerTotals = new Worker(window.URL.createObjectURL(workerTotalsData));
        this._workerTotalsGroup = new Worker(window.URL.createObjectURL(workerTotalsData));
    }

    pageSize(pageSize?: number, update = false, triggerDataBound = false)
    {
        if (pageSize != null)
        {
            let options = this.getOptions();
            this._actualPageSize = pageSize;
            options.pageSize = pageSize;

            if (update)
                this.update(triggerDataBound);

            let newPageSizeItem = { text: String(pageSize), value: String(pageSize), numberValue: pageSize };
            let ddlPageSize = ControlManager.get<ComboBox>(this._elementId + "_ddlPageSize");
            if (ddlPageSize != null)
            {
                if (!ddlPageSize.items().vrAny(k => k.value == String(pageSize)))
                    ddlPageSize.addItem(newPageSizeItem, true, false, { field: "numberValue" });

                ddlPageSize.value(String(pageSize), false);
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

            let buttonSelected = ControlManager.get<Button>(this._elementId + "_btnPage_" + page);
            if (buttonSelected != null)
                puma(buttonSelected.element()).addClass("p-grid-pageSelected");

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

    private isRepeater()
    {
        return puma(this.container()).hasClass("vrRepeaterContainer");
    }

    getOptions()
    {
        return (this._internalOptions != null) ? this._internalOptions : this.options<GridOptions>();
    }

    recalculateWidth(fixColGroup = true)
    {
        let options = this.getOptions();
        if (puma(this._divBody).css('overflow-y') == 'scroll' || puma(this._divBody).css('overflow-y') == 'auto')
        {
            if (puma(this._divBody)[0].scrollHeight > puma(this._divBody)[0].clientHeight && puma(this._divBody)[0].clientHeight > 0)
            {
                //#region Structure
                let minusWidth = 19;
                if (this.thereAreLockedColumns())
                    minusWidth += puma(this._divHeaderLocked).width() + 5;

                puma(this._divHeader).width("Calc(100% - " + minusWidth + "px)")
                puma(this._divHeader).find("th[fitSpace='true']").attr("width", this._fitSpaceColumnPercentage + "%");

                puma(this._divFilters).width("Calc(100% - " + minusWidth + "px)")
                puma(this._divFilters).find("td[fitSpace='true']").attr("width", this._fitSpaceColumnPercentage + "%");

                if (this.thereAreLockedColumns())
                {
                    puma(this._divBody).width("Calc(100% - " + (puma(this._divHeaderLocked).width() + 5) + "px)")
                    puma(this._divBodyLocked).width(puma(this._divHeaderLocked).width())
                }
                else
                    puma(this._divBody).width("Calc(100% - 2px)");

                puma(this._divTotals).width("Calc(100% - " + minusWidth + "px)")
                puma(this._divTotals).find("td[fitSpace='true']").attr("width", this._fitSpaceColumnPercentage + "%");
                //#endregion

                //#region Fit space
                if (puma(this._divHeader).is(":visible"))
                {
                    this._spanFitHeaderSpace.style.cssText += "top: " + (puma(this._divHeader).position().top) + "px; left: " + (puma(this._divHeader).position().left + puma(this._divHeader).width()) + "px";
                    puma(this._spanFitHeaderSpace).show();
                }

                if (options.filterable)
                {
                    this._spanFitFilterSpace.style.cssText += "top: " + (puma(this._divFilters).position().top) + "px; left: " + (puma(this._divFilters).position().left + puma(this._divFilters).width()) + "px";
                    puma(this._spanFitFilterSpace).show();
                }
                else
                    puma(this._spanFitFilterSpace).hide();

                if (this._showTotals && this.getAllItems().length > 0)
                {
                    this._spanFitTotalsSpace.style.cssText += "top: " + (puma(this._divTotals).position().top) + "px; left: " + (puma(this._divTotals).position().left + puma(this._divTotals).width()) + "px";
                    puma(this._spanFitTotalsSpace).show();
                }
                else
                    puma(this._spanFitTotalsSpace).hide();
                //#endregion
            }
            else
            {
                let minusWidth = 2;
                if (this.thereAreLockedColumns())
                    minusWidth += puma(this._divHeaderLocked).width() + 5;

                //#region Structure
                puma(this._divHeader).width("Calc(100% - " + minusWidth + "px)")
                puma(this._divHeader).find("th[fitSpace='true']").attr("width", this._fitSpaceColumnPercentage + "%");

                puma(this._divFilters).width("Calc(100% - " + minusWidth + "px)")
                puma(this._divFilters).find("td[fitSpace='true']").attr("width", this._fitSpaceColumnPercentage + "%");

                if (this.thereAreLockedColumns())
                {
                    puma(this._divBody).width("Calc(100% - " + (puma(this._divHeaderLocked).width() + 5) + "px)")
                    puma(this._divBodyLocked).width(puma(this._divHeaderLocked).width())
                }
                else
                    puma(this._divBody).width("Calc(100% - 2px)");

                puma(this._divTotals).width("Calc(100% - " + minusWidth + "px)")
                puma(this._divTotals).find("td[fitSpace='true']").attr("width", this._fitSpaceColumnPercentage + "%");
                //#endregion

                //#region Fit space
                puma(this._spanFitHeaderSpace).hide();
                puma(this._spanFitFilterSpace).hide();
                puma(this._spanFitTotalsSpace).hide();
                //#endregion
            }
        }
        else
        {
            puma(this._spanFitHeaderSpace).hide();
            puma(this._spanFitFilterSpace).hide();
            puma(this._spanFitTotalsSpace).hide();
        }

        if (fixColGroup && (options.groupable! || options.groupBy != null))
        {
            let i = 0;
            puma(this._divBody).find("table colgroup").remove();
            let colGroup = puma("<colgroup></colgroup>").prependTo(puma(this._divBody).find(">table"));

            puma(this._divHeaderContainer).show();
            puma(this._divHeader).show();
            for (let column of Array.from(puma(this._divHeader).find(">table tr:first-child th")))
            {
                let field = puma(column).attr("value");

                let display = "";
                if (!puma(column).is(":visible"))
                    display = "display: none;";
                else
                    i++;

                let width = puma(column).outerWidth();
                if (i == 1)
                    width -= 1;

                puma("<col field='" + field + "' style='width: " + width + "px; " + display + "' />").vrAppendToPuma(colGroup);
            }

            if (options.header === false)
                puma(this._divHeader).hide();

            if (this.thereAreLockedColumns())
            {
                let i = 0;
                puma(this._divBodyLocked).find("table colgroup").remove();
                let colGroup = puma("<colgroup></colgroup>").prependTo(puma(this._divBodyLocked).find(">table"));

                puma(this._divHeaderLocked).show();
                for (let column of Array.from(puma(this._divHeaderLocked).find(">table tr:first-child th")))
                {
                    let field = puma(column).attr("value");

                    let display = "";
                    if (!puma(column).is(":visible"))
                        display = "display: none;";
                    else
                        i++;

                    let width = puma(column).width();
                    if (i == 1)
                        width -= 1;

                    puma("<col field='" + field + "' style='width: " + width + "px; " + display + "' />").vrAppendToPuma(colGroup);
                }

                if (options.header === false)
                    puma(this._divHeaderLocked).hide();
            }

            if (options.header === false)
                puma(this._divHeaderContainer).hide();
        }
    }

    height(height?: number | string)
    {
        if (height != null)
        {
            if (typeof (height) == "number" && height > 0)
            {
                puma(this._divBody).height(height);
                puma("#" + this.element().id + "_grid_body_container").height(height);

                let options = this.getOptions();
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
        if (options.height! < 0 || options.height == GridHeightModeEnum.FitScreen)
        {
            let headerHeight = (puma(this._divHeader).is(":visible")) ? 34 : 0;
            let filtersHeight = (options.filterable) ? 30 : 0;
            let toolbarHeight = (options.toolbar != null) ? 34 : 0;
            let totalsheight = (this._showTotals) ? 25 : 0;
            let footerHeight = (options.footer !== false) ? 34 : 0;
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
        }
        else if (afterFilter && typeof (options.height) == "number")
        {
            if (puma(this._divFilters).height() > 32)
                puma(this._divBody).height(options.height - 58.5);
            else
                puma(this._divBody).height(options.height - 31);

            puma("#" + this.element().id + "_grid_body_container").height(puma(this._divBody).height() + 2);

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

                puma(trLocked).height(heightToSet);
                puma(tr).height(heightToSet);
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
                                    this.addRow(specificItems.filter(k => k[options.dataSourceFieldId!] == itemToAddId)[0], false);
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
                            this.clear();
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
                        promiseCallback();
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
                    this.excelExport((toolbarItem.excelFileName != null) ? toolbarItem.excelFileName : undefined);
                }
                break;
            case GridToolbarItemType.ExcelWithHiddenColumns:
                {
                    this.excelExport((toolbarItem.excelFileName != null) ? toolbarItem.excelFileName : undefined, true);
                }
                break;
        }

        if (toolbarItem.onClick != null)
            toolbarItem.onClick(toolbarClickEvent);
    }

    //#region Excel
    excelExport(fileName = "Esportazione_excel", exportHiddenColumns = false)
    {
        let options = this.getOptions();
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
                    if ((!exportHiddenColumns && column.hidden == true && (options.groupBy == null || !((options.groupBy as GridGroupBySettings).fields as GridGroupByItem[]).map(k => k.field).includes(column.field)))
                        || column.type == GridColumnTypeEnum.EditButton || column.type == GridColumnTypeEnum.Image
                        || column.type == GridColumnTypeEnum.Button || column.type == GridColumnTypeEnum.Icon || column.exportable === false)
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
                for (let item of this.dataSource())
                {
                    let contentRow = new GridExcelRow();
                    contentRow.cells = [];

                    for (let column of options.columns!)
                    {
                        if ((!exportHiddenColumns && column.hidden == true && (options.groupBy == null || !((options.groupBy as GridGroupBySettings).fields as GridGroupByItem[]).map(k => k.field).includes(column.field)))
                            || column.type == GridColumnTypeEnum.EditButton || column.type == GridColumnTypeEnum.Image
                            || column.type == GridColumnTypeEnum.Button || column.type == GridColumnTypeEnum.Icon || column.exportable === false)
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
                                {
                                    textAlign = GridAlignEnum.Center;

                                    if (column.type == GridColumnTypeEnum.Date || column.type == GridColumnTypeEnum.DateTime || column.type == GridColumnTypeEnum.Time)
                                    {
                                        if (column.type == GridColumnTypeEnum.Date)
                                            textHTML = (textHTML == "") ? "" : new Date(new Date(textHTML)).vrToItalyString(DateModeEnum.Date);
                                        else if (column.type == GridColumnTypeEnum.DateTime)
                                            textHTML = (textHTML == "") ? "" : new Date(new Date(textHTML)).vrToItalyString(DateModeEnum.DateTime, column.showSeconds);
                                        else if (column.type == GridColumnTypeEnum.Time)
                                            textHTML = (textHTML == "") ? "" : new Date(new Date(textHTML)).vrToItalyString(DateModeEnum.Time, column.showSeconds);
                                    }
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
                                            let settings = column.customSettings({ dataItem: item });
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
                                            let settings = column.labelSettings({ dataItem: item });
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
                    let field = puma(td).attr("value");
                    if (field == null)
                        continue;

                    let column = options.columns!.filter(k => k.field == field)[0];
                    if (column == null || (!exportHiddenColumns && column.hidden == true && (options.groupBy == null || !((options.groupBy as GridGroupBySettings).fields as GridGroupByItem[]).map(k => k.field).includes(column.field)))
                        || column.type == GridColumnTypeEnum.EditButton || column.type == GridColumnTypeEnum.Image
                        || column.type == GridColumnTypeEnum.Button || column.type == GridColumnTypeEnum.Icon || column.exportable === false)
                        continue;

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
                    generateExcelRequest.groupBy = (groupByFields != null) ? (groupByFields as GridGroupByItem[]).map(k => k.field) : null;
                }

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

                            if (response.downloadUrl != null && response.downloadUrl.length > 0)
                                location.replace(response.downloadUrl);

                            if (!(response as any).Success)
                                alert((response as any).ErrorMessage + "<br />" + (response as any).StackTrace, { width: 600, css: "overflow: auto;" });
                        },
                        error: (response: JQueryXHR, textStatus: string, errorThrown: string) =>
                        {
                            hideLoader();
                            alert("Errore nell'esportazione Excel. Contattare l'assistenza.");
                        }
                    });
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
                    iconClass = (toolbarItem.icon != null) ? toolbarItem.icon : IconClassLight.Plus;
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
                    iconClass = (toolbarItem.icon != null) ? toolbarItem.icon : IconClassRegular.Xmark;
                    buttonClass = (toolbarItem.value != null) ? "grid-" + toolbarItem.value : "grid-delete";
                    vrButton = true;
                }
                break;
            case GridToolbarItemType.Excel:
                {
                    text = (toolbarItem.text != null) ? toolbarItem.text : "Excel";
                    iconClass = (toolbarItem.icon != null) ? toolbarItem.icon : IconClassLight.FileExcel;
                    buttonClass = (toolbarItem.value != null) ? "grid-" + toolbarItem.value : "grid-excel";
                    vrButton = true;
                    toolbarItem.backgroundColor = "#008a00";
                    toolbarItem.textColor = "#FFF";
                }
                break;
            case GridToolbarItemType.ExcelWithHiddenColumns:
                {
                    text = (toolbarItem.text != null) ? toolbarItem.text : "Excel";
                    iconClass = (toolbarItem.icon != null) ? toolbarItem.icon : IconClassLight.FileExcel;
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
                    iconClass = (toolbarItem.icon != null) ? toolbarItem.icon : IconClassLight.Refresh;
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
                            let checkedItems = this.getCheckedItems();
                            if (checkedItems.length == 0)
                            {
                                notifyWarning("Selezionare almeno una riga per proseguire");
                                return;
                            }
                            else
                            {
                                if (toolbarItem.confirmationMessage == null)
                                {
                                    if (checkedItems.length == 1) toolbarItem.confirmationMessage = "Proseguendo, verrà eliminato l'elemento selezionato. Continuare?";
                                    else if (checkedItems.length > 1) toolbarItem.confirmationMessage = "Proseguendo, verranno eliminati gli elementi selezionati. Continuare?";
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
                onClose: (e) =>
                {
                    puma(this._wndAutoWindow.container()).remove();
                    (this._wndAutoWindow as any) = null;
                },
                footer:
                    [
                        {
                            type: WindowFooterItemTypeEnum.Close, onClick: (e) =>
                            {
                                this._actualEditedItem = null;

                                if (options.autoWindowSettings!.onClose != null)
                                    options.autoWindowSettings!.onClose();
                            }
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
                                tooltip: tooltip
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
                                tooltip: tooltip
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
                                clearButton: column.ddlNullable
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
            }
            //#endregion
        }
    }

    private openAutoWindow(dataItem?: any)
    {
        let options = this.getOptions();
        if (options.autoWindowSettings != null || !options.hideEditButton)
            this.createAutoWindow();

        if (this._wndAutoWindow == null)
            return;

        if (options.onAutoWindowOpen != null)
        {
            let autoWindowOpenEvent = new AutoWindowOpenEvent();
            autoWindowOpenEvent.sender = this;
            autoWindowOpenEvent.window = this._wndAutoWindow;
            autoWindowOpenEvent.dataItem = dataItem;
            autoWindowOpenEvent.columns = options.columns;
            options.onAutoWindowOpen(autoWindowOpenEvent);

            if (autoWindowOpenEvent.isDefaultPrevented())
                return;
        }

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
                    {
                        let datePicker = ControlManager.get<DatePicker>(this._elementId + "_datePicker_" + column.field);
                        datePicker.clear();

                        if (columnValue != null)
                            datePicker.value(columnValue);
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
                    {
                        let dateTimePicker = ControlManager.get<DatePicker>(this._elementId + "_dateTimePicker_" + column.field);
                        dateTimePicker.clear();

                        if (columnValue != null)
                            dateTimePicker.value(columnValue);
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
                    {
                        let datePicker = ControlManager.get<DatePicker>(this._elementId + "_datePicker_" + column.field);
                        this._actualEditedItem[column.field] = datePicker.value();
                    }
                    break;
                case GridColumnTypeEnum.DateTime:
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
            }
            //#endregion
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
            for (let property of Object.getOwnPropertyNames(this._actualEditedItem))
            {
                let column = options.columns!.filter(k => k.field == property)[0];
                if (column != null && column.type == GridColumnTypeEnum.Percentage && column.ignoreFactor != true)
                    this._actualEditedItem[property] *= 100;
            }

            this.updateRow(this._actualEditedItem);
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
                pageSize: 400,
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
                            this._grdLayout.selectRowInternal(String(this._actualLayout.id), undefined, true);
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
                            type: GridToolbarItemType.Custom, icon: IconClassRegular.Xmark, text: "Elimina",
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
                            type: GridToolbarItemType.Custom, icon: IconClassLight.Plus, text: "Crea nuovo",
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
                options.pageSize = json.pageSize;
                if (updateDataSource)
                {
                    let ddlPageSize = ControlManager.get<ComboBox>(this._elementId + "_ddlPageSize");
                    if (!ddlPageSize.items().map(k => k.value).includes(String(json.pageSize)))
                    {
                        let items = ddlPageSize.items();
                        items.push({ text: String(json.pageSize), value: String(json.pageSize) });
                        ddlPageSize.items(items);
                    }
                    ddlPageSize.value(String(json.pageSize), true);
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
                    let optionsColumn = options.columns!.filter(k => k.field == jsonColumn.field)[0];
                    if (optionsColumn != null)
                    {
                        let optionsColumnIndex = options.columns!.indexOf(optionsColumn);
                        (options.columns![optionsColumnIndex] as any).index = jsonColumn.index;

                        if (jsonColumn.fitSpace !== true)
                            options.columns![optionsColumnIndex].width = jsonColumn.width;

                        //#region Header columns width
                        if (jsonColumn.fitSpace !== true)
                        {
                            let thHeader = puma(this._divHeader).find("th[value='" + jsonColumn.field + "']")[0];
                            if (options.lockable && thHeader == null)
                                thHeader = puma(this._divHeaderLocked).find("th[value='" + jsonColumn.field + "']")[0];

                            thHeader.style.width = jsonColumn.width + "px";

                            if (options.filterable)
                            {
                                if (puma(this._divFilters).find("td[value='" + jsonColumn.field + "']")[0] != null)
                                    puma(this._divFilters).find("td[value='" + jsonColumn.field + "']")[0].style.width = jsonColumn.width + "px";

                                if (options.lockable)
                                {
                                    if (puma(this._divFiltersLocked).find("td[value='" + jsonColumn.field + "']")[0] != null)
                                        puma(this._divFiltersLocked).find("td[value='" + jsonColumn.field + "']")[0].style.width = jsonColumn.width + "px";

                                }
                            }

                            if (this._showTotals)
                            {
                                if (puma(this._divTotals).find("td[value='" + jsonColumn.field + "']")[0] != null)
                                    puma(this._divTotals).find("td[value='" + jsonColumn.field + "']")[0].style.width = jsonColumn.width + "px";

                                if (options.lockable)
                                {
                                    if (puma(this._divTotalsLocked).find("td[value='" + jsonColumn.field + "']")[0] != null)
                                        puma(this._divTotalsLocked).find("td[value='" + jsonColumn.field + "']")[0].style.width = jsonColumn.width + "px";

                                }
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
                    let headerTh = puma(this._divHeader).find("table th[value='" + column.field + "']")[0];
                    puma(puma(this._divHeader).find("table th")[lastIndex]).vrAfterPuma(headerTh);
                    //#endregion

                    //#region Filters
                    if (options.filterable)
                    {
                        let filtersTd = puma(this._divFilters).find("table td[value='" + column.field + "']")[0];
                        puma(puma(this._divFilters).find("table td")[lastIndex]).vrAfterPuma(filtersTd);
                    }
                    //#endregion

                    //#region Totals
                    if (this._showTotals)
                    {
                        let totalsTd = puma(this._divTotals).find("table td[value='" + column.field + "']")[0];
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
    noBr?: boolean;
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

class GridServerBindSettings
{
    public itemCountPropertyName?: string;
    public totalsPropertyName?: string;
    public excelDownloadUrlPropertyName?: string;
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
}

class GridTotalElementTemplateEvent
{
    firstIndex?: number;
    lastIndex?: number;
    dataItems: any[];
    pageSelected: number;
    numberOfPages: number;
}
//#endregion

//#region Totals
class WorkerTotalsRequest
{
    dataItems: any[];
    columnOptions: WorkerTotalsMessageColumnOptions[];
    groupItems: WorkerTotalsGroupItem[];
    isGroup: boolean;
}

class WorkerTotalsMessageColumnOptions
{
    field: string;
    decimalDigits: number;
    aggregateMode: GridAggregateMode;
    type: GridColumnTypeEnum;
    countZeroInAverage?: boolean;
    roundingSettings?: NumberFormatRoundingSettings;
}

class WorkerTotalsGroupItem
{
    groupValue: string;
    dataItems: any[];
}

class WorkerTotalsResult
{
    field: string;
    total: number;
    decimalDigits: number;
    roundingSettings?: NumberFormatRoundingSettings;
    type: GridColumnTypeEnum;
}
//#endregion

//#region Excel
class GridExcelRow
{
    cells: GridExcelCell[];
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
    public groupBy?: string[] | null;
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
    onClose?(): void;
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

class AutoWindowOpenEvent extends VrControlsEvent
{
    sender: Grid;
    window: Window;
    dataItem: any;
    columns?: GridColumn[];
}
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
    pageSize: number;
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