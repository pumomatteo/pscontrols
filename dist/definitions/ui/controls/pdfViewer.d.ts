import { PdfViewerToolbarAreaEnum, PdfViewerToolbarSettings, PdfViewerToolbarItem } from "../vr";
import { VrControlOptions, VrControl } from "../common";
export declare class PdfViewerOptions extends VrControlOptions {
    content?: string;
    base64?: boolean;
    popup?: boolean | PdfViewerWindowSettings;
    scale?: number;
    textSelection?: boolean;
    toolbar?: boolean | PdfViewerToolbarSettings;
    fileName?: string;
    onContentRendered?: (e: OnContentRenderedEvent) => void;
}
export declare class PdfViewer extends VrControl {
    private _state;
    private _window;
    private _currentPage;
    private _pdfViewerCanvasContainer;
    private _divToolbar;
    private _txtCurrentPage;
    private _lblPagesNumber;
    constructor(element: HTMLElement, options?: PdfViewerOptions | null);
    private createToolbar;
    addToolbarItems(toolbarItems: PdfViewerToolbarItem[]): void;
    toolbar(): HTMLElement;
    toolbarLeftArea(): any;
    toolbarCenterArea(): any;
    toolbarRightArea(): any;
    toolbarArea(area: PdfViewerToolbarAreaEnum): any;
    content(content?: string): void;
    private internalRender;
    page(page?: number): number;
    fileName(name?: string): string | undefined;
    download(): void;
    print(): void;
    getData(): Promise<string>;
    open(content?: string): void;
    close(): void;
    windowTitle(title: string): void;
    getOptions(): PdfViewerOptions;
    private canvasContainer;
}
declare class PdfViewerWindowSettings {
    maximize?: boolean;
    width?: number;
    height?: number;
    title?: string;
    closeable?: boolean;
}
declare class OnContentRenderedEvent {
    sender: PdfViewer;
    pdf: any;
    base64bytes: string;
}
export {};
