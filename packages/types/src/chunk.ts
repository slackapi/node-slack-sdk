import type { URLSourceElement } from './block-kit/block-elements';
/**
 * Base interface for streaming message chunks.
 * https://docs.slack.dev/messaging/sending-and-scheduling-messages#text-streaming
 */
export interface Chunk {
  type: string;
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
 * An updated title of plans for task and tool calls.
 * https://docs.slack.dev/messaging/sending-and-scheduling-messages#text-streaming
 */
export interface PlanUpdateChunk extends Chunk {
  type: 'plan_update';
  title: string;
}

/**
 * Used for displaying tool execution progress in a timeline-style UI.
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
export type AnyChunk = MarkdownTextChunk | PlanUpdateChunk | TaskUpdateChunk;
