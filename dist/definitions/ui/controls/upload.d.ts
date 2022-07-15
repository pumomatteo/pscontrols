import { VrControl, VrControlOptions, VrControlsEvent } from "../common";
import { UploadValidationErrorTypeEnum } from "../vr";
export declare class UploadOptions extends VrControlOptions {
    dropArea?: boolean | HTMLElement | string | JQuery;
    dropAreaText?: boolean | string;
    webApiSettings?: UploadWebApiSettings;
    multiple?: boolean;
    progressBar?: boolean;
    fileList?: boolean;
    fileListMaxHeight?: number;
    uploadButton?: boolean | string;
    autoUpload?: boolean;
    confirmToRemoveFile?: boolean;
    canRemoveFile?: boolean;
    validation?: UploadValidation;
    onProgress?: (e: UploadProgressEvent) => void;
    onError?: (e: UploadErrorEvent) => void;
    onValidationError?: (e: UploadValidationErrorEvent) => void;
    onSuccess?: (e: UploadSuccessEvent) => void;
    onDragEnter?: (e: UploadDragEnterEvent) => void;
    onDragOver?: (e: UploadDragOverEvent) => void;
    onDragLeave?: (e: UploadDragLeaveEvent) => void;
    onDrop?: (e: UploadDropEvent) => void;
    onAbort?: (e: UploadAbortEvent) => void;
    onStart?: (e: UploadStartEvent) => void;
    onRemove?: (e: UploadRemoveEvent) => void;
}
export declare class Upload extends VrControl {
    private _uploadProgress;
    private _divProgressBar;
    private _divFileList;
    private _divDropArea;
    private _files;
    private _inputFile;
    private _dicFileXhr;
    constructor(element: HTMLElement, options?: UploadOptions | null);
    uploadFiles(): void;
    addFile(file: File): void;
    addFiles(files: File[]): void;
    getFiles(): File[];
    removeFileAtIndex(index: number): void;
    private manageLoadingFiles;
    private drawFile;
    private manageValidationError;
    private removeFile;
    private uploadFile;
    private initializeProgress;
    private updateProgress;
    dropArea(): HTMLElement | null;
    divFileList(): HTMLElement;
    progressBar(): HTMLProgressElement;
    uploadButton(): HTMLInputElement;
    private formatBytes;
    private getFileInfo;
    private getMimeTypeFromExtension;
    clear(): void;
    open(): void;
    enable(): void;
    disable(): void;
    getOptions(): UploadOptions;
}
declare class UploadWebApiSettings {
    url?: string;
    parameters?: UploadWebApiParameter[] | ((e: UploadParametersEvent) => UploadWebApiParameter[]);
}
declare class UploadWebApiParameter {
    key: string;
    value: any;
}
declare class UploadEvent extends VrControlsEvent {
    sender: Upload;
}
declare class UploadParametersEvent extends UploadEvent {
    file: File;
}
declare class UploadDragEvent extends UploadEvent {
    element: HTMLElement;
    event: any;
}
declare class UploadDragEnterEvent extends UploadDragEvent {
}
declare class UploadDragOverEvent extends UploadDragEvent {
}
declare class UploadDragLeaveEvent extends UploadDragEvent {
}
declare class UploadDropEvent extends UploadEvent {
    files: File[];
    event: any;
}
declare class UploadProgressEvent extends UploadEvent {
    loaded: number;
    total: number;
    event: any;
}
declare class UploadLoadEvent extends UploadEvent {
    event: Event;
    status: number;
    statusText: string;
    xhr: XMLHttpRequest;
    response: any;
    file: File;
}
declare class UploadErrorEvent extends UploadLoadEvent {
}
declare class UploadSuccessEvent extends UploadLoadEvent {
}
declare class UploadValidationErrorEvent extends UploadEvent {
    file: File;
    message: string;
    type: UploadValidationErrorTypeEnum;
}
declare class UploadAbortEvent extends UploadEvent {
    file: File;
    xhr: XMLHttpRequest;
}
declare class UploadStartEvent extends UploadEvent {
    files: File[];
}
declare class UploadValidation {
    minSize?: number;
    minSizeErrorMessage?: string;
    maxSize?: number;
    maxSizeErrorMessage?: string;
    extensions?: string[];
    extensionsErrorMessage?: string;
    checkMimeType?: boolean;
    showFileIfError?: boolean;
}
declare class UploadRemoveEvent extends UploadEvent {
    file: File;
    element: HTMLElement;
    index: number;
}
export {};
