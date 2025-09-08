import $ from "jquery";
/* empty css                  */
import { Label } from "./controls/label.js";
import { UtilityManager } from "../managers/utilityManager.js";
import { DeviceManager } from "../managers/deviceManager.js";
import { TextBox, TextBoxOptions } from "./controls/textbox.js";
import { CheckBox } from "./controls/checkbox.js";
import { Separator } from "./controls/separator.js";
import { ButtonGroup } from "./controls/buttonGroup.js";
import { Image } from "./controls/image.js";
import { DatePicker, DatePickerOptions } from "./controls/datePicker.js";
import { ComboBox, ComboBoxOptions } from "./controls/comboBox.js";
import { SplitButton } from "./controls/splitButton.js";
import { Editor } from "./controls/editor.js";
import { Window, WindowEvent } from "./controls/window.js";
import { Confirm } from "./controls/confirm.js";
import { Alert } from "./controls/alert.js";
import { Dialog } from "./controls/dialog.js";
import { Grid, GridControlsSettings } from "./controls/grid.js";
import { Prompt } from "./controls/prompt.js";
import { ControlManager } from "../managers/controlManager.js";
import { Switch } from "./controls/switch.js";
import { CheckBoxList } from "./controls/checkboxList.js";
import { RadioButton } from "./controls/radioButton.js";
import { RadioButtonList } from "./controls/radioButtonList.js";
import { Repeater } from "./controls/repeater.js";
import { Maps } from "./controls/maps.js";
import { VrControlsEvent, VrControlOptions } from "./common.js";
import { Painter } from "./controls/painter.js";
import { Calendar } from "./controls/calendar.js";
import { Rating } from "./controls/rating.js";
import { LoaderManager } from "../managers/loaderManager.js";
import { GroupBox } from "./controls/groupBox.js";
import { PdfViewer } from "./controls/pdfViewer.js";
import { Notifier } from "./controls/notifier.js";
import { Upload } from "./controls/upload.js";
import { PaypalButton } from "./controls/paypalButton.js";
import { TreeView } from "./controls/treeView.js";
import { Scheduler } from "./controls/scheduler.js";
import { QrCode } from "./controls/qrCode.js";
import { MultiScheduler } from "./controls/multiScheduler.js";
import { Icon } from "./controls/icon.js";
import { ColorPicker } from "./controls/colorPicker.js";
import { SearchBar } from "./controls/searchBar.js";
import { Splitter } from "./controls/splitter.js";
import { AutoCompleteBox } from "./controls/autoCompleteBox.js";
import { ChartVr } from "./controls/chart.js";
import { PrintManager } from "../managers/printManager.js";
import { TabStrip } from "./controls/tabStrip.js";
import { Tooltip } from "./controls/tooltip.js";
import { SpeechRecognizer } from "./controls/speechRecognizer.js";
import { Div } from "./controls/div.js";
import { Button } from "./controls/button.js";
import { Legend } from "./controls/legend.js";
import { Menu } from "./controls/menu.js";
const jQuery = $;
window.jQuery = $;
window.$ = $;
function createLabel(options, container, position, existingElement) {
  let control = createControls("Label", container, position, existingElement, options);
  return control;
}
function createButton(options, container, position, existingElement) {
  let control = createControls("Button", container, position, existingElement, options);
  return control;
}
function createReactButton(options = {}, container) {
  if (typeof window === "undefined" || !window.React || !window.ReactDOM || !window.PSReact) {
    console.warn("createReactButton requires React, ReactDOM, and PSReact to be loaded");
    return null;
  }
  const { React, ReactDOM, PSReact } = window;
  const { PSButton, PSControlsProvider, ButtonModeEnum: ButtonModeEnum2 } = PSReact;
  const reactProps = {
    text: options.text || options.value || "Button",
    mode: options.mode || ButtonModeEnum2?.Default,
    onClick: options.onClick || (() => {
    }),
    tooltip: options.tooltip,
    enabled: options.enabled !== false,
    visible: options.visible !== false,
    width: options.width,
    height: options.height,
    confirmationMessage: options.confirmationMessage,
    loading: options.loading || false,
    ...options
    // Allow any additional React props
  };
  const button = React.createElement(PSButton, reactProps);
  const wrapped = React.createElement(
    PSControlsProvider,
    { theme: "light", language: "it" },
    button
  );
  let targetContainer;
  if (typeof container === "string") {
    targetContainer = document.getElementById(container) || document.body;
  } else {
    targetContainer = container || document.body;
  }
  const wrapperDiv = document.createElement("div");
  wrapperDiv.style.display = "inline-block";
  const root = ReactDOM.createRoot(wrapperDiv);
  root.render(wrapped);
  targetContainer.appendChild(wrapperDiv);
  return {
    element: wrapperDiv,
    root
  };
}
function createButtonGroup(options, container, position, existingElement) {
  let control = createControls("ButtonGroup", container, position, existingElement, options);
  return control;
}
function createTextBox(options, container, position, existingElement) {
  let control = createControls("TextBox", container, position, existingElement, options);
  return control;
}
function createNumericTextBox(options, container, position, existingElement) {
  if (options == null) options = new TextBoxOptions();
  options.mode = 8;
  return createTextBox(options, container, position, existingElement);
}
function createPercentageTextBox(options, container, position, existingElement) {
  if (options == null) options = new TextBoxOptions();
  options.mode = 9;
  return createTextBox(options, container, position, existingElement);
}
function createCurrencyTextBox(options, container, position, existingElement) {
  if (options == null) options = new TextBoxOptions();
  options.mode = 10;
  return createTextBox(options, container, position, existingElement);
}
function createPasswordTextBox(options, container, position, existingElement) {
  if (options == null) options = new TextBoxOptions();
  options.mode = 6;
  return createTextBox(options, container, position, existingElement);
}
function createMultilineTextBox(options, container, position, existingElement) {
  if (options == null) options = new TextBoxOptions();
  options.mode = 5;
  return createTextBox(options, container, position, existingElement);
}
function createCheckBox(options, container, position, existingElement) {
  let control = createControls("CheckBox", container, position, existingElement, options);
  return control;
}
function createSeparator(options, container, position, existingElement) {
  let control = createControls("Separator", container, position, existingElement, options);
  return control;
}
function createImage(options, container, position, existingElement) {
  let control = createControls("Image", container, position, existingElement, options);
  return control;
}
function createDatePicker(options, container, position, existingElement) {
  let control = createControls("DatePicker", container, position, existingElement, options);
  return control;
}
function createTimePicker(options, container, position, existingElement) {
  if (options == null) options = new DatePickerOptions();
  options.mode = 2;
  return createDatePicker(options, container, position, existingElement);
}
function createDateTimePicker(options, container, position, existingElement) {
  if (options == null) options = new DatePickerOptions();
  options.mode = 1;
  return createDatePicker(options, container, position, existingElement);
}
function createMonthPicker(options, container, position, existingElement) {
  if (options == null) options = new DatePickerOptions();
  options.depth = 1;
  return createDatePicker(options, container, position, existingElement);
}
function createYearPicker(options, container, position, existingElement) {
  if (options == null) options = new DatePickerOptions();
  options.depth = 2;
  return createDatePicker(options, container, position, existingElement);
}
function createComboBox(options, container, position, existingElement) {
  let control = createControls("ComboBox", container, position, existingElement, options);
  return control;
}
function createDropDown(options, container, position, existingElement) {
  if (options == null) options = new ComboBoxOptions();
  options.mode = 1;
  return createComboBox(options, container, position, existingElement);
}
function createSplitButton(options, container, position, existingElement) {
  let control = createControls("SplitButton", container, position, existingElement, options);
  return control;
}
function createMenu(options, container, position, existingElement) {
  let control = createControls("Menu", container, position, existingElement, options);
  return control;
}
function createEditor(options, container, position, existingElement) {
  let control = createControls("Editor", container, position, existingElement, options);
  return control;
}
function createWindow(options, container) {
  let control = createControls("Window", container, null, null, options);
  return control;
}
function createGrid(options, container, position, existingElement) {
  let control = createControls("Grid", container, position, existingElement, options);
  return control;
}
function createSwitch(options, container, position, existingElement) {
  let control = createControls("Switch", container, position, existingElement, options);
  return control;
}
function createCheckBoxList(options, container, position, existingElement) {
  let control = createControls("CheckBoxList", container, position, existingElement, options);
  return control;
}
function createRadioButton(options, container, position, existingElement) {
  let control = createControls("RadioButton", container, position, existingElement, options);
  return control;
}
function createRadioButtonList(options, container, position, existingElement) {
  let control = createControls("RadioButtonList", container, position, existingElement, options);
  return control;
}
function createRepeater(options, container, position, existingElement) {
  let control = createControls("Repeater", container, position, existingElement, options);
  return control;
}
function createMap(options, container, position, existingElement) {
  let control = createControls("Map", container, position, existingElement, options);
  return control;
}
function createPainter(options, container, position, existingElement) {
  let control = createControls("Painter", container, position, existingElement, options);
  return control;
}
function createCalendar(options, container, position, existingElement) {
  let control = createControls("Calendar", container, position, existingElement, options);
  return control;
}
function createRating(options, container, position, existingElement) {
  let control = createControls("Rating", container, position, existingElement, options);
  return control;
}
function createGroupBox(options, container, position, existingElement) {
  let control = createControls("GroupBox", container, position, existingElement, options);
  return control;
}
function createPdfViewer(options, container, position, existingElement) {
  let control = createControls("PdfViewer", container, position, existingElement, options);
  return control;
}
function createPaypalButton(options, container, position, existingElement) {
  let control = createControls("PaypalButton", container, position, existingElement, options);
  return control;
}
function createUpload(options, container, position, existingElement) {
  let control = createControls("Upload", container, position, existingElement, options);
  return control;
}
function createTreeView(options, container, position, existingElement) {
  let control = createControls("TreeView", container, position, existingElement, options);
  return control;
}
function createScheduler(options, container, position, existingElement) {
  let control = createControls("Scheduler", container, position, existingElement, options);
  return control;
}
function createMultiScheduler(options, container, position, existingElement) {
  let control = createControls("MultiScheduler", container, position, existingElement, options);
  return control;
}
function createQrCode(options, container, position, existingElement) {
  let control = createControls("QrCode", container, position, existingElement, options);
  return control;
}
function createIcon(options, container, position, existingElement) {
  let control = createControls("Icon", container, position, existingElement, options);
  return control;
}
function createColorPicker(options, container, position, existingElement) {
  let control = createControls("ColorPicker", container, position, existingElement, options);
  return control;
}
function createSearchBar(options, container, position, existingElement) {
  let control = createControls("SearchBar", container, position, existingElement, options);
  return control;
}
function createSplitter(options, container, position, existingElement) {
  let control = createControls("Splitter", container, position, existingElement, options);
  return control;
}
function createAutoCompleteBox(options, container, position, existingElement) {
  let control = createControls("AutoCompleteBox", container, position, existingElement, options);
  return control;
}
function createChart(options, container, position, existingElement) {
  let control = createControls("Chart", container, position, existingElement, options);
  return control;
}
function createBarChart(options, container, position, existingElement) {
  if (options == null) options = new ChartOptions();
  options.type = "bar";
  return createChart(options, container, position, existingElement);
}
function createHorizontalBarChart(options, container, position, existingElement) {
  if (options == null) options = new ChartOptions();
  options.type = "horizontalBar";
  return createChart(options, container, position, existingElement);
}
function createLineChart(options, container, position, existingElement) {
  if (options == null) options = new ChartOptions();
  options.type = "line";
  return createChart(options, container, position, existingElement);
}
function createDonutChart(options, container, position, existingElement) {
  if (options == null) options = new ChartOptions();
  options.type = "doughnut";
  return createChart(options, container, position, existingElement);
}
function createPieChart(options, container, position, existingElement) {
  if (options == null) options = new ChartOptions();
  options.type = "pie";
  return createChart(options, container, position, existingElement);
}
function createAreaChart(options, container, position, existingElement) {
  if (options == null) options = new ChartOptions();
  options.type = "area";
  return createChart(options, container, position, existingElement);
}
function createStackedBarChart(options, container, position, existingElement) {
  if (options == null) options = new ChartOptions();
  options.type = "stackedBar";
  return createChart(options, container, position, existingElement);
}
function createTabStrip(options, container, position, existingElement) {
  let control = createControls("TabStrip", container, position, existingElement, options);
  return control;
}
function createTooltip(options) {
  let control = createControls("Tooltip", null, null, null, options);
  return control;
}
function createSpeechRecognizer(options, container, position, existingElement) {
  let control = createControls("SpeechRecognizer", container, position, existingElement, options);
  return control;
}
function createLegend(options, container, position, existingElement) {
  let control = createControls("Legend", container, position, existingElement, options);
  return control;
}
function getControl(controlId) {
  return ControlManager.get(controlId);
}
function addControl(control) {
  ControlManager.add(control);
}
function createControls(controlTypeEnum, container, position, existingElement, options) {
  if (options == null)
    options = new VrControlOptions();
  let elementId = "vrpm_" + UtilityManager.createGuid();
  let element = null;
  if (existingElement != null) {
    if (typeof existingElement == "string")
      elementId = existingElement;
    else {
      element = puma(existingElement)[0];
      if (element.id != null && element.id != "")
        elementId = element.id;
    }
  }
  let elementTag = "";
  switch (controlTypeEnum) {
    case "Label":
      elementTag = "label";
      break;
    case "Button":
      elementTag = "button";
      break;
    case "ButtonGroup":
      elementTag = "div";
      break;
    case "TextBox":
      elementTag = "input";
      break;
    case "Window":
      elementTag = "div";
      break;
    case "CheckBox":
      elementTag = "input";
      break;
    case "CheckBoxList":
      elementTag = "div";
      break;
    case "Separator":
      elementTag = "span";
      break;
    case "Image":
      elementTag = "img";
      break;
    case "DatePicker":
      elementTag = "input";
      break;
    case "SplitButton":
      elementTag = "div";
      break;
    case "Menu":
      elementTag = "div";
      break;
    case "Editor":
      elementTag = "textarea";
      break;
    case "Grid":
      elementTag = "table";
      break;
    case "Switch":
      elementTag = "div";
      break;
    case "RadioButton":
      elementTag = "input";
      break;
    case "RadioButtonList":
      elementTag = "div";
      break;
    case "Repeater":
      elementTag = "table";
      break;
    case "Map":
      elementTag = "div";
      break;
    case "Painter":
      elementTag = "canvas";
      break;
    case "Calendar":
      elementTag = "div";
      break;
    case "Rating":
      elementTag = "div";
      break;
    case "GroupBox":
      elementTag = "div";
      break;
    case "PdfViewer":
      elementTag = "div";
      break;
    case "PaypalButton":
      elementTag = "div";
      break;
    case "Upload":
      elementTag = "div";
      break;
    case "TreeView":
      elementTag = "div";
      break;
    case "Scheduler":
      elementTag = "div";
      break;
    case "MultiScheduler":
      elementTag = "div";
      break;
    case "QrCode":
      elementTag = "div";
      break;
    case "Icon":
      elementTag = "i";
      break;
    case "SearchBar":
      elementTag = "div";
      break;
    case "Splitter":
      elementTag = "div";
      break;
    case "AutoCompleteBox":
      elementTag = "div";
      break;
    case "Chart":
      elementTag = "canvas";
      break;
    case "TabStrip":
      elementTag = "div";
      break;
    case "Tooltip":
      elementTag = "div";
      break;
    case "SpeechRecognizer":
      elementTag = "div";
      break;
    case "Div":
      elementTag = "div";
      break;
    case "Legend":
      elementTag = "div";
      break;
    case "ColorPicker":
      {
        if (options.showInput == null || options.showInput === true)
          elementTag = "input";
        else
          elementTag = "button";
      }
      break;
    case "ComboBox":
      {
        if (options.mode == null || options.checkboxes === true || options.webService != null)
          options.mode = 0;
        switch (options.mode) {
          case 0:
            elementTag = options.checkboxes === true ? "div" : "input";
            break;
          case 1:
            elementTag = "div";
            break;
        }
      }
      break;
  }
  if (element == null) {
    if (container != null || controlTypeEnum == "Window" || controlTypeEnum == "PdfViewer" || controlTypeEnum == "Tooltip")
      element = puma("<" + elementTag + " id='" + elementId + "'></" + elementTag + ">")[0];
    else {
      if (!elementId.startsWith("#"))
        elementId = "#" + elementId;
      element = puma(elementId)[0];
    }
  }
  if (!puma(element).is(elementTag))
    throw Error("L'elemento nell'HTML con id: " + elementId + " non corrisponde al corretto elemento: " + elementTag);
  if (elementTag == "input")
    puma(element).attr("autocomplete", "off");
  if ((controlTypeEnum == "Window" || controlTypeEnum == "Tooltip") && container == null)
    container = shadowRoot() != null ? shadowRoot() : document.body;
  if (container != null) {
    if (typeof container == "string" && !container.startsWith("#"))
      container = "#" + container;
    if (position == null) position = 1;
    if (position == 1)
      puma(container).vrAppendPuma(element);
    else
      puma(container).prepend(element);
  }
  let control = puma(element)["vr" + controlTypeEnum](options);
  addControl(control);
  return control;
}
jQuery.fn.extend(
  {
    vrLabel: function(options) {
      let element = this[0];
      return new Label(element, options);
    },
    vrButton: function(options) {
      let element = this[0];
      return new Button(element, options);
    },
    vrButtonGroup: function(options) {
      let element = this[0];
      return new ButtonGroup(element, options);
    },
    vrTextBox: function(options) {
      let element = this[0];
      return new TextBox(element, options);
    },
    vrCheckBox: function(options) {
      let element = this[0];
      return new CheckBox(element, options);
    },
    vrCheckBoxList: function(options) {
      let element = this[0];
      return new CheckBoxList(element, options);
    },
    vrSeparator: function(options) {
      let element = this[0];
      return new Separator(element, options);
    },
    vrImage: function(options) {
      let element = this[0];
      return new Image(element, options);
    },
    vrDatePicker: function(options) {
      let element = this[0];
      return new DatePicker(element, options);
    },
    vrComboBox: function(options) {
      let element = this[0];
      return new ComboBox(element, options);
    },
    vrSplitButton: function(options) {
      let element = this[0];
      return new SplitButton(element, options);
    },
    vrMenu: function(options) {
      let element = this[0];
      return new Menu(element, options);
    },
    vrEditor: function(options) {
      let element = this[0];
      return new Editor(element, options);
    },
    vrWindow: function(options) {
      let element = this[0];
      return new Window(element, options);
    },
    vrGrid: function(options) {
      let element = this[0];
      return new Grid(element, options);
    },
    vrSwitch: function(options) {
      let element = this[0];
      return new Switch(element, options);
    },
    vrRadioButton: function(options) {
      let element = this[0];
      return new RadioButton(element, options);
    },
    vrRadioButtonList: function(options) {
      let element = this[0];
      return new RadioButtonList(element, options);
    },
    vrRepeater: function(options) {
      let element = this[0];
      return new Repeater(element, options);
    },
    vrMap: function(options) {
      let element = this[0];
      return new Maps(element, options);
    },
    vrPainter: function(options) {
      let element = this[0];
      return new Painter(element, options);
    },
    vrCalendar: function(options) {
      let element = this[0];
      return new Calendar(element, options);
    },
    vrRating: function(options) {
      let element = this[0];
      return new Rating(element, options);
    },
    vrGroupBox: function(options) {
      let element = this[0];
      return new GroupBox(element, options);
    },
    vrPdfViewer: function(options) {
      let element = this[0];
      return new PdfViewer(element, options);
    },
    vrPaypalButton: function(options) {
      let element = this[0];
      return new PaypalButton(element, options);
    },
    vrUpload: function(options) {
      let element = this[0];
      return new Upload(element, options);
    },
    vrTreeView: function(options) {
      let element = this[0];
      return new TreeView(element, options);
    },
    vrScheduler: function(options) {
      let element = this[0];
      return new Scheduler(element, options);
    },
    vrMultiScheduler: function(options) {
      let element = this[0];
      return new MultiScheduler(element, options);
    },
    vrQrCode: function(options) {
      let element = this[0];
      return new QrCode(element, options);
    },
    vrIcon: function(options) {
      let element = this[0];
      return new Icon(element, options);
    },
    vrColorPicker: function(options) {
      let element = this[0];
      return new ColorPicker(element, options);
    },
    vrSearchBar: function(options) {
      let element = this[0];
      return new SearchBar(element, options);
    },
    vrSplitter: function(options) {
      let element = this[0];
      return new Splitter(element, options);
    },
    vrAutoCompleteBox: function(options) {
      let element = this[0];
      return new AutoCompleteBox(element, options);
    },
    vrChart: function(options) {
      let element = this[0];
      return new ChartVr(element, options);
    },
    vrTabStrip: function(options) {
      let element = this[0];
      return new TabStrip(element, options);
    },
    vrTooltip: function(options) {
      let element = this[0];
      return new Tooltip(element, options);
    },
    vrSpeechRecognizer: function(options) {
      let element = this[0];
      return new SpeechRecognizer(element, options);
    },
    vrDiv: function(options) {
      let element = this[0];
      return new Div(element, options);
    },
    vrLegend: function(options) {
      let element = this[0];
      return new Legend(element, options);
    }
  }
);
$(() => {
  const observer = new MutationObserver((mutations_list) => {
    mutations_list.forEach((mutations) => {
      mutations.removedNodes.forEach((currentValue, currentIndex, listObj) => {
        if (currentValue.classList != null) {
          if (!currentValue.isConnected)
            removeItems(currentValue);
        }
      });
    });
  });
  observer.observe(document.body, { subtree: true, childList: true });
  function removeItems(element) {
    if (element != null) {
      try {
        if (element.id != null) {
          let idElement = element.id.replace("Container", "").replace("#", "").replace(".", "");
          ControlManager.remove(idElement);
          puma("#" + idElement + "_divPopup").remove();
          puma("." + idElement + "_wndUtility").remove();
          puma("#" + idElement + "_someStuff").remove();
          puma("#" + idElement + "_someStuffContainer").remove();
          puma("#vrWindowBackground_" + idElement).remove();
        }
      } catch (e) {
      }
      if (element.children == null || element.children.length == 0)
        return;
      for (let child of element.children)
        removeItems(child);
    }
  }
});
var ControlTypeEnum = /* @__PURE__ */ ((ControlTypeEnum2) => {
  ControlTypeEnum2["Label"] = "Label";
  ControlTypeEnum2["Button"] = "Button";
  ControlTypeEnum2["Window"] = "Window";
  ControlTypeEnum2["TextBox"] = "TextBox";
  ControlTypeEnum2["CheckBox"] = "CheckBox";
  ControlTypeEnum2["Separator"] = "Separator";
  ControlTypeEnum2["ButtonGroup"] = "ButtonGroup";
  ControlTypeEnum2["Image"] = "Image";
  ControlTypeEnum2["DatePicker"] = "DatePicker";
  ControlTypeEnum2["ComboBox"] = "ComboBox";
  ControlTypeEnum2["SplitButton"] = "SplitButton";
  ControlTypeEnum2["Menu"] = "Menu";
  ControlTypeEnum2["Editor"] = "Editor";
  ControlTypeEnum2["Grid"] = "Grid";
  ControlTypeEnum2["Switch"] = "Switch";
  ControlTypeEnum2["CheckBoxList"] = "CheckBoxList";
  ControlTypeEnum2["RadioButton"] = "RadioButton";
  ControlTypeEnum2["RadioButtonList"] = "RadioButtonList";
  ControlTypeEnum2["Repeater"] = "Repeater";
  ControlTypeEnum2["Map"] = "Map";
  ControlTypeEnum2["Painter"] = "Painter";
  ControlTypeEnum2["Calendar"] = "Calendar";
  ControlTypeEnum2["Rating"] = "Rating";
  ControlTypeEnum2["GroupBox"] = "GroupBox";
  ControlTypeEnum2["PdfViewer"] = "PdfViewer";
  ControlTypeEnum2["Upload"] = "Upload";
  ControlTypeEnum2["PaypalButton"] = "PaypalButton";
  ControlTypeEnum2["TreeView"] = "TreeView";
  ControlTypeEnum2["Scheduler"] = "Scheduler";
  ControlTypeEnum2["MultiScheduler"] = "MultiScheduler";
  ControlTypeEnum2["QrCode"] = "QrCode";
  ControlTypeEnum2["Icon"] = "Icon";
  ControlTypeEnum2["ColorPicker"] = "ColorPicker";
  ControlTypeEnum2["SearchBar"] = "SearchBar";
  ControlTypeEnum2["Splitter"] = "Splitter";
  ControlTypeEnum2["AutoCompleteBox"] = "AutoCompleteBox";
  ControlTypeEnum2["Chart"] = "Chart";
  ControlTypeEnum2["TabStrip"] = "TabStrip";
  ControlTypeEnum2["Tooltip"] = "Tooltip";
  ControlTypeEnum2["SpeechRecognizer"] = "SpeechRecognizer";
  ControlTypeEnum2["Div"] = "Div";
  ControlTypeEnum2["Legend"] = "Legend";
  return ControlTypeEnum2;
})(ControlTypeEnum || {});
var ControlPositionEnum = /* @__PURE__ */ ((ControlPositionEnum2) => {
  ControlPositionEnum2[ControlPositionEnum2["Before"] = 0] = "Before";
  ControlPositionEnum2[ControlPositionEnum2["After"] = 1] = "After";
  ControlPositionEnum2[ControlPositionEnum2["None"] = 2] = "None";
  return ControlPositionEnum2;
})(ControlPositionEnum || {});
function hideNotify() {
  puma(".vrNotifierContainer").hide();
}
function notify(text, options) {
  let notifier = new Notifier(text, options);
  return notifier;
}
function notifyError(text, options) {
  if (options == null) options = new NotifierOptions();
  if (options.type == null) options.type = 4;
  return new Notifier(text, options);
}
function notifyWarning(text, options) {
  if (options == null) options = new NotifierOptions();
  if (options.type == null) options.type = 3;
  return new Notifier(text, options);
}
function notifySuccess(text, options) {
  if (options == null) options = new NotifierOptions();
  if (options.type == null) options.type = 1;
  return new Notifier(text, options);
}
function notifyInfo(text, options) {
  if (options == null) options = new NotifierOptions();
  if (options.type == null) options.type = 2;
  return new Notifier(text, options);
}
function confirm(text, options) {
  let confirm2 = new Confirm(text, options);
  return confirm2.open();
}
function alert(text, options) {
  let alert2 = new Alert(text, options);
  return alert2.open();
}
function dialog(text, options) {
  let dialog2 = new Dialog(text, options);
  dialog2.open();
  return dialog2;
}
function prompt(text, options) {
  let prompt2 = new Prompt(text, options);
  return prompt2.open();
}
function printElement(element, options) {
  PrintManager.printElement(element, options);
}
function printHtml(elementId, options) {
  PrintManager.printHtml(elementId, options);
}
function printBytes(base64Bytes, options) {
  PrintManager.printBytes(base64Bytes, options);
}
function printPdf(path, options) {
  PrintManager.printPdf(path, options);
}
function printImage(path, options) {
  PrintManager.printImage(path, options);
}
function isSmartphone() {
  return DeviceManager.isSmartphone();
}
function isTablet() {
  return DeviceManager.isTablet();
}
function isDesktop() {
  return DeviceManager.isDesktop();
}
function isMobile() {
  return DeviceManager.isMobile();
}
function isIphoneX() {
  return DeviceManager.isIphoneX();
}
function isIphone() {
  return DeviceManager.isIphone();
}
function browser() {
  return DeviceManager.browser();
}
function isInternetExplorer() {
  return DeviceManager.isInternetExplorer();
}
function isSafari() {
  return DeviceManager.isSafari();
}
function isChrome() {
  return DeviceManager.isChrome();
}
function isFirefox() {
  return DeviceManager.isFirefox();
}
function isEdge() {
  return DeviceManager.isEdge();
}
function isOpera() {
  return DeviceManager.isOpera();
}
function isVivaldi() {
  return DeviceManager.isVivaldi();
}
function isSeamonkey() {
  return DeviceManager.isSeamonkey();
}
var BrowserTypeEnum = /* @__PURE__ */ ((BrowserTypeEnum2) => {
  BrowserTypeEnum2["InternetExplorer"] = "InternetExplorer";
  BrowserTypeEnum2["Safari"] = "Safari";
  BrowserTypeEnum2["Chrome"] = "Chrome";
  BrowserTypeEnum2["Firefox"] = "Firefox";
  BrowserTypeEnum2["Edge"] = "Edge";
  BrowserTypeEnum2["Opera"] = "Opera";
  BrowserTypeEnum2["Vivaldi"] = "Vivaldi";
  BrowserTypeEnum2["Seamonkey"] = "Seamonkey";
  return BrowserTypeEnum2;
})(BrowserTypeEnum || {});
function createDiv(options, container, position) {
  let control = createControls("Div", container, position, null, options);
  return control;
}
function div(container, settings, prepend = false) {
  let classAttribute = "";
  let idAttribute = "";
  let css = "";
  let content = "";
  let title = "";
  if (settings != null) {
    if (settings.class != null)
      classAttribute = "class = '" + settings.class + "'";
    if (settings.id != null)
      idAttribute = "id = '" + settings.id + "'";
    if (settings.css != null)
      css = "style='" + settings.css + "'";
    if (settings.content != null)
      content = settings.content;
    if (settings.tooltip != null)
      title = "title='" + settings.tooltip + "'";
  }
  let div2 = puma("<div " + title + " " + classAttribute + " " + idAttribute + " " + css + ">" + content + "</div>")[0];
  if (container != null) {
    if (typeof container == "string" && !container.startsWith("#") && !container.startsWith("."))
      container = "#" + container;
    if (!prepend)
      puma(div2).vrAppendToPuma(container);
    else
      puma(div2).vrPrependToPuma(container);
  }
  if (settings != null && settings.attributes != null) {
    for (let attribute of settings.attributes)
      puma(div2).attr(attribute.name, attribute.value);
  }
  return div2;
}
function span(container, settings, prepend = false) {
  let classAttribute = "";
  let idAttribute = "";
  let css = "";
  let content = "";
  let title = "";
  if (settings != null) {
    if (settings.class != null)
      classAttribute = "class = '" + settings.class + "'";
    if (settings.id != null)
      idAttribute = "id = '" + settings.id + "'";
    if (settings.css != null)
      css = "style='" + settings.css + "'";
    if (settings.content != null)
      content = settings.content;
    if (settings.tooltip != null)
      title = "title='" + settings.tooltip + "'";
  }
  let span2 = puma("<span " + title + " " + classAttribute + " " + idAttribute + " " + css + ">" + content + "</span>")[0];
  if (container != null) {
    if (typeof container == "string" && !container.startsWith("#") && !container.startsWith("."))
      container = "#" + container;
    if (!prepend)
      puma(span2).vrAppendToPuma(container);
    else
      puma(span2).vrPrependToPuma(container);
  }
  if (settings != null && settings.attributes != null) {
    for (let attribute of settings.attributes)
      puma(span2).attr(attribute.name, attribute.value);
  }
  return span2;
}
function icon(iconClass, container, settings, prepend = false) {
  if (container != null && typeof container == "string" && !container.startsWith("#") && !container.startsWith("."))
    container = "#" + container;
  let classAttribute = "";
  let idAttribute = "";
  let css = "";
  if (settings != null) {
    if (settings.id != null)
      idAttribute = "id = '" + settings.id + "'";
    if (settings.css != null)
      css += settings.css + ";";
    if (settings.fontSize != null) {
      if (typeof settings.fontSize == "number")
        settings.fontSize = settings.fontSize + "px";
      css += "font-size: " + settings.fontSize + ";";
    }
    if (settings.color != null)
      css += "color: " + settings.color + ";";
    if (settings.class != null)
      classAttribute += settings.class;
    if (settings.cursor != null)
      css += "cursor: " + settings.cursor + ";";
  }
  let icon2 = puma("<i class='" + iconClass + " vrIcon " + classAttribute + "' id='" + idAttribute + "' style='" + css + "'></i>")[0];
  if (container != null) {
    if (!prepend)
      puma(icon2).vrAppendToPuma(container);
    else
      puma(icon2).vrPrependToPuma(container);
  }
  return icon2;
}
class IconSettings {
  fontSize;
  css;
  id;
  color;
  class;
  cursor;
  position;
}
function iframe(container, settings) {
  if (typeof container == "string" && !container.startsWith("#") && !container.startsWith("."))
    container = "#" + container;
  if (settings == null) settings = new VrIframeSettings();
  if (settings.content == null) settings.content = "";
  if (settings.width == null) settings.width = "100%";
  if (settings.height == null) settings.height = "100%";
  if (typeof settings.width == "number") settings.width = settings.width + "px";
  if (typeof settings.height == "number") settings.height = settings.height + "px";
  let iframe2 = puma("<iframe>").vrAppendToPuma(container)[0];
  iframe2.style.cssText += "width: " + settings.width + "; height: " + settings.height + "; border: none;" + settings.css;
  if (settings.content.includes(".html") || settings.content.includes(".php") || settings.content.includes(".aspx") || settings.content.includes("http")) {
    if (settings.loader || settings.loader !== false) {
      if (settings.loader === true)
        settings.loader = iframe2;
      LoaderManager.show(settings.loader === false ? iframe2 : settings.loader);
    }
    puma(iframe2).attr("src", settings.content);
    puma(iframe2).on("load", () => {
      let iframeContentDocument = iframe2.contentDocument;
      puma(iframeContentDocument).find("body").css("margin", "0px");
      if (settings.callback != null)
        settings.callback();
      LoaderManager.hide();
    });
  } else {
    let iframeBody = null;
    let iframeContentDocument = iframe2.contentDocument;
    puma(iframeContentDocument).find("body").css("margin", "0px");
    if (iframeContentDocument != null)
      iframeBody = iframeContentDocument.body;
    puma(settings.content).vrAppendToPuma(iframeBody);
    if (settings.callback != null)
      settings.callback();
    LoaderManager.hide();
  }
  if (settings != null && settings.attributes != null) {
    for (let attribute of settings.attributes)
      puma(iframe2).attr(attribute.name, attribute.value);
  }
  return iframe2;
}
class VrIframeSettings {
  content;
  loader;
  callback;
  width;
  height;
  css;
  attributes;
}
function br(container, count = 1) {
  if (typeof container == "string" && !container.startsWith("#") && !container.startsWith("."))
    container = "#" + container;
  for (let i = 0; i < count; i++)
    puma("<br />").vrAppendToPuma(container);
}
function hr(container, css = "", id) {
  if (typeof container == "string" && !container.startsWith("#") && !container.startsWith("."))
    container = "#" + container;
  let idString = id == null ? "" : " id='" + id + "'";
  return puma("<hr " + idString + " style='" + css + "' />").vrAppendToPuma(container)[0];
}
function guid() {
  const hex = [...Array(256).keys()].map((index) => index.toString(16).padStart(2, "0"));
  const r = crypto.getRandomValues(new Uint8Array(16));
  r[6] = r[6] & 15 | 64;
  r[8] = r[8] & 63 | 128;
  return [...r.entries()].map(([index, int]) => [4, 6, 8, 10].includes(index) ? `-${hex[int]}` : hex[int]).join("");
}
class VrMarginSettings {
  top;
  right;
  bottom;
  left;
}
function showLoader(element, transparency = true, tag, text) {
  if (typeof element == "boolean") element = void 0;
  LoaderManager.show(element, transparency, tag, text);
}
function hideLoader(tag) {
  LoaderManager.hide(tag);
}
function pumo() {
  confirm("Giuri solennemente di non avere buone intenzioni?").then(() => alert("Il signor Matteo Pumo è fiero di presentarti 'I controlli del malandrino'! So che saprai usarli nel modo giusto")).catch(() => alert("Peggio per te, non saprai mai quant'è profonda la tana del bianconiglio"));
}
var CreatorEnum = /* @__PURE__ */ ((CreatorEnum2) => {
  CreatorEnum2["MatteoPumo"] = "MatteoPumo";
  CreatorEnum2["MatteoPumoSite"] = "https://www.matteopumo.com";
  CreatorEnum2["MatteoPumoMail"] = "info@matteopumo.com";
  CreatorEnum2["VettoreRinascimento"] = "VettoreRinascimento";
  CreatorEnum2["VettoreMedical"] = "VettoreMedical";
  CreatorEnum2["Year2020"] = "Year2020";
  CreatorEnum2["PureJqueryTypescript"] = "PureJqueryTypescript";
  CreatorEnum2["FastestControlsEver"] = "FastestControlsEver";
  return CreatorEnum2;
})(CreatorEnum || {});
var IconClassicBrands = /* @__PURE__ */ ((IconClassicBrands2) => {
  IconClassicBrands2["Amazon"] = "fa-brands fa-amazon";
  IconClassicBrands2["Android"] = "fa-brands fa-android";
  IconClassicBrands2["Apple"] = "fa-brands fa-apple";
  IconClassicBrands2["AppStore"] = "fa-brands fa-app-store";
  IconClassicBrands2["Facebook"] = "fa-brands fa-facebook";
  IconClassicBrands2["Google"] = "fa-brands fa-google";
  IconClassicBrands2["GooglePlay"] = "fa-brands fa-google-play";
  IconClassicBrands2["Paypal"] = "fa-brands fa-paypal";
  IconClassicBrands2["Twitter"] = "fa-brands fa-twitter";
  IconClassicBrands2["Vimeo"] = "fa-brands fa-vimeo";
  IconClassicBrands2["Whatsapp"] = "fa-brands fa-whatsapp";
  IconClassicBrands2["Windows"] = "fa-brands fa-windows";
  IconClassicBrands2["Youtube"] = "fa-brands fa-youtube";
  return IconClassicBrands2;
})(IconClassicBrands || {});
var IconClassicSolid = /* @__PURE__ */ ((IconClassicSolid2) => {
  IconClassicSolid2["Add"] = "fa-solid fa-plus";
  IconClassicSolid2["AddressCard"] = "fa-solid fa-address-card";
  IconClassicSolid2["Alert"] = "fa-solid fa-triangle-exclamation";
  IconClassicSolid2["AngleDown"] = "fa-solid fa-angle-down";
  IconClassicSolid2["AngleLeft"] = "fa-solid fa-angle-left";
  IconClassicSolid2["AngleRight"] = "fa-solid fa-angle-right";
  IconClassicSolid2["AngleUp"] = "fa-solid fa-angle-up";
  IconClassicSolid2["Aperture"] = "fa-solid fa-aperture";
  IconClassicSolid2["ArrowDown"] = "fa-solid fa-arrow-down";
  IconClassicSolid2["ArrowDownShortWide"] = "fa-solid fa-arrow-down-short-wide";
  IconClassicSolid2["ArrowDownWideShort"] = "fa-solid fa-arrow-down-wide-short";
  IconClassicSolid2["ArrowLeft"] = "fa-solid fa-arrow-left";
  IconClassicSolid2["ArrowPointer"] = "fa-solid fa-arrow-pointer";
  IconClassicSolid2["ArrowRight"] = "fa-solid fa-arrow-right";
  IconClassicSolid2["ArrowRightToBracket"] = "fa-solid fa-arrow-right-to-bracket";
  IconClassicSolid2["ArrowRightFromBracket"] = "fa-solid fa-arrow-right-from-bracket";
  IconClassicSolid2["ArrowRotateRight"] = "fa-solid fa-arrow-rotate-right";
  IconClassicSolid2["ArrowsRepeat"] = "fa-solid fa-arrows-repeat";
  IconClassicSolid2["ArrowsRotate"] = "fa-solid fa-arrows-rotate";
  IconClassicSolid2["ArrowUp"] = "fa-solid fa-arrow-up";
  IconClassicSolid2["Asterisk"] = "fa-solid fa-asterisk";
  IconClassicSolid2["At"] = "fa-solid fa-at";
  IconClassicSolid2["Attachment"] = "fa-solid fa-paperclip";
  IconClassicSolid2["Back"] = "fa-solid fa-angle-left";
  IconClassicSolid2["Backward"] = "fa-solid fa-backward";
  IconClassicSolid2["BackwardFast"] = "fa-solid fa-backward-fast";
  IconClassicSolid2["BackwardStep"] = "fa-solid fa-backward-step";
  IconClassicSolid2["BalanceScale"] = "fa-solid fa-balance-scale";
  IconClassicSolid2["BallotCheck"] = "fa-solid fa-ballot-check";
  IconClassicSolid2["Ban"] = "fa-solid fa-ban";
  IconClassicSolid2["Barcode"] = "fa-solid fa-barcode";
  IconClassicSolid2["BarcodeScan"] = "fa-solid fa-barcode-scan";
  IconClassicSolid2["Bars"] = "fa-solid fa-bars";
  IconClassicSolid2["BarsSort"] = "fa-solid fa-bars-sort";
  IconClassicSolid2["Bell"] = "fa-solid fa-bell";
  IconClassicSolid2["BellSlash"] = "fa-solid fa-bell-slash";
  IconClassicSolid2["Bolt"] = "fa-solid fa-bolt";
  IconClassicSolid2["Bomb"] = "fa-solid fa-bomb";
  IconClassicSolid2["Book"] = "fa-solid fa-book";
  IconClassicSolid2["BookOpen"] = "fa-solid fa-book-open";
  IconClassicSolid2["Box"] = "fa-solid fa-box";
  IconClassicSolid2["BoxArchive"] = "fa-solid fa-box-archive";
  IconClassicSolid2["BriefCase"] = "fa-solid fa-brief-case";
  IconClassicSolid2["Bug"] = "fa-solid fa-bug";
  IconClassicSolid2["Burger"] = "fa-solid fa-bars";
  IconClassicSolid2["CakeCandles"] = "fa-solid fa-cake-candles";
  IconClassicSolid2["Calendar"] = "fa-solid fa-calendar";
  IconClassicSolid2["CalendarAlt"] = "fa-solid fa-calendar-alt";
  IconClassicSolid2["CalendarCheck"] = "fa-solid fa-calendar-check";
  IconClassicSolid2["CalendarDay"] = "fa-solid fa-calendar-day";
  IconClassicSolid2["CalendarPlus"] = "fa-solid fa-calendar-plus";
  IconClassicSolid2["Camera"] = "fa-solid fa-camera";
  IconClassicSolid2["CameraAlt"] = "fa-solid fa-camera-alt";
  IconClassicSolid2["CameraWeb"] = "fa-solid fa-camera-web";
  IconClassicSolid2["CameraWebSlash"] = "fa-solid fa-camera-web-slash";
  IconClassicSolid2["Capsules"] = "fa-solid fa-capsules";
  IconClassicSolid2["CaretDown"] = "fa-solid fa-caret-down";
  IconClassicSolid2["CaretLeft"] = "fa-solid fa-caret-left";
  IconClassicSolid2["CaretRight"] = "fa-solid fa-caret-right";
  IconClassicSolid2["CaretUp"] = "fa-solid fa-caret-up";
  IconClassicSolid2["CartCirclePlus"] = "fa-solid fa-cart-circle-plus";
  IconClassicSolid2["CartShopping"] = "fa-solid fa-cart-shopping";
  IconClassicSolid2["ChartArea"] = "fa-solid fa-chart-area";
  IconClassicSolid2["ChartBar"] = "fa-solid fa-chart-bar";
  IconClassicSolid2["ChartColumn"] = "fa-solid fa-chart-column";
  IconClassicSolid2["ChartLine"] = "fa-solid fa-chart-line";
  IconClassicSolid2["ChartPie"] = "fa-solid fa-chart-pie";
  IconClassicSolid2["ChartSimple"] = "fa-solid fa-chart-simple";
  IconClassicSolid2["Chat"] = "fa-solid fa-comment";
  IconClassicSolid2["Check"] = "fa-solid fa-check";
  IconClassicSolid2["ChevronDown"] = "fa-solid fa-chevron-down";
  IconClassicSolid2["ChevronLeft"] = "fa-solid fa-chevron-left";
  IconClassicSolid2["ChevronRight"] = "fa-solid fa-chevron-right";
  IconClassicSolid2["ChevronUp"] = "fa-solid fa-chevron-up";
  IconClassicSolid2["Circle"] = "fa-solid fa-circle";
  IconClassicSolid2["CircleCheck"] = "fa-solid fa-circle-check";
  IconClassicSolid2["CircleExclamation"] = "fa-solid fa-circle-exclamation";
  IconClassicSolid2["CircleInfo"] = "fa-solid fa-circle-info";
  IconClassicSolid2["CircleSmall"] = "fa-solid fa-circle-small";
  IconClassicSolid2["CircleStop"] = "fa-solid fa-circle-stop";
  IconClassicSolid2["Clipboard"] = "fa-solid fa-clipboard";
  IconClassicSolid2["ClipboardMedical"] = "fa-solid fa-clipboard-medical";
  IconClassicSolid2["Clock"] = "fa-solid fa-clock";
  IconClassicSolid2["ClockRotateLeft"] = "fa-solid fa-clock-rotate-left";
  IconClassicSolid2["Close"] = "fa-solid fa-xmark";
  IconClassicSolid2["Cloud"] = "fa-solid fa-cloud";
  IconClassicSolid2["CloudArrowUp"] = "fa-solid fa-cloud-arrow-up";
  IconClassicSolid2["CloudDownload"] = "fa-solid fa-cloud-download";
  IconClassicSolid2["Code"] = "fa-solid fa-code";
  IconClassicSolid2["CodeMerge"] = "fa-solid fa-code-merge";
  IconClassicSolid2["Coins"] = "fa-solid fa-coins";
  IconClassicSolid2["Collapse"] = "fa-solid fa-compress";
  IconClassicSolid2["Comment"] = "fa-solid fa-comment";
  IconClassicSolid2["CommentDots"] = "fa-solid fa-comment-dots";
  IconClassicSolid2["CommentLines"] = "fa-solid fa-comment-lines";
  IconClassicSolid2["Comments"] = "fa-solid fa-comments";
  IconClassicSolid2["CommentSms"] = "fa-solid fa-comment-sms";
  IconClassicSolid2["Compress"] = "fa-solid fa-compress";
  IconClassicSolid2["Copy"] = "fa-solid fa-copy";
  IconClassicSolid2["Copyright"] = "fa-solid fa-copyright";
  IconClassicSolid2["CreditCard"] = "fa-solid fa-credit-card";
  IconClassicSolid2["Crown"] = "fa-solid fa-crown";
  IconClassicSolid2["Database"] = "fa-solid fa-database";
  IconClassicSolid2["Delete"] = "fa-solid fa-xmark";
  IconClassicSolid2["DeleteLeft"] = "fa-solid fa-delete-left";
  IconClassicSolid2["DeleteRight"] = "fa-solid fa-delete-right";
  IconClassicSolid2["Desktop"] = "fa-solid fa-desktop";
  IconClassicSolid2["Download"] = "fa-solid fa-download";
  IconClassicSolid2["Edit"] = "fa-solid fa-pen";
  IconClassicSolid2["Eject"] = "fa-solid fa-eject";
  IconClassicSolid2["Ellipsis"] = "fa-solid fa-ellipsis";
  IconClassicSolid2["EllipsisVertical"] = "fa-solid fa-ellipsis-vertical";
  IconClassicSolid2["Envelope"] = "fa-solid fa-envelope";
  IconClassicSolid2["Eraser"] = "fa-solid fa-eraser";
  IconClassicSolid2["EuroSign"] = "fa-solid fa-euro-sign";
  IconClassicSolid2["Exclamation"] = "fa-solid fa-exclamation";
  IconClassicSolid2["Expand"] = "fa-solid fa-expand";
  IconClassicSolid2["Eye"] = "fa-solid fa-eye";
  IconClassicSolid2["EyeSlash"] = "fa-solid fa-eye-slash";
  IconClassicSolid2["Family"] = "fa-solid fa-family";
  IconClassicSolid2["FastBackward"] = "fa-solid fa-fast-backward";
  IconClassicSolid2["FastForward"] = "fa-solid fa-fast-forward";
  IconClassicSolid2["File"] = "fa-solid fa-file";
  IconClassicSolid2["FileAudio"] = "fa-solid fa-file-audio";
  IconClassicSolid2["FileContract"] = "fa-solid fa-file-contract";
  IconClassicSolid2["FileDownload"] = "fa-solid fa-file-download";
  IconClassicSolid2["FileExcel"] = "fa-solid fa-file-excel";
  IconClassicSolid2["FileExport"] = "fa-solid fa-file-export";
  IconClassicSolid2["FileImage"] = "fa-solid fa-file-image";
  IconClassicSolid2["FileInvoice"] = "fa-solid fa-file-invoice";
  IconClassicSolid2["FileImport"] = "fa-solid fa-file-import";
  IconClassicSolid2["FileLines"] = "fa-solid fa-file-lines";
  IconClassicSolid2["FileMusic"] = "fa-solid fa-file-music";
  IconClassicSolid2["FilePdf"] = "fa-solid fa-file-pdf";
  IconClassicSolid2["Files"] = "fa-solid fa-file-files";
  IconClassicSolid2["FileSignature"] = "fa-solid fa-file-signature";
  IconClassicSolid2["FileVideo"] = "fa-solid fa-file-video";
  IconClassicSolid2["FileWord"] = "fa-solid fa-file-word";
  IconClassicSolid2["FileZipper"] = "fa-solid fa-file-zipper";
  IconClassicSolid2["Filter"] = "fa-solid fa-filter";
  IconClassicSolid2["Flag"] = "fa-solid fa-flag";
  IconClassicSolid2["FlagSwallowTail"] = "fa-solid fa-flag-swallowtail";
  IconClassicSolid2["FloppyDisk"] = "fa-solid fa-floppy-disk";
  IconClassicSolid2["Folder"] = "fa-solid fa-folder";
  IconClassicSolid2["FolderOpen"] = "fa-solid fa-folder-open";
  IconClassicSolid2["FontAwesome"] = "fa-solid  fa-font-awesome";
  IconClassicSolid2["Forward"] = "fa-solid fa-forward";
  IconClassicSolid2["ForwardStep"] = "fa-solid fa-forward-step";
  IconClassicSolid2["ForwardFast"] = "fa-solid fa-forward-fast";
  IconClassicSolid2["Futbol"] = "fa-solid fa-futbol";
  IconClassicSolid2["Gear"] = "fa-solid fa-gear";
  IconClassicSolid2["Gears"] = "fa-solid fa-gears";
  IconClassicSolid2["Globe"] = "fa-solid fa-globe";
  IconClassicSolid2["Hashtag"] = "fa-solid fa-hashtag";
  IconClassicSolid2["HatWizard"] = "fa-solid fa-hat-wizard";
  IconClassicSolid2["Headset"] = "fa-solid fa-headset";
  IconClassicSolid2["Hospital"] = "fa-solid fa-hospital";
  IconClassicSolid2["Hourglass"] = "fa-solid fa-hourglass";
  IconClassicSolid2["HourglassClock"] = "fa-solid fa-hourglass-clock";
  IconClassicSolid2["House"] = "fa-solid fa-house";
  IconClassicSolid2["HouseMedical"] = "fa-solid fa-house-medical";
  IconClassicSolid2["HouseUser"] = "fa-solid fa-house-user";
  IconClassicSolid2["Image"] = "fa-solid fa-image";
  IconClassicSolid2["Inbox"] = "fa-solid fa-inbox";
  IconClassicSolid2["InboxFull"] = "fa-solid fa-inbox-full";
  IconClassicSolid2["Info"] = "fa-solid fa-info";
  IconClassicSolid2["Key"] = "fa-solid fa-key";
  IconClassicSolid2["Keyboard"] = "fa-solid fa-keyboard";
  IconClassicSolid2["KeySkeleton"] = "fa-solid fa-key-skeleton";
  IconClassicSolid2["Laptop"] = "fa-solid fa-laptop";
  IconClassicSolid2["LaptopMedical"] = "fa-solid fa-laptop-medical";
  IconClassicSolid2["LevelDown"] = "fa-solid fa-level-down";
  IconClassicSolid2["LevelDownAlt"] = "fa-solid fa-level-down-alt";
  IconClassicSolid2["LevelLeft"] = "fa-solid fa-level-left";
  IconClassicSolid2["LevelLeftAlt"] = "fa-solid fa-level-left-alt";
  IconClassicSolid2["LevelRight"] = "fa-solid fa-level-right";
  IconClassicSolid2["LevelRightAlt"] = "fa-solid fa-level-right-alt";
  IconClassicSolid2["LevelUp"] = "fa-solid fa-level-up";
  IconClassicSolid2["LevelUpAlt"] = "fa-solid fa-level-up-alt";
  IconClassicSolid2["Link"] = "fa-solid fa-link";
  IconClassicSolid2["LinkExternal"] = "fa-solid fa-arrow-up-right-from-square";
  IconClassicSolid2["LinkHorizontal"] = "fa-solid fa-link-horizontal";
  IconClassicSolid2["LinkHorizontalSlash"] = "fa-solid fa-link-horizontal-slash";
  IconClassicSolid2["LinkSimple"] = "fa-solid fa-link-simple";
  IconClassicSolid2["LinkSimpleSlash"] = "fa-solid fa-link-simple-slash";
  IconClassicSolid2["LinkSlash"] = "fa-solid fa-link-slash";
  IconClassicSolid2["List"] = "fa-solid fa-list";
  IconClassicSolid2["ListCheck"] = "fa-solid fa-list-check";
  IconClassicSolid2["ListOl"] = "fa-solid fa-list-ol";
  IconClassicSolid2["ListTree"] = "fa-solid fa-list-tree";
  IconClassicSolid2["ListUl"] = "fa-solid fa-list-ul";
  IconClassicSolid2["LocationArrow"] = "fa-solid fa-location-arrow";
  IconClassicSolid2["LocationCrossHairs"] = "fa-solid fa-location-crosshairs";
  IconClassicSolid2["LocationCheck"] = "fa-solid fa-location-check";
  IconClassicSolid2["LocationDot"] = "fa-solid fa-location-dot";
  IconClassicSolid2["Lock"] = "fa-solid fa-lock";
  IconClassicSolid2["LockOpen"] = "fa-solid fa-lock-open";
  IconClassicSolid2["Login"] = "fa-solid fa-arrow-right-to-bracket";
  IconClassicSolid2["Logout"] = "fa-solid fa-arrow-right-from-bracket";
  IconClassicSolid2["MagnifyingGlass"] = "fa-solid fa-magnifying-glass";
  IconClassicSolid2["MagnifyingGlassMinus"] = "fa-solid fa-magnifying-glass-minus";
  IconClassicSolid2["MagnifyingGlassPlus"] = "fa-solid fa-magnifying-glass-plus";
  IconClassicSolid2["Mail"] = "fa-solid fa-envelope";
  IconClassicSolid2["Mailbox"] = "fa-solid fa-mailbox";
  IconClassicSolid2["MailOpen"] = "fa-solid fa-envelope-open";
  IconClassicSolid2["Map"] = "fa-solid fa-map";
  IconClassicSolid2["MapLocation"] = "fa-solid fa-map-location";
  IconClassicSolid2["MapLocationDot"] = "fa-solid fa-map-location-dot";
  IconClassicSolid2["MapPin"] = "fa-solid fa-map-pin";
  IconClassicSolid2["Maximize"] = "fa-solid fa-maximize";
  IconClassicSolid2["Merge"] = "fa-solid fa-merge";
  IconClassicSolid2["Message"] = "fa-solid fa-message";
  IconClassicSolid2["MessageCode"] = "fa-solid fa-message-code";
  IconClassicSolid2["MessageDots"] = "fa-solid fa-message-dots";
  IconClassicSolid2["MessageLines"] = "fa-solid fa-message-lines";
  IconClassicSolid2["Messages"] = "fa-solid fa-messages";
  IconClassicSolid2["Microphone"] = "fa-solid fa-microphone";
  IconClassicSolid2["MicrophoneLines"] = "fa-solid fa-microphone-lines";
  IconClassicSolid2["MicrophoneLinesSlash"] = "fa-solid fa-microphone-lines-slash";
  IconClassicSolid2["MicrophoneSlash"] = "fa-solid fa-microphone-slash";
  IconClassicSolid2["Microscope"] = "fa-solid fa-microscope";
  IconClassicSolid2["Minimize"] = "fa-solid fa-minimize";
  IconClassicSolid2["Minus"] = "fa-solid fa-minus";
  IconClassicSolid2["Mobile"] = "fa-solid fa-mobile";
  IconClassicSolid2["MobileNotch"] = "fa-solid fa-mobile-notch";
  IconClassicSolid2["MoneyCheckDollarPen"] = "fa-solid fa-money-check-dollar-pen";
  IconClassicSolid2["Music"] = "fa-solid fa-music";
  IconClassicSolid2["MusicSlash"] = "fa-solid fa-music-slash";
  IconClassicSolid2["NewsPaper"] = "fa-solid fa-newspaper";
  IconClassicSolid2["Palette"] = "fa-solid fa-palette";
  IconClassicSolid2["PaperClip"] = "fa-solid fa-paperclip";
  IconClassicSolid2["PaperClipVertical"] = "fa-solid fa-paperclip-vertical";
  IconClassicSolid2["PaperPlane"] = "fa-solid fa-paper-plane";
  IconClassicSolid2["PaperPlaneTop"] = "fa-solid fa-paper-plane-top";
  IconClassicSolid2["Paste"] = "fa-solid fa-paste";
  IconClassicSolid2["Pause"] = "fa-solid fa-pause";
  IconClassicSolid2["Pencil"] = "fa-solid fa-pencil";
  IconClassicSolid2["Pen"] = "fa-solid fa-pen";
  IconClassicSolid2["PenToSquare"] = "fa-solid fa-pen-to-square";
  IconClassicSolid2["PeopleArrowsLeftRight"] = "fa-solid fa-people-arrows-left-right";
  IconClassicSolid2["Percentage"] = "fa-solid fa-percentage";
  IconClassicSolid2["Period"] = "fa-solid fa-period";
  IconClassicSolid2["PersonChalkboard"] = "fa-solid fa-person-chalkboard";
  IconClassicSolid2["PersonMilitaryRifle"] = "fa-solid fa-person-military-rifle";
  IconClassicSolid2["Phone"] = "fa-solid fa-phone";
  IconClassicSolid2["Play"] = "fa-solid fa-play";
  IconClassicSolid2["PlayPause"] = "fa-solid fa-play-pause";
  IconClassicSolid2["Plus"] = "fa-solid fa-plus";
  IconClassicSolid2["Print"] = "fa-solid fa-print";
  IconClassicSolid2["Pumo"] = "fa-solid fa-font-awesome";
  IconClassicSolid2["Question"] = "fa-solid fa-question";
  IconClassicSolid2["Redo"] = "fa-solid fa-redo";
  IconClassicSolid2["RedoAlt"] = "fa-solid fa-redo-alt";
  IconClassicSolid2["Refresh"] = "fa-solid fa-arrows-rotate";
  IconClassicSolid2["Remove"] = "fa-solid fa-xmark";
  IconClassicSolid2["Repeat"] = "fa-solid fa-repeat";
  IconClassicSolid2["Reply"] = "fa-solid fa-reply";
  IconClassicSolid2["ReplyAll"] = "fa-solid fa-reply-all";
  IconClassicSolid2["RightFromBracket"] = "fa-solid fa-right-from-bracket";
  IconClassicSolid2["RightToBracket"] = "fa-solid fa-right-to-bracket";
  IconClassicSolid2["Rotate"] = "fa-solid fa-rotate";
  IconClassicSolid2["RotateLeft"] = "fa-solid fa-rotate-left";
  IconClassicSolid2["SackDollar"] = "fa-solid fa-sack-dollar";
  IconClassicSolid2["Save"] = "fa-solid fa-floppy-disk";
  IconClassicSolid2["Scissors"] = "fa-solid fa-scissors";
  IconClassicSolid2["ScrewdriverWrench"] = "fa-solid fa-screwdriver-wrench";
  IconClassicSolid2["Search"] = "fa-solid fa-magnifying-glass";
  IconClassicSolid2["SensorTriangleExclamation"] = "fa-solid fa-sensor-triangle-exclamation";
  IconClassicSolid2["Settings"] = "fa-solid fa-gear";
  IconClassicSolid2["Share"] = "fa-solid fa-share";
  IconClassicSolid2["ShareAll"] = "fa-solid fa-share-all";
  IconClassicSolid2["ShareNodes"] = "fa-solid fa-share-nodes";
  IconClassicSolid2["ShareFromSquare"] = "fa-solid fa-share-from-square";
  IconClassicSolid2["ShieldCheck"] = "fa-solid fa-shield-check";
  IconClassicSolid2["Ship"] = "fa-solid fa-ship";
  IconClassicSolid2["Sitemap"] = "fa-solid fa-sitemap";
  IconClassicSolid2["Soccer"] = "fa-solid fa-futbol";
  IconClassicSolid2["Sort"] = "fa-solid fa-sort";
  IconClassicSolid2["SortDown"] = "fa-solid fa-sort-down";
  IconClassicSolid2["SortUp"] = "fa-solid fa-sort-up";
  IconClassicSolid2["Spinner"] = "fa-solid fa-spinner";
  IconClassicSolid2["Split"] = "fa-solid fa-split";
  IconClassicSolid2["SquareCheck"] = "fa-solid fa-square-check";
  IconClassicSolid2["SquareMinus"] = "fa-solid fa-square-minus";
  IconClassicSolid2["SquarePen"] = "fa-solid fa-square-pen";
  IconClassicSolid2["Star"] = "fa-solid fa-star";
  IconClassicSolid2["StepBackward"] = "fa-solid fa-step-backward";
  IconClassicSolid2["StepForward"] = "fa-solid fa-step-forward";
  IconClassicSolid2["Stethoscope"] = "fa-solid fa-stethoscope";
  IconClassicSolid2["Stop"] = "fa-solid fa-stop";
  IconClassicSolid2["Table"] = "fa-solid fa-table";
  IconClassicSolid2["TableRows"] = "fa-solid fa-table-rows";
  IconClassicSolid2["Tablet"] = "fa-solid fa-tablet";
  IconClassicSolid2["Tag"] = "fa-solid fa-tag";
  IconClassicSolid2["Tags"] = "fa-solid fa-tags";
  IconClassicSolid2["Tasks"] = "fa-solid fa-tasks";
  IconClassicSolid2["ThumbsDown"] = "fa-solid fa-thumbs-down";
  IconClassicSolid2["ThumbsUp"] = "fa-solid fa-thumbs-up";
  IconClassicSolid2["Thumbtack"] = "fa-solid fa-thumbtack";
  IconClassicSolid2["Trash"] = "fa-solid fa-trash";
  IconClassicSolid2["TrashCanList"] = "fa-solid fa-trash-can-list";
  IconClassicSolid2["TrashUndo"] = "fa-solid fa-trash-undo";
  IconClassicSolid2["TrashXmark"] = "fa-solid fa-trash-xmark";
  IconClassicSolid2["TriangleExclamation"] = "fa-solid fa-triangle-exclamation";
  IconClassicSolid2["Truck"] = "fa-solid fa-truck";
  IconClassicSolid2["Undo"] = "fa-solid fa-arrow-rotate-left";
  IconClassicSolid2["Unlock"] = "fa-solid fa-unlock";
  IconClassicSolid2["Upload"] = "fa-solid fa-upload";
  IconClassicSolid2["UsbDrive"] = "fa-solid fa-usb-drive";
  IconClassicSolid2["User"] = "fa-solid fa-user";
  IconClassicSolid2["UserCheck"] = "fa-solid fa-user-check";
  IconClassicSolid2["UserClock"] = "fa-solid fa-user-clock";
  IconClassicSolid2["UserDoctor"] = "fa-solid fa-user-doctor";
  IconClassicSolid2["UserDoctorHair"] = "fa-solid fa-user-doctor-hair";
  IconClassicSolid2["UserDoctorHairLong"] = "fa-solid fa-user-doctor-hair-long";
  IconClassicSolid2["UserGear"] = "fa-solid fa-user-gear";
  IconClassicSolid2["UserGroup"] = "fa-solid fa-user-group";
  IconClassicSolid2["UserHair"] = "fa-solid fa-user-hair";
  IconClassicSolid2["UserHairLong"] = "fa-solid fa-user-hair-long";
  IconClassicSolid2["UserHeadset"] = "fa-solid fa-user-headset";
  IconClassicSolid2["Users"] = "fa-solid fa-users";
  IconClassicSolid2["UserSecret"] = "fa-solid fa-user-secret";
  IconClassicSolid2["UsersMedical"] = "fa-solid fa-users-medical";
  IconClassicSolid2["UserTag"] = "fa-solid fa-user-tag";
  IconClassicSolid2["UserXmark"] = "fa-solid fa-user-xmark";
  IconClassicSolid2["Video"] = "fa-solid fa-video";
  IconClassicSolid2["VideoSlash"] = "fa-solid fa-video-slash";
  IconClassicSolid2["Volume"] = "fa-solid fa-volume";
  IconClassicSolid2["VolumeHigh"] = "fa-solid fa-volume-high";
  IconClassicSolid2["VolumeLow"] = "fa-solid fa-volume-low";
  IconClassicSolid2["VolumeOff"] = "fa-solid fa-volume-off";
  IconClassicSolid2["VolumeSlash"] = "fa-solid fa-volume-slash";
  IconClassicSolid2["VolumeXmark"] = "fa-solid fa-volume-xmark";
  IconClassicSolid2["Wifi"] = "fa-solid fa-wifi";
  IconClassicSolid2["WifiExclamation"] = "fa-solid fa-wifi-exclamation";
  IconClassicSolid2["WifiFair"] = "fa-solid fa-wifi-fair";
  IconClassicSolid2["WifiSlash"] = "fa-solid fa-wifi-slash";
  IconClassicSolid2["Window"] = "fa-solid fa-window";
  IconClassicSolid2["Xmark"] = "fa-solid fa-xmark";
  return IconClassicSolid2;
})(IconClassicSolid || {});
var IconClassicLight = /* @__PURE__ */ ((IconClassicLight2) => {
  IconClassicLight2["Add"] = "fa-light fa-plus";
  IconClassicLight2["AddressCard"] = "fa-light fa-address-card";
  IconClassicLight2["Alert"] = "fa-light fa-triangle-exclamation";
  IconClassicLight2["AngleDown"] = "fa-light fa-angle-down";
  IconClassicLight2["AngleLeft"] = "fa-light fa-angle-left";
  IconClassicLight2["AngleRight"] = "fa-light fa-angle-right";
  IconClassicLight2["AngleUp"] = "fa-light fa-angle-up";
  IconClassicLight2["Aperture"] = "fa-light fa-aperture";
  IconClassicLight2["ArrowDown"] = "fa-light fa-arrow-down";
  IconClassicLight2["ArrowDownShortWide"] = "fa-light fa-arrow-down-short-wide";
  IconClassicLight2["ArrowDownWideShort"] = "fa-light fa-arrow-down-wide-short";
  IconClassicLight2["ArrowLeft"] = "fa-light fa-arrow-left";
  IconClassicLight2["ArrowPointer"] = "fa-light fa-arrow-pointer";
  IconClassicLight2["ArrowRight"] = "fa-light fa-arrow-right";
  IconClassicLight2["ArrowRightToBracket"] = "fa-light fa-arrow-right-to-bracket";
  IconClassicLight2["ArrowRightFromBracket"] = "fa-light fa-arrow-right-from-bracket";
  IconClassicLight2["ArrowRotateRight"] = "fa-light fa-arrow-rotate-right";
  IconClassicLight2["ArrowsRepeat"] = "fa-light fa-arrows-repeat";
  IconClassicLight2["ArrowsRotate"] = "fa-light fa-arrows-rotate";
  IconClassicLight2["ArrowsSpin"] = "fa-light fa-arrows-spin";
  IconClassicLight2["ArrowUp"] = "fa-light fa-arrow-up";
  IconClassicLight2["Asterisk"] = "fa-light fa-asterisk";
  IconClassicLight2["At"] = "fa-light fa-at";
  IconClassicLight2["Attachment"] = "fa-light fa-paperclip";
  IconClassicLight2["Back"] = "fa-light fa-angle-left";
  IconClassicLight2["Backward"] = "fa-light fa-backward";
  IconClassicLight2["BackwardFast"] = "fa-light fa-backward-fast";
  IconClassicLight2["BackwardStep"] = "fa-light fa-backward-step";
  IconClassicLight2["BalanceScale"] = "fa-light fa-balance-scale";
  IconClassicLight2["BallotCheck"] = "fa-light fa-ballot-check";
  IconClassicLight2["Ban"] = "fa-light fa-ban";
  IconClassicLight2["Barcode"] = "fa-light fa-barcode";
  IconClassicLight2["BarcodeScan"] = "fa-light fa-barcode-scan";
  IconClassicLight2["Bars"] = "fa-light fa-bars";
  IconClassicLight2["BarsSort"] = "fa-light fa-bars-sort";
  IconClassicLight2["BedEmpty"] = "fa-light fa-bed-empty";
  IconClassicLight2["Bell"] = "fa-light fa-bell";
  IconClassicLight2["BellSlash"] = "fa-light fa-bell-slash";
  IconClassicLight2["BlockQuote"] = "fa-light fa-block-quote";
  IconClassicLight2["Bolt"] = "fa-light fa-bolt";
  IconClassicLight2["Bomb"] = "fa-light fa-bomb";
  IconClassicLight2["Book"] = "fa-light fa-book";
  IconClassicLight2["BookOpen"] = "fa-light fa-book-open";
  IconClassicLight2["Box"] = "fa-light fa-box";
  IconClassicLight2["BoxArchive"] = "fa-light fa-box-archive";
  IconClassicLight2["BriefCase"] = "fa-light fa-brief-case";
  IconClassicLight2["Bug"] = "fa-light fa-bug";
  IconClassicLight2["Burger"] = "fa-light fa-bars";
  IconClassicLight2["CakeCandles"] = "fa-light fa-cake-candles";
  IconClassicLight2["Calendar"] = "fa-light fa-calendar";
  IconClassicLight2["CalendarAlt"] = "fa-light fa-calendar-alt";
  IconClassicLight2["CalendarCheck"] = "fa-light fa-calendar-check";
  IconClassicLight2["CalendarDay"] = "fa-light fa-calendar-day";
  IconClassicLight2["CalendarLinesPen"] = "fa-light fa-calendar-lines-pen";
  IconClassicLight2["CalendarPlus"] = "fa-light fa-calendar-plus";
  IconClassicLight2["Camera"] = "fa-light fa-camera";
  IconClassicLight2["CameraAlt"] = "fa-light fa-camera-alt";
  IconClassicLight2["CameraWeb"] = "fa-light fa-camera-web";
  IconClassicLight2["CameraWebSlash"] = "fa-light fa-camera-web-slash";
  IconClassicLight2["Capsules"] = "fa-light fa-capsules";
  IconClassicLight2["CaretDown"] = "fa-light fa-caret-down";
  IconClassicLight2["CaretLeft"] = "fa-light fa-caret-left";
  IconClassicLight2["CaretRight"] = "fa-light fa-caret-right";
  IconClassicLight2["CaretUp"] = "fa-light fa-caret-up";
  IconClassicLight2["CartCirclePlus"] = "fa-light fa-cart-circle-plus";
  IconClassicLight2["CartShopping"] = "fa-light fa-cart-shopping";
  IconClassicLight2["ChartArea"] = "fa-light fa-chart-area";
  IconClassicLight2["ChartBar"] = "fa-light fa-chart-bar";
  IconClassicLight2["ChartColumn"] = "fa-light fa-chart-column";
  IconClassicLight2["ChartLine"] = "fa-light fa-chart-line";
  IconClassicLight2["ChartPie"] = "fa-light fa-chart-pie";
  IconClassicLight2["ChartSimple"] = "fa-light fa-chart-simple";
  IconClassicLight2["Chat"] = "fa-light fa-comment";
  IconClassicLight2["Check"] = "fa-light fa-check";
  IconClassicLight2["ChevronDown"] = "fa-light fa-chevron-down";
  IconClassicLight2["ChevronLeft"] = "fa-light fa-chevron-left";
  IconClassicLight2["ChevronRight"] = "fa-light fa-chevron-right";
  IconClassicLight2["ChevronUp"] = "fa-light fa-chevron-up";
  IconClassicLight2["Circle"] = "fa-light fa-circle";
  IconClassicLight2["CircleCheck"] = "fa-light fa-circle-check";
  IconClassicLight2["CircleExclamation"] = "fa-light fa-circle-exclamation";
  IconClassicLight2["CircleInfo"] = "fa-light fa-circle-info";
  IconClassicLight2["CircleSmall"] = "fa-light fa-circle-small";
  IconClassicLight2["CircleStop"] = "fa-light fa-circle-stop";
  IconClassicLight2["Clipboard"] = "fa-light fa-clipboard";
  IconClassicLight2["ClipboardMedical"] = "fa-light fa-clipboard-medical";
  IconClassicLight2["Clock"] = "fa-light fa-clock";
  IconClassicLight2["ClockRotateLeft"] = "fa-light fa-clock-rotate-left";
  IconClassicLight2["Close"] = "fa-light fa-xmark";
  IconClassicLight2["Cloud"] = "fa-light fa-cloud";
  IconClassicLight2["CloudArrowUp"] = "fa-light fa-cloud-arrow-up";
  IconClassicLight2["CloudDownload"] = "fa-light fa-cloud-download";
  IconClassicLight2["Code"] = "fa-light fa-code";
  IconClassicLight2["CodeMerge"] = "fa-light fa-code-merge";
  IconClassicLight2["Coins"] = "fa-light fa-coins";
  IconClassicLight2["Collapse"] = "fa-light fa-compress";
  IconClassicLight2["Comment"] = "fa-light fa-comment";
  IconClassicLight2["CommentDots"] = "fa-light fa-comment-dots";
  IconClassicLight2["CommentLines"] = "fa-light fa-comment-lines";
  IconClassicLight2["Comments"] = "fa-light fa-comments";
  IconClassicLight2["CommentSms"] = "fa-light fa-comment-sms";
  IconClassicLight2["Compress"] = "fa-light fa-compress";
  IconClassicLight2["Copy"] = "fa-light fa-copy";
  IconClassicLight2["Copyright"] = "fa-light fa-copyright";
  IconClassicLight2["CreditCard"] = "fa-light fa-credit-card";
  IconClassicLight2["Crown"] = "fa-light fa-crown";
  IconClassicLight2["Database"] = "fa-light fa-database";
  IconClassicLight2["Delete"] = "fa-light fa-xmark";
  IconClassicLight2["DeleteLeft"] = "fa-light fa-delete-left";
  IconClassicLight2["DeleteRight"] = "fa-light fa-delete-right";
  IconClassicLight2["Desktop"] = "fa-light fa-desktop";
  IconClassicLight2["Download"] = "fa-light fa-download";
  IconClassicLight2["Edit"] = "fa-light fa-pen";
  IconClassicLight2["Eject"] = "fa-light fa-eject";
  IconClassicLight2["Ellipsis"] = "fa-light fa-ellipsis";
  IconClassicLight2["EllipsisVertical"] = "fa-light fa-ellipsis-vertical";
  IconClassicLight2["Envelope"] = "fa-light fa-envelope";
  IconClassicLight2["Eraser"] = "fa-light fa-eraser";
  IconClassicLight2["EuroSign"] = "fa-light fa-euro-sign";
  IconClassicLight2["Exclamation"] = "fa-light fa-exclamation";
  IconClassicLight2["Expand"] = "fa-light fa-expand";
  IconClassicLight2["Eye"] = "fa-light fa-eye";
  IconClassicLight2["EyeSlash"] = "fa-light fa-eye-slash";
  IconClassicLight2["Family"] = "fa-light fa-family";
  IconClassicLight2["FastBackward"] = "fa-light fa-fast-backward";
  IconClassicLight2["FastForward"] = "fa-light fa-fast-forward";
  IconClassicLight2["File"] = "fa-light fa-file";
  IconClassicLight2["FileAudio"] = "fa-light fa-file-audio";
  IconClassicLight2["FileContract"] = "fa-light fa-file-contract";
  IconClassicLight2["FileDownload"] = "fa-light fa-file-download";
  IconClassicLight2["FileExcel"] = "fa-light fa-file-excel";
  IconClassicLight2["FileExport"] = "fa-light fa-file-export";
  IconClassicLight2["FileImage"] = "fa-light fa-file-image";
  IconClassicLight2["FileInvoice"] = "fa-light fa-file-invoice";
  IconClassicLight2["FileImport"] = "fa-light fa-file-import";
  IconClassicLight2["FileLines"] = "fa-light fa-file-lines";
  IconClassicLight2["FileMusic"] = "fa-light fa-file-music";
  IconClassicLight2["FilePdf"] = "fa-light fa-file-pdf";
  IconClassicLight2["Files"] = "fa-light fa-file-files";
  IconClassicLight2["FileSignature"] = "fa-light fa-file-signature";
  IconClassicLight2["FileVideo"] = "fa-light fa-file-video";
  IconClassicLight2["FileWord"] = "fa-light fa-file-word";
  IconClassicLight2["FileZipper"] = "fa-light fa-file-zipper";
  IconClassicLight2["Filter"] = "fa-light fa-filter";
  IconClassicLight2["Flag"] = "fa-light fa-flag";
  IconClassicLight2["FlagSwallowTail"] = "fa-light fa-flag-swallowtail";
  IconClassicLight2["FloppyDisk"] = "fa-light fa-floppy-disk";
  IconClassicLight2["Folder"] = "fa-light fa-folder";
  IconClassicLight2["FolderOpen"] = "fa-light fa-folder-open";
  IconClassicLight2["FontAwesome"] = "fa-light  fa-font-awesome";
  IconClassicLight2["Forward"] = "fa-light fa-forward";
  IconClassicLight2["ForwardStep"] = "fa-light fa-forward-step";
  IconClassicLight2["ForwardFast"] = "fa-light fa-forward-fast";
  IconClassicLight2["Futbol"] = "fa-light fa-futbol";
  IconClassicLight2["Gear"] = "fa-light fa-gear";
  IconClassicLight2["Gears"] = "fa-light fa-gears";
  IconClassicLight2["Globe"] = "fa-light fa-globe";
  IconClassicLight2["Hashtag"] = "fa-light fa-hashtag";
  IconClassicLight2["HatWizard"] = "fa-light fa-hat-wizard";
  IconClassicLight2["Headset"] = "fa-light fa-headset";
  IconClassicLight2["Hospital"] = "fa-light fa-hospital";
  IconClassicLight2["Hourglass"] = "fa-light fa-hourglass";
  IconClassicLight2["HourglassClock"] = "fa-light fa-hourglass-clock";
  IconClassicLight2["House"] = "fa-light fa-house";
  IconClassicLight2["HouseMedical"] = "fa-light fa-house-medical";
  IconClassicLight2["HouseUser"] = "fa-light fa-house-user";
  IconClassicLight2["Image"] = "fa-light fa-image";
  IconClassicLight2["Inbox"] = "fa-light fa-inbox";
  IconClassicLight2["InboxFull"] = "fa-light fa-inbox-full";
  IconClassicLight2["Info"] = "fa-light fa-info";
  IconClassicLight2["Key"] = "fa-light fa-key";
  IconClassicLight2["Keyboard"] = "fa-light fa-keyboard";
  IconClassicLight2["KeySkeleton"] = "fa-light fa-key-skeleton";
  IconClassicLight2["Laptop"] = "fa-light fa-laptop";
  IconClassicLight2["LaptopMedical"] = "fa-light fa-laptop-medical";
  IconClassicLight2["LevelDown"] = "fa-light fa-level-down";
  IconClassicLight2["LevelDownAlt"] = "fa-light fa-level-down-alt";
  IconClassicLight2["LevelLeft"] = "fa-light fa-level-left";
  IconClassicLight2["LevelLeftAlt"] = "fa-light fa-level-left-alt";
  IconClassicLight2["LevelRight"] = "fa-light fa-level-right";
  IconClassicLight2["LevelRightAlt"] = "fa-light fa-level-right-alt";
  IconClassicLight2["LevelUp"] = "fa-light fa-level-up";
  IconClassicLight2["LevelUpAlt"] = "fa-light fa-level-up-alt";
  IconClassicLight2["LineColumns"] = "fa-light fa-line-columns";
  IconClassicLight2["Link"] = "fa-light fa-link";
  IconClassicLight2["LinkExternal"] = "fa-light fa-arrow-up-right-from-square";
  IconClassicLight2["LinkHorizontal"] = "fa-light fa-link-horizontal";
  IconClassicLight2["LinkHorizontalSlash"] = "fa-light fa-link-horizontal-slash";
  IconClassicLight2["LinkSimple"] = "fa-light fa-link-simple";
  IconClassicLight2["LinkSimpleSlash"] = "fa-light fa-link-simple-slash";
  IconClassicLight2["LinkSlash"] = "fa-light fa-link-slash";
  IconClassicLight2["List"] = "fa-light fa-list";
  IconClassicLight2["ListCheck"] = "fa-light fa-list-check";
  IconClassicLight2["ListOl"] = "fa-light fa-list-ol";
  IconClassicLight2["ListTree"] = "fa-light fa-list-tree";
  IconClassicLight2["ListUl"] = "fa-light fa-list-ul";
  IconClassicLight2["LocationArrow"] = "fa-light fa-location-arrow";
  IconClassicLight2["LocationCrossHairs"] = "fa-light fa-location-crosshairs";
  IconClassicLight2["LocationCheck"] = "fa-light fa-location-check";
  IconClassicLight2["LocationDot"] = "fa-light fa-location-dot";
  IconClassicLight2["Lock"] = "fa-light fa-lock";
  IconClassicLight2["LockOpen"] = "fa-light fa-lock-open";
  IconClassicLight2["Login"] = "fa-light fa-arrow-right-to-bracket";
  IconClassicLight2["Logout"] = "fa-light fa-arrow-right-from-bracket";
  IconClassicLight2["MagnifyingGlass"] = "fa-light fa-magnifying-glass";
  IconClassicLight2["MagnifyingGlassMinus"] = "fa-light fa-magnifying-glass-minus";
  IconClassicLight2["MagnifyingGlassPlus"] = "fa-light fa-magnifying-glass-plus";
  IconClassicLight2["Mail"] = "fa-light fa-envelope";
  IconClassicLight2["Mailbox"] = "fa-light fa-mailbox";
  IconClassicLight2["MailOpen"] = "fa-light fa-envelope-open";
  IconClassicLight2["Map"] = "fa-light fa-map";
  IconClassicLight2["MapLocation"] = "fa-light fa-map-location";
  IconClassicLight2["MapLocationDot"] = "fa-light fa-map-location-dot";
  IconClassicLight2["MapPin"] = "fa-light fa-map-pin";
  IconClassicLight2["Maximize"] = "fa-light fa-maximize";
  IconClassicLight2["Merge"] = "fa-light fa-merge";
  IconClassicLight2["Message"] = "fa-light fa-message";
  IconClassicLight2["MessageCode"] = "fa-light fa-message-code";
  IconClassicLight2["MessageDots"] = "fa-light fa-message-dots";
  IconClassicLight2["MessageLines"] = "fa-light fa-message-lines";
  IconClassicLight2["Messages"] = "fa-light fa-messages";
  IconClassicLight2["Microphone"] = "fa-light fa-microphone";
  IconClassicLight2["MicrophoneLines"] = "fa-light fa-microphone-lines";
  IconClassicLight2["MicrophoneLinesSlash"] = "fa-light fa-microphone-lines-slash";
  IconClassicLight2["MicrophoneSlash"] = "fa-light fa-microphone-slash";
  IconClassicLight2["Microscope"] = "fa-light fa-microscope";
  IconClassicLight2["Minimize"] = "fa-light fa-minimize";
  IconClassicLight2["Minus"] = "fa-light fa-minus";
  IconClassicLight2["Mobile"] = "fa-light fa-mobile";
  IconClassicLight2["MobileNotch"] = "fa-light fa-mobile-notch";
  IconClassicLight2["MoneyCheckDollarPen"] = "fa-light fa-money-check-dollar-pen";
  IconClassicLight2["Music"] = "fa-light fa-music";
  IconClassicLight2["MusicSlash"] = "fa-light fa-music-slash";
  IconClassicLight2["NewsPaper"] = "fa-light fa-newspaper";
  IconClassicLight2["Palette"] = "fa-light fa-palette";
  IconClassicLight2["PaperClip"] = "fa-light fa-paperclip";
  IconClassicLight2["PaperClipVertical"] = "fa-light fa-paperclip-vertical";
  IconClassicLight2["PaperPlane"] = "fa-light fa-paper-plane";
  IconClassicLight2["PaperPlaneTop"] = "fa-light fa-paper-plane-top";
  IconClassicLight2["Paste"] = "fa-light fa-paste";
  IconClassicLight2["Pause"] = "fa-light fa-pause";
  IconClassicLight2["Pen"] = "fa-light fa-pen";
  IconClassicLight2["Pencil"] = "fa-light fa-pencil";
  IconClassicLight2["PenToSquare"] = "fa-light fa-pen-to-square";
  IconClassicLight2["PeopleArrowsLeftRight"] = "fa-light fa-people-arrows-left-right";
  IconClassicLight2["Percentage"] = "fa-light fa-percentage";
  IconClassicLight2["Period"] = "fa-light fa-period";
  IconClassicLight2["PersonChalkboard"] = "fa-light fa-person-chalkboard";
  IconClassicLight2["PersonMilitaryRifle"] = "fa-light fa-person-military-rifle";
  IconClassicLight2["Phone"] = "fa-light fa-phone";
  IconClassicLight2["Play"] = "fa-light fa-play";
  IconClassicLight2["PlayPause"] = "fa-light fa-play-pause";
  IconClassicLight2["Plus"] = "fa-light fa-plus";
  IconClassicLight2["PowerOff"] = "fa-light fa-power-off";
  IconClassicLight2["Print"] = "fa-light fa-print";
  IconClassicLight2["Pumo"] = "fa-light fa-font-awesome";
  IconClassicLight2["Question"] = "fa-light fa-question";
  IconClassicLight2["Receipt"] = "fa-light fa-receipt";
  IconClassicLight2["Redo"] = "fa-light fa-redo";
  IconClassicLight2["RedoAlt"] = "fa-light fa-redo-alt";
  IconClassicLight2["Refresh"] = "fa-light fa-arrows-rotate";
  IconClassicLight2["Remove"] = "fa-light fa-xmark";
  IconClassicLight2["Repeat"] = "fa-light fa-repeat";
  IconClassicLight2["Reply"] = "fa-light fa-reply";
  IconClassicLight2["ReplyAll"] = "fa-light fa-reply-all";
  IconClassicLight2["RightFromBracket"] = "fa-light fa-right-from-bracket";
  IconClassicLight2["RightToBracket"] = "fa-light fa-right-to-bracket";
  IconClassicLight2["Rotate"] = "fa-light fa-rotate";
  IconClassicLight2["RotateLeft"] = "fa-light fa-rotate-left";
  IconClassicLight2["SackDollar"] = "fa-light fa-sack-dollar";
  IconClassicLight2["Save"] = "fa-light fa-floppy-disk";
  IconClassicLight2["Scissors"] = "fa-light fa-scissors";
  IconClassicLight2["ScrewdriverWrench"] = "fa-light fa-screwdriver-wrench";
  IconClassicLight2["Search"] = "fa-light fa-magnifying-glass";
  IconClassicLight2["SensorTriangleExclamation"] = "fa-light fa-sensor-triangle-exclamation";
  IconClassicLight2["Settings"] = "fa-light fa-gear";
  IconClassicLight2["Share"] = "fa-light fa-share";
  IconClassicLight2["ShareAll"] = "fa-light fa-share-all";
  IconClassicLight2["ShareNodes"] = "fa-light fa-share-nodes";
  IconClassicLight2["ShareFromSquare"] = "fa-light fa-share-from-square";
  IconClassicLight2["ShieldCheck"] = "fa-light fa-shield-check";
  IconClassicLight2["Ship"] = "fa-light fa-ship";
  IconClassicLight2["Sitemap"] = "fa-light fa-sitemap";
  IconClassicLight2["Soccer"] = "fa-light fa-futbol";
  IconClassicLight2["Sort"] = "fa-light fa-sort";
  IconClassicLight2["SortDown"] = "fa-light fa-sort-down";
  IconClassicLight2["SortUp"] = "fa-light fa-sort-up";
  IconClassicLight2["Spinner"] = "fa-light fa-spinner";
  IconClassicLight2["Split"] = "fa-light fa-split";
  IconClassicLight2["SquareCheck"] = "fa-light fa-square-check";
  IconClassicLight2["SquareMinus"] = "fa-light fa-square-minus";
  IconClassicLight2["SquarePen"] = "fa-light fa-square-pen";
  IconClassicLight2["SquareQuote"] = "fa-light fa-square-quote";
  IconClassicLight2["Stamp"] = "fa-light fa-stamp";
  IconClassicLight2["Star"] = "fa-light fa-star";
  IconClassicLight2["StepBackward"] = "fa-light fa-step-backward";
  IconClassicLight2["StepForward"] = "fa-light fa-step-forward";
  IconClassicLight2["Stethoscope"] = "fa-light fa-stethoscope";
  IconClassicLight2["Stop"] = "fa-light fa-stop";
  IconClassicLight2["Table"] = "fa-light fa-table";
  IconClassicLight2["TableRows"] = "fa-light fa-table-rows";
  IconClassicLight2["Tablet"] = "fa-light fa-tablet";
  IconClassicLight2["Tag"] = "fa-light fa-tag";
  IconClassicLight2["Tags"] = "fa-light fa-tags";
  IconClassicLight2["Tasks"] = "fa-light fa-tasks";
  IconClassicLight2["ThumbsDown"] = "fa-light fa-thumbs-down";
  IconClassicLight2["ThumbsUp"] = "fa-light fa-thumbs-up";
  IconClassicLight2["Thumbtack"] = "fa-light fa-thumbtack";
  IconClassicLight2["Timer"] = "fa-light fa-timer";
  IconClassicLight2["Trash"] = "fa-light fa-trash";
  IconClassicLight2["TrashCanList"] = "fa-light fa-trash-can-list";
  IconClassicLight2["TrashUndo"] = "fa-light fa-trash-undo";
  IconClassicLight2["TrashXmark"] = "fa-light fa-trash-xmark";
  IconClassicLight2["TriangleExclamation"] = "fa-light fa-triangle-exclamation";
  IconClassicLight2["Truck"] = "fa-light fa-truck";
  IconClassicLight2["Undo"] = "fa-light fa-arrow-rotate-left";
  IconClassicLight2["Unlock"] = "fa-light fa-unlock";
  IconClassicLight2["Upload"] = "fa-light fa-upload";
  IconClassicLight2["UsbDrive"] = "fa-light fa-usb-drive";
  IconClassicLight2["User"] = "fa-light fa-user";
  IconClassicLight2["UserCheck"] = "fa-light fa-user-check";
  IconClassicLight2["UserClock"] = "fa-light fa-user-clock";
  IconClassicLight2["UserDoctor"] = "fa-light fa-user-doctor";
  IconClassicLight2["UserDoctorHair"] = "fa-light fa-user-doctor-hair";
  IconClassicLight2["UserDoctorHairLong"] = "fa-light fa-user-doctor-hair-long";
  IconClassicLight2["UserGear"] = "fa-light fa-user-gear";
  IconClassicLight2["UserGroup"] = "fa-light fa-user-group";
  IconClassicLight2["UserHair"] = "fa-light fa-user-hair";
  IconClassicLight2["UserHairLong"] = "fa-light fa-user-hair-long";
  IconClassicLight2["UserHeadset"] = "fa-light fa-user-headset";
  IconClassicLight2["UserPen"] = "fa-light fa-user-pen";
  IconClassicLight2["Users"] = "fa-light fa-users";
  IconClassicLight2["UserSecret"] = "fa-light fa-user-secret";
  IconClassicLight2["UsersMedical"] = "fa-light fa-users-medical";
  IconClassicLight2["UserTag"] = "fa-light fa-user-tag";
  IconClassicLight2["UserXmark"] = "fa-light fa-user-xmark";
  IconClassicLight2["Video"] = "fa-light fa-video";
  IconClassicLight2["VideoSlash"] = "fa-light fa-video-slash";
  IconClassicLight2["Volume"] = "fa-light fa-volume";
  IconClassicLight2["VolumeHigh"] = "fa-light fa-volume-high";
  IconClassicLight2["VolumeLow"] = "fa-light fa-volume-low";
  IconClassicLight2["VolumeOff"] = "fa-light fa-volume-off";
  IconClassicLight2["VolumeSlash"] = "fa-light fa-volume-slash";
  IconClassicLight2["VolumeXmark"] = "fa-light fa-volume-xmark";
  IconClassicLight2["Wifi"] = "fa-light fa-wifi";
  IconClassicLight2["WifiExclamation"] = "fa-light fa-wifi-exclamation";
  IconClassicLight2["WifiFair"] = "fa-light fa-wifi-fair";
  IconClassicLight2["WifiSlash"] = "fa-light fa-wifi-slash";
  IconClassicLight2["Window"] = "fa-light fa-window";
  IconClassicLight2["Xmark"] = "fa-light fa-xmark";
  return IconClassicLight2;
})(IconClassicLight || {});
var IconClassicRegular = /* @__PURE__ */ ((IconClassicRegular2) => {
  IconClassicRegular2["Add"] = "fa-regular fa-plus";
  IconClassicRegular2["AddressCard"] = "fa-regular fa-address-card";
  IconClassicRegular2["Alert"] = "fa-regular fa-triangle-exclamation";
  IconClassicRegular2["AngleDown"] = "fa-regular fa-angle-down";
  IconClassicRegular2["AngleLeft"] = "fa-regular fa-angle-left";
  IconClassicRegular2["AngleRight"] = "fa-regular fa-angle-right";
  IconClassicRegular2["AngleUp"] = "fa-regular fa-angle-up";
  IconClassicRegular2["Aperture"] = "fa-regular fa-aperture";
  IconClassicRegular2["ArrowDown"] = "fa-regular fa-arrow-down";
  IconClassicRegular2["ArrowDownShortWide"] = "fa-regular fa-arrow-down-short-wide";
  IconClassicRegular2["ArrowDownWideShort"] = "fa-regular fa-arrow-down-wide-short";
  IconClassicRegular2["ArrowLeft"] = "fa-regular fa-arrow-left";
  IconClassicRegular2["ArrowPointer"] = "fa-regular fa-arrow-pointer";
  IconClassicRegular2["ArrowRight"] = "fa-regular fa-arrow-right";
  IconClassicRegular2["ArrowRightToBracket"] = "fa-regular fa-arrow-right-to-bracket";
  IconClassicRegular2["ArrowRightFromBracket"] = "fa-regular fa-arrow-right-from-bracket";
  IconClassicRegular2["ArrowRotateRight"] = "fa-regular fa-arrow-rotate-right";
  IconClassicRegular2["ArrowsRepeat"] = "fa-regular fa-arrows-repeat";
  IconClassicRegular2["ArrowsRotate"] = "fa-regular fa-arrows-rotate";
  IconClassicRegular2["ArrowUp"] = "fa-regular fa-arrow-up";
  IconClassicRegular2["Asterisk"] = "fa-regular fa-asterisk";
  IconClassicRegular2["At"] = "fa-regular fa-at";
  IconClassicRegular2["Attachment"] = "fa-regular fa-paperclip";
  IconClassicRegular2["Back"] = "fa-regular fa-angle-left";
  IconClassicRegular2["Backward"] = "fa-regular fa-backward";
  IconClassicRegular2["BackwardFast"] = "fa-regular fa-backward-fast";
  IconClassicRegular2["BackwardStep"] = "fa-regular fa-backward-step";
  IconClassicRegular2["BalanceScale"] = "fa-regular fa-balance-scale";
  IconClassicRegular2["BallotCheck"] = "fa-regular fa-ballot-check";
  IconClassicRegular2["Ban"] = "fa-regular fa-ban";
  IconClassicRegular2["Barcode"] = "fa-regular fa-barcode";
  IconClassicRegular2["BarcodeScan"] = "fa-regular fa-barcode-scan";
  IconClassicRegular2["Bars"] = "fa-regular fa-bars";
  IconClassicRegular2["BarsSort"] = "fa-regular fa-bars-sort";
  IconClassicRegular2["Bell"] = "fa-regular fa-bell";
  IconClassicRegular2["BellSlash"] = "fa-regular fa-bell-slash";
  IconClassicRegular2["Bolt"] = "fa-regular fa-bolt";
  IconClassicRegular2["Bomb"] = "fa-regular fa-bomb";
  IconClassicRegular2["Book"] = "fa-regular fa-book";
  IconClassicRegular2["BookOpen"] = "fa-regular fa-book-open";
  IconClassicRegular2["Box"] = "fa-regular fa-box";
  IconClassicRegular2["BoxArchive"] = "fa-regular fa-box-archive";
  IconClassicRegular2["BriefCase"] = "fa-regular fa-brief-case";
  IconClassicRegular2["Bug"] = "fa-regular fa-bug";
  IconClassicRegular2["Burger"] = "fa-regular fa-bars";
  IconClassicRegular2["CakeCandles"] = "fa-regular fa-cake-candles";
  IconClassicRegular2["Calendar"] = "fa-regular fa-calendar";
  IconClassicRegular2["CalendarAlt"] = "fa-regular fa-calendar-alt";
  IconClassicRegular2["CalendarCheck"] = "fa-regular fa-calendar-check";
  IconClassicRegular2["CalendarDay"] = "fa-regular fa-calendar-day";
  IconClassicRegular2["CalendarPlus"] = "fa-regular fa-calendar-plus";
  IconClassicRegular2["Camera"] = "fa-regular fa-camera";
  IconClassicRegular2["CameraAlt"] = "fa-regular fa-camera-alt";
  IconClassicRegular2["CameraWeb"] = "fa-regular fa-camera-web";
  IconClassicRegular2["CameraWebSlash"] = "fa-regular fa-camera-web-slash";
  IconClassicRegular2["Capsules"] = "fa-regular fa-capsules";
  IconClassicRegular2["CaretDown"] = "fa-regular fa-caret-down";
  IconClassicRegular2["CaretLeft"] = "fa-regular fa-caret-left";
  IconClassicRegular2["CaretRight"] = "fa-regular fa-caret-right";
  IconClassicRegular2["CaretUp"] = "fa-regular fa-caret-up";
  IconClassicRegular2["CartCirclePlus"] = "fa-regular fa-cart-circle-plus";
  IconClassicRegular2["CartShopping"] = "fa-regular fa-cart-shopping";
  IconClassicRegular2["ChartArea"] = "fa-regular fa-chart-area";
  IconClassicRegular2["ChartBar"] = "fa-regular fa-chart-bar";
  IconClassicRegular2["ChartColumn"] = "fa-regular fa-chart-column";
  IconClassicRegular2["ChartLine"] = "fa-regular fa-chart-line";
  IconClassicRegular2["ChartPie"] = "fa-regular fa-chart-pie";
  IconClassicRegular2["ChartSimple"] = "fa-regular fa-chart-simple";
  IconClassicRegular2["Chat"] = "fa-regular fa-comment";
  IconClassicRegular2["Check"] = "fa-regular fa-check";
  IconClassicRegular2["ChevronDown"] = "fa-regular fa-chevron-down";
  IconClassicRegular2["ChevronLeft"] = "fa-regular fa-chevron-left";
  IconClassicRegular2["ChevronRight"] = "fa-regular fa-chevron-right";
  IconClassicRegular2["ChevronUp"] = "fa-regular fa-chevron-up";
  IconClassicRegular2["Circle"] = "fa-regular fa-circle";
  IconClassicRegular2["CircleCheck"] = "fa-regular fa-circle-check";
  IconClassicRegular2["CircleExclamation"] = "fa-regular fa-circle-exclamation";
  IconClassicRegular2["CircleInfo"] = "fa-regular fa-circle-info";
  IconClassicRegular2["CircleSmall"] = "fa-regular fa-circle-small";
  IconClassicRegular2["CircleStop"] = "fa-regular fa-circle-stop";
  IconClassicRegular2["Clipboard"] = "fa-regular fa-clipboard";
  IconClassicRegular2["ClipboardMedical"] = "fa-regular fa-clipboard-medical";
  IconClassicRegular2["Clock"] = "fa-regular fa-clock";
  IconClassicRegular2["ClockRotateLeft"] = "fa-regular fa-clock-rotate-left";
  IconClassicRegular2["Close"] = "fa-regular fa-xmark";
  IconClassicRegular2["Cloud"] = "fa-regular fa-cloud";
  IconClassicRegular2["CloudArrowUp"] = "fa-regular fa-cloud-arrow-up";
  IconClassicRegular2["CloudDownload"] = "fa-regular fa-cloud-download";
  IconClassicRegular2["Code"] = "fa-regular fa-code";
  IconClassicRegular2["CodeMerge"] = "fa-regular fa-code-merge";
  IconClassicRegular2["Coins"] = "fa-regular fa-coins";
  IconClassicRegular2["Collapse"] = "fa-regular fa-compress";
  IconClassicRegular2["Comment"] = "fa-regular fa-comment";
  IconClassicRegular2["CommentDots"] = "fa-regular fa-comment-dots";
  IconClassicRegular2["CommentLines"] = "fa-regular fa-comment-lines";
  IconClassicRegular2["Comments"] = "fa-regular fa-comments";
  IconClassicRegular2["CommentSms"] = "fa-regular fa-comment-sms";
  IconClassicRegular2["Compress"] = "fa-regular fa-compress";
  IconClassicRegular2["Copy"] = "fa-regular fa-copy";
  IconClassicRegular2["Copyright"] = "fa-regular fa-copyright";
  IconClassicRegular2["CreditCard"] = "fa-regular fa-credit-card";
  IconClassicRegular2["Crown"] = "fa-regular fa-crown";
  IconClassicRegular2["Database"] = "fa-regular fa-database";
  IconClassicRegular2["Delete"] = "fa-regular fa-xmark";
  IconClassicRegular2["DeleteLeft"] = "fa-regular fa-delete-left";
  IconClassicRegular2["DeleteRight"] = "fa-regular fa-delete-right";
  IconClassicRegular2["Desktop"] = "fa-regular fa-desktop";
  IconClassicRegular2["Download"] = "fa-regular fa-download";
  IconClassicRegular2["Edit"] = "fa-regular fa-pen";
  IconClassicRegular2["Eject"] = "fa-regular fa-eject";
  IconClassicRegular2["Ellipsis"] = "fa-regular fa-ellipsis";
  IconClassicRegular2["EllipsisVertical"] = "fa-regular fa-ellipsis-vertical";
  IconClassicRegular2["Envelope"] = "fa-regular fa-envelope";
  IconClassicRegular2["Eraser"] = "fa-regular fa-eraser";
  IconClassicRegular2["EuroSign"] = "fa-regular fa-euro-sign";
  IconClassicRegular2["Exclamation"] = "fa-regular fa-exclamation";
  IconClassicRegular2["Expand"] = "fa-regular fa-expand";
  IconClassicRegular2["Eye"] = "fa-regular fa-eye";
  IconClassicRegular2["EyeSlash"] = "fa-regular fa-eye-slash";
  IconClassicRegular2["Family"] = "fa-regular fa-family";
  IconClassicRegular2["FastBackward"] = "fa-regular fa-fast-backward";
  IconClassicRegular2["FastForward"] = "fa-regular fa-fast-forward";
  IconClassicRegular2["File"] = "fa-regular fa-file";
  IconClassicRegular2["FileAudio"] = "fa-regular fa-file-audio";
  IconClassicRegular2["FileContract"] = "fa-regular fa-file-contract";
  IconClassicRegular2["FileDownload"] = "fa-regular fa-file-download";
  IconClassicRegular2["FileExcel"] = "fa-regular fa-file-excel";
  IconClassicRegular2["FileExport"] = "fa-regular fa-file-export";
  IconClassicRegular2["FileImage"] = "fa-regular fa-file-image";
  IconClassicRegular2["FileInvoice"] = "fa-regular fa-file-invoice";
  IconClassicRegular2["FileImport"] = "fa-regular fa-file-import";
  IconClassicRegular2["FileLines"] = "fa-regular fa-file-lines";
  IconClassicRegular2["FileMusic"] = "fa-regular fa-file-music";
  IconClassicRegular2["FilePdf"] = "fa-regular fa-file-pdf";
  IconClassicRegular2["Files"] = "fa-regular fa-file-files";
  IconClassicRegular2["FileSignature"] = "fa-regular fa-file-signature";
  IconClassicRegular2["FileVideo"] = "fa-regular fa-file-video";
  IconClassicRegular2["FileWord"] = "fa-regular fa-file-word";
  IconClassicRegular2["FileZipper"] = "fa-regular fa-file-zipper";
  IconClassicRegular2["Filter"] = "fa-regular fa-filter";
  IconClassicRegular2["Flag"] = "fa-regular fa-flag";
  IconClassicRegular2["FlagSwallowTail"] = "fa-regular fa-flag-swallowtail";
  IconClassicRegular2["FloppyDisk"] = "fa-regular fa-floppy-disk";
  IconClassicRegular2["Folder"] = "fa-regular fa-folder";
  IconClassicRegular2["FolderOpen"] = "fa-regular fa-folder-open";
  IconClassicRegular2["FontAwesome"] = "fa-regular  fa-font-awesome";
  IconClassicRegular2["Forward"] = "fa-regular fa-forward";
  IconClassicRegular2["ForwardStep"] = "fa-regular fa-forward-step";
  IconClassicRegular2["ForwardFast"] = "fa-regular fa-forward-fast";
  IconClassicRegular2["Futbol"] = "fa-regular fa-futbol";
  IconClassicRegular2["Gear"] = "fa-regular fa-gear";
  IconClassicRegular2["Gears"] = "fa-regular fa-gears";
  IconClassicRegular2["Globe"] = "fa-regular fa-globe";
  IconClassicRegular2["Hashtag"] = "fa-regular fa-hashtag";
  IconClassicRegular2["HatWizard"] = "fa-regular fa-hat-wizard";
  IconClassicRegular2["Headset"] = "fa-regular fa-headset";
  IconClassicRegular2["Hospital"] = "fa-regular fa-hospital";
  IconClassicRegular2["Hourglass"] = "fa-regular fa-hourglass";
  IconClassicRegular2["HourglassClock"] = "fa-regular fa-hourglass-clock";
  IconClassicRegular2["House"] = "fa-regular fa-house";
  IconClassicRegular2["HouseMedical"] = "fa-regular fa-house-medical";
  IconClassicRegular2["HouseUser"] = "fa-regular fa-house-user";
  IconClassicRegular2["Image"] = "fa-regular fa-image";
  IconClassicRegular2["Inbox"] = "fa-regular fa-inbox";
  IconClassicRegular2["InboxFull"] = "fa-regular fa-inbox-full";
  IconClassicRegular2["Info"] = "fa-regular fa-info";
  IconClassicRegular2["Key"] = "fa-regular fa-key";
  IconClassicRegular2["Keyboard"] = "fa-regular fa-keyboard";
  IconClassicRegular2["KeySkeleton"] = "fa-regular fa-key-skeleton";
  IconClassicRegular2["Laptop"] = "fa-regular fa-laptop";
  IconClassicRegular2["LaptopMedical"] = "fa-regular fa-laptop-medical";
  IconClassicRegular2["LevelDown"] = "fa-regular fa-level-down";
  IconClassicRegular2["LevelDownAlt"] = "fa-regular fa-level-down-alt";
  IconClassicRegular2["LevelLeft"] = "fa-regular fa-level-left";
  IconClassicRegular2["LevelLeftAlt"] = "fa-regular fa-level-left-alt";
  IconClassicRegular2["LevelRight"] = "fa-regular fa-level-right";
  IconClassicRegular2["LevelRightAlt"] = "fa-regular fa-level-right-alt";
  IconClassicRegular2["LevelUp"] = "fa-regular fa-level-up";
  IconClassicRegular2["LevelUpAlt"] = "fa-regular fa-level-up-alt";
  IconClassicRegular2["Link"] = "fa-regular fa-link";
  IconClassicRegular2["LinkExternal"] = "fa-regular fa-arrow-up-right-from-square";
  IconClassicRegular2["LinkHorizontal"] = "fa-regular fa-link-horizontal";
  IconClassicRegular2["LinkHorizontalSlash"] = "fa-regular fa-link-horizontal-slash";
  IconClassicRegular2["LinkSimple"] = "fa-regular fa-link-simple";
  IconClassicRegular2["LinkSimpleSlash"] = "fa-regular fa-link-simple-slash";
  IconClassicRegular2["LinkSlash"] = "fa-regular fa-link-slash";
  IconClassicRegular2["List"] = "fa-regular fa-list";
  IconClassicRegular2["ListCheck"] = "fa-regular fa-list-check";
  IconClassicRegular2["ListOl"] = "fa-regular fa-list-ol";
  IconClassicRegular2["ListTree"] = "fa-regular fa-list-tree";
  IconClassicRegular2["ListUl"] = "fa-regular fa-list-ul";
  IconClassicRegular2["LocationArrow"] = "fa-regular fa-location-arrow";
  IconClassicRegular2["LocationCrossHairs"] = "fa-regular fa-location-crosshairs";
  IconClassicRegular2["LocationCheck"] = "fa-regular fa-location-check";
  IconClassicRegular2["LocationDot"] = "fa-regular fa-location-dot";
  IconClassicRegular2["Lock"] = "fa-regular fa-lock";
  IconClassicRegular2["LockOpen"] = "fa-regular fa-lock-open";
  IconClassicRegular2["Login"] = "fa-regular fa-arrow-right-to-bracket";
  IconClassicRegular2["Logout"] = "fa-regular fa-arrow-right-from-bracket";
  IconClassicRegular2["MagnifyingGlass"] = "fa-regular fa-magnifying-glass";
  IconClassicRegular2["MagnifyingGlassMinus"] = "fa-regular fa-magnifying-glass-minus";
  IconClassicRegular2["MagnifyingGlassPlus"] = "fa-regular fa-magnifying-glass-plus";
  IconClassicRegular2["Mail"] = "fa-regular fa-envelope";
  IconClassicRegular2["Mailbox"] = "fa-regular fa-mailbox";
  IconClassicRegular2["MailOpen"] = "fa-regular fa-envelope-open";
  IconClassicRegular2["Map"] = "fa-regular fa-map";
  IconClassicRegular2["MapLocation"] = "fa-regular fa-map-location";
  IconClassicRegular2["MapLocationDot"] = "fa-regular fa-map-location-dot";
  IconClassicRegular2["MapPin"] = "fa-regular fa-map-pin";
  IconClassicRegular2["Maximize"] = "fa-regular fa-maximize";
  IconClassicRegular2["Merge"] = "fa-regular fa-merge";
  IconClassicRegular2["Message"] = "fa-regular fa-message";
  IconClassicRegular2["MessageCode"] = "fa-regular fa-message-code";
  IconClassicRegular2["MessageDots"] = "fa-regular fa-message-dots";
  IconClassicRegular2["MessageLines"] = "fa-regular fa-message-lines";
  IconClassicRegular2["Messages"] = "fa-regular fa-messages";
  IconClassicRegular2["Microphone"] = "fa-regular fa-microphone";
  IconClassicRegular2["MicrophoneLines"] = "fa-regular fa-microphone-lines";
  IconClassicRegular2["MicrophoneLinesSlash"] = "fa-regular fa-microphone-lines-slash";
  IconClassicRegular2["MicrophoneSlash"] = "fa-regular fa-microphone-slash";
  IconClassicRegular2["Microscope"] = "fa-regular fa-microscope";
  IconClassicRegular2["Minimize"] = "fa-regular fa-minimize";
  IconClassicRegular2["Minus"] = "fa-regular fa-minus";
  IconClassicRegular2["Mobile"] = "fa-regular fa-mobile";
  IconClassicRegular2["MobileNotch"] = "fa-regular fa-mobile-notch";
  IconClassicRegular2["MoneyCheckDollarPen"] = "fa-regular fa-money-check-dollar-pen";
  IconClassicRegular2["Music"] = "fa-regular fa-music";
  IconClassicRegular2["MusicSlash"] = "fa-regular fa-music-slash";
  IconClassicRegular2["NewsPaper"] = "fa-regular fa-newspaper";
  IconClassicRegular2["Palette"] = "fa-regular fa-palette";
  IconClassicRegular2["PaperClip"] = "fa-regular fa-paperclip";
  IconClassicRegular2["PaperClipVertical"] = "fa-regular fa-paperclip-vertical";
  IconClassicRegular2["PaperPlane"] = "fa-regular fa-paper-plane";
  IconClassicRegular2["PaperPlaneTop"] = "fa-regular fa-paper-plane-top";
  IconClassicRegular2["Paste"] = "fa-regular fa-paste";
  IconClassicRegular2["Pause"] = "fa-regular fa-pause";
  IconClassicRegular2["Pen"] = "fa-regular fa-pen";
  IconClassicRegular2["Pencil"] = "fa-regular fa-pencil";
  IconClassicRegular2["PenToSquare"] = "fa-regular fa-pen-to-square";
  IconClassicRegular2["PeopleArrowsLeftRight"] = "fa-regular fa-people-arrows-left-right";
  IconClassicRegular2["Percentage"] = "fa-regular fa-percentage";
  IconClassicRegular2["Period"] = "fa-regular fa-period";
  IconClassicRegular2["PersonChalkboard"] = "fa-regular fa-person-chalkboard";
  IconClassicRegular2["PersonMilitaryRifle"] = "fa-regular fa-person-military-rifle";
  IconClassicRegular2["Phone"] = "fa-regular fa-phone";
  IconClassicRegular2["Play"] = "fa-regular fa-play";
  IconClassicRegular2["PlayPause"] = "fa-regular fa-play-pause";
  IconClassicRegular2["Plus"] = "fa-regular fa-plus";
  IconClassicRegular2["Print"] = "fa-regular fa-print";
  IconClassicRegular2["Pumo"] = "fa-regular fa-font-awesome";
  IconClassicRegular2["Question"] = "fa-regular fa-question";
  IconClassicRegular2["Redo"] = "fa-regular fa-redo";
  IconClassicRegular2["RedoAlt"] = "fa-regular fa-redo-alt";
  IconClassicRegular2["Refresh"] = "fa-regular fa-arrows-rotate";
  IconClassicRegular2["Remove"] = "fa-regular fa-xmark";
  IconClassicRegular2["Repeat"] = "fa-regular fa-repeat";
  IconClassicRegular2["Reply"] = "fa-regular fa-reply";
  IconClassicRegular2["ReplyAll"] = "fa-regular fa-reply-all";
  IconClassicRegular2["RightFromBracket"] = "fa-regular fa-right-from-bracket";
  IconClassicRegular2["RightToBracket"] = "fa-regular fa-right-to-bracket";
  IconClassicRegular2["Rotate"] = "fa-regular fa-rotate";
  IconClassicRegular2["RotateLeft"] = "fa-regular fa-rotate-left";
  IconClassicRegular2["SackDollar"] = "fa-regular fa-sack-dollar";
  IconClassicRegular2["Save"] = "fa-regular fa-floppy-disk";
  IconClassicRegular2["Scissors"] = "fa-regular fa-scissors";
  IconClassicRegular2["ScrewdriverWrench"] = "fa-regular fa-screwdriver-wrench";
  IconClassicRegular2["Search"] = "fa-regular fa-magnifying-glass";
  IconClassicRegular2["SensorTriangleExclamation"] = "fa-regular fa-sensor-triangle-exclamation";
  IconClassicRegular2["Settings"] = "fa-regular fa-gear";
  IconClassicRegular2["Share"] = "fa-regular fa-share";
  IconClassicRegular2["ShareAll"] = "fa-regular fa-share-all";
  IconClassicRegular2["ShareNodes"] = "fa-regular fa-share-nodes";
  IconClassicRegular2["ShareFromSquare"] = "fa-regular fa-share-from-square";
  IconClassicRegular2["ShieldCheck"] = "fa-regular fa-shield-check";
  IconClassicRegular2["Ship"] = "fa-regular fa-ship";
  IconClassicRegular2["Sitemap"] = "fa-regular fa-sitemap";
  IconClassicRegular2["Soccer"] = "fa-regular fa-futbol";
  IconClassicRegular2["Sort"] = "fa-regular fa-sort";
  IconClassicRegular2["SortDown"] = "fa-regular fa-sort-down";
  IconClassicRegular2["SortUp"] = "fa-regular fa-sort-up";
  IconClassicRegular2["Spinner"] = "fa-regular fa-spinner";
  IconClassicRegular2["Split"] = "fa-regular fa-split";
  IconClassicRegular2["SquareCheck"] = "fa-regular fa-square-check";
  IconClassicRegular2["SquareMinus"] = "fa-regular fa-square-minus";
  IconClassicRegular2["SquarePen"] = "fa-regular fa-square-pen";
  IconClassicRegular2["Stamp"] = "fa-regular fa-stamp";
  IconClassicRegular2["Star"] = "fa-regular fa-star";
  IconClassicRegular2["StepBackward"] = "fa-regular fa-step-backward";
  IconClassicRegular2["StepForward"] = "fa-regular fa-step-forward";
  IconClassicRegular2["Stethoscope"] = "fa-regular fa-stethoscope";
  IconClassicRegular2["Stop"] = "fa-regular fa-stop";
  IconClassicRegular2["Table"] = "fa-regular fa-table";
  IconClassicRegular2["TableRows"] = "fa-regular fa-table-rows";
  IconClassicRegular2["Tablet"] = "fa-regular fa-tablet";
  IconClassicRegular2["Tag"] = "fa-regular fa-tag";
  IconClassicRegular2["Tags"] = "fa-regular fa-tags";
  IconClassicRegular2["Tasks"] = "fa-regular fa-tasks";
  IconClassicRegular2["ThumbsDown"] = "fa-regular fa-thumbs-down";
  IconClassicRegular2["ThumbsUp"] = "fa-regular fa-thumbs-up";
  IconClassicRegular2["Thumbtack"] = "fa-regular fa-thumbtack";
  IconClassicRegular2["Timer"] = "fa-regular fa-timer";
  IconClassicRegular2["Trash"] = "fa-regular fa-trash";
  IconClassicRegular2["TrashCanList"] = "fa-regular fa-trash-can-list";
  IconClassicRegular2["TrashUndo"] = "fa-regular fa-trash-undo";
  IconClassicRegular2["TrashXmark"] = "fa-regular fa-trash-xmark";
  IconClassicRegular2["TriangleExclamation"] = "fa-regular fa-triangle-exclamation";
  IconClassicRegular2["Truck"] = "fa-regular fa-truck";
  IconClassicRegular2["Undo"] = "fa-regular fa-arrow-rotate-left";
  IconClassicRegular2["Unlock"] = "fa-regular fa-unlock";
  IconClassicRegular2["Upload"] = "fa-regular fa-upload";
  IconClassicRegular2["UsbDrive"] = "fa-regular fa-usb-drive";
  IconClassicRegular2["User"] = "fa-regular fa-user";
  IconClassicRegular2["UserCheck"] = "fa-regular fa-user-check";
  IconClassicRegular2["UserClock"] = "fa-regular fa-user-clock";
  IconClassicRegular2["UserDoctor"] = "fa-regular fa-user-doctor";
  IconClassicRegular2["UserDoctorHair"] = "fa-regular fa-user-doctor-hair";
  IconClassicRegular2["UserDoctorHairLong"] = "fa-regular fa-user-doctor-hair-long";
  IconClassicRegular2["UserGear"] = "fa-regular fa-user-gear";
  IconClassicRegular2["UserGroup"] = "fa-regular fa-user-group";
  IconClassicRegular2["UserHair"] = "fa-regular fa-user-hair";
  IconClassicRegular2["UserHairLong"] = "fa-regular fa-user-hair-long";
  IconClassicRegular2["UserHeadset"] = "fa-regular fa-user-headset";
  IconClassicRegular2["Users"] = "fa-regular fa-users";
  IconClassicRegular2["UserSecret"] = "fa-regular fa-user-secret";
  IconClassicRegular2["UsersMedical"] = "fa-regular fa-users-medical";
  IconClassicRegular2["UserTag"] = "fa-regular fa-user-tag";
  IconClassicRegular2["UserXmark"] = "fa-regular fa-user-xmark";
  IconClassicRegular2["Video"] = "fa-regular fa-video";
  IconClassicRegular2["VideoSlash"] = "fa-regular fa-video-slash";
  IconClassicRegular2["Volume"] = "fa-regular fa-volume";
  IconClassicRegular2["VolumeHigh"] = "fa-regular fa-volume-high";
  IconClassicRegular2["VolumeLow"] = "fa-regular fa-volume-low";
  IconClassicRegular2["VolumeOff"] = "fa-regular fa-volume-off";
  IconClassicRegular2["VolumeSlash"] = "fa-regular fa-volume-slash";
  IconClassicRegular2["VolumeXmark"] = "fa-regular fa-volume-xmark";
  IconClassicRegular2["Wifi"] = "fa-regular fa-wifi";
  IconClassicRegular2["WifiExclamation"] = "fa-regular fa-wifi-exclamation";
  IconClassicRegular2["WifiFair"] = "fa-regular fa-wifi-fair";
  IconClassicRegular2["WifiSlash"] = "fa-regular fa-wifi-slash";
  IconClassicRegular2["Window"] = "fa-regular fa-window";
  IconClassicRegular2["Xmark"] = "fa-regular fa-xmark";
  return IconClassicRegular2;
})(IconClassicRegular || {});
var IconClassicDuotone = /* @__PURE__ */ ((IconClassicDuotone2) => {
  IconClassicDuotone2["Add"] = "fa-duotone fa-plus";
  IconClassicDuotone2["AddressCard"] = "fa-duotone fa-address-card";
  IconClassicDuotone2["Alert"] = "fa-duotone fa-triangle-exclamation";
  IconClassicDuotone2["AngleDown"] = "fa-duotone fa-angle-down";
  IconClassicDuotone2["AngleLeft"] = "fa-duotone fa-angle-left";
  IconClassicDuotone2["AngleRight"] = "fa-duotone fa-angle-right";
  IconClassicDuotone2["AngleUp"] = "fa-duotone fa-angle-up";
  IconClassicDuotone2["Aperture"] = "fa-duotone fa-aperture";
  IconClassicDuotone2["ArrowDown"] = "fa-duotone fa-arrow-down";
  IconClassicDuotone2["ArrowDownShortWide"] = "fa-duotone fa-arrow-down-short-wide";
  IconClassicDuotone2["ArrowDownWideShort"] = "fa-duotone fa-arrow-down-wide-short";
  IconClassicDuotone2["ArrowLeft"] = "fa-duotone fa-arrow-left";
  IconClassicDuotone2["ArrowPointer"] = "fa-duotone fa-arrow-pointer";
  IconClassicDuotone2["ArrowRight"] = "fa-duotone fa-arrow-right";
  IconClassicDuotone2["ArrowRightToBracket"] = "fa-duotone fa-arrow-right-to-bracket";
  IconClassicDuotone2["ArrowRightFromBracket"] = "fa-duotone fa-arrow-right-from-bracket";
  IconClassicDuotone2["ArrowRotateRight"] = "fa-duotone fa-arrow-rotate-right";
  IconClassicDuotone2["ArrowsRepeat"] = "fa-duotone fa-arrows-repeat";
  IconClassicDuotone2["ArrowsRotate"] = "fa-duotone fa-arrows-rotate";
  IconClassicDuotone2["ArrowUp"] = "fa-duotone fa-arrow-up";
  IconClassicDuotone2["Asterisk"] = "fa-duotone fa-asterisk";
  IconClassicDuotone2["At"] = "fa-duotone fa-at";
  IconClassicDuotone2["Attachment"] = "fa-duotone fa-paperclip";
  IconClassicDuotone2["Back"] = "fa-duotone fa-angle-left";
  IconClassicDuotone2["Backward"] = "fa-duotone fa-backward";
  IconClassicDuotone2["BackwardFast"] = "fa-duotone fa-backward-fast";
  IconClassicDuotone2["BackwardStep"] = "fa-duotone fa-backward-step";
  IconClassicDuotone2["BalanceScale"] = "fa-duotone fa-balance-scale";
  IconClassicDuotone2["BallotCheck"] = "fa-duotone fa-ballot-check";
  IconClassicDuotone2["Ban"] = "fa-duotone fa-ban";
  IconClassicDuotone2["Barcode"] = "fa-duotone fa-barcode";
  IconClassicDuotone2["BarcodeScan"] = "fa-duotone fa-barcode-scan";
  IconClassicDuotone2["Bars"] = "fa-duotone fa-bars";
  IconClassicDuotone2["BarsSort"] = "fa-duotone fa-bars-sort";
  IconClassicDuotone2["Bell"] = "fa-duotone fa-bell";
  IconClassicDuotone2["BellSlash"] = "fa-duotone fa-bell-slash";
  IconClassicDuotone2["Bolt"] = "fa-duotone fa-bolt";
  IconClassicDuotone2["Bomb"] = "fa-duotone fa-bomb";
  IconClassicDuotone2["Book"] = "fa-duotone fa-book";
  IconClassicDuotone2["BookOpen"] = "fa-duotone fa-book-open";
  IconClassicDuotone2["Box"] = "fa-duotone fa-box";
  IconClassicDuotone2["BoxArchive"] = "fa-duotone fa-box-archive";
  IconClassicDuotone2["BriefCase"] = "fa-duotone fa-brief-case";
  IconClassicDuotone2["Bug"] = "fa-duotone fa-bug";
  IconClassicDuotone2["Burger"] = "fa-duotone fa-bars";
  IconClassicDuotone2["CakeCandles"] = "fa-duotone fa-cake-candles";
  IconClassicDuotone2["Calendar"] = "fa-duotone fa-calendar";
  IconClassicDuotone2["CalendarAlt"] = "fa-duotone fa-calendar-alt";
  IconClassicDuotone2["CalendarCheck"] = "fa-duotone fa-calendar-check";
  IconClassicDuotone2["CalendarDay"] = "fa-duotone fa-calendar-day";
  IconClassicDuotone2["CalendarPlus"] = "fa-duotone fa-calendar-plus";
  IconClassicDuotone2["Camera"] = "fa-duotone fa-camera";
  IconClassicDuotone2["CameraAlt"] = "fa-duotone fa-camera-alt";
  IconClassicDuotone2["CameraWeb"] = "fa-duotone fa-camera-web";
  IconClassicDuotone2["CameraWebSlash"] = "fa-duotone fa-camera-web-slash";
  IconClassicDuotone2["Capsules"] = "fa-duotone fa-capsules";
  IconClassicDuotone2["CaretDown"] = "fa-duotone fa-caret-down";
  IconClassicDuotone2["CaretLeft"] = "fa-duotone fa-caret-left";
  IconClassicDuotone2["CaretRight"] = "fa-duotone fa-caret-right";
  IconClassicDuotone2["CaretUp"] = "fa-duotone fa-caret-up";
  IconClassicDuotone2["CartCirclePlus"] = "fa-duotone fa-cart-circle-plus";
  IconClassicDuotone2["CartShopping"] = "fa-duotone fa-cart-shopping";
  IconClassicDuotone2["ChartArea"] = "fa-duotone fa-chart-area";
  IconClassicDuotone2["ChartBar"] = "fa-duotone fa-chart-bar";
  IconClassicDuotone2["ChartColumn"] = "fa-duotone fa-chart-column";
  IconClassicDuotone2["ChartLine"] = "fa-duotone fa-chart-line";
  IconClassicDuotone2["ChartPie"] = "fa-duotone fa-chart-pie";
  IconClassicDuotone2["ChartSimple"] = "fa-duotone fa-chart-simple";
  IconClassicDuotone2["Chat"] = "fa-duotone fa-comment";
  IconClassicDuotone2["Check"] = "fa-duotone fa-check";
  IconClassicDuotone2["ChevronDown"] = "fa-duotone fa-chevron-down";
  IconClassicDuotone2["ChevronLeft"] = "fa-duotone fa-chevron-left";
  IconClassicDuotone2["ChevronRight"] = "fa-duotone fa-chevron-right";
  IconClassicDuotone2["ChevronUp"] = "fa-duotone fa-chevron-up";
  IconClassicDuotone2["Circle"] = "fa-duotone fa-circle";
  IconClassicDuotone2["CircleCheck"] = "fa-duotone fa-circle-check";
  IconClassicDuotone2["CircleExclamation"] = "fa-duotone fa-circle-exclamation";
  IconClassicDuotone2["CircleInfo"] = "fa-duotone fa-circle-info";
  IconClassicDuotone2["CircleSmall"] = "fa-duotone fa-circle-small";
  IconClassicDuotone2["CircleStop"] = "fa-duotone fa-circle-stop";
  IconClassicDuotone2["Clipboard"] = "fa-duotone fa-clipboard";
  IconClassicDuotone2["ClipboardMedical"] = "fa-duotone fa-clipboard-medical";
  IconClassicDuotone2["Clock"] = "fa-duotone fa-clock";
  IconClassicDuotone2["ClockRotateLeft"] = "fa-duotone fa-clock-rotate-left";
  IconClassicDuotone2["Close"] = "fa-duotone fa-xmark";
  IconClassicDuotone2["Cloud"] = "fa-duotone fa-cloud";
  IconClassicDuotone2["CloudArrowUp"] = "fa-duotone fa-cloud-arrow-up";
  IconClassicDuotone2["CloudDownload"] = "fa-duotone fa-cloud-download";
  IconClassicDuotone2["Code"] = "fa-duotone fa-code";
  IconClassicDuotone2["CodeMerge"] = "fa-duotone fa-code-merge";
  IconClassicDuotone2["Coins"] = "fa-duotone fa-coins";
  IconClassicDuotone2["Collapse"] = "fa-duotone fa-compress";
  IconClassicDuotone2["Comment"] = "fa-duotone fa-comment";
  IconClassicDuotone2["CommentDots"] = "fa-duotone fa-comment-dots";
  IconClassicDuotone2["CommentLines"] = "fa-duotone fa-comment-lines";
  IconClassicDuotone2["Comments"] = "fa-duotone fa-comments";
  IconClassicDuotone2["CommentSms"] = "fa-duotone fa-comment-sms";
  IconClassicDuotone2["Compress"] = "fa-duotone fa-compress";
  IconClassicDuotone2["Copy"] = "fa-duotone fa-copy";
  IconClassicDuotone2["Copyright"] = "fa-duotone fa-copyright";
  IconClassicDuotone2["CreditCard"] = "fa-duotone fa-credit-card";
  IconClassicDuotone2["Crown"] = "fa-duotone fa-crown";
  IconClassicDuotone2["Database"] = "fa-duotone fa-database";
  IconClassicDuotone2["Delete"] = "fa-duotone fa-xmark";
  IconClassicDuotone2["DeleteLeft"] = "fa-duotone fa-delete-left";
  IconClassicDuotone2["DeleteRight"] = "fa-duotone fa-delete-right";
  IconClassicDuotone2["Desktop"] = "fa-duotone fa-desktop";
  IconClassicDuotone2["Download"] = "fa-duotone fa-download";
  IconClassicDuotone2["Edit"] = "fa-duotone fa-pen";
  IconClassicDuotone2["Eject"] = "fa-duotone fa-eject";
  IconClassicDuotone2["Ellipsis"] = "fa-duotone fa-ellipsis";
  IconClassicDuotone2["EllipsisVertical"] = "fa-duotone fa-ellipsis-vertical";
  IconClassicDuotone2["Envelope"] = "fa-duotone fa-envelope";
  IconClassicDuotone2["Eraser"] = "fa-duotone fa-eraser";
  IconClassicDuotone2["EuroSign"] = "fa-duotone fa-euro-sign";
  IconClassicDuotone2["Exclamation"] = "fa-duotone fa-exclamation";
  IconClassicDuotone2["Expand"] = "fa-duotone fa-expand";
  IconClassicDuotone2["Eye"] = "fa-duotone fa-eye";
  IconClassicDuotone2["EyeSlash"] = "fa-duotone fa-eye-slash";
  IconClassicDuotone2["Family"] = "fa-duotone fa-family";
  IconClassicDuotone2["FastBackward"] = "fa-duotone fa-fast-backward";
  IconClassicDuotone2["FastForward"] = "fa-duotone fa-fast-forward";
  IconClassicDuotone2["File"] = "fa-duotone fa-file";
  IconClassicDuotone2["FileAudio"] = "fa-duotone fa-file-audio";
  IconClassicDuotone2["FileContract"] = "fa-duotone fa-file-contract";
  IconClassicDuotone2["FileDownload"] = "fa-duotone fa-file-download";
  IconClassicDuotone2["FileExcel"] = "fa-duotone fa-file-excel";
  IconClassicDuotone2["FileExport"] = "fa-duotone fa-file-export";
  IconClassicDuotone2["FileImage"] = "fa-duotone fa-file-image";
  IconClassicDuotone2["FileInvoice"] = "fa-duotone fa-file-invoice";
  IconClassicDuotone2["FileImport"] = "fa-duotone fa-file-import";
  IconClassicDuotone2["FileLines"] = "fa-duotone fa-file-lines";
  IconClassicDuotone2["FileMusic"] = "fa-duotone fa-file-music";
  IconClassicDuotone2["FilePdf"] = "fa-duotone fa-file-pdf";
  IconClassicDuotone2["Files"] = "fa-duotone fa-file-files";
  IconClassicDuotone2["FileSignature"] = "fa-duotone fa-file-signature";
  IconClassicDuotone2["FileVideo"] = "fa-duotone fa-file-video";
  IconClassicDuotone2["FileWord"] = "fa-duotone fa-file-word";
  IconClassicDuotone2["FileZipper"] = "fa-duotone fa-file-zipper";
  IconClassicDuotone2["Filter"] = "fa-duotone fa-filter";
  IconClassicDuotone2["Flag"] = "fa-duotone fa-flag";
  IconClassicDuotone2["FlagSwallowTail"] = "fa-duotone fa-flag-swallowtail";
  IconClassicDuotone2["FloppyDisk"] = "fa-duotone fa-floppy-disk";
  IconClassicDuotone2["Folder"] = "fa-duotone fa-folder";
  IconClassicDuotone2["FolderOpen"] = "fa-duotone fa-folder-open";
  IconClassicDuotone2["FontAwesome"] = "fa-duotone  fa-font-awesome";
  IconClassicDuotone2["Forward"] = "fa-duotone fa-forward";
  IconClassicDuotone2["ForwardStep"] = "fa-duotone fa-forward-step";
  IconClassicDuotone2["ForwardFast"] = "fa-duotone fa-forward-fast";
  IconClassicDuotone2["Futbol"] = "fa-duotone fa-futbol";
  IconClassicDuotone2["Gear"] = "fa-duotone fa-gear";
  IconClassicDuotone2["Gears"] = "fa-duotone fa-gears";
  IconClassicDuotone2["Globe"] = "fa-duotone fa-globe";
  IconClassicDuotone2["Hashtag"] = "fa-duotone fa-hashtag";
  IconClassicDuotone2["HatWizard"] = "fa-duotone fa-hat-wizard";
  IconClassicDuotone2["Headset"] = "fa-duotone fa-headset";
  IconClassicDuotone2["Hospital"] = "fa-duotone fa-hospital";
  IconClassicDuotone2["Hourglass"] = "fa-duotone fa-hourglass";
  IconClassicDuotone2["HourglassClock"] = "fa-duotone fa-hourglass-clock";
  IconClassicDuotone2["House"] = "fa-duotone fa-house";
  IconClassicDuotone2["HouseMedical"] = "fa-duotone fa-house-medical";
  IconClassicDuotone2["HouseUser"] = "fa-duotone fa-house-user";
  IconClassicDuotone2["Image"] = "fa-duotone fa-image";
  IconClassicDuotone2["Inbox"] = "fa-duotone fa-inbox";
  IconClassicDuotone2["InboxFull"] = "fa-duotone fa-inbox-full";
  IconClassicDuotone2["Info"] = "fa-duotone fa-info";
  IconClassicDuotone2["Key"] = "fa-duotone fa-key";
  IconClassicDuotone2["Keyboard"] = "fa-duotone fa-keyboard";
  IconClassicDuotone2["KeySkeleton"] = "fa-duotone fa-key-skeleton";
  IconClassicDuotone2["Laptop"] = "fa-duotone fa-laptop";
  IconClassicDuotone2["LaptopMedical"] = "fa-duotone fa-laptop-medical";
  IconClassicDuotone2["LevelDown"] = "fa-duotone fa-level-down";
  IconClassicDuotone2["LevelDownAlt"] = "fa-duotone fa-level-down-alt";
  IconClassicDuotone2["LevelLeft"] = "fa-duotone fa-level-left";
  IconClassicDuotone2["LevelLeftAlt"] = "fa-duotone fa-level-left-alt";
  IconClassicDuotone2["LevelRight"] = "fa-duotone fa-level-right";
  IconClassicDuotone2["LevelRightAlt"] = "fa-duotone fa-level-right-alt";
  IconClassicDuotone2["LevelUp"] = "fa-duotone fa-level-up";
  IconClassicDuotone2["LevelUpAlt"] = "fa-duotone fa-level-up-alt";
  IconClassicDuotone2["Link"] = "fa-duotone fa-link";
  IconClassicDuotone2["LinkExternal"] = "fa-duotone fa-arrow-up-right-from-square";
  IconClassicDuotone2["LinkHorizontal"] = "fa-duotone fa-link-horizontal";
  IconClassicDuotone2["LinkHorizontalSlash"] = "fa-duotone fa-link-horizontal-slash";
  IconClassicDuotone2["LinkSimple"] = "fa-duotone fa-link-simple";
  IconClassicDuotone2["LinkSimpleSlash"] = "fa-duotone fa-link-simple-slash";
  IconClassicDuotone2["LinkSlash"] = "fa-duotone fa-link-slash";
  IconClassicDuotone2["List"] = "fa-duotone fa-list";
  IconClassicDuotone2["ListCheck"] = "fa-duotone fa-list-check";
  IconClassicDuotone2["ListOl"] = "fa-duotone fa-list-ol";
  IconClassicDuotone2["ListTree"] = "fa-duotone fa-list-tree";
  IconClassicDuotone2["ListUl"] = "fa-duotone fa-list-ul";
  IconClassicDuotone2["LocationArrow"] = "fa-duotone fa-location-arrow";
  IconClassicDuotone2["LocationCrossHairs"] = "fa-duotone fa-location-crosshairs";
  IconClassicDuotone2["LocationCheck"] = "fa-duotone fa-location-check";
  IconClassicDuotone2["LocationDot"] = "fa-duotone fa-location-dot";
  IconClassicDuotone2["Lock"] = "fa-duotone fa-lock";
  IconClassicDuotone2["LockOpen"] = "fa-duotone fa-lock-open";
  IconClassicDuotone2["Login"] = "fa-duotone fa-arrow-right-to-bracket";
  IconClassicDuotone2["Logout"] = "fa-duotone fa-arrow-right-from-bracket";
  IconClassicDuotone2["MagnifyingGlass"] = "fa-duotone fa-magnifying-glass";
  IconClassicDuotone2["MagnifyingGlassMinus"] = "fa-duotone fa-magnifying-glass-minus";
  IconClassicDuotone2["MagnifyingGlassPlus"] = "fa-duotone fa-magnifying-glass-plus";
  IconClassicDuotone2["Mail"] = "fa-duotone fa-envelope";
  IconClassicDuotone2["Mailbox"] = "fa-duotone fa-mailbox";
  IconClassicDuotone2["MailOpen"] = "fa-duotone fa-envelope-open";
  IconClassicDuotone2["Map"] = "fa-duotone fa-map";
  IconClassicDuotone2["MapLocation"] = "fa-duotone fa-map-location";
  IconClassicDuotone2["MapLocationDot"] = "fa-duotone fa-map-location-dot";
  IconClassicDuotone2["MapPin"] = "fa-duotone fa-map-pin";
  IconClassicDuotone2["Maximize"] = "fa-duotone fa-maximize";
  IconClassicDuotone2["Merge"] = "fa-duotone fa-merge";
  IconClassicDuotone2["Message"] = "fa-duotone fa-message";
  IconClassicDuotone2["MessageCode"] = "fa-duotone fa-message-code";
  IconClassicDuotone2["MessageDots"] = "fa-duotone fa-message-dots";
  IconClassicDuotone2["MessageLines"] = "fa-duotone fa-message-lines";
  IconClassicDuotone2["Messages"] = "fa-duotone fa-messages";
  IconClassicDuotone2["Microphone"] = "fa-duotone fa-microphone";
  IconClassicDuotone2["MicrophoneLines"] = "fa-duotone fa-microphone-lines";
  IconClassicDuotone2["MicrophoneLinesSlash"] = "fa-duotone fa-microphone-lines-slash";
  IconClassicDuotone2["MicrophoneSlash"] = "fa-duotone fa-microphone-slash";
  IconClassicDuotone2["Microscope"] = "fa-duotone fa-microscope";
  IconClassicDuotone2["Minimize"] = "fa-duotone fa-minimize";
  IconClassicDuotone2["Minus"] = "fa-duotone fa-minus";
  IconClassicDuotone2["Mobile"] = "fa-duotone fa-mobile";
  IconClassicDuotone2["MobileNotch"] = "fa-duotone fa-mobile-notch";
  IconClassicDuotone2["MoneyCheckDollarPen"] = "fa-duotone fa-money-check-dollar-pen";
  IconClassicDuotone2["Music"] = "fa-duotone fa-music";
  IconClassicDuotone2["MusicSlash"] = "fa-duotone fa-music-slash";
  IconClassicDuotone2["NewsPaper"] = "fa-duotone fa-newspaper";
  IconClassicDuotone2["Palette"] = "fa-duotone fa-palette";
  IconClassicDuotone2["PaperClip"] = "fa-duotone fa-paperclip";
  IconClassicDuotone2["PaperClipVertical"] = "fa-duotone fa-paperclip-vertical";
  IconClassicDuotone2["PaperPlane"] = "fa-duotone fa-paper-plane";
  IconClassicDuotone2["PaperPlaneTop"] = "fa-duotone fa-paper-plane-top";
  IconClassicDuotone2["Paste"] = "fa-duotone fa-paste";
  IconClassicDuotone2["Pause"] = "fa-duotone fa-pause";
  IconClassicDuotone2["Pen"] = "fa-duotone fa-pen";
  IconClassicDuotone2["Pencil"] = "fa-duotone fa-pencil";
  IconClassicDuotone2["PenToSquare"] = "fa-duotone fa-pen-to-square";
  IconClassicDuotone2["PeopleArrowsLeftRight"] = "fa-duotone fa-people-arrows-left-right";
  IconClassicDuotone2["Percentage"] = "fa-duotone fa-percentage";
  IconClassicDuotone2["Period"] = "fa-duotone fa-period";
  IconClassicDuotone2["PersonChalkboard"] = "fa-duotone fa-person-chalkboard";
  IconClassicDuotone2["PersonMilitaryRifle"] = "fa-duotone fa-person-military-rifle";
  IconClassicDuotone2["Phone"] = "fa-duotone fa-phone";
  IconClassicDuotone2["Play"] = "fa-duotone fa-play";
  IconClassicDuotone2["PlayPause"] = "fa-duotone fa-play-pause";
  IconClassicDuotone2["Plus"] = "fa-duotone fa-plus";
  IconClassicDuotone2["Print"] = "fa-duotone fa-print";
  IconClassicDuotone2["Pumo"] = "fa-duotone fa-font-awesome";
  IconClassicDuotone2["Question"] = "fa-duotone fa-question";
  IconClassicDuotone2["Redo"] = "fa-duotone fa-redo";
  IconClassicDuotone2["RedoAlt"] = "fa-duotone fa-redo-alt";
  IconClassicDuotone2["Refresh"] = "fa-duotone fa-arrows-rotate";
  IconClassicDuotone2["Remove"] = "fa-duotone fa-xmark";
  IconClassicDuotone2["Repeat"] = "fa-duotone fa-repeat";
  IconClassicDuotone2["Reply"] = "fa-duotone fa-reply";
  IconClassicDuotone2["ReplyAll"] = "fa-duotone fa-reply-all";
  IconClassicDuotone2["RightFromBracket"] = "fa-duotone fa-right-from-bracket";
  IconClassicDuotone2["RightToBracket"] = "fa-duotone fa-right-to-bracket";
  IconClassicDuotone2["Rotate"] = "fa-duotone fa-rotate";
  IconClassicDuotone2["RotateLeft"] = "fa-duotone fa-rotate-left";
  IconClassicDuotone2["SackDollar"] = "fa-duotone fa-sack-dollar";
  IconClassicDuotone2["Save"] = "fa-duotone fa-floppy-disk";
  IconClassicDuotone2["Scissors"] = "fa-duotone fa-scissors";
  IconClassicDuotone2["ScrewdriverWrench"] = "fa-duotone fa-screwdriver-wrench";
  IconClassicDuotone2["Search"] = "fa-duotone fa-magnifying-glass";
  IconClassicDuotone2["SensorTriangleExclamation"] = "fa-duotone fa-sensor-triangle-exclamation";
  IconClassicDuotone2["Settings"] = "fa-duotone fa-gear";
  IconClassicDuotone2["Share"] = "fa-duotone fa-share";
  IconClassicDuotone2["ShareAll"] = "fa-duotone fa-share-all";
  IconClassicDuotone2["ShareNodes"] = "fa-duotone fa-share-nodes";
  IconClassicDuotone2["ShareFromSquare"] = "fa-duotone fa-share-from-square";
  IconClassicDuotone2["ShieldCheck"] = "fa-duotone fa-shield-check";
  IconClassicDuotone2["Ship"] = "fa-duotone fa-ship";
  IconClassicDuotone2["Sitemap"] = "fa-duotone fa-sitemap";
  IconClassicDuotone2["Soccer"] = "fa-duotone fa-futbol";
  IconClassicDuotone2["Sort"] = "fa-duotone fa-sort";
  IconClassicDuotone2["SortDown"] = "fa-duotone fa-sort-down";
  IconClassicDuotone2["SortUp"] = "fa-duotone fa-sort-up";
  IconClassicDuotone2["Spinner"] = "fa-duotone fa-spinner";
  IconClassicDuotone2["Split"] = "fa-duotone fa-split";
  IconClassicDuotone2["SquareCheck"] = "fa-duotone fa-square-check";
  IconClassicDuotone2["SquareMinus"] = "fa-duotone fa-square-minus";
  IconClassicDuotone2["SquarePen"] = "fa-duotone fa-square-pen";
  IconClassicDuotone2["Stamp"] = "fa-duotone fa-stamp";
  IconClassicDuotone2["Star"] = "fa-duotone fa-star";
  IconClassicDuotone2["StepBackward"] = "fa-duotone fa-step-backward";
  IconClassicDuotone2["StepForward"] = "fa-duotone fa-step-forward";
  IconClassicDuotone2["Stethoscope"] = "fa-duotone fa-stethoscope";
  IconClassicDuotone2["Stop"] = "fa-duotone fa-stop";
  IconClassicDuotone2["Table"] = "fa-duotone fa-table";
  IconClassicDuotone2["TableRows"] = "fa-duotone fa-table-rows";
  IconClassicDuotone2["Tablet"] = "fa-duotone fa-tablet";
  IconClassicDuotone2["Tag"] = "fa-duotone fa-tag";
  IconClassicDuotone2["Tags"] = "fa-duotone fa-tags";
  IconClassicDuotone2["Tasks"] = "fa-duotone fa-tasks";
  IconClassicDuotone2["ThumbsDown"] = "fa-duotone fa-thumbs-down";
  IconClassicDuotone2["ThumbsUp"] = "fa-duotone fa-thumbs-up";
  IconClassicDuotone2["Thumbtack"] = "fa-duotone fa-thumbtack";
  IconClassicDuotone2["Timer"] = "fa-duotone fa-timer";
  IconClassicDuotone2["Trash"] = "fa-duotone fa-trash";
  IconClassicDuotone2["TrashCanList"] = "fa-duotone fa-trash-can-list";
  IconClassicDuotone2["TrashUndo"] = "fa-duotone fa-trash-undo";
  IconClassicDuotone2["TrashXmark"] = "fa-duotone fa-trash-xmark";
  IconClassicDuotone2["TriangleExclamation"] = "fa-duotone fa-triangle-exclamation";
  IconClassicDuotone2["Truck"] = "fa-duotone fa-truck";
  IconClassicDuotone2["Undo"] = "fa-duotone fa-arrow-rotate-left";
  IconClassicDuotone2["Unlock"] = "fa-duotone fa-unlock";
  IconClassicDuotone2["Upload"] = "fa-duotone fa-upload";
  IconClassicDuotone2["UsbDrive"] = "fa-duotone fa-usb-drive";
  IconClassicDuotone2["User"] = "fa-duotone fa-user";
  IconClassicDuotone2["UserCheck"] = "fa-duotone fa-user-check";
  IconClassicDuotone2["UserClock"] = "fa-duotone fa-user-clock";
  IconClassicDuotone2["UserDoctor"] = "fa-duotone fa-user-doctor";
  IconClassicDuotone2["UserDoctorHair"] = "fa-duotone fa-user-doctor-hair";
  IconClassicDuotone2["UserDoctorHairLong"] = "fa-duotone fa-user-doctor-hair-long";
  IconClassicDuotone2["UserGear"] = "fa-duotone fa-user-gear";
  IconClassicDuotone2["UserGroup"] = "fa-duotone fa-user-group";
  IconClassicDuotone2["UserHair"] = "fa-duotone fa-user-hair";
  IconClassicDuotone2["UserHairLong"] = "fa-duotone fa-user-hair-long";
  IconClassicDuotone2["UserHeadset"] = "fa-duotone fa-user-headset";
  IconClassicDuotone2["Users"] = "fa-duotone fa-users";
  IconClassicDuotone2["UserSecret"] = "fa-duotone fa-user-secret";
  IconClassicDuotone2["UsersMedical"] = "fa-duotone fa-users-medical";
  IconClassicDuotone2["UserTag"] = "fa-duotone fa-user-tag";
  IconClassicDuotone2["UserXmark"] = "fa-duotone fa-user-xmark";
  IconClassicDuotone2["Video"] = "fa-duotone fa-video";
  IconClassicDuotone2["VideoSlash"] = "fa-duotone fa-video-slash";
  IconClassicDuotone2["Volume"] = "fa-duotone fa-volume";
  IconClassicDuotone2["VolumeHigh"] = "fa-duotone fa-volume-high";
  IconClassicDuotone2["VolumeLow"] = "fa-duotone fa-volume-low";
  IconClassicDuotone2["VolumeOff"] = "fa-duotone fa-volume-off";
  IconClassicDuotone2["VolumeSlash"] = "fa-duotone fa-volume-slash";
  IconClassicDuotone2["VolumeXmark"] = "fa-duotone fa-volume-xmark";
  IconClassicDuotone2["Wifi"] = "fa-duotone fa-wifi";
  IconClassicDuotone2["WifiExclamation"] = "fa-duotone fa-wifi-exclamation";
  IconClassicDuotone2["WifiFair"] = "fa-duotone fa-wifi-fair";
  IconClassicDuotone2["WifiSlash"] = "fa-duotone fa-wifi-slash";
  IconClassicDuotone2["Window"] = "fa-duotone fa-window";
  IconClassicDuotone2["Xmark"] = "fa-duotone fa-xmark";
  return IconClassicDuotone2;
})(IconClassicDuotone || {});
var IconClassicThin = /* @__PURE__ */ ((IconClassicThin2) => {
  IconClassicThin2["Add"] = "fa-thin fa-plus";
  IconClassicThin2["AddressCard"] = "fa-thin fa-address-card";
  IconClassicThin2["Alert"] = "fa-thin fa-triangle-exclamation";
  IconClassicThin2["AngleDown"] = "fa-thin fa-angle-down";
  IconClassicThin2["AngleLeft"] = "fa-thin fa-angle-left";
  IconClassicThin2["AngleRight"] = "fa-thin fa-angle-right";
  IconClassicThin2["AngleUp"] = "fa-thin fa-angle-up";
  IconClassicThin2["Aperture"] = "fa-thin fa-aperture";
  IconClassicThin2["ArrowDown"] = "fa-thin fa-arrow-down";
  IconClassicThin2["ArrowDownShortWide"] = "fa-thin fa-arrow-down-short-wide";
  IconClassicThin2["ArrowDownWideShort"] = "fa-thin fa-arrow-down-wide-short";
  IconClassicThin2["ArrowLeft"] = "fa-thin fa-arrow-left";
  IconClassicThin2["ArrowPointer"] = "fa-thin fa-arrow-pointer";
  IconClassicThin2["ArrowRight"] = "fa-thin fa-arrow-right";
  IconClassicThin2["ArrowRightToBracket"] = "fa-thin fa-arrow-right-to-bracket";
  IconClassicThin2["ArrowRightFromBracket"] = "fa-thin fa-arrow-right-from-bracket";
  IconClassicThin2["ArrowRotateRight"] = "fa-thin fa-arrow-rotate-right";
  IconClassicThin2["ArrowsRepeat"] = "fa-thin fa-arrows-repeat";
  IconClassicThin2["ArrowsRotate"] = "fa-thin fa-arrows-rotate";
  IconClassicThin2["ArrowUp"] = "fa-thin fa-arrow-up";
  IconClassicThin2["Asterisk"] = "fa-thin fa-asterisk";
  IconClassicThin2["At"] = "fa-thin fa-at";
  IconClassicThin2["Attachment"] = "fa-thin fa-paperclip";
  IconClassicThin2["Back"] = "fa-thin fa-angle-left";
  IconClassicThin2["Backward"] = "fa-thin fa-backward";
  IconClassicThin2["BackwardFast"] = "fa-thin fa-backward-fast";
  IconClassicThin2["BackwardStep"] = "fa-thin fa-backward-step";
  IconClassicThin2["BalanceScale"] = "fa-thin fa-balance-scale";
  IconClassicThin2["BallotCheck"] = "fa-thin fa-ballot-check";
  IconClassicThin2["Ban"] = "fa-thin fa-ban";
  IconClassicThin2["Barcode"] = "fa-thin fa-barcode";
  IconClassicThin2["BarcodeScan"] = "fa-thin fa-barcode-scan";
  IconClassicThin2["Bars"] = "fa-thin fa-bars";
  IconClassicThin2["BarsSort"] = "fa-thin fa-bars-sort";
  IconClassicThin2["Bell"] = "fa-thin fa-bell";
  IconClassicThin2["BellSlash"] = "fa-thin fa-bell-slash";
  IconClassicThin2["Bolt"] = "fa-thin fa-bolt";
  IconClassicThin2["Bomb"] = "fa-thin fa-bomb";
  IconClassicThin2["Book"] = "fa-thin fa-book";
  IconClassicThin2["BookOpen"] = "fa-thin fa-book-open";
  IconClassicThin2["Box"] = "fa-thin fa-box";
  IconClassicThin2["BoxArchive"] = "fa-thin fa-box-archive";
  IconClassicThin2["BriefCase"] = "fa-thin fa-brief-case";
  IconClassicThin2["Bug"] = "fa-thin fa-bug";
  IconClassicThin2["Burger"] = "fa-thin fa-bars";
  IconClassicThin2["CakeCandles"] = "fa-thin fa-cake-candles";
  IconClassicThin2["Calendar"] = "fa-thin fa-calendar";
  IconClassicThin2["CalendarAlt"] = "fa-thin fa-calendar-alt";
  IconClassicThin2["CalendarCheck"] = "fa-thin fa-calendar-check";
  IconClassicThin2["CalendarDay"] = "fa-thin fa-calendar-day";
  IconClassicThin2["CalendarPlus"] = "fa-thin fa-calendar-plus";
  IconClassicThin2["Camera"] = "fa-thin fa-camera";
  IconClassicThin2["CameraAlt"] = "fa-thin fa-camera-alt";
  IconClassicThin2["CameraWeb"] = "fa-thin fa-camera-web";
  IconClassicThin2["CameraWebSlash"] = "fa-thin fa-camera-web-slash";
  IconClassicThin2["Capsules"] = "fa-thin fa-capsules";
  IconClassicThin2["CaretDown"] = "fa-thin fa-caret-down";
  IconClassicThin2["CaretLeft"] = "fa-thin fa-caret-left";
  IconClassicThin2["CaretRight"] = "fa-thin fa-caret-right";
  IconClassicThin2["CaretUp"] = "fa-thin fa-caret-up";
  IconClassicThin2["CartCirclePlus"] = "fa-thin fa-cart-circle-plus";
  IconClassicThin2["CartShopping"] = "fa-thin fa-cart-shopping";
  IconClassicThin2["ChartArea"] = "fa-thin fa-chart-area";
  IconClassicThin2["ChartBar"] = "fa-thin fa-chart-bar";
  IconClassicThin2["ChartColumn"] = "fa-thin fa-chart-column";
  IconClassicThin2["ChartLine"] = "fa-thin fa-chart-line";
  IconClassicThin2["ChartPie"] = "fa-thin fa-chart-pie";
  IconClassicThin2["ChartSimple"] = "fa-thin fa-chart-simple";
  IconClassicThin2["Chat"] = "fa-thin fa-comment";
  IconClassicThin2["Check"] = "fa-thin fa-check";
  IconClassicThin2["ChevronDown"] = "fa-thin fa-chevron-down";
  IconClassicThin2["ChevronLeft"] = "fa-thin fa-chevron-left";
  IconClassicThin2["ChevronRight"] = "fa-thin fa-chevron-right";
  IconClassicThin2["ChevronUp"] = "fa-thin fa-chevron-up";
  IconClassicThin2["Circle"] = "fa-thin fa-circle";
  IconClassicThin2["CircleCheck"] = "fa-thin fa-circle-check";
  IconClassicThin2["CircleExclamation"] = "fa-thin fa-circle-exclamation";
  IconClassicThin2["CircleInfo"] = "fa-thin fa-circle-info";
  IconClassicThin2["CircleSmall"] = "fa-thin fa-circle-small";
  IconClassicThin2["CircleStop"] = "fa-thin fa-circle-stop";
  IconClassicThin2["Clipboard"] = "fa-thin fa-clipboard";
  IconClassicThin2["ClipboardMedical"] = "fa-thin fa-clipboard-medical";
  IconClassicThin2["Clock"] = "fa-thin fa-clock";
  IconClassicThin2["ClockRotateLeft"] = "fa-thin fa-clock-rotate-left";
  IconClassicThin2["Close"] = "fa-thin fa-xmark";
  IconClassicThin2["Cloud"] = "fa-thin fa-cloud";
  IconClassicThin2["CloudArrowUp"] = "fa-thin fa-cloud-arrow-up";
  IconClassicThin2["CloudDownload"] = "fa-thin fa-cloud-download";
  IconClassicThin2["Code"] = "fa-thin fa-code";
  IconClassicThin2["CodeMerge"] = "fa-thin fa-code-merge";
  IconClassicThin2["Coins"] = "fa-thin fa-coins";
  IconClassicThin2["Collapse"] = "fa-thin fa-compress";
  IconClassicThin2["Comment"] = "fa-thin fa-comment";
  IconClassicThin2["CommentDots"] = "fa-thin fa-comment-dots";
  IconClassicThin2["CommentLines"] = "fa-thin fa-comment-lines";
  IconClassicThin2["Comments"] = "fa-thin fa-comments";
  IconClassicThin2["CommentSms"] = "fa-thin fa-comment-sms";
  IconClassicThin2["Compress"] = "fa-thin fa-compress";
  IconClassicThin2["Copy"] = "fa-thin fa-copy";
  IconClassicThin2["Copyright"] = "fa-thin fa-copyright";
  IconClassicThin2["CreditCard"] = "fa-thin fa-credit-card";
  IconClassicThin2["Crown"] = "fa-thin fa-crown";
  IconClassicThin2["Database"] = "fa-thin fa-database";
  IconClassicThin2["Delete"] = "fa-thin fa-xmark";
  IconClassicThin2["DeleteLeft"] = "fa-thin fa-delete-left";
  IconClassicThin2["DeleteRight"] = "fa-thin fa-delete-right";
  IconClassicThin2["Desktop"] = "fa-thin fa-desktop";
  IconClassicThin2["Download"] = "fa-thin fa-download";
  IconClassicThin2["Edit"] = "fa-thin fa-pen";
  IconClassicThin2["Eject"] = "fa-thin fa-eject";
  IconClassicThin2["Ellipsis"] = "fa-thin fa-ellipsis";
  IconClassicThin2["EllipsisVertical"] = "fa-thin fa-ellipsis-vertical";
  IconClassicThin2["Envelope"] = "fa-thin fa-envelope";
  IconClassicThin2["Eraser"] = "fa-thin fa-eraser";
  IconClassicThin2["EuroSign"] = "fa-thin fa-euro-sign";
  IconClassicThin2["Exclamation"] = "fa-thin fa-exclamation";
  IconClassicThin2["Expand"] = "fa-thin fa-expand";
  IconClassicThin2["Eye"] = "fa-thin fa-eye";
  IconClassicThin2["EyeSlash"] = "fa-thin fa-eye-slash";
  IconClassicThin2["Family"] = "fa-thin fa-family";
  IconClassicThin2["FastBackward"] = "fa-thin fa-fast-backward";
  IconClassicThin2["FastForward"] = "fa-thin fa-fast-forward";
  IconClassicThin2["File"] = "fa-thin fa-file";
  IconClassicThin2["FileAudio"] = "fa-thin fa-file-audio";
  IconClassicThin2["FileContract"] = "fa-thin fa-file-contract";
  IconClassicThin2["FileDownload"] = "fa-thin fa-file-download";
  IconClassicThin2["FileExcel"] = "fa-thin fa-file-excel";
  IconClassicThin2["FileExport"] = "fa-thin fa-file-export";
  IconClassicThin2["FileImage"] = "fa-thin fa-file-image";
  IconClassicThin2["FileInvoice"] = "fa-thin fa-file-invoice";
  IconClassicThin2["FileImport"] = "fa-thin fa-file-import";
  IconClassicThin2["FileLines"] = "fa-thin fa-file-lines";
  IconClassicThin2["FileMusic"] = "fa-thin fa-file-music";
  IconClassicThin2["FilePdf"] = "fa-thin fa-file-pdf";
  IconClassicThin2["Files"] = "fa-thin fa-file-files";
  IconClassicThin2["FileSignature"] = "fa-thin fa-file-signature";
  IconClassicThin2["FileVideo"] = "fa-thin fa-file-video";
  IconClassicThin2["FileWord"] = "fa-thin fa-file-word";
  IconClassicThin2["FileZipper"] = "fa-thin fa-file-zipper";
  IconClassicThin2["Filter"] = "fa-thin fa-filter";
  IconClassicThin2["Flag"] = "fa-thin fa-flag";
  IconClassicThin2["FlagSwallowTail"] = "fa-thin fa-flag-swallowtail";
  IconClassicThin2["FloppyDisk"] = "fa-thin fa-floppy-disk";
  IconClassicThin2["Folder"] = "fa-thin fa-folder";
  IconClassicThin2["FolderOpen"] = "fa-thin fa-folder-open";
  IconClassicThin2["FontAwesome"] = "fa-thin  fa-font-awesome";
  IconClassicThin2["Forward"] = "fa-thin fa-forward";
  IconClassicThin2["ForwardStep"] = "fa-thin fa-forward-step";
  IconClassicThin2["ForwardFast"] = "fa-thin fa-forward-fast";
  IconClassicThin2["Futbol"] = "fa-thin fa-futbol";
  IconClassicThin2["Gear"] = "fa-thin fa-gear";
  IconClassicThin2["Gears"] = "fa-thin fa-gears";
  IconClassicThin2["Globe"] = "fa-thin fa-globe";
  IconClassicThin2["Hashtag"] = "fa-thin fa-hashtag";
  IconClassicThin2["HatWizard"] = "fa-thin fa-hat-wizard";
  IconClassicThin2["Headset"] = "fa-thin fa-headset";
  IconClassicThin2["Hospital"] = "fa-thin fa-hospital";
  IconClassicThin2["Hourglass"] = "fa-thin fa-hourglass";
  IconClassicThin2["HourglassClock"] = "fa-thin fa-hourglass-clock";
  IconClassicThin2["House"] = "fa-thin fa-house";
  IconClassicThin2["HouseMedical"] = "fa-thin fa-house-medical";
  IconClassicThin2["HouseUser"] = "fa-thin fa-house-user";
  IconClassicThin2["Image"] = "fa-thin fa-image";
  IconClassicThin2["Inbox"] = "fa-thin fa-inbox";
  IconClassicThin2["InboxFull"] = "fa-thin fa-inbox-full";
  IconClassicThin2["Info"] = "fa-thin fa-info";
  IconClassicThin2["Key"] = "fa-thin fa-key";
  IconClassicThin2["Keyboard"] = "fa-thin fa-keyboard";
  IconClassicThin2["KeySkeleton"] = "fa-thin fa-key-skeleton";
  IconClassicThin2["Laptop"] = "fa-thin fa-laptop";
  IconClassicThin2["LaptopMedical"] = "fa-thin fa-laptop-medical";
  IconClassicThin2["LevelDown"] = "fa-thin fa-level-down";
  IconClassicThin2["LevelDownAlt"] = "fa-thin fa-level-down-alt";
  IconClassicThin2["LevelLeft"] = "fa-thin fa-level-left";
  IconClassicThin2["LevelLeftAlt"] = "fa-thin fa-level-left-alt";
  IconClassicThin2["LevelRight"] = "fa-thin fa-level-right";
  IconClassicThin2["LevelRightAlt"] = "fa-thin fa-level-right-alt";
  IconClassicThin2["LevelUp"] = "fa-thin fa-level-up";
  IconClassicThin2["LevelUpAlt"] = "fa-thin fa-level-up-alt";
  IconClassicThin2["Link"] = "fa-thin fa-link";
  IconClassicThin2["LinkExternal"] = "fa-thin fa-arrow-up-right-from-square";
  IconClassicThin2["LinkHorizontal"] = "fa-thin fa-link-horizontal";
  IconClassicThin2["LinkHorizontalSlash"] = "fa-thin fa-link-horizontal-slash";
  IconClassicThin2["LinkSimple"] = "fa-thin fa-link-simple";
  IconClassicThin2["LinkSimpleSlash"] = "fa-thin fa-link-simple-slash";
  IconClassicThin2["LinkSlash"] = "fa-thin fa-link-slash";
  IconClassicThin2["List"] = "fa-thin fa-list";
  IconClassicThin2["ListCheck"] = "fa-thin fa-list-check";
  IconClassicThin2["ListOl"] = "fa-thin fa-list-ol";
  IconClassicThin2["ListTree"] = "fa-thin fa-list-tree";
  IconClassicThin2["ListUl"] = "fa-thin fa-list-ul";
  IconClassicThin2["LocationArrow"] = "fa-thin fa-location-arrow";
  IconClassicThin2["LocationCrossHairs"] = "fa-thin fa-location-crosshairs";
  IconClassicThin2["LocationCheck"] = "fa-thin fa-location-check";
  IconClassicThin2["LocationDot"] = "fa-thin fa-location-dot";
  IconClassicThin2["Lock"] = "fa-thin fa-lock";
  IconClassicThin2["LockOpen"] = "fa-thin fa-lock-open";
  IconClassicThin2["Login"] = "fa-thin fa-arrow-right-to-bracket";
  IconClassicThin2["Logout"] = "fa-thin fa-arrow-right-from-bracket";
  IconClassicThin2["MagnifyingGlass"] = "fa-thin fa-magnifying-glass";
  IconClassicThin2["MagnifyingGlassMinus"] = "fa-thin fa-magnifying-glass-minus";
  IconClassicThin2["MagnifyingGlassPlus"] = "fa-thin fa-magnifying-glass-plus";
  IconClassicThin2["Mail"] = "fa-thin fa-envelope";
  IconClassicThin2["Mailbox"] = "fa-thin fa-mailbox";
  IconClassicThin2["MailOpen"] = "fa-thin fa-envelope-open";
  IconClassicThin2["Map"] = "fa-thin fa-map";
  IconClassicThin2["MapLocation"] = "fa-thin fa-map-location";
  IconClassicThin2["MapLocationDot"] = "fa-thin fa-map-location-dot";
  IconClassicThin2["MapPin"] = "fa-thin fa-map-pin";
  IconClassicThin2["Maximize"] = "fa-thin fa-maximize";
  IconClassicThin2["Merge"] = "fa-thin fa-merge";
  IconClassicThin2["Message"] = "fa-thin fa-message";
  IconClassicThin2["MessageCode"] = "fa-thin fa-message-code";
  IconClassicThin2["MessageDots"] = "fa-thin fa-message-dots";
  IconClassicThin2["MessageLines"] = "fa-thin fa-message-lines";
  IconClassicThin2["Messages"] = "fa-thin fa-messages";
  IconClassicThin2["Microphone"] = "fa-thin fa-microphone";
  IconClassicThin2["MicrophoneLines"] = "fa-thin fa-microphone-lines";
  IconClassicThin2["MicrophoneLinesSlash"] = "fa-thin fa-microphone-lines-slash";
  IconClassicThin2["MicrophoneSlash"] = "fa-thin fa-microphone-slash";
  IconClassicThin2["Microscope"] = "fa-thin fa-microscope";
  IconClassicThin2["Minimize"] = "fa-thin fa-minimize";
  IconClassicThin2["Minus"] = "fa-thin fa-minus";
  IconClassicThin2["Mobile"] = "fa-thin fa-mobile";
  IconClassicThin2["MobileNotch"] = "fa-thin fa-mobile-notch";
  IconClassicThin2["MoneyCheckDollarPen"] = "fa-thin fa-money-check-dollar-pen";
  IconClassicThin2["Music"] = "fa-thin fa-music";
  IconClassicThin2["MusicSlash"] = "fa-thin fa-music-slash";
  IconClassicThin2["NewsPaper"] = "fa-thin fa-newspaper";
  IconClassicThin2["Palette"] = "fa-thin fa-palette";
  IconClassicThin2["PaperClip"] = "fa-thin fa-paperclip";
  IconClassicThin2["PaperClipVertical"] = "fa-thin fa-paperclip-vertical";
  IconClassicThin2["PaperPlane"] = "fa-thin fa-paper-plane";
  IconClassicThin2["PaperPlaneTop"] = "fa-thin fa-paper-plane-top";
  IconClassicThin2["Paste"] = "fa-thin fa-paste";
  IconClassicThin2["Pause"] = "fa-thin fa-pause";
  IconClassicThin2["Pen"] = "fa-thin fa-pen";
  IconClassicThin2["Pencil"] = "fa-thin fa-pencil";
  IconClassicThin2["PenToSquare"] = "fa-thin fa-pen-to-square";
  IconClassicThin2["PeopleArrowsLeftRight"] = "fa-thin fa-people-arrows-left-right";
  IconClassicThin2["Percentage"] = "fa-thin fa-percentage";
  IconClassicThin2["Period"] = "fa-thin fa-period";
  IconClassicThin2["PersonChalkboard"] = "fa-thin fa-person-chalkboard";
  IconClassicThin2["PersonMilitaryRifle"] = "fa-thin fa-person-military-rifle";
  IconClassicThin2["Phone"] = "fa-thin fa-phone";
  IconClassicThin2["Play"] = "fa-thin fa-play";
  IconClassicThin2["PlayPause"] = "fa-thin fa-play-pause";
  IconClassicThin2["Plus"] = "fa-thin fa-plus";
  IconClassicThin2["Print"] = "fa-thin fa-print";
  IconClassicThin2["Pumo"] = "fa-thin fa-font-awesome";
  IconClassicThin2["Question"] = "fa-thin fa-question";
  IconClassicThin2["Redo"] = "fa-thin fa-redo";
  IconClassicThin2["RedoAlt"] = "fa-thin fa-redo-alt";
  IconClassicThin2["Refresh"] = "fa-thin fa-arrows-rotate";
  IconClassicThin2["Remove"] = "fa-thin fa-xmark";
  IconClassicThin2["Repeat"] = "fa-thin fa-repeat";
  IconClassicThin2["Reply"] = "fa-thin fa-reply";
  IconClassicThin2["ReplyAll"] = "fa-thin fa-reply-all";
  IconClassicThin2["RightFromBracket"] = "fa-thin fa-right-from-bracket";
  IconClassicThin2["RightToBracket"] = "fa-thin fa-right-to-bracket";
  IconClassicThin2["Rotate"] = "fa-thin fa-rotate";
  IconClassicThin2["RotateLeft"] = "fa-thin fa-rotate-left";
  IconClassicThin2["SackDollar"] = "fa-thin fa-sack-dollar";
  IconClassicThin2["Save"] = "fa-thin fa-floppy-disk";
  IconClassicThin2["Scissors"] = "fa-thin fa-scissors";
  IconClassicThin2["ScrewdriverWrench"] = "fa-thin fa-screwdriver-wrench";
  IconClassicThin2["Search"] = "fa-thin fa-magnifying-glass";
  IconClassicThin2["SensorTriangleExclamation"] = "fa-thin fa-sensor-triangle-exclamation";
  IconClassicThin2["Settings"] = "fa-thin fa-gear";
  IconClassicThin2["Share"] = "fa-thin fa-share";
  IconClassicThin2["ShareAll"] = "fa-thin fa-share-all";
  IconClassicThin2["ShareNodes"] = "fa-thin fa-share-nodes";
  IconClassicThin2["ShareFromSquare"] = "fa-thin fa-share-from-square";
  IconClassicThin2["ShieldCheck"] = "fa-thin fa-shield-check";
  IconClassicThin2["Ship"] = "fa-thin fa-ship";
  IconClassicThin2["Sitemap"] = "fa-thin fa-sitemap";
  IconClassicThin2["Soccer"] = "fa-thin fa-futbol";
  IconClassicThin2["Sort"] = "fa-thin fa-sort";
  IconClassicThin2["SortDown"] = "fa-thin fa-sort-down";
  IconClassicThin2["SortUp"] = "fa-thin fa-sort-up";
  IconClassicThin2["Spinner"] = "fa-thin fa-spinner";
  IconClassicThin2["Split"] = "fa-thin fa-split";
  IconClassicThin2["SquareCheck"] = "fa-thin fa-square-check";
  IconClassicThin2["SquareMinus"] = "fa-thin fa-square-minus";
  IconClassicThin2["SquarePen"] = "fa-thin fa-square-pen";
  IconClassicThin2["Stamp"] = "fa-thin fa-stamp";
  IconClassicThin2["Star"] = "fa-thin fa-star";
  IconClassicThin2["StepBackward"] = "fa-thin fa-step-backward";
  IconClassicThin2["StepForward"] = "fa-thin fa-step-forward";
  IconClassicThin2["Stethoscope"] = "fa-thin fa-stethoscope";
  IconClassicThin2["Stop"] = "fa-thin fa-stop";
  IconClassicThin2["Table"] = "fa-thin fa-table";
  IconClassicThin2["TableRows"] = "fa-thin fa-table-rows";
  IconClassicThin2["Tablet"] = "fa-thin fa-tablet";
  IconClassicThin2["Tag"] = "fa-thin fa-tag";
  IconClassicThin2["Tags"] = "fa-thin fa-tags";
  IconClassicThin2["Tasks"] = "fa-thin fa-tasks";
  IconClassicThin2["ThumbsDown"] = "fa-thin fa-thumbs-down";
  IconClassicThin2["ThumbsUp"] = "fa-thin fa-thumbs-up";
  IconClassicThin2["Thumbtack"] = "fa-thin fa-thumbtack";
  IconClassicThin2["Timer"] = "fa-thin fa-timer";
  IconClassicThin2["Trash"] = "fa-thin fa-trash";
  IconClassicThin2["TrashCanList"] = "fa-thin fa-trash-can-list";
  IconClassicThin2["TrashUndo"] = "fa-thin fa-trash-undo";
  IconClassicThin2["TrashXmark"] = "fa-thin fa-trash-xmark";
  IconClassicThin2["TriangleExclamation"] = "fa-thin fa-triangle-exclamation";
  IconClassicThin2["Truck"] = "fa-thin fa-truck";
  IconClassicThin2["Undo"] = "fa-thin fa-arrow-rotate-left";
  IconClassicThin2["Unlock"] = "fa-thin fa-unlock";
  IconClassicThin2["Upload"] = "fa-thin fa-upload";
  IconClassicThin2["UsbDrive"] = "fa-thin fa-usb-drive";
  IconClassicThin2["User"] = "fa-thin fa-user";
  IconClassicThin2["UserCheck"] = "fa-thin fa-user-check";
  IconClassicThin2["UserClock"] = "fa-thin fa-user-clock";
  IconClassicThin2["UserDoctor"] = "fa-thin fa-user-doctor";
  IconClassicThin2["UserDoctorHair"] = "fa-thin fa-user-doctor-hair";
  IconClassicThin2["UserDoctorHairLong"] = "fa-thin fa-user-doctor-hair-long";
  IconClassicThin2["UserGear"] = "fa-thin fa-user-gear";
  IconClassicThin2["UserGroup"] = "fa-thin fa-user-group";
  IconClassicThin2["UserHair"] = "fa-thin fa-user-hair";
  IconClassicThin2["UserHairLong"] = "fa-thin fa-user-hair-long";
  IconClassicThin2["UserHeadset"] = "fa-thin fa-user-headset";
  IconClassicThin2["Users"] = "fa-thin fa-users";
  IconClassicThin2["UserSecret"] = "fa-thin fa-user-secret";
  IconClassicThin2["UsersMedical"] = "fa-thin fa-users-medical";
  IconClassicThin2["UserTag"] = "fa-thin fa-user-tag";
  IconClassicThin2["UserXmark"] = "fa-thin fa-user-xmark";
  IconClassicThin2["Video"] = "fa-thin fa-video";
  IconClassicThin2["VideoSlash"] = "fa-thin fa-video-slash";
  IconClassicThin2["Volume"] = "fa-thin fa-volume";
  IconClassicThin2["VolumeHigh"] = "fa-thin fa-volume-high";
  IconClassicThin2["VolumeLow"] = "fa-thin fa-volume-low";
  IconClassicThin2["VolumeOff"] = "fa-thin fa-volume-off";
  IconClassicThin2["VolumeSlash"] = "fa-thin fa-volume-slash";
  IconClassicThin2["VolumeXmark"] = "fa-thin fa-volume-xmark";
  IconClassicThin2["Wifi"] = "fa-thin fa-wifi";
  IconClassicThin2["WifiExclamation"] = "fa-thin fa-wifi-exclamation";
  IconClassicThin2["WifiFair"] = "fa-thin fa-wifi-fair";
  IconClassicThin2["WifiSlash"] = "fa-thin fa-wifi-slash";
  IconClassicThin2["Window"] = "fa-thin fa-window";
  IconClassicThin2["Xmark"] = "fa-thin fa-xmark";
  return IconClassicThin2;
})(IconClassicThin || {});
var IconSharpSolid = /* @__PURE__ */ ((IconSharpSolid2) => {
  IconSharpSolid2["Add"] = "fa-sharp fa-solid fa-plus";
  IconSharpSolid2["AddressCard"] = "fa-sharp fa-solid fa-address-card";
  IconSharpSolid2["Alert"] = "fa-sharp fa-solid fa-triangle-exclamation";
  IconSharpSolid2["AngleDown"] = "fa-sharp fa-solid fa-angle-down";
  IconSharpSolid2["AngleLeft"] = "fa-sharp fa-solid fa-angle-left";
  IconSharpSolid2["AngleRight"] = "fa-sharp fa-solid fa-angle-right";
  IconSharpSolid2["AngleUp"] = "fa-sharp fa-solid fa-angle-up";
  IconSharpSolid2["Aperture"] = "fa-sharp fa-solid fa-aperture";
  IconSharpSolid2["ArrowDown"] = "fa-sharp fa-solid fa-arrow-down";
  IconSharpSolid2["ArrowDownShortWide"] = "fa-sharp fa-solid fa-arrow-down-short-wide";
  IconSharpSolid2["ArrowDownWideShort"] = "fa-sharp fa-solid fa-arrow-down-wide-short";
  IconSharpSolid2["ArrowLeft"] = "fa-sharp fa-solid fa-arrow-left";
  IconSharpSolid2["ArrowPointer"] = "fa-sharp fa-solid fa-arrow-pointer";
  IconSharpSolid2["ArrowRight"] = "fa-sharp fa-solid fa-arrow-right";
  IconSharpSolid2["ArrowRightToBracket"] = "fa-sharp fa-solid fa-arrow-right-to-bracket";
  IconSharpSolid2["ArrowRightFromBracket"] = "fa-sharp fa-solid fa-arrow-right-from-bracket";
  IconSharpSolid2["ArrowRotateRight"] = "fa-sharp fa-solid fa-arrow-rotate-right";
  IconSharpSolid2["ArrowsRepeat"] = "fa-sharp fa-solid fa-arrows-repeat";
  IconSharpSolid2["ArrowsRotate"] = "fa-sharp fa-solid fa-arrows-rotate";
  IconSharpSolid2["ArrowUp"] = "fa-sharp fa-solid fa-arrow-up";
  IconSharpSolid2["Asterisk"] = "fa-sharp fa-solid fa-asterisk";
  IconSharpSolid2["At"] = "fa-sharp fa-solid fa-at";
  IconSharpSolid2["Attachment"] = "fa-sharp fa-solid fa-paperclip";
  IconSharpSolid2["Back"] = "fa-sharp fa-solid fa-angle-left";
  IconSharpSolid2["Backward"] = "fa-sharp fa-solid fa-backward";
  IconSharpSolid2["BackwardFast"] = "fa-sharp fa-solid fa-backward-fast";
  IconSharpSolid2["BackwardStep"] = "fa-sharp fa-solid fa-backward-step";
  IconSharpSolid2["BalanceScale"] = "fa-sharp fa-solid fa-balance-scale";
  IconSharpSolid2["BallotCheck"] = "fa-sharp fa-solid fa-ballot-check";
  IconSharpSolid2["Ban"] = "fa-sharp fa-solid fa-ban";
  IconSharpSolid2["Barcode"] = "fa-sharp fa-solid fa-barcode";
  IconSharpSolid2["BarcodeScan"] = "fa-sharp fa-solid fa-barcode-scan";
  IconSharpSolid2["Bars"] = "fa-sharp fa-solid fa-bars";
  IconSharpSolid2["BarsSort"] = "fa-sharp fa-solid fa-bars-sort";
  IconSharpSolid2["Bell"] = "fa-sharp fa-solid fa-bell";
  IconSharpSolid2["BellSlash"] = "fa-sharp fa-solid fa-bell-slash";
  IconSharpSolid2["Bolt"] = "fa-sharp fa-solid fa-bolt";
  IconSharpSolid2["Bomb"] = "fa-sharp fa-solid fa-bomb";
  IconSharpSolid2["Book"] = "fa-sharp fa-solid fa-book";
  IconSharpSolid2["BookOpen"] = "fa-sharp fa-solid fa-book-open";
  IconSharpSolid2["Box"] = "fa-sharp fa-solid fa-box";
  IconSharpSolid2["BoxArchive"] = "fa-sharp fa-solid fa-box-archive";
  IconSharpSolid2["BriefCase"] = "fa-sharp fa-solid fa-brief-case";
  IconSharpSolid2["Bug"] = "fa-sharp fa-solid fa-bug";
  IconSharpSolid2["Burger"] = "fa-sharp fa-solid fa-bars";
  IconSharpSolid2["CakeCandles"] = "fa-sharp fa-solid fa-cake-candles";
  IconSharpSolid2["Calendar"] = "fa-sharp fa-solid fa-calendar";
  IconSharpSolid2["CalendarAlt"] = "fa-sharp fa-solid fa-calendar-alt";
  IconSharpSolid2["CalendarCheck"] = "fa-sharp fa-solid fa-calendar-check";
  IconSharpSolid2["CalendarDay"] = "fa-sharp fa-solid fa-calendar-day";
  IconSharpSolid2["CalendarPlus"] = "fa-sharp fa-solid fa-calendar-plus";
  IconSharpSolid2["Camera"] = "fa-sharp fa-solid fa-camera";
  IconSharpSolid2["CameraAlt"] = "fa-sharp fa-solid fa-camera-alt";
  IconSharpSolid2["CameraWeb"] = "fa-sharp fa-solid fa-camera-web";
  IconSharpSolid2["CameraWebSlash"] = "fa-sharp fa-solid fa-camera-web-slash";
  IconSharpSolid2["Capsules"] = "fa-sharp fa-solid fa-capsules";
  IconSharpSolid2["CaretDown"] = "fa-sharp fa-solid fa-caret-down";
  IconSharpSolid2["CaretLeft"] = "fa-sharp fa-solid fa-caret-left";
  IconSharpSolid2["CaretRight"] = "fa-sharp fa-solid fa-caret-right";
  IconSharpSolid2["CaretUp"] = "fa-sharp fa-solid fa-caret-up";
  IconSharpSolid2["CartCirclePlus"] = "fa-sharp fa-solid fa-cart-circle-plus";
  IconSharpSolid2["CartShopping"] = "fa-sharp fa-solid fa-cart-shopping";
  IconSharpSolid2["ChartArea"] = "fa-sharp fa-solid fa-chart-area";
  IconSharpSolid2["ChartBar"] = "fa-sharp fa-solid fa-chart-bar";
  IconSharpSolid2["ChartColumn"] = "fa-sharp fa-solid fa-chart-column";
  IconSharpSolid2["ChartLine"] = "fa-sharp fa-solid fa-chart-line";
  IconSharpSolid2["ChartPie"] = "fa-sharp fa-solid fa-chart-pie";
  IconSharpSolid2["ChartSimple"] = "fa-sharp fa-solid fa-chart-simple";
  IconSharpSolid2["Chat"] = "fa-sharp fa-solid fa-comment";
  IconSharpSolid2["Check"] = "fa-sharp fa-solid fa-check";
  IconSharpSolid2["ChevronDown"] = "fa-sharp fa-solid fa-chevron-down";
  IconSharpSolid2["ChevronLeft"] = "fa-sharp fa-solid fa-chevron-left";
  IconSharpSolid2["ChevronRight"] = "fa-sharp fa-solid fa-chevron-right";
  IconSharpSolid2["ChevronUp"] = "fa-sharp fa-solid fa-chevron-up";
  IconSharpSolid2["Circle"] = "fa-sharp fa-solid fa-circle";
  IconSharpSolid2["CircleCheck"] = "fa-sharp fa-solid fa-circle-check";
  IconSharpSolid2["CircleExclamation"] = "fa-sharp fa-solid fa-circle-exclamation";
  IconSharpSolid2["CircleInfo"] = "fa-sharp fa-solid fa-circle-info";
  IconSharpSolid2["CircleSmall"] = "fa-sharp fa-solid fa-circle-small";
  IconSharpSolid2["CircleStop"] = "fa-sharp fa-solid fa-circle-stop";
  IconSharpSolid2["Clipboard"] = "fa-sharp fa-solid fa-clipboard";
  IconSharpSolid2["ClipboardMedical"] = "fa-sharp fa-solid fa-clipboard-medical";
  IconSharpSolid2["Clock"] = "fa-sharp fa-solid fa-clock";
  IconSharpSolid2["ClockRotateLeft"] = "fa-sharp fa-solid fa-clock-rotate-left";
  IconSharpSolid2["Close"] = "fa-sharp fa-solid fa-xmark";
  IconSharpSolid2["Cloud"] = "fa-sharp fa-solid fa-cloud";
  IconSharpSolid2["CloudArrowUp"] = "fa-sharp fa-solid fa-cloud-arrow-up";
  IconSharpSolid2["CloudDownload"] = "fa-sharp fa-solid fa-cloud-download";
  IconSharpSolid2["Code"] = "fa-sharp fa-solid fa-code";
  IconSharpSolid2["CodeMerge"] = "fa-sharp fa-solid fa-code-merge";
  IconSharpSolid2["Coins"] = "fa-sharp fa-solid fa-coins";
  IconSharpSolid2["Collapse"] = "fa-sharp fa-solid fa-compress";
  IconSharpSolid2["Comment"] = "fa-sharp fa-solid fa-comment";
  IconSharpSolid2["CommentDots"] = "fa-sharp fa-solid fa-comment-dots";
  IconSharpSolid2["CommentLines"] = "fa-sharp fa-solid fa-comment-lines";
  IconSharpSolid2["Comments"] = "fa-sharp fa-solid fa-comments";
  IconSharpSolid2["CommentSms"] = "fa-sharp fa-solid fa-comment-sms";
  IconSharpSolid2["Compress"] = "fa-sharp fa-solid fa-compress";
  IconSharpSolid2["Copy"] = "fa-sharp fa-solid fa-copy";
  IconSharpSolid2["Copyright"] = "fa-sharp fa-solid fa-copyright";
  IconSharpSolid2["CreditCard"] = "fa-sharp fa-solid fa-credit-card";
  IconSharpSolid2["Crown"] = "fa-sharp fa-solid fa-crown";
  IconSharpSolid2["Database"] = "fa-sharp fa-solid fa-database";
  IconSharpSolid2["Delete"] = "fa-sharp fa-solid fa-xmark";
  IconSharpSolid2["DeleteLeft"] = "fa-sharp fa-solid fa-delete-left";
  IconSharpSolid2["DeleteRight"] = "fa-sharp fa-solid fa-delete-right";
  IconSharpSolid2["Desktop"] = "fa-sharp fa-solid fa-desktop";
  IconSharpSolid2["Download"] = "fa-sharp fa-solid fa-download";
  IconSharpSolid2["Edit"] = "fa-sharp fa-solid fa-pen";
  IconSharpSolid2["Eject"] = "fa-sharp fa-solid fa-eject";
  IconSharpSolid2["Ellipsis"] = "fa-sharp fa-solid fa-ellipsis";
  IconSharpSolid2["EllipsisVertical"] = "fa-sharp fa-solid fa-ellipsis-vertical";
  IconSharpSolid2["Envelope"] = "fa-sharp fa-solid fa-envelope";
  IconSharpSolid2["Eraser"] = "fa-sharp fa-solid fa-eraser";
  IconSharpSolid2["EuroSign"] = "fa-sharp fa-solid fa-euro-sign";
  IconSharpSolid2["Exclamation"] = "fa-sharp fa-solid fa-exclamation";
  IconSharpSolid2["Expand"] = "fa-sharp fa-solid fa-expand";
  IconSharpSolid2["Eye"] = "fa-sharp fa-solid fa-eye";
  IconSharpSolid2["EyeSlash"] = "fa-sharp fa-solid fa-eye-slash";
  IconSharpSolid2["Family"] = "fa-sharp fa-solid fa-family";
  IconSharpSolid2["FastBackward"] = "fa-sharp fa-solid fa-fast-backward";
  IconSharpSolid2["FastForward"] = "fa-sharp fa-solid fa-fast-forward";
  IconSharpSolid2["File"] = "fa-sharp fa-solid fa-file";
  IconSharpSolid2["FileAudio"] = "fa-sharp fa-solid fa-file-audio";
  IconSharpSolid2["FileContract"] = "fa-sharp fa-solid fa-file-contract";
  IconSharpSolid2["FileDownload"] = "fa-sharp fa-solid fa-file-download";
  IconSharpSolid2["FileExcel"] = "fa-sharp fa-solid fa-file-excel";
  IconSharpSolid2["FileExport"] = "fa-sharp fa-solid fa-file-export";
  IconSharpSolid2["FileImage"] = "fa-sharp fa-solid fa-file-image";
  IconSharpSolid2["FileInvoice"] = "fa-sharp fa-solid fa-file-invoice";
  IconSharpSolid2["FileImport"] = "fa-sharp fa-solid fa-file-import";
  IconSharpSolid2["FileLines"] = "fa-sharp fa-solid fa-file-lines";
  IconSharpSolid2["FileMusic"] = "fa-sharp fa-solid fa-file-music";
  IconSharpSolid2["FilePdf"] = "fa-sharp fa-solid fa-file-pdf";
  IconSharpSolid2["Files"] = "fa-sharp fa-solid fa-file-files";
  IconSharpSolid2["FileSignature"] = "fa-sharp fa-solid fa-file-signature";
  IconSharpSolid2["FileVideo"] = "fa-sharp fa-solid fa-file-video";
  IconSharpSolid2["FileWord"] = "fa-sharp fa-solid fa-file-word";
  IconSharpSolid2["FileZipper"] = "fa-sharp fa-solid fa-file-zipper";
  IconSharpSolid2["Filter"] = "fa-sharp fa-solid fa-filter";
  IconSharpSolid2["Flag"] = "fa-sharp fa-solid fa-flag";
  IconSharpSolid2["FlagSwallowTail"] = "fa-sharp fa-solid fa-flag-swallowtail";
  IconSharpSolid2["FloppyDisk"] = "fa-sharp fa-solid fa-floppy-disk";
  IconSharpSolid2["Folder"] = "fa-sharp fa-solid fa-folder";
  IconSharpSolid2["FolderOpen"] = "fa-sharp fa-solid fa-folder-open";
  IconSharpSolid2["FontAwesome"] = "fa-sharp fa-solid  fa-font-awesome";
  IconSharpSolid2["Forward"] = "fa-sharp fa-solid fa-forward";
  IconSharpSolid2["ForwardStep"] = "fa-sharp fa-solid fa-forward-step";
  IconSharpSolid2["ForwardFast"] = "fa-sharp fa-solid fa-forward-fast";
  IconSharpSolid2["Futbol"] = "fa-sharp fa-solid fa-futbol";
  IconSharpSolid2["Gear"] = "fa-sharp fa-solid fa-gear";
  IconSharpSolid2["Gears"] = "fa-sharp fa-solid fa-gears";
  IconSharpSolid2["Globe"] = "fa-sharp fa-solid fa-globe";
  IconSharpSolid2["Hashtag"] = "fa-sharp fa-solid fa-hashtag";
  IconSharpSolid2["HatWizard"] = "fa-sharp fa-solid fa-hat-wizard";
  IconSharpSolid2["Headset"] = "fa-sharp fa-solid fa-headset";
  IconSharpSolid2["Hospital"] = "fa-sharp fa-solid fa-hospital";
  IconSharpSolid2["Hourglass"] = "fa-sharp fa-solid fa-hourglass";
  IconSharpSolid2["HourglassClock"] = "fa-sharp fa-solid fa-hourglass-clock";
  IconSharpSolid2["House"] = "fa-sharp fa-solid fa-house";
  IconSharpSolid2["HouseMedical"] = "fa-sharp fa-solid fa-house-medical";
  IconSharpSolid2["HouseUser"] = "fa-sharp fa-solid fa-house-user";
  IconSharpSolid2["Image"] = "fa-sharp fa-solid fa-image";
  IconSharpSolid2["Inbox"] = "fa-sharp fa-solid fa-inbox";
  IconSharpSolid2["InboxFull"] = "fa-sharp fa-solid fa-inbox-full";
  IconSharpSolid2["Info"] = "fa-sharp fa-solid fa-info";
  IconSharpSolid2["Key"] = "fa-sharp fa-solid fa-key";
  IconSharpSolid2["Keyboard"] = "fa-sharp fa-solid fa-keyboard";
  IconSharpSolid2["KeySkeleton"] = "fa-sharp fa-solid fa-key-skeleton";
  IconSharpSolid2["Laptop"] = "fa-sharp fa-solid fa-laptop";
  IconSharpSolid2["LaptopMedical"] = "fa-sharp fa-solid fa-laptop-medical";
  IconSharpSolid2["LevelDown"] = "fa-sharp fa-solid fa-level-down";
  IconSharpSolid2["LevelDownAlt"] = "fa-sharp fa-solid fa-level-down-alt";
  IconSharpSolid2["LevelLeft"] = "fa-sharp fa-solid fa-level-left";
  IconSharpSolid2["LevelLeftAlt"] = "fa-sharp fa-solid fa-level-left-alt";
  IconSharpSolid2["LevelRight"] = "fa-sharp fa-solid fa-level-right";
  IconSharpSolid2["LevelRightAlt"] = "fa-sharp fa-solid fa-level-right-alt";
  IconSharpSolid2["LevelUp"] = "fa-sharp fa-solid fa-level-up";
  IconSharpSolid2["LevelUpAlt"] = "fa-sharp fa-solid fa-level-up-alt";
  IconSharpSolid2["Link"] = "fa-sharp fa-solid fa-link";
  IconSharpSolid2["LinkExternal"] = "fa-sharp fa-solid fa-arrow-up-right-from-square";
  IconSharpSolid2["LinkHorizontal"] = "fa-sharp fa-solid fa-link-horizontal";
  IconSharpSolid2["LinkHorizontalSlash"] = "fa-sharp fa-solid fa-link-horizontal-slash";
  IconSharpSolid2["LinkSimple"] = "fa-sharp fa-solid fa-link-simple";
  IconSharpSolid2["LinkSimpleSlash"] = "fa-sharp fa-solid fa-link-simple-slash";
  IconSharpSolid2["LinkSlash"] = "fa-sharp fa-solid fa-link-slash";
  IconSharpSolid2["List"] = "fa-sharp fa-solid fa-list";
  IconSharpSolid2["ListCheck"] = "fa-sharp fa-solid fa-list-check";
  IconSharpSolid2["ListOl"] = "fa-sharp fa-solid fa-list-ol";
  IconSharpSolid2["ListTree"] = "fa-sharp fa-solid fa-list-tree";
  IconSharpSolid2["ListUl"] = "fa-sharp fa-solid fa-list-ul";
  IconSharpSolid2["LocationArrow"] = "fa-sharp fa-solid fa-location-arrow";
  IconSharpSolid2["LocationCrossHairs"] = "fa-sharp fa-solid fa-location-crosshairs";
  IconSharpSolid2["LocationCheck"] = "fa-sharp fa-solid fa-location-check";
  IconSharpSolid2["LocationDot"] = "fa-sharp fa-solid fa-location-dot";
  IconSharpSolid2["Lock"] = "fa-sharp fa-solid fa-lock";
  IconSharpSolid2["LockOpen"] = "fa-sharp fa-solid fa-lock-open";
  IconSharpSolid2["Login"] = "fa-sharp fa-solid fa-arrow-right-to-bracket";
  IconSharpSolid2["Logout"] = "fa-sharp fa-solid fa-arrow-right-from-bracket";
  IconSharpSolid2["MagnifyingGlass"] = "fa-sharp fa-solid fa-magnifying-glass";
  IconSharpSolid2["MagnifyingGlassMinus"] = "fa-sharp fa-solid fa-magnifying-glass-minus";
  IconSharpSolid2["MagnifyingGlassPlus"] = "fa-sharp fa-solid fa-magnifying-glass-plus";
  IconSharpSolid2["Mail"] = "fa-sharp fa-solid fa-envelope";
  IconSharpSolid2["Mailbox"] = "fa-sharp fa-solid fa-mailbox";
  IconSharpSolid2["MailOpen"] = "fa-sharp fa-solid fa-envelope-open";
  IconSharpSolid2["Map"] = "fa-sharp fa-solid fa-map";
  IconSharpSolid2["MapLocation"] = "fa-sharp fa-solid fa-map-location";
  IconSharpSolid2["MapLocationDot"] = "fa-sharp fa-solid fa-map-location-dot";
  IconSharpSolid2["MapPin"] = "fa-sharp fa-solid fa-map-pin";
  IconSharpSolid2["Maximize"] = "fa-sharp fa-solid fa-maximize";
  IconSharpSolid2["Merge"] = "fa-sharp fa-solid fa-merge";
  IconSharpSolid2["Message"] = "fa-sharp fa-solid fa-message";
  IconSharpSolid2["MessageCode"] = "fa-sharp fa-solid fa-message-code";
  IconSharpSolid2["MessageDots"] = "fa-sharp fa-solid fa-message-dots";
  IconSharpSolid2["MessageLines"] = "fa-sharp fa-solid fa-message-lines";
  IconSharpSolid2["Messages"] = "fa-sharp fa-solid fa-messages";
  IconSharpSolid2["Microphone"] = "fa-sharp fa-solid fa-microphone";
  IconSharpSolid2["MicrophoneLines"] = "fa-sharp fa-solid fa-microphone-lines";
  IconSharpSolid2["MicrophoneLinesSlash"] = "fa-sharp fa-solid fa-microphone-lines-slash";
  IconSharpSolid2["MicrophoneSlash"] = "fa-sharp fa-solid fa-microphone-slash";
  IconSharpSolid2["Microscope"] = "fa-sharp fa-solid fa-microscope";
  IconSharpSolid2["Minimize"] = "fa-sharp fa-solid fa-minimize";
  IconSharpSolid2["Minus"] = "fa-sharp fa-solid fa-minus";
  IconSharpSolid2["Mobile"] = "fa-sharp fa-solid fa-mobile";
  IconSharpSolid2["MobileNotch"] = "fa-sharp fa-solid fa-mobile-notch";
  IconSharpSolid2["MoneyCheckDollarPen"] = "fa-sharp fa-solid fa-money-check-dollar-pen";
  IconSharpSolid2["Music"] = "fa-sharp fa-solid fa-music";
  IconSharpSolid2["MusicSlash"] = "fa-sharp fa-solid fa-music-slash";
  IconSharpSolid2["NewsPaper"] = "fa-sharp fa-solid fa-newspaper";
  IconSharpSolid2["Palette"] = "fa-sharp fa-solid fa-palette";
  IconSharpSolid2["PaperClip"] = "fa-sharp fa-solid fa-paperclip";
  IconSharpSolid2["PaperClipVertical"] = "fa-sharp fa-solid fa-paperclip-vertical";
  IconSharpSolid2["PaperPlane"] = "fa-sharp fa-solid fa-paper-plane";
  IconSharpSolid2["PaperPlaneTop"] = "fa-sharp fa-solid fa-paper-plane-top";
  IconSharpSolid2["Paste"] = "fa-sharp fa-solid fa-paste";
  IconSharpSolid2["Pause"] = "fa-sharp fa-solid fa-pause";
  IconSharpSolid2["Pencil"] = "fa-sharp fa-solid fa-pencil";
  IconSharpSolid2["Pen"] = "fa-sharp fa-solid fa-pen";
  IconSharpSolid2["PenToSquare"] = "fa-sharp fa-solid fa-pen-to-square";
  IconSharpSolid2["PeopleArrowsLeftRight"] = "fa-sharp fa-solid fa-people-arrows-left-right";
  IconSharpSolid2["Percentage"] = "fa-sharp fa-solid fa-percentage";
  IconSharpSolid2["Period"] = "fa-sharp fa-solid fa-period";
  IconSharpSolid2["PersonChalkboard"] = "fa-sharp fa-solid fa-person-chalkboard";
  IconSharpSolid2["PersonMilitaryRifle"] = "fa-sharp fa-solid fa-person-military-rifle";
  IconSharpSolid2["Phone"] = "fa-sharp fa-solid fa-phone";
  IconSharpSolid2["Play"] = "fa-sharp fa-solid fa-play";
  IconSharpSolid2["PlayPause"] = "fa-sharp fa-solid fa-play-pause";
  IconSharpSolid2["Plus"] = "fa-sharp fa-solid fa-plus";
  IconSharpSolid2["Print"] = "fa-sharp fa-solid fa-print";
  IconSharpSolid2["Pumo"] = "fa-sharp fa-solid fa-font-awesome";
  IconSharpSolid2["Question"] = "fa-sharp fa-solid fa-question";
  IconSharpSolid2["Redo"] = "fa-sharp fa-solid fa-redo";
  IconSharpSolid2["RedoAlt"] = "fa-sharp fa-solid fa-redo-alt";
  IconSharpSolid2["Refresh"] = "fa-sharp fa-solid fa-arrows-rotate";
  IconSharpSolid2["Remove"] = "fa-sharp fa-solid fa-xmark";
  IconSharpSolid2["Repeat"] = "fa-sharp fa-solid fa-repeat";
  IconSharpSolid2["Reply"] = "fa-sharp fa-solid fa-reply";
  IconSharpSolid2["ReplyAll"] = "fa-sharp fa-solid fa-reply-all";
  IconSharpSolid2["RightFromBracket"] = "fa-sharp fa-solid fa-right-from-bracket";
  IconSharpSolid2["RightToBracket"] = "fa-sharp fa-solid fa-right-to-bracket";
  IconSharpSolid2["Rotate"] = "fa-sharp fa-solid fa-rotate";
  IconSharpSolid2["RotateLeft"] = "fa-sharp fa-solid fa-rotate-left";
  IconSharpSolid2["SackDollar"] = "fa-sharp fa-solid fa-sack-dollar";
  IconSharpSolid2["Save"] = "fa-sharp fa-solid fa-floppy-disk";
  IconSharpSolid2["Scissors"] = "fa-sharp fa-solid fa-scissors";
  IconSharpSolid2["ScrewdriverWrench"] = "fa-sharp fa-solid fa-screwdriver-wrench";
  IconSharpSolid2["Search"] = "fa-sharp fa-solid fa-magnifying-glass";
  IconSharpSolid2["SensorTriangleExclamation"] = "fa-sharp fa-solid fa-sensor-triangle-exclamation";
  IconSharpSolid2["Settings"] = "fa-sharp fa-solid fa-gear";
  IconSharpSolid2["Share"] = "fa-sharp fa-solid fa-share";
  IconSharpSolid2["ShareAll"] = "fa-sharp fa-solid fa-share-all";
  IconSharpSolid2["ShareNodes"] = "fa-sharp fa-solid fa-share-nodes";
  IconSharpSolid2["ShareFromSquare"] = "fa-sharp fa-solid fa-share-from-square";
  IconSharpSolid2["ShieldCheck"] = "fa-sharp fa-solid fa-shield-check";
  IconSharpSolid2["Ship"] = "fa-sharp fa-solid fa-ship";
  IconSharpSolid2["Sitemap"] = "fa-sharp fa-solid fa-sitemap";
  IconSharpSolid2["Soccer"] = "fa-sharp fa-solid fa-futbol";
  IconSharpSolid2["Sort"] = "fa-sharp fa-solid fa-sort";
  IconSharpSolid2["SortDown"] = "fa-sharp fa-solid fa-sort-down";
  IconSharpSolid2["SortUp"] = "fa-sharp fa-solid fa-sort-up";
  IconSharpSolid2["Spinner"] = "fa-sharp fa-solid fa-spinner";
  IconSharpSolid2["Split"] = "fa-sharp fa-solid fa-split";
  IconSharpSolid2["SquareCheck"] = "fa-sharp fa-solid fa-square-check";
  IconSharpSolid2["SquareMinus"] = "fa-sharp fa-solid fa-square-minus";
  IconSharpSolid2["SquarePen"] = "fa-sharp fa-solid fa-square-pen";
  IconSharpSolid2["Star"] = "fa-sharp fa-solid fa-star";
  IconSharpSolid2["StepBackward"] = "fa-sharp fa-solid fa-step-backward";
  IconSharpSolid2["StepForward"] = "fa-sharp fa-solid fa-step-forward";
  IconSharpSolid2["Stethoscope"] = "fa-sharp fa-solid fa-stethoscope";
  IconSharpSolid2["Stop"] = "fa-sharp fa-solid fa-stop";
  IconSharpSolid2["Table"] = "fa-sharp fa-solid fa-table";
  IconSharpSolid2["TableRows"] = "fa-sharp fa-solid fa-table-rows";
  IconSharpSolid2["Tablet"] = "fa-sharp fa-solid fa-tablet";
  IconSharpSolid2["Tag"] = "fa-sharp fa-solid fa-tag";
  IconSharpSolid2["Tags"] = "fa-sharp fa-solid fa-tags";
  IconSharpSolid2["Tasks"] = "fa-sharp fa-solid fa-tasks";
  IconSharpSolid2["ThumbsDown"] = "fa-sharp fa-solid fa-thumbs-down";
  IconSharpSolid2["ThumbsUp"] = "fa-sharp fa-solid fa-thumbs-up";
  IconSharpSolid2["Thumbtack"] = "fa-sharp fa-solid fa-thumbtack";
  IconSharpSolid2["Trash"] = "fa-sharp fa-solid fa-trash";
  IconSharpSolid2["TrashCanList"] = "fa-sharp fa-solid fa-trash-can-list";
  IconSharpSolid2["TrashUndo"] = "fa-sharp fa-solid fa-trash-undo";
  IconSharpSolid2["TrashXmark"] = "fa-sharp fa-solid fa-trash-xmark";
  IconSharpSolid2["TriangleExclamation"] = "fa-sharp fa-solid fa-triangle-exclamation";
  IconSharpSolid2["Truck"] = "fa-sharp fa-solid fa-truck";
  IconSharpSolid2["Undo"] = "fa-sharp fa-solid fa-arrow-rotate-left";
  IconSharpSolid2["Unlock"] = "fa-sharp fa-solid fa-unlock";
  IconSharpSolid2["Upload"] = "fa-sharp fa-solid fa-upload";
  IconSharpSolid2["UsbDrive"] = "fa-sharp fa-solid fa-usb-drive";
  IconSharpSolid2["User"] = "fa-sharp fa-solid fa-user";
  IconSharpSolid2["UserCheck"] = "fa-sharp fa-solid fa-user-check";
  IconSharpSolid2["UserClock"] = "fa-sharp fa-solid fa-user-clock";
  IconSharpSolid2["UserDoctor"] = "fa-sharp fa-solid fa-user-doctor";
  IconSharpSolid2["UserDoctorHair"] = "fa-sharp fa-solid fa-user-doctor-hair";
  IconSharpSolid2["UserDoctorHairLong"] = "fa-sharp fa-solid fa-user-doctor-hair-long";
  IconSharpSolid2["UserGear"] = "fa-sharp fa-solid fa-user-gear";
  IconSharpSolid2["UserGroup"] = "fa-sharp fa-solid fa-user-group";
  IconSharpSolid2["UserHair"] = "fa-sharp fa-solid fa-user-hair";
  IconSharpSolid2["UserHairLong"] = "fa-sharp fa-solid fa-user-hair-long";
  IconSharpSolid2["UserHeadset"] = "fa-sharp fa-solid fa-user-headset";
  IconSharpSolid2["Users"] = "fa-sharp fa-solid fa-users";
  IconSharpSolid2["UserSecret"] = "fa-sharp fa-solid fa-user-secret";
  IconSharpSolid2["UsersMedical"] = "fa-sharp fa-solid fa-users-medical";
  IconSharpSolid2["UserTag"] = "fa-sharp fa-solid fa-user-tag";
  IconSharpSolid2["UserXmark"] = "fa-sharp fa-solid fa-user-xmark";
  IconSharpSolid2["Video"] = "fa-sharp fa-solid fa-video";
  IconSharpSolid2["VideoSlash"] = "fa-sharp fa-solid fa-video-slash";
  IconSharpSolid2["Volume"] = "fa-sharp fa-solid fa-volume";
  IconSharpSolid2["VolumeHigh"] = "fa-sharp fa-solid fa-volume-high";
  IconSharpSolid2["VolumeLow"] = "fa-sharp fa-solid fa-volume-low";
  IconSharpSolid2["VolumeOff"] = "fa-sharp fa-solid fa-volume-off";
  IconSharpSolid2["VolumeSlash"] = "fa-sharp fa-solid fa-volume-slash";
  IconSharpSolid2["VolumeXmark"] = "fa-sharp fa-solid fa-volume-xmark";
  IconSharpSolid2["Wifi"] = "fa-sharp fa-solid fa-wifi";
  IconSharpSolid2["WifiExclamation"] = "fa-sharp fa-solid fa-wifi-exclamation";
  IconSharpSolid2["WifiFair"] = "fa-sharp fa-solid fa-wifi-fair";
  IconSharpSolid2["WifiSlash"] = "fa-sharp fa-solid fa-wifi-slash";
  IconSharpSolid2["Window"] = "fa-sharp fa-solid fa-window";
  IconSharpSolid2["Xmark"] = "fa-sharp fa-solid fa-xmark";
  return IconSharpSolid2;
})(IconSharpSolid || {});
var IconSharpLight = /* @__PURE__ */ ((IconSharpLight2) => {
  IconSharpLight2["Add"] = "fa-sharp fa-light fa-plus";
  IconSharpLight2["AddressCard"] = "fa-sharp fa-light fa-address-card";
  IconSharpLight2["Alert"] = "fa-sharp fa-light fa-triangle-exclamation";
  IconSharpLight2["AngleDown"] = "fa-sharp fa-light fa-angle-down";
  IconSharpLight2["AngleLeft"] = "fa-sharp fa-light fa-angle-left";
  IconSharpLight2["AngleRight"] = "fa-sharp fa-light fa-angle-right";
  IconSharpLight2["AngleUp"] = "fa-sharp fa-light fa-angle-up";
  IconSharpLight2["Aperture"] = "fa-sharp fa-light fa-aperture";
  IconSharpLight2["ArrowDown"] = "fa-sharp fa-light fa-arrow-down";
  IconSharpLight2["ArrowDownShortWide"] = "fa-sharp fa-light fa-arrow-down-short-wide";
  IconSharpLight2["ArrowDownWideShort"] = "fa-sharp fa-light fa-arrow-down-wide-short";
  IconSharpLight2["ArrowLeft"] = "fa-sharp fa-light fa-arrow-left";
  IconSharpLight2["ArrowPointer"] = "fa-sharp fa-light fa-arrow-pointer";
  IconSharpLight2["ArrowRight"] = "fa-sharp fa-light fa-arrow-right";
  IconSharpLight2["ArrowRightToBracket"] = "fa-sharp fa-light fa-arrow-right-to-bracket";
  IconSharpLight2["ArrowRightFromBracket"] = "fa-sharp fa-light fa-arrow-right-from-bracket";
  IconSharpLight2["ArrowRotateRight"] = "fa-sharp fa-light fa-arrow-rotate-right";
  IconSharpLight2["ArrowsRepeat"] = "fa-sharp fa-light fa-arrows-repeat";
  IconSharpLight2["ArrowsRotate"] = "fa-sharp fa-light fa-arrows-rotate";
  IconSharpLight2["ArrowUp"] = "fa-sharp fa-light fa-arrow-up";
  IconSharpLight2["Asterisk"] = "fa-sharp fa-light fa-asterisk";
  IconSharpLight2["At"] = "fa-sharp fa-light fa-at";
  IconSharpLight2["Attachment"] = "fa-sharp fa-light fa-paperclip";
  IconSharpLight2["Back"] = "fa-sharp fa-light fa-angle-left";
  IconSharpLight2["Backward"] = "fa-sharp fa-light fa-backward";
  IconSharpLight2["BackwardFast"] = "fa-sharp fa-light fa-backward-fast";
  IconSharpLight2["BackwardStep"] = "fa-sharp fa-light fa-backward-step";
  IconSharpLight2["BalanceScale"] = "fa-sharp fa-light fa-balance-scale";
  IconSharpLight2["BallotCheck"] = "fa-sharp fa-light fa-ballot-check";
  IconSharpLight2["Ban"] = "fa-sharp fa-light fa-ban";
  IconSharpLight2["Barcode"] = "fa-sharp fa-light fa-barcode";
  IconSharpLight2["BarcodeScan"] = "fa-sharp fa-light fa-barcode-scan";
  IconSharpLight2["Bars"] = "fa-sharp fa-light fa-bars";
  IconSharpLight2["BarsSort"] = "fa-sharp fa-light fa-bars-sort";
  IconSharpLight2["Bell"] = "fa-sharp fa-light fa-bell";
  IconSharpLight2["BellSlash"] = "fa-sharp fa-light fa-bell-slash";
  IconSharpLight2["Bolt"] = "fa-sharp fa-light fa-bolt";
  IconSharpLight2["Bomb"] = "fa-sharp fa-light fa-bomb";
  IconSharpLight2["Book"] = "fa-sharp fa-light fa-book";
  IconSharpLight2["BookOpen"] = "fa-sharp fa-light fa-book-open";
  IconSharpLight2["Box"] = "fa-sharp fa-light fa-box";
  IconSharpLight2["BoxArchive"] = "fa-sharp fa-light fa-box-archive";
  IconSharpLight2["BriefCase"] = "fa-sharp fa-light fa-brief-case";
  IconSharpLight2["Bug"] = "fa-sharp fa-light fa-bug";
  IconSharpLight2["Burger"] = "fa-sharp fa-light fa-bars";
  IconSharpLight2["CakeCandles"] = "fa-sharp fa-light fa-cake-candles";
  IconSharpLight2["Calendar"] = "fa-sharp fa-light fa-calendar";
  IconSharpLight2["CalendarAlt"] = "fa-sharp fa-light fa-calendar-alt";
  IconSharpLight2["CalendarCheck"] = "fa-sharp fa-light fa-calendar-check";
  IconSharpLight2["CalendarDay"] = "fa-sharp fa-light fa-calendar-day";
  IconSharpLight2["CalendarPlus"] = "fa-sharp fa-light fa-calendar-plus";
  IconSharpLight2["Camera"] = "fa-sharp fa-light fa-camera";
  IconSharpLight2["CameraAlt"] = "fa-sharp fa-light fa-camera-alt";
  IconSharpLight2["CameraWeb"] = "fa-sharp fa-light fa-camera-web";
  IconSharpLight2["CameraWebSlash"] = "fa-sharp fa-light fa-camera-web-slash";
  IconSharpLight2["Capsules"] = "fa-sharp fa-light fa-capsules";
  IconSharpLight2["CaretDown"] = "fa-sharp fa-light fa-caret-down";
  IconSharpLight2["CaretLeft"] = "fa-sharp fa-light fa-caret-left";
  IconSharpLight2["CaretRight"] = "fa-sharp fa-light fa-caret-right";
  IconSharpLight2["CaretUp"] = "fa-sharp fa-light fa-caret-up";
  IconSharpLight2["CartCirclePlus"] = "fa-sharp fa-light fa-cart-circle-plus";
  IconSharpLight2["CartShopping"] = "fa-sharp fa-light fa-cart-shopping";
  IconSharpLight2["ChartArea"] = "fa-sharp fa-light fa-chart-area";
  IconSharpLight2["ChartBar"] = "fa-sharp fa-light fa-chart-bar";
  IconSharpLight2["ChartColumn"] = "fa-sharp fa-light fa-chart-column";
  IconSharpLight2["ChartLine"] = "fa-sharp fa-light fa-chart-line";
  IconSharpLight2["ChartPie"] = "fa-sharp fa-light fa-chart-pie";
  IconSharpLight2["ChartSimple"] = "fa-sharp fa-light fa-chart-simple";
  IconSharpLight2["Chat"] = "fa-sharp fa-light fa-comment";
  IconSharpLight2["Check"] = "fa-sharp fa-light fa-check";
  IconSharpLight2["ChevronDown"] = "fa-sharp fa-light fa-chevron-down";
  IconSharpLight2["ChevronLeft"] = "fa-sharp fa-light fa-chevron-left";
  IconSharpLight2["ChevronRight"] = "fa-sharp fa-light fa-chevron-right";
  IconSharpLight2["ChevronUp"] = "fa-sharp fa-light fa-chevron-up";
  IconSharpLight2["Circle"] = "fa-sharp fa-light fa-circle";
  IconSharpLight2["CircleCheck"] = "fa-sharp fa-light fa-circle-check";
  IconSharpLight2["CircleExclamation"] = "fa-sharp fa-light fa-circle-exclamation";
  IconSharpLight2["CircleInfo"] = "fa-sharp fa-light fa-circle-info";
  IconSharpLight2["CircleSmall"] = "fa-sharp fa-light fa-circle-small";
  IconSharpLight2["CircleStop"] = "fa-sharp fa-light fa-circle-stop";
  IconSharpLight2["Clipboard"] = "fa-sharp fa-light fa-clipboard";
  IconSharpLight2["ClipboardMedical"] = "fa-sharp fa-light fa-clipboard-medical";
  IconSharpLight2["Clock"] = "fa-sharp fa-light fa-clock";
  IconSharpLight2["ClockRotateLeft"] = "fa-sharp fa-light fa-clock-rotate-left";
  IconSharpLight2["Close"] = "fa-sharp fa-light fa-xmark";
  IconSharpLight2["Cloud"] = "fa-sharp fa-light fa-cloud";
  IconSharpLight2["CloudArrowUp"] = "fa-sharp fa-light fa-cloud-arrow-up";
  IconSharpLight2["CloudDownload"] = "fa-sharp fa-light fa-cloud-download";
  IconSharpLight2["Code"] = "fa-sharp fa-light fa-code";
  IconSharpLight2["CodeMerge"] = "fa-sharp fa-light fa-code-merge";
  IconSharpLight2["Coins"] = "fa-sharp fa-light fa-coins";
  IconSharpLight2["Collapse"] = "fa-sharp fa-light fa-compress";
  IconSharpLight2["Comment"] = "fa-sharp fa-light fa-comment";
  IconSharpLight2["CommentDots"] = "fa-sharp fa-light fa-comment-dots";
  IconSharpLight2["CommentLines"] = "fa-sharp fa-light fa-comment-lines";
  IconSharpLight2["Comments"] = "fa-sharp fa-light fa-comments";
  IconSharpLight2["CommentSms"] = "fa-sharp fa-light fa-comment-sms";
  IconSharpLight2["Compress"] = "fa-sharp fa-light fa-compress";
  IconSharpLight2["Copy"] = "fa-sharp fa-light fa-copy";
  IconSharpLight2["Copyright"] = "fa-sharp fa-light fa-copyright";
  IconSharpLight2["CreditCard"] = "fa-sharp fa-light fa-credit-card";
  IconSharpLight2["Crown"] = "fa-sharp fa-light fa-crown";
  IconSharpLight2["Database"] = "fa-sharp fa-light fa-database";
  IconSharpLight2["Delete"] = "fa-sharp fa-light fa-xmark";
  IconSharpLight2["DeleteLeft"] = "fa-sharp fa-light fa-delete-left";
  IconSharpLight2["DeleteRight"] = "fa-sharp fa-light fa-delete-right";
  IconSharpLight2["Desktop"] = "fa-sharp fa-light fa-desktop";
  IconSharpLight2["Download"] = "fa-sharp fa-light fa-download";
  IconSharpLight2["Edit"] = "fa-sharp fa-light fa-pen";
  IconSharpLight2["Eject"] = "fa-sharp fa-light fa-eject";
  IconSharpLight2["Ellipsis"] = "fa-sharp fa-light fa-ellipsis";
  IconSharpLight2["EllipsisVertical"] = "fa-sharp fa-light fa-ellipsis-vertical";
  IconSharpLight2["Envelope"] = "fa-sharp fa-light fa-envelope";
  IconSharpLight2["Eraser"] = "fa-sharp fa-light fa-eraser";
  IconSharpLight2["EuroSign"] = "fa-sharp fa-light fa-euro-sign";
  IconSharpLight2["Exclamation"] = "fa-sharp fa-light fa-exclamation";
  IconSharpLight2["Expand"] = "fa-sharp fa-light fa-expand";
  IconSharpLight2["Eye"] = "fa-sharp fa-light fa-eye";
  IconSharpLight2["EyeSlash"] = "fa-sharp fa-light fa-eye-slash";
  IconSharpLight2["Family"] = "fa-sharp fa-light fa-family";
  IconSharpLight2["FastBackward"] = "fa-sharp fa-light fa-fast-backward";
  IconSharpLight2["FastForward"] = "fa-sharp fa-light fa-fast-forward";
  IconSharpLight2["File"] = "fa-sharp fa-light fa-file";
  IconSharpLight2["FileAudio"] = "fa-sharp fa-light fa-file-audio";
  IconSharpLight2["FileContract"] = "fa-sharp fa-light fa-file-contract";
  IconSharpLight2["FileDownload"] = "fa-sharp fa-light fa-file-download";
  IconSharpLight2["FileExcel"] = "fa-sharp fa-light fa-file-excel";
  IconSharpLight2["FileExport"] = "fa-sharp fa-light fa-file-export";
  IconSharpLight2["FileImage"] = "fa-sharp fa-light fa-file-image";
  IconSharpLight2["FileInvoice"] = "fa-sharp fa-light fa-file-invoice";
  IconSharpLight2["FileImport"] = "fa-sharp fa-light fa-file-import";
  IconSharpLight2["FileLines"] = "fa-sharp fa-light fa-file-lines";
  IconSharpLight2["FileMusic"] = "fa-sharp fa-light fa-file-music";
  IconSharpLight2["FilePdf"] = "fa-sharp fa-light fa-file-pdf";
  IconSharpLight2["Files"] = "fa-sharp fa-light fa-file-files";
  IconSharpLight2["FileSignature"] = "fa-sharp fa-light fa-file-signature";
  IconSharpLight2["FileVideo"] = "fa-sharp fa-light fa-file-video";
  IconSharpLight2["FileWord"] = "fa-sharp fa-light fa-file-word";
  IconSharpLight2["FileZipper"] = "fa-sharp fa-light fa-file-zipper";
  IconSharpLight2["Filter"] = "fa-sharp fa-light fa-filter";
  IconSharpLight2["Flag"] = "fa-sharp fa-light fa-flag";
  IconSharpLight2["FlagSwallowTail"] = "fa-sharp fa-light fa-flag-swallowtail";
  IconSharpLight2["FloppyDisk"] = "fa-sharp fa-light fa-floppy-disk";
  IconSharpLight2["Folder"] = "fa-sharp fa-light fa-folder";
  IconSharpLight2["FolderOpen"] = "fa-sharp fa-light fa-folder-open";
  IconSharpLight2["FontAwesome"] = "fa-sharp fa-light  fa-font-awesome";
  IconSharpLight2["Forward"] = "fa-sharp fa-light fa-forward";
  IconSharpLight2["ForwardStep"] = "fa-sharp fa-light fa-forward-step";
  IconSharpLight2["ForwardFast"] = "fa-sharp fa-light fa-forward-fast";
  IconSharpLight2["Futbol"] = "fa-sharp fa-light fa-futbol";
  IconSharpLight2["Gear"] = "fa-sharp fa-light fa-gear";
  IconSharpLight2["Gears"] = "fa-sharp fa-light fa-gears";
  IconSharpLight2["Globe"] = "fa-sharp fa-light fa-globe";
  IconSharpLight2["Hashtag"] = "fa-sharp fa-light fa-hashtag";
  IconSharpLight2["HatWizard"] = "fa-sharp fa-light fa-hat-wizard";
  IconSharpLight2["Headset"] = "fa-sharp fa-light fa-headset";
  IconSharpLight2["Hospital"] = "fa-sharp fa-light fa-hospital";
  IconSharpLight2["Hourglass"] = "fa-sharp fa-light fa-hourglass";
  IconSharpLight2["HourglassClock"] = "fa-sharp fa-light fa-hourglass-clock";
  IconSharpLight2["House"] = "fa-sharp fa-light fa-house";
  IconSharpLight2["HouseMedical"] = "fa-sharp fa-light fa-house-medical";
  IconSharpLight2["HouseUser"] = "fa-sharp fa-light fa-house-user";
  IconSharpLight2["Image"] = "fa-sharp fa-light fa-image";
  IconSharpLight2["Inbox"] = "fa-sharp fa-light fa-inbox";
  IconSharpLight2["InboxFull"] = "fa-sharp fa-light fa-inbox-full";
  IconSharpLight2["Info"] = "fa-sharp fa-light fa-info";
  IconSharpLight2["Key"] = "fa-sharp fa-light fa-key";
  IconSharpLight2["Keyboard"] = "fa-sharp fa-light fa-keyboard";
  IconSharpLight2["KeySkeleton"] = "fa-sharp fa-light fa-key-skeleton";
  IconSharpLight2["Laptop"] = "fa-sharp fa-light fa-laptop";
  IconSharpLight2["LaptopMedical"] = "fa-sharp fa-light fa-laptop-medical";
  IconSharpLight2["LevelDown"] = "fa-sharp fa-light fa-level-down";
  IconSharpLight2["LevelDownAlt"] = "fa-sharp fa-light fa-level-down-alt";
  IconSharpLight2["LevelLeft"] = "fa-sharp fa-light fa-level-left";
  IconSharpLight2["LevelLeftAlt"] = "fa-sharp fa-light fa-level-left-alt";
  IconSharpLight2["LevelRight"] = "fa-sharp fa-light fa-level-right";
  IconSharpLight2["LevelRightAlt"] = "fa-sharp fa-light fa-level-right-alt";
  IconSharpLight2["LevelUp"] = "fa-sharp fa-light fa-level-up";
  IconSharpLight2["LevelUpAlt"] = "fa-sharp fa-light fa-level-up-alt";
  IconSharpLight2["Link"] = "fa-sharp fa-light fa-link";
  IconSharpLight2["LinkExternal"] = "fa-sharp fa-light fa-arrow-up-right-from-square";
  IconSharpLight2["LinkHorizontal"] = "fa-sharp fa-light fa-link-horizontal";
  IconSharpLight2["LinkHorizontalSlash"] = "fa-sharp fa-light fa-link-horizontal-slash";
  IconSharpLight2["LinkSimple"] = "fa-sharp fa-light fa-link-simple";
  IconSharpLight2["LinkSimpleSlash"] = "fa-sharp fa-light fa-link-simple-slash";
  IconSharpLight2["LinkSlash"] = "fa-sharp fa-light fa-link-slash";
  IconSharpLight2["List"] = "fa-sharp fa-light fa-list";
  IconSharpLight2["ListCheck"] = "fa-sharp fa-light fa-list-check";
  IconSharpLight2["ListOl"] = "fa-sharp fa-light fa-list-ol";
  IconSharpLight2["ListTree"] = "fa-sharp fa-light fa-list-tree";
  IconSharpLight2["ListUl"] = "fa-sharp fa-light fa-list-ul";
  IconSharpLight2["LocationArrow"] = "fa-sharp fa-light fa-location-arrow";
  IconSharpLight2["LocationCrossHairs"] = "fa-sharp fa-light fa-location-crosshairs";
  IconSharpLight2["LocationCheck"] = "fa-sharp fa-light fa-location-check";
  IconSharpLight2["LocationDot"] = "fa-sharp fa-light fa-location-dot";
  IconSharpLight2["Lock"] = "fa-sharp fa-light fa-lock";
  IconSharpLight2["LockOpen"] = "fa-sharp fa-light fa-lock-open";
  IconSharpLight2["Login"] = "fa-sharp fa-light fa-arrow-right-to-bracket";
  IconSharpLight2["Logout"] = "fa-sharp fa-light fa-arrow-right-from-bracket";
  IconSharpLight2["MagnifyingGlass"] = "fa-sharp fa-light fa-magnifying-glass";
  IconSharpLight2["MagnifyingGlassMinus"] = "fa-sharp fa-light fa-magnifying-glass-minus";
  IconSharpLight2["MagnifyingGlassPlus"] = "fa-sharp fa-light fa-magnifying-glass-plus";
  IconSharpLight2["Mail"] = "fa-sharp fa-light fa-envelope";
  IconSharpLight2["Mailbox"] = "fa-sharp fa-light fa-mailbox";
  IconSharpLight2["MailOpen"] = "fa-sharp fa-light fa-envelope-open";
  IconSharpLight2["Map"] = "fa-sharp fa-light fa-map";
  IconSharpLight2["MapLocation"] = "fa-sharp fa-light fa-map-location";
  IconSharpLight2["MapLocationDot"] = "fa-sharp fa-light fa-map-location-dot";
  IconSharpLight2["MapPin"] = "fa-sharp fa-light fa-map-pin";
  IconSharpLight2["Maximize"] = "fa-sharp fa-light fa-maximize";
  IconSharpLight2["Merge"] = "fa-sharp fa-light fa-merge";
  IconSharpLight2["Message"] = "fa-sharp fa-light fa-message";
  IconSharpLight2["MessageCode"] = "fa-sharp fa-light fa-message-code";
  IconSharpLight2["MessageDots"] = "fa-sharp fa-light fa-message-dots";
  IconSharpLight2["MessageLines"] = "fa-sharp fa-light fa-message-lines";
  IconSharpLight2["Messages"] = "fa-sharp fa-light fa-messages";
  IconSharpLight2["Microphone"] = "fa-sharp fa-light fa-microphone";
  IconSharpLight2["MicrophoneLines"] = "fa-sharp fa-light fa-microphone-lines";
  IconSharpLight2["MicrophoneLinesSlash"] = "fa-sharp fa-light fa-microphone-lines-slash";
  IconSharpLight2["MicrophoneSlash"] = "fa-sharp fa-light fa-microphone-slash";
  IconSharpLight2["Microscope"] = "fa-sharp fa-light fa-microscope";
  IconSharpLight2["Minimize"] = "fa-sharp fa-light fa-minimize";
  IconSharpLight2["Minus"] = "fa-sharp fa-light fa-minus";
  IconSharpLight2["Mobile"] = "fa-sharp fa-light fa-mobile";
  IconSharpLight2["MobileNotch"] = "fa-sharp fa-light fa-mobile-notch";
  IconSharpLight2["MoneyCheckDollarPen"] = "fa-sharp fa-light fa-money-check-dollar-pen";
  IconSharpLight2["Music"] = "fa-sharp fa-light fa-music";
  IconSharpLight2["MusicSlash"] = "fa-sharp fa-light fa-music-slash";
  IconSharpLight2["NewsPaper"] = "fa-sharp fa-light fa-newspaper";
  IconSharpLight2["Palette"] = "fa-sharp fa-light fa-palette";
  IconSharpLight2["PaperClip"] = "fa-sharp fa-light fa-paperclip";
  IconSharpLight2["PaperClipVertical"] = "fa-sharp fa-light fa-paperclip-vertical";
  IconSharpLight2["PaperPlane"] = "fa-sharp fa-light fa-paper-plane";
  IconSharpLight2["PaperPlaneTop"] = "fa-sharp fa-light fa-paper-plane-top";
  IconSharpLight2["Paste"] = "fa-sharp fa-light fa-paste";
  IconSharpLight2["Pause"] = "fa-sharp fa-light fa-pause";
  IconSharpLight2["Pen"] = "fa-sharp fa-light fa-pen";
  IconSharpLight2["Pencil"] = "fa-sharp fa-light fa-pencil";
  IconSharpLight2["PenToSquare"] = "fa-sharp fa-light fa-pen-to-square";
  IconSharpLight2["PeopleArrowsLeftRight"] = "fa-sharp fa-light fa-people-arrows-left-right";
  IconSharpLight2["Percentage"] = "fa-sharp fa-light fa-percentage";
  IconSharpLight2["Period"] = "fa-sharp fa-light fa-period";
  IconSharpLight2["PersonChalkboard"] = "fa-sharp fa-light fa-person-chalkboard";
  IconSharpLight2["PersonMilitaryRifle"] = "fa-sharp fa-light fa-person-military-rifle";
  IconSharpLight2["Phone"] = "fa-sharp fa-light fa-phone";
  IconSharpLight2["Play"] = "fa-sharp fa-light fa-play";
  IconSharpLight2["PlayPause"] = "fa-sharp fa-light fa-play-pause";
  IconSharpLight2["Plus"] = "fa-sharp fa-light fa-plus";
  IconSharpLight2["Print"] = "fa-sharp fa-light fa-print";
  IconSharpLight2["Pumo"] = "fa-sharp fa-light fa-font-awesome";
  IconSharpLight2["Question"] = "fa-sharp fa-light fa-question";
  IconSharpLight2["Redo"] = "fa-sharp fa-light fa-redo";
  IconSharpLight2["RedoAlt"] = "fa-sharp fa-light fa-redo-alt";
  IconSharpLight2["Refresh"] = "fa-sharp fa-light fa-arrows-rotate";
  IconSharpLight2["Remove"] = "fa-sharp fa-light fa-xmark";
  IconSharpLight2["Repeat"] = "fa-sharp fa-light fa-repeat";
  IconSharpLight2["Reply"] = "fa-sharp fa-light fa-reply";
  IconSharpLight2["ReplyAll"] = "fa-sharp fa-light fa-reply-all";
  IconSharpLight2["RightFromBracket"] = "fa-sharp fa-light fa-right-from-bracket";
  IconSharpLight2["RightToBracket"] = "fa-sharp fa-light fa-right-to-bracket";
  IconSharpLight2["Rotate"] = "fa-sharp fa-light fa-rotate";
  IconSharpLight2["RotateLeft"] = "fa-sharp fa-light fa-rotate-left";
  IconSharpLight2["SackDollar"] = "fa-sharp fa-light fa-sack-dollar";
  IconSharpLight2["Save"] = "fa-sharp fa-light fa-floppy-disk";
  IconSharpLight2["Scissors"] = "fa-sharp fa-light fa-scissors";
  IconSharpLight2["ScrewdriverWrench"] = "fa-sharp fa-light fa-screwdriver-wrench";
  IconSharpLight2["Search"] = "fa-sharp fa-light fa-magnifying-glass";
  IconSharpLight2["SensorTriangleExclamation"] = "fa-sharp fa-light fa-sensor-triangle-exclamation";
  IconSharpLight2["Settings"] = "fa-sharp fa-light fa-gear";
  IconSharpLight2["Share"] = "fa-sharp fa-light fa-share";
  IconSharpLight2["ShareAll"] = "fa-sharp fa-light fa-share-all";
  IconSharpLight2["ShareNodes"] = "fa-sharp fa-light fa-share-nodes";
  IconSharpLight2["ShareFromSquare"] = "fa-sharp fa-light fa-share-from-square";
  IconSharpLight2["ShieldCheck"] = "fa-sharp fa-light fa-shield-check";
  IconSharpLight2["Ship"] = "fa-sharp fa-light fa-ship";
  IconSharpLight2["Sitemap"] = "fa-sharp fa-light fa-sitemap";
  IconSharpLight2["Soccer"] = "fa-sharp fa-light fa-futbol";
  IconSharpLight2["Sort"] = "fa-sharp fa-light fa-sort";
  IconSharpLight2["SortDown"] = "fa-sharp fa-light fa-sort-down";
  IconSharpLight2["SortUp"] = "fa-sharp fa-light fa-sort-up";
  IconSharpLight2["Spinner"] = "fa-sharp fa-light fa-spinner";
  IconSharpLight2["Split"] = "fa-sharp fa-light fa-split";
  IconSharpLight2["SquareCheck"] = "fa-sharp fa-light fa-square-check";
  IconSharpLight2["SquareMinus"] = "fa-sharp fa-light fa-square-minus";
  IconSharpLight2["SquarePen"] = "fa-sharp fa-light fa-square-pen";
  IconSharpLight2["Stamp"] = "fa-sharp fa-light fa-stamp";
  IconSharpLight2["Star"] = "fa-sharp fa-light fa-star";
  IconSharpLight2["StepBackward"] = "fa-sharp fa-light fa-step-backward";
  IconSharpLight2["StepForward"] = "fa-sharp fa-light fa-step-forward";
  IconSharpLight2["Stethoscope"] = "fa-sharp fa-light fa-stethoscope";
  IconSharpLight2["Stop"] = "fa-sharp fa-light fa-stop";
  IconSharpLight2["Table"] = "fa-sharp fa-light fa-table";
  IconSharpLight2["TableRows"] = "fa-sharp fa-light fa-table-rows";
  IconSharpLight2["Tablet"] = "fa-sharp fa-light fa-tablet";
  IconSharpLight2["Tag"] = "fa-sharp fa-light fa-tag";
  IconSharpLight2["Tags"] = "fa-sharp fa-light fa-tags";
  IconSharpLight2["Tasks"] = "fa-sharp fa-light fa-tasks";
  IconSharpLight2["ThumbsDown"] = "fa-sharp fa-light fa-thumbs-down";
  IconSharpLight2["ThumbsUp"] = "fa-sharp fa-light fa-thumbs-up";
  IconSharpLight2["Thumbtack"] = "fa-sharp fa-light fa-thumbtack";
  IconSharpLight2["Timer"] = "fa-sharp fa-light fa-timer";
  IconSharpLight2["Trash"] = "fa-sharp fa-light fa-trash";
  IconSharpLight2["TrashCanList"] = "fa-sharp fa-light fa-trash-can-list";
  IconSharpLight2["TrashUndo"] = "fa-sharp fa-light fa-trash-undo";
  IconSharpLight2["TrashXmark"] = "fa-sharp fa-light fa-trash-xmark";
  IconSharpLight2["TriangleExclamation"] = "fa-sharp fa-light fa-triangle-exclamation";
  IconSharpLight2["Truck"] = "fa-sharp fa-light fa-truck";
  IconSharpLight2["Undo"] = "fa-sharp fa-light fa-arrow-rotate-left";
  IconSharpLight2["Unlock"] = "fa-sharp fa-light fa-unlock";
  IconSharpLight2["Upload"] = "fa-sharp fa-light fa-upload";
  IconSharpLight2["UsbDrive"] = "fa-sharp fa-light fa-usb-drive";
  IconSharpLight2["User"] = "fa-sharp fa-light fa-user";
  IconSharpLight2["UserCheck"] = "fa-sharp fa-light fa-user-check";
  IconSharpLight2["UserClock"] = "fa-sharp fa-light fa-user-clock";
  IconSharpLight2["UserDoctor"] = "fa-sharp fa-light fa-user-doctor";
  IconSharpLight2["UserDoctorHair"] = "fa-sharp fa-light fa-user-doctor-hair";
  IconSharpLight2["UserDoctorHairLong"] = "fa-sharp fa-light fa-user-doctor-hair-long";
  IconSharpLight2["UserGear"] = "fa-sharp fa-light fa-user-gear";
  IconSharpLight2["UserGroup"] = "fa-sharp fa-light fa-user-group";
  IconSharpLight2["UserHair"] = "fa-sharp fa-light fa-user-hair";
  IconSharpLight2["UserHairLong"] = "fa-sharp fa-light fa-user-hair-long";
  IconSharpLight2["UserHeadset"] = "fa-sharp fa-light fa-user-headset";
  IconSharpLight2["Users"] = "fa-sharp fa-light fa-users";
  IconSharpLight2["UserSecret"] = "fa-sharp fa-light fa-user-secret";
  IconSharpLight2["UsersMedical"] = "fa-sharp fa-light fa-users-medical";
  IconSharpLight2["UserTag"] = "fa-sharp fa-light fa-user-tag";
  IconSharpLight2["UserXmark"] = "fa-sharp fa-light fa-user-xmark";
  IconSharpLight2["Video"] = "fa-sharp fa-light fa-video";
  IconSharpLight2["VideoSlash"] = "fa-sharp fa-light fa-video-slash";
  IconSharpLight2["Volume"] = "fa-sharp fa-light fa-volume";
  IconSharpLight2["VolumeHigh"] = "fa-sharp fa-light fa-volume-high";
  IconSharpLight2["VolumeLow"] = "fa-sharp fa-light fa-volume-low";
  IconSharpLight2["VolumeOff"] = "fa-sharp fa-light fa-volume-off";
  IconSharpLight2["VolumeSlash"] = "fa-sharp fa-light fa-volume-slash";
  IconSharpLight2["VolumeXmark"] = "fa-sharp fa-light fa-volume-xmark";
  IconSharpLight2["Wifi"] = "fa-sharp fa-light fa-wifi";
  IconSharpLight2["WifiExclamation"] = "fa-sharp fa-light fa-wifi-exclamation";
  IconSharpLight2["WifiFair"] = "fa-sharp fa-light fa-wifi-fair";
  IconSharpLight2["WifiSlash"] = "fa-sharp fa-light fa-wifi-slash";
  IconSharpLight2["Window"] = "fa-sharp fa-light fa-window";
  IconSharpLight2["Xmark"] = "fa-sharp fa-light fa-xmark";
  return IconSharpLight2;
})(IconSharpLight || {});
var IconSharpRegular = /* @__PURE__ */ ((IconSharpRegular2) => {
  IconSharpRegular2["Add"] = "fa-sharp fa-regular fa-plus";
  IconSharpRegular2["AddressCard"] = "fa-sharp fa-regular fa-address-card";
  IconSharpRegular2["Alert"] = "fa-sharp fa-regular fa-triangle-exclamation";
  IconSharpRegular2["AngleDown"] = "fa-sharp fa-regular fa-angle-down";
  IconSharpRegular2["AngleLeft"] = "fa-sharp fa-regular fa-angle-left";
  IconSharpRegular2["AngleRight"] = "fa-sharp fa-regular fa-angle-right";
  IconSharpRegular2["AngleUp"] = "fa-sharp fa-regular fa-angle-up";
  IconSharpRegular2["Aperture"] = "fa-sharp fa-regular fa-aperture";
  IconSharpRegular2["ArrowDown"] = "fa-sharp fa-regular fa-arrow-down";
  IconSharpRegular2["ArrowDownShortWide"] = "fa-sharp fa-regular fa-arrow-down-short-wide";
  IconSharpRegular2["ArrowDownWideShort"] = "fa-sharp fa-regular fa-arrow-down-wide-short";
  IconSharpRegular2["ArrowLeft"] = "fa-sharp fa-regular fa-arrow-left";
  IconSharpRegular2["ArrowPointer"] = "fa-sharp fa-regular fa-arrow-pointer";
  IconSharpRegular2["ArrowRight"] = "fa-sharp fa-regular fa-arrow-right";
  IconSharpRegular2["ArrowRightToBracket"] = "fa-sharp fa-regular fa-arrow-right-to-bracket";
  IconSharpRegular2["ArrowRightFromBracket"] = "fa-sharp fa-regular fa-arrow-right-from-bracket";
  IconSharpRegular2["ArrowRotateRight"] = "fa-sharp fa-regular fa-arrow-rotate-right";
  IconSharpRegular2["ArrowsRepeat"] = "fa-sharp fa-regular fa-arrows-repeat";
  IconSharpRegular2["ArrowsRotate"] = "fa-sharp fa-regular fa-arrows-rotate";
  IconSharpRegular2["ArrowUp"] = "fa-sharp fa-regular fa-arrow-up";
  IconSharpRegular2["Asterisk"] = "fa-sharp fa-regular fa-asterisk";
  IconSharpRegular2["At"] = "fa-sharp fa-regular fa-at";
  IconSharpRegular2["Attachment"] = "fa-sharp fa-regular fa-paperclip";
  IconSharpRegular2["Back"] = "fa-sharp fa-regular fa-angle-left";
  IconSharpRegular2["Backward"] = "fa-sharp fa-regular fa-backward";
  IconSharpRegular2["BackwardFast"] = "fa-sharp fa-regular fa-backward-fast";
  IconSharpRegular2["BackwardStep"] = "fa-sharp fa-regular fa-backward-step";
  IconSharpRegular2["BalanceScale"] = "fa-sharp fa-regular fa-balance-scale";
  IconSharpRegular2["BallotCheck"] = "fa-sharp fa-regular fa-ballot-check";
  IconSharpRegular2["Ban"] = "fa-sharp fa-regular fa-ban";
  IconSharpRegular2["Barcode"] = "fa-sharp fa-regular fa-barcode";
  IconSharpRegular2["BarcodeScan"] = "fa-sharp fa-regular fa-barcode-scan";
  IconSharpRegular2["Bars"] = "fa-sharp fa-regular fa-bars";
  IconSharpRegular2["BarsSort"] = "fa-sharp fa-regular fa-bars-sort";
  IconSharpRegular2["Bell"] = "fa-sharp fa-regular fa-bell";
  IconSharpRegular2["BellSlash"] = "fa-sharp fa-regular fa-bell-slash";
  IconSharpRegular2["Bolt"] = "fa-sharp fa-regular fa-bolt";
  IconSharpRegular2["Bomb"] = "fa-sharp fa-regular fa-bomb";
  IconSharpRegular2["Book"] = "fa-sharp fa-regular fa-book";
  IconSharpRegular2["BookOpen"] = "fa-sharp fa-regular fa-book-open";
  IconSharpRegular2["Box"] = "fa-sharp fa-regular fa-box";
  IconSharpRegular2["BoxArchive"] = "fa-sharp fa-regular fa-box-archive";
  IconSharpRegular2["BriefCase"] = "fa-sharp fa-regular fa-brief-case";
  IconSharpRegular2["Bug"] = "fa-sharp fa-regular fa-bug";
  IconSharpRegular2["Burger"] = "fa-sharp fa-regular fa-bars";
  IconSharpRegular2["CakeCandles"] = "fa-sharp fa-regular fa-cake-candles";
  IconSharpRegular2["Calendar"] = "fa-sharp fa-regular fa-calendar";
  IconSharpRegular2["CalendarAlt"] = "fa-sharp fa-regular fa-calendar-alt";
  IconSharpRegular2["CalendarCheck"] = "fa-sharp fa-regular fa-calendar-check";
  IconSharpRegular2["CalendarDay"] = "fa-sharp fa-regular fa-calendar-day";
  IconSharpRegular2["CalendarPlus"] = "fa-sharp fa-regular fa-calendar-plus";
  IconSharpRegular2["Camera"] = "fa-sharp fa-regular fa-camera";
  IconSharpRegular2["CameraAlt"] = "fa-sharp fa-regular fa-camera-alt";
  IconSharpRegular2["CameraWeb"] = "fa-sharp fa-regular fa-camera-web";
  IconSharpRegular2["CameraWebSlash"] = "fa-sharp fa-regular fa-camera-web-slash";
  IconSharpRegular2["Capsules"] = "fa-sharp fa-regular fa-capsules";
  IconSharpRegular2["CaretDown"] = "fa-sharp fa-regular fa-caret-down";
  IconSharpRegular2["CaretLeft"] = "fa-sharp fa-regular fa-caret-left";
  IconSharpRegular2["CaretRight"] = "fa-sharp fa-regular fa-caret-right";
  IconSharpRegular2["CaretUp"] = "fa-sharp fa-regular fa-caret-up";
  IconSharpRegular2["CartCirclePlus"] = "fa-sharp fa-regular fa-cart-circle-plus";
  IconSharpRegular2["CartShopping"] = "fa-sharp fa-regular fa-cart-shopping";
  IconSharpRegular2["ChartArea"] = "fa-sharp fa-regular fa-chart-area";
  IconSharpRegular2["ChartBar"] = "fa-sharp fa-regular fa-chart-bar";
  IconSharpRegular2["ChartColumn"] = "fa-sharp fa-regular fa-chart-column";
  IconSharpRegular2["ChartLine"] = "fa-sharp fa-regular fa-chart-line";
  IconSharpRegular2["ChartPie"] = "fa-sharp fa-regular fa-chart-pie";
  IconSharpRegular2["ChartSimple"] = "fa-sharp fa-regular fa-chart-simple";
  IconSharpRegular2["Chat"] = "fa-sharp fa-regular fa-comment";
  IconSharpRegular2["Check"] = "fa-sharp fa-regular fa-check";
  IconSharpRegular2["ChevronDown"] = "fa-sharp fa-regular fa-chevron-down";
  IconSharpRegular2["ChevronLeft"] = "fa-sharp fa-regular fa-chevron-left";
  IconSharpRegular2["ChevronRight"] = "fa-sharp fa-regular fa-chevron-right";
  IconSharpRegular2["ChevronUp"] = "fa-sharp fa-regular fa-chevron-up";
  IconSharpRegular2["Circle"] = "fa-sharp fa-regular fa-circle";
  IconSharpRegular2["CircleCheck"] = "fa-sharp fa-regular fa-circle-check";
  IconSharpRegular2["CircleExclamation"] = "fa-sharp fa-regular fa-circle-exclamation";
  IconSharpRegular2["CircleInfo"] = "fa-sharp fa-regular fa-circle-info";
  IconSharpRegular2["CircleSmall"] = "fa-sharp fa-regular fa-circle-small";
  IconSharpRegular2["CircleStop"] = "fa-sharp fa-regular fa-circle-stop";
  IconSharpRegular2["Clipboard"] = "fa-sharp fa-regular fa-clipboard";
  IconSharpRegular2["ClipboardMedical"] = "fa-sharp fa-regular fa-clipboard-medical";
  IconSharpRegular2["Clock"] = "fa-sharp fa-regular fa-clock";
  IconSharpRegular2["ClockRotateLeft"] = "fa-sharp fa-regular fa-clock-rotate-left";
  IconSharpRegular2["Close"] = "fa-sharp fa-regular fa-xmark";
  IconSharpRegular2["Cloud"] = "fa-sharp fa-regular fa-cloud";
  IconSharpRegular2["CloudArrowUp"] = "fa-sharp fa-regular fa-cloud-arrow-up";
  IconSharpRegular2["CloudDownload"] = "fa-sharp fa-regular fa-cloud-download";
  IconSharpRegular2["Code"] = "fa-sharp fa-regular fa-code";
  IconSharpRegular2["CodeMerge"] = "fa-sharp fa-regular fa-code-merge";
  IconSharpRegular2["Coins"] = "fa-sharp fa-regular fa-coins";
  IconSharpRegular2["Collapse"] = "fa-sharp fa-regular fa-compress";
  IconSharpRegular2["Comment"] = "fa-sharp fa-regular fa-comment";
  IconSharpRegular2["CommentDots"] = "fa-sharp fa-regular fa-comment-dots";
  IconSharpRegular2["CommentLines"] = "fa-sharp fa-regular fa-comment-lines";
  IconSharpRegular2["Comments"] = "fa-sharp fa-regular fa-comments";
  IconSharpRegular2["CommentSms"] = "fa-sharp fa-regular fa-comment-sms";
  IconSharpRegular2["Compress"] = "fa-sharp fa-regular fa-compress";
  IconSharpRegular2["Copy"] = "fa-sharp fa-regular fa-copy";
  IconSharpRegular2["Copyright"] = "fa-sharp fa-regular fa-copyright";
  IconSharpRegular2["CreditCard"] = "fa-sharp fa-regular fa-credit-card";
  IconSharpRegular2["Crown"] = "fa-sharp fa-regular fa-crown";
  IconSharpRegular2["Database"] = "fa-sharp fa-regular fa-database";
  IconSharpRegular2["Delete"] = "fa-sharp fa-regular fa-xmark";
  IconSharpRegular2["DeleteLeft"] = "fa-sharp fa-regular fa-delete-left";
  IconSharpRegular2["DeleteRight"] = "fa-sharp fa-regular fa-delete-right";
  IconSharpRegular2["Desktop"] = "fa-sharp fa-regular fa-desktop";
  IconSharpRegular2["Download"] = "fa-sharp fa-regular fa-download";
  IconSharpRegular2["Edit"] = "fa-sharp fa-regular fa-pen";
  IconSharpRegular2["Eject"] = "fa-sharp fa-regular fa-eject";
  IconSharpRegular2["Ellipsis"] = "fa-sharp fa-regular fa-ellipsis";
  IconSharpRegular2["EllipsisVertical"] = "fa-sharp fa-regular fa-ellipsis-vertical";
  IconSharpRegular2["Envelope"] = "fa-sharp fa-regular fa-envelope";
  IconSharpRegular2["Eraser"] = "fa-sharp fa-regular fa-eraser";
  IconSharpRegular2["EuroSign"] = "fa-sharp fa-regular fa-euro-sign";
  IconSharpRegular2["Exclamation"] = "fa-sharp fa-regular fa-exclamation";
  IconSharpRegular2["Expand"] = "fa-sharp fa-regular fa-expand";
  IconSharpRegular2["Eye"] = "fa-sharp fa-regular fa-eye";
  IconSharpRegular2["EyeSlash"] = "fa-sharp fa-regular fa-eye-slash";
  IconSharpRegular2["Family"] = "fa-sharp fa-regular fa-family";
  IconSharpRegular2["FastBackward"] = "fa-sharp fa-regular fa-fast-backward";
  IconSharpRegular2["FastForward"] = "fa-sharp fa-regular fa-fast-forward";
  IconSharpRegular2["File"] = "fa-sharp fa-regular fa-file";
  IconSharpRegular2["FileAudio"] = "fa-sharp fa-regular fa-file-audio";
  IconSharpRegular2["FileContract"] = "fa-sharp fa-regular fa-file-contract";
  IconSharpRegular2["FileDownload"] = "fa-sharp fa-regular fa-file-download";
  IconSharpRegular2["FileExcel"] = "fa-sharp fa-regular fa-file-excel";
  IconSharpRegular2["FileExport"] = "fa-sharp fa-regular fa-file-export";
  IconSharpRegular2["FileImage"] = "fa-sharp fa-regular fa-file-image";
  IconSharpRegular2["FileInvoice"] = "fa-sharp fa-regular fa-file-invoice";
  IconSharpRegular2["FileImport"] = "fa-sharp fa-regular fa-file-import";
  IconSharpRegular2["FileLines"] = "fa-sharp fa-regular fa-file-lines";
  IconSharpRegular2["FileMusic"] = "fa-sharp fa-regular fa-file-music";
  IconSharpRegular2["FilePdf"] = "fa-sharp fa-regular fa-file-pdf";
  IconSharpRegular2["Files"] = "fa-sharp fa-regular fa-file-files";
  IconSharpRegular2["FileSignature"] = "fa-sharp fa-regular fa-file-signature";
  IconSharpRegular2["FileVideo"] = "fa-sharp fa-regular fa-file-video";
  IconSharpRegular2["FileWord"] = "fa-sharp fa-regular fa-file-word";
  IconSharpRegular2["FileZipper"] = "fa-sharp fa-regular fa-file-zipper";
  IconSharpRegular2["Filter"] = "fa-sharp fa-regular fa-filter";
  IconSharpRegular2["Flag"] = "fa-sharp fa-regular fa-flag";
  IconSharpRegular2["FlagSwallowTail"] = "fa-sharp fa-regular fa-flag-swallowtail";
  IconSharpRegular2["FloppyDisk"] = "fa-sharp fa-regular fa-floppy-disk";
  IconSharpRegular2["Folder"] = "fa-sharp fa-regular fa-folder";
  IconSharpRegular2["FolderOpen"] = "fa-sharp fa-regular fa-folder-open";
  IconSharpRegular2["FontAwesome"] = "fa-sharp fa-regular  fa-font-awesome";
  IconSharpRegular2["Forward"] = "fa-sharp fa-regular fa-forward";
  IconSharpRegular2["ForwardStep"] = "fa-sharp fa-regular fa-forward-step";
  IconSharpRegular2["ForwardFast"] = "fa-sharp fa-regular fa-forward-fast";
  IconSharpRegular2["Futbol"] = "fa-sharp fa-regular fa-futbol";
  IconSharpRegular2["Gear"] = "fa-sharp fa-regular fa-gear";
  IconSharpRegular2["Gears"] = "fa-sharp fa-regular fa-gears";
  IconSharpRegular2["Globe"] = "fa-sharp fa-regular fa-globe";
  IconSharpRegular2["Hashtag"] = "fa-sharp fa-regular fa-hashtag";
  IconSharpRegular2["HatWizard"] = "fa-sharp fa-regular fa-hat-wizard";
  IconSharpRegular2["Headset"] = "fa-sharp fa-regular fa-headset";
  IconSharpRegular2["Hospital"] = "fa-sharp fa-regular fa-hospital";
  IconSharpRegular2["Hourglass"] = "fa-sharp fa-regular fa-hourglass";
  IconSharpRegular2["HourglassClock"] = "fa-sharp fa-regular fa-hourglass-clock";
  IconSharpRegular2["House"] = "fa-sharp fa-regular fa-house";
  IconSharpRegular2["HouseMedical"] = "fa-sharp fa-regular fa-house-medical";
  IconSharpRegular2["HouseUser"] = "fa-sharp fa-regular fa-house-user";
  IconSharpRegular2["Image"] = "fa-sharp fa-regular fa-image";
  IconSharpRegular2["Inbox"] = "fa-sharp fa-regular fa-inbox";
  IconSharpRegular2["InboxFull"] = "fa-sharp fa-regular fa-inbox-full";
  IconSharpRegular2["Info"] = "fa-sharp fa-regular fa-info";
  IconSharpRegular2["Key"] = "fa-sharp fa-regular fa-key";
  IconSharpRegular2["Keyboard"] = "fa-sharp fa-regular fa-keyboard";
  IconSharpRegular2["KeySkeleton"] = "fa-sharp fa-regular fa-key-skeleton";
  IconSharpRegular2["Laptop"] = "fa-sharp fa-regular fa-laptop";
  IconSharpRegular2["LaptopMedical"] = "fa-sharp fa-regular fa-laptop-medical";
  IconSharpRegular2["LevelDown"] = "fa-sharp fa-regular fa-level-down";
  IconSharpRegular2["LevelDownAlt"] = "fa-sharp fa-regular fa-level-down-alt";
  IconSharpRegular2["LevelLeft"] = "fa-sharp fa-regular fa-level-left";
  IconSharpRegular2["LevelLeftAlt"] = "fa-sharp fa-regular fa-level-left-alt";
  IconSharpRegular2["LevelRight"] = "fa-sharp fa-regular fa-level-right";
  IconSharpRegular2["LevelRightAlt"] = "fa-sharp fa-regular fa-level-right-alt";
  IconSharpRegular2["LevelUp"] = "fa-sharp fa-regular fa-level-up";
  IconSharpRegular2["LevelUpAlt"] = "fa-sharp fa-regular fa-level-up-alt";
  IconSharpRegular2["Link"] = "fa-sharp fa-regular fa-link";
  IconSharpRegular2["LinkExternal"] = "fa-sharp fa-regular fa-arrow-up-right-from-square";
  IconSharpRegular2["LinkHorizontal"] = "fa-sharp fa-regular fa-link-horizontal";
  IconSharpRegular2["LinkHorizontalSlash"] = "fa-sharp fa-regular fa-link-horizontal-slash";
  IconSharpRegular2["LinkSimple"] = "fa-sharp fa-regular fa-link-simple";
  IconSharpRegular2["LinkSimpleSlash"] = "fa-sharp fa-regular fa-link-simple-slash";
  IconSharpRegular2["LinkSlash"] = "fa-sharp fa-regular fa-link-slash";
  IconSharpRegular2["List"] = "fa-sharp fa-regular fa-list";
  IconSharpRegular2["ListCheck"] = "fa-sharp fa-regular fa-list-check";
  IconSharpRegular2["ListOl"] = "fa-sharp fa-regular fa-list-ol";
  IconSharpRegular2["ListTree"] = "fa-sharp fa-regular fa-list-tree";
  IconSharpRegular2["ListUl"] = "fa-sharp fa-regular fa-list-ul";
  IconSharpRegular2["LocationArrow"] = "fa-sharp fa-regular fa-location-arrow";
  IconSharpRegular2["LocationCrossHairs"] = "fa-sharp fa-regular fa-location-crosshairs";
  IconSharpRegular2["LocationCheck"] = "fa-sharp fa-regular fa-location-check";
  IconSharpRegular2["LocationDot"] = "fa-sharp fa-regular fa-location-dot";
  IconSharpRegular2["Lock"] = "fa-sharp fa-regular fa-lock";
  IconSharpRegular2["LockOpen"] = "fa-sharp fa-regular fa-lock-open";
  IconSharpRegular2["Login"] = "fa-sharp fa-regular fa-arrow-right-to-bracket";
  IconSharpRegular2["Logout"] = "fa-sharp fa-regular fa-arrow-right-from-bracket";
  IconSharpRegular2["MagnifyingGlass"] = "fa-sharp fa-regular fa-magnifying-glass";
  IconSharpRegular2["MagnifyingGlassMinus"] = "fa-sharp fa-regular fa-magnifying-glass-minus";
  IconSharpRegular2["MagnifyingGlassPlus"] = "fa-sharp fa-regular fa-magnifying-glass-plus";
  IconSharpRegular2["Mail"] = "fa-sharp fa-regular fa-envelope";
  IconSharpRegular2["Mailbox"] = "fa-sharp fa-regular fa-mailbox";
  IconSharpRegular2["MailOpen"] = "fa-sharp fa-regular fa-envelope-open";
  IconSharpRegular2["Map"] = "fa-sharp fa-regular fa-map";
  IconSharpRegular2["MapLocation"] = "fa-sharp fa-regular fa-map-location";
  IconSharpRegular2["MapLocationDot"] = "fa-sharp fa-regular fa-map-location-dot";
  IconSharpRegular2["MapPin"] = "fa-sharp fa-regular fa-map-pin";
  IconSharpRegular2["Maximize"] = "fa-sharp fa-regular fa-maximize";
  IconSharpRegular2["Merge"] = "fa-sharp fa-regular fa-merge";
  IconSharpRegular2["Message"] = "fa-sharp fa-regular fa-message";
  IconSharpRegular2["MessageCode"] = "fa-sharp fa-regular fa-message-code";
  IconSharpRegular2["MessageDots"] = "fa-sharp fa-regular fa-message-dots";
  IconSharpRegular2["MessageLines"] = "fa-sharp fa-regular fa-message-lines";
  IconSharpRegular2["Messages"] = "fa-sharp fa-regular fa-messages";
  IconSharpRegular2["Microphone"] = "fa-sharp fa-regular fa-microphone";
  IconSharpRegular2["MicrophoneLines"] = "fa-sharp fa-regular fa-microphone-lines";
  IconSharpRegular2["MicrophoneLinesSlash"] = "fa-sharp fa-regular fa-microphone-lines-slash";
  IconSharpRegular2["MicrophoneSlash"] = "fa-sharp fa-regular fa-microphone-slash";
  IconSharpRegular2["Microscope"] = "fa-sharp fa-regular fa-microscope";
  IconSharpRegular2["Minimize"] = "fa-sharp fa-regular fa-minimize";
  IconSharpRegular2["Minus"] = "fa-sharp fa-regular fa-minus";
  IconSharpRegular2["Mobile"] = "fa-sharp fa-regular fa-mobile";
  IconSharpRegular2["MobileNotch"] = "fa-sharp fa-regular fa-mobile-notch";
  IconSharpRegular2["MoneyCheckDollarPen"] = "fa-sharp fa-regular fa-money-check-dollar-pen";
  IconSharpRegular2["Music"] = "fa-sharp fa-regular fa-music";
  IconSharpRegular2["MusicSlash"] = "fa-sharp fa-regular fa-music-slash";
  IconSharpRegular2["NewsPaper"] = "fa-sharp fa-regular fa-newspaper";
  IconSharpRegular2["Palette"] = "fa-sharp fa-regular fa-palette";
  IconSharpRegular2["PaperClip"] = "fa-sharp fa-regular fa-paperclip";
  IconSharpRegular2["PaperClipVertical"] = "fa-sharp fa-regular fa-paperclip-vertical";
  IconSharpRegular2["PaperPlane"] = "fa-sharp fa-regular fa-paper-plane";
  IconSharpRegular2["PaperPlaneTop"] = "fa-sharp fa-regular fa-paper-plane-top";
  IconSharpRegular2["Paste"] = "fa-sharp fa-regular fa-paste";
  IconSharpRegular2["Pause"] = "fa-sharp fa-regular fa-pause";
  IconSharpRegular2["Pen"] = "fa-sharp fa-regular fa-pen";
  IconSharpRegular2["Pencil"] = "fa-sharp fa-regular fa-pencil";
  IconSharpRegular2["PenToSquare"] = "fa-sharp fa-regular fa-pen-to-square";
  IconSharpRegular2["PeopleArrowsLeftRight"] = "fa-sharp fa-regular fa-people-arrows-left-right";
  IconSharpRegular2["Percentage"] = "fa-sharp fa-regular fa-percentage";
  IconSharpRegular2["Period"] = "fa-sharp fa-regular fa-period";
  IconSharpRegular2["PersonChalkboard"] = "fa-sharp fa-regular fa-person-chalkboard";
  IconSharpRegular2["PersonMilitaryRifle"] = "fa-sharp fa-regular fa-person-military-rifle";
  IconSharpRegular2["Phone"] = "fa-sharp fa-regular fa-phone";
  IconSharpRegular2["Play"] = "fa-sharp fa-regular fa-play";
  IconSharpRegular2["PlayPause"] = "fa-sharp fa-regular fa-play-pause";
  IconSharpRegular2["Plus"] = "fa-sharp fa-regular fa-plus";
  IconSharpRegular2["Print"] = "fa-sharp fa-regular fa-print";
  IconSharpRegular2["Pumo"] = "fa-sharp fa-regular fa-font-awesome";
  IconSharpRegular2["Question"] = "fa-sharp fa-regular fa-question";
  IconSharpRegular2["Redo"] = "fa-sharp fa-regular fa-redo";
  IconSharpRegular2["RedoAlt"] = "fa-sharp fa-regular fa-redo-alt";
  IconSharpRegular2["Refresh"] = "fa-sharp fa-regular fa-arrows-rotate";
  IconSharpRegular2["Remove"] = "fa-sharp fa-regular fa-xmark";
  IconSharpRegular2["Repeat"] = "fa-sharp fa-regular fa-repeat";
  IconSharpRegular2["Reply"] = "fa-sharp fa-regular fa-reply";
  IconSharpRegular2["ReplyAll"] = "fa-sharp fa-regular fa-reply-all";
  IconSharpRegular2["RightFromBracket"] = "fa-sharp fa-regular fa-right-from-bracket";
  IconSharpRegular2["RightToBracket"] = "fa-sharp fa-regular fa-right-to-bracket";
  IconSharpRegular2["Rotate"] = "fa-sharp fa-regular fa-rotate";
  IconSharpRegular2["RotateLeft"] = "fa-sharp fa-regular fa-rotate-left";
  IconSharpRegular2["SackDollar"] = "fa-sharp fa-regular fa-sack-dollar";
  IconSharpRegular2["Save"] = "fa-sharp fa-regular fa-floppy-disk";
  IconSharpRegular2["Scissors"] = "fa-sharp fa-regular fa-scissors";
  IconSharpRegular2["ScrewdriverWrench"] = "fa-sharp fa-regular fa-screwdriver-wrench";
  IconSharpRegular2["Search"] = "fa-sharp fa-regular fa-magnifying-glass";
  IconSharpRegular2["SensorTriangleExclamation"] = "fa-sharp fa-regular fa-sensor-triangle-exclamation";
  IconSharpRegular2["Settings"] = "fa-sharp fa-regular fa-gear";
  IconSharpRegular2["Share"] = "fa-sharp fa-regular fa-share";
  IconSharpRegular2["ShareAll"] = "fa-sharp fa-regular fa-share-all";
  IconSharpRegular2["ShareNodes"] = "fa-sharp fa-regular fa-share-nodes";
  IconSharpRegular2["ShareFromSquare"] = "fa-sharp fa-regular fa-share-from-square";
  IconSharpRegular2["ShieldCheck"] = "fa-sharp fa-regular fa-shield-check";
  IconSharpRegular2["Ship"] = "fa-sharp fa-regular fa-ship";
  IconSharpRegular2["Sitemap"] = "fa-sharp fa-regular fa-sitemap";
  IconSharpRegular2["Soccer"] = "fa-sharp fa-regular fa-futbol";
  IconSharpRegular2["Sort"] = "fa-sharp fa-regular fa-sort";
  IconSharpRegular2["SortDown"] = "fa-sharp fa-regular fa-sort-down";
  IconSharpRegular2["SortUp"] = "fa-sharp fa-regular fa-sort-up";
  IconSharpRegular2["Spinner"] = "fa-sharp fa-regular fa-spinner";
  IconSharpRegular2["Split"] = "fa-sharp fa-regular fa-split";
  IconSharpRegular2["SquareCheck"] = "fa-sharp fa-regular fa-square-check";
  IconSharpRegular2["SquareMinus"] = "fa-sharp fa-regular fa-square-minus";
  IconSharpRegular2["SquarePen"] = "fa-sharp fa-regular fa-square-pen";
  IconSharpRegular2["Stamp"] = "fa-sharp fa-regular fa-stamp";
  IconSharpRegular2["Star"] = "fa-sharp fa-regular fa-star";
  IconSharpRegular2["StepBackward"] = "fa-sharp fa-regular fa-step-backward";
  IconSharpRegular2["StepForward"] = "fa-sharp fa-regular fa-step-forward";
  IconSharpRegular2["Stethoscope"] = "fa-sharp fa-regular fa-stethoscope";
  IconSharpRegular2["Stop"] = "fa-sharp fa-regular fa-stop";
  IconSharpRegular2["Table"] = "fa-sharp fa-regular fa-table";
  IconSharpRegular2["TableRows"] = "fa-sharp fa-regular fa-table-rows";
  IconSharpRegular2["Tablet"] = "fa-sharp fa-regular fa-tablet";
  IconSharpRegular2["Tag"] = "fa-sharp fa-regular fa-tag";
  IconSharpRegular2["Tags"] = "fa-sharp fa-regular fa-tags";
  IconSharpRegular2["Tasks"] = "fa-sharp fa-regular fa-tasks";
  IconSharpRegular2["ThumbsDown"] = "fa-sharp fa-regular fa-thumbs-down";
  IconSharpRegular2["ThumbsUp"] = "fa-sharp fa-regular fa-thumbs-up";
  IconSharpRegular2["Thumbtack"] = "fa-sharp fa-regular fa-thumbtack";
  IconSharpRegular2["Timer"] = "fa-sharp fa-regular fa-timer";
  IconSharpRegular2["Trash"] = "fa-sharp fa-regular fa-trash";
  IconSharpRegular2["TrashCanList"] = "fa-sharp fa-regular fa-trash-can-list";
  IconSharpRegular2["TrashUndo"] = "fa-sharp fa-regular fa-trash-undo";
  IconSharpRegular2["TrashXmark"] = "fa-sharp fa-regular fa-trash-xmark";
  IconSharpRegular2["TriangleExclamation"] = "fa-sharp fa-regular fa-triangle-exclamation";
  IconSharpRegular2["Truck"] = "fa-sharp fa-regular fa-truck";
  IconSharpRegular2["Undo"] = "fa-sharp fa-regular fa-arrow-rotate-left";
  IconSharpRegular2["Unlock"] = "fa-sharp fa-regular fa-unlock";
  IconSharpRegular2["Upload"] = "fa-sharp fa-regular fa-upload";
  IconSharpRegular2["UsbDrive"] = "fa-sharp fa-regular fa-usb-drive";
  IconSharpRegular2["User"] = "fa-sharp fa-regular fa-user";
  IconSharpRegular2["UserCheck"] = "fa-sharp fa-regular fa-user-check";
  IconSharpRegular2["UserClock"] = "fa-sharp fa-regular fa-user-clock";
  IconSharpRegular2["UserDoctor"] = "fa-sharp fa-regular fa-user-doctor";
  IconSharpRegular2["UserDoctorHair"] = "fa-sharp fa-regular fa-user-doctor-hair";
  IconSharpRegular2["UserDoctorHairLong"] = "fa-sharp fa-regular fa-user-doctor-hair-long";
  IconSharpRegular2["UserGear"] = "fa-sharp fa-regular fa-user-gear";
  IconSharpRegular2["UserGroup"] = "fa-sharp fa-regular fa-user-group";
  IconSharpRegular2["UserHair"] = "fa-sharp fa-regular fa-user-hair";
  IconSharpRegular2["UserHairLong"] = "fa-sharp fa-regular fa-user-hair-long";
  IconSharpRegular2["UserHeadset"] = "fa-sharp fa-regular fa-user-headset";
  IconSharpRegular2["Users"] = "fa-sharp fa-regular fa-users";
  IconSharpRegular2["UserSecret"] = "fa-sharp fa-regular fa-user-secret";
  IconSharpRegular2["UsersMedical"] = "fa-sharp fa-regular fa-users-medical";
  IconSharpRegular2["UserTag"] = "fa-sharp fa-regular fa-user-tag";
  IconSharpRegular2["UserXmark"] = "fa-sharp fa-regular fa-user-xmark";
  IconSharpRegular2["Video"] = "fa-sharp fa-regular fa-video";
  IconSharpRegular2["VideoSlash"] = "fa-sharp fa-regular fa-video-slash";
  IconSharpRegular2["Volume"] = "fa-sharp fa-regular fa-volume";
  IconSharpRegular2["VolumeHigh"] = "fa-sharp fa-regular fa-volume-high";
  IconSharpRegular2["VolumeLow"] = "fa-sharp fa-regular fa-volume-low";
  IconSharpRegular2["VolumeOff"] = "fa-sharp fa-regular fa-volume-off";
  IconSharpRegular2["VolumeSlash"] = "fa-sharp fa-regular fa-volume-slash";
  IconSharpRegular2["VolumeXmark"] = "fa-sharp fa-regular fa-volume-xmark";
  IconSharpRegular2["Wifi"] = "fa-sharp fa-regular fa-wifi";
  IconSharpRegular2["WifiExclamation"] = "fa-sharp fa-regular fa-wifi-exclamation";
  IconSharpRegular2["WifiFair"] = "fa-sharp fa-regular fa-wifi-fair";
  IconSharpRegular2["WifiSlash"] = "fa-sharp fa-regular fa-wifi-slash";
  IconSharpRegular2["Window"] = "fa-sharp fa-regular fa-window";
  IconSharpRegular2["Xmark"] = "fa-sharp fa-regular fa-xmark";
  return IconSharpRegular2;
})(IconSharpRegular || {});
var IconSharpDuotone = /* @__PURE__ */ ((IconSharpDuotone2) => {
  IconSharpDuotone2["Add"] = "fa-sharp fa-duotone fa-plus";
  IconSharpDuotone2["AddressCard"] = "fa-sharp fa-duotone fa-address-card";
  IconSharpDuotone2["Alert"] = "fa-sharp fa-duotone fa-triangle-exclamation";
  IconSharpDuotone2["AngleDown"] = "fa-sharp fa-duotone fa-angle-down";
  IconSharpDuotone2["AngleLeft"] = "fa-sharp fa-duotone fa-angle-left";
  IconSharpDuotone2["AngleRight"] = "fa-sharp fa-duotone fa-angle-right";
  IconSharpDuotone2["AngleUp"] = "fa-sharp fa-duotone fa-angle-up";
  IconSharpDuotone2["Aperture"] = "fa-sharp fa-duotone fa-aperture";
  IconSharpDuotone2["ArrowDown"] = "fa-sharp fa-duotone fa-arrow-down";
  IconSharpDuotone2["ArrowDownShortWide"] = "fa-sharp fa-duotone fa-arrow-down-short-wide";
  IconSharpDuotone2["ArrowDownWideShort"] = "fa-sharp fa-duotone fa-arrow-down-wide-short";
  IconSharpDuotone2["ArrowLeft"] = "fa-sharp fa-duotone fa-arrow-left";
  IconSharpDuotone2["ArrowPointer"] = "fa-sharp fa-duotone fa-arrow-pointer";
  IconSharpDuotone2["ArrowRight"] = "fa-sharp fa-duotone fa-arrow-right";
  IconSharpDuotone2["ArrowRightToBracket"] = "fa-sharp fa-duotone fa-arrow-right-to-bracket";
  IconSharpDuotone2["ArrowRightFromBracket"] = "fa-sharp fa-duotone fa-arrow-right-from-bracket";
  IconSharpDuotone2["ArrowRotateRight"] = "fa-sharp fa-duotone fa-arrow-rotate-right";
  IconSharpDuotone2["ArrowsRepeat"] = "fa-sharp fa-duotone fa-arrows-repeat";
  IconSharpDuotone2["ArrowsRotate"] = "fa-sharp fa-duotone fa-arrows-rotate";
  IconSharpDuotone2["ArrowUp"] = "fa-sharp fa-duotone fa-arrow-up";
  IconSharpDuotone2["Asterisk"] = "fa-sharp fa-duotone fa-asterisk";
  IconSharpDuotone2["At"] = "fa-sharp fa-duotone fa-at";
  IconSharpDuotone2["Attachment"] = "fa-sharp fa-duotone fa-paperclip";
  IconSharpDuotone2["Back"] = "fa-sharp fa-duotone fa-angle-left";
  IconSharpDuotone2["Backward"] = "fa-sharp fa-duotone fa-backward";
  IconSharpDuotone2["BackwardFast"] = "fa-sharp fa-duotone fa-backward-fast";
  IconSharpDuotone2["BackwardStep"] = "fa-sharp fa-duotone fa-backward-step";
  IconSharpDuotone2["BalanceScale"] = "fa-sharp fa-duotone fa-balance-scale";
  IconSharpDuotone2["BallotCheck"] = "fa-sharp fa-duotone fa-ballot-check";
  IconSharpDuotone2["Ban"] = "fa-sharp fa-duotone fa-ban";
  IconSharpDuotone2["Barcode"] = "fa-sharp fa-duotone fa-barcode";
  IconSharpDuotone2["BarcodeScan"] = "fa-sharp fa-duotone fa-barcode-scan";
  IconSharpDuotone2["Bars"] = "fa-sharp fa-duotone fa-bars";
  IconSharpDuotone2["BarsSort"] = "fa-sharp fa-duotone fa-bars-sort";
  IconSharpDuotone2["Bell"] = "fa-sharp fa-duotone fa-bell";
  IconSharpDuotone2["BellSlash"] = "fa-sharp fa-duotone fa-bell-slash";
  IconSharpDuotone2["Bolt"] = "fa-sharp fa-duotone fa-bolt";
  IconSharpDuotone2["Bomb"] = "fa-sharp fa-duotone fa-bomb";
  IconSharpDuotone2["Book"] = "fa-sharp fa-duotone fa-book";
  IconSharpDuotone2["BookOpen"] = "fa-sharp fa-duotone fa-book-open";
  IconSharpDuotone2["Box"] = "fa-sharp fa-duotone fa-box";
  IconSharpDuotone2["BoxArchive"] = "fa-sharp fa-duotone fa-box-archive";
  IconSharpDuotone2["BriefCase"] = "fa-sharp fa-duotone fa-brief-case";
  IconSharpDuotone2["Bug"] = "fa-sharp fa-duotone fa-bug";
  IconSharpDuotone2["Burger"] = "fa-sharp fa-duotone fa-bars";
  IconSharpDuotone2["CakeCandles"] = "fa-sharp fa-duotone fa-cake-candles";
  IconSharpDuotone2["Calendar"] = "fa-sharp fa-duotone fa-calendar";
  IconSharpDuotone2["CalendarAlt"] = "fa-sharp fa-duotone fa-calendar-alt";
  IconSharpDuotone2["CalendarCheck"] = "fa-sharp fa-duotone fa-calendar-check";
  IconSharpDuotone2["CalendarDay"] = "fa-sharp fa-duotone fa-calendar-day";
  IconSharpDuotone2["CalendarPlus"] = "fa-sharp fa-duotone fa-calendar-plus";
  IconSharpDuotone2["Camera"] = "fa-sharp fa-duotone fa-camera";
  IconSharpDuotone2["CameraAlt"] = "fa-sharp fa-duotone fa-camera-alt";
  IconSharpDuotone2["CameraWeb"] = "fa-sharp fa-duotone fa-camera-web";
  IconSharpDuotone2["CameraWebSlash"] = "fa-sharp fa-duotone fa-camera-web-slash";
  IconSharpDuotone2["Capsules"] = "fa-sharp fa-duotone fa-capsules";
  IconSharpDuotone2["CaretDown"] = "fa-sharp fa-duotone fa-caret-down";
  IconSharpDuotone2["CaretLeft"] = "fa-sharp fa-duotone fa-caret-left";
  IconSharpDuotone2["CaretRight"] = "fa-sharp fa-duotone fa-caret-right";
  IconSharpDuotone2["CaretUp"] = "fa-sharp fa-duotone fa-caret-up";
  IconSharpDuotone2["CartCirclePlus"] = "fa-sharp fa-duotone fa-cart-circle-plus";
  IconSharpDuotone2["CartShopping"] = "fa-sharp fa-duotone fa-cart-shopping";
  IconSharpDuotone2["ChartArea"] = "fa-sharp fa-duotone fa-chart-area";
  IconSharpDuotone2["ChartBar"] = "fa-sharp fa-duotone fa-chart-bar";
  IconSharpDuotone2["ChartColumn"] = "fa-sharp fa-duotone fa-chart-column";
  IconSharpDuotone2["ChartLine"] = "fa-sharp fa-duotone fa-chart-line";
  IconSharpDuotone2["ChartPie"] = "fa-sharp fa-duotone fa-chart-pie";
  IconSharpDuotone2["ChartSimple"] = "fa-sharp fa-duotone fa-chart-simple";
  IconSharpDuotone2["Chat"] = "fa-sharp fa-duotone fa-comment";
  IconSharpDuotone2["Check"] = "fa-sharp fa-duotone fa-check";
  IconSharpDuotone2["ChevronDown"] = "fa-sharp fa-duotone fa-chevron-down";
  IconSharpDuotone2["ChevronLeft"] = "fa-sharp fa-duotone fa-chevron-left";
  IconSharpDuotone2["ChevronRight"] = "fa-sharp fa-duotone fa-chevron-right";
  IconSharpDuotone2["ChevronUp"] = "fa-sharp fa-duotone fa-chevron-up";
  IconSharpDuotone2["Circle"] = "fa-sharp fa-duotone fa-circle";
  IconSharpDuotone2["CircleCheck"] = "fa-sharp fa-duotone fa-circle-check";
  IconSharpDuotone2["CircleExclamation"] = "fa-sharp fa-duotone fa-circle-exclamation";
  IconSharpDuotone2["CircleInfo"] = "fa-sharp fa-duotone fa-circle-info";
  IconSharpDuotone2["CircleSmall"] = "fa-sharp fa-duotone fa-circle-small";
  IconSharpDuotone2["CircleStop"] = "fa-sharp fa-duotone fa-circle-stop";
  IconSharpDuotone2["Clipboard"] = "fa-sharp fa-duotone fa-clipboard";
  IconSharpDuotone2["ClipboardMedical"] = "fa-sharp fa-duotone fa-clipboard-medical";
  IconSharpDuotone2["Clock"] = "fa-sharp fa-duotone fa-clock";
  IconSharpDuotone2["ClockRotateLeft"] = "fa-sharp fa-duotone fa-clock-rotate-left";
  IconSharpDuotone2["Close"] = "fa-sharp fa-duotone fa-xmark";
  IconSharpDuotone2["Cloud"] = "fa-sharp fa-duotone fa-cloud";
  IconSharpDuotone2["CloudArrowUp"] = "fa-sharp fa-duotone fa-cloud-arrow-up";
  IconSharpDuotone2["CloudDownload"] = "fa-sharp fa-duotone fa-cloud-download";
  IconSharpDuotone2["Code"] = "fa-sharp fa-duotone fa-code";
  IconSharpDuotone2["CodeMerge"] = "fa-sharp fa-duotone fa-code-merge";
  IconSharpDuotone2["Coins"] = "fa-sharp fa-duotone fa-coins";
  IconSharpDuotone2["Collapse"] = "fa-sharp fa-duotone fa-compress";
  IconSharpDuotone2["Comment"] = "fa-sharp fa-duotone fa-comment";
  IconSharpDuotone2["CommentDots"] = "fa-sharp fa-duotone fa-comment-dots";
  IconSharpDuotone2["CommentLines"] = "fa-sharp fa-duotone fa-comment-lines";
  IconSharpDuotone2["Comments"] = "fa-sharp fa-duotone fa-comments";
  IconSharpDuotone2["CommentSms"] = "fa-sharp fa-duotone fa-comment-sms";
  IconSharpDuotone2["Compress"] = "fa-sharp fa-duotone fa-compress";
  IconSharpDuotone2["Copy"] = "fa-sharp fa-duotone fa-copy";
  IconSharpDuotone2["Copyright"] = "fa-sharp fa-duotone fa-copyright";
  IconSharpDuotone2["CreditCard"] = "fa-sharp fa-duotone fa-credit-card";
  IconSharpDuotone2["Crown"] = "fa-sharp fa-duotone fa-crown";
  IconSharpDuotone2["Database"] = "fa-sharp fa-duotone fa-database";
  IconSharpDuotone2["Delete"] = "fa-sharp fa-duotone fa-xmark";
  IconSharpDuotone2["DeleteLeft"] = "fa-sharp fa-duotone fa-delete-left";
  IconSharpDuotone2["DeleteRight"] = "fa-sharp fa-duotone fa-delete-right";
  IconSharpDuotone2["Desktop"] = "fa-sharp fa-duotone fa-desktop";
  IconSharpDuotone2["Download"] = "fa-sharp fa-duotone fa-download";
  IconSharpDuotone2["Edit"] = "fa-sharp fa-duotone fa-pen";
  IconSharpDuotone2["Eject"] = "fa-sharp fa-duotone fa-eject";
  IconSharpDuotone2["Ellipsis"] = "fa-sharp fa-duotone fa-ellipsis";
  IconSharpDuotone2["EllipsisVertical"] = "fa-sharp fa-duotone fa-ellipsis-vertical";
  IconSharpDuotone2["Envelope"] = "fa-sharp fa-duotone fa-envelope";
  IconSharpDuotone2["Eraser"] = "fa-sharp fa-duotone fa-eraser";
  IconSharpDuotone2["EuroSign"] = "fa-sharp fa-duotone fa-euro-sign";
  IconSharpDuotone2["Exclamation"] = "fa-sharp fa-duotone fa-exclamation";
  IconSharpDuotone2["Expand"] = "fa-sharp fa-duotone fa-expand";
  IconSharpDuotone2["Eye"] = "fa-sharp fa-duotone fa-eye";
  IconSharpDuotone2["EyeSlash"] = "fa-sharp fa-duotone fa-eye-slash";
  IconSharpDuotone2["Family"] = "fa-sharp fa-duotone fa-family";
  IconSharpDuotone2["FastBackward"] = "fa-sharp fa-duotone fa-fast-backward";
  IconSharpDuotone2["FastForward"] = "fa-sharp fa-duotone fa-fast-forward";
  IconSharpDuotone2["File"] = "fa-sharp fa-duotone fa-file";
  IconSharpDuotone2["FileAudio"] = "fa-sharp fa-duotone fa-file-audio";
  IconSharpDuotone2["FileContract"] = "fa-sharp fa-duotone fa-file-contract";
  IconSharpDuotone2["FileDownload"] = "fa-sharp fa-duotone fa-file-download";
  IconSharpDuotone2["FileExcel"] = "fa-sharp fa-duotone fa-file-excel";
  IconSharpDuotone2["FileExport"] = "fa-sharp fa-duotone fa-file-export";
  IconSharpDuotone2["FileImage"] = "fa-sharp fa-duotone fa-file-image";
  IconSharpDuotone2["FileInvoice"] = "fa-sharp fa-duotone fa-file-invoice";
  IconSharpDuotone2["FileImport"] = "fa-sharp fa-duotone fa-file-import";
  IconSharpDuotone2["FileLines"] = "fa-sharp fa-duotone fa-file-lines";
  IconSharpDuotone2["FileMusic"] = "fa-sharp fa-duotone fa-file-music";
  IconSharpDuotone2["FilePdf"] = "fa-sharp fa-duotone fa-file-pdf";
  IconSharpDuotone2["Files"] = "fa-sharp fa-duotone fa-file-files";
  IconSharpDuotone2["FileSignature"] = "fa-sharp fa-duotone fa-file-signature";
  IconSharpDuotone2["FileVideo"] = "fa-sharp fa-duotone fa-file-video";
  IconSharpDuotone2["FileWord"] = "fa-sharp fa-duotone fa-file-word";
  IconSharpDuotone2["FileZipper"] = "fa-sharp fa-duotone fa-file-zipper";
  IconSharpDuotone2["Filter"] = "fa-sharp fa-duotone fa-filter";
  IconSharpDuotone2["Flag"] = "fa-sharp fa-duotone fa-flag";
  IconSharpDuotone2["FlagSwallowTail"] = "fa-sharp fa-duotone fa-flag-swallowtail";
  IconSharpDuotone2["FloppyDisk"] = "fa-sharp fa-duotone fa-floppy-disk";
  IconSharpDuotone2["Folder"] = "fa-sharp fa-duotone fa-folder";
  IconSharpDuotone2["FolderOpen"] = "fa-sharp fa-duotone fa-folder-open";
  IconSharpDuotone2["FontAwesome"] = "fa-sharp fa-duotone  fa-font-awesome";
  IconSharpDuotone2["Forward"] = "fa-sharp fa-duotone fa-forward";
  IconSharpDuotone2["ForwardStep"] = "fa-sharp fa-duotone fa-forward-step";
  IconSharpDuotone2["ForwardFast"] = "fa-sharp fa-duotone fa-forward-fast";
  IconSharpDuotone2["Futbol"] = "fa-sharp fa-duotone fa-futbol";
  IconSharpDuotone2["Gear"] = "fa-sharp fa-duotone fa-gear";
  IconSharpDuotone2["Gears"] = "fa-sharp fa-duotone fa-gears";
  IconSharpDuotone2["Globe"] = "fa-sharp fa-duotone fa-globe";
  IconSharpDuotone2["Hashtag"] = "fa-sharp fa-duotone fa-hashtag";
  IconSharpDuotone2["HatWizard"] = "fa-sharp fa-duotone fa-hat-wizard";
  IconSharpDuotone2["Headset"] = "fa-sharp fa-duotone fa-headset";
  IconSharpDuotone2["Hospital"] = "fa-sharp fa-duotone fa-hospital";
  IconSharpDuotone2["Hourglass"] = "fa-sharp fa-duotone fa-hourglass";
  IconSharpDuotone2["HourglassClock"] = "fa-sharp fa-duotone fa-hourglass-clock";
  IconSharpDuotone2["House"] = "fa-sharp fa-duotone fa-house";
  IconSharpDuotone2["HouseMedical"] = "fa-sharp fa-duotone fa-house-medical";
  IconSharpDuotone2["HouseUser"] = "fa-sharp fa-duotone fa-house-user";
  IconSharpDuotone2["Image"] = "fa-sharp fa-duotone fa-image";
  IconSharpDuotone2["Inbox"] = "fa-sharp fa-duotone fa-inbox";
  IconSharpDuotone2["InboxFull"] = "fa-sharp fa-duotone fa-inbox-full";
  IconSharpDuotone2["Info"] = "fa-sharp fa-duotone fa-info";
  IconSharpDuotone2["Key"] = "fa-sharp fa-duotone fa-key";
  IconSharpDuotone2["Keyboard"] = "fa-sharp fa-duotone fa-keyboard";
  IconSharpDuotone2["KeySkeleton"] = "fa-sharp fa-duotone fa-key-skeleton";
  IconSharpDuotone2["Laptop"] = "fa-sharp fa-duotone fa-laptop";
  IconSharpDuotone2["LaptopMedical"] = "fa-sharp fa-duotone fa-laptop-medical";
  IconSharpDuotone2["LevelDown"] = "fa-sharp fa-duotone fa-level-down";
  IconSharpDuotone2["LevelDownAlt"] = "fa-sharp fa-duotone fa-level-down-alt";
  IconSharpDuotone2["LevelLeft"] = "fa-sharp fa-duotone fa-level-left";
  IconSharpDuotone2["LevelLeftAlt"] = "fa-sharp fa-duotone fa-level-left-alt";
  IconSharpDuotone2["LevelRight"] = "fa-sharp fa-duotone fa-level-right";
  IconSharpDuotone2["LevelRightAlt"] = "fa-sharp fa-duotone fa-level-right-alt";
  IconSharpDuotone2["LevelUp"] = "fa-sharp fa-duotone fa-level-up";
  IconSharpDuotone2["LevelUpAlt"] = "fa-sharp fa-duotone fa-level-up-alt";
  IconSharpDuotone2["Link"] = "fa-sharp fa-duotone fa-link";
  IconSharpDuotone2["LinkExternal"] = "fa-sharp fa-duotone fa-arrow-up-right-from-square";
  IconSharpDuotone2["LinkHorizontal"] = "fa-sharp fa-duotone fa-link-horizontal";
  IconSharpDuotone2["LinkHorizontalSlash"] = "fa-sharp fa-duotone fa-link-horizontal-slash";
  IconSharpDuotone2["LinkSimple"] = "fa-sharp fa-duotone fa-link-simple";
  IconSharpDuotone2["LinkSimpleSlash"] = "fa-sharp fa-duotone fa-link-simple-slash";
  IconSharpDuotone2["LinkSlash"] = "fa-sharp fa-duotone fa-link-slash";
  IconSharpDuotone2["List"] = "fa-sharp fa-duotone fa-list";
  IconSharpDuotone2["ListCheck"] = "fa-sharp fa-duotone fa-list-check";
  IconSharpDuotone2["ListOl"] = "fa-sharp fa-duotone fa-list-ol";
  IconSharpDuotone2["ListTree"] = "fa-sharp fa-duotone fa-list-tree";
  IconSharpDuotone2["ListUl"] = "fa-sharp fa-duotone fa-list-ul";
  IconSharpDuotone2["LocationArrow"] = "fa-sharp fa-duotone fa-location-arrow";
  IconSharpDuotone2["LocationCrossHairs"] = "fa-sharp fa-duotone fa-location-crosshairs";
  IconSharpDuotone2["LocationCheck"] = "fa-sharp fa-duotone fa-location-check";
  IconSharpDuotone2["LocationDot"] = "fa-sharp fa-duotone fa-location-dot";
  IconSharpDuotone2["Lock"] = "fa-sharp fa-duotone fa-lock";
  IconSharpDuotone2["LockOpen"] = "fa-sharp fa-duotone fa-lock-open";
  IconSharpDuotone2["Login"] = "fa-sharp fa-duotone fa-arrow-right-to-bracket";
  IconSharpDuotone2["Logout"] = "fa-sharp fa-duotone fa-arrow-right-from-bracket";
  IconSharpDuotone2["MagnifyingGlass"] = "fa-sharp fa-duotone fa-magnifying-glass";
  IconSharpDuotone2["MagnifyingGlassMinus"] = "fa-sharp fa-duotone fa-magnifying-glass-minus";
  IconSharpDuotone2["MagnifyingGlassPlus"] = "fa-sharp fa-duotone fa-magnifying-glass-plus";
  IconSharpDuotone2["Mail"] = "fa-sharp fa-duotone fa-envelope";
  IconSharpDuotone2["Mailbox"] = "fa-sharp fa-duotone fa-mailbox";
  IconSharpDuotone2["MailOpen"] = "fa-sharp fa-duotone fa-envelope-open";
  IconSharpDuotone2["Map"] = "fa-sharp fa-duotone fa-map";
  IconSharpDuotone2["MapLocation"] = "fa-sharp fa-duotone fa-map-location";
  IconSharpDuotone2["MapLocationDot"] = "fa-sharp fa-duotone fa-map-location-dot";
  IconSharpDuotone2["MapPin"] = "fa-sharp fa-duotone fa-map-pin";
  IconSharpDuotone2["Maximize"] = "fa-sharp fa-duotone fa-maximize";
  IconSharpDuotone2["Merge"] = "fa-sharp fa-duotone fa-merge";
  IconSharpDuotone2["Message"] = "fa-sharp fa-duotone fa-message";
  IconSharpDuotone2["MessageCode"] = "fa-sharp fa-duotone fa-message-code";
  IconSharpDuotone2["MessageDots"] = "fa-sharp fa-duotone fa-message-dots";
  IconSharpDuotone2["MessageLines"] = "fa-sharp fa-duotone fa-message-lines";
  IconSharpDuotone2["Messages"] = "fa-sharp fa-duotone fa-messages";
  IconSharpDuotone2["Microphone"] = "fa-sharp fa-duotone fa-microphone";
  IconSharpDuotone2["MicrophoneLines"] = "fa-sharp fa-duotone fa-microphone-lines";
  IconSharpDuotone2["MicrophoneLinesSlash"] = "fa-sharp fa-duotone fa-microphone-lines-slash";
  IconSharpDuotone2["MicrophoneSlash"] = "fa-sharp fa-duotone fa-microphone-slash";
  IconSharpDuotone2["Microscope"] = "fa-sharp fa-duotone fa-microscope";
  IconSharpDuotone2["Minimize"] = "fa-sharp fa-duotone fa-minimize";
  IconSharpDuotone2["Minus"] = "fa-sharp fa-duotone fa-minus";
  IconSharpDuotone2["Mobile"] = "fa-sharp fa-duotone fa-mobile";
  IconSharpDuotone2["MobileNotch"] = "fa-sharp fa-duotone fa-mobile-notch";
  IconSharpDuotone2["MoneyCheckDollarPen"] = "fa-sharp fa-duotone fa-money-check-dollar-pen";
  IconSharpDuotone2["Music"] = "fa-sharp fa-duotone fa-music";
  IconSharpDuotone2["MusicSlash"] = "fa-sharp fa-duotone fa-music-slash";
  IconSharpDuotone2["NewsPaper"] = "fa-sharp fa-duotone fa-newspaper";
  IconSharpDuotone2["Palette"] = "fa-sharp fa-duotone fa-palette";
  IconSharpDuotone2["PaperClip"] = "fa-sharp fa-duotone fa-paperclip";
  IconSharpDuotone2["PaperClipVertical"] = "fa-sharp fa-duotone fa-paperclip-vertical";
  IconSharpDuotone2["PaperPlane"] = "fa-sharp fa-duotone fa-paper-plane";
  IconSharpDuotone2["PaperPlaneTop"] = "fa-sharp fa-duotone fa-paper-plane-top";
  IconSharpDuotone2["Paste"] = "fa-sharp fa-duotone fa-paste";
  IconSharpDuotone2["Pause"] = "fa-sharp fa-duotone fa-pause";
  IconSharpDuotone2["Pen"] = "fa-sharp fa-duotone fa-pen";
  IconSharpDuotone2["Pencil"] = "fa-sharp fa-duotone fa-pencil";
  IconSharpDuotone2["PenToSquare"] = "fa-sharp fa-duotone fa-pen-to-square";
  IconSharpDuotone2["PeopleArrowsLeftRight"] = "fa-sharp fa-duotone fa-people-arrows-left-right";
  IconSharpDuotone2["Percentage"] = "fa-sharp fa-duotone fa-percentage";
  IconSharpDuotone2["Period"] = "fa-sharp fa-duotone fa-period";
  IconSharpDuotone2["PersonChalkboard"] = "fa-sharp fa-duotone fa-person-chalkboard";
  IconSharpDuotone2["PersonMilitaryRifle"] = "fa-sharp fa-duotone fa-person-military-rifle";
  IconSharpDuotone2["Phone"] = "fa-sharp fa-duotone fa-phone";
  IconSharpDuotone2["Play"] = "fa-sharp fa-duotone fa-play";
  IconSharpDuotone2["PlayPause"] = "fa-sharp fa-duotone fa-play-pause";
  IconSharpDuotone2["Plus"] = "fa-sharp fa-duotone fa-plus";
  IconSharpDuotone2["Print"] = "fa-sharp fa-duotone fa-print";
  IconSharpDuotone2["Pumo"] = "fa-sharp fa-duotone fa-font-awesome";
  IconSharpDuotone2["Question"] = "fa-sharp fa-duotone fa-question";
  IconSharpDuotone2["Redo"] = "fa-sharp fa-duotone fa-redo";
  IconSharpDuotone2["RedoAlt"] = "fa-sharp fa-duotone fa-redo-alt";
  IconSharpDuotone2["Refresh"] = "fa-sharp fa-duotone fa-arrows-rotate";
  IconSharpDuotone2["Remove"] = "fa-sharp fa-duotone fa-xmark";
  IconSharpDuotone2["Repeat"] = "fa-sharp fa-duotone fa-repeat";
  IconSharpDuotone2["Reply"] = "fa-sharp fa-duotone fa-reply";
  IconSharpDuotone2["ReplyAll"] = "fa-sharp fa-duotone fa-reply-all";
  IconSharpDuotone2["RightFromBracket"] = "fa-sharp fa-duotone fa-right-from-bracket";
  IconSharpDuotone2["RightToBracket"] = "fa-sharp fa-duotone fa-right-to-bracket";
  IconSharpDuotone2["Rotate"] = "fa-sharp fa-duotone fa-rotate";
  IconSharpDuotone2["RotateLeft"] = "fa-sharp fa-duotone fa-rotate-left";
  IconSharpDuotone2["SackDollar"] = "fa-sharp fa-duotone fa-sack-dollar";
  IconSharpDuotone2["Save"] = "fa-sharp fa-duotone fa-floppy-disk";
  IconSharpDuotone2["Scissors"] = "fa-sharp fa-duotone fa-scissors";
  IconSharpDuotone2["ScrewdriverWrench"] = "fa-sharp fa-duotone fa-screwdriver-wrench";
  IconSharpDuotone2["Search"] = "fa-sharp fa-duotone fa-magnifying-glass";
  IconSharpDuotone2["SensorTriangleExclamation"] = "fa-sharp fa-duotone fa-sensor-triangle-exclamation";
  IconSharpDuotone2["Settings"] = "fa-sharp fa-duotone fa-gear";
  IconSharpDuotone2["Share"] = "fa-sharp fa-duotone fa-share";
  IconSharpDuotone2["ShareAll"] = "fa-sharp fa-duotone fa-share-all";
  IconSharpDuotone2["ShareNodes"] = "fa-sharp fa-duotone fa-share-nodes";
  IconSharpDuotone2["ShareFromSquare"] = "fa-sharp fa-duotone fa-share-from-square";
  IconSharpDuotone2["ShieldCheck"] = "fa-sharp fa-duotone fa-shield-check";
  IconSharpDuotone2["Ship"] = "fa-sharp fa-duotone fa-ship";
  IconSharpDuotone2["Sitemap"] = "fa-sharp fa-duotone fa-sitemap";
  IconSharpDuotone2["Soccer"] = "fa-sharp fa-duotone fa-futbol";
  IconSharpDuotone2["Sort"] = "fa-sharp fa-duotone fa-sort";
  IconSharpDuotone2["SortDown"] = "fa-sharp fa-duotone fa-sort-down";
  IconSharpDuotone2["SortUp"] = "fa-sharp fa-duotone fa-sort-up";
  IconSharpDuotone2["Spinner"] = "fa-sharp fa-duotone fa-spinner";
  IconSharpDuotone2["Split"] = "fa-sharp fa-duotone fa-split";
  IconSharpDuotone2["SquareCheck"] = "fa-sharp fa-duotone fa-square-check";
  IconSharpDuotone2["SquareMinus"] = "fa-sharp fa-duotone fa-square-minus";
  IconSharpDuotone2["SquarePen"] = "fa-sharp fa-duotone fa-square-pen";
  IconSharpDuotone2["Stamp"] = "fa-sharp fa-duotone fa-stamp";
  IconSharpDuotone2["Star"] = "fa-sharp fa-duotone fa-star";
  IconSharpDuotone2["StepBackward"] = "fa-sharp fa-duotone fa-step-backward";
  IconSharpDuotone2["StepForward"] = "fa-sharp fa-duotone fa-step-forward";
  IconSharpDuotone2["Stethoscope"] = "fa-sharp fa-duotone fa-stethoscope";
  IconSharpDuotone2["Stop"] = "fa-sharp fa-duotone fa-stop";
  IconSharpDuotone2["Table"] = "fa-sharp fa-duotone fa-table";
  IconSharpDuotone2["TableRows"] = "fa-sharp fa-duotone fa-table-rows";
  IconSharpDuotone2["Tablet"] = "fa-sharp fa-duotone fa-tablet";
  IconSharpDuotone2["Tag"] = "fa-sharp fa-duotone fa-tag";
  IconSharpDuotone2["Tags"] = "fa-sharp fa-duotone fa-tags";
  IconSharpDuotone2["Tasks"] = "fa-sharp fa-duotone fa-tasks";
  IconSharpDuotone2["ThumbsDown"] = "fa-sharp fa-duotone fa-thumbs-down";
  IconSharpDuotone2["ThumbsUp"] = "fa-sharp fa-duotone fa-thumbs-up";
  IconSharpDuotone2["Thumbtack"] = "fa-sharp fa-duotone fa-thumbtack";
  IconSharpDuotone2["Timer"] = "fa-sharp fa-duotone fa-timer";
  IconSharpDuotone2["Trash"] = "fa-sharp fa-duotone fa-trash";
  IconSharpDuotone2["TrashCanList"] = "fa-sharp fa-duotone fa-trash-can-list";
  IconSharpDuotone2["TrashUndo"] = "fa-sharp fa-duotone fa-trash-undo";
  IconSharpDuotone2["TrashXmark"] = "fa-sharp fa-duotone fa-trash-xmark";
  IconSharpDuotone2["TriangleExclamation"] = "fa-sharp fa-duotone fa-triangle-exclamation";
  IconSharpDuotone2["Truck"] = "fa-sharp fa-duotone fa-truck";
  IconSharpDuotone2["Undo"] = "fa-sharp fa-duotone fa-arrow-rotate-left";
  IconSharpDuotone2["Unlock"] = "fa-sharp fa-duotone fa-unlock";
  IconSharpDuotone2["Upload"] = "fa-sharp fa-duotone fa-upload";
  IconSharpDuotone2["UsbDrive"] = "fa-sharp fa-duotone fa-usb-drive";
  IconSharpDuotone2["User"] = "fa-sharp fa-duotone fa-user";
  IconSharpDuotone2["UserCheck"] = "fa-sharp fa-duotone fa-user-check";
  IconSharpDuotone2["UserClock"] = "fa-sharp fa-duotone fa-user-clock";
  IconSharpDuotone2["UserDoctor"] = "fa-sharp fa-duotone fa-user-doctor";
  IconSharpDuotone2["UserDoctorHair"] = "fa-sharp fa-duotone fa-user-doctor-hair";
  IconSharpDuotone2["UserDoctorHairLong"] = "fa-sharp fa-duotone fa-user-doctor-hair-long";
  IconSharpDuotone2["UserGear"] = "fa-sharp fa-duotone fa-user-gear";
  IconSharpDuotone2["UserGroup"] = "fa-sharp fa-duotone fa-user-group";
  IconSharpDuotone2["UserHair"] = "fa-sharp fa-duotone fa-user-hair";
  IconSharpDuotone2["UserHairLong"] = "fa-sharp fa-duotone fa-user-hair-long";
  IconSharpDuotone2["UserHeadset"] = "fa-sharp fa-duotone fa-user-headset";
  IconSharpDuotone2["Users"] = "fa-sharp fa-duotone fa-users";
  IconSharpDuotone2["UserSecret"] = "fa-sharp fa-duotone fa-user-secret";
  IconSharpDuotone2["UsersMedical"] = "fa-sharp fa-duotone fa-users-medical";
  IconSharpDuotone2["UserTag"] = "fa-sharp fa-duotone fa-user-tag";
  IconSharpDuotone2["UserXmark"] = "fa-sharp fa-duotone fa-user-xmark";
  IconSharpDuotone2["Video"] = "fa-sharp fa-duotone fa-video";
  IconSharpDuotone2["VideoSlash"] = "fa-sharp fa-duotone fa-video-slash";
  IconSharpDuotone2["Volume"] = "fa-sharp fa-duotone fa-volume";
  IconSharpDuotone2["VolumeHigh"] = "fa-sharp fa-duotone fa-volume-high";
  IconSharpDuotone2["VolumeLow"] = "fa-sharp fa-duotone fa-volume-low";
  IconSharpDuotone2["VolumeOff"] = "fa-sharp fa-duotone fa-volume-off";
  IconSharpDuotone2["VolumeSlash"] = "fa-sharp fa-duotone fa-volume-slash";
  IconSharpDuotone2["VolumeXmark"] = "fa-sharp fa-duotone fa-volume-xmark";
  IconSharpDuotone2["Wifi"] = "fa-sharp fa-duotone fa-wifi";
  IconSharpDuotone2["WifiExclamation"] = "fa-sharp fa-duotone fa-wifi-exclamation";
  IconSharpDuotone2["WifiFair"] = "fa-sharp fa-duotone fa-wifi-fair";
  IconSharpDuotone2["WifiSlash"] = "fa-sharp fa-duotone fa-wifi-slash";
  IconSharpDuotone2["Window"] = "fa-sharp fa-duotone fa-window";
  IconSharpDuotone2["Xmark"] = "fa-sharp fa-duotone fa-xmark";
  return IconSharpDuotone2;
})(IconSharpDuotone || {});
var IconSharpThin = /* @__PURE__ */ ((IconSharpThin2) => {
  IconSharpThin2["Add"] = "fa-sharp fa-thin fa-plus";
  IconSharpThin2["AddressCard"] = "fa-sharp fa-thin fa-address-card";
  IconSharpThin2["Alert"] = "fa-sharp fa-thin fa-triangle-exclamation";
  IconSharpThin2["AngleDown"] = "fa-sharp fa-thin fa-angle-down";
  IconSharpThin2["AngleLeft"] = "fa-sharp fa-thin fa-angle-left";
  IconSharpThin2["AngleRight"] = "fa-sharp fa-thin fa-angle-right";
  IconSharpThin2["AngleUp"] = "fa-sharp fa-thin fa-angle-up";
  IconSharpThin2["Aperture"] = "fa-sharp fa-thin fa-aperture";
  IconSharpThin2["ArrowDown"] = "fa-sharp fa-thin fa-arrow-down";
  IconSharpThin2["ArrowDownShortWide"] = "fa-sharp fa-thin fa-arrow-down-short-wide";
  IconSharpThin2["ArrowDownWideShort"] = "fa-sharp fa-thin fa-arrow-down-wide-short";
  IconSharpThin2["ArrowLeft"] = "fa-sharp fa-thin fa-arrow-left";
  IconSharpThin2["ArrowPointer"] = "fa-sharp fa-thin fa-arrow-pointer";
  IconSharpThin2["ArrowRight"] = "fa-sharp fa-thin fa-arrow-right";
  IconSharpThin2["ArrowRightToBracket"] = "fa-sharp fa-thin fa-arrow-right-to-bracket";
  IconSharpThin2["ArrowRightFromBracket"] = "fa-sharp fa-thin fa-arrow-right-from-bracket";
  IconSharpThin2["ArrowRotateRight"] = "fa-sharp fa-thin fa-arrow-rotate-right";
  IconSharpThin2["ArrowsRepeat"] = "fa-sharp fa-thin fa-arrows-repeat";
  IconSharpThin2["ArrowsRotate"] = "fa-sharp fa-thin fa-arrows-rotate";
  IconSharpThin2["ArrowUp"] = "fa-sharp fa-thin fa-arrow-up";
  IconSharpThin2["Asterisk"] = "fa-sharp fa-thin fa-asterisk";
  IconSharpThin2["At"] = "fa-sharp fa-thin fa-at";
  IconSharpThin2["Attachment"] = "fa-sharp fa-thin fa-paperclip";
  IconSharpThin2["Back"] = "fa-sharp fa-thin fa-angle-left";
  IconSharpThin2["Backward"] = "fa-sharp fa-thin fa-backward";
  IconSharpThin2["BackwardFast"] = "fa-sharp fa-thin fa-backward-fast";
  IconSharpThin2["BackwardStep"] = "fa-sharp fa-thin fa-backward-step";
  IconSharpThin2["BalanceScale"] = "fa-sharp fa-thin fa-balance-scale";
  IconSharpThin2["BallotCheck"] = "fa-sharp fa-thin fa-ballot-check";
  IconSharpThin2["Ban"] = "fa-sharp fa-thin fa-ban";
  IconSharpThin2["Barcode"] = "fa-sharp fa-thin fa-barcode";
  IconSharpThin2["BarcodeScan"] = "fa-sharp fa-thin fa-barcode-scan";
  IconSharpThin2["Bars"] = "fa-sharp fa-thin fa-bars";
  IconSharpThin2["BarsSort"] = "fa-sharp fa-thin fa-bars-sort";
  IconSharpThin2["Bell"] = "fa-sharp fa-thin fa-bell";
  IconSharpThin2["BellSlash"] = "fa-sharp fa-thin fa-bell-slash";
  IconSharpThin2["Bolt"] = "fa-sharp fa-thin fa-bolt";
  IconSharpThin2["Bomb"] = "fa-sharp fa-thin fa-bomb";
  IconSharpThin2["Book"] = "fa-sharp fa-thin fa-book";
  IconSharpThin2["BookOpen"] = "fa-sharp fa-thin fa-book-open";
  IconSharpThin2["Box"] = "fa-sharp fa-thin fa-box";
  IconSharpThin2["BoxArchive"] = "fa-sharp fa-thin fa-box-archive";
  IconSharpThin2["BriefCase"] = "fa-sharp fa-thin fa-brief-case";
  IconSharpThin2["Bug"] = "fa-sharp fa-thin fa-bug";
  IconSharpThin2["Burger"] = "fa-sharp fa-thin fa-bars";
  IconSharpThin2["CakeCandles"] = "fa-sharp fa-thin fa-cake-candles";
  IconSharpThin2["Calendar"] = "fa-sharp fa-thin fa-calendar";
  IconSharpThin2["CalendarAlt"] = "fa-sharp fa-thin fa-calendar-alt";
  IconSharpThin2["CalendarCheck"] = "fa-sharp fa-thin fa-calendar-check";
  IconSharpThin2["CalendarDay"] = "fa-sharp fa-thin fa-calendar-day";
  IconSharpThin2["CalendarPlus"] = "fa-sharp fa-thin fa-calendar-plus";
  IconSharpThin2["Camera"] = "fa-sharp fa-thin fa-camera";
  IconSharpThin2["CameraAlt"] = "fa-sharp fa-thin fa-camera-alt";
  IconSharpThin2["CameraWeb"] = "fa-sharp fa-thin fa-camera-web";
  IconSharpThin2["CameraWebSlash"] = "fa-sharp fa-thin fa-camera-web-slash";
  IconSharpThin2["Capsules"] = "fa-sharp fa-thin fa-capsules";
  IconSharpThin2["CaretDown"] = "fa-sharp fa-thin fa-caret-down";
  IconSharpThin2["CaretLeft"] = "fa-sharp fa-thin fa-caret-left";
  IconSharpThin2["CaretRight"] = "fa-sharp fa-thin fa-caret-right";
  IconSharpThin2["CaretUp"] = "fa-sharp fa-thin fa-caret-up";
  IconSharpThin2["CartCirclePlus"] = "fa-sharp fa-thin fa-cart-circle-plus";
  IconSharpThin2["CartShopping"] = "fa-sharp fa-thin fa-cart-shopping";
  IconSharpThin2["ChartArea"] = "fa-sharp fa-thin fa-chart-area";
  IconSharpThin2["ChartBar"] = "fa-sharp fa-thin fa-chart-bar";
  IconSharpThin2["ChartColumn"] = "fa-sharp fa-thin fa-chart-column";
  IconSharpThin2["ChartLine"] = "fa-sharp fa-thin fa-chart-line";
  IconSharpThin2["ChartPie"] = "fa-sharp fa-thin fa-chart-pie";
  IconSharpThin2["ChartSimple"] = "fa-sharp fa-thin fa-chart-simple";
  IconSharpThin2["Chat"] = "fa-sharp fa-thin fa-comment";
  IconSharpThin2["Check"] = "fa-sharp fa-thin fa-check";
  IconSharpThin2["ChevronDown"] = "fa-sharp fa-thin fa-chevron-down";
  IconSharpThin2["ChevronLeft"] = "fa-sharp fa-thin fa-chevron-left";
  IconSharpThin2["ChevronRight"] = "fa-sharp fa-thin fa-chevron-right";
  IconSharpThin2["ChevronUp"] = "fa-sharp fa-thin fa-chevron-up";
  IconSharpThin2["Circle"] = "fa-sharp fa-thin fa-circle";
  IconSharpThin2["CircleCheck"] = "fa-sharp fa-thin fa-circle-check";
  IconSharpThin2["CircleExclamation"] = "fa-sharp fa-thin fa-circle-exclamation";
  IconSharpThin2["CircleInfo"] = "fa-sharp fa-thin fa-circle-info";
  IconSharpThin2["CircleSmall"] = "fa-sharp fa-thin fa-circle-small";
  IconSharpThin2["CircleStop"] = "fa-sharp fa-thin fa-circle-stop";
  IconSharpThin2["Clipboard"] = "fa-sharp fa-thin fa-clipboard";
  IconSharpThin2["ClipboardMedical"] = "fa-sharp fa-thin fa-clipboard-medical";
  IconSharpThin2["Clock"] = "fa-sharp fa-thin fa-clock";
  IconSharpThin2["ClockRotateLeft"] = "fa-sharp fa-thin fa-clock-rotate-left";
  IconSharpThin2["Close"] = "fa-sharp fa-thin fa-xmark";
  IconSharpThin2["Cloud"] = "fa-sharp fa-thin fa-cloud";
  IconSharpThin2["CloudArrowUp"] = "fa-sharp fa-thin fa-cloud-arrow-up";
  IconSharpThin2["CloudDownload"] = "fa-sharp fa-thin fa-cloud-download";
  IconSharpThin2["Code"] = "fa-sharp fa-thin fa-code";
  IconSharpThin2["CodeMerge"] = "fa-sharp fa-thin fa-code-merge";
  IconSharpThin2["Coins"] = "fa-sharp fa-thin fa-coins";
  IconSharpThin2["Collapse"] = "fa-sharp fa-thin fa-compress";
  IconSharpThin2["Comment"] = "fa-sharp fa-thin fa-comment";
  IconSharpThin2["CommentDots"] = "fa-sharp fa-thin fa-comment-dots";
  IconSharpThin2["CommentLines"] = "fa-sharp fa-thin fa-comment-lines";
  IconSharpThin2["Comments"] = "fa-sharp fa-thin fa-comments";
  IconSharpThin2["CommentSms"] = "fa-sharp fa-thin fa-comment-sms";
  IconSharpThin2["Compress"] = "fa-sharp fa-thin fa-compress";
  IconSharpThin2["Copy"] = "fa-sharp fa-thin fa-copy";
  IconSharpThin2["Copyright"] = "fa-sharp fa-thin fa-copyright";
  IconSharpThin2["CreditCard"] = "fa-sharp fa-thin fa-credit-card";
  IconSharpThin2["Crown"] = "fa-sharp fa-thin fa-crown";
  IconSharpThin2["Database"] = "fa-sharp fa-thin fa-database";
  IconSharpThin2["Delete"] = "fa-sharp fa-thin fa-xmark";
  IconSharpThin2["DeleteLeft"] = "fa-sharp fa-thin fa-delete-left";
  IconSharpThin2["DeleteRight"] = "fa-sharp fa-thin fa-delete-right";
  IconSharpThin2["Desktop"] = "fa-sharp fa-thin fa-desktop";
  IconSharpThin2["Download"] = "fa-sharp fa-thin fa-download";
  IconSharpThin2["Edit"] = "fa-sharp fa-thin fa-pen";
  IconSharpThin2["Eject"] = "fa-sharp fa-thin fa-eject";
  IconSharpThin2["Ellipsis"] = "fa-sharp fa-thin fa-ellipsis";
  IconSharpThin2["EllipsisVertical"] = "fa-sharp fa-thin fa-ellipsis-vertical";
  IconSharpThin2["Envelope"] = "fa-sharp fa-thin fa-envelope";
  IconSharpThin2["Eraser"] = "fa-sharp fa-thin fa-eraser";
  IconSharpThin2["EuroSign"] = "fa-sharp fa-thin fa-euro-sign";
  IconSharpThin2["Exclamation"] = "fa-sharp fa-thin fa-exclamation";
  IconSharpThin2["Expand"] = "fa-sharp fa-thin fa-expand";
  IconSharpThin2["Eye"] = "fa-sharp fa-thin fa-eye";
  IconSharpThin2["EyeSlash"] = "fa-sharp fa-thin fa-eye-slash";
  IconSharpThin2["Family"] = "fa-sharp fa-thin fa-family";
  IconSharpThin2["FastBackward"] = "fa-sharp fa-thin fa-fast-backward";
  IconSharpThin2["FastForward"] = "fa-sharp fa-thin fa-fast-forward";
  IconSharpThin2["File"] = "fa-sharp fa-thin fa-file";
  IconSharpThin2["FileAudio"] = "fa-sharp fa-thin fa-file-audio";
  IconSharpThin2["FileContract"] = "fa-sharp fa-thin fa-file-contract";
  IconSharpThin2["FileDownload"] = "fa-sharp fa-thin fa-file-download";
  IconSharpThin2["FileExcel"] = "fa-sharp fa-thin fa-file-excel";
  IconSharpThin2["FileExport"] = "fa-sharp fa-thin fa-file-export";
  IconSharpThin2["FileImage"] = "fa-sharp fa-thin fa-file-image";
  IconSharpThin2["FileInvoice"] = "fa-sharp fa-thin fa-file-invoice";
  IconSharpThin2["FileImport"] = "fa-sharp fa-thin fa-file-import";
  IconSharpThin2["FileLines"] = "fa-sharp fa-thin fa-file-lines";
  IconSharpThin2["FileMusic"] = "fa-sharp fa-thin fa-file-music";
  IconSharpThin2["FilePdf"] = "fa-sharp fa-thin fa-file-pdf";
  IconSharpThin2["Files"] = "fa-sharp fa-thin fa-file-files";
  IconSharpThin2["FileSignature"] = "fa-sharp fa-thin fa-file-signature";
  IconSharpThin2["FileVideo"] = "fa-sharp fa-thin fa-file-video";
  IconSharpThin2["FileWord"] = "fa-sharp fa-thin fa-file-word";
  IconSharpThin2["FileZipper"] = "fa-sharp fa-thin fa-file-zipper";
  IconSharpThin2["Filter"] = "fa-sharp fa-thin fa-filter";
  IconSharpThin2["Flag"] = "fa-sharp fa-thin fa-flag";
  IconSharpThin2["FlagSwallowTail"] = "fa-sharp fa-thin fa-flag-swallowtail";
  IconSharpThin2["FloppyDisk"] = "fa-sharp fa-thin fa-floppy-disk";
  IconSharpThin2["Folder"] = "fa-sharp fa-thin fa-folder";
  IconSharpThin2["FolderOpen"] = "fa-sharp fa-thin fa-folder-open";
  IconSharpThin2["FontAwesome"] = "fa-sharp fa-thin  fa-font-awesome";
  IconSharpThin2["Forward"] = "fa-sharp fa-thin fa-forward";
  IconSharpThin2["ForwardStep"] = "fa-sharp fa-thin fa-forward-step";
  IconSharpThin2["ForwardFast"] = "fa-sharp fa-thin fa-forward-fast";
  IconSharpThin2["Futbol"] = "fa-sharp fa-thin fa-futbol";
  IconSharpThin2["Gear"] = "fa-sharp fa-thin fa-gear";
  IconSharpThin2["Gears"] = "fa-sharp fa-thin fa-gears";
  IconSharpThin2["Globe"] = "fa-sharp fa-thin fa-globe";
  IconSharpThin2["Hashtag"] = "fa-sharp fa-thin fa-hashtag";
  IconSharpThin2["HatWizard"] = "fa-sharp fa-thin fa-hat-wizard";
  IconSharpThin2["Headset"] = "fa-sharp fa-thin fa-headset";
  IconSharpThin2["Hospital"] = "fa-sharp fa-thin fa-hospital";
  IconSharpThin2["Hourglass"] = "fa-sharp fa-thin fa-hourglass";
  IconSharpThin2["HourglassClock"] = "fa-sharp fa-thin fa-hourglass-clock";
  IconSharpThin2["House"] = "fa-sharp fa-thin fa-house";
  IconSharpThin2["HouseMedical"] = "fa-sharp fa-thin fa-house-medical";
  IconSharpThin2["HouseUser"] = "fa-sharp fa-thin fa-house-user";
  IconSharpThin2["Image"] = "fa-sharp fa-thin fa-image";
  IconSharpThin2["Inbox"] = "fa-sharp fa-thin fa-inbox";
  IconSharpThin2["InboxFull"] = "fa-sharp fa-thin fa-inbox-full";
  IconSharpThin2["Info"] = "fa-sharp fa-thin fa-info";
  IconSharpThin2["Key"] = "fa-sharp fa-thin fa-key";
  IconSharpThin2["Keyboard"] = "fa-sharp fa-thin fa-keyboard";
  IconSharpThin2["KeySkeleton"] = "fa-sharp fa-thin fa-key-skeleton";
  IconSharpThin2["Laptop"] = "fa-sharp fa-thin fa-laptop";
  IconSharpThin2["LaptopMedical"] = "fa-sharp fa-thin fa-laptop-medical";
  IconSharpThin2["LevelDown"] = "fa-sharp fa-thin fa-level-down";
  IconSharpThin2["LevelDownAlt"] = "fa-sharp fa-thin fa-level-down-alt";
  IconSharpThin2["LevelLeft"] = "fa-sharp fa-thin fa-level-left";
  IconSharpThin2["LevelLeftAlt"] = "fa-sharp fa-thin fa-level-left-alt";
  IconSharpThin2["LevelRight"] = "fa-sharp fa-thin fa-level-right";
  IconSharpThin2["LevelRightAlt"] = "fa-sharp fa-thin fa-level-right-alt";
  IconSharpThin2["LevelUp"] = "fa-sharp fa-thin fa-level-up";
  IconSharpThin2["LevelUpAlt"] = "fa-sharp fa-thin fa-level-up-alt";
  IconSharpThin2["Link"] = "fa-sharp fa-thin fa-link";
  IconSharpThin2["LinkExternal"] = "fa-sharp fa-thin fa-arrow-up-right-from-square";
  IconSharpThin2["LinkHorizontal"] = "fa-sharp fa-thin fa-link-horizontal";
  IconSharpThin2["LinkHorizontalSlash"] = "fa-sharp fa-thin fa-link-horizontal-slash";
  IconSharpThin2["LinkSimple"] = "fa-sharp fa-thin fa-link-simple";
  IconSharpThin2["LinkSimpleSlash"] = "fa-sharp fa-thin fa-link-simple-slash";
  IconSharpThin2["LinkSlash"] = "fa-sharp fa-thin fa-link-slash";
  IconSharpThin2["List"] = "fa-sharp fa-thin fa-list";
  IconSharpThin2["ListCheck"] = "fa-sharp fa-thin fa-list-check";
  IconSharpThin2["ListOl"] = "fa-sharp fa-thin fa-list-ol";
  IconSharpThin2["ListTree"] = "fa-sharp fa-thin fa-list-tree";
  IconSharpThin2["ListUl"] = "fa-sharp fa-thin fa-list-ul";
  IconSharpThin2["LocationArrow"] = "fa-sharp fa-thin fa-location-arrow";
  IconSharpThin2["LocationCrossHairs"] = "fa-sharp fa-thin fa-location-crosshairs";
  IconSharpThin2["LocationCheck"] = "fa-sharp fa-thin fa-location-check";
  IconSharpThin2["LocationDot"] = "fa-sharp fa-thin fa-location-dot";
  IconSharpThin2["Lock"] = "fa-sharp fa-thin fa-lock";
  IconSharpThin2["LockOpen"] = "fa-sharp fa-thin fa-lock-open";
  IconSharpThin2["Login"] = "fa-sharp fa-thin fa-arrow-right-to-bracket";
  IconSharpThin2["Logout"] = "fa-sharp fa-thin fa-arrow-right-from-bracket";
  IconSharpThin2["MagnifyingGlass"] = "fa-sharp fa-thin fa-magnifying-glass";
  IconSharpThin2["MagnifyingGlassMinus"] = "fa-sharp fa-thin fa-magnifying-glass-minus";
  IconSharpThin2["MagnifyingGlassPlus"] = "fa-sharp fa-thin fa-magnifying-glass-plus";
  IconSharpThin2["Mail"] = "fa-sharp fa-thin fa-envelope";
  IconSharpThin2["Mailbox"] = "fa-sharp fa-thin fa-mailbox";
  IconSharpThin2["MailOpen"] = "fa-sharp fa-thin fa-envelope-open";
  IconSharpThin2["Map"] = "fa-sharp fa-thin fa-map";
  IconSharpThin2["MapLocation"] = "fa-sharp fa-thin fa-map-location";
  IconSharpThin2["MapLocationDot"] = "fa-sharp fa-thin fa-map-location-dot";
  IconSharpThin2["MapPin"] = "fa-sharp fa-thin fa-map-pin";
  IconSharpThin2["Maximize"] = "fa-sharp fa-thin fa-maximize";
  IconSharpThin2["Merge"] = "fa-sharp fa-thin fa-merge";
  IconSharpThin2["Message"] = "fa-sharp fa-thin fa-message";
  IconSharpThin2["MessageCode"] = "fa-sharp fa-thin fa-message-code";
  IconSharpThin2["MessageDots"] = "fa-sharp fa-thin fa-message-dots";
  IconSharpThin2["MessageLines"] = "fa-sharp fa-thin fa-message-lines";
  IconSharpThin2["Messages"] = "fa-sharp fa-thin fa-messages";
  IconSharpThin2["Microphone"] = "fa-sharp fa-thin fa-microphone";
  IconSharpThin2["MicrophoneLines"] = "fa-sharp fa-thin fa-microphone-lines";
  IconSharpThin2["MicrophoneLinesSlash"] = "fa-sharp fa-thin fa-microphone-lines-slash";
  IconSharpThin2["MicrophoneSlash"] = "fa-sharp fa-thin fa-microphone-slash";
  IconSharpThin2["Microscope"] = "fa-sharp fa-thin fa-microscope";
  IconSharpThin2["Minimize"] = "fa-sharp fa-thin fa-minimize";
  IconSharpThin2["Minus"] = "fa-sharp fa-thin fa-minus";
  IconSharpThin2["Mobile"] = "fa-sharp fa-thin fa-mobile";
  IconSharpThin2["MobileNotch"] = "fa-sharp fa-thin fa-mobile-notch";
  IconSharpThin2["MoneyCheckDollarPen"] = "fa-sharp fa-thin fa-money-check-dollar-pen";
  IconSharpThin2["Music"] = "fa-sharp fa-thin fa-music";
  IconSharpThin2["MusicSlash"] = "fa-sharp fa-thin fa-music-slash";
  IconSharpThin2["NewsPaper"] = "fa-sharp fa-thin fa-newspaper";
  IconSharpThin2["Palette"] = "fa-sharp fa-thin fa-palette";
  IconSharpThin2["PaperClip"] = "fa-sharp fa-thin fa-paperclip";
  IconSharpThin2["PaperClipVertical"] = "fa-sharp fa-thin fa-paperclip-vertical";
  IconSharpThin2["PaperPlane"] = "fa-sharp fa-thin fa-paper-plane";
  IconSharpThin2["PaperPlaneTop"] = "fa-sharp fa-thin fa-paper-plane-top";
  IconSharpThin2["Paste"] = "fa-sharp fa-thin fa-paste";
  IconSharpThin2["Pause"] = "fa-sharp fa-thin fa-pause";
  IconSharpThin2["Pen"] = "fa-sharp fa-thin fa-pen";
  IconSharpThin2["Pencil"] = "fa-sharp fa-thin fa-pencil";
  IconSharpThin2["PenToSquare"] = "fa-sharp fa-thin fa-pen-to-square";
  IconSharpThin2["PeopleArrowsLeftRight"] = "fa-sharp fa-thin fa-people-arrows-left-right";
  IconSharpThin2["Percentage"] = "fa-sharp fa-thin fa-percentage";
  IconSharpThin2["Period"] = "fa-sharp fa-thin fa-period";
  IconSharpThin2["PersonChalkboard"] = "fa-sharp fa-thin fa-person-chalkboard";
  IconSharpThin2["PersonMilitaryRifle"] = "fa-sharp fa-thin fa-person-military-rifle";
  IconSharpThin2["Phone"] = "fa-sharp fa-thin fa-phone";
  IconSharpThin2["Play"] = "fa-sharp fa-thin fa-play";
  IconSharpThin2["PlayPause"] = "fa-sharp fa-thin fa-play-pause";
  IconSharpThin2["Plus"] = "fa-sharp fa-thin fa-plus";
  IconSharpThin2["Print"] = "fa-sharp fa-thin fa-print";
  IconSharpThin2["Pumo"] = "fa-sharp fa-thin fa-font-awesome";
  IconSharpThin2["Question"] = "fa-sharp fa-thin fa-question";
  IconSharpThin2["Redo"] = "fa-sharp fa-thin fa-redo";
  IconSharpThin2["RedoAlt"] = "fa-sharp fa-thin fa-redo-alt";
  IconSharpThin2["Refresh"] = "fa-sharp fa-thin fa-arrows-rotate";
  IconSharpThin2["Remove"] = "fa-sharp fa-thin fa-xmark";
  IconSharpThin2["Repeat"] = "fa-sharp fa-thin fa-repeat";
  IconSharpThin2["Reply"] = "fa-sharp fa-thin fa-reply";
  IconSharpThin2["ReplyAll"] = "fa-sharp fa-thin fa-reply-all";
  IconSharpThin2["RightFromBracket"] = "fa-sharp fa-thin fa-right-from-bracket";
  IconSharpThin2["RightToBracket"] = "fa-sharp fa-thin fa-right-to-bracket";
  IconSharpThin2["Rotate"] = "fa-sharp fa-thin fa-rotate";
  IconSharpThin2["RotateLeft"] = "fa-sharp fa-thin fa-rotate-left";
  IconSharpThin2["SackDollar"] = "fa-sharp fa-thin fa-sack-dollar";
  IconSharpThin2["Save"] = "fa-sharp fa-thin fa-floppy-disk";
  IconSharpThin2["Scissors"] = "fa-sharp fa-thin fa-scissors";
  IconSharpThin2["ScrewdriverWrench"] = "fa-sharp fa-thin fa-screwdriver-wrench";
  IconSharpThin2["Search"] = "fa-sharp fa-thin fa-magnifying-glass";
  IconSharpThin2["SensorTriangleExclamation"] = "fa-sharp fa-thin fa-sensor-triangle-exclamation";
  IconSharpThin2["Settings"] = "fa-sharp fa-thin fa-gear";
  IconSharpThin2["Share"] = "fa-sharp fa-thin fa-share";
  IconSharpThin2["ShareAll"] = "fa-sharp fa-thin fa-share-all";
  IconSharpThin2["ShareNodes"] = "fa-sharp fa-thin fa-share-nodes";
  IconSharpThin2["ShareFromSquare"] = "fa-sharp fa-thin fa-share-from-square";
  IconSharpThin2["ShieldCheck"] = "fa-sharp fa-thin fa-shield-check";
  IconSharpThin2["Ship"] = "fa-sharp fa-thin fa-ship";
  IconSharpThin2["Sitemap"] = "fa-sharp fa-thin fa-sitemap";
  IconSharpThin2["Soccer"] = "fa-sharp fa-thin fa-futbol";
  IconSharpThin2["Sort"] = "fa-sharp fa-thin fa-sort";
  IconSharpThin2["SortDown"] = "fa-sharp fa-thin fa-sort-down";
  IconSharpThin2["SortUp"] = "fa-sharp fa-thin fa-sort-up";
  IconSharpThin2["Spinner"] = "fa-sharp fa-thin fa-spinner";
  IconSharpThin2["Split"] = "fa-sharp fa-thin fa-split";
  IconSharpThin2["SquareCheck"] = "fa-sharp fa-thin fa-square-check";
  IconSharpThin2["SquareMinus"] = "fa-sharp fa-thin fa-square-minus";
  IconSharpThin2["SquarePen"] = "fa-sharp fa-thin fa-square-pen";
  IconSharpThin2["Stamp"] = "fa-sharp fa-thin fa-stamp";
  IconSharpThin2["Star"] = "fa-sharp fa-thin fa-star";
  IconSharpThin2["StepBackward"] = "fa-sharp fa-thin fa-step-backward";
  IconSharpThin2["StepForward"] = "fa-sharp fa-thin fa-step-forward";
  IconSharpThin2["Stethoscope"] = "fa-sharp fa-thin fa-stethoscope";
  IconSharpThin2["Stop"] = "fa-sharp fa-thin fa-stop";
  IconSharpThin2["Table"] = "fa-sharp fa-thin fa-table";
  IconSharpThin2["TableRows"] = "fa-sharp fa-thin fa-table-rows";
  IconSharpThin2["Tablet"] = "fa-sharp fa-thin fa-tablet";
  IconSharpThin2["Tag"] = "fa-sharp fa-thin fa-tag";
  IconSharpThin2["Tags"] = "fa-sharp fa-thin fa-tags";
  IconSharpThin2["Tasks"] = "fa-sharp fa-thin fa-tasks";
  IconSharpThin2["ThumbsDown"] = "fa-sharp fa-thin fa-thumbs-down";
  IconSharpThin2["ThumbsUp"] = "fa-sharp fa-thin fa-thumbs-up";
  IconSharpThin2["Thumbtack"] = "fa-sharp fa-thin fa-thumbtack";
  IconSharpThin2["Timer"] = "fa-sharp fa-thin fa-timer";
  IconSharpThin2["Trash"] = "fa-sharp fa-thin fa-trash";
  IconSharpThin2["TrashCanList"] = "fa-sharp fa-thin fa-trash-can-list";
  IconSharpThin2["TrashUndo"] = "fa-sharp fa-thin fa-trash-undo";
  IconSharpThin2["TrashXmark"] = "fa-sharp fa-thin fa-trash-xmark";
  IconSharpThin2["TriangleExclamation"] = "fa-sharp fa-thin fa-triangle-exclamation";
  IconSharpThin2["Truck"] = "fa-sharp fa-thin fa-truck";
  IconSharpThin2["Undo"] = "fa-sharp fa-thin fa-arrow-rotate-left";
  IconSharpThin2["Unlock"] = "fa-sharp fa-thin fa-unlock";
  IconSharpThin2["Upload"] = "fa-sharp fa-thin fa-upload";
  IconSharpThin2["UsbDrive"] = "fa-sharp fa-thin fa-usb-drive";
  IconSharpThin2["User"] = "fa-sharp fa-thin fa-user";
  IconSharpThin2["UserCheck"] = "fa-sharp fa-thin fa-user-check";
  IconSharpThin2["UserClock"] = "fa-sharp fa-thin fa-user-clock";
  IconSharpThin2["UserDoctor"] = "fa-sharp fa-thin fa-user-doctor";
  IconSharpThin2["UserDoctorHair"] = "fa-sharp fa-thin fa-user-doctor-hair";
  IconSharpThin2["UserDoctorHairLong"] = "fa-sharp fa-thin fa-user-doctor-hair-long";
  IconSharpThin2["UserGear"] = "fa-sharp fa-thin fa-user-gear";
  IconSharpThin2["UserGroup"] = "fa-sharp fa-thin fa-user-group";
  IconSharpThin2["UserHair"] = "fa-sharp fa-thin fa-user-hair";
  IconSharpThin2["UserHairLong"] = "fa-sharp fa-thin fa-user-hair-long";
  IconSharpThin2["UserHeadset"] = "fa-sharp fa-thin fa-user-headset";
  IconSharpThin2["Users"] = "fa-sharp fa-thin fa-users";
  IconSharpThin2["UserSecret"] = "fa-sharp fa-thin fa-user-secret";
  IconSharpThin2["UsersMedical"] = "fa-sharp fa-thin fa-users-medical";
  IconSharpThin2["UserTag"] = "fa-sharp fa-thin fa-user-tag";
  IconSharpThin2["UserXmark"] = "fa-sharp fa-thin fa-user-xmark";
  IconSharpThin2["Video"] = "fa-sharp fa-thin fa-video";
  IconSharpThin2["VideoSlash"] = "fa-sharp fa-thin fa-video-slash";
  IconSharpThin2["Volume"] = "fa-sharp fa-thin fa-volume";
  IconSharpThin2["VolumeHigh"] = "fa-sharp fa-thin fa-volume-high";
  IconSharpThin2["VolumeLow"] = "fa-sharp fa-thin fa-volume-low";
  IconSharpThin2["VolumeOff"] = "fa-sharp fa-thin fa-volume-off";
  IconSharpThin2["VolumeSlash"] = "fa-sharp fa-thin fa-volume-slash";
  IconSharpThin2["VolumeXmark"] = "fa-sharp fa-thin fa-volume-xmark";
  IconSharpThin2["Wifi"] = "fa-sharp fa-thin fa-wifi";
  IconSharpThin2["WifiExclamation"] = "fa-sharp fa-thin fa-wifi-exclamation";
  IconSharpThin2["WifiFair"] = "fa-sharp fa-thin fa-wifi-fair";
  IconSharpThin2["WifiSlash"] = "fa-sharp fa-thin fa-wifi-slash";
  IconSharpThin2["Window"] = "fa-sharp fa-thin fa-window";
  IconSharpThin2["Xmark"] = "fa-sharp fa-thin fa-xmark";
  return IconSharpThin2;
})(IconSharpThin || {});
var PositionEnum = /* @__PURE__ */ ((PositionEnum2) => {
  PositionEnum2[PositionEnum2["Left"] = 0] = "Left";
  PositionEnum2[PositionEnum2["Top"] = 1] = "Top";
  PositionEnum2[PositionEnum2["Right"] = 2] = "Right";
  PositionEnum2[PositionEnum2["Bottom"] = 3] = "Bottom";
  return PositionEnum2;
})(PositionEnum || {});
var OrientationEnum = /* @__PURE__ */ ((OrientationEnum2) => {
  OrientationEnum2[OrientationEnum2["Horizontal"] = 0] = "Horizontal";
  OrientationEnum2[OrientationEnum2["Vertical"] = 1] = "Vertical";
  return OrientationEnum2;
})(OrientationEnum || {});
class PopupSettings {
  width;
  minWidth;
  maxWidth;
  height;
  minHeight;
  maxHeight;
  right;
  direction;
}
var PopupDirectionEnum = /* @__PURE__ */ ((PopupDirectionEnum2) => {
  PopupDirectionEnum2[PopupDirectionEnum2["Auto"] = 0] = "Auto";
  PopupDirectionEnum2[PopupDirectionEnum2["Up"] = 1] = "Up";
  PopupDirectionEnum2[PopupDirectionEnum2["Down"] = 2] = "Down";
  return PopupDirectionEnum2;
})(PopupDirectionEnum || {});
var BorderStyleEnum = /* @__PURE__ */ ((BorderStyleEnum2) => {
  BorderStyleEnum2["Dashed"] = "dashed";
  BorderStyleEnum2["Dotted"] = "dotted";
  BorderStyleEnum2["Double"] = "double";
  BorderStyleEnum2["Hidden"] = "hidden";
  BorderStyleEnum2["Solid"] = "solid";
  BorderStyleEnum2["Groove"] = "groove";
  BorderStyleEnum2["Ridge"] = "ridge";
  return BorderStyleEnum2;
})(BorderStyleEnum || {});
var ButtonModeEnum = /* @__PURE__ */ ((ButtonModeEnum2) => {
  ButtonModeEnum2["Default"] = "vrButtonDefaultMode";
  ButtonModeEnum2["Primary"] = "vrButtonPrimaryMode";
  ButtonModeEnum2["Delete"] = "vrButtonDeleteMode";
  ButtonModeEnum2["Excel"] = "vrButtonExcelMode";
  ButtonModeEnum2["Print"] = "vrButtonPrintMode";
  ButtonModeEnum2["Warning"] = "vrButtonWarningMode";
  ButtonModeEnum2["Danger"] = "vrButtonDangerMode";
  ButtonModeEnum2["Success"] = "vrButtonSuccessMode";
  return ButtonModeEnum2;
})(ButtonModeEnum || {});
class ColorSettings {
  textColor;
  background;
  border;
}
class DivColorSettings {
  textColor;
  background;
}
class DivBorderSpecificSettings {
  type;
  size;
  color;
}
class DivBorderSettings extends DivBorderSpecificSettings {
  top;
  right;
  bottom;
  left;
}
var SelectionModeEnum = /* @__PURE__ */ ((SelectionModeEnum2) => {
  SelectionModeEnum2[SelectionModeEnum2["Single"] = 0] = "Single";
  SelectionModeEnum2[SelectionModeEnum2["Multiple"] = 1] = "Multiple";
  return SelectionModeEnum2;
})(SelectionModeEnum || {});
class ButtonGroupItem {
  value;
  text;
  icon;
  imageUrl;
  selected;
  css;
  colorSettings;
  visible;
  enable;
  tooltip;
  onClick;
  onIconClick;
}
class TabStripItem extends ButtonGroupItem {
  elementId;
}
var RatingPrecisionEnum = /* @__PURE__ */ ((RatingPrecisionEnum2) => {
  RatingPrecisionEnum2[RatingPrecisionEnum2["Half"] = 0] = "Half";
  RatingPrecisionEnum2[RatingPrecisionEnum2["Full"] = 1] = "Full";
  return RatingPrecisionEnum2;
})(RatingPrecisionEnum || {});
var LabelModeEnum = /* @__PURE__ */ ((LabelModeEnum2) => {
  LabelModeEnum2[LabelModeEnum2["Default"] = 0] = "Default";
  LabelModeEnum2[LabelModeEnum2["Primary"] = 1] = "Primary";
  LabelModeEnum2[LabelModeEnum2["Error"] = 2] = "Error";
  LabelModeEnum2[LabelModeEnum2["Phone"] = 3] = "Phone";
  LabelModeEnum2[LabelModeEnum2["Mail"] = 4] = "Mail";
  LabelModeEnum2[LabelModeEnum2["Link"] = 5] = "Link";
  LabelModeEnum2[LabelModeEnum2["Currency"] = 6] = "Currency";
  LabelModeEnum2[LabelModeEnum2["Date"] = 7] = "Date";
  LabelModeEnum2[LabelModeEnum2["Time"] = 8] = "Time";
  LabelModeEnum2[LabelModeEnum2["DateTime"] = 9] = "DateTime";
  return LabelModeEnum2;
})(LabelModeEnum || {});
var LabelUnderlineMode = /* @__PURE__ */ ((LabelUnderlineMode2) => {
  LabelUnderlineMode2[LabelUnderlineMode2["Always"] = 0] = "Always";
  LabelUnderlineMode2[LabelUnderlineMode2["None"] = 1] = "None";
  LabelUnderlineMode2[LabelUnderlineMode2["OnHover"] = 2] = "OnHover";
  return LabelUnderlineMode2;
})(LabelUnderlineMode || {});
var TextAlignEnum = /* @__PURE__ */ ((TextAlignEnum2) => {
  TextAlignEnum2["Left"] = "left";
  TextAlignEnum2["Center"] = "center";
  TextAlignEnum2["Right"] = "right";
  TextAlignEnum2["Justify"] = "justify";
  return TextAlignEnum2;
})(TextAlignEnum || {});
class TextBoxLengthSettings {
  substituteChar;
  value;
}
var TextModeEnum = /* @__PURE__ */ ((TextModeEnum2) => {
  TextModeEnum2[TextModeEnum2["Text"] = 0] = "Text";
  TextModeEnum2[TextModeEnum2["Link"] = 1] = "Link";
  TextModeEnum2[TextModeEnum2["Phone"] = 2] = "Phone";
  TextModeEnum2[TextModeEnum2["Search"] = 3] = "Search";
  TextModeEnum2[TextModeEnum2["Mail"] = 4] = "Mail";
  TextModeEnum2[TextModeEnum2["MultiLine"] = 5] = "MultiLine";
  TextModeEnum2[TextModeEnum2["Password"] = 6] = "Password";
  TextModeEnum2[TextModeEnum2["PasswordViewable"] = 7] = "PasswordViewable";
  TextModeEnum2[TextModeEnum2["Numeric"] = 8] = "Numeric";
  TextModeEnum2[TextModeEnum2["Percentage"] = 9] = "Percentage";
  TextModeEnum2[TextModeEnum2["Currency"] = 10] = "Currency";
  return TextModeEnum2;
})(TextModeEnum || {});
var TextTransformModeEnum = /* @__PURE__ */ ((TextTransformModeEnum2) => {
  TextTransformModeEnum2["Capitalize"] = "capitalize";
  TextTransformModeEnum2["Uppercase"] = "uppercase";
  TextTransformModeEnum2["Lowercase"] = "lowercase";
  TextTransformModeEnum2["Default"] = "none";
  return TextTransformModeEnum2;
})(TextTransformModeEnum || {});
var TextBoxAutoCompleteEnum = /* @__PURE__ */ ((TextBoxAutoCompleteEnum2) => {
  TextBoxAutoCompleteEnum2["On"] = "on";
  TextBoxAutoCompleteEnum2["Off"] = "off";
  TextBoxAutoCompleteEnum2["AddressLine1"] = "address-line1";
  TextBoxAutoCompleteEnum2["AddressLine2"] = "address-line2";
  TextBoxAutoCompleteEnum2["AddressLine3"] = "address-line3";
  TextBoxAutoCompleteEnum2["AddressLevel1"] = "address-level1";
  TextBoxAutoCompleteEnum2["AddressLevel2"] = "address-level2";
  TextBoxAutoCompleteEnum2["AddressLevel3"] = "address-level3";
  TextBoxAutoCompleteEnum2["AddressLevel4"] = "address-level4";
  TextBoxAutoCompleteEnum2["StreetAddress"] = "street-address";
  TextBoxAutoCompleteEnum2["Country"] = "country";
  TextBoxAutoCompleteEnum2["CountryName"] = "country-name";
  TextBoxAutoCompleteEnum2["PostalCode"] = "postal-code";
  TextBoxAutoCompleteEnum2["Name"] = "name";
  TextBoxAutoCompleteEnum2["AdditionalName"] = "additional-name";
  TextBoxAutoCompleteEnum2["FamilyName"] = "family-name";
  TextBoxAutoCompleteEnum2["GiveName"] = "give-name";
  TextBoxAutoCompleteEnum2["HonoricPrefix"] = "honoric-prefix";
  TextBoxAutoCompleteEnum2["HonoricSuffix"] = "honoric-suffix";
  TextBoxAutoCompleteEnum2["Nickname"] = "nickname";
  TextBoxAutoCompleteEnum2["OrganizationTitle"] = "organization-title";
  TextBoxAutoCompleteEnum2["Username"] = "username";
  TextBoxAutoCompleteEnum2["NewPassword"] = "new-password";
  TextBoxAutoCompleteEnum2["CurrentPassword"] = "current-password";
  TextBoxAutoCompleteEnum2["Birthday"] = "bday";
  TextBoxAutoCompleteEnum2["BirthdayDay"] = "bday-day";
  TextBoxAutoCompleteEnum2["BirthdayMonth"] = "bday-month";
  TextBoxAutoCompleteEnum2["BirthdayYear"] = "bday-year";
  TextBoxAutoCompleteEnum2["Sex"] = "sex";
  TextBoxAutoCompleteEnum2["OneTimeCode"] = "one-time-code";
  TextBoxAutoCompleteEnum2["Organization"] = "organization";
  TextBoxAutoCompleteEnum2["CcName"] = "cc-name";
  TextBoxAutoCompleteEnum2["CcGivenName"] = "cc-given-name";
  TextBoxAutoCompleteEnum2["CcAdditionalName"] = "cc-additional-name";
  TextBoxAutoCompleteEnum2["CcFamilyName"] = "cc-family-name";
  TextBoxAutoCompleteEnum2["CcNumber"] = "cc-number";
  TextBoxAutoCompleteEnum2["CcExp"] = "cc-exp";
  TextBoxAutoCompleteEnum2["CcExpMonth"] = "cc-exp-month";
  TextBoxAutoCompleteEnum2["CcExpYear"] = "cc-exp-year";
  TextBoxAutoCompleteEnum2["CcCsc"] = "cc-csc";
  TextBoxAutoCompleteEnum2["CcType"] = "cc-type";
  TextBoxAutoCompleteEnum2["TransactionCurrency"] = "transaction-currency";
  TextBoxAutoCompleteEnum2["TransactionAmount"] = "transaction-amount";
  TextBoxAutoCompleteEnum2["Language"] = "language";
  TextBoxAutoCompleteEnum2["Url"] = "url";
  TextBoxAutoCompleteEnum2["Email"] = "email";
  TextBoxAutoCompleteEnum2["Photo"] = "photo";
  TextBoxAutoCompleteEnum2["Tel"] = "tel";
  TextBoxAutoCompleteEnum2["TelCountryCode"] = "tel-country-code";
  TextBoxAutoCompleteEnum2["TelNational"] = "tel-national";
  TextBoxAutoCompleteEnum2["TelAreaCode"] = "tel-area-code";
  TextBoxAutoCompleteEnum2["TelLocal"] = "tel-local";
  TextBoxAutoCompleteEnum2["TelLocalPrefix"] = "tel-local-prefix";
  TextBoxAutoCompleteEnum2["TelLocalSuffix"] = "tel-local-suffix";
  TextBoxAutoCompleteEnum2["TelExtension"] = "tel-extension";
  TextBoxAutoCompleteEnum2["Impp"] = "impp";
  return TextBoxAutoCompleteEnum2;
})(TextBoxAutoCompleteEnum || {});
class TextBoxValidationSettings {
  minValue;
  maxValue;
  minLength;
  maxLength;
  regex;
  error;
}
class TextBoxRegexSettings {
  value;
  flags;
  checkOnValue;
  checkOnKeyDown;
  checkOnKeyUp;
  checkOnBlur;
  onlyNumbers;
  onlyCharacters;
  onlyUpperCase;
  onlyLowerCase;
}
var TextBoxValidationErrorEnum = /* @__PURE__ */ ((TextBoxValidationErrorEnum2) => {
  TextBoxValidationErrorEnum2[TextBoxValidationErrorEnum2["Flashing"] = 0] = "Flashing";
  TextBoxValidationErrorEnum2[TextBoxValidationErrorEnum2["Stable"] = 1] = "Stable";
  TextBoxValidationErrorEnum2[TextBoxValidationErrorEnum2["None"] = 2] = "None";
  return TextBoxValidationErrorEnum2;
})(TextBoxValidationErrorEnum || {});
var ErrorModeEnum = /* @__PURE__ */ ((ErrorModeEnum2) => {
  ErrorModeEnum2[ErrorModeEnum2["Tooltip"] = 0] = "Tooltip";
  ErrorModeEnum2[ErrorModeEnum2["Overlay"] = 1] = "Overlay";
  ErrorModeEnum2[ErrorModeEnum2["Solid"] = 2] = "Solid";
  return ErrorModeEnum2;
})(ErrorModeEnum || {});
var ErrorPositionEnum = /* @__PURE__ */ ((ErrorPositionEnum2) => {
  ErrorPositionEnum2[ErrorPositionEnum2["Right"] = 0] = "Right";
  ErrorPositionEnum2[ErrorPositionEnum2["Bottom"] = 1] = "Bottom";
  return ErrorPositionEnum2;
})(ErrorPositionEnum || {});
var ErrorHideModeEnum = /* @__PURE__ */ ((ErrorHideModeEnum2) => {
  ErrorHideModeEnum2[ErrorHideModeEnum2["OnFocus"] = 0] = "OnFocus";
  ErrorHideModeEnum2[ErrorHideModeEnum2["OnAction"] = 1] = "OnAction";
  ErrorHideModeEnum2[ErrorHideModeEnum2["Never"] = 2] = "Never";
  return ErrorHideModeEnum2;
})(ErrorHideModeEnum || {});
var PaypalEnvironmentEnum = /* @__PURE__ */ ((PaypalEnvironmentEnum2) => {
  PaypalEnvironmentEnum2["Sandbox"] = "sandbox";
  PaypalEnvironmentEnum2["Production"] = "production";
  return PaypalEnvironmentEnum2;
})(PaypalEnvironmentEnum || {});
var PaypalStyleSizeEnum = /* @__PURE__ */ ((PaypalStyleSizeEnum2) => {
  PaypalStyleSizeEnum2["Medium"] = "medium";
  PaypalStyleSizeEnum2["Large"] = "large";
  PaypalStyleSizeEnum2["Small"] = "small";
  PaypalStyleSizeEnum2["Responsive"] = "responsive";
  return PaypalStyleSizeEnum2;
})(PaypalStyleSizeEnum || {});
var PaypalStyleColorEnum = /* @__PURE__ */ ((PaypalStyleColorEnum2) => {
  PaypalStyleColorEnum2["Gold"] = "gold";
  PaypalStyleColorEnum2["Blue"] = "blue";
  PaypalStyleColorEnum2["Silver"] = "silver";
  PaypalStyleColorEnum2["Black"] = "black";
  return PaypalStyleColorEnum2;
})(PaypalStyleColorEnum || {});
var PaypalStyleShapeEnum = /* @__PURE__ */ ((PaypalStyleShapeEnum2) => {
  PaypalStyleShapeEnum2["Rect"] = "rect";
  PaypalStyleShapeEnum2["Pill"] = "pill";
  return PaypalStyleShapeEnum2;
})(PaypalStyleShapeEnum || {});
var PaypalStyleLabelEnum = /* @__PURE__ */ ((PaypalStyleLabelEnum2) => {
  PaypalStyleLabelEnum2["Checkout"] = "checkout";
  PaypalStyleLabelEnum2["Credit"] = "credit";
  PaypalStyleLabelEnum2["Pay"] = "pay";
  PaypalStyleLabelEnum2["BuyNow"] = "buynow";
  PaypalStyleLabelEnum2["Paypal"] = "paypal";
  PaypalStyleLabelEnum2["Installment"] = "installment";
  return PaypalStyleLabelEnum2;
})(PaypalStyleLabelEnum || {});
var PaypalStyleLayoutEnum = /* @__PURE__ */ ((PaypalStyleLayoutEnum2) => {
  PaypalStyleLayoutEnum2["Vertical"] = "vertical";
  PaypalStyleLayoutEnum2["Horizontal"] = "horizontal";
  return PaypalStyleLayoutEnum2;
})(PaypalStyleLayoutEnum || {});
var CheckboxStateEnum = /* @__PURE__ */ ((CheckboxStateEnum2) => {
  CheckboxStateEnum2[CheckboxStateEnum2["Checked"] = 0] = "Checked";
  CheckboxStateEnum2[CheckboxStateEnum2["Unchecked"] = 1] = "Unchecked";
  CheckboxStateEnum2[CheckboxStateEnum2["Undefined"] = 2] = "Undefined";
  return CheckboxStateEnum2;
})(CheckboxStateEnum || {});
class CheckBoxItem {
  text;
  value;
  checked;
  threeState;
  tag;
  onCheck;
}
var ImagePositionTypeEnum = /* @__PURE__ */ ((ImagePositionTypeEnum2) => {
  ImagePositionTypeEnum2[ImagePositionTypeEnum2["Center"] = 0] = "Center";
  ImagePositionTypeEnum2[ImagePositionTypeEnum2["Fit"] = 1] = "Fit";
  ImagePositionTypeEnum2[ImagePositionTypeEnum2["Fill"] = 2] = "Fill";
  ImagePositionTypeEnum2[ImagePositionTypeEnum2["Stretch"] = 3] = "Stretch";
  ImagePositionTypeEnum2[ImagePositionTypeEnum2["Original"] = 4] = "Original";
  return ImagePositionTypeEnum2;
})(ImagePositionTypeEnum || {});
var ImageToolbarTypeEnum = /* @__PURE__ */ ((ImageToolbarTypeEnum2) => {
  ImageToolbarTypeEnum2[ImageToolbarTypeEnum2["Download"] = 0] = "Download";
  ImageToolbarTypeEnum2[ImageToolbarTypeEnum2["Delete"] = 1] = "Delete";
  ImageToolbarTypeEnum2[ImageToolbarTypeEnum2["Custom"] = 2] = "Custom";
  return ImageToolbarTypeEnum2;
})(ImageToolbarTypeEnum || {});
var DefaultDayEnum = /* @__PURE__ */ ((DefaultDayEnum2) => {
  DefaultDayEnum2[DefaultDayEnum2["First"] = 0] = "First";
  DefaultDayEnum2[DefaultDayEnum2["Last"] = 1] = "Last";
  return DefaultDayEnum2;
})(DefaultDayEnum || {});
var ComboBoxTypeEnum = /* @__PURE__ */ ((ComboBoxTypeEnum2) => {
  ComboBoxTypeEnum2[ComboBoxTypeEnum2["Combo"] = 0] = "Combo";
  ComboBoxTypeEnum2[ComboBoxTypeEnum2["DropDown"] = 1] = "DropDown";
  return ComboBoxTypeEnum2;
})(ComboBoxTypeEnum || {});
var ComboBoxTreeModeEnum = /* @__PURE__ */ ((ComboBoxTreeModeEnum2) => {
  ComboBoxTreeModeEnum2[ComboBoxTreeModeEnum2["AllExpanded"] = 0] = "AllExpanded";
  ComboBoxTreeModeEnum2[ComboBoxTreeModeEnum2["OnlyFirstLevelExpanded"] = 1] = "OnlyFirstLevelExpanded";
  ComboBoxTreeModeEnum2[ComboBoxTreeModeEnum2["AllCollapsed"] = 2] = "AllCollapsed";
  return ComboBoxTreeModeEnum2;
})(ComboBoxTreeModeEnum || {});
class ComboBoxItem {
  text;
  value;
  icon;
  backgroundColor;
  textColor;
  whiteFont;
  parentValue;
  checked;
}
class ComboBoxWebServiceSettings {
  method;
  authKey;
  itemsPropertyName;
  typedTextPropertyName;
  typedValuePropertyName;
  searchAfterCharsNumber;
  parameters;
}
class ComboBoxTemplateEvent {
  sender;
  dataItem;
  element;
}
class ComboBoxEvent extends VrControlsEvent {
  sender;
  value;
  text;
  childrenValues;
  selectedItem;
  checked;
  isParent;
}
class ComboBoxChangeEvent extends ComboBoxEvent {
}
class ComboBoxChangingEvent extends ComboBoxEvent {
  previousValue;
  previousCheckedValues;
}
class ComboBoxClearEvent extends VrControlsEvent {
  sender;
}
class SortByComboSettings {
  field;
  direction;
}
class MenuItem {
  text;
  value;
  icon;
  parentValue;
  url;
  urlSettings;
  hidden;
  onClick;
}
class MenuItemUrlSettings {
  url;
  newTab;
}
class AutoCompleteBoxItem {
  text;
  value;
  settings;
}
class AutoCompleteBoxItemSettings {
  backgroundColor;
  textColor;
  deleteIconColor;
  border;
  bold;
  maxWidth;
}
class AutoCompleteBoxComboSettings {
  items;
  freeText;
  webService;
  template;
  treeMode;
}
var ChartTypeEnum = /* @__PURE__ */ ((ChartTypeEnum2) => {
  ChartTypeEnum2["Bar"] = "bar";
  ChartTypeEnum2["HorizontalBar"] = "horizontalBar";
  ChartTypeEnum2["Line"] = "line";
  ChartTypeEnum2["Donut"] = "doughnut";
  ChartTypeEnum2["Pie"] = "pie";
  ChartTypeEnum2["Area"] = "area";
  ChartTypeEnum2["StackedBar"] = "stackedBar";
  return ChartTypeEnum2;
})(ChartTypeEnum || {});
class ChartAreaSettings {
  target;
  above;
  below;
}
class ChartTitleSettings {
  align;
  color;
  fullSize;
  position;
  font;
  padding;
  text;
}
var ChartTitleAlignEnum = /* @__PURE__ */ ((ChartTitleAlignEnum2) => {
  ChartTitleAlignEnum2["Start"] = "start";
  ChartTitleAlignEnum2["Center"] = "center";
  ChartTitleAlignEnum2["End"] = "end";
  return ChartTitleAlignEnum2;
})(ChartTitleAlignEnum || {});
var ChartTitlePositionEnum = /* @__PURE__ */ ((ChartTitlePositionEnum2) => {
  ChartTitlePositionEnum2["Top"] = "top";
  ChartTitlePositionEnum2["Left"] = "left";
  ChartTitlePositionEnum2["Bottom"] = "bottom";
  ChartTitlePositionEnum2["Right"] = "right";
  return ChartTitlePositionEnum2;
})(ChartTitlePositionEnum || {});
class ChartFont {
  family;
  size;
  style;
  weight;
  lineHeight;
}
class ChartDataLabelsSettings {
  color;
  backgroundColor;
  borderColor;
  font;
  anchor;
  align;
  offset;
  opacity;
  padding;
  textAlign;
  rotation;
}
var ChartDataLabelsAnchorEnum = /* @__PURE__ */ ((ChartDataLabelsAnchorEnum2) => {
  ChartDataLabelsAnchorEnum2["Center"] = "center";
  ChartDataLabelsAnchorEnum2["Start"] = "start";
  ChartDataLabelsAnchorEnum2["End"] = "end";
  return ChartDataLabelsAnchorEnum2;
})(ChartDataLabelsAnchorEnum || {});
var ChartDataLabelsTextAlignEnum = /* @__PURE__ */ ((ChartDataLabelsTextAlignEnum2) => {
  ChartDataLabelsTextAlignEnum2["Center"] = "center";
  ChartDataLabelsTextAlignEnum2["Start"] = "start";
  ChartDataLabelsTextAlignEnum2["End"] = "end";
  ChartDataLabelsTextAlignEnum2["Right"] = "right";
  ChartDataLabelsTextAlignEnum2["Left"] = "left";
  return ChartDataLabelsTextAlignEnum2;
})(ChartDataLabelsTextAlignEnum || {});
var ChartDataLabelAlignEnum = /* @__PURE__ */ ((ChartDataLabelAlignEnum2) => {
  ChartDataLabelAlignEnum2["Center"] = "center";
  ChartDataLabelAlignEnum2["Start"] = "start";
  ChartDataLabelAlignEnum2["End"] = "end";
  ChartDataLabelAlignEnum2["Right"] = "right";
  ChartDataLabelAlignEnum2["Bottom"] = "bottom";
  ChartDataLabelAlignEnum2["Left"] = "left";
  ChartDataLabelAlignEnum2["Top"] = "top";
  return ChartDataLabelAlignEnum2;
})(ChartDataLabelAlignEnum || {});
class ChartLegendSettings {
  position;
  align;
  labels;
  title;
}
var ChartLegendPositionEnum = /* @__PURE__ */ ((ChartLegendPositionEnum2) => {
  ChartLegendPositionEnum2["Top"] = "top";
  ChartLegendPositionEnum2["Left"] = "left";
  ChartLegendPositionEnum2["Bottom"] = "bottom";
  ChartLegendPositionEnum2["Right"] = "right";
  ChartLegendPositionEnum2["ChartArea"] = "chartArea";
  return ChartLegendPositionEnum2;
})(ChartLegendPositionEnum || {});
var ChartLegendAlignEnum = /* @__PURE__ */ ((ChartLegendAlignEnum2) => {
  ChartLegendAlignEnum2["Center"] = "center";
  ChartLegendAlignEnum2["Start"] = "start";
  ChartLegendAlignEnum2["End"] = "end";
  return ChartLegendAlignEnum2;
})(ChartLegendAlignEnum || {});
class ChartLegendLabelsSettings {
  color;
  boxHeight;
  padding;
  textAlign;
}
var ChartLegendLabelsAlignEnum = /* @__PURE__ */ ((ChartLegendLabelsAlignEnum2) => {
  ChartLegendLabelsAlignEnum2["Left"] = "left";
  ChartLegendLabelsAlignEnum2["Right"] = "right";
  ChartLegendLabelsAlignEnum2["Center"] = "center";
  return ChartLegendLabelsAlignEnum2;
})(ChartLegendLabelsAlignEnum || {});
class ChartLegendTitleSettings {
  color;
  display;
  padding;
  text;
}
class ChartTooltipSettings {
  position;
  backgroundColor;
  titleColor;
  titleFont;
  titleAlign;
  bodyColor;
  bodyFont;
  bodyAlign;
  footerColor;
  footerFont;
  footerAlign;
  borderColor;
  borderWidth;
  xAlign;
  yAlign;
}
var ChartTooltipPositionEnum = /* @__PURE__ */ ((ChartTooltipPositionEnum2) => {
  ChartTooltipPositionEnum2["Average"] = "average";
  ChartTooltipPositionEnum2["Nearest"] = "nearest";
  return ChartTooltipPositionEnum2;
})(ChartTooltipPositionEnum || {});
var ChartTooltipAlignEnum = /* @__PURE__ */ ((ChartTooltipAlignEnum2) => {
  ChartTooltipAlignEnum2["Left"] = "left";
  ChartTooltipAlignEnum2["Right"] = "right";
  ChartTooltipAlignEnum2["Center"] = "center";
  return ChartTooltipAlignEnum2;
})(ChartTooltipAlignEnum || {});
var ChartTooltipYAlignEnum = /* @__PURE__ */ ((ChartTooltipYAlignEnum2) => {
  ChartTooltipYAlignEnum2["Top"] = "top";
  ChartTooltipYAlignEnum2["Center"] = "center";
  ChartTooltipYAlignEnum2["Bottom"] = "bottom";
  return ChartTooltipYAlignEnum2;
})(ChartTooltipYAlignEnum || {});
class ChartStackedSettings {
  x;
  y;
}
class ChartAspectRatioSettings {
  maintain;
  value;
}
class ChartLimitSettings {
  minX;
  maxX;
  minY;
  maxY;
}
class ChartDataSource {
  areaSettings;
  type;
  title;
  backgroundColor;
  borderColor;
  borderWidth;
  labels;
  hidden;
  order;
  fill;
  data;
  parsing;
  smoothLine;
}
class ChartParsingSettings {
  xAxisKey;
  yAxisKey;
}
class ChartLegendEvent extends VrControlsEvent {
  sender;
  event;
  legendItem;
  legend;
}
class ChartLegendHoverEvent extends ChartLegendEvent {
}
class ChartLegendLeaveEvent extends ChartLegendEvent {
}
class ChartLegendClickEvent extends ChartLegendEvent {
}
class ChartLabelEvent extends VrControlsEvent {
  sender;
  context;
}
class ChartLabelHoverEvent extends ChartLabelEvent {
}
class ChartLabelLeaveEvent extends ChartLabelEvent {
}
class ChartLabelClickEvent extends ChartLabelEvent {
}
class ChartAxisFormatterEvent extends VrControlsEvent {
  value;
  context;
  sender;
}
class ChartOptions extends VrControlOptions {
  type;
  padding;
  parsing;
  title;
  subTitle;
  dataLabels;
  datasource;
  legend;
  tooltip;
  stacked;
  limit;
  showHideDatasetOnLegendClick;
  responsive;
  aspectRatio;
  scales;
  circumference;
  rotation;
  annotation;
  onLegendHover;
  onLegendLeave;
  onLegendClick;
  onLabelHover;
  onLabelLeave;
  onLabelClick;
  onAxisLabelFormatter;
  onDataFormatter;
}
var WindowFooterItemTypeEnum = /* @__PURE__ */ ((WindowFooterItemTypeEnum2) => {
  WindowFooterItemTypeEnum2[WindowFooterItemTypeEnum2["Close"] = 0] = "Close";
  WindowFooterItemTypeEnum2[WindowFooterItemTypeEnum2["Ok"] = 1] = "Ok";
  WindowFooterItemTypeEnum2[WindowFooterItemTypeEnum2["Custom"] = 2] = "Custom";
  WindowFooterItemTypeEnum2[WindowFooterItemTypeEnum2["SplitButton"] = 3] = "SplitButton";
  WindowFooterItemTypeEnum2[WindowFooterItemTypeEnum2["Switch"] = 4] = "Switch";
  WindowFooterItemTypeEnum2[WindowFooterItemTypeEnum2["ButtonGroup"] = 5] = "ButtonGroup";
  WindowFooterItemTypeEnum2[WindowFooterItemTypeEnum2["CheckBox"] = 6] = "CheckBox";
  WindowFooterItemTypeEnum2[WindowFooterItemTypeEnum2["ComboBox"] = 7] = "ComboBox";
  WindowFooterItemTypeEnum2[WindowFooterItemTypeEnum2["DatePicker"] = 8] = "DatePicker";
  WindowFooterItemTypeEnum2[WindowFooterItemTypeEnum2["Label"] = 9] = "Label";
  WindowFooterItemTypeEnum2[WindowFooterItemTypeEnum2["TextBox"] = 10] = "TextBox";
  WindowFooterItemTypeEnum2[WindowFooterItemTypeEnum2["Separator"] = 11] = "Separator";
  return WindowFooterItemTypeEnum2;
})(WindowFooterItemTypeEnum || {});
var WindowFooterItemAlignEnum = /* @__PURE__ */ ((WindowFooterItemAlignEnum2) => {
  WindowFooterItemAlignEnum2[WindowFooterItemAlignEnum2["Left"] = 0] = "Left";
  WindowFooterItemAlignEnum2[WindowFooterItemAlignEnum2["Right"] = 1] = "Right";
  return WindowFooterItemAlignEnum2;
})(WindowFooterItemAlignEnum || {});
var WindowAutoSizeDirectionEnum = /* @__PURE__ */ ((WindowAutoSizeDirectionEnum2) => {
  WindowAutoSizeDirectionEnum2[WindowAutoSizeDirectionEnum2["Width"] = 0] = "Width";
  WindowAutoSizeDirectionEnum2[WindowAutoSizeDirectionEnum2["Height"] = 1] = "Height";
  return WindowAutoSizeDirectionEnum2;
})(WindowAutoSizeDirectionEnum || {});
var vrEditorItemEnum = /* @__PURE__ */ ((vrEditorItemEnum2) => {
  vrEditorItemEnum2["Separator"] = "|";
  vrEditorItemEnum2["Undo"] = "undo";
  vrEditorItemEnum2["Redo"] = "redo";
  vrEditorItemEnum2["Bold"] = "bold";
  vrEditorItemEnum2["Italic"] = "italic";
  vrEditorItemEnum2["Underline"] = "underline";
  vrEditorItemEnum2["FontFamily"] = "fontfamily";
  vrEditorItemEnum2["FontSelect"] = "fontfamily";
  vrEditorItemEnum2["FontSize"] = "fontsize";
  vrEditorItemEnum2["ForeColor"] = "forecolor";
  vrEditorItemEnum2["FullScreen"] = "fullscreen";
  vrEditorItemEnum2["AlignLeft"] = "alignleft";
  vrEditorItemEnum2["AlignRight"] = "alignright";
  vrEditorItemEnum2["AlignCenter"] = "aligncenter";
  vrEditorItemEnum2["AlignJustify"] = "alignjustify";
  vrEditorItemEnum2["OrderedList"] = "numlist";
  vrEditorItemEnum2["NumList"] = "numlist";
  vrEditorItemEnum2["UnorderedList"] = "bullist";
  vrEditorItemEnum2["Bullist"] = "bullist";
  vrEditorItemEnum2["ColorPicker"] = "color";
  vrEditorItemEnum2["Link"] = "link";
  vrEditorItemEnum2["Cut"] = "cut";
  vrEditorItemEnum2["Copy"] = "copy";
  vrEditorItemEnum2["Paste"] = "paste";
  vrEditorItemEnum2["PasteText"] = "pastetext";
  vrEditorItemEnum2["SelectAll"] = "selectall";
  vrEditorItemEnum2["SearchAndReplace"] = "searchreplace";
  vrEditorItemEnum2["Print"] = "print";
  vrEditorItemEnum2["Preview"] = "preview";
  vrEditorItemEnum2["CodeSource"] = "code";
  vrEditorItemEnum2["WordCount"] = "wordcount";
  vrEditorItemEnum2["Image"] = "image";
  vrEditorItemEnum2["Media"] = "media";
  vrEditorItemEnum2["Table"] = "inserttable";
  vrEditorItemEnum2["InsertTable"] = "inserttable";
  vrEditorItemEnum2["Cell"] = "cell";
  vrEditorItemEnum2["Row"] = "row";
  vrEditorItemEnum2["Symbols"] = "charmap";
  vrEditorItemEnum2["CharMap"] = "charmap";
  vrEditorItemEnum2["Emoticons"] = "emoticons";
  vrEditorItemEnum2["Hr"] = "hr";
  vrEditorItemEnum2["PageBreak"] = "pagebreak";
  vrEditorItemEnum2["StrikeThrough"] = "strikethrough";
  vrEditorItemEnum2["Superscript"] = "superscript";
  vrEditorItemEnum2["Subscript"] = "subscript";
  vrEditorItemEnum2["FontFormats"] = "fontformats";
  vrEditorItemEnum2["AlignFormats"] = "align";
  vrEditorItemEnum2["BlockFormats"] = "blockformats";
  vrEditorItemEnum2["BackgroundColor"] = "backcolor";
  vrEditorItemEnum2["ClearFormatting"] = "removeformat";
  vrEditorItemEnum2["RemoveFormat"] = "removeformat";
  return vrEditorItemEnum2;
})(vrEditorItemEnum || {});
var vrEditorToolbarModeEnum = /* @__PURE__ */ ((vrEditorToolbarModeEnum2) => {
  vrEditorToolbarModeEnum2["Floating"] = "floating";
  vrEditorToolbarModeEnum2["Sliding"] = "sliding";
  vrEditorToolbarModeEnum2["Scrolling"] = "scrolling";
  vrEditorToolbarModeEnum2["Wrap"] = "wrap";
  return vrEditorToolbarModeEnum2;
})(vrEditorToolbarModeEnum || {});
var TinyMceIconEnum = /* @__PURE__ */ ((TinyMceIconEnum2) => {
  TinyMceIconEnum2["CaretDown"] = "action-next";
  TinyMceIconEnum2["CaretUp"] = "action-prev";
  TinyMceIconEnum2["AlignCenter"] = "align-center";
  TinyMceIconEnum2["AlignJustify"] = "align-justify";
  TinyMceIconEnum2["AlignLeft"] = "align-left";
  TinyMceIconEnum2["AlignRight"] = "align-right";
  TinyMceIconEnum2["AlignNone"] = "align-none";
  TinyMceIconEnum2["ArrowLeft"] = "arrow-left";
  TinyMceIconEnum2["ArrowRight"] = "arrow-right";
  TinyMceIconEnum2["Cancel"] = "cancel";
  TinyMceIconEnum2["CheckMark"] = "checkmark";
  TinyMceIconEnum2["ChevronDown"] = "chevron-down";
  TinyMceIconEnum2["ChevronRight"] = "chevron-right";
  TinyMceIconEnum2["ChevronUp"] = "chevron-up";
  TinyMceIconEnum2["ChevronLeft"] = "chevron-left";
  TinyMceIconEnum2["Close"] = "close";
  TinyMceIconEnum2["Edit"] = "edit-block";
  TinyMceIconEnum2["FullScreen"] = "fullscreen";
  TinyMceIconEnum2["Home"] = "home";
  TinyMceIconEnum2["LineHorizontal"] = "horizontal-rule";
  TinyMceIconEnum2["BurgerHorizontal"] = "image-options";
  TinyMceIconEnum2["Image"] = "image";
  TinyMceIconEnum2["Info"] = "info";
  TinyMceIconEnum2["Time"] = "insert-time";
  TinyMceIconEnum2["Symbols"] = "insert-character";
  TinyMceIconEnum2["Link"] = "link";
  TinyMceIconEnum2["Url"] = "link";
  TinyMceIconEnum2["Lock"] = "lock";
  TinyMceIconEnum2["Document"] = "new-document";
  TinyMceIconEnum2["NewTab"] = "new-tab";
  TinyMceIconEnum2["Alert"] = "notice";
  TinyMceIconEnum2["Paragraph"] = "paragraph";
  TinyMceIconEnum2["Paste"] = "paste";
  TinyMceIconEnum2["PasteText"] = "paste-text";
  TinyMceIconEnum2["Add"] = "plus";
  TinyMceIconEnum2["Plus"] = "plus";
  TinyMceIconEnum2["Settings"] = "preferences";
  TinyMceIconEnum2["Preview"] = "preview";
  TinyMceIconEnum2["Print"] = "print";
  TinyMceIconEnum2["Quote"] = "quote";
  TinyMceIconEnum2["Redo"] = "redo";
  TinyMceIconEnum2["Reload"] = "reload";
  TinyMceIconEnum2["Refresh"] = "reload";
  TinyMceIconEnum2["Remove"] = "remove";
  TinyMceIconEnum2["Delete"] = "remove";
  TinyMceIconEnum2["Resize"] = "resize";
  TinyMceIconEnum2["RotateLeft"] = "rotate-left";
  TinyMceIconEnum2["RotateRight"] = "rotate-right";
  TinyMceIconEnum2["Search"] = "search";
  TinyMceIconEnum2["SourceCode"] = "sourcecode";
  TinyMceIconEnum2["Table"] = "table";
  TinyMceIconEnum2["Undo"] = "undo";
  TinyMceIconEnum2["Unlink"] = "unlink";
  TinyMceIconEnum2["Unlock"] = "unlock";
  TinyMceIconEnum2["Upload"] = "upload";
  TinyMceIconEnum2["Warning"] = "warning";
  TinyMceIconEnum2["ZoomIn"] = "zoom-in";
  TinyMceIconEnum2["ZoomOut"] = "zoom-out";
  return TinyMceIconEnum2;
})(TinyMceIconEnum || {});
class vrEditorCustomItem {
  icon;
  imageUrl;
  text;
  tooltip;
}
class vrEditorCustomMenuItem {
  type;
  buttonOptions;
  separatorOptions;
  splitButtonOptions;
  switchOptions;
  buttonGroupOptions;
  comboBoxOptions;
  datePickerOptions;
  textBoxOptions;
  labelOptions;
}
var EditorCustomMenuItemType = /* @__PURE__ */ ((EditorCustomMenuItemType2) => {
  EditorCustomMenuItemType2[EditorCustomMenuItemType2["Button"] = 0] = "Button";
  EditorCustomMenuItemType2[EditorCustomMenuItemType2["Separator"] = 1] = "Separator";
  EditorCustomMenuItemType2[EditorCustomMenuItemType2["SplitButton"] = 2] = "SplitButton";
  EditorCustomMenuItemType2[EditorCustomMenuItemType2["Switch"] = 3] = "Switch";
  EditorCustomMenuItemType2[EditorCustomMenuItemType2["ButtonGroup"] = 4] = "ButtonGroup";
  EditorCustomMenuItemType2[EditorCustomMenuItemType2["CheckBox"] = 5] = "CheckBox";
  EditorCustomMenuItemType2[EditorCustomMenuItemType2["ComboBox"] = 6] = "ComboBox";
  EditorCustomMenuItemType2[EditorCustomMenuItemType2["DatePicker"] = 7] = "DatePicker";
  EditorCustomMenuItemType2[EditorCustomMenuItemType2["Label"] = 8] = "Label";
  EditorCustomMenuItemType2[EditorCustomMenuItemType2["TextBox"] = 9] = "TextBox";
  return EditorCustomMenuItemType2;
})(EditorCustomMenuItemType || {});
class vrEditorSpeechRecognizerSettings {
  stopAtClick;
  position;
  mode;
  showInfoCommands;
}
var EditorSpeechRecognizerModeEnum = /* @__PURE__ */ ((EditorSpeechRecognizerModeEnum2) => {
  EditorSpeechRecognizerModeEnum2[EditorSpeechRecognizerModeEnum2["Popup"] = 0] = "Popup";
  EditorSpeechRecognizerModeEnum2[EditorSpeechRecognizerModeEnum2["Direct"] = 1] = "Direct";
  return EditorSpeechRecognizerModeEnum2;
})(EditorSpeechRecognizerModeEnum || {});
var EditorSpeechRecognizerPositionEnum = /* @__PURE__ */ ((EditorSpeechRecognizerPositionEnum2) => {
  EditorSpeechRecognizerPositionEnum2[EditorSpeechRecognizerPositionEnum2["MenuBar"] = 0] = "MenuBar";
  EditorSpeechRecognizerPositionEnum2[EditorSpeechRecognizerPositionEnum2["MenuItems"] = 1] = "MenuItems";
  return EditorSpeechRecognizerPositionEnum2;
})(EditorSpeechRecognizerPositionEnum || {});
class vrEditorFontSizeSettings {
  defaultSize;
  formatSizeList;
}
class SpeechRecognizerOptions extends VrControlOptions {
  grammars;
  continuous;
  stopAtClick;
  interimResults;
  language;
  maxAlternatives;
  size;
  onClick;
  onNoMatch;
  onError;
  onResult;
  onStart;
  onEnd;
  onSpeechStart;
  onSpeechEnd;
  onAudioStart;
  onAudioEnd;
  onSoundStart;
  onSoundEnd;
}
var GridCheckboxModeEnum = /* @__PURE__ */ ((GridCheckboxModeEnum2) => {
  GridCheckboxModeEnum2[GridCheckboxModeEnum2["None"] = 0] = "None";
  GridCheckboxModeEnum2[GridCheckboxModeEnum2["SingleCheck"] = 1] = "SingleCheck";
  GridCheckboxModeEnum2[GridCheckboxModeEnum2["MultiCheck"] = 2] = "MultiCheck";
  return GridCheckboxModeEnum2;
})(GridCheckboxModeEnum || {});
var GridSortDirectionEnum = /* @__PURE__ */ ((GridSortDirectionEnum2) => {
  GridSortDirectionEnum2[GridSortDirectionEnum2["Asc"] = 0] = "Asc";
  GridSortDirectionEnum2[GridSortDirectionEnum2["Desc"] = 1] = "Desc";
  return GridSortDirectionEnum2;
})(GridSortDirectionEnum || {});
var SortDirectionEnum = /* @__PURE__ */ ((SortDirectionEnum2) => {
  SortDirectionEnum2[SortDirectionEnum2["Asc"] = 0] = "Asc";
  SortDirectionEnum2[SortDirectionEnum2["Desc"] = 1] = "Desc";
  return SortDirectionEnum2;
})(SortDirectionEnum || {});
var GridHeightModeEnum = /* @__PURE__ */ ((GridHeightModeEnum2) => {
  GridHeightModeEnum2[GridHeightModeEnum2["FitScreen"] = 0] = "FitScreen";
  GridHeightModeEnum2[GridHeightModeEnum2["FitContent"] = 1] = "FitContent";
  return GridHeightModeEnum2;
})(GridHeightModeEnum || {});
var GridModeEnum = /* @__PURE__ */ ((GridModeEnum2) => {
  GridModeEnum2[GridModeEnum2["Sync"] = 0] = "Sync";
  GridModeEnum2[GridModeEnum2["NotSync"] = 1] = "NotSync";
  return GridModeEnum2;
})(GridModeEnum || {});
var GridAggregateMode = /* @__PURE__ */ ((GridAggregateMode2) => {
  GridAggregateMode2[GridAggregateMode2["Average"] = 0] = "Average";
  GridAggregateMode2[GridAggregateMode2["Count"] = 1] = "Count";
  GridAggregateMode2[GridAggregateMode2["Max"] = 2] = "Max";
  GridAggregateMode2[GridAggregateMode2["Min"] = 3] = "Min";
  GridAggregateMode2[GridAggregateMode2["Sum"] = 4] = "Sum";
  GridAggregateMode2[GridAggregateMode2["None"] = 5] = "None";
  return GridAggregateMode2;
})(GridAggregateMode || {});
var GridAlignEnum = /* @__PURE__ */ ((GridAlignEnum2) => {
  GridAlignEnum2["Left"] = "left";
  GridAlignEnum2["Center"] = "center";
  GridAlignEnum2["Right"] = "right";
  return GridAlignEnum2;
})(GridAlignEnum || {});
var GridColumnTypeEnum = /* @__PURE__ */ ((GridColumnTypeEnum2) => {
  GridColumnTypeEnum2[GridColumnTypeEnum2["String"] = 0] = "String";
  GridColumnTypeEnum2[GridColumnTypeEnum2["Number"] = 1] = "Number";
  GridColumnTypeEnum2[GridColumnTypeEnum2["Currency"] = 2] = "Currency";
  GridColumnTypeEnum2[GridColumnTypeEnum2["Percentage"] = 3] = "Percentage";
  GridColumnTypeEnum2[GridColumnTypeEnum2["Duration"] = 4] = "Duration";
  GridColumnTypeEnum2[GridColumnTypeEnum2["Date"] = 5] = "Date";
  GridColumnTypeEnum2[GridColumnTypeEnum2["Time"] = 6] = "Time";
  GridColumnTypeEnum2[GridColumnTypeEnum2["DateTime"] = 7] = "DateTime";
  GridColumnTypeEnum2[GridColumnTypeEnum2["Checkbox"] = 8] = "Checkbox";
  GridColumnTypeEnum2[GridColumnTypeEnum2["Boolean"] = 9] = "Boolean";
  GridColumnTypeEnum2[GridColumnTypeEnum2["Button"] = 10] = "Button";
  GridColumnTypeEnum2[GridColumnTypeEnum2["EditButton"] = 11] = "EditButton";
  GridColumnTypeEnum2[GridColumnTypeEnum2["Label"] = 12] = "Label";
  GridColumnTypeEnum2[GridColumnTypeEnum2["Image"] = 13] = "Image";
  GridColumnTypeEnum2[GridColumnTypeEnum2["Custom"] = 14] = "Custom";
  GridColumnTypeEnum2[GridColumnTypeEnum2["Icon"] = 15] = "Icon";
  GridColumnTypeEnum2[GridColumnTypeEnum2["DropDownList"] = 16] = "DropDownList";
  GridColumnTypeEnum2[GridColumnTypeEnum2["ComboBox"] = 17] = "ComboBox";
  GridColumnTypeEnum2[GridColumnTypeEnum2["DropDownTree"] = 18] = "DropDownTree";
  GridColumnTypeEnum2[GridColumnTypeEnum2["DropDownTreeCheckboxes"] = 19] = "DropDownTreeCheckboxes";
  GridColumnTypeEnum2[GridColumnTypeEnum2["PasswordViewable"] = 20] = "PasswordViewable";
  GridColumnTypeEnum2[GridColumnTypeEnum2["Color"] = 21] = "Color";
  GridColumnTypeEnum2[GridColumnTypeEnum2["LongDate"] = 22] = "LongDate";
  GridColumnTypeEnum2[GridColumnTypeEnum2["LongDateTime"] = 23] = "LongDateTime";
  GridColumnTypeEnum2[GridColumnTypeEnum2["LongWeekDate"] = 24] = "LongWeekDate";
  GridColumnTypeEnum2[GridColumnTypeEnum2["ShortWeekDate"] = 25] = "ShortWeekDate";
  return GridColumnTypeEnum2;
})(GridColumnTypeEnum || {});
var GridLabelUnderlineMode = /* @__PURE__ */ ((GridLabelUnderlineMode2) => {
  GridLabelUnderlineMode2[GridLabelUnderlineMode2["Always"] = 0] = "Always";
  GridLabelUnderlineMode2[GridLabelUnderlineMode2["None"] = 1] = "None";
  GridLabelUnderlineMode2[GridLabelUnderlineMode2["OnFocus"] = 2] = "OnFocus";
  return GridLabelUnderlineMode2;
})(GridLabelUnderlineMode || {});
var GridToolbarItemType = /* @__PURE__ */ ((GridToolbarItemType2) => {
  GridToolbarItemType2[GridToolbarItemType2["Add"] = 0] = "Add";
  GridToolbarItemType2[GridToolbarItemType2["Delete"] = 1] = "Delete";
  GridToolbarItemType2[GridToolbarItemType2["Separator"] = 2] = "Separator";
  GridToolbarItemType2[GridToolbarItemType2["Excel"] = 3] = "Excel";
  GridToolbarItemType2[GridToolbarItemType2["ExcelWithHiddenColumns"] = 4] = "ExcelWithHiddenColumns";
  GridToolbarItemType2[GridToolbarItemType2["Custom"] = 5] = "Custom";
  GridToolbarItemType2[GridToolbarItemType2["Rebind"] = 6] = "Rebind";
  GridToolbarItemType2[GridToolbarItemType2["SplitButton"] = 7] = "SplitButton";
  GridToolbarItemType2[GridToolbarItemType2["Switch"] = 8] = "Switch";
  GridToolbarItemType2[GridToolbarItemType2["ButtonGroup"] = 9] = "ButtonGroup";
  GridToolbarItemType2[GridToolbarItemType2["CheckBox"] = 10] = "CheckBox";
  GridToolbarItemType2[GridToolbarItemType2["ComboBox"] = 11] = "ComboBox";
  GridToolbarItemType2[GridToolbarItemType2["DatePicker"] = 12] = "DatePicker";
  GridToolbarItemType2[GridToolbarItemType2["Label"] = 13] = "Label";
  GridToolbarItemType2[GridToolbarItemType2["TextBox"] = 14] = "TextBox";
  return GridToolbarItemType2;
})(GridToolbarItemType || {});
var GridDateFilterTypeEnum = /* @__PURE__ */ ((GridDateFilterTypeEnum2) => {
  GridDateFilterTypeEnum2[GridDateFilterTypeEnum2["GreaterThan"] = 0] = "GreaterThan";
  GridDateFilterTypeEnum2[GridDateFilterTypeEnum2["LessThan"] = 1] = "LessThan";
  GridDateFilterTypeEnum2[GridDateFilterTypeEnum2["EqualsTo"] = 2] = "EqualsTo";
  GridDateFilterTypeEnum2[GridDateFilterTypeEnum2["Between"] = 3] = "Between";
  return GridDateFilterTypeEnum2;
})(GridDateFilterTypeEnum || {});
var GridNumberFilterTypeEnum = /* @__PURE__ */ ((GridNumberFilterTypeEnum2) => {
  GridNumberFilterTypeEnum2[GridNumberFilterTypeEnum2["GreaterThan"] = 0] = "GreaterThan";
  GridNumberFilterTypeEnum2[GridNumberFilterTypeEnum2["LessThan"] = 1] = "LessThan";
  GridNumberFilterTypeEnum2[GridNumberFilterTypeEnum2["EqualsTo"] = 2] = "EqualsTo";
  GridNumberFilterTypeEnum2[GridNumberFilterTypeEnum2["Between"] = 3] = "Between";
  return GridNumberFilterTypeEnum2;
})(GridNumberFilterTypeEnum || {});
var GridStringFilterTypeEnum = /* @__PURE__ */ ((GridStringFilterTypeEnum2) => {
  GridStringFilterTypeEnum2[GridStringFilterTypeEnum2["StartsWith"] = 0] = "StartsWith";
  GridStringFilterTypeEnum2[GridStringFilterTypeEnum2["EndsWith"] = 1] = "EndsWith";
  GridStringFilterTypeEnum2[GridStringFilterTypeEnum2["EqualsTo"] = 2] = "EqualsTo";
  GridStringFilterTypeEnum2[GridStringFilterTypeEnum2["Includes"] = 3] = "Includes";
  GridStringFilterTypeEnum2[GridStringFilterTypeEnum2["IncludesFromSimpleSearch"] = 4] = "IncludesFromSimpleSearch";
  return GridStringFilterTypeEnum2;
})(GridStringFilterTypeEnum || {});
class GridCartSettings {
  fields;
  onClick;
}
class GridCartSettingsClickEvent {
  sender;
  selectedValues;
}
class GridStickerSettings {
  textColor;
  backgroundColor;
  text;
  cssContainer;
  css;
  bold;
  onClick;
}
class GridStickerClickEvent {
  sender;
  control;
  value;
}
class GridServerBindSettings {
  itemCountPropertyName;
  totalsPropertyName;
  excelDownloadUrlPropertyName;
}
class GridGroupBySettings {
  sortBy;
  internalSortBy;
  fields;
  automaticSort;
}
class GridSortSettings {
  field;
  direction;
}
class GridGroupByItem {
  field;
  displayField;
  groupNameIfEmpty;
  checkbox;
  displayValue;
  onExpandCollapse;
  onEditClick;
}
class GridGroupDisplayValueEvent {
  sender;
  dataItem;
  field;
  displayField;
}
class GridGroupExpandCollapseEvent {
  sender;
  groupByField;
  childrenItems;
  groupByDisplayField;
  collapse;
  value;
  childrenRows;
  displayValue;
}
class GridGroupEditClickEvent {
  sender;
  groupByField;
  childrenItems;
  groupByDisplayField;
  value;
  childrenRows;
  displayValue;
  dataItem;
}
class GridPageSelectedEvent extends VrControlsEvent {
  sender;
  pageSelected;
}
class GridScrollEvent extends VrControlsEvent {
  sender;
  target;
  scrollLeft;
  scrollTop;
}
class GridExcelExportEvent extends VrControlsEvent {
  sender;
}
class GridBeforeExcelExportEvent extends GridExcelExportEvent {
  fileName;
  exportHiddenColumns;
}
class GridAfterExcelExportEvent extends GridExcelExportEvent {
  headerRow;
  contentRows;
  footerRow;
  excelFileName;
  groupBy;
  exportHiddenColumns;
}
class GridGroupCheckEvent extends VrControlsEvent {
  sender;
  checked;
  childrenIdList;
}
class GridBeforeGroupCheckEvent extends GridGroupCheckEvent {
}
class GridAfterGroupCheckEvent extends GridGroupCheckEvent {
}
class GridColumn {
  field;
  title;
  width;
  fitSpace;
  type;
  decimalDigits;
  milesSeparator;
  showSeconds;
  ignoreFactor;
  bold;
  aggregate;
  countZeroInAverage;
  roundingSettings;
  defaultValue;
  editable;
  exportable;
  groupable;
  locked;
  lockable;
  hidden;
  hideable;
  filterable;
  filterWebService;
  customFilterProperties;
  //#region DropDownList, ComboBox and DropDownTree
  displayField;
  dataItems;
  ddlNullable;
  //#endregion
  headerSettings;
  cellSettings;
  //#region Controls
  buttonSettings;
  customSettings;
  iconSettings;
  imageSettings;
  labelSettings;
  //#endregion
}
class GridButtonSettings extends GridControlsSettings {
  text;
  icon;
  imageUrl;
  isPrimaryButton;
  color;
  backgroundColor;
}
class GridToolbarItem {
  type;
  text;
  icon;
  imageUrl;
  confirmationMessage;
  deleteRequest;
  excelFileName;
  backgroundColor;
  textColor;
  visible;
  css;
  cssContainer;
  classContainer;
  badge;
  primary;
  enable;
  splitButtonItems;
  splitButtonOptions;
  switchSettings;
  buttonGroupItems;
  comboBoxOptions;
  datePickerOptions;
  textBoxOptions;
  /** Required if type CUSTOM */
  value;
  onClick;
  onBeforeClick;
}
var PdfViewerToolbarAreaEnum = /* @__PURE__ */ ((PdfViewerToolbarAreaEnum2) => {
  PdfViewerToolbarAreaEnum2[PdfViewerToolbarAreaEnum2["Left"] = 0] = "Left";
  PdfViewerToolbarAreaEnum2[PdfViewerToolbarAreaEnum2["Center"] = 1] = "Center";
  PdfViewerToolbarAreaEnum2[PdfViewerToolbarAreaEnum2["Right"] = 2] = "Right";
  return PdfViewerToolbarAreaEnum2;
})(PdfViewerToolbarAreaEnum || {});
class OnContentRenderedEvent {
  sender;
  pdf;
  base64bytes;
}
class PdfViewerToolbarSettings {
  navigation;
  zoom;
  print;
  download;
  items;
}
class PdfViewerToolbarItem {
  text;
  icon;
  value;
  area;
  css;
  cssContainer;
  onClick;
}
class ToolbarItemOnClickEvent {
  sender;
  text;
  value;
}
var SplitterDirectionEnum = /* @__PURE__ */ ((SplitterDirectionEnum2) => {
  SplitterDirectionEnum2["Horizontal"] = "horizontal";
  SplitterDirectionEnum2["Vertical"] = "vertical";
  return SplitterDirectionEnum2;
})(SplitterDirectionEnum || {});
var SplitterCollapseDirectionEnum = /* @__PURE__ */ ((SplitterCollapseDirectionEnum2) => {
  SplitterCollapseDirectionEnum2[SplitterCollapseDirectionEnum2["Left"] = 0] = "Left";
  SplitterCollapseDirectionEnum2[SplitterCollapseDirectionEnum2["Right"] = 1] = "Right";
  SplitterCollapseDirectionEnum2[SplitterCollapseDirectionEnum2["Up"] = 2] = "Up";
  SplitterCollapseDirectionEnum2[SplitterCollapseDirectionEnum2["Down"] = 3] = "Down";
  return SplitterCollapseDirectionEnum2;
})(SplitterCollapseDirectionEnum || {});
class SplitterCollapsableSettings {
  direction;
  color;
}
class SwitchLabelSettings {
  text;
  tooltip;
  color;
  bold;
  css;
  badgeSettings;
  onClick;
}
class SwitchLabelSettingsOnClickEvent extends VrControlsEvent {
  sender;
  checked;
}
class BadgeSettings {
  text;
  color;
  backgroundColor;
  visible;
  css;
  click;
}
class BadgeClickEvent {
  sender;
  text;
  leftButton;
  middleButton;
  rightButton;
}
class SchedulerSaturationInfo {
  manual;
  dayMode;
  weekMode;
  fourWeeksMode;
}
class SchedulerSaturationDay {
  resourceId;
  date;
  percentageValue;
  color;
  borderColor;
}
class SchedulerSaturationWeek {
  groupedByResource;
  groupedByDate;
}
class SchedulerSaturationWeekByResource {
  resourceId;
  percentageValue;
  dateList;
  color;
  titleColor;
}
class SaturationDate {
  date;
  percentageValue;
  color;
  borderColor;
}
class SchedulerSaturationWeekByDate {
  date;
  resourceList;
}
class SaturationResource {
  id;
  percentageValue;
  color;
  borderColor;
}
class SchedulerSaturationFourWeeks {
  resourceId;
  percentageValue;
  dateList;
  color;
  titleColor;
}
class SchedulerResource {
  text;
  value;
}
var DayOfWeekEnum = /* @__PURE__ */ ((DayOfWeekEnum2) => {
  DayOfWeekEnum2[DayOfWeekEnum2["Sunday"] = 0] = "Sunday";
  DayOfWeekEnum2[DayOfWeekEnum2["Monday"] = 1] = "Monday";
  DayOfWeekEnum2[DayOfWeekEnum2["Tuesday"] = 2] = "Tuesday";
  DayOfWeekEnum2[DayOfWeekEnum2["Wednesday"] = 3] = "Wednesday";
  DayOfWeekEnum2[DayOfWeekEnum2["Thursday"] = 4] = "Thursday";
  DayOfWeekEnum2[DayOfWeekEnum2["Friday"] = 5] = "Friday";
  DayOfWeekEnum2[DayOfWeekEnum2["Saturday"] = 6] = "Saturday";
  return DayOfWeekEnum2;
})(DayOfWeekEnum || {});
class SchedulerView {
  type;
  selected;
}
var SchedulerViewEnum = /* @__PURE__ */ ((SchedulerViewEnum2) => {
  SchedulerViewEnum2[SchedulerViewEnum2["Day"] = 0] = "Day";
  SchedulerViewEnum2[SchedulerViewEnum2["Week"] = 1] = "Week";
  SchedulerViewEnum2[SchedulerViewEnum2["FourWeeks"] = 2] = "FourWeeks";
  return SchedulerViewEnum2;
})(SchedulerViewEnum || {});
class SchedulerSlotElement {
  resourceId;
  start;
  end;
  columnPosition;
  attributes;
  columnIndex;
  rowIndex;
}
class SchedulerData {
  id;
  resourceId;
  start;
  end;
  backgroundColor;
  textColor;
  text;
  tooltip;
  css;
  class;
  attributes;
  get duration() {
    return Date.vrDifferenceBetweenDatesInMinutes(new Date(this.start), new Date(this.end));
  }
}
class SchedulerAttribute {
  key;
  value;
}
var SchedulerNavigateActionEnum = /* @__PURE__ */ ((SchedulerNavigateActionEnum2) => {
  SchedulerNavigateActionEnum2[SchedulerNavigateActionEnum2["NextDate"] = 0] = "NextDate";
  SchedulerNavigateActionEnum2[SchedulerNavigateActionEnum2["PrevDate"] = 1] = "PrevDate";
  SchedulerNavigateActionEnum2[SchedulerNavigateActionEnum2["Today"] = 2] = "Today";
  SchedulerNavigateActionEnum2[SchedulerNavigateActionEnum2["ChangeDate"] = 4] = "ChangeDate";
  return SchedulerNavigateActionEnum2;
})(SchedulerNavigateActionEnum || {});
class NotifierOptions {
  target;
  type;
  position;
  hideSettings;
  showSettings;
  colorSettings;
  css;
  cssContainer;
  class;
  width;
  icon;
  bold;
  fontSize;
  customHtml;
  onClick;
}
var NotifierTypeEnum = /* @__PURE__ */ ((NotifierTypeEnum2) => {
  NotifierTypeEnum2[NotifierTypeEnum2["Default"] = 0] = "Default";
  NotifierTypeEnum2[NotifierTypeEnum2["Success"] = 1] = "Success";
  NotifierTypeEnum2[NotifierTypeEnum2["Info"] = 2] = "Info";
  NotifierTypeEnum2[NotifierTypeEnum2["Warning"] = 3] = "Warning";
  NotifierTypeEnum2[NotifierTypeEnum2["Error"] = 4] = "Error";
  return NotifierTypeEnum2;
})(NotifierTypeEnum || {});
var NotifierPositionEnum = /* @__PURE__ */ ((NotifierPositionEnum2) => {
  NotifierPositionEnum2["TopLeft"] = "TopLeft";
  NotifierPositionEnum2["TopCenter"] = "TopCenter";
  NotifierPositionEnum2["TopRight"] = "TopRight";
  NotifierPositionEnum2["BottomLeft"] = "BottomLeft";
  NotifierPositionEnum2["BottomCenter"] = "BottomCenter";
  NotifierPositionEnum2["BottomRight"] = "BottomRight";
  NotifierPositionEnum2["RightMiddle"] = "RightMiddle";
  NotifierPositionEnum2["RightTop"] = "RightTop";
  NotifierPositionEnum2["RightBottom"] = "RightBottom";
  NotifierPositionEnum2["LeftBottom"] = "LeftBottom";
  NotifierPositionEnum2["LeftTop"] = "LeftTop";
  NotifierPositionEnum2["LeftMiddle"] = "LeftMiddle";
  NotifierPositionEnum2["MiddleScreen"] = "MiddleScreen";
  return NotifierPositionEnum2;
})(NotifierPositionEnum || {});
var AnimationShowEnum = /* @__PURE__ */ ((AnimationShowEnum2) => {
  AnimationShowEnum2[AnimationShowEnum2["None"] = 0] = "None";
  AnimationShowEnum2[AnimationShowEnum2["Default"] = 1] = "Default";
  AnimationShowEnum2[AnimationShowEnum2["FadeIn"] = 2] = "FadeIn";
  AnimationShowEnum2[AnimationShowEnum2["SlideDown"] = 3] = "SlideDown";
  return AnimationShowEnum2;
})(AnimationShowEnum || {});
var AnimationHideEnum = /* @__PURE__ */ ((AnimationHideEnum2) => {
  AnimationHideEnum2[AnimationHideEnum2["None"] = 0] = "None";
  AnimationHideEnum2[AnimationHideEnum2["Default"] = 1] = "Default";
  AnimationHideEnum2[AnimationHideEnum2["FadeOut"] = 2] = "FadeOut";
  AnimationHideEnum2[AnimationHideEnum2["SlideUp"] = 3] = "SlideUp";
  return AnimationHideEnum2;
})(AnimationHideEnum || {});
var TooltipShowOnEnum = /* @__PURE__ */ ((TooltipShowOnEnum2) => {
  TooltipShowOnEnum2[TooltipShowOnEnum2["Click"] = 0] = "Click";
  TooltipShowOnEnum2[TooltipShowOnEnum2["Focus"] = 1] = "Focus";
  TooltipShowOnEnum2[TooltipShowOnEnum2["Hover"] = 2] = "Hover";
  TooltipShowOnEnum2[TooltipShowOnEnum2["Never"] = 3] = "Never";
  return TooltipShowOnEnum2;
})(TooltipShowOnEnum || {});
var TooltipHideOnEnum = /* @__PURE__ */ ((TooltipHideOnEnum2) => {
  TooltipHideOnEnum2[TooltipHideOnEnum2["Default"] = 0] = "Default";
  TooltipHideOnEnum2[TooltipHideOnEnum2["Never"] = 1] = "Never";
  TooltipHideOnEnum2[TooltipHideOnEnum2["Click"] = 2] = "Click";
  TooltipHideOnEnum2[TooltipHideOnEnum2["Blur"] = 3] = "Blur";
  TooltipHideOnEnum2[TooltipHideOnEnum2["Leave"] = 4] = "Leave";
  return TooltipHideOnEnum2;
})(TooltipHideOnEnum || {});
var TooltipTypeEnum = /* @__PURE__ */ ((TooltipTypeEnum2) => {
  TooltipTypeEnum2[TooltipTypeEnum2["Default"] = 0] = "Default";
  TooltipTypeEnum2[TooltipTypeEnum2["Success"] = 1] = "Success";
  TooltipTypeEnum2[TooltipTypeEnum2["Info"] = 2] = "Info";
  TooltipTypeEnum2[TooltipTypeEnum2["Warning"] = 3] = "Warning";
  TooltipTypeEnum2[TooltipTypeEnum2["Error"] = 4] = "Error";
  return TooltipTypeEnum2;
})(TooltipTypeEnum || {});
var TooltipPositionEnum = /* @__PURE__ */ ((TooltipPositionEnum2) => {
  TooltipPositionEnum2["TopLeft"] = "TopLeft";
  TooltipPositionEnum2["TopCenter"] = "TopCenter";
  TooltipPositionEnum2["TopRight"] = "TopRight";
  TooltipPositionEnum2["BottomLeft"] = "BottomLeft";
  TooltipPositionEnum2["BottomCenter"] = "BottomCenter";
  TooltipPositionEnum2["BottomRight"] = "BottomRight";
  TooltipPositionEnum2["RightMiddle"] = "RightMiddle";
  TooltipPositionEnum2["RightTop"] = "RightTop";
  TooltipPositionEnum2["RightBottom"] = "RightBottom";
  TooltipPositionEnum2["LeftBottom"] = "LeftBottom";
  TooltipPositionEnum2["LeftTop"] = "LeftTop";
  TooltipPositionEnum2["LeftMiddle"] = "LeftMiddle";
  TooltipPositionEnum2["MiddleScreen"] = "MiddleScreen";
  return TooltipPositionEnum2;
})(TooltipPositionEnum || {});
class TreeViewColumn {
  field;
  title;
  width;
  type;
  decimalDigits;
  showSeconds;
  ignoreFactor;
  bold;
  milesSeparator;
  boldRoot;
  hidden;
  headerSettings;
  cellSettings;
}
class TreeViewToolbarItem {
  type;
  text;
  icon;
  imageUrl;
  confirmationMessage;
  backgroundColor;
  textColor;
  visible;
  css;
  cssContainer;
  classContainer;
  badge;
  primary;
  splitButtonItems;
  switchSettings;
  buttonGroupItems;
  comboBoxOptions;
  datePickerOptions;
  textBoxOptions;
  /** Required if type CUSTOM */
  value;
  onClick;
}
class TreeViewToolbarSwitchSettings {
  labelOff;
  labelOn;
  checked;
  onCheck;
}
class TreeViewToolbarSwitchEvent {
  checked;
}
class TreeViewToolbarClickEvent {
  sender;
  type;
  isDefaultPrevented;
  deletedItems;
  preventDefault() {
    this.isDefaultPrevented = true;
  }
}
class UpdateRowRebindSettings {
  onlyText;
}
var TreeViewToolbarItemType = /* @__PURE__ */ ((TreeViewToolbarItemType2) => {
  TreeViewToolbarItemType2[TreeViewToolbarItemType2["Separator"] = 0] = "Separator";
  TreeViewToolbarItemType2[TreeViewToolbarItemType2["Excel"] = 1] = "Excel";
  TreeViewToolbarItemType2[TreeViewToolbarItemType2["Custom"] = 2] = "Custom";
  TreeViewToolbarItemType2[TreeViewToolbarItemType2["Rebind"] = 3] = "Rebind";
  TreeViewToolbarItemType2[TreeViewToolbarItemType2["SplitButton"] = 4] = "SplitButton";
  TreeViewToolbarItemType2[TreeViewToolbarItemType2["Switch"] = 5] = "Switch";
  TreeViewToolbarItemType2[TreeViewToolbarItemType2["ButtonGroup"] = 6] = "ButtonGroup";
  TreeViewToolbarItemType2[TreeViewToolbarItemType2["CheckBox"] = 7] = "CheckBox";
  TreeViewToolbarItemType2[TreeViewToolbarItemType2["ComboBox"] = 8] = "ComboBox";
  TreeViewToolbarItemType2[TreeViewToolbarItemType2["DatePicker"] = 9] = "DatePicker";
  TreeViewToolbarItemType2[TreeViewToolbarItemType2["Label"] = 10] = "Label";
  TreeViewToolbarItemType2[TreeViewToolbarItemType2["TextBox"] = 11] = "TextBox";
  return TreeViewToolbarItemType2;
})(TreeViewToolbarItemType || {});
class TreeViewItem {
  text;
  value;
  icon;
  parentValue;
  numericValue;
  bold;
}
class TreeViewItemExtraCell extends TreeViewColumn {
  value;
}
class TreeViewContextMenuItem {
  text;
  value;
  icon;
  separator;
  confirmationMessage;
  onClick;
}
var TreeModeEnum = /* @__PURE__ */ ((TreeModeEnum2) => {
  TreeModeEnum2[TreeModeEnum2["AllExpanded"] = 0] = "AllExpanded";
  TreeModeEnum2[TreeModeEnum2["OnlyFirstLevelExpanded"] = 1] = "OnlyFirstLevelExpanded";
  TreeModeEnum2[TreeModeEnum2["AllCollapsed"] = 2] = "AllCollapsed";
  return TreeModeEnum2;
})(TreeModeEnum || {});
var TreeViewNumericTypeEnum = /* @__PURE__ */ ((TreeViewNumericTypeEnum2) => {
  TreeViewNumericTypeEnum2[TreeViewNumericTypeEnum2["Default"] = 0] = "Default";
  TreeViewNumericTypeEnum2[TreeViewNumericTypeEnum2["Currency"] = 1] = "Currency";
  TreeViewNumericTypeEnum2[TreeViewNumericTypeEnum2["Percentage"] = 2] = "Percentage";
  return TreeViewNumericTypeEnum2;
})(TreeViewNumericTypeEnum || {});
var TreeViewColumnTypeEnum = /* @__PURE__ */ ((TreeViewColumnTypeEnum2) => {
  TreeViewColumnTypeEnum2[TreeViewColumnTypeEnum2["String"] = 0] = "String";
  TreeViewColumnTypeEnum2[TreeViewColumnTypeEnum2["Number"] = 1] = "Number";
  TreeViewColumnTypeEnum2[TreeViewColumnTypeEnum2["Currency"] = 2] = "Currency";
  TreeViewColumnTypeEnum2[TreeViewColumnTypeEnum2["Percentage"] = 3] = "Percentage";
  TreeViewColumnTypeEnum2[TreeViewColumnTypeEnum2["Duration"] = 4] = "Duration";
  TreeViewColumnTypeEnum2[TreeViewColumnTypeEnum2["Date"] = 5] = "Date";
  TreeViewColumnTypeEnum2[TreeViewColumnTypeEnum2["Time"] = 6] = "Time";
  TreeViewColumnTypeEnum2[TreeViewColumnTypeEnum2["DateTime"] = 7] = "DateTime";
  TreeViewColumnTypeEnum2[TreeViewColumnTypeEnum2["Checkbox"] = 8] = "Checkbox";
  TreeViewColumnTypeEnum2[TreeViewColumnTypeEnum2["Boolean"] = 9] = "Boolean";
  TreeViewColumnTypeEnum2[TreeViewColumnTypeEnum2["Color"] = 21] = "Color";
  return TreeViewColumnTypeEnum2;
})(TreeViewColumnTypeEnum || {});
var TreeViewAlignEnum = /* @__PURE__ */ ((TreeViewAlignEnum2) => {
  TreeViewAlignEnum2["Left"] = "left";
  TreeViewAlignEnum2["Center"] = "center";
  TreeViewAlignEnum2["Right"] = "right";
  return TreeViewAlignEnum2;
})(TreeViewAlignEnum || {});
class TreeViewFilterSettings {
  onlyParents;
}
class MapMarker {
  latitude;
  longitude;
  title;
  opacity;
  draggable;
}
var MapModeEnum = /* @__PURE__ */ ((MapModeEnum2) => {
  MapModeEnum2["Streets"] = "mapbox/streets-v11";
  MapModeEnum2["Outdoors"] = "mapbox/outdoors-v11";
  MapModeEnum2["Light"] = "mapbox/light-v10";
  MapModeEnum2["Dark"] = "mapbox/dark-v10";
  MapModeEnum2["Satellite"] = "mapbox/satellite-v9";
  MapModeEnum2["SatelliteStreets"] = "mapbox/satellite-streets-v11";
  MapModeEnum2["NavigationDay"] = "mapbox/navigation-day-v1";
  MapModeEnum2["NavigationNight"] = "mapbox/navigation-night-v1";
  return MapModeEnum2;
})(MapModeEnum || {});
class ColorPickerRgbaValue {
  r;
  g;
  b;
  a;
}
var ColorPickerModeEnum = /* @__PURE__ */ ((ColorPickerModeEnum2) => {
  ColorPickerModeEnum2["Hex"] = "hex";
  ColorPickerModeEnum2["Rgba"] = "rgba";
  return ColorPickerModeEnum2;
})(ColorPickerModeEnum || {});
var UploadValidationErrorTypeEnum = /* @__PURE__ */ ((UploadValidationErrorTypeEnum2) => {
  UploadValidationErrorTypeEnum2[UploadValidationErrorTypeEnum2["MinSize"] = 0] = "MinSize";
  UploadValidationErrorTypeEnum2[UploadValidationErrorTypeEnum2["MaxSize"] = 1] = "MaxSize";
  UploadValidationErrorTypeEnum2[UploadValidationErrorTypeEnum2["Extensions"] = 2] = "Extensions";
  return UploadValidationErrorTypeEnum2;
})(UploadValidationErrorTypeEnum || {});
var Color = /* @__PURE__ */ ((Color2) => {
  Color2["red"] = "#FF0000";
  Color2["red50"] = "#ffebee";
  Color2["red100"] = "#ffcdd2";
  Color2["red200"] = "#ef9a9a";
  Color2["red300"] = "#e57373";
  Color2["red400"] = "#ef5350";
  Color2["red500"] = "#f44336";
  Color2["red600"] = "#e53935";
  Color2["red700"] = "#d32f2f";
  Color2["red800"] = "#c62828";
  Color2["red900"] = "#b71c1c";
  Color2["redA100"] = "#ff8a80";
  Color2["redA200"] = "#ff5252";
  Color2["redA400"] = "#ff1744";
  Color2["redA700"] = "#d50000";
  Color2["pink50"] = "#fce4ec";
  Color2["pink100"] = "#f8bbd0";
  Color2["pink200"] = "#f48fb1";
  Color2["pink300"] = "#f06292";
  Color2["pink400"] = "#ec407a";
  Color2["pink500"] = "#e91e63";
  Color2["pink600"] = "#d81b60";
  Color2["pink700"] = "#c2185b";
  Color2["pink800"] = "#ad1457";
  Color2["pink900"] = "#880e4f";
  Color2["pinkA100"] = "#ff80ab";
  Color2["pinkA200"] = "#ff4081";
  Color2["pinkA400"] = "#f50057";
  Color2["pinkA700"] = "#c51162";
  Color2["purple50"] = "#f3e5f5";
  Color2["purple100"] = "#e1bee7";
  Color2["purple200"] = "#ce93d8";
  Color2["purple300"] = "#ba68c8";
  Color2["purple400"] = "#ab47bc";
  Color2["purple500"] = "#9c27b0";
  Color2["purple600"] = "#8e24aa";
  Color2["purple700"] = "#7b1fa2";
  Color2["purple800"] = "#6a1b9a";
  Color2["purple900"] = "#4a148c";
  Color2["purpleA100"] = "#ea80fc";
  Color2["purpleA200"] = "#e040fb";
  Color2["purpleA400"] = "#d500f9";
  Color2["purpleA700"] = "#aa00ff";
  Color2["deepPurple50"] = "#ede7f6";
  Color2["deepPurple100"] = "#d1c4e9";
  Color2["deepPurple200"] = "#b39ddb";
  Color2["deepPurple300"] = "#9575cd";
  Color2["deepPurple400"] = "#7e57c2";
  Color2["deepPurple500"] = "#673ab7";
  Color2["deepPurple600"] = "#5e35b1";
  Color2["deepPurple700"] = "#512da8";
  Color2["deepPurple800"] = "#4527a0";
  Color2["deepPurple900"] = "#311b92";
  Color2["deepPurpleA100"] = "#b388ff";
  Color2["deepPurpleA200"] = "#7c4dff";
  Color2["deepPurpleA400"] = "#651fff";
  Color2["deepPurpleA700"] = "#6200ea";
  Color2["indigo50"] = "#e8eaf6";
  Color2["indigo100"] = "#c5cae9";
  Color2["indigo200"] = "#9fa8da";
  Color2["indigo300"] = "#7986cb";
  Color2["indigo400"] = "#5c6bc0";
  Color2["indigo500"] = "#3f51b5";
  Color2["indigo600"] = "#3949ab";
  Color2["indigo700"] = "#303f9f";
  Color2["indigo800"] = "#283593";
  Color2["indigo900"] = "#1a237e";
  Color2["indigoA100"] = "#8c9eff";
  Color2["indigoA200"] = "#536dfe";
  Color2["indigoA400"] = "#3d5afe";
  Color2["indigoA700"] = "#304ffe";
  Color2["blue"] = "#0000FF";
  Color2["blue50"] = "#e3f2fd";
  Color2["blue100"] = "#bbdefb";
  Color2["blue200"] = "#90caf9";
  Color2["blue300"] = "#64b5f6";
  Color2["blue400"] = "#42a5f5";
  Color2["blue500"] = "#2196f3";
  Color2["blue600"] = "#1e88e5";
  Color2["blue700"] = "#1976d2";
  Color2["blue800"] = "#1565c0";
  Color2["blue900"] = "#0d47a1";
  Color2["blueA100"] = "#82b1ff";
  Color2["blueA200"] = "#448aff";
  Color2["blueA400"] = "#2979ff";
  Color2["blueA700"] = "#2962ff";
  Color2["lightBlue50"] = "#e1f5fe";
  Color2["lightBlue100"] = "#b3e5fc";
  Color2["lightBlue200"] = "#81d4fa";
  Color2["lightBlue300"] = "#4fc3f7";
  Color2["lightBlue400"] = "#29b6f6";
  Color2["lightBlue500"] = "#03a9f4";
  Color2["lightBlue600"] = "#039be5";
  Color2["lightBlue700"] = "#0288d1";
  Color2["lightBlue800"] = "#0277bd";
  Color2["lightBlue900"] = "#01579b";
  Color2["lightBlueA100"] = "#80d8ff";
  Color2["lightBlueA200"] = "#40c4ff";
  Color2["lightBlueA400"] = "#00b0ff";
  Color2["lightBlueA700"] = "#0091ea";
  Color2["cyan"] = "#00FFFF";
  Color2["cyan50"] = "#e0f7fa";
  Color2["cyan100"] = "#b2ebf2";
  Color2["cyan200"] = "#80deea";
  Color2["cyan300"] = "#4dd0e1";
  Color2["cyan400"] = "#26c6da";
  Color2["cyan500"] = "#00bcd4";
  Color2["cyan600"] = "#00acc1";
  Color2["cyan700"] = "#0097a7";
  Color2["cyan800"] = "#00838f";
  Color2["cyan900"] = "#006064";
  Color2["cyanA100"] = "#84ffff";
  Color2["cyanA200"] = "#18ffff";
  Color2["cyanA400"] = "#00e5ff";
  Color2["cyanA700"] = "#00b8d4";
  Color2["teal50"] = "#e0f2f1";
  Color2["teal100"] = "#b2dfdb";
  Color2["teal200"] = "#80cbc4";
  Color2["teal300"] = "#4db6ac";
  Color2["teal400"] = "#26a69a";
  Color2["teal500"] = "#009688";
  Color2["teal600"] = "#00897b";
  Color2["teal700"] = "#00796b";
  Color2["teal800"] = "#00695c";
  Color2["teal900"] = "#004d40";
  Color2["tealA100"] = "#a7ffeb";
  Color2["tealA200"] = "#64ffda";
  Color2["tealA400"] = "#1de9b6";
  Color2["tealA700"] = "#00bfa5";
  Color2["green"] = "#00FF00";
  Color2["green50"] = "#e8f5e9";
  Color2["green100"] = "#c8e6c9";
  Color2["green200"] = "#a5d6a7";
  Color2["green300"] = "#81c784";
  Color2["green400"] = "#66bb6a";
  Color2["green500"] = "#4caf50";
  Color2["green600"] = "#43a047";
  Color2["green700"] = "#388e3c";
  Color2["green800"] = "#2e7d32";
  Color2["green900"] = "#1b5e20";
  Color2["greenA100"] = "#b9f6ca";
  Color2["greenA200"] = "#69f0ae";
  Color2["greenA400"] = "#00e676";
  Color2["greenA700"] = "#00c853";
  Color2["lightGreen50"] = "#f1f8e9";
  Color2["lightGreen100"] = "#dcedc8";
  Color2["lightGreen200"] = "#c5e1a5";
  Color2["lightGreen300"] = "#aed581";
  Color2["lightGreen400"] = "#9ccc65";
  Color2["lightGreen500"] = "#8bc34a";
  Color2["lightGreen600"] = "#7cb342";
  Color2["lightGreen700"] = "#689f38";
  Color2["lightGreen800"] = "#558b2f";
  Color2["lightGreen900"] = "#33691e";
  Color2["lightGreenA100"] = "#ccff90";
  Color2["lightGreenA200"] = "#b2ff59";
  Color2["lightGreenA400"] = "#76ff03";
  Color2["lightGreenA700"] = "#64dd17";
  Color2["vettore"] = "#51B3E1";
  Color2["vettoreLight"] = "#e3f1fa";
  Color2["pumo"] = "#32CD32";
  Color2["lime50"] = "#f9fbe7";
  Color2["lime100"] = "#f0f4c3";
  Color2["lime200"] = "#e6ee9c";
  Color2["lime300"] = "#dce775";
  Color2["lime400"] = "#d4e157";
  Color2["lime500"] = "#cddc39";
  Color2["lime600"] = "#c0ca33";
  Color2["lime700"] = "#afb42b";
  Color2["lime800"] = "#9e9d24";
  Color2["lime900"] = "#827717";
  Color2["limeA100"] = "#f4ff81";
  Color2["limeA200"] = "#eeff41";
  Color2["limeA400"] = "#c6ff00";
  Color2["limeA700"] = "#aeea00";
  Color2["yellow"] = "#FFFF00";
  Color2["yellow50"] = "#fffde7";
  Color2["yellow100"] = "#fff9c4";
  Color2["yellow200"] = "#fff59d";
  Color2["yellow300"] = "#fff176";
  Color2["yellow400"] = "#ffee58";
  Color2["yellow500"] = "#ffeb3b";
  Color2["yellow600"] = "#fdd835";
  Color2["yellow700"] = "#fbc02d";
  Color2["yellow800"] = "#f9a825";
  Color2["yellow900"] = "#f57f17";
  Color2["yellowA100"] = "#ffff8d";
  Color2["yellowA200"] = "#ffff00";
  Color2["yellowA400"] = "#ffea00";
  Color2["yellowA700"] = "#ffd600";
  Color2["amber50"] = "#fff8e1";
  Color2["amber100"] = "#ffecb3";
  Color2["amber200"] = "#ffe082";
  Color2["amber300"] = "#ffd54f";
  Color2["amber400"] = "#ffca28";
  Color2["amber500"] = "#ffc107";
  Color2["amber600"] = "#ffb300";
  Color2["amber700"] = "#ffa000";
  Color2["amber800"] = "#ff8f00";
  Color2["amber900"] = "#ff6f00";
  Color2["amberA100"] = "#ffe57f";
  Color2["amberA200"] = "#ffd740";
  Color2["amberA400"] = "#ffc400";
  Color2["amberA700"] = "#ffab00";
  Color2["orange50"] = "#fff3e0";
  Color2["orange100"] = "#ffe0b2";
  Color2["orange200"] = "#ffcc80";
  Color2["orange300"] = "#ffb74d";
  Color2["orange400"] = "#ffa726";
  Color2["orange500"] = "#ff9800";
  Color2["orange600"] = "#fb8c00";
  Color2["orange700"] = "#f57c00";
  Color2["orange800"] = "#ef6c00";
  Color2["orange900"] = "#e65100";
  Color2["orangeA100"] = "#ffd180";
  Color2["orangeA200"] = "#ffab40";
  Color2["orangeA400"] = "#ff9100";
  Color2["orangeA700"] = "#ff6d00";
  Color2["deepOrange50"] = "#fbe9e7";
  Color2["deepOrange100"] = "#ffccbc";
  Color2["deepOrange200"] = "#ffab91";
  Color2["deepOrange300"] = "#ff8a65";
  Color2["deepOrange400"] = "#ff7043";
  Color2["deepOrange500"] = "#ff5722";
  Color2["deepOrange600"] = "#f4511e";
  Color2["deepOrange700"] = "#e64a19";
  Color2["deepOrange800"] = "#d84315";
  Color2["deepOrange900"] = "#bf360c";
  Color2["deepOrangeA100"] = "#ff9e80";
  Color2["deepOrangeA200"] = "#ff6e40";
  Color2["deepOrangeA400"] = "#ff3d00";
  Color2["deepOrangeA700"] = "#dd2c00";
  Color2["brown50"] = "#efebe9";
  Color2["brown100"] = "#d7ccc8";
  Color2["brown200"] = "#bcaaa4";
  Color2["brown300"] = "#a1887f";
  Color2["brown400"] = "#8d6e63";
  Color2["brown500"] = "#795548";
  Color2["brown600"] = "#6d4c41";
  Color2["brown700"] = "#5d4037";
  Color2["brown800"] = "#4e342e";
  Color2["brown900"] = "#3e2723";
  Color2["grey50"] = "#fafafa";
  Color2["grey100"] = "#f5f5f5";
  Color2["grey200"] = "#eeeeee";
  Color2["grey300"] = "#e0e0e0";
  Color2["grey400"] = "#bdbdbd";
  Color2["grey500"] = "#9e9e9e";
  Color2["grey600"] = "#757575";
  Color2["grey700"] = "#616161";
  Color2["grey800"] = "#424242";
  Color2["grey900"] = "#212121";
  Color2["blueGrey50"] = "#eceff1";
  Color2["blueGrey100"] = "#cfd8dc";
  Color2["blueGrey200"] = "#b0bec5";
  Color2["blueGrey300"] = "#90a4ae";
  Color2["blueGrey400"] = "#78909c";
  Color2["blueGrey500"] = "#607d8b";
  Color2["blueGrey600"] = "#546e7a";
  Color2["blueGrey700"] = "#455a64";
  Color2["blueGrey800"] = "#37474f";
  Color2["blueGrey900"] = "#263238";
  Color2["white"] = "#FFFFFF";
  Color2["black"] = "#000000";
  return Color2;
})(Color || {});
function pageError(callback) {
  window.onerror = (msg, url, lineNo, columnNo, error) => {
    if (callback != null) {
      let event = new PageErrorEvent();
      event.message = msg;
      event.url = url;
      event.lineNumber = lineNo;
      event.columnNumber = columnNo;
      event.error = error;
      callback(event);
      return false;
    }
    return true;
  };
}
class PageErrorEvent {
  message;
  url;
  lineNumber;
  columnNumber;
  error;
}
async function filesToBase64(files) {
  const filePathsPromises = [];
  files.forEach((file) => {
    filePathsPromises.push(fileToBase64(file));
  });
  const filePaths = await Promise.all(filePathsPromises);
  const mappedFiles = filePaths.map((base64File) => base64File);
  return mappedFiles;
}
function fileToBase64(file) {
  let promise = new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(String(reader.result));
  });
  return promise;
}
function isEquals(item1, item2) {
  return UtilityManager.equals(item1, item2);
}
function isLocalhost() {
  return location.hostname.includes("localhost");
}
function interval(callback, each, timeout, timeoutCallback) {
  UtilityManager.interval(callback, each, timeout, timeoutCallback);
}
function addCssStyle(cssRules, id) {
  UtilityManager.addCssStyle(cssRules, id);
}
function addCss(cssRules, id) {
  addCssStyle(cssRules, id);
}
function addJsScript(jsRules, id) {
  UtilityManager.addJsScript(jsRules, id);
}
function addCssFiles(...paths) {
  let promise = new Promise((callback) => {
    UtilityManager.addCssFiles(...paths).then(() => callback());
  });
  return promise;
}
function addJsFiles(...paths) {
  let promise = new Promise((callback) => {
    UtilityManager.addJsFiles(...paths).then(() => callback());
  });
  return promise;
}
function openUrl(url, name = "download", newTab = false) {
  UtilityManager.openUrl(url, name, newTab);
}
function openBrowserWindow(url, newTab = false, size, position) {
  let width = 1e3;
  let height = 700;
  if (size != null) {
    if (size.width != null) width = size.width;
    if (size.height != null) height = size.height;
  }
  let top = window.top.outerHeight / 2 + window.top.screenY - height / 2;
  let left = window.top.outerWidth / 2 + window.top.screenX - width / 2;
  if (position != null) {
    if (position.top != null) top = position.top;
    if (position.left != null) left = position.left;
  }
  window.open(url, newTab ? "_blank" : "", newTab ? `width=${width}, height=${height}, top=${top}, left=${left}` : "");
}
class BrowserWindowSize {
  height;
  width;
}
class BrowserWindowPosition {
  left;
  top;
}
function isValidEmail(email) {
  return UtilityManager.isValidEmail(email);
}
function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    oldSupportCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(() => notify("Copiato!"));
}
function oldSupportCopyTextToClipboard(text) {
  let textAreaTemp = document.createElement("textarea");
  textAreaTemp.value = text;
  textAreaTemp.style.top = "0";
  textAreaTemp.style.left = "0";
  textAreaTemp.style.position = "fixed";
  document.body.appendChild(textAreaTemp);
  textAreaTemp.focus();
  textAreaTemp.select();
  try {
    if (document.execCommand("copy")) notify("Copiato!");
  } catch (e) {
  }
  document.body.removeChild(textAreaTemp);
}
function base64ToFile(base64, fileName, options) {
  return UtilityManager.base64ToFile(base64, fileName, options);
}
function base64ToBytes(base64) {
  return UtilityManager.base64ToBytes(base64);
}
function bytesToBase64(bytes) {
  return UtilityManager.bytesToBase64(bytes);
}
function base64ToBlob(base64, contentType = "", sliceSize = 512) {
  return UtilityManager.base64ToBlob(base64, contentType, sliceSize);
}
function shadowRoot(shadowRoot2) {
  if (shadowRoot2 != null)
    _shadowRoot2 = shadowRoot2;
  return _shadowRoot2;
}
function jqueryVariable(jqueryVariable2) {
  if (jqueryVariable2 != null)
    _jqueryVariable = jqueryVariable2;
  return _jqueryVariable;
}
var WebApiModeEnum = /* @__PURE__ */ ((WebApiModeEnum2) => {
  WebApiModeEnum2[WebApiModeEnum2["Async"] = 0] = "Async";
  WebApiModeEnum2[WebApiModeEnum2["Sync"] = 1] = "Sync";
  return WebApiModeEnum2;
})(WebApiModeEnum || {});
var DateModeEnum = /* @__PURE__ */ ((DateModeEnum2) => {
  DateModeEnum2[DateModeEnum2["Date"] = 0] = "Date";
  DateModeEnum2[DateModeEnum2["DateTime"] = 1] = "DateTime";
  DateModeEnum2[DateModeEnum2["Time"] = 2] = "Time";
  DateModeEnum2[DateModeEnum2["LongDate"] = 3] = "LongDate";
  DateModeEnum2[DateModeEnum2["LongDateTime"] = 4] = "LongDateTime";
  DateModeEnum2[DateModeEnum2["LongWeekDate"] = 5] = "LongWeekDate";
  DateModeEnum2[DateModeEnum2["ShortWeekDate"] = 6] = "ShortWeekDate";
  return DateModeEnum2;
})(DateModeEnum || {});
var DateDepthEnum = /* @__PURE__ */ ((DateDepthEnum2) => {
  DateDepthEnum2[DateDepthEnum2["Day"] = 0] = "Day";
  DateDepthEnum2[DateDepthEnum2["Month"] = 1] = "Month";
  DateDepthEnum2[DateDepthEnum2["Year"] = 2] = "Year";
  return DateDepthEnum2;
})(DateDepthEnum || {});
var DateFormatEnum = /* @__PURE__ */ ((DateFormatEnum2) => {
  DateFormatEnum2[DateFormatEnum2["LongDate"] = 0] = "LongDate";
  DateFormatEnum2[DateFormatEnum2["ShortDate"] = 1] = "ShortDate";
  DateFormatEnum2[DateFormatEnum2["WeekDay"] = 2] = "WeekDay";
  DateFormatEnum2[DateFormatEnum2["WeekRange"] = 3] = "WeekRange";
  DateFormatEnum2[DateFormatEnum2["FourWeeksRange"] = 4] = "FourWeeksRange";
  DateFormatEnum2[DateFormatEnum2["Month"] = 5] = "Month";
  DateFormatEnum2[DateFormatEnum2["Year"] = 6] = "Year";
  DateFormatEnum2[DateFormatEnum2["LongDateWithoutYear"] = 7] = "LongDateWithoutYear";
  DateFormatEnum2[DateFormatEnum2["ShortDateWithoutYear"] = 8] = "ShortDateWithoutYear";
  DateFormatEnum2[DateFormatEnum2["LongWeekRange"] = 9] = "LongWeekRange";
  DateFormatEnum2[DateFormatEnum2["LongFourWeeksRange"] = 10] = "LongFourWeeksRange";
  return DateFormatEnum2;
})(DateFormatEnum || {});
var KeyEnum = /* @__PURE__ */ ((KeyEnum2) => {
  KeyEnum2["ArrowLeft"] = "ArrowLeft";
  KeyEnum2["ArrowUp"] = "ArrowUp";
  KeyEnum2["ArrowRight"] = "ArrowRight";
  KeyEnum2["ArrowDown"] = "ArrowDown";
  KeyEnum2["Enter"] = "Enter";
  KeyEnum2["Tab"] = "Tab";
  KeyEnum2["Backspace"] = "Backspace";
  KeyEnum2["Control"] = "Control";
  KeyEnum2["Shift"] = "Shift";
  return KeyEnum2;
})(KeyEnum || {});
class NumberFormatRoundingSettings {
  roundingMode;
  minimumFractionDigits;
  maximumFractionDigits;
}
class NumberFormatSettings extends NumberFormatRoundingSettings {
  constructor(roundingSettings) {
    super();
    if (roundingSettings != null) {
      this.roundingMode = roundingSettings.roundingMode;
      this.minimumFractionDigits = roundingSettings.minimumFractionDigits;
      this.maximumFractionDigits = roundingSettings.maximumFractionDigits;
    }
  }
  style;
  currency;
  useGrouping;
}
var GroupingModeEnum = /* @__PURE__ */ ((GroupingModeEnum2) => {
  GroupingModeEnum2["Always"] = "always";
  GroupingModeEnum2["Auto"] = "auto";
  GroupingModeEnum2["Min2"] = "min2";
  return GroupingModeEnum2;
})(GroupingModeEnum || {});
var RoundingModeEnum = /* @__PURE__ */ ((RoundingModeEnum2) => {
  RoundingModeEnum2["Default"] = "halfExpand";
  RoundingModeEnum2["None"] = "none";
  RoundingModeEnum2["Ceil"] = "ceil";
  RoundingModeEnum2["Floor"] = "floor";
  RoundingModeEnum2["AwayFromZero"] = "expand";
  RoundingModeEnum2["Expand"] = "expand";
  RoundingModeEnum2["Trunc"] = "trunc";
  RoundingModeEnum2["HalfCeil"] = "halfCeil";
  RoundingModeEnum2["HalfFloor"] = "halfFloor";
  RoundingModeEnum2["HalfAwayFromZero"] = "halfExpand";
  RoundingModeEnum2["HalfExpand"] = "halfExpand";
  RoundingModeEnum2["HalfTrunc"] = "halfTrunc";
  RoundingModeEnum2["HalfEven"] = "halfEven";
  return RoundingModeEnum2;
})(RoundingModeEnum || {});
class DateTime {
  year;
  month;
  day;
  hours;
  minutes;
  seconds;
  milliseconds;
  _createdByTypeEnum;
  constructor(date) {
    if (date != null) {
      if (typeof date == "string") {
        date = Date.vrFixDateString(date);
        this._createdByTypeEnum = 2;
      }
      if (Date.vrIsValidDate(date)) {
        date = date;
        this.year = date.getFullYear();
        this.month = date.getMonth() + 1;
        this.day = date.getDate();
        this.hours = date.getHours();
        this.minutes = date.getMinutes();
        this.seconds = date.getSeconds();
        this.milliseconds = date.getMilliseconds();
        this._createdByTypeEnum = 0;
      } else {
        date = date;
        this.year = date.year;
        this.month = date.month;
        this.day = date.day;
        this.hours = date.hours;
        this.minutes = date.minutes;
        this.seconds = date.seconds;
        this.milliseconds = date.milliseconds;
        this._createdByTypeEnum = 1;
      }
    }
  }
  createdByTypeEnum() {
    return this._createdByTypeEnum;
  }
  isCreatedByDateTime() {
    return this.createdByTypeEnum() == 1;
  }
  isCreatedByDate() {
    return this.createdByTypeEnum() == 0;
  }
  isCreatedByString() {
    return this.createdByTypeEnum() == 2;
  }
  toDate() {
    return DateTime.toDate(this);
  }
  isEqualsTo(source, ignoreHours = false) {
    if (ignoreHours)
      return this.year == source.year && this.month == source.month && this.day == source.day;
    else
      return this.year == source.year && this.month == source.month && this.day == source.day && this.hours == source.hours && this.minutes == source.minutes && this.seconds == source.seconds && this.milliseconds == source.milliseconds;
  }
  static toDate(source) {
    if (source == null || Date.vrIsValidDate(source))
      return source;
    if (source.day == null)
      return null;
    return new Date(source.year, source.month - 1, source.day, source.hours, source.minutes, source.seconds, source.milliseconds);
  }
  static fromDate(source) {
    if (source == null)
      return null;
    return new DateTime(source);
  }
  static equals(first, second, ignoreHours = false) {
    if (first == null || second == null)
      return false;
    return first.isEqualsTo(second, ignoreHours);
  }
}
var DateTimeTypeEnum = /* @__PURE__ */ ((DateTimeTypeEnum2) => {
  DateTimeTypeEnum2[DateTimeTypeEnum2["Date"] = 0] = "Date";
  DateTimeTypeEnum2[DateTimeTypeEnum2["DateTime"] = 1] = "DateTime";
  DateTimeTypeEnum2[DateTimeTypeEnum2["String"] = 2] = "String";
  return DateTimeTypeEnum2;
})(DateTimeTypeEnum || {});
Date.MIN_VALUE = /* @__PURE__ */ new Date(-864e13);
Date.MAX_VALUE = /* @__PURE__ */ new Date(864e13);
Date.vrFixDateString = function(dateString) {
  if (dateString != null && !(Object.prototype.toString.call(dateString) === "[object Date]")) {
    let tempDateString = dateString.toString();
    let dateSplitted = tempDateString.split(/[^0-9]/).vrToNumberArrayList();
    let date = new Date(dateSplitted[0], dateSplitted[1] - 1, dateSplitted[2], dateSplitted[3], dateSplitted[4], dateSplitted[5]);
    dateString = new Date(date.toString());
  }
  return dateString;
};
Date.vrEquals = function(firstDate, secondDate) {
  return firstDate.getTime() === secondDate.getTime();
};
Date.vrGetFirstDayOfMonthByDate = function(dateToCheck) {
  let date = new Date(dateToCheck);
  return new Date(date.getFullYear(), date.getMonth(), 1);
};
Date.vrGetLastDayOfMonthByDate = function(dateToCheck) {
  let date = new Date(dateToCheck);
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};
Date.vrGetFirstDayOfWeekByDate = function(dateToCheck) {
  let date = new Date(dateToCheck);
  let day = date.getDay(), diff = date.getDate() - day + (day == 0 ? -6 : 1);
  return new Date(date.setDate(diff));
};
Date.vrDifferenceBetweenDatesInMinutes = function(firstDate, secondDate) {
  firstDate = Date.vrFixDateString(firstDate);
  secondDate = Date.vrFixDateString(secondDate);
  let difference = firstDate.getTime() - secondDate.getTime();
  let secondsDifference = difference / 1e3;
  return Math.abs(secondsDifference / 60);
};
Date.vrIsValidDate = function(date) {
  return date != null && date instanceof Date && !isNaN(date.getTime()) && date.getTime() != new Date(0, 0, 0).getTime();
};
Date.vrGetDaysInMonth = function(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};
Date.vrToWebApiDateTime = function(date) {
  if (date != null) {
    date = Date.vrFixDateString(date);
    if (Date.vrIsValidDate(date)) {
      return {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds(),
        milliSeconds: date.getMilliseconds()
      };
    }
  }
  return null;
};
Date.prototype.vrToItalyString = function(mode, showSeconds = false) {
  let dateOptions = {};
  switch (mode) {
    case 0:
      {
        dateOptions = {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour12: false
        };
      }
      break;
    case 5:
      {
        dateOptions = {
          weekday: "long",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour12: false
        };
      }
      break;
    case 6:
      {
        dateOptions = {
          weekday: "short",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour12: false
        };
      }
      break;
    case 3:
      {
        dateOptions = {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "2-digit",
          hour12: false
        };
      }
      break;
    case 1:
      {
        dateOptions = {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false
        };
        if (showSeconds)
          dateOptions.second = "2-digit";
      }
      break;
    case 4:
      {
        dateOptions = {
          weekday: "long",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false
        };
        if (showSeconds)
          dateOptions.second = "2-digit";
      }
      break;
    case 2:
      {
        dateOptions = {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false
        };
        if (showSeconds)
          dateOptions.second = "2-digit";
      }
      break;
  }
  return this.vrFormatString(dateOptions, "it");
};
Date.prototype.vrFormatString = function(options, language) {
  if (options != null && options.timeZone == null)
    options.timeZone = "Europe/Rome";
  let dateFormatter = new Intl.DateTimeFormat(language == null ? navigator.language : language, options);
  let dateString = dateFormatter.format(this).vrCapitalize();
  return dateString;
};
Date.prototype.vrToLongDateString = function() {
  let dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour12: false
  };
  let dateFormatter = new Intl.DateTimeFormat(
    /*navigator.language*/
    "it",
    dateOptions
  );
  return dateFormatter.format(this).vrCapitalize();
};
Date.vrArePeriodsOverlapped = function(startA, endA, startB, endB, equal = false) {
  return !equal ? startA.getTime() < endB.getTime() && endA.getTime() > startB.getTime() : startA.getTime() <= endB.getTime() && endA.getTime() >= startB.getTime();
};
Date.prototype.vrAddYears = function(years) {
  let date = new Date(this.valueOf());
  date.setFullYear(date.getFullYear() + years);
  return date;
};
Date.prototype.vrAddMonths = function(months) {
  let february = new Date(this.getFullYear(), 1, 1);
  let februaryDays = Date.vrGetDaysInMonth(february);
  let date = new Date(this.valueOf());
  let newMonth = date.getMonth() + months;
  if (newMonth == 1 && date.getDate() > februaryDays)
    date.setDate(februaryDays);
  date.setMonth(newMonth);
  return date;
};
Date.prototype.vrAddDays = function(days) {
  let date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};
Date.prototype.vrAddHours = function(hours) {
  this.setTime(this.getTime() + hours * 60 * 60 * 1e3);
  return this;
};
Date.prototype.vrAddMinutes = function(minutes) {
  this.setTime(this.getTime() + minutes * 60 * 1e3);
  return this;
};
Date.prototype.vrAddSeconds = function(seconds) {
  this.setTime(this.getTime() + seconds * 1e3);
  return this;
};
Date.prototype.vrIsLessThan = function(date, equals = false, checkTime = true) {
  if (!checkTime) {
    this.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
  }
  if (equals)
    return this.getTime() <= date.getTime();
  else
    return this.getTime() < date.getTime();
};
Date.prototype.vrIsGreaterThan = function(date, equals = false, checkTime = true) {
  if (!checkTime) {
    this.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
  }
  if (equals)
    return this.getTime() >= date.getTime();
  else
    return this.getTime() > date.getTime();
};
Date.prototype.vrIsEqualsTo = function(date, checkTime = true) {
  if (!checkTime) {
    this.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
  }
  return this.getTime() == date.getTime();
};
Date.prototype.vrIsBetween = function(firstDate, secondDate) {
  let millisecondsFirstDate = firstDate.getTime();
  let millisecondsSecondDate = secondDate.getTime();
  let millisecondsDateToCheck = this.getTime();
  if (millisecondsDateToCheck >= millisecondsFirstDate && millisecondsDateToCheck <= millisecondsSecondDate)
    return true;
  return false;
};
Date.vrDifferenceBetweenDatesInDays = function(firstDate, secondDate) {
  let first = this.vrFixDateString(firstDate);
  let second = this.vrFixDateString(secondDate);
  let difference = first.getTime() - second.getTime();
  let secondsDifference = difference / 1e3;
  return Math.abs(secondsDifference / 60 / 60 / 24);
};
Date.vrConvertDateFromClient = function(dateFromClient) {
  if (dateFromClient != null) {
    dateFromClient = Date.vrFixDateString(dateFromClient);
    let dateConverted = new Date(Date.UTC(dateFromClient.getFullYear(), dateFromClient.getMonth(), dateFromClient.getDate(), dateFromClient.getHours(), dateFromClient.getMinutes(), dateFromClient.getSeconds()));
    return dateConverted;
  } else
    return dateFromClient;
};
Date.vrConvertDateFromServer = function(dateFromServer) {
  if (dateFromServer != null) {
    dateFromServer = Date.vrFixDateString(dateFromServer);
    let dateConverted = new Date(dateFromServer.getUTCFullYear(), dateFromServer.getUTCMonth(), dateFromServer.getUTCDate(), dateFromServer.getUTCHours(), dateFromServer.getUTCMinutes(), dateFromServer.getUTCSeconds());
    return dateConverted;
  } else
    return dateFromServer;
};
Number.prototype.vrToNumberString = function(formatSettings) {
  if (formatSettings == null) formatSettings = new NumberFormatSettings();
  formatSettings.style = "decimal";
  return this.vrFormatNumber(formatSettings);
};
Number.prototype.vrToCurrencyString = function(formatSettings) {
  if (formatSettings == null) formatSettings = new NumberFormatSettings();
  formatSettings.style = "currency";
  if (formatSettings.minimumFractionDigits == null) formatSettings.minimumFractionDigits = 2;
  if (formatSettings.maximumFractionDigits == null) formatSettings.maximumFractionDigits = 2;
  return this.vrFormatNumber(formatSettings);
};
Number.prototype.vrToPercentageString = function(formatSettings) {
  if (formatSettings == null) formatSettings = new NumberFormatSettings();
  formatSettings.style = "percent";
  if (formatSettings.minimumFractionDigits == null) formatSettings.minimumFractionDigits = 2;
  if (formatSettings.maximumFractionDigits == null) formatSettings.maximumFractionDigits = 2;
  return this.vrFormatNumber(formatSettings);
};
Number.prototype.vrFormatNumber = function(format) {
  if (format == null) format = new NumberFormatSettings();
  if (format.style == null) format.style = "decimal";
  if (format.currency == null) format.currency = "EUR";
  if (format.useGrouping == null) format.useGrouping = "auto";
  if (format.roundingMode == null) format.roundingMode = "halfExpand";
  if (format.roundingMode == "none") {
    format.roundingMode = "halfExpand";
    if (format.maximumFractionDigits == null)
      format.maximumFractionDigits = 8;
  }
  const formatter = new Intl.NumberFormat("it-IT", format);
  return formatter.format(Number(this));
};
Number.prototype.vrRound = function(decimals) {
  let pow = Math.pow(10, decimals);
  return Math.round(this * pow) / pow;
};
String.prototype.vrCapitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};
String.prototype.vrCamelCase = function(exceptFirst) {
  if (exceptFirst == null) exceptFirst = false;
  let words = this.split(" ");
  for (let word of words)
    word.vrCapitalize();
  let stringToReturn = words.toString().replace(",", "");
  if (exceptFirst)
    stringToReturn = stringToReturn[0].toLowerCase() + stringToReturn.substr(1);
  return stringToReturn;
};
String.prototype.vrKebabCase = function() {
  if (this.length == 0)
    return "";
  return this.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g).map((x) => x.toLowerCase()).join("-");
};
String.prototype.vrSnakeCase = function() {
  if (this.length == 0)
    return "";
  return this.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g).map((x) => x.toLowerCase()).join("_");
};
String.prototype.vrSwapCase = function() {
  var swapped = [];
  for (let i = 0; i < this.length; i++) {
    if (this != " ") {
      if (this[i] == this[i].toUpperCase())
        swapped.push(this[i].toLowerCase());
      else
        swapped.push(this[i].toUpperCase());
    }
  }
  return swapped.join("");
};
String.prototype.vrTitleCase = function() {
  return this.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};
String.prototype.vrTrunc = function(index, useWordBoundary) {
  if (useWordBoundary == null) useWordBoundary = true;
  if (this.length <= index) {
    return this.valueOf();
  }
  var subString = this.substr(0, index - 1);
  return (useWordBoundary ? subString.substr(0, subString.lastIndexOf(" ")) : subString) + "&hellip;";
};
String.prototype.vrGetNumericPart = function() {
  let number = 0;
  if (this.length > 0)
    number = Number(this.match(/[\d\.\-]+/));
  return number;
};
String.prototype.getNumericPart = String.prototype.vrGetNumericPart;
String.prototype.vrToBoolean = function() {
  return this.toLowerCase() === "true";
};
String.prototype.vrIsNotNullOrEmpty = function() {
  return this != null && this != "";
};
String.prototype.vrIsNullOrEmpty = function() {
  return this == null || this == "";
};
String.prototype.vrRemoveHtml = function() {
  return this.replace(/<\/?[^>]+(>|$)/g, "");
};
String.prototype.vrIndexOfAll = function(value) {
  let indices = [];
  for (let i = 0; i < this.length; i++)
    if (this[i] === value) indices.push(i);
  return indices;
};
String.prototype.vrReplaceAt = function(index, replacement) {
  return this.substring(0, index) + replacement + this.substring(index + replacement.length);
};
Array.prototype.vrFirst = function() {
  if (Array.isArray(this))
    return this[0];
  return null;
};
Array.prototype.vrLast = function() {
  if (Array.isArray(this))
    return this[this.length - 1];
  return null;
};
Array.prototype.vrToNumberArrayList = function() {
  if (Array.isArray(this))
    return this.map((value) => {
      return Number(value);
    });
  return [];
};
Array.prototype.vrToStringArrayList = function() {
  if (Array.isArray(this))
    return this.map((value) => {
      return String(value);
    });
  return [];
};
Array.prototype.vrToCommaSeparatedList = function(addSpaceAfterComma = true) {
  if (Array.isArray(this)) {
    let result = "";
    for (let item of this)
      result += item.toString() + (addSpaceAfterComma ? ", " : ",");
    return result.substring(0, result.length - (addSpaceAfterComma ? 2 : 1));
  } else
    return "";
};
Array.prototype.vrPushRange = function(arrayToAdd) {
  if (Array.isArray(this)) {
    for (let element of arrayToAdd)
      this.push(element);
  }
};
Array.prototype.vrDelete = function(value) {
  if (Array.isArray(this)) {
    let i = -1;
    while ((i = this.indexOf(value)) != -1)
      this.splice(i, 1);
  }
};
Array.prototype.vrDeleteItem = function(item, key) {
  if (Array.isArray(this)) {
    let index = this.map((k2) => k2[key]).indexOf(item[key]);
    if (index != -1)
      this.splice(index, 1);
  }
};
Array.prototype.vrDeleteAllBy = function(callbackfn2) {
  if (Array.isArray(this)) {
    let itemToDeleteList = this.filter(callbackfn2);
    for (let itemToDelete of itemToDeleteList) {
      if (itemToDelete != null)
        this.vrDelete(itemToDelete);
    }
  }
};
function dynamicSort(property2) {
  var sortOrder = 1;
  if (property2[0] === "-") {
    sortOrder = -1;
    property2 = property2.substr(1);
  }
  return function(a, b) {
    let aProperty = a[property2];
    let bProperty = b[property2];
    if (typeof aProperty == "string")
      aProperty = aProperty.toLowerCase();
    if (typeof bProperty == "string")
      bProperty = bProperty.toLowerCase();
    var result = aProperty < bProperty ? -1 : aProperty > bProperty ? 1 : 0;
    if (typeof aProperty == "string" && aProperty == "" || typeof bProperty == "string" && bProperty == "")
      result = aProperty == "" ? 1 : -1;
    if (aProperty == null || bProperty == null)
      result = sortOrder == 1 ? aProperty == null ? 1 : -1 : aProperty == null ? -1 : 1;
    return result * sortOrder;
  };
}
function dynamicSortMultiple() {
  var props = arguments;
  return function(obj1, obj2) {
    var i = 0, result = 0, numberOfProperties = props.length;
    while (result === 0 && i < numberOfProperties) {
      result = dynamicSort(props[i])(obj1, obj2);
      i++;
    }
    return result;
  };
}
Array.prototype.vrSortBy = function(properties, ascending) {
  if (Array.isArray(this)) {
    if (properties != null && properties.length > 0) {
      if (ascending != null && !ascending)
        properties = properties.map((k2) => {
          return !k2.startsWith("-") ? "-" + k2 : k2;
        });
      this.sort(dynamicSortMultiple.apply(null, properties));
    } else
      internalSortWithoutProperties(this, ascending == null ? true : ascending);
  }
  return this;
};
Array.prototype.vrSortAsc = function(...properties) {
  return this.vrSortBy(properties, true);
};
Array.prototype.vrSortDesc = function(...properties) {
  return this.vrSortBy(properties, false);
};
function internalSortWithoutProperties(array, ascending) {
  array.sort((a, b) => {
    if (ascending) {
      if (typeof a == "number") {
        const diff = a - b;
        if (diff)
          return diff;
      } else if (typeof a == "string") {
        let tryDate = new Date(a);
        if (!isNaN(tryDate.getTime()))
          return new Date(a).getTime() - new Date(b).getTime();
        else
          return a.localeCompare(b);
      } else if (Object.prototype.toString.call(a) === "[object Date]")
        return new Date(a).getTime() - new Date(b).getTime();
      return 0;
    } else {
      if (typeof b == "number") {
        const diff = b - a;
        if (diff)
          return diff;
      } else if (typeof b == "string") {
        let tryDate = new Date(b);
        if (!isNaN(tryDate.getTime()))
          return new Date(b).getTime() - new Date(a).getTime();
        else
          return b.localeCompare(a);
      } else if (Object.prototype.toString.call(b) === "[object Date]")
        return new Date(b).getTime() - new Date(a).getTime();
      return 0;
    }
  });
}
Array.prototype.vrAll = function(callbackfn2) {
  if (Array.isArray(this))
    return this.every(callbackfn2);
  return false;
};
Array.prototype.vrAny = function(callbackfn2) {
  if (Array.isArray(this))
    return this.some(callbackfn2);
  return false;
};
Array.prototype.vrMax = function(callbackfn2) {
  if (Array.isArray(this)) {
    if (callbackfn2 != null) {
      let property2 = callbackfn2.toString().split(".")[1];
      return this.reduce((oa, u) => Math.max(oa, u[property2]), 0);
    } else
      return Math.max.apply(null, this);
  }
  return 0;
};
Array.prototype.vrMin = function(callbackfn2) {
  if (Array.isArray(this)) {
    if (callbackfn2 != null) {
      let property2 = callbackfn2.toString().split(".")[1];
      return this.reduce((oa, u) => Math.min(oa, u[property2]), Number.MAX_VALUE);
    } else
      return Math.min.apply(null, this);
  }
  return 0;
};
Array.prototype.vrSum = function(callbackfn) {
  if (Array.isArray(this)) {
    if (callbackfn == null)
      return this.reduce((ty, u) => (ty == null ? 0 : ty) + (u == null ? 0 : u), 0);
    else {
      let property = callbackfn.toString().split("=>")[1];
      let sum = 0;
      this.forEach((k) => sum += eval(property));
      return sum;
    }
  }
  return 0;
};
Array.prototype.vrAvg = function(callbackfn2) {
  if (Array.isArray(this)) {
    if (callbackfn2 == null)
      return this.vrSum() / this.length;
    else {
      let sum2 = this.vrSum(callbackfn2);
      return sum2 / this.length;
    }
  }
  return 0;
};
Array.prototype.vrDistinct = function() {
  if (Array.isArray(this))
    return [...new Set(this)];
  return [];
};
Array.prototype.vrDistinctBy = function(callbackfn2) {
  if (Array.isArray(this)) {
    let arrayResult = [];
    let arrayMap = /* @__PURE__ */ new Map();
    let property2 = callbackfn2.toString().split(".")[1];
    for (let item of this) {
      let value;
      for (let key in item) {
        if (key == property2)
          value = item[key];
      }
      if (!arrayMap.has(value)) {
        arrayMap.set(value, true);
        arrayResult.push(item);
      }
    }
    return arrayResult;
  }
  return [];
};
Array.prototype.vrGroupBy = function(callbackfn2) {
  if (Array.isArray(this)) {
    let property2 = callbackfn2.toString().split(".")[1];
    if (!callbackfn2.toString().includes("."))
      property2 = callbackfn2.toString().split("[")[1].replace("]", "");
    return this.reduce(function(groups, item) {
      const val = item[property2];
      groups[val] = groups[val] || [];
      groups[val].push(item);
      return groups;
    }, {});
  }
  return [];
};
Array.prototype.vrGroupByProperty = function(property2) {
  if (Array.isArray(this)) {
    return this.reduce(function(groups, item) {
      const val = item[property2];
      groups[val] = groups[val] || [];
      groups[val].push(item);
      return groups;
    }, {});
  }
  return [];
};
Array.vrEquals = function(array1, array2) {
  if (Array.isArray(array1) && Array.isArray(array2)) {
    let array1Length = array1.length;
    if (array1 == null || array2 == null) return false;
    if (array1Length != array2.length) return false;
    let arr1 = array1.concat().sort();
    let arr2 = array2.concat().sort();
    for (let i = 0; i < arr1.length; ++i) {
      if (arr1[i] !== arr2[i])
        return false;
    }
    return true;
  }
  return false;
};
jQuery.prototype.vrDrag = function(element, onStart, onEnd) {
  this.mousedown((emd) => {
    let startingXPosition = emd.clientX;
    let startingYPosition = emd.clientY;
    let diffX = emd.clientX - puma(this[0]).offset().left;
    let diffY = emd.clientY - puma(this[0]).offset().top;
    if (diffX <= 5 && diffY <= 5)
      return;
    puma(document).mousemove((emm) => {
      if (!(emm.clientX == startingXPosition && emm.clientY == startingYPosition)) {
        let elementToDrag = this;
        if (element != null)
          elementToDrag = puma(element);
        if (onStart != null) {
          let onStartEvent = new WindowEvent();
          onStartEvent.event = emm;
          onStartEvent.left = emm.clientX - diffX;
          onStartEvent.top = emm.clientY;
          onStart(onStartEvent);
          if (onStartEvent.isDefaultPrevented()) {
            puma(document).unbind("mouseup");
            puma(document).unbind("mousemove");
            emm.preventDefault();
            return;
          }
        }
        elementToDrag.offset({ top: emm.clientY, left: emm.clientX - diffX });
      }
    });
    puma(document).mouseup((emm) => {
      puma(document).unbind("mouseup");
      puma(document).unbind("mousemove");
      if (onEnd != null) {
        let onEndEvent = {};
        onEndEvent.event = emm;
        onEndEvent.left = emm.clientX - puma(this[0]).width() / 2;
        onEndEvent.top = emm.clientY;
        onEnd(onEndEvent);
      }
    });
  });
};
jQuery.prototype.vrVisible = function(state) {
  if (state != null) {
    if (state) this.show();
    else this.hide();
  }
  return this.is(":visible");
};
var _shadowRoot2 = null;
var _jqueryVariable = jQuery;
jQuery.prototype.vrAppendToPuma = function(element) {
  let container = puma(element);
  return this.appendTo(container);
};
jQuery.prototype.vrPrependToPuma = function(element) {
  let container = puma(element);
  return this.prependTo(container);
};
jQuery.prototype.vrAppendPuma = function(element) {
  let toCreate = puma(element);
  return this.append(toCreate);
};
jQuery.prototype.vrPrependPuma = function(element) {
  let toCreate = puma(element);
  return this.prepend(toCreate);
};
jQuery.prototype.vrBeforePuma = function(element) {
  let elementJq = puma(element);
  return this.before(elementJq);
};
jQuery.prototype.vrAfterPuma = function(element) {
  let elementJq = puma(element);
  return this.after(elementJq);
};
jQuery.prototype.vrInsertBeforePuma = function(element) {
  let elementJq = puma(element);
  return this.insertBefore(elementJq);
};
jQuery.prototype.vrInsertAfterPuma = function(element) {
  let elementJq = puma(element);
  return this.insertAfter(elementJq);
};
jQuery.prototype.vrHasScrollBar = function(horizontal = false) {
  if (this.get(0) == null)
    return false;
  if (!horizontal)
    return this.get(0).scrollHeight > this.get(0).clientHeight;
  else
    return this.get(0).scrollWidth > this.get(0).clientWidth;
};
function puma(element) {
  return shadowRoot() != null && jqueryVariable()(element).length == 0 ? jqueryVariable()(shadowRoot()).find(element) : jqueryVariable()(element);
}
if (typeof window !== "undefined") {
  window.createReactButton = createReactButton;
}
export {
  AnimationHideEnum,
  AnimationShowEnum,
  AutoCompleteBoxComboSettings,
  AutoCompleteBoxItem,
  AutoCompleteBoxItemSettings,
  BadgeClickEvent,
  BadgeSettings,
  BorderStyleEnum,
  BrowserTypeEnum,
  BrowserWindowPosition,
  BrowserWindowSize,
  ButtonGroupItem,
  ButtonModeEnum,
  ChartAreaSettings,
  ChartAspectRatioSettings,
  ChartAxisFormatterEvent,
  ChartDataLabelAlignEnum,
  ChartDataLabelsAnchorEnum,
  ChartDataLabelsSettings,
  ChartDataLabelsTextAlignEnum,
  ChartDataSource,
  ChartFont,
  ChartLabelClickEvent,
  ChartLabelEvent,
  ChartLabelHoverEvent,
  ChartLabelLeaveEvent,
  ChartLegendAlignEnum,
  ChartLegendClickEvent,
  ChartLegendEvent,
  ChartLegendHoverEvent,
  ChartLegendLabelsAlignEnum,
  ChartLegendLabelsSettings,
  ChartLegendLeaveEvent,
  ChartLegendPositionEnum,
  ChartLegendSettings,
  ChartLegendTitleSettings,
  ChartLimitSettings,
  ChartOptions,
  ChartParsingSettings,
  ChartStackedSettings,
  ChartTitleAlignEnum,
  ChartTitlePositionEnum,
  ChartTitleSettings,
  ChartTooltipAlignEnum,
  ChartTooltipPositionEnum,
  ChartTooltipSettings,
  ChartTooltipYAlignEnum,
  ChartTypeEnum,
  CheckBoxItem,
  CheckboxStateEnum,
  Color,
  ColorPickerModeEnum,
  ColorPickerRgbaValue,
  ColorSettings,
  ComboBoxChangeEvent,
  ComboBoxChangingEvent,
  ComboBoxClearEvent,
  ComboBoxEvent,
  ComboBoxItem,
  ComboBoxTemplateEvent,
  ComboBoxTreeModeEnum,
  ComboBoxTypeEnum,
  ComboBoxWebServiceSettings,
  ControlPositionEnum,
  ControlTypeEnum,
  CreatorEnum,
  DateDepthEnum,
  DateFormatEnum,
  DateModeEnum,
  DateTime,
  DateTimeTypeEnum,
  DayOfWeekEnum,
  DefaultDayEnum,
  DivBorderSettings,
  DivBorderSpecificSettings,
  DivColorSettings,
  EditorCustomMenuItemType,
  EditorSpeechRecognizerModeEnum,
  EditorSpeechRecognizerPositionEnum,
  ErrorHideModeEnum,
  ErrorModeEnum,
  ErrorPositionEnum,
  GridAfterExcelExportEvent,
  GridAfterGroupCheckEvent,
  GridAggregateMode,
  GridAlignEnum,
  GridBeforeExcelExportEvent,
  GridBeforeGroupCheckEvent,
  GridButtonSettings,
  GridCartSettings,
  GridCartSettingsClickEvent,
  GridCheckboxModeEnum,
  GridColumn,
  GridColumnTypeEnum,
  GridDateFilterTypeEnum,
  GridGroupByItem,
  GridGroupBySettings,
  GridGroupDisplayValueEvent,
  GridGroupEditClickEvent,
  GridGroupExpandCollapseEvent,
  GridHeightModeEnum,
  GridLabelUnderlineMode,
  GridModeEnum,
  GridNumberFilterTypeEnum,
  GridPageSelectedEvent,
  GridScrollEvent,
  GridServerBindSettings,
  GridSortDirectionEnum,
  GridSortSettings,
  GridStickerClickEvent,
  GridStickerSettings,
  GridStringFilterTypeEnum,
  GridToolbarItem,
  GridToolbarItemType,
  GroupingModeEnum,
  IconClassicBrands,
  IconClassicDuotone,
  IconClassicLight,
  IconClassicRegular,
  IconClassicSolid,
  IconClassicThin,
  IconSettings,
  IconSharpDuotone,
  IconSharpLight,
  IconSharpRegular,
  IconSharpSolid,
  IconSharpThin,
  ImagePositionTypeEnum,
  ImageToolbarTypeEnum,
  KeyEnum,
  LabelModeEnum,
  LabelUnderlineMode,
  MapMarker,
  MapModeEnum,
  MenuItem,
  MenuItemUrlSettings,
  NotifierOptions,
  NotifierPositionEnum,
  NotifierTypeEnum,
  NumberFormatRoundingSettings,
  NumberFormatSettings,
  OnContentRenderedEvent,
  OrientationEnum,
  PaypalEnvironmentEnum,
  PaypalStyleColorEnum,
  PaypalStyleLabelEnum,
  PaypalStyleLayoutEnum,
  PaypalStyleShapeEnum,
  PaypalStyleSizeEnum,
  PdfViewerToolbarAreaEnum,
  PdfViewerToolbarItem,
  PdfViewerToolbarSettings,
  PopupDirectionEnum,
  PopupSettings,
  PositionEnum,
  RatingPrecisionEnum,
  RoundingModeEnum,
  SaturationDate,
  SaturationResource,
  SchedulerAttribute,
  SchedulerData,
  SchedulerNavigateActionEnum,
  SchedulerResource,
  SchedulerSaturationDay,
  SchedulerSaturationFourWeeks,
  SchedulerSaturationInfo,
  SchedulerSaturationWeek,
  SchedulerSaturationWeekByDate,
  SchedulerSaturationWeekByResource,
  SchedulerSlotElement,
  SchedulerView,
  SchedulerViewEnum,
  SelectionModeEnum,
  SortByComboSettings,
  SortDirectionEnum,
  SpeechRecognizerOptions,
  SplitterCollapsableSettings,
  SplitterCollapseDirectionEnum,
  SplitterDirectionEnum,
  SwitchLabelSettings,
  SwitchLabelSettingsOnClickEvent,
  TabStripItem,
  TextAlignEnum,
  TextBoxAutoCompleteEnum,
  TextBoxLengthSettings,
  TextBoxRegexSettings,
  TextBoxValidationErrorEnum,
  TextBoxValidationSettings,
  TextModeEnum,
  TextTransformModeEnum,
  TinyMceIconEnum,
  ToolbarItemOnClickEvent,
  TooltipHideOnEnum,
  TooltipPositionEnum,
  TooltipShowOnEnum,
  TooltipTypeEnum,
  TreeModeEnum,
  TreeViewAlignEnum,
  TreeViewColumn,
  TreeViewColumnTypeEnum,
  TreeViewContextMenuItem,
  TreeViewFilterSettings,
  TreeViewItem,
  TreeViewItemExtraCell,
  TreeViewNumericTypeEnum,
  TreeViewToolbarClickEvent,
  TreeViewToolbarItem,
  TreeViewToolbarItemType,
  TreeViewToolbarSwitchEvent,
  TreeViewToolbarSwitchSettings,
  UpdateRowRebindSettings,
  UploadValidationErrorTypeEnum,
  VrMarginSettings,
  WebApiModeEnum,
  WindowAutoSizeDirectionEnum,
  WindowFooterItemAlignEnum,
  WindowFooterItemTypeEnum,
  addControl,
  addCss,
  addCssFiles,
  addCssStyle,
  addJsFiles,
  addJsScript,
  alert,
  base64ToBlob,
  base64ToBytes,
  base64ToFile,
  br,
  browser,
  bytesToBase64,
  confirm,
  copyTextToClipboard,
  createAreaChart,
  createAutoCompleteBox,
  createBarChart,
  createButton,
  createButtonGroup,
  createCalendar,
  createChart,
  createCheckBox,
  createCheckBoxList,
  createColorPicker,
  createComboBox,
  createCurrencyTextBox,
  createDatePicker,
  createDateTimePicker,
  createDiv,
  createDonutChart,
  createDropDown,
  createEditor,
  createGrid,
  createGroupBox,
  createHorizontalBarChart,
  createIcon,
  createImage,
  createLabel,
  createLegend,
  createLineChart,
  createMap,
  createMenu,
  createMonthPicker,
  createMultiScheduler,
  createMultilineTextBox,
  createNumericTextBox,
  createPainter,
  createPasswordTextBox,
  createPaypalButton,
  createPdfViewer,
  createPercentageTextBox,
  createPieChart,
  createQrCode,
  createRadioButton,
  createRadioButtonList,
  createRating,
  createReactButton,
  createRepeater,
  createScheduler,
  createSearchBar,
  createSeparator,
  createSpeechRecognizer,
  createSplitButton,
  createSplitter,
  createStackedBarChart,
  createSwitch,
  createTabStrip,
  createTextBox,
  createTimePicker,
  createTooltip,
  createTreeView,
  createUpload,
  createWindow,
  createYearPicker,
  dialog,
  div,
  filesToBase64,
  getControl,
  guid,
  hideLoader,
  hideNotify,
  hr,
  icon,
  iframe,
  interval,
  isChrome,
  isDesktop,
  isEdge,
  isEquals,
  isFirefox,
  isInternetExplorer,
  isIphone,
  isIphoneX,
  isLocalhost,
  isMobile,
  isOpera,
  isSafari,
  isSeamonkey,
  isSmartphone,
  isTablet,
  isValidEmail,
  isVivaldi,
  jqueryVariable,
  notify,
  notifyError,
  notifyInfo,
  notifySuccess,
  notifyWarning,
  openBrowserWindow,
  openUrl,
  pageError,
  printBytes,
  printElement,
  printHtml,
  printImage,
  printPdf,
  prompt,
  puma,
  pumo,
  shadowRoot,
  showLoader,
  span,
  vrEditorCustomItem,
  vrEditorCustomMenuItem,
  vrEditorFontSizeSettings,
  vrEditorItemEnum,
  vrEditorSpeechRecognizerSettings,
  vrEditorToolbarModeEnum
};
//# sourceMappingURL=vr.js.map
