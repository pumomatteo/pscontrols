import { QrCodeManager, Ecc } from "../../managers/qrCodeManager.js";
import { VrControl, VrControlsEvent, VrControlOptions } from "../common.js";
import { BorderStyleEnum, ControlTypeEnum, puma } from "../vr.js";
class QrCodeOptions extends VrControlOptions {
  value;
  color;
  border;
  wrap;
  onClick;
}
class QrCode extends VrControl {
  //#region Variables
  _value;
  _svg;
  //#endregion
  constructor(element, options) {
    if (options == null)
      options = new QrCodeOptions();
    if (options.width == null) options.width = 200;
    if (options.color == null) options.color = "#000000";
    if (options.wrap == null) options.wrap = true;
    if (options.tabIndex == null) options.tabIndex = -1;
    if (options.border == null) options.border = false;
    if (options.border === true) options.border = new QrCodeBorderSettings();
    if (options.border !== false) {
      if (options.border.color == null) options.border.color = options.color;
      if (options.border.size == null) options.border.size = 1;
      if (options.border.style == null) options.border.style = BorderStyleEnum.Solid;
    }
    super(element, options, ControlTypeEnum.QrCode);
    if (options.value != null)
      this.value(options.value);
    if (options.onClick != null) {
      this.element().style.cssText += "cursor: pointer;";
      puma(this.element()).on("click", (e) => {
        let clickEvent = new QrCodeClickEvent();
        clickEvent.sender = this;
        clickEvent.value = this.value();
        options.onClick(clickEvent);
      });
    }
  }
  //#region Methods
  value(value) {
    if (value != null) {
      if (value === "") {
        this.clear();
        return "";
      }
      let options = this.getOptions();
      puma(this.element()).empty();
      let qr0 = QrCodeManager.encodeText(String(value), Ecc.MEDIUM);
      let svg = qr0.toSvgString(4, options.color);
      puma(this.element()).vrAppendPuma(svg);
      this._svg = puma(this.element()).find("svg")[0];
      if (!options.wrap)
        puma(this._svg).find("rect")[0].style.cssText += "fill: transparent;";
      if (options.border !== false) {
        let border = options.border;
        this._svg.style.cssText += "border-style: " + border.style + "; border-width: " + border.size + "px; border-color: " + border.color + ";";
      }
      this._value = value;
      this.tooltip(String(value));
    }
    return String(this._value);
  }
  svg() {
    return this._svg;
  }
  clear() {
    puma(this.element()).empty();
    this._value = "";
    this.tooltip("");
  }
  getOptions() {
    return this.options();
  }
  //#endregion
}
class QrCodeBorderSettings {
  size;
  color;
  style;
}
class QrCodeClickEvent extends VrControlsEvent {
  sender;
  value;
}
export {
  QrCode,
  QrCodeOptions
};
//# sourceMappingURL=qrCode.js.map
