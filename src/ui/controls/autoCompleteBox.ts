import { UtilityManager } from "../../../src/managers/utilityManager";
import { VrControlOptions, VrControl, VrControlsEvent } from "../common";
import { AutoCompleteBoxItem, ControlTypeEnum, createTextBox, div, span, puma, createIcon, IconClassicLight, IconClass, AutoCompleteBoxComboSettings, AutoCompleteBoxItemSettings, WebApiModeEnum, ComboBoxItem, ComboBoxTreeModeEnum, KeyEnum, shadowRoot, IconClassicRegular } from "../vr";
import { TextBox } from "./textbox";

//#region Options
export class AutoCompleteBoxOptions extends VrControlOptions
{
	value?: string[] | AutoCompleteBoxItem[];
	rows?: number;
	placeholder?: string;
	border?: boolean;
	itemSettings?: AutoCompleteBoxItemSettings;
	comboSettings?: AutoCompleteBoxComboSettings;
	tooltip?: boolean;

	onItemClick?: (e: AutoCompleteBoxItemClickEvent) => void;
	onItemAdded?: (e: AutoCompleteBoxItemAddedEvent) => void;
	onItemRemoved?: (e: AutoCompleteBoxItemRemovedEvent) => void;
	onFocus?: (e: AutoCompleteBoxFocusEvent) => void;
	onBlur?: (e: AutoCompleteBoxBlurEvent) => void;
}
//#endregion

//#region Control
export class AutoCompleteBox extends VrControl
{
	//#region Variables
	private _txtInput: TextBox;
	private _spanForWidth: HTMLElement;
	private _items: AutoCompleteBoxItem[];

	private _comboItems: ComboBoxItem[];
	private _popup: HTMLElement;
	private _lastAjaxCallGuid: string;
	private _typedTextWebService: string | null;
	private _dictionaryValueLi: Map<string, HTMLElement[]>;
	private _dictionaryLiValue: Map<HTMLElement, string>;
	//#endregion

