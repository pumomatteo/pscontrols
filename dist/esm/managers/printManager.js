import { puma } from "../ui/vr.js";
class PrintManager {
  //#region Print bytes, pdf, image or html
  static printBytes(base64Bytes, options) {
    this.printBytesFileImageOrHtml(base64Bytes, "pdf", options, true);
  }
  static printPdf(path, options) {
    this.printBytesFileImageOrHtml(path, "pdf", options);
  }
  static printImage(path, options) {
    this.printBytesFileImageOrHtml(path, "image", options);
  }
  static printHtml(elementId, options) {
    if (elementId.startsWith("#"))
      elementId = elementId.substr(1);
    this.printBytesFileImageOrHtml(elementId, "html", options);
  }
  static printElement(element, options) {
    let elementId = "";
    if (typeof element != "string")
      elementId = puma(element)[0].id;
    if (elementId == "" || elementId == null) {
      puma(element)[0].id = "vr_printTemp";
      elementId = "vr_printTemp";
    }
    if (!elementId.startsWith("#"))
      elementId = "#" + elementId;
    if (options == null) options = new PrintHtmlOptions();
    puma(elementId).printThis({
      pageTitle: options.pageTitle,
      removeInlineStyles: options.removeInlineStyles,
      printDelay: options.printDelay,
      header: options.header,
      footer: options.footer,
      removeScripts: options.removeScripts,
      debug: options.debug,
      beforePrint: options.beforePrint,
      importCSS: true,
      importStyle: true,
      afterPrint: () => {
        if (elementId == "#vr_printTemp")
          puma(element)[0].id = "";
        if (options.afterPrint != null)
          options.afterPrint();
      }
    });
  }
  static printBytesFileImageOrHtml(pathBytesOrId, type, options, base64 = false, showModal = true) {
    if (pathBytesOrId == "")
      return;
    let title = void 0;
    let documentTitle = "File_" + (/* @__PURE__ */ new Date()).toLocaleString();
    let customCss = void 0;
    if (options != null) {
      if (options.type != null) type = options.type;
      if (options.headerTitle != null) title = options.headerTitle;
      if (options.documentTitle != null) documentTitle = options.documentTitle;
      if (options.customCss != null) customCss = options.customCss;
    }
    let printJsOptions = new PrintJsOptions();
    printJsOptions.printable = pathBytesOrId;
    printJsOptions.type = type;
    printJsOptions.base64 = base64;
    printJsOptions.header = title;
    printJsOptions.documentTitle = documentTitle;
    printJsOptions.style = customCss;
    printJsOptions.showModal = showModal;
    printJsOptions.modalMessage = "Attendi file...";
    this.print(printJsOptions);
  }
  //#endregion
  //#region Print grid
  static printGrid(jsonData, options) {
    if (jsonData == null)
      return;
    let headerCss = void 0;
    let contentCss = void 0;
    let properties = null;
    let title = void 0;
    let repeatHeaderOnEveryPage = true;
    let documentTitle = "File_" + (/* @__PURE__ */ new Date()).toLocaleString();
    if (options != null) {
      if (options.headerCss != null) headerCss = options.headerCss;
      if (options.contentCss != null) contentCss = options.contentCss;
      if (options.properties != null) properties = options.properties;
      if (options.headerTitle != null) title = options.headerTitle;
      if (options.repeatHeaderOnEveryPages != null) repeatHeaderOnEveryPage = options.repeatHeaderOnEveryPages;
      if (options.documentTitle != null) documentTitle = options.documentTitle;
    }
    let printJsOptions = new PrintJsOptions();
    printJsOptions.printable = jsonData;
    printJsOptions.type = "json";
    printJsOptions.properties = properties == null ? Object.getOwnPropertyNames(jsonData) : properties;
    printJsOptions.gridHeaderStyle = headerCss;
    printJsOptions.gridStyle = contentCss;
    printJsOptions.header = title;
    printJsOptions.repeatTableHeader = repeatHeaderOnEveryPage;
    printJsOptions.documentTitle = documentTitle;
    this.print(printJsOptions);
  }
  //#endregion
  static print(options) {
    printJS(options);
  }
}
class PrintJsOptions {
  printable;
  type;
  base64;
  properties;
  gridHeaderStyle;
  gridStyle;
  header;
  repeatTableHeader;
  documentTitle;
  style;
  showModal;
  modalMessage;
}
class PrintHtmlOptions {
  pageTitle;
  removeInlineStyles;
  printDelay;
  header;
  footer;
  removeScripts;
  debug;
  beforePrint;
  afterPrint;
}
(function($) {
  function appendContent($el, content) {
    if (!content) return;
    $el.append(content.jquery ? content.clone() : content);
  }
  function appendBody($body, $element, opt2) {
    var $content = $element.clone(opt2.formValues);
    if (opt2.formValues) {
      copyValues($element, $content, "select, textarea");
    }
    if (opt2.removeScripts) {
      $content.find("script").remove();
    }
    if (opt2.printContainer) {
      $content.appendTo($body);
    } else {
      $content.each(function(index, element) {
        $(element).children().appendTo($body);
      });
    }
  }
  function copyValues(origin, clone, elementSelector) {
    var $originalElements = origin.find(elementSelector);
    clone.find(elementSelector).each(function(index, item) {
      $(item).val($originalElements.eq(index).val());
    });
  }
  var opt;
  $.fn.printThis = function(options) {
    opt = $.extend({}, $.fn.printThis.defaults, options);
    var $element = this instanceof jQuery ? this : $(this);
    var strFrameName = "printThis-" + (/* @__PURE__ */ new Date()).getTime();
    if (window.location.hostname !== document.domain && navigator.userAgent.match(/msie/i)) {
      var iframeSrc = 'javascript:document.write("<head><script>document.domain=\\"' + document.domain + '\\";<\/script></head><body></body>")';
      var printI = document.createElement("iframe");
      printI.name = "printIframe";
      printI.id = strFrameName;
      printI.className = "MSIE";
      document.body.appendChild(printI);
      printI.src = iframeSrc;
    } else {
      var $frame = $("<iframe id='" + strFrameName + "' name='printIframe' />");
      $frame.appendTo("body");
    }
    var $iframe = $("#" + strFrameName);
    if (!opt.debug) $iframe.css({
      position: "absolute",
      width: "0px",
      height: "0px",
      left: "-600px",
      top: "-600px"
    });
    if (typeof opt.beforePrint === "function") {
      opt.beforePrint();
    }
    setTimeout(function() {
      function setDocType($iframe2, doctype) {
        var win, doc;
        win = $iframe2.get(0);
        win = win.contentWindow || win.contentDocument || win;
        doc = win.document || win.contentDocument || win;
        doc.open();
        doc.write(doctype);
        doc.close();
      }
      if (opt.doctypeString) {
        setDocType($iframe, opt.doctypeString);
      }
      var $doc = $iframe.contents(), $head = $doc.find("head"), $body = $doc.find("body"), $base = $("base"), baseURL;
      if (opt.base === true && $base.length > 0) {
        baseURL = $base.attr("href");
      } else if (typeof opt.base === "string") {
        baseURL = opt.base;
      } else {
        baseURL = document.location.protocol + "//" + document.location.host;
      }
      $head.append('<base href="' + baseURL + '">');
      if (opt.importCSS) $("link[rel=stylesheet]").each(function(index, element) {
        var href = $(element).attr("href");
        if (href) {
          var media = $(element).attr("media") || "all";
          $head.append("<link type='text/css' rel='stylesheet' href='" + href + "' media='" + media + "'>");
        }
      });
      if (opt.importStyle) $("style").each(function(index, element) {
        $head.append(element.outerHTML);
      });
      if (opt.pageTitle) $head.append("<title>" + opt.pageTitle + "</title>");
      if (opt.loadCSS) {
        if ($.isArray(opt.loadCSS)) {
          jQuery.each(opt.loadCSS, function(index, value) {
            $head.append("<link type='text/css' rel='stylesheet' href='" + value + "'>");
          });
        } else {
          $head.append("<link type='text/css' rel='stylesheet' href='" + opt.loadCSS + "'>");
        }
      }
      var pageHtml = $("html")[0];
      $doc.find("html").prop("style", pageHtml.style.cssText);
      var tag = opt.copyTagClasses;
      if (tag) {
        tag = tag === true ? "bh" : tag;
        if (tag.indexOf("b") !== -1) {
          $body.addClass($("body")[0].className);
        }
        if (tag.indexOf("h") !== -1) {
          $doc.find("html").addClass(pageHtml.className);
        }
      }
      appendContent($body, opt.header);
      if (opt.canvas) {
        var canvasId = 0;
        $element.find("canvas").addBack("canvas").each(function(index, element) {
          $(element).attr("data-printthis", canvasId++);
        });
      }
      appendBody($body, $element, opt);
      if (opt.canvas) {
        $body.find("canvas").each(function(index, element) {
          var cid = $(element).data("printthis"), $src = $('[data-printthis="' + cid + '"]');
          element.getContext("2d").drawImage($src[0], 0, 0);
          if ($.isFunction($.fn.removeAttr)) {
            $src.removeAttr("data-printthis");
          } else {
            $.each($src, function(i, el) {
              el.removeAttribute("data-printthis");
            });
          }
        });
      }
      if (opt.removeInline) {
        var selector = opt.removeInlineSelector || "*";
        if ($.isFunction($.removeAttr)) {
          $body.find(selector).removeAttr("style");
        } else {
          $body.find(selector).attr("style", "");
        }
      }
      appendContent($body, opt.footer);
      function attachOnBeforePrintEvent($iframe2, beforePrintHandler) {
        var win = $iframe2.get(0);
        win = win.contentWindow || win.contentDocument || win;
        if (typeof beforePrintHandler === "function") {
          if ("matchMedia" in win) {
            win.matchMedia("print").addListener(function(mql) {
              if (mql.matches) beforePrintHandler();
            });
          } else {
            win.onbeforeprint = beforePrintHandler;
          }
        }
      }
      attachOnBeforePrintEvent($iframe, opt.beforePrintEvent);
      setTimeout(function() {
        if ($iframe.hasClass("MSIE")) {
          window.frames["printIframe"].focus();
          $head.append("<script>  window.print(); <\/script>");
        } else {
          if (document.queryCommandSupported("print")) {
            $iframe[0].contentWindow.document.execCommand("print", false, null);
          } else {
            $iframe[0].contentWindow.focus();
            $iframe[0].contentWindow.print();
          }
        }
        if (!opt.debug) {
          setTimeout(function() {
            $iframe.remove();
          }, 1e3);
        }
        if (typeof opt.afterPrint === "function") {
          opt.afterPrint();
        }
      }, opt.printDelay);
    }, 333);
  };
  $.fn.printThis.defaults = {
    debug: false,
    // show the iframe for debugging
    importCSS: true,
    // import parent page css
    importStyle: false,
    // import style tags
    printContainer: true,
    // print outer container/$.selector
    loadCSS: "",
    // path to additional css file - use an array [] for multiple
    pageTitle: "",
    // add title to print page
    removeInline: false,
    // remove inline styles from print elements
    removeInlineSelector: "*",
    // custom selectors to filter inline styles. removeInline must be true
    printDelay: 333,
    // variable print delay
    header: null,
    // prefix to html
    footer: null,
    // postfix to html
    base: false,
    // preserve the BASE tag or accept a string for the URL
    formValues: true,
    // preserve input/form values
    canvas: false,
    // copy canvas content
    doctypeString: "<!DOCTYPE html>",
    // enter a different doctype for older markup
    removeScripts: false,
    // remove script tags from print content
    copyTagClasses: false,
    // copy classes from the html & body tag
    beforePrintEvent: null,
    // callback function for printEvent in iframe
    beforePrint: null,
    // function called before iframe is filled
    afterPrint: null
    // function called before iframe is removed
  };
})(jQuery);
export {
  PrintHtmlOptions,
  PrintManager
};
//# sourceMappingURL=printManager.js.map
