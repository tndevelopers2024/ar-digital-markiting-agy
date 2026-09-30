"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@/config/site";
import { FlowButton } from "@/components/ui/flow-button";

/* ─────────────────────────────────────────────────────────────
   Scroll-reveal hook — blur + fade + lift via IntersectionObserver
   GPU-safe: only animates transform + opacity + filter
───────────────────────────────────────────────────────────── */
function useScrollReveal() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const targets = root.querySelectorAll<HTMLElement>("[data-reveal]");
    targets.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(2rem)";
      el.style.filter = "blur(3px)";
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
   Value Pillar data (Mission / Values Strip)
───────────────────────────────────────────────────────────── */
const valuePillars = [
  {
    id: "strategy-first",
    label: "Strategy First",
    description:
      "We align every tactic to your market position and revenue goals before a single campaign goes live.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
      />
    ),
    accent: "blue" as const,
  },
  {
    id: "measurable-results",
    label: "Measurable Results",
    description:
      "Real business metrics — qualified inquiries, conversion rates, and pipeline growth — not vanity numbers.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
      />
    ),
    accent: "red" as const,
  },
  {
    id: "no-lock-in",
    label: "No Lock-in",
    description:
      "Transparent agreements you can exit anytime. We earn your continued partnership through consistent results.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
      />
    ),
    accent: "blue" as const,
  },
] as const;

