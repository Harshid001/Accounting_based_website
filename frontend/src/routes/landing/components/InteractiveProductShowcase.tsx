import { useState } from 'react';
import {
  Building2,
  CheckCircle2,
  Clock,
  Download,
  FileCheck,
  Handshake,
  Layers,
  Lock,
  ShieldCheck,
  UploadCloud,
  User,
} from 'lucide-react';

export function InteractiveProductShowcase() {
  const [activeTab, setActiveTab] = useState<'portal' | 'workflow' | 'entities'>('portal');
  const [selectedEntity, setSelectedEntity] = useState<'sample_corp' | 'sample_jv' | 'director'>('sample_corp');
  const [uploadedDemoFile, setUploadedDemoFile] = useState<string | null>(null);

  const clientFilings = [
    {
      id: 'f-1',
      returnName: 'GSTR-3B Monthly Return',
      entity: 'Enterprise Client Model (Sample)',
      period: 'August 2026',
      dueDate: '20 Sep 2026',
      status: 'review',
      statusLabel: 'Under CA Review',
      actionNeeded: 'None (CA Team Verifying)',
      taxPayable: '₹1,42,800',
    },
    {
      id: 'f-2',
      returnName: 'Tax Audit Report u/s 44AB',
      entity: 'Enterprise Client Model (Sample)',
      period: 'FY 2025–26 (AY 2026–27)',
      dueDate: '30 Sep 2026',
      status: 'pending_docs',
      statusLabel: 'Action Required',
      actionNeeded: 'Upload Form 3CD Annexures',
      taxPayable: 'Audit Sign-off',
    },
    {
      id: 'f-3',
      returnName: 'TDS Return Form 26Q',
      entity: 'Enterprise Client Model (Sample)',
      period: 'Q2 (Jul - Sep 2026)',
      dueDate: '31 Oct 2026',
      status: 'scheduled',
      statusLabel: 'Scheduled',
      actionNeeded: 'Challans Reconciled',
      taxPayable: '₹84,200',
    },
    {
      id: 'f-4',
      returnName: 'GSTR-1 Outward Return',
      entity: 'Enterprise Client Model (Sample)',
      period: 'August 2026',
      dueDate: '11 Sep 2026',
      status: 'filed',
      statusLabel: 'Filed & Verified',
      actionNeeded: 'Ack: ARN-AA27092601928',
      taxPayable: 'Filed on 09 Sep',
    },
  ];

  return (
    <section id="portal-preview" className="scroll-mt-20 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-md bg-[var(--fd-accent-subtle-bg)] px-2.5 py-1 text-xs font-semibold text-[var(--fd-accent)] uppercase tracking-wider">
            Client Experience Tour
          </div>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-[var(--fd-text-primary)] sm:text-4xl">
            Total Transparency Through Your 24/7 Client Portal
          </h2>
          <p className="mt-3 text-base text-[var(--fd-text-secondary)]">
            When you partner with JV Tax Consultancy, you never have to wonder whether your GST return was filed on time or if
            your tax challan was paid. Experience the digital clarity we provide to every client.
          </p>

          {/* Interactive Navigation Tabs */}
          <div className="mt-8 inline-flex rounded-xl border border-[var(--fd-border)] bg-[var(--fd-surface-1)] p-1 shadow-xs">
            <button
              type="button"
              onClick={() => setActiveTab('portal')}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'portal'
                  ? 'bg-[var(--fd-accent)] text-[var(--fd-accent-contrast)] shadow-sm'
                  : 'text-[var(--fd-text-secondary)] hover:text-[var(--fd-text-primary)]'
              }`}
            >
              <FileCheck className="h-4 w-4" aria-hidden="true" />
              <span>Live Filing Dashboard</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('workflow')}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'workflow'
                  ? 'bg-[var(--fd-accent)] text-[var(--fd-accent-contrast)] shadow-sm'
                  : 'text-[var(--fd-text-secondary)] hover:text-[var(--fd-text-primary)]'
              }`}
            >
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              <span>CA Audit Verification Flow</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('entities')}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'entities'
                  ? 'bg-[var(--fd-accent)] text-[var(--fd-accent-contrast)] shadow-sm'
                  : 'text-[var(--fd-text-secondary)] hover:text-[var(--fd-text-primary)]'
              }`}
            >
              <Layers className="h-4 w-4" aria-hidden="true" />
              <span>Multi-Entity & JV View</span>
            </button>
          </div>
        </div>

        {/* Showcase Container */}
        <div className="mt-10 rounded-2xl border border-[var(--fd-border)] bg-[var(--fd-surface-1)] shadow-xl overflow-hidden">
          {/* Simulated Browser Bar */}
          <div className="flex items-center justify-between border-b border-[var(--fd-border-subtle)] bg-[var(--fd-surface-2)]/60 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-rose-500/80" />
              <span className="h-3 w-3 rounded-full bg-amber-500/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-xs font-mono text-[var(--fd-text-tertiary)]">
                portal.accountingjv.com/dashboard
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs text-[var(--fd-text-secondary)]">
              <span className="flex items-center gap-1">
                <Lock className="h-3.5 w-3.5 text-emerald-400" />
                <span className="hidden sm:inline">256-Bit Encrypted Session</span>
              </span>
              <span className="rounded bg-[var(--fd-accent-subtle-bg)] px-2 py-0.5 font-semibold text-[var(--fd-accent)]">
                Client View (Interactive Demo)
              </span>
            </div>
          </div>

          {/* TAB 1: Live Filing Dashboard */}
          {activeTab === 'portal' && (
            <div className="p-4 sm:p-8 space-y-6">
              {/* Executive Welcome & Top Summary */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-[var(--fd-border)] bg-[var(--fd-bg)] p-5">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-[var(--fd-text-primary)]">
                      Sample Enterprise Pvt Ltd
                    </h3>
                    <span className="rounded bg-emerald-500/15 text-emerald-400 px-2 py-0.5 text-xs font-semibold">
                      GST Regular · Active
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-[var(--fd-text-secondary)]">
                    Managed by <strong className="text-[var(--fd-text-primary)]">JV Tax Consultancy Advisory Team</strong> · Live Compliance Radar
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href="#consultation"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--fd-accent)] px-3.5 py-2 text-xs font-semibold text-[var(--fd-accent-contrast)] hover:bg-[var(--fd-accent-hover)] transition-colors"
                  >
                    <span>Request Advisory Meeting</span>
                  </a>
                </div>
              </div>

              {/* Status Stat Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="rounded-xl border border-[var(--fd-border-subtle)] bg-[var(--fd-bg)] p-4">
                  <div className="text-xs font-medium text-[var(--fd-text-secondary)]">Upcoming in 14 Days</div>
                  <div className="mt-1 text-2xl font-bold text-[var(--fd-accent)]">2 Returns</div>
                  <div className="text-[11px] text-emerald-400 mt-0.5">All books reconciled</div>
                </div>
                <div className="rounded-xl border border-[var(--fd-border-subtle)] bg-[var(--fd-bg)] p-4">
                  <div className="text-xs font-medium text-[var(--fd-text-secondary)]">Overdue Tasks</div>
                  <div className="mt-1 text-2xl font-bold text-emerald-400">0</div>
                  <div className="text-[11px] text-emerald-400 mt-0.5">All filings up-to-date</div>
                </div>
                <div className="rounded-xl border border-[var(--fd-border-subtle)] bg-[var(--fd-bg)] p-4">
                  <div className="text-xs font-medium text-[var(--fd-text-secondary)]">Pending Action</div>
                  <div className="mt-1 text-2xl font-bold text-amber-400">1 Document</div>
                  <div className="text-[11px] text-[var(--fd-text-tertiary)] mt-0.5">Tax Audit 3CD Annexure</div>
                </div>
                <div className="rounded-xl border border-[var(--fd-border-subtle)] bg-[var(--fd-bg)] p-4">
                  <div className="text-xs font-medium text-[var(--fd-text-secondary)]">Filed FY 2026–27</div>
                  <div className="mt-1 text-2xl font-bold text-sky-400">18 Returns</div>
                  <div className="text-[11px] text-[var(--fd-text-tertiary)] mt-0.5">Portal acknowledgements archived</div>
                </div>
              </div>

              {/* Filings Table */}
              <div className="rounded-xl border border-[var(--fd-border)] bg-[var(--fd-bg)] overflow-hidden">
                <div className="border-b border-[var(--fd-border-subtle)] bg-[var(--fd-surface-2)]/50 px-4 py-3 flex items-center justify-between">
                  <span className="text-xs font-bold text-[var(--fd-text-primary)] uppercase tracking-wider">
                    Statutory Filing Track & Status
                  </span>
                  <span className="text-xs text-[var(--fd-text-tertiary)]">Updated in Real Time</span>
                </div>

                <div className="divide-y divide-[var(--fd-border-subtle)]">
                  {clientFilings.map((f) => (
                    <div
                      key={f.id}
                      className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[var(--fd-surface-2)]/30 transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-[var(--fd-text-primary)]">{f.returnName}</span>
                          <span
                            className={`rounded px-2 py-0.5 text-[10px] font-semibold ${
                              f.status === 'filed'
                                ? 'bg-emerald-500/15 text-emerald-400'
                                : f.status === 'review'
                                ? 'bg-sky-500/15 text-sky-400'
                                : f.status === 'pending_docs'
                                ? 'bg-amber-500/15 text-amber-400'
                                : 'bg-[var(--fd-surface-2)] text-[var(--fd-text-secondary)]'
                            }`}
                          >
                            {f.statusLabel}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-[var(--fd-text-secondary)]">
                          <span>Period: {f.period}</span>
                          <span>·</span>
                          <span>Due: <strong className="text-[var(--fd-text-primary)]">{f.dueDate}</strong></span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right text-xs">
                          <div className="font-mono font-medium text-[var(--fd-text-primary)]">{f.taxPayable}</div>
                          <div className="text-[11px] text-[var(--fd-text-tertiary)]">{f.actionNeeded}</div>
                        </div>

                        {f.status === 'filed' ? (
                          <button
                            type="button"
                            onClick={() => alert('Simulated download: Official GSTR-1 Acknowledgement ARN-AA27092601928 downloaded.')}
                            className="inline-flex items-center gap-1.5 rounded-md border border-[var(--fd-border)] bg-[var(--fd-surface-2)] px-2.5 py-1.5 text-xs font-semibold text-[var(--fd-text-primary)] hover:border-[var(--fd-accent)] hover:text-[var(--fd-accent)] transition-colors"
                          >
                            <Download className="h-3.5 w-3.5" />
                            <span>Receipt</span>
                          </button>
                        ) : f.status === 'pending_docs' ? (
                          <button
                            type="button"
                            onClick={() => setUploadedDemoFile('Form_3CD_Annexures_Sample.pdf')}
                            className="inline-flex items-center gap-1.5 rounded-md bg-amber-500 text-slate-950 px-2.5 py-1.5 text-xs font-semibold hover:bg-amber-400 transition-colors shadow-xs"
                          >
                            <UploadCloud className="h-3.5 w-3.5" />
                            <span>Upload Docs</span>
                          </button>
                        ) : (
                          <div className="inline-flex items-center gap-1 text-xs text-sky-400 font-medium">
                            <Clock className="h-3.5 w-3.5" />
                            <span>In Progress</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Document Dropzone simulation */}
              <div className="rounded-xl border border-dashed border-[var(--fd-border)] bg-[var(--fd-bg)] p-6 text-center">
                <UploadCloud className="mx-auto h-8 w-8 text-[var(--fd-accent)]" />
                <h4 className="mt-2 text-sm font-bold text-[var(--fd-text-primary)]">
                  Secure Bank Statement & Invoice Upload Handshake
                </h4>
                <p className="mt-1 text-xs text-[var(--fd-text-secondary)]">
                  Files stream directly into AES-256 encrypted storage. Test the upload handshake below:
                </p>

                {uploadedDemoFile ? (
                  <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-emerald-500/15 border border-emerald-500/30 px-3.5 py-2 text-xs font-semibold text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Transferred securely: <strong>{uploadedDemoFile}</strong> (Verification complete)</span>
                    <button
                      type="button"
                      onClick={() => setUploadedDemoFile(null)}
                      className="ml-2 text-xs text-[var(--fd-text-tertiary)] underline hover:text-[var(--fd-text-primary)]"
                    >
                      Reset
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setUploadedDemoFile('Form_3CD_Annexures_Sample.pdf')}
                    className="mt-4 inline-flex items-center gap-2 rounded-lg border border-[var(--fd-border)] bg-[var(--fd-surface-2)] px-4 py-2 text-xs font-semibold text-[var(--fd-text-primary)] hover:border-[var(--fd-accent)] transition-all"
                  >
                    <UploadCloud className="h-3.5 w-3.5 text-[var(--fd-accent)]" />
                    <span>Test Upload Sample Document</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: CA Audit Verification Flow */}
          {activeTab === 'workflow' && (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="text-center max-w-xl mx-auto">
                <h3 className="text-lg font-bold text-[var(--fd-text-primary)]">
                  Dual-Tier Statutory Verification Protocol
                </h3>
                <p className="mt-1 text-xs text-[var(--fd-text-secondary)]">
                  Here is the rigorous 4-stage process our firm executes for every single filing before submission to government portals.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                <div className="rounded-xl border border-[var(--fd-border)] bg-[var(--fd-bg)] p-5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--fd-accent)] text-[var(--fd-accent-contrast)] font-bold text-xs">
                    01
                  </div>
                  <h4 className="mt-3 text-sm font-bold text-[var(--fd-text-primary)]">Horizon Scheduling</h4>
                  <p className="mt-1.5 text-xs text-[var(--fd-text-secondary)] leading-relaxed">
                    120 days ahead, our statutory engine schedules your required returns and assigns a dedicated CA team.
                  </p>
                  <div className="mt-3 text-[11px] text-emerald-400 font-mono">Automated Checklist</div>
                </div>

                <div className="rounded-xl border border-[var(--fd-border)] bg-[var(--fd-bg)] p-5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500 text-slate-950 font-bold text-xs">
                    02
                  </div>
                  <h4 className="mt-3 text-sm font-bold text-[var(--fd-text-primary)]">Data Reconciliation</h4>
                  <p className="mt-1.5 text-xs text-[var(--fd-text-secondary)] leading-relaxed">
                    We reconcile sales ledgers with GSTR-2B, audit vendor TDS deductions, and resolve mismatches.
                  </p>
                  <div className="mt-3 text-[11px] text-sky-400 font-mono">ITC 2B Matched</div>
                </div>

                <div className="rounded-xl border border-[var(--fd-border)] bg-[var(--fd-bg)] p-5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-slate-950 font-bold text-xs">
                    03
                  </div>
                  <h4 className="mt-3 text-sm font-bold text-[var(--fd-text-primary)]">Partner Scrutiny</h4>
                  <p className="mt-1.5 text-xs text-[var(--fd-text-secondary)] leading-relaxed">
                    A qualified Senior Chartered Accountant conducts audit peer review before any tax challan is finalized.
                  </p>
                  <div className="mt-3 text-[11px] text-amber-400 font-mono">Senior CA Sign-Off</div>
                </div>

                <div className="rounded-xl border border-[var(--fd-border)] bg-[var(--fd-bg)] p-5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs">
                    04
                  </div>
                  <h4 className="mt-3 text-sm font-bold text-[var(--fd-text-primary)]">Instant Filing & Vault</h4>
                  <p className="mt-1.5 text-xs text-[var(--fd-text-secondary)] leading-relaxed">
                    The return is submitted to government portals and the signed ARN acknowledgement is archived to your vault.
                  </p>
                  <div className="mt-3 text-[11px] text-emerald-400 font-mono">Real-Time Challan</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Multi-Entity & Corporate Structure View */}
          {activeTab === 'entities' && (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--fd-border-subtle)] pb-5">
                <div>
                  <h3 className="text-lg font-bold text-[var(--fd-text-primary)]">
                    Consolidated Multi-Entity Switching
                  </h3>
                  <p className="mt-1 text-xs text-[var(--fd-text-secondary)]">
                    Running an operating company, a manufacturing LLP, and individual director filings? Switch with 1 click.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedEntity('sample_corp')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      selectedEntity === 'sample_corp'
                        ? 'bg-[var(--fd-accent)] text-[var(--fd-accent-contrast)]'
                        : 'bg-[var(--fd-surface-2)] text-[var(--fd-text-secondary)]'
                    }`}
                  >
                    Enterprise Pvt Ltd (Model)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedEntity('sample_jv')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      selectedEntity === 'sample_jv'
                        ? 'bg-[var(--fd-accent)] text-[var(--fd-accent-contrast)]'
                        : 'bg-[var(--fd-surface-2)] text-[var(--fd-text-secondary)]'
                    }`}
                  >
                    Subsidiary LLP (Model)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedEntity('director')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      selectedEntity === 'director'
                        ? 'bg-[var(--fd-accent)] text-[var(--fd-accent-contrast)]'
                        : 'bg-[var(--fd-surface-2)] text-[var(--fd-text-secondary)]'
                    }`}
                  >
                    Director (Individual ITR)
                  </button>
                </div>
              </div>

              {selectedEntity === 'sample_jv' && (
                <div className="rounded-xl border border-sky-500/30 bg-sky-500/10 p-5">
                  <div className="flex items-center gap-2 text-sky-400 text-sm font-bold">
                    <Handshake className="h-4 w-4" />
                    <span>Group Entity: Gujarat Logistics & Industrial Park (LLP)</span>
                  </div>
                  <p className="mt-2 text-xs text-[var(--fd-text-secondary)] leading-relaxed">
                    This illustrative entity operates as an affiliated subsidiary LLP. JV Tax Consultancy independently manages monthly book closing,
                    TDS deductions (Section 194C/194J), GSTR-3B filings, and quarterly partner capital reporting.
                  </p>
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                    <div className="rounded-lg bg-[var(--fd-bg)] p-3">
                      <div className="text-[var(--fd-text-tertiary)]">Entity Structure</div>
                      <div className="text-sm font-bold text-[var(--fd-text-primary)] mt-0.5">Limited Liability Partnership</div>
                    </div>
                    <div className="rounded-lg bg-[var(--fd-bg)] p-3">
                      <div className="text-[var(--fd-text-tertiary)]">Partner Profit Share</div>
                      <div className="text-sm font-bold text-sky-400 mt-0.5">Fixed Ratio (Sec 40(b) Compliant)</div>
                    </div>
                    <div className="rounded-lg bg-[var(--fd-bg)] p-3">
                      <div className="text-[var(--fd-text-tertiary)]">Statutory Status</div>
                      <div className="text-sm font-bold text-emerald-400 mt-0.5">Reconciled & Monitored</div>
                    </div>
                  </div>
                </div>
              )}

              {selectedEntity === 'sample_corp' && (
                <div className="rounded-xl border border-[var(--fd-border)] bg-[var(--fd-bg)] p-5">
                  <div className="flex items-center gap-2 text-[var(--fd-accent)] text-sm font-bold">
                    <Building2 className="h-4 w-4" />
                    <span>Operating Entity: Corporate Enterprise (Sample Model)</span>
                  </div>
                  <p className="mt-2 text-xs text-[var(--fd-text-secondary)] leading-relaxed">
                    Representative corporate entity. JV Tax Consultancy handles monthly bookkeeping, statutory audit under Companies Act 2013,
                    GSTR-1 & 3B, advance tax estimation, and executive reporting.
                  </p>
                </div>
              )}

              {selectedEntity === 'director' && (
                <div className="rounded-xl border border-purple-500/30 bg-purple-500/10 p-5">
                  <div className="flex items-center gap-2 text-purple-400 text-sm font-bold">
                    <User className="h-4 w-4" />
                    <span>Personal Tax & Director Compliance (Sample Profile)</span>
                  </div>
                  <p className="mt-2 text-xs text-[var(--fd-text-secondary)] leading-relaxed">
                    DIR-3 KYC completed annually. Comprehensive capital gains calculation, dividend income
                    reconciliation against AIS / Form 26AS, advance tax tracking, and personal ITR filing.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
