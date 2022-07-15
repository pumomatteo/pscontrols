export declare class PrintManager {
    static printBytes(base64Bytes: string, options?: PrintFileOptions): void;
    static printPdf(path: string, options?: PrintFileOptions): void;
    static printImage(path: string, options?: PrintFileOptions): void;
    static printHtml(elementId: string, options?: PrintFileOptions): void;
    static printElement(element: string | HTMLElement | JQuery, options?: PrintHtmlOptions): void;
    private static printBytesFileImageOrHtml;
    static printGrid(jsonData: any, options?: PrintGridOptions): void;
    private static print;
}
export declare enum PrintTypeEnum {
    Pdf = "pdf",
    Image = "image"
}
export declare class PrintFileOptions {
    type?: PrintTypeEnum;
    loadingMessage?: string;
    headerTitle?: string;
    documentTitle?: string;
    customCss?: string;
}
export declare class PrintHtmlOptions {
    pageTitle?: string;
    removeInlineStyles?: boolean;
    printDelay?: number;
    header?: string | HTMLElement | JQuery;
    footer?: string | HTMLElement | JQuery;
    removeScripts?: boolean;
    debug?: boolean;
    beforePrint?: Function;
    afterPrint?: Function;
}
declare class PrintGridOptions {
    headerCss?: string;
    contentCss?: string;
    properties?: string[];
    loadingMessage?: string;
    headerTitle?: string;
    repeatHeaderOnEveryPages?: boolean;
    documentTitle?: string;
}
export {};
