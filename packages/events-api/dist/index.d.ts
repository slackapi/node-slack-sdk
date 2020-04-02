import { SlackEventAdapter, EventAdapterOptions } from './adapter';
export { verifyRequestSignature, errorCodes } from './http-handler';
/**
 * Creates a new {@link SlackEventAdapter}.
 */
export declare function createEventAdapter(signingSecret: string, options?: EventAdapterOptions): SlackEventAdapter;
//# sourceMappingURL=index.d.ts.map