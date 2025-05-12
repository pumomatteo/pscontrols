import { jqueryVariable, puma, WebApiModeEnum, span, notifyError, IconClass } from "../ui/vr";

export class UtilityManager
{
    static createGuid()
    {
        const hex = [...Array(256).keys()].map(index => (index).toString(16).padStart(2, '0'));
        const r = crypto.getRandomValues(new Uint8Array(16));
        r[6] = (r[6] & 0x0f) | 0x40;
        r[8] = (r[8] & 0x3f) | 0x80;

        return [...r.entries()]
            .map(([index, int]) => [4, 6, 8, 10].includes(index) ? `-${hex[int]}` : hex[int])
            .join('');
    }

    static currentSequence: number = 0;
    static getCurrentSequence()
    {
        return ++this.currentSequence;
    }

    static interval(callback: Function, each: number, timeout?: number, timeoutCallback?: Function)
    {
        let interval = window.setInterval(() => callback(), each);
        if (timeout != null)
            window.setTimeout(() => 
            {
                window.clearInterval(interval);
                if (timeoutCallback != null)
                    timeoutCallback();
            }, timeout);
    }

    static createIcon(icon: IconClass): HTMLElement
    {
        return puma("<i class='" + icon + " vrIcon' aria-hidden='true'></i>")[0];
    }

    static duplicate(element: any): any
    {
        if (element != null)
        {
            if (Array.isArray(element))
                return element.filter(k => k).map(k => k);
            else
                return JSON.parse(JSON.stringify(element));
        }
        return null;
    }

    static equals(item1: any, item2: any) // Only primitive types
    {
        if (item1 == null && item2 == null)
            return true;
        else if (item1 == null || item2 == null)
            return false;

        if ((Object.prototype.toString.call(item1) === '[object Date]') && (Object.prototype.toString.call(item2) === '[object Date]'))
            return Date.vrEquals(item1, item2);
        else if (typeof (item1) == "number" && typeof (item2) == "number")
            return Number(item1) == Number(item2);
        else if ((typeof (item1) == "string" && typeof (item2) == "string") || (typeof (item1) == "boolean" && typeof (item2) == "boolean"))
            return item1 == item2;
        else
            return item1 == item2;
    }

    static getMonthNumberByName(monthName: string)
    {
        switch (monthName.toLowerCase())
        {
            case "gennaio": return MonthEnum.January;
            case "febbraio": return MonthEnum.February;
            case "marzo": return MonthEnum.March;
            case "aprile": return MonthEnum.April;
            case "maggio": return MonthEnum.May;
            case "giugno": return MonthEnum.June;
            case "luglio": return MonthEnum.July;
            case "agosto": return MonthEnum.August;
            case "settembre": return MonthEnum.September;
            case "ottobre": return MonthEnum.October;
            case "novembre": return MonthEnum.November;
            case "dicembre": return MonthEnum.December;
            default:
                return -1;
        }
    }

    static doAjaxCall<T>(settings: AjaxCallSettings, callBack?: (response: T) => void, errorCallback?: () => void)
    {
        let data = undefined;
        if (settings.request != null)
        {
            settings.request["authKey"] = settings.authKey;
            data = JSON.stringify(settings.request);
        }

        //#region Multipart
        let formDataMultipart = null;
        if (settings.file != null)
        {
            formDataMultipart = new FormData();
            formDataMultipart.append("file", settings.file);
        }
        //#endregion

        let result: T | null = null;
        jqueryVariable().ajax({
            async: (settings.mode == WebApiModeEnum.Async) ? true : false,
            beforeSend: (xhr: any) =>
            {
                //#region Header parameters
                xhr.setRequestHeader("Accept-Language", "it");
                xhr.setRequestHeader("AuthKey", settings.authKey);
                if (settings!.headerParameters != null)
                {
                    let headerParameters = Object.getOwnPropertyNames(settings!.headerParameters);
                    for (let param of headerParameters)
                        xhr.setRequestHeader(param, settings!.headerParameters[param]);
                }
                //#endregion
            },
            contentType: (settings.file != null) ? false : "application/json",
            data: (settings.file != null) ? formDataMultipart : data,
            method: "POST",
            processData: false,
            url: settings.method,
            success: (response: any) =>
            {
                if (settings!.mode == WebApiModeEnum.Sync)
                    result = response as T;

                if (callBack != null)
                {
                    response.guid = (settings.request != null) ? settings.request.guid : null;
                    callBack(response);
                }
            },
            error: (response: JQueryXHR) => 
            {
                notifyError("Errore nella chiamata alla webApi")
                console.error(response);

                if (errorCallback != null)
                    errorCallback();
            }
        });
        return result;
    }

