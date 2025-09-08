import { UtilityManager } from "../../managers/utilityManager.js";
import { VrControl, VrControlOptions, VrControlsEvent } from "../common.js";
import { OrientationEnum, ControlTypeEnum, createCheckBox, puma } from "../vr.js";
class CheckBoxListOptions extends VrControlOptions {
  items;
  orientation;
  allChecked;
  listName;
  marginBetween;
}
class CheckBoxList extends VrControl {
  _checkboxControls;
  _items;
  constructor(element, options) {
    if (options == null)
      options = new CheckBoxListOptions();
    if (options.orientation == null) options.orientation = OrientationEnum.Horizontal;
    if (options.items == null) options.items = [];
    if (options.listName == null) options.listName = element.id + "_CheckboxListName";
    if (options.marginBetween == null) options.marginBetween = 10;
    super(element, options, ControlTypeEnum.CheckBoxList);
    this._checkboxControls = [];
    this.items(options.items);
  }
  //#region Methos
  items(items) {
    let options = this.getOptions();
    if (items != null) {
      this._items = items;
      let i = 0;
      for (let item of items) {
        let checkBox = createCheckBox(
          {
            text: item.text,
            value: item.value == null ? item.text : String(item.value),
            name: options.listName,
            checked: options.allChecked ? true : item.checked,
            tag: item.tag,
            cssContainer: options.orientation == OrientationEnum.Horizontal && i > 0 ? "margin-left: " + options.marginBetween + "px;" : options.orientation == OrientationEnum.Vertical ? "width: 100%" : "",
            onCheck: (e) => {
              if (options.onBeforeSelect != null) {
                let selectEvent = new CheckBoxListSelectEvent();
                selectEvent.sender = this;
                selectEvent.value = String(item.value);
                selectEvent.checked = e.checked;
                selectEvent.checkedValues = this.value();
                options.onBeforeSelect(selectEvent);
                if (selectEvent.isDefaultPrevented())
                  return;
              }
              if (item.onCheck != null)
                item.onCheck(e);
              if (options.onSelect != null) {
                let selectEvent = new CheckBoxListSelectEvent();
                selectEvent.sender = this;
                selectEvent.value = String(item.value);
                selectEvent.checked = e.checked;
                selectEvent.checkedValues = this.value();
                options.onSelect(selectEvent);
              }
            }
          },
          this.element()
        );
        this._checkboxControls.push(checkBox);
        i++;
      }
    }
    return this._items;
  }
  checkAll(triggerChange = false) {
    for (let checkbox of this._checkboxControls)
      checkbox.checked(true, triggerChange);
  }
  unCheckAll(triggerChange = false) {
    for (let checkbox of this._checkboxControls)
      checkbox.checked(false, triggerChange);
  }
  value(values, state = true, triggerChange = true) {
    if (values != null) {
      for (let value of values) {
        let checkbox = this._checkboxControls.filter((k) => puma(k.element()).attr("value") == value)[0];
        if (checkbox != null)
          checkbox.checked(state, triggerChange);
      }
    }
    return this._checkboxControls.filter((k) => k.checked()).map((k) => puma(k.element()).attr("value"));
  }
  valueTag(tagList, state = true, triggerChange = true) {
    if (tagList != null) {
      for (let tag of tagList) {
        let checkbox = this._checkboxControls.filter((k) => UtilityManager.equals(k.tag(), tag))[0];
        if (checkbox != null)
          checkbox.checked(state, triggerChange);
      }
    }
    return this._checkboxControls.filter((k) => k.checked()).map((k) => k.tag());
  }
  isChecked(value) {
    let checkBox = this._checkboxControls.filter((k) => puma(k.element()).attr("value") == value)[0];
    if (checkBox != null)
      return checkBox.checked();
    return false;
  }
  text(value, text) {
    let checkBox = this._checkboxControls.filter((k) => puma(k.element()).attr("value") == value)[0];
    if (checkBox != null)
      return checkBox.text(text);
    return "";
  }
  clear(checkAll = false, triggerChange = false) {
    if (checkAll)
      this.checkAll(triggerChange);
    else
      this.unCheckAll(triggerChange);
  }
  clearItems() {
    this._checkboxControls = [];
    puma(this.element()).empty();
  }
  getOptions() {
    return this.options();
  }
  enable() {
    super.enable();
    for (let checkbox of this._checkboxControls)
      checkbox.enable();
  }
  disable() {
    super.disable();
    for (let checkbox of this._checkboxControls)
      checkbox.disable();
  }
  //#endregion
}
class CheckBoxListSelectEvent extends VrControlsEvent {
  sender;
  checkedValues;
  value;
  checked;
}
export {
  CheckBoxList,
  CheckBoxListOptions
};
//# sourceMappingURL=checkboxList.js.map
