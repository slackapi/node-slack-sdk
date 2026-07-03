/// <reference lib="es2017" />

export {
  CodedError,
  ErrorCode,
  IncomingWebhookHTTPError,
  IncomingWebhookRequestError,
  IncomingWebhookSendError,
  WebhookTriggerHTTPError,
  WebhookTriggerRequestError,
  WebhookTriggerSendError,
} from './errors';

export {
  IncomingWebhook,
  IncomingWebhookDefaultArguments,
  IncomingWebhookResult,
  IncomingWebhookSendArguments,
} from './IncomingWebhook';

export { addAppMetadata } from './instrument';

export {
  fiveRetriesInFiveMinutes,
  RetryOptions,
  rapidRetryPolicy,
  tenRetriesInAboutThirtyMinutes,
} from './retry-policies';

export {
  WebhookTrigger,
  WebhookTriggerDefaultArguments,
  WebhookTriggerResult,
  WebhookTriggerSendArguments,
} from './WebhookTrigger';
