import { VrControlOptions, VrControl, VrControlsEvent } from '../common';
import { OrientationEnum } from '../vr';
import { RadioButtonCheckEvent } from './radioButton';
export declare class RadioButtonListOptions extends VrControlOptions {
    items?: RadioButtonItem[];
    orientation?: OrientationEnum;
    listName?: string;
    onBeforeSelect?(e: RadioButtonListSelectEvent): void;
    onSelect?(e: RadioButtonListSelectEvent): void;
}
export declare class RadioButtonList extends VrControl {
    private _radioControls;
    private _items;
    constructor(element: HTMLElement, options?: RadioButtonListOptions | null);
    items(items?: RadioButtonItem[]): RadioButtonItem[];
    value(value?: string | number, triggerChange?: boolean): string;
    valueTag(tag?: any, triggerChange?: boolean): any;
    text(value: string, text?: string): string;
    clear(triggerChange?: boolean): void;
    clearItems(): void;
    getOptions(): RadioButtonListOptions;
    enable(): void;
    disable(): void;
}
declare class RadioButtonItem {
    text?: string;
    value?: string | number;
    checked?: boolean;
    tag?: any;
    onCheck?: (e: RadioButtonCheckEvent) => void;
}
declare class RadioButtonListSelectEvent extends VrControlsEvent {
    sender: RadioButtonList;
    value?: string;
}
export {};
