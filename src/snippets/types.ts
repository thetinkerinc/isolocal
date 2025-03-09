// src/app.d.ts

import type { Local } from '@thetinkerinc/isolocal';

type Theme = 1 | 2 | 3 | 4;

declare global {
	namespace App {
		// Define all the values you want
		// to add to local storage
		interface Locals {
			localStorage: Local & {
				theme: Theme;
			};
		}
	}
}

export {};
