import { VrControl, VrControlOptions, VrControlsEvent } from "../common";
import { ControlTypeEnum, createIcon, createTextBox, IconClassicLight, IconClass, puma } from "../vr";
import { TextBox } from "./textbox";

//#region Options
export class SearchBarOptions extends VrControlOptions
{
	collapsed?: boolean;
	icon?: IconClass | boolean;
	placeholder?: string;
	expandOnClick?: boolean;
	collapseOnBlur?: boolean;

	onClick?(e: SearchBarClickEvent): void;
	onKeyUp?(e: SearchBarKeyUpEvent): void;
	onEnterKey?(e: SearchBarEnterKeyEvent): void;
	onBlur?(e: SearchBarBlurEvent): void;
}
//#endregion

//#region Control
export class SearchBar extends VrControl
{
	//#region Variables
	private _textBox: TextBox;
	private _previousValue: string;
	//#endregion

	constructor(element: HTMLElement, options?: SearchBarOptions | null)
	{
		//#region Options
		if (options == null)
			options = new SearchBarOptions();

		if (options.expandOnClick == null) options.expandOnClick = true;
		if (options.collapseOnBlur == null) options.collapseOnBlur = false;
		if (options.collapsed == null) options.collapsed = false;
		if (options.placeholder == null) options.placeholder = "Cerca...";

		if (options.icon == null) options.icon = true;
		if (options.icon == true) options.icon = IconClassicLight.Search;
		//#endregion

		super(element, options, ControlTypeEnum.SearchBar);

		//#region Icon
		if (options.icon !== false)
		{
			createIcon({
				value: options.icon,
				color: (options.onClick != null) ? "#878787" : "#CCC",
				onClick: (e) =>
				{
					if (options!.expandOnClick != null)
						this.expand();

					if (options!.onClick != null)
					{
						let clickEvent = new SearchBarClickEvent();
						clickEvent.sender = this;
						clickEvent.value = this.value();
						options!.onClick(clickEvent);
					}
				}
			}, this.element())
		}
		//#endregion

		//#region TextBox
		this._textBox = createTextBox({
			placeholder: options.placeholder,
			width: (options.icon !== false) ? "Calc(100% - 16px)" : "100%",
			onKeyDown: (e) => this._previousValue = this.value(),
			onKeyUp: (e) =>
			{
				if (options!.onKeyUp != null)
				{
					let keyUpEvent = new SearchBarKeyUpEvent();
					keyUpEvent.sender = this;
					keyUpEvent.value = this.value();
					keyUpEvent.previousValue = this._previousValue;
					options!.onKeyUp!(keyUpEvent);
				}
			},
			onEnterKey: () =>
			{
				if (options!.onEnterKey != null)
				{
					let enterKeyPressEvent = new SearchBarEnterKeyEvent();
					enterKeyPressEvent.sender = this;
					enterKeyPressEvent.value = this.value();
					options!.onEnterKey(enterKeyPressEvent);
				}
			},
			onBlur: (e) =>
			{
				if (options!.collapseOnBlur)
					this.collapse();

				if (options!.onBlur != null)
				{
					let blurEvent = new SearchBarBlurEvent();
					blurEvent.sender = this;
					blurEvent.value = this.value();
					options!.onBlur(blurEvent);
				}
			}
		}, this.element())
		//#endregion

		//#region Collapsed
		if (options.collapsed)
			this.collapse();
		//#endregion
	}

	//#region Methods
	value(text?: string)
	{
		return this._textBox.value<string>(text);
	}

	clear()
	{
		this._textBox.clear();
	}

	//#region Collapse/Expand
	collapse()
	{
		this._textBox.hide();
		this.container().style.cssText += "border-bottom: none;";
	}

	expand()
	{
		this._textBox.show();
		this._textBox.focus();
		this.container().style.cssText += "border-bottom: solid 1px #d9d9d9;";
	}

	isCollapsed()
	{
		return !this._textBox.visible();
	}
	//#endregion

	focus()
	{
		this._textBox.focus();
	}
	//#endregion
}
//#endregion

//#region Classes
class SearchBarEvent extends VrControlsEvent
{
	sender: SearchBar;
	value: string;
}

class SearchBarKeyUpEvent extends SearchBarEvent
{
	previousValue: string;
}

class SearchBarEnterKeyEvent extends SearchBarEvent
{
}

class SearchBarClickEvent extends SearchBarEvent
{
}

class SearchBarBlurEvent extends SearchBarEvent
{
}
//#endregion