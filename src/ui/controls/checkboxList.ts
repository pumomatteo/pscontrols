import { UtilityManager } from "../../../src/managers/utilityManager";
import { VrControlOptions, VrControl, VrControlsEvent } from "../common";
import { ControlTypeEnum, OrientationEnum, createCheckBox, puma } from "../vr";
import { CheckBoxCheckEvent, CheckBox } from "./checkbox";

//#region Options
export class CheckBoxListOptions extends VrControlOptions
{
    items?: CheckBoxItem[];
    orientation?: OrientationEnum;
    allChecked?: boolean;
    listName?: string;
    marginBetween?: number;
    // Gestione required e validation
    // Single check or multi

    onBeforeSelect?(e: CheckBoxListSelectEvent): void;
    onSelect?(e: CheckBoxListSelectEvent): void;
}
//#endregion

//#region Control
export class CheckBoxList extends VrControl
{
    private _checkboxControls: CheckBox[];
    private _items: CheckBoxItem[];

    constructor(element: HTMLElement, options?: CheckBoxListOptions | null)
    {
        //#region Options
        if (options == null)
            options = new CheckBoxListOptions();

        if (options.orientation == null) options.orientation = OrientationEnum.Horizontal;
        if (options.items == null) options.items = [];
        if (options.listName == null) options.listName = element.id + "_CheckboxListName";
        if (options.marginBetween == null) options.marginBetween = 10;
        //#endregion

        super(element, options, ControlTypeEnum.CheckBoxList);
        this._checkboxControls = [];

        this.items(options.items);
    }

    //#region Methos
    items(items?: CheckBoxItem[]): CheckBoxItem[]
    {
        let options = this.getOptions();
        if (items != null)
        {
            this._items = items;
            let i = 0;
            for (let item of items)
            {
                let checkBox = createCheckBox(
                    {
                        text: item.text,
                        value: (item.value == null) ? item.text : String(item.value),
                        name: options.listName,
                        checked: (options.allChecked) ? true : item.checked,
                        tag: item.tag,
                        cssContainer: (options.orientation == OrientationEnum.Horizontal && i > 0) ? "margin-left: " + options.marginBetween + "px;" : ((options.orientation == OrientationEnum.Vertical) ? "width: 100%" : ""),
                        onCheck: (e) => 
                        {
                            if (options!.onBeforeSelect != null)
                            {
                                let selectEvent = new CheckBoxListSelectEvent();
                                selectEvent.sender = this;
                                selectEvent.value = String(item.value);
                                selectEvent.checked = e.checked;
                                selectEvent.checkedValues = this.value();
                                options!.onBeforeSelect(selectEvent);

                                if (selectEvent.isDefaultPrevented())
                                    return;
                            }

                            if (item.onCheck != null)
                                item.onCheck(e);

                            if (options!.onSelect != null)
                            {
                                let selectEvent = new CheckBoxListSelectEvent();
                                selectEvent.sender = this;
                                selectEvent.value = String(item.value);
                                selectEvent.checked = e.checked;
                                selectEvent.checkedValues = this.value();
                                options!.onSelect(selectEvent);
                            }
                        }
                    }, this.element());

                this._checkboxControls.push(checkBox);
                i++;
            }
        }
        return this._items;
    }

    checkAll(triggerChange = false): void
    {
        for (let checkbox of this._checkboxControls)
            checkbox.checked(true, triggerChange);
    }

    unCheckAll(triggerChange = false): void
    {
        for (let checkbox of this._checkboxControls)
            checkbox.checked(false, triggerChange);
    }

    value(values?: string[], state = true, triggerChange = true): string[]
    {
        if (values != null)
        {
            for (let value of values)
            {
                let checkbox = this._checkboxControls.filter(k => puma(k.element()).attr("value") == value)[0];
                if (checkbox != null)
                    checkbox.checked(state, triggerChange);
            }
        }
        return this._checkboxControls.filter(k => k.checked()).map(k => puma(k.element()).attr("value"));
    }

    valueTag(tagList?: any[], state = true, triggerChange = true)
    {
        if (tagList != null)
        {
            for (let tag of tagList)
            {
                let checkbox = this._checkboxControls.filter(k => UtilityManager.equals(k.tag(), tag))[0];
                if (checkbox != null)
                    checkbox.checked(state, triggerChange);
            }
        }
        return this._checkboxControls.filter(k => k.checked()).map(k => k.tag());
    }

    isChecked(value: string): boolean
    {
        let checkBox = this._checkboxControls.filter(k => puma(k.element()).attr("value") == value)[0];
        if (checkBox != null)
            return checkBox.checked();

        return false;
    }

    text(value: string, text?: string): string
    {
        let checkBox = this._checkboxControls.filter(k => puma(k.element()).attr("value") == value)[0];
        if (checkBox != null)
            return checkBox.text(text);

        return "";
    }

    clear(checkAll = false, triggerChange = false): void
    {
        if (checkAll)
            this.checkAll(triggerChange);
        else
            this.unCheckAll(triggerChange);
    }

    clearItems()
    {
        this._checkboxControls = [];
        puma(this.element()).empty();
    }

    getOptions(): CheckBoxListOptions
    {
        return this.options<CheckBoxListOptions>();
    }

    enable(): void
    {
        super.enable();
        for (let checkbox of this._checkboxControls)
            checkbox.enable();
    }

    disable(): void
    {
        super.disable();
        for (let checkbox of this._checkboxControls)
            checkbox.disable();
    }
    //#endregion
}
//#endregion

//#region Classes
class CheckBoxItem
{
    text?: string;
    value?: string | number;
    checked?: boolean;
    threeState?: boolean;
    tag?: any;

    onCheck?: (e: CheckBoxCheckEvent) => void;
}

class CheckBoxListSelectEvent extends VrControlsEvent
{
    sender: CheckBoxList;
    checkedValues?: string[];
    value?: string;
    checked?: boolean;
}
//#endregion