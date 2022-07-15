import { puma } from "../ui/vr";

export class LoaderManager
{
	static show(element?: string | HTMLElement | JQuery, transparency = true, tag?: any)
	{
		if (tag == null) tag = "vrLoadingTemp";
		this.addCss();

		//#region	Loader	element
		let loaderElement = null;
		if (element == null)
			loaderElement = document.body;
		else if (typeof (element) == "string")
		{
			if (!element.startsWith("#"))
				element = "#" + element;
			loaderElement = puma(element)[0];
		}
		else
			loaderElement = puma(element)[0];
		//#endregion

		//#region	Transparency
		let opacity = "0.5";
		if (!transparency)
			opacity = "1";
		//#endregion

		//#region	Width/Height
		let elementWidth = puma(loaderElement).outerWidth();
		let elementHeight = puma(loaderElement).outerHeight();

		let backgroundWidth = "100%";
		let backgroundHeight = "100%";
		let loaderWidth = "80px";
		let loaderHeight = "80px";
		backgroundWidth = elementWidth + "px";
		backgroundHeight = elementHeight + "px";

		let loaderWidthNumber = ((elementHeight) * 80 / 100);
		if (loaderWidthNumber > 80)
			loaderWidthNumber = 80;
		let loaderHeightNumber = ((elementHeight) * 80 / 100);
		if (loaderHeightNumber > 80)
			loaderHeightNumber = 80;
		//#endregion

		//#region	Position
		let loaderXPosition = "Calc(50%	-	50px)";
		let loaderYPosition = "Calc(50%	-	50px)";
		loaderXPosition = (0 + ((elementWidth) / 2) - (loaderWidthNumber / 2)) - 16 + "px";
		loaderYPosition = (0 + ((elementHeight) / 2) - (loaderHeightNumber / 2)) - 16 + "px";

		if (puma(loaderElement).css("position") != "absolute")
			puma(loaderElement).css("position", "relative");
		//#endregion

		//#region	Background
		let zIndex: number = 2500000;
		zIndex = String((puma(loaderElement).css("z-index"))).vrGetNumericPart() + 1;
		if (loaderElement == document.body)
			zIndex = 999999999;

		let background: HTMLDivElement = document.createElement("div");
		background.setAttribute("id", "loaderManager_background");
		background.setAttribute("class", "loaderManager_background");
		background.setAttribute("style", "position:	absolute;	left:	" + 0 + ";	top:	" + 0 + ";	z-index:	" + zIndex.toString() + ";	background-color:	#FFF;	opacity:	" + opacity + ";	width:	" + backgroundWidth + ";	height:	" + backgroundHeight + ";");
		background.setAttribute("tag", tag);
		puma(background).vrAppendToPuma(loaderElement);
		//#endregion

		//#region	Loader
		loaderWidth = loaderWidthNumber + "px";
		loaderHeight = loaderHeightNumber + "px";
		puma("<div class='loaderManager_loader' tag='" + tag + "'style='position: absolute; left: " + loaderXPosition + "; top: " + loaderYPosition + "; width: " + loaderWidth + "; height:	" + loaderHeight + ";'><div></div><div></div><div></div><div></div></div>").vrAppendToPuma(loaderElement);
		//#endregion
	}

	static hide(tag?: any)
	{
		if (tag == null)
		{
			puma("#loaderManager_background[tag='vrLoadingTemp']").remove();
			puma(".loaderManager_loader[tag='vrLoadingTemp']").remove();
		}
		else
		{
			puma(".loaderManager_background[tag='" + tag + "']").remove();
			puma(".loaderManager_loader[tag='" + tag + "']").remove();
		}
	}

	private static addCss()
	{
		if (puma("head").find("style[id='vr_loader']")[0] == null)
		{
			this.addCssBase(`
				.loaderManager_loader	{
						display:	inline-block;
						z-index:	9999999999999999999999999999999999999;
				}
				.loaderManager_loader	div	{
						position:	absolute;
						top:	33px;
						width:	13px;
						height:	13px;
						border-radius:	50%;
						background:	#51B3E1;
						animation-timing-function:	cubic-bezier(0,1,1,0);
				}
				.loaderManager_loader	div:nth-child(1)	{
						left:	8px;
						animation:	loaderManager_loader1 0.6s infinite;
				}
				.loaderManager_loader	div:nth-child(2)	{
						left: 8px;
						animation:	loaderManager_loader2 0.6s infinite;
				}
				.loaderManager_loader	div:nth-child(3)	{
						left: 32px;
						animation:	loaderManager_loader2 0.6s infinite;
				}
				.loaderManager_loader	div:nth-child(4)	{
						left: 56px;
						animation:	loaderManager_loader3 0.6s infinite;
				}
				@keyframes	loaderManager_loader1	{
						0%	{
								transform: scale(0);
						}
						100%	{
								transform: scale(1);
						}
				}
				@keyframes	loaderManager_loader3	{
						0%	{
								transform: scale(1);
						}
						100%	{
								transform: scale(0);
						}
				}
				@keyframes	loaderManager_loader2	{
						0%	{
								transform: translate(0, 0);
						}
						100%	{
								transform: translate(24px, 0);
						}
				}
			`);
		}
	}

	private static addCssBase(cssRules: string)
	{
		puma("<style id='vr_loader'>" + cssRules + "</style>").vrAppendToPuma("head");
	}
}