<script lang="ts">
	import Mail from '~icons/uiw/mail-o'
	import Mastodon from '~icons/fa-brands/mastodon'
	import Github from '~icons/fa-brands/github'
	import Lightbulb from '~icons/fa6-solid/lightbulb'
	import RegLightbulb from '~icons/fa6-regular/lightbulb'

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
{:else}
	<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
	</svg>
{/if}