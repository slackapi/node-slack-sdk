---
layout: page
title: FilesFacet
permalink: /reference/FilesFacet
---
**Kind**: global class  

* [FilesFacet](#FilesFacet)
    * [.delete(file, [optCb])](#FilesFacet+delete)
    * [.info(file, [opts], [optCb])](#FilesFacet+info)
    * [.list([opts], [optCb])](#FilesFacet+list)
    * [.revokePublicURL(file, [optCb])](#FilesFacet+revokePublicURL)
    * [.sharedPublicURL(file, [optCb])](#FilesFacet+sharedPublicURL)
    * [.upload(filename, [opts], [optCb])](#FilesFacet+upload)

<a name="FilesFacet+delete"></a>

### filesFacet.delete(file, [optCb])
Deletes a file.

**Kind**: instance method of <code>[FilesFacet](#FilesFacet)</code>  
**See**: [files.delete](https://api.slack.com/methods/files.delete)  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>?</code> | ID of file to delete. |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="FilesFacet+info"></a>

### filesFacet.info(file, [opts], [optCb])
Gets information about a team file.

**Kind**: instance method of <code>[FilesFacet](#FilesFacet)</code>  
**See**: [files.info](https://api.slack.com/methods/files.info)  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>?</code> | Specify a file by providing its ID. |
| [opts] | <code>Object</code> |  |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="FilesFacet+list"></a>

### filesFacet.list([opts], [optCb])
Lists & filters team files.

**Kind**: instance method of <code>[FilesFacet](#FilesFacet)</code>  
**See**: [files.list](https://api.slack.com/methods/files.list)  

| Param | Type | Description |
| --- | --- | --- |
| [opts] | <code>Object</code> |  |
| opts.user | <code>?</code> | Filter files created by a single user. |
| opts.channel | <code>?</code> | Filter files appearing in a specific channel, indicated by its ID. |
| opts.ts_from | <code>?</code> | Filter files created after this timestamp (inclusive). |
| opts.ts_to | <code>?</code> | Filter files created before this timestamp (inclusive). |
| opts.types | <code>?</code> | Filter files by type:   * `all` - All files   * `spaces` - Posts   * `snippets` - Snippets   * `images` - Image files   * `gdocs` - Google docs   * `zips` - Zip files   * `pdfs` - PDF files   You can pass multiple values in the types argument, like `types=spaces,snippets`.The default   value is `all`, which does not filter the list. |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="FilesFacet+revokePublicURL"></a>

### filesFacet.revokePublicURL(file, [optCb])
Revokes public/external sharing access for a file

**Kind**: instance method of <code>[FilesFacet](#FilesFacet)</code>  
**See**: [files.revokePublicURL](https://api.slack.com/methods/files.revokePublicURL)  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>?</code> | File to revoke |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="FilesFacet+sharedPublicURL"></a>

### filesFacet.sharedPublicURL(file, [optCb])
Enables a file for public/external sharing.

**Kind**: instance method of <code>[FilesFacet](#FilesFacet)</code>  
**See**: [files.sharedPublicURL](https://api.slack.com/methods/files.sharedPublicURL)  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>?</code> | File to share |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="FilesFacet+upload"></a>

### filesFacet.upload(filename, [opts], [optCb])
Uploads or creates a file.

**Kind**: instance method of <code>[FilesFacet](#FilesFacet)</code>  
**See**: [files.upload](https://api.slack.com/methods/files.upload)  

| Param | Type | Description |
| --- | --- | --- |
| filename | <code>?</code> | Filename of file. |
| [opts] | <code>Object</code> |  |
| opts.file | <code>?</code> | File contents via `multipart/form-data`. If omitting this parameter, you   must submit `content`. |
| opts.content | <code>?</code> | File contents via a POST variable. If omitting this parameter, you   must provide a `file`. |
| opts.filetype | <code>?</code> | A [file type](/types/file#file_types) identifier. |
| opts.title | <code>?</code> | Title of file. |
| opts.initial_comment | <code>?</code> | Initial comment to add to file. |
| opts.channels | <code>?</code> | Comma-separated list of channel names or IDs where the file will be   shared. |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

