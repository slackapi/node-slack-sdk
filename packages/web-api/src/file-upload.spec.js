require('mocha');
const { assert } = require('chai');
const sinon = require('sinon');
const { createReadStream } = require('fs');
const { ErrorCode } = require('./errors');
const { getFileDataAsStream, getFileDataLength, getFileData, getFileUpload, buildLegacyFileTypeWarning, buildMissingExtensionWarning, buildMissingFileNameWarning, buildFileSizeErrorMsg } = require('./file-upload');

describe('file-upload', () => {
  describe('getFileUpload', () =>{
    it('returns a fileUploadEntry', async () => {
      const valid = {
        filename: 'test.txt',
        file: Buffer.from('test'),
        title: 'My title',
        alt_text: 'an image of a thing',
        initial_comment: 'lorem ipsum',
      };
      const res = await getFileUpload(valid);
      // supplied values
      assert.equal(valid.initial_comment, res.initial_comment);
      assert.equal(valid.alt_text, res.alt_text);
      assert.equal(valid.title, res.title);
      assert.equal(valid.filename, res.filename);
        
      // calculated values
      assert.isDefined(res.data);
      assert.isDefined(res.length);
    });
    it('warns if legacy filetype', async () => {
      this.logger = {
        warn: sinon.spy(),
      };
      const containsFileType = {
        filename: 'test.txt',
        file: Buffer.from('test'),
        filetype: 'txt',
      };
      await getFileUpload(containsFileType, this.logger);
      assert.isTrue(this.logger.warn.calledOnceWith(buildLegacyFileTypeWarning()));
    });
    it('warns when missing or invalid filename', async () => {
      this.logger = {
        warn: sinon.spy(),
      };
      const missingFileName = {
        file: Buffer.from('test'),
      };
      await getFileUpload(missingFileName, this.logger);
      assert.isTrue(this.logger.warn.calledOnceWith(buildMissingFileNameWarning()));
    });
    it('warns when possibly missing a file extension in filename supplied', async () => {
      this.logger = {
        warn: sinon.spy(),
      };
      const filename = 'should-have-extension';
      const missingFileNameExtension = {
        file: Buffer.from('test'),
        filename,
      };
      await getFileUpload(missingFileNameExtension, this.logger);
      assert.isTrue(this.logger.warn.calledOnceWith(buildMissingExtensionWarning(filename)));
    });
  });
  describe('getFileData', () => {
    it('throws an error with missing file or content', async () => {
      const invalidFileUpload = {};
      // this call to getFileData should error
      try {
        const res = await getFileData(invalidFileUpload);
        // if we get here this test is failed
        assert.fail(res, "an error", "Expected an error but got an output");
      } catch (err) {
        assert.equal(err.message, 'Either a file or content field is required for valid file upload. You cannot supply both');
        assert.equal(err.code, ErrorCode.FileUploadInvalidArgumentsError);
      }
    });
    it('handles invalid input for file or content or when both supplied', async () => {
      // both content and file supplied
      let invalidFileUpload = {
        file: 50,
        content: 50,
        filename: 'Test File'
      };
      try {
        const res = await getFileData(invalidFileUpload);
        assert.fail(res, "an error", "Was expecting an error, but got a result");
      } catch (err) {
        assert.equal(err.message, 'Either a file or content field is required for valid file upload. You cannot supply both');
        assert.equal(err.code, ErrorCode.FileUploadInvalidArgumentsError);
      }

      // file supplied invalid type of valid
      invalidFileUpload = {
        file: 50,
        filename: 'Test File'
      }
      try {
        const res = await getFileData(invalidFileUpload);
        assert.fail(res, "an error", "Was expecting an error, but got a result");
      } catch (err) {
        assert.equal(err.message, 'file must be a valid string path, buffer or ReadStream');
        assert.equal(err.code, ErrorCode.FileUploadInvalidArgumentsError);
      }

      // content supplied invalid type of field
      invalidFileUpload = {
        content: 50,
        filename: 'Test File'
      }
      try {
        const res = await getFileData(invalidFileUpload);
        assert.fail(res, "an error", "Was expecting an error, but got a result");
      } catch (err) {
        assert.equal(err.message, 'content must be a string');
        assert.equal(err.code, ErrorCode.FileUploadInvalidArgumentsError);
      }
    });
    it('handles file as buffer', async () => {
      const fileUpload = {
        file: Buffer.from('Hello'),
        filename: 'It\'s me',
      };
      const res = await getFileData(fileUpload); 
      res.forEach((int, idx) => {
        assert.equal(int, fileUpload.file[idx])
      });
    });
    it('handles file as string when valid path', async () => {
      const fileUpload = {
        file: './test/fixtures/test-jpg.jpg',
        filename: 'Test File',
      };
      
      try {
        const res = await getFileData(fileUpload);
        // should return a buffer
        assert.equal(Buffer.isBuffer(res), true);
      } catch (err) {
        assert.fail(err, "no error");
      }
    });
    it('handles file as string when invalid path', async () => {
      const fileUpload = {
        file: './a/bad/path',
        filename: 'Test File',
      };
       try {
        const res = await getFileData(fileUpload);
        assert.fail(res, "no error", "Expected no error, but got one");
       } catch (err) {
        assert.equal(err.message, `Unable to resolve file data for ${fileUpload.file}. Please supply a filepath string, or binary data Buffer or String directly.`);
        assert.equal(err.code, ErrorCode.FileUploadInvalidArgumentsError);
      }
    });
    it('handles file as ReadStream', async () => {
      const fileUpload = {
        file: createReadStream('./test/fixtures/test-jpg.jpg'),
        filename: 'Test File',
      };
      // should not error
      try {
        const res = await getFileData(fileUpload);
        // should return file data from the stream
        assert.equal(Buffer.isBuffer(res), true);
      } catch (err) {
        assert.fail(err, "no error", "Expected no error here, but got one");
      }

    });
    it('handles content as string', async () => {
      let validFileUpload = {
        content: 'Happiness',
        filename: 'Test File'
      };
      try {
        const res = await getFileData(validFileUpload);
        assert.equal(Buffer.isBuffer(res), true);
      } catch (err) {
        assert.fail(res, "a buffer file data", "Was expecting no error, but got one");
      }
    });
  });
  describe('getFileDataLength', () => {
    it('errors when data is undefined', () => {
      assert.throws(() => getFileDataLength());
    });
    it('returns correct byte length', () => {
      const length = getFileDataLength(Buffer.from('Hello'));
      assert.equal(length, 5);
    });
  });
  describe('getFileDataAsStream', () => {
    it('reads file data in from a stream', async () => {
      const shouldNotThrow = async () => await getFileDataAsStream(await createReadStream('./test/fixtures/test-txt.txt'));
      assert.doesNotThrow(shouldNotThrow);
    });
    it('errors if file is empty', async () => {
      try {
        const res = await getFileDataAsStream(await createReadStream('./test/fixtures/test-txt-empty.txt'));
      } catch (err) {
        assert.equal(err.message, 'No data in supplied file');
      }
    });
  });
})