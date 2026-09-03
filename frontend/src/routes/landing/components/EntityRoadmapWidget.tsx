import { useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  Clock,
  FileCheck,
  Scale,
  Sparkles,
} from 'lucide-react';

interface EntityRoadmap {
  title: string;
  badge: string;
  description: string;
  monthly: string[];
  quarterly: string[];
  annual: string[];
  entitySpecific: string[];
  riskSaved: string;
}

type EntityKey = 'pvt_ltd' | 'llp' | 'partnership' | 'proprietorship';

const ENTITY_ROADMAPS: Record<EntityKey, EntityRoadmap> = {
  pvt_ltd: {
    title: 'Private Limited Company (Pvt Ltd)',
    badge: 'Companies Act + GST + IT Act',
    description:
      'High statutory rigor requiring mandatory statutory audit, ROC MCA filings, GST reconciliation, and quarterly advance tax.',
    monthly: ['GSTR-1 (11th) Outward Register', 'GSTR-3B (20th) Net Tax & ITC reconciliation', 'PF & ESI Challans (15th)'],
    quarterly: ['TDS Form 24Q & 26Q (31st)', 'Advance Tax (15 Jun, 15 Sep, 15 Dec, 15 Mar)'],
    annual: ['Tax Audit Form 3CA-3CD (30 Sep)', 'ITR-6 Corporate Income Tax (31 Oct)', 'GSTR-9 & 9C Annual Reconciliation (31 Dec)'],
    entitySpecific: ['e-Form AOC-4 Financial Statements (30 days from AGM)', 'e-Form MGT-7 Annual Return (60 days from AGM)', 'DIR-3 KYC for all active Directors (30 Sep)', 'Form MSME-1 Bi-annual Returns'],
    riskSaved: 'Over ₹2,50,000 in potential statutory late fees & director disqualifications avoided per year.',
  },
  llp: {
    title: 'Limited Liability Partnership (LLP)',
    badge: 'LLP Act 2008 + Tax Laws',
    description:
      'Combines corporate structure with pass-through flexibility. Requires annual MCA filing of statement of accounts & solvency.',
    monthly: ['GSTR-1 Outward Return', 'GSTR-3B Tax Settlement'],
    quarterly: ['TDS Returns (26Q / 24Q)', 'Quarterly Advance Tax Instalments'],
    annual: ['Tax Audit u/s 44AB (if turnover > limits)', 'ITR-5 Partnership Return (31 Jul / 31 Oct)', 'GSTR-9 Annual Return'],
    entitySpecific: ['Form 11 Annual Return of LLP (30 May)', 'Form 8 Statement of Account & Solvency (30 Oct)', 'Designated Partner KYC'],
    riskSaved: 'Zero late fees under LLP Act (which accumulate at ₹100/day per form indefinitely).',
  },
  partnership: {
    title: 'Partnership Firm (Registered / Unregistered)',
    badge: 'Indian Partnership Act + IT Act',
    description:
      'Focuses on partner remuneration limits u/s 40(b), GST compliance, and audited financial statements.',
    monthly: ['GSTR-1 Outward Invoices', 'GSTR-3B Monthly Tax Return'],
    quarterly: ['TDS Returns on Contractor & Rent Payments', 'Advance Tax Q1-Q4'],
    annual: ['Tax Audit u/s 44AB (if turnover > ₹1 Cr / ₹10 Cr digital)', 'ITR-5 Partnership Filing', 'Partners Capital Account Reconciliation'],
    entitySpecific: ['Sec 40(b) Partner Remuneration & Interest Verification', 'Form 3CD Partner Transaction Annexures'],
    riskSaved: 'Prevents disallowance of partner salary and saves interest penalties under Section 234.',
  },
  proprietorship: {
    title: 'Sole Proprietorship & Trader',
    badge: 'Micro & Small Business (MSME)',
    description:
      'Streamlined compliance focused on GST QRMP or monthly returns, presumptive taxation (Sec 44AD), and personal ITR-3/4.',
    monthly: ['GSTR-1 / IFF Invoice Upload', 'GSTR-3B Tax Payment & ITC Claim'],
    quarterly: ['TDS on high-value payments (Sec 194-IB/194M)', 'Advance Tax (Single instalment on 15 Mar if 44AD)'],
    annual: ['ITR-3 / ITR-4 Presumptive Return (31 Jul or 31 Oct)', 'GSTR-9 Annual Return (if turnover > ₹2 Cr)'],
    entitySpecific: ['Bank statement reconciliation across business vs personal transactions', 'Presumptive 6%/8% profit calculation under Sec 44AD'],
    riskSaved: 'Guarantees on-time ITR filing to carry forward business losses and avoid late fee u/s 234F.',
  },
};

