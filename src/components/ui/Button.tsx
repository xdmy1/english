import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * Navy is the only filled button on the site. Red is the brand's marker colour
 * — rules, numerals, ticks — and is deliberately not available as a button, so
 * no page can end up with two competing primary actions.
 */
export type ButtonVariant =
  | "primary"
  | "outline"
  | "ghost"
  | "light"
  | "lightOutline";

export type ButtonSize = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold " +
  // box-shadow is left out on purpose: no variant changes it on hover, and
  // the focus ring is a box-shadow — listing it would fade the ring in.
  "transition-[transform,background-color,border-color,color] duration-200 ease-out-quint " +
  "active:scale-[0.975] disabled:pointer-events-none disabled:opacity-55";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-navy-800 text-white shadow-[0_1px_0_0_rgb(255_255_255/0.12)_inset,0_10px_24px_-14px_rgb(15_30_82/0.7)] " +
    "can-hover:hover:bg-navy-900",
  outline:
    "border border-navy-200 bg-white text-navy-800 can-hover:hover:border-navy-300 can-hover:hover:bg-navy-50",
  ghost: "text-navy-800 can-hover:hover:bg-navy-50",
  light: "bg-white text-navy-900 can-hover:hover:bg-navy-50",
  lightOutline:
    "border border-white/30 text-white can-hover:hover:border-white/60 can-hover:hover:bg-white/10",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-[0.8125rem]",
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-[0.9375rem]",
};

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
  /** Rendered after the label; use for arrows and counters. */
  trailing?: ReactNode;
  leading?: ReactNode;
};

type AnchorProps = CommonProps & {
  href: string;
  external?: boolean;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "className" | "children">;

type NativeProps = CommonProps & {
  href?: undefined;
} & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

export type ButtonProps = AnchorProps | NativeProps;

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
    leading,
    trailing,
    ...rest
  } = props;

  const classes = cn(base, variants[variant], sizes[size], className);
  const content = (
    <>
      {leading}
      <span>{children}</span>
      {trailing}
    </>
  );

  if ("href" in rest && rest.href !== undefined) {
    const { href, external, ...anchorRest } = rest as AnchorProps;
    if (external) {
      return (
        <a
          href={href}
          rel="noopener noreferrer"
          target="_blank"
          className={classes}
          {...anchorRest}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...anchorRest}>
        {content}
      </Link>
    );
  }

  const { ...buttonRest } = rest as NativeProps;
  return (
    <button className={classes} {...buttonRest}>
      {content}
    </button>
  );
}

/** The chevron used inside buttons; nudges right on hover. */
export function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={cn(
        "size-4 shrink-0 transition-transform duration-200 ease-out-quint can-hover:group-hover/btn:translate-x-0.5",
        className,
      )}
    >
      <path
        d="M3 8h10m0 0-3.75-3.75M13 8l-3.75 3.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
