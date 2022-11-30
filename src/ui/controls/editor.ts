import { ControlManager } from "../../../src/managers/controlManager";
import { VrControl, VrControlOptions, VrControlsEvent } from "../common";
import { ControlTypeEnum, vrEditorItemEnum, vrEditorToolbarModeEnum, div, vrEditorCustomItem, vrEditorCustomMenuItem, EditorCustomMenuItemType, createSplitButton, createSwitch, createButtonGroup, createComboBox, createDatePicker, createTextBox, createButton, createSeparator, createLabel, puma, createSpeechRecognizer, vrEditorSpeechRecognizerSettings, createWindow, PositionEnum, vrEditorFontSizeSettings, EditorSpeechRecognizerPositionEnum, EditorSpeechRecognizerModeEnum, createMultilineTextBox, IconClassicLight, KeyEnum } from "../vr";
import { ButtonGroupOptions } from "./buttonGroup";
import { SpeechRecognizer } from "./speechRecognizer";
import { TextBox } from "./textbox";
import { Window } from "./window";
declare var tinyMCE: any;

//#region Options
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
//#endregion

//#region Control
export class Editor extends VrControl
{
    private _settings: any;
    private _tinyMceControl: any;
    private _divMenuItem: HTMLElement;
    private _finalTextSpeeched: string;
    private _value: string;
    private _speechRecognizer: SpeechRecognizer;
    private _divDragFile: HTMLElement;
    private _initialized: boolean;
    private _wndCommands: Window;
    private _wndTempMessage: Window;
    private _txtTempMessage: TextBox;

