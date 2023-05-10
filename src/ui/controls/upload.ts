import { VrControl, VrControlOptions, VrControlsEvent } from "../common";
import { ControlTypeEnum, div, puma, confirm, createLabel, icon, IconClassicLight, createButton, span, notify, NotifierTypeEnum, IconClassicRegular, UploadValidationErrorTypeEnum, filesToBase64 } from "../vr";

//#region Options
export class UploadOptions extends VrControlOptions
{
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
	async?: boolean;

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
	onClick?: (e: UploadClickEvent) => void;
	onFilesAdded?: (e: UploadFilesAdded) => void;
}
//#endregion

//#region Control
export class Upload extends VrControl
{
	private _uploadProgress: number[];
	private _divProgressBar: HTMLProgressElement;
	private _divFileList: HTMLElement;
	private _divDropArea: HTMLElement | null;
	private _files: File[];
	private _inputFile: HTMLInputElement;
	private _dicFileXhr: Map<File, XMLHttpRequest>;

	constructor(element: HTMLElement, options?: UploadOptions | null)
	{
		//#region Options
		if (options == null)
			options = new UploadOptions();

		if (options.width == null) options.width = "100%";
		if (options.webApiSettings == null) options.webApiSettings = new UploadWebApiSettings();
		if (options.multiple == null) options.multiple = false;
		if (options.fileList == null) options.fileList = true;
		if (options.fileListMaxHeight == null) options.fileListMaxHeight = 200;
		if (options.async == null) options.async = true;

		if (options.dropArea == null) options.dropArea = true;
		if (options.dropArea !== true && options.progressBar == null) options.progressBar = false;
		if (options.dropAreaText == null) options.dropAreaText = "Trascina qui il file";
		if (typeof (options.dropArea) == "boolean")
		{
			if (options.dropArea) options.dropAreaText = "Trascina qui il file";
			else options.dropAreaText = "";
		}

		if (options.progressBar == null) options.progressBar = true;
		if (options.uploadButton == null) options.uploadButton = true;
		if (options.uploadButton === true) options.uploadButton = "Seleziona...";
		if (options.autoUpload == null) options.autoUpload = true;
		if (options.confirmToRemoveFile == null) options.confirmToRemoveFile = false;
		if (options.canRemoveFile == null) options.canRemoveFile = true;
		//#endregion

		super(element, options, ControlTypeEnum.Upload);
		let uploadContainer = null;
		this._files = [];
		this._dicFileXhr = new Map<File, XMLHttpRequest>();

		//#region Drop area
		this._divDropArea = null;
		if (options.dropArea !== false)
		{
			//#region Drop area element
			if (typeof (options.dropArea) == "boolean" && options.dropArea)
			{
				this._divDropArea = div(this.element(), { class: "vrUploadDropArea" });
				uploadContainer = this._divDropArea;
			}
			else
			{
				uploadContainer = this.element();
				if (typeof (options.dropArea) == "string")
				{
					if (!options.dropArea.startsWith("#"))
						options.dropArea = "#" + options.dropArea;

					this._divDropArea = puma(options.dropArea)[0];
				}
				else
					this._divDropArea = puma(options.dropArea)[0];
			}
			//#endregion

			//#region Events
			["dragenter", "dragover", "dragleave", "drop"].forEach(eventName =>
			{
				this._divDropArea!.addEventListener(eventName, (e) =>
				{
					e.preventDefault()
					e.stopPropagation()
				}, false);
			});

			puma(this._divDropArea).on("dragenter", (e: JQuery.DragEnterEvent) =>
			{
				//#region DragEnter event
				if (options!.onDragEnter != null)
				{
					let dragEnterEvent = new UploadDragEnterEvent();
					dragEnterEvent.sender = this;
					dragEnterEvent.element = e.currentTarget;
					dragEnterEvent.event = e;
					options!.onDragEnter(dragEnterEvent);

					if (dragEnterEvent.isDefaultPrevented())
					{
						e.preventDefault();
						return;
					}
				}
				//#endregion

				puma(e.currentTarget).addClass("highlight");
			});

			puma(this._divDropArea).on("dragover", (e: JQuery.DragOverEvent) =>
			{
				//#region DragEnter event
				if (options!.onDragOver != null)
				{
					let dragOverEvent = new UploadDragOverEvent();
					dragOverEvent.sender = this;
					dragOverEvent.element = e.currentTarget;
					dragOverEvent.event = e;
					options!.onDragOver(dragOverEvent);

					if (dragOverEvent.isDefaultPrevented())
					{
						e.preventDefault();
						return;
					}
				}
				//#endregion

				puma(e.currentTarget).addClass("highlight");
			});

			puma(this._divDropArea).on("dragleave", (e: JQuery.DragLeaveEvent) =>
			{
				//#region DragEnter event
				if (options!.onDragLeave != null)
				{
					let dragLeaveEvent = new UploadDragLeaveEvent();
					dragLeaveEvent.sender = this;
					dragLeaveEvent.element = e.currentTarget;
					dragLeaveEvent.event = e;
					options!.onDragLeave(dragLeaveEvent);

					if (dragLeaveEvent.isDefaultPrevented())
					{
						e.preventDefault();
						return;
					}
				}
				//#endregion

				puma(e.currentTarget).removeClass("highlight");
			});

			puma(this._divDropArea).on("drop", (e: JQuery.DropEvent) =>
			{
				let dataTransfer = e.originalEvent!.dataTransfer!;
				let files: File[] = [...dataTransfer.files as any];

				//#region Drop event
				if (options!.onDrop != null)
				{
					let dropEvent = new UploadDropEvent();
					dropEvent.sender = this;
					dropEvent.files = files;
					dropEvent.event = e;
					options!.onDrop(dropEvent);

					if (dropEvent.isDefaultPrevented())
					{
						e.preventDefault();
						return;
					}
				}
				//#endregion

				puma(e.currentTarget).removeClass("highlight");
				this.manageLoadingFiles(files);
			});
			//#endregion
		}
		else
			uploadContainer = this.element();
		//#endregion

		//#region Input
		let multiple = "";
		if (options.multiple)
			multiple = "multiple";

		let labelInput = puma("<label for='" + this.element().id + "_vrUpload' class='vrUploadInput'><i class='" + IconClassicLight.CloudArrowUp + " vrUploadBtnIcon'></i>" + options.uploadButton + "</label>").vrAppendToPuma(uploadContainer);
		this._inputFile = puma("<input " + multiple + " id='" + this.element().id + "_vrUpload' type='file' style='display: none;'/>").vrAppendToPuma(uploadContainer)[0];
		if (!options.uploadButton)
			puma(labelInput).hide();

		if (options.dropArea === true)
		{
			createLabel({
				text: String(options.dropAreaText),
				cssContainer: "margin-left: 5px;",
				css: "text-align: left; font-style: italic; color: #a0a0a0;"
			}, this._divDropArea);
		}

		puma(this._inputFile).on("click", (e: JQuery.ClickEvent) =>
		{
			//#region Drop event
			if (options!.onClick != null)
			{
				let clickEvent = new UploadClickEvent();
				clickEvent.sender = this;
				options!.onClick(clickEvent);

				if (clickEvent.isDefaultPrevented())
				{
					e.preventDefault();
					return;
				}
			}
			//#endregion
		})

		puma(this._inputFile).on("change", (e: JQuery.ChangeEvent) =>
		{
			let files: File[] = [...e.currentTarget.files as any];
			this.manageLoadingFiles(files);
		});
		//#endregion

		//#region Progress bar
		this._divProgressBar = puma("<progress class='vrUploadProgressBar' max=100 value=0></progress>").vrAppendToPuma(this.element())[0];
		puma(this._divProgressBar).hide();
		//#endregion

		//#region File list
		this._divFileList = div(this.container(), { class: "vrUploadDivFileList", css: "display: none; max-height: " + options.fileListMaxHeight + "px;" });
		//#endregion
	}

