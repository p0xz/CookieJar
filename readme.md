<p align="center">
    <img src="https://lh3.googleusercontent.com/fife/ALs6j_F3F4SmnxawPQ8NJyKDH3R2S9BggZ3M8_F3m10xP3WZCPXzqqErexp_yYlPohLXho6xEej4MffiFnhnozMZWShWY7xBsZaG-mkyDxGhNwqqZnt5vyW89Wg6yQ5JWO_D2MUTjed_Hs31oQMijEebFqRdg103pa01wFPt95DPwg1rT9sWUM3_vnwdGMCdWwAqTbGik9z8l6hi-S1uNZAw7aQICd3U_eQ4SbdO7sx-RvOLfGYODZQlsjni2RDbuE3XIZG_bga8vom7zphWl9u974_i-nNOCxEnSlFcd9cOXVyAYf7rE3oIBorShyJ_bAUu2IDJryifjvBuNEf7-ztJF2Tobalv6f1qyjzTJTIKkX2hx2u446PGLk939NCMdXkSz9MBqSf3Xknc75-wf3iXLUJ6ghpzWimzmQatlx4wbNoc4mY8PmSRu1D7ugHHntKyAr98DPNCsnpUU6Iu7BEWDssEemHbgWeBG-3tuSwipVLwDN84vgMYI8AcAUAS7-hmNwf3lOhUMio89J_YgCcLOHrbb_eyD5QVGZWa3yBIKAh2PqHZW8bk2e-rdNdasO3IjIeNJUlc5b2XbgLgklYoAhkPKRoDYu9hwS8S-eB1ajyJJOXselSkw0zSpJ3BOpgBTtsuER3ZmE5p1ImOQ3rrbrRFipZwysNPhewJxF0cNtJ1ZRnf5qm1CgUkqHLt3IJzhjlS319ivo8qLt4aZpGh0WFrVy0om0soEDKsqdGp80oOBUW94S8bCm_tVhiChswafBz9qvPcvedptnXMcNvYX6OR5q-cUBuhjbDK1iJZndHXC2oN1oyQqXpubb7x8T0mWWxmK3zGFnBKMCs8LcPMbCBWECEng04wv5-ADKkU7Iroh_ugWJKYtXITsxYxzv_5E-aCtb1TRjGvpg2LKIGGBmMXqH7PuUsYkYDgxqINkGR2IuEfNHvGLLVhCVf29ExjsuEID5Orugx-wpB44ZgtqO2PNMCtF_veAJ8dpMVnlEpvSxmGaHweWJYi_56tIHDimgu-Sblzd6GB2TMaiPnJa9o4xqf-JqnwblnmjEvprZlLoRLoL5uyh0txVoY1cs5lpJIvZAfuSYu6I3sAGaASacxFgLkXQds0HljphY1ByfismuceHnmbyYqtKDlmr5U6FvBiyx9xHnsCHcldnM7pwDnfz74VegUDqeJJyJd5xt5Au7TmUBeIlXPfdEGU-RzSBZmRcWwOUtdQ9JWUFXwVbRdgkUQiBRjxCY6OMq3RfmWSrAhAt1hI-WcSmgutO0Z0HqiSxmpIKvQOEgGAj4a1L5ShAwkMjjE_cCGMCdx1o3LPuKNGFRXqhe3vsBIP-q8qrUXrNDasucF31K5GpsgWqqPBFyKnKtAqtB2gAC6Mk-2i8luMB8d77sORk4yjPRXFswRfFRr2tjD0Vw4oufPEb8SYoYu0dPOCzjD-ee2UksUOicccLYZnIOkEYRTbO8lbVSkcf0ZcFgnk=s512" align="center" width="30%">
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
setCookies(_cookies: Array<string>) {}
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
