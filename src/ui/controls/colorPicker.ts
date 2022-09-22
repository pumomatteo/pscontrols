import { ColorPickerManager } from "../../../src/managers/colorPickerManager";
import { VrControl, VrControlOptions, VrControlsEvent } from "../common";
import { ColorPickerModeEnum, ColorPickerRgbaValue, ControlTypeEnum, createIcon, div, IconClassLight, IconClass, puma } from "../vr";

declare var JSColor: any;

//#region Options
export class ColorPickerOptions extends VrControlOptions
{
	showInput?: boolean;
	mode?: ColorPickerModeEnum;
	palette?: boolean | string[];
	closeButton?: boolean | string;
	alphaChannel?: boolean;
	value?: string | ColorPickerRgbaValue;
	hexUppercase?: boolean;
	clearButton?: boolean;
	hideOnPaletteClick?: boolean;
	emptyMessage?: string;

	onChange?: (e: ColorPickerChangeEvent) => void;
}
//#endregion

//#region Control
export class ColorPicker extends VrControl
{
	//#region Variables
	private _picker: any;
	private _value: string | null;
	//#endregion

	constructor(element: HTMLElement, options?: ColorPickerOptions | null)
	{
		//#region Options
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
		//#endregion

		super(element, options, ControlTypeEnum.ColorPicker);
		try { new ColorPickerManager(); } catch (e) { } // To include js

		this._picker = new JSColor(element, { format: options.mode });
		this._value = null;

		//#region JsColor options
		this._picker.option({
			shadow: false,
			palette: (options.palette !== false) ? options.palette : undefined,
			paletteCols: (options.palette !== false) ? options.palette.length : undefined,
			paletteSetsAlpha: true,
			hideOnPaletteClick: options.hideOnPaletteClick,
			closeButton: (options.closeButton !== false),
			closeText: (options.closeButton !== false) ? options.closeButton : undefined,
			alphaChannel: options.alphaChannel,
			required: true,
			uppercase: options.hexUppercase,
			onChange: () => 
			{
				this._value = (this.mode() == ColorPickerModeEnum.Hex) ? this.valueHex() : this.valueRgba();
				this.triggerChange();
			}
		});
		//#endregion

		//#region Width & Height
		this.element().style.cssText += "height: " + ((options.showInput) ? 23 : 27) + "px;";
		//#endregion

		//#region Input
		if (options.showInput)
		{
			let minWidth = (options.mode == ColorPickerModeEnum.Hex) ? 60 : 120;
			this.element().style.cssText += "width: " + minWidth + "px; min-width: " + minWidth + "px !important;";
		}
		else
			this.element().style.cssText += "width: 27px; min-width: unset !important; background-image: unset !important; position: relative;";
		//#endregion

		//#region Value
		this.clear();

		if (options.value != null)
			this.value(options.value);
		//#endregion

		//#region Open elements
		if (!options.showInput)
		{
			let divOpen = div(this.element(), { class: "vrColorPickerDivOpen", css: "position: absolute; cursor: pointer; text-align: center; bottom: 0px; left: 0px; height: 5px; background-color: rgba(0, 0, 0, 0.2); width: 24px; border-bottom-left-radius: 4px; border-bottom-right-radius: 4px; border: solid 1px #CCC; border-top: none;" })
			createIcon({
				value: IconClassLight.CaretUp,
				color: "rgba(255, 255, 255, 0.8)",
				width: "100%",
				fontSize: 12,
				cursorPointer: true,
				cssContainer: "top: -4px;"
			}, divOpen);

			puma(divOpen).on("click", (e: JQuery.ClickEvent) => this.open());
		}
		//#endregion

		//#region Clear icon
		if (options.clearButton)
		{
			let clearIcon = createIcon({
				id: element.id + "_someStuff",
				cssContainer: "background-color: #FFF; width: 20px; height: 20px; cursor: pointer; position: absolute; left: 13px; z-index: 9999999; top: " + ((options.showInput) ? "155" : "152") + "px;",
				value: IconClassLight.Eraser,
				classContainer: "vrColorPickerClearIcon",
				visible: false,
				onClick: (e) => this.clear(true)
			}, document.body, null, this.element().id + "_vrColorPickerClearIcon");

			puma("body").on("DOMNodeRemoved", ".jscolor-picker-wrap", (e: any) =>
			{
				e.target.style.cssText += "z-index: 999999 !important;";
				if (clearIcon.element() != null) clearIcon.element().style.cssText += "color: transparent;";
				if (clearIcon.container() != null) clearIcon.container().style.cssText += "background-color: transparent;";

				window.setTimeout(() => 
				{
					clearIcon.hide();
					e.target.style.cssText += "z-index: 999999 !important;";
				}, 300);
			});

			puma("body").on("DOMNodeInserted", ".jscolor-picker-wrap", (e: any) =>
			{
				let top = puma(puma(".jscolor-picker-wrap")[0]).position().top + 125;
				let left = puma(puma(".jscolor-picker-wrap")[0]).position().left + 13;
				if (clearIcon.container() != null) clearIcon.container().style.cssText += "top: " + top + "px; left: " + left + "px;";

				e.target.style.cssText += "z-index: 999999 !important;";
				if (clearIcon.element() != null) clearIcon.element().style.cssText += "color: #000;";
				if (clearIcon.container() != null) clearIcon.container().style.cssText += "background-color: #FFF;";
				clearIcon.show();

				window.setTimeout(() => 
				{
					clearIcon.show();
					e.target.style.cssText += "z-index: 999999 !important;";

					let top = puma(puma(".jscolor-picker-wrap")[0]).position().top + 125;
					let left = puma(puma(".jscolor-picker-wrap")[0]).position().left + 13;
					if (clearIcon.container() != null) clearIcon.container().style.cssText += "top: " + top + "px; left: " + left + "px;";
				}, 300);
			});
		}
		//#endregion
	}

