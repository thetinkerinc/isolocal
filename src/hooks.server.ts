import { sequence } from '@sveltejs/kit/hooks';

import { addLocalStorage } from '$lib/index.svelte';

const hooks = [addLocalStorage];

export const handle = sequence(...hooks);
