<script lang="ts">
	export let data: { input: string; };
	const copy = () => navigator.clipboard.writeText(String(result));

	const input = data.input.split("\n");

	type Filesystem = {
		dirs: {
			[index: string]: Filesystem; // subdirectories
		};
		files: {
			[index: string]: number; // size
		};
		parent: Filesystem;
		size: number;
	};
	const TOTAL_DISK_SPACE = 70000000;
	const REQUIRED_FREE_SPACE = 30000000;
	const filesystem: Filesystem = {
		// @ts-ignore Root does not have a parent
		parent: null,
		dirs: {},
		files: {},
		size: 0,
	};
	const below100k: Set<Filesystem> = new Set();
	const allDirectories: Filesystem[] = [];

	let parent: Filesystem;
	input.forEach((consoleLine) => {
		if (consoleLine[0] == "$") {
			if (consoleLine[2] == "c") {
				//command --> cd x
				const goto = consoleLine.slice(5);
				if (goto == "/") parent = filesystem;
				else if (goto == "..") parent = parent.parent;
				else {
					parent.dirs[goto] ??
						(parent.dirs[goto] = {
							parent: parent,
							dirs: {},
							files: {},
							size: 0,
						});
					parent = parent.dirs[goto];
					below100k.add(parent);
					allDirectories.push(parent);
				}
			}
			return;
		}
		if (consoleLine[0] != "d") {
			//if is NOT a directory --> is a file
			const [size, name] = consoleLine.split(" ");
			parent.files[name] = +size;
			let tempparent = parent;
			while (tempparent) {
				tempparent.size += +size;
				if (tempparent.size > 100000) below100k.delete(tempparent);
				tempparent = tempparent.parent;
			}
		}
	});

	const sumOfAllBelow10k = [...below100k].reduce((c, v) => c + v.size, 0); //result 1

	const NEED_TO_CLEAR =
		REQUIRED_FREE_SPACE + filesystem.size - TOTAL_DISK_SPACE;

	const smallestSingleDirectorySize = Math.min(
		...allDirectories.map((a) => a.size).filter((b) => b >= NEED_TO_CLEAR)
	); //result 2

	const result = smallestSingleDirectorySize;

	const code = `export let data: { input: string; testinput: string };
const copy = () => navigator.clipboard.writeText(String(result));

const input = data.input.split("\n");

type Filesystem = {
	dirs: {
		[index: string]: Filesystem; // subdirectories
	};
	files: {
		[index: string]: number; // size
	};
	parent: Filesystem;
	size: number;
};
const TOTAL_DISK_SPACE = 70000000;
const REQUIRED_FREE_SPACE = 30000000;
const filesystem: Filesystem = {
	// @ts-ignore Root does not have a parent
	parent: null,
	dirs: {},
	files: {},
	size: 0,
};
const below100k: Set<Filesystem> = new Set();
const allDirectories: Filesystem[] = [];

let parent: Filesystem;
input.forEach((consoleLine) => {
	if (consoleLine[0] == "$") {
		if (consoleLine[2] == "c") {
			//command --> cd x
			const goto = consoleLine.slice(5);
			if (goto == "/") parent = filesystem;
			else if (goto == "..") parent = parent.parent;
			else {
				parent.dirs[goto] ??
					(parent.dirs[goto] = {
						parent: parent,
						dirs: {},
						files: {},
						size: 0,
					});
				parent = parent.dirs[goto];
				below100k.add(parent);
				allDirectories.push(parent);
			}
		}
		return;
	}
	if (consoleLine[0] != "d") {
		//if is NOT a directory --> is a file
		const [size, name] = consoleLine.split(" ");
		parent.files[name] = +size;
		let tempparent = parent;
		while (tempparent) {
			tempparent.size += +size;
			if (tempparent.size > 100000) below100k.delete(tempparent);
			tempparent = tempparent.parent;
		}
	}
});

const sumOfAllBelow10k = [...below100k].reduce((c, v) => c + v.size, 0); //result 1

const NEED_TO_CLEAR =
	REQUIRED_FREE_SPACE + filesystem.size - TOTAL_DISK_SPACE;

const smallestSingleDirectorySize = Math.min(
	...allDirectories.map((a) => a.size).filter((b) => b >= NEED_TO_CLEAR)
); //result 2

const result = smallestSingleDirectorySize;`.replaceAll("\n", "<br>").replaceAll("\t", "&nbsp&nbsp");
</script>

<!-- prettier-ignore -->
<structure lang="pug">
	h2 Day 7
	h3 Inputted Data
	p.break-all {JSON.stringify(input).substring(0, 500)}...
	h3 Code
	code {@html code}
	h3 Result
	| {JSON.stringify(result, undefined, " ")}
	br
	button(on:click="{copy}") Copy
</structure>

<style>
	/*  */
</style>
