
import { create } from 'zustand';
import { Screen } from '../types';

interface NavigationState {
  activeScreen: Screen;
  setActiveScreen: (screen: Screen) => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  activeScreen: Screen.Dashboard,
  setActiveScreen: (screen) => set({ activeScreen: screen }),
}));