	//#region Methods

	//#region Files management
	uploadFiles()
	{
		for (let i = 0; i < this._files.length; i++)
		{
			let file = this._files[i];
			this.uploadFile(file, i, false);
		}
	}

	addFile(file: File)
	{
		this.addFiles([file]);
	}

	addFiles(files: File[])
	{
		this.manageLoadingFiles(files);
	}

	getFiles()
	{
		return this._files;
	}

	getBase64Files(files: File[])
	{
		return filesToBase64(files);
	}

	removeFileAtIndex(index: number)
	{
		let divFile = puma(this.divFileList()).find(".vrUploadDivFile:nth-child(" + (index + 1) + ")")[0];
		puma(divFile).remove();
		this._dicFileXhr.delete(this._files[index]);

		this._files.splice(index, 1);
		if (this._files.length == 0)
			this.clear();
	}

	private manageLoadingFiles(files: File[])
	{
		if (!this.enabled())
			return;

		let options = this.getOptions();
		this.initializeProgress(files.length);

		//#region On start
		if (options!.onStart != null)
		{
			let startEvent = new UploadStartEvent();
			startEvent.sender = this;
			startEvent.files = files;
			options!.onStart(startEvent);

			if (startEvent.isDefaultPrevented())
				return;
		}
		//#endregion

		if (options.fileList)
		{
			puma(this.divFileList()).show();

			if (options.multiple == false)
				puma(this.element()).hide();
		}

		let filesAdded = [];
		for (let i = 0; i < files.length; i++)
		{
			let file = files[i];

			//#region Validation
			if (options.validation != null)
			{
				if (options.validation.showFileIfError == null) options.validation.showFileIfError = true;
				if (options.validation.checkMimeType == null) options.validation.checkMimeType = false;

				if (options.validation.minSize != null)
				{
					if (file.size < options.validation.minSize)
					{
						let errorMessage = (options.validation.minSizeErrorMessage == null) ? "Dimensione minima consentita: " + this.formatBytes(options.validation.minSize) : options.validation.minSizeErrorMessage;
						notify(errorMessage, { type: NotifierTypeEnum.Error });

						if (options.validation.showFileIfError)
							this.drawFile(file, UploadDrawTypeEnum.ErrorValidationMinSize);

						if (!options.fileList)
							this.manageValidationError(UploadValidationErrorTypeEnum.MinSize, file);

						continue;
					}
				}

				if (options.validation.maxSize != null)
				{
					if (file.size > options.validation.maxSize)
					{
						let errorMessage = (options.validation.maxSizeErrorMessage == null) ? "Dimensione massima consentita: " + this.formatBytes(options.validation.maxSize) : options.validation.maxSizeErrorMessage;
						notify(errorMessage, { type: NotifierTypeEnum.Error });

						if (options.validation.showFileIfError)
							this.drawFile(file, UploadDrawTypeEnum.ErrorValidationMaxSize);

						if (!options.fileList)
							this.manageValidationError(UploadValidationErrorTypeEnum.MaxSize, file);

						continue;
					}
				}

				if (options.validation.extensions != null && options.validation.extensions[0] != "." && options.validation.extensions[0] != "*")
				{
					let isValid = true;

					if (options.validation.checkMimeType)
					{
						//#region Mime Type
						let mimeTypes: string[] = [];
						for (let extension of options.validation.extensions)
							mimeTypes.vrPushRange(this.getMimeTypeFromExtension(extension.toLowerCase()));

						isValid = mimeTypes.includes(file.type.toLowerCase());
						//#endregion
					}
					else
					{
						//#region Extension
						let extensionsArray = file.name.split(".");
						let extension = extensionsArray[extensionsArray.length - 1].toLowerCase();
						isValid = options.validation.extensions.map(k => k.replace(".", "").toLowerCase()).includes(extension);
						//#endregion
					}

					if (!isValid)
					{
						let errorMessage = (options.validation.extensionsErrorMessage == null) ? "Estensioni consentite: " + options.validation.extensions : options.validation.extensionsErrorMessage;
						notify(errorMessage, { type: NotifierTypeEnum.Error });

						if (options.validation.showFileIfError)
							this.drawFile(file, UploadDrawTypeEnum.ErrorValidationExtensions);

						if (!options.fileList)
							this.manageValidationError(UploadValidationErrorTypeEnum.Extensions, file);

						continue;
					}
				}
			}
			//#endregion

			filesAdded.push(file);

			if (options.autoUpload)
				this.uploadFile(file, i, true);
			else
			{
				this._files.push(file);
				this.drawFile(file, UploadDrawTypeEnum.Default);
				puma(this.progressBar()).hide();
			}
		}

		if (filesAdded.length == 0)
			puma(this.progressBar()).hide();
		else
		{
			//#region On files added
			if (options!.onFilesAdded != null)
			{
				let filesAddedEvent = new UploadFilesAdded();
				filesAddedEvent.sender = this;
				filesAddedEvent.files = files;
				options!.onFilesAdded(filesAddedEvent);

				if (filesAddedEvent.isDefaultPrevented())
					return;
			}
		//#endregion
		}

		filesAdded = [];
	}

