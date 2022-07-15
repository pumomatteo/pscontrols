import { VrControl, VrControlOptions, VrControlsEvent } from "../common";
import { ControlTypeEnum, DivBorderSettings, DivBorderSpecificSettings, DivColorSettings } from "../vr";

//#region Options
export class DivOptions extends VrControlOptions
{
	text?: string;
	fontSize?: number;
	tooltip?: string;
	inline?: boolean;
	colorSettings?: DivColorSettings;
	border?: DivBorderSettings | boolean;
}
//#endregion

//#region Control
export class Div extends VrControl
{
	constructor(element: HTMLElement, options?: DivOptions | null)
	{
		//#region Options
		if (options == null)
			options = new DivOptions();

		if (options.addToControlList == null) options.addToControlList = false;
		if (options.fontSize == null) options.fontSize = 14;
		if (options.border == null) options.border = false;
		if (options.inline == null) options.inline = false;
		if (options.tabIndex == null) options.tabIndex = -1;
		//#endregion

		super(element, options, ControlTypeEnum.Div);

		//#region Font size
		this.element().style.cssText += "font-size: " + options.fontSize + "px;";
		//#endregion

		//#region Mode
		this.container().style.cssText += "display: flex;";
		this.element().style.cssText += "width: 100%;";

		if (options.inline)
			this.container().style.cssText += "display: inline-block;";
		//#endregion

		//#region Content
		if (options.text != null)
			this.text(options.text);
		//#endregion

		//#region Color
		if (options.colorSettings != null)
		{
			if (options.colorSettings.textColor == null) this.element().style.cssText += "color: " + options.colorSettings.textColor + ";";
			if (options.colorSettings.background == null) this.element().style.cssText += "background-color: " + options.colorSettings.background + ";";
		}
		//#endregion

		//#region Border
		if (options.border !== false)
		{
			if (options.border === true) options.border = new DivBorderSettings();
			if (options.border.type == null) options.border.type = "solid";
			if (options.border.color == null) options.border.color = "#d9d9d9";
			if (options.border.size == null) options.border.size = 1;
			this.element().style.cssText += "border: " + options.border.type + " " + options.border.size + "px " + options.border.color + ";";

			this.setBorderTop(options.border.top, "top");
			this.setBorderTop(options.border.right, "right");
			this.setBorderTop(options.border.bottom, "bottom");
			this.setBorderTop(options.border.left, "left");
		}
		//#endregion
	}

	//#region Methods
	text(text?: string)
	{
		if (text != null)
			this.element().innerHTML = text;

		return this.element().innerHTML;
	}

	appendText(text: string)
	{
		this.element().innerHTML = this.text() + text;
	}

	private setBorderTop(borderSettings?: DivBorderSpecificSettings | boolean, position?: string)
	{
		if (borderSettings == null) borderSettings = true;
		if (borderSettings === true) borderSettings = new DivBorderSpecificSettings();
		if (borderSettings !== false)
		{
			if (borderSettings.type == null) borderSettings.type = "solid";
			if (borderSettings.size == null) borderSettings.size = 1;
			if (borderSettings.color == null) borderSettings.color = "d9d9d9";
			this.element().style.cssText += "border-" + position! + ": " + borderSettings.type + " " + borderSettings.size + "px " + borderSettings.color + ";";
		}
		else
			this.element().style.cssText += "border-" + position! + ": none";
	}

	getOptions()
	{
		return this.options<DivOptions>();
	}
	//#endregion
}
//#endregion