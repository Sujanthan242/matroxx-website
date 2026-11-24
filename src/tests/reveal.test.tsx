import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, render, screen, waitFor } from "@testing-library/react";
import Reveal from "@/components/Reveal";
import SplineHero from "@/components/SplineHero";

/**
 * Reveal + animated hero fallback (design-upgrade-spec.md §3.1, §10).
 * IntersectionObserver and matchMedia are mocked per test; jsdom
 * implements neither, so the mocks are the only way to drive them.
 */
let observerCallback: IntersectionObserverCallback | null = null;

class MockIntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  constructor(callback: IntersectionObserverCallback) {
    observerCallback = callback;
  }
}

function installMatchMedia(reduced: boolean) {
  const matchMedia = (query: string) => ({
    matches: query.includes("prefers-reduced-motion") ? reduced : false,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: () => false,
    onchange: null,
  });
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: vi.fn(matchMedia),
  });
}

function installObserver() {
  observerCallback = null;
  Object.defineProperty(window, "IntersectionObserver", {
    configurable: true,
    value: MockIntersectionObserver,
  });
  Object.defineProperty(globalThis, "IntersectionObserver", {
    configurable: true,
    value: MockIntersectionObserver,
  });
}

function removeObserver() {
  observerCallback = null;
  Object.defineProperty(window, "IntersectionObserver", {
    configurable: true,
    value: undefined,
  });
  Object.defineProperty(globalThis, "IntersectionObserver", {
    configurable: true,
    value: undefined,
  });
}

function intersect() {
  act(() => {
    observerCallback?.(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );
  });
}

describe("Reveal", () => {
  beforeEach(() => {
    installMatchMedia(false);
    installObserver();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders children visible immediately under reduced motion, with no hiding class", () => {
    installMatchMedia(true);
    const { container } = render(<Reveal>Visible content</Reveal>);
    expect(screen.getByText("Visible content")).toBeInTheDocument();
    expect(container.firstChild).not.toHaveClass("mx-reveal");
    expect(container.firstChild).not.toHaveClass("mx-reveal-fast");
  });

  it("adds .is-visible when the observer reports an intersection", () => {
    const { container } = render(<Reveal>Scroll content</Reveal>);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass("mx-reveal");
    expect(wrapper).not.toHaveClass("is-visible");
    intersect();
    expect(wrapper).toHaveClass("is-visible");
  });

  it("applies the delay as an animation delay and the fast variant on request", () => {
    const { container } = render(
      <Reveal fast delay={180}>
        Fast content
      </Reveal>,
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass("mx-reveal-fast");
    expect(wrapper.style.animationDelay).toBe("180ms");
  });

  it("forces content visible after 1200ms when there is no IntersectionObserver", async () => {
    removeObserver();
    const { container } = render(<Reveal>Old browser content</Reveal>);
    await waitFor(
      () => {
        expect(container.firstChild as HTMLElement).toHaveClass("is-visible");
      },
      { timeout: 2500 },
    );
  });
});

describe("SplineHero animated fallback", () => {
  beforeEach(() => {
    installMatchMedia(false);
  });

  it("renders the five animated layers with the scene URL unset", () => {
    const { container } = render(<SplineHero />);
    expect(container.querySelector(".mx-gradient-shift")).not.toBeNull();
    expect(container.querySelector(".mx-grid-bg")).not.toBeNull();
    expect(container.querySelectorAll(".mx-drift")).toHaveLength(2);
    expect(container.querySelector(".mx-spin-slow")).not.toBeNull();
    expect(container.querySelector(".mx-spin-slow-rev")).not.toBeNull();
    expect(container.querySelector(".mx-spin-slower")).not.toBeNull();
    expect(container.querySelector(".mx-pulse-ring")).not.toBeNull();
  });

  it("renders the same fallback statically under reduced motion", () => {
    installMatchMedia(true);
    const { container } = render(<SplineHero />);
    expect(container.querySelector(".mx-spin-slow")).toBeNull();
    expect(container.querySelector(".mx-drift")).toBeNull();
    expect(container.querySelector(".mx-gradient-shift")).toBeNull();
    expect(container.querySelector(".mx-pulse-ring")).toBeNull();
    // The rings themselves are still there — only the motion is gone.
    expect(container.querySelectorAll(".rounded-full.border")).not.toHaveLength(0);
  });
});