    constructor(element: HTMLElement, options?: EditorOptions | null)
    {
        //#region Options
        if (options == null)
            options = new EditorOptions();

        if (options.height == null) options.height = 350;
        if (options.resizable == null) options.resizable = false;
        if (options.pasteImages == null) options.pasteImages = false;
        if (options.toolbar == null) options.toolbar = true;
        if (options.menu == null) options.menu = true;
        if (options.customMenuItems != null && options.menu !== false) options.menu = true;
        if (options.baseUrl == null) options.baseUrl = "/scripts/tinymce/";
        if (options.toolbarMode == null) options.toolbarMode = vrEditorToolbarModeEnum.Floating;
        if (options.plugins == null) options.plugins = "image,link,searchreplace,fullscreen,preview,emoticons,media,lists,pagebreak,table,charmap,code,wordcount";
        if (options.browserSpellCheck == null) options.browserSpellCheck = true;
        if (options.enable == null) options.enable = true;
        if (options.pasteAsText == null) options.pasteAsText = true;
        if (options.replacePtagWithDiv == null) options.replacePtagWithDiv = true;
        if (options.statusbar == null) options.statusbar = false;

        if (options.speechRecognizer == null) options.speechRecognizer = true;
        if (options.speechRecognizer !== false) 
        {
            options.speechRecognizer = new vrEditorSpeechRecognizerSettings();
            if (options.speechRecognizer.stopAtClick == null) options.speechRecognizer.stopAtClick = true;
            if (options.speechRecognizer.position == null) options.speechRecognizer.position = EditorSpeechRecognizerPositionEnum.MenuItems;
            if (options.speechRecognizer.mode == null) options.speechRecognizer.mode = EditorSpeechRecognizerModeEnum.Popup;
            if (options.speechRecognizer.showInfoCommands == null) options.speechRecognizer.showInfoCommands = true;
        }

        if (options.fontSize == null) options.fontSize = new vrEditorFontSizeSettings();
        if (options.fontSize.defaultSize == null) options.fontSize.defaultSize = 12;
        if (options.fontSize.formatSizeList == null) options.fontSize.formatSizeList = [8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 24, 36];
        //#endregion

        super(element, options, ControlTypeEnum.Editor);

        //#region Toolbar
        let toolbar: any = false;
        if (options.toolbar === true)
            toolbar = "bold italic underline | fontfamily fontsize | alignleft aligncenter alignright alignjustify | numlist bullist | forecolor link | fullscreen";
        else if (options.toolbar === false)
            toolbar = false;
        else
            toolbar = options.toolbar.toString().replace(/,/g, " ");
        //#endregion

        //#region Menu
        let menuBar = false;
        let menu: any = {};
        if (options.menu === true)
        {
            menuBar = true;
            menu = {
                file: { title: "", items: "" },
                edit: { title: "Edit", items: "undo redo | cut copy | selectall searchreplace" },
                view: { title: "View", items: "preview code wordcount | fullscreen" },
                insert: { title: "", items: "" },
                format: { title: "Format", items: "bold italic underline strikethrough superscript subscript | fontformats align blockformats | backcolor removeformat" },
                table: { title: "", items: "" },
                tools: { title: "", items: "" },
            };
        }
        else if (options.menu === false)
        {
            menuBar = false;
            menu = undefined;
        }
        else
        {
            menuBar = true;

            //#region Menu file
            if (!options.menu.file)
                menu.file = { title: "", items: "" };
            else
            {
                let defaultItems = "preview";
                if (options.menu.file === true)
                    menu.file = { title: "File", items: defaultItems };
                else
                    menu.file = { title: (options.menu.file.title == null) ? "File" : options.menu.file.title, items: (options.menu.file.items == null) ? defaultItems : options.menu.file.items.toString().replace(/,/g, " ") };
            }
            //#endregion

            //#region Menu edit
            if (!options.menu.edit)
                menu.edit = { title: "", items: "" };
            else
            {
                let defaultItems = "undo redo | cut copy | selectall searchreplace";
                if (options.menu.edit === true)
                    menu.edit = { title: "Edit", items: defaultItems };
                else
                    menu.edit = { title: (options.menu.edit.title == null) ? "Edit" : options.menu.edit.title, items: (options.menu.edit.items == null) ? defaultItems : options.menu.edit.items.toString().replace(/,/g, " ") };
            }
            //#endregion

            //#region Menu view
            if (!options.menu.view)
                menu.view = { title: "", items: "" };
            else
            {
                let defaultItems = "preview code wordcount fullscreen";
                if (options.menu.view === true)
                    menu.view = { title: "View", items: defaultItems };
                else
                    menu.view = { title: (options.menu.view.title == null) ? "View" : options.menu.view.title, items: (options.menu.view.items == null) ? defaultItems : options.menu.view.items.toString().replace(/,/g, " ") };
            }
            //#endregion

            //#region Menu insert
            if (!options.menu.insert)
                menu.insert = { title: "", items: "" };
            else
            {
                let defaultItems = "link | charmap pagebreak";
                if (options.menu.insert === true)
                    menu.insert = { title: "Insert", items: defaultItems };
                else
                    menu.insert = { title: (options.menu.insert.title == null) ? "Insert" : options.menu.insert.title, items: (options.menu.insert.items == null) ? defaultItems : options.menu.insert.items.toString().replace(/,/g, " ") };
            }
            //#endregion

            //#region Menu format
            if (!options.menu.format)
                menu.format = { title: "", items: "" };
            else
            {
                let defaultItems = "bold italic underline strikethrough superscript subscript | fontformats align blockformats | backcolor removeformat";
                if (options.menu.format === true)
                    menu.format = { title: "Format", items: defaultItems };
                else
                    menu.format = { title: (options.menu.format.title == null) ? "Format" : options.menu.format.title, items: (options.menu.format.items == null) ? defaultItems : options.menu.format.items.toString().replace(/,/g, " ") };
            }
            //#endregion

            //#region Menu table
            if (!options.menu.table)
                menu.table = { title: "", items: "" };
            else
            {
                let defaultItems = "inserttable cell row";
                if (options.menu.table === true)
                    menu.table = { title: "Table", items: defaultItems };
                else
                    menu.table = { title: (options.menu.table.title == null) ? "Table" : options.menu.table.title, items: (options.menu.table.items == null) ? defaultItems : options.menu.table.items.toString().replace(/,/g, " ") };
            }
            //#endregion

            //#region Menu tools
            if (!options.menu.tools)
                menu.tools = { title: "", items: "" };
            else
            {
                let defaultItems = "code wordcount";
                if (options.menu.tools === true)
                    menu.tools = { title: "Tools", items: defaultItems };
                else
                    menu.tools = { title: (options.menu.tools.title == null) ? "Tools" : options.menu.tools.title, items: (options.menu.tools.items == null) ? defaultItems : options.menu.tools.items.toString().replace(/,/g, " ") };
            }
            //#endregion
        }
        //#endregion

        //#region Custom items
        let customItemValues = "";
        if (options.customToolItems != null)
        {
            for (let i = 0; i < options.customToolItems.length; i++)
                customItemValues += " customItem" + i;
        }
        //#endregion

        //#region CustomMenu items
        let divMenuItemTop = (options.label != null && options.labelSettings!.position == PositionEnum.Top) ? 24 : 6;
        this._divMenuItem = div(this.container(), { css: "position: absolute; top: " + divMenuItemTop + "px; right: 5px; z-index: 1; display: none;" });
        if (menubar)
        {
            if (options.customMenuItems != null)
            {
                for (let menuItem of options.customMenuItems)
                    this.addMenuItem(menuItem);
            }
        }
        //#endregion

        //#region Speech recognizer
        if (options.speechRecognizer !== false)
        {
            this._finalTextSpeeched = "";
            this._speechRecognizer = createSpeechRecognizer({
                size: 20,
                cssContainer: "margin-left: 10px;" + ((options.speechRecognizer.position == EditorSpeechRecognizerPositionEnum.MenuItems) ? ((options.menu !== false) ? "top: 48px; right: -6px;" : "top: 10px;") : ""),
                stopAtClick: options.speechRecognizer.stopAtClick,
                onEnd: (e) =>
                {
                    if (this._wndCommands != null)
                        this._wndCommands.close();

                    if (this._wndTempMessage != null)
                        this._wndTempMessage.close();
                },
                onStart: (e) => this._finalTextSpeeched = this.value() + " ",
                onClick: (e) => 
                {
                    if ((options!.speechRecognizer! as vrEditorSpeechRecognizerSettings).mode == EditorSpeechRecognizerModeEnum.Popup)
                    {
                        if ((this._wndTempMessage == null || !this._wndTempMessage.visible()) && !e.sender.isRecording())
                            this.openWindowTempMessage();
                        else if (this._wndTempMessage != null)
                            this._wndTempMessage.close();
                    }
                },
                onResult: (e) =>
                {
                    if (e.interimResults.length > 0)
                    {
                        let interimResults = this.parseInput(e.interimResults, true);
                        if (this._txtTempMessage != null && (options!.speechRecognizer! as vrEditorSpeechRecognizerSettings).mode == EditorSpeechRecognizerModeEnum.Popup)
                            this._txtTempMessage.value(interimResults);
                        else
                            this.value(this._finalTextSpeeched + interimResults);
                    }

                    if (e.finalResults.length > 0)
                    {
                        if (e.finalResults.toLowerCase().includes("stop registrazione") || e.finalResults.toLowerCase().includes("fine registrazione"))
                            e.sender.stop();

                        let finalResults = this.parseInput(e.finalResults);
                        if (this._txtTempMessage != null && (options!.speechRecognizer! as vrEditorSpeechRecognizerSettings).mode == EditorSpeechRecognizerModeEnum.Popup)
                        {
                            this._txtTempMessage.clear();
                            this.insertTextAtCursor(finalResults);
                        }
                        else
                        {
                            this._finalTextSpeeched += finalResults;
                            this.value(this._finalTextSpeeched);
                        }
                    }
                }
            }, this._divMenuItem);
        }
        //#endregion

        //#region TinyMce control settings
        tinyMCE.baseURL = options.baseUrl;
        tinyMCE.suffix = ".min";
        tinyMCE.init(<TinyMceSettings>
            {
                selector: "#" + this.element().id,
                height: "100%",
                readonly: !options.enable,
                placeholder: options.placeholder,
                resize: options.resizable,
                toolbar_mode: options.toolbarMode,
                paste_data_images: options.pasteImages,
                language: options.language,
                menu: menu,
                menubar: menuBar,
                statusbar: options.statusbar,
                toolbar: toolbar + customItemValues,
                plugins: options.plugins,
                browser_spellcheck: options.browserSpellCheck,
                contextmenu: false,
                font_size_formats: options.fontSize.formatSizeList.join("pt ") + "pt",
                content_style: "body { font-size: " + options.fontSize.defaultSize + "pt; } p { margin-top: 0px; margin-bottom: 0px; }",
                forced_root_block: "div",
                paste_as_text: options.pasteAsText,
                setup: (editor: any) =>
                {
                    //#region Custom items
                    if (options!.customToolItems != null)
                    {
                        let i = 0;
                        for (let customToolItem of options!.customToolItems)
                        {
                            editor.ui.registry.addButton("customItem" + i,
                                {
                                    icon: customToolItem.icon,
                                    image: customToolItem.imageUrl,
                                    tooltip: customToolItem.tooltip,
                                    text: customToolItem.text,
                                    onAction: function (e: any)
                                    {
                                        if (customToolItem.onClick != null)
                                        {
                                            let clickEvent = new EditorItemClickEvent();
                                            clickEvent.sender = this;
                                            customToolItem.onClick(clickEvent);
                                        }
                                    }
                                });
                            i++;
                        }
                    }
                    //#endregion

                    //#region Events
                    editor.on("keyup", (e: any) =>
                    {
                        if (options!.onKeyUp != null)
                        {
                            let event = new EditorOnKeyUpEvent();
                            event.sender = this;
                            event.key = e.key;
                            event.keyCode = e.keyCode;
                            event.realEvent = e;
                            options!.onKeyUp(event);
                        }
                    });

                    editor.on("keydown", (e: any) =>
                    {
                        //#region Go to next control when press tab
                        if (e.key == KeyEnum.Tab)
                        {
                            let nextControlId = puma(this.container()).nextAll(".vrControlsContainer").first().attr("id");
                            if (nextControlId != null && nextControlId != "")
                            {
                                nextControlId = nextControlId.replace("Container", "");
                                let control = ControlManager.get(nextControlId);
                                if (control != null)
                                    control.focus();
                                else
                                    puma(nextControlId).focus();

                                e.preventDefault();
                            }
                        }
                        //#endregion

                        if (options!.onKeyDown != null)
                        {
                            let event = new EditorOnKeyDownEvent();
                            event.sender = this;
                            event.key = e.key;
                            event.keyCode = e.keyCode;
                            event.realEvent = e;
                            options!.onKeyDown(event);

                            if (event.isDefaultPrevented())
                            {
                                e.preventDefault();
                                return;
                            }
                        }
                    });

                    editor.on("init", (e: any) =>
                    {
                        this._initialized = true;
                        puma(this._divMenuItem).show();
                        puma(e.target.iframeElement.contentDocument).find("html").height("100%");
                        puma(e.target.iframeElement.contentDocument).find("body").height("-webkit-fill-available");

                        if (options!.onInit != null)
                        {
                            let event = new EditorOnInitEvent();
                            event.sender = this;
                            event.event = e;
                            options!.onInit(event);

                            if (event.isDefaultPrevented())
                                return;
                        }

                        //#region Text
                        if (options!.text != null)
                            this.value(options!.text);
                        else if (this._value != "")
                            this.value(this._value);
                        //#endregion
                    });

                    this._divDragFile = div(this.container(), { class: "vrEditorDragDrop", content: "Trascina qui i file..." });

                    editor.on("dragenter", (e: any) =>
                    {
                        if (options!.onDragEnter != null)
                        {
                            let dragEnterEvent = new EditorDragEnterEvent();
                            dragEnterEvent.sender = this;
                            dragEnterEvent.element = e.currentTarget;
                            dragEnterEvent.event = e;
                            dragEnterEvent.realEvent = e;
                            options!.onDragEnter(dragEnterEvent);
                        }

                        e.preventDefault();
                        e.stopPropagation();
                    });

                    editor.on("dragover", (e: any) =>
                    {
                        if (options!.onDragOver != null)
                        {
                            let dragOverEvent = new EditorDragOverEvent();
                            dragOverEvent.sender = this;
                            dragOverEvent.element = e.currentTarget;
                            dragOverEvent.event = e;
                            dragOverEvent.realEvent = e;
                            options!.onDragOver(dragOverEvent);

                            if (dragOverEvent.isDefaultPrevented())
                            {
                                e.preventDefault();
                                e.stopPropagation();
                                return;
                            }
                        }

                        puma(this._divDragFile).css({ "display": "flex" });

                        e.preventDefault();
                        e.stopPropagation();
                    });

                    ["dragenter", "dragover", "dragleave", "drop"].forEach(eventName =>
                    {
                        this._divDragFile.addEventListener(eventName, (e) =>
                        {
                            e.preventDefault()
                            e.stopPropagation()
                        }, false);
                    });

                    puma(this._divDragFile).on("dragleave", (e: any) => this.manageDragLeave(e));
                    editor.on("dragleave", (e: any) => this.manageDragLeave(e));

                    editor.on("drop", (e: any) => this.manageDrop(e));
                    puma(this._divDragFile).on("drop", (e: any) => this.manageDrop(e));
                    //#endregion
                }
            });
        this._tinyMceControl = tinyMCE.get(this.element().id);
        this._settings = this._tinyMceControl.settings;
        //#endregion

        //#region Events
        tinyMCE.activeEditor.on("focus", (e: any) =>
        {
            if (options!.onFocus != null)
            {
                let event = new EditorOnFocusEvent();
                event.sender = this;
                event.realEvent = e;
                options!.onFocus(event);
            }
        });

        tinyMCE.activeEditor.on("blur", (e: any) =>
        {
            if (options!.onBlur != null)
            {
                let event = new EditorOnBlurEvent();
                event.sender = this;
                event.realEvent = e;
                options!.onBlur(event);
            }
        });

        tinyMCE.activeEditor.on("ExecCommand", (e: any) =>
        {
            if (options!.onCommand != null)
            {
                let event = new EditorOnCommandEvent();
                event.sender = this;
                event.command = e.command;
                event.value = e.value;
                event.type = e.type;
                event.realEvent = e;
                options!.onCommand(event);
            }
        });

        tinyMCE.activeEditor.on("GetContent", (e: any) =>
        {
            if (options!.onSetContent != null)
            {
                let event = new EditorSetContentEvent();
                event.sender = this;
                event.content = e.content;
                event.element = e.element;
                event.format = e.format;
                event.type = e.type;
                event.realEvent = e;
                options!.onSetContent(event);
            }
        });

        tinyMCE.activeEditor.on("ObjectResizeStart", (e: any) =>
        {
            if (options!.onBeforeResize != null)
            {
                let event = new EditorOnResizingEvent();
                event.sender = this;
                event.height = e.height;
                event.width = e.width;
                event.target = e.target;
                event.type = e.type;
                event.realEvent = e;
                options!.onBeforeResize(event);
            }
        });

        tinyMCE.activeEditor.on("ObjectResized", (e: any) =>
        {
            if (options!.onAfterResize != null)
            {
                let event = new EditorOnResizedEvent();
                event.sender = this;
                event.height = e.height;
                event.width = e.width;
                event.target = e.target;
                event.type = e.type;
                event.realEvent = e;
                options!.onAfterResize(event);
            }
        });
        //#endregion
    }

