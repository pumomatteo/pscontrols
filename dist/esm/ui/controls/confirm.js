import { TextAlignEnum, createWindow, WindowFooterItemTypeEnum, ButtonModeEnum, puma } from "../vr.js";
import { VrControlsEvent } from "../common.js";
class ConfirmOptions {
  textOkButton;
  textCancelButton;
  content;
  title;
  width;
  height;
  textAlign;
  css;
  cssContainer;
}
class Confirm {
  _window;
  _options;
  constructor(text, options) {
    if (options == null)
      options = new ConfirmOptions();
    if (options.textOkButton == null) options.textOkButton = "Conferma";
    if (options.textCancelButton == null) options.textCancelButton = "Annulla";
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
    this._window = createWindow(
      {
        addToControlList: false,
        closeable: false,
        title: options.title,
        width: options.width,
        height: options.height,
        removeOnClose: true,
        content: "<div class='contentContainer'>" + content + "</div>",
        cssContainer: "height: auto !important;",
        css: "height: auto !important;" + textAlign,
        footer: [
          { type: WindowFooterItemTypeEnum.Custom, text: options.textCancelButton, value: "close", cssContainer: "width: Calc(50% - 5px);", css: "width: 100%;", onClick: () => this.close() },
          { type: WindowFooterItemTypeEnum.Custom, text: options.textOkButton, value: "ok", cssContainer: "width: Calc(50% - 5px);", css: "width: 100%;", mode: ButtonModeEnum.Primary }
        ],
        onContentLoaded: (e) => this.onContentLoaded(puma(e.sender.element()).find(".contentContainer")[0])
      }
    );
    if (options.cssContainer != null)
      this._window.container().style.cssText += options.cssContainer + ";";
    if (options.css != null)
      this._window.element().style.cssText += options.css + ";";
    puma(this._window.element()).addClass("vrConfirm");
    puma(this._window.container()).addClass("vrConfirmContainer");
    window.setTimeout(() => puma(this._window.footerItem("ok").element()).focus());
  }
  open() {
    let promise = new Promise((okCallback, cancelCallback) => {
      this._window.open(
        [
          {
            value: "ok",
            callback: () => {
              if (okCallback != null)
                okCallback();
              this.close();
            }
          },
          {
            value: "close",
            callback: () => {
              if (cancelCallback != null)
                cancelCallback();
              console.log();
            }
          }
        ]
      );
    });
    return promise;
  }
  close() {
    this._window.close();
    puma(this._window.container()).remove();
    puma(this._window.background()).remove();
  }
  getOptions() {
    return this._options;
  }
  onContentLoaded(contentElement) {
    let options = this.getOptions();
    if (options.onContentLoaded != null) {
      let contentLoadedEvent = new ContentConfirmLoadedEvent();
      contentLoadedEvent.sender = this;
      contentLoadedEvent.contentElement = contentElement;
      options.onContentLoaded(contentLoadedEvent);
    }
  }
}
class ContentConfirmLoadedEvent extends VrControlsEvent {
  sender;
  contentElement;
}
export {
  Confirm,
  ConfirmOptions
};
//# sourceMappingURL=confirm.js.map
