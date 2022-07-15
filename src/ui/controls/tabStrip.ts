import { UtilityManager } from "../../../src/managers/utilityManager";
import { VrControl, VrControlOptions, VrControlsEvent } from "../common";
import { ControlTypeEnum, puma, TabStripItem, createButtonGroup, ColorSettings } from "../vr";
import { ButtonGroup } from "./buttonGroup";

//#region Options
export class TabStripOptions extends VrControlOptions
{
	items?: TabStripItem[];
	backgroundColor?: string;
	tooltip?: boolean;

	onSelect?(e: TabStripSelectEvent): void;
	onItemAdded?(e: TabStripItemAddedEvent): void;
	onItemRemoved?(e: TabStripItemRemovedEvent): void;
}
//#endregion

//#region Control
export class TabStrip extends VrControl
{
	private _buttonGroup: ButtonGroup;

	constructor(element: HTMLElement, options?: TabStripOptions | null)
	{
		//#region Options
		if (options == null)
			options = new TabStripOptions();

		if (options.width == null) options.width = "100%";
		if (options.backgroundColor == null) options.backgroundColor = "#e3f1fa";
		//#endregion

		super(element, options, ControlTypeEnum.TabStrip);

		//#region Items
		if (options.items != null)
		{
			for (let item of options.items)
			{
				if (item.colorSettings == null) item.colorSettings = new ColorSettings();
				if (item.colorSettings.background == null) item.colorSettings.background = options.backgroundColor;

				//#region Element to Show/Hide
				if (item.elementId != null)
				{
					if (!item.elementId!.startsWith("#"))
						item.elementId = "#" + item.elementId;

					let userOnClick = item.onClick;
					item.onClick = (e) =>
					{
						let elementIdList = this.items().filter(k => k.elementId != null).map(k => k.elementId);
						for (let elementId of elementIdList)
						{
							if (!elementId!.startsWith("#"))
								elementId = "#" + elementId;

							puma(elementId).hide();
						}
						puma(item.elementId).show();

						if (userOnClick != null)
							userOnClick(e);
					}
				}
				//#endregion
			}
		}
		//#endregion

		options.width = "100%";
		options.cssContainer = undefined;
		options.css = "background-color: " + options.backgroundColor + ";";
		options.margin = undefined;
		this._buttonGroup = createButtonGroup(options as any, this.element())
	}

	//#region Methods
	items(items?: TabStripItem[]): TabStripItem[]
	{
		return this._buttonGroup.items(items);
	}

	addItem(item: TabStripItem, show = true)
	{
		let options = this.getOptions();
		if (item.colorSettings == null) item.colorSettings = new ColorSettings();
		if (item.colorSettings.background == null) item.colorSettings.background = options.backgroundColor;

		this._buttonGroup.addItem(item);

		if (show)
		{
			if (item.elementId != null)
			{
				if (!item.elementId!.startsWith("#"))
					item.elementId = "#" + item.elementId;

				let userOnClick = item.onClick;
				item.onClick = (e) =>
				{
					let elementIdList = this.items().filter(k => k.elementId != null).map(k => k.elementId);
					for (let elementId of elementIdList)
					{
						if (!elementId!.startsWith("#"))
							elementId = "#" + elementId;

						puma(elementId).hide();
					}
					puma(item.elementId).show();

					if (userOnClick != null)
						userOnClick(e);
				}

				puma(item.elementId).show();
			}
		}
	}

	item(value: string)
	{
		return this.items().filter(k => k.value == value)[0];
	}

	removeItem(value: string)
	{
		this._buttonGroup.removeItem(value);

		let index = this.items().map(k => k.value).indexOf(value);
		if (index != -1)
			this.items().splice(index, 1);

		let item = this.items().filter(k => k.value == value)[0];
		if (item != null && item.elementId != null)
		{
			if (!item.elementId!.startsWith("#"))
				item.elementId = "#" + item.elementId;

			puma(item.elementId).remove();
		}
	}

	removeAllItems()
	{
		let items = UtilityManager.duplicate(this.items());
		for (let item of items)
			this.removeItem(String(item.value));
	}

	showItems(values: any[])
	{
		this._buttonGroup.showItems(values);
	}

	showItem(value: any)
	{
		this._buttonGroup.showItem(value);
	}

	showAllItems()
	{
		this._buttonGroup.showAllItems();
	}

	hideItems(values: any[])
	{
		this._buttonGroup.hideItems(values);

		for (let value of values)
			this.hideItem(value);
	}

	hideItem(value: any, hide = true)
	{
		this._buttonGroup.hideItem(value);

		if (hide)
		{
			let item = this.items().filter(k => k.value == value)[0];
			if (item != null && item.elementId != null)
				puma(item.elementId).hide();
		}
	}

	hideAllItems(hideElement = true)
	{
		this._buttonGroup.hideAllItems();

		if (hideElement)
		{
			for (let item of this.items())
			{
				if (item != null && item.elementId != null)
					puma(item.elementId).hide();
			}
		}
	}

	visibleItem(value: any, state?: boolean): boolean
	{
		if (state != null)
		{
			if (state) this.showItem(value);
			else this.hideItem(value);
		}
		return this._buttonGroup.visibleItem(value, state);
	}

	enableItem(value: any)
	{
		this._buttonGroup.enableItem(value);
	}

	enableItems(values: any[])
	{
		for (let value of values)
			this._buttonGroup.enableItem(value);
	}

	disableItem(value: any)
	{
		this._buttonGroup.disableItem(value);
	}

	disableItems(values: any[])
	{
		for (let value of values)
			this._buttonGroup.disableItem(value);
	}

	select(values: string[] | number[], triggerChange = true): void
	{
		this._buttonGroup.select(values, triggerChange);
	}

	selectIndex(index: number, triggerChange = true)
	{
		this._buttonGroup.selectIndex(index, triggerChange);
	}

	value()
	{
		return this._buttonGroup.value();
	}

	getItemByValue(value: string): HTMLElement
	{
		return this._buttonGroup.getItemByValue(value);
	}

	getItemByIndex(index: number): HTMLElement
	{
		return this._buttonGroup.getItemByIndex(index);
	}

	itemTooltip(value: string, tooltip?: string): string
	{
		return this._buttonGroup.itemTooltip(value, tooltip);
	}

	itemText(value: string, text?: string, updateTooltip = true): string
	{
		return this._buttonGroup.itemText(value, text, updateTooltip);
	}

	itemTextByIndex(index: number, text?: string): string
	{
		return this._buttonGroup.itemTextByIndex(index, text);
	}
	//#endregion

	//#region Overrides
	enable()
	{
		super.enable();
		this._buttonGroup.enable();
	}

	disable()
	{
		super.disable();
		this._buttonGroup.disable();
	}
	//#endregion

	getOptions(): TabStripOptions
	{
		return this.options<TabStripOptions>();
	}
}
//#endregion

//#region Classes
class TabStripEvent extends VrControlsEvent
{
	sender: TabStrip;
}

class TabStripSelectEvent extends TabStripEvent
{
	value?: string | null;
	selectedValues: string[];
	selected?: boolean;
}

class TabStripItemAddedEvent extends TabStripEvent { }
class TabStripItemRemovedEvent extends TabStripEvent { }
//#endregion