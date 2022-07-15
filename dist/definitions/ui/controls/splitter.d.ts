import { VrControlOptions, VrControl, VrControlsEvent } from "../common";
import { SplitterCollapsableSettings, SplitterDirectionEnum } from "../vr";
export declare class SplitterOptions extends VrControlOptions {
    direction?: SplitterDirectionEnum;
    collapsable?: boolean | SplitterCollapsableSettings;
    resizable?: boolean;
    onBeforeExpandCollapse?: (e: SplitterBeforeExpandCollapseEvent) => void;
    onAfterExpandExpandCollapse?: (e: SplitterAfterExpandCollapseEvent) => void;
    onBeforeResize?: (e: SplitterBeforeResizeEvent) => void;
    onAfterResize?: (e: SplitterAfterResizeEvent) => void;
}
export declare class Splitter extends VrControl {
    private _previousDiv;
    private _nextDiv;
    constructor(element: HTMLElement, options?: SplitterOptions | null);
}
declare class SplitterEvent extends VrControlsEvent {
    sender: Splitter;
}
declare class SplitterExpandCollapseEvent extends SplitterEvent {
    collapse: boolean;
    previousDiv: HTMLElement;
    nextDiv: HTMLElement;
}
declare class SplitterBeforeExpandCollapseEvent extends SplitterExpandCollapseEvent {
}
declare class SplitterAfterExpandCollapseEvent extends SplitterExpandCollapseEvent {
}
declare class SplitterResizeEvent extends SplitterEvent {
    sender: Splitter;
    previousDiv: HTMLElement;
    nextDiv: HTMLElement;
    direction: SplitterDirectionEnum;
}
declare class SplitterBeforeResizeEvent extends SplitterResizeEvent {
}
declare class SplitterAfterResizeEvent extends SplitterResizeEvent {
}
export {};
