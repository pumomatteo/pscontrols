import { VrControl, VrControlOptions, VrControlsEvent } from "../common";
import { AnimationHideEnum, AnimationShowEnum, ColorSettings, ControlTypeEnum, div, icon, IconClassicLight, IconClass, NotifierOptions, puma, TooltipHideOnEnum, TooltipPositionEnum, TooltipShowOnEnum, TooltipTypeEnum } from "../vr";
import { Notifier } from "./notifier";

//#region Options
export class TooltipOptions extends VrControlOptions
{
	target?: HTMLElement | JQuery | string;
	elementToAppend?: HTMLElement | JQuery | string;
	content?: string;
	type?: TooltipTypeEnum;
	position?: TooltipPositionEnum;
	hideSettings?: TooltipHideSettings;
	showSettings?: TooltipShowSettings;
	colorSettings?: ColorSettings;
	showOn?: TooltipShowOnEnum;
	hideOn?: TooltipHideOnEnum;
	icon?: IconClass;

	onShow?: (e: TooltipShowEvent) => void;
	onHide?: (e: TooltipHideEvent) => void;
}
//#endregion

//#region Control
export class Tooltip extends VrControl
{
	//#region Variables
	private _notifier: Notifier;
	//#endregion

	constructor(element: HTMLElement, options?: TooltipOptions | null)
	{
		//#region Options
		if (options == null)
			options = new TooltipOptions();

		if (options.position == null) options.position = TooltipPositionEnum.BottomCenter;
		if (options.showOn == null) options.showOn = TooltipShowOnEnum.Hover;
		if (options.hideOn == null) options.hideOn = TooltipHideOnEnum.Default;
		if (options.type == null) options.type = TooltipTypeEnum.Default;

		if (options.colorSettings == null) options.colorSettings = new ColorSettings();
		if (options.colorSettings.background == null) options.colorSettings.background = "#d9d9d9";
		if (options.colorSettings.textColor == null) options.colorSettings.textColor = "#000";
		if (options.colorSettings.border == null) options.colorSettings.border = "#CCC";

		if (options.showSettings == null) options.showSettings = new TooltipShowSettings();
		if (options.showSettings.showAfter == null) options.showSettings.showAfter = 500;
		if (options.showSettings.animation == null) options.showSettings.animation = AnimationShowEnum.None;

		if (options.hideSettings == null) options.hideSettings = new TooltipHideSettings();
		if (options.hideSettings.hideAfter == null) options.hideSettings.hideAfter = 600;
		if (options.hideSettings.animation == null) options.hideSettings.animation = AnimationHideEnum.None;

		if (options.elementToAppend == null) options.elementToAppend = options.target;
		//#endregion

		super(element, options, ControlTypeEnum.Tooltip);

		//#region Show/Hide
		let showOn: TooltipShowHideEnum = TooltipShowHideEnum.MouseEnter;
		let hideOn: TooltipShowHideEnum = TooltipShowHideEnum.MouseLeave;
		switch (options.showOn)
		{
			case TooltipShowOnEnum.Hover:
				{
					showOn = TooltipShowHideEnum.MouseEnter;
					if (options.hideOn == TooltipHideOnEnum.Default)
						hideOn = TooltipShowHideEnum.MouseLeave;
				}
				break;
			case TooltipShowOnEnum.Click:
				{
					showOn = TooltipShowHideEnum.Click;
					if (options.hideOn == TooltipHideOnEnum.Default)
						hideOn = TooltipShowHideEnum.Click;
				}
				break;
			case TooltipShowOnEnum.Focus:
				{
					showOn = TooltipShowHideEnum.Focus;
					if (options.hideOn == TooltipHideOnEnum.Default)
						hideOn = TooltipShowHideEnum.Blur;
				}
				break;
		}

		if (options.hideOn != TooltipHideOnEnum.Default)
		{
			switch (options.hideOn)
			{
				case TooltipHideOnEnum.Leave: hideOn = TooltipShowHideEnum.MouseLeave; break;
				case TooltipHideOnEnum.Click: hideOn = TooltipShowHideEnum.Click; break;
				case TooltipHideOnEnum.Blur: hideOn = TooltipShowHideEnum.Blur; break;
			}
		}

		if (options.showOn != TooltipShowOnEnum.Never)
		{
			puma(this.target()).on(showOn, (e: JQuery.MouseEnterEvent) =>
			{
				window.setTimeout(() => this.show(), options!.showSettings!.showAfter);
			});

			puma(this.target()).on(hideOn, (e: JQuery.MouseLeaveEvent) =>
			{
				if (options!.hideOn != TooltipHideOnEnum.Never)
					window.setTimeout(() => this.hide(), Number(options!.hideSettings!.hideAfter));
			});

			puma(this.container()).on(hideOn, (e: JQuery.MouseLeaveEvent) =>
			{
				if (options!.hideOn != TooltipHideOnEnum.Never)
					window.setTimeout(() => this.hide(), Number(options!.hideSettings!.hideAfter));
			});

			if (hideOn == TooltipShowHideEnum.Click && options.hideOn != TooltipHideOnEnum.Never)
				puma(document.body).on("click", () => window.setTimeout(() => this.hide(), Number(options!.hideSettings!.hideAfter)));
		}
		//#endregion
	}

	show(content?: string)
	{
		if (this._notifier != null && this._notifier.visible())
			return;

		let options = this.getOptions();

		//#region Content
		if (content != null)
			this.content(content);

		if (options.content == null)
			options.content = this.target().innerText;
		//#endregion

		super.show();

		(options.hideSettings as any).autoHide = false;
		this._notifier = new Notifier(options.content, options as NotifierOptions);

		puma(this._notifier.container()).vrAppendToPuma(options.elementToAppend);

		//#region Event
		if (options.onShow != null)
		{
			let showEvent = new TooltipShowEvent();
			showEvent.sender = this;
			showEvent.content = this.content()!;
			options.onShow(showEvent);
		}
		//#endregion
	}

	hide()
	{
		if (this._notifier == null || !this._notifier.visible())
			return;

		let options = this.getOptions();

		super.hide();
		this._notifier.hide();

		//#region Event
		if (options.onHide != null)
		{
			let hideEvent = new TooltipHideEvent();
			hideEvent.sender = this;
			hideEvent.content = this.content()!;
			options.onHide(hideEvent);
		}
		//#endregion
	}

	visible(state?: boolean)
	{
		super.visible(state);
		return (this._notifier == null) ? false : this._notifier.visible(state);
	}

	content(content?: string)
	{
		let options = this.getOptions();
		if (content != null)
			options.content = content;

		return options.content;
	}

	target()
	{
		return puma(this.getOptions().target)[0] as HTMLElement;
	}

	getOptions()
	{
		return this.options<TooltipOptions>();
	}
}
//#endregion

//#region Classes
class TooltipHideSettings
{
	clickToHide?: boolean;
	hideAfter?: number;
	animation?: AnimationHideEnum;
}

class TooltipShowSettings
{
	showAfter?: number;
	animation?: AnimationShowEnum;
}

enum TooltipShowHideEnum
{
	Click = "click",
	Focus = "focus",
	MouseEnter = "mouseenter",
	Blur = "blur",
	MouseLeave = "mouseleave"
}

class TooltipShowEvent extends VrControlsEvent
{
	sender: Tooltip;
	content: string;
}

class TooltipHideEvent extends VrControlsEvent
{
	sender: Tooltip;
	content: string;
}
//#endregion