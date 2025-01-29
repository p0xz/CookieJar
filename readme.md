<p align="center">
    <img src="https://ucarecdn.com/239dc829-65f3-4ec9-b0a1-6bba2e878b40/477bda9dece1440bbf2dc6f0b90b4042_removalai_preview1.png" align="center" width="30%">
</p>
<p align="center"><h1 align="center">CookieJar</h1></p>
<p align="center">
 <em><code>Lightweight cookiejar library for node.js</code></em>
</p>
<p align="center">
 <img src="https://img.shields.io/github/license/p0xz/CookieJar?style=default&logo=opensourceinitiative&logoColor=white&color=ff964f" alt="license">
 <img src="https://img.shields.io/github/last-commit/p0xz/CookieJar?style=default&logo=git&logoColor=white&color=ff964f" alt="last-commit">
 <img src="https://img.shields.io/github/languages/top/p0xz/CookieJar?style=default&color=ff964f" alt="repo-top-language">
 <img src="https://img.shields.io/github/languages/count/p0xz/CookieJar?style=default&color=ff964f" alt="repo-language-count">
 <a href="https://www.npmjs.com/package/@p0xz/cookiejar" style="outline:none;border:none;"><img src="https://img.shields.io/npm/v/@p0xz/cookiejar" alt="npm-version" /></a>
</p>
<p align="center"><!-- default option, no dependency badges. -->
</p>
<p align="center">
 <!-- default option, no dependency badges. -->
</p>
<br>

**cookiejar** is simple & lightweight node.js library built for having a place where to store your cookies

## Features

- ⚡️ Fast Cookie Parsing: Efficiently parses raw cookie strings
- 🗄️ Cookie Jar Management: Stores and manages multiple cookies
- ⏳ Expiration Handling: Monitor and manage expiring cookies with custom warnings and removal logic
- 🔄 Custom Cookie Interceptors: Dynamically access and update cookies with custom logic
- 🔎 Easy Cookie Retrieval: Retrieve cookies by name
- ✅ TypeScript Support: Built-in type definitions
- 🚀 Zero Dependencies: Lightweight and dependency-free

## Install

```sh
pnpm i @p0xz/cookiejar
```

## Usage

```ts
import cookiejar from "@p0xz/cookiejar";

const jar = new CookieJar();

const exampleCookie = "sessionId=abc123; Domain=example.com; Path=/; Secure; HttpOnly; SameSite=Strict; Expires=Wed, 09 Jun 2025 10:18:14 GMT";

// takes an array with cookie strings and then it will proccess them
jar.setCookies([exampleCookie, ...]);

// returns 'sessionId' value
jar.getCookie("sessionId");
```

### Expiration handling

With the `expireChecker` function, you can:

- Automatically detect when cookies are about to expire and issue warnings.
- Configure custom thresholds for warnings using the `warnLimit` option.
- Remove expired cookies and trigger a callback function for custom logic.

```ts
import cookiejar from "@p0xz/cookiejar";

const jar = new CookieJar();

const exampleCookie = "sessionId=abc123; SameSite=Strict; Expires=Wed, 09 Jun 2025 10:18:14 GMT";

jar.setCookie([exampleCookie]);

jar.expireChecker("sessionId", () => {
  console.log("Session cookie has expired!");
  // handle aftermath...
}, { warnLimit: "12h", delay: 60 * 60 * 1000 }); // time is in ms
```

Time format for `warnLimit` can also be `"365y 4w 30d 24h 60m 60s"` (order is irrelevant)

### Interceptor

With `intercept`, you can:

- Dynamically update a cookie's value using a callback.
- Check if a cookie has expired with a built-in helper method.
- Access the raw or parsed cookie at any time.

```ts
import cookiejar from "@p0xz/cookiejar";

const jar = new CookieJar();

const exampleCookie = "sessionId=abc123; SameSite=Strict; Expires=Wed, 09 Jun 2024 10:18:14 GMT";

jar.setCookie([exampleCookie]);

const sessionIdMiddleware = jar.intercept("sessionId", (options) => {
  if (!options.isExpired()) return;

  console.warn("The sessionId cookie has expired.");
  options.update("sessionId=refreshed123; SameSite=Strict; Expires=Wed, 10 Jun 2025 10:18:14 GMT");
});

// returns cookie with interceptor behind it
sessionIdMiddleware.getCookie();
```

## Methods

### Sets and initializes your cookies

```ts
setCookies(_cookies: Array<string>);
```

### 🔍 Get All Cookies

Retrieves all stored cookies. You can choose to return either raw cookie strings or parsed cookie objects.

```ts
getCookies(raw: boolean = true);
```

### 🎯 Get a Specific Cookie

Retrieves a specific cookie by name, if it exists.

```ts
getCookie(name: string, raw: boolean = true);
```

### 🗑️ Clear All Cookies

Removes all stored cookies, leaving the cookie jar empty.

```ts
clearCookies();
```

### 🍪 Intercept cookie

The `intercept` method allows you to hook into a specific cookie's lifecycle, enabling dynamic modifications before it is accessed.
<br/>This is useful for updating cookie values, checking expiration or adding custom behavior.

```ts
intercept(cookieName: string, callback: (options: iCookieJar.interceptorOptions) => void);
```

Once a cookie is intercepted, the method returns a separate `getCookie` function, which ensures that the interception logic does not interfere with the default `getCookie` method of the class.

```ts
getCookie: (raw?: boolean) => string | iCookieJar.Cookie;
```

## 📜 Interface

```ts
namespace iCookieJar {
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
```

## TO:DO

- [x] Implement immediate cookie checker

## License

Copyright © 2025 [cookieJar](https://github.com/p0xz/CookieJar)

This project is protected under the [GNU AGPLv3](https://choosealicense.com/licenses/agpl-3.0/) License. For more details, refer to the [LICENSE](https://github.com/p0xz/CookieJar/blob/master/LICENSE) file.
