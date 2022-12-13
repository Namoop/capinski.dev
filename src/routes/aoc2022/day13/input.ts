import text from "./input.txt?raw";
import { readable, derived } from "svelte/store";

export const raw = text;
export const input = readable(text.split("\r\n\r\n"));
export const visualmap = derived(input, ($input) => $input);
