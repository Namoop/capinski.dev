<script lang="ts">
	import GoMarkGithub from "svelte-icons/go/GoMarkGithub.svelte";
	import GoMail from "svelte-icons/go/GoMail.svelte";
	import FaMastodon from "svelte-icons/fa/FaMastodon.svelte";
	import Signature from "$lib/Signature.svelte";
	import ToggleDark from "$lib/ToggleDark.svelte";

	// import projects from pagedata
	import type { PageData } from "./$types";

	let { data }: { data: PageData } = $props();
	const { projects } = data;

	const info = [
		{ text: "Theodore Capinski", detail: "he/him", },
		{ text: "Dev Experience", detail: "full-stack", },
		{ text: "Spoken Languages", detail: "eng, spa", },
		{ text: "Favorite Color", detail: "forest green", },
		{ text: "Current Occupation", detail: "student", },
		{ text: "Sleep Schedule", detail: "student", },
	]
</script>

<main class="flex w-full flex-col items-center gap-5 p-5 dark:text-white">
	<ToggleDark />

	<img src="logo.svg" alt="logo" class="w-20" />

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
		quickly&mdash;for my attention span smaller than a lobotomized goldfish's, that's a big plus.
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

	<h3>Info</h3>
	<div class="grid grid-cols-2 gap-3 sm:grid-cols-1 sm:gap-5">
		{#each info as a}
			<p class="grid grid-cols-1 items-center text-center sm:grid-cols-2">
				<span class="p-0.5" style="padding-bottom: 0.2rem"> {a.text} </span>
				<span><span class="rounded bg-gray-200 p-1 font-mono pb-0.5 dark:bg-gray-600"> {a.detail} </span></span>
			</p>
		{/each}
	</div>

	<br>

	<div class="flex gap-8 justify-content">
		<a class="w-16 link" href="https://mathstodon.xyz/@capinski" rel="me"> <FaMastodon /> </a>
		<a class="w-16 link" href={`mailto:theo@capinski.dev`}> <GoMail /> </a>
		<a class="w-16 link" href="https://www.github.com/Namoop"> <GoMarkGithub /> </a>
	</div>


	<h3>Projects</h3>
	<div class="flex w-full flex-col gap-2">
		<div class="flex flex-row items-center gap-8 border-y border-dotted border-black py-1 text-center dark:border-white">
			<div class="w-full font-bold" style="flex: 1">
				Date
			</div>
			<div class="w-full font-bold" style="flex: 2">
				Name
			</div>
			<div class="w-full font-bold" style="flex: 4">
				Link
			</div>
		</div>
		{#each projects as project}
			<div class="flex flex-row items-center gap-5 border-b border-dotted border-black pb-1 text-center dark:border-white">
				<div class="w-full" style="flex: 1">
					{project.built}
				</div>
				<div class="w-full" style="flex: 2">
					{project.name}
				</div>
				<div class="w-full flex-grow" style="flex: 4">
					<a class="link" href={project.link}>{project.preview ?? project.link.match(/https:\/\/(.*)\//)?.[1]}</a>
				</div>
			</div>
		{/each}
	</div>

	<div class="p-3"></div>
	<Signature scale={0.2} />
</main>

<style>
</style>
