import { ControlTypeEnum, createWindow, puma, IconClassicLight, IconClass, div, createButton, span, createTextBox, createLabel, TextModeEnum, PdfViewerToolbarAreaEnum, PdfViewerToolbarSettings, ToolbarItemOnClickEvent, PdfViewerToolbarItem, notify, notifyError, OnContentRenderedEvent } from "../vr";
import { VrControlOptions, VrControl, AttributeSettings } from "../common";
import { PDFDocumentProxy } from "types/pdfjs";
import { Window, WindowOpenEvent } from "../controls/window";
import { LoaderManager } from "../../../src/managers/loaderManager";
import { TextBox } from "./textbox";
import { Label } from "./label";
import { PrintManager } from "../../../src/managers/printManager";
import { UtilityManager } from "../../../src/managers/utilityManager";
import { DeviceManager } from "../../../src/managers/deviceManager";

declare var pdfjsLib: any;

//#region Options
export class PdfViewerOptions extends VrControlOptions
{
	content?: string;
	base64?: boolean;
	popup?: boolean | PdfViewerWindowSettings;
	scale?: number;
	textSelection?: boolean;
	toolbar?: boolean | PdfViewerToolbarSettings;
	fileName?: string;

	onContentRendered?: (e: OnContentRenderedEvent) => void;
}
//#endregion

//#region Control
export class PdfViewer extends VrControl
{
	private _state: PdfState;
	private _window: Window;
	private _currentPage: number;
	private _pdfViewerCanvasContainer: HTMLElement;
	private _divToolbar: HTMLElement;
	private _txtCurrentPage: TextBox;
	private _lblPagesNumber: Label;

