import { readdir as fsReadDir, writeFile as fsWriteFile } from 'fs';
import { join as joinPaths } from 'path';
import { promisify } from 'util';
import { ApiModel } from '@microsoft/api-extractor-model';
import { Node, Element, Text } from 'hast';
import rehypeStringify = require('rehype-stringify');
import remarkToRehype = require('remark-rehype');
import unified = require('unified');
import visit = require('unist-util-visit');
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

/**
 * A transformer that adds `id` attributes to headings.
 */
function addHeadingIds(): unified.Transformer {
  return (tree: Node) => {
    visit(tree, 'element', (node: Element) => {
      // Only tag H1 and H2 elements
      if (node.tagName !== 'h1' && node.tagName !== 'h2') {
        return;
      }

      // Create a 'slug' id for the heading by lower-casing the text inside and
      // replacing sequences of non-basic-alphanumeric characters with a hyphen
      const id = (node.children[0] as Text).value
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+/g, '-');

      // Add the `id` attribute
      if (node.properties === undefined) {
        node.properties = { id };
      } else {
        node.properties.id = id;
      }

      // Add a "auto-anchor-strong" class to H1 elements
      if (node.tagName === 'h1') {
        node.properties!.class += ' auto-anchor-strong';
      }
    });
  }
}

(async () => {
  // Create the cumulative API model
  const apiModel = await loadModel();

  // Create the pipeline that handles processing API packages
  const processor = unified()
    .use(documenter, { model: apiModel })
    .use(remarkToRehype, { allowDangerousHTML: true })
    .use(addHeadingIds)
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
