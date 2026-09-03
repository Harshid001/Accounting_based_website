import { useState } from 'react';
import {
  AlertCircle,
  Building2,
  CheckCircle2,
  Clock,
  Download,
  FileCheck,
  FileText,
  Filter,
  ShieldCheck,
  UploadCloud,
  User,
} from 'lucide-react';

export function InteractiveProductShowcase() {
  const [activeTab, setActiveTab] = useState<'staff' | 'client'>('staff');
  const [staffFilter, setStaffFilter] = useState<'all' | 'due' | 'review' | 'filed'>('all');
  const [uploadedDemoFile, setUploadedDemoFile] = useState<string | null>(null);

  const complianceItems = [
    {
      id: 'cmp-1',
      code: 'GSTR-3B',
      client: 'Apex Technologies Pvt Ltd',
      panGst: '27AABCA1234F1Z5',
      dueDate: '20 Sep 2026',
      status: 'review',
      statusLabel: 'Under Review',
      assignee: 'Priya Sharma (Sr. CA)',
      notes: 'ITC reconciliation matched; awaiting partner sign-off',
    },
    {
      id: 'cmp-2',
      code: 'Tax Audit u/s 44AB',
      client: 'Bharat Logistics LLP',
      panGst: 'AABCB9876K',
      dueDate: '30 Sep 2026',
      status: 'due',
      statusLabel: 'Due in 3 Days',
      assignee: 'Rohan Mehta (Article)',
      notes: 'Form 3CD Annexures compiled; turnover ₹9.4 Cr verified',
    },
    {
      id: 'cmp-3',
      code: 'TDS Return 26Q',
      client: 'Zenith Infra Solutions',
      panGst: 'DELZ01928F',
      dueDate: '31 Oct 2026',
      status: 'due',
      statusLabel: 'Pending Challan',
      assignee: 'Ananya Verma (Accountant)',
      notes: '12 challans verified against TRACES portal',
    },
    {
      id: 'cmp-4',
      code: 'GSTR-1 Monthly',
      client: 'Solis Healthcare Pvt Ltd',
      panGst: '27AABCS9988D1Z2',
      dueDate: '11 Sep 2026',
      status: 'filed',
      statusLabel: 'Filed & Verified',
      assignee: 'Harshid K. (Partner)',
      notes: 'ARN: AA270926019284K · Acknowledgment archived',
    },
  ];

  const filteredItems = complianceItems.filter((item) => {
    if (staffFilter === 'all') return true;
    if (staffFilter === 'due') return item.status === 'due';
    if (staffFilter === 'review') return item.status === 'review';
    if (staffFilter === 'filed') return item.status === 'filed';
    return true;
  });

  return (
    <section id="product-tour" className="scroll-mt-20 py-16 lg:py-24 border-y border-[var(--fd-border-subtle)] bg-[var(--fd-surface-1)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-md bg-[var(--fd-accent-subtle-bg)] px-2.5 py-1 text-xs font-semibold text-[var(--fd-accent)] uppercase tracking-wider">
            Interactive System Preview
          </div>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-[var(--fd-text-primary)] sm:text-4xl">
            Two Purpose-Built Portals. Zero Miscommunication.
          </h2>
          <p className="mt-3 text-base text-[var(--fd-text-secondary)]">
            Explore how practice partners orchestrate filing pipelines, while corporate clients track their
            statutory calendar and securely upload confidential records.
          </p>

          {/* Interactive Portal Switcher Tabs */}
          <div className="mt-8 inline-flex rounded-xl border border-[var(--fd-border)] bg-[var(--fd-surface-2)] p-1.5 shadow-sm">
            <button
              type="button"
              id="showcase-tab-staff"
              onClick={() => setActiveTab('staff')}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'staff'
                  ? 'bg-[var(--fd-surface-1)] text-[var(--fd-text-primary)] shadow-sm ring-1 ring-[var(--fd-border)]'
                  : 'text-[var(--fd-text-secondary)] hover:text-[var(--fd-text-primary)]'
              }`}
            >
              <ShieldCheck className="h-4 w-4 text-[var(--fd-accent)]" aria-hidden="true" />
              <span>Staff & Partner Workspace</span>
            </button>
            <button
              type="button"
              id="showcase-tab-client"
              onClick={() => setActiveTab('client')}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'client'
                  ? 'bg-[var(--fd-surface-1)] text-[var(--fd-text-primary)] shadow-sm ring-1 ring-[var(--fd-border)]'
                  : 'text-[var(--fd-text-secondary)] hover:text-[var(--fd-text-primary)]'
              }`}
            >
              <Building2 className="h-4 w-4 text-sky-400" aria-hidden="true" />
              <span>Client Entity Portal</span>
            </button>
          </div>
        </div>

        {/* Window Mockup Frame */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-[var(--fd-border)] bg-[var(--fd-bg)] shadow-2xl">
          {/* Mockup Header Bar */}
          <div className="flex h-11 items-center justify-between border-b border-[var(--fd-border)] bg-[var(--fd-surface-2)] px-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-rose-500/80" />
              <div className="h-3 w-3 rounded-full bg-amber-500/80" />
              <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-xs font-mono text-[var(--fd-text-tertiary)]">
                {activeTab === 'staff'
                  ? 'firmdesk.internal/operations/compliance-tracker'
                  : 'firmdesk.internal/portal/apex-technologies'}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[var(--fd-text-secondary)]">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
              <span className="hidden sm:inline font-mono">Realtime MongoDB GridFS · Connected</span>
            </div>
          </div>

          {/* VIEW 1: STAFF & PARTNER WORKSPACE */}
          {activeTab === 'staff' && (
            <div className="p-4 sm:p-6 lg:p-8 space-y-6">
              {/* Practice Top Summary Strip */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-lg border border-[var(--fd-border-subtle)] bg-[var(--fd-surface-1)] p-3">
                  <div className="text-xs text-[var(--fd-text-secondary)]">Active Clients</div>
                  <div className="mt-1 text-xl font-bold text-[var(--fd-text-primary)]">148 Entities</div>
                  <div className="text-[11px] text-emerald-400">100% KYC verified</div>
                </div>
                <div className="rounded-lg border border-[var(--fd-border-subtle)] bg-[var(--fd-surface-1)] p-3">
                  <div className="text-xs text-[var(--fd-text-secondary)]">Due in 7 Days</div>
                  <div className="mt-1 text-xl font-bold text-amber-400">14 Filings</div>
                  <div className="text-[11px] text-[var(--fd-text-tertiary)]">GST & Advance Tax</div>
                </div>
                <div className="rounded-lg border border-[var(--fd-border-subtle)] bg-[var(--fd-surface-1)] p-3">
                  <div className="text-xs text-[var(--fd-text-secondary)]">Under Review</div>
                  <div className="mt-1 text-xl font-bold text-[var(--fd-accent)]">9 Reviews</div>
                  <div className="text-[11px] text-[var(--fd-text-tertiary)]">Requires CA Sign-off</div>
                </div>
                <div className="rounded-lg border border-[var(--fd-border-subtle)] bg-[var(--fd-surface-1)] p-3">
                  <div className="text-xs text-[var(--fd-text-secondary)]">Statutory Success</div>
                  <div className="mt-1 text-xl font-bold text-emerald-400">99.8%</div>
                  <div className="text-[11px] text-[var(--fd-text-tertiary)]">Zero penalty notices</div>
                </div>
              </div>

              {/* Filter controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--fd-border-subtle)] pb-4">
                <div className="flex items-center gap-1.5">
                  <Filter className="h-4 w-4 text-[var(--fd-text-tertiary)]" aria-hidden="true" />
                  <span className="text-xs font-semibold text-[var(--fd-text-secondary)]">Filing Pipeline:</span>
                  {(['all', 'due', 'review', 'filed'] as const).map((filterKey) => (
                    <button
                      key={filterKey}
                      type="button"
                      onClick={() => setStaffFilter(filterKey)}
                      className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                        staffFilter === filterKey
                          ? 'bg-[var(--fd-accent)] text-[var(--fd-accent-contrast)]'
                          : 'bg-[var(--fd-surface-2)] text-[var(--fd-text-secondary)] hover:text-[var(--fd-text-primary)]'
                      }`}
                    >
                      {filterKey === 'all' && 'All Filings (4)'}
                      {filterKey === 'due' && 'Due Soon (2)'}
                      {filterKey === 'review' && 'Review (1)'}
                      {filterKey === 'filed' && 'Filed (1)'}
                    </button>
                  ))}
                </div>
                <div className="text-xs text-[var(--fd-text-tertiary)]">
                  Simulated Practice View · Updated live in IST
                </div>
              </div>

              {/* Compliance Table Preview */}
              <div className="overflow-x-auto rounded-lg border border-[var(--fd-border-subtle)] bg-[var(--fd-surface-1)]">
                <table className="w-full text-left text-xs text-[var(--fd-text-primary)]">
                  <thead className="border-b border-[var(--fd-border-subtle)] bg-[var(--fd-surface-2)] text-[11px] font-semibold text-[var(--fd-text-secondary)] uppercase">
                    <tr>
                      <th className="px-4 py-3">Statutory Return</th>
                      <th className="px-4 py-3">Entity Name</th>
                      <th className="px-4 py-3">Due Date</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Assigned Team</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--fd-border-subtle)]">
                    {filteredItems.map((item) => (
                      <tr key={item.id} className="hover:bg-[var(--fd-surface-2)]/50 transition-colors">
                        <td className="px-4 py-3 font-semibold text-[var(--fd-text-primary)]">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-[var(--fd-accent)]" aria-hidden="true" />
                            <span>{item.code}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-medium text-[var(--fd-text-primary)]">{item.client}</div>
                          <div className="font-mono text-[10px] text-[var(--fd-text-tertiary)]">{item.panGst}</div>
                        </td>
                        <td className="px-4 py-3 font-mono font-medium">{item.dueDate}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                              item.status === 'review'
                                ? 'bg-indigo-500/15 text-indigo-400'
                                : item.status === 'due'
                                  ? 'bg-amber-500/15 text-amber-400'
                                  : 'bg-emerald-500/15 text-emerald-400'
                            }`}
                          >
                            {item.status === 'filed' && <CheckCircle2 className="h-3 w-3" />}
                            {item.status === 'due' && <AlertCircle className="h-3 w-3" />}
                            {item.status === 'review' && <Clock className="h-3 w-3" />}
                            <span>{item.statusLabel}</span>
                          </span>
                        </td>
                        <td className="px-4 py-3 text-[var(--fd-text-secondary)]">
                          <div className="flex items-center gap-1.5">
                            <User className="h-3.5 w-3.5 text-[var(--fd-text-tertiary)]" />
                            <span>{item.assignee}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* VIEW 2: CLIENT ENTITY PORTAL */}
          {activeTab === 'client' && (
            <div className="p-4 sm:p-6 lg:p-8 space-y-6">
              {/* Entity Header Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-[var(--fd-border-subtle)] bg-[var(--fd-surface-1)] p-4 sm:p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-sky-500/15 text-sky-400">
                    <Building2 className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-[var(--fd-text-primary)]">Apex Technologies Pvt Ltd</h3>
                      <span className="rounded bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                        Active Client
                      </span>
                    </div>
                    <div className="text-xs text-[var(--fd-text-secondary)]">
                      GSTIN: <span className="font-mono">27AABCA1234F1Z5</span> · Assigned CA: Priya Sharma
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[var(--fd-text-secondary)]">Filing Health:</span>
                  <span className="rounded-full bg-emerald-500/20 px-2.5 py-1 text-xs font-semibold text-emerald-400">
                    Compliant (FY 26-27)
                  </span>
                </div>
              </div>

              {/* Client Dual Grid: Upload Action & Document Checklist */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Simulated Document Upload Dropzone */}
                <div className="rounded-xl border border-[var(--fd-border-subtle)] bg-[var(--fd-surface-1)] p-5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-[var(--fd-text-primary)]">
                      Requested by Your CA Team
                    </h4>
                    <span className="rounded bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold text-amber-400">
                      1 Pending Upload
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-[var(--fd-text-secondary)]">
                    Please upload the August bank statement (Current A/c) for GSTR-3B reconciliation.
                  </p>

                  <div className="mt-4 rounded-lg border-2 border-dashed border-[var(--fd-border)] bg-[var(--fd-surface-2)]/60 p-6 text-center transition-colors hover:border-[var(--fd-accent)]">
                    <UploadCloud className="mx-auto h-8 w-8 text-[var(--fd-accent)]" aria-hidden="true" />
                    <div className="mt-2 text-xs font-medium text-[var(--fd-text-primary)]">
                      {uploadedDemoFile ? (
                        <span className="text-emerald-400 font-semibold">
                          Uploaded: {uploadedDemoFile} (Encrypted via GridFS)
                        </span>
                      ) : (
                        'Drop PDF, Excel or scanned statements here'
                      )}
                    </div>
                    <div className="mt-1 text-[11px] text-[var(--fd-text-tertiary)]">
                      Direct signed stream to vault · Max 25 MB
                    </div>
                    {!uploadedDemoFile ? (
                      <button
                        type="button"
                        onClick={() => setUploadedDemoFile('HDFC_August_Stmt_2026.pdf')}
                        className="mt-3 rounded-md bg-[var(--fd-accent)] px-3 py-1.5 text-xs font-semibold text-[var(--fd-accent-contrast)] hover:bg-[var(--fd-accent-hover)] transition-colors"
                      >
                        Simulate File Upload
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setUploadedDemoFile(null)}
                        className="mt-3 text-[11px] text-[var(--fd-text-secondary)] underline hover:text-[var(--fd-text-primary)]"
                      >
                        Reset demo file
                      </button>
                    )}
                  </div>
                </div>

                {/* Available Filing Receipts Vault */}
                <div className="rounded-xl border border-[var(--fd-border-subtle)] bg-[var(--fd-surface-1)] p-5">
                  <h4 className="text-sm font-semibold text-[var(--fd-text-primary)]">
                    Your Verified Filing Receipts
                  </h4>
                  <p className="mt-1 text-xs text-[var(--fd-text-secondary)]">
                    Download stamped government challans, ITR acknowledgments & Form 3CD anytime.
                  </p>

                  <div className="mt-4 space-y-2.5">
                    <div className="flex items-center justify-between rounded-lg border border-[var(--fd-border-subtle)] bg-[var(--fd-surface-2)] p-3 text-xs">
                      <div className="flex items-center gap-2.5">
                        <FileCheck className="h-4 w-4 text-emerald-400" />
                        <div>
                          <div className="font-semibold text-[var(--fd-text-primary)]">GSTR-3B July 2026 Receipt</div>
                          <div className="text-[10px] text-[var(--fd-text-tertiary)]">ARN: AA270726001928M · 20 Jul 2026</div>
                        </div>
                      </div>
                      <span className="flex items-center gap-1 font-medium text-[var(--fd-accent)] cursor-pointer hover:underline">
                        <Download className="h-3.5 w-3.5" />
                        PDF
                      </span>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border border-[var(--fd-border-subtle)] bg-[var(--fd-surface-2)] p-3 text-xs">
                      <div className="flex items-center gap-2.5">
                        <FileCheck className="h-4 w-4 text-emerald-400" />
                        <div>
                          <div className="font-semibold text-[var(--fd-text-primary)]">ITR-6 Assessment Year 2026-27</div>
                          <div className="text-[10px] text-[var(--fd-text-tertiary)]">Ack No: 981240192849102 · E-Verified</div>
                        </div>
                      </div>
                      <span className="flex items-center gap-1 font-medium text-[var(--fd-accent)] cursor-pointer hover:underline">
                        <Download className="h-3.5 w-3.5" />
                        PDF
                      </span>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border border-[var(--fd-border-subtle)] bg-[var(--fd-surface-2)] p-3 text-xs">
                      <div className="flex items-center gap-2.5">
                        <FileCheck className="h-4 w-4 text-emerald-400" />
                        <div>
                          <div className="font-semibold text-[var(--fd-text-primary)]">TDS Form 26Q Q1 Receipt</div>
                          <div className="text-[10px] text-[var(--fd-text-tertiary)]">Token: 029104810294 · 31 Jul 2026</div>
                        </div>
                      </div>
                      <span className="flex items-center gap-1 font-medium text-[var(--fd-accent)] cursor-pointer hover:underline">
                        <Download className="h-3.5 w-3.5" />
                        PDF
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
