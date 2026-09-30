"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ServiceProvider } from "@/components/ServiceContext";
import { siteConfig } from "@/config/site";
import { FlowButton } from "@/components/ui/flow-button";

/* ─────────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────────── */
interface FormState {
  name: string;
  email: string;
  businessName: string;
  message: string;
  website: string; // Honeypot
  selectedServiceId: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

type SubmitStatus = "idle" | "submitting" | "notice";

/* ─────────────────────────────────────────────────────────────
   Scroll-reveal hook — blur + fade + lift (GPU-safe)
───────────────────────────────────────────────────────────── */
function useScrollReveal() {
  const rootRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const targets = root.querySelectorAll<HTMLElement>("[data-reveal]");
    targets.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(2rem)";
      el.style.filter = "blur(4px)";
      el.style.transition =
        "opacity 0.85s cubic-bezier(0.32,0.72,0,1), transform 0.85s cubic-bezier(0.32,0.72,0,1), filter 0.85s cubic-bezier(0.32,0.72,0,1)";
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          const delay = Number(el.dataset.delay ?? 0);
          setTimeout(() => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            el.style.filter = "blur(0)";
          }, delay);
          io.unobserve(el);
        });
      },
      { threshold: 0.07 }
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return rootRef;
}

/* ─────────────────────────────────────────────────────────────
   FAQ data (page-local — teaser of 3)
───────────────────────────────────────────────────────────── */
const FAQ_TEASER = [
  {
    id: "faq-businesses",
    q: "What types of businesses do you work with?",
    a: "We work primarily with growing small to mid-sized businesses, professional service providers, and local operators who want to establish a commanding digital presence. Whether you need a full digital foundation or targeted campaign management, we tailor our scope to your current stage.",
  },
  {
    id: "faq-timeline",
    q: "How quickly can we expect results?",
    a: "Timelines vary by channel. Paid advertising and landing page overhauls can generate inquiries within weeks. Organic search and brand equity building typically require 3–6 months of steady execution to demonstrate sustainable momentum.",
  },
  {
    id: "faq-packages",
    q: "Do you offer custom packages?",
    a: "Every business has unique priorities. While we have standardised delivery frameworks for our core services, we structure engagements around your specific growth bottlenecks, team capacity, and marketing budget.",
  },
];

/* ─────────────────────────────────────────────────────────────
   What Happens Next steps
───────────────────────────────────────────────────────────── */
const NEXT_STEPS = [
  { n: "01", label: "We review your inquiry" },
  { n: "02", label: "We reach out within 24–48h" },
  { n: "03", label: "Kickoff within 3 business days" },
];

