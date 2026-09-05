import * as RadixPopover from '@radix-ui/react-popover';
import {
  ArrowRight,
  Bot,
  Check,
  Copy,
  RotateCcw,
  Send,
  Sparkles,
  User,
  X,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSession } from '@/context/SessionContext';
import { cn } from '@/lib/cn';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  actions?: Array<{
    label: string;
    route: string;
  }>;
}

const QUICK_PROMPTS = [
  {
    label: '📅 Upcoming Tax Deadlines',
    query: 'What are the upcoming statutory tax deadlines for GST and TDS this month?',
  },
  {
    label: '⚖️ TDS Rates (194C & 194J)',
    query: 'What are the standard TDS deduction rates and thresholds under Section 194C and 194J?',
  },
  {
    label: '📝 Draft Document Reminder',
    query: 'Draft a polite and urgent email reminder for a client to submit bank statements and GST data.',
  },
  {
    label: '🏛️ GST Reverse Charge (RCM)',
    query: 'Explain when Reverse Charge Mechanism (RCM) applies in GST and how it should be reported.',
  },
  {
    label: '⚡ How to Bulk Generate Filings?',
    query: 'How do I bulk generate statutory filings for all my clients in FirmDesk?',
  },
];

function getAiResponse(userQuery: string, userName: string): {
  text: string;
  actions?: Array<{ label: string; route: string }>;
} {
  const query = userQuery.toLowerCase();

  // Deadlines / Calendar
  if (query.includes('deadline') || query.includes('due date') || query.includes('calendar') || query.includes('filing date')) {
    return {
      text: `### 📅 Key Statutory Compliance Deadlines for Indian CA Firms:\n\n` +
        `• **GSTR-1**: **11th of every month** for monthly filers (or 13th under QRMP IFF).\n` +
        `• **GSTR-3B**: **20th of every month** (Category 1 states: 22nd, Category 2 states: 24th for quarterly).\n` +
        `• **TDS Deposit (Challan 281)**: **7th of the following month** (30th April for March deductions).\n` +
        `• **TDS Quarterly Return (24Q/26Q)**: **31st July, 31st Oct, 31st Jan, 31st May**.\n` +
        `• **Advance Tax Installments**: 15% (Jun 15), 45% (Sep 15), 75% (Dec 15), 100% (Mar 15).\n` +
        `• **Income Tax Returns**: 31st July (Non-audit), 31st October (Audit cases).\n\n` +
        `💡 *FirmDesk automatically groups your firm's filings into 7, 14, and 30-day buckets on your dashboard!*`,
      actions: [
        { label: 'View Statutory Filings', route: '/compliance' },
        { label: 'Bulk Generate Filings', route: '/compliance/generate' },
      ],
    };
  }

  // TDS Section 194C / 194J / TDS rates
  if (query.includes('tds') || query.includes('194c') || query.includes('194j') || query.includes('194i') || query.includes('rate')) {
    return {
      text: `### ⚖️ Standard TDS Rates & Thresholds (FY 2024-25 / AY 2025-26):\n\n` +
        `1. **Section 194C (Payments to Contractors/Subcontractors)**:\n` +
        `   - Rate: **1%** (Individual/HUF), **2%** (Companies/Firms).\n` +
        `   - Single bill threshold: **₹30,000** | Aggregate annual threshold: **₹1,00,000**.\n` +
        `   - PAN not furnished: **20%** under Sec 206AA.\n\n` +
        `2. **Section 194J (Fees for Professional / Technical Services)**:\n` +
        `   - Technical services / Call centers: **2%**.\n` +
        `   - Professional services / Royalty: **10%**.\n` +
        `   - Annual threshold: **₹30,000** per payee.\n\n` +
        `3. **Section 194I (Rent)**:\n` +
        `   - Plant, machinery & equipment: **2%**.\n` +
        `   - Land, building or furniture: **10%** (Threshold: **₹2,40,000** per annum).\n\n` +
        `4. **Section 194Q & 206C(1H) (Purchase/Sale of Goods)**:\n` +
        `   - Rate: **0.1%** on value exceeding **₹50 Lakhs** (if buyer's turnover > ₹10 Cr).`,
      actions: [
        { label: 'Open Client Filings', route: '/compliance' },
        { label: 'Check Tasks', route: '/tasks' },
      ],
    };
  }

  // Draft email / notice reminder
  if (query.includes('draft') || query.includes('email') || query.includes('reminder') || query.includes('letter')) {
    return {
      text: `### 📝 Ready-to-Send Client Document Reminder Template\n\n` +
        `**Subject:** Urgent: Pending Documents for Statutory Tax Filing — Action Required\n\n` +
        `Dear Valued Client,\n\n` +
        `Greetings from our firm.\n\n` +
        `To ensure your upcoming statutory filings (GST / TDS / Advance Tax) are submitted well ahead of the government deadline and to avoid statutory late fees or interest under the Income Tax & GST Acts, please provide the following pending documents:\n\n` +
        `1. Bank Statements for all operational accounts (with narration)\n` +
        `2. Sales & Purchase Registers (GSTR-2B reconciliation)\n` +
        `3. Invoices for capital asset purchases or major expenses\n` +
        `4. TDS certificates received (Form 16A / 26AS)\n\n` +
        `You can conveniently upload these files directly via your **FirmDesk Client Portal** link or reply to this message.\n\n` +
        `Warm regards,\n` +
        `**${userName}**\n` +
        `*Chartered Accountants / Tax Advisory*`,
      actions: [
        { label: 'Create Document Request', route: '/requests' },
        { label: 'Open Messages', route: '/messages' },
      ],
    };
  }

  // GST Reverse Charge / RCM
  if (query.includes('rcm') || query.includes('reverse charge') || query.includes('composition')) {
    return {
      text: `### 🏛️ GST Reverse Charge Mechanism (RCM) Summary:\n\n` +
        `Under RCM (Sec 9(3) & 9(4) of CGST Act), the recipient of goods/services is liable to pay GST directly to the government instead of the supplier:\n\n` +
        `• **Key RCM Services**:\n` +
        `  - Goods Transport Agency (GTA) services (where recipient pays 5% under RCM).\n` +
        `  - Legal services supplied by an advocate or senior advocate.\n` +
        `  - Services provided by an arbitral tribunal or director to a company.\n` +
        `  - Sponsorship services provided to body corporate or partnership.\n\n` +
        `• **ITC Rules for RCM**:\n` +
        `  - Tax must be discharged **in cash via Electronic Cash Ledger** (cannot use existing ITC to pay RCM liability).\n` +
        `  - Input Tax Credit (ITC) can be claimed in the same tax period upon payment in GSTR-3B Table 4(A)(3).`,
      actions: [
        { label: 'Check Compliance List', route: '/compliance' },
      ],
    };
  }

  // How to generate filings or FirmDesk workflow
  if (query.includes('generate') || query.includes('bulk') || query.includes('filing') || query.includes('firmdesk')) {
    return {
      text: `### ⚡ How to Bulk Generate Filings in FirmDesk:\n\n` +
        `1. Navigate to **Statutory Filings** or the **Generate Filings** tool.\n` +
        `2. Select the target **Period** (e.g., current month or upcoming quarter).\n` +
        `3. Select the compliance types (e.g. *GSTR-1, GSTR-3B, TDS 26Q*).\n` +
        `4. Click **Generate Filings**. FirmDesk automatically assigns them across your active clients based on their registered entity types (Pvt Ltd, LLP, Prop).\n` +
        `5. Deadlines will immediately appear on your **Dashboard** and team **My Work** queues!`,
      actions: [
        { label: 'Go to Generate Filings', route: '/compliance/generate' },
        { label: 'View Dashboard', route: '/dashboard' },
      ],
    };
  }

  // Client onboarding
  if (query.includes('client') || query.includes('onboard') || query.includes('add client')) {
    return {
      text: `### 💼 Onboarding a Client in FirmDesk:\n\n` +
        `• Go to **Clients > Add Client**.\n` +
        `• Select Entity Type (*Private Limited, LLP, Partnership, Sole Proprietorship, Individual*).\n` +
        `• Enter PAN, GSTIN, CIN, and TAN — FirmDesk validates Indian format rules automatically.\n` +
        `• Assign primary staff members and set their initial statutory compliance obligations.`,
      actions: [
        { label: 'Add New Client', route: '/clients/new' },
        { label: 'Browse Clients Directory', route: '/clients' },
      ],
    };
  }

  // General fallback
  return {
    text: `I've analyzed your question regarding **"${userQuery}"**:\n\n` +
      `Here is key guidance for your practice:\n` +
      `• **Statutory Compliance**: Ensure all client records, books of accounts, and filings are reconciled with GST Portal (GSTR-2B) and Income Tax AIS/TIS.\n` +
      `• **Team Coordination**: Assign internal tasks and set milestone dates in FirmDesk to avoid last-minute rush.\n` +
      `• **Client Communications**: You can send automated document requests or message clients directly via the portal.\n\n` +
      `Would you like me to draft an email, lookup specific section rates, or navigate to a feature in FirmDesk?`,
    actions: [
      { label: 'Dashboard', route: '/dashboard' },
      { label: 'My Work Queue', route: '/my-work' },
      { label: 'Document Requests', route: '/requests' },
    ],
  };
}

