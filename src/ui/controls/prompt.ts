import { createWindow, ButtonModeEnum, WindowFooterItemTypeEnum, createTextBox, puma } from "../vr";
import { Window } from "./window";
import { VrControlsEvent } from "../common";
import { TextBox, TextBoxOptions } from "./textbox";
import { Button } from "./button";

//#region Options
export class PromptOptions {
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
//#endregion

//#region Control
export class Prompt {
    private _window: Window;
    private _options: PromptOptions;
    private _textBox: TextBox;

    constructor(text?: string | null, options?: PromptOptions | null) {
        //#region Options
        if (options == null)
            options = new PromptOptions();

        if (options.textOkButton == null) options.textOkButton = "Conferma";
        if (options.textCancelButton == null) options.textCancelButton = "Annulla";
        if (options.width == null) options.width = 300;
        if (options.height == null) options.height = 120;
        //#endregion

        this._options = options;

        //#region Content
        let content = "";
        if (options.content == null && text == null) options.content = "<div></div>";
        if (options.content != null)
            content = options.content;
        else if (text != null)
            content = text;
        //#endregion

        //#region TextBoxSettings
        if (options.textboxSettings == null)
            options.textboxSettings = new TextBoxOptions();

        if (options.textboxSettings.width == null) options.textboxSettings.width = "100%";
        if (options.textboxSettings.cssContainer == null) options.textboxSettings.cssContainer = "margin-top: 5px;";
        if (options.textboxSettings.value == null) options.textboxSettings.value = options.defaultValue;
        //#endregion

        this._window = createWindow(
            {
                addToControlList: false,
                closeable: false,
                title: options.title,
                width: options.width,
                height: options.height,
                removeOnClose: true,
                content: "<div class='contentContainer'>" + content + "</div>",
                cssContainer: "height: auto !important;",
                css: "height: auto !important;",
                footer:
                    [
                        { type: WindowFooterItemTypeEnum.Custom, text: options.textCancelButton, value: "close", cssContainer: "width: Calc(50% - 5px);", css: "width: 100%;", onClick: () => this.close() },
                        { type: WindowFooterItemTypeEnum.Custom, text: options.textOkButton, value: "ok", cssContainer: "width: Calc(50% - 5px);", css: "width: 100%;", mode: ButtonModeEnum.Primary }
                    ],
                onContentLoaded: (e) => {
                    let contentContainer = puma(e.sender.element()).find(".contentContainer")[0];
                    this._textBox = createTextBox(options!.textboxSettings, contentContainer);
                    window.setTimeout(() => this._textBox.focus());
                    this.onContentLoaded(contentContainer);
                }
            });

        if (options.cssContainer != null)
            this._window.container().style.cssText += options.cssContainer + ";";

        if (options.css != null)
            this._window.element().style.cssText += options.css + ";";

        puma(this._window.element()).addClass("vrPrompt");
        puma(this._window.container()).addClass("vrPromptContainer");
    }

    open(): Promise<string> {
        let promise = new Promise((okCallback?: (value: string) => void, cancelCallback?: Function) => {
            this._window.open(
                [
                    {
                        value: "ok", callback: () => {
                            if (okCallback != null)
                                okCallback(this._textBox.value());

                            this.close();
                        }
                    },
                    {
                        value: "close", callback: () => {
                            if (cancelCallback != null)
                                cancelCallback();

                            console.log();
                        }
                    }
                ]
            );
            this._textBox.focus();
        });
        return promise;
    }

    close(): void {
        this._window.close();
        puma(this._window.container()).remove();
        puma(this._window.background()).remove();
    }

    private getOptions(): PromptOptions {
        return this._options;
    }

    private onContentLoaded(contentElement: HTMLElement): void {
        let options = this.getOptions();
        if (options.onContentLoaded != null) {
            let contentLoadedEvent = new ContentPromptLoadedEvent();
            contentLoadedEvent.sender = this;
            contentLoadedEvent.contentElement = contentElement;
            options.onContentLoaded(contentLoadedEvent);
        }
    }
}
//#endregion

//#region Events
class ContentPromptLoadedEvent extends VrControlsEvent {
    sender: Prompt;
    contentElement: HTMLElement;
}
//#endregion