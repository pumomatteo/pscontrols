import { VrControl, VrControlOptions, VrControlsEvent } from "../common";
import { BadgeClickEvent, ControlTypeEnum, puma, SwitchLabelSettings, SwitchLabelSettingsOnClickEvent } from "../vr";

//#region Options
export class SwitchOptions extends VrControlOptions
{
    labelOff?: string | SwitchLabelSettings;
    labelOn?: string | SwitchLabelSettings;
    checked?: boolean;

    onChange?(e: SwitchChangeEvent): void;
}
//#endregion

//#region Control
export class Switch extends VrControl
{
    private _badgeLabelOff: HTMLElement;
    private _badgeLabelOn: HTMLElement;

    constructor(element: HTMLElement, options?: SwitchOptions | null)
    {
        //#region Options
        if (options == null)
            options = new SwitchOptions();

        if (options.labelOff == null) options.labelOff = "";
        if (typeof (options.labelOff) == "string")
        {
            let labelOffText = options.labelOff;
            options.labelOff = new SwitchLabelSettings();
            options.labelOff.text = labelOffText;
        }

        if (options.labelOn == null) options.labelOn = "";
        if (typeof (options.labelOn) == "string")
        {
            let labelOnText = options.labelOn;
            options.labelOn = new SwitchLabelSettings();
            options.labelOn.text = labelOnText;
        }

        if (options.checked == null) options.checked = false;
        //#endregion

        super(element, options, ControlTypeEnum.Switch);

        //#region Label off
        let colorOff = (options.labelOff.color != null) ? "color: " + options.labelOff.color + ";" : "";
        let boldOff = (options.labelOff.bold) ? "font-weight: 600;" : "";
        let tooltipOff = (options.labelOff.tooltip != null) ? "title='" + options.labelOff.tooltip + "'" : "";

        let labelOff = puma("<label " + tooltipOff
            + " style='" + colorOff + boldOff + options.labelOff.css + ";'"
            + " class='vrSwitchLabelOff'>"
            + options.labelOff.text
            + "</label>").vrAppendToPuma(this.element());

        labelOff.click((e: any) => 
        {
            if ((options!.labelOff as SwitchLabelSettings).onClick != null)
            {
                let event = new SwitchLabelSettingsOnClickEvent();
                event.sender = this;
                event.checked = this.checked();
                (options!.labelOff as SwitchLabelSettings)!.onClick!(event);

                if (event.isDefaultPrevented())
                {
                    e.preventDefault();
                    return;
                }
            }

            if (this.enabled())
                this.checked(false);
        });

        //#region Badge Label off
        let badgeColorLabelOff = "#FFF";
        let badgeBackgroundColorLabelOff = "red";
        let badgeTextLabelOff = "";
        let badgeVisibleLabelOff = false;
        if (options.labelOff.badgeSettings != null)
        {
            if (options.labelOff.badgeSettings.text != null) badgeTextLabelOff = String(options.labelOff.badgeSettings.text);
            if (options.labelOff.badgeSettings.color != null) badgeColorLabelOff = options.labelOff.badgeSettings.color;
            if (options.labelOff.badgeSettings.backgroundColor != null) badgeBackgroundColorLabelOff = String(options.labelOff.badgeSettings.backgroundColor);
            if (options.labelOff.badgeSettings.visible != null) badgeVisibleLabelOff = options.labelOff.badgeSettings.visible;
        }

        this._badgeLabelOff = puma("<span class='vrBadgeClass' style='left: -15px; top: -4px;'>" + badgeTextLabelOff + "</span>")[0];
        this._badgeLabelOff.innerHTML = badgeTextLabelOff;
        puma(labelOff).append(this._badgeLabelOff);

        if (options.labelOff.tooltip != null)
            this._badgeLabelOff.title = options.labelOff.tooltip;

        this._badgeLabelOff.style.cssText += "color: " + badgeColorLabelOff + "; background-color: " + badgeBackgroundColorLabelOff + ";";
        if ((badgeTextLabelOff == "" || badgeTextLabelOff == null) && !badgeVisibleLabelOff)
            puma(this._badgeLabelOff).hide();

        if (options.labelOff.badgeSettings != null && options.labelOff.badgeSettings.css != null)
            this._badgeLabelOff.style.cssText += options.labelOff.badgeSettings.css;

        if (options.labelOff.onClick != null)
        {
            puma(this._badgeLabelOff).on("click", (e: JQuery.MouseDownEvent) => 
            {
                labelOff.click();
                return false;
            });
        }
        //#endregion

        //#endregion

        //#region Switch slider
        let checkedProperty = (options.checked) ? "checked='checked'" : "";
        puma("<label class='vrSwitchLabel'><input type='checkbox' " + checkedProperty + " class='vrSwitchInput'><span class='vrSwitchSlider'></span></label>").vrAppendToPuma(this.element());
        puma(this.element()).find(".vrSwitchInput").change((e: any) => this.checked(e.target.checked));
        //#endregion

        //#region Label on
        let colorOn = (options.labelOn.color != null) ? "color: " + options.labelOn.color + ";" : "";
        let boldOn = (options.labelOn.bold) ? "font-weight: 600;" : "";
        let tooltipOn = (options.labelOn.tooltip != null) ? "title='" + options.labelOn.tooltip + "'" : "";

        let labelOn = puma("<label " + tooltipOn
            + " style='" + colorOn + boldOn + options.labelOn.css + ";'"
            + " class='vrSwitchLabelOn'>"
            + options.labelOn.text
            + "</label>").vrAppendToPuma(this.element());

        labelOn.click((e: any) => 
        {
            if ((options!.labelOn as SwitchLabelSettings).onClick != null)
            {
                let event = new SwitchLabelSettingsOnClickEvent();
                event.sender = this;
                event.checked = this.checked();
                (options!.labelOn as SwitchLabelSettings)!.onClick!(event);

                if (event.isDefaultPrevented())
                {
                    e.preventDefault();
                    return;
                }
            }

            if (this.enabled())
                this.checked(true);
        });

        //#region Badge Label on
        let badgeColorLabelOn = "#FFF";
        let badgeBackgroundColorLabelOn = "red";
        let badgeTextLabelOn = "";
        let badgeVisibleLabelOn = false;
        if (options.labelOn.badgeSettings != null)
        {
            if (options.labelOn.badgeSettings.text != null) badgeTextLabelOn = String(options.labelOn.badgeSettings.text);
            if (options.labelOn.badgeSettings.color != null) badgeColorLabelOn = options.labelOn.badgeSettings.color;
            if (options.labelOn.badgeSettings.backgroundColor != null) badgeBackgroundColorLabelOn = String(options.labelOn.badgeSettings.backgroundColor);
            if (options.labelOn.badgeSettings.visible != null) badgeVisibleLabelOn = options.labelOn.badgeSettings.visible;
        }

        this._badgeLabelOn = puma("<span class='vrBadgeClass' style='right: -15px; top: -4px;'>" + badgeTextLabelOn + "</span>")[0];
        this._badgeLabelOn.innerHTML = badgeTextLabelOn;
        puma(labelOn).append(this._badgeLabelOn);

        if (options.labelOn.tooltip != null)
            this._badgeLabelOn.title = options.labelOn.tooltip;

        this._badgeLabelOn.style.cssText += "color: " + badgeColorLabelOn + "; background-color: " + badgeBackgroundColorLabelOn + ";";
        if ((badgeTextLabelOn == "" || badgeTextLabelOn == null) && !badgeVisibleLabelOn)
            puma(this._badgeLabelOn).hide();

        if (options.labelOn.badgeSettings != null && options.labelOn.badgeSettings.css != null)
            this._badgeLabelOn.style.cssText += options.labelOn.badgeSettings.css;

        if (options.labelOn.onClick != null)
        {
            puma(this._badgeLabelOn).on("click", (e: JQuery.MouseDownEvent) => 
            {
                labelOn.click();
                return false;
            });
        }
        //#endregion

        //#endregion

        //#region Checked
        this.checked(options.checked, false);
        //#endregion
    }

