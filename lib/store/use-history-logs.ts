"use client";

import { create } from "zustand";

type HistoryLog = {
  id: string;
  destination: string;
  timestamp: Date;
  duration: number;
  status: "completed" | "failed" | "aborted";
  notes?: string;
};

interface HistoryLogsState {
  historyLogs: HistoryLog[];
  addLog: (log: HistoryLog) => void;
  removeLog: (id: string) => void;
  clearLogs: () => void;
}

export const useHistoryLogs = create<HistoryLogsState>((set) => {
  // Generate some sample logs for demonstration
  const sampleLogs: HistoryLog[] = [
    {
      id: "log-1",
      destination: "Paris, 1889 - World's Fair",
      timestamp: new Date(Date.now() - 8640000), // 1 day ago
      duration: 120,
      status: "completed",
      notes: "Successful jump to the Eiffel Tower inauguration."
    },
    {
      id: "log-2",
      destination: "New York, 1930 - Wall Street",
      timestamp: new Date(Date.now() - 4320000), // 12 hours ago
      duration: 85,
      status: "completed"
    },
    {
      id: "log-3",
      destination: "Mesozoic Era - Late Cretaceous",
      timestamp: new Date(Date.now() - 1800000), // 5 hours ago
      duration: 45,
      status: "failed",
      notes: "Quantum instability detected. Jump aborted for safety."
    },
    {
      id: "log-4",
      destination: "Alexandria, 48 BCE - Great Library",
      timestamp: new Date(Date.now() - 900000), // 2.5 hours ago
      duration: 210,
      status: "completed",
      notes: "Extended duration due to temporal interference."
    },
    {
      id: "log-5",
      destination: "London, 1851 - Crystal Palace",
      timestamp: new Date(Date.now() - 300000), // 0.8 hours ago
      duration: 62,
      status: "completed"
    },
    {
      id: "log-6",
      destination: "Mars Colony, 2150",
      timestamp: new Date(Date.now() - 120000), // 33 minutes ago
      duration: 38,
      status: "aborted",
      notes: "User initiated emergency return protocol."
    },
    {
      id: "log-7",
      destination: "Silicon Valley, 1976",
      timestamp: new Date(Date.now() - 60000), // 16 minutes ago
      duration: 74,
      status: "completed",
      notes: "Observed the founding of Apple Computer Company."
    }
  ];

  return {
    historyLogs: sampleLogs,
    addLog: (log: HistoryLog) => set((state) => ({
      historyLogs: [log, ...state.historyLogs]
    })),
    removeLog: (id: string) => set((state) => ({
      historyLogs: state.historyLogs.filter(log => log.id !== id)
    })),
    clearLogs: () => set({ historyLogs: [] })
  };
});