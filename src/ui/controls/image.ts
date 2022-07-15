import { ControlTypeEnum, ImagePositionTypeEnum, ImageToolbarTypeEnum, confirm, IconClass, puma } from "../vr";
import { VrControl, VrControlOptions } from "../common";

//#region Options
export class ImageOptions extends VrControlOptions
{
    value?: string;
    base64?: boolean;
    tooltip?: string;
    position?: ImagePositionTypeEnum;
    toolbarItems?: ImageToolbarItem[];
    overlayDescription?: boolean | string;

    onHover?(): void;
    onLeave?(): void;
    onClick?(e: ImageClickEvent): void;
}
//#endregion

//#region Control
export class Image extends VrControl
{
    constructor(element: HTMLElement, options?: ImageOptions | null)
    {
        //#region Options
        if (options == null)
            options = new ImageOptions();

        if (options.position == null) options.position = ImagePositionTypeEnum.Original;
        if (options.base64 == null) options.base64 = false;
        if (options.overlayDescription == null) options.overlayDescription = false;
        if (options.tabIndex == null) options.tabIndex = -1;
        //#endregion

        super(element, options, ControlTypeEnum.Image);
        this.element().style.cssText += "width: auto; height: auto;";

        //#region Value
        if (options.value != null)
            this.value(options.value);
        //#endregion

        //#region Tooltip
        if (options.tooltip != null)
        {
            (this.element() as HTMLImageElement).alt = options.tooltip;
            (this.element() as HTMLImageElement).title = options.tooltip;
        }
        //#endregion

        //#region Image position
        switch (options.position)
        {
            case ImagePositionTypeEnum.Center:
                {
                    this.container().style.cssText += "text-align: center; justify-content: center;";
                    this.element().style.cssText += "max-width: 100%; max-height: 100%;";
                }
                break;
            case ImagePositionTypeEnum.Fill: this.element().style.cssText += "width: 100%; max-height: 100%;"; break;
            case ImagePositionTypeEnum.Fit: this.element().style.cssText += "height: 100%; max-width: 100%;"; break;
            case ImagePositionTypeEnum.Stretch: this.element().style.cssText += "width: 100%; height: 100%;"; break;
            case ImagePositionTypeEnum.Original: this.element().style.cssText += "max-width: 100%; max-height: 100%;"; break;
        }
        //#endregion

        //#region Toolbar items
        if (options.toolbarItems != null)
        {
            let toolbar = document.createElement("div");
            puma(toolbar).addClass("vrImageToolbar");
            puma(this.container()).prepend(toolbar);

            for (let toolbarItem of options.toolbarItems)
            {
                if (toolbarItem.type == null) toolbarItem.type = ImageToolbarTypeEnum.Custom;
                switch (toolbarItem.type)
                {
                    case ImageToolbarTypeEnum.Download:
                        {
                            //#region Download
                            let downloadButton = document.createElement("a");
                            puma(downloadButton).addClass("vrImageDownloadToolbar vrImageToolbarItem");
                            downloadButton.download = "download";
                            downloadButton.href = this.value();
                            downloadButton.innerHTML = "<i class='fa fa-download' aria-hidden='true'></i>";
                            toolbar.append(downloadButton);

                            puma(downloadButton).click((e: JQueryEventObject) =>
                            {
                                if (toolbarItem.onClick != null)
                                {
                                    let event = new ImageToolbarClickEvent();
                                    event.sender = this;
                                    toolbarItem.onClick(event);
                                }
                            });
                            //#endregion
                        }
                        break;
                    case ImageToolbarTypeEnum.Delete:
                        {
                            //#region Delete
                            let deleteButton = document.createElement("a");
                            puma(deleteButton).addClass("vrImageDeleteToolbar vrImageToolbarItem");
                            deleteButton.id = "deleteToolbarImage_" + element.id;
                            deleteButton.innerHTML = "<i class='fa fa-remove' aria-hidden='true'></i>";
                            toolbar.append(deleteButton);

                            puma(deleteButton).click((e: JQueryEventObject) =>
                            {
                                if (toolbarItem.confirmationMessage != null && toolbarItem.confirmationMessage != "")
                                {
                                    confirm(toolbarItem.confirmationMessage).then(() =>
                                    {
                                        this.clear();
                                        if (toolbarItem.onClick != null)
                                        {
                                            let event = new ImageToolbarClickEvent();
                                            event.sender = this;
                                            toolbarItem.onClick(event);
                                        }
                                    });
                                }
                                else
                                {
                                    this.clear();
                                    if (toolbarItem.onClick != null)
                                    {
                                        let event = new ImageToolbarClickEvent();
                                        event.sender = this;
                                        toolbarItem.onClick(event);
                                    }
                                }
                            });
                            //#endregion
                        }
                        break;
                    case ImageToolbarTypeEnum.Custom:
                        {
                            //#region Custom
                            let customButton = document.createElement("a");
                            puma(customButton).addClass("vrImageToolbarItem");
                            customButton.innerHTML = "<i class='fa fa-" + toolbarItem.icon + "'></i>";
                            customButton.style.cssText += "float: right; margin-right: 7px; color: #FFF; cursor: pointer;";
                            toolbar.append(customButton);

                            puma(customButton).click((e: JQueryEventObject) =>
                            {
                                if (toolbarItem.confirmationMessage != null && toolbarItem.confirmationMessage != "")
                                {
                                    confirm(toolbarItem.confirmationMessage).then(() =>
                                    {
                                        if (toolbarItem.onClick != null)
                                        {
                                            let event = new ImageToolbarClickEvent();
                                            event.sender = this;
                                            toolbarItem.onClick(event);
                                        }
                                    });
                                }
                                else
                                {
                                    if (toolbarItem.onClick != null)
                                    {
                                        let event = new ImageToolbarClickEvent();
                                        event.sender = this;
                                        toolbarItem.onClick(event);
                                    }
                                }
                            });
                            //#endregion
                        }
                        break;
                }
            }
        }
        //#endregion

        //#region Overlay description
        if (options.overlayDescription !== false)
        {
            if (options.overlayDescription == true) options.overlayDescription = "";

            let overlayDescription = document.createElement("div");
            puma(overlayDescription).addClass("vrImageOverlayDescription");
            overlayDescription.innerHTML = options.overlayDescription;
            puma(this.container()).prepend(overlayDescription);
        }
        //#endregion

        //#region Events
        puma(this.container()).on("mouseenter", (e: JQuery.Event) =>
        {
            if (!this.enabled())
                return;

            if (this.value() != null && this.value() != "")
            {
                if (options!.toolbarItems != null)
                    puma(this.container()).find(".vrImageToolbar").show();

                if (options!.overlayDescription !== false)
                    puma(this.container()).find(".vrImageOverlayDescription").show();
            }

            if (options!.onHover != null)
                options!.onHover();
        });

        puma(this.container()).on("mouseleave", (e: JQuery.MouseLeaveEvent) =>
        {
            if (!this.enabled())
                return;

            if (options!.toolbarItems != null)
                puma(this.container()).find(".vrImageToolbar").hide();

            if (options!.overlayDescription !== false)
                puma(this.container()).find(".vrImageOverlayDescription").hide();

            if (options!.onLeave != null)
                options!.onLeave();
        });

        if (options.onClick != null)
        {
            this.element().style.cssText += "cursor: pointer;";
            puma(this.container()).on("click", (e: JQuery.ClickEvent) =>
            {
                if (!this.enabled())
                    return;

                let imageClickEvent = new ImageClickEvent();
                imageClickEvent.sender = this;
                options!.onClick!(imageClickEvent);
            });
        }
        //#endregion
    }

