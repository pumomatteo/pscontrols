import { ControlTypeEnum, puma } from "../vr.js";
import { VrControl, VrControlOptions } from "../common.js";
class LegendOptions extends VrControlOptions {
  title;
  fontSize;
  fontFamily;
  bold;
}
class Legend extends VrControl {
  constructor(element, options) {
    if (options == null)
      options = new LegendOptions();
    if (options.fontSize == null) options.fontSize = 15;
    if (options.bold == null) options.bold = true;
    if (options.width == null) options.width = "Calc(100% - 10px)";
    if (options.tabIndex == null) options.tabIndex = -1;
    super(element, options, ControlTypeEnum.Legend);
    puma("<h1><span class='vrLegendTitle'>" + options.title + "</span></h1>").vrAppendToPuma(this.element());
    let font = "";
    if (options.fontSize != null) {
      if (typeof options.fontSize == "number")
        options.fontSize = options.fontSize + "px";
      font += "font-size: " + options.fontSize + ";";
    }
    if (options.fontFamily != null)
      font += "font-family: " + options.fontFamily + ";";
    if (options.bold === true)
      font += "font-weight: 600;";
    puma(this.element()).find(".vrLegendTitle")[0].style.cssText += font;
  }
}
export {
  Legend,
  LegendOptions
};
//# sourceMappingURL=legend.js.map
