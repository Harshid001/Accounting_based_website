import type { ReactNode } from 'react';

import { FeatureGuideButton } from '@/components/domain/FeatureGuideButton';
import { cn } from '@/lib/cn';
import type { FeatureKey } from '@/types/featureGuides';

export interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  breadcrumb?: ReactNode;
  meta?: ReactNode;
  className?: string;
  headingId?: string;
  featureKey?: FeatureKey;
  showGuideButton?: boolean;
}

export function PageHeader({
  title,
  description,
  actions,
  breadcrumb,
  meta,
  className,
  headingId = 'page-title',
  featureKey,
  showGuideButton = true,
}: PageHeaderProps) {
  return (
    <header className={cn('mb-6', className)}>
      {breadcrumb}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1
              id={headingId}
              tabIndex={-1}
              className="text-2xl font-semibold text-[var(--fd-text-primary)] outline-none"
            >
              {title}
            </h1>
            {showGuideButton ? (
              <FeatureGuideButton featureKey={featureKey} />
            ) : null}
          </div>
          {description === undefined ? null : (
            <p className="mt-1 max-w-2xl text-base text-[var(--fd-text-secondary)]">
              {description}
            </p>
          )}
          {meta}
        </div>
        {actions === undefined ? null : (
          <div data-print="hide" className="flex flex-wrap items-center gap-2">
            {actions}
          </div>
        )}
      </div>
    </header>
  );
}

