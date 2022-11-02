import { VrControl, VrControlOptions, VrControlsEvent } from "../common";
import { vrEditorItemEnum, vrEditorToolbarModeEnum, vrEditorCustomItem, vrEditorCustomMenuItem, vrEditorSpeechRecognizerSettings, vrEditorFontSizeSettings } from "../vr";
import { SpeechRecognizer } from "./speechRecognizer";
export declare class EditorOptions extends VrControlOptions {
    text?: string;
    placeholder?: string;
    resizable?: boolean;
    language?: string;
    pasteImages?: boolean;
    toolbarMode?: vrEditorToolbarModeEnum;
    menu?: boolean | vrEditorMenu;
    toolbar?: boolean | vrEditorItemEnum[] | string;
    plugins?: string;
    customToolItems?: vrEditorCustomItem[];
    customMenuItems?: vrEditorCustomMenuItem[];
    baseUrl?: string;
    speechRecognizer?: vrEditorSpeechRecognizerSettings | boolean;
    fontSize?: vrEditorFontSizeSettings;
    browserSpellCheck?: boolean;
    pasteAsText?: boolean;
    replacePtagWithDiv?: boolean;
    statusbar?: boolean;
    onFocus?: (e: EditorOnFocusEvent) => void;
    onBlur?: (e: EditorOnBlurEvent) => void;
    onCommand?: (e: EditorOnCommandEvent) => void;
    onSetContent?: (e: EditorSetContentEvent) => void;
    onBeforeResize?: (e: EditorOnResizingEvent) => void;
    onAfterResize?: (e: EditorOnResizedEvent) => void;
    onKeyUp?: (e: EditorOnKeyUpEvent) => void;
    onKeyDown?: (e: EditorOnKeyDownEvent) => void;
    onInit?: (e: EditorOnInitEvent) => void;
    onDrop?: (e: EditorDropEvent) => void;
    onDragEnter?: (e: EditorDragEnterEvent) => void;
    onDragOver?: (e: EditorDragOverEvent) => void;
    onDragLeave?: (e: EditorDragLeaveEvent) => void;
}
export declare class Editor extends VrControl {
    private _settings;
    private _tinyMceControl;
    private _divMenuItem;
    private _finalTextSpeeched;
    private _value;
    private _speechRecognizer;
    private _divDragFile;
    private _initialized;
    private _wndCommands;
    private _wndTempMessage;
    private _txtTempMessage;
    constructor(element: HTMLElement, options?: EditorOptions | null);
    settings(): TinyMceSettings;
    private openWindowTempMessage;
    private createWindowTempMessage;
    private openWindowCommands;
    private createWindowCommands;
    private parseInput;
    private replaceAll;
    private manageDragLeave;
    private manageDrop;
    tinyMceControl(): any;
    value(text?: string | null, html?: boolean): string;
    insertTextAtCursor(text: string): void;
    appendText(text: string, html?: boolean): string;
    body(): HTMLBodyElement;
    speechRecognizer(): SpeechRecognizer;
    clear(): void;
    focus(): void;
    addMenuItem(item: vrEditorCustomMenuItem): void;
    getOptions(): EditorOptions;
    enable(): void;
    disable(): void;
}
declare class TinyMceSettings {
    readonly?: boolean;
    placeholder?: string;
    resize?: boolean;
    elements?: string;
    toolbar_mode?: vrEditorToolbarModeEnum;
    paste_data_images?: boolean;
    language?: string;
    toolbar?: string;
    plugins?: string;
    paste_enable_default_filters?: boolean;
    paste_word_valid_elements?: string;
    paste_retain_style_properties?: string;
    menubar?: boolean;
    menu?: any;
}
declare class vrEditorMenu {
    file?: boolean | vrEditorMenuItem;
    edit?: boolean | vrEditorMenuItem;
    view?: boolean | vrEditorMenuItem;
    insert?: boolean | vrEditorMenuItem;
    format?: boolean | vrEditorMenuItem;
    tools?: boolean | vrEditorMenuItem;
    table?: boolean | vrEditorMenuItem;
}
declare class vrEditorMenuItem {
    items?: vrEditorItemEnum[] | string;
    title?: string;
}
declare class EditorEvent extends VrControlsEvent {
    sender: Editor;
    realEvent: any;
}
export declare class EditorItemClickEvent extends EditorEvent {
}
declare class EditorOnFocusEvent extends EditorEvent {
}
declare class EditorOnBlurEvent extends EditorEvent {
}
declare class EditorOnCommandEvent extends EditorEvent {
    command: string;
    type: string;
    value: any;
}
declare class EditorSetContentEvent extends EditorEvent {
    content: string;
    element: HTMLElement;
    format: string;
    type: string;
}
declare class EditorOnResizingEvent extends EditorEvent {
    height: number;
    width: number;
    target: HTMLElement;
    type: string;
}
declare class EditorOnResizedEvent extends EditorEvent {
    height: number;
    width: number;
    target: HTMLElement;
    type: string;
}
declare class EditorOnKeyUpEvent extends EditorEvent {
    key: string;
    keyCode: string;
}
declare class EditorOnKeyDownEvent extends EditorEvent {
    key: string;
    keyCode: string;
}
declare class EditorOnInitEvent extends EditorEvent {
    event: any;
}
declare class EditorDragDropEvent extends EditorEvent {
    event: any;
    element: HTMLElement;
}
declare class EditorDropEvent extends EditorDragDropEvent {
    files: File[];
}
declare class EditorDragEnterEvent extends EditorDragDropEvent {
}
declare class EditorDragOverEvent extends EditorDragDropEvent {
}
declare class EditorDragLeaveEvent extends EditorDragDropEvent {
}
export {};
