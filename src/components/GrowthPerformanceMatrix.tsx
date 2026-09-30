"use client";

import { useState } from "react";

type ChannelView = "all" | "paid" | "organic" | "cro";

interface MetricData {
  label: string;
  value: string;
  badge: string;
  badgeType: "positive" | "neutral" | "scale";
  subtext: string;
}

interface ChannelDetail {
  title: string;
  subtitle: string;
  metrics: MetricData[];
  allocation: { name: string; pct: number; color: string; detail: string }[];
  highlight: string;
  trajectoryLabel: string;
}

const channelData: Record<ChannelView, ChannelDetail> = {
  all: {
    title: "Live Attribution Cockpit",
    subtitle: "Consolidated portfolio performance across active client deployments",
    metrics: [
      {
        label: "ROAS Multiplier",
        value: "4.2x",
        badge: "+1.8x vs benchmark",
        badgeType: "positive",
        subtext: "Blended return on capital deployed",
      },
      {
        label: "Organic Search Lift",
        value: "+280%",
        badge: "90-day trajectory",
        badgeType: "positive",
        subtext: "High-intent organic impressions",
      },
      {
        label: "Blended CPA Reduction",
        value: "-38%",
        badge: "Efficiency gain",
        badgeType: "positive",
        subtext: "Lower customer acquisition cost",
      },
      {
        label: "Verified Pipeline",
        value: "$14.8M+",
        badge: "Audited returns",
        badgeType: "scale",
        subtext: "Direct qualified revenue captured",
      },
    ],
    allocation: [
      { name: "Google Search", pct: 38, color: "bg-sky-400", detail: "5.1x ROAS · $5.6M Pipeline" },
      { name: "Meta & Social", pct: 32, color: "bg-blue-300", detail: "3.9x ROAS · $4.8M Pipeline" },
      { name: "SEO Authority", pct: 20, color: "bg-emerald-300", detail: "Compounding · $3.1M Pipeline" },
      { name: "CRO Funnels", pct: 10, color: "bg-indigo-300", detail: "+44% Lift · $1.3M Pipeline" },
    ],
    highlight:
      "Full-Funnel Alignment: High-velocity paid media validates messaging, feeding compounding organic SEO authority and driving down blended CAC by 38%.",
    trajectoryLabel: "6-Month Revenue Acceleration Curve (Avg. Client Portfolio)",
  },
  paid: {
    title: "High-Velocity Paid Media",
    subtitle: "Precision search & paid social tuned for unit-economic profitability",
    metrics: [
      {
        label: "Google Search ROAS",
        value: "5.1x",
        badge: "High-intent capture",
        badgeType: "positive",
        subtext: "Targeted bottom-funnel commercial keywords",
      },
      {
        label: "Meta Ads ROAS",
        value: "3.9x",
        badge: "Full-funnel scale",
        badgeType: "positive",
        subtext: "Creative iteration & lookalike engines",
      },
      {
        label: "Attribution Precision",
        value: "99.4%",
        badge: "Server-side CAPI",
        badgeType: "neutral",
        subtext: "Zero signal loss across iOS & browsers",
      },
      {
        label: "Paid Pipeline Created",
        value: "$10.4M",
        badge: "Direct return",
        badgeType: "scale",
        subtext: "High-converting paid customer flow",
      },
    ],
    allocation: [
      { name: "Google Search (Intent)", pct: 54, color: "bg-sky-400", detail: "Exact Match & Commercial High-Intent" },
      { name: "Meta Social (Scale)", pct: 36, color: "bg-blue-300", detail: "Dynamic Creative & Retargeting" },
      { name: "Retargeting & Display", pct: 10, color: "bg-indigo-300", detail: "Omnichannel Re-engagement" },
    ],
    highlight:
      "Algorithmic Media Control: Continuous negative keyword pruning, server-side attribution, and rapid creative testing ensure capital is concentrated strictly where it converts.",
    trajectoryLabel: "Paid Media Spend vs. Qualified Pipeline Trajectory",
  },
  organic: {
    title: "Compounding Organic SEO",
    subtitle: "Topical authority & technical foundations that compound without ad cost",
    metrics: [
      {
        label: "Organic Traffic Growth",
        value: "+310%",
        badge: "Compounding monthly",
        badgeType: "positive",
        subtext: "Unpaid commercial inbound flow",
      },
      {
        label: "Top 3 Search Rankings",
        value: "142+",
        badge: "High intent",
        badgeType: "scale",
        subtext: "Commercial intent positions captured",
      },
      {
        label: "Recurring Ad Cost",
        value: "$0.00",
        badge: "Perpetual equity",
        badgeType: "neutral",
        subtext: "Asset that yields indefinitely",
      },
      {
        label: "Organic Pipeline",
        value: "$3.1M",
        badge: "High close-rate",
        badgeType: "positive",
        subtext: "Inbound discovery to signed contracts",
      },
    ],
    allocation: [
      { name: "Topical Content Hubs", pct: 45, color: "bg-emerald-300", detail: "High-Intent Authority Silos" },
      { name: "Technical SEO Core", pct: 35, color: "bg-teal-300", detail: "Speed, Schema, & Indexing Architecture" },
      { name: "High-Tier Digital PR", pct: 20, color: "bg-cyan-300", detail: "Editorial Domain Authority Building" },
    ],
    highlight:
      "Perpetual Growth Equity: Unlike rented paid media that stops when spend halts, our organic search infrastructure continues driving high-intent inbound inquiries month after month.",
    trajectoryLabel: "Organic Keyword Rankings & Inbound Search Volume",
  },
  cro: {
    title: "Conversion Architecture & Funnels",
    subtitle: "Turning existing traffic into high-value inquiries and predictable sales",
    metrics: [
      {
        label: "Average Conversion Lift",
        value: "+44.6%",
        badge: "Split-tested",
        badgeType: "positive",
        subtext: "Qualified lead submission rate",
      },
      {
        label: "Page Load Speed",
        value: "1.1s",
        badge: "Core Web Vitals 99+",
        badgeType: "neutral",
        subtext: "Sub-second response eliminates dropoff",
      },
      {
        label: "Form Abandonment Drop",
        value: "-52%",
        badge: "Frictionless UX",
        badgeType: "positive",
        subtext: "Smart multistep qualification",
      },
      {
        label: "Direct CRO Pipeline",
        value: "$1.3M",
        badge: "Incremental gain",
        badgeType: "scale",
        subtext: "Added revenue from the same traffic base",
      },
    ],
    allocation: [
      { name: "Interactive Landing Pages", pct: 42, color: "bg-indigo-300", detail: "High-Impact Responsive Frameworks" },
      { name: "Frictionless Forms", pct: 36, color: "bg-sky-300", detail: "Progressive Profiling & Instant Validation" },
      { name: "Offer & Value Framing", pct: 22, color: "bg-blue-300", detail: "Compelling Proof & Urgency Architecture" },
    ],
    highlight:
      "Conversion Engineering: We diagnose where high-intent buyers bounce and deploy high-converting landing environments that maximize the yield on every visitor.",
    trajectoryLabel: "Traffic Conversion Rate vs. Lead Velocity",
  },
};

