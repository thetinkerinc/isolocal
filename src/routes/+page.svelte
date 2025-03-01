<script lang="ts">
import Title from './title.svelte';
import Snippet from './snippet.svelte';
</script>

<svelte:head>
	<title>SvelteKit Isostore</title>
</svelte:head>
<Title />
<div class="mx-auto mb-10 w-[600px] max-w-[90%] text-center text-[24px]">
	Store and access user-specific data in load functions, during SSR, and on the client without
	reaching for a database
</div>
<div class="grid grid-rows-[auto_auto] gap-4 px-4 lg:grid-cols-2 lg:grid-rows-1">
	<div class="flex flex-col gap-6">
		<div class="text-center text-xl">Setup</div>
		<Snippet img="hooks" step={1} />
		<Snippet img="layout" step={2} />
		<Snippet img="types" step={3} />
	</div>
	<div class="flex flex-col gap-6">
		<div class="text-center text-xl">Usage</div>
		<Snippet img="load" step={1} />
		<Snippet img="js" step={2} />
	</div>
</div>
