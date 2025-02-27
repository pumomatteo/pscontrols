import { ControlTypeEnum, LabelModeEnum, DateModeEnum, puma, ColorSettings, TextAlignEnum, LabelUnderlineMode, PositionEnum, IconClass, icon } from "../vr";
import { VrControlOptions, VrControl, VrControlsEvent } from "../common";
import { UtilityManager } from "../../../src/managers/utilityManager";

//#region Options
export class LabelOptions extends VrControlOptions
{
    text?: string | number | Date;
    value?: string | number | Date;
    key?: string;
    tooltip?: boolean | string;
    colorSettings?: ColorSettings;
    fontSize?: number | string;
    fontFamily?: string;
    bold?: boolean;
    noBr?: boolean | number;
    mode?: LabelModeEnum;
    align?: TextAlignEnum;
    linkCss?: string;
    underlineMode?: LabelUnderlineMode;
    icon?: IconClass;

    onClick?: (e: LabelClickEvent) => void;
    onHover?: (e: LabelHoverEvent) => void;
}
//#endregion

//#region Control
export class Label extends VrControl
{
    constructor(element: HTMLElement, options?: LabelOptions | null)
    {
        //#region Options
        if (options == null)
            options = new LabelOptions();

        if (options.text == null) options.text = "";
        if (options.value != null) options.text = options.value;

        if (options.noBr == null) options.noBr = false;
        if (options.mode == null) options.mode = LabelModeEnum.Default;

        if (options.mode == LabelModeEnum.Currency && options.align == null)
            options.align = TextAlignEnum.Right;

        if (options.align == null) options.align = TextAlignEnum.Left;
        if (options.tabIndex == null) options.tabIndex = -1;
        //#endregion

        super(element, options, ControlTypeEnum.Label);

        if (options.label != null && options.labelSettings!.position == PositionEnum.Left)
            this.element().style.cssText += "margin-top: -2px;";

        if (options.width == "100%" && options.align == TextAlignEnum.Left && (options.labelSettings == null || options.labelSettings.position == PositionEnum.Left))
            this.element().style.cssText += "width: unset;";

        //#region NoBr
        if (options.noBr !== false)
        {
            if (options.noBr === true)
            {
                this.element().style.cssText += "white-space: nowrap; overflow:hidden; margin-bottom: -6px; text-overflow: ellipsis; display: inline-block; width: unset;";
                if (options.width == null)
                    this.container().style.cssText += "width: 100%;";
            }
            else
                this.element().style.cssText += "overflow: hidden; display: -webkit-inline-box; -webkit-line-clamp: " + options.noBr + "; -webkit-box-orient: vertical; white-space: pre-wrap; white-space: -moz-pre-wrap; white-space: -pre-wrap; white-space: -o-pre-wrap; word-wrap: break-word;";
        }
        //#endregion

        //#region Text/Tooltip
        this.value(options.text);

        if (options.tooltip != null && options.tooltip !== false)
            this.tooltip((options.tooltip === true) ? options.text : options.tooltip);
        //#endregion

        //#region Value
        if (options.key != null)
            puma(this.element()).attr("key", options.key);
        //#endregion

        //#region Color settings
        if (options.colorSettings != null)
        {
            let colorSettings = options.colorSettings;
            if (colorSettings.textColor != null)
                this.color(colorSettings.textColor);
            if (colorSettings.background != null)
                this.backgroundColor(colorSettings.background);
            if (colorSettings.border != null)
                this.borderColor(colorSettings.border);
        }
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

        this.element().style.cssText += font;
        //#endregion

        //#region Align
        this.element().style.cssText += "text-align: " + options.align + ";";
        this.container().style.cssText += "text-align: " + options.align + ";";
        //#endregion

        //#region Underline
        let underlineOnHoverClass = "";
        let underlineCss = "";
        if (options.underlineMode != null)
        {
            switch (options.underlineMode)
            {
                case LabelUnderlineMode.Always: underlineCss += "text-decoration: underline"; break;
                case LabelUnderlineMode.None: underlineCss += "text-decoration: none"; break;
                case LabelUnderlineMode.OnHover: underlineOnHoverClass = "labelhover"; break;
            }

            this.element().style.cssText += underlineCss + ";";
            if (underlineOnHoverClass.vrIsNotNullOrEmpty())
                puma(this.element()).addClass(underlineOnHoverClass);
        }
        //#endregion

        //#region Events
        if (options.onClick != null)
            this.element().style.cssText += "cursor: pointer;";

        puma(this.element()).click(() => this.click());

        if (options.onHover != null)
        {
            puma(this.element()).on("hover", () =>
            {
                let hoverEvent = new LabelHoverEvent();
                hoverEvent.sender = this;
                hoverEvent.text = this.value();
                options!.onHover!(hoverEvent);
            });
        }
        //#endregion
    }