    //#region Methods
    settings(): TinyMceSettings
    {
        return this._settings;
    }

    private openWindowTempMessage()
    {
        this.createWindowTempMessage();
        this._wndTempMessage.open();
    }

    private createWindowTempMessage()
    {
        if (this._wndTempMessage != null)
            return;

        let options = this.getOptions();
        this._wndTempMessage = createWindow({
            title: "Testo temporaneo",
            height: 210,
            width: 300,
            modal: false,
            position: { bottom: 37, right: 10 },
            footer: false,
            onClose: (e) =>
            {
                puma(this._wndTempMessage.container()).remove();
                (this._wndTempMessage as any) = null;
                (this._txtTempMessage as any) = null;
            },
        });

        this._txtTempMessage = createMultilineTextBox({
            placeholder: "Comincia a parlare per visualizzare il testo... fermati per inserirlo nell'editor",
            height: 160,
            enable: false,
            width: "100%"
        }, this._wndTempMessage.element())

        createButton({
            icon: IconClassicLight.Info,
            cssContainer: "margin-right: 16px; margin-top: 4px;",
            css: "font-size: 17px; border: none; background: none;",
            colorSettings: { textColor: "#FFF" },
            visible: (options.speechRecognizer! as vrEditorSpeechRecognizerSettings).showInfoCommands!,
            onClick: (e) =>
            {
                if (this._wndCommands == null || !this._wndCommands.visible())
                    this.openWindowCommands();
                else
                    this._wndCommands.close();
            }
        }, this._wndTempMessage.header())
    }

