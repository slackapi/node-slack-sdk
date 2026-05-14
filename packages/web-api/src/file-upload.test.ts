import assert from 'node:assert/strict';
import { createReadStream, statSync, unlinkSync, writeFileSync } from 'node:fs';
import { afterEach, beforeEach, describe, it } from 'node:test';
import sinon from 'sinon';
import { ErrorCode, type WebAPIFileUploadInvalidArgumentsError } from './errors';
import {
  buildChannelsWarning,
  buildLegacyFileTypeWarning,
  buildMissingExtensionWarning,
  buildMissingFileIdError,
  buildMissingFileNameWarning,
  buildMultipleChannelsErrorMsg,
  getAllFileUploadsToComplete,
  getFileData,
  getFileDataAsStream,
  getFileDataLength,
  getFileUploadJob,
  getMultipleFileUploadJobs,
} from './file-upload';
import type { Logger } from './logger';
import type { FileUploadBinaryContents, FileUploadStringContents } from './types/request/files';

describe('file-upload', () => {
  const sandbox = sinon.createSandbox();
  let logger: Logger;
  beforeEach(() => {
    logger = {
      debug: sinon.spy(),
      info: sinon.spy(),
      warn: sinon.spy(),
      error: sinon.spy(),
      getLevel: sinon.spy(),
      setLevel: sinon.spy(),
      setName: sinon.spy(),
    };
  });
  afterEach(() => {
    sandbox.restore();
  });
  describe('getFileUploadJob', () => {
    it('returns a fileUploadEntry', async () => {
      const valid = {
        filename: 'test.txt',
        file: Buffer.from('test'),
        title: 'My title',
        alt_text: 'an image of a thing',
        initial_comment: 'lorem ipsum',
      };
      const res = await getFileUploadJob(valid, logger);
      // supplied values
      assert.strictEqual(valid.initial_comment, res.initial_comment);
      assert.strictEqual(valid.alt_text, res.alt_text);
      assert.strictEqual(valid.title, res.title);
      assert.strictEqual(valid.filename, res.filename);

      // calculated values
      assert.ok(res.data);
      assert.ok(res.length);
    });
    it('warns if legacy filetype', async () => {
      const containsFileType = {
        filename: 'test.txt',
        file: Buffer.from('test'),
        filetype: 'txt',
      };
      await getFileUploadJob(containsFileType, logger);
      assert.strictEqual((logger.warn as sinon.SinonSpy).calledOnceWith(buildLegacyFileTypeWarning()), true);
    });
    it('warns when missing or invalid filename', async () => {
      const missingFileName = {
        file: Buffer.from('test'),
      };
      await getFileUploadJob(missingFileName, logger);
      assert.strictEqual((logger.warn as sinon.SinonSpy).calledOnceWith(buildMissingFileNameWarning()), true);
    });
    it('warns when possibly missing a file extension in filename supplied', async () => {
      const filename = 'should-have-extension';
      const missingFileNameExtension = {
        file: Buffer.from('test'),
        filename,
      };
      await getFileUploadJob(missingFileNameExtension, logger);
      assert.strictEqual((logger.warn as sinon.SinonSpy).calledOnceWith(buildMissingExtensionWarning(filename)), true);
    });
    it('warns when channels is supplied', async () => {
      const channelsSupplied = {
        file: Buffer.from('test'),
        filename: 'test',
        channels: 'C1234',
      };
      await getFileUploadJob(channelsSupplied, logger);
      assert.strictEqual((logger.warn as sinon.SinonSpy).calledWith(buildChannelsWarning()), true);
    });
    it('errors when channels is supplied with csv value, aka multiple channels', async () => {
      const multipleChannelsSuppliedAsCsv = {
        file: Buffer.from('test'),
        filename: 'test',
        channels: 'C1234,C5678', // multiple chnanel
      };
      try {
        await getFileUploadJob(multipleChannelsSuppliedAsCsv, logger);
        assert.fail('Should have errored out but didnt');
      } catch (error) {
        assert.strictEqual((error as Error).message, buildMultipleChannelsErrorMsg());
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
      const res = await getMultipleFileUploadJobs(valid, logger);
      // supplied values
      assert.strictEqual(valid.initial_comment, res[0].initial_comment);
      assert.strictEqual(valid.initial_comment, res[1].initial_comment);
      assert.strictEqual(valid.thread_ts, res[0].thread_ts);
      assert.strictEqual(valid.thread_ts, res[1].thread_ts);
      assert.strictEqual(valid.channel_id, res[0].channel_id);
      assert.strictEqual(valid.channel_id, res[1].channel_id);
      assert.strictEqual(valid.token, res[0].token);
      assert.strictEqual(valid.token, res[1].token);
      assert.strictEqual(valid.file_uploads[0].file, (res[0] as FileUploadBinaryContents).file);
      assert.strictEqual(valid.file_uploads[0].filename, res[0].filename);
      assert.strictEqual(valid.file_uploads[0].alt_text, res[0].alt_text);
      assert.strictEqual(valid.file_uploads[1].content, (res[1] as FileUploadStringContents).content);
      assert.strictEqual(valid.file_uploads[1].filename, res[1].filename);

      // calculated values
      assert.ok(res[0].data);
      assert.ok(res[1].data);
      assert.ok(res[0].length);
      assert.ok(res[1].length);
    });
  });
  describe('getFileData', () => {
    it('throws an error with missing file or content', async () => {
      const invalidFileUpload = {};
      // this call to getFileData should error
      try {
        // @ts-expect-error passing invalid arguments
        const res = await getFileData(invalidFileUpload);
        // if we get here this test is failed
        assert.fail(res.toString());
      } catch (err) {
        const e = err as WebAPIFileUploadInvalidArgumentsError;
        assert.strictEqual(
          e.message,
          'Either a file or content field is required for valid file upload. You cannot supply both',
        );
        assert.strictEqual(e.code, ErrorCode.FileUploadInvalidArgumentsError);
      }
    });
    it('handles invalid input for file or content or when both supplied', async () => {
      // both content and file supplied
      const invalidFileUpload = {
        file: 50,
        content: 50,
        filename: 'Test File',
      };
      try {
        // @ts-expect-error passing invalid arguments
        const res = await getFileData(invalidFileUpload);
        assert.fail(res.toString());
      } catch (err) {
        const e = err as WebAPIFileUploadInvalidArgumentsError;
        assert.strictEqual(
          e.message,
          'Either a file or content field is required for valid file upload. You cannot supply both',
        );
        assert.strictEqual(e.code, ErrorCode.FileUploadInvalidArgumentsError);
      }

      // file supplied invalid type of valid
      const invalidFileUpload2 = {
        file: 50,
        filename: 'Test File',
      };
      try {
        // @ts-expect-error passing invalid arguments
        const res = await getFileData(invalidFileUpload2);
        assert.fail(res.toString());
      } catch (err) {
        const e = err as WebAPIFileUploadInvalidArgumentsError;
        assert.strictEqual(e.message, 'file must be a valid string path, buffer or Readable');
        assert.strictEqual(e.code, ErrorCode.FileUploadInvalidArgumentsError);
      }

      // content supplied invalid type of field
      const invalidFileUpload3 = {
        content: 50,
        filename: 'Test File',
      };
      try {
        // @ts-expect-error passing invalid arguments
        const res = await getFileData(invalidFileUpload3);
        assert.fail(res.toString());
      } catch (err) {
        const e = err as WebAPIFileUploadInvalidArgumentsError;
        assert.strictEqual(e.message, 'content must be a string');
        assert.strictEqual(e.code, ErrorCode.FileUploadInvalidArgumentsError);
      }
    });
    it('handles file as buffer', async () => {
      const fileUpload = {
        file: Buffer.from('Hello'),
        filename: "It's me",
      };
      const res = await getFileData(fileUpload);
      res.forEach((int, idx) => {
        assert.strictEqual(int, fileUpload.file[idx]);
      });
    });
    it('handles file as string when valid path', async () => {
      const fileUpload = {
        file: './test/fixtures/test-jpg.jpg',
        filename: 'Test File',
      };

      const res = await getFileData(fileUpload);
      // should return a buffer
      assert.strictEqual(Buffer.isBuffer(res), true);
    });
    it('handles file as string when invalid path', async () => {
      const fileUpload = {
        file: './a/bad/path',
        filename: 'Test File',
      };
      try {
        const res = await getFileData(fileUpload);
        assert.fail(res.toString());
      } catch (err) {
        const e = err as WebAPIFileUploadInvalidArgumentsError;
        assert.strictEqual(
          e.message,
          `Unable to resolve file data for ${fileUpload.file}. Please supply a filepath string, or binary data Buffer or String directly.`,
        );
        assert.strictEqual(e.code, ErrorCode.FileUploadInvalidArgumentsError);
      }
    });
    it('handles file as ReadStream', async () => {
      const fileUpload = {
        file: createReadStream('./test/fixtures/test-jpg.jpg'),
        filename: 'Test File',
      };
      // should not error
      const res = await getFileData(fileUpload);
      // should return file data from the stream
      assert.strictEqual(Buffer.isBuffer(res), true);
    });
    it('handles content as string', async () => {
      const validFileUpload = {
        content: 'Happiness',
        filename: 'Test File',
      };
      const res = await getFileData(validFileUpload);
      assert.strictEqual(Buffer.isBuffer(res), true);
    });
  });
  describe('getFileDataLength', () => {
    it('errors when data is undefined', () => {
      // @ts-expect-error calling method in a forbidden way
      assert.throws(() => getFileDataLength());
    });
    it('returns correct byte length', () => {
      const length = getFileDataLength(Buffer.from('Hello'));
      assert.strictEqual(length, 5);
    });
  });
  describe('getFileDataAsStream', () => {
    it('reads file data in from a stream', async () => {
      const shouldNotThrow = async () => await getFileDataAsStream(createReadStream('./test/fixtures/test-txt.txt'));
      assert.doesNotThrow(shouldNotThrow);
    });
    it('errors if file is empty', async () => {
      try {
        await getFileDataAsStream(createReadStream('./test/fixtures/test-txt-empty.txt'));
        assert.fail('expected exception to be thrown but was not');
      } catch (err) {
        assert.ok(err instanceof Error);
        assert.strictEqual(err.message, 'No data in supplied file');
      }
    });
    it('ensures complete file is uploaded', async () => {
      try {
        // create a large file
        const largeBuffer = Buffer.alloc(100000, '0123456789876543210\n');
        writeFileSync('./test/fixtures/test-txt-large.txt', largeBuffer);

        const res = await getFileDataAsStream(createReadStream('./test/fixtures/test-txt-large.txt'));

        // assert file size of the res is the same as the file size of the buffer
        const expectedSize = statSync('./test/fixtures/test-txt-large.txt').size;
        const actualSize = Buffer.byteLength(res);
        assert.strictEqual(actualSize, expectedSize);
      } catch (e) {
        assert.fail(`exception thrown! ${e}`);
      } finally {
        // cleanup large file
        unlinkSync('./test/fixtures/test-txt-large.txt');
      }
    });
  });
  describe('getAllFileUploadsToComplete', () => {
    it('should pass all expected properties through to the completion job', () => {
      const fileUploadJob1 = {
        file: Buffer.from('test'),
        filename: 'image.png',
        file_id: 'id1',
        title: 'test1',
        channel_id: 'C123',
        thread_ts: '1.0',
        initial_comment: 'Here is an image',
        highlight_type: 'png',
        blocks: [{ type: 'section', text: { type: 'plain_text', text: 'hello' } }],
      };
      const toComplete = getAllFileUploadsToComplete([fileUploadJob1]);
      const job = Object.values(toComplete)[0];
      assert.strictEqual(job.files[0].id, 'id1');
      assert.strictEqual(job.files[0].title, 'test1');
      assert.strictEqual(job.channel_id, 'C123');
      assert.strictEqual(job.thread_ts, '1.0');
      assert.strictEqual(job.initial_comment, 'Here is an image');
      assert.strictEqual(job.files[0].highlight_type, 'png');
      assert.deepStrictEqual(job.blocks, fileUploadJob1.blocks);
    });
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
          thread_ts: '1.0',
        };
        const fileUploadJob2 = {
          file: Buffer.from('test'),
          filename: 'test.txt',
          file_id: 'id2',
          title: 'test2',
          // same as above in fileUploadJob1
          channel_id: '1',
          initial_comment: 'Hi',
          thread_ts: '1.0',
        };
        const fileUploadJobs = [fileUploadJob1, fileUploadJob2];
        const toComplete = getAllFileUploadsToComplete(fileUploadJobs);

        // there should be one job to complete
        assert.strictEqual(Object.keys(toComplete).length, 1);

        // that job should contain two file uploads
        // we can verity this by checking files
        const job = Object.values(toComplete)[0];
        assert.strictEqual(job.files.length, 2);

        // check that each upload contains correct file_ids and title
        job.files.forEach((file, idx) => {
          assert.strictEqual(fileUploadJobs[idx].file_id, file.id);
          assert.strictEqual(fileUploadJobs[idx].title, file.title);
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
        };
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
        };
        const fileUploadJobs = [fileUploadJob1, fileUploadJob2];
        const toComplete = getAllFileUploadsToComplete(fileUploadJobs);

        // there should be two jobs to complete
        assert.strictEqual(Object.keys(toComplete).length, 2);

        // each job should contain one file upload
        // we can verity this by checking files
        const jobs = Object.values(toComplete);
        jobs.forEach((job, idx) => {
          // checks there's one upload in `files`
          assert.strictEqual(job.files.length, 1);
          // checks that this upload matches the original fileUploadJobs entry
          assert.strictEqual(fileUploadJobs[idx].file_id, job.files[0].id);
          assert.strictEqual(fileUploadJobs[idx].title, job.files[0].title);
        });
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
        };
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
        };
        const fileUploadJobs = [fileUploadJob1, fileUploadJob2];
        const toComplete = getAllFileUploadsToComplete(fileUploadJobs);

        // there should be two jobs to complete
        assert.strictEqual(Object.keys(toComplete).length, 2);

        // each job should contain one file upload
        // we can verity this by checking files
        const jobs = Object.values(toComplete);
        jobs.forEach((job, idx) => {
          // checks there's one upload in `files`
          assert.strictEqual(job.files.length, 1);
          // checks that this upload matches the original fileUploadJobs entry
          assert.strictEqual(fileUploadJobs[idx].file_id, job.files[0].id);
          assert.strictEqual(fileUploadJobs[idx].title, job.files[0].title);
        });
      });
    });
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

          channel_id: '1',
        };
        const fileUploadJob2 = {
          file: Buffer.from('test'),
          filename: 'test.txt',
          file_id: 'id1',
          title: 'test1',
          initial_comment: 'Hi',
          thread_ts: '1.0',

          channel_id: 'Not 1',
        };
        const fileUploadJobs = [fileUploadJob1, fileUploadJob2];
        const toComplete = getAllFileUploadsToComplete(fileUploadJobs);

        // there should be 2 jobs to complete
        assert.strictEqual(Object.keys(toComplete).length, 2);
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
      };
      const fileUploadJob2 = {
        file: Buffer.from('test'),
        filename: 'test.txt',
        file_id: 'id2',
        title: 'test2',

        channel_id: '1',
        initial_comment: 'Hi',
      };
      // should be it's own job even though the channel id matches because it's missing thread_ts and initial_comment
      const fileUploadJob3 = {
        file: Buffer.from('test'),
        filename: 'test.txt',
        file_id: 'id3',
        title: 'test3',

        channel_id: '1',
      };
      // should be it's own job, it's missing a channel id, so it's private and can't be grouped in a message
      const fileUploadJob4 = {
        file: Buffer.from('test'),
        filename: 'test.txt',
        file_id: 'id4',
        title: 'test4',

        thread_ts: '1.0',
        initial_comment: 'Bye',
      };
      const fileUploadJobs = [fileUploadJob1, fileUploadJob2, fileUploadJob3, fileUploadJob4];
      // @ts-expect-error TODO: unions of function parameters must apply to intersection of them, too
      const toComplete = getAllFileUploadsToComplete(fileUploadJobs);

      // there should be 3 total jobs to complete
      assert.strictEqual(Object.keys(toComplete).length, 3);
    });
    it('should error if a file_id is missing from any fileUpload entry', () => {
      const fileUploadJob1 = {
        file: Buffer.from('test'),
        filename: 'test.txt',
        title: 'test1',
        initial_comment: 'Hi',
        thread_ts: '1.0',
        channel_id: '1',
      };
      const fileUploadJobs = [fileUploadJob1];
      try {
        getAllFileUploadsToComplete(fileUploadJobs);
        assert.fail('Should fail with error because of missing file_id but did not');
      } catch (error) {
        assert.ok(error instanceof Error);
        assert.strictEqual(error.message, buildMissingFileIdError());
      }
    });
    it('should correctly group entries with no channel_ids', () => {
      const fileUploadJob1 = {
        file: Buffer.from('test'),
        filename: 'test.txt',
        file_id: 'id1',
        title: 'test1',
        initial_comment: 'Hi',
      };
      const fileUploadJob2 = {
        file: Buffer.from('test'),
        filename: 'test.txt',
        file_id: 'id2',
        title: 'test2',
        initial_comment: 'Hi',
      };
      const fileUploadJobs = [fileUploadJob1, fileUploadJob2];
      const toComplete = getAllFileUploadsToComplete(fileUploadJobs);

      // there should be 1 total jobs to complete
      assert.strictEqual(Object.keys(toComplete).length, 1);
    });
  });
});
