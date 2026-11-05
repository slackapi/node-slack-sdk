import { expectAssignable, expectError } from 'tsd';
import type { AnyChunk, BlocksChunk } from '../src/index';

// BlocksChunk
// -- sad path
expectError<BlocksChunk>({});
expectError<BlocksChunk>({ type: 'blocks' });
expectError<BlocksChunk>({ blocks: [] });

// -- happy path
expectAssignable<BlocksChunk>({ type: 'blocks', blocks: [] });
expectAssignable<BlocksChunk>({
  type: 'blocks',
  blocks: [
    {
      type: 'section',
      text: { type: 'plain_text', text: "Sandra's plan outline" },
    },
  ],
});
expectAssignable<BlocksChunk>({
  type: 'blocks',
  blocks: [{ type: 'divider' }, { type: 'header', text: { type: 'plain_text', text: 'Hello' } }],
});
// Unknown block types accepted via generic Block interface
expectAssignable<BlocksChunk>({
  type: 'blocks',
  blocks: [{ type: 'future_block_type' }],
});

// BlocksChunk is assignable to AnyChunk
expectAssignable<AnyChunk>({ type: 'blocks', blocks: [] });
