import { LabelOptions, Label } from "./controls/label";
import { TextBoxOptions, TextBox, TextBoxNumeric, TextBoxPercentage, TextBoxCurrency, TextBoxPassword, TextBoxMultiline } from "./controls/textbox";
import { CheckBoxOptions, CheckBox, CheckBoxCheckEvent } from "./controls/checkbox";
import { SeparatorOptions, Separator } from "./controls/separator";
import { ButtonGroup, ButtonGroupClickEvent, ButtonGroupIconClickEvent, ButtonGroupOptions } from "./controls/buttonGroup";
import { ImageOptions, Image } from "./controls/image";
import { DatePickerOptions, DatePicker, TimePicker, DateTimePicker, MonthPicker, YearPicker } from "./controls/datePicker";
import { ComboBoxOptions, ComboBox, DropDown } from "./controls/comboBox";
import { SplitButtonOptions, SplitButton, SplitButtonItem } from "./controls/splitButton";
import { Editor, EditorItemClickEvent, EditorOptions } from "./controls/editor";
import { WindowOptions, Window } from "./controls/window";
import { ConfirmOptions } from "./controls/confirm";
import { AlertOptions } from "./controls/alert";
import { Dialog, DialogOptions } from "./controls/dialog";
import { Grid, GridOptions, GridHeaderSettings, GridCellSettings, GridCustomSettings, GridIconSettings, GridImageSettings, GridLabelSettings, GridTemplateEvent, GridToolbarDeleteRequest, GridToolbarSwitchSettings, GridToolbarClickEvent, GridControlsSettings, GridExcelRow } from "./controls/grid";
import { PromptOptions } from "./controls/prompt";
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
import { PrintFileOptions, PrintHtmlOptions } from "../../src/managers/printManager";
import { TabStrip, TabStripOptions } from "./controls/tabStrip";
import { Tooltip, TooltipOptions } from "./controls/tooltip";
import { SpeechRecognizer, SpeechRecognizerAudioEndEvent, SpeechRecognizerAudioStartEvent, SpeechRecognizerClickEvent, SpeechRecognizerEndEvent, SpeechRecognizerErrorEvent, SpeechRecognizerNoMatchEvent, SpeechRecognizerResultEvent, SpeechRecognizerSoundEndEvent, SpeechRecognizerSoundStartEvent, SpeechRecognizerSpeechEndEvent, SpeechRecognizerSpeechStartEvent, SpeechRecognizerStartEvent } from "./controls/speechRecognizer";
import { Div, DivOptions } from "./controls/div";
import { Button, ButtonOptions } from "./controls/button";
import { Legend, LegendOptions } from "./controls/legend";
import { Menu, MenuOnClickEvent, MenuOptions } from "./controls/menu";
export declare function createLabel(options?: LabelOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): Label;
export declare function createButton(options?: ButtonOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): Button;
export declare function createButtonGroup(options?: ButtonGroupOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): ButtonGroup;
export declare function createTextBox(options?: TextBoxOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): TextBox;
export declare function createNumericTextBox(options?: TextBoxOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): TextBoxNumeric;
export declare function createPercentageTextBox(options?: TextBoxOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): TextBoxPercentage;
export declare function createCurrencyTextBox(options?: TextBoxOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): TextBoxCurrency;
export declare function createPasswordTextBox(options?: TextBoxOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): TextBoxPassword;
export declare function createMultilineTextBox(options?: TextBoxOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): TextBoxMultiline;
export declare function createCheckBox(options?: CheckBoxOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): CheckBox;
export declare function createSeparator(options?: SeparatorOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): Separator;
export declare function createImage(options?: ImageOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): Image;
export declare function createDatePicker(options?: DatePickerOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): DatePicker;
export declare function createTimePicker(options?: DatePickerOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): TimePicker;
export declare function createDateTimePicker(options?: DatePickerOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): DateTimePicker;
export declare function createMonthPicker(options?: DatePickerOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): MonthPicker;
export declare function createYearPicker(options?: DatePickerOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): YearPicker;
export declare function createComboBox(options?: ComboBoxOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): ComboBox;
export declare function createDropDown(options?: ComboBoxOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): DropDown;
export declare function createSplitButton(options?: SplitButtonOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): SplitButton;
export declare function createMenu(options?: MenuOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): Menu;
export declare function createEditor(options?: EditorOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): Editor;
export declare function createWindow(options?: WindowOptions | null, container?: HTMLElement | JQuery | string | null): Window;
export declare function createGrid(options?: GridOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): Grid;
export declare function createSwitch(options?: SwitchOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): Switch;
export declare function createCheckBoxList(options?: CheckBoxListOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): CheckBoxList;
export declare function createRadioButton(options?: RadioButtonOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): RadioButton;
export declare function createRadioButtonList(options?: RadioButtonListOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): RadioButtonList;
export declare function createRepeater(options?: RepeaterOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): Repeater;
export declare function createMap(options?: MapsOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): Maps;
export declare function createPainter(options?: PainterOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): Painter;
export declare function createCalendar(options?: CalendarOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): Calendar;
export declare function createRating(options?: RatingOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): Rating;
export declare function createGroupBox(options?: GroupBoxOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): GroupBox;
export declare function createPdfViewer(options?: PdfViewerOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): PdfViewer;
export declare function createPaypalButton(options?: PaypalButtonOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): PaypalButton;
export declare function createUpload(options?: UploadOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): Upload;
export declare function createTreeView(options?: TreeViewOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): TreeView;
export declare function createScheduler(options?: SchedulerOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): Scheduler;
export declare function createMultiScheduler(options?: MultiSchedulerOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): MultiScheduler;
export declare function createQrCode(options?: QrCodeOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): QrCode;
export declare function createIcon(options?: IconOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): Icon;
export declare function createColorPicker(options?: ColorPickerOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): ColorPicker;
export declare function createSearchBar(options?: SearchBarOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): SearchBar;
export declare function createSplitter(options?: SplitterOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): Splitter;
export declare function createAutoCompleteBox(options?: AutoCompleteBoxOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): AutoCompleteBox;
export declare function createChart(options?: ChartOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): ChartVr;
export declare function createBarChart(options?: ChartOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): BarChart;
export declare function createHorizontalBarChart(options?: ChartOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): HorizontalBarChart;
export declare function createLineChart(options?: ChartOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): LineChart;
export declare function createDonutChart(options?: ChartOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): DonutChart;
export declare function createPieChart(options?: ChartOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): PieChart;
export declare function createAreaChart(options?: ChartOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): AreaChart;
export declare function createStackedBarChart(options?: ChartOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): StackedBarChart;
export declare function createTabStrip(options?: TabStripOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): TabStrip;
export declare function createTooltip(options?: TooltipOptions | null): Tooltip;
export declare function createSpeechRecognizer(options?: SpeechRecognizerOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): SpeechRecognizer;
export declare function createLegend(options?: LegendOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): Legend;
export declare function getControl<T extends VrControl>(controlId: string): T;
export declare function addControl(control: VrControl): void;
export declare enum ControlTypeEnum {
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
    Menu = "Menu",
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
export declare enum ControlPositionEnum {
    Before = 0,
    After = 1,
    None = 2
}
export declare function hideNotify(): void;
export declare function notify(text: string, options?: NotifierOptions): Notifier;
export declare function notifyError(text: string, options?: NotifierOptions | null): Notifier;
export declare function notifyWarning(text: string, options?: NotifierOptions | null): Notifier;
export declare function notifySuccess(text: string, options?: NotifierOptions | null): Notifier;
export declare function notifyInfo(text: string, options?: NotifierOptions | null): Notifier;
export declare function confirm(text?: string | null, options?: ConfirmOptions | null): Promise<any>;
export declare function alert(text?: string | null, options?: AlertOptions | null): Promise<any>;
export declare function dialog(text?: string | null, options?: DialogOptions | null): Dialog;
export declare function prompt(text?: string | null, options?: PromptOptions | null): Promise<any>;
export declare function printElement(element: string | HTMLElement | JQuery, options?: PrintHtmlOptions): void;
export declare function printHtml(elementId: string, options?: PrintFileOptions): void;
export declare function printBytes(base64Bytes: string, options?: PrintFileOptions): void;
export declare function printPdf(path: string, options?: PrintFileOptions): void;
export declare function printImage(path: string, options?: PrintFileOptions): void;
export declare function isSmartphone(): boolean;
export declare function isTablet(): boolean;
export declare function isDesktop(): boolean;
export declare function isMobile(): any;
export declare function isIphoneX(): boolean;
export declare function isIphone(): RegExpMatchArray | null;
export declare function browser(): BrowserTypeEnum | "Unknown";
export declare function isInternetExplorer(): boolean;
export declare function isSafari(): boolean;
export declare function isChrome(): boolean;
export declare function isFirefox(): boolean;
export declare function isEdge(): boolean;
export declare function isOpera(): boolean;
export declare function isVivaldi(): boolean;
export declare function isSeamonkey(): boolean;
export declare enum BrowserTypeEnum {
    InternetExplorer = "InternetExplorer",
    Safari = "Safari",
    Chrome = "Chrome",
    Firefox = "Firefox",
    Edge = "Edge",
    Opera = "Opera",
    Vivaldi = "Vivaldi",
    Seamonkey = "Seamonkey"
}
export declare function createDiv(options?: DivOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null): Div;
export declare function div(container?: string | HTMLElement | JQuery, settings?: DivSettings, prepend?: boolean): HTMLElement;
declare class DivSettings {
    class?: string;
    id?: string;
    content?: string;
    css?: string;
    tooltip?: string;
    attributes?: AttributeSettings[];
}
export declare function span(container?: string | HTMLElement | JQuery, settings?: SpanSettings, prepend?: boolean): HTMLElement;
declare class SpanSettings {
    class?: string;
    id?: string;
    content?: string;
    css?: string;
    tooltip?: string;
    attributes?: AttributeSettings[];
}
export declare function icon(iconClass: IconClass, container?: string | HTMLElement | JQuery | null, settings?: IconSettings | null, prepend?: boolean): HTMLElement;
export declare class IconSettings {
    fontSize?: string | number;
    css?: string;
    id?: string;
    color?: string;
    class?: string;
    cursor?: string;
    position?: PositionEnum;
}
export declare function iframe(container: string | HTMLElement | JQuery, settings?: VrIframeSettings): HTMLIFrameElement;
declare class VrIframeSettings {
    content?: string;
    loader?: boolean | HTMLElement | JQuery | string;
    callback?: Function;
    width?: number | string;
    height?: number | string;
    css?: string;
    attributes?: AttributeSettings[];
}
export declare function br(container: string | HTMLElement | JQuery, count?: number): void;
export declare function hr(container: string | HTMLElement | JQuery, css?: string, id?: string): HTMLElement;
export declare function guid(): string;
export declare class VrMarginSettings {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
}
export declare function showLoader(element?: string | HTMLElement | JQuery | boolean, transparency?: boolean, tag?: any | null, text?: string | null): void;
export declare function hideLoader(tag?: any): void;
export declare function pumo(): void;
export declare enum CreatorEnum {
    MatteoPumo = "MatteoPumo",
    MatteoPumoSite = "https://www.matteopumo.com",
    MatteoPumoMail = "info@matteopumo.com",
    VettoreRinascimento = "VettoreRinascimento",
    VettoreMedical = "VettoreMedical",
    Year2020 = "Year2020",
    PureJqueryTypescript = "PureJqueryTypescript",
    FastestControlsEver = "FastestControlsEver"
}
export type IconClass = IconClassicSolid | IconClassicLight | IconClassicRegular | IconClassicDuotone | IconClassicThin | IconClassicBrands | IconSharpSolid | IconSharpLight | IconSharpRegular | IconSharpDuotone | IconSharpThin | string;
export declare enum IconClassicBrands {
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
    Youtube = "fa-brands fa-youtube"
}
export declare enum IconClassicSolid {
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
    ArrowsRepeat = "fa-solid fa-arrows-repeat",
    ArrowsRotate = "fa-solid fa-arrows-rotate",
    ArrowUp = "fa-solid fa-arrow-up",
    Asterisk = "fa-solid fa-asterisk",
    At = "fa-solid fa-at",
    Attachment = "fa-solid fa-paperclip",
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
    Bomb = "fa-solid fa-bomb",
    Book = "fa-solid fa-book",
    BookOpen = "fa-solid fa-book-open",
    Box = "fa-solid fa-box",
    BoxArchive = "fa-solid fa-box-archive",
    BriefCase = "fa-solid fa-brief-case",
    Bug = "fa-solid fa-bug",
    Burger = "fa-solid fa-bars",
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
    CircleSmall = "fa-solid fa-circle-small",
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
    Database = "fa-solid fa-database",
    Delete = "fa-solid fa-xmark",
    DeleteLeft = "fa-solid fa-delete-left",
    DeleteRight = "fa-solid fa-delete-right",
    Desktop = "fa-solid fa-desktop",
    Download = "fa-solid fa-download",
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
    Gear = "fa-solid fa-gear",
    Gears = "fa-solid fa-gears",
    Globe = "fa-solid fa-globe",
    Hashtag = "fa-solid fa-hashtag",
    HatWizard = "fa-solid fa-hat-wizard",
    Headset = "fa-solid fa-headset",
    Hospital = "fa-solid fa-hospital",
    Hourglass = "fa-solid fa-hourglass",
    HourglassClock = "fa-solid fa-hourglass-clock",
    House = "fa-solid fa-house",
    HouseMedical = "fa-solid fa-house-medical",
    HouseUser = "fa-solid fa-house-user",
    Image = "fa-solid fa-image",
    Inbox = "fa-solid fa-inbox",
    InboxFull = "fa-solid fa-inbox-full",
    Info = "fa-solid fa-info",
    Key = "fa-solid fa-key",
    Keyboard = "fa-solid fa-keyboard",
    KeySkeleton = "fa-solid fa-key-skeleton",
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
    NewsPaper = "fa-solid fa-newspaper",
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
    Period = "fa-solid fa-period",
    PersonChalkboard = "fa-solid fa-person-chalkboard",
    PersonMilitaryRifle = "fa-solid fa-person-military-rifle",
    Phone = "fa-solid fa-phone",
    Play = "fa-solid fa-play",
    PlayPause = "fa-solid fa-play-pause",
    Plus = "fa-solid fa-plus",
    Print = "fa-solid fa-print",
    Pumo = "fa-solid fa-font-awesome",
    Question = "fa-solid fa-question",
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
    Video = "fa-solid fa-video",
    VideoSlash = "fa-solid fa-video-slash",
    Volume = "fa-solid fa-volume",
    VolumeHigh = "fa-solid fa-volume-high",
    VolumeLow = "fa-solid fa-volume-low",
    VolumeOff = "fa-solid fa-volume-off",
    VolumeSlash = "fa-solid fa-volume-slash",
    VolumeXmark = "fa-solid fa-volume-xmark",
    Wifi = "fa-solid fa-wifi",
    WifiExclamation = "fa-solid fa-wifi-exclamation",
    WifiFair = "fa-solid fa-wifi-fair",
    WifiSlash = "fa-solid fa-wifi-slash",
    Window = "fa-solid fa-window",
    Xmark = "fa-solid fa-xmark"
}
export declare enum IconClassicLight {
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
    ArrowsRepeat = "fa-light fa-arrows-repeat",
    ArrowsRotate = "fa-light fa-arrows-rotate",
    ArrowsSpin = "fa-light fa-arrows-spin",
    ArrowUp = "fa-light fa-arrow-up",
    Asterisk = "fa-light fa-asterisk",
    At = "fa-light fa-at",
    Attachment = "fa-light fa-paperclip",
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
    BedEmpty = "fa-light fa-bed-empty",
    Bell = "fa-light fa-bell",
    BellSlash = "fa-light fa-bell-slash",
    BlockQuote = "fa-light fa-block-quote",
    Bolt = "fa-light fa-bolt",
    Bomb = "fa-light fa-bomb",
    Book = "fa-light fa-book",
    BookOpen = "fa-light fa-book-open",
    Box = "fa-light fa-box",
    BoxArchive = "fa-light fa-box-archive",
    BriefCase = "fa-light fa-brief-case",
    Bug = "fa-light fa-bug",
    Burger = "fa-light fa-bars",
    CakeCandles = "fa-light fa-cake-candles",
    Calendar = "fa-light fa-calendar",
    CalendarAlt = "fa-light fa-calendar-alt",
    CalendarCheck = "fa-light fa-calendar-check",
    CalendarDay = "fa-light fa-calendar-day",
    CalendarLinesPen = "fa-light fa-calendar-lines-pen",
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
    CircleSmall = "fa-light fa-circle-small",
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
    Database = "fa-light fa-database",
    Delete = "fa-light fa-xmark",
    DeleteLeft = "fa-light fa-delete-left",
    DeleteRight = "fa-light fa-delete-right",
    Desktop = "fa-light fa-desktop",
    Download = "fa-light fa-download",
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
    Gear = "fa-light fa-gear",
    Gears = "fa-light fa-gears",
    Globe = "fa-light fa-globe",
    Hashtag = "fa-light fa-hashtag",
    HatWizard = "fa-light fa-hat-wizard",
    Headset = "fa-light fa-headset",
    Hospital = "fa-light fa-hospital",
    Hourglass = "fa-light fa-hourglass",
    HourglassClock = "fa-light fa-hourglass-clock",
    House = "fa-light fa-house",
    HouseMedical = "fa-light fa-house-medical",
    HouseUser = "fa-light fa-house-user",
    Image = "fa-light fa-image",
    Inbox = "fa-light fa-inbox",
    InboxFull = "fa-light fa-inbox-full",
    Info = "fa-light fa-info",
    Key = "fa-light fa-key",
    Keyboard = "fa-light fa-keyboard",
    KeySkeleton = "fa-light fa-key-skeleton",
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
    LineColumns = "fa-light fa-line-columns",
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
    NewsPaper = "fa-light fa-newspaper",
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
    Period = "fa-light fa-period",
    PersonChalkboard = "fa-light fa-person-chalkboard",
    PersonMilitaryRifle = "fa-light fa-person-military-rifle",
    Phone = "fa-light fa-phone",
    Play = "fa-light fa-play",
    PlayPause = "fa-light fa-play-pause",
    Plus = "fa-light fa-plus",
    Print = "fa-light fa-print",
    Pumo = "fa-light fa-font-awesome",
    Question = "fa-light fa-question",
    Receipt = "fa-light fa-receipt",
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
    SquareQuote = "fa-light fa-square-quote",
    Stamp = "fa-light fa-stamp",
    Star = "fa-light fa-star",
    StepBackward = "fa-light fa-step-backward",
    StepForward = "fa-light fa-step-forward",
    Stethoscope = "fa-light fa-stethoscope",
    Stop = "fa-light fa-stop",
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
    UserPen = "fa-light fa-user-pen",
    Users = "fa-light fa-users",
    UserSecret = "fa-light fa-user-secret",
    UsersMedical = "fa-light fa-users-medical",
    UserTag = "fa-light fa-user-tag",
    UserXmark = "fa-light fa-user-xmark",
    Video = "fa-light fa-video",
    VideoSlash = "fa-light fa-video-slash",
    Volume = "fa-light fa-volume",
    VolumeHigh = "fa-light fa-volume-high",
    VolumeLow = "fa-light fa-volume-low",
    VolumeOff = "fa-light fa-volume-off",
    VolumeSlash = "fa-light fa-volume-slash",
    VolumeXmark = "fa-light fa-volume-xmark",
    Wifi = "fa-light fa-wifi",
    WifiExclamation = "fa-light fa-wifi-exclamation",
    WifiFair = "fa-light fa-wifi-fair",
    WifiSlash = "fa-light fa-wifi-slash",
    Window = "fa-light fa-window",
    Xmark = "fa-light fa-xmark"
}
export declare enum IconClassicRegular {
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
    ArrowsRepeat = "fa-regular fa-arrows-repeat",
    ArrowsRotate = "fa-regular fa-arrows-rotate",
    ArrowUp = "fa-regular fa-arrow-up",
    Asterisk = "fa-regular fa-asterisk",
    At = "fa-regular fa-at",
    Attachment = "fa-regular fa-paperclip",
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
    Bomb = "fa-regular fa-bomb",
    Book = "fa-regular fa-book",
    BookOpen = "fa-regular fa-book-open",
    Box = "fa-regular fa-box",
    BoxArchive = "fa-regular fa-box-archive",
    BriefCase = "fa-regular fa-brief-case",
    Bug = "fa-regular fa-bug",
    Burger = "fa-regular fa-bars",
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
    CircleSmall = "fa-regular fa-circle-small",
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
    Database = "fa-regular fa-database",
    Delete = "fa-regular fa-xmark",
    DeleteLeft = "fa-regular fa-delete-left",
    DeleteRight = "fa-regular fa-delete-right",
    Desktop = "fa-regular fa-desktop",
    Download = "fa-regular fa-download",
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
    Gear = "fa-regular fa-gear",
    Gears = "fa-regular fa-gears",
    Globe = "fa-regular fa-globe",
    Hashtag = "fa-regular fa-hashtag",
    HatWizard = "fa-regular fa-hat-wizard",
    Headset = "fa-regular fa-headset",
    Hospital = "fa-regular fa-hospital",
    Hourglass = "fa-regular fa-hourglass",
    HourglassClock = "fa-regular fa-hourglass-clock",
    House = "fa-regular fa-house",
    HouseMedical = "fa-regular fa-house-medical",
    HouseUser = "fa-regular fa-house-user",
    Image = "fa-regular fa-image",
    Inbox = "fa-regular fa-inbox",
    InboxFull = "fa-regular fa-inbox-full",
    Info = "fa-regular fa-info",
    Key = "fa-regular fa-key",
    Keyboard = "fa-regular fa-keyboard",
    KeySkeleton = "fa-regular fa-key-skeleton",
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
    NewsPaper = "fa-regular fa-newspaper",
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
    Period = "fa-regular fa-period",
    PersonChalkboard = "fa-regular fa-person-chalkboard",
    PersonMilitaryRifle = "fa-regular fa-person-military-rifle",
    Phone = "fa-regular fa-phone",
    Play = "fa-regular fa-play",
    PlayPause = "fa-regular fa-play-pause",
    Plus = "fa-regular fa-plus",
    Print = "fa-regular fa-print",
    Pumo = "fa-regular fa-font-awesome",
    Question = "fa-regular fa-question",
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
    Video = "fa-regular fa-video",
    VideoSlash = "fa-regular fa-video-slash",
    Volume = "fa-regular fa-volume",
    VolumeHigh = "fa-regular fa-volume-high",
    VolumeLow = "fa-regular fa-volume-low",
    VolumeOff = "fa-regular fa-volume-off",
    VolumeSlash = "fa-regular fa-volume-slash",
    VolumeXmark = "fa-regular fa-volume-xmark",
    Wifi = "fa-regular fa-wifi",
    WifiExclamation = "fa-regular fa-wifi-exclamation",
    WifiFair = "fa-regular fa-wifi-fair",
    WifiSlash = "fa-regular fa-wifi-slash",
    Window = "fa-regular fa-window",
    Xmark = "fa-regular fa-xmark"
}
export declare enum IconClassicDuotone {
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
    ArrowsRepeat = "fa-duotone fa-arrows-repeat",
    ArrowsRotate = "fa-duotone fa-arrows-rotate",
    ArrowUp = "fa-duotone fa-arrow-up",
    Asterisk = "fa-duotone fa-asterisk",
    At = "fa-duotone fa-at",
    Attachment = "fa-duotone fa-paperclip",
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
    Bomb = "fa-duotone fa-bomb",
    Book = "fa-duotone fa-book",
    BookOpen = "fa-duotone fa-book-open",
    Box = "fa-duotone fa-box",
    BoxArchive = "fa-duotone fa-box-archive",
    BriefCase = "fa-duotone fa-brief-case",
    Bug = "fa-duotone fa-bug",
    Burger = "fa-duotone fa-bars",
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
    CircleSmall = "fa-duotone fa-circle-small",
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
    Database = "fa-duotone fa-database",
    Delete = "fa-duotone fa-xmark",
    DeleteLeft = "fa-duotone fa-delete-left",
    DeleteRight = "fa-duotone fa-delete-right",
    Desktop = "fa-duotone fa-desktop",
    Download = "fa-duotone fa-download",
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
    Gear = "fa-duotone fa-gear",
    Gears = "fa-duotone fa-gears",
    Globe = "fa-duotone fa-globe",
    Hashtag = "fa-duotone fa-hashtag",
    HatWizard = "fa-duotone fa-hat-wizard",
    Headset = "fa-duotone fa-headset",
    Hospital = "fa-duotone fa-hospital",
    Hourglass = "fa-duotone fa-hourglass",
    HourglassClock = "fa-duotone fa-hourglass-clock",
    House = "fa-duotone fa-house",
    HouseMedical = "fa-duotone fa-house-medical",
    HouseUser = "fa-duotone fa-house-user",
    Image = "fa-duotone fa-image",
    Inbox = "fa-duotone fa-inbox",
    InboxFull = "fa-duotone fa-inbox-full",
    Info = "fa-duotone fa-info",
    Key = "fa-duotone fa-key",
    Keyboard = "fa-duotone fa-keyboard",
    KeySkeleton = "fa-duotone fa-key-skeleton",
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
    NewsPaper = "fa-duotone fa-newspaper",
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
    Period = "fa-duotone fa-period",
    PersonChalkboard = "fa-duotone fa-person-chalkboard",
    PersonMilitaryRifle = "fa-duotone fa-person-military-rifle",
    Phone = "fa-duotone fa-phone",
    Play = "fa-duotone fa-play",
    PlayPause = "fa-duotone fa-play-pause",
    Plus = "fa-duotone fa-plus",
    Print = "fa-duotone fa-print",
    Pumo = "fa-duotone fa-font-awesome",
    Question = "fa-duotone fa-question",
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
    Video = "fa-duotone fa-video",
    VideoSlash = "fa-duotone fa-video-slash",
    Volume = "fa-duotone fa-volume",
    VolumeHigh = "fa-duotone fa-volume-high",
    VolumeLow = "fa-duotone fa-volume-low",
    VolumeOff = "fa-duotone fa-volume-off",
    VolumeSlash = "fa-duotone fa-volume-slash",
    VolumeXmark = "fa-duotone fa-volume-xmark",
    Wifi = "fa-duotone fa-wifi",
    WifiExclamation = "fa-duotone fa-wifi-exclamation",
    WifiFair = "fa-duotone fa-wifi-fair",
    WifiSlash = "fa-duotone fa-wifi-slash",
    Window = "fa-duotone fa-window",
    Xmark = "fa-duotone fa-xmark"
}
export declare enum IconClassicThin {
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
    ArrowsRepeat = "fa-thin fa-arrows-repeat",
    ArrowsRotate = "fa-thin fa-arrows-rotate",
    ArrowUp = "fa-thin fa-arrow-up",
    Asterisk = "fa-thin fa-asterisk",
    At = "fa-thin fa-at",
    Attachment = "fa-thin fa-paperclip",
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
    Bomb = "fa-thin fa-bomb",
    Book = "fa-thin fa-book",
    BookOpen = "fa-thin fa-book-open",
    Box = "fa-thin fa-box",
    BoxArchive = "fa-thin fa-box-archive",
    BriefCase = "fa-thin fa-brief-case",
    Bug = "fa-thin fa-bug",
    Burger = "fa-thin fa-bars",
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
    CircleSmall = "fa-thin fa-circle-small",
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
    Database = "fa-thin fa-database",
    Delete = "fa-thin fa-xmark",
    DeleteLeft = "fa-thin fa-delete-left",
    DeleteRight = "fa-thin fa-delete-right",
    Desktop = "fa-thin fa-desktop",
    Download = "fa-thin fa-download",
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
    Gear = "fa-thin fa-gear",
    Gears = "fa-thin fa-gears",
    Globe = "fa-thin fa-globe",
    Hashtag = "fa-thin fa-hashtag",
    HatWizard = "fa-thin fa-hat-wizard",
    Headset = "fa-thin fa-headset",
    Hospital = "fa-thin fa-hospital",
    Hourglass = "fa-thin fa-hourglass",
    HourglassClock = "fa-thin fa-hourglass-clock",
    House = "fa-thin fa-house",
    HouseMedical = "fa-thin fa-house-medical",
    HouseUser = "fa-thin fa-house-user",
    Image = "fa-thin fa-image",
    Inbox = "fa-thin fa-inbox",
    InboxFull = "fa-thin fa-inbox-full",
    Info = "fa-thin fa-info",
    Key = "fa-thin fa-key",
    Keyboard = "fa-thin fa-keyboard",
    KeySkeleton = "fa-thin fa-key-skeleton",
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
    NewsPaper = "fa-thin fa-newspaper",
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
    Period = "fa-thin fa-period",
    PersonChalkboard = "fa-thin fa-person-chalkboard",
    PersonMilitaryRifle = "fa-thin fa-person-military-rifle",
    Phone = "fa-thin fa-phone",
    Play = "fa-thin fa-play",
    PlayPause = "fa-thin fa-play-pause",
    Plus = "fa-thin fa-plus",
    Print = "fa-thin fa-print",
    Pumo = "fa-thin fa-font-awesome",
    Question = "fa-thin fa-question",
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
    Video = "fa-thin fa-video",
    VideoSlash = "fa-thin fa-video-slash",
    Volume = "fa-thin fa-volume",
    VolumeHigh = "fa-thin fa-volume-high",
    VolumeLow = "fa-thin fa-volume-low",
    VolumeOff = "fa-thin fa-volume-off",
    VolumeSlash = "fa-thin fa-volume-slash",
    VolumeXmark = "fa-thin fa-volume-xmark",
    Wifi = "fa-thin fa-wifi",
    WifiExclamation = "fa-thin fa-wifi-exclamation",
    WifiFair = "fa-thin fa-wifi-fair",
    WifiSlash = "fa-thin fa-wifi-slash",
    Window = "fa-thin fa-window",
    Xmark = "fa-thin fa-xmark"
}
export declare enum IconSharpSolid {
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
    ArrowsRepeat = "fa-sharp fa-solid fa-arrows-repeat",
    ArrowsRotate = "fa-sharp fa-solid fa-arrows-rotate",
    ArrowUp = "fa-sharp fa-solid fa-arrow-up",
    Asterisk = "fa-sharp fa-solid fa-asterisk",
    At = "fa-sharp fa-solid fa-at",
    Attachment = "fa-sharp fa-solid fa-paperclip",
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
    Bomb = "fa-sharp fa-solid fa-bomb",
    Book = "fa-sharp fa-solid fa-book",
    BookOpen = "fa-sharp fa-solid fa-book-open",
    Box = "fa-sharp fa-solid fa-box",
    BoxArchive = "fa-sharp fa-solid fa-box-archive",
    BriefCase = "fa-sharp fa-solid fa-brief-case",
    Bug = "fa-sharp fa-solid fa-bug",
    Burger = "fa-sharp fa-solid fa-bars",
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
    CircleSmall = "fa-sharp fa-solid fa-circle-small",
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
    Database = "fa-sharp fa-solid fa-database",
    Delete = "fa-sharp fa-solid fa-xmark",
    DeleteLeft = "fa-sharp fa-solid fa-delete-left",
    DeleteRight = "fa-sharp fa-solid fa-delete-right",
    Desktop = "fa-sharp fa-solid fa-desktop",
    Download = "fa-sharp fa-solid fa-download",
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
    Gear = "fa-sharp fa-solid fa-gear",
    Gears = "fa-sharp fa-solid fa-gears",
    Globe = "fa-sharp fa-solid fa-globe",
    Hashtag = "fa-sharp fa-solid fa-hashtag",
    HatWizard = "fa-sharp fa-solid fa-hat-wizard",
    Headset = "fa-sharp fa-solid fa-headset",
    Hospital = "fa-sharp fa-solid fa-hospital",
    Hourglass = "fa-sharp fa-solid fa-hourglass",
    HourglassClock = "fa-sharp fa-solid fa-hourglass-clock",
    House = "fa-sharp fa-solid fa-house",
    HouseMedical = "fa-sharp fa-solid fa-house-medical",
    HouseUser = "fa-sharp fa-solid fa-house-user",
    Image = "fa-sharp fa-solid fa-image",
    Inbox = "fa-sharp fa-solid fa-inbox",
    InboxFull = "fa-sharp fa-solid fa-inbox-full",
    Info = "fa-sharp fa-solid fa-info",
    Key = "fa-sharp fa-solid fa-key",
    Keyboard = "fa-sharp fa-solid fa-keyboard",
    KeySkeleton = "fa-sharp fa-solid fa-key-skeleton",
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
    NewsPaper = "fa-sharp fa-solid fa-newspaper",
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
    Period = "fa-sharp fa-solid fa-period",
    PersonChalkboard = "fa-sharp fa-solid fa-person-chalkboard",
    PersonMilitaryRifle = "fa-sharp fa-solid fa-person-military-rifle",
    Phone = "fa-sharp fa-solid fa-phone",
    Play = "fa-sharp fa-solid fa-play",
    PlayPause = "fa-sharp fa-solid fa-play-pause",
    Plus = "fa-sharp fa-solid fa-plus",
    Print = "fa-sharp fa-solid fa-print",
    Pumo = "fa-sharp fa-solid fa-font-awesome",
    Question = "fa-sharp fa-solid fa-question",
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
    Video = "fa-sharp fa-solid fa-video",
    VideoSlash = "fa-sharp fa-solid fa-video-slash",
    Volume = "fa-sharp fa-solid fa-volume",
    VolumeHigh = "fa-sharp fa-solid fa-volume-high",
    VolumeLow = "fa-sharp fa-solid fa-volume-low",
    VolumeOff = "fa-sharp fa-solid fa-volume-off",
    VolumeSlash = "fa-sharp fa-solid fa-volume-slash",
    VolumeXmark = "fa-sharp fa-solid fa-volume-xmark",
    Wifi = "fa-sharp fa-solid fa-wifi",
    WifiExclamation = "fa-sharp fa-solid fa-wifi-exclamation",
    WifiFair = "fa-sharp fa-solid fa-wifi-fair",
    WifiSlash = "fa-sharp fa-solid fa-wifi-slash",
    Window = "fa-sharp fa-solid fa-window",
    Xmark = "fa-sharp fa-solid fa-xmark"
}
export declare enum IconSharpLight {
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
    ArrowsRepeat = "fa-sharp fa-light fa-arrows-repeat",
    ArrowsRotate = "fa-sharp fa-light fa-arrows-rotate",
    ArrowUp = "fa-sharp fa-light fa-arrow-up",
    Asterisk = "fa-sharp fa-light fa-asterisk",
    At = "fa-sharp fa-light fa-at",
    Attachment = "fa-sharp fa-light fa-paperclip",
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
    Bomb = "fa-sharp fa-light fa-bomb",
    Book = "fa-sharp fa-light fa-book",
    BookOpen = "fa-sharp fa-light fa-book-open",
    Box = "fa-sharp fa-light fa-box",
    BoxArchive = "fa-sharp fa-light fa-box-archive",
    BriefCase = "fa-sharp fa-light fa-brief-case",
    Bug = "fa-sharp fa-light fa-bug",
    Burger = "fa-sharp fa-light fa-bars",
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
    CircleSmall = "fa-sharp fa-light fa-circle-small",
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
    Database = "fa-sharp fa-light fa-database",
    Delete = "fa-sharp fa-light fa-xmark",
    DeleteLeft = "fa-sharp fa-light fa-delete-left",
    DeleteRight = "fa-sharp fa-light fa-delete-right",
    Desktop = "fa-sharp fa-light fa-desktop",
    Download = "fa-sharp fa-light fa-download",
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
    Gear = "fa-sharp fa-light fa-gear",
    Gears = "fa-sharp fa-light fa-gears",
    Globe = "fa-sharp fa-light fa-globe",
    Hashtag = "fa-sharp fa-light fa-hashtag",
    HatWizard = "fa-sharp fa-light fa-hat-wizard",
    Headset = "fa-sharp fa-light fa-headset",
    Hospital = "fa-sharp fa-light fa-hospital",
    Hourglass = "fa-sharp fa-light fa-hourglass",
    HourglassClock = "fa-sharp fa-light fa-hourglass-clock",
    House = "fa-sharp fa-light fa-house",
    HouseMedical = "fa-sharp fa-light fa-house-medical",
    HouseUser = "fa-sharp fa-light fa-house-user",
    Image = "fa-sharp fa-light fa-image",
    Inbox = "fa-sharp fa-light fa-inbox",
    InboxFull = "fa-sharp fa-light fa-inbox-full",
    Info = "fa-sharp fa-light fa-info",
    Key = "fa-sharp fa-light fa-key",
    Keyboard = "fa-sharp fa-light fa-keyboard",
    KeySkeleton = "fa-sharp fa-light fa-key-skeleton",
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
    NewsPaper = "fa-sharp fa-light fa-newspaper",
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
    Period = "fa-sharp fa-light fa-period",
    PersonChalkboard = "fa-sharp fa-light fa-person-chalkboard",
    PersonMilitaryRifle = "fa-sharp fa-light fa-person-military-rifle",
    Phone = "fa-sharp fa-light fa-phone",
    Play = "fa-sharp fa-light fa-play",
    PlayPause = "fa-sharp fa-light fa-play-pause",
    Plus = "fa-sharp fa-light fa-plus",
    Print = "fa-sharp fa-light fa-print",
    Pumo = "fa-sharp fa-light fa-font-awesome",
    Question = "fa-sharp fa-light fa-question",
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
    Video = "fa-sharp fa-light fa-video",
    VideoSlash = "fa-sharp fa-light fa-video-slash",
    Volume = "fa-sharp fa-light fa-volume",
    VolumeHigh = "fa-sharp fa-light fa-volume-high",
    VolumeLow = "fa-sharp fa-light fa-volume-low",
    VolumeOff = "fa-sharp fa-light fa-volume-off",
    VolumeSlash = "fa-sharp fa-light fa-volume-slash",
    VolumeXmark = "fa-sharp fa-light fa-volume-xmark",
    Wifi = "fa-sharp fa-light fa-wifi",
    WifiExclamation = "fa-sharp fa-light fa-wifi-exclamation",
    WifiFair = "fa-sharp fa-light fa-wifi-fair",
    WifiSlash = "fa-sharp fa-light fa-wifi-slash",
    Window = "fa-sharp fa-light fa-window",
    Xmark = "fa-sharp fa-light fa-xmark"
}
export declare enum IconSharpRegular {
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
    ArrowsRepeat = "fa-sharp fa-regular fa-arrows-repeat",
    ArrowsRotate = "fa-sharp fa-regular fa-arrows-rotate",
    ArrowUp = "fa-sharp fa-regular fa-arrow-up",
    Asterisk = "fa-sharp fa-regular fa-asterisk",
    At = "fa-sharp fa-regular fa-at",
    Attachment = "fa-sharp fa-regular fa-paperclip",
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
    Bomb = "fa-sharp fa-regular fa-bomb",
    Book = "fa-sharp fa-regular fa-book",
    BookOpen = "fa-sharp fa-regular fa-book-open",
    Box = "fa-sharp fa-regular fa-box",
    BoxArchive = "fa-sharp fa-regular fa-box-archive",
    BriefCase = "fa-sharp fa-regular fa-brief-case",
    Bug = "fa-sharp fa-regular fa-bug",
    Burger = "fa-sharp fa-regular fa-bars",
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
    CircleSmall = "fa-sharp fa-regular fa-circle-small",
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
    Database = "fa-sharp fa-regular fa-database",
    Delete = "fa-sharp fa-regular fa-xmark",
    DeleteLeft = "fa-sharp fa-regular fa-delete-left",
    DeleteRight = "fa-sharp fa-regular fa-delete-right",
    Desktop = "fa-sharp fa-regular fa-desktop",
    Download = "fa-sharp fa-regular fa-download",
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
    Gear = "fa-sharp fa-regular fa-gear",
    Gears = "fa-sharp fa-regular fa-gears",
    Globe = "fa-sharp fa-regular fa-globe",
    Hashtag = "fa-sharp fa-regular fa-hashtag",
    HatWizard = "fa-sharp fa-regular fa-hat-wizard",
    Headset = "fa-sharp fa-regular fa-headset",
    Hospital = "fa-sharp fa-regular fa-hospital",
    Hourglass = "fa-sharp fa-regular fa-hourglass",
    HourglassClock = "fa-sharp fa-regular fa-hourglass-clock",
    House = "fa-sharp fa-regular fa-house",
    HouseMedical = "fa-sharp fa-regular fa-house-medical",
    HouseUser = "fa-sharp fa-regular fa-house-user",
    Image = "fa-sharp fa-regular fa-image",
    Inbox = "fa-sharp fa-regular fa-inbox",
    InboxFull = "fa-sharp fa-regular fa-inbox-full",
    Info = "fa-sharp fa-regular fa-info",
    Key = "fa-sharp fa-regular fa-key",
    Keyboard = "fa-sharp fa-regular fa-keyboard",
    KeySkeleton = "fa-sharp fa-regular fa-key-skeleton",
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
    NewsPaper = "fa-sharp fa-regular fa-newspaper",
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
    Period = "fa-sharp fa-regular fa-period",
    PersonChalkboard = "fa-sharp fa-regular fa-person-chalkboard",
    PersonMilitaryRifle = "fa-sharp fa-regular fa-person-military-rifle",
    Phone = "fa-sharp fa-regular fa-phone",
    Play = "fa-sharp fa-regular fa-play",
    PlayPause = "fa-sharp fa-regular fa-play-pause",
    Plus = "fa-sharp fa-regular fa-plus",
    Print = "fa-sharp fa-regular fa-print",
    Pumo = "fa-sharp fa-regular fa-font-awesome",
    Question = "fa-sharp fa-regular fa-question",
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
    Video = "fa-sharp fa-regular fa-video",
    VideoSlash = "fa-sharp fa-regular fa-video-slash",
    Volume = "fa-sharp fa-regular fa-volume",
    VolumeHigh = "fa-sharp fa-regular fa-volume-high",
    VolumeLow = "fa-sharp fa-regular fa-volume-low",
    VolumeOff = "fa-sharp fa-regular fa-volume-off",
    VolumeSlash = "fa-sharp fa-regular fa-volume-slash",
    VolumeXmark = "fa-sharp fa-regular fa-volume-xmark",
    Wifi = "fa-sharp fa-regular fa-wifi",
    WifiExclamation = "fa-sharp fa-regular fa-wifi-exclamation",
    WifiFair = "fa-sharp fa-regular fa-wifi-fair",
    WifiSlash = "fa-sharp fa-regular fa-wifi-slash",
    Window = "fa-sharp fa-regular fa-window",
    Xmark = "fa-sharp fa-regular fa-xmark"
}
export declare enum IconSharpDuotone {
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
    ArrowsRepeat = "fa-sharp fa-duotone fa-arrows-repeat",
    ArrowsRotate = "fa-sharp fa-duotone fa-arrows-rotate",
    ArrowUp = "fa-sharp fa-duotone fa-arrow-up",
    Asterisk = "fa-sharp fa-duotone fa-asterisk",
    At = "fa-sharp fa-duotone fa-at",
    Attachment = "fa-sharp fa-duotone fa-paperclip",
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
    Bomb = "fa-sharp fa-duotone fa-bomb",
    Book = "fa-sharp fa-duotone fa-book",
    BookOpen = "fa-sharp fa-duotone fa-book-open",
    Box = "fa-sharp fa-duotone fa-box",
    BoxArchive = "fa-sharp fa-duotone fa-box-archive",
    BriefCase = "fa-sharp fa-duotone fa-brief-case",
    Bug = "fa-sharp fa-duotone fa-bug",
    Burger = "fa-sharp fa-duotone fa-bars",
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
    CircleSmall = "fa-sharp fa-duotone fa-circle-small",
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
    Database = "fa-sharp fa-duotone fa-database",
    Delete = "fa-sharp fa-duotone fa-xmark",
    DeleteLeft = "fa-sharp fa-duotone fa-delete-left",
    DeleteRight = "fa-sharp fa-duotone fa-delete-right",
    Desktop = "fa-sharp fa-duotone fa-desktop",
    Download = "fa-sharp fa-duotone fa-download",
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
    Gear = "fa-sharp fa-duotone fa-gear",
    Gears = "fa-sharp fa-duotone fa-gears",
    Globe = "fa-sharp fa-duotone fa-globe",
    Hashtag = "fa-sharp fa-duotone fa-hashtag",
    HatWizard = "fa-sharp fa-duotone fa-hat-wizard",
    Headset = "fa-sharp fa-duotone fa-headset",
    Hospital = "fa-sharp fa-duotone fa-hospital",
    Hourglass = "fa-sharp fa-duotone fa-hourglass",
    HourglassClock = "fa-sharp fa-duotone fa-hourglass-clock",
    House = "fa-sharp fa-duotone fa-house",
    HouseMedical = "fa-sharp fa-duotone fa-house-medical",
    HouseUser = "fa-sharp fa-duotone fa-house-user",
    Image = "fa-sharp fa-duotone fa-image",
    Inbox = "fa-sharp fa-duotone fa-inbox",
    InboxFull = "fa-sharp fa-duotone fa-inbox-full",
    Info = "fa-sharp fa-duotone fa-info",
    Key = "fa-sharp fa-duotone fa-key",
    Keyboard = "fa-sharp fa-duotone fa-keyboard",
    KeySkeleton = "fa-sharp fa-duotone fa-key-skeleton",
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
    NewsPaper = "fa-sharp fa-duotone fa-newspaper",
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
    Period = "fa-sharp fa-duotone fa-period",
    PersonChalkboard = "fa-sharp fa-duotone fa-person-chalkboard",
    PersonMilitaryRifle = "fa-sharp fa-duotone fa-person-military-rifle",
    Phone = "fa-sharp fa-duotone fa-phone",
    Play = "fa-sharp fa-duotone fa-play",
    PlayPause = "fa-sharp fa-duotone fa-play-pause",
    Plus = "fa-sharp fa-duotone fa-plus",
    Print = "fa-sharp fa-duotone fa-print",
    Pumo = "fa-sharp fa-duotone fa-font-awesome",
    Question = "fa-sharp fa-duotone fa-question",
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
    Video = "fa-sharp fa-duotone fa-video",
    VideoSlash = "fa-sharp fa-duotone fa-video-slash",
    Volume = "fa-sharp fa-duotone fa-volume",
    VolumeHigh = "fa-sharp fa-duotone fa-volume-high",
    VolumeLow = "fa-sharp fa-duotone fa-volume-low",
    VolumeOff = "fa-sharp fa-duotone fa-volume-off",
    VolumeSlash = "fa-sharp fa-duotone fa-volume-slash",
    VolumeXmark = "fa-sharp fa-duotone fa-volume-xmark",
    Wifi = "fa-sharp fa-duotone fa-wifi",
    WifiExclamation = "fa-sharp fa-duotone fa-wifi-exclamation",
    WifiFair = "fa-sharp fa-duotone fa-wifi-fair",
    WifiSlash = "fa-sharp fa-duotone fa-wifi-slash",
    Window = "fa-sharp fa-duotone fa-window",
    Xmark = "fa-sharp fa-duotone fa-xmark"
}
export declare enum IconSharpThin {
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
    ArrowsRepeat = "fa-sharp fa-thin fa-arrows-repeat",
    ArrowsRotate = "fa-sharp fa-thin fa-arrows-rotate",
    ArrowUp = "fa-sharp fa-thin fa-arrow-up",
    Asterisk = "fa-sharp fa-thin fa-asterisk",
    At = "fa-sharp fa-thin fa-at",
    Attachment = "fa-sharp fa-thin fa-paperclip",
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
    Bomb = "fa-sharp fa-thin fa-bomb",
    Book = "fa-sharp fa-thin fa-book",
    BookOpen = "fa-sharp fa-thin fa-book-open",
    Box = "fa-sharp fa-thin fa-box",
    BoxArchive = "fa-sharp fa-thin fa-box-archive",
    BriefCase = "fa-sharp fa-thin fa-brief-case",
    Bug = "fa-sharp fa-thin fa-bug",
    Burger = "fa-sharp fa-thin fa-bars",
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
    CircleSmall = "fa-sharp fa-thin fa-circle-small",
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
    Database = "fa-sharp fa-thin fa-database",
    Delete = "fa-sharp fa-thin fa-xmark",
    DeleteLeft = "fa-sharp fa-thin fa-delete-left",
    DeleteRight = "fa-sharp fa-thin fa-delete-right",
    Desktop = "fa-sharp fa-thin fa-desktop",
    Download = "fa-sharp fa-thin fa-download",
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
    Gear = "fa-sharp fa-thin fa-gear",
    Gears = "fa-sharp fa-thin fa-gears",
    Globe = "fa-sharp fa-thin fa-globe",
    Hashtag = "fa-sharp fa-thin fa-hashtag",
    HatWizard = "fa-sharp fa-thin fa-hat-wizard",
    Headset = "fa-sharp fa-thin fa-headset",
    Hospital = "fa-sharp fa-thin fa-hospital",
    Hourglass = "fa-sharp fa-thin fa-hourglass",
    HourglassClock = "fa-sharp fa-thin fa-hourglass-clock",
    House = "fa-sharp fa-thin fa-house",
    HouseMedical = "fa-sharp fa-thin fa-house-medical",
    HouseUser = "fa-sharp fa-thin fa-house-user",
    Image = "fa-sharp fa-thin fa-image",
    Inbox = "fa-sharp fa-thin fa-inbox",
    InboxFull = "fa-sharp fa-thin fa-inbox-full",
    Info = "fa-sharp fa-thin fa-info",
    Key = "fa-sharp fa-thin fa-key",
    Keyboard = "fa-sharp fa-thin fa-keyboard",
    KeySkeleton = "fa-sharp fa-thin fa-key-skeleton",
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
    NewsPaper = "fa-sharp fa-thin fa-newspaper",
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
    Period = "fa-sharp fa-thin fa-period",
    PersonChalkboard = "fa-sharp fa-thin fa-person-chalkboard",
    PersonMilitaryRifle = "fa-sharp fa-thin fa-person-military-rifle",
    Phone = "fa-sharp fa-thin fa-phone",
    Play = "fa-sharp fa-thin fa-play",
    PlayPause = "fa-sharp fa-thin fa-play-pause",
    Plus = "fa-sharp fa-thin fa-plus",
    Print = "fa-sharp fa-thin fa-print",
    Pumo = "fa-sharp fa-thin fa-font-awesome",
    Question = "fa-sharp fa-thin fa-question",
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
    Video = "fa-sharp fa-thin fa-video",
    VideoSlash = "fa-sharp fa-thin fa-video-slash",
    Volume = "fa-sharp fa-thin fa-volume",
    VolumeHigh = "fa-sharp fa-thin fa-volume-high",
    VolumeLow = "fa-sharp fa-thin fa-volume-low",
    VolumeOff = "fa-sharp fa-thin fa-volume-off",
    VolumeSlash = "fa-sharp fa-thin fa-volume-slash",
    VolumeXmark = "fa-sharp fa-thin fa-volume-xmark",
    Wifi = "fa-sharp fa-thin fa-wifi",
    WifiExclamation = "fa-sharp fa-thin fa-wifi-exclamation",
    WifiFair = "fa-sharp fa-thin fa-wifi-fair",
    WifiSlash = "fa-sharp fa-thin fa-wifi-slash",
    Window = "fa-sharp fa-thin fa-window",
    Xmark = "fa-sharp fa-thin fa-xmark"
}
export declare enum PositionEnum {
    Left = 0,
    Top = 1,
    Right = 2,
    Bottom = 3
}
export declare enum OrientationEnum {
    Horizontal = 0,
    Vertical = 1
}
export declare class PopupSettings {
    width?: number | string;
    minWidth?: number | string;
    maxWidth?: number | string;
    height?: number | string;
    minHeight?: number | string;
    maxHeight?: number | string;
    right?: boolean;
    direction?: PopupDirectionEnum;
}
export declare enum PopupDirectionEnum {
    Auto = 0,
    Up = 1,
    Down = 2
}
export declare enum BorderStyleEnum {
    Dashed = "dashed",
    Dotted = "dotted",
    Double = "double",
    Hidden = "hidden",
    Solid = "solid",
    Groove = "groove",
    Ridge = "ridge"
}
export declare enum ButtonModeEnum {
    Default = "vrButtonDefaultMode",
    Primary = "vrButtonPrimaryMode",
    Delete = "vrButtonDeleteMode",
    Excel = "vrButtonExcelMode",
    Print = "vrButtonPrintMode",
    Warning = "vrButtonWarningMode"
}
export declare class ColorSettings {
    textColor?: string;
    background?: string;
    border?: string;
}
export declare class DivColorSettings {
    textColor?: string;
    background?: string;
}
export declare class DivBorderSpecificSettings {
    type?: string;
    size?: number;
    color?: string;
}
export declare class DivBorderSettings extends DivBorderSpecificSettings {
    top?: boolean | DivBorderSpecificSettings;
    right?: boolean | DivBorderSpecificSettings;
    bottom?: boolean | DivBorderSpecificSettings;
    left?: boolean | DivBorderSpecificSettings;
}
export declare enum SelectionModeEnum {
    Single = 0,
    Multiple = 1
}
export declare class ButtonGroupItem {
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
export declare class TabStripItem extends ButtonGroupItem {
    elementId?: string;
}
export declare enum RatingPrecisionEnum {
    Half = 0,
    Full = 1
}
export declare enum LabelModeEnum {
    Default = 0,
    Primary = 1,
    Error = 2,
    Phone = 3,
    Mail = 4,
    Link = 5,
    Currency = 6,
    Date = 7,
    Time = 8,
    DateTime = 9
}
export declare enum LabelUnderlineMode {
    Always = 0,
    None = 1,
    OnHover = 2
}
export declare enum TextAlignEnum {
    Left = "left",
    Center = "center",
    Right = "right",
    Justify = "justify"
}
export declare class TextBoxLengthSettings {
    substituteChar?: string;
    value: number;
}
export declare enum TextModeEnum {
    Text = 0,
    Link = 1,
    Phone = 2,
    Search = 3,
    Mail = 4,
    MultiLine = 5,
    Password = 6,
    PasswordViewable = 7,
    Numeric = 8,
    Percentage = 9,
    Currency = 10
}
export declare enum TextTransformModeEnum {
    Capitalize = "capitalize",
    Uppercase = "uppercase",
    Lowercase = "lowercase",
    Default = "none"
}
export declare enum TextBoxAutoCompleteEnum {
    On = "on",
    Off = "off",
    AddressLine1 = "address-line1",
    AddressLine2 = "address-line2",
    AddressLine3 = "address-line3",
    AddressLevel1 = "address-level1",
    AddressLevel2 = "address-level2",
    AddressLevel3 = "address-level3",
    AddressLevel4 = "address-level4",
    StreetAddress = "street-address",
    Country = "country",
    CountryName = "country-name",
    PostalCode = "postal-code",
    Name = "name",
    AdditionalName = "additional-name",
    FamilyName = "family-name",
    GiveName = "give-name",
    HonoricPrefix = "honoric-prefix",
    HonoricSuffix = "honoric-suffix",
    Nickname = "nickname",
    OrganizationTitle = "organization-title",
    Username = "username",
    NewPassword = "new-password",
    CurrentPassword = "current-password",
    Birthday = "bday",
    BirthdayDay = "bday-day",
    BirthdayMonth = "bday-month",
    BirthdayYear = "bday-year",
    Sex = "sex",
    OneTimeCode = "one-time-code",
    Organization = "organization",
    CcName = "cc-name",
    CcGivenName = "cc-given-name",
    CcAdditionalName = "cc-additional-name",
    CcFamilyName = "cc-family-name",
    CcNumber = "cc-number",
    CcExp = "cc-exp",
    CcExpMonth = "cc-exp-month",
    CcExpYear = "cc-exp-year",
    CcCsc = "cc-csc",
    CcType = "cc-type",
    TransactionCurrency = "transaction-currency",
    TransactionAmount = "transaction-amount",
    Language = "language",
    Url = "url",
    Email = "email",
    Photo = "photo",
    Tel = "tel",
    TelCountryCode = "tel-country-code",
    TelNational = "tel-national",
    TelAreaCode = "tel-area-code",
    TelLocal = "tel-local",
    TelLocalPrefix = "tel-local-prefix",
    TelLocalSuffix = "tel-local-suffix",
    TelExtension = "tel-extension",
    Impp = "impp"
}
export declare class TextBoxValidationSettings {
    minValue?: number;
    maxValue?: number;
    minLength?: number | TextBoxLengthSettings;
    maxLength?: number | TextBoxLengthSettings;
    regex?: string | TextBoxRegexSettings;
    error?: TextBoxValidationErrorEnum;
}
export declare class TextBoxRegexSettings {
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
export declare enum TextBoxValidationErrorEnum {
    Flashing = 0,
    Stable = 1,
    None = 2
}
export declare enum ErrorModeEnum {
    Tooltip = 0,
    Overlay = 1,
    Solid = 2
}
export declare enum ErrorPositionEnum {
    Right = 0,
    Bottom = 1
}
export declare enum ErrorHideModeEnum {
    OnFocus = 0,
    OnAction = 1,
    Never = 2
}
export declare enum PaypalEnvironmentEnum {
    Sandbox = "sandbox",
    Production = "production"
}
export declare enum PaypalStyleSizeEnum {
    Medium = "medium",
    Large = "large",
    Small = "small",
    Responsive = "responsive"
}
export declare enum PaypalStyleColorEnum {
    Gold = "gold",
    Blue = "blue",
    Silver = "silver",
    Black = "black"
}
export declare enum PaypalStyleShapeEnum {
    Rect = "rect",
    Pill = "pill"
}
export declare enum PaypalStyleLabelEnum {
    Checkout = "checkout",
    Credit = "credit",
    Pay = "pay",
    BuyNow = "buynow",
    Paypal = "paypal",
    Installment = "installment"
}
export declare enum PaypalStyleLayoutEnum {
    Vertical = "vertical",
    Horizontal = "horizontal"
}
export declare enum CheckboxStateEnum {
    Checked = 0,
    Unchecked = 1,
    Undefined = 2
}
export declare class CheckBoxItem {
    text?: string;
    value?: string | number;
    checked?: boolean;
    threeState?: boolean;
    tag?: any;
    onCheck?: (e: CheckBoxCheckEvent) => void;
}
export declare enum ImagePositionTypeEnum {
    Center = 0,
    Fit = 1,
    Fill = 2,
    Stretch = 3,
    Original = 4
}
export declare enum ImageToolbarTypeEnum {
    Download = 0,
    Delete = 1,
    Custom = 2
}
export declare enum DefaultDayEnum {
    First = 0,
    Last = 1
}
export declare enum ComboBoxTypeEnum {
    Combo = 0,
    DropDown = 1
}
export declare enum ComboBoxTreeModeEnum {
    AllExpanded = 0,
    OnlyFirstLevelExpanded = 1,
    AllCollapsed = 2
}
export declare class ComboBoxItem {
    text: string;
    value: any;
    icon?: IconClass;
    backgroundColor?: string;
    textColor?: string;
    whiteFont?: boolean;
    parentValue?: any;
    checked?: boolean;
}
export declare class ComboBoxWebServiceSettings {
    method: string;
    authKey?: string;
    itemsPropertyName?: string;
    typedTextPropertyName?: string;
    typedValuePropertyName?: string;
    searchAfterCharsNumber?: number;
    parameters?: () => any;
}
export declare class ComboBoxTemplateEvent {
    sender: ComboBox;
    dataItem: any;
    element: HTMLElement;
}
export declare class ComboBoxEvent extends VrControlsEvent {
    sender: ComboBox;
    value: any;
    text: string;
    childrenValues: string[];
    selectedItem?: ComboBoxItem;
    checked: boolean;
    isParent?: boolean;
}
export declare class ComboBoxChangeEvent extends ComboBoxEvent {
}
export declare class ComboBoxChangingEvent extends ComboBoxEvent {
    previousValue?: string | null;
    previousCheckedValues?: string[] | null;
}
export declare class ComboBoxClearEvent extends VrControlsEvent {
    sender: ComboBox;
}
export declare class SortByComboSettings {
    field: string;
    direction?: SortDirectionEnum;
}
export declare class MenuItem {
    text: string;
    value?: string | number;
    icon?: IconClass;
    parentValue?: string;
    url?: string;
    urlSettings?: MenuItemUrlSettings;
    tag?: string | number;
    onClick?: (e: MenuOnClickEvent) => void;
}
export declare class MenuItemUrlSettings {
    url: string;
    newTab?: boolean;
}
export declare class AutoCompleteBoxItem {
    text: string;
    value?: string;
    settings?: AutoCompleteBoxItemSettings;
}
export declare class AutoCompleteBoxItemSettings {
    backgroundColor?: string;
    textColor?: string;
    deleteIconColor?: string;
    border?: string;
    bold?: boolean;
    maxWidth?: number;
}
export declare class AutoCompleteBoxComboSettings {
    items?: ComboBoxItem[];
    freeText?: boolean;
    webService?: ComboBoxWebServiceSettings;
    template?: (e: any) => string;
    treeMode?: ComboBoxTreeModeEnum;
}
export declare enum ChartTypeEnum {
    Bar = "bar",
    HorizontalBar = "horizontalBar",
    Line = "line",
    Donut = "doughnut",
    Pie = "pie",
    Area = "area",
    StackedBar = "stackedBar"
}
export declare class ChartAreaSettings {
    target?: number | string | boolean | object;
    above?: string;
    below?: string;
}
export declare class ChartTitleSettings {
    align?: ChartTitleAlignEnum;
    color?: string;
    fullSize?: boolean;
    position?: ChartTitlePositionEnum;
    font?: ChartFont;
    padding?: number;
    text?: string;
}
export declare enum ChartTitleAlignEnum {
    Start = "start",
    Center = "center",
    End = "end"
}
export declare enum ChartTitlePositionEnum {
    Top = "top",
    Left = "left",
    Bottom = "bottom",
    Right = "right"
}
export declare class ChartFont {
    family?: string;
    size?: number;
    style?: string;
    weight?: string;
    lineHeight?: number | string;
}
export declare class ChartDataLabelsSettings {
    color?: string;
    backgroundColor?: string;
    borderColor?: string;
    font?: ChartFont;
    anchor?: ChartDataLabelsAnchorEnum;
    align?: ChartDataLabelAlignEnum;
    offset?: number;
    opacity?: number;
    padding?: number | {
        top?: number;
        right?: number;
        bottom?: number;
        left?: number;
    };
    textAlign?: ChartDataLabelsTextAlignEnum;
    rotation?: number;
}
export declare enum ChartDataLabelsAnchorEnum {
    Center = "center",
    Start = "start",
    End = "end"
}
export declare enum ChartDataLabelsTextAlignEnum {
    Center = "center",
    Start = "start",
    End = "end",
    Right = "right",
    Left = "left"
}
export declare enum ChartDataLabelAlignEnum {
    Center = "center",
    Start = "start",
    End = "end",
    Right = "right",
    Bottom = "bottom",
    Left = "left",
    Top = "top"
}
export declare class ChartLegendSettings {
    position?: ChartLegendPositionEnum;
    align?: ChartLegendAlignEnum;
    labels?: ChartLegendLabelsSettings;
    title?: ChartLegendTitleSettings;
}
export declare enum ChartLegendPositionEnum {
    Top = "top",
    Left = "left",
    Bottom = "bottom",
    Right = "right",
    ChartArea = "chartArea"
}
export declare enum ChartLegendAlignEnum {
    Center = "center",
    Start = "start",
    End = "end"
}
export declare class ChartLegendLabelsSettings {
    color?: string;
    boxHeight?: number;
    padding?: number;
    textAlign?: ChartLegendLabelsAlignEnum;
}
export declare enum ChartLegendLabelsAlignEnum {
    Left = "left",
    Right = "right",
    Center = "center"
}
export declare class ChartLegendTitleSettings {
    color?: string;
    display?: boolean;
    padding?: number;
    text?: string;
}
export declare class ChartTooltipSettings {
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
export declare enum ChartTooltipPositionEnum {
    Average = "average",
    Nearest = "nearest"
}
export declare enum ChartTooltipAlignEnum {
    Left = "left",
    Right = "right",
    Center = "center"
}
export declare enum ChartTooltipYAlignEnum {
    Top = "top",
    Center = "center",
    Bottom = "bottom"
}
export declare class ChartStackedSettings {
    x?: boolean;
    y?: boolean;
}
export declare class ChartAspectRatioSettings {
    maintain?: boolean;
    value?: number;
}
export declare class ChartLimitSettings {
    minX?: number;
    maxX?: number;
    minY?: number;
    maxY?: number;
}
export declare class ChartDataSource {
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
export declare class ChartParsingSettings {
    xAxisKey?: string;
    yAxisKey?: string;
}
export declare class ChartLegendEvent extends VrControlsEvent {
    sender: ChartVr;
    event: any;
    legendItem: any;
    legend: any;
}
export declare class ChartLegendHoverEvent extends ChartLegendEvent {
}
export declare class ChartLegendLeaveEvent extends ChartLegendEvent {
}
export declare class ChartLegendClickEvent extends ChartLegendEvent {
}
export declare class ChartLabelEvent extends VrControlsEvent {
    sender: ChartVr;
    context: any;
}
export declare class ChartLabelHoverEvent extends ChartLabelEvent {
}
export declare class ChartLabelLeaveEvent extends ChartLabelEvent {
}
export declare class ChartLabelClickEvent extends ChartLabelEvent {
}
export declare class ChartAxisFormatterEvent extends VrControlsEvent {
    value: any;
    context: any;
    sender: ChartVr;
}
export declare class ChartOptions extends VrControlOptions {
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
export declare enum WindowFooterItemTypeEnum {
    Close = 0,
    Ok = 1,
    Custom = 2,
    SplitButton = 3,
    Switch = 4,
    ButtonGroup = 5,
    CheckBox = 6,
    ComboBox = 7,
    DatePicker = 8,
    Label = 9,
    TextBox = 10,
    Separator = 11
}
export declare enum WindowFooterItemAlignEnum {
    Left = 0,
    Right = 1
}
export declare enum WindowAutoSizeDirectionEnum {
    Width = 0,
    Height = 1
}
export declare enum vrEditorItemEnum {
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
export declare enum vrEditorToolbarModeEnum {
    Floating = "floating",
    Sliding = "sliding",
    Scrolling = "scrolling",
    Wrap = "wrap"
}
export declare enum TinyMceIconEnum {
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
export declare class vrEditorCustomItem {
    icon?: TinyMceIconEnum;
    imageUrl?: string;
    text?: string;
    tooltip?: string;
    onClick?(e: EditorItemClickEvent): void;
}
export declare class vrEditorCustomMenuItem {
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
export declare enum EditorCustomMenuItemType {
    Button = 0,
    Separator = 1,
    SplitButton = 2,
    Switch = 3,
    ButtonGroup = 4,
    CheckBox = 5,
    ComboBox = 6,
    DatePicker = 7,
    Label = 8,
    TextBox = 9
}
export declare class vrEditorSpeechRecognizerSettings {
    stopAtClick: boolean;
    position?: EditorSpeechRecognizerPositionEnum;
    mode?: EditorSpeechRecognizerModeEnum;
    showInfoCommands?: boolean;
}
export declare enum EditorSpeechRecognizerModeEnum {
    Popup = 0,
    Direct = 1
}
export declare enum EditorSpeechRecognizerPositionEnum {
    MenuBar = 0,
    MenuItems = 1
}
export declare class vrEditorFontSizeSettings {
    defaultSize?: number;
    formatSizeList?: number[];
}
export declare class SpeechRecognizerOptions extends VrControlOptions {
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
export declare enum GridCheckboxModeEnum {
    None = 0,
    SingleCheck = 1,
    MultiCheck = 2
}
export declare enum GridSortDirectionEnum {
    Asc = 0,
    Desc = 1
}
export declare enum SortDirectionEnum {
    Asc = 0,
    Desc = 1
}
export declare enum GridHeightModeEnum {
    FitScreen = 0,
    FitContent = 1
}
export declare enum GridModeEnum {
    Sync = 0,
    NotSync = 1
}
export declare enum GridAggregateMode {
    Average = 0,
    Count = 1,
    Max = 2,
    Min = 3,
    Sum = 4,
    None = 5
}
export declare enum GridAlignEnum {
    Left = "left",
    Center = "center",
    Right = "right"
}
export declare enum GridColumnTypeEnum {
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
export declare enum GridLabelUnderlineMode {
    Always = 0,
    None = 1,
    OnFocus = 2
}
export declare enum GridToolbarItemType {
    Add = 0,
    Delete = 1,
    Separator = 2,
    Excel = 3,
    ExcelWithHiddenColumns = 4,
    Custom = 5,
    Rebind = 6,
    SplitButton = 7,
    Switch = 8,
    ButtonGroup = 9,
    CheckBox = 10,
    ComboBox = 11,
    DatePicker = 12,
    Label = 13,
    TextBox = 14
}
export declare enum GridDateFilterTypeEnum {
    GreaterThan = 0,
    LessThan = 1,
    EqualsTo = 2,
    Between = 3
}
export declare enum GridNumberFilterTypeEnum {
    GreaterThan = 0,
    LessThan = 1,
    EqualsTo = 2,
    Between = 3
}
export declare enum GridStringFilterTypeEnum {
    StartsWith = 0,
    EndsWith = 1,
    EqualsTo = 2,
    Includes = 3,
    IncludesFromSimpleSearch = 4
}
export declare class GridCartSettings {
    fields: string[];
    onClick?: (e: GridCartSettingsClickEvent) => void;
}
export declare class GridCartSettingsClickEvent {
    sender: Grid;
    selectedValues: any[];
}
export declare class GridStickerSettings {
    textColor?: string;
    backgroundColor?: string;
    text?: string;
    cssContainer?: string;
    css?: string;
    bold?: boolean;
    onClick?: (e: GridStickerClickEvent) => void;
}
export declare class GridStickerClickEvent {
    sender: Grid;
    control: Label;
    value?: string | null;
}
export declare class GridServerBindSettings {
    itemCountPropertyName?: string;
    totalsPropertyName?: string;
    excelDownloadUrlPropertyName?: string;
}
export declare class GridGroupBySettings {
    sortBy?: GridSortSettings;
    internalSortBy?: GridSortSettings;
    fields: string[] | GridGroupByItem[];
    automaticSort?: boolean;
}
export declare class GridSortSettings {
    field: string;
    direction?: GridSortDirectionEnum;
}
export declare class GridGroupByItem {
    field: string;
    displayField?: string;
    groupNameIfEmpty?: string;
    checkbox?: boolean;
    displayValue?: (e: GridGroupDisplayValueEvent) => string;
    onExpandCollapse?: (e: GridGroupExpandCollapseEvent) => void;
    onEditClick?: (e: GridGroupEditClickEvent) => void;
}
export declare class GridGroupDisplayValueEvent {
    sender: Grid;
    dataItem: any;
    field: string;
    displayField?: string;
}
export declare class GridGroupExpandCollapseEvent {
    sender: Grid;
    groupByField: string;
    childrenItems: any[];
    groupByDisplayField?: string;
    collapse: boolean;
    value: any;
    childrenRows: HTMLElement[];
    displayValue: any;
}
export declare class GridGroupEditClickEvent {
    sender: Grid;
    groupByField: string;
    childrenItems: any[];
    groupByDisplayField?: string;
    value: any;
    childrenRows: HTMLElement[];
    displayValue: any;
    dataItem: any;
}
export declare class GridPageSelectedEvent extends VrControlsEvent {
    sender: Grid;
    pageSelected: number;
}
export declare class GridScrollEvent extends VrControlsEvent {
    sender: Grid;
    target: HTMLElement;
    scrollLeft: number;
    scrollTop: number;
}
declare class GridExcelExportEvent extends VrControlsEvent {
    sender: Grid;
}
export declare class GridBeforeExcelExportEvent extends GridExcelExportEvent {
    fileName: string;
    exportHiddenColumns: boolean;
}
export declare class GridAfterExcelExportEvent extends GridExcelExportEvent {
    headerRow: GridExcelRow;
    contentRows: GridExcelRow[];
    footerRow: GridExcelRow;
    excelFileName: string;
    groupBy: string[] | null;
    exportHiddenColumns: boolean;
}
declare class GridGroupCheckEvent extends VrControlsEvent {
    sender: Grid;
    checked: boolean;
    childrenIdList: string[];
}
export declare class GridBeforeGroupCheckEvent extends GridGroupCheckEvent {
}
export declare class GridAfterGroupCheckEvent extends GridGroupCheckEvent {
}
export declare class GridColumn {
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
    displayField?: string;
    dataItems?: any[];
    ddlNullable?: boolean;
    headerSettings?: GridHeaderSettings;
    cellSettings?: GridCellSettings;
    buttonSettings?: (templateEvent: GridTemplateEvent) => GridButtonSettings;
    customSettings?: (templateEvent: GridTemplateEvent) => GridCustomSettings | void;
    iconSettings?: (templateEvent: GridTemplateEvent) => GridIconSettings;
    imageSettings?: (templateEvent: GridTemplateEvent) => GridImageSettings;
    labelSettings?: (templateEvent: GridTemplateEvent) => GridLabelSettings;
}
export declare class GridButtonSettings extends GridControlsSettings {
    text?: string;
    icon?: IconClass;
    imageUrl?: string;
    isPrimaryButton?: boolean;
    color?: string;
    backgroundColor?: string;
}
export declare class GridToolbarItem {
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
    badge?: BadgeSettings;
    primary?: boolean;
    enable?: boolean;
    splitButtonItems?: SplitButtonItem[];
    splitButtonOptions?: SplitButtonOptions;
    switchSettings?: GridToolbarSwitchSettings;
    buttonGroupItems?: ButtonGroupItem[];
    comboBoxOptions?: ComboBoxOptions;
    datePickerOptions?: DatePickerOptions;
    textBoxOptions?: TextBoxOptions;
    value?: string;
    onClick?: (e: GridToolbarClickEvent) => void;
    onBeforeClick?: (e: GridToolbarClickEvent) => void;
}
export declare enum PdfViewerToolbarAreaEnum {
    Left = 0,
    Center = 1,
    Right = 2
}
export declare class OnContentRenderedEvent {
    sender: PdfViewer;
    pdf: any;
    base64bytes: string;
}
export declare class PdfViewerToolbarSettings {
    navigation?: boolean;
    zoom?: boolean;
    print?: boolean;
    download?: boolean;
    items?: PdfViewerToolbarItem[];
}
export declare class PdfViewerToolbarItem {
    text?: string;
    icon?: IconClass;
    value?: string;
    area?: PdfViewerToolbarAreaEnum;
    css?: string;
    cssContainer?: string;
    onClick?: (e: ToolbarItemOnClickEvent) => void;
}
export declare class ToolbarItemOnClickEvent {
    sender: PdfViewer;
    text?: string;
    value?: string;
}
export declare enum SplitterDirectionEnum {
    Horizontal = "horizontal",
    Vertical = "vertical"
}
export declare enum SplitterCollapseDirectionEnum {
    Left = 0,
    Right = 1,
    Up = 2,
    Down = 3
}
export declare class SplitterCollapsableSettings {
    direction: SplitterCollapseDirectionEnum;
    color?: string;
}
export declare class SwitchLabelSettings {
    text: string;
    tooltip?: string;
    color?: string;
    bold?: boolean;
    css?: string;
    badgeSettings?: BadgeSettings;
    onClick?: (e: SwitchLabelSettingsOnClickEvent) => void;
}
export declare class SwitchLabelSettingsOnClickEvent extends VrControlsEvent {
    sender: Switch;
    checked: boolean;
}
export declare class BadgeSettings {
    text?: string | number;
    color?: string;
    backgroundColor?: string;
    visible?: boolean;
    css?: string;
    click?: (e: BadgeClickEvent) => void;
}
export declare class BadgeClickEvent {
    sender: VrControl;
    text: string;
    leftButton?: boolean;
    middleButton?: boolean;
    rightButton?: boolean;
}
export declare class SchedulerSaturationInfo {
    manual?: boolean;
    dayMode?: SchedulerSaturationDay[];
    weekMode?: SchedulerSaturationWeek;
    fourWeeksMode?: SchedulerSaturationFourWeeks[];
}
export declare class SchedulerSaturationDay {
    resourceId: number;
    date?: Date;
    percentageValue?: number;
    color?: string;
    borderColor?: string;
}
export declare class SchedulerSaturationWeek {
    groupedByResource?: SchedulerSaturationWeekByResource[];
    groupedByDate?: SchedulerSaturationWeekByDate[];
}
export declare class SchedulerSaturationWeekByResource {
    resourceId: number;
    percentageValue?: number;
    dateList?: SaturationDate[];
    color?: string;
    titleColor?: string;
}
export declare class SaturationDate {
    date: Date;
    percentageValue?: number;
    color?: string;
    borderColor?: string;
}
export declare class SchedulerSaturationWeekByDate {
    date: Date;
    resourceList?: SaturationResource[];
}
export declare class SaturationResource {
    id: number;
    percentageValue?: number;
    color?: string;
    borderColor?: string;
}
export declare class SchedulerSaturationFourWeeks {
    resourceId: number;
    percentageValue?: number;
    dateList?: SaturationDate[];
    color?: string;
    titleColor?: string;
}
export declare class SchedulerResource {
    text: string;
    value: string;
}
export declare enum DayOfWeekEnum {
    Sunday = 0,
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6
}
export declare class SchedulerView {
    type: SchedulerViewEnum;
    selected?: boolean;
}
export declare enum SchedulerViewEnum {
    Day = 0,
    Week = 1,
    FourWeeks = 2
}
export declare class SchedulerSlotElement {
    resourceId: string;
    start: Date;
    end: Date;
    columnPosition: boolean[];
    attributes: SchedulerAttribute[];
    columnIndex: number;
    rowIndex: number;
}
export declare class SchedulerData {
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
    get duration(): number;
}
export declare class SchedulerAttribute {
    key: string;
    value: string;
}
export declare enum SchedulerNavigateActionEnum {
    NextDate = 0,
    PrevDate = 1,
    Today = 2,
    ChangeDate = 4
}
export declare class NotifierOptions {
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
export declare enum NotifierTypeEnum {
    Default = 0,
    Success = 1,
    Info = 2,
    Warning = 3,
    Error = 4
}
export declare enum NotifierPositionEnum {
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
export declare enum AnimationShowEnum {
    None = 0,
    Default = 1,
    FadeIn = 2,
    SlideDown = 3
}
export declare enum AnimationHideEnum {
    None = 0,
    Default = 1,
    FadeOut = 2,
    SlideUp = 3
}
export declare enum TooltipShowOnEnum {
    Click = 0,
    Focus = 1,
    Hover = 2,
    Never = 3
}
export declare enum TooltipHideOnEnum {
    Default = 0,
    Never = 1,
    Click = 2,
    Blur = 3,
    Leave = 4
}
export declare enum TooltipTypeEnum {
    Default = 0,
    Success = 1,
    Info = 2,
    Warning = 3,
    Error = 4
}
export declare enum TooltipPositionEnum {
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
export declare class TreeViewColumn {
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
export declare class TreeViewToolbarItem {
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
    badge?: BadgeSettings;
    primary?: boolean;
    splitButtonItems?: SplitButtonItem[];
    switchSettings?: TreeViewToolbarSwitchSettings;
    buttonGroupItems?: ButtonGroupItem[];
    comboBoxOptions?: ComboBoxOptions;
    datePickerOptions?: DatePickerOptions;
    textBoxOptions?: TextBoxOptions;
    value?: string;
    onClick?: (e: TreeViewToolbarClickEvent) => void;
}
export declare class TreeViewToolbarSwitchSettings {
    labelOff?: string;
    labelOn?: string;
    checked?: boolean;
    onCheck?: (e: TreeViewToolbarSwitchEvent) => void;
}
export declare class TreeViewToolbarSwitchEvent {
    checked: boolean;
}
export declare class TreeViewToolbarClickEvent {
    sender: any;
    type: TreeViewToolbarItemType;
    isDefaultPrevented: boolean;
    deletedItems?: any[];
    preventDefault(): void;
}
export declare class UpdateRowRebindSettings {
    onlyText: boolean;
}
export declare enum TreeViewToolbarItemType {
    Separator = 0,
    Excel = 1,
    Custom = 2,
    Rebind = 3,
    SplitButton = 4,
    Switch = 5,
    ButtonGroup = 6,
    CheckBox = 7,
    ComboBox = 8,
    DatePicker = 9,
    Label = 10,
    TextBox = 11
}
export declare class TreeViewItem {
    text: string;
    value: string;
    icon?: IconClass;
    parentValue?: string;
    numericValue?: number;
    bold?: boolean;
}
export declare class TreeViewItemExtraCell extends TreeViewColumn {
    value?: string;
}
export declare class TreeViewContextMenuItem {
    text?: string;
    value?: string;
    icon?: IconClass;
    separator?: boolean;
    confirmationMessage?: string;
    onClick?: (e: TreeViewContextMenuClickEvent) => void;
}
export declare enum TreeModeEnum {
    AllExpanded = 0,
    OnlyFirstLevelExpanded = 1,
    AllCollapsed = 2
}
export declare enum TreeViewNumericTypeEnum {
    Default = 0,
    Currency = 1,
    Percentage = 2
}
export declare enum TreeViewColumnTypeEnum {
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
    Color = 21
}
export declare enum TreeViewAlignEnum {
    Left = "left",
    Center = "center",
    Right = "right"
}
export declare class TreeViewFilterSettings {
    onlyParents?: boolean;
}
export declare class MapMarker {
    latitude: number;
    longitude: number;
    title: string;
    opacity: number;
    draggable: boolean;
}
export declare enum MapModeEnum {
    Streets = "mapbox/streets-v11",
    Outdoors = "mapbox/outdoors-v11",
    Light = "mapbox/light-v10",
    Dark = "mapbox/dark-v10",
    Satellite = "mapbox/satellite-v9",
    SatelliteStreets = "mapbox/satellite-streets-v11",
    NavigationDay = "mapbox/navigation-day-v1",
    NavigationNight = "mapbox/navigation-night-v1"
}
export declare class ColorPickerRgbaValue {
    r: number;
    g: number;
    b: number;
    a?: number;
}
export declare enum ColorPickerModeEnum {
    Hex = "hex",
    Rgba = "rgba"
}
export declare enum UploadValidationErrorTypeEnum {
    MinSize = 0,
    MaxSize = 1,
    Extensions = 2
}
export declare enum Color {
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
    blueGrey900 = "#263238",
    white = "#FFFFFF",
    black = "#000000"
}
export declare function pageError(callback?: (e: PageErrorEvent) => void): void;
declare class PageErrorEvent {
    message: string | Event;
    url?: string;
    lineNumber?: number;
    columnNumber?: number;
    error?: Error;
}
export declare function filesToBase64(files: File[]): Promise<string[]>;
export declare function isEquals(item1: any, item2: any): boolean;
export declare function isLocalhost(): boolean;
export declare function interval(callback: Function, each: number, timeout?: number, timeoutCallback?: Function): void;
export declare function addCssStyle(cssRules: string, id?: string): void;
export declare function addCss(cssRules: string, id?: string): void;
export declare function addJsScript(jsRules: string, id?: string): void;
export declare function addCssFiles(...paths: string[]): Promise<unknown>;
export declare function addJsFiles(...paths: string[]): Promise<unknown>;
export declare function openUrl(url: string, name?: string, newTab?: boolean): void;
export declare function openBrowserWindow(url: string, newTab?: boolean, size?: BrowserWindowSize, position?: BrowserWindowPosition): void;
export declare class BrowserWindowSize {
    height?: number;
    width?: number;
}
export declare class BrowserWindowPosition {
    left?: number;
    top?: number;
}
export declare function isValidEmail(email: string): boolean;
export declare function copyTextToClipboard(text: string): void;
export declare function base64ToFile(base64: string, fileName: string, options?: FilePropertyBag): Promise<File>;
export declare function base64ToBytes(base64: string): Uint8Array;
export declare function bytesToBase64(bytes: Uint8Array): string;
export declare function base64ToBlob(base64: string, contentType?: string, sliceSize?: number): Blob;
export declare function shadowRoot(shadowRoot?: ShadowRoot): ShadowRoot | null | undefined;
export declare function jqueryVariable(jqueryVariable?: any): any;
export declare enum WebApiModeEnum {
    Async = 0,
    Sync = 1
}
export declare enum DateModeEnum {
    Date = 0,
    DateTime = 1,
    Time = 2,
    LongDate = 3,
    LongDateTime = 4,
    LongWeekDate = 5,
    ShortWeekDate = 6
}
export declare enum DateDepthEnum {
    Day = 0,
    Month = 1,
    Year = 2
}
export declare enum DateFormatEnum {
    LongDate = 0,
    ShortDate = 1,
    WeekDay = 2,
    WeekRange = 3,
    FourWeeksRange = 4,
    Month = 5,
    Year = 6,
    LongDateWithoutYear = 7,
    ShortDateWithoutYear = 8,
    LongWeekRange = 9,
    LongFourWeeksRange = 10
}
export declare enum KeyEnum {
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
export declare class NumberFormatRoundingSettings {
    roundingMode?: RoundingModeEnum;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
}
export declare class NumberFormatSettings extends NumberFormatRoundingSettings {
    constructor(roundingSettings?: NumberFormatRoundingSettings);
    style?: NumberStyleEnum;
    currency?: string;
    useGrouping?: GroupingModeEnum | boolean;
}
declare enum NumberStyleEnum {
    Default = "decimal",
    Decimal = "decimal",
    Currency = "currency",
    Percentage = "percent",
    Unit = "unit"
}
export declare enum GroupingModeEnum {
    Always = "always",
    Auto = "auto",
    Min2 = "min2"
}
export declare enum RoundingModeEnum {
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
export declare class DateTime {
    year: number;
    month: number;
    day: number;
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
    private _createdByTypeEnum;
    constructor(date?: Date | DateTime | string);
    createdByTypeEnum(): DateTimeTypeEnum;
    isCreatedByDateTime(): boolean;
    isCreatedByDate(): boolean;
    isCreatedByString(): boolean;
    toDate(): Date;
    isEqualsTo(source: DateTime, ignoreHours?: boolean): boolean;
    static toDate(source?: DateTime | null): Date;
    static fromDate(source?: Date | null): DateTime;
    static equals(first: DateTime, second: DateTime, ignoreHours?: boolean): boolean;
}
export declare enum DateTimeTypeEnum {
    Date = 0,
    DateTime = 1,
    String = 2
}
declare global {
    interface DateConstructor {
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
    interface Date {
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
    interface Number {
        vrToNumberString(formatSettings?: NumberFormatSettings): string;
        vrToCurrencyString(formatSettings?: NumberFormatSettings): string;
        vrToPercentageString(formatSettings?: NumberFormatSettings): string;
        vrRound(decimals: number): number;
        vrFormatNumber(formatSettings: NumberFormatSettings): string;
    }
    interface String {
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
        vrIndexOfAll(value: string): number[];
        vrReplaceAt(index: number, replacement: string): string;
    }
    interface ArrayConstructor {
        vrEquals(array1: any[], array2: any[]): boolean;
    }
    interface Array<T> {
        vrFirst(): T;
        vrLast(): T;
        vrDelete(value: any): void;
        vrDeleteItem(item: any, key: string): void;
        vrDeleteAllBy<U>(callbackfn?: (value: T, index: number, array: T[]) => U, thisArg?: any): void;
        vrToNumberArrayList(): number[];
        vrToStringArrayList(): string[];
        vrToCommaSeparatedList(addSpaceAfterComma?: boolean): string;
        vrPushRange(arrayToAdd: any[]): void;
        vrAll<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): boolean;
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
    interface JQuery {
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
export declare function puma(element: any): any;
export {};
