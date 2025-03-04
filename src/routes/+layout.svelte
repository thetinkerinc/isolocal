<script lang="ts">
let { children } = $props();

import '../app.css';
</script>

<div
	class="min-h-[100vh] bg-zinc-700 bg-[url('/bg.webp')] bg-cover bg-fixed bg-center pb-10 text-white bg-blend-soft-light">
	{@render children()}
	<div class="mt-20 text-center">
		Photo by
		<a
			href="https://unsplash.com/@evgenit?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
			Evgeni Tcherkasski
		</a>
		on
		<a
			href="https://unsplash.com/photos/the-night-sky-is-filled-with-stars-above-a-lake-yRqSop1Li4Y?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
			Unsplash
		</a>
	</div>
</div>

<style lang="postcss">
a {
	@apply hover:underline;
}
</style>
