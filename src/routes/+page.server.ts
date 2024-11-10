// load projects list from pocketbase

import type {Actions, PageServerLoad} from './$types'
import PocketBase from 'pocketbase'
import type {Cookies} from "@sveltejs/kit";

/** A project type loaded from Pocketbase
 * @prop id - unique project id
 * @prop name - project name
 * @prop built - date of first release
 * @prop link - hosted url
 * @prop preview - shortened preview url
 */
export interface Project {
	id: string;
	name: string;
	built: string;
	link: string;
	preview: string;
}

export const load: PageServerLoad = async ({ params, cookies, url}) => {
	const pb = new PocketBase('https://pocketbase.capinski.dev');

	const data = await pb.collection('capinski_projects').getFullList({
		sort: '-built',
	});

	// convert built datetime to "Jan 2022" format
	data.forEach((project) => {
		const date = new Date(project.built);
		project.built = date.toLocaleString('default', { month: 'short', year: 'numeric' });
	});

	const projects = data.map(record => {
		const { id, name, built, link, preview } = record;

		return { id, name, built, link, preview: preview ? preview : link.match(/https:\/\/(.*)\//)?.[1] } as Project;
	})

	// fetch dark mode preferences from cookies
	let dark_mode = cookies.get('dark_mode') === 'true';
	let last_preference = cookies.get('last_preference') === "true";

	// fetch text from pocketbase
	let text;
	try {
		text = await pb.collection('pages').getFirstListItem('page="home"');
	} catch (e) {
		console.log(e);
	}
	const text2 = cookies.get('text') || '';
	const auth = await auth_check(cookies, url, pb)

	return {
		projects,
		dark: {dark_mode, last_preference},
		auth,
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
	return true
}