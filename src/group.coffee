Message = require './message'
Channel = require './channel'

class Group extends Channel
  close: ->
    params = {
      "channel": @id
    }

    @_client._apiCall 'groups.close', params, @_onClose

  _onClose: (data) =>
    @logger.debug data

  open: ->
    params = {
      "channel": @id
    }

    @_client._apiCall 'groups.open', params, @_onOpen

  _onOpen: (data) =>
    @logger.debug data

  archive: ->
    params = {
      "channel": @id
    }

    @_client._apiCall 'groups.archive', params, @_onArchive

  _onArchive: (data) =>
    @logger.debug data

  unarchive: ->
    params = {
      "channel": @id
    }

    @_client._apiCall 'groups.unarchive', params, @_onUnArchive

  _onUnArchive: (data) =>
    @logger.debug data

  createChild: ->
    params = {
      "channel": @id
    }

    @_client._apiCall 'groups.createChild', params, @_onCreateChild

  _onCreateChild: (data) =>
    @logger.debug data

module.exports = Group