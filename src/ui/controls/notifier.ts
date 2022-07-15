import { DeviceManager } from "../../../src/managers/deviceManager";
import { AnimationShowEnum, AnimationHideEnum, ColorSettings, div, icon, IconClassLight, IconClass, NotifierPositionEnum, NotifierTypeEnum, puma, shadowRoot, NotifierOptions, IconClassRegular } from "../vr";

//#region Control
export class Notifier
{
	private _options: NotifierOptions;
	private _container: HTMLElement;
	private _arrow: HTMLElement;
	private _element: HTMLElement;

	constructor(text: string, options?: NotifierOptions | null)
	{
		//#region Options
		if (options == null)
			options = new NotifierOptions();

		if (options.type == null) options.type = NotifierTypeEnum.Default;
		if (options.width == null) options.width = (DeviceManager.isMobile()) ? "100%" : ((options.target == null) ? "undefined" : "max-content");
		if (options.bold == null) options.bold = false;
		if (options.position == null) options.position = (options.target == null) ? NotifierPositionEnum.TopCenter : NotifierPositionEnum.RightMiddle;
		if (options.hideSettings == null) options.hideSettings = new NotifierHideSettings();
		if (options.hideSettings.autoHide == null || options.hideSettings.autoHide === true) options.hideSettings.autoHide = 3000;
		if (options.hideSettings.clickToHide == null) options.hideSettings.clickToHide = false;
		if (options.hideSettings.clickToHide === true) options.hideSettings.autoHide = false;
		if (options.hideSettings.duration == null) options.hideSettings.duration = 300;
		if (options.hideSettings.animation == null) options.hideSettings.animation = AnimationHideEnum.SlideUp;

		if (options.showSettings == null) options.showSettings = new NotifierShowSettings();
		if (options.showSettings.duration == null) options.showSettings.duration = 300;
		if (options.showSettings.animation == null) options.showSettings.animation = AnimationShowEnum.SlideDown;

		if (options.colorSettings == null) options.colorSettings = new ColorSettings();
		if (options.colorSettings.background == null) options.colorSettings.background = "#e3f1fa";
		if (options.colorSettings.textColor == null) options.colorSettings.textColor = "#000";
		if (options.colorSettings.border == null) options.colorSettings.border = "#c6edff";

		if (DeviceManager.isMobile())
		{
			if (options.target == null) options.position = NotifierPositionEnum.TopCenter;
			else options.position = NotifierPositionEnum.BottomCenter;
		}
		//#endregion

		this._options = options;

		//#region Notification areas
		if (!this.isOnTarget())
		{
			if (puma(".vrNotifierArea" + options.position).length == 0)
				puma("<div class='vrNotifierArea" + options.position + "'></div>").appendTo((shadowRoot() != null) ? shadowRoot() : document.body);

			if (DeviceManager.isMobile())
			{
				if (puma(".vrNotifierAreaTopCenter")[0] != null)
					puma(".vrNotifierAreaTopCenter")[0].style.cssText += "left: 0px; width: Calc(100% - 22px);";

				if (puma(".vrNotifierAreaBottomCenter")[0] != null)
					puma(".vrNotifierAreaBottomCenter")[0].style.cssText += "left: 0px; width: Calc(100% - 22px);";
			}
		}
		//#endregion

		this.prepareNotification(text);
		this.show();
	}

