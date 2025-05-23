
import { useState } from "react";
import { StreamDashboard } from "@/components/stream/StreamDashboard";
import { StreamConfig } from "@/components/stream/StreamConfig";
import { SystemMonitor } from "@/components/monitor/SystemMonitor";
import { StreamHistory } from "@/components/stream/StreamHistory";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Settings, History, Monitor } from "lucide-react";

const Index = () => {
  const [activeStreams, setActiveStreams] = useState(3);
  const [systemLoad, setSystemLoad] = useState(42);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Activity className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                  Stream Bridge Nexus
                </h1>
              </div>
              <Badge variant="outline" className="text-xs">
                RTMP → RTSP Converter
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <Card className="px-3 py-1">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>{activeStreams} Active</span>
                </div>
              </Card>
              <Card className="px-3 py-1">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>{systemLoad}% Load</span>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-[400px] mx-auto">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <Monitor className="h-4 w-4" />
              <span>Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="config" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Config</span>
            </TabsTrigger>
            <TabsTrigger value="monitor" className="flex items-center space-x-2">
              <Activity className="h-4 w-4" />
              <span>Monitor</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center space-x-2">
              <History className="h-4 w-4" />
              <span>History</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <StreamDashboard />
          </TabsContent>

          <TabsContent value="config" className="space-y-6">
            <StreamConfig />
          </TabsContent>

          <TabsContent value="monitor" className="space-y-6">
            <SystemMonitor />
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <StreamHistory />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
