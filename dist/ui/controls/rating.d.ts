import { RatingPrecisionEnum } from '../vr';
import { VrControlOptions, VrControl } from '../common';
export declare class RatingOptions extends VrControlOptions {
    value?: number;
    max?: number;
    size?: string | number;
    precision?: RatingPrecisionEnum;
    tooltip?: boolean;
    colorSettings?: RatingColorSettings;
    total?: number;
    readonly?: boolean;
    onSelect?: (e: RatingSelectEvent) => void;
}
export declare class Rating extends VrControl {
    private _value?;
    private _lblTotal;
    constructor(element: HTMLElement, options?: RatingOptions | null);
    value(value?: number, triggerChange?: boolean): any;
    clear(): void;
    color(colorSettings?: RatingColorSettings): RatingColorSettings | undefined;
    size(size?: string | number): number;
    total(total?: number): number;
    enable(): void;
    disable(): void;
    getOptions(): RatingOptions;
}
declare class RatingSelectEvent {
    sender: Rating;
    value: number;
    oldValue?: number | null;
}
declare class RatingColorSettings {
    selected?: string;
    hover?: string;
    notSelected?: string;
}
export {};
