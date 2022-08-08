import { VrControl, VrControlOptions, VrControlsEvent } from "../common";
import { ControlTypeEnum, puma, SwitchLabelSettings, SwitchLabelSettingsOnClickEvent } from "../vr";

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

        let labelOff = puma("<label title='" + options.labelOff.tooltip + "'"
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
        //#endregion

        //#region Switch slider
        let checkedProperty = (options.checked) ? "checked='checked'" : "";
        puma("<label class='vrSwitchLabel'><input type='checkbox' " + checkedProperty + " class='vrSwitchInput'><span class='vrSwitchSlider'></span></label>").vrAppendToPuma(this.element());
        puma(this.element()).find(".vrSwitchInput").change((e: any) => this.checked(e.target.checked));
        //#endregion

        //#region Label on
        let colorOn = (options.labelOn.color != null) ? "color: " + options.labelOn.color + ";" : "";
        let boldOn = (options.labelOn.bold) ? "font-weight: 600;" : "";

        let labelOn = puma("<label title='" + options.labelOn.tooltip + "'"
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
        //#endregion

        //#region Checked
        this.checked(options.checked, false);
        //#endregion
    }

    //#region Methods
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