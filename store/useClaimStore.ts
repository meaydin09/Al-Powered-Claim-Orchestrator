import { create } from "zustand";
import { ClaimData, ProcessNode } from "@/types/claim";

interface ClaimState {
    claimData: ClaimData | null;
    isLoading: boolean;
    error: string | null;
    
    // Actions
    setClaimData: (data: ClaimData) => void;
    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
    
    // Dynamic node management
    addDynamicNode: (index: number, node: ProcessNode) => void;
    removeDynamicNode: (index: number) => void;
    updateNodeStatus: (index: number, newStatus: string, additionalProps?: Partial<ProcessNode>) => void;
}

export const useClaimStore = create<ClaimState>((set) => ({
    claimData: null,
    isLoading: true,
    error: null,

    setClaimData: (data) => set({ claimData: data, isLoading: false, error: null }),
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error, isLoading: false }),

    addDynamicNode: (index, node) =>
        set((state) => {
            if (!state.claimData) return state;
            const newProcessDetails = [...state.claimData.processDetails];
            // Insert node at the specific index
            newProcessDetails.splice(index, 0, node);

            return {
                claimData: {
                    ...state.claimData,
                    processDetails: newProcessDetails,
                },
            };
        }),

    removeDynamicNode: (index) =>
        set((state) => {
            if (!state.claimData) return state;
            const newProcessDetails = [...state.claimData.processDetails];
            newProcessDetails.splice(index, 1);

            return {
                claimData: {
                    ...state.claimData,
                    processDetails: newProcessDetails,
                },
            };
        }),

    updateNodeStatus: (index, newStatus, additionalProps = {}) =>
        set((state) => {
            if (!state.claimData) return state;
            const newProcessDetails = [...state.claimData.processDetails];
            const node = newProcessDetails[index];
            
            if (node) {
                newProcessDetails[index] = { 
                    ...node, 
                    status: newStatus,
                    ...additionalProps 
                } as ProcessNode;
            }

            return {
                claimData: {
                    ...state.claimData,
                    processDetails: newProcessDetails,
                },
            };
        }),
}));