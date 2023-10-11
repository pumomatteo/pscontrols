import { VrControlsEvent } from "../common";
import { TextBoxOptions } from "./textbox";
export declare class PromptOptions {
    textOkButton?: string;
    textCancelButton?: string;
    content?: string;
    title?: string;
    defaultValue?: string;
    textboxSettings?: TextBoxOptions;
    width?: number | string;
    height?: number | string;
    css?: string;
    cssContainer?: string;
    onContentLoaded?(e: ContentPromptLoadedEvent): void;
}
export declare class Prompt {
    private _window;
    private _options;
    private _textBox;
    constructor(text?: string | null, options?: PromptOptions | null);
    open(): Promise<string>;
    close(): void;
    private getOptions;
    private onContentLoaded;
}
declare class ContentPromptLoadedEvent extends VrControlsEvent {
    sender: Prompt;
    contentElement: HTMLElement;
}
export {};