export function GrowthPerformanceMatrix() {
  const [activeTab, setActiveTab] = useState<ChannelView>("all");
  const data = channelData[activeTab];

  return (
    <div className="w-full relative group">
      {/* Outer Double-Bezel Container */}
      <div className="relative rounded-[28px] p-1.5 sm:p-2 bg-white/15 backdrop-blur-xl border border-white/20 shadow-2xl transition-all duration-300 hover:border-white/30">
        {/* Glow ambient effects behind */}
        <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-cyan-400/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full bg-blue-600/30 blur-3xl pointer-events-none" />

        {/* Inner Card Frame */}
        <div className="relative rounded-[22px] bg-gradient-to-br from-[#1b3d75]/95 via-[#214b8f]/90 to-[#183667]/95 p-5 sm:p-7 text-white border border-white/10 overflow-hidden">
          
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/15 pb-5">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
                </span>
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">
                  Performance &amp; Attribution Matrix
                </span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white">
                {data.title}
              </h3>
              <p className="text-xs text-white/70 mt-0.5 line-clamp-1">
                {data.subtitle}
              </p>
            </div>

            {/* Interactive Channel Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 rounded-xl bg-black/25 p-1 border border-white/10 self-start sm:self-center">
              {(
                [
                  { id: "all", label: "Overview" },
                  { id: "paid", label: "Paid Media" },
                  { id: "organic", label: "Organic SEO" },
                  { id: "cro", label: "CRO & Funnel" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-lg px-2.5 py-1.5 text-[11px] font-semibold transition-all duration-200 cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-white text-brand-blue shadow-sm font-bold"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* 4-KPI Metric Grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 my-5">
            {data.metrics.map((metric, i) => (
              <div
                key={i}
                className="group/metric relative rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 p-3.5 sm:p-4 transition-all duration-200"
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-[11px] font-medium text-white/75 truncate">
                    {metric.label}
                  </span>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-mono font-semibold uppercase tracking-wider ${
                      metric.badgeType === "positive"
                        ? "bg-emerald-400/20 text-emerald-300 border border-emerald-400/30"
                        : metric.badgeType === "scale"
                        ? "bg-cyan-400/20 text-cyan-200 border border-cyan-400/30"
                        : "bg-white/15 text-white/90 border border-white/20"
                    }`}
                  >
                    {metric.badge}
                  </span>
                </div>
                <div className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-1">
                  {metric.value}
                </div>
                <p className="text-[10px] text-white/60 mt-1 line-clamp-1">
                  {metric.subtext}
                </p>
              </div>
            ))}
          </div>

          {/* Live Revenue Trajectory Visual Graph */}
          <div className="rounded-2xl bg-black/20 border border-white/10 p-4 mb-5">
            <div className="flex items-center justify-between text-xs mb-3">
              <span className="font-medium text-white/80 text-[11px] flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                {data.trajectoryLabel}
              </span>
              <span className="font-mono text-[10px] text-cyan-300 font-bold bg-cyan-400/10 px-2 py-0.5 rounded border border-cyan-400/20">
                +420% 6-Mo Uplift
              </span>
            </div>

            {/* SVG Sparkline Graph */}
            <div className="relative h-20 w-full overflow-hidden">
              <svg
                viewBox="0 0 400 90"
                preserveAspectRatio="none"
                className="w-full h-full"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="matrix-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.0" />
                  </linearGradient>
                  <linearGradient id="line-grad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#93C5FD" />
                    <stop offset="50%" stopColor="#67E8F9" />
                    <stop offset="100%" stopColor="#34D399" />
                  </linearGradient>
                </defs>

                {/* Subtle horizontal grid lines */}
                <line x1="0" y1="20" x2="400" y2="20" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                <line x1="0" y1="50" x2="400" y2="50" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                <line x1="0" y1="80" x2="400" y2="80" stroke="rgba(255,255,255,0.06)" />

                {/* Area under curve */}
                <path
                  d="M 10 75 Q 70 70, 130 58 T 240 38 T 330 22 T 390 10 L 390 85 L 10 85 Z"
                  fill="url(#matrix-grad)"
                />

                {/* Main trajectory stroke */}
                <path
                  d="M 10 75 Q 70 70, 130 58 T 240 38 T 330 22 T 390 10"
                  fill="none"
                  stroke="url(#line-grad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Data Checkpoint nodes */}
                <circle cx="10" cy="75" r="3.5" fill="#93C5FD" />
                <circle cx="130" cy="58" r="3.5" fill="#67E8F9" />
                <circle cx="240" cy="38" r="4" fill="#67E8F9" />
                <circle cx="330" cy="22" r="4.5" fill="#34D399" />
                
                {/* Active pulse beacon at current endpoint */}
                <circle cx="390" cy="10" r="5" fill="#34D399" />
                <circle cx="390" cy="10" r="8" fill="none" stroke="#34D399" strokeWidth="1.5" className="animate-ping opacity-60" />
              </svg>
            </div>

            {/* X-axis Month Milestones */}
            <div className="flex justify-between items-center text-[10px] font-mono text-white/50 pt-2 border-t border-white/5">
              <span>M1 · Baseline ($240k)</span>
              <span>M3 · Breakout ($980k)</span>
              <span className="text-emerald-300 font-bold">M6 · Scaled ($3.2M)</span>
            </div>
          </div>

          {/* Channel Allocation Distribution Bar */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between text-[11px] font-medium text-white/80">
              <span>Channel Allocation &amp; Volume</span>
              <span className="font-mono text-[10px] text-white/60">100% Attributed</span>
            </div>
            {/* Segmented bar */}
            <div className="h-2 w-full rounded-full bg-black/40 overflow-hidden flex p-0.5 gap-1 border border-white/10">
              {data.allocation.map((alloc, idx) => (
                <div
                  key={idx}
                  style={{ width: `${alloc.pct}%` }}
                  className={`h-full rounded-full ${alloc.color} transition-all duration-500`}
                  title={`${alloc.name}: ${alloc.pct}%`}
                />
              ))}
            </div>
            {/* Breakdown item chips */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              {data.allocation.map((alloc, idx) => (
                <div key={idx} className="flex items-center gap-2 text-[10px] text-white/80">
                  <span className={`h-2 w-2 rounded-full ${alloc.color} flex-shrink-0`} />
                  <span className="font-medium truncate">{alloc.name}:</span>
                  <span className="text-white/60 font-mono">{alloc.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Strategic Insight Box */}
          <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-[11px] text-white/80 leading-relaxed flex items-start gap-2.5">
            <div className="flex-shrink-0 mt-0.5 text-cyan-300">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <p className="text-white/85">
              {data.highlight}
            </p>
          </div>

          {/* Live Sync Footer */}
          <div className="mt-4 pt-3.5 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[10px] text-white/60">
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
              <span>Synced with Google Ads API, Meta CAPI &amp; Search Console</span>
            </div>
            <span className="font-mono text-white/50">SOC-2 &amp; First-Party Compliant</span>
          </div>

        </div>
      </div>
    </div>
  );
}
