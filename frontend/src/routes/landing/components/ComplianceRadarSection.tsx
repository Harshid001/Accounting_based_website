import { useState } from 'react';
import {
  AlertCircle,
  Bell,
  Calendar,
  CheckCircle2,
} from 'lucide-react';

interface ComplianceItem {
  id: string;
  name: string;
  code: string;
  category: 'gst' | 'income_tax' | 'tds' | 'mca';
  frequency: string;
  rule: string;
  checklist: string[];
  penaltyRisk: string;
}

const STATUTORY_CATALOGUE: ComplianceItem[] = [
  {
    id: 'gstr1',
    name: 'GSTR-1 Monthly Return',
    code: 'GSTR-1',
    category: 'gst',
    frequency: 'Monthly (or QRMP)',
    rule: '11th of succeeding month',
    checklist: ['B2B outward tax invoices', 'Credit & debit notes register', 'Export invoices with shipping bills', 'HSN summary'],
    penaltyRisk: 'Late fee ₹50/day (₹20 for nil) + blocked e-way bill generation',
  },
  {
    id: 'gstr3b',
    name: 'GSTR-3B Summary & Tax Payment',
    code: 'GSTR-3B',
    category: 'gst',
    frequency: 'Monthly',
    rule: '20th of succeeding month',
    checklist: ['Monthly purchase register', 'GSTR-2B ITC auto-populated comparison', 'Outward tax ledger', 'Bank payment challans'],
    penaltyRisk: '18% p.a. interest on net tax + blocked ITC claims under Sec 16(4)',
  },
  {
    id: 'taxaudit',
    name: 'Tax Audit Report u/s 44AB',
    code: 'Form 3CA/3CB-3CD',
    category: 'income_tax',
    frequency: 'Annual',
    rule: '30th September of Assessment Year',
    checklist: ['Trial balance & general ledger', 'Depreciation schedules (Companies vs IT Act)', 'Related party disclosures (Sec 40A(2)(b))', 'GST vs Income Tax turnover reconciliation'],
    penaltyRisk: '0.5% of total turnover up to ₹1,50,000 penalty u/s 271B',
  },
  {
    id: 'advancetax',
    name: 'Advance Tax Instalments (Q1-Q4)',
    code: 'Sec 208/211',
    category: 'income_tax',
    frequency: 'Quarterly',
    rule: '15 Jun (15%), 15 Sep (45%), 15 Dec (75%), 15 Mar (100%)',
    checklist: ['Estimated annual profit computation', 'TDS credit in Form 26AS / AIS', 'Prior instalment challans'],
    penaltyRisk: 'Mandatory interest @ 1% per month u/s 234B & 234C',
  },
  {
    id: 'tds26q',
    name: 'TDS Return (Non-Salary Payments)',
    code: 'Form 26Q',
    category: 'tds',
    frequency: 'Quarterly',
    rule: '31st of month following quarter end (31 May for Q4)',
    checklist: ['Vendor invoice register with TDS deducted', 'BSR code challans (ITNS 281)', 'PAN verification sheet', '194C / 194J / 194Q classification'],
    penaltyRisk: 'Late fee ₹200/day u/s 234E + penalty up to ₹1,00,000 u/s 271H',
  },
  {
    id: 'aoc4',
    name: 'MCA Filing of Financial Statements',
    code: 'e-Form AOC-4 / AOC-4 XBRL',
    category: 'mca',
    frequency: 'Annual',
    rule: 'Within 30 days of Annual General Meeting (AGM)',
    checklist: ['Audited balance sheet & P&L', 'Directors report & MGT-9 extract', 'Auditors report with CARO notes', 'Notice of AGM'],
    penaltyRisk: '₹100/day continuing penalty on company and officers in default',
  },
];

