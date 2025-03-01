// src/app.d.ts

import { Local } from '@thetinkerinc/isolocal';

declare global {
	namespace App {
		interface Locals {
			localStorage: Local;
		}
	}
}

export {};
