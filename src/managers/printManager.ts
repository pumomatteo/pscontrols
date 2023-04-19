import { puma } from "../../src/ui/vr";

declare function printJS(options: PrintJsOptions): void;
// https://printjs.crabbly.com/

export class PrintManager
{
	//#region Print bytes, pdf, image or html
	public static printBytes(base64Bytes: string, options?: PrintFileOptions)
	{
		this.printBytesFileImageOrHtml(base64Bytes, PrintTypeEnum.Pdf, options, true);
	}

	public static printPdf(path: string, options?: PrintFileOptions)
	{
		this.printBytesFileImageOrHtml(path, PrintTypeEnum.Pdf, options);
	}

	public static printImage(path: string, options?: PrintFileOptions)
	{
		this.printBytesFileImageOrHtml(path, PrintTypeEnum.Image, options);
	}

	public static printHtml(elementId: string, options?: PrintFileOptions)
	{
		if (elementId.startsWith("#"))
			elementId = elementId.substr(1);

		this.printBytesFileImageOrHtml(elementId, PrintJsTypeEnum.Html, options);
	}

	public static printElement(element: string | HTMLElement | JQuery, options?: PrintHtmlOptions)
	{
		let elementId = "";
		if (typeof (element) != "string")
			elementId = puma(element)[0].id;

		if (elementId == "" || elementId == null)
		{
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
			afterPrint: () =>
			{
				if (elementId == "#vr_printTemp")
					puma(element)[0].id = "";

				if (options!.afterPrint != null)
					options!.afterPrint();
			}
		});
	}

	private static printBytesFileImageOrHtml(pathBytesOrId: string, type: PrintTypeEnum | string, options?: PrintFileOptions,
		base64: boolean = false, showModal = true)
	{
		if (pathBytesOrId == "")
			return;

		let title = undefined;
		let documentTitle = "File_" + new Date().toLocaleString();
		let customCss = undefined;
		if (options != null)
		{
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
	public static printGrid(jsonData: any, options?: PrintGridOptions)
	{
		if (jsonData == null)
			return;

		let headerCss = undefined;
		let contentCss = undefined;
		let properties: string[] | null = null;
		let title = undefined;
		let repeatHeaderOnEveryPage = true;
		let documentTitle = "File_" + new Date().toLocaleString();
		if (options != null)
		{
			if (options.headerCss != null) headerCss = options.headerCss;
			if (options.contentCss != null) contentCss = options.contentCss;
			if (options.properties != null) properties = options.properties;
			if (options.headerTitle != null) title = options.headerTitle;
			if (options.repeatHeaderOnEveryPages != null) repeatHeaderOnEveryPage = options.repeatHeaderOnEveryPages;
			if (options.documentTitle != null) documentTitle = options.documentTitle;
		}

		let printJsOptions = new PrintJsOptions();
		printJsOptions.printable = jsonData;
		printJsOptions.type = PrintJsTypeEnum.Json;
		printJsOptions.properties = (properties == null) ? Object.getOwnPropertyNames(jsonData) : properties;
		printJsOptions.gridHeaderStyle = headerCss;
		printJsOptions.gridStyle = contentCss;
		printJsOptions.header = title;
		printJsOptions.repeatTableHeader = repeatHeaderOnEveryPage;
		printJsOptions.documentTitle = documentTitle;
		this.print(printJsOptions);
	}
	//#endregion

	private static print(options: PrintJsOptions)
	{
		printJS(options);
	}
}

//#region Classes
class PrintJsOptions
{
	public printable: string | string[];
	public type?: string;
	public base64?: boolean;
	public properties?: string[];
	public gridHeaderStyle?: string;
	public gridStyle?: string;
	public header?: string;
	public repeatTableHeader?: boolean;
	public documentTitle?: string;
	public style?: string;
	showModal?: boolean;
	modalMessage?: string;
}

enum PrintJsTypeEnum
{
	Pdf = "pdf",
	Html = "html",
	Image = "image",
	Json = "json"
}

export enum PrintTypeEnum
{
	Pdf = "pdf",
	Image = "image"
}

export class PrintFileOptions
{
	public type?: PrintTypeEnum;
	public loadingMessage?: string;
	public headerTitle?: string;
	public documentTitle?: string;
	public customCss?: string;
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
	public headerCss?: string;
	public contentCss?: string;
	public properties?: string[];
	public loadingMessage?: string;
	public headerTitle?: string;
	public repeatHeaderOnEveryPages?: boolean;
	public documentTitle?: string;
}
//#endregion

//#region PrintThis
(function ($)
{

	function appendContent($el: any, content: any)
	{
		if (!content) return;

		// Simple test for a jQuery element
		$el.append(content.jquery ? content.clone() : content);
	}

	function appendBody($body: any, $element: any, opt: any)
	{
		// Clone for safety and convenience
		// Calls clone(withDataAndEvents = true) to copy form values.
		var $content = $element.clone(opt.formValues);

		if (opt.formValues)
		{
			// Copy original select and textarea values to their cloned counterpart
			// Makes up for inability to clone select and textarea values with clone(true)
			copyValues($element, $content, 'select, textarea');
		}

		if (opt.removeScripts)
		{
			$content.find('script').remove();
		}

		if (opt.printContainer)
		{
			// grab $.selector as container
			$content.appendTo($body);
		} else
		{
			// otherwise just print interior elements of container
			$content.each(function (index: number, element: any)
			{
				$(element).children().appendTo($body)
			});
		}
	}

	// Copies values from origin to clone for passed in elementSelector
	function copyValues(origin: any, clone: any, elementSelector: any)
	{
		var $originalElements = origin.find(elementSelector);

		clone.find(elementSelector).each(function (index: any, item: any)
		{
			$(item).val($originalElements.eq(index).val());
		});
	}

	var opt: any;
	($.fn as any).printThis = function (options: any)
	{
		opt = $.extend({}, ($.fn as any).printThis.defaults, options);
		var $element = this instanceof jQuery ? this : $(this);

		var strFrameName = "printThis-" + (new Date()).getTime();

		if (window.location.hostname !== document.domain && navigator.userAgent.match(/msie/i))
		{
			// Ugly IE hacks due to IE not inheriting document.domain from parent
			// checks if document.domain is set by comparing the host name against document.domain
			var iframeSrc = "javascript:document.write(\"<head><script>document.domain=\\\"" + document.domain + "\\\";</s" + "cript></head><body></body>\")";
			var printI = document.createElement('iframe');
			printI.name = "printIframe";
			printI.id = strFrameName;
			printI.className = "MSIE";
			document.body.appendChild(printI);
			printI.src = iframeSrc;

		} else
		{
			// other browsers inherit document.domain, and IE works if document.domain is not explicitly set
			var $frame = $("<iframe id='" + strFrameName + "' name='printIframe' />");
			$frame.appendTo("body");
		}

		var $iframe = $("#" + strFrameName);

		// show frame if in debug mode
		if (!opt.debug) $iframe.css({
			position: "absolute",
			width: "0px",
			height: "0px",
			left: "-600px",
			top: "-600px"
		});

		// before print callback
		if (typeof opt.beforePrint === "function")
		{
			opt.beforePrint();
		}

		// $iframe.ready() and $iframe.load were inconsistent between browsers
		setTimeout(function ()
		{

			// Add doctype to fix the style difference between printing and render
			function setDocType($iframe: any, doctype: any)
			{
				var win, doc;
				win = $iframe.get(0);
				win = win.contentWindow || win.contentDocument || win;
				doc = win.document || win.contentDocument || win;
				doc.open();
				doc.write(doctype);
				doc.close();
			}

			if (opt.doctypeString)
			{
				setDocType($iframe, opt.doctypeString);
			}

			var $doc = $iframe.contents(),
				$head = $doc.find("head"),
				$body = $doc.find("body"),
				$base = $('base'),
				baseURL;

			// add base tag to ensure elements use the parent domain
			if (opt.base === true && $base.length > 0)
			{
				// take the base tag from the original page
				baseURL = $base.attr('href');
			} else if (typeof opt.base === 'string')
			{
				// An exact base string is provided
				baseURL = opt.base;
			} else
			{
				// Use the page URL as the base
				baseURL = document.location.protocol + '//' + document.location.host;
			}

			$head.append('<base href="' + baseURL + '">');

			// import page stylesheets
			if (opt.importCSS) $("link[rel=stylesheet]").each(function (index: number, element: any)
			{
				var href = $(element).attr("href");
				if (href)
				{
					var media = $(element).attr("media") || "all";
					$head.append("<link type='text/css' rel='stylesheet' href='" + href + "' media='" + media + "'>");
				}
			});

			// import style tags
			if (opt.importStyle) $("style").each(function (index: number, element: any)
			{
				$head.append(element.outerHTML);
			});

			// add title of the page
			if (opt.pageTitle) $head.append("<title>" + opt.pageTitle + "</title>");

			// import additional stylesheet(s)
			if (opt.loadCSS)
			{
				if ($.isArray(opt.loadCSS))
				{
					jQuery.each(opt.loadCSS, function (index: any, value: any)
					{
						$head.append("<link type='text/css' rel='stylesheet' href='" + value + "'>");
					});
				} else
				{
					$head.append("<link type='text/css' rel='stylesheet' href='" + opt.loadCSS + "'>");
				}
			}

			var pageHtml = $('html')[0];

			// CSS VAR in html tag when dynamic apply e.g.  document.documentElement.style.setProperty("--foo", bar);
			$doc.find('html').prop('style', pageHtml.style.cssText);

			// copy 'root' tag classes
			var tag = opt.copyTagClasses;
			if (tag)
			{
				tag = tag === true ? 'bh' : tag;
				if (tag.indexOf('b') !== -1)
				{
					$body.addClass($('body')[0].className);
				}
				if (tag.indexOf('h') !== -1)
				{
					$doc.find('html').addClass(pageHtml.className);
				}
			}

			// print header
			appendContent($body, opt.header);

			if (opt.canvas)
			{
				// add canvas data-ids for easy access after cloning.
				var canvasId = 0;
				// .addBack('canvas') adds the top-level element if it is a canvas.
				($element as any).find('canvas').addBack('canvas').each(function (index: number, element: any)
				{
					$(element).attr('data-printthis', canvasId++);
				});
			}

			appendBody($body, $element, opt);

			if (opt.canvas)
			{
				// Re-draw new canvases by referencing the originals
				$body.find('canvas').each(function (index: number, element: any)
				{
					var cid = $(element).data('printthis'),
						$src = $('[data-printthis="' + cid + '"]');

					element.getContext('2d').drawImage($src[0], 0, 0);

					// Remove the markup from the original
					if ($.isFunction($.fn.removeAttr))
					{
						$src.removeAttr('data-printthis');
					} else
					{
						$.each($src, function (i: any, el: any)
						{
							el.removeAttribute('data-printthis');
						});
					}
				});
			}

			// remove inline styles
			if (opt.removeInline)
			{
				// Ensure there is a selector, even if it's been mistakenly removed
				var selector = opt.removeInlineSelector || '*';
				// $.removeAttr available jQuery 1.7+
				if ($.isFunction(($ as any).removeAttr))
				{
					$body.find(selector).removeAttr("style");
				} else
				{
					$body.find(selector).attr("style", "");
				}
			}

			// print "footer"
			appendContent($body, opt.footer);

			// attach event handler function to beforePrint event
			function attachOnBeforePrintEvent($iframe: any, beforePrintHandler: any)
			{
				var win = $iframe.get(0);
				win = win.contentWindow || win.contentDocument || win;

				if (typeof beforePrintHandler === "function")
				{
					if ('matchMedia' in win)
					{
						win.matchMedia('print').addListener(function (mql: any)
						{
							if (mql.matches) beforePrintHandler();
						});
					} else
					{
						win.onbeforeprint = beforePrintHandler;
					}
				}
			}
			attachOnBeforePrintEvent($iframe, opt.beforePrintEvent);

			setTimeout(function ()
			{
				if ($iframe.hasClass("MSIE"))
				{
					// check if the iframe was created with the ugly hack
					// and perform another ugly hack out of neccessity
					(window.frames as any)["printIframe"].focus();
					$head.append("<script>  window.print(); </s" + "cript>");
				} else
				{
					// proper method
					if (document.queryCommandSupported("print"))
					{
						($iframe[0] as any).contentWindow.document.execCommand("print", false, null);
					} else
					{
						($iframe[0] as any).contentWindow.focus();
						($iframe[0] as any).contentWindow.print();
					}
				}

				// remove iframe after print
				if (!opt.debug)
				{
					setTimeout(function ()
					{
						$iframe.remove();

					}, 1000);
				}

				// after print callback
				if (typeof opt.afterPrint === "function")
				{
					opt.afterPrint();
				}

			}, opt.printDelay);

		}, 333);

	};

	// defaults
	($.fn as any).printThis.defaults = {
		debug: false,               // show the iframe for debugging
		importCSS: true,            // import parent page css
		importStyle: false,         // import style tags
		printContainer: true,       // print outer container/$.selector
		loadCSS: "",                // path to additional css file - use an array [] for multiple
		pageTitle: "",              // add title to print page
		removeInline: false,        // remove inline styles from print elements
		removeInlineSelector: "*",  // custom selectors to filter inline styles. removeInline must be true
		printDelay: 333,            // variable print delay
		header: null,               // prefix to html
		footer: null,               // postfix to html
		base: false,                // preserve the BASE tag or accept a string for the URL
		formValues: true,           // preserve input/form values
		canvas: false,              // copy canvas content
		doctypeString: '<!DOCTYPE html>', // enter a different doctype for older markup
		removeScripts: false,       // remove script tags from print content
		copyTagClasses: false,      // copy classes from the html & body tag
		beforePrintEvent: null,     // callback function for printEvent in iframe
		beforePrint: null,          // function called before iframe is filled
		afterPrint: null            // function called before iframe is removed
	};
})(jQuery);
//#endregion