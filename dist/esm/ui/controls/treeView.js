import { ControlManager } from "../../managers/controlManager.js";
import { UtilityManager } from "../../managers/utilityManager.js";
import { VrControl, VrControlsEvent, VrControlOptions } from "../common.js";
import { TreeModeEnum, TreeViewFilterSettings, ControlTypeEnum, puma, createButton, IconClassicLight, createLabel, TextAlignEnum, div, createTextBox, addCssStyle, ControlPositionEnum, IconClassicSolid, TreeViewColumnTypeEnum, TreeViewAlignEnum, DateModeEnum, NumberFormatSettings, TreeViewNumericTypeEnum, showLoader, hideLoader, alert, createSeparator, OrientationEnum, icon, confirm, TreeViewToolbarItemType, ButtonModeEnum, createSplitButton, TreeViewToolbarClickEvent, createButtonGroup, SelectionModeEnum, createCheckBox, createComboBox, createDatePicker, TreeViewToolbarSwitchSettings, createSwitch, notify, TreeViewItem, TreeViewToolbarSwitchEvent } from "../vr.js";
import { ComboBoxOptions } from "./comboBox.js";
import { DatePickerOptions } from "./datePicker.js";
import { TextBoxOptions } from "./textbox.js";
class TreeViewOptions extends VrControlOptions {
  checkboxes;
  treeMode;
  datasource;
  rebind;
  dataSourceFieldId;
  filter;
  showLink;
  title;
  rightClickForContextMenu;
  leftClickForContextMenu;
  parentClickable;
  contextMenuItems;
  showEditButton;
  draggable;
  selectable;
  alternateColor;
  spaceBetweenGroups;
  rowHeight;
  rowLine;
  export;
  columns;
  toolbar;
  template;
}
class TreeView extends VrControl {
  _items;
  _dictionaryValueLi;
  _dictionaryLiValue;
  _checkedValues;
  _isChecked;
  _tempCheckedValue;
  _value;
  _divContextMenu;
  _dataItemContextMenu;
  _actualDraggedItem;
  _lblTitle;
  _tempRebindInfo;
  _divContent;
  _divHeaderSpace;
  _divTitle;
  _divToolbar;
  _timeoutClick;
  _txtSearchFilter;
  constructor(element, options) {
    if (options == null)
      options = new TreeViewOptions();
    if (options.checkboxes == null) options.checkboxes = false;
    if (options.treeMode == null) options.treeMode = TreeModeEnum.AllExpanded;
    if (options.showLink == null) options.showLink = true;
    if (options.rightClickForContextMenu == null) options.rightClickForContextMenu = false;
    if (options.leftClickForContextMenu == null) options.leftClickForContextMenu = false;
    if (options.parentClickable == null) options.parentClickable = false;
    if (options.contextMenuItems == null) options.contextMenuItems = [];
    if (options.showEditButton == null) options.showEditButton = false;
    if (options.onEdit != null) options.showEditButton = true;
    if (options.draggable == null) options.draggable = false;
    if (options.onDragStart != null || options.onDragMove != null || options.onDragEnd != null) options.draggable = true;
    if (options.alternateColor == null) options.alternateColor = false;
    if (options.spaceBetweenGroups == null) options.spaceBetweenGroups = false;
    if (options.rowLine != null && options.rowLine > 1 && options.rowHeight == null) options.rowHeight = 20 * options.rowLine;
    if (options.rowLine == 1) options.rowLine = void 0;
    if (options.rowHeight == null) options.rowHeight = 27;
    if (options.selectable == null) options.selectable = true;
    if (options.dataSourceFieldId == null) options.dataSourceFieldId = "id";
    if (options.export == null) options.export = false;
    if (options.export !== false && options.title == null) options.title = "";
    if (options.export === true) options.export = new TreeViewExportSettings();
    if (options.filter == null) options.filter = false;
    if (options.filter === true) options.filter = new TreeViewFilterSettings();
    if (options.filter !== false) {
      if (options.filter.onlyParents == null) options.filter.onlyParents = false;
    }
    super(element, options, ControlTypeEnum.TreeView);
    this.element().style.cssText += "height: 100%;";
    this._checkedValues = [];
    if (options.columns != null && options.title == null) options.title = "";
    if (options.title != null || options.columns != null || options.export !== false) {
      this._divTitle = puma("<div style='position: relative; display: flex;' class='vrTreeView_divTitle'></div>")[0];
      puma(this.element()).vrPrependPuma(this._divTitle);
      createButton({
        text: "Excel",
        icon: IconClassicLight.FileExcel,
        css: "height: 24px;",
        colorSettings: { background: "#008a00", textColor: "#FFF" },
        cssContainer: "position: absolute; z-index: 9; top: 3px; left: 5px;",
        visible: options.export !== false,
        onClick: (e) => {
          this.excelExport();
        }
      }, this._divTitle);
      if (options.title != null) {
        this._lblTitle = createLabel({
          text: options.title,
          css: "padding: 5px; height: 19px; border-radius: unset; width: Calc(100% - 10px);",
          colorSettings: { background: "#e3f1fa", textColor: "#000" },
          align: TextAlignEnum.Center,
          width: "Calc(100% - " + this.widthColumns() + "px)",
          cssContainer: "display: block !important; height: 29px;"
        }, this._divTitle);
      }
      if (options.columns != null) {
        for (let column of options.columns) {
          let width = column.width != null ? column.width : 100;
          let divColumn = div(this._divTitle, { css: "width: " + width + "px;", class: "vrTreeViewColumn", attributes: [{ name: "field", value: column.field }] });
          createLabel({
            text: column.title != null ? column.title : "",
            cssContainer: "padding-left: 5px; padding-right: 5px;"
          }, divColumn);
        }
        this._divHeaderSpace = div(this._divTitle, { css: "background-color: #e3f1fa; width: 17px; display: none;" });
      }
    }
    if (options.toolbar != null) {
      this._divToolbar = puma("<div id='" + element.id + "Toolbar' class='treeView_divToolbar'></div>").vrPrependToPuma(this.element())[0];
      for (let toolbarItem of options.toolbar)
        this.addToolbarItem(toolbarItem);
    }
    let timeout = 0;
    this._txtSearchFilter = createTextBox(
      {
        width: "100%",
        icon: IconClassicLight.Search,
        placeholder: "Cerca...",
        class: "vrTreeViewFilter",
        visible: options.filter !== false,
        cssContainer: "margin-top: 1px;",
        onKeyDown: (e) => {
          this.limitInputByDataSource(e.sender.element(), e);
        },
        onKeyUp: (e) => {
          this.limitInputByDataSource(e.sender.element(), e);
          clearTimeout(timeout);
          timeout = window.setTimeout(() => {
            let text = e.sender.value();
            this.filter(text);
          }, 200);
        }
      },
      this.element()
    );
    let titleHeight = options.title != null ? 29 : 0;
    let filterHeight = options.filter !== false ? 27 : 0;
    let toolbarHeight = options.toolbar != null ? 34 : 0;
    this._divContent = div(this.element(), { css: "display: flex; height: Calc(100% - " + (titleHeight + filterHeight + toolbarHeight) + "px);", class: "vrTreeViewDivContent" });
    if (options.rowHeight != 27) {
      addCssStyle(`
				#` + this.element().id + ` .vrTreeViewLiLink::after {
					top: ` + options.rowHeight / 2 + `px !important;
				}
				#` + this.element().id + ` .vrTreeViewLiLink:last-child::before {
					height: ` + (options.rowHeight / 2 + 1) + `px !important;
				}
				#` + this.element().id + ` .vrTreeViewLiLink.vrTreeViewLiFirstChild:last-child::before {
					height: 0px !important;
				}
			`);
    }
    if (options.datasource != null)
      this.datasource(options.datasource);
    if (options.rebind != null && options.rebind.rebindAtStartup === true)
      this.doWebApiCall(
        options.rebind,
        1
        /* Rebind */
      );
  }
  //#region Methods
  datasource(items) {
    if (items != null) {
      this._items = items;
      if (this.getRootItems().length == 0)
        puma(this.element()).addClass("vrTreeViewFlat");
      else
        puma(this.element()).removeClass("vrTreeViewFlat");
      this._tempRebindInfo = new TempRebindInfo();
      this._tempRebindInfo.selectedValue = this.value();
      let parentExpandedValueList = [];
      let expandedList = puma(this.container()).find(".vrTreeViewLi .caret-down");
      for (let expanded of Array.from(expandedList))
        parentExpandedValueList.push(expanded.parentElement.getAttribute("value"));
      this._tempRebindInfo.parentExpandedValueList = parentExpandedValueList;
      let firstUl = puma(this.container()).find(".vrTreeViewUl").first();
      if (firstUl[0] != null)
        this._tempRebindInfo.yPosition = firstUl[0].scrollTop;
      this.drawDataSource();
      for (let parentExpandedValue of this._tempRebindInfo.parentExpandedValueList) {
        let li = this._dictionaryValueLi.get(parentExpandedValue);
        if (li != null) {
          let divIconExpandCollpase = puma(li).find(".vrTreeViewDivIconExpand")[0];
          if (divIconExpandCollpase != null && puma(divIconExpandCollpase).hasClass("caret-right"))
            puma(divIconExpandCollpase).click();
        }
      }
      if (this._tempRebindInfo.selectedValue != null && this._tempRebindInfo.selectedValue != "" && this._tempRebindInfo.selectedValue.length > 0)
        this.value(this._tempRebindInfo.selectedValue, false);
      puma(this.container()).find(".vrTreeViewUl").first().scrollTop(this._tempRebindInfo.yPosition);
    }
    return this._items;
  }
  rebind(parameters, loadingElement) {
    let promise = new Promise((callback) => {
      let options = this.getOptions();
      if (options.rebind != null) {
        options.rebind.otherParameters = void 0;
        if (parameters != null)
          options.rebind.otherParameters = parameters;
        options.rebind.tempLoadingElement = loadingElement;
        this.doWebApiCall(options.rebind, 1, callback);
      }
    });
    return promise;
  }
  update() {
    this.datasource(this.datasource());
  }
  drawDataSource() {
    let options = this.getOptions();
    puma(this._divContent).empty();
    let items = this.datasource();
    if (items.length == 1 && items[0] == null)
      return;
    let divTreeView = div(this._divContent, { css: "width: 100%;" });
    this._dictionaryValueLi = /* @__PURE__ */ new Map();
    this._dictionaryLiValue = /* @__PURE__ */ new Map();
    items = items.filter((k) => k.parentValue == null || k.parentValue == "0" || k.parentValue == "");
    this.drawItems(items, divTreeView);
    if (options.alternateColor) {
      window.setTimeout(() => {
        let odd = true;
        for (let item of Array.from(puma(this.container()).find(".vrTreeViewDivItemContainer"))) {
          odd = !odd;
          if (odd)
            $(item).css("background-color", "#fff");
          else
            $(item).css("background-color", "#f3f3f3");
        }
      });
    }
    if (this._lblTitle != null) {
      this._lblTitle.width("Calc(100% - " + this.widthColumns() + "px)");
      this._lblTitle.element().style.cssText += "width: Calc(100% - 10px) !important;";
    }
    this.manageScrollbar();
    if (this._txtSearchFilter.value() != null && this._txtSearchFilter.value() != "")
      this.filter(this._txtSearchFilter.value());
  }
  manageScrollbar() {
    let options = this.getOptions();
    if (puma(this.container()).find(".vrTreeViewUl").first().vrHasScrollBar()) {
      if (options.columns != null) {
        puma(this._divHeaderSpace).show();
        if (this._lblTitle != null)
          this._lblTitle.width("Calc(100% - " + (this.widthColumns() + 17) + "px)");
      }
    } else
      puma(this._divHeaderSpace).hide();
  }
  drawItems(items, elementToAppend) {
    let options = this.getOptions();
    if (items.length == 0)
      return;
    let ul = puma("<ul class='vrTreeViewUl' style='height: 100%; overflow-y: auto;'></ul>").vrAppendToPuma(elementToAppend);
    let i = 0;
    for (let item of items) {
      if (item.value == null)
        item.value = item.text;
      let liClassShowLink = options.showLink ? "vrTreeViewLiLink" : "";
      let li = puma("<li class='vrTreeViewLi " + liClassShowLink + "' tabindex='-1' parentValue='" + item.parentValue + "' value='" + item.value + "'></li>").vrAppendToPuma(ul);
      this._dictionaryLiValue.set(li[0], item.value);
      if (this._dictionaryValueLi.has(item.value)) {
        let actualLiList = this._dictionaryValueLi.get(item.value);
        actualLiList.push(li[0]);
        this._dictionaryValueLi.set(item.value, actualLiList);
      } else
        this._dictionaryValueLi.set(item.value, [li[0]]);
      if (options.treeMode == TreeModeEnum.AllCollapsed) {
        if (item.parentValue != null && item.parentValue != "0")
          puma(li).closest(".vrTreeViewUl").hide();
      } else if (options.treeMode == TreeModeEnum.OnlyFirstLevelExpanded) {
        if (puma(li).parents(".vrTreeViewUl").length > 2)
          puma(li).closest(".vrTreeViewUl").hide();
      }
      let children = this.getOnlyChildrenItems(item);
      if (children.length > 0) {
        if (options.spaceBetweenGroups && i > 0)
          li[0].style.cssText += "margin-top: 20px;";
        let iconClassForDiv = "";
        let iconClass = IconClassicLight.CaretRight;
        if (options.treeMode == TreeModeEnum.AllCollapsed) {
          if (item.parentValue != null) {
            iconClass = IconClassicLight.CaretRight;
            iconClassForDiv = "caret-right";
          }
        } else if (options.treeMode == TreeModeEnum.OnlyFirstLevelExpanded) {
          if (puma(li).parents(".vrTreeViewUl").length == 1) {
            iconClass = IconClassicLight.CaretDown;
            iconClassForDiv = "caret-down";
          } else {
            iconClass = IconClassicLight.CaretRight;
            iconClassForDiv = "caret-right";
          }
        } else {
          iconClass = IconClassicLight.CaretDown;
          iconClassForDiv = "caret-down";
        }
        let divIcon = puma("<div class='vrTreeViewDivIconExpand " + iconClassForDiv + "' style='height: " + options.rowHeight + "px;'></div>").vrAppendToPuma(li);
        puma(UtilityManager.createIcon(iconClass)).vrAppendToPuma(divIcon);
        puma(divIcon).click((e) => {
          puma(e.currentTarget).children("i").removeClass(IconClassicLight.CaretRight + " " + IconClassicLight.CaretDown);
          puma(e.currentTarget).removeClass("caret-right caret-down");
          let ulChildren = puma(e.currentTarget).siblings(".vrTreeViewUl");
          if (ulChildren.first().is(":visible")) {
            ulChildren.hide();
            puma(e.currentTarget).children("i").addClass(IconClassicLight.CaretRight);
            puma(e.currentTarget).addClass("caret-right");
          } else {
            ulChildren.show();
            puma(e.currentTarget).children("i").addClass(IconClassicLight.CaretDown);
            puma(e.currentTarget).addClass("caret-down");
          }
          this.manageScrollbar();
        });
      }
      let treeViewDivItemContainer = puma("<div class='vrTreeViewDivItemContainer' style='height: " + options.rowHeight + "px;'></div>").vrAppendToPuma(li);
      if (options.checkboxes) {
        let checkBox = puma("<input type='checkbox' class='vrCheckBox'></input>").vrAppendToPuma(treeViewDivItemContainer);
        puma(checkBox).click((e) => {
          let isChecked = e.currentTarget.checked;
          let value = this._dictionaryLiValue.get(puma(e.currentTarget).closest("li")[0]);
          if (isChecked)
            this._checkedValues.push(value);
          else
            this._checkedValues.vrDelete(value);
          let targetItem = this.datasource().filter((k) => k.value == value)[0];
          if (targetItem != null && this.getOnlyChildrenItems(targetItem).length > 0) {
            let childrenItems = this.getAllChildrenItems(targetItem);
            if (e.currentTarget.checked)
              this._checkedValues.vrPushRange(childrenItems.map((k) => k.value));
            let childrenCheckboxes = this.getChildrenCheckboxElements(targetItem, false);
            puma(childrenCheckboxes).prop("checked", e.currentTarget.checked);
            for (let childItem of childrenItems) {
              if (!e.currentTarget.checked)
                this._checkedValues.vrDelete(childItem.value);
            }
          }
          this._isChecked = e.currentTarget.checked;
          if (!this._isChecked)
            this._checkedValues.vrDelete(item.value);
          let comboItemTexts = [];
          let liList = this._dictionaryValueLi.get(item.value);
          for (let li2 of liList) {
            let comboItemText = puma(li2).find(".vrTreeViewItemText")[0];
            comboItemTexts.push(comboItemText);
          }
          for (let comboItemText of comboItemTexts) {
            let checkBox2 = puma(comboItemText).siblings("input");
            puma(checkBox2).prop("checked", this._isChecked);
            checkBox2[0].checked = this._isChecked;
            puma(checkBox2).removeClass("indeterminateVrCheckbox");
          }
          for (let otherItem of this.datasource().filter((k) => k.value == item.value)) {
            let parentChecked2 = this.manageCheckParent(otherItem);
            if (!parentChecked2 && otherItem.parentValue != null)
              this._checkedValues.vrDelete(otherItem.parentValue);
            else if (parentChecked2 && otherItem.parentValue != null && !this._checkedValues.includes(otherItem.parentValue))
              this._checkedValues.push(otherItem.parentValue);
          }
          let parentChecked = this.manageCheckParent(item);
          if (!parentChecked && item.parentValue != null)
            this._checkedValues.vrDelete(item.parentValue);
          else if (parentChecked && item.parentValue != null && !this._checkedValues.includes(item.parentValue))
            this._checkedValues.push(item.parentValue);
          this._tempCheckedValue = item.value;
          this._checkedValues = this._checkedValues.vrDistinct();
          this.value(this._checkedValues);
          this._tempCheckedValue = null;
        });
      }
      let classIfCheckbox = options.checkboxes ? "vrTreeViewItemTextCheckbox" : "";
      let spanTreeItemTextContainer = puma("<span class='vrTreeViewItemTextContainer'></span>").vrAppendToPuma(treeViewDivItemContainer);
      spanTreeItemTextContainer[0].style.cssText += "width: Calc(100% - " + (this.widthColumns() + 1) + "px);";
      let treeViewItemText = puma("<span title='" + item.text + "' text='" + item.text.replace(/'/g, "&#39;") + "' class='vrTreeViewItemText " + classIfCheckbox + "'></span>").vrAppendToPuma(spanTreeItemTextContainer);
      if (options.template == null) {
        let iconText = "";
        if (item.icon != null)
          iconText = "<i class='" + item.icon + "' style='margin-right: 5px;'></i>";
        let rowText = item.text.replace(/'/g, "&#39;");
        let styleRow = "white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: inline-block;";
        if (options.rowLine != null && options.rowLine > 1)
          styleRow = "display: -webkit-inline-box; overflow: hidden; -webkit-line-clamp: " + options.rowLine + "; -webkit-box-orient: vertical;white-space: pre-wrap; white-space: -moz-pre-wrap; white-space: -pre-wrap; white-space: -o-pre-wrap; word-wrap: break-word;";
        rowText = iconText + "<span class='vrTreeViewSpanValue' style='" + styleRow + "'>" + rowText + "</span>";
        puma(rowText).vrAppendToPuma(treeViewItemText);
      } else {
        let templateEvent = new TreeViewTemplateEvent();
        templateEvent.sender = this;
        templateEvent.dataItem = item;
        templateEvent.container = treeViewItemText[0];
        let templateResult = options.template(templateEvent);
        if (typeof templateResult == "string") {
          let rowText = templateResult;
          if (item.icon != null)
            rowText = "<i class='" + item.icon + "' style='margin-right: 5px;'></i>" + rowText;
          let styleRow = "white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: inline-block;";
          if (options.rowLine != null && options.rowLine > 1)
            styleRow = "display: -webkit-inline-box; overflow: hidden; -webkit-line-clamp: " + options.rowLine + "; -webkit-box-orient: vertical;white-space: pre-wrap; white-space: -moz-pre-wrap; white-space: -pre-wrap; white-space: -o-pre-wrap; word-wrap: break-word;";
          rowText = "<span style='" + styleRow + "'>" + rowText + "</span>";
          puma(rowText).vrAppendToPuma(treeViewItemText);
        }
      }
      if (item.bold === true)
        treeViewItemText[0].style.cssText += "font-weight: 600;";
      if (options.showEditButton) {
        createButton({
          icon: IconClassicLight.Edit,
          cssContainer: "margin-right: 5px;",
          css: "background: none; border: none;",
          onClick: (e) => {
            if (options.onEdit != null) {
              let event = new TreeViewEditEvent();
              event.sender = this;
              event.text = item.text;
              event.value = item.value;
              event.dataItem = item;
              options.onEdit(event);
            }
          }
        }, treeViewItemText, ControlPositionEnum.Before);
      }
      if (options.selectable) {
        puma(treeViewItemText).on("mousedown", (e) => {
          switch (e.button) {
            case 0:
            // Left
            case 1:
              {
                let value = this._dictionaryLiValue.get(puma(e.currentTarget).closest("li")[0]);
                let item2 = this.datasource().filter((k) => k.value == value)[0];
                if (item2 != null && (options.parentClickable || !this.getRootValues().includes(item2.value))) {
                  if (!options.checkboxes)
                    this.value(item2.value);
                  else
                    puma(e.currentTarget).siblings(".vrCheckBox").click();
                }
                if (options.leftClickForContextMenu) {
                  this.showContextMenu(item2, e.clientX, puma(e.currentTarget).parent().offset().top + puma(e.currentTarget).parent().height());
                  e.preventDefault();
                  return;
                }
              }
              break;
            case 2:
              {
                if (options.rightClickForContextMenu) {
                  this.showContextMenu(item, e.clientX, puma(e.currentTarget).parent().offset().top + puma(e.currentTarget).parent().height());
                  e.preventDefault();
                  return;
                }
              }
              break;
          }
        });
      }
      if (options.onDoubleClick != null) {
        puma(treeViewItemText).on("dblclick", (e) => {
          let event = new TreeViewDoubleClickEvent();
          event.sender = this;
          event.text = item.text;
          event.value = item.value;
          event.dataItem = item;
          options.onDoubleClick(event);
        });
      }
      if (options.contextMenuItems.length > 0 && !options.rightClickForContextMenu && !options.leftClickForContextMenu) {
        let btnContextMenu = null;
        puma(treeViewDivItemContainer).on("mouseenter", (e) => {
          btnContextMenu = createButton({
            icon: IconClassicSolid.EllipsisVertical,
            css: "background: none; border: none;",
            cssContainer: "margin-left: 10px; margin-top: 2px; height: 17px;",
            width: 25,
            class: "vrTreeViewBtnContextMenu",
            onClick: (e2) => {
              puma(treeViewDivItemContainer).addClass("hover");
              this.showContextMenu(item, puma(e2.sender.container()).offset().left, puma(e2.sender.container()).offset().top + puma(e2.sender.container()).height());
            }
          }, treeViewItemText);
        });
        puma(treeViewDivItemContainer).on("mouseleave", (e) => {
          if (!puma(treeViewDivItemContainer).hasClass("hover") && btnContextMenu != null)
            $(btnContextMenu.container()).remove();
        });
      }
      if (options.columns != null) {
        let dataItemId = item[options.dataSourceFieldId];
        let rowId = "row" + i + "_" + dataItemId;
        for (let column of options.columns) {
          if (column.hidden)
            continue;
          let width = column.width != null ? column.width : 100;
          width -= 10;
          let divItem = div(treeViewDivItemContainer, { class: "vrTreeViewColumnItem", css: "height: " + options.rowHeight + "px; width: " + width + "px;" });
          let field = column.field;
          puma(divItem).attr("field", field);
          let textHTML = item[field];
          if (textHTML == null)
            textHTML = "";
          if (column.type == null) column.type = TreeViewColumnTypeEnum.String;
          let textAlign = TreeViewAlignEnum.Left;
          switch (column.type) {
            //#region Number, Currency, Percentage & Duration
            case TreeViewColumnTypeEnum.Number:
              {
                let decimalDigits = column.decimalDigits != null ? column.decimalDigits : 0;
                textAlign = TreeViewAlignEnum.Right;
                if (column.cellSettings == null) column.cellSettings = new TreeViewCellSettings();
                if (column.cellSettings.zeroIfNull == null) column.cellSettings.zeroIfNull = false;
                if (textHTML === "" && column.cellSettings.zeroIfNull === false)
                  textHTML = "";
                else {
                  let formatSettings = new NumberFormatSettings();
                  formatSettings.useGrouping = column.milesSeparator;
                  formatSettings.minimumFractionDigits = decimalDigits;
                  formatSettings.maximumFractionDigits = decimalDigits;
                  textHTML = Number(textHTML).vrToNumberString(formatSettings);
                }
              }
              break;
            case TreeViewColumnTypeEnum.Currency:
              {
                let decimalDigits = column.decimalDigits != null ? column.decimalDigits : 2;
                textAlign = TreeViewAlignEnum.Right;
                if (column.cellSettings == null) column.cellSettings = new TreeViewCellSettings();
                if (column.cellSettings.zeroIfNull == null) column.cellSettings.zeroIfNull = false;
                if (textHTML === "" && column.cellSettings.zeroIfNull === false)
                  textHTML = "";
                else {
                  let formatSettings = new NumberFormatSettings();
                  formatSettings.minimumFractionDigits = decimalDigits;
                  formatSettings.maximumFractionDigits = decimalDigits;
                  textHTML = Number(textHTML).vrToCurrencyString(formatSettings);
                }
              }
              break;
            case TreeViewColumnTypeEnum.Percentage:
              {
                let decimalDigits = column.decimalDigits != null ? column.decimalDigits : 2;
                textAlign = TreeViewAlignEnum.Right;
                if (column.cellSettings == null) column.cellSettings = new TreeViewCellSettings();
                if (column.cellSettings.zeroIfNull == null) column.cellSettings.zeroIfNull = false;
                if (textHTML === "" && column.cellSettings.zeroIfNull === false)
                  textHTML = "";
                else {
                  let formatSettings = new NumberFormatSettings();
                  formatSettings.minimumFractionDigits = decimalDigits;
                  formatSettings.maximumFractionDigits = decimalDigits;
                  textHTML = (Number(textHTML) / 100).vrToPercentageString(formatSettings);
                }
              }
              break;
            case TreeViewColumnTypeEnum.Duration:
              {
                if (column.cellSettings == null) column.cellSettings = new TreeViewCellSettings();
                if (column.cellSettings.zeroIfNull == null) column.cellSettings.zeroIfNull = false;
                if (textHTML === "" && column.cellSettings.zeroIfNull === false)
                  textHTML = "";
                else {
                  let hours = Math.trunc(Number(textHTML) / 60);
                  let hoursString = String(hours);
                  if (hours < 10)
                    hoursString = "0" + hoursString;
                  let minutes = Math.trunc(Number(textHTML) % 60);
                  let minutesString = String(minutes);
                  if (minutes < 10)
                    minutesString = "0" + minutesString;
                  textAlign = TreeViewAlignEnum.Center;
                  textHTML = hoursString + ":" + minutesString;
                }
              }
              break;
            //#endregion
            //#region Date, Time, DateTime
            case TreeViewColumnTypeEnum.Date:
            case TreeViewColumnTypeEnum.DateTime:
            case TreeViewColumnTypeEnum.Time:
              {
                textAlign = TreeViewAlignEnum.Center;
                if (column.type == TreeViewColumnTypeEnum.Date)
                  textHTML = textHTML == "" ? "" : new Date(textHTML).vrToItalyString(DateModeEnum.Date);
                else if (column.type == TreeViewColumnTypeEnum.DateTime)
                  textHTML = textHTML == "" ? "" : new Date(textHTML).vrToItalyString(DateModeEnum.DateTime, column.showSeconds);
                else if (column.type == TreeViewColumnTypeEnum.Time)
                  textHTML = textHTML == "" ? "" : new Date(textHTML).vrToItalyString(DateModeEnum.Time, column.showSeconds);
              }
              break;
            //#endregion
            //#region Checkbox
            case TreeViewColumnTypeEnum.Checkbox:
            case TreeViewColumnTypeEnum.Boolean:
              {
                let checked = item[field] != null && Boolean(item[field]) == true ? "checked='checked'" : "";
                textAlign = TreeViewAlignEnum.Center;
                textHTML = "<input " + checked + " disabled='disabled' dataItemId='" + dataItemId + "' id='" + rowId + "_" + column.field + "' class='vrCheckBox' type='checkbox'></input><label class='vrLabel vrCheckBoxLabel' for='" + rowId + "_" + column.field + "'></label>";
              }
              break;
            //#endregion
            //#region Color
            case TreeViewColumnTypeEnum.Color:
              {
                textAlign = TreeViewAlignEnum.Center;
                if (textHTML.isNotNullOrEmpty())
                  textHTML = "<i class='" + IconClassicLight.Circle + "' style='width: 20px; height: 20px; color: " + textHTML + "; display: inline-flex; align-items: center;'></i>";
              }
              break;
          }
          divItem.innerHTML = textHTML;
          if (column.cellSettings != null) {
            if (column.cellSettings.backgroundColor != null)
              puma(divItem).css("background-color", column.cellSettings.backgroundColor);
            if (column.cellSettings.color != null)
              puma(divItem).css("color", column.cellSettings.color);
            if (column.cellSettings.css != null)
              divItem.style.cssText += column.cellSettings.css;
          }
          if (column.cellSettings != null)
            textAlign = column.cellSettings.textAlign != null ? column.cellSettings.textAlign : textAlign;
          puma(divItem).css("text-align", textAlign);
          if (children.length > 0 && column.boldRoot === true || column.bold === true)
            puma(divItem).css("font-weight", "500");
        }
      }
      if (options.rightClickForContextMenu || options.leftClickForContextMenu) {
        puma(treeViewDivItemContainer).on("contextmenu", (e) => {
          e.preventDefault();
          return false;
        });
      }
      if (options.draggable) {
        puma(treeViewDivItemContainer).attr("draggable", "true");
        puma(treeViewDivItemContainer).on("dragstart", (e) => {
          window.clearTimeout(this._timeoutClick);
          this._actualDraggedItem = item;
          if (options.onDragStart != null) {
            let dragStartEvent = new TreeViewDragStartEvent();
            dragStartEvent.sender = this;
            dragStartEvent.target = puma(e.target).closest("li")[0];
            dragStartEvent.source = item;
            options.onDragStart(dragStartEvent);
            if (dragStartEvent.isDefaultPrevented()) {
              e.preventDefault();
              return;
            }
          }
          puma(e.target).closest("li").addClass("vrTreeViewDragStart");
        });
        puma(treeViewDivItemContainer).on("dragover", (e) => {
          if (options.onDragMove != null) {
            let destination = this.datasource().filter((k) => k.value == puma(e.target).closest("li").attr("value"))[0];
            let li2 = puma(e.target).closest("li")[0];
            let dragMoveEvent = new TreeViewDragMoveEvent();
            dragMoveEvent.sender = this;
            dragMoveEvent.target = li2;
            dragMoveEvent.source = item;
            dragMoveEvent.destination = destination;
            options.onDragMove(dragMoveEvent);
            if (dragMoveEvent.isDefaultPrevented()) {
              e.preventDefault();
              return;
            }
          }
          puma(e.target).closest(".vrTreeViewDivItemContainer").addClass("vrTreeViewDragOver");
          e.preventDefault();
        });
        puma(treeViewDivItemContainer).on("dragleave", (e) => {
          puma(e.target).closest(".vrTreeViewDivItemContainer").removeClass("vrTreeViewDragOver");
          e.preventDefault();
        });
        puma(treeViewDivItemContainer).on("drop", (e) => {
          if (options.onDragEnd != null) {
            let destination = this.datasource().filter((k) => k.value == puma(e.target).closest("li").attr("value"))[0];
            let liDestination = puma(e.target).closest("li")[0];
            let ul2 = puma(liDestination).find("ul");
            ul2.remove();
            let dragMoveEvent = new TreeViewDragEndEvent();
            dragMoveEvent.sender = this;
            dragMoveEvent.target = li;
            dragMoveEvent.source = this._actualDraggedItem;
            dragMoveEvent.destination = destination;
            options.onDragEnd(dragMoveEvent);
            if (dragMoveEvent.isDefaultPrevented()) {
              e.preventDefault();
              return;
            }
            let liSource = this._dictionaryValueLi.get(this._actualDraggedItem.value);
            puma(liSource).remove();
            let childrenItems = this.getOnlyChildrenItems(destination);
            this._actualDraggedItem.parentValue = destination.value;
            childrenItems.push(this._actualDraggedItem);
            this.drawItems(childrenItems, liDestination);
            puma(liDestination).find("ul").show();
          }
          this._actualDraggedItem = null;
          puma(this.container()).find(".vrTreeViewDragOver").removeClass("vrTreeViewDragOver");
          puma(this.container()).find(".vrTreeViewDragStart").removeClass("vrTreeViewDragStart");
          e.stopPropagation();
          e.preventDefault();
          return false;
        });
      }
      if (children.length > 0)
        this.drawItems(this.getOnlyChildrenItems(item), li);
      i++;
    }
    let firstLiChild = puma(this.container()).find(".vrTreeViewUl").first().find(".vrTreeViewLiLink").first();
    firstLiChild.addClass("vrTreeViewLiFirstChild");
  }
  getOnlyChildrenItems(parentItem) {
    return this.datasource().filter((k) => k.parentValue != null && k.parentValue == parentItem.value);
  }
  getRootItems() {
    let parentItems = [];
    for (let item of this.datasource()) {
      if (item == null)
        continue;
      let parentValue = item.parentValue;
      while (parentValue != null) {
        let parentItem = this.datasource().filter((k) => k.value == parentValue)[0];
        if (!parentItems.includes(parentItem))
          parentItems.push(parentItem);
        parentValue = parentItem != null ? parentItem.parentValue : void 0;
        if (parentItem != null && parentValue == parentItem.value)
          parentValue = void 0;
      }
    }
    return parentItems;
  }
  getRootValues() {
    return this.getRootItems().filter((k) => k != null).map((k) => k.value);
  }
  getAllChildrenItems(parentItem) {
    return this.getDataChildrenItems(parentItem);
  }
  getAllChildrenValues(parentItem) {
    return this.getAllChildrenItems(parentItem).map((k) => k.value);
  }
  getDataChildrenItems(parentItem) {
    let dataItems = parentItem == null ? this.datasource() : this.getOnlyChildrenItems(parentItem);
    let items = [];
    for (let dataElement of dataItems) {
      items.push(dataElement);
      if (this.getOnlyChildrenItems(dataElement).length > 0)
        items.vrPushRange(this.getDataChildrenItems(dataElement));
    }
    return items;
  }
  getChildrenCheckboxElements(parentItem, checked = false, arrayMode = false) {
    let liParent = this._dictionaryValueLi.get(parentItem.value);
    let parentComboItemText = puma(liParent).find(".vrTreeViewItemText")[0];
    let parentCheckbox = puma(parentComboItemText).siblings("input");
    let childrenCheckboxElements = puma(parentCheckbox).parent().parent().find("input" + (checked ? ":checked" : ""));
    if (puma(childrenCheckboxElements[0]).siblings(".vrTreeViewItemText").html() == parentItem.text)
      childrenCheckboxElements.splice(0, 1);
    if (arrayMode)
      childrenCheckboxElements = Array.from(childrenCheckboxElements);
    return childrenCheckboxElements;
  }
  getCheckedItems() {
    let items = this.datasource().filter((k) => this._checkedValues.includes(k.value));
    return items.vrDistinctBy((k) => k.value);
  }
  getCheckedValues() {
    return this._checkedValues.vrDistinct();
  }
  getSelectedItem() {
    return this.datasource().filter((k) => k.value == this.value())[0];
  }
  getParentItem(childItem) {
    if (childItem.parentValue != null)
      return this.datasource().filter((k) => k.value == childItem.parentValue)[0];
    return null;
  }
  manageCheckParent(item) {
    let parentItem = this.getParentItem(item);
    if (parentItem != null) {
      let children = this.getChildrenCheckboxElements(parentItem, true, true);
      let tempCheckedElements = children.filter((k) => k != null && k.checked);
      let liParent = this._dictionaryValueLi.get(parentItem.value);
      let parentInputElement = puma(liParent).find("input")[0];
      if (parentInputElement != null) {
        puma(parentInputElement).removeClass("indeterminateVrCheckbox");
        parentInputElement.checked = false;
        if (this.getAllChildrenItems(parentItem).length == tempCheckedElements.length) {
          parentInputElement.checked = true;
          return true;
        } else if (tempCheckedElements.length == 0) {
          parentInputElement.checked = false;
          return false;
        } else {
          puma(parentInputElement).addClass("indeterminateVrCheckbox");
          return false;
        }
      }
    }
    return;
  }
  limitInputByDataSource(element, e) {
    let filtered = this.getFilteredArrayByInputText(element.value);
    if (filtered.length == 0) {
      let newText = element.value;
      element.value = newText.substring(0, newText.length - 1);
      e.preventDefault();
      return;
    }
  }
  getFilteredArrayByInputText(value) {
    value = value.toLowerCase();
    let filteredArray = [];
    let arrayWhereSearch = this.datasource().map((k) => String(k.text).toLowerCase());
    arrayWhereSearch.forEach((k, index) => {
      if (k.indexOf(value) != -1)
        filteredArray.push(this.datasource()[index]);
    });
    return filteredArray;
  }
  filter(text) {
    let options = this.getOptions();
    let element = this._txtSearchFilter.element();
    let selectionStart = element.selectionStart;
    let selectionEnd = element.selectionEnd;
    if (text == "")
      puma(this.element()).find("li").show();
    else if (!(selectionStart == 0 && selectionEnd == element.value.length)) {
      puma(this.element()).find("li").hide();
      let items = this.getFilteredArrayByInputText(text);
      let values = items.map((k) => k.value);
      let texts = items.map((k) => k.text);
      for (let item of items) {
        let parentValue = item.parentValue;
        while (parentValue != null) {
          let parentItem = this.datasource().filter((k) => k.value == parentValue)[0];
          if (!values.includes(parentValue)) {
            values.push(parentValue);
            texts.push(parentItem != null ? parentItem.text : "");
          }
          parentValue = parentItem != null ? parentItem.parentValue : void 0;
        }
      }
      if (!options.filter.onlyParents) {
        for (let comboItemText of Array.from(puma(this.element()).find(".vrTreeViewItemText"))) {
          if (texts.includes(puma(comboItemText).attr("text"))) {
            puma(comboItemText).closest(".vrTreeViewLi").show();
            puma(comboItemText).closest(".vrTreeViewLi").closest(".vrTreeViewUl").show();
            puma(comboItemText).closest(".vrTreeViewLi").find(".vrTreeViewDivIconExpand").removeClass("caret-right caret-down");
            puma(comboItemText).closest(".vrTreeViewLi").find(".vrTreeViewDivIconExpand").children("i").removeClass(IconClassicLight.CaretRight + " " + IconClassicLight.CaretDown);
            puma(comboItemText).closest(".vrTreeViewLi").find(".vrTreeViewDivIconExpand").addClass("caret-down");
            puma(comboItemText).closest(".vrTreeViewLi").find(".vrTreeViewDivIconExpand").children("i").addClass(IconClassicLight.CaretDown);
          }
        }
      } else {
        for (let li of Array.from(puma(this.element()).find(".vrTreeViewLi"))) {
          let value = puma(li).attr("value");
          if (this.isParent(value)) {
            let text2 = puma(li).find(".vrTreeViewItemText").attr("text");
            if (texts.includes(text2)) {
              puma(li).show();
              puma(li).find("ul").show();
              puma(li).find("li").show();
            }
          }
        }
      }
    }
  }
  isParent(value) {
    return this.getRootValues().includes(value);
  }
  focus() {
    let options = this.getOptions();
    if (options.filter !== false && puma(this.element()).find(".vrTreeViewFilter")[0] != null)
      puma(this.element()).find(".vrTreeViewFilter").focus();
  }
  value(value, triggerChange = true) {
    if (value === null) {
      this.clear();
      return null;
    }
    let options = this.getOptions();
    if (value != null) {
      if (!options.checkboxes)
        puma(this.element()).find(".vrTreeViewSelectedComboValue").removeClass("vrTreeViewSelectedComboValue");
      if (typeof value == "string" || typeof value == "number")
        value = [String(value)];
      let comboItem = null;
      if (Array.isArray(value)) {
        value = value.vrDistinct();
        value = value.vrToStringArrayList();
      } else {
        comboItem = new TreeViewItem();
        comboItem.text = value.text;
        comboItem.value = value.value;
        value = [comboItem.value];
      }
      let prevValue = UtilityManager.duplicate(this._value);
      this._value = [];
      for (let singleValue of value) {
        let singleItem = this.datasource().filter((k) => k.value == singleValue)[0];
        if (singleItem != null)
          this._value.push(singleItem.value);
      }
      this._checkedValues = value;
      puma(puma(this.container()).find(".vrTreeViewLi[value='" + value + "'] .vrTreeViewDivItemContainer")[0]).addClass("vrTreeViewSelectedComboValue");
      if (triggerChange) {
        let changingEvent = new TreeViewChangingEvent();
        if (options.onBeforeSelect != null) {
          let isParent = this.isParent(this._value[0]);
          let parentItem = null;
          if (isParent)
            parentItem = this.datasource().filter((k) => k.value == value)[0];
          changingEvent.sender = this;
          changingEvent.previousValue = prevValue;
          changingEvent.previousCheckedValues = prevValue;
          changingEvent.value = this._value[0];
          changingEvent.childrenValues = isParent ? this.getAllChildrenValues(parentItem) : [];
          changingEvent.checked = this._isChecked;
          changingEvent.isParent = isParent;
          options.onBeforeSelect(changingEvent);
        }
        if (!changingEvent.isDefaultPrevented())
          this.change();
        else
          this._value = prevValue;
      }
    }
    if (this._value == null)
      return null;
    else if (options.checkboxes === true)
      return this._value;
    else
      return this._value[0];
  }
  title(title) {
    if (title != null) {
      if (this._lblTitle != null)
        this._lblTitle.value(title);
    }
    return this._lblTitle != null ? this._lblTitle.value() : "";
  }
  clear(triggerChange = false) {
    let options = this.getOptions();
    puma(this.element()).find(".vrTreeViewSelectedComboValue").removeClass("vrTreeViewSelectedComboValue");
    this.unCheckAll(false);
    puma(this.element()).find("li").show();
    this._value = null;
    if (options.filter !== false && puma(this.element()).find(".vrTreeViewFilter")[0] != null)
      puma(this.element()).find(".vrTreeViewFilter")[0].value = "";
    if (triggerChange)
      this.change();
  }
  clearItems() {
    this._items = [];
    this.clear();
    puma(this.element()).find(".vrTreeViewUl").remove();
  }
  excelExport() {
    let options = this.getOptions();
    if (typeof options.export == "boolean")
      options.export = new TreeViewExportSettings();
    let exportSettings = options.export;
    if (exportSettings.numericValueTypeEnum == null) exportSettings.numericValueTypeEnum = TreeViewNumericTypeEnum.Default;
    if (exportSettings.decimalDigits == null) {
      if (exportSettings.numericValueTypeEnum == TreeViewNumericTypeEnum.Currency || exportSettings.numericValueTypeEnum == TreeViewNumericTypeEnum.Percentage)
        exportSettings.decimalDigits = 2;
      else
        exportSettings.decimalDigits = 0;
    }
    let generateExcelRequest = new GenerateExcelRequest();
    let dataSource = [];
    if (options.columns != null) {
      for (let data of this.datasource()) {
        let extraCells = [];
        for (let column of options.columns) {
          let extraCell = UtilityManager.duplicate(column);
          let textHTML = data[column.field];
          switch (column.type) {
            //#region Date, DateTime, Time
            case TreeViewColumnTypeEnum.Date:
            case TreeViewColumnTypeEnum.DateTime:
            case TreeViewColumnTypeEnum.Time:
              {
                if (column.type == TreeViewColumnTypeEnum.Date || column.type == TreeViewColumnTypeEnum.DateTime || column.type == TreeViewColumnTypeEnum.Time) {
                  if (column.type == TreeViewColumnTypeEnum.Date)
                    textHTML = textHTML == "" ? "" : new Date(new Date(textHTML)).vrToItalyString(DateModeEnum.Date);
                  else if (column.type == TreeViewColumnTypeEnum.DateTime)
                    textHTML = textHTML == "" ? "" : new Date(new Date(textHTML)).vrToItalyString(DateModeEnum.DateTime, column.showSeconds);
                  else if (column.type == TreeViewColumnTypeEnum.Time)
                    textHTML = textHTML == "" ? "" : new Date(new Date(textHTML)).vrToItalyString(DateModeEnum.Time, column.showSeconds);
                }
              }
              break;
            //#endregion
            //#region CheckBox
            case TreeViewColumnTypeEnum.Checkbox:
            case TreeViewColumnTypeEnum.Boolean:
              {
                textHTML = data[column.field] == true ? "true" : "false";
              }
              break;
          }
          extraCell.value = textHTML;
          extraCells.push(extraCell);
        }
        data.extraCells = extraCells;
        dataSource.push(data);
      }
    } else
      dataSource = this.datasource();
    generateExcelRequest.datasource = dataSource;
    generateExcelRequest.title = options.title;
    generateExcelRequest.sheetName = exportSettings.sheetName;
    generateExcelRequest.fileName = exportSettings.fileName != null ? exportSettings.fileName : "excel_" + (/* @__PURE__ */ new Date()).vrToItalyString().replace(/\//g, "");
    generateExcelRequest.AuthKey = "10(P9m+U3a@Mtt-Oeo";
    generateExcelRequest.numericValueTypeEnum = exportSettings.numericValueTypeEnum;
    generateExcelRequest.decimalDigits = exportSettings.decimalDigits;
    let jsonString = JSON.stringify(generateExcelRequest);
    let formDataMultipart = null;
    formDataMultipart = new FormData();
    formDataMultipart.append("file", new Blob([jsonString], { type: "application/json" }));
    showLoader();
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
        url: "/api/UtilityWebApi/GenerateExcelTreeView",
        success: (response, textStatus, jqXHR) => {
          hideLoader();
          if (response.downloadUrl != null && response.downloadUrl.length > 0)
            location.replace(response.downloadUrl);
          if (!response.Success)
            alert(response.ErrorMessage + "<br />" + response.StackTrace, { width: 600, css: "overflow: auto;" });
        },
        error: (response, textStatus, errorThrown) => {
          hideLoader();
          alert("Errore nell'esportazione Excel. Contattare l'assistenza.");
        }
      }
    );
  }
  //#region Columns
  column(field) {
    let options = this.getOptions();
    let column = options.columns.filter((k) => k.field == field)[0];
    let columnIndex = options.columns.indexOf(column);
    return options.columns[columnIndex];
  }
  columnTitle(field, title) {
    let column = this.column(field);
    if (column != null) {
      if (title != null) {
        column.title = title;
        puma(this._divTitle).find("div.vrTreeViewColumn[field='" + field + "']").find("label").html(title);
      }
      return column.title;
    } else
      return "";
  }
  showColumns(fields, update = true) {
    for (let field of fields)
      this.showColumn(field, false);
    if (update)
      this.update();
  }
  showColumn(field, update = true) {
    puma(this._divTitle).find("div.vrTreeViewColumn[field='" + field + "']").show();
    puma(this._divContent).find("div.vrTreeViewDivItemContainer .vrTreeViewColumnItem[field='" + field + "']").show();
    this.column(field).hidden = false;
    if (update)
      this.update();
  }
  hideColumns(fields, update = true) {
    for (let field of fields)
      this.hideColumn(field, false);
    if (update)
      this.update();
  }
  hideColumn(field, update = true) {
    puma(this._divTitle).find("div.vrTreeViewColumn[field='" + field + "']").hide();
    puma(this._divContent).find("div.vrTreeViewColumnItem[field='" + field + "']").hide();
    this.column(field).hidden = true;
    if (update)
      this.update();
  }
  showOnlyThisColumns(fieldList, update = true) {
    let options = this.getOptions();
    for (let column of options.columns)
      this.hideColumn(column.field, false);
    for (let field of fieldList)
      this.showColumn(field, false);
    if (update)
      this.update();
  }
  widthColumns() {
    let widthColumns = 0;
    let options = this.getOptions();
    if (options.columns != null) {
      for (let column of options.columns) {
        if (column.hidden === true)
          continue;
        widthColumns += column.width != null ? column.width : 100;
      }
    }
    return widthColumns;
  }
  //#endregion
  //#region Check
  checkAll(triggerChange = true) {
    this._checkedValues = this.datasource().map((k) => k.value);
    this._checkedValues = this._checkedValues.vrDistinct();
    this.value(this.datasource().map((k) => k.value), triggerChange);
  }
  unCheckAll(triggerChange = true) {
    this._checkedValues = [];
    puma(this.element()).find(".vrTreeViewSelectedComboValue").removeClass("vrTreeViewSelectedComboValue");
    puma(this.element()).find("input").removeClass("indeterminateVrCheckbox");
    for (let input of Array.from(puma(this.element()).find("input"))) {
      puma(input).prop("checked", false);
      input.checked = false;
    }
    this.value([], triggerChange);
  }
  //#endregion
  //#region Context menu
  createContextMenu() {
    let options = this.getOptions();
    if (options.contextMenuItems.length == 0)
      return;
    if (this._divContextMenu == null)
      this._divContextMenu = div(document.body, { class: "vrTreeViewContextMenu", id: this.element().id + "_divPopup" });
    for (let contextMenuItem of options.contextMenuItems) {
      let divContextMenuItem = div(this._divContextMenu, { class: "vrTreeViewContextMenuItem" });
      if (contextMenuItem.separator === true) {
        createSeparator({
          orientation: OrientationEnum.Horizontal,
          cssContainer: "display: flex !important; margin-top: 5px !important; margin-bottom: 5px !important;"
        }, divContextMenuItem);
        divContextMenuItem.style.cssText += "padding-bottom: 0px;";
        continue;
      }
      if (contextMenuItem.icon != null)
        icon(contextMenuItem.icon, divContextMenuItem, { css: "margin-right: 5px;" });
      createLabel({
        text: contextMenuItem.text,
        cssContainer: "cursor: pointer;",
        css: "cursor: pointer;"
      }, divContextMenuItem);
      if (contextMenuItem.onClick != null) {
        puma(divContextMenuItem).on("click", (e) => {
          if (contextMenuItem.confirmationMessage != null) {
            confirm(contextMenuItem.confirmationMessage).then(() => {
              this.clickOnContextMenuItem(contextMenuItem);
            });
          } else
            this.clickOnContextMenuItem(contextMenuItem);
        });
      }
    }
  }
  clickOnContextMenuItem(contextMenuItem) {
    let event = new TreeViewContextMenuClickEvent();
    event.sender = this;
    event.text = contextMenuItem.text;
    event.value = contextMenuItem.value;
    event.dataItem = this._dataItemContextMenu;
    event.targets = this._dictionaryValueLi.get(this._dataItemContextMenu.value);
    contextMenuItem.onClick(event);
    this.closeContextMenu();
  }
  showContextMenu(dataItem, leftPosition, topPosition) {
    this.createContextMenu();
    if (this._divContextMenu != null) {
      this._dataItemContextMenu = dataItem;
      puma(this._divContextMenu).show(200);
      puma(this._divContextMenu).offset({ left: leftPosition, top: topPosition });
      let zIndex = puma(this._divContextMenu).css("z-index") - 1;
      let background = puma("<div class='vrTreeViewBackground' id='vrTreeViewBackground_" + this.element().id + "' style='background-color: transparent; display: block; z-index: " + zIndex + ";'></div>").vrAppendToPuma(this.container())[0];
      puma(background).click((e) => this.closeContextMenu());
      puma(background).on("contextmenu", (e) => {
        e.preventDefault();
        return false;
      });
    }
  }
  closeContextMenu() {
    if (this._divContextMenu != null) {
      puma(this.container()).find(".vrTreeViewDivItemContainer").removeClass("hover");
      puma(this.container()).find(".vrTreeViewBtnContextMenu").parent().remove();
      this._dataItemContextMenu = null;
      puma(this._divContextMenu).remove();
      this._divContextMenu = null;
      puma("#vrTreeViewBackground_" + this.element().id).remove();
    }
  }
  //#endregion
  //#region Manage rows
  updateRow(dataItem, rebind = true) {
    let options = this.getOptions();
    let dataItemId = dataItem[options.dataSourceFieldId];
    let itemDatasource = this.datasource().filter((k) => k[options.dataSourceFieldId] == dataItemId)[0];
    let itemDatasourceIndex = this.datasource().indexOf(itemDatasource);
    if (itemDatasource != null) {
      this.datasource()[itemDatasourceIndex] = dataItem;
      if (typeof rebind == "boolean") {
        if (rebind === true)
          this.update();
      } else if (rebind.onlyText) {
        let li = this._dictionaryValueLi.get(dataItemId);
        puma(li).find(".vrTreeViewSpanValue")[0].innerHTML = dataItem.text;
      }
    }
  }
  updateRows(dataItems, rebind = true) {
    for (let dataItem of dataItems)
      this.updateRow(dataItem, false);
    if (rebind)
      this.update();
  }
  addItem(item, rebind = true) {
    let parentItem = this.datasource().filter((k) => k.value == item.parentValue)[0];
    if (parentItem != null) {
      let childrenItems = this.getOnlyChildrenItems(parentItem);
      childrenItems.push(item);
      this.datasource().push(item);
      let liDestination = this._dictionaryValueLi.get(parentItem.value)[0];
      this.manageAddUpdateItem(childrenItems, liDestination, rebind);
    }
  }
  updateItem(item, rebind = true) {
    let parentItem = this.datasource().filter((k) => k.value == item.parentValue)[0];
    if (parentItem != null) {
      let childrenItems = this.getOnlyChildrenItems(parentItem);
      childrenItems.vrDeleteAllBy((k) => k.value == item.value);
      childrenItems.push(item);
      this.updateRow(item, false);
      let liDestination = this._dictionaryValueLi.get(parentItem.value)[0];
      this.manageAddUpdateItem(childrenItems, liDestination, rebind);
    }
  }
  manageAddUpdateItem(childrenItems, liDestination, rebind = true) {
    let ul = puma(liDestination).find("ul");
    ul.remove();
    this.drawItems(childrenItems, liDestination);
    puma(liDestination).find("ul").show();
    if (rebind)
      this.rebind();
  }
  deleteItem(value) {
    this.datasource().vrDeleteAllBy((k) => k.value == value);
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
    return ControlManager.get("treeView-" + value + "_" + this.element().id);
  }
  showToolbarItem(value) {
    this.toolbarItem(value).show();
  }
  hideToolbarItem(value) {
    this.toolbarItem(value).hide();
  }
  enableToolbarItem(value) {
    this.toolbarItem(value).enable();
  }
  disableToolbarItem(value) {
    this.toolbarItem(value).disable();
  }
  removeToolbarItem(value) {
    let item = this.toolbarItem(value);
    puma(item.container()).remove();
  }
  addToolbarItem(toolbarItem) {
    if (toolbarItem.visible == null) toolbarItem.visible = true;
    if (toolbarItem.type == null) toolbarItem.type = TreeViewToolbarItemType.Custom;
    let text = "";
    let iconClass = void 0;
    let buttonClass = "";
    let enabled = true;
    let vrButton = false;
    if (toolbarItem.css == null) toolbarItem.css = "";
    if (toolbarItem.cssContainer == null) toolbarItem.cssContainer = "";
    let toolbarItemValue = toolbarItem.value == null ? toolbarItem.text != null ? toolbarItem.text.replace(/[^a-z0-9\s]/gi, "").replace(/[_\s]/g, "") : "noValue" : toolbarItem.value;
    switch (toolbarItem.type) {
      case TreeViewToolbarItemType.Custom:
        {
          text = toolbarItem.text != null ? toolbarItem.text : "";
          iconClass = toolbarItem.icon != null ? toolbarItem.icon : void 0;
          buttonClass = "treeView-" + toolbarItemValue;
          vrButton = true;
        }
        break;
      case TreeViewToolbarItemType.SplitButton:
        {
          text = toolbarItem.text != null ? toolbarItem.text : "";
          iconClass = toolbarItem.icon != null ? toolbarItem.icon : void 0;
          vrButton = false;
        }
        break;
      case TreeViewToolbarItemType.Switch:
      case TreeViewToolbarItemType.ButtonGroup:
      case TreeViewToolbarItemType.CheckBox:
      case TreeViewToolbarItemType.ComboBox:
      case TreeViewToolbarItemType.DatePicker:
      case TreeViewToolbarItemType.Label:
      case TreeViewToolbarItemType.TextBox:
        {
          vrButton = false;
        }
        break;
      case TreeViewToolbarItemType.Excel:
        {
          text = toolbarItem.text != null ? toolbarItem.text : "Excel";
          iconClass = toolbarItem.icon != null ? toolbarItem.icon : IconClassicLight.FileExcel;
          buttonClass = toolbarItem.value != null ? "treeView-" + toolbarItem.value : "treeView-excel";
          vrButton = true;
          toolbarItem.backgroundColor = "#008a00";
          toolbarItem.textColor = "#FFF";
        }
        break;
      case TreeViewToolbarItemType.Separator:
        {
          buttonClass = toolbarItem.value != null ? "treeView-" + toolbarItem.value : "treeView-separator";
          enabled = false;
          vrButton = true;
        }
        break;
      case TreeViewToolbarItemType.Rebind:
        {
          text = toolbarItem.text != null ? toolbarItem.text : "Aggiorna";
          iconClass = toolbarItem.icon != null ? toolbarItem.icon : IconClassicLight.Refresh;
          buttonClass = toolbarItem.value != null ? "treeView-" + toolbarItem.value : "treeView-rebind";
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
          classContainer: "treeView-toolbarItemsContainer " + (toolbarItem.classContainer != null ? toolbarItem.classContainer : ""),
          class: (toolbarItem.type == TreeViewToolbarItemType.Separator ? "treeView-separator" : "") + " treeView-toolbarItems " + buttonClass,
          badgeSettings: toolbarItem.badge,
          onClick: (e) => {
            let toolbarClickEvent = new TreeViewToolbarClickEvent();
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
        buttonClass + "_" + this.element().id
      );
    } else {
      if (toolbarItem.type == TreeViewToolbarItemType.SplitButton) {
        let value = toolbarItem.value != null ? toolbarItem.value : "splitButton";
        if (toolbarItem.value == null && toolbarItem.text != null)
          value = toolbarItem.text.replace(/[^a-z0-9\s]/gi, "").replace(/[_\s]/g, "") + "splitButton";
        let itemClass = "treeView-" + value;
        createSplitButton(
          {
            text,
            icon: iconClass,
            imageUrl: toolbarItem.imageUrl,
            items: toolbarItem.splitButtonItems,
            visible: toolbarItem.visible,
            cssContainer: toolbarItem.cssContainer + " vertical-align: top;",
            css: toolbarItem.css,
            classContainer: "treeView-toolbarItemsContainer " + (toolbarItem.classContainer != null ? toolbarItem.classContainer : ""),
            class: "treeView-toolbarItems treeView-splitButton " + itemClass,
            onClick: toolbarItem.onClick == null ? void 0 : (e) => {
              let toolbarClickEvent = new TreeViewToolbarClickEvent();
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
          itemClass + "_" + this.element().id
        );
      }
      if (toolbarItem.type == TreeViewToolbarItemType.ButtonGroup) {
        let itemClass = "treeView-" + (toolbarItem.value != null ? toolbarItem.value : "buttonGroup");
        createButtonGroup(
          {
            selectionMode: SelectionModeEnum.Single,
            items: toolbarItem.buttonGroupItems,
            visible: toolbarItem.visible,
            cssContainer: "top: -1px; " + toolbarItem.cssContainer,
            css: toolbarItem.css,
            classContainer: "treeView-toolbarItemsContainer " + toolbarItem.classContainer,
            class: "treeView-toolbarItems treeView-buttonGroup " + itemClass,
            width: "auto",
            onSelect: (e) => {
              let toolbarClickEvent = new TreeViewToolbarClickEvent();
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
          itemClass + "_" + this.element().id
        );
      }
      if (toolbarItem.type == TreeViewToolbarItemType.CheckBox) {
        let itemClass = "treeView-" + (toolbarItem.value != null ? toolbarItem.value : "checkbox");
        createCheckBox(
          {
            text: toolbarItem.text,
            visible: toolbarItem.visible,
            cssContainer: "top: 3px; " + toolbarItem.cssContainer,
            css: toolbarItem.css,
            classContainer: "treeView-toolbarItemsContainer " + toolbarItem.classContainer,
            class: "treeView-toolbarItems treeView-checkBox " + itemClass,
            onCheck: (e) => {
              let toolbarClickEvent = new TreeViewToolbarClickEvent();
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
          itemClass + "_" + this.element().id
        );
      }
      if (toolbarItem.type == TreeViewToolbarItemType.Label) {
        let itemClass = "treeView-" + (toolbarItem.value != null ? toolbarItem.value : "label");
        createLabel(
          {
            text: toolbarItem.text,
            visible: toolbarItem.visible,
            cssContainer: toolbarItem.cssContainer,
            css: toolbarItem.css,
            classContainer: "treeView-toolbarItemsContainer " + toolbarItem.classContainer,
            class: "treeView-toolbarItems treeView-label " + itemClass,
            colorSettings: {
              background: toolbarItem.backgroundColor,
              textColor: toolbarItem.textColor
            },
            onClick: (e) => {
              let toolbarClickEvent = new TreeViewToolbarClickEvent();
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
          itemClass + "_" + this.element().id
        );
      }
      if (toolbarItem.type == TreeViewToolbarItemType.ComboBox) {
        let itemClass = "treeView-" + (toolbarItem.value != null ? toolbarItem.value : "comboBox");
        if (toolbarItem.comboBoxOptions == null) toolbarItem.comboBoxOptions = new ComboBoxOptions();
        toolbarItem.comboBoxOptions.classContainer = "treeView-toolbarItemsContainer " + toolbarItem.comboBoxOptions.classContainer;
        toolbarItem.comboBoxOptions.class = "treeView-toolbarItems treeView-comboBox " + itemClass + " " + toolbarItem.comboBoxOptions.class;
        if (toolbarItem.comboBoxOptions.visible == null) toolbarItem.comboBoxOptions.visible = toolbarItem.visible;
        if (toolbarItem.comboBoxOptions.css == null) toolbarItem.comboBoxOptions.css = toolbarItem.css;
        if (toolbarItem.comboBoxOptions.cssContainer == null) toolbarItem.comboBoxOptions.cssContainer = toolbarItem.cssContainer + ";";
        toolbarItem.comboBoxOptions.cssContainer += "vertical-align: top;";
        createComboBox(toolbarItem.comboBoxOptions, this._divToolbar, null, itemClass + "_" + this.element().id);
      }
      if (toolbarItem.type == TreeViewToolbarItemType.DatePicker) {
        let itemClass = "treeView-" + (toolbarItem.value != null ? toolbarItem.value : "datePicker");
        if (toolbarItem.datePickerOptions == null) toolbarItem.datePickerOptions = new DatePickerOptions();
        toolbarItem.datePickerOptions.classContainer = "treeView-toolbarItemsContainer " + toolbarItem.datePickerOptions.classContainer;
        toolbarItem.datePickerOptions.class = "treeView-toolbarItems treeView-datePicker " + itemClass + " " + toolbarItem.datePickerOptions.class;
        if (toolbarItem.datePickerOptions.visible == null) toolbarItem.datePickerOptions.visible = toolbarItem.visible;
        if (toolbarItem.datePickerOptions.css == null) toolbarItem.datePickerOptions.css = toolbarItem.css;
        if (toolbarItem.datePickerOptions.cssContainer == null) toolbarItem.datePickerOptions.cssContainer = toolbarItem.cssContainer;
        toolbarItem.datePickerOptions.cssContainer += "top: -1px; " + toolbarItem.datePickerOptions.cssContainer;
        createDatePicker(toolbarItem.datePickerOptions, this._divToolbar, null, itemClass + "_" + this.element().id);
      }
      if (toolbarItem.type == TreeViewToolbarItemType.TextBox) {
        let itemClass = "treeView-" + (toolbarItem.value != null ? toolbarItem.value : "textBox");
        if (toolbarItem.textBoxOptions == null) toolbarItem.textBoxOptions = new TextBoxOptions();
        toolbarItem.textBoxOptions.classContainer = "treeView-toolbarItemsContainer " + toolbarItem.textBoxOptions.classContainer;
        toolbarItem.textBoxOptions.class = "treeView-toolbarItems treeView-textBox " + itemClass + " " + toolbarItem.textBoxOptions.class;
        if (toolbarItem.textBoxOptions.visible == null) toolbarItem.textBoxOptions.visible = toolbarItem.visible;
        if (toolbarItem.textBoxOptions.css == null) toolbarItem.textBoxOptions.css = toolbarItem.css;
        if (toolbarItem.textBoxOptions.cssContainer == null) toolbarItem.textBoxOptions.cssContainer = toolbarItem.cssContainer;
        toolbarItem.textBoxOptions.cssContainer += "top: -1px; " + toolbarItem.textBoxOptions.cssContainer;
        createTextBox(toolbarItem.textBoxOptions, this._divToolbar, null, itemClass + "_" + this.element().id);
      } else if (toolbarItem.type == TreeViewToolbarItemType.Switch) {
        if (toolbarItem.switchSettings == null) {
          toolbarItem.switchSettings = new TreeViewToolbarSwitchSettings();
          toolbarItem.switchSettings.labelOff = "";
          toolbarItem.switchSettings.labelOn = "";
        }
        if (toolbarItem.switchSettings.checked == null) toolbarItem.switchSettings.checked = false;
        let itemClass = "treeView-" + (toolbarItem.value != null ? toolbarItem.value : "switch");
        puma(this._divToolbar).vrAppendPuma("<div id='" + itemClass + "_" + this.element().id + "' class='treeView-toolbarItems-switch'></div>");
        createSwitch(
          {
            labelOff: toolbarItem.switchSettings.labelOff,
            labelOn: toolbarItem.switchSettings.labelOn,
            checked: toolbarItem.switchSettings.checked,
            cssContainer: "top: -2px; " + toolbarItem.cssContainer,
            css: toolbarItem.css,
            classContainer: "treeView-toolbarItemsContainer " + toolbarItem.classContainer,
            visible: toolbarItem.visible,
            onChange: (e) => {
              if (toolbarItem.switchSettings.onCheck != null) {
                let tableSwitchEvent = new TreeViewToolbarSwitchEvent();
                tableSwitchEvent.checked = e.checked;
                toolbarItem.switchSettings.onCheck(tableSwitchEvent);
              }
            }
          },
          null,
          null,
          itemClass + "_" + this.element().id
        );
      }
    }
  }
  toolbarCustomLogic(toolbarItem, toolbarClickEvent) {
    switch (toolbarItem.type) {
      case TreeViewToolbarItemType.Rebind:
        {
          this.rebind();
        }
        break;
      case TreeViewToolbarItemType.Excel:
        {
          this.excelExport();
        }
        break;
    }
    if (toolbarItem.onClick != null)
      toolbarItem.onClick(toolbarClickEvent);
  }
  //#endregion
  //#region WebApi
  doWebApiCall(request, requestType, promiseCallback) {
    let json = {};
    json.AuthKey = request.authKey;
    if (requestType == 1 || requestType == 3) {
      if (requestType == 1) {
        if (request.itemsPropertyName == null)
          request.itemsPropertyName = "items";
      }
    }
    if (!request.method.startsWith("/api/")) {
      if (request.method.startsWith("/"))
        request.method.substring(1);
      request.method = "/api/" + request.method;
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
    if (typeof request.loadingElement == "boolean") {
      if (request.loadingElement === false) request.loadingElement = void 0;
      else request.loadingElement = document.body;
    }
    showLoader(request.tempLoadingElement != null ? request.tempLoadingElement : request.loadingElement);
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
        hideLoader();
        if (response != null && (response.Success || response.success)) {
          let successMessage = request.successNotificationMessage;
          successMessage = successMessage == null ? false : successMessage;
          if (typeof successMessage == "string")
            successMessage = successMessage;
          if (typeof successMessage == "string")
            notify(successMessage);
          let rebindAfterSave = request.rebindGridAfterSave;
          rebindAfterSave = rebindAfterSave == null ? false : rebindAfterSave;
          if (rebindAfterSave)
            this.rebind();
          if (request.callbackBeforeDatasourceChange != null)
            request.callbackBeforeDatasourceChange(response);
          if (requestType == 1 && response[request.itemsPropertyName] != null)
            this.datasource(response[request.itemsPropertyName]);
          if (request.callback != null)
            request.callback(response);
          if (promiseCallback != null)
            promiseCallback();
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
            notify(typeof errorMessage == "string" ? errorMessage : response != null ? response.ExceptionMessage || response.exceptionMessage : "Errore nel salvataggio");
          let rebindAfterError = request.rebindGridAfterError;
          rebindAfterError = rebindAfterError == null ? false : rebindAfterError;
          if (rebindAfterError)
            this.rebind();
          request.closeWindowAfterError;
          if (request.errorCallback != null)
            request.errorCallback(response != null ? response.ExceptionMessage || response.exceptionMessage : "Errore nel salvataggio");
        }
      },
      error: (response, textStatus, errorThrown) => {
        hideLoader();
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
          notify(finalMessage);
        }
        let rebindAfterError = request.rebindGridAfterError;
        rebindAfterError = rebindAfterError == null ? false : rebindAfterError;
        if (rebindAfterError)
          this.rebind();
        request.closeWindowAfterError;
        if (request.errorCallback != null)
          request.errorCallback(finalMessage);
      }
    });
  }
  //#endregion
  //#region Events
  change(callBack) {
    let changeCallBack = this.getOptions().onAfterSelect;
    if (changeCallBack != null) {
      let options = this.getOptions();
      let value = options.checkboxes && this._tempCheckedValue != null ? this._tempCheckedValue : this.value();
      let isParent = this.isParent(value);
      let parentItem = null;
      if (isParent)
        parentItem = this.datasource().filter((k) => k.value == value)[0];
      let changeEvent = new TreeViewChangeEvent();
      changeEvent.sender = this;
      changeEvent.value = value;
      changeEvent.childrenValues = isParent ? this.getAllChildrenValues(parentItem) : [];
      changeEvent.selectedItem = this.getSelectedItem();
      changeEvent.checked = this._isChecked;
      changeEvent.isParent = isParent;
      changeCallBack(changeEvent);
    }
    if (callBack != null)
      callBack();
  }
  //#endregion
  getOptions() {
    return this.options();
  }
  //#endregion
}
class TreeViewTemplateEvent {
  sender;
  dataItem;
  container;
}
class TreeViewEvent extends VrControlsEvent {
  sender;
  value;
  childrenValues;
  selectedItem;
  checked;
  isParent;
}
class TreeViewChangeEvent extends TreeViewEvent {
}
class TreeViewChangingEvent extends TreeViewEvent {
  previousValue;
  previousCheckedValues;
}
class TreeViewContextMenuClickEvent extends VrControlsEvent {
  sender;
  text;
  value;
  dataItem;
  targets;
}
class TreeViewDoubleClickEvent extends VrControlsEvent {
  sender;
  text;
  value;
  dataItem;
}
class TreeViewEditEvent extends VrControlsEvent {
  sender;
  text;
  value;
  dataItem;
}
class TreeViewDragEvent extends VrControlsEvent {
  sender;
  target;
  source;
  destination;
}
class TreeViewDragStartEvent extends TreeViewDragEvent {
}
class TreeViewDragMoveEvent extends TreeViewDragEvent {
}
class TreeViewDragEndEvent extends TreeViewDragEvent {
}
class TreeViewExportSettings {
  fileName;
  sheetName;
  numericValueTypeEnum;
  decimalDigits;
}
class GenerateExcelRequest {
  sheetName;
  fileName;
  AuthKey;
  datasource;
  numericValueTypeEnum;
  decimalDigits;
  title;
}
class TempRebindInfo {
  yPosition;
  selectedValue;
  parentExpandedValueList;
}
class TreeViewHeaderAndCellSettings {
  textAlign;
  backgroundColor;
  color;
  css;
}
class TreeViewCellSettings extends TreeViewHeaderAndCellSettings {
  zeroIfNull;
}
export {
  TreeView,
  TreeViewCellSettings,
  TreeViewContextMenuClickEvent,
  TreeViewHeaderAndCellSettings,
  TreeViewOptions
};
//# sourceMappingURL=treeView.js.map
