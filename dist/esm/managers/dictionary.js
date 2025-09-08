import { UtilityManager } from "./utilityManager.js";
class KeyValuePair {
  key;
  value;
}
class Dictionary {
  items;
  _map;
  get map() {
    if (this._map == null)
      this._map = this.asMap();
    return this._map;
  }
  constructor() {
    this.items = [];
  }
  asMap() {
    return new Map(this.items.map((k) => [k.key, k.value]));
  }
  static fromMap(map) {
    let dict = new Dictionary();
    for (let item of map) {
      let pair = new KeyValuePair();
      pair.key = item[0];
      pair.value = item[1];
      dict.items.push(pair);
    }
    dict._map = map;
    return dict;
  }
  static parse(dict) {
    let ret = new Dictionary();
    ret.items = dict.items;
    return ret;
  }
  get(key) {
    return this.map.get(key);
  }
  set(key, value) {
    let item = this.items.find((k) => k.key == key);
    if (item == null) {
      item = new KeyValuePair();
      item.key = key;
    }
    item.value = value;
    this.map.set(key, value);
    this.items.push(item);
  }
  //#region Utility
  has(key) {
    return this.map.has(key);
  }
  delete(key) {
    let itemToDelete = this.items.find((k) => k.key == key);
    if (itemToDelete != null)
      this.items.vrDeleteItem(itemToDelete, "key");
    this.map.delete(key);
  }
  changeKey(oldKey, newKey) {
    let oldItems = UtilityManager.duplicate(this.get(oldKey));
    this.delete(oldKey);
    this.set(newKey, oldItems);
  }
  keys() {
    return this.items.map((k) => k.key);
  }
  //#endregion
}
export {
  Dictionary,
  KeyValuePair
};
//# sourceMappingURL=dictionary.js.map
