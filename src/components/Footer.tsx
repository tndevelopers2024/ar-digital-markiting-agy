"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { MagneticButton } from "@/components/ui/magnetic-button";
import {
  ArrowUpRight,
  ArrowUp,
  Check,
  Copy,
  Mail,
  Send,
  MessageCircle,
} from "lucide-react";

/* ─── Scroll-reveal hook (IntersectionObserver, GPU-safe) ───────── */
function useScrollReveal() {
  const rootRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const targets = root.querySelectorAll<HTMLElement>("[data-reveal]");
    targets.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(1.5rem)";
      el.style.transition =
        "opacity 0.8s cubic-bezier(0.32,0.72,0,1), transform 0.8s cubic-bezier(0.32,0.72,0,1)";
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
          }, delay);
          io.unobserve(el);
        });
      },
      { threshold: 0.05 }
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return rootRef;
}

/* ─── Static Navigation & Service Data ──────────────────────────── */
const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Agency", href: "/about" },
  { label: "Services", href: "#services" },
  { label: "Methodology", href: "#process" },
  { label: "Client FAQs", href: "#faqs" },
  { label: "Start a Project", href: "/contact" },
];

const coreServices = [
  { label: "SEO & Local Search", href: "#services", badge: "High ROI" },
  { label: "Social Media Marketing", href: "#services" },
  { label: "Paid Advertising", href: "#services", badge: "Scale" },
  { label: "Branding & Graphic Design", href: "#services" },
  { label: "Website Development", href: "#services", badge: "Core" },
  { label: "Content & Video Marketing", href: "#services" },
];

