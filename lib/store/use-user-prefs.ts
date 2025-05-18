"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserPrefsState {
  theme: "light" | "dark" | "system";
  animationsEnabled: boolean;
  soundEnabled: boolean;
  notificationsEnabled: boolean;
  setTheme: (theme: "light" | "dark" | "system") => void;
  toggleAnimations: () => void;
  toggleSound: () => void;
  toggleNotifications: () => void;
  resetPreferences: () => void;
}

export const useUserPrefs = create<UserPrefsState>()(
  persist(
    (set) => ({
      theme: "dark",
      animationsEnabled: true,
      soundEnabled: true,
      notificationsEnabled: true,
      setTheme: (theme) => set({ theme }),
      toggleAnimations: () => set((state) => ({ animationsEnabled: !state.animationsEnabled })),
      toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
      toggleNotifications: () => set((state) => ({ notificationsEnabled: !state.notificationsEnabled })),
      resetPreferences: () => set({
        theme: "dark",
        animationsEnabled: true,
        soundEnabled: true,
        notificationsEnabled: true
      })
    }),
    {
      name: "user-preferences"
    }
  )
);