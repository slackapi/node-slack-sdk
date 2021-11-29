import { cwd } from "https://deno.land/std@0.116.0/node/process.ts";
const title = 'deno';
const version = Deno.version.deno;
let process = {
  cwd,
  title,
  version,
};
export let dummy_process = process;
