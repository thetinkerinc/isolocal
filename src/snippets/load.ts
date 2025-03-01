// Load functions will provide a request scoped local storage instance

import db from '$lib/db';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	// Grab the provided local storage instance
	const { localStorage } = locals;
	const fallback = 1;
	const page = localStorage.get('lastPageVisited', fallback);

	return {
		posts: await db.getPosts({
			page
		})
	};
};
