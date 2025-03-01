<script lang="ts">
let { img, step } = $props();

import { Clipboard } from 'lucide-svelte';

function cp() {
	console.log('copying');
}
</script>

<div class="relative">
	<img class="shadow-lg" src="/{img}.svg" alt="Code snippet" />
	<div
		class="absolute -top-2 left-1/2 grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full bg-zinc-800 shadow-sm shadow-teal-300/60">
		{step}
	</div>
	<button
		class="absolute top-2 right-2 rounded p-1 transition hover:cursor-pointer hover:bg-zinc-800"
		onclick={cp}>
		<Clipboard />
	</button>
</div>