	private drawFile(file: File, drawTypeEnum: UploadDrawTypeEnum)
	{
		let options = this.getOptions();
		if (options.fileList)
		{
			let divFile = div(this._divFileList, { class: "vrUploadDivFile" });
			let size = this.formatBytes(file.size);
			let fileInfo = this.getFileInfo(file.type);

			icon(fileInfo.icon, divFile, { css: "color: " + fileInfo.color + ";", class: "vrUploadFileIcon" });

			let underLabel = "<span class='vrUploadLblUnderFileName' style='color: #a0a0a0;'>" + size + "</span>";

			//#region Error message
			if (drawTypeEnum == UploadDrawTypeEnum.ErrorValidationExtensions || drawTypeEnum == UploadDrawTypeEnum.ErrorValidationMaxSize
				|| drawTypeEnum == UploadDrawTypeEnum.ErrorValidationMinSize)
			{
				let validationErrorTypeEnum = UploadValidationErrorTypeEnum.MinSize;
				switch (drawTypeEnum)
				{
					case UploadDrawTypeEnum.ErrorValidationMinSize: validationErrorTypeEnum = UploadValidationErrorTypeEnum.MinSize; break;
					case UploadDrawTypeEnum.ErrorValidationMaxSize: validationErrorTypeEnum = UploadValidationErrorTypeEnum.MaxSize; break;
					case UploadDrawTypeEnum.ErrorValidationExtensions: validationErrorTypeEnum = UploadValidationErrorTypeEnum.Extensions; break;
				}

				let errorMessage = this.manageValidationError(validationErrorTypeEnum, file);
				if (errorMessage != "")
					underLabel = "<span class='vrUploadLblUnderFileName' style='color: red;'>" + errorMessage + "</span>";
			}
			//#endregion

			createLabel({
				width: "Calc(100% - 53px)",
				text: "<span class='vrUploadFileName' style='font-size: 14px; font-weight: 600;'>" + file.name + "</span>" + underLabel,
				noBr: 4,
				class: "vrUploadFileDescription"
			}, divFile);

			//#region Percentage/Spinner
			let spanPercentageSpinner = span(divFile, { class: "vrUploadDivFilePercentage" });
			createLabel({
				visible: drawTypeEnum == UploadDrawTypeEnum.TempLoading,
				class: "vrUploadFilePercentage",
				fontSize: 11
			}, spanPercentageSpinner);

			let iconSpinner = icon(IconClassicLight.Spinner, spanPercentageSpinner, { class: "vrUploadFileSpinner" });
			if (drawTypeEnum != UploadDrawTypeEnum.TempLoading)
				puma(iconSpinner).hide();
			//#endregion

			createButton({
				icon: (drawTypeEnum == UploadDrawTypeEnum.TempLoading) ? IconClassicLight.Trash : IconClassicRegular.Xmark,
				cssContainer: "width: 14px; margin-left: 5px;",
				css: "border: none; background: none; font-size: 18px; color: red; width: 14px; padding: 0px;",
				class: "vrUploadFileButtonAction",
				visible: options.canRemoveFile,
				onClick: (e) =>
				{
					if (e.sender.icon()!.classList.contains("fa-trash"))
					{
						//#region On abort
						if (options!.onAbort != null)
						{
							let abortEvent = new UploadAbortEvent();
							abortEvent.sender = this;
							abortEvent.xhr = this._dicFileXhr.get(file)!;
							abortEvent.file = file;
							options!.onAbort(abortEvent);

							if (abortEvent.isDefaultPrevented())
								return;
						}
						//#endregion

						this._dicFileXhr.get(file)!.abort();
					}
					else
					{
						if (options.confirmToRemoveFile)
						{
							confirm("Confermi di voler rimuovere il file?").then(() =>
							{
								puma(divFile).remove();
								this.removeFile(divFile, file);
							});
						}
						else
						{
							puma(divFile).remove();
							this.removeFile(divFile, file);
						}
					}
				}
			}, divFile);
			return divFile;
		}
		return null;
	}

