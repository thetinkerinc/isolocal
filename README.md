# SvelteKit isomorphic local storage
This package allows you to add local storage to your SvelteKit apps which works in SSR, in the browser, and load functions. The motivation behind this was the desire to add simple user specific functionality that can be present on the server and client without having to add database infrastructure for user preferences.

## Setup
1. Install the package
```bash
npm install @thetinkerinc/isomorphic-local
bun add @thetinkerinc/isomorphic-local
```

2. Add an instance to incoming requests
```ts
// src/hooks.server.ts

import { sequence } from '@sveltejs/kit/hooks';
import { addLocalStorage } from '@thetinkerinc/isomorphic-local';

const hooks = [addLocalStorage];

export const handle = sequence(...hooks);
```
We inject a local storage instance into requests in our server hooks to make it available inside [load functions](https://svelte.dev/docs/kit/load). You can [add other hooks in the sequence](https://svelte.dev/docs/kit/@sveltejs-kit-hooks#sequence) like normal. If they will require access to local storage, just make sure you add them after.

3. Add info to page data
```ts
// src/routes/+layout.server.ts

import { getPageData } from '@thetinkerinc/isomorphic-local';

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	return {
		...getPageData(event)
	};
};
```
Here we pass the local values to [layout data](https://svelte.dev/docs/kit/load#Layout-data) to make it available during SSR.

4. Update TypeScript interface
```ts
// src/app.d.ts

import { Local } from '@thetinkerinc/isomorphic-local';

declare global {
	namespace App {
		interface Locals {
			localStorage: Local;
		}
	}
}

export {};
```

5.
