"use client";

import { siteConfig, ServiceItem } from "@/config/site";
import { useServiceContext } from "./ServiceContext";
import { MagneticButton } from '@/components/ui/magnetic-button';

interface ServicesSectionProps {
  onSelectService?: (serviceId: string) => void;
}

export function ServicesSection({ onSelectService }: ServicesSectionProps) {
  const { setSelectedServiceId } = useServiceContext();

  const handleInquire = (serviceId: string) => {
    setSelectedServiceId(serviceId);

    if (onSelectService) {
      onSelectService(serviceId);
    }

    // Also dispatch custom event for loose coupling
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("ar-select-service", { detail: { serviceId } })
      );

      // Smooth scroll to inquiry section
      const inquiryElement = document.getElementById("inquiry");
      if (inquiryElement) {
        inquiryElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section id="services" className="relative py-12 sm:py-16 lg:py-20">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <header className="flex flex-col items-start max-w-3xl mb-10 sm:mb-12">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border-subtle bg-white px-3 py-1 shadow-xs">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-brand-blue">
              Capabilities & Offerings
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-ink leading-tight">
            The right mix for your next stage.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-muted leading-relaxed">
            Every service is tailored to deliver direct business value, clear accountability, and compounding momentum. We avoid generic retainers and focus on what moves the needle.
          </p>
        </header>

        {/* 6 Services Grid (Semantic UL/LI to isolate Card DIV for testing & accessibility) */}
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 list-none p-0 m-0">
          {siteConfig.services.map((service: ServiceItem) => {
            const isBlue = service.accentColor === "blue";

            return (
              <li key={service.id} className="flex">
                <div
                  className="group relative flex flex-col justify-between w-full rounded-[2rem] p-2 bg-black/[0.025] ring-1 ring-black/[0.04] transition-all duration-300 hover:bg-black/[0.04] hover:shadow-md"
                >
                  <div className="relative flex flex-col justify-between h-full rounded-[calc(2rem-0.5rem)] border border-border-subtle bg-white p-7 sm:p-8 transition-all duration-300">
                    <div>
                      {/* Top Card Bar: Number Badge + Accent Indicator */}
                      <div className="flex items-center justify-between border-b border-border-subtle/80 pb-5 mb-5">
                        <span className="font-mono text-xs font-bold uppercase tracking-widest text-slate-muted">
                          Service {service.number}
                        </span>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider ${
                            isBlue
                              ? "bg-brand-blue/10 text-brand-blue border border-brand-blue/20"
                              : "bg-brand-red/10 text-brand-red border border-brand-red/20"
                          }`}
                        >
                          {isBlue ? "Growth" : "Creative"}
                        </span>
                      </div>

                      {/* Title & Tagline */}
                      <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-ink group-hover:text-brand-blue transition-colors duration-200">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-xs font-medium text-brand-blue font-sans">
                        {service.tagline}
                      </p>

                      {/* Benefit-Focused Description */}
                      <p className="mt-4 text-sm text-slate-muted leading-relaxed">
                        {service.description}
                      </p>

                      {/* Deliverables / Scope Bullets */}
                      <div className="mt-6 pt-5 border-t border-border-subtle/60">
                        <span className="block font-mono text-[10px] uppercase tracking-wider text-slate-muted mb-3 font-semibold">
                          What We Deliver
                        </span>
                        <ul className="space-y-2 text-xs text-ink/90 list-none p-0 m-0">
                          {service.deliverables.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span
                                className={`mt-1 h-1.5 w-1.5 rounded-full flex-shrink-0 ${
                                  isBlue ? "bg-brand-blue" : "bg-brand-red"
                                }`}
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Card Bottom CTA (Button-in-Button) */}
                    <div className="mt-8 pt-5 border-t border-border-subtle/80">
                      <MagneticButton
                        type="button"
                        onClick={() => handleInquire(service.id)}
                        className="group/btn inline-flex w-full items-center justify-between rounded-xl bg-warm-white border border-border-subtle px-4 py-3 text-xs font-semibold text-ink transition-all duration-200 hover:border-brand-blue/40 hover:bg-brand-blue hover:text-white active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-brand-blue cursor-pointer"
                      >
                        <span>Inquire about this service</span>
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white border border-border-subtle text-ink group-hover/btn:border-transparent group-hover/btn:bg-white/20 group-hover/btn:text-white transition-all">
                          <svg
                            className="h-3 w-3 transition-transform group-hover/btn:translate-x-0.5"
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
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </section>
  );
}
