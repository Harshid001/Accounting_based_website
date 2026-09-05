import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  DeleteObjectCommand,
  DeleteObjectsCommand,
  GetObjectCommand,
  HeadObjectCommand,
} from '@aws-sdk/client-s3';

import {
  closeStorage,
  deleteObject,
  deleteObjects,
  headObject,
  openObject,
  presignGet,
  presignPut,
  s3,
  storeObject,
  verifyDownloadTicket,
  verifyUploadTicket,
} from '../../src/config/fileStorage.js';
import { MAX_UPLOAD_BYTES } from '../../src/lib/enums.js';

interface StoredItem {
  contentType: string;
  contentLength: number;
  etag: string;
}

const mockStore = new Map<string, StoredItem>();

beforeEach(() => {
  mockStore.clear();
  vi.restoreAllMocks();

  vi.spyOn(s3, 'send').mockImplementation((command: unknown) => {
    const cmd = command as {
      input?: {
        Key?: string;
        Delete?: { Objects?: Array<{ Key?: string }> };
      };
    };

    if (command instanceof HeadObjectCommand || command?.constructor?.name === 'HeadObjectCommand') {
      const key = cmd.input?.Key;
      const found = key ? mockStore.get(key) : undefined;
      if (!found) {
        const notFoundErr = new Error('NotFound');
        notFoundErr.name = 'NotFound';
        return Promise.reject(notFoundErr);
      }
      return Promise.resolve({
        ContentType: found.contentType,
        ContentLength: found.contentLength,
        ETag: found.etag,
      } as never);
    }

    if (command instanceof DeleteObjectCommand || command?.constructor?.name === 'DeleteObjectCommand') {
      const key = cmd.input?.Key;
      if (key) mockStore.delete(key);
      return Promise.resolve({} as never);
    }

    if (command instanceof DeleteObjectsCommand || command?.constructor?.name === 'DeleteObjectsCommand') {
      const objects = cmd.input?.Delete?.Objects ?? [];
      for (const obj of objects) {
        if (obj?.Key) mockStore.delete(obj.Key);
      }
      return Promise.resolve({} as never);
    }

    if (command instanceof GetObjectCommand || command?.constructor?.name === 'GetObjectCommand') {
      return Promise.resolve({} as never);
    }

    return Promise.resolve({} as never);
  });
});

