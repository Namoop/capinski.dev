<script lang="ts">
	export let data: { input: string };
	const copy = () => navigator.clipboard.writeText(String(result));

	const input = data.input
		.split("\n")
		.map((a) => a.split(",").map((a) => a.split("-").map((a) => +a)));
	console.log(input[5]);

	const contained = input.map((a) => {
		const firstLowerLimit = a[0][0];
		const firstUpperLimit = a[0][1];
		const secondLowerLimit = a[1][0];
		const secondUpperLimit = a[1][1];

		return (
			(firstLowerLimit >= secondLowerLimit &&
				firstUpperLimit <= secondUpperLimit) ||
			(secondLowerLimit >= firstLowerLimit &&
				secondUpperLimit <= firstUpperLimit)
		);
	});
	const limitCompare = contained.reduce((v, c) => c + v, 0); //result 1

	const anyOverlap = input.map((a) => {
		const firstLowerLimit = a[0][0];
		const firstUpperLimit = a[0][1];
		const secondLowerLimit = a[1][0];
		const secondUpperLimit = a[1][1];

		return (
			(firstLowerLimit >= secondLowerLimit &&
				firstLowerLimit <= secondUpperLimit) ||
			(firstUpperLimit >= secondLowerLimit &&
				firstUpperLimit <= secondUpperLimit) ||
			(secondLowerLimit >= firstLowerLimit &&
				secondLowerLimit <= firstUpperLimit) ||
			(secondUpperLimit >= firstLowerLimit &&
				secondUpperLimit <= firstUpperLimit)
		);
	});
	const overlapCompare = anyOverlap.reduce((v, c) => c + v, 0); //result 2

	const result = overlapCompare;

	const code = `export let data: { input: string };
const copy = () => navigator.clipboard.writeText(String(result));

const input = data.input
\t.split("\\n")
\t.map((a) => a.split(",").map((a) => a.split("-").map((a) => +a)));
console.log(input[5]);

const contained = input.map((a) => {
\tconst firstLowerLimit = a[0][0];
\tconst firstUpperLimit = a[0][1];
\tconst secondLowerLimit = a[1][0];
\tconst secondUpperLimit = a[1][1];

\treturn (
\t\t(firstLowerLimit >= secondLowerLimit &&
\t\t\tfirstUpperLimit <= secondUpperLimit) ||
\t\t(secondLowerLimit >= firstLowerLimit &&
\t\t\tsecondUpperLimit <= firstUpperLimit)
\t);
});
const limitCompare = contained.reduce((v, c) => c + v, 0); //result 1

const anyOverlap = input.map((a) => {
\tconst firstLowerLimit = a[0][0];
\tconst firstUpperLimit = a[0][1];
\tconst secondLowerLimit = a[1][0];
\tconst secondUpperLimit = a[1][1];

\treturn (
\t\t(firstLowerLimit >= secondLowerLimit &&
\t\t\tfirstLowerLimit <= secondUpperLimit) ||
\t\t(firstUpperLimit >= secondLowerLimit &&
\t\t\tfirstUpperLimit <= secondUpperLimit) ||
\t\t(secondLowerLimit >= firstLowerLimit &&
\t\t\tsecondLowerLimit <= firstUpperLimit) ||
\t\t(secondUpperLimit >= firstLowerLimit &&
\t\t\tsecondUpperLimit <= firstUpperLimit)
\t);
});
const overlapCompare = anyOverlap.reduce((v, c) => c + v, 0); //result 2

const result = overlapCompare;`
		.replaceAll("\n", "<br>")
		.replaceAll("\t", "&nbsp&nbsp");
</script>

<!-- prettier-ignore -->
<structure lang="pug">
	h2 Day 4
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
