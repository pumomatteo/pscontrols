declare module vr {//#region colorPickerManager
export class ColorPickerManager
{
    constructor();
}
//#endregion

//#region controlManager
export class ControlManager
{
    static add(control: VrControl): void;
    static get<T extends VrControl>(controlId: string): T;
    static remove(controlId: string): void;
}
//#endregion

//#region cookieManager
export class CookieManager
{
    static setCookie(cookieName: string, cookieValue: any, expireDays?: number, options?: CookieOptions): void;
    static setCookieHours(cookieName: string, cookieValue: any, expireHours?: number, options?: CookieOptions): void;
    static setCookieMinutes(cookieName: string, cookieValue: any, expireMinutes?: number, options?: CookieOptions): void;
    static setCookieSeconds(cookieName: string, cookieValue: any, seconds?: number, options?: CookieOptions): void;
    static deleteCookie(name: string): void;
    static getCookie(cookieName: string): string;
}
class CookieOptions
{
    secured?: boolean;
    sameSite?: CookieSameSiteEnum;
    httpOnly?: boolean;
}
export enum CookieSameSiteEnum
{
    Lax = "Lax",
    Strict = "Strict",
    None = "None"
}
export
{};
//#endregion

//#region deviceManager
export class DeviceManager
{
    static getScreenResolution(): ScreenResolution;
    static isSmartphone(): boolean;
    static isTablet(): boolean;
    static isDesktop(): boolean;
    static isMobile(): any;
    static isIphoneX(): boolean;
    static isIphone(): RegExpMatchArray | null;
    static browser(): BrowserTypeEnum | "Unknown";
    static isInternetExplorer(): boolean;
    static isSafari(): boolean;
    static isChrome(): boolean;
    static isFirefox(): boolean;
    static isEdge(): boolean;
    static isOpera(): boolean;
    static isVivaldi(): boolean;
    static isSeamonkey(): boolean;
}
class ScreenResolution
{
    width: number;
    height: number;
}
export
{};
//#endregion

//#region dictionary
export class KeyValuePair<K, V>
{
    key: K;
    value: V;
}
export class Dictionary<K, V>
{
    items: KeyValuePair<K, V>[];
    constructor();
    asMap(): Map<K, V>;
    static fromMap<K, V>(map: Map<K, V>): Dictionary<K, V>;
    static parse<K, V>(dict: Dictionary<K, V>): Dictionary<K, V>;
    get(key: K): V | undefined;
    set(key: K, value: V): void;
    has(key: K): boolean;
    delete(key: K): void;
    changeKey(oldKey: K, newKey: K): void;
    keys(): K[];
}
//#endregion

//#region loaderManager
export class LoaderManager
{
    static show(element?: string | HTMLElement | JQuery, transparency?: boolean, tag?: any): void;
    static hide(tag?: any): void;
}
//#endregion

//#region printManager
export class PrintManager
{
    static printBytes(base64Bytes: string, options?: PrintFileOptions): void;
    static printPdf(path: string, options?: PrintFileOptions): void;
    static printImage(path: string, options?: PrintFileOptions): void;
    static printHtml(elementId: string, options?: PrintFileOptions): void;
    static printElement(element: string | HTMLElement | JQuery, options?: PrintHtmlOptions): void;
    static printGrid(jsonData: any, options?: PrintGridOptions): void;
}
export enum PrintTypeEnum
{
    Pdf = "pdf",
    Image = "image"
}
export class PrintFileOptions
{
    type?: PrintTypeEnum;
    loadingMessage?: string;
    headerTitle?: string;
    documentTitle?: string;
    customCss?: string;
}
export class PrintHtmlOptions
{
    pageTitle?: string;
    removeInlineStyles?: boolean;
    printDelay?: number;
    header?: string | HTMLElement | JQuery;
    footer?: string | HTMLElement | JQuery;
    removeScripts?: boolean;
    debug?: boolean;
    beforePrint?: Function;
    afterPrint?: Function;
}
class PrintGridOptions
{
    headerCss?: string;
    contentCss?: string;
    properties?: string[];
    loadingMessage?: string;
    headerTitle?: string;
    repeatHeaderOnEveryPages?: boolean;
    documentTitle?: string;
}
export
{};
//#endregion

//#region qrCodeManager
type bit = number;
type byte = number;
type int = number;
export class QrCodeManager
{
    readonly version: int;
    readonly errorCorrectionLevel: Ecc;
    readonly mask: int;
    static encodeText(text: string, ecl: Ecc): QrCodeManager;
    static encodeBinary(data: Array<byte>, ecl: Ecc): QrCodeManager;
    static encodeSegments(segs: Array<QrSegment>, ecl: Ecc, minVersion?: int, maxVersion?: int, mask?: int, boostEcl?: boolean): QrCodeManager;
    readonly size: int;
    constructor(version: int, errorCorrectionLevel: Ecc, dataCodewords: Array<byte>, mask: int);
    getModule(x: int, y: int): boolean;
    drawCanvas(scale: int, border: int, canvas: HTMLCanvasElement): void;
    toSvgString(border: int, color: string): string;
    static readonly MIN_VERSION: int;
    static readonly MAX_VERSION: int;
}
export class QrSegment
{
    readonly mode: Mode;
    readonly numChars: int;
    static makeBytes(data: Array<byte>): QrSegment;
    static makeNumeric(digits: string): QrSegment;
    static makeAlphanumeric(text: string): QrSegment;
    static makeSegments(text: string): Array<QrSegment>;
    static makeEci(assignVal: int): QrSegment;
    constructor(mode: Mode, numChars: int, bitData: Array<bit>);
    getData(): Array<bit>;
    static getTotalBits(segs: Array<QrSegment>, version: int): number;
    static readonly NUMERIC_REGEX: RegExp;
    static readonly ALPHANUMERIC_REGEX: RegExp;
}
export class Ecc
{
    readonly ordinal: int;
    readonly formatBits: int;
    static readonly LOW: Ecc;
    static readonly MEDIUM: Ecc;
    static readonly QUARTILE: Ecc;
    static readonly HIGH: Ecc;
}
export class Mode
{
    readonly modeBits: int;
    static readonly NUMERIC: Mode;
    static readonly ALPHANUMERIC: Mode;
    static readonly BYTE: Mode;
    static readonly KANJI: Mode;
    static readonly ECI: Mode;
    numCharCountBits(ver: int): int;
}
export
{};
//#endregion

//#region utilityManager
export class UtilityManager
{
    static createGuid(): string;
    static interval(callback: Function, each: number, timeout?: number, timeoutCallback?: Function): void;
    static createIcon(icon: IconClass): HTMLElement;
    static duplicate(element: any): any;
    static equals(item1: any, item2: any): boolean;
    static getMonthNumberByName(monthName: string): -1 | MonthEnum;
    static doAjaxCall<T>(settings: AjaxCallSettings, callBack?: (response: T) => void, errorCallback?: () => void): null;
    static htmlDecode(text: string): string | null;
    static textWidth(object: HTMLElement | string): number;
    static downloadPdfBytes(base64Bytes: string, name?: string): void;
    static openUrl(url: string, name?: string, newTab?: boolean): void;
    static isValidEmail(email: string): boolean;
    static addCssStyle(cssRules: string, id?: string): void;
    static addCssFiles(...pathList: string[]): Promise<unknown>;
    static addJsScript(jsRules: string, id?: string): void;
    static addJsFiles(...pathList: string[]): Promise<unknown>;
    static bytesToBase64(bytes: Uint8Array): string;
    static base64ToBytes(base64: any): Uint8Array;
    static base64ToFile(base64: string, fileName: string, options?: FilePropertyBag): Promise<File>;
    static base64ToBlob(base64: string, contentType?: string, sliceSize?: number): Blob;
    static enterFullScreen(target: HTMLElement, errorCallback?: Function): void;
    static exitFullScreen(): void;
    static drag(element: HTMLElement | JQuery | string, dragEvent?: VrDragSupportEvent): void;
}
class AjaxCallSettings
{
    mode: WebApiModeEnum;
    authKey: string;
    method: string;
    request?: any;
    headerParameters?: any;
    file?: string | Blob | File;
}
enum MonthEnum
{
    January = 0,
    February = 1,
    March = 2,
    April = 3,
    May = 4,
    June = 5,
    July = 6,
    August = 7,
    September = 8,
    October = 9,
    November = 10,
    December = 11
}
class VrDragSupportEvent
{
    sensibility?: number;
    typeEnum?: VrDragSupportTypeEnum;
    dragLeft?: null | (() => void);
    dragRight?: null | (() => void);
    dragUp?: null | (() => void);
    dragDown?: null | (() => void);
    dragged?: null | ((e: VrDragEveryEvent) => void);
    dragging?: null | ((e: VrDragEveryEvent) => void);
}
class VrDragEveryEvent
{
    left: number;
    top: number;
    element: HTMLElement;
}
export enum VrDragSupportTypeEnum
{
    Vertical = 0,
    Horizontal = 1,
    Both = 2
}
export
{};
//#endregion

//#region common
export class VrControl
{
    _options: VrControlOptions;
    constructor(element?: HTMLElement | HTMLInputElement, options?: VrControlOptions, typeEnum?: ControlTypeEnum);
    controlType(): ControlTypeEnum;
    id(id?: string): string;
    tag(tag?: any): any;
    uniqueName(uniqueName?: string): any;
    attribute(name: string, value: any, toContainer?: boolean): void;
    tooltip(tooltip?: string, container?: boolean): any;
    element<T extends HTMLElement>(): T;
    container(): HTMLElement;
    label(): Label | null;
    options<T extends VrControlOptions>(): T;
    settingPopup(popup: HTMLElement, popupSettings?: PopupSettings): void;
    width(value?: string | number): number;
    height(value?: string | number): number;
    enabled(state?: boolean): boolean;
    enable(): void;
    disable(): void;
    visible(state?: boolean): boolean;
    show(): void;
    hide(): void;
    focus(): void;
    blur(): void;
    cssContainer(value: string): void;
    css(value: string): void;
    class(className?: string): string[];
    classContainer(className?: string): string[];
    removeClass(className: string): void;
}
export class VrControlOptions
{
    width?: string | number;
    height?: string | number;
    id?: string;
    css?: string;
    cssContainer?: string;
    class?: string;
    classContainer?: string;
    margin?: number | VrMarginSettings;
    enable?: boolean;
    visible?: boolean;
    label?: string;
    labelSettings?: LabelControlsSettings;
    tag?: any;
    uniqueName?: string;
    attributes?: AttributeSettings[];
    tabIndex?: number;
    shadowRoot?: boolean;
    addToControlList?: boolean;
}
export class LabelControlsSettings
{
    id?: string;
    mode?: LabelModeEnum;
    width?: number;
    class?: string;
    position?: PositionEnum;
    fontSize?: number | string;
    textAlign?: TextAlignEnum;
    tooltip?: boolean | string;
    bold?: boolean;
    css?: string;
    cssContainer?: string;
    colorSettings?: ColorSettings;
    underlineMode?: LabelUnderlineMode | undefined;
    onClick?: (e: LabelClickEvent) => void;
}
export class AttributeSettings
{
    name: string;
    value: any;
    container?: boolean;
}
export class VrControlsEvent
{
    preventDefault(): void;
    isDefaultPrevented(): boolean;
}
//#endregion

//#region alert
export class AlertOptions
{
    textOkButton?: string;
    content?: string;
    title?: string;
    width?: number | string;
    height?: number | string;
    textAlign?: TextAlignEnum;
    css?: string;
    cssContainer?: string;
    onContentLoaded?(e: ContentAlertLoadedEvent): void;
}
export class Alert
{
    constructor(text?: string | null, options?: AlertOptions | null);
    open(): Promise<any>;
    close(): void;
}
class ContentAlertLoadedEvent extends VrControlsEvent
{
    sender: Alert;
    contentElement: HTMLElement;
}
export
{};
//#endregion

//#region autoCompleteBox
export class AutoCompleteBoxOptions extends VrControlOptions
{
    value?: string[] | AutoCompleteBoxItem[];
    rows?: number;
    placeholder?: string;
    border?: boolean;
    itemSettings?: AutoCompleteBoxItemSettings;
    comboSettings?: AutoCompleteBoxComboSettings;
    tooltip?: boolean;
    onItemClick?: (e: AutoCompleteBoxItemClickEvent) => void;
    onItemAdded?: (e: AutoCompleteBoxItemAddedEvent) => void;
    onItemRemoved?: (e: AutoCompleteBoxItemRemovedEvent) => void;
    onFocus?: (e: AutoCompleteBoxFocusEvent) => void;
    onBlur?: (e: AutoCompleteBoxBlurEvent) => void;
}
export class AutoCompleteBox extends VrControl
{
    constructor(element: HTMLElement, options?: AutoCompleteBoxOptions | null);
    items(items?: string[] | AutoCompleteBoxItem[]): AutoCompleteBoxItem[];
    addItem(item: string | AutoCompleteBoxItem): void;
    removeItem(value: string): void;
    item(value: string): AutoCompleteBoxItemInfo;
    color(value: string, settings: AutoCompleteBoxItemSettings): void;
    text(): string[];
    value(items?: string[] | AutoCompleteBoxItem[]): (string | undefined)[];
    placeholder(value?: string): string;
    focus(): void;
    clear(): void;
    getOptions(): AutoCompleteBoxOptions;
}
class AutoCompleteBoxEvent extends VrControlsEvent
{
    sender: AutoCompleteBox;
}
class AutoCompleteBoxItemClickEvent extends AutoCompleteBoxEvent
{
    item: AutoCompleteBoxItemInfo;
    text: string;
}
class AutoCompleteBoxItemAddedEvent extends AutoCompleteBoxEvent
{
    item: AutoCompleteBoxItemInfo;
}
class AutoCompleteBoxItemRemovedEvent extends AutoCompleteBoxEvent
{
    item: AutoCompleteBoxItemInfo;
}
class AutoCompleteBoxItemInfo
{
    item: AutoCompleteBoxItem;
    element: HTMLElement;
}
class AutoCompleteBoxFocusEvent extends AutoCompleteBoxEvent
{
    sender: AutoCompleteBox;
    element: HTMLElement;
}
class AutoCompleteBoxBlurEvent extends AutoCompleteBoxEvent
{
    sender: AutoCompleteBox;
    element: HTMLElement;
}
export
{};
//#endregion

//#region button
export class ButtonOptions extends VrControlOptions
{
    text?: string;
    value?: string;
    mode?: ButtonModeEnum;
    tooltip?: string;
    colorSettings?: ColorSettings;
    icon?: IconClass;
    imageUrl?: string;
    iconSettings?: IconSettings;
    confirmationMessage?: string;
    badgeSettings?: BadgeSettings;
    onContextMenu?: boolean | ((e: ContextMenuEvent) => void);
    onClick?: (e: ButtonClickEvent) => void;
    onRightClick?: (e: ButtonRightClickEvent) => void;
    onMiddleClick?: (e: ButtonMiddleClickEvent) => void;
    onHover?: (e: ButtonHoverEvent) => void;
    onBlur?: (e: ButtonBlurEvent) => void;
    onRejectedConfirm?: () => void;
    onMouseDown?: (e: ButtonMouseDownEvent) => void;
    onMouseUp?: (e: ButtonMouseUpEvent) => void;
}
export class Button extends VrControl
{
    constructor(element: HTMLElement, options?: ButtonOptions | null);
    text(value?: string): string;
    value(value?: string): string;
    tooltip(value?: string | number): string;
    badge(text?: string | number): any;
    badgeBackgroundColor(color: string): void;
    badgeColor(color: string): void;
    showBadge(): void;
    hideBadge(): void;
    visibleBadge(state: boolean): void;
    hide(): void;
    mode(mode?: ButtonModeEnum): ButtonModeEnum;
    colorSettings(settings?: ColorSettings): ColorSettings | undefined;
    color(value?: string): string;
    backgroundColor(value?: string): string;
    borderColor(value?: string): string;
    icon(icon?: IconClass, iconPosition?: PositionEnum | null, iconTooltip?: string): HTMLElement | null;
    imageUrl(imageUrl?: string, imagePosition?: PositionEnum): HTMLElement | null;
    getOptions(): ButtonOptions;
    click(callback?: (e: ButtonClickEvent) => void): void;
}
class ButtonEvent extends VrControlsEvent
{
    sender: Button;
}
class ButtonClickEvent extends ButtonEvent
{
    text: string;
}
class ButtonRightClickEvent extends ButtonEvent
{
    text: string;
    leftButton?: boolean;
    middleButton?: boolean;
    rightButton?: boolean;
}
class ButtonMiddleClickEvent extends ButtonEvent
{
    text: string;
    leftButton?: boolean;
    middleButton?: boolean;
    rightButton?: boolean;
}
class ButtonHoverEvent extends ButtonEvent
{
}
class ButtonBlurEvent extends ButtonEvent
{
}
class ContextMenuEvent extends ButtonEvent
{
}
class ButtonMouseDownEvent extends ButtonEvent
{
}
class ButtonMouseUpEvent extends ButtonEvent
{
}
export
{};
//#endregion

//#region buttonGroup
export class ButtonGroupOptions extends VrControlOptions
{
    items?: ButtonGroupItem[];
    selectionMode?: SelectionModeEnum;
    checkboxes?: boolean;
    tooltip?: boolean;
    onSelect?(e: ButtonGroupSelectEvent): void;
    onItemAdded?(e: ButtonGroupItemAddedEvent): void;
    onItemRemoved?(e: ButtonGroupItemRemovedEvent): void;
}
export class ButtonGroup extends VrControl
{
    constructor(element: HTMLElement, options?: ButtonGroupOptions | null);
    items(items?: ButtonGroupItem[]): ButtonGroupItem[];
    addItem(item: ButtonGroupItem): void;
    item(value: string): ButtonGroupItem;
    removeItem(value: string): void;
    showItems(values: any[]): void;
    showItem(value: any): void;
    showAllItems(): void;
    hideItems(values: any[]): void;
    hideItem(value: any): void;
    hideAllItems(): void;
    visibleItem(value: any, state?: boolean): boolean;
    select(values: string[] | number[], triggerChange?: boolean): void;
    selectIndex(index: number, triggerChange?: boolean): void;
    getSelectedValues(): string[];
    value(): any;
    clear(): void;
    selectionMode(): SelectionModeEnum | undefined;
    getItemByValue(value: string): HTMLElement;
    getItemByIndex(index: number): HTMLElement;
    itemTooltip(value: string, tooltip?: string): string;
    itemText(value: string, text?: string, updateTooltip?: boolean): string;
    itemTextByIndex(index: number, text?: string): string;
    enableItem(value: any): void;
    disableItem(value: any): void;
    enable(): void;
    disable(): void;
    getOptions(): ButtonGroupOptions;
}
class ButtonGroupEvent extends VrControlsEvent
{
    sender: ButtonGroup;
    value?: string | null;
}
class ButtonGroupSelectEvent extends ButtonGroupEvent
{
    selectedValues: string[];
    selected?: boolean;
}
class ButtonGroupItemAddedEvent extends ButtonGroupEvent
{
}
class ButtonGroupItemRemovedEvent extends ButtonGroupEvent
{
}
export class ButtonGroupClickEvent extends ButtonGroupEvent
{
    value: string;
    selected: boolean;
}
export class ButtonGroupIconClickEvent extends ButtonGroupEvent
{
    value: string;
    selected: boolean;
}
export
{};
//#endregion

//#region calendar
export class CalendarOptions extends VrControlOptions
{
    value?: Date;
    selectedColor?: string;
    todayLabel?: boolean;
    otherMonthDays?: boolean;
    disabledDates?: Date[];
    highlightedDates?: Date[];
    dateSlotWidth?: number;
    depth?: DateDepthEnum;
    availableFrom?: Date;
    availableTo?: Date;
    onBeforeChange?(e: CalendarChangingEvent): void;
    onAfterChange?(e: CalendarChangeEvent): void;
    onDisableDate?(e: CalendarDisableDateEvent): boolean;
    onDayDraw?(e: CalendarDayDrawEvent): void;
    onFinishedDraw?(e: CalendarFinishedDrawEvent): void;
}
export class Calendar extends VrControl
{
    constructor(element: HTMLElement, options?: CalendarOptions | null);
    disabledDates(dates?: Date[]): Date[] | undefined;
    highlightedDates(dates?: Date[]): Date[] | undefined;
    getOptions(): CalendarOptions;
    depth(): DateDepthEnum;
    value(date?: Date | null, triggerChange?: boolean): Date | null;
    clear(triggerChange?: boolean): void;
    change(): void;
}
class CalendarEvent extends VrControlsEvent
{
    sender: Calendar;
    value: Date | null;
}
class CalendarChangeEvent extends CalendarEvent
{
}
class CalendarChangingEvent extends CalendarEvent
{
    previousValue?: Date | null;
}
class CalendarDayDrawEvent extends VrControlsEvent
{
    sender: Calendar;
    day: Date;
    element: HTMLElement;
}
class CalendarFinishedDrawEvent extends VrControlsEvent
{
    sender: Calendar;
}
class CalendarDisableDateEvent extends VrControlsEvent
{
    sender: Calendar;
    day: Date;
}
export
{};
//#endregion

//#region chart
export class ChartVr extends VrControl
{
    constructor(element: HTMLElement, options?: ChartOptions | null);
    base64Data(): string;
    datasource(datasource?: ChartDataSource[]): ChartDataSource[];
    getOptions(): ChartOptions;
}
export class BarChart extends ChartVr
{
}
export class HorizontalBarChart extends ChartVr
{
}
export class LineChart extends ChartVr
{
}
export class DonutChart extends ChartVr
{
}
export class PieChart extends ChartVr
{
}
export class AreaChart extends ChartVr
{
}
export class StackedBarChart extends ChartVr
{
}
//#endregion

//#region checkbox
export class CheckBoxOptions extends VrControlOptions
{
    text?: string;
    value?: string;
    threeState?: boolean;
    checked?: boolean;
    name?: string;
    tooltip?: string;
    onCheck?(e: CheckBoxCheckEvent): void;
}
export class CheckBox extends VrControl
{
    constructor(element: HTMLElement, options?: CheckBoxOptions | null);
    checked<T extends boolean | null>(state?: CheckboxStateEnum | boolean, triggerChange?: boolean): T;
    check(): void;
    text(text?: string): string;
    clear(triggerChange?: boolean): void;
    getOptions(): CheckBoxOptions;
    error(text?: string, position?: ErrorPositionEnum, showIcon?: boolean): void;
    hideError(): void;
}
class CheckBoxEvent
{
    sender: CheckBox;
}
export class CheckBoxCheckEvent extends CheckBoxEvent
{
    stateEnum: CheckboxStateEnum;
    checked: boolean;
    shiftKey: boolean;
    ctrlKey: boolean;
}
export
{};
//#endregion

//#region checkboxList
export class CheckBoxListOptions extends VrControlOptions
{
    items?: CheckBoxItem[];
    orientation?: OrientationEnum;
    allChecked?: boolean;
    listName?: string;
    marginBetween?: number;
    onBeforeSelect?(e: CheckBoxListSelectEvent): void;
    onSelect?(e: CheckBoxListSelectEvent): void;
}
export class CheckBoxList extends VrControl
{
    constructor(element: HTMLElement, options?: CheckBoxListOptions | null);
    items(items?: CheckBoxItem[]): CheckBoxItem[];
    checkAll(triggerChange?: boolean): void;
    unCheckAll(triggerChange?: boolean): void;
    value(values?: string[], state?: boolean, triggerChange?: boolean): string[];
    valueTag(tagList?: any[], state?: boolean, triggerChange?: boolean): any[];
    isChecked(value: string): boolean;
    text(value: string, text?: string): string;
    clear(checkAll?: boolean, triggerChange?: boolean): void;
    clearItems(): void;
    getOptions(): CheckBoxListOptions;
    enable(): void;
    disable(): void;
}
class CheckBoxItem
{
    text?: string;
    value?: string | number;
    checked?: boolean;
    threeState?: boolean;
    tag?: any;
    onCheck?: (e: CheckBoxCheckEvent) => void;
}
class CheckBoxListSelectEvent extends VrControlsEvent
{
    sender: CheckBoxList;
    checkedValues?: string[];
    value?: string;
    checked?: boolean;
}
export
{};
//#endregion

//#region colorPicker
export class ColorPickerOptions extends VrControlOptions
{
    showInput?: boolean;
    mode?: ColorPickerModeEnum;
    palette?: boolean | string[];
    closeButton?: boolean | string;
    alphaChannel?: boolean;
    value?: string | ColorPickerRgbaValue;
    hexUppercase?: boolean;
    clearButton?: boolean;
    hideOnPaletteClick?: boolean;
    emptyMessage?: string;
    onChange?: (e: ColorPickerChangeEvent) => void;
}
export class ColorPicker extends VrControl
{
    constructor(element: HTMLElement, options?: ColorPickerOptions | null);
    value(value?: string | ColorPickerRgbaValue, triggerChange?: boolean): string | null;
    valueHex(value?: string, triggerChange?: boolean): any;
    valueRgba(value?: ColorPickerRgbaValue, triggerChange?: boolean): any;
    randomize(triggerChange?: boolean): string | null;
    open(): void;
    close(): void;
    mode(): ColorPickerModeEnum;
    triggerChange(): void;
    clear(triggerChange?: boolean): void;
    enable(): void;
    disable(): void;
    getOptions(): ColorPickerOptions;
}
class ColorPickerEvent extends VrControlsEvent
{
    sender: ColorPicker;
}
class ColorPickerChangeEvent extends ColorPickerEvent
{
    value: string | null;
    valueHex: string;
    valueRgba: string;
}
export
{};
//#endregion

//#region comboBox
export class ComboBoxOptions extends VrControlOptions
{
    mode?: ComboBoxTypeEnum;
    checkboxes?: boolean;
    freeText?: boolean;
    filter?: boolean;
    treeMode?: ComboBoxTreeModeEnum;
    value?: string | number | string[] | number[];
    webService?: ComboBoxWebServiceSettings;
    items?: ComboBoxItem[];
    clearButton?: boolean;
    addButton?: boolean | ButtonOptions;
    nullable?: boolean | ComboBoxNullableItem;
    textAlign?: TextAlignEnum;
    placeholder?: string;
    popupSettings?: PopupSettings;
    allSelectedMessage?: string;
    textEllipsis?: boolean;
    onlyIcon?: boolean;
    icon?: IconClass;
    imageUrl?: string;
    checkAll?: boolean;
    showCheckAll?: boolean | CheckAllSettings;
    tooltip?: string;
    template?: (e: ComboBoxTemplateEvent) => string;
    onBeforeChange?(e: ComboBoxChangingEvent): void;
    onAfterChange?(e: ComboBoxChangeEvent): void;
    onKeyDown?(e: ComboBoxKeyDownEvent): void;
    onKeyUp?(e: ComboBoxKeyUpEvent): void;
    onEnterKey?(e: ComboBoxEnterKeyEvent): void;
    onBeforeOpen?(e: ComboBoxOpenEvent): void;
    onAfterOpen?(e: ComboBoxOpenEvent): void;
    onClose?(e: ComboBoxCloseEvent): void;
    onItemDataBound?(e: ComboBoxItemDataBoundEvent): void;
    onBlur?(e: ComboBoxBlurEvent): void;
    onClear?(e: ComboBoxClearEvent): void;
    onPaste?(e: ComboBoxPasteEvent): void;
}
export class ComboBox extends VrControl
{
    constructor(element: HTMLElement, options?: ComboBoxOptions | null);
    close(): void;
    open(): void;
    datasource(items?: ComboBoxItem[], triggerChange?: boolean): ComboBoxItem[];
    items(items?: ComboBoxItem[], triggerChange?: boolean): ComboBoxItem[];
    values(): any[];
    getCheckedItems(onlyChildren?: boolean): ComboBoxItem[];
    getCheckedValues(onlyChildren?: boolean): string[];
    getSelectedItem<T extends ComboBoxItem>(): T;
    addItem(item: ComboBoxItem, reloadCombo?: boolean, triggerChange?: boolean, sortBy?: SortByComboSettings): void;
    addItems(items: ComboBoxItem[], reloadCombo?: boolean, triggerChange?: boolean): void;
    removeItem(itemOrId: ComboBoxItem | string | number, reloadCombo?: boolean): void;
    removeItems(items: ComboBoxItem[] | string[] | number[], reloadCombo?: boolean): void;
    getItemByValue(value: string): ComboBoxItem;
    getItemByText(text: string): ComboBoxItem;
    getElementsByValue(value: string): HTMLElement[] | undefined;
    getRootItems(): ComboBoxItem[];
    getRootValues(): string[];
    getLeafItems(): ComboBoxItem[];
    getLeafValues(): string[];
    getChildrenItems(): ComboBoxItem[];
    getChildrenValues(): string[];
    text(text?: string): string;
    placeholder(text?: string): string;
    value<T extends string | string[] | number>(value?: ComboBoxItem | string | number | string[] | number[] | null, triggerChange?: boolean, callback?: null | ((e: ComboBoxChangeEvent) => void)): T | null;
    select(index?: number, triggerChange?: boolean): void;
    index(index?: number, triggerChange?: boolean): void;
    icon(icon?: IconClass | string | null): HTMLElement | null;
    isEmpty(): boolean;
    error(): void;
    hideError(): void;
    checkAll(triggerChange?: boolean): void;
    unCheckAll(triggerChange?: boolean): void;
    check(value: string, triggerChange?: boolean): void;
    unCheck(value: string, triggerChange?: boolean): void;
    allChecked(): boolean;
    clear(triggerChange?: boolean): void;
    clearItems(): void;
    popup(): any;
    focus(open?: boolean): void;
    showClearButton(): void;
    hideClearButton(): void;
    button(): Button;
    buttonVisible(state?: boolean): boolean;
    showButton(): void;
    hideButton(): void;
    buttonEnabled(state?: boolean): boolean;
    enableButton(): void;
    disableButton(): void;
    enable(): void;
    disable(): void;
    change(callBack?: Function): void;
}
export class DropDown extends ComboBox
{
}
class ComboBoxNullableItem
{
    text?: string;
    value?: string;
}
class CheckAllSettings
{
    triggerChange?: boolean;
}
class ComboBoxKeyDownEvent extends VrControlsEvent
{
    sender: ComboBox;
    event: any;
}
class ComboBoxKeyUpEvent extends VrControlsEvent
{
    sender: ComboBox;
    event: any;
}
class ComboBoxPasteEvent extends VrControlsEvent
{
    sender: ComboBox;
    event: any;
    pastedValue: string;
    value: string;
}
class ComboBoxEnterKeyEvent extends VrControlsEvent
{
    sender: ComboBox;
    value: any;
}
class ComboBoxCloseEvent extends VrControlsEvent
{
    sender: ComboBox;
    beforeValue: any;
    afterValue: any;
}
class ComboBoxOpenEvent extends VrControlsEvent
{
    sender: ComboBox;
    value: any;
}
class ComboBoxItemDataBoundEvent extends VrControlsEvent
{
    sender: ComboBox;
    element: HTMLElement;
    dataItem: any;
}
class ComboBoxBlurEvent extends VrControlsEvent
{
    sender: ComboBox;
    value: any;
}
export
{};
//#endregion

//#region confirm
export class ConfirmOptions
{
    textOkButton?: string;
    textCancelButton?: string;
    content?: string;
    title?: string;
    width?: number | string;
    height?: number | string;
    textAlign?: TextAlignEnum;
    css?: string;
    cssContainer?: string;
    onContentLoaded?(e: ContentConfirmLoadedEvent): void;
}
export class Confirm
{
    constructor(text?: string | null, options?: ConfirmOptions | null);
    open(): Promise<any>;
    close(): void;
}
class ContentConfirmLoadedEvent extends VrControlsEvent
{
    sender: Confirm;
    contentElement: HTMLElement;
}
export
{};
//#endregion

//#region datePicker
export class DatePickerOptions extends VrControlOptions
{
    defaultDay?: DefaultDayEnum;
    mode?: DateModeEnum;
    value?: Date;
    min?: Date;
    max?: Date;
    timeInterval?: number;
    format?: DateFormatEnum | Intl.DateTimeFormatOptions;
    todayLabel?: boolean;
    otherMonthDays?: boolean;
    tooltip?: string;
    depth?: DateDepthEnum;
    nullable?: boolean;
    popupSettings?: PopupSettings;
    onBeforeChange?(e: DatePickerChangingEvent): void;
    onAfterChange?(e: DatePickerChangeEvent): void;
    onKeyUp?(e: DatePickerKeyUpEvent): void;
    onKeyDown?(e: DatePickerKeyDownEvent): void;
    onEnterKey?(): void;
    onFocus?(e: DatePickerFocusEvent): void;
    onBlur?(e: DatePickerBlurEvent): void;
}
export class DatePicker extends VrControl
{
    constructor(element: HTMLElement, options?: DatePickerOptions | null);
    close(): void;
    open(): void;
    value(date?: Date | null, triggerChange?: boolean): Date | null;
    mode(mode?: DateModeEnum): DateModeEnum | undefined;
    min(min?: Date): Date | undefined;
    max(max?: Date): Date | undefined;
    format(format?: DateFormatEnum, changeText?: boolean): DateFormatEnum | Intl.DateTimeFormatOptions | undefined;
    clear(triggerChange?: boolean): void;
    isEmpty(): boolean;
    error(): void;
    hideError(): void;
    enable(): void;
    disable(): void;
    change(): void;
}
export class TimePicker extends DatePicker
{
}
export class DateTimePicker extends DatePicker
{
}
export class MonthPicker extends DatePicker
{
}
export class YearPicker extends DatePicker
{
}
class DatePickerEvent extends VrControlsEvent
{
    sender: DatePicker;
    value: Date | null;
}
class DatePickerChangeEvent extends DatePickerEvent
{
}
class DatePickerChangingEvent extends DatePickerEvent
{
    previousValue?: Date | null;
}
export enum ActualViewEnum
{
    Day = 0,
    Month = 1,
    Year = 2,
    Decade = 3
}
class DatePickerFocusEvent extends DatePickerEvent
{
}
class DatePickerBlurEvent extends DatePickerEvent
{
}
class DatePickerKeyUpPressEvent extends VrControlsEvent
{
    sender: DatePicker;
    text: string;
    key: string;
    shiftKey: boolean;
    altKey: boolean;
    ctrlKey: boolean;
    enterKey: boolean;
    backSpaceKey: boolean;
    tabKey: boolean;
}
class DatePickerKeyUpEvent extends DatePickerKeyUpPressEvent
{
}
class DatePickerKeyDownEvent extends DatePickerKeyUpPressEvent
{
}
export
{};
//#endregion

//#region dialog
export class DialogOptions
{
    content?: string;
    title?: string;
    width?: number;
    height?: number;
    textAlign?: TextAlignEnum;
    footerItems?: WindowFooterItem[];
    css?: string;
    cssContainer?: string;
    hideCloseIcon?: boolean;
    onContentLoaded?(e: ContentDialogLoadedEvent): void;
    onClose?: () => void;
}
export class Dialog
{
    constructor(text?: string | null, options?: DialogOptions | null);
    open(): void;
    close(): void;
}
class ContentDialogLoadedEvent extends VrControlsEvent
{
    sender: Dialog;
    contentElement: HTMLElement;
}
export
{};
//#endregion

//#region div
export class DivOptions extends VrControlOptions
{
    text?: string;
    fontSize?: number;
    tooltip?: string;
    inline?: boolean;
    colorSettings?: DivColorSettings;
    border?: DivBorderSettings | boolean;
}
export class Div extends VrControl
{
    constructor(element: HTMLElement, options?: DivOptions | null);
    text(text?: string): string;
    appendText(text: string): void;
    getOptions(): DivOptions;
}
//#endregion

//#region editor
export class EditorOptions extends VrControlOptions
{
    text?: string;
    placeholder?: string;
    resizable?: boolean;
    language?: string;
    pasteImages?: boolean;
    toolbarMode?: vrEditorToolbarModeEnum;
    menu?: boolean | vrEditorMenu;
    toolbar?: boolean | vrEditorItemEnum[] | string;
    plugins?: string;
    customToolItems?: vrEditorCustomItem[];
    customMenuItems?: vrEditorCustomMenuItem[];
    baseUrl?: string;
    speechRecognizer?: vrEditorSpeechRecognizerSettings | boolean;
    fontSize?: vrEditorFontSizeSettings;
    browserSpellCheck?: boolean;
    pasteAsText?: boolean;
    replacePtagWithDiv?: boolean;
    statusbar?: boolean;
    onFocus?: (e: EditorOnFocusEvent) => void;
    onBlur?: (e: EditorOnBlurEvent) => void;
    onCommand?: (e: EditorOnCommandEvent) => void;
    onSetContent?: (e: EditorSetContentEvent) => void;
    onBeforeResize?: (e: EditorOnResizingEvent) => void;
    onAfterResize?: (e: EditorOnResizedEvent) => void;
    onKeyUp?: (e: EditorOnKeyUpEvent) => void;
    onKeyDown?: (e: EditorOnKeyDownEvent) => void;
    onInit?: (e: EditorOnInitEvent) => void;
    onDrop?: (e: EditorDropEvent) => void;
    onDragEnter?: (e: EditorDragEnterEvent) => void;
    onDragOver?: (e: EditorDragOverEvent) => void;
    onDragLeave?: (e: EditorDragLeaveEvent) => void;
}
export class Editor extends VrControl
{
    constructor(element: HTMLElement, options?: EditorOptions | null);
    settings(): TinyMceSettings;
    tinyMceControl(): any;
    value(text?: string | null, html?: boolean): string;
    insertTextAtCursor(text: string): void;
    appendText(text: string, html?: boolean): string;
    body(): HTMLBodyElement;
    speechRecognizer(): SpeechRecognizer;
    clear(): void;
    focus(): void;
    addMenuItem(item: vrEditorCustomMenuItem): void;
    getOptions(): EditorOptions;
    enable(): void;
    disable(): void;
}
class TinyMceSettings
{
    readonly?: boolean;
    placeholder?: string;
    resize?: boolean;
    elements?: string;
    toolbar_mode?: vrEditorToolbarModeEnum;
    paste_data_images?: boolean;
    language?: string;
    toolbar?: string;
    plugins?: string;
    paste_enable_default_filters?: boolean;
    paste_word_valid_elements?: string;
    paste_retain_style_properties?: string;
    menubar?: boolean;
    menu?: any;
}
class vrEditorMenu
{
    file?: boolean | vrEditorMenuItem;
    edit?: boolean | vrEditorMenuItem;
    view?: boolean | vrEditorMenuItem;
    insert?: boolean | vrEditorMenuItem;
    format?: boolean | vrEditorMenuItem;
    tools?: boolean | vrEditorMenuItem;
    table?: boolean | vrEditorMenuItem;
}
class vrEditorMenuItem
{
    items?: vrEditorItemEnum[] | string;
    title?: string;
}
class EditorEvent extends VrControlsEvent
{
    sender: Editor;
    realEvent: any;
}
export class EditorItemClickEvent extends EditorEvent
{
}
class EditorOnFocusEvent extends EditorEvent
{
}
class EditorOnBlurEvent extends EditorEvent
{
}
class EditorOnCommandEvent extends EditorEvent
{
    command: string;
    type: string;
    value: any;
}
class EditorSetContentEvent extends EditorEvent
{
    content: string;
    element: HTMLElement;
    format: string;
    type: string;
}
class EditorOnResizingEvent extends EditorEvent
{
    height: number;
    width: number;
    target: HTMLElement;
    type: string;
}
class EditorOnResizedEvent extends EditorEvent
{
    height: number;
    width: number;
    target: HTMLElement;
    type: string;
}
class EditorOnKeyUpEvent extends EditorEvent
{
    key: string;
    keyCode: string;
}
class EditorOnKeyDownEvent extends EditorEvent
{
    key: string;
    keyCode: string;
}
class EditorOnInitEvent extends EditorEvent
{
    event: any;
}
class EditorDragDropEvent extends EditorEvent
{
    event: any;
    element: HTMLElement;
}
class EditorDropEvent extends EditorDragDropEvent
{
    files: File[];
}
class EditorDragEnterEvent extends EditorDragDropEvent
{
}
class EditorDragOverEvent extends EditorDragDropEvent
{
}
class EditorDragLeaveEvent extends EditorDragDropEvent
{
}
export
{};
//#endregion

//#region grid
export class GridOptions extends VrControlOptions
{
    columns?: GridColumn[];
    toolbar?: GridToolbarItem[];
    height?: string | number | GridHeightModeEnum;
    dataSource?: any[];
    rebind?: GridRebindRequest;
    excel?: GridExcelRequest;
    tooltip?: boolean;
    checkboxes?: boolean | GridCheckboxModeEnum;
    dataSourceFieldId?: string;
    rowHeight?: number;
    multilineRows?: boolean;
    multilineHeader?: boolean;
    hideEditButton?: boolean;
    autoWindowSettings?: GridAutoWindowSettings;
    mode?: GridModeEnum;
    filterable?: boolean;
    alternateRowColors?: boolean | string;
    hoverRowColor?: boolean;
    rowColorProperty?: string;
    rowTextColorProperty?: string;
    pageSize?: number | boolean;
    largePageSize?: boolean;
    footer?: boolean | GridFooterSettings;
    header?: boolean;
    resizable?: boolean;
    reorderable?: boolean;
    lockable?: boolean;
    groupBy?: string[] | GridGroupBySettings | null;
    groupable?: boolean;
    sortable?: boolean;
    sortBy?: string | GridSortSettings | null;
    serverBinding?: boolean | GridServerBindSettings;
    roundingSettings?: NumberFormatRoundingSettings;
    sticker?: string | GridStickerSettings;
    fixDatasourceWithDate?: boolean;
    layoutSettings?: GridLayoutSettings | boolean;
    onDataSourceChanged?: () => void;
    onDataBound?: (e: GridOnDataBoundEvent) => void;
    onRowDataBound?: (e: GridOnRowDataBoundEvent) => void | string;
    onSelectRow?: (e: GridSelectRowEvent) => void;
    onSelectAllRows?: (e: GridSelectAllRowsEvent) => void;
    onUnselectRow?: (e: GridUnselectRowEvent) => void;
    onUnselectAllRows?: (e: GridUnselectAllRowsEvent) => void;
    onGroupExpandCollapse?: (e: GridGroupExpandCollapseEvent) => void;
    onGroupEditClick?: (e: GridGroupEditClickEvent) => void;
    onPageSelected?: (e: GridPageSelectedEvent) => void;
    onScroll?: (e: GridScrollEvent) => void;
    onBeforeExcelExport?: (e: GridBeforeExcelExportEvent) => void;
    onAfterExcelExport?: (e: GridAfterExcelExportEvent) => void;
}
export class Grid extends VrControl
{
    constructor(element: HTMLElement, options?: GridOptions | null);
    rebind(parameters?: any | null, filterWithWebService?: boolean, keepInfo?: boolean, loadingElement?: boolean | HTMLElement | JQuery | string): any;
    rebindSpecificRows(itemIdList: number[], update?: boolean, keepInfo?: boolean, loadingElement?: boolean | HTMLElement | JQuery | string): void;
    clear(triggerChange?: boolean): void;
    originalDataSource(): any[];
    dataSource(dataItems?: any[], clearFilters?: boolean, keepInfo?: boolean): any[];
    update(triggerDataBound?: boolean, keepInfo?: boolean): void;
    updateRow(dataItem: any, rebind?: boolean): void;
    updateRows(dataItems: any[], rebind?: boolean): void;
    addRow(dataItem: any, rebind?: boolean): void;
    addRows(dataItems: any[], rebind?: boolean): void;
    deleteRow(dataItemId: number | string, rebind?: boolean): void;
    deleteRows(dataItemIdList: (number | string)[], rebind?: boolean): void;
    rows(): GridRow[];
    getAllItems(toSavePurpose?: boolean): any[];
    getCheckedItems(): any[];
    getCheckedValues(): any[];
    getDeletedItems(): any[];
    getDeletedItemValues(key?: string): any[];
    clearSelection(triggerChange?: boolean): void;
    checkAllRows(triggerChange?: boolean): void;
    unCheckAllRows(triggerChange?: boolean): void;
    selectRowsByIndexes(indexes: number[], triggerChange?: boolean): void;
    selectRowByIndex(index: number, triggerChange?: boolean): void;
    selectRows(itemIdList: string[], property?: string, triggerChange?: boolean): void;
    selectRow(itemId: string, triggerChange?: boolean): void;
    unselectRows(itemIdList: string[], property?: string, triggerChange?: boolean): void;
    unselectRow(itemId: string, triggerChange?: boolean): void;
    removeSort(updateDataSource?: boolean): void;
    sort(field: string, gridSortModeEnum?: GridSortDirectionEnum, rebind?: boolean): void;
    column(field: string): GridColumn;
    columnTitle(field: string, title?: string): string | undefined;
    hideColumns(fields: string[], update?: boolean): void;
    hideColumn(field: string, updateDataSource?: boolean): void;
    hideCheckboxColumn(updateDataSource?: boolean): void;
    showColumns(fields: string[], update?: boolean): void;
    showColumn(field: string, updateDataSource?: boolean): void;
    showCheckboxColumn(updateDataSource?: boolean): void;
    showOnlyThisColumns(fieldList: string[], updateDataSource?: boolean): void;
    columnVisible(value: string, state: boolean, updateDataSource?: boolean): void;
    columnCheckboxVisible(state: boolean, updateDataSource?: boolean): void;
    lockColumns(fields: string[], update?: boolean): void;
    lockColumn(field: string, update?: boolean): void;
    unlockColumns(fields: string[], update?: boolean): void;
    unlockColumn(field: string, update?: boolean): void;
    lockedColumns(): GridColumn[];
    thereAreLockedColumns(): boolean | undefined;
    removeGroup(field: string, updateDataSource?: boolean): void;
    removeGroups(fields: string[], updateDataSource?: boolean): void;
    removeAllGroups(updateDataSource?: boolean): void;
    addGroup(field: string | GridGroupByItem, updateDataSource?: boolean, sortBySettings?: GridSortSettings, internalSortBy?: GridSortSettings): void;
    addGroups(fields: (string | GridGroupByItem)[], updateDataSource?: boolean, sortBy?: GridSortSettings, internalSortBy?: GridSortSettings): void;
    clearFilters(updateDataSource?: boolean, rebind?: boolean): void;
    addFilter(field: string, filterCondition: GridFilterSettings, applyFilters?: boolean): void;
    removeFilters(fields: string[], applyFilters?: boolean): void;
    removeFilter(field: string, applyFilters?: boolean): void;
    updateFilter(field: string, filterCondition: GridFilterSettings, applyFilters?: boolean): void;
    drag(element: HTMLElement | JQuery | string, dragEvent?: DragSupportEvent): void;
    sticker(text?: string): Label;
    stickerVisible(state?: boolean): boolean;
    showSticker(): void;
    hideSticker(): void;
    getTotals(dataItems: any[]): any[];
    fixDatasourceWithVrDatetime(items: any[]): any[];
    fixDatasourceWithDate(items: any[]): void;
    pageSize(pageSize?: number | boolean, update?: boolean, triggerDataBound?: boolean): number;
    pageSelected(page?: number, update?: boolean): number;
    checkboxesMode(mode?: GridCheckboxModeEnum): boolean | GridCheckboxModeEnum | undefined;
    focus(field?: string): void;
    scrollTo(rowIndex: number): void;
    getOptions(): GridOptions;
    recalculateWidth(fixColGroup?: boolean): void;
    height(height?: number | string): any;
    recalculateHeight(afterFilter?: boolean): void;
    enable(state?: boolean | string): void;
    excelExport(fileName?: string, exportHiddenColumns?: boolean): void;
    visibleToolbar(state?: boolean): any;
    showToolbar(): void;
    hideToolbar(): void;
    toolbar(): HTMLElement;
    toolbarItem<T extends VrControl>(value: string): T;
    visibleToolbarItem(value: string, state?: boolean): boolean;
    showToolbarItem<T extends VrControl>(value: string): void;
    hideToolbarItem<T extends VrControl>(value: string): void;
    enabledToolbarItem(value: string, state?: boolean): boolean;
    enableToolbarItem<T extends VrControl>(value: string): void;
    disableToolbarItem<T extends VrControl>(value: string): void;
    removeToolbarItem(value: string): void;
    addToolbarItems(toolbarItems: GridToolbarItem[]): void;
    addToolbarItem(toolbarItem: GridToolbarItem): void;
    saveLayout(layoutName: string, callBack?: Function): void;
    customLayouts(): GridLayout[];
    activeLayout(): GridLayout | null;
}
class GridWebApiRequest
{
    authKey?: string;
    method?: string;
    successNotificationMessage?: boolean | string;
    errorNotificationMessage?: boolean | string;
    rebindGridAfterSave?: boolean;
    rebindGridAfterError?: boolean;
    closeWindowAfterError?: boolean;
    otherParameters?: any;
    loadingElement?: boolean | HTMLElement | JQuery | string;
    callback?: (response?: any) => void;
    callbackBeforeDatasourceChange?: (response?: any) => void;
    errorCallback?: (message?: string) => void;
    parameters?: () => any;
}
export class GridHeaderAndCellSettings
{
    textAlign?: GridAlignEnum;
    backgroundColor?: string;
    color?: string;
    tooltip?: boolean | string | ((e: GridTooltipEvent) => string);
    css?: string;
}
export class GridHeaderSettings extends GridHeaderAndCellSettings
{
    icon?: IconClass;
}
export class GridCellSettings extends GridHeaderAndCellSettings
{
    zeroIfNull?: boolean;
}
export class GridControlsSettings
{
    onClick?: (e: GridControlsClickEvent) => void;
    confirmationMessage?: string;
    value?: string;
    css?: string;
    class?: string;
    visible?: boolean;
    enabled?: boolean;
    tooltip?: string;
}
export class GridCustomSettings extends GridControlsSettings
{
    template: string;
    filterFields?: string[];
}
export class GridIconSettings extends GridControlsSettings
{
    icon?: IconClass;
    imageUrl?: string;
    color?: string;
}
export class GridImageSettings extends GridControlsSettings
{
    imageUrl?: string;
    base64Bytes?: string;
}
export class GridLabelSettings extends GridControlsSettings
{
    text?: string;
    underlineMode?: GridLabelUnderlineMode;
    bold?: boolean;
    color?: string;
    noBr?: boolean;
}
export class GridRebindRequest extends GridWebApiRequest
{
    itemsPropertyName?: string;
    rebindAtStartup?: boolean;
    clearFilters?: boolean;
    specificItemIdListPropertyName?: string;
}
export class GridExcelRequest extends GridWebApiRequest
{
    fileName?: string;
}
class GridControlsClickEvent
{
    dataItem: any;
}
export class GridTemplateEvent
{
    dataItem: any;
    className?: string;
    element?: HTMLTableCellElement;
    empty?: boolean;
}
export class GridTooltipEvent
{
    dataItem: any;
    element?: HTMLTableCellElement;
    empty: boolean;
}
export class GridOnDataBoundEvent
{
    sender: Grid;
}
export class GridOnRowDataBoundEvent
{
    sender: Grid;
    rowElement: HTMLTableRowElement;
    dataItem: any;
    realDataItem: any;
    empty?: boolean;
}
export class GridSelectRowEvent
{
    sender: Grid;
    rowElement: HTMLTableRowElement;
    dataItem: any;
    checked: boolean;
    empty: boolean;
    index: number;
    shiftKey: boolean;
    fromCheckbox: boolean;
}
export class GridSelectAllRowsEvent
{
    sender: Grid;
}
export class GridUnselectRowEvent
{
    sender: Grid;
    rowElement: HTMLTableRowElement;
    dataItem: any;
}
export class GridUnselectAllRowsEvent
{
    sender: Grid;
}
export class GridToolbarClickEvent
{
    sender: any;
    type: GridToolbarItemType;
    isDefaultPrevented: boolean;
    deletedItems?: any[];
    preventDefault(): void;
}
export class GridToolbarSwitchSettings
{
    labelOff?: string;
    labelOn?: string;
    checked?: boolean;
    onCheck?: (e: GridToolbarSwitchEvent) => void;
}
class GridToolbarSwitchEvent
{
    checked: boolean;
}
export class GridToolbarDeleteRequest extends GridWebApiRequest
{
    deletedValuesPropertyName?: string;
    valuePropertyName?: string;
}
export class GridFooterSettings
{
    maxVisiblePages?: number;
    totalElements?: boolean | ((e: GridTotalElementTemplateEvent) => string | number);
    showPagination?: boolean;
    showPageSize?: boolean;
    showSettings?: boolean;
}
class GridTotalElementTemplateEvent
{
    firstIndex?: number;
    lastIndex?: number;
    dataItems: any[];
    pageSelected: number;
    numberOfPages: number;
}
export class GridExcelRow
{
    cells: GridExcelCell[];
}
class GridExcelCell
{
    title: string | undefined;
    field: string;
    text?: string;
    bold?: boolean;
    type?: GridColumnTypeEnum;
    width?: number;
    cellSettings?: GridHeaderAndCellSettings;
    aggregate?: GridAggregateMode;
    decimalDigits?: number;
    hidden?: boolean;
    locked?: boolean;
    backgroundColor: string;
    color: string;
    roundingSettings?: NumberFormatRoundingSettings;
}
class GridAutoWindowSettings
{
    save?: GridSaveRequest;
    options?: GridAutoWindowOption;
    onBeforeOpen?: (e: AutowindowBeforeOpenEvent) => void;
    onAfterOpen?: (e: AutowindowAfterOpenEvent) => void;
    onBeforeSave?: (e: AutowindowBeforeSaveEvent) => void;
    onAfterSave?: (e: AutowindowAfterSaveEvent) => void;
    onBeforeClose?: (e: AutowindowBeforeCloseEvent) => void;
    onAfterClose?: (e: AutowindowAfterCloseEvent) => void;
}
class GridAutoWindowOption
{
    titleNew?: string;
    titleEdit?: string;
    height?: number | string;
    width?: number | string;
    showSaveButton?: boolean;
    showCancelButton?: boolean;
    textSaveButton?: string;
    textCancelButton?: string;
    confirmationMessage?: string;
}
class GridSaveRequest extends GridWebApiRequest
{
    itemPropertyName?: string;
}
class AutoWindowEvent extends VrControlsEvent
{
    sender: Grid;
    window: Window;
    dataItem: any;
    columns?: GridColumn[];
}
class AutowindowBeforeOpenEvent extends AutoWindowEvent
{
}
class AutowindowAfterOpenEvent extends AutoWindowEvent
{
}
class AutowindowBeforeSaveEvent extends AutoWindowEvent
{
}
class AutowindowAfterSaveEvent extends AutoWindowEvent
{
}
class AutowindowBeforeCloseEvent extends AutoWindowEvent
{
}
class AutowindowAfterCloseEvent extends AutoWindowEvent
{
}
export class GridFilterSettings
{
    type: GridColumnTypeEnum;
    dateFilterSettings?: GridDateFilterSettings | null;
    numberFilterSettings?: GridNumberFilterSettings | null;
    checkboxFilterSettings?: GridCheckboxFilterSettings | null;
    stringFilterSettings?: GridStringFilterSettings | null;
}
class GridDateFilterSettings
{
    filterTypeEnum: GridDateFilterTypeEnum;
    dateFrom: Date;
    dateTo?: Date | null;
    specificValues: any[];
}
class GridNumberFilterSettings
{
    filterTypeEnum: GridNumberFilterTypeEnum;
    numberFrom: number;
    numberTo?: number | null;
    specificValues: any[];
}
class GridCheckboxFilterSettings
{
    value: boolean;
}
class GridStringFilterSettings
{
    text: string;
    filterTypeEnum: GridStringFilterTypeEnum;
    specificValues: any[];
}
class DragSupportEvent
{
    onDragged?: null | ((e: DragEveryEvent) => void);
    onDragging?: null | ((e: DragEveryEvent) => void);
}
class DragEveryEvent
{
    left: number;
    top: number;
    element: HTMLElement;
}
class GridLayoutSettings
{
    name?: string;
    get?: GetLayoutListRequest;
    save?: SaveLayoutRequest;
    load?: LoadLayoutRequest;
}
class SaveLayoutRequest
{
    method: string;
    authKey?: string;
    layoutJson?: string;
    pageName?: string;
    gridName?: string;
    layoutName?: string;
    layoutPropertyName?: string;
}
class LoadLayoutRequest
{
    method: string;
    authKey?: string;
    pageName?: string;
    gridName?: string;
    layoutName?: string;
    layoutPropertyName?: string;
}
class GetLayoutListRequest
{
    method: string;
    authKey?: string;
    pageName?: string;
    gridName?: string;
    layoutsPropertyName?: string;
}
class GridLayout
{
    layoutName: string;
    layoutLastEditDate: Date;
    id: number;
    layoutJson: string;
}
export class GridRow
{
    element: HTMLElement;
    cells: HTMLElement[];
    index: number;
    dataItemId: string;
    id: string;
    findControl<T extends VrControl>(uniqueName: string): T | null;
}
export
{};
//#endregion

//#region groupBox
export class GroupBoxOptions extends VrControlOptions
{
    title?: string;
    content?: string | HTMLElement | JQuery;
    collapsable?: boolean;
    checkbox?: boolean | string;
    startingCollapsed?: boolean;
    startingChecked?: boolean;
    items?: GroupBoxItem[];
    scrollable?: boolean;
    onCheckboxClick?: (e: GroupBoxOnCheckboxClickEvent) => void;
    onCollapse?: (e: GroupBoxOnCollapseEvent) => void;
    onExpand?: (e: GroupBoxOnExpandEvent) => void;
}
export class GroupBox extends VrControl
{
    constructor(element: HTMLElement, options?: GroupBoxOptions | null);
    content(content?: string | JQuery | HTMLElement): HTMLElement;
    title(title?: string): any;
    collapse(): void;
    expand(): void;
    collapsed(state?: boolean): boolean;
    item(value: string): Button | null;
    enableItem(value: string): void;
    disableItem(value: string): void;
    showItem(value: string): void;
    hideItem(value: string): void;
    check(triggerChange?: boolean): void;
    unCheck(triggerChange?: boolean): void;
    checked(state?: boolean, triggerChange?: boolean): boolean | null;
    getOptions(): GroupBoxOptions;
}
class GroupBoxOnCheckboxClickEvent
{
    sender: GroupBox;
    checked: boolean;
}
class GroupBoxOnCollapseEvent
{
    sender: GroupBox;
}
class GroupBoxOnExpandEvent
{
    sender: GroupBox;
}
class GroupBoxItem extends ButtonOptions
{
}
export
{};
//#endregion

//#region icon
export class IconOptions extends VrControlOptions
{
    value?: string | IconClassicLight;
    color?: string;
    fontSize?: number | string;
    cursorPointer?: boolean;
    confirmationMessage?: string;
    tooltip?: string;
    onClick?: (e: VrIconClickEvent) => void;
    onRejectedConfirm?: () => void;
}
export class Icon extends VrControl
{
    constructor(element: HTMLElement, options?: IconOptions | null);
    value(value?: string | IconClassicLight): string | undefined;
    fontSize(fontSize?: number | string): string | number | undefined;
    color(color?: string): string | undefined;
    click(): void;
    getOptions(): IconOptions;
}
class VrIconClickEvent extends VrControlsEvent
{
    sender: Icon;
    value?: string | IconClassicLight;
}
export
{};
//#endregion

//#region image
export class ImageOptions extends VrControlOptions
{
    value?: string;
    base64?: boolean;
    tooltip?: string;
    position?: ImagePositionTypeEnum;
    toolbarItems?: ImageToolbarItem[];
    overlayDescription?: boolean | string;
    onHover?(): void;
    onLeave?(): void;
    onClick?(e: ImageClickEvent): void;
}
export class Image extends VrControl
{
    constructor(element: HTMLElement, options?: ImageOptions | null);
    value(pathOrBytes?: string, fileName?: string, mimeType?: string): string;
    overlayDescription(description?: string): string;
    toolbar(): any;
    clear(): void;
    enable(): void;
    disable(): void;
    getOptions(): ImageOptions;
}
class ImageToolbarItem
{
    type?: ImageToolbarTypeEnum;
    icon?: IconClass;
    confirmationMessage?: string;
    onClick?(e: ImageToolbarClickEvent): void;
}
class ImageToolbarClickEvent
{
    sender: Image;
}
class ImageClickEvent
{
    sender: Image;
}
export
{};
//#endregion

//#region label
export class LabelOptions extends VrControlOptions
{
    text?: string | number | Date;
    value?: string | number | Date;
    key?: string;
    tooltip?: boolean | string;
    colorSettings?: ColorSettings;
    fontSize?: number | string;
    fontFamily?: string;
    bold?: boolean;
    noBr?: boolean | number;
    mode?: LabelModeEnum;
    align?: TextAlignEnum;
    linkCss?: string;
    underlineMode?: LabelUnderlineMode;
    icon?: IconClass;
    onClick?: (e: LabelClickEvent) => void;
    onHover?: (e: LabelHoverEvent) => void;
}
export class Label extends VrControl
{
    constructor(element: HTMLElement, options?: LabelOptions | null);
    value(value?: string | number | Date): string;
    appendText(value: string | number): void;
    tooltip(value?: string | number | Date): string;
    toTel(phoneNumber: string, customText?: string): void;
    toMail(mail: string, customText?: string): void;
    toLink(url: string, customText?: string): void;
    color(value?: string): string;
    backgroundColor(value?: string): string;
    borderColor(value?: string): string;
    isEmpty(): boolean;
    clear(): void;
    getOptions(): LabelOptions;
    click(): void;
}
export class LabelClickEvent extends VrControlsEvent
{
    sender: Label;
    text: string;
}
class LabelHoverEvent extends VrControlsEvent
{
    sender: Label;
    text: string;
}
export
{};
//#endregion

//#region legend
export class LegendOptions extends VrControlOptions
{
    title?: string;
    fontSize?: number | string;
    fontFamily?: string;
    bold?: boolean;
}
export class Legend extends VrControl
{
    constructor(element: HTMLElement, options?: LegendOptions | null);
}
//#endregion

//#region maps
export class MapsOptions extends VrControlOptions
{
    latitude?: number;
    longitude?: number;
    zoom?: number;
    maxZoom?: number;
    credits?: boolean | string;
    marker?: boolean | MapMarker[];
    mode?: MapModeEnum;
    onClick?: (e: MapClickEvent) => void;
    onPinClick?: (e: MapPinClickEvent) => void;
    onHover?: (e: MapPinHoverEvent) => void;
}
export class Maps extends VrControl
{
    constructor(element: HTMLElement, options?: MapsOptions | null);
    map(): any;
    locate(latitude: number, longitude: number): void;
    marker(markers?: MapMarker[]): MapMarker[];
    clear(): void;
    disable(): void;
    enable(): void;
    invalidateSize(): void;
    getOptions(): MapsOptions;
}
class MapEvent extends VrControlsEvent
{
    sender: Maps;
    coordinate: MapCoordinate;
    point: MapPoint;
    color: string;
    dataItem: any;
    element: any;
}
class MapPinClickEvent extends MapEvent
{
}
class MapPinHoverEvent extends MapEvent
{
}
class MapClickEvent extends VrControlsEvent
{
    sender: Maps;
}
class MapCoordinate
{
    latitude: number;
    longitude: number;
}
class MapPoint
{
    x: number;
    y: number;
}
export
{};
//#endregion

//#region multiScheduler
export class MultiSchedulerOptions extends VrControlOptions
{
    resources?: SchedulerResource[];
    datasource?: SchedulerData[];
    dates?: Date[];
    startTime?: Date;
    endTime?: Date;
    timeslotIntervalDuration?: number;
    exportPdf?: boolean;
    showNavigateButtons?: boolean;
    maxDatesNumber?: number;
    onTimeslotClick?: (e: SchedulerTimeslotClickEvent) => void;
    onAvailabilityClick?: (e: SchedulerAvailabilityClickEvent) => void;
    onAppointmentClick?: (e: SchedulerAppointmentClickEvent) => void;
    onNavigate?: (e: MultiSchedulerNavigateEvent) => void;
}
export class MultiScheduler extends VrControl
{
    constructor(element: HTMLElement, options?: MultiSchedulerOptions | null);
    dates(dates?: Date[]): Date[];
    datasource<T extends SchedulerData>(datasource?: T[]): T[];
    availabilities<T extends SchedulerData>(availabilities?: T[]): T[];
    resources(resources?: SchedulerResource[]): SchedulerResource[] | undefined;
    startTime(): Date;
    endTime(): Date;
    timeslotInterval(timeslotIntervalDuration?: number): number;
    rebind(): void;
    getOptions(): MultiSchedulerOptions;
}
class MultiSchedulerNavigateEvent extends VrControlsEvent
{
    sender: MultiScheduler;
    action?: MultiSchedulerNavigateActionEnum;
    dates?: Date[];
}
enum MultiSchedulerNavigateActionEnum
{
    NextDate = 0,
    PrevDate = 1
}
export
{};
//#endregion

//#region notifier
export class Notifier
{
    constructor(text: string, options?: NotifierOptions | null);
    container(): HTMLElement;
    visible(state?: boolean): any;
    show(text?: string): void;
    open(text?: string): void;
    hide(): void;
    close(): void;
    isOnTarget(): boolean;
    target(): HTMLElement;
    targetOptions(): TargetOptions;
    element(): HTMLElement;
    getOptions(): NotifierOptions;
}
export class NotifierShowSettings
{
    duration: number;
    animation?: AnimationShowEnum;
}
export class NotifierCustomHtmlEvent
{
    sender: Notifier;
    divContainer: HTMLElement;
}
class TargetOptions
{
    height: number;
    width: number;
    marginLeft: number;
    marginRight: number;
    marginTop: number;
    marginBottom: number;
    offsetLeft: number;
    offsetTop: number;
}
export class NotifierOnClickEvent
{
    sender: Notifier;
    text?: string;
}
export class NotifierHideSettings
{
    autoHide?: boolean | number;
    clickToHide?: boolean;
    duration?: number;
    animation?: AnimationHideEnum;
}
export
{};
//#endregion

//#region painter
export class PainterOptions extends VrControlOptions
{
    imagePath?: string;
    size?: number;
    color?: string;
    saveSettings?: PainterSaveSettings;
    onMouseDown?: (e: PainterMouseDownEvent) => void;
    onMouseMove?: (e: PainterMouseMoveEvent) => void;
    onMouseUp?: (e: PainterMouseUpEvent) => void;
}
export class Painter extends VrControl
{
    constructor(element: HTMLElement, options?: PainterOptions | null);
    color(color?: string): string;
    size(size?: number): number;
    image(imagePath?: string): any;
    pointTag(tag?: any): any;
    points(points?: [Point[]]): [Point[]];
    draw(): any;
    clear(imagePath?: string): void;
    clearLastRoute(): void;
    clearRoute(tag: any): void;
    save(legendItems?: LegendItem[]): string;
    enable(): void;
    disable(): void;
    getOptions(): PainterOptions;
}
class Point
{
    x: number;
    y: number;
    color: string;
    size: number;
    tag?: any;
}
class LegendItem
{
    color?: string;
    text: string;
}
class PainterSaveSettings
{
    legendWidth?: number;
    legendHeight?: number;
}
class PainterEvent extends VrControlsEvent
{
    sender: Painter;
    event: any;
    points: [Point[]];
}
class PainterMouseDownEvent extends PainterEvent
{
}
class PainterMouseMoveEvent extends PainterEvent
{
}
class PainterMouseUpEvent extends PainterEvent
{
}
export
{};
//#endregion

//#region paypalButton
export class PaypalButtonOptions extends VrControlOptions
{
    setupUrl?: PaypalSetupUrl;
    style?: PaypalStyle;
    intent?: string;
    createOrderRequest?: SetupPaymentRequest;
    approveRequest?: ExecutePaymentRequest;
    enableStandardCardFields?: boolean;
    onRendered?: (e: OnPaypalRenderedEvent) => void;
    onCancel?: (e: OnPaypalCancelEvent) => void;
    onBeforePayment?: (e: OnPaypalBeforePaymentEvent) => void;
}
export class PaypalButton extends VrControl
{
    constructor(element: HTMLElement, options?: PaypalButtonOptions | null);
    getOptions(): PaypalButtonOptions;
}
class PaypalSetupUrl
{
    clientId?: string;
    locale?: string;
    currency?: string;
    intent?: string;
    commit?: boolean;
}
class PaypalStyle
{
    size?: PaypalStyleSizeEnum;
    color?: PaypalStyleColorEnum;
    shape?: PaypalStyleShapeEnum;
    height?: number;
    tagline?: boolean;
    layout?: PaypalStyleLayoutEnum;
    fundingicons?: boolean;
}
class PaypalWebApiRequest
{
    authKey?: string;
    method?: string;
    successNotificationMessage?: boolean | string;
    errorNotificationMessage?: boolean | string;
    otherParameters?: any;
    loader?: HTMLElement | JQuery | string;
    callback?: (response?: any) => void;
    errorCallback?: (message?: string) => void;
    parameters?: () => any;
}
class SetupPaymentRequest extends PaypalWebApiRequest
{
    cancelUrl?: string;
    returnUrl?: string;
}
class ExecutePaymentRequest extends PaypalWebApiRequest
{
    paymentIdPropertyName?: string;
    payerIdPropertyName?: string;
}
class OnPaypalCancelEvent extends VrControlsEvent
{
    sender: PaypalButton;
    data: any;
    actions: any;
}
class OnPaypalBeforePaymentEvent extends VrControlsEvent
{
    sender: PaypalButton;
}
class OnPaypalRenderedEvent extends VrControlsEvent
{
    sender: PaypalButton;
}
export
{};
//#endregion

//#region pdfViewer
export class PdfViewerOptions extends VrControlOptions
{
    content?: string;
    base64?: boolean;
    popup?: boolean | PdfViewerWindowSettings;
    scale?: number;
    textSelection?: boolean;
    toolbar?: boolean | PdfViewerToolbarSettings;
    fileName?: string;
    onContentRendered?: (e: OnContentRenderedEvent) => void;
}
export class PdfViewer extends VrControl
{
    constructor(element: HTMLElement, options?: PdfViewerOptions | null);
    addToolbarItems(toolbarItems: PdfViewerToolbarItem[]): void;
    toolbar(): HTMLElement;
    toolbarLeftArea(): any;
    toolbarCenterArea(): any;
    toolbarRightArea(): any;
    toolbarArea(area: PdfViewerToolbarAreaEnum): any;
    content(content?: string): Promise<unknown>;
    page(page?: number): number;
    fileName(name?: string): string | undefined;
    download(): void;
    print(): void;
    getData(): Promise<string>;
    open(content?: string): Promise<unknown>;
    close(): void;
    window(): Window;
    windowTitle(title: string): void;
    windowCloseCallback(callback: Function): void;
    getOptions(): PdfViewerOptions;
}
class PdfViewerWindowSettings
{
    maximize?: boolean;
    width?: number;
    height?: number;
    title?: string;
    closeable?: boolean;
    onOpen?(e: WindowOpenEvent): void;
}
export
{};
//#endregion

//#region prompt
export class PromptOptions
{
    textOkButton?: string;
    textCancelButton?: string;
    content?: string;
    title?: string;
    defaultValue?: string;
    placeHolder?: string;
    width?: number | string;
    height?: number | string;
    css?: string;
    cssContainer?: string;
    onContentLoaded?(e: ContentPromptLoadedEvent): void;
}
export class Prompt
{
    constructor(text?: string | null, options?: PromptOptions | null);
    open(): Promise<any>;
    close(): void;
}
class ContentPromptLoadedEvent extends VrControlsEvent
{
    sender: Prompt;
    contentElement: HTMLElement;
}
export
{};
//#endregion

//#region qrCode
export class QrCodeOptions extends VrControlOptions
{
    value?: string | number;
    color?: string;
    border?: boolean | QrCodeBorderSettings;
    wrap?: boolean;
    onClick?: (e: QrCodeClickEvent) => void;
}
export class QrCode extends VrControl
{
    constructor(element: HTMLElement, options?: QrCodeOptions | null);
    value(value?: string | number): string;
    svg(): SVGElement;
    clear(): void;
    getOptions(): QrCodeOptions;
}
class QrCodeBorderSettings
{
    size?: number;
    color?: string;
    style?: string | BorderStyleEnum;
}
class QrCodeClickEvent extends VrControlsEvent
{
    sender: QrCode;
    value: string;
}
export
{};
//#endregion

//#region radioButton
export class RadioButtonOptions extends VrControlOptions
{
    text?: string;
    value?: string;
    checked?: boolean;
    name?: string;
    onCheck?(e: RadioButtonCheckEvent): void;
}
export class RadioButton extends VrControl
{
    constructor(element: HTMLElement, options?: RadioButtonOptions | null);
    checked(state?: boolean, triggerChange?: boolean): boolean;
    text(text?: string): string;
    clear(triggerChange?: boolean): void;
    getOptions(): RadioButtonOptions;
    enable(): void;
    disable(): void;
}
class RadioButtonEvent
{
    sender: RadioButton;
}
export class RadioButtonCheckEvent extends RadioButtonEvent
{
    checked: boolean;
}
export
{};
//#endregion

//#region radioButtonList
export class RadioButtonListOptions extends VrControlOptions
{
    items?: RadioButtonItem[];
    orientation?: OrientationEnum;
    listName?: string;
    onBeforeSelect?(e: RadioButtonListSelectEvent): void;
    onSelect?(e: RadioButtonListSelectEvent): void;
}
export class RadioButtonList extends VrControl
{
    constructor(element: HTMLElement, options?: RadioButtonListOptions | null);
    items(items?: RadioButtonItem[]): RadioButtonItem[];
    value(value?: string | number, triggerChange?: boolean): string;
    valueTag(tag?: any, triggerChange?: boolean): any;
    text(value: string, text?: string): string;
    clear(triggerChange?: boolean): void;
    clearItems(): void;
    getOptions(): RadioButtonListOptions;
    enable(): void;
    disable(): void;
}
class RadioButtonItem
{
    text?: string;
    value?: string | number;
    checked?: boolean;
    tag?: any;
    onCheck?: (e: RadioButtonCheckEvent) => void;
}
class RadioButtonListSelectEvent extends VrControlsEvent
{
    sender: RadioButtonList;
    value?: string;
}
export
{};
//#endregion

//#region rating
export class RatingOptions extends VrControlOptions
{
    value?: number;
    max?: number;
    size?: string | number;
    precision?: RatingPrecisionEnum;
    tooltip?: boolean;
    colorSettings?: RatingColorSettings;
    total?: number;
    onSelect?: (e: RatingSelectEvent) => void;
}
export class Rating extends VrControl
{
    constructor(element: HTMLElement, options?: RatingOptions | null);
    value(value?: number, triggerChange?: boolean): any;
    color(colorSettings?: RatingColorSettings): RatingColorSettings | undefined;
    size(size?: string | number): number;
    total(total?: number): number;
    enable(): void;
    disable(): void;
    getOptions(): RatingOptions;
}
class RatingSelectEvent
{
    sender: Rating;
    value: number;
    oldValue?: number | null;
}
class RatingColorSettings
{
    selected?: string;
    hover?: string;
    notSelected?: string;
}
export
{};
//#endregion

//#region repeater
export class RepeaterOptions extends VrControlOptions
{
    toolbar?: GridToolbarItem[];
    height?: string | number | GridHeightModeEnum;
    dataSource?: any[];
    rebind?: GridRebindRequest;
    checkboxes?: boolean | GridCheckboxModeEnum;
    dataSourceFieldId?: string;
    rowHeight?: number;
    hideEditButton?: boolean;
    mode?: GridModeEnum;
    filterable?: boolean;
    pageSize?: number | boolean;
    largePageSize?: boolean;
    footer?: boolean | GridFooterSettings;
    padding?: number | PaddingSettings;
    alternateRowColors?: boolean | string;
    hoverRowColor?: boolean;
    customFilterProperties?: string[];
    emptyMessage?: string;
    groupBy?: string[] | GridGroupBySettings | null;
    title?: string | boolean;
    groupable?: boolean;
    template?: (templateEvent: GridTemplateEvent) => string;
    onDataSourceChanged?: () => void;
    onDataBound?: (e: GridOnDataBoundEvent) => void;
    onRowDataBound?: (e: RepeaterOnRowDataBoundEvent) => void | string;
    onSelectRow?: (e: GridSelectRowEvent) => void;
    onSelectAllRows?: (e: GridSelectAllRowsEvent) => void;
    onUnselectRow?: (e: GridUnselectRowEvent) => void;
    onUnselectAllRows?: (e: GridUnselectAllRowsEvent) => void;
}
export class Repeater extends VrControl
{
    constructor(element: HTMLElement, options?: RepeaterOptions | null);
    rebind(parameters?: any | null, keepInfo?: boolean): any;
    rebindSpecificRows(itemIdList: number[], update?: boolean): void;
    clear(): void;
    originalDataSource(): any[];
    dataSource(dataItems?: any[], clearFilters?: boolean): any[];
    update(triggerDataBound?: boolean, keepInfo?: boolean): void;
    updateRow(dataItem: any, rebind?: boolean): void;
    updateRows(dataItems: any[], rebind?: boolean): void;
    addRow(dataItem: any, rebind?: boolean): void;
    addRows(dataItems: any[], rebind?: boolean): void;
    deleteRow(dataItemId: any, rebind?: boolean): void;
    deleteRows(dataItemIdList: any[], rebind?: boolean): void;
    rows(): GridRow[];
    getAllItems(): any[];
    getCheckedItems(): any[];
    getCheckedValues(): any[];
    getDeletedItems(): any[];
    getDeletedItemValues(key?: string): any[];
    clearSelection(triggerChange?: boolean): void;
    checkAllRows(triggerChange?: boolean): void;
    unCheckAllRows(triggerChange?: boolean): void;
    selectRowsByIndexes(indexes: number[], triggerChange?: boolean): void;
    selectRowByIndex(index: number, triggerChange?: boolean): void;
    selectRows(itemIdList: string[], property?: string, triggerChange?: boolean): void;
    selectRow(itemId: string, triggerChange?: boolean): void;
    unselectRows(itemIdList: string[], property?: string, triggerChange?: boolean): void;
    unselectRow(itemId: string): void;
    removeGroup(field: string, updateDataSource?: boolean): void;
    removeGroups(fields: string[], updateDataSource?: boolean): void;
    removeAllGroups(updateDataSource?: boolean): void;
    addGroup(field: string | GridGroupByItem, updateDataSource?: boolean, sortBySettings?: GridSortSettings, internalSortBy?: GridSortSettings): void;
    addGroups(fields: (string | GridGroupByItem)[], updateDataSource?: boolean, sortBy?: GridSortSettings, internalSortBy?: GridSortSettings): void;
    removeSort(updateDataSource?: boolean): void;
    sort(field: string, tableSortModeEnum?: GridSortDirectionEnum): void;
    clearFilters(updateDataSource?: boolean): void;
    addFilter(field: string, filterCondition: GridFilterSettings, applyFilters?: boolean): void;
    removeFilter(field: string, applyFilters?: boolean): void;
    updateFilter(field: string, filterCondition: GridFilterSettings, applyFilters?: boolean): void;
    pageSelected(page?: number, update?: boolean): number;
    height(height?: number | string): any;
    recalculateHeight(afterFilter?: boolean): void;
    recalculateWidth(): void;
    visibleToolbar(state?: boolean): any;
    showToolbar(): void;
    hideToolbar(): void;
    toolbarItem<T extends Button | SplitButton | Switch>(value: string): T;
    showToolbarItem(value: string): void;
    hideToolbarItem(value: string): void;
    enableToolbarItem<T extends VrControl>(value: string): void;
    disableToolbarItem<T extends VrControl>(value: string): void;
    removeToolbarItem(value: string): void;
    addToolbarItem(toolbarItem: GridToolbarItem): void;
    hideCheckboxColumn(updateDataSource?: boolean): void;
    showCheckboxColumn(updateDataSource?: boolean): void;
    pageSize(pageSize?: number | boolean, update?: boolean, triggerDataBound?: boolean): number;
}
class PaddingSettings
{
    left?: number;
    top?: number;
    right?: number;
    bottom?: number;
}
class RepeaterOnRowDataBoundEvent extends GridOnRowDataBoundEvent
{
    cell: HTMLElement;
    index: number;
}
export
{};
//#endregion

//#region scheduler
export class SchedulerOptions extends VrControlOptions
{
    date?: Date;
    startTime?: Date;
    endTime?: Date;
    timeslotIntervalDuration?: number;
    numberOfWorkDays?: number;
    resources?: SchedulerResource[];
    firstDayOfWeek?: DayOfWeekEnum;
    views?: SchedulerView[];
    daysOfWeekNames?: string[];
    exportPdf?: boolean;
    maxResourcesNumber?: SchedulerMaxResourceNumber;
    availabilities?: SchedulerData[];
    datasource?: SchedulerData[];
    saturation?: SchedulerSaturationInfo;
    editable?: SchedulerEditable;
    timeColumn?: boolean;
    showHeader?: boolean;
    showToolbar?: boolean;
    onNavigate?: (e: SchedulerNavigateEvent) => void;
    onViewChange?: (e: SchedulerViewChangeEvent) => void;
    onIntervalChange?: (e: SchedulerIntervalChangeEvent) => void;
    onResourcesChange?: (e: SchedulerResourcesChangeEvent) => void;
    onTimeslotClick?: (e: SchedulerTimeslotClickEvent) => void;
    onAvailabilityClick?: (e: SchedulerAvailabilityClickEvent) => void;
    onAppointmentClick?: (e: SchedulerAppointmentClickEvent) => void;
    onMoveStart?: (e: SchedulerMoveStartEvent) => void;
    onMoving?: (e: SchedulerMovingEvent) => void;
    onMoveEnd?: (e: SchedulerMoveEndEvent) => void;
    onExpand?: (e: SchedulerExpandEvent) => void;
    onCollapse?: (e: SchedulerCollapseEvent) => void;
    onResizeStart?: (e: SchedulerResizeStartEvent) => void;
    onResizing?: (e: SchedulerResizingEvent) => void;
    onResizeEnd?: (e: SchedulerResizeEndEvent) => void;
}
export class Scheduler extends VrControl
{
    constructor(element: HTMLElement, options?: SchedulerOptions | null);
    drawToolbar(): void;
    adaptHeight(): void;
    height(value?: string | number): number;
    view(view?: SchedulerViewEnum): SchedulerViewEnum;
    date(date?: Date, triggerChange?: boolean): Date | null;
    resources(resources?: SchedulerResource[]): SchedulerResource[];
    groupedByResource(): boolean;
    timeslotInterval(timeslotIntervalDuration?: number): number;
    firstDayOfWeek(): DayOfWeekEnum;
    startTime(): Date;
    endTime(): Date;
    groupWeekByDate(group?: boolean): boolean;
    fullscreen(state?: boolean): boolean;
    datasource<T extends SchedulerData>(datasource?: T[]): T[];
    availabilities<T extends SchedulerData>(availabilities?: T[]): T[];
    rebind(appointments?: boolean, availabilities?: boolean): void;
    rebindAppointments(): void;
    rebindAvailabilities(): void;
    saturation(saturationData?: SchedulerSaturationInfo): SchedulerSaturationInfo | undefined;
    clearSaturation(): void;
    showSaturation(): void;
    hideSaturation(): void;
    saturationVisible(): boolean;
    bounceAppointment(divElementId: string): void;
    exportPdf(fileName?: string, onlyVisible?: boolean, autoPrint?: boolean, loader?: boolean): void;
    getOptions(): SchedulerOptions;
}
class SchedulerEvent extends VrControlsEvent
{
    sender: Scheduler;
}
class SchedulerNavigateEvent extends SchedulerEvent
{
    action?: SchedulerNavigateActionEnum;
    date?: Date;
    view?: SchedulerViewEnum;
    previousDate: Date | null;
}
class SchedulerViewChangeEvent extends SchedulerEvent
{
    previousView: SchedulerViewEnum;
    view: SchedulerViewEnum;
}
class SchedulerIntervalChangeEvent extends SchedulerEvent
{
    value?: number;
    view?: SchedulerViewEnum;
    previousValue: number | undefined;
}
class SchedulerResourcesChangeEvent extends SchedulerEvent
{
    resources: SchedulerResource[];
    view?: SchedulerViewEnum;
}
class SchedulerClickEvent extends SchedulerEvent
{
    start: Date;
    end: Date;
    resourceId: string;
    element: HTMLElement;
    slotElement: SchedulerSlotElement;
}
export class SchedulerTimeslotClickEvent extends SchedulerClickEvent
{
}
export class SchedulerAppointmentClickEvent extends SchedulerClickEvent
{
    dataItem: SchedulerData;
}
export class SchedulerAvailabilityClickEvent extends SchedulerClickEvent
{
    dataItem: SchedulerData;
}
class SchedulerMoveEvent extends SchedulerEvent
{
    start: Date;
    end: Date;
    resourceId: string;
    divElement: HTMLDivElement;
    dataItem: SchedulerData;
}
class SchedulerMoveStartEvent extends SchedulerMoveEvent
{
}
class SchedulerMovingEvent extends SchedulerMoveEvent
{
}
class SchedulerMoveEndEvent extends SchedulerMoveEvent
{
}
class SchedulerResizeEvent extends SchedulerEvent
{
    start: Date;
    end: Date;
    resourceId: string;
    divElement: HTMLDivElement;
    dataItem: SchedulerData;
}
class SchedulerResizeStartEvent extends SchedulerResizeEvent
{
}
class SchedulerResizingEvent extends SchedulerResizeEvent
{
}
class SchedulerResizeEndEvent extends SchedulerResizeEvent
{
}
class SchedulerMaxResourceNumber
{
    dayView?: number;
    weekView?: number;
    fourWeeksView?: number;
}
class SchedulerExpandCollapseEvent extends SchedulerEvent
{
    buttonExpand: Button;
    buttonCollpase: Button;
}
class SchedulerExpandEvent extends SchedulerExpandCollapseEvent
{
}
class SchedulerCollapseEvent extends SchedulerExpandCollapseEvent
{
}
class SchedulerEditable
{
    move?: boolean;
    resize?: boolean;
}
export
{};
//#endregion

//#region searchBar
export class SearchBarOptions extends VrControlOptions
{
    collapsed?: boolean;
    icon?: IconClass | boolean;
    placeholder?: string;
    expandOnClick?: boolean;
    collapseOnBlur?: boolean;
    onClick?(e: SearchBarClickEvent): void;
    onKeyUp?(e: SearchBarKeyUpEvent): void;
    onEnterKey?(e: SearchBarEnterKeyEvent): void;
    onBlur?(e: SearchBarBlurEvent): void;
}
export class SearchBar extends VrControl
{
    constructor(element: HTMLElement, options?: SearchBarOptions | null);
    value(text?: string): string;
    clear(): void;
    collapse(): void;
    expand(): void;
    isCollapsed(): boolean;
    focus(): void;
}
class SearchBarEvent extends VrControlsEvent
{
    sender: SearchBar;
    value: string;
}
class SearchBarKeyUpEvent extends SearchBarEvent
{
    previousValue: string;
}
class SearchBarEnterKeyEvent extends SearchBarEvent
{
}
class SearchBarClickEvent extends SearchBarEvent
{
}
class SearchBarBlurEvent extends SearchBarEvent
{
}
export
{};
//#endregion

//#region separator
export class SeparatorOptions extends VrControlOptions
{
    size?: number;
    orientation?: OrientationEnum;
    color?: string;
    marginSettings?: MarginSettings;
}
export class Separator extends VrControl
{
    constructor(element: HTMLElement, options?: SeparatorOptions | null);
}
class MarginSettings
{
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
}
export
{};
//#endregion

//#region speechRecognizer
export class SpeechRecognizer extends VrControl
{
    constructor(element: HTMLElement, options?: SpeechRecognizerOptions | null);
    start(): void;
    stop(): void;
    isRecording(): boolean;
    getOptions(): SpeechRecognizerOptions;
    enable(): void;
    disable(): void;
}
export class SpeechRecognizerEvent extends VrControlsEvent
{
    sender: SpeechRecognizer;
}
export class SpeechRecognizerNoMatchEvent extends SpeechRecognizerEvent
{
}
export class SpeechRecognizerClickEvent extends SpeechRecognizerEvent
{
}
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
{
}
export class SpeechRecognizerEndEvent extends SpeechRecognizerEvent
{
}
export class SpeechRecognizerSpeechStartEvent extends SpeechRecognizerEvent
{
}
export class SpeechRecognizerSpeechEndEvent extends SpeechRecognizerEvent
{
}
export class SpeechRecognizerAudioStartEvent extends SpeechRecognizerEvent
{
}
export class SpeechRecognizerAudioEndEvent extends SpeechRecognizerEvent
{
}
export class SpeechRecognizerSoundStartEvent extends SpeechRecognizerEvent
{
}
export class SpeechRecognizerSoundEndEvent extends SpeechRecognizerEvent
{
}
//#endregion

//#region splitButton
export class SplitButtonOptions extends VrControlOptions
{
    text?: string;
    icon?: IconClass;
    imageUrl?: string;
    colorSettings?: ColorSettings;
    popupSettings?: PopupSettings;
    tooltip?: string;
    items?: SplitButtonItem[];
    hoverMode?: boolean;
    modal?: boolean;
    showDefault?: boolean;
    separator?: boolean;
    onClick?: (e: SplitButtonMainClickEvent) => void;
    onSelect?: (e: SplitButtonSelectClickEvent) => void;
}
export class SplitButton extends VrControl
{
    constructor(element: HTMLElement, options?: SplitButtonOptions | null);
    open(): void;
    close(): void;
    items(items?: SplitButtonItem[]): SplitButtonItem[];
    addItem(item: SplitButtonItem): void;
    removeItem(value: string | number): void;
    clearItems(): void;
    enable(): void;
    disable(): void;
    itemVisible(value: string, state?: boolean): boolean;
    showItem(value: string): void;
    showItems(values: string[]): void;
    showOnlyThisItem(value: string): void;
    hideItem(value: string): void;
    hideItems(values: string[]): void;
    hideOnlyThisItem(value: string): void;
    itemEnable(value: string, state?: boolean): boolean;
    enableAllItems(): void;
    enableItems(values: string[]): void;
    enableItem(value: string): void;
    disableAllItems(): void;
    disableItems(values: string[]): void;
    disableItem(value: string): void;
    item(value: string | number): Button | null;
    mainItem(): Button;
    click(): void;
}
export class SplitButtonItem
{
    text?: string;
    value?: string | number;
    icon?: IconClass;
    imageUrl?: string;
    separator?: boolean;
    mode?: ButtonModeEnum;
    colorSettings?: ColorSettings;
    confirmationMessage?: string;
    visible?: boolean;
    enable?: boolean;
    tooltip?: string;
    css?: string;
    cssContainer?: string;
    class?: string;
    onClick?: (e: SplitButtonClickEvent) => void;
}
class SplitButtonClickEvent
{
    sender: SplitButton;
    item: SplitButtonItem;
}
class SplitButtonMainClickEvent
{
    sender: SplitButton;
    text?: string;
    value?: string;
    items?: SplitButtonItem[];
}
class SplitButtonSelectClickEvent
{
    text?: string;
    value?: string;
    mainButton?: boolean;
}
export
{};
//#endregion

//#region splitter
export class SplitterOptions extends VrControlOptions
{
    direction?: SplitterDirectionEnum;
    collapsable?: boolean | SplitterCollapsableSettings;
    resizable?: boolean;
    onBeforeExpandCollapse?: (e: SplitterBeforeExpandCollapseEvent) => void;
    onAfterExpandExpandCollapse?: (e: SplitterAfterExpandCollapseEvent) => void;
    onBeforeResize?: (e: SplitterBeforeResizeEvent) => void;
    onAfterResize?: (e: SplitterAfterResizeEvent) => void;
}
export class Splitter extends VrControl
{
    constructor(element: HTMLElement, options?: SplitterOptions | null);
}
class SplitterEvent extends VrControlsEvent
{
    sender: Splitter;
}
class SplitterExpandCollapseEvent extends SplitterEvent
{
    collapse: boolean;
    previousDiv: HTMLElement;
    nextDiv: HTMLElement;
}
class SplitterBeforeExpandCollapseEvent extends SplitterExpandCollapseEvent
{
}
class SplitterAfterExpandCollapseEvent extends SplitterExpandCollapseEvent
{
}
class SplitterResizeEvent extends SplitterEvent
{
    sender: Splitter;
    previousDiv: HTMLElement;
    nextDiv: HTMLElement;
    direction: SplitterDirectionEnum;
}
class SplitterBeforeResizeEvent extends SplitterResizeEvent
{
}
class SplitterAfterResizeEvent extends SplitterResizeEvent
{
}
export
{};
//#endregion

//#region switch
export class SwitchOptions extends VrControlOptions
{
    labelOff?: string | SwitchLabelSettings;
    labelOn?: string | SwitchLabelSettings;
    checked?: boolean;
    onChange?(e: SwitchChangeEvent): void;
}
export class Switch extends VrControl
{
    constructor(element: HTMLElement, options?: SwitchOptions | null);
    checked(state?: boolean, triggerChange?: boolean): boolean;
    clear(triggerChange?: boolean): void;
    labelOff(text?: string): string;
    labelOn(text?: string): string;
    badgeLabelOff(text?: string | number): any;
    badgeBackgroundColorLabelOff(color: string): void;
    badgeColorLabelOff(color: string): void;
    showBadgeLabelOff(): void;
    hideBadgeLabelOff(): void;
    visibleBadgeLabelOff(state: boolean): void;
    badgeLabelOn(text?: string | number): any;
    badgeBackgroundColorLabelOn(color: string): void;
    badgeColorLabelOn(color: string): void;
    showBadgeLabelOn(): void;
    hideBadgeLabelOn(): void;
    visibleBadgeLabelOn(state: boolean): void;
    getOptions(): SwitchOptions;
    enable(): void;
    disable(): void;
}
class SwitchEvent extends VrControlsEvent
{
    sender: Switch;
}
class SwitchChangeEvent extends SwitchEvent
{
    checked: boolean;
}
export
{};
//#endregion

//#region tabStrip
export class TabStripOptions extends VrControlOptions
{
    items?: TabStripItem[];
    backgroundColor?: string;
    tooltip?: boolean;
    onSelect?(e: TabStripSelectEvent): void;
    onItemAdded?(e: TabStripItemAddedEvent): void;
    onItemRemoved?(e: TabStripItemRemovedEvent): void;
}
export class TabStrip extends VrControl
{
    constructor(element: HTMLElement, options?: TabStripOptions | null);
    items(items?: TabStripItem[]): TabStripItem[];
    addItem(item: TabStripItem, show?: boolean): void;
    item(value: string): TabStripItem;
    removeItem(value: string): void;
    removeAllItems(): void;
    showItems(values: any[]): void;
    showItem(value: any): void;
    showAllItems(): void;
    hideItems(values: any[]): void;
    hideItem(value: any, hide?: boolean): void;
    hideAllItems(hideElement?: boolean): void;
    visibleItem(value: any, state?: boolean): boolean;
    enableItem(value: any): void;
    enableItems(values: any[]): void;
    disableItem(value: any): void;
    disableItems(values: any[]): void;
    select(values: string[] | number[], triggerChange?: boolean): void;
    selectIndex(index: number, triggerChange?: boolean): void;
    value(): any;
    getItemByValue(value: string): HTMLElement;
    getItemByIndex(index: number): HTMLElement;
    itemTooltip(value: string, tooltip?: string): string;
    itemText(value: string, text?: string, updateTooltip?: boolean): string;
    itemTextByIndex(index: number, text?: string): string;
    enable(): void;
    disable(): void;
    getOptions(): TabStripOptions;
}
class TabStripEvent extends VrControlsEvent
{
    sender: TabStrip;
}
class TabStripSelectEvent extends TabStripEvent
{
    value?: string | null;
    selectedValues: string[];
    selected?: boolean;
}
class TabStripItemAddedEvent extends TabStripEvent
{
}
class TabStripItemRemovedEvent extends TabStripEvent
{
}
export
{};
//#endregion

//#region textbox
export class TextBoxOptions extends VrControlOptions
{
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
    onChanged?(e: TextBoxChangeEvent): void;
    onKeyUp?(e: TextBoxKeyUpEvent): void;
    onKeyDown?(e: TextBoxKeyDownEvent): void;
    onEnterKey?(e: TextBoxEnterKeyEvent): void;
    onFocus?(e: TextBoxFocusEvent): void;
    onBlur?(e: TextBoxBlurEvent): void;
    onPaste?(e: TextBoxPasteEvent): void;
}
export class TextBox extends VrControl
{
    constructor(element: HTMLElement, options?: TextBoxOptions | null);
    value<T extends string | number | null>(value?: string | number | null, triggerChange?: boolean): T;
    placeholder(value?: string): string;
    type(type: TextModeEnum): void;
    getOptions(): TextBoxOptions;
    clear(triggerChange?: boolean): void;
    isEmpty(): boolean;
    viewPassword(state?: boolean): boolean;
    caretPosition(): number;
    insertTextAtCursor(text: string): void;
    insertTextAtPosition(text: string, position: number): void;
    appendText(text: string, position?: number): void;
    error(text?: string, mode?: ErrorModeEnum, position?: ErrorPositionEnum, hideMode?: ErrorHideModeEnum): void;
    hideError(): void;
    hasError(): any;
    change(): void;
}
export class TextBoxMultiline extends TextBox
{
}
export class TextBoxNumeric extends TextBox
{
}
export class TextBoxPassword extends TextBox
{
}
export class TextBoxCurrency extends TextBox
{
}
export class TextBoxPercentage extends TextBox
{
}
export class TextBoxEvent extends VrControlsEvent
{
    sender: TextBox;
    value: string | number | null;
}
class TextBoxChangeEvent extends TextBoxEvent
{
    oldValue: string | number | null;
}
class TextBoxFocusEvent extends TextBoxEvent
{
}
class TextBoxBlurEvent extends TextBoxEvent
{
    target: HTMLElement;
}
class TextBoxPasteEvent extends TextBoxEvent
{
    pastedValue: string;
}
class TextBoxKeyUpPressEvent extends TextBoxEvent
{
    key: string;
    shiftKey: boolean;
    altKey: boolean;
    ctrlKey: boolean;
    enterKey: boolean;
    backSpaceKey: boolean;
    tabKey: boolean;
}
class TextBoxKeyUpEvent extends TextBoxKeyUpPressEvent
{
    validForNumeric: boolean;
}
class TextBoxKeyDownEvent extends TextBoxKeyUpPressEvent
{
    validForNumeric: boolean;
}
class TextBoxEnterKeyEvent extends TextBoxEvent
{
}
export
{};
//#endregion

//#region tooltip
export class TooltipOptions extends VrControlOptions
{
    target?: HTMLElement | JQuery | string;
    elementToAppend?: HTMLElement | JQuery | string;
    content?: string;
    type?: TooltipTypeEnum;
    position?: TooltipPositionEnum;
    hideSettings?: TooltipHideSettings;
    showSettings?: TooltipShowSettings;
    colorSettings?: ColorSettings;
    showOn?: TooltipShowOnEnum;
    hideOn?: TooltipHideOnEnum;
    icon?: IconClass;
    onShow?: (e: TooltipShowEvent) => void;
    onHide?: (e: TooltipHideEvent) => void;
}
export class Tooltip extends VrControl
{
    constructor(element: HTMLElement, options?: TooltipOptions | null);
    show(content?: string): void;
    hide(): void;
    visible(state?: boolean): any;
    content(content?: string): string | undefined;
    target(): HTMLElement;
    getOptions(): TooltipOptions;
}
class TooltipHideSettings
{
    clickToHide?: boolean;
    hideAfter?: number;
    animation?: AnimationHideEnum;
}
class TooltipShowSettings
{
    showAfter?: number;
    animation?: AnimationShowEnum;
}
class TooltipShowEvent extends VrControlsEvent
{
    sender: Tooltip;
    content: string;
}
class TooltipHideEvent extends VrControlsEvent
{
    sender: Tooltip;
    content: string;
}
export
{};
//#endregion

//#region treeView
export class TreeViewOptions extends VrControlOptions
{
    checkboxes?: boolean;
    treeMode?: TreeModeEnum;
    datasource?: any[];
    rebind?: TreeViewRebindRequest;
    dataSourceFieldId?: string;
    filter?: boolean | TreeViewFilterSettings;
    showLink?: boolean;
    title?: string;
    rightClickForContextMenu?: boolean;
    leftClickForContextMenu?: boolean;
    parentClickable?: boolean;
    contextMenuItems?: TreeViewContextMenuItem[];
    showEditButton?: boolean;
    draggable?: boolean;
    selectable?: boolean;
    alternateColor?: boolean;
    spaceBetweenGroups?: boolean;
    rowHeight?: number;
    rowLine?: number;
    export?: boolean | TreeViewExportSettings;
    columns?: TreeViewColumn[];
    toolbar?: TreeViewToolbarItem[];
    template?: (e: TreeViewTemplateEvent) => void | string;
    onBeforeSelect?(e: TreeViewChangingEvent): void;
    onAfterSelect?(e: TreeViewChangeEvent): void;
    onDoubleClick?(e: TreeViewDoubleClickEvent): void;
    onEdit?(e: TreeViewEditEvent): void;
    onDragStart?(e: TreeViewDragStartEvent): void;
    onDragMove?(e: TreeViewDragMoveEvent): void;
    onDragEnd?(e: TreeViewDragEndEvent): void;
}
export class TreeView extends VrControl
{
    constructor(element: HTMLElement, options?: TreeViewOptions | null);
    datasource(items?: any[]): any[];
    rebind(parameters?: any | null, loadingElement?: boolean | HTMLElement | JQuery | string): any;
    update(): void;
    getRootItems(): TreeViewItem[];
    getRootValues(): string[];
    getCheckedItems(): TreeViewItem[];
    getCheckedValues(): string[];
    getSelectedItem<T extends TreeViewItem>(): T;
    isParent(value: string): boolean;
    focus(): void;
    value<T extends string | string[] | number>(value?: TreeViewItem | string | number | string[] | number[] | null, triggerChange?: boolean): T | null;
    title(title?: string): string;
    clear(triggerChange?: boolean): void;
    clearItems(): void;
    excelExport(): void;
    column(field: string): TreeViewColumn;
    columnTitle(field: string, title?: string): string | undefined;
    showColumns(fields: string[], update?: boolean): void;
    showColumn(field: string, update?: boolean): void;
    hideColumns(fields: string[], update?: boolean): void;
    hideColumn(field: string, update?: boolean): void;
    showOnlyThisColumns(fieldList: string[], update?: boolean): void;
    checkAll(triggerChange?: boolean): void;
    unCheckAll(triggerChange?: boolean): void;
    updateRow(dataItem: any, rebind?: UpdateRowRebindSettings | boolean): void;
    updateRows(dataItems: any[], rebind?: boolean): void;
    addItem(item: TreeViewItem, rebind?: boolean): void;
    updateItem(item: TreeViewItem, rebind?: boolean): void;
    deleteItem(value: number | string): void;
    visibleToolbar(state?: boolean): any;
    showToolbar(): void;
    hideToolbar(): void;
    toolbar(): HTMLElement;
    toolbarItem<T extends VrControl>(value: string): T;
    showToolbarItem<T extends VrControl>(value: string): void;
    hideToolbarItem<T extends VrControl>(value: string): void;
    enableToolbarItem<T extends VrControl>(value: string): void;
    disableToolbarItem<T extends VrControl>(value: string): void;
    removeToolbarItem(value: string): void;
    addToolbarItem(toolbarItem: TreeViewToolbarItem): void;
    change(callBack?: Function): void;
    getOptions(): TreeViewOptions;
}
class TreeViewTemplateEvent
{
    sender: TreeView;
    dataItem: any;
    container: HTMLElement;
}
class TreeViewEvent extends VrControlsEvent
{
    sender: TreeView;
    value: any;
    childrenValues: string[];
    selectedItem?: TreeViewItem;
    checked: boolean;
    isParent?: boolean;
}
class TreeViewChangeEvent extends TreeViewEvent
{
}
class TreeViewChangingEvent extends TreeViewEvent
{
    previousValue?: string | null;
    previousCheckedValues?: string[] | null;
}
export class TreeViewContextMenuClickEvent extends VrControlsEvent
{
    sender: TreeView;
    text?: string;
    value?: string;
    dataItem: any;
    targets?: HTMLElement[];
}
class TreeViewDoubleClickEvent extends VrControlsEvent
{
    sender: TreeView;
    text?: string;
    value?: string;
    dataItem: any;
}
class TreeViewEditEvent extends VrControlsEvent
{
    sender: TreeView;
    text?: string;
    value?: string;
    dataItem: any;
}
class TreeViewDragEvent extends VrControlsEvent
{
    sender: TreeView;
    target: HTMLElement;
    source: TreeViewItem;
    destination?: TreeViewItem;
}
class TreeViewDragStartEvent extends TreeViewDragEvent
{
}
class TreeViewDragMoveEvent extends TreeViewDragEvent
{
}
class TreeViewDragEndEvent extends TreeViewDragEvent
{
}
class TreeViewExportSettings
{
    fileName?: string;
    sheetName?: string;
    numericValueTypeEnum?: TreeViewNumericTypeEnum;
    decimalDigits?: number;
}
export class TreeViewHeaderAndCellSettings
{
    textAlign?: TreeViewAlignEnum;
    backgroundColor?: string;
    color?: string;
    css?: string;
}
export class TreeViewHeaderSettings extends TreeViewHeaderAndCellSettings
{
    icon?: IconClass;
}
export class TreeViewCellSettings extends TreeViewHeaderAndCellSettings
{
    zeroIfNull?: boolean;
}
class TreeViewWebApiRequest
{
    authKey?: string;
    method?: string;
    successNotificationMessage?: boolean | string;
    errorNotificationMessage?: boolean | string;
    rebindGridAfterSave?: boolean;
    rebindGridAfterError?: boolean;
    closeWindowAfterError?: boolean;
    otherParameters?: any;
    loadingElement?: boolean | HTMLElement | JQuery | string;
    callback?: (response?: any) => void;
    callbackBeforeDatasourceChange?: (response?: any) => void;
    errorCallback?: (message?: string) => void;
    parameters?: () => any;
}
class TreeViewRebindRequest extends TreeViewWebApiRequest
{
    itemsPropertyName?: string;
    rebindAtStartup?: boolean;
}
export
{};
//#endregion

//#region upload
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
}
export class Upload extends VrControl
{
    constructor(element: HTMLElement, options?: UploadOptions | null);
    uploadFiles(): void;
    addFile(file: File): void;
    addFiles(files: File[]): void;
    getFiles(): File[];
    getBase64Files(files: File[]): Promise<string[]>;
    removeFileAtIndex(index: number): void;
    dropArea(): HTMLElement | null;
    divFileList(): HTMLElement;
    progressBar(): HTMLProgressElement;
    uploadButton(): HTMLInputElement;
    clear(): void;
    open(): void;
    enable(): void;
    disable(): void;
    getOptions(): UploadOptions;
}
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
{
}
class UploadDragOverEvent extends UploadDragEvent
{
}
class UploadDragLeaveEvent extends UploadDragEvent
{
}
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
{
}
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
class UploadRemoveEvent extends UploadEvent
{
    file: File;
    element: HTMLElement;
    index: number;
}
class UploadClickEvent extends UploadEvent
{
}
export
{};
//#endregion

