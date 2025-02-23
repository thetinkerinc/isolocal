import { Local } from '$lib/index.ts';

declare global {
	namespace App {
		interface Locals {
			localStorage: Local;
		}
	}
}

export {};
