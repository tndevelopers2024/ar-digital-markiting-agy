"use client";

import { useState, useEffect } from "react";
import { siteConfig } from "@/config/site";
import { useServiceContext } from "./ServiceContext";
import { MagneticButton } from '@/components/ui/magnetic-button';

interface InquirySectionProps {
  initialServiceId?: string;
}

interface FormState {
  name: string;
  email: string;
  businessName: string;
  message: string;
  website: string; // Honeypot
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function InquirySection({ initialServiceId }: InquirySectionProps) {
  const { inquiry, services, footer } = siteConfig;
  const { selectedServiceId, setSelectedServiceId } = useServiceContext();

  const activeServiceId = selectedServiceId || initialServiceId || services[0]?.id || "";

  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    businessName: "",
    message: "",
    website: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submissionNotice, setSubmissionNotice] = useState<string | null>(null);

  // Listen to custom event from external service cards
  useEffect(() => {
    const handleSelectService = (e: Event) => {
      const customEvent = e as CustomEvent<{ serviceId: string }>;
      if (customEvent.detail?.serviceId) {
        setSelectedServiceId(customEvent.detail.serviceId);
      }
    };

    window.addEventListener("ar-select-service", handleSelectService);
    return () => {
      window.removeEventListener("ar-select-service", handleSelectService);
    };
  }, [setSelectedServiceId]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please provide your name.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please provide your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please share a few details about your project or goals.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check: silent rejection if bot filled out the hidden field
    if (formData.website) {
      return;
    }

    if (!validate()) {
      return;
    }

    // Honest notice: Online API submission is not connected, provide direct mailto action
    setSubmissionNotice(
      "Notice: Direct database submission is currently offline. You can reach out directly via our email below with your project details."
    );
  };

  // Generate mailto link with pre-filled fields
  const selectedServiceObj = services.find((s) => s.id === activeServiceId);
  const mailtoSubject = encodeURIComponent(
    `Project Inquiry: ${formData.businessName || formData.name} - ${selectedServiceObj?.title || "Digital Marketing"}`
  );
  const mailtoBody = encodeURIComponent(
    `Hello AR Digital Marketing,\n\nName: ${formData.name}\nEmail: ${formData.email}\nBusiness: ${
      formData.businessName || "N/A"
    }\nService: ${selectedServiceObj?.title || activeServiceId}\n\nProject Overview:\n${formData.message}\n`
  );
  const mailtoUrl = `mailto:${footer.email}?subject=${mailtoSubject}&body=${mailtoBody}`;

