import { RatingPrecisionEnum, ControlTypeEnum, puma, createLabel } from "../vr.js";
import { VrControl, VrControlOptions } from "../common.js";
import { UtilityManager } from "../../managers/utilityManager.js";
class RatingOptions extends VrControlOptions {
  value;
  max;
  size;
  precision;
  tooltip;
  colorSettings;
  total;
  readonly;
  onSelect;
}
class Rating extends VrControl {
  _value;
  _lblTotal;
  constructor(element, options) {
    if (options == null)
      options = new RatingOptions();
    if (options.max == null) options.max = 5;
    if (options.size == null) options.size = 20;
    if (options.precision == null) options.precision = RatingPrecisionEnum.Full;
    if (options.tooltip == null) options.tooltip = false;
    if (options.enable == null) options.enable = true;
    if (options.colorSettings == null)
      options.colorSettings = new RatingColorSettings();
    if (options.colorSettings.selected == null) options.colorSettings.selected = "#FFD700";
    if (options.colorSettings.hover == null) options.colorSettings.hover = "#FFED85";
    if (options.colorSettings.notSelected == null) options.colorSettings.notSelected = "#DDD";
    super(element, options, ControlTypeEnum.Rating);
    this.color(options.colorSettings);
    let radioName = this.element().id + "vrRating";
    for (let i = options.max; i > 0; i--) {
      let radioFullId = this.element().id + "_star" + i;
      let titleFull = options.tooltip ? "title='" + i + "'" : "";
      puma(`<input id='` + radioFullId + `' type='radio' name='` + radioName + `' value='` + i + `' /><label class='vrRatingFull' for='` + radioFullId + `' ` + titleFull + `></label>`).vrAppendToPuma(this.element());
      if (options.precision == RatingPrecisionEnum.Half) {
        let radioHalfId = this.element().id + "_star" + (i - 0.5);
        let titleHalf = options.tooltip ? "title='" + i + "'" : "";
        puma(`<input id='` + radioHalfId + `' type='radio' name='` + radioName + `' value='` + (i - 0.5) + `' /><label class='vrRatingHalf' for='` + radioHalfId + `' ` + titleHalf + `></label>`).vrAppendToPuma(this.element());
      }
    }
    this._lblTotal = createLabel(
      {
        cssContainer: "margin-left: 5px; margin-top: -6px;"
      },
      this.container()
    );
    if (options.total != null)
      this.total(options.total);
    this.size(options.size);
    if (options.enable) this.enable();
    else this.disable();
    puma(this.element()).find("input").click((e) => {
      let currentValue = e.currentTarget.value;
      if (options.onSelect != null) {
        let selectEvent = new RatingSelectEvent();
        selectEvent.sender = this;
        selectEvent.oldValue = this._value;
        selectEvent.value = currentValue;
        options.onSelect(selectEvent);
      }
      this._value = currentValue;
    });
    if (options.value != null)
      this.value(options.value);
  }
  //#endregion
  //#region Methods
  value(value, triggerChange = true) {
    if (value != null) {
      this.clear();
      if (value > 0) {
        let realValue = 0;
        let decimalPart = value % 1;
        let integerPart = Math.trunc(value);
        if (decimalPart == 0 || decimalPart > integerPart && decimalPart < 0.2)
          realValue = integerPart;
        else if (decimalPart > 0.2 && decimalPart < 0.7)
          realValue = integerPart + 0.5;
        else if (decimalPart > 0.7)
          realValue = integerPart + 1;
        puma(this.element()).find("input[value='" + realValue + "']").attr("checked", true);
        this._value = realValue;
      }
    }
    let checkedInput = puma(this.element()).find("input:checked")[0];
    return checkedInput != null ? checkedInput.value : null;
  }
  clear() {
    puma(this.element()).find("input").removeAttr("checked");
    this._value = 0;
  }
  color(colorSettings) {
    let options = this.getOptions();
    if (colorSettings != null) {
      if (colorSettings.hover != null) options.colorSettings.hover = colorSettings.hover;
      if (colorSettings.selected != null) options.colorSettings.selected = colorSettings.selected;
      if (colorSettings.notSelected != null) options.colorSettings.notSelected = colorSettings.notSelected;
      UtilityManager.addCssStyle(
        `#${this.id()}>label {
                    color: ` + options.colorSettings.notSelected + `;
                    float: right;
                    cursor: pointer;
                }

                #${this.id()}>input:checked~label, #${this.id()}.hover:not(:checked)>label:hover, #${this.id()}.hover:not(:checked)>label:hover~label {
                    color: ` + options.colorSettings.selected + `;
                }

                #${this.id()}.hover>input:checked+label:hover, #${this.id()}.hover>input:checked~label:hover, #${this.id()}.hover>label:hover~input:checked~label, #${this.id()}.hover>input:checked~label:hover~label {
                    color: ` + options.colorSettings.hover + `;
                }`
      );
    }
    return options.colorSettings;
  }
  size(size) {
    if (size != null) {
      if (typeof size == "number")
        size = size + "px";
      UtilityManager.addCssStyle(
        `#${this.id}>label:before {
                    font-size: ` + size + `;
                }`
      );
    }
    let firstInput = puma(this.element()).find("input")[0];
    if (firstInput != null) {
      let firstInputId = firstInput.id;
      let fistLabel = puma(this.element()).find("label[for='" + firstInputId + "']")[0];
      return window.getComputedStyle(fistLabel, ":before").fontSize.vrGetNumericPart();
    }
    return 0;
  }
  total(total) {
    if (total != null)
      this._lblTotal.value("(" + total + ")");
    return this._lblTotal.value().vrGetNumericPart();
  }
  enable() {
    super.enable();
    puma(this.element()).addClass("hover");
    puma(this.element()).find("input").removeAttr("disabled");
  }
  disable() {
    super.disable();
    puma(this.element()).removeClass("hover");
    puma(this.element()).find("input").attr("disabled", true);
  }
  getOptions() {
    return this.options();
  }
  //#endregion
}
class RatingSelectEvent {
  sender;
  value;
  oldValue;
}
class RatingColorSettings {
  selected;
  hover;
  notSelected;
}
export {
  Rating,
  RatingOptions
};
//# sourceMappingURL=rating.js.map
