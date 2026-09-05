import { connectDatabase, disconnectDatabase, getDb } from '../src/config/db.js';
import { logger } from '../src/config/logger.js';
import { User } from '../src/models/user.model.js';

const PROBE_EMAILS = [
  'not.a.real.user@example.in',
  'jv-mass-094210@example.in',
  'jv-proto-094210@example.in',
  'jv-data-094914@example.in',
];

async function run(): Promise<void> {
  await connectDatabase();
  const db = getDb();

  logger.info({ emails: PROBE_EMAILS }, 'Cleaning up security assessment test accounts...');

  for (const email of PROBE_EMAILS) {
    const users = await User.find({ email: email.toLowerCase() }).lean().exec();
    for (const u of users) {
      // Remove sessions and account records from Better Auth
      await db.collection('session').deleteMany({ userId: u._id.toString() });
      await db.collection('account').deleteMany({ userId: u._id.toString() });
      await User.deleteOne({ _id: u._id }).exec();
      logger.info({ id: u._id, email: u.email }, 'Deleted assessment test account and sessions');
    }
  }

  // Also clean up any pattern-matching example.in test accounts created by the audit
  const regexUsers = await User.find({ email: /@example\.in$/i }).lean().exec();
  for (const u of regexUsers) {
    await db.collection('session').deleteMany({ userId: u._id.toString() });
    await db.collection('account').deleteMany({ userId: u._id.toString() });
    await User.deleteOne({ _id: u._id }).exec();
    logger.info({ id: u._id, email: u.email }, 'Deleted audit test account');
  }

  logger.info('Cleanup of assessment test accounts complete.');
  await disconnectDatabase();
}

run().catch((err: unknown) => {
  logger.fatal({ err }, 'Cleanup script failed');
  process.exitCode = 1;
});
