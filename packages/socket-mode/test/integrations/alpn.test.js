const assert = require('node:assert/strict');
const { createServer } = require('node:net');
const { describe, it, afterEach } = require('node:test');
const { EventEmitter } = require('eventemitter3');
const { SlackWebSocket } = require('../../src/SlackWebSocket');
const { LogLevel } = require('../../src/logger');

const ALPN_EXTENSION_TYPE = 0x0010;

/**
 * Reads the ALPN protocols a client offers from a raw TLS ClientHello (RFC 8446 section 4.1.2).
 * Parsing the hello directly means the test needs no certificate: the handshake never completes.
 */
function offeredAlpnProtocols(hello) {
  let offset = 5 + 4 + 2 + 32; // record header, handshake header, legacy_version, random
  offset += 1 + hello.readUInt8(offset); // legacy_session_id
  offset += 2 + hello.readUInt16BE(offset); // cipher_suites
  offset += 1 + hello.readUInt8(offset); // legacy_compression_methods
  const extensionsEnd = offset + 2 + hello.readUInt16BE(offset);
  offset += 2;
  while (offset < extensionsEnd) {
    const type = hello.readUInt16BE(offset);
    const length = hello.readUInt16BE(offset + 2);
    offset += 4;
    if (type === ALPN_EXTENSION_TYPE) {
      const protocols = [];
      const listEnd = offset + 2 + hello.readUInt16BE(offset);
      for (let p = offset + 2; p < listEnd; p += 1 + hello.readUInt8(p)) {
        protocols.push(hello.toString('ascii', p + 1, p + 1 + hello.readUInt8(p)));
      }
      return protocols;
    }
    offset += length;
  }
  return [];
}

// undici v8 flipped buildConnector's allowH2 default to true, so the default dispatcher would offer h2
// over ALPN and could negotiate a WebSocket over HTTP/2. Slack's WebSocket endpoints expect HTTP/1.1.
describe('Default dispatcher ALPN', { timeout: 10000 }, () => {
  const TLS_PORT = 23470;

  let server = null;
  let sws = null;

  afterEach(() => {
    if (sws) sws.disconnect();
    sws = null;
    if (server) server.close();
    server = null;
  });

  it('offers only http/1.1', async () => {
    const offered = new Promise((resolve) => {
      server = createServer((socket) => {
        socket.once('data', (hello) => {
          resolve(offeredAlpnProtocols(hello));
          socket.destroy();
        });
      });
      server.listen(TLS_PORT);
    });

    sws = new SlackWebSocket({
      url: `wss://localhost:${TLS_PORT}/`,
      client: new EventEmitter(),
      logLevel: LogLevel.ERROR,
      serverPingTimeoutMS: 30000,
      clientPingTimeoutMS: 5000,
    });
    sws.connect();

    assert.deepStrictEqual(await offered, ['http/1.1']);
  });
});
