
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { Cpu, HardDrive, Wifi, Activity, Server, Database, RefreshCw } from "lucide-react";

export const SystemMonitor = () => {
  const [systemStats, setSystemStats] = useState({
    cpu: 45,
    memory: 68,
    disk: 23,
    network: 156,
    activeStreams: 3,
    totalBandwidth: 8.5,
    errors: 2,
    uptime: 86400
  });

  const [performanceData, setPerformanceData] = useState([
    { time: "00:00", cpu: 30, memory: 45, network: 120 },
    { time: "00:05", cpu: 35, memory: 48, network: 145 },
    { time: "00:10", cpu: 42, memory: 52, network: 160 },
    { time: "00:15", cpu: 45, memory: 68, network: 156 },
    { time: "00:20", cpu: 38, memory: 55, network: 140 },
    { time: "00:25", cpu: 41, memory: 62, network: 155 },
    { time: "00:30", cpu: 45, memory: 68, network: 156 }
  ]);

  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${days}d ${hours}h ${minutes}m`;
  };

  const getStatusColor = (value: number, thresholds = { warning: 70, critical: 90 }) => {
    if (value >= thresholds.critical) return "text-red-500";
    if (value >= thresholds.warning) return "text-yellow-500";
    return "text-green-500";
  };

  const getProgressColor = (value: number, thresholds = { warning: 70, critical: 90 }) => {
    if (value >= thresholds.critical) return "bg-red-500";
    if (value >= thresholds.warning) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">System Monitor</h2>
          <p className="text-muted-foreground">Real-time system performance and health monitoring</p>
        </div>
        <Button variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* System Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
            <Cpu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getStatusColor(systemStats.cpu)}`}>
              {systemStats.cpu}%
            </div>
            <Progress value={systemStats.cpu} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              4 cores active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getStatusColor(systemStats.memory)}`}>
              {systemStats.memory}%
            </div>
            <Progress value={systemStats.memory} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              5.4GB / 8GB used
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Network I/O</CardTitle>
            <Wifi className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">
              {systemStats.network} Mbps
            </div>
            <Progress value={(systemStats.network / 200) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              ↑ 89 Mbps ↓ 67 Mbps
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              Healthy
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <Badge variant="outline" className="text-xs">
                {systemStats.errors} Errors
              </Badge>
              <Badge variant="outline" className="text-xs">
                Uptime: {formatUptime(systemStats.uptime)}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance Trends</CardTitle>
            <CardDescription>CPU and Memory usage over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="cpu" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="CPU %"
                />
                <Line 
                  type="monotone" 
                  dataKey="memory" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  name="Memory %"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Network Activity</CardTitle>
            <CardDescription>Bandwidth utilization over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="network" 
                  stroke="#10b981" 
                  fill="#10b981" 
                  fillOpacity={0.3}
                  name="Network Mbps"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Services Status */}
      <Card>
        <CardHeader>
          <CardTitle>Service Status</CardTitle>
          <CardDescription>Status of core system services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: "RTMP Server", status: "running", uptime: "2d 14h", icon: Server },
              { name: "RTSP Server", status: "running", uptime: "2d 14h", icon: Server },
              { name: "FFmpeg Workers", status: "running", uptime: "1d 8h", icon: Activity },
              { name: "Database", status: "running", uptime: "7d 2h", icon: Database },
              { name: "Web Interface", status: "running", uptime: "2d 14h", icon: Wifi },
              { name: "Monitoring", status: "warning", uptime: "45m", icon: Activity }
            ].map((service, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <service.icon className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{service.name}</p>
                    <p className="text-xs text-muted-foreground">Uptime: {service.uptime}</p>
                  </div>
                </div>
                <Badge 
                  variant={service.status === "running" ? "default" : "destructive"}
                  className={service.status === "running" ? "bg-green-500" : service.status === "warning" ? "bg-yellow-500" : ""}
                >
                  {service.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