	//#region Methods
	value(value?: string | ColorPickerRgbaValue, triggerChange = true)
	{
		if (value != null)
		{
			if (typeof (value) == "string")
				this.valueHex(value, triggerChange);
			else
				this.valueRgba(value, triggerChange);
		}
		return this._value;
	}

	valueHex(value?: string, triggerChange = true)
	{
		if (value != null)
		{
			this._picker.fromString(value);
			this._value = this._picker.toHEXString();

			if (triggerChange)
				this.triggerChange();
		}
		return this._picker.toHEXString();
	}

	valueRgba(value?: ColorPickerRgbaValue, triggerChange = true)
	{
		if (value != null)
		{
			this._picker.fromRGBA(value.r, value.g, value.b, (value.a != null) ? value.a : 1);
			this._value = this._picker.toRGBAString();

			if (triggerChange)
				this.triggerChange();
		}
		return this._picker.toRGBAString();
	}

	randomize(triggerChange = true)
	{
		this._picker.randomize();
		this._value = this.valueHex();

		if (triggerChange)
			this.triggerChange();

		return this.value();
	}

	open()
	{
		this._picker.show();
	}

	close()
	{
		this._picker.hide();
	}

	mode()
	{
		return this.getOptions().mode!;
	}

	triggerChange()
	{
		let options = this.getOptions();

		//#region Change event
		if (options!.onChange != null)
		{
			let event = new ColorPickerChangeEvent();
			event.sender = this;
			event.value = this.value();
			event.valueHex = this.valueHex();
			event.valueRgba = this.valueRgba();
			options!.onChange(event);
		}
		//#endregion
	}

	clear(triggerChange = false)
	{
		let options = this.getOptions();
		this._value = null;

		this.element().style.cssText += "background-image: unset;";
		this.element().style.cssText += "background: url('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/wAALCAAoACgBAREA/8QAFgABAQEAAAAAAAAAAAAAAAAAAAEG/8QAKRAAAgECBQMDBQEAAAAAAAAAAREAIWESMUFRUjJCcYGhwQJigqLC0f/aAAgBAQAAPwDbVZJIJOZGX1DYXgaKhHST2+Yokim1q9/Ebur6l3eJasFgEBA6AbG8LRIiuHjeT3eQ53i+KmWL4jfRZ/ZCqkya4eV4CQTTo83e0bvLuXxLV6Nei/2QaL8X8xRFtOqzdrRdt0xcrR6pa8LRbDfD/Ue7/eL4kqYuNpassAECoGQG4vINFUnpfd5iizKeer28Ru6LqXb4lqwAA1QaEbm8/9k=') no-repeat !important;";

		if (options.showInput)
		{
			(this.element() as HTMLInputElement).value = "";
			(this.element() as HTMLInputElement).placeholder = options.emptyMessage!;
			this.element().style.cssText += "background-size: 30px 30px !important;";
		}
		// else
		// 	this.element().style.cssText += "background-size: 40px 40px !important;";

		if (triggerChange)
			this.triggerChange();
	}

	//#region Overrides
	enable(): void
	{
		super.enable();
		window.setTimeout(() =>
		{
			let options = this.getOptions();
			if (!options.showInput)
			{
				this._picker.option("showOnClick", true);
				puma(this.container()).find(".vrColorPickerDivOpen").show();
			}
			else
				puma(this.element()).removeAttr("disabled");
		});
	}

	disable(): void
	{
		super.disable();
		window.setTimeout(() => 
		{
			let options = this.getOptions();
			if (!options.showInput)
			{
				this._picker.option("showOnClick", false);
				puma(this.container()).find(".vrColorPickerDivOpen").hide();
			}
			else
				puma(this.element()).attr("disabled", "disabled");
		});
	}
	//#endregion

	getOptions()
	{
		return this.options<ColorPickerOptions>();
	}
	//#endregion
}

//#region Classes
class ColorPickerEvent extends VrControlsEvent
{
	sender: ColorPicker;
}

class ColorPickerChangeEvent extends ColorPickerEvent
{
	value: string | null;
	valueHex: string;
	valueRgba: string;
}
//#endregion