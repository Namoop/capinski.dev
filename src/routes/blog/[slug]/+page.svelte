<script lang="ts">
    import type {PageData} from "../../../../.svelte-kit/types/src/routes/blog/[slug]/$types.d.ts";
    import TextEditor from "$lib/TextEditor.svelte";
    import {goto, pushState} from "$app/navigation";
    import Icon from "$lib/Icon.svelte";
    import type {ActionData} from "./$types.js";

    let textEl: HTMLElement | null = $state(null);
    let {data}: { data: PageData } = $props();
    const {text: data_text, auth} = data;
    const text = $state(data_text!);

    // local editable copies
    let title = $state(text.title) as string;
    let summary = $state(text.summary) as string;
    let published = $state(text.published) as boolean;
    let slug = $state(text.page) as string;
    let disabled = $derived(slug === "new")

    function randomFourCharacters() {
        return Math.random().toString(36).substring(2, 6);
    }

    async function saveSettings() {
        if (slug === "new") slug = `post-${randomFourCharacters()}`;
        const form = new FormData();
        form.append('title', title);
        form.append('summary', summary);
        form.append('published', published.toString());
        form.append('slug', slug);
        form.append('new', text.page === "new" ? "true" : "false");
        const response = await fetch('?/saveSettings', {
            method: 'POST',
            body: form
        });

        if (response.ok) { // TODO status not actually returning
            window.onbeforeunload = null;
            if (slug !== text.page) {
                pushState(`/blog/${slug}`, {});
            }
            text.published = published;
        } else {
            console.error('Failed to save settings. Time to panic.');
        }
    }

    function settingsChanged() {
        window.onbeforeunload = function () {
            return true;
        };

        saveSettings();
    }

    function decodeActionData(data: string) { // TODO probably needs to be updated for anything deeply nested
        // action data is a string of format [{"key1":index1,"key2":index2},value1,value2]
        // we want to return {key1: value1, key2: value2}
        const keys = data.match(/(?<=(?:{|,)")(.*?)(?=":)/g)!;
        data = data.replace(/{.*},/g, "");
        const values = JSON.parse(data);
        const result: {[key: string]: any} = {};
        keys.forEach((key, index) => {
            result[key] = values[index];
        })
        return result;

    }

    async function thumbnailUpload(e: Event) {
        await saveSettings()
        const file = (e?.target as HTMLFormElement).files[0] as File || '';
            const form = new FormData();
            form.append('file', file);
            const response = await fetch('?/upload', {
                method: 'POST',
                body: form
            });
            if (response.ok) {
                const unparsed = await response.json();
                const data = decodeActionData(unparsed.data)
                const thumbnail = data.thumbnail as string;
                text.thumbnail = thumbnail;
            }
    }

    async function deletePost() {
        const form = new FormData();
        form.append('slug', slug);
        const response = await fetch('?/delete', {
            method: 'POST',
            body: form
        });
        if (response.ok) {
            await goto('/blog');
        } else {
            console.error('Failed to delete post. Time to panic.');
        }
    }
</script>

<div class="w-3/4 h-full border flex items-center justify-center mb-6 p-4 border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all duration-300 rounded-lg relative group {(auth && !text.thumbnail) ? 'bg-gray-200 hover:bg-gray-300 dark:bg-zinc-800 dark:hover:bg-zinc-700' : ''}">
    {#if auth}
        <input
                type="file"
                accept="image/*"
                onchange={thumbnailUpload}
                class="absolute opacity-0 w-full h-full cursor-pointer"
        />
        <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 duration-300 text-2xl">
            <Icon icon="upload" />
        </div>
        <button class="absolute top-2 left-2 opacity-0 group-hover:opacity-100 duration-300 text-2xl text-red-500 cursor-pointer p-0"
             onclick={() => {
                 if (window.confirm('Are you sure you want to remove the thumbnail?')) {
                     text.thumbnail = '';
                     thumbnailUpload();
                 }
             }}>
            <Icon icon="close" />
        </button>
    {/if}
    {#if text.thumbnail}
        <img
            src={text.thumbnail}
            alt="Thumbnail failed to load"
            class="h-56 object-contain rounded-lg"
        />
    {:else if auth}
        <div class="h-56 text-8xl flex items-center">
            <Icon icon="upload"/>
        </div>
    {/if}

</div>
<h1 class="text-4xl font-bold">
    {#if auth}
        <input
                bind:value={title}
                onchange={settingsChanged}
                class="w-full text-4xl font-bold focus:outline-none text-center bg-transparent transition-all p-1 border border-transparent hover:border-gray-300 focus:border-gray-300 rounded-lg"
                placeholder="Edit title…"
        />
    {:else}
        {title}
    {/if}
</h1>

<p class="text-sm text-gray-500 mb-1">
    {text.pub_date}
    {#if !text.published}
        <span class="text-red-600">DRAFT</span>
    {/if}
</p>


{#if auth}
    <div class="flex flex-row w-full gap-6">
        <div class="flex flex-col flex-1">
            <label class="text-sm text-gray-500 mb-1" for="summary">Summary</label>
            <textarea
                    bind:value={summary}
                    onchange={settingsChanged}
                    class="rounded p-2 h-full resize-none border bg-transparent"
                    id="summary"
                    placeholder="Edit summary…"
                    rows="2"
            >
            </textarea>
        </div>
        <div>
            <span class="text-sm text-gray-500 mb-1">Settings</span>
        <div class="flex flex-col w-24 gap-2">
            <div class="relative">
                <input
                        type="text"
                        bind:value={slug}
                        class="rounded h-6 px-1 w-full border bg-transparent text-sm "
                        id="slug"
                        placeholder="Edit slug…"
                        onchange={()=>{
                            const confirm = slug === "new" || window.confirm('Are you sure you want to change the slug? This will redirect to the new page.')
                            if (confirm) saveSettings()
                            else slug = text.page;
                        }}
                />
            </div>
            <div>
                <label for="published"
                       class="m-auto h-6 transition-colors duration-700 {published ? 'bg-green-200' : 'bg-gray-100'} border border-gray-300 rounded flex justify-center items-center cursor-pointer ">
                    <span class="relative w-3/5 h-full flex items-center">
                        <span class="absolute w-9 h-5 bg-slate-500 border duration-700 border-black rounded transition-all -translate-x-1/2 flex items-center justify-center text-xs text-slate-50 {published ? 'left-full' : 'left-0'}">{published ? 'Live' : 'Draft'}</span>
                    </span>
                </label>
                <input
                        type="checkbox"
                        hidden
                        bind:checked={published}
                        onchange={settingsChanged}
                        id="published"
                />
            </div>
                <button
                        type="button"
                        class="rounded h-6 text-sm flex items-center justify-center w-full border bg-red-500 text-white hover:bg-red-600 transition-all m-0"
                        id="delete"
                        onclick={() => {
                            const confirm = window.confirm('Are you sure you want to delete this post? This action cannot be undone.')
                            if (confirm) deletePost()
                        }}>
                    Delete
                </button>
        </div>
        </div>
    </div>

    <!--horizontal line-->
    <hr class="mb-6 border w-full border-gray-300"/>
{/if}


{#if auth}
    <TextEditor fill={textEl} {disabled}/>
{/if}

<div class="prose prose-lg min-h-72 ql-bubble w-full">
    <div bind:this={textEl} class="ql-editor">
        {@html text.content}
    </div>
</div>
