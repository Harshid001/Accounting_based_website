import { HelpCircle, Sparkles } from 'lucide-react';

import type { Language } from '@/context/LanguageContext';
import { useFeatureGuide } from '@/context/FeatureGuideContext';
import { useLanguage } from '@/context/LanguageContext';
import { Tooltip } from '@/components/ui/tooltip';
import { cn } from '@/lib/cn';
import type { FeatureKey } from '@/types/featureGuides';

export interface FeatureGuideButtonProps {
  featureKey?: FeatureKey;
  variant?: 'pill' | 'icon' | 'header';
  className?: string;
}

export function FeatureGuideButton({
  featureKey,
  variant = 'header',
  className,
}: FeatureGuideButtonProps) {
  const { openGuide } = useFeatureGuide();
  const { language } = useLanguage();

  const labels: Record<Language, { short: string; full: string; tooltip: string }> = {
    en: { short: 'Guide', full: 'Feature Guide & Tour', tooltip: 'Learn about this feature & take interactive button tutorial' },
    hi: { short: 'गाइड', full: 'सुविधा गाइड व ट्यूटोरियल', tooltip: 'इस सुविधा को समझें और लाइव ट्यूटोरियल देखें' },
    gu: { short: 'માર્ગદર્શિકા', full: 'ફીચર ગાઇડ અને ટૂર', tooltip: 'આ ફીચર વિશે જાણો અને બટન ટ્યુટોરિયલ જુઓ' },
    mr: { short: 'मार्गदर्शक', full: 'वैशिष्ट्ये व ट्युटोरियल', tooltip: 'हे वैशिष्ट्य समजून घ्या आणि थेट ट्युटोरियल पहा' },
  };

  const text = labels[language] ?? labels.en;

  const handleClick = () => {
    openGuide(featureKey);
  };

  if (variant === 'icon') {
    return (
      <Tooltip content={text.tooltip}>
        <button
          type="button"
          onClick={handleClick}
          aria-label={text.full}
          className={cn(
            'inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--fd-border)]',
            'bg-[var(--fd-surface-1)] text-[var(--fd-accent)] transition-all hover:bg-[var(--fd-accent-subtle-bg)] hover:border-[var(--fd-accent)]',
            'focus-visible:outline-2 focus-visible:outline-[var(--fd-focus-ring)] focus-visible:outline-offset-2',
            className,
          )}
        >
          <HelpCircle className="h-4 w-4" aria-hidden="true" />
        </button>
      </Tooltip>
    );
  }

  return (
    <Tooltip content={text.tooltip}>
      <button
        type="button"
        onClick={handleClick}
        aria-label={text.full}
        className={cn(
          'group inline-flex items-center gap-1.5 rounded-full border border-[var(--fd-border)]',
          'bg-[var(--fd-surface-2)] px-2.5 py-1 text-xs font-medium text-[var(--fd-text-secondary)] shadow-xs transition-all',
          'hover:border-[var(--fd-accent)] hover:bg-[var(--fd-surface-3)] hover:text-[var(--fd-text-primary)]',
          'focus-visible:outline-2 focus-visible:outline-[var(--fd-focus-ring)] focus-visible:outline-offset-2',
          className,
        )}
      >
        <Sparkles
          className="h-3.5 w-3.5 text-[var(--fd-accent)] transition-transform group-hover:scale-110"
          aria-hidden="true"
        />
        <span className="hidden sm:inline font-semibold">{text.short}</span>
        <span className="text-[10px] text-[var(--fd-text-tertiary)] group-hover:text-[var(--fd-accent)]">
          &bull; Tour
        </span>
      </button>
    </Tooltip>
  );
}
