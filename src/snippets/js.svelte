<script lang="ts">
// Import and use local storage directly
// in js, ts, and svelte files

import local from '@thetinkerinc/isolocal';

import Posts from './posts.svelte';
import Pages from './pages.svelte';

function updatePage(change) {
	const page = local.get('lastPageVisited', 1);
	local.set('lastPageVisited', page + change);
}
</script>

<Posts />
<Pages
	page={local.get('lastPageVisited', 1)}
	onprev={() => updatePage(1)}
	onnext={() => updatePage(-1)} />
