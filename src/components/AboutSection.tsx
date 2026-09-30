"use client";

import Link from "next/link";
import {
  MessageSquare,
  Layers,
  Building2,
  Globe,
  LifeBuoy,
  ArrowRight,
} from "lucide-react";

const metrics = [
  {
    value: "8+",
    label: "YEARS IN BUSINESS",
  },
  {
    value: "500+",
    label: "CAMPAIGNS DELIVERED",
  },
  {
    value: "150+",
    label: "ACTIVE CLIENTS",
  },
  {
    value: "100%",
    label: "ROI & PERFORMANCE FOCUS",
  },
];

const bottomCards = [
  {
    number: "02",
    icon: Layers,
    title: "One team for everything",
    description:
      "Full-funnel SEO, paid ads, web development, and creative execution managed under one unified roof.",
  },
  {
    number: "03",
    icon: Building2,
    title: "We've worked across industries",
    description:
      "Proven growth strategies tailored to buyer psychology across SaaS, e-commerce, healthcare, and B2B.",
  },
  {
    number: "04",
    icon: Globe,
    title: "Global client base",
    description:
      "Scalable growth campaigns deployed across India and global markets, tuned for regional scale and compliance.",
  },
  {
    number: "05",
    icon: LifeBuoy,
    title: "Support doesn't stop at launch",
    description:
      "Continuous post-launch optimization — ongoing A/B testing, keyword tuning, and budget management to compound ROI.",
  },
];

export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative overflow-hidden scroll-mt-28 py-8 sm:py-12 text-white selection:bg-white/20"
    >
      {/* Ambient background glow accents */}
      <div
        className="pointer-events-none absolute -top-40 right-0 -z-0 h-[500px] w-[500px] rounded-full bg-white/5 blur-[130px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 -z-0 h-[450px] w-[450px] rounded-full bg-sky-300/10 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col">
          {/* Eyebrow tag */}
          <div className="inline-flex items-center gap-2.5">
            <span className="h-[1.5px] w-6 bg-sky-200/80" />
            <span className="font-mono text-xs sm:text-[13px] font-semibold tracking-[0.22em] text-sky-200 uppercase">
              ABOUT US
            </span>
          </div>

          {/* Main Headline */}
          <h2 id="about-heading" className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] max-w-5xl">
            Why Businesses Across Industries{" "}
            <span className="font-serif italic font-normal text-sky-200">
              Choose
            </span>{" "}
            <span className="text-white">
              AR Marketing.
            </span>
          </h2>

          {/* Narrative & Action Links Grid */}
          <div className="mt-8 sm:mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            {/* Left Editorial Narrative */}
            <div className="lg:col-span-8 text-white/85 text-base sm:text-lg leading-relaxed font-normal">
              <p>
                For over 8 years, AR Digital Marketing has engineered full-funnel acquisition systems
                that turn search visibility and performance creative into predictable revenue. We align
                with your business goals first, then deploy the strategy to scale them.
              </p>
            </div>

            {/* Right Action Links */}
            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-end gap-4 pb-1">
              <Link
                href="/about"
                className="group inline-flex items-center gap-3.5 text-xs sm:text-sm font-mono tracking-widest text-slate-100 uppercase transition-all duration-300 hover:text-white"
              >
                <span className="border-b border-white/20 pb-0.5 group-hover:border-sky-200 transition-colors">
                  LEARN MORE ABOUT US
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 border border-white/15 text-white transition-all duration-300 group-hover:bg-white/20 group-hover:border-white/40 group-hover:translate-x-1 shadow-xs">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
              <Link
                href="#inquiry"
                className="group inline-flex items-center gap-3 text-xs sm:text-sm font-mono tracking-widest text-white/75 uppercase transition-all duration-300 hover:text-slate-200"
              >
                <span className="border-b border-transparent pb-0.5 group-hover:border-slate-400 transition-colors">
                  MEET THE CORE TEAM
                </span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bento Grid Structure */}
        <div className="mt-14 sm:mt-16 space-y-5 sm:space-y-6">
          {/* Top Row: 2x2 Metrics Box (lg:col-span-5) + Feature Card 01 (lg:col-span-7) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
            {/* Left: 2x2 Metrics Box */}
            <div className="lg:col-span-5 rounded-2xl sm:rounded-3xl bg-white/[0.06] border border-white/[0.08] backdrop-blur-md p-8 sm:p-10 flex flex-col justify-center shadow-xl hover:border-white/15 transition-all duration-300">
              <div className="grid grid-cols-2 gap-x-6 sm:gap-x-10 gap-y-8 sm:gap-y-10">
                {metrics.map((item, idx) => (
                  <div key={idx} className="flex flex-col">
                    <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                      {item.value}
                    </div>
                    <div className="mt-2 font-mono text-[11px] sm:text-xs font-semibold tracking-wider text-white/75 uppercase">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Feature Card 01 */}
            <div className="lg:col-span-7 rounded-2xl sm:rounded-3xl bg-white/[0.06] border border-white/[0.08] backdrop-blur-md p-8 sm:p-10 flex flex-col justify-between hover:border-white/20 hover:bg-white/[0.1] transition-all duration-300 shadow-xl group">
              <div className="flex items-center justify-between">
                <div className="flex h-13 w-13 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-white/10 border border-white/20 text-sky-200 shadow-[0_0_20px_rgba(99,102,241,0.18)] group-hover:scale-105 group-hover:border-white/40 transition-all duration-300">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <span className="font-mono text-sm sm:text-base font-semibold tracking-wider text-white/60">
                  01
                </span>
              </div>

              <div className="mt-8 sm:mt-10">
                <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white group-hover:text-sky-100 transition-colors">
                  We speak your language, not just marketing jargon
                </h3>
                <p className="mt-3.5 sm:mt-4 text-white/75 text-sm sm:text-base leading-relaxed max-w-2xl">
                  Clear commercial priorities, plain-English strategy, and real-time transparent
                  dashboards before spending a single ad dollar.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Row: 4 Cards Across */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {bottomCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.number}
                  className="rounded-2xl sm:rounded-3xl bg-white/[0.06] border border-white/[0.08] backdrop-blur-md p-7 sm:p-8 flex flex-col justify-between hover:border-white/20 hover:bg-white/[0.1] transition-all duration-300 shadow-xl group min-h-[220px] sm:min-h-[240px]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 border border-white/20 text-sky-200 shadow-[0_0_15px_rgba(99,102,241,0.15)] group-hover:scale-105 group-hover:border-white/40 transition-all duration-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-white/60">
                      {card.number}
                    </span>
                  </div>

                  <div className="mt-6 sm:mt-8">
                    <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-sky-100 transition-colors">
                      {card.title}
                    </h3>
                    <p className="mt-2.5 sm:mt-3 text-white/75 text-xs sm:text-sm leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
