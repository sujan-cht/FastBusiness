import { create } from 'zustand';
import { Promotion } from '../types';
import { promotionsData } from '../data/mockData';

interface PromotionState {
  promotions: Promotion[];
  selectedPromotionId: string | null;
  setSelectedPromotionId: (id: string | null) => void;
}

export const usePromotionStore = create<PromotionState>((set) => ({
  promotions: promotionsData,
  selectedPromotionId: null,
  setSelectedPromotionId: (id) => set(state => ({ 
    selectedPromotionId: state.selectedPromotionId === id ? null : id 
  })),
}));