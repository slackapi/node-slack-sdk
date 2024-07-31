import child from 'child_process';
import EventEmitter from 'events';
import stream from 'stream';

export function mockProcess(): child.ChildProcessWithoutNullStreams {
  const spawnProcess = new EventEmitter() as child.ChildProcessWithoutNullStreams;
  spawnProcess.stdout = new EventEmitter() as stream.Readable;
  spawnProcess.stderr = new EventEmitter() as stream.Readable;
  spawnProcess.stdin = new stream.Writable();
  return spawnProcess;
}
