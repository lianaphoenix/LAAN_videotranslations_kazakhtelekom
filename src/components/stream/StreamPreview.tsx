
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Play, Pause, Volume2, VolumeX, Maximize, Settings } from "lucide-react";

interface StreamPreviewProps {
  streamId: string;
  status: string;
  resolution: string;
}

export const StreamPreview = ({ streamId, status, resolution }: StreamPreviewProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const getPreviewContent = () => {
    if (status === "active") {
      return (
        <div className="relative w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
          {/* Simulated video content */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
          <div className="text-center text-white/80">
            <Play className="h-12 w-12 mx-auto mb-2" />
            <p className="text-sm">Live Stream Preview</p>
            <p className="text-xs opacity-70">{resolution}</p>
          </div>
          
          {/* Video Controls Overlay */}
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between bg-black/50 rounded px-2 py-1">
            <div className="flex items-center space-x-2">
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-6 w-6 text-white hover:bg-white/20"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
              </Button>
              
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-6 w-6 text-white hover:bg-white/20"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-6 w-6 text-white hover:bg-white/20"
              >
                <Settings className="h-3 w-3" />
              </Button>
              
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-6 w-6 text-white hover:bg-white/20"
              >
                <Maximize className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      );
    } else if (status === "starting") {
      return (
        <div className="w-full h-full bg-yellow-50 dark:bg-yellow-900/20 flex items-center justify-center">
          <div className="text-center text-yellow-600 dark:text-yellow-400">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600 mx-auto mb-2"></div>
            <p className="text-sm">Starting stream...</p>
          </div>
        </div>
      );
    } else if (status === "error") {
      return (
        <div className="w-full h-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
          <div className="text-center text-red-600 dark:text-red-400">
            <div className="w-8 h-8 bg-red-600 dark:bg-red-400 rounded-full mx-auto mb-2 flex items-center justify-center">
              <span className="text-white text-xs">!</span>
            </div>
            <p className="text-sm">Stream Error</p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="w-full h-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded mx-auto mb-2"></div>
            <p className="text-sm">Stream Offline</p>
          </div>
        </div>
      );
    }
  };

  return (
    <Card className="overflow-hidden">
      <AspectRatio ratio={16 / 9}>
        {getPreviewContent()}
      </AspectRatio>
    </Card>
  );
};
