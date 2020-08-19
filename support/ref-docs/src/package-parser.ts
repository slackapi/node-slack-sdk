import { ApiModel } from '@microsoft/api-extractor-model';
import { Processor } from 'unified';
import { VFile } from 'vfile';
import { documentPkg, documentModel } from './documenter';

/** Describes what kind of items the documenter is handling */
export const enum DocumenterKind {
  Model = 'model',
  Package = 'package',
}

export interface DocumenterSettings {
  model: ApiModel;
}

export default function documenterAttacher(
  this: Processor,
  settings: DocumenterSettings
): void {
  if (settings === undefined) {
    throw new Error('Expected an API model to be passed as a setting.');
  }

  // Extract the model
  const { model } = settings;

  // Set the parser up
  this.Parser = (_src: string, file: VFile) => {
    // Get what kind of file this is
    const { kind } = file.data as any;

    if (kind === DocumenterKind.Model) {
      file.basename = 'index.md';
      
      const [frontmatter, document] = documentModel(model);

      file.data = { frontmatter };
      return document;
    } else if (kind === DocumenterKind.Package) {
      // Find the API package for this "file"
      const pkg = model.tryGetPackageByName(file.path || '');
      if (pkg === undefined) {
        throw new Error(
          `Cannot find API package for vfile with path '${file.path}'`
        );
      }

      const [frontmatter, document] = documentPkg(model, pkg);

      file.data = { frontmatter };
      file.basename = `${frontmatter.slug}.md`;
      return document;
    } else {
      throw new Error(`unknown documenter kind: ${kind}`);
    }
  };
}
