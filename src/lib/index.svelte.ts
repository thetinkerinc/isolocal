import { Local, makeLocalStorage } from './utils.svelte';

import type { Handle, RequestEvent } from '@sveltejs/kit';

const local = makeLocalStorage(undefined, undefined);

function addLocalStorage(defaults?: Record<string, unknown>) {
	return (({ event, resolve }) => {
		event.locals.localStorage = makeLocalStorage(event.cookies, defaults);
		return resolve(event);
	}) as Handle;
}

function getPageData(event: RequestEvent) {
	const { localStorage } = event.locals;
	return {
		localStorage: localStorage.getAll(),
		localStorageDefaults: localStorage.defaults
	};
}

export { addLocalStorage, getPageData, Local };
export default local;