    private openWindowCommands()
    {
        this.createWindowCommands();
        this._wndCommands.open();
    }

    private createWindowCommands()
    {
        if (this._wndCommands != null)
            return;

        this._wndCommands = createWindow({
            title: "Comandi consentiti",
            height: 300,
            width: 185,
            modal: false,
            position: { bottom: 255, right: 10 },
            footer: false,
            onClose: (e) =>
            {
                puma(this._wndCommands.container()).remove();
                (this._wndCommands as any) = null;
            },
            content: `<div style='font-size: 14px;'>Comandi consentiti: <ul>
                    <li>A capo</li>
                    <li>Virgola</li>
                    <li>Punto</li>
                    <li>Due punti</li>
                    <li>Punto e virgola</li>
                    <li>Punto virgola</li>
                    <li>Punto esclamativo</li>
                    <li>Punto interrogativo</li>
                    <li>Puntini</li>
                    <li>Trattino</li>
                    <li>Fine registrazione</li>
                </ul></font>`
        });
    }

    private parseInput(text: string, interim = false)
    {
        //#region Replace special characters
        text = this.replaceAll(text, " a capo ", "<br />");
        text = this.replaceAll(text, " A capo ", "<br />");
        text = this.replaceAll(text, " a capo", "<br />");
        text = this.replaceAll(text, " A capo", "<br />");
        text = this.replaceAll(text, "a capo ", "<br />");
        text = this.replaceAll(text, "A capo ", "<br />");
        text = this.replaceAll(text, "a capo", "<br />");
        text = this.replaceAll(text, "A capo", "<br />");
        text = this.replaceAll(text, "trattino", " - ");
        text = this.replaceAll(text, "Trattino", " - ");
        text = this.replaceAll(text, " punto e virgola", "; ");
        text = this.replaceAll(text, " Punto e virgola", "; ");
        text = this.replaceAll(text, " punto virgola", "; ");
        text = this.replaceAll(text, " Punto virgola", "; ");
        text = this.replaceAll(text, " virgola", ", ");
        text = this.replaceAll(text, " Virgola", ", ");
        text = this.replaceAll(text, " due punti", ": ");
        text = this.replaceAll(text, " Due punti", ": ");
        text = this.replaceAll(text, " slash ", "/");
        text = this.replaceAll(text, " Slash ", "/");
        text = this.replaceAll(text, " 2 punti", ": ");
        text = this.replaceAll(text, " punto esclamativo", "! ");
        text = this.replaceAll(text, " Punto esclamativo", "! ");
        text = this.replaceAll(text, " esclamativo", "! ");
        text = this.replaceAll(text, " Esclamativo", "! ");
        text = this.replaceAll(text, " punto interrogativo", "? ");
        text = this.replaceAll(text, " Punto interrogativo", "? ");
        text = this.replaceAll(text, " interrogativo", "? ");
        text = this.replaceAll(text, " Interrogativo", "? ");
        text = this.replaceAll(text, "pumo", "Pumo");
        text = this.replaceAll(text, " punto", ". ");
        text = this.replaceAll(text, " Punto", ". ");
        text = this.replaceAll(text, " puntini", "... ");
        text = this.replaceAll(text, " Puntini", "... ");

        if (!interim)
        {
            text = this.replaceAll(text, "stop registrazione", " ");
            text = this.replaceAll(text, "Stop registrazione", " ");
            text = this.replaceAll(text, "fine registrazione", " ");
            text = this.replaceAll(text, "Fine registrazione", " ");
        }
        //#endregion

        return text;
    }