	private manageValidationError(typeEnum: UploadValidationErrorTypeEnum, file: File)
	{
		let options = this.getOptions();

		let errorMessage = "";
		if (typeEnum == UploadValidationErrorTypeEnum.MinSize)
			errorMessage = (options.validation!.minSizeErrorMessage == null) ? "Dimensione minima consentita: " + this.formatBytes(options.validation!.minSize!) : options.validation!.minSizeErrorMessage;
		if (typeEnum == UploadValidationErrorTypeEnum.MaxSize)
			errorMessage = (options.validation!.maxSizeErrorMessage == null) ? "Dimensione massima consentita: " + this.formatBytes(options.validation!.maxSize!) : options.validation!.maxSizeErrorMessage;
		if (typeEnum == UploadValidationErrorTypeEnum.Extensions)
			errorMessage = (options.validation!.extensionsErrorMessage == null) ? "Estensioni consentite: " + options.validation!.extensions : options.validation!.extensionsErrorMessage;

		if (errorMessage != "")
		{
			if (options.onValidationError != null)
			{
				let errorEvent = new UploadValidationErrorEvent();
				errorEvent.sender = this;
				errorEvent.file = file;
				errorEvent.message = errorMessage;
				errorEvent.type = typeEnum;
				options.onValidationError(errorEvent);
			}
		}
		return errorMessage;
	}

