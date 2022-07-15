import { VrControlOptions, VrControl } from "../common";
import { ControlTypeEnum, puma } from "../vr";

//#region Options
export class RadioButtonOptions extends VrControlOptions
{
    text?: string;
    value?: string;
    checked?: boolean;
    name?: string;

    onCheck?(e: RadioButtonCheckEvent): void;
}
//#endregion

//#region Control
export class RadioButton extends VrControl
{
    constructor(element: HTMLElement, options?: RadioButtonOptions | null)
    {
        //#region Options
        if (options == null)
            options = new RadioButtonOptions();

        if (options.text == null) options.text = "";
        if (options.checked == null) options.checked = false;
        //#endregion

        puma(element).attr("type", "radio");
        super(element, options, ControlTypeEnum.RadioButton);

        //#region Value & Name
        if (options.value != null)
            puma(this.element()).attr("value", options.value);

        if (options.name != null)
            puma(this.element()).attr("name", options.name);
        //#endregion

        //#region Structure
        let labelContainer = puma("<label class='vrRadioButtonLabelContainer'></label>").vrAppendToPuma(this.container());
        puma(this.element()).vrAppendToPuma(labelContainer);
        puma("<span class='vrRadioButtonCheckMark'></span>").vrAppendToPuma(labelContainer);
        let lblRadioButton = puma("<label class='vrRadioButtonLabel'>" + options.text + "</label>").vrAppendToPuma(this.container());
        //#endregion

        //#region Checked
        if (options.checked === true)
            this.checked(true, false);
        //#endregion

        //#region Events
        puma(this.element()).on("click", (e: JQuery.ClickEvent) =>
        {
            let radioButton = e.currentTarget as HTMLInputElement;
            let checked = radioButton.checked;
            this.checked(checked);
        });

        puma(lblRadioButton).on("click", (e: JQuery.ClickEvent) =>
        {
            let lblRadioButtonContainer = puma(lblRadioButton).prev();
            let input = lblRadioButtonContainer.find("input")[0];
            if (!input.checked)
                input.checked = true;

            let checked = input.checked;
            this.checked(checked);
        });
        //#endregion
    }

    //#region Methods
    checked(state?: boolean, triggerChange = true): boolean
    {
        if (state != null)
        {
            (this.element() as HTMLInputElement).checked = state;

            if (triggerChange)
            {
                let options = this.getOptions();
                if (options!.onCheck != null)
                {
                    let event = new RadioButtonCheckEvent();
                    event.sender = this;
                    event.checked = state;
                    options!.onCheck(event);
                }
            }
        }
        return (this.element() as HTMLInputElement).checked;
    }

    text(text?: string): string
    {
        if (text != null)
            puma(this.container()).find(".vrRadioButtonLabel").html(text);

        return puma(this.container()).find(".vrRadioButtonLabel").html();
    }

    clear(triggerChange = false): void
    {
        this.checked(false, triggerChange);
    }

    getOptions(): RadioButtonOptions
    {
        return this.options<RadioButtonOptions>();
    }

    enable(): void
    {
        super.enable();
        puma(this.container()).removeClass("vrRadioButtonListDisabled");
    }

    disable(): void
    {
        super.disable();
        puma(this.container()).addClass("vrRadioButtonListDisabled");
    }
    //#endregion
}
//#endregion

//#region Events
class RadioButtonEvent
{
    sender: RadioButton;
}

export class RadioButtonCheckEvent extends RadioButtonEvent
{
    checked: boolean;
}
//#endregion