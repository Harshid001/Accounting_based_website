import { Menu, Search } from 'lucide-react';

import { AccountMenu } from '@/layouts/components/AccountMenu';
import { IconButton } from '@/components/ui/icon-button';
import { NotificationBell } from '@/components/domain/NotificationBell';
import { ThemeToggle } from '@/components/domain/ThemeToggle';

export interface TopbarProps {
  onOpenDrawer: () => void;
  onOpenPalette: () => void;
}

export function Topbar({ onOpenDrawer, onOpenPalette }: TopbarProps) {
  return (
    <header
      data-slot="topbar"
      data-print="hide"
      className="flex h-14 shrink-0 items-center justify-between gap-2 sm:gap-3 border-b border-[var(--fd-border-subtle)] bg-[var(--fd-surface-1)] px-2.5 sm:px-4"
    >
      <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
        <span className="lg:hidden">
          <IconButton
            label="Open the navigation menu"
            icon={<Menu size={17} aria-hidden="true" />}
            onClick={onOpenDrawer}
          />
        </span>

        <button
          type="button"
          onClick={onOpenPalette}
          className="flex h-9 w-9 sm:w-72 min-w-0 items-center justify-center sm:justify-start gap-2 rounded-md border border-[var(--fd-border)] bg-[var(--fd-surface-2)] px-2 sm:px-3 text-left text-[var(--fd-text-tertiary)] transition-colors hover:border-[var(--fd-border-strong)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fd-focus-ring)]"
        >
          <Search size={14} aria-hidden="true" />
          <span className="hidden truncate text-base sm:block">Search FirmDesk</span>
          <kbd className="ml-auto hidden rounded border border-[var(--fd-border)] px-1.5 py-0.5 text-[10px] sm:block">
            Ctrl K
          </kbd>
        </button>
      </div>

      <div className="flex items-center gap-0.5 sm:gap-1">
        <ThemeToggle />
        <NotificationBell enabled />
        <AccountMenu profilePath="/profile" />
      </div>
    </header>
  );
}
