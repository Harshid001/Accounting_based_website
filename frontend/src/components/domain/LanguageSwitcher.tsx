import { Check, Globe } from 'lucide-react';

import { DropdownMenu } from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/context/ToastContext';

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { language, setLanguage, currentMeta, languages, t } = useLanguage();
  const { success } = useToast();

  const actions = languages.map((lang) => ({
    id: lang.code,
    label: `${lang.name} (${lang.englishName})`,
    icon: (
      <span className="flex h-4 w-4 items-center justify-center">
        {language === lang.code ? (
          <Check className="h-3.5 w-3.5 text-[var(--fd-accent)]" />
        ) : null}
      </span>
    ),
    onSelect: () => {
      if (lang.code === language) return;
      setLanguage(lang.code);
      success(`${t('language.switchedToast')} ${lang.name} (${lang.englishName})`);
    },
  }));

  return (
    <DropdownMenu
      ariaLabel="Select Language"
      align="end"
      actions={actions}
      trigger={
        <button
          type="button"
          aria-label={`Current language: ${currentMeta.name}. Click to change language.`}
          className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[var(--fd-border)] bg-[var(--fd-surface-1)] px-2.5 text-xs font-semibold text-[var(--fd-text-secondary)] shadow-2xs transition-colors hover:bg-[var(--fd-surface-2)] hover:text-[var(--fd-text-primary)] focus-visible:outline-2 focus-visible:outline-[var(--fd-focus-ring)]"
        >
          <Globe className="h-3.5 w-3.5 text-[var(--fd-accent)]" aria-hidden="true" />
          <span className={compact ? 'hidden sm:inline' : 'inline'}>{currentMeta.name}</span>
        </button>
      }
    />
  );
}
