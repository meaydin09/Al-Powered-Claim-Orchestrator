"use client";

import { AppraisalNode as AppraisalNodeType } from "@/types/claim";
import { Check, UserSearch, FileText, Sparkles, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import AIInsightBox from "../AIInsightBox";
import { Button } from "../ui/button";

export default function AppraisalNode({ node, index }: { node: AppraisalNodeType; index: number }) {
  const [showAI, setShowAI] = useState(false);
  const isCompleted = node.status === "Report Completed";

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
                    {isCompleted ? <Check className="size-6 stroke-[3]" /> : <UserSearch className="size-6" />}
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
        
        <div className="p-6 md:p-8 bg-surface-container-low rounded-[2rem] border border-outline-variant/10 flex flex-col sm:flex-row items-center gap-6 mb-8 mt-auto">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl border-4 border-white bg-white flex items-center justify-center overflow-hidden flex-shrink-0 shadow-lg ring-1 ring-primary/5">
             <img src="https://api.dicebear.com/7.x/pixel-art/svg?seed=Expert" alt="Expert" className="w-full h-full object-cover" />
          </div>
          <div className="text-center sm:text-left">
            <p className="text-lg md:text-xl font-black text-on-surface tracking-tight">{node.expertinfo}</p>
            <div className="flex items-center justify-center sm:justify-start gap-2 mt-1">
                <MapPin className="size-3 text-primary" />
                <p className="text-[10px] md:text-[11px] text-on-surface-variant font-black uppercase tracking-widest leading-none">Senior Insurance Expert</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 mt-3 text-[10px] font-bold text-on-surface uppercase tracking-widest opacity-60">
              <span>Contact: {node.contact}</span>
            </div>
            <p className="text-[9px] font-bold text-on-surface-variant/40 mt-2">ASSIGNED ON {node.expertAssignmentDate}</p>
          </div>
        </div>

        {isCompleted && (
          <div className="p-4 md:p-6 bg-primary/[0.03] rounded-2xl border border-primary/10 flex flex-col sm:flex-row gap-4 justify-between items-center group/file cursor-pointer hover:bg-white transition-all shadow-sm">
            <div className="flex items-center gap-4 min-w-0">
               <div className="p-3 bg-white rounded-xl shadow-sm text-primary group-hover/file:bg-primary group-hover/file:text-white transition-colors">
                 <FileText className="size-6" />
               </div>
               <div className="min-w-0">
                  <p className="text-sm md:text-base font-black text-on-surface truncate">CERTIFIED_APPRAISAL_REPORT.PDF</p>
                  <p className="text-[10px] font-black text-primary uppercase tracking-widest mt-0.5">Verified Metadata • 4.1 MB</p>
               </div>
            </div>
            <Button size="lg" className="w-full sm:w-auto rounded-xl font-black text-xs h-12 px-6 bg-on-background text-white shadow-xl hover:bg-primary">OBTAIN</Button>
          </div>
        )}
      </div>
    </div>
  );
}
