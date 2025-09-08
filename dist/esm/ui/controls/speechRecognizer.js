import { ControlTypeEnum, createButton, IconClassicLight, div, puma, SpeechRecognizerOptions } from "../vr.js";
import { VrControl, VrControlsEvent } from "../common.js";
class SpeechRecognizer extends VrControl {
  //#region Variables
  _btnMicrophone;
  _recognition;
  _allTextFromStart;
  //#endregion
  constructor(element, options) {
    if (options == null)
      options = new SpeechRecognizerOptions();
    if (options.continuous == null) options.continuous = true;
    if (options.interimResults == null) options.interimResults = true;
    if (options.language == null) options.language = "it-IT";
    if (options.maxAlternatives == null) options.maxAlternatives = 1;
    if (options.size == null) options.size = 14;
    if (options.stopAtClick == null) options.stopAtClick = false;
    super(element, options, ControlTypeEnum.SpeechRecognizer);
    this._btnMicrophone = createButton({
      icon: IconClassicLight.Microphone,
      css: "border: none; background: none; border-radius: 20px; font-size: " + options.size + "px;",
      tag: "deactivated",
      iconSettings: { fontSize: options.size },
      onClick: (e) => {
        if (!this.enabled()) {
          e.preventDefault();
          return;
        }
        if (options.onClick != null) {
          let clickEvent = new SpeechRecognizerClickEvent();
          clickEvent.sender = this;
          options.onClick(clickEvent);
          if (clickEvent.isDefaultPrevented())
            return;
        }
        if (e.sender.tag() == "deactivated")
          this.start();
        else
          this.stop();
      }
    }, this.element());
    div(this._btnMicrophone.element(), { class: "speechRecognizerDivPulse" }, true);
    if (!("webkitSpeechRecognition" in window) && !("speechRecognition" in window)) {
      this._btnMicrophone.disable();
      this._btnMicrophone.icon(IconClassicLight.MicrophoneSlash);
      this._btnMicrophone.tooltip("Il browser non supporta questa funzionalità");
    } else {
      let speechRecognition = webkitSpeechRecognition || SpeechRecognition;
      let speechGrammarList = webkitSpeechGrammarList || SpeechGrammarList;
      this._recognition = new speechRecognition();
      this._recognition.continuous = options.continuous;
      this._recognition.interimResults = options.interimResults;
      this._recognition.lang = options.language;
      this._recognition.maxAlternatives = options.maxAlternatives;
      if (options.grammars != null && options.grammars.length > 0) {
        let speechRecognitionList = new speechGrammarList();
        for (let grammar of options.grammars)
          speechRecognitionList.addFromString(grammar, 1);
        this._recognition.grammars = speechRecognitionList;
      }
      this._recognition.onresult = (e) => {
        let interimResults = "";
        let finalResults = "";
        for (var i = e.resultIndex; i < e.results.length; ++i) {
          if (e.results[i].isFinal) {
            finalResults += e.results[i][0].transcript;
            this._allTextFromStart += e.results[i][0].transcript;
          } else {
            interimResults += e.results[i][0].transcript;
          }
        }
        if (options.onResult != null) {
          let event = new SpeechRecognizerResultEvent();
          event.sender = this;
          event.results = e.results;
          event.resultIndex = e.resultIndex;
          event.interimResults = interimResults;
          event.finalResults = finalResults;
          event.allTextFromStart = this._allTextFromStart;
          options.onResult(event);
        }
      };
      this._recognition.onnomatch = () => {
        if (options.onNoMatch != null) {
          let event = new SpeechRecognizerNoMatchEvent();
          event.sender = this;
          options.onNoMatch(event);
        }
      };
      this._recognition.onerror = (e) => {
        if (options.onError != null) {
          let event = new SpeechRecognizerErrorEvent();
          event.sender = this;
          event.error = e.error;
          event.message = e.message;
          options.onError(event);
        }
      };
      this._recognition.onstart = () => {
        if (options.onStart != null) {
          let event = new SpeechRecognizerStartEvent();
          event.sender = this;
          options.onStart(event);
        }
      };
      this._recognition.onend = () => {
        let options2 = this.getOptions();
        if (this._btnMicrophone.tag() == "activated" && options2.stopAtClick) {
          this._recognition.start();
          return;
        }
        this._allTextFromStart = "";
        this._btnMicrophone.tag("deactivated");
        puma(this._btnMicrophone.element()).removeClass("microphoneActive");
        if (options2.onEnd != null) {
          let event = new SpeechRecognizerEndEvent();
          event.sender = this;
          options2.onEnd(event);
        }
      };
      this._recognition.onspeechstart = () => {
        if (options.onSpeechStart != null) {
          let event = new SpeechRecognizerSpeechStartEvent();
          event.sender = this;
          options.onSpeechStart(event);
        }
      };
      this._recognition.onspeechend = () => {
        if (options.onSpeechEnd != null) {
          let event = new SpeechRecognizerSpeechEndEvent();
          event.sender = this;
          options.onSpeechEnd(event);
        }
      };
      this._recognition.onaudiostart = () => {
        if (options.onAudioStart != null) {
          let event = new SpeechRecognizerAudioStartEvent();
          event.sender = this;
          options.onAudioStart(event);
        }
      };
      this._recognition.onaudioend = () => {
        if (options.onAudioEnd != null) {
          let event = new SpeechRecognizerAudioEndEvent();
          event.sender = this;
          options.onAudioEnd(event);
        }
      };
      this._recognition.onsoundstart = () => {
        if (options.onSoundStart != null) {
          let event = new SpeechRecognizerSoundStartEvent();
          event.sender = this;
          options.onSoundStart(event);
        }
      };
      this._recognition.onsoundend = () => {
        if (options.onSoundEnd != null) {
          let event = new SpeechRecognizerSoundEndEvent();
          event.sender = this;
          options.onSoundEnd(event);
        }
      };
    }
  }
  //#region Methods
  start() {
    this._allTextFromStart = "";
    this._btnMicrophone.tag("activated");
    puma(this._btnMicrophone.element()).addClass("microphoneActive");
    this._recognition.start();
  }
  stop() {
    this._allTextFromStart = "";
    this._btnMicrophone.tag("deactivated");
    puma(this._btnMicrophone.element()).removeClass("microphoneActive");
    this._recognition.stop();
  }
  isRecording() {
    return this._btnMicrophone.tag() == "activated";
  }
  getOptions() {
    return this.options();
  }
  //#endregion
  //#region Overrides
  enable() {
    super.enable();
  }
  disable() {
    super.disable();
    this.stop();
  }
}
class SpeechRecognizerEvent extends VrControlsEvent {
  sender;
}
class SpeechRecognizerNoMatchEvent extends SpeechRecognizerEvent {
}
class SpeechRecognizerClickEvent extends SpeechRecognizerEvent {
}
class SpeechRecognizerErrorEvent extends SpeechRecognizerEvent {
  error;
  message;
}
class SpeechRecognizerResultEvent extends SpeechRecognizerEvent {
  results;
  resultIndex;
  interimResults;
  finalResults;
  allTextFromStart;
}
class SpeechRecognizerStartEvent extends SpeechRecognizerEvent {
}
class SpeechRecognizerEndEvent extends SpeechRecognizerEvent {
}
class SpeechRecognizerSpeechStartEvent extends SpeechRecognizerEvent {
}
class SpeechRecognizerSpeechEndEvent extends SpeechRecognizerEvent {
}
class SpeechRecognizerAudioStartEvent extends SpeechRecognizerEvent {
}
class SpeechRecognizerAudioEndEvent extends SpeechRecognizerEvent {
}
class SpeechRecognizerSoundStartEvent extends SpeechRecognizerEvent {
}
class SpeechRecognizerSoundEndEvent extends SpeechRecognizerEvent {
}
export {
  SpeechRecognizer,
  SpeechRecognizerAudioEndEvent,
  SpeechRecognizerAudioStartEvent,
  SpeechRecognizerClickEvent,
  SpeechRecognizerEndEvent,
  SpeechRecognizerErrorEvent,
  SpeechRecognizerEvent,
  SpeechRecognizerNoMatchEvent,
  SpeechRecognizerResultEvent,
  SpeechRecognizerSoundEndEvent,
  SpeechRecognizerSoundStartEvent,
  SpeechRecognizerSpeechEndEvent,
  SpeechRecognizerSpeechStartEvent,
  SpeechRecognizerStartEvent
};
//# sourceMappingURL=speechRecognizer.js.map
