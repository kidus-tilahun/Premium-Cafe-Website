/// <reference types="@testing-library/jest-dom" />
import "@testing-library/jest-dom";
import { vi } from "vitest";

// matchMedia — not available in jsdom, not a constructor so arrow fn is fine
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// ResizeObserver — called with `new`, so must be a constructible class
class MockResizeObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  constructor(_callback: ResizeObserverCallback) {}
}
global.ResizeObserver =
  MockResizeObserver as unknown as typeof ResizeObserver;

// IntersectionObserver — called with `new` by Framer Motion's whileInView;
// must be a constructible class (arrow functions cannot be used as constructors)
class MockIntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn().mockReturnValue([]);
  root: Element | null = null;
  rootMargin = "";
  thresholds: ReadonlyArray<number> = [];
  constructor(
    _callback: IntersectionObserverCallback,
    _options?: IntersectionObserverInit,
  ) {}
}
global.IntersectionObserver =
  MockIntersectionObserver as unknown as typeof IntersectionObserver;
