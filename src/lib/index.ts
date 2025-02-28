import { browser } from '$app/environment';
import { page } from '$app/state';
import browserCookies from 'js-cookie';
import * as devalue from 'devalue';

import type { Cookies as SvelteKitCookies, Handle, RequestEvent } from '@sveltejs/kit';

type BrowserCookies = typeof browserCookies;
type CookieJar = SvelteKitCookies | BrowserCookies;
type Cookies = CookieJar & { rm: (SvelteKitCookies['delete']) | BrowserCookies['remove']};

class Local {
	private cookies: Cookies | undefined = undefined;
	private cookieName: string = '_ls';

	constructor(cookieJar?: SvelteKitCookies) {
		if (browser) {
			(browserCookies as Cookies).rm = browserCookies.remove;
			this.cookies = browserCookies as Cookies;
		} else if (cookieJar) {
			(cookieJar as Cookies).rm = cookieJar.delete;
			this.cookies = cookieJar as Cookies;
		}
	}

	get<T>(key: string, fallback?: T): T | undefined {
		const vals = this.getAll();
		return vals[key] ?? fallback;
	}

	set<T>(key: string, val: T) {
		const vals = this.getAll();
		vals[key] = val;
		this.save(vals);
	}

	rm(key: string) {
		const vals = this.getAll();
		delete vals[key];
		this.save(vals);
	}

	getAll(): Record<string, unknown> {
		if (this.cookies) {
			return devalue.parse(this.cookies.get(this.cookieName) ?? '[{}]');
		} else {
			return page.data.localStorage ?? {};
		}
	}

	clear() {
		if (!this.cookies){
			throw new Error('Local storage can only be cleared in load functions and in the browser');
		}
		this.cookies.rm(this.cookieName, { path: '/' });
	}

	private save(vals: unknown) {
		if (!this.cookies) {
			throw new Error('Local storage can only be set in load functions and in the browser');
		}
		this.cookies.set(this.cookieName, devalue.stringify(vals), {
			expires: nextYear(),
			path: '/'
		});
	}
}

function nextYear(){
	return new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
}

const addLocalStorage: Handle = ({ event, resolve }) => {
	event.locals.localStorage = new Local(event.cookies);
	return resolve(event);
}

function getPageData(event: RequestEvent) {
	const { localStorage } = event.locals;
	return {
		localStorage: localStorage.getAll()
	};
}

const local = new Local();

export { addLocalStorage, getPageData, Local };
export default local;
