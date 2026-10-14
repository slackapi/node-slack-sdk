---
"@slack/socket-mode": patch
---

Fix `SlackWebSocket.disconnect()` leaving the close-handshake timer orphaned when the peer drops the TCP connection after the client's close frame: the timer is cleared before it is re-armed, a socket already in the CLOSED state is cleaned up like one in CLOSING, and no timer is armed when `close()` tore the instance down synchronously. Removes the stale "Peer did not complete the close handshake in time; forcing cleanup." warning and the spurious `disconnected` that rejected an in-flight `start()`.
