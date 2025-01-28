namespace iCookieJar {
    export interface Cookie {
        cookieName: string;
        cookieValue: string;
        attributes: Map<string, any>;
        raw: string;
    }
}

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

    const matches = time.match(/(\d+)([a-zA-Z]+)/g);
    if (!matches) {
        throw new Error(`Invalid time string format: ${time}`);
    }

    let totalMilliseconds = 0;

    for (const match of matches) {
        const [, value, unit] = match.match(/(\d+)([a-zA-Z]+)/) as RegExpMatchArray;

        if (!UNITS_IN_MS[unit as keyof typeof UNITS_IN_MS]) {
            throw new Error(`Unknown time unit: ${unit}`);
        }

        totalMilliseconds += parseInt(value, 10) * UNITS_IN_MS[unit as keyof typeof UNITS_IN_MS];
    }
    return totalMilliseconds;
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

// TODO: Implement cookieBuilder
class CookieJar {
    private cookies: iCookieJar.Cookie[];
    private debug_stdout: boolean

    constructor(debug_stdout: boolean = false) {
        this.cookies = [];
        this.debug_stdout = debug_stdout;
    }

    // TODO: Implement cookieBuilder
    private cookieBuilder() {
        // ...
    }

    public removeCookie(cookieName: string) {
        const cookie = this.getCookie(cookieName, false) as iCookieJar.Cookie;

        const id = this.cookies.indexOf(cookie);

        if (id < 0) return;

        this.cookies.splice(id, 1);
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

    public setCookies(cookies: Array<string>) {
        this.cookies = cookies.map(cookie => Cookie.parse(cookie));
    }

    /**
     * 
     * @param formatted if true, returns the cookies in raw format i.e string otherwise in parsed format
     */
    public getCookies(formatted: boolean = true) {
        if (!formatted) return this.cookies;

        return this.cookies.map(cookie => Cookie.toString(cookie));
    }

    public getCookie(name: string, raw: boolean = true) {
        const cookie = this.cookies.find(cookie => cookie.cookieName === name);

        if (!cookie) return undefined;
        if (!raw) return cookie;

        return Cookie.toString(cookie);
    }

    public clearCookies(): void {
        this.cookies = [];
    }
}

const testCookie = ["sessionId=abc123; Domain=example.com; Path=/; Secure; HttpOnly; SameSite=Strict; Expires=Wed, 09 Feb 2025 10:18:14 GMT",
    "garlicID=pukovec; Domain=example.com; Path=/; Secure; HttpOnly; SameSite=Strict; Expires=Wed, 01 Jun 2025 10:00:14 GMT"
]

const cookieJar = new CookieJar();

cookieJar.setCookies(testCookie);

cookieJar.removeCookie('sessionId')

export default CookieJar;