	constructor(element: HTMLElement, options?: AutoCompleteBoxOptions | null)
	{
		//#region Options
		if (options == null)
			options = new AutoCompleteBoxOptions();

		if (options.width == null) options.width = 300;
		if (options.border == null) options.border = true;
		if (options.tooltip == null) options.tooltip = true;

		if (options.itemSettings == null) options.itemSettings = new AutoCompleteBoxItemSettings();
		if (options.itemSettings.backgroundColor == null) options.itemSettings.backgroundColor = "#FFF";
		if (options.itemSettings.textColor == null) options.itemSettings.textColor = "#5f6368";
		if (options.itemSettings.border == null) options.itemSettings.border = "solid 1px #dadce0";
		if (options.itemSettings.bold == null) options.itemSettings.bold = false;
		if (options.itemSettings.deleteIconColor == null) options.itemSettings.deleteIconColor = "rgb(140 140 140)";

		if (options.comboSettings != null)
		{
			if (options.comboSettings.freeText == null) options.comboSettings.freeText = true;
			if (options.comboSettings.treeMode == null) options.comboSettings.treeMode = ComboBoxTreeModeEnum.AllExpanded;
		}
		//#endregion

		super(element, options, ControlTypeEnum.AutoCompleteBox);
		puma(this.element()).attr("tabindex", "1");
		this._spanForWidth = span(this.element(), { css: "visibility: hidden;" });

		this._popup = puma("<div class='comboBox_divPopup vrPopup' id='" + element.id + "_divPopup' style='border: solid 1px #ccc; display: none; position: absolute;  border-radius: 4px; box-shadow: 0 5px 10px rgb(0 0 0 / 20%); padding: 5px; overflow-y: auto; z-index: 9999999;  background-color: #fff; height: fit-content;'></div>").vrAppendToPuma((shadowRoot() != null) ? shadowRoot() : document.body)[0];

		this._items = [];

		if (options.border)
			this.element().style.cssText += "border: solid 1px #ccc;";

		let timeout = 0;
		this._txtInput = createTextBox({
			cssContainer: "width: auto !important;",
			css: "width: 20px; min-width: 20px !important; max-width: " + this.width() + "px; padding-left: 0px; padding-right: 0px;",
			onKeyUp: (e) =>
			{
				//#region Ctrl+V (paste support)
				if (e.key == KeyEnum.ArrowRight || e.key == KeyEnum.ArrowLeft || e.key == KeyEnum.ArrowUp
					|| e.key == KeyEnum.Control || e.ctrlKey)
				{
					if (!(e.key == "v" && e.ctrlKey))
					{
						this.manageInputWidth();
						e.preventDefault();
						return;
					}
				}
				//#endregion

				if (options!.comboSettings != null)
				{
					clearTimeout(timeout);
					timeout = window.setTimeout(() =>
					{
						let text = String(e.value);
						if (options!.comboSettings == null || options!.comboSettings.webService == null)
						{
							//#region Items
							let filteredItems = this.filter(text, this.element());
							if (filteredItems.length > 0)
								this.open();
							else
								this.close();

							if (e.key == "v" && e.ctrlKey && filteredItems.length == 1)
							{
								this.valueCombo(String(filteredItems[0].value));
								this.close();
							}
							//#endregion
						}
						else if (options!.comboSettings.webService != null)
						{
							//#region WebService
							if (e.key != KeyEnum.Enter)
							{
								if (text == "")
								{
									this._items = [];
									puma(this._popup).find("ul").remove();
									return;
								}
								else
								{
									let selectionStart = (this.element() as HTMLInputElement).selectionStart;
									let selectionEnd = (this.element() as HTMLInputElement).selectionEnd;
									if (!(selectionStart == 0 && selectionEnd == (this.element() as HTMLInputElement).value.length))
										this.doAjaxCall(text);
								}
							}
							//#endregion
						}
					}, 300);
				}
			},
			onEnterKey: (e) => 
			{
				if (options!.comboSettings != null)
				{
					if (options!.comboSettings.freeText)
						this.manageInput(e.sender, e.sender.value<string>());
					else
					{
						this._txtInput.clear();
						this.placeholder(options!.placeholder);
					}
				}
				else
					this.manageInput(e.sender, e.sender.value<string>());
			},
			onKeyDown: (e) => 
			{
				this.manageInputWidth()

				if (options!.comboSettings != null && e.key == KeyEnum.ArrowDown)
				{
					let li = puma(this._popup).find("li:visible").first();
					li.focus();
				}
			}
		}, this.element())

		if (options.comboSettings != null && options.comboSettings.items != null)
			this.comboItems(options.comboSettings.items);

		puma(document.body).on("click", (e: JQuery.ClickEvent) =>
		{
			if (this._txtInput.value() != "" && e.target.id != this._txtInput.element().id && !e.target.classList.contains("vrAutoCompleteBoxItemText") && !e.target.classList.contains("comboBox_divPopup"))
			{
				this.manageInput(this._txtInput, this._txtInput.value())
				this.blurEvent();
			}
		});

		//#region Focus
		puma(this.element()).on("focus", (e: JQuery.FocusEvent) => this.focus());
		//#endregion

		//#region Value & Placeholder
		if (options.placeholder != null)
			this.placeholder(options.placeholder);

		if (options.value != null)
			this.items(options.value);
		//#endregion

		//#region Rows
		if (options.rows != null)
		{
			let maxHeight = 0;
			for (let i = 0; i < options.rows; i++)
			{
				if (i == 0) maxHeight += 27;
				else maxHeight += 22;
			}
			this.element().style.cssText += "max-height: " + maxHeight + "px;";
		}
		//#endregion

		let baseListener = (shadowRoot() != null) ? shadowRoot() : document;
		baseListener!.addEventListener("scroll", (e) =>
		{
			if (!puma(e.target).hasClass("comboBox_divPopup") && puma(this._popup).is(":visible"))
				this.close();
		}, true);
	}

