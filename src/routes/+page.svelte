<script lang="ts">
import Title from './title.svelte';
import Snippet from './snippet.svelte';
</script>

<svelte:head>
	<title>SvelteKit Isolocal</title>
</svelte:head>
<Title />
<div class="mx-auto mb-10 w-[600px] max-w-[90%] text-center text-[20px] lg:text-[24px]">
	Store and access user-specific data in load functions, during SSR, and on the client without
	reaching for a database
</div>
<div class="grid grid-rows-[auto_auto] gap-4 px-4 lg:grid-cols-2 lg:grid-rows-1">
	<div class="flex flex-col gap-6">
		<div class="text-center text-xl">Setup</div>
		<Snippet file="hooks.ts" step={1} />
		<Snippet file="layout.ts" step={2} />
		<Snippet file="vite.ts" step={3} />
		<Snippet file="types.ts" step={4} />
	</div>
	<div class="flex flex-col gap-6">
		<div class="mt-10 text-center text-xl lg:mt-0">Usage</div>
		<Snippet file="load.ts" />
		<Snippet file="js.svelte" />
	</div>
</div>
