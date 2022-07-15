import { BrowserTypeEnum } from "../../src/ui/vr";
export declare class DeviceManager {
    static getScreenResolution(): ScreenResolution;
    static isSmartphone(): boolean;
    static isTablet(): boolean;
    static isDesktop(): boolean;
    static isMobile(): any;
    static isIphoneX(): boolean;
    static isIphone(): RegExpMatchArray | null;
    static browser(): BrowserTypeEnum | "Unknown";
    private static agentHas;
    static isInternetExplorer(): boolean;
    static isSafari(): boolean;
    static isChrome(): boolean;
    static isFirefox(): boolean;
    static isEdge(): boolean;
    static isOpera(): boolean;
    static isVivaldi(): boolean;
    static isSeamonkey(): boolean;
}
declare class ScreenResolution {
    width: number;
    height: number;
}
export {};
