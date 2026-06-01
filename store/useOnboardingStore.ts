import { create } from "zustand";
import { persist } from "zustand/middleware";

interface OnboardingState {
  completed: boolean;
  dismissed: boolean;
  setCompleted: () => void;
  setDismissed: () => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      completed: false,
      dismissed: false,
      setCompleted: () => set({ completed: true, dismissed: true }),
      setDismissed: () => set({ dismissed: true }),
      reset: () => set({ completed: false, dismissed: false }),
    }),
    { name: "stellar-onboarding" }
  )
);
