"use client";

import { SubstituteRentalNode as RentalNodeType } from "@/types/claim";
import { Check, Car, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import AIInsightBox from "../AIInsightBox";
import { Button } from "../ui/button";

export default function RentalNode({ node, index }: { node: RentalNodeType; index: number }) {
  const [showAI, setShowAI] = useState(false);
  const isCompleted = node.status === "Completed";

  return (
    <div className="group relative flex flex-col flex-1">
      <div className={cn(
        "bg-white p-6 md:p-10 pt-14 md:pt-16 rounded-[2.5rem] flex-1 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-outline-variant/10 hover:shadow-[0_20px_50px_rgba(var(--primary),0.1)] transition-all duration-500 relative flex flex-col",
        isCompleted && "bg-gradient-to-br from-white to-secondary/[0.01]"
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

        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
                <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner transition-transform group-hover:scale-110",
                    isCompleted ? "bg-secondary text-white" : "bg-surface-dim text-on-surface-variant"
                )}>
                    {isCompleted ? <Check className="size-6 stroke-[3]" /> : <Car className="size-6" />}
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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 mt-auto pt-8 border-t border-outline-variant/10">
          <div className="p-6 md:p-8 bg-surface-container-low/50 rounded-3xl border border-outline-variant/5">
            <p className="text-primary font-black text-[10px] md:text-[11px] mb-3 uppercase tracking-[0.2em]">Deployment Model</p>
            <p className="font-black text-on-surface text-lg md:text-2xl leading-tight tracking-tighter">{node.vehicleModel}</p>
          </div>
          <div className="p-6 md:p-8 bg-surface-container-low/50 rounded-3xl border border-outline-variant/5">
            <p className="text-primary font-black text-[10px] md:text-[11px] mb-3 uppercase tracking-[0.2em]">Service Window</p>
            <p className="font-black text-on-surface text-lg md:text-2xl leading-tight tracking-tighter">{node.vehicleDuration}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