  return (
    <section id="inquiry" className="relative py-8 sm:py-10 lg:py-12 scroll-mt-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Double-Bezel Form Container */}
        <div className="rounded-[2.5rem] p-2 bg-black/[0.03] ring-1 ring-black/[0.05] shadow-sm">
          <div className="rounded-[calc(2.5rem-0.5rem)] border border-border-subtle bg-white p-8 sm:p-12">
            {/* Header */}
            <div className="mb-10 text-center sm:text-left">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border-subtle bg-warm-white px-3 py-1 shadow-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ink">
                  {inquiry.subheading}
                </span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-ink">
                Let&apos;s make your next move count.
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-muted leading-relaxed">
                {inquiry.note}
              </p>
            </div>

            {/* Honest Offline Notice Banner */}
            {submissionNotice && (
              <div
                role="alert"
                className="mb-8 rounded-2xl border border-amber-200 bg-amber-50/80 p-5 text-amber-900 shadow-xs"
              >
                <div className="flex items-start gap-3">
                  <svg
                    className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                    />
                  </svg>
                  <div className="flex-1 text-xs sm:text-sm">
                    <p className="font-semibold">{submissionNotice}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <a
                        href={mailtoUrl}
                        className="inline-flex items-center gap-2 rounded-full bg-amber-900 px-4 py-2 font-display text-xs font-semibold text-white transition-colors hover:bg-amber-800"
                      >
                        <span>Open in Email App</span>
                        <svg
                          className="h-3.5 w-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                          />
                        </svg>
                      </a>
                      <span className="text-xs text-amber-800">
                        Or write directly to: <strong className="font-mono">{footer.email}</strong>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {/* Spam Defense: Honeypot field (hidden from view) */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website-field">Leave this empty</label>
                <input
                  id="website-field"
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                />
              </div>

              {/* Service of Interest Pills */}
              <div>
                <label className="block font-display text-xs font-bold uppercase tracking-wider text-ink mb-3">
                  Service of Interest
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {services.map((service) => {
                    const isSelected = activeServiceId === service.id;
                    return (
                      <MagneticButton
                        key={service.id}
                        as="button"
                        type="button"
                        onClick={() => setSelectedServiceId(service.id)}
                        className={`flex items-center gap-2.5 rounded-xl border p-3 text-left transition-all cursor-pointer ${
                          isSelected
                            ? "border-brand-blue bg-brand-blue/10 text-brand-blue font-semibold ring-1 ring-brand-blue"
                            : "border-border-subtle bg-warm-white/60 text-ink/80 hover:border-slate-300 hover:bg-warm-white"
                        }`}
                      >
                        <span
                          className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                            isSelected
                              ? "border-brand-blue bg-brand-blue text-white"
                              : "border-slate-300 bg-white"
                          }`}
                        >
                          {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                        </span>
                        <span className="text-xs">{service.title}</span>
                      </MagneticButton>
                    );
                  })}
                </div>
              </div>

              {/* Name & Email Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="client-name"
                    className="block font-display text-xs font-bold uppercase tracking-wider text-ink mb-2"
                  >
                    Your Name <span className="text-brand-red">*</span>
                  </label>
                  <input
                    id="client-name"
                    type="text"
                    required
                    aria-describedby={errors.name ? "name-error" : undefined}
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: undefined });
                    }}
                    placeholder="Jane Doe"
                    className={`w-full rounded-xl border bg-warm-white px-4 py-3 text-sm text-ink placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all ${
                      errors.name ? "border-brand-red ring-1 ring-brand-red" : "border-border-subtle"
                    }`}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1.5 text-xs text-brand-red">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="client-email"
                    className="block font-display text-xs font-bold uppercase tracking-wider text-ink mb-2"
                  >
                    Email Address <span className="text-brand-red">*</span>
                  </label>
                  <input
                    id="client-email"
                    type="email"
                    required
                    aria-describedby={errors.email ? "email-error" : undefined}
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: undefined });
                    }}
                    placeholder="jane@company.com"
                    className={`w-full rounded-xl border bg-warm-white px-4 py-3 text-sm text-ink placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all ${
                      errors.email ? "border-brand-red ring-1 ring-brand-red" : "border-border-subtle"
                    }`}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1.5 text-xs text-brand-red">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Business Name Field */}
              <div>
                <label
                  htmlFor="business-name"
                  className="block font-display text-xs font-bold uppercase tracking-wider text-ink mb-2"
                >
                  Business Name <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  id="business-name"
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  placeholder="Acme Enterprises or website URL"
                  className="w-full rounded-xl border border-border-subtle bg-warm-white px-4 py-3 text-sm text-ink placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all"
                />
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="project-details"
                  className="block font-display text-xs font-bold uppercase tracking-wider text-ink mb-2"
                >
                  Project Details <span className="text-brand-red">*</span>
                </label>
                <textarea
                  id="project-details"
                  rows={4}
                  required
                  aria-describedby={errors.message ? "message-error" : undefined}
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (errors.message) setErrors({ ...errors, message: undefined });
                  }}
                  placeholder="Tell us about your current challenges, target audience, and what you aim to achieve..."
                  className={`w-full rounded-xl border bg-warm-white px-4 py-3 text-sm text-ink placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all resize-y ${
                    errors.message ? "border-brand-red ring-1 ring-brand-red" : "border-border-subtle"
                  }`}
                />
                {errors.message && (
                  <p id="message-error" className="mt-1.5 text-xs text-brand-red">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button & Direct Email Link */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border-subtle">
                <MagneticButton
                  as="button"
                  type="submit"
                  className="group relative flex w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-brand-blue pl-7 pr-2.5 py-3 text-sm font-semibold tracking-wide text-white shadow-sm transition-all duration-300 hover:bg-brand-blue-hover active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-brand-blue cursor-pointer"
                >
                  <span>Submit Inquiry</span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 ease-out group-hover:translate-x-1">
                    <svg
                      className="h-3.5 w-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </span>
                </MagneticButton>

                <p className="text-xs text-slate-muted text-center sm:text-right">
                  Prefer direct email? Reach us at{" "}
                  <a
                    href={`mailto:${footer.email}`}
                    className="font-medium text-brand-blue underline hover:text-brand-blue-hover"
                  >
                    {footer.email}
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
