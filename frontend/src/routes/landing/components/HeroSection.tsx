import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ChevronRight, ShieldCheck, Sparkles, UserCheck } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24">
      {/* Background Subtle Gradient Glows */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-[var(--fd-accent)]/15 via-indigo-500/10 to-transparent blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--fd-border)] bg-[var(--fd-surface-2)]/80 px-3.5 py-1 text-xs font-medium text-[var(--fd-text-primary)] shadow-sm backdrop-blur-sm transition-all hover:border-[var(--fd-accent)]">
            <Sparkles className="h-3.5 w-3.5 text-[var(--fd-accent)]" aria-hidden="true" />
            <span>Statutory Practice Management & Client Portal</span>
            <ChevronRight className="h-3 w-3 text-[var(--fd-text-tertiary)]" aria-hidden="true" />
          </div>

          {/* Main Hero Heading */}
          <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-[var(--fd-text-primary)] sm:text-5xl lg:text-6xl sm:leading-[1.15]">
            Modern Practice Operations.{' '}
            <span className="bg-gradient-to-r from-[var(--fd-accent)] via-indigo-400 to-sky-400 bg-clip-text text-transparent">
              Seamless Client Compliance.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-base sm:text-lg leading-relaxed text-[var(--fd-text-secondary)]">
            Designed exclusively for Indian Chartered Accountants, Tax Consultants, and their corporate clients.
            Coordinate GST, TDS, Income Tax, and ROC filings with bank-grade encrypted document vaults,
            automated statutory horizon tracking, and crystal-clear client transparency.
          </p>

          {/* Call to Actions */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Button asChild variant="primary" size="lg" className="w-full sm:w-auto shadow-md">
              <Link to="/sign-in?portal=client" className="flex items-center justify-center gap-2">
                <UserCheck className="h-4 w-4" aria-hidden="true" />
                <span>Client Portal Login</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>

            <Button asChild variant="secondary" size="lg" className="w-full sm:w-auto">
              <Link to="/sign-in?portal=admin" className="flex items-center justify-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[var(--fd-accent)]" aria-hidden="true" />
                <span>Staff & Admin Workspace</span>
              </Link>
            </Button>
          </div>

          {/* Reassurances */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-[var(--fd-text-tertiary)]">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
              AES-256-GCM Aadhaar Encryption
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
              Pre-configured Indian Tax Due Dates
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
              Instant Signed Transfer URLs
            </span>
          </div>
        </div>

        {/* Highlight Metrics Cards */}
        <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
          <div className="rounded-xl border border-[var(--fd-border-subtle)] bg-[var(--fd-surface-1)] p-4 text-center sm:p-5 shadow-xs transition-transform duration-200 hover:-translate-y-0.5">
            <div className="text-2xl font-bold tracking-tight text-[var(--fd-accent)] sm:text-3xl">100%</div>
            <div className="mt-1 text-xs font-semibold text-[var(--fd-text-primary)]">Statutory Deadline Precision</div>
            <div className="mt-0.5 text-[11px] text-[var(--fd-text-tertiary)]">Automated 7d, 3d, 1d offset alerts</div>
          </div>

          <div className="rounded-xl border border-[var(--fd-border-subtle)] bg-[var(--fd-surface-1)] p-4 text-center sm:p-5 shadow-xs transition-transform duration-200 hover:-translate-y-0.5">
            <div className="text-2xl font-bold tracking-tight text-sky-400 sm:text-3xl">120 Days</div>
            <div className="mt-1 text-xs font-semibold text-[var(--fd-text-primary)]">Predictive Horizon</div>
            <div className="mt-0.5 text-[11px] text-[var(--fd-text-tertiary)]">Automated GST, TDS & ITR cycles</div>
          </div>

          <div className="rounded-xl border border-[var(--fd-border-subtle)] bg-[var(--fd-surface-1)] p-4 text-center sm:p-5 shadow-xs transition-transform duration-200 hover:-translate-y-0.5">
            <div className="text-2xl font-bold tracking-tight text-emerald-400 sm:text-3xl">GridFS</div>
            <div className="mt-1 text-xs font-semibold text-[var(--fd-text-primary)]">Bank-Grade Vault</div>
            <div className="mt-0.5 text-[11px] text-[var(--fd-text-tertiary)]">60s signed URLs & encrypted Aadhaar</div>
          </div>

          <div className="rounded-xl border border-[var(--fd-border-subtle)] bg-[var(--fd-surface-1)] p-4 text-center sm:p-5 shadow-xs transition-transform duration-200 hover:-translate-y-0.5">
            <div className="text-2xl font-bold tracking-tight text-amber-400 sm:text-3xl">Dual Portal</div>
            <div className="mt-1 text-xs font-semibold text-[var(--fd-text-primary)]">Unified Ecosystem</div>
            <div className="mt-0.5 text-[11px] text-[var(--fd-text-tertiary)]">Dedicated staff & client interfaces</div>
          </div>
        </div>
      </div>
    </section>
  );
}
