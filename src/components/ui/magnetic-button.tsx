'use client';

import * as React from 'react';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';

export type MagneticProps = React.HTMLAttributes<HTMLElement> & {
  as?: React.ElementType;
  href?: string;
  target?: string;
  rel?: string;
  type?: string;
  disabled?: boolean;
  'aria-label'?: string;
  'aria-expanded'?: boolean | string;
  'aria-haspopup'?: boolean | string;
  'aria-controls'?: string;
  'data-cursor-hover'?: boolean;
};

export const MagneticButton = React.forwardRef<HTMLElement, MagneticProps>(
  ({ className, children, as: Tag = 'button', ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (typeof window === 'undefined') return;
      const el = localRef.current;
      if (!el) return;

      const ctx = gsap.context(() => {
        const onMove = (e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          const x = e.clientX - r.left - r.width / 2;
          const y = e.clientY - r.top - r.height / 2;
          gsap.to(el, { x: x * 0.35, y: y * 0.35, scale: 1.04, ease: 'power2.out', duration: 0.4 });
        };
        const onLeave = () => {
          gsap.to(el, { x: 0, y: 0, scale: 1, ease: 'elastic.out(1,0.35)', duration: 1.1 });
        };
        el.addEventListener('mousemove', onMove as EventListener);
        el.addEventListener('mouseleave', onLeave);
        return () => {
          el.removeEventListener('mousemove', onMove as EventListener);
          el.removeEventListener('mouseleave', onLeave);
        };
      }, el);

      return () => ctx.revert();
    }, []);

    return (
      <Tag
        ref={(node: HTMLElement) => {
          (localRef as React.MutableRefObject<HTMLElement | null>).current = node;
          if (typeof forwardedRef === 'function') forwardedRef(node);
          else if (forwardedRef)
            (forwardedRef as React.MutableRefObject<HTMLElement | null>).current = node;
        }}
        className={cn('cursor-pointer', className)}
        {...props}
      >
        {children}
      </Tag>
    );
  }
);
MagneticButton.displayName = 'MagneticButton';
