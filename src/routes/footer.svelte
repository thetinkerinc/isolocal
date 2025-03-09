<script lang="ts">
import local from '$lib/index.svelte';

const credits = [
	{
		photographer: 'Evgeni Tcherkasski',
		profile:
			'https://unsplash.com/@evgenit?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash',
		photo:
			'https://unsplash.com/photos/the-night-sky-is-filled-with-stars-above-a-lake-yRqSop1Li4Y?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash'
	},
	{
		photographer: 'Pascale Amez',
		profile:
			'https://unsplash.com/@pascale_amez?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash',
		photo:
			'https://unsplash.com/photos/landscape-photo-of-white-mountains-Q4RuIsRuMcs?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash'
	},
	{
		photographer: 'Ganapathy Kumar',
		profile:
			'https://unsplash.com/@gkumar2175?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash',
		photo:
			'https://unsplash.com/photos/landscape-photography-of-rock-formation-L75D18aVal8?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash'
	},
	{
		photographer: 'Derek Thomson',
		profile:
			'https://unsplash.com/@derekthomson?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash',
		photo:
			'https://unsplash.com/photos/body-of-water-near-trees-and-mountain-cliff-during-daytime-TWoL-QCZubY?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash'
	}
];

let credit = $derived(credits[local.theme - 1]);
</script>

<div class="mt-20 text-center">
	Photo by
	<a href={credit.profile} target="_blank">{credit.photographer}</a>
	on
	<a href={credit.photo} target="_blank">Unsplash</a>
</div>

<style lang="postcss">
a {
	@apply hover:underline;
}
</style>
