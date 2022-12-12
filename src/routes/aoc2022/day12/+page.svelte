<script lang="ts">
	import { browser } from "$app/environment";
	import { heightmap, startCoord, endCoord, visualmap } from "./input";

	const map = (x: number, y: number) => $heightmap[y][x];
	const toggleCase = (x: number, y: number) => {
		if (!map(x, y)) return;
		if (map(x, y) == map(x, y).toUpperCase())
			$heightmap[y][x] = "-"; //map(x, y).toLowerCase();
		else $heightmap[y][x] = map(x, y).toUpperCase();
	};
	const sleep = async (ms: number) =>
		new Promise((resolve) => setTimeout(() => resolve(true), ms));
	const alphabet = "zyxwvutsrqponmlkjihgfedcba";
	const getAlphaIndex = (lt: string) => {
		if (lt == "#") lt = "a";
		if (lt == "E") lt = "z";
		return alphabet.indexOf(lt);
	};

	//breadth-first search

	type Coordinate = typeof startCoord;
	type coordArr = Coordinate[];
	let previousSearches: coordArr[][] = [[[endCoord]]]; //startcoord for result1, endcoord for result2
	const visited: string[] = [];

	const pathfind = async function (coords: coordArr, depthLimit: number) {
		if (depthLimit < 0) {
			previousSearches.at(-1)?.push(coords);

			// await sleep(0); //use for visualizations
			return false;
		}
		const pos = coords.at(-1) as Coordinate;
		if (visited.includes(pos.x + "|" + pos.y)) return false; //throw new Error(pos.x + "|" + pos.y)
		visited.push(pos.x + "|" + pos.y);

		const height = map(pos.x, pos.y);
		coords.forEach((k) => toggleCase(k.x, k.y));
		// toggleCase(pos.x, pos.y);

		//find possible directions
		const adjacent: coordArr = [
			{ x: pos.x + 1, y: pos.y },
			{ x: pos.x, y: pos.y - 1 },
			{ x: pos.x - 1, y: pos.y },
			{ x: pos.x, y: pos.y + 1 },
		].filter((v) => {
			try {
				map(v.x, v.y);
			} catch (e) {
				return false;
			}
			return (
				getAlphaIndex(height) + 1 >= //USE -1 and "<=" for result 1 and +1 ">=" for result 2
				getAlphaIndex(map(v.x, v.y))
			); //if position is climbable
		});

		//search adjacent
		for (const potential of adjacent) {
			// for below condition use "E" for result 1 and "a" for result 2
			if (map(potential.x, potential.y) == "a") return true; //check for win
			if (await pathfind(coords.concat([potential]), depthLimit - 1))
				return true; //search adjacent of adjacent
		}

		// toggleCase(pos.x, pos.y);
		// coords.forEach(k=>toggleCase(k.x,k.y))
		return false;
	};

	let result = 0;
	let len = 0;
	const run = async () => {
		// debugger;
		for (len = 0; len < 1000 && !result; len++) {
			const runTimeStart = Date.now();
			console.log(`checking length ${len}`);
			previousSearches.push([]);
			for (const arr of previousSearches[len]) {
				//
				if (await pathfind(arr, 0)) {
					result = len + 1;
					break;
				}
			}
			const elapsedTime = Date.now() - runTimeStart;
			console.log("completed in: " + elapsedTime);
			// if (elapsedTime > 2000) break;
			await sleep(1);
		}
		console.log(len);
	};

	//NEW VERSION IDEA:
	//as looping through current possibilities
	//	check for answer
	//	add adjacent to array2
	//shift arr2 down (clear arr1)
</script>

<button on:click={() => run()}> click to run</button>
<code class="text-xs">
	{@html $visualmap}
</code>
{result}
{len > 1000 ? "Length exceeded 1000. Forcibly stopped." : `searching...`}
<br />
{visited}
