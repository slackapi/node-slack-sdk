
describe('RTM API Message Handlers: Star Events', function () {

  describe('star_added', function () {

    it('stars a message when a `star_added` message with a `message` property is received');
    it('stars a file when a `star_added` message with a `message` property is received');
    it('stars a file_comment when a `star_added` msg with a `file_comment` prop is received');
    it('stars a channel when a `star_added` message with a `channel` property is received');
    it('stars a DM when a `star_added` message with a `im` property is received');
    it('stars a group when a `star_added` message with a `group` property is received');

  });

  describe('star_removed', function () {

    it('unstars a message when a `star_removed` message with a `message` property is received');
    it('unstars a file when a `star_removed` message with a `message` property is received');
    it('unstars a file_comment when a `star_removed` msg with a `file_comment` prop is received');
    it('unstars a channel when a `star_removed` message with a `channel` property is received');
    it('unstars a DM when a `star_removed` message with a `im` property is received');
    it('unstars a group when a `star_removed` message with a `group` property is received');

  });

});
