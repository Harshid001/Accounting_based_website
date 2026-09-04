import { useState } from 'react';
import {
  Building2,
  CalendarCheck,
  CheckCircle2,
  Clock,
  Landmark,
  Mail,
  MessageSquare,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

import { Button } from '@/components/ui/button';

export function ConsultationSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    entityType: 'Private Limited Company',
    service: 'Corporate Tax & GST Compliance',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) return;
    setSubmitted(true);
  };

  return (
    <section id="consultation" className="scroll-mt-20 py-16 lg:py-24 border-t border-[var(--fd-border-subtle)] bg-[var(--fd-surface-1)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-md bg-[var(--fd-accent-subtle-bg)] px-2.5 py-1 text-xs font-semibold text-[var(--fd-accent)] uppercase tracking-wider">
            Partner Consultation
          </div>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-[var(--fd-text-primary)] sm:text-4xl">
            Schedule a Confidential Advisory Session
          </h2>
          <p className="mt-3 text-base text-[var(--fd-text-secondary)]">
            Discuss your company&apos;s tax posture, Joint Venture financials, or statutory compliance with an experienced
            Chartered Accountant. No obligation, 100% confidential.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Practice Info & Partner Promises */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-[var(--fd-border)] bg-[var(--fd-bg)] p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--fd-accent)] text-[var(--fd-accent-contrast)]">
                  <Landmark className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[var(--fd-text-primary)]">Accounting JV Practice</h3>
                  <p className="text-xs text-[var(--fd-text-secondary)]">Chartered Accountants & Advisory</p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[var(--fd-text-secondary)] leading-relaxed">
                We believe in proactive, year-round client partnerships—not once-a-year transactional tax filings.
                Get in touch to discover how we streamline your compliance and protect your cash flow.
              </p>

              <div className="space-y-4 text-xs sm:text-sm border-t border-[var(--fd-border-subtle)] pt-6 text-[var(--fd-text-secondary)]">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-[var(--fd-accent)] shrink-0" />
                  <a href="mailto:advisory@accountingjv.com" className="hover:text-[var(--fd-text-primary)]">
                    advisory@accountingjv.com
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>+91 (022) 4982-3000 / +91 98201-44332</span>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-sky-400 shrink-0" />
                  <span>Monday – Saturday, 9:30 AM – 6:30 PM IST</span>
                </div>

                <div className="flex items-center gap-3">
                  <Building2 className="h-4 w-4 text-purple-400 shrink-0" />
                  <span>Practice Offices: Nariman Point, Mumbai & Indiranagar, Bengaluru</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="rounded-xl bg-[var(--fd-surface-2)] p-4 space-y-2 border border-[var(--fd-border-subtle)]">
                <div className="flex items-center gap-2 text-xs font-semibold text-[var(--fd-text-primary)]">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  <span>Strict NDA Guarantee</span>
                </div>
                <p className="text-[11px] text-[var(--fd-text-secondary)] leading-relaxed">
                  All shared financials, tax records, and JV agreements are protected under institutional confidentiality agreements.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Consultation Request Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-[var(--fd-border)] bg-[var(--fd-bg)] p-6 sm:p-8 shadow-sm">
              {submitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--fd-text-primary)]">
                    Consultation Request Received
                  </h3>
                  <p className="max-w-md mx-auto text-xs sm:text-sm text-[var(--fd-text-secondary)] leading-relaxed">
                    Thank you, <strong>{formData.fullName}</strong>. A Senior Partner specializing in{' '}
                    <span className="text-[var(--fd-accent)] font-semibold">{formData.service}</span> will review your company details
                    and reach out via email ({formData.email}) within 24 business hours.
                  </p>
                  <div className="pt-4">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          fullName: '',
                          email: '',
                          phone: '',
                          companyName: '',
                          entityType: 'Private Limited Company',
                          service: 'Corporate Tax & GST Compliance',
                          message: '',
                        });
                      }}
                    >
                      Submit Another Inquiry
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CalendarCheck className="h-4 w-4 text-[var(--fd-accent)]" />
                    <h3 className="text-base font-bold text-[var(--fd-text-primary)]">
                      Tell Us About Your Requirement
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-fullName" className="block text-xs font-semibold text-[var(--fd-text-secondary)] mb-1">
                        Full Name *
                      </label>
                      <input
                        id="contact-fullName"
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Rajesh Singhania"
                        className="w-full rounded-lg border border-[var(--fd-border)] bg-[var(--fd-surface-1)] px-3 py-2 text-xs text-[var(--fd-text-primary)] placeholder-[var(--fd-text-tertiary)] focus:border-[var(--fd-accent)] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-semibold text-[var(--fd-text-secondary)] mb-1">
                        Work Email *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="rajesh@company.com"
                        className="w-full rounded-lg border border-[var(--fd-border)] bg-[var(--fd-surface-1)] px-3 py-2 text-xs text-[var(--fd-text-primary)] placeholder-[var(--fd-text-tertiary)] focus:border-[var(--fd-accent)] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-phone" className="block text-xs font-semibold text-[var(--fd-text-secondary)] mb-1">
                        Phone / Mobile
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98200 00000"
                        className="w-full rounded-lg border border-[var(--fd-border)] bg-[var(--fd-surface-1)] px-3 py-2 text-xs text-[var(--fd-text-primary)] placeholder-[var(--fd-text-tertiary)] focus:border-[var(--fd-accent)] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-companyName" className="block text-xs font-semibold text-[var(--fd-text-secondary)] mb-1">
                        Company / Business Name
                      </label>
                      <input
                        id="contact-companyName"
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="e.g. Apex Technologies Pvt Ltd"
                        className="w-full rounded-lg border border-[var(--fd-border)] bg-[var(--fd-surface-1)] px-3 py-2 text-xs text-[var(--fd-text-primary)] placeholder-[var(--fd-text-tertiary)] focus:border-[var(--fd-accent)] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-entityType" className="block text-xs font-semibold text-[var(--fd-text-secondary)] mb-1">
                        Entity Structure
                      </label>
                      <select
                        id="contact-entityType"
                        value={formData.entityType}
                        onChange={(e) => setFormData({ ...formData, entityType: e.target.value })}
                        className="w-full rounded-lg border border-[var(--fd-border)] bg-[var(--fd-surface-1)] px-3 py-2 text-xs text-[var(--fd-text-primary)] focus:border-[var(--fd-accent)] focus:outline-none"
                      >
                        <option value="Private Limited Company">Private Limited Company</option>
                        <option value="Joint Venture / SPV Consortium">Joint Venture / SPV Consortium</option>
                        <option value="Limited Liability Partnership">Limited Liability Partnership (LLP)</option>
                        <option value="Partnership Firm">Partnership Firm</option>
                        <option value="Sole Proprietorship / MSME">Sole Proprietorship / MSME</option>
                        <option value="Individual / High Net Worth">Individual / Director ITR</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="contact-service" className="block text-xs font-semibold text-[var(--fd-text-secondary)] mb-1">
                        Primary Advisory Area
                      </label>
                      <select
                        id="contact-service"
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full rounded-lg border border-[var(--fd-border)] bg-[var(--fd-surface-1)] px-3 py-2 text-xs text-[var(--fd-text-primary)] focus:border-[var(--fd-accent)] focus:outline-none"
                      >
                        <option value="Corporate Tax & GST Compliance">Corporate Tax & GST Compliance</option>
                        <option value="Joint Venture & SPV Financial Advisory">Joint Venture & SPV Advisory</option>
                        <option value="Full-Stack Cloud Bookkeeping & MIS">Full-Stack Bookkeeping & MIS</option>
                        <option value="Statutory Audit & Tax Audit u/s 44AB">Statutory Audit & Tax Audit</option>
                        <option value="Virtual CFO & Strategic Financial Modeling">Virtual CFO & Financial Modeling</option>
                        <option value="ROC / MCA Corporate Secretarial">ROC / MCA Corporate Secretarial</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-semibold text-[var(--fd-text-secondary)] mb-1">
                      Brief Description of Requirements
                    </label>
                    <textarea
                      id="contact-message"
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share your current challenges, turnover scale, or filing targets..."
                      className="w-full rounded-lg border border-[var(--fd-border)] bg-[var(--fd-surface-1)] px-3 py-2 text-xs text-[var(--fd-text-primary)] placeholder-[var(--fd-text-tertiary)] focus:border-[var(--fd-accent)] focus:outline-none resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <Button type="submit" variant="primary" size="md" className="w-full justify-center">
                      <Send className="h-4 w-4 mr-2" />
                      <span>Request Partner Consultation</span>
                    </Button>
                    <p className="mt-2 text-[11px] text-center text-[var(--fd-text-tertiary)]">
                      We respect your privacy. No spam. A senior partner will contact you directly.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
