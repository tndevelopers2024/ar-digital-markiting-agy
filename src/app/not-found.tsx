"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ServiceProvider } from "@/components/ServiceContext";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { siteConfig } from "@/config/site";
import {
  ArrowUpRight,
  Compass,
  Home,
  Layers,
  Search,
  Sparkles,
  Users,
  HelpCircle,
  Mail,
  RotateCcw,
} from "lucide-react";

/* ── Quick Navigation Destinations ── */
const WAYPOINTS = [
  {
    number: "01",
    title: "Capabilities & Services",
    tagline: "SEO, Performance Ads, Brand & Web Development",
    href: "/#services",
    icon: Layers,
    badge: "Core Offerings",
    accent: "blue" as const,
  },
  {
    number: "02",
    title: "Methodology & Process",
    tagline: "4-step framework from audit to measurable ROI",
    href: "/#process",
    icon: Compass,
    badge: "Framework",
    accent: "red" as const,
  },
  {
    number: "03",
    title: "Client Roster & Proof",
    tagline: "Ambitious brands that achieve momentum with us",
    href: "/#clients",
    icon: Users,
    badge: "Case Studies",
    accent: "blue" as const,
  },
  {
    number: "04",
    title: "Common Questions",
    tagline: "Clear answers on timelines, pricing & scopes",
    href: "/#faqs",
    icon: HelpCircle,
    badge: "FAQ",
    accent: "red" as const,
  },
];

