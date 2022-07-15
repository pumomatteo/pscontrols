export class CookieManager
{
	private static setCookieInternal(cookieName: string, cookieValue: any, expireMilliseconds: number, options?: CookieOptions)
	{
		//#region Expire
		var d = new Date();
		d.setTime(d.getTime() + expireMilliseconds);
		var expires = "expires=" + d.toUTCString();
		expires = "expires=" + d.toString();
		//#endregion

		//#region Options
		let optionsString = "";
		if (options != null)
		{
			if (options.httpOnly)
				optionsString += "HttpOnly;";

			if (options.secured)
				optionsString += "secure;";

			if (options.sameSite != null)
			{
				switch (options.sameSite)
				{
					case CookieSameSiteEnum.Lax: optionsString += "SameSite=Lax;"; break;
					case CookieSameSiteEnum.Strict: optionsString += "SameSite=Strict;"; break;
					case CookieSameSiteEnum.None: optionsString += "SameSite=None;"; break;
				}
			}
		}
		//#endregion

		document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/;" + optionsString;
	}

	static setCookie(cookieName: string, cookieValue: any, expireDays = 365, options?: CookieOptions)
	{
		let expireMilliseconds = expireDays * 24 * 60 * 60 * 1000;
		this.setCookieInternal(cookieName, cookieValue, expireMilliseconds, options);
	}

	static setCookieHours(cookieName: string, cookieValue: any, expireHours = 1, options?: CookieOptions)
	{
		let expireMilliseconds = expireHours * 60 * 60 * 1000;
		this.setCookieInternal(cookieName, cookieValue, expireMilliseconds, options);
	}

	static setCookieMinutes(cookieName: string, cookieValue: any, expireMinutes = 20, options?: CookieOptions)
	{
		let expireMilliseconds = expireMinutes * 60 * 1000;
		this.setCookieInternal(cookieName, cookieValue, expireMilliseconds, options);
	}

	static setCookieSeconds(cookieName: string, cookieValue: any, seconds: number = 10, options?: CookieOptions)
	{
		let expireMilliseconds = seconds * 1000;
		this.setCookieInternal(cookieName, cookieValue, expireMilliseconds, options);
	}

	static deleteCookie(name: string) 
	{
		document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	}

	static getCookie(cookieName: string): string
	{
		var name = cookieName + "=";
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++)
		{
			var c = ca[i];
			while (c.charAt(0) == ' ')
				c = c.substring(1);

			if (c.indexOf(name) == 0)
				return c.substring(name.length, c.length);
		}
		return "";
	}
}

class CookieOptions
{
	secured?: boolean;
	sameSite?: CookieSameSiteEnum;
	httpOnly?: boolean;
}

export enum CookieSameSiteEnum
{
	Lax = "Lax",
	Strict = "Strict",
	None = "None"
}