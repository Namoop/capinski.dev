<script lang="ts">
	import SvelteTable from "svelte-table";

	export let data: Record<string, unknown>;
	export let keys: string[] = Object.keys(data[0]);
	export let display: {
		[index: string]: (v: string) => string;
	};

	const columns = keys.map((key) => {
		const title = key.split("");
		title[0] = title[0].toUpperCase();
		return {
			title: title.join(""),
			renderValue: display?.[key],
			value: (v) => v[key],
		};
	});
</script>

<div class="max-w-full">
	<SvelteTable rows={data} {columns} classNameTable="text-center" />
</div>
