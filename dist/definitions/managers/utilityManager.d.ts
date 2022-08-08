import { WebApiModeEnum, IconClass } from "../ui/vr";
export declare class UtilityManager {
    static createGuid(): string;
    static interval(callback: Function, each: number, timeout?: number, timeoutCallback?: Function): void;
    static createIcon(icon: IconClass): HTMLElement;
    static duplicate(element: any): any;
    static equals(item1: any, item2: any): boolean;
    static getMonthNumberByName(monthName: string): -1 | MonthEnum;
    static doAjaxCall<T>(settings: AjaxCallSettings, callBack?: (response: T) => void, errorCallback?: () => void): null;
    static htmlDecode(text: string): string | null;
    static textWidth(object: HTMLElement | string): number;
    static downloadPdfBytes(base64Bytes: string, name?: string): void;
    private static base64ToArrayBuffer;
    static openUrl(url: string, name?: string, newTab?: boolean): void;
    static isValidEmail(email: string): boolean;
    static addCssStyle(cssRules: string, id?: string): void;
    static addCssFiles(...pathList: string[]): Promise<unknown>;
    static addJsScript(jsRules: string, id?: string): void;
    static addJsFiles(...pathList: string[]): Promise<unknown>;
    static bytesToBase64(bytes: Uint8Array): string;
    static base64ToBytes(base64: any): Uint8Array;
    private static getBase64Code;
    static base64ToFile(base64: string, fileName: string, options?: FilePropertyBag): Promise<File>;
    static base64ToBlob(base64: string, contentType?: string, sliceSize?: number): Blob;
    static enterFullScreen(target: HTMLElement, errorCallback?: Function): void;
    static exitFullScreen(): void;
    static drag(element: HTMLElement | JQuery | string, dragEvent?: VrDragSupportEvent): void;
}
declare class AjaxCallSettings {
    mode: WebApiModeEnum;
    authKey: string;
    method: string;
    request?: any;
    headerParameters?: any;
    file?: string | Blob | File;
}
declare enum MonthEnum {
    January = 0,
    February = 1,
    March = 2,
    April = 3,
    May = 4,
    June = 5,
    July = 6,
    August = 7,
    September = 8,
    October = 9,
    November = 10,
    December = 11
}
declare class VrDragSupportEvent {
    sensibility?: number;
    typeEnum?: VrDragSupportTypeEnum;
    dragLeft?: null | (() => void);
    dragRight?: null | (() => void);
    dragUp?: null | (() => void);
    dragDown?: null | (() => void);
    dragged?: null | ((e: VrDragEveryEvent) => void);
    dragging?: null | ((e: VrDragEveryEvent) => void);
}
declare class VrDragEveryEvent {
    left: number;
    top: number;
    element: HTMLElement;
}
export declare enum VrDragSupportTypeEnum {
    Vertical = 0,
    Horizontal = 1,
    Both = 2
}
export {};
