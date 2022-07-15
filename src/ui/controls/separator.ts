import { VrControlOptions, VrControl } from "../common";
import { ControlTypeEnum, OrientationEnum } from "../vr";

//#region Options
export class SeparatorOptions extends VrControlOptions
{
    size?: number;
    orientation?: OrientationEnum;
    color?: string;
    marginSettings?: MarginSettings;
}
//#endregion

//#region Control
export class Separator extends VrControl
{
    constructor(element: HTMLElement, options?: SeparatorOptions | null)
    {
        //#region Options
        if (options == null)
            options = new SeparatorOptions();

        if (options.size == null) options.size = 1;
        if (options.marginSettings == null) options.marginSettings = new MarginSettings();
        if (options.orientation == null) options.orientation = OrientationEnum.Vertical;
        if (options.color == null) options.color = "#CCC";
        if (options.tabIndex == null) options.tabIndex = -1;
        //#endregion

        super(element, options, ControlTypeEnum.Separator);

        //#region Orientation
        if (options.orientation == OrientationEnum.Vertical)
        {
            if (options.marginSettings.top == null) options.marginSettings.top = 0;
            if (options.marginSettings.right == null) options.marginSettings.right = 8;
            if (options.marginSettings.bottom == null) options.marginSettings.bottom = 0;
            if (options.marginSettings.left == null) options.marginSettings.left = 5;

            this.container().style.cssText += "display: inline; position: relative;"
                + "margin-top: " + options.marginSettings.top + "px; margin-bottom: " + options.marginSettings.bottom + "px;"
                + "margin-right: " + options.marginSettings.right + "px; margin-left: " + options.marginSettings.left + "px;";
            this.element().style.cssText += "display: inline-block; height: 30px; width: " + options.size + "px;"
                + "background-color: " + options.color + "; position: absolute; top: -4px;";
        }
        else
        {
            if (options.marginSettings.top == null) options.marginSettings.top = 0;
            if (options.marginSettings.right == null) options.marginSettings.right = 0;
            if (options.marginSettings.bottom == null) options.marginSettings.bottom = 8;
            if (options.marginSettings.left == null) options.marginSettings.left = 0;

            this.container().style.cssText += "display: block;"
                + "margin-top: " + options.marginSettings.top + "px; margin-bottom: " + options.marginSettings.bottom + "px;"
                + "margin-right: " + options.marginSettings.right + "px; margin-left: " + options.marginSettings.left + "px;";
            this.element().style.cssText += "display: inline-block; width: 100%; height: " + options.size + "px; background-color: " + options.color;
        }
        //#endregion

        if (options.visible != null)
            super.visible(options.visible);
    }
}
//#endregion

//#region Classes
class MarginSettings
{
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
}
//#endregion