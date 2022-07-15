import { Ecc, QrCodeManager } from "../../../src/managers/qrCodeManager";
import { VrControl, VrControlOptions, VrControlsEvent } from "../common";
import { BorderStyleEnum, ControlTypeEnum, puma } from "../vr";

//#region Options
export class QrCodeOptions extends VrControlOptions
{
	value?: string | number;
	color?: string;
	border?: boolean | QrCodeBorderSettings;
	wrap?: boolean;

	onClick?: (e: QrCodeClickEvent) => void;
}
//#endregion

//#region Control
export class QrCode extends VrControl
{
	//#region Variables
	private _value: string | number;
	private _svg: SVGElement;
	//#endregion

	constructor(element: HTMLElement, options?: QrCodeOptions | null)
	{
		//#region Options
		if (options == null)
			options = new QrCodeOptions();

		if (options.width == null) options.width = 200;
		if (options.color == null) options.color = "#000000";
		if (options.wrap == null) options.wrap = true;
		if (options.tabIndex == null) options.tabIndex = -1;

		if (options.border == null) options.border = false;
		if (options.border === true) options.border = new QrCodeBorderSettings();
		if (options.border !== false)
		{
			if (options.border.color == null) options.border.color = options.color;
			if (options.border.size == null) options.border.size = 1;
			if (options.border.style == null) options.border.style = BorderStyleEnum.Solid;
		}
		//#endregion

		super(element, options, ControlTypeEnum.QrCode);

		if (options.value != null)
			this.value(options.value);

		//#region Events
		if (options.onClick != null)
		{
			this.element().style.cssText += "cursor: pointer;";
			puma(this.element()).on("click", (e: JQuery.ClickEvent) => 
			{
				let clickEvent = new QrCodeClickEvent();
				clickEvent.sender = this;
				clickEvent.value = this.value();
				options!.onClick!(clickEvent);
			})
		}
		//#endregion
	}

	//#region Methods
	value(value?: string | number)
	{
		if (value != null) 
		{
			if (value === "")
			{
				this.clear();
				return "";
			}

			let options = this.getOptions();
			puma(this.element()).empty();

			let qr0: QrCodeManager = QrCodeManager.encodeText(String(value), Ecc.MEDIUM);
			let svg = qr0.toSvgString(4, options.color!);
			puma(this.element()).vrAppendPuma(svg);

			this._svg = puma(this.element()).find("svg")[0];

			if (!options.wrap)
				puma(this._svg).find("rect")[0].style.cssText += "fill: transparent;";

			if (options.border !== false)
			{
				let border = options.border as QrCodeBorderSettings;
				this._svg.style.cssText += "border-style: " + border.style + "; border-width: " + border.size + "px; border-color: " + border.color + ";";
			}

			this._value = value;
			this.tooltip(String(value));
		}
		return String(this._value);
	}

	svg()
	{
		return this._svg;
	}

	clear()
	{
		puma(this.element()).empty();
		this._value = "";
		this.tooltip("");
	}

	getOptions()
	{
		return this.options<QrCodeOptions>();
	}
	//#endregion
}
//#endregion

//#region Classes
class QrCodeBorderSettings
{
	size?: number;
	color?: string;
	style?: string | BorderStyleEnum;
}

class QrCodeClickEvent extends VrControlsEvent
{
	sender: QrCode;
	value: string;
}
//#endregion