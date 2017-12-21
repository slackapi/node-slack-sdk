---
layout: page
title: RemindersFacet
permalink: /reference/RemindersFacet
---
**Kind**: global class  

* [RemindersFacet](#RemindersFacet)
    * [.add(text, time, [opts], [optCb])](#RemindersFacet+add)
    * [.complete(reminder, [optCb])](#RemindersFacet+complete)
    * [.delete(reminder, [optCb])](#RemindersFacet+delete)
    * [.info(reminder, [optCb])](#RemindersFacet+info)
    * [.list([optCb])](#RemindersFacet+list)

<a name="RemindersFacet+add"></a>

### remindersFacet.add(text, time, [opts], [optCb])
Creates a reminder.

**Kind**: instance method of <code>[RemindersFacet](#RemindersFacet)</code>  
**See**: [reminders.add](https://api.slack.com/methods/reminders.add)  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>?</code> | The content of the reminder |
| time | <code>?</code> | When this reminder should happen: the Unix timestamp (up to five years from   now), the number of seconds until the reminder (if within 24 hours), or a natural language   description (Ex. "in 15 minutes," or "every Thursday") |
| [opts] | <code>Object</code> |  |
| opts.user | <code>?</code> | The user who will receive the reminder. If no user is specified, the   reminder will go to user who created it. |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="RemindersFacet+complete"></a>

### remindersFacet.complete(reminder, [optCb])
Marks a reminder as complete.

**Kind**: instance method of <code>[RemindersFacet](#RemindersFacet)</code>  
**See**: [reminders.complete](https://api.slack.com/methods/reminders.complete)  

| Param | Type | Description |
| --- | --- | --- |
| reminder | <code>?</code> | The ID of the reminder to be marked as complete |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="RemindersFacet+delete"></a>

### remindersFacet.delete(reminder, [optCb])
Deletes a reminder.

**Kind**: instance method of <code>[RemindersFacet](#RemindersFacet)</code>  
**See**: [reminders.delete](https://api.slack.com/methods/reminders.delete)  

| Param | Type | Description |
| --- | --- | --- |
| reminder | <code>?</code> | The ID of the reminder |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="RemindersFacet+info"></a>

### remindersFacet.info(reminder, [optCb])
Gets information about a reminder.

**Kind**: instance method of <code>[RemindersFacet](#RemindersFacet)</code>  
**See**: [reminders.info](https://api.slack.com/methods/reminders.info)  

| Param | Type | Description |
| --- | --- | --- |
| reminder | <code>?</code> | The ID of the reminder |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="RemindersFacet+list"></a>

### remindersFacet.list([optCb])
Lists all reminders created by or for a given user.

**Kind**: instance method of <code>[RemindersFacet](#RemindersFacet)</code>  
**See**: [reminders.list](https://api.slack.com/methods/reminders.list)  

| Param | Type | Description |
| --- | --- | --- |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

