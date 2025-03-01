<script lang="ts">
// Import and use local storage directly
// in js, ts, and svelte files

import local from '@thetinkerinc/isolocal';

import Posts from './posts.svelte';
import Pages from './pages.svelte';

// set up a state variable with the local value
let page = $state(local.get('lastPageVisited', 1));

// update the stored value whenever the state changes
$effect(() => local.set('lastPageVisited', page));
</script>

<Posts />
<Pages {page} onprev={() => (page -= 1)} onnext={() => (page += 1)} />
