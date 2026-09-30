"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";

export function FaqSection() {
  const { faq } = siteConfig;
  // First item open by default
  const [openId, setOpenId] = useState<string | null>(faq.items[0]?.id || null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
    if (typeof window !== "undefined") {
      requestAnimationFrame(() => {
        const globalLenis = (window as unknown as { __lenis?: { resize: () => void } }).__lenis;
        if (globalLenis) {
          globalLenis.resize();
        }
        window.dispatchEvent(new Event("resize"));
      });
    }
  };

  return (
    <section id="faqs" className="relative py-8 sm:py-10 lg:py-12 border-t border-border-subtle bg-white/50 scroll-mt-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border-subtle bg-white px-3 py-1 shadow-xs">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-brand-red">
              {faq.subheading}
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-ink leading-tight">
            {faq.heading}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-muted leading-relaxed">
            Straight answers about how we operate, what we deliver, and what to expect when collaborating with our team.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faq.items.map((item, idx) => {
            const isOpen = openId === item.id;
            const buttonId = `faq-btn-${item.id}`;
            const panelId = `faq-panel-${item.id}`;

            return (
              <div
                key={item.id}
                className="rounded-[1.75rem] p-1.5 bg-black/[0.02] ring-1 ring-black/[0.04] transition-all duration-200"
              >
                <div className="rounded-[calc(1.75rem-0.375rem)] border border-border-subtle bg-white transition-all overflow-hidden">
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggleItem(item.id)}
                      className="flex w-full items-center justify-between gap-4 p-6 sm:p-7 text-left font-display text-base sm:text-lg font-bold text-ink transition-colors hover:text-brand-blue focus-visible:outline-2 focus-visible:outline-brand-blue cursor-pointer"
                    >
                      <span className="flex items-center gap-4">
                        <span className="font-mono text-xs font-semibold text-slate-400">
                          0{idx + 1}
                        </span>
                        <span>{item.question}</span>
                      </span>

                      {/* Animated Plus / Minus Indicator */}
                      <span
                        className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-border-subtle transition-all duration-300 ${
                          isOpen
                            ? "bg-brand-blue text-white border-transparent rotate-45"
                            : "bg-warm-white text-ink"
                        }`}
                        aria-hidden="true"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                          />
                        </svg>
                      </span>
                    </button>
                  </h3>

                  {/* Accordion Panel Content */}
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    hidden={!isOpen}
                    className={`px-6 sm:px-7 pb-6 sm:pb-7 pt-0 text-sm sm:text-base text-slate-muted leading-relaxed border-t border-border-subtle/50 transition-all ${
                      isOpen ? "block mt-2 pt-4" : "hidden"
                    }`}
                  >
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
