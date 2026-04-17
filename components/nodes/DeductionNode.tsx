"use client";

import { DeductionNode as DeductionNodeType } from "@/types/claim";
import { AlertCircle, Sparkles, Upload, Loader2, CheckCircle2, ShieldCheck, Zap, ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useState } from "react";
import { useClaimStore } from "@/store/useClaimStore";
import AIInsightBox from "../AIInsightBox";

export default function DeductionNode({ node, index }: { node: DeductionNodeType; index: number }) {
  const [isUploading, setIsUploading] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [scanLog, setScanLog] = useState<string>("");
  const updateNodeStatus = useClaimStore((s) => s.updateNodeStatus);

  const isPending = node.status === "Pending";
  const isActionRequired = !!node.actionRequired && isPending;

  const handleSimulateUpload = () => {
    setIsUploading(true);
    setScanLog("INITIALIZING AI CORE...");

    setTimeout(() => setScanLog("EXTRACTING METADATA..."), 600);
    setTimeout(() => setScanLog("OCR AUTHENTICITY CHECK..."), 1200);
    setTimeout(() => setScanLog("VERIFYING WITH POLICY ENGINE..."), 1800);
    setTimeout(() => setScanLog("VALIDATION MATCH: 100%"), 2400);

    setTimeout(() => {
      setIsUploading(false);
      updateNodeStatus(index, "Completed", { actionRequired: undefined });
    }, 3200);
  };

  return (
    <div className="group relative flex flex-col flex-1">
      <div className={cn(
        "p-6 md:p-10 pt-14 md:pt-16 rounded-[2.5rem] flex-1 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border transition-all duration-500 relative flex flex-col overflow-hidden",
        isActionRequired
          ? "bg-white border-error shadow-[0_30px_60px_rgba(var(--error),0.1)] ring-8 ring-error/5"
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
              node.status === "Completed" ? "bg-secondary text-white" : isActionRequired ? "bg-error text-white" : "bg-surface-dim text-on-surface-variant"
            )}>
              {node.status === "Completed" ? <CheckCircle2 className="size-6 stroke-[3]" /> : <AlertCircle className="size-6" />}
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-black text-on-background tracking-tighter uppercase">{node.title}</h3>
              <span className={cn(
                "text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full mt-1 inline-flex items-center gap-1.5",
                isActionRequired ? "bg-error text-white" : node.status === "Completed" ? "bg-secondary/10 text-secondary" : "bg-surface-container text-on-surface-variant/60"
              )}>
                {node.status === "Completed" && <ShieldCheck className="size-3" />}
                {isActionRequired ? "ACTION CRITICAL" : node.status}
              </span>
            </div>
          </div>
        </div>

        <AIInsightBox title={node.title} isOpen={showAI} onClose={() => setShowAI(false)} />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 mt-4">
          {[
            { label: "Occupational", val: node.occupationalDeduction, icon: ShieldCheck },
            { label: "Appreciation", val: node.appreciationDeduction, icon: ClipboardList },
            { label: "Deductible", val: node.policyDeductible, icon: AlertCircle }
          ].map((item, i) => (
            <div key={i} className="p-6 bg-surface-container-low/50 rounded-3xl border border-outline-variant/5 flex flex-col justify-center">
              <p className="text-on-surface-variant font-black text-[10px] uppercase tracking-widest mb-1 opacity-40">{item.label}</p>
              <p className={cn("text-xl md:text-2xl font-black tracking-tighter", item.label === "Deductible" ? "text-error" : "text-on-surface")}>{item.val}</p>
            </div>
          ))}
        </div>

        {isActionRequired && (
          <Button
            onClick={!isUploading ? handleSimulateUpload : undefined}
            disabled={isUploading}
            variant="outline"
            className={cn(
              "w-full h-auto py-6 md:py-10 border-2 border-dashed rounded-[3rem] flex flex-col items-center justify-center transition-all bg-white relative overflow-hidden group/upload mt-auto shadow-sm",
              isUploading ? "border-primary cursor-wait" : "border-outline-variant/30 hover:bg-primary/5 hover:border-primary/50"
            )}
          >
            {isUploading ? (
              <div className="flex flex-col items-center gap-4 relative z-10 px-6">
                <div className="relative">
                  <Loader2 className="size-16 text-primary animate-spin" />
                  <Zap className="size-6 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                </div>
                <div className="text-center">
                  <p className="text-xs font-black text-primary uppercase tracking-[0.4em] mb-2">{scanLog}</p>
                  <div className="h-1.5 w-64 bg-surface-container rounded-full overflow-hidden mx-auto border border-primary/10">
                    <div className="h-full bg-primary w-full origin-left animate-progress-expand"></div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-primary/5 animate-[shimmer_1.5s_infinite]"></div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3 text-center px-10">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-1 group-hover/upload:scale-110 transition-transform shadow-inner border border-primary/20">
                  <Upload className="size-7 text-primary" />
                </div>
                <div>
                  <p className="text-base font-black text-on-background uppercase tracking-tight">AI Validator: Provide File</p>
                  <p className="text-[10px] text-on-surface-variant font-bold ml-4 uppercase opacity-60 tracking-widest mt-1 max-w-[200px]">AI scans for policy matching.</p>
                </div>
              </div>
            )}

            {isUploading && (
              <div className="absolute left-0 right-0 h-[4px] bg-primary shadow-[0_0_30px_rgba(var(--primary),1)] animate-[laser-scan_1.5s_infinite] z-0"></div>
            )}
          </Button>
        )}
      </div>

      <style jsx>{`
        @keyframes laser-scan {
          0% { top: 0%; opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes progress-expand {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        .animate-progress-expand {
          animation: progress-expand 3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}