import { create } from 'zustand';
import { Product, ProductGroup } from '../types';
import { productsData, buildProductGroupTree } from '../data/mockData';

// Initial data that can be "refreshed"
const initialProducts = productsData;

// Helper function to find a group by ID in a tree structure
const findGroupById = (groups: ProductGroup[], id: string): ProductGroup | null => {
    for (const group of groups) {
        if (group.id === id) {
            return group;
        }
        if (group.children) {
            const found = findGroupById(group.children, id);
            if (found) {
                return found;
            }
        }
    }
    return null;
};

interface ProductState {
  products: Product[];
  productGroups: ProductGroup[];
  selectedGroupId: string | null;
  selectedProductId: string | null;
  searchTerm: string;
  filteredProducts: Product[];
  
  isGroupModalOpen: boolean;
  isProductModalOpen: boolean;
  editingGroup: ProductGroup | null;
  editingProduct: Product | null;

  productGroupLayout: 'side' | 'bottom';

  setSearchTerm: (term: string) => void;
  setSelectedGroupId: (groupId: string | null) => void;
  setSelectedProductId: (productId: string | null) => void;
  
  openGroupModal: (group?: ProductGroup) => void;
  closeGroupModal: () => void;
  saveGroup: (groupData: Pick<ProductGroup, 'name' | 'parentId'> & { id?: string }) => void;
  deleteGroup: () => void;

  openProductModal: (product?: Product) => void;
  closeProductModal: () => void;
  saveProduct: (productData: Omit<Product, 'groupName'>) => void;
  deleteProduct: () => void;
  
  refreshData: () => void;
  toggleProductGroupLayout: () => void;
  
  _filterProducts: () => void;
}

const productGroups = buildProductGroupTree();

const getAllChildGroupIds = (groups: ProductGroup[], parentId: string): string[] => {
    let childIds: string[] = [];
    const findChildren = (id: string) => {
        const group = groups.find(g => g.id === id);
        if (group?.children) {
            group.children.forEach(child => {
                childIds.push(child.id);
                findChildren(child.id);
            });
        }
    };

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

    const startGroup = findGroupInTree(groups, parentId);
    if (startGroup?.children) {
        startGroup.children.forEach(child => {
             childIds.push(child.id);
             findChildren(child.id);
        })
    }

    return childIds;
};

export const useProductStore = create<ProductState>((set, get) => ({
  products: initialProducts,
  productGroups: productGroups,
  selectedGroupId: 'all',
  selectedProductId: null,
  searchTerm: '',
  filteredProducts: initialProducts,
  
  isGroupModalOpen: false,
  isProductModalOpen: false,
  editingGroup: null,
  editingProduct: null,
  
  productGroupLayout: 'side',

  setSearchTerm: (term) => {
    set({ searchTerm: term });
    get()._filterProducts();
  },
  
  setSelectedGroupId: (groupId) => {
    set({ selectedGroupId: groupId, selectedProductId: null }); // Deselect product when group changes
    get()._filterProducts();
  },

  setSelectedProductId: (productId) => {
    set(state => ({ selectedProductId: state.selectedProductId === productId ? null : productId }));
  },

  openGroupModal: (group) => set({ isGroupModalOpen: true, editingGroup: group || null }),
  closeGroupModal: () => set({ isGroupModalOpen: false, editingGroup: null }),
  
  saveGroup: (groupData) => {
    // This is a mock implementation. In a real app, you'd post to a server.
    alert(`Group "${groupData.name}" saved! (Functionality is mocked)`);
    get().closeGroupModal();
  },
  
  deleteGroup: () => {
    const { selectedGroupId } = get();
    if (selectedGroupId && selectedGroupId !== 'all') {
       if(confirm('Are you sure you want to delete this group? This cannot be undone.')) {
           alert(`Group with ID ${selectedGroupId} deleted! (Functionality is mocked)`);
           set({ selectedGroupId: 'all' });
           get()._filterProducts();
       }
    }
  },

  openProductModal: (product) => set({ isProductModalOpen: true, editingProduct: product || null }),
  closeProductModal: () => set({ isProductModalOpen: false, editingProduct: null }),
  
  saveProduct: (productData) => {
    set(state => {
        const products = [...state.products];
        const index = products.findIndex(p => p.id === productData.id);

        const group = findGroupById(state.productGroups, productData.groupId);
        const groupName = group ? group.name : 'Uncategorized';

        const productWithGroup = { ...productData, groupName };

        if (index > -1) { // Editing existing product
            const updatedProduct = { 
                ...productWithGroup, 
                updatedDate: new Date().toISOString().split('T')[0] 
            };
            products[index] = updatedProduct as Product;
        } else { // Adding new product
            const newProduct = { 
                ...productWithGroup, 
                updatedDate: productData.createdDate // On creation, updated equals created
            };
            products.push(newProduct as Product);
        }
        return { products };
    });
    get()._filterProducts();
    get().closeProductModal();
  },
  
  deleteProduct: () => {
    const { selectedProductId } = get();
    if (selectedProductId) {
       if(confirm('Are you sure you want to delete this product?')) {
           set(state => ({
               products: state.products.filter(p => p.id !== selectedProductId),
               selectedProductId: null,
           }));
           get()._filterProducts();
       }
    }
  },
  
  refreshData: () => {
      set({ products: initialProducts, searchTerm: '', selectedGroupId: 'all' });
      get()._filterProducts();
  },

  toggleProductGroupLayout: () => set(state => ({
      productGroupLayout: state.productGroupLayout === 'side' ? 'bottom' : 'side'
  })),

  _filterProducts: () => {
    const { products, selectedGroupId, searchTerm, productGroups } = get();
    let result = [...products];
    
    // Filter by selected group
    if (selectedGroupId && selectedGroupId !== 'all') {
        const groupAndChildrenIds = [selectedGroupId, ...getAllChildGroupIds(productGroups, selectedGroupId)];
        result = result.filter(p => groupAndChildrenIds.includes(p.groupId));
    }

    // Filter by search term
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(lowercasedTerm) || 
        p.code.toLowerCase().includes(lowercasedTerm) ||
        p.barcode.toLowerCase().includes(lowercasedTerm)
      );
    }
    
    set({ filteredProducts: result });
  },
}));