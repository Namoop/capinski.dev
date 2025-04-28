<script lang="ts">

    import type {PageData} from "../../../.svelte-kit/types/src/routes/$types.js";
    import TextEditor from "$lib/TextEditor.svelte";
    import Icon from "$lib/Icon.svelte";

    let text: HTMLElement | null = $state(null);


    let {data}: { data: PageData } = $props();
    const {auth} = data;
</script>

{#if auth}
    <TextEditor fill={text}/>
{/if}

<div bind:this={text}>
    {@html data.text}
</div>

<div class="flex gap-8 justify-content">
    <a class="text-6xl link" href="https://mathstodon.xyz/@capinski" rel="me">
        <Icon icon="mastodon"/>
    </a>
    <a class="text-6xl link" href={`mailto:theo@capinski.dev`}>
        <Icon icon="mail"/>
    </a>
    <a class="text-6xl link" href="https://www.github.com/Namoop">
        <Icon icon="github"/>
    </a>
</div>