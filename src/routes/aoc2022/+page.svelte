<script lang="ts">
	const pages = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7", "Day 8", "Day 9", "Day 10", "Day 11", "Day 12"]
</script>

<!-- prettier-ignore -->
<structure lang="pug">
	p
		| Look through how I solved this year's &nbsp
		a.link(href="https://adventofcode.com" target="_blank") advent of code
		br
		br
		| Language: boring old slow Javascript.
		| Next year I promise I'll try out some new language.
	div.flex.flex-wrap.gap-4.justify-center.items-center
		+each("pages as page")
			a.p-4.border.flex.justify-center.items-center.transition-colors.duration-500.select-none.cursor-pointer(class="min-w-[80px] hover:bg-violet-200 hover:shadow-md active:scale-90" href="/aoc2022/{page.replaceAll(' ', '').toLowerCase()}") {page}
</structure>

<style>
	/*  */
</style>