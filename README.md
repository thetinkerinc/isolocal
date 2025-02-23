# SvelteKit isomorphic local storage
This package allows you to add local storage to your SvelteKit apps which works in SSR, in the browser, and load functions. The motivation behind this was the desire to add simple user specific functionality that can be present on the server and client without having to add database infrastructure for user preferences.

## Setup
1. Install the package
`npm install @thetinkerinc/isomorphic-local`
`bun add @thetinkerinc/isomorphic-local`


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

Now you're all set up and ready to go!

## Usage
[Load functions](https://svelte.dev/docs/kit/load) will have access to a request specific version of the data stored for the user making the request. It can be accessed through [`event.locals`](https://svelte.dev/docs/kit/hooks#Server-hooks-locals).

**Important note** This will only work in server load functions (+layout.server.ts and +page.server.ts) because SvelteKit currently [doesn't support accessing cookies in universal load functions](https://github.com/sveltejs/kit/issues/11828).

```ts
// src/routes/+page.server.ts
import db from '$lib/db';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const defaultValue = 1;
	const pageNum: number = locals.localStorage.get('lastPageVisited', defaultValue);

	const posts = await db.getPosts({
		pageNum
	});

	return {
		posts
	};
};
```

Everywhere else (pages, components, library files), you can import and use the library directly.
```svelte
// src/routes/+page.svelte

<script lang="ts">
import local from '@thetinkerinc/isomorphic-local';

import Posts from './posts.svelte';
import Pages from './pages.svelte';

// set up a state variable with the local value
const pageNum = $state(local.get('lastPageVisited', 1));

// update the stored value whenever the state changes
$effect(() => local.set('lastPageVisited', pageNum));
</script>

<Posts />
<Pages
	{pageNum}
	onprev={() => pageNum -= 1}
	onnext={() => pageNum +=1} />
```
