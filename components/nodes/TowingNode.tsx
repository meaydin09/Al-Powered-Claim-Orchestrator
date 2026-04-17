"use client";

import { TowingNode as TowingNodeType } from "@/types/claim";
import { Check, Truck, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import AIInsightBox from "../AIInsightBox";
import { Button } from "../ui/button";

export default function TowingNode({ node, index }: { node: TowingNodeType; index: number }) {
  const [showAI, setShowAI] = useState(false);
  const isCompleted = node.status === "Completed";

  return (
    <div className="group relative flex flex-col flex-1">
      <div className={cn(
        "bg-white p-6 md:p-10 pt-14 md:pt-16 rounded-[2.5rem] flex-1 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-outline-variant/10 hover:shadow-[0_20px_50px_rgba(var(--primary),0.1)] transition-all duration-500 relative flex flex-col",
        isCompleted && "border-secondary/20 bg-gradient-to-br from-white to-secondary/[0.02]"
      )}>
        {/* Step Badge */}
        <div className="absolute top-6 left-8 flex items-center gap-2">
           <div className="w-7 h-7 rounded-xl bg-surface-container flex items-center justify-center text-xs font-black text-on-surface border border-outline-variant/10 shadow-sm">
              {index + 1}
           </div>
           <div className="text-[10px] font-black text-on-surface-variant/30 uppercase tracking-[0.2em]">Step</div>
        </div>

        {/* AI Button - Top Right */}
        <div className="absolute top-6 right-8">
            <Button 
                onClick={() => setShowAI(!showAI)}
                className="h-9 px-4 text-[10px] font-black bg-tertiary text-white rounded-xl uppercase tracking-widest hover:bg-tertiary/90 transition-all shadow-lg shadow-tertiary/20 flex items-center gap-2 group/ai font-headline"
            >
                <Sparkles className="size-4 group-hover/ai:rotate-12 transition-transform" />
                <span>AI</span>
            </Button>
        </div>

        {/* Node Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
                <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner transition-transform group-hover:scale-110",
                    isCompleted ? "bg-secondary text-white" : "bg-surface-dim text-on-surface-variant"
                )}>
                    {isCompleted ? <Check className="size-6 stroke-[3]" /> : <Truck className="size-6" />}
                </div>
                <div>
                   <h3 className="text-lg md:text-xl font-black text-on-background tracking-tighter uppercase">{node.title}</h3>
                   <span className={cn(
                        "text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full mt-1 inline-block",
                        isCompleted ? "bg-secondary/10 text-secondary" : "bg-surface-container text-on-surface-variant/60"
                   )}>
                        {node.status}
                   </span>
                </div>
            </div>
        </div>

        <AIInsightBox title={node.title} isOpen={showAI} onClose={() => setShowAI(false)} />
        
        {/* Content Area - WIDER & CLEARER */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-auto pt-8 border-t border-outline-variant/10">
          <div className="space-y-1.5">
            <p className="text-primary font-black text-[10px] uppercase tracking-widest">Pickup Origin</p>
            <p className="font-bold text-on-surface text-base md:text-lg lg:text-xl leading-none">{node.pickupLocation}</p>
          </div>
          <div className="space-y-1.5">
            <p className="text-primary font-black text-[10px] uppercase tracking-widest">Deployment Date</p>
            <p className="font-bold text-on-surface text-base md:text-lg lg:text-xl leading-none">{node.towingDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}