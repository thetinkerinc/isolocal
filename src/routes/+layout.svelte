<script lang="ts">
let { children } = $props();

import Menu from './menu.svelte';
import Footer from './footer.svelte';

import getThemer from '../utils/themer.svelte';

import '../app.css';

const themer = getThemer();
</script>

<div
	class="min-h-[100vh] bg-zinc-700 bg-[url('/bg{themer.value}.webp')] bg-cover bg-fixed bg-center pb-10 text-white bg-blend-soft-light">
	<Menu />
	{@render children()}
	<Footer />
</div>
