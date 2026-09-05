import request from 'supertest';
import { describe, expect, it } from 'vitest';

import { User } from '../../src/models/user.model.js';
import { app, auth, createAccount, STRONG_PASSWORD, uniqueEmail } from '../helpers/auth.js';
import { makeClient } from '../helpers/factories.js';

describe('Security Hardening (Assessment Verification)', () => {
  it('Issue 3.1: prevents duplicate-email self-registration and never creates a second user', async () => {
    const email = uniqueEmail('audit-dupe');
    const first = await request(app())
      .post('/api/auth/sign-up/email')
      .set('Content-Type', 'application/json')
      .send({ email, password: STRONG_PASSWORD, name: 'First User' });

    expect(first.status).toBeLessThan(400);
    expect(await User.countDocuments({ email })).toBe(1);

    // Attempt second signup with the same email
    const duplicate = await request(app())
      .post('/api/auth/sign-up/email')
      .set('Content-Type', 'application/json')
      .send({ email, password: STRONG_PASSWORD, name: 'Attacker Impersonator' });

    // Must be rejected with a 4xx client error (e.g. 409 or 400), NEVER 200
    expect(duplicate.status).toBeGreaterThanOrEqual(400);
    expect(await User.countDocuments({ email })).toBe(1);
  });

  it('Issue 3.1: creates self-registered accounts as unverified by default', async () => {
    const email = uniqueEmail('audit-unverified');
    const response = await request(app())
      .post('/api/auth/sign-up/email')
      .set('Content-Type', 'application/json')
      .send({ email, password: STRONG_PASSWORD, name: 'Unverified Client' });

    expect(response.status).toBeLessThan(400);
    const user = await User.findOne({ email }).lean().exec();
    expect(user?.emailVerified).toBe(false);
  });

  it('Issue 3.4: returns a clean JSON 403 error on disallowed CORS origin without throwing HTTP 500', async () => {
    const response = await request(app())
      .get('/api/v1/health')
      .set('Origin', 'https://malicious-site.attacker.com');

    expect(response.status).toBe(403);
    expect(response.headers['content-type']).toContain('application/json');
    expect(response.body).toMatchObject({
      error: {
        code: 'FORBIDDEN',
        message: expect.stringContaining('origin is not allowed'),
      },
    });
  });

  it('Issue 3.3: strictly rejects unexpected fields on /api/v1/client-errors', async () => {
    const response = await request(app())
      .post('/api/v1/client-errors')
      .set('Content-Type', 'application/json')
      .send({
        path: '/portal/documents',
        message: 'Normal test error',
        unexpectedInjectedField: 'malicious-probe',
      });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      error: {
        code: 'VALIDATION_FAILED',
      },
    });
  });

  it('Issue 3.8: never reflects client-supplied X-Request-Id header', async () => {
    const clientSuppliedId = 'attacker-crafted-request-id-probe-99';
    const response = await request(app())
      .get('/api/v1/health')
      .set('X-Request-Id', clientSuppliedId);

    expect(response.status).toBe(200);
    const returnedHeader = response.headers['x-request-id'] as string;
    expect(returnedHeader).not.toBe(clientSuppliedId);
    expect(returnedHeader).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
  });

  it('Issue 3.9: root status does not leak service brand details', async () => {
    const response = await request(app())
      .get('/')
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
    expect(JSON.stringify(response.body)).not.toContain('FirmDesk');
  });

  it('Issue 3.1: refuses to link an unverified client account to a client record', async () => {
    const admin = await createAccount({ role: 'admin' });
    const clientId = await makeClient();
    const unverifiedUser = await createAccount({ role: 'client', emailVerified: false });

    const response = await request(app())
      .put(`/api/v1/users/${unverifiedUser.id.toString()}/linked-clients`)
      .set(auth(admin))
      .set('Content-Type', 'application/json')
      .send({ clientIds: [clientId.toString()] });

    expect(response.status).toBe(409);
    expect(response.body.error.message).toContain('not verified their email address yet');
  });

  it('Issue 3.1: purges unlinked accounts when requested by admin', async () => {
    const admin = await createAccount({ role: 'admin' });
    const orphan = await createAccount({ role: 'client', emailVerified: false });
    // Backdate createdAt to 40 days ago using collection directly
    await User.collection.updateOne(
      { _id: orphan.id },
      { $set: { createdAt: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000) } },
    );

    const response = await request(app())
      .delete('/api/v1/users/unlinked')
      .set(auth(admin))
      .set('Content-Type', 'application/json')
      .send({ olderThanDays: 30, unverifiedOnly: true });

    expect(response.status).toBe(200);
    expect(response.body.data.deleted).toBeGreaterThanOrEqual(1);
    expect(await User.findById(orphan.id)).toBeNull();
  });
});
