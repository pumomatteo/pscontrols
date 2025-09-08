import { TextAlignEnum, createWindow, puma } from "../vr.js";
import { VrControlsEvent } from "../common.js";
class DialogOptions {
  content;
  title;
  width;
  height;
  textAlign;
  footerItems;
  css;
  cssContainer;
  hideCloseIcon;
  onClose;
}
class Dialog {
  _window;
  _options;
  constructor(text, options) {
    if (options == null)
      options = new DialogOptions();
    if (options.width == null) options.width = 300;
    if (options.height == null) options.height = 120;
    if (options.textAlign == null) options.textAlign = TextAlignEnum.Center;
    this._options = options;
    let content = "";
    if (options.content == null && text == null) options.content = "<div></div>";
    if (options.content != null)
      content = options.content;
    else if (text != null)
      content = text;
    let textAlign = "";
    switch (options.textAlign) {
      case TextAlignEnum.Left:
        textAlign = "text-align: left;";
        break;
      case TextAlignEnum.Center:
        textAlign = "text-align: center;";
        break;
      case TextAlignEnum.Right:
        textAlign = "text-align: right;";
        break;
    }
    if (options.footerItems != null) {
      let totalWidth = options.footerItems.filter((k) => k.width != null).map((k) => k.width).vrSum();
      let noWidthItems = options.footerItems.filter((k) => k.width == null);
      let widthItems = options.footerItems.filter((k) => k.width != null);
      let footerAvailableWidth = options.width - 10 - widthItems.length * 5 - totalWidth;
      let singleItemWidth = footerAvailableWidth / options.footerItems.length - 5;
      if (noWidthItems.length > 0)
        singleItemWidth = footerAvailableWidth / noWidthItems.length - 5;
      for (let footerItem of options.footerItems) {
        if (footerItem.width == null)
          footerItem.width = singleItemWidth;
      }
    }
    this._window = createWindow(
      {
        addToControlList: false,
        closeable: false,
        removeOnClose: true,
        hideCloseIcon: options.hideCloseIcon,
        title: options.title,
        width: options.width,
        height: options.height,
        content: "<div class='contentContainer'>" + content + "</div>",
        cssContainer: "height: auto !important;",
        css: "height: auto !important;" + textAlign,
        footer: options.footerItems,
        onContentLoaded: (e) => this.onContentLoaded(puma(e.sender.element()).find(".contentContainer")[0]),
        onClose: () => {
          if (options.onClose != null)
            options.onClose();
        }
      }
    );
    if (options.cssContainer != null)
      this._window.container().style.cssText += options.cssContainer + ";";
    if (options.css != null)
      this._window.element().style.cssText += options.css + ";";
    puma(this._window.element()).addClass("vrDialog");
    puma(this._window.container()).addClass("vrDialogContainer");
  }
  open() {
    this._window.open();
  }
  close() {
    this._window.close();
    puma(this._window.container()).remove();
    puma(this._window.background()).remove();
  }
  window() {
    return this._window;
  }
  getOptions() {
    return this._options;
  }
  onContentLoaded(contentElement) {
    let options = this.getOptions();
    if (options.onContentLoaded != null) {
      let contentLoadedEvent = new ContentDialogLoadedEvent();
      contentLoadedEvent.sender = this;
      contentLoadedEvent.contentElement = contentElement;
      options.onContentLoaded(contentLoadedEvent);
    }
  }
}
class ContentDialogLoadedEvent extends VrControlsEvent {
  sender;
  contentElement;
}
export {
  Dialog,
  DialogOptions
};
//# sourceMappingURL=dialog.js.map
