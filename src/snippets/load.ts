// Load functions will provide a local storage
// instance scoped to the current requiest

import code from '$lib/snippet';
import renderSnippet from '$lib/highlighter';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	// Grab the provided local storage instance
	const { localStorage } = locals;

	// Use local storage like normal values
	const snippet = await renderSnippet(code, localStorage.theme);

	return {
		snippet
	};
};
