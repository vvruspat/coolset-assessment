import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import { forwardRef, createElement, type ReactNode } from "react";

afterEach(() => {
  cleanup();
});

vi.mock("framer-motion", () => {
  return {
    AnimatePresence: ({ children }: { children: ReactNode }) => children,
    motion: {
      div: forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
        ({ children, ...props }, ref) => {
          const rest = { ...props } as Record<string, unknown>;
          delete rest.whileHover;
          delete rest.animate;
          delete rest.transition;

          return createElement("div", { ref, ...rest }, children);
        }
      ),
    },
  };
});
