import { VrControlOptions, VrControl } from "../common";
import { CheckboxStateEnum, ErrorPositionEnum } from "../vr";
export declare class CheckBoxOptions extends VrControlOptions {
    text?: string;
    value?: string;
    threeState?: boolean;
    checked?: boolean;
    name?: string;
    tooltip?: string;
    onCheck?(e: CheckBoxCheckEvent): void;
}
export declare class CheckBox extends VrControl {
    constructor(element: HTMLElement, options?: CheckBoxOptions | null);
    checked<T extends boolean | null>(state?: CheckboxStateEnum | boolean, triggerChange?: boolean): T;
    check(): void;
    text(text?: string): string;
    clear(triggerChange?: boolean): void;
    getOptions(): CheckBoxOptions;
    error(text?: string, position?: ErrorPositionEnum, showIcon?: boolean): void;
    hideError(): void;
}
declare class CheckBoxEvent {
    sender: CheckBox;
}
export declare class CheckBoxCheckEvent extends CheckBoxEvent {
    stateEnum: CheckboxStateEnum;
    checked: boolean;
    shiftKey: boolean;
    ctrlKey: boolean;
}
export {};
