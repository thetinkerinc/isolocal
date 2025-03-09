<script lang="ts">
// Import and use local storage directly
// in js, ts, and svelte files

let { snippet } = $props();

import local from '@thetinkerinc/isolocal';

import updateSnippet from '$lib/highlighter';

import CodeBlock from './code-block.svelte';
import ThemePicker from './theme-picker.svelte';

$effect(() => {
	// Local storage is reactive on the client
	// and can be used in $derived and $effect
	const html = updateSnippet(snippet, local.theme);
	snippet = html;
});
</script>

<CodeBlock {snippet} />
<ThemePicker onchange={(theme) => (local.theme = theme)} />
