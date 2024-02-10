require('mocha');
const { assert } = require('chai');
const sinon = require('sinon');
const { createReadStream, statSync, writeFileSync, unlinkSync } = require('fs');
const { ErrorCode } = require('./errors');
const {
  getFileDataAsStream,
  getFileDataLength,
  getFileData,
  getFileUploadJob,
  getAllFileUploadsToComplete,
  getMultipleFileUploadJobs,
  buildLegacyFileTypeWarning,
  buildMissingExtensionWarning,
  buildMissingFileNameWarning,
  buildMissingFileIdError,
  buildChannelsWarning,
  buildMultipleChannelsErrorMsg,
} = require('./file-upload');

describe('file-upload', () => {
  describe('getFileUploadJob', () => {
    it('returns a fileUploadEntry', async () => {
      const valid = {
        filename: 'test.txt',
        file: Buffer.from('test'),
        title: 'My title',
        alt_text: 'an image of a thing',
        initial_comment: 'lorem ipsum',
      };
      const res = await getFileUploadJob(valid);
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
      await getFileUploadJob(containsFileType, this.logger);
      assert.isTrue(this.logger.warn.calledOnceWith(buildLegacyFileTypeWarning()));
    });
    it('warns when missing or invalid filename', async () => {
      this.logger = {
        warn: sinon.spy(),
      };
      const missingFileName = {
        file: Buffer.from('test'),
      };
      await getFileUploadJob(missingFileName, this.logger);
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
      await getFileUploadJob(missingFileNameExtension, this.logger);
      assert.isTrue(this.logger.warn.calledOnceWith(buildMissingExtensionWarning(filename)));
    });
    it('warns when channels is supplied', async () => {
      this.logger = {
        warn: sinon.spy(),
      };
      const channelsSupplied = {
        file: Buffer.from('test'),
        filename: 'test',
        channels: 'C1234'
      };
      await getFileUploadJob(channelsSupplied, this.logger);
      assert.isTrue(this.logger.warn.calledWith(buildChannelsWarning()));
    });
    it('errors when channels is supplied with csv value, aka multiple channels', async () => {
      const multipleChannelsSuppliedAsCsv = {
        file: Buffer.from('test'),
        filename: 'test',
        channels: 'C1234,C5678' // multiple chnanel
      };
      try {
        await getFileUploadJob(multipleChannelsSuppliedAsCsv, this.logger);
        assert.fail('Should have errored out but didnt');
      } catch (error) {
        assert.equal(error.message, buildMultipleChannelsErrorMsg());
      }
    });
  });
  describe('getMultipleFileUploadJobs', () => {
    it('uses the shared options in upload jobs', async () => {
      const valid = {
        initial_comment: 'Here are the files!',
        thread_ts: '1223313423434.131321',
        channel_id: 'C12345',
        token: 'xoxb-000000-111111-0000000',
        file_uploads: [
          {
            file: './test/fixtures/test-png.png',
            filename: 'watermelon.png',
            alt_text: 'cubed fruit for box eats',
          },
          {
            content: 'howdy world!',
            filename: 'hello.txt',
          },
        ],
      };
      this.logger = {
        warn: sinon.spy(),
      };
      const res = await getMultipleFileUploadJobs(valid, this.logger);
      // supplied values
      assert.equal(valid.initial_comment, res[0].initial_comment);
      assert.equal(valid.initial_comment, res[1].initial_comment);
      assert.equal(valid.thread_ts, res[0].thread_ts);
      assert.equal(valid.thread_ts, res[1].thread_ts);
      assert.equal(valid.channel_id, res[0].channel_id);
      assert.equal(valid.channel_id, res[1].channel_id);
      assert.equal(valid.token, res[0].token);
      assert.equal(valid.token, res[1].token);
      assert.equal(valid.file_uploads[0].file, res[0].file);
      assert.equal(valid.file_uploads[0].filename, res[0].filename);
      assert.equal(valid.file_uploads[0].alt_text, res[0].alt_text);
      assert.equal(valid.file_uploads[1].content, res[1].content);
      assert.equal(valid.file_uploads[1].filename, res[1].filename);

      // calculated values
      assert.isDefined(res[0].data);
      assert.isDefined(res[1].data);
      assert.isDefined(res[0].length);
      assert.isDefined(res[1].length);
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
        assert.equal(err.message, 'file must be a valid string path, buffer or Readable');
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
    it('ensures complete file is uploaded', async () => {
      try {
        // create a large file
        let largeBuffer = Buffer.alloc(100000, '0123456789876543210\n');
        writeFileSync('./test/fixtures/test-txt-large.txt', largeBuffer);

        const res = await getFileDataAsStream(createReadStream('./test/fixtures/test-txt-large.txt'));

        // assert file size of the res is the same as the file size of the buffer
        const expectedSize = statSync('./test/fixtures/test-txt-large.txt').size
        const actualSize = Buffer.byteLength(res)
        assert.equal(actualSize, expectedSize);

      } finally {
        // cleanup large file
        unlinkSync('./test/fixtures/test-txt-large.txt');
      }
    });
  });
  describe('getAllFileUploadsToComplete', () => {
    describe('when channel_id is the same', () => {
      it('should group uploads with matching thread_ts and initial_comment together', () => {
        const fileUploadJob1 = {
          file: Buffer.from('test'),
          filename: 'test.txt',
          file_id: 'id1',
          title: 'test1',
          // same as below in fileUploadJob2
          channel_id: '1',
          initial_comment: 'Hi',
          thread_ts: '1.0'
        }
        const fileUploadJob2 = {
          file: Buffer.from('test'),
          filename: 'test.txt',
          file_id: 'id2',
          title: 'test2',
          // same as above in fileUploadJob1
          channel_id: '1',
          initial_comment: 'Hi',
          thread_ts: '1.0'
        }
        const fileUploadJobs = [fileUploadJob1, fileUploadJob2];
        const toComplete = getAllFileUploadsToComplete(fileUploadJobs);

        // there should be one job to complete 
        assert.equal(Object.keys(toComplete).length, 1);

        // that job should contain two file uploads 
        // we can verity this by checking files
        const job = Object.values(toComplete)[0];
        assert.equal(job.files.length, 2);

        // check that each upload contains correct file_ids and title
        job.files.forEach((file, idx) => {
          assert.equal(fileUploadJobs[idx].file_id, file.id);
          assert.equal(fileUploadJobs[idx].title, file.title);
        });
      });
      it('should group uploads with matching thread_ts and different initial_comments separately', () => {
        // in this case the behavior should be to post in the same thread separate comments with each file upload
        // respectively
        const fileUploadJob1 = {
          file: Buffer.from('test'),
          filename: 'test.txt',
          file_id: 'id1',
          title: 'test1',
          // same as below in fileUploadJob2
          channel_id: '1',
          thread_ts: '1.0',
          // different from fileUploadJob2
          initial_comment: 'Hi',
        }
        const fileUploadJob2 = {
          file: Buffer.from('test'),
          filename: 'test.txt',
          file_id: 'id2',
          title: 'test2',
          // same as above in fileUploadJob1
          channel_id: '1',
          thread_ts: '1.0',
          // different from fileUploadJob1
          initial_comment: 'Bye',
        }
        const fileUploadJobs = [fileUploadJob1, fileUploadJob2];
        const toComplete = getAllFileUploadsToComplete(fileUploadJobs);

        // there should be two jobs to complete 
        assert.equal(Object.keys(toComplete).length, 2);

        // each job should contain one file upload
        // we can verity this by checking files
        const jobs = Object.values(toComplete);
        jobs.forEach((job, idx) => {
          // checks there's one upload in `files`
          assert.equal(job.files.length, 1);
          // checks that this upload matches the original fileUploadJobs entry
          assert.equal(fileUploadJobs[idx].file_id, job.files[0].id);
          assert.equal(fileUploadJobs[idx].title, job.files[0].title);
        })
      });
      it('should group uploads with non matching thread_ts separately regardless of whether initial_comments match', () => {
        const fileUploadJob1 = {
          file: Buffer.from('test'),
          filename: 'test.txt',
          file_id: 'id1',
          title: 'test1',
          // same as below in fileUploadJob2
          channel_id: '1',
          initial_comment: 'Hi',
          // different from fileUploadJob2
          thread_ts: '1.0',
        }
        const fileUploadJob2 = {
          file: Buffer.from('test'),
          filename: 'test.txt',
          file_id: 'id2',
          title: 'test2',
          // same as above in fileUploadJob1
          channel_id: '1',
          initial_comment: 'Hi',
          // different from fileUploadJob1
          thread_ts: '2.0',
        }
        const fileUploadJobs = [fileUploadJob1, fileUploadJob2];
        const toComplete = getAllFileUploadsToComplete(fileUploadJobs);

        // there should be two jobs to complete 
        assert.equal(Object.keys(toComplete).length, 2);

        // each job should contain one file upload
        // we can verity this by checking files
        const jobs = Object.values(toComplete);
        jobs.forEach((job, idx) => {
          // checks there's one upload in `files`
          assert.equal(job.files.length, 1);
          // checks that this upload matches the original fileUploadJobs entry
          assert.equal(fileUploadJobs[idx].file_id, job.files[0].id);
          assert.equal(fileUploadJobs[idx].title, job.files[0].title);
        })
      });
    })
    describe('when channel_id is different', () => {
      it('should not group uploads', () => {
        // even if all other details are the same, it should never group uploads if the channel_id doesn't match
        const fileUploadJob1 = {
          file: Buffer.from('test'),
          filename: 'test.txt',
          file_id: 'id1',
          title: 'test1',
          initial_comment: 'Hi',
          thread_ts: '1.0',

          channel_id: '1'
        }
        const fileUploadJob2 = {
          file: Buffer.from('test'),
          filename: 'test.txt',
          file_id: 'id1',
          title: 'test1',
          initial_comment: 'Hi',
          thread_ts: '1.0',

          channel_id: 'Not 1'
        }
        const fileUploadJobs = [fileUploadJob1, fileUploadJob2];
        const toComplete = getAllFileUploadsToComplete(fileUploadJobs);

        // there should be 2 jobs to complete 
        assert.equal(Object.keys(toComplete).length, 2);
      });
    });
    it('should correctly group entries with matching channel_ids, non-matching channel_ids, missing, channel_id', () => {
      // fileUploadJob1 and 2 should be grouped together in one job because their channel_id and initial comment match 
      const fileUploadJob1 = {
        file: Buffer.from('test'),
        filename: 'test.txt',
        file_id: 'id1',
        title: 'test1',

        channel_id: '1',
        initial_comment: 'Hi',
      }
      const fileUploadJob2 = {
        file: Buffer.from('test'),
        filename: 'test.txt',
        file_id: 'id2',
        title: 'test2',

        channel_id: '1',
        initial_comment: 'Hi',
      }
      // should be it's own job even though the channel id matches because it's missing thread_ts and initial_comment
      const fileUploadJob3 = {
        file: Buffer.from('test'),
        filename: 'test.txt',
        file_id: 'id3',
        title: 'test3',

        channel_id: '1',
      }
      // should be it's own job, it's missing a channel id, so its private and cant be grouped in a message
      const fileUploadJob4 = {
        file: Buffer.from('test'),
        filename: 'test.txt',
        file_id: 'id4',
        title: 'test4',

        thread_ts: '1.0',
        initial_comment: 'Bye',
      }
      const fileUploadJobs = [fileUploadJob1, fileUploadJob2, fileUploadJob3, fileUploadJob4];
      const toComplete = getAllFileUploadsToComplete(fileUploadJobs);

      // there should be 3 total jobs to complete 
      assert.equal(Object.keys(toComplete).length, 3);
    })
    it('should error if a file_id is missing from any fileUpload entry', () => {
      const fileUploadJob1 = {
        file: Buffer.from('test'),
        filename: 'test.txt',
        title: 'test1',
        initial_comment: 'Hi',
        thread_ts: '1.0',
        channel_id: '1'
      }
      const fileUploadJobs = [fileUploadJob1];
      try {
        const toComplete = getAllFileUploadsToComplete(fileUploadJobs);
        assert.fail('Should fail with error because of missing file_id but did not');
      } catch (error) {
        assert.equal(error.message, buildMissingFileIdError());
      }
    })
    it('should correctly group entries with no channel_ids', () => {
      const fileUploadJob1 = {
        file: Buffer.from('test'),
        filename: 'test.txt',
        file_id: 'id1',
        title: 'test1',
        initial_comment: 'Hi',
      }
      const fileUploadJob2 = {
        file: Buffer.from('test'),
        filename: 'test.txt',
        file_id: 'id2',
        title: 'test2',
        initial_comment: 'Hi',
      }
      const fileUploadJobs = [fileUploadJob1, fileUploadJob2];
      const toComplete = getAllFileUploadsToComplete(fileUploadJobs);


      // there should be 1 total jobs to complete
      assert.equal(Object.keys(toComplete).length, 1);
    })
  });
});