/* ─────────────────────────────────────────────────────────────
   About Page Component
───────────────────────────────────────────────────────────── */
export default function AboutPage() {
  const pageRef = useScrollReveal();
  const { about, services } = siteConfig;

  return (
    <div ref={pageRef} className="min-h-screen bg-warm-white overflow-x-hidden">
      <Header />

      {/* ══════════════════════════════════════════════════════════
          § 1 — PAGE HERO
          Fullscreen editorial entry with ambient radial glow
      ══════════════════════════════════════════════════════════ */}
      <section
        aria-label="About hero"
        className="relative flex min-h-[70dvh] flex-col items-center justify-center overflow-hidden px-4 py-28 sm:px-6 lg:px-8"
      >
        {/* Ambient radial glow — fixed, pointer-events-none, GPU-safe */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div
            className="absolute left-[10%] top-[10%] h-[32rem] w-[32rem] rounded-full bg-brand-blue/10 blur-[120px]"
            style={{ transform: "translateZ(0)" }}
          />
          <div
            className="absolute right-[8%] bottom-[5%] h-[24rem] w-[24rem] rounded-full bg-brand-red/8 blur-[96px]"
            style={{ transform: "translateZ(0)" }}
          />
        </div>

        {/* Inner content column */}
        <div className="mx-auto w-full max-w-5xl text-center">
          {/* Eyebrow pill */}
          <div
            data-reveal
            data-delay="0"
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-ink/[0.08] bg-ink/[0.03] px-4 py-2"
          >
            <span
              className="h-1.5 w-1.5 rounded-full bg-brand-blue animate-beacon"
              aria-hidden="true"
            />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/50">
              Who We Are
            </span>
          </div>

          {/* Giant headline */}
          <h1
            data-reveal
            data-delay="80"
            className="font-display text-5xl font-extrabold leading-[1.04] tracking-tight text-ink text-balance sm:text-6xl lg:text-7xl xl:text-8xl"
          >
            Good marketing starts with{" "}
            <span className="text-brand-blue">understanding</span> your
            business.
          </h1>

          {/* Lead paragraph */}
          <p
            data-reveal
            data-delay="160"
            className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg"
          >
            {about.leadParagraph}
          </p>

          {/* Button-in-Button CTA */}
          <div data-reveal data-delay="240" className="mt-10 flex justify-center">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 rounded-full bg-brand-blue pl-7 pr-2 py-2.5 text-sm font-semibold text-white ring-1 ring-white/10 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-brand-blue-hover active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-brand-blue"
            >
              Start a Conversation
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
                <svg
                  className="h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 17L17 7M17 7H7M17 7v10"
                  />
                </svg>
              </span>
            </Link>
          </div>
        </div>

        {/* Bottom hairline fade */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-warm-white to-transparent"
        />
      </section>

      {/* ══════════════════════════════════════════════════════════
          § 2 — MISSION / VALUES STRIP
          Intro text + 3 Double-Bezel pillar cards
      ══════════════════════════════════════════════════════════ */}
      <section
        aria-label="Mission and values"
        className="relative px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          {/* Intro text */}
          <div
            data-reveal
            data-delay="0"
            className="mb-16 max-w-2xl"
          >
            <p className="font-display text-xl font-medium leading-relaxed text-ink-muted sm:text-2xl">
              {about.secondaryParagraph}
            </p>
          </div>

          {/* 3 value pillar cards — horizontal scroll on mobile, 3-col on desktop */}
          <div className="flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:pb-0 snap-x snap-mandatory md:snap-none">
            {valuePillars.map((pillar, i) => (
              /* Double-Bezel card */
              <div
                key={pillar.id}
                data-reveal
                data-delay={`${i * 100}`}
                className="min-w-[80vw] snap-start sm:min-w-[60vw] md:min-w-0 flex-shrink-0 md:flex-shrink rounded-[2rem] p-[5px] ring-1 ring-ink/[0.06] bg-ink/[0.02]"
              >
                <div className="flex h-full flex-col gap-5 rounded-[calc(2rem-5px)] bg-white px-7 py-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                  {/* Icon */}
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl ring-1 ${
                      pillar.accent === "blue"
                        ? "bg-brand-blue/8 ring-brand-blue/20"
                        : "bg-brand-red/8 ring-brand-red/20"
                    }`}
                  >
                    <svg
                      className={`h-5 w-5 ${
                        pillar.accent === "blue"
                          ? "text-brand-blue"
                          : "text-brand-red"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    >
                      {pillar.icon}
                    </svg>
                  </span>

                  {/* Label */}
                  <h3 className="font-display text-xl font-bold tracking-tight text-ink">
                    {pillar.label}
                  </h3>

                  {/* Description */}
                  <p className="text-sm leading-relaxed text-ink-muted">
                    {pillar.description}
                  </p>

                  {/* Accent rule */}
                  <div
                    className={`mt-auto h-[3px] w-10 rounded-full ${
                      pillar.accent === "blue" ? "bg-brand-blue/30" : "bg-brand-red/30"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          § 3 — PRINCIPLES — Full Editorial Layout
          Left sticky label + right numbered Double-Bezel rows
      ══════════════════════════════════════════════════════════ */}
      <section
        aria-label="Our principles"
        className="relative border-t border-border-subtle/60 px-4 py-24 sm:px-6 sm:py-36 lg:px-8"
      >
        {/* Subtle bg texture */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_40%_at_50%_100%,rgba(40,88,165,0.04),transparent)]"
        />

        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-10">

            {/* LEFT — sticky label col */}
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28 flex flex-col gap-6">
                {/* Eyebrow */}
                <span className="inline-flex w-max rounded-full bg-ink/[0.04] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40 ring-1 ring-ink/[0.07]">
                  Our Principles
                </span>

                <h2
                  data-reveal
                  data-delay="0"
                  className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-5xl"
                >
                  How we show up{" "}
                  <span className="text-brand-blue">every day.</span>
                </h2>

                <p
                  data-reveal
                  data-delay="80"
                  className="text-sm leading-relaxed text-ink-muted sm:text-base"
                >
                  Three commitments that guide every project, campaign, and client relationship we take on.
                </p>
              </div>
            </div>

            {/* RIGHT — principle rows */}
            <div className="lg:col-span-8 flex flex-col gap-5">
              {about.principles.map((principle, i) => (
                /* Double-Bezel card row */
                <div
                  key={principle.number}
                  data-reveal
                  data-delay={`${i * 120}`}
                  className="group rounded-[2rem] p-[5px] ring-1 ring-ink/[0.06] bg-ink/[0.02] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:ring-brand-blue/20 hover:bg-brand-blue/[0.015]"
                >
                  <div className="flex flex-col gap-4 rounded-[calc(2rem-5px)] bg-white px-8 py-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] sm:flex-row sm:items-start sm:gap-8">
                    {/* Number */}
                    <span className="font-display text-5xl font-extrabold tracking-tight text-ink/10 transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:text-brand-blue/40 sm:text-6xl flex-shrink-0">
                      {principle.number}
                    </span>
                    {/* Content */}
                    <div className="flex flex-col gap-2.5">
                      <h3 className="font-display text-lg font-bold tracking-tight text-ink sm:text-xl">
                        {principle.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-ink-muted sm:text-base">
                        {principle.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          § 4 — SERVICES SNAPSHOT — Asymmetric Bento
          2-col mobile / 3-col desktop with Double-Bezel cards
      ══════════════════════════════════════════════════════════ */}
      <section
        aria-label="Our capabilities"
        className="relative border-t border-border-subtle/60 px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">

          {/* Section header */}
          <div className="mb-14 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-3">
              <span className="inline-flex w-max rounded-full bg-ink/[0.04] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40 ring-1 ring-ink/[0.07]">
                Our Capabilities
              </span>
              <h2
                data-reveal
                data-delay="0"
                className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-5xl"
              >
                Six ways we help you{" "}
                <span className="text-brand-blue">grow.</span>
              </h2>
            </div>
            <p
              data-reveal
              data-delay="80"
              className="max-w-sm text-sm leading-relaxed text-ink-muted sm:text-right"
            >
              Each service is built to connect directly to a business outcome — not just activity.
            </p>
          </div>

          {/* Bento grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              /* Double-Bezel service card */
              <div
                key={service.id}
                data-reveal
                data-delay={`${(i % 3) * 80}`}
                className={`group rounded-[2rem] p-[5px] ring-1 ring-ink/[0.06] bg-ink/[0.02] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:ring-${service.accentColor === "blue" ? "brand-blue" : "brand-red"}/25 ${
                  /* Make first card span 2 cols on lg for asymmetry */
                  i === 0 ? "sm:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div className="flex h-full flex-col gap-5 rounded-[calc(2rem-5px)] bg-white px-7 py-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                  {/* Number pill */}
                  <span
                    className={`inline-flex w-max rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] ${
                      service.accentColor === "blue"
                        ? "bg-brand-blue/8 text-brand-blue ring-1 ring-brand-blue/20"
                        : "bg-brand-red/8 text-brand-red ring-1 ring-brand-red/20"
                    }`}
                  >
                    {service.number}
                  </span>

                  {/* Title */}
                  <h3 className="font-display text-lg font-bold leading-tight tracking-tight text-ink transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:text-brand-blue">
                    {service.title}
                  </h3>

                  {/* Tagline */}
                  <p className="text-sm leading-relaxed text-ink-muted">
                    {service.tagline}
                  </p>

                  {/* Hover accent bar */}
                  <div
                    className={`mt-auto h-[2px] w-0 rounded-full transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:w-10 ${
                      service.accentColor === "blue" ? "bg-brand-blue" : "bg-brand-red"
                    }`}
                    aria-hidden="true"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          § 5 — DARK CTA BAND
          bg-ink section with ambient orbs + Button-in-Button CTA
      ══════════════════════════════════════════════════════════ */}
      <section
        aria-label="Work with us"
        className="relative overflow-hidden bg-ink px-4 py-28 sm:px-6 sm:py-36 lg:px-8"
      >
        {/* Ambient orbs — GPU-safe transform only */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div
            className="absolute -top-40 -left-40 h-[30rem] w-[30rem] rounded-full bg-brand-blue/20 blur-[100px]"
            style={{ transform: "translateZ(0)" }}
          />
          <div
            className="absolute top-0 right-0 h-64 w-64 rounded-full bg-brand-red/15 blur-[80px]"
            style={{ transform: "translateZ(0)" }}
          />
          <div
            className="absolute bottom-0 left-1/2 h-48 w-[55%] -translate-x-1/2 rounded-full bg-brand-blue/10 blur-[64px]"
            style={{ transform: "translateZ(0)" }}
          />
        </div>

        {/* Top hairline */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />

        {/* Content */}
        <div className="relative mx-auto max-w-4xl text-center">
          {/* Eyebrow */}
          <div
            data-reveal
            data-delay="0"
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2"
          >
            <span
              className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-beacon"
              aria-hidden="true"
            />
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">
              Open for New Projects — 2026
            </span>
          </div>

          {/* Heading */}
          <h2
            data-reveal
            data-delay="80"
            className="font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-white text-balance sm:text-5xl lg:text-6xl"
          >
            Ready to work with a team that&apos;s as{" "}
            <span className="text-brand-blue">invested in your growth</span> as
            you are?
          </h2>

          {/* CTA */}
          <div
            data-reveal
            data-delay="160"
            className="mt-12 flex flex-wrap items-center justify-center gap-4"
          >
            {/* Primary — Button-in-Button */}
            <FlowButton text="Start a Conversation" href="/contact" variant="dark" />

            {/* Ghost secondary */}
            <a
              href={`mailto:${siteConfig.footer.email}`}
              className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white/70 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-white/40 hover:text-white focus-visible:outline-2 focus-visible:outline-white"
            >
              {siteConfig.footer.email}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
