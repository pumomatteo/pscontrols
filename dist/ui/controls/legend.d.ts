import { VrControlOptions, VrControl } from '../common';
export declare class LegendOptions extends VrControlOptions {
    title?: string;
    fontSize?: number | string;
    fontFamily?: string;
    bold?: boolean;
}
export declare class Legend extends VrControl {
    constructor(element: HTMLElement, options?: LegendOptions | null);
}
