"use client";

import gsap from "gsap";
import type { MouseEvent, ReactNode, RefObject } from "react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";

/* -------------------------------------------------------------------------- */
/* Focus Trap Hook                                                            */
/* -------------------------------------------------------------------------- */

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

const isVisible = (element?: HTMLElement | null): boolean => {
  if (!element || element.hidden) return false;
  if (typeof window === "undefined") return false;

  const style = window.getComputedStyle(element);
  if (style.visibility === "hidden" || style.visibility === "collapse") {
    return false;
  }
  return element.getClientRects().length > 0;
};

const getFocusableElements = (container?: HTMLElement | null): HTMLElement[] => {
  if (!container) return [];
  return (
    Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)) as HTMLElement[]
  ).filter(isVisible);
};

export interface UseFocusTrapParams {
  active: boolean;
  containerRef: RefObject<HTMLElement | null>;
  initialFocusRef?: RefObject<HTMLElement | null>;
  onEscape?: () => void;
}

export function useFocusTrap({
  active,
  containerRef,
  initialFocusRef,
  onEscape,
}: UseFocusTrapParams) {
  const onEscapeRef = useRef(onEscape);
  onEscapeRef.current = onEscape;

  useEffect(() => {
    if (!active || typeof window === "undefined") return;

    const container = containerRef.current;
    if (!container) return;

    const previouslyFocused =
      typeof document !== "undefined" && document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const focusInitial = () => {
      const target =
        initialFocusRef?.current ??
        getFocusableElements(container)[0] ??
        container;

      if (!(target instanceof HTMLElement)) return;

      if (target === container && !container.hasAttribute("tabindex")) {
        container.setAttribute("tabindex", "-1");
      }
      target.focus();
    };

    const focusFrame = requestAnimationFrame(focusInitial);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onEscapeRef.current?.();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = getFocusableElements(container);
      if (!focusable.length) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey) {
        if (activeElement === first || !container.contains(activeElement)) {
          event.preventDefault();
          last.focus();
        }
        return;
      }

      if (activeElement === last || !container.contains(activeElement)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", onKeyDown);
      if (previouslyFocused && typeof document !== "undefined" && document.contains(previouslyFocused)) {
        previouslyFocused.focus();
      }
    };
  }, [active, containerRef, initialFocusRef]);
}

/* -------------------------------------------------------------------------- */
/* Clip Path Geometries                                                       */
/* -------------------------------------------------------------------------- */

const CLIPS = {
  bottom: {
    closedInitial: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
    open: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    closedFinal: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
  },
  top: {
    closedInitial: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
    open: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    closedFinal: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
  },
  left: {
    closedInitial: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
    open: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    closedFinal: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
  },
  right: {
    closedInitial: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
    open: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    closedFinal: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
  },
};

const REDUCED_MOTION_FADE_DURATION = 0.2;

/* -------------------------------------------------------------------------- */
/* Social Icons SVG Registry                                                  */
/* -------------------------------------------------------------------------- */

const SOCIAL_ICONS: Record<string, ReactNode> = {
  instagram: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 transition-transform duration-200 hover:scale-110">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  ),
  facebook: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 transition-transform duration-200 hover:scale-110">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
    </svg>
  ),
  twitter: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 transition-transform duration-200 hover:scale-110">
      <path d="M4 4l11.733 16h4.267l-11.733 -16z"></path>
      <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
    </svg>
  ),
  linkedin: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 transition-transform duration-200 hover:scale-110">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
      <rect x="2" y="9" width="4" height="12"></rect>
      <circle cx="4" cy="4" r="2"></circle>
    </svg>
  ),
  github: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 transition-transform duration-200 hover:scale-110">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
  ),
};

/* -------------------------------------------------------------------------- */
/* Types & Interfaces                                                         */
/* -------------------------------------------------------------------------- */

export interface FullscreenNavLink {
  label: string;
  href: string;
}

export interface CustomNavbarSocial {
  type: string;
  href: string;
}

export interface CustomNavbarProps {
  links?: FullscreenNavLink[];
  images?: string[];
  agencyName?: string;
  socials?: CustomNavbarSocial[];
  location?: string;
  tagline?: string;
  isOpen?: boolean;
  overlayBg?: string;
  delay?: number;
  linkOffsetY?: number;
  linkDuration?: number;
  linkStagger?: number;
  imageStartScale?: number;
  imageDuration?: number;
  imageStagger?: number;
  socialOffsetY?: number;
  socialDuration?: number;
  socialStagger?: number;
  onLinkClick?: () => void;
}

