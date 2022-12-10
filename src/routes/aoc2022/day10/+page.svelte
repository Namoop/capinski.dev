<script lang="ts">
	export let data: { input: string };
	const copy = () => navigator.clipboard.writeText(String(result));

	const input = data.input.split("\n").map((a) => a.split(" "));
	let x = 1;
	let cycle = 0;
	let sumOfStrengths = 0;
	const screen = ".".repeat(240).split("");
	for (let i = 0; i < input.length; i++) {
		const modifier = Math.floor(cycle / 40) * 40;
		if (cycle >= x + modifier - 1 && cycle <= x + modifier + 1)
			screen[cycle] = "#";
		cycle++;
		if (cycle >= x + modifier - 1 && cycle <= x + modifier + 1)
			screen[cycle] = "#";
		if ((cycle + 20) % 40 == 0) sumOfStrengths += x * cycle;
		if (!input[i][1]) continue;

		cycle++;
		if ((cycle + 20) % 40 == 0) sumOfStrengths += x * cycle;
		x += +input[i][1];
		if (cycle > 240) break; //just in case
	}
	sumOfStrengths // result 1

	const screenFormatted:string[] = []
	for (let i = 0; i < screen.length; i+=40)
		screenFormatted.push(screen.slice(i,i+40).join(""))

	const result = screenFormatted.join("<br>"); //result 2


	const code = `const input = data.input.split("\n").map((a) => a.split(" "));
let x = 1;
let cycle = 0;
let sumOfStrengths = 0;
const screen = ".".repeat(240).split("");
for (let i = 0; i < input.length; i++) {
	const modifier = Math.floor(cycle / 40) * 40;
	if (cycle >= x + modifier - 1 && cycle <= x + modifier + 1)
		screen[cycle] = "#";
	cycle++;
	if (cycle >= x + modifier - 1 && cycle <= x + modifier + 1)
		screen[cycle] = "#";
	if ((cycle + 20) % 40 == 0) sumOfStrengths += x * cycle;
	if (!input[i][1]) continue;

	cycle++;
	if ((cycle + 20) % 40 == 0) sumOfStrengths += x * cycle;
	x += +input[i][1];
	if (cycle > 240) break; //just in case
}
sumOfStrengths // result 1
screen.join(""); //result 2`.replaceAll("\n", "<br>").replaceAll("\t", "&nbsp&nbsp");	
</script>


<!-- prettier-ignore -->
<structure lang="pug">
	h2 Day 7
	h3 Inputted Data
	p.break-all {JSON.stringify(input).substring(0, 500)}...
	h3 Code
	code {@html code}
	h3 Result
	p.font-mono {@html result}
	br
	button(on:click="{copy}") Copy
</structure>