import type {Actions, PageServerLoad} from "../../../.svelte-kit/types/src/routes/$types";
import PocketBase from "pocketbase";
import type {Cookies} from "@sveltejs/kit";


export const load: PageServerLoad = async ({ params, cookies, url}: any) => {
    const pb = new PocketBase('https://pocketbase.capinski.dev');

    // fetch text from pocketbase
    let text;
    try {
        text = await pb.collection('pages').getFirstListItem('page="home"');
    } catch (e) {
        console.log(e);
    }

    return {
        text: text?.content || "ERROR: Page text not found",
    }
}


export const actions = {
    save: async ({request, url, cookies}) => {
        const pb = new PocketBase('https://pocketbase.capinski.dev');
        const auth = await auth_check(cookies, url, pb)
        if (!auth) return {status: 401}

        const data = await request.formData()
        const text = data.get('text')?.toString() || ''

        //save text to pocketbase
        try {
            const page = await pb.collection('pages').getFirstListItem('page="home"')
            await pb.collection('pages').update(page.id, {content: text})
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