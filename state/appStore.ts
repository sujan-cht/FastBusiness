
import { create } from 'zustand';
import { Screen } from '../types';

type Language = 'en' | 'bn';
type View = 'sales' | 'management';

interface AppState {
  activeScreen: Screen;
  language: Language;
  isSidebarCollapsed: boolean;
  view: View;
  setActiveScreen: (screen: Screen) => void;
  setLanguage: (language: Language) => void;
  toggleSidebar: () => void;
  setView: (view: View) => void;
}

export const useAppStore = create<AppState>((set) => ({
  activeScreen: Screen.Dashboard,
  language: 'en',
  isSidebarCollapsed: false,
  view: 'sales',
  setActiveScreen: (screen) => set({ activeScreen: screen }),
  setLanguage: (language) => set({ language }),
  toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
  setView: (view) => set({ view, activeScreen: Screen.Dashboard }), // Reset to dashboard when switching to management
}));
