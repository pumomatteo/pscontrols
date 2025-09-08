import { puma, LabelModeEnum, PositionEnum, ControlPositionEnum, createLabel, PopupDirectionEnum, shadowRoot } from "./vr.js";
class VrControl {
  _element;
  _options;
  _labelOutside;
  _typeEnum;
  _tag;
  constructor(element, options, typeEnum) {
    this._element = element;
    this._options = options;
    this._typeEnum = typeEnum;
    puma(element).wrap("<div class='vrControlsContainer'></div>");
    puma(element).addClass("vr" + typeEnum);
    puma(element).addClass("vrControls");
    puma(this.container()).addClass("vr" + typeEnum + "Container");
    puma(this.container()).attr("id", element.id + "Container");
    if (options.label != null) {
      if (options.labelSettings == null)
        options.labelSettings = new LabelControlsSettings();
      if (options.labelSettings.mode == null) options.labelSettings.mode = LabelModeEnum.Primary;
      if (options.labelSettings.position == null) options.labelSettings.position = PositionEnum.Top;
      let labelPosition = options.labelSettings.position;
      let controlPositionEnum = labelPosition == PositionEnum.Top || labelPosition == PositionEnum.Left ? ControlPositionEnum.Before : ControlPositionEnum.After;
      let margin = "";
      let top = "";
      if (labelPosition == PositionEnum.Left) {
        margin = "margin-right: 5px;";
        top = "top: -1px;";
      } else if (labelPosition == PositionEnum.Right) {
        margin = "margin-left: 5px;";
        top = "top: -1px;";
      } else
        this.container().style.cssText += "display: inline-flex; flex-direction: column;";
      this._labelOutside = createLabel(
        {
          id: options.labelSettings.id,
          text: options.label,
          mode: options.labelSettings.mode,
          align: options.labelSettings.textAlign,
          width: labelPosition == PositionEnum.Top || labelPosition == PositionEnum.Bottom ? "100%" : options.labelSettings.width,
          class: options.labelSettings.class,
          fontSize: options.labelSettings.fontSize,
          cssContainer: margin + top + options.labelSettings.cssContainer,
          css: "white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" + options.labelSettings.css,
          bold: options.labelSettings.bold,
          tooltip: options.labelSettings.tooltip,
          colorSettings: options.labelSettings.colorSettings,
          tabIndex: -1,
          underlineMode: options.labelSettings.underlineMode,
          onClick: options.labelSettings.onClick
        },
        this.container(),
        controlPositionEnum
      );
    }
    if (options.width != null)
      this.width(options.width);
    if (options.height != null)
      this.height(options.height);
    if (options.visible === false)
      this.hide();
    if (options.enable === false)
      this.disable();
    if (options.id != null)
      this.id(options.id);
    if (options.css != null)
      this.css(options.css);
    if (options.cssContainer != null)
      this.cssContainer(options.cssContainer);
    if (options.class != null)
      this.class(options.class);
    if (options.classContainer != null)
      this.classContainer(options.classContainer);
    if (options.margin != null) {
      if (typeof options.margin == "number")
        this.container().style.cssText += "margin: " + options.margin + "px;";
      else {
        if (options.margin.top != null) this.container().style.cssText += "margin-top: " + options.margin.top + "px;";
        if (options.margin.right != null) this.container().style.cssText += "margin-right: " + options.margin.right + "px;";
        if (options.margin.bottom != null) this.container().style.cssText += "margin-bottom: " + options.margin.bottom + "px;";
        if (options.margin.left != null) this.container().style.cssText += "margin-left: " + options.margin.left + "px;";
      }
    }
    if (options.addToControlList == null)
      options.addToControlList = true;
    this._tag = options.tag;
    if (options.attributes == null) options.attributes = [];
    if (options.uniqueName != null)
      options.attributes.push({ name: "uniqueName", value: options.uniqueName });
    for (let attribute of options.attributes)
      this.attribute(attribute.name, attribute.value, attribute.container);
    if (options.tabIndex == null) options.tabIndex = 0;
    this.attribute("tabindex", options.tabIndex);
    if (options.shadowRoot !== false) {
      if (shadowRoot() != null)
        puma(this.container()).addClass("shadowRoot");
    }
  }
  controlType() {
    return this._typeEnum;
  }
  id(id) {
    if (id != null) {
      this.element().id = id;
      this.container().id = id + "Container";
    }
    return this.element().id;
  }
  tag(tag) {
    if (tag != null)
      this._tag = tag;
    if (tag === null)
      this._tag = null;
    return this._tag;
  }
  uniqueName(uniqueName) {
    if (uniqueName != null)
      this.attribute("uniqueName", uniqueName);
    return puma(this.element()).attr("uniqueName");
  }
  attribute(name, value, toContainer = false) {
    if (!toContainer)
      puma(this.element()).attr(name, value);
    else
      puma(this.container()).attr(name, value);
  }
  tooltip(tooltip, container = false) {
    if (tooltip != null) {
      if (container) puma(this.container()).attr("title", tooltip);
      else puma(this.element()).attr("title", tooltip);
    }
    return container ? puma(this.container()).attr("title") : puma(this.element()).attr("title");
  }
  //#region Element/Container/Options
  element() {
    return this._element;
  }
  container() {
    return puma(this.element()).closest(".vrControlsContainer")[0];
  }
  label() {
    return this._labelOutside;
  }
  options() {
    return this._options;
  }
  //#endregion
  //#region Popup
  settingPopup(popup, popupSettings) {
    if (popupSettings != null) {
      if (popupSettings.width != null) popup.style.cssText += "width: " + this.fixWidthHeightValue(popupSettings.width) + ";";
      if (popupSettings.minWidth != null) popup.style.cssText += "min-width: " + this.fixWidthHeightValue(popupSettings.minWidth) + ";";
      if (popupSettings.maxWidth != null) popup.style.cssText += "max-width: " + this.fixWidthHeightValue(popupSettings.maxWidth) + ";";
      if (popupSettings.height != null) popup.style.cssText += "height: " + this.fixWidthHeightValue(popupSettings.height) + ";";
      if (popupSettings.minHeight != null) popup.style.cssText += "min-height: " + this.fixWidthHeightValue(popupSettings.minHeight) + ";";
      if (popupSettings.maxHeight != null) popup.style.cssText += "max-height: " + this.fixWidthHeightValue(popupSettings.maxHeight) + ";";
      if (popupSettings.direction == null) popupSettings.direction = PopupDirectionEnum.Auto;
    }
    let elementTop = this.element().getBoundingClientRect().top;
    let elementLeft = this.element().getBoundingClientRect().left;
    let elementWidth = puma(this.element()).outerWidth();
    let elementHeight = puma(this.element()).outerHeight();
    let popupWidth = puma(popup).outerWidth();
    let popupHeight = puma(popup).outerHeight();
    let positionLeft = 0;
    if (popupSettings != null && popupSettings.right === true)
      positionLeft = elementLeft + elementWidth - popupWidth;
    else {
      let documentBodyLeft = puma(document.body).offset().left;
      let documentBodyWidth = puma(document.body).width();
      if (documentBodyLeft + documentBodyWidth <= elementLeft + popupWidth + elementWidth)
        positionLeft = elementLeft + elementWidth - popupWidth;
      else
        positionLeft = elementLeft;
    }
    if (popupSettings != null && popupSettings.direction != PopupDirectionEnum.Auto) {
      if (popupSettings.direction == PopupDirectionEnum.Up) {
        let bottomPosition = window.innerHeight - elementTop;
        let minBottomPosition = popupHeight;
        if (bottomPosition < minBottomPosition) {
          let maxHeight = window.innerHeight - elementTop - elementHeight - 10;
          popup.style.cssText += "left: " + positionLeft + "px; top: " + (elementTop + elementHeight) + "px; max-height: " + maxHeight + "px; overflow-y: auto;";
        } else
          popup.style.cssText += "left: " + positionLeft + "px; bottom: " + bottomPosition + "px;";
      } else if (popupSettings.direction == PopupDirectionEnum.Down) {
        let availableHeight = window.innerHeight - elementTop - elementHeight - 10;
        if (popupHeight > availableHeight)
          popup.style.cssText += "left: " + positionLeft + "px; top: " + (elementTop + elementHeight) + "px; max-height: " + availableHeight + "px; overflow-y: auto;";
        else
          popup.style.cssText += "left: " + positionLeft + "px; top: " + (elementTop + elementHeight) + "px;";
      }
    } else {
      let documentBodyTop = puma(document.body).offset().top;
      let documentBodyHeight = puma(document.body).height();
      if (documentBodyTop + documentBodyHeight <= elementTop + popupHeight + elementHeight) {
        let bottomPosition = window.innerHeight - elementTop;
        let availableHeightUp = elementTop - 10;
        if (popupHeight > availableHeightUp) {
          popup.style.cssText += "left: " + positionLeft + "px; bottom: " + bottomPosition + "px; max-height: " + availableHeightUp + "px; overflow-y: auto;";
        } else
          popup.style.cssText += "left: " + positionLeft + "px; bottom: " + bottomPosition + "px;";
      } else {
        let availableHeight = window.innerHeight - elementTop - elementHeight - 10;
        if (popupHeight > availableHeight)
          popup.style.cssText += "left: " + positionLeft + "px; top: " + (elementTop + elementHeight) + "px; max-height: " + availableHeight + "px; overflow-y: auto;";
        else
          popup.style.cssText += "left: " + positionLeft + "px; top: " + (elementTop + elementHeight) + "px;";
      }
    }
    if (shadowRoot() != null)
      popup.style.cssText += "position: fixed;";
  }
  fixWidthHeightValue(value) {
    if (typeof value == "number")
      value = value + "px";
    return value;
  }
  //#endregion
  //#region Width/Height
  width(value) {
    if (value != null) {
      let options = this.options();
      let containerJq = puma(this.container());
      let elementJq = puma(this.element());
      let labelWidth = 0;
      if (options.label != null) {
        let label = containerJq.find(".vrLabel")[0];
        labelWidth = puma(label).outerWidth(true) + 5;
      }
      containerJq.width(value);
      let outer = elementJq.outerWidth();
      let normal = elementJq.width();
      let diff = outer - normal;
      if (diff === outer && options.label == null)
        diff = 0;
      elementJq.width("Calc(100% - " + diff + "px)");
      if (elementJq.hasClass("vrEditor"))
        elementJq.width("100%");
      if (options.label != null) {
        let labelPosition = options.labelSettings.position;
        if (labelPosition == PositionEnum.Left || labelPosition == PositionEnum.Right) {
          if (options.labelSettings.width != null)
            labelWidth = options.labelSettings.width;
          if (typeof value === "string")
            elementJq.width("Calc(100% - " + (diff + labelWidth) + "px)");
          else if (typeof value === "number") {
            elementJq.width(value - diff);
            containerJq.width(value + labelWidth);
          }
        } else if (elementJq.is("button") || elementJq.is("textarea"))
          elementJq.width("Calc(100% - 0px)");
      } else if (elementJq.is("button") || elementJq.is("textarea"))
        elementJq.width("100%");
    }
    return puma(this.element()).width();
  }
  height(value) {
    if (value != null) {
      if (typeof value == "string") {
        puma(this.container())[0].style.cssText += "height: " + value + ";";
        puma(this.element())[0].style.cssText += "height: " + value + ";";
      } else {
        puma(this.container()).height(value);
        puma(this.element()).height(value);
      }
    }
    return puma(this.element()).height();
  }
  //#endregion
  //#region Enable/Disable
  enabled(state) {
    if (state != null) {
      if (state) this.enable();
      else this.disable();
    }
    let disabledAttribute = this.element().getAttribute("disabled");
    return disabledAttribute == null || disabledAttribute == "";
  }
  enable() {
    this.element().removeAttribute("disabled");
  }
  disable() {
    this.element().setAttribute("disabled", "disabled");
  }
  //#endregion
  //#region Visible
  visible(state) {
    if (state != null) {
      if (state) this.show();
      else this.hide();
    }
    return puma(this.container()).is(":visible");
  }
  show(duration) {
    puma(this.container()).show(duration);
    if (puma(this.element()).is("button"))
      puma(this.element()).css({ "max-width": "100%" });
  }
  hide(duration) {
    puma(this.container()).hide(duration);
  }
  //#endregion
  //#region Focus
  focus() {
    puma(this.element()).focus();
  }
  blur() {
    puma(this.element()).blur();
  }
  //#endregion
  //#region Css
  cssContainer(value) {
    this.container().style.cssText += value;
  }
  css(value) {
    this.element().style.cssText += value;
  }
  class(className) {
    if (className != null)
      puma(this.element()).addClass(className);
    return this.element().className.split(/\s+/);
  }
  classContainer(className) {
    if (className != null)
      puma(this.container()).addClass(className);
    return this.container().className.split(/\s+/);
  }
  removeClass(className) {
    puma(this.element()).removeClass(className);
  }
  //#endregion
}
class VrControlOptions {
  width;
  height;
  id;
  css;
  cssContainer;
  class;
  classContainer;
  margin;
  enable;
  visible;
  label;
  labelSettings;
  tag;
  uniqueName;
  attributes;
  tabIndex;
  shadowRoot;
  addToControlList;
}
class LabelControlsSettings {
  id;
  mode;
  width;
  class;
  position;
  fontSize;
  textAlign;
  tooltip;
  bold;
  css;
  cssContainer;
  colorSettings;
  underlineMode;
  onClick;
}
class VrControlsEvent {
  _defaultPrevented = false;
  preventDefault() {
    this._defaultPrevented = true;
  }
  isDefaultPrevented() {
    return this._defaultPrevented;
  }
}
export {
  LabelControlsSettings,
  VrControl,
  VrControlOptions,
  VrControlsEvent
};
//# sourceMappingURL=common.js.map
