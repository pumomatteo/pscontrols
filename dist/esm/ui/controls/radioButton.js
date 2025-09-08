import { VrControl, VrControlOptions } from "../common.js";
import { puma, ControlTypeEnum } from "../vr.js";
class RadioButtonOptions extends VrControlOptions {
  text;
  value;
  checked;
  name;
}
class RadioButton extends VrControl {
  constructor(element, options) {
    if (options == null)
      options = new RadioButtonOptions();
    if (options.text == null) options.text = "";
    if (options.checked == null) options.checked = false;
    puma(element).attr("type", "radio");
    super(element, options, ControlTypeEnum.RadioButton);
    if (options.value == null) options.value = options.text;
    if (options.value != null)
      puma(this.element()).attr("value", options.value);
    if (options.name != null)
      puma(this.element()).attr("name", options.name);
    let labelContainer = puma("<label class='vrRadioButtonLabelContainer'></label>").vrAppendToPuma(this.container());
    puma(this.element()).vrAppendToPuma(labelContainer);
    puma("<span class='vrRadioButtonCheckMark'></span>").vrAppendToPuma(labelContainer);
    let lblRadioButton = puma("<label class='vrRadioButtonLabel'>" + options.text + "</label>").vrAppendToPuma(this.container());
    if (options.checked === true)
      this.checked(true, false);
    puma(this.element()).on("click", (e) => {
      let radioButton = e.currentTarget;
      let checked = radioButton.checked;
      this.checked(checked);
    });
    puma(lblRadioButton).on("click", (e) => {
      let lblRadioButtonContainer = puma(lblRadioButton).prev();
      let input = lblRadioButtonContainer.find("input")[0];
      if (!input.checked)
        input.checked = true;
      let checked = input.checked;
      this.checked(checked);
    });
  }
  //#region Methods
  checked(state, triggerChange = true) {
    if (state != null) {
      this.element().checked = state;
      if (triggerChange) {
        let options = this.getOptions();
        if (options.onCheck != null) {
          let event = new RadioButtonCheckEvent();
          event.sender = this;
          event.checked = state;
          options.onCheck(event);
        }
      }
    }
    return this.element().checked;
  }
  text(text) {
    if (text != null)
      puma(this.container()).find(".vrRadioButtonLabel").html(text);
    return puma(this.container()).find(".vrRadioButtonLabel").html();
  }
  clear(triggerChange = false) {
    this.checked(false, triggerChange);
  }
  getOptions() {
    return this.options();
  }
  enable() {
    super.enable();
    puma(this.container()).removeClass("vrRadioButtonListDisabled");
  }
  disable() {
    super.disable();
    puma(this.container()).addClass("vrRadioButtonListDisabled");
  }
  //#endregion
}
class RadioButtonEvent {
  sender;
}
class RadioButtonCheckEvent extends RadioButtonEvent {
  checked;
}
export {
  RadioButton,
  RadioButtonCheckEvent,
  RadioButtonOptions
};
//# sourceMappingURL=radioButton.js.map
