<script lang="ts">
	import Mail from '~icons/uiw/mail-o'
	import Mastodon from '~icons/fa-brands/mastodon'
	import Github from '~icons/fa-brands/github'
	import Lightbulb from '~icons/fa6-solid/lightbulb'
	import RegLightbulb from '~icons/fa6-regular/lightbulb'
	import Save from '~icons/material-symbols-light/save-rounded'

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
{/if}