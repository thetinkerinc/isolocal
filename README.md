# SvelteKit isomorphic local storage
This package allows you to add local storage to your SvelteKit apps which works in SSR, in the browser, and load functions. The motivation behind this was the desire to add simple user specific functionality that can be present on the server and client without having to add database infrastructure for user preferences.

Uses [devalue](https://github.com/Rich-Harris/devalue) to stringify / parse data. Anything that can be handled by devalue can be stored in isolocal.

## Setup
1. Install the package
```sh
npm install @thetinkerinc/isolocal
pnpm install @thetinkerinc/isolocal
bun add @thetinkerinc/isolocal
```

2. Define the values you'll want to add to local storage. Provide a union of the base type along with your values. For example, if we wanted a theme value, it could look something like this:
```ts
// src/app.d.ts

import type { Local } from '@thetinkerinc/isolocal';

type Theme = 1 | 2 | 3 | 4;

declare global {
	namespace App {
		interface Locals {
			localStorage: Local & {
				theme: Theme;
			};
		}
	}
}

export {};
```

3. Add an instance to incoming requests and set default values
```ts
// src/hooks.server.ts

import { sequence } from '@sveltejs/kit/hooks';
import { addLocalStorage } from '@thetinkerinc/isolocal';

const defaults = {
	theme: 1
};

const hooks = [addLocalStorage(defaults)];

export const handle = sequence(...hooks);
```
We inject a local storage instance into requests in our server hooks to make it available inside [load functions](https://svelte.dev/docs/kit/load). You can [add other hooks in the sequence](https://svelte.dev/docs/kit/@sveltejs-kit-hooks#sequence) like normal. If they will require access to local storage, just make sure you add them after.


4. Add info to page data
```ts
// src/routes/+layout.server.ts

import { getPageData } from '@thetinkerinc/isolocal';

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	return {
		...getPageData(event)
	};
};
```
Here we pass the local values to [layout data](https://svelte.dev/docs/kit/load#Layout-data) to make it available during SSR.


5. Update vite config
```ts
// vite.config.ts

import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	ssr: {
		noExternal: ['@thetinkerinc/isolocal']
	},
	plugins: [
		sveltekit()
	]
});

```
SvelteKit [does not currently support](https://github.com/sveltejs/kit/issues/1485) using `$app` imports in library code out of the box. We need to let vite know that isolocal should be bundled together with our app during build.

Now you're all set up and ready to go!

## Usage
[Load functions](https://svelte.dev/docs/kit/load) will have access to a request specific version of the data stored for the user making the request. It can be accessed through [`event.locals`](https://svelte.dev/docs/kit/hooks#Server-hooks-locals).

**Important note** This will only work in server load functions (+layout.server.ts and +page.server.ts) because SvelteKit currently [doesn't support accessing cookies in universal load functions](https://github.com/sveltejs/kit/issues/11828).

```ts
// src/routes/+page.server.ts

import code from '$lib/snippet';
import renderSnippet from '$lib/highlighter';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	// Grab the provided local storage instance
	const { localStorage } = locals;

	// Use local storage like normal values
	const snippet = await renderSnippet(code, localStorage.theme);

	return {
		snippet
	};
};
```

Everywhere else (pages, components, library files), you can import and use the library directly.
```svelte
// src/routes/+page.svelte

<script lang="ts">
// Import and use local storage directly
// in js, ts, and svelte files

let { snippet } = $props();

import local from '@thetinkerinc/isolocal';

import updateSnippet from '$lib/highlighter';

import CodeBlock from './code-block.svelte';
import ThemePicker from './theme-picker.svelte';

$effect(()=>{
	// Local storage is reactive on the client
	// and can be used in $derived and $effect
	const html = updateSnippet(snippet, local.theme);
	snippet = html;
});
</script>

<CodeBlock {snippet} />
<ThemePicker onchange={(theme) => local.theme = theme} />
```


## API
For individual values, access them like any normal object
```ts
local.theme // Return the value stored for theme, or the default value if none has been set
local.theme = 1 // Set the value for theme and persist it to local storage
delete local.theme // Remove the stored value for theme
```

Isolocal also provides some utility functions
```ts
getAll() // Returns an object containing all currently saved values,
         // or the default value if nothing has been saved yet
```

```ts
clear() // Removes all values from storage.
```
