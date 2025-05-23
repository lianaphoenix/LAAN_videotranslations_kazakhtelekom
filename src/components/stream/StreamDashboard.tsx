
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { StreamPreview } from "./StreamPreview";
import { StreamControls } from "./StreamControls";
import { Play, Pause, Square, AlertTriangle, CheckCircle, Clock, Zap } from "lucide-react";

interface Stream {
  id: string;
  name: string;
  rtmpInput: string;
  rtspOutput: string;
  status: "active" | "inactive" | "error" | "starting";
  bitrate: number;
  fps: number;
  resolution: string;
  uptime: number;
  viewers: number;
}

export const StreamDashboard = () => {
  const [streams, setStreams] = useState<Stream[]>([
    {
      id: "stream-1",
      name: "UAV-Alpha-001",
      rtmpInput: "rtmp://input.server.com/live/uav001",
      rtspOutput: "rtsp://output.server.com:554/uav001",
      status: "active",
      bitrate: 2500,
      fps: 30,
      resolution: "1920x1080",
      uptime: 3600,
      viewers: 5
    },
    {
      id: "stream-2", 
      name: "Security-Cam-B",
      rtmpInput: "rtmp://input.server.com/live/sec002",
      rtspOutput: "rtsp://output.server.com:554/sec002",
      status: "active",
      bitrate: 1800,
      fps: 25,
      resolution: "1280x720",
      uptime: 7200,
      viewers: 12
    },
    {
      id: "stream-3",
      name: "Event-Stream-C",
      rtmpInput: "rtmp://input.server.com/live/event003",
      rtspOutput: "rtsp://output.server.com:554/event003",
      status: "error",
      bitrate: 0,
      fps: 0,
      resolution: "Unknown",
      uptime: 0,
      viewers: 0
    },
    {
      id: "stream-4",
      name: "Drone-Delta-004",
      rtmpInput: "rtmp://input.server.com/live/drone004",
      rtspOutput: "rtsp://output.server.com:554/drone004",
      status: "starting",
      bitrate: 0,
      fps: 0,
      resolution: "1920x1080",
      uptime: 0,
      viewers: 0
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "starting":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <Square className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      case "starting":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const handleStreamAction = (streamId: string, action: "start" | "stop" | "restart") => {
    setStreams(prev => prev.map(stream => {
      if (stream.id === streamId) {
        switch (action) {
          case "start":
            return { ...stream, status: "starting" as const };
          case "stop":
            return { ...stream, status: "inactive" as const, bitrate: 0, fps: 0, uptime: 0 };
          case "restart":
            return { ...stream, status: "starting" as const };
          default:
            return stream;
        }
      }
      return stream;
    }));
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Streams</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{streams.length}</div>
            <p className="text-xs text-muted-foreground">
              {streams.filter(s => s.status === "active").length} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Viewers</CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {streams.reduce((sum, stream) => sum + stream.viewers, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all streams
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Bitrate</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(streams.reduce((sum, stream) => sum + stream.bitrate, 0) / streams.length)} Kbps
            </div>
            <p className="text-xs text-muted-foreground">
              Real-time average
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">98%</div>
            <Progress value={98} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Stream Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {streams.map((stream) => (
          <Card key={stream.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(stream.status)}
                  <CardTitle className="text-lg">{stream.name}</CardTitle>
                </div>
                <Badge 
                  variant="outline" 
                  className={`text-white ${getStatusColor(stream.status)}`}
                >
                  {stream.status.toUpperCase()}
                </Badge>
              </div>
              <CardDescription className="text-xs">
                {stream.rtmpInput} → {stream.rtspOutput}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Stream Preview */}
              <StreamPreview 
                streamId={stream.id} 
                status={stream.status}
                resolution={stream.resolution}
              />

              {/* Stream Stats */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <p className="text-muted-foreground">Bitrate</p>
                  <p className="font-medium">{stream.bitrate} Kbps</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">FPS</p>
                  <p className="font-medium">{stream.fps}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">Resolution</p>
                  <p className="font-medium">{stream.resolution}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">Uptime</p>
                  <p className="font-medium">{formatUptime(stream.uptime)}</p>
                </div>
              </div>

              {/* Stream Controls */}
              <StreamControls 
                streamId={stream.id}
                status={stream.status}
                onAction={handleStreamAction}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
