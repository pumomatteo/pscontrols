import { VrControl, VrControlOptions } from "../common.js";
import { puma, ControlTypeEnum, createLabel, CheckboxStateEnum, ErrorPositionEnum } from "../vr.js";
import { DeviceManager } from "../../managers/deviceManager.js";
class CheckBoxOptions extends VrControlOptions {
  text;
  value;
  threeState;
  checked;
  name;
  tooltip;
}
class CheckBox extends VrControl {
  constructor(element, options) {
    if (options == null)
      options = new CheckBoxOptions();
    if (options.text == null) options.text = "";
    if (options.checked == null) options.checked = false;
    if (options.threeState == null) options.threeState = false;
    puma(element).attr("type", "checkbox");
    let userWidth = options.width;
    options.width = void 0;
    super(element, options, ControlTypeEnum.CheckBox);
    if (userWidth != null) {
      if (typeof userWidth == "number")
        userWidth = userWidth + "px";
      this.container().style.cssText += "width: " + userWidth + ";";
    }
    let label = createLabel(
      {
        text: options.text,
        cssContainer: "position: relative; top: -1px;",
        class: "vrCheckBoxLabel",
        width: "100%",
        tooltip: options.tooltip
      },
      this.container()
    );
    puma(label.element()).attr("for", element.id);
    if (options.value == null) options.value = options.text;
    if (options.value != null)
      puma(this.element()).attr("value", options.value);
    if (options.name != null)
      puma(this.element()).attr("name", options.name);
    if (options.tooltip != null)
      puma(this.element()).attr("title", options.tooltip);
    if (options.checked === true)
      this.checked(CheckboxStateEnum.Checked, false);
    else if (options.threeState)
      this.checked(CheckboxStateEnum.Undefined, false);
    puma(this.element()).click((e) => {
      this.hideError();
      let checkbox = e.currentTarget;
      let checked = checkbox.checked;
      let state = null;
      if (!options.threeState) {
        if (checkbox.checked)
          state = CheckboxStateEnum.Checked;
        else
          state = CheckboxStateEnum.Unchecked;
      } else {
        if (checkbox.checked && !puma(this.element()).hasClass("indeterminateVrCheckbox")) {
          puma(this.element()).addClass("indeterminateVrCheckbox");
          state = CheckboxStateEnum.Undefined;
          e.preventDefault();
        } else {
          puma(this.element()).removeClass("indeterminateVrCheckbox");
          state = checked ? CheckboxStateEnum.Checked : CheckboxStateEnum.Unchecked;
        }
      }
      if (options.onCheck != null) {
        let event = new CheckBoxCheckEvent();
        event.sender = this;
        event.checked = checked;
        event.stateEnum = state;
        event.shiftKey = e.shiftKey;
        event.ctrlKey = e.ctrlKey;
        options.onCheck(event);
      }
    });
  }
  //#region Methods
  checked(state, triggerChange = true) {
    if (state != null) {
      this.hideError();
      let checkedBoolean = true;
      let checkedState = CheckboxStateEnum.Checked;
      puma(this.element()).removeClass("indeterminateVrCheckbox");
      if (typeof state === "boolean") {
        this.element().checked = state;
        checkedBoolean = state;
        checkedState = state ? CheckboxStateEnum.Checked : CheckboxStateEnum.Unchecked;
      } else {
        checkedState = state;
        if (state == CheckboxStateEnum.Checked) {
          this.element().checked = true;
          checkedBoolean = true;
        } else {
          this.element().checked = false;
          checkedBoolean = false;
          if (state == CheckboxStateEnum.Undefined)
            puma(this.element()).addClass("indeterminateVrCheckbox");
        }
      }
      if (triggerChange) {
        let options = this.getOptions();
        if (options.onCheck != null) {
          let event = new CheckBoxCheckEvent();
          event.sender = this;
          event.checked = checkedBoolean;
          event.stateEnum = checkedState;
          options.onCheck(event);
        }
      }
    }
    if (puma(this.element()).hasClass("indeterminateVrCheckbox"))
      return null;
    else
      return this.element().checked;
  }
  check() {
    puma(this.element()).click();
  }
  text(text) {
    if (text != null)
      puma(this.container()).find(".vrCheckBoxLabel").html(text);
    return puma(this.container()).find(".vrCheckBoxLabel").html();
  }
  clear(triggerChange = false) {
    let options = this.getOptions();
    if (options.threeState)
      this.checked(CheckboxStateEnum.Undefined, triggerChange);
    else
      this.checked(false, triggerChange);
  }
  getOptions() {
    return this.options();
  }
  //#region Error management
  error(text, position, showIcon = false) {
    this.options();
    if (position == null) position = ErrorPositionEnum.Right;
    if (text == null) text = "";
    puma(this.element()).addClass("vrCheckBoxError");
    let errorIcon = puma(this.container()).find(".vrCheckBoxErrorIcon")[0];
    if (errorIcon == null && !DeviceManager.isMobile())
      errorIcon = puma("<i class='fa fa-exclamation-triangle vrCheckBoxErrorIcon'></i>").vrInsertAfterPuma(puma(this.container()).find(".vrCheckBoxLabel"))[0];
    if (showIcon)
      puma(errorIcon).show();
    else
      puma(errorIcon).hide();
    let spanError = puma("<span class='vrCheckBoxErrorTooltip vrErrorTooltip'>" + text + "</span>").vrAppendToPuma(errorIcon);
    if (position == ErrorPositionEnum.Right)
      puma(spanError).addClass("vrCheckBoxErrorTooltipRight");
    else if (position == ErrorPositionEnum.Bottom) {
      puma(spanError).addClass("vrCheckBoxErrorTooltipBottom");
      puma(errorIcon).hover(() => puma(spanError)[0].style.cssText += "left: -" + (puma(spanError).outerWidth() / 2 - 7) + "px;");
    }
  }
  hideError() {
    puma(this.element()).removeClass("vrCheckBoxError");
    puma(this.container()).find(".vrCheckBoxErrorIcon").hide();
    puma(this.container()).find(".vrCheckBoxErrorTooltip").hide();
  }
  //#endregion
  //#endregion
}
class CheckBoxEvent {
  sender;
}
class CheckBoxCheckEvent extends CheckBoxEvent {
  stateEnum;
  checked;
  shiftKey;
  ctrlKey;
}
export {
  CheckBox,
  CheckBoxCheckEvent,
  CheckBoxOptions
};
//# sourceMappingURL=checkbox.js.map
