import { Dictionary } from "./dictionary.js";
class ControlManager {
  static _dictionaryControls = new Dictionary();
  static add(control) {
    if (control.options().addToControlList === true && control.id() != null && control.id() != "")
      this._dictionaryControls.set(control.id(), control);
  }
  static get(controlId) {
    return this._dictionaryControls.get(controlId);
  }
  static remove(controlId) {
    if (controlId != "" && controlId != null)
      this._dictionaryControls.delete(controlId);
  }
}
export {
  ControlManager
};
//# sourceMappingURL=controlManager.js.map
