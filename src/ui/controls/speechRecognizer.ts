import { ControlTypeEnum, createButton, div, IconClassLight, puma, SpeechRecognizerOptions } from "../vr";
import { VrControl, VrControlsEvent } from "../common";
import { Button } from "./button";

declare var SpeechRecognition: any;
declare var webkitSpeechRecognition: any;
declare var SpeechGrammarList: any;
declare var webkitSpeechGrammarList: any;

//#region Control
export class SpeechRecognizer extends VrControl
{
	//#region Variables
	private _btnMicrophone: Button;
	private _recognition: any;
	private _allTextFromStart: string;
	//#endregion

	constructor(element: HTMLElement, options?: SpeechRecognizerOptions | null)
	{
		//#region Options
		if (options == null)
			options = new SpeechRecognizerOptions();

		if (options.continuous == null) options.continuous = true;
		if (options.interimResults == null) options.interimResults = true;
		if (options.language == null) options.language = "it-IT";
		if (options.maxAlternatives == null) options.maxAlternatives = 1;
		if (options.size == null) options.size = 14;
		if (options.stopAtClick == null) options.stopAtClick = false;
		//#endregion

		super(element, options, ControlTypeEnum.SpeechRecognizer);

		//#region Microphone
		this._btnMicrophone = createButton({
			icon: IconClassLight.Microphone,
			css: "border: none; background: none; border-radius: 20px; font-size: " + options.size + "px;",
			tag: "deactivated",
			iconSettings: { fontSize: options.size },
			onClick: (e) =>
			{
				if (!this.enabled())
				{
					e.preventDefault();
					return;
				}

				if (options!.onClick != null)
				{
					let clickEvent = new SpeechRecognizerClickEvent();
					clickEvent.sender = this;
					options!.onClick(clickEvent);

					if (clickEvent.isDefaultPrevented())
						return;
				}

				if (e.sender.tag() == "deactivated")
					this.start();
				else
					this.stop();
			}
		}, this.element());

		div(this._btnMicrophone.element(), { class: "speechRecognizerDivPulse" }, true)
		//#endregion

		if (!('webkitSpeechRecognition' in window) && !('speechRecognition' in window))
		{
			//#region Browser not supported
			this._btnMicrophone.disable();
			this._btnMicrophone.icon(IconClassLight.MicrophoneSlash);
			this._btnMicrophone.tooltip("Il browser non supporta questa funzionalità");
			//#endregion
		}
		else
		{
			let speechRecognition = webkitSpeechRecognition || SpeechRecognition;
			let speechGrammarList = webkitSpeechGrammarList || SpeechGrammarList;

			this._recognition = new speechRecognition();
			this._recognition.continuous = options.continuous;
			this._recognition.interimResults = options.interimResults;
			this._recognition.lang = options.language;
			this._recognition.maxAlternatives = options.maxAlternatives;

			//#region Grammar
			if (options.grammars != null && options.grammars.length > 0)
			{
				let speechRecognitionList = new speechGrammarList();
				for (let grammar of options.grammars)
					speechRecognitionList.addFromString(grammar, 1);
				this._recognition.grammars = speechRecognitionList;
			}
			//#endregion

			//#region Events
			this._recognition.onresult = (e: any) =>
			{
				let interimResults = "";
				let finalResults = "";

				for (var i = e.resultIndex; i < e.results.length; ++i)
				{
					if (e.results[i].isFinal)
					{
						finalResults += e.results[i][0].transcript;
						this._allTextFromStart += e.results[i][0].transcript;
					} else
					{
						interimResults += e.results[i][0].transcript;
					}
				}

				if (options!.onResult != null)
				{
					let event = new SpeechRecognizerResultEvent();
					event.sender = this;
					event.results = e.results;
					event.resultIndex = e.resultIndex;
					event.interimResults = interimResults;
					event.finalResults = finalResults;
					event.allTextFromStart = this._allTextFromStart;
					options!.onResult(event);
				}
			}

			this._recognition.onnomatch = () =>
			{
				if (options!.onNoMatch != null)
				{
					let event = new SpeechRecognizerNoMatchEvent();
					event.sender = this;
					options!.onNoMatch(event);
				}
			}

			this._recognition.onerror = (e: any) =>
			{
				if (options!.onError != null)
				{
					let event = new SpeechRecognizerErrorEvent();
					event.sender = this;
					event.error = e.error;
					event.message = e.message;
					options!.onError(event);
				}
			}

			this._recognition.onstart = () =>
			{
				if (options!.onStart != null)
				{
					let event = new SpeechRecognizerStartEvent();
					event.sender = this;
					options!.onStart(event);
				}
			}

			this._recognition.onend = () =>
			{
				let options = this.getOptions();
				if (this._btnMicrophone.tag() == "activated" && options.stopAtClick)
				{
					this._recognition.start();
					return;
				}

				this._allTextFromStart = "";
				this._btnMicrophone.tag("deactivated");
				puma(this._btnMicrophone.element()).removeClass("microphoneActive");

				if (options!.onEnd != null)
				{
					let event = new SpeechRecognizerEndEvent();
					event.sender = this;
					options!.onEnd(event);
				}
			}

			this._recognition.onspeechstart = () =>
			{
				if (options!.onSpeechStart != null)
				{
					let event = new SpeechRecognizerSpeechStartEvent();
					event.sender = this;
					options!.onSpeechStart(event);
				}
			}

			this._recognition.onspeechend = () =>
			{
				if (options!.onSpeechEnd != null)
				{
					let event = new SpeechRecognizerSpeechEndEvent();
					event.sender = this;
					options!.onSpeechEnd(event);
				}
			}

			this._recognition.onaudiostart = () =>
			{
				if (options!.onAudioStart != null)
				{
					let event = new SpeechRecognizerAudioStartEvent();
					event.sender = this;
					options!.onAudioStart(event);
				}
			}

			this._recognition.onaudioend = () =>
			{
				if (options!.onAudioEnd != null)
				{
					let event = new SpeechRecognizerAudioEndEvent();
					event.sender = this;
					options!.onAudioEnd(event);
				}
			}

			this._recognition.onsoundstart = () =>
			{
				if (options!.onSoundStart != null)
				{
					let event = new SpeechRecognizerSoundStartEvent();
					event.sender = this;
					options!.onSoundStart(event);
				}
			}

			this._recognition.onsoundend = () =>
			{
				if (options!.onSoundEnd != null)
				{
					let event = new SpeechRecognizerSoundEndEvent();
					event.sender = this;
					options!.onSoundEnd(event);
				}
			}
			//#endregion
		}
	}

