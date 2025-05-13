import type {Actions, PageServerLoad} from "../../../../.svelte-kit/types/src/routes/$types";
import PocketBase from "pocketbase";
import {type Cookies, error} from "@sveltejs/kit";


export const load: PageServerLoad = async ({ params, cookies, url}: any) => {
    const slug = params.slug as string;

    const pb = new PocketBase('https://pocketbase.capinski.dev');
    const auth = await auth_check(cookies, url, pb)

    // fetch text from pocketbase
    let text;
    try {
        text = await pb.collection('pages').getFirstListItem(`page="${slug}"`);
    } catch (e) {
        console.log(e);
    }

    if (!text || !auth && !text.published) {
        error(404, {
            message: 'Post not found'
        });
    }

    const date = new Date(text.pub_date || text.updated || text.created);
    text.pub_date = date.toLocaleString('default', { month: 'short', year: 'numeric' });
    text.thumbnail = text.thumbnail ? pb.getFileUrl(text, text.thumbnail) : null;

    return {
        text
    }
}


export const actions = {
    save: async ({request, url, cookies}) => {
        const slug = url.pathname.split('/')[2] as string;

        const pb = new PocketBase('https://pocketbase.capinski.dev');
        const auth = await auth_check(cookies, url, pb)
        if (!auth) return {status: 401}

        const data = await request.formData()
        const text = data.get('text')?.toString() || ''

        //save text to pocketbase
        try {
            const page = await pb.collection('pages').getFirstListItem(`page="${slug}"`)
            await pb.collection('pages').update(page.id, {content: text})
        } catch (e) {
            console.log(e)
            return {status: 500}
        }
        return {status: 200}

    },
    saveSettings: async ({request, url, cookies}) => {
        const slug = url.pathname.split('/')[2] as string;

        const pb = new PocketBase('https://pocketbase.capinski.dev');
        const auth = await auth_check(cookies, url, pb)
        if (!auth) return {status: 401}

        const data = await request.formData()
        const published = data.get('published')?.toString() === 'true' || false
        const title = data.get('title')?.toString() || ''
        const summary = data.get('summary')?.toString() || ''
        const page = data.get('slug')?.toString() || ''
        const new_page = data.get('new')?.toString() === 'true' || false

        // if new page, create new page
        if (new_page) {
            try {
                const item = await pb.collection('pages').create({
                    page, published, title, summary, content: '',
                })
            } catch (e) {
                console.log(e)
                return {status: 500}
            }
            return {status: 200}
        }

        let pub_date = null;
        // if publishing, set the published date
        if (published) {
            pub_date = new Date()
        }

        //save settings to pocketbase
        try {
            const item = await pb.collection('pages').getFirstListItem(`page="${slug}"`)
            await pb.collection('pages').update(item.id, {published, title, summary, page, pub_date})
        } catch (e) {
            console.log(e)
            return {status: 500}
        }
        return {status: 200}
    },
    upload: async ({request, url, cookies}) => {
        const slug = url.pathname.split('/')[2] as string;

        const pb = new PocketBase('https://pocketbase.capinski.dev');
        const auth = await auth_check(cookies, url, pb)
        if (!auth) return {status: 401}

        const data = await request.formData()
        const file = data.get('file') as File

        //save file to pocketbase
        let thumbnail = '';
        try {
            const item = await pb.collection('pages').getFirstListItem(`page="${slug}"`)
            const new_item = await pb.collection('pages').update(item.id, {thumbnail: file})
            thumbnail = pb.getFileUrl(new_item, new_item.thumbnail)
        } catch (e) {
            console.log(e)
            return {status: 500}
        }
        return {status: 200, thumbnail}
    },
    delete: async ({request, url, cookies}) => {
        const slug = url.pathname.split('/')[2] as string;

        const pb = new PocketBase('https://pocketbase.capinski.dev');
        const auth = await auth_check(cookies, url, pb)
        if (!auth) return {status: 401}

        //delete page from pocketbase
        try {
            const item = await pb.collection('pages').getFirstListItem(`page="${slug}"`)
            await pb.collection('pages').delete(item.id)
        } catch (e) {
            console.log(e)
            return {status: 500}
        }
        return {status: 200}
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