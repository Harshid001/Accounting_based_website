import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { AiChatDropdown } from '@/components/domain/AiChatDropdown';

function renderDropdown() {
  return render(
    <MemoryRouter initialEntries={['/dashboard']}>
      <AiChatDropdown />
    </MemoryRouter>,
  );
}

describe('AiChatDropdown Component', () => {
  it('renders the AI button in navigation bar', () => {
    renderDropdown();

    const triggerBtn = screen.getByRole('button', { name: /FirmDesk AI Assistant Chat/i });
    expect(triggerBtn).toBeInTheDocument();
    expect(screen.getByText(/Ask AI/i)).toBeInTheDocument();
    expect(screen.getByText(/Copilot/i)).toBeInTheDocument();
  });

  it('opens big dropdown chat and displays greeting and prompt chips when clicked', async () => {
    const user = userEvent.setup();
    renderDropdown();

    const triggerBtn = screen.getByRole('button', { name: /FirmDesk AI Assistant Chat/i });
    await user.click(triggerBtn);

    // Verify chat header & greeting
    expect(screen.getByText(/FirmDesk AI Copilot/i)).toBeInTheDocument();
    expect(screen.getByText(/CA Assistant/i)).toBeInTheDocument();
    expect(screen.getByText(/I am your/i)).toBeInTheDocument();

    // Verify quick suggestions exist
    expect(screen.getByText(/Upcoming Tax Deadlines/i)).toBeInTheDocument();
    expect(screen.getByText(/TDS Rates/i)).toBeInTheDocument();
  });

  it('allows asking questions and receives structured answers with 1-click action links', async () => {
    const user = userEvent.setup();
    renderDropdown();

    const triggerBtn = screen.getByRole('button', { name: /FirmDesk AI Assistant Chat/i });
    await user.click(triggerBtn);

    const input = screen.getByPlaceholderText(/Ask about GST, TDS, ITR/i);
    await user.type(input, 'What are the upcoming deadlines?{enter}');

    // Response should render
    const deadlineHeader = await screen.findByText(/Key Statutory Compliance Deadlines for Indian CA Firms/i);
    expect(deadlineHeader).toBeInTheDocument();
    expect(screen.getByText(/View Statutory Filings/i)).toBeInTheDocument();
  });

  it('allows clicking quick prompt suggestions', async () => {
    const user = userEvent.setup();
    renderDropdown();

    const triggerBtn = screen.getByRole('button', { name: /FirmDesk AI Assistant Chat/i });
    await user.click(triggerBtn);

    const promptBtn = screen.getByRole('button', { name: /TDS Rates/i });
    await user.click(promptBtn);

    // Response should render TDS details
    const tdsHeader = await screen.findByText(/Standard TDS Rates & Thresholds/i);
    expect(tdsHeader).toBeInTheDocument();
  });
});