	//#region Methods
	start()
	{
		this._allTextFromStart = "";
		this._btnMicrophone.tag("activated");
		puma(this._btnMicrophone.element()).addClass("microphoneActive");
		this._recognition.start();
	}

	stop()
	{
		this._allTextFromStart = "";
		this._btnMicrophone.tag("deactivated");
		puma(this._btnMicrophone.element()).removeClass("microphoneActive");
		this._recognition.stop();
	}

	isRecording()
	{
		return this._btnMicrophone.tag() == "activated";
	}

	getOptions()
	{
		return this.options<SpeechRecognizerOptions>();
	}
	//#endregion

	//#region Overrides
	enable(): void
	{
		super.enable();
	}

	disable(): void
	{
		super.disable();
		this.stop();
	}
}
//#endregion

//#region Classes
export class SpeechRecognizerEvent extends VrControlsEvent
{
	sender: SpeechRecognizer;
}

export class SpeechRecognizerNoMatchEvent extends SpeechRecognizerEvent
{ }

export class SpeechRecognizerClickEvent extends SpeechRecognizerEvent
{ }

export class SpeechRecognizerErrorEvent extends SpeechRecognizerEvent
{
	error: string;
	message: string;
}

export class SpeechRecognizerResultEvent extends SpeechRecognizerEvent
{
	results: any;
	resultIndex: number;
	interimResults: string;
	finalResults: string;
	allTextFromStart: string;
}

export class SpeechRecognizerStartEvent extends SpeechRecognizerEvent
{ }

export class SpeechRecognizerEndEvent extends SpeechRecognizerEvent
{ }

export class SpeechRecognizerSpeechStartEvent extends SpeechRecognizerEvent
{ }

export class SpeechRecognizerSpeechEndEvent extends SpeechRecognizerEvent
{ }

export class SpeechRecognizerAudioStartEvent extends SpeechRecognizerEvent
{ }

export class SpeechRecognizerAudioEndEvent extends SpeechRecognizerEvent
{ }

export class SpeechRecognizerSoundStartEvent extends SpeechRecognizerEvent
{ }

export class SpeechRecognizerSoundEndEvent extends SpeechRecognizerEvent
{ }
//#endregion