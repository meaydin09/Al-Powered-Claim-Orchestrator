"use client";

import { FilePlus, MessageSquare, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { AI_INSIGHTS } from "@/lib/ai-insights";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface AIInsightBoxProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function AIInsightBox({ title, isOpen, onClose }: AIInsightBoxProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  const insight = AI_INSIGHTS[title] || AI_INSIGHTS["Unknown Step"];

  const content = (
    <div className="fixed inset-0 z-[100] flex items-end md:items-stretch md:justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm animate-in fade-in duration-300 pointer-events-auto"
        onClick={onClose}
      />

      {/* Sidebar / Drawer Content */}
      <div className={cn(
        "relative bg-white shadow-2xl flex flex-col transition-all duration-500 ease-out z-10",
        // Mobile: Bottom Drawer
        "w-full rounded-t-[3rem] h-[70vh] p-8 animate-in slide-in-from-bottom-full",
        // Desktop: Right Sidebar
        "md:h-full md:w-[450px] md:rounded-none md:rounded-l-[4rem] md:p-12 md:animate-in md:slide-in-from-right-full"
      )}>
        {/* Glow Decor */}
        <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-tertiary/10 blur-[120px] rounded-full pointer-events-none"></div>

        {/* Header */}
        <div className="flex justify-between items-start mb-10 relative z-10">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-tertiary text-white shadow-xl shadow-tertiary/30">
              <Sparkles className="size-6 md:size-7 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-on-surface uppercase tracking-tighter mt-2">AI INSIGHTS</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-2xl bg-surface-container-high border border-outline-variant/10 flex items-center justify-center text-on-surface/60 hover:text-on-surface hover:scale-110 active:scale-95 transition-all shadow-sm"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar relative z-10">
          <div className="space-y-6">
            <p className="text-lg md:text-xl text-on-surface leading-normal font-black tracking-tight opacity-90">
              {title}
            </p>
            <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/10">
              <p className="text-lg md:text-xl text-on-surface leading-normal font-black tracking-tight opacity-90">
                {insight}
              </p>
            </div>
          </div>
        </div>
        <div>
          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-3">Quick Actions</p>
          <div className="grid grid-cols-2 gap-2">
            <button className="flex flex-col items-center gap-2 p-3 bg-white border border-outline-variant/20 rounded-xl hover:bg-slate-50 transition-colors">
              <FilePlus />
              <span className="text-[10px] font-bold">Add Note</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-3 bg-white border border-outline-variant/20 rounded-xl hover:bg-slate-50 transition-colors">
              <MessageSquare />
              <span className="text-[10px] font-bold">Message</span>
            </button>
          </div>
        </div>

        {/* Footer Audit Badge */}
        <div className="mt-8 pt-8 border-t border-outline-variant/10 flex flex-col gap-4 relative z-10">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black bg-tertiary text-white px-4 py-2 rounded-xl uppercase tracking-widest shadow-lg shadow-tertiary/20 flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
              Audit Verified
            </span>
            <span className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-widest">v4.2 Sovereign Agent</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(var(--tertiary), 0.1);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );

  return createPortal(content, document.body);
}
