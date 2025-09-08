import { VrControl, VrControlOptions, VrControlsEvent } from "../common.js";
import { TextModeEnum, TextTransformModeEnum, TextBoxAutoCompleteEnum, TextAlignEnum, TextBoxValidationSettings, TextBoxValidationErrorEnum, TextBoxLengthSettings, TextBoxRegexSettings, puma, ControlTypeEnum, icon, IconClassicLight, PositionEnum, KeyEnum, ErrorHideModeEnum, ErrorModeEnum, ErrorPositionEnum, NumberFormatSettings, RoundingModeEnum } from "../vr.js";
import { UtilityManager } from "../../managers/utilityManager.js";
import { DeviceManager } from "../../managers/deviceManager.js";
class TextBoxOptions extends VrControlOptions {
  value;
  placeholder;
  readOnly;
  rows;
  decimals;
  zeros;
  align;
  mode;
  inputMode;
  icon;
  imageUrl;
  bold;
  nullable;
  growWithContent;
  tooltip;
  roundingSettings;
  validation;
  autocomplete;
}
class TextBox extends VrControl {
  _numberValue;
  _hideErrorMode;
  _keyDownCanceled;
  _originalHeight;
  _oldValue;
  _originalMarginBottom;
  _passwordViewableIcon;
  constructor(element, options) {
    if (options == null)
      options = new TextBoxOptions();
    if (options.mode == null) options.mode = TextModeEnum.Text;
    if (options.inputMode == null) options.inputMode = TextTransformModeEnum.Default;
    if (options.rows == null) options.rows = 2;
    if (options.width == null) options.width = 200;
    if (options.bold == null) options.bold = false;
    if (options.nullable == null) options.nullable = true;
    if (options.growWithContent == null) options.growWithContent = false;
    if (options.autocomplete == null) options.autocomplete = TextBoxAutoCompleteEnum.Off;
    if (options.decimals == null) {
      if (options.mode == TextModeEnum.Numeric)
        options.decimals = 0;
      else if (options.mode == TextModeEnum.Currency || options.mode == TextModeEnum.Percentage)
        options.decimals = 2;
    }
    if (options.align == null) {
      if (options.mode == TextModeEnum.Numeric || options.mode == TextModeEnum.Percentage || options.mode == TextModeEnum.Currency)
        options.align = TextAlignEnum.Right;
      else
        options.align = TextAlignEnum.Left;
    }
    if (options.validation == null) options.validation = new TextBoxValidationSettings();
    if (options.validation.error == null) options.validation.error = TextBoxValidationErrorEnum.Flashing;
    if (options.validation.minValue == null) options.validation.minValue = Number.MIN_SAFE_INTEGER;
    if (options.validation.maxValue == null) options.validation.maxValue = Number.MAX_SAFE_INTEGER;
    if (options.validation.minLength == null) options.validation.minLength = new TextBoxLengthSettings();
    if (typeof options.validation.minLength == "number") {
      let minLength = options.validation.minLength;
      options.validation.minLength = new TextBoxLengthSettings();
      options.validation.minLength.value = minLength;
    }
    if (options.validation.minLength.substituteChar == null) options.validation.minLength.substituteChar = "X";
    if (options.validation.maxLength == null) options.validation.maxLength = new TextBoxLengthSettings();
    if (typeof options.validation.maxLength == "number") {
      let maxLength = options.validation.maxLength;
      options.validation.maxLength = new TextBoxLengthSettings();
      options.validation.maxLength.value = maxLength;
    }
    if (options.validation.regex != null) {
      if (typeof options.validation.regex == "string") {
        let value = options.validation.regex;
        options.validation.regex = new TextBoxRegexSettings();
        options.validation.regex.value = value;
      }
      if (options.validation.regex.checkOnKeyUp == null && options.validation.regex.checkOnValue == null && options.validation.regex.checkOnKeyDown == null && options.validation.regex.checkOnBlur == null)
        options.validation.regex.checkOnKeyDown = true;
      if (options.validation.regex.value == null) {
        if (options.validation.regex.onlyNumbers === true)
          options.validation.regex.value = "^\\d*$";
        else if (options.validation.regex.onlyCharacters === true)
          options.validation.regex.value = "^[a-zA-Z]+$";
        else if (options.validation.regex.onlyUpperCase === true)
          options.validation.regex.value = "^[A-Z]+$";
        else if (options.validation.regex.onlyLowerCase === true)
          options.validation.regex.value = "^[a-z]+$";
      }
    }
    switch (options.mode) {
      case TextModeEnum.Text:
        puma(element).attr("type", "text");
        break;
      case TextModeEnum.Link:
        puma(element).attr("type", "url");
        break;
      case TextModeEnum.Phone:
        puma(element).attr("type", "tel");
        break;
      case TextModeEnum.Search:
        puma(element).attr("type", "search");
        break;
      case TextModeEnum.Mail:
        puma(element).attr("type", "email");
        break;
      case TextModeEnum.Password:
        puma(element).attr("type", "password");
        break;
      case TextModeEnum.PasswordViewable:
        puma(element).attr("type", "text");
        break;
      case TextModeEnum.Numeric:
      case TextModeEnum.Percentage:
      case TextModeEnum.Currency:
        puma(element).attr("type", "number");
        break;
      case TextModeEnum.MultiLine:
        {
          let textArea = document.createElement("textarea");
          textArea.id = element.id;
          puma(textArea).addClass("vrTextArea");
          puma(textArea).attr("autocomplete", options.autocomplete);
          if (options.height == null)
            puma(textArea).height(38 + 20 * (options.rows - 1));
          textArea.style.cssText += "-webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box;";
          textArea.style.cssText += "border-radius: 4px; border-color: #d9d9d9; font-size: 16px; color: #000; padding: 5px; padding-left: 10px; padding-right: 10px; resize: none;";
          puma(element).vrAfterPuma(textArea);
          puma(element).hide();
          element = textArea;
        }
        break;
    }
    if (!DeviceManager.isMobile() && options.mode != TextModeEnum.Password)
      puma(element).attr("type", "text");
    puma(element).attr("autocomplete", options.autocomplete);
    element.style.cssText += "padding-left: 10px; padding-right: 10px;";
    super(element, options, ControlTypeEnum.TextBox);
    this._numberValue = null;
    if (options.mode == TextModeEnum.PasswordViewable) {
      this.viewPassword(false);
      this._passwordViewableIcon = icon(IconClassicLight.EyeSlash, this.container(), { css: "position: absolute; right: 5px; bottom: 7px; font-size: 14px; opacity: 0.8; cursor: pointer;" });
      puma(this._passwordViewableIcon).on("click", (e) => {
        this.viewPassword(this.viewPassword());
      });
    }
    if (options.height != null && options.mode == TextModeEnum.MultiLine)
      puma(this.element()).height(Number(options.height) - 12);
    this._originalHeight = puma(this.element()).outerHeight();
    this._originalMarginBottom = puma(this.container()).css("margin-bottom").getNumericPart();
    if (options.value != null)
      this.value(options.value, false);
    if (options.placeholder != null)
      this.placeholder(options.placeholder);
    if (options.validation.minLength != null)
      puma(this.element()).attr("minlength", options.validation.minLength.value);
    if (options.validation.maxLength != null)
      puma(this.element()).attr("maxlength", options.validation.maxLength.value);
    if (options.tooltip != null)
      puma(this.element()).attr("title", options.tooltip);
    if (options.readOnly === true)
      puma(this.element()).attr("readonly", "readonly");
    if (options.readOnly === true || options.enable === false)
      puma(this.element()).attr("tabIndex", "-1");
    if (options.bold === true)
      this.element().style.cssText += "font-weight: 500;";
    puma(this.element()).css("text-align", options.align);
    puma(this.element()).css("text-transform", options.inputMode);
    if (options.icon != null) {
      puma(this.element()).vrBeforePuma("<i class='" + options.icon + "' style='position: absolute; margin-left: 6px; color: #A9A9A9;'></i>");
      this.element().style.cssText += "text-indent: 15px;";
    } else if (options.imageUrl != null)
      this.element().style.cssText += "background-image: url(" + options.imageUrl + "); background-position: 4px 5px; background-repeat: no-repeat; text-indent: 13px;";
    if (options.mode != TextModeEnum.MultiLine && options.label != null && options.labelSettings.position == PositionEnum.Top && (options.icon == null || options.imageUrl == null))
      this.element().style.cssText += "padding-left: 0px !important; width: calc(100% - 12px) !important;";
    puma(this.element()).keyup((e) => {
      if (this._keyDownCanceled) {
        e.preventDefault();
        return;
      }
      let value = puma(e.currentTarget).val();
      this.autoSize();
      if (e.key != KeyEnum.Tab) {
        let validateRegex = options.validation.regex != null && options.validation.regex.checkOnKeyUp;
        this.validate(value, false, validateRegex);
      }
      if (options.onKeyUp != null) {
        let event = new TextBoxKeyUpEvent();
        event.sender = this;
        event.value = this.isNumericTextBox() ? this._numberValue : value;
        event.key = e.key;
        event.shiftKey = e.key == KeyEnum.Shift;
        event.altKey = e.key == KeyEnum.ArrowLeft;
        event.ctrlKey = e.key == KeyEnum.Control;
        event.enterKey = e.key == KeyEnum.Enter;
        event.backSpaceKey = e.key == KeyEnum.Backspace;
        event.tabKey = e.key == KeyEnum.Tab;
        let validForNumeric = [",", ".", "-", "+"];
        event.validForNumeric = !isNaN(Number(e.key)) || validForNumeric.includes(e.key);
        options.onKeyUp(event);
        if (event.isDefaultPrevented())
          e.preventDefault();
      }
    });
    puma(this.element()).keydown((e) => {
      puma(this.element()).removeClass("errorInput");
      this._keyDownCanceled = false;
      if (this._hideErrorMode == ErrorHideModeEnum.OnAction)
        this.hideError();
      if (e.key != KeyEnum.Backspace && e.key != KeyEnum.ArrowRight && e.key != KeyEnum.ArrowLeft && e.key != KeyEnum.ArrowUp && e.key != KeyEnum.ArrowDown && e.key != KeyEnum.Tab) {
        if (this.isNumericTextBox() && isNaN(Number(e.key)) && e.key != "-" && e.key != "." && e.key != "," && !e.ctrlKey) {
          UtilityManager.interval(() => puma(this.element()).toggleClass("errorInput"), 200, 800, () => puma(this.element()).removeClass("errorInput"));
          e.preventDefault();
          return;
        }
        if (options.validation.regex != null && options.validation.regex.value != null && options.validation.regex.value != "" && options.validation.regex.checkOnKeyDown) {
          let regex = new RegExp(options.validation.regex.value, options.validation.regex.flags);
          if (!regex.test(e.key)) {
            UtilityManager.interval(() => puma(this.element()).toggleClass("errorInput"), 200, 800, () => puma(this.element()).removeClass("errorInput"));
            e.preventDefault();
            return;
          }
        }
      }
      if (options.onEnterKey != null && e.key == KeyEnum.Enter) {
        let enterKeyEvent = new TextBoxEnterKeyEvent();
        enterKeyEvent.sender = this;
        enterKeyEvent.value = this.value();
        options.onEnterKey(enterKeyEvent);
      }
      if (options.onKeyDown != null) {
        let event = new TextBoxKeyDownEvent();
        event.sender = this;
        event.key = e.key;
        event.shiftKey = e.shiftKey;
        event.altKey = e.altKey;
        event.ctrlKey = e.ctrlKey;
        event.enterKey = e.key == KeyEnum.Enter;
        event.backSpaceKey = e.key == KeyEnum.Backspace;
        event.tabKey = e.key == KeyEnum.Tab;
        let value = puma(e.currentTarget).val();
        event.value = this.isNumericTextBox() ? this._numberValue : value;
        let validForNumeric = [",", ".", "-", "+"];
        event.validForNumeric = !isNaN(Number(e.key)) || validForNumeric.includes(e.key);
        options.onKeyDown(event);
        if (event.isDefaultPrevented()) {
          this._keyDownCanceled = true;
          e.preventDefault();
        }
      }
    });
    puma(this.element()).focusin((e) => {
      puma(this.element()).removeClass("errorInput");
      if (this._hideErrorMode == ErrorHideModeEnum.OnFocus)
        this.hideError();
      if (this.isNumericTextBox()) {
        let value = "";
        if (this._numberValue != null)
          value = this.formatValue(String(this._numberValue));
        this.element().value = value;
        puma(this.element()).select();
      }
      if (options.onFocus != null) {
        let event = new TextBoxFocusEvent();
        event.sender = this;
        options.onFocus(event);
      }
    });
    puma(this.element()).blur((e) => {
      let options2 = this.getOptions();
      if (this.isNumericTextBox())
        this.value(this._numberValue);
      else {
        let validateRegex = options2.validation.regex != null && options2.validation.regex.checkOnBlur;
        let realValue = this.validate(void 0, true, validateRegex);
        this.element().value = realValue;
      }
      if (options2.onBlur != null) {
        let event = new TextBoxBlurEvent();
        event.sender = this;
        event.target = e.target;
        event.relatedTarget = e.relatedTarget;
        event.value = this.value();
        options2.onBlur(event);
      }
    });
    puma(this.element()).on("paste", (e) => {
      let pastedValue = e.originalEvent.clipboardData.getData("text");
      if (options.onPaste != null) {
        let event = new TextBoxPasteEvent();
        event.sender = this;
        event.pastedValue = pastedValue;
        event.value = this.value() + pastedValue;
        options.onPaste(event);
      }
    });
  }
  //#region Methods
  //#region Text/Placeholder
  value(value, triggerChange = true) {
    let options = this.options();
    if (value === null) {
      if (options.nullable) {
        this._numberValue = null;
        this.element().value = "";
        return null;
      } else if (this.isNumericTextBox())
        value = 0;
    }
    if (value != null) {
      let validateRegex = options.validation.regex != null && options.validation.regex.checkOnValue;
      let realValue = this.validate(String(value), true, validateRegex);
      this.element().value = realValue;
      this.autoSize();
      if (triggerChange)
        this.change();
      this._oldValue = this.isNumericTextBox() ? UtilityManager.duplicate(this._numberValue) : this.element().value;
    }
    if (this.isNumericTextBox())
      return this._numberValue;
    else
      return this.element().value;
  }
  validate(value, format = true, validateRegex = false) {
    let options = this.getOptions();
    puma(this.element()).removeClass("errorInput");
    if (value == null) value = String(this.value());
    let realValue = value;
    let error = false;
    let numericValue = 0;
    if (this.isNumericTextBox()) {
      if (value == "")
        this._numberValue = null;
      else {
        let isNegative = value.startsWith("-");
        value = value.replace(",", ".");
        if (value.includes("e-"))
          numericValue = Number(value);
        else
          numericValue = value.vrGetNumericPart();
        if (format && numericValue < options.validation.minValue) {
          numericValue = options.validation.minValue;
          error = true;
        }
        if (numericValue > options.validation.maxValue) {
          numericValue = options.validation.maxValue;
          error = true;
        }
        if (isNaN(Number(numericValue))) {
          if (isNegative)
            numericValue = null;
          else {
            numericValue = 0;
            error = true;
          }
        }
        this._numberValue = numericValue;
      }
    }
    if (options.zeros != null)
      realValue = String(realValue).padStart(options.zeros, "0");
    if (options.validation.minLength != null) {
      let minLengthSettings = options.validation.minLength;
      if (format && realValue.length < minLengthSettings.value) {
        realValue = realValue.padEnd(minLengthSettings.value, minLengthSettings.substituteChar);
        error = true;
      }
    }
    if (options.validation.maxLength != null) {
      let maxLengthSettings = options.validation.maxLength;
      if (realValue.length > maxLengthSettings.value) {
        realValue = realValue.substring(0, maxLengthSettings.value);
        error = true;
      }
    }
    if (validateRegex && options.validation.regex.value != null && options.validation.regex.value != "" && value != "" && value != null) {
      let regex = new RegExp(options.validation.regex.value, options.validation.regex.flags);
      if (!regex.test(value)) {
        realValue = "";
        error = true;
      }
    }
    if (this.isNumericTextBox())
      realValue = format ? this.formatValue(String(numericValue)) : String(numericValue);
    if (error) {
      switch (options.validation.error) {
        case TextBoxValidationErrorEnum.None:
          break;
        case TextBoxValidationErrorEnum.Flashing:
          UtilityManager.interval(() => puma(this.element()).toggleClass("errorInput"), 200, 800, () => puma(this.element()).removeClass("errorInput"));
          break;
        case TextBoxValidationErrorEnum.Stable:
          puma(this.element()).addClass("errorInput");
          break;
      }
    }
    return realValue;
  }
  placeholder(value) {
    if (value != null)
      this.element().placeholder = value;
    return this.element().placeholder;
  }
  //#endregion
  type(type) {
    let options = this.getOptions();
    options.mode = type;
    if (options.decimals == null) {
      if (options.mode == TextModeEnum.Numeric)
        options.decimals = 0;
      else if (options.mode == TextModeEnum.Currency || options.mode == TextModeEnum.Percentage)
        options.decimals = 2;
    }
    if (options.align == null) {
      if (options.mode == TextModeEnum.Numeric || options.mode == TextModeEnum.Percentage || options.mode == TextModeEnum.Currency)
        options.align = TextAlignEnum.Right;
      else
        options.align = TextAlignEnum.Left;
    }
  }
  getOptions() {
    return this.options();
  }
  clear(triggerChange = false) {
    let options = this.getOptions();
    if (options.nullable && this.isNumericTextBox())
      this.value(null, false);
    else {
      this._numberValue = null;
      this.element().value = "";
    }
    if (triggerChange)
      this.change();
  }
  isEmpty() {
    if (this.isNumericTextBox())
      return this._numberValue == null;
    else
      return this.element().value === "";
  }
  autoSize() {
    let options = this.getOptions();
    if (options.growWithContent === true && options.mode == TextModeEnum.MultiLine) {
      let heightContainer = this.element().clientHeight;
      if (options.labelSettings != null && (options.labelSettings.position == PositionEnum.Top || options.labelSettings.position == PositionEnum.Bottom))
        heightContainer += puma(this.container()).find(".vrLabelContainer").height();
      this.element().style.height = "1px";
      this.container().style.height = heightContainer + "px";
      let newHeight = 25 + this.element().scrollHeight;
      if (newHeight > this._originalHeight)
        this.element().style.height = 25 + this.element().scrollHeight + "px";
      else
        this.element().style.height = this._originalHeight + "px";
      this.container().style.height = "auto";
    }
  }
  isNumericTextBox() {
    let options = this.options();
    let mode = options.mode;
    return mode == TextModeEnum.Numeric || mode == TextModeEnum.Percentage || mode == TextModeEnum.Currency;
  }
  viewPassword(state) {
    if (state != null) {
      puma(this._passwordViewableIcon).removeClass(IconClassicLight.EyeSlash);
      puma(this._passwordViewableIcon).removeClass(IconClassicLight.Eye);
      if (state) {
        puma(this.element()).removeClass("noViewablePassword");
        puma(this._passwordViewableIcon).addClass(IconClassicLight.Eye);
      } else {
        puma(this.element()).addClass("noViewablePassword");
        puma(this._passwordViewableIcon).addClass(IconClassicLight.EyeSlash);
      }
    }
    return this.element().classList.contains("noViewablePassword");
  }
  //#region Caret
  caretPosition() {
    return this.element().selectionStart;
  }
  insertTextAtCursor(text) {
    this.appendText(text, this.caretPosition());
  }
  insertTextAtPosition(text, position) {
    this.appendText(text, position);
  }
  appendText(text, position) {
    let element = this.element();
    if (position == null)
      position = element.value.length;
    this.value(element.value.substring(0, position) + text + element.value.substring(element.selectionEnd, element.value.length));
    element.selectionStart = this.caretPosition() + text.length;
    element.selectionEnd = this.caretPosition() + text.length;
    this.focus();
  }
  //#endregion
  //#region Error management
  error(text, mode, position, hideMode) {
    let options = this.options();
    if (mode == null) mode = ErrorModeEnum.Tooltip;
    if (position == null) position = ErrorPositionEnum.Right;
    if (hideMode == null) hideMode = ErrorHideModeEnum.OnAction;
    if (text == null) text = "";
    puma(this.element()).addClass("vrTextBoxError");
    this._hideErrorMode = hideMode;
    let errorIcon = puma(this.container()).find(".vrTextBoxErrorIcon")[0];
    if (errorIcon == null)
      errorIcon = puma("<i class='" + IconClassicLight.TriangleExclamation + " vrTextBoxErrorIcon'></i>").vrInsertAfterPuma(this.element())[0];
    puma(errorIcon).hide();
    if (this.label() != null)
      errorIcon.style.cssText += "top: 24px;";
    else
      errorIcon.style.cssText += "top: 5px;";
    if (mode == ErrorModeEnum.Tooltip) {
      let spanError = puma("<span class='vrTextBoxErrorTooltip vrErrorTooltip'>" + text + "</span>").vrAppendToPuma(errorIcon);
      if (position == ErrorPositionEnum.Right)
        puma(spanError).addClass("vrTextBoxErrorTooltipRight");
      else if (position == ErrorPositionEnum.Bottom) {
        puma(spanError).addClass("vrTextBoxErrorTooltipBottom");
        puma(errorIcon).hover(() => {
          if (text == "")
            puma(spanError).hide();
          else
            puma(spanError)[0].style.cssText += "display: inline-block; left: -" + (puma(spanError).outerWidth() / 2 - 7) + "px;";
        });
      }
    } else if (mode == ErrorModeEnum.Overlay) {
      let spanError = puma(this.container()).find(".vrTextBoxErrorOverlay")[0];
      if (spanError == null)
        spanError = puma("<span class='vrTextBoxErrorOverlay'>" + text + "</span>").vrInsertAfterPuma(this.element())[0];
      puma(spanError).show();
      if (position == ErrorPositionEnum.Right)
        puma(spanError).addClass("vrTextBoxErrorOverlayRight");
      else if (position == ErrorPositionEnum.Bottom) {
        let labelWidth = options.label != null && (options.labelSettings.position == PositionEnum.Left || options.labelSettings.position == PositionEnum.Right) ? puma(this.label()).width() : 0;
        puma(spanError).addClass("vrTextBoxErrorOverlayBottom");
        puma(spanError)[0].style.cssText += "left: Calc(50% - " + (puma(spanError).width() / 2 - labelWidth / 2) + "px);";
      }
      puma(spanError).html(text);
    } else if (mode == ErrorModeEnum.Solid) {
      let spanError = puma(this.container()).find(".vrTextBoxErrorSolid")[0];
      if (spanError == null)
        spanError = puma("<span class='vrTextBoxErrorSolid'>" + text + "</span>").vrInsertAfterPuma(this.element())[0];
      puma(spanError).show();
      position = ErrorPositionEnum.Bottom;
      puma(spanError).addClass("vrTextBoxErrorSolidBottom");
      puma(spanError).html(text);
      let labelWidth = options.label != null && (options.labelSettings.position == PositionEnum.Left || options.labelSettings.position == PositionEnum.Right) ? puma(this.label()).width() : 0;
      puma(spanError)[0].style.cssText += "left: Calc(50% - " + (puma(spanError).width() / 2 - labelWidth / 2) + "px);";
      puma(this.container())[0].style.cssText += "margin-bottom: " + (puma(spanError).height() + 20) + "px;";
    }
  }
  hideError() {
    if (puma(this.element()).hasClass("vrTextBoxError")) {
      puma(this.element()).removeClass("vrTextBoxError");
      puma(this.container()).find(".vrTextBoxErrorIcon").hide();
      puma(this.container()).find(".vrTextBoxErrorTooltip").hide();
      puma(this.container()).find(".vrTextBoxErrorOverlay").hide();
      puma(this.container()).find(".vrTextBoxErrorSolid").hide();
      puma(this.container()).css({ "margin-bottom": this._originalMarginBottom + "px" });
    }
  }
  hasError() {
    return puma(this.element()).hasClass("vrTextBoxError");
  }
  formatValue(value) {
    let options = this.getOptions();
    let decimals = options.decimals;
    let formatSettings = new NumberFormatSettings(options.roundingSettings);
    formatSettings.minimumFractionDigits = decimals;
    formatSettings.maximumFractionDigits = decimals;
    if (options.roundingSettings != null) {
      if (options.roundingSettings.minimumFractionDigits != null) formatSettings.minimumFractionDigits = options.roundingSettings.minimumFractionDigits;
      if (options.roundingSettings.maximumFractionDigits != null) formatSettings.maximumFractionDigits = options.roundingSettings.maximumFractionDigits;
      if (options.roundingSettings.roundingMode == RoundingModeEnum.None) {
        if (options.roundingSettings.maximumFractionDigits == null)
          formatSettings.maximumFractionDigits = 8;
      }
    }
    switch (options.mode) {
      case TextModeEnum.Numeric:
        value = Number(value).toFixed(decimals);
        break;
      case TextModeEnum.Currency:
        value = Number(value).vrToCurrencyString(formatSettings);
        break;
      case TextModeEnum.Percentage:
        value = (Number(value) / 100).vrToPercentageString(formatSettings);
        break;
    }
    return value;
  }
  //#endregion
  //#endregion
  //#region Events
  change() {
    let changeCallBack = this.options().onChanged;
    if (changeCallBack != null) {
      let changeEvent = new TextBoxChangeEvent();
      changeEvent.sender = this;
      changeEvent.value = this.value();
      changeEvent.oldValue = this._oldValue;
      changeCallBack(changeEvent);
    }
  }
  //#endregion
}
class TextBoxEvent extends VrControlsEvent {
  sender;
  value;
}
class TextBoxChangeEvent extends TextBoxEvent {
  oldValue;
}
class TextBoxFocusEvent extends TextBoxEvent {
}
class TextBoxBlurEvent extends TextBoxEvent {
  target;
  relatedTarget;
}
class TextBoxPasteEvent extends TextBoxEvent {
  pastedValue;
}
class TextBoxKeyUpPressEvent extends TextBoxEvent {
  key;
  shiftKey;
  altKey;
  ctrlKey;
  enterKey;
  backSpaceKey;
  tabKey;
}
class TextBoxKeyUpEvent extends TextBoxKeyUpPressEvent {
  validForNumeric;
}
class TextBoxKeyDownEvent extends TextBoxKeyUpPressEvent {
  validForNumeric;
}
class TextBoxEnterKeyEvent extends TextBoxEvent {
}
export {
  TextBox,
  TextBoxEvent,
  TextBoxOptions
};
//# sourceMappingURL=textbox.js.map
