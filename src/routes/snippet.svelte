<script lang="ts">
let { file, step }: Props = $props();

import { scale, fade } from 'svelte/transition';
import { page } from '$app/state';
import { Clipboard } from 'lucide-svelte';

interface Props {
	file: string;
	step?: number;
}

let showCopied = $state(false);

let snippet = $derived(page.data.snippets[file].html);

function cp() {
	const { code } = page.data.snippets[file];
	const toCopy = code.replace(/\/\/.*\n\n/, '');
	navigator.clipboard.writeText(toCopy);
	showCopied = true;
	setTimeout(() => (showCopied = false), 600);
}
</script>

<div class="relative">
	<div class="mx-auto max-w-[90vw] overflow-hidden rounded-lg shadow-lg">
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
	{#if showCopied}
		<div
			class="absolute -top-6 -right-2 rounded bg-cyan-500 px-2 py-1"
			in:scale={{ duration: 200 }}
			out:fade={{ duration: 200 }}>
			Copied
		</div>
	{/if}
</div>

<style>
:global(pre.shiki) {
	padding: 1rem;
	overflow-x: auto;
	opacity: 0.9;
}
</style>
