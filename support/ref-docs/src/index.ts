import { readdir as fsReadDir, writeFile as fsWriteFile } from 'fs';
import { join as joinPaths } from 'path';
import { promisify } from 'util';
import { ApiModel } from '@microsoft/api-extractor-model';
import remarkStringify = require('remark-stringify');
import remarkToc = require('remark-toc');
import unified = require('unified');
import { VFile } from 'vfile';
import documenter from './unist-attacher';

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
 * Saves a virtual file to the package's `out/` directory.
 */
function saveVFile(file: VFile): Promise<void> {
  return writeFile(joinPaths(OUTPUT_PATH, file.basename!), file.toString());
}

(async () => {
  // Create the cumulative API model
  const apiModel = await loadModel();

  // Create the pipeline that handles processing API files
  const processor = unified()
    .use(documenter, { model: apiModel })
    .use(remarkToc)
    .use(remarkStringify as any); // TODO: remove `as any`

  // Document each package:
  await Promise.all(
    apiModel.packages
      // Turn each package into a vfile
      .map(pkg => ({ path: pkg.name } as unified.VFileCompatible))
      // Document each package
      .map(pkgFile => processor.process(pkgFile))
      // Save each package documentation file
      .map(p => p.then(saveVFile))
  );

  // Yay 🎉
  console.log('Reference docs generated 🎉');
})().catch(err => console.error(err));
