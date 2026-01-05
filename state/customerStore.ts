import { create } from 'zustand';
import { Customer } from '../types';
import { customersData } from '../data/mockData';

type SearchCategory = 'name' | 'code' | 'phone' | 'taxNumber';

interface CustomerState {
  customers: Customer[];
  searchTerm: string;
  searchCategory: SearchCategory;
  filteredCustomers: Customer[];
  selectedCustomerId: string | null;
  isModalOpen: boolean;
  editingCustomer: Customer | null;

  setSearchTerm: (term: string) => void;
  setSearchCategory: (category: SearchCategory) => void;
  setSelectedCustomerId: (id: string | null) => void;
  openModal: (customer?: Customer | null) => void;
  closeModal: () => void;
  saveCustomer: (customerData: Partial<Customer>) => void;
  deleteCustomer: () => void;
  _filterCustomers: () => void;
}

export const useCustomerStore = create<CustomerState>((set, get) => ({
  customers: customersData,
  searchTerm: '',
  searchCategory: 'name',
  filteredCustomers: customersData,
  selectedCustomerId: null,
  isModalOpen: false,
  editingCustomer: null,

  setSearchTerm: (term) => {
    set({ searchTerm: term });
    get()._filterCustomers();
  },

  setSearchCategory: (category) => {
    set({ searchCategory: category });
    get()._filterCustomers();
  },
  
  setSelectedCustomerId: (id) => set(state => ({ 
    selectedCustomerId: state.selectedCustomerId === id ? null : id 
  })),

  openModal: (customer = null) => set({ isModalOpen: true, editingCustomer: customer }),
  closeModal: () => set({ isModalOpen: false, editingCustomer: null }),

  saveCustomer: (customerData) => {
    set(state => {
      if (customerData.id) { // Editing existing
        return {
          customers: state.customers.map(c => c.id === customerData.id ? { ...c, ...customerData } as Customer : c)
        };
      } else { // Adding new
        const newCustomer: Customer = {
          id: `C${Date.now()}`,
          code: customerData.code || '',
          name: customerData.name || '',
          taxNumber: customerData.taxNumber || '',
          address: customerData.address || '',
          phone: customerData.phone || '',
          active: customerData.active !== undefined ? customerData.active : true,
          isCustomer: customerData.isCustomer !== undefined ? customerData.isCustomer : true,
        };
        return { customers: [...state.customers, newCustomer] };
      }
    });
    get()._filterCustomers();
    get().closeModal();
  },

  deleteCustomer: () => {
    const { selectedCustomerId } = get();
    if (!selectedCustomerId) return;
    set(state => ({
      customers: state.customers.filter(c => c.id !== selectedCustomerId),
      selectedCustomerId: null,
    }));
    get()._filterCustomers();
  },

  _filterCustomers: () => {
    const { customers, searchTerm, searchCategory } = get();
    let result = [...customers];
    if (searchTerm) {
        const lowercasedTerm = searchTerm.toLowerCase();
        result = customers.filter(customer => {
          const valueToSearch = customer[searchCategory]?.toString().toLowerCase() || '';
          return valueToSearch.includes(lowercasedTerm);
        });
    }
    set({ filteredCustomers: result });
  },
}));