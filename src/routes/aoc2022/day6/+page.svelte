<script lang="ts">
	export let data: { input: string };
	const copy = () => navigator.clipboard.writeText(String(result));

	const input = data.input;

	const WINDOW_SIZE = 14; // 4 used for result 1, 14 used for result 2
	let i = 0;
	for (let window: string; new Set(window).size != WINDOW_SIZE; i++) {
		window = input.slice(i, i + WINDOW_SIZE);
		if (i > input.length) {
			throw new Error("Window has exceeded input length");
		}
	}

	const result = i + WINDOW_SIZE - 1;

	const code = `export let data: { input: string };
const copy = () => navigator.clipboard.writeText(String(result));

const input = data.input;

const WINDOW_SIZE = 14; // 4 used for result 1, 14 used for result 2
let i = 0;
for (let window: string; new Set(window).size != WINDOW_SIZE; i++) {
\twindow = input.slice(i, i + WINDOW_SIZE);
\tif (i > input.length) {
\t\tthrow new Error("Window has exceeded input length");
\t}
}

const result = i + WINDOW_SIZE - 1;`.replaceAll("\n", "<br>").replaceAll("\t", "&nbsp&nbsp");
</script>

<!-- prettier-ignore -->
<structure lang="pug">
	h2 Day 6
	h3 Inputted Data
	p.break-all {JSON.stringify(input).substring(0, 500)}...
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
