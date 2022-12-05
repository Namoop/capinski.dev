<script lang="ts">
	export let data: { input: string };
	const copy = () => navigator.clipboard.writeText(String(result));

	const input = data.input.split("\n\n").map((a) => a.split("\n"));
	const cals = input.map((a) => a.reduce((v, c) => +c + v, 0));
	const cals_sorted = cals.sort((a, b) => b - a);
	const sum_of_highest = cals_sorted.splice(0, 3).reduce((v, c) => v + c);

	const result = sum_of_highest;

	const code = `export let data: { input: string };
const copy = () => navigator.clipboard.writeText(String(result))
const input = data.input.split("\\n\\n").map(a => a.split("\\n"));
const cals = input.map(a => a.reduce((v, c) => +c + v, 0));
const cals_sorted = cals.sort((a, b) => b - a);
const sum_of_highest = cals_sorted.splice(0, 3).reduce((v, c) => v + c);

const result = sum_of_highest;`
		.replaceAll("\n", "<br>")
		.replaceAll("\t", "&nbsp&nbsp");
</script>

<!-- prettier-ignore -->
<structure lang="pug">
	h2 Day 1
	h3 Inputted Data
	| {JSON.stringify(cals, "", " ").substring(0, 500)}...
	h3 Code
	code {@html code}
	h3 Result
	| {JSON.stringify(result, "", " ")}
	br
	button(on:click="{copy}") Copy
</structure>

<style>
	/*  */
</style>