    //#region Methods
    check()
    {
        return this.checked(!this.checked())
    }

    checked(state?: boolean, triggerChange = true): boolean
    {
        let options = this.getOptions();
        if (state != null)
        {
            //#region Label off/on
            let labelOff = puma(this.element()).find(".vrSwitchLabelOff")[0];
            let labelOn = puma(this.element()).find(".vrSwitchLabelOn")[0];
            let input = puma(this.element()).find(".vrSwitchInput");
            input[0].checked = state;

            if (state)
            {
                labelOff.style.cssText += "border-bottom: solid 2px transparent;";
                labelOn.style.cssText += "border-bottom: solid 2px #51B3E1;";
                input.prop("checked", "checked");
            }
            else
            {
                labelOff.style.cssText += "border-bottom: solid 2px #51B3E1;";
                labelOn.style.cssText += "border-bottom: solid 2px transparent;";
                input.removeProp("checked");
            }
            //#endregion

            //#region Change event
            if (triggerChange)
            {
                if (options.onChange != null)
                {
                    let changeEvent = new SwitchChangeEvent();
                    changeEvent.sender = this;
                    changeEvent.checked = state;
                    window.setTimeout(() => options!.onChange!(changeEvent));
                }
            }
            //#endregion
        }
        return puma(this.element()).find(".vrSwitchInput")[0].checked;
    }

