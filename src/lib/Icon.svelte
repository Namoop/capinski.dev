<script lang="ts">
	import Mail from '~icons/uiw/mail-o'
	import Mastodon from '~icons/fa6-brands/mastodon'
	import Github from '~icons/fa6-brands/github'
	import Lightbulb from '~icons/fa6-solid/lightbulb'
	import RegLightbulb from '~icons/fa6-regular/lightbulb'
	import Save from '~icons/material-symbols-light/save-rounded'
	import Bluesky from '~icons/fa-brands/bluesky'

	const { icon="" } = $props()
</script>

{#if icon === 'mail'}
	<Mail />
{:else if icon === 'mastodon'}
	<Mastodon />
{:else if icon === 'github'}
	<Github />
{:else if icon === 'lightbulb'}
	<Lightbulb />
{:else if icon === 'reg_lightbulb'}
	<RegLightbulb />
{:else if icon === 'save'}
	<Save />
{:else if icon === 'bluesky'}
	<Bluesky />
{:else}
<!---->
{/if}