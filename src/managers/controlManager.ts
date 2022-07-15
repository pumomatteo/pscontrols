import { Dictionary } from "./dictionary";
import { VrControl } from "src/ui/common";

export class ControlManager
{
    private static _dictionaryControls: Dictionary<string, VrControl> = new Dictionary();

    static add(control: VrControl): void
    {
        if (control.options().addToControlList === true && control.id() != null && control.id() != "")
            this._dictionaryControls.set(control.id(), control);
    }

    static get<T extends VrControl>(controlId: string): T
    {
        return this._dictionaryControls.get(controlId) as T;
    }

    static remove(controlId: string)
    {
        if (controlId != "" && controlId != null)
            this._dictionaryControls.delete(controlId);
    }
}