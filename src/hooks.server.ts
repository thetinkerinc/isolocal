import { sequence } from '@sveltejs/kit/hooks';

import { addLocalStorage } from '$lib/index';

const hooks = [addLocalStorage];

export const handle = sequence(...hooks);
