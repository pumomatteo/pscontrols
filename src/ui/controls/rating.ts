import { ControlTypeEnum, puma, RatingPrecisionEnum, vrEditorItemEnum, createLabel } from "../vr";
import { VrControlOptions, VrControl } from "../common";
import { UtilityManager } from "../../../src/managers/utilityManager";
import { Label } from "./label";

//#region Options
export class RatingOptions extends VrControlOptions
{
    value?: number;
    max?: number;
    size?: string | number;
    precision?: RatingPrecisionEnum;
    tooltip?: boolean;
    colorSettings?: RatingColorSettings;
    total?: number;

    onSelect?: (e: RatingSelectEvent) => void;
}
//#endregion

//#region Control
export class Rating extends VrControl
{
    private _value?: number | null;
    private _lblTotal: Label;

    constructor(element: HTMLElement, options?: RatingOptions | null)
    {
        //#region Options
        if (options == null)
            options = new RatingOptions();

        if (options.max == null) options.max = 5;
        if (options.size == null) options.size = 20;
        if (options.precision == null) options.precision = RatingPrecisionEnum.Full;
        if (options.tooltip == null) options.tooltip = false;
        if (options.enable == null) options.enable = true;

        if (options.colorSettings == null)
            options.colorSettings = new RatingColorSettings();

        if (options.colorSettings.selected == null) options.colorSettings.selected = "#FFD700";
        if (options.colorSettings.hover == null) options.colorSettings.hover = "#FFED85";
        if (options.colorSettings.notSelected == null) options.colorSettings.notSelected = "#DDD";
        //#endregion

        super(element, options, ControlTypeEnum.Rating);

        //#region Color 
        this.color(options.colorSettings);
        //#endregion

        //#region Stars
        let radioName = this.element().id + "vrRating";
        for (let i = options.max; i > 0; i--)
        {
            let radioFullId = this.element().id + "_star" + i;
            let titleFull = (options.tooltip) ? "title='" + i + "'" : "";

            let radioFull = puma(`<input id='` + radioFullId + `' type='radio' name='` + radioName + `' value='` + i + `' />`
                + `<label class='vrRatingFull' for='` + radioFullId + `' ` + titleFull + `></label>`).vrAppendToPuma(this.element());

            if (options.precision == RatingPrecisionEnum.Half)
            {
                let radioHalfId = this.element().id + "_star" + (i - 0.5);
                let titleHalf = (options.tooltip) ? "title='" + i + "'" : "";
                let radioHalf = puma(`<input id='` + radioHalfId + `' type='radio' name='` + radioName + `' value='` + (i - 0.5) + `' />`
                    + `<label class='vrRatingHalf' for='` + radioHalfId + `' ` + titleHalf + `></label>`).vrAppendToPuma(this.element());
            }
        }
        //#endregion

        //#region Total
        this._lblTotal = createLabel(
            {
                cssContainer: "margin-left: 5px; margin-top: -6px;"
            }, this.container());

        if (options.total != null)
            this.total(options.total);
        //#endregion

        //#region Size
        this.size(options.size);
        //#endregion

        //#region Enable/Disable
        if (options.enable) this.enable();
        else this.disable();
        //#endregion

        //#region Select
        puma(this.element()).find("input").click((e: any) =>
        {
            let currentValue = e.currentTarget.value;
            if (options!.onSelect != null)
            {
                let selectEvent = new RatingSelectEvent();
                selectEvent.sender = this;
                selectEvent.oldValue = this._value;
                selectEvent.value = currentValue;
                options!.onSelect(selectEvent);
            }
            this._value = currentValue;
        });
        //#endregion

        if (options.value != null)
            this.value(options.value);
    }
    //#endregion

    //#region Methods
    value(value?: number, triggerChange = true)
    {
        if (value != null)
        {
            let realValue = 0;
            let decimalPart = value % 1;
            let integerPart = Math.trunc(value);
            if (decimalPart == 0 || (decimalPart > integerPart && decimalPart < 0.2))
                realValue = integerPart;
            else if (decimalPart > 0.2 && decimalPart < 0.7)
                realValue = integerPart + 0.5;
            else if (decimalPart > 0.7)
                realValue = integerPart + 1;

            puma(this.element()).find("input[value='" + realValue + "']").attr("checked", true);
            this._value = realValue;
        }

        let checkedInput = puma(this.element()).find("input:checked")[0];
        return (checkedInput != null) ? checkedInput.value : null;
    }

    color(colorSettings?: RatingColorSettings)
    {
        let options = this.getOptions();
        if (colorSettings != null)
        {
            if (colorSettings.hover != null) options.colorSettings!.hover = colorSettings.hover;
            if (colorSettings.selected != null) options.colorSettings!.selected = colorSettings.selected;
            if (colorSettings.notSelected != null) options.colorSettings!.notSelected = colorSettings.notSelected;

            UtilityManager.addCssStyle(
                `.vrRating>label {
                    color: ` + options.colorSettings!.notSelected + `;
                    float: right;
                    cursor: pointer;
                }

                .vrRating>input:checked~label, .vrRating.hover:not(:checked)>label:hover, .vrRating.hover:not(:checked)>label:hover~label {
                    color: ` + options.colorSettings!.selected + `;
                }

                .vrRating.hover>input:checked+label:hover, .vrRating.hover>input:checked~label:hover, .vrRating.hover>label:hover~input:checked~label, .vrRating.hover>input:checked~label:hover~label {
                    color: ` + options.colorSettings!.hover + `;
                }`
            );
        }
        return options.colorSettings;
    }

    size(size?: string | number)
    {
        if (size != null)
        {
            if (typeof (size) == "number")
                size = size + "px";

            UtilityManager.addCssStyle(
                `.vrRating>label:before {
                    font-size: ` + size + `;
                }`
            );
        }

        let firstInput = puma(this.element()).find("input")[0];
        if (firstInput != null)
        {
            let firstInputId = firstInput.id;
            let fistLabel = puma(this.element()).find("label[for='" + firstInputId + "']")[0];
            return window.getComputedStyle(fistLabel, ':before').fontSize.vrGetNumericPart();
        }
        return 0;
    }

    total(total?: number)
    {
        if (total != null)
            this._lblTotal.value("(" + total + ")");

        return this._lblTotal.value().vrGetNumericPart();
    }

    enable()
    {
        super.enable();
        puma(this.element()).addClass("hover");
        puma(this.element()).find("input").removeAttr("disabled");
    }

    disable()
    {
        super.disable();
        puma(this.element()).removeClass("hover");
        puma(this.element()).find("input").attr("disabled", true);
    }

    getOptions()
    {
        return this.options<RatingOptions>();
    }
    //#endregion
}
//#endregion

//#region Classes
class RatingSelectEvent
{
    sender: Rating;
    value: number;
    oldValue?: number | null;
}

class RatingColorSettings
{
    selected?: string;
    hover?: string;
    notSelected?: string;
}
//#endregion