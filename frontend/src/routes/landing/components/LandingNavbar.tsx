import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CalendarCheck, Landmark, Menu, ShieldCheck, UserCheck, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/domain/ThemeToggle';
import { useSession } from '@/context/SessionContext';
import { homePathFor } from '@/lib/permissions';

export function LandingNavbar() {
  const { status, user } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAuthenticated = status === 'authenticated' && user !== null;
  const userHome = isAuthenticated ? homePathFor(user.role) : '/dashboard';

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Why Us', href: '#firm-advantage' },
    { label: 'Client Portal', href: '#portal-preview' },
    { label: 'Statutory Radar', href: '#compliance-radar' },
    { label: 'Entity Roadmaps', href: '#entity-roadmap' },
    { label: 'Security', href: '#security' },
    { label: 'FAQ', href: '#faq' },
  ];

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--fd-border-subtle)] bg-[var(--fd-bg)]/85 backdrop-blur-md transition-colors duration-200">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="group flex items-center gap-2.5 outline-none focus-visible:outline-2 focus-visible:outline-[var(--fd-focus-ring)] rounded-md"
            aria-label="Accounting JV Home"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--fd-accent)] text-[var(--fd-accent-contrast)] shadow-sm transition-transform duration-200 group-hover:scale-105">
              <Landmark className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold tracking-tight text-[var(--fd-text-primary)]">
                  Accounting JV
                </span>
                <span className="rounded bg-[var(--fd-accent-subtle-bg)] px-1.5 py-0.5 text-[10px] font-semibold text-[var(--fd-accent)] uppercase tracking-wider">
                  Advisory & Tax
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden lg:flex items-center gap-6 text-sm font-medium text-[var(--fd-text-secondary)]"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-[var(--fd-text-primary)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Actions (Auth, Consultation & Theme) */}
        <div className="hidden md:flex items-center gap-2.5">
          <ThemeToggle />

          {isAuthenticated ? (
            <Button asChild variant="primary" size="sm">
              <Link to={userHome} className="flex items-center gap-1.5">
                <span>Go to {user.role === 'client' ? 'Client Portal' : 'Workspace'}</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </Button>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <a href="#consultation" className="flex items-center gap-1.5 text-[var(--fd-accent)] font-semibold">
                  <CalendarCheck className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Book Consultation</span>
                </a>
              </Button>
              <Button asChild variant="secondary" size="sm">
                <Link to="/sign-in?portal=client" className="flex items-center gap-1.5">
                  <UserCheck className="h-3.5 w-3.5 text-[var(--fd-accent)]" aria-hidden="true" />
                  <span>Client Portal</span>
                </Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link to="/sign-in?portal=admin" className="flex items-center gap-1.5 text-xs text-[var(--fd-text-tertiary)] hover:text-[var(--fd-text-primary)]">
                  <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Team Login</span>
                </Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Actions: Theme + Hamburger */}
        <div className="flex items-center gap-1.5 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            id="mobile-menu-toggle"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[var(--fd-border)] text-[var(--fd-text-secondary)] hover:bg-[var(--fd-surface-2)] hover:text-[var(--fd-text-primary)] focus-visible:outline-2 focus-visible:outline-[var(--fd-focus-ring)]"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="border-b border-[var(--fd-border)] bg-[var(--fd-surface-1)] px-4 pt-3 pb-6 lg:hidden shadow-lg animate-in slide-in-from-top-2 duration-150"
        >
          <nav className="flex flex-col gap-2 pb-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="rounded-md px-3 py-2 text-base font-medium text-[var(--fd-text-secondary)] hover:bg-[var(--fd-surface-2)] hover:text-[var(--fd-text-primary)]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="border-t border-[var(--fd-border-subtle)] pt-4 flex flex-col gap-2.5">
            {isAuthenticated ? (
              <Button asChild variant="primary" size="md" className="w-full">
                <Link to={userHome} onClick={closeMenu} className="flex items-center justify-center gap-2">
                  <span>Open {user.role === 'client' ? 'Client Portal' : 'Workspace'}</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            ) : (
              <>
                <Button asChild variant="primary" size="md" className="w-full justify-center">
                  <a href="#consultation" onClick={closeMenu} className="flex items-center gap-2">
                    <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                    <span>Book a Free Consultation</span>
                  </a>
                </Button>
                <Button asChild variant="secondary" size="md" className="w-full justify-center">
                  <Link to="/sign-in?portal=client" onClick={closeMenu} className="flex items-center gap-2">
                    <UserCheck className="h-4 w-4" aria-hidden="true" />
                    <span>Client Portal Sign In</span>
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="md" className="w-full justify-center">
                  <Link to="/sign-in?portal=admin" onClick={closeMenu} className="flex items-center gap-2 text-xs">
                    <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                    <span>Practice Team Workspace</span>
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
