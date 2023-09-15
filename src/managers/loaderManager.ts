import { puma } from "../ui/vr";
import { UtilityManager } from "./utilityManager";

export class LoaderManager
{
	static show(element?: string | HTMLElement | JQuery, transparency = true, tag?: any | null, text?: string | null)
	{
		this.addCss();
		if (tag == null)
			tag = "vrLoadingTemp";

		//#region Loader	element
		let loaderElement: HTMLElement | null = null;
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

		if (loaderElement == null)
			loaderElement = document.body;

		if (puma(loaderElement).css("position") != "absolute")
			puma(loaderElement).css("position", "relative");
		//#endregion

		//#region Transparency
		let opacity = "0.5";
		if (!transparency)
			opacity = "1";
		//#endregion

		//#region Width/Height
		let elementWidth = puma(loaderElement).outerWidth();
		let elementHeight = puma(loaderElement).outerHeight();

		let loaderWidthNumber = elementHeight;
		if (loaderWidthNumber > 80)
			loaderWidthNumber = 80;
		let loaderHeightNumber = elementHeight;
		if (loaderHeightNumber > 80)
			loaderHeightNumber = 80;
		//#endregion

		//#region Background
		let zIndex: number = 2500000;
		zIndex = String((puma(loaderElement).css("z-index"))).vrGetNumericPart() + 1;
		if (loaderElement == document.body)
			zIndex = 99999999;

		let backgroundWidth = elementWidth + "px";
		let backgroundHeight = elementHeight + "px";

		let background: HTMLDivElement = document.createElement("div");
		background.setAttribute("id", "loaderManager_background");
		background.setAttribute("class", "loaderManager_background");
		background.setAttribute("style", "position:	absolute; left: " + loaderElement!.scrollLeft
			+ "px; top: " + loaderElement!.scrollTop + "px;	z-index: " + zIndex.toString()
			+ "; background-color: #FFF; opacity: " + opacity + "; width: " + backgroundWidth + "; height: " + backgroundHeight + ";");
		background.setAttribute("tag", tag);
		puma(background).vrAppendToPuma(loaderElement);
		//#endregion

		//#region Loader
		let loaderLeftPosition = "Calc(50% - " + (loaderWidthNumber / 2 - loaderElement!.scrollLeft) + "px)";
		let loaderTopPosition = "Calc(50% - " + (loaderWidthNumber / 2 - loaderElement!.scrollTop) + "px)";
		let loaderWidth = loaderWidthNumber + "px";
		let loaderHeight = loaderHeightNumber + "px";

		let textLabel = "";
		if (text != null && text != "") 
		{
			let labelWidth = UtilityManager.textWidth(text) + 20;
			let css = "position: absolute; background-color: #51B3E1; color: #FFF; padding: 4px; font-weight: 600; border-radius: 10px; padding-left: 10px; padding-right: 10px;";
			textLabel = "<label style='width: " + (labelWidth - 7) + "px; left: Calc(50% - " + (labelWidth / 2) + "px);" + css + "'>" + text + "</label>"
		}

		puma(`
			<div class='loaderManager_loader' tag='` + tag + `' style='display: inline-block; z-index: 99999999; 
			position: absolute; left: ` + loaderLeftPosition + `; top: ` + loaderTopPosition + `; width: ` + loaderWidth + `; 
			height: ` + loaderHeight + `;'>
				${textLabel}
				<div class='loaderManager_step' style='left: 8px; animation: loaderManager_loader1 0.6s infinite;'></div>
				<div class='loaderManager_step' style='left: 8px; animation: loaderManager_loader2 0.6s infinite;'></div>
				<div class='loaderManager_step' style='left: 32px; animation: loaderManager_loader2 0.6s infinite;'></div>
				<div class='loaderManager_step' style='left: 56px; animation: loaderManager_loader3 0.6s infinite;'></div>
			</div>
		`).vrAppendToPuma(loaderElement);
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
                @keyframes loaderManager_loader1 {
                  0% {
                    transform: scale(0);
                  }
                  100% {
                    transform: scale(1);
                  }
                }

                @keyframes loaderManager_loader3 {
                  0% {
                    transform: scale(1);
                  }
                  100% {
                    transform: scale(0);
                  }
                }

                @keyframes loaderManager_loader2 {
                  0% {
                    transform: translate(0, 0);
                  }
                  100% {
                    transform: translate(24px, 0);
                  }
                }

				.loaderManager_step {
					background: #51B3E1;
					position: absolute; 
					top: Calc(50% - 6.5px); 
					width: 13px; 
					height: 13px; 
					border-radius: 50%; 
					animation-timing-function: cubic-bezier(0, 1, 1, 0);
					z-index: 999999999;
				}
            `);
		}
	}

	private static addCssBase(cssRules: string)
	{
		puma("<style id='vr_loader'>" + cssRules + "</style>").vrAppendToPuma("head");
	}
}