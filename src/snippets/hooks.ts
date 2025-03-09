// src/hooks.server.ts

import { sequence } from '@sveltejs/kit/hooks';
import { addLocalStorage } from '@thetinkerinc/isolocal';

// Add default values
const defaults = {
	theme: 1
};

const hooks = [addLocalStorage(defaults)];

export const handle = sequence(...hooks);
