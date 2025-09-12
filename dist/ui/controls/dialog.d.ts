import { TextAlignEnum } from '../vr';
import { Window, WindowFooterItem } from './window';
import { VrControlsEvent } from '../common';
export declare class DialogOptions {
    content?: string;
    title?: string;
    width?: number;
    height?: number;
    textAlign?: TextAlignEnum;
    footerItems?: WindowFooterItem[];
    css?: string;
    cssContainer?: string;
    hideCloseIcon?: boolean;
    onContentLoaded?(e: ContentDialogLoadedEvent): void;
    onClose?: () => void;
}
export declare class Dialog {
    private _window;
    private _options;
    constructor(text?: string | null, options?: DialogOptions | null);
    open(): void;
    close(): void;
    window(): Window;
    private getOptions;
    private onContentLoaded;
}
declare class ContentDialogLoadedEvent extends VrControlsEvent {
    sender: Dialog;
    contentElement: HTMLElement;
}
export {};
