import type {Actions, PageServerLoad} from "../../../.svelte-kit/types/src/routes/$types";
import PocketBase from "pocketbase";
import type {Cookies} from "@sveltejs/kit";


export const load: PageServerLoad = async ({ params, cookies, url}: any) => {

    const pb = new PocketBase('https://pocketbase.capinski.dev');
    const auth = await auth_check(cookies, url, pb)

    // fetch blogs from pocketbase
    // fetch "summary" field and "thumbnail" field and "page" field
    let blogs;
    try {
        blogs = await pb.collection('pages').getFullList({
            sort: '-pub_date',
            filter: auth ? '' : 'published=true' + ' && page!="home" && page!="new"',
            expand: 'thumbnail',
        });
    } catch (e) {
        console.log(e);
        return {status: 500};
    }
    console.log(Date.now().toLocaleString(), blogs.length)

    // convert created datetime to "Jan 2022" format
    blogs.forEach((blog) => {
        const date = new Date(blog.pub_date || blog.updated || blog.created);
        blog.pub_date = date.toLocaleString('default', { month: 'short', year: 'numeric' });
    });

    return {
        blogs: blogs.map(record => {
            const { id, title, pub_date, thumbnail, page, published, summary } = record;
            const thumbnail_url = thumbnail ? pb.getFileUrl(record, thumbnail) : null;
            return { id, title, pub_date, thumbnail: thumbnail_url, page, published, summary } as {
                id: string;
                title: string;
                pub_date: string;
                thumbnail: string | null;
                page: string;
                published: boolean;
                summary: string;
            };
        })
    }
}


export const actions = {
    newpost: async ({request, url, cookies}) => {
        // create new blog post
    }
} satisfies Actions;

async function auth_check(cookies: Cookies, url: URL, pb: PocketBase) {
    pb.authStore.loadFromCookie("pb_auth=" + cookies.get("pb_auth"));

    try {
        pb.authStore.isValid && await pb.admins.authRefresh();
    } catch (e) {
        return false;
    }
    return pb.authStore.isValid;
}