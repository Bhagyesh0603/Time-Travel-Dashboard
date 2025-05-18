import { Suspense } from 'react';
import DashboardHeader from '@/components/dashboard/dashboard-header';
import TimeSelectionPanel from '@/components/dashboard/time-selection-panel';
import StatusDisplayPanel from '@/components/dashboard/status-display-panel';
import ControlCenterPanel from '@/components/dashboard/control-center-panel';
import TravelHistoryPanel from '@/components/dashboard/travel-history-panel';
import ChatbotAssistant from '@/components/dashboard/chatbot-assistant';
import BackgroundCanvas from '@/components/background/background-canvas';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function Dashboard() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <BackgroundCanvas intensity={0.3} />
      <div className="relative z-10 container mx-auto px-4 py-6">
        <DashboardHeader />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <Suspense fallback={<LoadingPanel />}>
            <TimeSelectionPanel />
          </Suspense>
          
          <Suspense fallback={<LoadingPanel />}>
            <StatusDisplayPanel />  
          </Suspense>
          
          <Suspense fallback={<LoadingPanel />}>
            <ControlCenterPanel />
          </Suspense>
          
          <Suspense fallback={<LoadingPanel className="lg:col-span-4" />}>
            <TravelHistoryPanel className="lg:col-span-4" />
          </Suspense>
        </div>
      </div>
      
      <ChatbotAssistant />
    </main>
  );
}

function LoadingPanel({ className = "" }: { className?: string }) {
  return (
    <Card className={`p-4 ${className}`}>
      <Skeleton className="h-8 w-3/4 mb-4" />
      <Skeleton className="h-24 w-full mb-3" />
      <Skeleton className="h-12 w-full" />
    </Card>
  );
}