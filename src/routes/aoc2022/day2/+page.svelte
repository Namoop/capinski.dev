<script lang="ts">
	export let data: { input: string };
	const copy = () => navigator.clipboard.writeText(String(result))

	const input = data.input.split("\n");
	// const permutations = {
	// 	"A X": 4,
	// 	"B X": 1,
	// 	"C X": 7,
	// 	"A Y": 8,
	// 	"B Y": 5,
	// 	"C Y": 2,
	// 	"A Z": 3,
	// 	"B Z": 9,
	// 	"C Z": 6,
	// } // used for result 1
	const permutations = {
		"A X": 3,
		"B X": 1,
		"C X": 2,
		"A Y": 4,
		"B Y": 5,
		"C Y": 6,
		"A Z": 8,
		"B Z": 9,
		"C Z": 7,
	} // used for result 2
	const scores = input.map(a => permutations[a])
	const totalScore = scores.reduce((c, v) => c + v, 0)
	const result = totalScore;

	const code = `export let data: { input: string };
const copy = () => navigator.clipboard.writeText(String(result))

const input = data.input.split("\\n");
// const permutations = {
// \t"A X": 4,
// \t"B X": 1,
// \t"C X": 7,
// \t"A Y": 8,
// \t"B Y": 5,
// \t"C Y": 2,
// \t"A Z": 3,
// \t"B Z": 9,
// \t"C Z": 6,
// } // used for result 1
const permutations = {
\t"A X": 3,
\t"B X": 1,
\t"C X": 2,
\t"A Y": 4,
\t"B Y": 5,
\t"C Y": 6,
\t"A Z": 8,
\t"B Z": 9,
\t"C Z": 7,
} // used for result 2
const scores = input.map(a => permutations[a])
\tconst totalScore = scores.reduce((c, v) => c + v, 0)
\tconst result = totalScore;`.replaceAll("\n", "<br>").replaceAll("\t", "&nbsp&nbsp")
</script>

<structure lang="pug">
	h2 Day 2
	h3 Inputted Data
	| {JSON.stringify(scores, "", " ").substring(0, 500)}...
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