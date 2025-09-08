import { TextAlignEnum, createWindow, ButtonModeEnum, WindowFooterItemTypeEnum, puma } from "../vr.js";
import { VrControlsEvent } from "../common.js";
class AlertOptions {
  textOkButton;
  content;
  title;
  width;
  height;
  textAlign;
  css;
  cssContainer;
}
class Alert {
  _window;
  _options;
  constructor(text, options) {
    if (options == null)
      options = new AlertOptions();
    if (options.textOkButton == null) options.textOkButton = "Ok";
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
          { type: WindowFooterItemTypeEnum.Ok, text: options.textOkButton, value: "ok", cssContainer: "width: 100%;", css: "width: 100%;", mode: ButtonModeEnum.Primary, onClick: () => this.close() }
        ],
        onContentLoaded: (e) => this.onContentLoaded(puma(e.sender.element()).find(".contentContainer")[0])
      }
    );
    if (options.cssContainer != null)
      this._window.container().style.cssText += options.cssContainer + ";";
    if (options.css != null)
      this._window.element().style.cssText += options.css + ";";
    puma(this._window.element()).addClass("vrAlert");
    puma(this._window.container()).addClass("vrAlertContainer");
    window.setTimeout(() => puma(this._window.footerItem("ok").element()).focus());
  }
  open() {
    let promise = new Promise((okCallback) => {
      this._window.open(
        [
          {
            value: "ok",
            callback: () => {
              if (okCallback != null)
                okCallback();
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
      let contentLoadedEvent = new ContentAlertLoadedEvent();
      contentLoadedEvent.sender = this;
      contentLoadedEvent.contentElement = contentElement;
      options.onContentLoaded(contentLoadedEvent);
    }
  }
}
class ContentAlertLoadedEvent extends VrControlsEvent {
  sender;
  contentElement;
}
export {
  Alert,
  AlertOptions
};
//# sourceMappingURL=alert.js.map
