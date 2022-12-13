<script lang="ts">
	import { browser } from "$app/environment";
	import { input, raw, visualmap } from "./input";

	type Packet = (number | Packet)[];
	const arr = $input.map(
		(c) => c.split("\r\n").map((a) => JSON.parse(a)) as Packet
	);
	const mishmash = raw
		.split("\r\n")
		.filter((a) => a != "")
		.map((c) => JSON.parse(c))
		.concat([[[2]], [[6]]]);

	const isOrdered = (pair: Packet) => {
		let [left, right] = pair;
		if (typeof left == "number" && typeof right == "number")
			return right - left;
		if (typeof left == "number" && typeof right != "number") left = [left];
		if (typeof left != "number" && typeof right == "number")
			right = [right];
		[left, right] = [left as Packet, right as Packet]; //typescript yay
		let i = 0;
		for (; i < left.length; i++) {
			if (!right[i]) return -1;
			const res = isOrdered([left[i], right[i]]);
			if (res > 0) return 1;
			if (res < 0) return -1;
		}
		return right.length - left.length;
	};

	let inOrder = [0];
	if (browser) {
		console.clear();
		inOrder = arr.map((a) => isOrdered(a));
		console.log(inOrder.reduce((c, v, vi) => (v > 0 ? c + vi + 1 : c), 0));

		mishmash.sort((a, b) => isOrdered([b, a]));
		const dividers: number[] = []
		mishmash.forEach((v,i)=>{
			if ((v[0]?.[0] == 2 || v[0]?.[0] == 6) && v.length == 1 && v[0].length == 1) dividers.push(i+1)
		})
		console.log(dividers.reduce((c,v)=>c*v))
	}

	const result = 0;

	const code = `import { browser } from "$app/environment";
import { input, raw, visualmap } from "./input";

type Packet = (number | Packet)[];
const arr = $input.map(
	(c) => c.split("\r\n").map((a) => JSON.parse(a)) as Packet
);
const mishmash = raw
	.split("\r\n")
	.filter((a) => a != "")
	.map((c) => JSON.parse(c))
	.concat([[[2]], [[6]]]);

const isOrdered = (pair: Packet) => {
	let [left, right] = pair;
	if (typeof left == "number" && typeof right == "number")
		return right - left;
	if (typeof left == "number" && typeof right != "number") left = [left];
	if (typeof left != "number" && typeof right == "number")
		right = [right];
	[left, right] = [left as Packet, right as Packet]; //typescript yay
	let i = 0;
	for (; i < left.length; i++) {
		if (!right[i]) return -1;
		const res = isOrdered([left[i], right[i]]);
		if (res > 0) return 1;
		if (res < 0) return -1;
	}
	return right.length - left.length;
};

let inOrder = [0];
if (browser) {
	console.clear();
	inOrder = arr.map((a) => isOrdered(a));
	console.log(inOrder.reduce((c, v, vi) => (v > 0 ? c + vi + 1 : c), 0));

	mishmash.sort((a, b) => isOrdered([b, a]));
	const dividers: number[] = []
	mishmash.forEach((v,i)=>{
		if ((v[0]?.[0] == 2 || v[0]?.[0] == 6) && v.length == 1 && v[0].length == 1) dividers.push(i+1)
	})
	console.log(dividers.reduce((c,v)=>c*v))
}

const result = 0;`.replaceAll("\n", "<br>").replaceAll("\t", "&nbsp&nbsp");
</script>

<!-- prettier-ignore -->
<structure lang="pug">
	h2 Day 13
	h3 Inputted Data
	p.break-all {JSON.stringify(input).substring(0,500)}...
	h3 Code
	code {@html code}
	h3 Result
	p.font-mono {@html result}
</structure>
