import { siteConfig } from "@/config/site";

export function CapabilitiesStrip() {
  return (
    <section className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-6 sm:my-8">
      {/* Outer Shell Double-Bezel Architecture */}
      <div className="rounded-2xl sm:rounded-full p-1.5 bg-black/[0.03] ring-1 ring-black/[0.05]">
        <div className="flex flex-wrap items-center justify-center gap-y-3 gap-x-6 sm:gap-x-10 rounded-xl sm:rounded-full border border-border-subtle bg-white/95 px-6 py-4 shadow-xs backdrop-blur-xs text-center">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-slate-muted hidden md:inline-block border-r border-border-subtle pr-8">
            Core Disciplines
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-5 sm:gap-x-8 text-xs sm:text-sm font-display font-semibold tracking-wide text-ink">
            {siteConfig.capabilities.map((item, index) => (
              <span key={item} className="inline-flex items-center gap-5 sm:gap-8">
                <span className="transition-colors hover:text-brand-blue cursor-default">
                  {item}
                </span>
                {index < siteConfig.capabilities.length - 1 && (
                  <span className="text-slate-300 font-normal select-none" aria-hidden="true">
                    ·
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
