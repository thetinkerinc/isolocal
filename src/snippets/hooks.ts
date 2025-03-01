// src/hooks.server.ts

import { sequence } from '@sveltejs/kit/hooks';
import { addLocalStorage } from '@thetinkerinc/isolocal';

const hooks = [addLocalStorage];

export const handle = sequence(...hooks);
