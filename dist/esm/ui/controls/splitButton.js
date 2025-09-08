import { ControlTypeEnum, createButton, puma, IconClassicLight, createSeparator, OrientationEnum, shadowRoot } from "../vr.js";
import { VrControl, VrControlOptions } from "../common.js";
import { UtilityManager } from "../../managers/utilityManager.js";
class SplitButtonOptions extends VrControlOptions {
  text;
  icon;
  imageUrl;
  colorSettings;
  popupSettings;
  tooltip;
  items;
  hoverMode;
  modal;
  showDefault;
  separator;
  onClick;
  onSelect;
}
class SplitButton extends VrControl {
  _popup;
  _btnMain;
  _items;
  _itemButtonList;
  constructor(element, options) {
    if (options == null)
      options = new SplitButtonOptions();
    if (options.text == null) options.text = "";
    if (options.items == null) options.items = [];
    if (options.hoverMode == null) options.hoverMode = false;
    if (options.modal == null) options.modal = false;
    if (options.showDefault == null) options.showDefault = true;
    if (options.separator == null) options.separator = false;
    if (options.tabIndex == null) options.tabIndex = -1;
    let width = options.width;
    options.width = void 0;
    super(element, options, ControlTypeEnum.SplitButton);
    this._itemButtonList = [];
    this._btnMain = createButton(
      {
        text: options.text,
        icon: options.icon,
        imageUrl: options.imageUrl,
        colorSettings: options.colorSettings,
        tooltip: options.tooltip,
        enable: options.enable,
        width,
        tabIndex: options.tabIndex,
        css: "border-top-right-radius: 0px; border-bottom-right-radius: 0px;" + (options.onClick != null ? "background-color: #f8f8f8;" : ""),
        onClick: (e) => {
          if (options.onClick != null)
            this.click();
          else {
            if (puma(this._popup).is(":visible"))
              this.close();
            else
              this.open();
          }
        },
        onHover: (e) => {
          if (options.hoverMode)
            this.open();
          puma(divPickerIcon).addClass("hoverClass");
        },
        onBlur: (e) => {
          puma(divPickerIcon).removeClass("hoverClass");
        }
      },
      this.element(),
      null,
      element.id + "btnMain"
    );
    puma(this.container()).mouseleave((e) => {
      if (options.hoverMode && e.relatedTarget != this._popup)
        this.close();
    });
    if (options.onClick != null && options.showDefault) {
      let defaultItem = new SplitButtonItem();
      defaultItem.text = options.text;
      defaultItem.icon = options.icon;
      defaultItem.imageUrl = options.imageUrl;
      defaultItem.colorSettings = options.colorSettings;
      defaultItem.onClick = options.onClick;
      options.items.splice(0, 0, defaultItem);
    }
    this.items(options.items);
    let classPickerIcon = options.onClick != null ? "vrDivPickerIconSplitButton" : "vrDivPickerIconSplitButtonFlat";
    let pickerIcon = UtilityManager.createIcon(IconClassicLight.CaretDown);
    let divPickerIcon = puma("<div class='" + classPickerIcon + "'></div>").vrAppendToPuma(this.element())[0];
    puma(divPickerIcon).vrAppendPuma(pickerIcon);
    puma(divPickerIcon).click(() => {
      if (puma(this._popup).is(":visible"))
        this.close();
      else
        this.open();
    });
    puma(divPickerIcon).on("mouseenter", (e) => puma(this._btnMain.element()).addClass("hoverClass"));
    puma(divPickerIcon).on("mouseleave", (e) => puma(this._btnMain.element()).removeClass("hoverClass"));
    window.addEventListener("click", (e) => {
      if (puma(this._popup).is(":visible") && !puma(this.container())[0].contains(e.target))
        this.close();
    });
    let baseListener = shadowRoot() != null ? shadowRoot() : document;
    baseListener.addEventListener("scroll", (e) => {
      if (!puma(e.target).hasClass("splitButton_divPopup") && puma(this._popup).is(":visible"))
        this.close();
    }, true);
  }
  //#region Methods
  open() {
    if (!this.enabled())
      return;
    let options = this.getOptions();
    if (this._popup == null)
      this._popup = puma("<div class='splitButton_divPopup' id='" + this.element().id + "_divPopup'></div>").vrAppendToPuma(shadowRoot() != null ? shadowRoot() : document.body)[0];
    puma(this._popup).attr("tabindex", "0");
    this._popup.style.cssText += "min-width: 100px;";
    puma(this._popup).mouseleave((e) => {
      if (options.hoverMode)
        this.close();
    });
    if (options.modal) {
      puma("#vrWindowBackground_" + this.element().id).remove();
      let background = puma("<div class='vrWindowBackground' id='vrWindowBackground_" + this.element().id + "'></div>").vrAppendToPuma(document.body)[0];
      puma(background).show();
      puma(background).css("z-index", Number(puma(this._popup).css("z-index")) - 1);
      puma(background).click(() => this.close());
    }
    this._itemButtonList = [];
    this.items(this.items());
    super.settingPopup(this._popup, options.popupSettings);
  }
  close() {
    puma(this._popup).remove();
    this._popup = null;
    puma("#vrWindowBackground_" + this.element().id).remove();
  }
  items(items) {
    if (items != null) {
      this._items = items;
      let i = 0;
      for (let item of items) {
        if (item.separator === true) {
          let divSeparatorContainerValue = item.value != null ? "value='" + item.value + "'" : "value='separator'";
          let separatorContainer = puma("<div " + divSeparatorContainerValue + "></div>").vrAppendToPuma(this._popup);
          let separator = createSeparator({
            tag: item.value == null ? "separator" : item.value,
            orientation: OrientationEnum.Horizontal,
            visible: item.visible,
            cssContainer: "margin-top: -8px !important; margin-bottom: 5px !important;"
          }, separatorContainer);
          this._itemButtonList.push(separator);
          continue;
        }
        this.drawItem(item, i);
        i++;
      }
    }
    return this._items;
  }
  drawItem(item, index) {
    let options = this.getOptions();
    let divItemContainerValue = item.value != null ? "value='" + item.value + "'" : "";
    if (item.text != null && (divItemContainerValue == null || divItemContainerValue == ""))
      divItemContainerValue = "value='" + item.text.replace(/[^a-z0-9\s]/gi, "").replace(/[_\s]/g, "") + "'";
    let divItemContainer = puma("<div class='vrSplitButton_divItemContainer' " + divItemContainerValue + "></div>").vrAppendToPuma(this._popup);
    let button = createButton(
      {
        text: item.text,
        icon: item.icon,
        imageUrl: item.imageUrl,
        mode: item.mode,
        colorSettings: item.colorSettings,
        confirmationMessage: item.confirmationMessage,
        tooltip: item.tooltip,
        visible: item.visible,
        enable: item.enable,
        tag: item.value,
        width: "100%",
        css: "width: 100%; text-align: left; border: none;" + item.css,
        cssContainer: item.cssContainer + ";" + (options.separator ? "border-bottom: solid 1px #dedede;" : ""),
        class: item.class,
        tabIndex: options.tabIndex,
        onClick: (e) => {
          this.close();
          if (item.onClick != null) {
            let clickEvent = new SplitButtonClickEvent();
            clickEvent.sender = this;
            clickEvent.item = item;
            item.onClick(clickEvent);
          }
          if (options.onSelect != null) {
            let clickEvent = new SplitButtonSelectClickEvent();
            clickEvent.text = options.text;
            clickEvent.value = String(item.value);
            clickEvent.mainButton = false;
            options.onSelect(clickEvent);
          }
        }
      },
      divItemContainer
    );
    if (item.value != null)
      puma(button.element()).attr("value", item.value);
    this._itemButtonList.push(button);
  }
  addItem(item) {
    this.drawItem(item);
    this._items.push(item);
  }
  removeItem(value) {
    puma(this._popup).find(".vrSplitButton_divItemContainer[value='" + value + "']").remove();
    this._items.vrDeleteAllBy((k) => k.value == value);
  }
  clearItems() {
    puma(this._popup).empty();
    this._items = [];
    this._itemButtonList = [];
  }
  enable() {
    super.enable();
    puma(this.container()).find(".vrDivPickerIconSplitButton").removeClass("vrDivPickerIconDisable");
    puma(this.container()).find(".vrDivPickerIconSplitButtonFlat").removeClass("vrDivPickerIconDisable");
    if (this._btnMain != null)
      this._btnMain.enable();
  }
  disable() {
    super.disable();
    puma(this.container()).find(".vrDivPickerIconSplitButton").addClass("vrDivPickerIconDisable");
    puma(this.container()).find(".vrDivPickerIconSplitButtonFlat").addClass("vrDivPickerIconDisable");
    if (this._btnMain != null)
      this._btnMain.disable();
  }
  //#region Visibility
  itemVisible(value, state) {
    let itemButton = this._itemButtonList.filter((k) => k.tag() == value)[0];
    if (state != null) {
      itemButton.visible(state);
      let index = this._items.findIndex((k) => k.value == value);
      let item = this._items[index];
      item.visible = state;
    }
    return itemButton.visible();
  }
  showItem(value) {
    this.itemVisible(value, true);
  }
  showItems(values) {
    for (let value of values)
      this.showItem(value);
  }
  showOnlyThisItem(value) {
    for (let item of this._itemButtonList)
      this.itemVisible(item.tag(), item.tag() == value);
  }
  hideItem(value) {
    this.itemVisible(value, false);
  }
  hideItems(values) {
    for (let value of values)
      this.hideItem(value);
  }
  hideOnlyThisItem(value) {
    for (let item of this._itemButtonList)
      this.itemVisible(item.tag(), item.tag() != value);
  }
  //#endregion
  //#region Enable
  itemEnable(value, state) {
    let itemButton = this._itemButtonList.filter((k) => k.tag() == value)[0];
    if (state != null) {
      itemButton.enabled(state);
      let index = this._items.findIndex((k) => k.value == value);
      let item = this._items[index];
      item.enable = state;
    }
    return itemButton.enabled();
  }
  enableAllItems() {
    this.enableItems(this.items().map((k) => String(k.value)));
  }
  enableItems(values) {
    for (let value of values)
      this.enableItem(value);
  }
  enableItem(value) {
    this.itemEnable(value, true);
  }
  disableAllItems() {
    this.disableItems(this.items().map((k) => String(k.value)));
  }
  disableItems(values) {
    for (let value of values)
      this.disableItem(value);
  }
  disableItem(value) {
    this.itemEnable(value, false);
  }
  //#endregion
  item(value) {
    let itemButton = this._itemButtonList.filter((k) => k.tag() == value)[0];
    return itemButton;
  }
  mainItem() {
    return this._btnMain;
  }
  getOptions() {
    return this.options();
  }
  //#endregion
  //#region Events
  click() {
    let options = this.getOptions();
    if (options.onClick != null) {
      let clickEvent = new SplitButtonMainClickEvent();
      clickEvent.sender = this;
      clickEvent.text = options.text;
      clickEvent.items = options.items;
      options.onClick(clickEvent);
    }
    if (options.onSelect != null) {
      let clickEvent = new SplitButtonSelectClickEvent();
      clickEvent.text = options.text;
      clickEvent.mainButton = true;
      options.onSelect(clickEvent);
    }
  }
  //#endregion
}
class SplitButtonItem {
  text;
  value;
  icon;
  imageUrl;
  separator;
  mode;
  colorSettings;
  confirmationMessage;
  visible;
  enable;
  tooltip;
  css;
  cssContainer;
  class;
  onClick;
}
class SplitButtonClickEvent {
  sender;
  item;
}
class SplitButtonMainClickEvent {
  sender;
  text;
  value;
  items;
}
class SplitButtonSelectClickEvent {
  text;
  value;
  mainButton;
}
export {
  SplitButton,
  SplitButtonItem,
  SplitButtonOptions
};
//# sourceMappingURL=splitButton.js.map
