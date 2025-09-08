import { puma, jqueryVariable, notifyError, WebApiModeEnum, span } from "../ui/vr.js";
class UtilityManager {
  static createGuid() {
    const hex = [...Array(256).keys()].map((index) => index.toString(16).padStart(2, "0"));
    const r = crypto.getRandomValues(new Uint8Array(16));
    r[6] = r[6] & 15 | 64;
    r[8] = r[8] & 63 | 128;
    return [...r.entries()].map(([index, int]) => [4, 6, 8, 10].includes(index) ? `-${hex[int]}` : hex[int]).join("");
  }
  static currentSequence = 0;
  static getCurrentSequence() {
    return ++this.currentSequence;
  }
  static interval(callback, each, timeout, timeoutCallback) {
    let interval = window.setInterval(() => callback(), each);
    if (timeout != null)
      window.setTimeout(() => {
        window.clearInterval(interval);
        if (timeoutCallback != null)
          timeoutCallback();
      }, timeout);
  }
  static createIcon(icon) {
    return puma("<i class='" + icon + " vrIcon' aria-hidden='true'></i>")[0];
  }
  static duplicate(element) {
    if (element != null) {
      if (Array.isArray(element))
        return element.filter((k) => k).map((k) => k);
      else
        return JSON.parse(JSON.stringify(element));
    }
    return null;
  }
  static equals(item1, item2) {
    if (item1 == null && item2 == null)
      return true;
    else if (item1 == null || item2 == null)
      return false;
    if (Object.prototype.toString.call(item1) === "[object Date]" && Object.prototype.toString.call(item2) === "[object Date]")
      return Date.vrEquals(item1, item2);
    else if (typeof item1 == "number" && typeof item2 == "number")
      return Number(item1) == Number(item2);
    else if (typeof item1 == "string" && typeof item2 == "string" || typeof item1 == "boolean" && typeof item2 == "boolean")
      return item1 == item2;
    else
      return item1 == item2;
  }
  static getMonthNumberByName(monthName) {
    switch (monthName.toLowerCase()) {
      case "gennaio":
        return 0;
      case "febbraio":
        return 1;
      case "marzo":
        return 2;
      case "aprile":
        return 3;
      case "maggio":
        return 4;
      case "giugno":
        return 5;
      case "luglio":
        return 6;
      case "agosto":
        return 7;
      case "settembre":
        return 8;
      case "ottobre":
        return 9;
      case "novembre":
        return 10;
      case "dicembre":
        return 11;
      default:
        return -1;
    }
  }
  static doAjaxCall(settings, callBack, errorCallback) {
    let data = void 0;
    if (settings.request != null) {
      settings.request["authKey"] = settings.authKey;
      data = JSON.stringify(settings.request);
    }
    let formDataMultipart = null;
    if (settings.file != null) {
      formDataMultipart = new FormData();
      formDataMultipart.append("file", settings.file);
    }
    let result = null;
    jqueryVariable().ajax({
      async: settings.mode == WebApiModeEnum.Async ? true : false,
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Accept-Language", "it");
        xhr.setRequestHeader("AuthKey", settings.authKey);
        if (settings.headerParameters != null) {
          let headerParameters = Object.getOwnPropertyNames(settings.headerParameters);
          for (let param of headerParameters)
            xhr.setRequestHeader(param, settings.headerParameters[param]);
        }
      },
      contentType: settings.file != null ? false : "application/json",
      data: settings.file != null ? formDataMultipart : data,
      method: "POST",
      processData: false,
      url: settings.method,
      success: (response) => {
        if (settings.mode == WebApiModeEnum.Sync)
          result = response;
        if (callBack != null) {
          response.guid = settings.request != null ? settings.request.guid : null;
          callBack(response);
        }
      },
      error: (response) => {
        notifyError("Errore nella chiamata alla webApi");
        console.error(response);
        if (errorCallback != null)
          errorCallback();
      }
    });
    return result;
  }
  static htmlDecode(text) {
    let doc = new DOMParser().parseFromString(text, "text/html");
    return doc.documentElement.textContent;
  }
  static textWidth(object, outerWidth = false) {
    let width = 0;
    if (typeof object == "string") {
      let spanTemp = span(document.body);
      spanTemp.id = "utility_tempSpanTextWidth";
      spanTemp.innerHTML = object.replace(/\s/g, "&nbsp;");
      width = spanTemp.offsetWidth;
      puma("#utility_tempSpanTextWidth").remove();
    } else {
      let originalHtmlText = typeof object == "string" ? object : puma(object).html();
      let htmlCalculated = "<span style='display: inline-block; overflow-y: scroll; white-space: nowrap;'>" + originalHtmlText + "</span>";
      puma(object).html(htmlCalculated);
      if (!outerWidth)
        width = puma(object).find("span:first").width();
      else
        width = puma(object).find("span:first").outerWidth(true);
      puma(object).html(originalHtmlText);
    }
    return width;
  }
  static objectWidth(object, outerWidth = false) {
    let dup = puma(object).clone();
    puma("html").append(dup);
    let width = 0;
    if (!outerWidth)
      width = puma(dup).width();
    else
      width = puma(dup).outerWidth(true);
    return width;
  }
  static downloadPdfBytes(base64Bytes, name = "download.pdf") {
    if (!name.endsWith(".pdf"))
      name += ".pdf";
    let arraybuffer = this.base64ToArrayBuffer(base64Bytes);
    let blob = new Blob([arraybuffer], { type: "application/pdf" });
    let url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
  }
  static base64ToArrayBuffer(base64) {
    var binary_string = window.atob(base64.replace(/\s/g, ""));
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++)
      bytes[i] = binary_string.charCodeAt(i);
    return bytes.buffer;
  }
  static openUrl(url, name = "download", newTab = false) {
    let aTag = document.createElement("a");
    aTag.id = "utility_tempOpeningUrl";
    aTag.href = url;
    aTag.download = name;
    if (newTab)
      aTag.target = "_blank";
    aTag.click();
    puma("#utility_tempOpeningUrl").remove();
  }
  static isValidEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  //#region Files/Css/Js
  static addCssStyle(cssRules, id) {
    if (cssRules != null && cssRules != "") {
      let idAttribute = id == null ? "" : " id='" + id + "'";
      puma("<style" + idAttribute + ">" + cssRules + "</style>").vrAppendToPuma("head");
    }
  }
  static addCssFiles(...pathList) {
    let promise = new Promise((callback) => {
      if (pathList != null && pathList.length > 0) {
        let head = document.getElementsByTagName("head")[0];
        for (let path of pathList) {
          let existing = $("link[rel='stylesheet']").filter((k, e) => e.href.toLowerCase().startsWith(path.toLowerCase() + "?"));
          if (existing.length == 0) {
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
  static addJsScript(jsRules, id) {
    if (jsRules != null && jsRules != "") {
      let idAttribute = id == null ? "" : " id='" + id + "'";
      puma("<script" + idAttribute + ">" + jsRules + "<\/script>").vrAppendToPuma("head");
    }
  }
  static addJsFiles(...pathList) {
    let promise = new Promise((callback) => {
      if (pathList != null && pathList.length > 0) {
        $.when(...pathList.map((k) => $.getScript(k).promise())).done(() => {
          callback();
        });
      }
    });
    return promise;
  }
  //#endregion
  static bytesToBase64(bytes) {
    const base64abc = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "+",
      "/"
    ];
    let result = "", i, l = bytes.length;
    for (i = 2; i < l; i += 3) {
      result += base64abc[bytes[i - 2] >> 2];
      result += base64abc[(bytes[i - 2] & 3) << 4 | bytes[i - 1] >> 4];
      result += base64abc[(bytes[i - 1] & 15) << 2 | bytes[i] >> 6];
      result += base64abc[bytes[i] & 63];
    }
    if (i === l + 1) {
      result += base64abc[bytes[i - 2] >> 2];
      result += base64abc[(bytes[i - 2] & 3) << 4];
      result += "==";
    }
    if (i === l) {
      result += base64abc[bytes[i - 2] >> 2];
      result += base64abc[(bytes[i - 2] & 3) << 4 | bytes[i - 1] >> 4];
      result += base64abc[(bytes[i - 1] & 15) << 2];
      result += "=";
    }
    return result;
  }
  static base64ToBytes(base64) {
    if (base64.length % 4 !== 0) {
      throw new Error("Unable to parse base64 string.");
    }
    const index = base64.indexOf("=");
    if (index !== -1 && index < base64.length - 2) {
      throw new Error("Unable to parse base64 string.");
    }
    let missingOctets = base64.endsWith("==") ? 2 : base64.endsWith("=") ? 1 : 0, n = base64.length, result = new Uint8Array(3 * (n / 4)), buffer;
    for (let i = 0, j = 0; i < n; i += 4, j += 3) {
      buffer = this.getBase64Code(base64.charCodeAt(i)) << 18 | this.getBase64Code(base64.charCodeAt(i + 1)) << 12 | this.getBase64Code(base64.charCodeAt(i + 2)) << 6 | this.getBase64Code(base64.charCodeAt(i + 3));
      result[j] = buffer >> 16;
      result[j + 1] = buffer >> 8 & 255;
      result[j + 2] = buffer & 255;
    }
    return result.subarray(0, result.length - missingOctets);
  }
  static getBase64Code(charCode) {
    const base64codes = [
      255,
      255,
      255,
      255,
      255,
      255,
      255,
      255,
      255,
      255,
      255,
      255,
      255,
      255,
      255,
      255,
      255,
      255,
      255,
      255,
      255,
      255,
      255,
      255,
      255,
      255,
      255,
      255,
      255,
      255,
      255,
      255,
      255,
      255,
      255,
      255,
      255,
      255,
      255,
      255,
      255,
      255,
      255,
      62,
      255,
      255,
      255,
      63,
      52,
      53,
      54,
      55,
      56,
      57,
      58,
      59,
      60,
      61,
      255,
      255,
      255,
      0,
      255,
      255,
      255,
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      255,
      255,
      255,
      255,
      255,
      255,
      26,
      27,
      28,
      29,
      30,
      31,
      32,
      33,
      34,
      35,
      36,
      37,
      38,
      39,
      40,
      41,
      42,
      43,
      44,
      45,
      46,
      47,
      48,
      49,
      50,
      51
    ];
    if (charCode >= base64codes.length) {
      throw new Error("Unable to parse base64 string.");
    }
    const code = base64codes[charCode];
    if (code === 255) {
      throw new Error("Unable to parse base64 string.");
    }
    return code;
  }
  static base64ToFile(base64, fileName, options) {
    return fetch(base64).then(function(res) {
      return res.arrayBuffer();
    }).then(function(buf) {
      return new File([buf], fileName, options);
    });
  }
  static base64ToBlob(base64, contentType = "", sliceSize = 512) {
    const byteCharacters = atob(base64);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
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
  static enterFullScreen(target, errorCallback) {
    try {
      let element = target;
      let doc = window.document;
      if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        if (element.requestFullscreen)
          element.requestFullscreen();
        else if (element.mozRequestFullScreen)
          element.mozRequestFullScreen();
        else if (element.webkitRequestFullscreen)
          element.webkitRequestFullscreen();
        else if (element.msRequestFullscreen)
          element.msRequestFullscreen();
        else {
          if (errorCallback != null)
            errorCallback();
        }
      }
    } catch (e) {
      if (errorCallback != null)
        errorCallback();
    }
  }
  static exitFullScreen() {
    try {
      let doc = window.document;
      if (!(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement)) {
        if (doc.exitFullscreen)
          doc.exitFullscreen();
        else if (doc.mozCancelFullScreen)
          doc.mozCancelFullScreen();
        else if (doc.webkitExitFullscreen)
          doc.webkitExitFullscreen();
        else if (doc.msExitFullscreen)
          doc.msExitFullscreen();
      }
    } catch (e) {
    }
  }
  //#region Drag
  static drag(element, dragEvent) {
    if (dragEvent == null) dragEvent = new VrDragSupportEvent();
    if (dragEvent.sensibility == null) dragEvent.sensibility = 50;
    if (dragEvent.typeEnum == null) dragEvent.typeEnum = 2;
    puma(element).on("mousedown", (emd) => {
      let startingXPosition = emd.clientX;
      let startingYPosition = emd.clientY;
      let target = puma(emd.currentTarget);
      let targetStartingXPosition = target.offset().left;
      let targetStartingYPosition = target.offset().top;
      let leftMoved = false;
      let rightMoved = false;
      let upMoved = false;
      let downMoved = false;
      let moved = false;
      puma(document).on("mousemove", (emm) => {
        let actualXPosition = emm.clientX;
        let actualYPosition = emm.clientY;
        let xDiff = startingXPosition - actualXPosition;
        let yDiff = startingYPosition - actualYPosition;
        if (!(emm.clientX == startingXPosition && emm.clientY == startingYPosition)) {
          let leftPosition = 0;
          let topPosition = 0;
          switch (dragEvent.typeEnum) {
            case 2:
              {
                leftPosition = emm.clientX - $(target[0]).width() / 2;
                topPosition = emm.clientY;
              }
              break;
            case 1:
              {
                leftPosition = emm.clientX - $(target[0]).width() / 2;
                topPosition = targetStartingYPosition;
              }
              break;
            case 0:
              {
                leftPosition = targetStartingXPosition;
                topPosition = emm.clientY;
              }
              break;
          }
          target.offset({ top: topPosition, left: leftPosition });
          if (dragEvent.dragging != null) {
            let dragEveryEvent = new VrDragEveryEvent();
            dragEveryEvent.left = target.position().left;
            dragEveryEvent.top = target.position().top;
            dragEveryEvent.element = $(element)[0];
            dragEvent.dragging(dragEveryEvent);
          }
        }
        if (Math.abs(xDiff) > Math.abs(yDiff)) {
          if (dragEvent == null && xDiff != 0)
            return;
          moved = true;
          if (xDiff > dragEvent.sensibility)
            leftMoved = true;
          else if (xDiff < -dragEvent.sensibility)
            rightMoved = true;
        } else if (Math.abs(xDiff) < Math.abs(yDiff)) {
          if (dragEvent == null && xDiff != 0)
            return;
          moved = true;
          if (yDiff > dragEvent.sensibility)
            upMoved = true;
          else if (yDiff < -dragEvent.sensibility)
            downMoved = true;
        }
      });
      puma(document).mouseup((e) => {
        puma(document).unbind("mouseup");
        puma(document).unbind("mousemove");
        if (leftMoved && dragEvent.dragLeft != null)
          dragEvent.dragLeft();
        if (rightMoved && dragEvent.dragRight != null)
          dragEvent.dragRight();
        if (upMoved && dragEvent.dragUp != null)
          dragEvent.dragUp();
        if (downMoved && dragEvent.dragDown != null)
          dragEvent.dragDown();
        if (moved && dragEvent.dragged != null) {
          let dragEveryEvent = new VrDragEveryEvent();
          dragEveryEvent.left = target.position().left;
          dragEveryEvent.top = target.position().top;
          dragEveryEvent.element = $(element)[0];
          dragEvent.dragged(dragEveryEvent);
        }
      });
    });
  }
  //#endregion
}
class VrDragSupportEvent {
  sensibility = 50;
  typeEnum;
  dragLeft;
  dragRight;
  dragUp;
  dragDown;
  dragged;
  dragging;
}
class VrDragEveryEvent {
  left;
  top;
  element;
}
export {
  UtilityManager
};
//# sourceMappingURL=utilityManager.js.map
