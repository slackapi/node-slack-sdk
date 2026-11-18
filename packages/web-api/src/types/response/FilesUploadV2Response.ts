import type { WebAPICallResult } from '../../WebClient';
import type { FilesCompleteUploadExternalResponse } from './FilesCompleteUploadExternalResponse';

// Manual addition pending regeneration
export interface FilesUploadV2Response extends WebAPICallResult {
  files: FilesCompleteUploadExternalResponse[];
}
