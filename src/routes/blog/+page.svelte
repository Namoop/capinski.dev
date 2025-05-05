<script lang="ts">
    import type {PageData} from "../../../.svelte-kit/types/src/routes/blog/$types";
    import Icon from "$lib/Icon.svelte";

    let {data}: { data: PageData } = $props();
    const { blogs, auth } = data;
    console.log("page", blogs!.length);
    if (!blogs) {
        throw new Error("No blogs found");
    }
</script>

<span>My Terrible Blog Posts</span>

{#if auth}
<div class="bg-blue-50 rounded-lg flex flex-row shadow p-6 hover:shadow-lg transition-shadow w-full h-32">
<!--    new post card-->
    <a href="/blog/new" class="text-6xl w-36 mr-4 object-contain flex items-center justify-center">
        <Icon icon="plus" />
    </a>
    <div>
        <h2 class="text-xl font-semibold text-gray-800 mb-2">
            New Post
        </h2>
        <p class="text-gray-700 mb-2 line-clamp-3">Create a new blog post</p>
        <a
                href="/blog/new"
                class="text-blue-600 hover:underline font-medium"
        >
            Create →
        </a>
    </div>
</div>
{/if}

{#each blogs as blog, id}
    <div id="blog-card-{id}" class="{blog.published ? 'bg-white': 'bg-gray-100'} rounded-lg flex flex-row shadow p-6 hover:shadow-lg transition-shadow w-full h-48">
        <a href="/blog/{blog.page}" class="w-36 mr-4 object-contain">
            <img src={blog.thumbnail} alt="Thumbnail" class="w-full h-full object-contain" />
        </a>
        <div>
        <div class="text-sm text-gray-500 mb-1">{blog.pub_date}</div>
        <h2 class="text-xl font-semibold text-gray-800 mb-2">
            {#if !blog.published}
                <span class="text-red-600">DRAFT: </span>
            {/if}
            <a href={`/blog/${blog.page}`} class="hover:text-blue-600 {blog.title ? '' : 'italic'}">{blog.title ? blog.title : "Untitled"}</a>
        </h2>
        <p class="text-gray-700 mb-4 line-clamp-3 {blog.title ? '' : 'italic'}">{blog.summary ? blog.summary : 'No content yet'}</p>
        <a
                href={`/blog/${blog.page}`}
                class="text-blue-600 hover:underline font-medium"
        >
            {blog.published ? 'Read more' : 'Edit Post'} →
        </a>
        </div>
    </div>
{/each}