	private removeFile(divFile: HTMLElement, file: File)
	{
		let options = this.getOptions();

		//#region Remove event
		if (options!.onRemove != null)
		{
			let removeEvent = new UploadRemoveEvent();
			removeEvent.sender = this;
			removeEvent.element = divFile;
			removeEvent.file = file;
			removeEvent.index = this.getFiles().indexOf(file);
			options!.onRemove(removeEvent);

			if (removeEvent.isDefaultPrevented())
				return;
		}
		//#endregion

		this._files.vrDelete(file);
		this._dicFileXhr.delete(file);

		if (this._files.length == 0)
			this.clear();
	}

	private uploadFile(file: File, i: number, drawFile = true)
	{
		let options = this.getOptions();

		var url = options.webApiSettings!.url!;
		var xhr = new XMLHttpRequest();
		xhr.open("POST", url, options.async!);

		//#region Header parameters
		if (options.webApiSettings!.parameters != null)
		{
			let parameters = [];
			if (Array.isArray(options.webApiSettings!.parameters))
				parameters = options.webApiSettings!.parameters;
			else
			{
				let parametersEvent = new UploadParametersEvent();
				parametersEvent.sender = this;
				parametersEvent.file = file;
				parameters = options.webApiSettings!.parameters(parametersEvent);
			}

			for (let headerParameter of parameters)
				xhr.setRequestHeader(headerParameter.key, headerParameter.value);
		}
		//#endregion

		//#region Draw file
		let divFile: HTMLElement | null = null;
		if (drawFile)
		{
			this._files.push(file);
			this._dicFileXhr.set(file, xhr);
			divFile = this.drawFile(file, UploadDrawTypeEnum.TempLoading);
		}
		//#endregion

		//#region Progress bar
		xhr.upload.addEventListener("progress", (e) =>
		{
			//#region On progress
			if (options!.onProgress != null)
			{
				let progressEvent = new UploadProgressEvent();
				progressEvent.sender = this;
				progressEvent.loaded = e.loaded;
				progressEvent.total = e.total;
				progressEvent.event = e;
				options!.onProgress(progressEvent);

				if (progressEvent.isDefaultPrevented())
					return;
			}
			//#endregion

			if (options!.progressBar)
				this.updateProgress(i, (e.loaded * 100.0 / e.total) || 100);

			let percentage = Math.round(((e.loaded * 100.0 / e.total) || 99));
			if (percentage == 100)
				percentage = 99;

			puma(divFile).find(".vrUploadFilePercentage").html(percentage + "%");
		});
		//#endregion

		xhr.addEventListener("readystatechange", (e) =>
		{
			if (xhr.readyState == 4 && xhr.status == 200)
			{
				//#region Success
				if (options.onSuccess != null)
				{
					let successEvent = new UploadSuccessEvent();
					successEvent.sender = this;
					successEvent.status = xhr.status;
					successEvent.statusText = xhr.statusText;
					successEvent.response = JSON.parse(xhr.response);
					successEvent.xhr = xhr;
					successEvent.event = e;
					successEvent.file = file;
					options.onSuccess(successEvent);

					if (successEvent.isDefaultPrevented())
						return;
				}
				//#endregion	

				puma(this.progressBar()).hide();

				//#region Update div file
				if (divFile != null)
				{
					let fileButtonActionIcon = puma(divFile).find(".vrUploadFileButtonAction").find(".vrIcon")[0];
					let classList: string[] = fileButtonActionIcon.className.split(/\s+/);
					let iconClassList = classList.filter(k => k.startsWith("fa-"));
					for (let iconClass of iconClassList)
						fileButtonActionIcon.classList.remove(iconClass);

					puma(fileButtonActionIcon).addClass(IconClassicRegular.Xmark);

					puma(divFile).find(".vrUploadDivFilePercentage").remove();
					puma(divFile).find(".vrUploadFileName").vrAppendPuma("<i class='" + IconClassicLight.Check + "' style='color: green; margin-left: 5px;' title='File caricato correttamente'></i>");
				}
				//#endregion
			}
			else if (xhr.readyState == 4 && xhr.status != 200)
			{
				//#region Error
				if (options.onError != null)
				{
					let errorEvent = new UploadErrorEvent();
					errorEvent.sender = this;
					errorEvent.status = xhr.status;
					errorEvent.statusText = xhr.statusText;
					errorEvent.response = (xhr.status != 0) ? JSON.parse(xhr.response) : {};
					errorEvent.xhr = xhr;
					errorEvent.event = e;
					errorEvent.file = file;
					options.onError(errorEvent);

					if (errorEvent.isDefaultPrevented())
					{
						e.preventDefault();
						return;
					}
				}
				//#endregion

				puma(this.progressBar()).hide();

				//#region Update div file
				if (divFile != null)
				{
					let fileButtonActionIcon = puma(divFile).find(".vrUploadFileButtonAction").find(".vrIcon")[0];
					let classList: string[] = fileButtonActionIcon.className.split(/\s+/);
					let iconClassList = classList.filter(k => k.startsWith("fa-"));
					for (let iconClass of iconClassList)
						fileButtonActionIcon.classList.remove(iconClass);

					puma(fileButtonActionIcon).addClass(IconClassicRegular.Xmark);

					let uploadFileIcon = puma(divFile).find("i.vrUploadFileIcon");
					uploadFileIcon.removeClass();
					uploadFileIcon.addClass(IconClassicLight.TriangleExclamation + " vrUploadFileIcon");
					uploadFileIcon[0].style.cssText += "color: red; margin-left: -3px;";

					puma(divFile).find(".vrUploadDivFilePercentage").remove();
					puma(divFile).find(".vrUploadFileDescription").html("<span class='vrUploadFileName' style='font-weight: 600; font-size: 14px;'>" + file.name + "</span><span class='vrUploadLblUnderFileName' style='color: red;'>File non caricato correttamente, o procedura interrotta</span>");
				}
				//#endregion
			}
		})

		var formData = new FormData();
		formData.append("file", file);
		xhr.send(formData);
	}
	//#endregion

