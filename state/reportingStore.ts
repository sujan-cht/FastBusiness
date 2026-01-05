
import { create } from 'zustand';

interface ReportFilters {
    customer: string;
    user: string;
    cashRegister: string;
    product: string;
    productGroup: string;
    includeSubgroups: boolean;
    dateRange: string;
}

interface ReportingState {
    reportSearchTerm: string;
    selectedReportId: string | null;
    filters: ReportFilters;

    setReportSearchTerm: (term: string) => void;
    setSelectedReportId: (id: string | null) => void;
    setFilter: (filter: keyof ReportFilters, value: string | boolean) => void;
}

const initialFilters: ReportFilters = {
    customer: '',
    user: '',
    cashRegister: '',
    product: '',
    productGroup: '',
    includeSubgroups: true,
    dateRange: '',
};

export const useReportingStore = create<ReportingState>((set) => ({
    reportSearchTerm: '',
    selectedReportId: null,
    filters: initialFilters,

    setReportSearchTerm: (term) => set({ reportSearchTerm: term }),
    setSelectedReportId: (id) => set({ selectedReportId: id, filters: initialFilters }), // Reset filters on new report selection
    setFilter: (filter, value) => set(state => ({
        filters: { ...state.filters, [filter]: value }
    })),
}));
