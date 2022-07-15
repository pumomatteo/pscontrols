import { ControlTypeEnum, puma } from "../vr";
import { VrControlOptions, VrControl } from "../common";

//#region Options
export class LegendOptions extends VrControlOptions
{
	title?: string;
	fontSize?: number | string;
	fontFamily?: string;
	bold?: boolean;
}
//#endregion

//#region Control
export class Legend extends VrControl
{
	constructor(element: HTMLElement, options?: LegendOptions | null)
	{
		//#region Options
		if (options == null)
			options = new LegendOptions();

		if (options.fontSize == null) options.fontSize = 15;
		if (options.bold == null) options.bold = true;
		if (options.width == null) options.width = "Calc(100% - 10px)";
		if (options.tabIndex == null) options.tabIndex = -1;
		//#endregion

		super(element, options, ControlTypeEnum.Legend);

		//#region Title
		puma("<h1><span class='vrLegendTitle'>" + options.title + "</span></h1>").vrAppendToPuma(this.element());
		//#endregion

		//#region Font
		let font = "";
		if (options.fontSize != null)
		{
			if (typeof (options.fontSize) == "number")
				options.fontSize = options.fontSize + "px";

			font += "font-size: " + options.fontSize + ";";
		}
		if (options.fontFamily != null)
			font += "font-family: " + options.fontFamily + ";";
		if (options.bold === true)
			font += "font-weight: 600;";

		puma(this.element()).find(".vrLegendTitle")[0].style.cssText += font;
		//#endregion
	}
}
//#endregion