import {
  Building2,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';

export function DualExperienceSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-md bg-[var(--fd-accent-subtle-bg)] px-2.5 py-1 text-xs font-semibold text-[var(--fd-accent)] uppercase tracking-wider">
            Dual Value Proposition
          </div>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-[var(--fd-text-primary)] sm:text-4xl">
            Built for Both Sides of the Professional Relationship
          </h2>
          <p className="mt-3 text-base text-[var(--fd-text-secondary)]">
            A great accounting system must empower practitioners while delighting busy founders and finance directors.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: For the Accounting Practice */}
          <div className="rounded-2xl border border-[var(--fd-border)] bg-[var(--fd-surface-1)] p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--fd-accent)] text-[var(--fd-accent-contrast)]">
                <ShieldCheck className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--fd-accent)]">
                  For Partners & Staff
                </span>
                <h3 className="text-xl font-bold text-[var(--fd-text-primary)]">The Accounting Practice</h3>
              </div>
            </div>

            <p className="mt-4 text-sm text-[var(--fd-text-secondary)] leading-relaxed">
              Eliminate the chaos of tax season. Run multi-client operations with full operational clarity and
              zero penalty liability.
            </p>

            <ul className="mt-6 space-y-3.5 text-sm text-[var(--fd-text-secondary)]">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" aria-hidden="true" />
                <span>
                  <strong className="text-[var(--fd-text-primary)]">120-Day Predictive Horizon:</strong> Automatically
                  generates upcoming statutory filing tasks for every active client.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" aria-hidden="true" />
                <span>
                  <strong className="text-[var(--fd-text-primary)]">Workload Balancing:</strong> Assign filings to
                  Article Assistants and Managers with live capacity tracking.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" aria-hidden="true" />
                <span>
                  <strong className="text-[var(--fd-text-primary)]">Immutable Audit Trail:</strong> Every document
                  view, status change, and client interaction is logged for peer review.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" aria-hidden="true" />
                <span>
                  <strong className="text-[var(--fd-text-primary)]">Zero Document Chasing:</strong> Automated 7d/3d/1d
                  client alerts with structured upload links.
                </span>
              </li>
            </ul>
          </div>

          {/* Card 2: For Corporate Clients */}
          <div className="rounded-2xl border border-[var(--fd-border)] bg-[var(--fd-surface-1)] p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/15 text-sky-400">
                <Building2 className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">
                  For Founders & Directors
                </span>
                <h3 className="text-xl font-bold text-[var(--fd-text-primary)]">The Corporate & SME Client</h3>
              </div>
            </div>

            <p className="mt-4 text-sm text-[var(--fd-text-secondary)] leading-relaxed">
              Complete transparency over your statutory standing. Never wonder if your GST or ITR was filed on time.
            </p>

            <ul className="mt-6 space-y-3.5 text-sm text-[var(--fd-text-secondary)]">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-sky-400 mt-0.5" aria-hidden="true" />
                <span>
                  <strong className="text-[var(--fd-text-primary)]">24/7 Filing Receipt Vault:</strong> Download stamped
                  ITR-V, GSTR-3B receipts, and Form 3CD anytime for bank loan applications.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-sky-400 mt-0.5" aria-hidden="true" />
                <span>
                  <strong className="text-[var(--fd-text-primary)]">1-Click Mobile Uploads:</strong> Drag and drop bank
                  statements or invoices straight from desktop or smartphone.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-sky-400 mt-0.5" aria-hidden="true" />
                <span>
                  <strong className="text-[var(--fd-text-primary)]">Single Login for Multiple Entities:</strong> Switch
                  between your Private Limited, LLP, and family businesses seamlessly.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-sky-400 mt-0.5" aria-hidden="true" />
                <span>
                  <strong className="text-[var(--fd-text-primary)]">Contextual Messaging:</strong> Direct chat with your
                  assigned CA team anchored directly to specific compliance returns.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