    private replaceAll(text: string, find: string, replace: string)
    {
        let findLower = find.toLowerCase();
        let findUpper = find.toUpperCase();
        let findCapitalize = find.vrCapitalize();

        text = text.replace(new RegExp(findLower, "g"), replace);
        text = text.replace(new RegExp(findUpper, "g"), replace);
        text = text.replace(new RegExp(findCapitalize, "g"), replace);
        return text;
    }

    private manageDragLeave(e: any)
    {
        let options = this.getOptions();
        if (options!.onDragLeave != null)
        {
            let dragLeaveEvent = new EditorDragLeaveEvent();
            dragLeaveEvent.sender = this;
            dragLeaveEvent.element = e.currentTarget;
            dragLeaveEvent.event = e;
            options!.onDragLeave(dragLeaveEvent);

            if (dragLeaveEvent.isDefaultPrevented())
            {
                e.preventDefault();
                e.stopPropagation();
                return;
            }
        }

        puma(this._divDragFile).hide();

        e.preventDefault();
        e.stopPropagation();
    }

    private manageDrop(e: any)
    {
        let options = this.getOptions();
        if (options!.onDrop != null)
        {
            let files: File[] = [...e.dataTransfer.files as any];

            let dropEvent = new EditorDropEvent();
            dropEvent.sender = this;
            dropEvent.element = e.currentTarget;
            dropEvent.files = files;
            dropEvent.event = e;
            options!.onDrop(dropEvent);

            if (dropEvent.isDefaultPrevented())
            {
                e.preventDefault();
                e.stopPropagation();
                return;
            }
        }

        puma(this._divDragFile).hide();

        e.preventDefault();
        e.stopPropagation();
    }