	//#region ManageInput
	private manageInput(sender: any, text: string, value?: string | null)
	{
		let options = this.getOptions();
		sender.clear();
		this.placeholder(options.placeholder);

		if (text != "")
		{
			for (let txt of text.split(","))
			{
				let item = new AutoCompleteBoxItem();
				item.text = txt.trim();
				if (value != null) item.value = value;
				this.addItem(item);
			}
		}

		// Reposition input at the end
		puma(this._txtInput.container()).vrAppendToPuma(this.element());

		window.setTimeout(() => this.focus());
		this.close();
	}

	private manageInputWidth()
	{
		let options = this.getOptions();
		let value = this._txtInput.value<string>();
		if (value != "")
			this._txtInput.element().style.width = (this.textWidth(value) + 20) + "px";
		else
			this.placeholder(options.placeholder);
	}
	//#endregion

	//#region Items
	items(items?: string[] | AutoCompleteBoxItem[])
	{
		if (items != null)
		{
			for (let item of items)
				this.addItem(item);
		}
		return this._items;
	}

	addItem(item: string | AutoCompleteBoxItem)
	{
		if (item == null || item == "")
			return;

		let options = this.getOptions();
		this.placeholder("");

		let realItem: AutoCompleteBoxItem = item as any;
		if (typeof (item) == "string")
		{
			realItem = new AutoCompleteBoxItem();
			realItem.text = item;
			realItem.value = item;
		}

		if (realItem.value == null)
			realItem.value = realItem.text;

		let divItem = div(this.element(), { class: "vrAutoCompleteBoxItem", attributes: [{ name: "value", value: realItem.value }] });
		let spanItemText = span(divItem, { content: realItem.text, class: "vrAutoCompleteBoxItemText" });

		//#region Tooltip
		if (options.tooltip)
			puma(divItem).attr("title", realItem.text);
		//#endregion

		//#region Color
		let backgroundColor = options.itemSettings!.backgroundColor!;
		let textColor = options.itemSettings!.textColor!;
		let border = options.itemSettings!.border!;
		let bold = options.itemSettings!.bold!;
		let deleteIconColor = options.itemSettings!.deleteIconColor!;
		let maxWidth = options.itemSettings!.maxWidth;

		if (realItem.settings != null)
		{
			if (realItem.settings.backgroundColor != null) backgroundColor = realItem.settings.backgroundColor;
			if (realItem.settings.textColor != null) textColor = realItem.settings.textColor;
			if (realItem.settings.border != null) border = realItem.settings.border;
			if (realItem.settings.bold != null) bold = realItem.settings.bold;
			if (realItem.settings.deleteIconColor != null) deleteIconColor = realItem.settings.deleteIconColor;
			if (realItem.settings.maxWidth != null) maxWidth = realItem.settings.maxWidth;
		}

		divItem.style.cssText += "background-color: " + backgroundColor + "; color: " + textColor + "; border: " + border + ";";
		if (bold)
			divItem.style.cssText += "font-weight: 600;";

		if (maxWidth != null)
			spanItemText.style.cssText += "max-width: " + maxWidth + "px;";
		//#endregion

		//#region Click to edit
		puma(divItem).on("click", (e: JQuery.ClickEvent) =>
		{
			//#region ItemClick event
			if (options!.onItemClick != null)
			{
				let itemClickEvent = new AutoCompleteBoxItemClickEvent();
				itemClickEvent.sender = this;
				itemClickEvent.item = { item: realItem, element: divItem };
				itemClickEvent.text = realItem.text;
				options!.onItemClick(itemClickEvent);

				if (itemClickEvent.isDefaultPrevented())
				{
					e.preventDefault();
					return;
				}
			}
			//#endregion

			// Position input at the current item position
			puma(this._txtInput.container()).vrInsertBeforePuma(divItem);

			this.removeItem(realItem.value!);

			//#region Input value & width
			let width = this.textWidth(realItem.text);

			this._txtInput.value(realItem.text, false);
			this._txtInput.element().style.width = (width + 20) + "px";
			(this._txtInput.element() as HTMLInputElement).select();
			//#endregion

			this.focus();
		});
		//#endregion

		//#region Delete
		createIcon({
			value: IconClassicRegular.Xmark,
			cssContainer: "margin-left: 5px; top: -1px;",
			color: deleteIconColor,
			onClick: (e) => this.removeItem(realItem.value!)
		}, divItem);
		//#endregion

		puma(divItem).vrInsertBeforePuma(this._txtInput.container())

		if (realItem.value != null)
			puma(divItem).attr("value", realItem.value);

		this._items.push(realItem);

		//#region Item added event
		if (options!.onItemAdded != null)
		{
			let itemAddedEvent = new AutoCompleteBoxItemAddedEvent();
			itemAddedEvent.sender = this;
			itemAddedEvent.item = { item: realItem, element: divItem };
			options!.onItemAdded(itemAddedEvent);
		}
		//#endregion
	}

