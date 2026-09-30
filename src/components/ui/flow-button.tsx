'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { MagneticButton } from '@/components/ui/magnetic-button';

interface FlowButtonProps {
  text?: string;
  href?: string;
  onClick?: () => void;
  variant?: 'light' | 'dark'; // light = on warm-white bg, dark = on ink bg
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  external?: boolean;
  disabled?: boolean;
}

export function FlowButton({
  text = 'Get Started',
  href,
  onClick,
  variant = 'light',
  className = '',
  type = 'button',
  external = false,
  disabled = false,
}: FlowButtonProps) {
  const isLight = variant === 'light';

  const baseClass = [
    'group relative inline-flex items-center gap-1 overflow-hidden rounded-[100px]',
    'px-8 py-3 text-sm font-semibold cursor-pointer select-none',
    'transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)]',
    'hover:rounded-[12px] active:scale-[0.95]',
    'focus-visible:outline-2 focus-visible:outline-offset-2',
    isLight
      ? 'border-[1.5px] border-ink/30 bg-transparent text-ink focus-visible:outline-ink hover:border-transparent hover:text-white'
      : 'border-[1.5px] border-white/30 bg-transparent text-white focus-visible:outline-white hover:border-transparent hover:text-ink',
    disabled ? 'opacity-50 pointer-events-none' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const fillColor = isLight ? 'bg-ink' : 'bg-white';
  const arrowStroke = isLight ? 'stroke-ink' : 'stroke-white';
  const arrowHoverStroke = isLight ? 'group-hover:stroke-white' : 'group-hover:stroke-ink';

  const content = (
    <>
      {/* Left arrow — slides in from left on hover */}
      <ArrowRight
        className={[
          'absolute w-4 h-4 left-[-25%] fill-none z-[9]',
          arrowStroke,
          arrowHoverStroke,
          'transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]',
          'group-hover:left-4',
        ].join(' ')}
      />

      {/* Label text */}
      <span className="relative z-[1] -translate-x-3 group-hover:translate-x-3 transition-all duration-[800ms] ease-out">
        {text}
      </span>

      {/* Expanding circle fill */}
      <span
        className={[
          'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
          'w-4 h-4 rounded-[50%] opacity-0',
          fillColor,
          'group-hover:w-[220px] group-hover:h-[220px] group-hover:opacity-100',
          'transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)]',
        ].join(' ')}
      />

      {/* Right arrow — slides out to right on hover */}
      <ArrowRight
        className={[
          'absolute w-4 h-4 right-4 fill-none z-[9]',
          arrowStroke,
          arrowHoverStroke,
          'transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]',
          'group-hover:right-[-25%]',
        ].join(' ')}
      />
    </>
  );

  if (href) {
    return (
      <MagneticButton
        as={Link}
        href={href}
        className={baseClass}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
      </MagneticButton>
    );
  }

  return (
    <MagneticButton
      as="button"
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClass}
    >
      {content}
    </MagneticButton>
  );
}
