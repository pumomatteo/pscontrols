import { ControlTypeEnum, IconClassicLight, IconClassicSolid, MenuItem, openBrowserWindow, openUrl, puma } from "../vr";
import { VrControlOptions, VrControl, VrControlsEvent } from "../common";
import { UtilityManager } from "../../../src/managers/utilityManager";

//#region Options
export class MenuOptions extends VrControlOptions
{
	items?: MenuItem[];
	showValueInDom?: boolean;
	showParentValueInDom?: boolean;

	onClick?: (onClickEvent: MenuOnClickEvent) => void;
}
//#endregion

//#region Control
export class Menu extends VrControl
{
	//#region Variables
	private _items: Map<MenuItem, HTMLElement>;
	private _value: string | number;
	//#endregion

	constructor(element: HTMLElement, options?: MenuOptions | null)
	{
		//#region Options
		if (options == null)
			options = new MenuOptions();

		if (options.width == null) options.width = "100%";
		if (options.height == null) options.height = "100%";
		if (options.showValueInDom == null) options.showValueInDom = false;
		if (options.showParentValueInDom == null) options.showParentValueInDom = false;
		//#endregion

		super(element, options, ControlTypeEnum.Menu);

		this._items = new Map<MenuItem, HTMLElement>();

		this.container().style.cssText += "align-items: start;";
		this.element().style.cssText += "overflow-y: auto;";

		if (options.items != null && options.items.length > 0)
			this.items(options.items);
	}

	//#region Methods
	clear(): void
	{
		this._items.clear();
		this._value = "";
		puma(this.element()).empty();
	}

	items(items?: MenuItem[])
	{
		if (items != null && items.length > 0)
		{
			items.forEach((menuItem) => this._items.set(menuItem, document.createElement('div')));

			items = items.filter(k => k.parentValue == null || k.parentValue == "");
			this.drawItems(items, this.element(), 0);
		}
		return Array.from(this._items.keys());
	}

	private itemsMap()
	{
		return this._items;
	}

	value(value?: string | number)
	{
		if (value != null && value != "")
		{
			this._value = value;
			let menuItem = this.items().find(k => k.value == value);
			if (menuItem != null)
			{
				let menuItemElement = this.itemsMap().get(menuItem);
				if (menuItemElement != null)
				{
					menuItemElement.click();
					this.openParents(value);
				}
			}
		}
		return this._value;
	}

	private openParents(value: string | number)
	{
		const item = this.items().find(k => k.value == value);
		if (item != null)
		{
			if (item.parentValue == null || item.parentValue == "")
				return;

			let parentItem = this.items().find(k => k.value == item.parentValue);
			if (parentItem != null)
			{
				let parentItemElement = this.itemsMap().get(parentItem);
				if (parentItemElement != null)
					parentItemElement.click();

				this.openParents(parentItem.value!);
			}
		}
	}

