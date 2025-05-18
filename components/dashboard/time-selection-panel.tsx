"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, Clock, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useTimeTravel } from "@/lib/store/use-time-travel";

export default function TimeSelectionPanel() {
  const { targetDate, setTargetDate, timelinePosition, setTimelinePosition, presetPeriods, selectPresetPeriod } = useTimeTravel();
  const [date, setDate] = useState<Date | undefined>(targetDate);
  const [time, setTime] = useState<string>(format(targetDate, "HH:mm"));

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      
      // Combine selected date with current time
      const newDate = new Date(selectedDate);
      const [hours, minutes] = time.split(":").map(Number);
      newDate.setHours(hours, minutes);
      
      setTargetDate(newDate);
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
    
    if (date) {
      // Combine current date with selected time
      const newDate = new Date(date);
      const [hours, minutes] = e.target.value.split(":").map(Number);
      newDate.setHours(hours, minutes);
      
      setTargetDate(newDate);
    }
  };

  const handleSliderChange = (value: number[]) => {
    setTimelinePosition(value[0]);
  };

  const handleInitiateTravel = () => {
    // Would be implemented with actual time travel logic
    console.log("Initiating time travel to:", targetDate);
  };

  return (
    <Card className="backdrop-blur-md bg-card/50 border-border/40">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="mr-2 h-5 w-5 text-chart-1" />
          Time Selection
        </CardTitle>
        <CardDescription>
          Select your target time coordinates
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "justify-start text-left font-normal flex-1",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          
          <Input
            type="time"
            value={time}
            onChange={handleTimeChange}
            className="w-24"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span>Past</span>
            <span>Present</span>
            <span>Future</span>
          </div>
          <Slider
            value={[timelinePosition]}
            min={0}
            max={100}
            step={1}
            onValueChange={handleSliderChange}
            className="z-0"
          />
          <div className="pt-2 text-xs text-muted-foreground">
            Timeline deviation: {timelinePosition < 50 ? `-${100 - timelinePosition * 2}%` : `+${(timelinePosition - 50) * 2}%`}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          {presetPeriods.map((period) => (
            <Button 
              key={period.id}
              variant="outline" 
              size="sm"
              onClick={() => selectPresetPeriod(period.id)}
              className="text-xs"
            >
              {period.name}
            </Button>
          ))}
        </div>
        
        <Button 
          className="w-full bg-gradient-to-r from-chart-1 to-chart-2 hover:from-chart-1/90 hover:to-chart-2/90"
          onClick={handleInitiateTravel}
        >
          <Send className="mr-2 h-4 w-4" />
          Initiate Jump
        </Button>
      </CardContent>
    </Card>
  );
}