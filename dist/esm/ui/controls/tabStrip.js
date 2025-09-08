import { UtilityManager } from "../../managers/utilityManager.js";
import { VrControl, VrControlOptions } from "../common.js";
import { ControlTypeEnum, ColorSettings, puma, createButtonGroup } from "../vr.js";
class TabStripOptions extends VrControlOptions {
  items;
  backgroundColor;
  tooltip;
}
class TabStrip extends VrControl {
  _buttonGroup;
  constructor(element, options) {
    if (options == null)
      options = new TabStripOptions();
    if (options.width == null) options.width = "100%";
    if (options.backgroundColor == null) options.backgroundColor = "#e3f1fa";
    super(element, options, ControlTypeEnum.TabStrip);
    if (options.items != null) {
      for (let item of options.items) {
        if (item.colorSettings == null) item.colorSettings = new ColorSettings();
        if (item.colorSettings.background == null) item.colorSettings.background = options.backgroundColor;
        if (item.elementId != null) {
          if (!item.elementId.startsWith("#"))
            item.elementId = "#" + item.elementId;
          let userOnClick = item.onClick;
          item.onClick = (e) => {
            let elementIdList = this.items().filter((k) => k.elementId != null).map((k) => k.elementId);
            for (let elementId of elementIdList) {
              if (!elementId.startsWith("#"))
                elementId = "#" + elementId;
              puma(elementId).hide();
            }
            puma(item.elementId).show();
            if (userOnClick != null)
              userOnClick(e);
          };
        }
      }
    }
    options.width = "100%";
    options.cssContainer = void 0;
    options.css = "background-color: " + options.backgroundColor + ";";
    options.margin = void 0;
    this._buttonGroup = createButtonGroup(options, this.element());
  }
  //#region Methods
  items(items) {
    return this._buttonGroup.items(items);
  }
  addItem(item, show = true) {
    let options = this.getOptions();
    if (item.colorSettings == null) item.colorSettings = new ColorSettings();
    if (item.colorSettings.background == null) item.colorSettings.background = options.backgroundColor;
    this._buttonGroup.addItem(item);
    if (show) {
      if (item.elementId != null) {
        if (!item.elementId.startsWith("#"))
          item.elementId = "#" + item.elementId;
        let userOnClick = item.onClick;
        item.onClick = (e) => {
          let elementIdList = this.items().filter((k) => k.elementId != null).map((k) => k.elementId);
          for (let elementId of elementIdList) {
            if (!elementId.startsWith("#"))
              elementId = "#" + elementId;
            puma(elementId).hide();
          }
          puma(item.elementId).show();
          if (userOnClick != null)
            userOnClick(e);
        };
        puma(item.elementId).show();
      }
    }
  }
  item(value) {
    return this.items().filter((k) => k.value == value)[0];
  }
  removeItem(value) {
    this._buttonGroup.removeItem(value);
    let index = this.items().map((k) => k.value).indexOf(value);
    if (index != -1)
      this.items().splice(index, 1);
    let item = this.items().filter((k) => k.value == value)[0];
    if (item != null && item.elementId != null) {
      if (!item.elementId.startsWith("#"))
        item.elementId = "#" + item.elementId;
      puma(item.elementId).remove();
    }
  }
  removeAllItems() {
    let items = UtilityManager.duplicate(this.items());
    for (let item of items)
      this.removeItem(String(item.value));
  }
  showItems(values) {
    this._buttonGroup.showItems(values);
  }
  showItem(value) {
    this._buttonGroup.showItem(value);
  }
  showAllItems() {
    this._buttonGroup.showAllItems();
  }
  hideItems(values) {
    this._buttonGroup.hideItems(values);
    for (let value of values)
      this.hideItem(value);
  }
  hideItem(value, hide = true) {
    this._buttonGroup.hideItem(value);
    if (hide) {
      let item = this.items().filter((k) => k.value == value)[0];
      if (item != null && item.elementId != null)
        puma(item.elementId).hide();
    }
  }
  hideAllItems(hideElement = true) {
    this._buttonGroup.hideAllItems();
    if (hideElement) {
      for (let item of this.items()) {
        if (item != null && item.elementId != null)
          puma(item.elementId).hide();
      }
    }
  }
  visibleItem(value, state) {
    if (state != null) {
      if (state) this.showItem(value);
      else this.hideItem(value);
    }
    return this._buttonGroup.visibleItem(value, state);
  }
  enableItem(value) {
    this._buttonGroup.enableItem(value);
  }
  enableItems(values) {
    for (let value of values)
      this._buttonGroup.enableItem(value);
  }
  disableItem(value) {
    this._buttonGroup.disableItem(value);
  }
  disableItems(values) {
    for (let value of values)
      this._buttonGroup.disableItem(value);
  }
  select(values, triggerChange = true) {
    this._buttonGroup.select(values, triggerChange);
  }
  selectIndex(index, triggerChange = true) {
    this._buttonGroup.selectIndex(index, triggerChange);
  }
  value() {
    return this._buttonGroup.value();
  }
  getItemByValue(value) {
    return this._buttonGroup.getItemByValue(value);
  }
  getItemByIndex(index) {
    return this._buttonGroup.getItemByIndex(index);
  }
  itemTooltip(value, tooltip) {
    return this._buttonGroup.itemTooltip(value, tooltip);
  }
  itemText(value, text, updateTooltip = true) {
    return this._buttonGroup.itemText(value, text, updateTooltip);
  }
  itemTextByIndex(index, text) {
    return this._buttonGroup.itemTextByIndex(index, text);
  }
  //#endregion
  //#region Overrides
  enable() {
    super.enable();
    this._buttonGroup.enable();
  }
  disable() {
    super.disable();
    this._buttonGroup.disable();
  }
  //#endregion
  getOptions() {
    return this.options();
  }
}
export {
  TabStrip,
  TabStripOptions
};
//# sourceMappingURL=tabStrip.js.map
