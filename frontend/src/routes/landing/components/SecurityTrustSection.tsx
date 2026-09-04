import {
  Eye,
  FileCheck2,
  FolderLock,
  KeyRound,
  Lock,
  Scale,
  ShieldCheck,
} from 'lucide-react';

export function SecurityTrustSection() {
  const securityFeatures = [
    {
      icon: <Lock className="h-5 w-5 text-purple-400" />,
      title: 'AES-256-GCM Encrypted Vaults',
      description:
        'Sensitive financial statements, salary registers, Aadhaar, and PAN identifiers are encrypted at rest using authenticated Galois/Counter Mode encryption, preventing unauthorized access.',
    },
    {
      icon: <FolderLock className="h-5 w-5 text-emerald-400" />,
      title: 'Ephemeral Signed Transfer Tokens',
      description:
        'Stop sending confidential balance sheets over open emails or WhatsApp. Files upload directly through short-lived, cryptographically signed tokens into private, isolated cloud storage.',
    },
    {
      icon: <Scale className="h-5 w-5 text-sky-400" />,
      title: 'Strict NDA & ICAI Professional Ethics',
      description:
        'Every client relationship is bound by institutional Non-Disclosure Agreements and the statutory Code of Ethics governed by the Institute of Chartered Accountants of India.',
    },
    {
      icon: <Eye className="h-5 w-5 text-amber-400" />,
      title: 'Tamper-Evident Access Audit Trails',
      description:
        'Every document view, tax calculation modification, and government submission is permanently logged with timestamps and user identifiers for corporate governance compliance.',
    },
  ];

  return (
    <section id="security" className="scroll-mt-20 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-md bg-purple-500/15 px-2.5 py-1 text-xs font-semibold text-purple-400 uppercase tracking-wider">
            Institutional Trust & Confidentiality
          </div>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-[var(--fd-text-primary)] sm:text-4xl">
            Bank-Grade Security for Your Critical Financial Data
          </h2>
          <p className="mt-3 text-base text-[var(--fd-text-secondary)]">
            Tax documents, cap tables, salary sheets, and joint venture contracts demand the highest standard of technical
            and legal safeguards. We protect your business confidentiality with institutional rigor.
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
                <h3 className="text-base font-bold text-[var(--fd-text-primary)]">
                  {feat.title}
                </h3>
              </div>
              <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[var(--fd-text-secondary)]">
                {feat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Reassurance Bar */}
        <div className="mt-10 rounded-xl border border-[var(--fd-border-subtle)] bg-[var(--fd-surface-1)] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[var(--fd-text-secondary)]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0" />
            <span>
              <strong>ISO & ICAI Best-Practices: </strong>
              All client data resides in isolated environments with zero third-party commercial data scraping.
            </span>
          </div>
          <a
            href="#consultation"
            className="font-bold text-[var(--fd-accent)] hover:text-[var(--fd-accent-hover)] shrink-0"
          >
            Request our Security & Compliance Whitepaper →
          </a>
        </div>
      </div>
    </section>
  );
}
