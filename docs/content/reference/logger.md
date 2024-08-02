---
title: "@slack/logger"
---

## Classes

### ConsoleLogger

Default logger which logs to stdout and stderr

##### new ConsoleLogger()

Constructs a new instance of the `ConsoleLogger` class

#### Methods

##### debug(msg)

Log a debug message

**Parameters:**

| Name | Type | Required |
| --- | --- | --- |
| msg | `any[]` | ✓   |

**Returns** `void`

##### error(msg)

Log an error message

**Parameters:**

| Name | Type | Required |
| --- | --- | --- |
| msg | `any[]` | ✓   |

**Returns** `void`

##### getLevel()

**Returns** [`LogLevel`](#loglevel)

##### info(msg)

Log an info message

**Parameters:**

| Name | Type | Required | 
| --- | --- | --- |
| msg | `any[]` | ✓   |

**Returns** `void`

##### setLevel(level)

Sets the instance's log level so that only messages which are equal or more severe are output to the console.

**Parameters:**

| Name | Type | Required |
| --- | --- | --- | 
| level | [`LogLevel`](#loglevel) | ✓   |

**Returns** `void`

##### setName(name)

Set the instance's name, which will appear on each log line before the message.

**Parameters:**

| Name | Type | Required |
| --- | --- | --- |
| name | `string` | ✓   |

**Returns** `void`

##### warn(msg)

Log a warning message

**Parameters:**

| Name | Type | Required | 
| --- | --- | --- |
| msg | `any[]` | ✓   |

**Returns** `void`

## Enums

### LogLevel

Severity levels for log entries

#### Members

*   **DEBUG**
*   **ERROR**
*   **INFO**
*   **WARN**

## Interfaces

### Logger

Interface for objects where objects in this package's logs can be sent (can be used as `logger` option).

#### Methods

##### debug(msg)

Output debug message

**Parameters:**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| msg | `any[]` | ✓   | any data to log |

**Returns** `void`

##### error(msg)

Output error message

**Parameters:**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| msg | `any[]` | ✓   | any data to log |

**Returns** `void`

##### getLevel()

Return the current LogLevel.

**Returns** [`LogLevel`](#loglevel)

##### info(msg)

Output info message

**Parameters:**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| msg | `any[]` | ✓   | any data to log |

**Returns** `void`

##### setLevel(level)

This disables all logging below the given level, so that after a log.setLevel("warn") call log.warn("something") or log.error("something") will output messages, but log.info("something") will not.

**Parameters:**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| level | [`LogLevel`](#loglevel) | ✓   | as a string, like 'error' (case-insensitive) |

**Returns** `void`

##### setName(name)

This allows the instance to be named so that they can easily be filtered when many loggers are sending output to the same destination.

**Parameters:**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| name | `string` | ✓   | as a string, will be output with every log after the level |

**Returns** `void`

##### warn(msg)

Output warn message

**Parameters:**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| msg | `any[]` | ✓   | any data to log |

**Returns** `void`