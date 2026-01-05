import React from 'react';
import { useTranslations } from '../../i18n/useTranslations';
import { useProductStore } from '../../state/productStore';
import {
    RefreshCw, FolderPlus, FolderPen, FolderMinus, PackagePlus, PackageCheck, PackageMinus,
    Printer, FileText, Tags, ArrowUpDown, BarChart, FileInput, FileOutput, HelpCircle,
    PanelLeft, PanelBottom
} from 'lucide-react';

const ToolbarButton = ({ icon, label, onClick, disabled = false }: { icon: React.ReactNode, label: string, onClick?: () => void, disabled?: boolean }) => (
    <div
        onClick={!disabled ? onClick : undefined}
        className={`flex flex-col items-center space-y-1 px-2 py-1 rounded transition-colors flex-shrink-0 ${
            disabled
                ? 'cursor-not-allowed opacity-50'
                : 'hover:bg-primary/20 cursor-pointer'
        }`}
    >
        {icon}
        <span className="text-xs text-center">{label}</span>
    </div>
);

const ToolbarSeparator = () => (
    <div className="h-10 w-px bg-border mx-1 flex-shrink-0"></div>
)

const ProductToolbar: React.FC = () => {
    const { t } = useTranslations();
    const { 
      refreshData,
      openGroupModal,
      deleteGroup,
      selectedGroupId,
      openProductModal,
      deleteProduct,
      selectedProductId,
      products,
      productGroups,
      productGroupLayout,
      toggleProductGroupLayout,
    } = useProductStore();

    const iconSize = 20;

    const isGroupSelected = selectedGroupId !== null && selectedGroupId !== 'all';
    const selectedGroup = productGroups.flatMap(g => [g, ...(g.children || [])]).find(g => g.id === selectedGroupId);
    
    const isProductSelected = selectedProductId !== null;
    const selectedProduct = products.find(p => p.id === selectedProductId);

    const mockAction = (action: string) => () => alert(`${action} functionality not implemented.`);

    return (
        <div className="bg-card p-1 rounded-lg border border-border flex items-center text-text-secondary flex-nowrap overflow-x-auto">
            <ToolbarButton icon={<RefreshCw size={iconSize} />} label={t('refresh')} onClick={refreshData} />
            <ToolbarSeparator />
            <ToolbarButton icon={<FolderPlus size={iconSize} />} label={t('newGroup')} onClick={() => openGroupModal()} />
            <ToolbarButton icon={<FolderPen size={iconSize} />} label={t('editGroup')} disabled={!isGroupSelected} onClick={() => selectedGroup && openGroupModal(selectedGroup)} />
            <ToolbarButton icon={<FolderMinus size={iconSize} />} label={t('deleteGroup')} disabled={!isGroupSelected} onClick={deleteGroup} />
            <ToolbarSeparator />
            <ToolbarButton icon={<PackagePlus size={iconSize} />} label={t('newProduct')} onClick={() => openProductModal()} />
            <ToolbarButton icon={<PackageCheck size={iconSize} />} label={t('editProduct')} disabled={!isProductSelected} onClick={() => selectedProduct && openProductModal(selectedProduct)} />
            <ToolbarButton icon={<PackageMinus size={iconSize} />} label={t('deleteProduct')} disabled={!isProductSelected} onClick={deleteProduct} />
            <ToolbarSeparator />
            <ToolbarButton icon={<Printer size={iconSize} />} label={t('print')} onClick={mockAction('Print')} />
            <ToolbarButton icon={<FileText size={iconSize} />} label={t('saveAsPdf')} onClick={mockAction('Save as PDF')} />
            <ToolbarButton icon={<Tags size={iconSize} />} label={t('priceTags')} onClick={mockAction('Price Tags')} />
            <ToolbarSeparator />
            <ToolbarButton icon={<ArrowUpDown size={iconSize} />} label={t('sorting')} onClick={mockAction('Sorting')} />
            <ToolbarButton icon={<BarChart size={iconSize} />} label={t('movAvgPrice')} onClick={mockAction('Mov. Avg. Price')} />
            <ToolbarSeparator />
            <ToolbarButton icon={<FileInput size={iconSize} />} label={t('import')} onClick={mockAction('Import')} />
            <ToolbarButton icon={<FileOutput size={iconSize} />} label={t('export')} onClick={mockAction('Export')} />
            <ToolbarSeparator />
            <ToolbarButton 
                icon={productGroupLayout === 'side' ? <PanelBottom size={iconSize} /> : <PanelLeft size={iconSize} />} 
                label={t('layout')} 
                onClick={toggleProductGroupLayout} 
            />
            <ToolbarButton icon={<HelpCircle size={iconSize} />} label={t('help')} onClick={mockAction('Help')} />
        </div>
    );
};

export default ProductToolbar;