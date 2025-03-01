// src/routes/+layout.server.ts

import { getPageData } from '@thetinkerinc/isolocal';

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	return {
		...getPageData(event)
	};
};
