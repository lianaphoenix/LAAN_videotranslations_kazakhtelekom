
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plus, Save, Download, Upload, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const StreamConfig = () => {
  const { toast } = useToast();
  const [config, setConfig] = useState({
    name: "",
    rtmpInput: "",
    rtspOutput: "",
    resolution: "1920x1080",
    bitrate: "2500",
    fps: "30",
    audioCodec: "aac",
    videoCodec: "h264",
    bufferSize: "3M",
    enableAudio: true,
    enableLogging: true,
    autoRestart: true,
    description: ""
  });

  const handleSave = () => {
    toast({
      title: "Configuration Saved",
      description: "Stream configuration has been saved successfully.",
    });
  };

  const handleAddStream = () => {
    if (!config.name || !config.rtmpInput) {
      toast({
        title: "Missing Information",
        description: "Please fill in the stream name and RTMP input URL.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Stream Added",
      description: `Stream "${config.name}" has been added to the converter.`,
    });
    
    // Reset form
    setConfig({
      ...config,
      name: "",
      rtmpInput: "",
      description: ""
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Stream Configuration</h2>
          <p className="text-muted-foreground">Configure RTMP to RTSP conversion settings</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Config
          </Button>
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import Config
          </Button>
        </div>
      </div>

      <Tabs defaultValue="new-stream" className="space-y-4">
        <TabsList>
          <TabsTrigger value="new-stream">New Stream</TabsTrigger>
          <TabsTrigger value="presets">Presets</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="new-stream" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Stream Details</CardTitle>
              <CardDescription>
                Configure the basic stream conversion parameters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="stream-name">Stream Name</Label>
                  <Input
                    id="stream-name"
                    placeholder="e.g., UAV-Alpha-001"
                    value={config.name}
                    onChange={(e) => setConfig({ ...config, name: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="resolution">Resolution</Label>
                  <Select value={config.resolution} onValueChange={(value) => setConfig({ ...config, resolution: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1920x1080">1920x1080 (Full HD)</SelectItem>
                      <SelectItem value="1280x720">1280x720 (HD)</SelectItem>
                      <SelectItem value="854x480">854x480 (SD)</SelectItem>
                      <SelectItem value="640x360">640x360 (Low)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rtmp-input">RTMP Input URL</Label>
                <Input
                  id="rtmp-input"
                  placeholder="rtmp://input.server.com/live/streamkey"
                  value={config.rtmpInput}
                  onChange={(e) => setConfig({ ...config, rtmpInput: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rtsp-output">RTSP Output URL (Auto-generated)</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="rtsp-output"
                    value={config.rtspOutput || `rtsp://output.server.com:554/${config.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`}
                    onChange={(e) => setConfig({ ...config, rtspOutput: e.target.value })}
                    placeholder="rtsp://output.server.com:554/streamname"
                  />
                  <Button size="icon" variant="outline">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Stream description or notes..."
                  value={config.description}
                  onChange={(e) => setConfig({ ...config, description: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Encoding Settings</CardTitle>
              <CardDescription>
                Configure video and audio encoding parameters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bitrate">Bitrate (Kbps)</Label>
                  <Input
                    id="bitrate"
                    type="number"
                    value={config.bitrate}
                    onChange={(e) => setConfig({ ...config, bitrate: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="fps">Frame Rate (FPS)</Label>
                  <Select value={config.fps} onValueChange={(value) => setConfig({ ...config, fps: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="60">60 FPS</SelectItem>
                      <SelectItem value="30">30 FPS</SelectItem>
                      <SelectItem value="25">25 FPS</SelectItem>
                      <SelectItem value="24">24 FPS</SelectItem>
                      <SelectItem value="15">15 FPS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="buffer-size">Buffer Size</Label>
                  <Select value={config.bufferSize} onValueChange={(value) => setConfig({ ...config, bufferSize: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1M">1M</SelectItem>
                      <SelectItem value="3M">3M</SelectItem>
                      <SelectItem value="5M">5M</SelectItem>
                      <SelectItem value="10M">10M</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="video-codec">Video Codec</Label>
                  <Select value={config.videoCodec} onValueChange={(value) => setConfig({ ...config, videoCodec: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="h264">H.264/AVC</SelectItem>
                      <SelectItem value="h265">H.265/HEVC</SelectItem>
                      <SelectItem value="vp8">VP8</SelectItem>
                      <SelectItem value="vp9">VP9</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="audio-codec">Audio Codec</Label>
                  <Select value={config.audioCodec} onValueChange={(value) => setConfig({ ...config, audioCodec: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aac">AAC</SelectItem>
                      <SelectItem value="mp3">MP3</SelectItem>
                      <SelectItem value="opus">Opus</SelectItem>
                      <SelectItem value="pcm">PCM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="enable-audio"
                    checked={config.enableAudio}
                    onCheckedChange={(checked) => setConfig({ ...config, enableAudio: checked })}
                  />
                  <Label htmlFor="enable-audio">Enable Audio</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="enable-logging"
                    checked={config.enableLogging}
                    onCheckedChange={(checked) => setConfig({ ...config, enableLogging: checked })}
                  />
                  <Label htmlFor="enable-logging">Enable Detailed Logging</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="auto-restart"
                    checked={config.autoRestart}
                    onCheckedChange={(checked) => setConfig({ ...config, autoRestart: checked })}
                  />
                  <Label htmlFor="auto-restart">Auto-restart on Failure</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center space-x-4">
            <Button onClick={handleAddStream} className="flex-1">
              <Plus className="h-4 w-4 mr-2" />
              Add Stream
            </Button>
            <Button variant="outline" onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save Configuration
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="presets" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: "High Quality", resolution: "1920x1080", bitrate: "5000", fps: "30", description: "Best quality for professional use" },
              { name: "Balanced", resolution: "1280x720", bitrate: "2500", fps: "30", description: "Good quality with moderate bandwidth" },
              { name: "Low Bandwidth", resolution: "854x480", bitrate: "1000", fps: "25", description: "Optimized for limited bandwidth" }
            ].map((preset, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {preset.name}
                    <Badge variant="outline">{preset.resolution}</Badge>
                  </CardTitle>
                  <CardDescription>{preset.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Bitrate:</span>
                      <span>{preset.bitrate} Kbps</span>
                    </div>
                    <div className="flex justify-between">
                      <span>FPS:</span>
                      <span>{preset.fps}</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    Apply Preset
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced FFmpeg Options</CardTitle>
              <CardDescription>
                Custom FFmpeg parameters for advanced users
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="custom-args">Custom FFmpeg Arguments</Label>
                <Textarea
                  id="custom-args"
                  placeholder="-preset ultrafast -tune zerolatency -bufsize 2M"
                  className="font-mono"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="server-config">RTSP Server Configuration</Label>
                <Textarea
                  id="server-config"
                  placeholder="Custom server configuration parameters..."
                  className="font-mono"
                />
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  ⚠️ Advanced settings can significantly impact performance and stability. 
                  Only modify these if you understand the implications.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
