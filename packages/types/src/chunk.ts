import { ConsoleLogger, LogLevel } from '@slack/logger';

const logger = new ConsoleLogger();
logger.setLevel(LogLevel.DEBUG);

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
 * URL source for task update chunks.
 */
export interface URLSource {
  type: 'url';
  url: string;
  text: string;
  icon_url?: string;
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
  sources?: URLSource[];
}

/**
 * Union type of all possible chunk types
 */
export type AnyChunk = MarkdownTextChunk | PlanUpdateChunk | TaskUpdateChunk;

/**
 * Parse a chunk object and return the appropriate typed chunk.
 * Returns null if the chunk is invalid or unknown.
 */
export function parseChunk(chunk: unknown): AnyChunk | null {
  if (!chunk || typeof chunk !== 'object') {
    return null;
  }

  const chunkObj = chunk as Record<string, unknown>;

  if (!('type' in chunkObj) || typeof chunkObj.type !== 'string') {
    logger.debug('Unknown chunk detected and skipped (missing type)', chunk);
    return null;
  }

  const { type } = chunkObj;

  if (type === 'markdown_text') {
    if (typeof chunkObj.text === 'string') {
      return chunkObj as unknown as MarkdownTextChunk;
    }
    logger.debug('Invalid MarkdownTextChunk (missing text property)', chunk);
    return null;
  }

  if (type === 'plan_update') {
    if (typeof chunkObj.title === 'string') {
      return chunkObj as unknown as PlanUpdateChunk;
    }
    logger.debug('Invalid PlanUpdateChunk (missing title property)', chunk);
    return null;
  }

  if (type === 'task_update') {
    const taskChunk = chunkObj as Partial<TaskUpdateChunk>;
    if (
      typeof taskChunk.id === 'string' &&
      typeof taskChunk.title === 'string' &&
      typeof taskChunk.status === 'string' &&
      ['pending', 'in_progress', 'complete', 'error'].includes(taskChunk.status)
    ) {
      return chunkObj as unknown as TaskUpdateChunk;
    }
    logger.debug('Invalid TaskUpdateChunk (missing required properties)', chunk);
    return null;
  }

  logger.debug(`Unknown chunk type detected and skipped: ${type}`, chunk);
  return null;
}
