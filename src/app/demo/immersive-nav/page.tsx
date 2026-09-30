"use client";

import { useState } from "react";
import Link from "next/link";
import ImmersiveFullscreenNav from "@/components/ui/immersive-full-screen-nav";

const THEMES = [
  { name: "Obsidian Slate", color: "#0a0f1d", label: "Brand Midnight" },
  { name: "Electric Blue", color: "#1351d8", label: "AR Blue" },
  { name: "Sunset Orange", color: "#ff5f00", label: "Hyperiux Signature" },
  { name: "Deep Charcoal", color: "#111827", label: "Minimal Dark" },
];

const CLIP_ORIGINS: ("bottom" | "top" | "left" | "right")[] = [
  "bottom",
  "top",
  "left",
  "right",
];

export default function ImmersiveNavDemoPage() {
  const [selectedTheme, setSelectedTheme] = useState(THEMES[0].color);
  const [selectedOrigin, setSelectedOrigin] = useState<"bottom" | "top" | "left" | "right">("bottom");
  const [openDuration, setOpenDuration] = useState(1.1);

  return (
    <div className="relative min-h-screen bg-warm-white text-ink selection:bg-brand-blue selection:text-white">
      {/* Immersive Full Screen Nav Overlay & Toggle Header */}
      <ImmersiveFullscreenNav
        clipOrigin={selectedOrigin}
        overlayBg={selectedTheme}
        openDuration={openDuration}
        closeDuration={openDuration}
        navConfig={{
          brand: "AR MARKETING",
          brandHref: "/",
          overlayBg: selectedTheme,
          clipOrigin: selectedOrigin,
        }}
        navContent={{
          agencyName: "AR DIGITAL MARKETING",
          tagline: "Strategic Growth & Digital Performance",
          location: "Global / Remote",
          links: [
            { label: "Home", href: "/" },
            { label: "Services", href: "/#services" },
            { label: "Work", href: "/#clients" },
            { label: "About", href: "/about" },
            { label: "Contact", href: "/contact" },
          ],
          images: [
            "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80",
          ],
          socials: [
            { type: "instagram", href: "https://instagram.com" },
            { type: "facebook", href: "https://facebook.com" },
            { type: "twitter", href: "https://twitter.com" },
            { type: "linkedin", href: "https://linkedin.com" },
          ],
        }}
      />

      {/* Main Interactive Demo Showcase Content */}
      <div className="mx-auto max-w-5xl px-6 pt-32 pb-24">
        {/* Breadcrumb / Return */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono font-medium uppercase tracking-wider text-slate-muted hover:text-brand-blue transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Back to Homepage
          </Link>
          <span className="rounded-full border border-brand-blue/30 bg-brand-blue/10 px-3 py-1 text-[11px] font-mono font-semibold uppercase tracking-wider text-brand-blue">
            Component Showcase
          </span>
        </div>

        {/* Hero Title */}
        <div className="mb-12 text-center sm:text-left">
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Immersive Full Screen Navigation
          </h1>
          <p className="mt-4 max-w-2xl text-base text-slate-muted sm:text-lg">
            High-performance, GSAP clip-path navigation overlay with keyboard focus trap, reduced motion fallbacks, and dynamic photography gallery cards.
          </p>
          <div className="mt-4 flex items-center gap-2 text-sm font-medium text-brand-blue">
            <span>✨ Click the circular hamburger icon in the top right to test the live transition.</span>
          </div>
        </div>

        {/* Interactive Control Panel */}
        <div className="grid gap-6 rounded-2xl border border-border-subtle bg-white p-6 shadow-sm sm:grid-cols-3 sm:p-8">
          {/* Origin Selector */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-muted mb-3 font-semibold">
              Clip Reveal Origin
            </label>
            <div className="grid grid-cols-2 gap-2">
              {CLIP_ORIGINS.map((origin) => (
                <button
                  key={origin}
                  type="button"
                  onClick={() => setSelectedOrigin(origin)}
                  className={`rounded-lg border px-3 py-2 text-xs font-semibold capitalize transition-all ${
                    selectedOrigin === origin
                      ? "border-brand-blue bg-brand-blue text-white shadow-sm"
                      : "border-border-subtle bg-warm-white text-ink hover:border-slate-300"
                  }`}
                >
                  {origin}
                </button>
              ))}
            </div>
          </div>

          {/* Theme Palette */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-muted mb-3 font-semibold">
              Overlay Palette
            </label>
            <div className="flex flex-col gap-2">
              {THEMES.map((theme) => (
                <button
                  key={theme.color}
                  type="button"
                  onClick={() => setSelectedTheme(theme.color)}
                  className={`flex items-center justify-between rounded-lg border px-3 py-2 text-xs font-medium transition-all ${
                    selectedTheme === theme.color
                      ? "border-brand-blue bg-brand-blue/5 text-brand-blue ring-1 ring-brand-blue"
                      : "border-border-subtle bg-warm-white text-ink hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="h-3.5 w-3.5 rounded-full border border-black/10"
                      style={{ backgroundColor: theme.color }}
                    />
                    <span>{theme.name}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-muted">{theme.color}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Timing Control */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-muted mb-3 font-semibold">
              Animation Duration: {openDuration}s
            </label>
            <input
              type="range"
              min="0.5"
              max="2.5"
              step="0.1"
              value={openDuration}
              onChange={(e) => setOpenDuration(parseFloat(e.target.value))}
              className="w-full accent-brand-blue cursor-pointer"
            />
            <p className="mt-2 text-[11px] text-slate-muted">
              Controls the GSAP clip-path polygon ease-in-out expansion speed.
            </p>

            <div className="mt-5 rounded-lg bg-slate-50 p-3 text-[11px] text-slate-muted border border-border-subtle">
              <span className="font-semibold text-ink">Keyboard Support:</span>
              <ul className="mt-1 list-disc list-inside space-y-0.5">
                <li><kbd className="px-1 py-0.5 bg-white border rounded">Esc</kbd> closes overlay</li>
                <li><kbd className="px-1 py-0.5 bg-white border rounded">Tab</kbd> cycles inside modal</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Integration Code Sample */}
        <div className="mt-12 rounded-2xl border border-border-subtle bg-ink p-6 text-white shadow-xl sm:p-8">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-brand-blue">
              Integration Example
            </span>
            <span className="font-mono text-[11px] text-white/40">
              @/components/ui/immersive-full-screen-nav
            </span>
          </div>

          <pre className="mt-4 overflow-x-auto font-mono text-xs leading-relaxed text-slate-200">
{`import ImmersiveFullscreenNav from "@/components/ui/immersive-full-screen-nav";

export default function Layout() {
  return (
    <ImmersiveFullscreenNav
      clipOrigin="bottom"
      overlayBg="#0a0f1d"
      openDuration={1.1}
      navConfig={{
        brand: "AR MARKETING",
        brandHref: "/",
      }}
      navContent={{
        agencyName: "AR DIGITAL MARKETING",
        tagline: "Strategic Growth & Digital Performance",
        links: [
          { label: "Home", href: "/" },
          { label: "Services", href: "#services" },
          { label: "Work", href: "#clients" },
          { label: "About", href: "/about" },
          { label: "Contact", href: "/contact" },
        ],
      }}
    />
  );
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}
