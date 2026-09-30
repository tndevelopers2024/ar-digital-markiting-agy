"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* ─────────────────────────────────────────────────────────────
   Timing & geometry
───────────────────────────────────────────────────────────── */
const LOAD_DURATION_MS = 1400;
const HOLD_BEFORE_REVEAL_MS = 240;
const REVEAL_DURATION_MS = 900;
const UNMOUNT_AFTER_REVEAL_MS = REVEAL_DURATION_MS + 120;

const WATCHDOG_MS = LOAD_DURATION_MS + HOLD_BEFORE_REVEAL_MS + 500;

const RING_RADIUS = 38;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

type Phase = "loading" | "revealing";

/* ─────────────────────────────────────────────────────────────
   Preloader — light editorial curtain reveal
   Skipped for reduced-motion users, repeat visits in a session
   and tabs that open in the background.
───────────────────────────────────────────────────────────── */
export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<Phase>("loading");
  const [visible, setVisible] = useState(true);
  const revealStarted = useRef(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const skipIntro =
      prefersReducedMotion ||
      document.documentElement.dataset.preloader === "skip" ||
      (typeof window !== "undefined" && window.location.pathname.startsWith("/demo")) ||
      document.visibilityState !== "visible";

    if (skipIntro) {
      const teardown = window.setTimeout(() => setVisible(false), 0);
      return () => window.clearTimeout(teardown);
    }

    let frame = 0;
    let revealTimer = 0;
    let unmountTimer = 0;
    const start = performance.now();

    const beginReveal = () => {
      if (revealStarted.current) return;
      revealStarted.current = true;
      setPhase("revealing");
      unmountTimer = window.setTimeout(() => setVisible(false), UNMOUNT_AFTER_REVEAL_MS);
    };

    const tick = (now: number) => {
      const elapsed = Math.min(1, (now - start) / LOAD_DURATION_MS);
      const eased = 1 - Math.pow(1 - elapsed, 3);
      setProgress(Math.round(eased * 100));

      if (elapsed < 1) {
        frame = requestAnimationFrame(tick);
        return;
      }

      revealTimer = window.setTimeout(beginReveal, HOLD_BEFORE_REVEAL_MS);
    };

    frame = requestAnimationFrame(tick);
    const watchdog = window.setTimeout(beginReveal, WATCHDOG_MS);

    const dismiss = () => beginReveal();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Enter" || event.key === " ") beginReveal();
    };
    window.addEventListener("pointerdown", dismiss);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(revealTimer);
      window.clearTimeout(unmountTimer);
      window.clearTimeout(watchdog);
      window.removeEventListener("pointerdown", dismiss);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  if (!visible) return null;

  const revealed = phase === "revealing";

  const curtainTransition =
    "transition-transform duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:transition-none";

  return (
    <div
      role="status"
      aria-live="polite"
      className={`ar-preloader fixed inset-0 z-[100] overflow-hidden ${
        revealed ? "pointer-events-none" : ""
      }`}
    >
      <span className="sr-only">Loading AR Digital Marketing</span>

      {/* ── Curtain panels ─────────────────────────────────── */}
      <div aria-hidden="true" className="absolute inset-0">
        {/* Top curtain */}
        <div
          className={`absolute inset-x-0 top-0 h-[50.4%] bg-warm-white ${curtainTransition} ${
            revealed ? "-translate-y-full" : "translate-y-0"
          }`}
        >
          {/* Hairline seam */}
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent" />
        </div>

        {/* Bottom curtain */}
        <div
          className={`absolute inset-x-0 bottom-0 h-[50.4%] bg-warm-white ${curtainTransition} ${
            revealed ? "translate-y-full" : "translate-y-0"
          }`}
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent" />
        </div>

        {/* Ambient brand glows — softened for light bg */}
        <div className="pointer-events-none absolute -top-32 -left-32 h-[26rem] w-[26rem] rounded-full bg-brand-blue/10 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-brand-red/8 blur-[100px]" />
      </div>

      {/* ── Centre stage ───────────────────────────────────── */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 flex flex-col items-center justify-center px-6 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none ${
          revealed ? "scale-[0.97] opacity-0 blur-[3px]" : "scale-100 opacity-100 blur-0"
        }`}
      >
        {/* Mark + progress ring */}
        <div className="relative flex h-48 w-48 items-center justify-center sm:h-56 sm:w-56 md:h-64 md:w-64">

          {/* Slow-rotating tick ring */}
          <svg
            viewBox="0 0 100 100"
            fill="none"
            className="absolute inset-0 h-full w-full text-ink/10"
            style={{ animation: "preloaderRingSpin 26s linear infinite" }}
          >
            <circle
              cx="50"
              cy="50"
              r="47"
              stroke="currentColor"
              strokeWidth="0.4"
              strokeDasharray="1 6"
              strokeLinecap="round"
            />
          </svg>

          {/* Progress ring */}
          <svg viewBox="0 0 100 100" fill="none" className="absolute inset-0 h-full w-full -rotate-90">
            <defs>
              <linearGradient id="preloaderRingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stopColor="#2858A5" />
                <stop offset="55%"  stopColor="#3C6FBF" />
                <stop offset="100%" stopColor="#CE2028" />
              </linearGradient>
            </defs>
            {/* Track */}
            <circle cx="50" cy="50" r={RING_RADIUS} stroke="rgba(23,26,34,0.08)" strokeWidth="1.5" />
            {/* Fill */}
            <circle
              cx="50"
              cy="50"
              r={RING_RADIUS}
              stroke="url(#preloaderRingGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray={RING_CIRCUMFERENCE}
              strokeDashoffset={RING_CIRCUMFERENCE * (1 - progress / 100)}
            />
          </svg>

          {/* Brand mark */}
          <div
            className="relative flex h-20 w-32 items-center justify-center sm:h-24 sm:w-40 md:h-28 md:w-48"
            style={{ animation: "preloaderMarkIn 900ms cubic-bezier(0.32,0.72,0,1) both" }}
          >
            {/* Soft halo for light bg */}
            <div className="absolute -inset-10 rounded-full bg-brand-blue/15 blur-2xl" />
            <Image
              src="/logo/ar-mark.svg"
              alt="AR Marketing"
              width={192}
              height={106}
              priority
              className="relative h-full w-auto object-contain drop-shadow-[0_4px_20px_rgba(40,88,165,0.25)]"
              style={{ width: "auto", height: "auto" }}
            />
          </div>
        </div>

        {/* Wordmark */}
        <p
          className="mt-8 font-display text-sm font-extrabold uppercase text-ink sm:text-base"
          style={{ animation: "preloaderWordmarkIn 1100ms cubic-bezier(0.32,0.72,0,1) 120ms both" }}
        >
          AR <span className="text-brand-blue">MARKETING</span>
        </p>
      </div>
    </div>
  );
}
