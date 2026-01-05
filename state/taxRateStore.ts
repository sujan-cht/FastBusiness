import { create } from 'zustand';
import { TaxRate } from '../types';
import { taxRatesData } from '../data/mockData';

interface TaxRateState {
  taxRates: TaxRate[];
  selectedTaxRateId: string | null;
  setSelectedTaxRateId: (id: string | null) => void;
}

export const useTaxRateStore = create<TaxRateState>((set) => ({
  taxRates: taxRatesData,
  selectedTaxRateId: null,
  setSelectedTaxRateId: (id) => set(state => ({ 
    selectedTaxRateId: state.selectedTaxRateId === id ? null : id 
  })),
}));