"use client";

import { DynamicNoteNode } from "@/types/claim";
import { StickyNote, Sparkles, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import AIInsightBox from "../AIInsightBox";
import { Button } from "../ui/button";
import { useClaimStore } from "@/store/useClaimStore";

export default function NoteNode({ node, index }: { node: DynamicNoteNode; index: number }) {
  const [showAI, setShowAI] = useState(false);
  const removeDynamicNode = useClaimStore((s) => s.removeDynamicNode);

  return (
    <div className="group relative flex flex-col flex-1 animate-in zoom-in-95 duration-700">
      <div className="bg-amber-50/50 p-6 md:p-10 pt-14 md:pt-16 rounded-[2.5rem] flex-1 shadow-[0_8px_30px_rgba(245,158,11,0.05)] border border-amber-200/50 hover:bg-amber-50 transition-all duration-500 relative flex flex-col">
        {/* Step Badge */}
        <div className="absolute top-6 left-8 flex items-center gap-2">
           <div className="w-7 h-7 rounded-xl bg-amber-100 flex items-center justify-center text-xs font-black text-amber-900 border border-amber-200/10 shadow-sm">
              {index + 1}
           </div>
           <div className="text-[10px] font-black text-amber-900/40 uppercase tracking-[0.2em]">Step</div>
        </div>

        {/* Delete Button - Only for Dynamic Nodes */}
        {node.isDynamic && (
          <div className="absolute top-6 right-8 flex items-center gap-2">
            <button 
              onClick={() => removeDynamicNode(index)}
              className="w-9 h-9 rounded-xl bg-error/5 text-error flex items-center justify-center hover:bg-error hover:text-white transition-all shadow-sm border border-error/10 active:scale-95"
              title="Remove Note"
            >
              <Trash2 className="size-4" />
            </button>
            <Button 
                onClick={() => setShowAI(!showAI)}
                className="h-9 px-4 text-[10px] font-black bg-amber-200 text-amber-900 rounded-xl uppercase tracking-widest hover:bg-amber-300 transition-all border border-amber-400/20 flex items-center gap-2 group/ai font-headline"
            >
                <Sparkles className="size-4 group-hover/ai:rotate-12 transition-transform" />
                <span>AI</span>
            </Button>
          </div>
        )}

        {/* AI Button - Top Right (Fallback if not dynamic) */}
        {!node.isDynamic && (
          <div className="absolute top-6 right-8">
            <Button 
                onClick={() => setShowAI(!showAI)}
                className="h-9 px-4 text-[10px] font-black bg-amber-200 text-amber-900 rounded-xl uppercase tracking-widest hover:bg-amber-300 transition-all border border-amber-400/20 flex items-center gap-2 group/ai font-headline"
            >
                <Sparkles className="size-4 group-hover/ai:rotate-12 transition-transform" />
                <span>AI</span>
            </Button>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-amber-100 text-amber-700 shadow-inner group-hover:rotate-6 transition-transform">
                    <StickyNote className="size-6" />
                </div>
                <div>
                   <h3 className="text-lg md:text-xl font-black text-amber-900 tracking-tighter uppercase">Information Note</h3>
                   <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full mt-1 inline-block bg-amber-200/50 text-amber-800">
                        ADDED {node.addedAt.split(',')[0]}
                   </span>
                </div>
            </div>
        </div>

        <AIInsightBox title={node.title} isOpen={showAI} onClose={() => setShowAI(false)} />

        <div className="mt-auto pt-8 border-t border-amber-200/30">
            <p className="text-lg md:text-xl text-amber-900 leading-tight font-black tracking-tight italic">
              "{node.noteContent}"
            </p>
        </div>
      </div>
    </div>
  );
}
