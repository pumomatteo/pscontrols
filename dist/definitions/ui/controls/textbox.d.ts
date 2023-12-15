import { VrControl, VrControlOptions, VrControlsEvent } from "../common";
import { TextAlignEnum, TextModeEnum, TextTransformModeEnum, ErrorModeEnum, ErrorPositionEnum, ErrorHideModeEnum, IconClass, NumberFormatRoundingSettings, TextBoxValidationSettings, TextBoxAutoCompleteEnum } from "../vr";
export declare class TextBoxOptions extends VrControlOptions {
    value?: string | number;
    placeholder?: string;
    readOnly?: boolean;
    rows?: number;
    decimals?: number;
    zeros?: number;
    align?: TextAlignEnum;
    mode?: TextModeEnum;
    inputMode?: TextTransformModeEnum;
    icon?: IconClass;
    imageUrl?: string;
    bold?: boolean;
    nullable?: boolean;
    growWithContent?: boolean;
    tooltip?: string;
    roundingSettings?: NumberFormatRoundingSettings;
    validation?: TextBoxValidationSettings;
    autocomplete?: TextBoxAutoCompleteEnum | string;
    onChanged?(e: TextBoxChangeEvent): void;
    onKeyUp?(e: TextBoxKeyUpEvent): void;
    onKeyDown?(e: TextBoxKeyDownEvent): void;
    onEnterKey?(e: TextBoxEnterKeyEvent): void;
    onFocus?(e: TextBoxFocusEvent): void;
    onBlur?(e: TextBoxBlurEvent): void;
    onPaste?(e: TextBoxPasteEvent): void;
}
export declare class TextBox extends VrControl {
    private _numberValue;
    private _hideErrorMode;
    private _keyDownCanceled;
    private _originalHeight;
    private _oldValue;
    private _originalMarginBottom;
    private _passwordViewableIcon;
    constructor(element: HTMLElement, options?: TextBoxOptions | null);
    value<T extends string | number | null>(value?: string | number | null, triggerChange?: boolean): T;
    private validate;
    placeholder(value?: string): string;
    type(type: TextModeEnum): void;
    getOptions(): TextBoxOptions;
    clear(triggerChange?: boolean): void;
    isEmpty(): boolean;
    private autoSize;
    private isNumericTextBox;
    viewPassword(state?: boolean): boolean;
    caretPosition(): number;
    insertTextAtCursor(text: string): void;
    insertTextAtPosition(text: string, position: number): void;
    appendText(text: string, position?: number): void;
    error(text?: string, mode?: ErrorModeEnum, position?: ErrorPositionEnum, hideMode?: ErrorHideModeEnum): void;
    hideError(): void;
    hasError(): any;
    private formatValue;
    change(): void;
}
export declare class TextBoxMultiline extends TextBox {
}
export declare class TextBoxNumeric extends TextBox {
}
export declare class TextBoxPassword extends TextBox {
}
export declare class TextBoxCurrency extends TextBox {
}
export declare class TextBoxPercentage extends TextBox {
}
export declare class TextBoxEvent extends VrControlsEvent {
    sender: TextBox;
    value: string | number | null;
}
declare class TextBoxChangeEvent extends TextBoxEvent {
    oldValue: string | number | null;
}
declare class TextBoxFocusEvent extends TextBoxEvent {
}
declare class TextBoxBlurEvent extends TextBoxEvent {
    target: HTMLElement;
    relatedTarget?: EventTarget | null;
}
declare class TextBoxPasteEvent extends TextBoxEvent {
    pastedValue: string;
}
declare class TextBoxKeyUpPressEvent extends TextBoxEvent {
    key: string;
    shiftKey: boolean;
    altKey: boolean;
    ctrlKey: boolean;
    enterKey: boolean;
    backSpaceKey: boolean;
    tabKey: boolean;
}
declare class TextBoxKeyUpEvent extends TextBoxKeyUpPressEvent {
    validForNumeric: boolean;
}
declare class TextBoxKeyDownEvent extends TextBoxKeyUpPressEvent {
    validForNumeric: boolean;
}
declare class TextBoxEnterKeyEvent extends TextBoxEvent {
}
export {};
