import { SpeechRecognizerOptions } from "../vr";
import { VrControl, VrControlsEvent } from "../common";
export declare class SpeechRecognizer extends VrControl {
    private _btnMicrophone;
    private _recognition;
    private _allTextFromStart;
    constructor(element: HTMLElement, options?: SpeechRecognizerOptions | null);
    start(): void;
    stop(): void;
    isRecording(): boolean;
    getOptions(): SpeechRecognizerOptions;
    enable(): void;
    disable(): void;
}
export declare class SpeechRecognizerEvent extends VrControlsEvent {
    sender: SpeechRecognizer;
}
export declare class SpeechRecognizerNoMatchEvent extends SpeechRecognizerEvent {
}
export declare class SpeechRecognizerClickEvent extends SpeechRecognizerEvent {
}
export declare class SpeechRecognizerErrorEvent extends SpeechRecognizerEvent {
    error: string;
    message: string;
}
export declare class SpeechRecognizerResultEvent extends SpeechRecognizerEvent {
    results: any;
    resultIndex: number;
    interimResults: string;
    finalResults: string;
    allTextFromStart: string;
}
export declare class SpeechRecognizerStartEvent extends SpeechRecognizerEvent {
}
export declare class SpeechRecognizerEndEvent extends SpeechRecognizerEvent {
}
export declare class SpeechRecognizerSpeechStartEvent extends SpeechRecognizerEvent {
}
export declare class SpeechRecognizerSpeechEndEvent extends SpeechRecognizerEvent {
}
export declare class SpeechRecognizerAudioStartEvent extends SpeechRecognizerEvent {
}
export declare class SpeechRecognizerAudioEndEvent extends SpeechRecognizerEvent {
}
export declare class SpeechRecognizerSoundStartEvent extends SpeechRecognizerEvent {
}
export declare class SpeechRecognizerSoundEndEvent extends SpeechRecognizerEvent {
}
