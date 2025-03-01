<script lang="ts">
let { file, step }: Props = $props();

import { page } from '$app/state';
import { Clipboard } from 'lucide-svelte';

interface Props {
	file: string;
	step?: number;
}

let snippet = $derived(page.data.snippets[file]);

function cp() {
	console.log('copying');
}
</script>

<div class="relative">
	<div class="overflow-hidden rounded-lg">
		{@html snippet}
	</div>
	{#if step}
		<div
			class="absolute -top-3 left-1/2 grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full bg-zinc-800 shadow-sm shadow-teal-300/60">
			{step}
		</div>
	{/if}
	<button
		class="absolute top-2 right-2 rounded p-1 transition hover:cursor-pointer hover:bg-zinc-800"
		onclick={cp}>
		<Clipboard />
	</button>
</div>

<style>
:global(pre.shiki) {
	padding: 1rem;
	overflow-x: auto;
}
</style>
