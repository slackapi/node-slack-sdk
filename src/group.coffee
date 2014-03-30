Message = require './message'
Channel = require './channel'

class Group extends Channel
  close: ->
    params = {
      "channel": @id
    }

    @_client._apiCall 'groups.close', params, @_onClose

  _onClose: (data) =>
    console.log data

  open: ->
    params = {
      "channel": @id
    }

    @_client._apiCall 'groups.open', params, @_onOpen

  _onOpen: (data) =>
    console.log data

  archive: ->
    params = {
      "channel": @id
    }

    @_client._apiCall 'groups.archive', params, @_onArchive

  _onArchive: (data) =>
    console.log data

  unarchive: ->
    params = {
      "channel": @id
    }

    @_client._apiCall 'groups.unarchive', params, @_onUnArchive

  _onUnArchive: (data) =>
    console.log data

  createChild: ->
    params = {
      "channel": @id
    }

    @_client._apiCall 'groups.createChild', params, @_onCreateChild

  _onCreateChild: (data) =>
    console.log data

module.exports = Group