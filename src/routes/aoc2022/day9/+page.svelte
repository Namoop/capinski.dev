<script lang="ts">
	import { browser } from "$app/environment";
	export let data: {
		correct: string;
		input: string;
	};
	const copy = () => navigator.clipboard.writeText(String(result));
	const sleep = async (ms: number) =>
		new Promise((resolve) => setTimeout(() => resolve(true), ms));

	data.input >= `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`;

	const input = data.input
		.split("\n")
		.map((a) => a.split(" "))
		.map((b) => [b[0], +b[1]]) as ["L" | "D" | "U" | "R", number][];

	//Use "1" for first result, "9" for second result
	const ROPE_SIZE = 9;
	let DELAY_IN_MS = 130;
	let code = ``;
	let result = 0;

	type Tail = {
		parent: Tail;
		x: number;
		y: number;
	};
	const tails: Tail[] = [];
	const visited = new Set<string>();
	tails.push({
		parent: null,
		x: 0,
		y: 0,
	} as unknown as Tail);
	for (let i = 0; i < ROPE_SIZE; i++)
		tails.push({
			parent: tails[i],
			x: tails[i].x,
			y: tails[i].x,
		});
	const head = tails.shift() as Tail;
	const end = tails.at(-1) as Tail;

	const run = async function () {
		const startRunTime = performance.now();
		for (const command of input.slice(0,24)) {
			const dir = command[0];
			for (let i = 0; i < command[1]; i++) {
				// move head
				head.y += dir == "D" ? 1 : dir == "U" ? -1 : 0;
				head.x += dir == "L" ? -1 : dir == "R" ? 1 : 0;

				// move tails if needed
				for (const tail of tails) {
					if (tail.parent.x - tail.x > 1) {
						tail.x++;
						tail.y = tail.parent.y;
					}
					if (tail.parent.x - tail.x < -1) {
						tail.x--;
						tail.y = tail.parent.y;
					}
					if (tail.parent.y - tail.y > 1) {
						tail.y++;
						tail.x = tail.parent.x;
					}
					if (tail.parent.y - tail.y < -1) {
						tail.y--;
						tail.x = tail.parent.x;
					}
				}

				//save the tail end to the visited squares list
				visited.add(end.x + "," + end.y);

				if (DELAY_IN_MS >= 0) await createVisualization(command);
			}
		}
		console.log(
			"Time to run: " + (performance.now() - startRunTime) / 1000 + "s"
		);
		result = visited.size;
		createVisualization();

		const correct = data.correct;
		console.log(visited);
		console.log(correct)
		console.log([...visited].filter(a=>!correct.includes(a)))
		console.log;
	};
	const createVisualization = async (command?: any) => {
		if (!browser) return;
		const matrix = Array(25)
			.fill("")
			.map((a) => Array(25).fill("."));
		matrix[12][12] = "h";
		for (const tail of tails)
			matrix[12 - head.y + tail.y][12 - head.x + tail.x] =
				tails.indexOf(tail) + 1;
		for (const k of visited) {
			const l = k.split(",").map((a) => +a);
			const [ky, kx] = [12 - head.y + l[1], 12 - head.x + l[0]];
			if (matrix[ky]?.[kx]) matrix[ky][kx] = "#";
		}
		matrix[12 - head.y + end.y][12 - head.x + end.x] = "t";
		code =
			Math.round(input.indexOf(command) / 20) +
			"%" +
			"<br>" +
			matrix.map((a) => a.join(".")).join("\n");
		await sleep(DELAY_IN_MS);
	};

	run();

	// code = ``.replaceAll("\n", "<br>").replaceAll("\t", "&nbsp&nbsp");
</script>

<!-- prettier-ignore -->
<structure lang="pug">
	h2 Day 7
	h3 Inputted Data
	p.break-all {JSON.stringify(input).substring(0, 500)}...
	h3 Code
	button(on:click!="{()=>DELAY_IN_MS-=50}") Get on with it!
	code {@html code}
	h3 Result
	| {JSON.stringify(result, undefined, " ")}
	br
	button(on:click="{copy}") Copy
</structure>

<style>
	/*  */
</style>
