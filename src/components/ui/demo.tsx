"use client";

import { useEffect, useState } from "react";
import GlyphPortal from "@/components/ui/glyph-portal";
import { AboutSection } from "@/components/AboutSection";

const settings = { word: "GROWTH", scrollLength: 2.4, interactive: true, annotations: false };
const family = '"Glyph Portal Jakarta", Arial, sans-serif';
let fontLoad: Promise<void> | undefined;

export default function Demo(props: Partial<typeof settings>) {
  const s = { ...settings, ...props };
  const [face, setFace] = useState<string | null>(family);
  useEffect(() => {
    let settled = false;
    const finish = (value: string) => { if (!settled) { settled = true; setFace(value); } };
    fontLoad ??= new FontFace("Glyph Portal Jakarta", 'url("https://cdn.21st.dev/assets/mirror/15/153fc85b70298beeb1d61a5f723331649e7f23bb77302a66e61cb3e2fbdb5e79.woff2")', { weight: "400 700" })
      .load().then((font) => { document.fonts.add(font); });
    const timeout = window.setTimeout(() => finish("Arial, sans-serif"), 1600);
    void fontLoad.then(() => finish(family), () => finish("Arial, sans-serif"));
    return () => { settled = true; clearTimeout(timeout); };
  }, []);

  return (
    <div data-demo-scroll data-slipstream-demo tabIndex={0} role="region" aria-label="AR Digital Marketing. Scroll to step inside."
      className="bg-warm-white text-ink transition-colors duration-300"
      style={{ width: "100%", background: "var(--warm-white)", color: "var(--ink)", containerType: "inline-size", fontFamily: face ?? "Arial, sans-serif" }}>
      <style>{`
        [data-slipstream-demo] [data-gp-pin]{background:linear-gradient(180deg,rgba(240,246,255,.72),rgba(240,246,255,.62)),url('/images/hero-digital-marketing.webp') center/cover no-repeat;}
        [data-slipstream-demo] [data-gp-caption]{inset:calc(var(--gp-word-bottom,50%) + 82px) 24px auto;justify-content:center;}
        [data-slipstream-demo] [data-gp-hint]{display:none;}
        [data-slipstream-demo] [data-gp-enter]{min-height:46px;padding:0 22px;gap:24px;background:#2858A5;border:1px solid #204684;border-radius:10px;color:#fff;font-size:13px;font-weight:600;box-shadow:none;transition:background .2s,border-color .2s;}
        [data-slipstream-demo] [data-gp-enter]:hover{background:#1e4380;border-color:#1a396d;}
        [data-slipstream-demo] [data-gp-enter]:focus-visible{outline:2px solid #2858A5;outline-offset:4px;}
        [data-slipstream-demo] [data-gp-touch-picker]{top:auto;bottom:18px;left:50%;}
        [data-slipstream-demo] [data-gp-select]{border:1px solid var(--border-subtle);border-radius:8px;font-size:12px;color:var(--ink);background:var(--surface);}
        [data-slipstream-demo] [data-gp-letter]{appearance:none;-webkit-appearance:none;border:none!important;background:transparent!important;box-shadow:none!important;outline:none!important;}
        [data-sublime-eyebrow]{position:absolute;inset:auto 24px calc(100% - var(--gp-word-top,35%) + 32px);margin:0;text-align:center;font-size:13px;font-weight:400;line-height:1.5;letter-spacing:.005em;color:#213653;}
        [data-sublime-support]{position:absolute;inset:calc(var(--gp-word-bottom,50%) + 32px) 24px auto;margin:0;text-align:center;font-size:16px;font-weight:400;line-height:1.5;color:#213653;}
        [data-sublime-scroll]{position:absolute;inset:auto 24px 7%;text-align:center;color:#213653;font-size:11px;letter-spacing:.02em;}
        @media(any-pointer:coarse){[data-sublime-scroll]{bottom:13%;}}
        @container(max-width:450px){[data-slipstream-demo] [data-gp-pin]{background-position:right center;}[data-sublime-eyebrow]{font-size:12px;}[data-sublime-support]{font-size:14px;}[data-slipstream-demo] [data-gp-caption]{top:calc(var(--gp-word-bottom,50%) + 76px);}}
        @container(max-height:479px){[data-sublime-support]{top:calc(var(--gp-word-bottom,50%) + 16px);}[data-slipstream-demo] [data-gp-caption]{top:calc(var(--gp-word-bottom,50%) + 60px);}[data-sublime-scroll]{display:none;}}
        [data-slipstream-demo] [data-gp-content]{padding:clamp(3.5rem,6vh,5rem) clamp(1.25rem,4cqw,4.5rem);font-family:inherit;background:#2858A5!important;}
        [data-slipstream-demo] section,[data-slipstream-demo] [data-gp-caption]{font-family:inherit;}
      `}</style>
      {face ? (
        <GlyphPortal
          word={s.word}
          fontFamily={face}
          fontWeight={700}
          style={{
            fontFamily: face,
            "--gp-paper": "var(--warm-white)",
            "--gp-ink": "var(--ink)",
            "--gp-field": "#2858A5",
            "--gp-foreground": "#ffffff",
          }}
          scrollLength={s.scrollLength}
          interactive={s.interactive}
          annotations={s.annotations}
          enterLabel="Step inside"
          background={
            <div
              data-gp-brand-field
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(135deg, #2858a5, #193969)",
              }}
            />
          }
          front={
            <>
              <h1 data-sublime-eyebrow>Your brand&apos;s next growth leap starts here.</h1>
              <p data-sublime-support>Engineered for measurable market impact.</p>
              <span data-sublime-scroll>Scroll for a closer look ↓</span>
            </>
          }
        >
          <AboutSection />
        </GlyphPortal>
      ) : (
        <div role="status" style={{ height: "100svh", display: "grid", placeItems: "center", color: "var(--slate-muted)", background: "var(--warm-white)", fontSize: 13 }}>
          Loading type…
        </div>
      )}
    </div>
  );
}
