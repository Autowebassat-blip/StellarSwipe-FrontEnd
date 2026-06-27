"use client";

import { useEffect } from "react";
import { usePageTransitionStore } from "@/store/usePageTransitionStore";

/**
 * usePageTransitionComplete
 * ────────────────────────
 * Hook to signal that a page has completed rendering and the transition placeholder
 * can be dismissed.
 *
 * Usage:
 * ```tsx
 * export default function Page() {
 *   usePageTransitionComplete();
 *
 *   return <div>Page content</div>;
 * }
 * ```
 *
 * The hook automatically calls completeTransition when the component mounts,
 * allowing the placeholder to fade out smoothly.
 */

export function usePageTransitionComplete() {
  const { completeTransition } = usePageTransitionStore();

  useEffect(() => {
    // Mark transition as complete after current page renders
    // Use requestAnimationFrame to ensure layout is painted
    const animationFrameId = requestAnimationFrame(() => {
      completeTransition();
    });

    return () => cancelAnimationFrame(animationFrameId);
  }, [completeTransition]);
}
