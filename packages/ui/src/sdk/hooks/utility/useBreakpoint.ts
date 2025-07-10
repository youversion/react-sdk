import { useState, useEffect } from "react";

// Tailwind's default breakpoints
const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

export type Breakpoint = keyof typeof breakpoints | "xs";

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>("xs");

  useEffect(() => {
    const updateBreakpoint = () => {
      if (window.matchMedia(`(min-width: ${breakpoints["2xl"]})`).matches) {
        setBreakpoint("2xl");
      } else if (window.matchMedia(`(min-width: ${breakpoints.xl})`).matches) {
        setBreakpoint("xl");
      } else if (window.matchMedia(`(min-width: ${breakpoints.lg})`).matches) {
        setBreakpoint("lg");
      } else if (window.matchMedia(`(min-width: ${breakpoints.md})`).matches) {
        setBreakpoint("md");
      } else if (window.matchMedia(`(min-width: ${breakpoints.sm})`).matches) {
        setBreakpoint("sm");
      } else {
        setBreakpoint("xs");
      }
    };

    // Check on mount
    updateBreakpoint();

    // Create media query listeners
    const mediaQueries = Object.entries(breakpoints).map(([name, size]) => {
      const mq = window.matchMedia(`(min-width: ${size})`);
      mq.addEventListener("change", updateBreakpoint);
      return mq;
    });

    // Cleanup
    return () => {
      mediaQueries.forEach((mq) => {
        mq.removeEventListener("change", updateBreakpoint);
      });
    };
  }, []);

  return breakpoint;
}
