'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { cn } from '@/lib/utils';

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let ticking = false;

    const updateVisibility = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY || document.documentElement.scrollTop;
          // Reveal once user scrolls past 350px
          setVisible(scrollY > 350);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial check
    updateVisibility();

    window.addEventListener('scroll', updateVisibility, { passive: true });

    // Also attach to Lenis smooth scroll instance if active
    let lenisUnsubscribe: (() => void) | undefined;
    const globalLenis = (
      window as unknown as {
        __lenis?: {
          on: (event: string, cb: () => void) => void;
          off: (event: string, cb: () => void) => void;
        };
      }
    ).__lenis;

    if (globalLenis) {
      globalLenis.on('scroll', updateVisibility);
      lenisUnsubscribe = () => {
        try {
          globalLenis.off('scroll', updateVisibility);
        } catch {
          // ignore
        }
      };
    }

    return () => {
      window.removeEventListener('scroll', updateVisibility);
      if (lenisUnsubscribe) {
        lenisUnsubscribe();
      }
    };
  }, []);

  const scrollToTop = () => {
    if (typeof window === 'undefined') return;

    const globalLenis = (
      window as unknown as {
        __lenis?: {
          scrollTo: (
            target: number | HTMLElement,
            opts?: { duration?: number; immediate?: boolean }
          ) => void;
        };
      }
    ).__lenis;

    if (globalLenis) {
      globalLenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        'fixed bottom-6 right-6 z-50 transition-all duration-300 ease-out',
        visible
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 translate-y-3 scale-90 pointer-events-none'
      )}
    >
      <MagneticButton
        as="button"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={cn(
          'group flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full',
          'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md',
          'border border-slate-200/80 dark:border-white/10 shadow-lg',
          'text-slate-800 dark:text-slate-100',
          'hover:text-brand-blue hover:border-brand-blue/40',
          'hover:-translate-y-0.5 hover:shadow-xl active:scale-95',
          'transition-all duration-300 focus-visible:outline-2 focus-visible:outline-brand-blue cursor-pointer'
        )}
      >
        <ArrowUp className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
      </MagneticButton>
    </div>
  );
}
