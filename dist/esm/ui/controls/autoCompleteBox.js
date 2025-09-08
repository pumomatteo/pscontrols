import { UtilityManager } from "../../managers/utilityManager.js";
import { VrControl, VrControlOptions, VrControlsEvent } from "../common.js";
import { AutoCompleteBoxItemSettings, ComboBoxTreeModeEnum, ControlTypeEnum, puma, span, createTextBox, AutoCompleteBoxItem, div, createIcon, IconClassicRegular, WebApiModeEnum, KeyEnum, IconClassicLight, shadowRoot } from "../vr.js";
class AutoCompleteBoxOptions extends VrControlOptions {
  value;
  rows;
  placeholder;
  border;
  itemSettings;
  comboSettings;
  tooltip;
  onItemClick;
  onItemAdded;
  onItemRemoved;
  onFocus;
  onBlur;
}
class AutoCompleteBox extends VrControl {
  //#region Variables
  _txtInput;
  _spanForWidth;
  _items;
  _comboItems;
  _popup;
  _lastAjaxCallGuid;
  _typedTextWebService;
  _dictionaryValueLi;
  _dictionaryLiValue;
  //#endregion
  constructor(element, options) {
    if (options == null)
      options = new AutoCompleteBoxOptions();
    if (options.width == null) options.width = 300;
    if (options.border == null) options.border = true;
    if (options.tooltip == null) options.tooltip = true;
    if (options.itemSettings == null) options.itemSettings = new AutoCompleteBoxItemSettings();
    if (options.itemSettings.backgroundColor == null) options.itemSettings.backgroundColor = "#FFF";
    if (options.itemSettings.textColor == null) options.itemSettings.textColor = "#5f6368";
    if (options.itemSettings.border == null) options.itemSettings.border = "solid 1px #dadce0";
    if (options.itemSettings.bold == null) options.itemSettings.bold = false;
    if (options.itemSettings.deleteIconColor == null) options.itemSettings.deleteIconColor = "rgb(140 140 140)";
    if (options.comboSettings != null) {
      if (options.comboSettings.freeText == null) options.comboSettings.freeText = true;
      if (options.comboSettings.treeMode == null) options.comboSettings.treeMode = ComboBoxTreeModeEnum.AllExpanded;
    }
    super(element, options, ControlTypeEnum.AutoCompleteBox);
    puma(this.element()).attr("tabindex", "1");
    this._spanForWidth = span(this.element(), { css: "visibility: hidden;" });
    this._popup = puma("<div class='comboBox_divPopup vrPopup' id='" + element.id + "_divPopup' style='border: solid 1px #ccc; display: none; position: absolute;  border-radius: 4px; box-shadow: 0 5px 10px rgb(0 0 0 / 20%); padding: 5px; overflow-y: auto; z-index: 9999999;  background-color: #fff; height: fit-content;'></div>").vrAppendToPuma(shadowRoot() != null ? shadowRoot() : document.body)[0];
    this._items = [];
    if (options.border)
      this.element().style.cssText += "border: solid 1px #ccc;";
    let timeout = 0;
    this._txtInput = createTextBox({
      cssContainer: "width: auto !important;",
      css: "width: 20px; min-width: 20px !important; max-width: " + this.width() + "px; padding-left: 0px; padding-right: 0px;",
      onKeyUp: (e) => {
        if (e.key == KeyEnum.ArrowRight || e.key == KeyEnum.ArrowLeft || e.key == KeyEnum.ArrowUp || e.key == KeyEnum.Control || e.ctrlKey) {
          if (!(e.key == "v" && e.ctrlKey)) {
            this.manageInputWidth();
            e.preventDefault();
            return;
          }
        }
        if (options.comboSettings != null) {
          clearTimeout(timeout);
          timeout = window.setTimeout(() => {
            let text = String(e.value);
            if (options.comboSettings == null || options.comboSettings.webService == null) {
              let filteredItems = this.filter(text, this.element());
              if (filteredItems.length > 0)
                this.open();
              else
                this.close();
              if (e.key == "v" && e.ctrlKey && filteredItems.length == 1) {
                this.valueCombo(String(filteredItems[0].value));
                this.close();
              }
            } else if (options.comboSettings.webService != null) {
              if (e.key != KeyEnum.Enter) {
                if (text == "") {
                  this._items = [];
                  puma(this._popup).find("ul").remove();
                  return;
                } else {
                  let selectionStart = this.element().selectionStart;
                  let selectionEnd = this.element().selectionEnd;
                  if (!(selectionStart == 0 && selectionEnd == this.element().value.length))
                    this.doAjaxCall(text);
                }
              }
            }
          }, 300);
        }
      },
      onEnterKey: (e) => {
        if (options.comboSettings != null) {
          if (options.comboSettings.freeText)
            this.manageInput(e.sender, e.sender.value());
          else {
            this._txtInput.clear();
            this.placeholder(options.placeholder);
          }
        } else
          this.manageInput(e.sender, e.sender.value());
      },
      onKeyDown: (e) => {
        this.manageInputWidth();
        if (options.comboSettings != null && e.key == KeyEnum.ArrowDown) {
          let li = puma(this._popup).find("li:visible").first();
          li.focus();
        }
      },
      onBlur: (e) => {
        if (this._txtInput.value() != "" && !$(this._popup).is(":visible")) {
          this.manageInput(this._txtInput, this._txtInput.value());
          this.blurEvent();
        }
      }
    }, this.element());
    if (options.comboSettings != null && options.comboSettings.items != null)
      this.comboItems(options.comboSettings.items);
    puma(this.element()).on("focus", (e) => this.focus());
    if (options.placeholder != null)
      this.placeholder(options.placeholder);
    if (options.value != null)
      this.items(options.value);
    if (options.rows != null) {
      let maxHeight = 0;
      for (let i = 0; i < options.rows; i++) {
        if (i == 0) maxHeight += 27;
        else maxHeight += 22;
      }
      this.element().style.cssText += "max-height: " + maxHeight + "px;";
    }
    let baseListener = shadowRoot() != null ? shadowRoot() : document;
    baseListener.addEventListener("scroll", (e) => {
      if (!puma(e.target).hasClass("comboBox_divPopup") && puma(this._popup).is(":visible"))
        this.close();
    }, true);
  }
  //#region ManageInput
  manageInput(sender, text, value) {
    let options = this.getOptions();
    sender.clear();
    this.placeholder(options.placeholder);
    if (text != "") {
      for (let txt of text.split(",")) {
        let item = new AutoCompleteBoxItem();
        item.text = txt.trim();
        if (value != null) item.value = value;
        this.addItem(item);
      }
    }
    puma(this._txtInput.container()).vrAppendToPuma(this.element());
    window.setTimeout(() => this.focus());
    this.close();
  }
  manageInputWidth() {
    let options = this.getOptions();
    let value = this._txtInput.value();
    if (value != "")
      this._txtInput.element().style.width = this.textWidth(value) + 20 + "px";
    else
      this.placeholder(options.placeholder);
  }
  //#endregion
  //#region Items
  items(items) {
    if (items != null) {
      for (let item of items)
        this.addItem(item);
    }
    return this._items;
  }
  addItem(item) {
    if (item == null || item == "")
      return;
    let options = this.getOptions();
    this.placeholder("");
    let realItem = item;
    if (typeof item == "string") {
      realItem = new AutoCompleteBoxItem();
      realItem.text = item;
      realItem.value = item;
    }
    if (realItem.value == null)
      realItem.value = realItem.text;
    let divItem = div(this.element(), { class: "vrAutoCompleteBoxItem", attributes: [{ name: "value", value: realItem.value }] });
    let spanItemText = span(divItem, { content: realItem.text, class: "vrAutoCompleteBoxItemText" });
    if (options.tooltip)
      puma(divItem).attr("title", realItem.text);
    let backgroundColor = options.itemSettings.backgroundColor;
    let textColor = options.itemSettings.textColor;
    let border = options.itemSettings.border;
    let bold = options.itemSettings.bold;
    let deleteIconColor = options.itemSettings.deleteIconColor;
    let maxWidth = options.itemSettings.maxWidth;
    if (realItem.settings != null) {
      if (realItem.settings.backgroundColor != null) backgroundColor = realItem.settings.backgroundColor;
      if (realItem.settings.textColor != null) textColor = realItem.settings.textColor;
      if (realItem.settings.border != null) border = realItem.settings.border;
      if (realItem.settings.bold != null) bold = realItem.settings.bold;
      if (realItem.settings.deleteIconColor != null) deleteIconColor = realItem.settings.deleteIconColor;
      if (realItem.settings.maxWidth != null) maxWidth = realItem.settings.maxWidth;
    }
    divItem.style.cssText += "background-color: " + backgroundColor + "; color: " + textColor + "; border: " + border + ";";
    if (bold)
      divItem.style.cssText += "font-weight: 600;";
    if (maxWidth != null)
      spanItemText.style.cssText += "max-width: " + maxWidth + "px;";
    puma(divItem).on("click", (e) => {
      if (options.onItemClick != null) {
        let itemClickEvent = new AutoCompleteBoxItemClickEvent();
        itemClickEvent.sender = this;
        itemClickEvent.item = { item: realItem, element: divItem };
        itemClickEvent.text = realItem.text;
        options.onItemClick(itemClickEvent);
        if (itemClickEvent.isDefaultPrevented()) {
          e.preventDefault();
          return;
        }
      }
      puma(this._txtInput.container()).vrInsertBeforePuma(divItem);
      this.removeItem(realItem.value);
      let width = this.textWidth(realItem.text);
      this._txtInput.value(realItem.text, false);
      this._txtInput.element().style.width = width + 20 + "px";
      this._txtInput.element().select();
      this.focus();
    });
    createIcon({
      value: IconClassicRegular.Xmark,
      cssContainer: "margin-left: 5px; top: -1px;",
      color: deleteIconColor,
      onClick: (e) => this.removeItem(realItem.value)
    }, divItem);
    puma(divItem).vrInsertBeforePuma(this._txtInput.container());
    if (realItem.value != null)
      puma(divItem).attr("value", realItem.value);
    this._items.push(realItem);
    if (options.onItemAdded != null) {
      let itemAddedEvent = new AutoCompleteBoxItemAddedEvent();
      itemAddedEvent.sender = this;
      itemAddedEvent.item = { item: realItem, element: divItem };
      options.onItemAdded(itemAddedEvent);
    }
  }
  removeItem(value) {
    this._items.vrDeleteAllBy((k) => k.value == value);
    puma(this.container()).find(".vrAutoCompleteBoxItem[value='" + value + "']").remove();
    let options = this.getOptions();
    if (this.items().length == 0)
      this.placeholder(options.placeholder);
    if (options.onItemRemoved != null) {
      let itemAddedEvent = new AutoCompleteBoxItemAddedEvent();
      itemAddedEvent.sender = this;
      itemAddedEvent.item = this.item(value);
      options.onItemRemoved(itemAddedEvent);
    }
  }
  item(value) {
    let item = new AutoCompleteBoxItemInfo();
    let realItem = this._items.filter((k) => k.value == value)[0];
    let index = this.items().indexOf(realItem);
    item.item = this.items()[index];
    item.element = puma(this.container()).find(".vrAutoCompleteBoxItem[value='" + value + "']")[0];
    return item;
  }
  //#endregion
  //#region Color
  color(value, settings) {
    let item = this.item(value);
    if (item.element != null && settings != null) {
      if (settings.backgroundColor != null) item.element.style.cssText += "background-color: " + settings.backgroundColor + ";";
      if (settings.textColor != null) item.element.style.cssText += "color: " + settings.textColor + ";";
      if (settings.border != null) item.element.style.cssText += "border: " + settings.border + ";";
      if (settings.bold) item.element.style.cssText += "font-weight: 600;";
    }
  }
  //#endregion
  //#region Value
  text() {
    return this.items().map((k) => k.text);
  }
  value(items) {
    if (items != null)
      this.items(items);
    return this.items().map((k) => k.value);
  }
  placeholder(value) {
    if (value != null) {
      let width = this.textWidth(value);
      this._txtInput.element().placeholder = value;
      this._txtInput.element().style.width = width + 20 + "px";
    }
    return this._txtInput.element().placeholder;
  }
  //#endregion
  //#region Other
  textWidth(value) {
    let width = 0;
    this._spanForWidth.innerHTML = value.replace(/\s/g, "&nbsp;");
    width = this._spanForWidth.offsetWidth;
    this._spanForWidth.innerHTML = "";
    return width;
  }
  focus() {
    let options = this.getOptions();
    if (!puma(this.element()).vrHasScrollBar()) {
      this._txtInput.focus();
      this.focusEvent();
      if (this._txtInput.value() == "")
        this.placeholder(options.placeholder);
    }
  }
  focusEvent() {
    let options = this.getOptions();
    if (options.onFocus != null) {
      let focusEvent = new AutoCompleteBoxFocusEvent();
      focusEvent.sender = this;
      focusEvent.element = this._txtInput.element();
      options.onFocus(focusEvent);
    }
  }
  blurEvent() {
    let options = this.getOptions();
    if (options.onBlur != null) {
      let focusEvent = new AutoCompleteBoxBlurEvent();
      focusEvent.sender = this;
      focusEvent.element = this._txtInput.element();
      options.onBlur(focusEvent);
    }
  }
  clear() {
    let options = this.getOptions();
    this._items = [];
    puma(this.container()).find(".vrAutoCompleteBoxItem").remove();
    this._txtInput.clear();
    this.placeholder(options.placeholder);
  }
  //#endregion
  //#region Popup webservice
  close() {
    puma(this._popup).hide();
  }
  open() {
    puma(this._popup).find(".vrComboBoxSelectedComboValue").removeClass("vrComboBoxSelectedComboValue");
    if (!this.enabled())
      return;
    if (puma(this._popup).is(":visible"))
      return;
    puma(this._popup).show();
    super.settingPopup(this._popup);
    let minWidth = puma(this.element()).width();
    this._popup.style.cssText += "min-width: " + minWidth + "px;";
  }
  doAjaxCall(text = "") {
    let options = this.getOptions();
    if (options.comboSettings == null || options.comboSettings.webService == null)
      return;
    if (options.comboSettings.webService.typedTextPropertyName == null) options.comboSettings.webService.typedTextPropertyName = "text";
    if (options.comboSettings.webService.typedValuePropertyName == null) options.comboSettings.webService.typedValuePropertyName = "value";
    if (options.comboSettings.webService.itemsPropertyName == null) options.comboSettings.webService.itemsPropertyName = "items";
    let request = {};
    request[options.comboSettings.webService.typedTextPropertyName] = text;
    if (options.comboSettings.webService.authKey == null)
      options.comboSettings.webService.authKey = "";
    if (options.comboSettings.webService.parameters != null) {
      let parameters = options.comboSettings.webService.parameters();
      let jsonParameters = Object.getOwnPropertyNames(parameters);
      for (let param of jsonParameters)
        request[param] = parameters[param];
    }
    this._lastAjaxCallGuid = UtilityManager.createGuid();
    request.guid = this._lastAjaxCallGuid;
    UtilityManager.doAjaxCall(
      {
        mode: WebApiModeEnum.Async,
        authKey: options.comboSettings.webService.authKey,
        method: options.comboSettings.webService.method,
        request
      },
      (response) => {
        if (this._lastAjaxCallGuid != null && response.guid != null && this._lastAjaxCallGuid != response.guid)
          return;
        this._typedTextWebService = text;
        let items = response[options.comboSettings.webService.itemsPropertyName];
        this.comboItems(items);
        if (items.length > 0)
          this.open();
        else
          this.close();
      }
    );
  }
  comboItems(items) {
    let options = this.getOptions();
    if (items != null) {
      this._comboItems = items;
      if (this.getRootItems().length == 0)
        puma(this._popup).addClass("vrComboBoxFlat");
      else
        puma(this._popup).removeClass("vrComboBoxFlat");
      if (options.comboSettings.webService == null) {
        this.drawDataSource();
      } else {
        if (this._typedTextWebService == null) this._items = [];
        this.drawDataSource();
        this._typedTextWebService = null;
      }
    }
    return this._comboItems;
  }
  getOnlyChildrenItems(parentItem) {
    return this.comboItems().filter((k) => k.parentValue != null && k.parentValue == parentItem.value);
  }
  getRootItems() {
    let parentItems = [];
    for (let item of this.comboItems()) {
      if (item == null)
        continue;
      let parentValue = item.parentValue;
      while (parentValue != null) {
        let parentItem = this.comboItems().filter((k) => k.value == parentValue)[0];
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
    return this.getRootItems().filter((k) => k != null).map((k) => String(k.value));
  }
  drawDataSource(searchedText) {
    puma(this._popup).find(".vrComboBoxUl").remove();
    let items = this.comboItems();
    if (searchedText != null)
      items = this.getFilteredArrayByInputText(searchedText);
    if (items.length == 1 && items[0] == null)
      return;
    this._dictionaryValueLi = /* @__PURE__ */ new Map();
    this._dictionaryLiValue = /* @__PURE__ */ new Map();
    items = items.filter((k) => k.parentValue == null);
    this.drawItems(items, this._popup);
  }
  drawItems(items, elementToAppend) {
    let options = this.getOptions();
    if (items.length == 0)
      return;
    let ul = puma("<ul class='vrComboBoxUl'></ul>").vrAppendToPuma(elementToAppend);
    for (let item of items) {
      if (item.value == null)
        item.value = item.text;
      let li = puma("<li class='vrComboBoxLi' tabindex='-1'></li>").vrAppendToPuma(ul);
      this._dictionaryLiValue.set(li[0], String(item.value));
      if (this._dictionaryValueLi.has(String(item.value))) {
        let actualLiList = this._dictionaryValueLi.get(String(item.value));
        actualLiList.push(li[0]);
        this._dictionaryValueLi.set(String(item.value), actualLiList);
      } else
        this._dictionaryValueLi.set(String(item.value), [li[0]]);
      puma(li).on("focusin", (e) => {
        puma(this._popup).find(".vrComboBoxSelectedComboValue").removeClass("vrComboBoxSelectedComboValue");
        puma(e.target).addClass("vrComboBoxSelectedComboValue keydownFocus");
      });
      puma(li).on("keydown", (e) => {
        if (e.key == KeyEnum.ArrowDown) {
          let next = puma(e.currentTarget).next();
          if (next.length == 0)
            return;
          puma(this._popup).find(".vrComboBoxSelectedComboValue").removeClass("vrComboBoxSelectedComboValue");
          while (!next.is(":visible"))
            next = puma(next).next();
          next.focus();
        } else if (e.key == KeyEnum.ArrowUp) {
          let prev = puma(e.currentTarget).prev();
          if (prev.length == 0)
            return;
          puma(this._popup).find(".vrComboBoxSelectedComboValue").removeClass("vrComboBoxSelectedComboValue");
          while (!prev.is(":visible"))
            prev = puma(prev).prev();
          prev.focus();
        } else if (e.key == KeyEnum.Enter)
          puma(e.currentTarget).find(".vrComboBoxItemText").click();
      });
      if (options.comboSettings.treeMode == ComboBoxTreeModeEnum.AllCollapsed) {
        if (item.parentValue != null)
          puma(li).closest(".vrComboBoxUl").hide();
      } else if (options.comboSettings.treeMode == ComboBoxTreeModeEnum.OnlyFirstLevelExpanded) {
        if (puma(li).parents(".vrComboBoxUl").length > 2)
          puma(li).closest(".vrComboBoxUl").hide();
      }
      let children = this.getOnlyChildrenItems(item);
      if (children.length > 0) {
        let iconClassForDiv = "";
        let iconClass = IconClassicLight.CaretRight;
        if (options.comboSettings.treeMode == ComboBoxTreeModeEnum.AllCollapsed) {
          if (item.parentValue != null) {
            iconClass = IconClassicLight.CaretRight;
            iconClassForDiv = "caret-right";
          }
        } else if (options.comboSettings.treeMode == ComboBoxTreeModeEnum.OnlyFirstLevelExpanded) {
          if (puma(li).parents(".vrComboBoxUl").length == 1) {
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
        let divIcon = puma("<div class='vrComboBoxDivIconExpand " + iconClassForDiv + "'></div>").vrAppendToPuma(li);
        puma(UtilityManager.createIcon(iconClass)).vrAppendToPuma(divIcon);
        puma(divIcon).click((e) => {
          puma(e.currentTarget).children("i").removeClass(IconClassicLight.CaretRight + " " + IconClassicLight.CaretDown);
          puma(e.currentTarget).removeClass("caret-right caret-down");
          let ulChildren = puma(e.currentTarget).siblings(".vrComboBoxUl");
          if (ulChildren.first().is(":visible")) {
            ulChildren.hide();
            puma(e.currentTarget).children("i").addClass(IconClassicLight.CaretRight);
            puma(e.currentTarget).addClass("caret-right");
          } else {
            ulChildren.show();
            puma(e.currentTarget).children("i").addClass(IconClassicLight.CaretDown);
            puma(e.currentTarget).addClass("caret-down");
          }
        });
      }
      let comboItem = puma("<div class='vrComboBoxDivItemContainer'></div>").vrAppendToPuma(li);
      let rowText = item.text.replace(/'/g, "&#39;");
      if (options.comboSettings != null && options.comboSettings.template != null) {
        let templateEvent = {};
        templateEvent.dataItem = item;
        templateEvent.element = comboItem[0];
        templateEvent.sender = this;
        rowText = options.comboSettings.template(templateEvent);
      }
      let comboItemText = puma("<span title='" + item.text + "' text='" + item.text.replace(/'/g, "&#39;") + "' class='vrComboBoxItemText'>" + rowText + "</span>").vrAppendToPuma(comboItem);
      puma(comboItemText).click((e) => {
        let value = this._dictionaryLiValue.get(puma(e.currentTarget).closest("li")[0]);
        let item2 = this.comboItems().filter((k) => k.value == value)[0];
        if (item2 != null && !this.getRootValues().includes(String(item2.value))) {
          this.valueCombo(String(item2.value));
          this.close();
        } else
          UtilityManager.interval(() => puma(this.element()).toggleClass("errorInput"), 200, 800);
      });
      if (children.length > 0)
        this.drawItems(this.getOnlyChildrenItems(item), li);
    }
  }
  valueCombo(value) {
    if (value === null) {
      this.clear();
      return;
    }
    let comboItemToSelect = this.comboItems().filter((k) => k.value == value)[0];
    this._txtInput.value(comboItemToSelect.text, false);
    this.manageInput(this._txtInput, this._txtInput.value(), String(comboItemToSelect.value));
  }
  filter(text, element) {
    let options = this.getOptions();
    let selectionStart = element.selectionStart;
    let selectionEnd = element.selectionEnd;
    let itemsToReturn = [];
    if (text == "") {
      puma(this._popup).find("li").show();
      if (options.comboSettings.webService != null) {
        this._items = [];
        puma(this._popup).find(".vrComboBoxUl").remove();
      }
    } else if (!(selectionStart == 0 && selectionEnd == element.value.length)) {
      puma(this._popup).find("li").hide();
      let items = this.getFilteredArrayByInputText(text);
      itemsToReturn = items;
      let values = items.map((k) => k.value);
      let texts = items.map((k) => k.text);
      for (let item of items) {
        let parentValue = item.parentValue;
        while (parentValue != null) {
          let parentItem = this.comboItems().filter((k) => k.value == parentValue)[0];
          if (!values.includes(parentValue)) {
            values.push(parentValue);
            texts.push(parentItem.text);
          }
          parentValue = parentItem != null ? parentItem.parentValue : void 0;
          if (parentValue == parentItem.value)
            parentValue = void 0;
        }
      }
      for (let comboItemText of Array.from(puma(this._popup).find(".vrComboBoxItemText"))) {
        if (texts.includes(String(puma(comboItemText).attr("text")).trim())) {
          puma(comboItemText).closest(".vrComboBoxLi").show();
          puma(comboItemText).closest(".vrComboBoxLi").closest(".vrComboBoxUl").show();
          puma(comboItemText).closest(".vrComboBoxLi").find(".vrComboBoxDivIconExpand").removeClass("caret-right caret-down");
          puma(comboItemText).closest(".vrComboBoxLi").find(".vrComboBoxDivIconExpand").children("i").removeClass(IconClassicLight.CaretRight + " " + IconClassicLight.CaretDown);
          puma(comboItemText).closest(".vrComboBoxLi").find(".vrComboBoxDivIconExpand").addClass("caret-down");
          puma(comboItemText).closest(".vrComboBoxLi").find(".vrComboBoxDivIconExpand").children("i").addClass(IconClassicLight.CaretDown);
        }
      }
    }
    return itemsToReturn;
  }
  getFilteredArrayByInputText(value) {
    value = value.toLowerCase();
    let filteredArray = [];
    let arrayWhereSearch = this.comboItems().map((k) => String(k.text).toLowerCase());
    arrayWhereSearch.forEach((k, index) => {
      if (k.indexOf(value) != -1)
        filteredArray.push(this.comboItems()[index]);
    });
    return filteredArray;
  }
  //#endregion
  getOptions() {
    return this.options();
  }
}
class AutoCompleteBoxEvent extends VrControlsEvent {
  sender;
}
class AutoCompleteBoxItemClickEvent extends AutoCompleteBoxEvent {
  item;
  text;
}
class AutoCompleteBoxItemAddedEvent extends AutoCompleteBoxEvent {
  item;
}
class AutoCompleteBoxItemInfo {
  item;
  element;
}
class AutoCompleteBoxFocusEvent extends AutoCompleteBoxEvent {
  element;
}
class AutoCompleteBoxBlurEvent extends AutoCompleteBoxEvent {
  element;
}
export {
  AutoCompleteBox,
  AutoCompleteBoxOptions
};
//# sourceMappingURL=autoCompleteBox.js.map
