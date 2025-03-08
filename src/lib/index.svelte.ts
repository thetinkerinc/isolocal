import { browser } from '$app/environment';
import { page } from '$app/state';
import browserCookies from 'js-cookie';
import * as devalue from 'devalue';

import type { Cookies as SvelteKitCookies, Handle, RequestEvent } from '@sveltejs/kit';

type BrowserCookies = typeof browserCookies;
type CookieJar = SvelteKitCookies | BrowserCookies;
type Cookies = CookieJar & { rm: SvelteKitCookies['delete'] | BrowserCookies['remove'] };

let browserLocal = $state<Record<string, unknown>>({});

class Local {
	private cookies: Cookies | undefined = undefined;
	private cookieName: string = '_tti_isolocal';

	constructor(cookieJar?: SvelteKitCookies) {
		if (browser) {
			(browserCookies as Cookies).rm = browserCookies.remove;
			this.cookies = browserCookies as Cookies;
			browserLocal = this.parseCookie();
		} else if (cookieJar) {
			(cookieJar as Cookies).rm = cookieJar.delete;
			this.cookies = cookieJar as Cookies;
		}
	}

	get(key: string, fallback?: unknown) {
		if (browser) {
			return browserLocal[key] ?? fallback;
		} else {
			const vals = this.getAll();
			return vals[key] ?? fallback;
		}
	}

	set(key: string, val: unknown) {
		if (browser) {
			browserLocal[key] = val;
			this.save($state.snapshot(browserLocal));
		} else {
			const vals = this.getAll();
			vals[key] = val;
			this.save(vals);
		}
	}

	rm(key: string) {
		if (browser) {
			delete browserLocal[key];
			this.save($state.snapshot(browserLocal));
		} else {
			const vals = this.getAll();
			delete vals[key];
			this.save(vals);
		}
	}

	getAll() {
		if (browser) {
			return $state.snapshot(browserLocal);
		} else if (this.cookies) {
			return this.parseCookie();
		} else {
			return page.data.localStorage ?? {};
		}
	}

	clear() {
		if (!this.cookies) {
			throw new Error('Local storage can only be cleared in load functions and in the browser');
		}
		this.cookies.rm(this.cookieName, { path: '/', secure: true, sameSite: 'strict' });
	}

	private parseCookie() {
		if (!this.cookies) {
			throw new Error('Cookies can only be parsed in load functions and in the browser');
		}
		return devalue.parse(this.cookies.get(this.cookieName) ?? '[{}]');
	}

	private save(vals: unknown) {
		if (!this.cookies) {
			throw new Error('Local storage can only be set in load functions and in the browser');
		}
		this.cookies.set(this.cookieName, devalue.stringify(vals), {
			expires: nextYear(),
			path: '/',
			secure: true,
			sameSite: 'strict'
		});
	}
}

function nextYear() {
	return new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
}

const addLocalStorage: Handle = ({ event, resolve }) => {
	event.locals.localStorage = new Local(event.cookies);
	return resolve(event);
};

function getPageData(event: RequestEvent) {
	const { localStorage } = event.locals;
	return {
		localStorage: localStorage.getAll()
	};
}

export { addLocalStorage, getPageData, Local };
export default new Local();
