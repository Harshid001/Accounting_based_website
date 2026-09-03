import { Building2 } from 'lucide-react';

import { cn } from '@/lib/cn';
import { Select } from '@/components/ui/select';
import { useActiveClient } from '@/context/ActiveClientContext';

export interface EntitySwitcherProps {
  className?: string;
  selectClassName?: string;
}

export function EntitySwitcher({ className, selectClassName = 'w-52' }: EntitySwitcherProps = {}) {
  const { clients, activeClientId, setActiveClientId, showSwitcher } = useActiveClient();

  if (!showSwitcher || activeClientId === null) return null;

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Building2 size={15} aria-hidden="true" className="shrink-0 text-[var(--fd-text-tertiary)]" />
      <Select
        className={selectClassName}
        size="sm"
        ariaLabel="Active entity"
        value={activeClientId}
        onValueChange={setActiveClientId}
        options={clients.map((client) => ({ value: client.id, label: client.displayName }))}
      />
    </div>
  );
}
