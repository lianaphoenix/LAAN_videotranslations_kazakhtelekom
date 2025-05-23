
import { Button } from "@/components/ui/button";
import { Play, Pause, Square, RotateCcw, Settings, Trash2 } from "lucide-react";

interface StreamControlsProps {
  streamId: string;
  status: string;
  onAction: (streamId: string, action: "start" | "stop" | "restart") => void;
}

export const StreamControls = ({ streamId, status, onAction }: StreamControlsProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        {status === "active" ? (
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => onAction(streamId, "stop")}
          >
            <Pause className="h-4 w-4 mr-2" />
            Stop
          </Button>
        ) : (
          <Button 
            size="sm"
            onClick={() => onAction(streamId, "start")}
            disabled={status === "starting"}
          >
            <Play className="h-4 w-4 mr-2" />
            {status === "starting" ? "Starting..." : "Start"}
          </Button>
        )}
        
        <Button 
          size="sm" 
          variant="outline"
          onClick={() => onAction(streamId, "restart")}
          disabled={status === "starting"}
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Restart
        </Button>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button size="sm" variant="ghost">
          <Settings className="h-4 w-4" />
        </Button>
        
        <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
