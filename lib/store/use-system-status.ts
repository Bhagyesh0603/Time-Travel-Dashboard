"use client";

import { create } from "zustand";

type Warning = {
  id: string;
  type: "info" | "warning" | "critical";
  message: string;
  timestamp: Date;
};

interface SystemStatusState {
  systemHealth: number;
  quantumStability: number;
  powerLevel: number;
  warnings: Warning[];
  updateSystemHealth: (value: number) => void;
  updateQuantumStability: (value: number) => void;
  updatePowerLevel: (value: number) => void;
  addWarning: (warning: Warning) => void;
  removeWarning: (id: string) => void;
  clearWarnings: () => void;
}

export const useSystemStatus = create<SystemStatusState>((set) => ({
  systemHealth: 92.5,
  quantumStability: 87.2,
  powerLevel: 95.0,
  warnings: [],
  updateSystemHealth: (value: number) => set({ systemHealth: value }),
  updateQuantumStability: (value: number) => set({ quantumStability: value }),
  updatePowerLevel: (value: number) => set({ powerLevel: value }),
  addWarning: (warning: Warning) => set((state) => ({
    warnings: [warning, ...state.warnings.slice(0, 4)] // Keep only 5 most recent warnings
  })),
  removeWarning: (id: string) => set((state) => ({
    warnings: state.warnings.filter(warning => warning.id !== id)
  })),
  clearWarnings: () => set({ warnings: [] })
}));