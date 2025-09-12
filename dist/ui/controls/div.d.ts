import { VrControl, VrControlOptions } from '../common';
import { DivBorderSettings, DivColorSettings } from '../vr';
export declare class DivOptions extends VrControlOptions {
    text?: string;
    fontSize?: number;
    tooltip?: string;
    inline?: boolean;
    colorSettings?: DivColorSettings;
    border?: DivBorderSettings | boolean;
}
export declare class Div extends VrControl {
    constructor(element: HTMLElement, options?: DivOptions | null);
    text(text?: string): string;
    appendText(text: string): void;
    private setBorderTop;
    getOptions(): DivOptions;
}
