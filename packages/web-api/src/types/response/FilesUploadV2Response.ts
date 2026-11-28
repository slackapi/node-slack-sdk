import type { WebAPICallResult } from '../../WebClient';
import type { FilesCompleteUploadExternalResponse } from './FilesCompleteUploadExternalResponse';

export type FilesUploadV2Response = WebAPICallResult & {
  error?: string;
  files: FilesCompleteUploadExternalResponse[];
  needed?: string;
  ok?: boolean;
  provided?: string;
  warning?: string;
};