function formatCurrentTime(): string {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

export function AiChatDropdown() {
  let userName = 'there';
  try {
    const session = useSession();
    if (session.user?.name) {
      userName = session.user.name;
    }
  } catch {
    userName = 'there';
  }

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const msgIdRef = useRef(1);

  const firstName = userName.split(' ')[0] ?? userName;

  const initialMessages: ChatMessage[] = [
    {
      id: 'welcome-msg',
      sender: 'assistant',
      content: `Hello ${firstName}! 👋 I am your **FirmDesk CA Copilot**.\n\n` +
        `I can help you with Indian taxation (GST, TDS, Income Tax), compliance deadlines, drafting client communications, and navigating FirmDesk features. What would you like assistance with today?`,
      timestamp: 'Just now',
    },
  ];

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const text = (textToSend ?? input).trim();
    if (!text || isTyping) return;

    msgIdRef.current += 1;
    const currentId = msgIdRef.current;
    const userMsg: ChatMessage = {
      id: `user-${currentId}`,
      sender: 'user',
      content: text,
      timestamp: formatCurrentTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Realistic assistant delay
    setTimeout(() => {
      msgIdRef.current += 1;
      const aiId = msgIdRef.current;
      const response = getAiResponse(text, firstName);
      const aiMsg: ChatMessage = {
        id: `assistant-${aiId}`,
        sender: 'assistant',
        content: response.text,
        timestamp: formatCurrentTime(),
        actions: response.actions,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 450);
  };

  const handleClear = () => {
    setMessages(initialMessages);
    setInput('');
  };

  const copyToClipboard = (text: string, id: string) => {
    void navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <RadixPopover.Root open={isOpen} onOpenChange={setIsOpen}>
      <RadixPopover.Trigger asChild>
        <button
          type="button"
          aria-label="FirmDesk AI Assistant Chat"
          className={cn(
            'group relative inline-flex h-9 items-center gap-2 rounded-lg px-2.5 sm:px-3 text-xs font-semibold shadow-2xs transition-all cursor-pointer',
            'border border-indigo-500/30 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 hover:from-indigo-500/20 hover:via-purple-500/20 hover:to-pink-500/20',
            'text-[var(--fd-text-primary)] hover:border-indigo-500/50 hover:shadow-xs',
            'focus-visible:outline-2 focus-visible:outline-[var(--fd-focus-ring)]',
            isOpen && 'border-indigo-500 bg-indigo-500/20 ring-2 ring-indigo-500/20',
          )}
        >
          <div className="relative flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-indigo-500 transition-transform group-hover:scale-110 group-hover:rotate-12 duration-300" />
            <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
            </span>
          </div>
          <span className="font-medium hidden sm:inline">Ask AI</span>
          <span className="hidden md:inline-flex items-center rounded-full bg-indigo-500/15 px-1.5 py-0.2 text-[9px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
            Copilot
          </span>
        </button>
      </RadixPopover.Trigger>

      <RadixPopover.Portal>
        <RadixPopover.Content
          align="end"
          side="bottom"
          sideOffset={8}
          collisionPadding={12}
          className={cn(
            'z-50 flex flex-col w-[92vw] sm:w-[500px] md:w-[540px] h-[600px] max-h-[85vh]',
            'rounded-2xl border border-[var(--fd-border)] bg-[var(--fd-surface-1)] shadow-2xl overflow-hidden outline-none',
            'animate-in fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2',
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[var(--fd-border-subtle)] bg-gradient-to-r from-[var(--fd-surface-2)] via-[var(--fd-surface-1)] to-[var(--fd-surface-2)] px-4 py-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-sm">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-semibold text-[var(--fd-text-primary)]">
                    FirmDesk AI Copilot
                  </h3>
                  <span className="rounded bg-indigo-500/15 px-1.5 py-0.2 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                    CA Assistant
                  </span>
                </div>
                <p className="text-[11px] text-[var(--fd-text-tertiary)] flex items-center gap-1.5">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Online • GST, TDS, Compliance & Workflows
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleClear}
                title="Reset conversation"
                aria-label="Reset conversation"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[var(--fd-text-tertiary)] transition-colors hover:bg-[var(--fd-surface-3)] hover:text-[var(--fd-text-primary)] cursor-pointer"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <RadixPopover.Close asChild>
                <button
                  type="button"
                  aria-label="Close AI Chat"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[var(--fd-text-tertiary)] transition-colors hover:bg-[var(--fd-surface-3)] hover:text-[var(--fd-text-primary)] cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </RadixPopover.Close>
            </div>
          </div>

          {/* Quick Prompts Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto border-b border-[var(--fd-border-subtle)] bg-[var(--fd-surface-2)]/50 px-3 py-2 no-scrollbar">
            <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-[var(--fd-text-tertiary)] pl-1">
              Suggestions:
            </span>
            {QUICK_PROMPTS.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(p.query)}
                className="inline-flex shrink-0 items-center gap-1 rounded-full border border-[var(--fd-border-subtle)] bg-[var(--fd-surface-1)] px-2.5 py-1 text-[11px] font-medium text-[var(--fd-text-secondary)] shadow-2xs transition-colors hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer"
              >
                <span>{p.label}</span>
              </button>
            ))}
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={cn('flex gap-3 text-xs leading-relaxed', isUser ? 'justify-end' : 'justify-start')}
                >
                  {!isUser && (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-xs">
                      <Sparkles className="h-3.5 w-3.5" />
                    </div>
                  )}

                  <div
                    className={cn(
                      'relative group max-w-[85%] rounded-2xl p-3.5 shadow-2xs transition-all',
                      isUser
                        ? 'rounded-tr-xs bg-indigo-600 text-white'
                        : 'rounded-tl-xs border border-[var(--fd-border-subtle)] bg-[var(--fd-surface-2)] text-[var(--fd-text-primary)]',
                    )}
                  >
                    {/* Copy Button for Assistant message */}
                    {!isUser && (
                      <button
                        type="button"
                        onClick={() => copyToClipboard(msg.content, msg.id)}
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-[var(--fd-surface-3)] text-[var(--fd-text-tertiary)] hover:text-[var(--fd-text-primary)] cursor-pointer"
                        title="Copy text"
                        aria-label="Copy text"
                      >
                        {copiedId === msg.id ? (
                          <Check className="h-3 w-3 text-emerald-500" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </button>
                    )}

                    {/* Message Content formatted */}
                    <div className="whitespace-pre-wrap font-sans space-y-1.5">
                      {msg.content.split('\n\n').map((para, pIdx) => {
                        // Header rendering
                        if (para.startsWith('### ')) {
                          return (
                            <h4 key={pIdx} className="font-semibold text-sm text-indigo-500 pt-1 pb-0.5">
                              {para.replace('### ', '')}
                            </h4>
                          );
                        }
                        // Bold title rendering
                        if (para.startsWith('**') && para.includes('**:\n')) {
                          return (
                            <div key={pIdx} className="font-medium">
                              {para}
                            </div>
                          );
                        }
                        return <p key={pIdx}>{para}</p>;
                      })}
                    </div>

                    {/* Quick Action Navigation Chips */}
                    {msg.actions && msg.actions.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-[var(--fd-border-subtle)] flex flex-wrap gap-1.5">
                        {msg.actions.map((act, aIdx) => (
                          <button
                            key={aIdx}
                            type="button"
                            onClick={() => {
                              setIsOpen(false);
                              void navigate(act.route);
                            }}
                            className="inline-flex items-center gap-1 rounded-lg bg-[var(--fd-surface-1)] border border-[var(--fd-border)] px-2.5 py-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 shadow-2xs hover:bg-[var(--fd-surface-3)] cursor-pointer"
                          >
                            <span>{act.label}</span>
                            <ArrowRight className="h-3 w-3" />
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Timestamp */}
                    <div
                      className={cn(
                        'mt-1.5 text-[9px] text-right font-mono',
                        isUser ? 'text-indigo-200' : 'text-[var(--fd-text-tertiary)]',
                      )}
                    >
                      {msg.timestamp}
                    </div>
                  </div>

                  {isUser && (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--fd-surface-3)] text-[var(--fd-text-secondary)] shadow-xs">
                      <User className="h-3.5 w-3.5" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-3 text-xs justify-start items-center">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-xs">
                  <Sparkles className="h-3.5 w-3.5" />
                </div>
                <div className="rounded-2xl rounded-tl-xs border border-[var(--fd-border-subtle)] bg-[var(--fd-surface-2)] px-4 py-2.5 text-[var(--fd-text-secondary)] flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                  <span className="text-[11px] pl-1.5 text-[var(--fd-text-tertiary)] font-medium">
                    Copilot is thinking...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input Bar */}
          <div className="border-t border-[var(--fd-border-subtle)] bg-[var(--fd-surface-2)]/80 p-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about GST, TDS, ITR, tasks, or drafting..."
                className="flex-1 rounded-xl border border-[var(--fd-border)] bg-[var(--fd-surface-1)] px-3.5 py-2 text-xs text-[var(--fd-text-primary)] placeholder-[var(--fd-text-tertiary)] shadow-2xs outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                aria-label="Send message"
                className={cn(
                  'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-semibold shadow-xs transition-all cursor-pointer',
                  input.trim() && !isTyping
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-[var(--fd-surface-3)] text-[var(--fd-text-tertiary)] cursor-not-allowed opacity-60',
                )}
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            <div className="flex items-center justify-between pt-1.5 px-1 text-[10px] text-[var(--fd-text-tertiary)]">
              <span>Press Enter ↵ to send</span>
              <span>FirmDesk Practice Copilot</span>
            </div>
          </div>
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
}
