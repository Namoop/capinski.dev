<script lang="ts">
	import SvelteTable from "svelte-table";
	import type {SvelteComponent} from "svelte";

	export let data: Record<string, unknown>;
	export let keys: string[] = Object.keys(data[0]);
	export let display: {
		[index: string]: {
			renderValue: (v: string) => string;
			renderComponent: SvelteComponent | {
				component: SvelteComponent;
				props: {
					[index: string]: any;
				};
			};

		}
	}

	const columns = keys.map(key => {
		const title = key.split("")
		title[0] = title[0].toUpperCase()
		return {
			title: title.join(""),
			renderComponent: display?.[key]?.renderComponent,
			renderValue: display?.[key]?.renderValue,
			value: v => v[key]
		}
	})
</script>

<SvelteTable rows="{data}" columns="{columns}" classNameTable="text-center"/>