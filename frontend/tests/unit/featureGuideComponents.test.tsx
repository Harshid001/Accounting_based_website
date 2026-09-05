import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { LanguageProvider } from '@/context/LanguageContext';
import { FeatureGuideProvider } from '@/context/FeatureGuideContext';
import { FeatureGuideModal } from '@/components/domain/FeatureGuideModal';
import { InteractiveTourOverlay } from '@/components/domain/InteractiveTourOverlay';
import { PageHeader } from '@/components/ui/page-header';

import { TooltipProvider } from '@/components/ui/tooltip';

function renderWithProviders(ui: React.ReactNode, initialEntries = ['/clients']) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <TooltipProvider>
        <LanguageProvider>
          <FeatureGuideProvider>
            {ui}
            <FeatureGuideModal />
            <InteractiveTourOverlay />
          </FeatureGuideProvider>
        </LanguageProvider>
      </TooltipProvider>
    </MemoryRouter>,
  );
}

describe('Feature Guide & Tutorial UI Integration', () => {
  it('renders feature guide trigger in PageHeader and opens modal when clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <div>
        <PageHeader title="Clients Directory" featureKey="clients" />
        <button type="button" data-tour="client-add">
          Add Client
        </button>
      </div>,
      ['/clients'],
    );

    // Find the guide button in header
    const guideBtn = screen.getByRole('button', { name: /Feature Guide & Tour/i });
    expect(guideBtn).toBeInTheDocument();

    // Click to open guide modal
    await user.click(guideBtn);

    // Verify modal opened with Clients guide
    expect(screen.getByRole('heading', { name: /Client Management Directory/i })).toBeInTheDocument();
    expect(screen.getByText(/In Simple Terms/i)).toBeInTheDocument();
    expect(screen.getByText(/The Clients feature acts as your master address book/i)).toBeInTheDocument();

    // Verify tutorial button is present inside the modal header and banner
    const tutorialButtons = screen.getAllByRole('button', { name: /Interactive Tutorial/i });
    expect(tutorialButtons.length).toBeGreaterThanOrEqual(1);

    // Click interactive tutorial button in header
    await user.click(tutorialButtons[0]!);

    // Verify modal closes and tour begins
    expect(screen.queryByText(/The Clients feature acts as your master address book/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Step 1 of/i)).toBeInTheDocument();
  });
});
