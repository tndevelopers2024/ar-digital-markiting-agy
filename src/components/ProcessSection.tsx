import Image from "next/image";
import { siteConfig } from "@/config/site";

export function ProcessSection() {
  const { process } = siteConfig;

  return (
    <section id="process" className="relative py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-[1536px] 2xl:max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border-subtle bg-white dark:bg-surface px-3 py-1 shadow-xs">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-brand-blue">
              {process.subheading}
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-ink leading-tight">
            {process.heading}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-muted leading-relaxed">
            From initial discovery through deployment and measurement, we follow a rigorous cadence that eliminates wasted effort and keeps stakeholders aligned.
          </p>
        </div>

        {/* 4 Connected Steps Grid */}
        <div className="relative">
          {/* Desktop Horizontal Connecting Line */}
          <div
            className="hidden lg:block absolute top-[54px] left-[8%] right-[8%] h-[2px] bg-gradient-to-r from-brand-blue/30 via-brand-red/30 to-brand-blue/30 -z-0"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6 xl:gap-7 relative z-10">
            {process.steps.map((step, idx) => (
              <div
                key={step.number}
                className="group relative flex flex-col rounded-[2rem] p-2 sm:p-2.5 bg-black/[0.025] dark:bg-white/[0.02] ring-1 ring-black/[0.04] dark:ring-white/[0.06] transition-all duration-300 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] hover:shadow-xl hover:-translate-y-1"
              >
                <div className="flex flex-col justify-between h-full rounded-[calc(2rem-0.5rem)] border border-border-subtle bg-white dark:bg-surface p-5 sm:p-6 lg:p-6 transition-all duration-300 group-hover:border-brand-blue/40">
                  <div>
                    {/* Step Icon / Number Indicator */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-warm-white dark:bg-white/5 border border-border-subtle font-mono text-sm font-bold text-ink shadow-xs group-hover:bg-brand-blue group-hover:text-white group-hover:border-brand-blue transition-colors duration-200">
                        {step.number}
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-slate-muted font-semibold bg-warm-white dark:bg-white/5 px-2.5 py-1 rounded-full border border-border-subtle">
                        Phase 0{idx + 1}
                      </span>
                    </div>

                    {/* Step Visual Image Banner - Prominent 4:3 Aspect Ratio */}
                    {step.image && (
                      <div className="relative aspect-[4/3] w-full mb-5 overflow-hidden rounded-2xl border border-border-subtle/80 dark:border-white/10 bg-slate-100 dark:bg-white/5 shadow-xs group-hover:shadow-md transition-shadow duration-300">
                        <Image
                          src={step.image}
                          alt={step.imageAlt || `${step.title} - ${step.shortDesc}`}
                          fill
                          sizes="(min-width: 1536px) 380px, (min-width: 1280px) 340px, (min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                        />
                      </div>
                    )}

                    {/* Step Title & Subtitle */}
                    <div className="space-y-1">
                      <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight text-ink group-hover:text-brand-blue transition-colors duration-200">
                        {step.title}
                      </h3>
                      <p className="text-xs font-semibold uppercase tracking-wider text-brand-blue">
                        {step.shortDesc}
                      </p>
                    </div>

                    {/* Details */}
                    <p className="mt-3.5 text-xs sm:text-sm text-slate-muted leading-relaxed">
                      {step.details}
                    </p>
                  </div>

                  {/* Bottom Milestone Tag */}
                  <div className="mt-6 pt-4 border-t border-border-subtle/80 flex items-center justify-between text-[11px] font-mono text-slate-muted">
                    <span className="inline-flex items-center gap-1.5 font-medium">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" />
                      Deliverable ready
                    </span>
                    <svg
                      className="h-3.5 w-3.5 text-brand-blue group-hover:translate-x-1 transition-transform duration-200"
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
