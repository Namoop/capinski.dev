<script lang="ts">
	import {onMount, onDestroy} from 'svelte';
	import 'quill/dist/quill.bubble.css';
	import 'quill/dist/quill.snow.css';
	import type Quill from 'quill';
	import Icon from '$lib/Icon.svelte';

	let editor: Quill, element: HTMLElement, parent: HTMLElement, container: HTMLElement;
	const toolbarOptions = [['bold', 'italic', 'underline', 'strike'], ['link', {header: '1'}, 'blockquote', 'code-block']];
	const modules = {
		toolbar: toolbarOptions[0].concat(['link'])
	};

	let {fill = null as HTMLElement | null, disabled = false} = $props();

	onMount(async () => {
		const module = await import('quill');
		const Quill = module.default;
		editor = new Quill(element, {
			theme: 'bubble',
			modules,
			placeholder: 'Compose an epic...',
			formats: ['bold', 'italic', 'underline', 'strike', 'link', 'header', 'blockquote', 'code-block', 'list'],
		});
		if (fill) {
			editor.clipboard.dangerouslyPasteHTML(0, fill.innerHTML);
			fill.hidden = true;
		}
		if (disabled) {
			editor.disable();
		}

		const toolbar = document.getElementsByClassName('ql-toolbar')[0].children;
		for (let i = 0; i < toolbarOptions.length; i++) {
			let buttons = toolbar[i].children;
			for (let j = 0; j < toolbarOptions[i].length; j++) {
				let button = buttons[j];
				let format = toolbarOptions[i][j];

				button.addEventListener('click', () => {
					switch (typeof format) {
						case "string":
							switch (format) {
								case "link":
									const url = prompt('Enter the URL');
									editor.format(format, url);
									break;
								default:
									editor.format(format, !editor.getFormat()[format]);
									break;
							}
							break;
						case "object":
							editor.format('header', editor.getFormat().header === format.header ? null : format.header);
							break;
					}
				});


			}
		}

		editor.blur();
		const html_editor = document.getElementsByClassName('ql-editor')[0];
		const html_toolbar = document.getElementsByClassName('ql-toolbar')[0];
		const show_editor = () => {
			parent.classList.add('[border-color:#ccc]');
			html_toolbar.classList.remove('opacity-0');

		};
		const hide_editor = () => {
			if (editor.hasFocus()) return;
			if (container.querySelector(':hover') === html_toolbar) return;
			parent.classList.remove('[border-color:#ccc]');
			html_toolbar.classList.add('opacity-0');
		};
		html_editor.addEventListener('focus', show_editor);
		html_editor.addEventListener('blur', hide_editor);
		container.addEventListener('mouseenter', show_editor);
		container.addEventListener('mouseleave', hide_editor);

		// on editor contents change, add remove after:hidden class from save button
		const save_button = document.getElementsByClassName('save')[0];
		editor.on('text-change', () => {
			save_button.classList.remove('after:hidden');
			window.onbeforeunload = function() {
				return true;
			};
		});

	})

	// save button
	async function saveText() {
		const text = editor.root.innerHTML
		const form = new FormData();
		form.append('text', text);
		const response = await fetch('?/save', {
			method: 'POST',
			body: form
		});
		console.log(response);

		// on successful save, hide save button
		if (response.ok) { // TODO status not actually returning
			const save_button = document.getElementsByClassName('save')[0];
			save_button.classList.add('after:hidden');
			window.onbeforeunload = null;
		}
		else {
			console.error('Failed to save text. Time to panic.');
		}
	}

</script>


