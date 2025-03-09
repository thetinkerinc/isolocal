import { browser } from '$app/environment';
import { page } from '$app/state';
import browserCookies from 'js-cookie';
import * as devalue from 'devalue';

import type { Cookies as SvelteKitCookies } from '@sveltejs/kit';

type BrowserCookies = typeof browserCookies;
type CookieJar = SvelteKitCookies | BrowserCookies;
type Cookies = CookieJar & { rm: SvelteKitCookies['delete'] | BrowserCookies['remove'] };
type Defaults = Omit<App.Locals['localStorage'], 'getAll' | 'clear' | 'defaults'>;

let browserLocal = $state<Record<string, unknown>>({});

class Local {
	private cookies: Cookies | undefined = undefined;
	private cookieName: string = '_tti_isolocal';
	defaults: Defaults;

	constructor(cookieJar?: SvelteKitCookies, defaults?: Defaults) {
		this.defaults = defaults ?? ({} as Defaults);
		if (browser) {
			(browserCookies as Cookies).rm = browserCookies.remove;
			this.cookies = browserCookies as Cookies;
			browserLocal = this.parseCookie();
			this.defaults = page.data.localStorageDefaults;
		} else if (cookieJar) {
			(cookieJar as Cookies).rm = cookieJar.delete;
			this.cookies = cookieJar as Cookies;
		}
	}

	getAll() {
		if (browser) {
			return {
				...page.data.localStorageDefaults,
				...$state.snapshot(browserLocal)
			};
		} else if (this.cookies) {
			return {
				...this.defaults,
				...this.parseCookie()
			};
		} else {
			return {
				...this.defaults,
				...(page.data.localStorage ?? {})
			};
		}
	}

	clear() {
		if (!this.cookies) {
			throw new Error('Local storage can only be cleared in load functions and in the browser');
		}
		this.cookies.rm(this.cookieName, { path: '/', secure: true, sameSite: 'strict' });
	}

	save(vals: unknown) {
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

	private parseCookie() {
		if (!this.cookies) {
			throw new Error('Cookies can only be parsed in load functions and in the browser');
		}
		return devalue.parse(this.cookies.get(this.cookieName) ?? '[{}]');
	}
}

function makeLocalStorage(cookieJar?: SvelteKitCookies, defaults?: Defaults) {
	return new Proxy(new Local(cookieJar, defaults), {
		get(target, prop, receiver) {
			const key = prop.toString();
			const internal = [
				'cookies',
				'cookieName',
				'parseCookie',
				'defaults',
				'getAll',
				'clear',
				'save'
			];
			if (internal.includes(key)) {
				return Reflect.get(target, prop, receiver);
			}
			if (browser) {
				return browserLocal[key] ?? page.data.localStorageDefaults[key];
			} else {
				const vals = target.getAll();
				return vals[key] ?? target.defaults[key as keyof Defaults];
			}
		},

		set(target, prop, value) {
			const key = prop.toString();
			const internal = ['defaults'];
			if (internal.includes(key)) {
				return Reflect.set(target, prop, value);
			}
			if (browser) {
				browserLocal[key] = value;
				target.save($state.snapshot(browserLocal));
			} else {
				const vals = target.getAll();
				vals[key] = value;
				target.save(vals);
			}
			return true;
		},

		deleteProperty(target, prop) {
			const key = prop.toString();
			if (browser) {
				delete browserLocal[key];
				target.save($state.snapshot(browserLocal));
			} else {
				const vals = target.getAll();
				delete vals[key];
				target.save(vals);
			}
			return true;
		}
	});
}

function nextYear() {
	return new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
}

export type { Defaults };
export { makeLocalStorage };
