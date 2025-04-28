import type {PageServerLoad} from "../../.svelte-kit/types/src/routes/$types";
import type {Cookies} from "@sveltejs/kit";
import PocketBase from "pocketbase";

export const load: PageServerLoad = async ({ params, cookies, url}: any)=> {
    // fetch dark mode preferences from cookies
    let dark_mode = cookies.get('dark_mode') === 'true';
    let last_preference = cookies.get('last_preference') === "true";

    const pb = new PocketBase('https://pocketbase.capinski.dev');
    const auth = await auth_check(cookies, url, pb)

    return {
        auth,
        dark: {dark_mode, last_preference},
    }
}


async function auth_check(cookies: Cookies, url: URL, pb: PocketBase) {
    pb.authStore.loadFromCookie("pb_auth=" + cookies.get("pb_auth"));

    try {
        pb.authStore.isValid && await pb.admins.authRefresh();
    } catch (e) {
        return false;
    }
    return pb.authStore.isValid;
}