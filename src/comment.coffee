Channel = require './channel'

class Comment extends Channel
  constructor: (@_file, data = {}) ->
    super @_file._client, data

  edit: (text, callback)->
    params = {
      "id": @id
      "file": @_file.id
      "comment": text
    }
    @_client._apiCall 'files.comments.edit', params, =>
      @_onEditComment arguments...
      callback? arguments...

  _onEdit: (data)=>
    @_client.logger.debug data

  delete: (callback) ->
    params = {
      "id": @id
      "file": @_file.id
    }
    @_client._apiCall 'files.comments.delete', params, =>
      @_onDeleteComment arguments...
      callback? arguments...

  _onDelete: (data)=>
    @_client.logger.debug data

module.exports = Comment