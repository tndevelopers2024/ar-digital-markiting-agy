'use client';

import { useEffect, useRef, useState } from 'react';

const INTERACTIVE_SELECTORS = [
  'a',
  'button',
  '[role="button"]',
  '[role="link"]',
  '[role="tab"]',
  '[role="menuitem"]',
  '[role="switch"]',
  'label',
  '[data-cursor-hover]',
  'select',
  'summary',
  '.cursor-pointer',
  'input[type="button"]',
  'input[type="submit"]',
  'input[type="reset"]',
  'input[type="checkbox"]',
  'input[type="radio"]',
].join(', ');

const TEXT_INPUT_SELECTORS = [
  'input:not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="checkbox"]):not([type="radio"]):not([type="hidden"])',
  'textarea',
  '[contenteditable="true"]',
].join(', ');

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const hasMoved = useRef(false);
  const rafRef = useRef<number>(0);

  const [isHovering, setIsHovering] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isOverText, setIsOverText] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);

  useEffect(() => {
    // Check if the current device has a fine pointer (mouse/trackpad) and hover support
    const fineMedia = window.matchMedia('(pointer: fine)');
    const hoverMedia = window.matchMedia('(hover: hover)');

    const evaluatePointer = () => {
      setIsFinePointer(fineMedia.matches && hoverMedia.matches);
    };

    evaluatePointer();

    if (fineMedia.addEventListener) {
      fineMedia.addEventListener('change', evaluatePointer);
      hoverMedia.addEventListener('change', evaluatePointer);
    } else {
      fineMedia.addListener(evaluatePointer);
      hoverMedia.addListener(evaluatePointer);
    }

    return () => {
      if (fineMedia.removeEventListener) {
        fineMedia.removeEventListener('change', evaluatePointer);
        hoverMedia.removeEventListener('change', evaluatePointer);
      } else {
        fineMedia.removeListener(evaluatePointer);
        hoverMedia.removeListener(evaluatePointer);
      }
    };
  }, []);

  useEffect(() => {
    if (!isFinePointer) return;

    const isInteractive = (el: Element | null): boolean => {
      if (!el) return false;
      // Skip disabled elements
      if (el.hasAttribute('disabled') || el.getAttribute('aria-disabled') === 'true') {
        return false;
      }
      const interactiveParent = el.closest(INTERACTIVE_SELECTORS);
      if (interactiveParent) {
        if (
          interactiveParent.hasAttribute('disabled') ||
          interactiveParent.getAttribute('aria-disabled') === 'true'
        ) {
          return false;
        }
        return true;
      }
      try {
        const style = window.getComputedStyle(el);
        if (style.cursor === 'pointer') return true;
      } catch {
        // Safe fallback
      }
      return false;
    };

    const isTextInput = (el: Element | null): boolean => {
      if (!el) return false;
      return !!el.closest(TEXT_INPUT_SELECTORS);
    };

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };

      if (!hasMoved.current) {
        hasMoved.current = true;
        ring.current = { x: e.clientX, y: e.clientY };
        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        }
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      setIsVisible(true);

      const target = e.target as Element | null;
      setIsOverText(isTextInput(target));
      setIsHovering(isInteractive(target));
    };

    const onDown = () => setIsPressed(true);
    const onUp = () => setIsPressed(false);

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      setIsOverText(isTextInput(target));
      if (isInteractive(target)) {
        setIsHovering(true);
      }
    };

    const onOut = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const related = e.relatedTarget as Element | null;

      const currentInteractive = target?.closest(INTERACTIVE_SELECTORS);
      if (currentInteractive && related && currentInteractive.contains(related)) {
        return;
      }
      if (isInteractive(related)) {
        setIsHovering(true);
        return;
      }
      setIsHovering(false);
      setIsOverText(isTextInput(related));
    };

    const onMouseLeave = () => {
      setIsVisible(false);
      setIsHovering(false);
      setIsPressed(false);
      setIsOverText(false);
    };

    const onMouseEnter = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!hasMoved.current) {
        hasMoved.current = true;
        ring.current = { x: e.clientX, y: e.clientY };
      }
      setIsVisible(true);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
      const target = e.target as Element | null;
      setIsOverText(isTextInput(target));
      setIsHovering(isInteractive(target));
    };

    let scrollTicking = false;
    const onScroll = () => {
      if (!hasMoved.current || scrollTicking) return;
      scrollTicking = true;
      requestAnimationFrame(() => {
        const target = document.elementFromPoint(mouse.current.x, mouse.current.y);
        setIsOverText(isTextInput(target));
        setIsHovering(isInteractive(target));
        scrollTicking = false;
      });
    };

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    const loop = () => {
      if (hasMoved.current) {
        ring.current.x = lerp(ring.current.x, mouse.current.x, 0.15);
        ring.current.y = lerp(ring.current.y, mouse.current.y, 0.15);
        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`;
        }
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mouseout', onOut, { passive: true });
    document.documentElement.addEventListener('mouseleave', onMouseLeave);
    document.documentElement.addEventListener('mouseenter', onMouseEnter);
    window.addEventListener('blur', onMouseLeave);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      document.documentElement.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('blur', onMouseLeave);
      window.removeEventListener('scroll', onScroll);
    };
  }, [isFinePointer]);

  if (!isFinePointer) return null;

  return (
    <>
      {/* ── Creative Center Dot with Breathing Glow & Micro-burst feedback ── */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 z-[9999] pointer-events-none select-none"
        style={{ willChange: 'transform' }}
      >
        <div
          className={`relative -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-200 ease-out ${
            !isVisible || isOverText ? 'opacity-0 scale-0' : 'opacity-100'
          }`}
        >
          {/* Ambient Breathing Halo Ring */}
          <span
            className={`absolute rounded-full transition-all duration-500 ease-out pointer-events-none ${
              isHovering
                ? 'h-6 w-6 bg-brand-blue/20 ring-1 ring-brand-blue/40 scale-125 animate-ping duration-1000'
                : 'h-4 w-4 bg-brand-blue/15 animate-beacon'
            } ${isPressed ? 'scale-150 opacity-40' : ''}`}
          />

          {/* Target Ping Aura on Interactive Hover */}
          <span
            className={`absolute rounded-full border border-brand-blue/40 transition-all duration-300 ease-out ${
              isHovering
                ? 'h-5 w-5 scale-100 opacity-80 animate-pulse'
                : 'h-2 w-2 scale-50 opacity-0'
            } ${isPressed ? 'scale-75' : ''}`}
          />

          {/* Core Luminous Dot with Elastic Recoil on Click */}
          <span
            className={`relative rounded-full transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
              isHovering
                ? 'h-2 w-2 bg-brand-blue shadow-[0_0_10px_rgba(40,88,165,0.7),0_0_0_1px_rgba(255,255,255,0.8)]'
                : 'h-1.5 w-1.5 bg-ink dark:bg-white shadow-[0_0_0_1px_rgba(255,255,255,0.6),0_1px_3px_rgba(0,0,0,0.3)]'
            } ${
              isPressed
                ? 'scale-[1.8] !bg-brand-red shadow-[0_0_12px_rgba(206,32,40,0.8)]'
                : 'scale-100'
            }`}
          />
        </div>
      </div>

      {/* ── Outer Follower Ring — smoothly lerps behind cursor ── */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 z-[9998] pointer-events-none select-none"
        style={{ willChange: 'transform' }}
      >
        <div
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-300 ease-out ${
            !isVisible || isOverText ? 'opacity-0 scale-50' : 'opacity-100'
          } ${
            isHovering
              ? 'w-11 h-11 border-brand-blue/80 bg-brand-blue/8 shadow-[0_0_15px_rgba(40,88,165,0.15)] scale-100'
              : 'w-7 h-7 border-ink/25 dark:border-white/35 shadow-[0_0_0_1px_rgba(255,255,255,0.12)] bg-transparent scale-100'
          } ${isPressed ? 'scale-[0.8] border-brand-red/50' : ''}`}
        />
      </div>
    </>
  );
}