export function EntityRoadmapWidget() {
  const [selectedEntity, setSelectedEntity] = useState<EntityKey>('pvt_ltd');
  const data = ENTITY_ROADMAPS[selectedEntity];

  return (
    <section id="entity-roadmap" className="scroll-mt-20 py-16 lg:py-24 border-t border-[var(--fd-border-subtle)] bg-[var(--fd-surface-1)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-md bg-sky-500/15 px-2.5 py-1 text-xs font-semibold text-sky-400 uppercase tracking-wider">
            Custom Statutory Roadmap
          </div>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-[var(--fd-text-primary)] sm:text-4xl">
            Tailored Statutory Calendar for Every Entity Type
          </h2>
          <p className="mt-3 text-base text-[var(--fd-text-secondary)]">
            Select your business structure below to see the exact statutory filings, regulatory milestones,
            and document requirements FirmDesk monitors for you.
          </p>

          {/* Entity Selector Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {(
              [
                { id: 'pvt_ltd', label: 'Private Limited Company' },
                { id: 'llp', label: 'Limited Liability Partnership (LLP)' },
                { id: 'partnership', label: 'Partnership Firm' },
                { id: 'proprietorship', label: 'Sole Proprietorship / MSME' },
              ] as const
            ).map((btn) => (
              <button
                key={btn.id}
                type="button"
                onClick={() => setSelectedEntity(btn.id)}
                className={`rounded-lg px-3.5 py-2 text-xs sm:text-sm font-semibold transition-all ${
                  selectedEntity === btn.id
                    ? 'bg-[var(--fd-accent)] text-[var(--fd-accent-contrast)] shadow-xs'
                    : 'bg-[var(--fd-surface-2)] text-[var(--fd-text-secondary)] hover:bg-[var(--fd-surface-3)] hover:text-[var(--fd-text-primary)]'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Roadmap Display Card */}
        <div className="mt-10 rounded-2xl border border-[var(--fd-border)] bg-[var(--fd-bg)] p-6 sm:p-8 shadow-sm">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--fd-border-subtle)] pb-5">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-[var(--fd-text-primary)]">{data.title}</h3>
                <span className="rounded bg-[var(--fd-accent-subtle-bg)] px-2 py-0.5 text-xs font-semibold text-[var(--fd-accent)]">
                  {data.badge}
                </span>
              </div>
              <p className="mt-1 text-xs sm:text-sm text-[var(--fd-text-secondary)]">{data.description}</p>
            </div>
            <div className="shrink-0 rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 text-xs text-emerald-400 font-semibold">
              FY 2026–27 Statutory Cycle
            </div>
          </div>

          {/* 4-Column Milestones */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Monthly */}
            <div className="rounded-xl border border-[var(--fd-border-subtle)] bg-[var(--fd-surface-1)] p-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[var(--fd-text-primary)]">
                <Clock className="h-4 w-4 text-[var(--fd-accent)]" />
                <span>Monthly Cycles</span>
              </div>
              <ul className="mt-3 space-y-2 text-xs text-[var(--fd-text-secondary)]">
                {data.monthly.map((m, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400 mt-0.5" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quarterly */}
            <div className="rounded-xl border border-[var(--fd-border-subtle)] bg-[var(--fd-surface-1)] p-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[var(--fd-text-primary)]">
                <Calendar className="h-4 w-4 text-sky-400" />
                <span>Quarterly Cycles</span>
              </div>
              <ul className="mt-3 space-y-2 text-xs text-[var(--fd-text-secondary)]">
                {data.quarterly.map((q, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-sky-400 mt-0.5" />
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Annual */}
            <div className="rounded-xl border border-[var(--fd-border-subtle)] bg-[var(--fd-surface-1)] p-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[var(--fd-text-primary)]">
                <FileCheck className="h-4 w-4 text-amber-400" />
                <span>Annual Filings</span>
              </div>
              <ul className="mt-3 space-y-2 text-xs text-[var(--fd-text-secondary)]">
                {data.annual.map((a, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-amber-400 mt-0.5" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Entity Specific */}
            <div className="rounded-xl border border-[var(--fd-border-subtle)] bg-[var(--fd-surface-1)] p-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[var(--fd-text-primary)]">
                <Scale className="h-4 w-4 text-purple-400" />
                <span>Entity-Specific ROC/KYC</span>
              </div>
              <ul className="mt-3 space-y-2 text-xs text-[var(--fd-text-secondary)]">
                {data.entitySpecific.map((e, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-purple-400 mt-0.5" />
                    <span>{e}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Risk Guard */}
          <div className="mt-6 rounded-lg bg-[var(--fd-surface-2)] p-3 text-xs text-[var(--fd-text-secondary)] flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[var(--fd-accent)]" />
              <span>{data.riskSaved}</span>
            </span>
            <span className="hidden sm:inline font-mono font-semibold text-emerald-400">
              Zero Failure Guarantee
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