	removeItem(value: string)
	{
		this._items.vrDeleteAllBy(k => k.value == value);
		puma(this.container()).find(".vrAutoCompleteBoxItem[value='" + value + "']").remove();

		let options = this.getOptions();
		if (this.items().length == 0)
			this.placeholder(options.placeholder);

		//#region Item removed event
		if (options!.onItemRemoved != null)
		{
			let itemAddedEvent = new AutoCompleteBoxItemAddedEvent();
			itemAddedEvent.sender = this;
			itemAddedEvent.item = this.item(value);
			options!.onItemRemoved(itemAddedEvent);
		}
		//#endregion
	}

	item(value: string)
	{
		let item = new AutoCompleteBoxItemInfo();

		let realItem = this._items.filter(k => k.value == value)[0];
		let index = this.items().indexOf(realItem);
		item.item = this.items()[index];

		item.element = puma(this.container()).find(".vrAutoCompleteBoxItem[value='" + value + "']")[0];
		return item;
	}
	//#endregion

	//#region Color
	color(value: string, settings: AutoCompleteBoxItemSettings)
	{
		let item = this.item(value);
		if (item.element != null && settings != null)
		{
			if (settings.backgroundColor != null) item.element.style.cssText += "background-color: " + settings.backgroundColor + ";";
			if (settings.textColor != null) item.element.style.cssText += "color: " + settings.textColor + ";";
			if (settings.border != null) item.element.style.cssText += "border: " + settings.border + ";";
			if (settings.bold) item.element.style.cssText += "font-weight: 600;";
		}
	}
	//#endregion

	//#region Value
	text()
	{
		return this.items().map(k => k.text);
	}

	value(items?: string[] | AutoCompleteBoxItem[])
	{
		if (items != null)
			this.items(items);

		return this.items().map(k => k.value);
	}

	placeholder(value?: string): string
	{
		if (value != null)
		{
			let width = this.textWidth(value);
			(this._txtInput.element() as HTMLInputElement).placeholder = value;
			this._txtInput.element().style.width = (width + 20) + "px";
		}
		return (this._txtInput.element() as HTMLInputElement).placeholder;
	}
	//#endregion

	//#region Other
	private textWidth(value: string)
	{
		let width = 0;
		this._spanForWidth.innerHTML = value.replace(/\s/g, "&nbsp;");
		width = this._spanForWidth.offsetWidth;
		this._spanForWidth.innerHTML = "";

		return width;
	}

	focus()
	{
		let options = this.getOptions();
		if (!puma(this.element()).vrHasScrollBar())
		{
			this._txtInput.focus();
			this.focusEvent();

			if (this._txtInput.value() == "")
				this.placeholder(options.placeholder);
		}
	}