    tinyMceControl(): any
    {
        return this._tinyMceControl;
    }

    value(text?: string | null, html = true): string
    {
        if (text != null)
        {
            this._value = text;
            if (this.tinyMceControl().initialized)
                this.tinyMceControl().setContent(text);
        }

        let result = (this.tinyMceControl().initialized) ? ((html) ? this.tinyMceControl().getContent() : this.body().innerText) : "";
        let options = this.getOptions();
        if (options.replacePtagWithDiv)
            return result.replace(/<p/g, "<div").replace(/\/p>/g, "/div>");
        else
            return result;
    }

    insertTextAtCursor(text: string): void
    {
        this.tinyMceControl().insertContent(text);
    }

    appendText(text: string, html = true): string
    {
        return this.value(this.value(null, html) + text);
    }

    body(): HTMLBodyElement
    {
        return this.tinyMceControl().getBody();
    }

    speechRecognizer()
    {
        return this._speechRecognizer;
    }

    clear(): void
    {
        this.value("");
        this._finalTextSpeeched = "";
    }

    focus(): void
    {
        if (!this._initialized)
        {
            let focusInterval = window.setInterval(() =>
            {
                if (this._initialized)
                {
                    $(tinyMCE.get(this.element().id).getBody()).trigger("focus")
                    window.clearInterval(focusInterval);
                }
            }, 100)
        }
        else
            $(tinyMCE.get(this.element().id).getBody()).trigger("focus")
    }