export default function NotFound() {
  const router = useRouter();
  const pathname = usePathname();

  const handleGoBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <ServiceProvider>
      <title>404: Page Not Found | AR Digital Marketing</title>
      <meta
        name="description"
        content="The page you are looking for does not exist or has been relocated. Explore AR Digital Marketing services or return home."
      />

      <div className="flex min-h-screen flex-col bg-warm-white text-ink antialiased selection:bg-brand-blue selection:text-white">
        <Header />

        <main className="relative flex-1">
          {/* ══════════════════════════════════════════════════════════
              § 1 — HERO SECTION: EDITORIAL MINIMALIST 404
              Zero tacky gradients: solid architectural typography,
              crisp hairline geometry, and refined editorial spacing.
          ══════════════════════════════════════════════════════════ */}
          <section
            aria-label="404 Error Announcement"
            className="relative px-4 pt-16 pb-16 sm:px-6 sm:pt-24 lg:px-8 border-b border-border-subtle"
          >
            <div className="mx-auto max-w-5xl text-center">
              {/* Eyebrow Status Pill (Solid, crisp borders) */}
              <div className="inline-flex items-center gap-2.5 rounded-full border border-border-subtle bg-white dark:bg-surface px-4 py-2 shadow-xs mb-8">
                <span className="relative flex h-2 w-2 flex-shrink-0">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75 animate-beacon" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-red" />
                </span>
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-brand-red">
                  HTTP 404 // Signal Lost in Digital Space
                </span>
              </div>

              {/* Sculpted Architectural 404 Monument (Crisp solid typography & hairline crosshairs) */}
              <div className="relative my-6 flex items-center justify-center select-none">
                {/* Clean geometric hairline reticle — zero gradient, zero blur */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute h-64 w-64 sm:h-80 sm:w-80 md:h-96 md:w-96 rounded-full border border-border-subtle dark:border-border-subtle"
                >
                  <div className="absolute inset-6 rounded-full border border-dashed border-ink/10 dark:border-white/10" />
                  <div className="absolute inset-16 rounded-full border border-border-subtle" />
                  {/* Subtle hairline crosshairs */}
                  <div className="absolute top-0 bottom-0 left-1/2 w-px bg-border-subtle -translate-x-1/2" />
                  <div className="absolute left-0 right-0 top-1/2 h-px bg-border-subtle -translate-y-1/2" />
                </div>

                {/* Giant 404 Text — 100% Solid Ink */}
                <span
                  data-testid="status-404-number"
                  className="relative z-10 font-display text-8xl sm:text-[11rem] md:text-[13rem] lg:text-[15rem] font-black tracking-tighter leading-none text-ink dark:text-white"
                >
                  404
                </span>

                {/* Center radar status indicator inside "0" */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute z-20 flex flex-col items-center justify-center"
                >
                  <span className="h-3 w-3 rounded-full bg-brand-blue" />
                  <span className="mt-1 font-mono text-[9px] font-bold uppercase tracking-widest text-ink-muted">
                    Uncharted
                  </span>
                </div>
              </div>

              {/* Main Headline — Solid, High-End Editorial */}
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-ink dark:text-white text-balance leading-[1.08] mt-4">
                The page you are looking for{" "}
                <span className="text-brand-blue">
                  does not exist.
                </span>
              </h1>

              {/* Narrative Copy */}
              <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-ink-muted leading-relaxed">
                Even high-performance search architectures encounter an uncharted coordinate.
                The URL you requested may have been relocated, updated during our architectural
                evolution, or never indexed. Let&apos;s get you back on track.
              </p>

              {/* Diagnostic Path Indicator — Flat pill */}
              <div className="mt-6 inline-flex items-center gap-2 rounded-xl border border-border-subtle bg-white dark:bg-surface px-3.5 py-1.5 font-mono text-xs text-ink-muted shadow-xs">
                <span className="text-brand-red font-semibold">ROUTE:</span>
                <code className="text-ink dark:text-white font-semibold truncate max-w-[280px] sm:max-w-md">
                  {pathname || "/unresolved-route"}
                </code>
              </div>

              {/* ── PRIORITY CALLS TO ACTION (Solid buttons) ── */}
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                {/* Primary CTA: Return to Homepage */}
                <div className="rounded-full p-1 bg-ink/5 dark:bg-white/5 border border-border-subtle shadow-sm transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]">
                  <MagneticButton
                    as={Link}
                    href="/"
                    aria-label="Return to Homepage"
                    className="group inline-flex items-center gap-2.5 rounded-full bg-ink dark:bg-white px-7 py-3 text-sm font-bold text-warm-white dark:text-ink transition-colors duration-200 hover:bg-brand-blue dark:hover:bg-brand-blue dark:hover:text-white shadow-xs"
                  >
                    <Home className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
                    <span>Return to Homepage</span>
                  </MagneticButton>
                </div>

                {/* Secondary CTA: Explore Capabilities */}
                <div className="rounded-full p-1 bg-ink/5 dark:bg-white/5 border border-border-subtle shadow-sm transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]">
                  <MagneticButton
                    as={Link}
                    href="/#services"
                    aria-label="Explore Capabilities"
                    className="group inline-flex items-center gap-2 rounded-full bg-white dark:bg-surface px-6 py-3 text-sm font-semibold text-ink dark:text-white border border-border-subtle hover:border-brand-blue hover:text-brand-blue transition-colors duration-200 shadow-xs"
                  >
                    <Compass className="h-4 w-4 text-brand-blue transition-transform duration-200 group-hover:rotate-45" />
                    <span>Explore Capabilities</span>
                  </MagneticButton>
                </div>

                {/* Tertiary CTA: Book Consultation */}
                <div className="rounded-full p-1 bg-ink/5 dark:bg-white/5 border border-border-subtle shadow-sm transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]">
                  <MagneticButton
                    as={Link}
                    href="/contact"
                    aria-label="Book Consultation"
                    className="group inline-flex items-center gap-2 rounded-full bg-white dark:bg-surface px-6 py-3 text-sm font-semibold text-ink dark:text-white border border-border-subtle hover:border-brand-red hover:text-brand-red transition-colors duration-200 shadow-xs"
                  >
                    <Sparkles className="h-4 w-4 text-brand-red transition-transform duration-200 group-hover:scale-110" />
                    <span>Book Consultation</span>
                  </MagneticButton>
                </div>

                {/* Back button */}
                <button
                  type="button"
                  onClick={handleGoBack}
                  aria-label="Go back to previous page"
                  className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-white dark:bg-surface px-5 py-3 text-sm font-medium text-ink-muted hover:text-ink dark:hover:text-white transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-brand-blue"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Go Back</span>
                </button>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════
              § 2 — STRATEGIC WAYPOINTS (Double-Bezel Grid)
              Provides rapid navigation to core sections of the agency
          ══════════════════════════════════════════════════════════ */}
          <section
            aria-label="Quick Navigation Waypoints"
            className="relative px-4 py-20 sm:px-6 sm:py-24 lg:px-8 border-b border-border-subtle"
          >
            <div className="mx-auto max-w-7xl">
              {/* Section Header */}
              <div className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div className="flex flex-col gap-3">
                  <div className="inline-flex w-max items-center gap-2 rounded-full bg-white dark:bg-surface px-3.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted border border-border-subtle">
                    <Search className="h-3 w-3 text-brand-blue" />
                    <span>Navigational Waypoints</span>
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-ink dark:text-white">
                    Where would you like to go next?
                  </h2>
                </div>
                <p className="max-w-md text-sm leading-relaxed text-ink-muted sm:text-right">
                  Jump directly to our full capability suite, client proof, methodology, or contact our strategists.
                </p>
              </div>

              {/* Double-Bezel Card Grid — Flat, Crisp & High-Contrast */}
              <nav aria-label="Waypoints Grid" className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {WAYPOINTS.map((wp) => {
                  const Icon = wp.icon;
                  const isBlue = wp.accent === "blue";
                  return (
                    <Link
                      key={wp.number}
                      href={wp.href}
                      className="group rounded-[2rem] p-[5px] ring-1 ring-border-subtle bg-white/50 dark:bg-surface/50 transition-all duration-300 ease-out hover:ring-brand-blue hover:scale-[1.01] focus-visible:outline-2 focus-visible:outline-brand-blue"
                    >
                      <div className="flex h-full flex-col justify-between rounded-[calc(2rem-5px)] bg-white dark:bg-surface px-6 py-6 transition-colors duration-200">
                        <div>
                          {/* Top Row: Number & Badge */}
                          <div className="flex items-center justify-between gap-2 mb-4">
                            <span className="font-mono text-xs font-bold text-ink/30 dark:text-white/30">
                              {wp.number}
                            </span>
                            <span
                              className={`rounded-full px-2.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider ${
                                isBlue
                                  ? "bg-brand-blue/10 text-brand-blue border border-brand-blue/20"
                                  : "bg-brand-red/10 text-brand-red border border-brand-red/20"
                              }`}
                            >
                              {wp.badge}
                            </span>
                          </div>

                          {/* Icon */}
                          <div
                            className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl border transition-transform duration-200 group-hover:scale-105 ${
                              isBlue
                                ? "bg-brand-blue/10 text-brand-blue border-brand-blue/20"
                                : "bg-brand-red/10 text-brand-red border-brand-red/20"
                            }`}
                          >
                            <Icon className="h-5 w-5" />
                          </div>

                          {/* Title */}
                          <h3 className="font-display text-lg font-bold tracking-tight text-ink dark:text-white group-hover:text-brand-blue transition-colors duration-200">
                            {wp.title}
                          </h3>

                          {/* Tagline */}
                          <p className="mt-2 text-xs sm:text-sm text-ink-muted leading-relaxed">
                            {wp.tagline}
                          </p>
                        </div>

                        {/* Arrow Link footer */}
                        <div className="mt-6 flex items-center justify-between pt-4 border-t border-border-subtle">
                          <span className="font-mono text-[11px] font-semibold text-ink-muted group-hover:text-ink dark:group-hover:text-white transition-colors">
                            Explore Destination
                          </span>
                          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-warm-white dark:bg-surface text-ink dark:text-white group-hover:bg-brand-blue group-hover:text-white transition-colors duration-200 border border-border-subtle">
                            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════
              § 3 — CONCIERGE ASSISTANCE STRIP (AGENCY HUD)
          ══════════════════════════════════════════════════════════ */}
          <section
            aria-label="Direct Assistance"
            className="bg-warm-white px-4 py-12 sm:px-6 lg:px-8"
          >
            <div className="mx-auto max-w-4xl rounded-2xl border border-border-subtle bg-white dark:bg-surface p-6 sm:p-8 shadow-xs">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-brand-blue/10 text-brand-blue border border-brand-blue/20">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-ink dark:text-white">
                      Can&apos;t find what you need?
                    </h3>
                    <p className="text-xs sm:text-sm text-ink-muted mt-0.5">
                      Send our strategy director a direct note and we&apos;ll assist you immediately.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={`mailto:${siteConfig.footer.email}`}
                    className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-5 py-2.5 text-xs font-semibold text-white transition-colors duration-200 hover:bg-brand-blue-hover shadow-xs focus-visible:outline-2 focus-visible:outline-brand-blue"
                  >
                    <span>Email Direct</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-white dark:bg-surface px-5 py-2.5 text-xs font-semibold text-ink dark:text-white transition-colors duration-200 hover:border-brand-blue hover:text-brand-blue shadow-xs focus-visible:outline-2 focus-visible:outline-brand-blue"
                  >
                    <span>Contact Studio</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </ServiceProvider>
  );
}
