import { readdir as fsReadDir, writeFile as fsWriteFile } from 'fs';
import { join as joinPaths } from 'path';
import { promisify } from 'util';
import { ApiModel } from '@microsoft/api-extractor-model';
import rehypeSlug = require('rehype-slug');
import rehypeStringify = require('rehype-stringify');
// import remarkStringify = require('remark-stringify');
import remarkToRehype = require('remark-rehype');
import remarkToc = require('remark-toc');
import unified = require('unified');
import { VFile } from 'vfile';
import documenter, { DocumenterKind } from './package-parser';
import { stringifyFrontmatter } from './macros';

/** Directory that contains API models. */
const API_MODELS_PATH = joinPaths(__dirname, '..', 'models');

/** Directory to save rendered pages to. */
const OUTPUT_PATH = joinPaths(__dirname, '..', '..', '..', 'docs', '_reference');

const readDir = promisify(fsReadDir);
const writeFile = promisify(fsWriteFile);

/**
 * Creates an API model and loads each package found in `API_MODELS_PATH`.
 */
async function loadModel() {
  // Create the cumulative API model
  const apiModel = new ApiModel();

  // Load each API package model
  (await readDir(API_MODELS_PATH))
    .filter(filename => filename.endsWith('.api.json'))
    .forEach(filename =>
      apiModel.loadPackage(joinPaths(API_MODELS_PATH, filename))
    );

  return apiModel;
}

/**
 * Gets the content of a vfile with its frontmatter
 */
function vfileContentWithFrontmatter(file: VFile): string {
  let content = file.toString();

  // Prepend frontmatter if present
  if ('frontmatter' in (file.data as any)) {
    content =
      stringifyFrontmatter((file.data as any).frontmatter) +
      "\n\n" +
      content;
  }

  return content;
}

/**
 * Saves a virtual file to the package's `out/` directory.
 */
function saveVFile(file: VFile): Promise<void> {
  return writeFile(
    joinPaths(OUTPUT_PATH, file.basename!),
    vfileContentWithFrontmatter(file)
  );
}

(async () => {
  // Create the cumulative API model
  const apiModel = await loadModel();

  // Create the pipeline that handles processing API packages
  const processor = unified()
    .use(documenter, { model: apiModel })
    .use(remarkToc)
    .use(remarkToRehype, { allowDangerousHTML: true })
    .use(rehypeSlug)
    .use(rehypeStringify, { allowDangerousHTML: true });
    // .use(remarkStringify);

  // Document each package:
  await Promise.all([
    // Generate the index page
    processor
      .process({ data: { kind: DocumenterKind.Model } })
      .then(saveVFile),

    // Generate pages for each package
    ...apiModel.packages
      // Turn each package into a vfile
      .map(
        pkg =>
          ({
            path: pkg.name,
            data: { kind: DocumenterKind.Package }
          })
      )
      // Document each package
      .map(pkgFile => processor.process(pkgFile))
      // Save each package documentation file
      .map(p => p.then(saveVFile))
  ]);

  // Yay 🎉
  console.log('Reference docs generated 🎉');
})().catch(err => console.error(err));