/* ─────────────────────────────────────────────────────────────
   Page component
───────────────────────────────────────────────────────────── */
export default function ContactPage() {
  const { footer, services, inquiry } = siteConfig;
  const pageRef = useScrollReveal() as React.RefObject<HTMLDivElement>;

  /* ── Form state ── */
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    businessName: "",
    message: "",
    website: "",
    selectedServiceId: services[0]?.id ?? "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [submissionNotice, setSubmissionNotice] = useState<string | null>(null);

  /* ── FAQ accordion ── */
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  /* ── Mailto URL (memoised) ── */
  const selectedServiceObj = services.find((s) => s.id === form.selectedServiceId);
  const mailtoSubject = encodeURIComponent(
    `Project Inquiry: ${form.businessName || form.name || "Prospective Client"} — ${selectedServiceObj?.title ?? "Digital Marketing"}`
  );
  const mailtoBody = encodeURIComponent(
    `Hello AR Digital Marketing,\n\nName: ${form.name}\nEmail: ${form.email}\nBusiness: ${form.businessName || "N/A"}\nService: ${selectedServiceObj?.title ?? form.selectedServiceId}\n\nProject Overview:\n${form.message}\n`
  );
  const mailtoUrl = `mailto:${footer.email}?subject=${mailtoSubject}&body=${mailtoBody}`;

  /* ── Validation ── */
  const validate = useCallback((): boolean => {
    const next: FormErrors = {};
    if (!form.name.trim()) next.name = "Please provide your name.";
    if (!form.email.trim()) {
      next.email = "Please provide your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Please enter a valid email address.";
    }
    if (!form.message.trim())
      next.message = "Please share a few details about your project or goals.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }, [form]);

  /* ── Submit handler ── */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Honeypot: silent drop
    if (form.website) return;
    if (!validate()) return;

    setSubmitStatus("submitting");
    // Simulate brief async — honest offline notice
    setTimeout(() => {
      setSubmitStatus("notice");
      setSubmissionNotice(
        "Notice: Direct database submission is currently offline. You can reach out directly via our email below with your project details."
      );
    }, 900);
  };

  /* ── Field updater ── */
  const set = <K extends keyof FormState>(key: K, val: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  return (
    <ServiceProvider>
      <div ref={pageRef} className="min-h-screen bg-warm-white">
        <Header />

        <main>
          {/* ══════════════════════════════════════════════════════════
              SECTION 1 — Page Hero (compact editorial)
          ══════════════════════════════════════════════════════════ */}
          <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div data-reveal data-delay="0" className="flex flex-col items-start gap-5">

                {/* Eyebrow pill */}
                <div className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-white px-4 py-2 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" />
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-ink">
                    Get in Touch
                  </span>
                </div>

                {/* Heading */}
                <h1 className="font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl lg:text-6xl text-balance max-w-3xl leading-[1.05]">
                  Let&apos;s make your next{" "}
                  <span className="text-brand-blue">move</span> count.
                </h1>

                {/* Sub */}
                <p className="text-base text-ink-muted leading-relaxed max-w-xl sm:text-lg">
                  {inquiry.note}
                </p>

                {/* Status chip */}
                <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-200/80 bg-emerald-50 px-4 py-2">
                  <span className="relative flex h-2 w-2 flex-shrink-0">
                    <span
                      className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-beacon"
                    />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  <span className="font-mono text-[11px] font-semibold text-emerald-700 uppercase tracking-[0.16em]">
                    Open for New Projects
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════
              SECTION 2 — Editorial Split
          ══════════════════════════════════════════════════════════ */}
          <section className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8 items-start">

                {/* ── LEFT COLUMN (sticky) — col-span-5 ── */}
                <aside className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-28">

                  {/* Contact info double-bezel card */}
                  <div
                    data-reveal
                    data-delay="60"
                    className="rounded-[2rem] p-[5px] ring-1 ring-ink/[0.06] bg-ink/[0.02]"
                  >
                    <div className="rounded-[calc(2rem-5px)] bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] ring-1 ring-ink/[0.04] px-7 py-7">
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/35 mb-5">
                        Direct Contact
                      </p>

                      {/* Email */}
                      <div className="mb-5">
                        <p className="font-display text-[11px] font-bold uppercase tracking-wider text-ink-muted mb-1.5">
                          Email
                        </p>
                        <a
                          href={`mailto:${footer.email}`}
                          className="group/em relative inline-block font-display text-base font-bold text-ink transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-brand-blue focus-visible:outline-2 focus-visible:outline-brand-blue"
                        >
                          {footer.email}
                          <span className="absolute bottom-0 left-0 h-[1.5px] w-0 rounded-full bg-brand-blue transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/em:w-full" />
                        </a>
                      </div>

                      {/* Location */}
                      <div>
                        <p className="font-display text-[11px] font-bold uppercase tracking-wider text-ink-muted mb-1.5">
                          Location
                        </p>
                        <p className="text-sm text-ink leading-relaxed">{footer.location}</p>
                      </div>
                    </div>
                  </div>

                  {/* What happens next card */}
                  <div
                    data-reveal
                    data-delay="120"
                    className="rounded-[2rem] p-[5px] ring-1 ring-ink/[0.06] bg-ink/[0.02]"
                  >
                    <div className="rounded-[calc(2rem-5px)] bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] ring-1 ring-ink/[0.04] px-7 py-7">
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/35 mb-5">
                        What Happens Next
                      </p>
                      <ol className="flex flex-col gap-0" role="list">
                        {NEXT_STEPS.map((step, i) => (
                          <li key={step.n} className="flex items-start gap-4">
                            {/* Dash connector column */}
                            <div className="flex flex-col items-center flex-shrink-0 pt-1">
                              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-blue/[0.08] ring-1 ring-brand-blue/20 font-mono text-[10px] font-bold text-brand-blue">
                                {step.n}
                              </span>
                              {i < NEXT_STEPS.length - 1 && (
                                <span className="mt-1 h-8 w-px bg-gradient-to-b from-brand-blue/20 to-transparent" />
                              )}
                            </div>
                            <p className={`text-sm text-ink leading-relaxed ${i < NEXT_STEPS.length - 1 ? "pb-5" : ""}`}>
                              {step.label}
                            </p>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  {/* Service interest pills */}
                  <div data-reveal data-delay="180">
                    <p className="font-display text-[11px] font-bold uppercase tracking-wider text-ink-muted mb-3">
                      Services We Offer
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {services.map((s) => (
                        <span
                          key={s.id}
                          className="inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-white px-3 py-1.5 font-mono text-[11px] font-medium text-ink-muted ring-0"
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full flex-shrink-0 ${s.accentColor === "blue" ? "bg-brand-blue/60" : "bg-brand-red/60"}`}
                          />
                          {s.title}
                        </span>
                      ))}
                    </div>
                  </div>
                </aside>

                {/* ── RIGHT COLUMN — col-span-7 — Main form ── */}
                <div className="lg:col-span-7">
                  <div
                    data-reveal
                    data-delay="80"
                    className="rounded-[2rem] p-[5px] ring-1 ring-ink/[0.06] bg-ink/[0.02]"
                  >
                    <div className="rounded-[calc(2rem-5px)] bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] ring-1 ring-ink/[0.04] px-7 py-9 sm:px-10 sm:py-12">

                      {/* Form header */}
                      <div className="mb-8">
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border-subtle bg-warm-white px-3 py-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" />
                          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ink">
                            Start a Conversation
                          </span>
                        </div>
                        <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                          Send us an inquiry
                        </h2>
                        <p className="mt-2 text-sm text-ink-muted leading-relaxed max-w-md">
                          Tell us what you&apos;re working on. We&apos;ll review every message and respond personally.
                        </p>
                      </div>

                      {/* Offline notice banner */}
                      {submitStatus === "notice" && submissionNotice && (
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
                                  className="inline-flex items-center gap-2 rounded-full bg-amber-900 px-4 py-2 font-display text-xs font-semibold text-white transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-amber-800"
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
                                  Or write directly to:{" "}
                                  <strong className="font-mono">{footer.email}</strong>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Form */}
                      <form onSubmit={handleSubmit} noValidate className="space-y-7">
                        {/* Honeypot */}
                        <div className="hidden" aria-hidden="true">
                          <label htmlFor="contact-website-hp">Leave this empty</label>
                          <input
                            id="contact-website-hp"
                            type="text"
                            name="website"
                            tabIndex={-1}
                            autoComplete="off"
                            value={form.website}
                            onChange={(e) => set("website", e.target.value)}
                          />
                        </div>

                        {/* Service selector */}
                        <div>
                          <label className="block font-display text-xs font-bold uppercase tracking-wider text-ink mb-3">
                            Service of Interest
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {services.map((s) => {
                              const active = form.selectedServiceId === s.id;
                              return (
                                <button
                                  key={s.id}
                                  type="button"
                                  onClick={() => set("selectedServiceId", s.id)}
                                  className={`flex items-center gap-2.5 rounded-xl border p-3 text-left transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] cursor-pointer ${
                                    active
                                      ? "border-brand-blue bg-brand-blue/[0.07] text-brand-blue ring-1 ring-brand-blue/40"
                                      : "border-border-subtle bg-warm-white/60 text-ink/75 hover:border-slate-300 hover:bg-warm-white"
                                  }`}
                                >
                                  <span
                                    className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                                      active
                                        ? "border-brand-blue bg-brand-blue"
                                        : "border-slate-300 bg-white"
                                    }`}
                                  >
                                    {active && (
                                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                                    )}
                                  </span>
                                  <span className="text-xs font-medium leading-tight">
                                    {s.title}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Name + Email row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          {/* Name */}
                          <div>
                            <label
                              htmlFor="contact-name"
                              className="block font-display text-xs font-bold uppercase tracking-wider text-ink mb-2"
                            >
                              Your Name <span className="text-brand-red">*</span>
                            </label>
                            <input
                              id="contact-name"
                              type="text"
                              required
                              aria-describedby={errors.name ? "contact-name-err" : undefined}
                              value={form.name}
                              onChange={(e) => {
                                set("name", e.target.value);
                                if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                              }}
                              placeholder="Jane Doe"
                              className={`w-full rounded-xl border bg-warm-white px-4 py-3 text-sm text-ink placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                                errors.name
                                  ? "border-brand-red ring-1 ring-brand-red"
                                  : "border-border-subtle"
                              }`}
                            />
                            {errors.name && (
                              <p id="contact-name-err" className="mt-1.5 text-xs text-brand-red">
                                {errors.name}
                              </p>
                            )}
                          </div>

                          {/* Email */}
                          <div>
                            <label
                              htmlFor="contact-email"
                              className="block font-display text-xs font-bold uppercase tracking-wider text-ink mb-2"
                            >
                              Email Address <span className="text-brand-red">*</span>
                            </label>
                            <input
                              id="contact-email"
                              type="email"
                              required
                              aria-describedby={errors.email ? "contact-email-err" : undefined}
                              value={form.email}
                              onChange={(e) => {
                                set("email", e.target.value);
                                if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                              }}
                              placeholder="jane@company.com"
                              className={`w-full rounded-xl border bg-warm-white px-4 py-3 text-sm text-ink placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                                errors.email
                                  ? "border-brand-red ring-1 ring-brand-red"
                                  : "border-border-subtle"
                              }`}
                            />
                            {errors.email && (
                              <p id="contact-email-err" className="mt-1.5 text-xs text-brand-red">
                                {errors.email}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Business name */}
                        <div>
                          <label
                            htmlFor="contact-business"
                            className="block font-display text-xs font-bold uppercase tracking-wider text-ink mb-2"
                          >
                            Business Name{" "}
                            <span className="text-slate-400 font-normal normal-case tracking-normal">
                              (Optional)
                            </span>
                          </label>
                          <input
                            id="contact-business"
                            type="text"
                            value={form.businessName}
                            onChange={(e) => set("businessName", e.target.value)}
                            placeholder="Acme Enterprises or website URL"
                            className="w-full rounded-xl border border-border-subtle bg-warm-white px-4 py-3 text-sm text-ink placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
                          />
                        </div>

                        {/* Message */}
                        <div>
                          <label
                            htmlFor="contact-message"
                            className="block font-display text-xs font-bold uppercase tracking-wider text-ink mb-2"
                          >
                            Project Details <span className="text-brand-red">*</span>
                          </label>
                          <textarea
                            id="contact-message"
                            rows={5}
                            required
                            aria-describedby={errors.message ? "contact-message-err" : undefined}
                            value={form.message}
                            onChange={(e) => {
                              set("message", e.target.value);
                              if (errors.message)
                                setErrors((prev) => ({ ...prev, message: undefined }));
                            }}
                            placeholder="Tell us about your current challenges, target audience, and what you aim to achieve…"
                            className={`w-full rounded-xl border bg-warm-white px-4 py-3 text-sm text-ink placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] resize-y ${
                              errors.message
                                ? "border-brand-red ring-1 ring-brand-red"
                                : "border-border-subtle"
                            }`}
                          />
                          {errors.message && (
                            <p id="contact-message-err" className="mt-1.5 text-xs text-brand-red">
                              {errors.message}
                            </p>
                          )}
                        </div>

                        {/* Submit row */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border-subtle">
                          {/* Button-in-Button pill */}
                          <FlowButton text="Send Message" type="submit" variant="light" disabled={submitStatus === "submitting"} />

                          <p className="text-xs text-ink-muted text-center sm:text-right">
                            Prefer direct email?{" "}
                            <a
                              href={`mailto:${footer.email}`}
                              className="font-medium text-brand-blue underline decoration-brand-blue/30 underline-offset-2 hover:decoration-brand-blue transition-all duration-300"
                            >
                              {footer.email}
                            </a>
                          </p>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════
              SECTION 3 — FAQ Teaser Strip
          ══════════════════════════════════════════════════════════ */}
          <section className="py-24 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">

              {/* Eyebrow */}
              <div data-reveal data-delay="0" className="mb-10 flex flex-col gap-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-white px-4 py-2 w-max shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-ink">
                    Common Questions
                  </span>
                </div>
                <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                  Quick answers
                </h2>
              </div>

              {/* Accordion items */}
              <div className="flex flex-col divide-y divide-border-subtle">
                {FAQ_TEASER.map((faq, i) => {
                  const isOpen = openFaq === faq.id;
                  return (
                    <div
                      key={faq.id}
                      data-reveal
                      data-delay={`${i * 80}`}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-body-${faq.id}`}
                        className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-brand-blue focus-visible:outline-2 focus-visible:outline-brand-blue rounded-lg"
                      >
                        <span className="font-display text-base font-semibold text-ink sm:text-lg leading-snug">
                          {faq.q}
                        </span>
                        {/* +/− icon */}
                        <span
                          className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-border-subtle bg-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                            isOpen ? "rotate-45 border-brand-blue/40 bg-brand-blue/[0.06]" : ""
                          }`}
                        >
                          <svg
                            className={`h-3.5 w-3.5 transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${isOpen ? "text-brand-blue" : "text-ink/50"}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2.5"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                          </svg>
                        </span>
                      </button>

                      {/* Answer — GPU-safe: opacity + transform, not height */}
                      <div
                        id={`faq-body-${faq.id}`}
                        role="region"
                        style={{
                          maxHeight: isOpen ? "20rem" : "0px",
                          overflow: "hidden",
                          transition: "max-height 0.55s cubic-bezier(0.32,0.72,0,1)",
                        }}
                      >
                        <div
                          style={{
                            opacity: isOpen ? 1 : 0,
                            transform: isOpen ? "translateY(0)" : "translateY(-6px)",
                            transition:
                              "opacity 0.45s cubic-bezier(0.32,0.72,0,1), transform 0.45s cubic-bezier(0.32,0.72,0,1)",
                          }}
                          className="pb-6"
                        >
                          <p className="text-sm text-ink-muted leading-relaxed sm:text-base">
                            {faq.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* See all FAQs link */}
              <div data-reveal data-delay="240" className="mt-10">
                <Link
                  href="/#faqs"
                  className="group inline-flex items-center gap-2.5 rounded-full border border-border-subtle bg-white px-6 py-3 text-sm font-semibold text-ink transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-brand-blue/30 hover:bg-brand-blue/[0.04] hover:text-brand-blue focus-visible:outline-2 focus-visible:outline-brand-blue shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
                >
                  <span>See all FAQs</span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink/[0.05] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:bg-brand-blue/[0.08] group-hover:translate-x-0.5">
                    <svg
                      className="h-3 w-3 text-ink/50 group-hover:text-brand-blue transition-colors duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </ServiceProvider>
  );
}
