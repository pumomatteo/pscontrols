import { VrControl, VrControlOptions, VrControlsEvent } from "../common.js";
import { SelectionModeEnum, ControlTypeEnum, createButton, IconClassicLight, puma, createCheckBox } from "../vr.js";
import { UtilityManager } from "../../managers/utilityManager.js";
class ButtonGroupOptions extends VrControlOptions {
  items;
  selectionMode;
  checkboxes;
  tooltip;
}
class ButtonGroup extends VrControl {
  _items;
  _btnScrollBack;
  _btnScrollForward;
  _populating;
  constructor(element, options) {
    if (options == null)
      options = new ButtonGroupOptions();
    if (options.selectionMode == null) options.selectionMode = SelectionModeEnum.Single;
    if (options.checkboxes == null) options.checkboxes = false;
    if (options.items == null) options.items = [];
    if (options.tooltip == null) options.tooltip = false;
    super(element, options, ControlTypeEnum.ButtonGroup);
    this.element().style.cssText += "display: inline-block;";
    let intervalScrolling = 0;
    this._btnScrollBack = createButton({
      icon: IconClassicLight.CaretLeft,
      visible: false,
      enable: false,
      colorSettings: { background: "#f1f1f1" },
      css: "border-top-right-radius: 0px; border-bottom-right-radius: 0px;",
      onMouseDown: (e) => {
        this.scrollBack();
        intervalScrolling = window.setInterval(() => {
          this.scrollBack(intervalScrolling);
        }, 100);
      },
      onMouseUp: (e) => window.clearInterval(intervalScrolling)
    }, this.container());
    puma(this._btnScrollBack.container()).vrInsertBeforePuma(this.element());
    this._btnScrollForward = createButton({
      icon: IconClassicLight.CaretRight,
      visible: false,
      colorSettings: { background: "#f1f1f1" },
      css: "border-top-left-radius: 0px; border-bottom-left-radius: 0px;",
      onMouseDown: (e) => {
        this.scrollForward();
        intervalScrolling = window.setInterval(() => {
          this.scrollForward(intervalScrolling);
        }, 100);
      },
      onMouseUp: (e) => window.clearInterval(intervalScrolling)
    }, this.container());
    puma(this._btnScrollForward.container()).vrInsertAfterPuma(this.element());
    this._items = [];
    if (options.items != null)
      this.items(options.items);
  }
  //#region Methods
  items(items) {
    if (items != null) {
      this._populating = true;
      for (let item of items)
        this.addItem(item);
      this.manageScrolling();
      this._populating = false;
    }
    return this._items;
  }
  addItem(item) {
    this.items().push(item);
    let options = this.getOptions();
    let spanButton = puma("<span></span>").vrAppendToPuma(this.element())[0];
    puma(spanButton).addClass("buttonGroupItem");
    let checkbox = null;
    if (options.checkboxes) {
      checkbox = createCheckBox(
        {
          checked: item.selected === true ? true : false,
          onCheck: (e) => puma(spanButton).click()
        },
        spanButton
      );
      puma(checkbox.element()).attr("value", item.value);
    }
    let iconOrImage = null;
    if (item.icon != null)
      iconOrImage = UtilityManager.createIcon(item.icon);
    else if (item.imageUrl != null)
      iconOrImage = puma("<img src='" + item.imageUrl + "' />")[0];
    if (iconOrImage != null) {
      puma(spanButton).vrAppendPuma(iconOrImage);
      if (item.onIconClick != null) {
        puma(iconOrImage).on("click", (e) => {
          let event = new ButtonGroupIconClickEvent();
          event.sender = this;
          event.value = puma(spanButton).attr("value");
          event.selected = puma(spanButton).hasClass("buttonGroupItemSelected");
          item.onIconClick(event);
        });
      }
    }
    if (item.text == null) item.text = "";
    let marginLeft = "";
    if (item.icon != null || item.imageUrl != null)
      marginLeft = "margin-left: 5px;";
    let spanItemText = puma("<span class='buttonGroupItemText' style='height: 23px; " + marginLeft + "'>" + item.text + "</span>").vrAppendToPuma(spanButton);
    if (item.text != "") {
      let tooltip = "";
      if (item.tooltip != null)
        tooltip = item.tooltip;
      else if (options.tooltip)
        tooltip = item.text;
      if (tooltip != "")
        puma(spanItemText).attr("title", tooltip);
    }
    puma(spanButton).attr("value", item.value);
    if (item.selected === true) {
      if (!options.checkboxes)
        puma(spanButton).addClass("buttonGroupItemSelected");
      else
        checkbox.check();
    }
    if (item.colorSettings != null) {
      let colorSettings = item.colorSettings;
      if (colorSettings.textColor != null)
        puma(spanButton).css("color", colorSettings.textColor);
      if (colorSettings.background != null)
        puma(spanButton).css("background-color", colorSettings.background);
      if (colorSettings.border != null)
        puma(spanButton).css("border-color", colorSettings.border);
    }
    if (item.visible === false)
      puma(spanButton).hide();
    if (item.enable === false)
      puma(spanButton).attr("disabled", "disabled");
    puma(spanButton).click((e) => {
      if (!this.enabled() || puma(spanButton).attr("disabled") != null) {
        e.preventDefault();
        return;
      }
      if (options.selectionMode == SelectionModeEnum.Single)
        this.clear();
      if (!options.checkboxes)
        puma(e.currentTarget).toggleClass("buttonGroupItemSelected");
      else {
        let checkbox2 = puma(e.currentTarget).find(".vrCheckBox")[0];
        checkbox2.checked = !checkbox2.checked;
      }
      this.changeItem(puma(e.currentTarget).attr("value"), puma(e.currentTarget).hasClass("buttonGroupItemSelected"), item);
      this.changeGlobal(puma(e.currentTarget).attr("value"), puma(e.currentTarget).hasClass("buttonGroupItemSelected"), item);
    });
    if (!this._populating)
      this.manageScrolling();
    if (item.css != null)
      spanButton.style.cssText += item.css;
    if (options.onItemAdded != null) {
      let event = new ButtonGroupItemAddedEvent();
      event.sender = this;
      event.value = String(item.value);
      options.onItemAdded(event);
    }
  }
  manageScrolling() {
    let scrolling = puma(this.element()).vrHasScrollBar(true);
    if (scrolling) {
      this._btnScrollBack.show();
      this._btnScrollForward.show();
      puma(this.element()).find(".buttonGroupItem").first().css({ "border-top-left-radius": "0px", "border-bottom-left-radius": "0px", "border-left": "none" });
      puma(this.element()).find(".buttonGroupItem").last().css({ "border-top-right-radius": "0px", "border-bottom-right-radius": "0px", "border-right": "none" });
    } else {
      this._btnScrollBack.hide();
      this._btnScrollForward.hide();
      puma(this.element()).find(".buttonGroupItem").first().css({ "border-top-left-radius": "4px", "border-bottom-left-radius": "4px", "border-left": "solid 1px #d9d9d9" });
      puma(this.element()).find(".buttonGroupItem").last().css({ "border-top-right-radius": "4px", "border-bottom-right-radius": "4px", "border-right": "solid 1px #d9d9d9" });
    }
  }
  scrollBack(interval) {
    let leftPos = puma(this.element()).scrollLeft();
    puma(this.element()).animate({ scrollLeft: leftPos - 20 }, 10);
    this._btnScrollForward.enable();
    if (leftPos - 20 <= 0) {
      window.clearInterval(interval);
      this._btnScrollBack.disable();
    }
  }
  scrollForward(interval) {
    let leftPos = puma(this.element()).scrollLeft();
    puma(this.element()).animate({ scrollLeft: leftPos + 20 }, 10);
    this._btnScrollBack.enable();
    if (leftPos + 20 >= this.element().scrollWidth - this.element().offsetWidth) {
      window.clearInterval(interval);
      this._btnScrollForward.disable();
    }
  }
  item(value) {
    return this.items().filter((k) => k.value == value)[0];
  }
  clearItems() {
    let items = this.items().filter((k) => k);
    for (let item of items)
      this.removeItem(String(item.value), false);
  }
  removeItem(value, triggerChange = true) {
    let options = this.getOptions();
    puma(this.container()).find(".buttonGroupItem[value='" + value + "']").remove();
    let index = this.items().map((k) => k.value).indexOf(value);
    if (index != -1)
      this.items().splice(index, 1);
    this.manageScrolling();
    if (triggerChange && options.onItemRemoved != null) {
      let event = new ButtonGroupItemRemovedEvent();
      event.sender = this;
      event.value = value;
      options.onItemRemoved(event);
    }
  }
  showItems(values) {
    for (let value of values)
      this.showItem(value);
  }
  showItem(value) {
    puma(this.container()).find(".buttonGroupItem[value='" + value + "']").show();
    this.manageScrolling();
  }
  showAllItems() {
    let values = this.items().map((k) => k.value);
    this.showItems(values);
  }
  hideItems(values) {
    for (let value of values)
      this.hideItem(value);
  }
  hideItem(value) {
    puma(this.container()).find(".buttonGroupItem[value='" + value + "']").hide();
    this.manageScrolling();
  }
  hideAllItems() {
    let values = this.items().map((k) => k.value);
    this.hideItems(values);
  }
  visibleItem(value, state) {
    let spanItem = puma(this.container()).find(".buttonGroupItem[value='" + value + "']");
    if (state != null) {
      if (state) spanItem.show();
      else spanItem.hide();
    }
    this.manageScrolling();
    return spanItem.is(":visible");
  }
  select(values, triggerChange = true) {
    let options = this.getOptions();
    if (options.selectionMode == SelectionModeEnum.Single)
      this.clear();
    for (let value of values) {
      if (!options.checkboxes)
        puma(this.container()).find(".buttonGroupItem[value='" + value + "']").addClass("buttonGroupItemSelected");
      else
        puma(this.container()).find(".buttonGroupItem .vrCheckBox[value='" + value + "']")[0].checked = true;
      if (triggerChange)
        this.changeItem(String(value));
    }
    if (triggerChange) {
      let value = null;
      if (this.selectionMode() == SelectionModeEnum.Single)
        value = values.vrFirst();
      this.changeGlobal(String(value));
    }
  }
  selectIndex(index, triggerChange = true) {
    let options = this.getOptions();
    if (options.selectionMode == SelectionModeEnum.Single)
      this.clear();
    if (!options.checkboxes)
      puma(puma(this.container()).find(".buttonGroupItem")[index]).addClass("buttonGroupItemSelected");
    else
      puma(this.container()).find(".buttonGroupItem .vrCheckBox")[index].checked = true;
    let item = this.getItemByIndex(index);
    let value = puma(item).attr("value");
    if (triggerChange)
      this.changeItem(String(value));
    if (triggerChange)
      this.changeGlobal(String(value));
  }
  changeGlobal(value, selected, item) {
    if (item == null)
      item = this.items().filter((k) => k.value == value)[0];
    let options = this.getOptions();
    if (options.onSelect != null) {
      let event = new ButtonGroupSelectEvent();
      event.sender = this;
      event.value = value;
      event.selected = selected;
      event.selectedValues = this.getSelectedValues();
      window.setTimeout(() => options.onSelect(event));
    }
  }
  changeItem(value, selected = true, item) {
    if (item == null)
      item = this.items().filter((k) => k.value == value)[0];
    if (item != null && item.onClick != null) {
      let event = new ButtonGroupClickEvent();
      event.sender = this;
      event.value = value;
      event.selected = selected;
      item.onClick(event);
    }
  }
  getSelectedValues() {
    let options = this.getOptions();
    if (!options.checkboxes)
      return Array.from(puma(this.container()).find(".buttonGroupItem.buttonGroupItemSelected")).map((k) => puma(k).attr("value"));
    else
      return Array.from(puma(this.container()).find(".buttonGroupItem .vrCheckBox:checked")).map((k) => puma(k).attr("value"));
  }
  value() {
    return puma(puma(this.container()).find(".buttonGroupItem.buttonGroupItemSelected")).attr("value");
  }
  clear() {
    puma(this.container()).find(".buttonGroupItem").removeClass("buttonGroupItemSelected");
    let options = this.getOptions();
    if (options.checkboxes) {
      for (let checkbox of Array.from(puma(this.container()).find(".buttonGroupItem .vrCheckBox")))
        checkbox.checked = false;
    }
  }
  selectionMode() {
    return this.getOptions().selectionMode;
  }
  getItemByValue(value) {
    return puma(this.container()).find(".buttonGroupItem[value='" + value + "']")[0];
  }
  getItemByIndex(index) {
    return puma(this.container()).find(".buttonGroupItem")[index];
  }
  itemTooltip(value, tooltip) {
    let item = this.getItemByValue(value);
    if (tooltip != null)
      puma(item).find(".buttonGroupItemText")[0].title = tooltip;
    return puma(item).find(".buttonGroupItemText")[0].title;
  }
  itemText(value, text, updateTooltip = true) {
    let item = this.getItemByValue(value);
    let buttonGroupItemText = puma(item).find(".buttonGroupItemText")[0];
    if (text != null && buttonGroupItemText != null) {
      buttonGroupItemText.innerHTML = text;
      if (updateTooltip)
        buttonGroupItemText.title = text;
    }
    return buttonGroupItemText != null ? buttonGroupItemText.innerHTML : "";
  }
  itemTextByIndex(index, text) {
    let item = this.getItemByIndex(index);
    if (text != null)
      puma(item).find(".buttonGroupItemText")[0].innerHTML = text;
    return puma(item).find(".buttonGroupItemText")[0].innerHTML;
  }
  enableItem(value) {
    let element = this.getItemByValue(value);
    puma(element).removeAttr("disabled");
  }
  disableItem(value) {
    let element = this.getItemByValue(value);
    puma(element).attr("disabled", "disabled");
  }
  //#endregion
  //#region Overrides
  enable() {
    super.enable();
    for (let item of this.items())
      this.enableItem(item.value);
  }
  disable() {
    super.disable();
    for (let item of this.items())
      this.disableItem(item.value);
  }
  //#endregion
  getOptions() {
    return this.options();
  }
}
class ButtonGroupEvent extends VrControlsEvent {
  sender;
  value;
}
class ButtonGroupSelectEvent extends ButtonGroupEvent {
  selectedValues;
  selected;
}
class ButtonGroupItemAddedEvent extends ButtonGroupEvent {
}
class ButtonGroupItemRemovedEvent extends ButtonGroupEvent {
}
class ButtonGroupClickEvent extends ButtonGroupEvent {
  selected;
}
class ButtonGroupIconClickEvent extends ButtonGroupEvent {
  selected;
}
export {
  ButtonGroup,
  ButtonGroupClickEvent,
  ButtonGroupIconClickEvent,
  ButtonGroupOptions
};
//# sourceMappingURL=buttonGroup.js.map
