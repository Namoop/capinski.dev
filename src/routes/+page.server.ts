// load projects list from pocketbase

import type { PageServerLoad } from './$types'
import PocketBase from 'pocketbase'

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

export const load: PageServerLoad = async ({ params, cookies }) => {
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

	return {
		projects,
		dark: {dark_mode, last_preference},
	}
}