	private focusEvent()
	{
		let options = this.getOptions();
		if (options.onFocus != null)
		{
			let focusEvent = new AutoCompleteBoxFocusEvent();
			focusEvent.sender = this;
			focusEvent.element = this._txtInput.element();
			options.onFocus(focusEvent);
		}
	}

	private blurEvent()
	{
		let options = this.getOptions();
		if (options.onBlur != null)
		{
			let focusEvent = new AutoCompleteBoxBlurEvent();
			focusEvent.sender = this;
			focusEvent.element = this._txtInput.element();
			options.onBlur(focusEvent);
		}
	}

	clear()
	{
		let options = this.getOptions();
		this._items = [];

		puma(this.container()).find(".vrAutoCompleteBoxItem").remove();
		this._txtInput.clear();

		this.placeholder(options.placeholder);
	}
	//#endregion

	//#region Popup webservice
	private close(): void
	{
		puma(this._popup).hide();
	}

	private open(): void
	{
		puma(this._popup).find(".vrComboBoxSelectedComboValue").removeClass("vrComboBoxSelectedComboValue");
		if (!this.enabled())
			return;

		if (puma(this._popup).is(":visible"))
			return;

		puma(this._popup).show();
		super.settingPopup(this._popup);

		let minWidth = puma(this.element()).width();
		this._popup.style.cssText += "min-width: " + minWidth + "px;";
	}

	private doAjaxCall(text = ""): void
	{
		let options = this.getOptions();
		if (options.comboSettings == null || options.comboSettings.webService == null)
			return;

		if (options.comboSettings.webService.typedTextPropertyName == null) options.comboSettings.webService.typedTextPropertyName = "text";
		if (options.comboSettings.webService.typedValuePropertyName == null) options.comboSettings.webService.typedValuePropertyName = "value";
		if (options.comboSettings.webService.itemsPropertyName == null) options.comboSettings.webService.itemsPropertyName = "items";

		let request: any = {};
		request[options.comboSettings.webService.typedTextPropertyName] = text;

		if (options.comboSettings.webService.authKey == null)
			options.comboSettings.webService.authKey = "";

		if (options.comboSettings.webService.parameters != null)
		{
			let parameters = options.comboSettings.webService.parameters();
			let jsonParameters = Object.getOwnPropertyNames(parameters);
			for (let param of jsonParameters)
				request[param] = parameters[param];
		}

		this._lastAjaxCallGuid = UtilityManager.createGuid();
		request.guid = this._lastAjaxCallGuid;
		UtilityManager.doAjaxCall(
			{
				mode: WebApiModeEnum.Async,
				authKey: options.comboSettings.webService.authKey,
				method: options.comboSettings.webService.method,
				request: request
			},
			(response: any) =>
			{
				if (this._lastAjaxCallGuid != null && response.guid != null && this._lastAjaxCallGuid != response.guid)
					return;

				this._typedTextWebService = text;
				let items = response[options!.comboSettings!.webService!.itemsPropertyName!];
				this.comboItems(items);

				if (items.length > 0)
					this.open();
				else
					this.close();
			}
		)
	}

	private comboItems(items?: ComboBoxItem[])
	{
		let options = this.getOptions();
		if (items != null)
		{
			this._comboItems = items;

			if (this.getRootItems().length == 0)
				puma(this._popup).addClass("vrComboBoxFlat");
			else
				puma(this._popup).removeClass("vrComboBoxFlat");

			if (options.comboSettings!.webService == null)
			{
				this.drawDataSource();
			}
			else
			{
				if (this._typedTextWebService == null) this._items = [];
				this.drawDataSource();
				this._typedTextWebService = null;
			}
		}
		return this._comboItems;
	}

	private getOnlyChildrenItems(parentItem: ComboBoxItem): ComboBoxItem[]
	{
		return this.comboItems().filter(k => k.parentValue != null && k.parentValue == parentItem.value);
	}