    clear(triggerChange = false): void
    {
        this.checked(false, triggerChange);
    }

    labelOff(text?: string): string
    {
        if (text != null)
            puma(this.element()).find(".vrSwitchLabelOff").html(text);

        return puma(this.element()).find(".vrSwitchLabelOff").html();
    }

    labelOn(text?: string): string
    {
        if (text != null)
            puma(this.element()).find(".vrSwitchLabelOn").html(text);

        return puma(this.element()).find(".vrSwitchLabelOn").html();
    }

    //#region Badge
    badgeLabelOff(text?: string | number)
    {
        if (text != null)
        {
            puma(this._badgeLabelOff).html(text);
            this.visibleBadgeLabelOff(text != "");
        }
        return puma(this._badgeLabelOff).html();
    }

    badgeBackgroundColorLabelOff(color: string)
    {
        puma(this._badgeLabelOff).css("background-color", color)
    }

    badgeColorLabelOff(color: string)
    {
        puma(this._badgeLabelOff).css("color", color)
    }

    showBadgeLabelOff()
    {
        puma(this._badgeLabelOff).show();
    }

    hideBadgeLabelOff()
    {
        puma(this._badgeLabelOff).hide();
    }

    visibleBadgeLabelOff(state: boolean)
    {
        if (state) this.showBadgeLabelOff();
        else this.hideBadgeLabelOff();
    }

    badgeLabelOn(text?: string | number)
    {
        if (text != null)
        {
            puma(this._badgeLabelOn).html(text);
            this.visibleBadgeLabelOn(text != "");
        }
        return puma(this._badgeLabelOn).html();
    }

    badgeBackgroundColorLabelOn(color: string)
    {
        puma(this._badgeLabelOn).css("background-color", color)
    }

    badgeColorLabelOn(color: string)
    {
        puma(this._badgeLabelOn).css("color", color)
    }

    showBadgeLabelOn()
    {
        puma(this._badgeLabelOn).show();
    }

    hideBadgeLabelOn()
    {
        puma(this._badgeLabelOn).hide();
    }

    visibleBadgeLabelOn(state: boolean)
    {
        if (state) this.showBadgeLabelOn();
        else this.hideBadgeLabelOn();
    }
    //#endregion

    getOptions(): SwitchOptions
    {
        return this.options<SwitchOptions>();
    }
    //#endregion

    //#region Overrides
    enable(): void
    {
        super.enable();
        puma(this.element()).find(".vrSwitchInput").prop("disabled", false);
        puma(this.element()).find(".vrSwitchLabelOn").removeClass("vrSwitchLabelDisabled");
        puma(this.element()).find(".vrSwitchLabelOff").removeClass("vrSwitchLabelDisabled");
    }

    disable(): void
    {
        super.disable();
        puma(this.element()).find(".vrSwitchInput").prop("disabled", true);
        puma(this.element()).find(".vrSwitchLabelOn").addClass("vrSwitchLabelDisabled");
        puma(this.element()).find(".vrSwitchLabelOff").addClass("vrSwitchLabelDisabled");
    }
    //#endregion
}
//#endregion

//#region Classes
class SwitchEvent extends VrControlsEvent
{
    sender: Switch;
}

class SwitchChangeEvent extends SwitchEvent
{
    checked: boolean;
}
//#endregion