<component class="-m-4 min-h-[50px]" style="min-width: 100%;" bind:this={container}>
	<div role="toolbar" class="ql-toolbar ql-snow opacity-0 transition duration-300 sticky top-16 bg-white dark:bg-stone-900 z-10">
		<span class="ql-formats">
			<button type="button" class="ql-bold" aria-pressed="false" aria-label="bold">
				<svg
						viewBox="0 0 18 18"><path class="ql-stroke"
												  d="M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z"></path><path
						class="ql-stroke"
						d="M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z"></path></svg>
			</button>
			<button
					type="button" class="ql-italic" aria-pressed="false" aria-label="italic"><svg viewBox="0 0 18 18"><line
					class="ql-stroke" x1="7" x2="13" y1="4" y2="4"></line><line class="ql-stroke" x1="5" x2="11" y1="14"
																				y2="14"></line><line class="ql-stroke"
																									 x1="8" x2="10"
																									 y1="14"
																									 y2="4"></line></svg>
			</button>
			<button
					type="button" class="ql-underline" aria-pressed="false" aria-label="underline"><svg
					viewBox="0 0 18 18"><path
					class="ql-stroke" d="M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3"></path><rect
					class="ql-fill" height="1" rx="0.5" ry="0.5" width="12" x="3" y="15"></rect></svg>
			</button>
			<button
					type="button" class="ql-strike" aria-pressed="false" aria-label="strike">
				<svg viewBox="0 0 18 18">
					<line class="ql-stroke ql-thin" x1="15.5" x2="2.5" y1="8.5" y2="9.5"></line>
					<path class="ql-fill"
						  d="M9.007,8C6.542,7.791,6,7.519,6,6.5,6,5.792,7.283,5,9,5c1.571,0,2.765.679,2.969,1.309a1,1,0,0,0,1.9-.617C13.356,4.106,11.354,3,9,3,6.2,3,4,4.538,4,6.5a3.2,3.2,0,0,0,.5,1.843Z"></path>
					<path class="ql-fill"
						  d="M8.984,10C11.457,10.208,12,10.479,12,11.5c0,0.708-1.283,1.5-3,1.5-1.571,0-2.765-.679-2.969-1.309a1,1,0,1,0-1.9.617C4.644,13.894,6.646,15,9,15c2.8,0,5-1.538,5-3.5a3.2,3.2,0,0,0-.5-1.843Z"></path>
				</svg>
			</button>
		</span>
		<span class="ql-formats">
			<button type="button" class="ql-link" aria-pressed="false" aria-label="link"><svg viewBox="0 0 18 18"><line class="ql-stroke" x1="7" x2="11" y1="7" y2="11"></line><path class="ql-even ql-stroke" d="M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z"></path><path class="ql-even ql-stroke" d="M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z"></path></svg></button>
		<button type="button" class="ql-header" aria-pressed="false" value="1"
				aria-label="header: 1"><svg viewBox="0 0 18 18"><path class="ql-fill"
																	  d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm6.06787,9.209H14.98975V7.59863a.54085.54085,0,0,0-.605-.60547h-.62744a1.01119,1.01119,0,0,0-.748.29688L11.645,8.56641a.5435.5435,0,0,0-.022.8584l.28613.30762a.53861.53861,0,0,0,.84717.0332l.09912-.08789a1.2137,1.2137,0,0,0,.2417-.35254h.02246s-.01123.30859-.01123.60547V13.209H12.041a.54085.54085,0,0,0-.605.60547v.43945a.54085.54085,0,0,0,.605.60547h4.02686a.54085.54085,0,0,0,.605-.60547v-.43945A.54085.54085,0,0,0,16.06787,13.209Z"></path></svg></button><button
				type="button" class="ql-blockquote" aria-pressed="false" aria-label="blockquote"><svg
				viewBox="0 0 18 18"><rect
				class="ql-fill ql-stroke" height="3" width="3" x="4" y="5"></rect><rect class="ql-fill ql-stroke"
																						height="3"
																						width="3" x="11" y="5"></rect><path
				class="ql-even ql-fill ql-stroke" d="M7,8c0,4.031-3,5-3,5"></path><path
				class="ql-even ql-fill ql-stroke"
				d="M14,8c0,4.031-3,5-3,5"></path></svg>
		</button>
			<button
					type="button" class="ql-code-block" aria-pressed="false" aria-label="code-block"><svg
					viewBox="0 0 18 18"><polyline
					class="ql-even ql-stroke" points="5 7 3 9 5 11"></polyline><polyline class="ql-even ql-stroke"
																						 points="13 7 15 9 13 11"></polyline><line
					class="ql-stroke" x1="10" x2="8" y1="5" y2="13"></line></svg>
			</button>
		</span>
		<span class="ql-formats">
			<button type="button" class="ql-link text-[#444] save after:hidden" aria-pressed="false" aria-label="save" onclick={saveText}>
				<Icon icon="save"/>
			</button>
		</span>
	</div>
	<div hidden class="[border-color:#ccc]"></div>
	<div bind:this={parent} class="ql-container border-solid border transition duration-300 border-t-0 border-transparent">
		<div bind:this={element}></div>
	</div>
</component>

<style>
    :global(.ql-formats button) {
        margin: 0;
        padding: 0
    }
    :global(.dark .ql-formats button, .dark .ql-stroke) {
        color: #ddd;
		stroke: #ddd;
    }
	:global(.dark .ql-fill) {
		fill: #ddd;
	}
	:global(.ql-container .ql-container .ql-tooltip){
		border: 1px solid #ccc;
		background-color: #fff;
	}
	:global(.dark .ql-container .ql-container .ql-tooltip){
		border: 1px solid #444;
		background-color: #333;
    }
    :global(.ql-tooltip .ql-stroke){
        color: #444;
        stroke: #444;
    }
	:global(.ql-tooltip .ql-fill){
		fill: #444;
	}
	:global(.dark .ql-tooltip .ql-stroke){
		color: #ddd;
		stroke: #ddd;
	}
	:global(.dark .ql-tooltip .ql-fill){
		fill: #ddd;
	}

	.save::after {
		content: '*';
		color: #b62828;
	}

	:global(.ql-container .ql-editor) {
		line-height: inherit;
		min-height: 12rem;
		outline: none;
	}


    :global(div.ql-container) {
        font-size: inherit;
        font-family: inherit;
    }
</style>
