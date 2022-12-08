<script lang="ts">
	export let data: { input: string; };
	const copy = () => navigator.clipboard.writeText(String(result));

	const input = data.input.split("\n").map((a) => a.split("").map((b) => +b));

	const visible: Set<string> = new Set();

	for (let i = 0; i < input.length; i++) {
		const row = input[i];
		let leftMax = -1,
			rightMax = -1,
			leftIndex = 0,
			rightIndex = row.length - 1;
		while (leftIndex <= rightIndex) {
			if (leftMax < rightMax) {
				if (row[leftIndex] > leftMax) {
					visible.add(i + "," + leftIndex);
					leftMax = row[leftIndex];
				}
				leftIndex++;
			} else {
				if (row[rightIndex] > rightMax) {
					visible.add(i + "," + rightIndex);
					rightMax = row[rightIndex];
				}
				rightIndex--;
			}
		}
	}

	for (let i = 0; i < input[0].length; i++) {
		const column = (v: number) => input[v][i];
		let topMax = -2,
			bottomMax = -1,
			topIndex = 0,
			bottomIndex = input.length - 1;
		while (topIndex <= bottomIndex) {
			if (topMax < bottomMax) {
				if (column(topIndex) > topMax) {
					visible.add(topIndex + "," + i);
					topMax = column(topIndex);
				}
				topIndex++;
			} else {
				if (column(bottomIndex) > bottomMax) {
					visible.add(bottomIndex + "," + i);
					bottomMax = column(bottomIndex);
				}
				bottomIndex--;
			}
		}
	}
	visible.size; //result 1

	//there is definitely a better way of doing this
	let highscore = 0;
	for (let i = 1; i < input.length - 1; i++) {
		const row = (v: number) => input[i][v];
		for (let n = 1; n < input[i].length - 1; n++) {
			const column = (v: number) => input[v]?.[n];
			const tree = row(n);
			let k,
				treescore = 1;
			//left
			for (k = 1; row(n - k) < tree; k++);
			row(n - k) ?? k--;
			treescore *= k;
			//right
			for (k = 1; row(n + k) < tree; k++);
			row(n + k) ?? k--;
			treescore *= k;
			//up
			for (k = 1; column(i - k) < tree; k++);
			column(i - k) ?? k--;
			treescore *= k;
			//down
			for (k = 1; column(i + k) < tree; k++);
			column(i + k) ?? k--;
			treescore *= k;

			highscore = Math.max(treescore, highscore);
		}
	}
	highscore; //result 2

	const result = highscore;

	const code = `export let data: { input: string; };
const copy = () => navigator.clipboard.writeText(String(result));

const input = data.input.split("\n").map((a) => a.split("").map((b) => +b));

const visible: Set<string> = new Set();

for (let i = 0; i < input.length; i++) {
	const row = input[i];
	let leftMax = -1,
		rightMax = -1,
		leftIndex = 0,
		rightIndex = row.length - 1;
	while (leftIndex <= rightIndex) {
		if (leftMax < rightMax) {
			if (row[leftIndex] > leftMax) {
				visible.add(i + "," + leftIndex);
				leftMax = row[leftIndex];
			}
			leftIndex++;
		} else {
			if (row[rightIndex] > rightMax) {
				visible.add(i + "," + rightIndex);
				rightMax = row[rightIndex];
			}
			rightIndex--;
		}
	}
}

for (let i = 0; i < input[0].length; i++) {
	const column = (v: number) => input[v][i];
	let topMax = -2,
		bottomMax = -1,
		topIndex = 0,
		bottomIndex = input.length - 1;
	while (topIndex <= bottomIndex) {
		if (topMax < bottomMax) {
			if (column(topIndex) > topMax) {
				visible.add(topIndex + "," + i);
				topMax = column(topIndex);
			}
			topIndex++;
		} else {
			if (column(bottomIndex) > bottomMax) {
				visible.add(bottomIndex + "," + i);
				bottomMax = column(bottomIndex);
			}
			bottomIndex--;
		}
	}
}
visible.size; //result 1

//there is definitely a better way of doing this
let highscore = 0;
for (let i = 1; i < input.length - 1; i++) {
	const row = (v: number) => input[i][v];
	for (let n = 1; n < input[i].length - 1; n++) {
		const column = (v: number) => input[v]?.[n];
		const tree = row(n);
		let k,
			treescore = 1;
		//left
		for (k = 1; row(n - k) < tree; k++);
		row(n - k) ?? k--;
		treescore *= k;
		//right
		for (k = 1; row(n + k) < tree; k++);
		row(n + k) ?? k--;
		treescore *= k;
		//up
		for (k = 1; column(i - k) < tree; k++);
		column(i - k) ?? k--;
		treescore *= k;
		//down
		for (k = 1; column(i + k) < tree; k++);
		column(i + k) ?? k--;
		treescore *= k;

		highscore = Math.max(treescore, highscore);
	}
}
highscore; //result 2

const result = highscore;`.replaceAll("\n", "<br>").replaceAll("\t", "&nbsp&nbsp");
</script>

<!-- prettier-ignore -->
<structure lang="pug">
	h2 Day 7
	h3 Inputted Data
	p.break-all {JSON.stringify(input).substring(0, 500)}...
	h3 Code
	code {@html code}
	h3 Result
	| {JSON.stringify(result, undefined, " ")}
	br
	button(on:click="{copy}") Copy
</structure>

<style>
	/*  */
</style>
