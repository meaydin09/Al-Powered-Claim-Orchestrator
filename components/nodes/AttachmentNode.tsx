"use client";

import { DynamicAttachmentNode } from "@/types/claim";
import { FileText, Download, Trash2, ShieldCheck, FileIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useClaimStore } from "@/store/useClaimStore";
import { Button } from "../ui/button";

export default function AttachmentNode({ node, index }: { node: DynamicAttachmentNode; index: number }) {
  const removeDynamicNode = useClaimStore((s) => s.removeDynamicNode);

  return (
    <div className="group relative flex flex-col flex-1 animate-in slide-in-from-left-4 duration-500">
      <div className="bg-white p-6 md:p-10 pt-14 md:pt-16 rounded-[2.5rem] flex-1 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-outline-variant/10 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-500 relative flex flex-col">
        {/* Step Badge */}
        <div className="absolute top-6 left-8 flex items-center gap-2">
           <div className="w-7 h-7 rounded-xl bg-surface-container flex items-center justify-center text-xs font-black text-on-surface border border-outline-variant/10 shadow-sm">
              {index + 1}
           </div>
           <div className="text-[10px] font-black text-on-surface-variant/30 uppercase tracking-[0.2em]">Step</div>
        </div>

        {/* Delete Button - Only for Dynamic Nodes */}
        {node.isDynamic && (
          <div className="absolute top-6 right-8">
            <button 
              onClick={() => removeDynamicNode(index)}
              className="w-9 h-9 rounded-xl bg-error/5 text-error flex items-center justify-center hover:bg-error hover:text-white transition-all shadow-sm border border-error/10 active:scale-90"
              title="Remove Attachment"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-primary/5 text-primary shadow-inner">
                    <FileIcon className="size-6" />
                </div>
                <div>
                   <h3 className="text-lg md:text-xl font-black text-on-background tracking-tighter uppercase">Additional Attachment</h3>
                   <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full mt-1 inline-flex items-center gap-1.5 bg-primary/5 text-primary">
                        <ShieldCheck className="size-3" />
                        SECURE_UPLOAD
                   </span>
                </div>
            </div>
        </div>

        <div className="mt-auto p-6 bg-surface-container-low/50 rounded-3xl border border-outline-variant/5 flex flex-col sm:flex-row items-center gap-6 group/file">
           <div className="w-14 h-14 rounded-2xl bg-white border border-outline-variant/10 flex items-center justify-center text-primary shadow-sm group-hover/file:scale-110 transition-transform">
              <FileText className="size-7" />
           </div>
           <div className="flex-1 text-center sm:text-left">
              <p className="text-base font-black text-on-surface tracking-tight uppercase truncate max-w-[200px]">{node.fileName}</p>
              <p className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.2em] mt-1">
                {node.fileSize} • {node.fileType.split('/')[1].toUpperCase()}
              </p>
           </div>
           <Button size="sm" variant="outline" className="h-10 px-4 rounded-xl font-black text-[10px] uppercase tracking-widest border-outline-variant/20 hover:bg-primary hover:text-white transition-all flex items-center gap-2">
              <Download className="size-3.5" />
              Download
           </Button>
        </div>
        
        <p className="text-[9px] font-bold text-on-surface-variant/30 mt-4 text-center uppercase tracking-widest leading-none">
          SECURELY STORED ON {node.addedAt}
        </p>
      </div>
    </div>
  );
}
