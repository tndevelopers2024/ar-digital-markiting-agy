'use client';

import { useEffect, useState } from 'react';
import { MagneticButton } from '@/components/ui/magnetic-button';

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setVisible(window.scrollY > 500);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollUp = () => {
    if (typeof window !== 'undefined') {
      const globalLenis = (window as unknown as { __lenis?: { scrollTo: (target: number, opts?: { duration?: number }) => void } }).__lenis;
      if (globalLenis) {
        globalLenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <div
      aria-hidden={!visible}
      className={`fixed bottom-8 right-8 z-30 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
        visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      {/* Double-Bezel outer shell */}
      <div className="rounded-full p-[3px] ring-1 ring-ink/[0.08] bg-ink/[0.03]">
        {/* Inner core */}
        <MagneticButton
          onClick={scrollUp}
          aria-label="Scroll to top"
          className="group flex h-11 w-11 items-center justify-center rounded-full
                     bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]
                     ring-1 ring-ink/[0.05]
                     transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]
                     hover:scale-105 hover:ring-brand-blue/30 hover:bg-brand-blue/5
                     active:scale-95 cursor-pointer"
        >
          <svg
            className="h-4 w-4 text-ink transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-0.5 group-hover:text-brand-blue"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
        </MagneticButton>
      </div>
    </div>
  );
}