//#region window
export class WindowOptions extends VrControlOptions
{
    maximized?: boolean | WindowMaximizeSettings;
    padding?: number;
    modal?: boolean;
    closeable?: boolean;
    hideCloseIcon?: boolean;
    removeOnClose?: boolean;
    title?: string | boolean | WindowTitleSettings;
    footer?: boolean | WindowFooterItem[];
    draggable?: boolean;
    position?: WindowPosition;
    content?: string;
    iframe?: boolean;
    loader?: boolean;
    id?: string;
    autoSize?: boolean | WindowAutoSizeDirectionEnum;
    cssHeader?: string;
    onOpen?(e: WindowOpenEvent): void;
    onBeforeClose?(e: WindowBeforeCloseEvent): void;
    onClose?(e: WindowCloseEvent): void;
    onDragStart?(e: WindowDragStartEvent): void;
    onDragEnd?(e: WindowDragEndEvent): void;
    onContentLoaded?(e: WindowContentLoadEvent): void;
}
export class Window extends VrControl
{
    constructor(element: HTMLElement, options?: WindowOptions | null);
    open(callBackFooterItems?: CallBackFooterItem[] | null, center?: boolean, position?: WindowPosition): Promise<any>;
    close(triggerEvents?: boolean): void;
    remove(): void;
    addCloseCallbacks(...callback: Function[]): void;
    addOpenCallbacks(...callback: Function[]): void;
    addContentLoadedCallbacks(...callback: Function[]): void;
    closeIconVisible(state?: boolean): any;
    title(text?: string): string;
    maximize(padding?: boolean): void;
    resize(width?: number | string, height?: number | string): void;
    autoSize(direction?: WindowAutoSizeDirectionEnum, animate?: boolean, center?: boolean): void;
    content(content: string, loader?: boolean | HTMLElement | JQuery | string, open?: boolean, triggerChange?: boolean): void;
    clear(): void;
    background(): HTMLElement;
    center(): void;
    position(left?: number | string | null, top?: number | string | null, right?: number | string | null, bottom?: number | string | null):
{
        left: number;
        top: number;
    };
    footerItem<T extends VrControl>(value: string | number): T;
    hideFooterItem(value: string | number): void;
    showFooterItem(value: string | number): void;
    enableFooterItem(value: string | number): void;
    disableFooterItem(value: string | number): void;
    addFooterItem(footerItem: WindowFooterItem): void;
    footer(): HTMLElement;
    header(): HTMLElement;
    titleElement(): HTMLElement;
    height(height?: number | string, center?: boolean): number;
    width(width?: number | string, center?: boolean): number;
}
export class WindowFooterItem
{
    value?: string;
    type?: WindowFooterItemTypeEnum;
    text?: string;
    icon?: IconClass;
    iconSettings?: IconSettings;
    imageUrl?: string;
    mode?: ButtonModeEnum;
    colorSettings?: ColorSettings;
    tooltip?: string;
    confirmationMessage?: string;
    align?: WindowFooterItemAlignEnum;
    visible?: boolean;
    enable?: boolean;
    css?: string;
    cssContainer?: string;
    class?: string;
    width?: string | number;
    splitButtonItems?: SplitButtonItem[];
    switchSettings?: SplitButtonSwitchSettings;
    buttonGroupItems?: ButtonGroupItem[];
    comboBoxOptions?: ComboBoxOptions;
    datePickerOptions?: DatePickerOptions;
    textBoxOptions?: TextBoxOptions;
    onClick?(e: WindowFooterItemClickEvent): void;
}
class CallBackFooterItem
{
    value: string;
    callback: Function;
}
export class SplitButtonSwitchSettings
{
    labelOff?: string;
    labelOn?: string;
    checked?: boolean;
    onCheck?: (e: SplitButtonSwitchEvent) => void;
}
class SplitButtonSwitchEvent
{
    checked: boolean;
}
class WindowPosition
{
    left?: number | string;
    top?: number | string;
    right?: number | string;
    bottom?: number | string;
}
class WindowMaximizeSettings
{
    padding: boolean;
}
class WindowTitleSettings
{
    text?: string;
    colorSettings?: ColorSettings;
    fontSize?: number;
    cssContainer?: string;
    css?: string;
    align?: TextAlignEnum;
}
export class WindowEvent extends VrControlsEvent
{
    sender: Window;
}
class WindowFooterItemClickEvent extends WindowEvent
{
}
export class WindowOpenEvent extends WindowEvent
{
}
class WindowBeforeCloseEvent extends WindowEvent
{
}
class WindowCloseEvent extends WindowEvent
{
}
class WindowDragStartEvent extends WindowEvent
{
    left: number;
    top: number;
}
class WindowDragEndEvent extends WindowEvent
{
    left: number;
    top: number;
}
class WindowContentLoadEvent extends WindowEvent
{
}
export
{};
//#endregion

