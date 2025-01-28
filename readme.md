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

## Install

```sh
pnpm i @p0xz/cookiejar
```

## Usage

```js
import cookiejar from "@p0xz/cookiejar";

const jar = new CookieJar();

const exampleCookie =
  "sessionId=abc123; Domain=example.com; Path=/; Secure; HttpOnly; SameSite=Strict; Expires=Wed, 09 Jun 2025 10:18:14 GMT";

// it takes an array with cookie strings and then it will proccess them
jar.setCookies([exampleCookie]);

// returns 'sessionId' value
jar.getCookie("sessionId");
```

## Methods

### Sets and initializes your cookies

```js
setCookies(_cookies: Array<string>);
```

### Return cookies

This will return your cookies you've saved. There's also an option to return it in form of raw unparsed data or already processed. <br/> By **default** it will return raw unparsed data

```js
getCookies(formatted: boolean);
```

### Return specified cookie

This will return your desired cookie by name, if it exists.

```js
getCookie(name: string);
```

### Clear cookies

Simply erases your cookies from array leaving it empty.

```js
clearCookies();
```

## License

Copyright © 2025 [cookieJar](https://github.com/p0xz/CookieJar)

This project is protected under the [GNU AGPLv3](https://choosealicense.com/licenses/agpl-3.0/) License. For more details, refer to the [LICENSE](https://github.com/p0xz/CookieJar/blob/master/LICENSE) file.
