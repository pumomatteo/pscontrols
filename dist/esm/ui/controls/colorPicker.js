import { ColorPickerManager } from "../../managers/colorPickerManager.js";
import { VrControl, VrControlOptions, VrControlsEvent } from "../common.js";
import { ColorPickerModeEnum, ControlTypeEnum, div, createIcon, IconClassicLight, puma } from "../vr.js";
class ColorPickerOptions extends VrControlOptions {
  showInput;
  mode;
  palette;
  closeButton;
  alphaChannel;
  value;
  hexUppercase;
  clearButton;
  hideOnPaletteClick;
  emptyMessage;
  onChange;
}
class ColorPicker extends VrControl {
  //#region Variables
  _picker;
  _value;
  //#endregion
  constructor(element, options) {
    if (options == null)
      options = new ColorPickerOptions();
    if (options.addToControlList == null) options.addToControlList = false;
    if (options.showInput == null) options.showInput = true;
    if (options.mode == null) options.mode = ColorPickerModeEnum.Hex;
    if (options.alphaChannel == null) options.alphaChannel = true;
    if (options.hexUppercase == null) options.hexUppercase = true;
    if (options.clearButton == null) options.clearButton = true;
    if (options.hideOnPaletteClick == null) options.hideOnPaletteClick = false;
    if (options.emptyMessage == null) options.emptyMessage = "Scegli...";
    if (options.closeButton == null) options.closeButton = false;
    if (options.closeButton === true) options.closeButton = "Chiudi";
    if (options.palette == null) options.palette = true;
    if (options.palette === true)
      options.palette = ["#fff", "#ffffff", "#808080", "#000", "#996e36", "#ff0000", "#ffe438", "#88dd20", "#51B3E1", "#e3f1fa", "#bb1cd4"];
    super(element, options, ControlTypeEnum.ColorPicker);
    try {
      new ColorPickerManager();
    } catch (e) {
    }
    this._picker = new JSColor(element, { format: options.mode });
    this._value = null;
    this._picker.option({
      shadow: false,
      palette: options.palette !== false ? options.palette : void 0,
      paletteCols: options.palette !== false ? options.palette.length : void 0,
      paletteSetsAlpha: true,
      hideOnPaletteClick: options.hideOnPaletteClick,
      closeButton: options.closeButton !== false,
      closeText: options.closeButton !== false ? options.closeButton : void 0,
      alphaChannel: options.alphaChannel,
      required: true,
      uppercase: options.hexUppercase,
      onChange: () => {
        this._value = this.mode() == ColorPickerModeEnum.Hex ? this.valueHex() : this.valueRgba();
        this.triggerChange();
      }
    });
    this.element().style.cssText += "height: " + (options.showInput ? 23 : 27) + "px;";
    if (options.showInput) {
      let minWidth = options.mode == ColorPickerModeEnum.Hex ? 60 : 120;
      this.element().style.cssText += "width: " + minWidth + "px; min-width: " + minWidth + "px !important;";
    } else
      this.element().style.cssText += "width: 27px; min-width: unset !important; background-image: unset !important; position: relative;";
    this.clear();
    if (options.value != null)
      this.value(options.value);
    if (!options.showInput) {
      let divOpen = div(this.element(), { class: "vrColorPickerDivOpen", css: "position: absolute; cursor: pointer; text-align: center; bottom: 0px; left: 0px; height: 5px; background-color: rgba(0, 0, 0, 0.2); width: 24px; border-bottom-left-radius: 4px; border-bottom-right-radius: 4px; border: solid 1px #CCC; border-top: none;" });
      createIcon({
        value: IconClassicLight.CaretUp,
        color: "rgba(255, 255, 255, 0.8)",
        width: "100%",
        fontSize: 12,
        cursorPointer: true,
        cssContainer: "top: -4px;"
      }, divOpen);
      puma(divOpen).on("click", (e) => this.open());
    }
    if (options.clearButton) {
      createIcon({
        id: element.id + "_someStuff",
        cssContainer: "cursor: pointer; position: absolute; left: 24px; bottom: 17px; background-color: #FFF; border-radius: 10px; border: solid 1px #51B3E1; padding: 1px; font-size: 13px; padding-left: 2px; padding-right: 2px;",
        css: "color: #51B3E1 !important;",
        value: IconClassicLight.Delete,
        onClick: (e) => this.clear(true)
      }, this.container(), null, this.element().id + "_vrColorPickerClearIcon");
    }
  }
  //#region Methods
  value(value, triggerChange = true) {
    if (value != null && value != "") {
      if (typeof value == "string")
        this.valueHex(value, triggerChange);
      else
        this.valueRgba(value, triggerChange);
    }
    return this._value;
  }
  valueHex(value, triggerChange = true) {
    if (value != null) {
      this._picker.fromString(value);
      this._value = this._picker.toHEXString();
      if (triggerChange)
        this.triggerChange();
    }
    return this._picker.toHEXString();
  }
  valueRgba(value, triggerChange = true) {
    if (value != null) {
      this._picker.fromRGBA(value.r, value.g, value.b, value.a != null ? value.a : 1);
      this._value = this._picker.toRGBAString();
      if (triggerChange)
        this.triggerChange();
    }
    return this._picker.toRGBAString();
  }
  randomize(triggerChange = true) {
    this._picker.randomize();
    this._value = this.valueHex();
    if (triggerChange)
      this.triggerChange();
    return this.value();
  }
  open() {
    this._picker.show();
  }
  close() {
    this._picker.hide();
  }
  mode() {
    return this.getOptions().mode;
  }
  triggerChange() {
    let options = this.getOptions();
    if (options.onChange != null) {
      let event = new ColorPickerChangeEvent();
      event.sender = this;
      event.value = this.value();
      event.valueHex = this.valueHex();
      event.valueRgba = this.valueRgba();
      options.onChange(event);
    }
  }
  clear(triggerChange = false) {
    let options = this.getOptions();
    this._value = null;
    this.element().style.cssText += "background-image: unset;";
    this.element().style.cssText += "background: url('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/wAALCAAoACgBAREA/8QAFgABAQEAAAAAAAAAAAAAAAAAAAEG/8QAKRAAAgECBQMDBQEAAAAAAAAAAREAIWESMUFRUjJCcYGhwQJigqLC0f/aAAgBAQAAPwDbVZJIJOZGX1DYXgaKhHST2+Yokim1q9/Ebur6l3eJasFgEBA6AbG8LRIiuHjeT3eQ53i+KmWL4jfRZ/ZCqkya4eV4CQTTo83e0bvLuXxLV6Nei/2QaL8X8xRFtOqzdrRdt0xcrR6pa8LRbDfD/Ue7/eL4kqYuNpassAECoGQG4vINFUnpfd5iizKeer28Ru6LqXb4lqwAA1QaEbm8/9k=') no-repeat !important;";
    if (options.showInput) {
      this.element().value = "";
      this.element().placeholder = options.emptyMessage;
      this.element().style.cssText += "background-size: 30px 30px !important;";
    }
    if (triggerChange)
      this.triggerChange();
  }
  //#region Overrides
  enable() {
    super.enable();
    window.setTimeout(() => {
      let options = this.getOptions();
      if (!options.showInput) {
        this._picker.option("showOnClick", true);
        puma(this.container()).find(".vrColorPickerDivOpen").show();
      } else
        puma(this.element()).removeAttr("disabled");
    });
  }
  disable() {
    super.disable();
    window.setTimeout(() => {
      let options = this.getOptions();
      if (!options.showInput) {
        this._picker.option("showOnClick", false);
        puma(this.container()).find(".vrColorPickerDivOpen").hide();
      } else
        puma(this.element()).attr("disabled", "disabled");
    });
  }
  //#endregion
  getOptions() {
    return this.options();
  }
  //#endregion
}
class ColorPickerEvent extends VrControlsEvent {
  sender;
}
class ColorPickerChangeEvent extends ColorPickerEvent {
  value;
  valueHex;
  valueRgba;
}
export {
  ColorPicker,
  ColorPickerOptions
};
//# sourceMappingURL=colorPicker.js.map
