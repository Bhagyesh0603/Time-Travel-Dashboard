"use client";

import { useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Activity, AlertTriangle, Gauge } from "lucide-react";
import { useSystemStatus } from "@/lib/store/use-system-status";
import anime from "animejs";

export default function StatusDisplayPanel() {
  const { 
    systemHealth, 
    quantumStability, 
    powerLevel, 
    warnings,
    updateSystemHealth,
    updateQuantumStability,
    updatePowerLevel
  } = useSystemStatus();
  
  const warningRef = useRef<HTMLDivElement>(null);
  
  // Simulate fluctuating system values
  useEffect(() => {
    const interval = setInterval(() => {
      // Small random fluctuations
      updateSystemHealth(Math.min(100, Math.max(60, systemHealth + (Math.random() * 6 - 3))));
      updateQuantumStability(Math.min(100, Math.max(70, quantumStability + (Math.random() * 4 - 2))));
      updatePowerLevel(Math.min(100, Math.max(80, powerLevel + (Math.random() * 3 - 1.5))));
    }, 3000);
    
    return () => clearInterval(interval);
  }, [systemHealth, quantumStability, powerLevel, updateSystemHealth, updateQuantumStability, updatePowerLevel]);
  
  // Animation for warnings
  useEffect(() => {
    if (warnings.length > 0 && warningRef.current) {
      anime({
        targets: warningRef.current,
        translateX: [
          { value: -5, duration: 100, easing: 'easeInOutQuad' },
          { value: 5, duration: 100, easing: 'easeInOutQuad' },
          { value: -5, duration: 100, easing: 'easeInOutQuad' },
          { value: 5, duration: 100, easing: 'easeInOutQuad' },
          { value: 0, duration: 100, easing: 'easeInOutQuad' }
        ],
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 500
      });
    }
  }, [warnings]);

  // Determine status color based on health
  const getStatusColor = (value: number) => {
    if (value >= 80) return "text-green-500";
    if (value >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <Card className="backdrop-blur-md bg-card/50 border-border/40">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Gauge className="mr-2 h-5 w-5 text-chart-2" />
          System Status
        </CardTitle>
        <CardDescription>
          Real-time monitoring of vital metrics
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm">System Health</span>
            <span className={`text-sm font-medium ${getStatusColor(systemHealth)}`}>
              {systemHealth.toFixed(1)}%
            </span>
          </div>
          <Progress value={systemHealth} className="h-2" />
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm">Quantum Stability</span>
            <span className={`text-sm font-medium ${getStatusColor(quantumStability)}`}>
              {quantumStability.toFixed(1)}%
            </span>
          </div>
          <Progress value={quantumStability} className="h-2" />
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm">Power Level</span>
            <span className={`text-sm font-medium ${getStatusColor(powerLevel)}`}>
              {powerLevel.toFixed(1)}%
            </span>
          </div>
          <Progress value={powerLevel} className="h-2" />
        </div>
        
        <div className="pt-2 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
            <span className="text-xs">System Active</span>
          </div>
          <div className="text-xs text-muted-foreground flex items-center">
            <Activity className="h-3 w-3 mr-1" />
            Last update: Just now
          </div>
        </div>
        
        {warnings.length > 0 && (
          <div ref={warningRef} className="pt-2">
            <Alert variant="destructive" className="bg-destructive/20 border-destructive/30">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>
                {warnings[0].message}
              </AlertDescription>
            </Alert>
          </div>
        )}
      </CardContent>
    </Card>
  );
}