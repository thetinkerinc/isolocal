import { getPageData } from '$lib/index.svelte';

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	return {
		...getPageData(event)
	};
};
