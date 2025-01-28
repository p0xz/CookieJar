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

- ⚡️ Fast Cookie Parsing: Efficiently parses raw cookie strings.
- 🗄️ Cookie Jar Management: Stores and manages multiple cookies.
- 🔎 Easy Cookie Retrieval: Retrieve cookies by name.
- ✅ TypeScript Support: Built-in type definitions.
- 🚀 Zero Dependencies: Lightweight and dependency-free.
- ⏳ Expiration Handling: Monitor and manage expiring cookies with custom warnings and removal logic.

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

jar.expireChecker("sessionId", () => {
  console.log("Session cookie has expired!");
  // handle aftermath...
}, { warnLimit: "12h", delay: 60 * 60 * 1000 }); // time is in ms
```

Time format for `warnLimit` can also be `"365y 4w 30d 24h 60m 60s"` (order is irrelevant)

## Methods

### Sets and initializes your cookies

```ts
setCookies(_cookies: Array<string>);
```

### Return cookies

This will return your cookies you've saved. There's also an option to return it in form of raw unparsed data or already processed.
<br/>
By **default** it will return raw unparsed data

```ts
getCookies(formatted: boolean = true);
```

### Return specified cookie

This will return your desired cookie by name, if it exists.

```ts
getCookie(name: string, raw: boolean = true);
```

### Clear cookies

Simply erases your cookies from array leaving it empty.

```ts
clearCookies();
```

## TO:DO

### Implement immediate cookie checker

```ts
import cookiejar from "@p0xz/cookiejar";

const jar = new CookieJar();

const exampleCookie = "sessionId=abc123; SameSite=Strict; Expires=Wed, 09 Jun 2025 10:18:14 GMT";

const sessionIdMiddleware = jar.intercept('sessionId', () => {
  // handle session refresh...
});

// returns sessionId value (i.e abc123), but before any cookie retrieval it will check the expiration date and if it's already expired then it will be handled accordingly
const sessionId = sessionIdMiddleware.getCookie();
```

This can be useful when handling 3rd party cookies e.g instagram scrapper where you'd need the token which is limited by time.

## License

Copyright © 2025 [cookieJar](https://github.com/p0xz/CookieJar)

This project is protected under the [GNU AGPLv3](https://choosealicense.com/licenses/agpl-3.0/) License. For more details, refer to the [LICENSE](https://github.com/p0xz/CookieJar/blob/master/LICENSE) file.
