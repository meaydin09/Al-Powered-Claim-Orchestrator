"use client";

import { useClaimStore } from "@/store/useClaimStore";
import NodeRenderer from "./NodeRenderer";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import AddNodeDialog from "./AddNodeDialog";

export default function Timeline() {
  const claimData = useClaimStore((s) => s.claimData);
  const addDynamicNode = useClaimStore((s) => s.addDynamicNode);
  
  const [dialogState, setDialogState] = useState<{isOpen: boolean, index: number}>({
    isOpen: false,
    index: 0
  });

  if (!claimData) return null;

  const handleOpenDialog = (index: number) => {
    setDialogState({ isOpen: true, index });
  };

  const handleConfirmAdd = (type: "note" | "attachment", data: any) => {
    addDynamicNode(dialogState.index, data);
  };

  return (
    <div className="relative">
      {/* Central Timeline Line - Hidden in Grid/Desktop mode for cleaner layout shift */}
      <div className="absolute left-5 md:left-6 lg:hidden top-8 bottom-8 w-0.5 md:w-1 bg-surface-container-high rounded-full transition-all" />

      {/* Grid Layout: Stacked on mobile/tablet, 2-column grid on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-12 relative items-stretch">
        {claimData.processDetails.map((node, i) => (
          <div key={`${node.title}-${i}`} className="group relative lg:h-full flex flex-col">
            {/* The Node Renderer - Passing Index for Numbering */}
            <NodeRenderer node={node} index={i} />

            {/* Dynamic "Add Note" Button - Positioned at Bottom Left of Card */}
            <div className={cn(
              "absolute -bottom-4 left-6 md:left-10 z-30 transition-all duration-300 transform",
              "opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100",
              "pointer-events-none group-hover:pointer-events-auto"
            )}>
              <Button
                variant="ghost" 
                size="sm"
                onClick={() => handleOpenDialog(i + 1)}
                className="bg-white hover:bg-surface-dim text-[10px] h-8 font-black rounded-xl px-4 border-2 border-primary/20 shadow-xl shadow-primary/10 flex items-center gap-2"
              >
                <Plus className="size-3.5 text-primary" />
                <span className="uppercase tracking-widest text-on-surface">Add Note After</span>
              </Button>
            </div>
          </div>
        ))}
      </div>

      <AddNodeDialog 
        isOpen={dialogState.isOpen}
        index={dialogState.index}
        onClose={() => setDialogState({ ...dialogState, isOpen: false })}
        onAdd={handleConfirmAdd}
      />
    </div>
  );
}