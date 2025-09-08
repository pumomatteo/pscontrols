import { ControlTypeEnum, puma, IconClassicSolid, openBrowserWindow } from "../vr.js";
import { VrControl, VrControlsEvent, VrControlOptions } from "../common.js";
class MenuOptions extends VrControlOptions {
  items;
  showValueInDom;
  showParentValueInDom;
  onClick;
}
class Menu extends VrControl {
  //#region Variables
  _items;
  _value;
  //#endregion
  constructor(element, options) {
    if (options == null)
      options = new MenuOptions();
    if (options.width == null) options.width = "100%";
    if (options.height == null) options.height = "100%";
    if (options.showValueInDom == null) options.showValueInDom = false;
    if (options.showParentValueInDom == null) options.showParentValueInDom = false;
    super(element, options, ControlTypeEnum.Menu);
    this._items = /* @__PURE__ */ new Map();
    this.container().style.cssText += "align-items: start;";
    this.element().style.cssText += "overflow-y: auto;";
    if (options.items != null && options.items.length > 0)
      this.items(options.items);
  }
  //#region Methods
  clear() {
    this._items.clear();
    this._value = "";
    puma(this.element()).empty();
  }
  items(items) {
    if (items != null && items.length > 0) {
      items.forEach((menuItem) => this._items.set(menuItem, document.createElement("div")));
      items = items.filter((k) => k.parentValue == null || k.parentValue == "");
      this.drawItems(items, this.element(), 0);
    }
    return Array.from(this._items.keys());
  }
  itemsMap() {
    return this._items;
  }
  value(value) {
    if (value != null && value != "") {
      this._value = value;
      let menuItem = this.items().find((k) => k.value == value);
      if (menuItem != null) {
        let menuItemElement = this.itemsMap().get(menuItem);
        if (menuItemElement != null) {
          menuItemElement.click();
          this.openParents(value);
        }
      }
    }
    return this._value;
  }
  openParents(value) {
    const item = this.items().find((k) => k.value == value);
    if (item != null) {
      if (item.parentValue == null || item.parentValue == "")
        return;
      let parentItem = this.items().find((k) => k.value == item.parentValue);
      if (parentItem != null) {
        let parentItemElement = this.itemsMap().get(parentItem);
        if (parentItemElement != null)
          parentItemElement.click();
        this.openParents(parentItem.value);
      }
    }
  }
  drawItems(items, elementToAppend, level) {
    let options = this.getOptions();
    if (items.length == 0)
      return;
    for (let item of items) {
      let menuBlock = document.createElement("div");
      menuBlock.setAttribute("level", String(level));
      menuBlock.classList.add("vrMenuBlock");
      menuBlock.style.cssText += "padding-left: " + (level * 20 + 10) + "px;";
      elementToAppend.appendChild(menuBlock);
      this._items.set(item, menuBlock);
      if (level > 0)
        menuBlock.classList.add("vrMenuBlockChild");
      if (item.hidden)
        menuBlock.style.cssText += "display: none;";
      if (options.showValueInDom && item.value != null)
        menuBlock.setAttribute("value", String(item.value));
      if (options.showParentValueInDom && item.value != null)
        menuBlock.setAttribute("value", String(item.parentValue));
      menuBlock.onclick = (e) => {
        let iconCaret = puma(menuBlock).find(".vrMenuIconCaret")[0];
        if (iconCaret != null) {
          const toShow = iconCaret.classList.contains(IconClassicSolid.CaretRight.split(" ")[1]);
          let blockChildren = this.getChildrenBlocks(menuBlock, toShow);
          if (blockChildren.length > 0) {
            if (toShow) {
              menuBlock.classList.add("opened");
              iconCaret.classList.remove(IconClassicSolid.CaretRight.split(" ")[1]);
              iconCaret.classList.add(IconClassicSolid.CaretDown.split(" ")[1]);
              blockChildren.forEach((k) => k.style.display = "block");
            } else {
              menuBlock.classList.remove("opened");
              iconCaret.classList.remove(IconClassicSolid.CaretDown.split(" ")[1]);
              iconCaret.classList.add(IconClassicSolid.CaretRight.split(" ")[1]);
              blockChildren.forEach((k) => {
                k.style.display = "none";
                k.classList.remove("opened");
                let childIconCaret = puma(k).find(".vrMenuIconCaret")[0];
                if (childIconCaret != null) {
                  childIconCaret.classList.remove(IconClassicSolid.CaretDown.split(" ")[1]);
                  childIconCaret.classList.add(IconClassicSolid.CaretRight.split(" ")[1]);
                }
              });
            }
          }
        } else {
          Array.from(this.itemsMap().values()).forEach((k) => k.classList.remove("selected"));
          menuBlock.classList.add("selected");
        }
        if (item.onClick != null) {
          let onClickEvent = new MenuOnClickEvent();
          onClickEvent.sender = this;
          onClickEvent.dataItem = item;
          item.onClick(onClickEvent);
        } else if (options.onClick != null) {
          let onClickEvent = new MenuOnClickEvent();
          onClickEvent.sender = this;
          onClickEvent.dataItem = item;
          options.onClick(onClickEvent);
        } else if (item.url != null) {
          openBrowserWindow(item.url);
        } else if (item.urlSettings != null) {
          if (item.urlSettings.newTab == null) item.urlSettings.newTab = false;
          openBrowserWindow(item.urlSettings.url, item.urlSettings.newTab);
        }
      };
      let text = document.createElement("span");
      text.innerHTML = item.text;
      menuBlock.appendChild(text);
      if (item.icon != null) {
        let icon = document.createElement("i");
        icon.classList.add("vrMenuIcon");
        icon.classList.add(...item.icon.split(" "));
        menuBlock.prepend(icon);
      }
      let children = this.getOnlyChildrenItems(item);
      if (children.length > 0) {
        menuBlock.classList.add("vrMenuBlockParent");
        let iconCaret = document.createElement("i");
        iconCaret.classList.add("vrMenuIconCaret");
        iconCaret.classList.add(...IconClassicSolid.CaretRight.split(" "));
        menuBlock.appendChild(iconCaret);
        this.drawItems(children, elementToAppend, level + 1);
      }
    }
  }
  getChildrenBlocks(menuBlock, toShow = true) {
    const level = Number(menuBlock.getAttribute("level"));
    const children = [];
    puma(menuBlock).nextAll().each((index, element) => {
      const childrenLevel = Number(element.getAttribute("level"));
      if (toShow) {
        if (level + 1 == childrenLevel)
          children.push(element);
        else if (level == childrenLevel)
          return false;
      } else {
        if (level < childrenLevel)
          children.push(element);
        else
          return false;
      }
      return;
    });
    return children;
  }
  getOnlyChildrenItems(parentItem) {
    return Array.from(this.items().filter((k) => k.parentValue != null && k.parentValue != "" && k.parentValue == parentItem.value));
  }
  getOptions() {
    return this.options();
  }
  //#endregion
}
class MenuOnClickEvent extends VrControlsEvent {
  sender;
  dataItem;
}
export {
  Menu,
  MenuOnClickEvent,
  MenuOptions
};
//# sourceMappingURL=menu.js.map