    static htmlDecode(text: string)
    {
        let doc = new DOMParser().parseFromString(text, "text/html");
        return doc.documentElement.textContent;
    }

    static textWidth(object: HTMLElement | string, outerWidth = false): number
    {
        let width = 0;
        if (typeof (object) == "string")
        {
            let spanTemp = span(document.body);
            spanTemp.id = "utility_tempSpanTextWidth";

            spanTemp.innerHTML = object.replace(/\s/g, "&nbsp;");
            width = spanTemp.offsetWidth;

            puma("#utility_tempSpanTextWidth").remove();
        }
        else
        {
            // Wrap text into span
            let originalHtmlText = (typeof (object) == "string") ? object : puma(object).html();
            let htmlCalculated = "<span style='display: inline-block; overflow-y: scroll; white-space: nowrap;'>" + originalHtmlText + "</span>";
            puma(object).html(htmlCalculated);

            // Calculate width
            if (!outerWidth)
                width = puma(object).find("span:first").width();
            else
                width = puma(object).find("span:first").outerWidth(true);

            // Restore original
            puma(object).html(originalHtmlText);
        }
        return width;
    }

    static objectWidth(object: HTMLElement | string, outerWidth = false)
    {
        let dup = puma(object).clone();
        puma("html").append(dup);

        let width = 0;
        if (!outerWidth)
            width = puma(dup).width();
        else
            width = puma(dup).outerWidth(true);

        return width;
    }

    static downloadPdfBytes(base64Bytes: string, name = "download.pdf")
    {
        if (!name.endsWith(".pdf"))
            name += ".pdf";

        let arraybuffer = this.base64ToArrayBuffer(base64Bytes);
        let blob = new Blob([arraybuffer], { type: "application/pdf" });
        let url = URL.createObjectURL(blob);

        let a = document.createElement("a");
        a.href = url;
        a.download = name;
        a.click();

        // let url = "data:application/pdf;base64," + base64Bytes;
        // this.openUrl(url, name);
    }

    private static base64ToArrayBuffer(base64: string): ArrayBuffer
    {
        var binary_string = window.atob(base64.replace(/\s/g, ''));
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++)
            bytes[i] = binary_string.charCodeAt(i);

