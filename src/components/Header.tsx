"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { MobileNav } from "./MobileNav";
import { MagneticButton } from "@/components/ui/magnetic-button";
import ImmersiveFullscreenNav, { FullscreenNav, CustomNavbar } from "@/components/ui/immersive-full-screen-nav";
import { ThemeToggle } from "./ThemeToggle";

export interface HeaderProps {
  variant?: "standard" | "immersive";
}

export function Header({ variant = "standard" }: HeaderProps = {}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [immersiveMenuOpen, setImmersiveMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [activeService, setActiveService] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  if (variant === "immersive") {
    return (
      <ImmersiveFullscreenNav
        overlayBg="#0a0f1d"
        clipOrigin="bottom"
        navConfig={{
          brand: "AR MARKETING",
          brandHref: "/",
        }}
        navContent={{
          agencyName: "AR DIGITAL MARKETING",
          tagline: "Strategic Growth & Digital Performance",
          links: [
            { label: "Home", href: "/" },
            { label: "Services", href: "/#services" },
            { label: "Work", href: "/#clients" },
            { label: "About", href: "/about" },
            { label: "Contact", href: "/contact" },
          ],
        }}
      />
    );
  }

  const openServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };

  const closeServices = () => {
    closeTimer.current = setTimeout(() => setServicesOpen(false), 120);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border-subtle bg-warm-white/90 backdrop-blur-md transition-colors duration-200">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-3.5 focus-visible:outline-2 focus-visible:outline-brand-blue rounded-lg py-1 px-1.5 -ml-1.5 transition-opacity hover:opacity-90"
            aria-label="AR Digital Marketing Home"
          >
            <div className="relative flex h-10 w-[72px] flex-shrink-0 items-center justify-center transition-transform duration-300 ease-out group-hover:scale-[1.03]">
              <Image
                src="/logo/ar-mark.svg"
                alt="AR Digital Marketing Vector Mark"
                width={72}
                height={40}
                priority
                className="h-full w-auto object-contain"
                style={{ width: "auto", height: "auto" }}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-base sm:text-lg font-extrabold tracking-tight text-ink leading-tight">
                AR <span className="text-brand-blue">MARKETING</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.24em] font-medium text-slate-muted">
                Digital Agency
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Main Navigation">
            {siteConfig.navLinks.map((item) => {
              if (item.label === "Services") {
                return (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={openServices}
                    onMouseLeave={closeServices}
                  >
                    {/* Services trigger */}
                    <MagneticButton
                      type="button"
                      data-cursor-hover
                      aria-haspopup="true"
                      aria-expanded={servicesOpen}
                      onClick={() => setServicesOpen((v) => !v)}
                      className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-display text-sm font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-brand-blue ${
                        servicesOpen
                          ? "bg-ink text-white"
                          : "text-slate-muted hover:text-ink border border-transparent hover:border-border-subtle hover:bg-white"
                      }`}
                    >
                      Services
                      <svg
                        className={`h-3.5 w-3.5 flex-shrink-0 transition-transform duration-300 ${servicesOpen ? "rotate-180" : "rotate-0"}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                      </svg>
                    </MagneticButton>

                    {/* Dropdown panel */}
                    <div
                      role="menu"
                      aria-label="Services menu"
                      onMouseEnter={openServices}
                      onMouseLeave={closeServices}
                      className={`absolute left-0 top-full mt-2 w-72 rounded-2xl border border-border-subtle bg-warm-white shadow-xl shadow-ink/[0.06] transition-all duration-200 origin-top-left pointer-events-auto ${
                        servicesOpen
                          ? "opacity-100 scale-100 translate-y-0"
                          : "opacity-0 scale-[0.97] -translate-y-1 pointer-events-none"
                      }`}
                    >
                      {/* Panel header */}
                      <div className="px-4 pt-4 pb-3 border-b border-border-subtle">
                        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-brand-blue">
                          Our Services
                        </span>
                      </div>

                      {/* Service list */}
                      <ul className="py-2" role="none">
                        {siteConfig.services.map((service) => (
                          <li key={service.id} role="none">
                            <Link
                              href="#services"
                              role="menuitem"
                              onClick={() => setServicesOpen(false)}
                              onMouseEnter={() => setActiveService(service.id)}
                              onMouseLeave={() => setActiveService(null)}
                              className={`group/item flex items-center justify-between gap-3 px-4 py-3 transition-all duration-150 ${
                                activeService === service.id
                                  ? "bg-brand-blue/5"
                                  : "hover:bg-brand-blue/5"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <span
                                  className={`flex-shrink-0 h-1.5 w-1.5 rounded-full transition-colors duration-150 ${
                                    service.accentColor === "blue" ? "bg-brand-blue" : "bg-brand-red"
                                  }`}
                                />
                                <span className="text-sm font-medium text-ink-muted group-hover/item:text-ink transition-colors duration-150">
                                  {service.title}
                                </span>
                              </div>
                              <svg
                                className={`h-3.5 w-3.5 text-ink/20 transition-all duration-200 ${
                                  activeService === service.id
                                    ? "opacity-100 translate-x-0 text-brand-blue"
                                    : "opacity-0 -translate-x-1"
                                }`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2.5}
                                aria-hidden="true"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                              </svg>
                            </Link>
                          </li>
                        ))}
                      </ul>

                      {/* Panel footer */}
                      <div className="px-4 py-3 border-t border-border-subtle">
                        <Link
                          href="#services"
                          onClick={() => setServicesOpen(false)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-blue hover:text-brand-blue-hover transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-brand-blue"
                        >
                          View all services
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-display text-sm font-medium text-slate-muted transition-colors duration-200 hover:text-ink focus-visible:outline-2 focus-visible:outline-brand-blue rounded-md px-3 py-2"
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {/* Immersive Full Screen Nav Trigger */}
            <MagneticButton
              type="button"
              onClick={() => setImmersiveMenuOpen(true)}
              aria-label="Open immersive full screen navigation"
              className="hidden lg:inline-flex items-center gap-2 rounded-full border border-border-subtle bg-white px-3.5 py-2 font-display text-xs font-semibold text-ink shadow-sm transition-all hover:border-brand-blue/40 hover:bg-brand-blue/5 hover:text-brand-blue focus-visible:outline-2 focus-visible:outline-brand-blue"
            >
              <span className="flex flex-col gap-1 w-3.5" aria-hidden="true">
                <span className="h-0.5 w-full bg-current rounded-full" />
                <span className="h-0.5 w-2/3 bg-current rounded-full" />
              </span>
              <span>Menu</span>
            </MagneticButton>

            <Link
              href="#inquiry"
              className="group hidden sm:inline-flex items-center gap-2.5 rounded-full border border-brand-blue/30 bg-brand-blue pl-5 pr-2 py-2 text-xs font-semibold tracking-wide text-white shadow-sm transition-all duration-300 hover:bg-brand-blue-hover active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-brand-blue"
            >
              <span>Let&apos;s Talk</span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 ease-out group-hover:translate-x-0.5">
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </span>
            </Link>

            <MagneticButton
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open mobile menu"
              aria-expanded={mobileMenuOpen}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle bg-white text-ink transition-colors hover:bg-slate-100 md:hidden focus-visible:outline-2 focus-visible:outline-brand-blue"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            </MagneticButton>
          </div>
        </div>
      </header>

      <MobileNav isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Immersive Full Screen Nav Overlay */}
      {immersiveMenuOpen && (
        <FullscreenNav
          isOpen={immersiveMenuOpen}
          showTrigger={false}
          onClose={() => setImmersiveMenuOpen(false)}
          overlayBg="#0a0f1d"
          headerOpenColor="#ffffff"
          brand="AR MARKETING"
          brandHref="/"
        >
          {(isOpen, closeMenu) => (
            <CustomNavbar
              isOpen={isOpen}
              overlayBg="#0a0f1d"
              onLinkClick={() => {
                closeMenu();
                setImmersiveMenuOpen(false);
              }}
              links={[
                { label: "Home", href: "/" },
                { label: "Services", href: "/#services" },
                { label: "About", href: "/about" },
                { label: "Process", href: "/#process" },
                { label: "Contact", href: "/contact" },
              ]}
            />
          )}
        </FullscreenNav>
      )}
    </>
  );
}
