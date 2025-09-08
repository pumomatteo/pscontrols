import { PdfViewerToolbarSettings, ControlTypeEnum, createWindow, div, puma, span, createButton, IconClassicLight, createTextBox, TextModeEnum, createLabel, PdfViewerToolbarAreaEnum, OnContentRenderedEvent, notifyError, ToolbarItemOnClickEvent } from "../vr.js";
import { VrControl, VrControlOptions } from "../common.js";
import { LoaderManager } from "../../managers/loaderManager.js";
import { PrintManager } from "../../managers/printManager.js";
import { UtilityManager } from "../../managers/utilityManager.js";
import { DeviceManager } from "../../managers/deviceManager.js";
class PdfViewerOptions extends VrControlOptions {
  content;
  base64;
  popup;
  scale;
  textSelection;
  toolbar;
  fileName;
  onContentRendered;
}
class PdfViewer extends VrControl {
  _state;
  _window;
  _currentPage;
  _pdfViewerCanvasContainer;
  _divToolbar;
  _txtCurrentPage;
  _lblPagesNumber;
  constructor(element, options) {
    if (options == null)
      options = new PdfViewerOptions();
    if (options.base64 == null) options.base64 = false;
    if (options.scale == null) DeviceManager.isMobile() ? options.scale = 0.5 : options.scale = 1.3;
    if (options.textSelection == null) options.textSelection = true;
    if (options.fileName == null) options.fileName = "Documento";
    if (options.tabIndex == null) options.tabIndex = -1;
    if (options.popup == null) options.popup = false;
    if (options.popup !== false) {
      if (options.popup === true)
        options.popup = new PdfViewerWindowSettings();
      if (options.popup.maximize == null) options.popup.maximize = false;
      if (options.popup.title == null) options.popup.title = "Documento";
    }
    if (options.toolbar == null) options.toolbar = true;
    if (options.toolbar !== false) {
      if (options.toolbar === true)
        options.toolbar = new PdfViewerToolbarSettings();
      if (options.toolbar.navigation == null) options.toolbar.navigation = true;
      if (options.toolbar.print == null) options.toolbar.print = true;
      if (options.toolbar.zoom == null) options.toolbar.zoom = true;
      if (options.toolbar.download == null) options.toolbar.download = true;
      if (options.toolbar.items == null) options.toolbar.items = [];
    }
    super(element, options, ControlTypeEnum.PdfViewer);
    this.container().style.cssText += "display: flex;";
    this._state = new PdfState(1, options.scale);
    if (options.popup !== false) {
      this._window = createWindow({
        addToControlList: false,
        title: options.popup.title,
        footer: false,
        closeable: options.popup.closeable,
        class: "vrWindowPdfViewer",
        classContainer: this.element().id + "_wndUtility",
        onOpen: options.popup.onOpen
      });
    }
    let elementToAppend = options.popup === false ? this.element() : this._window.element();
    this._divToolbar = div(elementToAppend, { class: "vrPdfViewerDivToolbar" });
    if (options.toolbar !== false)
      this.createToolbar();
    this._pdfViewerCanvasContainer = puma("<div class='vrPdfViewerCanvasContainer'></div>").vrAppendToPuma(elementToAppend)[0];
    puma(this._pdfViewerCanvasContainer).on("scroll", (e) => {
      let canvasHeight = Number(puma(this.canvasContainer()).find("canvas").attr("height")) + 25;
      let diff = Math.trunc(puma(this._pdfViewerCanvasContainer).scrollTop() / canvasHeight) + 1;
      if (this._txtCurrentPage != null)
        this._txtCurrentPage.value(diff, false);
      this._currentPage = diff;
    });
    if (options.toolbar === false) {
      puma(this._divToolbar).hide();
      puma(this.canvasContainer()).css("height", "Calc(100% - 25px)");
    } else
      puma(this.canvasContainer()).css("height", "Calc(100% - 62px)");
    this.content(options.content);
  }
  //#region Toolbar
  createToolbar() {
    let options = this.getOptions();
    options.toolbar = options.toolbar;
    let spanLeftArea = span(this.toolbar(), { class: "vrPdfViewer_toolbarLeftArea" });
    if (options.toolbar.navigation) {
      createButton({
        icon: IconClassicLight.Backward,
        css: "background: none; border: none;",
        onClick: (e) => this._txtCurrentPage.value(1)
      }, spanLeftArea);
      createButton({
        icon: IconClassicLight.CaretLeft,
        css: "background: none; border: none; margin-right: 5px; font-size: 20px; margin-top: 1px;",
        onClick: (e) => this._txtCurrentPage.value(this._currentPage - 1)
      }, spanLeftArea);
      this._txtCurrentPage = createTextBox({
        mode: TextModeEnum.Numeric,
        value: 1,
        width: 38,
        onChanged: (e) => {
          let currentPage = Number(e.value);
          if (Number(e.value) > this._state.pdf.numPages)
            currentPage = this._state.pdf.numPages;
          if (Number(e.value) < 1)
            currentPage = 1;
          this._currentPage = currentPage;
          this._txtCurrentPage.value(currentPage, false);
          let canvasHeight = Number(puma(this.canvasContainer()).find("canvas").attr("height"));
          puma(this.canvasContainer()).scrollTop((canvasHeight + 54) * (currentPage - 1));
        }
      }, spanLeftArea);
      this._currentPage = 1;
      this._lblPagesNumber = createLabel({
        text: "/ 3",
        cssContainer: "margin-left: 5px; margin-right: 10px; min-width: 20px;"
      }, spanLeftArea);
      createButton({
        icon: IconClassicLight.CaretRight,
        css: "background: none; border: none; font-size: 20px; margin-top: 1px;",
        onClick: (e) => this._txtCurrentPage.value(this._currentPage + 1)
      }, spanLeftArea);
      createButton({
        icon: IconClassicLight.Forward,
        css: "background: none; border: none;",
        onClick: (e) => this._txtCurrentPage.value(this._state.pdf.numPages)
      }, spanLeftArea);
    }
    let spanCenterArea = span(this.toolbar(), { css: "justify-content: center;", class: "vrPdfViewer_toolbarCenterArea" });
    if (options.toolbar.zoom) {
      createButton({
        icon: IconClassicLight.MagnifyingGlassMinus,
        css: "border: none; background: none; font-size: 16px;",
        cssContainer: "margin-right: 5px;",
        tooltip: "Togli zoom",
        onClick: (e) => {
          this._state.scale -= 0.2;
          this.content();
        }
      }, spanCenterArea);
      createButton({
        icon: IconClassicLight.MagnifyingGlassPlus,
        css: "border: none; background: none; font-size: 16px;",
        cssContainer: "margin-right: 5px;",
        tooltip: "Aumenta zoom",
        onClick: (e) => {
          this._state.scale += 0.2;
          this.content();
        }
      }, spanCenterArea);
    }
    let spanRightArea = span(this.toolbar(), { css: "justify-content: flex-end;", class: "vrPdfViewer_toolbarRightArea" });
    if (options.toolbar.download) {
      createButton({
        icon: IconClassicLight.Download,
        css: "border: none; background: none; font-size: 16px;",
        cssContainer: "margin-right: 5px;",
        tooltip: "Scarica",
        onClick: (e) => this.download()
      }, spanRightArea);
    }
    if (options.toolbar.print) {
      createButton({
        icon: IconClassicLight.Print,
        css: "border: none; background: none; font-size: 16px;",
        tooltip: "Stampa",
        onClick: (e) => this.print()
      }, spanRightArea);
    }
    this.addToolbarItems(options.toolbar.items);
  }
  addToolbarItems(toolbarItems) {
    for (let toolbarItem of toolbarItems) {
      let area = this.toolbarRightArea();
      switch (toolbarItem.area) {
        case PdfViewerToolbarAreaEnum.Left:
          area = this.toolbarLeftArea();
          break;
        case PdfViewerToolbarAreaEnum.Center:
          area = this.toolbarCenterArea();
          break;
        case PdfViewerToolbarAreaEnum.Right:
          area = this.toolbarRightArea();
          break;
      }
      let css = toolbarItem.css != null ? toolbarItem.css : "";
      let attributes = toolbarItem.value != null ? [{ name: "value", value: toolbarItem.value }] : void 0;
      createButton({
        icon: toolbarItem.icon,
        text: toolbarItem.text,
        attributes,
        css: "background: none; border: none;" + css,
        cssContainer: toolbarItem.cssContainer,
        onClick: (e) => {
          if (toolbarItem.onClick != null) {
            let clickEvent = new ToolbarItemOnClickEvent();
            clickEvent.sender = this;
            clickEvent.text = toolbarItem.text;
            clickEvent.value = toolbarItem.value;
            toolbarItem.onClick(clickEvent);
          }
        }
      }, area);
    }
  }
  toolbar() {
    return this._divToolbar;
  }
  toolbarLeftArea() {
    return this.toolbarArea(PdfViewerToolbarAreaEnum.Left);
  }
  toolbarCenterArea() {
    return this.toolbarArea(PdfViewerToolbarAreaEnum.Center);
  }
  toolbarRightArea() {
    return this.toolbarArea(PdfViewerToolbarAreaEnum.Right);
  }
  toolbarArea(area) {
    let options = this.getOptions();
    let elementWhereSearch = options.popup === false ? this.container() : this._window.container();
    let areaClass = "";
    switch (area) {
      case PdfViewerToolbarAreaEnum.Left:
        areaClass = "vrPdfViewer_toolbarLeftArea";
        break;
      case PdfViewerToolbarAreaEnum.Center:
        areaClass = "vrPdfViewer_toolbarCenterArea";
        break;
      case PdfViewerToolbarAreaEnum.Right:
        areaClass = "vrPdfViewer_toolbarRightArea";
        break;
    }
    return puma(elementWhereSearch).find("." + areaClass)[0];
  }
  //#endregion
  content(content) {
    let promise = new Promise((callback) => {
      puma(this.canvasContainer()).empty();
      let options = this.getOptions();
      if (content != null) {
        LoaderManager.show(this.element());
        options.content = content;
        const loadingTask = pdfjsLib.getDocument(!options.base64 ? content : { data: atob(content) });
        loadingTask.promise.then(
          (pdf) => {
            this._state.pdf = pdf;
            let pagesNumber = this._state.pdf.numPages;
            if (this._lblPagesNumber != null)
              this._lblPagesNumber.value("/ " + pagesNumber);
            this.internalRenderRecursive(1);
            LoaderManager.hide();
            let options2 = this.getOptions();
            if (options2.onContentRendered != null) {
              let event = new OnContentRenderedEvent();
              event.sender = this;
              event.pdf = this._state.pdf;
              options2.onContentRendered(event);
            }
            if (callback != null)
              callback();
          },
          (error) => {
            notifyError(error);
          }
        );
      } else if (options.content != null) {
        let pagesNumber = this._state.pdf.numPages;
        if (this._lblPagesNumber != null)
          this._lblPagesNumber.value("/ " + pagesNumber);
        this.internalRenderRecursive(1);
      }
    });
    return promise;
  }
  internalRenderRecursive(pageIndex) {
    if (pageIndex > this._state.pdf.numPages || this._state.pdf == null)
      return;
    let options = this.getOptions();
    this._state.pdf.getPage(pageIndex).then((page) => {
      let divCanvasTextContainer = div(this.canvasContainer(), { class: "vrPdfViewer_divCanvasTextContainer" });
      let canvas = puma("<canvas style='border-top: solid 50px #e8e8e8;'></canvas>").vrAppendToPuma(divCanvasTextContainer)[0];
      let ctx = canvas.getContext("2d");
      let divTextLayer = null;
      if (options.textSelection) {
        divTextLayer = puma("<div class='vrPdfViewer_divTextLayer'></div>").vrAppendToPuma(divCanvasTextContainer)[0];
        divTextLayer.style.cssText += "--scale-factor: " + this._state.scale;
      }
      let viewport = page.getViewport({ scale: this._state.scale });
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      if (DeviceManager.isMobile()) {
        canvas.width = viewport.width > window.innerWidth ? window.innerWidth : viewport.width;
        canvas.height = viewport.height > window.innerHeight ? window.innerHeight : viewport.height;
      }
      if (options.popup !== false) {
        options.popup = options.popup;
        if (options.popup.maximize)
          this._window.maximize();
        else {
          let width = 957;
          if (options.popup.width != null)
            width = options.popup.width;
          let height = document.body.clientHeight - 60;
          if (options.popup.height != null)
            height = options.popup.height;
          this._window.width(width);
          this._window.element().style.cssText += "height: " + height + "px;";
          this._window.container().style.cssText += "height: " + (height + 30) + "px;";
          this._window.center();
        }
      }
      page.render({
        canvasContext: ctx,
        viewport
      });
      if (options.textSelection) {
        page.getTextContent().then((textContent) => {
          pdfjsLib.renderTextLayer({
            textContent,
            container: divTextLayer,
            viewport
          });
        });
      }
      pageIndex++;
      this.internalRenderRecursive(pageIndex);
    }, (error) => notifyError(error));
  }
  page(page) {
    if (page != null)
      this._txtCurrentPage.value(page);
    return this._currentPage;
  }
  fileName(name) {
    if (name != null)
      this.getOptions().fileName = name;
    return this.getOptions().fileName;
  }
  download() {
    let options = this.getOptions();
    this.getData().then((base64bytes) => UtilityManager.downloadPdfBytes(base64bytes, options.fileName));
  }
  print() {
    this.getData().then((base64bytes) => PrintManager.printBytes(base64bytes));
  }
  async getData() {
    if (this._state.pdf != null) {
      let data = await this._state.pdf.getData();
      let base64string = UtilityManager.bytesToBase64(data);
      return base64string;
    }
    return "";
  }
  //#region Window
  open(content) {
    let promise = new Promise((callback) => {
      let options = this.getOptions();
      if (options.popup === false)
        return;
      if (content != null) {
        this.content(content).then(() => {
          if (callback != null)
            callback();
        });
      }
      this._window.open();
    });
    return promise;
  }
  close() {
    this._window.close();
  }
  window() {
    return this._window;
  }
  windowTitle(title) {
    this._window.title(title);
  }
  windowCloseCallback(callback) {
    if (this.window() != null) {
      this.window().close;
    }
  }
  //#endregion
  getOptions() {
    return this.options();
  }
  canvasContainer() {
    return this._pdfViewerCanvasContainer;
  }
}
class PdfState {
  pdf;
  currentPage;
  scale;
  constructor(currentPage, scale) {
    this.currentPage = currentPage;
    this.scale = scale;
  }
}
class PdfViewerWindowSettings {
  maximize;
  width;
  height;
  title;
  closeable;
}
export {
  PdfViewer,
  PdfViewerOptions
};
//# sourceMappingURL=pdfViewer.js.map
