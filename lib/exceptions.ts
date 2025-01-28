export class CookieError extends Error {
    public constructor(message: string) {
        super(message);
        this.name = `CookieError`
    }
}