const solutions = [
  { label: "Digital Strategy & Audits", href: "#services" },
  { label: "Brand Identity Systems", href: "#services" },
  { label: "Search Engine Supremacy", href: "#services" },
  { label: "Social Community Growth", href: "#services" },
  { label: "Performance Funnels", href: "#services" },
  { label: "Conversion Rate Optimization", href: "#services" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    handle: "@ardigital",
    icon: (
      <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    handle: "ar-digital",
    icon: (
      <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    handle: "ardigitalmktg",
    icon: (
      <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "https://x.com",
    handle: "@ardigital",
    icon: (
      <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.726-8.83L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

const marqueeItems = [
  "STRATEGIC POSITIONING",
  "SEARCH SUPREMACY",
  "CONVERSION ARCHITECTURE",
  "HIGH-PERFORMANCE ADS",
  "BRAND IDENTITY",
  "CONTENT VIRALITY",
  "DATA-DRIVEN ROI",
  "EXPONENTIAL REACH",
];

/* ─── Column Component with Micro-Interactions ─────────────────── */
function FooterLinkColumn({
  index,
  title,
  links,
  delay = 0,
}: {
  index: string;
  title: string;
  links: { label: string; href: string; badge?: string }[];
  delay?: number;
}) {
  return (
    <div data-reveal data-delay={delay} className="flex flex-col gap-5">
      <div className="flex items-center gap-2">
        <span className="font-mono text-[10px] font-semibold text-brand-blue tracking-wider">
          {index}
        </span>
        <span className="h-2 w-px bg-border-subtle" />
        <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-ink">
          {title}
        </h3>
      </div>
      <ul className="flex flex-col gap-2.5" role="list">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="group inline-flex items-center gap-2 text-[13px] text-ink-muted transition-all duration-300 hover:text-ink hover:translate-x-1 focus-visible:outline-2 focus-visible:outline-brand-blue rounded-sm"
            >
              <span className="h-1 w-1 rounded-full bg-transparent group-hover:bg-brand-blue transition-colors duration-200" />
              <span>{link.label}</span>
              {link.badge && (
                <span className="rounded-full bg-brand-blue/10 px-2 py-0.5 text-[9px] font-mono font-medium text-brand-blue border border-brand-blue/20">
                  {link.badge}
                </span>
              )}
              <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 text-brand-blue" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─── Main Elevated Footer Component ────────────────────────────── */
export function Footer() {
  const { footer } = siteConfig;
  const footerRef = useScrollReveal();
  const [email, setEmail] = useState("");
  const [subStatus, setSubStatus] = useState<"idle" | "ok" | "err">("idle");
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(footer.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setSubStatus("err");
      return;
    }
    setSubStatus("ok");
    setEmail("");
    setTimeout(() => setSubStatus("idle"), 4000);
  };

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      if ((window as unknown as { __lenis?: { scrollTo: (target: number, opts?: { duration?: number }) => void } }).__lenis) {
        (window as unknown as { __lenis: { scrollTo: (target: number, opts?: { duration?: number }) => void } }).__lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-warm-white border-t border-border-subtle/80 text-ink select-none-safe"
      aria-label="Site footer"
    >
      {/* ── Ambient Radial Atmosphere ────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/4 h-[34rem] w-[34rem] rounded-full bg-brand-blue/[0.07] blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 -right-20 h-80 w-80 rounded-full bg-brand-red/[0.04] blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-64 w-3/4 rounded-full bg-brand-blue/[0.05] blur-[110px]"
      />

      {/* Subtle architectural hairline */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent"
      />

      {/* ════════════════════════════════════════════════════════════
          1. HEROIC BRAND SIGNATURE & CALL TO ACTION
      ════════════════════════════════════════════════════════════ */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-16">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Eyebrow pill */}
          <div
            data-reveal
            data-delay="0"
            className="inline-flex items-center gap-2.5 rounded-full border border-border-subtle bg-white/70 dark:bg-surface/70 px-4 py-1.5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] backdrop-blur-md mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-mono text-[10px] font-bold tracking-[0.22em] uppercase text-ink">
              Agency Availability // Q4 &amp; Q1 Openings
            </span>
          </div>

          {/* Architectural Bold Typography */}
          <div data-reveal data-delay="80" className="space-y-3">
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-ink leading-[1.04] text-balance">
              Make your brand{" "}
              <span className="block text-brand-blue">
                impossible to ignore.
              </span>
            </h2>
            <p className="max-w-2xl mx-auto text-[15px] sm:text-base text-ink-muted leading-relaxed pt-2">
              We partner with ambitious leaders to engineer high-velocity digital marketing,
              authoritative search rankings, and category-defining visual brands.
            </p>
          </div>

          {/* Double-Bezel Action Command Deck */}
          <div
            data-reveal
            data-delay="160"
            className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full"
          >
            {/* Primary Action Button (Double-bezel island) */}
            <div className="rounded-full p-1 bg-ink/5 dark:bg-white/5 border border-border-subtle shadow-sm transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]">
              <MagneticButton
                as={Link}
                href="/contact"
                className="group relative inline-flex items-center gap-3 rounded-full bg-ink px-7 py-3 text-[13px] font-bold text-warm-white transition-all duration-300 hover:bg-brand-blue"
              >
                <span>Initiate Partnership</span>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </MagneticButton>
            </div>

            {/* Direct Email with Quick-Copy */}
            <div className="rounded-full p-1 bg-ink/5 dark:bg-white/5 border border-border-subtle shadow-sm">
              <div className="inline-flex items-center gap-2 rounded-full bg-white dark:bg-surface px-4 py-2 border border-border-subtle/60 text-[13px]">
                <Mail className="h-4 w-4 text-brand-blue" />
                <a
                  href={`mailto:${footer.email}`}
                  className="font-medium text-ink hover:text-brand-blue transition-colors"
                >
                  {footer.email}
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label="Copy agency email address"
                  className="ml-1 p-1 rounded-full text-ink-muted hover:text-brand-blue hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                  title="Copy email"
                >
                  {copied ? (
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* WhatsApp Direct Chat */}
            <div className="rounded-full p-1 bg-ink/5 dark:bg-white/5 border border-border-subtle shadow-sm transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]">
              <MagneticButton
                as="a"
                href="https://wa.me/91XXXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-full bg-white dark:bg-surface px-5 py-3 text-[13px] font-semibold text-ink border border-border-subtle/80 hover:border-emerald-500/40 hover:text-emerald-600 transition-all duration-300"
              >
                <MessageCircle className="h-4 w-4 text-emerald-500 transition-transform duration-300 group-hover:scale-110" />
                <span>WhatsApp Direct</span>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          2. KINETIC TICKER MARQUEE RIBBON
      ════════════════════════════════════════════════════════════ */}
      <div className="relative w-full overflow-hidden border-y border-border-subtle/70 bg-black/[0.015] dark:bg-white/[0.015] py-3.5">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-warm-white to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-warm-white to-transparent z-10" />

        <div className="flex w-max animate-marquee-left whitespace-nowrap text-[11px] font-mono font-bold uppercase tracking-[0.24em] text-ink/40">
          {[...marqueeItems, ...marqueeItems].map((item, idx) => (
            <span key={idx} className="inline-flex items-center gap-6 px-6">
              <span>{item}</span>
              <span className="text-brand-blue text-[10px]">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          3. 4-COLUMN ELEVATED DIRECTORY & DISPATCH GRID
      ════════════════════════════════════════════════════════════ */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        {/* Giant architectural watermark in background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 w-screen overflow-hidden flex items-end justify-center select-none opacity-40 dark:opacity-20"
        >
          <span
            className="select-none whitespace-nowrap font-display font-black uppercase leading-none tracking-tighter text-black/[0.035] dark:text-white/[0.04]"
            style={{ fontSize: "clamp(4.5rem, 15vw, 19rem)", lineHeight: 0.8 }}
          >
            AR MARKETING
          </span>
        </div>

        <div className="relative grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12">
          {/* Column 1: Navigation (3 cols) */}
          <div className="lg:col-span-3">
            <FooterLinkColumn
              index="01"
              title="Navigation"
              links={navLinks}
              delay={0}
            />
          </div>

          {/* Column 2: Core Services (3 cols) */}
          <div className="lg:col-span-3">
            <FooterLinkColumn
              index="02"
              title="Core Services"
              links={coreServices}
              delay={80}
            />
          </div>

          {/* Column 3: Solutions (3 cols) */}
          <div className="lg:col-span-3">
            <FooterLinkColumn
              index="03"
              title="Growth Solutions"
              links={solutions}
              delay={140}
            />
          </div>

          {/* Column 4: Agency Dispatch & Connect (3 cols) */}
          <div data-reveal data-delay={200} className="lg:col-span-3 flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] font-semibold text-brand-red tracking-wider">
                04
              </span>
              <span className="h-2 w-px bg-border-subtle" />
              <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-ink">
                Agency Dispatch
              </h3>
            </div>

            <p className="text-[13px] text-ink-muted leading-relaxed">
              Quarterly intelligence briefs on algorithmic search shifts, paid performance, and digital branding.
            </p>

            {/* Newsletter Subscription with double-bezel concentric curves */}
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <div className="rounded-2xl p-1 bg-black/5 dark:bg-white/5 border border-border-subtle shadow-sm">
                <div className="flex items-center rounded-xl bg-white dark:bg-surface overflow-hidden border border-border-subtle/60 pl-3 pr-1 py-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter business email…"
                    required
                    className="flex-1 min-w-0 bg-transparent text-[13px] text-ink placeholder:text-ink-muted/50 outline-none"
                  />
                  <MagneticButton
                    as="button"
                    type="submit"
                    aria-label="Subscribe to newsletter"
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-brand-blue text-white transition-all duration-300 hover:bg-brand-blue-hover active:scale-95 focus-visible:outline-2 focus-visible:outline-brand-blue"
                  >
                    <Send className="h-3.5 w-3.5" />
                  </MagneticButton>
                </div>
              </div>

              {subStatus === "ok" && (
                <p className="text-[11px] font-mono text-emerald-600 flex items-center gap-1.5 pt-1">
                  <Check className="h-3 w-3" /> Subscribed to Agency Dispatch.
                </p>
              )}
              {subStatus === "err" && (
                <p className="text-[11px] font-mono text-brand-red pt-1">
                  Please enter a valid work email.
                </p>
              )}
            </form>

            {/* Follow Us / Social Matrix */}
            <div className="space-y-3 pt-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
                Official Channels
              </p>
              <div className="grid grid-cols-2 gap-2">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="group inline-flex items-center justify-between rounded-xl border border-border-subtle bg-white dark:bg-surface px-3 py-2 text-[12px] text-ink-muted transition-all duration-200 hover:border-brand-blue/30 hover:bg-brand-blue/[0.03] hover:text-brand-blue shadow-sm"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-ink group-hover:text-brand-blue transition-colors">
                        {s.icon}
                      </span>
                      <span className="font-medium text-[11px]">{s.label}</span>
                    </span>
                    <ArrowUpRight className="h-3 w-3 opacity-40 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          4. EXECUTIVE BOTTOM BAR
      ════════════════════════════════════════════════════════════ */}
      <div className="relative border-t border-border-subtle/80 bg-white/40 dark:bg-surface/40 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div
            data-reveal
            data-delay="60"
            className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6"
          >
            {/* Left: Brand Identity & Copyright */}
            <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-4 text-center sm:text-left">
              <Link
                href="/"
                aria-label="AR Digital Marketing home"
                className="inline-flex items-center gap-2.5 text-ink hover:opacity-80 transition-opacity shrink-0"
              >
                <div className="relative flex h-5 w-9 shrink-0 items-center justify-center">
                  <Image
                    src="/logo/ar-mark.svg"
                    alt="AR Digital Marketing mark"
                    width={36}
                    height={20}
                    className="h-full w-auto object-contain"
                  />
                </div>
                <span className="font-display text-xs font-black tracking-tight whitespace-nowrap text-ink">
                  AR <span className="text-brand-blue">MARKETING</span>
                </span>
              </Link>
              <span className="text-border-subtle hidden sm:inline select-none shrink-0" aria-hidden="true">
                |
              </span>
              <p className="font-mono text-[10px] sm:text-[11px] text-ink-muted tracking-wide text-balance text-center sm:text-left">
                © {footer.copyrightYear ?? new Date().getFullYear()} AR DIGITAL MARKETING. ALL RIGHTS RESERVED.
              </p>
            </div>

            {/* Right: Legal & Back To Top */}
            <div className="flex items-center justify-center gap-4 sm:gap-5 shrink-0">
              <div className="flex items-center gap-3 font-mono text-[11px] text-ink-muted">
                <Link
                  href="/privacy"
                  className="hover:text-brand-blue transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-brand-blue"
                >
                  Privacy Policy
                </Link>
                <span aria-hidden="true" className="text-border-subtle">·</span>
                <Link
                  href="/terms"
                  className="hover:text-brand-blue transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-brand-blue"
                >
                  Terms of Service
                </Link>
              </div>

              {/* Scroll to top button */}
              <MagneticButton
                as="button"
                onClick={scrollToTop}
                aria-label="Scroll back to top of page"
                className="group flex h-8 w-8 items-center justify-center rounded-full border border-border-subtle bg-white dark:bg-surface text-ink-muted hover:text-brand-blue hover:border-brand-blue/30 shadow-sm transition-all duration-200 cursor-pointer"
              >
                <ArrowUp className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
