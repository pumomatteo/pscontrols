import { VrControl, VrControlOptions, VrControlsEvent } from "../common";
import { IconClass } from "../vr";
export declare class SearchBarOptions extends VrControlOptions {
    collapsed?: boolean;
    icon?: IconClass | boolean;
    placeholder?: string;
    expandOnClick?: boolean;
    collapseOnBlur?: boolean;
    onClick?(e: SearchBarClickEvent): void;
    onKeyUp?(e: SearchBarKeyUpEvent): void;
    onEnterKey?(e: SearchBarEnterKeyEvent): void;
    onBlur?(e: SearchBarBlurEvent): void;
}
export declare class SearchBar extends VrControl {
    private _textBox;
    private _previousValue;
    constructor(element: HTMLElement, options?: SearchBarOptions | null);
    value(text?: string): string;
    clear(): void;
    collapse(): void;
    expand(): void;
    isCollapsed(): boolean;
    focus(): void;
}
declare class SearchBarEvent extends VrControlsEvent {
    sender: SearchBar;
    value: string;
}
declare class SearchBarKeyUpEvent extends SearchBarEvent {
    previousValue: string;
}
declare class SearchBarEnterKeyEvent extends SearchBarEvent {
}
declare class SearchBarClickEvent extends SearchBarEvent {
}
declare class SearchBarBlurEvent extends SearchBarEvent {
}
export {};
