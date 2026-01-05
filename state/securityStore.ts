import { create } from 'zustand';
import { User } from '../types';
import { usersData } from '../data/mockData';

interface SecurityState {
  users: User[];
  showInactive: boolean;
  filteredUsers: User[];
  selectedUserId: string | null;
  isModalOpen: boolean;
  editingUser: User | null;

  toggleShowInactive: () => void;
  setSelectedUserId: (id: string | null) => void;
  openModal: (user?: User | null) => void;
  closeModal: () => void;
  saveUser: (user: Partial<User>) => void;
  deleteUser: () => void;
  _filterUsers: () => void;
}

export const useSecurityStore = create<SecurityState>((set, get) => ({
  users: usersData,
  showInactive: false,
  filteredUsers: usersData.filter(u => u.active),
  selectedUserId: null,
  isModalOpen: false,
  editingUser: null,

  toggleShowInactive: () => {
    set(state => ({ showInactive: !state.showInactive }));
    get()._filterUsers();
  },
  
  setSelectedUserId: (id) => set(state => ({ 
      selectedUserId: state.selectedUserId === id ? null : id 
  })),

  openModal: (user = null) => set({ isModalOpen: true, editingUser: user }),
  closeModal: () => set({ isModalOpen: false, editingUser: null }),

  saveUser: (userData) => {
    set(state => {
      if (userData.id) { // Editing existing user
        return {
          users: state.users.map(u => u.id === userData.id ? { ...u, ...userData } : u)
        };
      } else { // Adding new user
        const newUser: User = {
          id: `U${Date.now()}`,
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          email: userData.email || '',
          accessLevel: userData.accessLevel || 10,
          active: userData.active !== undefined ? userData.active : true,
        };
        return { users: [...state.users, newUser] };
      }
    });
    get()._filterUsers();
    get().closeModal();
  },

  deleteUser: () => {
      const { selectedUserId } = get();
      if (!selectedUserId) return;
      set(state => ({
          users: state.users.filter(u => u.id !== selectedUserId),
          selectedUserId: null,
      }));
      get()._filterUsers();
  },

  _filterUsers: () => {
    const { users, showInactive } = get();
    if (showInactive) {
      set({ filteredUsers: users });
    } else {
      set({ filteredUsers: users.filter(u => u.active) });
    }
  },
}));