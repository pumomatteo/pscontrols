import { TextAlignEnum } from "../vr";
import { VrControlsEvent } from "../common";
export declare class AlertOptions {
    textOkButton?: string;
    content?: string;
    title?: string;
    width?: number | string;
    height?: number | string;
    textAlign?: TextAlignEnum;
    css?: string;
    cssContainer?: string;
    onContentLoaded?(e: ContentAlertLoadedEvent): void;
}
export declare class Alert {
    private _window;
    private _options;
    constructor(text?: string | null, options?: AlertOptions | null);
    open(): Promise<any>;
    close(): void;
    private getOptions;
    private onContentLoaded;
}
declare class ContentAlertLoadedEvent extends VrControlsEvent {
    sender: Alert;
    contentElement: HTMLElement;
}
export {};