	//#region Progress bar
	private initializeProgress(numFiles: number)
	{
		let options = this.getOptions();
		if (options.progressBar)
			puma(this.progressBar()).show();

		puma(this.progressBar())[0].value = 0;
		this._uploadProgress = [];

		for (let i = numFiles; i > 0; i--)
			this._uploadProgress.push(0);
	}

	private updateProgress(fileNumber: number, percentage: number)
	{
		this._uploadProgress[fileNumber] = percentage;
		let total = this._uploadProgress.reduce((tot, curr) => tot + curr, 0) / this._uploadProgress.length;
		puma(this.progressBar())[0].value = total;
	}
	//#endregion

	//#region Utility
	dropArea()
	{
		return this._divDropArea;
	}

	divFileList()
	{
		return this._divFileList;
	}

	progressBar()
	{
		return this._divProgressBar;
	}

	uploadButton()
	{
		return this._inputFile;
	}

	private formatBytes(bytes: number)
	{
		const thresh = 1024;
		if (Math.abs(bytes) < thresh)
			return bytes + " B";

		const units = ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
		let u = -1;
		const r = 10 ** 2;

		do
		{
			bytes /= thresh;
			++u;
		}
		while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);

		return bytes.toFixed(2) + ' ' + units[u];
	}

	private getFileInfo(mimeType: string)
	{
		//#region Icon
		let icon = IconClassicLight.File;
		let color = "#51B3E1";

		switch (mimeType)
		{
			case "application/pdf":
				{
					icon = IconClassicLight.FilePdf;
					color = "coral";
				}
				break;
			case "image/png":
			case "image/jpeg":
				{
					icon = IconClassicLight.FileImage;
					color = "#adbd29";
				}
				break;
			case "application/msword":
			case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
				{
					icon = IconClassicLight.FileWord;
					color = "#01A6F0";
				}
				break;
			case "application/vnd.ms-excel":
			case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
				{
					icon = IconClassicLight.FileExcel;
					color = "#1D6F42";
				}
				break;
			case "text/plain":
				{
					icon = IconClassicLight.FileLines;
					color = "#bdbdbd";
				}
				break;
			case "application/zip":
			case "application/x-zip-compressed":
			case "application/x-compressed":
			case "multipart/x-zip":
				{
					icon = IconClassicLight.FileZipper;
					color = "#b1b4d3";
				}
				break;
			case "video/mp4":
			case "video/3gpp":
			case "video/x-flv":
			case "video/quicktime":
			case "video/x-msvideo":
			case "video/x-ms-wmv":
				{
					icon = IconClassicLight.FileVideo;
					color = "purple";
				}
				break;
		}
		return { icon: <IconClassicLight>icon, color: color };
	}

	private getMimeTypeFromExtension(extension: string)
	{
		let mimeType: string[] = [];
		let extensionsArray = extension.split(".")
		extension = extensionsArray[extensionsArray.length - 1]

		switch (extension)
		{
			case "html":
			case "htm":
			case "shtml":
				mimeType = [""];
				break;

			case "css": mimeType = ["text/css"]; break;
			case "xml": mimeType = ["text/xml"]; break;
			case "gif": mimeType = ["image/gif"]; break;

			case "jpeg":
			case "jpg":
				mimeType = ["image/jpeg"];
				break;

			case "js": mimeType = ["application/x-javascript"]; break;
			case "txt": mimeType = ["text/plain"]; break;
			case "png": mimeType = ["image/png"]; break;

			case "tif":
			case "tiff":
				mimeType = ["image/tiff"];
				break;

			case "ico": mimeType = ["image/x-icon"]; break;
			case "bmp": mimeType = ["image/x-ms-bmp"]; break;
			case "svg": mimeType = ["image/svg+xml"]; break;

			case "doc":
			case "dot":
				mimeType = ["application/msword"];
				break;

			case "docx": mimeType = ["application/vnd.openxmlformats-officedocument.wordprocessingml.document"]; break;
			case "dotx": mimeType = ["application/vnd.openxmlformats-officedocument.wordprocessingml.template"]; break;
			case "docm": mimeType = ["application/vnd.ms-word.document.macroEnabled.12"]; break;
			case "dotm": mimeType = ["application/vnd.ms-word.template.macroEnabled.12"]; break;

			case "pdf": mimeType = ["application/pdf"]; break;
			case "rtf": mimeType = ["application/rtf"]; break;

			case "csv": mimeType = ["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "text/csv"]; break;

			case "mdb": mimeType = ["application/vnd.ms-access"]; break;

			case "xls":
			case "xlt":
			case "xla":
				mimeType = ["application/vnd.ms-excel"];
				break;

			case "xlsx": mimeType = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]; break;
			case "xltx": mimeType = ["application/vnd.openxmlformats-officedocument.spreadsheetml.template"]; break;
			case "xlsm": mimeType = ["application/vnd.ms-excel.sheet.macroEnabled.12"]; break;
			case "xltm": mimeType = ["application/vnd.ms-excel.template.macroEnabled.12"]; break;
			case "xlam": mimeType = ["application/vnd.ms-excel.addin.macroEnabled.12"]; break;
			case "xlsb": mimeType = ["application/vnd.ms-excel.sheet.binary.macroEnabled.12"]; break;

			case "ppt":
			case "pot":
			case "pps":
			case "ppa":
				mimeType = ["application/vnd.ms-powerpoint"];
				break;

			case "pptx": mimeType = ["application/vnd.openxmlformats-officedocument.presentationml.presentation"]; break;
			case "potx": mimeType = ["application/vnd.openxmlformats-officedocument.presentationml.template"]; break;
			case "ppsx": mimeType = ["application/vnd.openxmlformats-officedocument.presentationml.slideshow"]; break;
			case "ppam": mimeType = ["application/vnd.ms-powerpoint.addin.macroEnabled.12"]; break;
			case "pptm": mimeType = ["application/vnd.ms-powerpoint.presentation.macroEnabled.12"]; break;
			case "potm": mimeType = ["application/vnd.ms-powerpoint.template.macroEnabled.12"]; break;
			case "ppsm": mimeType = ["application/vnd.ms-powerpoint.slideshow.macroEnabled.12"]; break;

			case "p7m": mimeType = ["application/pkcs7-mime", "application/x-pkcs7-mime"]; break;
			case "p12": mimeType = ["application/pkcs-12", "application/x-pkcs12"]; break;

			case "7z": mimeType = ["application/x-7z-compressed"]; break;
			case "rar": mimeType = ["application/x-rar-compressed"]; break;
			case "zip": mimeType = ["application/x-zip-compressed"]; break;

			case "bin":
			case "exe":
			case "dll":
			case "deb":
			case "dmg":
			case "eot":
			case "iso":
			case "img":
			case "msi":
			case "msp":
			case "msm":
				mimeType = ["application/octet-stream"];
				break;

			case "mp3": mimeType = ["audio/mpeg"]; break;

			case "3ggp":
			case "3gp":
				mimeType = ["video/3gpp"];
				break;

			case "mpeg":
			case "mpg":
				mimeType = ["video/mpeg"];
				break;

			case "mov": mimeType = ["video/quicktime"]; break;
			case "flv": mimeType = ["video/x-flv"]; break;
			case "wmv": mimeType = ["video/x-ms-wmv"]; break;
			case "avi": mimeType = ["video/x-msvideo"]; break;

			case "m4v":
			case "m4p":
				mimeType = ["video/mp4"];
				break;
		}
		return mimeType;
	}

	clear()
	{
		this._files = [];
		puma(this.divFileList()).hide();
		puma(this.divFileList()).empty();
		this.uploadButton().value = "";
		puma(this.progressBar()).hide();
		this.progressBar().value = 0;

		puma(this.element()).show();
	}

	open()
	{
		puma(this.uploadButton()).click();
	}
	//#endregion

	//#region Overrides
	enable()
	{
		super.enable();
		window.setTimeout(() => this.uploadButton().removeAttribute("disabled"));
	}

	disable()
	{
		super.disable();
		window.setTimeout(() => this.uploadButton().setAttribute("disabled", "disabled"));
	}
	//#endregion

	getOptions()
	{
		return this.options<UploadOptions>();
	}
	//#endregion
}
//#endregion

