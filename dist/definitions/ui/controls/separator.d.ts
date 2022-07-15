import { VrControlOptions, VrControl } from "../common";
import { OrientationEnum } from "../vr";
export declare class SeparatorOptions extends VrControlOptions {
    size?: number;
    orientation?: OrientationEnum;
    color?: string;
    marginSettings?: MarginSettings;
}
export declare class Separator extends VrControl {
    constructor(element: HTMLElement, options?: SeparatorOptions | null);
}
declare class MarginSettings {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
}
export {};
