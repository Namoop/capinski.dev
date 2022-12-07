<script lang="ts">
	export let data: { input: string; testinput: string };
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
		parent: null,
		dirs: {},
		files: {},
		size: 0,
	};
	const below100k: Set<Filesystem> = new Set();

	let smallestDirOfMinimumSize: filesystem | undefined;

	let parent;
	input.forEach((value, index) => {
		if (value[0] == "$") {
			if (value[2] == "c") {
				//command --> cd x
				const goto = value.slice(5);
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
				}
			}
			return;
		}
		if (value[0] != "d") {
			//if is NOT a directory --> is a file
			const [size, name] = value.split(" ");
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

	const NEED_TO_CLEAR = TOTAL_DISK_SPACE - filesystem.size;

	console.log(filesystem);
	console.log(below100k);
	const result = sumOfAllBelow10k; //filesystem;

	const code = ``.replaceAll("\n", "<br>").replaceAll("\t", "&nbsp&nbsp");
</script>

<!-- prettier-ignore -->
<structure lang="pug">
	h2 Day 7
	h3 Inputted Data
	| {JSON.stringify(input).substring(0, 500)}...
	h3 Code
	code {@html code}
	h3 Result
	| {JSON.stringify(result, "", " ")}
	br
	button(on:click="{copy}") Copy
</structure>

<style>
	/*  */
</style>
