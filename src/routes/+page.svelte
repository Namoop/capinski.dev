<script lang="ts">
	import SvelteTable from "$lib/SvelteTable.svelte";
	import GoMarkGithub from 'svelte-icons/go/GoMarkGithub.svelte';
	import GoMail from 'svelte-icons/go/GoMail.svelte';

	const monthlyEmail = import.meta.env['VITE_EMAIL_' + (new Date).getMonth() + '_' + (new Date).getFullYear()];

	const project_data = [
		{
			date: "Nov 2022",
			name: "D&D Ship Combat",
			link: "https://dnd.capinski.dev/",
		},
		{
			date: "Oct 2022",
			name: "TST Notepad",
			link: "https://addons.mozilla.org/en-US/firefox/addon/tst-notepad/",
		},
		{
			date: "Dec 2019",
			name: "Platformer",
			link: "..."
		},
		{
			date: "Jan 2017",
			name: "Wizard vs Wizard",
			link: "https://scratch.mit.edu/projects/139062446/editor/",
		},
		{
			date: "Dec 2022",
			name: "capinski.dev",
			link: "https://capinski.dev"
		}
	].sort((a, b) =>
		new Date("1 " + b.date) - new Date("1 " + a.date)
	)
	const display = {
		"link": {
			renderValue: (v) =>
				`<a class="link" href="${v.link}">${v.link.length > 30 ? v.link.substring(0, 30) + "..." : v.link}</a>`
		}
	}
</script>

<structure lang="pug">
	br
	h1 capinski.dev
	h3 Info
	p Theodore Capinski
		span.detail (he/him)
	p Web developer
		span.detail (full-stack)
	p Currently employed at:
		span.detail your mom's house
	p Favorite color:
		span.detail green

	div.flex.justify-content.gap-8
		a(href="mailto:{monthlyEmail}")
			div.icon.link
				GoMail
		a(href="https://www.github.com/Namoop")
			div.icon.link
				GoMarkGithub
	h3 Projects
	SvelteTable(data="{project_data}" display="{display}")
</structure>

<style>
	.icon {
		@apply w-16;
	}

	.detail {
		@apply font-mono bg-gray-200 p-0.5 m-1 rounded;
	}
</style>