	private prepareNotification(text: string)
	{
		let options = this.getOptions();
		let containerToAdd = this.getContainerToAdd();

		this._container = div(containerToAdd, { class: "vrNotifierContainer", css: (options.cssContainer != null) ? options.cssContainer : "" }, true);
		this._arrow = div(this._container, { class: "vrNotifierArrow" });
		this._element = div(this._container, { class: "vrNotifier " + ((options.class != null) ? options.class : ""), css: (options.css != null) ? options.css : "" });

		if (DeviceManager.isMobile())
			this._container.style.cssText += "left: 0px;";

		//#region Bold
		if (options.bold)
			puma(this._element).css("font-weight", "600");
		//#endregion

		//#region Font size
		if (options.fontSize != null)
			this._element.style.cssText += "font-size: " + options.fontSize + ";";
		//#endregion

		//#region Target
		if (this.isOnTarget())
		{
			if (typeof (options.target) == "string" && !options.target.startsWith("#"))
				options.target = "#" + options.target;

			options.target = puma(options.target)[0];
			puma(this._container).insertBefore(options.target);

			this._container.style.cssText += "width: 0; height: 0; position: absolute; display: inline-block;";
			this._arrow.style.cssText += "display: block;";
			this._element.style.cssText += "position: absolute;";
		}
		else
		{
			this._container.style.cssText += "position: relative; margin: 5px;";
			this._arrow.style.cssText += "display: none;";
			this._element.style.cssText += "position: relative;";
		}
		//#endregion

		//#region Width
		if (options.width != null)
			puma(this._element).width(options.width);
		//#endregion

		let color = options.colorSettings!.textColor;
		let backgroundColor = options.colorSettings!.background;
		let borderColor = options.colorSettings!.border;
		let iconClass = options.icon;

		//#region Type
		switch (options.type)
		{
			case NotifierTypeEnum.Error:
				{
					color = "#B94A48";
					backgroundColor = "#F2DEDE";
					borderColor = "#EED3D7";
					iconClass = IconClassRegular.CircleExclamation;
				}
				break;
			case NotifierTypeEnum.Warning:
				{
					color = "#684200";
					backgroundColor = "#FCF8E3";
					borderColor = "#FBEED5";
					iconClass = IconClassRegular.TriangleExclamation;
				}
				break;
			case NotifierTypeEnum.Info:
				{
					color = "#3A87AD";
					backgroundColor = "#D9EDF7";
					borderColor = "#BCE8F1";
					iconClass = IconClassRegular.Info;
				}
				break;
			case NotifierTypeEnum.Success:
				{
					color = "#468847";
					backgroundColor = "#DFF0D8";
					borderColor = "#D6E9C6";
					iconClass = IconClassRegular.Check;
				}
				break;
		}
		//#endregion

		//#region Icon
		if (iconClass != null && options.icon !== false)
			puma(this._element).append(icon(iconClass as any, null, { css: "margin-right: 8px;" }));
		//#endregion

		//#region Color
		puma(this._element).css("background-color", backgroundColor);
		puma(this._element).css("color", color);
		puma(this._element).css("border", "solid 1px " + borderColor);
		//#endregion

		//#region Text
		if (options.customHtml != null)
		{
			//#region Custom HTML
			if (typeof (options.customHtml) == "string")
				puma(this._element).append(options.customHtml.replace("#text#", text));
			else
			{
				let event = new NotifierCustomHtmlEvent();
				event.sender = this;
				event.divContainer = this._element;
				options.customHtml(event);
			}
			//#endregion
		}
		else
			puma(this._element).append("<label>" + text + "</label>");
		//#endregion	

		if (this.isOnTarget())
		{
			//#region Arrow
			let borderTopArrow = "border-right: 5px solid transparent; border-left: 5px solid transparent; border-top: 5px solid " + backgroundColor + ";";
			let borderBottomArrow = "border-right: 5px solid transparent; border-left: 5px solid transparent; border-bottom: 5px solid " + backgroundColor + ";";
			let borderLeftArrow = "border-top: 5px solid transparent; border-bottom: 5px solid transparent; border-left: 5px solid " + backgroundColor + ";";
			let borderRightArrow = "border-top: 5px solid transparent; border-bottom: 5px solid transparent; border-right: 5px solid " + backgroundColor + ";";
			//#endregion

			let offsetLeft = this.targetOptions().marginLeft;
			let topElement = null, rightElement = null, bottomElement = null, leftElement = null;
			switch (options.position)
			{
				//#region Top
				case NotifierPositionEnum.TopCenter:
					{
						let diffLeft = ((this.element().offsetWidth - this.targetOptions().width) * -1) / 2;
						leftElement = diffLeft + offsetLeft;
						bottomElement = 4;

						this._arrow.style.cssText += "left: " + ((this.targetOptions().width / 2 - 5) + offsetLeft) + "px; bottom: 0px;" + borderTopArrow;
						this._element.style.cssText += "left: " + leftElement + "px; bottom: " + bottomElement + "px;";
					}
					break;
				case NotifierPositionEnum.TopRight:
					{
						leftElement = offsetLeft + this.targetOptions().width - this.element().offsetWidth;
						bottomElement = 4;

						this._arrow.style.cssText += "left: " + ((this.targetOptions().width / 2 - 5) + offsetLeft) + "px; bottom: 0px;" + borderTopArrow;
						this._element.style.cssText += "left: " + leftElement + "px; bottom: " + bottomElement + "px;";
					}
					break;
				case NotifierPositionEnum.TopLeft:
					{
						leftElement = offsetLeft;
						bottomElement = 4;

						this._arrow.style.cssText += "left: " + ((this.targetOptions().width / 2 - 5) + offsetLeft) + "px; bottom: 0px;" + borderTopArrow;
						this._element.style.cssText += "left: " + leftElement + "px; bottom: " + bottomElement + "px;";
					}
					break;
				//#endregion

				//#region Right
				case NotifierPositionEnum.RightMiddle:
					{
						let diffTop = ((this.element().offsetHeight - this.target().offsetHeight) * -1) / 2;
						leftElement = (this.target().offsetWidth + 4) + offsetLeft;
						topElement = diffTop;

						this._arrow.style.cssText += "left: " + (this.targetOptions().width + offsetLeft) + "px; top: " + (puma(this.target()).offset().top + (this.target().offsetHeight / 2) - 5) + "px;" + borderRightArrow;
						this._element.style.cssText += "left: " + leftElement + "px; top: " + topElement + "px;";
						this._container.style.cssText += "left: " + leftElement + "px; top: " + topElement + "px;";
					}
					break;
				case NotifierPositionEnum.RightTop:
					{
						leftElement = (this.target().offsetWidth + 4) + offsetLeft;
						topElement = 0;

						this._arrow.style.cssText += "left: " + (this.target().offsetWidth + offsetLeft) + "px; top: " + ((this.target().offsetHeight / 2) - 5) + "px;" + borderRightArrow;
						this._element.style.cssText += "left: " + leftElement + "px; top: " + topElement + "px;";
					}
					break;
				case NotifierPositionEnum.RightBottom:
					{
						let diffTop = Math.abs((this.element().offsetHeight - this.target().offsetHeight));
						leftElement = (this.target().offsetWidth + 4) + offsetLeft;
						topElement = -(diffTop);

						this._arrow.style.cssText += "left: " + (this.target().offsetWidth + offsetLeft) + "px; top: " + ((this.target().offsetHeight / 2) - 5) + "px;" + borderRightArrow;
						this._element.style.cssText += "left: " + leftElement + "px; top: " + topElement + "px;";
					}
					break;
				//#endregion

				//#region Left
				case NotifierPositionEnum.LeftMiddle:
					{
						let diffTop = ((this.element().offsetHeight - this.target().offsetHeight) * -1) / 2;
						rightElement = -(offsetLeft - 4);
						topElement = diffTop;

						this._arrow.style.cssText += "right: -" + (offsetLeft) + "px; top: " + ((this.target().offsetHeight / 2) - 5) + "px;" + borderLeftArrow;
						this._element.style.cssText += "right: " + rightElement + "px; top: " + diffTop + "px;";
					}
					break;
				case NotifierPositionEnum.LeftTop:
					{
						rightElement = -(offsetLeft - 4);
						topElement = 0;

						this._arrow.style.cssText += "right: -" + (offsetLeft) + "px; top: " + ((this.target().offsetHeight / 2) - 5) + "px;" + borderLeftArrow;
						this._element.style.cssText += "right: " + rightElement + "px; top: " + topElement + "px;";
					}
					break;
				case NotifierPositionEnum.LeftBottom:
					{
						let diffTop = Math.abs((this.element().offsetHeight - this.target().offsetHeight));
						rightElement = -(offsetLeft - 4);
						topElement = -(diffTop);

						this._arrow.style.cssText += "right: -" + (offsetLeft) + "px; top: " + ((this.target().offsetHeight / 2) - 5) + "px;" + borderLeftArrow;
						this._element.style.cssText += "right: " + rightElement + "px; top: " + topElement + "px;";
					}
					break;
				//#endregion

				//#region Bottom
				case NotifierPositionEnum.BottomCenter:
					{
						let diffLeft = ((this.element().offsetWidth - this.targetOptions().width) * -1) / 2;
						leftElement = diffLeft + offsetLeft;
						topElement = this.targetOptions().height + 4;

						this._arrow.style.cssText += "left: " + ((this.targetOptions().width / 2 - 5) + offsetLeft) + "px; top: " + this.targetOptions().height + "px;" + borderBottomArrow;
						this._element.style.cssText += "left: " + leftElement + "px; top: " + topElement + "px;";
					}
					break;
				case NotifierPositionEnum.BottomRight:
					{
						leftElement = offsetLeft + this.targetOptions().width - this.element().offsetWidth;
						topElement = this.targetOptions().height + 4;

						this._arrow.style.cssText += "left: " + ((this.targetOptions().width / 2 - 5) + offsetLeft) + "px; top: " + this.targetOptions().height + "px;" + borderBottomArrow;
						this._element.style.cssText += "left: " + leftElement + "px; top: " + topElement + "px;";
					}
					break;
				case NotifierPositionEnum.BottomLeft:
					{
						leftElement = offsetLeft;
						topElement = this.targetOptions().height + 4;

						this._arrow.style.cssText += "left: " + ((this.targetOptions().width / 2 - 5) + offsetLeft) + "px; top: " + this.targetOptions().height + "px;" + borderBottomArrow;
						this._element.style.cssText += "left: " + leftElement + "px; top: " + topElement + "px;";
					}
					break;
				//#endregion
			}

			if (leftElement != null && leftElement < 0)
			{
				this._element.style.cssText += "left: 0px;";
				this._container.style.cssText += "left: 0px;";
			}

			if (topElement != null && topElement < 0)
			{
				this._element.style.cssText += "top: 0px;";
				this._container.style.cssText += "top: 0px;";
			}

			// if (puma(this.element()).offset().left + puma(this.element()).width() > document.body.clientWidth)
			// 	this._element.style.cssText += "left: unset; right: 0px;";
		}

		puma(this._element).hide();
		puma(this._arrow).hide();
	}

