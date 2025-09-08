import { VrControl, VrControlsEvent, VrControlOptions } from "../common.js";
import { WindowFooterItemTypeEnum, WindowAutoSizeDirectionEnum, ControlTypeEnum, puma, ColorSettings, TextAlignEnum, createLabel, IconClassicRegular, WindowFooterItemAlignEnum, ButtonModeEnum, createButton, createSeparator, createSplitButton, createSwitch, createButtonGroup, SelectionModeEnum, createCheckBox, createComboBox, createDatePicker, createTextBox } from "../vr.js";
import { UtilityManager } from "../../managers/utilityManager.js";
import { ControlManager } from "../../managers/controlManager.js";
import { DeviceManager } from "../../managers/deviceManager.js";
import { LoaderManager } from "../../managers/loaderManager.js";
import { ComboBoxOptions } from "./comboBox.js";
import { DatePickerOptions } from "./datePicker.js";
import { TextBoxOptions } from "./textbox.js";
class WindowOptions extends VrControlOptions {
  maximized;
  padding;
  modal;
  closeable;
  hideCloseIcon;
  removeOnClose;
  title;
  footer;
  draggable;
  position;
  content;
  iframe;
  loader;
  autoSize;
  cssHeader;
  scrollable;
}
class Window extends VrControl {
  _divHeader;
  _divFooter;
  _callbackFooterItems;
  _openCloseCallback;
  _additionalCloseCallbacks;
  _additionalOpenCallbacks;
  _additionalContentLoadedCallbacks;
  _background;
  _iframe;
  _animateAutosize;
  constructor(element, options) {
    if (options == null)
      options = new WindowOptions();
    if (options.width == null) options.width = 500;
    if (options.height == null) options.height = 500;
    if (options.padding == null) options.padding = 10;
    if (options.modal == null) options.modal = true;
    if (options.closeable == null) options.closeable = true;
    if (options.hideCloseIcon == null) options.hideCloseIcon = false;
    if (options.draggable == null) options.draggable = true;
    if (options.iframe == null) options.iframe = false;
    if (options.loader == null) options.loader = false;
    if (options.title == null) options.title = false;
    if (options.removeOnClose == null) options.removeOnClose = false;
    if (options.scrollable == null) options.scrollable = false;
    if (options.footer == null || options.footer === true) options.footer = [
      { type: WindowFooterItemTypeEnum.Close, value: "close" },
      { type: WindowFooterItemTypeEnum.Ok, value: "ok" }
    ];
    if (options.autoSize == null) options.autoSize = false;
    if (options.autoSize === true) options.autoSize = WindowAutoSizeDirectionEnum.Height;
    if (options.maximized == null) DeviceManager.isMobile() ? options.maximized = true : options.maximized = false;
    if (options.maximized !== false) {
      if (typeof options.maximized === "boolean") {
        options.width = "Calc(100% - 30px)";
        options.height = "Calc(100% - 30px)";
      } else {
        if (options.maximized.padding === true) {
          options.width = "Calc(100% - 30px)";
          options.height = "Calc(100% - 30px)";
        } else {
          options.width = "100%";
          options.height = "100%";
        }
      }
    }
    super(element, options, ControlTypeEnum.Window);
    puma(this.container()).hide();
    this._additionalCloseCallbacks = [];
    this._additionalOpenCallbacks = [];
    this._additionalContentLoadedCallbacks = [];
    if (options.title !== false) {
      if (options.title === true) options.title = "";
      let title = "";
      if (typeof options.title == "string") {
        title = options.title;
        options.title = new WindowTitleSettings();
      }
      if (options.title.text == null) options.title.text = title;
      if (options.title.fontSize == null) options.title.fontSize = 16;
      if (options.title.colorSettings == null) options.title.colorSettings = new ColorSettings();
      if (options.title.colorSettings.textColor == null) options.title.colorSettings.textColor = "#FFF";
      if (options.title.align == null) options.title.align = TextAlignEnum.Left;
      this._divHeader = puma("<div class='vrWindowHeader'></div>").vrPrependToPuma(this.container())[0];
      if (options.cssHeader != null)
        this._divHeader.style.cssText += options.cssHeader;
      let spanWindowTitle = puma("<span class='vrWindowTitle'></span>").vrAppendToPuma(this._divHeader);
      createLabel({
        width: "100%",
        text: options.title.text,
        fontSize: options.title.fontSize,
        colorSettings: options.title.colorSettings,
        align: options.title.align,
        noBr: true
      }, spanWindowTitle);
      if (options.closeable || !options.hideCloseIcon) {
        let spanCloseIcon = puma("<span class='vrWindowCloseIcon'></span>").vrAppendToPuma(this._divHeader);
        puma(UtilityManager.createIcon(IconClassicRegular.Xmark)).vrAppendToPuma(spanCloseIcon);
        spanCloseIcon.click(() => this.close());
        if (options.hideCloseIcon)
          puma(spanCloseIcon).hide();
      }
    }
    if (options.scrollable)
      this.css("overflow-y: auto;");
    if (options.draggable) {
      puma(this._divHeader).css("cursor", "move");
      puma(this._divHeader).find(".vrWindowTitle .vrLabel").css("cursor", "move");
      puma(this._divHeader).vrDrag(
        this.container(),
        (e) => {
          if (e.event.target.classList.contains("fa-xmark")) {
            e.preventDefault();
            e.event.preventDefault();
            return;
          }
          puma(this.container()).addClass("vrWindowDragging");
          if (options.onDragStart != null) {
            let dragStartEvent = new WindowDragStartEvent();
            dragStartEvent.sender = this;
            dragStartEvent.left = e.left;
            dragStartEvent.top = e.top;
            options.onDragStart(dragStartEvent);
          }
        },
        (e) => {
          puma(this.container()).removeClass("vrWindowDragging");
          if (options.onDragEnd != null) {
            let dragEndEvent = new WindowDragEndEvent();
            dragEndEvent.sender = this;
            dragEndEvent.left = e.left;
            dragEndEvent.top = e.top;
            options.onDragEnd(dragEndEvent);
          }
        }
      );
    }
    if (options.footer) {
      this._divFooter = puma("<div class='vrWindowFooter'></div>").vrAppendToPuma(this.container())[0];
      this._divFooter.style.cssText += "margin-top: " + options.padding * 2 + "px;";
      for (let footerItem of options.footer)
        this.addFooterItem(footerItem);
    }
    if (options.iframe)
      this._iframe = puma("<iframe id='" + this.element().id + "_iframeContent' class='vrWindowIframe'></iframe>").vrAppendToPuma(this.element())[0];
    if (options.content != null)
      this.content(options.content);
  }
  //#region Methods
  open(callBackFooterItems, center = true, position) {
    let options = this.getOptions();
    this.container().style.cssText += "position: absolute;";
    if (position != null)
      this.position(position.left, position.top, position.right, position.bottom);
    else if (options.position != null)
      this.position(options.position.left, options.position.top, options.position.right, options.position.bottom);
    else if (center)
      this.center();
    if (options.maximized) {
      if (typeof options.maximized !== "boolean")
        this.maximize(options.maximized.padding);
      else
        this.maximize();
    }
    if (callBackFooterItems != null)
      this._callbackFooterItems = callBackFooterItems;
    let promise = new Promise((closeCallBack) => {
      puma(this.container()).show();
      let height = puma(this.container()).height() - options.padding * 2;
      if (options.title !== false)
        height -= puma(this._divHeader).outerHeight();
      if (options.footer)
        height -= puma(this._divFooter).outerHeight();
      this.element().style.cssText += "height: " + height + "px; width: Calc(100% - " + options.padding * 2 + "px); left: " + options.padding + "px; top: " + options.padding + "px";
      let maxZindexWindow = Array.from(puma(".vrWindowContainer")).map((k) => Number(puma(k).css("z-index"))).vrMax();
      puma(this.container()).css("z-index", maxZindexWindow + 2);
      if (options.modal) {
        if (this._background == null)
          this._background = puma("<div class='vrWindowBackground' id='vrWindowBackground_" + this.element().id + "'></div>").vrAppendToPuma(this.container().parentElement)[0];
        if (options.closeable)
          puma(this._background).click(() => this.close());
        puma(this._background).css("z-index", maxZindexWindow + 1);
      }
      if (closeCallBack != null)
        this._openCloseCallback = closeCallBack;
      if (options.onOpen != null) {
        let openEvent = new WindowOpenEvent();
        openEvent.sender = this;
        options.onOpen(openEvent);
      }
      for (let openCallback of this._additionalOpenCallbacks)
        openCallback();
    });
    return promise;
  }
  close(triggerEvents = true) {
    let options = this.getOptions();
    if (triggerEvents) {
      if (options.onBeforeClose != null) {
        let closeBeforeEvent = new WindowBeforeCloseEvent();
        closeBeforeEvent.sender = this;
        options.onBeforeClose(closeBeforeEvent);
        if (closeBeforeEvent.isDefaultPrevented())
          return;
      }
    }
    if (!options.removeOnClose)
      puma(this.container()).hide();
    else
      puma(this.container()).remove();
    puma(this._background).remove();
    this._background = null;
    if (this._callbackFooterItems != null && this._callbackFooterItems.map((k) => k.value).includes("close")) {
      let callback = this._callbackFooterItems.filter((k) => k.value == "close")[0].callback;
      if (callback != null)
        callback();
    }
    if (this._openCloseCallback != null)
      this._openCloseCallback();
    for (let closeCallback of this._additionalCloseCallbacks)
      closeCallback();
    if (triggerEvents) {
      if (options.onClose != null) {
        let closeEvent = new WindowCloseEvent();
        closeEvent.sender = this;
        options.onClose(closeEvent);
      }
    }
  }
  remove() {
    puma(this.container()).remove();
    puma(this._background).remove();
  }
  addCloseCallbacks(...callback) {
    this._additionalCloseCallbacks.push(...callback);
  }
  addOpenCallbacks(...callback) {
    this._additionalOpenCallbacks.push(...callback);
  }
  addContentLoadedCallbacks(...callback) {
    this._additionalContentLoadedCallbacks.push(...callback);
  }
  closeIconVisible(state) {
    let closeIcon = puma(this.container()).find(".vrWindowCloseIcon");
    if (state != null) {
      if (state) closeIcon.show();
      else closeIcon.hide();
    }
    return closeIcon.is(":visible");
  }
  title(text) {
    if (puma(this.container()).find(".vrWindowTitle label")[0] == null)
      return "";
    if (text != null)
      puma(this.container()).find(".vrWindowTitle label")[0].innerHTML = text;
    return puma(this.container()).find(".vrWindowTitle label")[0].innerHTML;
  }
  maximize(padding = true) {
    let width = padding ? "Calc(100% - 30px)" : "100%";
    let height = padding ? "Calc(100% - 30px)" : "100%";
    this.resize(width, height);
    let options = this.getOptions();
    if (options.position != null)
      this.position(options.position.left, options.position.top, options.position.right, options.position.bottom);
    else
      this.center();
  }
  resize(width, height) {
    let options = this.getOptions();
    let newWidth = width != null ? width : options.width;
    let newHeight = height != null ? height : options.height;
    this.width(newWidth);
    this.height(newHeight);
  }
  autoSize(direction = WindowAutoSizeDirectionEnum.Height, animate = false, center = true) {
    this._animateAutosize = animate;
    if (direction == WindowAutoSizeDirectionEnum.Height)
      this.height("auto", center);
    else
      this.width("auto", center);
    this._animateAutosize = false;
  }
  content(content, loader = false, open = false, triggerChange = true) {
    let options = this.getOptions();
    let iframeBody = null;
    if (options.iframe) {
      let iframeContentDocument = this._iframe.contentDocument;
      puma(iframeContentDocument).find("body").css("margin", "0px");
      if (iframeContentDocument != null)
        iframeBody = iframeContentDocument.body;
    }
    if (content != null && (content.endsWith(".html") || content.endsWith(".php") || content.includes(".aspx") || content.startsWith("http") || content.startsWith("/"))) {
      if (options.loader || loader !== false) {
        if (loader === true)
          loader = this.element();
        LoaderManager.show(loader === false ? this.element() : loader);
      }
      if (!options.iframe) {
        puma(this.element()).load(content, () => {
          if (triggerChange)
            this.onContentLoaded();
          this.autoSizeIfRequired();
          if (open)
            this.open();
        });
      } else {
        puma(this._iframe).attr("src", content);
        puma(this._iframe).on("load", () => {
          let iframeContentDocument = this._iframe.contentDocument;
          puma(iframeContentDocument).find("body").css("margin", "0px");
          if (triggerChange)
            this.onContentLoaded();
          this.autoSizeIfRequired();
          if (open)
            this.open();
        });
      }
    } else {
      puma(this.element()).empty();
      if (content != null && !content.startsWith("<"))
        content = "<div>" + content + "</div>";
      if (!options.iframe)
        puma(content).vrAppendToPuma(this.element());
      else
        puma(content).vrAppendToPuma(iframeBody);
      if (triggerChange)
        this.onContentLoaded();
      this.autoSizeIfRequired();
      if (open)
        this.open();
    }
  }
  autoSizeIfRequired() {
    let options = this.getOptions();
    if (options.autoSize !== false)
      this.autoSize(options.autoSize, false);
  }
  clear() {
    let options = this.getOptions();
    if (options.iframe)
      puma(this._iframe).removeAttr("src");
    else
      puma(this.element()).empty();
  }
  background() {
    return this._background;
  }
  center() {
    let scrollTop = puma(window).scrollTop();
    let windowHeight = window.innerHeight;
    let top = windowHeight / 2 - puma(this.container()).height() / 2 + scrollTop;
    let scrollLeft = puma(window).scrollLeft();
    let windowWidth = window.innerWidth;
    let left = windowWidth / 2 - puma(this.container()).width() / 2 + scrollLeft;
    this.position(left, top);
  }
  position(left, top, right, bottom) {
    let leftPosition = "";
    if (left != null) {
      leftPosition = "left: " + left + ";";
      if (typeof left == "number")
        leftPosition = "left: " + left + "px;";
    }
    let topPosition = "";
    if (top != null) {
      topPosition = "top: " + top + ";";
      if (typeof top == "number")
        topPosition = "top: " + top + "px;";
    }
    let rightPosition = "";
    if (right != null) {
      leftPosition = "left: unset;";
      rightPosition = "right: " + right + ";";
      if (typeof right == "number")
        rightPosition = "right: " + right + "px;";
    }
    let bottomPosition = "";
    if (bottom != null) {
      topPosition = "top: unset;";
      bottomPosition = "bottom: " + bottom + ";";
      if (typeof bottom == "number")
        bottomPosition = "bottom: " + bottom + "px;";
    }
    this.container().style.cssText += leftPosition + topPosition + rightPosition + bottomPosition;
    let position = $(this.container()).position();
    return { left: position.left, top: position.top };
  }
  footerItem(value) {
    let element = puma(this._divFooter).find("[value='" + value + "']")[0];
    return ControlManager.get(element != null ? element.id : "");
  }
  hideFooterItem(value) {
    this.footerItem(value).hide();
  }
  showFooterItem(value) {
    this.footerItem(value).show();
  }
  visibleFooterItem(value, state) {
    if (state != null)
      this.footerItem(value).visible(state);
    return this.footerItem(value).visible();
  }
  enableFooterItem(value) {
    this.footerItem(value).enable();
  }
  disableFooterItem(value) {
    this.footerItem(value).disable();
  }
  addFooterItem(footerItem) {
    if (footerItem.align == null) footerItem.align = WindowFooterItemAlignEnum.Right;
    let cssContainer = "float: right; margin-left: 5px;";
    if (footerItem.align == WindowFooterItemAlignEnum.Left)
      cssContainer = "float: left; margin-right: 5px;";
    if (footerItem.type == WindowFooterItemTypeEnum.Close || footerItem.type == WindowFooterItemTypeEnum.Ok || footerItem.type == WindowFooterItemTypeEnum.Custom || footerItem.type == null) {
      let text = footerItem.text;
      if (footerItem.type == WindowFooterItemTypeEnum.Close || footerItem.type == WindowFooterItemTypeEnum.Ok)
        text = footerItem.text != null ? footerItem.text : footerItem.type == WindowFooterItemTypeEnum.Close ? "Chiudi" : "Salva";
      let value = footerItem.value;
      if ((footerItem.type == WindowFooterItemTypeEnum.Close || footerItem.type == WindowFooterItemTypeEnum.Ok) && (value == null || value == ""))
        value = footerItem.type == WindowFooterItemTypeEnum.Close ? "close" : "ok";
      if ((value == null || value == "") && text != null)
        value = text.replace(/[^a-z0-9\s]/gi, "").replace(/[_\s]/g, "");
      let mode = footerItem.mode;
      if (footerItem.type == WindowFooterItemTypeEnum.Ok)
        mode = ButtonModeEnum.Primary;
      let button = createButton(
        {
          text,
          icon: footerItem.icon,
          iconSettings: footerItem.iconSettings,
          imageUrl: footerItem.imageUrl,
          mode,
          colorSettings: footerItem.colorSettings,
          tooltip: footerItem.tooltip,
          confirmationMessage: footerItem.confirmationMessage,
          visible: footerItem.visible,
          enable: footerItem.enable,
          css: footerItem.css,
          cssContainer: cssContainer + footerItem.cssContainer,
          class: footerItem.class,
          width: footerItem.width,
          onClick: (e) => {
            if (footerItem.type == WindowFooterItemTypeEnum.Close)
              this.close();
            if (footerItem.onClick != null) {
              let clickEvent = new WindowFooterItemClickEvent();
              clickEvent.sender = this;
              footerItem.onClick(clickEvent);
            }
            if (value != null && this._callbackFooterItems != null && this._callbackFooterItems.map((k) => k.value).includes(value)) {
              let callback = this._callbackFooterItems.filter((k) => k.value == value)[0].callback;
              if (callback != null)
                callback();
            }
          }
        },
        this._divFooter
      );
      if (value != null)
        puma(button.element()).attr("value", value);
    } else if (footerItem.type == WindowFooterItemTypeEnum.Separator) {
      let separator = createSeparator({
        cssContainer
      }, this._divFooter);
      if (footerItem.value != null)
        puma(separator.element()).attr("value", footerItem.value);
    } else if (footerItem.type == WindowFooterItemTypeEnum.SplitButton || footerItem.splitButtonItems != null) {
      let splitButton = createSplitButton(
        {
          text: footerItem.text,
          icon: footerItem.icon,
          imageUrl: footerItem.imageUrl,
          colorSettings: footerItem.colorSettings,
          tooltip: footerItem.tooltip,
          items: footerItem.splitButtonItems,
          visible: footerItem.visible,
          enable: footerItem.enable,
          css: footerItem.css,
          cssContainer: footerItem.cssContainer + "; " + cssContainer,
          class: footerItem.class,
          onClick: footerItem.onClick == null ? void 0 : (e) => {
            if (footerItem.onClick != null) {
              let clickEvent = new WindowFooterItemClickEvent();
              clickEvent.sender = this;
              footerItem.onClick(clickEvent);
            }
            if (footerItem.value != null && this._callbackFooterItems != null && this._callbackFooterItems.map((k) => k.value).includes(footerItem.value)) {
              let callback = this._callbackFooterItems.filter((k) => k.value == footerItem.value)[0].callback;
              if (callback != null)
                callback();
            }
          },
          onSelect: (e) => {
            if (e.value != null && this._callbackFooterItems != null && this._callbackFooterItems.map((k) => k.value).includes(e.value)) {
              let callback = this._callbackFooterItems.filter((k) => k.value == e.value)[0].callback;
              if (callback != null)
                callback();
            }
          }
        },
        this._divFooter
      );
      if (footerItem.value != null)
        puma(splitButton.element()).attr("value", footerItem.value);
    } else if (footerItem.type == WindowFooterItemTypeEnum.Switch) {
      if (footerItem.switchSettings == null) {
        footerItem.switchSettings = new SplitButtonSwitchSettings();
        footerItem.switchSettings.labelOff = "";
        footerItem.switchSettings.labelOn = "";
      }
      if (footerItem.switchSettings.checked == null) footerItem.switchSettings.checked = false;
      let switchControl = createSwitch(
        {
          labelOff: footerItem.switchSettings.labelOff,
          labelOn: footerItem.switchSettings.labelOn,
          checked: footerItem.switchSettings.checked,
          cssContainer: footerItem.cssContainer + "; " + cssContainer,
          css: footerItem.css,
          class: footerItem.class,
          visible: footerItem.visible,
          enable: footerItem.enable,
          onChange: (e) => {
            if (footerItem.switchSettings.onCheck != null) {
              let tableSwitchEvent = new SplitButtonSwitchEvent();
              tableSwitchEvent.checked = e.checked;
              footerItem.switchSettings.onCheck(tableSwitchEvent);
            }
          }
        },
        this._divFooter
      );
      if (footerItem.value != null)
        puma(switchControl.element()).attr("value", footerItem.value);
    } else if (footerItem.type == WindowFooterItemTypeEnum.ButtonGroup) {
      let buttonGroup = createButtonGroup(
        {
          selectionMode: SelectionModeEnum.Single,
          items: footerItem.buttonGroupItems,
          cssContainer: footerItem.cssContainer,
          css: footerItem.css,
          class: footerItem.class,
          visible: footerItem.visible,
          enable: footerItem.enable,
          width: "auto",
          onSelect: (e) => {
            if (footerItem.onClick != null) {
              let clickEvent = new WindowFooterItemClickEvent();
              clickEvent.sender = this;
              footerItem.onClick(clickEvent);
            }
          }
        },
        this._divFooter
      );
      if (footerItem.value != null)
        puma(buttonGroup.element()).attr("value", footerItem.value);
    } else if (footerItem.type == WindowFooterItemTypeEnum.CheckBox) {
      let checkBox = createCheckBox(
        {
          text: footerItem.text,
          cssContainer: "top: -1px; " + footerItem.cssContainer,
          css: footerItem.css,
          class: footerItem.class,
          visible: footerItem.visible,
          enable: footerItem.enable,
          onCheck: (e) => {
            if (footerItem.onClick != null) {
              let clickEvent = new WindowFooterItemClickEvent();
              clickEvent.sender = this;
              footerItem.onClick(clickEvent);
            }
          }
        },
        this._divFooter
      );
      if (footerItem.value != null)
        puma(checkBox.element()).attr("value", footerItem.value);
    } else if (footerItem.type == WindowFooterItemTypeEnum.Label) {
      let label = createLabel(
        {
          text: footerItem.text,
          cssContainer: footerItem.cssContainer,
          css: footerItem.css,
          class: footerItem.class,
          visible: footerItem.visible,
          enable: footerItem.enable,
          onClick: (e) => {
            if (footerItem.onClick != null) {
              let clickEvent = new WindowFooterItemClickEvent();
              clickEvent.sender = this;
              footerItem.onClick(clickEvent);
            }
          }
        },
        this._divFooter
      );
      if (footerItem.value != null)
        puma(label.element()).attr("value", footerItem.value);
    } else if (footerItem.type == WindowFooterItemTypeEnum.ComboBox) {
      if (footerItem.comboBoxOptions == null) footerItem.comboBoxOptions = new ComboBoxOptions();
      footerItem.comboBoxOptions.classContainer = footerItem.comboBoxOptions.classContainer;
      footerItem.comboBoxOptions.class = footerItem.comboBoxOptions.class;
      if (footerItem.comboBoxOptions.visible == null) footerItem.comboBoxOptions.visible = footerItem.visible;
      if (footerItem.comboBoxOptions.enable == null) footerItem.comboBoxOptions.enable = footerItem.enable;
      if (footerItem.comboBoxOptions.css == null) footerItem.comboBoxOptions.css = footerItem.css;
      if (footerItem.comboBoxOptions.cssContainer == null) footerItem.comboBoxOptions.cssContainer = footerItem.cssContainer;
      let combo = createComboBox(footerItem.comboBoxOptions, this._divFooter);
      if (footerItem.value != null)
        puma(combo.element()).attr("value", footerItem.value);
    } else if (footerItem.type == WindowFooterItemTypeEnum.DatePicker) {
      if (footerItem.datePickerOptions == null) footerItem.datePickerOptions = new DatePickerOptions();
      footerItem.datePickerOptions.classContainer = footerItem.datePickerOptions.classContainer;
      footerItem.datePickerOptions.class = footerItem.datePickerOptions.class;
      if (footerItem.datePickerOptions.visible == null) footerItem.datePickerOptions.visible = footerItem.visible;
      if (footerItem.datePickerOptions.enable == null) footerItem.datePickerOptions.enable = footerItem.enable;
      if (footerItem.datePickerOptions.css == null) footerItem.datePickerOptions.css = footerItem.css;
      if (footerItem.datePickerOptions.cssContainer == null) footerItem.datePickerOptions.cssContainer = footerItem.cssContainer;
      let datePicker = createDatePicker(footerItem.datePickerOptions, this._divFooter);
      if (footerItem.value != null)
        puma(datePicker.element()).attr("value", footerItem.value);
    } else if (footerItem.type == WindowFooterItemTypeEnum.TextBox) {
      if (footerItem.textBoxOptions == null) footerItem.textBoxOptions = new TextBoxOptions();
      footerItem.textBoxOptions.classContainer = footerItem.textBoxOptions.classContainer;
      footerItem.textBoxOptions.class = footerItem.textBoxOptions.class;
      if (footerItem.textBoxOptions.visible == null) footerItem.textBoxOptions.visible = footerItem.visible;
      if (footerItem.textBoxOptions.enable == null) footerItem.textBoxOptions.enable = footerItem.enable;
      if (footerItem.textBoxOptions.css == null) footerItem.textBoxOptions.css = footerItem.css;
      if (footerItem.textBoxOptions.cssContainer == null) footerItem.textBoxOptions.cssContainer = footerItem.cssContainer;
      let textbox = createTextBox(footerItem.textBoxOptions, this._divFooter);
      if (footerItem.value != null)
        puma(textbox.element()).attr("value", footerItem.value);
    }
  }
  footer() {
    return puma(this._divFooter)[0];
  }
  header() {
    return puma(this._divHeader)[0];
  }
  titleElement() {
    return puma(this._divHeader).find(".vrWindowTitle")[0];
  }
  getOptions() {
    return this.options();
  }
  onContentLoaded() {
    let options = this.getOptions();
    LoaderManager.hide();
    if (options.onContentLoaded != null) {
      let onLoadEvent = new WindowContentLoadEvent();
      onLoadEvent.sender = this;
      options.onContentLoaded(onLoadEvent);
    }
    for (let contentLoaded of this._additionalContentLoadedCallbacks)
      contentLoaded();
  }
  //#endregion
  //#region Overrides
  height(height, center = true) {
    let options = this.getOptions();
    if (height != "auto" || height == "auto" && !this._animateAutosize)
      super.height(height);
    else {
      this.container().style.cssText += "height: auto;";
      let curHeight = puma(this.element()).height();
      let autoHeight = puma(this.element()).css("height", "auto").height();
      puma(this.element()).height(curHeight).animate({ height: autoHeight }, 300);
    }
    if (typeof height == "number") {
      height -= options.padding * 2;
      if (options.title != null)
        height -= puma(this._divHeader).outerHeight();
      if (options.footer)
        height -= puma(this._divFooter).outerHeight();
      this.element().style.cssText += "height: " + height + "px;";
    }
    if (center) {
      if (this._animateAutosize)
        window.setTimeout(() => this.center(), 300);
      else
        this.center();
    }
    return super.height();
  }
  width(width, center = true) {
    let options = this.getOptions();
    super.width(width);
    if (center)
      this.center();
    this.element().style.cssText += "width: Calc(100% - " + options.padding * 2 + "px);";
    return super.width();
  }
  //#endregion
}
class SplitButtonSwitchSettings {
  labelOff;
  labelOn;
  checked;
  onCheck;
}
class SplitButtonSwitchEvent {
  checked;
}
class WindowTitleSettings {
  text;
  colorSettings;
  fontSize;
  cssContainer;
  css;
  align;
}
class WindowEvent extends VrControlsEvent {
  sender;
}
class WindowFooterItemClickEvent extends WindowEvent {
}
class WindowOpenEvent extends WindowEvent {
}
class WindowBeforeCloseEvent extends WindowEvent {
}
class WindowCloseEvent extends WindowEvent {
}
class WindowDragStartEvent extends WindowEvent {
  left;
  top;
}
class WindowDragEndEvent extends WindowEvent {
  left;
  top;
}
class WindowContentLoadEvent extends WindowEvent {
}
export {
  SplitButtonSwitchSettings,
  Window,
  WindowEvent,
  WindowOpenEvent,
  WindowOptions
};
//# sourceMappingURL=window.js.map
