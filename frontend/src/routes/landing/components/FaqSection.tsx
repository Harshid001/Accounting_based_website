import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'How do our clients get access to the Client Portal?',
    answer:
      'When your practice onboards a client or sole proprietor, an automated welcome email with secure verification is sent. Once verified, the client can log in via email or Google OAuth to immediately see their compliance calendar, pending document requests, and past filing receipts.',
  },
  {
    question: 'Can one client manage multiple businesses or sister companies under one login?',
    answer:
      'Yes. FirmDesk natively supports multi-entity client accounts. A founder or CFO can switch between their Private Limited company, LLP, and individual returns from the top entity switcher dropdown without logging out or juggling multiple credentials.',
  },
  {
    question: 'How does FirmDesk handle government due date extensions (e.g., CBDT or CBIC circulars)?',
    answer:
      'Practice administrators can update statutory due date rules or override deadlines on specific filing tasks instantly from the Catalogue & Settings manager. All affected client horizons, reminder offsets, and countdown timers adjust automatically in real time.',
  },
  {
    question: 'How does the platform prevent unauthorized access to sensitive client files like Aadhaar?',
    answer:
      'FirmDesk uses AES-256-GCM encryption with separate initialization vectors for Aadhaar storage. Standard staff views mask all but the last 4 digits. Only partners with authorized audit privileges can request a temporary audited reveal, which creates an immutable record in the audit log.',
  },
  {
    question: 'What is the file transfer process for large balance sheets, audit reports, and bank statements?',
    answer:
      'Uploads use a secure 3-call handshake: the client browser requests a 60-second signed transfer URL, streams the file directly to MongoDB GridFS, and then finalizes the document. Files are verified for size (up to 25 MB) and MIME types before transfer, keeping the server lean and secure.',
  },
  {
    question: 'Is FirmDesk accessible on mobile devices for busy founders and partners?',
    answer:
      'Absolutely. Every screen—from the Client Portal overview and file uploader to the Staff Task Detail and Compliance Radar—is built with fluid responsive design, touch momentum scrolling, and full safe-area notch support for iOS and Android.',
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="scroll-mt-20 py-16 lg:py-24 border-t border-[var(--fd-border-subtle)] bg-[var(--fd-surface-1)]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 rounded-md bg-[var(--fd-accent-subtle-bg)] px-2.5 py-1 text-xs font-semibold text-[var(--fd-accent)] uppercase tracking-wider">
            Frequently Asked Questions
          </div>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-[var(--fd-text-primary)] sm:text-4xl">
            Everything You Need to Know
          </h2>
          <p className="mt-3 text-base text-[var(--fd-text-secondary)]">
            Answers to common questions about practicing on FirmDesk and onboarding clients.
          </p>
        </div>

        {/* Accordion List */}
        <div className="mt-10 divide-y divide-[var(--fd-border-subtle)] rounded-xl border border-[var(--fd-border)] bg-[var(--fd-bg)]">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="p-4 sm:p-5">
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 text-left font-semibold text-[var(--fd-text-primary)] hover:text-[var(--fd-accent)] transition-colors"
                >
                  <span className="text-sm sm:base">{item.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-[var(--fd-text-secondary)] transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[var(--fd-accent)]' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>
                {isOpen && (
                  <div className="mt-3 text-xs sm:text-sm leading-relaxed text-[var(--fd-text-secondary)] animate-in fade-in-50 duration-150">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
