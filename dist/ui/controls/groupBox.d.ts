import { VrControlOptions, VrControl } from '../common';
import { Button, ButtonOptions } from './button';
export declare class GroupBoxOptions extends VrControlOptions {
    title?: string;
    content?: string | HTMLElement | JQuery;
    collapsable?: boolean;
    checkbox?: boolean | string;
    startingCollapsed?: boolean;
    startingChecked?: boolean;
    items?: GroupBoxItem[];
    scrollable?: boolean;
    onCheckboxClick?: (e: GroupBoxOnCheckboxClickEvent) => void;
    onCollapse?: (e: GroupBoxOnCollapseEvent) => void;
    onExpand?: (e: GroupBoxOnExpandEvent) => void;
}
export declare class GroupBox extends VrControl {
    private _contentContainer;
    private _btnCollapse;
    private _chkCheckbox;
    constructor(element: HTMLElement, options?: GroupBoxOptions | null);
    content(content?: string | JQuery | HTMLElement): HTMLElement;
    title(title?: string): any;
    collapse(): void;
    expand(): void;
    collapsed(state?: boolean): boolean;
    item(value: string): Button | null;
    enableItem(value: string): void;
    disableItem(value: string): void;
    showItem(value: string): void;
    hideItem(value: string): void;
    check(triggerChange?: boolean): void;
    unCheck(triggerChange?: boolean): void;
    checked(state?: boolean, triggerChange?: boolean): boolean | null;
    getOptions(): GroupBoxOptions;
}
declare class GroupBoxOnCheckboxClickEvent {
    sender: GroupBox;
    checked: boolean;
}
declare class GroupBoxOnCollapseEvent {
    sender: GroupBox;
}
declare class GroupBoxOnExpandEvent {
    sender: GroupBox;
}
declare class GroupBoxItem extends ButtonOptions {
}
export {};
