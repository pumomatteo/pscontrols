import { createWindow, TextAlignEnum, puma } from "../vr";
import { Window, WindowFooterItem } from "./window";
import { VrControlsEvent } from "../common";

//#region Options
export class DialogOptions
{
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
//#endregion

//#region Control
export class Dialog
{
    private _window: Window;
    private _options: DialogOptions;

    constructor(text?: string | null, options?: DialogOptions | null)
    {
        //#region Options
        if (options == null)
            options = new DialogOptions();

        if (options.width == null) options.width = 300;
        if (options.height == null) options.height = 120;
        if (options.textAlign == null) options.textAlign = TextAlignEnum.Center;
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

        //#region Text align
        let textAlign = "";
        switch (options.textAlign)
        {
            case TextAlignEnum.Left: textAlign = "text-align: left;"; break;
            case TextAlignEnum.Center: textAlign = "text-align: center;"; break;
            case TextAlignEnum.Right: textAlign = "text-align: right;"; break;
        }
        //#endregion

        //#region Footer items
        if (options.footerItems != null)
        {
            let totalWidth = options.footerItems.filter(k => k.width != null).map(k => k.width).vrSum();
            let noWidthItems = options.footerItems.filter(k => k.width == null);
            let widthItems = options.footerItems.filter(k => k.width != null);

            let footerAvailableWidth = (options.width - 10 - (widthItems.length * 5)) - totalWidth;
            let singleItemWidth = footerAvailableWidth / options.footerItems.length - 5;
            if (noWidthItems.length > 0)
                singleItemWidth = footerAvailableWidth / noWidthItems.length - 5;

            for (let footerItem of options.footerItems)
            {
                if (footerItem.width == null)
                    footerItem.width = singleItemWidth;
            }
        }
        //#endregion

        this._window = createWindow(
            {
                addToControlList: false,
                closeable: false,
                hideCloseIcon: options.hideCloseIcon,
                title: options.title,
                width: options.width,
                height: options.height,
                content: "<div class='contentContainer'>" + content + "</div>",
                cssContainer: "height: auto !important;",
                css: "height: auto !important;" + textAlign,
                footer: options.footerItems,
                onContentLoaded: (e) => this.onContentLoaded(puma(e.sender.element()).find(".contentContainer")[0]),
                onClose: () =>
                {
                    if (options!.onClose != null)
                        options!.onClose();
                }
            });

        if (options.cssContainer != null)
            this._window.container().style.cssText += options.cssContainer + ";";

        if (options.css != null)
            this._window.element().style.cssText += options.css + ";";

        puma(this._window.element()).addClass("vrDialog");
        puma(this._window.container()).addClass("vrDialogContainer");
    }

    open(): void
    {
        this._window.open();
    }

    close(): void
    {
        this._window.close();
        puma(this._window.container()).remove();
        puma(this._window.background()).remove();
    }

    window()
    {
        return this._window;
    }

    private getOptions(): DialogOptions
    {
        return this._options;
    }

    private onContentLoaded(contentElement: HTMLElement): void
    {
        let options = this.getOptions();
        if (options.onContentLoaded != null)
        {
            let contentLoadedEvent = new ContentDialogLoadedEvent();
            contentLoadedEvent.sender = this;
            contentLoadedEvent.contentElement = contentElement;
            options.onContentLoaded(contentLoadedEvent);
        }
    }
}
//#endregion

//#region Events
class ContentDialogLoadedEvent extends VrControlsEvent
{
    sender: Dialog;
    contentElement: HTMLElement;
}
//#endregion