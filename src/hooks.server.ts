import { sequence } from '@sveltejs/kit/hooks';

import { addLocalStorage } from '$lib/index.svelte';

const hooks = [addLocalStorage({ theme: 1 })];

export const handle = sequence(...hooks);
