import {
  Calendar,
  FolderLock,
  Lock,
  ShieldCheck,
  UploadCloud,
  Users,
} from 'lucide-react';

export function BentoFeaturesSection() {
  return (
    <section id="features" className="scroll-mt-20 py-16 lg:py-24 border-t border-[var(--fd-border-subtle)] bg-[var(--fd-surface-1)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-md bg-[var(--fd-accent-subtle-bg)] px-2.5 py-1 text-xs font-semibold text-[var(--fd-accent)] uppercase tracking-wider">
            Engineered For Precision
          </div>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-[var(--fd-text-primary)] sm:text-4xl">
            Everything an Indian CA Practice Needs Under One Roof
          </h2>
          <p className="mt-3 text-base text-[var(--fd-text-secondary)]">
            Ditch disconnected spreadsheets, WhatsApp threads, and unencrypted email attachments. FirmDesk is built
            specifically to run an Indian accounting practice with institutional reliability.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Large Featured Card (2 cols on md) */}
          <div className="md:col-span-2 rounded-2xl border border-[var(--fd-border)] bg-[var(--fd-bg)] p-6 sm:p-8 relative overflow-hidden group hover:border-[var(--fd-accent)] transition-all">
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--fd-accent)] text-[var(--fd-accent-contrast)]">
                <Calendar className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="rounded-full border border-[var(--fd-border-subtle)] bg-[var(--fd-surface-2)] px-3 py-1 text-xs font-mono font-semibold text-[var(--fd-accent)]">
                120-Day Horizon
              </span>
            </div>

            <h3 className="mt-5 text-xl font-bold text-[var(--fd-text-primary)] sm:text-2xl">
              Automated Statutory Horizon Engine
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--fd-text-secondary)] max-w-xl">
              FirmDesk continuously evaluates the 120-day compliance horizon. It calculates precise statutory due dates
              for every registered client entity based on GST registration type, turnover thresholds, and financial year
              cycles, generating task checklists automatically.
            </p>

            {/* Visual simulation inside card */}
            <div className="mt-6 rounded-xl border border-[var(--fd-border)] bg-[var(--fd-surface-1)] p-4">
              <div className="flex items-center justify-between text-xs font-semibold text-[var(--fd-text-secondary)]">
                <span>Compliance Cycle Projection:</span>
                <span className="text-emerald-400 font-mono">Status: Auto-Scheduled</span>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="rounded-lg bg-[var(--fd-surface-2)] p-2.5">
                  <div className="font-mono text-xs text-[var(--fd-accent)] font-bold">11th · GSTR-1</div>
                  <div className="text-[11px] text-[var(--fd-text-secondary)]">Outward Register</div>
                </div>
                <div className="rounded-lg bg-[var(--fd-surface-2)] p-2.5">
                  <div className="font-mono text-xs text-sky-400 font-bold">20th · GSTR-3B</div>
                  <div className="text-[11px] text-[var(--fd-text-secondary)]">Net Tax & ITC</div>
                </div>
                <div className="rounded-lg bg-[var(--fd-surface-2)] p-2.5">
                  <div className="font-mono text-xs text-amber-400 font-bold">30th · Tax Audit</div>
                  <div className="text-[11px] text-[var(--fd-text-secondary)]">Form 3CD Signs</div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Signed Transfer Vault */}
          <div className="rounded-2xl border border-[var(--fd-border)] bg-[var(--fd-bg)] p-6 sm:p-8 flex flex-col justify-between group hover:border-[var(--fd-accent)] transition-all">
            <div>
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400">
                <FolderLock className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-[var(--fd-text-primary)]">
                60s Signed Transfer Vault
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[var(--fd-text-secondary)] leading-relaxed">
                Files transfer straight into MongoDB GridFS through 60-second signed URLs.
                Zero credential exposure, zero third-party snooping, and strict mime-type validation.
              </p>
            </div>
            <div className="mt-6 rounded-lg bg-[var(--fd-surface-2)] p-3 text-[11px] font-mono text-emerald-400 flex items-center gap-2">
              <Lock className="h-3.5 w-3.5 shrink-0" />
              <span>Signed Transfer URL Handshake</span>
            </div>
          </div>

          {/* Card 3: Aadhaar AES-256 Encryption */}
          <div className="rounded-2xl border border-[var(--fd-border)] bg-[var(--fd-bg)] p-6 sm:p-8 flex flex-col justify-between group hover:border-[var(--fd-accent)] transition-all">
            <div>
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/15 text-purple-400">
                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-[var(--fd-text-primary)]">
                AES-256-GCM Aadhaar Security
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[var(--fd-text-secondary)] leading-relaxed">
                Encrypted with Node crypto at the schema boundary. Never appears in staff serializers or logs.
                Partners access it only through audited, logged reveal endpoints.
              </p>
            </div>
            <div className="mt-6 rounded-lg bg-[var(--fd-surface-2)] p-3 text-[11px] font-mono text-[var(--fd-text-tertiary)] flex items-center justify-between">
              <span>•••• •••• 9281</span>
              <span className="text-purple-400 text-[10px] font-semibold">GCM ENCRYPTED</span>
            </div>
          </div>

          {/* Card 4: Document Request Pipeline */}
          <div className="rounded-2xl border border-[var(--fd-border)] bg-[var(--fd-bg)] p-6 sm:p-8 flex flex-col justify-between group hover:border-[var(--fd-accent)] transition-all">
            <div>
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500/15 text-sky-400">
                <UploadCloud className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-[var(--fd-text-primary)]">
                Structured Document Requests
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[var(--fd-text-secondary)] leading-relaxed">
                End the chaos of lost WhatsApp photos. Request missing bank statements or invoices with 1 click;
                clients upload directly into the corresponding filing record.
              </p>
            </div>
            <div className="mt-6 rounded-lg bg-[var(--fd-surface-2)] p-3 text-[11px] text-[var(--fd-text-secondary)] flex items-center justify-between">
              <span>Status: Awaiting Client</span>
              <span className="text-amber-400 font-semibold font-mono">1-Click Handshake</span>
            </div>
          </div>

          {/* Card 5: Team Workload & Roster Analytics */}
          <div className="rounded-2xl border border-[var(--fd-border)] bg-[var(--fd-bg)] p-6 sm:p-8 flex flex-col justify-between group hover:border-[var(--fd-accent)] transition-all">
            <div>
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/15 text-amber-400">
                <Users className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-[var(--fd-text-primary)]">
                Team Workload & Roster Balancing
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[var(--fd-text-secondary)] leading-relaxed">
                Monitor task allocation across Senior CAs, Article Assistants, and Accountants.
                Prevent burnout during peak September and October audit marathons.
              </p>
            </div>
            <div className="mt-6 rounded-lg bg-[var(--fd-surface-2)] p-3 text-[11px] text-[var(--fd-text-secondary)] flex items-center justify-between">
              <span>Article Capacity: 84%</span>
              <span className="text-emerald-400 font-semibold font-mono">Balanced</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