	private getContainerToAdd()
	{
		let options = this.getOptions();
		let containerToAdd: HTMLElement | null = null;

		if (this.isOnTarget())
			containerToAdd = document.body;
		else
			containerToAdd = puma(".vrNotifierArea" + options.position);

		return containerToAdd!;
	}

	container()
	{
		return this._container;
	}

	visible(state?: boolean)
	{
		if (state != null)
		{
			if (state) this.show();
			else this.hide();
		}

		return puma(this._element).is(":visible");
	}

	show(text?: string)
	{
		let options = this.getOptions();
		let showSettings = options.showSettings!;
		let hideSettings = options.hideSettings!;
		let duration = showSettings.duration;

		switch (showSettings.animation)
		{
			case AnimationShowEnum.Default: puma(this._element).show(duration); break;
			case AnimationShowEnum.FadeIn: puma(this._element).fadeIn(duration); break;
			case AnimationShowEnum.SlideDown: puma(this._element).slideDown(duration); break;
			case AnimationShowEnum.None: puma(this._element).show(); break;
			default:
				puma(this._element).show(duration); break;
		}
		puma(this._arrow).show();

		if (hideSettings.autoHide !== false)
			window.setTimeout(() => this.hide(), hideSettings.autoHide as number);
		else if (hideSettings.clickToHide === true)
			puma(this._container).on("click", (e: JQuery.ClickEvent) => this.hide());

		if (text != null)
			puma(this._element).append("<label>" + text + "</label>");

		puma(this._element).on("click", () =>
		{
			if (options.onClick != null)
			{
				let clickEvent = new NotifierOnClickEvent();
				clickEvent.sender = this;
				clickEvent.text = text;
				options.onClick(clickEvent);
			}
		});
	}