export interface FullscreenNavProps {
  isOpen?: boolean;
  defaultOpen?: boolean;
  showTrigger?: boolean;
  links?: FullscreenNavLink[];
  brand?: string | ReactNode;
  brandHref?: string;
  brandLogo?: ReactNode;
  clipOrigin?: keyof typeof CLIPS;
  overlayBg?: string;
  linkColor?: string;
  linkHoverColor?: string;
  linkSizeClass?: string;
  headerClassName?: string;
  openDuration?: number;
  closeDuration?: number;
  ease?: string;
  headerOpenColor?: string;
  onOpen?: () => void;
  onClose?: () => void;
  children?: (isOpen: boolean, closeMenu: () => void) => ReactNode;
}

export interface ImmersiveFullscreenNavProps {
  navConfig?: Partial<FullscreenNavProps>;
  navContent?: Partial<CustomNavbarProps>;
  overlayBg?: string;
  headerOpenColor?: string;
  linkColor?: string;
  linkHoverColor?: string;
  ease?: string;
  clipOrigin?: "top" | "bottom" | "left" | "right";
  openDuration?: number;
  closeDuration?: number;
  linkDuration?: number;
  linkStagger?: number;
  linkOffsetY?: number;
  imageDuration?: number;
  imageStagger?: number;
  imageStartScale?: number;
  socialDuration?: number;
  socialStagger?: number;
  socialOffsetY?: number;
  heroContent?: ReactNode;
}

/* -------------------------------------------------------------------------- */
/* Unsplash Photography Defaults (High Availability, Fast CDN)                */
/* -------------------------------------------------------------------------- */

const DEFAULT_NAV_IMAGES = [
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80",
];

const DEFAULT_NAV_LINKS: FullscreenNavLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#clients" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const DEFAULT_NAV_SOCIALS: CustomNavbarSocial[] = [
  { type: "instagram", href: "https://instagram.com" },
  { type: "facebook", href: "https://facebook.com" },
  { type: "twitter", href: "https://twitter.com" },
  { type: "linkedin", href: "https://linkedin.com" },
];

/* -------------------------------------------------------------------------- */
/* CustomNavbar Component (Overlay Content)                                   */
/* -------------------------------------------------------------------------- */

