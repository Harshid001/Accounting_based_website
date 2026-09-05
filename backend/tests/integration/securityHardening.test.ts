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

// ─── Regression: C-01 — No email address ever triggers server-side admin promotion ───

describe('C-01 regression: no email triggers admin promotion on authenticated request', () => {
  it('a plain client user remains client after any number of authenticated requests', async () => {
    const account = await createAccount({ role: 'client' });

    // Hit multiple authenticated endpoints — role must never change
    await request(app()).get('/api/v1/me').set(auth(account));
    await request(app()).get('/api/v1/me').set(auth(account));

    const record = await User.findById(account.id).lean().exec();
    expect(record?.role).toBe('client');
  });

  it('a staff user remains staff after authenticated requests', async () => {
    const account = await createAccount({ role: 'staff' });

    await request(app()).get('/api/v1/me').set(auth(account));

    const record = await User.findById(account.id).lean().exec();
    expect(record?.role).toBe('staff');
  });

  it('signing up with any email — including former hardcoded values — never grants admin', async () => {
    // Using a safe test-domain variant of the previously-hardcoded owner emails
    const suspiciousEmails = [
      'xstream6797@firmdesk.test',
      'harshidsoni01@firmdesk.test',
    ];

    for (const email of suspiciousEmails) {
      const signUpRes = await request(app())
        .post('/api/auth/sign-up/email')
        .set('Content-Type', 'application/json')
        .send({ email, password: STRONG_PASSWORD, name: 'Backdoor Probe' });

      // Should succeed (new account) or 409 (already exists) — never 500
      expect(signUpRes.status).not.toBe(500);

      const record = await User.findOne({ email }).lean().exec();
      if (record) {
        // The account must be a plain client — never auto-promoted
        expect(record.role).toBe('client');
        expect(record.emailVerified).toBe(false);
      }
    }
  });

  it('/api/v1/me response never returns role=admin for a client account', async () => {
    const account = await createAccount({ role: 'client' });
    const response = await request(app()).get('/api/v1/me').set(auth(account));
    expect(response.status).toBe(200);
    const data = response.body.data as { role?: string };
    expect(data.role).toBe('client');
  });
});

// ─── Regression: C-02 — No "first user becomes admin" auto-fallback ──────────

describe('C-02 regression: no automatic admin promotion when admin seat is vacant', () => {
  it('with zero admins in the DB, a client request is NOT promoted to admin', async () => {
    // Create a client account, then strip all admin roles to simulate a vacant admin seat
    const account = await createAccount({ role: 'client' });
    await User.updateMany({ role: 'admin' }, { $set: { role: 'staff' } }).exec();

    // Make an authenticated request
    await request(app()).get('/api/v1/me').set(auth(account));

    // The user's role in the DB must still be client — never auto-promoted
    const record = await User.findById(account.id).lean().exec();
    expect(record?.role).toBe('client');
  });

  it('with zero admins in the DB, a staff request is NOT promoted to admin', async () => {
    const account = await createAccount({ role: 'staff' });
    await User.updateMany({ role: 'admin' }, { $set: { role: 'staff' } }).exec();

    await request(app()).get('/api/v1/me').set(auth(account));

    const record = await User.findById(account.id).lean().exec();
    expect(record?.role).toBe('staff');
  });
});

// ─── Regression: H-01 — Unverified accounts stay unverified ──────────────────

describe('H-01 regression: unverified accounts are never auto-verified', () => {
  it('a freshly registered account remains unverified (no boot mass-verify can flip it)', async () => {
    const email = uniqueEmail('h01-unverified');
    const signUpRes = await request(app())
      .post('/api/auth/sign-up/email')
      .set('Content-Type', 'application/json')
      .send({ email, password: STRONG_PASSWORD, name: 'Unverified Probe' });

    expect(signUpRes.status).toBeLessThan(400);

    // Verify immediately after signup — must be false
    const record = await User.findOne({ email }).lean().exec();
    expect(record?.emailVerified).toBe(false);
  });

  it('an unverified account is blocked by requireAuth with EMAIL_UNVERIFIED', async () => {
    const account = await createAccount({ role: 'client', emailVerified: false });
    const response = await request(app()).get('/api/v1/clients').set(auth(account));
    expect(response.status).toBe(403);
    expect(response.body.error.code).toBe('EMAIL_UNVERIFIED');
  });

  it('an unverified admin-role account is also blocked until verified', async () => {
    const account = await createAccount({ role: 'admin', emailVerified: false });
    const response = await request(app()).get('/api/v1/users').set(auth(account));
    expect(response.status).toBe(403);
    expect(response.body.error.code).toBe('EMAIL_UNVERIFIED');
  });
});

