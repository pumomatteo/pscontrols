import { VrControlOptions, VrControl } from '../common';
export declare class RadioButtonOptions extends VrControlOptions {
    text?: string;
    value?: string;
    checked?: boolean;
    name?: string;
    onCheck?(e: RadioButtonCheckEvent): void;
}
export declare class RadioButton extends VrControl {
    constructor(element: HTMLElement, options?: RadioButtonOptions | null);
    checked(state?: boolean, triggerChange?: boolean): boolean;
    text(text?: string): string;
    clear(triggerChange?: boolean): void;
    getOptions(): RadioButtonOptions;
    enable(): void;
    disable(): void;
}
declare class RadioButtonEvent {
    sender: RadioButton;
}
export declare class RadioButtonCheckEvent extends RadioButtonEvent {
    checked: boolean;
}
export {};
