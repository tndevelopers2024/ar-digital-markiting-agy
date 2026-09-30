"use client";

import { siteConfig } from "@/config/site";

export function ClientsSection() {
  const { clients } = siteConfig;
  const items = clients.items;
  // Duplicate for infinite scroll marquee across 3 rows
  const row1 = [...items.slice(0, 8), ...items.slice(0, 8)];
  const row2 = [...items.slice(8, 16), ...items.slice(8, 16)];
  const row3 = [...items.slice(16, 24), ...items.slice(16, 24)];

  return (
    <section id="clients" className="relative py-8 sm:py-10 lg:py-12 overflow-hidden scroll-mt-20">
      {/* Subtle background texture matching site */}
      <div className="absolute inset-0 bg-warm-white" aria-hidden="true" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header - matches site pattern */}
        <header className="flex flex-col items-start max-w-3xl mb-8 sm:mb-10">
          {/* Eyebrow */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border-subtle bg-white px-3 py-1 shadow-xs">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-brand-blue">
              {clients.subheading}
            </span>
          </div>
          {/* Heading with solid accent */}
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-ink leading-tight">
            {clients.heading}{" "}
            <em className="not-italic font-extrabold text-brand-blue">{clients.headingItalic}</em>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-muted leading-relaxed">
            Trusted by ambitious businesses across industries — from startups building momentum to established brands scaling their digital presence.
          </p>
        </header>

        {/* Contained Marquee Box - Solid border, zero gradient masks */}
        <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-border-subtle bg-white/60 dark:bg-surface/50 p-4 sm:p-6 shadow-xs">
          <div className="space-y-4">
            {/* Row 1 — scrolls left */}
            <div className="relative flex overflow-hidden">
              <div
                className="flex gap-4 animate-marquee-left hover:[animation-play-state:paused]"
                style={{ animationDuration: '38s' }}
              >
                {row1.map((client, i) => (
                  <LogoCard key={`r1-${client.id}-${i}`} name={client.name} category={client.category} />
                ))}
              </div>
            </div>

            {/* Row 2 — scrolls right */}
            <div className="relative flex overflow-hidden">
              <div
                className="flex gap-4 animate-marquee-right hover:[animation-play-state:paused]"
                style={{ animationDuration: '44s' }}
              >
                {row2.map((client, i) => (
                  <LogoCard key={`r2-${client.id}-${i}`} name={client.name} category={client.category} />
                ))}
              </div>
            </div>

            {/* Row 3 — scrolls left */}
            <div className="relative flex overflow-hidden">
              <div
                className="flex gap-4 animate-marquee-left hover:[animation-play-state:paused]"
                style={{ animationDuration: '36s' }}
              >
                {row3.map((client, i) => (
                  <LogoCard key={`r3-${client.id}-${i}`} name={client.name} category={client.category} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LogoCard({ name, category }: { name: string; category: string }) {
  return (
    <div
      className="group flex-shrink-0 w-52 sm:w-60 rounded-2xl p-[2px] bg-black/[0.025] dark:bg-white/[0.025] ring-1 ring-black/[0.04] dark:ring-white/[0.04] transition-all duration-300 hover:bg-brand-blue/5 hover:ring-brand-blue/20"
    >
      <div className="flex flex-col items-center justify-center gap-1.5 rounded-[calc(1rem-2px)] border border-border-subtle bg-white dark:bg-surface px-6 py-7 transition-all duration-300 group-hover:border-brand-blue/20">
        {/* Logo placeholder — text-based with solid, high-contrast typography */}
        <span className="font-display text-base sm:text-lg font-bold tracking-tight text-ink/60 dark:text-white/70 group-hover:text-ink dark:group-hover:text-white transition-colors duration-300">
          {name}
        </span>
        <span className="font-mono text-[9px] uppercase tracking-widest text-slate-muted group-hover:text-brand-blue transition-colors duration-300">
          {category}
        </span>
      </div>
    </div>
  );
}
