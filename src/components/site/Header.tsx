"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { site } from "@/data/site";
import type { Locale } from "@/i18n/config";
import { href, primaryNav, routeKeyFromPathname } from "@/i18n/routes";
import type { CommonDict } from "@/i18n/types";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";

export function Header({ locale, dict }: { locale: Locale; dict: CommonDict }) {
  const pathname = usePathname();
  const active = routeKeyFromPathname(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [barFocused, setBarFocused] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  /*
    The utility bar slides away on scroll, and hiding it means inerting it —
    which, per the HTML spec, blurs whatever is focused inside. The bar holds
    the only language switcher outside the footer, so a keyboard reader who
    scrolls while it is focused loses their place and cannot get back to it
    without returning to the very top. While it holds focus, it stays.
  */
  const utilityHidden = scrolled && !barFocused;

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setScrolled(window.scrollY > 6));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Close the sheet on navigation. Derived from the pathname during render
  // rather than in an effect, so the sheet is never painted open on the new
  // page for a frame.
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    if (menuOpen) setMenuOpen(false);
  }

  /*
    The sheet covers the page, locks its scroll and closes on Escape, so it is
    a modal dialog and has to behave like one: focus moves into it, stays in it
    while it is up, and goes back to the button that opened it. Without the
    trap, Shift+Tab walks backwards into content that is sitting underneath an
    opaque panel (WCAG 2.4.11), and closing inerts the subtree around whatever
    is focused, which drops focus on <body>.
  */
  useEffect(() => {
    const sheet = sheetRef.current;
    if (!menuOpen || !sheet) return;

    const burger = burgerRef.current;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    sheet.focus();

    /*
      The ring in document order: the burger comes first, because it is also
      this panel's close button and would otherwise be unreachable, and the
      sheet's own controls follow it. Anything inside an inert subtree — the
      language menu while it is shut — is not a stop.
    */
    const stops = () => {
      const inside = Array.from(
        sheet.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
      ).filter((element) => !element.closest("[inert]"));
      return burger ? [burger, ...inside] : inside;
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        // A popup inside the sheet — the language menu — answers Escape first.
        if (sheet.querySelector('[aria-expanded="true"]')) return;
        setMenuOpen(false);
        return;
      }
      if (event.key !== "Tab") return;

      const items = stops();
      if (items.length === 0) return;

      const active = document.activeElement as HTMLElement | null;
      const index = active ? items.indexOf(active) : -1;

      // The container sits between the burger and the panel's own links in
      // document order, so tabbing off it needs no help.
      if (index === -1 && active === sheet) return;

      if (index === -1) {
        event.preventDefault();
        (event.shiftKey ? items[items.length - 1]! : items[0]!).focus();
        return;
      }

      const next = index + (event.shiftKey ? -1 : 1);
      if (next < 0) {
        event.preventDefault();
        items[items.length - 1]!.focus();
      } else if (next >= items.length) {
        event.preventDefault();
        items[0]!.focus();
      }
    };

    // The sheet is lg:hidden. If the viewport crosses that line while it is
    // open, close it: otherwise the scroll lock and the trap survive around a
    // panel that is no longer painted.
    const desktop = window.matchMedia("(min-width: 64rem)");
    const onBreakpoint = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
      if (
        sheet.contains(document.activeElement) ||
        document.activeElement === document.body
      ) {
        burger?.focus();
      }
    };
  }, [menuOpen]);

  return (
    <>
      {/*
        The whole header slides up by exactly the utility bar's height once the
        page moves, leaving the main bar flush at the top. Sliding rather than
        collapsing keeps the header's height in the document constant —
        collapsing it removes 36px of flow while the reader is scrolling, and
        everything below jumps.
      */}
      <header
        className={cn(
          "sticky top-0 z-50 transition-transform duration-300 ease-out-quint",
          utilityHidden ? "-translate-y-9" : "translate-y-0",
        )}
      >
        {/*
          z-20 is load-bearing: `grain` sets isolation:isolate, which makes this
          bar its own stacking context. Without a z-index above the main bar
          below it, the language menu — however high its own z-index — is
          painted underneath the main bar and cannot be clicked.
        */}
        <div
          aria-hidden={utilityHidden}
          inert={utilityHidden}
          onFocus={() => setBarFocused(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setBarFocused(false);
            }
          }}
          className={cn(
            "grain relative z-20 bg-navy-900 text-navy-200 transition-opacity duration-200 ease-out-quint",
            utilityHidden ? "opacity-0" : "opacity-100",
          )}
        >
          <Container className="flex h-9 items-center justify-between gap-6">
            {/* Clipped on narrow phones, and RO/RU are longer than EN — the
                title is the only way back to the rest of the sentence. */}
            <p
              title={dict.brand.tagline}
              className="truncate text-2xs font-medium tracking-[0.08em] uppercase"
            >
              {dict.brand.tagline}
            </p>
            <div className="flex items-center gap-4">
              {/* Hidden from xl up, where the main bar carries the number. */}
              <a
                href={`tel:${site.phone.e164}`}
                className="link-underline hidden text-2xs font-semibold tracking-[0.06em] text-white sm:inline-block xl:hidden"
              >
                {site.phone.display}
              </a>
              <LanguageSwitcher
                locale={locale}
                labels={dict.language}
                tone="light"
                // A menu left open behind the hidden bar reappears open on the
                // way back up, which nobody asked for.
                forceClosed={utilityHidden}
                className="[&>button]:h-6 [&>button]:border-white/20 [&>button]:px-2 [&>button]:text-[0.6875rem]"
              />
            </div>
          </Container>
        </div>

        {/* Main bar */}
        <div
          className={cn(
            "border-b bg-white/92 backdrop-blur-md",
            "transition-[border-color,box-shadow] duration-300 ease-out-quint",
            scrolled
              ? "border-line shadow-[0_1px_24px_-12px_rgb(15_30_82/0.32)]"
              : "border-transparent",
          )}
        >
          <Container className="flex h-16 items-center justify-between gap-6 sm:h-18">
            <Link
              href={href(locale, "home")}
              className="press shrink-0 rounded-md"
              aria-label={dict.brand.name}
            >
              <Logo />
            </Link>

            <nav aria-label={dict.navLabel.main} className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {primaryNav.map((key) => {
                  const current = active === key;
                  return (
                    <li key={key}>
                      <Link
                        href={href(locale, key)}
                        aria-current={current ? "page" : undefined}
                        className={cn(
                          "relative flex h-10 items-center rounded-lg px-3.5 text-[0.9375rem] font-medium transition-colors duration-200 ease-out-quint",
                          current
                            ? "text-navy-900"
                            : "text-slate-600 can-hover:hover:text-navy-900",
                        )}
                      >
                        {dict.nav[key]}
                        <span
                          aria-hidden="true"
                          className={cn(
                            "absolute inset-x-3.5 -bottom-px h-[2px] origin-left bg-red-500 transition-transform duration-250 ease-out-quint",
                            current ? "scale-x-100" : "scale-x-0",
                          )}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <a
                href={`tel:${site.phone.e164}`}
                className="press hidden h-10 items-center gap-2 rounded-full px-3 text-sm font-medium text-navy-800 transition-colors duration-200 ease-out-quint can-hover:hover:bg-navy-50 xl:flex"
              >
                <PhoneIcon />
                <span>{site.phone.display}</span>
              </a>

              <Button
                href={href(locale, "apply")}
                size="sm"
                className="hidden sm:inline-flex"
              >
                {dict.actions.apply}
              </Button>

              <button
                ref={burgerRef}
                type="button"
                onClick={() => setMenuOpen((value) => !value)}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                aria-label={
                  menuOpen ? dict.actions.closeMenu : dict.actions.openMenu
                }
                className="press flex size-10 items-center justify-center rounded-full border border-navy-200 text-navy-800 lg:hidden"
              >
                <BurgerIcon open={menuOpen} />
              </button>
            </div>
          </Container>
        </div>
      </header>

      {/*
        The sheet sits OUTSIDE <header> because the header now carries a
        transform, and a transformed ancestor becomes the containing block for
        its fixed descendants — inside, `fixed` would resolve against the
        header instead of the viewport.

        Kept mounted so it can transition; `inert` takes it out of the tab order
        and the accessibility tree while closed, which `hidden` would do at the
        cost of the animation.
      */}
      <div
        id="mobile-menu"
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-label={dict.navLabel.main}
        tabIndex={-1}
        inert={!menuOpen}
        className={cn(
          // Above the consent notice (z-60), which is full-width on a phone and
          // otherwise covers this panel's language menu and its phone button.
          "fixed inset-x-0 top-[var(--sheet-top)] bottom-0 z-[70] overflow-y-auto overscroll-contain bg-white lg:hidden",
          "transition-[opacity,transform,visibility] duration-300 ease-drawer",
          // The offset has to follow the bar it hangs from: 2.25rem of utility
          // strip over a main bar that is h-16 below sm and h-18 from sm up.
          utilityHidden
            ? "[--sheet-top:4rem] sm:[--sheet-top:4.5rem]"
            : "[--sheet-top:6.25rem] sm:[--sheet-top:6.75rem]",
          menuOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0",
        )}
      >
        <Container className="flex min-h-full flex-col py-8">
          <nav aria-label={dict.navLabel.main}>
            <ul className="flex flex-col">
              {primaryNav.map((key, index) => (
                <li key={key}>
                  <Link
                    href={href(locale, key)}
                    aria-current={active === key ? "page" : undefined}
                    style={{
                      transitionDelay: menuOpen ? `${60 + index * 40}ms` : "0ms",
                    }}
                    className={cn(
                      "font-display flex items-baseline gap-4 border-b border-line py-4 text-2xl font-medium tracking-[-0.01em]",
                      "transition-[opacity,transform] duration-300 ease-out-quint",
                      menuOpen
                        ? "translate-y-0 opacity-100"
                        : "translate-y-2 opacity-0",
                      active === key ? "text-navy-900" : "text-slate-700",
                    )}
                  >
                    <span className="w-6 shrink-0 text-xs font-semibold text-red-500 tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {dict.nav[key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-8 flex flex-col gap-3">
            <Button href={href(locale, "apply")} size="lg" className="w-full">
              {dict.actions.apply}
            </Button>
            <Button
              href={`tel:${site.phone.e164}`}
              variant="outline"
              size="lg"
              className="w-full"
              leading={<PhoneIcon />}
            >
              {site.phone.display}
            </Button>
          </div>

          <div className="mt-auto pt-10">
            {/* Opens upward: the sheet scrolls its overflow. */}
            <LanguageSwitcher locale={locale} labels={dict.language} placement="top" />
          </div>
        </Container>
      </div>
    </>
  );
}

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="size-4 shrink-0"
    >
      <path
        d="M5.2 2.5H3.1c-.6 0-1.1.5-1.1 1.1C2 9.3 6.7 14 12.4 14c.6 0 1.1-.5 1.1-1.1v-2.1c0-.5-.3-.9-.8-1l-2-.5a1 1 0 0 0-1 .3l-.7.8a8.7 8.7 0 0 1-3.4-3.4l.8-.7a1 1 0 0 0 .3-1l-.5-2a1 1 0 0 0-1-.8Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BurgerIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="size-5">
      <path
        d="M4 7h12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        className={cn(
          "origin-center transition-transform duration-250 ease-out-quint",
          open && "translate-y-[3px] rotate-45",
        )}
      />
      <path
        d="M4 13h12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        className={cn(
          "origin-center transition-transform duration-250 ease-out-quint",
          open && "-translate-y-[3px] -rotate-45",
        )}
      />
    </svg>
  );
}
