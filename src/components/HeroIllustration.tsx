"use client";

export function HeroIllustration() {
  return (
    <div className="relative mx-auto w-full max-w-2xl select-none">
      {/* Outer Machined Hardware Double-Bezel Frame */}
      <div className="rounded-[2.5rem] p-2 bg-gradient-to-b from-black/[0.04] to-black/[0.01] ring-1 ring-black/[0.06] shadow-sm">
        <div className="relative overflow-hidden rounded-[calc(2.5rem-0.5rem)] border border-border-subtle bg-white/80 p-6 sm:p-8 backdrop-blur-sm">
          {/* Subtle Background Grid Texture */}
          <div
            className="absolute inset-0 opacity-[0.035] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(#171A22 1px, transparent 1px), radial-gradient(#171A22 1px, #ffffff 1px)",
              backgroundSize: "24px 24px",
              backgroundPosition: "0 0, 12px 12px",
            }}
          />

          {/* Top Status Header */}
          <div className="relative z-10 flex items-center justify-between border-b border-border-subtle/80 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 items-center justify-center">
                <span className="h-2 w-2 rounded-full bg-brand-red animate-beacon" />
              </span>
              <span className="font-mono text-[11px] font-semibold tracking-wider text-slate-muted uppercase">
                Campaign Trajectory Engine
              </span>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate-muted bg-warm-white px-2.5 py-1 rounded-full border border-border-subtle">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-blue" />
              <span>LIVE SIGNAL</span>
            </div>
          </div>

          {/* Main SVG Vector Canvas */}
          <div className="relative z-10 aspect-[16/10] w-full">
            <svg
              viewBox="0 0 640 400"
              className="h-full w-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Marketing Flight Path Graphic"
            >
              <defs>
                {/* Gradients */}
                <linearGradient id="heroBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1F4685" />
                  <stop offset="50%" stopColor="#2858A5" />
                  <stop offset="100%" stopColor="#1A3668" />
                </linearGradient>
                <linearGradient id="heroRedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8B171D" />
                  <stop offset="50%" stopColor="#CE2028" />
                  <stop offset="100%" stopColor="#B72424" />
                </linearGradient>
                <linearGradient id="flightStream" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#2858A5" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="#2858A5" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#CE2028" stopOpacity="0.9" />
                </linearGradient>
                <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#2858A5" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#2858A5" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Coordinate Grid Lines */}
              <line x1="80" y1="60" x2="560" y2="60" stroke="#E4E5E9" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="80" y1="170" x2="560" y2="170" stroke="#E4E5E9" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="80" y1="280" x2="560" y2="280" stroke="#E4E5E9" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="160" y1="40" x2="160" y2="350" stroke="#E4E5E9" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="320" y1="40" x2="320" y2="350" stroke="#E4E5E9" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="480" y1="40" x2="480" y2="350" stroke="#E4E5E9" strokeWidth="1" strokeDasharray="3 3" />

              {/* Supersonic Flight Path Trajectory Curve */}
              <path
                d="M 90 320 C 180 320, 210 210, 310 200 C 400 190, 430 90, 530 85"
                stroke="url(#flightStream)"
                strokeWidth="3.5"
                strokeLinecap="round"
                className="animate-flight-path"
              />

              {/* Secondary Harmonic Echo Path */}
              <path
                d="M 90 320 C 180 320, 210 210, 310 200 C 400 190, 430 90, 530 85"
                stroke="#2858A5"
                strokeWidth="1"
                strokeOpacity="0.2"
                strokeDasharray="4 4"
              />

              {/* Node 1: Strategy (Origin) */}
              <g transform="translate(90, 320)">
                <circle cx="0" cy="0" r="22" fill="url(#nodeGlow)" />
                <circle cx="0" cy="0" r="9" fill="#FFFFFF" stroke="#2858A5" strokeWidth="3" />
                <circle cx="0" cy="0" r="3.5" fill="#2858A5" />
                <rect x="-45" y="16" width="90" height="22" rx="6" fill="#F8F7F4" stroke="#E4E5E9" strokeWidth="1" />
                <text x="0" y="31" textAnchor="middle" fill="#171A22" fontSize="10" fontWeight="700" letterSpacing="0.05em">
                  01 STRATEGY
                </text>
              </g>

              {/* Node 2: Search & Intent */}
              <g transform="translate(230, 235)">
                <circle cx="0" cy="0" r="18" fill="url(#nodeGlow)" />
                <circle cx="0" cy="0" r="8" fill="#FFFFFF" stroke="#2858A5" strokeWidth="2.5" />
                <circle cx="0" cy="0" r="3" fill="#2858A5" />
                <rect x="-38" y="-32" width="76" height="20" rx="5" fill="#F8F7F4" stroke="#E4E5E9" strokeWidth="1" />
                <text x="0" y="-18" textAnchor="middle" fill="#171A22" fontSize="9" fontWeight="700" letterSpacing="0.05em">
                  02 SEARCH
                </text>
              </g>

              {/* Node 3: Creative & Brand */}
              <g transform="translate(380, 160)">
                <circle cx="0" cy="0" r="20" fill="url(#nodeGlow)" />
                <circle cx="0" cy="0" r="8.5" fill="#FFFFFF" stroke="#CE2028" strokeWidth="2.5" />
                <circle cx="0" cy="0" r="3" fill="#CE2028" />
                <rect x="-42" y="16" width="84" height="20" rx="5" fill="#F8F7F4" stroke="#E4E5E9" strokeWidth="1" />
                <text x="0" y="30" textAnchor="middle" fill="#171A22" fontSize="9" fontWeight="700" letterSpacing="0.05em">
                  03 CREATIVE
                </text>
              </g>

              {/* Node 4: Reach & Impact (Peak Target) */}
              <g transform="translate(530, 85)">
                <circle cx="0" cy="0" r="26" fill="url(#nodeGlow)" />
                <circle cx="0" cy="0" r="10" fill="#FFFFFF" stroke="#CE2028" strokeWidth="3" />
                <circle cx="0" cy="0" r="4" fill="#CE2028" />
                <rect x="-38" y="-34" width="76" height="22" rx="6" fill="#171A22" />
                <text x="0" y="-19" textAnchor="middle" fill="#FFFFFF" fontSize="9.5" fontWeight="700" letterSpacing="0.06em">
                  04 REACH
                </text>

                {/* Supersonic Arrow Wings Target Indicator (Logo-derived aerodynamic wings) */}
                <g transform="translate(18, -20) scale(0.65)" className="animate-float-gentle">
                  <path d="M 0 10 L 26 22 L 30 46 L 60 0 Z" fill="url(#heroBlueGrad)" />
                  <path d="M 26 22 L 30 46 L 60 0 Z" fill="url(#heroRedGrad)" />
                </g>
              </g>
            </svg>
          </div>

          {/* Bottom Metagrid Metrics Strip */}
          <div className="relative z-10 mt-4 grid grid-cols-3 gap-2 border-t border-border-subtle/80 pt-4 text-center">
            <div className="rounded-xl bg-warm-white p-2 border border-border-subtle/60">
              <span className="block font-mono text-[9px] uppercase tracking-wider text-slate-muted">
                Intent Precision
              </span>
              <span className="font-display text-sm font-bold text-ink">99.4%</span>
            </div>
            <div className="rounded-xl bg-warm-white p-2 border border-border-subtle/60">
              <span className="block font-mono text-[9px] uppercase tracking-wider text-slate-muted">
                Channel Synergy
              </span>
              <span className="font-display text-sm font-bold text-brand-blue">Active</span>
            </div>
            <div className="rounded-xl bg-warm-white p-2 border border-border-subtle/60">
              <span className="block font-mono text-[9px] uppercase tracking-wider text-slate-muted">
                Execution Model
              </span>
              <span className="font-display text-sm font-bold text-brand-red">Continuous</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
