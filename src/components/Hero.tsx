"use client";

import { siteConfig } from "@/config/site";
import { HeroIllustration } from "./HeroIllustration";
import { FlowButton } from "@/components/ui/flow-button";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-8 pb-10 sm:pt-14 sm:pb-12 lg:pt-16 lg:pb-14">
      {/* Background Ambient Glows */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(40,88,165,0.18) 0%, rgba(206,32,40,0.08) 50%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Editorial Headline & Messaging */}
          <div className="flex flex-col items-center text-center lg:col-span-7 lg:items-start lg:text-left">
            {/* Eyebrow Pill Tag */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border-subtle bg-white px-3.5 py-1.5 shadow-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-red animate-pulse" />
              <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-ink uppercase">
                {siteConfig.eyebrow}
              </span>
            </div>

            {/* Oversized Editorial Headline (Max 2 lines, tight tracking) */}
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-ink leading-[1.06] text-balance">
              Make your brand{" "}
              <span className="relative whitespace-nowrap">
                <span className="relative z-10 text-brand-blue">impossible</span>
                <span
                  className="absolute bottom-1.5 left-0 -z-0 h-3 w-full bg-brand-blue/10 rounded-sm"
                  aria-hidden="true"
                />
              </span>{" "}
              to ignore.
            </h1>

            {/* Supporting Copy */}
            <p className="mt-6 max-w-2xl text-base sm:text-lg lg:text-xl text-slate-muted leading-relaxed font-normal">
              {siteConfig.heroDescription}
            </p>

            {/* Interactive CTAs */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              {/* Primary CTA (Button-in-Button Pattern) */}
              <FlowButton text="Let's Talk Growth" href="#inquiry" variant="light" />

              {/* Secondary CTA */}
              <FlowButton text="Explore Our Services" href="#services" variant="light" />
            </div>

            {/* Restrained Value Indicators */}
            <div className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-slate-muted">
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-brand-blue" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium text-ink">Zero Long-Term Lock-in</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-brand-blue" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium text-ink">Measurable Performance KPIs</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-brand-red" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium text-ink">Customized Execution</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Vector Flight Path Illustration */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <HeroIllustration />
          </div>
        </div>
      </div>
    </section>
  );
}