	constructor(element: HTMLElement, options?: PdfViewerOptions | null)
	{
		//#region Options
		if (options == null)
			options = new PdfViewerOptions();

		if (options.base64 == null) options.base64 = false;
		if (options.scale == null) (DeviceManager.isMobile()) ? options.scale = 0.5 : options.scale = 1.3;
		if (options.textSelection == null) options.textSelection = true;
		if (options.fileName == null) options.fileName = "Documento";
		if (options.tabIndex == null) options.tabIndex = -1;

		if (options.popup == null) options.popup = false;
		if (options.popup !== false) 
		{
			if (options.popup === true)
				options.popup = new PdfViewerWindowSettings();

			if (options.popup.maximize == null) options.popup.maximize = false;
			if (options.popup.title == null) options.popup.title = "Documento";
		}

		if (options.toolbar == null) options.toolbar = true;
		if (options.toolbar !== false)
		{
			if (options.toolbar === true)
				options.toolbar = new PdfViewerToolbarSettings();

			if (options.toolbar.navigation == null) options.toolbar.navigation = true;
			if (options.toolbar.print == null) options.toolbar.print = true;
			if (options.toolbar.zoom == null) options.toolbar.zoom = true;
			if (options.toolbar.download == null) options.toolbar.download = true;
			if (options.toolbar.items == null) options.toolbar.items = [];
		}
		//#endregion

		super(element, options, ControlTypeEnum.PdfViewer);
		this.container().style.cssText += "display: flex;";
		this._state = new PdfState(1, options.scale);

		//#region Window
		if (options.popup !== false)
		{
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
		//#endregion

		let elementToAppend = (options.popup === false) ? this.element() : this._window.element();
		this._divToolbar = div(elementToAppend, { class: "vrPdfViewerDivToolbar" });
		if (options.toolbar !== false)
			this.createToolbar();

		this._pdfViewerCanvasContainer = puma("<div class='vrPdfViewerCanvasContainer'></div>").vrAppendToPuma(elementToAppend)[0];
		puma(this._pdfViewerCanvasContainer).on("scroll", (e: JQuery.ScrollEvent) =>
		{
			//#region Scroll
			let canvasHeight = Number(puma(this.canvasContainer()).find("canvas").attr("height")) + 25;
			let diff = Math.trunc(puma(this._pdfViewerCanvasContainer).scrollTop() / canvasHeight) + 1;

			if (this._txtCurrentPage != null)
				this._txtCurrentPage.value(diff, false);

			this._currentPage = diff;
			//#endregion
		});

		if (options.toolbar === false)
		{
			puma(this._divToolbar).hide();
			puma(this.canvasContainer()).css("height", "Calc(100% - 25px)");
		}
		else
			puma(this.canvasContainer()).css("height", "Calc(100% - 62px)");

		this.content(options.content);
	}

	//#region Toolbar
	private createToolbar()
	{
		let options = this.getOptions();
		options.toolbar = (options.toolbar as PdfViewerToolbarSettings);

		//#region Navigations info
		let spanLeftArea = span(this.toolbar(), { class: "vrPdfViewer_toolbarLeftArea" });
		if (options.toolbar.navigation)
		{
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
				onChanged: (e) =>
				{
					let currentPage = Number(e.value);
					if (Number(e.value) > this._state.pdf.numPages)
						currentPage = this._state.pdf.numPages

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
		//#endregion

		//#region Zoom
		let spanCenterArea = span(this.toolbar(), { css: "justify-content: center;", class: "vrPdfViewer_toolbarCenterArea" });
		if (options.toolbar.zoom)
		{
			createButton({
				icon: IconClassicLight.MagnifyingGlassMinus,
				css: "border: none; background: none; font-size: 16px;",
				cssContainer: "margin-right: 5px;",
				tooltip: "Togli zoom",
				onClick: (e) => 
				{
					this._state.scale -= 0.2;
					this.content();
				}
			}, spanCenterArea);

			createButton({
				icon: IconClassicLight.MagnifyingGlassPlus,
				css: "border: none; background: none; font-size: 16px;",
				cssContainer: "margin-right: 5px;",
				tooltip: "Aumenta zoom",
				onClick: (e) => 
				{
					this._state.scale += 0.2;
					this.content();
				}
			}, spanCenterArea);
		}
		//#endregion

		//#region Buttons
		let spanRightArea = span(this.toolbar(), { css: "justify-content: flex-end;", class: "vrPdfViewer_toolbarRightArea" });
		if (options.toolbar.download)
		{
			createButton({
				icon: IconClassicLight.Download,
				css: "border: none; background: none; font-size: 16px;",
				cssContainer: "margin-right: 5px;",
				tooltip: "Scarica",
				onClick: (e) => this.download()
			}, spanRightArea);
		}

		if (options.toolbar.print)
		{
			createButton({
				icon: IconClassicLight.Print,
				css: "border: none; background: none; font-size: 16px;",
				tooltip: "Stampa",
				onClick: (e) => this.print()
			}, spanRightArea);
		}
		//#endregion

		this.addToolbarItems(options.toolbar.items!);
	}

	addToolbarItems(toolbarItems: PdfViewerToolbarItem[])
	{
		for (let toolbarItem of toolbarItems)
		{
			let area = this.toolbarRightArea();
			switch (toolbarItem.area)
			{
				case PdfViewerToolbarAreaEnum.Left: area = this.toolbarLeftArea(); break;
				case PdfViewerToolbarAreaEnum.Center: area = this.toolbarCenterArea(); break;
				case PdfViewerToolbarAreaEnum.Right: area = this.toolbarRightArea(); break;
			}

			let css = (toolbarItem.css != null) ? toolbarItem.css : "";
			let attributes: AttributeSettings[] | undefined = (toolbarItem.value != null) ? [{ name: "value", value: toolbarItem.value }] : undefined;
			createButton({
				icon: toolbarItem.icon,
				text: toolbarItem.text,
				attributes: attributes,
				css: "background: none; border: none;" + css,
				cssContainer: toolbarItem.cssContainer,
				onClick: (e) => 
				{
					if (toolbarItem.onClick != null)
					{
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

	toolbar()
	{
		return this._divToolbar;
	}

	toolbarLeftArea()
	{
		return this.toolbarArea(PdfViewerToolbarAreaEnum.Left);
	}

	toolbarCenterArea()
	{
		return this.toolbarArea(PdfViewerToolbarAreaEnum.Center);
	}

	toolbarRightArea()
	{
		return this.toolbarArea(PdfViewerToolbarAreaEnum.Right);
	}

	toolbarArea(area: PdfViewerToolbarAreaEnum)
	{
		let options = this.getOptions();
		let elementWhereSearch = (options.popup === false) ? this.container() : this._window.container();

		let areaClass = "";
		switch (area)
		{
			case PdfViewerToolbarAreaEnum.Left: areaClass = "vrPdfViewer_toolbarLeftArea"; break;
			case PdfViewerToolbarAreaEnum.Center: areaClass = "vrPdfViewer_toolbarCenterArea"; break;
			case PdfViewerToolbarAreaEnum.Right: areaClass = "vrPdfViewer_toolbarRightArea"; break;
		}
		return puma(elementWhereSearch).find("." + areaClass)[0];
	}
	//#endregion

	content(content?: string)
	{
		let promise = new Promise((callback?: Function) =>
		{
			puma(this.canvasContainer()).empty();
			let options = this.getOptions();

			if (content != null)
			{
				LoaderManager.show(this.element());
				options.content = content;

				//#region Load document
				const loadingTask = pdfjsLib.getDocument((!options.base64) ? content : { data: Buffer.from(content, "base64"), useSystemFonts: true });
				loadingTask.promise.then((pdf: PDFDocumentProxy) =>
				{
					this._state.pdf = pdf;
					let pagesNumber = this._state.pdf.numPages;
					if (this._lblPagesNumber != null)
						this._lblPagesNumber.value("/ " + pagesNumber);

					this.internalRenderRecursive(1);
					LoaderManager.hide();

					let options = this.getOptions();
					if (options.onContentRendered != null)
					{
						let event = new OnContentRenderedEvent();
						event.sender = this;
						event.pdf = this._state.pdf;
						options.onContentRendered(event);
					}

					if (callback != null)
						callback();
				},
					(error: any) => 
					{
						notifyError(error);
					});
				//#endregion
			}
			else if (options.content != null)
			{
				let pagesNumber = this._state.pdf.numPages;
				if (this._lblPagesNumber != null)
					this._lblPagesNumber.value("/ " + pagesNumber);

				this.internalRenderRecursive(1);
			}
		});
		return promise;
	}

	private internalRenderRecursive(pageIndex: number)
	{
		if (pageIndex > this._state.pdf.numPages || this._state.pdf == null)
			return;

		let options = this.getOptions();
		this._state.pdf.getPage(pageIndex).then((page) => 
		{
			//#region Structure
			let divCanvasTextContainer = div(this.canvasContainer(), { class: "vrPdfViewer_divCanvasTextContainer" });
			let canvas = puma("<canvas style='border-top: solid 50px #e8e8e8;'></canvas>").vrAppendToPuma(divCanvasTextContainer)[0] as HTMLCanvasElement;
			let ctx = canvas.getContext('2d');

			let divTextLayer: HTMLElement | null = null;
			if (options.textSelection)
			{
				divTextLayer = puma("<div class='vrPdfViewer_divTextLayer'></div>").vrAppendToPuma(divCanvasTextContainer)[0];
				divTextLayer!.style.cssText += "--scale-factor: " + this._state.scale;
			}
			//#endregion

			let viewport = page.getViewport({ scale: this._state.scale });
			canvas.width = viewport.width;
			canvas.height = viewport.height;

			if (DeviceManager.isMobile())
			{
				canvas.width = (viewport.width > window.innerWidth) ? window.innerWidth : viewport.width;
				canvas.height = (viewport.height > window.innerHeight) ? window.innerHeight : viewport.height;
			}

			//#region Popup
			if (options.popup !== false)
			{
				options.popup = (options.popup! as PdfViewerWindowSettings);
				if (options.popup.maximize)
					this._window.maximize();
				else
				{
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
			//#endregion

			page.render({
				canvasContext: ctx!,
				viewport: viewport
			});

			//#region Text selection
			if (options.textSelection)
			{
				page.getTextContent().then((textContent) =>
				{
					pdfjsLib.renderTextLayer({
						textContent: textContent,
						container: divTextLayer,
						viewport: viewport
					});
				});
			}
			//#endregion

			pageIndex++;
			this.internalRenderRecursive(pageIndex);
		}, (error: any) => notifyError(error));
	}

	page(page?: number)
	{
		if (page != null)
			this._txtCurrentPage.value(page);

		return this._currentPage;
	}

	fileName(name?: string)
	{
		if (name != null)
			this.getOptions().fileName = name;

		return this.getOptions().fileName;
	}

	download()
	{
		let options = this.getOptions();
		this.getData().then((base64bytes) => UtilityManager.downloadPdfBytes(base64bytes, options.fileName))
	}

	print()
	{
		this.getData().then((base64bytes) => PrintManager.printBytes(base64bytes))
	}

	async getData(): Promise<string>
	{
		if (this._state.pdf != null)
		{
			let data = await this._state.pdf.getData();
			let base64string = UtilityManager.bytesToBase64(data);
			return base64string;
		}
		return "";
	}

	//#region Window
	open(content?: string)
	{
		let promise = new Promise((callback?: Function) =>
		{
			let options = this.getOptions();
			if (options.popup === false)
				return;

			if (content != null)
			{
				this.content(content).then(() =>
				{
					if (callback != null)
						callback()
				});
			}
			this._window.open();
		});
		return promise;
	}

	close()
	{
		this._window.close();
	}

	window()
	{
		return this._window;
	}

	windowTitle(title: string)
	{
		this._window.title(title);
	}

	windowCloseCallback(callback: Function)
	{
		if (this.window() != null)
		{
			this.window().close
		}
	}
	//#endregion

	getOptions()
	{
		return this.options<PdfViewerOptions>();
	}

	private canvasContainer(): HTMLElement
	{
		return this._pdfViewerCanvasContainer;
	}
}
//#endregion

//#region Classes
class PdfState
{
	pdf: PDFDocumentProxy;
	currentPage: number;
	scale: number;

	constructor(currentPage: number, scale: number)
	{
		this.currentPage = currentPage;
		this.scale = scale;
	}
}

class PdfViewerWindowSettings
{
	maximize?: boolean;
	width?: number;
	height?: number;
	title?: string;
	closeable?: boolean;
	onOpen?(e: WindowOpenEvent): void;
}

class OnWindowOpenEvent
{
	sender: PdfViewer;
}
//#endregion