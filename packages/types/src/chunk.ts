import type { URLSourceElement } from './block-kit/block-elements';
import type { AnyBlock } from './block-kit/blocks';

/**
 * Base interface for streaming message chunks.
 * https://docs.slack.dev/messaging/sending-and-scheduling-messages#text-streaming
 */
export interface Chunk {
  type: string;
}

/**
 * Used for passing an array of blocks within a streaming message.
 * https://docs.slack.dev/changelog/2026/04/16/block-kit-new-blocks/
 */
export interface BlocksChunk extends Chunk {
  type: 'blocks';
  /** @description An array of {@link AnyBlock} objects. Maximum of 50 blocks. */
  blocks: AnyBlock[];
}

/**
 * Used for streaming text content with markdown formatting support.
 * https://docs.slack.dev/messaging/sending-and-scheduling-messages#text-streaming
 */
export interface MarkdownTextChunk extends Chunk {
  type: 'markdown_text';
  text: string;
}

/**
 * Used for displaying an updated title of a plan.
 * https://docs.slack.dev/messaging/sending-and-scheduling-messages#text-streaming
 */
export interface PlanUpdateChunk extends Chunk {
  type: 'plan_update';
  title: string;
}

/**
 * Used for displaying task progress in a timeline-style UI.
 * https://docs.slack.dev/messaging/sending-and-scheduling-messages#text-streaming
 */
export interface TaskUpdateChunk extends Chunk {
  type: 'task_update';
  id: string;
  title: string;
  status: 'pending' | 'in_progress' | 'complete' | 'error';
  details?: string;
  output?: string;
  sources?: URLSourceElement[];
}

/**
 * Union type of all possible chunk types
 */
export type AnyChunk = BlocksChunk | MarkdownTextChunk | PlanUpdateChunk | TaskUpdateChunk;
