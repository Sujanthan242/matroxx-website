"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

type RevealProps = {
  as?: "div" | "section";
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms; the parent passes index * 90 (capped at 450). */
  delay?: number;
  /** 450ms variant for small items (stat values, tag chips). */
  fast?: boolean;
};

/**
 * Reveal in 5 lines: a wrapper that fades its children up once, the first
 * time 15% of it enters the viewport (IntersectionObserver, once: true).
 * The hiding class is only ever added by client JS after mount, so the
 * server HTML (and any no-JS render) shows all content. Reduced-motion
 * visitors get the content immediately, with no observer and no delay.
 * If the browser has no IntersectionObserver, a 1200ms safety timeout
 * forces everything visible instead of leaving it hidden.
 */
export default function Reveal({
  as = "div",
  children,
  className,
  delay = 0,
  fast = false,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [armed, setArmed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (motionReduced()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing with the browser's reduced-motion setting on mount; there is no subscription API for it, and the class must only be added client-side (SSR must not hide content).
      setVisible(true);
      return;
    }
    setArmed(true);
    if (typeof IntersectionObserver === "undefined") {
      const timer = window.setTimeout(() => setVisible(true), 1200);
      return () => window.clearTimeout(timer);
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        // Check EVERY entry: during fast scrolling several elements can
        // arrive in one batch, and entries[0] may be one that is leaving.
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Tag = as;
  const classes = [
    armed ? (fast ? "mx-reveal-fast" : "mx-reveal") : "",
    visible ? "is-visible" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");
  const style: CSSProperties =
    delay > 0 ? { animationDelay: `${delay}ms` } : {};
  return (
    <Tag
      ref={(el) => {
        ref.current = el;
      }}
      style={style}
      className={classes === "" ? undefined : classes}
    >
      {children}
    </Tag>
  );
}

/** True when the visitor asked for reduced motion (guarded for jsdom). */
function motionReduced(): boolean {
  if (typeof window === "undefined") return false;
  if (typeof window.matchMedia !== "function") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