	open(text?: string)
	{
		this.show(text);
	}

	hide()
	{
		let options = this.getOptions();
		let hideSettings = options.hideSettings!;

		let duration = hideSettings.duration;
		switch (hideSettings.animation)
		{
			case AnimationHideEnum.Default: puma(this._element).hide(duration); break;
			case AnimationHideEnum.FadeOut: puma(this._element).fadeOut(duration); break;
			case AnimationHideEnum.SlideUp: puma(this._element).slideUp(duration); break;
			case AnimationHideEnum.None: puma(this._element).hide(); break;
			default:
				puma(this._element).hide(duration); break;
		}
		puma(this._arrow).hide();

		window.setTimeout(() => puma(this._container).remove(), duration);
	}

	close()
	{
		this.hide();
	}

	isOnTarget()
	{
		return this.target() != null;
	}

	target()
	{
		return this.getOptions().target as HTMLElement;
	}

	targetOptions()
	{
		let targetOptions = new TargetOptions();
		targetOptions.width = this.target().offsetWidth;
		targetOptions.height = this.target().offsetHeight;
		targetOptions.offsetLeft = this.target().offsetLeft;
		targetOptions.offsetTop = this.target().offsetTop;
		targetOptions.marginTop = puma(this.target()).css("marginTop").getNumericPart();
		targetOptions.marginRight = puma(this.target()).css("marginRight").getNumericPart();
		targetOptions.marginBottom = puma(this.target()).css("marginBottom").getNumericPart();
		targetOptions.marginLeft = puma(this.target()).css("marginLeft").getNumericPart();

		return targetOptions;
	}

	element()
	{
		return this._element;
	}

	getOptions()
	{
		return this._options;
	}
}
//#endregion

//#region Classes
export class NotifierShowSettings
{
	duration: number;
	animation?: AnimationShowEnum;
}

export class NotifierCustomHtmlEvent
{
	sender: Notifier;
	divContainer: HTMLElement;
}

class TargetOptions
{
	height: number;
	width: number;
	marginLeft: number;
	marginRight: number;
	marginTop: number;
	marginBottom: number;
	offsetLeft: number;
	offsetTop: number;
}

export class NotifierOnClickEvent
{
	sender: Notifier;
	text?: string;
}

export class NotifierHideSettings
{
	autoHide?: boolean | number;
	clickToHide?: boolean;
	duration?: number;
	animation?: AnimationHideEnum;
}
//#endregion