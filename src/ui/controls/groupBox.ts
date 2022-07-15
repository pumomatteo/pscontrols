import { ControlManager } from "../../../src/managers/controlManager";
import { VrControlOptions, VrControl } from "../common";
import { ControlTypeEnum, createButton, createCheckBox, div, IconClassLight, IconClass, puma } from "../vr";
import { Button, ButtonOptions } from "./button";
import { CheckBox } from "./checkbox";

//#region Options
export class GroupBoxOptions extends VrControlOptions
{
	title?: string;
	content?: string | HTMLElement | JQuery;
	collapsable?: boolean;
	checkbox?: boolean | string;
	startingCollapsed?: boolean;
	startingChecked?: boolean;
	items?: GroupBoxItem[];
	scrollable?: boolean;

	onCheckboxClick?: (e: GroupBoxOnCheckboxClickEvent) => void;
	onCollapse?: (e: GroupBoxOnCollapseEvent) => void;
	onExpand?: (e: GroupBoxOnExpandEvent) => void;
}
//#endregion

//#region Control
export class GroupBox extends VrControl
{
	private _contentContainer: HTMLElement;
	private _btnCollapse: Button;
	private _chkCheckbox: CheckBox;

	constructor(element: HTMLElement, options?: GroupBoxOptions | null)
	{
		//#region Options
		if (options == null)
			options = new GroupBoxOptions();

		if (options.width == null) options.width = "100%";
		if (options.title == null) options.title = "";
		if (options.collapsable == null) options.collapsable = false;
		if (options.startingCollapsed == null) options.startingCollapsed = false;
		if (options.startingCollapsed === true) options.collapsable = true;
		if (options.checkbox == null) options.checkbox = false;
		if (options.startingChecked == null) options.startingChecked = false;
		if (options.startingChecked === true && typeof (options.checkbox) != "string") options.checkbox = true;
		if (options.scrollable == null) options.scrollable = false;
		//#endregion

		super(element, options, ControlTypeEnum.GroupBox);
		let htmlContent = puma(this.element()).html();
		puma(this.element()).empty();

		let h1 = puma("<h1 class='vrGroupBoxH1'></h1>").vrAppendToPuma(this.element());

		//#region Collapse/Expand
		if (options.collapsable)
		{
			this._btnCollapse = createButton({
				icon: IconClassLight.CaretUp,
				cssContainer: "float: left; margin-top: -2px;",
				css: "border: none; background: none;",
				onClick: (e) =>
				{
					if (this.collapsed())
						this.expand();
					else
						this.collapse();
				}
			}, h1);
		}
		//#endregion

		//#region Checkbox
		if (options.checkbox !== false)
		{
			this._chkCheckbox = createCheckBox({
				checked: options.startingChecked,
				cssContainer: "float: left; margin-top: -1px;",
				onCheck: (e) =>
				{
					if (options!.onCheckboxClick != null)
					{
						let checkboxClickEvent = new GroupBoxOnCheckboxClickEvent();
						checkboxClickEvent.checked = e.checked;
						checkboxClickEvent.sender = this;
						options!.onCheckboxClick(checkboxClickEvent);
					}
				}
			}, h1);
		}
		//#endregion

		//#region Title
		puma("<span class='vrGroupBoxTitle'>" + options.title + "</span>").vrAppendToPuma(h1);
		//#endregion

		//#region Items
		if (options.items != null)
		{
			let divItems = div(h1, { class: "vrGroupBoxDivItems" });
			for (let item of options.items)
			{
				if (item.cssContainer != null) item.cssContainer = "";
				item.cssContainer += "; margin-left: 5px;";
				createButton(item, divItems);
			}
		}
		//#endregion

		//#region Content
		this._contentContainer = div(this.element(), { class: "vrGroupBoxContentContainer" });
		if (options.scrollable)
			this._contentContainer.style.cssText += "max-height: 100%; overflow-y: auto;";

		this.content((htmlContent != null && htmlContent != "") ? htmlContent : options.content);
		//#endregion

		if (options.startingCollapsed)
			this.collapse();
	}

	//#region Content/Title
	content(content?: string | JQuery | HTMLElement)
	{
		if (content != null)
		{
			puma(this._contentContainer).empty();
			puma(this._contentContainer).append((typeof (content) == "string") ? content : puma(content));
		}
		return this._contentContainer;
	}

	title(title?: string)
	{
		if (title != null)
			puma(this.element()).find(".vrGroupBoxTitle").html(title);

		return puma(this.element()).find(".vrGroupBoxTitle").html();
	}
	//#endregion

	//#region Expand/Collapse
	collapse()
	{
		this._btnCollapse.tag("collapsed");
		puma(this._contentContainer).hide();
		this._btnCollapse.icon(IconClassLight.CaretDown);

		let options = this.getOptions();
		if (options.onCollapse != null) 
		{
			let GroupBoxOnExpandEvent = new GroupBoxOnCollapseEvent();
			GroupBoxOnExpandEvent.sender = this;
			options.onCollapse(GroupBoxOnExpandEvent);
		}
	}

	expand()
	{
		this._btnCollapse.tag("");
		puma(this._contentContainer).show();
		this._btnCollapse.icon(IconClassLight.CaretUp);

		let options = this.getOptions();
		if (options.onExpand != null) 
		{
			let expandEvent = new GroupBoxOnExpandEvent();
			expandEvent.sender = this;
			options.onExpand(expandEvent);
		}
	}

	collapsed(state?: boolean)
	{
		if (state != null)
		{
			if (state) this.collapse();
			else this.expand();
		}
		return this._btnCollapse.tag() == "collapsed";
	}
	//#endregion

	//#region Items
	item(value: string): Button | null
	{
		let element = puma(this.element()).find(".vrGroupBoxDivItems button[value='" + value + "']")[0];
		if (element != null)
		{
			return ControlManager.get<Button>(puma(element).attr("id"));
		}
		return null;
	}

	enableItem(value: string)
	{
		let item = this.item(value);
		if (item != null)
			item.enable();
	}

	disableItem(value: string)
	{
		let item = this.item(value);
		if (item != null)
			item.disable();
	}

	showItem(value: string)
	{
		let item = this.item(value);
		if (item != null)
			item.show();
	}

	hideItem(value: string)
	{
		let item = this.item(value);
		if (item != null)
			item.hide();
	}
	//#endregion

	//#region Checkbox
	check(triggerChange = true)
	{
		this._chkCheckbox.checked(true, triggerChange);
	}

	unCheck(triggerChange = true)
	{
		this._chkCheckbox.checked(false, triggerChange);
	}

	checked(state?: boolean, triggerChange = true)
	{
		if (state != null)
		{
			if (state) this.check(triggerChange);
			else this.unCheck(triggerChange);
		}
		return this._chkCheckbox.checked();
	}
	//#endregion

	getOptions()
	{
		return this.options<GroupBoxOptions>();
	}
}
//#endregion

//#region Classes
class GroupBoxOnCheckboxClickEvent
{
	sender: GroupBox;
	checked: boolean;
}

class GroupBoxOnCollapseEvent
{
	sender: GroupBox;
}

class GroupBoxOnExpandEvent
{
	sender: GroupBox;
}

class GroupBoxItem extends ButtonOptions
{

}
//#endregion