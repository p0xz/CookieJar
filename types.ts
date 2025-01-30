export namespace iCookieJar {
    export interface interceptorOptions {
        update: (cookie: string) => void;
        isExpired: () => void;
    }
    export interface Cookie {
        cookieName: string;
        cookieValue: string;
        attributes: Map<string, any>;
        interceptor?: (options: interceptorOptions) => void;
        raw: string;
    }
}