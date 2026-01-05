
import { create } from 'zustand';
import { Product, ProductGroup, StockItem, CalculatedStockItem, StockSummary } from '../types';
import { stockItemsData, buildProductGroupTree } from '../data/mockData';

interface StockFilters {
  negativeQty: boolean;
  nonZeroQty: boolean;
  zeroQty: boolean;
}

interface StockState {
  rawStockItems: StockItem[];
  productGroups: ProductGroup[];
  filters: StockFilters;
  searchTerm: string;
  selectedGroupId: string | null;
  
  filteredStockItems: CalculatedStockItem[];
  summary: StockSummary;

  setFilter: (filter: keyof StockFilters, value: boolean) => void;
  setSearchTerm: (term: string) => void;
  setSelectedGroupId: (groupId: string | null) => void;
  _recalculate: () => void;
}

const productGroups = buildProductGroupTree();

const getAllChildGroupIds = (groups: ProductGroup[], parentId: string): string[] => {
    let childIds: string[] = [];
    
    const findGroupInTree = (nodes: ProductGroup[], id: string): ProductGroup | undefined => {
       for (const node of nodes) {
           if (node.id === id) return node;
           if (node.children) {
               const found = findGroupInTree(node.children, id);
               if (found) return found;
           }
       }
       return undefined;
    }

    const traverse = (group: ProductGroup) => {
        if(group.children) {
            for(const child of group.children) {
                childIds.push(child.id);
                traverse(child);
            }
        }
    }

    const startGroup = findGroupInTree(groups, parentId);
    if (startGroup) {
        traverse(startGroup);
    }

    return childIds;
};

const calculateValues = (item: StockItem): CalculatedStockItem => {
    const cost = item.quantity * item.cost;
    const costInclTax = cost * 1.05; // Assuming 5% tax on cost for mock data
    const value = item.quantity * item.salePriceExclTax;
    const valueInclTax = item.quantity * item.salePriceInclTax;

    return {
        id: item.id,
        code: item.code,
        name: item.name,
        quantity: item.quantity,
        unit: item.unit,
        costPrice: item.cost,
        cost,
        costInclTax,
        value,
        valueInclTax,
    };
};

export const useStockStore = create<StockState>((set, get) => ({
  rawStockItems: stockItemsData,
  productGroups: productGroups,
  filters: {
    negativeQty: false,
    nonZeroQty: true, // Default to show non-zero
    zeroQty: false,
  },
  searchTerm: '',
  selectedGroupId: 'all',
  
  filteredStockItems: [], // Initialized by _recalculate
  summary: { totalCost: 0, totalCostInclTax: 0, totalValue: 0, totalValueInclTax: 0 },

  setFilter: (filter, value) => {
    set(state => ({ filters: { ...state.filters, [filter]: value } }));
    get()._recalculate();
  },

  setSearchTerm: (term) => {
    set({ searchTerm: term });
    get()._recalculate();
  },

  setSelectedGroupId: (groupId) => {
    set({ selectedGroupId: groupId });
    get()._recalculate();
  },

  _recalculate: () => {
    const { rawStockItems, filters, searchTerm, selectedGroupId, productGroups } = get();
    let result = [...rawStockItems];

    // Group filter
    if (selectedGroupId && selectedGroupId !== 'all') {
        const groupAndChildrenIds = [selectedGroupId, ...getAllChildGroupIds(productGroups, selectedGroupId)];
        result = result.filter(item => groupAndChildrenIds.includes(item.groupId));
    }
    
    // Quantity filters
    if (filters.negativeQty) {
      result = result.filter(item => item.quantity < 0);
    } else if (filters.zeroQty) {
      result = result.filter(item => item.quantity === 0);
    } else if (filters.nonZeroQty) {
      result = result.filter(item => item.quantity !== 0);
    }

    // Search filter
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      result = result.filter(item => 
        item.name.toLowerCase().includes(lowercasedTerm) || 
        item.code.toLowerCase().includes(lowercasedTerm)
      );
    }

    const calculatedItems = result.map(calculateValues);

    const newSummary = calculatedItems.reduce<StockSummary>((acc, item) => {
      acc.totalCost += item.cost;
      acc.totalCostInclTax += item.costInclTax;
      acc.totalValue += item.value;
      acc.totalValueInclTax += item.valueInclTax;
      return acc;
    }, { totalCost: 0, totalCostInclTax: 0, totalValue: 0, totalValueInclTax: 0 });
    
    set({ filteredStockItems: calculatedItems, summary: newSummary });
  },
}));

// Initial calculation
useStockStore.getState()._recalculate();
