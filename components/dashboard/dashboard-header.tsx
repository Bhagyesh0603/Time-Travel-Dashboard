"use client";

import { Button } from "@/components/ui/button";
import { Home, Settings, Bell, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DashboardHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Update current time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/70 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <Home className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold tracking-tight">
              Chronos Dashboard
            </h1>
            <div className="hidden md:flex items-center bg-background/30 backdrop-blur-sm px-3 py-1 rounded-md border border-border/30">
              <span className="text-xs text-muted-foreground mr-2">
                System Time:
              </span>
              <span className="text-sm font-mono">{currentTime}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="relative">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <span className="absolute top-0 right-0 h-2 w-2 bg-chart-1 rounded-full"></span>
            </div>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}