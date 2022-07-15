import { VrControl } from "src/ui/common";
export declare class ControlManager {
    private static _dictionaryControls;
    static add(control: VrControl): void;
    static get<T extends VrControl>(controlId: string): T;
    static remove(controlId: string): void;
}