export function CustomNavbar({
  links = DEFAULT_NAV_LINKS,
  images = DEFAULT_NAV_IMAGES,
  agencyName = "AR MARKETING",
  socials = DEFAULT_NAV_SOCIALS,
  location = "Global / Remote",
  tagline = "Strategic Growth & Digital Performance",
  isOpen = false,
  overlayBg = "#0a0f1d",
  delay = 1.0,
  linkOffsetY = 30,
  linkDuration = 0.8,
  linkStagger = 0.07,
  imageStartScale = 0.8,
  imageDuration = 0.9,
  imageStagger = 0.03,
  socialOffsetY = 14,
  socialDuration = 0.5,
  socialStagger = 0.06,
  onLinkClick,
}: CustomNavbarProps) {
  const linksRef = useRef<(HTMLDivElement | null)[]>([]);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const socialsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const agencyRef = useRef<HTMLDivElement | null>(null);
  const taglineRef = useRef<HTMLParagraphElement | null>(null);
  const locationRef = useRef<HTMLDivElement | null>(null);

  const reduceMotion = () =>
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches === true;

  const killAllTweens = () => {
    gsap.killTweensOf([
      ...linksRef.current.filter(Boolean),
      ...imagesRef.current.filter(Boolean),
      ...socialsRef.current.filter(Boolean),
      agencyRef.current,
      taglineRef.current,
      locationRef.current,
    ]);
  };

  const resetAnimatedElements = () => {
    gsap.set(linksRef.current.filter(Boolean), { y: linkOffsetY, opacity: 0 });
    gsap.set(imagesRef.current.filter(Boolean), { scale: 0.7, opacity: 0 });
    gsap.set(socialsRef.current.filter(Boolean), { y: socialOffsetY, opacity: 0 });
    if (agencyRef.current) gsap.set(agencyRef.current, { y: -12, opacity: 0 });
    if (taglineRef.current) gsap.set(taglineRef.current, { y: -12, opacity: 0 });
    if (locationRef.current) gsap.set(locationRef.current, { y: 10, opacity: 0 });
  };

  useEffect(() => {
    killAllTweens();

    if (!isOpen) return;

    resetAnimatedElements();

    if (reduceMotion()) {
      gsap.set(agencyRef.current, { y: 0, opacity: 1 });
      gsap.set(taglineRef.current, { y: 0, opacity: 1 });
      gsap.set(linksRef.current.filter(Boolean), { y: 0, opacity: 1 });
      gsap.set(imagesRef.current.filter(Boolean), { scale: 1, opacity: 1 });
      gsap.set(socialsRef.current.filter(Boolean), { y: 0, opacity: 1 });
      gsap.set(locationRef.current, { y: 0, opacity: 1 });
      return;
    }

    const animationDelay = Math.max(delay - 0.2, 0);

    if (agencyRef.current) {
      gsap.fromTo(
        agencyRef.current,
        { y: -12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: animationDelay }
      );
    }

    if (taglineRef.current) {
      gsap.fromTo(
        taglineRef.current,
        { y: -12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          delay: animationDelay + 0.08,
        }
      );
    }

    const activeLinks = linksRef.current.filter(Boolean);
    if (activeLinks.length) {
      gsap.fromTo(
        activeLinks,
        { y: linkOffsetY, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: linkDuration,
          ease: "power2.out",
          stagger: linkStagger,
          delay: animationDelay,
        }
      );
    }

    const activeImages = imagesRef.current.filter(Boolean);
    if (activeImages.length) {
      gsap.fromTo(
        activeImages,
        { scale: imageStartScale, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: imageDuration,
          ease: "power3.out",
          stagger: imageStagger,
          delay: animationDelay + 0.1,
        }
      );
    }

    const activeSocials = socialsRef.current.filter(Boolean);
    if (activeSocials.length) {
      gsap.fromTo(
        activeSocials,
        { y: socialOffsetY, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: socialDuration,
          ease: "power2.out",
          stagger: socialStagger,
          delay: animationDelay + 0.2,
        }
      );
    }

    if (locationRef.current) {
      gsap.fromTo(
        locationRef.current,
        { y: 10, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          delay: animationDelay + 0.25,
        }
      );
    }

    return () => killAllTweens();
  }, [
    delay,
    imageDuration,
    imageStagger,
    imageStartScale,
    isOpen,
    linkDuration,
    linkOffsetY,
    linkStagger,
    socialDuration,
    socialOffsetY,
    socialStagger,
  ]);

  return (
    <div
      style={{ backgroundColor: overlayBg }}
      className="relative flex h-full w-full flex-col justify-between overflow-y-auto px-6 py-12 pt-28 text-white sm:px-12 md:px-20 lg:px-28"
    >
      {/* Top Meta Details */}
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-6">
        <div ref={agencyRef} className="flex flex-col">
          <span className="font-display text-xl font-black tracking-tight text-white sm:text-2xl">
            {agencyName}
          </span>
          <p ref={taglineRef} className="text-xs uppercase tracking-[0.2em] text-white/60">
            {tagline}
          </p>
        </div>
        <div ref={locationRef} className="text-right text-xs font-mono tracking-wider text-white/50">
          LOCATION: <span className="text-white/80">{location}</span>
        </div>
      </div>

      {/* Main Navigation & Image Grid */}
      <div className="my-auto flex flex-col justify-between gap-10 py-8 lg:flex-row lg:items-center">
        {/* Links Column */}
        <nav aria-label="Fullscreen Navigation Links" className="flex flex-col gap-2 sm:gap-4">
          {links.map((link, index) => (
            <div
              key={link.label}
              ref={(el) => {
                linksRef.current[index] = el;
              }}
              className="group flex items-baseline gap-4"
            >
              <span className="font-mono text-xs font-medium text-white/30 transition-colors group-hover:text-brand-blue">
                0{index + 1}
              </span>
              <Link
                href={link.href}
                onClick={onLinkClick}
                className="font-display text-4xl font-extrabold tracking-tight text-white transition-all duration-300 hover:translate-x-3 hover:text-white/70 sm:text-5xl md:text-6xl lg:text-7xl"
              >
                {link.label}
              </Link>
            </div>
          ))}
        </nav>

        {/* Visual Showcase Gallery */}
        <div className="flex flex-col items-start gap-4 lg:items-end">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
            Featured Highlights
          </span>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {images.slice(0, 4).map((src, index) => (
              <div
                key={index}
                ref={(el) => {
                  imagesRef.current[index] = el;
                }}
                className="group relative h-24 w-36 overflow-hidden rounded-xl border border-white/10 bg-white/5 sm:h-32 sm:w-48 md:h-36 md:w-56"
              >
                <img
                  src={src}
                  alt={`Navigation showcase preview ${index + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Social Strip */}
      <div className="flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-6">
        <span className="text-xs text-white/40">
          &copy; {new Date().getFullYear()} {agencyName}. All rights reserved.
        </span>
        <div className="flex items-center gap-5">
          {socials.map((social, index) => {
            const key = social.type.toLowerCase();
            const icon = SOCIAL_ICONS[key] || (
              <span className="text-xs font-mono uppercase tracking-wider text-white/70">
                {social.type}
              </span>
            );
            return (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                ref={(el) => {
                  socialsRef.current[index] = el;
                }}
                aria-label={social.type}
                className="text-white/60 transition-colors hover:text-white"
              >
                {icon}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* FullscreenNav Container Component                                          */
/* -------------------------------------------------------------------------- */

export function FullscreenNav({
  isOpen: controlledIsOpen,
  defaultOpen = false,
  showTrigger = true,
  links = DEFAULT_NAV_LINKS,
  brand = "AR MARKETING",
  brandHref = "/",
  brandLogo,
  clipOrigin = "bottom",
  overlayBg = "#0a0f1d",
  linkColor = "#ffffff",
  linkHoverColor = "#93c5fd",
  linkSizeClass = "text-5xl",
  headerClassName = "",
  openDuration = 1.2,
  closeDuration = 1.2,
  ease = "power4.inOut",
  headerOpenColor = "#ffffff",
  onOpen,
  onClose,
  children,
}: FullscreenNavProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalOpen;
  const overlayRef = useRef<HTMLElement | null>(null);
  const linksWrapperRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | gsap.core.Tween | null>(null);
  const isAnimatingRef = useRef(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);

  const reduceMotion = () =>
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches === true;

  const { closedInitial, open: openClipPath, closedFinal } =
    CLIPS[clipOrigin] ?? CLIPS.bottom;
  const isReducedMotion = reduceMotion();

  const onOpenMenu = () => {
    setInternalOpen(true);
    timelineRef.current?.kill();

    if (!overlayRef.current || !linksWrapperRef.current) return;

    gsap.set(overlayRef.current, { clipPath: closedInitial });
    gsap.set(linksWrapperRef.current, { opacity: 1, scale: 1 });

    if (isReducedMotion) {
      gsap.set(overlayRef.current, {
        clipPath: openClipPath,
        autoAlpha: 0,
      });

      timelineRef.current = gsap.to(overlayRef.current, {
        autoAlpha: 1,
        duration: REDUCED_MOTION_FADE_DURATION,
        ease: "power2.out",
        onStart: () => {
          isAnimatingRef.current = true;
        },
        onComplete: () => {
          isAnimatingRef.current = false;
          onOpen?.();
        },
      });
      return;
    }

    const timeline = gsap.timeline({
      onStart: () => {
        isAnimatingRef.current = true;
      },
      onComplete: () => {
        isAnimatingRef.current = false;
        onOpen?.();
      },
    });

    timelineRef.current = timeline;

    timeline.to(overlayRef.current, {
      clipPath: openClipPath,
      duration: openDuration,
      delay: 0.15,
      ease,
    });
  };

  const onCloseMenu = () => {
    timelineRef.current?.kill();

    if (!overlayRef.current || !linksWrapperRef.current) {
      setInternalOpen(false);
      onClose?.();
      return;
    }

    if (isReducedMotion) {
      gsap.set(linksWrapperRef.current, { scale: 1, opacity: 1 });

      timelineRef.current = gsap.to(overlayRef.current, {
        autoAlpha: 0,
        duration: REDUCED_MOTION_FADE_DURATION,
        ease: "power2.out",
        onStart: () => {
          isAnimatingRef.current = true;
        },
        onComplete: () => {
          isAnimatingRef.current = false;
          setInternalOpen(false);
          if (overlayRef.current) {
            gsap.set(overlayRef.current, { clipPath: closedFinal });
          }
          onClose?.();
        },
      });
      return;
    }

    const timeline = gsap.timeline({
      onStart: () => {
        isAnimatingRef.current = true;
      },
      onComplete: () => {
        isAnimatingRef.current = false;
        setInternalOpen(false);
        onClose?.();
      },
    });

    timelineRef.current = timeline;

    timeline
      .to(linksWrapperRef.current, {
        scale: 0.95,
        opacity: 0.4,
        duration: 0.5,
        ease: "power2.in",
      })
      .to(
        overlayRef.current,
        {
          clipPath: closedFinal,
          duration: closeDuration,
          ease,
        },
        "<"
      );
  };

  useEffect(() => {
    if (controlledIsOpen !== undefined) {
      if (controlledIsOpen && !internalOpen) {
        onOpenMenu();
      } else if (!controlledIsOpen && internalOpen) {
        onCloseMenu();
      }
    }
  }, [controlledIsOpen]);

  const onToggleMenu = () => {
    if (isAnimatingRef.current) return;
    if (isOpen) {
      onCloseMenu();
    } else {
      onOpenMenu();
    }
  };

  const onLinkMouseEnter = (event: MouseEvent<HTMLAnchorElement>) => {
    event.currentTarget.style.color = linkHoverColor;
  };

  const onLinkMouseLeave = (event: MouseEvent<HTMLAnchorElement>) => {
    event.currentTarget.style.color = linkColor;
  };

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    return () => {
      timelineRef.current?.kill();
    };
  }, []);

  useFocusTrap({
    active: isOpen,
    containerRef: rootRef,
    initialFocusRef: toggleButtonRef,
    onEscape: onCloseMenu,
  });

  return (
    <div ref={rootRef} className="relative z-50">
      {/* Fixed Sticky Header Trigger Bar */}
      {showTrigger && (
        <header
          className={cn(
            "fixed top-0 left-0 right-0 z-50 flex h-20 items-center justify-between px-6 transition-colors duration-300 md:px-12",
            headerClassName
          )}
        >
          <Link
            href={brandHref}
            className="flex items-center gap-3 transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-brand-blue"
            aria-label={typeof brand === "string" ? brand : "Home"}
            onClick={() => {
              if (isOpen) onCloseMenu();
            }}
          >
            {brandLogo ? (
              brandLogo
            ) : (
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-blue font-display font-extrabold text-white shadow-md">
                  AR
                </div>
                <span
                  className={cn(
                    "font-display text-base font-extrabold tracking-tight transition-colors duration-300 sm:text-lg",
                    isOpen ? "text-white" : "text-ink"
                  )}
                >
                  {brand}
                </span>
              </div>
            )}
          </Link>

          {/* Action controls */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {/* Animated Hamburger Toggle Button */}
            <button
              ref={toggleButtonRef}
              type="button"
              data-testid="immersive-nav-toggle"
              onClick={onToggleMenu}
              aria-label={isOpen ? "Close full screen navigation" : "Open full screen navigation"}
              aria-expanded={isOpen}
              className="flex h-11 w-11 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-full border border-border-subtle bg-warm-white/80 p-2.5 backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-brand-blue dark:border-white/10 dark:bg-white/10"
            >
              <span
                style={{ backgroundColor: isOpen ? headerOpenColor : undefined }}
                className={cn(
                  "block h-0.5 w-full rounded-full transition-all duration-500 ease-in-out",
                  isOpen ? "translate-y-2 rotate-45 bg-white" : "bg-ink"
                )}
              />
              <span
                style={{ backgroundColor: isOpen ? headerOpenColor : undefined }}
                className={cn(
                  "block h-0.5 w-full rounded-full transition-all duration-300",
                  isOpen ? "scale-x-0 opacity-0" : "bg-ink"
                )}
              />
              <span
                style={{ backgroundColor: isOpen ? headerOpenColor : undefined }}
                className={cn(
                  "block h-0.5 w-full rounded-full transition-all duration-500 ease-in-out",
                  isOpen ? "-translate-y-2 -rotate-45 bg-white" : "bg-ink"
                )}
              />
            </button>
          </div>
        </header>
      )}

      {/* Fullscreen Overlay Nav */}
      <nav
        ref={overlayRef}
        style={{ clipPath: closedInitial, backgroundColor: overlayBg }}
        className={cn(
          "fixed inset-0 z-40 flex flex-col items-center justify-center transition-opacity duration-300",
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        aria-hidden={!isOpen}
        role="navigation"
        aria-label="Full Screen Overlay Navigation"
      >
        {!showTrigger && isOpen && (
          <button
            type="button"
            onClick={onCloseMenu}
            aria-label="Close navigation overlay"
            className="absolute top-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-brand-blue"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        <div
          ref={linksWrapperRef}
          className="h-full w-full"
        >
          {children ? (
            children(isOpen, onCloseMenu)
          ) : (
            <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
              {links.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={onCloseMenu}
                  tabIndex={isOpen ? 0 : -1}
                  style={{ color: linkColor }}
                  onMouseEnter={onLinkMouseEnter}
                  onMouseLeave={onLinkMouseLeave}
                  className={cn(
                    linkSizeClass,
                    "font-display font-extrabold tracking-tight transition-colors duration-200 hover:scale-105"
                  )}
                >
                  {label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Main Immersive Full Screen Nav Combined Component                          */
/* -------------------------------------------------------------------------- */

const DEFAULT_CONFIG: Partial<FullscreenNavProps> = {
  brand: "AR MARKETING",
  brandHref: "/",
  clipOrigin: "bottom",
  overlayBg: "#0a0f1d",
  headerOpenColor: "#ffffff",
  openDuration: 1.1,
  closeDuration: 1.1,
};

const DEFAULT_CONTENT: Partial<CustomNavbarProps> = {
  agencyName: "AR DIGITAL MARKETING",
  tagline: "Strategic Growth & Digital Performance",
  location: "Global / Remote",
  links: DEFAULT_NAV_LINKS,
  images: DEFAULT_NAV_IMAGES,
  socials: DEFAULT_NAV_SOCIALS,
};

export default function ImmersiveFullscreenNav({
  navConfig = DEFAULT_CONFIG,
  navContent = DEFAULT_CONTENT,
  heroContent,
  ...props
}: ImmersiveFullscreenNavProps) {
  const {
    overlayBg,
    headerOpenColor,
    linkColor,
    linkHoverColor,
    ease,
    clipOrigin,
    openDuration,
    closeDuration,
    linkDuration,
    linkStagger,
    linkOffsetY,
    imageDuration,
    imageStagger,
    imageStartScale,
    socialDuration,
    socialStagger,
    socialOffsetY,
  } = props;

  const config: FullscreenNavProps = {
    ...DEFAULT_CONFIG,
    ...navConfig,
    ...(overlayBg !== undefined ? { overlayBg } : {}),
    ...(headerOpenColor !== undefined ? { headerOpenColor } : {}),
    ...(linkColor !== undefined ? { linkColor } : {}),
    ...(linkHoverColor !== undefined ? { linkHoverColor } : {}),
    ...(ease !== undefined ? { ease } : {}),
    ...(clipOrigin !== undefined ? { clipOrigin } : {}),
    ...(openDuration !== undefined ? { openDuration } : {}),
    ...(closeDuration !== undefined ? { closeDuration } : {}),
  };

  const content: CustomNavbarProps = {
    ...DEFAULT_CONTENT,
    ...navContent,
    ...(linkDuration !== undefined ? { linkDuration } : {}),
    ...(linkStagger !== undefined ? { linkStagger } : {}),
    ...(linkOffsetY !== undefined ? { linkOffsetY } : {}),
    ...(imageDuration !== undefined ? { imageDuration } : {}),
    ...(imageStagger !== undefined ? { imageStagger } : {}),
    ...(imageStartScale !== undefined ? { imageStartScale } : {}),
    ...(socialDuration !== undefined ? { socialDuration } : {}),
    ...(socialStagger !== undefined ? { socialStagger } : {}),
    ...(socialOffsetY !== undefined ? { socialOffsetY } : {}),
  };

  return (
    <>
      <FullscreenNav {...config}>
        {(isOpen, closeMenu) => (
          <CustomNavbar
            {...content}
            isOpen={isOpen}
            overlayBg={config.overlayBg}
            delay={config.openDuration ?? 1.1}
            onLinkClick={closeMenu}
          />
        )}
      </FullscreenNav>

      {heroContent ? (
        heroContent
      ) : null}
    </>
  );
}
