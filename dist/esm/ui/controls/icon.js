import { VrControl, VrControlsEvent, VrControlOptions } from "../common.js";
import { ControlTypeEnum, puma, confirm } from "../vr.js";
class IconOptions extends VrControlOptions {
  value;
  color;
  fontSize;
  cursorPointer;
  confirmationMessage;
  tooltip;
  onClick;
  onMouseDown;
  onRejectedConfirm;
}
class Icon extends VrControl {
  constructor(element, options) {
    if (options == null)
      options = new IconOptions();
    if (options.color == null) options.color = "#000";
    if (options.cursorPointer == null) options.cursorPointer = false;
    if (options.tabIndex == null) options.tabIndex = -1;
    super(element, options, ControlTypeEnum.Icon);
    puma(this.element()).attr("aria-hidden", "true");
    this.color(options.color);
    if (options.fontSize != null)
      this.fontSize(options.fontSize);
    if (options.value != null)
      this.value(options.value);
    if (options.tooltip != null)
      puma(this.element()).attr("title", options.tooltip);
    if (options.cursorPointer || options.onClick != null || options.onMouseDown) {
      this.container().style.cssText += "cursor: pointer;";
      this.element().style.cssText += "cursor: pointer;";
    }
    puma(this.container()).on("click", (e) => {
      this.click();
    });
    puma(this.container()).on("mousedown", (e) => {
      this.mouseDown();
    });
  }
  //#region Methods
  value(value) {
    let options = this.getOptions();
    if (value != null) {
      puma(this.element()).removeClass(options.value);
      puma(this.element()).addClass(value);
      options.value = value;
    }
    return options.value;
  }
  fontSize(fontSize) {
    let options = this.getOptions();
    if (fontSize != null) {
      if (typeof fontSize == "number")
        fontSize = fontSize + "px";
      this.element().style.cssText += "font-size: " + fontSize + ";";
      options.fontSize = fontSize;
    }
    return options.fontSize;
  }
  color(color) {
    let options = this.getOptions();
    if (color != null) {
      this.element().style.cssText += "color: " + color + ";";
      options.color = color;
    }
    return options.color;
  }
  click() {
    if (!this.enabled())
      return;
    let options = this.getOptions();
    if (options.confirmationMessage != null)
      confirm(options.confirmationMessage).then(() => this.internalClick(), () => this.rejectedConfirm());
    else
      this.internalClick();
  }
  internalClick() {
    let options = this.getOptions();
    if (options.onClick != null) {
      let clickEvent = new VrIconClickEvent();
      clickEvent.sender = this;
      clickEvent.value = this.value();
      options.onClick(clickEvent);
    }
  }
  mouseDown() {
    if (!this.enabled())
      return;
    let options = this.getOptions();
    if (options.confirmationMessage != null)
      confirm(options.confirmationMessage).then(() => this.internalMouseDown(), () => this.rejectedConfirm());
    else
      this.internalMouseDown();
  }
  internalMouseDown() {
    let options = this.getOptions();
    if (options.onMouseDown != null) {
      let clickEvent = new VrIconClickEvent();
      clickEvent.sender = this;
      clickEvent.value = this.value();
      options.onMouseDown(clickEvent);
    }
  }
  rejectedConfirm() {
    let options = this.getOptions();
    if (options.onRejectedConfirm != null)
      options.onRejectedConfirm();
  }
  getOptions() {
    return this.options();
  }
  //#endregion
}
class VrIconClickEvent extends VrControlsEvent {
  sender;
  value;
}
export {
  Icon,
  IconOptions
};
//# sourceMappingURL=icon.js.map
