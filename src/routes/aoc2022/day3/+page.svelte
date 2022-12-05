<script lang="ts">
	export let data: { input: string };
	const copy = () => navigator.clipboard.writeText(String(result));

	const input = data.input.split("\n");
	const nonUnique = input
		.map(a => [a.substring(0, a.length / 2), a.substring(a.length / 2)])
		.map(a =>
			[...new Set(a[0])]
				.concat([...new Set(a[1])])
				.filter((e, index, arr) => arr.indexOf(e) !== index)
				.join("")
		)
	const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
	const priorities = nonUnique.map(a => alphabet.indexOf(a) + 1)
	const total_priority = priorities.reduce((v, c) => v + c) // result 1

	let groups = [];
	for (let i = 0; i < input.length; i += 3)
		groups.push([input[i], input[i + 1], input[i + 2]])
	const group_badges = groups
		// .map(a => a.join(""))
		.map(a =>
			[...new Set(a[0])]
				.concat([...new Set(a[1])])
				.concat([...new Set(a[2])])
				.filter((e, index, arr) => arr.indexOf(e) !== index && arr.lastIndexOf(e) !== index)
				.join("")
		)
	const badge_priorities = group_badges.map(a => alphabet.indexOf(a) + 1)
	const total_badge_priority = badge_priorities.reduce((v, c) => v + c); //result 2

	const result = total_badge_priority;

	const code = `export let data: { input: string };
const copy = () => navigator.clipboard.writeText(String(result));

const input = data.input.split("\\n");
const nonUnique = input
\t.map(a => [a.substring(0, a.length / 2), a.substring(a.length / 2)])
\t.map(a =>
\t\t[...new Set(a[0])]
\t\t\t.concat([...new Set(a[1])])
\t\t\t.filter((e, index, arr) => arr.indexOf(e) !== index)
\t\t\t.join("")
\t)
const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
const priorities = nonUnique.map(a => alphabet.indexOf(a) + 1)
const total_priority = priorities.reduce((v, c) => v + c) // result 1

let groups = [];
for (let i = 0; i < input.length; i += 3)
\tgroups.push([input[i], input[i + 1], input[i + 2]])
const group_badges = groups
\t// .map(a => a.join(""))
\t.map(a =>
\t\t[...new Set(a[0])]
\t\t\t.concat([...new Set(a[1])])
\t\t\t.concat([...new Set(a[2])])
\t\t\t.filter((e, index, arr) => arr.indexOf(e) !== index && arr.lastIndexOf(e) !== index)
\t\t\t.join("")
\t)
const badge_priorities = group_badges.map(a => alphabet.indexOf(a) + 1)
const total_badge_priority = badge_priorities.reduce((v, c) => v + c); //result 2

\tconst result = total_badge_priority;`.replaceAll("\n", "<br>").replaceAll("\t", "&nbsp&nbsp")
</script>

<structure lang="pug">
	h2 Day 3
	h3 Inputted Data
	p.w-full
		| {JSON.stringify(input, "", " ").substring(0, 500)}...
	h3 Code
	code {@html code}
	h3 Result
	| {JSON.stringify(result, "", " ")}
	button(on:click="{copy}" class="button") &emsp Copy &emsp
</structure>

<style>
	p {
		overflow-wrap: break-word;
	}
</style>