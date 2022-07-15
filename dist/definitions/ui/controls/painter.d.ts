import { VrControlOptions, VrControl, VrControlsEvent } from "../common";
export declare class PainterOptions extends VrControlOptions {
    imagePath?: string;
    size?: number;
    color?: string;
    saveSettings?: PainterSaveSettings;
    onMouseDown?: (e: PainterMouseDownEvent) => void;
    onMouseMove?: (e: PainterMouseMoveEvent) => void;
    onMouseUp?: (e: PainterMouseUpEvent) => void;
}
export declare class Painter extends VrControl {
    private _color;
    private _size;
    private _points;
    private _ctx;
    private _image;
    private _isMoving;
    private _pointTag?;
    constructor(element: HTMLElement, options?: PainterOptions | null);
    color(color?: string): string;
    size(size?: number): number;
    image(imagePath?: string): any;
    pointTag(tag?: any): any;
    points(points?: [Point[]]): [Point[]];
    draw(): any;
    private getPoint;
    clear(imagePath?: string): void;
    clearLastRoute(): void;
    clearRoute(tag: any): void;
    save(legendItems?: LegendItem[]): string;
    enable(): void;
    disable(): void;
    getOptions(): PainterOptions;
}
declare class Point {
    x: number;
    y: number;
    color: string;
    size: number;
    tag?: any;
}
declare class LegendItem {
    color?: string;
    text: string;
}
declare class PainterSaveSettings {
    legendWidth?: number;
    legendHeight?: number;
}
declare class PainterEvent extends VrControlsEvent {
    sender: Painter;
    event: any;
    points: [Point[]];
}
declare class PainterMouseDownEvent extends PainterEvent {
}
declare class PainterMouseMoveEvent extends PainterEvent {
}
declare class PainterMouseUpEvent extends PainterEvent {
}
export {};
