import { UtilityManager } from "../../managers/utilityManager.js";
import { VrControl, VrControlOptions, VrControlsEvent } from "../common.js";
import { OrientationEnum, ControlTypeEnum, createRadioButton, puma } from "../vr.js";
class RadioButtonListOptions extends VrControlOptions {
  items;
  orientation;
  listName;
}
class RadioButtonList extends VrControl {
  _radioControls;
  _items;
  constructor(element, options) {
    if (options == null)
      options = new RadioButtonListOptions();
    if (options.orientation == null) options.orientation = OrientationEnum.Horizontal;
    if (options.items == null) options.items = [];
    if (options.listName == null) options.listName = element.id + "_RadioButtonListName";
    super(element, options, ControlTypeEnum.RadioButtonList);
    this._radioControls = [];
    this.items(options.items);
    if (this.value() == "")
      this.clear();
  }
  //#region Methods
  items(items) {
    let options = this.getOptions();
    if (items != null) {
      this._items = items;
      let i = 0;
      for (let item of items) {
        let radioButton = createRadioButton(
          {
            text: item.text,
            value: item.value == null ? item.text : String(item.value),
            name: options.listName,
            checked: item.checked,
            tag: item.tag,
            cssContainer: options.orientation == OrientationEnum.Horizontal && i > 0 ? "margin-left: 10px;" : options.orientation == OrientationEnum.Vertical ? "width: 100%" : "",
            onCheck: (e) => {
              if (options.onBeforeSelect != null) {
                let selectEvent = new RadioButtonListSelectEvent();
                selectEvent.sender = this;
                selectEvent.value = String(item.value);
                options.onBeforeSelect(selectEvent);
                if (selectEvent.isDefaultPrevented())
                  return;
              }
              if (item.onCheck != null)
                item.onCheck(e);
              if (options.onSelect != null) {
                let selectEvent = new RadioButtonListSelectEvent();
                selectEvent.sender = this;
                selectEvent.value = String(item.value);
                options.onSelect(selectEvent);
              }
            }
          },
          this.element()
        );
        this._radioControls.push(radioButton);
        i++;
      }
    }
    return this._items;
  }
  value(value, triggerChange = true) {
    if (value != null) {
      let radioButton = this._radioControls.filter((k) => puma(k.element()).attr("value") == String(value))[0];
      if (radioButton != null)
        radioButton.checked(true, triggerChange);
    }
    let checkedRadio = this._radioControls.filter((k) => k.checked())[0];
    if (checkedRadio != null)
      return puma(checkedRadio.element()).attr("value");
    else
      return "";
  }
  valueTag(tag, triggerChange = true) {
    if (tag != null) {
      let radioButton = this._radioControls.filter((k) => UtilityManager.equals(k.tag(), tag))[0];
      if (radioButton != null)
        radioButton.checked(true, triggerChange);
    }
    let checkedRadio = this._radioControls.filter((k) => k.checked())[0];
    if (checkedRadio != null)
      return checkedRadio.tag();
    else
      return "";
  }
  text(value, text) {
    let radioButton = this._radioControls.filter((k) => puma(k.element()).attr("value") == value)[0];
    if (radioButton != null)
      return radioButton.text(text);
    return "";
  }
  clear(triggerChange = false) {
    for (let radioButton of this._radioControls)
      radioButton.checked(false, triggerChange);
  }
  clearItems() {
    this._radioControls = [];
    puma(this.element()).empty();
  }
  getOptions() {
    return this.options();
  }
  enable() {
    super.enable();
    for (let radio of this._radioControls)
      radio.enable();
  }
  disable() {
    super.disable();
    for (let radio of this._radioControls)
      radio.disable();
  }
  //#endregion
}
class RadioButtonListSelectEvent extends VrControlsEvent {
  sender;
  value;
}
export {
  RadioButtonList,
  RadioButtonListOptions
};
//# sourceMappingURL=radioButtonList.js.map
