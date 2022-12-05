<script lang="ts">
	import SvelteTable from "$lib/SvelteTable.svelte";
	import GoMarkGithub from "svelte-icons/go/GoMarkGithub.svelte";
	import GoMail from "svelte-icons/go/GoMail.svelte";

	const monthlyEmail = import.meta.env[
		"VITE_EMAIL_" + new Date().getMonth() + "_" + new Date().getFullYear()
	];

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
			link: "...",
		},
		{
			date: "Jan 2017",
			name: "Wizard vs Wizard",
			link: "https://scratch.mit.edu/projects/139062446/editor/",
		},
		{
			date: "Dec 2022",
			name: "capinski.dev",
			link: "https://capinski.dev",
		},
	].sort((a, b) => new Date("1 " + b.date) - new Date("1 " + a.date));
	const display = {
		link: (v) =>
			`<a class="link" href="${v.link}">${
				v.link.length > 30 ? v.link.substring(0, 30) + "..." : v.link
			}</a>`,
	};
</script>

<!-- prettier-ignore -->
<structure lang="pug">
	br
	h1 capinski.dev
	h3 Info
	p Theodore Capinski
		span.visible(class="sm:collapse") {@html ""}
		span.detail (he/him)
	p Web developer
		br.visible(class="sm:invisible")
		span.detail (full-stack)
	p Currently employed at:
		br.visible(class="sm:invisible")
		span.detail your mom's house
	p Favorite color:
		br.visible(class="sm:invisible")
		span.detail green
	div.flex.justify-content.gap-8
		a.icon.link(href="mailto:{monthlyEmail}")
			GoMail
		a.icon.link(href="https://www.github.com/Namoop")
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
