import { VrControl, VrControlOptions } from "../common.js";
import { ControlTypeEnum, createGrid, GridAlignEnum, GridColumnTypeEnum, puma, createLabel, ControlPositionEnum, TextAlignEnum } from "../vr.js";
import { GridFooterSettings, GridOnRowDataBoundEvent } from "./grid.js";
import { UtilityManager } from "../../managers/utilityManager.js";
class RepeaterOptions extends VrControlOptions {
  toolbar;
  dataSource;
  rebind;
  checkboxes;
  dataSourceFieldId;
  rowHeight;
  hideEditButton;
  mode;
  filterable;
  pageSize;
  footer;
  padding;
  alternateRowColors;
  hoverRowColor;
  customFilterProperties;
  emptyMessage;
  groupBy;
  title;
  groupable;
  rowColorProperty;
  rowTextColorProperty;
  template;
  onDataSourceChanged;
  onDataBound;
  onRowDataBound;
  onSelectRow;
  onSelectAllRows;
  onPageSelected;
  onScroll;
  onBeforeExcelExport;
  onAfterExcelExport;
}
class Repeater extends VrControl {
  _grid;
  constructor(element, options) {
    if (options == null)
      options = new RepeaterOptions();
    options.hideEditButton = true;
    if (options.pageSize == null) options.pageSize = false;
    if (options.alternateRowColors == null) options.alternateRowColors = true;
    if (options.footer == null || options.footer === true) options.footer = new GridFooterSettings();
    if (options.footer !== false) {
      if (options.footer.showPagination == null) options.footer.showPagination = true;
      if (options.footer.showSettings == null) options.footer.showSettings = false;
      if (options.pageSize === false) options.pageSize = 50;
    }
    if (options.padding == null) options.padding = 10;
    if (typeof options.padding != "number") {
      if (options.padding.left == null) options.padding.left = 10;
      if (options.padding.top == null) options.padding.top = 10;
      if (options.padding.right == null) options.padding.right = 10;
      if (options.padding.bottom == null) options.padding.bottom = 10;
    }
    if (options.emptyMessage == null) options.emptyMessage = "Nessun risultato";
    if (options.title == null) options.title = false;
    if (options.title === true) options.title = "";
    let internalHeight = UtilityManager.duplicate(options.height);
    options.height = void 0;
    let datasource = options.dataSource;
    options.dataSource = void 0;
    super(element, options, ControlTypeEnum.Repeater);
    this.container().id = this.container().id + "_Repeater";
    this._grid = createGrid(
      {
        addToControlList: options.addToControlList,
        toolbar: options.toolbar,
        classContainer: "vrRepeaterContainer",
        columns: [
          {
            field: "custom" + this.element().id,
            type: GridColumnTypeEnum.Custom,
            cellSettings: { textAlign: GridAlignEnum.Left },
            filterable: true,
            customFilterProperties: options.customFilterProperties,
            fitSpace: true,
            title: options.title !== false ? options.title : "",
            customSettings: (e) => {
              if (typeof options.padding == "number")
                e.element.style.cssText += "padding: " + options.padding + "px;";
              else
                e.element.style.cssText += "padding-left: " + options.padding.left + "px; padding-top: " + options.padding.top + "px; padding-right: " + options.padding.right + "px; padding-bottom: " + options.padding.bottom + "px;";
              if (options.template != null)
                return { template: options.template(e) };
              else
                return void 0;
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
        onRowDataBound: (e) => {
          puma(this.element()).find(".toRemove").parent().remove();
          if (e.empty) {
            puma(e.rowElement).empty();
            createLabel(
              {
                text: options.emptyMessage,
                fontSize: 14,
                width: "100%",
                align: TextAlignEnum.Center,
                class: "toRemove"
              },
              puma(this.element()).find(".grid_Body"),
              ControlPositionEnum.Before
            );
            return;
          }
          if (options.onRowDataBound != null) {
            let event = new RepeaterOnRowDataBoundEvent();
            event.dataItem = e.dataItem;
            event.realDataItem = e.realDataItem;
            event.empty = e.empty;
            event.rowElement = e.rowElement;
            event.sender = e.sender;
            event.cell = puma(e.rowElement).find("td[field='custom" + this.element().id + "']")[0];
            event.index = Number(e.rowElement.getAttribute("row"));
            options.onRowDataBound(event);
          }
        },
        onSelectRow: (e) => {
          if (options.onSelectRow != null && !e.empty)
            options.onSelectRow(e);
        },
        onSelectAllRows: options.onSelectAllRows,
        onPageSelected: options.onPageSelected,
        onScroll: options.onScroll,
        onBeforeExcelExport: options.onBeforeExcelExport,
        onAfterExcelExport: options.onAfterExcelExport
      },
      this.element()
    );
    if (datasource != null)
      this._grid.dataSource(datasource);
  }
  //#region Methods
  rebind(parameters, keepInfo = true) {
    let promise = new Promise((callback) => {
      this._grid.rebind(parameters, false, keepInfo).then(() => {
        if (callback != null)
          callback();
      });
    });
    return promise;
  }
  rebindSpecificRows(itemIdList, update = true) {
    this._grid.rebindSpecificRows(itemIdList, update);
  }
  clear() {
    this._grid.clear();
  }
  //#region Items
  originalDataSource() {
    return this._grid.originalDataSource();
  }
  dataSource(dataItems, clearFilters = false) {
    return this._grid.dataSource(dataItems, clearFilters);
  }
  update(triggerDataBound = true, keepInfo = true) {
    this._grid.update(triggerDataBound, keepInfo);
  }
  updateRow(dataItem, rebind = true) {
    this._grid.updateRow(dataItem, rebind);
  }
  updateRows(dataItems, rebind = true) {
    this._grid.updateRows(dataItems, rebind);
  }
  addRow(dataItem, rebind = true) {
    this._grid.addRow(dataItem, rebind);
  }
  addRows(dataItems, rebind = true) {
    this._grid.addRows(dataItems, rebind);
  }
  deleteRow(dataItemId, rebind = false) {
    this._grid.deleteRow(dataItemId, rebind);
  }
  deleteRows(dataItemIdList, rebind = false) {
    this._grid.deleteRows(dataItemIdList, rebind);
  }
  rows() {
    return this._grid.rows();
  }
  getAllItems() {
    return this._grid.getAllItems();
  }
  getCheckedItems() {
    return this._grid.getCheckedItems();
  }
  getCheckedValues() {
    return this._grid.getCheckedValues();
  }
  getCheckedNumberValues() {
    return this._grid.getCheckedNumberValues();
  }
  getDeletedItems() {
    return this._grid.getDeletedItems();
  }
  getDeletedItemValues(key) {
    return this._grid.getDeletedItemValues(key);
  }
  //#endregion
  //#region Selection
  clearSelection(triggerChange = true) {
    this._grid.clearSelection(triggerChange);
  }
  checkAllRows(triggerChange = true) {
    this._grid.checkAllRows(triggerChange);
  }
  unCheckAllRows(triggerChange = true) {
    this._grid.unCheckAllRows(triggerChange);
  }
  selectRowsByIndexes(indexes, triggerChange = true) {
    this._grid.selectRowsByIndexes(indexes, triggerChange);
  }
  selectRowByIndex(index, triggerChange = true) {
    this._grid.selectRowByIndex(index, triggerChange);
  }
  selectRows(itemIdList, property, triggerChange = true) {
    this._grid.selectRows(itemIdList, property, triggerChange);
  }
  selectRow(itemId, triggerChange = true) {
    this._grid.selectRow(itemId, triggerChange);
  }
  unselectRows(itemIdList, property, triggerChange = true) {
    this._grid.unselectRows(itemIdList, property, triggerChange);
  }
  unselectRow(itemId) {
    this._grid.unselectRow(itemId);
  }
  //#endregion
  //#region GroupBy
  hasGroup() {
    return this._grid.hasGroup();
  }
  removeGroup(field, updateDataSource = true) {
    this.removeGroups([field], updateDataSource);
  }
  removeGroups(fields, updateDataSource = true) {
    this._grid.removeGroups(fields, updateDataSource);
  }
  removeAllGroups(updateDataSource = true) {
    this._grid.removeAllGroups(updateDataSource);
  }
  addGroup(field, updateDataSource = true, sortBy, internalSortBy) {
    this.addGroups([field], updateDataSource, sortBy, internalSortBy);
  }
  addGroups(fields, updateDataSource = true, sortBy, internalSortBy) {
    this._grid.addGroups(fields, updateDataSource, sortBy, internalSortBy);
  }
  //#endregion
  //#region Sort
  removeSort(updateDataSource = true) {
    this._grid.removeSort(updateDataSource);
  }
  sort(field, tableSortModeEnum) {
    this._grid.sort(field, tableSortModeEnum);
  }
  //#endregion
  //#region Filter
  clearFilters(updateDataSource = true) {
    this._grid.clearFilters(updateDataSource);
  }
  addFilter(field, filterCondition, applyFilters = true) {
    this._grid.addFilter(field, filterCondition, applyFilters);
  }
  removeFilter(field, applyFilters = true) {
    this._grid.removeFilter(field, applyFilters);
  }
  updateFilter(field, filterCondition, applyFilters = true) {
    this._grid.updateFilter(field, filterCondition, applyFilters);
  }
  //#endregion
  pageSelected(page, update = true) {
    return this._grid.pageSelected(page, update);
  }
  //#region Height
  height(height) {
    return this._grid.height(height);
  }
  recalculateHeight(afterFilter = false) {
    this._grid.recalculateHeight(afterFilter);
  }
  recalculateWidth() {
    this._grid.recalculateWidth();
  }
  //#endregion
  //#region Footer
  visibleFooter(state) {
    return this._grid.visibleFooter(state);
  }
  showFooter() {
    this._grid.showFooter();
  }
  hideFooter() {
    this._grid.hideFooter();
  }
  footer() {
    return this._grid.footer();
  }
  //#endregion
  //#region Toolbar
  visibleToolbar(state) {
    return this._grid.visibleToolbar(state);
  }
  showToolbar() {
    this._grid.showToolbar();
  }
  hideToolbar() {
    this._grid.hideToolbar();
  }
  toolbar() {
    return this._grid.toolbar();
  }
  toolbarItem(value) {
    return this._grid.toolbarItem(value);
  }
  showToolbarItem(value) {
    this._grid.showToolbarItem(value);
  }
  hideToolbarItem(value) {
    this._grid.hideToolbarItem(value);
  }
  enableToolbarItem(value) {
    this._grid.enableToolbarItem(value);
  }
  disableToolbarItem(value) {
    this._grid.disableToolbarItem(value);
  }
  removeToolbarItem(value) {
    this._grid.removeToolbarItem(value);
  }
  addToolbarItem(toolbarItem) {
    this._grid.addToolbarItem(toolbarItem);
  }
  //#endregion
  //#region Column
  hideCheckboxColumn(updateDataSource = false) {
    this._grid.hideColumn("vrGridCheckboxColumn", updateDataSource);
  }
  showCheckboxColumn(updateDataSource = false) {
    this._grid.showColumn("vrGridCheckboxColumn", updateDataSource);
  }
  //#endregion
  //#region Utility
  pageSize(pageSize, update = false, triggerDataBound = false) {
    return this._grid.pageSize(pageSize, update, triggerDataBound);
  }
  //#endregion
  //#endregion
}
class RepeaterOnRowDataBoundEvent extends GridOnRowDataBoundEvent {
  cell;
  index;
}
export {
  Repeater,
  RepeaterOptions
};
//# sourceMappingURL=repeater.js.map
