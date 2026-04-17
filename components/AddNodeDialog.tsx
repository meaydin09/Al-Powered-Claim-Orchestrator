"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, StickyNote, Paperclip, Send, Loader2, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface AddNodeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (type: "note" | "attachment", data: any) => void;
  index: number;
}

export default function AddNodeDialog({ isOpen, onClose, onAdd, index }: AddNodeDialogProps) {
  const [activeTab, setActiveTab] = useState<"note" | "attachment">("note");
  const [content, setContent] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setContent("");
      setActiveTab("note");
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === "note" && !content.trim()) return;

    if (activeTab === "note") {
      onAdd("note", {
        title: "Information Note",
        status: "Added",
        noteContent: content,
        addedAt: new Date().toLocaleString(),
        isDynamic: true,
      });
      onClose();
    } else {
      // Simulate Attachment Upload
      setIsUploading(true);
      setTimeout(() => {
        setIsUploading(false);
        onAdd("attachment", {
          title: "Additional Attachment",
          status: "Uploaded",
          fileName: content || "document_upload_42.pdf",
          fileSize: (Math.random() * 5 + 1).toFixed(1) + " MB",
          fileType: "application/pdf",
          addedAt: new Date().toLocaleString(),
          isDynamic: true,
        });
        onClose();
      }, 2000);
    }
  };

  const contentUI = (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-on-surface/60 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Dialog Body */}
      <div className="relative w-full max-w-lg bg-white rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-white/20">
        {/* Glow Decor */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

        <div className="p-8 md:p-10">
          {/* Header */}
          <div className="flex justify-between items-start mb-8 relative z-10">
            <div>
              <h2 className="text-2xl font-black text-on-surface tracking-tighter uppercase leading-none">Process Insertion</h2>
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.3em] mt-2 opacity-50">Expanding the claim architecture</p>
            </div>
            <button 
              onClick={onClose}
              className="w-10 h-10 rounded-2xl bg-surface-container-high flex items-center justify-center text-on-surface/60 hover:text-on-surface hover:scale-110 transition-all"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex p-1.5 bg-surface-container rounded-2xl mb-8 relative z-10">
            <button 
              onClick={() => setActiveTab("note")}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                activeTab === "note" ? "bg-white text-primary shadow-sm" : "text-on-surface-variant hover:text-on-surface"
              )}
            >
              <StickyNote className="size-4" />
              Note
            </button>
            <button 
              onClick={() => setActiveTab("attachment")}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                activeTab === "attachment" ? "bg-white text-primary shadow-sm" : "text-on-surface-variant hover:text-on-surface"
              )}
            >
              <Paperclip className="size-4" />
              File
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="relative z-10">
            {activeTab === "note" ? (
              <div className="space-y-4">
                <label className="text-[10px] font-black text-primary uppercase tracking-widest ml-2">Note Content</label>
                <textarea 
                  autoFocus
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Type your observations or context here..."
                  className="w-full h-32 p-6 bg-surface-container-low rounded-3xl border border-outline-variant/10 focus:border-primary/30 focus:ring-4 focus:ring-primary/5 outline-none transition-all resize-none text-sm font-bold text-on-surface placeholder:text-on-surface-variant/30"
                />
              </div>
            ) : (
              <div className="space-y-4">
                <label className="text-[10px] font-black text-primary uppercase tracking-widest ml-2">File Meta-description</label>
                <input 
                  type="text"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="e.g. damaged_bumper_photo.jpg"
                  className="w-full p-6 bg-surface-container-low rounded-2xl border border-outline-variant/10 focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all text-sm font-bold text-on-surface"
                />
                <div className="p-8 border-2 border-dashed border-outline-variant/30 rounded-3xl flex flex-col items-center justify-center text-center bg-surface-container-low/30 group hover:border-primary/40 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-4 text-on-surface-variant group-hover:scale-110 transition-transform">
                    <FileText className="size-6" />
                  </div>
                  <p className="text-xs font-black text-on-surface-variant uppercase tracking-widest">Auto-detecting file metadata...</p>
                </div>
              </div>
            )}

            <Button 
              type="submit"
              disabled={isUploading || (activeTab === "note" && !content.trim())}
              className="w-full h-14 md:h-16 mt-8 rounded-2xl bg-on-background text-white font-black uppercase tracking-[0.2em] shadow-xl hover:bg-primary transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
            >
              {isUploading ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Send className="size-4" />
                  Inject Node
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );

  return createPortal(contentUI, document.body);
}
