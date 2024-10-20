<script lang="ts">
	import FaLightbulb from "svelte-icons/fa/FaLightbulb.svelte";
	import FaRegLightbulb from "svelte-icons/fa/FaRegLightbulb.svelte";
	import {onMount} from "svelte";

	let colorScheme = $state(false);

	onMount(() => {
		colorScheme = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
		if (colorScheme)
			document.body.classList.add("dark");

		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
			const newColorScheme = event.matches ? "dark" : "light";
			colorScheme = !event.matches;
			toggleColorScheme()
		});
	});

	function toggleColorScheme() {
		colorScheme = !colorScheme;
		if (colorScheme)
			document.body.classList.add("dark");
		else
			document.body.classList.remove("dark");
	}
</script>

<main class="dark_mode_gradient fixed size-40 -top-16 -right-16 rounded-full flex"
	  style="background: radial-gradient(circle at center, var(--gradient-full), 80%, var(--gradient-gone))">
	<button hidden id="toggleDarkMode" onclick={toggleColorScheme} aria-labelledby="toggleLabel">
	</button>
	<label id="toggleLabel" for="toggleDarkMode" class="block w-8 m-auto relative -bottom-5 -left-5">
		{#if colorScheme}
			<FaLightbulb />
		{/if}
		{#if !colorScheme}
			<FaRegLightbulb />
		{/if}
		<span class="sr-only">Toggle Dark Mode</span>
	</label>
</main>

<style>
	@property --gradient-full {
		syntax: '<color>';
		initial-value: #ffffff;
		inherits: false;
	}
	@property --gradient-gone {
		syntax: '<color>';
		initial-value: #ffffff00;
		inherits: false;
	}
	main {
		transition: --gradient-full 0.2s, --gradient-gone 0.2s;
	}

	:global(.dark .dark_mode_gradient) {
		--gradient-full: #1c1917;
		--gradient-gone: #1c191700;
	}
</style>