import {
  Eye,
  FolderLock,
  KeyRound,
  Lock,
} from 'lucide-react';

export function SecurityTrustSection() {
  const securityFeatures = [
    {
      icon: <Lock className="h-5 w-5 text-purple-400" />,
      title: 'AES-256-GCM Aadhaar Protection',
      description:
        'Sensitive 12-digit Aadhaar identifiers are encrypted at rest using node:crypto with authenticated Galois/Counter Mode. Masked across all staff serialisers and exposed only through audited Partner reveals.',
    },
    {
      icon: <FolderLock className="h-5 w-5 text-emerald-400" />,
      title: '60-Second Ephemeral Transfer URLs',
      description:
        'Confidential financial statements and invoices stream directly to MongoDB GridFS through short-lived signed URLs. Files are never stored on public CDNs or accessible without active session authorization.',
    },
    {
      icon: <KeyRound className="h-5 w-5 text-sky-400" />,
      title: 'Scrypt Password & Session Hardening',
      description:
        'Credentials hashed with memory-hard scrypt via Better Auth. Role-based session lifetimes (7-day sliding expiry for staff, 30 days for clients) with automated MongoDB TTL reaping.',
    },
    {
      icon: <Eye className="h-5 w-5 text-amber-400" />,
      title: 'Immutable Audit Logging',
      description:
        'Every sensitive action—document uploads, filing status modifications, Aadhaar reveals, and client profile updates—is stamped with user IDs, IP addresses, and timestamps for ICAI peer review compliance.',
    },
  ];

  return (
    <section id="security" className="scroll-mt-20 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-md bg-purple-500/15 px-2.5 py-1 text-xs font-semibold text-purple-400 uppercase tracking-wider">
            Institutional Trust & Privacy
          </div>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-[var(--fd-text-primary)] sm:text-4xl">
            Bank-Grade Security for Your Most Confidential Data
          </h2>
          <p className="mt-3 text-base text-[var(--fd-text-secondary)]">
            Tax documents, balance sheets, and identification numbers demand the highest standard of technical safeguards.
            FirmDesk is engineered from the database layer up to protect client confidentiality.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {securityFeatures.map((feat, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-[var(--fd-border)] bg-[var(--fd-surface-1)] p-6 shadow-xs transition-all hover:border-[var(--fd-accent)]"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--fd-surface-2)]">
                  {feat.icon}
                </div>
                <h3 className="text-base font-bold text-[var(--fd-text-primary)]">{feat.title}</h3>
              </div>
              <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[var(--fd-text-secondary)]">
                {feat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
