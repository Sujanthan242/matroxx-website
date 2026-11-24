"use client";

import { useEffect, useState } from "react";
import type { ComponentType } from "react";
import { SPLINE_SCENE_URL } from "@/lib/site";

type SplineProps = { scene: string; onLoad?: () => void; onError?: () => void };

/**
 * Hero layer. The Spline scene loads lazily, only when a scene URL is set
 * and the visitor is on a desktop-width screen without reduced motion.
 * Otherwise — URL unset, mobile, reduced motion, or load failure — the
 * static obsidian fallback below is shown. The site ships professionally
 * with or without the scene (ARCHITECTURE.md §5).
 */
export default function SplineHero() {
  const [Spline, setSpline] = useState<ComponentType<SplineProps> | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!SPLINE_SCENE_URL) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth < 768) return;
    let cancelled = false;
    import("@splinetool/react-spline")
      .then((mod) => {
        if (!cancelled) setSpline(() => mod.default);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (Spline && SPLINE_SCENE_URL && !failed) {
    return (
      <div className="absolute inset-0" aria-hidden="true">
        <Spline scene={SPLINE_SCENE_URL} onError={() => setFailed(true)} />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden bg-[radial-gradient(ellipse_at_center,rgba(201,169,125,0.16),transparent_65%)]"
    >
      <div className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-bronze/20" />
      <div className="absolute left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-bronze/30" />
      <div className="absolute left-1/2 top-1/2 h-[14rem] w-[14rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-bronze/40" />
    </div>
  );
}