        return bytes.buffer;
    }

    static openUrl(url: string, name = "download", newTab = false)
    {
        let aTag = document.createElement("a");
        aTag.id = "utility_tempOpeningUrl";
        aTag.href = url;
        aTag.download = name;

        if (newTab)
            aTag.target = "_blank";

        aTag.click();
        puma("#utility_tempOpeningUrl").remove();
    }

    static isValidEmail(email: string)
    {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    //#region Files/Css/Js
    static addCssStyle(cssRules: string, id?: string)
    {
        if (cssRules != null && cssRules != "")
        {
            let idAttribute = (id == null) ? "" : " id='" + id + "'";
            puma("<style" + idAttribute + ">" + cssRules + "</style>").vrAppendToPuma("head");
        }
    }

    static addCssFiles(...pathList: string[])
    {
        let promise = new Promise((callback: Function) =>
        {
            if (pathList != null && pathList.length > 0)
            {
                let head = document.getElementsByTagName("head")[0];
                for (let path of pathList)
                {
                    let existing = $("link[rel='stylesheet']").filter((k, e) => (e as HTMLLinkElement).href.toLowerCase().startsWith(path.toLowerCase() + "?"));
                    if (existing.length == 0)
                    {
                        let css = document.createElement("link");
                        css.href = path;
                        css.type = "text/css";
                        css.rel = "stylesheet";
                        head.appendChild(css);
                    }
                }
                callback();
            }
        });
        return promise;
    }

    static addJsScript(jsRules: string, id?: string)
    {
        if (jsRules != null && jsRules != "")
        {
            let idAttribute = (id == null) ? "" : " id='" + id + "'";
            puma("<script" + idAttribute + ">" + jsRules + "</script>").vrAppendToPuma("head");
        }
    }

    static addJsFiles(...pathList: string[])
    {
        let promise = new Promise((callback: Function) =>
        {
            if (pathList != null && pathList.length > 0)
            {
                $.when(...pathList.map(k => $.getScript(k).promise())).done(() =>
                {
                    callback();
                })
            }
        });
        return promise;
    }
    //#endregion

    static bytesToBase64(bytes: Uint8Array)
    {
        const base64abc = [
            "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
            "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
            "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
            "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
            "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "/"
        ];

        let result = '', i, l = bytes.length;
        for (i = 2; i < l; i += 3)
        {
            result += base64abc[bytes[i - 2] >> 2];
            result += base64abc[((bytes[i - 2] & 0x03) << 4) | (bytes[i - 1] >> 4)];
            result += base64abc[((bytes[i - 1] & 0x0F) << 2) | (bytes[i] >> 6)];
            result += base64abc[bytes[i] & 0x3F];
        }
        if (i === l + 1)
        { // 1 octet yet to write
            result += base64abc[bytes[i - 2] >> 2];
            result += base64abc[(bytes[i - 2] & 0x03) << 4];
            result += "==";
        }
        if (i === l)
        { // 2 octets yet to write
            result += base64abc[bytes[i - 2] >> 2];
            result += base64abc[((bytes[i - 2] & 0x03) << 4) | (bytes[i - 1] >> 4)];
            result += base64abc[(bytes[i - 1] & 0x0F) << 2];
            result += "=";
        }
        return result;
    }

    static base64ToBytes(base64: any)
    {
        if (base64.length % 4 !== 0)
        {
            throw new Error("Unable to parse base64 string.");
        }
        const index = base64.indexOf("=");
        if (index !== -1 && index < base64.length - 2)
        {
            throw new Error("Unable to parse base64 string.");
        }
        let missingOctets = base64.endsWith("==") ? 2 : base64.endsWith("=") ? 1 : 0,
            n = base64.length,
            result = new Uint8Array(3 * (n / 4)),
            buffer;
        for (let i = 0, j = 0; i < n; i += 4, j += 3)
        {
            buffer =
                this.getBase64Code(base64.charCodeAt(i)) << 18 |
                this.getBase64Code(base64.charCodeAt(i + 1)) << 12 |
                this.getBase64Code(base64.charCodeAt(i + 2)) << 6 |
                this.getBase64Code(base64.charCodeAt(i + 3));
            result[j] = buffer >> 16;
            result[j + 1] = (buffer >> 8) & 0xFF;
            result[j + 2] = buffer & 0xFF;
        }
        return result.subarray(0, result.length - missingOctets);
    }

    private static getBase64Code(charCode: any)
    {
        const base64codes = [
            255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
            255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
            255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 62, 255, 255, 255, 63,
            52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 255, 255, 255, 0, 255, 255,
            255, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
            15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 255, 255, 255, 255, 255,
            255, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
            41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51
        ];

        if (charCode >= base64codes.length)
        {
            throw new Error("Unable to parse base64 string.");
        }
        const code = base64codes[charCode];
        if (code === 255)
        {
            throw new Error("Unable to parse base64 string.");
        }
        return code;
    }

    static base64ToFile(base64: string, fileName: string, options?: FilePropertyBag)
    {
        return (fetch(base64)
            .then(function (res) { return res.arrayBuffer(); })
            .then(function (buf) { return new File([buf], fileName, options); })
        );
    }

    static base64ToBlob(base64: string, contentType = '', sliceSize = 512)
    {
        const byteCharacters = atob(base64);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize)
        {
            const slice = byteCharacters.slice(offset, offset + sliceSize);
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++)
                byteNumbers[i] = slice.charCodeAt(i);

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }

    static enterFullScreen(target: HTMLElement, errorCallback?: Function)
    {
        try
        {
            let element = target as any;
            let doc = window.document as any;
            if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement)
            {
                //#region RequestFullScreen
                if (element.requestFullscreen)
                    element.requestFullscreen();
                else if (element.mozRequestFullScreen) // Firefox
                    element.mozRequestFullScreen();
                else if (element.webkitRequestFullscreen) // Chrome, Safari, Opera
                    element.webkitRequestFullscreen();
                else if (element.msRequestFullscreen) // Edge
                    element.msRequestFullscreen();
                else
                {
                    if (errorCallback != null)
                        errorCallback();
                }
                //#endregion
            }
        }
        catch (e)
        {
            if (errorCallback != null)
                errorCallback();
        }
    }

    static exitFullScreen()
    {
        try
        {
            let doc = window.document as any;
            if (!(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement))
            {
                //#region ExitFullScreen
                if (doc.exitFullscreen)
                    doc.exitFullscreen();
                else if (doc.mozCancelFullScreen) // Firefox
                    doc.mozCancelFullScreen();
                else if (doc.webkitExitFullscreen) // Chrome, Safari, Opera
                    doc.webkitExitFullscreen();
                else if (doc.msExitFullscreen) // Edge
                    doc.msExitFullscreen();
                //#endregion
            }
        }
        catch (e) { }
    }

    //#region Drag
    static drag(element: HTMLElement | JQuery | string, dragEvent?: VrDragSupportEvent)
    {
        if (dragEvent == null) dragEvent = new VrDragSupportEvent();
        if (dragEvent.sensibility == null) dragEvent.sensibility = 50;
        if (dragEvent.typeEnum == null) dragEvent.typeEnum = VrDragSupportTypeEnum.Both;

        puma(element).on("mousedown", (emd: JQuery.MouseDownEvent) =>
        {
            let startingXPosition = emd.clientX;
            let startingYPosition = emd.clientY;

            let target = puma(emd.currentTarget);
            let targetStartingXPosition = target.offset().left;
            let targetStartingYPosition = target.offset().top;

            //#region Moved variables
            let leftMoved = false;
            let rightMoved = false;
            let upMoved = false;
            let downMoved = false;
            let moved = false;
            //#endregion

            //#region Moving
            puma(document).on("mousemove", (emm: JQuery.MouseMoveEvent) => 
            {
                let actualXPosition = emm.clientX;
                let actualYPosition = emm.clientY;
                let xDiff = startingXPosition - actualXPosition;
                let yDiff = startingYPosition - actualYPosition;

                if (!(emm.clientX == startingXPosition && emm.clientY == startingYPosition))
                {
                    //#region Change position
                    let leftPosition = 0;
                    let topPosition = 0;
                    switch (dragEvent!.typeEnum)
                    {
                        case VrDragSupportTypeEnum.Both:
                            {
                                leftPosition = (emm.clientX - ($(target[0]).width()! / 2));
                                topPosition = emm.clientY;
                            }
                            break;
                        case VrDragSupportTypeEnum.Horizontal:
                            {
                                leftPosition = (emm.clientX - ($(target[0]).width()! / 2));
                                topPosition = targetStartingYPosition;
                            }
                            break;
                        case VrDragSupportTypeEnum.Vertical:
                            {
                                leftPosition = targetStartingXPosition;
                                topPosition = emm.clientY;
                            }
                            break;
                    }
                    target.offset({ top: topPosition, left: leftPosition });
                    //#endregion

                    //#region Dragging event
                    if (dragEvent!.dragging != null)
                    {
                        let dragEveryEvent = new VrDragEveryEvent();
                        dragEveryEvent.left = target.position().left;
                        dragEveryEvent.top = target.position().top;
                        dragEveryEvent.element = $(element as any)[0];
                        dragEvent!.dragging(dragEveryEvent);
                    }
                    //#endregion
                }

                //#region Drag direction
                if (Math.abs(xDiff) > Math.abs(yDiff))
                {
                    if (dragEvent == null && xDiff != 0)
                        return;

                    moved = true;
                    if (xDiff > dragEvent!.sensibility!)
                        leftMoved = true;
                    else if (xDiff < -dragEvent!.sensibility!)
                        rightMoved = true;
                }
                else if (Math.abs(xDiff) < Math.abs(yDiff))
                {
                    if (dragEvent == null && xDiff != 0)
                        return;

                    moved = true;
                    if (yDiff > dragEvent!.sensibility!)
                        upMoved = true;
                    else if (yDiff < -dragEvent!.sensibility!)
                        downMoved = true;
                }
                //#endregion
            });
            //#endregion

            //#region Stop moving
            puma(document).mouseup((e: JQuery.MouseUpEvent) =>
            {
                puma(document).unbind("mouseup");
                puma(document).unbind("mousemove");

                //#region Events
                if (leftMoved && dragEvent!.dragLeft != null)
                    dragEvent!.dragLeft();

                if (rightMoved && dragEvent!.dragRight != null)
                    dragEvent!.dragRight();

                if (upMoved && dragEvent!.dragUp != null)
                    dragEvent!.dragUp();

                if (downMoved && dragEvent!.dragDown != null)
                    dragEvent!.dragDown();

                if (moved && dragEvent!.dragged != null)
                {
                    let dragEveryEvent = new VrDragEveryEvent();
                    dragEveryEvent.left = target.position().left;
                    dragEveryEvent.top = target.position().top;
                    dragEveryEvent.element = $(element as any)[0];
                    dragEvent!.dragged(dragEveryEvent);
                }
                //#endregion
            });
            //#endregion
        });
    }
    //#endregion
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
    January,
    February,
    March,
    April,
    May,
    June,
    July,
    August,
    September,
    October,
    November,
    December
}

class VrDragSupportEvent
{
    public sensibility?: number = 50;
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
    Vertical,
    Horizontal,
    Both
}