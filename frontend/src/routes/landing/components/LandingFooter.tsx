import { Link } from 'react-router-dom';
import { Building2, ShieldCheck } from 'lucide-react';

export function LandingFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--fd-border-subtle)] bg-[var(--fd-surface-1)] py-12 text-xs text-[var(--fd-text-secondary)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 text-base font-bold text-[var(--fd-text-primary)]">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[var(--fd-accent)] text-[var(--fd-accent-contrast)]">
                <Building2 className="h-4 w-4" aria-hidden="true" />
              </div>
              <span>FirmDesk</span>
            </Link>
            <p className="mt-3 max-w-sm text-xs leading-relaxed text-[var(--fd-text-tertiary)]">
              The statutory operations system for modern Indian Chartered Accountants, Tax Practitioners, and their
              corporate clients. Designed for high-trust collaboration, on-time tax compliance, and encrypted document storage.
            </p>
            <div className="mt-4 flex items-center gap-3 text-[11px] text-[var(--fd-text-tertiary)]">
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                ICAI Peer-Review Ready
              </span>
              <span>·</span>
              <span>AES-256-GCM Vault</span>
              <span>·</span>
              <span>IST Timezone Forced</span>
            </div>
          </div>

          {/* Quick Access */}
          <div>
            <div className="font-semibold text-[var(--fd-text-primary)] uppercase tracking-wider text-[11px]">
              Portals & Authentication
            </div>
            <ul className="mt-3 space-y-2">
              <li>
                <Link to="/sign-in?portal=client" className="hover:text-[var(--fd-text-primary)] transition-colors">
                  Client Portal Login
                </Link>
              </li>
              <li>
                <Link to="/sign-in?portal=admin" className="hover:text-[var(--fd-text-primary)] transition-colors">
                  Staff & Admin Workspace
                </Link>
              </li>
              <li>
                <Link to="/sign-up" className="hover:text-[var(--fd-text-primary)] transition-colors">
                  Register Practice Account
                </Link>
              </li>
              <li>
                <Link to="/forgot-password" className="hover:text-[var(--fd-text-primary)] transition-colors">
                  Reset Password
                </Link>
              </li>
            </ul>
          </div>

          {/* Statutory Engine */}
          <div>
            <div className="font-semibold text-[var(--fd-text-primary)] uppercase tracking-wider text-[11px]">
              Statutory Coverage
            </div>
            <ul className="mt-3 space-y-2">
              <li>
                <a href="#compliance-radar" className="hover:text-[var(--fd-text-primary)] transition-colors">
                  GST (GSTR-1, 3B, 9)
                </a>
              </li>
              <li>
                <a href="#compliance-radar" className="hover:text-[var(--fd-text-primary)] transition-colors">
                  Income Tax & Audit (Sec 44AB)
                </a>
              </li>
              <li>
                <a href="#compliance-radar" className="hover:text-[var(--fd-text-primary)] transition-colors">
                  TDS Returns (24Q, 26Q)
                </a>
              </li>
              <li>
                <a href="#compliance-radar" className="hover:text-[var(--fd-text-primary)] transition-colors">
                  MCA ROC (AOC-4, MGT-7)
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="mt-10 border-t border-[var(--fd-border-subtle)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[var(--fd-text-tertiary)]">
          <div>
            © {currentYear} FirmDesk. All rights reserved. Dedicated internal operations system for single Indian accounting practices.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-[var(--fd-text-primary)] cursor-pointer">Security Overview</span>
            <span>·</span>
            <span className="hover:text-[var(--fd-text-primary)] cursor-pointer">Audit Standards</span>
            <span>·</span>
            <span className="hover:text-[var(--fd-text-primary)] cursor-pointer">Privacy & Aadhaar Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
