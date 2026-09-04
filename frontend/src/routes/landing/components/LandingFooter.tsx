import { Link } from 'react-router-dom';
import { Landmark, Lock, ShieldCheck, UserCheck } from 'lucide-react';

export function LandingFooter() {
  return (
    <footer className="border-t border-[var(--fd-border-subtle)] bg-[var(--fd-surface-1)] text-[var(--fd-text-secondary)] text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--fd-accent)] text-[var(--fd-accent-contrast)]">
                <Landmark className="h-4 w-4" aria-hidden="true" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-bold text-[var(--fd-text-primary)]">
                  Accounting JV
                </span>
                <span className="rounded bg-[var(--fd-accent-subtle-bg)] px-1.5 py-0.5 text-[9px] font-semibold text-[var(--fd-accent)] uppercase">
                  Chartered Accountants
                </span>
              </div>
            </Link>

            <p className="max-w-sm text-xs leading-relaxed text-[var(--fd-text-secondary)]">
              Strategic accounting, tax compliance, statutory audit assurance, and specialized Joint Venture financial
              advisory for growing enterprises, LLPs, and consortiums across India.
            </p>

            <div className="flex items-center gap-4 text-xs text-[var(--fd-text-tertiary)] pt-2">
              <span className="flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 text-emerald-400" />
                <span>AES-256 Encrypted Portals</span>
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-sky-400" />
                <span>ICAI Standards on Auditing</span>
              </span>
            </div>
          </div>

          {/* Col 1: Practice Areas */}
          <div>
            <h3 className="text-xs font-bold text-[var(--fd-text-primary)] uppercase tracking-wider mb-3">
              Practice Areas
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="hover:text-[var(--fd-text-primary)] transition-colors">
                  Corporate Tax & GST
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[var(--fd-text-primary)] transition-colors">
                  Joint Venture & SPV Advisory
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[var(--fd-text-primary)] transition-colors">
                  Cloud Bookkeeping & MIS
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[var(--fd-text-primary)] transition-colors">
                  Statutory Audit u/s 44AB
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[var(--fd-text-primary)] transition-colors">
                  Virtual CFO Advisory
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[var(--fd-text-primary)] transition-colors">
                  ROC & MCA Secretarial
                </a>
              </li>
            </ul>
          </div>

          {/* Col 2: Client Resources */}
          <div>
            <h3 className="text-xs font-bold text-[var(--fd-text-primary)] uppercase tracking-wider mb-3">
              Client Experience
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/sign-in?portal=client" className="hover:text-[var(--fd-text-primary)] transition-colors flex items-center gap-1">
                  <UserCheck className="h-3.5 w-3.5 text-[var(--fd-accent)]" />
                  <span>Client Portal Sign In</span>
                </Link>
              </li>
              <li>
                <a href="#compliance-radar" className="hover:text-[var(--fd-text-primary)] transition-colors">
                  Statutory Filing Radar
                </a>
              </li>
              <li>
                <a href="#entity-roadmap" className="hover:text-[var(--fd-text-primary)] transition-colors">
                  Entity Compliance Roadmaps
                </a>
              </li>
              <li>
                <a href="#portal-preview" className="hover:text-[var(--fd-text-primary)] transition-colors">
                  Digital Portal Walkthrough
                </a>
              </li>
              <li>
                <a href="#consultation" className="hover:text-[var(--fd-text-primary)] transition-colors">
                  Schedule Free Advisory
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[var(--fd-text-primary)] transition-colors">
                  Client FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Practice Offices & Team */}
          <div>
            <h3 className="text-xs font-bold text-[var(--fd-text-primary)] uppercase tracking-wider mb-3">
              Offices & Access
            </h3>
            <ul className="space-y-2 text-[var(--fd-text-secondary)]">
              <li>
                <strong className="text-[var(--fd-text-primary)]">Mumbai Office:</strong>
                <div className="text-[11px] text-[var(--fd-text-tertiary)]">Nariman Point, Mumbai 400021</div>
              </li>
              <li>
                <strong className="text-[var(--fd-text-primary)]">Bengaluru Office:</strong>
                <div className="text-[11px] text-[var(--fd-text-tertiary)]">Indiranagar, Bengaluru 560038</div>
              </li>
              <li className="pt-2">
                <Link
                  to="/sign-in?portal=admin"
                  className="inline-flex items-center gap-1 text-[var(--fd-accent)] hover:underline"
                >
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Practice Team Workspace</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="mt-12 border-t border-[var(--fd-border-subtle)] pt-6 text-[11px] text-[var(--fd-text-tertiary)] leading-relaxed space-y-3">
          <p>
            <strong>Regulatory & Professional Disclaimer:</strong> Accounting JV is a professional accounting, tax,
            and joint venture financial advisory practice. Information provided on this website is for general informational
            purposes and should not be construed as unilateral legal or tax advice. All client engagements are conducted
            in accordance with the Code of Ethics and guidelines prescribed by the Institute of Chartered Accountants of India (ICAI).
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 text-[10px]">
            <div>© {new Date().getFullYear()} Accounting JV. All rights reserved.</div>
            <div className="flex items-center gap-4">
              <span>Non-Disclosure Protected</span>
              <span>AES-256 Vault Architecture</span>
              <span>ICAI Standards on Auditing</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
