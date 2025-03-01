<script lang="ts">
let { children } = $props();

import '../app.css';
</script>

<div class="min-h-[100vh] bg-zinc-800 pb-20 text-white">
	{@render children()}
</div>