describe('S3/R2 file storage', () => {
  it('uploads, inspects, downloads, and deletes a file through presigned URLs', async () => {
    const storageKey = 'clients/storage-test/document.pdf';
    const bytes = Buffer.from('%PDF-1.7\nFirmDesk R2 integration\n');
    const upload = await presignPut(storageKey, 'application/pdf', bytes.length);

    expect(upload.storageKey).toBe(storageKey);
    expect(upload.expiresIn).toBe(60);
    expect(upload.uploadUrl).toContain('r2.cloudflarestorage.com');

    // Simulate upload completion to R2
    mockStore.set(storageKey, {
      contentType: 'application/pdf',
      contentLength: bytes.length,
      etag: '"test-etag"',
    });

    const facts = await headObject(storageKey);
    expect(facts).toMatchObject({
      contentType: 'application/pdf',
      contentLength: bytes.length,
    });
    expect(facts?.etag).toBeTruthy();

    const download = await presignGet(storageKey, 'statement.pdf');
    expect(download.url).toContain('r2.cloudflarestorage.com');
    expect(download.url).toContain('response-content-disposition');
    expect(download.expiresIn).toBe(60);

    await deleteObject(storageKey);
    expect(await headObject(storageKey)).toBeNull();
    closeStorage();
  });

  it('removes multiple stored files in one operation', async () => {
    const firstKey = 'clients/storage-test/first.pdf';
    const secondKey = 'clients/storage-test/second.pdf';
    const firstBytes = Buffer.from('first');
    const secondBytes = Buffer.from('second');

    mockStore.set(firstKey, {
      contentType: 'application/pdf',
      contentLength: firstBytes.length,
      etag: '"first-etag"',
    });
    mockStore.set(secondKey, {
      contentType: 'application/pdf',
      contentLength: secondBytes.length,
      etag: '"second-etag"',
    });

    expect(await headObject(firstKey)).not.toBeNull();
    expect(await headObject(secondKey)).not.toBeNull();

    await deleteObjects([firstKey, secondKey]);

    expect(await headObject(firstKey)).toBeNull();
    expect(await headObject(secondKey)).toBeNull();
  });

  it('opens an existing object via presigned get URL', async () => {
    const storageKey = 'clients/storage-test/existing.pdf';
    mockStore.set(storageKey, {
      contentType: 'application/pdf',
      contentLength: 1024,
      etag: '"etag"',
    });

    const opened = await openObject(storageKey);
    expect(opened.contentType).toBe('application/pdf');
    expect(opened.contentLength).toBe(1024);
    expect(opened.url).toContain('r2.cloudflarestorage.com');
  });

  it('throws 404 from openObject when key does not exist', async () => {
    await expect(openObject('clients/storage-test/missing.pdf')).rejects.toMatchObject({
      status: 404,
      code: 'NOT_FOUND',
    });
  });

  it('rejects presignPut for a file exceeding the size limit', async () => {
    await expect(
      presignPut('clients/storage-test/too-large.pdf', 'application/pdf', MAX_UPLOAD_BYTES + 1),
    ).rejects.toThrow('outside the accepted range');
  });

  it('rejects presignPut for a zero-byte file', async () => {
    await expect(
      presignPut('clients/storage-test/empty.pdf', 'application/pdf', 0),
    ).rejects.toThrow('outside the accepted range');
  });

  it('returns null from headObject for a key that does not exist', async () => {
    expect(await headObject('clients/storage-test/does-not-exist.pdf')).toBeNull();
  });

  it('generates a get URL that includes the filename in the content-disposition', async () => {
    const download = await presignGet(
      'clients/storage-test/any.pdf',
      'My Report (2024).pdf',
    );
    expect(download.url).toContain('response-content-disposition');
    expect(download.url).toContain('My%20Report');
  });

  it('handles deleteObjects gracefully when the key list is empty', async () => {
    const sendSpy = vi.spyOn(s3, 'send');
    await expect(deleteObjects([])).resolves.toBeUndefined();
    expect(sendSpy).not.toHaveBeenCalled();
  });

  it('handles deleteObjects gracefully when some keys do not exist', async () => {
    await expect(
      deleteObjects(['clients/storage-test/ghost-1.pdf', 'clients/storage-test/ghost-2.pdf']),
    ).resolves.toBeUndefined();
  });

  it('deduplicates keys in deleteObjects', async () => {
    const sendSpy = vi.spyOn(s3, 'send');
    const storageKey = 'clients/storage-test/dedup.pdf';
    mockStore.set(storageKey, {
      contentType: 'application/pdf',
      contentLength: 10,
      etag: '"etag"',
    });

    await expect(deleteObjects([storageKey, storageKey])).resolves.toBeUndefined();
    expect(sendSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        input: expect.objectContaining({
          Delete: { Objects: [{ Key: storageKey }] },
        }),
      }),
    );
    expect(await headObject(storageKey)).toBeNull();
  });

  it('destroys the S3 client cleanly via closeStorage', () => {
    const destroySpy = vi.spyOn(s3, 'destroy');
    expect(() => closeStorage()).not.toThrow();
    expect(destroySpy).toHaveBeenCalled();
  });

  it('throws for deprecated transfer stubs', () => {
    expect(() => storeObject()).toThrow('storeObject is no longer supported');
    expect(() => verifyUploadTicket()).toThrow('verifyUploadTicket is no longer needed');
    expect(() => verifyDownloadTicket()).toThrow('verifyDownloadTicket is no longer needed');
  });
});
