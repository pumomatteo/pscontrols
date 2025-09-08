import { GridModeEnum, GridCheckboxModeEnum, GridServerBindSettings, GridStickerSettings, GridSortSettings, GridSortDirectionEnum, GridGroupBySettings, ControlTypeEnum, GridColumn, GridColumnTypeEnum, createLabel, ControlPositionEnum, TextAlignEnum, puma, div, GridScrollEvent, createComboBox, ComboBoxTypeEnum, createSplitButton, IconClassicLight, prompt, dialog, WindowFooterItemTypeEnum, ButtonModeEnum, createButton, GridHeightModeEnum, GridToolbarItemType, createTextBox, IconClassicRegular, GridAlignEnum, GridAggregateMode, GridButtonSettings, confirm, GridGroupDisplayValueEvent, createCheckBox, GridGroupExpandCollapseEvent, GridGroupEditClickEvent, IconClassicSolid, GridLabelUnderlineMode, NumberFormatSettings, RoundingModeEnum, DateModeEnum, createWindow, createGrid, showLoader, hideLoader, WindowFooterItemAlignEnum, GridStringFilterTypeEnum, WindowAutoSizeDirectionEnum, createSwitch, GridDateFilterTypeEnum, createDatePicker, PositionEnum, GridNumberFilterTypeEnum, TextModeEnum, CheckboxStateEnum, notifyWarning, DateTime, GridPageSelectedEvent, notifyError, notify, GridBeforeExcelExportEvent, alert, GridAfterExcelExportEvent, createButtonGroup, SelectionModeEnum, createColorPicker, GridGroupByItem, GridStickerClickEvent, KeyEnum, GridBeforeGroupCheckEvent, GridAfterGroupCheckEvent } from "../vr.js";
import { VrControl, VrControlOptions, VrControlsEvent } from "../common.js";
import { SplitButtonOptions } from "./splitButton.js";
import { ControlManager } from "../../managers/controlManager.js";
import { ComboBoxOptions } from "./comboBox.js";
import { TextBoxOptions } from "./textbox.js";
import { DatePickerOptions } from "./datePicker.js";
import { Dictionary } from "../../managers/dictionary.js";
import { UtilityManager } from "../../managers/utilityManager.js";
class GridOptions extends VrControlOptions {
  //#region Properties
  columns;
  toolbar;
  dataSource;
  rebind;
  excel;
  tooltip;
  checkboxes;
  dataSourceFieldId;
  rowHeight;
  multilineRows;
  multilineHeader;
  hideEditButton;
  autoWindowSettings;
  mode;
  filterable;
  alternateRowColors;
  hoverRowColor;
  rowColorProperty;
  rowTextColorProperty;
  pageSize;
  footer;
  header;
  resizable;
  reorderable;
  lockable;
  groupBy;
  groupable;
  sortable;
  sortBy;
  serverBinding;
  roundingSettings;
  sticker;
  fixDatasourceWithDate;
  //**********************TODO//**********************
  layoutSettings;
  //#endregion
  //#region Events
  onDataSourceChanged;
  onDataBound;
  onRowDataBound;
  onSelectRow;
  onSelectAllRows;
  onGroupExpandCollapse;
  onGroupEditClick;
  onPageSelected;
  onScroll;
  onBeforeExcelExport;
  onAfterExcelExport;
  onBeforeGroupCheck;
  onAfterGroupCheck;
  //#endregion
}
class Grid extends VrControl {
  //#region Variables
  _fitSpaceColumnPercentage;
  _showTotals;
  _isResizing;
  _isDragging;
  _actualSortingInfo;
  _columnOptions;
  _actualPageSize;
  _actualPageSelected;
  _internalOptions;
  _tempRebindInfo;
  _pageSizeUnlimited;
  _rowCheckedIdList;
  _timeoutFilterText;
  _firstDraw;
  //#region DataSource
  _dataSource;
  _originalDataSource;
  _deletedItems;
  _actualEditedItem;
  _lastIndexAdded;
  _responseForServerBinding;
  _serverBindingPagination;
  //#endregion
  //#region Filtering
  _wndFiltering;
  _dictionaryDataValues;
  _dictionaryFilterConditions;
  //#endregion
  //#region Cart
  _wndCart;
  _grdCart;
  //#endregion
  //#region Show/Hide & Group
  _wndActions;
  _groupByActualValue;
  _originalHiddenColumnFields;
  //#endregion
  //#region Auto window
  _wndAutoWindow;
  //#endregion
  //#region Layout
  _wndLayout;
  _grdLayout;
  _actualLayout;
  _originalOptionsForLayout;
  _customLayouts;
  //#endregion
  //#region Controls
  _cellButtons;
  _cellIcons;
  _cellCustoms;
  _cellLabels;
  _cellImages;
  //#endregion
  //#region Structure
  _elementId;
  _elementLocked;
  _lblSticker;
  _divToolbar;
  _divHeaderContainer;
  _divHeader;
  _divHeaderLocked;
  _divFilters;
  _divFiltersLocked;
  _divBody;
  _divBodyLocked;
  _divTotals;
  _divTotalsLocked;
  _divFooter;
  _spanFitHeaderSpace;
  _spanFitFilterSpace;
  _spanFitTotalsSpace;
  _vrDateTimeFields;
  //#endregion
  //#endregion
  constructor(element, options) {
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
    if (!options.lockable && options.columns.vrAny((k) => k.locked === true))
      options.lockable = true;
    if (options.checkboxes == null || options.checkboxes === false) options.checkboxes = GridCheckboxModeEnum.None;
    if (options.checkboxes === true) options.checkboxes = GridCheckboxModeEnum.MultiCheck;
    if (options.serverBinding == null) options.serverBinding = false;
    if (options.serverBinding === true)
      options.serverBinding = new GridServerBindSettings();
    if (options.serverBinding !== false) {
      if (options.serverBinding.itemCountPropertyName == null) options.serverBinding.itemCountPropertyName = "itemCount";
      if (options.serverBinding.totalsPropertyName == null) options.serverBinding.totalsPropertyName = "totals";
      if (options.serverBinding.excelDownloadUrlPropertyName == null) options.serverBinding.excelDownloadUrlPropertyName = "excelDownloadUrl";
    }
    if (options.sticker == null) options.sticker = new GridStickerSettings();
    if (typeof options.sticker == "string") {
      let text = options.sticker;
      options.sticker = new GridStickerSettings();
      options.sticker.text = text;
    }
    if (options.sticker.textColor == null) options.sticker.textColor = "#000";
    if (options.sticker.backgroundColor == null) options.sticker.backgroundColor = "#e3f1fa";
    if (options.layoutSettings == null || options.layoutSettings === true)
      options.layoutSettings = new GridLayoutSettings();
    if (options.layoutSettings !== false) {
      if (options.layoutSettings.name == null) options.layoutSettings.name = "";
    }
    if (options.sortable == null) options.sortable = true;
    if (options.sortBy != null) {
      let sortByField = options.sortBy;
      if (typeof options.sortBy == "string") {
        options.sortBy = new GridSortSettings();
        options.sortBy.field = String(sortByField);
      }
      if (options.sortBy.direction == null) options.sortBy.direction = GridSortDirectionEnum.Asc;
    }
    if (options.groupable == null)
      options.groupable = true;
    if (options.groupBy != null) {
      if (Array.isArray(options.groupBy)) {
        let groupByFields2 = options.groupBy;
        options.groupBy = new GridGroupBySettings();
        options.groupBy.fields = groupByFields2;
        options.groupBy.sortBy = { field: groupByFields2[0], direction: GridSortDirectionEnum.Asc };
      }
      if (options.groupBy.sortBy == null) options.groupBy.sortBy = new GridSortSettings();
      if (options.groupBy.sortBy.direction == null) options.groupBy.sortBy.direction = GridSortDirectionEnum.Asc;
      let groupByFields = options.groupBy.fields;
      options.groupBy.fields = [];
      if (groupByFields != null) {
        for (let field of groupByFields) {
          if (typeof field == "string")
            options.groupBy.fields.push({ field });
          else
            options.groupBy.fields.push(field);
        }
      }
    }
    for (let column of options.columns) {
      let fieldList = options.columns.map((k) => k.field);
      let fieldListFiltered = fieldList.filter((k) => k == column.field);
      if (fieldListFiltered.length > 1)
        throw new Error("La proprietà 'field' delle colonne deve essere univoca!!!");
    }
    if (options.footer == null || options.footer === true)
      options.footer = new GridFooterSettings();
    if (options.footer !== false) {
      if (options.footer.maxVisiblePages == null) options.footer.maxVisiblePages = 10;
      if (options.footer.showPagination == null) options.footer.showPagination = true;
      if (options.footer.showPageSize == null) options.footer.showPageSize = true;
      if (options.footer.showSettings == null) options.footer.showSettings = true;
      if (options.footer.totalElements == null) options.footer.totalElements = true;
    }
    super(element, options, ControlTypeEnum.Grid);
    this._originalHiddenColumnFields = [];
    this._originalDataSource = [];
    this._dictionaryFilterConditions = /* @__PURE__ */ new Map();
    this._rowCheckedIdList = [];
    if (options.pageSize === false)
      this._pageSizeUnlimited = true;
    this._elementId = element.id;
    this._actualLayout = null;
    if (options.groupBy != null) {
      let optionsFields = options.columns.map((k) => k.field);
      for (let groupByItem of options.groupBy.fields) {
        if (!optionsFields.includes(groupByItem.field)) {
          let column = new GridColumn();
          column.field = groupByItem.field;
          column.title = groupByItem.displayField;
          column.hidden = true;
          options.columns.push(column);
        }
      }
    }
    let layoutList = [];
    if (options.layoutSettings !== false) {
      let layoutJson = new GridLayoutStructure();
      layoutJson.filterConditions = null;
      layoutJson.pageSize = options.pageSize;
      layoutJson.sortingInfo = null;
      if (options.groupBy != null)
        layoutJson.groupBy = JSON.parse(JSON.stringify(options.groupBy));
      let index = 0;
      let layoutColumns = [];
      for (let column of options.columns) {
        let layoutColumn = new GridLayoutColumn();
        layoutColumn.field = column.type == GridColumnTypeEnum.EditButton ? "editButton" : column.field;
        layoutColumn.fitSpace = column.fitSpace;
        layoutColumn.hidden = column.hidden;
        layoutColumn.locked = column.locked;
        layoutColumn.index = index;
        let width = column.width != null ? column.width : column.type == GridColumnTypeEnum.EditButton ? 32 : 100;
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
      this.doWebApiCallLayout(3, getLayoutListRequest, (response) => {
        layoutList = response.tableLayoutList;
        if (layoutList.length > 0) {
          this._customLayouts = layoutList;
          let layoutToLoad = layoutList[0];
          let layoutClass = JSON.parse(layoutToLoad.layoutJson);
          let same = true;
          for (let layoutColumn of layoutClass.columns) {
            if (layoutColumn.field == "editButton" && !options.hideEditButton)
              continue;
            if (!options.columns.map((k) => k.field).includes(layoutColumn.field)) {
              same = false;
              break;
            }
          }
          if (same) {
            this._actualLayout = layoutToLoad;
          }
        }
      });
    }
    this._lastIndexAdded = -1;
    this._dictionaryDataValues = /* @__PURE__ */ new Map();
    this._groupByActualValue = {};
    this._actualPageSize = options.pageSize === false ? 50 : typeof options.pageSize == "number" ? options.pageSize : options.pageSize.value != null ? options.pageSize.value : 50;
    this._actualPageSelected = 1;
    this._serverBindingPagination = new GridServerBindPagination();
    this._serverBindingPagination.indexFrom = 0 * this._actualPageSize;
    this._serverBindingPagination.indexTo = this._serverBindingPagination.indexFrom + this._actualPageSize - 1;
    let divContainer = document.createElement("div");
    divContainer.id = element.id + "_divContainer";
    divContainer.classList.add("p-grid-container");
    element.parentNode.insertBefore(divContainer, element);
    this._lblSticker = createLabel({
      text: options.sticker.text,
      align: TextAlignEnum.Center,
      bold: options.sticker.bold,
      visible: options.sticker.text != null && options.sticker.text.length > 0,
      colorSettings: { background: options.sticker.backgroundColor, textColor: options.sticker.textColor },
      cssContainer: "width: 30px; border: solid 1px #d9d9d9; border-right: none; border-top: solid 2px #25a0da;" + options.sticker.cssContainer,
      css: "transform: rotate(180deg); writing-mode: tb; width: 100%; height: 100%; font-size: 16px;" + options.sticker.css,
      onClick: (e) => {
        if (options.sticker.onClick != null) {
          let clickEvent = new GridStickerClickEvent();
          clickEvent.sender = this;
          clickEvent.control = e.sender;
          clickEvent.value = e.sender.value();
          options.sticker.onClick(clickEvent);
        }
      }
    }, this.container(), ControlPositionEnum.Before);
    this._divHeaderContainer = document.createElement("div");
    this._divHeaderContainer.style.cssText += "height: 35px;";
    divContainer.appendChild(this._divHeaderContainer);
    if (options.lockable) {
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
    if (!options.header) {
      this._divHeaderContainer.style.cssText += "display: none;";
      this._divHeader.style.cssText += "display: none;";
      if (this._divHeaderLocked != null)
        this._divHeaderLocked.style.cssText += "display: none;";
    }
    this._spanFitHeaderSpace = puma("<span id='" + element.id + "FitHeaderSpace' class='grid_fitHeaderSpace'></span>").vrAppendToPuma("#" + element.id + "_divContainer")[0];
    let divFilters = div("#" + element.id + "_divContainer", { css: "height: 31px; display: none;" });
    if (options.lockable)
      this._divFiltersLocked = puma("<div id='" + element.id + "Filters' class='grid_Filters grid_Filters_locked' style='overflow-x: hidden; display: none;'></div>").vrAppendToPuma(divFilters)[0];
    this._divFilters = puma("<div id='" + element.id + "Filters' class='grid_Filters' style='overflow-x: hidden; display: none;'></div>").vrAppendToPuma(divFilters)[0];
    this._spanFitFilterSpace = puma("<span id='" + element.id + "FitFilterSpace' class='grid_fitFilterSpace'></span>").vrAppendToPuma("#" + element.id + "_divContainer")[0];
    let divBodyContainer = div("#" + element.id + "_divContainer", { id: element.id + "_grid_body_container" });
    if (options.lockable)
      this._divBodyLocked = div(divBodyContainer, { class: "grid_body_locked", css: "overflow-y: auto; vertical-align: top; display: inline-block; overflow-x: hidden; border-top: none; border: solid 1px #d9d9d9; border-right: solid 1px #a5a5a5; border-bottom: none;" });
    this._divBody = puma("<div id='" + element.id + "Body' class='grid_Body'></div>").vrAppendToPuma(divBodyContainer)[0];
    puma(this._divBody).scroll((e) => {
      puma(this._divFilters).scrollLeft(puma(this._divBody).scrollLeft());
      puma(this._divHeader).scrollLeft(puma(this._divBody).scrollLeft());
      puma(this._divTotals).scrollLeft(puma(this._divBody).scrollLeft());
      puma(this._divBodyLocked).scrollTop(puma(this._divBody).scrollTop());
      if (options.onScroll != null) {
        let scrollEvent = new GridScrollEvent();
        scrollEvent.sender = this;
        scrollEvent.target = e.target;
        scrollEvent.scrollLeft = puma(this._divBody).scrollLeft();
        scrollEvent.scrollTop = puma(this._divBody).scrollTop();
        options.onScroll(scrollEvent);
      }
    });
    puma(this._divBodyLocked).scroll((e) => {
      puma(this._divBody).scrollTop(puma(this._divBodyLocked).scrollTop());
      if (options.onScroll != null) {
        let scrollEvent = new GridScrollEvent();
        scrollEvent.sender = this;
        scrollEvent.target = e.target;
        scrollEvent.scrollLeft = puma(this._divBody).scrollLeft();
        scrollEvent.scrollTop = puma(this._divBody).scrollTop();
        options.onScroll(scrollEvent);
      }
    });
    let divTotals = div("#" + element.id + "_divContainer", { css: "height: 23px; display: none;" });
    if (options.lockable)
      this._divTotalsLocked = puma("<div id='" + element.id + "Totals' class='grid_Totals grid_Totals_locked' style='overflow-x: hidden; display: none;'></div>").vrAppendToPuma(divTotals)[0];
    this._divTotals = puma("<div id='" + element.id + "Totals' class='grid_Totals' style='overflow-x: hidden; display: none;'></div>").vrAppendToPuma(divTotals)[0];
    this._showTotals = options.columns.vrAny((k) => k.aggregate != null && k.aggregate !== false);
    this._spanFitTotalsSpace = puma("<span id='" + element.id + "FitTotalsSpace' class='grid_fitTotalsSpace'></span>").vrAppendToPuma("#" + element.id + "_divContainer")[0];
    if (options.footer !== false) {
      this._divFooter = puma("<div id='" + element.id + "Footer' class='p-grid-footer'></div>").vrAppendToPuma("#" + element.id + "_divContainer")[0];
      let divPagination = document.createElement("div");
      divPagination.id = element.id + "_footerPagination";
      this._divFooter.appendChild(divPagination);
      if (options.footer.showPageSize && typeof options.pageSize != "boolean") {
        let pageSizeItems = [
          { text: "50", value: "50", numberValue: 50 },
          { text: "100", value: "100", numberValue: 100 }
        ];
        if (this._actualPageSize > 100) {
          pageSizeItems.push({ text: "200", value: "200", numberValue: 200 });
          pageSizeItems.push({ text: "500", value: "500", numberValue: 500 });
        }
        if (typeof options.pageSize != "number") {
          let otherValues = options.pageSize.otherValues;
          options.pageSize = options.pageSize.value != null ? options.pageSize.value : 50;
          for (let otherValue of otherValues)
            pageSizeItems.push({ text: String(otherValue), value: String(otherValue), numberValue: otherValue });
        }
        pageSizeItems.push({ text: String(options.pageSize), value: String(options.pageSize), numberValue: Number(options.pageSize) });
        pageSizeItems = pageSizeItems.vrDistinctBy((k) => k.numberValue);
        pageSizeItems.vrSortBy(["numberValue"], true);
        createComboBox(
          {
            width: 65,
            mode: ComboBoxTypeEnum.DropDown,
            cssContainer: "margin-top: 3px;",
            css: "border: solid 1px #d9d9d9 !important;",
            items: pageSizeItems,
            value: String(options.pageSize),
            onAfterChange: (e) => {
              if (options.columns.length > 10)
                showLoader();
              window.setTimeout(() => {
                this.pageSize(Number(e.sender.value()), true);
                hideLoader();
              }, 200);
            }
          },
          this._divFooter,
          null,
          element.id + "_ddlPageSize"
        );
      }
      if (options.footer.showSettings) {
        let spbSettingsControl = createSplitButton(
          {
            icon: IconClassicLight.Gear,
            cssContainer: "top: 2px; margin-left: 5px;",
            items: [
              {
                text: "Salva layout",
                icon: IconClassicLight.Table,
                onClick: (e) => {
                  if (this._actualLayout == null)
                    prompt("Assegna un nome a questo layout", { title: "Salva layout" }).then((value) => this.saveLayout(value));
                  else {
                    dialog(
                      "Vuoi sovrascrivere questo layout, o crearne uno nuovo?",
                      {
                        title: "Salva layout",
                        footerItems: [
                          { text: "Annulla", type: WindowFooterItemTypeEnum.Close },
                          {
                            text: "Sovrascrivi",
                            mode: ButtonModeEnum.Primary,
                            onClick: (e2) => {
                              this.saveLayout(this._actualLayout.layoutName);
                              e2.sender.close();
                            }
                          },
                          {
                            text: "Crea nuovo",
                            mode: ButtonModeEnum.Primary,
                            onClick: (e2) => {
                              prompt("Assegna un nome a questo layout", { title: "Nome layout" }).then((value) => {
                                this._actualLayout = null;
                                this.saveLayout(value);
                                e2.sender.close();
                              });
                            }
                          }
                        ]
                      }
                    );
                  }
                }
              },
              {
                text: "Gestisci layout",
                icon: IconClassicLight.Table,
                value: "manageLayout",
                onClick: (e) => this.openWindowLayout()
              },
              {
                text: "Ripristina layout di base",
                icon: IconClassicLight.Table,
                value: "restoreBaseLayout",
                confirmationMessage: "Confermi di voler ripristinare il layout di base?",
                onClick: (e) => {
                  this._actualLayout = null;
                  this.changeLayout(true, this._originalOptionsForLayout);
                }
              },
              {
                text: "Mostra/Nascondi",
                icon: IconClassicLight.Eye,
                onClick: (e) => this.openWindowActions(
                  0
                  /* ShowHide */
                )
              },
              {
                text: "Raggruppa per...",
                icon: IconClassicLight.Users,
                visible: options.groupable,
                onClick: (e) => this.openWindowActions(
                  1
                  /* GroupBy */
                )
              },
              {
                text: "Blocca/Sblocca",
                icon: IconClassicLight.Lock,
                visible: options.lockable,
                onClick: (e) => this.openWindowActions(
                  2
                  /* LockUnlock */
                )
              }
            ]
          },
          this._divFooter,
          null,
          this._elementId + "_spbSettings"
        );
        if (layoutList.length == 0)
          window.setTimeout(() => spbSettingsControl.hideItem("manageLayout"));
      }
      if (options.footer.cartSettings != null) {
        if (!options.footer.cartSettings.fields.vrAny((k) => k != "" && k != null))
          throw Error("Cart fields required");
        let btnCart = createButton({
          icon: IconClassicLight.CartShopping,
          cssContainer: "position: absolute; border: none; border-left: solid 1px #CCC; right: 10px; margin-top: 3px;",
          css: "background: none; border: none;",
          onClick: (e) => {
            let cartSettings = options.footer.cartSettings;
            if (cartSettings.onClick != null)
              cartSettings.onClick({ sender: this, selectedValues: this.getCheckedValues() });
            else {
              let checkedValues = this.getCheckedValues();
              if (checkedValues.length > 0)
                this.openWindowCart();
            }
          }
        }, this._divFooter, null, element.id + "_btnCart");
        btnCart.badge("0");
      }
    }
    if (options.css != null)
      puma("#" + element.id + "_divContainer")[0].style.cssText += options.css;
    puma(element).addClass("p-grid");
    puma(element).css("border-collapse", "collapse");
    if (typeof options.alternateRowColors === "string")
      puma("<style>#" + element.id + " .p-grid tr.p-grid-body:nth-child(odd) { background-color: " + options.alternateRowColors + "; }</style>").vrAppendToPuma("head");
    else if (options.alternateRowColors === true)
      puma(element).addClass("alternateRowsColor");
    if (options.hoverRowColor)
      puma(element).addClass("p-grid-hover");
    if (options.height == null) options.height = GridHeightModeEnum.FitContent;
    if (options.height == GridHeightModeEnum.FitContent)
      options.height = "auto";
    puma(this._divBody).height(options.height);
    let heightContainer = typeof options.height == "number" ? options.height + 2 : options.height;
    puma("#" + this.element().id + "_grid_body_container").height(heightContainer);
    if (options.lockable) puma(this._divBodyLocked).height(options.height);
    if (this._lblSticker != null) {
      let headerHeight = puma(this._divHeader).is(":visible") ? 34 : 0;
      let filtersHeight = options.filterable ? 30 : 0;
      let totalsheight = this._showTotals ? 25 : 0;
      puma(this._lblSticker.container()).height(puma("#" + this.element().id + "_grid_body_container").height() + headerHeight + filtersHeight + totalsheight - 1);
    }
    puma(this._divBody).vrAppendPuma(element);
    if (options.lockable) {
      this._elementLocked = puma("<table class='p-grid p-grid-locked' style='border-collapse: collapse;'></table>")[0];
      if (options.alternateRowColors === true) puma(this._elementLocked).addClass("alternateRowsColor");
      if (options.hoverRowColor) puma(this._elementLocked).addClass("p-grid-hover");
      puma(this._divBodyLocked).vrAppendPuma(this._elementLocked);
    }
    let editButtonColumnsNumber = options.columns.filter((k) => k.type == GridColumnTypeEnum.EditButton).length;
    if (editButtonColumnsNumber > 1)
      throw Error("Non possono coesistere due o più colonne di edit!");
    if (editButtonColumnsNumber == 1) {
      let indexEditButtonColumn = options.columns.findIndex((k) => k.type == GridColumnTypeEnum.EditButton);
      options.columns[indexEditButtonColumn].field = "editButton";
      options.columns[indexEditButtonColumn].locked = this.thereAreLockedColumns();
    }
    if (editButtonColumnsNumber == 0 && !options.hideEditButton)
      options.columns.unshift({ type: GridColumnTypeEnum.EditButton, field: "editButton", locked: this.thereAreLockedColumns() });
    puma(element).width(options.width);
    puma("#" + element.id + "_divContainer").width(options.width);
    this.recalculateFitSpacePercentage();
    if (options.toolbar != null) {
      this._divToolbar = puma("<div id='" + element.id + "Toolbar' class='grid_divToolbar'></div>").vrPrependToPuma("#" + element.id + "_divContainer")[0];
      let separatorCount = 0;
      for (let toolbarItem of options.toolbar) {
        if (toolbarItem.type != null && toolbarItem.type == GridToolbarItemType.Separator && (toolbarItem.value == "" || toolbarItem.value == null)) {
          toolbarItem.value = "separator" + separatorCount;
          separatorCount++;
        }
        this.addToolbarItem(toolbarItem);
      }
    }
    puma(this._divHeader).vrAppendPuma("<table class='p-grid'><thead><tr class='p-grid-headerColumn'></tr></thead></table>");
    if (options.lockable)
      puma(this._divHeaderLocked).vrAppendPuma("<table class='p-grid p-grid-locked'><thead><tr class='p-grid-headerColumn'></tr></thead></table>");
    if (options.groupable || options.groupBy != null) {
      let tdHeaderFragment = document.createDocumentFragment();
      let tdHeaderLockedFragment = document.createDocumentFragment();
      for (let column of options.columns) {
        let display = "";
        if (options.groupBy == null || !options.groupBy.fields.map((k) => k.field).includes(column.field))
          display = "display: none;";
        let thHeader = document.createElement("th");
        thHeader.setAttribute("field", "groupBy" + column.field);
        thHeader.classList.add("groupBy" + column.field, "groupByHeader");
        thHeader.style.cssText += display;
        tdHeaderFragment.appendChild(thHeader);
        if (options.lockable) {
          let thHeaderLocked = document.createElement("th");
          thHeaderLocked.setAttribute("field", "groupBy" + column.field);
          thHeaderLocked.classList.add("groupBy" + column.field, "groupByHeader");
          thHeaderLocked.style.cssText += display;
          tdHeaderLockedFragment.appendChild(thHeaderLocked);
        }
      }
      puma(this._divHeader).find(".p-grid-headerColumn")[0].appendChild(tdHeaderFragment);
      if (options.lockable)
        puma(this._divHeaderLocked).find(".p-grid-headerColumn")[0].appendChild(tdHeaderLockedFragment);
    }
    if (options.checkboxes != GridCheckboxModeEnum.None) {
      let thCheckbox = document.createElement("th");
      thCheckbox.style.cssText += "width: 20px;";
      puma(thCheckbox).attr("field", "vrGridCheckboxColumn");
      puma(thCheckbox).css("background-color", "#51B3E1");
      puma(thCheckbox).css("color", "#FFF");
      let textHTML = "<input id='" + element.id + "header_CheckboxColumn' class='vrCheckBox' type='checkbox'></input><label class='vrCheckBoxLabel vr-checkboxColumnHeader-label' for='header_CheckboxColumn'></label>";
      thCheckbox.innerHTML = textHTML;
      puma(thCheckbox).css("text-align", "center");
      if (this.thereAreLockedColumns())
        puma(this._divHeaderLocked).find(".p-grid-headerColumn").vrAppendPuma(thCheckbox);
      else
        puma(this._divHeader).find(".p-grid-headerColumn").vrAppendPuma(thCheckbox);
      if (options.checkboxes == GridCheckboxModeEnum.SingleCheck)
        puma(thCheckbox).children().hide();
      else {
        puma(thCheckbox).click((e) => {
          let isChecked = e.target.checked;
          if (isChecked)
            this.checkAllRows();
          else
            this.unCheckAllRows();
        });
      }
    }
    let thColumnHeaderFragment = document.createDocumentFragment();
    let thColumnHeaderLockedFragment = document.createDocumentFragment();
    for (let column of options.columns) {
      let th = document.createElement("th");
      th.setAttribute("field", column.field);
      let title = column.title != null ? column.title : "";
      th.setAttribute("title", title);
      if (column.headerSettings != null && column.headerSettings.icon != null)
        title = "<i class='" + column.headerSettings.icon + "'></i>" + title;
      if (column.bold === true)
        th.style.cssText += "font-weight: 600;";
      if (column.headerSettings != null && column.headerSettings.css != null)
        th.style.cssText += column.headerSettings.css;
      th.innerHTML = "<div class='grid_headerTh'><span class='grid_headerThContent'>" + title + "</span><i></i></div>";
      let thWidth = String(column.width != null ? column.width : column.fitSpace == true ? this._fitSpaceColumnPercentage + "%" : column.type == GridColumnTypeEnum.EditButton ? 32 : 100);
      th.style.cssText += "width: " + thWidth + "px;";
      if (column.fitSpace == true)
        th.setAttribute("fitSpace", "true");
      if (column.headerSettings != null) {
        if (column.headerSettings.backgroundColor != null)
          th.style.cssText += "background-color: " + column.headerSettings.backgroundColor + ";";
        if (column.headerSettings.color != null)
          th.style.cssText += "color: " + column.headerSettings.color + ";";
      }
      if (column.headerSettings != null && column.headerSettings.textAlign != null)
        th.style.cssText += "text-align: " + column.headerSettings.textAlign + ";";
      if (options.tooltip) {
        let tooltip = "";
        if (column.headerSettings != null) {
          if (column.headerSettings.tooltip == true)
            tooltip = column.title == null ? "" : column.title;
          else if (typeof column.headerSettings.tooltip == "string")
            tooltip = column.headerSettings.tooltip;
        }
        if (tooltip.length > 0)
          th.setAttribute("title", tooltip);
      }
      let sortGridColumnTypes = [
        GridColumnTypeEnum.Currency,
        GridColumnTypeEnum.Date,
        GridColumnTypeEnum.DateTime,
        GridColumnTypeEnum.Duration,
        GridColumnTypeEnum.Label,
        GridColumnTypeEnum.Number,
        GridColumnTypeEnum.Percentage,
        GridColumnTypeEnum.String,
        GridColumnTypeEnum.Time,
        GridColumnTypeEnum.LongDate,
        GridColumnTypeEnum.LongDateTime,
        GridColumnTypeEnum.LongWeekDate,
        GridColumnTypeEnum.ShortWeekDate
      ];
      if (sortGridColumnTypes.includes(column.type)) {
        th.onclick = (() => {
          if (this._isResizing === true || this._isDragging === true)
            return;
          if (puma(th).attr("sortMode") == null)
            this.sort(column.field, GridSortDirectionEnum.Asc);
          else {
            let sortMode = Number(puma(th).attr("sortMode"));
            if (sortMode == GridSortDirectionEnum.Asc)
              this.sort(column.field, GridSortDirectionEnum.Desc);
            else
              this.removeSort();
          }
        });
      } else
        th.style.cssText += "cursor: grab;";
      if (options.lockable && column.locked) {
        th.setAttribute("locked", "locked");
        thColumnHeaderLockedFragment.appendChild(th);
      } else
        thColumnHeaderFragment.appendChild(th);
      if (column.hidden == true)
        th.style.display = "none";
    }
    puma(this._divHeader).find(".p-grid-headerColumn")[0].appendChild(thColumnHeaderFragment);
    if (options.lockable)
      puma(this._divHeaderLocked).find(".p-grid-headerColumn")[0].appendChild(thColumnHeaderLockedFragment);
    if (options.lockable && this.thereAreLockedColumns())
      puma(this._divHeader).width("Calc(100% - " + (puma(this._divHeaderLocked).width() + 5) + "px)");
    if (options.filterable) {
      puma(divFilters).show();
      puma(this._divFilters)[0].style.cssText += "display: inline-block";
      puma(this._divFilters).vrAppendPuma("<table class='p-grid'><thead><tr class='p-grid-filters'></tr></thead></table>");
      if (options.lockable) {
        puma(this._divFiltersLocked)[0].style.cssText += "display: inline-block";
        puma(this._divFiltersLocked).vrAppendPuma("<table class='p-grid p-grid-locked'><thead><tr class='p-grid-filters'></tr></thead></table>");
      }
      if (options.groupable || options.groupBy != null) {
        let tdFilterFragment = document.createDocumentFragment();
        let tdFilterLockedFragment = document.createDocumentFragment();
        for (let column of options.columns) {
          let display = "";
          if (options.groupBy == null || !options.groupBy.fields.map((k) => k.field).includes(column.field))
            display = "display: none;";
          let tdFilter = document.createElement("td");
          tdFilter.setAttribute("field", "groupBy" + column.field);
          tdFilter.classList.add("groupBy" + column.field, "groupByFilter");
          tdFilter.style.cssText += display;
          tdFilterFragment.appendChild(tdFilter);
          if (options.lockable) {
            let tdFilterLocked = document.createElement("td");
            tdFilterLocked.setAttribute("field", "groupBy" + column.field);
            tdFilterLocked.classList.add("groupBy" + column.field, "groupByFilter");
            tdFilterLocked.style.cssText += display;
            tdFilterLockedFragment.appendChild(tdFilterLocked);
          }
        }
        puma(this._divFilters).find(".p-grid-filters")[0].appendChild(tdFilterFragment);
        if (options.lockable)
          puma(this._divFiltersLocked).find(".p-grid-filters")[0].appendChild(tdFilterLockedFragment);
      }
      if (options.checkboxes != GridCheckboxModeEnum.None) {
        let thCheckbox = document.createElement("td");
        puma(thCheckbox).attr("field", "vrGridCheckboxColumn");
        thCheckbox.style.cssText += "width: 20px;";
        if (this.thereAreLockedColumns())
          puma(this._divFiltersLocked).find(".p-grid-filters").vrAppendPuma(thCheckbox);
        else
          puma(this._divFilters).find(".p-grid-filters").vrAppendPuma(thCheckbox);
      }
      let tdColumnFilterFragment = document.createDocumentFragment();
      let tdColumnFilterLockedFragment = document.createDocumentFragment();
      for (let column of options.columns) {
        if (column.type != GridColumnTypeEnum.EditButton)
          this._dictionaryDataValues.set(column.field, []);
        let td = document.createElement("td");
        td.setAttribute("field", column.field);
        let tdWidth = String(column.width != null ? column.width : column.fitSpace == true ? this._fitSpaceColumnPercentage + "%" : column.type == GridColumnTypeEnum.EditButton ? 32 : 100);
        td.style.cssText += "width: " + tdWidth + "px;";
        if (column.fitSpace == true)
          td.setAttribute("fitSpace", "true");
        if (column.type == GridColumnTypeEnum.Custom && column.filterable == null || column.type == GridColumnTypeEnum.Color)
          column.filterable = false;
        if (column.type != null && column.filterable !== false) {
          switch (column.type) {
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
                checkbox.onclick = ((e) => {
                  if (checkbox.checked && !checkbox.classList.contains("indeterminateVrCheckbox")) {
                    checkbox.classList.add("indeterminateVrCheckbox");
                    this.removeFilter(column.field);
                    e.preventDefault();
                  } else {
                    checkbox.classList.remove("indeterminateVrCheckbox");
                    let filterSettings = new GridFilterSettings();
                    filterSettings.type = column.type;
                    filterSettings.checkboxFilterSettings = new GridCheckboxFilterSettings();
                    filterSettings.checkboxFilterSettings.value = checkbox.checked;
                    this.updateFilter(column.field, filterSettings, false);
                    this.applyFilters(true);
                  }
                });
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
                let dateFilter = createButton(
                  {
                    id: this._elementId + "_DateFilter_" + column.field,
                    icon: IconClassicLight.Filter,
                    tooltip: "Applica filtro",
                    onClick: (e) => {
                      this.openWindowFiltering(column);
                    }
                  },
                  td
                );
                let dateFilterRemove = createButton(
                  {
                    id: this._elementId + "_DateFilterRemove_" + column.field,
                    icon: IconClassicRegular.Xmark,
                    tooltip: "Rimuovi filtro",
                    colorSettings: { background: "#CCC" },
                    visible: false,
                    cssContainer: "margin-left: 5px;",
                    onClick: (e) => {
                      this.removeFilter(column.field);
                      dateFilter.tooltip("");
                      dateFilter.element().style.cssText += "background-color: #f3f3f3; color: #000;";
                      dateFilterRemove.hide();
                      this.recalculateHeight(true);
                    }
                  },
                  td
                );
              }
              break;
            case GridColumnTypeEnum.Number:
            case GridColumnTypeEnum.Currency:
            case GridColumnTypeEnum.Percentage:
            case GridColumnTypeEnum.Duration:
              {
                td.style.cssText += "text-align: center;";
                let numberFilter = createButton(
                  {
                    id: this._elementId + "_NumberFilter_" + column.field,
                    icon: IconClassicLight.Filter,
                    tooltip: "Applica filtro",
                    onClick: (e) => {
                      this.openWindowFiltering(column);
                    }
                  },
                  td
                );
                let numberFilterRemove = createButton(
                  {
                    id: this._elementId + "_NumberFilterRemove_" + column.field,
                    icon: IconClassicRegular.Xmark,
                    tooltip: "Rimuovi filtro",
                    colorSettings: { background: "#CCC" },
                    visible: false,
                    cssContainer: "margin-left: 5px;",
                    onClick: (e) => {
                      this.removeFilter(column.field);
                      numberFilter.tooltip("");
                      numberFilter.element().style.cssText += "background-color: #f3f3f3; color: #000;";
                      numberFilterRemove.hide();
                      this.recalculateHeight(true);
                    }
                  },
                  td
                );
              }
              break;
            case GridColumnTypeEnum.String:
            case GridColumnTypeEnum.Custom:
            case GridColumnTypeEnum.Label:
              {
                this._timeoutFilterText = 0;
                let txtValue = createTextBox(
                  {
                    icon: column.type == GridColumnTypeEnum.Custom ? IconClassicLight.Search : void 0,
                    placeholder: column.type == GridColumnTypeEnum.Custom ? "Cerca..." : void 0,
                    width: this.isRepeater() ? "100%" : "Calc(100% - 27px)",
                    attributes: [{ name: "field", value: column.field }],
                    onPaste: (e) => {
                      clearTimeout(this._timeoutFilterText);
                      let textToSearch = String(e.value).trim().toLowerCase();
                      let field = e.sender.element().getAttribute("field");
                      this.manageFilterTextByColumn(textToSearch, column, field, false);
                    },
                    onKeyUp: (e) => {
                      if (e.tabKey)
                        return;
                      btnStringFilter.tooltip("");
                      btnStringFilter.element().style.cssText += "background-color: #f3f3f3; color: #000;";
                      btnStringFilterRemove.hide();
                      if (this.isRepeater())
                        e.sender.width("100%");
                      else
                        e.sender.width("Calc(100% - 27px)");
                      clearTimeout(this._timeoutFilterText);
                      let textToSearch = e.sender.value().toLowerCase();
                      let field = e.sender.element().getAttribute("field");
                      if (options.serverBinding !== false) {
                        let filterSettings = new GridFilterSettings();
                        filterSettings.type = column.type;
                        filterSettings.stringFilterSettings = new GridStringFilterSettings();
                        filterSettings.stringFilterSettings.filterTypeEnum = GridStringFilterTypeEnum.IncludesFromSimpleSearch;
                        filterSettings.stringFilterSettings.text = textToSearch.toLowerCase();
                        if (textToSearch.length == 0)
                          this.removeFilter(e.sender.element().getAttribute("field"), false);
                        else
                          this.updateFilter(column.field, filterSettings, false);
                        if (e.key == KeyEnum.Enter) {
                          if (textToSearch.length == 0)
                            this.rebind(null, true);
                          else
                            this.updateFilter(column.field, filterSettings);
                        }
                        return;
                      }
                      if (textToSearch.length == 0) {
                        this.removeFilter(e.sender.element().getAttribute("field"), false);
                        window.setTimeout(() => {
                          if (column.filterWebService === true)
                            this.rebind(null, true);
                          else
                            this.applyFilters(true);
                        }, 100);
                        return;
                      }
                      this.manageFilterTextByColumn(textToSearch, column, field, e.backSpaceKey);
                    }
                  },
                  td,
                  null,
                  this._elementId + "_StringFilter_" + column.field
                );
                let btnStringFilter = createButton(
                  {
                    icon: IconClassicLight.Filter,
                    tooltip: "Applica filtro",
                    visible: !this.isRepeater(),
                    onClick: (e) => {
                      this.openWindowFiltering(column);
                    }
                  },
                  td,
                  null,
                  this._elementId + "_StringFilterBtn_" + column.field
                );
                let btnStringFilterRemove = createButton(
                  {
                    icon: IconClassicRegular.Xmark,
                    tooltip: "Rimuovi filtro",
                    colorSettings: { background: "#CCC" },
                    visible: false,
                    cssContainer: "margin-left: 5px;",
                    onClick: (e) => {
                      this.removeFilter(column.field);
                      btnStringFilter.tooltip("");
                      btnStringFilter.element().style.cssText += "background-color: #f3f3f3; color: #000;";
                      btnStringFilterRemove.hide();
                      this.recalculateHeight(true);
                      txtValue.width("Calc(100% - 27px");
                    }
                  },
                  td,
                  null,
                  this._elementId + "_StringFilterBtnRemove_" + column.field
                );
              }
              break;
            default:
              td.innerHTML = "";
              break;
          }
        }
        if (options.lockable && column.locked)
          tdColumnFilterLockedFragment.appendChild(td);
        else
          tdColumnFilterFragment.appendChild(td);
        if (column.hidden === true)
          td.style.display = "none";
      }
      puma(this._divFilters).find(".p-grid-filters")[0].appendChild(tdColumnFilterFragment);
      if (options.lockable)
        puma(this._divFiltersLocked).find(".p-grid-filters")[0].appendChild(tdColumnFilterLockedFragment);
      if (options.lockable && this.thereAreLockedColumns())
        puma(this._divFilters).width("Calc(100% - " + (puma(this._divHeaderLocked).width() + 5) + "px)");
    }
    if (this._showTotals) {
      puma(divTotals).show();
      puma(this._divTotals)[0].style.cssText += "display: inline-block";
      puma(this._divTotals).vrAppendPuma("<table class='p-grid'><thead><tr class='p-grid-totals'></tr></thead></table>");
      if (options.lockable) {
        puma(this._divTotalsLocked)[0].style.cssText += "display: inline-block";
        puma(this._divTotalsLocked).vrAppendPuma("<table class='p-grid p-grid-locked'><thead><tr class='p-grid-totals'></tr></thead></table>");
      }
      if (options.groupable || options.groupBy != null) {
        let tdTotalsFragment = document.createDocumentFragment();
        let tdTotalsLockedFragment = document.createDocumentFragment();
        for (let column of options.columns) {
          let display = "";
          if (options.groupBy == null || !options.groupBy.fields.map((k) => k.field).includes(column.field))
            display = "display: none;";
          let tdTotals = document.createElement("td");
          tdTotals.setAttribute("field", "groupBy" + column.field);
          tdTotals.classList.add("groupBy" + column.field, "groupByTotal");
          tdTotals.style.cssText += display;
          tdTotalsFragment.appendChild(tdTotals);
          if (options.lockable) {
            let tdTotalsLocked = document.createElement("td");
            tdTotalsLocked.setAttribute("field", "groupBy" + column.field);
            tdTotalsLocked.classList.add("groupBy" + column.field, "groupByTotal");
            tdTotalsLocked.style.cssText += display;
            tdTotalsLockedFragment.appendChild(tdTotalsLocked);
          }
        }
        puma(this._divTotals).find(".p-grid-totals")[0].appendChild(tdTotalsFragment);
        if (options.lockable)
          puma(this._divTotalsLocked).find(".p-grid-totals")[0].appendChild(tdTotalsLockedFragment);
      }
      if (options.checkboxes != GridCheckboxModeEnum.None) {
        let thCheckbox = document.createElement("td");
        thCheckbox.setAttribute("field", "vrGridCheckboxColumn");
        thCheckbox.style.cssText += "width: 20px;";
        if (this.thereAreLockedColumns())
          puma(this._divTotalsLocked).find(".p-grid-totals").vrAppendPuma(thCheckbox);
        else
          puma(this._divTotals).find(".p-grid-totals").vrAppendPuma(thCheckbox);
      }
      let tdColumnTotalsFragment = document.createDocumentFragment();
      let tdColumnTotalsLockedFragment = document.createDocumentFragment();
      for (let column of options.columns) {
        let td = document.createElement("td");
        td.setAttribute("field", column.field);
        let tdWidth = String(column.width != null ? column.width : column.fitSpace == true ? this._fitSpaceColumnPercentage + "%" : column.type == GridColumnTypeEnum.EditButton ? 32 : 100);
        td.style.cssText += "width: " + tdWidth + "px;";
        if (column.fitSpace == true)
          td.setAttribute("fitSpace", "true");
        let textAlign = GridAlignEnum.Right;
        switch (column.type) {
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
          textAlign = column.cellSettings.textAlign != null ? column.cellSettings.textAlign : textAlign;
        td.style.cssText += "text-align: " + textAlign + ";";
        if (column.aggregate != null && column.aggregate !== false) {
          if (typeof column.aggregate == "boolean") {
            switch (column.type) {
              case GridColumnTypeEnum.Number:
                column.aggregate = GridAggregateMode.Sum;
                break;
              case GridColumnTypeEnum.Currency:
                column.aggregate = GridAggregateMode.Sum;
                break;
              case GridColumnTypeEnum.Duration:
                column.aggregate = GridAggregateMode.Sum;
                break;
              case GridColumnTypeEnum.Percentage:
                column.aggregate = GridAggregateMode.Average;
                break;
            }
          }
          switch (column.type) {
            case GridColumnTypeEnum.Number:
              column.decimalDigits = column.decimalDigits != null ? column.decimalDigits : 0;
              break;
            case GridColumnTypeEnum.Currency:
              column.decimalDigits = column.decimalDigits != null ? column.decimalDigits : 2;
              break;
            case GridColumnTypeEnum.Duration:
              column.decimalDigits = column.decimalDigits != null ? column.decimalDigits : 0;
              break;
            case GridColumnTypeEnum.Percentage:
              column.decimalDigits = column.decimalDigits != null ? column.decimalDigits : 2;
              break;
          }
        }
        if (column.type == GridColumnTypeEnum.Custom && column.exportable == null)
          column.exportable = false;
        if (options.lockable && column.locked)
          tdColumnTotalsLockedFragment.appendChild(td);
        else
          tdColumnTotalsFragment.appendChild(td);
        if (column.hidden == true)
          td.style.display = "none";
      }
      puma(this._divTotals).find(".p-grid-totals")[0].appendChild(tdColumnTotalsFragment);
      if (options.lockable)
        puma(this._divTotalsLocked).find(".p-grid-totals")[0].appendChild(tdColumnTotalsLockedFragment);
      if (this.thereAreLockedColumns())
        puma(this._divTotals).width("Calc(100% - " + (puma(this._divHeaderLocked).width() + 5) + "px)");
    } else
      puma(this._divTotals).hide();
    if (options.lockable) {
      if (!this.thereAreLockedColumns()) {
        if (this._divHeaderLocked != null) this._divHeaderLocked.style.cssText += "display: none;";
        if (this._divFiltersLocked != null) this._divFiltersLocked.style.cssText += "display: none;";
        if (this._divBodyLocked != null) this._divBodyLocked.style.cssText += "display: none;";
        if (this._divTotalsLocked != null) this._divTotalsLocked.style.cssText += "display: none;";
      } else {
        puma(this._divBody).width("Calc(100% - " + (puma(this._divHeaderLocked).width() + 5) + "px)");
        puma(this._divBodyLocked).width(puma(this._divHeaderLocked).width());
      }
    }
    this._internalOptions = options;
    if (this._actualLayout != null)
      this.changeLayout();
    if (options.dataSource != null)
      this.dataSource(options.dataSource);
    else
      this.recalculateHeight();
    if (options.rebind != null && options.rebind.rebindAtStartup === true)
      this.doWebApiCall(
        options.rebind,
        1
        /* Rebind */
      );
    if (options.enable === false)
      this.enable(options.enable);
    let thHeaderList = Array.from(puma(this._divHeader).find("table th"));
    if (options.lockable)
      thHeaderList.vrPushRange(Array.from(puma(this._divHeaderLocked).find("table th")));
    this._columnOptions = [];
    for (let th of thHeaderList) {
      let columnPosition = new GridColumnPosition();
      columnPosition.field = th.getAttribute("field");
      columnPosition.left = th.offsetLeft;
      columnPosition.right = puma(th).offset().left + puma(th).width();
      columnPosition.index = puma(th).index();
      columnPosition.th = th;
      this._columnOptions.push(columnPosition);
    }
    if (options.resizable)
      this.resizable();
    if (options.reorderable)
      this.draggableColumns();
    if (options.groupBy != null) {
      for (let groupByProperty of options.groupBy.fields)
        this._groupByActualValue[groupByProperty.field] = void 0;
    }
    puma(window).on("resize", () => {
      this.recalculateHeight();
      this.recalculateWidth();
    });
  }
  //#region Methods
  //#region DataSource
  rebind(parameters, filterWithWebService = false, keepInfo = true, loadingElement) {
    let promise = new Promise((callback) => {
      if (filterWithWebService) {
        let tableSearchingInfoList = [];
        this._dictionaryFilterConditions.forEach((value, key, dic) => {
          if (value.stringFilterSettings != null) {
            let tableSearchingInfo = new GridSearchingInfo();
            tableSearchingInfo.field = key;
            tableSearchingInfo.text = value.stringFilterSettings.text;
            tableSearchingInfoList.push(tableSearchingInfo);
          }
        });
        parameters = { tableSearchingInfoList };
      }
      let options = this.getOptions();
      if (options.rebind != null) {
        options.rebind.otherParameters = void 0;
        if (parameters != null)
          options.rebind.otherParameters = parameters;
        if (keepInfo) {
          this._tempRebindInfo = new TempRebindInfo();
          this._tempRebindInfo.checkedValues = this.getCheckedValues();
          this._tempRebindInfo.page = this.pageSelected();
          this._tempRebindInfo.yPosition = puma(this.container()).find(".grid_Body")[0].scrollTop;
        } else
          this._tempRebindInfo = null;
        options.rebind.tempLoadingElement = loadingElement;
        this.clearSelection();
        this.doWebApiCall(options.rebind, 1, callback);
      }
    });
    return promise;
  }
  rebindSpecificRows(itemIdList, update = true, keepInfo = true, loadingElement) {
    let options = this.getOptions();
    if (options.rebind != null) {
      if (options.rebind.specificItemIdListPropertyName == null)
        options.rebind.specificItemIdListPropertyName = "specificItemIdList";
      options.rebind.otherParameters = {};
      options.rebind.otherParameters[options.rebind.specificItemIdListPropertyName] = itemIdList;
      options.rebind.otherParameters["update"] = update;
      options.rebind.loadingElement = loadingElement;
      if (keepInfo) {
        this._tempRebindInfo = new TempRebindInfo();
        this._tempRebindInfo.checkedValues = this.getCheckedValues();
        this._tempRebindInfo.page = this.pageSelected();
        this._tempRebindInfo.yPosition = puma(this.container()).find(".grid_Body")[0].scrollTop;
      }
      this.clearSelection();
      this.doWebApiCall(
        options.rebind,
        4
        /* RebindSpecificRows */
      );
    }
  }
  clear(triggerChange = false, clearFilters = true) {
    this._vrDateTimeFields = [];
    if (this.dataSource().filter((k) => k["defaultRow"] == null || k["defaultRow"] == false).length > 0) {
      if (clearFilters)
        this.clearFilters(false);
      this.dataSource([]);
      this.clearSelection(triggerChange);
    }
  }
  manageDataSourceControls(GridControlData2, className) {
    puma(this.element()).add(puma(this._elementLocked)).off("click", "." + className);
    puma(this.element()).add(puma(this._elementLocked)).on("click", "." + className, (e) => {
      e.target.setAttribute("disabled", "disabled");
      let options = this.getOptions();
      let rowId = e.currentTarget.getAttribute("dataItemId");
      if (rowId == null)
        rowId = e.target.closest(".vrButton").getAttribute("dataItemId");
      let dataItem = this.dataSource().find((k) => k[options.dataSourceFieldId] == rowId);
      let controlSettings = new GridButtonSettings();
      switch (GridControlData2.columnType) {
        case GridColumnTypeEnum.Button:
        case GridColumnTypeEnum.EditButton:
          controlSettings = GridControlData2.GridControlsSettings;
          break;
        case GridColumnTypeEnum.Icon:
          controlSettings = GridControlData2.GridControlsSettings;
          break;
        case GridColumnTypeEnum.Custom:
          controlSettings = GridControlData2.GridControlsSettings;
          break;
        case GridColumnTypeEnum.Label:
          controlSettings = GridControlData2.GridControlsSettings;
          break;
      }
      if (controlSettings != null) {
        let tableClickEvent = new GridControlsClickEvent();
        tableClickEvent.dataItem = dataItem;
        if (controlSettings.onClick != null && controlSettings.enabled !== false) {
          if (controlSettings.confirmationMessage != null && controlSettings.confirmationMessage.length > 0) {
            confirm(controlSettings.confirmationMessage).then(() => {
              controlSettings.onClick(tableClickEvent);
            });
          } else
            controlSettings.onClick(tableClickEvent);
        } else if (GridControlData2.columnType == GridColumnTypeEnum.EditButton)
          this.openAutoWindow(dataItem);
        window.setTimeout(() => e.target.removeAttribute("disabled"), 500);
      }
      return false;
    });
  }
  manageControls() {
    let controlList = [this._cellButtons, this._cellIcons, this._cellCustoms, this._cellLabels, this._cellImages];
    for (let control of controlList) {
      control.forEach((GridControlData2, className) => {
        this.manageDataSourceControls(GridControlData2, className);
      });
    }
  }
  originalDataSource() {
    return this._originalDataSource;
  }
  dataSource(dataItems, clearFilters = false, keepInfo = true) {
    if (dataItems != null) {
      let options = this.getOptions();
      if (dataItems.length > 0 && dataItems[0][options.dataSourceFieldId] == null) {
        let index = -1;
        for (let item of dataItems) {
          item[options.dataSourceFieldId] = index;
          index--;
        }
        this._lastIndexAdded = index;
      }
      this.fixDatasourceWithDate(dataItems);
      if (options.groupBy != null)
        this.sortingGroupFields(dataItems);
      if (options.sortBy != null) {
        let sortByField = options.sortBy.field;
        this.sort(sortByField, options.sortBy.direction, false);
      }
      this._originalDataSource = UtilityManager.duplicate(dataItems);
      if (options.filterable) {
        this._dictionaryDataValues.clear();
        window.setTimeout(() => {
          for (let column of options.columns) {
            if (column.type != GridColumnTypeEnum.EditButton)
              this._dictionaryDataValues.set(column.field, dataItems.map((k) => String(k[column.field]).toLowerCase()));
          }
        }, 200);
      }
      if (keepInfo) {
        this._tempRebindInfo = new TempRebindInfo();
        this._tempRebindInfo.checkedValues = this.getCheckedValues();
        this._tempRebindInfo.page = this.pageSelected();
        this._tempRebindInfo.yPosition = this.container().querySelector(".grid_Body").scrollTop;
      }
      if (clearFilters) {
        this.clearFilters(false);
        this.setDataSource(dataItems);
      } else {
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
  update(triggerDataBound = true, keepInfo = true) {
    if (keepInfo) {
      this._tempRebindInfo = new TempRebindInfo();
      this._tempRebindInfo.checkedValues = this.getCheckedValues();
      this._tempRebindInfo.page = this.pageSelected();
      this._tempRebindInfo.yPosition = this.container().querySelector(".grid_Body").scrollTop;
    }
    this.setDataSource(this.dataSource(), triggerDataBound);
  }
  setDataSource(dataItems, triggerDataBound = true) {
    let options = this.getOptions();
    this._dataSource = dataItems;
    this._rowCheckedIdList = this._rowCheckedIdList.filter((k) => dataItems.map((j) => String(j[options.dataSourceFieldId])).includes(k));
    if (this._actualSortingInfo != null && !options.serverBinding)
      this.applySorting();
    else {
      this._cellButtons = /* @__PURE__ */ new Map();
      this._cellIcons = /* @__PURE__ */ new Map();
      this._cellCustoms = /* @__PURE__ */ new Map();
      this._cellLabels = /* @__PURE__ */ new Map();
      this._cellImages = /* @__PURE__ */ new Map();
      if (this._tempRebindInfo != null && !options.serverBinding) {
        let page = this._tempRebindInfo.page;
        let checkedValues = this._tempRebindInfo.checkedValues;
        let yPosition = this._tempRebindInfo.yPosition;
        this._tempRebindInfo = null;
        this.pageSelected(page, false);
        this.drawTable(dataItems, triggerDataBound);
        this.manageControls();
        this.selectRows(checkedValues, void 0, false);
        this.container().querySelector(".grid_Body").scrollTo({ top: yPosition });
      } else {
        this.drawTable(dataItems, triggerDataBound);
        this.manageControls();
      }
    }
  }
  drawTable(dataItems, triggerDataBound = true) {
    let options = this.getOptions();
    if (typeof options.pageSize == "boolean" || this._pageSizeUnlimited)
      options.pageSize = dataItems.length;
    if (typeof options.pageSize != "number" && options.pageSize != null)
      options.pageSize = options.pageSize.value != null ? options.pageSize.value : 50;
    let tbody = this.element().getElementsByTagName("tbody")[0];
    if (this.element().getElementsByTagName("tbody").length == 0) {
      tbody = document.createElement("tbody");
      this.element().appendChild(tbody);
    }
    tbody.innerHTML = "";
    let tbodyLocked = null;
    if (options.lockable) {
      tbodyLocked = this._elementLocked.getElementsByTagName("tbody")[0];
      if (this._elementLocked.getElementsByTagName("tbody").length == 0) {
        tbodyLocked = document.createElement("tbody");
        this._elementLocked.appendChild(tbodyLocked);
      }
      tbodyLocked.innerHTML = "";
    }
    let items;
    let firstIndex;
    let lastIndex;
    if (!options.serverBinding) {
      firstIndex = (this.pageSelected() - 1) * options.pageSize;
      lastIndex = this.pageSelected() * options.pageSize;
      items = dataItems.slice(firstIndex, lastIndex);
    } else {
      items = dataItems;
      firstIndex = 0;
      lastIndex = dataItems.length - 1;
    }
    if (items.length == 0) {
      let defaultRow = {};
      for (let column of options.columns) {
        defaultRow[column.field] = null;
        defaultRow["defaultRow"] = true;
      }
      items.push(defaultRow);
      if (dataItems.length == 0)
        dataItems.push(defaultRow);
    } else {
      if (items.filter((k) => k["defaultRow"] != null).length > 0)
        items.splice(0, 1);
      if (dataItems.filter((k) => k["defaultRow"] != null).length > 0)
        dataItems.splice(0, 1);
    }
    let visibleColumns = [];
    if (options.groupable || options.groupBy != null) {
      this._groupByActualValue = {};
      visibleColumns = options.columns.filter((k) => k.hidden !== true);
    }
    let i = !options.serverBinding ? (this.pageSelected() - 1) * options.pageSize : 0;
    if (i > dataItems.length) {
      i = 0;
      this.pageSelected(1, false);
    }
    let rowFragment = document.createDocumentFragment();
    let rowFragmentLocked = document.createDocumentFragment();
    for (let row of items) {
      let dataItem = dataItems[i];
      if (dataItem == null)
        continue;
      let dataItemId = dataItem[options.dataSourceFieldId];
      let rowId = "row" + i + "_" + dataItemId;
      let rowAdded = 0;
      if (options.groupable !== false && options.groupBy != null) {
        if (options.groupBy.fields != null) {
          let groupByIndex = 0;
          for (let groupByField of options.groupBy.fields) {
            let cellValue = row[groupByField.field];
            let column = options.columns.find((k2) => k2.field == groupByField.field);
            if (this._groupByActualValue[groupByField.field] !== cellValue) {
              if (rowAdded == 0) {
                for (let p = groupByIndex; p < options.groupBy.fields.length; p++) {
                  options.groupBy = options.groupBy;
                  this._groupByActualValue[options.groupBy.fields[p].field] = void 0;
                }
              }
              let trGroupBy = document.createElement("tr");
              trGroupBy.setAttribute("field", cellValue == null || cellValue === "" ? "nosetted" : this.fixValueWithoutSpecialChars(cellValue));
              trGroupBy.setAttribute("level", String(groupByIndex));
              trGroupBy.classList.add("grid_trGroupBy", "p-grid-body");
              if (options.rowHeight != 27)
                trGroupBy.style.cssText += "height: " + options.rowHeight + "px;";
              rowFragment.appendChild(trGroupBy);
              let trGroupByLocked = null;
              if (options.lockable) {
                trGroupByLocked = document.createElement("tr");
                trGroupByLocked.setAttribute("field", cellValue == null || cellValue === "" ? "nosetted" : this.fixValueWithoutSpecialChars(cellValue));
                trGroupByLocked.setAttribute("level", String(groupByIndex));
                trGroupByLocked.classList.add("grid_trGroupBy", "grid_trGroupByLocked", "p-grid-body");
                if (options.rowHeight != 27)
                  trGroupByLocked.style.cssText += "height: " + options.rowHeight + "px;";
                rowFragmentLocked.appendChild(trGroupByLocked);
              }
              rowAdded++;
              if (groupByIndex > 0) {
                for (let p = 0; p < groupByIndex; p++) {
                  let groupByFieldValue2 = typeof groupByField == "string" ? groupByField : groupByField.field;
                  let td = document.createElement("td");
                  td.classList.add("groupBy" + groupByFieldValue2);
                  td.style.cssText += "width: 16px;";
                  trGroupBy.appendChild(td);
                  if (options.lockable) {
                    let td2 = document.createElement("td");
                    td2.classList.add("groupBy" + groupByFieldValue2);
                    td2.style.cssText += "width: 16px;";
                    trGroupByLocked.appendChild(td2);
                  }
                }
              }
              let cellText = String(cellValue);
              if (column != null) {
                if (column.type == GridColumnTypeEnum.Date)
                  cellText = row[groupByField.field] == null ? "" : Date.vrFixDateString(row[groupByField.field]).vrToItalyString();
                else if (column.type == GridColumnTypeEnum.Checkbox || column.type == GridColumnTypeEnum.Boolean)
                  cellText = Boolean(row[groupByField.field]) ? "Sì" : "No";
              }
              let colspan = visibleColumns.length - groupByIndex + options.groupBy.fields.length;
              if (options.checkboxes == GridCheckboxModeEnum.None)
                colspan -= 1;
              let groupByDisplayText = cellText;
              if (groupByField.displayField != null)
                groupByDisplayText = row[groupByField.displayField];
              if (groupByField.displayValue != null) {
                let groupByDisplayValueEvent = new GridGroupDisplayValueEvent();
                groupByDisplayValueEvent.sender = this;
                groupByDisplayValueEvent.dataItem = row;
                groupByDisplayValueEvent.field = groupByField.field;
                groupByDisplayValueEvent.displayField = groupByField.displayField;
                groupByDisplayText = groupByField.displayValue(groupByDisplayValueEvent);
              }
              if (groupByDisplayText == null) groupByDisplayText = cellText;
              let groupByCaret = IconClassicLight.CaretDown;
              let groupByFieldValue = typeof groupByField == "string" ? groupByField : groupByField.field;
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
              else {
                if (groupByDisplayText == null || groupByDisplayText === "" || groupByDisplayText == "null")
                  divGroupByName.innerHTML = groupByField.groupNameIfEmpty == null ? "Non impostato" : groupByField.groupNameIfEmpty;
                else
                  divGroupByName.innerHTML = groupByDisplayText;
              }
              tdGroupByName.appendChild(divGroupByName);
              if (options.lockable) {
                let tdExpandCollapse2 = document.createElement("td");
                tdExpandCollapse2.classList.add("grid_tdGroupByCollapse", "groupBy" + groupByFieldValue);
                tdExpandCollapse2.style.cssText += "width: 16px; border-right-color: transparent !important;";
                tdExpandCollapse2.innerHTML = "<i class='grid_tdGroupByCollapse " + groupByCaret + "'></i>";
                trGroupByLocked.appendChild(tdExpandCollapse2);
                let tdGroupByName2 = document.createElement("td");
                tdGroupByName2.classList.add("grid_tdGroupByName");
                tdGroupByName2.style.cssText += "font-weight: 600;";
                tdGroupByName2.setAttribute("colspan", String(colspan));
                trGroupByLocked.appendChild(tdGroupByName2);
                let divGroupByName2 = document.createElement("div");
                divGroupByName2.classList.add("grid_divGroupByName");
                if (dataItems.length == 1 && dataItems[0]["defaultRow"] != null)
                  divGroupByName2.innerHTML = "Nessun gruppo o elemento presente";
                else {
                  if (groupByDisplayText == null || groupByDisplayText === "" || groupByDisplayText == "null")
                    divGroupByName2.innerHTML = "Non impostato";
                  else
                    divGroupByName2.innerHTML = groupByDisplayText;
                }
                tdGroupByName2.appendChild(divGroupByName2);
              }
              if (options.onGroupEditClick != null || groupByField.onEditClick != null) {
                let divEdit = document.createElement("div");
                divEdit.style.cssText += "position: relative; display: inline-flex; margin-left: 6px; " + (options.checkboxes !== false ? "top: -5px;" : "");
                divEdit.innerHTML = "<i class='grid_groupByEdit " + IconClassicLight.Pencil + "' style='cursor: pointer;'></i>";
                tdGroupByName.appendChild(divEdit);
              }
              this._groupByActualValue[groupByField.field] = cellValue;
              if (this.thereAreLockedColumns()) {
                let groupByEdit = trGroupBy.querySelector("i.grid_groupByEdit");
                if (groupByEdit != null) {
                  if (groupByEdit.parentElement != null)
                    groupByEdit.parentElement.style.display = "none";
                }
              }
              if (groupByField.checkbox == null) groupByField.checkbox = true;
              if (options.checkboxes != GridCheckboxModeEnum.None) {
                let checkboxContainer = trGroupBy.querySelector("div.grid_divGroupByName");
                if (this.thereAreLockedColumns())
                  checkboxContainer = trGroupByLocked.querySelector("div.grid_divGroupByName");
                createCheckBox(
                  {
                    visible: groupByField.checkbox,
                    cssContainer: "margin-right: 5px;",
                    onCheck: (e) => {
                      let parentGroupRow = e.sender.element().parentElement.parentElement.parentElement.parentElement;
                      let childrenRows = this.getChildrenGroupRows(parentGroupRow, this._divBody);
                      if (this.thereAreLockedColumns())
                        childrenRows = this.getChildrenGroupRows(parentGroupRow, this._divBodyLocked);
                      if (options.onBeforeGroupCheck != null) {
                        let beforeGroupCheckEvent = new GridBeforeGroupCheckEvent();
                        beforeGroupCheckEvent.sender = this;
                        beforeGroupCheckEvent.checked = e.checked;
                        beforeGroupCheckEvent.childrenIdList = childrenRows.children.map((k2) => k2.getAttribute("id").split("_")[1]);
                        options.onBeforeGroupCheck(beforeGroupCheckEvent);
                        if (beforeGroupCheckEvent.isDefaultPrevented())
                          return;
                      }
                      if (e.checked)
                        this.selectRows(childrenRows.children.map((k2) => k2.getAttribute("id").split("_")[1]), void 0, false);
                      else
                        this.unselectRows(childrenRows.children.map((k2) => k2.getAttribute("id").split("_")[1]), void 0, false);
                      this.manageGroupCheckParent(childrenRows.children.vrLast().getElementsByClassName("vr-checkbox-column")[0]);
                      if (options.onAfterGroupCheck != null) {
                        let beforeGroupCheckEvent = new GridAfterGroupCheckEvent();
                        beforeGroupCheckEvent.sender = this;
                        beforeGroupCheckEvent.checked = e.checked;
                        beforeGroupCheckEvent.childrenIdList = childrenRows.children.map((k2) => k2.getAttribute("id").split("_")[1]);
                        options.onAfterGroupCheck(beforeGroupCheckEvent);
                      }
                    }
                  },
                  checkboxContainer,
                  ControlPositionEnum.Before
                );
              }
              puma(trGroupBy).find("td.grid_tdGroupByCollapse").add(puma(trGroupByLocked).find("td.grid_tdGroupByCollapse")).click((e) => {
                let icon = puma(e.currentTarget).find("i");
                let collapse = icon.hasClass("fa-caret-down");
                let childrenRows = this.getChildrenGroupRows(e.currentTarget.parentElement, this._divBody);
                childrenRows.allRows.vrPushRange(this.getChildrenGroupRows(e.currentTarget.parentElement, this._divBodyLocked).allRows);
                for (let childRow of childrenRows.allRows) {
                  if (collapse)
                    puma(childRow).hide();
                  else {
                    puma(childRow).show();
                    let childrenIcon = puma(childRow).find("i.grid_tdGroupByCollapse");
                    childrenIcon.removeClass(IconClassicLight.CaretRight);
                    childrenIcon.addClass(IconClassicLight.CaretDown);
                  }
                }
                let indexIcon = puma(e.currentTarget.parentElement).index() + 1;
                let iconNormal = puma(puma(this._divBody).find("tr:nth-child(" + indexIcon + ")").find("i")[0]);
                if (collapse) {
                  iconNormal.removeClass(IconClassicLight.CaretDown);
                  iconNormal.addClass(IconClassicLight.CaretRight);
                  if (options.lockable) {
                    let iconLocked = puma(puma(this._divBodyLocked).find("tr:nth-child(" + indexIcon + ")").find("i")[0]);
                    iconLocked.removeClass(IconClassicLight.CaretDown);
                    iconLocked.addClass(IconClassicLight.CaretRight);
                  }
                } else {
                  iconNormal.removeClass(IconClassicLight.CaretRight);
                  iconNormal.addClass(IconClassicLight.CaretDown);
                  if (options.lockable) {
                    let iconLocked = puma(puma(this._divBodyLocked).find("tr:nth-child(" + indexIcon + ")").find("i")[0]);
                    iconLocked.removeClass(IconClassicLight.CaretRight);
                    iconLocked.addClass(IconClassicLight.CaretDown);
                  }
                }
                if (options.onGroupExpandCollapse != null || groupByField.onExpandCollapse != null) {
                  let expandCollapseEvent = new GridGroupExpandCollapseEvent();
                  expandCollapseEvent.sender = this;
                  expandCollapseEvent.groupByField = groupByField.field;
                  expandCollapseEvent.groupByDisplayField = groupByField.displayField;
                  expandCollapseEvent.collapse = collapse;
                  expandCollapseEvent.value = row[groupByField.field];
                  if (groupByField.displayField != null)
                    expandCollapseEvent.displayValue = row[groupByField.displayField];
                  let childrenItems = [];
                  for (let childRow of childrenRows.allRows) {
                    let dataItemId2 = puma(childRow).attr("dataitemid");
                    let dataItem2 = this.dataSource().find((k2) => k2[options.dataSourceFieldId] == dataItemId2);
                    childrenItems.push(dataItem2);
                  }
                  expandCollapseEvent.childrenItems = childrenItems;
                  expandCollapseEvent.childrenRows = childrenRows.allRows;
                  if (options.onGroupExpandCollapse != null)
                    options.onGroupExpandCollapse(expandCollapseEvent);
                  else if (groupByField.onExpandCollapse != null)
                    groupByField.onExpandCollapse(expandCollapseEvent);
                }
              });
              puma(trGroupBy).find(".grid_groupByEdit").add(puma(trGroupByLocked).find(".grid_groupByEdit")).click((e) => {
                if (options.onGroupEditClick != null || groupByField.onEditClick != null) {
                  let editClickEvent = new GridGroupEditClickEvent();
                  editClickEvent.sender = this;
                  editClickEvent.groupByField = groupByField.field;
                  editClickEvent.groupByDisplayField = groupByField.displayField;
                  editClickEvent.value = row[groupByField.field];
                  if (groupByField.displayField != null)
                    editClickEvent.displayValue = row[groupByField.displayField];
                  let childrenRows = this.getChildrenGroupRows(e.currentTarget.parentElement, this._divBody);
                  let childrenItems = [];
                  for (let childRow of childrenRows.allRows) {
                    let dataItemId2 = puma(childRow).attr("dataitemid");
                    let dataItem2 = this.dataSource().find((k2) => k2[options.dataSourceFieldId] == dataItemId2);
                    childrenItems.push(dataItem2);
                  }
                  editClickEvent.childrenItems = childrenItems;
                  editClickEvent.childrenRows = childrenRows.allRows;
                  editClickEvent.dataItem = row;
                  if (options.onGroupEditClick != null)
                    options.onGroupEditClick(editClickEvent);
                  else if (groupByField.onEditClick != null)
                    groupByField.onEditClick(editClickEvent);
                }
              });
            }
            groupByIndex++;
          }
        }
      }
      let tr = document.createElement("tr");
      tr.id = rowId;
      tr.classList.add("p-grid-body");
      tr.setAttribute("dataItemId", dataItemId);
      tr.setAttribute("row", String(i));
      let trLocked = null;
      if (options.lockable) {
        trLocked = document.createElement("tr");
        trLocked.id = rowId;
        trLocked.classList.add("p-grid-body");
        trLocked.setAttribute("dataItemId", dataItemId);
        trLocked.setAttribute("row", String(i));
      }
      if (options.checkboxes != GridCheckboxModeEnum.None) {
        let tdCheckbox = document.createElement("td");
        tdCheckbox.style.cssText += "text-align: center; width: 20px;";
        tdCheckbox.classList.add("vrGridTdCheckboxColumn");
        tdCheckbox.setAttribute("field", "vrGridCheckboxColumn");
        let textHTML = "<input dataItemId='" + dataItemId + "' id='" + rowId + "_CheckboxColumn' class='vrCheckBox vr-checkbox-column' type='checkbox'></input><label style='display: none;' class='vrLabel vrCheckBoxLabel vr-checkboxColumn-label' for='" + rowId + "_CheckboxColumn'></label>";
        tdCheckbox.innerHTML = textHTML;
        if (this.thereAreLockedColumns())
          trLocked.appendChild(tdCheckbox);
        else
          tr.appendChild(tdCheckbox);
        tdCheckbox.onclick = ((e) => {
          if (e.shiftKey && options.checkboxes == GridCheckboxModeEnum.MultiCheck)
            this.selectRangeShiftKey(tdCheckbox);
          else
            this.selectRowInternal(dataItemId, true, { fromCheckboxInput: true, fromGroupOrRow: false, fromMethodCall: false, shiftKey: false });
        });
      }
      let k = options.checkboxes != GridCheckboxModeEnum.None ? 2 : 1;
      if (options.groupable || options.groupBy != null)
        k += options.columns.length;
      for (let column of options.columns) {
        let td = document.createElement("td");
        let tdLocked = null;
        if (options.lockable)
          tdLocked = document.createElement("td");
        let field = column.field;
        td.setAttribute("field", field);
        if (options.lockable) tdLocked.setAttribute("field", field);
        let width = column.width != null ? column.width : column.fitSpace == true ? this._fitSpaceColumnPercentage + "%" : column.type == GridColumnTypeEnum.EditButton ? 32 : 100;
        td.style.cssText += "width: " + width + "px;";
        if (options.lockable) tdLocked.style.cssText += "width: " + width + "px;";
        if (column.fitSpace == true) {
          td.setAttribute("fitspace", "true");
          if (options.lockable)
            tdLocked.setAttribute("fitSpace", "true");
        }
        if (column.hidden === true) {
          td.style.display = "none";
          tr.appendChild(td);
          if (options.lockable) {
            tdLocked.style.display = "none";
            trLocked.appendChild(tdLocked);
          }
          k++;
          continue;
        }
        if (!options.multilineRows) {
          td.classList.add("grid_singleLineGridRow");
          if (options.lockable) tdLocked.classList.add("grid_singleLineGridRow");
        }
        let textAlign = GridAlignEnum.Left;
        let textHTML = row[field] == null ? "" : String(row[field]);
        switch (column.type) {
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
              let decimalDigits = column.decimalDigits != null ? column.decimalDigits : 0;
              if (column.type == GridColumnTypeEnum.Currency || column.type == GridColumnTypeEnum.Percentage)
                decimalDigits = column.decimalDigits != null ? column.decimalDigits : 2;
              if (column.cellSettings == null) column.cellSettings = new GridCellSettings();
              if (column.cellSettings.zeroIfNull == null) column.cellSettings.zeroIfNull = false;
              if (textHTML === "" && column.cellSettings.zeroIfNull === false)
                textHTML = "";
              else {
                let valueFormatted = this.formatValue(Number(textHTML), column.type, decimalDigits, column.roundingSettings, void 0, column.milesSeparator);
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
              else {
                let valueFormatted = this.formatValue(Number(textHTML), column.type, void 0, void 0, void 0, column.milesSeparator);
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
              let valueFormatted = this.formatValue(date, column.type, void 0, void 0, column.showSeconds);
              textHTML = valueFormatted;
            }
            break;
          //#endregion
          //#region Checkbox
          case GridColumnTypeEnum.Checkbox:
          case GridColumnTypeEnum.Boolean:
            {
              let checked = row[field] != null && Boolean(row[field]) == true ? "checked='checked'" : "";
              textAlign = GridAlignEnum.Center;
              textHTML = "<input " + checked + " disabled='disabled' dataItemId='" + dataItemId + "' id='" + rowId + "_" + column.field + "' class='vrCheckBox' type='checkbox'></input><label class='vrLabel vrCheckBoxLabel' for='" + rowId + "_" + column.field + "'></label>";
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
              if (column.buttonSettings != null && dataItem[options.dataSourceFieldId] != null) {
                let templateEvent = new GridTemplateEvent();
                templateEvent.dataItem = dataItem;
                templateEvent.className = className;
                templateEvent.element = td;
                templateEvent.empty = dataItem[options.dataSourceFieldId] == null;
                templateEvent.field = column.field;
                templateEvent.sender = this;
                buttonSettings = column.buttonSettings(templateEvent);
              }
              if (buttonSettings == null) {
                buttonSettings = new GridButtonSettings();
                buttonSettings.text = "";
                buttonSettings.value = column.field;
              }
              let customCss = "max-width: 100%;";
              let buttonClass = "vrButton grid-button";
              if (buttonSettings.isPrimaryButton == true)
                customCss += "color: #FFF; background-color: #51B3E1;";
              if (buttonSettings.color != null)
                customCss += "color: " + buttonSettings.color + ";";
              if (buttonSettings.backgroundColor != null)
                customCss += "background-color: " + buttonSettings.backgroundColor + ";";
              if (buttonSettings.css != null)
                customCss += buttonSettings.css;
              if (buttonSettings.class != null)
                buttonClass += " " + buttonSettings.class;
              let iconClass = column.type == GridColumnTypeEnum.EditButton ? IconClassicLight.Pencil : "";
              let spanIcon = "";
              if (buttonSettings.icon != null)
                iconClass = buttonSettings.icon;
              let imageUrl = "";
              let spanImage = "";
              if (buttonSettings.imageUrl != null)
                imageUrl = buttonSettings.imageUrl;
              if (iconClass.length > 0) {
                let marginRight = buttonSettings.text != null ? "margin-right: 5px;" : "";
                spanIcon = "<span style='" + marginRight + "'><i class='vrIcon " + iconClass + "'></i></span> ";
              } else if (imageUrl.length > 0) {
                let marginRight = buttonSettings.text != null ? "margin-right: 5px;" : "";
                spanImage = "<img style='" + marginRight + "' src='" + imageUrl + "' />";
              }
              let tooltip = column.type == GridColumnTypeEnum.EditButton ? "Premi per modificare la riga" : "";
              if (buttonSettings.tooltip != null)
                tooltip = buttonSettings.tooltip;
              if (column.type == GridColumnTypeEnum.EditButton)
                customCss += "width: 29px;";
              let disabled = "";
              if (buttonSettings.enabled === false) {
                disabled = " disabled='disabled' ";
                customCss += "opacity: 0.5; cursor: default;";
              }
              this._cellButtons.set(className, { GridControlsSettings: buttonSettings, columnType: column.type });
              let buttonText = buttonSettings.text != null ? buttonSettings.text : "";
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
              if (column.customSettings != null && dataItem[options.dataSourceFieldId] != null) {
                let templateEvent = new GridTemplateEvent();
                templateEvent.dataItem = dataItem;
                templateEvent.className = className;
                templateEvent.element = td;
                templateEvent.empty = dataItem[options.dataSourceFieldId] == null;
                templateEvent.field = column.field;
                templateEvent.sender = this;
                customSettings = column.customSettings(templateEvent);
              }
              if (customSettings == null) {
                customSettings = new GridCustomSettings();
                customSettings.value = column.field;
                customSettings.template = "<div></div>";
              }
              let customCss = "";
              if (customSettings.css != null)
                customCss += customSettings.css;
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
              if (column.iconSettings != null && dataItem[options.dataSourceFieldId] != null) {
                let templateEvent = new GridTemplateEvent();
                templateEvent.dataItem = dataItem;
                templateEvent.className = className;
                templateEvent.element = td;
                templateEvent.empty = dataItem[options.dataSourceFieldId] == null;
                templateEvent.field = column.field;
                templateEvent.sender = this;
                iconSettings = column.iconSettings(templateEvent);
              }
              if (iconSettings == null) {
                iconSettings = new GridIconSettings();
                iconSettings.value = column.field;
              }
              let customCss = "";
              let iconCustomClass = "";
              if (iconSettings.color != null)
                customCss += "color: " + iconSettings.color + ";";
              if (iconSettings.css != null)
                customCss += iconSettings.css;
              if (iconSettings.class != null)
                iconCustomClass += " " + iconSettings.class;
              let tooltip = "";
              if (iconSettings.tooltip != null)
                tooltip = iconSettings.tooltip;
              if (iconSettings.onClick != null && iconSettings.enabled !== false)
                customCss += "cursor: pointer;";
              let icon = "";
              let imageUrl = "";
              if (iconSettings.icon != null)
                icon = "<i class='vrIcon " + iconSettings.icon + "'></i>";
              else if (iconSettings.imageUrl != null)
                imageUrl = "<img src='" + iconSettings.imageUrl + "' />";
              else
                icon = "<i class='vrIcon " + row[field] + "'></i>";
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
              if (column.imageSettings != null && dataItem[options.dataSourceFieldId] != null) {
                let templateEvent = new GridTemplateEvent();
                templateEvent.dataItem = dataItem;
                templateEvent.className = className;
                templateEvent.element = td;
                templateEvent.empty = dataItem[options.dataSourceFieldId] == null;
                templateEvent.field = column.field;
                templateEvent.sender = this;
                imageSettings = column.imageSettings(templateEvent);
              }
              if (imageSettings == null) {
                imageSettings = new GridImageSettings();
                imageSettings.value = column.field;
              }
              let customCss = "";
              let imageCustomClass = "";
              if (imageSettings.css != null)
                customCss += imageSettings.css;
              if (imageSettings.class != null)
                imageCustomClass += " " + imageSettings.class;
              let tooltip = "";
              if (imageSettings.tooltip != null)
                tooltip = imageSettings.tooltip;
              if (imageSettings.onClick != null && imageSettings.enabled !== false)
                customCss += "cursor: pointer;";
              let imageUrl = textHTML;
              if (imageSettings.imageUrl != null)
                imageUrl = imageSettings.imageUrl;
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
              if (column.labelSettings != null && dataItem[options.dataSourceFieldId] != null) {
                let templateEvent = new GridTemplateEvent();
                templateEvent.dataItem = dataItem;
                templateEvent.className = className;
                templateEvent.element = td;
                templateEvent.empty = dataItem[options.dataSourceFieldId] == null;
                templateEvent.field = column.field;
                templateEvent.sender = this;
                labelSettings = column.labelSettings(templateEvent);
              }
              if (labelSettings == null) {
                labelSettings = new GridLabelSettings();
                labelSettings.value = column.field;
              }
              let customCss = "";
              if (labelSettings.color != null)
                customCss += "color: " + labelSettings.color + ";";
              if (labelSettings.css != null)
                customCss += labelSettings.css;
              let tooltip = "";
              if (labelSettings.tooltip != null)
                tooltip = labelSettings.tooltip;
              if (labelSettings.onClick != null && labelSettings.enabled !== false)
                customCss += "cursor: pointer;";
              if (labelSettings.bold === true)
                customCss += "font-weight: 500;";
              let underlineOnFocus = "";
              if (labelSettings.underlineMode != null) {
                switch (labelSettings.underlineMode) {
                  case GridLabelUnderlineMode.Always:
                    customCss += "text-decoration: underline";
                    break;
                  case GridLabelUnderlineMode.None:
                    customCss += "text-decoration: none";
                    break;
                  case GridLabelUnderlineMode.OnFocus:
                    underlineOnFocus = "grid_labelhover";
                    break;
                }
              }
              if (labelSettings.noBr !== false) {
                if (labelSettings.noBr === true) {
                  customCss += "white-space: nowrap; overflow:hidden; margin-bottom: -6px; text-overflow: ellipsis; display: inline-block;";
                } else
                  customCss += "overflow: hidden; display: -webkit-inline-box; -webkit-line-clamp: " + labelSettings.noBr + "; -webkit-box-orient: vertical;white-space: pre-wrap; white-space: -moz-pre-wrap; white-space: -pre-wrap; white-space: -o-pre-wrap; word-wrap: break-word;";
              }
              let icon = "";
              if (labelSettings.icon != null)
                icon = "<i class='vrIcon " + labelSettings.icon + "'></i> ";
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
        }
        if (row["defaultRow"] === true) {
          textHTML = "";
          if (tr.getAttribute("defaultrow") == null)
            tr.setAttribute("defaultrow", "defaultrow");
        }
        if (td.innerHTML === "")
          td.innerHTML = textHTML;
        if (options.lockable && tdLocked.innerHTML === "")
          tdLocked.innerHTML = textHTML;
        if (column.cellSettings != null) {
          if (column.cellSettings.backgroundColor != null) {
            td.style.cssText += "background-color: " + column.cellSettings.backgroundColor + ";";
            if (options.lockable) tdLocked.style.cssText += "background-color: " + column.cellSettings.backgroundColor + ";";
          }
          if (column.cellSettings.color != null) {
            td.style.cssText += "color: " + column.cellSettings.color + ";";
            if (options.lockable) tdLocked.style.cssText += "color: " + column.cellSettings.color + ";";
          }
          if (column.cellSettings.css != null) {
            td.style.cssText += column.cellSettings.css + ";";
            if (options.lockable) tdLocked.style.cssText += column.cellSettings.css + ";";
          }
        }
        if (options.rowColorProperty != null && row[options.rowColorProperty] != null && row[options.rowColorProperty] !== "") {
          td.style.cssText += "background-color: " + row[options.rowColorProperty] + ";";
          if (options.lockable) tdLocked.style.cssText += "background-color: " + row[options.rowColorProperty] + ";";
        }
        if (options.rowTextColorProperty != null && row[options.rowTextColorProperty] != null && row[options.rowTextColorProperty] !== "") {
          td.style.cssText += "color: " + row[options.rowTextColorProperty] + ";";
          if (options.lockable) tdLocked.style.cssText += "color: " + row[options.rowTextColorProperty] + ";";
        }
        if (column.cellSettings != null)
          textAlign = column.cellSettings.textAlign != null ? column.cellSettings.textAlign : textAlign;
        if (textAlign != GridAlignEnum.Left) {
          td.style.cssText += "text-align: " + textAlign + ";";
          if (options.lockable) tdLocked.style.cssText += "text-align: " + textAlign + ";";
        }
        if (options.tooltip === true && column.type != GridColumnTypeEnum.Custom) {
          let tooltip = "";
          if (column.cellSettings != null) {
            if (column.cellSettings.tooltip === true)
              tooltip = column.title == null ? "" : column.title;
            else if (typeof column.cellSettings.tooltip == "string")
              tooltip = column.cellSettings.tooltip;
            else if (typeof column.cellSettings.tooltip == "function") {
              let tooltipEvent = new GridTooltipEvent();
              tooltipEvent.dataItem = dataItem;
              tooltipEvent.element = td;
              tooltipEvent.empty = dataItem[options.dataSourceFieldId] == null;
              tooltip = column.cellSettings.tooltip(tooltipEvent);
            }
          }
          if (tooltip == null || tooltip.length == 0)
            tooltip = textHTML;
          if (tooltip != null && tooltip.length > 0) {
            td.setAttribute("title", puma("<span>" + tooltip + "</span>").text());
            if (options.lockable) tdLocked.setAttribute("title", puma("<span>" + tooltip + "</span>").text());
          }
        }
        if (column.bold === true) {
          td.style.cssText += "font-weight: 600;";
          if (options.lockable) tdLocked.style.cssText += "font-weight: 600;";
        }
        if (options.lockable && column.locked)
          trLocked.appendChild(tdLocked);
        else
          tr.appendChild(td);
        k++;
      }
      if (options.groupable || options.groupBy != null) {
        for (let i2 = options.columns.length - 1; i2 >= 0; i2--) {
          let column = options.columns[i2];
          let display = "";
          if (options.groupBy == null || options.groupBy.fields == null || options.groupBy.fields != null && !options.groupBy.fields.map((k2) => k2.field).includes(column.field))
            display = "display: none;";
          let tdGroupBy = document.createElement("td");
          tdGroupBy.style.cssText += display + "; width: 16px;";
          tdGroupBy.classList.add("groupBy" + column.field);
          tr.insertBefore(tdGroupBy, tr.firstChild);
          if (options.lockable) {
            let tdGroupByLocked = document.createElement("td");
            tdGroupByLocked.style.cssText += display + "; width: 16px;";
            tdGroupByLocked.classList.add("groupBy" + column.field);
            trLocked.insertBefore(tdGroupByLocked, trLocked.firstChild);
          }
        }
      }
      if (options.rowHeight != 27)
        tr.style.cssText += "height: " + options.rowHeight + "px;";
      if (options.checkboxes != GridCheckboxModeEnum.None) {
        puma(tr).add(puma(trLocked)).off("click");
        puma(tr).add(puma(trLocked)).click((e) => {
          if (e.shiftKey && options.checkboxes == GridCheckboxModeEnum.MultiCheck)
            this.selectRangeShiftKey(e.target);
          else {
            if (!puma(e.target).is("input") && !puma(e.target).hasClass("vrButton") && !puma(e.target).hasClass("vrIcon"))
              this.selectRowInternal(dataItemId, true, { fromCheckboxInput: false, fromGroupOrRow: true, fromMethodCall: false, shiftKey: false });
          }
        });
      } else {
        puma(tr).add(puma(trLocked)).off("click");
        puma(tr).add(puma(trLocked)).click((e) => {
          if (options.onSelectRow != null) {
            let selectRowEvent = new GridSelectRowEvent();
            selectRowEvent.sender = this;
            selectRowEvent.rowElement = e.currentTarget;
            selectRowEvent.dataItem = dataItem;
            selectRowEvent.checked = true;
            selectRowEvent.empty = dataItem[options.dataSourceFieldId] == null;
            options.onSelectRow(selectRowEvent);
          }
        });
      }
      if (options.onRowDataBound != null) {
        let onRowDataBoundEvent = new GridOnRowDataBoundEvent();
        onRowDataBoundEvent.sender = this;
        onRowDataBoundEvent.rowElement = tr;
        let dataItem2 = {};
        for (let property of Object.getOwnPropertyNames(row))
          dataItem2[property] = row[property];
        onRowDataBoundEvent.dataItem = dataItem2;
        onRowDataBoundEvent.realDataItem = row;
        onRowDataBoundEvent.empty = dataItem2[options.dataSourceFieldId] == null;
        let backgroundColor = options.onRowDataBound(onRowDataBoundEvent);
        if (backgroundColor != null && backgroundColor.length > 0) {
          Array.from(tr.getElementsByTagName("td")).forEach((td) => td.style.cssText += "background-color: " + backgroundColor + ";");
          if (options.lockable)
            Array.from(trLocked.getElementsByTagName("td")).forEach((td) => td.style.cssText += "background-color: " + backgroundColor + ";");
        }
      }
      rowFragment.appendChild(tr);
      if (options.lockable)
        rowFragmentLocked.appendChild(trLocked);
      i++;
    }
    tbody.appendChild(rowFragment);
    if (options.lockable)
      tbodyLocked.appendChild(rowFragmentLocked);
    if (options.onDataBound != null && triggerDataBound) {
      let onDataBoundEvent = new GridOnDataBoundEvent();
      onDataBoundEvent.sender = this;
      options.onDataBound(onDataBoundEvent);
    }
    this._actualPageSize = options.pageSize;
    window.setTimeout(() => {
      if (options.footer !== false) {
        let divPagination = document.getElementById(this._elementId + "_footerPagination");
        divPagination.innerHTML = "";
        let footer = options.footer;
        let maxLength = options.serverBinding !== false ? this._responseForServerBinding[options.serverBinding.itemCountPropertyName] : dataItems.length;
        if (options.pageSize < maxLength) {
          let pageSelected = this.pageSelected();
          let numberOfPages = Math.trunc(maxLength / Number(options.pageSize));
          if (maxLength % Number(options.pageSize) > 0)
            numberOfPages += 1;
          if (footer.showPagination && options.pageSize != 0) {
            let spanPagination = document.createElement("span");
            spanPagination.id = this._elementId + "_divPagination";
            spanPagination.classList.add("p-grid-pagination");
            divPagination.appendChild(spanPagination);
            createButton(
              {
                icon: IconClassicLight.Backward,
                css: "border-left: none; border-top-left-radius: 5px; border-bottom-left-radius: 5px;",
                onClick: (e) => {
                  this.pageSelected(1);
                }
              },
              spanPagination
            );
            createButton(
              {
                icon: IconClassicLight.BackwardStep,
                onClick: (e) => {
                  let pageToSelect = this.pageSelected() - 1;
                  if (pageToSelect < 1)
                    pageToSelect = 1;
                  this.pageSelected(pageToSelect);
                }
              },
              spanPagination
            );
            let maxVisiblePages = options.footer.maxVisiblePages;
            let startingIndex = 1;
            if (pageSelected % maxVisiblePages == 0)
              startingIndex = (pageSelected / maxVisiblePages - 1) * maxVisiblePages + 1;
            else
              startingIndex = Math.trunc(pageSelected / maxVisiblePages) * maxVisiblePages + 1;
            let endIndex = 0;
            let noMore = false;
            if (numberOfPages <= maxVisiblePages) {
              endIndex = startingIndex + numberOfPages;
              noMore = true;
            } else
              endIndex = startingIndex + maxVisiblePages;
            if (endIndex >= numberOfPages + 1) {
              endIndex = numberOfPages + 1;
              noMore = true;
            }
            if (startingIndex > 1) {
              let button = document.createElement("button");
              button.id = this._elementId + "_btnPage_" + (startingIndex - 1);
              button.innerHTML = "...";
              button.onclick = (e) => {
                this.pageSelected(startingIndex - 1);
                return false;
              };
              spanPagination.appendChild(button);
            }
            let buttonsFragment = document.createDocumentFragment();
            for (let i2 = startingIndex; i2 <= endIndex; i2++) {
              if (i2 == endIndex && noMore)
                break;
              let button = document.createElement("button");
              button.id = this._elementId + "_btnPage_" + i2;
              button.style.cssText += "cursor: pointer;";
              button.innerHTML = i2 == endIndex ? startingIndex == endIndex ? String(i2) : "..." : String(i2);
              if (i2 == pageSelected)
                button.classList.add("p-grid-pageSelected");
              button.onclick = (e) => {
                this.pageSelected(i2);
                return false;
              };
              buttonsFragment.appendChild(button);
            }
            spanPagination.appendChild(buttonsFragment);
            createButton(
              {
                icon: IconClassicLight.ForwardStep,
                onClick: (e) => {
                  let pageToSelect = this.pageSelected() + 1;
                  if (pageToSelect > numberOfPages)
                    pageToSelect = numberOfPages;
                  this.pageSelected(pageToSelect);
                }
              },
              spanPagination
            );
            createButton(
              {
                icon: IconClassicLight.Forward,
                css: "border-top-right-radius: 5px; border-bottom-right-radius: 5px;",
                onClick: (e) => {
                  this.pageSelected(numberOfPages);
                }
              },
              spanPagination
            );
          }
          if (footer.totalElements) {
            let spanTotalElements = document.createElement("span");
            spanTotalElements.id = this._elementId + "TotalsLabel";
            spanTotalElements.classList.add("p-grid-totalElements");
            divPagination.appendChild(spanTotalElements);
            if (footer.cartSettings != null)
              spanTotalElements.style.cssText += "right: 50px;";
            if (typeof footer.totalElements == "boolean" && footer.totalElements === true) {
              if (options.pageSize == 0)
                spanTotalElements.innerHTML = "Nessun elemento";
              else {
                if (lastIndex > maxLength)
                  lastIndex = maxLength;
                let pagesText = firstIndex + " - " + lastIndex + " di " + maxLength + (maxLength == 1 ? " elemento" : " elementi") + " - " + pageSelected + " di " + numberOfPages + " pagine";
                if (options.serverBinding !== false) {
                  let indexFrom = Number(options.pageSize) * (this.pageSelected() - 1) + 1;
                  let indexTo = Number(options.pageSize) * (this.pageSelected() - 1) + dataItems.length;
                  pagesText = indexFrom + " - " + indexTo + " di " + maxLength + (maxLength == 1 ? " elemento" : " elementi") + " - " + pageSelected + " di " + numberOfPages + " pagine";
                }
                spanTotalElements.innerHTML = pagesText;
              }
            } else {
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
        } else {
          if (footer.totalElements) {
            let spanTotalElements = document.createElement("span");
            spanTotalElements.id = this._elementId + "TotalsLabel";
            spanTotalElements.classList.add("p-grid-totalElements");
            divPagination.appendChild(spanTotalElements);
            if (footer.cartSettings != null)
              spanTotalElements.style.cssText += "right: 50px;";
            let realDataItems = dataItems.filter((k) => k["defaultRow"] == null || k["defaultRow"] == false);
            if (typeof footer.totalElements == "boolean" && footer.totalElements === true) {
              if (realDataItems.length == 0)
                spanTotalElements.innerHTML = "Nessun elemento";
              else
                spanTotalElements.innerHTML = dataItems.length + (realDataItems.length == 1 ? " elemento" : " elementi");
            } else {
              let totalElementTemplateEvent = new GridTotalElementTemplateEvent();
              totalElementTemplateEvent.dataItems = realDataItems;
              totalElementTemplateEvent.firstIndex = firstIndex;
              totalElementTemplateEvent.lastIndex = lastIndex;
              let totalElementsText = footer.totalElements(totalElementTemplateEvent);
              spanTotalElements.innerHTML = String(totalElementsText);
            }
          }
          if (!footer.showPageSize) {
            let ddlPageSize = ControlManager.get(this._elementId + "_ddlPageSize");
            if (ddlPageSize != null)
              ddlPageSize.hide();
          }
        }
      }
      if (this._showTotals && options.columns.filter((k) => k.aggregate != null && k.aggregate !== false).length > 0) {
        if (options.serverBinding !== false)
          this.createTotals(this._responseForServerBinding[options.serverBinding.totalsPropertyName], false);
        else {
          let totals = this.getTotals(dataItems);
          this.createTotals(totals, false);
        }
      }
    });
    if (!this._firstDraw)
      this.recalculateHeightWidth();
    else
      window.setTimeout(() => this.recalculateHeightWidth());
    this._firstDraw = true;
    this.adjustTrHeight();
    this._deletedItems = [];
    this.selectRows(this._rowCheckedIdList, void 0, false);
    if (options.groupable && options.groupBy != null) {
      let groupItems = [];
      let trGroupByList = Array.from(this.element().getElementsByClassName("grid_trGroupBy"));
      if (options.lockable)
        trGroupByList.vrPushRange(Array.from(this._elementLocked.getElementsByClassName("grid_trGroupByLocked")));
      for (let tr of trGroupByList) {
        let children = [];
        if (tr.classList.contains("grid_trGroupByLocked"))
          children = this.getChildrenGroupRows(tr, this._divBodyLocked).children;
        else
          children = this.getChildrenGroupRows(tr, this._divBody).children;
        if (!options.serverBinding) {
          let td = tr.getElementsByClassName("grid_tdGroupByName")[0];
          let childrenNumber = children.length;
          if (this.dataSource().length > 1) {
            let divGroupByName = td.getElementsByClassName("grid_divGroupByName")[0];
            let spanChildrenNumber = document.createElement("span");
            spanChildrenNumber.style.cssText += "margin-left: 5px;";
            spanChildrenNumber.innerHTML = "(" + childrenNumber + ")";
            divGroupByName.appendChild(spanChildrenNumber);
          }
        }
        if (this._showTotals) {
          let value = this.fixValueWithoutSpecialChars(tr.getAttribute("field"));
          let lastChildren = children.vrLast();
          if (lastChildren != null) {
            let clonedTr = lastChildren.cloneNode(true);
            clonedTr.classList.add("p-grid-totalsGroup", this._elementId + "_totalGroupBy" + value);
            lastChildren.parentNode.insertBefore(clonedTr, lastChildren.nextSibling);
          }
          let totalsGroupItem = new TotalsGroupItem();
          totalsGroupItem.groupValue = value;
          let childrenItems = [];
          for (let child of children) {
            let dataItemId = child.getAttribute("dataitemid");
            childrenItems.push(dataItems.find((k) => k[options.dataSourceFieldId] == dataItemId));
          }
          totalsGroupItem.dataItems = childrenItems;
          groupItems.push(totalsGroupItem);
        }
      }
      if (this._showTotals) {
        if (!(groupItems.length == 0 || groupItems[0].dataItems[0] == null)) {
          let totalGroupList = [];
          for (let group of groupItems) {
            let totals = this.getTotals(group.dataItems);
            totalGroupList.push({ totals, groupValue: group.groupValue });
          }
          this.createTotals(totalGroupList, true);
        }
      }
    }
  }
  createTotals(data, isGroup) {
    if (!isGroup) {
      let tdFragment = document.createDocumentFragment();
      let trTotals = this._divTotals.querySelector(".p-grid-totals");
      let tdList = trTotals.getElementsByTagName("td");
      for (let td of Array.from(tdList)) {
        let newTd = td.cloneNode(true);
        let field = td.getAttribute("field");
        let total = data.find((k) => k.field == field);
        if (total != null)
          this.writeTotals(total, newTd);
        else
          newTd.innerHTML = "";
        tdFragment.appendChild(newTd);
      }
      trTotals.innerHTML = "";
      trTotals.appendChild(tdFragment);
    } else {
      let dataGrouped = data.vrGroupBy((k) => k.groupValue);
      let trTdList = [];
      for (let key in dataGrouped) {
        let totalsGroup = dataGrouped[key];
        let groupValue = totalsGroup[0].groupValue;
        let totalsGroupTotals = [];
        for (let totGroup of totalsGroup)
          totalsGroupTotals.push(totGroup.totals);
        let trList = this.element().querySelectorAll("." + this._elementId + "_totalGroupBy" + this.fixValueWithoutSpecialChars(groupValue));
        let i = 0;
        for (let tr of Array.from(trList)) {
          let tdFragment = document.createDocumentFragment();
          let tdList = tr.getElementsByTagName("td");
          for (let td of Array.from(tdList)) {
            let newTd = td.cloneNode(true);
            let field = td.getAttribute("field");
            let total = totalsGroupTotals[i].find((k) => k.field == field);
            if (total != null)
              this.writeTotals(total, newTd);
            else
              newTd.innerHTML = "";
            tdFragment.appendChild(newTd);
          }
          trTdList.push({ tr, tdFragment });
          tr.innerHTML = "";
          i++;
        }
      }
      for (let trTd of trTdList)
        trTd.tr.appendChild(trTd.tdFragment);
    }
  }
  writeTotals(total, td) {
    if (td != null) {
      let valueFormatted = this.formatValue(total.total, total.type, total.decimalDigits, total.roundingSettings, void 0, total.milesSeparator);
      td.innerHTML = valueFormatted;
      td.setAttribute("title", td.innerText);
    }
  }
  formatValue(value, columnType, decimalDigits, roundingSettings, showSeconds, milesSeparator) {
    let options = this.getOptions();
    if (columnType == null) columnType = GridColumnTypeEnum.String;
    if (columnType == GridColumnTypeEnum.Number || columnType == GridColumnTypeEnum.Currency || columnType == GridColumnTypeEnum.Percentage) {
      if (roundingSettings == null)
        roundingSettings = options.roundingSettings;
      let formatSettings = new NumberFormatSettings(roundingSettings);
      formatSettings.useGrouping = milesSeparator;
      formatSettings.minimumFractionDigits = decimalDigits;
      formatSettings.maximumFractionDigits = decimalDigits;
      if (roundingSettings != null) {
        if (roundingSettings.minimumFractionDigits != null) formatSettings.minimumFractionDigits = roundingSettings.minimumFractionDigits;
        if (roundingSettings.maximumFractionDigits != null) formatSettings.maximumFractionDigits = roundingSettings.maximumFractionDigits;
        if (roundingSettings.roundingMode == RoundingModeEnum.None) {
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
    } else if (columnType == GridColumnTypeEnum.Duration) {
      let hours = Math.trunc(value / 60);
      let hoursString = String(hours);
      if (hours < 10)
        hoursString = "0" + hoursString;
      let minutes = Math.trunc(value % 60);
      let minutesString = String(minutes);
      if (minutes < 10)
        minutesString = "0" + minutesString;
      return hoursString + ":" + minutesString;
    } else if (columnType == GridColumnTypeEnum.Date || columnType == GridColumnTypeEnum.DateTime || columnType == GridColumnTypeEnum.Time || columnType == GridColumnTypeEnum.LongDate || columnType == GridColumnTypeEnum.LongDateTime || columnType == GridColumnTypeEnum.LongWeekDate || columnType == GridColumnTypeEnum.ShortWeekDate) {
      value = Date.vrFixDateString(value);
      let dateModeEnum = DateModeEnum.Date;
      if (columnType == GridColumnTypeEnum.Date) dateModeEnum = DateModeEnum.Date;
      else if (columnType == GridColumnTypeEnum.DateTime) dateModeEnum = DateModeEnum.DateTime;
      else if (columnType == GridColumnTypeEnum.Time) dateModeEnum = DateModeEnum.Time;
      else if (columnType == GridColumnTypeEnum.LongDate) dateModeEnum = DateModeEnum.LongDate;
      else if (columnType == GridColumnTypeEnum.LongDateTime) dateModeEnum = DateModeEnum.LongDateTime;
      else if (columnType == GridColumnTypeEnum.LongWeekDate) dateModeEnum = DateModeEnum.LongWeekDate;
      else if (columnType == GridColumnTypeEnum.ShortWeekDate) dateModeEnum = DateModeEnum.ShortWeekDate;
      return value == "" || !Date.vrIsValidDate(value) ? "" : new Date(value).vrToItalyString(dateModeEnum, showSeconds);
    } else if (columnType == GridColumnTypeEnum.String || columnType == GridColumnTypeEnum.Label) {
      value = String(value);
      return value;
    }
    return "";
  }
  //#endregion
  //#region Manage rows
  updateRow(dataItem, rebind = true) {
    let options = this.getOptions();
    let dataItemId = dataItem[options.dataSourceFieldId];
    let itemOriginalDatasource = this.originalDataSource().find((k) => k[options.dataSourceFieldId] == dataItemId);
    let itemOriginalDatasourceIndex = this.originalDataSource().indexOf(itemOriginalDatasource);
    let itemDatasource = this.dataSource().find((k) => k[options.dataSourceFieldId] == dataItemId);
    let itemDatasourceIndex = this.dataSource().indexOf(itemDatasource);
    if (itemOriginalDatasource != null) {
      this.fixDatasourceWithDate([dataItem]);
      this.originalDataSource()[itemOriginalDatasourceIndex] = dataItem;
      this.dataSource()[itemDatasourceIndex] = dataItem;
      if (rebind)
        this.update();
    } else
      this.addRow(dataItem, rebind);
  }
  updateRows(dataItems, rebind = true) {
    for (let dataItem of dataItems)
      this.updateRow(dataItem, false);
    if (rebind)
      this.update();
  }
  addRow(dataItem, rebind = true) {
    this.addRows([dataItem], rebind);
  }
  addRows(dataItems, rebind = true) {
    this.fixDatasourceWithDate(dataItems);
    let options = this.getOptions();
    for (let dataItem of dataItems) {
      if (dataItem[options.dataSourceFieldId] == null) {
        dataItem[options.dataSourceFieldId] = this._lastIndexAdded;
        this._lastIndexAdded--;
      }
    }
    if (this._originalDataSource == null)
      this._originalDataSource = [];
    this.dataSource().vrPushRange(dataItems);
    this._originalDataSource.vrPushRange(dataItems);
    if (options.groupable && options.groupBy != null)
      this.sortingGroupFields(dataItems);
    if (rebind)
      this.setDataSource(this.dataSource());
    for (let column of options.columns) {
      if (column.type != GridColumnTypeEnum.EditButton)
        this._dictionaryDataValues.set(column.field, this._originalDataSource.map((k) => String(k[column.field]).toLowerCase()));
    }
  }
  deleteRow(dataItemId, rebind = false) {
    this.deleteRows([dataItemId], rebind);
  }
  deleteRows(dataItemIdList, rebind = false) {
    let options = this.getOptions();
    let rows = Array.from(puma(this._divBody).find("tr"));
    for (let row of rows) {
      if (dataItemIdList.vrToStringArrayList().includes(puma(row).attr("dataItemId")))
        puma(row).remove();
    }
    if (this.thereAreLockedColumns()) {
      let rows2 = Array.from(puma(this._divBodyLocked).find("tr"));
      for (let row of rows2) {
        if (dataItemIdList.vrToStringArrayList().includes(puma(row).attr("dataItemId")))
          puma(row).remove();
      }
    }
    for (let itemId of dataItemIdList) {
      let itemToDelete = this.dataSource().find((k) => k[options.dataSourceFieldId] == itemId);
      if (itemToDelete != null) {
        this.dataSource().vrDeleteItem(itemToDelete, options.dataSourceFieldId);
        this._originalDataSource.vrDeleteItem(itemToDelete, options.dataSourceFieldId);
      }
    }
    for (let column of options.columns) {
      if (column.type != GridColumnTypeEnum.EditButton)
        this._dictionaryDataValues.set(column.field, this._originalDataSource.map((k) => String(k[column.field]).toLowerCase()));
    }
    if (rebind)
      this.setDataSource(this.dataSource());
  }
  rows() {
    let rows = [];
    let rowElements = Array.from(puma(this._divBody).find("tr"));
    for (let rowElement of rowElements) {
      let row = new GridRow();
      row.element = rowElement;
      row.cells = Array.from(puma(rowElement).find("td"));
      row.id = rowElement.id;
      row.dataItemId = rowElement.getAttribute("dataItemId");
      row.index = Number(rowElement.getAttribute("row"));
      rows.push(row);
    }
    return rows;
  }
  //#endregion
  //#region Items
  getAllItems(toSavePurpose = false) {
    let rows = UtilityManager.duplicate(this.dataSource());
    if (toSavePurpose) {
      for (let row of rows) {
        for (let property in row) {
          let propertyValue = row[property];
          if (Date.vrIsValidDate(propertyValue))
            row[property] = Date.vrConvertDateFromClient(propertyValue);
        }
      }
    }
    return rows.filter((k) => k.defaultRow !== true);
  }
  getCheckedItems() {
    let options = this.getOptions();
    let checkedValues = this.getCheckedValues();
    let checkedItems = [];
    for (let value of checkedValues) {
      let item = this.dataSource().find((k) => k[options.dataSourceFieldId] == value);
      if (item != null)
        checkedItems.push(item);
    }
    return checkedItems;
  }
  getCheckedValues() {
    return this._rowCheckedIdList.vrDistinct();
  }
  getCheckedNumberValues() {
    return this._rowCheckedIdList.vrToNumberArrayList().vrDistinct();
  }
  getDeletedItems() {
    return this._deletedItems;
  }
  getDeletedItemValues(key) {
    let options = this.getOptions();
    return this.getDeletedItems().map((k) => key != null ? k[key] : k[options.dataSourceFieldId]);
  }
  //#endregion
  //#region Check/Select
  clearSelection(triggerChange = true) {
    this._rowCheckedIdList = [];
    this.unCheckAllRows(triggerChange);
  }
  checkAllRows(triggerChange = true) {
    let options = this.getOptions();
    if (options.checkboxes == GridCheckboxModeEnum.SingleCheck)
      return;
    let headerCheckbox = document.getElementById(this._elementId + "header_CheckboxColumn");
    if (headerCheckbox != null) {
      headerCheckbox.classList.remove("indeterminateVrCheckbox");
      headerCheckbox.checked = true;
    }
    let checkboxList = this._divBody.getElementsByClassName("vr-checkbox-column");
    if (this.thereAreLockedColumns())
      checkboxList = this._divBodyLocked.getElementsByClassName("vr-checkbox-column");
    for (let checkbox of Array.from(checkboxList))
      checkbox.checked = true;
    if (options.groupable && options.groupBy != null && options.checkboxes != GridCheckboxModeEnum.None) {
      let groupByRows = this._divBody.getElementsByClassName("grid_trGroupBy");
      if (this.thereAreLockedColumns())
        groupByRows = this._divBodyLocked.getElementsByClassName("grid_trGroupBy");
      for (let groupByRow of Array.from(groupByRows)) {
        let checkBox = groupByRow.getElementsByTagName("input")[0];
        checkBox.checked = true;
        checkBox.classList.remove("indeterminateVrCheckbox");
      }
    }
    let checkedIdList = [];
    let datasourceIdList = this.dataSource().map((k) => k[options.dataSourceFieldId]);
    let checkboxCheckedList = Array.from(checkboxList).filter((k) => k.checked);
    for (let checkboxChecked of checkboxCheckedList) {
      let dataItemId = checkboxChecked.getAttribute("dataItemId");
      let checkedId = datasourceIdList.find((k) => k == dataItemId);
      if (checkedId != null)
        checkedIdList.push(checkedId);
    }
    this._rowCheckedIdList.vrPushRange(checkedIdList.vrToStringArrayList());
    this.updateCart();
    if (triggerChange && options.onSelectAllRows != null) {
      let selectAllRowsEvent = new GridSelectAllRowsEvent();
      selectAllRowsEvent.sender = this;
      selectAllRowsEvent.checked = true;
      options.onSelectAllRows(selectAllRowsEvent);
    }
  }
  unCheckAllRows(triggerChange = true) {
    let options = this.getOptions();
    let headerCheckbox = document.getElementById(this._elementId + "header_CheckboxColumn");
    if (headerCheckbox != null) {
      headerCheckbox.classList.remove("indeterminateVrCheckbox");
      headerCheckbox.checked = false;
    }
    let checkboxList = this._divBody.getElementsByClassName("vr-checkbox-column");
    if (this.thereAreLockedColumns())
      checkboxList = this._divBodyLocked.getElementsByClassName("vr-checkbox-column");
    for (let checkbox of Array.from(checkboxList))
      checkbox.checked = false;
    if (options.groupable && options.groupBy != null && options.checkboxes != GridCheckboxModeEnum.None) {
      let groupByRows = this._divBody.getElementsByClassName("grid_trGroupBy");
      if (this.thereAreLockedColumns())
        groupByRows = this._divBodyLocked.getElementsByClassName("grid_trGroupBy");
      for (let groupByRow of Array.from(groupByRows)) {
        let checkBox = groupByRow.getElementsByTagName("input")[0];
        checkBox.checked = false;
        checkBox.classList.remove("indeterminateVrCheckbox");
      }
    }
    let uncheckedIdList = [];
    let datasourceIdList = this.dataSource().map((k) => k[options.dataSourceFieldId]);
    for (let checkbox of Array.from(checkboxList)) {
      let dataItemId = checkbox.getAttribute("dataItemId");
      let uncheckedId = datasourceIdList.find((k) => k == dataItemId);
      if (uncheckedId != null)
        uncheckedIdList.push(uncheckedId);
    }
    for (let uncheckedId of uncheckedIdList)
      this._rowCheckedIdList.vrDelete(String(uncheckedId));
    this.updateCart();
    if (triggerChange && options.onSelectAllRows != null) {
      let selectAllRowsEvent = new GridSelectAllRowsEvent();
      selectAllRowsEvent.sender = this;
      selectAllRowsEvent.checked = false;
      options.onSelectAllRows(selectAllRowsEvent);
    }
  }
  selectRowsByIndexes(indexes, triggerChange = true) {
    for (let index of indexes)
      this.selectRowByIndex(index, triggerChange);
  }
  selectRowByIndex(index, triggerChange = true) {
    let tr = puma(this._divBody).find("tr[row='" + index + "']");
    let dataItemId = tr.attr("dataItemId");
    this.selectRowInternal(dataItemId, triggerChange, { fromCheckboxInput: false, fromGroupOrRow: false, fromMethodCall: false, shiftKey: false });
  }
  selectRows(itemIdList, property, triggerChange = true) {
    if (itemIdList.length == 0)
      return;
    let options = this.getOptions();
    if (options.checkboxes == GridCheckboxModeEnum.SingleCheck)
      itemIdList = [itemIdList.vrLast()];
    if (property != null)
      itemIdList = this.dataSource().filter((k) => itemIdList.includes(String(k[property]))).map((k) => k[options.dataSourceFieldId]);
    itemIdList = itemIdList.vrToStringArrayList().vrDistinct();
    for (let itemId of itemIdList)
      this.selectRow(itemId, triggerChange);
  }
  selectRow(itemId, triggerChange = true) {
    this.selectRowInternal(itemId, triggerChange, { fromCheckboxInput: false, fromGroupOrRow: false, fromMethodCall: true, shiftKey: false });
  }
  selectRangeShiftKey(target) {
    let rowIndex = Number(puma(target).closest("tr").attr("row"));
    let checkboxList = Array.from(puma(this._divBody).find(".vr-checkbox-column:checked"));
    if (this.thereAreLockedColumns())
      checkboxList = Array.from(puma(this._divBodyLocked).find(".vr-checkbox-column:checked"));
    let trSelectedList = [];
    for (let checkbox of checkboxList)
      trSelectedList.push(puma(checkbox).closest("tr")[0]);
    let minDifferenceTr = null;
    let finalRowIndex = 0;
    for (let trSelected of trSelectedList) {
      let rowIndexSelected = Number(puma(trSelected).attr("row"));
      let diff = Math.abs(rowIndex - rowIndexSelected);
      if (minDifferenceTr == null || diff < minDifferenceTr && diff > 0) {
        minDifferenceTr = diff;
        finalRowIndex = Number(puma(trSelected).attr("row"));
      }
    }
    let start = finalRowIndex < rowIndex ? finalRowIndex : rowIndex;
    let end = finalRowIndex < rowIndex ? rowIndex : finalRowIndex;
    for (let i = start + 1; i <= end; i++) {
      let tr = puma(this._divBody).find("tr[row='" + i + "']");
      let dataItemId = tr.attr("dataItemId");
      this.selectRowInternal(dataItemId, true, { fromCheckboxInput: true, fromGroupOrRow: true, fromMethodCall: false, shiftKey: true });
    }
  }
  selectRowInternal(itemId, triggerChange = true, settings) {
    let options = this.getOptions();
    let bodyWhereSearch = this.thereAreLockedColumns() ? this._divBodyLocked : this._divBody;
    let checkboxList = Array.from(bodyWhereSearch.getElementsByClassName("vr-checkbox-column"));
    let checkboxGroupList = Array.from(bodyWhereSearch.querySelectorAll(".grid_divGroupByName input"));
    let dataItem = null;
    let checkboxToSelect = checkboxList.find((k) => k.getAttribute("dataItemId") == itemId);
    if (checkboxToSelect != null) {
      if (checkboxToSelect.checked) {
        let checkedCheckboxList = checkboxList.filter((k) => k.checked);
        if (options.checkboxes == GridCheckboxModeEnum.SingleCheck || options.checkboxes == GridCheckboxModeEnum.MultiCheck && !settings.fromCheckboxInput && checkedCheckboxList.length > 1) {
          if (!settings.fromMethodCall) {
            for (let checkbox of checkboxList) {
              checkbox.checked = false;
              checkbox.classList.remove("indeterminateVrCheckbox");
              this._rowCheckedIdList.vrDelete(String(checkbox.getAttribute("dataItemId")));
            }
            for (let checkbox of checkboxGroupList) {
              checkbox.checked = false;
              checkbox.classList.remove("indeterminateVrCheckbox");
            }
            this._rowCheckedIdList.vrDelete(String(itemId));
          }
          checkboxToSelect.checked = true;
          this._rowCheckedIdList.push(String(itemId));
        } else {
          if (settings.fromGroupOrRow)
            this.unselectRow(itemId, triggerChange);
          else
            this._rowCheckedIdList.push(String(itemId));
        }
      } else {
        if ((options.checkboxes == GridCheckboxModeEnum.SingleCheck || !settings.fromCheckboxInput) && !settings.fromMethodCall) {
          for (let checkbox of checkboxList) {
            checkbox.checked = false;
            this._rowCheckedIdList.vrDelete(String(checkbox.getAttribute("dataItemId")));
          }
          for (let checkbox of checkboxGroupList) {
            checkbox.checked = false;
            checkbox.classList.remove("indeterminateVrCheckbox");
          }
        }
        if (!settings.fromGroupOrRow && !settings.fromMethodCall) {
          checkboxToSelect.checked = false;
          this._rowCheckedIdList.vrDelete(String(itemId));
        } else {
          checkboxToSelect.checked = true;
          this._rowCheckedIdList.push(String(itemId));
        }
      }
      dataItem = this.dataSource().find((k) => k[options.dataSourceFieldId] == itemId);
    }
    this.updateCart();
    let headerCheckbox = document.getElementById(this._elementId + "header_CheckboxColumn");
    if (headerCheckbox != null)
      headerCheckbox.classList.add("indeterminateVrCheckbox");
    let checkedIdList = [];
    let datasourceIdList = this.dataSource().map((k) => k[options.dataSourceFieldId]);
    let checkboxCheckedList = checkboxList.filter((k) => k.checked);
    for (let checkboxChecked of checkboxCheckedList) {
      let dataItemId = checkboxChecked.getAttribute("dataItemId");
      let checkedId = datasourceIdList.find((k) => k == dataItemId);
      if (checkedId != null)
        checkedIdList.push(checkedId);
    }
    if (headerCheckbox != null) {
      if (checkedIdList.length == checkboxList.length) {
        headerCheckbox.classList.remove("indeterminateVrCheckbox");
        headerCheckbox.checked = true;
      } else if (checkedIdList.length == 0) {
        headerCheckbox.checked = false;
        headerCheckbox.classList.remove("indeterminateVrCheckbox");
      }
    }
    this.manageGroupCheckParent(checkboxToSelect);
    if (options.onSelectRow != null && dataItem != null && triggerChange) {
      let rowElement = checkboxToSelect.closest("tr");
      let dataSourceIdList = this.dataSource().map((k) => k[options.dataSourceFieldId]);
      let index = dataSourceIdList.indexOf(dataItem[options.dataSourceFieldId]);
      if (index == -1 || options.dataSourceFieldId == null)
        index = puma(rowElement).index();
      let selectRowEvent = new GridSelectRowEvent();
      selectRowEvent.sender = this;
      selectRowEvent.rowElement = rowElement;
      selectRowEvent.dataItem = dataItem;
      selectRowEvent.checked = checkboxToSelect != null ? checkboxToSelect.checked : false;
      selectRowEvent.empty = dataItem != null && dataItem[options.dataSourceFieldId] == null;
      selectRowEvent.index = index;
      selectRowEvent.shiftKey = settings.shiftKey;
      selectRowEvent.fromCheckbox = settings.fromCheckboxInput && !settings.shiftKey;
      options.onSelectRow(selectRowEvent);
    }
  }
  manageGroupCheckParent(checkbox) {
    let options = this.getOptions();
    if (options.groupable && options.groupBy != null && options.groupBy.fields != null && options.groupBy.fields.length > 0 && options.checkboxes != GridCheckboxModeEnum.None && checkbox != null) {
      let parentGroupRow = checkbox.parentElement.parentElement;
      let i = parentGroupRow.rowIndex;
      while (parentGroupRow != null && !parentGroupRow.classList.contains("grid_trGroupBy")) {
        parentGroupRow = this._divBody.querySelector("tr:nth-child(" + i + ")");
        if (this.thereAreLockedColumns())
          parentGroupRow = this._divBodyLocked.querySelector("tr:nth-child(" + i + ")");
        i--;
      }
      while (parentGroupRow != null && (Number(parentGroupRow.getAttribute("level")) == 0 && parentGroupRow.classList.contains("grid_trGroupBy") || (Number(parentGroupRow.getAttribute("level")) > 0 || !parentGroupRow.classList.contains("grid_trGroupBy")))) {
        if (!parentGroupRow.classList.contains("grid_trGroupBy")) {
          parentGroupRow = this._divBody.querySelector("tr:nth-child(" + i + ")");
          if (this.thereAreLockedColumns())
            parentGroupRow = this._divBodyLocked.querySelector("tr:nth-child(" + i + ")");
          i--;
          continue;
        }
        let checkBoxParentGroup = parentGroupRow.getElementsByTagName("input")[0];
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
        if (Number(parentGroupRow.getAttribute("level")) == 0)
          break;
        parentGroupRow = this._divBody.querySelector("tr:nth-child(" + i + ")");
        if (this.thereAreLockedColumns())
          parentGroupRow = this._divBodyLocked.querySelector("tr:nth-child(" + i + ")");
        i--;
      }
    }
  }
  unselectRows(itemIdList, property, triggerChange = true) {
    if (itemIdList.length == 0)
      return;
    let options = this.getOptions();
    if (property != null)
      itemIdList = this.dataSource().filter((k) => itemIdList.includes(String(k[property]))).map((k) => k[options.dataSourceFieldId]);
    itemIdList = itemIdList.vrToStringArrayList().vrDistinct();
    for (let itemId of itemIdList)
      this.unselectRow(itemId, triggerChange);
  }
  unselectRow(itemId, triggerChange = true) {
    let options = this.getOptions();
    let bodyWhereSearch = this.thereAreLockedColumns() ? this._divBodyLocked : this._divBody;
    let checkboxList = Array.from(bodyWhereSearch.getElementsByClassName("vr-checkbox-column"));
    let headerCheckbox = document.getElementById(this._elementId + "header_CheckboxColumn");
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
    let checkboxToDeselect = checkboxList.find((k) => k.getAttribute("dataItemId") == itemId);
    if (checkboxToDeselect != null) {
      if (checkboxToDeselect.checked)
        checkboxToDeselect.checked = false;
      dataItem = this.dataSource().find((k) => k[options.dataSourceFieldId] == itemId);
      this.manageGroupCheckParent(checkboxToDeselect);
    }
    if (options.onSelectRow != null && checkboxToDeselect != null && triggerChange) {
      let rowElement = checkboxToDeselect.closest("tr");
      let dataSourceIdList = this.dataSource().map((k) => k[options.dataSourceFieldId]);
      let index = dataSourceIdList.indexOf(dataItem[options.dataSourceFieldId]);
      if (index == -1 || options.dataSourceFieldId == null)
        index = puma(rowElement).index();
      let selectRowEvent = new GridSelectRowEvent();
      selectRowEvent.sender = this;
      selectRowEvent.rowElement = rowElement;
      selectRowEvent.dataItem = dataItem;
      selectRowEvent.checked = false;
      selectRowEvent.empty = dataItem != null && dataItem[options.dataSourceFieldId] == null;
      selectRowEvent.index = index;
      selectRowEvent.shiftKey = false;
      selectRowEvent.fromCheckbox = false;
      options.onSelectRow(selectRowEvent);
    }
  }
  //#endregion
  //#region Cart
  updateCart() {
    let btnCart = ControlManager.get(this._elementId + "_btnCart");
    if (btnCart != null) {
      let checkedValues = this.getCheckedValues();
      btnCart.badge(String(checkedValues.length));
    }
  }
  openWindowCart() {
    let options = this.getOptions();
    this.createWindowCart();
    this._wndCart.open();
    this._grdCart.dataSource(this.getCheckedItems());
    this._grdCart.removeAllGroups(false);
    if (options.groupBy != null)
      this._grdCart.addGroups(options.groupBy.fields);
  }
  createWindowCart() {
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
        onClose: (e) => {
          puma(this._wndCart.container()).remove();
          this._wndCart = null;
        },
        footer: [
          { text: "Chiudi", type: WindowFooterItemTypeEnum.Close },
          {
            text: "Rimuovi tutto",
            type: WindowFooterItemTypeEnum.Ok,
            confirmationMessage: "Confermi di voler rimuovere tutti gli elementi?",
            onClick: (e) => {
              this.clearSelection();
              this._grdCart.clear();
              this._wndCart.close();
            }
          }
        ]
      }
    );
    puma(this.container()).append(this._wndCart.container());
    puma(this._wndCart.element()).vrAppendPuma("<div id='" + this._elementId + "_divWindowCartContainer' class='vrContainer'></div>");
    let divContainer = puma("#" + this._elementId + "_divWindowCartContainer")[0];
    let columns = options.columns.filter((k) => options.footer.cartSettings.fields.includes(k.field));
    columns.unshift({
      field: "remove",
      type: GridColumnTypeEnum.Button,
      width: 40,
      buttonSettings: (e) => {
        return {
          icon: IconClassicLight.Remove,
          onClick: (e2) => {
            this.unselectRow(e2.dataItem[options.dataSourceFieldId]);
            this._grdCart.dataSource(this.getCheckedItems());
            if (this.getCheckedValues().length == 0)
              this._wndCart.close();
          }
        };
      }
    });
    columns.forEach((k) => {
      k.fitSpace = void 0;
      if (k.width == null || k.fitSpace != null)
        k.width = 100;
    });
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
        columns
      },
      divContainer
    );
  }
  //#endregion
  //#region Sorting
  applySorting(rebind = true) {
    if (this._actualSortingInfo != null)
      this.sort(this._actualSortingInfo.field, this._actualSortingInfo.mode, rebind);
  }
  removeSort(updateDataSource = true) {
    if (this._actualSortingInfo != null) {
      let options = this.getOptions();
      let field = this._actualSortingInfo.field;
      let thJq = puma(this._divHeader).find("th[field='" + field + "']");
      if (options.lockable && thJq[0] == null)
        thJq = puma(this._divHeaderLocked).find("th[field='" + field + "']");
      if (thJq[0] != null) {
        thJq[0].style.cssText += "background-color: #e3f1fa !important; color: #000 !important;";
        if (thJq.find(".grid_headerThContent")[0] != null)
          thJq.find(".grid_headerThContent")[0].style.cssText += "color: #000 !important;";
      }
      thJq.find("i").removeClass(IconClassicLight.CaretUp);
      thJq.find("i").removeClass(IconClassicLight.CaretDown);
      thJq.removeAttr("sortMode");
      this._actualSortingInfo = null;
      if (options.groupBy != null)
        options.groupBy.sortBy = void 0;
      if (updateDataSource) {
        if (options.serverBinding !== false)
          this.rebind();
        else
          this.update();
      }
    }
  }
  sort(field, gridSortModeEnum, rebind = true) {
    let options = this.getOptions();
    if (options.sortable === false)
      return;
    if (this._actualSortingInfo != null && this._actualSortingInfo.field !== field)
      this.removeSort(false);
    let thJq = puma(this._divHeader).find("th[field='" + field + "']");
    if (options.lockable && thJq[0] == null)
      thJq = puma(this._divHeaderLocked).find("th[field='" + field + "']");
    if (thJq[0] != null) {
      thJq[0].style.cssText += "background-color: coral !important; color: #FFF !important;";
      if (thJq.find(".grid_headerThContent")[0] != null)
        thJq.find(".grid_headerThContent")[0].style.cssText += "color: #FFF !important;";
    }
    if (gridSortModeEnum == null) gridSortModeEnum = GridSortDirectionEnum.Asc;
    this._actualSortingInfo = { field, mode: gridSortModeEnum };
    if (gridSortModeEnum == GridSortDirectionEnum.Asc) {
      thJq.find("i").removeClass(IconClassicLight.CaretDown);
      thJq.find("i").removeClass(IconClassicLight.CaretUp);
      thJq.find("i").addClass(IconClassicLight.CaretUp);
      thJq.attr("sortMode", GridSortDirectionEnum.Asc);
    } else {
      thJq.find("i").removeClass(IconClassicLight.CaretDown);
      thJq.find("i").removeClass(IconClassicLight.CaretUp);
      thJq.find("i").addClass(IconClassicLight.CaretDown);
      thJq.attr("sortMode", GridSortDirectionEnum.Desc);
    }
    if (options.serverBinding !== false && rebind) {
      this.rebind();
      return;
    }
    if (this.dataSource().length > 2500) {
      showLoader();
      window.setTimeout(() => {
        this.sortInternal(field, gridSortModeEnum, rebind);
        hideLoader();
      });
    } else
      this.sortInternal(field, gridSortModeEnum, rebind);
  }
  sortInternal(field, gridSortModeEnum, rebind = true) {
    let options = this.getOptions();
    this._cellButtons = /* @__PURE__ */ new Map();
    this._cellIcons = /* @__PURE__ */ new Map();
    this._cellCustoms = /* @__PURE__ */ new Map();
    this._cellLabels = /* @__PURE__ */ new Map();
    this._cellImages = /* @__PURE__ */ new Map();
    let items = this.dataSource().map((k) => k);
    if (options.groupBy != null) {
      options.groupBy.sortBy = { field, direction: gridSortModeEnum };
      this.sortingGroupFields(items);
    } else
      items.vrSortBy([field], gridSortModeEnum == GridSortDirectionEnum.Asc);
    if (rebind) {
      this.drawTable(items);
      this.manageControls();
    }
  }
  sortingGroupFields(dataItems) {
    let options = this.getOptions();
    let sortingFields = [];
    let groupBySettings = options.groupBy;
    let sortByField = groupBySettings.sortBy != null ? groupBySettings.sortBy.field : null;
    if (sortByField != null) {
      if (groupBySettings.sortBy.direction == GridSortDirectionEnum.Desc)
        sortingFields.push("-" + sortByField);
      else
        sortingFields.push(sortByField);
      let thJq = puma(this._divHeader).find("th[field='" + sortByField + "']");
      if (options.lockable && thJq[0] == null)
        thJq = puma(this._divHeaderLocked).find("th[field='" + sortByField + "']");
      if (thJq[0] != null) {
        thJq[0].style.cssText += "background-color: coral !important; color: #FFF !important;";
        if (thJq.find(".grid_headerThContent")[0] != null)
          thJq.find(".grid_headerThContent")[0].style.cssText += "color: #FFF !important;";
      }
      if (groupBySettings.sortBy.direction == null) groupBySettings.sortBy.direction = GridSortDirectionEnum.Asc;
      this._actualSortingInfo = { field: sortByField, mode: groupBySettings.sortBy.direction };
      if (groupBySettings.sortBy.direction == GridSortDirectionEnum.Asc) {
        thJq.find("i").removeClass(IconClassicLight.CaretDown);
        thJq.find("i").removeClass(IconClassicLight.CaretUp);
        thJq.find("i").addClass(IconClassicLight.CaretUp);
        thJq.attr("sortMode", GridSortDirectionEnum.Asc);
      } else {
        thJq.find("i").removeClass(IconClassicLight.CaretDown);
        thJq.find("i").removeClass(IconClassicLight.CaretUp);
        thJq.find("i").addClass(IconClassicLight.CaretDown);
        thJq.attr("sortMode", GridSortDirectionEnum.Desc);
      }
    } else {
      let automaticSort = groupBySettings.automaticSort;
      if (automaticSort == null)
        automaticSort = true;
      if (groupBySettings.fields != null && automaticSort) {
        for (let groupByField of groupBySettings.fields) {
          if (groupByField == null)
            continue;
          if (!sortingFields.includes(groupByField.field))
            sortingFields.push(groupByField.field);
        }
      }
    }
    let internalSortByField = groupBySettings.internalSortBy != null ? groupBySettings.internalSortBy.field : null;
    if (internalSortByField != null) {
      if (groupBySettings.internalSortBy.direction == GridSortDirectionEnum.Desc)
        sortingFields.push("-" + internalSortByField);
      else
        sortingFields.push(internalSortByField);
    }
    sortingFields = sortingFields.vrDistinct();
    if (sortingFields.length > 0)
      dataItems.vrSortBy(sortingFields);
  }
  //#endregion
  //#region Column
  column(field) {
    let options = this.getOptions();
    let column = options.columns.find((k) => k.field == field);
    let columnIndex = options.columns.indexOf(column);
    return options.columns[columnIndex];
  }
  columnTitle(field, title) {
    let column = this.column(field);
    if (column != null) {
      if (title != null) {
        column.title = title;
        puma(this._divHeader).find("th[field='" + field + "']").find("span.grid_headerThContent").html(title);
        let options = this.getOptions();
        if (options.lockable)
          puma(this._divHeaderLocked).find("th[field='" + field + "']").find("span.grid_headerThContent").html(title);
      }
      return column.title;
    } else
      return "";
  }
  hideColumns(fields, update = true) {
    for (let field of fields)
      this.hideColumn(field, false);
    if (update)
      this.update();
  }
  hideColumn(field, updateDataSource = true) {
    puma(this._divHeader).find("th[field='" + field + "']").hide();
    puma(this._divFilters).find("td[field='" + field + "']").hide();
    puma(this._divBody).find("td[field='" + field + "']").hide();
    puma(this._divTotals).find("td[field='" + field + "']").hide();
    let options = this.getOptions();
    if (options.lockable) {
      puma(this._divHeaderLocked).find("th[field='" + field + "']").hide();
      puma(this._divFiltersLocked).find("td[field='" + field + "']").hide();
      puma(this._divBodyLocked).find("td[field='" + field + "']").hide();
      puma(this._divTotalsLocked).find("td[field='" + field + "']").hide();
    }
    let column = this.column(field);
    if (column != null) {
      column.hidden = true;
      this.removeFilter(field);
    }
    if (updateDataSource)
      this.update();
  }
  hideCheckboxColumn(updateDataSource = false) {
    this.hideColumn("vrGridCheckboxColumn", updateDataSource);
  }
  hideEditButtonColumn(updateDataSource = false) {
    this.hideColumn("editButton", updateDataSource);
  }
  hideOnlyThisColumns(fieldList, updateDataSource = true) {
    let options = this.getOptions();
    for (let column of options.columns)
      this.showColumn(column.field, false);
    for (let field of fieldList)
      this.hideColumn(field, false);
    if (updateDataSource)
      this.update();
  }
  showColumns(fields, update = true) {
    for (let field of fields)
      this.showColumn(field, false);
    if (update)
      this.update();
  }
  showColumn(field, updateDataSource = true) {
    puma(this._divHeader).find("th[field='" + field + "']").show();
    puma(this._divFilters).find("td[field='" + field + "']").show();
    puma(this._divBody).find("td[field='" + field + "']").show();
    puma(this._divTotals).find("td[field='" + field + "']").show();
    let options = this.getOptions();
    if (options.lockable) {
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
  showCheckboxColumn(updateDataSource = false) {
    this.showColumn("vrGridCheckboxColumn", updateDataSource);
  }
  showEditButtonColumn(updateDataSource = false) {
    this.showColumn("editButton", updateDataSource);
  }
  showOnlyThisColumns(fieldList, updateDataSource = true) {
    let options = this.getOptions();
    for (let column of options.columns)
      this.hideColumn(column.field, false);
    for (let field of fieldList)
      this.showColumn(field, false);
    if (updateDataSource)
      this.update();
  }
  columnVisible(value, state, updateDataSource = true) {
    if (state) this.showColumn(value, updateDataSource);
    else this.hideColumn(value, updateDataSource);
  }
  columnCheckboxVisible(state, updateDataSource = false) {
    if (state) this.showCheckboxColumn(updateDataSource);
    else this.hideCheckboxColumn(updateDataSource);
  }
  //#endregion
  //#region Lock/Unlock
  lockColumns(fields, update = true) {
    let options = this.getOptions();
    if (options.lockable) {
      for (let field of fields)
        this.lockColumn(field, false);
      if (update)
        this.update();
    }
  }
  lockColumn(field, update = true) {
    let options = this.getOptions();
    if (options.lockable) {
      if (this._divHeaderLocked != null) this._divHeaderLocked.style.cssText += "display: inline-block;";
      if (this._divFiltersLocked != null) this._divFiltersLocked.style.cssText += "display: inline-block;";
      if (this._divBodyLocked != null) this._divBodyLocked.style.cssText += "display: inline-block;";
      if (this._divTotalsLocked != null) this._divTotalsLocked.style.cssText += "display: inline-block;";
      if (!this.thereAreLockedColumns()) {
        let columnEditButton = this.column("editButton");
        if (columnEditButton != null) {
          columnEditButton.locked = true;
          this.showColumn("editButton", false);
          let columnToMoveIndex = options.columns.indexOf(columnEditButton);
          let columnToMove = options.columns.splice(columnToMoveIndex, 1)[0];
          options.columns.splice(0, 0, columnToMove);
          puma(this._divHeader).find("th[field='editButton']").attr("locked", "locked");
          puma(this._divHeader).find("th[field='editButton']").vrAppendToPuma(puma(this._divHeaderLocked).find("tr"));
          puma(this._divFilters).find("td[field='editButton']").vrAppendToPuma(puma(this._divFiltersLocked).find("tr"));
          puma(this._divTotals).find("td[field='editButton']").vrAppendToPuma(puma(this._divTotalsLocked).find("tr"));
        }
        if (options.checkboxes !== false) {
          let firstColumnField = options.columns[0].field;
          puma(this._divHeader).find("th[field='vrGridCheckboxColumn']").vrInsertBeforePuma(puma(this._divHeaderLocked).find("tr th[field='" + firstColumnField + "']"));
          puma(this._divFilters).find("td[field='vrGridCheckboxColumn']").vrInsertBeforePuma(puma(this._divFiltersLocked).find("tr td[field='" + firstColumnField + "']"));
          puma(this._divTotals).find("td[field='vrGridCheckboxColumn']").vrInsertBeforePuma(puma(this._divTotalsLocked).find("tr td[field='" + firstColumnField + "']"));
        }
      }
      puma(this._divHeader).find("th[field='" + field + "']").vrAppendToPuma(puma(this._divHeaderLocked).find("tr"));
      puma(this._divHeaderLocked).find("th[field='" + field + "']").attr("locked", "locked");
      puma(this._divFilters).find("td[field='" + field + "']").vrAppendToPuma(puma(this._divFiltersLocked).find("tr"));
      puma(this._divTotals).find("td[field='" + field + "']").vrAppendToPuma(puma(this._divTotalsLocked).find("tr"));
      let column = this.column(field);
      if (column != null) {
        column.locked = true;
        this.showColumn(field, false);
        let columnToMoveIndex = options.columns.indexOf(column);
        let columnToMove = options.columns.splice(columnToMoveIndex, 1)[0];
        let lastLockedColumn = options.columns.filter((k) => k.locked == true).vrLast();
        let lastLockedColumnIndex = lastLockedColumn == null ? 0 : options.columns.lastIndexOf(lastLockedColumn);
        options.columns.splice(lastLockedColumn == null ? 0 : lastLockedColumnIndex + 1, 0, columnToMove);
      }
      this.recalculateHeightWidth();
      if (update)
        this.update();
    }
  }
  unlockColumns(fields, update = true) {
    let options = this.getOptions();
    if (options.lockable) {
      for (let field of fields)
        this.unlockColumn(field, false);
      if (update)
        this.update();
    }
  }
  unlockColumn(field, update = true) {
    let options = this.getOptions();
    if (options.lockable) {
      puma(this._divHeaderLocked).find("th[field='" + field + "']").removeAttr("locked");
      puma(this._divHeaderLocked).find("th[field='" + field + "']").vrAppendToPuma(puma(this._divHeader).find("tr"));
      puma(this._divFiltersLocked).find("td[field='" + field + "']").vrAppendToPuma(puma(this._divFilters).find("tr"));
      puma(this._divTotalsLocked).find("td[field='" + field + "']").vrAppendToPuma(puma(this._divTotals).find("tr"));
      let column = this.column(field);
      if (column != null) {
        column.locked = false;
        let columnToMoveIndex = options.columns.indexOf(column);
        let columnToMove = options.columns.splice(columnToMoveIndex, 1)[0];
        options.columns.splice(options.columns.length, 0, columnToMove);
      }
      if (!this.thereAreLockedColumns()) {
        if (this._divHeaderLocked != null) this._divHeaderLocked.style.cssText += "display: none;";
        if (this._divFiltersLocked != null) this._divFiltersLocked.style.cssText += "display: none;";
        if (this._divBodyLocked != null) this._divBodyLocked.style.cssText += "display: none;";
        if (this._divTotalsLocked != null) this._divTotalsLocked.style.cssText += "display: none;";
        let columnEditButton = this.column("editButton");
        if (columnEditButton != null) {
          columnEditButton.locked = false;
          let columnToMoveIndex = options.columns.indexOf(columnEditButton);
          let columnToMove = options.columns.splice(columnToMoveIndex, 1)[0];
          options.columns.splice(0, 0, columnToMove);
          let fieldAfterEditButton = options.columns[1].field;
          puma(this._divHeaderLocked).find("th[field='editButton']").removeAttr("locked");
          puma(this._divHeaderLocked).find("th[field='editButton']").vrInsertBeforePuma(puma(this._divHeader).find("tr th[field='" + fieldAfterEditButton + "']"));
          puma(this._divFiltersLocked).find("td[field='editButton']").vrInsertBeforePuma(puma(this._divFilters).find("tr td[field='" + fieldAfterEditButton + "']"));
          puma(this._divTotalsLocked).find("td[field='editButton']").vrInsertBeforePuma(puma(this._divTotals).find("tr td[field='" + fieldAfterEditButton + "']"));
        }
        if (options.checkboxes !== false) {
          let firstColumnField = options.columns[0].field;
          puma(this._divHeaderLocked).find("th[field='vrGridCheckboxColumn']").vrInsertBeforePuma(puma(this._divHeader).find("tr th[field='" + firstColumnField + "']"));
          puma(this._divFiltersLocked).find("td[field='vrGridCheckboxColumn']").vrInsertBeforePuma(puma(this._divFilters).find("tr td[field='" + firstColumnField + "']"));
          puma(this._divTotalsLocked).find("td[field='vrGridCheckboxColumn']").vrInsertBeforePuma(puma(this._divTotals).find("tr td[field='" + firstColumnField + "']"));
        }
      }
      this.recalculateHeightWidth();
      if (update)
        this.update();
    }
  }
  lockedColumns() {
    let options = this.getOptions();
    return options.columns.filter((k) => k.locked && k.field != "editButton");
  }
  thereAreLockedColumns() {
    let options = this.getOptions();
    return options.lockable && options.columns.filter((k) => k.field != "editButton").vrAny((k) => k.locked);
  }
  //#endregion
  //#region GroupBy
  hasGroup() {
    return this.getOptions().groupBy != null;
  }
  removeGroup(field, updateDataSource = true) {
    this.removeGroups([field], updateDataSource);
  }
  removeGroups(fields, updateDataSource = true) {
    let options = this.getOptions();
    if (options.groupable && options.groupBy != null) {
      for (let field of fields) {
        if (options.groupBy.fields.map((k) => k.field).includes(field))
          options.groupBy.fields.vrDeleteAllBy((k) => k.field == field);
        puma("#" + this._elementId + "_divContainer").find(".groupBy" + field).hide();
      }
      if (options.groupBy.fields == null || options.groupBy.fields.length == 0)
        options.groupBy = null;
      if (updateDataSource) {
        if (options.serverBinding !== false)
          this.rebind();
        else
          this.update();
      }
    }
  }
  removeAllGroups(updateDataSource = true) {
    this.removeSort(false);
    let options = this.getOptions();
    if (options.groupable && options.groupBy != null)
      this.removeGroups(options.groupBy.fields.map((k) => k.field), false);
    options.groupBy = null;
    if (updateDataSource) {
      if (options.serverBinding !== false)
        this.rebind();
      else
        this.update();
    }
  }
  addGroup(field, updateDataSource = true, sortBy, internalSortBy) {
    this.addGroups([field], updateDataSource, sortBy, internalSortBy);
  }
  addGroups(fields, updateDataSource = true, sortBy, internalSortBy) {
    if (fields.length == 0)
      return;
    let options = this.getOptions();
    if (options.groupBy == null)
      options.groupBy = new GridGroupBySettings();
    else {
      if (options.groupBy != null && options.groupBy.fields != null && options.groupBy.fields.length > 0) {
        let allFields = UtilityManager.duplicate(options.groupBy.fields);
        for (let field of fields) {
          let realField = "";
          if (typeof field == "string")
            realField = field;
          else
            realField = field.field;
          if (!allFields.map((k) => k.field).includes(realField))
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
      options.groupBy.sortBy = sortBy;
    if (internalSortBy != null)
      options.groupBy.internalSortBy = internalSortBy;
    for (let field of fields) {
      let groupByItem = field;
      if (typeof field == "string") {
        groupByItem = new GridGroupByItem();
        groupByItem.field = field;
      }
      if (options.groupBy.fields == null) options.groupBy.fields = [];
      if (!options.groupBy.fields.map((k) => k.field).includes(groupByItem.field))
        options.groupBy.fields.push(groupByItem);
      let groupByField = field;
      if (typeof field != "string")
        groupByField = field.field;
      puma("#" + this._elementId + "_divContainer").find(".groupBy" + groupByField).show();
      let headerClasses = Array.from(puma(this._divHeader).find(">table tr:first-child th")).map((k) => k.classList[0]);
      if (!headerClasses.includes("groupBy" + groupByItem.field))
        puma(this._divHeader).find(">table tr:first-child").vrPrependPuma("<th class='groupBy" + groupByItem.field + " groupByHeader' field='" + groupByItem.field + "'></th>");
      let filterClasses = Array.from(puma(this._divFilters).find(">table tr:first-child td")).map((k) => k.classList[0]);
      if (!filterClasses.includes("groupBy" + groupByItem.field))
        puma(this._divFilters).find(">table tr:first-child").vrPrependPuma("<td class='groupBy" + groupByItem.field + " groupByFilter'></td>");
      if (options.lockable) {
        let headerLockedClasses = Array.from(puma(this._divHeaderLocked).find(">table tr:first-child th")).map((k) => k.classList[0]);
        if (!headerLockedClasses.includes("groupBy" + groupByItem.field))
          puma(this._divHeaderLocked).find(">table tr:first-child").vrPrependPuma("<th class='groupBy" + groupByItem.field + " groupByHeader' field='" + groupByItem.field + "'></th>");
        let filterLockedClasses = Array.from(puma(this._divFiltersLocked).find(">table tr:first-child td")).map((k) => k.classList[0]);
        if (!filterLockedClasses.includes("groupBy" + groupByItem.field))
          puma(this._divFiltersLocked).find(">table tr:first-child").vrPrependPuma("<td class='groupBy" + groupByItem.field + " groupByFilter'></td>");
      }
      let columnFields = options.columns.map((k) => k.field);
      if (!columnFields.includes(groupByItem.field))
        options.columns.push({ field: groupByItem.field, hidden: true });
    }
    this.sortingGroupFields(this.dataSource());
    if (updateDataSource) {
      if (options.serverBinding !== false)
        this.rebind();
      else
        this.update();
    }
  }
  getChildrenGroupRows(tr, divBody) {
    let childrenGroupRows = new GridChildrenGroupRows();
    let childrenList = [];
    let level = Number(puma(tr).attr("level"));
    let i = puma(tr).index() + 2;
    let childrenRow = puma(divBody).find("tr:nth-child(" + i + ")");
    let childrenLevel = Number(puma(divBody).find("tr:nth-child(" + i + ")").attr("level"));
    childrenList.push(childrenRow[0]);
    while (level == 0 && childrenLevel != level || level != childrenLevel && !childrenRow.hasClass("grid_trGroupBy")) {
      if (childrenRow.length == 0)
        break;
      if (!childrenList.map((k) => puma(k).attr("id")).includes(childrenRow.attr("id")) || childrenRow.hasClass("grid_trGroupBy"))
        childrenList.push(childrenRow[0]);
      i++;
      childrenRow = puma(divBody).find("tr:nth-child(" + i + ")");
      childrenLevel = Number(puma(divBody).find("tr:nth-child(" + i + ")").attr("level"));
    }
    childrenList = childrenList.filter((k) => !puma(k).hasClass("p-grid-totalsGroup"));
    childrenGroupRows.children = childrenList.filter((k) => !puma(k).hasClass("grid_trGroupBy"));
    childrenGroupRows.groupRows = childrenList.filter((k) => puma(k).hasClass("grid_trGroupBy"));
    childrenGroupRows.allRows = childrenList;
    return childrenGroupRows;
  }
  getCheckedChildrenGroupRows(tr, divBody) {
    let checkedChildren = [];
    let childrenRows = this.getChildrenGroupRows(tr, divBody);
    for (let childRow of childrenRows.children) {
      let checkBox = puma(childRow).find(".vr-checkbox-column")[0];
      if (checkBox != null && checkBox.checked)
        checkedChildren.push(childRow);
    }
    return checkedChildren;
  }
  //#endregion
  //#region Table actions (Show/Hide & GroupBy)
  createWindowActions() {
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
        onClose: (e) => {
          puma(this._wndActions.container()).remove();
          this._wndActions = null;
        },
        footer: [
          {
            type: WindowFooterItemTypeEnum.Custom,
            text: "Reimposta",
            mode: ButtonModeEnum.Primary,
            value: "restoreOriginal",
            icon: IconClassicLight.RotateLeft,
            align: WindowFooterItemAlignEnum.Left,
            onClick: (e) => {
              let wndTableActionsContainer = puma("#" + this._elementId + "_divWindowTableActionsContainer");
              for (let checkBoxElement of Array.from(wndTableActionsContainer.find("input"))) {
                let checkBox = ControlManager.get(checkBoxElement.id);
                let field = puma(checkBoxElement).attr("field");
                let newValue = !this._originalHiddenColumnFields.includes(field);
                if (checkBox.checked() != newValue)
                  checkBox.checked(newValue);
              }
            }
          },
          {
            type: WindowFooterItemTypeEnum.Custom,
            text: "Seleziona tutti",
            mode: ButtonModeEnum.Primary,
            value: "checkAll",
            icon: IconClassicLight.Check,
            align: WindowFooterItemAlignEnum.Left,
            onClick: (e) => {
              let wndTableActionsContainer = puma("#" + this._elementId + "_divWindowTableActionsContainer");
              for (let checkBoxElement of Array.from(wndTableActionsContainer.find("input"))) {
                let checkBox = ControlManager.get(checkBoxElement.id);
                if (!checkBox.checked())
                  checkBox.checked(true, true);
              }
            }
          },
          {
            type: WindowFooterItemTypeEnum.Custom,
            text: "Deseleziona tutti",
            icon: IconClassicLight.Check,
            align: WindowFooterItemAlignEnum.Left,
            onClick: (e) => {
              let wndTableActionsContainer = puma("#" + this._elementId + "_divWindowTableActionsContainer");
              for (let checkBoxElement of Array.from(wndTableActionsContainer.find("input"))) {
                let checkBox = ControlManager.get(checkBoxElement.id);
                if (checkBox.checked())
                  checkBox.checked(false, true);
              }
            }
          },
          { type: WindowFooterItemTypeEnum.Close, align: WindowFooterItemAlignEnum.Right },
          { type: WindowFooterItemTypeEnum.Ok, value: "ok", text: "Applica", align: WindowFooterItemAlignEnum.Right }
        ]
      }
    );
    puma(this._wndActions.element()).vrAppendPuma("<div id='" + this._elementId + "_divWindowTableActionsContainer'  class='vrContainer'></div>");
  }
  openWindowActions(gridActionEnum) {
    this.createWindowActions();
    let groupFieldAddedList = [];
    let groupFieldRemovedList = [];
    let columnFieldToShowList = [];
    let columnFieldToHideList = [];
    let columnFieldToLockList = [];
    let columnFieldToUnlockList = [];
    let editTableActions = false;
    let options = this.getOptions();
    this._wndActions.open([
      {
        value: "ok",
        callback: () => {
          if (!editTableActions)
            return;
          if (this.dataSource().length > 1e3)
            showLoader();
          this._wndActions.close();
          window.setTimeout(() => {
            if (gridActionEnum == 1 && (groupFieldRemovedList.length > 0 || groupFieldAddedList.length > 0)) {
              this.removeGroups(groupFieldRemovedList, false);
              this.addGroups(groupFieldAddedList, false);
              if (options.serverBinding !== false)
                this.rebind();
              else
                this.update();
            } else if (gridActionEnum == 0 && (columnFieldToShowList.length > 0 || columnFieldToHideList.length > 0)) {
              this.showColumns(columnFieldToShowList, false);
              this.hideColumns(columnFieldToHideList, false);
              this.removeFilters(columnFieldToHideList, false);
              if (columnFieldToHideList.length > 0)
                this.applyFilters(true);
              else
                this.update();
            } else if (gridActionEnum == 2 && (columnFieldToLockList.length > 0 || columnFieldToUnlockList.length > 0)) {
              if (columnFieldToLockList.length > 0 || this.lockedColumns().length - columnFieldToUnlockList.length > 0) {
                this.lockColumns(columnFieldToLockList, false);
                this.unlockColumns(columnFieldToUnlockList, false);
                this.update();
              } else {
                confirm("Vuoi ripristinare il layout di base?").then(
                  () => {
                    this.lockColumns(columnFieldToLockList, false);
                    this.unlockColumns(columnFieldToUnlockList, false);
                    this._actualLayout = null;
                    this.changeLayout(true, this._originalOptionsForLayout);
                  },
                  () => {
                    this.lockColumns(columnFieldToLockList, false);
                    this.unlockColumns(columnFieldToUnlockList, false);
                    this.update();
                  }
                );
              }
            }
            hideLoader();
          }, 100);
        }
      }
    ]);
    this.clearWindowActions();
    let divContainer = puma("#" + this._elementId + "_divWindowTableActionsContainer")[0];
    divContainer.style.cssText += "overflow-y: auto;";
    if (gridActionEnum == 0)
      this._wndActions.title("Mostra o nascondi colonne");
    else if (gridActionEnum == 1)
      this._wndActions.title("Raggruppa per colonne");
    else if (gridActionEnum == 2)
      this._wndActions.title("Blocca o sblocca colonne");
    for (let column of options.columns) {
      if (column.type == GridColumnTypeEnum.EditButton || column.title === "" || column.title == null)
        continue;
      if (gridActionEnum == 0 && column.hideable === false || gridActionEnum == 1 && column.groupable === false || gridActionEnum == 2 && column.lockable === false)
        continue;
      let div2 = puma("<div id='" + this._elementId + "_divActionColumn" + column.field + "' field='" + column.field + "' class='grid_divActionColumn'></div>").vrAppendToPuma(divContainer);
      let checked = false;
      if (gridActionEnum == 0) {
        checked = column.hidden !== true;
        this._wndActions.footerItem("restoreOriginal").show();
      } else if (gridActionEnum == 1) {
        checked = options.groupable && options.groupBy != null && options.groupBy.fields != null ? options.groupBy.fields.map((k) => k.field).includes(column.field) : false;
        this._wndActions.footerItem("restoreOriginal").hide();
      } else if (gridActionEnum == 2) {
        checked = column.locked === true;
        this._wndActions.footerItem("restoreOriginal").hide();
        this._wndActions.footerItem("checkAll").hide();
      }
      puma("<input id='" + this._elementId + "_chkActionColumn" + column.field + "' field='" + column.field + "' />").vrAppendToPuma(div2);
      createCheckBox(
        {
          checked,
          text: column.title,
          cssContainer: "width: 100%",
          onCheck: (e) => {
            editTableActions = true;
            let field = puma(e.sender.element()).attr("field");
            if (gridActionEnum == 0) {
              if (e.checked && !columnFieldToShowList.includes(field)) {
                columnFieldToShowList.push(field);
                if (columnFieldToHideList.includes(field))
                  columnFieldToHideList.vrDelete(field);
              } else if (!e.checked && !columnFieldToHideList.includes(field)) {
                columnFieldToHideList.push(field);
                if (columnFieldToShowList.includes(field))
                  columnFieldToShowList.vrDelete(field);
              }
            } else if (gridActionEnum == 1) {
              if (e.checked && !groupFieldAddedList.includes(field)) {
                groupFieldAddedList.push(field);
                if (groupFieldRemovedList.includes(field))
                  groupFieldRemovedList.vrDelete(field);
              } else if (!e.checked && !groupFieldRemovedList.includes(field)) {
                groupFieldRemovedList.push(field);
                if (groupFieldAddedList.includes(field))
                  groupFieldAddedList.vrDelete(field);
              }
            } else if (gridActionEnum == 2) {
              if (e.checked && !columnFieldToLockList.includes(field)) {
                columnFieldToLockList.push(field);
                if (columnFieldToUnlockList.includes(field))
                  columnFieldToUnlockList.vrDelete(field);
              } else if (!e.checked && !columnFieldToUnlockList.includes(field)) {
                columnFieldToUnlockList.push(field);
                if (columnFieldToLockList.includes(field))
                  columnFieldToLockList.vrDelete(field);
              }
            }
          }
        },
        null,
        null,
        this._elementId + "_chkActionColumn" + column.field
      );
    }
  }
  clearWindowActions() {
    puma("#" + this._elementId + "_divWindowTableActionsContainer").empty();
  }
  //#endregion
  //#region Filtering
  manageFilterTextByColumn(textToSearch, column, field, backSpace) {
    let filteredArray = [];
    if (column.type == GridColumnTypeEnum.Custom) {
      filteredArray = this._originalDataSource.filter((k) => {
        let properties = column.customFilterProperties != null && column.customFilterProperties.length > 0 ? column.customFilterProperties : Object.keys(k);
        for (let value in k) {
          if (!properties.includes(value))
            continue;
          if (String(k[value]).toLowerCase().indexOf(textToSearch) != -1)
            return true;
        }
        return false;
      });
    } else
      filteredArray = this.getFilteredArrayByInputText(field, textToSearch);
    if (!Array.vrEquals(filteredArray, this.dataSource()) || column.filterWebService === true) {
      this._timeoutFilterText = window.setTimeout(() => {
        this.removeFilter(column.field, false);
        if (column.filterWebService === true) {
          let filterSettings = new GridFilterSettings();
          filterSettings.type = column.type;
          filterSettings.stringFilterSettings = new GridStringFilterSettings();
          filterSettings.stringFilterSettings.filterTypeEnum = GridStringFilterTypeEnum.IncludesFromSimpleSearch;
          filterSettings.stringFilterSettings.text = textToSearch.toLowerCase();
          this.updateFilter(column.field, filterSettings, false);
          this.rebind(null, true);
        } else {
          this.pageSelected(1, false);
          this.setDataSource(filteredArray);
          if (this._dictionaryFilterConditions.size > 0)
            this.applyFilters();
          let filterSettings = new GridFilterSettings();
          filterSettings.type = column.type;
          filterSettings.stringFilterSettings = new GridStringFilterSettings();
          filterSettings.stringFilterSettings.filterTypeEnum = GridStringFilterTypeEnum.IncludesFromSimpleSearch;
          filterSettings.stringFilterSettings.text = textToSearch.toLowerCase();
          this.updateFilter(column.field, filterSettings, false);
        }
      }, 500);
    }
  }
  clearFilters(updateDataSource = true, rebind = false) {
    let options = this.getOptions();
    this._dictionaryFilterConditions.forEach((value, key) => {
      let column = options.columns.find((k) => k.field == key);
      switch (column.type) {
        case GridColumnTypeEnum.Checkbox:
        case GridColumnTypeEnum.Boolean:
          {
            let checkboxJq = puma("#" + this._elementId + "_CheckboxFilter_" + column.field);
            checkboxJq.addClass("indeterminateVrCheckbox");
            let checkbox = checkboxJq[0];
            checkbox.checked = false;
          }
          break;
        case GridColumnTypeEnum.Date:
          {
            let dateFilter = ControlManager.get(this._elementId + "_DateFilter_" + column.field);
            dateFilter.tooltip("");
            puma(dateFilter.element()).css("background-color", "#f3f3f3");
            puma(dateFilter.element()).css("color", "#000");
            let dateFilterRemove = ControlManager.get(this._elementId + "_DateFilterRemove_" + column.field);
            dateFilterRemove.hide();
            this.recalculateHeight(true);
          }
          break;
        case GridColumnTypeEnum.Number:
        case GridColumnTypeEnum.Currency:
        case GridColumnTypeEnum.Percentage:
        case GridColumnTypeEnum.Duration:
          {
            let numberFilter = ControlManager.get(this._elementId + "_NumberFilter_" + column.field);
            numberFilter.tooltip("");
            puma(numberFilter.element()).css("background-color", "#f3f3f3");
            puma(numberFilter.element()).css("color", "#000");
            let numberFilterRemove = ControlManager.get(this._elementId + "_NumberFilterRemove_" + column.field);
            numberFilterRemove.hide();
            this.recalculateHeight(true);
          }
          break;
        case GridColumnTypeEnum.String:
        case GridColumnTypeEnum.Custom:
        case GridColumnTypeEnum.Label:
          {
            let textBox = ControlManager.get(this._elementId + "_StringFilter_" + column.field);
            textBox.clear();
            textBox.width("Calc(100% - 27px)");
            let stringFilter = ControlManager.get(this._elementId + "_StringFilterBtn_" + column.field);
            stringFilter.tooltip("");
            puma(stringFilter.element()).css("background-color", "#f3f3f3");
            puma(stringFilter.element()).css("color", "#000");
            let stringFilterRemove = ControlManager.get(this._elementId + "_StringFilterBtnRemove_" + column.field);
            stringFilterRemove.hide();
            this.recalculateHeight(true);
          }
          break;
      }
      this.removeFilter(key, false);
    });
    if (updateDataSource)
      this.update();
    if (rebind)
      this.rebind();
  }
  getFilteredArrayByInputText(field, value) {
    value = value.toLowerCase();
    let filteredArray = [];
    let arrayWhereSearch = this._dictionaryDataValues.get(field);
    arrayWhereSearch.forEach((k, index) => {
      if (k.indexOf(value) !== -1)
        filteredArray.push(this._originalDataSource[index]);
    });
    return filteredArray;
  }
  createWindowFiltering() {
    if (this._wndFiltering != null)
      return;
    let options = this.getOptions();
    this._wndFiltering = createWindow(
      {
        addToControlList: false,
        classContainer: this.element().id + "_wndUtility",
        width: 430,
        autoSize: WindowAutoSizeDirectionEnum.Height,
        title: "Gestisci filtro",
        onClose: (e) => {
          puma(this._wndFiltering.container()).remove();
          this._wndFiltering = null;
        },
        footer: [
          { type: WindowFooterItemTypeEnum.Ok, text: "Applica" },
          { type: WindowFooterItemTypeEnum.Close },
          { type: WindowFooterItemTypeEnum.Separator, value: "removeFilterSeparator" },
          { type: WindowFooterItemTypeEnum.Custom, text: "Rimuovi filtro", value: "removeFilter", cssContainer: "margin-right: 18px;" }
        ]
      }
    );
    puma(this._wndFiltering.element()).vrAppendPuma("<div id='" + this._elementId + "_divWindowFilteringContainer' class='vrContainer'></div>");
    let divContainer = puma("#" + this._elementId + "_divWindowFilteringContainer")[0];
    puma("<div id='" + this._elementId + "_switchFilterSearch'></div>").vrAppendToPuma(divContainer);
    createSwitch({
      labelOff: "Ricerca con parametri",
      labelOn: { text: "Ricerca puntuale", tooltip: "Max 100 valori" },
      cssContainer: "margin-bottom: 5px;",
      visible: options.serverBinding == null || options.serverBinding === false,
      onChange: (e) => {
        puma(divSearchIntervals).vrVisible(!e.checked);
        puma(divSearchSpecific).vrVisible(e.checked);
        let lblCheckboxSelected = this._wndFiltering.footerItem("lblCheckboxSelectedSpecificValues");
        lblCheckboxSelected.visible(e.checked);
        this._wndFiltering.center();
        if (e.checked)
          txtFilterSpecificValues.focus();
      }
    }, null, null, this._elementId + "_switchFilterSearch");
    let divSearchIntervals = div(divContainer);
    let divFilterDate = puma("<div id='" + this._elementId + "DivFilterDate' style='display: none;'></div>").vrAppendToPuma(divSearchIntervals);
    puma("<div id='" + this._elementId + "_ddlFilterDateType'></div>").vrAppendToPuma(divFilterDate);
    let datePickerDateFilterValueFrom;
    let datePickerDateFilterValueTo;
    let datePickerDateTimeFilterValueTo;
    let numericTextBoxFilterValueTo;
    createComboBox(
      {
        mode: ComboBoxTypeEnum.DropDown,
        label: "Tipo di filtro",
        width: "100%",
        cssContainer: "margin-bottom: 10px;",
        items: [
          { text: "Data maggiore di", value: String(GridDateFilterTypeEnum.GreaterThan) },
          { text: "Data minore di", value: String(GridDateFilterTypeEnum.LessThan) },
          { text: "Data uguale a", value: String(GridDateFilterTypeEnum.EqualsTo) },
          { text: "Data compresa tra", value: String(GridDateFilterTypeEnum.Between) }
        ],
        onAfterChange: (e) => {
          if (datePickerDateFilterValueTo == null || datePickerDateTimeFilterValueTo == null)
            return;
          if (Number(e.sender.value()) == GridDateFilterTypeEnum.Between) {
            if (datePickerDateFilterValueFrom.visible())
              datePickerDateFilterValueTo.show();
            else
              datePickerDateTimeFilterValueTo.show();
          } else {
            if (datePickerDateFilterValueFrom.visible())
              datePickerDateFilterValueTo.hide();
            else
              datePickerDateTimeFilterValueTo.hide();
          }
        }
      },
      null,
      null,
      this._elementId + "_ddlFilterDateType"
    );
    puma("<input id='" + this._elementId + "_dtpFilterDateFrom' />").vrAppendToPuma(divFilterDate);
    datePickerDateFilterValueFrom = createDatePicker(
      {
        width: 200,
        cssContainer: "margin-right: 5px;"
      },
      null,
      null,
      this._elementId + "_dtpFilterDateFrom"
    );
    puma("<input id='" + this._elementId + "_dtpFilterDateTo' />").vrAppendToPuma(divFilterDate);
    datePickerDateFilterValueTo = createDatePicker(
      {
        width: 198,
        label: "e",
        labelSettings: { position: PositionEnum.Left },
        visible: false
      },
      null,
      null,
      this._elementId + "_dtpFilterDateTo"
    );
    puma("<input id='" + this._elementId + "_dtpDateTimeFilterDateFrom' />").vrAppendToPuma(divFilterDate);
    createDatePicker(
      {
        width: 200,
        cssContainer: "margin-right: 5px;",
        visible: false,
        mode: DateModeEnum.DateTime
      },
      null,
      null,
      this._elementId + "_dtpDateTimeFilterDateFrom"
    );
    puma("<input id='" + this._elementId + "_dtpDateTimeFilterDateTo' />").vrAppendToPuma(divFilterDate);
    datePickerDateTimeFilterValueTo = createDatePicker(
      {
        width: 198,
        label: "e",
        labelSettings: { position: PositionEnum.Left },
        visible: false,
        mode: DateModeEnum.DateTime
      },
      null,
      null,
      this._elementId + "_dtpDateTimeFilterDateTo"
    );
    let divFilterNumber = puma("<div id='" + this._elementId + "DivFilterNumber' style='display: none;'></div>").vrAppendToPuma(divSearchIntervals);
    puma("<div id='" + this._elementId + "_ddlFilterNumberType'></div>").vrAppendToPuma(divFilterNumber);
    createComboBox(
      {
        mode: ComboBoxTypeEnum.DropDown,
        label: "Tipo di filtro",
        width: "100%",
        cssContainer: "margin-bottom: 10px;",
        items: [
          { text: "Numero maggiore di", value: String(GridNumberFilterTypeEnum.GreaterThan) },
          { text: "Numero minore di", value: String(GridNumberFilterTypeEnum.LessThan) },
          { text: "Numero uguale a", value: String(GridNumberFilterTypeEnum.EqualsTo) },
          { text: "Numero compreso tra", value: String(GridNumberFilterTypeEnum.Between) }
        ],
        onAfterChange: (e) => {
          if (numericTextBoxFilterValueTo == null)
            return;
          if (Number(e.sender.value()) == GridNumberFilterTypeEnum.Between)
            numericTextBoxFilterValueTo.show();
          else
            numericTextBoxFilterValueTo.hide();
        }
      },
      null,
      null,
      this._elementId + "_ddlFilterNumberType"
    );
    puma("<input id='" + this._elementId + "_ntbFilterNumberFrom' />").vrAppendToPuma(divFilterNumber);
    createTextBox(
      {
        mode: TextModeEnum.Numeric,
        cssContainer: "margin-right: 5px;",
        decimals: 2,
        validation: { minValue: 0 }
      },
      null,
      null,
      this._elementId + "_ntbFilterNumberFrom"
    );
    puma("<input id='" + this._elementId + "_ntbFilterNumberTo' />").vrAppendToPuma(divFilterNumber);
    numericTextBoxFilterValueTo = createTextBox(
      {
        mode: TextModeEnum.Numeric,
        label: "e",
        labelSettings: { position: PositionEnum.Left },
        visible: false,
        decimals: 2
      },
      null,
      null,
      this._elementId + "_ntbFilterNumberTo"
    );
    let divFilterString = puma("<div id='" + this._elementId + "DivFilterString' style='display: none;'></div>").vrAppendToPuma(divSearchIntervals);
    puma("<div id='" + this._elementId + "_ddlFilterStringType'></div>").vrAppendToPuma(divFilterString);
    createComboBox(
      {
        mode: ComboBoxTypeEnum.DropDown,
        label: "Tipo di filtro",
        width: "100%",
        cssContainer: "margin-bottom: 10px;",
        items: [
          { text: "Inizia con", value: String(GridStringFilterTypeEnum.StartsWith) },
          { text: "Finisce con", value: String(GridStringFilterTypeEnum.EndsWith) },
          { text: "Uguale a", value: String(GridStringFilterTypeEnum.EqualsTo) },
          { text: "Contiene", value: String(GridStringFilterTypeEnum.Includes) }
        ],
        onAfterChange: (e) => {
          if (numericTextBoxFilterValueTo == null)
            return;
          if (Number(e.sender.value()) == GridNumberFilterTypeEnum.Between)
            numericTextBoxFilterValueTo.show();
          else
            numericTextBoxFilterValueTo.hide();
        }
      },
      null,
      null,
      this._elementId + "_ddlFilterStringType"
    );
    puma("<input id='" + this._elementId + "_txtFilterStringValue' />").vrAppendToPuma(divFilterString);
    createTextBox(
      {
        width: "100%"
      },
      null,
      null,
      this._elementId + "_txtFilterStringValue"
    );
    let divSearchSpecific = div(divContainer, { css: "display: none;", class: "vrGridDivSpecificValues" });
    let divFilterSpecificValues = div(divSearchSpecific);
    let timeoutSearch = 0;
    createCheckBox({
      cssContainer: "top: 4px;",
      onCheck: (e) => {
        let allCheckboxes = Array.from(puma(this._wndFiltering.element()).find(".vrGrid_divSearchSpecificValues input"));
        for (let checkbox of allCheckboxes)
          checkbox.checked = e.checked;
        puma(e.sender.element()).removeClass("indeterminateVrCheckbox");
        let lblCheckboxSelected = this._wndFiltering.footerItem("lblCheckboxSelectedSpecificValues");
        if (e.checked)
          lblCheckboxSelected.value(allCheckboxes.length + " di " + allCheckboxes.length + " elementi");
        else
          lblCheckboxSelected.value(allCheckboxes.length + " elementi");
      }
    }, divFilterSpecificValues, null, this._elementId + "_checkAllFilterSearchSpecificValues");
    let txtFilterSpecificValues = createTextBox({
      width: "Calc(100% - 27px)",
      css: "border: solid 1px #ddd !important;",
      onKeyUp: (e) => {
        window.clearTimeout(timeoutSearch);
        timeoutSearch = window.setTimeout(() => {
          let checkboxToShowList = [];
          let checkboxToHideList = [];
          for (let checkbox of Array.from(puma(this._wndFiltering.element()).find(".vrGrid_divSearchSpecificValues input"))) {
            if (e.value != "") {
              let tag = String(JSON.parse(checkbox.getAttribute("tag")));
              if (tag.toLowerCase().indexOf(String(e.value).toLowerCase()) !== -1)
                checkboxToShowList.push(checkbox.parentElement);
              else
                checkboxToHideList.push(checkbox.parentElement);
            } else
              checkboxToShowList.push(checkbox.parentElement);
          }
          for (let checkboxToShow of checkboxToShowList) checkboxToShow.style.display = "flex";
          for (let checkboxToHide of checkboxToHideList) checkboxToHide.style.display = "none";
        }, 300);
      }
    }, divFilterSpecificValues, null, this._elementId + "_txtFilterSearchSpecificValues");
    createDatePicker({
      width: "Calc(100% - 27px)",
      css: "border: solid 1px #ddd !important;",
      onAfterChange: (e) => {
        let checkboxToShowList = [];
        let checkboxToHideList = [];
        for (let checkbox of Array.from(puma(this._wndFiltering.element()).find(".vrGrid_divSearchSpecificValues input"))) {
          if (e.value != null) {
            e.value.setHours(0, 0, 0);
            let tag = new Date(JSON.parse(checkbox.getAttribute("tag")));
            if (Date.vrEquals(tag, e.value))
              checkboxToShowList.push(checkbox.parentElement);
            else
              checkboxToHideList.push(checkbox.parentElement);
          } else
            checkboxToShowList.push(checkbox.parentElement);
        }
        for (let checkboxToShow of checkboxToShowList) checkboxToShow.style.display = "flex";
        for (let checkboxToHide of checkboxToHideList) checkboxToHide.style.display = "none";
      }
    }, divFilterSpecificValues, null, this._elementId + "_dtpFilterSearchSpecificValues");
    div(divSearchSpecific, { id: this._elementId + "_specificValues", css: "height: 300px; overflow-y: auto;" });
    this._wndFiltering.addFooterItem({
      type: WindowFooterItemTypeEnum.Label,
      value: "lblCheckboxSelectedSpecificValues",
      cssContainer: "margin-left: 10px;"
    });
  }
  openWindowFiltering(column) {
    this.createWindowFiltering();
    this._wndFiltering.open([
      { value: "ok", callback: () => this.saveWindowFiltering(column) },
      {
        value: "removeFilter",
        callback: () => {
          this._wndFiltering.close();
          this.removeFilter(column.field);
          this.recalculateHeight(true);
          switch (column.type) {
            case GridColumnTypeEnum.DateTime:
            case GridColumnTypeEnum.Time:
            case GridColumnTypeEnum.Date:
            case GridColumnTypeEnum.LongDate:
            case GridColumnTypeEnum.LongDateTime:
            case GridColumnTypeEnum.LongWeekDate:
            case GridColumnTypeEnum.ShortWeekDate:
              {
                let filterButton = ControlManager.get(this._elementId + "_DateFilter_" + column.field);
                puma(filterButton.element()).css("background-color", "#f3f3f3");
                puma(filterButton.element()).css("color", "#000");
                let filterButtonRemove = ControlManager.get(this._elementId + "_DateFilterRemove_" + column.field);
                filterButtonRemove.hide();
              }
              break;
            case GridColumnTypeEnum.Number:
            case GridColumnTypeEnum.Currency:
            case GridColumnTypeEnum.Duration:
            case GridColumnTypeEnum.Percentage:
              {
                let filterButton = ControlManager.get(this._elementId + "_NumberFilter_" + column.field);
                puma(filterButton.element()).css("background-color", "#f3f3f3");
                puma(filterButton.element()).css("color", "#000");
                let filterButtonRemove = ControlManager.get(this._elementId + "_NumberFilterRemove_" + column.field);
                filterButtonRemove.hide();
              }
              break;
            case GridColumnTypeEnum.String:
            case GridColumnTypeEnum.Label:
              {
                let filterButton = ControlManager.get(this._elementId + "_StringFilterBtn_" + column.field);
                puma(filterButton.element()).css("background-color", "#f3f3f3");
                puma(filterButton.element()).css("color", "#000");
                let filterButtonRemove = ControlManager.get(this._elementId + "_StringFilterBtnRemove_" + column.field);
                filterButtonRemove.hide();
                let textBox = ControlManager.get(this._elementId + "_StringFilter_" + column.field);
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
    let dtpFrom = ControlManager.get(this._elementId + "_dtpFilterDateFrom");
    let dtpTo = ControlManager.get(this._elementId + "_dtpFilterDateTo");
    let dtpDateTimeFrom = ControlManager.get(this._elementId + "_dtpDateTimeFilterDateFrom");
    let dtpDateTimeTo = ControlManager.get(this._elementId + "_dtpDateTimeFilterDateTo");
    let ntbFrom = ControlManager.get(this._elementId + "_ntbFilterNumberFrom");
    let ntbTo = ControlManager.get(this._elementId + "_ntbFilterNumberTo");
    let txtStringValue = ControlManager.get(this._elementId + "_txtFilterStringValue");
    let txtFilterSearchSpecificValues = ControlManager.get(this._elementId + "_txtFilterSearchSpecificValues");
    let dtpFilterSearchSpecificValues = ControlManager.get(this._elementId + "_dtpFilterSearchSpecificValues");
    switch (column.type) {
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
          switch (column.type) {
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
                let defaultDateMin = /* @__PURE__ */ new Date();
                defaultDateMin.setHours(0, 0, 0, 1);
                dtpFrom.min(defaultDateMin);
                dtpTo.min(defaultDateMin);
                let defaultDateMax = /* @__PURE__ */ new Date();
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
          switch (column.type) {
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
    this._wndFiltering.hideFooterItem("removeFilter");
    this._wndFiltering.hideFooterItem("removeFilterSeparator");
    let isSearchIntervals = true;
    if (this._dictionaryFilterConditions.has(column.field)) {
      this._wndFiltering.showFooterItem("removeFilter");
      this._wndFiltering.showFooterItem("removeFilterSeparator");
      let filterSettings = this._dictionaryFilterConditions.get(column.field);
      if (filterSettings != null) {
        if (filterSettings.dateFilterSettings != null && filterSettings.dateFilterSettings.specificValues != null && filterSettings.dateFilterSettings.specificValues.length > 0)
          isSearchIntervals = false;
        else if (filterSettings.numberFilterSettings != null && filterSettings.numberFilterSettings.specificValues != null && filterSettings.numberFilterSettings.specificValues.length > 0)
          isSearchIntervals = false;
        else if (filterSettings.stringFilterSettings != null && filterSettings.stringFilterSettings.specificValues != null && filterSettings.stringFilterSettings.specificValues.length > 0)
          isSearchIntervals = false;
      }
    }
    let items = this.originalDataSource().map((k) => {
      let text = this.formatValue(k[column.field], column.type, column.decimalDigits, column.roundingSettings, column.showSeconds, column.milesSeparator);
      let tag = k[column.field];
      if (tag != null) {
        if (column.type == GridColumnTypeEnum.Date || column.type == GridColumnTypeEnum.LongDate || column.type == GridColumnTypeEnum.LongWeekDate || column.type == GridColumnTypeEnum.ShortWeekDate) {
          let date = new Date(k[column.field]);
          date.setHours(0, 0, 0);
          tag = date;
        } else if (column.type == GridColumnTypeEnum.Time || column.type == GridColumnTypeEnum.DateTime || column.type == GridColumnTypeEnum.LongDateTime)
          tag = new Date(k[column.field]);
        else if (column.type == GridColumnTypeEnum.String || column.type == GridColumnTypeEnum.Label)
          tag = String(tag).toLowerCase();
      } else {
        text = "";
        tag = "";
      }
      return { text, value: tag, tag };
    }).vrDistinctBy((k) => k.text).vrSortAsc("tag");
    let divContent = puma("#" + this._elementId + "_specificValues")[0];
    let contentFragment = document.createDocumentFragment();
    let divRecords = document.createElement("div");
    divRecords.classList.add("vrGrid_divSearchSpecificValues");
    contentFragment.appendChild(divRecords);
    for (let data of items) {
      let divRow = document.createElement("div");
      divRecords.appendChild(divRow);
      let checkbox = document.createElement("input");
      checkbox.setAttribute("type", "checkbox");
      checkbox.classList.add("vrControls", "vrCheckBox");
      checkbox.setAttribute("tag", JSON.stringify(data.tag));
      checkbox.onclick = (e) => {
        let checkboxCheckedList = Array.from(puma(".vrGrid_divSearchSpecificValues input:checkbox:checked"));
        if (checkboxCheckedList.length == 0) {
          lblCheckboxSelected.value(items.length + " elementi");
          chkCheckAllSpecificValues.checked(false, false);
        } else {
          if (checkboxCheckedList.length == items.length)
            chkCheckAllSpecificValues.checked(true, false);
          else
            chkCheckAllSpecificValues.checked(CheckboxStateEnum.Undefined, false);
          lblCheckboxSelected.value(checkboxCheckedList.length + " di " + items.length + " elementi");
        }
      };
      divRow.appendChild(checkbox);
      let lblText = document.createElement("label");
      lblText.innerHTML = data.text;
      lblText.style.cssText += "display: block; width: 100%; user-select: none;";
      lblText.onclick = (e) => puma(checkbox).click();
      divRow.appendChild(lblText);
    }
    divContent.appendChild(contentFragment);
    let lblCheckboxSelected = this._wndFiltering.footerItem("lblCheckboxSelectedSpecificValues");
    lblCheckboxSelected.value(items.length + " elementi");
    let chkCheckAllSpecificValues = ControlManager.get(this._elementId + "_checkAllFilterSearchSpecificValues");
    let switchSearch = ControlManager.get(this._elementId + "_switchFilterSearch");
    if (isSearchIntervals) {
      switchSearch.checked(false);
      switch (column.type) {
        case GridColumnTypeEnum.DateTime:
        case GridColumnTypeEnum.Time:
        case GridColumnTypeEnum.Date:
        case GridColumnTypeEnum.LongDate:
        case GridColumnTypeEnum.LongDateTime:
        case GridColumnTypeEnum.LongWeekDate:
        case GridColumnTypeEnum.ShortWeekDate:
          {
            if (this._dictionaryFilterConditions.has(column.field)) {
              let filterSettings = this._dictionaryFilterConditions.get(column.field);
              if (filterSettings != null && filterSettings.dateFilterSettings != null) {
                let ddlType = ControlManager.get(this._elementId + "_ddlFilterDateType");
                ddlType.value(filterSettings.dateFilterSettings.filterTypeEnum, true);
                if (column.type == GridColumnTypeEnum.DateTime || column.type == GridColumnTypeEnum.LongDateTime) {
                  dtpDateTimeFrom.value(filterSettings.dateFilterSettings.dateFrom);
                  dtpDateTimeTo.value(filterSettings.dateFilterSettings.dateTo);
                } else {
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
            if (this._dictionaryFilterConditions.has(column.field)) {
              let filterSettings = this._dictionaryFilterConditions.get(column.field);
              if (filterSettings != null && filterSettings.numberFilterSettings != null) {
                let ddlType = ControlManager.get(this._elementId + "_ddlFilterNumberType");
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
            if (this._dictionaryFilterConditions.has(column.field)) {
              let filterSettings = this._dictionaryFilterConditions.get(column.field);
              if (filterSettings != null && filterSettings.stringFilterSettings != null) {
                let ddlType = ControlManager.get(this._elementId + "_ddlFilterStringType");
                ddlType.value(filterSettings.stringFilterSettings.filterTypeEnum, true);
                txtStringValue.value(filterSettings.stringFilterSettings.text);
              }
            }
          }
          break;
      }
    } else {
      switchSearch.checked(true);
      switch (column.type) {
        case GridColumnTypeEnum.DateTime:
        case GridColumnTypeEnum.Time:
        case GridColumnTypeEnum.Date:
        case GridColumnTypeEnum.LongDate:
        case GridColumnTypeEnum.LongDateTime:
        case GridColumnTypeEnum.LongWeekDate:
        case GridColumnTypeEnum.ShortWeekDate:
          {
            if (this._dictionaryFilterConditions.has(column.field)) {
              let filterSettings = this._dictionaryFilterConditions.get(column.field);
              if (filterSettings != null && filterSettings.dateFilterSettings != null && filterSettings.dateFilterSettings.specificValues != null && filterSettings.dateFilterSettings.specificValues.length > 0) {
                for (let value of filterSettings.dateFilterSettings.specificValues) {
                  for (let checkbox of Array.from(puma(this._wndFiltering.element()).find(".vrGrid_divSearchSpecificValues input"))) {
                    let tag = new Date(JSON.parse(checkbox.getAttribute("tag")));
                    if (Date.vrEquals(new Date(value), tag)) {
                      checkbox.checked = true;
                      break;
                    }
                  }
                }
                lblCheckboxSelected.value(filterSettings.dateFilterSettings.specificValues.length + " di " + items.length + " elementi");
                if (filterSettings.dateFilterSettings.specificValues.length == items.length)
                  chkCheckAllSpecificValues.checked(true, false);
                else
                  chkCheckAllSpecificValues.checked(CheckboxStateEnum.Undefined, false);
              }
            }
          }
          break;
        case GridColumnTypeEnum.Number:
        case GridColumnTypeEnum.Currency:
        case GridColumnTypeEnum.Duration:
        case GridColumnTypeEnum.Percentage:
          {
            if (this._dictionaryFilterConditions.has(column.field)) {
              let filterSettings = this._dictionaryFilterConditions.get(column.field);
              if (filterSettings != null && filterSettings.numberFilterSettings != null && filterSettings.numberFilterSettings.specificValues != null && filterSettings.numberFilterSettings.specificValues.length > 0) {
                for (let value of filterSettings.numberFilterSettings.specificValues) {
                  for (let checkbox of Array.from(puma(this._wndFiltering.element()).find(".vrGrid_divSearchSpecificValues input"))) {
                    let tag = Number(JSON.parse(checkbox.getAttribute("tag")));
                    if (UtilityManager.equals(value, tag)) {
                      checkbox.checked = true;
                      break;
                    }
                  }
                }
                lblCheckboxSelected.value(filterSettings.numberFilterSettings.specificValues.length + " di " + items.length + " elementi");
                if (filterSettings.numberFilterSettings.specificValues.length == items.length)
                  chkCheckAllSpecificValues.checked(true, false);
                else
                  chkCheckAllSpecificValues.checked(CheckboxStateEnum.Undefined, false);
              }
            }
          }
          break;
        case GridColumnTypeEnum.String:
        case GridColumnTypeEnum.Label:
          {
            if (this._dictionaryFilterConditions.has(column.field)) {
              let filterSettings = this._dictionaryFilterConditions.get(column.field);
              if (filterSettings != null && filterSettings.stringFilterSettings != null && filterSettings.stringFilterSettings.specificValues != null && filterSettings.stringFilterSettings.specificValues.length > 0) {
                for (let value of filterSettings.stringFilterSettings.specificValues) {
                  for (let checkbox of Array.from(puma(this._wndFiltering.element()).find(".vrGrid_divSearchSpecificValues input"))) {
                    let tag = String(JSON.parse(checkbox.getAttribute("tag")));
                    if (UtilityManager.equals(value, tag)) {
                      checkbox.checked = true;
                      break;
                    }
                  }
                }
                lblCheckboxSelected.value(filterSettings.stringFilterSettings.specificValues.length + " di " + items.length + " elementi");
                if (filterSettings.stringFilterSettings.specificValues.length == items.length)
                  chkCheckAllSpecificValues.checked(true, false);
                else
                  chkCheckAllSpecificValues.checked(CheckboxStateEnum.Undefined, false);
              }
            }
          }
          break;
      }
    }
  }
  saveWindowFiltering(column) {
    let options = this.getOptions();
    let filterSettings = new GridFilterSettings();
    filterSettings.type = column.type;
    let checkboxCheckedList = [];
    let checkboxAllList = [];
    let switchSearch = ControlManager.get(this._elementId + "_switchFilterSearch");
    if (!switchSearch.checked()) {
      switch (column.type) {
        case GridColumnTypeEnum.DateTime:
        case GridColumnTypeEnum.Time:
        case GridColumnTypeEnum.Date:
        case GridColumnTypeEnum.LongDate:
        case GridColumnTypeEnum.LongDateTime:
        case GridColumnTypeEnum.LongWeekDate:
        case GridColumnTypeEnum.ShortWeekDate:
          {
            let dtpFrom = ControlManager.get(this._elementId + "_dtpFilterDateFrom");
            let dtpTo = ControlManager.get(this._elementId + "_dtpFilterDateTo");
            let dtpDateTimeFrom = ControlManager.get(this._elementId + "_dtpDateTimeFilterDateFrom");
            let dtpDateTimeTo = ControlManager.get(this._elementId + "_dtpDateTimeFilterDateTo");
            if (column.type == GridColumnTypeEnum.DateTime || column.type == GridColumnTypeEnum.LongDateTime) {
              if (dtpDateTimeFrom.value() == null) {
                notifyWarning("Inserire almeno una data");
                return;
              }
            } else {
              if (dtpFrom.value() == null) {
                notifyWarning("Inserire almeno una data");
                return;
              }
            }
            let ddlType = ControlManager.get(this._elementId + "_ddlFilterDateType");
            filterSettings.dateFilterSettings = new GridDateFilterSettings();
            filterSettings.dateFilterSettings.filterTypeEnum = Number(ddlType.value());
            filterSettings.dateFilterSettings.dateFrom = column.type == GridColumnTypeEnum.DateTime || column.type == GridColumnTypeEnum.LongDateTime ? dtpDateTimeFrom.value() : dtpFrom.value();
            filterSettings.dateFilterSettings.dateTo = column.type == GridColumnTypeEnum.DateTime || column.type == GridColumnTypeEnum.LongDateTime ? dtpDateTimeTo.value() : dtpTo.value();
          }
          break;
        case GridColumnTypeEnum.Number:
        case GridColumnTypeEnum.Currency:
        case GridColumnTypeEnum.Duration:
        case GridColumnTypeEnum.Percentage:
          {
            let ntbFrom = ControlManager.get(this._elementId + "_ntbFilterNumberFrom");
            let ntbTo = ControlManager.get(this._elementId + "_ntbFilterNumberTo");
            if (ntbFrom.isEmpty()) {
              notifyWarning("Inserire almeno un numero");
              return;
            }
            let ddlType = ControlManager.get(this._elementId + "_ddlFilterNumberType");
            filterSettings.numberFilterSettings = new GridNumberFilterSettings();
            filterSettings.numberFilterSettings.filterTypeEnum = Number(ddlType.value());
            filterSettings.numberFilterSettings.numberFrom = ntbFrom.value();
            filterSettings.numberFilterSettings.numberTo = ntbTo.value() == 0 ? null : Number(ntbTo.value());
          }
          break;
        case GridColumnTypeEnum.String:
        case GridColumnTypeEnum.Label:
          {
            let txtStringValue = ControlManager.get(this._elementId + "_txtFilterStringValue");
            if (txtStringValue.isEmpty()) {
              notifyWarning("Inserire un testo");
              return;
            }
            let ddlType = ControlManager.get(this._elementId + "_ddlFilterStringType");
            filterSettings.stringFilterSettings = new GridStringFilterSettings();
            filterSettings.stringFilterSettings.filterTypeEnum = Number(ddlType.value());
            filterSettings.stringFilterSettings.text = txtStringValue.value();
          }
          break;
      }
    } else {
      checkboxCheckedList = Array.from(puma(".vrGrid_divSearchSpecificValues input:checkbox:checked"));
      checkboxAllList = Array.from(puma(this._wndFiltering.element()).find(".vrGrid_divSearchSpecificValues input"));
      let filterButton = null;
      let filterButtonRemove = null;
      switch (column.type) {
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
              filterSettings.dateFilterSettings.specificValues.push(new Date(JSON.parse(checkbox.getAttribute("tag"))));
            if (checkboxCheckedList.length == 0 || checkboxAllList.length == checkboxCheckedList.length) {
              filterButton = ControlManager.get(this._elementId + "_DateFilter_" + column.field);
              puma(filterButton.element()).css("background-color", "#f3f3f3");
              puma(filterButton.element()).css("color", "#000");
              filterButtonRemove = ControlManager.get(this._elementId + "_DateFilterRemove_" + column.field);
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
              filterSettings.numberFilterSettings.specificValues.push(Number(JSON.parse(checkbox.getAttribute("tag"))));
            if (checkboxCheckedList.length == 0 || checkboxAllList.length == checkboxCheckedList.length) {
              filterButton = ControlManager.get(this._elementId + "_NumberFilter_" + column.field);
              puma(filterButton.element()).css("background-color", "#f3f3f3");
              puma(filterButton.element()).css("color", "#000");
              filterButtonRemove = ControlManager.get(this._elementId + "_NumberFilterRemove_" + column.field);
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
              filterSettings.stringFilterSettings.specificValues.push(String(JSON.parse(checkbox.getAttribute("tag"))));
            if (checkboxCheckedList.length == 0 || checkboxAllList.length == checkboxCheckedList.length) {
              filterButton = ControlManager.get(this._elementId + "_StringFilterBtn_" + column.field);
              puma(filterButton.element()).css("background-color", "#f3f3f3");
              puma(filterButton.element()).css("color", "#000");
              filterButtonRemove = ControlManager.get(this._elementId + "_StringFilterBtnRemove_" + column.field);
              filterButtonRemove.hide();
              let textBox = ControlManager.get(this._elementId + "_StringFilter_" + column.field);
              textBox.width("Calc(100% - 27px)");
            }
          }
          break;
      }
    }
    if (switchSearch.checked() && (checkboxCheckedList.length == 0 || checkboxAllList.length == checkboxCheckedList.length))
      this.removeFilter(column.field);
    else {
      this.removeFilter(column.field, !options.serverBinding);
      this.updateFilter(column.field, filterSettings);
    }
    this._wndFiltering.close();
  }
  clearWindowFiltering() {
    ControlManager.get(this._elementId + "_ddlFilterDateType").clear();
    ControlManager.get(this._elementId + "_dtpFilterDateFrom").clear();
    ControlManager.get(this._elementId + "_dtpFilterDateTo").clear();
    ControlManager.get(this._elementId + "_dtpFilterDateTo").hide();
    ControlManager.get(this._elementId + "_dtpDateTimeFilterDateFrom").clear();
    ControlManager.get(this._elementId + "_dtpDateTimeFilterDateTo").clear();
    ControlManager.get(this._elementId + "_dtpDateTimeFilterDateFrom").hide();
    ControlManager.get(this._elementId + "_dtpDateTimeFilterDateTo").hide();
    ControlManager.get(this._elementId + "_ddlFilterNumberType").clear();
    ControlManager.get(this._elementId + "_ntbFilterNumberFrom").clear();
    ControlManager.get(this._elementId + "_ntbFilterNumberTo").clear();
    ControlManager.get(this._elementId + "_ntbFilterNumberTo").hide();
    ControlManager.get(this._elementId + "_ddlFilterStringType").clear();
    ControlManager.get(this._elementId + "_txtFilterStringValue").clear();
    puma(this._wndFiltering.element()).find(this._elementId + "_specificValues").empty();
    ControlManager.get(this._elementId + "_txtFilterSearchSpecificValues").show();
    ControlManager.get(this._elementId + "_dtpFilterSearchSpecificValues").hide();
    this._wndFiltering.footerItem("lblCheckboxSelectedSpecificValues").clear();
    ControlManager.get(this._elementId + "_checkAllFilterSearchSpecificValues").clear();
  }
  addFilter(field, filterCondition, applyFilters = true) {
    this._dictionaryFilterConditions.set(field, filterCondition);
    if (applyFilters)
      this.applyFilters();
  }
  removeFilters(fields, applyFilters = true) {
    for (let field of fields)
      this.removeFilter(field, false);
    if (applyFilters)
      this.applyFilters(true);
  }
  removeFilter(field, applyFilters = true) {
    if (this._dictionaryFilterConditions.has(field)) {
      this._dictionaryFilterConditions.delete(field);
      if (applyFilters)
        this.applyFilters(true);
    }
  }
  updateFilter(field, filterCondition, applyFilters = true) {
    this._dictionaryFilterConditions.set(field, filterCondition);
    if (applyFilters)
      this.applyFilters();
  }
  applyFilters(onOriginalDataSource = false, applyFilters = true) {
    let options = this.getOptions();
    if (options.serverBinding !== false) {
      this.pageSelected(1, false);
      if (applyFilters)
        this.rebind();
      else
        this.setDataSource(onOriginalDataSource ? this._originalDataSource : this.dataSource());
      return;
    }
    let filteredArray = onOriginalDataSource ? this._originalDataSource : this.dataSource();
    this._dictionaryFilterConditions.forEach((valueFilterSettings, columnField, dic) => {
      let column = options.columns.find((k) => k.field == columnField);
      if (column != null && column.hidden === true)
        return;
      if (valueFilterSettings.numberFilterSettings != null) {
        let filterButton = ControlManager.get(this._elementId + "_NumberFilter_" + columnField);
        puma(filterButton.element()).css("background-color", "coral");
        puma(filterButton.element()).css("color", "#FFF");
        let filterButtonRemove = ControlManager.get(this._elementId + "_NumberFilterRemove_" + columnField);
        filterButtonRemove.show();
        this.recalculateHeight(true);
        if (valueFilterSettings.numberFilterSettings.specificValues != null && valueFilterSettings.numberFilterSettings.specificValues.length > 0) {
          filteredArray = filteredArray.filter((k) => valueFilterSettings.numberFilterSettings.specificValues.includes(k[columnField]));
          filterButton.tooltip("Ricerca specifica su questi valori: " + valueFilterSettings.numberFilterSettings.specificValues.join(" - "));
        } else {
          switch (valueFilterSettings.numberFilterSettings.filterTypeEnum) {
            case GridNumberFilterTypeEnum.GreaterThan:
              filteredArray = filteredArray.filter((k) => k[columnField] > valueFilterSettings.numberFilterSettings.numberFrom);
              break;
            case GridNumberFilterTypeEnum.LessThan:
              filteredArray = filteredArray.filter((k) => k[columnField] < valueFilterSettings.numberFilterSettings.numberFrom);
              break;
            case GridNumberFilterTypeEnum.EqualsTo:
              filteredArray = filteredArray.filter((k) => k[columnField] == valueFilterSettings.numberFilterSettings.numberFrom);
              break;
            case GridNumberFilterTypeEnum.Between:
              {
                if (valueFilterSettings.numberFilterSettings.numberTo != null)
                  filteredArray = filteredArray.filter((k) => k[columnField] >= valueFilterSettings.numberFilterSettings.numberFrom && k[columnField] <= valueFilterSettings.numberFilterSettings.numberTo);
                else
                  filteredArray = filteredArray.filter((k) => k[columnField] > valueFilterSettings.numberFilterSettings.numberFrom);
              }
              break;
          }
          let valueTooltip = String(valueFilterSettings.numberFilterSettings.numberFrom);
          if (valueFilterSettings.numberFilterSettings.filterTypeEnum == GridNumberFilterTypeEnum.Between)
            valueTooltip += " e " + valueFilterSettings.numberFilterSettings.numberTo;
          let ddlType = ControlManager.get(this._elementId + "_ddlFilterNumberType");
          let type = "";
          switch (Number(ddlType.value())) {
            case GridNumberFilterTypeEnum.GreaterThan:
              type = "Maggiore di ";
              break;
            case GridNumberFilterTypeEnum.LessThan:
              type = "Minore di ";
              break;
            case GridNumberFilterTypeEnum.EqualsTo:
              type = "Uguale a ";
              break;
            case GridNumberFilterTypeEnum.Between:
              type = "Compreso tra ";
              break;
          }
          filterButton.tooltip(type + valueTooltip);
        }
      } else if (valueFilterSettings.dateFilterSettings != null) {
        let filterButton = ControlManager.get(this._elementId + "_DateFilter_" + columnField);
        puma(filterButton.element()).css("background-color", "coral");
        puma(filterButton.element()).css("color", "#FFF");
        let filterButtonRemove = ControlManager.get(this._elementId + "_DateFilterRemove_" + columnField);
        filterButtonRemove.show();
        this.recalculateHeight(true);
        if (valueFilterSettings.dateFilterSettings.specificValues != null && valueFilterSettings.dateFilterSettings.specificValues.length > 0) {
          let dateFilteredArray = [];
          for (let filterValue of filteredArray) {
            for (let specificValue of valueFilterSettings.dateFilterSettings.specificValues) {
              let date = new Date(filterValue[columnField]);
              if (column.type == GridColumnTypeEnum.Date || column.type == GridColumnTypeEnum.LongDate || column.type == GridColumnTypeEnum.LongWeekDate || column.type == GridColumnTypeEnum.ShortWeekDate)
                date.setHours(0, 0, 0);
              if (Date.vrEquals(date, specificValue))
                dateFilteredArray.push(filterValue);
            }
          }
          filteredArray = dateFilteredArray;
          let tooltipValues = [];
          let dateModeEnum = DateModeEnum.Date;
          if (column.type == GridColumnTypeEnum.Date) dateModeEnum = DateModeEnum.Date;
          else if (column.type == GridColumnTypeEnum.DateTime) dateModeEnum = DateModeEnum.DateTime;
          else if (column.type == GridColumnTypeEnum.Time) dateModeEnum = DateModeEnum.Time;
          else if (column.type == GridColumnTypeEnum.LongDate) dateModeEnum = DateModeEnum.LongDate;
          else if (column.type == GridColumnTypeEnum.LongDateTime) dateModeEnum = DateModeEnum.LongDateTime;
          else if (column.type == GridColumnTypeEnum.LongWeekDate) dateModeEnum = DateModeEnum.LongWeekDate;
          else if (column.type == GridColumnTypeEnum.ShortWeekDate) dateModeEnum = DateModeEnum.ShortWeekDate;
          tooltipValues = valueFilterSettings.dateFilterSettings.specificValues.map((k) => {
            return new Date(k).vrToItalyString(dateModeEnum, column.showSeconds);
          });
          filterButton.tooltip("Ricerca specifica su questi valori: " + tooltipValues.join(" - "));
        } else {
          let filterDateFrom = Date.vrFixDateString(valueFilterSettings.dateFilterSettings.dateFrom);
          let filterDateTo = Date.vrFixDateString(valueFilterSettings.dateFilterSettings.dateTo);
          switch (valueFilterSettings.dateFilterSettings.filterTypeEnum) {
            case GridDateFilterTypeEnum.GreaterThan:
              {
                switch (column.type) {
                  case GridColumnTypeEnum.Date:
                  case GridColumnTypeEnum.LongDate:
                  case GridColumnTypeEnum.LongWeekDate:
                  case GridColumnTypeEnum.ShortWeekDate:
                    filteredArray = filteredArray.filter((k) => Date.vrFixDateString(k[columnField]) != null && Date.vrFixDateString(k[columnField]).vrIsGreaterThan(filterDateFrom, false, false));
                    break;
                  case GridColumnTypeEnum.DateTime:
                  case GridColumnTypeEnum.LongDateTime:
                    filteredArray = filteredArray.filter((k) => Date.vrFixDateString(k[columnField]) != null && Date.vrFixDateString(k[columnField]).vrIsGreaterThan(filterDateFrom));
                    break;
                  case GridColumnTypeEnum.Time:
                    filteredArray = filteredArray.filter((k) => Date.vrFixDateString(k[columnField]) != null && (Date.vrFixDateString(k[columnField]).getHours() > filterDateFrom.getHours() || Date.vrFixDateString(k[columnField]).getHours() == filterDateFrom.getHours() && Date.vrFixDateString(k[columnField]).getMinutes() > filterDateFrom.getMinutes()));
                    break;
                }
              }
              break;
            case GridDateFilterTypeEnum.LessThan:
              {
                switch (column.type) {
                  case GridColumnTypeEnum.Date:
                  case GridColumnTypeEnum.LongDate:
                  case GridColumnTypeEnum.LongWeekDate:
                  case GridColumnTypeEnum.ShortWeekDate:
                    filteredArray = filteredArray.filter((k) => Date.vrFixDateString(k[columnField]) != null && Date.vrFixDateString(k[columnField]).vrIsLessThan(filterDateFrom, false, false));
                    break;
                  case GridColumnTypeEnum.DateTime:
                  case GridColumnTypeEnum.LongDateTime:
                    filteredArray = filteredArray.filter((k) => Date.vrFixDateString(k[columnField]) != null && Date.vrFixDateString(k[columnField]).vrIsLessThan(filterDateFrom));
                    break;
                  case GridColumnTypeEnum.Time:
                    filteredArray = filteredArray.filter((k) => Date.vrFixDateString(k[columnField]) != null && (Date.vrFixDateString(k[columnField]).getHours() < filterDateFrom.getHours() || Date.vrFixDateString(k[columnField]).getHours() == filterDateFrom.getHours() && Date.vrFixDateString(k[columnField]).getMinutes() < filterDateFrom.getMinutes()));
                    break;
                }
              }
              break;
            case GridDateFilterTypeEnum.EqualsTo:
              {
                switch (column.type) {
                  case GridColumnTypeEnum.Date:
                  case GridColumnTypeEnum.LongDate:
                  case GridColumnTypeEnum.LongWeekDate:
                  case GridColumnTypeEnum.ShortWeekDate:
                    filteredArray = filteredArray.filter((k) => Date.vrFixDateString(k[columnField]) != null && Date.vrFixDateString(k[columnField]).vrIsEqualsTo(filterDateFrom, false));
                    break;
                  case GridColumnTypeEnum.DateTime:
                  case GridColumnTypeEnum.LongDateTime:
                    filteredArray = filteredArray.filter((k) => Date.vrFixDateString(k[columnField]) != null && Date.vrFixDateString(k[columnField]).vrIsEqualsTo(filterDateFrom));
                    break;
                  case GridColumnTypeEnum.Time:
                    filteredArray = filteredArray.filter((k) => Date.vrFixDateString(k[columnField]) != null && (Date.vrFixDateString(k[columnField]).getHours() == filterDateFrom.getHours() && Date.vrFixDateString(k[columnField]).getMinutes() == filterDateFrom.getMinutes()));
                    break;
                }
              }
              break;
            case GridDateFilterTypeEnum.Between:
              {
                switch (column.type) {
                  case GridColumnTypeEnum.Date:
                  case GridColumnTypeEnum.DateTime:
                  case GridColumnTypeEnum.LongDate:
                  case GridColumnTypeEnum.LongWeekDate:
                  case GridColumnTypeEnum.ShortWeekDate:
                  case GridColumnTypeEnum.LongDateTime:
                    {
                      if (valueFilterSettings.dateFilterSettings.dateTo != null)
                        filteredArray = filteredArray.filter((k) => Date.vrFixDateString(k[columnField]) != null && Date.vrFixDateString(k[columnField]).vrIsBetween(filterDateFrom, filterDateTo));
                      else
                        filteredArray = filteredArray.filter((k) => Date.vrFixDateString(k[columnField]) != null && Date.vrFixDateString(k[columnField]).vrIsGreaterThan(filterDateFrom));
                    }
                    break;
                  case GridColumnTypeEnum.Time:
                    {
                      if (valueFilterSettings.dateFilterSettings.dateTo != null) {
                        filteredArray = filteredArray.filter((k) => Date.vrFixDateString(k[columnField]) != null && (Date.vrFixDateString(k[columnField]).getHours() > filterDateFrom.getHours() || Date.vrFixDateString(k[columnField]).getHours() == filterDateFrom.getHours() && Date.vrFixDateString(k[columnField]).getMinutes() > filterDateFrom.getMinutes()));
                        filteredArray = filteredArray.filter((k) => Date.vrFixDateString(k[columnField]) != null && (Date.vrFixDateString(k[columnField]).getHours() < filterDateTo.getHours() || Date.vrFixDateString(k[columnField]).getHours() == filterDateTo.getHours() && Date.vrFixDateString(k[columnField]).getMinutes() < filterDateTo.getMinutes()));
                      } else
                        filteredArray = filteredArray.filter((k) => Date.vrFixDateString(k[columnField]) != null && (Date.vrFixDateString(k[columnField]).getHours() > filterDateFrom.getHours() || Date.vrFixDateString(k[columnField]).getHours() == filterDateFrom.getHours() && Date.vrFixDateString(k[columnField]).getMinutes() > filterDateFrom.getMinutes()));
                    }
                    break;
                }
              }
              break;
          }
          let dateModeEnum = DateModeEnum.Date;
          if (column.type == GridColumnTypeEnum.Date) dateModeEnum = DateModeEnum.Date;
          else if (column.type == GridColumnTypeEnum.DateTime) dateModeEnum = DateModeEnum.DateTime;
          else if (column.type == GridColumnTypeEnum.Time) dateModeEnum = DateModeEnum.Time;
          else if (column.type == GridColumnTypeEnum.LongDate) dateModeEnum = DateModeEnum.LongDate;
          else if (column.type == GridColumnTypeEnum.LongDateTime) dateModeEnum = DateModeEnum.LongDateTime;
          else if (column.type == GridColumnTypeEnum.LongWeekDate) dateModeEnum = DateModeEnum.LongWeekDate;
          else if (column.type == GridColumnTypeEnum.ShortWeekDate) dateModeEnum = DateModeEnum.ShortWeekDate;
          let tooltip = Date.vrFixDateString(valueFilterSettings.dateFilterSettings.dateFrom).vrToItalyString(dateModeEnum);
          if (valueFilterSettings.dateFilterSettings.filterTypeEnum == GridDateFilterTypeEnum.Between)
            tooltip += " e " + Date.vrFixDateString(valueFilterSettings.dateFilterSettings.dateTo).vrToItalyString(dateModeEnum);
          let type = "";
          switch (valueFilterSettings.dateFilterSettings.filterTypeEnum) {
            case GridDateFilterTypeEnum.GreaterThan:
              type = "Maggiore di ";
              break;
            case GridDateFilterTypeEnum.LessThan:
              type = "Minore di ";
              break;
            case GridDateFilterTypeEnum.EqualsTo:
              type = "Uguale a ";
              break;
            case GridDateFilterTypeEnum.Between:
              type = "Compreso tra ";
              break;
          }
          filterButton.tooltip(type + tooltip);
        }
      } else if (valueFilterSettings.stringFilterSettings != null) {
        if ((valueFilterSettings.stringFilterSettings.text == null || valueFilterSettings.stringFilterSettings.text == "") && (valueFilterSettings.stringFilterSettings.specificValues == null || valueFilterSettings.stringFilterSettings.specificValues.length == 0))
          return;
        let textBox = ControlManager.get(this._elementId + "_StringFilter_" + column.field);
        let filterButton = null;
        if (valueFilterSettings.stringFilterSettings.specificValues != null && valueFilterSettings.stringFilterSettings.specificValues.length > 0 || valueFilterSettings.stringFilterSettings.filterTypeEnum != GridStringFilterTypeEnum.IncludesFromSimpleSearch) {
          filterButton = ControlManager.get(this._elementId + "_StringFilterBtn_" + columnField);
          puma(filterButton.element()).css("background-color", "coral");
          puma(filterButton.element()).css("color", "#FFF");
          let filterButtonRemove = ControlManager.get(this._elementId + "_StringFilterBtnRemove_" + columnField);
          filterButtonRemove.show();
          this.recalculateHeight(true);
          textBox.width("Calc(100% - 60px)");
        } else if (valueFilterSettings.stringFilterSettings.filterTypeEnum == GridStringFilterTypeEnum.IncludesFromSimpleSearch)
          textBox.value(valueFilterSettings.stringFilterSettings.text, false);
        if (valueFilterSettings.stringFilterSettings.specificValues != null && valueFilterSettings.stringFilterSettings.specificValues.length > 0) {
          filteredArray = filteredArray.filter((k) => k[columnField] != null && valueFilterSettings.stringFilterSettings.specificValues.map((k2) => {
            return k2.toLowerCase();
          }).includes(k[columnField].toLowerCase()));
          if (filterButton != null)
            filterButton.tooltip("Ricerca specifica su questi valori: " + valueFilterSettings.stringFilterSettings.specificValues.join(" - "));
        } else {
          let type = "";
          switch (valueFilterSettings.stringFilterSettings.filterTypeEnum) {
            case GridStringFilterTypeEnum.StartsWith:
              {
                type = "Inizia con: ";
                filteredArray = filteredArray.filter((k) => k[columnField] != null && k[columnField].toLowerCase().startsWith(valueFilterSettings.stringFilterSettings.text.toLowerCase()));
              }
              break;
            case GridStringFilterTypeEnum.EndsWith:
              {
                type = "Finisce con: ";
                filteredArray = filteredArray.filter((k) => k[columnField] != null && k[columnField].toLowerCase().endsWith(valueFilterSettings.stringFilterSettings.text.toLowerCase()));
              }
              break;
            case GridStringFilterTypeEnum.EqualsTo:
              {
                type = "Uguale a: ";
                filteredArray = filteredArray.filter((k) => k[columnField] != null && k[columnField].toLowerCase() == valueFilterSettings.stringFilterSettings.text.toLowerCase());
              }
              break;
            case GridStringFilterTypeEnum.Includes:
              {
                type = "Contiene: ";
                filteredArray = filteredArray.filter((k) => k[columnField] != null && k[columnField].toLowerCase().indexOf(valueFilterSettings.stringFilterSettings.text.toLowerCase()) !== -1);
              }
              break;
            case GridStringFilterTypeEnum.IncludesFromSimpleSearch:
              {
                type = "Contiene: ";
                filteredArray = filteredArray.filter((k) => k[columnField] != null && k[columnField].toLowerCase().indexOf(valueFilterSettings.stringFilterSettings.text.toLowerCase()) !== -1);
              }
              break;
            default:
              {
                type = "Contiene: ";
                filteredArray = filteredArray.filter((k) => k[columnField] != null && k[columnField].toLowerCase().indexOf(valueFilterSettings.stringFilterSettings.text.toLowerCase()) !== -1);
              }
              break;
          }
          if (filterButton != null)
            filterButton.tooltip(type + valueFilterSettings.stringFilterSettings.text);
        }
      } else if (valueFilterSettings.checkboxFilterSettings != null) {
        filteredArray = filteredArray.filter((k) => k[columnField] === valueFilterSettings.checkboxFilterSettings.value);
        let checkboxJq = puma("#" + this._elementId + "_CheckboxFilter_" + columnField);
        checkboxJq.removeClass("indeterminateVrCheckbox");
        let checkbox = checkboxJq[0];
        checkbox.checked = valueFilterSettings.checkboxFilterSettings.value;
      }
    });
    this.pageSelected(1, false);
    if (applyFilters) {
      this._dataSource = UtilityManager.duplicate(filteredArray);
      if (options.groupBy != null)
        this.sortingGroupFields(this.dataSource());
      this.setDataSource(this._dataSource);
    }
  }
  //#endregion
  //#region Resizing
  resizable() {
    let options = this.getOptions();
    let headerTable = puma(this._divHeader).find("table")[0];
    let tableHeight = headerTable.offsetHeight;
    let thList = Array.from(puma(headerTable).find("th"));
    if (options.lockable)
      thList.vrPushRange(Array.from(puma(this._divHeaderLocked).find("table").find("th")));
    for (let th of thList) {
      let divResizable = document.createElement("div");
      divResizable.classList.add("divResizable");
      divResizable.style.cssText += "height: " + tableHeight + "px;";
      th.appendChild(divResizable);
      this.setResizingEvents(divResizable);
    }
  }
  setResizingEvents(divResizable) {
    let pageX = null;
    let currentColumn = null;
    let currentColumnWidth = null;
    puma(divResizable).on("mousedown", (e) => {
      this._isResizing = true;
      currentColumn = e.target.parentElement;
      pageX = e.pageX;
      let padding = 0;
      if (puma(currentColumn).css("box-sizing") == "border-box")
        padding = 0;
      else {
        let padLeft = puma(currentColumn).css("padding-left");
        let padRight = puma(currentColumn).css("padding-right");
        padding = padLeft.getNumericPart() + padRight.getNumericPart();
      }
      currentColumnWidth = currentColumn.offsetWidth - padding;
    });
    puma(divResizable).on("mouseover", (e) => e.target.style.borderRight = "2px solid #0000ff");
    puma(divResizable).on("mouseout", (e) => e.target.style.borderRight = "");
    puma(this.container()).on("mousemove", (e) => {
      if (currentColumn != null && !this._isDragging) {
        let options = this.getOptions();
        let field = puma(puma(this._divHeader).find("th")[puma(currentColumn).index()]).attr("field");
        let isColumnLocked = currentColumn.getAttribute("locked") != null;
        if (isColumnLocked)
          field = puma(puma(this._divHeaderLocked).find("th")[puma(currentColumn).index()]).attr("field");
        let index = puma(currentColumn).index();
        let column = this.column(field);
        let diffX = e.pageX - pageX;
        currentColumn.style.width = currentColumnWidth + diffX + "px";
        currentColumn.removeAttribute("fitspace");
        column.width = currentColumnWidth + diffX;
        column.fitSpace = false;
        if (options.filterable) {
          let tdFilter = puma(this._divFilters).find("td")[index];
          if (isColumnLocked && tdFilter == null)
            tdFilter = puma(this._divFiltersLocked).find("td")[index];
          tdFilter.style.width = currentColumnWidth + diffX + "px";
        }
        if (this._showTotals) {
          let tdTotal = puma(this._divTotals).find("td")[index];
          if (isColumnLocked && tdTotal == null)
            tdTotal = puma(this._divTotalsLocked).find("td")[index];
          tdTotal.style.width = currentColumnWidth + diffX + "px";
        }
        let colGroupList = puma(this._divBody).find("colgroup");
        colGroupList.find("col[field='" + column.field + "']")[0].style.cssText += "width: " + (currentColumnWidth + diffX) + "px";
      }
    });
    puma(this.container()).on("mouseup", () => {
      if (currentColumn != null && this._isResizing) {
        window.setTimeout(() => {
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
  }
  //#endregion
  //#region Columns Drag&Drop
  updateColumnPositions() {
    let headerTable = puma(this._divHeader).find("table")[0];
    for (let th of Array.from(puma(headerTable).find("th"))) {
      let field = puma(th).attr("field");
      let index = this._columnOptions.findIndex((k) => k.field == field);
      let columnPosition = this._columnOptions[index];
      columnPosition.field = field;
      columnPosition.left = puma(th).offset().left;
      columnPosition.right = puma(th).offset().left + puma(th).width();
      columnPosition.index = puma(th).index();
    }
  }
  draggableColumns() {
    let options = this.getOptions();
    let headerTable = puma(this._divHeader).find("table")[0];
    for (let th of Array.from(puma(headerTable).find("th"))) {
      let field = puma(th).attr("field");
      if (field == "vrGridCheckboxColumn" || field == "editButton" || field.startsWith("groupBy"))
        continue;
      this.drag(
        th,
        {
          onDragging: (e) => {
            puma(this._divHeader).find("table th").removeClass("grid_tdDraggedOn");
            let draggingColumnPosition = this._columnOptions.find((k) => e.left >= k.left && e.left <= k.right);
            if (draggingColumnPosition == null) {
              if (e.left < this._columnOptions[0].left)
                draggingColumnPosition = this._columnOptions[0];
              else if (e.left > this._columnOptions[this._columnOptions.length - 1].right)
                draggingColumnPosition = this._columnOptions[this._columnOptions.length - 1];
            } else if (draggingColumnPosition.index !== puma(th).index()) {
              puma(th).addClass("grid_dragging");
              if (draggingColumnPosition.index < puma(th).index())
                puma(puma(this._divHeader).find("table th")[draggingColumnPosition.index]).addClass("grid_tdDraggedOn");
              else
                puma(puma(this._divHeader).find("table th")[draggingColumnPosition.index + 1]).addClass("grid_tdDraggedOn");
            }
          },
          onDragged: (e) => {
            puma(this._divHeader).find("table th").removeClass("grid_tdDraggedOn");
            puma(th).removeClass("grid_dragging");
            puma(th)[0].style.cssText += "top: 0px; left: 0px;";
            let toDragColumnPosition = this._columnOptions.find((k) => e.left >= k.left && e.left <= k.right);
            if (toDragColumnPosition == null) {
              if (e.left < this._columnOptions[0].left)
                toDragColumnPosition = this._columnOptions[0];
              else if (e.left > this._columnOptions[this._columnOptions.length - 1].right)
                toDragColumnPosition = this._columnOptions[this._columnOptions.length - 1];
            } else {
              let columnIndex = puma(th).index();
              if (toDragColumnPosition.index > columnIndex)
                puma(puma(this._divHeader).find("table th")[toDragColumnPosition.index]).vrAfterPuma(puma(this._divHeader).find("table th")[columnIndex]);
              else
                puma(puma(this._divHeader).find("table th")[toDragColumnPosition.index]).vrBeforePuma(puma(this._divHeader).find("table th")[columnIndex]);
              if (options.filterable) {
                if (toDragColumnPosition.index > columnIndex)
                  puma(puma(this._divFilters).find("table td")[toDragColumnPosition.index]).vrAfterPuma(puma(this._divFilters).find("table td")[columnIndex]);
                else
                  puma(puma(this._divFilters).find("table td")[toDragColumnPosition.index]).vrBeforePuma(puma(this._divFilters).find("table td")[columnIndex]);
              }
              if (this._showTotals) {
                if (toDragColumnPosition.index > columnIndex)
                  puma(puma(this._divTotals).find("table td")[toDragColumnPosition.index]).vrAfterPuma(puma(this._divTotals).find("table td")[columnIndex]);
                else
                  puma(puma(this._divTotals).find("table td")[toDragColumnPosition.index]).vrBeforePuma(puma(this._divTotals).find("table td")[columnIndex]);
              }
              for (let row of Array.from(puma(this._divBody).find("table tr"))) {
                let field2 = puma(th).attr("field");
                let tdJq = puma(row).find("td[field='" + field2 + "']");
                let tdJqToDrag = puma(row).find("td[field='" + toDragColumnPosition.field + "']");
                if (toDragColumnPosition.index > columnIndex)
                  tdJqToDrag.vrAfterPuma(tdJq);
                else
                  tdJqToDrag.vrBeforePuma(tdJq);
              }
              if (options.groupable) {
                if (toDragColumnPosition.index > columnIndex)
                  puma(this._divBody).find("colgroup").find("col[field='" + toDragColumnPosition.field + "']").vrAfterPuma(puma(this._divBody).find("colgroup").find("col[field='" + field + "'"));
                else
                  puma(this._divBody).find("colgroup").find("col[field='" + toDragColumnPosition.field + "']").vrBeforePuma(puma(this._divBody).find("colgroup").find("col[field='" + field + "'"));
              }
              this.updateColumnPositions();
              let column = options.columns.find((k) => k.field == field);
              let fieldToDrag = toDragColumnPosition.field;
              let columnToDrag = options.columns.find((k) => k.field == fieldToDrag);
              let indexToDrag = options.columns.indexOf(columnToDrag);
              let fromIndex = options.columns.indexOf(column);
              let tempColumn = options.columns[fromIndex];
              options.columns.splice(fromIndex, 1);
              options.columns.splice(indexToDrag, 0, tempColumn);
            }
          }
        }
      );
    }
  }
  //#region Drag column support
  drag(element, dragEvent) {
    let targetStartingXPosition = null;
    puma(element).mousedown((emd) => {
      if (this._isResizing === true)
        return;
      let startingXPosition = emd.clientX;
      let startingYPosition = emd.clientY;
      let target = puma(emd.currentTarget);
      targetStartingXPosition = target.offset().left;
      let targetStartingYPosition = target.offset().top;
      let moved = false;
      let tttt = window.setTimeout(() => targetStartingXPosition = null, 100);
      let that = this;
      function mouseMoveDrag(emm) {
        clearTimeout(tttt);
        if (targetStartingXPosition == null || that._isResizing === true)
          return;
        let actualXPosition = emm.clientX;
        let actualYPosition = emm.clientY;
        let xDiff = startingXPosition - actualXPosition;
        let yDiff = startingYPosition - actualYPosition;
        if (xDiff >= -50 && xDiff <= 50)
          return;
        if (!(emm.clientX == startingXPosition && emm.clientY == startingYPosition)) {
          let leftPosition = emm.clientX - puma(target[0]).width() / 2;
          let topPosition = targetStartingYPosition;
          target.offset({ top: topPosition, left: leftPosition });
          if (dragEvent.onDragging != null) {
            let dragEveryEvent = new DragEveryEvent();
            dragEveryEvent.left = target.position().left;
            dragEveryEvent.top = target.position().top;
            dragEveryEvent.element = puma(element)[0];
            dragEvent.onDragging(dragEveryEvent);
          }
        }
        if (Math.abs(xDiff) > Math.abs(yDiff)) {
          if (dragEvent == null && xDiff != 0)
            return;
          moved = true;
          that._isDragging = true;
        } else if (Math.abs(xDiff) < Math.abs(yDiff)) {
          if (dragEvent == null && xDiff != 0)
            return;
          moved = true;
          that._isDragging = true;
        }
      }
      puma(this.container()).on("mousemove", mouseMoveDrag);
      puma(this.container()).on("mouseup", function mouseUpDrag(e) {
        puma(that.container()).off("mouseup", mouseUpDrag);
        puma(that.container()).off("mousemove", mouseMoveDrag);
        that._isDragging = false;
        if (targetStartingXPosition == null || that._isResizing === true) {
          targetStartingXPosition = null;
          return;
        }
        if (moved && dragEvent.onDragged != null) {
          let dragEveryEvent = new DragEveryEvent();
          dragEveryEvent.left = target.position().left;
          dragEveryEvent.top = target.position().top;
          dragEveryEvent.element = puma(element)[0];
          dragEvent.onDragged(dragEveryEvent);
        }
        targetStartingXPosition = null;
      });
    });
  }
  //#endregion
  //#endregion
  //#region Sticker
  sticker(text) {
    if (text != null && text.length > 0) {
      this.showSticker();
      this._lblSticker.value(text);
    }
    return this._lblSticker;
  }
  stickerVisible(state) {
    if (state != null)
      this._lblSticker.visible(state);
    return this._lblSticker.visible();
  }
  showSticker() {
    this._lblSticker.show();
  }
  hideSticker() {
    this._lblSticker.hide();
  }
  //#endregion
  //#region Utility
  getTotals(dataItems) {
    let options = this.getOptions();
    let totals = [];
    for (let column of options.columns.filter((k) => k.aggregate != null && k.aggregate !== false)) {
      let aggregateResult = 0;
      switch (column.aggregate) {
        case GridAggregateMode.Count:
          aggregateResult = dataItems.map((k) => k[column.field]).length;
          break;
        case GridAggregateMode.Sum:
          aggregateResult = dataItems.map((k) => k[column.field]).vrSum();
          break;
        case GridAggregateMode.Average:
          {
            if (column.type == GridColumnTypeEnum.Percentage)
              aggregateResult = dataItems.map((k) => k[column.field]).vrAvg(void 0, column.countZeroInAverage) / 100;
            else
              aggregateResult = dataItems.map((k) => k[column.field]).vrAvg(void 0, column.countZeroInAverage);
          }
          break;
        case GridAggregateMode.Min:
          {
            if (column.type != null && (column.type == 5 || column.type == 6 || column.type == 7))
              aggregateResult = dataItems.map((k) => new Date(k[column.field])).vrMin();
            else
              aggregateResult = dataItems.map((k) => k[column.field]).vrMin();
          }
          break;
        case GridAggregateMode.Max:
          {
            if (column.type != null && (column.type == 5 || column.type == 6 || column.type == 7))
              aggregateResult = dataItems.map((k) => new Date(k[column.field])).vrMax();
            else
              aggregateResult = dataItems.map((k) => k[column.field]).vrMax();
          }
          break;
      }
      let total = new TotalsResult();
      total.field = column.field;
      total.total = aggregateResult;
      total.decimalDigits = column.decimalDigits;
      total.roundingSettings = column.roundingSettings;
      total.type = column.type;
      total.milesSeparator = column.milesSeparator;
      totals.push(total);
    }
    return totals;
  }
  fixDatasourceWithVrDatetime(items) {
    let newItems = [];
    if (this._vrDateTimeFields != null && this._vrDateTimeFields.length > 0) {
      for (let item of items.filter((k) => k)) {
        for (let field of this._vrDateTimeFields) {
          if (item[field] != null)
            item[field] = new DateTime(item[field]);
        }
        newItems.push(item);
      }
    } else
      newItems.vrPushRange(items);
    return newItems;
  }
  fixDatasourceWithDate(items) {
    let options = this.getOptions();
    if (options.fixDatasourceWithDate === true) {
      this._vrDateTimeFields = [];
      let dateTypes = [
        GridColumnTypeEnum.Date,
        GridColumnTypeEnum.DateTime,
        GridColumnTypeEnum.Time,
        GridColumnTypeEnum.LongDate,
        GridColumnTypeEnum.LongDateTime,
        GridColumnTypeEnum.LongWeekDate,
        GridColumnTypeEnum.ShortWeekDate
      ];
      if (options.columns.vrAny((k) => dateTypes.includes(k.type))) {
        let columnDateTypes = options.columns.filter((k) => dateTypes.includes(k.type));
        for (let column of columnDateTypes) {
          for (let row of items) {
            if (row[column.field] != null) {
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
  pageSize(pageSize, update = false, triggerDataBound = false) {
    if (pageSize != null) {
      let options = this.getOptions();
      if (pageSize === true)
        pageSize = 50;
      options.pageSize = pageSize;
      if (pageSize === false)
        this._pageSizeUnlimited = true;
      else {
        this._pageSizeUnlimited = false;
        this._actualPageSize = pageSize;
        if (options.serverBinding !== false) {
          let pageSelected = 0;
          this._serverBindingPagination.indexFrom = pageSelected * pageSize;
          this._serverBindingPagination.indexTo = this._serverBindingPagination.indexFrom + pageSize - 1;
        }
        if (update) {
          if (options.serverBinding !== false)
            this.rebind();
          else
            this.update(triggerDataBound);
        }
        let newPageSizeItem = { text: String(pageSize), value: String(pageSize), numberValue: pageSize };
        let ddlPageSize = ControlManager.get(this._elementId + "_ddlPageSize");
        if (ddlPageSize != null) {
          if (!ddlPageSize.items().vrAny((k) => k.value == String(pageSize)))
            ddlPageSize.addItem(newPageSizeItem, true, false, { field: "numberValue" });
          ddlPageSize.value(String(pageSize), false);
        }
      }
    }
    return this._actualPageSize;
  }
  pageSelected(page, update = true) {
    if (page != null) {
      let options = this.getOptions();
      if (options.footer !== false)
        puma("#" + this._divFooter.id + " button").removeClass("p-grid-pageSelected");
      let buttonSelected = document.getElementById(this._elementId + "_btnPage_" + page);
      if (buttonSelected != null)
        buttonSelected.classList.add("p-grid-pageSelected");
      if (options.onPageSelected != null) {
        let event = new GridPageSelectedEvent();
        event.sender = this;
        event.pageSelected = page;
        options.onPageSelected(event);
        if (event.isDefaultPrevented())
          return this._actualPageSelected;
      }
      this._actualPageSelected = page;
      if (update) {
        if (options.serverBinding !== false) {
          let pageSelected = this._actualPageSelected == 0 ? 0 : this._actualPageSelected - 1;
          this._serverBindingPagination.indexFrom = pageSelected * this.pageSize();
          this._serverBindingPagination.indexTo = this._serverBindingPagination.indexFrom + this.pageSize() - 1;
          window.setTimeout(() => this.rebind());
        } else
          this.update();
      }
      return page;
    }
    return this._actualPageSelected;
  }
  checkboxesMode(mode) {
    let options = this.getOptions();
    if (mode != null)
      options.checkboxes = mode;
    return options.checkboxes;
  }
  focus(field) {
    let options = this.getOptions();
    if (field != null && options.filterable)
      puma("#" + this._elementId + "_StringFilter_" + field).focus();
  }
  scrollTo(rowIndex) {
    let rowAtIndex = this.rows().find((k) => k.index == rowIndex);
    if (rowAtIndex != null) {
      let position = puma(rowAtIndex.element).position();
      puma(this._divBody).scrollTop(position.top);
    }
  }
  isRepeater() {
    return puma(this.container()).hasClass("vrRepeaterContainer");
  }
  fixValueWithoutSpecialChars(value) {
    return String(value).replace(/%/, "").replace(/ /g, "").replace(/\./g, "").replace(/-/g, "").replace(/\//g, "").replace(/&/g, "e").replace(/\(/g, "").replace(/\)/g, "").replace(/,/g, "").replace(/\[/g, "").replace(/\]/g, "").replace(/:/g, "").replace(/'/g, "").replace(/@/g, "").replace(/\s/g, "").replace(/€/g, "").replace(/∞/g, "").replace(/>/g, "").replace(/</g, "").replace(/\+/g, "").replace(/\*/g, "");
  }
  getOptions() {
    return this._internalOptions != null ? this._internalOptions : this.options();
  }
  recalculateHeightWidth() {
    this.recalculateFitSpacePercentage();
    this.recalculateHeight();
    this.recalculateWidth();
    this.recalculateHeight();
  }
  recalculateWidth() {
    let options = this.getOptions();
    let bodyJQuery = puma(this._divBody);
    let divHeaderJQuery = puma(this._divHeader);
    let divFilterJQuery = puma(this._divFilters);
    let divTotalJQuery = puma(this._divTotals);
    let bodyJQueryLocked = null;
    let divHeaderJQueryLocked = null;
    if (this.thereAreLockedColumns()) {
      bodyJQueryLocked = puma(this._divBodyLocked);
      divHeaderJQueryLocked = puma(this._divHeaderLocked);
    }
    if (bodyJQuery.css("overflow-y") == "scroll" || bodyJQuery.css("overflow-y") == "auto") {
      let minusWidth = this._divBody.scrollHeight > this._divBody.clientHeight && this._divBody.clientHeight > 0 ? 19 : 2;
      if (this.thereAreLockedColumns())
        minusWidth += puma(this._divHeaderLocked).width() + 5;
      this._divHeader.style.cssText += "width: Calc(100% - " + minusWidth + "px);";
      divHeaderJQuery.find("th[fitSpace='true']").each((index, element) => {
        element.style.cssText += "width: " + this._fitSpaceColumnPercentage + "%;";
        if (element.clientWidth == 0)
          element.style.cssText += "width: 100px;";
      });
      this._divFilters.style.cssText += "width: Calc(100% - " + minusWidth + "px);";
      divFilterJQuery.find("td[fitSpace='true']").each((index, element) => {
        element.style.cssText += "width: " + this._fitSpaceColumnPercentage + "%;";
        if (element.clientWidth == 0)
          element.style.cssText += "width: 100px;";
      });
      if (this.thereAreLockedColumns()) {
        bodyJQuery.width("Calc(100% - " + (puma(this._divHeaderLocked).width() + 5) + "px)");
        bodyJQueryLocked.width(puma(this._divHeaderLocked).width());
      } else
        this._divBody.style.cssText += "width: Calc(100% - 2px);";
      this._divTotals.style.cssText += "width: Calc(100% - " + minusWidth + "px);";
      divTotalJQuery.find("td[fitSpace='true']").each((index, element) => {
        element.style.cssText += "width: " + this._fitSpaceColumnPercentage + "%;";
        if (element.clientWidth == 0)
          element.style.cssText += "width: 100px;";
      });
      if (this._divBody.scrollHeight > this._divBody.clientHeight && this._divBody.clientHeight > 0) {
        if (divHeaderJQuery.is(":visible")) {
          this._spanFitHeaderSpace.style.cssText += "top: " + divHeaderJQuery.position().top + "px; left: " + (divHeaderJQuery.position().left + divHeaderJQuery.width()) + "px";
          puma(this._spanFitHeaderSpace).show();
        }
        if (options.filterable) {
          this._spanFitFilterSpace.style.cssText += "top: " + divFilterJQuery.position().top + "px; left: " + (divFilterJQuery.position().left + divFilterJQuery.width()) + "px";
          puma(this._spanFitFilterSpace).show();
        } else
          puma(this._spanFitFilterSpace).hide();
        if (this._showTotals && this.getAllItems().length > 0) {
          this._spanFitTotalsSpace.style.cssText += "top: " + divTotalJQuery.position().top + "px; left: " + (divTotalJQuery.position().left + divTotalJQuery.width()) + "px";
          puma(this._spanFitTotalsSpace).show();
        } else
          puma(this._spanFitTotalsSpace).hide();
      } else {
        puma(this._spanFitHeaderSpace).hide();
        puma(this._spanFitFilterSpace).hide();
        puma(this._spanFitTotalsSpace).hide();
      }
    } else {
      puma(this._spanFitHeaderSpace).hide();
      puma(this._spanFitFilterSpace).hide();
      puma(this._spanFitTotalsSpace).hide();
    }
    if (options.groupable || options.groupBy != null) {
      let i = 0;
      bodyJQuery.find("table colgroup").remove();
      let colGroup = puma("<colgroup></colgroup>").prependTo(bodyJQuery.find(">table"));
      puma(this._divHeaderContainer).show();
      divHeaderJQuery.show();
      let colFragment = document.createDocumentFragment();
      for (let column of Array.from(divHeaderJQuery.find(">table tr:first-child th"))) {
        let field = column.getAttribute("field");
        let display = "";
        if (column.offsetParent == null)
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
      if (this.thereAreLockedColumns()) {
        let i2 = 0;
        bodyJQueryLocked.find("table colgroup").remove();
        let colGroupLocked = puma("<colgroup></colgroup>").prependTo(bodyJQueryLocked.find(">table"));
        divHeaderJQueryLocked.show();
        let colLockedFragment = document.createDocumentFragment();
        for (let column of Array.from(divHeaderJQueryLocked.find(">table tr:first-child th"))) {
          let field = column.getAttribute("field");
          let display = "";
          if (column.offsetParent == null)
            display = "display: none;";
          else
            i2++;
          let width = column.offsetWidth;
          if (i2 == 1)
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
  }
  recalculateFitSpacePercentage() {
    let options = this.getOptions();
    let tableWidth = puma(this.element()).width();
    let columnsWidthOccupied = 0;
    let fitSpaceColumnsNumber = 0;
    for (let column of options.columns) {
      if (column.hidden == true)
        continue;
      if (this.thereAreLockedColumns() && column.type == GridColumnTypeEnum.EditButton)
        continue;
      if (column.fitSpace == null || column.fitSpace == false)
        columnsWidthOccupied += column.width != null ? column.width : column.type == GridColumnTypeEnum.EditButton ? 32 : 100;
      else
        fitSpaceColumnsNumber++;
    }
    let remainingSpace = tableWidth - columnsWidthOccupied;
    if (!this.thereAreLockedColumns() && options.checkboxes != GridCheckboxModeEnum.None)
      remainingSpace -= 20;
    if (options.groupBy != null && options.groupBy.fields != null)
      remainingSpace -= 20 * options.groupBy.fields.length;
    let fitSpaceColumnPercentage = 100 * (remainingSpace / fitSpaceColumnsNumber) / tableWidth;
    this._fitSpaceColumnPercentage = fitSpaceColumnPercentage;
  }
  height(height) {
    if (height != null) {
      let options = this.getOptions();
      if (typeof height == "number" && height > 0) {
        puma(this._divBody).height(height);
        puma("#" + this.element().id + "_grid_body_container").height(height);
        if (this._lblSticker != null) {
          let headerHeight = puma(this._divHeader).is(":visible") ? 34 : 0;
          let filtersHeight = options.filterable ? 30 : 0;
          let totalsheight = this._showTotals ? 25 : 0;
          puma(this._lblSticker.container()).height(puma(this._divBody).height() + headerHeight + filtersHeight + totalsheight - 1);
        }
        if (options.lockable && this._divBody != null) {
          if (this._divBody.scrollWidth > this._divBody.clientWidth && this._divBody.clientWidth > 0)
            puma(this._divBodyLocked).height(Number(height) - 17);
          else
            puma(this._divBodyLocked).height(height);
        }
      }
    }
    return puma(this._divBody).height();
  }
  recalculateHeight(afterFilter = false) {
    let options = this.getOptions();
    let headerHeight = puma(this._divHeader).is(":visible") ? 34 : 0;
    let filtersHeight = options.filterable ? 30 : 0;
    let totalsheight = this._showTotals ? 25 : 0;
    if (typeof options.height == "number" && options.height < 0 || options.height == GridHeightModeEnum.FitScreen) {
      let footerHeight = options.footer !== false ? 34 : 0;
      let toolbarHeight = options.toolbar != null ? 34 : 0;
      let diffHeaderElement = 4;
      let diffHeight = headerHeight + filtersHeight + toolbarHeight + totalsheight + footerHeight + diffHeaderElement;
      let containerOffset = puma("#" + this._elementId + "_divContainer").offset();
      let containerOffsetTop = containerOffset != null ? containerOffset.top : 0;
      let height = document.body.offsetHeight - containerOffsetTop - diffHeight + "px";
      puma(this._divBody).height(height);
      let heightContainer = document.body.offsetHeight - containerOffsetTop - diffHeight + 2 + "px";
      puma("#" + this.element().id + "_grid_body_container").height(heightContainer);
      if (options.lockable && this._divBody != null) {
        if (this._divBody.scrollWidth > this._divBody.clientWidth && this._divBody.clientWidth > 0)
          puma(this._divBodyLocked).height(height.vrGetNumericPart() - 17);
        else
          puma(this._divBodyLocked).height(height);
      }
      if (this._lblSticker != null)
        puma(this._lblSticker.container()).height(puma(this._divBody).height() + headerHeight + filtersHeight + totalsheight - 1);
    } else if (afterFilter && typeof options.height == "number") {
      if (puma(this._divFilters).height() > 32)
        puma(this._divBody).height(options.height - 58.5);
      else
        puma(this._divBody).height(options.height - 31);
      let height = puma(this._divBody).height();
      puma("#" + this.element().id + "_grid_body_container").height(height + 2);
      if (this._lblSticker != null)
        puma(this._lblSticker.container()).height(height + headerHeight + filtersHeight + totalsheight - 1);
      if (options.lockable && this._divBody != null) {
        if (this._divBody.scrollWidth > this._divBody.clientWidth && this._divBody.clientWidth > 0)
          puma(this._divBodyLocked).height(Number(puma(this._divBody).height()) - 17);
        else
          puma(this._divBodyLocked).height(puma(this._divBody).height());
      }
    }
  }
  adjustTrHeight() {
    let options = this.getOptions();
    if (this.thereAreLockedColumns()) {
      let trLockedList = Array.from(puma(this._elementLocked).find(">tbody tr"));
      let trList = Array.from(puma(this.element()).find(">tbody tr"));
      for (let i = 0; i < trLockedList.length; i++) {
        let trLocked = trLockedList[i];
        let tr = trList[i];
        let heightToSet = puma(trLocked).height() > puma(tr).height() ? puma(trLocked).height() : puma(tr).height();
        if (heightToSet < options.rowHeight)
          heightToSet = options.rowHeight;
        trLocked.style.cssText += "height: " + heightToSet + "px;";
        tr.style.cssText += "height: " + heightToSet + "px;";
      }
    }
  }
  //#region WebApi
  doWebApiCall(request, requestType, promiseCallback) {
    let that = this;
    let options = this.getOptions();
    let json = {};
    json.AuthKey = request.authKey;
    if (requestType == 0) {
      if (request.deletedValuesPropertyName == null)
        request.deletedValuesPropertyName = "itemValues";
      if (request.valuePropertyName == null)
        request.valuePropertyName = options.dataSourceFieldId;
      json[request.deletedValuesPropertyName] = this.getDeletedItemValues(request.valuePropertyName);
    } else if (requestType == 1 || requestType == 3) {
      if (requestType == 1) {
        if (request.itemsPropertyName == null)
          request.itemsPropertyName = "items";
      }
      if (options.serverBinding !== false) {
        for (const [key, value] of this._dictionaryFilterConditions.entries()) {
          if (value.dateFilterSettings != null) {
            value.dateFilterSettings.dateFrom = Date.vrConvertDateFromClient(value.dateFilterSettings.dateFrom);
            if (value.dateFilterSettings.dateTo != null)
              value.dateFilterSettings.dateTo = Date.vrConvertDateFromClient(value.dateFilterSettings.dateTo);
          }
        }
        for (const column of options.columns) {
          if (column.aggregate === true) {
            switch (column.type) {
              case GridColumnTypeEnum.Number:
                column.aggregate = GridAggregateMode.Sum;
                break;
              case GridColumnTypeEnum.Currency:
                column.aggregate = GridAggregateMode.Sum;
                break;
              case GridColumnTypeEnum.Duration:
                column.aggregate = GridAggregateMode.Sum;
                break;
              case GridColumnTypeEnum.Percentage:
                column.aggregate = GridAggregateMode.Average;
                break;
              default:
                column.aggregate = GridAggregateMode.Sum;
            }
          }
          column.aggregate = column.aggregate == null || column.aggregate === false ? GridAggregateMode.None : column.aggregate;
        }
        let gridServerBindingSettings = new VrGridServerBindingSettings();
        gridServerBindingSettings.indexFrom = this._serverBindingPagination.indexFrom;
        gridServerBindingSettings.indexTo = this._serverBindingPagination.indexTo;
        gridServerBindingSettings.pageSize = this._actualPageSize;
        gridServerBindingSettings.page = this._actualPageSelected;
        gridServerBindingSettings.columns = options.columns;
        gridServerBindingSettings.sortingInfo = this._actualSortingInfo;
        gridServerBindingSettings.filters = Dictionary.fromMap(this._dictionaryFilterConditions);
        gridServerBindingSettings.groupByFields = options.groupBy == null ? [] : options.groupBy.fields.map((k) => k.field);
        gridServerBindingSettings.excel = requestType == 3;
        if (request.fileName != null)
          gridServerBindingSettings.excelFileName = request.fileName;
        json.serverBindingSettings = gridServerBindingSettings;
      }
    } else if (requestType == 2) {
      for (let property in this._actualEditedItem) {
        let propertyValue = this._actualEditedItem[property];
        if (Object.prototype.toString.call(propertyValue) === "[object Date]")
          this._actualEditedItem[property] = Date.vrConvertDateFromClient(propertyValue);
      }
      if (request.itemPropertyName == null)
        request.itemPropertyName = "item";
      json[request.itemPropertyName] = this._actualEditedItem;
    }
    if (request.method != null) {
      if (!request.method.startsWith("/api/")) {
        if (request.method.startsWith("/"))
          request.method.substring(1);
        request.method = "/api/" + request.method;
      }
    }
    if (request.otherParameters != null) {
      let jsonParameters = Object.getOwnPropertyNames(request.otherParameters);
      for (let param of jsonParameters)
        json[param] = request.otherParameters[param];
    }
    if (request.parameters != null) {
      let parameters = request.parameters();
      let jsonParameters = Object.getOwnPropertyNames(parameters);
      for (let param of jsonParameters)
        json[param] = parameters[param];
    }
    let jsonS = JSON.stringify(json);
    let loadingElement = request.loadingElement;
    if (loadingElement == null)
      loadingElement = true;
    if (typeof loadingElement == "boolean") {
      if (loadingElement === false)
        loadingElement = void 0;
      else
        loadingElement = this.container();
    }
    if (loadingElement != null)
      showLoader(request.tempLoadingElement != null ? request.tempLoadingElement : loadingElement, true, "vrGridLoaderRebind" + this._elementId);
    request.tempLoadingElement = void 0;
    $.ajax({
      type: "POST",
      contentType: "application/json",
      data: jsonS,
      method: "POST",
      processData: false,
      dataType: "json",
      url: request.method,
      success: (response, textStatus, jqXHR) => {
        hideLoader("vrGridLoaderRebind" + this._elementId);
        that._deletedItems = [];
        if (response != null && (response.Success || response.success)) {
          let successMessage = request.successNotificationMessage;
          successMessage = successMessage == null ? false : successMessage;
          if (typeof successMessage == "string")
            successMessage = successMessage;
          else if (successMessage == true) {
            if (requestType == 0)
              successMessage = "Eliminazione avvenuta correttamente";
            else if (requestType == 2)
              successMessage = "Salvataggio effettuato correttamente";
          }
          if (typeof successMessage == "string")
            notify(successMessage);
          let rebindAfterSave = request.rebindGridAfterSave;
          rebindAfterSave = rebindAfterSave == null ? false : rebindAfterSave;
          if (rebindAfterSave && requestType != 1)
            that.rebind();
          else {
            if (requestType == 2)
              that.updateRow(that._actualEditedItem);
            else if (requestType == 4) {
              let specificItemIdListRequested = [];
              if (request.otherParameters != null)
                specificItemIdListRequested = request.otherParameters[request.specificItemIdListPropertyName];
              let specificItems = response[request.itemsPropertyName];
              if (specificItems != null && specificItems.length > 0) {
                let itemToRemoveIdList = specificItemIdListRequested.filter((k) => !specificItems.map((k2) => k2[options.dataSourceFieldId]).includes(k));
                let itemsToAddIdList = specificItems.filter((k) => !this.originalDataSource().map((j) => j[options.dataSourceFieldId]).includes(k[options.dataSourceFieldId])).map((k) => k[options.dataSourceFieldId]);
                for (let specificItem of specificItems) {
                  let specificItemId = specificItem[options.dataSourceFieldId];
                  if (itemToRemoveIdList.includes(specificItemId) || itemsToAddIdList.includes(specificItemId))
                    continue;
                  this.updateRow(specificItem, false);
                }
                for (let itemToRemoveId of itemToRemoveIdList)
                  this.deleteRow(itemToRemoveId, false);
                for (let itemToAddId of itemsToAddIdList)
                  this.addRow(specificItems.find((k) => k[options.dataSourceFieldId] == itemToAddId), false);
              } else {
                for (let itemToRemoveId of specificItemIdListRequested)
                  this.deleteRow(itemToRemoveId, false);
              }
              if (request.otherParameters["update"]) {
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
          if (request.callbackBeforeDatasourceChange != null)
            request.callbackBeforeDatasourceChange(response);
          if (requestType == 1 && response[request.itemsPropertyName] != null) {
            if (options.serverBinding !== false) {
              this._responseForServerBinding = response;
              let maxLength = this._responseForServerBinding[options.serverBinding.itemCountPropertyName];
              let pageSelected = this.pageSelected();
              let numberOfPages = Math.trunc(maxLength / Number(options.pageSize));
              if (maxLength % Number(options.pageSize) > 0)
                numberOfPages += 1;
              if (pageSelected > numberOfPages)
                this.pageSelected(1, false);
            }
            let clearFilters = request.clearFilters == null ? false : request.clearFilters;
            let newDatasource = response[request.itemsPropertyName];
            if (newDatasource.length == 0)
              this.clear(void 0, clearFilters);
            else
              that.dataSource(newDatasource, clearFilters);
          }
          if (requestType == 3 && options.serverBinding !== false) {
            let downloadUrl = response[options.serverBinding.excelDownloadUrlPropertyName];
            if (downloadUrl != null && downloadUrl.length > 0)
              location.replace(downloadUrl);
          }
          if (that._wndAutoWindow != null)
            that._wndAutoWindow.close();
          if (request.callback != null)
            request.callback(response);
          if (options.onDataSourceChanged != null)
            options.onDataSourceChanged();
          if (promiseCallback != null)
            promiseCallback(response);
        } else {
          let exception = response.Exception || response.exception;
          let exceptionCode = exception.Code || exception.code;
          if (response != null && exceptionCode == "403") {
            location.replace("/Default.aspx");
            return;
          }
          let errorMessage = request.errorNotificationMessage;
          errorMessage = errorMessage == null ? true : errorMessage;
          if (errorMessage == true || typeof errorMessage == "string")
            notifyError(typeof errorMessage == "string" ? errorMessage : response != null ? response.ExceptionMessage || response.exceptionMessage : "Errore nel salvataggio");
          let rebindAfterError = request.rebindGridAfterError;
          rebindAfterError = rebindAfterError == null ? false : rebindAfterError;
          if (rebindAfterError && requestType != 1)
            that.rebind();
          let closeWindowAfterError = request.closeWindowAfterError;
          closeWindowAfterError = closeWindowAfterError == null ? false : closeWindowAfterError;
          if (that._wndAutoWindow != null && closeWindowAfterError)
            that._wndAutoWindow.close();
          if (request.errorCallback != null)
            request.errorCallback(response != null ? response.ExceptionMessage || response.exceptionMessage : "Errore nel salvataggio");
        }
      },
      error: (response, textStatus, errorThrown) => {
        hideLoader("vrGridLoaderRebind" + this._elementId);
        let errorMessage = request.errorNotificationMessage;
        errorMessage = errorMessage == null ? true : errorMessage;
        let message = "Errore nel salvataggio";
        if (response.responseJSON != null)
          message = response.responseJSON.errorMessage != null ? response.responseJSON.errorMessage : (response.responseJSON.Message || response.responseJSON.message) + "<br />" + (response.responseJSON.ExceptionMessage || response.responseJSON.exceptionMessage);
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
        else if (response.status == 403) {
          location.replace("/Default.aspx");
          return;
        }
        let finalMessage = "Errore nel salvataggio";
        if (errorMessage == true || typeof errorMessage == "string") {
          finalMessage = errorMessage == true ? message : errorMessage;
          notifyError(finalMessage);
        }
        let rebindAfterError = request.rebindGridAfterError;
        rebindAfterError = rebindAfterError == null ? false : rebindAfterError;
        if (rebindAfterError && requestType != 1)
          that.rebind();
        let closeWindowAfterError = request.closeWindowAfterError;
        closeWindowAfterError = closeWindowAfterError == null ? false : closeWindowAfterError;
        if (that._wndAutoWindow != null && closeWindowAfterError)
          that._wndAutoWindow.close();
        if (request.errorCallback != null)
          request.errorCallback(finalMessage);
      }
    });
  }
  //#endregion
  //#endregion    
  enable(state) {
    if (state == null)
      state = true;
    puma("#" + puma(this.element()).attr("id") + "_divContainer").find(".grid_divTableDisabled").remove();
    if (state !== true) {
      let options = this.getOptions();
      let message = typeof state == "string" ? "<span>" + state + "</span>" : "";
      if (message == "" && typeof options.enable == "string")
        message = "<span>" + options.enable + "</span>";
      puma("<div class='grid_divTableDisabled'>" + message + "</div>").vrAppendToPuma("#" + puma(this.element()).attr("id") + "_divContainer");
    }
  }
  //#endregion
  //#region Toolbar
  toolbarCustomLogic(toolbarItem, toolbarClickEvent) {
    if (toolbarItem.onBeforeClick != null) {
      toolbarItem.onBeforeClick(toolbarClickEvent);
      if (toolbarClickEvent.isDefaultPrevented)
        return;
    }
    switch (toolbarItem.type) {
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
          this.deleteRows(checkedItems.map((k) => k[options.dataSourceFieldId]));
          this.clearSelection();
          let deleteRequest = toolbarItem.deleteRequest;
          if (deleteRequest != null && options.mode == GridModeEnum.Sync)
            this.doWebApiCall(
              deleteRequest,
              0
              /* Delete */
            );
          else {
            this.update();
            if (options.onDataSourceChanged != null)
              options.onDataSourceChanged();
          }
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
  excelExport(fileName = "Esportazione_excel", exportHiddenColumns = false, download = true) {
    let promise = new Promise((callback) => {
      let options = this.getOptions();
      if (options.onBeforeExcelExport != null) {
        let event = new GridBeforeExcelExportEvent();
        event.sender = this;
        event.fileName = fileName;
        event.exportHiddenColumns = exportHiddenColumns;
        options.onBeforeExcelExport(event);
        if (event.isDefaultPrevented())
          return;
      }
      if (!options.serverBinding)
        showLoader(this.container(), true, "vrGridLoaderExcel" + this._elementId);
      window.setTimeout(() => {
        if (!options.serverBinding) {
          let headerRow = new GridExcelRow();
          headerRow.cells = [];
          for (let column of options.columns) {
            if (column.exportable !== true && (!exportHiddenColumns && column.hidden == true && (options.groupBy == null || options.groupBy.fields != null && !options.groupBy.fields.map((k) => k.field).includes(column.field)) || column.type == GridColumnTypeEnum.EditButton || column.type == GridColumnTypeEnum.Image || column.type == GridColumnTypeEnum.Button || column.type == GridColumnTypeEnum.Icon || column.exportable === false))
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
          let contentRows = [];
          this.fixDatasourceWithDate(this.dataSource());
          for (let item of this.dataSource()) {
            let contentRow = new GridExcelRow();
            contentRow.cells = [];
            for (let column of options.columns) {
              if (column.exportable !== true && (!exportHiddenColumns && column.hidden == true && (options.groupBy == null || options.groupBy.fields != null && !options.groupBy.fields.map((k) => k.field).includes(column.field)) || column.type == GridColumnTypeEnum.EditButton || column.type == GridColumnTypeEnum.Image || column.type == GridColumnTypeEnum.Button || column.type == GridColumnTypeEnum.Icon || column.exportable === false))
                continue;
              let textHTML = item[column.field] == null ? "" : String(item[column.field]);
              let textAlign = GridAlignEnum.Left;
              switch (column.type) {
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
                    let dateModeEnum = DateModeEnum.Date;
                    if (column.type == GridColumnTypeEnum.Date) dateModeEnum = DateModeEnum.Date;
                    else if (column.type == GridColumnTypeEnum.DateTime) dateModeEnum = DateModeEnum.DateTime;
                    else if (column.type == GridColumnTypeEnum.Time) dateModeEnum = DateModeEnum.Time;
                    else if (column.type == GridColumnTypeEnum.LongDate) dateModeEnum = DateModeEnum.LongDate;
                    else if (column.type == GridColumnTypeEnum.LongDateTime) dateModeEnum = DateModeEnum.LongDateTime;
                    else if (column.type == GridColumnTypeEnum.LongWeekDate) dateModeEnum = DateModeEnum.LongWeekDate;
                    else if (column.type == GridColumnTypeEnum.ShortWeekDate) dateModeEnum = DateModeEnum.ShortWeekDate;
                    textHTML = textHTML == "" ? "" : new Date(new Date(textHTML)).vrToItalyString(dateModeEnum, column.showSeconds);
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
                    if (column.customSettings != null) {
                      try {
                        let settings = column.customSettings({ dataItem: item, field: column.field, sender: this });
                        if (settings && settings.template !== "" && textHTML == "")
                          textHTML = settings.template;
                      } catch (e) {
                      }
                    } else
                      textHTML = puma(textHTML).text();
                  }
                  break;
                //#endregion
                //#region Label
                case GridColumnTypeEnum.Label:
                  {
                    textAlign = GridAlignEnum.Center;
                    if (column.labelSettings != null) {
                      try {
                        let settings = column.labelSettings({ dataItem: item, field: column.field, sender: this });
                        textHTML = settings.text == null ? "" : settings.text;
                      } catch (e) {
                      }
                    } else
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
                    textHTML = item[column.field] == true ? "true" : "false";
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
                    let itemValue = item[column.displayField];
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
              }
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
              excelCell.roundingSettings = column.roundingSettings != null ? column.roundingSettings : options.roundingSettings;
              excelCell.hidden = column.hidden;
              excelCell.locked = column.locked;
              if (column.aggregate === true) {
                switch (column.type) {
                  case GridColumnTypeEnum.Number:
                    column.aggregate = GridAggregateMode.Sum;
                    break;
                  case GridColumnTypeEnum.Currency:
                    column.aggregate = GridAggregateMode.Sum;
                    break;
                  case GridColumnTypeEnum.Duration:
                    column.aggregate = GridAggregateMode.Sum;
                    break;
                  case GridColumnTypeEnum.Percentage:
                    column.aggregate = GridAggregateMode.Average;
                    break;
                  default:
                    column.aggregate = GridAggregateMode.Sum;
                }
              }
              excelCell.aggregate = column.aggregate == null || column.aggregate === false ? GridAggregateMode.None : column.aggregate;
              let backgroundColor = "";
              let color = "";
              if (column.cellSettings != null) {
                if (column.cellSettings.backgroundColor != null)
                  backgroundColor = column.cellSettings.backgroundColor;
                if (column.cellSettings.color != null)
                  color = column.cellSettings.color;
              }
              if (options.rowColorProperty != null && item[options.rowColorProperty] != null && item[options.rowColorProperty] !== "")
                backgroundColor = item[options.rowColorProperty];
              excelCell.backgroundColor = backgroundColor;
              excelCell.color = color;
              contentRow.cells.push(excelCell);
            }
            contentRows.push(contentRow);
          }
          let footerRow = new GridExcelRow();
          footerRow.cells = [];
          for (let td of Array.from(puma(this._divTotals).find("td"))) {
            let field = puma(td).attr("field");
            if (field == null)
              continue;
            let column = options.columns.find((k) => k.field == field);
            if (column == null || column != null && column.exportable !== true) {
              if (column == null || !exportHiddenColumns && column.hidden == true && (options.groupBy == null || options.groupBy.fields != null && !options.groupBy.fields.map((k) => k.field).includes(column.field)) || column.type == GridColumnTypeEnum.EditButton || column.type == GridColumnTypeEnum.Image || column.type == GridColumnTypeEnum.Button || column.type == GridColumnTypeEnum.Icon || column.exportable === false)
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
            excelCell.roundingSettings = column.roundingSettings != null ? column.roundingSettings : options.roundingSettings;
            excelCell.hidden = column.hidden;
            excelCell.locked = column.locked;
            if (column.aggregate === true) {
              switch (column.type) {
                case GridColumnTypeEnum.Number:
                  column.aggregate = GridAggregateMode.Sum;
                  break;
                case GridColumnTypeEnum.Currency:
                  column.aggregate = GridAggregateMode.Sum;
                  break;
                case GridColumnTypeEnum.Duration:
                  column.aggregate = GridAggregateMode.Sum;
                  break;
                case GridColumnTypeEnum.Percentage:
                  column.aggregate = GridAggregateMode.Average;
                  break;
                default:
                  column.aggregate = GridAggregateMode.Sum;
              }
            }
            excelCell.aggregate = column.aggregate == null || column.aggregate === false ? GridAggregateMode.None : column.aggregate;
            footerRow.cells.push(excelCell);
          }
          if (options.excel != null && options.excel.fileName != null) fileName = options.excel.fileName;
          let generateExcelRequest = new GenerateExcelRequest();
          generateExcelRequest.headerRow = headerRow;
          generateExcelRequest.contentRows = contentRows;
          generateExcelRequest.footerRow = footerRow;
          generateExcelRequest.excelFileName = fileName;
          generateExcelRequest.AuthKey = "10(P9m+U3a@Mtt-Oeo";
          generateExcelRequest.exportHiddenColumns = exportHiddenColumns;
          if (options.groupBy != null) {
            let groupByFields = options.groupBy.fields;
            generateExcelRequest.groupBy = groupByFields;
          }
          if (download) {
            let jsonString = JSON.stringify(generateExcelRequest);
            let formDataMultipart = null;
            formDataMultipart = new FormData();
            formDataMultipart.append("file", new Blob([jsonString], { type: "application/json" }));
            $.ajax(
              {
                type: "POST",
                beforeSend: (xhr) => {
                  xhr.setRequestHeader("Accept-Language", "it");
                  xhr.setRequestHeader("AuthKey", "10(P9m+U3a@Mtt-Oeo");
                },
                contentType: false,
                data: formDataMultipart,
                method: "POST",
                processData: false,
                dataType: "JSON",
                url: "/api/UtilityWebApi/GenerateExcel",
                success: (response, textStatus, jqXHR) => {
                  hideLoader("vrGridLoaderExcel" + this._elementId);
                  if (options.onAfterExcelExport != null) {
                    let event = new GridAfterExcelExportEvent();
                    event.sender = this;
                    event.headerRow = headerRow;
                    event.contentRows = contentRows;
                    event.footerRow = footerRow;
                    event.excelFileName = fileName;
                    event.exportHiddenColumns = exportHiddenColumns;
                    if (options.groupBy != null) {
                      let groupByFields = options.groupBy.fields;
                      event.groupBy = groupByFields != null ? groupByFields.map((k) => k.field) : null;
                    }
                    options.onAfterExcelExport(event);
                    if (event.isDefaultPrevented())
                      return;
                  }
                  if (response.downloadUrl != null && response.downloadUrl.length > 0)
                    location.replace(response.downloadUrl);
                  if (!response.Success)
                    notifyError(response.ErrorMessage);
                },
                error: (response, textStatus, errorThrown) => {
                  hideLoader();
                  alert("Errore nell'esportazione Excel. Contattare l'assistenza. <br /><br />" + response);
                }
              }
            );
          } else
            hideLoader("vrGridLoaderExcel" + this._elementId);
          let excelExportPromise = new ExcelExportPromise();
          excelExportPromise.fileName = fileName;
          excelExportPromise.headerRow = headerRow;
          excelExportPromise.contentRows = contentRows;
          excelExportPromise.footerRow = footerRow;
          if (options.groupBy != null)
            excelExportPromise.groupByFields = options.groupBy.fields;
          callback(excelExportPromise);
        } else {
          if (options.excel != null) {
            if (options.excel.fileName == null) options.excel.fileName = fileName;
            this.doWebApiCall(
              options.excel,
              3
              /* Excel */
            );
          }
        }
      }, 200);
    });
    return promise;
  }
  //#endregion
  //#region Footer
  visibleFooter(state) {
    if (state != null) {
      if (state) puma(this._divFooter).show();
      else puma(this._divFooter).hide();
    }
    return puma(this._divFooter).is(":visible");
  }
  showFooter() {
    this.visibleFooter(true);
  }
  hideFooter() {
    this.visibleFooter(false);
  }
  footer() {
    return this._divFooter;
  }
  //#endregion
  //#region Toolbar
  visibleToolbar(state) {
    if (state != null) {
      if (state) puma(this._divToolbar).show();
      else puma(this._divToolbar).hide();
    }
    return puma(this._divToolbar).is(":visible");
  }
  showToolbar() {
    this.visibleToolbar(true);
  }
  hideToolbar() {
    this.visibleToolbar(false);
  }
  toolbar() {
    return this._divToolbar;
  }
  toolbarItem(value) {
    return ControlManager.get("grid-" + value + "_" + this._elementId);
  }
  visibleToolbarItem(value, state) {
    let toolbarItem = this.toolbarItem(value);
    if (toolbarItem != null) {
      if (state != null)
        toolbarItem.visible(state);
      return toolbarItem.visible();
    }
    return false;
  }
  showToolbarItem(value) {
    let toolbarItem = this.toolbarItem(value);
    if (toolbarItem != null)
      toolbarItem.show();
  }
  hideToolbarItem(value) {
    let toolbarItem = this.toolbarItem(value);
    if (toolbarItem != null)
      toolbarItem.hide();
  }
  enabledToolbarItem(value, state) {
    let toolbarItem = this.toolbarItem(value);
    if (toolbarItem != null) {
      if (state != null)
        toolbarItem.enabled(state);
      return toolbarItem.enabled();
    }
    return false;
  }
  enableToolbarItem(value) {
    let toolbarItem = this.toolbarItem(value);
    if (toolbarItem != null)
      toolbarItem.enable();
  }
  disableToolbarItem(value) {
    let toolbarItem = this.toolbarItem(value);
    if (toolbarItem != null)
      toolbarItem.disable();
  }
  removeToolbarItem(value) {
    let toolbarItem = this.toolbarItem(value);
    if (toolbarItem != null)
      puma(toolbarItem.container()).remove();
  }
  addToolbarItems(toolbarItems) {
    for (let toolbarItem of toolbarItems)
      this.addToolbarItem(toolbarItem);
  }
  addToolbarItem(toolbarItem) {
    if (toolbarItem.visible == null) toolbarItem.visible = true;
    if (toolbarItem.type == null) toolbarItem.type = GridToolbarItemType.Custom;
    let text = "";
    let iconClass = void 0;
    let buttonClass = "";
    let enabled = toolbarItem.enable;
    let vrButton = false;
    if (toolbarItem.css == null) toolbarItem.css = "";
    if (toolbarItem.cssContainer == null) toolbarItem.cssContainer = "";
    let toolbarItemValue = toolbarItem.value == null ? toolbarItem.text != null ? toolbarItem.text.replace(/[^a-z0-9\s]/gi, "").replace(/[_\s]/g, "") : "noValue" : toolbarItem.value;
    switch (toolbarItem.type) {
      case GridToolbarItemType.Add:
        {
          text = toolbarItem.text != null ? toolbarItem.text : "Aggiungi";
          iconClass = toolbarItem.icon != null ? toolbarItem.icon : IconClassicLight.Plus;
          buttonClass = toolbarItem.value != null ? "grid-" + toolbarItem.value : "grid-add";
          vrButton = true;
        }
        break;
      case GridToolbarItemType.Custom:
        {
          text = toolbarItem.text != null ? toolbarItem.text : "";
          iconClass = toolbarItem.icon != null ? toolbarItem.icon : void 0;
          buttonClass = "grid-" + toolbarItemValue;
          vrButton = true;
        }
        break;
      case GridToolbarItemType.SplitButton:
        {
          text = toolbarItem.text != null ? toolbarItem.text : "";
          iconClass = toolbarItem.icon != null ? toolbarItem.icon : void 0;
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
          text = toolbarItem.text != null ? toolbarItem.text : "Elimina";
          iconClass = toolbarItem.icon != null ? toolbarItem.icon : IconClassicRegular.Xmark;
          buttonClass = toolbarItem.value != null ? "grid-" + toolbarItem.value : "grid-delete";
          vrButton = true;
        }
        break;
      case GridToolbarItemType.Excel:
        {
          text = toolbarItem.text != null ? toolbarItem.text : "Excel";
          iconClass = toolbarItem.icon != null ? toolbarItem.icon : IconClassicLight.FileExcel;
          buttonClass = toolbarItem.value != null ? "grid-" + toolbarItem.value : "grid-excel";
          vrButton = true;
          toolbarItem.backgroundColor = "#008a00";
          toolbarItem.textColor = "#FFF";
        }
        break;
      case GridToolbarItemType.ExcelWithHiddenColumns:
        {
          text = toolbarItem.text != null ? toolbarItem.text : "Excel";
          iconClass = toolbarItem.icon != null ? toolbarItem.icon : IconClassicLight.FileExcel;
          buttonClass = toolbarItem.value != null ? "grid-" + toolbarItem.value : "grid-excelHiddenColumns";
          vrButton = true;
          toolbarItem.backgroundColor = "#008a00";
          toolbarItem.textColor = "#FFF";
        }
        break;
      case GridToolbarItemType.Separator:
        {
          buttonClass = toolbarItem.value != null ? "grid-" + toolbarItem.value : "grid-separator";
          enabled = false;
          vrButton = true;
        }
        break;
      case GridToolbarItemType.Rebind:
        {
          text = toolbarItem.text != null ? toolbarItem.text : "Aggiorna";
          iconClass = toolbarItem.icon != null ? toolbarItem.icon : IconClassicLight.Refresh;
          buttonClass = toolbarItem.value != null ? "grid-" + toolbarItem.value : "grid-rebind";
          vrButton = true;
        }
        break;
    }
    if (vrButton) {
      createButton(
        {
          icon: iconClass,
          imageUrl: toolbarItem.imageUrl,
          enable: enabled,
          text,
          colorSettings: { background: toolbarItem.backgroundColor, textColor: toolbarItem.textColor },
          visible: toolbarItem.visible,
          cssContainer: toolbarItem.cssContainer,
          css: toolbarItem.css,
          mode: toolbarItem.primary === true ? ButtonModeEnum.Primary : void 0,
          classContainer: "grid-toolbarItemsContainer " + (toolbarItem.classContainer != null ? toolbarItem.classContainer : ""),
          class: (toolbarItem.type == GridToolbarItemType.Separator ? "grid-separator" : "") + " grid-toolbarItems " + buttonClass,
          badgeSettings: toolbarItem.badge,
          onClick: (e) => {
            if (toolbarItem.type == GridToolbarItemType.Delete) {
              let checkedValues = this.getCheckedValues();
              if (checkedValues.length == 0) {
                notifyWarning("Selezionare almeno una riga per proseguire");
                return;
              } else {
                if (toolbarItem.confirmationMessage == null) {
                  if (checkedValues.length == 1) toolbarItem.confirmationMessage = "Proseguendo, verrà eliminato l'elemento selezionato. Continuare?";
                  else if (checkedValues.length > 1) toolbarItem.confirmationMessage = "Proseguendo, verranno eliminati gli elementi selezionati. Continuare?";
                }
              }
            }
            let toolbarClickEvent = new GridToolbarClickEvent();
            toolbarClickEvent.sender = e.sender;
            toolbarClickEvent.type = toolbarItem.type;
            if (toolbarItem.confirmationMessage != null && toolbarItem.confirmationMessage.length > 0) {
              confirm(toolbarItem.confirmationMessage).then(() => {
                this.toolbarCustomLogic(toolbarItem, toolbarClickEvent);
              });
            } else
              this.toolbarCustomLogic(toolbarItem, toolbarClickEvent);
          }
        },
        this._divToolbar,
        null,
        buttonClass + "_" + this._elementId
      );
    } else {
      if (toolbarItem.type == GridToolbarItemType.SplitButton) {
        let value = toolbarItem.value != null ? toolbarItem.value : "splitButton";
        if (toolbarItem.value == null && toolbarItem.text != null)
          value = toolbarItem.text.replace(/[^a-z0-9\s]/gi, "").replace(/[_\s]/g, "") + "splitButton";
        if (toolbarItem.splitButtonOptions == null) toolbarItem.splitButtonOptions = new SplitButtonOptions();
        if (toolbarItem.splitButtonItems != null) toolbarItem.splitButtonOptions.items = toolbarItem.splitButtonItems;
        if (toolbarItem.splitButtonOptions.separator == null) toolbarItem.splitButtonOptions.separator = false;
        let itemClass = "grid-" + value;
        createSplitButton(
          {
            text,
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
            classContainer: "grid-toolbarItemsContainer " + (toolbarItem.classContainer != null ? toolbarItem.classContainer : ""),
            class: "grid-toolbarItems grid-splitButton " + itemClass,
            onSelect: (e) => {
              if (toolbarItem.splitButtonOptions.onSelect != null)
                toolbarItem.splitButtonOptions?.onSelect(e);
            },
            onClick: toolbarItem.onClick == null ? void 0 : (e) => {
              let toolbarClickEvent = new GridToolbarClickEvent();
              toolbarClickEvent.sender = e.sender;
              toolbarClickEvent.type = toolbarItem.type;
              if (toolbarItem.confirmationMessage != null && toolbarItem.confirmationMessage.length > 0) {
                confirm(toolbarItem.confirmationMessage).then(() => {
                  this.toolbarCustomLogic(toolbarItem, toolbarClickEvent);
                });
              } else
                this.toolbarCustomLogic(toolbarItem, toolbarClickEvent);
            }
          },
          this._divToolbar,
          null,
          itemClass + "_" + this._elementId
        );
      }
      if (toolbarItem.type == GridToolbarItemType.ButtonGroup) {
        let itemClass = "grid-" + (toolbarItem.value != null ? toolbarItem.value : "buttonGroup");
        createButtonGroup(
          {
            enable: enabled,
            selectionMode: SelectionModeEnum.Single,
            items: toolbarItem.buttonGroupItems,
            visible: toolbarItem.visible,
            cssContainer: "top: -1px; " + toolbarItem.cssContainer,
            css: toolbarItem.css,
            classContainer: "grid-toolbarItemsContainer " + toolbarItem.classContainer,
            class: "grid-toolbarItems grid-buttonGroup " + itemClass,
            width: "auto",
            onSelect: (e) => {
              let toolbarClickEvent = new GridToolbarClickEvent();
              toolbarClickEvent.sender = e.sender;
              toolbarClickEvent.type = toolbarItem.type;
              if (toolbarItem.confirmationMessage != null && toolbarItem.confirmationMessage.length > 0) {
                confirm(toolbarItem.confirmationMessage).then(() => {
                  this.toolbarCustomLogic(toolbarItem, toolbarClickEvent);
                });
              } else
                this.toolbarCustomLogic(toolbarItem, toolbarClickEvent);
            }
          },
          this._divToolbar,
          null,
          itemClass + "_" + this._elementId
        );
      }
      if (toolbarItem.type == GridToolbarItemType.CheckBox) {
        let itemClass = "grid-" + (toolbarItem.value != null ? toolbarItem.value : "checkbox");
        createCheckBox(
          {
            enable: enabled,
            text: toolbarItem.text,
            visible: toolbarItem.visible,
            cssContainer: "top: 3px; " + toolbarItem.cssContainer,
            css: toolbarItem.css,
            classContainer: "grid-toolbarItemsContainer " + toolbarItem.classContainer,
            class: "grid-toolbarItems grid-checkBox " + itemClass,
            onCheck: (e) => {
              let toolbarClickEvent = new GridToolbarClickEvent();
              toolbarClickEvent.sender = e.sender;
              toolbarClickEvent.type = toolbarItem.type;
              if (toolbarItem.confirmationMessage != null && toolbarItem.confirmationMessage.length > 0) {
                confirm(toolbarItem.confirmationMessage).then(() => {
                  this.toolbarCustomLogic(toolbarItem, toolbarClickEvent);
                });
              } else
                this.toolbarCustomLogic(toolbarItem, toolbarClickEvent);
            }
          },
          this._divToolbar,
          null,
          itemClass + "_" + this._elementId
        );
      }
      if (toolbarItem.type == GridToolbarItemType.Label) {
        let itemClass = "grid-" + (toolbarItem.value != null ? toolbarItem.value : "label");
        createLabel(
          {
            enable: enabled,
            text: toolbarItem.text,
            visible: toolbarItem.visible,
            cssContainer: toolbarItem.cssContainer,
            css: toolbarItem.css,
            classContainer: "grid-toolbarItemsContainer " + toolbarItem.classContainer,
            class: "grid-toolbarItems grid-label " + itemClass,
            colorSettings: {
              background: toolbarItem.backgroundColor,
              textColor: toolbarItem.textColor
            },
            onClick: (e) => {
              let toolbarClickEvent = new GridToolbarClickEvent();
              toolbarClickEvent.sender = e.sender;
              toolbarClickEvent.type = toolbarItem.type;
              if (toolbarItem.confirmationMessage != null && toolbarItem.confirmationMessage.length > 0) {
                confirm(toolbarItem.confirmationMessage).then(() => {
                  this.toolbarCustomLogic(toolbarItem, toolbarClickEvent);
                });
              } else
                this.toolbarCustomLogic(toolbarItem, toolbarClickEvent);
            }
          },
          this._divToolbar,
          null,
          itemClass + "_" + this._elementId
        );
      }
      if (toolbarItem.type == GridToolbarItemType.ComboBox) {
        let itemClass = "grid-" + (toolbarItem.value != null ? toolbarItem.value : "comboBox");
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
      if (toolbarItem.type == GridToolbarItemType.DatePicker) {
        let itemClass = "grid-" + (toolbarItem.value != null ? toolbarItem.value : "datePicker");
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
      if (toolbarItem.type == GridToolbarItemType.TextBox) {
        let itemClass = "grid-" + (toolbarItem.value != null ? toolbarItem.value : "textBox");
        if (toolbarItem.textBoxOptions == null) toolbarItem.textBoxOptions = new TextBoxOptions();
        toolbarItem.textBoxOptions.classContainer = "grid-toolbarItemsContainer " + toolbarItem.textBoxOptions.classContainer;
        toolbarItem.textBoxOptions.class = "grid-toolbarItems grid-textBox " + itemClass + " " + toolbarItem.textBoxOptions.class;
        if (toolbarItem.textBoxOptions.visible == null) toolbarItem.textBoxOptions.visible = toolbarItem.visible;
        if (toolbarItem.textBoxOptions.css == null) toolbarItem.textBoxOptions.css = toolbarItem.css;
        if (toolbarItem.textBoxOptions.cssContainer == null) toolbarItem.textBoxOptions.cssContainer = toolbarItem.cssContainer;
        toolbarItem.textBoxOptions.cssContainer += "top: -1px; " + toolbarItem.textBoxOptions.cssContainer;
        if (toolbarItem.textBoxOptions.enable == null) toolbarItem.textBoxOptions.enable = enabled;
        createTextBox(toolbarItem.textBoxOptions, this._divToolbar, null, itemClass + "_" + this._elementId);
      } else if (toolbarItem.type == GridToolbarItemType.Switch) {
        if (toolbarItem.switchSettings == null) {
          toolbarItem.switchSettings = new GridToolbarSwitchSettings();
          toolbarItem.switchSettings.labelOff = "";
          toolbarItem.switchSettings.labelOn = "";
        }
        if (toolbarItem.switchSettings.checked == null) toolbarItem.switchSettings.checked = false;
        let itemClass = "grid-" + (toolbarItem.value != null ? toolbarItem.value : "switch");
        puma(this._divToolbar).vrAppendPuma("<div id='" + itemClass + "_" + this._elementId + "' class='grid-toolbarItems-switch'></div>");
        createSwitch(
          {
            labelOff: toolbarItem.switchSettings.labelOff,
            labelOn: toolbarItem.switchSettings.labelOn,
            checked: toolbarItem.switchSettings.checked,
            cssContainer: "top: -2px; " + toolbarItem.cssContainer,
            css: toolbarItem.css,
            classContainer: "grid-toolbarItemsContainer " + toolbarItem.classContainer,
            visible: toolbarItem.visible,
            enable: enabled,
            onChange: (e) => {
              if (toolbarItem.switchSettings.onCheck != null) {
                let tableSwitchEvent = new GridToolbarSwitchEvent();
                tableSwitchEvent.checked = e.checked;
                toolbarItem.switchSettings.onCheck(tableSwitchEvent);
              }
            }
          },
          null,
          null,
          itemClass + "_" + this._elementId
        );
      }
    }
  }
  //#endregion
  //#endregion
  //#region Auto Window
  createAutoWindow() {
    if (this._wndAutoWindow != null)
      return;
    let options = this.getOptions();
    if (options.autoWindowSettings == null)
      options.autoWindowSettings = new GridAutoWindowSettings();
    if (options.autoWindowSettings.options == null)
      options.autoWindowSettings.options = new GridAutoWindowOption();
    if (options.autoWindowSettings.options.width == null) options.autoWindowSettings.options.width = 400;
    if (options.autoWindowSettings.options.titleNew == null) options.autoWindowSettings.options.titleNew = "Nuovo";
    if (options.autoWindowSettings.options.titleEdit == null) options.autoWindowSettings.options.titleEdit = "Modifica";
    this._wndAutoWindow = createWindow(
      {
        addToControlList: false,
        classContainer: this.element().id + "_wndUtility",
        width: options.autoWindowSettings.options.width,
        height: options.autoWindowSettings.options.height,
        title: options.autoWindowSettings.options.titleNew,
        onBeforeClose: (e) => {
          if (options.autoWindowSettings.onBeforeClose != null) {
            let event = new AutowindowBeforeCloseEvent();
            event.sender = this;
            event.window = this._wndAutoWindow;
            event.dataItem = this._actualEditedItem;
            event.columns = options.columns;
            options.autoWindowSettings.onBeforeClose(event);
            if (event.isDefaultPrevented())
              return;
          }
        },
        onClose: (e) => {
          puma(this._wndAutoWindow.container()).remove();
          this._wndAutoWindow = null;
          if (options.autoWindowSettings.onAfterClose != null) {
            let event = new AutowindowAfterCloseEvent();
            event.sender = this;
            event.window = this._wndAutoWindow;
            event.dataItem = this._actualEditedItem;
            event.columns = options.columns;
            options.autoWindowSettings.onAfterClose(event);
            if (event.isDefaultPrevented())
              return;
          }
          this._actualEditedItem = null;
        },
        footer: [
          {
            type: WindowFooterItemTypeEnum.Close
          },
          {
            type: WindowFooterItemTypeEnum.Ok,
            onClick: (e) => {
              if (options.autoWindowSettings.options.confirmationMessage != null && options.autoWindowSettings.options.confirmationMessage.length > 0) {
                confirm(options.autoWindowSettings.options.confirmationMessage).then(() => {
                  this.saveAutoWindow();
                });
              } else
                this.saveAutoWindow();
            }
          }
        ]
      }
    );
    puma(this._wndAutoWindow.element()).addClass("grid_autoWindow");
    this.createControlsAutoWindow(options);
  }
  createControlsAutoWindow(options) {
    let columnsOrdered = [];
    let autoWindowId = this._wndAutoWindow.element().id;
    for (let column of options.columns.slice(1).reverse()) {
      if (column.hidden)
        continue;
      if (column.type == GridColumnTypeEnum.Checkbox || column.type == GridColumnTypeEnum.Boolean)
        columnsOrdered.unshift(column);
      else
        columnsOrdered.push(column);
    }
    for (let column of columnsOrdered.reverse()) {
      let label = column.title == null ? column.field : column.title;
      let tooltip = column.cellSettings != null && column.cellSettings.tooltip != null ? column.cellSettings.tooltip : void 0;
      if (tooltip === true)
        tooltip = label;
      else if (tooltip === false)
        tooltip = void 0;
      else if (typeof tooltip == "function")
        tooltip = void 0;
      switch (column.type) {
        //#region CheckBox
        case GridColumnTypeEnum.Checkbox:
        case GridColumnTypeEnum.Boolean:
          {
            let checkBox = createCheckBox(
              {
                label,
                tooltip
              },
              autoWindowId,
              null,
              this._elementId + "_checkBox_" + column.field
            );
            puma(checkBox.element()).parent().css("margin-top", "10px");
            puma(checkBox.element()).parent().css("display", "inline-block");
            puma(checkBox.element()).parent().css("margin-right", "5px");
          }
          break;
        //#endregion
        //#region String
        case GridColumnTypeEnum.String:
          {
            createTextBox(
              {
                label,
                width: "100%",
                tooltip
              },
              autoWindowId,
              null,
              this._elementId + "_textBox_" + column.field
            );
          }
          break;
        //#endregion
        //#region Password
        case GridColumnTypeEnum.PasswordViewable:
          {
            createTextBox({
              label,
              width: "100%",
              mode: TextModeEnum.PasswordViewable,
              tooltip
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
            createDatePicker(
              {
                label,
                width: "100%",
                tooltip
              },
              autoWindowId,
              null,
              this._elementId + "_datePicker_" + column.field
            );
          }
          break;
        case GridColumnTypeEnum.DateTime:
        case GridColumnTypeEnum.LongDateTime:
          {
            createDatePicker(
              {
                mode: DateModeEnum.DateTime,
                label,
                width: "100%",
                tooltip
              },
              autoWindowId,
              null,
              this._elementId + "_dateTimePicker_" + column.field
            );
          }
          break;
        case GridColumnTypeEnum.Time:
          {
            createDatePicker(
              {
                mode: DateModeEnum.Time,
                label,
                width: "100%",
                tooltip
              },
              autoWindowId,
              null,
              this._elementId + "_timePicker_" + column.field
            );
          }
          break;
        //#endregion
        //#region ComboBox, DropDownList, DropDownTree
        case GridColumnTypeEnum.DropDownList:
          {
            if (column.dataItems == null)
              throw new Error("Property 'dataItems' of column '" + column.field + "' is null; please, consider to fill it with an array of dropDownListItem[]");
            createComboBox(
              {
                mode: ComboBoxTypeEnum.DropDown,
                label,
                width: "100%",
                items: column.dataItems,
                nullable: column.ddlNullable,
                clearButton: column.ddlNullable,
                tooltip,
                filter: column.filterable
              },
              autoWindowId,
              null,
              this._elementId + "_dropDownList_" + column.field
            );
          }
          break;
        case GridColumnTypeEnum.DropDownTree:
        case GridColumnTypeEnum.DropDownTreeCheckboxes:
          {
            if (column.dataItems == null)
              throw new Error("Property 'dataItems' of column '" + column.field + "' is null; please, consider to fill it with an array of dropDownTreeItem[]");
            for (let item of column.dataItems) {
              if (item.expanded == null)
                item.expanded = true;
            }
            createComboBox(
              {
                label,
                width: "100%",
                items: column.dataItems,
                checkboxes: column.type == GridColumnTypeEnum.DropDownTreeCheckboxes,
                clearButton: column.ddlNullable,
                tooltip,
                filter: column.filterable
              },
              autoWindowId,
              null,
              this._elementId + "_dropDownTree_" + column.field
            );
          }
          break;
        case GridColumnTypeEnum.ComboBox:
          {
            if (column.dataItems == null)
              throw new Error("Property 'dataItems' of column '" + column.field + "' is null; please, consider to fill it with an array of comboBoxItem[]");
            createComboBox(
              {
                label,
                width: "100%",
                items: column.dataItems,
                tooltip,
                clearButton: column.ddlNullable,
                filter: column.filterable
              },
              autoWindowId,
              null,
              this._elementId + "_comboBox_" + column.field
            );
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
            createTextBox(
              {
                label,
                width: "100%",
                mode: type,
                tooltip,
                roundingSettings: column.roundingSettings != null ? column.roundingSettings : options.roundingSettings
              },
              autoWindowId,
              null,
              this._elementId + "_numericTextBox_" + column.field
            );
          }
          break;
        //#endregion
        //#region Color
        case GridColumnTypeEnum.Color:
          {
            createColorPicker({
              label,
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
            let iconItems = [];
            for (let value of Object.values(IconClassicLight))
              iconItems.push({ text: value, value });
            let comboIcons = createComboBox({
              label,
              width: "100%",
              cssContainer: "margin-right: 5px;",
              items: iconItems,
              tooltip,
              clearButton: true,
              placeholder: "Scrivi per cercare un'icona...",
              template: (e) => {
                return "<i class='" + e.dataItem.value + "'></i>";
              },
              onAfterOpen: (e) => comboIcons.text(""),
              onAfterChange: (e) => {
                comboIcons.text("");
                if (e.value == null) comboIcons.icon(IconClassicLight.Pumo);
                else comboIcons.icon(e.value);
              },
              icon: IconClassicLight.Pumo
            }, autoWindowId, null, this._elementId + "_comboIcons_" + column.field);
          }
          break;
      }
    }
  }
  openAutoWindow(dataItem) {
    let options = this.getOptions();
    if (options.autoWindowSettings != null || !options.hideEditButton)
      this.createAutoWindow();
    if (this._wndAutoWindow == null)
      return;
    if (options.autoWindowSettings.onBeforeOpen != null) {
      let event = new AutowindowBeforeOpenEvent();
      event.sender = this;
      event.window = this._wndAutoWindow;
      event.dataItem = dataItem;
      event.columns = options.columns;
      options.autoWindowSettings.onBeforeOpen(event);
      if (event.isDefaultPrevented())
        return;
    }
    let title = dataItem != null ? options.autoWindowSettings.options.titleEdit : options.autoWindowSettings.options.titleNew;
    this._wndAutoWindow.title(title);
    this._wndAutoWindow.open();
    if (options.autoWindowSettings.options.height == null) {
      puma(this._wndAutoWindow.element()).css("height", "auto");
      puma(this._wndAutoWindow.element()).parent().css("height", "auto");
      this._wndAutoWindow.center();
      puma(this._wndAutoWindow.element()).css("overflow-y", "auto");
    }
    if (options.autoWindowSettings.onAfterOpen != null) {
      let event = new AutowindowAfterOpenEvent();
      event.sender = this;
      event.window = this._wndAutoWindow;
      event.dataItem = dataItem;
      event.columns = options.columns;
      options.autoWindowSettings.onAfterOpen(event);
      if (event.isDefaultPrevented())
        return;
    }
    let index = 0;
    this._actualEditedItem = dataItem;
    for (let column of options.columns.slice(1)) {
      if (column.hidden && !column.editable)
        continue;
      let columnValue = dataItem != null ? dataItem[column.field] : null;
      switch (column.type) {
        //#region CheckBox
        case GridColumnTypeEnum.Checkbox:
        case GridColumnTypeEnum.Boolean:
          {
            let checkBox = ControlManager.get(this._elementId + "_checkBox_" + column.field);
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
            let textBox = ControlManager.get(this._elementId + "_textBox_" + column.field);
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
            let textBox = ControlManager.get(this._elementId + "_textBox_" + column.field);
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
            let datePicker = ControlManager.get(this._elementId + "_datePicker_" + column.field);
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
            let dateTimePicker = ControlManager.get(this._elementId + "_dateTimePicker_" + column.field);
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
            let timePicker = ControlManager.get(this._elementId + "_timePicker_" + column.field);
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
            let dropDownList = ControlManager.get(this._elementId + "_dropDownList_" + column.field);
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
            let dropDownTree = ControlManager.get(this._elementId + "_dropDownTree_" + column.field);
            dropDownTree.clearItems();
            dropDownTree.items(column.dataItems);
            if (columnValue != null) {
              let value = this._actualEditedItem[column.field];
              if (typeof value === "string")
                value = value.split(",");
              else if (!Array.isArray(value))
                value = [value];
              dropDownTree.value(value);
            } else if (column.defaultValue != null) {
              let value = column.defaultValue;
              if (typeof value === "string")
                value = value.split(",");
              else if (!Array.isArray(value))
                value = [value];
              dropDownTree.value(typeof value === "string" ? value.split(",") : [value]);
            }
            if (column.editable == false)
              dropDownTree.enabled(false);
            else
              dropDownTree.enabled(true);
          }
          break;
        case GridColumnTypeEnum.ComboBox:
          {
            let comboBox = ControlManager.get(this._elementId + "_comboBox_" + column.field);
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
            let numericTextBox = ControlManager.get(this._elementId + "_numericTextBox_" + column.field);
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
            let colorPicker = ControlManager.get(this._elementId + "_colorPicker_" + column.field);
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
            let comboIcons = ControlManager.get(this._elementId + "_comboIcons_" + column.field);
            comboIcons.clear();
            if (columnValue != null)
              comboIcons.value(columnValue);
            else if (column.defaultValue != null)
              comboIcons.value(column.defaultValue);
            comboIcons.icon(comboIcons.value());
            if (column.editable == false || column.editable == null) {
              comboIcons.enabled(false);
              comboIcons.hide();
            } else
              comboIcons.enabled(true);
          }
          break;
      }
      index++;
    }
  }
  saveAutoWindow() {
    let options = this.getOptions();
    if (this._actualEditedItem == null)
      this._actualEditedItem = {};
    let oldItem = jQuery.extend(true, {}, this._actualEditedItem);
    for (let column of options.columns.slice(1)) {
      if (column.hidden)
        continue;
      switch (column.type) {
        //#region CheckBox
        case GridColumnTypeEnum.Checkbox:
        case GridColumnTypeEnum.Boolean:
          {
            let checkBox = ControlManager.get(this._elementId + "_checkBox_" + column.field);
            this._actualEditedItem[column.field] = checkBox.checked();
          }
          break;
        //#endregion
        //#region String
        case GridColumnTypeEnum.String:
          {
            let textBox = ControlManager.get(this._elementId + "_textBox_" + column.field);
            this._actualEditedItem[column.field] = textBox.value();
          }
          break;
        //#endregion
        //#region Password
        case GridColumnTypeEnum.PasswordViewable:
          {
            let txtPassword = ControlManager.get(this._elementId + "_textBox_" + column.field);
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
            let datePicker = ControlManager.get(this._elementId + "_datePicker_" + column.field);
            this._actualEditedItem[column.field] = datePicker.value();
          }
          break;
        case GridColumnTypeEnum.DateTime:
        case GridColumnTypeEnum.LongDateTime:
          {
            let dateTimePicker = ControlManager.get(this._elementId + "_dateTimePicker_" + column.field);
            this._actualEditedItem[column.field] = dateTimePicker.value();
          }
          break;
        case GridColumnTypeEnum.Time:
          {
            let timePicker = ControlManager.get(this._elementId + "_timePicker_" + column.field);
            this._actualEditedItem[column.field] = timePicker.value();
          }
          break;
        //#endregion
        //#region ComboBox, DropDownList, DropDownTree
        case GridColumnTypeEnum.DropDownList:
          {
            let dropDownList = ControlManager.get(this._elementId + "_dropDownList_" + column.field);
            this._actualEditedItem[column.field] = dropDownList.value();
            this._actualEditedItem[column.displayField] = dropDownList.text();
          }
          break;
        case GridColumnTypeEnum.DropDownTree:
          {
            let dropDownTree = ControlManager.get(this._elementId + "_dropDownTree_" + column.field);
            this._actualEditedItem[column.field] = dropDownTree.value();
            this._actualEditedItem[column.displayField] = dropDownTree.text();
          }
          break;
        case GridColumnTypeEnum.DropDownTreeCheckboxes:
          {
            let dropDownTree = ControlManager.get(this._elementId + "_dropDownTree_" + column.field);
            this._actualEditedItem[column.field] = dropDownTree.getCheckedValues();
            this._actualEditedItem[column.displayField] = dropDownTree.getCheckedItems().map((k) => k.text).vrToCommaSeparatedList();
          }
          break;
        case GridColumnTypeEnum.ComboBox:
          {
            let comboBox = ControlManager.get(this._elementId + "_comboBox_" + column.field);
            this._actualEditedItem[column.field] = comboBox.value();
            this._actualEditedItem[column.displayField] = comboBox.text();
          }
          break;
        //#endregion
        //#region Number, Currency, Percentage, Duration
        case GridColumnTypeEnum.Number:
        case GridColumnTypeEnum.Currency:
        case GridColumnTypeEnum.Percentage:
        case GridColumnTypeEnum.Duration:
          {
            let numericTextBox = ControlManager.get(this._elementId + "_numericTextBox_" + column.field);
            this._actualEditedItem[column.field] = numericTextBox.value();
          }
          break;
        //#endregion
        //#region Color
        case GridColumnTypeEnum.Color:
          {
            let colorPicker = ControlManager.get(this._elementId + "_colorPicker_" + column.field);
            this._actualEditedItem[column.field] = colorPicker.value();
          }
          break;
        //#endregion
        //#region Icon
        case GridColumnTypeEnum.Icon:
          {
            let comboIcons = ControlManager.get(this._elementId + "_comboIcons_" + column.field);
            this._actualEditedItem[column.field] = comboIcons.value();
            this._actualEditedItem[column.displayField] = comboIcons.text();
          }
          break;
      }
    }
    if (options.autoWindowSettings.onBeforeSave != null) {
      let event = new AutowindowBeforeSaveEvent();
      event.sender = this;
      event.window = this._wndAutoWindow;
      event.dataItem = this._actualEditedItem;
      event.columns = options.columns;
      options.autoWindowSettings.onBeforeSave(event);
      if (event.isDefaultPrevented())
        return;
    }
    let saveRequest = options.autoWindowSettings.save;
    if (saveRequest != null) {
      if (options.mode == GridModeEnum.Sync)
        this.doWebApiCall(
          saveRequest,
          2
          /* Save */
        );
      else {
        if (saveRequest.callback != null)
          saveRequest.callback({ actualItem: this._actualEditedItem, oldItem });
        this._wndAutoWindow.close();
      }
    } else {
      if (options.columns.vrAny((k) => k != null && k.type == GridColumnTypeEnum.Percentage && k.ignoreFactor != true)) {
        for (let property of Object.getOwnPropertyNames(this._actualEditedItem)) {
          let column = options.columns.find((k) => k.field == property);
          if (column != null && column.type == GridColumnTypeEnum.Percentage && column.ignoreFactor != true)
            this._actualEditedItem[property] *= 100;
        }
      }
      this.updateRow(this._actualEditedItem);
      if (options.autoWindowSettings.onAfterSave != null) {
        let event = new AutowindowAfterSaveEvent();
        event.sender = this;
        event.window = this._wndAutoWindow;
        event.dataItem = this._actualEditedItem;
        event.columns = options.columns;
        options.autoWindowSettings.onAfterSave(event);
        if (event.isDefaultPrevented())
          return;
      }
      this._wndAutoWindow.close();
      if (options.onDataSourceChanged != null)
        options.onDataSourceChanged();
    }
  }
  //#endregion
  //#region Layout
  createWindowLayout() {
    if (this._wndLayout != null)
      return;
    let options = this.getOptions();
    if (typeof options.layoutSettings === "boolean")
      return;
    this._wndLayout = createWindow(
      {
        addToControlList: false,
        width: 500,
        height: 300,
        title: "Gestisci layout",
        classContainer: this.element().id + "_wndUtility",
        onClose: (e) => {
          puma(this._wndLayout.container()).remove();
          this._wndLayout = null;
        },
        footer: [
          { type: WindowFooterItemTypeEnum.Close },
          {
            type: WindowFooterItemTypeEnum.Custom,
            text: "Layout base",
            mode: ButtonModeEnum.Primary,
            align: WindowFooterItemAlignEnum.Left,
            onClick: (e) => {
              this._actualLayout = null;
              this.changeLayout(true, this._originalOptionsForLayout);
            }
          },
          {
            type: WindowFooterItemTypeEnum.Custom,
            text: "Carica",
            mode: ButtonModeEnum.Primary,
            onClick: (e) => {
              let checkedItems = this._grdLayout.getCheckedItems();
              if (checkedItems.length == 0) {
                notifyWarning("Selezionare almeno un layout");
                return;
              }
              let checkedItem = checkedItems[0];
              if (this._actualLayout == null || this._actualLayout != null && checkedItem.id != this._actualLayout.id)
                this.loadLayout(checkedItem.layoutName);
            }
          }
        ]
      }
    );
    puma(this._wndLayout.element()).vrAppendPuma("<div id='" + this._elementId + "_divWindowLayoutContainer' class='vrContainer'></div>");
    let divContainer = puma("#" + this._elementId + "_divWindowLayoutContainer")[0];
    puma("<table id='" + this._elementId + "_tblLayout'></table>").vrAppendToPuma(divContainer);
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
        rebind: {
          //**********************TODO//**********************
          authKey: "10(P9m+U3a@Mtt-Oeo",
          method: "/api/GridLayoutPersisterWebApi/GetLayoutList",
          itemsPropertyName: "tableLayoutList",
          parameters: () => {
            let options2 = this.getOptions();
            if (typeof options2.layoutSettings === "boolean")
              return;
            return { pageName: window.location.href, gridName: options2.layoutSettings.name };
          },
          callback: (response) => {
            if (this._actualLayout != null)
              this.selectRowInternal(String(this._actualLayout.id), false, { fromCheckboxInput: false, fromGroupOrRow: true, fromMethodCall: false, shiftKey: false });
          }
        },
        autoWindowSettings: {
          save: {
            authKey: "10(P9m+U3a@Mtt-Oeo",
            method: "/api/GridLayoutPersisterWebApi/EditLayout",
            rebindGridAfterSave: true
          }
        },
        toolbar: [
          {
            type: GridToolbarItemType.Custom,
            icon: IconClassicRegular.Xmark,
            text: "Elimina",
            confirmationMessage: "Confermi di voler eliminare questo layout?",
            onClick: (e) => {
              let checkedItem = this._grdLayout.getCheckedItems()[0];
              this._grdLayout.deleteRow(checkedItem.id);
              let loadOriginalLayout = this._actualLayout != null && checkedItem.id == this._actualLayout.id;
              this.clearLayout(checkedItem.layoutName, loadOriginalLayout);
              if (this._grdLayout.getAllItems().length == 0) {
                ControlManager.get(this._elementId + "_spbSettings").hideItem("manageLayout");
                window.setTimeout(() => this._wndLayout.close(), 300);
              }
            }
          },
          {
            type: GridToolbarItemType.Custom,
            icon: IconClassicLight.Plus,
            text: "Crea nuovo",
            onClick: (e) => {
              prompt("Assegna un nome a questo layout", { title: "Nuovo layout" }).then((value) => {
                this.saveLayout(value, () => this._grdLayout.rebind());
              });
            }
          }
        ],
        columns: [
          { type: GridColumnTypeEnum.String, title: "Nome", field: "layoutName", fitSpace: true },
          {
            type: GridColumnTypeEnum.DateTime,
            title: "Ultima modifica",
            field: "layoutLastEditDate",
            width: 200,
            editable: false,
            headerSettings: { textAlign: GridAlignEnum.Center }
          }
        ]
      },
      null,
      null,
      this._elementId + "_tblLayout"
    );
  }
  openWindowLayout() {
    this.createWindowLayout();
    this._wndLayout.open();
    this._grdLayout.rebind();
  }
  doWebApiCallLayout(layoutOperationType, request, callBack) {
    let url = "";
    switch (layoutOperationType) {
      case 0:
        url = "/api/GridLayoutPersisterWebApi/SaveLayout";
        break;
      case 1:
        url = "/api/GridLayoutPersisterWebApi/LoadLayout";
        break;
      case 2:
        url = "/api/GridLayoutPersisterWebApi/ClearLayout";
        break;
      case 3:
        url = "/api/GridLayoutPersisterWebApi/GetLayoutList";
        break;
    }
    request.AuthKey = "10(P9m+U3a@Mtt-Oeo";
    $.ajax({
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(request),
      method: "POST",
      processData: false,
      async: !(layoutOperationType == 3),
      dataType: "json",
      url,
      success: function(response, textStatus, jqXHR) {
        if (callBack != null)
          callBack(response);
      }
    });
  }
  //#region SaveLayout
  saveLayout(layoutName, callBack) {
    let options = this.getOptions();
    if (typeof options.layoutSettings === "boolean")
      return;
    if (layoutName == "") {
      notify("Inserire un nome del layout");
      return;
    }
    let layoutJson = new GridLayoutStructure();
    layoutJson.filterConditions = Array.from(this._dictionaryFilterConditions.entries());
    if (options.groupBy != null) {
      if (options.groupBy.fields != null) {
        layoutJson.groupBy = new GridGroupBySettings();
        layoutJson.groupBy.fields = options.groupBy.fields;
        layoutJson.groupBy.internalSortBy = options.groupBy.internalSortBy;
        layoutJson.groupBy.sortBy = options.groupBy.sortBy;
      }
    }
    layoutJson.pageSize = typeof options.pageSize == "boolean" || this._pageSizeUnlimited ? 50 : options.pageSize;
    layoutJson.sortingInfo = this._actualSortingInfo;
    let index = 0;
    let layoutColumns = [];
    for (let column of options.columns) {
      let layoutColumn = new GridLayoutColumn();
      layoutColumn.field = column.field;
      layoutColumn.fitSpace = column.fitSpace;
      layoutColumn.hidden = column.hidden;
      layoutColumn.locked = column.locked;
      layoutColumn.index = index;
      let width = column.width != null ? column.width : column.type == GridColumnTypeEnum.EditButton ? 32 : 100;
      layoutColumn.width = width;
      layoutColumns.push(layoutColumn);
      index++;
    }
    layoutJson.columns = layoutColumns;
    let saveLayoutRequest = new SaveLayoutRequest();
    saveLayoutRequest.layoutJson = JSON.stringify(layoutJson);
    saveLayoutRequest.pageName = window.location.href;
    saveLayoutRequest.gridName = options.layoutSettings.name;
    saveLayoutRequest.layoutName = layoutName;
    this.doWebApiCallLayout(0, saveLayoutRequest, (response) => {
      if (this._actualLayout == null) {
        ControlManager.get(this._elementId + "_spbSettings").showItem("manageLayout");
        let topSettingsBtnPosition = 0;
        if (options.groupable) topSettingsBtnPosition = -127;
        else topSettingsBtnPosition = -95;
        puma(`<style>.vrContainer .grid_spbSettings .k-animation-container
					{
						top: ` + topSettingsBtnPosition + `px !important;
					}</style>`).vrAppendToPuma("head");
      }
      if (saveLayoutRequest.layoutPropertyName == null)
        saveLayoutRequest.layoutPropertyName = "tableLayout";
      this._actualLayout = response[saveLayoutRequest.layoutPropertyName];
      notify("Layout salvato correttamente");
      if (callBack != null)
        callBack();
    });
  }
  //#endregion
  //#region ClearLayout
  clearLayout(layoutName, updateDataSource = false) {
    let options = this.getOptions();
    if (typeof options.layoutSettings === "boolean")
      return;
    let clearLayoutRequest = new ClearLayoutRequest();
    clearLayoutRequest.pageName = window.location.href;
    clearLayoutRequest.gridName = options.layoutSettings.name;
    clearLayoutRequest.layoutName = layoutName;
    this.doWebApiCallLayout(2, clearLayoutRequest, (response) => {
      if (updateDataSource) {
        this._actualLayout = null;
        this.changeLayout(true, this._originalOptionsForLayout);
      }
    });
  }
  //#endregion
  //#region LoadLayout
  customLayouts() {
    return this._customLayouts;
  }
  activeLayout() {
    return this._actualLayout;
  }
  loadLayout(layoutName) {
    let options = this.getOptions();
    if (typeof options.layoutSettings === "boolean")
      return;
    let loadLayoutRequest = new LoadLayoutRequest();
    loadLayoutRequest.pageName = window.location.href;
    loadLayoutRequest.gridName = options.layoutSettings.name;
    loadLayoutRequest.layoutName = layoutName;
    this.doWebApiCallLayout(1, loadLayoutRequest, (response) => {
      if (response.tableLayout != null && response.tableLayout.layoutJson != null) {
        this._actualLayout = response.tableLayout;
        this.changeLayout(true);
        notify("Layout caricato correttamente");
        this._wndLayout.close();
      } else
        notify("Errore nel caricamento del layout");
    });
  }
  changeLayout(updateDataSource = false, layoutJson) {
    if (this._actualLayout != null || layoutJson != null) {
      let options = this.getOptions();
      let json = layoutJson != null ? layoutJson : JSON.parse(this._actualLayout.layoutJson);
      let editButtonColumnIndex = json.columns.findIndex((k) => k.field.toLowerCase() == "editbutton");
      let editButtonColumn = json.columns[editButtonColumnIndex];
      if (editButtonColumn != null)
        editButtonColumn.field = "editButton";
      if (options.groupable && options.groupBy != null) {
        let oldGroupByList = [];
        if (options.groupBy.fields != null) {
          for (let group of options.groupBy.fields.map((k) => k.field))
            oldGroupByList.push(group);
        }
        for (let groupRemoved of oldGroupByList)
          this.removeGroup(groupRemoved, false);
      }
      if (json.groupBy != null) {
        let groupByFields = [];
        if (Array.isArray(json.groupBy)) {
          for (let groupByField of json.groupBy)
            groupByFields.push({ field: UtilityManager.duplicate(groupByField) });
          options.groupBy = new GridGroupBySettings();
          options.groupBy.fields = UtilityManager.duplicate(groupByFields);
        } else {
          groupByFields = UtilityManager.duplicate(json.groupBy.fields);
          options.groupBy = UtilityManager.duplicate(json.groupBy);
        }
        if (groupByFields != null)
          this.addGroups(groupByFields, updateDataSource);
      }
      if (json.pageSize != null) {
        if (typeof json.pageSize == "boolean")
          options.pageSize = 50;
        else if (typeof json.pageSize == "number")
          options.pageSize = json.pageSize;
        else
          options.pageSize = json.pageSize.value == null ? 50 : json.pageSize.value;
        if (updateDataSource) {
          let ddlPageSize = ControlManager.get(this._elementId + "_ddlPageSize");
          if (!ddlPageSize.items().map((k) => k.value).includes(String(options.pageSize))) {
            let items = ddlPageSize.items();
            items.push({ text: String(options.pageSize), value: String(options.pageSize) });
            ddlPageSize.items(items);
          }
          ddlPageSize.value(String(options.pageSize), true);
        }
      }
      this.clearFilters(false);
      if (json.filterConditions != null && json.filterConditions.length > 0) {
        let dictionaryFilterConditions = /* @__PURE__ */ new Map();
        for (let filterCondition of json.filterConditions)
          dictionaryFilterConditions.set(filterCondition[0], filterCondition[1]);
        this._dictionaryFilterConditions = dictionaryFilterConditions;
      }
      this.removeSort(false);
      if (json.sortingInfo != null)
        this._actualSortingInfo = json.sortingInfo;
      if (json.columns != null) {
        for (let jsonColumn of json.columns) {
          let optionsColumn = options.columns.find((k) => k.field == jsonColumn.field);
          if (optionsColumn != null) {
            let optionsColumnIndex = options.columns.indexOf(optionsColumn);
            options.columns[optionsColumnIndex].index = jsonColumn.index;
            if (jsonColumn.fitSpace !== true)
              options.columns[optionsColumnIndex].width = jsonColumn.width;
            if (jsonColumn.fitSpace !== true) {
              let thHeader = puma(this._divHeader).find("th[field='" + jsonColumn.field + "']")[0];
              if (options.lockable && thHeader == null)
                thHeader = puma(this._divHeaderLocked).find("th[field='" + jsonColumn.field + "']")[0];
              thHeader.style.width = jsonColumn.width + "px";
              if (options.filterable) {
                let tdFilter = puma(this._divFilters).find("td[field='" + jsonColumn.field + "']")[0];
                if (options.lockable && tdFilter == null)
                  tdFilter = puma(this._divFiltersLocked).find("td[field='" + jsonColumn.field + "']")[0];
                tdFilter.style.width = jsonColumn.width + "px";
              }
              if (this._showTotals) {
                let tdTotals = puma(this._divTotals).find("td[field='" + jsonColumn.field + "']")[0];
                if (options.lockable && tdTotals == null)
                  tdTotals = puma(this._divTotalsLocked).find("td[field='" + jsonColumn.field + "']")[0];
                tdTotals.style.width = jsonColumn.width + "px";
              }
            }
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
        options.columns.vrSortAsc("index");
        let lastIndex = puma(this._divHeader).find("table th:last-child").index();
        for (let column of options.columns) {
          let headerTh = puma(this._divHeader).find("table th[field='" + column.field + "']")[0];
          puma(puma(this._divHeader).find("table th")[lastIndex]).vrAfterPuma(headerTh);
          if (options.filterable) {
            let filtersTd = puma(this._divFilters).find("table td[field='" + column.field + "']")[0];
            puma(puma(this._divFilters).find("table td")[lastIndex]).vrAfterPuma(filtersTd);
          }
          if (this._showTotals) {
            let totalsTd = puma(this._divTotals).find("table td[field='" + column.field + "']")[0];
            puma(puma(this._divTotals).find("table td")[lastIndex]).vrAfterPuma(totalsTd);
          }
          if (options.groupable) {
            let colGroupCol = puma(this._divBody).find("colgroup col[field='" + column.field + "']")[0];
            puma(puma(this._divBody).find("colgroup col")[lastIndex]).vrAfterPuma(colGroupCol);
          }
        }
        this.recalculateFitSpacePercentage();
        this.recalculateWidth();
      }
      if (updateDataSource) {
        hideLoader("vrGridLoaderLayout" + this._elementId);
        if (this._originalDataSource.length > 2e3)
          showLoader(this.container(), true, "vrGridLoaderLayout" + this._elementId);
        window.setTimeout(() => {
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
class GridHeaderAndCellSettings {
  textAlign;
  backgroundColor;
  color;
  tooltip;
  css;
}
class GridCellSettings extends GridHeaderAndCellSettings {
  zeroIfNull;
}
class GridControlsSettings {
  onClick;
  confirmationMessage;
  value;
  css;
  class;
  visible;
  enabled;
  tooltip;
}
class GridCustomSettings extends GridControlsSettings {
  template;
  filterFields;
}
class GridIconSettings extends GridControlsSettings {
  icon;
  imageUrl;
  color;
}
class GridImageSettings extends GridControlsSettings {
  imageUrl;
  base64Bytes;
}
class GridLabelSettings extends GridControlsSettings {
  text;
  underlineMode;
  bold;
  color;
  noBr;
  icon;
}
class GridSearchingInfo {
  field;
  text;
}
class VrGridServerBindingSettings {
  indexFrom;
  indexTo;
  columns;
  sortingInfo;
  filters;
  groupByFields;
  excel;
  excelFileName;
  pageSize;
  page;
}
class GridServerBindPagination {
  indexFrom;
  indexTo;
}
class GridControlsClickEvent {
  dataItem;
}
class GridTemplateEvent {
  dataItem;
  className;
  element;
  empty;
  field;
  sender;
}
class GridTooltipEvent {
  dataItem;
  element;
  empty;
}
class GridOnDataBoundEvent {
  sender;
}
class GridOnRowDataBoundEvent {
  sender;
  rowElement;
  dataItem;
  realDataItem;
  empty;
}
class GridSelectRowEvent {
  sender;
  rowElement;
  dataItem;
  checked;
  empty;
  index;
  shiftKey;
  fromCheckbox;
}
class GridSelectAllRowsEvent {
  sender;
  checked;
}
class GridToolbarClickEvent {
  sender;
  type;
  isDefaultPrevented;
  deletedItems;
  preventDefault() {
    this.isDefaultPrevented = true;
  }
}
class GridToolbarSwitchSettings {
  labelOff;
  labelOn;
  checked;
  onCheck;
}
class GridToolbarSwitchEvent {
  checked;
}
class GridFooterSettings {
  maxVisiblePages;
  totalElements;
  showPagination;
  showPageSize;
  showSettings;
  cartSettings;
}
class GridTotalElementTemplateEvent {
  firstIndex;
  lastIndex;
  dataItems;
  pageSelected;
  numberOfPages;
}
class TotalsGroupItem {
  groupValue;
  dataItems;
}
class TotalsResult {
  field;
  total;
  decimalDigits;
  roundingSettings;
  type;
  milesSeparator;
}
class GridExcelRow {
  cells;
}
class ExcelExportPromise {
  fileName;
  headerRow;
  contentRows;
  footerRow;
  groupByFields;
}
class GridExcelCell {
  title;
  field;
  text;
  bold;
  type;
  width;
  cellSettings;
  aggregate;
  decimalDigits;
  hidden;
  locked;
  backgroundColor;
  color;
  roundingSettings;
}
class GenerateExcelRequest {
  headerRow;
  contentRows;
  footerRow;
  excelFileName;
  AuthKey;
  groupBy;
  exportHiddenColumns;
}
class GridAutoWindowSettings {
  save;
  options;
  onBeforeOpen;
  onAfterOpen;
  onBeforeSave;
  onAfterSave;
  onBeforeClose;
  onAfterClose;
}
class GridAutoWindowOption {
  titleNew;
  titleEdit;
  height;
  width;
  showSaveButton;
  showCancelButton;
  textSaveButton;
  textCancelButton;
  confirmationMessage;
}
class AutoWindowEvent extends VrControlsEvent {
  sender;
  window;
  dataItem;
  columns;
}
class AutowindowBeforeOpenEvent extends AutoWindowEvent {
}
class AutowindowAfterOpenEvent extends AutoWindowEvent {
}
class AutowindowBeforeSaveEvent extends AutoWindowEvent {
}
class AutowindowAfterSaveEvent extends AutoWindowEvent {
}
class AutowindowBeforeCloseEvent extends AutoWindowEvent {
}
class AutowindowAfterCloseEvent extends AutoWindowEvent {
}
class GridFilterSettings {
  type;
  dateFilterSettings;
  numberFilterSettings;
  checkboxFilterSettings;
  stringFilterSettings;
}
class GridDateFilterSettings {
  filterTypeEnum;
  dateFrom;
  dateTo;
  specificValues;
}
class GridNumberFilterSettings {
  filterTypeEnum;
  numberFrom;
  numberTo;
  specificValues;
}
class GridCheckboxFilterSettings {
  value;
}
class GridStringFilterSettings {
  text;
  filterTypeEnum;
  specificValues;
}
class DragEveryEvent {
  left;
  top;
  element;
}
class GridColumnPosition {
  left;
  right;
  field;
  index;
  th;
}
class GridChildrenGroupRows {
  children;
  groupRows;
  allRows;
}
class GridLayoutSettings {
  //*****************TODO*************************** */
  name;
  get;
  save;
  load;
}
class GridLayoutStructure {
  filterConditions;
  groupBy;
  pageSize;
  sortingInfo;
  columns;
}
class GridLayoutColumn {
  width;
  fitSpace;
  hidden;
  locked;
  index;
  field;
}
class SaveLayoutRequest {
  method;
  authKey;
  layoutJson;
  pageName;
  gridName;
  layoutName;
  layoutPropertyName;
}
class LoadLayoutRequest {
  method;
  authKey;
  pageName;
  gridName;
  layoutName;
  layoutPropertyName;
}
class ClearLayoutRequest {
  AuthKey;
  pageName;
  gridName;
  layoutName;
}
class GetLayoutListRequest {
  method;
  authKey;
  pageName;
  gridName;
  layoutsPropertyName;
}
class TempRebindInfo {
  yPosition;
  checkedValues;
  page;
}
class GridRow {
  element;
  cells;
  index;
  dataItemId;
  id;
  findControl(uniqueName) {
    let controlElement = puma(this.element).find("*[uniqueName='" + uniqueName + "']")[0];
    if (controlElement != null)
      return ControlManager.get(controlElement.id);
    else
      return null;
  }
}
export {
  ExcelExportPromise,
  Grid,
  GridCellSettings,
  GridControlsSettings,
  GridCustomSettings,
  GridExcelRow,
  GridFilterSettings,
  GridFooterSettings,
  GridHeaderAndCellSettings,
  GridIconSettings,
  GridImageSettings,
  GridLabelSettings,
  GridOnDataBoundEvent,
  GridOnRowDataBoundEvent,
  GridOptions,
  GridRow,
  GridSelectAllRowsEvent,
  GridSelectRowEvent,
  GridTemplateEvent,
  GridToolbarClickEvent,
  GridToolbarSwitchSettings,
  GridTooltipEvent
};
//# sourceMappingURL=grid.js.map