//#region vrFactory
export function createLabel(options?: LabelOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): Label;
export function createButton(options?: ButtonOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): Button;
export function createButtonGroup(options?: ButtonGroupOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): ButtonGroup;
export function createTextBox(options?: TextBoxOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): TextBox;
export function createNumericTextBox(options?: TextBoxOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): TextBoxNumeric;
export function createPercentageTextBox(options?: TextBoxOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): TextBoxPercentage;
export function createCurrencyTextBox(options?: TextBoxOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): TextBoxCurrency;
export function createPasswordTextBox(options?: TextBoxOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): TextBoxPassword;
export function createMultilineTextBox(options?: TextBoxOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): TextBoxMultiline;
export function createCheckBox(options?: CheckBoxOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): CheckBox;
export function createSeparator(options?: SeparatorOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): Separator;
export function createImage(options?: ImageOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): Image;
export function createDatePicker(options?: DatePickerOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): DatePicker;
export function createTimePicker(options?: DatePickerOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): TimePicker;
export function createDateTimePicker(options?: DatePickerOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): DateTimePicker;
export function createMonthPicker(options?: DatePickerOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): MonthPicker;
export function createYearPicker(options?: DatePickerOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): YearPicker;
export function createComboBox(options?: ComboBoxOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): ComboBox;
export function createDropDown(options?: ComboBoxOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): DropDown;
export function createSplitButton(options?: SplitButtonOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): SplitButton;
export function createEditor(options?: EditorOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): Editor;
export function createWindow(options?: WindowOptions | null, container?: HTMLElement | JQuery | string | null): Window;
export function createGrid(options?: GridOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): Grid;
export function createSwitch(options?: SwitchOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): Switch;
export function createCheckBoxList(options?: CheckBoxListOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): CheckBoxList;
export function createRadioButton(options?: RadioButtonOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): RadioButton;
export function createRadioButtonList(options?: RadioButtonListOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): RadioButtonList;
export function createRepeater(options?: RepeaterOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): Repeater;
export function createMap(options?: MapsOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): Maps;
export function createPainter(options?: PainterOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): Painter;
export function createCalendar(options?: CalendarOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): Calendar;
export function createRating(options?: RatingOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): Rating;
export function createGroupBox(options?: GroupBoxOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): GroupBox;
export function createPdfViewer(options?: PdfViewerOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): PdfViewer;
export function createPaypalButton(options?: PaypalButtonOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): PaypalButton;
export function createUpload(options?: UploadOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): Upload;
export function createTreeView(options?: TreeViewOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): TreeView;
export function createScheduler(options?: SchedulerOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): Scheduler;
export function createMultiScheduler(options?: MultiSchedulerOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): MultiScheduler;
export function createQrCode(options?: QrCodeOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): QrCode;
export function createIcon(options?: IconOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): Icon;
export function createColorPicker(options?: ColorPickerOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): ColorPicker;
export function createSearchBar(options?: SearchBarOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): SearchBar;
export function createSplitter(options?: SplitterOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): Splitter;
export function createAutoCompleteBox(options?: AutoCompleteBoxOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): AutoCompleteBox;
export function createChart(options?: ChartOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): ChartVr;
export function createBarChart(options?: ChartOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): BarChart;
export function createHorizontalBarChart(options?: ChartOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): HorizontalBarChart;
export function createLineChart(options?: ChartOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): LineChart;
export function createDonutChart(options?: ChartOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): DonutChart;
export function createPieChart(options?: ChartOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): PieChart;
export function createAreaChart(options?: ChartOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): AreaChart;
export function createStackedBarChart(options?: ChartOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): StackedBarChart;
export function createTabStrip(options?: TabStripOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): TabStrip;
export function createTooltip(options?: TooltipOptions | null): Tooltip;
export function createSpeechRecognizer(options?: SpeechRecognizerOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): SpeechRecognizer;
export function createLegend(options?: LegendOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null, existingElement?: HTMLElement | JQuery | string | null): Legend;
export function getControl<T extends VrControl>(controlId: string): T;
export function addControl(control: VrControl): void;
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
    Before = 0,
    After = 1,
    None = 2
}
export function hideNotify(): void;
export function notify(text: string, options?: NotifierOptions): Notifier;
export function notifyError(text: string, options?: NotifierOptions | null): Notifier;
export function notifyWarning(text: string, options?: NotifierOptions | null): Notifier;
export function notifySuccess(text: string, options?: NotifierOptions | null): Notifier;
export function notifyInfo(text: string, options?: NotifierOptions | null): Notifier;
export function confirm(text?: string | null, options?: ConfirmOptions | null): Promise<any>;
export function alert(text?: string | null, options?: AlertOptions | null): Promise<any>;
export function dialog(text?: string | null, options?: DialogOptions | null): Dialog;
export function prompt(text?: string | null, options?: PromptOptions | null): Promise<any>;
export function printElement(element: string | HTMLElement | JQuery, options?: PrintHtmlOptions): void;
export function printHtml(elementId: string, options?: PrintFileOptions): void;
export function printBytes(base64Bytes: string, options?: PrintFileOptions): void;
export function printPdf(path: string, options?: PrintFileOptions): void;
export function printImage(path: string, options?: PrintFileOptions): void;
export function isSmartphone(): boolean;
export function isTablet(): boolean;
export function isDesktop(): boolean;
export function isMobile(): any;
export function isIphoneX(): boolean;
export function isIphone(): RegExpMatchArray | null;
export function browser(): BrowserTypeEnum | "Unknown";
export function isInternetExplorer(): boolean;
export function isSafari(): boolean;
export function isChrome(): boolean;
export function isFirefox(): boolean;
export function isEdge(): boolean;
export function isOpera(): boolean;
export function isVivaldi(): boolean;
export function isSeamonkey(): boolean;
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
export function createDiv(options?: DivOptions | null, container?: HTMLElement | JQuery | string | null, position?: ControlPositionEnum | null): Div;
export function div(container?: string | HTMLElement | JQuery, settings?: DivSettings, prepend?: boolean): HTMLElement;
class DivSettings
{
    class?: string;
    id?: string;
    content?: string;
    css?: string;
    tooltip?: string;
    attributes?: AttributeSettings[];
}
export function span(container?: string | HTMLElement | JQuery, settings?: SpanSettings, prepend?: boolean): HTMLElement;
class SpanSettings
{
    class?: string;
    id?: string;
    content?: string;
    css?: string;
    tooltip?: string;
    attributes?: AttributeSettings[];
}
export function icon(iconClass: IconClass, container?: string | HTMLElement | JQuery | null, settings?: IconSettings | null, prepend?: boolean): HTMLElement;
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
export function iframe(container: string | HTMLElement | JQuery, settings?: VrIframeSettings): HTMLIFrameElement;
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
export function br(container: string | HTMLElement | JQuery, count?: number): void;
export function hr(container: string | HTMLElement | JQuery, css?: string, id?: string): HTMLElement;
export function guid(): string;
export class VrMarginSettings
{
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
}
export function showLoader(element?: string | HTMLElement | JQuery | boolean, transparency?: boolean, tag?: any): void;
export function hideLoader(tag?: any): void;
export function pumo(): void;
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
export type IconClass = IconClassicSolid | IconClassicLight | IconClassicRegular | IconClassicDuotone | IconClassicThin | IconClassicBrands | IconSharpSolid | IconSharpLight | IconSharpRegular | IconSharpDuotone | IconSharpThin | string;
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
    Youtube = "fa-brands fa-youtube"
}
export enum IconClassicSolid
{
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
export enum IconClassicLight
{
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
export enum IconClassicRegular
{
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
export enum IconClassicDuotone
{
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
export enum IconClassicThin
{
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
export enum IconSharpSolid
{
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
export enum IconSharpLight
{
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
export enum IconSharpRegular
{
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
export enum IconSharpDuotone
{
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
export enum IconSharpThin
{
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
export enum PositionEnum
{
    Left = 0,
    Top = 1,
    Right = 2,
    Bottom = 3
}
export enum OrientationEnum
{
    Horizontal = 0,
    Vertical = 1
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
    Auto = 0,
    Up = 1,
    Down = 2
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
export enum SelectionModeEnum
{
    Single = 0,
    Multiple = 1
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
export class TabStripItem extends ButtonGroupItem
{
    elementId?: string;
}
export enum RatingPrecisionEnum
{
    Half = 0,
    Full = 1
}
export enum LabelModeEnum
{
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
export enum LabelUnderlineMode
{
    Always = 0,
    None = 1,
    OnHover = 2
}
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
    Flashing = 0,
    Stable = 1,
    None = 2
}
export enum ErrorModeEnum
{
    Tooltip = 0,
    Overlay = 1,
    Solid = 2
}
export enum ErrorPositionEnum
{
    Right = 0,
    Bottom = 1
}
export enum ErrorHideModeEnum
{
    OnFocus = 0,
    OnAction = 1,
    Never = 2
}
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
export enum CheckboxStateEnum
{
    Checked = 0,
    Unchecked = 1,
    Undefined = 2
}
export enum ImagePositionTypeEnum
{
    Center = 0,
    Fit = 1,
    Fill = 2,
    Stretch = 3,
    Original = 4
}
export enum ImageToolbarTypeEnum
{
    Download = 0,
    Delete = 1,
    Custom = 2
}
export enum DefaultDayEnum
{
    First = 0,
    Last = 1
}
export enum ComboBoxTypeEnum
{
    Combo = 0,
    DropDown = 1
}
export enum ComboBoxTreeModeEnum
{
    AllExpanded = 0,
    OnlyFirstLevelExpanded = 1,
    AllCollapsed = 2
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
    padding?: number |
{
        top?: number;
        right?: number;
        bottom?: number;
        left?: number;
    };
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
    Left = "left"
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
export class ChartLegendHoverEvent extends ChartLegendEvent
{
}
export class ChartLegendLeaveEvent extends ChartLegendEvent
{
}
export class ChartLegendClickEvent extends ChartLegendEvent
{
}
export class ChartLabelEvent extends VrControlsEvent
{
    sender: ChartVr;
    context: any;
}
export class ChartLabelHoverEvent extends ChartLabelEvent
{
}
export class ChartLabelLeaveEvent extends ChartLabelEvent
{
}
export class ChartLabelClickEvent extends ChartLabelEvent
{
}
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
export enum WindowFooterItemTypeEnum
{
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
export enum WindowFooterItemAlignEnum
{
    Left = 0,
    Right = 1
}
export enum WindowAutoSizeDirectionEnum
{
    Width = 0,
    Height = 1
}
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
export class vrEditorSpeechRecognizerSettings
{
    stopAtClick: boolean;
    position?: EditorSpeechRecognizerPositionEnum;
    mode?: EditorSpeechRecognizerModeEnum;
    showInfoCommands?: boolean;
}
export enum EditorSpeechRecognizerModeEnum
{
    Popup = 0,
    Direct = 1
}
export enum EditorSpeechRecognizerPositionEnum
{
    MenuBar = 0,
    MenuItems = 1
}
export class vrEditorFontSizeSettings
{
    defaultSize?: number;
    formatSizeList?: number[];
}
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
export enum GridCheckboxModeEnum
{
    None = 0,
    SingleCheck = 1,
    MultiCheck = 2
}
export enum GridSortDirectionEnum
{
    Asc = 0,
    Desc = 1
}
export enum SortDirectionEnum
{
    Asc = 0,
    Desc = 1
}
export enum GridHeightModeEnum
{
    FitScreen = 0,
    FitContent = 1
}
export enum GridModeEnum
{
    Sync = 0,
    NotSync = 1
}
export enum GridAggregateMode
{
    Average = 0,
    Count = 1,
    Max = 2,
    Min = 3,
    Sum = 4,
    None = 5
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
    Always = 0,
    None = 1,
    OnFocus = 2
}
export enum GridToolbarItemType
{
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
export enum GridDateFilterTypeEnum
{
    GreaterThan = 0,
    LessThan = 1,
    EqualsTo = 2,
    Between = 3
}
export enum GridNumberFilterTypeEnum
{
    GreaterThan = 0,
    LessThan = 1,
    EqualsTo = 2,
    Between = 3
}
export enum GridStringFilterTypeEnum
{
    StartsWith = 0,
    EndsWith = 1,
    EqualsTo = 2,
    Includes = 3,
    IncludesFromSimpleSearch = 4
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
    itemCountPropertyName?: string;
    totalsPropertyName?: string;
    excelDownloadUrlPropertyName?: string;
}
export class GridGroupBySettings
{
    sortBy?: GridSortSettings;
    internalSortBy?: GridSortSettings;
    fields: string[] | GridGroupByItem[];
    automaticSort?: boolean;
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
    groupNameIfEmpty?: string;
    checkbox?: boolean;
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
export enum PdfViewerToolbarAreaEnum
{
    Left = 0,
    Center = 1,
    Right = 2
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
export enum SplitterDirectionEnum
{
    Horizontal = "horizontal",
    Vertical = "vertical"
}
export enum SplitterCollapseDirectionEnum
{
    Left = 0,
    Right = 1,
    Up = 2,
    Down = 3
}
export class SplitterCollapsableSettings
{
    direction: SplitterCollapseDirectionEnum;
    color?: string;
}
export class SwitchLabelSettings
{
    text: string;
    tooltip?: string;
    color?: string;
    bold?: boolean;
    css?: string;
    badgeSettings?: BadgeSettings;
    onClick?: (e: SwitchLabelSettingsOnClickEvent) => void;
}
export class SwitchLabelSettingsOnClickEvent extends VrControlsEvent
{
    sender: Switch;
    checked: boolean;
}
export class BadgeSettings
{
    text?: string | number;
    color?: string;
    backgroundColor?: string;
    visible?: boolean;
    css?: string;
    click?: (e: BadgeClickEvent) => void;
}
export class BadgeClickEvent
{
    sender: VrControl;
    text: string;
    leftButton?: boolean;
    middleButton?: boolean;
    rightButton?: boolean;
}
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
    Sunday = 0,
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6
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
    get duration(): number;
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
    Default = 0,
    Success = 1,
    Info = 2,
    Warning = 3,
    Error = 4
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
    None = 0,
    Default = 1,
    FadeIn = 2,
    SlideDown = 3
}
export enum AnimationHideEnum
{
    None = 0,
    Default = 1,
    FadeOut = 2,
    SlideUp = 3
}
export enum TooltipShowOnEnum
{
    Click = 0,
    Focus = 1,
    Hover = 2,
    Never = 3
}
export enum TooltipHideOnEnum
{
    Default = 0,
    Never = 1,
    Click = 2,
    Blur = 3,
    Leave = 4
}
export enum TooltipTypeEnum
{
    Default = 0,
    Success = 1,
    Info = 2,
    Warning = 3,
    Error = 4
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
    preventDefault(): void;
}
export class UpdateRowRebindSettings
{
    onlyText: boolean;
}
export enum TreeViewToolbarItemType
{
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
    AllExpanded = 0,
    OnlyFirstLevelExpanded = 1,
    AllCollapsed = 2
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
    Color = 21
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
export enum UploadValidationErrorTypeEnum
{
    MinSize = 0,
    MaxSize = 1,
    Extensions = 2
}
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
export function pageError(callback?: (e: PageErrorEvent) => void): void;
class PageErrorEvent
{
    message: string | Event;
    url?: string;
    lineNumber?: number;
    columnNumber?: number;
    error?: Error;
}
export function filesToBase64(files: File[]): Promise<string[]>;
export function isEquals(item1: any, item2: any): boolean;
export function isLocalhost(): boolean;
export function interval(callback: Function, each: number, timeout?: number, timeoutCallback?: Function): void;
export function addCssStyle(cssRules: string, id?: string): void;
export function addCss(cssRules: string, id?: string): void;
export function addJsScript(jsRules: string, id?: string): void;
export function addCssFiles(...paths: string[]): Promise<unknown>;
export function addJsFiles(...paths: string[]): Promise<unknown>;
export function openUrl(url: string, name?: string, newTab?: boolean): void;
export function openBrowserWindow(url: string, newTab?: boolean, size?: BrowserWindowSize, position?: BrowserWindowPosition): void;
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
export function isValidEmail(email: string): boolean;
export function copyTextToClipboard(text: string): void;
export function base64ToFile(base64: string, fileName: string, options?: FilePropertyBag): Promise<File>;
export function base64ToBytes(base64: string): Uint8Array;
export function bytesToBase64(bytes: Uint8Array): string;
export function base64ToBlob(base64: string, contentType?: string, sliceSize?: number): Blob;
export function shadowRoot(shadowRoot?: ShadowRoot): ShadowRoot | null | undefined;
export function jqueryVariable(jqueryVariable?: any): any;
export enum WebApiModeEnum
{
    Async = 0,
    Sync = 1
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
    Day = 0,
    Month = 1,
    Year = 2
}
export enum DateFormatEnum
{
    LongDate = 0,
    ShortDate = 1,
    WeekDay = 2,
    WeekRange = 3,
    FourWeeksRange = 4,
    Month = 5,
    Year = 6,
    LongDateWithoutYear = 7,
    ShortDateWithoutYear = 8
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
    constructor(roundingSettings?: NumberFormatRoundingSettings);
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
    year: number;
    month: number;
    day: number;
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
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
export enum DateTimeTypeEnum
{
    Date = 0,
    DateTime = 1,
    String = 2
}
}