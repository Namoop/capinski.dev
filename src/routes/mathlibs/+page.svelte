<script lang="ts">

	let templates: string;
	let names: string;

	let generated: string[] = [];
	const print = () => {
		generated = [];

		let shuffled = shuffleNames();

		for (let i of templates.split("\n\n") as string[]) {
			while (i.indexOf("$$") > -1) {
				const str = i.match(/\$\$\d/)?.[0] as unknown as string;
				i = i.replaceAll(str, shuffled.shift());
				if (shuffled.length == 0) shuffled = shuffleNames();
			}
			generated.push(i);
		}

		setTimeout(() => {
			window.print();
		}, 0);
	};

	const shuffleNames = () => {
		const namesArr = names.split("\n");
		for (let i = namesArr.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * i);
			const k = namesArr[i];
			namesArr[i] = namesArr[j];
			namesArr[j] = k;
		}
		return JSON.parse(JSON.stringify(namesArr));
	};
</script>

<main>
	<button class="noprint" on:click={print}>Print</button>
	<div class="row noprint">
		<br>
		<div class="col1">
			<strong>Templates</strong>
			<br />
			Use names with "$$#" like $$1 or $$2. These variables can be used in a question to refer to the same term multiple times.
		</div>
		<div class="col2">
			<strong>Names</strong>
			<br />
			All terms used at least one, then terms repeat the same way.
		</div>
	</div>
	<div class="row noprint">
		<div class="col col1">
			<textarea bind:value={templates} />
		</div>
		<div class="col col2">
			<textarea bind:value={names} />
		</div>
	</div>

	<div id="print_target">
		{#each generated as gen}
			<div class="item">
				{gen}
			</div>
		{/each}
	</div>
</main>

<style>
	#print_target {
		margin: auto;
		font-size: larger;
		color: black;
		font-family: Arial, Helvetica, sans-serif;
		display: none;
	}
	.item {
		border-bottom: 1px black dotted;
		padding: 35px;
	}
	.row {
		flex-direction: row;
		display: flex;
		gap: 10px;
		width: 75vw;
	}
	textarea {
		width: 100%;
		height: 100%;
		resize: none;
		padding: 5px;
	}
	.col {
		min-width: 200px;
		min-height: 500px;
	}
	.col1 {
		flex: 2;
	}
	.col2 {
		flex: 1;
	}
	@media print {
		.noprint {
			display: none;
		}
		#print_target {
			display: block;
		}
	}
</style>
