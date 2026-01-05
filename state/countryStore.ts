import { create } from 'zustand';
import { Country } from '../types';
import { countriesData } from '../data/mockData';

interface CountryState {
  countries: Country[];
  selectedCountryId: string | null;
  setSelectedCountryId: (id: string | null) => void;
}

export const useCountryStore = create<CountryState>((set) => ({
  countries: countriesData,
  selectedCountryId: null,
  setSelectedCountryId: (id) => set(state => ({ 
    selectedCountryId: state.selectedCountryId === id ? null : id 
  })),
}));