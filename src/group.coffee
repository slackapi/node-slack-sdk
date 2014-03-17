class Group
  constructor: (@id, options = {}) ->
    for k of (options or {})
      @[k] = options[k]
    @['name'] ||= @id

module.exports = Group