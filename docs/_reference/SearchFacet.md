---
layout: page
title: SearchFacet
permalink: /reference/SearchFacet
---
**Kind**: global class  

* [SearchFacet](#SearchFacet)
    * [.all(query, [opts], [optCb])](#SearchFacet+all)
    * [.files(query, [opts], [optCb])](#SearchFacet+files)
    * [.messages(query, [opts], [optCb])](#SearchFacet+messages)

<a name="SearchFacet+all"></a>

### searchFacet.all(query, [opts], [optCb])
Searches for messages and files matching a query.

**Kind**: instance method of <code>[SearchFacet](#SearchFacet)</code>  
**See**: [search.all](https://api.slack.com/methods/search.all)  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>?</code> | Search query. May contains booleans, etc. |
| [opts] | <code>Object</code> |  |
| opts.sort | <code>?</code> | Return matches sorted by either `score` or `timestamp`. |
| opts.sort_dir | <code>?</code> | Change sort direction to ascending (`asc`) or descending (`desc`). |
| opts.highlight | <code>?</code> | Pass a value of `1` to enable query highlight markers (see below). |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="SearchFacet+files"></a>

### searchFacet.files(query, [opts], [optCb])
Searches for files matching a query.

**Kind**: instance method of <code>[SearchFacet](#SearchFacet)</code>  
**See**: [search.files](https://api.slack.com/methods/search.files)  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>?</code> | Search query. May contain booleans, etc. |
| [opts] | <code>Object</code> |  |
| opts.sort | <code>?</code> | Return matches sorted by either `score` or `timestamp`. |
| opts.sort_dir | <code>?</code> | Change sort direction to ascending (`asc`) or descending (`desc`). |
| opts.highlight | <code>?</code> | Pass a value of `1` to enable query highlight markers (see below). |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="SearchFacet+messages"></a>

### searchFacet.messages(query, [opts], [optCb])
Searches for messages matching a query.

**Kind**: instance method of <code>[SearchFacet](#SearchFacet)</code>  
**See**: [search.messages](https://api.slack.com/methods/search.messages)  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>?</code> | Search query. May contains booleans, etc. |
| [opts] | <code>Object</code> |  |
| opts.sort | <code>?</code> | Return matches sorted by either `score` or `timestamp`. |
| opts.sort_dir | <code>?</code> | Change sort direction to ascending (`asc`) or descending (`desc`). |
| opts.highlight | <code>?</code> | Pass a value of `1` to enable query highlight markers (see below). |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

