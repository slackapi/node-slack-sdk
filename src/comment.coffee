Channel = require './channel'

class Comment extends Channel
  constructor: (@_file, data = {}) ->
    super @_file._client, data

  edit: (text)->
    params = {
      "id": @id
      "file": @_file.id
      "comment": text
    }
    @_client._apiCall 'files.comments.edit', params, @_onEditComment

  _onEdit: (data)=>
    @_client.logger.debug data

  delete: ()->
    params = {
      "id": @id
      "file": @_file.id
    }
    @_client._apiCall 'files.comments.delete', params, @_onDeleteComment

  _onDelete: (data)=>
    @_client.logger.debug data

module.exports = Comment