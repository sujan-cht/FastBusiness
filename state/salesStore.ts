import { create } from 'zustand';
import { ReceiptItem, Product } from '../types';
import { productsData } from '../data/mockData';

interface SalesState {
  receiptItems: ReceiptItem[];
  isOverlayOpen: boolean;
  productsForSale: Product[];
  editingItem: ReceiptItem | null;
  isEditModalOpen: boolean;
  addItem: (product: Product) => void;
  updateItemQuantity: (id: string, newQuantity: number) => void;
  removeItem: (id: string) => void;
  clearReceipt: () => void;
  toggleOverlay: (isOpen?: boolean) => void;
  openEditModal: (item: ReceiptItem) => void;
  closeEditModal: () => void;
  saveItemEdit: (itemData: { id: string; quantity: number; price: number; discount: number }) => void;
  calculateTotals: () => { subtotal: number; tax: number; total: number };
}

export const useSalesStore = create<SalesState>((set, get) => ({
  receiptItems: [],
  isOverlayOpen: false,
  productsForSale: productsData.filter(p => p.active),
  editingItem: null,
  isEditModalOpen: false,
  
  addItem: (product) => {
    const { receiptItems } = get();
    const existingItem = receiptItems.find(item => item.id === product.id);

    if (existingItem) {
      get().updateItemQuantity(product.id, existingItem.quantity + 1);
    } else {
      const newItem: ReceiptItem = {
        id: product.id,
        name: product.name,
        quantity: 1,
        price: product.salePriceInclTax,
        discount: 0,
        total: product.salePriceInclTax,
      };
      set({ receiptItems: [...receiptItems, newItem] });
    }
  },

  updateItemQuantity: (id, newQuantity) => {
    if (newQuantity <= 0) {
      get().removeItem(id);
    } else {
      set(state => ({
        receiptItems: state.receiptItems.map(item => {
          if (item.id === id) {
            const newTotal = (item.price * newQuantity) - (item.discount || 0);
            return { ...item, quantity: newQuantity, total: newTotal };
          }
          return item;
        }),
      }));
    }
  },

  removeItem: (id) => {
    set(state => ({
      receiptItems: state.receiptItems.filter(item => item.id !== id),
    }));
  },

  clearReceipt: () => set({ receiptItems: [] }),
  
  toggleOverlay: (isOpen) => set(state => ({ isOverlayOpen: isOpen !== undefined ? isOpen : !state.isOverlayOpen })),

  openEditModal: (item) => set({ editingItem: item, isEditModalOpen: true }),
  closeEditModal: () => set({ editingItem: null, isEditModalOpen: false }),

  saveItemEdit: (itemData) => {
    const { id, quantity, price, discount } = itemData;
    if (quantity <= 0) {
      get().removeItem(id);
    } else {
      set(state => ({
        receiptItems: state.receiptItems.map(item => {
          if (item.id === id) {
            const newTotal = (price * quantity) - discount;
            return { ...item, quantity, price, discount, total: newTotal };
          }
          return item;
        })
      }));
    }
    get().closeEditModal();
  },

  calculateTotals: () => {
    const { receiptItems } = get();
    const subtotal = receiptItems.reduce((acc, item) => acc + item.total, 0);
    const tax = subtotal * 0.05; // Mock 5% tax
    const total = subtotal + tax;
    return { subtotal, tax, total };
  }
}));