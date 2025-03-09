import { makeLocalStorage } from './utils.svelte';

import type { Handle, RequestEvent } from '@sveltejs/kit';
import type { Defaults } from './utils.svelte';

interface Local {
	getAll: () => Record<string, unknown>;
	clear: () => void;
	defaults: Record<string, unknown>;
}

const local = makeLocalStorage(undefined, undefined) as unknown as App.Locals['localStorage'];

function addLocalStorage(defaults: Defaults) {
	return (({ event, resolve }) => {
		event.locals.localStorage = makeLocalStorage(
			event.cookies,
			defaults
		) as unknown as App.Locals['localStorage'];
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

export type { Local };
export { addLocalStorage, getPageData };
export default local;
