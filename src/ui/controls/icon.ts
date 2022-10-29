import { VrControl, VrControlOptions, VrControlsEvent } from "../common";
import { ControlTypeEnum, IconClassicLight, IconClass, puma, confirm } from "../vr";

//#region Options
export class IconOptions extends VrControlOptions
{
	value?: string | IconClassicLight;
	color?: string;
	fontSize?: number | string;
	cursorPointer?: boolean;
	confirmationMessage?: string;
	tooltip?: string;

	onClick?: (e: VrIconClickEvent) => void;
	onRejectedConfirm?: () => void;
}
//#endregion

//#region Control
export class Icon extends VrControl
{
	constructor(element: HTMLElement, options?: IconOptions | null)
	{
		//#region Options
		if (options == null)
			options = new IconOptions();

		if (options.color == null) options.color = "#000";
		if (options.cursorPointer == null) options.cursorPointer = false;
		if (options.tabIndex == null) options.tabIndex = -1;
		//#endregion

		super(element, options, ControlTypeEnum.Icon);

		puma(this.element()).attr("aria-hidden", "true");

		//#region Color & Font
		this.color(options.color);

		if (options.fontSize != null)
			this.fontSize(options.fontSize);
		//#endregion

		//#region Value
		if (options.value != null)
			this.value(options.value);
		//#endregion

		//#region Tooltip
		if (options.tooltip != null)
			puma(this.element()).attr("title", options.tooltip);
		//#endregion

		//#region Cursor
		if (options.cursorPointer || options.onClick != null)
		{
			this.container().style.cssText += "cursor: pointer;";
			this.element().style.cssText += "cursor: pointer;";
		}
		//#endregion

		//#region Click
		puma(this.container()).on("click", (e: JQuery.ClickEvent) =>
		{
			this.click();
		});
		//#endregion
	}

	//#region Methods
	value(value?: string | IconClassicLight)
	{
		let options = this.getOptions();
		if (value != null) 
		{
			puma(this.element()).removeClass(options.value);
			puma(this.element()).addClass(value);
			options.value = value;
		}
		return options.value;
	}

	fontSize(fontSize?: number | string)
	{
		let options = this.getOptions();
		if (fontSize != null)
		{
			if (typeof (fontSize) == "number")
				fontSize = fontSize + "px";

			this.element().style.cssText += "font-size: " + fontSize + ";";
			options.fontSize = fontSize;
		}
		return options.fontSize;
	}

	color(color?: string)
	{
		let options = this.getOptions();
		if (color != null)
		{
			this.element().style.cssText += "color: " + color + ";";
			options.color = color;
		}
		return options.color;
	}

	click(): void
	{
		let options = this.getOptions();
		if (options.confirmationMessage != null)
			confirm(options.confirmationMessage).then(() => this.internalClick(), () => this.rejectedConfirm());
		else
			this.internalClick();
	}

	private internalClick()
	{
		let options = this.getOptions();
		if (options!.onClick != null)
		{
			let clickEvent = new VrIconClickEvent();
			clickEvent.sender = this;
			clickEvent.value = this.value();
			options!.onClick(clickEvent);
		}
	}

	private rejectedConfirm()
	{
		let options = this.getOptions();
		if (options.onRejectedConfirm != null)
			options.onRejectedConfirm();
	}

	getOptions()
	{
		return this.options<IconOptions>();
	}
	//#endregion
}
//#endregion

//#region Classes
class VrIconClickEvent extends VrControlsEvent
{
	sender: Icon;
	value?: string | IconClassicLight;
}
//#endregion