export function ComplianceRadarSection() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'gst' | 'income_tax' | 'tds' | 'mca'>('all');
  const [expandedId, setExpandedId] = useState<string | null>('gstr3b');

  const filteredCatalogue = STATUTORY_CATALOGUE.filter(
    (item) => selectedCategory === 'all' || item.category === selectedCategory,
  );

  return (
    <section id="compliance-radar" className="scroll-mt-20 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500/15 px-2.5 py-1 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            Built-in Indian Regulatory Engine
          </div>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-[var(--fd-text-primary)] sm:text-4xl">
            Statutory Horizon Radar & Rules
          </h2>
          <p className="mt-3 text-base text-[var(--fd-text-secondary)]">
            Never miss a regulatory deadline again. FirmDesk automatically tracks 40+ statutory filing schedules,
            calculates legal due dates under the Income Tax Act, GST Law, and Companies Act, and sends automated
            checklists to clients ahead of penalty windows.
          </p>

          {/* Category Filter Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'all', label: 'All Compliance' },
              { id: 'gst', label: 'GST Filings (GSTR)' },
              { id: 'income_tax', label: 'Income Tax & Audit' },
              { id: 'tds', label: 'TDS / TCS Returns' },
              { id: 'mca', label: 'MCA & ROC Filings' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedCategory(tab.id as typeof selectedCategory)}
                className={`rounded-lg px-3.5 py-1.5 text-xs sm:text-sm font-medium transition-colors ${
                  selectedCategory === tab.id
                    ? 'bg-[var(--fd-accent)] text-[var(--fd-accent-contrast)] shadow-xs'
                    : 'bg-[var(--fd-surface-2)] text-[var(--fd-text-secondary)] hover:bg-[var(--fd-surface-3)] hover:text-[var(--fd-text-primary)]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Compliance Cards Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCatalogue.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <div
                key={item.id}
                className="flex flex-col justify-between rounded-xl border border-[var(--fd-border)] bg-[var(--fd-surface-1)] p-5 shadow-xs transition-all duration-200 hover:border-[var(--fd-accent)]"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="rounded bg-[var(--fd-accent-subtle-bg)] px-2 py-0.5 font-mono text-xs font-bold text-[var(--fd-accent)]">
                        {item.code}
                      </span>
                      <h3 className="mt-2 text-base font-bold text-[var(--fd-text-primary)]">{item.name}</h3>
                    </div>
                    <span className="shrink-0 rounded-full border border-[var(--fd-border-subtle)] bg-[var(--fd-surface-2)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--fd-text-secondary)]">
                      {item.frequency}
                    </span>
                  </div>

                  {/* Statutory Rule */}
                  <div className="mt-4 rounded-lg bg-[var(--fd-surface-2)] p-3 text-xs">
                    <div className="flex items-center gap-1.5 font-semibold text-[var(--fd-text-primary)]">
                      <Calendar className="h-3.5 w-3.5 text-[var(--fd-accent)]" aria-hidden="true" />
                      <span>Statutory Due Date Rule:</span>
                    </div>
                    <div className="mt-1 text-[var(--fd-text-secondary)]">{item.rule}</div>
                  </div>

                  {/* Document Checklist Preview */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs font-semibold text-[var(--fd-text-secondary)]">
                      <span>Required Document Checklist:</span>
                      <button
                        type="button"
                        onClick={() => setExpandedId(isExpanded ? null : item.id)}
                        className="text-[var(--fd-accent)] hover:underline cursor-pointer"
                      >
                        {isExpanded ? 'Hide items' : `Show all (${item.checklist.length})`}
                      </button>
                    </div>

                    <ul className="mt-2 space-y-1.5 text-xs text-[var(--fd-text-secondary)]">
                      {(isExpanded ? item.checklist : item.checklist.slice(0, 2)).map((check, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400 mt-0.5" aria-hidden="true" />
                          <span>{check}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Penalty Risk Guard */}
                <div className="mt-5 border-t border-[var(--fd-border-subtle)] pt-3 text-[11px] text-[var(--fd-text-tertiary)] flex items-start gap-1.5">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0 text-rose-400 mt-0.5" aria-hidden="true" />
                  <span>
                    <strong className="text-rose-400">Risk Guard:</strong> {item.penaltyRisk}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Proactive Offsets Banner */}
        <div className="mt-10 rounded-xl border border-[var(--fd-border)] bg-[var(--fd-surface-2)] p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--fd-accent)] text-[var(--fd-accent-contrast)]">
              <Bell className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[var(--fd-text-primary)]">
                Automated 7-Day, 3-Day & 1-Day Reminder Escalation
              </h4>
              <p className="text-xs text-[var(--fd-text-secondary)]">
                FirmDesk automatically prompts clients to upload invoices and statements before the statutory cutoff,
                ensuring zero last-minute portal crashes or late fees.
              </p>
            </div>
          </div>
          <div className="shrink-0">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-400">
              <CheckCircle2 className="h-3.5 w-3.5" />
              100% Automated Scheduler
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