    addMenuItem(item: vrEditorCustomMenuItem)
    {
        let options = this.getOptions();
        if (options.menu !== false)
        {
            if (item.buttonGroupOptions == null) item.buttonGroupOptions = new ButtonGroupOptions();
            if (item.buttonGroupOptions.width == null) item.buttonGroupOptions.width = "auto";

            switch (item.type)
            {
                case EditorCustomMenuItemType.SplitButton: createSplitButton(item.splitButtonOptions, this._divMenuItem); break;
                case EditorCustomMenuItemType.Switch: createSwitch(item.switchOptions, this._divMenuItem); break;
                case EditorCustomMenuItemType.ButtonGroup: createButtonGroup(item.buttonGroupOptions, this._divMenuItem); break;
                case EditorCustomMenuItemType.ComboBox: createComboBox(item.comboBoxOptions, this._divMenuItem); break;
                case EditorCustomMenuItemType.DatePicker: createDatePicker(item.datePickerOptions, this._divMenuItem); break;
                case EditorCustomMenuItemType.TextBox: createTextBox(item.textBoxOptions, this._divMenuItem); break;
                case EditorCustomMenuItemType.Button: createButton(item.buttonOptions, this._divMenuItem); break;
                case EditorCustomMenuItemType.Separator: createSeparator(item.separatorOptions, this._divMenuItem); break;
                case EditorCustomMenuItemType.Label: createLabel(item.labelOptions, this._divMenuItem); break;
            }
        }
    }

    getOptions()
    {
        return this.options<EditorOptions>();
    }
    //#endregion

    //#region Overrides
    enable(): void
    {
        super.enable();
        if (this.settings() != null)
            this.settings().readonly = false;

        if (tinyMCE != null && tinyMCE.activeEditor != null)
            tinyMCE.activeEditor.mode.set("design");

        if (this._speechRecognizer != null)
            this._speechRecognizer.enable();
    }

    disable(): void
    {
        super.disable();
        if (this.settings() != null)
            this.settings().readonly = true;

        if (tinyMCE != null && tinyMCE.activeEditor != null)
            tinyMCE.activeEditor.mode.set("readonly");

        if (this._speechRecognizer != null)
            this._speechRecognizer.disable();
    }
    //#endregion
}
//#endregion

//#region Classes
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
//#endregion

//#region Events
class EditorEvent extends VrControlsEvent
{
    sender: Editor;
    realEvent: any;
}

export class EditorItemClickEvent extends EditorEvent
{
}

class EditorOnFocusEvent extends EditorEvent
{ }

class EditorOnBlurEvent extends EditorEvent
{ }

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

class EditorDragEnterEvent extends EditorDragDropEvent { }
class EditorDragOverEvent extends EditorDragDropEvent { }
class EditorDragLeaveEvent extends EditorDragDropEvent { }
//#endregion