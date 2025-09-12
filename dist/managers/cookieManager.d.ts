export declare class CookieManager {
    private static setCookieInternal;
    static setCookie(cookieName: string, cookieValue: any, expireDays?: number, options?: CookieOptions): void;
    static setCookieHours(cookieName: string, cookieValue: any, expireHours?: number, options?: CookieOptions): void;
    static setCookieMinutes(cookieName: string, cookieValue: any, expireMinutes?: number, options?: CookieOptions): void;
    static setCookieSeconds(cookieName: string, cookieValue: any, seconds?: number, options?: CookieOptions): void;
    static deleteCookie(name: string): void;
    static getCookie(cookieName: string): string;
}
declare class CookieOptions {
    secured?: boolean;
    sameSite?: CookieSameSiteEnum;
    httpOnly?: boolean;
}
export declare enum CookieSameSiteEnum {
    Lax = "Lax",
    Strict = "Strict",
    None = "None"
}
export {};
