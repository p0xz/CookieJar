import { CookieError } from "./lib/exceptions";
import { iCookieJar } from "./types";

function convertToTime(time: string) {
    const UNITS_IN_MS = {
        ms: 1,                    // Milliseconds
        s: 1000,                  // Seconds
        m: 60 * 1000,             // Minutes
        h: 60 * 60 * 1000,        // Hours
        d: 24 * 60 * 60 * 1000,   // Days
        w: 7 * 24 * 60 * 60 * 1000, // Weeks
        y: 365 * 24 * 60 * 60 * 1000, // Years
    } as const;

    return [...time.matchAll(/(\d+)([a-zA-Z]+)/g)].reduce((total, [, value, unit]) => {
        const ms = UNITS_IN_MS[unit as keyof typeof UNITS_IN_MS];
        if (!ms) throw new Error(`Unknown time unit: ${unit}`);
        return total + parseInt(value, 10) * ms;
    }, 0);
}

class Cookie {
    private static COOKIE_REGEX = /(?<cookieName>[^;\s=]+)=(?<cookieValue>[^;]*)/;
    private static ATTRIBUTE_REGEX = /(?<attributeName>[^;\s=]+)(?:=(?<attributeValue>[^;]*))?/g;


    private constructor() { }

    static parse(cookie: string) {
        const match = cookie.match(Cookie.COOKIE_REGEX);
        if (!match || !match?.groups) {
            throw new Error(`Invalid cookie format: ${cookie}`);
        }

        const { cookieName, cookieValue } = match.groups;
        const attributes = new Map<string, any>();

        const cookieAttributes = cookie.substring(cookie.indexOf(";") + 1).trim();

        [...cookieAttributes.matchAll(Cookie.ATTRIBUTE_REGEX)].forEach(({ groups }) => {
            if (groups?.attributeName && groups.attributeName !== cookieName) {
                attributes.set(groups.attributeName, groups.attributeValue ?? true);
            }
        });

        return { cookieName, cookieValue, attributes, raw: cookie };
    }

    static toString(cookie: iCookieJar.Cookie) {
        return cookie.raw;
    }
}

class CookieJar {
    private cookies: iCookieJar.Cookie[];
    private debug_stdout: boolean

    constructor(debug_stdout: boolean = false) {
        this.cookies = [];
        this.debug_stdout = debug_stdout;
    }

    private isExpired(cookieName: string) {
        const cookie = this.getCookie(cookieName, false);
        const expires = cookie.attributes.get('Expires');

        if (!expires) return false;

        return new Date(expires).getTime() < Date.now();
    }

    public removeCookie(cookieName: string) {
        const cookie = this.getCookie(cookieName, false);

        const id = this.cookies.indexOf(cookie);

        if (id < 0) return;

        this.cookies.splice(id, 1);
    }

    /**
    * Intercepts a specified cookie, allowing dynamic modifications and access control.
    * This method enables updating a cookie's value and checking if it has expired before retrieving it.
    *
    * @param {string} cookieName - The name of the cookie to intercept.
    * @param {(options: iCookieJar.interceptorOptions) => void} callback - A function executed when the cookie is accessed,
    * providing options to update the cookie or check its expiration status.
    */
    public intercept(cookieName: string, callback: (options: iCookieJar.interceptorOptions) => void) {
        const cookie = this.getCookie(cookieName, false);
        cookie.interceptor = callback;

        const options: iCookieJar.interceptorOptions = {
            update: (_cookie: string) => {
                const id = this.cookies.indexOf(cookie);

                if (id === -1) return;

                this.cookies[id] = Cookie.parse(_cookie);
            },
            isExpired: () => this.isExpired(cookieName),
        }

        return {
            getCookie: (raw: boolean = true) => {
                if (cookie.interceptor) {
                    cookie.interceptor(options);
                }

                return raw ? cookie.raw : cookie;
            }
        };
    }

    /**
     * 
     * @param cookieName takes name of your saved cookie return void if the cookie doesn't exist or if the cookie doesn't have "Expires" attribute
     * @param cb here you can do something after cookie have expired 
     * @param warnLimit by default it's set to bypass, so it will automatically run interval which will check everyday, if cookie has expired 
     * @param delay by default it's set to 1 day, so it will check everyday
     */
    public expireChecker(cookieName: string, cb: () => void, options: { warnLimit: string, delay: number } = { warnLimit: "bypass", delay: 24 * 60 * 60 * 1000 }) {
        const cookie = this.cookies.find(cookie => cookie.cookieName === cookieName);
        if (!cookie || (cookie && !cookie.attributes.has('Expires'))) return;

        const expires = new Date(cookie.attributes.get('Expires'));

        const isExpired = expires.getTime() < Date.now();

        if (isExpired || options.warnLimit === 'bypass') {
            cb();
            return;
        };

        const warnTime = convertToTime(options.warnLimit);

        const warnThreshold = expires.getTime() - warnTime;

        if (Date.now() >= warnThreshold) {
            this.debug_stdout && console.warn(`Cookie "${cookieName}" will expire soon: ${expires}`);
        };

        const interval = setInterval(() => {
            const now = Date.now();

            if (now < expires.getTime()) {
                return;
            };

            clearInterval(interval);
            this.removeCookie(cookieName);
            this.debug_stdout && console.warn(`Cookie "${cookieName}" has already expired.`);
            cb();
        }, options.delay);

    }

    public setCookies(cookies: string | string[]) {
        cookies = typeof cookies === 'string' ? [cookies] : cookies;

        this.cookies = cookies.map(cookie => Cookie.parse(cookie));
    }

    public getCookies(raw: boolean = true) {
        return raw ? this.cookies.map(Cookie.toString) : this.cookies;
    }

    public getCookie<T extends boolean = true>(name: string, raw?: T): T extends true ? string : iCookieJar.Cookie {
        const cookie = this.cookies.find(cookie => cookie.cookieName === name);

        if (!cookie) {
            throw new CookieError(`Cookie "${name}" doesn't exists`);
        }

        return (raw ?? true ? Cookie.toString(cookie) : cookie) as T extends true ? string : iCookieJar.Cookie;
    }

    public clearCookies(): void {
        this.cookies = [];
    }
}

export default CookieJar;