"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { SlidersHorizontal, ShieldAlert, Power, Zap } from "lucide-react";
import { useSystemStatus } from "@/lib/store/use-system-status";

export default function ControlCenterPanel() {
  const { addWarning, clearWarnings } = useSystemStatus();
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [shieldActive, setShieldActive] = useState(true);
  const [autoPilot, setAutoPilot] = useState(false);
  const [calibrating, setCalibrating] = useState(false);

  const handleEmergencyToggle = () => {
    const newValue = !emergencyMode;
    setEmergencyMode(newValue);
    
    if (newValue) {
      addWarning({
        id: Date.now().toString(),
        type: "critical",
        message: "Emergency mode activated. System in safe state.",
        timestamp: new Date()
      });
    } else {
      clearWarnings();
    }
  };

  const handleCalibration = () => {
    setCalibrating(true);
    
    // Simulate calibration
    setTimeout(() => {
      setCalibrating(false);
      addWarning({
        id: Date.now().toString(),
        type: "info",
        message: "System calibration complete. Ready for operation.",
        timestamp: new Date()
      });
    }, 2000);
  };

  return (
    <Card className="backdrop-blur-md bg-card/50 border-border/40">
      <CardHeader>
        <CardTitle className="flex items-center">
          <SlidersHorizontal className="mr-2 h-5 w-5 text-chart-3" />
          Control Center
        </CardTitle>
        <CardDescription>
          System operation and calibration
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="controls" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="controls">Controls</TabsTrigger>
            <TabsTrigger value="calibration">Calibration</TabsTrigger>
          </TabsList>
          <TabsContent value="controls" className="space-y-4">
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <div className="flex flex-col space-y-1">
                  <Label htmlFor="shield-mode" className="font-medium">Shield Module</Label>
                  <span className="text-xs text-muted-foreground">Temporal protection active</span>
                </div>
                <Switch 
                  id="shield-mode" 
                  checked={shieldActive}
                  onCheckedChange={setShieldActive}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-col space-y-1">
                  <Label htmlFor="auto-pilot" className="font-medium">Auto Pilot</Label>
                  <span className="text-xs text-muted-foreground">Automated navigation system</span>
                </div>
                <Switch 
                  id="auto-pilot" 
                  checked={autoPilot}
                  onCheckedChange={setAutoPilot}
                />
              </div>
              
              <Button 
                variant="destructive" 
                className="w-full mt-4 bg-destructive/90 hover:bg-destructive"
                onClick={handleEmergencyToggle}
              >
                <ShieldAlert className="mr-2 h-4 w-4" />
                {emergencyMode ? "Deactivate Emergency Mode" : "Emergency Shutdown"}
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="calibration" className="space-y-4">
            <div className="space-y-4 pt-2">
              <div className="rounded-md border border-border/40 p-3 bg-background/50">
                <div className="text-sm font-medium">System Diagnostics</div>
                <div className="text-xs text-muted-foreground mt-1">Last calibration: 4h ago</div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="text-xs flex items-center">
                    <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                    Quantum Drive
                  </div>
                  <div className="text-xs flex items-center">
                    <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                    Flux Capacitor
                  </div>
                  <div className="text-xs flex items-center">
                    <span className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></span>
                    Temporal Shield
                  </div>
                  <div className="text-xs flex items-center">
                    <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                    Power Matrix
                  </div>
                </div>
              </div>
              
              <Button 
                variant="secondary" 
                className="w-full"
                onClick={handleCalibration}
                disabled={calibrating}
              >
                {calibrating ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Calibrating...
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 h-4 w-4" />
                    Run Calibration
                  </>
                )}
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full"
              >
                <Power className="mr-2 h-4 w-4" />
                Reset System
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}