// ─── Regression: Revision 3 Security Hardening ──────────────────────────────

describe('Security Hardening Revision 3', () => {
  it('preserves audit logs beyond 10 records without anti-forensic truncation', async () => {
    const { recordAudit } = await import('../../src/services/audit.service.js');
    const { AuditLog } = await import('../../src/models/auditLog.model.js');
    const clientId = await makeClient();

    const initialCount = await AuditLog.countDocuments();
    // Record 15 audit logs
    for (let i = 0; i < 15; i++) {
      await recordAudit({
        actor: { id: null, role: 'admin', ip: '127.0.0.1', userAgent: 'test', requestId: null },
        action: 'sign_in',
        entityKind: 'session',
        client: clientId,
        summary: `Audit log entry test #${i}`,
      });
    }

    const finalCount = await AuditLog.countDocuments();
    expect(finalCount).toBe(initialCount + 15);
    expect(finalCount).toBeGreaterThan(10);
  });

  it('rejects document finalise if storageKey prefix does not match clientId', async () => {
    const admin = await createAccount({ role: 'admin' });
    const clientA = await makeClient();
    const clientB = await makeClient();

    // Attacker tries to finalize an S3 key belonging to clientA under clientB
    const response = await request(app())
      .post('/api/v1/documents')
      .set(auth(admin))
      .send({
        clientId: clientB.toString(),
        storageKey: `clients/${clientA.toString()}/some-file.pdf`,
        filename: 'tax-filing.pdf',
        mimeType: 'application/pdf',
        title: 'Attacker Attached Document',
        documentType: 'tax_document',
      });

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe('VALIDATION_FAILED');
  });

  it('rejects task creation if blockedBy references a task from another client', async () => {
    const admin = await createAccount({ role: 'admin' });
    const clientA = await makeClient();
    const clientB = await makeClient();
    const { makeTask } = await import('../helpers/factories.js');

    const foreignTask = await makeTask({
      client: clientA,
      assignee: admin.id,
      title: 'Client A Secret Task',
    });

    const response = await request(app())
      .post('/api/v1/tasks')
      .set(auth(admin))
      .send({
        clientId: clientB.toString(),
        title: 'Client B Task',
        assigneeId: admin.id.toString(),
        blockedBy: [foreignTask.toString()],
      });

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe('VALIDATION_FAILED');
  });

  it('rejects task creation if complianceItemId belongs to another client', async () => {
    const admin = await createAccount({ role: 'admin' });
    const clientA = await makeClient();
    const clientB = await makeClient();
    const { makeComplianceItem, makeComplianceType } = await import('../helpers/factories.js');

    const typeId = await makeComplianceType();
    const foreignCompliance = await makeComplianceItem(clientA, typeId);

    const response = await request(app())
      .post('/api/v1/tasks')
      .set(auth(admin))
      .send({
        clientId: clientB.toString(),
        title: 'Client B Task With Foreign Filing',
        assigneeId: admin.id.toString(),
        complianceItemId: foreignCompliance.toString(),
      });

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe('VALIDATION_FAILED');
  });

  it('sanitizes CRLF and control characters in root redirect error query', async () => {
    const response = await request(app())
      .get('/?error=Malicious%0d%0aInjected-Header:%20val%3Cscript%3E')
      .redirects(0);

    expect(response.status).toBe(302);
    const location = response.headers.location as string;
    expect(location).toBeDefined();
    expect(location).not.toContain('\r');
    expect(location).not.toContain('\n');
    expect(location).not.toContain('<script>');
  });
});
