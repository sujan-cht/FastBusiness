import { create } from 'zustand';
import { PaymentType } from '../types';
import { paymentTypesData } from '../data/mockData';

interface PaymentTypeState {
  paymentTypes: PaymentType[];
  selectedPaymentTypeId: string | null;
  isModalOpen: boolean;
  editingPaymentType: PaymentType | null;

  setSelectedPaymentTypeId: (id: string | null) => void;
  updatePaymentType: (id: string, key: keyof PaymentType, value: any) => void;
  openModal: (paymentType?: PaymentType | null) => void;
  closeModal: () => void;
  savePaymentType: (data: Partial<PaymentType>) => void;
  deletePaymentType: () => void;
}

export const usePaymentTypeStore = create<PaymentTypeState>((set, get) => ({
  paymentTypes: paymentTypesData.sort((a, b) => a.position - b.position),
  selectedPaymentTypeId: null,
  isModalOpen: false,
  editingPaymentType: null,

  setSelectedPaymentTypeId: (id) => set(state => ({ 
    selectedPaymentTypeId: state.selectedPaymentTypeId === id ? null : id 
  })),
  
  updatePaymentType: (id, key, value) => set(state => ({
      paymentTypes: state.paymentTypes.map(pt => 
          pt.id === id ? { ...pt, [key]: value } : pt
      )
  })),

  openModal: (paymentType = null) => set({ isModalOpen: true, editingPaymentType: paymentType }),
  closeModal: () => set({ isModalOpen: false, editingPaymentType: null }),
  
  savePaymentType: (data) => {
    set(state => {
      const { paymentTypes } = state;
      if (data.id) { // Editing
        return {
          paymentTypes: paymentTypes.map(pt => pt.id === data.id ? { ...pt, ...data } as PaymentType : pt)
        };
      } else { // Adding
        const newPaymentType: PaymentType = {
          id: `PT${Date.now()}`,
          name: data.name || 'New Payment Type',
          position: data.position || paymentTypes.length + 1,
          code: data.code || '',
          enabled: data.enabled !== undefined ? data.enabled : true,
          quickPayment: data.quickPayment !== undefined ? data.quickPayment : false,
          customerRequired: data.customerRequired !== undefined ? data.customerRequired : false,
          changeAllowed: data.changeAllowed !== undefined ? data.changeAllowed : true,
          markAsPaid: data.markAsPaid !== undefined ? data.markAsPaid : true,
          printReceipt: data.printReceipt !== undefined ? data.printReceipt : true,
          shortcutKey: data.shortcutKey || '',
        };
        return { paymentTypes: [...paymentTypes, newPaymentType] };
      }
    });
    get().closeModal();
  },

  deletePaymentType: () => {
    const { selectedPaymentTypeId } = get();
    if (!selectedPaymentTypeId) return;
    set(state => ({
      paymentTypes: state.paymentTypes.filter(pt => pt.id !== selectedPaymentTypeId),
      selectedPaymentTypeId: null,
    }));
  },
}));