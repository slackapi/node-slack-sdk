###################################################################
# Setup the tests
###################################################################
should = require 'should'

Group = require '../src/group'

# Rather than call out to the service, mock the API.
class MockClient
  constructor: (@verifyParams, @verifyMethod) ->
    @logger = { debug: -> }

  _apiCall: (method, params, callback) ->
    @verifyParams params if @verifyParams
    @verifyMethod method if @verifyMethod
    callback status: 'ok'

# Generate a new instance for each test.
channel = null

beforeEach ->
  channel = new Group

###################################################################
# Start the tests
###################################################################

describe 'Channel', ->

  describe '#fetchHistory', ->
    it 'should pass oldest to _apiCall', ->
      oldest = 123;
      channel._client = new MockClient (params) ->
        params.oldest.should.equal oldest
      channel.fetchHistory null, oldest

    it 'should pass latest to _apiCall', ->
      latest = 456;
      channel._client = new MockClient (params) ->
        params.latest.should.equal latest
      channel.fetchHistory latest

    it 'should use correct method', ->
      channel._client = new MockClient null, (method) ->
        method.should.equal 'Group'
      channel.fetchHistory

    it 'should pass count to _apiCall', ->
      channel._client = new MockClient (params) ->
        params.count.should.equal 3
      channel.fetchHistory null, null, 3

    it 'should call callback', (done) ->
      channel._client = new MockClient
      latest = 123
      oldest = 456
      count = 3
      channel.fetchHistory latest, oldest, count, (result) ->
        result.should.not.be.null
        done()
