---
layout: page
title: FilesCommentsFacet
permalink: /reference/FilesCommentsFacet
---
**Kind**: global class  

* [FilesCommentsFacet](#FilesCommentsFacet)
    * [.add(file, comment, [opts], [optCb])](#FilesCommentsFacet+add)
    * [.delete(file, id, [optCb])](#FilesCommentsFacet+delete)
    * [.edit(file, id, comment, [optCb])](#FilesCommentsFacet+edit)

<a name="FilesCommentsFacet+add"></a>

### filesCommentsFacet.add(file, comment, [opts], [optCb])
Add a comment to an existing file.

**Kind**: instance method of <code>[FilesCommentsFacet](#FilesCommentsFacet)</code>  
**See**: [files.comments.add](https://api.slack.com/methods/files.comments.add)  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>?</code> | File to add a comment to. |
| comment | <code>?</code> | Text of the comment to add. |
| [opts] | <code>Object</code> |  |
| opts.channel | <code>?</code> | Channel id (encoded) of which location to associate with the new   comment. |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="FilesCommentsFacet+delete"></a>

### filesCommentsFacet.delete(file, id, [optCb])
Deletes an existing comment on a file.

**Kind**: instance method of <code>[FilesCommentsFacet](#FilesCommentsFacet)</code>  
**See**: [files.comments.delete](https://api.slack.com/methods/files.comments.delete)  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>?</code> | File to delete a comment from. |
| id | <code>?</code> | The comment to delete. |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="FilesCommentsFacet+edit"></a>

### filesCommentsFacet.edit(file, id, comment, [optCb])
Edit an existing file comment.

**Kind**: instance method of <code>[FilesCommentsFacet](#FilesCommentsFacet)</code>  
**See**: [files.comments.edit](https://api.slack.com/methods/files.comments.edit)  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>?</code> | File containing the comment to edit. |
| id | <code>?</code> | The comment to edit. |
| comment | <code>?</code> | Text of the comment to edit. |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

