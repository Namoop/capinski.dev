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

		document.body.parentElement!.classList.toggle('dark', dark.dark_mode);
	});

	function toggleColorScheme() {
		dark.dark_mode = !dark.dark_mode;
		document.body.parentElement!.classList.toggle('dark', dark.dark_mode);
		document.cookie = `dark_mode=${dark.dark_mode}; path=/; max-age=31536000; samesite=strict`;
	}
</script>

<darkbutton class="dark_mode_gradient fixed size-40 -top-16 -right-16 rounded-full flex z-50"
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