    //#region Methods

    //#region Text/Label/Tooltip
    value(value?: string | number | Date): string
    {
        let options = this.getOptions();
        if (value != null)
        {
            let linkCss = "";
            if (options.linkCss != null)
                linkCss = " style='" + options.linkCss + ";' ";

            let mode = this.options<LabelOptions>().mode;
            switch (mode)
            {
                case LabelModeEnum.Primary: puma(this.element()).addClass("vrLabelPrimaryMode"); break;
                case LabelModeEnum.Error: puma(this.element()).addClass("vrLabelErrorMode"); break;
                case LabelModeEnum.Phone: value = "<a " + linkCss + " href='tel:" + value + "'>" + value + "</a>"; break;
                case LabelModeEnum.Mail: value = "<a " + linkCss + " href='mailto:" + value + "'>" + value + "</a>"; break;
                case LabelModeEnum.Link: value = "<a " + linkCss + " href='" + value + "'>" + value + "</a>"; break;
                case LabelModeEnum.Currency: value = Number(value).vrToCurrencyString(); break;
                case LabelModeEnum.Date:
                    {
                        if (Date.vrIsValidDate(value))
                            value = new Date(value).vrToItalyString(DateModeEnum.Date);
                    }
                    break;
                case LabelModeEnum.DateTime:
                    {
                        if (Date.vrIsValidDate(value))
                            value = new Date(value).vrToItalyString(DateModeEnum.DateTime);
                    }
                    break;
                case LabelModeEnum.Time:
                    {
                        if (Date.vrIsValidDate(value))
                            value = new Date(value).vrToItalyString(DateModeEnum.Time);
                    }
                    break;
            }

            if (options.icon != null)
                value = "<i class='" + options.icon + "'></i> " + value;

            this.element().innerHTML = String(value);

            let textWidth = UtilityManager.textWidth(this.element());
            if (options.tooltip === true || (options.tooltip !== false && textWidth != null && textWidth > 0 && (textWidth + 10) > this.width()))
                this.tooltip(this.element().textContent!);
        }
        return this.element().innerHTML;
    }

    appendText(value: string | number)
    {
        this.value(this.value() + value);
    }

    tooltip(value?: string | number | Date): string
    {
        if (value != null)
            this.element().title = (typeof (value) == "string" || typeof (value) == "number") ? String(value) : value.vrToItalyString();

        return this.element().title;
    }
    //#endregion

    //#region Mail/Phone/Link
    toTel(phoneNumber: string, customText?: string): void
    {
        this.element().innerHTML = this.formatLinkLabel("tel:" + phoneNumber, customText);
    }

    toMail(mail: string, customText?: string): void
    {
        this.element().innerHTML = this.formatLinkLabel("mailto:" + mail, customText);
    }

    toLink(url: string, customText?: string): void
    {
        this.element().innerHTML = this.formatLinkLabel(url, customText);
    }

    private formatLinkLabel(url: string, customText?: string)
    {
        let options = this.getOptions();
        let linkCss = "";
        if (options.linkCss != null)
            linkCss = " style='" + options.linkCss + ";' ";

        return "<a " + linkCss + " href='" + url + "'>" + ((customText != null) ? customText : this.value()) + "</a>";
    }
    //#endregion

    //#region Color
    color(value?: string): string
    {
        if (value != null)
            this.element().style.cssText += "color: " + value;

        return puma(this.element()).css("color");
    }

    backgroundColor(value?: string): string
    {
        if (value != null)
            this.element().style.cssText += "background-color: " + value;

        return puma(this.element()).css("background-color");
    }

    borderColor(value?: string): string
    {
        if (value != null)
            this.element().style.cssText += "border: solid 1px " + value + "; padding: 1px 3px 1px 3px;";

        return puma(this.element()).css("border-color");
    }
    //#endregion

    isEmpty(): boolean
    {
        return this.element().innerHTML === "";
    }

    clear(): void
    {
        this.element().innerHTML = "";
        this.element().title = "";
    }

    getOptions(): LabelOptions
    {
        return this.options<LabelOptions>();
    }
    //#endregion

    //#region Events
    click(): void
    {
        let clickCallback = this.options<LabelOptions>().onClick;
        if (clickCallback != null)
        {
            let clickEvent = new LabelClickEvent();
            clickEvent.sender = this;
            clickEvent.text = this.value();
            clickCallback(clickEvent);
        }
    }
    //#endregion
}
//#endregion

//#region EventClasses
export class LabelClickEvent extends VrControlsEvent
{
    sender: Label;
    text: string;
}

class LabelHoverEvent extends VrControlsEvent
{
    sender: Label;
    text: string;
}
//#endregion