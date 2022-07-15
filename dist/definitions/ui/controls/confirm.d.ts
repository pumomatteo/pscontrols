import { TextAlignEnum } from "../vr";
import { VrControlsEvent } from "../common";
export declare class ConfirmOptions {
    textOkButton?: string;
    textCancelButton?: string;
    content?: string;
    title?: string;
    width?: number | string;
    height?: number | string;
    textAlign?: TextAlignEnum;
    css?: string;
    cssContainer?: string;
    onContentLoaded?(e: ContentConfirmLoadedEvent): void;
}
export declare class Confirm {
    private _window;
    private _options;
    constructor(text?: string | null, options?: ConfirmOptions | null);
    open(): Promise<any>;
    close(): void;
    private getOptions;
    private onContentLoaded;
}
declare class ContentConfirmLoadedEvent extends VrControlsEvent {
    sender: Confirm;
    contentElement: HTMLElement;
}
export {};
