import { BrowserTypeEnum } from "../../src/ui/vr";

export class DeviceManager
{
    //#region Device category
    static getScreenResolution()
    {
        let screenResolution = new ScreenResolution();
        screenResolution.width = window.screen.width;
        screenResolution.height = window.screen.height;
        return screenResolution;
    }

    static isSmartphone()
    {
        return (this.getScreenResolution().width < 768);
    }

    static isTablet()
    {
        let screenResolution = this.getScreenResolution();
        return (screenResolution.width < 1200 && screenResolution.width >= 768);
    }

    static isDesktop()
    {
        return (this.getScreenResolution().width >= 1200);
    }

    static isMobile()
    {
        if ((navigator as any).userAgentData != null)
            return (navigator as any).userAgentData.mobile;

        return this.isSmartphone() || this.isTablet();
    }
    //#endregion

    //#region Device
    static isIphoneX()
    {
        if (this.isIphone())
        {
            let height = window.screen.height;
            let width = window.screen.width;
            if (height > 800 && width > 370)
                return true;
        }
        return false;
    }

    static isIphone()
    {
        return navigator.userAgent.match(/iPhone/i);
    }
    //#endregion

    //#region Browser
    static browser()
    {
        if (this.isFirefox()) return BrowserTypeEnum.Firefox;
        else if (this.isEdge()) return BrowserTypeEnum.Edge;
        else if (this.isInternetExplorer()) return BrowserTypeEnum.InternetExplorer;
        else if (this.isOpera()) return BrowserTypeEnum.Opera;
        else if (this.isVivaldi()) return BrowserTypeEnum.Vivaldi;
        else if (this.isChrome()) return BrowserTypeEnum.Chrome;
        else if (this.isSafari()) return BrowserTypeEnum.Safari;
        else if (this.isSeamonkey()) return BrowserTypeEnum.Seamonkey;
        else
            return "Unknown";
    }

    private static agentHas(keyword: string)
    {
        return navigator.userAgent.toLowerCase().search(keyword.toLowerCase()) > -1;
    }

    static isInternetExplorer()
    {
        return !!(document as any).documentMode || this.agentHas("MSIE") || this.agentHas("Trident");
    }

    static isSafari()
    {
        return (!!(window as any).ApplePaySetupFeature || !!(window as any).safari)
            && this.agentHas("Safari") && !this.agentHas("Chrome") && !this.agentHas("CriOS") && !this.agentHas("Chromium");
    }

    static isChrome()
    {
        return (this.agentHas("CriOS") || this.agentHas("Chrome") || !!(window as any).chrome)
            && !this.agentHas("Chromium") && !this.agentHas("Edg");
    }

    static isFirefox()
    {
        return (this.agentHas("Firefox") || this.agentHas("FxiOS") || this.agentHas("Focus")) && !this.agentHas("Seamonkey");
    }

    static isEdge()
    {
        return this.agentHas("Edg");
    }

    static isOpera()
    {
        return this.agentHas("OPR") || this.agentHas("Opera");
    }

    static isVivaldi()
    {
        return this.agentHas("Vivaldi");
    }

    static isSeamonkey()
    {
        return this.agentHas("Seamonkey");
    }
    //#endregion
}

class ScreenResolution
{
    width: number;
    height: number;
}