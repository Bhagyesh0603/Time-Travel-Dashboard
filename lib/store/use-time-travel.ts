"use client";

import { create } from "zustand";

type PresetPeriod = {
  id: string;
  name: string;
  date: Date;
  timelinePosition: number;
};

interface TimeTravelState {
  targetDate: Date;
  timelinePosition: number;
  presetPeriods: PresetPeriod[];
  setTargetDate: (date: Date) => void;
  setTimelinePosition: (position: number) => void;
  selectPresetPeriod: (id: string) => void;
  resetSettings: () => void;
}

export const useTimeTravel = create<TimeTravelState>((set) => {
  const now = new Date();
  
  const defaultPresets: PresetPeriod[] = [
    {
      id: "ancient-egypt",
      name: "Ancient Egypt",
      date: new Date(2500, 0, 1),
      timelinePosition: 10
    },
    {
      id: "renaissance",
      name: "Renaissance",
      date: new Date(1500, 0, 1),
      timelinePosition: 30
    },
    {
      id: "present",
      name: "Present Day",
      date: now,
      timelinePosition: 50
    },
    {
      id: "near-future",
      name: "Near Future",
      date: new Date(2050, 0, 1),
      timelinePosition: 70
    }
  ];
  
  return {
    targetDate: now,
    timelinePosition: 50,
    presetPeriods: defaultPresets,
    setTargetDate: (date: Date) => set({ targetDate: date }),
    setTimelinePosition: (position: number) => set({ timelinePosition: position }),
    selectPresetPeriod: (id: string) => {
      const preset = defaultPresets.find(p => p.id === id);
      if (preset) {
        set({ 
          targetDate: preset.date,
          timelinePosition: preset.timelinePosition
        });
      }
    },
    resetSettings: () => set({
      targetDate: now,
      timelinePosition: 50
    })
  };
});