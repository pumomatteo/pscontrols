import { VrControlOptions, VrControl } from "../common";
import { ControlTypeEnum, createLabel, CheckboxStateEnum, ErrorPositionEnum, puma } from "../vr";
import { DeviceManager } from "../../../src/managers/deviceManager";

//#region Options
export class CheckBoxOptions extends VrControlOptions
{
    text?: string;
    value?: string;
    threeState?: boolean;
    checked?: boolean;
    name?: string;
    tooltip?: string;

    onCheck?(e: CheckBoxCheckEvent): void;
}
//#endregion

//#region Control
export class CheckBox extends VrControl
{
    constructor(element: HTMLElement, options?: CheckBoxOptions | null)
    {
        //#region Options
        if (options == null)
            options = new CheckBoxOptions();

        if (options.text == null) options.text = "";
        if (options.checked == null) options.checked = false;
        if (options.threeState == null) options.threeState = false;
        //#endregion

        puma(element).attr("type", "checkbox");

        let userWidth = options.width;
        options.width = undefined;
        super(element, options, ControlTypeEnum.CheckBox);

        if (userWidth != null)
        {
            if (typeof (userWidth) == "number")
                userWidth = userWidth + "px";

            this.container().style.cssText += "width: " + userWidth + ";";
        }

        let label = createLabel(
            {
                text: options.text,
                cssContainer: "position: relative; top: -1px;",
                class: "vrCheckBoxLabel",
                width: "100%"
            }, this.container());
        puma(label.element()).attr("for", element.id);

        //#region Value & Name
        if (options.value == null) options.value = options.text;
        if (options.value != null)
            puma(this.element()).attr("value", options.value);

        if (options.name != null)
            puma(this.element()).attr("name", options.name);
        //#endregion

        //#region Tooltip
        if (options.tooltip != null)
            puma(this.element()).attr("title", options.tooltip);
        //#endregion

        //#region Checked
        if (options.checked === true)
            this.checked(CheckboxStateEnum.Checked, false);
        else if (options.threeState)
            this.checked(CheckboxStateEnum.Undefined, false);
        //#endregion

        //#region Events
        puma(this.element()).click((e: JQueryEventObject) =>
        {
            this.hideError();
            let checkbox = e.currentTarget as HTMLInputElement;
            let checked = checkbox.checked;

            let state = null;
            if (!options!.threeState)
            {
                if (checkbox.checked)
                    state = CheckboxStateEnum.Checked;
                else
                    state = CheckboxStateEnum.Unchecked;
            }
            else
            {
                if (checkbox.checked && !puma(this.element()).hasClass("indeterminateVrCheckbox"))
                {
                    puma(this.element()).addClass("indeterminateVrCheckbox");
                    state = CheckboxStateEnum.Undefined;
                    e.preventDefault();
                }
                else
                {
                    puma(this.element()).removeClass("indeterminateVrCheckbox");
                    state = (checked) ? CheckboxStateEnum.Checked : CheckboxStateEnum.Unchecked;
                }
            }

            if (options!.onCheck != null)
            {
                let event = new CheckBoxCheckEvent();
                event.sender = this;
                event.checked = checked;
                event.stateEnum = state;
                event.shiftKey = e.shiftKey;
                event.ctrlKey = e.ctrlKey;
                options!.onCheck(event);
            }
        });
        //#endregion
    }

    //#region Methods
    checked<T extends boolean | null>(state?: CheckboxStateEnum | boolean, triggerChange = true): T
    {
        if (state != null)
        {
            this.hideError();
            let checkedBoolean = true;
            let checkedState = CheckboxStateEnum.Checked;

            puma(this.element()).removeClass("indeterminateVrCheckbox");
            if (typeof (state) === "boolean")
            {
                (this.element() as HTMLInputElement).checked = state;
                checkedBoolean = state;
                checkedState = (state) ? CheckboxStateEnum.Checked : CheckboxStateEnum.Unchecked;
            }
            else
            {
                checkedState = state;
                if (state == CheckboxStateEnum.Checked)
                {
                    (this.element() as HTMLInputElement).checked = true;
                    checkedBoolean = true;
                }
                else
                {
                    (this.element() as HTMLInputElement).checked = false;
                    checkedBoolean = false;

                    if (state == CheckboxStateEnum.Undefined)
                        puma(this.element()).addClass("indeterminateVrCheckbox");
                }
            }

            if (triggerChange)
            {
                let options = this.getOptions();
                if (options!.onCheck != null)
                {
                    let event = new CheckBoxCheckEvent();
                    event.sender = this;
                    event.checked = checkedBoolean;
                    event.stateEnum = checkedState;
                    options!.onCheck(event);
                }
            }
        }

        if (puma(this.element()).hasClass("indeterminateVrCheckbox"))
            return <T>null;
        else
            return <T>(this.element() as HTMLInputElement).checked;
    }

    check(): void
    {
        puma(this.element()).click();
    }

    text(text?: string): string
    {
        if (text != null)
            puma(this.container()).find(".vrCheckBoxLabel").html(text);

        return puma(this.container()).find(".vrCheckBoxLabel").html();
    }

    clear(triggerChange = false): void
    {
        let options = this.getOptions();
        if (options.threeState)
            this.checked(CheckboxStateEnum.Undefined, triggerChange);
        else
            this.checked(false, triggerChange);
    }

    getOptions(): CheckBoxOptions
    {
        return this.options<CheckBoxOptions>();
    }

    //#region Error management
    error(text?: string, position?: ErrorPositionEnum, showIcon = false): void
    {
        let options = this.options<CheckBoxOptions>();
        if (position == null) position = ErrorPositionEnum.Right;
        if (text == null) text = "";

        puma(this.element()).addClass("vrCheckBoxError");

        let errorIcon = puma(this.container()).find(".vrCheckBoxErrorIcon")[0];
        if (errorIcon == null && !DeviceManager.isMobile())
            errorIcon = puma("<i class='fa fa-exclamation-triangle vrCheckBoxErrorIcon'></i>").vrInsertAfterPuma(puma(this.container()).find(".vrCheckBoxLabel"))[0];

        if (showIcon)
            puma(errorIcon).show();
        else
            puma(errorIcon).hide();

        //#region Tooltip
        let spanError = puma("<span class='vrCheckBoxErrorTooltip vrErrorTooltip'>" + text + "</span>").vrAppendToPuma(errorIcon);
        if (position == ErrorPositionEnum.Right)
            puma(spanError).addClass("vrCheckBoxErrorTooltipRight");
        else if (position == ErrorPositionEnum.Bottom)
        {
            puma(spanError).addClass("vrCheckBoxErrorTooltipBottom");
            puma(errorIcon).hover(() => puma(spanError)[0].style.cssText += "left: -" + ((puma(spanError).outerWidth() / 2) - 7) + "px;");
        }
        //#endregion
    }

    hideError(): void
    {
        puma(this.element()).removeClass("vrCheckBoxError");
        puma(this.container()).find(".vrCheckBoxErrorIcon").hide();
        puma(this.container()).find(".vrCheckBoxErrorTooltip").hide();
    }
    //#endregion

    //#endregion
}
//#endregion

//#region Events
class CheckBoxEvent
{
    sender: CheckBox;
}

export class CheckBoxCheckEvent extends CheckBoxEvent
{
    stateEnum: CheckboxStateEnum;
    checked: boolean;
    shiftKey: boolean;
    ctrlKey: boolean;
}
//#endregion