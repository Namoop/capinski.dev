<script lang="ts">
	import Signature from "$lib/Signature.svelte";
	import ToggleDark from "$lib/ToggleDark.svelte";
	import Icon from '$lib/Icon.svelte';

	// import projects from pagedata
	import type {PageData} from "./$types";
	import TextEditor from "$lib/TextEditor.svelte";

	let {data}: { data: PageData } = $props();
	const {projects, dark: _dark} = data;
	const dark = $state(_dark);

	const info = [
		{text: "Theodore Capinski", detail: "he/him",},
		{text: "Dev Experience", detail: "full-stack",},
		{text: "Spoken Languages", detail: "eng, spa",},
		{text: "Favorite Color", detail: "forest green",},
		{text: "Current Occupation", detail: "student",},
		{text: "Sleep Schedule", detail: "student",},
	]
</script>

<div class="transition-colors duration-300 dark:bg-stone-900 {dark.dark_mode ? 'dark' : ''}">
	<div class="content">
		<main class="flex w-full flex-col items-center gap-5 p-5 dark:text-white">
			<ToggleDark dark={dark}/>

			<img src="logo.svg" alt="logo" class="w-20"/>

			<h1>capinski.dev</h1>
			<p>
				<!--	TODO: Make this editable (if authed) with a quill.js editor		-->
				<!--	TODO: fix favicon: make brim larger	-->

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
				and/or figuring out how rust works.
				I'm always looking for new projects to
				<span class="line-through">procrastinate quantum mechanics problem sets</span>
				explore.

				<br><br>&emsp;
				Questions?
				<span class="italic">why?</span>
				Regardless, I can be reached at the social icons below!
				Response time is between now and the end of the universe.
			</p>


			<details class="grid grid-cols-2 gap-3 sm:grid-cols-1 sm:gap-5" open>
				<summary class="header">Info</summary>
				{#each info as a}
					<p class="grid grid-cols-1 items-center text-center sm:grid-cols-2">
						<span class="p-0.5" style="padding-bottom: 0.2rem"> {a.text} </span>
						<span><span class="rounded bg-gray-200 p-1 font-mono pb-0.5 dark:bg-gray-600"> {a.detail} </span></span>
					</p>
				{/each}
			</details>

			<br>

			<div class="flex gap-8 justify-content">
				<a class="text-6xl link" href="https://mathstodon.xyz/@capinski" rel="me"> <Icon icon="mastodon"/> </a>
				<a class="text-6xl link" href={`mailto:theo@capinski.dev`}> <Icon icon="mail"/>  </a>
				<a class="text-6xl link" href="https://www.github.com/Namoop"> <Icon icon="github"/> </a>
			</div>

			<details class="flex w-full flex-col gap-2 [--w-date:1] [--w-name:2] [--w-link:4]" open>
				<summary class="header">Projects</summary>
				<div class="flex flex-row items-center gap-8 border-y border-dotted border-black py-1 text-center dark:border-white">
					<div class="w-full font-bold flex-[--w-date]"> Date</div>
					<div class="w-full font-bold flex-[--w-name]"> Name</div>
					<div class="w-full font-bold flex-[--w-link]"> Link</div>
				</div>
				{#each projects as project (project.id)}
					<div class="flex flex-row items-center gap-5 border-b border-dotted border-black pb-1 text-center dark:border-white">
						<div class="w-full flex-[--w-date] [word-spacing:100vw] sm:[word-spacing:unset]"> {project.built} </div>
						<div class="w-full flex-[--w-name]"> {project.name} </div>
						<div class="w-full flex-[--w-link]"><a class="link" href={project.link}>{project.preview}</a>
						</div>
					</div>
				{/each}
			</details>

			<div class="p-3"></div>
			<Signature scale={0.2}/>
		</main>
	</div>
</div>

<style>
</style>
