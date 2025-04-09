import { MenuItem } from "../vr";
import { VrControlOptions, VrControl, VrControlsEvent } from "../common";
export declare class MenuOptions extends VrControlOptions {
    items?: MenuItem[];
    onClick?: (onClickEvent: MenuOnClickEvent) => void;
}
export declare class Menu extends VrControl {
    private _items;
    private _value;
    constructor(element: HTMLElement, options?: MenuOptions | null);
    clear(): void;
    items(items?: MenuItem[]): MenuItem[];
    private itemsMap;
    value(value?: string | number): string | number;
    private openParents;
    private drawItems;
    private getChildrenBlocks;
    private getOnlyChildrenItems;
    getOptions(): MenuOptions;
}
export declare class MenuOnClickEvent extends VrControlsEvent {
    sender: Menu;
    dataItem: MenuItem;
}
