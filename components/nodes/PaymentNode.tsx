"use client";

import { PaymentNode as PaymentNodeType } from "@/types/claim";
import { Check, CreditCard, Lock, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import AIInsightBox from "../AIInsightBox";
import { Button } from "../ui/button";

export default function PaymentNode({ node, index }: { node: PaymentNodeType; index: number }) {
  const [showAI, setShowAI] = useState(false);
  const isPending = node.status === "Pending";

  return (
    <div className={cn("group relative flex flex-col flex-1 transition-all duration-700", isPending && "opacity-60")}>
      <div className="bg-white p-6 md:p-10 pt-14 md:pt-16 rounded-[2.5rem] flex-1 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-outline-variant/10 relative flex flex-col">
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
                    isPending ? "bg-surface-dim text-on-surface-variant" : "bg-secondary text-white"
                )}>
                    {isPending ? <Lock className="size-6" /> : <Check className="size-6 stroke-[3]" />}
                </div>
                <div>
                   <h3 className="text-lg md:text-xl font-black text-on-background tracking-tighter uppercase">{node.title}</h3>
                   <span className={cn(
                        "text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full mt-1 inline-block",
                        isPending ? "bg-surface-container text-on-surface-variant/60" : "bg-secondary/10 text-secondary"
                   )}>
                        {node.status}
                   </span>
                </div>
            </div>
        </div>

        <AIInsightBox title={node.title} isOpen={showAI} onClose={() => setShowAI(false)} />
        
        <div className="mt-auto pt-8 border-t border-outline-variant/10">
           {!isPending ? (
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="p-6 bg-surface-container-low/50 rounded-3xl border border-outline-variant/5">
                    <p className="text-primary font-black text-[10px] uppercase tracking-[0.2em] mb-2">Target Payee</p>
                    <p className="font-black text-on-surface text-xl md:text-2xl leading-none tracking-tighter">{node.paidTo}</p>
                </div>
                <div className="p-6 bg-surface-container-low/50 rounded-3xl border border-outline-variant/5">
                    <p className="text-primary font-black text-[10px] uppercase tracking-[0.2em] mb-2">Total Amount</p>
                    <p className="font-black text-primary text-xl md:text-2xl leading-none tracking-tighter">{node.paymentAmount}</p>
                </div>
                <div className="col-span-1 sm:col-span-2">
                    <p className="text-primary font-black text-[10px] uppercase tracking-[0.2em] mb-2 ml-2">Destination IBAN (Encrypted)</p>
                    <p className="font-mono text-xs md:text-sm font-black text-on-surface-variant break-all bg-on-background text-white p-6 rounded-3xl border border-outline-variant/10 shadow-xl">
                        {node.iban.replace(/(.{4})/g, '$1 ')}
                    </p>
                </div>
             </div>
           ) : (
             <div className="p-8 bg-surface-container-low/30 rounded-[2rem] border border-dashed border-outline-variant/20 flex items-center justify-center text-center">
                <p className="text-sm md:text-base text-on-surface-variant/60 font-black uppercase tracking-widest leading-relaxed">
                    Financial settlement vault is currently sealed. <br /> Details will unlock upon final audit.
                </p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
