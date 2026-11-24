"use client";

import { useEffect, useRef, useState } from "react";
import type { ComponentType } from "react";
import { SPLINE_SCENE_URL } from "@/lib/site";

type SplineProps = { scene: string; onLoad?: () => void; onError?: () => void };

const MESH_BACKGROUND =
  "radial-gradient(ellipse 60% 50% at 70% 20%, rgba(201,169,125,0.14), transparent 65%), " +
  "radial-gradient(ellipse 50% 40% at 20% 80%, rgba(162,123,80,0.10), transparent 65%), " +
  "radial-gradient(ellipse at center, rgba(201,169,125,0.08), transparent 65%)";

/**
 * Hero layer. The Spline scene loads lazily, only when a scene URL is set
 * and the visitor is on a desktop-width screen without reduced motion.
 * Otherwise — URL unset, mobile, reduced motion, or load failure — the
 * animated CSS fallback below is shown: gradient mesh, masked grid,
 * drifting orbs, three rotating rings and a centre pulse. The site ships
 * professionally with or without the scene (ARCHITECTURE.md §5).
 *
 * Parallax in 5 lines: on fine-pointer devices only, pointer moves set
 * two CSS variables on the container (rings ±10px, orbs ±16px, opposite
 * the pointer), throttled with requestAnimationFrame; a 600ms CSS
 * transition smooths the result, so no per-frame JS transform runs.
 * Reduced motion, touch, and the Spline scene all disable it.
 */
export default function SplineHero() {
  const [Spline, setSpline] = useState<ComponentType<SplineProps> | null>(null);
  const [failed, setFailed] = useState(false);
  const [reduced, setReduced] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    if (typeof window.matchMedia === "function") {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing with the browser's reduced-motion setting on mount (spec §6.1, layer 2); the static fallback needs this state, and it cannot be read during SSR.
      setReduced(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      );
    }
  }, []);

  useParallax(containerRef, reduced, Spline !== null);

  if (Spline && SPLINE_SCENE_URL && !failed) {
    return (
      <div className="absolute inset-0" aria-hidden="true">
        <Spline scene={SPLINE_SCENE_URL} onError={() => setFailed(true)} />
      </div>
    );
  }

  // Under reduced motion the same markup renders with the animation
  // classes omitted — static rings, as before (spec §6.1, layer 2).
  const anim = !reduced;
  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden"
    >
      {/* Layer 1 — animated bronze gradient mesh on obsidian. */}
      <div
        className={anim ? "mx-fade-in mx-gradient-shift absolute inset-0" : "absolute inset-0"}
        style={{ backgroundImage: MESH_BACKGROUND }}
      />
      {/* Layer 2 — faint 64px grid, masked to fade at the edges. Desktop only. */}
      <div
        className="mx-grid-bg absolute inset-0 hidden md:block"
        style={{
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />
      {/* Layer 3 — two drifting blurred orbs, out of phase. Desktop only. */}
      <div
        className="absolute inset-0 hidden transition-transform duration-[600ms] ease-[var(--ease-in-out-soft)] md:block"
        style={{
          transform:
            "translate3d(var(--mx-orb-x, 0px), var(--mx-orb-y, 0px), 0)",
        }}
      >
        <div
          className={`absolute right-[8%] top-[10%] h-72 w-72 rounded-full bg-[rgba(201,169,125,0.16)] blur-3xl ${anim ? "mx-drift will-change-transform" : ""}`}
        />
        <div
          className={`absolute bottom-[5%] left-[10%] h-56 w-56 rounded-full bg-[rgba(162,123,80,0.12)] blur-3xl ${anim ? "mx-drift will-change-transform" : ""}`}
          style={anim ? { animationDelay: "-9s" } : undefined}
        />
      </div>
      {/* Layer 4 — three concentric rings. Each ring is a centred wrapper
          plus a spinning inner, so the rotation never fights the centring
          translate (spec §1.5). The dots make the rotation visible. */}
      <div
        className="absolute inset-0 transition-transform duration-[600ms] ease-[var(--ease-in-out-soft)]"
        style={{
          transform:
            "translate3d(var(--mx-ring-x, 0px), var(--mx-ring-y, 0px), 0)",
        }}
      >
        <div className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2">
          <div
            className={`relative h-full w-full rounded-full border border-bronze/20 ${anim ? "mx-spin-slow will-change-transform" : ""}`}
          >
            <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bronze" />
          </div>
        </div>
        <div className="absolute left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2">
          <div
            className={`relative h-full w-full rounded-full border border-bronze/30 ${anim ? "mx-spin-slow-rev will-change-transform" : ""}`}
          >
            <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bronze" />
          </div>
        </div>
        <div className="absolute left-1/2 top-1/2 h-[14rem] w-[14rem] -translate-x-1/2 -translate-y-1/2">
          <div
            className={`relative h-full w-full rounded-full border border-bronze/40 ${anim ? "mx-spin-slower will-change-transform" : ""}`}
          />
        </div>
      </div>
      {/* Layer 5 — centre pulse ring, slow breathing glow. */}
      <div
        className={`absolute left-1/2 top-1/2 h-[14rem] w-[14rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-bronze/25 ${anim ? "mx-pulse-ring" : ""}`}
      />
    </div>
  );
}

/** Guards: fine pointer only, motion allowed, fallback showing (no scene). */
function useParallax(
  ref: React.RefObject<HTMLDivElement | null>,
  reduced: boolean,
  sceneShowing: boolean,
) {
  useEffect(() => {
    if (reduced || sceneShowing) return;
    if (typeof window.matchMedia !== "function") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const container = ref.current;
    if (!container) return;
    let raf = 0;
    const onMove = (event: PointerEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        applyParallax(container, event.clientX, event.clientY);
      });
    };
    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref, reduced, sceneShowing]);
}

/** Rings move ±10px, orbs ±16px, opposite the pointer (translate3d only). */
function applyParallax(container: HTMLDivElement, x: number, y: number) {
  const rect = container.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) return;
  const nx = (x - rect.left) / rect.width - 0.5;
  const ny = (y - rect.top) / rect.height - 0.5;
  container.style.setProperty("--mx-ring-x", `${-nx * 20}px`);
  container.style.setProperty("--mx-ring-y", `${-ny * 20}px`);
  container.style.setProperty("--mx-orb-x", `${-nx * 32}px`);
  container.style.setProperty("--mx-orb-y", `${-ny * 32}px`);
}
