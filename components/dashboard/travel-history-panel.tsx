"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { History, Search, Clock, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useHistoryLogs } from "@/lib/store/use-history-logs";
import { format } from "date-fns";

interface TravelHistoryPanelProps {
  className?: string;
}

export default function TravelHistoryPanel({ className = "" }: TravelHistoryPanelProps) {
  const { historyLogs } = useHistoryLogs();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  const filteredLogs = useMemo(() => {
    return historyLogs.filter(log => {
      // Apply status filter
      if (statusFilter !== "all" && log.status !== statusFilter) {
        return false;
      }
      
      // Apply search query
      if (searchQuery && !log.destination.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      return true;
    });
  }, [historyLogs, statusFilter, searchQuery]);

  return (
    <Card className={`backdrop-blur-md bg-card/50 border-border/40 ${className}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <History className="mr-2 h-5 w-5 text-chart-4" />
            Travel History
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[120px] h-8 text-xs">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="aborted">Aborted</SelectItem>
              </SelectContent>
            </Select>
            <div className="relative w-[180px]">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search destinations..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 h-8 text-xs"
              />
            </div>
          </div>
        </div>
        <CardDescription>
          Detailed log of all temporal jumps
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[240px] pr-4">
          <div className="space-y-3">
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log) => (
                <div 
                  key={log.id} 
                  className="rounded-lg bg-card/50 backdrop-blur-sm border border-border/40 p-3 hover:bg-card/70 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="font-medium">{log.destination}</div>
                      <div className="text-xs text-muted-foreground">
                        <span className="inline-flex items-center mr-3">
                          <Clock className="mr-1 h-3 w-3" />
                          {format(log.timestamp, "MMM dd, yyyy HH:mm")}
                        </span>
                        <span>Duration: {log.duration}s</span>
                      </div>
                    </div>
                    <Badge 
                      variant={
                        log.status === "completed" ? "default" : 
                        log.status === "failed" ? "destructive" : 
                        "outline"
                      }
                      className="text-xs"
                    >
                      {log.status === "completed" && <CheckCircle2 className="mr-1 h-3 w-3" />}
                      {log.status === "failed" && <AlertTriangle className="mr-1 h-3 w-3" />}
                      {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                    </Badge>
                  </div>
                  {log.notes && (
                    <div className="mt-2 text-xs border-t border-border/30 pt-2 text-muted-foreground">
                      {log.notes}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No travel logs matching your filters
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}