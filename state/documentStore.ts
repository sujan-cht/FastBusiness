import { create } from 'zustand';
import { Document, DocumentItem } from '../types';
import { documentsData, documentItemsData } from '../data/mockData';

interface DocumentFilters {
  product: string;
  customer: string;
  user: string;
  documentType: string;
  cashRegister: string;
  paidStatus: string;
  documentNumber: string;
  externalDocument: string;
  period: string;
}

interface DocumentState {
  filters: DocumentFilters;
  documents: Document[];
  selectedDocumentId: number | null;
  documentItems: DocumentItem[];
  isAddModalOpen: boolean;
  setFilter: (filter: keyof DocumentFilters, value: string) => void;
  clearFilters: () => void;
  setSelectedDocumentId: (id: number | null) => void;
  toggleAddModal: (isOpen: boolean) => void;
  _filterDocuments: () => void;
}

const initialFilters: DocumentFilters = {
  product: '',
  customer: '',
  user: '',
  documentType: '',
  cashRegister: '',
  paidStatus: '',
  documentNumber: '',
  externalDocument: '',
  period: '',
};

export const useDocumentStore = create<DocumentState>((set, get) => ({
  filters: initialFilters,
  documents: documentsData,
  selectedDocumentId: null,
  documentItems: [],
  isAddModalOpen: false,

  _filterDocuments: () => {
    const { filters } = get();
    let filteredDocs = [...documentsData];

    if (filters.product) {
        // Find all document IDs that contain the selected product
        const docIdsWithProduct = Object.values(documentItemsData)
            .flat()
            .filter(item => item.name === filters.product)
            .map(item => item.documentId);
        const uniqueDocIds = [...new Set(docIdsWithProduct)];
        filteredDocs = filteredDocs.filter(doc => uniqueDocIds.includes(doc.id));
    }
    if (filters.customer) {
        filteredDocs = filteredDocs.filter(d => d.customer === filters.customer);
    }
    if (filters.user) {
        filteredDocs = filteredDocs.filter(d => d.user === filters.user);
    }
    if (filters.documentType) {
        filteredDocs = filteredDocs.filter(d => d.documentType === filters.documentType);
    }
    if (filters.cashRegister) {
        filteredDocs = filteredDocs.filter(d => d.pos === filters.cashRegister);
    }
    if (filters.paidStatus) {
        filteredDocs = filteredDocs.filter(d => d.paid === filters.paidStatus);
    }
    if (filters.documentNumber) {
        filteredDocs = filteredDocs.filter(d => d.number.toLowerCase().includes(filters.documentNumber.toLowerCase()));
    }
    if (filters.externalDocument) {
        filteredDocs = filteredDocs.filter(d => d.external.toLowerCase().includes(filters.externalDocument.toLowerCase()));
    }
    if (filters.period) {
        // Simple date match for now
        filteredDocs = filteredDocs.filter(d => d.date.includes(filters.period));
    }
    
    // Reset selection if the selected document is no longer in the filtered list
    const { selectedDocumentId } = get();
    if (selectedDocumentId && !filteredDocs.some(d => d.id === selectedDocumentId)) {
        set({ selectedDocumentId: null, documentItems: [] });
    }

    set({ documents: filteredDocs });
  },
  
  setFilter: (filter, value) => {
    set(state => ({
      filters: { ...state.filters, [filter]: value }
    }));
    get()._filterDocuments();
  },
  
  clearFilters: () => {
    set({ filters: initialFilters });
    get()._filterDocuments();
  },

  setSelectedDocumentId: (id: number | null) => {
    const items = id ? documentItemsData[id] || [] : [];
    set({ selectedDocumentId: id, documentItems: items });
  },

  toggleAddModal: (isOpen: boolean) => set({ isAddModalOpen: isOpen }),
}));