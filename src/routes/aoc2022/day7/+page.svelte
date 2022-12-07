<script lang="ts">
	export let data: { input: string };
	const copy = () => navigator.clipboard.writeText(String(result));

	const input = data.input.split("\n");

	const result = input;

	const code = ``.replaceAll("\n", "<br>").replaceAll("\t", "&nbsp&nbsp")
</script>

<!-- prettier-ignore -->
<structure lang="pug">
	h2 Day 7
	h3 Inputted Data
	| {JSON.stringify(input).substring(0, 500)}...
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