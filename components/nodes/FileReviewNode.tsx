"use client";

import { FileReviewNode as FileReviewNodeType } from "@/types/claim";
import { Eye, Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import AIInsightBox from "../AIInsightBox";
import { Button } from "../ui/button";

export default function FileReviewNode({ node, index }: { node: FileReviewNodeType; index: number }) {
  const [showAI, setShowAI] = useState(false);
  const isInProgress = node.status === "In Progress";

  return (
    <div className="group relative flex flex-col flex-1">
      <div className={cn(
        "p-6 md:p-10 pt-14 md:pt-16 rounded-[2.5rem] flex-1 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border transition-all duration-500 relative flex flex-col",
        isInProgress 
          ? "bg-white border-primary shadow-[0_20px_60px_rgba(var(--primary),0.12)] ring-8 ring-primary/5" 
          : "bg-white border-outline-variant/10"
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
                    isInProgress ? "bg-primary text-white" : "bg-surface-dim text-on-surface-variant"
                )}>
                    {isInProgress ? <Loader2 className="size-6 animate-spin" /> : <Eye className="size-6" />}
                </div>
                <div>
                   <h3 className="text-lg md:text-xl font-black text-on-background tracking-tighter uppercase">{node.title}</h3>
                   <span className={cn(
                        "text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full mt-1 inline-flex items-center gap-1.5",
                        isInProgress ? "bg-primary text-white" : "bg-surface-container text-on-surface-variant/60"
                   )}>
                        {isInProgress && <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>}
                        {node.status}
                   </span>
                </div>
            </div>
        </div>

        <AIInsightBox title={node.title} isOpen={showAI} onClose={() => setShowAI(false)} />
        
        <p className="text-base md:text-xl text-on-surface-variant leading-relaxed mb-10 mt-4 font-bold opacity-70 tracking-tight">
           {isInProgress 
             ? "Our legal and insurance orchestration team is currently validating all collected data against the policy coverage limits via state-of-the-art AI auditing."
             : "The file review has been completed and the next steps are being finalized by the automatic orchestrator."}
        </p>

        <div className="flex flex-wrap gap-4 mt-auto">
           <div className="px-6 py-3 bg-surface-container-high rounded-2xl text-[10px] font-black text-on-surface uppercase tracking-widest flex items-center gap-3 border border-outline-variant/10">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_8px_rgba(var(--primary),0.5)]"></span>
              INITIATED {node.reviewReferralDate}
           </div>
           {node.reviewCompletionDate && (
             <div className="px-6 py-3 bg-primary/[0.03] rounded-2xl text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-3 border border-primary/10">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                ESTIMATED COMPLETION: {node.reviewCompletionDate}
             </div>
           )}
        </div>
      </div>
    </div>
  );
}