    //#region Methods
    value(pathOrBytes?: string, fileName?: string, mimeType?: string): string
    {
        let options = this.options<ImageOptions>();
        if (pathOrBytes != null && pathOrBytes != "")
        {
            mimeType = (mimeType == null) ? "image/png" : mimeType;
            fileName = (fileName == null) ? "download" : fileName;
            pathOrBytes = pathOrBytes.replace(/^data:image\/[^;]+;base64,/, '');

            let prePath = (options.base64) ? "data:" + mimeType + ";base64," : "";
            puma(this.element()).attr("src", prePath + pathOrBytes);

            //#region Download
            if (options.base64)
                pathOrBytes = pathOrBytes.replace(/^data:image\/[^;]+/, 'data:application/octet-stream');

            puma(this.container()).find(".vrImageDownloadToolbar").attr("href", prePath + pathOrBytes);
            puma(this.container()).find(".vrImageDownloadToolbar").attr("download", fileName);
            //#endregion 
        }
        return puma(this.element()).attr("src");
    }

    overlayDescription(description?: string): string
    {
        if (description != null)
        {
            let options = this.options<ImageOptions>();
            if (options.overlayDescription !== false)
                puma(this.container()).find(".vrImageOverlayDescription").html(description);
        }
        return puma(this.container()).find(".vrImageOverlayDescription").html();
    }

    toolbar()
    {
        return puma(this.container()).find(".vrImageToolbar")[0];
    }

    clear(): void
    {
        puma(this.element()).removeAttr("src");
    }
    //#endregion

    //#region Overrides
    enable()
    {
        super.enable();
        window.setTimeout(() => puma(this.toolbar()).show());
    }

    disable()
    {
        super.disable();
        window.setTimeout(() => puma(this.toolbar()).hide());
    }
    //#endregion

    getOptions()
    {
        return this.options<ImageOptions>();
    }
    //#endregion
}
//#endregion

//#region Classes
class ImageToolbarItem
{
    type?: ImageToolbarTypeEnum;
    icon?: IconClass;
    confirmationMessage?: string;
    onClick?(e: ImageToolbarClickEvent): void;
}

class ImageToolbarClickEvent
{
    sender: Image;
}

class ImageClickEvent
{
    sender: Image;
}
//#endregion