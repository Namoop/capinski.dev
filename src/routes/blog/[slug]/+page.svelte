<script lang="ts">
    import type {PageData} from "../../../../.svelte-kit/types/src/routes/blog/[slug]/$types.d.ts";
    import TextEditor from "$lib/TextEditor.svelte";

    let textEl: HTMLElement | null = $state(null);
    let {data}: { data: PageData } = $props();
    const {text: data_text, auth} = data;
    const text = $state(data_text!);
    console.log(data_text)

    // local editable copies
    let title = $state(text.title) as string;
    let summary = $state(text.summary) as string;
    let published = $state(text.published) as boolean;
    let slug = $state(text.page) as string;

    async function saveSettings() {
        if (slug === "new") return;
        const form = new FormData();
        form.append('title', title);
        form.append('summary', summary);
        form.append('published', published.toString());
        form.append('slug', slug);
        form.append('new', text.page === "new" ? "true" : "false");
        const response = await fetch('?/save', {
            method: 'POST',
            body: form
        });
        console.log(response);

        if (response.ok) { // TODO status not actually returning
            window.onbeforeunload = null;
            if (slug !== text.page) {
                window.location.href = `/blog/${slug}`;
            }
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
</script>

<div class="w-3/5 h-full border flex items-center justify-center mb-6 p-4 border-gray-200 dark:border-gray-600">
    <img
            src={text.thumbnail}
            alt="Thumbnail"
            class="h-36 object-contain rounded-lg"
    />
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
    {#if !published}
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
        <div class="flex flex-col w-24">
            <div>
                <label class="text-sm text-gray-500 mb-1" for="published">Published</label>
                <label for="published"
                       class="m-auto w-12 h-6 transition-colors duration-700 {published ? 'bg-green-200' : 'bg-gray-100'} border border-gray-300 rounded-full flex justify-center items-center cursor-pointer ">
                    <span class="relative w-3/5 h-full flex items-center">
                        <span class="absolute w-4 h-4 bg-slate-500 border border-black rounded-xl transition-all -translate-x-1/2 {published ? 'left-full' : 'left-0'}"></span>
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
            <div>
                <label class="text-sm text-gray-500 mb-1" for="slug">Slug</label>
                <input
                        type="text"
                        bind:value={slug}
                        class="rounded p-1 w-full border bg-transparent "
                        id="slug"
                        placeholder="Edit slug…"
                        onchange={()=>{
                            const confirm = slug === "new" || window.confirm('Are you sure you want to change the slug? This will redirect to the new page.')
                            if (confirm) saveSettings()
                            else slug = text.page;
                        }}
                />
            </div>
        </div>
    </div>

    <!--horizontal line-->
    <hr class="mb-6 border w-full border-gray-300"/>
{/if}

{#if auth}
    <TextEditor fill={textEl} disabled={slug === "new"}/>
{/if}

<div bind:this={textEl} class="prose prose-lg min-h-72">
    {@html text.content}
</div>
