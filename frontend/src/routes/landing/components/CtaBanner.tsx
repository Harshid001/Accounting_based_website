import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Sparkles, UserCheck } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function CtaBanner() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-[var(--fd-border)] bg-gradient-to-b from-[var(--fd-surface-1)] to-[var(--fd-surface-2)] p-8 sm:p-12 lg:p-16 text-center shadow-xl">
          {/* Subtle Glow */}
          <div
            className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-72 w-96 -translate-x-1/2 rounded-full bg-[var(--fd-accent)]/20 blur-3xl"
            aria-hidden="true"
          />

          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--fd-border)] bg-[var(--fd-surface-1)] px-3 py-1 text-xs font-semibold text-[var(--fd-accent)]">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Zero Late Fees · 100% Peace of Mind</span>
          </div>

          <h2 className="mt-4 text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--fd-text-primary)]">
            Ready to Elevate Your Practice Operations?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-[var(--fd-text-secondary)]">
            Whether you are managing hundreds of statutory returns as a CA practice or seeking total filing
            visibility as a business client, FirmDesk keeps every deadline on track.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Button asChild variant="primary" size="lg" className="w-full sm:w-auto shadow-md">
              <Link to="/sign-in?portal=client" className="flex items-center justify-center gap-2">
                <UserCheck className="h-4 w-4" aria-hidden="true" />
                <span>Enter Client Portal</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>

            <Button asChild variant="secondary" size="lg" className="w-full sm:w-auto">
              <Link to="/sign-in?portal=admin" className="flex items-center justify-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[var(--fd-accent)]" aria-hidden="true" />
                <span>Practice Staff Sign In</span>
              </Link>
            </Button>

            <Button asChild variant="ghost" size="lg" className="w-full sm:w-auto">
              <Link to="/sign-up" className="flex items-center justify-center gap-1.5">
                <span>Create New Account</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