	private drawItems(items: MenuItem[], elementToAppend: HTMLElement, level: number): void
	{
		let options = this.getOptions();
		if (items.length == 0)
			return;

		for (let item of items)
		{
			//#region Menu block
			let menuBlock = document.createElement("div");
			menuBlock.setAttribute("level", String(level));
			menuBlock.classList.add("vrMenuBlock");
			menuBlock.style.cssText += "padding-left: " + (level * 20 + 10) + "px;";
			elementToAppend.appendChild(menuBlock);

			this._items.set(item, menuBlock);

			if (level > 0)
				menuBlock.classList.add("vrMenuBlockChild");

			if (item.hidden)
				menuBlock.style.cssText += "display: none;";

			if (options.showValueInDom && item.value != null)
				menuBlock.setAttribute("value", String(item.value));

			if (options.showParentValueInDom && item.value != null)
				menuBlock.setAttribute("value", String(item.parentValue));
			//#endregion

			//#region Menu block events
			menuBlock.onclick = (e) =>
			{
				let iconCaret = puma(menuBlock).find(".vrMenuIconCaret")[0] as HTMLElement;
				if (iconCaret != null)
				{
					const toShow = iconCaret.classList.contains(IconClassicSolid.CaretRight.split(" ")[1]);
					let blockChildren = this.getChildrenBlocks(menuBlock, toShow);
					if (blockChildren.length > 0)
					{
						if (toShow)
						{
							menuBlock.classList.add("opened");
							iconCaret.classList.remove(IconClassicSolid.CaretRight.split(" ")[1]);
							iconCaret.classList.add(IconClassicSolid.CaretDown.split(" ")[1]);
							blockChildren.forEach(k => k.style.display = "block");
						}
						else
						{
							menuBlock.classList.remove("opened");
							iconCaret.classList.remove(IconClassicSolid.CaretDown.split(" ")[1]);
							iconCaret.classList.add(IconClassicSolid.CaretRight.split(" ")[1]);
							blockChildren.forEach(k => 
							{
								k.style.display = "none";
								k.classList.remove("opened");
								let childIconCaret = puma(k).find(".vrMenuIconCaret")[0] as HTMLElement;
								if (childIconCaret != null)
								{
									childIconCaret.classList.remove(IconClassicSolid.CaretDown.split(" ")[1]);
									childIconCaret.classList.add(IconClassicSolid.CaretRight.split(" ")[1]);
								}
							});
						}
					}
				}
				else
				{
					// No children
					Array.from(this.itemsMap().values()).forEach((k: HTMLElement) => k.classList.remove("selected"));
					menuBlock.classList.add("selected");
				}

				if (item.onClick != null)
				{
					let onClickEvent = new MenuOnClickEvent();
					onClickEvent.sender = this;
					onClickEvent.dataItem = item;
					item.onClick(onClickEvent);
				}
				else if (options.onClick != null)
				{
					let onClickEvent = new MenuOnClickEvent();
					onClickEvent.sender = this;
					onClickEvent.dataItem = item;
					options.onClick(onClickEvent);
				}
				else if (item.url != null)
				{
					openBrowserWindow(item.url);
				}
				else if (item.urlSettings != null)
				{
					if (item.urlSettings.newTab == null) item.urlSettings.newTab = false;
					openBrowserWindow(item.urlSettings.url, item.urlSettings.newTab);
				}
			}
			//#endregion

			//#region Text + icon
			let text = document.createElement("span");
			text.innerHTML = item.text;
			menuBlock.appendChild(text);

			if (item.icon != null)
			{
				let icon = document.createElement("i");
				icon.classList.add("vrMenuIcon");
				icon.classList.add(...item.icon.split(" "));
				menuBlock.prepend(icon);
			}
			//#endregion

			//#region Has children
			let children = this.getOnlyChildrenItems(item);
			if (children.length > 0)
			{
				menuBlock.classList.add("vrMenuBlockParent");

				let iconCaret = document.createElement("i");
				iconCaret.classList.add("vrMenuIconCaret");
				iconCaret.classList.add(...IconClassicSolid.CaretRight.split(" "));
				menuBlock.appendChild(iconCaret);

				this.drawItems(children, elementToAppend, level + 1);
			}
			//#endregion
		}
	}

	private getChildrenBlocks(menuBlock: HTMLElement, toShow = true)
	{
		const level = Number(menuBlock.getAttribute("level"));
		const children: HTMLElement[] = [];
		puma(menuBlock).nextAll().each((index: number, element: HTMLElement) =>
		{
			const childrenLevel = Number(element.getAttribute("level"));
			if (toShow)
			{
				if (level + 1 == childrenLevel)
					children.push(element);
				else if (level == childrenLevel)
					return false;
			}
			else
			{
				if (level < childrenLevel)
					children.push(element);
				else
					return false;
			}

			return;
		});
		return children;
	}

	private getOnlyChildrenItems(parentItem: MenuItem): MenuItem[]
	{
		return Array.from(this.items().filter(k => k.parentValue != null && k.parentValue != "" && k.parentValue == parentItem.value));
	}

	getOptions(): MenuOptions
	{
		return this.options<MenuOptions>();
	}
	//#endregion
}

//#region Classes
export class MenuOnClickEvent extends VrControlsEvent
{
	sender: Menu;
	dataItem: MenuItem;
}
//#endregion