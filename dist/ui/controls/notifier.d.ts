import { AnimationShowEnum, AnimationHideEnum, NotifierOptions } from '../vr';
export declare class Notifier {
    private _options;
    private _container;
    private _arrow;
    private _element;
    constructor(text: string, options?: NotifierOptions | null);
    private prepareNotification;
    private getContainerToAdd;
    container(): HTMLElement;
    visible(state?: boolean): any;
    show(text?: string): void;
    open(text?: string): void;
    hide(): void;
    close(): void;
    isOnTarget(): boolean;
    target(): HTMLElement;
    targetOptions(): TargetOptions;
    element(): HTMLElement;
    getOptions(): NotifierOptions;
}
export declare class NotifierShowSettings {
    duration: number;
    animation?: AnimationShowEnum;
}
export declare class NotifierCustomHtmlEvent {
    sender: Notifier;
    divContainer: HTMLElement;
}
declare class TargetOptions {
    height: number;
    width: number;
    marginLeft: number;
    marginRight: number;
    marginTop: number;
    marginBottom: number;
    offsetLeft: number;
    offsetTop: number;
}
export declare class NotifierOnClickEvent {
    sender: Notifier;
    text?: string;
}
export declare class NotifierHideSettings {
    autoHide?: boolean | number;
    clickToHide?: boolean;
    duration?: number;
    animation?: AnimationHideEnum;
}
export {};
