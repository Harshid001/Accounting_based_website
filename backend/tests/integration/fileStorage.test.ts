import request from 'supertest';
import { describe, expect, it } from 'vitest';

import {
  closeStorage,
  deleteObject,
  deleteObjects,
  headObject,
  presignGet,
  presignPut,
} from '../../src/config/fileStorage.js';
import { app } from '../helpers/auth.js';

describe('S3/R2 file storage', () => {
  it('uploads, inspects, downloads, and deletes a file through presigned URLs', async () => {
    const storageKey = 'clients/storage-test/document.pdf';
    const bytes = Buffer.from('%PDF-1.7\nFirmDesk R2 integration\n');
    const upload = await presignPut(storageKey, 'application/pdf', bytes.length);

    expect(upload.storageKey).toBe(storageKey);
    expect(upload.expiresIn).toBe(60);
    expect(upload.uploadUrl).toContain('r2.cloudflarestorage.com');

    // PUT directly to the R2 presigned upload URL
    const uploaded = await request(upload.uploadUrl)
      .put('')
      .set('Content-Type', 'application/pdf')
      .set('Content-Length', bytes.length.toString())
      .send(bytes);

    expect(uploaded.status).toBe(200); // R2 returns 200 for presigned PUT

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

    // Upload both via presigned PUT
    const [firstUpload, secondUpload] = await Promise.all([
      presignPut(firstKey, 'application/pdf', firstBytes.length),
      presignPut(secondKey, 'application/pdf', secondBytes.length),
    ]);

    await Promise.all([
      request(firstUpload.uploadUrl)
        .put('')
        .set('Content-Type', 'application/pdf')
        .send(firstBytes),
      request(secondUpload.uploadUrl)
        .put('')
        .set('Content-Type', 'application/pdf')
        .send(secondBytes),
    ]);

    expect(await headObject(firstKey)).not.toBeNull();
    expect(await headObject(secondKey)).not.toBeNull();

    await deleteObjects([firstKey, secondKey]);

    expect(await headObject(firstKey)).toBeNull();
    expect(await headObject(secondKey)).toBeNull();
  });

  it('rejects presignPut for a file exceeding the size limit', async () => {
    const { MAX_UPLOAD_BYTES } = await import('../../src/lib/enums.js');
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
    await expect(deleteObjects([])).resolves.toBeUndefined();
  });

  it('handles deleteObjects gracefully when some keys do not exist', async () => {
    await expect(
      deleteObjects(['clients/storage-test/ghost-1.pdf', 'clients/storage-test/ghost-2.pdf']),
    ).resolves.toBeUndefined();
  });

  it('deduplicates keys in deleteObjects', async () => {
    const storageKey = 'clients/storage-test/dedup.pdf';
    const bytes = Buffer.from('dedup test');
    const upload = await presignPut(storageKey, 'application/pdf', bytes.length);
    await request(upload.uploadUrl)
      .put('')
      .set('Content-Type', 'application/pdf')
      .send(bytes);

    // Passing the same key twice should not cause an S3 error
    await expect(deleteObjects([storageKey, storageKey])).resolves.toBeUndefined();
    expect(await headObject(storageKey)).toBeNull();
  });

  it('destroys the S3 client cleanly via closeStorage', () => {
    expect(() => closeStorage()).not.toThrow();
  });
});

// Use the app fixture to ensure the test environment is set up, even though
// the storage functions call R2 directly.
void app;
