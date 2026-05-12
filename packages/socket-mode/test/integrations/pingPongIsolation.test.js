const assert = require('node:assert/strict');
const { describe, it, beforeEach, afterEach } = require('node:test');
const { SocketModeClient } = require('../../src/SocketModeClient');
const { LogLevel } = require('../../src/logger');
const { WebSocketServer } = require('ws');
const { createServer } = require('node:http');
const sinon = require('sinon');

describe('Multi-connection ping/pong isolation (diagnostics_channel)', { timeout: 10000 }, () => {
	const HTTP_SERVER_PORT = 12349;
	const WSS_PORT = 23460;
	const HTTP_SERVER_PORT_B = 12351;
	const WSS_PORT_B = 23462;

	let httpServer = null;
	let wsServer = null;

	let httpServerB = null;
	let wsServerB = null;

	function createClient(httpPort, options = {}) {
		const client = new SocketModeClient({
			appToken: 'whatever',
			logLevel: LogLevel.ERROR,
			clientOptions: { slackApiUrl: `http://localhost:${httpPort}/` },
			clientPingTimeout: 100,
			serverPingTimeout: 100,
			pingPongLoggingEnabled: false,
			...options,
		});
		return client;
	}

	afterEach(async () => {
		if (wsServer) wsServer.close();
		wsServer = null;
		if (wsServerB) wsServerB.close();
		wsServerB = null;
		if (httpServer) httpServer.close();
		httpServer = null;
		if (httpServerB) httpServerB.close();
		httpServerB = null;
		sinon.restore();
	});

	it('pong timeout on one client does not affect the other', async () => {
		// Server A: does NOT auto-respond with pong
		httpServer = createServer((_req, res) => {
			res.writeHead(200, { 'content-type': 'application/json' });
			res.end(JSON.stringify({ ok: true, url: `ws://localhost:${WSS_PORT}/` }));
		});
		httpServer.listen(HTTP_SERVER_PORT);
		wsServer = new WebSocketServer({ port: WSS_PORT, autoPong: false });
		wsServer.on('connection', (ws) => {
			ws.on('error', () => { });
			ws.send(JSON.stringify({ type: 'hello' }));
		});

		// Server B: auto-responds with pong (default)
		httpServerB = createServer((_req, res) => {
			res.writeHead(200, { 'content-type': 'application/json' });
			res.end(JSON.stringify({ ok: true, url: `ws://localhost:${WSS_PORT_B}/` }));
		});
		httpServerB.listen(HTTP_SERVER_PORT_B);
		wsServerB = new WebSocketServer({ port: WSS_PORT_B });
		wsServerB.on('connection', (ws) => {
			ws.on('error', () => { });
			ws.send(JSON.stringify({ type: 'hello' }));
		});

		const clientA = createClient(HTTP_SERVER_PORT, { autoReconnectEnabled: false });
		const clientB = createClient(HTTP_SERVER_PORT_B, { autoReconnectEnabled: false });

		const clientADisconnected = sinon.spy(() => { });
		const clientBDisconnected = sinon.spy(() => { });
		clientA.on('disconnected', clientADisconnected);
		clientB.on('disconnected', clientBDisconnected);

		await clientA.start();
		await clientB.start();

		try {
			await sleep(300);
			assert.strictEqual(clientADisconnected.calledOnce, true, 'Client A should disconnect due to pong timeout');
			assert.strictEqual(clientBDisconnected.notCalled, true, 'Client B should remain connected');
		} finally {
			await clientB.disconnect();
		}
	});

	it('server ping timeout on one client does not affect the other', async () => {
		wsServer = new WebSocketServer({ port: WSS_PORT });
		httpServer = createServer((_req, res) => {
			res.writeHead(200, { 'content-type': 'application/json' });
			res.end(JSON.stringify({ ok: true, url: `ws://localhost:${WSS_PORT}/` }));
		});
		httpServer.listen(HTTP_SERVER_PORT);

		let connectionCount = 0;
		let pingIntervalB = null;
		wsServer.on('connection', (ws) => {
			connectionCount++;
			ws.on('error', () => { });
			ws.send(JSON.stringify({ type: 'hello' }));
			if (connectionCount === 1) {
				// Client A: server sends one ping then stops
				ws.ping();
			} else {
				// Client B: server sends pings continuously
				ws.ping();
				pingIntervalB = setInterval(() => ws.ping(), 50);
			}
		});

		const clientA = createClient(HTTP_SERVER_PORT, { autoReconnectEnabled: false });
		const clientB = createClient(HTTP_SERVER_PORT, { autoReconnectEnabled: false });

		let clientADisconnected = false;
		let clientBDisconnected = false;
		clientA.on('disconnected', () => {
			clientADisconnected = true;
		});
		clientB.on('disconnected', () => {
			clientBDisconnected = true;
		});

		await clientA.start();
		await clientB.start();

		try {
			await sleep(300);
			assert.strictEqual(clientADisconnected, true, 'Client A should disconnect due to server ping timeout');
			assert.strictEqual(clientBDisconnected, false, 'Client B should remain connected');
		} finally {
			if (pingIntervalB) clearInterval(pingIntervalB);
			await clientB.disconnect();
		}
	});

	it('reconnection of one client does not disrupt the other', async () => {
		httpServer = createServer((_req, res) => {
			res.writeHead(200, { 'content-type': 'application/json' });
			res.end(JSON.stringify({ ok: true, url: `ws://localhost:${WSS_PORT}/` }));
		});
		httpServer.listen(HTTP_SERVER_PORT);
		wsServer = new WebSocketServer({ port: WSS_PORT });

		let pingIntervalB = null;
		let connectionCount = 0;
		let exposedWebSocket = null;
		wsServer.on('connection', (ws) => {
			connectionCount++;
			ws.on('error', () => { });
			ws.send(JSON.stringify({ type: 'hello' }));
			if (connectionCount === 1) {
				exposedWebSocket = ws;
			} else if (connectionCount === 2) {
				ws.ping();
				pingIntervalB = setInterval(() => ws.ping(), 50);
			} else {
				// Client A reconnecting
				exposedWebSocket = ws;
			}
		});

		const clientA = createClient(HTTP_SERVER_PORT, { autoReconnectEnabled: true });
		const clientB = createClient(HTTP_SERVER_PORT, { autoReconnectEnabled: true });

		const clientBClosed = sinon.spy(() => { });
		clientB.on('close', clientBClosed);

		await clientA.start();
		await clientB.start();

		try {
			const reconnectedWaiter = new Promise((res) => clientA.on('connected', res));
			if (exposedWebSocket) exposedWebSocket.terminate();
			await reconnectedWaiter;

			assert.strictEqual(clientBClosed.notCalled, true, 'Client B should not have closed during Client A reconnection');

			await sleep(200);
			assert.strictEqual(clientBClosed.notCalled, true, 'Client B should remain connected after Client A reconnection');
		} finally {
			if (pingIntervalB) clearInterval(pingIntervalB);
			await clientA.disconnect();
			await clientB.disconnect();
		}
	});

	it('disconnected client handlers do not fire for other connections', async () => {
		const loggerSpyA = sinon.stub();
		const noop = () => { };

		httpServer = createServer((_req, res) => {
			res.writeHead(200, { 'content-type': 'application/json' });
			res.end(JSON.stringify({ ok: true, url: `ws://localhost:${WSS_PORT}/` }));
		});
		httpServer.listen(HTTP_SERVER_PORT);
		wsServer = new WebSocketServer({ port: WSS_PORT });

		let connectionCount = 0;
		let pingIntervalB = null;
		wsServer.on('connection', (ws) => {
			connectionCount++;
			ws.on('error', () => { });
			ws.send(JSON.stringify({ type: 'hello' }));
			if (connectionCount === 1) {
				// do nothing on first connection
			} else {
				ws.ping();
				pingIntervalB = setInterval(() => ws.ping(), 50);
			}
		});

		const clientA = createClient(HTTP_SERVER_PORT, {
			autoReconnectEnabled: false,
			pingPongLoggingEnabled: true,
			logLevel: 'debug',
			logger: { debug: loggerSpyA, info: noop, warn: noop, error: noop, getLevel: () => 'debug' },
		});
		const clientB = createClient(HTTP_SERVER_PORT, { autoReconnectEnabled: false });

		await clientA.start();
		await clientB.start();

		await clientA.disconnect();

		loggerSpyA.resetHistory();

		try {
			await sleep(200);

			const pingPongLogs = loggerSpyA
				.getCalls()
				.filter((call) => call.args[0] && (call.args[0].includes('ping') || call.args[0].includes('pong')));
			assert.strictEqual(pingPongLogs.length, 0, 'Client A should not receive any ping/pong events after disconnect');
		} finally {
			if (pingIntervalB) clearInterval(pingIntervalB);
			await clientB.disconnect();
		}
	});
});

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