	private getRootItems(): ComboBoxItem[]
	{
		let parentItems: ComboBoxItem[] = [];
		for (let item of this.comboItems())
		{
			if (item == null)
				continue;

			let parentValue = item.parentValue;
			while (parentValue != null)
			{
				let parentItem = this.comboItems().filter(k => k.value == parentValue)[0];
				if (!parentItems.includes(parentItem))
					parentItems.push(parentItem);

				parentValue = (parentItem != null) ? parentItem.parentValue : undefined;
				if (parentItem != null && parentValue == parentItem.value)
					parentValue = undefined;
			}
		}
		return parentItems;
	}

	private getRootValues(): string[]
	{
		return this.getRootItems().filter(k => k != null).map(k => String(k.value));
	}

	private drawDataSource(searchedText?: string | null): void
	{
		puma(this._popup).find(".vrComboBoxUl").remove();

		let items = this.comboItems();
		if (searchedText != null)
			items = this.getFilteredArrayByInputText(searchedText);

		if (items.length == 1 && items[0] == null)
			return;

		this._dictionaryValueLi = new Map<string, HTMLElement[]>();
		this._dictionaryLiValue = new Map<HTMLElement, string>();
		items = items.filter(k => k.parentValue == null);
		this.drawItems(items, this._popup);
	}

