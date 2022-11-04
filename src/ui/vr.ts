//#region Import
import { LabelOptions, Label } from "./controls/label";
import { UtilityManager } from "../managers/utilityManager";
import { DeviceManager } from "../managers/deviceManager";
import { TextBoxOptions, TextBox, TextBoxNumeric, TextBoxPercentage, TextBoxCurrency, TextBoxPassword, TextBoxMultiline } from "./controls/textbox";
import { CheckBoxOptions, CheckBox } from "./controls/checkbox";
import { SeparatorOptions, Separator } from "./controls/separator";
import { ButtonGroup, ButtonGroupClickEvent, ButtonGroupIconClickEvent, ButtonGroupOptions } from "./controls/buttonGroup";
import { ImageOptions, Image } from "./controls/image";
import { DatePickerOptions, DatePicker, TimePicker, DateTimePicker, MonthPicker, YearPicker } from "./controls/datePicker";
import { ComboBoxOptions, ComboBox, DropDown } from "./controls/comboBox";
import { SplitButtonOptions, SplitButton, SplitButtonItem } from "./controls/splitButton";
import { Editor, EditorItemClickEvent, EditorOptions } from "./controls/editor";
import { WindowOptions, Window, WindowEvent } from "./controls/window";
import { ConfirmOptions, Confirm } from "./controls/confirm";
import { AlertOptions, Alert } from "./controls/alert";
import { Dialog, DialogOptions } from "./controls/dialog";
import { Grid, GridOptions, GridHeaderSettings, GridCellSettings, GridCustomSettings, GridIconSettings, GridImageSettings, GridLabelSettings, GridTemplateEvent, GridToolbarDeleteRequest, GridToolbarSwitchSettings, GridToolbarClickEvent, GridControlsSettings, GridExcelRow } from "./controls/grid";
import { PromptOptions, Prompt } from "./controls/prompt";
import { ControlManager } from "../managers/controlManager";
import { SwitchOptions, Switch } from "./controls/switch";
import { CheckBoxListOptions, CheckBoxList } from "./controls/checkboxList";
import { RadioButton, RadioButtonOptions } from "./controls/radioButton";
import { RadioButtonList, RadioButtonListOptions } from "./controls/radioButtonList";
import { RepeaterOptions, Repeater } from "./controls/repeater";
import { MapsOptions, Maps } from "./controls/maps";
import { AttributeSettings, VrControl, VrControlOptions, VrControlsEvent } from "./common";
import { PainterOptions, Painter } from "./controls/painter";
import { Calendar, CalendarOptions } from "./controls/calendar";
import { RatingOptions, Rating } from "./controls/rating";
import { LoaderManager } from "../../src/managers/loaderManager";
import { GroupBox, GroupBoxOptions } from "./controls/groupBox";
import { PdfViewer, PdfViewerOptions } from "./controls/pdfViewer";
import { Notifier, NotifierCustomHtmlEvent, NotifierHideSettings, NotifierOnClickEvent, NotifierShowSettings } from "./controls/notifier";
import { Upload, UploadOptions } from "./controls/upload";
import { PaypalButton, PaypalButtonOptions } from "./controls/paypalButton";
import { TreeView, TreeViewCellSettings, TreeViewContextMenuClickEvent, TreeViewHeaderSettings, TreeViewOptions } from "./controls/treeView";
import { Scheduler, SchedulerOptions } from "./controls/scheduler";
import { QrCode, QrCodeOptions } from "./controls/qrCode";
import { MultiScheduler, MultiSchedulerOptions } from "./controls/multiScheduler";
import { Icon, IconOptions } from "./controls/icon";
import { ColorPicker, ColorPickerOptions } from "./controls/colorPicker";
import { SearchBar, SearchBarOptions } from "./controls/searchBar";
import { Splitter, SplitterOptions } from "./controls/splitter";
import { AutoCompleteBox, AutoCompleteBoxOptions } from "./controls/autoCompleteBox";
import { AreaChart, BarChart, ChartVr, DonutChart, HorizontalBarChart, LineChart, PieChart, StackedBarChart } from "./controls/chart";
import { PrintFileOptions, PrintHtmlOptions, PrintManager } from "../../src/managers/printManager";
import { TabStrip, TabStripOptions } from "./controls/tabStrip";
import { Tooltip, TooltipOptions } from "./controls/tooltip";
import { SpeechRecognizer, SpeechRecognizerAudioEndEvent, SpeechRecognizerAudioStartEvent, SpeechRecognizerClickEvent, SpeechRecognizerEndEvent, SpeechRecognizerErrorEvent, SpeechRecognizerNoMatchEvent, SpeechRecognizerResultEvent, SpeechRecognizerSoundEndEvent, SpeechRecognizerSoundStartEvent, SpeechRecognizerSpeechEndEvent, SpeechRecognizerSpeechStartEvent, SpeechRecognizerStartEvent } from "./controls/speechRecognizer";
import { Div, DivOptions } from "./controls/div";
import { Button, ButtonBadgeSettings, ButtonOptions } from "./controls/button";
import { Legend, LegendOptions } from "./controls/legend";
//#endregion

//#region Factory
export function createLabel(options?: LabelOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, elementId?: string | null): Label
{
	let control = createControls<Label>(ControlTypeEnum.Label, container, position, elementId, options);
	return control;
}

export function createButton(options?: ButtonOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, elementId?: string | null): Button
{
	let control = createControls<Button>(ControlTypeEnum.Button, container, position, elementId, options);
	return control;
}

export function createButtonGroup(options?: ButtonGroupOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, elementId?: string | null): ButtonGroup
{
	let control = createControls<ButtonGroup>(ControlTypeEnum.ButtonGroup, container, position, elementId, options);
	return control;
}

export function createTextBox(options?: TextBoxOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, elementId?: string | null): TextBox
{
	let control = createControls<TextBox>(ControlTypeEnum.TextBox, container, position, elementId, options);
	return control;
}

export function createNumericTextBox(options?: TextBoxOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, elementId?: string | null): TextBoxNumeric
{
	if (options == null) options = new TextBoxOptions();
	options.mode = TextModeEnum.Numeric;
	return createTextBox(options, container, position, elementId);
}

export function createPercentageTextBox(options?: TextBoxOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, elementId?: string | null): TextBoxPercentage
{
	if (options == null) options = new TextBoxOptions();
	options.mode = TextModeEnum.Percentage;
	return createTextBox(options, container, position, elementId);
}

export function createCurrencyTextBox(options?: TextBoxOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, elementId?: string | null): TextBoxCurrency
{
	if (options == null) options = new TextBoxOptions();
	options.mode = TextModeEnum.Currency;
	return createTextBox(options, container, position, elementId);
}

export function createPasswordTextBox(options?: TextBoxOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, elementId?: string | null): TextBoxPassword
{
	if (options == null) options = new TextBoxOptions();
	options.mode = TextModeEnum.Password;
	return createTextBox(options, container, position, elementId);
}

export function createMultilineTextBox(options?: TextBoxOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, elementId?: string | null): TextBoxMultiline
{
	if (options == null) options = new TextBoxOptions();
	options.mode = TextModeEnum.MultiLine;
	return createTextBox(options, container, position, elementId);
}

export function createCheckBox(options?: CheckBoxOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, elementId?: string | null): CheckBox
{
	let control = createControls<CheckBox>(ControlTypeEnum.CheckBox, container, position, elementId, options);
	return control;
}

export function createSeparator(options?: SeparatorOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, elementId?: string | null): Separator
{
	let control = createControls<Separator>(ControlTypeEnum.Separator, container, position, elementId, options);
	return control;
}

export function createImage(options?: ImageOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, elementId?: string | null): Image
{
	let control = createControls<Image>(ControlTypeEnum.Image, container, position, elementId, options);
	return control;
}

export function createDatePicker(options?: DatePickerOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, elementId?: string | null): DatePicker
{
	let control = createControls<DatePicker>(ControlTypeEnum.DatePicker, container, position, elementId, options);
	return control;
}

export function createTimePicker(options?: DatePickerOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, elementId?: string | null): TimePicker
{
	if (options == null) options = new DatePickerOptions();
	options.mode = DateModeEnum.Time;
	return createDatePicker(options, container, position, elementId);
}

export function createDateTimePicker(options?: DatePickerOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, elementId?: string | null): DateTimePicker
{
	if (options == null) options = new DatePickerOptions();
	options.mode = DateModeEnum.DateTime;
	return createDatePicker(options, container, position, elementId);
}

export function createMonthPicker(options?: DatePickerOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, elementId?: string | null): MonthPicker
{
	if (options == null) options = new DatePickerOptions();
	options.depth = DateDepthEnum.Month;
	return createDatePicker(options, container, position, elementId);
}

export function createYearPicker(options?: DatePickerOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, elementId?: string | null): YearPicker
{
	if (options == null) options = new DatePickerOptions();
	options.depth = DateDepthEnum.Year;
	return createDatePicker(options, container, position, elementId);
}

export function createComboBox(options?: ComboBoxOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, elementId?: string | null): ComboBox
{
	let control = createControls<ComboBox>(ControlTypeEnum.ComboBox, container, position, elementId, options);
	return control;
}

export function createDropDown(options?: ComboBoxOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, elementId?: string | null): DropDown
{
	if (options == null) options = new ComboBoxOptions();
	options.mode = ComboBoxTypeEnum.DropDown;
	return createComboBox(options, container, position, elementId);
}

export function createSplitButton(options?: SplitButtonOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, elementId?: string | null): SplitButton
{
	let control = createControls<SplitButton>(ControlTypeEnum.SplitButton, container, position, elementId, options);
	return control;
}

export function createEditor(options?: EditorOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, elementId?: string | null): Editor
{
	let control = createControls<Editor>(ControlTypeEnum.Editor, container, position, elementId, options);
	return control;
}

export function createWindow(options?: WindowOptions | null, container?: HTMLElement | JQuery | string | null): Window
{
	let control = <Window>createControls(ControlTypeEnum.Window, container, null, null, options);
	return control;
}

export function createGrid(options?: GridOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, elementId?: string | null): Grid
{
	let control = createControls<Grid>(ControlTypeEnum.Grid, container, position, elementId, options);
	return control;
}

export function createSwitch(options?: SwitchOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, elementId?: string | null): Switch
{
	let control = createControls<Switch>(ControlTypeEnum.Switch, container, position, elementId, options);
	return control;
}

export function createCheckBoxList(options?: CheckBoxListOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, elementId?: string | null): CheckBoxList
{
	let control = createControls<CheckBoxList>(ControlTypeEnum.CheckBoxList, container, position, elementId, options);
	return control;
}

export function createRadioButton(options?: RadioButtonOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, elementId?: string | null): RadioButton
{
	let control = createControls<RadioButton>(ControlTypeEnum.RadioButton, container, position, elementId, options);
	return control;
}
export function createRadioButtonList(options?: RadioButtonListOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, elementId?: string | null): RadioButtonList
{
	let control = createControls<RadioButtonList>(ControlTypeEnum.RadioButtonList, container, position, elementId, options);
	return control;
}

export function createRepeater(options?: RepeaterOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, elementId?: string | null): Repeater
{
	let control = createControls<Repeater>(ControlTypeEnum.Repeater, container, position, elementId, options);
	return control;
}

export function createMap(options?: MapsOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, elementId?: string | null): Maps
{
	let control = createControls<Maps>(ControlTypeEnum.Map, container, position, elementId, options);
	return control;
}

export function createPainter(options?: PainterOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, elementId?: string | null): Painter
{
	let control = createControls<Painter>(ControlTypeEnum.Painter, container, position, elementId, options);
	return control;
}

export function createCalendar(options?: CalendarOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, elementId?: string | null): Calendar
{
	let control = createControls<Calendar>(ControlTypeEnum.Calendar, container, position, elementId, options);
	return control;
}

export function createRating(options?: RatingOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, elementId?: string | null): Rating
{
	let control = createControls<Rating>(ControlTypeEnum.Rating, container, position, elementId, options);
	return control;
}

export function createGroupBox(options?: GroupBoxOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, elementId?: string | null): GroupBox
{
	let control = createControls<GroupBox>(ControlTypeEnum.GroupBox, container, position, elementId, options);
	return control;
}

export function createPdfViewer(options?: PdfViewerOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, elementId?: string | null): PdfViewer
{
	let control = createControls<PdfViewer>(ControlTypeEnum.PdfViewer, container, position, elementId, options);
	return control;
}

export function createPaypalButton(options?: PaypalButtonOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, elementId?: string | null): PaypalButton
{
	let control = createControls<PaypalButton>(ControlTypeEnum.PaypalButton, container, position, elementId, options);;
	return control;
}

export function createUpload(options?: UploadOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, elementId?: string | null): Upload
{
	let control = createControls<Upload>(ControlTypeEnum.Upload, container, position, elementId, options);
	return control;
}

export function createTreeView(options?: TreeViewOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, elementId?: string | null): TreeView
{
	let control = createControls<TreeView>(ControlTypeEnum.TreeView, container, position, elementId, options);
	return control;
}

export function createScheduler(options?: SchedulerOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, elementId?: string | null): Scheduler
{
	let control = createControls<Scheduler>(ControlTypeEnum.Scheduler, container, position, elementId, options);
	return control;
}

export function createMultiScheduler(options?: MultiSchedulerOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, elementId?: string | null): MultiScheduler
{
	let control = createControls<MultiScheduler>(ControlTypeEnum.MultiScheduler, container, position, elementId, options);
	return control;
}

export function createQrCode(options?: QrCodeOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, elementId?: string | null): QrCode
{
	let control = createControls<QrCode>(ControlTypeEnum.QrCode, container, position, elementId, options);
	return control;
}

export function createIcon(options?: IconOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, elementId?: string | null): Icon
{
	let control = createControls<Icon>(ControlTypeEnum.Icon, container, position, elementId, options);
	return control;
}

export function createColorPicker(options?: ColorPickerOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, elementId?: string | null): ColorPicker
{
	let control = createControls<ColorPicker>(ControlTypeEnum.ColorPicker, container, position, elementId, options);
	return control;
}

export function createSearchBar(options?: SearchBarOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, elementId?: string | null): SearchBar
{
	let control = createControls<SearchBar>(ControlTypeEnum.SearchBar, container, position, elementId, options);
	return control;
}

export function createSplitter(options?: SplitterOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, elementId?: string | null): Splitter
{
	let control = createControls<Splitter>(ControlTypeEnum.Splitter, container, position, elementId, options);
	return control;
}

export function createAutoCompleteBox(options?: AutoCompleteBoxOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, elementId?: string | null): AutoCompleteBox
{
	let control = createControls<AutoCompleteBox>(ControlTypeEnum.AutoCompleteBox, container, position, elementId, options);
	return control;
}

export function createChart(options?: ChartOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, elementId?: string | null): ChartVr
{
	let control = createControls<ChartVr>(ControlTypeEnum.Chart, container, position, elementId, options);
	return control;
}

export function createBarChart(options?: ChartOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, elementId?: string | null): BarChart
{
	if (options == null) options = new ChartOptions();
	options.type = ChartTypeEnum.Bar;
	return createChart(options, container, position, elementId);
}

export function createHorizontalBarChart(options?: ChartOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, elementId?: string | null): HorizontalBarChart
{
	if (options == null) options = new ChartOptions();
	options.type = ChartTypeEnum.HorizontalBar;
	return createChart(options, container, position, elementId);
}

export function createLineChart(options?: ChartOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, elementId?: string | null): LineChart
{
	if (options == null) options = new ChartOptions();
	options.type = ChartTypeEnum.Line;
	return createChart(options, container, position, elementId);
}

export function createDonutChart(options?: ChartOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, elementId?: string | null): DonutChart
{
	if (options == null) options = new ChartOptions();
	options.type = ChartTypeEnum.Donut;
	return createChart(options, container, position, elementId);
}

export function createPieChart(options?: ChartOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, elementId?: string | null): PieChart
{
	if (options == null) options = new ChartOptions();
	options.type = ChartTypeEnum.Pie;
	return createChart(options, container, position, elementId);
}

export function createAreaChart(options?: ChartOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, elementId?: string | null): AreaChart
{
	if (options == null) options = new ChartOptions();
	options.type = ChartTypeEnum.Area;
	return createChart(options, container, position, elementId);
}

export function createStackedBarChart(options?: ChartOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, elementId?: string | null): StackedBarChart
{
	if (options == null) options = new ChartOptions();
	options.type = ChartTypeEnum.StackedBar;
	return createChart(options, container, position, elementId);
}

export function createTabStrip(options?: TabStripOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, elementId?: string | null): TabStrip
{
	let control = createControls<TabStrip>(ControlTypeEnum.TabStrip, container, position, elementId, options);
	return control;
}

export function createTooltip(options?: TooltipOptions | null): Tooltip
{
	let control = createControls<Tooltip>(ControlTypeEnum.Tooltip, null, null, null, options);
	return control;
}

export function createSpeechRecognizer(options?: SpeechRecognizerOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, elementId?: string | null): SpeechRecognizer
{
	let control = createControls<SpeechRecognizer>(ControlTypeEnum.SpeechRecognizer, container, position, elementId, options);
	return control;
}

export function createLegend(options?: LegendOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, elementId?: string | null): Legend
{
	let control = createControls<Legend>(ControlTypeEnum.Legend, container, position, elementId, options);
	return control;
}

export function getControl<T extends VrControl>(controlId: string)
{
	return ControlManager.get<T>(controlId);
}

export function addControl(control: VrControl)
{
	ControlManager.add(control);
}

function createControls<T extends VrControl>(controlTypeEnum: ControlTypeEnum, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, definedElementId?: string | null, options?: VrControlOptions | null): T
{
	if (options == null)
		options = new VrControlOptions();

	let elementId = "vrpm_" + UtilityManager.createGuid();
	if (definedElementId != null)
	{
		elementId = definedElementId;
		if (!definedElementId.startsWith("#"))
			definedElementId = "#" + definedElementId;
	}

	//#region Already exists
	if (container != null && puma(definedElementId).length > 0)
		return puma(definedElementId)[0];
	//#endregion

	//#region Element
	let element = null;
	let elementTag = "";

	//#region ControlTypeEnum
	switch (controlTypeEnum)
	{
		case ControlTypeEnum.Label: elementTag = "label"; break;
		case ControlTypeEnum.Button: elementTag = "button"; break;
		case ControlTypeEnum.ButtonGroup: elementTag = "div"; break;
		case ControlTypeEnum.TextBox: elementTag = "input"; break;
		case ControlTypeEnum.Window: elementTag = "div"; break;
		case ControlTypeEnum.CheckBox: elementTag = "input"; break;
		case ControlTypeEnum.CheckBoxList: elementTag = "div"; break;
		case ControlTypeEnum.Separator: elementTag = "span"; break;
		case ControlTypeEnum.Image: elementTag = "img"; break;
		case ControlTypeEnum.DatePicker: elementTag = "input"; break;
		case ControlTypeEnum.SplitButton: elementTag = "div"; break;
		case ControlTypeEnum.Editor: elementTag = "textarea"; break;
		case ControlTypeEnum.Grid: elementTag = "table"; break;
		case ControlTypeEnum.Switch: elementTag = "div"; break;
		case ControlTypeEnum.RadioButton: elementTag = "input"; break;
		case ControlTypeEnum.RadioButtonList: elementTag = "div"; break;
		case ControlTypeEnum.Repeater: elementTag = "table"; break;
		case ControlTypeEnum.Map: elementTag = "div"; break;
		case ControlTypeEnum.Painter: elementTag = "canvas"; break;
		case ControlTypeEnum.Calendar: elementTag = "div"; break;
		case ControlTypeEnum.Rating: elementTag = "div"; break;
		case ControlTypeEnum.GroupBox: elementTag = "div"; break;
		case ControlTypeEnum.PdfViewer: elementTag = "div"; break;
		case ControlTypeEnum.PaypalButton: elementTag = "div"; break;
		case ControlTypeEnum.Upload: elementTag = "div"; break;
		case ControlTypeEnum.TreeView: elementTag = "div"; break;
		case ControlTypeEnum.Scheduler: elementTag = "div"; break;
		case ControlTypeEnum.MultiScheduler: elementTag = "div"; break;
		case ControlTypeEnum.QrCode: elementTag = "div"; break;
		case ControlTypeEnum.Icon: elementTag = "i"; break;
		case ControlTypeEnum.SearchBar: elementTag = "div"; break;
		case ControlTypeEnum.Splitter: elementTag = "div"; break;
		case ControlTypeEnum.AutoCompleteBox: elementTag = "div"; break;
		case ControlTypeEnum.Chart: elementTag = "canvas"; break;
		case ControlTypeEnum.TabStrip: elementTag = "div"; break;
		case ControlTypeEnum.Tooltip: elementTag = "div"; break;
		case ControlTypeEnum.SpeechRecognizer: elementTag = "div"; break;
		case ControlTypeEnum.Div: elementTag = "div"; break;
		case ControlTypeEnum.Legend: elementTag = "div"; break;
		case ControlTypeEnum.ColorPicker:
			{
				if ((options as ColorPickerOptions).showInput == null || (options as ColorPickerOptions).showInput === true)
					elementTag = "input";
				else
					elementTag = "button";
			}
			break;
		case ControlTypeEnum.ComboBox:
			{
				if ((options as ComboBoxOptions).mode == null || (options as ComboBoxOptions).checkboxes === true || (options as ComboBoxOptions).webService != null)
					(options as ComboBoxOptions).mode = ComboBoxTypeEnum.Combo;
				switch ((options as ComboBoxOptions).mode)
				{
					case ComboBoxTypeEnum.Combo: elementTag = ((options as ComboBoxOptions).checkboxes === true) ? "div" : "input"; break;
					case ComboBoxTypeEnum.DropDown: elementTag = "div"; break;
				}
			} break;
	}
	//#endregion

	if (container != null || controlTypeEnum == ControlTypeEnum.Window || controlTypeEnum == ControlTypeEnum.PdfViewer || controlTypeEnum == ControlTypeEnum.Tooltip)
		element = puma("<" + elementTag + " id='" + elementId + "'></" + elementTag + ">")[0];
	else
	{
		if (definedElementId == null)
			throw Error(controlTypeEnum + ": il container è nullo, ma l'id non è valorizzato!");

		if (!elementId.startsWith("#"))
			elementId = "#" + elementId;

		element = puma(elementId)[0];
	}
	//#endregion

	//#region Check element
	if (!puma(element).is(elementTag))
		throw Error("L'elemento nell'HTML con id: " + elementId + " non corrisponde al corretto elemento: " + elementTag);
	//#endregion

	if (elementTag == "input")
		puma(element).attr("autocomplete", "off");

	//#region Container
	if ((controlTypeEnum == ControlTypeEnum.Window || controlTypeEnum == ControlTypeEnum.Tooltip) && container == null)
		container = (shadowRoot() != null) ? (shadowRoot() as any as HTMLElement) : document.body;

	if (container != null)
	{
		if (typeof (container) == "string" && !container.startsWith("#"))
			container = "#" + container;

		if (position == null) position = ControlPositionEnum.After;
		if (position == ControlPositionEnum.After)
			puma(container).vrAppendPuma(element);
		else
			puma(container).prepend(element);
	}
	//#endregion

	let control = puma(element)["vr" + controlTypeEnum](options);
	addControl(control);
	return control as T;
}

jQuery.fn.extend(
	{
		vrLabel: function (options?: LabelOptions | null)
		{
			let element = (this as any)[0];
			return new Label(element, options);
		},
		vrButton: function (options?: ButtonOptions | null)
		{
			let element = (this as any)[0];
			return new Button(element, options);
		},
		vrButtonGroup: function (options?: ButtonGroupOptions | null)
		{
			let element = (this as any)[0];
			return new ButtonGroup(element, options);
		},
		vrTextBox: function (options?: TextBoxOptions | null)
		{
			let element = (this as any)[0];
			return new TextBox(element, options);
		},
		vrCheckBox: function (options?: CheckBoxOptions | null)
		{
			let element = (this as any)[0];
			return new CheckBox(element, options);
		},
		vrCheckBoxList: function (options?: CheckBoxListOptions | null)
		{
			let element = (this as any)[0];
			return new CheckBoxList(element, options);
		},
		vrSeparator: function (options?: SeparatorOptions | null)
		{
			let element = (this as any)[0];
			return new Separator(element, options);
		},
		vrImage: function (options?: ImageOptions | null)
		{
			let element = (this as any)[0];
			return new Image(element, options);
		},
		vrDatePicker: function (options?: DatePickerOptions | null)
		{
			let element = (this as any)[0];
			return new DatePicker(element, options);
		},
		vrComboBox: function (options?: ComboBoxOptions | null)
		{
			let element = (this as any)[0];
			return new ComboBox(element, options);
		},
		vrSplitButton: function (options?: SplitButtonOptions | null)
		{
			let element = (this as any)[0];
			return new SplitButton(element, options);
		},
		vrEditor: function (options?: EditorOptions | null)
		{
			let element = (this as any)[0];
			return new Editor(element, options);
		},
		vrWindow: function (options?: WindowOptions | null)
		{
			let element = (this as any)[0];
			return new Window(element, options);
		},
		vrGrid: function (options?: GridOptions | null)
		{
			let element = (this as any)[0];
			return new Grid(element, options);
		},
		vrSwitch: function (options?: SwitchOptions | null)
		{
			let element = (this as any)[0];
			return new Switch(element, options);
		},
		vrRadioButton: function (options?: RadioButtonOptions | null)
		{
			let element = (this as any)[0];
			return new RadioButton(element, options);
		},
		vrRadioButtonList: function (options?: RadioButtonListOptions | null)
		{
			let element = (this as any)[0];
			return new RadioButtonList(element, options);
		},
		vrRepeater: function (options?: RepeaterOptions | null)
		{
			let element = (this as any)[0];
			return new Repeater(element, options);
		},
		vrMap: function (options?: MapsOptions | null)
		{
			let element = (this as any)[0];
			return new Maps(element, options);
		},
		vrPainter: function (options?: PainterOptions | null)
		{
			let element = (this as any)[0];
			return new Painter(element, options);
		},
		vrCalendar: function (options?: CalendarOptions | null)
		{
			let element = (this as any)[0];
			return new Calendar(element, options);
		},
		vrRating: function (options?: RatingOptions | null)
		{
			let element = (this as any)[0];
			return new Rating(element, options);
		},
		vrGroupBox: function (options?: GroupBoxOptions | null)
		{
			let element = (this as any)[0];
			return new GroupBox(element, options);
		},
		vrPdfViewer: function (options?: PdfViewerOptions | null)
		{
			let element = (this as any)[0];
			return new PdfViewer(element, options);
		},
		vrPaypalButton: function (options?: PaypalButtonOptions | null)
		{
			let element = (this as any)[0];
			return new PaypalButton(element, options);
		},
		vrUpload: function (options?: UploadOptions | null)
		{
			let element = (this as any)[0];
			return new Upload(element, options);
		},
		vrTreeView: function (options?: TreeViewOptions | null)
		{
			let element = (this as any)[0];
			return new TreeView(element, options);
		},
		vrScheduler: function (options?: SchedulerOptions | null)
		{
			let element = (this as any)[0];
			return new Scheduler(element, options);
		},
		vrMultiScheduler: function (options?: MultiSchedulerOptions | null)
		{
			let element = (this as any)[0];
			return new MultiScheduler(element, options);
		},
		vrQrCode: function (options?: QrCodeOptions | null)
		{
			let element = (this as any)[0];
			return new QrCode(element, options);
		},
		vrIcon: function (options?: IconOptions | null)
		{
			let element = (this as any)[0];
			return new Icon(element, options);
		},
		vrColorPicker: function (options?: ColorPickerOptions | null)
		{
			let element = (this as any)[0];
			return new ColorPicker(element, options);
		},
		vrSearchBar: function (options?: SearchBarOptions | null)
		{
			let element = (this as any)[0];
			return new SearchBar(element, options);
		},
		vrSplitter: function (options?: SplitterOptions | null)
		{
			let element = (this as any)[0];
			return new Splitter(element, options);
		},
		vrAutoCompleteBox: function (options?: AutoCompleteBoxOptions | null)
		{
			let element = (this as any)[0];
			return new AutoCompleteBox(element, options);
		},
		vrChart: function (options?: ChartOptions | null)
		{
			let element = (this as any)[0];
			return new ChartVr(element, options);
		},
		vrTabStrip: function (options?: TabStripOptions | null)
		{
			let element = (this as any)[0];
			return new TabStrip(element, options);
		},
		vrTooltip: function (options?: TooltipOptions | null)
		{
			let element = (this as any)[0];
			return new Tooltip(element, options);
		},
		vrSpeechRecognizer: function (options?: SpeechRecognizerOptions | null)
		{
			let element = (this as any)[0];
			return new SpeechRecognizer(element, options);
		},
		vrDiv: function (options?: DivOptions | null)
		{
			let element = (this as any)[0];
			return new Div(element, options);
		},
		vrLegend: function (options?: LegendOptions | null)
		{
			let element = (this as any)[0];
			return new Legend(element, options);
		}
	});

//#region Memory leaks' destroyer
$(() =>
{
	const observer = new MutationObserver((mutations_list) =>
	{
		mutations_list.forEach((mutations) =>
		{
			mutations.removedNodes.forEach((currentValue, currentIndex, listObj) =>
			{
				if ((currentValue as HTMLElement).classList != null)
				{
					if (!currentValue.isConnected)
						removeItems(currentValue);
				}
			});
		});
	});
	observer.observe(document.body, { subtree: true, childList: true });

	function removeItems(element: any)
	{
		if (element != null)
		{
			try
			{
				if (element.id != null)
				{
					let idElement = element.id.replace("Container", "").replace("#", "").replace(".", "");
					ControlManager.remove(idElement);

					puma("#" + idElement + "_divPopup").remove();
					puma("." + idElement + "_wndUtility").remove();
					puma("#" + idElement + "_someStuff").remove();
					puma("#" + idElement + "_someStuffContainer").remove();
					puma("#vrWindowBackground_" + idElement).remove();
				}
			}
			catch (e) { }

			if (element.children == null || element.children.length == 0)
				return;

			for (let child of element.children)
				removeItems(child);
		}
	}
});
//#endregion

export enum ControlTypeEnum
{
	Label = "Label",
	Button = "Button",
	Window = "Window",
	TextBox = "TextBox",
	CheckBox = "CheckBox",
	Separator = "Separator",
	ButtonGroup = "ButtonGroup",
	Image = "Image",
	DatePicker = "DatePicker",
	ComboBox = "ComboBox",
	SplitButton = "SplitButton",
	Editor = "Editor",
	Grid = "Grid",
	Switch = "Switch",
	CheckBoxList = "CheckBoxList",
	RadioButton = "RadioButton",
	RadioButtonList = "RadioButtonList",
	Repeater = "Repeater",
	Map = "Map",
	Painter = "Painter",
	Calendar = "Calendar",
	Rating = "Rating",
	GroupBox = "GroupBox",
	PdfViewer = "PdfViewer",
	Upload = "Upload",
	PaypalButton = "PaypalButton",
	TreeView = "TreeView",
	Scheduler = "Scheduler",
	MultiScheduler = "MultiScheduler",
	QrCode = "QrCode",
	Icon = "Icon",
	ColorPicker = "ColorPicker",
	SearchBar = "SearchBar",
	Splitter = "Splitter",
	AutoCompleteBox = "AutoCompleteBox",
	Chart = "Chart",
	TabStrip = "TabStrip",
	Tooltip = "Tooltip",
	SpeechRecognizer = "SpeechRecognizer",
	Div = "Div",
	Legend = "Legend"
}

export enum ControlPositionEnum
{
	Before,
	After,
	None
}
//#endregion

//#region Notifications
export function hideNotify()
{
	puma(".vrNotifierContainer").hide();
}

export function notify(text: string, options?: NotifierOptions): Notifier
{
	let notifier = new Notifier(text, options);
	return notifier;
}

export function notifyError(text: string, options?: NotifierOptions | null): Notifier
{
	if (options == null) options = new NotifierOptions();
	if (options.type == null) options.type = NotifierTypeEnum.Error;
	return new Notifier(text, options)!;
}

export function notifyWarning(text: string, options?: NotifierOptions | null): Notifier
{
	if (options == null) options = new NotifierOptions();
	if (options.type == null) options.type = NotifierTypeEnum.Warning;
	return new Notifier(text, options)!;
}

export function notifySuccess(text: string, options?: NotifierOptions | null): Notifier
{
	if (options == null) options = new NotifierOptions();
	if (options.type == null) options.type = NotifierTypeEnum.Success;
	return new Notifier(text, options)!;
}

export function notifyInfo(text: string, options?: NotifierOptions | null): Notifier
{
	if (options == null) options = new NotifierOptions();
	if (options.type == null) options.type = NotifierTypeEnum.Info;
	return new Notifier(text, options)!;
}
//#endregion

//#region Dialog
export function confirm(text?: string | null, options?: ConfirmOptions | null): Promise<any>
{
	let confirm = new Confirm(text, options);
	return confirm.open();
}

export function alert(text?: string | null, options?: AlertOptions | null): Promise<any>
{
	let alert = new Alert(text, options);
	return alert.open();
}

export function dialog(text?: string | null, options?: DialogOptions | null)
{
	let dialog = new Dialog(text, options);
	dialog.open();
	return dialog;
}

export function prompt(text?: string | null, options?: PromptOptions | null): Promise<any>
{
	let prompt = new Prompt(text, options);
	return prompt.open();
}
//#endregion

//#region Print
export function printElement(element: string | HTMLElement | JQuery, options?: PrintHtmlOptions)
{
	PrintManager.printElement(element, options);
}

export function printHtml(elementId: string, options?: PrintFileOptions)
{
	PrintManager.printHtml(elementId, options);
}

export function printBytes(base64Bytes: string, options?: PrintFileOptions)
{
	PrintManager.printBytes(base64Bytes, options);
}

export function printPdf(path: string, options?: PrintFileOptions)
{
	PrintManager.printPdf(path, options);
}

export function printImage(path: string, options?: PrintFileOptions)
{
	PrintManager.printImage(path, options);
}
//#endregion

//#region Device manager
export function isSmartphone()
{
	return DeviceManager.isSmartphone();
}

export function isTablet()
{
	return DeviceManager.isTablet();
}

export function isDesktop()
{
	return DeviceManager.isDesktop();
}

export function isMobile()
{
	return DeviceManager.isMobile();
}

export function isIphoneX()
{
	return DeviceManager.isIphoneX();
}

export function isIphone()
{
	return DeviceManager.isIphone();
}

export function browser()
{
	return DeviceManager.browser();
}

export function isInternetExplorer()
{
	return DeviceManager.isInternetExplorer();
}

export function isSafari()
{
	return DeviceManager.isSafari();
}

export function isChrome()
{
	return DeviceManager.isChrome();
}

export function isFirefox()
{
	return DeviceManager.isFirefox();
}

export function isEdge()
{
	return DeviceManager.isEdge();
}

export function isOpera()
{
	return DeviceManager.isOpera();
}

export function isVivaldi()
{
	return DeviceManager.isVivaldi();
}

export function isSeamonkey()
{
	return DeviceManager.isSeamonkey();
}

export enum BrowserTypeEnum
{
	InternetExplorer = "InternetExplorer",
	Safari = "Safari",
	Chrome = "Chrome",
	Firefox = "Firefox",
	Edge = "Edge",
	Opera = "Opera",
	Vivaldi = "Vivaldi",
	Seamonkey = "Seamonkey"
}
//#endregion

//#region HtmlElement
export function createDiv(options?: DivOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null): Div
{
	let control = createControls<Div>(ControlTypeEnum.Div, container, position, null, options);
	return control;
}

export function div(container?: string | HTMLElement | JQuery, settings?: DivSettings, prepend = false): HTMLElement
{
	let classAttribute = "";
	let idAttribute = "";
	let css = "";
	let content = "";
	let title = "";

	if (settings != null)
	{
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

	let div = puma("<div " + title + " " + classAttribute + " " + idAttribute + " " + css + ">" + content + "</div>")[0];
	if (container != null)
	{
		if (typeof (container) == "string" && !container.startsWith("#") && !container.startsWith("."))
			container = "#" + container;

		if (!prepend)
			puma(div).vrAppendToPuma(container);
		else
			puma(div).vrPrependToPuma(container);
	}

	if (settings != null && settings.attributes != null)
	{
		for (let attribute of settings.attributes)
			puma(div).attr(attribute.name, attribute.value);
	}

	return div;
}
class DivSettings
{
	class?: string;
	id?: string;
	content?: string;
	css?: string;
	tooltip?: string;
	attributes?: AttributeSettings[];
}

export function span(container?: string | HTMLElement | JQuery, settings?: SpanSettings, prepend = false): HTMLElement
{
	let classAttribute = "";
	let idAttribute = "";
	let css = "";
	let content = "";
	let title = "";

	if (settings != null)
	{
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

	let span = puma("<span " + title + " " + classAttribute + " " + idAttribute + " " + css + ">" + content + "</span>")[0];
	if (container != null)
	{
		if (typeof (container) == "string" && !container.startsWith("#") && !container.startsWith("."))
			container = "#" + container;

		if (!prepend)
			puma(span).vrAppendToPuma(container);
		else
			puma(span).vrPrependToPuma(container);
	}

	if (settings != null && settings.attributes != null)
	{
		for (let attribute of settings.attributes)
			puma(span).attr(attribute.name, attribute.value);
	}

	return span;
}
class SpanSettings
{
	class?: string;
	id?: string;
	content?: string;
	css?: string;
	tooltip?: string;
	attributes?: AttributeSettings[];
}

export function icon(iconClass: IconClass, container?: string | HTMLElement | JQuery | null, settings?: IconSettings | null, prepend = false): HTMLElement
{
	if (container != null && typeof (container) == "string" && !container.startsWith("#") && !container.startsWith("."))
		container = "#" + container;

	let classAttribute = "";
	let idAttribute = "";
	let css = "";

	//#region Settings
	if (settings != null)
	{
		if (settings.id != null)
			idAttribute = "id = '" + settings.id + "'";

		if (settings.css != null)
			css += settings.css + ";";

		if (settings.fontSize != null)
		{
			if (typeof (settings.fontSize) == "number")
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
	//#endregion

	let icon = puma("<i class='" + iconClass + " vrIcon " + classAttribute + "' aria-hidden='true'"
		+ " id='" + idAttribute + "' style='" + css + "'></i>")[0];

	if (container != null)
	{
		if (!prepend)
			puma(icon).vrAppendToPuma(container);
		else
			puma(icon).vrPrependToPuma(container);
	}

	return icon;
}
export class IconSettings
{
	fontSize?: string | number;
	css?: string;
	id?: string;
	color?: string;
	class?: string;
	cursor?: string;
	position?: PositionEnum;
}

export function iframe(container: string | HTMLElement | JQuery, settings?: VrIframeSettings)
{
	if (typeof (container) == "string" && !container.startsWith("#") && !container.startsWith("."))
		container = "#" + container;

	if (settings == null) settings = new VrIframeSettings();
	if (settings.content == null) settings.content = "";
	if (settings.width == null) settings.width = "100%";
	if (settings.height == null) settings.height = "100%";
	if (typeof (settings.width) == "number") settings.width = settings.width + "px";
	if (typeof (settings.height) == "number") settings.height = settings.height + "px";

	let iframe = puma("<iframe>").vrAppendToPuma(container)[0];
	iframe.style.cssText += "width: " + settings.width + "; height: " + settings.height + "; border: none;" + settings.css;

	let iframeBody: HTMLElement | null = null;
	let iframeContentDocument = iframe.contentDocument;
	puma(iframeContentDocument).find("body").css("margin", "0px");
	if (iframeContentDocument != null)
		iframeBody = iframeContentDocument.body;

	if (settings.content.includes(".html") || settings.content.includes(".php") || settings.content.includes(".aspx") || settings.content.includes("http"))
	{
		if (settings.loader || settings.loader !== false)
		{
			if (settings.loader === true)
				settings.loader = iframe;

			LoaderManager.show((settings.loader === false) ? iframe : settings.loader);
		}

		puma(iframe).attr("src", settings.content);
		puma(iframe).on("load", () => 
		{
			let iframeContentDocument = iframe!.contentDocument;
			puma(iframeContentDocument).find("body").css("margin", "0px");

			if (settings!.callback != null)
				settings!.callback();

			LoaderManager.hide();
		});
	}
	else
	{
		puma(settings.content).vrAppendToPuma(iframeBody);

		if (settings!.callback != null)
			settings!.callback();

		LoaderManager.hide();
	}

	if (settings != null && settings.attributes != null)
	{
		for (let attribute of settings.attributes)
			puma(iframe).attr(attribute.name, attribute.value);
	}

	return iframe as HTMLIFrameElement;
}
class VrIframeSettings
{
	content?: string;
	loader?: boolean | HTMLElement | JQuery | string;
	callback?: Function;
	width?: number | string;
	height?: number | string;
	css?: string;
	attributes?: AttributeSettings[];
}

export function br(container: string | HTMLElement | JQuery, count = 1)
{
	if (typeof (container) == "string" && !container.startsWith("#") && !container.startsWith("."))
		container = "#" + container;

	for (let i = 0; i < count; i++)
		puma("<br />").vrAppendToPuma(container);
}

export function hr(container: string | HTMLElement | JQuery, css: string = "", id?: string): HTMLElement
{
	if (typeof (container) == "string" && !container.startsWith("#") && !container.startsWith("."))
		container = "#" + container;

	let idString = (id == null) ? "" : " id='" + id + "'";

	return puma("<hr " + idString + " style='" + css + "' />").vrAppendToPuma(container)[0];
}

export function guid()
{
	const hex = [...Array(256).keys()].map(index => (index).toString(16).padStart(2, '0'));
	const r = crypto.getRandomValues(new Uint8Array(16));
	r[6] = (r[6] & 0x0f) | 0x40;
	r[8] = (r[8] & 0x3f) | 0x80;

	return [...r.entries()]
		.map(([index, int]) => [4, 6, 8, 10].includes(index) ? `-${hex[int]}` : hex[int])
		.join('');
}

export class VrMarginSettings
{
	top?: number;
	right?: number;
	bottom?: number;
	left?: number;
}

export function showLoader(element?: string | HTMLElement | JQuery | boolean, transparency = true, tag?: any)
{
	if (typeof (element) == "boolean") element = undefined;
	LoaderManager.show(element, transparency, tag);
}

export function hideLoader(tag?: any)
{
	LoaderManager.hide(tag);
}
//#endregion

//#region Creator
export function pumo()
{
	confirm("Giuri solennemente di non avere buone intenzioni?")
		.then(() => alert("Il signor Matteo Pumo è fiero di presentarti 'I controlli del malandrino'! So che saprai usarli nel modo giusto"))
		.catch(() => alert("Peggio per te, non saprai mai quant'è profonda la tana del bianconiglio"))
}

export enum CreatorEnum
{
	MatteoPumo = "MatteoPumo",
	MatteoPumoSite = "https://www.matteopumo.com",
	MatteoPumoMail = "info@matteopumo.com",
	VettoreRinascimento = "VettoreRinascimento",
	VettoreMedical = "VettoreMedical",
	Year2020 = "Year2020",
	PureJqueryTypescript = "PureJqueryTypescript",
	FastestControlsEver = "FastestControlsEver"
}
//#endregion

//#region Icons
export type IconClass = IconClassicSolid | IconClassicLight | IconClassicRegular | IconClassicDuotone | IconClassicThin
	| IconClassicBrands | IconSharpSolid | IconSharpLight | IconSharpRegular | IconSharpDuotone | IconSharpThin | string;

//#region Icon Classic

//#region Icon Brands
export enum IconClassicBrands
{
	Amazon = "fa-brands fa-amazon",
	Android = "fa-brands fa-android",
	Apple = "fa-brands fa-apple",
	AppStore = "fa-brands fa-app-store",
	Facebook = "fa-brands fa-facebook",
	Google = "fa-brands fa-google",
	GooglePlay = "fa-brands fa-google-play",
	Paypal = "fa-brands fa-paypal",
	Twitter = "fa-brands fa-twitter",
	Vimeo = "fa-brands fa-vimeo",
	Whatsapp = "fa-brands fa-whatsapp",
	Windows = "fa-brands fa-windows",
	Youtube = "fa-brands fa-youtube",
}
//#endregion

//#region Icon Solid
export enum IconClassicSolid
{
	//#region A
	Add = "fa-solid fa-plus",
	AddressCard = "fa-solid fa-address-card",
	Alert = "fa-solid fa-triangle-exclamation",
	AngleDown = "fa-solid fa-angle-down",
	AngleLeft = "fa-solid fa-angle-left",
	AngleRight = "fa-solid fa-angle-right",
	AngleUp = "fa-solid fa-angle-up",
	Aperture = "fa-solid fa-aperture",
	ArrowDown = "fa-solid fa-arrow-down",
	ArrowDownShortWide = "fa-solid fa-arrow-down-short-wide",
	ArrowDownWideShort = "fa-solid fa-arrow-down-wide-short",
	ArrowLeft = "fa-solid fa-arrow-left",
	ArrowPointer = "fa-solid fa-arrow-pointer",
	ArrowRight = "fa-solid fa-arrow-right",
	ArrowRightToBracket = "fa-solid fa-arrow-right-to-bracket",
	ArrowRightFromBracket = "fa-solid fa-arrow-right-from-bracket",
	ArrowRotateRight = "fa-solid fa-arrow-rotate-right",
	ArrowsRotate = "fa-solid fa-arrows-rotate",
	ArrowUp = "fa-solid fa-arrow-up",
	Asterisk = "fa-solid fa-asterisk",
	At = "fa-solid fa-at",
	Attachment = "fa-solid fa-paperclip",
	//#endregion

	//#region B
	Back = "fa-solid fa-angle-left",
	Backward = "fa-solid fa-backward",
	BackwardFast = "fa-solid fa-backward-fast",
	BackwardStep = "fa-solid fa-backward-step",
	BalanceScale = "fa-solid fa-balance-scale",
	BallotCheck = "fa-solid fa-ballot-check",
	Ban = "fa-solid fa-ban",
	Barcode = "fa-solid fa-barcode",
	BarcodeScan = "fa-solid fa-barcode-scan",
	Bars = "fa-solid fa-bars",
	BarsSort = "fa-solid fa-bars-sort",
	Bell = "fa-solid fa-bell",
	BellSlash = "fa-solid fa-bell-slash",
	Bolt = "fa-solid fa-bolt",
	Book = "fa-solid fa-book",
	BookOpen = "fa-solid fa-book-open",
	Box = "fa-solid fa-box",
	BoxArchive = "fa-solid fa-box-archive",
	BriefCase = "fa-solid fa-brief-case",
	Bug = "fa-solid fa-bug",
	Burger = "fa-solid fa-bars",
	//#endregion

	//#region C
	CakeCandles = "fa-solid fa-cake-candles",
	Calendar = "fa-solid fa-calendar",
	CalendarAlt = "fa-solid fa-calendar-alt",
	CalendarCheck = "fa-solid fa-calendar-check",
	CalendarDay = "fa-solid fa-calendar-day",
	CalendarPlus = "fa-solid fa-calendar-plus",
	Camera = "fa-solid fa-camera",
	CameraAlt = "fa-solid fa-camera-alt",
	CameraWeb = "fa-solid fa-camera-web",
	CameraWebSlash = "fa-solid fa-camera-web-slash",
	Capsules = "fa-solid fa-capsules",
	CaretDown = "fa-solid fa-caret-down",
	CaretLeft = "fa-solid fa-caret-left",
	CaretRight = "fa-solid fa-caret-right",
	CaretUp = "fa-solid fa-caret-up",
	CartCirclePlus = "fa-solid fa-cart-circle-plus",
	CartShopping = "fa-solid fa-cart-shopping",
	ChartArea = "fa-solid fa-chart-area",
	ChartBar = "fa-solid fa-chart-bar",
	ChartColumn = "fa-solid fa-chart-column",
	ChartLine = "fa-solid fa-chart-line",
	ChartPie = "fa-solid fa-chart-pie",
	ChartSimple = "fa-solid fa-chart-simple",
	Chat = "fa-solid fa-comment",
	Check = "fa-solid fa-check",
	ChevronDown = "fa-solid fa-chevron-down",
	ChevronLeft = "fa-solid fa-chevron-left",
	ChevronRight = "fa-solid fa-chevron-right",
	ChevronUp = "fa-solid fa-chevron-up",
	Circle = "fa-solid fa-circle",
	CircleCheck = "fa-solid fa-circle-check",
	CircleExclamation = "fa-solid fa-circle-exclamation",
	CircleInfo = "fa-solid fa-circle-info",
	CircleStop = "fa-solid fa-circle-stop",
	Clipboard = "fa-solid fa-clipboard",
	ClipboardMedical = "fa-solid fa-clipboard-medical",
	Clock = "fa-solid fa-clock",
	ClockRotateLeft = "fa-solid fa-clock-rotate-left",
	Close = "fa-solid fa-xmark",
	Cloud = "fa-solid fa-cloud",
	CloudArrowUp = "fa-solid fa-cloud-arrow-up",
	CloudDownload = "fa-solid fa-cloud-download",
	Code = "fa-solid fa-code",
	CodeMerge = "fa-solid fa-code-merge",
	Coins = "fa-solid fa-coins",
	Collapse = "fa-solid fa-compress",
	Comment = "fa-solid fa-comment",
	CommentDots = "fa-solid fa-comment-dots",
	CommentLines = "fa-solid fa-comment-lines",
	Comments = "fa-solid fa-comments",
	CommentSms = "fa-solid fa-comment-sms",
	Compress = "fa-solid fa-compress",
	Copy = "fa-solid fa-copy",
	Copyright = "fa-solid fa-copyright",
	CreditCard = "fa-solid fa-credit-card",
	Crown = "fa-solid fa-crown",
	//#endregion

	//#region D
	Database = "fa-solid fa-database",
	Delete = "fa-solid fa-xmark",
	DeleteLeft = "fa-solid fa-delete-left",
	DeleteRight = "fa-solid fa-delete-right",
	Desktop = "fa-solid fa-desktop",
	Download = "fa-solid fa-download",
	//#endregion

	//#region E
	Edit = "fa-solid fa-pen",
	Eject = "fa-solid fa-eject",
	Ellipsis = "fa-solid fa-ellipsis",
	EllipsisVertical = "fa-solid fa-ellipsis-vertical",
	Envelope = "fa-solid fa-envelope",
	Eraser = "fa-solid fa-eraser",
	EuroSign = "fa-solid fa-euro-sign",
	Exclamation = "fa-solid fa-exclamation",
	Expand = "fa-solid fa-expand",
	Eye = "fa-solid fa-eye",
	EyeSlash = "fa-solid fa-eye-slash",
	//#endregion

	//#region F
	Family = "fa-solid fa-family",
	FastBackward = "fa-solid fa-fast-backward",
	FastForward = "fa-solid fa-fast-forward",
	File = "fa-solid fa-file",
	FileAudio = "fa-solid fa-file-audio",
	FileContract = "fa-solid fa-file-contract",
	FileDownload = "fa-solid fa-file-download",
	FileExcel = "fa-solid fa-file-excel",
	FileExport = "fa-solid fa-file-export",
	FileImage = "fa-solid fa-file-image",
	FileInvoice = "fa-solid fa-file-invoice",
	FileImport = "fa-solid fa-file-import",
	FileLines = "fa-solid fa-file-lines",
	FileMusic = "fa-solid fa-file-music",
	FilePdf = "fa-solid fa-file-pdf",
	Files = "fa-solid fa-file-files",
	FileSignature = "fa-solid fa-file-signature",
	FileVideo = "fa-solid fa-file-video",
	FileWord = "fa-solid fa-file-word",
	FileZipper = "fa-solid fa-file-zipper",
	Filter = "fa-solid fa-filter",
	Flag = "fa-solid fa-flag",
	FlagSwallowTail = "fa-solid fa-flag-swallowtail",
	FloppyDisk = "fa-solid fa-floppy-disk",
	Folder = "fa-solid fa-folder",
	FolderOpen = "fa-solid fa-folder-open",
	FontAwesome = "fa-solid  fa-font-awesome",
	Forward = "fa-solid fa-forward",
	ForwardStep = "fa-solid fa-forward-step",
	ForwardFast = "fa-solid fa-forward-fast",
	Futbol = "fa-solid fa-futbol",
	//#endregion

	//#region G
	Gear = "fa-solid fa-gear",
	Gears = "fa-solid fa-gears",
	Globe = "fa-solid fa-globe",
	//#endregion

	//#region H
	Hashtag = "fa-solid fa-hashtag",
	HatWizard = "fa-solid fa-hat-wizard",
	Headset = "fa-solid fa-headset",
	Hospital = "fa-solid fa-hospital",
	Hourglass = "fa-solid fa-hourglass",
	HourglassClock = "fa-solid fa-hourglass-clock",
	House = "fa-solid fa-house",
	HouseMedical = "fa-solid fa-house-medical",
	HouseUser = "fa-solid fa-house-user",
	//#endregion

	//#region I
	Image = "fa-solid fa-image",
	Inbox = "fa-solid fa-inbox",
	InboxFull = "fa-solid fa-inbox-full",
	Info = "fa-solid fa-info",
	//#endregion

	//#region K
	Key = "fa-solid fa-key",
	Keyboard = "fa-solid fa-keyboard",
	KeySkeleton = "fa-solid fa-key-skeleton",
	//#endregion

	//#region L
	Laptop = "fa-solid fa-laptop",
	LaptopMedical = "fa-solid fa-laptop-medical",
	LevelDown = "fa-solid fa-level-down",
	LevelDownAlt = "fa-solid fa-level-down-alt",
	LevelLeft = "fa-solid fa-level-left",
	LevelLeftAlt = "fa-solid fa-level-left-alt",
	LevelRight = "fa-solid fa-level-right",
	LevelRightAlt = "fa-solid fa-level-right-alt",
	LevelUp = "fa-solid fa-level-up",
	LevelUpAlt = "fa-solid fa-level-up-alt",
	Link = "fa-solid fa-link",
	LinkExternal = "fa-solid fa-arrow-up-right-from-square",
	LinkHorizontal = "fa-solid fa-link-horizontal",
	LinkHorizontalSlash = "fa-solid fa-link-horizontal-slash",
	LinkSimple = "fa-solid fa-link-simple",
	LinkSimpleSlash = "fa-solid fa-link-simple-slash",
	LinkSlash = "fa-solid fa-link-slash",
	List = "fa-solid fa-list",
	ListCheck = "fa-solid fa-list-check",
	ListOl = "fa-solid fa-list-ol",
	ListTree = "fa-solid fa-list-tree",
	ListUl = "fa-solid fa-list-ul",
	LocationArrow = "fa-solid fa-location-arrow",
	LocationCrossHairs = "fa-solid fa-location-crosshairs",
	LocationCheck = "fa-solid fa-location-check",
	LocationDot = "fa-solid fa-location-dot",
	Lock = "fa-solid fa-lock",
	LockOpen = "fa-solid fa-lock-open",
	Login = "fa-solid fa-arrow-right-to-bracket",
	Logout = "fa-solid fa-arrow-right-from-bracket",
	//#endregion

	//#region M
	MagnifyingGlass = "fa-solid fa-magnifying-glass",
	MagnifyingGlassMinus = "fa-solid fa-magnifying-glass-minus",
	MagnifyingGlassPlus = "fa-solid fa-magnifying-glass-plus",
	Mail = "fa-solid fa-envelope",
	Mailbox = "fa-solid fa-mailbox",
	MailOpen = "fa-solid fa-envelope-open",
	Map = "fa-solid fa-map",
	MapLocation = "fa-solid fa-map-location",
	MapLocationDot = "fa-solid fa-map-location-dot",
	MapPin = "fa-solid fa-map-pin",
	Maximize = "fa-solid fa-maximize",
	Merge = "fa-solid fa-merge",
	Message = "fa-solid fa-message",
	MessageCode = "fa-solid fa-message-code",
	MessageDots = "fa-solid fa-message-dots",
	MessageLines = "fa-solid fa-message-lines",
	Messages = "fa-solid fa-messages",
	Microphone = "fa-solid fa-microphone",
	MicrophoneLines = "fa-solid fa-microphone-lines",
	MicrophoneLinesSlash = "fa-solid fa-microphone-lines-slash",
	MicrophoneSlash = "fa-solid fa-microphone-slash",
	Microscope = "fa-solid fa-microscope",
	Minimize = "fa-solid fa-minimize",
	Minus = "fa-solid fa-minus",
	Mobile = "fa-solid fa-mobile",
	MobileNotch = "fa-solid fa-mobile-notch",
	MoneyCheckDollarPen = "fa-solid fa-money-check-dollar-pen",
	Music = "fa-solid fa-music",
	MusicSlash = "fa-solid fa-music-slash",
	//#endregion

	//#region Newspaper
	NewsPaper = "fa-solid fa-newspaper",
	//#endregion

	//#region P
	Palette = "fa-solid fa-palette",
	PaperClip = "fa-solid fa-paperclip",
	PaperClipVertical = "fa-solid fa-paperclip-vertical",
	PaperPlane = "fa-solid fa-paper-plane",
	PaperPlaneTop = "fa-solid fa-paper-plane-top",
	Paste = "fa-solid fa-paste",
	Pause = "fa-solid fa-pause",
	Pencil = "fa-solid fa-pencil",
	Pen = "fa-solid fa-pen",
	PenToSquare = "fa-solid fa-pen-to-square",
	PeopleArrowsLeftRight = "fa-solid fa-people-arrows-left-right",
	Percentage = "fa-solid fa-percentage",
	PersonChalkboard = "fa-solid fa-person-chalkboard",
	PersonMilitaryRifle = "fa-solid fa-person-military-rifle",
	Phone = "fa-solid fa-phone",
	Play = "fa-solid fa-play",
	PlayPause = "fa-solid fa-play-pause",
	Plus = "fa-solid fa-plus",
	Print = "fa-solid fa-print",
	Pumo = "fa-solid fa-font-awesome",
	//#endregion

	//#region Q
	Question = "fa-solid fa-question",
	//#endregion

	//#region R
	Redo = "fa-solid fa-redo",
	RedoAlt = "fa-solid fa-redo-alt",
	Refresh = "fa-solid fa-arrows-rotate",
	Remove = "fa-solid fa-xmark",
	Repeat = "fa-solid fa-repeat",
	Reply = "fa-solid fa-reply",
	ReplyAll = "fa-solid fa-reply-all",
	RightFromBracket = "fa-solid fa-right-from-bracket",
	RightToBracket = "fa-solid fa-right-to-bracket",
	Rotate = "fa-solid fa-rotate",
	RotateLeft = "fa-solid fa-rotate-left",
	//#endregion

	//#region S
	SackDollar = "fa-solid fa-sack-dollar",
	Save = "fa-solid fa-floppy-disk",
	Scissors = "fa-solid fa-scissors",
	ScrewdriverWrench = "fa-solid fa-screwdriver-wrench",
	Search = "fa-solid fa-magnifying-glass",
	SensorTriangleExclamation = "fa-solid fa-sensor-triangle-exclamation",
	Settings = "fa-solid fa-gear",
	Share = "fa-solid fa-share",
	ShareAll = "fa-solid fa-share-all",
	ShareNodes = "fa-solid fa-share-nodes",
	ShareFromSquare = "fa-solid fa-share-from-square",
	ShieldCheck = "fa-solid fa-shield-check",
	Ship = "fa-solid fa-ship",
	Sitemap = "fa-solid fa-sitemap",
	Soccer = "fa-solid fa-futbol",
	Sort = "fa-solid fa-sort",
	SortDown = "fa-solid fa-sort-down",
	SortUp = "fa-solid fa-sort-up",
	Spinner = "fa-solid fa-spinner",
	Split = "fa-solid fa-split",
	SquareCheck = "fa-solid fa-square-check",
	SquareMinus = "fa-solid fa-square-minus",
	SquarePen = "fa-solid fa-square-pen",
	Star = "fa-solid fa-star",
	StepBackward = "fa-solid fa-step-backward",
	StepForward = "fa-solid fa-step-forward",
	Stethoscope = "fa-solid fa-stethoscope",
	Stop = "fa-solid fa-stop",
	//#endregion

	//#region T
	Table = "fa-solid fa-table",
	TableRows = "fa-solid fa-table-rows",
	Tablet = "fa-solid fa-tablet",
	Tag = "fa-solid fa-tag",
	Tags = "fa-solid fa-tags",
	Tasks = "fa-solid fa-tasks",
	ThumbsDown = "fa-solid fa-thumbs-down",
	ThumbsUp = "fa-solid fa-thumbs-up",
	Thumbtack = "fa-solid fa-thumbtack",
	Trash = "fa-solid fa-trash",
	TrashCanList = "fa-solid fa-trash-can-list",
	TrashUndo = "fa-solid fa-trash-undo",
	TrashXmark = "fa-solid fa-trash-xmark",
	TriangleExclamation = "fa-solid fa-triangle-exclamation",
	Truck = "fa-solid fa-truck",
	//#endregion

	//#region U
	Undo = "fa-solid fa-arrow-rotate-left",
	Unlock = "fa-solid fa-unlock",
	Upload = "fa-solid fa-upload",
	UsbDrive = "fa-solid fa-usb-drive",
	User = "fa-solid fa-user",
	UserCheck = "fa-solid fa-user-check",
	UserClock = "fa-solid fa-user-clock",
	UserDoctor = "fa-solid fa-user-doctor",
	UserDoctorHair = "fa-solid fa-user-doctor-hair",
	UserDoctorHairLong = "fa-solid fa-user-doctor-hair-long",
	UserGear = "fa-solid fa-user-gear",
	UserGroup = "fa-solid fa-user-group",
	UserHair = "fa-solid fa-user-hair",
	UserHairLong = "fa-solid fa-user-hair-long",
	UserHeadset = "fa-solid fa-user-headset",
	Users = "fa-solid fa-users",
	UserSecret = "fa-solid fa-user-secret",
	UsersMedical = "fa-solid fa-users-medical",
	UserTag = "fa-solid fa-user-tag",
	UserXmark = "fa-solid fa-user-xmark",
	//#endregion

	//#region V
	Video = "fa-solid fa-video",
	VideoSlash = "fa-solid fa-video-slash",
	Volume = "fa-solid fa-volume",
	VolumeHigh = "fa-solid fa-volume-high",
	VolumeLow = "fa-solid fa-volume-low",
	VolumeOff = "fa-solid fa-volume-off",
	VolumeSlash = "fa-solid fa-volume-slash",
	VolumeXmark = "fa-solid fa-volume-xmark",
	//#endregion

	//#region W
	Wifi = "fa-solid fa-wifi",
	WifiExclamation = "fa-solid fa-wifi-exclamation",
	WifiFair = "fa-solid fa-wifi-fair",
	WifiSlash = "fa-solid fa-wifi-slash",
	Window = "fa-solid fa-window",
	//#endregion

	//#region X
	Xmark = "fa-solid fa-xmark",
	//#endregion
}
//#endregion

//#region Icon Light
export enum IconClassicLight
{
	//#region A
	Add = "fa-light fa-plus",
	AddressCard = "fa-light fa-address-card",
	Alert = "fa-light fa-triangle-exclamation",
	AngleDown = "fa-light fa-angle-down",
	AngleLeft = "fa-light fa-angle-left",
	AngleRight = "fa-light fa-angle-right",
	AngleUp = "fa-light fa-angle-up",
	Aperture = "fa-light fa-aperture",
	ArrowDown = "fa-light fa-arrow-down",
	ArrowDownShortWide = "fa-light fa-arrow-down-short-wide",
	ArrowDownWideShort = "fa-light fa-arrow-down-wide-short",
	ArrowLeft = "fa-light fa-arrow-left",
	ArrowPointer = "fa-light fa-arrow-pointer",
	ArrowRight = "fa-light fa-arrow-right",
	ArrowRightToBracket = "fa-light fa-arrow-right-to-bracket",
	ArrowRightFromBracket = "fa-light fa-arrow-right-from-bracket",
	ArrowRotateRight = "fa-light fa-arrow-rotate-right",
	ArrowsRotate = "fa-light fa-arrows-rotate",
	ArrowUp = "fa-light fa-arrow-up",
	Asterisk = "fa-light fa-asterisk",
	At = "fa-light fa-at",
	Attachment = "fa-light fa-paperclip",
	//#endregion

	//#region B
	Back = "fa-light fa-angle-left",
	Backward = "fa-light fa-backward",
	BackwardFast = "fa-light fa-backward-fast",
	BackwardStep = "fa-light fa-backward-step",
	BalanceScale = "fa-light fa-balance-scale",
	BallotCheck = "fa-light fa-ballot-check",
	Ban = "fa-light fa-ban",
	Barcode = "fa-light fa-barcode",
	BarcodeScan = "fa-light fa-barcode-scan",
	Bars = "fa-light fa-bars",
	BarsSort = "fa-light fa-bars-sort",
	Bell = "fa-light fa-bell",
	BellSlash = "fa-light fa-bell-slash",
	Bolt = "fa-light fa-bolt",
	Book = "fa-light fa-book",
	BookOpen = "fa-light fa-book-open",
	Box = "fa-light fa-box",
	BoxArchive = "fa-light fa-box-archive",
	BriefCase = "fa-light fa-brief-case",
	Bug = "fa-light fa-bug",
	Burger = "fa-light fa-bars",
	//#endregion

	//#region C
	CakeCandles = "fa-light fa-cake-candles",
	Calendar = "fa-light fa-calendar",
	CalendarAlt = "fa-light fa-calendar-alt",
	CalendarCheck = "fa-light fa-calendar-check",
	CalendarDay = "fa-light fa-calendar-day",
	CalendarPlus = "fa-light fa-calendar-plus",
	Camera = "fa-light fa-camera",
	CameraAlt = "fa-light fa-camera-alt",
	CameraWeb = "fa-light fa-camera-web",
	CameraWebSlash = "fa-light fa-camera-web-slash",
	Capsules = "fa-light fa-capsules",
	CaretDown = "fa-light fa-caret-down",
	CaretLeft = "fa-light fa-caret-left",
	CaretRight = "fa-light fa-caret-right",
	CaretUp = "fa-light fa-caret-up",
	CartCirclePlus = "fa-light fa-cart-circle-plus",
	CartShopping = "fa-light fa-cart-shopping",
	ChartArea = "fa-light fa-chart-area",
	ChartBar = "fa-light fa-chart-bar",
	ChartColumn = "fa-light fa-chart-column",
	ChartLine = "fa-light fa-chart-line",
	ChartPie = "fa-light fa-chart-pie",
	ChartSimple = "fa-light fa-chart-simple",
	Chat = "fa-light fa-comment",
	Check = "fa-light fa-check",
	ChevronDown = "fa-light fa-chevron-down",
	ChevronLeft = "fa-light fa-chevron-left",
	ChevronRight = "fa-light fa-chevron-right",
	ChevronUp = "fa-light fa-chevron-up",
	Circle = "fa-light fa-circle",
	CircleCheck = "fa-light fa-circle-check",
	CircleExclamation = "fa-light fa-circle-exclamation",
	CircleInfo = "fa-light fa-circle-info",
	CircleStop = "fa-light fa-circle-stop",
	Clipboard = "fa-light fa-clipboard",
	ClipboardMedical = "fa-light fa-clipboard-medical",
	Clock = "fa-light fa-clock",
	ClockRotateLeft = "fa-light fa-clock-rotate-left",
	Close = "fa-light fa-xmark",
	Cloud = "fa-light fa-cloud",
	CloudArrowUp = "fa-light fa-cloud-arrow-up",
	CloudDownload = "fa-light fa-cloud-download",
	Code = "fa-light fa-code",
	CodeMerge = "fa-light fa-code-merge",
	Coins = "fa-light fa-coins",
	Collapse = "fa-light fa-compress",
	Comment = "fa-light fa-comment",
	CommentDots = "fa-light fa-comment-dots",
	CommentLines = "fa-light fa-comment-lines",
	Comments = "fa-light fa-comments",
	CommentSms = "fa-light fa-comment-sms",
	Compress = "fa-light fa-compress",
	Copy = "fa-light fa-copy",
	Copyright = "fa-light fa-copyright",
	CreditCard = "fa-light fa-credit-card",
	Crown = "fa-light fa-crown",
	//#endregion

	//#region D
	Database = "fa-light fa-database",
	Delete = "fa-light fa-xmark",
	DeleteLeft = "fa-light fa-delete-left",
	DeleteRight = "fa-light fa-delete-right",
	Desktop = "fa-light fa-desktop",
	Download = "fa-light fa-download",
	//#endregion

	//#region E
	Edit = "fa-light fa-pen",
	Eject = "fa-light fa-eject",
	Ellipsis = "fa-light fa-ellipsis",
	EllipsisVertical = "fa-light fa-ellipsis-vertical",
	Envelope = "fa-light fa-envelope",
	Eraser = "fa-light fa-eraser",
	EuroSign = "fa-light fa-euro-sign",
	Exclamation = "fa-light fa-exclamation",
	Expand = "fa-light fa-expand",
	Eye = "fa-light fa-eye",
	EyeSlash = "fa-light fa-eye-slash",
	//#endregion

	//#region F
	Family = "fa-light fa-family",
	FastBackward = "fa-light fa-fast-backward",
	FastForward = "fa-light fa-fast-forward",
	File = "fa-light fa-file",
	FileAudio = "fa-light fa-file-audio",
	FileContract = "fa-light fa-file-contract",
	FileDownload = "fa-light fa-file-download",
	FileExcel = "fa-light fa-file-excel",
	FileExport = "fa-light fa-file-export",
	FileImage = "fa-light fa-file-image",
	FileInvoice = "fa-light fa-file-invoice",
	FileImport = "fa-light fa-file-import",
	FileLines = "fa-light fa-file-lines",
	FileMusic = "fa-light fa-file-music",
	FilePdf = "fa-light fa-file-pdf",
	Files = "fa-light fa-file-files",
	FileSignature = "fa-light fa-file-signature",
	FileVideo = "fa-light fa-file-video",
	FileWord = "fa-light fa-file-word",
	FileZipper = "fa-light fa-file-zipper",
	Filter = "fa-light fa-filter",
	Flag = "fa-light fa-flag",
	FlagSwallowTail = "fa-light fa-flag-swallowtail",
	FloppyDisk = "fa-light fa-floppy-disk",
	Folder = "fa-light fa-folder",
	FolderOpen = "fa-light fa-folder-open",
	FontAwesome = "fa-light  fa-font-awesome",
	Forward = "fa-light fa-forward",
	ForwardStep = "fa-light fa-forward-step",
	ForwardFast = "fa-light fa-forward-fast",
	Futbol = "fa-light fa-futbol",
	//#endregion

	//#region G
	Gear = "fa-light fa-gear",
	Gears = "fa-light fa-gears",
	Globe = "fa-light fa-globe",
	//#endregion

	//#region H
	Hashtag = "fa-light fa-hashtag",
	HatWizard = "fa-light fa-hat-wizard",
	Headset = "fa-light fa-headset",
	Hospital = "fa-light fa-hospital",
	Hourglass = "fa-light fa-hourglass",
	HourglassClock = "fa-light fa-hourglass-clock",
	House = "fa-light fa-house",
	HouseMedical = "fa-light fa-house-medical",
	HouseUser = "fa-light fa-house-user",
	//#endregion

	//#region I
	Image = "fa-light fa-image",
	Inbox = "fa-light fa-inbox",
	InboxFull = "fa-light fa-inbox-full",
	Info = "fa-light fa-info",
	//#endregion

	//#region K
	Key = "fa-light fa-key",
	Keyboard = "fa-light fa-keyboard",
	KeySkeleton = "fa-light fa-key-skeleton",
	//#endregion

	//#region L
	Laptop = "fa-light fa-laptop",
	LaptopMedical = "fa-light fa-laptop-medical",
	LevelDown = "fa-light fa-level-down",
	LevelDownAlt = "fa-light fa-level-down-alt",
	LevelLeft = "fa-light fa-level-left",
	LevelLeftAlt = "fa-light fa-level-left-alt",
	LevelRight = "fa-light fa-level-right",
	LevelRightAlt = "fa-light fa-level-right-alt",
	LevelUp = "fa-light fa-level-up",
	LevelUpAlt = "fa-light fa-level-up-alt",
	Link = "fa-light fa-link",
	LinkExternal = "fa-light fa-arrow-up-right-from-square",
	LinkHorizontal = "fa-light fa-link-horizontal",
	LinkHorizontalSlash = "fa-light fa-link-horizontal-slash",
	LinkSimple = "fa-light fa-link-simple",
	LinkSimpleSlash = "fa-light fa-link-simple-slash",
	LinkSlash = "fa-light fa-link-slash",
	List = "fa-light fa-list",
	ListCheck = "fa-light fa-list-check",
	ListOl = "fa-light fa-list-ol",
	ListTree = "fa-light fa-list-tree",
	ListUl = "fa-light fa-list-ul",
	LocationArrow = "fa-light fa-location-arrow",
	LocationCrossHairs = "fa-light fa-location-crosshairs",
	LocationCheck = "fa-light fa-location-check",
	LocationDot = "fa-light fa-location-dot",
	Lock = "fa-light fa-lock",
	LockOpen = "fa-light fa-lock-open",
	Login = "fa-light fa-arrow-right-to-bracket",
	Logout = "fa-light fa-arrow-right-from-bracket",
	//#endregion

	//#region M
	MagnifyingGlass = "fa-light fa-magnifying-glass",
	MagnifyingGlassMinus = "fa-light fa-magnifying-glass-minus",
	MagnifyingGlassPlus = "fa-light fa-magnifying-glass-plus",
	Mail = "fa-light fa-envelope",
	Mailbox = "fa-light fa-mailbox",
	MailOpen = "fa-light fa-envelope-open",
	Map = "fa-light fa-map",
	MapLocation = "fa-light fa-map-location",
	MapLocationDot = "fa-light fa-map-location-dot",
	MapPin = "fa-light fa-map-pin",
	Maximize = "fa-light fa-maximize",
	Merge = "fa-light fa-merge",
	Message = "fa-light fa-message",
	MessageCode = "fa-light fa-message-code",
	MessageDots = "fa-light fa-message-dots",
	MessageLines = "fa-light fa-message-lines",
	Messages = "fa-light fa-messages",
	Microphone = "fa-light fa-microphone",
	MicrophoneLines = "fa-light fa-microphone-lines",
	MicrophoneLinesSlash = "fa-light fa-microphone-lines-slash",
	MicrophoneSlash = "fa-light fa-microphone-slash",
	Microscope = "fa-light fa-microscope",
	Minimize = "fa-light fa-minimize",
	Minus = "fa-light fa-minus",
	Mobile = "fa-light fa-mobile",
	MobileNotch = "fa-light fa-mobile-notch",
	MoneyCheckDollarPen = "fa-light fa-money-check-dollar-pen",
	Music = "fa-light fa-music",
	MusicSlash = "fa-light fa-music-slash",
	//#endregion

	//#region Newspaper
	NewsPaper = "fa-light fa-newspaper",
	//#endregion

	//#region P
	Palette = "fa-light fa-palette",
	PaperClip = "fa-light fa-paperclip",
	PaperClipVertical = "fa-light fa-paperclip-vertical",
	PaperPlane = "fa-light fa-paper-plane",
	PaperPlaneTop = "fa-light fa-paper-plane-top",
	Paste = "fa-light fa-paste",
	Pause = "fa-light fa-pause",
	Pen = "fa-light fa-pen",
	Pencil = "fa-light fa-pencil",
	PenToSquare = "fa-light fa-pen-to-square",
	PeopleArrowsLeftRight = "fa-light fa-people-arrows-left-right",
	Percentage = "fa-light fa-percentage",
	PersonChalkboard = "fa-light fa-person-chalkboard",
	PersonMilitaryRifle = "fa-light fa-person-military-rifle",
	Phone = "fa-light fa-phone",
	Play = "fa-light fa-play",
	PlayPause = "fa-light fa-play-pause",
	Plus = "fa-light fa-plus",
	Print = "fa-light fa-print",
	Pumo = "fa-light fa-font-awesome",
	//#endregion

	//#region Q
	Question = "fa-light fa-question",
	//#endregion

	//#region R
	Redo = "fa-light fa-redo",
	RedoAlt = "fa-light fa-redo-alt",
	Refresh = "fa-light fa-arrows-rotate",
	Remove = "fa-light fa-xmark",
	Repeat = "fa-light fa-repeat",
	Reply = "fa-light fa-reply",
	ReplyAll = "fa-light fa-reply-all",
	RightFromBracket = "fa-light fa-right-from-bracket",
	RightToBracket = "fa-light fa-right-to-bracket",
	Rotate = "fa-light fa-rotate",
	RotateLeft = "fa-light fa-rotate-left",
	//#endregion

	//#region S
	SackDollar = "fa-light fa-sack-dollar",
	Save = "fa-light fa-floppy-disk",
	Scissors = "fa-light fa-scissors",
	ScrewdriverWrench = "fa-light fa-screwdriver-wrench",
	Search = "fa-light fa-magnifying-glass",
	SensorTriangleExclamation = "fa-light fa-sensor-triangle-exclamation",
	Settings = "fa-light fa-gear",
	Share = "fa-light fa-share",
	ShareAll = "fa-light fa-share-all",
	ShareNodes = "fa-light fa-share-nodes",
	ShareFromSquare = "fa-light fa-share-from-square",
	ShieldCheck = "fa-light fa-shield-check",
	Ship = "fa-light fa-ship",
	Sitemap = "fa-light fa-sitemap",
	Soccer = "fa-light fa-futbol",
	Sort = "fa-light fa-sort",
	SortDown = "fa-light fa-sort-down",
	SortUp = "fa-light fa-sort-up",
	Spinner = "fa-light fa-spinner",
	Split = "fa-light fa-split",
	SquareCheck = "fa-light fa-square-check",
	SquareMinus = "fa-light fa-square-minus",
	SquarePen = "fa-light fa-square-pen",
	Stamp = "fa-light fa-stamp",
	Star = "fa-light fa-star",
	StepBackward = "fa-light fa-step-backward",
	StepForward = "fa-light fa-step-forward",
	Stethoscope = "fa-light fa-stethoscope",
	Stop = "fa-light fa-stop",
	//#endregion

	//#region T
	Table = "fa-light fa-table",
	TableRows = "fa-light fa-table-rows",
	Tablet = "fa-light fa-tablet",
	Tag = "fa-light fa-tag",
	Tags = "fa-light fa-tags",
	Tasks = "fa-light fa-tasks",
	ThumbsDown = "fa-light fa-thumbs-down",
	ThumbsUp = "fa-light fa-thumbs-up",
	Thumbtack = "fa-light fa-thumbtack",
	Timer = "fa-light fa-timer",
	Trash = "fa-light fa-trash",
	TrashCanList = "fa-light fa-trash-can-list",
	TrashUndo = "fa-light fa-trash-undo",
	TrashXmark = "fa-light fa-trash-xmark",
	TriangleExclamation = "fa-light fa-triangle-exclamation",
	Truck = "fa-light fa-truck",
	//#endregion

	//#region U
	Undo = "fa-light fa-arrow-rotate-left",
	Unlock = "fa-light fa-unlock",
	Upload = "fa-light fa-upload",
	UsbDrive = "fa-light fa-usb-drive",
	User = "fa-light fa-user",
	UserCheck = "fa-light fa-user-check",
	UserClock = "fa-light fa-user-clock",
	UserDoctor = "fa-light fa-user-doctor",
	UserDoctorHair = "fa-light fa-user-doctor-hair",
	UserDoctorHairLong = "fa-light fa-user-doctor-hair-long",
	UserGear = "fa-light fa-user-gear",
	UserGroup = "fa-light fa-user-group",
	UserHair = "fa-light fa-user-hair",
	UserHairLong = "fa-light fa-user-hair-long",
	UserHeadset = "fa-light fa-user-headset",
	Users = "fa-light fa-users",
	UserSecret = "fa-light fa-user-secret",
	UsersMedical = "fa-light fa-users-medical",
	UserTag = "fa-light fa-user-tag",
	UserXmark = "fa-light fa-user-xmark",
	//#endregion

	//#region V
	Video = "fa-light fa-video",
	VideoSlash = "fa-light fa-video-slash",
	Volume = "fa-light fa-volume",
	VolumeHigh = "fa-light fa-volume-high",
	VolumeLow = "fa-light fa-volume-low",
	VolumeOff = "fa-light fa-volume-off",
	VolumeSlash = "fa-light fa-volume-slash",
	VolumeXmark = "fa-light fa-volume-xmark",
	//#endregion

	//#region W
	Wifi = "fa-light fa-wifi",
	WifiExclamation = "fa-light fa-wifi-exclamation",
	WifiFair = "fa-light fa-wifi-fair",
	WifiSlash = "fa-light fa-wifi-slash",
	Window = "fa-light fa-window",
	//#endregion

	//#region X
	Xmark = "fa-light fa-xmark",
	//#endregion
}
//#endregion

//#region Icon Regular
export enum IconClassicRegular
{
	//#region A
	Add = "fa-regular fa-plus",
	AddressCard = "fa-regular fa-address-card",
	Alert = "fa-regular fa-triangle-exclamation",
	AngleDown = "fa-regular fa-angle-down",
	AngleLeft = "fa-regular fa-angle-left",
	AngleRight = "fa-regular fa-angle-right",
	AngleUp = "fa-regular fa-angle-up",
	Aperture = "fa-regular fa-aperture",
	ArrowDown = "fa-regular fa-arrow-down",
	ArrowDownShortWide = "fa-regular fa-arrow-down-short-wide",
	ArrowDownWideShort = "fa-regular fa-arrow-down-wide-short",
	ArrowLeft = "fa-regular fa-arrow-left",
	ArrowPointer = "fa-regular fa-arrow-pointer",
	ArrowRight = "fa-regular fa-arrow-right",
	ArrowRightToBracket = "fa-regular fa-arrow-right-to-bracket",
	ArrowRightFromBracket = "fa-regular fa-arrow-right-from-bracket",
	ArrowRotateRight = "fa-regular fa-arrow-rotate-right",
	ArrowsRotate = "fa-regular fa-arrows-rotate",
	ArrowUp = "fa-regular fa-arrow-up",
	Asterisk = "fa-regular fa-asterisk",
	At = "fa-regular fa-at",
	Attachment = "fa-regular fa-paperclip",
	//#endregion

	//#region B
	Back = "fa-regular fa-angle-left",
	Backward = "fa-regular fa-backward",
	BackwardFast = "fa-regular fa-backward-fast",
	BackwardStep = "fa-regular fa-backward-step",
	BalanceScale = "fa-regular fa-balance-scale",
	BallotCheck = "fa-regular fa-ballot-check",
	Ban = "fa-regular fa-ban",
	Barcode = "fa-regular fa-barcode",
	BarcodeScan = "fa-regular fa-barcode-scan",
	Bars = "fa-regular fa-bars",
	BarsSort = "fa-regular fa-bars-sort",
	Bell = "fa-regular fa-bell",
	BellSlash = "fa-regular fa-bell-slash",
	Bolt = "fa-regular fa-bolt",
	Book = "fa-regular fa-book",
	BookOpen = "fa-regular fa-book-open",
	Box = "fa-regular fa-box",
	BoxArchive = "fa-regular fa-box-archive",
	BriefCase = "fa-regular fa-brief-case",
	Bug = "fa-regular fa-bug",
	Burger = "fa-regular fa-bars",
	//#endregion

	//#region C
	CakeCandles = "fa-regular fa-cake-candles",
	Calendar = "fa-regular fa-calendar",
	CalendarAlt = "fa-regular fa-calendar-alt",
	CalendarCheck = "fa-regular fa-calendar-check",
	CalendarDay = "fa-regular fa-calendar-day",
	CalendarPlus = "fa-regular fa-calendar-plus",
	Camera = "fa-regular fa-camera",
	CameraAlt = "fa-regular fa-camera-alt",
	CameraWeb = "fa-regular fa-camera-web",
	CameraWebSlash = "fa-regular fa-camera-web-slash",
	Capsules = "fa-regular fa-capsules",
	CaretDown = "fa-regular fa-caret-down",
	CaretLeft = "fa-regular fa-caret-left",
	CaretRight = "fa-regular fa-caret-right",
	CaretUp = "fa-regular fa-caret-up",
	CartCirclePlus = "fa-regular fa-cart-circle-plus",
	CartShopping = "fa-regular fa-cart-shopping",
	ChartArea = "fa-regular fa-chart-area",
	ChartBar = "fa-regular fa-chart-bar",
	ChartColumn = "fa-regular fa-chart-column",
	ChartLine = "fa-regular fa-chart-line",
	ChartPie = "fa-regular fa-chart-pie",
	ChartSimple = "fa-regular fa-chart-simple",
	Chat = "fa-regular fa-comment",
	Check = "fa-regular fa-check",
	ChevronDown = "fa-regular fa-chevron-down",
	ChevronLeft = "fa-regular fa-chevron-left",
	ChevronRight = "fa-regular fa-chevron-right",
	ChevronUp = "fa-regular fa-chevron-up",
	Circle = "fa-regular fa-circle",
	CircleCheck = "fa-regular fa-circle-check",
	CircleExclamation = "fa-regular fa-circle-exclamation",
	CircleInfo = "fa-regular fa-circle-info",
	CircleStop = "fa-regular fa-circle-stop",
	Clipboard = "fa-regular fa-clipboard",
	ClipboardMedical = "fa-regular fa-clipboard-medical",
	Clock = "fa-regular fa-clock",
	ClockRotateLeft = "fa-regular fa-clock-rotate-left",
	Close = "fa-regular fa-xmark",
	Cloud = "fa-regular fa-cloud",
	CloudArrowUp = "fa-regular fa-cloud-arrow-up",
	CloudDownload = "fa-regular fa-cloud-download",
	Code = "fa-regular fa-code",
	CodeMerge = "fa-regular fa-code-merge",
	Coins = "fa-regular fa-coins",
	Collapse = "fa-regular fa-compress",
	Comment = "fa-regular fa-comment",
	CommentDots = "fa-regular fa-comment-dots",
	CommentLines = "fa-regular fa-comment-lines",
	Comments = "fa-regular fa-comments",
	CommentSms = "fa-regular fa-comment-sms",
	Compress = "fa-regular fa-compress",
	Copy = "fa-regular fa-copy",
	Copyright = "fa-regular fa-copyright",
	CreditCard = "fa-regular fa-credit-card",
	Crown = "fa-regular fa-crown",
	//#endregion

	//#region D
	Database = "fa-regular fa-database",
	Delete = "fa-regular fa-xmark",
	DeleteLeft = "fa-regular fa-delete-left",
	DeleteRight = "fa-regular fa-delete-right",
	Desktop = "fa-regular fa-desktop",
	Download = "fa-regular fa-download",
	//#endregion

	//#region E
	Edit = "fa-regular fa-pen",
	Eject = "fa-regular fa-eject",
	Ellipsis = "fa-regular fa-ellipsis",
	EllipsisVertical = "fa-regular fa-ellipsis-vertical",
	Envelope = "fa-regular fa-envelope",
	Eraser = "fa-regular fa-eraser",
	EuroSign = "fa-regular fa-euro-sign",
	Exclamation = "fa-regular fa-exclamation",
	Expand = "fa-regular fa-expand",
	Eye = "fa-regular fa-eye",
	EyeSlash = "fa-regular fa-eye-slash",
	//#endregion

	//#region F
	Family = "fa-regular fa-family",
	FastBackward = "fa-regular fa-fast-backward",
	FastForward = "fa-regular fa-fast-forward",
	File = "fa-regular fa-file",
	FileAudio = "fa-regular fa-file-audio",
	FileContract = "fa-regular fa-file-contract",
	FileDownload = "fa-regular fa-file-download",
	FileExcel = "fa-regular fa-file-excel",
	FileExport = "fa-regular fa-file-export",
	FileImage = "fa-regular fa-file-image",
	FileInvoice = "fa-regular fa-file-invoice",
	FileImport = "fa-regular fa-file-import",
	FileLines = "fa-regular fa-file-lines",
	FileMusic = "fa-regular fa-file-music",
	FilePdf = "fa-regular fa-file-pdf",
	Files = "fa-regular fa-file-files",
	FileSignature = "fa-regular fa-file-signature",
	FileVideo = "fa-regular fa-file-video",
	FileWord = "fa-regular fa-file-word",
	FileZipper = "fa-regular fa-file-zipper",
	Filter = "fa-regular fa-filter",
	Flag = "fa-regular fa-flag",
	FlagSwallowTail = "fa-regular fa-flag-swallowtail",
	FloppyDisk = "fa-regular fa-floppy-disk",
	Folder = "fa-regular fa-folder",
	FolderOpen = "fa-regular fa-folder-open",
	FontAwesome = "fa-regular  fa-font-awesome",
	Forward = "fa-regular fa-forward",
	ForwardStep = "fa-regular fa-forward-step",
	ForwardFast = "fa-regular fa-forward-fast",
	Futbol = "fa-regular fa-futbol",
	//#endregion

	//#region G
	Gear = "fa-regular fa-gear",
	Gears = "fa-regular fa-gears",
	Globe = "fa-regular fa-globe",
	//#endregion

	//#region H
	Hashtag = "fa-regular fa-hashtag",
	HatWizard = "fa-regular fa-hat-wizard",
	Headset = "fa-regular fa-headset",
	Hospital = "fa-regular fa-hospital",
	Hourglass = "fa-regular fa-hourglass",
	HourglassClock = "fa-regular fa-hourglass-clock",
	House = "fa-regular fa-house",
	HouseMedical = "fa-regular fa-house-medical",
	HouseUser = "fa-regular fa-house-user",
	//#endregion

	//#region I
	Image = "fa-regular fa-image",
	Inbox = "fa-regular fa-inbox",
	InboxFull = "fa-regular fa-inbox-full",
	Info = "fa-regular fa-info",
	//#endregion

	//#region K
	Key = "fa-regular fa-key",
	Keyboard = "fa-regular fa-keyboard",
	KeySkeleton = "fa-regular fa-key-skeleton",
	//#endregion

	//#region L
	Laptop = "fa-regular fa-laptop",
	LaptopMedical = "fa-regular fa-laptop-medical",
	LevelDown = "fa-regular fa-level-down",
	LevelDownAlt = "fa-regular fa-level-down-alt",
	LevelLeft = "fa-regular fa-level-left",
	LevelLeftAlt = "fa-regular fa-level-left-alt",
	LevelRight = "fa-regular fa-level-right",
	LevelRightAlt = "fa-regular fa-level-right-alt",
	LevelUp = "fa-regular fa-level-up",
	LevelUpAlt = "fa-regular fa-level-up-alt",
	Link = "fa-regular fa-link",
	LinkExternal = "fa-regular fa-arrow-up-right-from-square",
	LinkHorizontal = "fa-regular fa-link-horizontal",
	LinkHorizontalSlash = "fa-regular fa-link-horizontal-slash",
	LinkSimple = "fa-regular fa-link-simple",
	LinkSimpleSlash = "fa-regular fa-link-simple-slash",
	LinkSlash = "fa-regular fa-link-slash",
	List = "fa-regular fa-list",
	ListCheck = "fa-regular fa-list-check",
	ListOl = "fa-regular fa-list-ol",
	ListTree = "fa-regular fa-list-tree",
	ListUl = "fa-regular fa-list-ul",
	LocationArrow = "fa-regular fa-location-arrow",
	LocationCrossHairs = "fa-regular fa-location-crosshairs",
	LocationCheck = "fa-regular fa-location-check",
	LocationDot = "fa-regular fa-location-dot",
	Lock = "fa-regular fa-lock",
	LockOpen = "fa-regular fa-lock-open",
	Login = "fa-regular fa-arrow-right-to-bracket",
	Logout = "fa-regular fa-arrow-right-from-bracket",
	//#endregion

	//#region M
	MagnifyingGlass = "fa-regular fa-magnifying-glass",
	MagnifyingGlassMinus = "fa-regular fa-magnifying-glass-minus",
	MagnifyingGlassPlus = "fa-regular fa-magnifying-glass-plus",
	Mail = "fa-regular fa-envelope",
	Mailbox = "fa-regular fa-mailbox",
	MailOpen = "fa-regular fa-envelope-open",
	Map = "fa-regular fa-map",
	MapLocation = "fa-regular fa-map-location",
	MapLocationDot = "fa-regular fa-map-location-dot",
	MapPin = "fa-regular fa-map-pin",
	Maximize = "fa-regular fa-maximize",
	Merge = "fa-regular fa-merge",
	Message = "fa-regular fa-message",
	MessageCode = "fa-regular fa-message-code",
	MessageDots = "fa-regular fa-message-dots",
	MessageLines = "fa-regular fa-message-lines",
	Messages = "fa-regular fa-messages",
	Microphone = "fa-regular fa-microphone",
	MicrophoneLines = "fa-regular fa-microphone-lines",
	MicrophoneLinesSlash = "fa-regular fa-microphone-lines-slash",
	MicrophoneSlash = "fa-regular fa-microphone-slash",
	Microscope = "fa-regular fa-microscope",
	Minimize = "fa-regular fa-minimize",
	Minus = "fa-regular fa-minus",
	Mobile = "fa-regular fa-mobile",
	MobileNotch = "fa-regular fa-mobile-notch",
	MoneyCheckDollarPen = "fa-regular fa-money-check-dollar-pen",
	Music = "fa-regular fa-music",
	MusicSlash = "fa-regular fa-music-slash",
	//#endregion

	//#region Newspaper
	NewsPaper = "fa-regular fa-newspaper",
	//#endregion

	//#region P
	Palette = "fa-regular fa-palette",
	PaperClip = "fa-regular fa-paperclip",
	PaperClipVertical = "fa-regular fa-paperclip-vertical",
	PaperPlane = "fa-regular fa-paper-plane",
	PaperPlaneTop = "fa-regular fa-paper-plane-top",
	Paste = "fa-regular fa-paste",
	Pause = "fa-regular fa-pause",
	Pen = "fa-regular fa-pen",
	Pencil = "fa-regular fa-pencil",
	PenToSquare = "fa-regular fa-pen-to-square",
	PeopleArrowsLeftRight = "fa-regular fa-people-arrows-left-right",
	Percentage = "fa-regular fa-percentage",
	PersonChalkboard = "fa-regular fa-person-chalkboard",
	PersonMilitaryRifle = "fa-regular fa-person-military-rifle",
	Phone = "fa-regular fa-phone",
	Play = "fa-regular fa-play",
	PlayPause = "fa-regular fa-play-pause",
	Plus = "fa-regular fa-plus",
	Print = "fa-regular fa-print",
	Pumo = "fa-regular fa-font-awesome",
	//#endregion

	//#region Q
	Question = "fa-regular fa-question",
	//#endregion

	//#region R
	Redo = "fa-regular fa-redo",
	RedoAlt = "fa-regular fa-redo-alt",
	Refresh = "fa-regular fa-arrows-rotate",
	Remove = "fa-regular fa-xmark",
	Repeat = "fa-regular fa-repeat",
	Reply = "fa-regular fa-reply",
	ReplyAll = "fa-regular fa-reply-all",
	RightFromBracket = "fa-regular fa-right-from-bracket",
	RightToBracket = "fa-regular fa-right-to-bracket",
	Rotate = "fa-regular fa-rotate",
	RotateLeft = "fa-regular fa-rotate-left",
	//#endregion

	//#region S
	SackDollar = "fa-regular fa-sack-dollar",
	Save = "fa-regular fa-floppy-disk",
	Scissors = "fa-regular fa-scissors",
	ScrewdriverWrench = "fa-regular fa-screwdriver-wrench",
	Search = "fa-regular fa-magnifying-glass",
	SensorTriangleExclamation = "fa-regular fa-sensor-triangle-exclamation",
	Settings = "fa-regular fa-gear",
	Share = "fa-regular fa-share",
	ShareAll = "fa-regular fa-share-all",
	ShareNodes = "fa-regular fa-share-nodes",
	ShareFromSquare = "fa-regular fa-share-from-square",
	ShieldCheck = "fa-regular fa-shield-check",
	Ship = "fa-regular fa-ship",
	Sitemap = "fa-regular fa-sitemap",
	Soccer = "fa-regular fa-futbol",
	Sort = "fa-regular fa-sort",
	SortDown = "fa-regular fa-sort-down",
	SortUp = "fa-regular fa-sort-up",
	Spinner = "fa-regular fa-spinner",
	Split = "fa-regular fa-split",
	SquareCheck = "fa-regular fa-square-check",
	SquareMinus = "fa-regular fa-square-minus",
	SquarePen = "fa-regular fa-square-pen",
	Stamp = "fa-regular fa-stamp",
	Star = "fa-regular fa-star",
	StepBackward = "fa-regular fa-step-backward",
	StepForward = "fa-regular fa-step-forward",
	Stethoscope = "fa-regular fa-stethoscope",
	Stop = "fa-regular fa-stop",
	//#endregion

	//#region T
	Table = "fa-regular fa-table",
	TableRows = "fa-regular fa-table-rows",
	Tablet = "fa-regular fa-tablet",
	Tag = "fa-regular fa-tag",
	Tags = "fa-regular fa-tags",
	Tasks = "fa-regular fa-tasks",
	ThumbsDown = "fa-regular fa-thumbs-down",
	ThumbsUp = "fa-regular fa-thumbs-up",
	Thumbtack = "fa-regular fa-thumbtack",
	Timer = "fa-regular fa-timer",
	Trash = "fa-regular fa-trash",
	TrashCanList = "fa-regular fa-trash-can-list",
	TrashUndo = "fa-regular fa-trash-undo",
	TrashXmark = "fa-regular fa-trash-xmark",
	TriangleExclamation = "fa-regular fa-triangle-exclamation",
	Truck = "fa-regular fa-truck",
	//#endregion

	//#region U
	Undo = "fa-regular fa-arrow-rotate-left",
	Unlock = "fa-regular fa-unlock",
	Upload = "fa-regular fa-upload",
	UsbDrive = "fa-regular fa-usb-drive",
	User = "fa-regular fa-user",
	UserCheck = "fa-regular fa-user-check",
	UserClock = "fa-regular fa-user-clock",
	UserDoctor = "fa-regular fa-user-doctor",
	UserDoctorHair = "fa-regular fa-user-doctor-hair",
	UserDoctorHairLong = "fa-regular fa-user-doctor-hair-long",
	UserGear = "fa-regular fa-user-gear",
	UserGroup = "fa-regular fa-user-group",
	UserHair = "fa-regular fa-user-hair",
	UserHairLong = "fa-regular fa-user-hair-long",
	UserHeadset = "fa-regular fa-user-headset",
	Users = "fa-regular fa-users",
	UserSecret = "fa-regular fa-user-secret",
	UsersMedical = "fa-regular fa-users-medical",
	UserTag = "fa-regular fa-user-tag",
	UserXmark = "fa-regular fa-user-xmark",
	//#endregion

	//#region V
	Video = "fa-regular fa-video",
	VideoSlash = "fa-regular fa-video-slash",
	Volume = "fa-regular fa-volume",
	VolumeHigh = "fa-regular fa-volume-high",
	VolumeLow = "fa-regular fa-volume-low",
	VolumeOff = "fa-regular fa-volume-off",
	VolumeSlash = "fa-regular fa-volume-slash",
	VolumeXmark = "fa-regular fa-volume-xmark",
	//#endregion

	//#region W
	Wifi = "fa-regular fa-wifi",
	WifiExclamation = "fa-regular fa-wifi-exclamation",
	WifiFair = "fa-regular fa-wifi-fair",
	WifiSlash = "fa-regular fa-wifi-slash",
	Window = "fa-regular fa-window",
	//#endregion

	//#region X
	Xmark = "fa-regular fa-xmark",
	//#endregion
}
//#endregion

//#region Icon Duotone
export enum IconClassicDuotone
{
	//#region A
	Add = "fa-duotone fa-plus",
	AddressCard = "fa-duotone fa-address-card",
	Alert = "fa-duotone fa-triangle-exclamation",
	AngleDown = "fa-duotone fa-angle-down",
	AngleLeft = "fa-duotone fa-angle-left",
	AngleRight = "fa-duotone fa-angle-right",
	AngleUp = "fa-duotone fa-angle-up",
	Aperture = "fa-duotone fa-aperture",
	ArrowDown = "fa-duotone fa-arrow-down",
	ArrowDownShortWide = "fa-duotone fa-arrow-down-short-wide",
	ArrowDownWideShort = "fa-duotone fa-arrow-down-wide-short",
	ArrowLeft = "fa-duotone fa-arrow-left",
	ArrowPointer = "fa-duotone fa-arrow-pointer",
	ArrowRight = "fa-duotone fa-arrow-right",
	ArrowRightToBracket = "fa-duotone fa-arrow-right-to-bracket",
	ArrowRightFromBracket = "fa-duotone fa-arrow-right-from-bracket",
	ArrowRotateRight = "fa-duotone fa-arrow-rotate-right",
	ArrowsRotate = "fa-duotone fa-arrows-rotate",
	ArrowUp = "fa-duotone fa-arrow-up",
	Asterisk = "fa-duotone fa-asterisk",
	At = "fa-duotone fa-at",
	Attachment = "fa-duotone fa-paperclip",
	//#endregion

	//#region B
	Back = "fa-duotone fa-angle-left",
	Backward = "fa-duotone fa-backward",
	BackwardFast = "fa-duotone fa-backward-fast",
	BackwardStep = "fa-duotone fa-backward-step",
	BalanceScale = "fa-duotone fa-balance-scale",
	BallotCheck = "fa-duotone fa-ballot-check",
	Ban = "fa-duotone fa-ban",
	Barcode = "fa-duotone fa-barcode",
	BarcodeScan = "fa-duotone fa-barcode-scan",
	Bars = "fa-duotone fa-bars",
	BarsSort = "fa-duotone fa-bars-sort",
	Bell = "fa-duotone fa-bell",
	BellSlash = "fa-duotone fa-bell-slash",
	Bolt = "fa-duotone fa-bolt",
	Book = "fa-duotone fa-book",
	BookOpen = "fa-duotone fa-book-open",
	Box = "fa-duotone fa-box",
	BoxArchive = "fa-duotone fa-box-archive",
	BriefCase = "fa-duotone fa-brief-case",
	Bug = "fa-duotone fa-bug",
	Burger = "fa-duotone fa-bars",
	//#endregion

	//#region C
	CakeCandles = "fa-duotone fa-cake-candles",
	Calendar = "fa-duotone fa-calendar",
	CalendarAlt = "fa-duotone fa-calendar-alt",
	CalendarCheck = "fa-duotone fa-calendar-check",
	CalendarDay = "fa-duotone fa-calendar-day",
	CalendarPlus = "fa-duotone fa-calendar-plus",
	Camera = "fa-duotone fa-camera",
	CameraAlt = "fa-duotone fa-camera-alt",
	CameraWeb = "fa-duotone fa-camera-web",
	CameraWebSlash = "fa-duotone fa-camera-web-slash",
	Capsules = "fa-duotone fa-capsules",
	CaretDown = "fa-duotone fa-caret-down",
	CaretLeft = "fa-duotone fa-caret-left",
	CaretRight = "fa-duotone fa-caret-right",
	CaretUp = "fa-duotone fa-caret-up",
	CartCirclePlus = "fa-duotone fa-cart-circle-plus",
	CartShopping = "fa-duotone fa-cart-shopping",
	ChartArea = "fa-duotone fa-chart-area",
	ChartBar = "fa-duotone fa-chart-bar",
	ChartColumn = "fa-duotone fa-chart-column",
	ChartLine = "fa-duotone fa-chart-line",
	ChartPie = "fa-duotone fa-chart-pie",
	ChartSimple = "fa-duotone fa-chart-simple",
	Chat = "fa-duotone fa-comment",
	Check = "fa-duotone fa-check",
	ChevronDown = "fa-duotone fa-chevron-down",
	ChevronLeft = "fa-duotone fa-chevron-left",
	ChevronRight = "fa-duotone fa-chevron-right",
	ChevronUp = "fa-duotone fa-chevron-up",
	Circle = "fa-duotone fa-circle",
	CircleCheck = "fa-duotone fa-circle-check",
	CircleExclamation = "fa-duotone fa-circle-exclamation",
	CircleInfo = "fa-duotone fa-circle-info",
	CircleStop = "fa-duotone fa-circle-stop",
	Clipboard = "fa-duotone fa-clipboard",
	ClipboardMedical = "fa-duotone fa-clipboard-medical",
	Clock = "fa-duotone fa-clock",
	ClockRotateLeft = "fa-duotone fa-clock-rotate-left",
	Close = "fa-duotone fa-xmark",
	Cloud = "fa-duotone fa-cloud",
	CloudArrowUp = "fa-duotone fa-cloud-arrow-up",
	CloudDownload = "fa-duotone fa-cloud-download",
	Code = "fa-duotone fa-code",
	CodeMerge = "fa-duotone fa-code-merge",
	Coins = "fa-duotone fa-coins",
	Collapse = "fa-duotone fa-compress",
	Comment = "fa-duotone fa-comment",
	CommentDots = "fa-duotone fa-comment-dots",
	CommentLines = "fa-duotone fa-comment-lines",
	Comments = "fa-duotone fa-comments",
	CommentSms = "fa-duotone fa-comment-sms",
	Compress = "fa-duotone fa-compress",
	Copy = "fa-duotone fa-copy",
	Copyright = "fa-duotone fa-copyright",
	CreditCard = "fa-duotone fa-credit-card",
	Crown = "fa-duotone fa-crown",
	//#endregion

	//#region D
	Database = "fa-duotone fa-database",
	Delete = "fa-duotone fa-xmark",
	DeleteLeft = "fa-duotone fa-delete-left",
	DeleteRight = "fa-duotone fa-delete-right",
	Desktop = "fa-duotone fa-desktop",
	Download = "fa-duotone fa-download",
	//#endregion

	//#region E
	Edit = "fa-duotone fa-pen",
	Eject = "fa-duotone fa-eject",
	Ellipsis = "fa-duotone fa-ellipsis",
	EllipsisVertical = "fa-duotone fa-ellipsis-vertical",
	Envelope = "fa-duotone fa-envelope",
	Eraser = "fa-duotone fa-eraser",
	EuroSign = "fa-duotone fa-euro-sign",
	Exclamation = "fa-duotone fa-exclamation",
	Expand = "fa-duotone fa-expand",
	Eye = "fa-duotone fa-eye",
	EyeSlash = "fa-duotone fa-eye-slash",
	//#endregion

	//#region F
	Family = "fa-duotone fa-family",
	FastBackward = "fa-duotone fa-fast-backward",
	FastForward = "fa-duotone fa-fast-forward",
	File = "fa-duotone fa-file",
	FileAudio = "fa-duotone fa-file-audio",
	FileContract = "fa-duotone fa-file-contract",
	FileDownload = "fa-duotone fa-file-download",
	FileExcel = "fa-duotone fa-file-excel",
	FileExport = "fa-duotone fa-file-export",
	FileImage = "fa-duotone fa-file-image",
	FileInvoice = "fa-duotone fa-file-invoice",
	FileImport = "fa-duotone fa-file-import",
	FileLines = "fa-duotone fa-file-lines",
	FileMusic = "fa-duotone fa-file-music",
	FilePdf = "fa-duotone fa-file-pdf",
	Files = "fa-duotone fa-file-files",
	FileSignature = "fa-duotone fa-file-signature",
	FileVideo = "fa-duotone fa-file-video",
	FileWord = "fa-duotone fa-file-word",
	FileZipper = "fa-duotone fa-file-zipper",
	Filter = "fa-duotone fa-filter",
	Flag = "fa-duotone fa-flag",
	FlagSwallowTail = "fa-duotone fa-flag-swallowtail",
	FloppyDisk = "fa-duotone fa-floppy-disk",
	Folder = "fa-duotone fa-folder",
	FolderOpen = "fa-duotone fa-folder-open",
	FontAwesome = "fa-duotone  fa-font-awesome",
	Forward = "fa-duotone fa-forward",
	ForwardStep = "fa-duotone fa-forward-step",
	ForwardFast = "fa-duotone fa-forward-fast",
	Futbol = "fa-duotone fa-futbol",
	//#endregion

	//#region G
	Gear = "fa-duotone fa-gear",
	Gears = "fa-duotone fa-gears",
	Globe = "fa-duotone fa-globe",
	//#endregion

	//#region H
	Hashtag = "fa-duotone fa-hashtag",
	HatWizard = "fa-duotone fa-hat-wizard",
	Headset = "fa-duotone fa-headset",
	Hospital = "fa-duotone fa-hospital",
	Hourglass = "fa-duotone fa-hourglass",
	HourglassClock = "fa-duotone fa-hourglass-clock",
	House = "fa-duotone fa-house",
	HouseMedical = "fa-duotone fa-house-medical",
	HouseUser = "fa-duotone fa-house-user",
	//#endregion

	//#region I
	Image = "fa-duotone fa-image",
	Inbox = "fa-duotone fa-inbox",
	InboxFull = "fa-duotone fa-inbox-full",
	Info = "fa-duotone fa-info",
	//#endregion

	//#region K
	Key = "fa-duotone fa-key",
	Keyboard = "fa-duotone fa-keyboard",
	KeySkeleton = "fa-duotone fa-key-skeleton",
	//#endregion

	//#region L
	Laptop = "fa-duotone fa-laptop",
	LaptopMedical = "fa-duotone fa-laptop-medical",
	LevelDown = "fa-duotone fa-level-down",
	LevelDownAlt = "fa-duotone fa-level-down-alt",
	LevelLeft = "fa-duotone fa-level-left",
	LevelLeftAlt = "fa-duotone fa-level-left-alt",
	LevelRight = "fa-duotone fa-level-right",
	LevelRightAlt = "fa-duotone fa-level-right-alt",
	LevelUp = "fa-duotone fa-level-up",
	LevelUpAlt = "fa-duotone fa-level-up-alt",
	Link = "fa-duotone fa-link",
	LinkExternal = "fa-duotone fa-arrow-up-right-from-square",
	LinkHorizontal = "fa-duotone fa-link-horizontal",
	LinkHorizontalSlash = "fa-duotone fa-link-horizontal-slash",
	LinkSimple = "fa-duotone fa-link-simple",
	LinkSimpleSlash = "fa-duotone fa-link-simple-slash",
	LinkSlash = "fa-duotone fa-link-slash",
	List = "fa-duotone fa-list",
	ListCheck = "fa-duotone fa-list-check",
	ListOl = "fa-duotone fa-list-ol",
	ListTree = "fa-duotone fa-list-tree",
	ListUl = "fa-duotone fa-list-ul",
	LocationArrow = "fa-duotone fa-location-arrow",
	LocationCrossHairs = "fa-duotone fa-location-crosshairs",
	LocationCheck = "fa-duotone fa-location-check",
	LocationDot = "fa-duotone fa-location-dot",
	Lock = "fa-duotone fa-lock",
	LockOpen = "fa-duotone fa-lock-open",
	Login = "fa-duotone fa-arrow-right-to-bracket",
	Logout = "fa-duotone fa-arrow-right-from-bracket",
	//#endregion

	//#region M
	MagnifyingGlass = "fa-duotone fa-magnifying-glass",
	MagnifyingGlassMinus = "fa-duotone fa-magnifying-glass-minus",
	MagnifyingGlassPlus = "fa-duotone fa-magnifying-glass-plus",
	Mail = "fa-duotone fa-envelope",
	Mailbox = "fa-duotone fa-mailbox",
	MailOpen = "fa-duotone fa-envelope-open",
	Map = "fa-duotone fa-map",
	MapLocation = "fa-duotone fa-map-location",
	MapLocationDot = "fa-duotone fa-map-location-dot",
	MapPin = "fa-duotone fa-map-pin",
	Maximize = "fa-duotone fa-maximize",
	Merge = "fa-duotone fa-merge",
	Message = "fa-duotone fa-message",
	MessageCode = "fa-duotone fa-message-code",
	MessageDots = "fa-duotone fa-message-dots",
	MessageLines = "fa-duotone fa-message-lines",
	Messages = "fa-duotone fa-messages",
	Microphone = "fa-duotone fa-microphone",
	MicrophoneLines = "fa-duotone fa-microphone-lines",
	MicrophoneLinesSlash = "fa-duotone fa-microphone-lines-slash",
	MicrophoneSlash = "fa-duotone fa-microphone-slash",
	Microscope = "fa-duotone fa-microscope",
	Minimize = "fa-duotone fa-minimize",
	Minus = "fa-duotone fa-minus",
	Mobile = "fa-duotone fa-mobile",
	MobileNotch = "fa-duotone fa-mobile-notch",
	MoneyCheckDollarPen = "fa-duotone fa-money-check-dollar-pen",
	Music = "fa-duotone fa-music",
	MusicSlash = "fa-duotone fa-music-slash",
	//#endregion

	//#region Newspaper
	NewsPaper = "fa-duotone fa-newspaper",
	//#endregion

	//#region P
	Palette = "fa-duotone fa-palette",
	PaperClip = "fa-duotone fa-paperclip",
	PaperClipVertical = "fa-duotone fa-paperclip-vertical",
	PaperPlane = "fa-duotone fa-paper-plane",
	PaperPlaneTop = "fa-duotone fa-paper-plane-top",
	Paste = "fa-duotone fa-paste",
	Pause = "fa-duotone fa-pause",
	Pen = "fa-duotone fa-pen",
	Pencil = "fa-duotone fa-pencil",
	PenToSquare = "fa-duotone fa-pen-to-square",
	PeopleArrowsLeftRight = "fa-duotone fa-people-arrows-left-right",
	Percentage = "fa-duotone fa-percentage",
	PersonChalkboard = "fa-duotone fa-person-chalkboard",
	PersonMilitaryRifle = "fa-duotone fa-person-military-rifle",
	Phone = "fa-duotone fa-phone",
	Play = "fa-duotone fa-play",
	PlayPause = "fa-duotone fa-play-pause",
	Plus = "fa-duotone fa-plus",
	Print = "fa-duotone fa-print",
	Pumo = "fa-duotone fa-font-awesome",
	//#endregion

	//#region Q
	Question = "fa-duotone fa-question",
	//#endregion

	//#region R
	Redo = "fa-duotone fa-redo",
	RedoAlt = "fa-duotone fa-redo-alt",
	Refresh = "fa-duotone fa-arrows-rotate",
	Remove = "fa-duotone fa-xmark",
	Repeat = "fa-duotone fa-repeat",
	Reply = "fa-duotone fa-reply",
	ReplyAll = "fa-duotone fa-reply-all",
	RightFromBracket = "fa-duotone fa-right-from-bracket",
	RightToBracket = "fa-duotone fa-right-to-bracket",
	Rotate = "fa-duotone fa-rotate",
	RotateLeft = "fa-duotone fa-rotate-left",
	//#endregion

	//#region S
	SackDollar = "fa-duotone fa-sack-dollar",
	Save = "fa-duotone fa-floppy-disk",
	Scissors = "fa-duotone fa-scissors",
	ScrewdriverWrench = "fa-duotone fa-screwdriver-wrench",
	Search = "fa-duotone fa-magnifying-glass",
	SensorTriangleExclamation = "fa-duotone fa-sensor-triangle-exclamation",
	Settings = "fa-duotone fa-gear",
	Share = "fa-duotone fa-share",
	ShareAll = "fa-duotone fa-share-all",
	ShareNodes = "fa-duotone fa-share-nodes",
	ShareFromSquare = "fa-duotone fa-share-from-square",
	ShieldCheck = "fa-duotone fa-shield-check",
	Ship = "fa-duotone fa-ship",
	Sitemap = "fa-duotone fa-sitemap",
	Soccer = "fa-duotone fa-futbol",
	Sort = "fa-duotone fa-sort",
	SortDown = "fa-duotone fa-sort-down",
	SortUp = "fa-duotone fa-sort-up",
	Spinner = "fa-duotone fa-spinner",
	Split = "fa-duotone fa-split",
	SquareCheck = "fa-duotone fa-square-check",
	SquareMinus = "fa-duotone fa-square-minus",
	SquarePen = "fa-duotone fa-square-pen",
	Stamp = "fa-duotone fa-stamp",
	Star = "fa-duotone fa-star",
	StepBackward = "fa-duotone fa-step-backward",
	StepForward = "fa-duotone fa-step-forward",
	Stethoscope = "fa-duotone fa-stethoscope",
	Stop = "fa-duotone fa-stop",
	//#endregion

	//#region T
	Table = "fa-duotone fa-table",
	TableRows = "fa-duotone fa-table-rows",
	Tablet = "fa-duotone fa-tablet",
	Tag = "fa-duotone fa-tag",
	Tags = "fa-duotone fa-tags",
	Tasks = "fa-duotone fa-tasks",
	ThumbsDown = "fa-duotone fa-thumbs-down",
	ThumbsUp = "fa-duotone fa-thumbs-up",
	Thumbtack = "fa-duotone fa-thumbtack",
	Timer = "fa-duotone fa-timer",
	Trash = "fa-duotone fa-trash",
	TrashCanList = "fa-duotone fa-trash-can-list",
	TrashUndo = "fa-duotone fa-trash-undo",
	TrashXmark = "fa-duotone fa-trash-xmark",
	TriangleExclamation = "fa-duotone fa-triangle-exclamation",
	Truck = "fa-duotone fa-truck",
	//#endregion

	//#region U
	Undo = "fa-duotone fa-arrow-rotate-left",
	Unlock = "fa-duotone fa-unlock",
	Upload = "fa-duotone fa-upload",
	UsbDrive = "fa-duotone fa-usb-drive",
	User = "fa-duotone fa-user",
	UserCheck = "fa-duotone fa-user-check",
	UserClock = "fa-duotone fa-user-clock",
	UserDoctor = "fa-duotone fa-user-doctor",
	UserDoctorHair = "fa-duotone fa-user-doctor-hair",
	UserDoctorHairLong = "fa-duotone fa-user-doctor-hair-long",
	UserGear = "fa-duotone fa-user-gear",
	UserGroup = "fa-duotone fa-user-group",
	UserHair = "fa-duotone fa-user-hair",
	UserHairLong = "fa-duotone fa-user-hair-long",
	UserHeadset = "fa-duotone fa-user-headset",
	Users = "fa-duotone fa-users",
	UserSecret = "fa-duotone fa-user-secret",
	UsersMedical = "fa-duotone fa-users-medical",
	UserTag = "fa-duotone fa-user-tag",
	UserXmark = "fa-duotone fa-user-xmark",
	//#endregion

	//#region V
	Video = "fa-duotone fa-video",
	VideoSlash = "fa-duotone fa-video-slash",
	Volume = "fa-duotone fa-volume",
	VolumeHigh = "fa-duotone fa-volume-high",
	VolumeLow = "fa-duotone fa-volume-low",
	VolumeOff = "fa-duotone fa-volume-off",
	VolumeSlash = "fa-duotone fa-volume-slash",
	VolumeXmark = "fa-duotone fa-volume-xmark",
	//#endregion

	//#region W
	Wifi = "fa-duotone fa-wifi",
	WifiExclamation = "fa-duotone fa-wifi-exclamation",
	WifiFair = "fa-duotone fa-wifi-fair",
	WifiSlash = "fa-duotone fa-wifi-slash",
	Window = "fa-duotone fa-window",
	//#endregion

	//#region X
	Xmark = "fa-duotone fa-xmark",
	//#endregion
}
//#endregion

//#region Icon Thin
export enum IconClassicThin
{
	//#region A
	Add = "fa-thin fa-plus",
	AddressCard = "fa-thin fa-address-card",
	Alert = "fa-thin fa-triangle-exclamation",
	AngleDown = "fa-thin fa-angle-down",
	AngleLeft = "fa-thin fa-angle-left",
	AngleRight = "fa-thin fa-angle-right",
	AngleUp = "fa-thin fa-angle-up",
	Aperture = "fa-thin fa-aperture",
	ArrowDown = "fa-thin fa-arrow-down",
	ArrowDownShortWide = "fa-thin fa-arrow-down-short-wide",
	ArrowDownWideShort = "fa-thin fa-arrow-down-wide-short",
	ArrowLeft = "fa-thin fa-arrow-left",
	ArrowPointer = "fa-thin fa-arrow-pointer",
	ArrowRight = "fa-thin fa-arrow-right",
	ArrowRightToBracket = "fa-thin fa-arrow-right-to-bracket",
	ArrowRightFromBracket = "fa-thin fa-arrow-right-from-bracket",
	ArrowRotateRight = "fa-thin fa-arrow-rotate-right",
	ArrowsRotate = "fa-thin fa-arrows-rotate",
	ArrowUp = "fa-thin fa-arrow-up",
	Asterisk = "fa-thin fa-asterisk",
	At = "fa-thin fa-at",
	Attachment = "fa-thin fa-paperclip",
	//#endregion

	//#region B
	Back = "fa-thin fa-angle-left",
	Backward = "fa-thin fa-backward",
	BackwardFast = "fa-thin fa-backward-fast",
	BackwardStep = "fa-thin fa-backward-step",
	BalanceScale = "fa-thin fa-balance-scale",
	BallotCheck = "fa-thin fa-ballot-check",
	Ban = "fa-thin fa-ban",
	Barcode = "fa-thin fa-barcode",
	BarcodeScan = "fa-thin fa-barcode-scan",
	Bars = "fa-thin fa-bars",
	BarsSort = "fa-thin fa-bars-sort",
	Bell = "fa-thin fa-bell",
	BellSlash = "fa-thin fa-bell-slash",
	Bolt = "fa-thin fa-bolt",
	Book = "fa-thin fa-book",
	BookOpen = "fa-thin fa-book-open",
	Box = "fa-thin fa-box",
	BoxArchive = "fa-thin fa-box-archive",
	BriefCase = "fa-thin fa-brief-case",
	Bug = "fa-thin fa-bug",
	Burger = "fa-thin fa-bars",
	//#endregion

	//#region C
	CakeCandles = "fa-thin fa-cake-candles",
	Calendar = "fa-thin fa-calendar",
	CalendarAlt = "fa-thin fa-calendar-alt",
	CalendarCheck = "fa-thin fa-calendar-check",
	CalendarDay = "fa-thin fa-calendar-day",
	CalendarPlus = "fa-thin fa-calendar-plus",
	Camera = "fa-thin fa-camera",
	CameraAlt = "fa-thin fa-camera-alt",
	CameraWeb = "fa-thin fa-camera-web",
	CameraWebSlash = "fa-thin fa-camera-web-slash",
	Capsules = "fa-thin fa-capsules",
	CaretDown = "fa-thin fa-caret-down",
	CaretLeft = "fa-thin fa-caret-left",
	CaretRight = "fa-thin fa-caret-right",
	CaretUp = "fa-thin fa-caret-up",
	CartCirclePlus = "fa-thin fa-cart-circle-plus",
	CartShopping = "fa-thin fa-cart-shopping",
	ChartArea = "fa-thin fa-chart-area",
	ChartBar = "fa-thin fa-chart-bar",
	ChartColumn = "fa-thin fa-chart-column",
	ChartLine = "fa-thin fa-chart-line",
	ChartPie = "fa-thin fa-chart-pie",
	ChartSimple = "fa-thin fa-chart-simple",
	Chat = "fa-thin fa-comment",
	Check = "fa-thin fa-check",
	ChevronDown = "fa-thin fa-chevron-down",
	ChevronLeft = "fa-thin fa-chevron-left",
	ChevronRight = "fa-thin fa-chevron-right",
	ChevronUp = "fa-thin fa-chevron-up",
	Circle = "fa-thin fa-circle",
	CircleCheck = "fa-thin fa-circle-check",
	CircleExclamation = "fa-thin fa-circle-exclamation",
	CircleInfo = "fa-thin fa-circle-info",
	CircleStop = "fa-thin fa-circle-stop",
	Clipboard = "fa-thin fa-clipboard",
	ClipboardMedical = "fa-thin fa-clipboard-medical",
	Clock = "fa-thin fa-clock",
	ClockRotateLeft = "fa-thin fa-clock-rotate-left",
	Close = "fa-thin fa-xmark",
	Cloud = "fa-thin fa-cloud",
	CloudArrowUp = "fa-thin fa-cloud-arrow-up",
	CloudDownload = "fa-thin fa-cloud-download",
	Code = "fa-thin fa-code",
	CodeMerge = "fa-thin fa-code-merge",
	Coins = "fa-thin fa-coins",
	Collapse = "fa-thin fa-compress",
	Comment = "fa-thin fa-comment",
	CommentDots = "fa-thin fa-comment-dots",
	CommentLines = "fa-thin fa-comment-lines",
	Comments = "fa-thin fa-comments",
	CommentSms = "fa-thin fa-comment-sms",
	Compress = "fa-thin fa-compress",
	Copy = "fa-thin fa-copy",
	Copyright = "fa-thin fa-copyright",
	CreditCard = "fa-thin fa-credit-card",
	Crown = "fa-thin fa-crown",
	//#endregion

	//#region D
	Database = "fa-thin fa-database",
	Delete = "fa-thin fa-xmark",
	DeleteLeft = "fa-thin fa-delete-left",
	DeleteRight = "fa-thin fa-delete-right",
	Desktop = "fa-thin fa-desktop",
	Download = "fa-thin fa-download",
	//#endregion

	//#region E
	Edit = "fa-thin fa-pen",
	Eject = "fa-thin fa-eject",
	Ellipsis = "fa-thin fa-ellipsis",
	EllipsisVertical = "fa-thin fa-ellipsis-vertical",
	Envelope = "fa-thin fa-envelope",
	Eraser = "fa-thin fa-eraser",
	EuroSign = "fa-thin fa-euro-sign",
	Exclamation = "fa-thin fa-exclamation",
	Expand = "fa-thin fa-expand",
	Eye = "fa-thin fa-eye",
	EyeSlash = "fa-thin fa-eye-slash",
	//#endregion

	//#region F
	Family = "fa-thin fa-family",
	FastBackward = "fa-thin fa-fast-backward",
	FastForward = "fa-thin fa-fast-forward",
	File = "fa-thin fa-file",
	FileAudio = "fa-thin fa-file-audio",
	FileContract = "fa-thin fa-file-contract",
	FileDownload = "fa-thin fa-file-download",
	FileExcel = "fa-thin fa-file-excel",
	FileExport = "fa-thin fa-file-export",
	FileImage = "fa-thin fa-file-image",
	FileInvoice = "fa-thin fa-file-invoice",
	FileImport = "fa-thin fa-file-import",
	FileLines = "fa-thin fa-file-lines",
	FileMusic = "fa-thin fa-file-music",
	FilePdf = "fa-thin fa-file-pdf",
	Files = "fa-thin fa-file-files",
	FileSignature = "fa-thin fa-file-signature",
	FileVideo = "fa-thin fa-file-video",
	FileWord = "fa-thin fa-file-word",
	FileZipper = "fa-thin fa-file-zipper",
	Filter = "fa-thin fa-filter",
	Flag = "fa-thin fa-flag",
	FlagSwallowTail = "fa-thin fa-flag-swallowtail",
	FloppyDisk = "fa-thin fa-floppy-disk",
	Folder = "fa-thin fa-folder",
	FolderOpen = "fa-thin fa-folder-open",
	FontAwesome = "fa-thin  fa-font-awesome",
	Forward = "fa-thin fa-forward",
	ForwardStep = "fa-thin fa-forward-step",
	ForwardFast = "fa-thin fa-forward-fast",
	Futbol = "fa-thin fa-futbol",
	//#endregion

	//#region G
	Gear = "fa-thin fa-gear",
	Gears = "fa-thin fa-gears",
	Globe = "fa-thin fa-globe",
	//#endregion

	//#region H
	Hashtag = "fa-thin fa-hashtag",
	HatWizard = "fa-thin fa-hat-wizard",
	Headset = "fa-thin fa-headset",
	Hospital = "fa-thin fa-hospital",
	Hourglass = "fa-thin fa-hourglass",
	HourglassClock = "fa-thin fa-hourglass-clock",
	House = "fa-thin fa-house",
	HouseMedical = "fa-thin fa-house-medical",
	HouseUser = "fa-thin fa-house-user",
	//#endregion

	//#region I
	Image = "fa-thin fa-image",
	Inbox = "fa-thin fa-inbox",
	InboxFull = "fa-thin fa-inbox-full",
	Info = "fa-thin fa-info",
	//#endregion

	//#region K
	Key = "fa-thin fa-key",
	Keyboard = "fa-thin fa-keyboard",
	KeySkeleton = "fa-thin fa-key-skeleton",
	//#endregion

	//#region L
	Laptop = "fa-thin fa-laptop",
	LaptopMedical = "fa-thin fa-laptop-medical",
	LevelDown = "fa-thin fa-level-down",
	LevelDownAlt = "fa-thin fa-level-down-alt",
	LevelLeft = "fa-thin fa-level-left",
	LevelLeftAlt = "fa-thin fa-level-left-alt",
	LevelRight = "fa-thin fa-level-right",
	LevelRightAlt = "fa-thin fa-level-right-alt",
	LevelUp = "fa-thin fa-level-up",
	LevelUpAlt = "fa-thin fa-level-up-alt",
	Link = "fa-thin fa-link",
	LinkExternal = "fa-thin fa-arrow-up-right-from-square",
	LinkHorizontal = "fa-thin fa-link-horizontal",
	LinkHorizontalSlash = "fa-thin fa-link-horizontal-slash",
	LinkSimple = "fa-thin fa-link-simple",
	LinkSimpleSlash = "fa-thin fa-link-simple-slash",
	LinkSlash = "fa-thin fa-link-slash",
	List = "fa-thin fa-list",
	ListCheck = "fa-thin fa-list-check",
	ListOl = "fa-thin fa-list-ol",
	ListTree = "fa-thin fa-list-tree",
	ListUl = "fa-thin fa-list-ul",
	LocationArrow = "fa-thin fa-location-arrow",
	LocationCrossHairs = "fa-thin fa-location-crosshairs",
	LocationCheck = "fa-thin fa-location-check",
	LocationDot = "fa-thin fa-location-dot",
	Lock = "fa-thin fa-lock",
	LockOpen = "fa-thin fa-lock-open",
	Login = "fa-thin fa-arrow-right-to-bracket",
	Logout = "fa-thin fa-arrow-right-from-bracket",
	//#endregion

	//#region M
	MagnifyingGlass = "fa-thin fa-magnifying-glass",
	MagnifyingGlassMinus = "fa-thin fa-magnifying-glass-minus",
	MagnifyingGlassPlus = "fa-thin fa-magnifying-glass-plus",
	Mail = "fa-thin fa-envelope",
	Mailbox = "fa-thin fa-mailbox",
	MailOpen = "fa-thin fa-envelope-open",
	Map = "fa-thin fa-map",
	MapLocation = "fa-thin fa-map-location",
	MapLocationDot = "fa-thin fa-map-location-dot",
	MapPin = "fa-thin fa-map-pin",
	Maximize = "fa-thin fa-maximize",
	Merge = "fa-thin fa-merge",
	Message = "fa-thin fa-message",
	MessageCode = "fa-thin fa-message-code",
	MessageDots = "fa-thin fa-message-dots",
	MessageLines = "fa-thin fa-message-lines",
	Messages = "fa-thin fa-messages",
	Microphone = "fa-thin fa-microphone",
	MicrophoneLines = "fa-thin fa-microphone-lines",
	MicrophoneLinesSlash = "fa-thin fa-microphone-lines-slash",
	MicrophoneSlash = "fa-thin fa-microphone-slash",
	Microscope = "fa-thin fa-microscope",
	Minimize = "fa-thin fa-minimize",
	Minus = "fa-thin fa-minus",
	Mobile = "fa-thin fa-mobile",
	MobileNotch = "fa-thin fa-mobile-notch",
	MoneyCheckDollarPen = "fa-thin fa-money-check-dollar-pen",
	Music = "fa-thin fa-music",
	MusicSlash = "fa-thin fa-music-slash",
	//#endregion

	//#region Newspaper
	NewsPaper = "fa-thin fa-newspaper",
	//#endregion

	//#region P
	Palette = "fa-thin fa-palette",
	PaperClip = "fa-thin fa-paperclip",
	PaperClipVertical = "fa-thin fa-paperclip-vertical",
	PaperPlane = "fa-thin fa-paper-plane",
	PaperPlaneTop = "fa-thin fa-paper-plane-top",
	Paste = "fa-thin fa-paste",
	Pause = "fa-thin fa-pause",
	Pen = "fa-thin fa-pen",
	Pencil = "fa-thin fa-pencil",
	PenToSquare = "fa-thin fa-pen-to-square",
	PeopleArrowsLeftRight = "fa-thin fa-people-arrows-left-right",
	Percentage = "fa-thin fa-percentage",
	PersonChalkboard = "fa-thin fa-person-chalkboard",
	PersonMilitaryRifle = "fa-thin fa-person-military-rifle",
	Phone = "fa-thin fa-phone",
	Play = "fa-thin fa-play",
	PlayPause = "fa-thin fa-play-pause",
	Plus = "fa-thin fa-plus",
	Print = "fa-thin fa-print",
	Pumo = "fa-thin fa-font-awesome",
	//#endregion

	//#region Q
	Question = "fa-thin fa-question",
	//#endregion

	//#region R
	Redo = "fa-thin fa-redo",
	RedoAlt = "fa-thin fa-redo-alt",
	Refresh = "fa-thin fa-arrows-rotate",
	Remove = "fa-thin fa-xmark",
	Repeat = "fa-thin fa-repeat",
	Reply = "fa-thin fa-reply",
	ReplyAll = "fa-thin fa-reply-all",
	RightFromBracket = "fa-thin fa-right-from-bracket",
	RightToBracket = "fa-thin fa-right-to-bracket",
	Rotate = "fa-thin fa-rotate",
	RotateLeft = "fa-thin fa-rotate-left",
	//#endregion

	//#region S
	SackDollar = "fa-thin fa-sack-dollar",
	Save = "fa-thin fa-floppy-disk",
	Scissors = "fa-thin fa-scissors",
	ScrewdriverWrench = "fa-thin fa-screwdriver-wrench",
	Search = "fa-thin fa-magnifying-glass",
	SensorTriangleExclamation = "fa-thin fa-sensor-triangle-exclamation",
	Settings = "fa-thin fa-gear",
	Share = "fa-thin fa-share",
	ShareAll = "fa-thin fa-share-all",
	ShareNodes = "fa-thin fa-share-nodes",
	ShareFromSquare = "fa-thin fa-share-from-square",
	ShieldCheck = "fa-thin fa-shield-check",
	Ship = "fa-thin fa-ship",
	Sitemap = "fa-thin fa-sitemap",
	Soccer = "fa-thin fa-futbol",
	Sort = "fa-thin fa-sort",
	SortDown = "fa-thin fa-sort-down",
	SortUp = "fa-thin fa-sort-up",
	Spinner = "fa-thin fa-spinner",
	Split = "fa-thin fa-split",
	SquareCheck = "fa-thin fa-square-check",
	SquareMinus = "fa-thin fa-square-minus",
	SquarePen = "fa-thin fa-square-pen",
	Stamp = "fa-thin fa-stamp",
	Star = "fa-thin fa-star",
	StepBackward = "fa-thin fa-step-backward",
	StepForward = "fa-thin fa-step-forward",
	Stethoscope = "fa-thin fa-stethoscope",
	Stop = "fa-thin fa-stop",
	//#endregion

	//#region T
	Table = "fa-thin fa-table",
	TableRows = "fa-thin fa-table-rows",
	Tablet = "fa-thin fa-tablet",
	Tag = "fa-thin fa-tag",
	Tags = "fa-thin fa-tags",
	Tasks = "fa-thin fa-tasks",
	ThumbsDown = "fa-thin fa-thumbs-down",
	ThumbsUp = "fa-thin fa-thumbs-up",
	Thumbtack = "fa-thin fa-thumbtack",
	Timer = "fa-thin fa-timer",
	Trash = "fa-thin fa-trash",
	TrashCanList = "fa-thin fa-trash-can-list",
	TrashUndo = "fa-thin fa-trash-undo",
	TrashXmark = "fa-thin fa-trash-xmark",
	TriangleExclamation = "fa-thin fa-triangle-exclamation",
	Truck = "fa-thin fa-truck",
	//#endregion

	//#region U
	Undo = "fa-thin fa-arrow-rotate-left",
	Unlock = "fa-thin fa-unlock",
	Upload = "fa-thin fa-upload",
	UsbDrive = "fa-thin fa-usb-drive",
	User = "fa-thin fa-user",
	UserCheck = "fa-thin fa-user-check",
	UserClock = "fa-thin fa-user-clock",
	UserDoctor = "fa-thin fa-user-doctor",
	UserDoctorHair = "fa-thin fa-user-doctor-hair",
	UserDoctorHairLong = "fa-thin fa-user-doctor-hair-long",
	UserGear = "fa-thin fa-user-gear",
	UserGroup = "fa-thin fa-user-group",
	UserHair = "fa-thin fa-user-hair",
	UserHairLong = "fa-thin fa-user-hair-long",
	UserHeadset = "fa-thin fa-user-headset",
	Users = "fa-thin fa-users",
	UserSecret = "fa-thin fa-user-secret",
	UsersMedical = "fa-thin fa-users-medical",
	UserTag = "fa-thin fa-user-tag",
	UserXmark = "fa-thin fa-user-xmark",
	//#endregion

	//#region V
	Video = "fa-thin fa-video",
	VideoSlash = "fa-thin fa-video-slash",
	Volume = "fa-thin fa-volume",
	VolumeHigh = "fa-thin fa-volume-high",
	VolumeLow = "fa-thin fa-volume-low",
	VolumeOff = "fa-thin fa-volume-off",
	VolumeSlash = "fa-thin fa-volume-slash",
	VolumeXmark = "fa-thin fa-volume-xmark",
	//#endregion

	//#region W
	Wifi = "fa-thin fa-wifi",
	WifiExclamation = "fa-thin fa-wifi-exclamation",
	WifiFair = "fa-thin fa-wifi-fair",
	WifiSlash = "fa-thin fa-wifi-slash",
	Window = "fa-thin fa-window",
	//#endregion

	//#region X
	Xmark = "fa-thin fa-xmark",
	//#endregion
}
//#endregion

//#endregion

//#region Icon Sharp

//#region Icon Sharp Solid
export enum IconSharpSolid
{
	//#region A
	Add = "fa-sharp fa-solid fa-plus",
	AddressCard = "fa-sharp fa-solid fa-address-card",
	Alert = "fa-sharp fa-solid fa-triangle-exclamation",
	AngleDown = "fa-sharp fa-solid fa-angle-down",
	AngleLeft = "fa-sharp fa-solid fa-angle-left",
	AngleRight = "fa-sharp fa-solid fa-angle-right",
	AngleUp = "fa-sharp fa-solid fa-angle-up",
	Aperture = "fa-sharp fa-solid fa-aperture",
	ArrowDown = "fa-sharp fa-solid fa-arrow-down",
	ArrowDownShortWide = "fa-sharp fa-solid fa-arrow-down-short-wide",
	ArrowDownWideShort = "fa-sharp fa-solid fa-arrow-down-wide-short",
	ArrowLeft = "fa-sharp fa-solid fa-arrow-left",
	ArrowPointer = "fa-sharp fa-solid fa-arrow-pointer",
	ArrowRight = "fa-sharp fa-solid fa-arrow-right",
	ArrowRightToBracket = "fa-sharp fa-solid fa-arrow-right-to-bracket",
	ArrowRightFromBracket = "fa-sharp fa-solid fa-arrow-right-from-bracket",
	ArrowRotateRight = "fa-sharp fa-solid fa-arrow-rotate-right",
	ArrowsRotate = "fa-sharp fa-solid fa-arrows-rotate",
	ArrowUp = "fa-sharp fa-solid fa-arrow-up",
	Asterisk = "fa-sharp fa-solid fa-asterisk",
	At = "fa-sharp fa-solid fa-at",
	Attachment = "fa-sharp fa-solid fa-paperclip",
	//#endregion

	//#region B
	Back = "fa-sharp fa-solid fa-angle-left",
	Backward = "fa-sharp fa-solid fa-backward",
	BackwardFast = "fa-sharp fa-solid fa-backward-fast",
	BackwardStep = "fa-sharp fa-solid fa-backward-step",
	BalanceScale = "fa-sharp fa-solid fa-balance-scale",
	BallotCheck = "fa-sharp fa-solid fa-ballot-check",
	Ban = "fa-sharp fa-solid fa-ban",
	Barcode = "fa-sharp fa-solid fa-barcode",
	BarcodeScan = "fa-sharp fa-solid fa-barcode-scan",
	Bars = "fa-sharp fa-solid fa-bars",
	BarsSort = "fa-sharp fa-solid fa-bars-sort",
	Bell = "fa-sharp fa-solid fa-bell",
	BellSlash = "fa-sharp fa-solid fa-bell-slash",
	Bolt = "fa-sharp fa-solid fa-bolt",
	Book = "fa-sharp fa-solid fa-book",
	BookOpen = "fa-sharp fa-solid fa-book-open",
	Box = "fa-sharp fa-solid fa-box",
	BoxArchive = "fa-sharp fa-solid fa-box-archive",
	BriefCase = "fa-sharp fa-solid fa-brief-case",
	Bug = "fa-sharp fa-solid fa-bug",
	Burger = "fa-sharp fa-solid fa-bars",
	//#endregion

	//#region C
	CakeCandles = "fa-sharp fa-solid fa-cake-candles",
	Calendar = "fa-sharp fa-solid fa-calendar",
	CalendarAlt = "fa-sharp fa-solid fa-calendar-alt",
	CalendarCheck = "fa-sharp fa-solid fa-calendar-check",
	CalendarDay = "fa-sharp fa-solid fa-calendar-day",
	CalendarPlus = "fa-sharp fa-solid fa-calendar-plus",
	Camera = "fa-sharp fa-solid fa-camera",
	CameraAlt = "fa-sharp fa-solid fa-camera-alt",
	CameraWeb = "fa-sharp fa-solid fa-camera-web",
	CameraWebSlash = "fa-sharp fa-solid fa-camera-web-slash",
	Capsules = "fa-sharp fa-solid fa-capsules",
	CaretDown = "fa-sharp fa-solid fa-caret-down",
	CaretLeft = "fa-sharp fa-solid fa-caret-left",
	CaretRight = "fa-sharp fa-solid fa-caret-right",
	CaretUp = "fa-sharp fa-solid fa-caret-up",
	CartCirclePlus = "fa-sharp fa-solid fa-cart-circle-plus",
	CartShopping = "fa-sharp fa-solid fa-cart-shopping",
	ChartArea = "fa-sharp fa-solid fa-chart-area",
	ChartBar = "fa-sharp fa-solid fa-chart-bar",
	ChartColumn = "fa-sharp fa-solid fa-chart-column",
	ChartLine = "fa-sharp fa-solid fa-chart-line",
	ChartPie = "fa-sharp fa-solid fa-chart-pie",
	ChartSimple = "fa-sharp fa-solid fa-chart-simple",
	Chat = "fa-sharp fa-solid fa-comment",
	Check = "fa-sharp fa-solid fa-check",
	ChevronDown = "fa-sharp fa-solid fa-chevron-down",
	ChevronLeft = "fa-sharp fa-solid fa-chevron-left",
	ChevronRight = "fa-sharp fa-solid fa-chevron-right",
	ChevronUp = "fa-sharp fa-solid fa-chevron-up",
	Circle = "fa-sharp fa-solid fa-circle",
	CircleCheck = "fa-sharp fa-solid fa-circle-check",
	CircleExclamation = "fa-sharp fa-solid fa-circle-exclamation",
	CircleInfo = "fa-sharp fa-solid fa-circle-info",
	CircleStop = "fa-sharp fa-solid fa-circle-stop",
	Clipboard = "fa-sharp fa-solid fa-clipboard",
	ClipboardMedical = "fa-sharp fa-solid fa-clipboard-medical",
	Clock = "fa-sharp fa-solid fa-clock",
	ClockRotateLeft = "fa-sharp fa-solid fa-clock-rotate-left",
	Close = "fa-sharp fa-solid fa-xmark",
	Cloud = "fa-sharp fa-solid fa-cloud",
	CloudArrowUp = "fa-sharp fa-solid fa-cloud-arrow-up",
	CloudDownload = "fa-sharp fa-solid fa-cloud-download",
	Code = "fa-sharp fa-solid fa-code",
	CodeMerge = "fa-sharp fa-solid fa-code-merge",
	Coins = "fa-sharp fa-solid fa-coins",
	Collapse = "fa-sharp fa-solid fa-compress",
	Comment = "fa-sharp fa-solid fa-comment",
	CommentDots = "fa-sharp fa-solid fa-comment-dots",
	CommentLines = "fa-sharp fa-solid fa-comment-lines",
	Comments = "fa-sharp fa-solid fa-comments",
	CommentSms = "fa-sharp fa-solid fa-comment-sms",
	Compress = "fa-sharp fa-solid fa-compress",
	Copy = "fa-sharp fa-solid fa-copy",
	Copyright = "fa-sharp fa-solid fa-copyright",
	CreditCard = "fa-sharp fa-solid fa-credit-card",
	Crown = "fa-sharp fa-solid fa-crown",
	//#endregion

	//#region D
	Database = "fa-sharp fa-solid fa-database",
	Delete = "fa-sharp fa-solid fa-xmark",
	DeleteLeft = "fa-sharp fa-solid fa-delete-left",
	DeleteRight = "fa-sharp fa-solid fa-delete-right",
	Desktop = "fa-sharp fa-solid fa-desktop",
	Download = "fa-sharp fa-solid fa-download",
	//#endregion

	//#region E
	Edit = "fa-sharp fa-solid fa-pen",
	Eject = "fa-sharp fa-solid fa-eject",
	Ellipsis = "fa-sharp fa-solid fa-ellipsis",
	EllipsisVertical = "fa-sharp fa-solid fa-ellipsis-vertical",
	Envelope = "fa-sharp fa-solid fa-envelope",
	Eraser = "fa-sharp fa-solid fa-eraser",
	EuroSign = "fa-sharp fa-solid fa-euro-sign",
	Exclamation = "fa-sharp fa-solid fa-exclamation",
	Expand = "fa-sharp fa-solid fa-expand",
	Eye = "fa-sharp fa-solid fa-eye",
	EyeSlash = "fa-sharp fa-solid fa-eye-slash",
	//#endregion

	//#region F
	Family = "fa-sharp fa-solid fa-family",
	FastBackward = "fa-sharp fa-solid fa-fast-backward",
	FastForward = "fa-sharp fa-solid fa-fast-forward",
	File = "fa-sharp fa-solid fa-file",
	FileAudio = "fa-sharp fa-solid fa-file-audio",
	FileContract = "fa-sharp fa-solid fa-file-contract",
	FileDownload = "fa-sharp fa-solid fa-file-download",
	FileExcel = "fa-sharp fa-solid fa-file-excel",
	FileExport = "fa-sharp fa-solid fa-file-export",
	FileImage = "fa-sharp fa-solid fa-file-image",
	FileInvoice = "fa-sharp fa-solid fa-file-invoice",
	FileImport = "fa-sharp fa-solid fa-file-import",
	FileLines = "fa-sharp fa-solid fa-file-lines",
	FileMusic = "fa-sharp fa-solid fa-file-music",
	FilePdf = "fa-sharp fa-solid fa-file-pdf",
	Files = "fa-sharp fa-solid fa-file-files",
	FileSignature = "fa-sharp fa-solid fa-file-signature",
	FileVideo = "fa-sharp fa-solid fa-file-video",
	FileWord = "fa-sharp fa-solid fa-file-word",
	FileZipper = "fa-sharp fa-solid fa-file-zipper",
	Filter = "fa-sharp fa-solid fa-filter",
	Flag = "fa-sharp fa-solid fa-flag",
	FlagSwallowTail = "fa-sharp fa-solid fa-flag-swallowtail",
	FloppyDisk = "fa-sharp fa-solid fa-floppy-disk",
	Folder = "fa-sharp fa-solid fa-folder",
	FolderOpen = "fa-sharp fa-solid fa-folder-open",
	FontAwesome = "fa-sharp fa-solid  fa-font-awesome",
	Forward = "fa-sharp fa-solid fa-forward",
	ForwardStep = "fa-sharp fa-solid fa-forward-step",
	ForwardFast = "fa-sharp fa-solid fa-forward-fast",
	Futbol = "fa-sharp fa-solid fa-futbol",
	//#endregion

	//#region G
	Gear = "fa-sharp fa-solid fa-gear",
	Gears = "fa-sharp fa-solid fa-gears",
	Globe = "fa-sharp fa-solid fa-globe",
	//#endregion

	//#region H
	Hashtag = "fa-sharp fa-solid fa-hashtag",
	HatWizard = "fa-sharp fa-solid fa-hat-wizard",
	Headset = "fa-sharp fa-solid fa-headset",
	Hospital = "fa-sharp fa-solid fa-hospital",
	Hourglass = "fa-sharp fa-solid fa-hourglass",
	HourglassClock = "fa-sharp fa-solid fa-hourglass-clock",
	House = "fa-sharp fa-solid fa-house",
	HouseMedical = "fa-sharp fa-solid fa-house-medical",
	HouseUser = "fa-sharp fa-solid fa-house-user",
	//#endregion

	//#region I
	Image = "fa-sharp fa-solid fa-image",
	Inbox = "fa-sharp fa-solid fa-inbox",
	InboxFull = "fa-sharp fa-solid fa-inbox-full",
	Info = "fa-sharp fa-solid fa-info",
	//#endregion

	//#region K
	Key = "fa-sharp fa-solid fa-key",
	Keyboard = "fa-sharp fa-solid fa-keyboard",
	KeySkeleton = "fa-sharp fa-solid fa-key-skeleton",
	//#endregion

	//#region L
	Laptop = "fa-sharp fa-solid fa-laptop",
	LaptopMedical = "fa-sharp fa-solid fa-laptop-medical",
	LevelDown = "fa-sharp fa-solid fa-level-down",
	LevelDownAlt = "fa-sharp fa-solid fa-level-down-alt",
	LevelLeft = "fa-sharp fa-solid fa-level-left",
	LevelLeftAlt = "fa-sharp fa-solid fa-level-left-alt",
	LevelRight = "fa-sharp fa-solid fa-level-right",
	LevelRightAlt = "fa-sharp fa-solid fa-level-right-alt",
	LevelUp = "fa-sharp fa-solid fa-level-up",
	LevelUpAlt = "fa-sharp fa-solid fa-level-up-alt",
	Link = "fa-sharp fa-solid fa-link",
	LinkExternal = "fa-sharp fa-solid fa-arrow-up-right-from-square",
	LinkHorizontal = "fa-sharp fa-solid fa-link-horizontal",
	LinkHorizontalSlash = "fa-sharp fa-solid fa-link-horizontal-slash",
	LinkSimple = "fa-sharp fa-solid fa-link-simple",
	LinkSimpleSlash = "fa-sharp fa-solid fa-link-simple-slash",
	LinkSlash = "fa-sharp fa-solid fa-link-slash",
	List = "fa-sharp fa-solid fa-list",
	ListCheck = "fa-sharp fa-solid fa-list-check",
	ListOl = "fa-sharp fa-solid fa-list-ol",
	ListTree = "fa-sharp fa-solid fa-list-tree",
	ListUl = "fa-sharp fa-solid fa-list-ul",
	LocationArrow = "fa-sharp fa-solid fa-location-arrow",
	LocationCrossHairs = "fa-sharp fa-solid fa-location-crosshairs",
	LocationCheck = "fa-sharp fa-solid fa-location-check",
	LocationDot = "fa-sharp fa-solid fa-location-dot",
	Lock = "fa-sharp fa-solid fa-lock",
	LockOpen = "fa-sharp fa-solid fa-lock-open",
	Login = "fa-sharp fa-solid fa-arrow-right-to-bracket",
	Logout = "fa-sharp fa-solid fa-arrow-right-from-bracket",
	//#endregion

	//#region M
	MagnifyingGlass = "fa-sharp fa-solid fa-magnifying-glass",
	MagnifyingGlassMinus = "fa-sharp fa-solid fa-magnifying-glass-minus",
	MagnifyingGlassPlus = "fa-sharp fa-solid fa-magnifying-glass-plus",
	Mail = "fa-sharp fa-solid fa-envelope",
	Mailbox = "fa-sharp fa-solid fa-mailbox",
	MailOpen = "fa-sharp fa-solid fa-envelope-open",
	Map = "fa-sharp fa-solid fa-map",
	MapLocation = "fa-sharp fa-solid fa-map-location",
	MapLocationDot = "fa-sharp fa-solid fa-map-location-dot",
	MapPin = "fa-sharp fa-solid fa-map-pin",
	Maximize = "fa-sharp fa-solid fa-maximize",
	Merge = "fa-sharp fa-solid fa-merge",
	Message = "fa-sharp fa-solid fa-message",
	MessageCode = "fa-sharp fa-solid fa-message-code",
	MessageDots = "fa-sharp fa-solid fa-message-dots",
	MessageLines = "fa-sharp fa-solid fa-message-lines",
	Messages = "fa-sharp fa-solid fa-messages",
	Microphone = "fa-sharp fa-solid fa-microphone",
	MicrophoneLines = "fa-sharp fa-solid fa-microphone-lines",
	MicrophoneLinesSlash = "fa-sharp fa-solid fa-microphone-lines-slash",
	MicrophoneSlash = "fa-sharp fa-solid fa-microphone-slash",
	Microscope = "fa-sharp fa-solid fa-microscope",
	Minimize = "fa-sharp fa-solid fa-minimize",
	Minus = "fa-sharp fa-solid fa-minus",
	Mobile = "fa-sharp fa-solid fa-mobile",
	MobileNotch = "fa-sharp fa-solid fa-mobile-notch",
	MoneyCheckDollarPen = "fa-sharp fa-solid fa-money-check-dollar-pen",
	Music = "fa-sharp fa-solid fa-music",
	MusicSlash = "fa-sharp fa-solid fa-music-slash",
	//#endregion

	//#region Newspaper
	NewsPaper = "fa-sharp fa-solid fa-newspaper",
	//#endregion

	//#region P
	Palette = "fa-sharp fa-solid fa-palette",
	PaperClip = "fa-sharp fa-solid fa-paperclip",
	PaperClipVertical = "fa-sharp fa-solid fa-paperclip-vertical",
	PaperPlane = "fa-sharp fa-solid fa-paper-plane",
	PaperPlaneTop = "fa-sharp fa-solid fa-paper-plane-top",
	Paste = "fa-sharp fa-solid fa-paste",
	Pause = "fa-sharp fa-solid fa-pause",
	Pencil = "fa-sharp fa-solid fa-pencil",
	Pen = "fa-sharp fa-solid fa-pen",
	PenToSquare = "fa-sharp fa-solid fa-pen-to-square",
	PeopleArrowsLeftRight = "fa-sharp fa-solid fa-people-arrows-left-right",
	Percentage = "fa-sharp fa-solid fa-percentage",
	PersonChalkboard = "fa-sharp fa-solid fa-person-chalkboard",
	PersonMilitaryRifle = "fa-sharp fa-solid fa-person-military-rifle",
	Phone = "fa-sharp fa-solid fa-phone",
	Play = "fa-sharp fa-solid fa-play",
	PlayPause = "fa-sharp fa-solid fa-play-pause",
	Plus = "fa-sharp fa-solid fa-plus",
	Print = "fa-sharp fa-solid fa-print",
	Pumo = "fa-sharp fa-solid fa-font-awesome",
	//#endregion

	//#region Q
	Question = "fa-sharp fa-solid fa-question",
	//#endregion

	//#region R
	Redo = "fa-sharp fa-solid fa-redo",
	RedoAlt = "fa-sharp fa-solid fa-redo-alt",
	Refresh = "fa-sharp fa-solid fa-arrows-rotate",
	Remove = "fa-sharp fa-solid fa-xmark",
	Repeat = "fa-sharp fa-solid fa-repeat",
	Reply = "fa-sharp fa-solid fa-reply",
	ReplyAll = "fa-sharp fa-solid fa-reply-all",
	RightFromBracket = "fa-sharp fa-solid fa-right-from-bracket",
	RightToBracket = "fa-sharp fa-solid fa-right-to-bracket",
	Rotate = "fa-sharp fa-solid fa-rotate",
	RotateLeft = "fa-sharp fa-solid fa-rotate-left",
	//#endregion

	//#region S
	SackDollar = "fa-sharp fa-solid fa-sack-dollar",
	Save = "fa-sharp fa-solid fa-floppy-disk",
	Scissors = "fa-sharp fa-solid fa-scissors",
	ScrewdriverWrench = "fa-sharp fa-solid fa-screwdriver-wrench",
	Search = "fa-sharp fa-solid fa-magnifying-glass",
	SensorTriangleExclamation = "fa-sharp fa-solid fa-sensor-triangle-exclamation",
	Settings = "fa-sharp fa-solid fa-gear",
	Share = "fa-sharp fa-solid fa-share",
	ShareAll = "fa-sharp fa-solid fa-share-all",
	ShareNodes = "fa-sharp fa-solid fa-share-nodes",
	ShareFromSquare = "fa-sharp fa-solid fa-share-from-square",
	ShieldCheck = "fa-sharp fa-solid fa-shield-check",
	Ship = "fa-sharp fa-solid fa-ship",
	Sitemap = "fa-sharp fa-solid fa-sitemap",
	Soccer = "fa-sharp fa-solid fa-futbol",
	Sort = "fa-sharp fa-solid fa-sort",
	SortDown = "fa-sharp fa-solid fa-sort-down",
	SortUp = "fa-sharp fa-solid fa-sort-up",
	Spinner = "fa-sharp fa-solid fa-spinner",
	Split = "fa-sharp fa-solid fa-split",
	SquareCheck = "fa-sharp fa-solid fa-square-check",
	SquareMinus = "fa-sharp fa-solid fa-square-minus",
	SquarePen = "fa-sharp fa-solid fa-square-pen",
	Star = "fa-sharp fa-solid fa-star",
	StepBackward = "fa-sharp fa-solid fa-step-backward",
	StepForward = "fa-sharp fa-solid fa-step-forward",
	Stethoscope = "fa-sharp fa-solid fa-stethoscope",
	Stop = "fa-sharp fa-solid fa-stop",
	//#endregion

	//#region T
	Table = "fa-sharp fa-solid fa-table",
	TableRows = "fa-sharp fa-solid fa-table-rows",
	Tablet = "fa-sharp fa-solid fa-tablet",
	Tag = "fa-sharp fa-solid fa-tag",
	Tags = "fa-sharp fa-solid fa-tags",
	Tasks = "fa-sharp fa-solid fa-tasks",
	ThumbsDown = "fa-sharp fa-solid fa-thumbs-down",
	ThumbsUp = "fa-sharp fa-solid fa-thumbs-up",
	Thumbtack = "fa-sharp fa-solid fa-thumbtack",
	Trash = "fa-sharp fa-solid fa-trash",
	TrashCanList = "fa-sharp fa-solid fa-trash-can-list",
	TrashUndo = "fa-sharp fa-solid fa-trash-undo",
	TrashXmark = "fa-sharp fa-solid fa-trash-xmark",
	TriangleExclamation = "fa-sharp fa-solid fa-triangle-exclamation",
	Truck = "fa-sharp fa-solid fa-truck",
	//#endregion

	//#region U
	Undo = "fa-sharp fa-solid fa-arrow-rotate-left",
	Unlock = "fa-sharp fa-solid fa-unlock",
	Upload = "fa-sharp fa-solid fa-upload",
	UsbDrive = "fa-sharp fa-solid fa-usb-drive",
	User = "fa-sharp fa-solid fa-user",
	UserCheck = "fa-sharp fa-solid fa-user-check",
	UserClock = "fa-sharp fa-solid fa-user-clock",
	UserDoctor = "fa-sharp fa-solid fa-user-doctor",
	UserDoctorHair = "fa-sharp fa-solid fa-user-doctor-hair",
	UserDoctorHairLong = "fa-sharp fa-solid fa-user-doctor-hair-long",
	UserGear = "fa-sharp fa-solid fa-user-gear",
	UserGroup = "fa-sharp fa-solid fa-user-group",
	UserHair = "fa-sharp fa-solid fa-user-hair",
	UserHairLong = "fa-sharp fa-solid fa-user-hair-long",
	UserHeadset = "fa-sharp fa-solid fa-user-headset",
	Users = "fa-sharp fa-solid fa-users",
	UserSecret = "fa-sharp fa-solid fa-user-secret",
	UsersMedical = "fa-sharp fa-solid fa-users-medical",
	UserTag = "fa-sharp fa-solid fa-user-tag",
	UserXmark = "fa-sharp fa-solid fa-user-xmark",
	//#endregion

	//#region V
	Video = "fa-sharp fa-solid fa-video",
	VideoSlash = "fa-sharp fa-solid fa-video-slash",
	Volume = "fa-sharp fa-solid fa-volume",
	VolumeHigh = "fa-sharp fa-solid fa-volume-high",
	VolumeLow = "fa-sharp fa-solid fa-volume-low",
	VolumeOff = "fa-sharp fa-solid fa-volume-off",
	VolumeSlash = "fa-sharp fa-solid fa-volume-slash",
	VolumeXmark = "fa-sharp fa-solid fa-volume-xmark",
	//#endregion

	//#region W
	Wifi = "fa-sharp fa-solid fa-wifi",
	WifiExclamation = "fa-sharp fa-solid fa-wifi-exclamation",
	WifiFair = "fa-sharp fa-solid fa-wifi-fair",
	WifiSlash = "fa-sharp fa-solid fa-wifi-slash",
	Window = "fa-sharp fa-solid fa-window",
	//#endregion

	//#region X
	Xmark = "fa-sharp fa-solid fa-xmark",
	//#endregion
}
//#endregion

//#region Icon Sharp Light
export enum IconSharpLight
{
	//#region A
	Add = "fa-sharp fa-light fa-plus",
	AddressCard = "fa-sharp fa-light fa-address-card",
	Alert = "fa-sharp fa-light fa-triangle-exclamation",
	AngleDown = "fa-sharp fa-light fa-angle-down",
	AngleLeft = "fa-sharp fa-light fa-angle-left",
	AngleRight = "fa-sharp fa-light fa-angle-right",
	AngleUp = "fa-sharp fa-light fa-angle-up",
	Aperture = "fa-sharp fa-light fa-aperture",
	ArrowDown = "fa-sharp fa-light fa-arrow-down",
	ArrowDownShortWide = "fa-sharp fa-light fa-arrow-down-short-wide",
	ArrowDownWideShort = "fa-sharp fa-light fa-arrow-down-wide-short",
	ArrowLeft = "fa-sharp fa-light fa-arrow-left",
	ArrowPointer = "fa-sharp fa-light fa-arrow-pointer",
	ArrowRight = "fa-sharp fa-light fa-arrow-right",
	ArrowRightToBracket = "fa-sharp fa-light fa-arrow-right-to-bracket",
	ArrowRightFromBracket = "fa-sharp fa-light fa-arrow-right-from-bracket",
	ArrowRotateRight = "fa-sharp fa-light fa-arrow-rotate-right",
	ArrowsRotate = "fa-sharp fa-light fa-arrows-rotate",
	ArrowUp = "fa-sharp fa-light fa-arrow-up",
	Asterisk = "fa-sharp fa-light fa-asterisk",
	At = "fa-sharp fa-light fa-at",
	Attachment = "fa-sharp fa-light fa-paperclip",
	//#endregion

	//#region B
	Back = "fa-sharp fa-light fa-angle-left",
	Backward = "fa-sharp fa-light fa-backward",
	BackwardFast = "fa-sharp fa-light fa-backward-fast",
	BackwardStep = "fa-sharp fa-light fa-backward-step",
	BalanceScale = "fa-sharp fa-light fa-balance-scale",
	BallotCheck = "fa-sharp fa-light fa-ballot-check",
	Ban = "fa-sharp fa-light fa-ban",
	Barcode = "fa-sharp fa-light fa-barcode",
	BarcodeScan = "fa-sharp fa-light fa-barcode-scan",
	Bars = "fa-sharp fa-light fa-bars",
	BarsSort = "fa-sharp fa-light fa-bars-sort",
	Bell = "fa-sharp fa-light fa-bell",
	BellSlash = "fa-sharp fa-light fa-bell-slash",
	Bolt = "fa-sharp fa-light fa-bolt",
	Book = "fa-sharp fa-light fa-book",
	BookOpen = "fa-sharp fa-light fa-book-open",
	Box = "fa-sharp fa-light fa-box",
	BoxArchive = "fa-sharp fa-light fa-box-archive",
	BriefCase = "fa-sharp fa-light fa-brief-case",
	Bug = "fa-sharp fa-light fa-bug",
	Burger = "fa-sharp fa-light fa-bars",
	//#endregion

	//#region C
	CakeCandles = "fa-sharp fa-light fa-cake-candles",
	Calendar = "fa-sharp fa-light fa-calendar",
	CalendarAlt = "fa-sharp fa-light fa-calendar-alt",
	CalendarCheck = "fa-sharp fa-light fa-calendar-check",
	CalendarDay = "fa-sharp fa-light fa-calendar-day",
	CalendarPlus = "fa-sharp fa-light fa-calendar-plus",
	Camera = "fa-sharp fa-light fa-camera",
	CameraAlt = "fa-sharp fa-light fa-camera-alt",
	CameraWeb = "fa-sharp fa-light fa-camera-web",
	CameraWebSlash = "fa-sharp fa-light fa-camera-web-slash",
	Capsules = "fa-sharp fa-light fa-capsules",
	CaretDown = "fa-sharp fa-light fa-caret-down",
	CaretLeft = "fa-sharp fa-light fa-caret-left",
	CaretRight = "fa-sharp fa-light fa-caret-right",
	CaretUp = "fa-sharp fa-light fa-caret-up",
	CartCirclePlus = "fa-sharp fa-light fa-cart-circle-plus",
	CartShopping = "fa-sharp fa-light fa-cart-shopping",
	ChartArea = "fa-sharp fa-light fa-chart-area",
	ChartBar = "fa-sharp fa-light fa-chart-bar",
	ChartColumn = "fa-sharp fa-light fa-chart-column",
	ChartLine = "fa-sharp fa-light fa-chart-line",
	ChartPie = "fa-sharp fa-light fa-chart-pie",
	ChartSimple = "fa-sharp fa-light fa-chart-simple",
	Chat = "fa-sharp fa-light fa-comment",
	Check = "fa-sharp fa-light fa-check",
	ChevronDown = "fa-sharp fa-light fa-chevron-down",
	ChevronLeft = "fa-sharp fa-light fa-chevron-left",
	ChevronRight = "fa-sharp fa-light fa-chevron-right",
	ChevronUp = "fa-sharp fa-light fa-chevron-up",
	Circle = "fa-sharp fa-light fa-circle",
	CircleCheck = "fa-sharp fa-light fa-circle-check",
	CircleExclamation = "fa-sharp fa-light fa-circle-exclamation",
	CircleInfo = "fa-sharp fa-light fa-circle-info",
	CircleStop = "fa-sharp fa-light fa-circle-stop",
	Clipboard = "fa-sharp fa-light fa-clipboard",
	ClipboardMedical = "fa-sharp fa-light fa-clipboard-medical",
	Clock = "fa-sharp fa-light fa-clock",
	ClockRotateLeft = "fa-sharp fa-light fa-clock-rotate-left",
	Close = "fa-sharp fa-light fa-xmark",
	Cloud = "fa-sharp fa-light fa-cloud",
	CloudArrowUp = "fa-sharp fa-light fa-cloud-arrow-up",
	CloudDownload = "fa-sharp fa-light fa-cloud-download",
	Code = "fa-sharp fa-light fa-code",
	CodeMerge = "fa-sharp fa-light fa-code-merge",
	Coins = "fa-sharp fa-light fa-coins",
	Collapse = "fa-sharp fa-light fa-compress",
	Comment = "fa-sharp fa-light fa-comment",
	CommentDots = "fa-sharp fa-light fa-comment-dots",
	CommentLines = "fa-sharp fa-light fa-comment-lines",
	Comments = "fa-sharp fa-light fa-comments",
	CommentSms = "fa-sharp fa-light fa-comment-sms",
	Compress = "fa-sharp fa-light fa-compress",
	Copy = "fa-sharp fa-light fa-copy",
	Copyright = "fa-sharp fa-light fa-copyright",
	CreditCard = "fa-sharp fa-light fa-credit-card",
	Crown = "fa-sharp fa-light fa-crown",
	//#endregion

	//#region D
	Database = "fa-sharp fa-light fa-database",
	Delete = "fa-sharp fa-light fa-xmark",
	DeleteLeft = "fa-sharp fa-light fa-delete-left",
	DeleteRight = "fa-sharp fa-light fa-delete-right",
	Desktop = "fa-sharp fa-light fa-desktop",
	Download = "fa-sharp fa-light fa-download",
	//#endregion

	//#region E
	Edit = "fa-sharp fa-light fa-pen",
	Eject = "fa-sharp fa-light fa-eject",
	Ellipsis = "fa-sharp fa-light fa-ellipsis",
	EllipsisVertical = "fa-sharp fa-light fa-ellipsis-vertical",
	Envelope = "fa-sharp fa-light fa-envelope",
	Eraser = "fa-sharp fa-light fa-eraser",
	EuroSign = "fa-sharp fa-light fa-euro-sign",
	Exclamation = "fa-sharp fa-light fa-exclamation",
	Expand = "fa-sharp fa-light fa-expand",
	Eye = "fa-sharp fa-light fa-eye",
	EyeSlash = "fa-sharp fa-light fa-eye-slash",
	//#endregion

	//#region F
	Family = "fa-sharp fa-light fa-family",
	FastBackward = "fa-sharp fa-light fa-fast-backward",
	FastForward = "fa-sharp fa-light fa-fast-forward",
	File = "fa-sharp fa-light fa-file",
	FileAudio = "fa-sharp fa-light fa-file-audio",
	FileContract = "fa-sharp fa-light fa-file-contract",
	FileDownload = "fa-sharp fa-light fa-file-download",
	FileExcel = "fa-sharp fa-light fa-file-excel",
	FileExport = "fa-sharp fa-light fa-file-export",
	FileImage = "fa-sharp fa-light fa-file-image",
	FileInvoice = "fa-sharp fa-light fa-file-invoice",
	FileImport = "fa-sharp fa-light fa-file-import",
	FileLines = "fa-sharp fa-light fa-file-lines",
	FileMusic = "fa-sharp fa-light fa-file-music",
	FilePdf = "fa-sharp fa-light fa-file-pdf",
	Files = "fa-sharp fa-light fa-file-files",
	FileSignature = "fa-sharp fa-light fa-file-signature",
	FileVideo = "fa-sharp fa-light fa-file-video",
	FileWord = "fa-sharp fa-light fa-file-word",
	FileZipper = "fa-sharp fa-light fa-file-zipper",
	Filter = "fa-sharp fa-light fa-filter",
	Flag = "fa-sharp fa-light fa-flag",
	FlagSwallowTail = "fa-sharp fa-light fa-flag-swallowtail",
	FloppyDisk = "fa-sharp fa-light fa-floppy-disk",
	Folder = "fa-sharp fa-light fa-folder",
	FolderOpen = "fa-sharp fa-light fa-folder-open",
	FontAwesome = "fa-sharp fa-light  fa-font-awesome",
	Forward = "fa-sharp fa-light fa-forward",
	ForwardStep = "fa-sharp fa-light fa-forward-step",
	ForwardFast = "fa-sharp fa-light fa-forward-fast",
	Futbol = "fa-sharp fa-light fa-futbol",
	//#endregion

	//#region G
	Gear = "fa-sharp fa-light fa-gear",
	Gears = "fa-sharp fa-light fa-gears",
	Globe = "fa-sharp fa-light fa-globe",
	//#endregion

	//#region H
	Hashtag = "fa-sharp fa-light fa-hashtag",
	HatWizard = "fa-sharp fa-light fa-hat-wizard",
	Headset = "fa-sharp fa-light fa-headset",
	Hospital = "fa-sharp fa-light fa-hospital",
	Hourglass = "fa-sharp fa-light fa-hourglass",
	HourglassClock = "fa-sharp fa-light fa-hourglass-clock",
	House = "fa-sharp fa-light fa-house",
	HouseMedical = "fa-sharp fa-light fa-house-medical",
	HouseUser = "fa-sharp fa-light fa-house-user",
	//#endregion

	//#region I
	Image = "fa-sharp fa-light fa-image",
	Inbox = "fa-sharp fa-light fa-inbox",
	InboxFull = "fa-sharp fa-light fa-inbox-full",
	Info = "fa-sharp fa-light fa-info",
	//#endregion

	//#region K
	Key = "fa-sharp fa-light fa-key",
	Keyboard = "fa-sharp fa-light fa-keyboard",
	KeySkeleton = "fa-sharp fa-light fa-key-skeleton",
	//#endregion

	//#region L
	Laptop = "fa-sharp fa-light fa-laptop",
	LaptopMedical = "fa-sharp fa-light fa-laptop-medical",
	LevelDown = "fa-sharp fa-light fa-level-down",
	LevelDownAlt = "fa-sharp fa-light fa-level-down-alt",
	LevelLeft = "fa-sharp fa-light fa-level-left",
	LevelLeftAlt = "fa-sharp fa-light fa-level-left-alt",
	LevelRight = "fa-sharp fa-light fa-level-right",
	LevelRightAlt = "fa-sharp fa-light fa-level-right-alt",
	LevelUp = "fa-sharp fa-light fa-level-up",
	LevelUpAlt = "fa-sharp fa-light fa-level-up-alt",
	Link = "fa-sharp fa-light fa-link",
	LinkExternal = "fa-sharp fa-light fa-arrow-up-right-from-square",
	LinkHorizontal = "fa-sharp fa-light fa-link-horizontal",
	LinkHorizontalSlash = "fa-sharp fa-light fa-link-horizontal-slash",
	LinkSimple = "fa-sharp fa-light fa-link-simple",
	LinkSimpleSlash = "fa-sharp fa-light fa-link-simple-slash",
	LinkSlash = "fa-sharp fa-light fa-link-slash",
	List = "fa-sharp fa-light fa-list",
	ListCheck = "fa-sharp fa-light fa-list-check",
	ListOl = "fa-sharp fa-light fa-list-ol",
	ListTree = "fa-sharp fa-light fa-list-tree",
	ListUl = "fa-sharp fa-light fa-list-ul",
	LocationArrow = "fa-sharp fa-light fa-location-arrow",
	LocationCrossHairs = "fa-sharp fa-light fa-location-crosshairs",
	LocationCheck = "fa-sharp fa-light fa-location-check",
	LocationDot = "fa-sharp fa-light fa-location-dot",
	Lock = "fa-sharp fa-light fa-lock",
	LockOpen = "fa-sharp fa-light fa-lock-open",
	Login = "fa-sharp fa-light fa-arrow-right-to-bracket",
	Logout = "fa-sharp fa-light fa-arrow-right-from-bracket",
	//#endregion

	//#region M
	MagnifyingGlass = "fa-sharp fa-light fa-magnifying-glass",
	MagnifyingGlassMinus = "fa-sharp fa-light fa-magnifying-glass-minus",
	MagnifyingGlassPlus = "fa-sharp fa-light fa-magnifying-glass-plus",
	Mail = "fa-sharp fa-light fa-envelope",
	Mailbox = "fa-sharp fa-light fa-mailbox",
	MailOpen = "fa-sharp fa-light fa-envelope-open",
	Map = "fa-sharp fa-light fa-map",
	MapLocation = "fa-sharp fa-light fa-map-location",
	MapLocationDot = "fa-sharp fa-light fa-map-location-dot",
	MapPin = "fa-sharp fa-light fa-map-pin",
	Maximize = "fa-sharp fa-light fa-maximize",
	Merge = "fa-sharp fa-light fa-merge",
	Message = "fa-sharp fa-light fa-message",
	MessageCode = "fa-sharp fa-light fa-message-code",
	MessageDots = "fa-sharp fa-light fa-message-dots",
	MessageLines = "fa-sharp fa-light fa-message-lines",
	Messages = "fa-sharp fa-light fa-messages",
	Microphone = "fa-sharp fa-light fa-microphone",
	MicrophoneLines = "fa-sharp fa-light fa-microphone-lines",
	MicrophoneLinesSlash = "fa-sharp fa-light fa-microphone-lines-slash",
	MicrophoneSlash = "fa-sharp fa-light fa-microphone-slash",
	Microscope = "fa-sharp fa-light fa-microscope",
	Minimize = "fa-sharp fa-light fa-minimize",
	Minus = "fa-sharp fa-light fa-minus",
	Mobile = "fa-sharp fa-light fa-mobile",
	MobileNotch = "fa-sharp fa-light fa-mobile-notch",
	MoneyCheckDollarPen = "fa-sharp fa-light fa-money-check-dollar-pen",
	Music = "fa-sharp fa-light fa-music",
	MusicSlash = "fa-sharp fa-light fa-music-slash",
	//#endregion

	//#region Newspaper
	NewsPaper = "fa-sharp fa-light fa-newspaper",
	//#endregion

	//#region P
	Palette = "fa-sharp fa-light fa-palette",
	PaperClip = "fa-sharp fa-light fa-paperclip",
	PaperClipVertical = "fa-sharp fa-light fa-paperclip-vertical",
	PaperPlane = "fa-sharp fa-light fa-paper-plane",
	PaperPlaneTop = "fa-sharp fa-light fa-paper-plane-top",
	Paste = "fa-sharp fa-light fa-paste",
	Pause = "fa-sharp fa-light fa-pause",
	Pen = "fa-sharp fa-light fa-pen",
	Pencil = "fa-sharp fa-light fa-pencil",
	PenToSquare = "fa-sharp fa-light fa-pen-to-square",
	PeopleArrowsLeftRight = "fa-sharp fa-light fa-people-arrows-left-right",
	Percentage = "fa-sharp fa-light fa-percentage",
	PersonChalkboard = "fa-sharp fa-light fa-person-chalkboard",
	PersonMilitaryRifle = "fa-sharp fa-light fa-person-military-rifle",
	Phone = "fa-sharp fa-light fa-phone",
	Play = "fa-sharp fa-light fa-play",
	PlayPause = "fa-sharp fa-light fa-play-pause",
	Plus = "fa-sharp fa-light fa-plus",
	Print = "fa-sharp fa-light fa-print",
	Pumo = "fa-sharp fa-light fa-font-awesome",
	//#endregion

	//#region Q
	Question = "fa-sharp fa-light fa-question",
	//#endregion

	//#region R
	Redo = "fa-sharp fa-light fa-redo",
	RedoAlt = "fa-sharp fa-light fa-redo-alt",
	Refresh = "fa-sharp fa-light fa-arrows-rotate",
	Remove = "fa-sharp fa-light fa-xmark",
	Repeat = "fa-sharp fa-light fa-repeat",
	Reply = "fa-sharp fa-light fa-reply",
	ReplyAll = "fa-sharp fa-light fa-reply-all",
	RightFromBracket = "fa-sharp fa-light fa-right-from-bracket",
	RightToBracket = "fa-sharp fa-light fa-right-to-bracket",
	Rotate = "fa-sharp fa-light fa-rotate",
	RotateLeft = "fa-sharp fa-light fa-rotate-left",
	//#endregion

	//#region S
	SackDollar = "fa-sharp fa-light fa-sack-dollar",
	Save = "fa-sharp fa-light fa-floppy-disk",
	Scissors = "fa-sharp fa-light fa-scissors",
	ScrewdriverWrench = "fa-sharp fa-light fa-screwdriver-wrench",
	Search = "fa-sharp fa-light fa-magnifying-glass",
	SensorTriangleExclamation = "fa-sharp fa-light fa-sensor-triangle-exclamation",
	Settings = "fa-sharp fa-light fa-gear",
	Share = "fa-sharp fa-light fa-share",
	ShareAll = "fa-sharp fa-light fa-share-all",
	ShareNodes = "fa-sharp fa-light fa-share-nodes",
	ShareFromSquare = "fa-sharp fa-light fa-share-from-square",
	ShieldCheck = "fa-sharp fa-light fa-shield-check",
	Ship = "fa-sharp fa-light fa-ship",
	Sitemap = "fa-sharp fa-light fa-sitemap",
	Soccer = "fa-sharp fa-light fa-futbol",
	Sort = "fa-sharp fa-light fa-sort",
	SortDown = "fa-sharp fa-light fa-sort-down",
	SortUp = "fa-sharp fa-light fa-sort-up",
	Spinner = "fa-sharp fa-light fa-spinner",
	Split = "fa-sharp fa-light fa-split",
	SquareCheck = "fa-sharp fa-light fa-square-check",
	SquareMinus = "fa-sharp fa-light fa-square-minus",
	SquarePen = "fa-sharp fa-light fa-square-pen",
	Stamp = "fa-sharp fa-light fa-stamp",
	Star = "fa-sharp fa-light fa-star",
	StepBackward = "fa-sharp fa-light fa-step-backward",
	StepForward = "fa-sharp fa-light fa-step-forward",
	Stethoscope = "fa-sharp fa-light fa-stethoscope",
	Stop = "fa-sharp fa-light fa-stop",
	//#endregion

	//#region T
	Table = "fa-sharp fa-light fa-table",
	TableRows = "fa-sharp fa-light fa-table-rows",
	Tablet = "fa-sharp fa-light fa-tablet",
	Tag = "fa-sharp fa-light fa-tag",
	Tags = "fa-sharp fa-light fa-tags",
	Tasks = "fa-sharp fa-light fa-tasks",
	ThumbsDown = "fa-sharp fa-light fa-thumbs-down",
	ThumbsUp = "fa-sharp fa-light fa-thumbs-up",
	Thumbtack = "fa-sharp fa-light fa-thumbtack",
	Timer = "fa-sharp fa-light fa-timer",
	Trash = "fa-sharp fa-light fa-trash",
	TrashCanList = "fa-sharp fa-light fa-trash-can-list",
	TrashUndo = "fa-sharp fa-light fa-trash-undo",
	TrashXmark = "fa-sharp fa-light fa-trash-xmark",
	TriangleExclamation = "fa-sharp fa-light fa-triangle-exclamation",
	Truck = "fa-sharp fa-light fa-truck",
	//#endregion

	//#region U
	Undo = "fa-sharp fa-light fa-arrow-rotate-left",
	Unlock = "fa-sharp fa-light fa-unlock",
	Upload = "fa-sharp fa-light fa-upload",
	UsbDrive = "fa-sharp fa-light fa-usb-drive",
	User = "fa-sharp fa-light fa-user",
	UserCheck = "fa-sharp fa-light fa-user-check",
	UserClock = "fa-sharp fa-light fa-user-clock",
	UserDoctor = "fa-sharp fa-light fa-user-doctor",
	UserDoctorHair = "fa-sharp fa-light fa-user-doctor-hair",
	UserDoctorHairLong = "fa-sharp fa-light fa-user-doctor-hair-long",
	UserGear = "fa-sharp fa-light fa-user-gear",
	UserGroup = "fa-sharp fa-light fa-user-group",
	UserHair = "fa-sharp fa-light fa-user-hair",
	UserHairLong = "fa-sharp fa-light fa-user-hair-long",
	UserHeadset = "fa-sharp fa-light fa-user-headset",
	Users = "fa-sharp fa-light fa-users",
	UserSecret = "fa-sharp fa-light fa-user-secret",
	UsersMedical = "fa-sharp fa-light fa-users-medical",
	UserTag = "fa-sharp fa-light fa-user-tag",
	UserXmark = "fa-sharp fa-light fa-user-xmark",
	//#endregion

	//#region V
	Video = "fa-sharp fa-light fa-video",
	VideoSlash = "fa-sharp fa-light fa-video-slash",
	Volume = "fa-sharp fa-light fa-volume",
	VolumeHigh = "fa-sharp fa-light fa-volume-high",
	VolumeLow = "fa-sharp fa-light fa-volume-low",
	VolumeOff = "fa-sharp fa-light fa-volume-off",
	VolumeSlash = "fa-sharp fa-light fa-volume-slash",
	VolumeXmark = "fa-sharp fa-light fa-volume-xmark",
	//#endregion

	//#region W
	Wifi = "fa-sharp fa-light fa-wifi",
	WifiExclamation = "fa-sharp fa-light fa-wifi-exclamation",
	WifiFair = "fa-sharp fa-light fa-wifi-fair",
	WifiSlash = "fa-sharp fa-light fa-wifi-slash",
	Window = "fa-sharp fa-light fa-window",
	//#endregion

	//#region X
	Xmark = "fa-sharp fa-light fa-xmark",
	//#endregion
}
//#endregion

//#region Icon Sharp Regular
export enum IconSharpRegular
{
	//#region A
	Add = "fa-sharp fa-regular fa-plus",
	AddressCard = "fa-sharp fa-regular fa-address-card",
	Alert = "fa-sharp fa-regular fa-triangle-exclamation",
	AngleDown = "fa-sharp fa-regular fa-angle-down",
	AngleLeft = "fa-sharp fa-regular fa-angle-left",
	AngleRight = "fa-sharp fa-regular fa-angle-right",
	AngleUp = "fa-sharp fa-regular fa-angle-up",
	Aperture = "fa-sharp fa-regular fa-aperture",
	ArrowDown = "fa-sharp fa-regular fa-arrow-down",
	ArrowDownShortWide = "fa-sharp fa-regular fa-arrow-down-short-wide",
	ArrowDownWideShort = "fa-sharp fa-regular fa-arrow-down-wide-short",
	ArrowLeft = "fa-sharp fa-regular fa-arrow-left",
	ArrowPointer = "fa-sharp fa-regular fa-arrow-pointer",
	ArrowRight = "fa-sharp fa-regular fa-arrow-right",
	ArrowRightToBracket = "fa-sharp fa-regular fa-arrow-right-to-bracket",
	ArrowRightFromBracket = "fa-sharp fa-regular fa-arrow-right-from-bracket",
	ArrowRotateRight = "fa-sharp fa-regular fa-arrow-rotate-right",
	ArrowsRotate = "fa-sharp fa-regular fa-arrows-rotate",
	ArrowUp = "fa-sharp fa-regular fa-arrow-up",
	Asterisk = "fa-sharp fa-regular fa-asterisk",
	At = "fa-sharp fa-regular fa-at",
	Attachment = "fa-sharp fa-regular fa-paperclip",
	//#endregion

	//#region B
	Back = "fa-sharp fa-regular fa-angle-left",
	Backward = "fa-sharp fa-regular fa-backward",
	BackwardFast = "fa-sharp fa-regular fa-backward-fast",
	BackwardStep = "fa-sharp fa-regular fa-backward-step",
	BalanceScale = "fa-sharp fa-regular fa-balance-scale",
	BallotCheck = "fa-sharp fa-regular fa-ballot-check",
	Ban = "fa-sharp fa-regular fa-ban",
	Barcode = "fa-sharp fa-regular fa-barcode",
	BarcodeScan = "fa-sharp fa-regular fa-barcode-scan",
	Bars = "fa-sharp fa-regular fa-bars",
	BarsSort = "fa-sharp fa-regular fa-bars-sort",
	Bell = "fa-sharp fa-regular fa-bell",
	BellSlash = "fa-sharp fa-regular fa-bell-slash",
	Bolt = "fa-sharp fa-regular fa-bolt",
	Book = "fa-sharp fa-regular fa-book",
	BookOpen = "fa-sharp fa-regular fa-book-open",
	Box = "fa-sharp fa-regular fa-box",
	BoxArchive = "fa-sharp fa-regular fa-box-archive",
	BriefCase = "fa-sharp fa-regular fa-brief-case",
	Bug = "fa-sharp fa-regular fa-bug",
	Burger = "fa-sharp fa-regular fa-bars",
	//#endregion

	//#region C
	CakeCandles = "fa-sharp fa-regular fa-cake-candles",
	Calendar = "fa-sharp fa-regular fa-calendar",
	CalendarAlt = "fa-sharp fa-regular fa-calendar-alt",
	CalendarCheck = "fa-sharp fa-regular fa-calendar-check",
	CalendarDay = "fa-sharp fa-regular fa-calendar-day",
	CalendarPlus = "fa-sharp fa-regular fa-calendar-plus",
	Camera = "fa-sharp fa-regular fa-camera",
	CameraAlt = "fa-sharp fa-regular fa-camera-alt",
	CameraWeb = "fa-sharp fa-regular fa-camera-web",
	CameraWebSlash = "fa-sharp fa-regular fa-camera-web-slash",
	Capsules = "fa-sharp fa-regular fa-capsules",
	CaretDown = "fa-sharp fa-regular fa-caret-down",
	CaretLeft = "fa-sharp fa-regular fa-caret-left",
	CaretRight = "fa-sharp fa-regular fa-caret-right",
	CaretUp = "fa-sharp fa-regular fa-caret-up",
	CartCirclePlus = "fa-sharp fa-regular fa-cart-circle-plus",
	CartShopping = "fa-sharp fa-regular fa-cart-shopping",
	ChartArea = "fa-sharp fa-regular fa-chart-area",
	ChartBar = "fa-sharp fa-regular fa-chart-bar",
	ChartColumn = "fa-sharp fa-regular fa-chart-column",
	ChartLine = "fa-sharp fa-regular fa-chart-line",
	ChartPie = "fa-sharp fa-regular fa-chart-pie",
	ChartSimple = "fa-sharp fa-regular fa-chart-simple",
	Chat = "fa-sharp fa-regular fa-comment",
	Check = "fa-sharp fa-regular fa-check",
	ChevronDown = "fa-sharp fa-regular fa-chevron-down",
	ChevronLeft = "fa-sharp fa-regular fa-chevron-left",
	ChevronRight = "fa-sharp fa-regular fa-chevron-right",
	ChevronUp = "fa-sharp fa-regular fa-chevron-up",
	Circle = "fa-sharp fa-regular fa-circle",
	CircleCheck = "fa-sharp fa-regular fa-circle-check",
	CircleExclamation = "fa-sharp fa-regular fa-circle-exclamation",
	CircleInfo = "fa-sharp fa-regular fa-circle-info",
	CircleStop = "fa-sharp fa-regular fa-circle-stop",
	Clipboard = "fa-sharp fa-regular fa-clipboard",
	ClipboardMedical = "fa-sharp fa-regular fa-clipboard-medical",
	Clock = "fa-sharp fa-regular fa-clock",
	ClockRotateLeft = "fa-sharp fa-regular fa-clock-rotate-left",
	Close = "fa-sharp fa-regular fa-xmark",
	Cloud = "fa-sharp fa-regular fa-cloud",
	CloudArrowUp = "fa-sharp fa-regular fa-cloud-arrow-up",
	CloudDownload = "fa-sharp fa-regular fa-cloud-download",
	Code = "fa-sharp fa-regular fa-code",
	CodeMerge = "fa-sharp fa-regular fa-code-merge",
	Coins = "fa-sharp fa-regular fa-coins",
	Collapse = "fa-sharp fa-regular fa-compress",
	Comment = "fa-sharp fa-regular fa-comment",
	CommentDots = "fa-sharp fa-regular fa-comment-dots",
	CommentLines = "fa-sharp fa-regular fa-comment-lines",
	Comments = "fa-sharp fa-regular fa-comments",
	CommentSms = "fa-sharp fa-regular fa-comment-sms",
	Compress = "fa-sharp fa-regular fa-compress",
	Copy = "fa-sharp fa-regular fa-copy",
	Copyright = "fa-sharp fa-regular fa-copyright",
	CreditCard = "fa-sharp fa-regular fa-credit-card",
	Crown = "fa-sharp fa-regular fa-crown",
	//#endregion

	//#region D
	Database = "fa-sharp fa-regular fa-database",
	Delete = "fa-sharp fa-regular fa-xmark",
	DeleteLeft = "fa-sharp fa-regular fa-delete-left",
	DeleteRight = "fa-sharp fa-regular fa-delete-right",
	Desktop = "fa-sharp fa-regular fa-desktop",
	Download = "fa-sharp fa-regular fa-download",
	//#endregion

	//#region E
	Edit = "fa-sharp fa-regular fa-pen",
	Eject = "fa-sharp fa-regular fa-eject",
	Ellipsis = "fa-sharp fa-regular fa-ellipsis",
	EllipsisVertical = "fa-sharp fa-regular fa-ellipsis-vertical",
	Envelope = "fa-sharp fa-regular fa-envelope",
	Eraser = "fa-sharp fa-regular fa-eraser",
	EuroSign = "fa-sharp fa-regular fa-euro-sign",
	Exclamation = "fa-sharp fa-regular fa-exclamation",
	Expand = "fa-sharp fa-regular fa-expand",
	Eye = "fa-sharp fa-regular fa-eye",
	EyeSlash = "fa-sharp fa-regular fa-eye-slash",
	//#endregion

	//#region F
	Family = "fa-sharp fa-regular fa-family",
	FastBackward = "fa-sharp fa-regular fa-fast-backward",
	FastForward = "fa-sharp fa-regular fa-fast-forward",
	File = "fa-sharp fa-regular fa-file",
	FileAudio = "fa-sharp fa-regular fa-file-audio",
	FileContract = "fa-sharp fa-regular fa-file-contract",
	FileDownload = "fa-sharp fa-regular fa-file-download",
	FileExcel = "fa-sharp fa-regular fa-file-excel",
	FileExport = "fa-sharp fa-regular fa-file-export",
	FileImage = "fa-sharp fa-regular fa-file-image",
	FileInvoice = "fa-sharp fa-regular fa-file-invoice",
	FileImport = "fa-sharp fa-regular fa-file-import",
	FileLines = "fa-sharp fa-regular fa-file-lines",
	FileMusic = "fa-sharp fa-regular fa-file-music",
	FilePdf = "fa-sharp fa-regular fa-file-pdf",
	Files = "fa-sharp fa-regular fa-file-files",
	FileSignature = "fa-sharp fa-regular fa-file-signature",
	FileVideo = "fa-sharp fa-regular fa-file-video",
	FileWord = "fa-sharp fa-regular fa-file-word",
	FileZipper = "fa-sharp fa-regular fa-file-zipper",
	Filter = "fa-sharp fa-regular fa-filter",
	Flag = "fa-sharp fa-regular fa-flag",
	FlagSwallowTail = "fa-sharp fa-regular fa-flag-swallowtail",
	FloppyDisk = "fa-sharp fa-regular fa-floppy-disk",
	Folder = "fa-sharp fa-regular fa-folder",
	FolderOpen = "fa-sharp fa-regular fa-folder-open",
	FontAwesome = "fa-sharp fa-regular  fa-font-awesome",
	Forward = "fa-sharp fa-regular fa-forward",
	ForwardStep = "fa-sharp fa-regular fa-forward-step",
	ForwardFast = "fa-sharp fa-regular fa-forward-fast",
	Futbol = "fa-sharp fa-regular fa-futbol",
	//#endregion

	//#region G
	Gear = "fa-sharp fa-regular fa-gear",
	Gears = "fa-sharp fa-regular fa-gears",
	Globe = "fa-sharp fa-regular fa-globe",
	//#endregion

	//#region H
	Hashtag = "fa-sharp fa-regular fa-hashtag",
	HatWizard = "fa-sharp fa-regular fa-hat-wizard",
	Headset = "fa-sharp fa-regular fa-headset",
	Hospital = "fa-sharp fa-regular fa-hospital",
	Hourglass = "fa-sharp fa-regular fa-hourglass",
	HourglassClock = "fa-sharp fa-regular fa-hourglass-clock",
	House = "fa-sharp fa-regular fa-house",
	HouseMedical = "fa-sharp fa-regular fa-house-medical",
	HouseUser = "fa-sharp fa-regular fa-house-user",
	//#endregion

	//#region I
	Image = "fa-sharp fa-regular fa-image",
	Inbox = "fa-sharp fa-regular fa-inbox",
	InboxFull = "fa-sharp fa-regular fa-inbox-full",
	Info = "fa-sharp fa-regular fa-info",
	//#endregion

	//#region K
	Key = "fa-sharp fa-regular fa-key",
	Keyboard = "fa-sharp fa-regular fa-keyboard",
	KeySkeleton = "fa-sharp fa-regular fa-key-skeleton",
	//#endregion

	//#region L
	Laptop = "fa-sharp fa-regular fa-laptop",
	LaptopMedical = "fa-sharp fa-regular fa-laptop-medical",
	LevelDown = "fa-sharp fa-regular fa-level-down",
	LevelDownAlt = "fa-sharp fa-regular fa-level-down-alt",
	LevelLeft = "fa-sharp fa-regular fa-level-left",
	LevelLeftAlt = "fa-sharp fa-regular fa-level-left-alt",
	LevelRight = "fa-sharp fa-regular fa-level-right",
	LevelRightAlt = "fa-sharp fa-regular fa-level-right-alt",
	LevelUp = "fa-sharp fa-regular fa-level-up",
	LevelUpAlt = "fa-sharp fa-regular fa-level-up-alt",
	Link = "fa-sharp fa-regular fa-link",
	LinkExternal = "fa-sharp fa-regular fa-arrow-up-right-from-square",
	LinkHorizontal = "fa-sharp fa-regular fa-link-horizontal",
	LinkHorizontalSlash = "fa-sharp fa-regular fa-link-horizontal-slash",
	LinkSimple = "fa-sharp fa-regular fa-link-simple",
	LinkSimpleSlash = "fa-sharp fa-regular fa-link-simple-slash",
	LinkSlash = "fa-sharp fa-regular fa-link-slash",
	List = "fa-sharp fa-regular fa-list",
	ListCheck = "fa-sharp fa-regular fa-list-check",
	ListOl = "fa-sharp fa-regular fa-list-ol",
	ListTree = "fa-sharp fa-regular fa-list-tree",
	ListUl = "fa-sharp fa-regular fa-list-ul",
	LocationArrow = "fa-sharp fa-regular fa-location-arrow",
	LocationCrossHairs = "fa-sharp fa-regular fa-location-crosshairs",
	LocationCheck = "fa-sharp fa-regular fa-location-check",
	LocationDot = "fa-sharp fa-regular fa-location-dot",
	Lock = "fa-sharp fa-regular fa-lock",
	LockOpen = "fa-sharp fa-regular fa-lock-open",
	Login = "fa-sharp fa-regular fa-arrow-right-to-bracket",
	Logout = "fa-sharp fa-regular fa-arrow-right-from-bracket",
	//#endregion

	//#region M
	MagnifyingGlass = "fa-sharp fa-regular fa-magnifying-glass",
	MagnifyingGlassMinus = "fa-sharp fa-regular fa-magnifying-glass-minus",
	MagnifyingGlassPlus = "fa-sharp fa-regular fa-magnifying-glass-plus",
	Mail = "fa-sharp fa-regular fa-envelope",
	Mailbox = "fa-sharp fa-regular fa-mailbox",
	MailOpen = "fa-sharp fa-regular fa-envelope-open",
	Map = "fa-sharp fa-regular fa-map",
	MapLocation = "fa-sharp fa-regular fa-map-location",
	MapLocationDot = "fa-sharp fa-regular fa-map-location-dot",
	MapPin = "fa-sharp fa-regular fa-map-pin",
	Maximize = "fa-sharp fa-regular fa-maximize",
	Merge = "fa-sharp fa-regular fa-merge",
	Message = "fa-sharp fa-regular fa-message",
	MessageCode = "fa-sharp fa-regular fa-message-code",
	MessageDots = "fa-sharp fa-regular fa-message-dots",
	MessageLines = "fa-sharp fa-regular fa-message-lines",
	Messages = "fa-sharp fa-regular fa-messages",
	Microphone = "fa-sharp fa-regular fa-microphone",
	MicrophoneLines = "fa-sharp fa-regular fa-microphone-lines",
	MicrophoneLinesSlash = "fa-sharp fa-regular fa-microphone-lines-slash",
	MicrophoneSlash = "fa-sharp fa-regular fa-microphone-slash",
	Microscope = "fa-sharp fa-regular fa-microscope",
	Minimize = "fa-sharp fa-regular fa-minimize",
	Minus = "fa-sharp fa-regular fa-minus",
	Mobile = "fa-sharp fa-regular fa-mobile",
	MobileNotch = "fa-sharp fa-regular fa-mobile-notch",
	MoneyCheckDollarPen = "fa-sharp fa-regular fa-money-check-dollar-pen",
	Music = "fa-sharp fa-regular fa-music",
	MusicSlash = "fa-sharp fa-regular fa-music-slash",
	//#endregion

	//#region Newspaper
	NewsPaper = "fa-sharp fa-regular fa-newspaper",
	//#endregion

	//#region P
	Palette = "fa-sharp fa-regular fa-palette",
	PaperClip = "fa-sharp fa-regular fa-paperclip",
	PaperClipVertical = "fa-sharp fa-regular fa-paperclip-vertical",
	PaperPlane = "fa-sharp fa-regular fa-paper-plane",
	PaperPlaneTop = "fa-sharp fa-regular fa-paper-plane-top",
	Paste = "fa-sharp fa-regular fa-paste",
	Pause = "fa-sharp fa-regular fa-pause",
	Pen = "fa-sharp fa-regular fa-pen",
	Pencil = "fa-sharp fa-regular fa-pencil",
	PenToSquare = "fa-sharp fa-regular fa-pen-to-square",
	PeopleArrowsLeftRight = "fa-sharp fa-regular fa-people-arrows-left-right",
	Percentage = "fa-sharp fa-regular fa-percentage",
	PersonChalkboard = "fa-sharp fa-regular fa-person-chalkboard",
	PersonMilitaryRifle = "fa-sharp fa-regular fa-person-military-rifle",
	Phone = "fa-sharp fa-regular fa-phone",
	Play = "fa-sharp fa-regular fa-play",
	PlayPause = "fa-sharp fa-regular fa-play-pause",
	Plus = "fa-sharp fa-regular fa-plus",
	Print = "fa-sharp fa-regular fa-print",
	Pumo = "fa-sharp fa-regular fa-font-awesome",
	//#endregion

	//#region Q
	Question = "fa-sharp fa-regular fa-question",
	//#endregion

	//#region R
	Redo = "fa-sharp fa-regular fa-redo",
	RedoAlt = "fa-sharp fa-regular fa-redo-alt",
	Refresh = "fa-sharp fa-regular fa-arrows-rotate",
	Remove = "fa-sharp fa-regular fa-xmark",
	Repeat = "fa-sharp fa-regular fa-repeat",
	Reply = "fa-sharp fa-regular fa-reply",
	ReplyAll = "fa-sharp fa-regular fa-reply-all",
	RightFromBracket = "fa-sharp fa-regular fa-right-from-bracket",
	RightToBracket = "fa-sharp fa-regular fa-right-to-bracket",
	Rotate = "fa-sharp fa-regular fa-rotate",
	RotateLeft = "fa-sharp fa-regular fa-rotate-left",
	//#endregion

	//#region S
	SackDollar = "fa-sharp fa-regular fa-sack-dollar",
	Save = "fa-sharp fa-regular fa-floppy-disk",
	Scissors = "fa-sharp fa-regular fa-scissors",
	ScrewdriverWrench = "fa-sharp fa-regular fa-screwdriver-wrench",
	Search = "fa-sharp fa-regular fa-magnifying-glass",
	SensorTriangleExclamation = "fa-sharp fa-regular fa-sensor-triangle-exclamation",
	Settings = "fa-sharp fa-regular fa-gear",
	Share = "fa-sharp fa-regular fa-share",
	ShareAll = "fa-sharp fa-regular fa-share-all",
	ShareNodes = "fa-sharp fa-regular fa-share-nodes",
	ShareFromSquare = "fa-sharp fa-regular fa-share-from-square",
	ShieldCheck = "fa-sharp fa-regular fa-shield-check",
	Ship = "fa-sharp fa-regular fa-ship",
	Sitemap = "fa-sharp fa-regular fa-sitemap",
	Soccer = "fa-sharp fa-regular fa-futbol",
	Sort = "fa-sharp fa-regular fa-sort",
	SortDown = "fa-sharp fa-regular fa-sort-down",
	SortUp = "fa-sharp fa-regular fa-sort-up",
	Spinner = "fa-sharp fa-regular fa-spinner",
	Split = "fa-sharp fa-regular fa-split",
	SquareCheck = "fa-sharp fa-regular fa-square-check",
	SquareMinus = "fa-sharp fa-regular fa-square-minus",
	SquarePen = "fa-sharp fa-regular fa-square-pen",
	Stamp = "fa-sharp fa-regular fa-stamp",
	Star = "fa-sharp fa-regular fa-star",
	StepBackward = "fa-sharp fa-regular fa-step-backward",
	StepForward = "fa-sharp fa-regular fa-step-forward",
	Stethoscope = "fa-sharp fa-regular fa-stethoscope",
	Stop = "fa-sharp fa-regular fa-stop",
	//#endregion

	//#region T
	Table = "fa-sharp fa-regular fa-table",
	TableRows = "fa-sharp fa-regular fa-table-rows",
	Tablet = "fa-sharp fa-regular fa-tablet",
	Tag = "fa-sharp fa-regular fa-tag",
	Tags = "fa-sharp fa-regular fa-tags",
	Tasks = "fa-sharp fa-regular fa-tasks",
	ThumbsDown = "fa-sharp fa-regular fa-thumbs-down",
	ThumbsUp = "fa-sharp fa-regular fa-thumbs-up",
	Thumbtack = "fa-sharp fa-regular fa-thumbtack",
	Timer = "fa-sharp fa-regular fa-timer",
	Trash = "fa-sharp fa-regular fa-trash",
	TrashCanList = "fa-sharp fa-regular fa-trash-can-list",
	TrashUndo = "fa-sharp fa-regular fa-trash-undo",
	TrashXmark = "fa-sharp fa-regular fa-trash-xmark",
	TriangleExclamation = "fa-sharp fa-regular fa-triangle-exclamation",
	Truck = "fa-sharp fa-regular fa-truck",
	//#endregion

	//#region U
	Undo = "fa-sharp fa-regular fa-arrow-rotate-left",
	Unlock = "fa-sharp fa-regular fa-unlock",
	Upload = "fa-sharp fa-regular fa-upload",
	UsbDrive = "fa-sharp fa-regular fa-usb-drive",
	User = "fa-sharp fa-regular fa-user",
	UserCheck = "fa-sharp fa-regular fa-user-check",
	UserClock = "fa-sharp fa-regular fa-user-clock",
	UserDoctor = "fa-sharp fa-regular fa-user-doctor",
	UserDoctorHair = "fa-sharp fa-regular fa-user-doctor-hair",
	UserDoctorHairLong = "fa-sharp fa-regular fa-user-doctor-hair-long",
	UserGear = "fa-sharp fa-regular fa-user-gear",
	UserGroup = "fa-sharp fa-regular fa-user-group",
	UserHair = "fa-sharp fa-regular fa-user-hair",
	UserHairLong = "fa-sharp fa-regular fa-user-hair-long",
	UserHeadset = "fa-sharp fa-regular fa-user-headset",
	Users = "fa-sharp fa-regular fa-users",
	UserSecret = "fa-sharp fa-regular fa-user-secret",
	UsersMedical = "fa-sharp fa-regular fa-users-medical",
	UserTag = "fa-sharp fa-regular fa-user-tag",
	UserXmark = "fa-sharp fa-regular fa-user-xmark",
	//#endregion

	//#region V
	Video = "fa-sharp fa-regular fa-video",
	VideoSlash = "fa-sharp fa-regular fa-video-slash",
	Volume = "fa-sharp fa-regular fa-volume",
	VolumeHigh = "fa-sharp fa-regular fa-volume-high",
	VolumeLow = "fa-sharp fa-regular fa-volume-low",
	VolumeOff = "fa-sharp fa-regular fa-volume-off",
	VolumeSlash = "fa-sharp fa-regular fa-volume-slash",
	VolumeXmark = "fa-sharp fa-regular fa-volume-xmark",
	//#endregion

	//#region W
	Wifi = "fa-sharp fa-regular fa-wifi",
	WifiExclamation = "fa-sharp fa-regular fa-wifi-exclamation",
	WifiFair = "fa-sharp fa-regular fa-wifi-fair",
	WifiSlash = "fa-sharp fa-regular fa-wifi-slash",
	Window = "fa-sharp fa-regular fa-window",
	//#endregion

	//#region X
	Xmark = "fa-sharp fa-regular fa-xmark",
	//#endregion
}
//#endregion

//#region Icon Sharp Duotone
export enum IconSharpDuotone
{
	//#region A
	Add = "fa-sharp fa-duotone fa-plus",
	AddressCard = "fa-sharp fa-duotone fa-address-card",
	Alert = "fa-sharp fa-duotone fa-triangle-exclamation",
	AngleDown = "fa-sharp fa-duotone fa-angle-down",
	AngleLeft = "fa-sharp fa-duotone fa-angle-left",
	AngleRight = "fa-sharp fa-duotone fa-angle-right",
	AngleUp = "fa-sharp fa-duotone fa-angle-up",
	Aperture = "fa-sharp fa-duotone fa-aperture",
	ArrowDown = "fa-sharp fa-duotone fa-arrow-down",
	ArrowDownShortWide = "fa-sharp fa-duotone fa-arrow-down-short-wide",
	ArrowDownWideShort = "fa-sharp fa-duotone fa-arrow-down-wide-short",
	ArrowLeft = "fa-sharp fa-duotone fa-arrow-left",
	ArrowPointer = "fa-sharp fa-duotone fa-arrow-pointer",
	ArrowRight = "fa-sharp fa-duotone fa-arrow-right",
	ArrowRightToBracket = "fa-sharp fa-duotone fa-arrow-right-to-bracket",
	ArrowRightFromBracket = "fa-sharp fa-duotone fa-arrow-right-from-bracket",
	ArrowRotateRight = "fa-sharp fa-duotone fa-arrow-rotate-right",
	ArrowsRotate = "fa-sharp fa-duotone fa-arrows-rotate",
	ArrowUp = "fa-sharp fa-duotone fa-arrow-up",
	Asterisk = "fa-sharp fa-duotone fa-asterisk",
	At = "fa-sharp fa-duotone fa-at",
	Attachment = "fa-sharp fa-duotone fa-paperclip",
	//#endregion

	//#region B
	Back = "fa-sharp fa-duotone fa-angle-left",
	Backward = "fa-sharp fa-duotone fa-backward",
	BackwardFast = "fa-sharp fa-duotone fa-backward-fast",
	BackwardStep = "fa-sharp fa-duotone fa-backward-step",
	BalanceScale = "fa-sharp fa-duotone fa-balance-scale",
	BallotCheck = "fa-sharp fa-duotone fa-ballot-check",
	Ban = "fa-sharp fa-duotone fa-ban",
	Barcode = "fa-sharp fa-duotone fa-barcode",
	BarcodeScan = "fa-sharp fa-duotone fa-barcode-scan",
	Bars = "fa-sharp fa-duotone fa-bars",
	BarsSort = "fa-sharp fa-duotone fa-bars-sort",
	Bell = "fa-sharp fa-duotone fa-bell",
	BellSlash = "fa-sharp fa-duotone fa-bell-slash",
	Bolt = "fa-sharp fa-duotone fa-bolt",
	Book = "fa-sharp fa-duotone fa-book",
	BookOpen = "fa-sharp fa-duotone fa-book-open",
	Box = "fa-sharp fa-duotone fa-box",
	BoxArchive = "fa-sharp fa-duotone fa-box-archive",
	BriefCase = "fa-sharp fa-duotone fa-brief-case",
	Bug = "fa-sharp fa-duotone fa-bug",
	Burger = "fa-sharp fa-duotone fa-bars",
	//#endregion

	//#region C
	CakeCandles = "fa-sharp fa-duotone fa-cake-candles",
	Calendar = "fa-sharp fa-duotone fa-calendar",
	CalendarAlt = "fa-sharp fa-duotone fa-calendar-alt",
	CalendarCheck = "fa-sharp fa-duotone fa-calendar-check",
	CalendarDay = "fa-sharp fa-duotone fa-calendar-day",
	CalendarPlus = "fa-sharp fa-duotone fa-calendar-plus",
	Camera = "fa-sharp fa-duotone fa-camera",
	CameraAlt = "fa-sharp fa-duotone fa-camera-alt",
	CameraWeb = "fa-sharp fa-duotone fa-camera-web",
	CameraWebSlash = "fa-sharp fa-duotone fa-camera-web-slash",
	Capsules = "fa-sharp fa-duotone fa-capsules",
	CaretDown = "fa-sharp fa-duotone fa-caret-down",
	CaretLeft = "fa-sharp fa-duotone fa-caret-left",
	CaretRight = "fa-sharp fa-duotone fa-caret-right",
	CaretUp = "fa-sharp fa-duotone fa-caret-up",
	CartCirclePlus = "fa-sharp fa-duotone fa-cart-circle-plus",
	CartShopping = "fa-sharp fa-duotone fa-cart-shopping",
	ChartArea = "fa-sharp fa-duotone fa-chart-area",
	ChartBar = "fa-sharp fa-duotone fa-chart-bar",
	ChartColumn = "fa-sharp fa-duotone fa-chart-column",
	ChartLine = "fa-sharp fa-duotone fa-chart-line",
	ChartPie = "fa-sharp fa-duotone fa-chart-pie",
	ChartSimple = "fa-sharp fa-duotone fa-chart-simple",
	Chat = "fa-sharp fa-duotone fa-comment",
	Check = "fa-sharp fa-duotone fa-check",
	ChevronDown = "fa-sharp fa-duotone fa-chevron-down",
	ChevronLeft = "fa-sharp fa-duotone fa-chevron-left",
	ChevronRight = "fa-sharp fa-duotone fa-chevron-right",
	ChevronUp = "fa-sharp fa-duotone fa-chevron-up",
	Circle = "fa-sharp fa-duotone fa-circle",
	CircleCheck = "fa-sharp fa-duotone fa-circle-check",
	CircleExclamation = "fa-sharp fa-duotone fa-circle-exclamation",
	CircleInfo = "fa-sharp fa-duotone fa-circle-info",
	CircleStop = "fa-sharp fa-duotone fa-circle-stop",
	Clipboard = "fa-sharp fa-duotone fa-clipboard",
	ClipboardMedical = "fa-sharp fa-duotone fa-clipboard-medical",
	Clock = "fa-sharp fa-duotone fa-clock",
	ClockRotateLeft = "fa-sharp fa-duotone fa-clock-rotate-left",
	Close = "fa-sharp fa-duotone fa-xmark",
	Cloud = "fa-sharp fa-duotone fa-cloud",
	CloudArrowUp = "fa-sharp fa-duotone fa-cloud-arrow-up",
	CloudDownload = "fa-sharp fa-duotone fa-cloud-download",
	Code = "fa-sharp fa-duotone fa-code",
	CodeMerge = "fa-sharp fa-duotone fa-code-merge",
	Coins = "fa-sharp fa-duotone fa-coins",
	Collapse = "fa-sharp fa-duotone fa-compress",
	Comment = "fa-sharp fa-duotone fa-comment",
	CommentDots = "fa-sharp fa-duotone fa-comment-dots",
	CommentLines = "fa-sharp fa-duotone fa-comment-lines",
	Comments = "fa-sharp fa-duotone fa-comments",
	CommentSms = "fa-sharp fa-duotone fa-comment-sms",
	Compress = "fa-sharp fa-duotone fa-compress",
	Copy = "fa-sharp fa-duotone fa-copy",
	Copyright = "fa-sharp fa-duotone fa-copyright",
	CreditCard = "fa-sharp fa-duotone fa-credit-card",
	Crown = "fa-sharp fa-duotone fa-crown",
	//#endregion

	//#region D
	Database = "fa-sharp fa-duotone fa-database",
	Delete = "fa-sharp fa-duotone fa-xmark",
	DeleteLeft = "fa-sharp fa-duotone fa-delete-left",
	DeleteRight = "fa-sharp fa-duotone fa-delete-right",
	Desktop = "fa-sharp fa-duotone fa-desktop",
	Download = "fa-sharp fa-duotone fa-download",
	//#endregion

	//#region E
	Edit = "fa-sharp fa-duotone fa-pen",
	Eject = "fa-sharp fa-duotone fa-eject",
	Ellipsis = "fa-sharp fa-duotone fa-ellipsis",
	EllipsisVertical = "fa-sharp fa-duotone fa-ellipsis-vertical",
	Envelope = "fa-sharp fa-duotone fa-envelope",
	Eraser = "fa-sharp fa-duotone fa-eraser",
	EuroSign = "fa-sharp fa-duotone fa-euro-sign",
	Exclamation = "fa-sharp fa-duotone fa-exclamation",
	Expand = "fa-sharp fa-duotone fa-expand",
	Eye = "fa-sharp fa-duotone fa-eye",
	EyeSlash = "fa-sharp fa-duotone fa-eye-slash",
	//#endregion

	//#region F
	Family = "fa-sharp fa-duotone fa-family",
	FastBackward = "fa-sharp fa-duotone fa-fast-backward",
	FastForward = "fa-sharp fa-duotone fa-fast-forward",
	File = "fa-sharp fa-duotone fa-file",
	FileAudio = "fa-sharp fa-duotone fa-file-audio",
	FileContract = "fa-sharp fa-duotone fa-file-contract",
	FileDownload = "fa-sharp fa-duotone fa-file-download",
	FileExcel = "fa-sharp fa-duotone fa-file-excel",
	FileExport = "fa-sharp fa-duotone fa-file-export",
	FileImage = "fa-sharp fa-duotone fa-file-image",
	FileInvoice = "fa-sharp fa-duotone fa-file-invoice",
	FileImport = "fa-sharp fa-duotone fa-file-import",
	FileLines = "fa-sharp fa-duotone fa-file-lines",
	FileMusic = "fa-sharp fa-duotone fa-file-music",
	FilePdf = "fa-sharp fa-duotone fa-file-pdf",
	Files = "fa-sharp fa-duotone fa-file-files",
	FileSignature = "fa-sharp fa-duotone fa-file-signature",
	FileVideo = "fa-sharp fa-duotone fa-file-video",
	FileWord = "fa-sharp fa-duotone fa-file-word",
	FileZipper = "fa-sharp fa-duotone fa-file-zipper",
	Filter = "fa-sharp fa-duotone fa-filter",
	Flag = "fa-sharp fa-duotone fa-flag",
	FlagSwallowTail = "fa-sharp fa-duotone fa-flag-swallowtail",
	FloppyDisk = "fa-sharp fa-duotone fa-floppy-disk",
	Folder = "fa-sharp fa-duotone fa-folder",
	FolderOpen = "fa-sharp fa-duotone fa-folder-open",
	FontAwesome = "fa-sharp fa-duotone  fa-font-awesome",
	Forward = "fa-sharp fa-duotone fa-forward",
	ForwardStep = "fa-sharp fa-duotone fa-forward-step",
	ForwardFast = "fa-sharp fa-duotone fa-forward-fast",
	Futbol = "fa-sharp fa-duotone fa-futbol",
	//#endregion

	//#region G
	Gear = "fa-sharp fa-duotone fa-gear",
	Gears = "fa-sharp fa-duotone fa-gears",
	Globe = "fa-sharp fa-duotone fa-globe",
	//#endregion

	//#region H
	Hashtag = "fa-sharp fa-duotone fa-hashtag",
	HatWizard = "fa-sharp fa-duotone fa-hat-wizard",
	Headset = "fa-sharp fa-duotone fa-headset",
	Hospital = "fa-sharp fa-duotone fa-hospital",
	Hourglass = "fa-sharp fa-duotone fa-hourglass",
	HourglassClock = "fa-sharp fa-duotone fa-hourglass-clock",
	House = "fa-sharp fa-duotone fa-house",
	HouseMedical = "fa-sharp fa-duotone fa-house-medical",
	HouseUser = "fa-sharp fa-duotone fa-house-user",
	//#endregion

	//#region I
	Image = "fa-sharp fa-duotone fa-image",
	Inbox = "fa-sharp fa-duotone fa-inbox",
	InboxFull = "fa-sharp fa-duotone fa-inbox-full",
	Info = "fa-sharp fa-duotone fa-info",
	//#endregion

	//#region K
	Key = "fa-sharp fa-duotone fa-key",
	Keyboard = "fa-sharp fa-duotone fa-keyboard",
	KeySkeleton = "fa-sharp fa-duotone fa-key-skeleton",
	//#endregion

	//#region L
	Laptop = "fa-sharp fa-duotone fa-laptop",
	LaptopMedical = "fa-sharp fa-duotone fa-laptop-medical",
	LevelDown = "fa-sharp fa-duotone fa-level-down",
	LevelDownAlt = "fa-sharp fa-duotone fa-level-down-alt",
	LevelLeft = "fa-sharp fa-duotone fa-level-left",
	LevelLeftAlt = "fa-sharp fa-duotone fa-level-left-alt",
	LevelRight = "fa-sharp fa-duotone fa-level-right",
	LevelRightAlt = "fa-sharp fa-duotone fa-level-right-alt",
	LevelUp = "fa-sharp fa-duotone fa-level-up",
	LevelUpAlt = "fa-sharp fa-duotone fa-level-up-alt",
	Link = "fa-sharp fa-duotone fa-link",
	LinkExternal = "fa-sharp fa-duotone fa-arrow-up-right-from-square",
	LinkHorizontal = "fa-sharp fa-duotone fa-link-horizontal",
	LinkHorizontalSlash = "fa-sharp fa-duotone fa-link-horizontal-slash",
	LinkSimple = "fa-sharp fa-duotone fa-link-simple",
	LinkSimpleSlash = "fa-sharp fa-duotone fa-link-simple-slash",
	LinkSlash = "fa-sharp fa-duotone fa-link-slash",
	List = "fa-sharp fa-duotone fa-list",
	ListCheck = "fa-sharp fa-duotone fa-list-check",
	ListOl = "fa-sharp fa-duotone fa-list-ol",
	ListTree = "fa-sharp fa-duotone fa-list-tree",
	ListUl = "fa-sharp fa-duotone fa-list-ul",
	LocationArrow = "fa-sharp fa-duotone fa-location-arrow",
	LocationCrossHairs = "fa-sharp fa-duotone fa-location-crosshairs",
	LocationCheck = "fa-sharp fa-duotone fa-location-check",
	LocationDot = "fa-sharp fa-duotone fa-location-dot",
	Lock = "fa-sharp fa-duotone fa-lock",
	LockOpen = "fa-sharp fa-duotone fa-lock-open",
	Login = "fa-sharp fa-duotone fa-arrow-right-to-bracket",
	Logout = "fa-sharp fa-duotone fa-arrow-right-from-bracket",
	//#endregion

	//#region M
	MagnifyingGlass = "fa-sharp fa-duotone fa-magnifying-glass",
	MagnifyingGlassMinus = "fa-sharp fa-duotone fa-magnifying-glass-minus",
	MagnifyingGlassPlus = "fa-sharp fa-duotone fa-magnifying-glass-plus",
	Mail = "fa-sharp fa-duotone fa-envelope",
	Mailbox = "fa-sharp fa-duotone fa-mailbox",
	MailOpen = "fa-sharp fa-duotone fa-envelope-open",
	Map = "fa-sharp fa-duotone fa-map",
	MapLocation = "fa-sharp fa-duotone fa-map-location",
	MapLocationDot = "fa-sharp fa-duotone fa-map-location-dot",
	MapPin = "fa-sharp fa-duotone fa-map-pin",
	Maximize = "fa-sharp fa-duotone fa-maximize",
	Merge = "fa-sharp fa-duotone fa-merge",
	Message = "fa-sharp fa-duotone fa-message",
	MessageCode = "fa-sharp fa-duotone fa-message-code",
	MessageDots = "fa-sharp fa-duotone fa-message-dots",
	MessageLines = "fa-sharp fa-duotone fa-message-lines",
	Messages = "fa-sharp fa-duotone fa-messages",
	Microphone = "fa-sharp fa-duotone fa-microphone",
	MicrophoneLines = "fa-sharp fa-duotone fa-microphone-lines",
	MicrophoneLinesSlash = "fa-sharp fa-duotone fa-microphone-lines-slash",
	MicrophoneSlash = "fa-sharp fa-duotone fa-microphone-slash",
	Microscope = "fa-sharp fa-duotone fa-microscope",
	Minimize = "fa-sharp fa-duotone fa-minimize",
	Minus = "fa-sharp fa-duotone fa-minus",
	Mobile = "fa-sharp fa-duotone fa-mobile",
	MobileNotch = "fa-sharp fa-duotone fa-mobile-notch",
	MoneyCheckDollarPen = "fa-sharp fa-duotone fa-money-check-dollar-pen",
	Music = "fa-sharp fa-duotone fa-music",
	MusicSlash = "fa-sharp fa-duotone fa-music-slash",
	//#endregion

	//#region Newspaper
	NewsPaper = "fa-sharp fa-duotone fa-newspaper",
	//#endregion

	//#region P
	Palette = "fa-sharp fa-duotone fa-palette",
	PaperClip = "fa-sharp fa-duotone fa-paperclip",
	PaperClipVertical = "fa-sharp fa-duotone fa-paperclip-vertical",
	PaperPlane = "fa-sharp fa-duotone fa-paper-plane",
	PaperPlaneTop = "fa-sharp fa-duotone fa-paper-plane-top",
	Paste = "fa-sharp fa-duotone fa-paste",
	Pause = "fa-sharp fa-duotone fa-pause",
	Pen = "fa-sharp fa-duotone fa-pen",
	Pencil = "fa-sharp fa-duotone fa-pencil",
	PenToSquare = "fa-sharp fa-duotone fa-pen-to-square",
	PeopleArrowsLeftRight = "fa-sharp fa-duotone fa-people-arrows-left-right",
	Percentage = "fa-sharp fa-duotone fa-percentage",
	PersonChalkboard = "fa-sharp fa-duotone fa-person-chalkboard",
	PersonMilitaryRifle = "fa-sharp fa-duotone fa-person-military-rifle",
	Phone = "fa-sharp fa-duotone fa-phone",
	Play = "fa-sharp fa-duotone fa-play",
	PlayPause = "fa-sharp fa-duotone fa-play-pause",
	Plus = "fa-sharp fa-duotone fa-plus",
	Print = "fa-sharp fa-duotone fa-print",
	Pumo = "fa-sharp fa-duotone fa-font-awesome",
	//#endregion

	//#region Q
	Question = "fa-sharp fa-duotone fa-question",
	//#endregion

	//#region R
	Redo = "fa-sharp fa-duotone fa-redo",
	RedoAlt = "fa-sharp fa-duotone fa-redo-alt",
	Refresh = "fa-sharp fa-duotone fa-arrows-rotate",
	Remove = "fa-sharp fa-duotone fa-xmark",
	Repeat = "fa-sharp fa-duotone fa-repeat",
	Reply = "fa-sharp fa-duotone fa-reply",
	ReplyAll = "fa-sharp fa-duotone fa-reply-all",
	RightFromBracket = "fa-sharp fa-duotone fa-right-from-bracket",
	RightToBracket = "fa-sharp fa-duotone fa-right-to-bracket",
	Rotate = "fa-sharp fa-duotone fa-rotate",
	RotateLeft = "fa-sharp fa-duotone fa-rotate-left",
	//#endregion

	//#region S
	SackDollar = "fa-sharp fa-duotone fa-sack-dollar",
	Save = "fa-sharp fa-duotone fa-floppy-disk",
	Scissors = "fa-sharp fa-duotone fa-scissors",
	ScrewdriverWrench = "fa-sharp fa-duotone fa-screwdriver-wrench",
	Search = "fa-sharp fa-duotone fa-magnifying-glass",
	SensorTriangleExclamation = "fa-sharp fa-duotone fa-sensor-triangle-exclamation",
	Settings = "fa-sharp fa-duotone fa-gear",
	Share = "fa-sharp fa-duotone fa-share",
	ShareAll = "fa-sharp fa-duotone fa-share-all",
	ShareNodes = "fa-sharp fa-duotone fa-share-nodes",
	ShareFromSquare = "fa-sharp fa-duotone fa-share-from-square",
	ShieldCheck = "fa-sharp fa-duotone fa-shield-check",
	Ship = "fa-sharp fa-duotone fa-ship",
	Sitemap = "fa-sharp fa-duotone fa-sitemap",
	Soccer = "fa-sharp fa-duotone fa-futbol",
	Sort = "fa-sharp fa-duotone fa-sort",
	SortDown = "fa-sharp fa-duotone fa-sort-down",
	SortUp = "fa-sharp fa-duotone fa-sort-up",
	Spinner = "fa-sharp fa-duotone fa-spinner",
	Split = "fa-sharp fa-duotone fa-split",
	SquareCheck = "fa-sharp fa-duotone fa-square-check",
	SquareMinus = "fa-sharp fa-duotone fa-square-minus",
	SquarePen = "fa-sharp fa-duotone fa-square-pen",
	Stamp = "fa-sharp fa-duotone fa-stamp",
	Star = "fa-sharp fa-duotone fa-star",
	StepBackward = "fa-sharp fa-duotone fa-step-backward",
	StepForward = "fa-sharp fa-duotone fa-step-forward",
	Stethoscope = "fa-sharp fa-duotone fa-stethoscope",
	Stop = "fa-sharp fa-duotone fa-stop",
	//#endregion

	//#region T
	Table = "fa-sharp fa-duotone fa-table",
	TableRows = "fa-sharp fa-duotone fa-table-rows",
	Tablet = "fa-sharp fa-duotone fa-tablet",
	Tag = "fa-sharp fa-duotone fa-tag",
	Tags = "fa-sharp fa-duotone fa-tags",
	Tasks = "fa-sharp fa-duotone fa-tasks",
	ThumbsDown = "fa-sharp fa-duotone fa-thumbs-down",
	ThumbsUp = "fa-sharp fa-duotone fa-thumbs-up",
	Thumbtack = "fa-sharp fa-duotone fa-thumbtack",
	Timer = "fa-sharp fa-duotone fa-timer",
	Trash = "fa-sharp fa-duotone fa-trash",
	TrashCanList = "fa-sharp fa-duotone fa-trash-can-list",
	TrashUndo = "fa-sharp fa-duotone fa-trash-undo",
	TrashXmark = "fa-sharp fa-duotone fa-trash-xmark",
	TriangleExclamation = "fa-sharp fa-duotone fa-triangle-exclamation",
	Truck = "fa-sharp fa-duotone fa-truck",
	//#endregion

	//#region U
	Undo = "fa-sharp fa-duotone fa-arrow-rotate-left",
	Unlock = "fa-sharp fa-duotone fa-unlock",
	Upload = "fa-sharp fa-duotone fa-upload",
	UsbDrive = "fa-sharp fa-duotone fa-usb-drive",
	User = "fa-sharp fa-duotone fa-user",
	UserCheck = "fa-sharp fa-duotone fa-user-check",
	UserClock = "fa-sharp fa-duotone fa-user-clock",
	UserDoctor = "fa-sharp fa-duotone fa-user-doctor",
	UserDoctorHair = "fa-sharp fa-duotone fa-user-doctor-hair",
	UserDoctorHairLong = "fa-sharp fa-duotone fa-user-doctor-hair-long",
	UserGear = "fa-sharp fa-duotone fa-user-gear",
	UserGroup = "fa-sharp fa-duotone fa-user-group",
	UserHair = "fa-sharp fa-duotone fa-user-hair",
	UserHairLong = "fa-sharp fa-duotone fa-user-hair-long",
	UserHeadset = "fa-sharp fa-duotone fa-user-headset",
	Users = "fa-sharp fa-duotone fa-users",
	UserSecret = "fa-sharp fa-duotone fa-user-secret",
	UsersMedical = "fa-sharp fa-duotone fa-users-medical",
	UserTag = "fa-sharp fa-duotone fa-user-tag",
	UserXmark = "fa-sharp fa-duotone fa-user-xmark",
	//#endregion

	//#region V
	Video = "fa-sharp fa-duotone fa-video",
	VideoSlash = "fa-sharp fa-duotone fa-video-slash",
	Volume = "fa-sharp fa-duotone fa-volume",
	VolumeHigh = "fa-sharp fa-duotone fa-volume-high",
	VolumeLow = "fa-sharp fa-duotone fa-volume-low",
	VolumeOff = "fa-sharp fa-duotone fa-volume-off",
	VolumeSlash = "fa-sharp fa-duotone fa-volume-slash",
	VolumeXmark = "fa-sharp fa-duotone fa-volume-xmark",
	//#endregion

	//#region W
	Wifi = "fa-sharp fa-duotone fa-wifi",
	WifiExclamation = "fa-sharp fa-duotone fa-wifi-exclamation",
	WifiFair = "fa-sharp fa-duotone fa-wifi-fair",
	WifiSlash = "fa-sharp fa-duotone fa-wifi-slash",
	Window = "fa-sharp fa-duotone fa-window",
	//#endregion

	//#region X
	Xmark = "fa-sharp fa-duotone fa-xmark",
	//#endregion
}
//#endregion

//#region Icon Sharp Thin
export enum IconSharpThin
{
	//#region A
	Add = "fa-sharp fa-thin fa-plus",
	AddressCard = "fa-sharp fa-thin fa-address-card",
	Alert = "fa-sharp fa-thin fa-triangle-exclamation",
	AngleDown = "fa-sharp fa-thin fa-angle-down",
	AngleLeft = "fa-sharp fa-thin fa-angle-left",
	AngleRight = "fa-sharp fa-thin fa-angle-right",
	AngleUp = "fa-sharp fa-thin fa-angle-up",
	Aperture = "fa-sharp fa-thin fa-aperture",
	ArrowDown = "fa-sharp fa-thin fa-arrow-down",
	ArrowDownShortWide = "fa-sharp fa-thin fa-arrow-down-short-wide",
	ArrowDownWideShort = "fa-sharp fa-thin fa-arrow-down-wide-short",
	ArrowLeft = "fa-sharp fa-thin fa-arrow-left",
	ArrowPointer = "fa-sharp fa-thin fa-arrow-pointer",
	ArrowRight = "fa-sharp fa-thin fa-arrow-right",
	ArrowRightToBracket = "fa-sharp fa-thin fa-arrow-right-to-bracket",
	ArrowRightFromBracket = "fa-sharp fa-thin fa-arrow-right-from-bracket",
	ArrowRotateRight = "fa-sharp fa-thin fa-arrow-rotate-right",
	ArrowsRotate = "fa-sharp fa-thin fa-arrows-rotate",
	ArrowUp = "fa-sharp fa-thin fa-arrow-up",
	Asterisk = "fa-sharp fa-thin fa-asterisk",
	At = "fa-sharp fa-thin fa-at",
	Attachment = "fa-sharp fa-thin fa-paperclip",
	//#endregion

	//#region B
	Back = "fa-sharp fa-thin fa-angle-left",
	Backward = "fa-sharp fa-thin fa-backward",
	BackwardFast = "fa-sharp fa-thin fa-backward-fast",
	BackwardStep = "fa-sharp fa-thin fa-backward-step",
	BalanceScale = "fa-sharp fa-thin fa-balance-scale",
	BallotCheck = "fa-sharp fa-thin fa-ballot-check",
	Ban = "fa-sharp fa-thin fa-ban",
	Barcode = "fa-sharp fa-thin fa-barcode",
	BarcodeScan = "fa-sharp fa-thin fa-barcode-scan",
	Bars = "fa-sharp fa-thin fa-bars",
	BarsSort = "fa-sharp fa-thin fa-bars-sort",
	Bell = "fa-sharp fa-thin fa-bell",
	BellSlash = "fa-sharp fa-thin fa-bell-slash",
	Bolt = "fa-sharp fa-thin fa-bolt",
	Book = "fa-sharp fa-thin fa-book",
	BookOpen = "fa-sharp fa-thin fa-book-open",
	Box = "fa-sharp fa-thin fa-box",
	BoxArchive = "fa-sharp fa-thin fa-box-archive",
	BriefCase = "fa-sharp fa-thin fa-brief-case",
	Bug = "fa-sharp fa-thin fa-bug",
	Burger = "fa-sharp fa-thin fa-bars",
	//#endregion

	//#region C
	CakeCandles = "fa-sharp fa-thin fa-cake-candles",
	Calendar = "fa-sharp fa-thin fa-calendar",
	CalendarAlt = "fa-sharp fa-thin fa-calendar-alt",
	CalendarCheck = "fa-sharp fa-thin fa-calendar-check",
	CalendarDay = "fa-sharp fa-thin fa-calendar-day",
	CalendarPlus = "fa-sharp fa-thin fa-calendar-plus",
	Camera = "fa-sharp fa-thin fa-camera",
	CameraAlt = "fa-sharp fa-thin fa-camera-alt",
	CameraWeb = "fa-sharp fa-thin fa-camera-web",
	CameraWebSlash = "fa-sharp fa-thin fa-camera-web-slash",
	Capsules = "fa-sharp fa-thin fa-capsules",
	CaretDown = "fa-sharp fa-thin fa-caret-down",
	CaretLeft = "fa-sharp fa-thin fa-caret-left",
	CaretRight = "fa-sharp fa-thin fa-caret-right",
	CaretUp = "fa-sharp fa-thin fa-caret-up",
	CartCirclePlus = "fa-sharp fa-thin fa-cart-circle-plus",
	CartShopping = "fa-sharp fa-thin fa-cart-shopping",
	ChartArea = "fa-sharp fa-thin fa-chart-area",
	ChartBar = "fa-sharp fa-thin fa-chart-bar",
	ChartColumn = "fa-sharp fa-thin fa-chart-column",
	ChartLine = "fa-sharp fa-thin fa-chart-line",
	ChartPie = "fa-sharp fa-thin fa-chart-pie",
	ChartSimple = "fa-sharp fa-thin fa-chart-simple",
	Chat = "fa-sharp fa-thin fa-comment",
	Check = "fa-sharp fa-thin fa-check",
	ChevronDown = "fa-sharp fa-thin fa-chevron-down",
	ChevronLeft = "fa-sharp fa-thin fa-chevron-left",
	ChevronRight = "fa-sharp fa-thin fa-chevron-right",
	ChevronUp = "fa-sharp fa-thin fa-chevron-up",
	Circle = "fa-sharp fa-thin fa-circle",
	CircleCheck = "fa-sharp fa-thin fa-circle-check",
	CircleExclamation = "fa-sharp fa-thin fa-circle-exclamation",
	CircleInfo = "fa-sharp fa-thin fa-circle-info",
	CircleStop = "fa-sharp fa-thin fa-circle-stop",
	Clipboard = "fa-sharp fa-thin fa-clipboard",
	ClipboardMedical = "fa-sharp fa-thin fa-clipboard-medical",
	Clock = "fa-sharp fa-thin fa-clock",
	ClockRotateLeft = "fa-sharp fa-thin fa-clock-rotate-left",
	Close = "fa-sharp fa-thin fa-xmark",
	Cloud = "fa-sharp fa-thin fa-cloud",
	CloudArrowUp = "fa-sharp fa-thin fa-cloud-arrow-up",
	CloudDownload = "fa-sharp fa-thin fa-cloud-download",
	Code = "fa-sharp fa-thin fa-code",
	CodeMerge = "fa-sharp fa-thin fa-code-merge",
	Coins = "fa-sharp fa-thin fa-coins",
	Collapse = "fa-sharp fa-thin fa-compress",
	Comment = "fa-sharp fa-thin fa-comment",
	CommentDots = "fa-sharp fa-thin fa-comment-dots",
	CommentLines = "fa-sharp fa-thin fa-comment-lines",
	Comments = "fa-sharp fa-thin fa-comments",
	CommentSms = "fa-sharp fa-thin fa-comment-sms",
	Compress = "fa-sharp fa-thin fa-compress",
	Copy = "fa-sharp fa-thin fa-copy",
	Copyright = "fa-sharp fa-thin fa-copyright",
	CreditCard = "fa-sharp fa-thin fa-credit-card",
	Crown = "fa-sharp fa-thin fa-crown",
	//#endregion

	//#region D
	Database = "fa-sharp fa-thin fa-database",
	Delete = "fa-sharp fa-thin fa-xmark",
	DeleteLeft = "fa-sharp fa-thin fa-delete-left",
	DeleteRight = "fa-sharp fa-thin fa-delete-right",
	Desktop = "fa-sharp fa-thin fa-desktop",
	Download = "fa-sharp fa-thin fa-download",
	//#endregion

	//#region E
	Edit = "fa-sharp fa-thin fa-pen",
	Eject = "fa-sharp fa-thin fa-eject",
	Ellipsis = "fa-sharp fa-thin fa-ellipsis",
	EllipsisVertical = "fa-sharp fa-thin fa-ellipsis-vertical",
	Envelope = "fa-sharp fa-thin fa-envelope",
	Eraser = "fa-sharp fa-thin fa-eraser",
	EuroSign = "fa-sharp fa-thin fa-euro-sign",
	Exclamation = "fa-sharp fa-thin fa-exclamation",
	Expand = "fa-sharp fa-thin fa-expand",
	Eye = "fa-sharp fa-thin fa-eye",
	EyeSlash = "fa-sharp fa-thin fa-eye-slash",
	//#endregion

	//#region F
	Family = "fa-sharp fa-thin fa-family",
	FastBackward = "fa-sharp fa-thin fa-fast-backward",
	FastForward = "fa-sharp fa-thin fa-fast-forward",
	File = "fa-sharp fa-thin fa-file",
	FileAudio = "fa-sharp fa-thin fa-file-audio",
	FileContract = "fa-sharp fa-thin fa-file-contract",
	FileDownload = "fa-sharp fa-thin fa-file-download",
	FileExcel = "fa-sharp fa-thin fa-file-excel",
	FileExport = "fa-sharp fa-thin fa-file-export",
	FileImage = "fa-sharp fa-thin fa-file-image",
	FileInvoice = "fa-sharp fa-thin fa-file-invoice",
	FileImport = "fa-sharp fa-thin fa-file-import",
	FileLines = "fa-sharp fa-thin fa-file-lines",
	FileMusic = "fa-sharp fa-thin fa-file-music",
	FilePdf = "fa-sharp fa-thin fa-file-pdf",
	Files = "fa-sharp fa-thin fa-file-files",
	FileSignature = "fa-sharp fa-thin fa-file-signature",
	FileVideo = "fa-sharp fa-thin fa-file-video",
	FileWord = "fa-sharp fa-thin fa-file-word",
	FileZipper = "fa-sharp fa-thin fa-file-zipper",
	Filter = "fa-sharp fa-thin fa-filter",
	Flag = "fa-sharp fa-thin fa-flag",
	FlagSwallowTail = "fa-sharp fa-thin fa-flag-swallowtail",
	FloppyDisk = "fa-sharp fa-thin fa-floppy-disk",
	Folder = "fa-sharp fa-thin fa-folder",
	FolderOpen = "fa-sharp fa-thin fa-folder-open",
	FontAwesome = "fa-sharp fa-thin  fa-font-awesome",
	Forward = "fa-sharp fa-thin fa-forward",
	ForwardStep = "fa-sharp fa-thin fa-forward-step",
	ForwardFast = "fa-sharp fa-thin fa-forward-fast",
	Futbol = "fa-sharp fa-thin fa-futbol",
	//#endregion

	//#region G
	Gear = "fa-sharp fa-thin fa-gear",
	Gears = "fa-sharp fa-thin fa-gears",
	Globe = "fa-sharp fa-thin fa-globe",
	//#endregion

	//#region H
	Hashtag = "fa-sharp fa-thin fa-hashtag",
	HatWizard = "fa-sharp fa-thin fa-hat-wizard",
	Headset = "fa-sharp fa-thin fa-headset",
	Hospital = "fa-sharp fa-thin fa-hospital",
	Hourglass = "fa-sharp fa-thin fa-hourglass",
	HourglassClock = "fa-sharp fa-thin fa-hourglass-clock",
	House = "fa-sharp fa-thin fa-house",
	HouseMedical = "fa-sharp fa-thin fa-house-medical",
	HouseUser = "fa-sharp fa-thin fa-house-user",
	//#endregion

	//#region I
	Image = "fa-sharp fa-thin fa-image",
	Inbox = "fa-sharp fa-thin fa-inbox",
	InboxFull = "fa-sharp fa-thin fa-inbox-full",
	Info = "fa-sharp fa-thin fa-info",
	//#endregion

	//#region K
	Key = "fa-sharp fa-thin fa-key",
	Keyboard = "fa-sharp fa-thin fa-keyboard",
	KeySkeleton = "fa-sharp fa-thin fa-key-skeleton",
	//#endregion

	//#region L
	Laptop = "fa-sharp fa-thin fa-laptop",
	LaptopMedical = "fa-sharp fa-thin fa-laptop-medical",
	LevelDown = "fa-sharp fa-thin fa-level-down",
	LevelDownAlt = "fa-sharp fa-thin fa-level-down-alt",
	LevelLeft = "fa-sharp fa-thin fa-level-left",
	LevelLeftAlt = "fa-sharp fa-thin fa-level-left-alt",
	LevelRight = "fa-sharp fa-thin fa-level-right",
	LevelRightAlt = "fa-sharp fa-thin fa-level-right-alt",
	LevelUp = "fa-sharp fa-thin fa-level-up",
	LevelUpAlt = "fa-sharp fa-thin fa-level-up-alt",
	Link = "fa-sharp fa-thin fa-link",
	LinkExternal = "fa-sharp fa-thin fa-arrow-up-right-from-square",
	LinkHorizontal = "fa-sharp fa-thin fa-link-horizontal",
	LinkHorizontalSlash = "fa-sharp fa-thin fa-link-horizontal-slash",
	LinkSimple = "fa-sharp fa-thin fa-link-simple",
	LinkSimpleSlash = "fa-sharp fa-thin fa-link-simple-slash",
	LinkSlash = "fa-sharp fa-thin fa-link-slash",
	List = "fa-sharp fa-thin fa-list",
	ListCheck = "fa-sharp fa-thin fa-list-check",
	ListOl = "fa-sharp fa-thin fa-list-ol",
	ListTree = "fa-sharp fa-thin fa-list-tree",
	ListUl = "fa-sharp fa-thin fa-list-ul",
	LocationArrow = "fa-sharp fa-thin fa-location-arrow",
	LocationCrossHairs = "fa-sharp fa-thin fa-location-crosshairs",
	LocationCheck = "fa-sharp fa-thin fa-location-check",
	LocationDot = "fa-sharp fa-thin fa-location-dot",
	Lock = "fa-sharp fa-thin fa-lock",
	LockOpen = "fa-sharp fa-thin fa-lock-open",
	Login = "fa-sharp fa-thin fa-arrow-right-to-bracket",
	Logout = "fa-sharp fa-thin fa-arrow-right-from-bracket",
	//#endregion

	//#region M
	MagnifyingGlass = "fa-sharp fa-thin fa-magnifying-glass",
	MagnifyingGlassMinus = "fa-sharp fa-thin fa-magnifying-glass-minus",
	MagnifyingGlassPlus = "fa-sharp fa-thin fa-magnifying-glass-plus",
	Mail = "fa-sharp fa-thin fa-envelope",
	Mailbox = "fa-sharp fa-thin fa-mailbox",
	MailOpen = "fa-sharp fa-thin fa-envelope-open",
	Map = "fa-sharp fa-thin fa-map",
	MapLocation = "fa-sharp fa-thin fa-map-location",
	MapLocationDot = "fa-sharp fa-thin fa-map-location-dot",
	MapPin = "fa-sharp fa-thin fa-map-pin",
	Maximize = "fa-sharp fa-thin fa-maximize",
	Merge = "fa-sharp fa-thin fa-merge",
	Message = "fa-sharp fa-thin fa-message",
	MessageCode = "fa-sharp fa-thin fa-message-code",
	MessageDots = "fa-sharp fa-thin fa-message-dots",
	MessageLines = "fa-sharp fa-thin fa-message-lines",
	Messages = "fa-sharp fa-thin fa-messages",
	Microphone = "fa-sharp fa-thin fa-microphone",
	MicrophoneLines = "fa-sharp fa-thin fa-microphone-lines",
	MicrophoneLinesSlash = "fa-sharp fa-thin fa-microphone-lines-slash",
	MicrophoneSlash = "fa-sharp fa-thin fa-microphone-slash",
	Microscope = "fa-sharp fa-thin fa-microscope",
	Minimize = "fa-sharp fa-thin fa-minimize",
	Minus = "fa-sharp fa-thin fa-minus",
	Mobile = "fa-sharp fa-thin fa-mobile",
	MobileNotch = "fa-sharp fa-thin fa-mobile-notch",
	MoneyCheckDollarPen = "fa-sharp fa-thin fa-money-check-dollar-pen",
	Music = "fa-sharp fa-thin fa-music",
	MusicSlash = "fa-sharp fa-thin fa-music-slash",
	//#endregion

	//#region Newspaper
	NewsPaper = "fa-sharp fa-thin fa-newspaper",
	//#endregion

	//#region P
	Palette = "fa-sharp fa-thin fa-palette",
	PaperClip = "fa-sharp fa-thin fa-paperclip",
	PaperClipVertical = "fa-sharp fa-thin fa-paperclip-vertical",
	PaperPlane = "fa-sharp fa-thin fa-paper-plane",
	PaperPlaneTop = "fa-sharp fa-thin fa-paper-plane-top",
	Paste = "fa-sharp fa-thin fa-paste",
	Pause = "fa-sharp fa-thin fa-pause",
	Pen = "fa-sharp fa-thin fa-pen",
	Pencil = "fa-sharp fa-thin fa-pencil",
	PenToSquare = "fa-sharp fa-thin fa-pen-to-square",
	PeopleArrowsLeftRight = "fa-sharp fa-thin fa-people-arrows-left-right",
	Percentage = "fa-sharp fa-thin fa-percentage",
	PersonChalkboard = "fa-sharp fa-thin fa-person-chalkboard",
	PersonMilitaryRifle = "fa-sharp fa-thin fa-person-military-rifle",
	Phone = "fa-sharp fa-thin fa-phone",
	Play = "fa-sharp fa-thin fa-play",
	PlayPause = "fa-sharp fa-thin fa-play-pause",
	Plus = "fa-sharp fa-thin fa-plus",
	Print = "fa-sharp fa-thin fa-print",
	Pumo = "fa-sharp fa-thin fa-font-awesome",
	//#endregion

	//#region Q
	Question = "fa-sharp fa-thin fa-question",
	//#endregion

	//#region R
	Redo = "fa-sharp fa-thin fa-redo",
	RedoAlt = "fa-sharp fa-thin fa-redo-alt",
	Refresh = "fa-sharp fa-thin fa-arrows-rotate",
	Remove = "fa-sharp fa-thin fa-xmark",
	Repeat = "fa-sharp fa-thin fa-repeat",
	Reply = "fa-sharp fa-thin fa-reply",
	ReplyAll = "fa-sharp fa-thin fa-reply-all",
	RightFromBracket = "fa-sharp fa-thin fa-right-from-bracket",
	RightToBracket = "fa-sharp fa-thin fa-right-to-bracket",
	Rotate = "fa-sharp fa-thin fa-rotate",
	RotateLeft = "fa-sharp fa-thin fa-rotate-left",
	//#endregion

	//#region S
	SackDollar = "fa-sharp fa-thin fa-sack-dollar",
	Save = "fa-sharp fa-thin fa-floppy-disk",
	Scissors = "fa-sharp fa-thin fa-scissors",
	ScrewdriverWrench = "fa-sharp fa-thin fa-screwdriver-wrench",
	Search = "fa-sharp fa-thin fa-magnifying-glass",
	SensorTriangleExclamation = "fa-sharp fa-thin fa-sensor-triangle-exclamation",
	Settings = "fa-sharp fa-thin fa-gear",
	Share = "fa-sharp fa-thin fa-share",
	ShareAll = "fa-sharp fa-thin fa-share-all",
	ShareNodes = "fa-sharp fa-thin fa-share-nodes",
	ShareFromSquare = "fa-sharp fa-thin fa-share-from-square",
	ShieldCheck = "fa-sharp fa-thin fa-shield-check",
	Ship = "fa-sharp fa-thin fa-ship",
	Sitemap = "fa-sharp fa-thin fa-sitemap",
	Soccer = "fa-sharp fa-thin fa-futbol",
	Sort = "fa-sharp fa-thin fa-sort",
	SortDown = "fa-sharp fa-thin fa-sort-down",
	SortUp = "fa-sharp fa-thin fa-sort-up",
	Spinner = "fa-sharp fa-thin fa-spinner",
	Split = "fa-sharp fa-thin fa-split",
	SquareCheck = "fa-sharp fa-thin fa-square-check",
	SquareMinus = "fa-sharp fa-thin fa-square-minus",
	SquarePen = "fa-sharp fa-thin fa-square-pen",
	Stamp = "fa-sharp fa-thin fa-stamp",
	Star = "fa-sharp fa-thin fa-star",
	StepBackward = "fa-sharp fa-thin fa-step-backward",
	StepForward = "fa-sharp fa-thin fa-step-forward",
	Stethoscope = "fa-sharp fa-thin fa-stethoscope",
	Stop = "fa-sharp fa-thin fa-stop",
	//#endregion

	//#region T
	Table = "fa-sharp fa-thin fa-table",
	TableRows = "fa-sharp fa-thin fa-table-rows",
	Tablet = "fa-sharp fa-thin fa-tablet",
	Tag = "fa-sharp fa-thin fa-tag",
	Tags = "fa-sharp fa-thin fa-tags",
	Tasks = "fa-sharp fa-thin fa-tasks",
	ThumbsDown = "fa-sharp fa-thin fa-thumbs-down",
	ThumbsUp = "fa-sharp fa-thin fa-thumbs-up",
	Thumbtack = "fa-sharp fa-thin fa-thumbtack",
	Timer = "fa-sharp fa-thin fa-timer",
	Trash = "fa-sharp fa-thin fa-trash",
	TrashCanList = "fa-sharp fa-thin fa-trash-can-list",
	TrashUndo = "fa-sharp fa-thin fa-trash-undo",
	TrashXmark = "fa-sharp fa-thin fa-trash-xmark",
	TriangleExclamation = "fa-sharp fa-thin fa-triangle-exclamation",
	Truck = "fa-sharp fa-thin fa-truck",
	//#endregion

	//#region U
	Undo = "fa-sharp fa-thin fa-arrow-rotate-left",
	Unlock = "fa-sharp fa-thin fa-unlock",
	Upload = "fa-sharp fa-thin fa-upload",
	UsbDrive = "fa-sharp fa-thin fa-usb-drive",
	User = "fa-sharp fa-thin fa-user",
	UserCheck = "fa-sharp fa-thin fa-user-check",
	UserClock = "fa-sharp fa-thin fa-user-clock",
	UserDoctor = "fa-sharp fa-thin fa-user-doctor",
	UserDoctorHair = "fa-sharp fa-thin fa-user-doctor-hair",
	UserDoctorHairLong = "fa-sharp fa-thin fa-user-doctor-hair-long",
	UserGear = "fa-sharp fa-thin fa-user-gear",
	UserGroup = "fa-sharp fa-thin fa-user-group",
	UserHair = "fa-sharp fa-thin fa-user-hair",
	UserHairLong = "fa-sharp fa-thin fa-user-hair-long",
	UserHeadset = "fa-sharp fa-thin fa-user-headset",
	Users = "fa-sharp fa-thin fa-users",
	UserSecret = "fa-sharp fa-thin fa-user-secret",
	UsersMedical = "fa-sharp fa-thin fa-users-medical",
	UserTag = "fa-sharp fa-thin fa-user-tag",
	UserXmark = "fa-sharp fa-thin fa-user-xmark",
	//#endregion

	//#region V
	Video = "fa-sharp fa-thin fa-video",
	VideoSlash = "fa-sharp fa-thin fa-video-slash",
	Volume = "fa-sharp fa-thin fa-volume",
	VolumeHigh = "fa-sharp fa-thin fa-volume-high",
	VolumeLow = "fa-sharp fa-thin fa-volume-low",
	VolumeOff = "fa-sharp fa-thin fa-volume-off",
	VolumeSlash = "fa-sharp fa-thin fa-volume-slash",
	VolumeXmark = "fa-sharp fa-thin fa-volume-xmark",
	//#endregion

	//#region W
	Wifi = "fa-sharp fa-thin fa-wifi",
	WifiExclamation = "fa-sharp fa-thin fa-wifi-exclamation",
	WifiFair = "fa-sharp fa-thin fa-wifi-fair",
	WifiSlash = "fa-sharp fa-thin fa-wifi-slash",
	Window = "fa-sharp fa-thin fa-window",
	//#endregion

	//#region X
	Xmark = "fa-sharp fa-thin fa-xmark",
	//#endregion
}
//#endregion

//#endregion

//#endregion

//#region Common
export enum PositionEnum
{
	Left,
	Top,
	Right,
	Bottom
}

export enum OrientationEnum
{
	Horizontal,
	Vertical
}

export class PopupSettings
{
	width?: number | string;
	minWidth?: number | string;
	maxWidth?: number | string;
	height?: number | string;
	minHeight?: number | string;
	maxHeight?: number | string;
	right?: boolean;
	direction?: PopupDirectionEnum;
}

export enum PopupDirectionEnum
{
	Auto,
	Up,
	Down
}

export enum BorderStyleEnum
{
	Dashed = "dashed",
	Dotted = "dotted",
	Double = "double",
	Hidden = "hidden",
	Solid = "solid",
	Groove = "groove",
	Ridge = "ridge"
}
//#endregion

//#region Button
export enum ButtonModeEnum
{
	Default = "vrButtonDefaultMode",
	Primary = "vrButtonPrimaryMode",
	Delete = "vrButtonDeleteMode",
	Excel = "vrButtonExcelMode",
	Print = "vrButtonPrintMode",
	Warning = "vrButtonWarningMode"
}

export class ColorSettings
{
	textColor?: string;
	background?: string;
	border?: string;
}
//#endregion

//#region Div
export class DivColorSettings
{
	textColor?: string;
	background?: string;
}

export class DivBorderSpecificSettings
{
	type?: string;
	size?: number;
	color?: string;
}

export class DivBorderSettings extends DivBorderSpecificSettings
{
	top?: boolean | DivBorderSpecificSettings;
	right?: boolean | DivBorderSpecificSettings;
	bottom?: boolean | DivBorderSpecificSettings;
	left?: boolean | DivBorderSpecificSettings;
}
//#endregion

//#region ButtonGroup
export enum SelectionModeEnum
{
	Single,
	Multiple
}

export class ButtonGroupItem
{
	value?: string | number;
	text?: string;
	icon?: IconClass;
	imageUrl?: string;
	selected?: boolean;
	css?: string;
	colorSettings?: ColorSettings;
	visible?: boolean;
	enable?: boolean;
	tooltip?: string;

	onClick?: (e: ButtonGroupClickEvent) => void;
	onIconClick?: (e: ButtonGroupIconClickEvent) => void;
}
//#endregion

//#region TabStrip
export class TabStripItem extends ButtonGroupItem
{
	elementId?: string;
}
//#endregion

//#region Rating
export enum RatingPrecisionEnum
{
	Half,
	Full
}
//#endregion

//#region Label
export enum LabelModeEnum
{
	Default,
	Primary,
	Error,
	Phone,
	Mail,
	Link,
	Currency,
	Date,
	Time,
	DateTime
}

export enum LabelUnderlineMode
{
	Always,
	None,
	OnHover
}
//#endregion

//#region TextBox
export enum TextAlignEnum
{
	Left = "left",
	Center = "center",
	Right = "right",
	Justify = "justify"
}

export class TextBoxLengthSettings
{
	substituteChar?: string;
	value: number;
}

export enum TextModeEnum
{
	Text,
	Link,
	Phone,
	Search,
	Mail,
	MultiLine,
	Password,
	PasswordViewable,
	Numeric,
	Percentage,
	Currency
}

export enum TextTransformModeEnum
{
	Capitalize = "capitalize",
	Uppercase = "uppercase",
	Lowercase = "lowercase",
	Default = "none"
}

export class TextBoxValidationSettings
{
	minValue?: number;
	maxValue?: number;
	minLength?: number | TextBoxLengthSettings;
	maxLength?: number | TextBoxLengthSettings;
	regex?: string | TextBoxRegexSettings;
	error?: TextBoxValidationErrorEnum;
}

export class TextBoxRegexSettings
{
	value?: string;
	flags?: string;
	checkOnValue?: boolean;
	checkOnKeyDown?: boolean;
	checkOnKeyUp?: boolean;
	checkOnBlur?: boolean;
	onlyNumbers?: boolean;
	onlyCharacters?: boolean;
	onlyUpperCase?: boolean;
	onlyLowerCase?: boolean;
}

export enum TextBoxValidationErrorEnum
{
	Flashing,
	Stable,
	None
}
//#endregion

//#region Error
export enum ErrorModeEnum
{
	Tooltip,
	Overlay,
	Solid
}

export enum ErrorPositionEnum
{
	Right,
	Bottom
}

export enum ErrorHideModeEnum
{
	OnFocus,
	OnAction,
	Never
}
//#endregion

//#region Paypal
export enum PaypalEnvironmentEnum
{
	Sandbox = "sandbox",
	Production = "production"
}

export enum PaypalStyleSizeEnum
{
	Medium = "medium",
	Large = "large",
	Small = "small",
	Responsive = "responsive"
}

export enum PaypalStyleColorEnum
{
	Gold = "gold",
	Blue = "blue",
	Silver = "silver",
	Black = "black"
}

export enum PaypalStyleShapeEnum
{
	Rect = "rect",
	Pill = "pill"
}

export enum PaypalStyleLabelEnum
{
	Checkout = "checkout",
	Credit = "credit",
	Pay = "pay",
	BuyNow = "buynow",
	Paypal = "paypal",
	Installment = "installment"
}

export enum PaypalStyleLayoutEnum
{
	Vertical = "vertical",
	Horizontal = "horizontal"
}
//#endregion

//#region CheckBox
export enum CheckboxStateEnum
{
	Checked,
	Unchecked,
	Undefined
}
//#endregion

//#region Image
export enum ImagePositionTypeEnum
{
	Center,
	Fit,
	Fill,
	Stretch,
	Original
}

export enum ImageToolbarTypeEnum
{
	Download,
	Delete,
	Custom
}
//#endregion

//#region DatePicker
export enum DefaultDayEnum
{
	First,
	Last
}
//#endregion

//#region ComboBox
export enum ComboBoxTypeEnum
{
	Combo,
	DropDown
}

export enum ComboBoxTreeModeEnum
{
	AllExpanded,
	OnlyFirstLevelExpanded,
	AllCollapsed
}

export class ComboBoxItem
{
	text: string;
	value: any;
	parentValue?: any;
}

export class ComboBoxWebServiceSettings
{
	method: string;
	authKey?: string;
	itemsPropertyName?: string;
	typedTextPropertyName?: string;
	typedValuePropertyName?: string;
	searchAfterCharsNumber?: number;
	parameters?: () => any;
}

export class ComboBoxTemplateEvent
{
	sender: ComboBox;
	dataItem: any;
	element: HTMLElement;
}

export class ComboBoxEvent extends VrControlsEvent
{
	sender: ComboBox;
	value: any;
	text: string;
	childrenValues: string[];
	selectedItem?: ComboBoxItem;
	checked: boolean;
	isParent?: boolean;
}

export class ComboBoxChangeEvent extends ComboBoxEvent
{

}

export class ComboBoxChangingEvent extends ComboBoxEvent
{
	previousValue?: string | null;
	previousCheckedValues?: string[] | null;
}

export class ComboBoxClearEvent extends VrControlsEvent
{
	sender: ComboBox;
}

export class SortByComboSettings
{
	field: string;
	direction?: SortDirectionEnum;
}
//#endregion

//#region AutoCompleteBox
export class AutoCompleteBoxItem
{
	text: string;
	value?: string;
	settings?: AutoCompleteBoxItemSettings;
}

export class AutoCompleteBoxItemSettings
{
	backgroundColor?: string;
	textColor?: string;
	deleteIconColor?: string;
	border?: string;
	bold?: boolean;
	maxWidth?: number;
}

export class AutoCompleteBoxComboSettings
{
	items?: ComboBoxItem[];
	freeText?: boolean;
	webService?: ComboBoxWebServiceSettings;
	template?: (e: any) => string;
	treeMode?: ComboBoxTreeModeEnum;
}
//#endregion

//#region Chart
export enum ChartTypeEnum
{
	Bar = "bar",
	HorizontalBar = "horizontalBar",
	Line = "line",
	Donut = "doughnut",
	Pie = "pie",
	Area = "area",
	StackedBar = "stackedBar"
}

export class ChartAreaSettings
{
	target?: number | string | boolean | object;
	above?: string;
	below?: string;
}

export class ChartTitleSettings
{
	align?: ChartTitleAlignEnum;
	color?: string;
	fullSize?: boolean;
	position?: ChartTitlePositionEnum;
	font?: ChartFont;
	padding?: number;
	text?: string;
}

export enum ChartTitleAlignEnum
{
	Start = "start",
	Center = "center",
	End = "end"
}

export enum ChartTitlePositionEnum
{
	Top = "top",
	Left = "left",
	Bottom = "bottom",
	Right = "right"
}

export class ChartFont
{
	family?: string;
	size?: number;
	style?: string;
	weight?: string;
	lineHeight?: number | string;
}

export class ChartDataLabelsSettings
{
	color?: string;
	backgroundColor?: string;
	borderColor?: string;
	font?: ChartFont;
	anchor?: ChartDataLabelsAnchorEnum;
	align?: ChartDataLabelAlignEnum;
	offset?: number;
	opacity?: number;
	padding?: number | { top?: number, right?: number, bottom?: number, left?: number };
	textAlign?: ChartDataLabelsTextAlignEnum;
	rotation?: number;
}

export enum ChartDataLabelsAnchorEnum
{
	Center = "center",
	Start = "start",
	End = "end"
}

export enum ChartDataLabelsTextAlignEnum
{
	Center = "center",
	Start = "start",
	End = "end",
	Right = "right",
	Left = "left",
}

export enum ChartDataLabelAlignEnum
{
	Center = "center",
	Start = "start",
	End = "end",
	Right = "right",
	Bottom = "bottom",
	Left = "left",
	Top = "top"
}

export class ChartLegendSettings
{
	position?: ChartLegendPositionEnum;
	align?: ChartLegendAlignEnum;
	labels?: ChartLegendLabelsSettings;
	title?: ChartLegendTitleSettings;
}

export enum ChartLegendPositionEnum
{
	Top = "top",
	Left = "left",
	Bottom = "bottom",
	Right = "right",
	ChartArea = "chartArea"
}

export enum ChartLegendAlignEnum
{
	Center = "center",
	Start = "start",
	End = "end"
}

export class ChartLegendLabelsSettings
{
	color?: string;
	boxHeight?: number;
	padding?: number;
	textAlign?: ChartLegendLabelsAlignEnum;
}

export enum ChartLegendLabelsAlignEnum
{
	Left = "left",
	Right = "right",
	Center = "center"
}

export class ChartLegendTitleSettings
{
	color?: string;
	display?: boolean;
	padding?: number;
	text?: string;
}

export class ChartTooltipSettings
{
	position?: ChartTooltipPositionEnum;
	backgroundColor?: string;
	titleColor?: string;
	titleFont?: ChartFont;
	titleAlign?: ChartTooltipAlignEnum;
	bodyColor?: string;
	bodyFont?: ChartFont;
	bodyAlign?: ChartTooltipAlignEnum;
	footerColor?: string;
	footerFont?: ChartFont;
	footerAlign?: ChartTooltipAlignEnum;
	borderColor?: string;
	borderWidth?: number;
	xAlign?: ChartTooltipAlignEnum;
	yAlign?: ChartTooltipYAlignEnum;
}

export enum ChartTooltipPositionEnum
{
	Average = "average",
	Nearest = "nearest"
}

export enum ChartTooltipAlignEnum
{
	Left = "left",
	Right = "right",
	Center = "center"
}

export enum ChartTooltipYAlignEnum
{
	Top = "top",
	Center = "center",
	Bottom = "bottom"
}

export class ChartStackedSettings
{
	x?: boolean;
	y?: boolean;
}

export class ChartAspectRatioSettings
{
	maintain?: boolean;
	value?: number;
}

export class ChartLimitSettings
{
	minX?: number;
	maxX?: number;
	minY?: number;
	maxY?: number;
}

export class ChartDataSource
{
	areaSettings?: ChartAreaSettings;
	type?: ChartTypeEnum;
	title?: string;
	backgroundColor?: string[];
	borderColor?: string[];
	borderWidth?: number;
	labels?: string[];
	hidden?: boolean;
	order?: number;
	fill?: boolean;
	data?: any[];
	parsing?: ChartParsingSettings;
	smoothLine?: boolean;
}

export class ChartParsingSettings
{
	xAxisKey?: string;
	yAxisKey?: string;
}

export class ChartLegendEvent extends VrControlsEvent
{
	sender: ChartVr;
	event: any;
	legendItem: any;
	legend: any;
}

export class ChartLegendHoverEvent extends ChartLegendEvent { }
export class ChartLegendLeaveEvent extends ChartLegendEvent { }
export class ChartLegendClickEvent extends ChartLegendEvent { }

export class ChartLabelEvent extends VrControlsEvent
{
	sender: ChartVr;
	context: any;
}

export class ChartLabelHoverEvent extends ChartLabelEvent { }
export class ChartLabelLeaveEvent extends ChartLabelEvent { }
export class ChartLabelClickEvent extends ChartLabelEvent { }

export class ChartAxisFormatterEvent extends VrControlsEvent
{
	value: any;
	context: any;
	sender: ChartVr;
}

export class ChartOptions extends VrControlOptions
{
	type?: ChartTypeEnum;
	padding?: number;
	parsing?: ChartParsingSettings;
	title?: boolean | string | ChartTitleSettings;
	subTitle?: boolean | string | ChartTitleSettings;
	dataLabels?: boolean | ChartDataLabelsSettings;
	datasource?: ChartDataSource[];
	legend?: boolean | ChartLegendSettings;
	tooltip?: boolean | ChartTooltipSettings;
	stacked?: boolean | ChartStackedSettings;
	limit?: ChartLimitSettings;
	showHideDatasetOnLegendClick?: boolean;
	responsive?: boolean;
	aspectRatio?: ChartAspectRatioSettings;
	scales?: any;

	onLegendHover?: (e: ChartLegendHoverEvent) => void;
	onLegendLeave?: (e: ChartLegendLeaveEvent) => void;
	onLegendClick?: (e: ChartLegendClickEvent) => void;
	onLabelHover?: (e: ChartLabelHoverEvent) => void;
	onLabelLeave?: (e: ChartLabelLeaveEvent) => void;
	onLabelClick?: (e: ChartLabelClickEvent) => void;
	onAxisLabelFormatter?: (e: ChartAxisFormatterEvent) => void;
	onDataFormatter?: (e: ChartAxisFormatterEvent) => void;
}
//#endregion

//#region Window
export enum WindowFooterItemTypeEnum
{
	Close,
	Ok,
	Custom,
	SplitButton,
	Switch,
	ButtonGroup,
	CheckBox,
	ComboBox,
	DatePicker,
	Label,
	TextBox,
	Separator
}

export enum WindowFooterItemAlignEnum
{
	Left,
	Right
}

export enum WindowAutoSizeDirectionEnum
{
	Width,
	Height
}
//#endregion

//#region Editor
export enum vrEditorItemEnum
{
	Separator = "|",
	Undo = "undo",
	Redo = "redo",
	Bold = "bold",
	Italic = "italic",
	Underline = "underline",
	FontFamily = "fontfamily",
	FontSelect = "fontfamily",
	FontSize = "fontsize",
	ForeColor = "forecolor",
	FullScreen = "fullscreen",
	AlignLeft = "alignleft",
	AlignRight = "alignright",
	AlignCenter = "aligncenter",
	AlignJustify = "alignjustify",
	OrderedList = "numlist",
	NumList = "numlist",
	UnorderedList = "bullist",
	Bullist = "bullist",
	ColorPicker = "color",
	Link = "link",
	Cut = "cut",
	Copy = "copy",
	Paste = "paste",
	PasteText = "pastetext",
	SelectAll = "selectall",
	SearchAndReplace = "searchreplace",
	Print = "print",
	Preview = "preview",
	CodeSource = "code",
	WordCount = "wordcount",
	Image = "image",
	Media = "media",
	Table = "inserttable",
	InsertTable = "inserttable",
	Cell = "cell",
	Row = "row",
	Symbols = "charmap",
	CharMap = "charmap",
	Emoticons = "emoticons",
	Hr = "hr",
	PageBreak = "pagebreak",
	StrikeThrough = "strikethrough",
	Superscript = "superscript",
	Subscript = "subscript",
	FontFormats = "fontformats",
	AlignFormats = "align",
	BlockFormats = "blockformats",
	BackgroundColor = "backcolor",
	ClearFormatting = "removeformat",
	RemoveFormat = "removeformat"
}

export enum vrEditorToolbarModeEnum
{
	Floating = "floating",
	Sliding = "sliding",
	Scrolling = "scrolling",
	Wrap = "wrap"
}

export enum TinyMceIconEnum
{
	CaretDown = "action-next",
	CaretUp = "action-prev",
	AlignCenter = "align-center",
	AlignJustify = "align-justify",
	AlignLeft = "align-left",
	AlignRight = "align-right",
	AlignNone = "align-none",
	ArrowLeft = "arrow-left",
	ArrowRight = "arrow-right",
	Cancel = "cancel",
	CheckMark = "checkmark",
	ChevronDown = "chevron-down",
	ChevronRight = "chevron-right",
	ChevronUp = "chevron-up",
	ChevronLeft = "chevron-left",
	Close = "close",
	Edit = "edit-block",
	FullScreen = "fullscreen",
	Home = "home",
	LineHorizontal = "horizontal-rule",
	BurgerHorizontal = "image-options",
	Image = "image",
	Info = "info",
	Time = "insert-time",
	Symbols = "insert-character",
	Link = "link",
	Url = "link",
	Lock = "lock",
	Document = "new-document",
	NewTab = "new-tab",
	Alert = "notice",
	Paragraph = "paragraph",
	Paste = "paste",
	PasteText = "paste-text",
	Add = "plus",
	Plus = "plus",
	Settings = "preferences",
	Preview = "preview",
	Print = "print",
	Quote = "quote",
	Redo = "redo",
	Reload = "reload",
	Refresh = "reload",
	Remove = "remove",
	Delete = "remove",
	Resize = "resize",
	RotateLeft = "rotate-left",
	RotateRight = "rotate-right",
	Search = "search",
	SourceCode = "sourcecode",
	Table = "table",
	Undo = "undo",
	Unlink = "unlink",
	Unlock = "unlock",
	Upload = "upload",
	Warning = "warning",
	ZoomIn = "zoom-in",
	ZoomOut = "zoom-out"
}

export class vrEditorCustomItem
{
	icon?: TinyMceIconEnum;
	imageUrl?: string;
	text?: string;
	tooltip?: string;
	onClick?(e: EditorItemClickEvent): void;
}

export class vrEditorCustomMenuItem
{
	type: EditorCustomMenuItemType;
	buttonOptions?: ButtonOptions;
	separatorOptions?: SeparatorOptions;
	splitButtonOptions?: SplitButtonOptions;
	switchOptions?: SwitchOptions;
	buttonGroupOptions?: ButtonGroupOptions;
	comboBoxOptions?: ComboBoxOptions;
	datePickerOptions?: DatePickerOptions;
	textBoxOptions?: TextBoxOptions;
	labelOptions?: LabelOptions;
}

export enum EditorCustomMenuItemType
{
	Button,
	Separator,
	SplitButton,
	Switch,
	ButtonGroup,
	CheckBox,
	ComboBox,
	DatePicker,
	Label,
	TextBox
}

export class vrEditorSpeechRecognizerSettings
{
	stopAtClick: boolean;
	position?: EditorSpeechRecognizerPositionEnum;
	mode?: EditorSpeechRecognizerModeEnum;
	showInfoCommands?: boolean;
}

export enum EditorSpeechRecognizerModeEnum
{
	Popup,
	Direct
}

export enum EditorSpeechRecognizerPositionEnum
{
	MenuBar,
	MenuItems
}

export class vrEditorFontSizeSettings
{
	defaultSize?: number;
	formatSizeList?: number[];
}
//#endregion

//#region Speech recognizer
export class SpeechRecognizerOptions extends VrControlOptions
{
	grammars?: string[];
	continuous?: boolean;
	stopAtClick?: boolean;
	interimResults?: boolean;
	language?: string;
	maxAlternatives?: number;
	size?: number;

	onClick?: (e: SpeechRecognizerClickEvent) => void;
	onNoMatch?: (e: SpeechRecognizerNoMatchEvent) => void;
	onError?: (e: SpeechRecognizerErrorEvent) => void;
	onResult?: (e: SpeechRecognizerResultEvent) => void;
	onStart?: (e: SpeechRecognizerStartEvent) => void;
	onEnd?: (e: SpeechRecognizerEndEvent) => void;
	onSpeechStart?: (e: SpeechRecognizerSpeechStartEvent) => void;
	onSpeechEnd?: (e: SpeechRecognizerSpeechEndEvent) => void;
	onAudioStart?: (e: SpeechRecognizerAudioStartEvent) => void;
	onAudioEnd?: (e: SpeechRecognizerAudioEndEvent) => void;
	onSoundStart?: (e: SpeechRecognizerSoundStartEvent) => void;
	onSoundEnd?: (e: SpeechRecognizerSoundEndEvent) => void;
}
//#endregion

//#region Grid
export enum GridCheckboxModeEnum
{
	None,
	SingleCheck,
	MultiCheck
}

export enum GridSortDirectionEnum
{
	Asc,
	Desc
}

export enum SortDirectionEnum
{
	Asc,
	Desc
}

export enum GridHeightModeEnum
{
	FitScreen,
	FitContent
}

export enum GridModeEnum
{
	Sync,
	NotSync
}

export enum GridAggregateMode
{
	Average,
	Count,
	Max,
	Min,
	Sum,
	None
}

export enum GridAlignEnum
{
	Left = "left",
	Center = "center",
	Right = "right"
}

export enum GridColumnTypeEnum
{
	String = 0,
	Number = 1,
	Currency = 2,
	Percentage = 3,
	Duration = 4,
	Date = 5,
	Time = 6,
	DateTime = 7,
	Checkbox = 8,
	Boolean = 9,
	Button = 10,
	EditButton = 11,
	Label = 12,
	Image = 13,
	Custom = 14,
	Icon = 15,
	DropDownList = 16,
	ComboBox = 17,
	DropDownTree = 18,
	DropDownTreeCheckboxes = 19,
	PasswordViewable = 20,
	Color = 21,
	LongDate = 22,
	LongDateTime = 23,
	LongWeekDate = 24,
	ShortWeekDate = 25
}

export enum GridLabelUnderlineMode
{
	Always,
	None,
	OnFocus
}

export enum GridToolbarItemType
{
	Add,
	Delete,
	Separator,
	Excel,
	ExcelWithHiddenColumns,
	Custom,
	Rebind,
	SplitButton,
	Switch,
	ButtonGroup,
	CheckBox,
	ComboBox,
	DatePicker,
	Label,
	TextBox
}

export enum GridDateFilterTypeEnum
{
	GreaterThan,
	LessThan,
	EqualsTo,
	Between
}

export enum GridNumberFilterTypeEnum
{
	GreaterThan,
	LessThan,
	EqualsTo,
	Between
}

export enum GridStringFilterTypeEnum
{
	StartsWith,
	EndsWith,
	EqualsTo,
	Includes,
	IncludesFromSimpleSearch
}

export class GridStickerSettings
{
	textColor?: string;
	backgroundColor?: string;
	text?: string;
	cssContainer?: string;
	css?: string;
	bold?: boolean;

	onClick?: (e: GridStickerClickEvent) => void;
}

export class GridStickerClickEvent
{
	sender: Grid;
	control: Label;
	value?: string | null;
}

export class GridServerBindSettings
{
	public itemCountPropertyName?: string;
	public totalsPropertyName?: string;
	public excelDownloadUrlPropertyName?: string;
}

export class GridGroupBySettings
{
	sortBy?: GridSortSettings;
	internalSortBy?: GridSortSettings;
	fields: string[] | GridGroupByItem[];
}

export class GridSortSettings
{
	field: string;
	direction?: GridSortDirectionEnum;
}

export class GridGroupByItem
{
	field: string;
	displayField?: string;
	displayValue?: (e: GridGroupDisplayValueEvent) => string;
	onExpandCollapse?: (e: GridGroupExpandCollapseEvent) => void;
	onEditClick?: (e: GridGroupEditClickEvent) => void;
}

export class GridGroupDisplayValueEvent
{
	sender: Grid;
	dataItem: any;
	field: string;
	displayField?: string;
}

export class GridGroupExpandCollapseEvent
{
	sender: Grid;
	groupByField: string;
	childrenItems: any[];
	groupByDisplayField?: string;
	collapse: boolean;
	value: any;
	childrenRows: HTMLElement[];
	displayValue: any;
}

export class GridGroupEditClickEvent
{
	sender: Grid;
	groupByField: string;
	childrenItems: any[];
	groupByDisplayField?: string;
	value: any;
	childrenRows: HTMLElement[];
	displayValue: any;
}

export class GridPageSelectedEvent extends VrControlsEvent
{
	sender: Grid;
	pageSelected: number;
}

export class GridScrollEvent extends VrControlsEvent
{
	sender: Grid;
	target: HTMLElement;
	scrollLeft: number;
	scrollTop: number;
}

class GridExcelExportEvent extends VrControlsEvent
{
	sender: Grid;
}

export class GridBeforeExcelExportEvent extends GridExcelExportEvent
{
	fileName: string;
	exportHiddenColumns: boolean;
}

export class GridAfterExcelExportEvent extends GridExcelExportEvent
{
	headerRow: GridExcelRow;
	contentRows: GridExcelRow[];
	footerRow: GridExcelRow;
	excelFileName: string;
	groupBy: string[] | null;
	exportHiddenColumns: boolean;
}

export class GridColumn
{
	field: string;
	title?: string;
	width?: number;
	fitSpace?: boolean;
	type?: GridColumnTypeEnum;
	decimalDigits?: number;
	milesSeparator?: boolean;
	showSeconds?: boolean;
	ignoreFactor?: boolean;
	bold?: boolean;
	aggregate?: boolean | GridAggregateMode;
	countZeroInAverage?: boolean;
	roundingSettings?: NumberFormatRoundingSettings;
	defaultValue?: any;
	editable?: boolean;
	exportable?: boolean;
	groupable?: boolean;
	locked?: boolean;
	lockable?: boolean;
	hidden?: boolean;
	hideable?: boolean;
	filterable?: boolean;
	filterWebService?: boolean;
	customFilterProperties?: string[];

	//#region DropDownList, ComboBox and DropDownTree
	displayField?: string;
	dataItems?: any[];
	ddlNullable?: boolean;
	//#endregion

	headerSettings?: GridHeaderSettings;
	cellSettings?: GridCellSettings;

	//#region Controls
	buttonSettings?: (templateEvent: GridTemplateEvent) => GridButtonSettings;
	customSettings?: (templateEvent: GridTemplateEvent) => GridCustomSettings | void;
	iconSettings?: (templateEvent: GridTemplateEvent) => GridIconSettings;
	imageSettings?: (templateEvent: GridTemplateEvent) => GridImageSettings;
	labelSettings?: (templateEvent: GridTemplateEvent) => GridLabelSettings;
	//#endregion
}

export class GridButtonSettings extends GridControlsSettings
{
	text?: string;
	icon?: IconClass;
	imageUrl?: string;
	isPrimaryButton?: boolean;
	color?: string;
	backgroundColor?: string;
}

export class GridToolbarItem
{
	type?: GridToolbarItemType;
	text?: string;
	icon?: IconClass;
	imageUrl?: string;
	confirmationMessage?: string;
	deleteRequest?: GridToolbarDeleteRequest;
	excelFileName?: string;
	backgroundColor?: string;
	textColor?: string;
	visible?: boolean;
	css?: string;
	cssContainer?: string;
	classContainer?: string;
	badge?: ButtonBadgeSettings;
	primary?: boolean;
	enable?: boolean;

	splitButtonItems?: SplitButtonItem[];
	splitButtonOptions?: SplitButtonOptions;
	switchSettings?: GridToolbarSwitchSettings;
	buttonGroupItems?: ButtonGroupItem[];
	comboBoxOptions?: ComboBoxOptions;
	datePickerOptions?: DatePickerOptions;
	textBoxOptions?: TextBoxOptions;

	/** Required if type CUSTOM */
	value?: string;

	onClick?: (e: GridToolbarClickEvent) => void;
	onBeforeClick?: (e: GridToolbarClickEvent) => void;
}
//#endregion

//#region PdfViewer
export enum PdfViewerToolbarAreaEnum
{
	Left,
	Center,
	Right
}

export class OnContentRenderedEvent
{
	sender: PdfViewer;
	pdf: any;
	base64bytes: string;
}

export class PdfViewerToolbarSettings
{
	navigation?: boolean;
	zoom?: boolean;
	print?: boolean;
	download?: boolean;
	items?: PdfViewerToolbarItem[];
}

export class PdfViewerToolbarItem
{
	text?: string;
	icon?: IconClass;
	value?: string;
	area?: PdfViewerToolbarAreaEnum;
	css?: string;
	cssContainer?: string;
	onClick?: (e: ToolbarItemOnClickEvent) => void;
}

export class ToolbarItemOnClickEvent
{
	sender: PdfViewer;
	text?: string;
	value?: string;
}
//#endregion

//#region Splitter
export enum SplitterDirectionEnum
{
	Horizontal = "horizontal",
	Vertical = "vertical"
}

export enum SplitterCollapseDirectionEnum
{
	Left,
	Right,
	Up,
	Down
}

export class SplitterCollapsableSettings
{
	direction: SplitterCollapseDirectionEnum;
	color?: string;
}
//#endregion

//#region Switch
export class SwitchLabelSettings
{
	text: string;
	tooltip?: string;
	color?: string;
	bold?: boolean;
	css?: string;
	onClick?: (e: SwitchLabelSettingsOnClickEvent) => void;
}

export class SwitchLabelSettingsOnClickEvent extends VrControlsEvent
{
	sender: Switch;
	checked: boolean;
}
//#endregion

//#region Scheduler
export class SchedulerSaturationInfo
{
	manual?: boolean;
	dayMode?: SchedulerSaturationDay[];
	weekMode?: SchedulerSaturationWeek;
	fourWeeksMode?: SchedulerSaturationFourWeeks[];
}

export class SchedulerSaturationDay
{
	resourceId: number;
	date?: Date;
	percentageValue?: number;
	color?: string;
	borderColor?: string;
}

export class SchedulerSaturationWeek
{
	groupedByResource?: SchedulerSaturationWeekByResource[];
	groupedByDate?: SchedulerSaturationWeekByDate[];
}

export class SchedulerSaturationWeekByResource
{
	resourceId: number;
	percentageValue?: number;
	dateList?: SaturationDate[];
	color?: string;
	titleColor?: string;
}

export class SaturationDate
{
	date: Date;
	percentageValue?: number;
	color?: string;
	borderColor?: string;
}

export class SchedulerSaturationWeekByDate
{
	date: Date;
	resourceList?: SaturationResource[];
}

export class SaturationResource
{
	id: number;
	percentageValue?: number;
	color?: string;
	borderColor?: string;
}

export class SchedulerSaturationFourWeeks
{
	resourceId: number;
	percentageValue?: number;
	dateList?: SaturationDate[];
	color?: string;
	titleColor?: string;
}

export class SchedulerResource
{
	text: string;
	value: string;
}

export enum DayOfWeekEnum
{
	Sunday,
	Monday,
	Tuesday,
	Wednesday,
	Thursday,
	Friday,
	Saturday
}

export class SchedulerView
{
	type: SchedulerViewEnum;
	selected: boolean;
}

export enum SchedulerViewEnum
{
	Day = 0,
	Week = 1,
	FourWeeks = 2
}

export class SchedulerSlotElement
{
	resourceId: string;
	start: Date;
	end: Date;
	columnPosition: boolean[];
	attributes: SchedulerAttribute[];

	columnIndex: number;
	rowIndex: number;
}

export class SchedulerData
{
	id: string;
	resourceId: string;
	start: Date;
	end: Date;
	backgroundColor?: string;
	textColor?: string;
	text?: string;
	tooltip?: string;
	css?: string;
	class?: string;
	attributes?: SchedulerAttribute[];

	get duration(): number
	{
		return Date.vrDifferenceBetweenDatesInMinutes(new Date(this.start), new Date(this.end));
	}
}

export class SchedulerAttribute
{
	key: string;
	value: string;
}

export enum SchedulerNavigateActionEnum
{
	NextDate = 0,
	PrevDate = 1,
	Today = 2,
	ChangeDate = 4
}
//#endregion

//#region Notifier
export class NotifierOptions
{
	target?: HTMLElement | JQuery | string;
	type?: NotifierTypeEnum;
	position?: NotifierPositionEnum;
	hideSettings?: NotifierHideSettings;
	showSettings?: NotifierShowSettings;
	colorSettings?: ColorSettings;
	css?: string;
	cssContainer?: string;
	class?: string;
	width?: string | number;
	icon?: IconClass | boolean;
	bold?: boolean;
	fontSize?: number | string;

	customHtml?: string | ((e: NotifierCustomHtmlEvent) => void);
	onClick?: (e: NotifierOnClickEvent) => void;
}

export enum NotifierTypeEnum
{
	Default,
	Success,
	Info,
	Warning,
	Error
}

export enum NotifierPositionEnum
{
	TopLeft = "TopLeft",
	TopCenter = "TopCenter",
	TopRight = "TopRight",
	BottomLeft = "BottomLeft",
	BottomCenter = "BottomCenter",
	BottomRight = "BottomRight",
	RightMiddle = "RightMiddle",
	RightTop = "RightTop",
	RightBottom = "RightBottom",
	LeftBottom = "LeftBottom",
	LeftTop = "LeftTop",
	LeftMiddle = "LeftMiddle",
	MiddleScreen = "MiddleScreen"
}

export enum AnimationShowEnum
{
	None,
	Default,
	FadeIn,
	SlideDown
}

export enum AnimationHideEnum
{
	None,
	Default,
	FadeOut,
	SlideUp
}


//#endregion

//#region Tooltip
export enum TooltipShowOnEnum
{
	Click,
	Focus,
	Hover,
	Never
}

export enum TooltipHideOnEnum
{
	Default,
	Never,
	Click,
	Blur,
	Leave
}

export enum TooltipTypeEnum
{
	Default,
	Success,
	Info,
	Warning,
	Error
}

export enum TooltipPositionEnum
{
	TopLeft = "TopLeft",
	TopCenter = "TopCenter",
	TopRight = "TopRight",
	BottomLeft = "BottomLeft",
	BottomCenter = "BottomCenter",
	BottomRight = "BottomRight",
	RightMiddle = "RightMiddle",
	RightTop = "RightTop",
	RightBottom = "RightBottom",
	LeftBottom = "LeftBottom",
	LeftTop = "LeftTop",
	LeftMiddle = "LeftMiddle",
	MiddleScreen = "MiddleScreen"
}
//#endregion

//#region TreeView
export class TreeViewColumn
{
	field: string;
	title?: string;
	width?: number;
	type?: TreeViewColumnTypeEnum;
	decimalDigits?: number;
	showSeconds?: boolean;
	ignoreFactor?: boolean;
	bold?: boolean;
	milesSeparator?: boolean;
	boldRoot?: boolean;
	hidden?: boolean;

	headerSettings?: TreeViewHeaderSettings;
	cellSettings?: TreeViewCellSettings;
}

export class TreeViewToolbarItem
{
	type?: TreeViewToolbarItemType;
	text?: string;
	icon?: IconClass;
	imageUrl?: string;
	confirmationMessage?: string;
	backgroundColor?: string;
	textColor?: string;
	visible?: boolean;
	css?: string;
	cssContainer?: string;
	classContainer?: string;
	badge?: ButtonBadgeSettings;
	primary?: boolean;

	splitButtonItems?: SplitButtonItem[];
	switchSettings?: TreeViewToolbarSwitchSettings;
	buttonGroupItems?: ButtonGroupItem[];
	comboBoxOptions?: ComboBoxOptions;
	datePickerOptions?: DatePickerOptions;
	textBoxOptions?: TextBoxOptions;

	/** Required if type CUSTOM */
	value?: string;

	onClick?: (e: TreeViewToolbarClickEvent) => void;
}

export class TreeViewToolbarSwitchSettings
{
	labelOff?: string;
	labelOn?: string;
	checked?: boolean;
	onCheck?: (e: TreeViewToolbarSwitchEvent) => void;
}

export class TreeViewToolbarSwitchEvent
{
	checked: boolean;
}

export class TreeViewToolbarClickEvent
{
	sender: any;
	type: TreeViewToolbarItemType;
	isDefaultPrevented: boolean;
	deletedItems?: any[];

	preventDefault()
	{
		this.isDefaultPrevented = true;
	}
}

export class UpdateRowRebindSettings
{
	onlyText: boolean;
}

export enum TreeViewToolbarItemType
{
	Separator,
	Excel,
	Custom,
	Rebind,
	SplitButton,
	Switch,
	ButtonGroup,
	CheckBox,
	ComboBox,
	DatePicker,
	Label,
	TextBox
}

export class TreeViewItem
{
	text: string;
	value: string;
	icon?: IconClass;
	parentValue?: string;
	numericValue?: number;
	bold?: boolean;
}

export class TreeViewItemExtraCell extends TreeViewColumn
{
	value?: string;
}

export class TreeViewContextMenuItem
{
	text?: string;
	value?: string;
	icon?: IconClass;
	separator?: boolean;
	confirmationMessage?: string;

	onClick?: (e: TreeViewContextMenuClickEvent) => void;
}

export enum TreeModeEnum
{
	AllExpanded,
	OnlyFirstLevelExpanded,
	AllCollapsed
}

export enum TreeViewNumericTypeEnum
{
	Default = 0,
	Currency = 1,
	Percentage = 2
}

export enum TreeViewColumnTypeEnum
{
	String = 0,
	Number = 1,
	Currency = 2,
	Percentage = 3,
	Duration = 4,
	Date = 5,
	Time = 6,
	DateTime = 7,
	Checkbox = 8,
	Boolean = 9,
	Color = 21,
}

export enum TreeViewAlignEnum
{
	Left = "left",
	Center = "center",
	Right = "right"
}

export class TreeViewFilterSettings
{
	onlyParents?: boolean;
}
//#endregion

//#region Maps
export class MapMarker
{
	latitude: number;
	longitude: number;
	title: string;
	opacity: number;
	draggable: boolean;
}

export enum MapModeEnum
{
	Streets = "mapbox/streets-v11",
	Outdoors = "mapbox/outdoors-v11",
	Light = "mapbox/light-v10",
	Dark = "mapbox/dark-v10",
	Satellite = "mapbox/satellite-v9",
	SatelliteStreets = "mapbox/satellite-streets-v11",
	NavigationDay = "mapbox/navigation-day-v1",
	NavigationNight = "mapbox/navigation-night-v1"
}
//#endregion

//#region Color Picker
export class ColorPickerRgbaValue
{
	r: number;
	g: number;
	b: number;
	a?: number;
}

export enum ColorPickerModeEnum
{
	Hex = "hex",
	Rgba = "rgba"
}
//#endregion

//#region Upload
export enum UploadValidationErrorTypeEnum
{
	MinSize,
	MaxSize,
	Extensions
}
//#endregion

//#region Colors
export enum Color
{
	red = "#FF0000",
	red50 = "#ffebee",
	red100 = "#ffcdd2",
	red200 = "#ef9a9a",
	red300 = "#e57373",
	red400 = "#ef5350",
	red500 = "#f44336",
	red600 = "#e53935",
	red700 = "#d32f2f",
	red800 = "#c62828",
	red900 = "#b71c1c",
	redA100 = "#ff8a80",
	redA200 = "#ff5252",
	redA400 = "#ff1744",
	redA700 = "#d50000",
	pink50 = "#fce4ec",
	pink100 = "#f8bbd0",
	pink200 = "#f48fb1",
	pink300 = "#f06292",
	pink400 = "#ec407a",
	pink500 = "#e91e63",
	pink600 = "#d81b60",
	pink700 = "#c2185b",
	pink800 = "#ad1457",
	pink900 = "#880e4f",
	pinkA100 = "#ff80ab",
	pinkA200 = "#ff4081",
	pinkA400 = "#f50057",
	pinkA700 = "#c51162",
	purple50 = "#f3e5f5",
	purple100 = "#e1bee7",
	purple200 = "#ce93d8",
	purple300 = "#ba68c8",
	purple400 = "#ab47bc",
	purple500 = "#9c27b0",
	purple600 = "#8e24aa",
	purple700 = "#7b1fa2",
	purple800 = "#6a1b9a",
	purple900 = "#4a148c",
	purpleA100 = "#ea80fc",
	purpleA200 = "#e040fb",
	purpleA400 = "#d500f9",
	purpleA700 = "#aa00ff",
	deepPurple50 = "#ede7f6",
	deepPurple100 = "#d1c4e9",
	deepPurple200 = "#b39ddb",
	deepPurple300 = "#9575cd",
	deepPurple400 = "#7e57c2",
	deepPurple500 = "#673ab7",
	deepPurple600 = "#5e35b1",
	deepPurple700 = "#512da8",
	deepPurple800 = "#4527a0",
	deepPurple900 = "#311b92",
	deepPurpleA100 = "#b388ff",
	deepPurpleA200 = "#7c4dff",
	deepPurpleA400 = "#651fff",
	deepPurpleA700 = "#6200ea",
	indigo50 = "#e8eaf6",
	indigo100 = "#c5cae9",
	indigo200 = "#9fa8da",
	indigo300 = "#7986cb",
	indigo400 = "#5c6bc0",
	indigo500 = "#3f51b5",
	indigo600 = "#3949ab",
	indigo700 = "#303f9f",
	indigo800 = "#283593",
	indigo900 = "#1a237e",
	indigoA100 = "#8c9eff",
	indigoA200 = "#536dfe",
	indigoA400 = "#3d5afe",
	indigoA700 = "#304ffe",
	blue = "#0000FF",
	blue50 = "#e3f2fd",
	blue100 = "#bbdefb",
	blue200 = "#90caf9",
	blue300 = "#64b5f6",
	blue400 = "#42a5f5",
	blue500 = "#2196f3",
	blue600 = "#1e88e5",
	blue700 = "#1976d2",
	blue800 = "#1565c0",
	blue900 = "#0d47a1",
	blueA100 = "#82b1ff",
	blueA200 = "#448aff",
	blueA400 = "#2979ff",
	blueA700 = "#2962ff",
	lightBlue50 = "#e1f5fe",
	lightBlue100 = "#b3e5fc",
	lightBlue200 = "#81d4fa",
	lightBlue300 = "#4fc3f7",
	lightBlue400 = "#29b6f6",
	lightBlue500 = "#03a9f4",
	lightBlue600 = "#039be5",
	lightBlue700 = "#0288d1",
	lightBlue800 = "#0277bd",
	lightBlue900 = "#01579b",
	lightBlueA100 = "#80d8ff",
	lightBlueA200 = "#40c4ff",
	lightBlueA400 = "#00b0ff",
	lightBlueA700 = "#0091ea",
	cyan = "#00FFFF",
	cyan50 = "#e0f7fa",
	cyan100 = "#b2ebf2",
	cyan200 = "#80deea",
	cyan300 = "#4dd0e1",
	cyan400 = "#26c6da",
	cyan500 = "#00bcd4",
	cyan600 = "#00acc1",
	cyan700 = "#0097a7",
	cyan800 = "#00838f",
	cyan900 = "#006064",
	cyanA100 = "#84ffff",
	cyanA200 = "#18ffff",
	cyanA400 = "#00e5ff",
	cyanA700 = "#00b8d4",
	teal50 = "#e0f2f1",
	teal100 = "#b2dfdb",
	teal200 = "#80cbc4",
	teal300 = "#4db6ac",
	teal400 = "#26a69a",
	teal500 = "#009688",
	teal600 = "#00897b",
	teal700 = "#00796b",
	teal800 = "#00695c",
	teal900 = "#004d40",
	tealA100 = "#a7ffeb",
	tealA200 = "#64ffda",
	tealA400 = "#1de9b6",
	tealA700 = "#00bfa5",
	green = "#00FF00",
	green50 = "#e8f5e9",
	green100 = "#c8e6c9",
	green200 = "#a5d6a7",
	green300 = "#81c784",
	green400 = "#66bb6a",
	green500 = "#4caf50",
	green600 = "#43a047",
	green700 = "#388e3c",
	green800 = "#2e7d32",
	green900 = "#1b5e20",
	greenA100 = "#b9f6ca",
	greenA200 = "#69f0ae",
	greenA400 = "#00e676",
	greenA700 = "#00c853",
	lightGreen50 = "#f1f8e9",
	lightGreen100 = "#dcedc8",
	lightGreen200 = "#c5e1a5",
	lightGreen300 = "#aed581",
	lightGreen400 = "#9ccc65",
	lightGreen500 = "#8bc34a",
	lightGreen600 = "#7cb342",
	lightGreen700 = "#689f38",
	lightGreen800 = "#558b2f",
	lightGreen900 = "#33691e",
	lightGreenA100 = "#ccff90",
	lightGreenA200 = "#b2ff59",
	lightGreenA400 = "#76ff03",
	lightGreenA700 = "#64dd17",
	vettore = "#51B3E1",
	vettoreLight = "#e3f1fa",
	pumo = "#32CD32",
	lime50 = "#f9fbe7",
	lime100 = "#f0f4c3",
	lime200 = "#e6ee9c",
	lime300 = "#dce775",
	lime400 = "#d4e157",
	lime500 = "#cddc39",
	lime600 = "#c0ca33",
	lime700 = "#afb42b",
	lime800 = "#9e9d24",
	lime900 = "#827717",
	limeA100 = "#f4ff81",
	limeA200 = "#eeff41",
	limeA400 = "#c6ff00",
	limeA700 = "#aeea00",
	yellow = "#FFFF00",
	yellow50 = "#fffde7",
	yellow100 = "#fff9c4",
	yellow200 = "#fff59d",
	yellow300 = "#fff176",
	yellow400 = "#ffee58",
	yellow500 = "#ffeb3b",
	yellow600 = "#fdd835",
	yellow700 = "#fbc02d",
	yellow800 = "#f9a825",
	yellow900 = "#f57f17",
	yellowA100 = "#ffff8d",
	yellowA200 = "#ffff00",
	yellowA400 = "#ffea00",
	yellowA700 = "#ffd600",
	amber50 = "#fff8e1",
	amber100 = "#ffecb3",
	amber200 = "#ffe082",
	amber300 = "#ffd54f",
	amber400 = "#ffca28",
	amber500 = "#ffc107",
	amber600 = "#ffb300",
	amber700 = "#ffa000",
	amber800 = "#ff8f00",
	amber900 = "#ff6f00",
	amberA100 = "#ffe57f",
	amberA200 = "#ffd740",
	amberA400 = "#ffc400",
	amberA700 = "#ffab00",
	orange50 = "#fff3e0",
	orange100 = "#ffe0b2",
	orange200 = "#ffcc80",
	orange300 = "#ffb74d",
	orange400 = "#ffa726",
	orange500 = "#ff9800",
	orange600 = "#fb8c00",
	orange700 = "#f57c00",
	orange800 = "#ef6c00",
	orange900 = "#e65100",
	orangeA100 = "#ffd180",
	orangeA200 = "#ffab40",
	orangeA400 = "#ff9100",
	orangeA700 = "#ff6d00",
	deepOrange50 = "#fbe9e7",
	deepOrange100 = "#ffccbc",
	deepOrange200 = "#ffab91",
	deepOrange300 = "#ff8a65",
	deepOrange400 = "#ff7043",
	deepOrange500 = "#ff5722",
	deepOrange600 = "#f4511e",
	deepOrange700 = "#e64a19",
	deepOrange800 = "#d84315",
	deepOrange900 = "#bf360c",
	deepOrangeA100 = "#ff9e80",
	deepOrangeA200 = "#ff6e40",
	deepOrangeA400 = "#ff3d00",
	deepOrangeA700 = "#dd2c00",
	brown50 = "#efebe9",
	brown100 = "#d7ccc8",
	brown200 = "#bcaaa4",
	brown300 = "#a1887f",
	brown400 = "#8d6e63",
	brown500 = "#795548",
	brown600 = "#6d4c41",
	brown700 = "#5d4037",
	brown800 = "#4e342e",
	brown900 = "#3e2723",
	grey50 = "#fafafa",
	grey100 = "#f5f5f5",
	grey200 = "#eeeeee",
	grey300 = "#e0e0e0",
	grey400 = "#bdbdbd",
	grey500 = "#9e9e9e",
	grey600 = "#757575",
	grey700 = "#616161",
	grey800 = "#424242",
	grey900 = "#212121",
	blueGrey50 = "#eceff1",
	blueGrey100 = "#cfd8dc",
	blueGrey200 = "#b0bec5",
	blueGrey300 = "#90a4ae",
	blueGrey400 = "#78909c",
	blueGrey500 = "#607d8b",
	blueGrey600 = "#546e7a",
	blueGrey700 = "#455a64",
	blueGrey800 = "#37474f",
	blueGrey900 = "#263238"
}
//#endregion

//#region General/Utility
export function pageError(callback?: (e: PageErrorEvent) => void)
{
	window.onerror = (msg: string | Event, url?: string, lineNo?: number, columnNo?: number, error?: Error) =>
	{
		if (callback != null)
		{
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
	}
}

class PageErrorEvent
{
	public message: string | Event;
	public url?: string;
	public lineNumber?: number;
	public columnNumber?: number;
	public error?: Error;
}

export function isEquals(item1: any, item2: any)
{
	return UtilityManager.equals(item1, item2);
}

export function isLocalhost()
{
	return (location.hostname.includes("localhost"));
}

export function interval(callback: Function, each: number, timeout?: number, timeoutCallback?: Function)
{
	UtilityManager.interval(callback, each, timeout, timeoutCallback);
}

export function addCssStyle(cssRules: string, id?: string)
{
	UtilityManager.addCssStyle(cssRules, id);
}

export function addCss(cssRules: string, id?: string)
{
	addCssStyle(cssRules, id);
}

export function addJsScript(jsRules: string, id?: string)
{
	UtilityManager.addJsScript(jsRules, id);
}

export function addCssFiles(...paths: string[])
{
	let promise = new Promise((callback: Function) =>
	{
		UtilityManager.addCssFiles(...paths).then(() => callback());
	});
	return promise;
}

export function addJsFiles(...paths: string[])
{
	let promise = new Promise((callback: Function) =>
	{
		UtilityManager.addJsFiles(...paths).then(() => callback());
	});
	return promise;
}

export function openUrl(url: string, name = "download", newTab = false)
{
	UtilityManager.openUrl(url, name, newTab);
}

export function openBrowserWindow(url: string, newTab = false, size?: BrowserWindowSize, position?: BrowserWindowPosition)
{
	//#region Size
	let width = 1000;
	let height = 700;
	if (size != null)
	{
		if (size.width != null) width = size.width;
		if (size.height != null) height = size.height;
	}
	//#endregion

	//#region Position
	let top = window!.top!.outerHeight / 2 + window!.top!.screenY - (height / 2);
	let left = window!.top!.outerWidth / 2 + window!.top!.screenX - (width / 2);
	if (position != null)
	{
		if (position.top != null) top = position.top;
		if (position.left != null) left = position.left;
	}
	//#endregion

	window.open(url, (newTab) ? "_blank" : "", (newTab) ? `width=${width}, height=${height}, top=${top}, left=${left}` : "");
}

export class BrowserWindowSize
{
	height?: number;
	width?: number;
}

export class BrowserWindowPosition
{
	left?: number;
	top?: number;
}

export function isValidEmail(email: string)
{
	return UtilityManager.isValidEmail(email);
}

export function copyTextToClipboard(text: string)
{
	if (!navigator.clipboard)
	{
		oldSupportCopyTextToClipboard(text);
		return;
	}
	navigator.clipboard.writeText(text).then(() => notify("Copiato!"));
}

function oldSupportCopyTextToClipboard(text: string)
{
	let textAreaTemp = document.createElement("textarea");
	textAreaTemp.value = text;

	//#region Avoid scrolling to bottom
	textAreaTemp.style.top = "0";
	textAreaTemp.style.left = "0";
	textAreaTemp.style.position = "fixed";
	//#endregion

	document.body.appendChild(textAreaTemp);
	textAreaTemp.focus();
	textAreaTemp.select();

	try { if (document.execCommand('copy')) notify("Copiato!"); }
	catch (e) { }

	document.body.removeChild(textAreaTemp);
}

export function base64ToFile(base64: string, fileName: string, options?: FilePropertyBag)
{
	return UtilityManager.base64ToFile(base64, fileName, options);
}

export function base64ToBytes(base64: string)
{
	return UtilityManager.base64ToBytes(base64);
}

export function bytesToBase64(bytes: Uint8Array)
{
	return UtilityManager.bytesToBase64(bytes);
}

export function base64ToBlob(base64: string, contentType = '', sliceSize = 512)
{
	return UtilityManager.base64ToBlob(base64, contentType, sliceSize);
}

export function shadowRoot(shadowRoot?: ShadowRoot)
{
	if (shadowRoot != null)
		_shadowRoot2 = shadowRoot;

	return _shadowRoot2;
}

export function jqueryVariable(jqueryVariable?: any)
{
	if (jqueryVariable != null)
		_jqueryVariable = jqueryVariable;

	return _jqueryVariable;
}

export enum WebApiModeEnum
{
	Async,
	Sync
}

export enum DateModeEnum
{
	Date = 0,
	DateTime = 1,
	Time = 2,
	LongDate = 3,
	LongDateTime = 4,
	LongWeekDate = 5,
	ShortWeekDate = 6
}

export enum DateDepthEnum
{
	Day,
	Month,
	Year
}

export enum DateFormatEnum
{
	LongDate,
	ShortDate,
	WeekDay,
	WeekRange,
	FourWeeksRange,
	Month,
	Year,
	LongDateWithoutYear,
	ShortDateWithoutYear
}

export enum KeyEnum
{
	ArrowLeft = "ArrowLeft",
	ArrowUp = "ArrowUp",
	ArrowRight = "ArrowRight",
	ArrowDown = "ArrowDown",
	Enter = "Enter",
	Tab = "Tab",
	Backspace = "Backspace",
	Control = "Control",
	Shift = "Shift"
}

export class NumberFormatRoundingSettings
{
	roundingMode?: RoundingModeEnum;
	minimumFractionDigits?: number;
	maximumFractionDigits?: number;
}

export class NumberFormatSettings extends NumberFormatRoundingSettings
{
	constructor(roundingSettings?: NumberFormatRoundingSettings)
	{
		super();
		if (roundingSettings != null)
		{
			this.roundingMode = roundingSettings.roundingMode;
			this.minimumFractionDigits = roundingSettings.minimumFractionDigits;
			this.maximumFractionDigits = roundingSettings.maximumFractionDigits;
		}
	}

	style?: NumberStyleEnum;
	currency?: string;
	useGrouping?: GroupingModeEnum | boolean;
}

enum NumberStyleEnum
{
	Default = "decimal",
	Decimal = "decimal",
	Currency = "currency",
	Percentage = "percent",
	Unit = "unit"
}

export enum GroupingModeEnum
{
	Always = "always",
	Auto = "auto",
	Min2 = "min2"
}

export enum RoundingModeEnum
{
	Default = "halfExpand",
	None = "none",
	Ceil = "ceil",
	Floor = "floor",
	AwayFromZero = "expand",
	Expand = "expand",
	Trunc = "trunc",

	HalfCeil = "halfCeil",
	HalfFloor = "halfFloor",
	HalfAwayFromZero = "halfExpand",
	HalfExpand = "halfExpand",
	HalfTrunc = "halfTrunc",
	HalfEven = "halfEven"
}

export class DateTime
{
	public year: number;
	public month: number;
	public day: number;
	public hours: number;
	public minutes: number;
	public seconds: number;
	public milliseconds: number;

	private _createdByTypeEnum: DateTimeTypeEnum;

	constructor(date?: Date | DateTime | string)
	{
		if (date != null)
		{
			if (typeof (date) == "string")
			{
				date = Date.vrFixDateString(date);
				this._createdByTypeEnum = DateTimeTypeEnum.String;
			}

			if (Date.vrIsValidDate(date))
			{
				date = date as Date;
				this.year = date.getFullYear();
				this.month = date.getMonth() + 1;
				this.day = date.getDate();
				this.hours = date.getHours();
				this.minutes = date.getMinutes();
				this.seconds = date.getSeconds();
				this.milliseconds = date.getMilliseconds();
				this._createdByTypeEnum = DateTimeTypeEnum.Date;
			}
			else
			{

				date = date as DateTime;
				this.year = date.year;
				this.month = date.month;
				this.day = date.day;
				this.hours = date.hours;
				this.minutes = date.minutes;
				this.seconds = date.seconds;
				this.milliseconds = date.milliseconds;
				this._createdByTypeEnum = DateTimeTypeEnum.DateTime;
			}
		}
	}

	public createdByTypeEnum()
	{
		return this._createdByTypeEnum;
	}

	public isCreatedByDateTime()
	{
		return this.createdByTypeEnum() == DateTimeTypeEnum.DateTime;
	}

	public isCreatedByDate()
	{
		return this.createdByTypeEnum() == DateTimeTypeEnum.Date;
	}

	public isCreatedByString()
	{
		return this.createdByTypeEnum() == DateTimeTypeEnum.String;
	}

	public toDate()
	{
		return DateTime.toDate(this);
	}

	public static toDate(source: DateTime): Date
	{
		return new Date(source.year, source.month - 1, source.day, source.hours, source.minutes, source.seconds, source.milliseconds);
	}

	public static toDateNullable(source: DateTime | null): Date | null
	{
		if (source == null)
			return null;
		else
			return this.toDate(source);
	}

	public static fromDateNullable(source: Date | null): DateTime | null
	{
		if (source == null)
			return null;
		else
			return new DateTime(source);
	}
}

export enum DateTimeTypeEnum
{
	Date,
	DateTime,
	String
}
//#endregion

//#region Primitive type extensions
declare global
{
	interface DateConstructor
	{
		vrFixDateString(dateString?: Date | string | null): Date;
		vrEquals(firstDate: Date, secondDate: Date): boolean;
		vrGetFirstDayOfMonthByDate(dateToCheck: Date): Date;
		vrGetLastDayOfMonthByDate(dateToCheck: Date): Date;
		vrGetFirstDayOfWeekByDate(dateToCheck: Date): Date;
		vrDifferenceBetweenDatesInMinutes(firstDate: Date, secondDate: Date): number;
		vrIsValidDate(date: any): boolean;
		vrConvertDateFromClient(dateFromClient?: Date | null): Date;
		vrConvertDateFromServer(dateFromServer: Date): Date;
		vrArePeriodsOverlapped(startA: Date, endA: Date, startB: Date, endB: Date, equal?: boolean): boolean;
		vrToWebApiDateTime(date: Date): any;
		vrGetDaysInMonth(date: Date): number;
		vrDifferenceBetweenDatesInDays(firstDate: Date, secondDate: Date): number;
		MIN_VALUE: Date;
		MAX_VALUE: Date;
	}

	interface Date
	{
		vrToItalyString(mode?: DateModeEnum, showSeconds?: boolean): string;
		vrFormatString(options: Intl.DateTimeFormatOptions, language?: string[] | string): string;
		vrToLongDateString(): string;
		vrAddYears(years: number): Date;
		vrAddMonths(months: number): Date;
		vrAddDays(days: number): Date;
		vrAddHours(hours: number): Date;
		vrAddMinutes(minutes: number): Date;
		vrAddSeconds(seconds: number): Date;
		vrIsLessThan(date: Date, equals?: boolean, checkTime?: boolean): boolean;
		vrIsGreaterThan(date: Date, equals?: boolean, checkTime?: boolean): boolean;
		vrIsEqualsTo(date: Date, checkTime?: boolean): boolean;
		vrIsBetween(firstDate: Date, secondDate: Date): boolean;
	}

	interface Number
	{
		vrToNumberString(formatSettings?: NumberFormatSettings): string;
		vrToCurrencyString(formatSettings?: NumberFormatSettings): string;
		vrToPercentageString(formatSettings?: NumberFormatSettings): string;
		vrRound(decimals: number): number;
		vrFormatNumber(formatSettings: NumberFormatSettings): string;
	}

	interface String
	{
		vrCapitalize(): string;
		vrCamelCase(exceptFirst?: boolean): string;
		vrKebabCase(): string;
		vrSnakeCase(): string;
		vrSwapCase(): string;
		vrTitleCase(): string;
		vrTrunc(index: number, useWordBoundary?: boolean): string;
		vrGetNumericPart(): number;
		vrToBoolean(): boolean;
		vrIsNotNullOrEmpty(): boolean;
		vrIsNullOrEmpty(): boolean;
		vrRemoveHtml(): string;
	}

	interface ArrayConstructor
	{
		vrEquals(array1: any[], array2: any[]): boolean;
	}

	interface Array<T>
	{
		vrFirst(): T;
		vrLast(): T;
		vrDelete(value: any): void;
		vrDeleteItem(item: any, key: string): void;
		vrDeleteAllBy<U>(callbackfn?: (value: T, index: number, array: T[]) => U, thisArg?: any): void;
		vrToNumberArrayList(): number[];
		vrToStringArrayList(): string[];
		vrToCommaSeparatedList(): string;
		vrPushRange(arrayToAdd: any[]): void;
		vrAny<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): boolean;
		vrSum<U>(callbackfn?: (value: T, index: number, array: T[]) => U, thisArg?: any): number;
		vrMax<U>(callbackfn?: (value: T, index: number, array: T[]) => U, thisArg?: any): number;
		vrMin<U>(callbackfn?: (value: T, index: number, array: T[]) => U, thisArg?: any): number;
		vrAvg<U>(callbackfn?: (value: T, index: number, array: T[]) => U, thisArg?: any): number;
		vrDistinct(): T[];
		vrDistinctBy<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): T[];
		vrSortAsc(...properties: string[]): any[];
		vrSortDesc(...properties: string[]): any[];
		vrSortBy(properties: string[], ascending?: boolean): any[];
		vrGroupBy<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): any[];
		vrGroupByProperty(property: string): any[];
	}

	interface JQuery
	{
		vrDrag(element?: HTMLElement | string | JQuery): void;
		vrVisible(state?: boolean): boolean;
		vrAppendToPuma(element: any): JQuery;
		vrPrependToPuma(element: any): JQuery;
		vrAppendPuma(element: any): JQuery;
		vrPrependPuma(element: any): JQuery;
		vrAfterPuma(element: any): JQuery;
		vrBeforePuma(element: any): JQuery;
		vrInsertAfterPuma(element: any): JQuery;
		vrInsertBeforePuma(element: any): JQuery;
		vrHasScrollBar(horizontal?: boolean): boolean;
	}
}

Date.MIN_VALUE = new Date(-8640000000000000);
Date.MAX_VALUE = new Date(8640000000000000);

Date.vrFixDateString = function (dateString?: Date | null): Date
{
	if (dateString != null && !(Object.prototype.toString.call(dateString) === '[object Date]'))
	{
		let tempDateString = dateString.toString();
		let dateSplitted = tempDateString.split(/[^0-9]/).vrToNumberArrayList();
		let date = new Date(dateSplitted[0], dateSplitted[1] - 1, dateSplitted[2], dateSplitted[3], dateSplitted[4], dateSplitted[5]);
		dateString = new Date(date.toString());
	}
	return dateString!;
}

Date.vrEquals = function (firstDate: Date, secondDate: Date): boolean
{
	return firstDate.getTime() === secondDate.getTime();
}

Date.vrGetFirstDayOfMonthByDate = function (dateToCheck: Date): Date
{
	let date = new Date(dateToCheck);
	return new Date(date.getFullYear(), date.getMonth(), 1);
}

Date.vrGetLastDayOfMonthByDate = function (dateToCheck: Date): Date
{
	let date = new Date(dateToCheck);
	return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

Date.vrGetFirstDayOfWeekByDate = function (dateToCheck: Date): Date
{
	let date = new Date(dateToCheck);
	let day = date.getDay(),
		diff = date.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
	return new Date(date.setDate(diff));
}

Date.vrDifferenceBetweenDatesInMinutes = function (firstDate: Date, secondDate: Date): number
{
	firstDate = Date.vrFixDateString(firstDate);
	secondDate = Date.vrFixDateString(secondDate);

	let difference = firstDate.getTime() - secondDate.getTime();
	let secondsDifference = difference / 1000;
	return Math.abs(secondsDifference / 60);
}

Date.vrIsValidDate = function (date: Date)
{
	return date != null && date instanceof Date && !isNaN(date.getTime()) && date.getTime() != new Date(0, 0, 0).getTime();
}

Date.vrGetDaysInMonth = function (date: Date): number
{
	return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

Date.vrToWebApiDateTime = function (date: Date)
{
	if (date != null)
	{
		date = Date.vrFixDateString(date);
		if (Date.vrIsValidDate(date))
		{
			return {
				day: date!.getDate(),
				month: date!.getMonth() + 1,
				year: date!.getFullYear(),
				hours: date!.getHours(),
				minutes: date!.getMinutes(),
				seconds: date!.getSeconds(),
				milliSeconds: date!.getMilliseconds()
			}
		}
	}
	return null;
}

Date.prototype.vrToItalyString = function (mode?: DateModeEnum, showSeconds = false): string
{
	let dateOptions: any = {};
	switch (mode)
	{
		case DateModeEnum.Date:
			{
				dateOptions = {
					year: 'numeric',
					month: '2-digit',
					day: '2-digit',
					hour12: false
				}
			}
			break;
		case DateModeEnum.LongWeekDate:
			{
				dateOptions = {
					weekday: 'long',
					year: 'numeric',
					month: '2-digit',
					day: '2-digit',
					hour12: false
				}
			}
			break;
		case DateModeEnum.ShortWeekDate:
			{
				dateOptions = {
					weekday: 'short',
					year: 'numeric',
					month: '2-digit',
					day: '2-digit',
					hour12: false
				}
			}
			break;
		case DateModeEnum.LongDate:
			{
				dateOptions = {
					weekday: 'long',
					year: 'numeric',
					month: 'long',
					day: '2-digit',
					hour12: false
				}
			}
			break;
		case DateModeEnum.DateTime:
			{
				dateOptions = {
					year: 'numeric',
					month: '2-digit',
					day: '2-digit',
					hour: "2-digit",
					minute: "2-digit",
					hour12: false
				}

				if (showSeconds)
					dateOptions.second = "2-digit";
			}
			break;
		case DateModeEnum.LongDateTime:
			{
				dateOptions = {
					weekday: 'long',
					year: 'numeric',
					month: '2-digit',
					day: '2-digit',
					hour: "2-digit",
					minute: "2-digit",
					hour12: false
				}

				if (showSeconds)
					dateOptions.second = "2-digit";
			}
			break;
		case DateModeEnum.Time:
			{
				dateOptions = {
					hour: "2-digit",
					minute: "2-digit",
					hour12: false
				}

				if (showSeconds)
					dateOptions.second = "2-digit";
			}
			break;
	}
	return this.vrFormatString(dateOptions, "it");
}

Date.prototype.vrFormatString = function (options: Intl.DateTimeFormatOptions, language?: string[] | string): string
{
	let dateFormatter = new Intl.DateTimeFormat((language == null) ? navigator.language : language, options);
	let dateString = dateFormatter.format(this).vrCapitalize();
	return dateString;
}

Date.prototype.vrToLongDateString = function ()
{
	let dateOptions: any = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: '2-digit',
		hour12: false
	}
	let dateFormatter = new Intl.DateTimeFormat(/*navigator.language*/"it", dateOptions);
	return dateFormatter.format(this).vrCapitalize();
}

Date.vrArePeriodsOverlapped = function (startA: Date, endA: Date, startB: Date, endB: Date, equal = false)
{
	return (!equal) ? (startA.getTime() < endB.getTime() && endA.getTime() > startB.getTime()) : (startA.getTime() <= endB.getTime() && endA.getTime() >= startB.getTime());
}

Date.prototype.vrAddYears = function (years: number): Date
{
	let date: Date = new Date(this.valueOf());
	date.setFullYear(date.getFullYear() + years);
	return date;
}

Date.prototype.vrAddMonths = function (months: number): Date
{
	let february = new Date(this.getFullYear(), 1, 1);
	let februaryDays = Date.vrGetDaysInMonth(february);

	let date: Date = new Date(this.valueOf());
	let newMonth = date.getMonth() + months;
	if (newMonth == 1 && date.getDate() > februaryDays) // February
		date.setDate(februaryDays);

	date.setMonth(newMonth);
	return date;
}

Date.prototype.vrAddDays = function (days: number): Date
{
	let date: Date = new Date(this.valueOf());
	date.setDate(date.getDate() + days);
	return date;
}

Date.prototype.vrAddHours = function (hours: number): Date
{
	this.setTime(this.getTime() + (hours * 60 * 60 * 1000));
	return this;
}

Date.prototype.vrAddMinutes = function (minutes: number): Date
{
	this.setTime(this.getTime() + (minutes * 60 * 1000));
	return this;
}

Date.prototype.vrAddSeconds = function (seconds: number): Date
{
	this.setTime(this.getTime() + (seconds * 1000));
	return this;
}

Date.prototype.vrIsLessThan = function (date: Date, equals = false, checkTime = true): boolean
{
	if (!checkTime)
	{
		this.setHours(0, 0, 0, 0);
		date.setHours(0, 0, 0, 0);
	}

	if (equals)
		return (this.getTime() <= date.getTime());
	else
		return (this.getTime() < date.getTime());
}

Date.prototype.vrIsGreaterThan = function (date: Date, equals = false, checkTime = true): boolean
{
	if (!checkTime)
	{
		this.setHours(0, 0, 0, 0);
		date.setHours(0, 0, 0, 0);
	}

	if (equals)
		return (this.getTime() >= date.getTime());
	else
		return (this.getTime() > date.getTime());
}

Date.prototype.vrIsEqualsTo = function (date: Date, checkTime = true): boolean
{
	if (!checkTime)
	{
		this.setHours(0, 0, 0, 0);
		date.setHours(0, 0, 0, 0);
	}

	return (this.getTime() == date.getTime());
}

Date.prototype.vrIsBetween = function (firstDate: Date, secondDate: Date): boolean
{
	let millisecondsFirstDate = firstDate.getTime();
	let millisecondsSecondDate = secondDate.getTime();
	let millisecondsDateToCheck = this.getTime();

	if (millisecondsDateToCheck >= millisecondsFirstDate && millisecondsDateToCheck <= millisecondsSecondDate)
		return true;

	return false;
}

Date.vrDifferenceBetweenDatesInDays = function (firstDate: Date, secondDate: Date): number
{
	let first = this.vrFixDateString(firstDate);
	let second = this.vrFixDateString(secondDate);

	let difference = first.getTime() - second.getTime();
	let secondsDifference = difference / 1000;
	return Math.abs(secondsDifference / 60 / 60 / 24);
}

Date.vrConvertDateFromClient = function (dateFromClient?: Date | null): Date
{
	if (dateFromClient != null)
	{
		dateFromClient = Date.vrFixDateString(dateFromClient);
		let dateConverted = new Date(Date.UTC(dateFromClient.getFullYear(), dateFromClient.getMonth(), dateFromClient.getDate(), dateFromClient.getHours(), dateFromClient.getMinutes(), dateFromClient.getSeconds()));
		return dateConverted;
	}
	else
		return dateFromClient!;
}

Date.vrConvertDateFromServer = function (dateFromServer: Date): Date
{
	if (dateFromServer != null)
	{
		dateFromServer = Date.vrFixDateString(dateFromServer);
		let dateConverted = new Date(dateFromServer.getUTCFullYear(), dateFromServer.getUTCMonth(), dateFromServer.getUTCDate(), dateFromServer.getUTCHours(), dateFromServer.getUTCMinutes(), dateFromServer.getUTCSeconds());
		return dateConverted;
	}
	else
		return dateFromServer;
}

Number.prototype.vrToNumberString = function (formatSettings?: NumberFormatSettings): string
{
	if (formatSettings == null) formatSettings = new NumberFormatSettings();
	formatSettings.style = NumberStyleEnum.Default;
	return this.vrFormatNumber(formatSettings);
}

Number.prototype.vrToCurrencyString = function (formatSettings?: NumberFormatSettings): string
{
	if (formatSettings == null) formatSettings = new NumberFormatSettings();
	formatSettings.style = NumberStyleEnum.Currency;
	if (formatSettings.minimumFractionDigits == null) formatSettings.minimumFractionDigits = 2;
	if (formatSettings.maximumFractionDigits == null) formatSettings.maximumFractionDigits = 2;
	return this.vrFormatNumber(formatSettings);
}

Number.prototype.vrToPercentageString = function (formatSettings?: NumberFormatSettings): string
{
	if (formatSettings == null) formatSettings = new NumberFormatSettings();
	formatSettings.style = NumberStyleEnum.Percentage;
	if (formatSettings.minimumFractionDigits == null) formatSettings.minimumFractionDigits = 2;
	if (formatSettings.maximumFractionDigits == null) formatSettings.maximumFractionDigits = 2;
	return this.vrFormatNumber(formatSettings);
}

Number.prototype.vrFormatNumber = function (format?: NumberFormatSettings)
{
	if (format == null) format = new NumberFormatSettings();
	if (format.style == null) format.style = NumberStyleEnum.Default;
	if (format.currency == null) format.currency = "EUR";
	if (format.useGrouping == null) format.useGrouping = GroupingModeEnum.Auto;

	if (format.roundingMode == null) format.roundingMode = RoundingModeEnum.HalfAwayFromZero;
	if (format.roundingMode == RoundingModeEnum.None)
	{
		format.roundingMode = RoundingModeEnum.Default;
		if (format.maximumFractionDigits == null)
			format.maximumFractionDigits = 8;
	}

	const formatter = new Intl.NumberFormat("it-IT"/*navigator.language*/, format as any);
	return formatter.format(Number(this));
}

Number.prototype.vrRound = function (decimals: number): number
{
	let pow = Math.pow(10, decimals);
	return Math.round((this as number) * pow) / pow;
}

String.prototype.vrCapitalize = function ()
{
	return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
}

String.prototype.vrCamelCase = function (exceptFirst?: boolean)
{
	if (exceptFirst == null) exceptFirst = false;

	let words = this.split(" ");
	for (let word of words)
		word.vrCapitalize();

	let stringToReturn = words.toString().replace(",", "");
	if (exceptFirst)
		stringToReturn = stringToReturn[0].toLowerCase() + stringToReturn.substr(1);

	return stringToReturn;
}

String.prototype.vrKebabCase = function (this)
{
	if (this.length == 0)
		return "";

	return this
		.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)!
		.map(x => x.toLowerCase())
		.join('-');
}

String.prototype.vrSnakeCase = function (this)
{
	if (this.length == 0)
		return "";

	return this
		.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)!
		.map(x => x.toLowerCase())
		.join('_');
}

String.prototype.vrSwapCase = function (this)
{
	var swapped = [];
	for (let i = 0; i < this.length; i++)
	{
		if (this != " ")
		{
			if (this[i] == this[i].toUpperCase())
				swapped.push(this[i].toLowerCase());
			else
				swapped.push(this[i].toUpperCase());
		}
	}
	return swapped.join("");
}

String.prototype.vrTitleCase = function (this)
{
	return this.replace(/\w\S*/g, (txt) => { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase() });
}

String.prototype.vrTrunc = function (index: number, useWordBoundary?: boolean)
{
	if (useWordBoundary == null) useWordBoundary = true;

	if (this.length <= index) { return this.valueOf(); }
	var subString = this.substr(0, index - 1);
	return (useWordBoundary
		? subString.substr(0, subString.lastIndexOf(' '))
		: subString) + "&hellip;";
};

String.prototype.vrGetNumericPart = function (this)
{
	let number = 0;
	if (this.length > 0)
		number = Number(this.match(/[\d\.\-]+/))

	return number;
}

String.prototype.vrToBoolean = function (this)
{
	return (this.toLowerCase() === "true");
}

String.prototype.vrIsNotNullOrEmpty = function (this)
{
	return this != null && this != "";
}

String.prototype.vrIsNullOrEmpty = function (this)
{
	return this == null || this == "";
}

String.prototype.vrRemoveHtml = function (this)
{
	return this.replace(/<\/?[^>]+(>|$)/g, "");
}

Array.prototype.vrFirst = function ()
{
	if (Array.isArray(this))
		return (this as any)[0];

	return null;
}

Array.prototype.vrLast = function ()
{
	if (Array.isArray(this))
		return this[this.length - 1];

	return null;
}

Array.prototype.vrToNumberArrayList = function ()
{
	if (Array.isArray(this))
		return this.map((value) => { return Number(value) });

	return [];
}

Array.prototype.vrToStringArrayList = function ()
{
	if (Array.isArray(this))
		return this.map((value) => { return String(value) });

	return [];
}

Array.prototype.vrToCommaSeparatedList = function ()
{
	if (Array.isArray(this))
	{
		let result = "";
		for (let item of this)
			result += item.toString() + ", ";

		return result.substring(0, result.length - 2);
	}
	else
		return "";
}

Array.prototype.vrPushRange = function (arrayToAdd: any[])
{
	if (Array.isArray(this))
	{
		for (let element of arrayToAdd)
			this.push(element);
	}
}

Array.prototype.vrDelete = function (value: any)
{
	if (Array.isArray(this))
	{
		let index = this.indexOf(value);
		if (index != -1)
			this.splice(index, 1);
	}
}

Array.prototype.vrDeleteItem = function (item: any, key: string)
{
	if (Array.isArray(this))
	{
		let index = this.map(k => k[key]).indexOf(item[key]);
		if (index != -1)
			this.splice(index, 1);
	}
}

Array.prototype.vrDeleteAllBy = function (callbackfn: (value: any, index: number, array: any[]) => any)
{
	if (Array.isArray(this))
	{
		let itemToDeleteList = this.filter(callbackfn);
		for (let itemToDelete of itemToDeleteList)
		{
			if (itemToDelete != null)
				this.vrDelete(itemToDelete);
		}
	}
}

function dynamicSort(property: string)
{
	var sortOrder = 1;
	if (property[0] === "-")
	{
		sortOrder = -1;
		property = property.substr(1);
	}

	return function (a: any, b: any)
	{
		let aProperty = a[property];
		let bProperty = b[property];

		if (typeof (aProperty) == "string")
			aProperty = aProperty.toLowerCase();

		if (typeof (bProperty) == "string")
			bProperty = bProperty.toLowerCase();

		var result = (aProperty < bProperty) ? -1 : (aProperty > bProperty) ? 1 : 0;

		//#region Manage Empty & Null
		if ((typeof (aProperty) == "string" && aProperty == "") || (typeof (bProperty) == "string" && bProperty == ""))
			result = (aProperty == "") ? 1 : -1;

		if (aProperty == null || bProperty == null)
			result = (sortOrder == 1) ? ((aProperty == null) ? 1 : -1) : ((aProperty == null) ? -1 : 1);
		//#endregion

		return result * sortOrder;
	}
}

function dynamicSortMultiple()
{
	var props = arguments;
	return function (obj1: any, obj2: any)
	{
		var i = 0, result = 0, numberOfProperties = props.length;
		while (result === 0 && i < numberOfProperties)
		{
			result = dynamicSort(props[i])(obj1, obj2);
			i++;
		}
		return result;
	}
}

Array.prototype.vrSortBy = function (properties: string[], ascending?: boolean)
{
	if (Array.isArray(this))
	{
		if (properties != null && properties.length > 0)
		{
			if (ascending != null && !ascending)
				properties = properties.map(k => { return (!k.startsWith("-")) ? "-" + k : k });

			this.sort(dynamicSortMultiple.apply(null, properties as any));
		}
		else
			internalSortWithoutProperties(this, (ascending == null) ? true : ascending);
	}
	return this;
}

Array.prototype.vrSortAsc = function (...properties: string[])
{
	return this.vrSortBy(properties, true);
}

Array.prototype.vrSortDesc = function (...properties: string[])
{
	return this.vrSortBy(properties, false);
}

function internalSortWithoutProperties(array: any[], ascending: boolean)
{
	array.sort((a: any, b: any) => 
	{
		if (ascending)
		{
			if (typeof (a) == "number")
			{
				const diff = a - b;
				if (diff)
					return diff;
			}
			else if (typeof (a) == "string")
			{
				// Try to catch date
				let tryDate = new Date(a);
				if (!isNaN(tryDate.getTime()))
					return new Date(a).getTime() - new Date(b).getTime();
				else
					return a.localeCompare(b);
			}
			else if (Object.prototype.toString.call(a) === '[object Date]')
				return new Date(a).getTime() - new Date(b).getTime();

			return 0;
		}
		else
		{
			if (typeof (b) == "number")
			{
				const diff = b - a;
				if (diff)
					return diff;
			}
			else if (typeof (b) == "string")
			{
				// Try to catch date
				let tryDate = new Date(b);
				if (!isNaN(tryDate.getTime()))
					return new Date(b).getTime() - new Date(a).getTime();
				else
					return b.localeCompare(a);
			}
			else if (Object.prototype.toString.call(b) === '[object Date]')
				return new Date(b).getTime() - new Date(a).getTime();

			return 0;
		}
	});
}

Array.prototype.vrAny = function (callbackfn: (value: any, index: number, array: any[]) => any)
{
	if (Array.isArray(this))
		return this.some(callbackfn);

	return false;
}

Array.prototype.vrMax = function (callbackfn?: (value: any, index: number, array: any[]) => any)
{
	if (Array.isArray(this))
	{
		if (callbackfn != null)
		{
			let property = callbackfn.toString().split(".")[1];
			return this.reduce((oa, u) => Math.max(oa, u[property]), 0);
		}
		else
			return Math.max.apply(null, this);
	}

	return 0;
};

Array.prototype.vrMin = function (callbackfn?: (value: any, index: number, array: any[]) => any)
{
	if (Array.isArray(this))
	{
		if (callbackfn != null)
		{
			let property = callbackfn.toString().split(".")[1];
			return this.reduce((oa, u) => Math.min(oa, u[property]), Number.MAX_VALUE);
		}
		else
			return Math.min.apply(null, this);
	}

	return 0;
};

Array.prototype.vrSum = function (callbackfn?: (value: any, index: number, array: any[]) => any)
{
	if (Array.isArray(this))
	{
		if (callbackfn == null)
			return this.reduce((ty, u) => ty + u, 0);
		else
		{
			let property = callbackfn.toString().split("=>")[1];
			let sum: number = 0;
			this.forEach(k => sum += eval(property));
			return sum;
		}
	}

	return 0;
}

Array.prototype.vrAvg = function (callbackfn?: (value: any, index: number, array: any[]) => any)
{
	if (Array.isArray(this))
	{
		if (callbackfn == null)
			return this.vrSum() / this.length;
		else
		{
			let sum = this.vrSum(callbackfn);
			return sum / this.length;
		}
	}

	return 0;
}

Array.prototype.vrDistinct = function (this)
{
	if (Array.isArray(this))
		return [...new Set(this)];

	return [];
}

Array.prototype.vrDistinctBy = function (callbackfn: (value: any, index: number, array: any[]) => any)
{
	if (Array.isArray(this))
	{
		let arrayResult: any[] = [];
		let arrayMap = new Map();
		let property = callbackfn.toString().split(".")[1];

		for (let item of this)
		{
			let value: any;
			for (let key in item)
			{
				if (key == property)
					value = item[key];
			}

			if (!arrayMap.has(value))
			{
				arrayMap.set(value, true);
				arrayResult.push(item);
			}
		}
		return arrayResult;
	}
	return [];
}

/** Deprecated */
Array.prototype.vrGroupBy = function (callbackfn: (value: any, index: number, array: any[]) => any)
{
	if (Array.isArray(this))
	{
		let property = callbackfn.toString().split(".")[1];
		if (!callbackfn.toString().includes("."))
			property = callbackfn.toString().split("[")[1].replace("]", "");

		return this.reduce(function (groups, item)
		{
			const val = item[property];
			groups[val] = groups[val] || [];
			groups[val].push(item);
			return groups;
		}, {});
	}
	return [];
}

Array.prototype.vrGroupByProperty = function (property: string)
{
	if (Array.isArray(this))
	{
		return this.reduce(function (groups, item)
		{
			const val = item[property];
			groups[val] = groups[val] || [];
			groups[val].push(item);
			return groups;
		}, {});
	}
	return [];
}

Array.vrEquals = function (array1: any[], array2: any[]): boolean
{
	if (Array.isArray(array1) && Array.isArray(array2))
	{
		let array1Length = array1.length;

		if (array1 == null || array2 == null) return false;
		if (array1Length != array2.length) return false;

		let arr1 = array1.concat().sort();
		let arr2 = array2.concat().sort();

		for (let i = 0; i < arr1.length; ++i)
		{
			if (arr1[i] !== arr2[i])
				return false;
		}
		return true;
	}
	return false;
}

jQuery.prototype.vrDrag = function (element?: HTMLElement | string | JQuery, onStart?: (e: { event: any, left: number, top: number }) => void, onEnd?: (e: { event: any, left: number, top: number }) => void)
{
	this.mousedown((emd: JQuery.MouseDownEvent) =>
	{
		let startingXPosition = emd.clientX;
		let startingYPosition = emd.clientY;
		let diffX = emd.clientX - puma((this as any)[0]).offset().left;
		let diffY = emd.clientY - puma((this as any)[0]).offset().top;

		if (diffX <= 5 && diffY <= 5)
			return;

		// Moving
		puma(document).mousemove((emm: JQuery.MouseMoveEvent) => 
		{
			if (!(emm.clientX == startingXPosition && emm.clientY == startingYPosition))
			{
				let elementToDrag: JQuery = this;
				if (element != null)
					elementToDrag = puma(element);

				if (onStart != null)
				{
					let onStartEvent = new WindowEvent() as any;
					onStartEvent.event = emm;
					onStartEvent.left = emm.clientX - diffX;
					onStartEvent.top = emm.clientY;
					onStart(onStartEvent);

					if (onStartEvent.isDefaultPrevented())
					{
						puma(document).unbind("mouseup");
						puma(document).unbind("mousemove");
						emm.preventDefault();
						return;
					}
				}
				elementToDrag.offset({ top: emm.clientY, left: (emm.clientX - diffX) });
			}
		});

		// Stop moving
		puma(document).mouseup((emm: JQuery.MouseUpEvent) =>
		{
			puma(document).unbind("mouseup");
			puma(document).unbind("mousemove");

			if (onEnd != null)
			{
				let onEndEvent: any = {};
				onEndEvent.event = emm;
				onEndEvent.left = emm.clientX - (puma((this as any)[0]).width() / 2);
				onEndEvent.top = emm.clientY;
				onEnd(onEndEvent);
			}
		});
	});
}

jQuery.prototype.vrVisible = function (state?: boolean)
{
	if (state != null)
	{
		if (state) this.show();
		else this.hide();
	}
	return this.is(":visible");
}

var _shadowRoot2: ShadowRoot | null | undefined = null;
var _jqueryVariable: any = jQuery;

jQuery.prototype.vrAppendToPuma = function (element: any)
{
	let container = puma(element);
	return this.appendTo(container);
}

jQuery.prototype.vrPrependToPuma = function (element: any)
{
	let container = puma(element);
	return this.prependTo(container);
}

jQuery.prototype.vrAppendPuma = function (element: any)
{
	let toCreate = puma(element);
	return this.append(toCreate);
}

jQuery.prototype.vrPrependPuma = function (element: any)
{
	let toCreate = puma(element);
	return this.prepend(toCreate);
}

jQuery.prototype.vrBeforePuma = function (element: any)
{
	let elementJq = puma(element);
	return this.before(elementJq);
}

jQuery.prototype.vrAfterPuma = function (element: any)
{
	let elementJq = puma(element);
	return this.after(elementJq);
}

jQuery.prototype.vrInsertBeforePuma = function (element: any)
{
	let elementJq = puma(element);
	return this.insertBefore(elementJq);
}

jQuery.prototype.vrInsertAfterPuma = function (element: any)
{
	let elementJq = puma(element);
	return this.insertAfter(elementJq);
}

jQuery.prototype.vrHasScrollBar = function (horizontal: boolean = false): boolean
{
	if (this.get(0) == null)
		return false;

	if (!horizontal)
		return this.get(0).scrollHeight > this.get(0).clientHeight;
	else
		return this.get(0).scrollWidth > this.get(0).clientWidth;
}

export function puma(element: any)
{
	return (shadowRoot() != null && jqueryVariable()(element).length == 0) ? jqueryVariable()(shadowRoot()).find(element) : jqueryVariable()(element);
}
//#endregion