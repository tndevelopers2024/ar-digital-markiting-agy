"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { FlowButton } from "@/components/ui/flow-button";
import { ThemeToggle } from "./ThemeToggle";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      // Focus the close button when opened
      setTimeout(() => {
        firstFocusableRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Focus trap inside modal
  const handleTabKey = (e: React.KeyboardEvent) => {
    if (!dialogRef.current || e.key !== "Tab") return;

    const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement?.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement?.focus();
        e.preventDefault();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
      ref={dialogRef}
      onKeyDown={handleTabKey}
      className="fixed inset-0 z-50 flex flex-col justify-between bg-warm-white/95 backdrop-blur-xl px-6 py-8 md:hidden transition-all duration-300"
    >
      {/* Top Bar with Close Button */}
      <div className="flex items-center justify-between border-b border-border-subtle pb-6">
        <div className="flex items-center gap-2">
          <span className="font-display text-lg font-extrabold tracking-tight text-ink">
            AR <span className="text-brand-blue">DIGITAL</span>
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] px-2 py-0.5 rounded-full bg-brand-blue/10 text-brand-blue border border-brand-blue/20">
            Menu
          </span>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            ref={firstFocusableRef}
            onClick={onClose}
            type="button"
            aria-label="Close navigation menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle bg-white text-ink shadow-sm transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-brand-blue"
          >
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="my-auto flex flex-col space-y-4 py-8">
        {siteConfig.navLinks.map((link, index) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            style={{ transitionDelay: `${index * 50}ms` }}
            className="group flex items-center justify-between rounded-xl px-4 py-3 text-2xl font-display font-semibold tracking-tight text-ink transition-all hover:bg-white hover:text-brand-blue"
          >
            <span>{link.label}</span>
            <span className="text-xs font-mono uppercase tracking-widest text-slate-muted group-hover:text-brand-blue">
              0{index + 1}
            </span>
          </Link>
        ))}
      </nav>

      {/* Drawer Footer & Primary CTA */}
      <div className="flex flex-col gap-4 border-t border-border-subtle pt-6">
        <FlowButton text="Let's Talk" href="#inquiry" variant="light" className="w-full justify-center" onClick={onClose} />
        <p className="text-center text-xs text-slate-muted">
          Strategic Growth & Digital Performance
        </p>
      </div>
    </div>
  );
}
