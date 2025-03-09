<script lang="ts">
let { children } = $props();

import local from '$lib/index.svelte';

import Menu from './menu.svelte';
import Footer from './footer.svelte';

import '../app.css';
</script>

<div
	class="min-h-[100vh] bg-zinc-700 bg-[url('/bg{local.theme}.webp')] bg-cover bg-fixed bg-center pb-10 text-white bg-blend-soft-light">
	<Menu />
	{@render children()}
	<Footer />
</div>
<div class="hidden bg-[url('/bg1.webp')]"></div>
<div class="hidden bg-[url('/bg2.webp')]"></div>
<div class="hidden bg-[url('/bg3.webp')]"></div>
<div class="hidden bg-[url('/bg4.webp')]"></div>
