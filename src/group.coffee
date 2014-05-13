Message = require './message'
Channel = require './channel'

class Group extends Channel
  close: ->
    params = {
      "channel": @id
    }

    @_client._apiCall 'groups.close', params, @_onClose

  _onClose: (data) =>
    @_client.logger.debug data

  open: ->
    params = {
      "channel": @id
    }

    @_client._apiCall 'groups.open', params, @_onOpen

  _onOpen: (data) =>
    @_client.logger.debug data

  archive: ->
    params = {
      "channel": @id
    }

    @_client._apiCall 'groups.archive', params, @_onArchive

  _onArchive: (data) =>
    @_client.logger.debug data

  unarchive: ->
    params = {
      "channel": @id
    }

    @_client._apiCall 'groups.unarchive', params, @_onUnArchive

  _onUnArchive: (data) =>
    @_client.logger.debug data

  createChild: ->
    params = {
      "channel": @id
    }

    @_client._apiCall 'groups.createChild', params, @_onCreateChild

  _onCreateChild: (data) =>
    @_client.logger.debug data

module.exports = Group