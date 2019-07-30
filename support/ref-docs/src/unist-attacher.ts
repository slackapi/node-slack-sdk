import { ApiModel } from '@microsoft/api-extractor-model';
import { Processor } from 'unified';
import { VFile } from 'vfile';
import { documentPkg } from './documenter';

export interface DocumenterSettings {
  model: ApiModel;
}

export default function documenterAttacher(
  this: Processor,
  settings?: DocumenterSettings
): void {
  // Extract the model from settings
  if (settings === undefined) {
    throw new Error('Expected an API model to be passed as a setting.');
  }
  const model = settings.model;

  // TODO: remove `as any`
  // Set the parser up
  (this as any).Parser = (_src: string, file: VFile) => {
    // Find the API package for this "file"
    const pkg = model.tryGetPackageByName(file.path || '');
    if (pkg === undefined) {
      throw new Error(
        `Cannot find API package for vfile with path '${file.path}'`
      );
    }

    file.extname = '.md';
    return documentPkg(model, pkg);
  };
}
