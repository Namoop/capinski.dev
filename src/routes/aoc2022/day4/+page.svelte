<script lang="ts">
	export let data: { input: string };
	const copy = () => navigator.clipboard.writeText(String(result));

	const input = data.input.split("\n");

	const result = input;
</script>

<structure lang="pug">
	h2 Day #
	h3 Inputted Data
	| {JSON.stringify(input).substring(0, 500)}...
	h3 Result
	| {JSON.stringify(result, "", " ")}
	br
	button(on:click="{copy}") Copy
</structure>

<style>
	/*  */
</style>