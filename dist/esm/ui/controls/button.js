import { ButtonModeEnum, IconSettings, PositionEnum, ControlTypeEnum, puma, BadgeClickEvent, span, confirm } from "../vr.js";
import { VrControl, VrControlOptions, VrControlsEvent } from "../common.js";
class ButtonOptions extends VrControlOptions {
  text;
  value;
  mode;
  tooltip;
  colorSettings;
  icon;
  onlyIcon;
  imageUrl;
  iconSettings;
  confirmationMessage;
  badgeSettings;
  onContextMenu;
  onClick;
  onRightClick;
  onMiddleClick;
  onHover;
  onBlur;
  onRejectedConfirm;
  onMouseDown;
  onMouseUp;
}
class Button extends VrControl {
  _mouseDownEvent;
  constructor(element, options) {
    if (options == null)
      options = new ButtonOptions();
    if (options.text == null) options.text = "";
    if (options.mode == null) options.mode = ButtonModeEnum.Default;
    if (options.iconSettings == null) options.iconSettings = new IconSettings();
    if (options.iconSettings.position == null) options.iconSettings.position = PositionEnum.Left;
    if (options.onContextMenu == null) options.onContextMenu = true;
    super(element, options, ControlTypeEnum.Button);
    if (options.width == null)
      this.element().style.cssText += "min-width: 27px;";
    else
      this.element().style.cssText += "width: 100%;";
    if (options.colorSettings != null) {
      let colorSettings = options.colorSettings;
      if (colorSettings.textColor != null)
        this.color(colorSettings.textColor);
      if (colorSettings.background != null)
        this.backgroundColor(colorSettings.background);
      if (colorSettings.border != null)
        this.borderColor(colorSettings.border);
    }
    this.mode(options.mode);
    if (options.icon != null)
      this.icon(options.icon);
    else if (options.imageUrl != null)
      this.imageUrl(options.imageUrl);
    if ((options.icon != null || options.imageUrl != null) && options.onlyIcon === true)
      this.css("border: none; background: none;");
    this.text(options.text);
    if (options.tooltip != null)
      this.tooltip(options.tooltip);
    if (options.value != null)
      puma(this.element()).attr("value", options.value);
    let badgeColor = "#FFF";
    let badgeBackgroundColor = "red";
    let badgeText = "";
    let badgeVisible = false;
    if (options.badgeSettings != null) {
      if (options.badgeSettings.text != null) badgeText = String(options.badgeSettings.text);
      if (options.badgeSettings.color != null) badgeColor = options.badgeSettings.color;
      if (options.badgeSettings.backgroundColor != null) badgeBackgroundColor = String(options.badgeSettings.backgroundColor);
      if (options.badgeSettings.visible != null) badgeVisible = options.badgeSettings.visible;
    }
    let badge = puma("<span class='vrBadgeClass vrButtonBadgeClass'>" + badgeText + "</span>")[0];
    badge.innerHTML = badgeText;
    puma(element).after(badge);
    if (options.tooltip != null)
      badge.title = options.tooltip;
    badge.style.cssText += "color: " + badgeColor + "; background-color: " + badgeBackgroundColor + ";";
    if ((badgeText == "" || badgeText == null) && !badgeVisible)
      puma(badge).hide();
    if (options.badgeSettings != null && options.badgeSettings.css != null)
      badge.style.cssText += options.badgeSettings.css;
    if (options.badgeSettings != null && options.badgeSettings.click != null) {
      puma(badge).on("mousedown", (e) => {
        let badgeClickEvent = new BadgeClickEvent();
        badgeClickEvent.sender = this;
        badgeClickEvent.text = this.badge();
        switch (e.button) {
          case 0:
            badgeClickEvent.leftButton = true;
            break;
          case 1:
            badgeClickEvent.middleButton = true;
            break;
          case 2:
            badgeClickEvent.rightButton = true;
            break;
        }
        options.badgeSettings.click(badgeClickEvent);
      });
    } else if (options.onClick != null) {
      puma(badge).on("click", (e) => {
        this.click();
        return false;
      });
    }
    puma(element).on("mousedown", (e) => {
      if (options.onMouseDown != null) {
        let event = new ButtonMouseDownEvent();
        event.sender = this;
        options.onMouseDown(event);
        if (event.isDefaultPrevented())
          return;
      }
      this._mouseDownEvent = e;
      if (e.button != 0)
        this.click();
    });
    puma(element).on("click", (e) => {
      this.click();
      e.preventDefault();
      return false;
    });
    puma(element).on("mouseup", (e) => {
      if (options.onMouseUp != null) {
        let event = new ButtonMouseUpEvent();
        event.sender = this;
        options.onMouseUp(event);
        if (event.isDefaultPrevented())
          return;
      }
    });
    puma(this.container()).hover(() => {
      if (options.onHover != null) {
        let hoverEvent = new ButtonHoverEvent();
        hoverEvent.sender = this;
        options.onHover(hoverEvent);
      }
    });
    puma(this.container()).mouseleave(() => {
      if (options.onBlur != null) {
        let blurEvent = new ButtonBlurEvent();
        blurEvent.sender = this;
        options.onBlur(blurEvent);
      }
    });
    puma(this.container()).on("contextmenu", (e) => {
      if (options.onContextMenu != null) {
        if (typeof options.onContextMenu == "boolean") {
          if (!options.onContextMenu)
            e.preventDefault();
        } else {
          let event = new ContextMenuEvent();
          event.sender = this;
          options.onContextMenu(event);
        }
      }
    });
  }
  //#region Methods
  //#region Text/Label/Tooltip
  text(value) {
    let options = this.getOptions();
    if (value != null) {
      puma(this.element()).find(".vrButtonSpanText").remove();
      let spanText = span(this.element(), { class: "vrButtonSpanText" });
      let iconPosition = options.iconSettings.position;
      if (iconPosition == PositionEnum.Left)
        puma(this.element()).vrAppendPuma(spanText);
      else if (iconPosition == PositionEnum.Right)
        puma(this.element()).vrPrependPuma(spanText);
      spanText.innerHTML = value;
      options.text = value;
    }
    return options.text;
  }
  value(value) {
    return this.text(value);
  }
  tooltip(value) {
    if (value != null)
      this.element().title = String(value);
    return this.element().title;
  }
  //#endregion
  //#region Badge
  badge(text) {
    if (text != null) {
      puma(this.container()).find(".vrButtonBadgeClass").html(text);
      this.visibleBadge(text != "");
    }
    return puma(this.container()).find(".vrButtonBadgeClass").html();
  }
  badgeBackgroundColor(color) {
    puma(this.container()).find(".vrButtonBadgeClass").css("background-color", color);
  }
  badgeColor(color) {
    puma(this.container()).find(".vrButtonBadgeClass").css("color", color);
  }
  showBadge() {
    puma(this.container()).find(".vrButtonBadgeClass").show();
  }
  hideBadge() {
    puma(this.container()).find(".vrButtonBadgeClass").hide();
  }
  visibleBadge(state) {
    if (state) this.showBadge();
    else this.hideBadge();
  }
  //#endregion
  //#region Override
  hide() {
    super.hide();
    this.hideBadge();
  }
  //#endregion
  //#region Mode
  mode(mode) {
    if (mode != null) {
      puma(this.element()).removeClass([ButtonModeEnum.Default, ButtonModeEnum.Primary, ButtonModeEnum.Delete, ButtonModeEnum.Excel, ButtonModeEnum.Primary].join(" "));
      puma(this.element()).addClass(mode);
    }
    let classList = this.element().className.split(/\s+/);
    return classList.filter((k) => k.endsWith("Mode"))[0];
  }
  //#endregion
  //#region Color
  colorSettings(settings) {
    let options = this.getOptions();
    if (settings != null) {
      options.colorSettings = settings;
      if (settings.textColor != null)
        this.color(settings.textColor);
      if (settings.background != null)
        this.backgroundColor(settings.background);
      if (settings.border != null)
        this.borderColor(settings.border);
    }
    return options.colorSettings;
  }
  color(value) {
    if (value != null)
      this.element().style.cssText += "color: " + value;
    return puma(this.element()).css("color");
  }
  backgroundColor(value) {
    if (value != null)
      this.element().style.cssText += "background-color: " + value;
    return puma(this.element()).css("background-color");
  }
  borderColor(value) {
    if (value != null)
      this.element().style.cssText += "border-color: " + value;
    return puma(this.element()).css("border-color");
  }
  //#endregion
  //#region Icon/ImageUrl
  icon(icon, iconPosition, iconTooltip = "") {
    let options = this.getOptions();
    if (iconPosition == null)
      iconPosition = options.iconSettings.position;
    let vrIcon = puma(this.element()).find(".vrIcon")[0];
    if (icon != null) {
      if (vrIcon != null) {
        let classList = vrIcon.className.split(/\s+/);
        let iconClassList = classList.filter((k) => k.startsWith("fa-"));
        for (let iconClass of iconClassList)
          vrIcon.classList.remove(iconClass);
        puma(vrIcon).addClass(icon);
      } else {
        let options2 = this.options();
        let margin = "";
        if (options2.text != null && options2.text != "") {
          if (iconPosition == PositionEnum.Left) margin = "margin-right: 5px;";
          else if (iconPosition == PositionEnum.Right) margin = "margin-left: 5px;";
        }
        let classAttribute = "";
        let idAttribute = "";
        let css = "";
        let settings = options2.iconSettings;
        if (settings.id != null)
          idAttribute = "id = '" + settings.id + "'";
        if (settings.css != null)
          css += settings.css + ";";
        if (settings.fontSize != null) {
          if (typeof settings.fontSize == "number")
            settings.fontSize = settings.fontSize + "px";
          css += "font-size: " + settings.fontSize + ";";
        }
        if (settings.color != null)
          css += "color: " + settings.color + ";";
        if (settings.class != null)
          classAttribute += settings.class;
        if (settings.cursor != null)
          css += "cursor: " + settings.cursor + ";";
        let iElementString = "<i class='" + icon + " vrIcon " + classAttribute + "' aria-hidden='true' style='position: relative; top: -1px;" + margin + " " + css + "' id='" + idAttribute + "'></i>";
        if (iconPosition == PositionEnum.Left)
          puma(this.element()).vrPrependPuma(iElementString);
        else if (iconPosition == PositionEnum.Right)
          puma(this.element()).vrAppendPuma(iElementString);
      }
      if (iconTooltip != "")
        puma(vrIcon).attr("title", iconTooltip);
    }
    return vrIcon;
  }
  imageUrl(imageUrl, imagePosition) {
    let options = this.getOptions();
    if (imagePosition == null)
      imagePosition = options.iconSettings.position;
    let vrImageUrl = puma(this.element()).find(".vrImageUrl")[0];
    if (imageUrl != null) {
      if (vrImageUrl != null)
        puma(vrImageUrl).remove();
      let options2 = this.options();
      let margin = "";
      if (options2.text != null && options2.text != "") {
        if (imagePosition == PositionEnum.Left) margin = "margin-right: 5px;";
        else if (imagePosition == PositionEnum.Right) margin = "margin-left: 5px;";
      }
      if (imagePosition == PositionEnum.Left)
        puma(this.element()).prepend("<img src='" + imageUrl + "' vrImageUrl' style='width: 16px; height: 16px; float: left;" + margin + "' />");
      else if (imagePosition == PositionEnum.Right)
        puma(this.element()).vrAppendPuma("<img src='" + imageUrl + "' vrImageUrl' style='width: 16px; height: 16px; float: right;" + margin + "' />");
    }
    vrImageUrl = puma(this.element()).find(".vrImageUrl")[0];
    return vrImageUrl;
  }
  //#endregion
  getOptions() {
    return this.options();
  }
  //#endregion
  //#region Events
  click(callback) {
    let options = this.getOptions();
    if (options.confirmationMessage != null)
      confirm(options.confirmationMessage).then(() => this.internalClick(callback), () => this.rejectedConfirm());
    else
      this.internalClick(callback);
  }
  internalClick(callback) {
    let clickCallback = this.options().onClick;
    if (this._mouseDownEvent != null) {
      switch (this._mouseDownEvent.button) {
        case 0:
          clickCallback = this.options().onClick;
          break;
        // Left click
        case 1:
          clickCallback = this.options().onMiddleClick;
          break;
        // Middle click
        case 2:
          clickCallback = this.options().onRightClick;
          break;
      }
    }
    if (clickCallback != null) {
      let clickEvent = new ButtonClickEvent();
      clickEvent.sender = this;
      clickEvent.text = this.text();
      clickCallback(clickEvent);
    }
    this._mouseDownEvent = null;
    if (callback != null) {
      let clickEvent = new ButtonClickEvent();
      clickEvent.sender = this;
      clickEvent.text = this.text();
      callback(clickEvent);
    }
  }
  rejectedConfirm() {
    let options = this.getOptions();
    if (options.onRejectedConfirm != null)
      options.onRejectedConfirm();
  }
  //#endregion
}
class ButtonEvent extends VrControlsEvent {
  sender;
}
class ButtonClickEvent extends ButtonEvent {
  text;
}
class ButtonHoverEvent extends ButtonEvent {
}
class ButtonBlurEvent extends ButtonEvent {
}
class ContextMenuEvent extends ButtonEvent {
}
class ButtonMouseDownEvent extends ButtonEvent {
}
class ButtonMouseUpEvent extends ButtonEvent {
}
export {
  Button,
  ButtonOptions
};
//# sourceMappingURL=button.js.map
