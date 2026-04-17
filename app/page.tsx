"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchClaim } from "@/lib/api";
import { useClaimStore } from "@/store/useClaimStore";
import { useEffect, useMemo } from "react";
import Timeline from "@/components/Timeline";
import { Shield, Bell, Settings, Download, MessageSquare, Home as HomeIcon, FileText, Activity, User, Clock, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Home() {
  const { setClaimData, claimData } = useClaimStore();

  const { data, isLoading: isApiLoading, isError } = useQuery({
    queryKey: ["claim"],
    queryFn: fetchClaim,
  });

  useEffect(() => {
    if (data) {
      setClaimData(data);
    }
  }, [data, setClaimData]);

  const actionRequired = useMemo(() => {
    return claimData?.processDetails.find(node => "actionRequired" in node && node.actionRequired && node.status === "Pending");
  }, [claimData]);

  if (isApiLoading || !claimData) {
    return (
      <div className="flex h-screen items-center justify-center bg-surface">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-on-surface font-black animate-pulse uppercase tracking-[0.2em] text-[10px]">Gathering Intelligence...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-screen items-center justify-center bg-surface">
        <p className="text-error font-black uppercase tracking-widest">Connection Error. Data Desync.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#f8f9fc] text-on-background min-h-screen pb-24 lg:pb-0">
      {/* Premium Navigation Header */}
      <header className="bg-white/70 backdrop-blur-xl border-b border-outline-variant/20 flex justify-between items-center px-4 md:px-12 h-20 sticky top-0 z-[100] shadow-sm">
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                <Shield className="size-6 text-white" />
            </div>
            <div className="flex flex-col">
                <span className="text-xl font-black text-on-background tracking-tighter leading-none">SOVEREIGN</span>
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mt-0.5">Orchestrator</span>
            </div>
        </div>
        <div className="flex items-center gap-2 md:gap-6">
          <div className="hidden md:flex items-center gap-8 mr-8">
             <a href="#" className="text-[11px] font-black uppercase tracking-widest text-primary border-b-2 border-primary pb-1">Orchestration</a>
             <a href="#" className="text-[11px] font-black uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors">Documents</a>
             <a href="#" className="text-[11px] font-black uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors">Insights</a>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full bg-surface-container-low border border-outline-variant/10">
            <Bell className="size-5 text-on-surface-variant" />
          </Button>
          <div className="w-10 h-10 rounded-xl bg-surface-container border-2 border-white overflow-hidden shadow-md">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
              alt="User" 
              className="w-full h-full object-cover" 
            />
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Desktop (Wide & Fixed) */}
        <aside className="hidden lg:flex flex-col h-[calc(100vh-80px)] w-80 p-8 gap-8 bg-white border-r border-outline-variant/20 sticky top-20">
          <div className="p-6 bg-primary/[0.03] rounded-[2rem] border border-primary/10 shadow-inner">
              <div className="text-[10px] font-black text-primary uppercase tracking-widest mb-4">Active Session</div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center border border-primary/10">
                    <FileText className="size-6 text-primary" />
                </div>
                <div>
                    <p className="text-sm font-black text-on-background">File #{claimData.fileNo}</p>
                    <p className="text-[10px] font-bold text-on-surface-variant">Policy Active</p>
                </div>
              </div>
              <div className="space-y-3">
                 <div className="flex justify-between text-[10px] font-bold">
                    <span className="text-on-surface-variant/60">ORCHESTRATION PROGRESS</span>
                    <span className="text-primary">65%</span>
                 </div>
                 <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[65%] rounded-full shadow-[0_0_10px_rgba(var(--primary),0.3)]"></div>
                 </div>
              </div>
          </div>
          
          <nav className="space-y-2">
             <Button variant="ghost" className="w-full justify-start gap-4 rounded-2xl py-7 font-black text-on-surface-variant hover:bg-surface hover:text-primary transition-all">
                <HomeIcon className="size-5" /> Dashboard
             </Button>
             <Button variant="secondary" className="w-full justify-start gap-4 rounded-2xl py-7 font-black bg-primary text-white shadow-xl shadow-primary/20">
                <Activity className="size-5 text-white" /> Live Orchestrator
             </Button>
             <Button variant="ghost" className="w-full justify-start gap-4 rounded-2xl py-7 font-black text-on-surface-variant hover:bg-surface hover:text-primary transition-all">
                <Settings className="size-5" /> Preferences
             </Button>
          </nav>

          <div className="mt-auto">
             <div className="p-4 bg-tertiary/10 rounded-2xl border border-tertiary/20 mb-4 text-[10px] font-bold text-tertiary leading-relaxed uppercase tracking-tighter">
                AI Agent is currently monitoring your claim for faster settlement.
             </div>
             <Button className="w-full bg-on-background text-white rounded-2xl py-7 font-black hover:bg-primary transition-all shadow-xl">
                NEW REQUEST
             </Button>
          </div>
        </aside>

        {/* Main Content (WIDER - max-w-7xl) */}
        <main className="flex-1 max-w-[1440px] mx-auto px-4 md:px-12 lg:px-16 py-8 md:py-12">
          
          <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                 <span className="h-px w-8 bg-primary"></span>
                 <span className="text-[11px] font-black text-primary uppercase tracking-[0.3em]">Operational Intel</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-on-background lg:leading-tight">
                Claim Management <br /> <span className="text-on-surface-variant/40">Dashboard</span>
              </h1>
            </div>
            <div className="flex flex-col items-center lg:items-end gap-4">
              <div className="flex gap-4">
                <Button variant="outline" className="h-14 px-8 rounded-2xl border-outline-variant/30 hover:bg-white font-black text-xs uppercase tracking-widest shadow-sm">
                  <Download className="size-5 mr-3" /> Report
                </Button>
                <Button className="h-14 px-10 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-primary/30 hover:scale-105 transition-transform">
                  CONTACT OPS
                </Button>
              </div>
              {/* Mobile Only File No Badge - Centered & Larger */}
              <div className="lg:hidden flex items-center gap-3 bg-white px-8 py-3 rounded-2xl border border-outline-variant/10 shadow-md self-center">
                <FileText className="size-4 text-primary" />
                <span className="text-xs font-black text-on-surface uppercase tracking-widest">File #{claimData.fileNo}</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics (Ansver within 3s) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white p-8 rounded-[2.5rem] border border-outline-variant/10 shadow-sm hover:shadow-xl transition-all group">
              <div className="h-12 w-12 rounded-2xl bg-surface-container flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <Shield className="size-6 text-primary group-hover:text-white" />
              </div>
              <p className="text-[11px] font-black text-on-surface-variant/50 uppercase tracking-[0.2em] mb-2">Claim Status</p>
              <p className="text-xl font-black text-on-surface">{claimData.currentStatus}</p>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-outline-variant/10 shadow-sm hover:shadow-xl transition-all animate-in zoom-in-95 group">
              <div className="h-12 w-12 rounded-2xl bg-tertiary-fixed flex items-center justify-center mb-6">
                <Clock className="size-6 text-on-tertiary-fixed-variant" />
              </div>
              <p className="text-[11px] font-black text-on-tertiary-fixed-variant/50 uppercase tracking-[0.2em] mb-2">Estimated Arrival</p>
              <div className="flex items-baseline gap-2">
                <p className="text-4xl font-black text-on-surface tracking-tighter">{claimData.estimatedRemainingTime.split(' ')[0]}</p>
                <p className="text-sm font-black text-on-surface-variant uppercase">Days</p>
              </div>
            </div>

            <div className={cn(
              "p-8 rounded-[2.5rem] border flex flex-col transition-all group",
              actionRequired 
                ? "bg-error text-white shadow-2xl shadow-error/30 ring-8 ring-error/5" 
                : "bg-surface-container-low border-outline-variant/10"
            )}>
              <div className={cn(
                "h-12 w-12 rounded-2xl flex items-center justify-center mb-6",
                actionRequired ? "bg-white text-error" : "bg-secondary-container text-on-secondary-container"
              )}>
                {actionRequired ? <AlertTriangle className="size-6" /> : <CheckCircle2 className="size-6" />}
              </div>
              <p className={cn(
                "text-[11px] font-black uppercase tracking-[0.2em] mb-2",
                actionRequired ? "text-white/60" : "text-on-secondary-container/50"
              )}>Priority Action</p>
              <p className="text-xl font-black leading-tight">
                {actionRequired ? (actionRequired as any).actionRequired : "Status Stabilized"}
              </p>
            </div>
          </div>

          {/* Timeline - NO CONTAINER, WIDE GRID */}
          <div className="mb-20">
             <div className="flex items-center gap-6 mb-12">
                <h2 className="text-2xl font-black tracking-tighter uppercase whitespace-nowrap">Process Orchestration</h2>
                <div className="h-[2px] w-full bg-gradient-to-r from-outline-variant/30 to-transparent"></div>
             </div>
             <Timeline />
          </div>
        </main>
      </div>

      {/* Modern Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 h-20 bg-white/90 backdrop-blur-2xl border-t border-outline-variant/20 flex lg:hidden items-center justify-around px-8 z-[200] pb-2">
         <button className="flex flex-col items-center gap-1.5 text-primary">
            <div className="w-12 h-1 bg-primary rounded-full mb-1"></div>
            <Activity className="size-6" />
            <span className="text-[10px] font-black uppercase tracking-widest">Live</span>
         </button>
         <button className="flex flex-col items-center gap-1.5 text-on-surface-variant/40">
            <div className="w-12 h-1 bg-transparent mb-1"></div>
            <FileText className="size-6" />
            <span className="text-[10px] font-black uppercase tracking-widest">Docs</span>
         </button>
         <button className="flex flex-col items-center gap-1.5 text-on-surface-variant/40">
            <div className="w-12 h-1 bg-transparent mb-1"></div>
            <User className="size-6" />
            <span className="text-[10px] font-black uppercase tracking-widest">Profile</span>
         </button>
      </nav>

      {/* AI Floating Assistant */}
      <button className="fixed bottom-24 right-6 lg:bottom-12 lg:right-12 w-16 h-16 bg-on-background text-white rounded-2xl flex items-center justify-center shadow-3xl hover:scale-110 active:scale-95 transition-all z-[200] ring-8 ring-on-background/10">
        <MessageSquare className="size-7" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full animate-ping"></div>
      </button>
    </div>
  );
}
