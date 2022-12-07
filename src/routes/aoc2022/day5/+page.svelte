<script lang="ts">
	export let data: { input: string; };
	const copy = () => navigator.clipboard.writeText(String(result));

	const input = data.input.split("\n\n");

	const tabledata = input[0].split("\n").reverse();
	const stacks: string[][] = [];
	for (let w = 1; w < tabledata.length; w++) {
		for (let i = 0; i < tabledata[0].length + 1; i += 4) {
			stacks[i / 4] ?? (stacks[i / 4] = []);
			if (tabledata[w][i + 1] == " " || tabledata[w][i+1] == null) continue;
			stacks[i / 4].push(tabledata[w][i + 1]);
		}
	}

	const commands = input[1]
		.split("\n")
		.map((a) =>
			[...a.matchAll(/move (\d+) from (\d+) to (\d+)/g)][0]
				.slice(1)
				.map((b) => +b)
		);

	for (let command of commands) {
		// for (let p = 0; p < command[0]; p++) //used for result 1
		// 	stacks[command[2]-1].push(stacks[command[1]-1].pop())
		stacks[command[2]-1].push(...stacks[command[1]-1].splice(-command[0])) //result 2
	}

	const tops = stacks.reduce((p,c)=>p+c.at(-1),"")

	const result = tops;

	const code = `export let data: { input: string; };
const copy = () => navigator.clipboard.writeText(String(result));

const input = data.input.split("\\n\\n");

const tabledata = input[0].split("\\n").reverse();
const stacks: string[][] = [];
for (let w = 1; w < tabledata.length; w++) {
\tfor (let i = 0; i < tabledata[0].length + 1; i += 4) {
\t\tstacks[i / 4] ?? (stacks[i / 4] = []);
\t\tif (tabledata[w][i + 1] == " " || tabledata[w][i+1] == null) continue;
\t\tstacks[i / 4].push(tabledata[w][i + 1]);
\t}
}

const commands = input[1]
\t.split("\\n")
\t.map((a) =>
\t\t[...a.matchAll(/move (\\d+) from (\\d+) to (\\d+)/g)][0]
\t\t\t.slice(1)
\t\t\t.map((b) => +b)
\t);

for (let command of commands) {
\t// for (let p = 0; p < command[0]; p++) //used for result 1
\t// \tstacks[command[2]-1].push(stacks[command[1]-1].pop())
\tstacks[command[2]-1].push(...stacks[command[1]-1].splice(-command[0])) //result 2
}

const tops = stacks.reduce((p,c)=>p+c.at(-1),"")

const result = tops;`.replaceAll("\n", "<br>").replaceAll("\t", "&nbsp&nbsp");
</script>

<!-- prettier-ignore -->
<structure lang="pug">
	h2 Day 5
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
