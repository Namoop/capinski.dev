<script lang="ts">
	import SvelteTable from "$lib/SvelteTable.svelte";
	import GoMarkGithub from "svelte-icons/go/GoMarkGithub.svelte";
	import GoMail from "svelte-icons/go/GoMail.svelte";
	import FaMastodon from "svelte-icons/fa/FaMastodon.svelte";
	import Signature from "$lib/Signature.svelte";

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
		{
			date: "Dec 2022",
			name: "Advent of Code 2022 Puzzles",
			link: "https://www.capinski.dev/aoc2022",
		},
		{
			date: "Jan 2023",
			name: "Mathlibs (wip)",
			link: "https://www.capinski.dev/mathlibs"
		}
	].sort((a, b) => new Date("1 " + b.date) - new Date("1 " + a.date));
	const display = {
		link: (v) =>
			`<a class="link" href="${v.link}">${v.link.substring(8, 38)}</a>`,
	};
	const info = [
		{
			text: "Theodore Capinski",
			detail: "he/him",
		},
		{
			text: "Web Developer",
			detail: "full-stack",
		},
		{
			text: "Current employer",
			detail: "your mom",
		},
		{
			text: "Favorite color",
			detail: "green",
		}
	]
</script>

<main class="flex flex-col items-center gap-5 p-5 w-full">
	<img src="/logo.svg" alt="logo" class="w-20" />

	<h1>capinski.dev</h1>
	<p>
		&emsp;
		Hi, I'm a UC Berkeley student studying math, physics, and history.
		I'm also a web developer, and I like to make games and tools in my free time.
		I started programming as a wee lad on Scratch, and I've been hooked ever since.

		<br><br>&emsp;
		Other than websites, I've worked with C++, Java/Kotlin, and Python, but
		<a href="https://svelte.dev" class="link">Svelte</a>
		is always the easiest to get ideas up and running
		quickly&mdash;for the attention span of a goldfish, that's a big plus.
		I'm currently working on polishing some of my older stuff
		and/or figuring out how blogging works.
		I'm always looking for new projects to
		<span class="line-through">procrastinate quantum mechanics problem sets</span>
		explore.

		<br><br>&emsp;
		Questions?
		<span class="italic">why?</span>
		Regardless, I can be reached at the social icons below!
		Response time is between now and the end of the universe.
	</p>

	<Signature scale={0.2} />

	<h3>Info</h3>
	<div class="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-5">
		{#each info as a}
			<p class="grid grid-cols-1 sm:grid-cols-2 items-center text-center">
				<span class="p-0.5">{a.text}</span>
				<span>
					<span class="font-mono bg-gray-200 p-0.5 rounded pt-1">{a.detail}</span>
				</span>
			</p>
		{/each}
	</div>

	<br>

	<div class="flex justify-content gap-8">
		<a class="w-16 link" href="https://mathstodon.xyz/@capinski" rel="me">
			<FaMastodon />
		</a>
		<a class="w-16 link" href={`mailto:theo@capinski.dev`}>
			<GoMail />
		</a>
		<a class="w-16 link" href="https://www.github.com/Namoop">
			<GoMarkGithub />
		</a>
	</div>


	<h3>Projects</h3>
	<SvelteTable data={project_data} display={display} />
</main>

<style>
</style>
