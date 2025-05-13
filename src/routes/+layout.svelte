<script lang="ts">
    import "../app.css";
    import ToggleDark from "$lib/ToggleDark.svelte";
    import {onMount} from "svelte";
    import type {PageData} from "../../.svelte-kit/types/src/routes/$types";
    import { page } from '$app/state';

    let nav_select = $derived({
        "about": -1,
        "": 0,
        "blog": 1,
    }[page.url.pathname.split("/")[1]] ?? 0)

    let container: HTMLElement;
    onMount(() => {
        setTimeout(() => {
            document.body.parentElement!.classList.add('duration-300');
            container.classList.remove('dark:bg-stone-900');
            container.classList.remove('dark');
            // This is so silly
            // Basically: I want dark mode to be applied server side
            // via cookies to prevent a flash of white. I need the HTML
            // to have the `dark` class, but I can't access that on the
            // server. Essentially, this is a hack that loads the main
            // content div with the dark class to prevent a flash, but
            // removes it after page load to prevent color overlap.

            // Add classes to navbar
            const navbar = document.getElementById("navbar")!;
            navbar.classList.add("dark:bg-stone-900");
            navbar.classList.add("bg-white");
        }, 500)
    })

    let {data, children}: { data: PageData, children: any } = $props();
    const {dark: _dark, auth} = data;
    const dark = $state(_dark ?? {dark_mode: false, last_preference: false});
</script>

<title>Capinski.dev</title>
<div bind:this={container} class="transition-colors {_dark?.dark_mode ? 'dark dark:bg-stone-900' : ''}">
    <div class="content">
        <main class="flex w-full flex-col items-center gap-5 p-5 dark:text-white">
            <!--	TODO: fix favicon: make brim larger or increase contrast	-->
            <!--	TODO: fix links from text editor by adding referrer and class link	-->
            <!--	TODO: fix margin on unsaved changes icon	-->

            <ToggleDark dark={dark}/>

            <img src="/logo.svg" alt="logo" class="h-[7.5rem] -m-4"/>

            <div id='navbar' class="w-full sticky top-0 grid grid-cols-3 justify-items-center items-end pb-4 pt-7 z-20 transition-all duration-300">
                <a href="/about" class="leading-7 underline decoration-[0.5px] hover:underline-offset-4 {nav_select === -1 ? 'decoration-transparent' : ''}">about</a>
                <a href="/"><h1>capinski.dev</h1></a>
                <a href="/blog"  class="leading-7 underline decoration-[0.5px] hover:underline-offset-4 {nav_select ===  1 ? 'decoration-transparent' : ''}">blog</a>

                <div id="highlight" class="border-t-2 border-blue-800 absolute w-16 h-8 top-[40%] -z-10 rotate-180 duration-500"
                     style="margin-left: calc((66%) * {nav_select}); opacity: { Math.abs(nav_select)}; background: linear-gradient(to top, transparent 70%, lightblue 100%);"></div>
            </div>

            {@render children()}

        </main>
    </div>
</div>