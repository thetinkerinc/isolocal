// vite.config.ts

import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	ssr: {
		noExternal: ['@thetinkerinc/isolocal']
	},
	plugins: [sveltekit()]
});
