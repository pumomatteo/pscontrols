import { ImagePositionTypeEnum, ImageToolbarTypeEnum, IconClass } from '../vr';
import { VrControl, VrControlOptions } from '../common';
export declare class ImageOptions extends VrControlOptions {
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
export declare class Image extends VrControl {
    constructor(element: HTMLElement, options?: ImageOptions | null);
    value(pathOrBytes?: string, fileName?: string, mimeType?: string): string;
    overlayDescription(description?: string): string;
    toolbar(): any;
    clear(): void;
    enable(): void;
    disable(): void;
    getOptions(): ImageOptions;
}
declare class ImageToolbarItem {
    type?: ImageToolbarTypeEnum;
    icon?: IconClass;
    confirmationMessage?: string;
    onClick?(e: ImageToolbarClickEvent): void;
}
declare class ImageToolbarClickEvent {
    sender: Image;
}
declare class ImageClickEvent {
    sender: Image;
}
export {};
