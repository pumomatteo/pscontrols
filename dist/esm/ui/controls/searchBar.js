import { VrControl, VrControlOptions, VrControlsEvent } from "../common.js";
import { IconClassicLight, ControlTypeEnum, createIcon, createTextBox } from "../vr.js";
class SearchBarOptions extends VrControlOptions {
  collapsed;
  icon;
  placeholder;
  expandOnClick;
  collapseOnBlur;
}
class SearchBar extends VrControl {
  //#region Variables
  _textBox;
  _previousValue;
  //#endregion
  constructor(element, options) {
    if (options == null)
      options = new SearchBarOptions();
    if (options.expandOnClick == null) options.expandOnClick = true;
    if (options.collapseOnBlur == null) options.collapseOnBlur = false;
    if (options.collapsed == null) options.collapsed = false;
    if (options.placeholder == null) options.placeholder = "Cerca...";
    if (options.icon == null) options.icon = true;
    if (options.icon == true) options.icon = IconClassicLight.Search;
    super(element, options, ControlTypeEnum.SearchBar);
    if (options.icon !== false) {
      createIcon({
        value: options.icon,
        color: options.onClick != null ? "#878787" : "#CCC",
        onClick: (e) => {
          if (options.expandOnClick != null)
            this.expand();
          if (options.onClick != null) {
            let clickEvent = new SearchBarClickEvent();
            clickEvent.sender = this;
            clickEvent.value = this.value();
            options.onClick(clickEvent);
          }
        }
      }, this.element());
    }
    this._textBox = createTextBox({
      placeholder: options.placeholder,
      width: options.icon !== false ? "Calc(100% - 16px)" : "100%",
      onKeyDown: (e) => this._previousValue = this.value(),
      onKeyUp: (e) => {
        if (options.onKeyUp != null) {
          let keyUpEvent = new SearchBarKeyUpEvent();
          keyUpEvent.sender = this;
          keyUpEvent.value = this.value();
          keyUpEvent.previousValue = this._previousValue;
          options.onKeyUp(keyUpEvent);
        }
      },
      onEnterKey: () => {
        if (options.onEnterKey != null) {
          let enterKeyPressEvent = new SearchBarEnterKeyEvent();
          enterKeyPressEvent.sender = this;
          enterKeyPressEvent.value = this.value();
          options.onEnterKey(enterKeyPressEvent);
        }
      },
      onBlur: (e) => {
        if (options.collapseOnBlur)
          this.collapse();
        if (options.onBlur != null) {
          let blurEvent = new SearchBarBlurEvent();
          blurEvent.sender = this;
          blurEvent.value = this.value();
          options.onBlur(blurEvent);
        }
      }
    }, this.element());
    if (options.collapsed)
      this.collapse();
  }
  //#region Methods
  value(text) {
    return this._textBox.value(text);
  }
  clear() {
    this._textBox.clear();
  }
  //#region Collapse/Expand
  collapse() {
    this._textBox.hide();
    this.container().style.cssText += "border-bottom: none;";
  }
  expand() {
    this._textBox.show();
    this._textBox.focus();
    this.container().style.cssText += "border-bottom: solid 1px #d9d9d9;";
  }
  isCollapsed() {
    return !this._textBox.visible();
  }
  //#endregion
  focus() {
    this._textBox.focus();
  }
  //#endregion
}
class SearchBarEvent extends VrControlsEvent {
  sender;
  value;
}
class SearchBarKeyUpEvent extends SearchBarEvent {
  previousValue;
}
class SearchBarEnterKeyEvent extends SearchBarEvent {
}
class SearchBarClickEvent extends SearchBarEvent {
}
class SearchBarBlurEvent extends SearchBarEvent {
}
export {
  SearchBar,
  SearchBarOptions
};
//# sourceMappingURL=searchBar.js.map
