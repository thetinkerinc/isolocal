<script lang="ts">
import { scale } from 'svelte/transition';
import { invalidateAll } from '$app/navigation';
import { CircleHelp, Github } from '@lucide/svelte';

import local from '$lib/index.svelte';

let open = $state(false);

function setTheme(theme: App.Theme) {
	return async () => {
		local.theme = theme;
		await invalidateAll();
	};
}

function stopped(fn: () => void) {
	return (evt: MouseEvent) => {
		evt.stopPropagation();
		fn();
	};
}
</script>

<svelte:window onclick={() => (open = false)} />
<div
	class="fixed top-10 right-10 z-10 flex items-center gap-2 rounded-full bg-gray-200 px-2 py-1 text-black shadow-lg">
	<button
		class="cursor-pointer rounded-full p-1 transition hover:bg-gray-300"
		onclick={stopped(() => (open = !open))}>
		<CircleHelp />
	</button>
	<a
		class="rounded-full p-1 transition hover:bg-gray-300"
		href="https://github.com/thetinkerinc/isolocal"
		target="_blank">
		<Github />
	</a>
	{#if open}
		<div
			class="absolute top-full right-0 w-[200px] translate-y-2 rounded-lg bg-gray-200 p-2 lg:w-[400px]"
			transition:scale={{ duration: 200 }}>
			<div class="text-center">Choose a theme and refresh the page</div>
			<div class="mt-2 grid grid-cols-2 lg:grid-cols-4">
				{@render theme(1, 'Galaxy', 'from-zinc-800', 'to-purple-700')}
				{@render theme(2, 'Mountain', 'from-zinc-500', 'to-stone-100')}
				{@render theme(3, 'Desert', 'from-yellow-800', 'to-yellow-500')}
				{@render theme(4, 'Paradise', 'from-amber-500', 'to-sky-500')}
			</div>
		</div>
	{/if}
</div>

{#snippet theme(idx: App.Theme, title: string, c1: string, c2: string)}
	<button
		class="cursor-pointer rounded-lg pt-2 pb-1 hover:bg-gray-300"
		onclick={stopped(setTheme(idx))}>
		<div class="flex flex-col items-center">
			<div
				class={[
					`h-[20px] w-[20px] bg-linear-to-t ${c1} ${c2} rounded`,
					local.theme === idx && 'outline outline-offset-2 outline-blue-500'
				]}>
			</div>
			<div class="text-sm text-gray-600">
				{title}
			</div>
		</div>
	</button>
{/snippet}
