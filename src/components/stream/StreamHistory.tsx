
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Search, Download, Filter, Clock, CheckCircle, AlertTriangle, XCircle } from "lucide-react";

interface HistoryEntry {
  id: string;
  streamName: string;
  startTime: string;
  endTime: string;
  duration: string;
  status: "completed" | "error" | "terminated";
  viewers: number;
  avgBitrate: number;
  totalData: string;
  errorMessage?: string;
}

export const StreamHistory = () => {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  const historyData: HistoryEntry[] = [
    {
      id: "hist-1",
      streamName: "UAV-Alpha-001",
      startTime: "2024-01-20 14:30:00",
      endTime: "2024-01-20 16:45:00",
      duration: "2h 15m",
      status: "completed",
      viewers: 8,
      avgBitrate: 2400,
      totalData: "1.2 GB"
    },
    {
      id: "hist-2", 
      streamName: "Security-Cam-B",
      startTime: "2024-01-20 12:00:00",
      endTime: "2024-01-20 18:00:00",
      duration: "6h 0m",
      status: "completed",
      viewers: 15,
      avgBitrate: 1800,
      totalData: "3.8 GB"
    },
    {
      id: "hist-3",
      streamName: "Event-Stream-C",
      startTime: "2024-01-20 10:15:00",
      endTime: "2024-01-20 10:32:00",
      duration: "17m",
      status: "error",
      viewers: 3,
      avgBitrate: 0,
      totalData: "45 MB",
      errorMessage: "RTMP connection lost"
    },
    {
      id: "hist-4",
      streamName: "Drone-Delta-004",
      startTime: "2024-01-19 16:20:00",
      endTime: "2024-01-19 17:55:00",
      duration: "1h 35m",
      status: "terminated",
      viewers: 12,
      avgBitrate: 2800,
      totalData: "950 MB"
    },
    {
      id: "hist-5",
      streamName: "UAV-Alpha-001",
      startTime: "2024-01-19 09:00:00",
      endTime: "2024-01-19 12:30:00",
      duration: "3h 30m",
      status: "completed",
      viewers: 6,
      avgBitrate: 2500,
      totalData: "2.1 GB"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "terminated":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      case "terminated":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const filteredHistory = historyData.filter(entry => {
    const matchesFilter = filter === "all" || entry.status === filter;
    const matchesSearch = entry.streamName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalSessions = historyData.length;
  const completedSessions = historyData.filter(h => h.status === "completed").length;
  const errorSessions = historyData.filter(h => h.status === "error").length;
  const totalViewers = historyData.reduce((sum, h) => sum + h.viewers, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Stream History</h2>
          <p className="text-muted-foreground">View past streaming sessions and analytics</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSessions}</div>
            <p className="text-xs text-muted-foreground">
              Last 7 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              {Math.round((completedSessions / totalSessions) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {completedSessions} completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Viewers</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalViewers}</div>
            <p className="text-xs text-muted-foreground">
              Across all sessions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">
              {Math.round((errorSessions / totalSessions) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {errorSessions} failed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search streams..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sessions</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="error">Errors</SelectItem>
                <SelectItem value="terminated">Terminated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* History Table */}
      <Card>
        <CardHeader>
          <CardTitle>Session History</CardTitle>
          <CardDescription>
            Detailed view of past streaming sessions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredHistory.map((entry) => (
              <div key={entry.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(entry.status)}
                    <div>
                      <h3 className="font-semibold">{entry.streamName}</h3>
                      <p className="text-sm text-muted-foreground">
                        {entry.startTime} - {entry.endTime}
                      </p>
                    </div>
                  </div>
                  
                  <Badge 
                    variant="outline" 
                    className={`text-white ${getStatusColor(entry.status)}`}
                  >
                    {entry.status.toUpperCase()}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Duration</p>
                    <p className="font-medium">{entry.duration}</p>
                  </div>
                  
                  <div>
                    <p className="text-muted-foreground">Viewers</p>
                    <p className="font-medium">{entry.viewers}</p>
                  </div>
                  
                  <div>
                    <p className="text-muted-foreground">Avg Bitrate</p>
                    <p className="font-medium">{entry.avgBitrate} Kbps</p>
                  </div>
                  
                  <div>
                    <p className="text-muted-foreground">Data Transferred</p>
                    <p className="font-medium">{entry.totalData}</p>
                  </div>
                  
                  <div className="flex items-center">
                    {entry.errorMessage && (
                      <div className="text-red-600 text-xs">
                        <p className="font-medium">Error:</p>
                        <p>{entry.errorMessage}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
