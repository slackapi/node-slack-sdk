Channel = require './channel'
Comment = require './comment'

class File extends Channel
  constructor: (@_client, data = {}) ->
    super @_client, data

    @comments = {}
    @_fetchedComments = false

    if @comments_count > 0
      @setComments()
    else
      @_fetchedComments = true

  setComments: ->
    params = {
      "file": @id
    }
    @_client._apiCall 'files.info', params, @_onSetComments

  _onSetComments: (data)=>
    @_client.logger.debug data

    @_fetchedComments = true
    for k of data.comments
      c = data.comments[k]
      @comments[c.id] = @newComment c

    @_client.emit 'fetchCommentsOn' + @id, data.comments

  newComment: (comment)->
    return new Comment @, comment

  getComments: ->
    if @_fetchedComments
      @comments
    else
      null

  edit: (params)->
    params.file = @id
    @_client._apiCall 'files.edit', params, @_onEdit

  _onEdit: (data)=>
    @_client.logger.debug data

  delete: ()->
    params = {
      "file": @id
    }
    @_client._apiCall 'files.delete', params, @_onDelete

  _onDelete: (data)=>
    @_client.logger.debug data


  addComment: (text)->
    params = {
      "file": @id,
      "comment": text
    }
    @_client._apiCall 'files.comments.add', params, @_onAddComment

  _onAddComment: (data)=>
    @_client.logger.debug data

  # TODO Not Supported yet

  # share: (text)->
  #   params = {
  #     "file": @id
  #   }
  #   @_client._apiCall 'files.share', params, @_onShare

  # _onShare: (data)=>
  #   @_client.logger.debug data

  # unshared: (text)->
  #   params = {
  #     "file": @id
  #   }
  #   @_client._apiCall 'files.unshared', params, @_onUnshared

  # _onUnshared: (data)=>
  #   @_client.logger.debug data

  # public: (text)->
  #   params = {
  #     "file": @id
  #   }
  #   @_client._apiCall 'files.public', params, @_onPublic

  # _onPublic: (data)=>
  #   @_client.logger.debug data

module.exports = File