import type child from 'node:child_process';
import EventEmitter from 'node:events';
import stream from 'node:stream';

export function mockProcess(): child.ChildProcessWithoutNullStreams {
  const spawnProcess = new EventEmitter() as child.ChildProcessWithoutNullStreams;
  spawnProcess.stdout = new EventEmitter() as stream.Readable;
  spawnProcess.stderr = new EventEmitter() as stream.Readable;
  spawnProcess.stdin = new stream.Writable();
  return spawnProcess;
}
