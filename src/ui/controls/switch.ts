import { VrControl, VrControlOptions, VrControlsEvent } from "../common";
import { ControlTypeEnum, puma } from "../vr";

//#region Options
export class SwitchOptions extends VrControlOptions
{
    labelOff?: string;
    labelOn?: string;
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
        if (options.labelOn == null) options.labelOn = "";
        if (options.checked == null) options.checked = false;
        //#endregion

        super(element, options, ControlTypeEnum.Switch);

        //#region Label off
        let labelOff = puma("<label class='vrSwitchLabelOff'>" + options.labelOff + "</label>").vrAppendToPuma(this.element());
        labelOff.click((e: any) => 
        {
            if (this.enabled())
                this.checked(false);
        });
        //#endregion

        //#region Switch
        let checkedProperty = (options.checked) ? "checked='checked'" : "";
        puma("<label class='vrSwitchLabel'><input type='checkbox' " + checkedProperty + " class='vrSwitchInput'><span class='vrSwitchSlider'></span></label>").vrAppendToPuma(this.element());
        puma(this.element()).find(".vrSwitchInput").change((e: any) => this.checked(e.target.checked));
        //#endregion

        //#region Label on
        let labelOn = puma("<label class='vrSwitchLabelOn'>" + options.labelOn + "</label>").vrAppendToPuma(this.element());
        labelOn.click((e: any) =>
        {
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