//#region Classes
class UploadWebApiSettings
{
	url?: string;
	parameters?: UploadWebApiParameter[] | ((e: UploadParametersEvent) => UploadWebApiParameter[]);
}

class UploadWebApiParameter
{
	key: string;
	value: any;
}

class UploadEvent extends VrControlsEvent
{
	sender: Upload;
}

class UploadParametersEvent extends UploadEvent
{
	file: File;
}

class UploadDragEvent extends UploadEvent
{
	element: HTMLElement;
	event: any;
}

class UploadDragEnterEvent extends UploadDragEvent
{ }

class UploadDragOverEvent extends UploadDragEvent
{ }

class UploadDragLeaveEvent extends UploadDragEvent
{ }

class UploadDropEvent extends UploadEvent
{
	files: File[];
	event: any;
}

class UploadProgressEvent extends UploadEvent
{
	loaded: number;
	total: number;
	event: any;
}

class UploadLoadEvent extends UploadEvent
{
	event: Event;
	status: number;
	statusText: string;
	xhr: XMLHttpRequest;
	response: any;
	file: File;
}

class UploadErrorEvent extends UploadLoadEvent
{ }

class UploadSuccessEvent extends UploadLoadEvent
{
}

class UploadValidationErrorEvent extends UploadEvent
{
	file: File;
	message: string;
	type: UploadValidationErrorTypeEnum;
}

class UploadAbortEvent extends UploadEvent
{
	file: File;
	xhr: XMLHttpRequest;
}

class UploadStartEvent extends UploadEvent
{
	files: File[];
}

class UploadValidation
{
	minSize?: number;
	minSizeErrorMessage?: string;
	maxSize?: number;
	maxSizeErrorMessage?: string;
	extensions?: string[];
	extensionsErrorMessage?: string;
	checkMimeType?: boolean;
	showFileIfError?: boolean;
}

enum UploadDrawTypeEnum
{
	Default,
	TempLoading,
	ErrorValidationMinSize,
	ErrorValidationMaxSize,
	ErrorValidationExtensions
}

class UploadRemoveEvent extends UploadEvent
{
	file: File;
	element: HTMLElement;
	index: number;
}

class UploadClickEvent extends UploadEvent
{

}
class UploadFilesAdded extends UploadEvent
{
	files: File[];
}
//#endregion