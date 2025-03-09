import type { Local } from '$lib/index.svelte.ts';

declare global {
	namespace App {
		type Theme = 1 | 2 | 3 | 4;

		interface Locals {
			localStorage: Local & {
				theme: Theme;
			};
		}
	}
}

export {};
