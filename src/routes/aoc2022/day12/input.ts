import inputString from "./input.txt?raw";
import { writable, derived } from "svelte/store";

const splitmap = inputString
	.replace("S", "#")
	.split("\n")
	.map((a) => a.split(""));
export const heightmap = writable(splitmap);
export const visualmap = derived(heightmap, ($heightmap) =>
	$heightmap
		.map((h) => h.join(""))
		.join("")
		// .split("")
		// .map((a) =>
		// 	a == "-"
		// 		? `<span style="background: rgb(38 38 220)">${a}</span>`
		// 		: a == a.toUpperCase()
		// 		? `<span style="background: rgb(220 38 38)">${a}</span>`
		// 		: a
		// )
		// .join("")
);

const mapwidth = splitmap[0].length;
const startPos = inputString.replaceAll("\n", "").indexOf("S");
export const startCoord = {
	x: startPos % mapwidth,
	y: Math.floor(startPos / mapwidth),
};
const endPos = inputString.replaceAll("\n", "").indexOf("E");
export const endCoord = {
	x: endPos % mapwidth,
	y: Math.floor(endPos / mapwidth),
};
