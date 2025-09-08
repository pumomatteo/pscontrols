import { VrControl, VrControlOptions, VrControlsEvent } from "../common.js";
import { ComboBoxTypeEnum, ComboBoxTreeModeEnum, TextAlignEnum, ControlTypeEnum, puma, IconClassicLight, PositionEnum, IconClassicRegular, createButton, icon, IconClassicSolid, KeyEnum, isMobile, createCheckBox, ControlPositionEnum, createTextBox, ComboBoxTemplateEvent, ComboBoxItem, SortDirectionEnum, ComboBoxChangingEvent, ComboBoxChangeEvent, CheckboxStateEnum, ComboBoxClearEvent, WebApiModeEnum, shadowRoot } from "../vr.js";
import { UtilityManager } from "../../managers/utilityManager.js";
import { ButtonOptions } from "./button.js";
class ComboBoxOptions extends VrControlOptions {
  mode;
  checkboxes;
  freeText;
  filter;
  treeMode;
  value;
  webService;
  items;
  clearButton;
  addButton;
  nullable;
  textAlign;
  placeholder;
  popupSettings;
  allSelectedMessage;
  textEllipsis;
  noBr;
  onlyIcon;
  icon;
  imageUrl;
  checkAll;
  showCheckAll;
  tooltip;
  template;
}
class ComboBox extends VrControl {
  _items;
  _popup;
  _isDivElement;
  _value;
  _tempValueWebService;
  _txtSearchFilter;
  _chkCheckAll;
  _typedTextWebService;
  _isChecked;
  _tempCheckedValue;
  _openPopupAfterFocus;
  _btnCombo;
  _divPickerIcon;
  _allCheckedOnlyIcon;
  _iconCombo;
  _dictionaryValueLi;
  _checkedValues;
  _openedValue;
  _lastAjaxCallGuid;
  _focusWithArrows;
  _callbackAfterValue;
  constructor(element, options) {
    if (options == null)
      options = new ComboBoxOptions();
    if (options.mode == null) options.mode = ComboBoxTypeEnum.Combo;
    if (options.treeMode == null) options.treeMode = ComboBoxTreeModeEnum.AllExpanded;
    if (options.freeText == null) options.freeText = false;
    if (options.checkboxes == null) options.checkboxes = false;
    if (options.filter == null) options.filter = true;
    if (options.clearButton == null) options.clearButton = false;
    if (options.addButton == null) options.addButton = false;
    if (options.textAlign == null) options.textAlign = TextAlignEnum.Left;
    if (options.textEllipsis == null) options.textEllipsis = false;
    if (options.checkAll == null) options.checkAll = false;
    if (options.noBr == null) options.noBr = true;
    if (options.showCheckAll == null && options.checkboxes == true) options.showCheckAll = true;
    if (options.showCheckAll != null && typeof options.showCheckAll != "boolean") {
      if (options.showCheckAll.triggerChange == null) options.showCheckAll.triggerChange = true;
    }
    if (options.popupSettings == null)
      options.popupSettings = { maxHeight: 200, maxWidth: 500 };
    else if (options.popupSettings.maxHeight == null && options.popupSettings.height == null)
      options.popupSettings.maxHeight = 200;
    else if (options.popupSettings.maxWidth == null && options.popupSettings.width == null)
      options.popupSettings.maxWidth = 500;
    if (options.mode == ComboBoxTypeEnum.DropDown) {
      options.checkboxes = false;
      options.freeText = false;
      options.placeholder = void 0;
    }
    if (options.webService != null || options.freeText) {
      options.mode = ComboBoxTypeEnum.Combo;
      options.checkboxes = false;
      options.filter = false;
      if (options.webService != null) {
        options.items = void 0;
        if (options.webService.searchAfterCharsNumber == null) options.webService.searchAfterCharsNumber = 3;
      }
    }
    if (options.mode == ComboBoxTypeEnum.Combo && !options.checkboxes)
      options.filter = false;
    if (options.checkboxes === true) {
      options.mode = ComboBoxTypeEnum.Combo;
      options.nullable = false;
    }
    if (options.onlyIcon == null) options.onlyIcon = false;
    if (options.width == null) options.width = options.onlyIcon ? 40 : 200;
    super(element, options, ControlTypeEnum.ComboBox);
    puma(element).attr("type", "text");
    puma(element).attr("autocomplete", "off");
    this._isDivElement = puma(this.element()).is("div");
    this._checkedValues = [];
    this._openPopupAfterFocus = true;
    this.items(options.items != null ? options.items : [], false);
    switch (options.mode) {
      case ComboBoxTypeEnum.Combo:
        puma(this.element()).addClass("vrComboBox");
        break;
      case ComboBoxTypeEnum.DropDown:
        puma(this.element()).addClass("vrComboBoxDropDown");
        break;
    }
    if (options.mode == ComboBoxTypeEnum.Combo) {
      if (this._isDivElement)
        puma(this.element()).addClass("vrComboBoxCheckbox");
      else {
        puma(this.element()).addClass("vrComboBox");
        if (options.placeholder != null)
          this.element().placeholder = options.placeholder;
      }
    }
    if (options.mode == ComboBoxTypeEnum.DropDown || options.checkboxes) {
      if (!this._isDivElement)
        throw Error("L'element html deve essere un div");
    } else if (this._isDivElement)
      throw Error("L'element html deve essere un input");
    if (options.tooltip != null)
      puma(this.element()).attr("title", options.tooltip);
    let pickerIcon = UtilityManager.createIcon(IconClassicLight.CaretDown);
    let classPickerIcon = "vrDivPickerIconComboBox";
    if (this._isDivElement)
      classPickerIcon = "vrDivPickerIconComboBoxDropDown";
    this._divPickerIcon = puma("<div class='" + classPickerIcon + "'></div>").vrAppendToPuma(this.container())[0];
    puma(this._divPickerIcon).vrAppendPuma(pickerIcon);
    puma(this._divPickerIcon).click(() => {
      if (puma(".comboBox_divPopup").is(":visible"))
        this.close();
      else {
        this.open();
        this.focus();
      }
    });
    puma(this._divPickerIcon).on("mouseenter", (e) => puma(this.element()).addClass("hoverClass"));
    puma(this._divPickerIcon).on("mouseleave", (e) => puma(this.element()).removeClass("hoverClass"));
    if (options.label != null && options.labelSettings.position == PositionEnum.Top)
      this._divPickerIcon.style.cssText += "bottom: 1px; top: inherit;";
    let clearIcon = UtilityManager.createIcon(IconClassicRegular.Xmark);
    let divClearIcon = puma("<div class='vrDivComboBoxClearIcon' style='display: none;'></div>").vrAppendToPuma(this.container())[0];
    if (options.addButton !== false)
      divClearIcon.style.cssText += "right: 57px;";
    puma(divClearIcon).vrAppendPuma(clearIcon);
    puma(divClearIcon).click((e) => {
      if (this.enabled())
        this.clear(true);
    });
    if (options.addButton !== false) {
      if (options.addButton === true) options.addButton = new ButtonOptions();
      if (options.addButton.icon == null) options.addButton.icon = IconClassicLight.Plus;
      options.addButton.cssContainer = options.addButton.cssContainer + "; position: absolute; right: 0px; bottom: 0px;";
      options.addButton.css = options.addButton.css + "; border-top-left-radius: 0px; border-bottom-left-radius: 0px; height: 26px;";
      if (options.addButton.enable == null) options.addButton.enable = options.enable;
      this._btnCombo = createButton(options.addButton, this.container());
      if (options.addButton.visible !== false)
        this._divPickerIcon.classList.add("vrComboDivPickerWithButton");
    }
    if (options.value != null)
      this.value(options.value, false);
    switch (options.textAlign) {
      case TextAlignEnum.Left:
        this.element().style.cssText += "text-align: left;";
        break;
      case TextAlignEnum.Center:
        this.element().style.cssText += "text-align: center;";
        break;
      case TextAlignEnum.Right:
        this.element().style.cssText += "text-align: right;";
        break;
    }
    this._iconCombo = null;
    if (options.icon != null && options.icon != "") {
      let style = "";
      if (this.options().label == null)
        style = "margin-left: 6px; margin-top: -1px;";
      else {
        let labelWidth = puma(this.container()).find(".vrLabel").width();
        if (options.labelSettings != null && options.labelSettings.width != null)
          labelWidth = options.labelSettings.width;
        if (this.options().labelSettings.position == PositionEnum.Left || this.options().labelSettings.position == PositionEnum.Right)
          style = "margin-left: " + (labelWidth + 10) + "px; margin-top: -1px;";
        else
          style = "left: 6px; bottom: 6px;";
      }
      this._iconCombo = puma("<i class='" + options.icon + "' style='cursor: pointer; font-size: 14px; position: absolute;" + style + "'></i>")[0];
      puma(this.element()).vrBeforePuma(this._iconCombo);
      this.element().style.cssText += "text-indent: 18px;";
      if (options.tooltip != null)
        puma(this._iconCombo).attr("title", options.tooltip);
      puma(this._iconCombo).click(() => {
        if (puma(".comboBox_divPopup").is(":visible"))
          this.close();
        else {
          this.open();
          this.focus();
        }
      });
      puma(this._iconCombo).on("mouseenter", (e) => puma(this.element()).addClass("hoverClass"));
      puma(this._iconCombo).on("mouseleave", (e) => puma(this.element()).removeClass("hoverClass"));
    } else if (options.imageUrl != null && options.imageUrl != "")
      this.element().style.cssText += "background-image: url(" + options.imageUrl + "); background-position: 4px 5px; background-repeat: no-repeat; text-indent: 13px;";
    if (options.onlyIcon && options.icon != null && options.icon != "")
      this._allCheckedOnlyIcon = icon(IconClassicSolid.Check, this._iconCombo, { css: "display: none; position: absolute; z-index: 2; font-size: 9px; top: -5px; right: -7px;" });
    if (options.checkAll)
      this.checkAll(false);
    if (options.mode == ComboBoxTypeEnum.Combo) {
      puma(this.element()).keydown((e) => {
        this.open();
        if (options.onKeyDown != null) {
          let onKeyDownEvent = new ComboBoxKeyDownEvent();
          onKeyDownEvent.sender = this;
          onKeyDownEvent.event = e;
          options.onKeyDown(onKeyDownEvent);
          if (onKeyDownEvent.isDefaultPrevented())
            return;
        }
        if (options.onEnterKey != null && e.key == KeyEnum.Enter) {
          let onEnterKeyEvent = new ComboBoxEnterKeyEvent();
          onEnterKeyEvent.sender = this;
          onEnterKeyEvent.value = this.value();
          options.onEnterKey(onEnterKeyEvent);
          if (onEnterKeyEvent.isDefaultPrevented())
            return;
        }
        if (e.key != KeyEnum.Tab)
          this.limitInputByDataSource(this.element(), e);
        let text = this.element().value;
        let selectionStart = this.element().selectionStart;
        let selectionEnd = this.element().selectionEnd;
        if (selectionEnd != null && selectionStart != null && selectionEnd - selectionStart == text.length && e.key == KeyEnum.Backspace) {
          this.value(null);
          this.change();
        } else if (e.key == KeyEnum.Backspace && text.length == 0)
          this.change();
      });
      let timeout = 0;
      puma(this.element()).keyup((e) => {
        this.open();
        if (e.key == KeyEnum.ArrowRight || e.key == KeyEnum.ArrowLeft || e.key == KeyEnum.Control || e.ctrlKey) {
          if (!(e.key == "v" && e.ctrlKey)) {
            e.preventDefault();
            return;
          }
        }
        if (options.onKeyUp != null) {
          let onKeyUpEvent = new ComboBoxKeyUpEvent();
          onKeyUpEvent.sender = this;
          onKeyUpEvent.event = e;
          options.onKeyUp(onKeyUpEvent);
          if (onKeyUpEvent.isDefaultPrevented())
            return;
        }
        if (e.key == KeyEnum.ArrowDown && !options.checkboxes) {
          let li = null;
          if (this.value() == null)
            li = puma(this._popup).find("li:visible").first();
          else
            li = puma(this._dictionaryValueLi.get(this.value())).next();
          li.focus();
          e.preventDefault();
          return;
        }
        if (e.key == KeyEnum.ArrowUp && !options.checkboxes) {
          let li = null;
          if (this.value() == null)
            li = puma(this._popup).find("li:visible").first();
          else
            li = puma(this._dictionaryValueLi.get(this.value())).prev();
          li.focus();
          e.preventDefault();
          return;
        }
        if (e.key == KeyEnum.Enter || e.key == KeyEnum.Tab || e.key == KeyEnum.Shift)
          return;
        else
          this._value = null;
        if (e.key != KeyEnum.Tab)
          this.limitInputByDataSource(this.element(), e);
        clearTimeout(timeout);
        timeout = window.setTimeout(() => {
          let text = this.element().value;
          if (options.webService == null) {
            let filteredItems = this.filter(text, this.element());
            if (e.key == "v" && e.ctrlKey && filteredItems.length == 1) {
              this.value(filteredItems[0].value);
              this.close();
            }
          } else {
            if (text == "") {
              this._items = [];
              puma(this._popup).find("ul").remove();
              return;
            } else {
              if (text.length < options.webService.searchAfterCharsNumber)
                return;
              let selectionStart = this.element().selectionStart;
              let selectionEnd = this.element().selectionEnd;
              if (!(selectionStart == 0 && selectionEnd == this.element().value.length))
                this.doAjaxCall(text);
            }
          }
        }, 300);
      });
      puma(this.element()).on("paste", (e) => {
        this.open();
        let pastedValue = e.originalEvent.clipboardData.getData("text");
        timeout = window.setTimeout(() => {
          if (options.onPaste != null) {
            let event = new ComboBoxPasteEvent();
            event.sender = this;
            event.pastedValue = pastedValue;
            event.value = this.value() + pastedValue;
            event.event = e;
            options.onPaste(event);
            if (event.isDefaultPrevented()) {
              e.preventDefault();
              return;
            }
          }
          let text = this.element().value;
          if (options.webService == null) {
            let filteredItems = this.filter(text, this.element());
            if (e.key == "v" && e.ctrlKey && filteredItems.length == 1) {
              this.value(filteredItems[0].value);
              this.close();
            }
          } else {
            if (text == "") {
              this._items = [];
              puma(this._popup).find("ul").remove();
              return;
            } else {
              let selectionStart = this.element().selectionStart;
              let selectionEnd = this.element().selectionEnd;
              if (!(selectionStart == 0 && selectionEnd == this.element().value.length))
                this.doAjaxCall(text);
            }
          }
        }, 300);
      });
    }
    if (!this._isDivElement) {
      puma(this.element()).focus((e) => {
        this.element().select();
        if (this._openPopupAfterFocus)
          this.open();
        this._openPopupAfterFocus = true;
        if (options.onFocus != null) {
          let blurEvent = new ComboBoxFocusEvent();
          blurEvent.sender = this;
          blurEvent.value = this.value();
          options.onFocus(blurEvent);
        }
      });
      puma(this.element()).blur((e) => window.setTimeout(() => {
        if (this.value() == null && puma(this._popup).find(".keydownFocus").length == 0)
          this.filter("", this.element());
        if (this._popup != null && !this._focusWithArrows)
          this.close();
        if (options.onBlur != null) {
          let blurEvent = new ComboBoxBlurEvent();
          blurEvent.sender = this;
          blurEvent.value = this.value();
          options.onBlur(blurEvent);
        }
      }, 200));
    } else
      puma(this.element()).click((e) => {
        puma(this._popup).is(":visible") ? this.close() : this.open();
      });
    if (!isMobile()) {
      let baseListener = shadowRoot() != null ? shadowRoot() : document;
      baseListener.addEventListener("scroll", (e) => {
        if (!puma(e.target).hasClass("comboBox_divPopup") && puma(this._popup).is(":visible")) {
          this.blur();
          this.close();
        }
      }, true);
    }
  }
  //#region Methods
  close() {
    let options = this.getOptions();
    puma(this._popup).remove();
    this._popup = null;
    this._focusWithArrows = false;
    this._dictionaryValueLi = /* @__PURE__ */ new Map();
    if (this._isDivElement)
      puma("#vrComboBoxBackground_" + this.element().id).remove();
    if (options.onClose != null) {
      let closeEvent = new ComboBoxCloseEvent();
      closeEvent.sender = this;
      closeEvent.beforeValue = this._openedValue;
      closeEvent.afterValue = this.value();
      options.onClose(closeEvent);
    }
    if (options.mode == ComboBoxTypeEnum.Combo && this._value == null) {
      if (options.freeText)
        this.valueInternal(this.element().value);
      else
        this.element().value = "";
    }
  }
  open() {
    let options = this.getOptions();
    if (!this.enabled())
      return;
    if (puma(this._popup).is(":visible"))
      return;
    if (options.onBeforeOpen != null) {
      let beforeOpenEvent = new ComboBoxOpenEvent();
      beforeOpenEvent.sender = this;
      beforeOpenEvent.value = this.value();
      options.onBeforeOpen(beforeOpenEvent);
      if (beforeOpenEvent.isDefaultPrevented())
        return;
    }
    if (this._popup == null)
      this._popup = puma("<div class='comboBox_divPopup vrPopup' id='" + this.element().id + "_divPopup'></div>").vrAppendToPuma(shadowRoot() != null ? shadowRoot() : document.body)[0];
    if (this.getRootItems().length == 0)
      puma(this._popup).addClass("vrComboBoxFlat");
    else
      puma(this._popup).removeClass("vrComboBoxFlat");
    window.setTimeout(() => {
      this.drawDataSource();
      if (this._isDivElement) {
        let zIndex = puma(this._popup).css("z-index") - 1;
        let background = puma("<div class='vrWindowBackground' id='vrComboBoxBackground_" + this.element().id + "' style='background-color: transparent; display: block; z-index: " + zIndex + ";'></div>").vrAppendToPuma(shadowRoot() != null ? shadowRoot() : document.body)[0];
        puma(background).click((e) => this.close());
      }
      let minWidth = puma(this.element()).outerWidth();
      if (options.popupSettings.width != null && minWidth > options.popupSettings.width)
        minWidth = options.popupSettings.width;
      if (options.popupSettings.minWidth != null)
        minWidth = options.popupSettings.minWidth;
      if (minWidth < 100)
        minWidth = 100;
      if (options.popupSettings != null)
        options.popupSettings.minWidth = minWidth;
      else
        this._popup.style.cssText += "min-width: " + minWidth + "px;";
      super.settingPopup(this._popup, options.popupSettings);
      if (options.showCheckAll) {
        this._chkCheckAll = createCheckBox(
          {
            addToControlList: false,
            text: "Seleziona tutti...",
            width: "100%",
            cssContainer: "padding-bottom: 5px; margin-bottom: 5px; border-bottom: solid 1px #d0d0d0;",
            class: "vrComboBoxSelectAll",
            enable: options.enable,
            onCheck: (e) => {
              let triggerChange = true;
              if (typeof options.showCheckAll == "boolean")
                triggerChange = options.showCheckAll;
              else
                triggerChange = options.showCheckAll.triggerChange;
              if (e.checked)
                this.checkAll(triggerChange);
              else
                this.unCheckAll(triggerChange);
            }
          },
          this._popup,
          ControlPositionEnum.Before
        );
      }
      if (options.filter === true && puma(this._popup).find(".vrComboBoxFilter").length == 0) {
        let timeout = 0;
        this._txtSearchFilter = createTextBox(
          {
            width: "100%",
            icon: IconClassicLight.Search,
            placeholder: "Cerca...",
            class: "vrComboBoxFilter",
            cssContainer: "margin-bottom: 5px; margin-top: 5px;",
            onKeyDown: (e) => {
              this.limitInputByDataSource(e.sender.element(), e);
            },
            onKeyUp: (e) => {
              this.limitInputByDataSource(e.sender.element(), e);
              clearTimeout(timeout);
              timeout = window.setTimeout(() => {
                let text = e.sender.value();
                this.filter(text, this._txtSearchFilter.element());
              }, 100);
            }
          },
          this._popup,
          ControlPositionEnum.Before
        );
      }
      if (this._txtSearchFilter != null)
        puma(this._txtSearchFilter.element()).focus();
      if (options.webService == null)
        this.value(this.value(), false);
      this._openedValue = this.value();
      if (!options.checkboxes) {
        let liValue = this._dictionaryValueLi.get(this.value());
        if (liValue != null) {
          puma(liValue).addClass("vrComboBoxSelectedComboValue");
          let topPosition = puma(liValue).offset().top - puma(this._popup).offset().top - puma(this._popup).height() / 2;
          if (topPosition < 0) topPosition = 0;
          this._popup.scrollTo(0, topPosition);
        }
      }
      if (options.onAfterOpen != null) {
        let afterOpenEvent = new ComboBoxOpenEvent();
        afterOpenEvent.sender = this;
        afterOpenEvent.value = this._openedValue;
        options.onAfterOpen(afterOpenEvent);
      }
    });
  }
  limitInputByDataSource(element, e) {
    let options = this.getOptions();
    if (options.webService != null || options.freeText === true)
      return;
    let filtered = this.getFilteredArrayByInputText(element.value);
    if (filtered.length == 0) {
      let newText = element.value;
      element.value = newText.substring(0, newText.length - 1);
      e.preventDefault();
      return;
    }
  }
  filter(text, element) {
    let selectionStart = element.selectionStart;
    let selectionEnd = element.selectionEnd;
    let itemsToReturn = [];
    if (text == "" || text == null) {
      puma(this._popup).find("li").show();
      if (this.getOptions().webService != null) {
        this._items = [];
        puma(this._popup).find(".vrComboBoxUl").remove();
      }
    } else if (!(selectionStart == 0 && selectionEnd == element.value.length)) {
      puma(this._popup).find("li").hide();
      let items = this.getFilteredArrayByInputText(text);
      itemsToReturn = items;
      let values = items.map((k) => k.value);
      let texts = items.map((k) => UtilityManager.htmlDecode(k.text));
      for (let item of items) {
        let parentValue = item.parentValue;
        while (parentValue != null) {
          let parentItem = this.items().filter((k) => k.value == parentValue)[0];
          if (!values.includes(parentValue)) {
            values.push(parentValue);
            texts.push(UtilityManager.htmlDecode(parentItem.text));
          }
          parentValue = parentItem != null ? parentItem.parentValue : void 0;
          if (parentValue == parentItem.value)
            parentValue = void 0;
        }
      }
      for (let comboItemText of Array.from(puma(this._popup).find(".vrComboBoxItemText"))) {
        if (texts.includes(String(puma(comboItemText).attr("text")).trim())) {
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
  drawDataSource(searchedText) {
    puma(this._popup).find(".vrComboBoxUl").remove();
    let items = this.items();
    if (searchedText != null)
      items = this.getFilteredArrayByInputText(searchedText);
    if (items.length == 1 && items[0] == null)
      return;
    this._dictionaryValueLi = /* @__PURE__ */ new Map();
    items = items.filter((k) => k.parentValue == null);
    if (this._popup != null)
      this.drawItems(items, this._popup);
  }
  drawItems(items, elementToAppend) {
    let options = this.getOptions();
    if (items.length == 0)
      return;
    let ul = puma("<ul class='vrComboBoxUl'></ul>").vrAppendToPuma(elementToAppend);
    for (let item of items) {
      if (item.value == null)
        item.value = item.text;
      let children = this.getOnlyChildrenItems(item);
      let li = puma("<li class='vrComboBoxLi' tabindex='-1'></li>").vrAppendToPuma(ul);
      if (this._dictionaryValueLi.has(String(item.value))) {
        let actualLiList = this._dictionaryValueLi.get(String(item.value));
        actualLiList.push(li[0]);
        this._dictionaryValueLi.set(String(item.value), actualLiList);
      } else
        this._dictionaryValueLi.set(String(item.value), [li[0]]);
      if (!options.checkboxes) {
        puma(li).on("focusin", (e) => {
          this._focusWithArrows = true;
          puma(this._popup).find(".vrComboBoxSelectedComboValue").removeClass("vrComboBoxSelectedComboValue");
          if (children.length == 0)
            puma(e.target).addClass("vrComboBoxSelectedComboValue keydownFocus");
        });
        puma(li).on("keydown", (e) => {
          if (e.key == KeyEnum.ArrowDown) {
            let next = puma(e.currentTarget).next();
            if (next.length == 0)
              return;
            puma(this._popup).find(".vrComboBoxSelectedComboValue").removeClass("vrComboBoxSelectedComboValue");
            while (!next.is(":visible"))
              next = puma(next).next();
            next.focus();
          } else if (e.key == KeyEnum.ArrowUp) {
            let prev = puma(e.currentTarget).prev();
            if (prev.length == 0)
              return;
            puma(this._popup).find(".vrComboBoxSelectedComboValue").removeClass("vrComboBoxSelectedComboValue");
            while (!prev.is(":visible"))
              prev = puma(prev).prev();
            prev.focus();
          } else if (e.key == KeyEnum.Enter)
            puma(e.currentTarget).find(".vrComboBoxItemText").mousedown();
        });
      }
      if (options.treeMode == ComboBoxTreeModeEnum.AllCollapsed) {
        if (item.parentValue != null)
          puma(li).closest(".vrComboBoxUl").hide();
      } else if (options.treeMode == ComboBoxTreeModeEnum.OnlyFirstLevelExpanded) {
        if (puma(li).parents(".vrComboBoxUl").length > 2)
          puma(li).closest(".vrComboBoxUl").hide();
      }
      if (children.length > 0) {
        let iconClassForDiv = "";
        let iconClass = IconClassicLight.CaretRight;
        if (options.treeMode == ComboBoxTreeModeEnum.AllCollapsed) {
          iconClass = IconClassicLight.CaretRight;
          iconClassForDiv = "caret-right";
        } else if (options.treeMode == ComboBoxTreeModeEnum.OnlyFirstLevelExpanded) {
          if (puma(li).parents(".vrComboBoxUl").length == 1) {
            iconClass = IconClassicLight.CaretDown;
            iconClassForDiv = "caret-down";
          } else {
            iconClass = IconClassicLight.CaretRight;
            iconClassForDiv = "caret-right";
          }
        } else {
          iconClass = IconClassicLight.CaretDown;
          iconClassForDiv = "caret-down";
        }
        let divIcon = puma("<div class='vrComboBoxDivIconExpand " + iconClassForDiv + "'></div>").vrAppendToPuma(li);
        puma(UtilityManager.createIcon(iconClass)).vrAppendToPuma(divIcon);
        puma(divIcon).click((e) => {
          puma(e.currentTarget).children("i").removeClass(IconClassicLight.CaretRight + " " + IconClassicLight.CaretDown);
          puma(e.currentTarget).removeClass("caret-right caret-down");
          let ulChildren = puma(e.currentTarget).siblings(".vrComboBoxUl");
          if (ulChildren.first().is(":visible")) {
            ulChildren.hide();
            puma(e.currentTarget).children("i").addClass(IconClassicLight.CaretRight);
            puma(e.currentTarget).addClass("caret-right");
          } else {
            ulChildren.show();
            puma(e.currentTarget).children("i").addClass(IconClassicLight.CaretDown);
            puma(e.currentTarget).addClass("caret-down");
          }
        });
      }
      let comboItem = puma("<div class='vrComboBoxDivItemContainer'></div>").vrAppendToPuma(li);
      if (options.checkboxes) {
        let checkBox = puma("<input type='checkbox' class='vrCheckBox'></input>").vrAppendToPuma(comboItem);
        puma(checkBox).click((e) => {
          let isChecked = e.currentTarget.checked;
          let value = item.value;
          if (isChecked)
            this._checkedValues.push(value);
          else
            this._checkedValues.vrDelete(value);
          let targetItem = this.items().filter((k) => k.value == value)[0];
          if (targetItem != null && this.getOnlyChildrenItems(targetItem).length > 0) {
            let childrenItems = this.getAllChildrenItems(targetItem);
            if (e.currentTarget.checked)
              this._checkedValues.vrPushRange(childrenItems.map((k) => k.value));
            let childrenCheckboxes = this.getChildrenCheckboxElements(targetItem, false);
            puma(childrenCheckboxes).prop("checked", e.currentTarget.checked);
            for (let childItem of childrenItems) {
              if (!e.currentTarget.checked)
                this._checkedValues.vrDelete(childItem.value);
            }
          }
          this._isChecked = e.currentTarget.checked;
          if (!this._isChecked)
            this._checkedValues.vrDelete(item.value);
          let comboItemTexts = [];
          let liList = this._dictionaryValueLi.get(String(item.value));
          for (let li2 of liList) {
            let comboItemText2 = puma(li2).find(".vrComboBoxItemText")[0];
            comboItemTexts.push(comboItemText2);
          }
          for (let comboItemText2 of comboItemTexts) {
            if (comboItemText2 == null)
              continue;
            let checkBox2 = puma(comboItemText2).siblings("input");
            puma(checkBox2).removeClass("indeterminateVrCheckbox");
            puma(checkBox2).prop("checked", this._isChecked);
            checkBox2[0].checked = this._isChecked;
          }
          for (let otherItem of this.items().filter((k) => k.value == item.value)) {
            let parentChecked2 = this.manageCheckParent(otherItem);
            if (!parentChecked2 && otherItem.parentValue != null)
              this._checkedValues.vrDelete(otherItem.parentValue);
            else if (parentChecked2 && otherItem.parentValue != null && !this._checkedValues.includes(String(otherItem.parentValue)))
              this._checkedValues.push(String(otherItem.parentValue));
          }
          let parentChecked = this.manageCheckParent(item);
          if (!parentChecked && item.parentValue != null)
            this._checkedValues.vrDelete(item.parentValue);
          else if (parentChecked && item.parentValue != null && !this._checkedValues.includes(String(item.parentValue)))
            this._checkedValues.push(String(item.parentValue));
          this._tempCheckedValue = String(item.value);
          this._checkedValues = this._checkedValues.vrDistinct();
          this.valueInternal(this._checkedValues);
          this._tempCheckedValue = null;
        });
      }
      let rowText = "";
      if (item.icon != null && item.icon != "")
        rowText = "<i class='" + item.icon + "'></i> ";
      rowText += item.text.replace(/'/g, "&#39;");
      if (options.template != null) {
        let templateEvent = new ComboBoxTemplateEvent();
        templateEvent.dataItem = item;
        templateEvent.element = comboItem[0];
        templateEvent.sender = this;
        rowText = options.template(templateEvent);
      }
      if (item.backgroundColor != null)
        li[0].style.cssText += "background-color: " + item.backgroundColor + ";";
      let classIfCheckbox = options.checkboxes ? "vrComboBoxItemTextCheckbox" : "";
      let classIfNoBr = options.noBr ? "" : "vrComboBoxItemTextBr";
      let styleIfTextColor = item.textColor != null ? "color: " + item.textColor + ";" : "";
      if (item.whiteFont)
        styleIfTextColor = "color: #FFF;";
      let comboItemText = puma("<span title='" + item.text + "' text='" + item.text.replace(/'/g, "&#39;") + "' class='vrComboBoxItemText " + classIfCheckbox + " " + classIfNoBr + "' style=' " + styleIfTextColor + "'>" + rowText + "</span>").vrAppendToPuma(comboItem);
      puma(comboItemText).on("mousedown", (e) => {
        let value = item.value;
        let item2 = this.items().filter((k) => k.value == value)[0];
        if (item2 != null && !this.getRootValues().includes(String(item2.value))) {
          if (!options.checkboxes) {
            this.valueInternal(item2.value);
            this.close();
          } else
            puma(e.currentTarget).siblings(".vrCheckBox").click();
        } else
          UtilityManager.interval(() => puma(this.element()).toggleClass("errorInput"), 200, 800);
      });
      if (options.onItemDataBound != null) {
        let event = new ComboBoxItemDataBoundEvent();
        event.sender = this;
        event.element = comboItemText[0];
        event.dataItem = item;
        options.onItemDataBound(event);
      }
      if (children.length > 0)
        this.drawItems(children, li);
    }
  }
  getFilteredArrayByInputText(value) {
    value = value.toLowerCase();
    let filteredArray = [];
    let arrayWhereSearch = this.items().map((k) => String(k.text).toLowerCase());
    arrayWhereSearch.forEach((k, index) => {
      if (k.indexOf(value) != -1)
        filteredArray.push(this.items()[index]);
    });
    return filteredArray;
  }
  //#region Items
  datasource(items, triggerChange = true) {
    return this.items(items, triggerChange);
  }
  items(items, triggerChange = true) {
    let options = this.getOptions();
    if (items != null) {
      let itemsGrouped = items.vrGroupBy((k) => k.parentValue);
      for (let key in itemsGrouped) {
        if (key == null || key == "null" || key == "undefined")
          continue;
        let parentExists = items.vrAny((k) => k.value == key);
        if (parentExists)
          continue;
        let fakeParent = new ComboBoxItem();
        fakeParent.text = "Non identificato";
        fakeParent.value = key;
        items.push(fakeParent);
      }
      items.forEach((k) => k.value = String(k.value));
      let realItems = UtilityManager.duplicate(items);
      if (options.nullable != null && options.nullable !== false) {
        let nullableItem = new ComboBoxItem();
        nullableItem.text = typeof options.nullable == "boolean" || options.nullable.text == null ? "Non selezionato" : options.nullable.text;
        nullableItem.value = typeof options.nullable == "boolean" ? "" : options.nullable.value != null ? options.nullable.value : "0";
        realItems.unshift(nullableItem);
      }
      this._items = realItems;
      if (options.webService == null) {
        this.drawDataSource();
        let checkedItemIdList = realItems.filter((k) => k.checked === true).map((k) => k.value);
        if (options.checkboxes === true && checkedItemIdList.length > 0)
          this.valueInternal(checkedItemIdList, triggerChange);
        else if (options.mode == ComboBoxTypeEnum.DropDown && this.items().vrFirst() != null)
          this.valueInternal(this.items().vrFirst().value, triggerChange);
      } else {
        if (this._typedTextWebService == null) this._items = [];
        this.drawDataSource();
        this._typedTextWebService = null;
      }
    }
    return this._items;
  }
  values() {
    return this.items().map((k) => k.value);
  }
  getCheckedItems(onlyChildren = false) {
    let items = this.items().filter((k) => this._checkedValues.includes(String(k.value)));
    if (onlyChildren) {
      let childrenValues = this.getChildrenValues();
      items = items.filter((k) => childrenValues.includes(String(k.value)));
    }
    return items.vrDistinctBy((k) => k.value);
  }
  getCheckedValues(onlyChildren = false) {
    let values = this._checkedValues.vrDistinct();
    if (onlyChildren) {
      let childrenValues = this.getChildrenValues();
      values = values.filter((k) => childrenValues.includes(k));
    }
    return values;
  }
  getSelectedItem() {
    return this.items().filter((k) => k.value != null && k.value == this.value())[0];
  }
  addItem(item, reloadCombo = true, triggerChange = true, sortBy) {
    this.items().push(item);
    if (sortBy != null) {
      if (sortBy.direction == null) sortBy.direction = SortDirectionEnum.Asc;
      this.items().vrSortBy([sortBy.field], sortBy.direction == SortDirectionEnum.Asc);
    }
    if (reloadCombo)
      this.items(this.items(), triggerChange);
  }
  addItems(items, reloadCombo = true, triggerChange = true) {
    for (let item of items)
      this.addItem(item, false);
    if (reloadCombo)
      this.items(this.items(), triggerChange);
  }
  removeItem(itemOrId, reloadCombo = true) {
    if (typeof itemOrId == "string" || typeof itemOrId == "number") {
      let foundedItem = this.items().filter((k) => k.value == itemOrId)[0];
      this.items().vrDelete(foundedItem);
    } else
      this.items().vrDelete(itemOrId);
    if (reloadCombo)
      this.items(this.items());
  }
  removeItems(items, reloadCombo = true) {
    for (let item of items)
      this.removeItem(item, false);
    if (reloadCombo)
      this.items(this.items());
  }
  getItemByValue(value) {
    return this.items().filter((k) => String(k.value).toLowerCase() == value.toLowerCase())[0];
  }
  getItemByText(text) {
    return this.items().filter((k) => k.text.toLowerCase() == text.toLowerCase())[0];
  }
  getElementsByValue(value) {
    let liValue = this._dictionaryValueLi.get(value);
    return liValue;
  }
  getRootItems() {
    let parentItems = [];
    for (let item of this.items()) {
      if (item == null)
        continue;
      let parentValue = item.parentValue;
      while (parentValue != null) {
        let parentItem = this.items().filter((k) => k.value == parentValue)[0];
        if (!parentItems.includes(parentItem))
          parentItems.push(parentItem);
        parentValue = parentItem != null ? parentItem.parentValue : void 0;
        if (parentItem != null && parentValue == parentItem.value)
          parentValue = void 0;
      }
    }
    return parentItems;
  }
  getRootValues() {
    return this.getRootItems().filter((k) => k != null).map((k) => String(k.value));
  }
  getRootTexts() {
    return this.getRootItems().map((k) => k.text);
  }
  getLeafItems() {
    let rootValues = this.getRootValues();
    return this.items().filter((k) => !rootValues.includes(String(k.value)));
  }
  getLeafValues() {
    return this.getLeafItems().map((k) => String(k.value));
  }
  getLeafTexts() {
    return this.getLeafItems().map((k) => k.text);
  }
  getChildrenItems() {
    return this.getLeafItems();
  }
  getChildrenValues() {
    return this.getLeafValues();
  }
  getChildrenTexts() {
    return this.getLeafTexts();
  }
  getOnlyChildrenItems(parentItem) {
    return this.items().filter((k) => k.parentValue != null && k.parentValue == parentItem.value);
  }
  getAllChildrenItems(parentItem) {
    return this.getDataChildrenItems(parentItem);
  }
  getAllChildrenValues(parentItem) {
    return this.getAllChildrenItems(parentItem).map((k) => String(k.value));
  }
  getDataChildrenItems(parentItem) {
    let dataItems = parentItem == null ? this.items() : this.getOnlyChildrenItems(parentItem);
    let items = [];
    for (let dataElement of dataItems) {
      items.push(dataElement);
      if (this.getOnlyChildrenItems(dataElement).length > 0)
        items.vrPushRange(this.getDataChildrenItems(dataElement));
    }
    return items;
  }
  getChildrenCheckboxElements(parentItem, checked = false, arrayMode = false) {
    let liParent = this._dictionaryValueLi.get(String(parentItem.value));
    let parentComboItemText = puma(liParent).find(".vrComboBoxItemText")[0];
    let parentCheckbox = puma(parentComboItemText).siblings("input");
    let childrenCheckboxElements = puma(parentCheckbox).parent().parent().find("input" + (checked ? ":checked" : ""));
    let sibling = puma(childrenCheckboxElements[0]).siblings(".vrComboBoxItemText")[0];
    if (sibling != null && parentItem.text != null) {
      if (puma(sibling).html().vrRemoveHtml() == parentItem.text.vrRemoveHtml())
        childrenCheckboxElements.splice(0, 1);
    }
    if (arrayMode)
      childrenCheckboxElements = Array.from(childrenCheckboxElements);
    return childrenCheckboxElements;
  }
  getParentItem(childItem) {
    if (childItem.parentValue != null)
      return this.items().filter((k) => k.value == childItem.parentValue)[0];
    return null;
  }
  manageCheckParent(item) {
    let parentItem = this.getParentItem(item);
    if (parentItem != null) {
      let children = this.getChildrenCheckboxElements(parentItem, true, true);
      let tempCheckedElements = children.filter((k) => k != null && k.checked);
      let liParent = this._dictionaryValueLi.get(String(parentItem.value));
      let parentInputElement = puma(liParent).find("input")[0];
      if (parentInputElement != null) {
        puma(parentInputElement).removeClass("indeterminateVrCheckbox");
        parentInputElement.checked = false;
        if (this.getAllChildrenItems(parentItem).length == tempCheckedElements.length) {
          parentInputElement.checked = true;
          return true;
        } else if (tempCheckedElements.length == 0) {
          parentInputElement.checked = false;
          return false;
        } else {
          puma(parentInputElement).addClass("indeterminateVrCheckbox");
          return false;
        }
      }
    }
    return;
  }
  //#endregion
  //#region Text & Value
  text(text) {
    if (text != null) {
      if (!this._isDivElement)
        this.element().value = text;
      else
        puma(this.element()).find(".vrComboBoxSelectedValues")[0].innerHTML = text;
    }
    if (!this._isDivElement) {
      let value = this.element().value;
      let selectedItem = this.getSelectedItem();
      if (value == "" && selectedItem != null)
        value = selectedItem.text;
      if (value == null) value = "";
      return value;
    } else {
      if (puma(this.element()).find(".vrComboBoxSelectedValues")[0] != null) {
        let value = puma(this.element()).find(".vrComboBoxSelectedValues")[0].innerHTML;
        let selectedItem = this.getSelectedItem();
        if (value == "" && selectedItem != null)
          value = selectedItem.text;
        return value;
      } else
        return "";
    }
  }
  placeholder(text) {
    if (text != null)
      this.element().placeholder = text;
    return this.element().placeholder;
  }
  valueInternal(value, triggerChange = true) {
    let options = this.getOptions();
    options.fromInternal = "pumo";
    let val = this.value(value, triggerChange, this._callbackAfterValue);
    options.fromInternal = null;
    return val;
  }
  value(value, triggerChange = true, callback) {
    if (value === null) {
      this.clear();
      return null;
    }
    let options = this.getOptions();
    if (value != null) {
      this._callbackAfterValue = callback;
      if (typeof value == "number")
        value = String(value);
      if (options.fromInternal == null && options.checkboxes === true)
        this.clear();
      if (!options.checkboxes)
        puma(this._popup).find(".vrComboBoxSelectedComboValue").removeClass("vrComboBoxSelectedComboValue");
      if (typeof value == "string" || typeof value == "number") {
        value = [String(value)];
        if (options.webService != null && options.fromInternal == null)
          value = { value: String(value), text: "" };
      }
      let comboItem = null;
      if (Array.isArray(value)) {
        value = value.vrDistinct();
        value = value.vrToStringArrayList();
      } else {
        comboItem = new ComboBoxItem();
        comboItem.text = value.text;
        comboItem.value = value.value;
        value = [String(comboItem.value)];
      }
      if (value.length == 0)
        this.hideClearButton();
      else
        this.showClearButton();
      let prevValue = UtilityManager.duplicate(this._value);
      this._value = [];
      for (let singleValue of value) {
        let singleItem = this.items().filter((k) => k.value == singleValue)[0];
        if (singleItem != null)
          this._value.push(String(singleItem.value));
      }
      if (options.webService != null && comboItem != null) {
        this._tempValueWebService = [];
        this._tempValueWebService.push(String(comboItem.value));
        this._typedTextWebService = comboItem.text == null ? "" : comboItem.text;
        this.doAjaxCall(comboItem.text, true, triggerChange);
        return comboItem.value;
      }
      if (options.webService == null) {
        let values = this.values();
        value = value.filter((k) => values.includes(k));
      }
      this._checkedValues = value;
      if (triggerChange) {
        let changingEvent = new ComboBoxChangingEvent();
        if (options.onBeforeChange != null) {
          let isParent = this.getRootValues().includes(this._value[0]);
          let parentItem = null;
          if (isParent)
            parentItem = this.items().filter((k) => k.value == value)[0];
          changingEvent.sender = this;
          changingEvent.previousValue = prevValue;
          changingEvent.previousCheckedValues = prevValue;
          changingEvent.value = options.checkboxes === true ? this._checkedValues : this._value[0];
          changingEvent.text = this.text();
          changingEvent.childrenValues = isParent ? this.getAllChildrenValues(parentItem) : [];
          changingEvent.checked = this._isChecked;
          changingEvent.isParent = this.getRootValues().includes(this._value[0]);
          options.onBeforeChange(changingEvent);
        }
        if (!changingEvent.isDefaultPrevented()) {
          this.writeTextByValue(comboItem, value);
          this.change();
        } else {
          this._value = prevValue;
          this._callbackAfterValue = null;
        }
      } else {
        this.writeTextByValue(comboItem, value);
        if (value.length > 0)
          this.manageCallbackAfterValue();
      }
    }
    if (this._value == null)
      return null;
    else if (options.checkboxes === true)
      return this._value;
    else
      return this._value[0];
  }
  manageCallbackAfterValue() {
    let options = this.getOptions();
    if (this._callbackAfterValue != null) {
      let value = options.checkboxes && this._tempCheckedValue != null ? this._tempCheckedValue : this.value();
      let isParent = this.getRootValues().includes(value);
      let parentItem = null;
      if (isParent)
        parentItem = this.items().filter((k) => k.value == value)[0];
      let event = new ComboBoxChangeEvent();
      event.sender = this;
      event.value = value;
      event.text = this.text();
      event.childrenValues = isParent ? this.getAllChildrenValues(parentItem) : [];
      event.selectedItem = this.getSelectedItem();
      event.checked = this._isChecked;
      event.isParent = isParent;
      this._callbackAfterValue(event);
    }
    this._callbackAfterValue = null;
  }
  writeTextByValue(comboItem, value) {
    let options = this.getOptions();
    if (!this._isDivElement) {
      if (comboItem == null) {
        let item = this.items().filter((k) => k.value == value[0])[0];
        if (item != null)
          this.element().value = item.text;
      } else
        this.element().value = comboItem.text;
    } else {
      puma(this.element()).find(".vrComboBoxSelectedValues").remove();
      let selectedItems = this.items().filter((k) => value.includes(String(k.value)));
      if (selectedItems.length > 0) {
        if (selectedItems.length == 1 && selectedItems.vrFirst().text == "")
          return;
        if (options.checkboxes) {
          selectedItems = selectedItems.vrDistinctBy((k) => k.value);
          let selectedValues = selectedItems.map((k) => k.value);
          let comboItemTexts = [];
          for (let val of selectedValues) {
            let liList = this._dictionaryValueLi.get(String(val));
            if (liList != null) {
              for (let li of liList) {
                let comboItemText = puma(li).find(".vrComboBoxItemText")[0];
                comboItemTexts.push(comboItemText);
              }
            }
          }
          for (let comboItemText of comboItemTexts) {
            if (comboItemText == null)
              continue;
            let checkBox = puma(comboItemText).siblings("input");
            puma(checkBox).removeClass("indeterminateVrCheckbox");
            puma(checkBox).prop("checked", true);
            checkBox[0].checked = true;
          }
          let selectedItemsDistinctedByValue = selectedItems.vrDistinctBy((k) => k.parentValue);
          for (let item of selectedItemsDistinctedByValue) {
            this.manageCheckParent(item);
            let parentItem = this.getParentItem(item);
            if (parentItem != null) {
              let childrenValues2 = this.getAllChildrenValues(parentItem);
              let containsAll = selectedItemsDistinctedByValue.map((k) => k.value).every((value2) => {
                return childrenValues2.includes(value2);
              });
              if (containsAll && !selectedItems.map((k) => k.value).includes(parentItem.value))
                selectedItems.push(parentItem);
            }
          }
        }
        selectedItems = selectedItems.vrDistinctBy((k) => k.value);
        let toWriteElements = [];
        let childrenValues = this.getChildrenValues();
        for (let selectedItem of selectedItems) {
          if (childrenValues.includes(selectedItem.value))
            toWriteElements.push(selectedItem);
        }
        let spanSelectedValues = puma("<span class='vrComboBoxSelectedValues'>" + (options.onlyIcon ? "" : toWriteElements.map((k) => k.text).vrToCommaSeparatedList()) + "</span>").vrAppendToPuma(this.element())[0];
        if (!options.onlyIcon) {
          let textWidth = UtilityManager.textWidth(spanSelectedValues);
          if (textWidth > puma(spanSelectedValues).width() && toWriteElements.length > 1 && !options.textEllipsis)
            puma(spanSelectedValues).html(toWriteElements.length + " elementi");
          if (selectedItems.length == this.items().vrDistinctBy((k) => k.value).length && !options.textEllipsis && options.mode != ComboBoxTypeEnum.DropDown)
            puma(spanSelectedValues).html(options.allSelectedMessage != null ? options.allSelectedMessage : "Tutti selezionati");
        } else {
          puma(this._allCheckedOnlyIcon).hide();
          if (selectedItems.length == this.items().vrDistinctBy((k) => k.value).length && !options.textEllipsis && options.mode != ComboBoxTypeEnum.DropDown)
            puma(this._allCheckedOnlyIcon).show();
        }
        if (this._chkCheckAll != null) {
          if (selectedItems.length == this.items().vrDistinctBy((k) => k.value).length)
            this._chkCheckAll.checked(true, false);
          else {
            if (selectedItems.length > 0)
              this._chkCheckAll.checked(CheckboxStateEnum.Undefined, false);
            else
              this._chkCheckAll.checked(false, false);
          }
        }
      } else {
        if (this._chkCheckAll != null)
          this._chkCheckAll.checked(false, false);
      }
    }
  }
  select(index = 0, triggerChange = true) {
    let options = this.getOptions();
    if (options.mode == ComboBoxTypeEnum.DropDown && this.items()[index] != null)
      this.valueInternal(this.items()[index].value, triggerChange);
  }
  index(index = 0, triggerChange = true) {
    this.select(index, triggerChange);
  }
  icon(icon2) {
    let options = this.getOptions();
    if (icon2 != null && this._iconCombo != null) {
      options.icon = icon2;
      this._iconCombo.removeAttribute("class");
      puma(this._iconCombo).addClass(icon2);
    }
    return this._iconCombo;
  }
  isEmpty() {
    return this.value() == null || this.value() == "";
  }
  error() {
    this.element().style.cssText += "border-bottom: solid 1px red;";
  }
  hideError() {
    this.element().style.cssText += "border-bottom: solid 1px #CCC;";
  }
  treeMode(mode, triggerChange = true) {
    let options = this.getOptions();
    options.treeMode = mode;
    if (triggerChange)
      this.items(this.items(), triggerChange);
  }
  //#endregion
  //#region Check
  checkAll(triggerChange = true) {
    this._checkedValues = this.items().map((k) => String(k.value));
    this._checkedValues = this._checkedValues.vrDistinct();
    this.valueInternal(this._checkedValues, triggerChange);
    if (this._chkCheckAll != null)
      this._chkCheckAll.checked(true, false);
  }
  unCheckAll(triggerChange = true) {
    this._checkedValues = [];
    puma(this._popup).find(".vrComboBoxSelectedComboValue").removeClass("vrComboBoxSelectedComboValue");
    puma(this._popup).find("input").removeClass("indeterminateVrCheckbox");
    for (let input of Array.from(puma(this._popup).find("input"))) {
      puma(input).prop("checked", false);
      input.checked = false;
    }
    this.valueInternal([], triggerChange);
    if (this._chkCheckAll != null)
      this._chkCheckAll.checked(false, false);
    let options = this.getOptions();
    if (options.onlyIcon)
      puma(this._allCheckedOnlyIcon).hide();
  }
  check(value, triggerChange = true) {
    let checkedValues = this.getCheckedValues();
    checkedValues.push(value);
    this.value(checkedValues, triggerChange);
  }
  unCheck(value, triggerChange = true) {
    let item = this.items().filter((k) => k.value == value)[0];
    if (item != null) {
      let comboItemTexts = [];
      let liList = this._dictionaryValueLi.get(value);
      if (liList != null) {
        for (let li of liList) {
          let comboItemText = puma(li).find(".vrComboBoxItemText")[0];
          comboItemTexts.push(comboItemText);
        }
        for (let comboItemText of comboItemTexts) {
          if (comboItemText == null)
            continue;
          let checkBox = puma(comboItemText).siblings("input");
          puma(checkBox).removeClass("indeterminateVrCheckbox");
          puma(checkBox).prop("checked", false);
          checkBox[0].checked = false;
        }
      }
      this._checkedValues.vrDelete(value);
      this.value(this.getCheckedValues(), triggerChange);
    }
  }
  allChecked() {
    return this.getCheckedValues().length == this.getAllChildrenValues().vrDistinct().length;
  }
  //#endregion
  //#region Support
  clear(triggerChange = false) {
    let options = this.getOptions();
    puma(this._popup).find(".vrComboBoxSelectedComboValue").removeClass("vrComboBoxSelectedComboValue");
    this.unCheckAll(false);
    this.hideClearButton();
    puma(this._popup).find("li").show();
    this._value = null;
    if (!this._isDivElement)
      this.element().value = "";
    else {
      if (options.mode == ComboBoxTypeEnum.DropDown) {
        let firstItem = this.items().vrFirst();
        if (firstItem != null) {
          let children = this.getOnlyChildrenItems(firstItem);
          if (children.length == 0)
            this.valueInternal(firstItem.value, false);
          else
            this.valueInternal(children.vrFirst().value, false);
        } else
          puma(this.element()).find(".vrComboBoxSelectedValues").remove();
      } else
        puma(this.element()).find(".vrComboBoxSelectedValues").remove();
    }
    if (options.filter === true && puma(this._popup).find(".vrComboBoxFilter")[0] != null)
      puma(this._popup).find(".vrComboBoxFilter")[0].value = "";
    if (options.webService != null) {
      this._items = [];
      puma(this._popup).find(".vrComboBoxUl").remove();
    }
    if (triggerChange)
      this.change();
    if (options.onClear != null) {
      let clearEvent = new ComboBoxClearEvent();
      clearEvent.sender = this;
      options.onClear(clearEvent);
    }
  }
  clearItems() {
    this._items = [];
    this.clear();
    puma(this._popup).find(".vrComboBoxUl").remove();
  }
  popup() {
    return puma(this._popup)[0];
  }
  focus(open = true) {
    this._openPopupAfterFocus = open;
    puma(this.element()).focus();
  }
  getOptions() {
    return this.options();
  }
  doAjaxCall(text = "", fromSet = false, triggerChange = true) {
    let options = this.getOptions();
    if (options.webService == null)
      return;
    if (options.webService.typedTextPropertyName == null) options.webService.typedTextPropertyName = "text";
    if (options.webService.typedValuePropertyName == null) options.webService.typedValuePropertyName = "value";
    if (options.webService.itemsPropertyName == null) options.webService.itemsPropertyName = "items";
    let request = {};
    request[options.webService.typedTextPropertyName] = text;
    if (fromSet)
      request[options.webService.typedValuePropertyName] = this._tempValueWebService[0];
    if (options.webService.authKey == null)
      options.webService.authKey = "";
    if (options.webService.parameters != null) {
      let parameters = options.webService.parameters();
      let jsonParameters = Object.getOwnPropertyNames(parameters);
      for (let param of jsonParameters)
        request[param] = parameters[param];
    }
    this._lastAjaxCallGuid = UtilityManager.createGuid();
    request.guid = this._lastAjaxCallGuid;
    UtilityManager.doAjaxCall(
      {
        mode: WebApiModeEnum.Async,
        authKey: options.webService.authKey,
        method: options.webService.method,
        request
      },
      (response) => {
        if (this._lastAjaxCallGuid != null && response.guid != null && this._lastAjaxCallGuid != response.guid)
          return;
        let finalValue = "";
        if (!fromSet) {
          this._typedTextWebService = text;
          this.items(response[options.webService.itemsPropertyName]);
          if (this._value != null)
            finalValue = this._value[0];
        } else {
          let resultItems = response[options.webService.itemsPropertyName];
          let itemSelected = resultItems.filter((k) => k.value == this._tempValueWebService[0])[0];
          if (itemSelected != null) {
            this.items([itemSelected], false);
            finalValue = itemSelected.value;
          }
        }
        if (finalValue != "" && finalValue != null)
          this.valueInternal(finalValue, triggerChange);
        else if (triggerChange) {
          let value = options.checkboxes && this._tempCheckedValue != null ? this._tempCheckedValue : this.value();
          if (value != "" && value != null)
            this.change();
        }
      },
      () => this._callbackAfterValue = null
    );
  }
  showClearButton() {
    let options = this.getOptions();
    if (options.clearButton !== false)
      puma(this.container()).find(".vrDivComboBoxClearIcon").show();
  }
  hideClearButton() {
    puma(this.container()).find(".vrDivComboBoxClearIcon").hide();
  }
  button() {
    return this._btnCombo;
  }
  buttonVisible(state) {
    if (state != null) {
      this.button().visible(state);
      if (state)
        this._divPickerIcon.classList.add("vrComboDivPickerWithButton");
      else
        this._divPickerIcon.classList.remove("vrComboDivPickerWithButton");
    }
    return this.button().visible();
  }
  showButton() {
    this.buttonVisible(true);
  }
  hideButton() {
    this.buttonVisible(false);
  }
  buttonEnabled(state) {
    if (state != null)
      this.button().enabled(state);
    return this.button().enabled();
  }
  enableButton() {
    this.buttonEnabled(true);
  }
  disableButton() {
    this.buttonEnabled(true);
  }
  //#endregion
  //#region Overrides
  enable() {
    super.enable();
    puma(this.container()).find(".vrDivPickerIconComboBox").removeClass("vrDivPickerIconDisable");
    puma(this.container()).find(".vrDivPickerIconComboBoxDropDown").removeClass("vrDivPickerIconDisable");
    if (this._btnCombo != null)
      this._btnCombo.enable();
    if (this._chkCheckAll != null)
      this._chkCheckAll.enable();
  }
  disable() {
    super.disable();
    puma(this.container()).find(".vrDivPickerIconComboBox").addClass("vrDivPickerIconDisable");
    puma(this.container()).find(".vrDivPickerIconComboBoxDropDown").addClass("vrDivPickerIconDisable");
    if (this._btnCombo != null)
      this._btnCombo.disable();
    if (this._chkCheckAll != null)
      this._chkCheckAll.disable();
  }
  //#endregion
  //#region Events
  change(callBack) {
    let changeCallBack = this.getOptions().onAfterChange;
    if (changeCallBack != null) {
      let options = this.getOptions();
      let value = options.checkboxes && this._tempCheckedValue != null ? this._tempCheckedValue : this.value();
      let isParent = this.getRootValues().includes(value);
      let parentItem = null;
      if (isParent)
        parentItem = this.items().filter((k) => k.value == value)[0];
      let changeEvent = new ComboBoxChangeEvent();
      changeEvent.sender = this;
      changeEvent.value = value;
      changeEvent.text = this.text();
      changeEvent.childrenValues = isParent ? this.getAllChildrenValues(parentItem) : [];
      changeEvent.selectedItem = this.getSelectedItem();
      changeEvent.checked = this._isChecked;
      changeEvent.isParent = isParent;
      changeCallBack(changeEvent);
    }
    this.manageCallbackAfterValue();
    if (callBack != null)
      callBack();
  }
  //#endregion
}
class ComboBoxKeyDownEvent extends VrControlsEvent {
  sender;
  event;
}
class ComboBoxKeyUpEvent extends VrControlsEvent {
  sender;
  event;
}
class ComboBoxPasteEvent extends VrControlsEvent {
  sender;
  event;
  pastedValue;
  value;
}
class ComboBoxEnterKeyEvent extends VrControlsEvent {
  sender;
  value;
}
class ComboBoxCloseEvent extends VrControlsEvent {
  sender;
  beforeValue;
  afterValue;
}
class ComboBoxOpenEvent extends VrControlsEvent {
  sender;
  value;
}
class ComboBoxItemDataBoundEvent extends VrControlsEvent {
  sender;
  element;
  dataItem;
}
class ComboBoxBlurEvent extends VrControlsEvent {
  sender;
  value;
}
class ComboBoxFocusEvent extends VrControlsEvent {
  sender;
  value;
}
export {
  ComboBox,
  ComboBoxOptions
};
//# sourceMappingURL=comboBox.js.map