	private drawItems(items: ComboBoxItem[], elementToAppend: HTMLElement): void
	{
		let options = this.getOptions();
		if (items.length == 0)
			return;

		let ul = puma("<ul class='vrComboBoxUl'></ul>").vrAppendToPuma(elementToAppend);
		for (let item of items)
		{
			if (item.value == null)
				item.value = item.text;

			let li = puma("<li class='vrComboBoxLi' tabindex='-1'></li>").vrAppendToPuma(ul);
			this._dictionaryLiValue.set(li[0], String(item.value));
			if (this._dictionaryValueLi.has(String(item.value)))
			{
				let actualLiList = this._dictionaryValueLi.get(String(item.value))!;
				actualLiList.push(li[0]);
				this._dictionaryValueLi.set(String(item.value), actualLiList);
			}
			else
				this._dictionaryValueLi.set(String(item.value), [li[0]]);

			//#region Key support
			puma(li).on("focusin", (e: JQuery.FocusEvent) => 
			{
				puma(this._popup).find(".vrComboBoxSelectedComboValue").removeClass("vrComboBoxSelectedComboValue");
				puma(e.target).addClass("vrComboBoxSelectedComboValue keydownFocus");
			});
			puma(li).on("keydown", (e: JQuery.KeyDownEvent) =>
			{
				if (e.key == KeyEnum.ArrowDown)
				{
					let next = puma(e.currentTarget).next();
					if (next.length == 0)
						return;

					puma(this._popup).find(".vrComboBoxSelectedComboValue").removeClass("vrComboBoxSelectedComboValue");
					while (!next.is(":visible"))
						next = puma(next).next();

					next.focus();
				}
				else if (e.key == KeyEnum.ArrowUp)
				{
					let prev = puma(e.currentTarget).prev();
					if (prev.length == 0)
						return;

					puma(this._popup).find(".vrComboBoxSelectedComboValue").removeClass("vrComboBoxSelectedComboValue");
					while (!prev.is(":visible"))
						prev = puma(prev).prev();

					prev.focus();
				}
				else if (e.key == KeyEnum.Enter)
					puma(e.currentTarget).find(".vrComboBoxItemText").click();
			});
			//#endregion

			//#region Tree mode
			if (options.comboSettings!.treeMode == ComboBoxTreeModeEnum.AllCollapsed)
			{
				if (item.parentValue != null)
					puma(li).closest(".vrComboBoxUl").hide();
			}
			else if (options.comboSettings!.treeMode == ComboBoxTreeModeEnum.OnlyFirstLevelExpanded)
			{
				if (puma(li).parents(".vrComboBoxUl").length > 2)
					puma(li).closest(".vrComboBoxUl").hide();
			}
			//#endregion

			let children = this.getOnlyChildrenItems(item);
			if (children.length > 0)
			{
				//#region Icon expand/collapse
				let iconClassForDiv = "";
				let iconClass = IconClassicLight.CaretRight;
				if (options.comboSettings!.treeMode == ComboBoxTreeModeEnum.AllCollapsed)
				{
					if (item.parentValue != null)
					{
						iconClass = IconClassicLight.CaretRight;
						iconClassForDiv = "caret-right";
					}
				}
				else if (options.comboSettings!.treeMode == ComboBoxTreeModeEnum.OnlyFirstLevelExpanded)
				{
					if (puma(li).parents(".vrComboBoxUl").length == 1)
					{
						iconClass = IconClassicLight.CaretDown;
						iconClassForDiv = "caret-down";
					}
					else
					{
						iconClass = IconClassicLight.CaretRight;
						iconClassForDiv = "caret-right";
					}
				}
				else
				{
					iconClass = IconClassicLight.CaretDown;
					iconClassForDiv = "caret-down";
				}

				let divIcon = puma("<div class='vrComboBoxDivIconExpand " + iconClassForDiv + "'></div>").vrAppendToPuma(li);
				puma(UtilityManager.createIcon(iconClass)).vrAppendToPuma(divIcon);
				puma(divIcon).click((e: any) =>
				{
					puma(e.currentTarget).children("i").removeClass(IconClassicLight.CaretRight + " " + IconClassicLight.CaretDown);
					puma(e.currentTarget).removeClass("caret-right caret-down");

					let ulChildren = puma(e.currentTarget).siblings(".vrComboBoxUl");
					if (ulChildren.first().is(":visible"))
					{
						ulChildren.hide();
						puma(e.currentTarget).children("i").addClass(IconClassicLight.CaretRight);
						puma(e.currentTarget).addClass("caret-right");
					}
					else
					{
						ulChildren.show();
						puma(e.currentTarget).children("i").addClass(IconClassicLight.CaretDown);
						puma(e.currentTarget).addClass("caret-down");
					}
				});
				//#endregion
			}

			let comboItem = puma("<div class='vrComboBoxDivItemContainer'></div>").vrAppendToPuma(li);

			let rowText = item.text.replace(/'/g, "&#39;");
			if (options.comboSettings != null && options.comboSettings.template != null)
			{
				let templateEvent: any = {};
				templateEvent.dataItem = item;
				templateEvent.element = comboItem[0];
				templateEvent.sender = this;
				rowText = options.comboSettings.template(templateEvent);
			}

			let comboItemText = puma("<span title='" + item.text + "' text='" + item.text.replace(/'/g, "&#39;") + "' class='vrComboBoxItemText'>" + rowText + "</span>").vrAppendToPuma(comboItem);
			puma(comboItemText).click((e: any) =>
			{
				let value = this._dictionaryLiValue.get(puma(e.currentTarget).closest("li")[0]);
				let item = this.comboItems().filter(k => k.value == value)[0];
				if (item != null && !this.getRootValues().includes(String(item.value)))
				{
					this.valueCombo(String(item.value));
					this.close();
				}
				else
					UtilityManager.interval(() => puma(this.element()).toggleClass("errorInput"), 200, 800);
			});

			if (children.length > 0)
				this.drawItems(this.getOnlyChildrenItems(item), li);
		}
	}

	private valueCombo(value: string | null)
	{
		if (value === null)
		{
			this.clear();
			return;
		}

		let comboItemToSelect: ComboBoxItem = this.comboItems().filter(k => k.value == value)[0];
		this._txtInput.value(comboItemToSelect.text, false)
		this.manageInput(this._txtInput, this._txtInput.value(), String(comboItemToSelect.value))
	}

	private filter(text: string, element: HTMLElement)
	{
		let options = this.getOptions();
		let selectionStart = (element as HTMLInputElement).selectionStart;
		let selectionEnd = (element as HTMLInputElement).selectionEnd;
		let itemsToReturn: ComboBoxItem[] = [];

		if (text == "")
		{
			puma(this._popup).find("li").show();
			if (options.comboSettings!.webService != null)
			{
				this._items = [];
				puma(this._popup).find(".vrComboBoxUl").remove();
			}
		}
		else if (!(selectionStart == 0 && selectionEnd == (element as HTMLInputElement).value.length))
		{
			puma(this._popup).find("li").hide();

			let items = this.getFilteredArrayByInputText(text);
			itemsToReturn = items;

			let values = items.map(k => k.value);
			let texts = items.map(k => k.text);

			for (let item of items)
			{
				let parentValue = item.parentValue;
				while (parentValue != null)
				{
					let parentItem = this.comboItems().filter(k => k.value == parentValue)[0];
					if (!values.includes(parentValue))
					{
						values.push(parentValue);
						texts.push(parentItem.text);
					}
					parentValue = (parentItem != null) ? parentItem.parentValue : undefined;
					if (parentValue == parentItem.value)
						parentValue = undefined;
				}
			}

			for (let comboItemText of Array.from<HTMLSpanElement>(puma(this._popup).find(".vrComboBoxItemText")))
			{
				if (texts.includes(String(puma(comboItemText).attr("text")).trim()))
				{
					puma(comboItemText).closest(".vrComboBoxLi").show();
					puma(comboItemText).closest(".vrComboBoxLi").closest(".vrComboBoxUl").show();

					puma(comboItemText).closest(".vrComboBoxLi").find(".vrComboBoxDivIconExpand").removeClass("caret-right caret-down");
					puma(comboItemText).closest(".vrComboBoxLi").find(".vrComboBoxDivIconExpand").children("i").removeClass(IconClassicLight.CaretRight + " " + IconClassicLight.CaretDown);
					puma(comboItemText).closest(".vrComboBoxLi").find(".vrComboBoxDivIconExpand").addClass("caret-down");
					puma(comboItemText).closest(".vrComboBoxLi").find(".vrComboBoxDivIconExpand").children("i").addClass(IconClassicLight.CaretDown);
				}
			}
		}
		return itemsToReturn;
	}

	private getFilteredArrayByInputText(value: string): ComboBoxItem[]
	{
		value = value.toLowerCase();
		let filteredArray: ComboBoxItem[] = [];
		let arrayWhereSearch = this.comboItems().map(k => String(k.text).toLowerCase());
		arrayWhereSearch!.forEach((k, index) => 
		{
			if (k.indexOf(value) != -1)
				filteredArray.push(this.comboItems()[index]);
		});
		return filteredArray;
	}
	//#endregion

	getOptions()
	{
		return this.options<AutoCompleteBoxOptions>();
	}
}

//#region Classes
class AutoCompleteBoxEvent extends VrControlsEvent
{
	sender: AutoCompleteBox;
}

class AutoCompleteBoxItemClickEvent extends AutoCompleteBoxEvent
{
	item: AutoCompleteBoxItemInfo;
	text: string;
}

class AutoCompleteBoxItemAddedEvent extends AutoCompleteBoxEvent
{
	item: AutoCompleteBoxItemInfo;
}

class AutoCompleteBoxItemRemovedEvent extends AutoCompleteBoxEvent
{
	item: AutoCompleteBoxItemInfo;
}

class AutoCompleteBoxItemInfo
{
	item: AutoCompleteBoxItem;
	element: HTMLElement;
}

class AutoCompleteBoxFocusEvent extends AutoCompleteBoxEvent
{
	sender: AutoCompleteBox;
	element: HTMLElement;
}

class AutoCompleteBoxBlurEvent extends AutoCompleteBoxEvent
{
	sender: AutoCompleteBox;
	element: HTMLElement;
}
//#endregion