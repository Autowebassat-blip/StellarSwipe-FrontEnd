import { create } from "zustand";

export interface PageTransitionState {
  isTransitioning: boolean;
  fromPath: string | null;
  toPath: string | null;
  startTransition: (toPath: string, fromPath?: string) => void;
  completeTransition: () => void;
}

export const usePageTransitionStore = create<PageTransitionState>((set) => ({
  isTransitioning: false,
  fromPath: null,
  toPath: null,
  startTransition: (toPath, fromPath) =>
    set({
      isTransitioning: true,
      toPath,
      fromPath: fromPath || null,
    }),
  completeTransition: () =>
    set({
      isTransitioning: false,
      fromPath: null,
      toPath: null,
    }),
}));
