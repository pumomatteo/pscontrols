import { VrControl, VrControlsEvent, VrControlOptions } from "../common.js";
import { TooltipPositionEnum, TooltipShowOnEnum, TooltipHideOnEnum, TooltipTypeEnum, ColorSettings, AnimationShowEnum, AnimationHideEnum, ControlTypeEnum, puma } from "../vr.js";
import { Notifier } from "./notifier.js";
class TooltipOptions extends VrControlOptions {
  target;
  elementToAppend;
  content;
  type;
  position;
  hideSettings;
  showSettings;
  colorSettings;
  showOn;
  hideOn;
  icon;
  onShow;
  onHide;
}
class Tooltip extends VrControl {
  //#region Variables
  _notifier;
  //#endregion
  constructor(element, options) {
    if (options == null)
      options = new TooltipOptions();
    if (options.position == null) options.position = TooltipPositionEnum.BottomCenter;
    if (options.showOn == null) options.showOn = TooltipShowOnEnum.Hover;
    if (options.hideOn == null) options.hideOn = TooltipHideOnEnum.Default;
    if (options.type == null) options.type = TooltipTypeEnum.Default;
    if (options.colorSettings == null) options.colorSettings = new ColorSettings();
    if (options.colorSettings.background == null) options.colorSettings.background = "#d9d9d9";
    if (options.colorSettings.textColor == null) options.colorSettings.textColor = "#000";
    if (options.colorSettings.border == null) options.colorSettings.border = "#CCC";
    if (options.showSettings == null) options.showSettings = new TooltipShowSettings();
    if (options.showSettings.showAfter == null) options.showSettings.showAfter = 500;
    if (options.showSettings.animation == null) options.showSettings.animation = AnimationShowEnum.None;
    if (options.hideSettings == null) options.hideSettings = new TooltipHideSettings();
    if (options.hideSettings.hideAfter == null) options.hideSettings.hideAfter = 600;
    if (options.hideSettings.animation == null) options.hideSettings.animation = AnimationHideEnum.None;
    if (options.elementToAppend == null) options.elementToAppend = options.target;
    super(element, options, ControlTypeEnum.Tooltip);
    let showOn = "mouseenter";
    let hideOn = "mouseleave";
    switch (options.showOn) {
      case TooltipShowOnEnum.Hover:
        {
          showOn = "mouseenter";
          if (options.hideOn == TooltipHideOnEnum.Default)
            hideOn = "mouseleave";
        }
        break;
      case TooltipShowOnEnum.Click:
        {
          showOn = "click";
          if (options.hideOn == TooltipHideOnEnum.Default)
            hideOn = "click";
        }
        break;
      case TooltipShowOnEnum.Focus:
        {
          showOn = "focus";
          if (options.hideOn == TooltipHideOnEnum.Default)
            hideOn = "blur";
        }
        break;
    }
    if (options.hideOn != TooltipHideOnEnum.Default) {
      switch (options.hideOn) {
        case TooltipHideOnEnum.Leave:
          hideOn = "mouseleave";
          break;
        case TooltipHideOnEnum.Click:
          hideOn = "click";
          break;
        case TooltipHideOnEnum.Blur:
          hideOn = "blur";
          break;
      }
    }
    if (options.showOn != TooltipShowOnEnum.Never) {
      puma(this.target()).on(showOn, (e) => {
        window.setTimeout(() => this.show(), options.showSettings.showAfter);
      });
      puma(this.target()).on(hideOn, (e) => {
        if (options.hideOn != TooltipHideOnEnum.Never)
          window.setTimeout(() => this.hide(), Number(options.hideSettings.hideAfter));
      });
      puma(this.container()).on(hideOn, (e) => {
        if (options.hideOn != TooltipHideOnEnum.Never)
          window.setTimeout(() => this.hide(), Number(options.hideSettings.hideAfter));
      });
      if (hideOn == "click" && options.hideOn != TooltipHideOnEnum.Never)
        puma(document.body).on("click", () => window.setTimeout(() => this.hide(), Number(options.hideSettings.hideAfter)));
    }
  }
  show(content) {
    if (this._notifier != null && this._notifier.visible())
      return;
    let options = this.getOptions();
    if (content != null)
      this.content(content);
    if (options.content == null)
      options.content = this.target().innerText;
    super.show();
    options.hideSettings.autoHide = false;
    this._notifier = new Notifier(options.content, options);
    puma(this._notifier.container()).vrAppendToPuma(options.elementToAppend);
    if (options.onShow != null) {
      let showEvent = new TooltipShowEvent();
      showEvent.sender = this;
      showEvent.content = this.content();
      options.onShow(showEvent);
    }
  }
  hide() {
    if (this._notifier == null || !this._notifier.visible())
      return;
    let options = this.getOptions();
    super.hide();
    this._notifier.hide();
    if (options.onHide != null) {
      let hideEvent = new TooltipHideEvent();
      hideEvent.sender = this;
      hideEvent.content = this.content();
      options.onHide(hideEvent);
    }
  }
  visible(state) {
    super.visible(state);
    return this._notifier == null ? false : this._notifier.visible(state);
  }
  content(content) {
    let options = this.getOptions();
    if (content != null)
      options.content = content;
    return options.content;
  }
  target() {
    return puma(this.getOptions().target)[0];
  }
  getOptions() {
    return this.options();
  }
}
class TooltipHideSettings {
  clickToHide;
  hideAfter;
  animation;
}
class TooltipShowSettings {
  showAfter;
  animation;
}
class TooltipShowEvent extends VrControlsEvent {
  sender;
  content;
}
class TooltipHideEvent extends VrControlsEvent {
  sender;
  content;
}
export {
  Tooltip,
  TooltipOptions
};
//# sourceMappingURL=tooltip.js.map
