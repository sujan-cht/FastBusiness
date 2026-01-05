import { create } from 'zustand';
import { CompanyData } from '../types';
import { companyData as initialData } from '../data/mockData';

interface CompanyState {
  data: CompanyData;
  updateField: (field: keyof CompanyData, value: string) => void;
  saveData: () => void;
}

export const useCompanyStore = create<CompanyState>((set, get) => ({
  data: initialData,

  updateField: (field, value) => set(state => ({
    data: { ...state.data, [field]: value }
  })),

  saveData: () => {
    const currentState = get().data;
    console.log("Saving company data:", currentState);
    alert("Company data saved successfully! (Check console for details)");
  },
}));