<script lang="ts">
    import type {PageData} from "../../../.svelte-kit/types/src/routes/blog/$types";
    import Icon from "$lib/Icon.svelte";

    let {data}: { data: PageData } = $props();
    const {blogs, auth} = data;
    if (!blogs) {
        throw new Error("No blogs found");
    }
</script>

{#if auth}
    <div class="flex flex-row w-full items-center justify-center transition-colors duration-300">
        <a href="/blog/new" class="flex flex-row items-center gap-4 bg-blue-100 dark:bg-stone-600 rounded-xl px-4 py-2">
            <span class="text-4xl mr-4 object-contain flex items-center justify-center">
                <Icon icon="plus"/>
            </span>
            <span class=" text-gray-800 dark:text-inherit text-lg font-medium">
                Create →
            </span>
        </a>
    </div>

    <!--horizontal line-->
    <hr class="mb-6 border w-full border-gray-300"/>
{/if}

{#each blogs as blog, id}
    <div id="blog-card-{id}"
         class="{blog.published ? 'bg-white dark:bg-stone-800' : 'bg-gray-100 dark:bg-zinc-800'} rounded-lg flex flex-row shadow p-6 hover:shadow-lg transition-all duration-300 w-full min-h-48">
        <a href="/blog/{blog.page}" class="w-48 mr-4 object-contain">
            <img src={blog.thumbnail} alt="Thumbnail" class="w-full h-full object-contain"/>
        </a>
        <div class="w-full">
            <div class="text-sm text-gray-500 mb-1">{blog.pub_date}</div>
            <h2 class="text-xl font-semibold text-gray-800 dark:text-inherit mb-2">
                {#if !blog.published}
                    <span class="text-red-600">DRAFT: </span>
                {/if}
                <a href={`/blog/${blog.page}`}
                   class="hover:text-blue-600 {blog.title ? '' : 'italic'}">{blog.title ? blog.title : "Untitled"}</a>
            </h2>
            <p class="text-gray-700 dark:text-inherit mb-4 {blog.title ? '' : 'italic'}">{blog.summary ? blog.summary : 'No content yet'}</p>
            <a
                    href={`/blog/${blog.page}`}
                    class="text-blue-600 dark:text-blue-300 hover:underline font-medium"
            >
                {auth ? 'Edit Post' : 'Read more'} →
            </a>
        </div>
    </div>
{/each}