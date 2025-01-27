namespace iCookieJar {
    export interface Cookie {
        cookieName: string;
        cookieValue: string;
        attributes: Map<string, any>;
        raw: string;
    }
}

class Cookie {
    private static COOKIE_REGEX = /^(?<cookieName>[^\s=;]+)=(?<cookieValue>[^;]*)/;
    private static ATTRIBUTE_REGEX = /(?<attributeName>[^\s=;]+)(?:=(?<attributeValue>[^;]*))?/g;

    private constructor() { }

    static parse(cookie: string) {
        const cookieMap = {
            cookieName: "",
            cookieValue: "",
            attributes: new Map<string, any>(),
            raw: cookie,
        };
        const cookieAttributes = cookie.slice(cookie.indexOf(";") + 2);

        const { cookieName, cookieValue } = cookie.match(Cookie.COOKIE_REGEX)?.groups as Record<string, string>;

        cookieMap.cookieName = cookieName;
        cookieMap.cookieValue = cookieValue;

        const attributes = [...cookieAttributes.matchAll(Cookie.ATTRIBUTE_REGEX)].map(match => match.groups) as Array<Record<string, string>>;

        for (const { attributeName, attributeValue } of attributes) {
            cookieMap.attributes.set(attributeName, attributeValue);
        }

        return cookieMap;
    }

    static toString(cookie: iCookieJar.Cookie) {
        return cookie.raw;
    }
}

// TODO: Implement cookieBuilder and add checker for cookie Expires attribute which will automatically remove expired cookies from the jar (further implementation may include 'interval' which will notify user when cookie has expired) +
// TODO: it should also give the user the ability what to do after the cookie has expired e.g async promise with a callback function
class CookieJar {
    private cookies: iCookieJar.Cookie[];

    constructor() {
        this.cookies = [];
    }

    // TODO: Implement cookieBuilder
    private cookieBuilder() {
        // ...
    }

    public setCookies(_cookies: Array<string>) {
        const Cookies = _cookies.map(cookie => Cookie.parse(cookie));

        this.cookies.push(...Cookies);
    }

    public getCookies(formatted: boolean = true) {
        if (!formatted) return this.cookies;

        return this.cookies.map(cookie => Cookie.toString(cookie));
    }

    public getCookie(name: string) {
        const cookie = this.cookies.find(cookie => cookie.cookieName === name);
        if (!cookie) return "";

        return Cookie.toString(cookie);
    }

    public clearCookies(): void {
        this.cookies = [];
    }
}

export default CookieJar;