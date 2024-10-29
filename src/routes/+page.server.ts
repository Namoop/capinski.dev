// load projects list from pocketbase

import type { PageServerLoad } from './$types'
import PocketBase from 'pocketbase'

/** project type
 *
 * @param params
 */
export interface Project {
	id: string;
	name: string;
	built: string;
	link: string;
	preview?: string;
}

export const load: PageServerLoad = async ({ params }) => {
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

		return { id, name, built, link, preview: preview ? preview : undefined } as Project;
	})

	return {
		projects,
	}
}