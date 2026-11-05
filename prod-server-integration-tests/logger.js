import { appendFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const SEVERITY = { debug: 100, info: 200, warn: 300, error: 400 };

export class FileLogger {
  #level;
  #filePath;

  constructor(filePath, level = 'debug') {
    this.#filePath = filePath;
    this.#level = level;
    mkdirSync(dirname(filePath), { recursive: true });
  }

  getLevel() {
    return this.#level;
  }
  setLevel(level) {
    this.#level = level;
  }
  setName(_name) {}

  debug(...msg) {
    this.#log('debug', msg);
  }
  info(...msg) {
    this.#log('info', msg);
  }
  warn(...msg) {
    this.#log('warn', msg);
  }
  error(...msg) {
    this.#log('error', msg);
  }

  #log(level, msg) {
    if (SEVERITY[level] >= SEVERITY[this.#level]) {
      const entry = JSON.stringify({ level, message: msg.length === 1 ? msg[0] : msg });
      appendFileSync(this.#filePath, `${entry}\n`);
    }
  }
}
