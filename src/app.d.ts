import { Local } from '$lib/index.svelte.ts';

declare global {
	namespace App {
		interface Locals {
			localStorage: Local;
		}
	}
}

export {};
