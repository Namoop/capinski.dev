<script lang="ts">
	import Icon from '$lib/Icon.svelte';
	import {onMount} from "svelte";

	let { dark }: { dark: {dark_mode: boolean, last_preference: boolean}} = $props();

	onMount(() => {
		let preference = window.matchMedia('(prefers-color-scheme: dark)').matches;
		if (preference !== dark.last_preference) {
			dark.last_preference = preference
			document.cookie = `last_preference=${preference}; path=/; max-age=31536000; samesite=strict`;
			dark.dark_mode = preference
			document.cookie = `dark_mode=${preference}; path=/; max-age=31536000; samesite=strict`;
		}

		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
			dark.last_preference = event.matches
			document.cookie = `last_preference=${event.matches}; path=/; max-age=31536000; samesite=strict`;
			dark.dark_mode = !event.matches;
			toggleColorScheme()
		});
	});

	function toggleColorScheme() {
		dark.dark_mode = !dark.dark_mode;
		document.cookie = `dark_mode=${dark.dark_mode}; path=/; max-age=31536000; samesite=strict`;
	}
</script>

<darkbutton class="dark_mode_gradient fixed size-40 -top-16 -right-16 rounded-full flex"
	  style="background: radial-gradient(circle at center, var(--gradient-full), 80%, var(--gradient-gone))">
	<button hidden id="toggleDarkMode" onclick={toggleColorScheme} aria-labelledby="toggleLabel">
	</button>
	<label id="toggleLabel" for="toggleDarkMode" class="block text-3xl m-auto relative -bottom-5 -left-5">
		{#if dark.dark_mode}
			<Icon icon="lightbulb" />
		{:else}
			<Icon icon="reg_lightbulb" />
		{/if}
		<span class="sr-only">Toggle Dark Mode</span>
	</label>
</darkbutton>

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
	darkbutton {
		transition: --gradient-full 0.25s, --gradient-gone 0.25s;
	}

	:global(.dark .dark_mode_gradient) {
		--gradient-full: #1c1917;
		--gradient-gone: #1c191700;
	}
</style>