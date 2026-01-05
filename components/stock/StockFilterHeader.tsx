
import React from 'react';
import { useTranslations } from '../../i18n/useTranslations';
import { useStockStore } from '../../state/stockStore';
import { Search, Barcode } from 'lucide-react';

const FilterCheckbox = ({ label, checked, onChange }: { label: string, checked: boolean, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
    <label className="flex items-center space-x-2 text-sm text-text-secondary cursor-pointer">
        <input type="checkbox" checked={checked} onChange={onChange} className="form-checkbox h-4 w-4 rounded bg-background border-border text-primary focus:ring-primary" />
        <span>{label}</span>
    </label>
);

const StockFilterHeader: React.FC = () => {
    const { t } = useTranslations();
    const { filters, setFilter, searchTerm, setSearchTerm } = useStockStore();

    return (
        <div className="bg-card p-2 rounded-lg border border-border flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <FilterCheckbox label={t('negativeQuantity')} checked={filters.negativeQty} onChange={(e) => setFilter('negativeQty', e.target.checked)} />
                <FilterCheckbox label={t('nonZeroQuantity')} checked={filters.nonZeroQty} onChange={(e) => setFilter('nonZeroQty', e.target.checked)} />
                <FilterCheckbox label={t('zeroQuantity')} checked={filters.zeroQty} onChange={(e) => setFilter('zeroQty', e.target.checked)} />
            </div>
            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                    <span className="h-4 w-4 rounded-full bg-red-500/50 border border-red-500"></span>
                    <span className="h-4 w-4 rounded-full bg-blue-500/50 border border-blue-500"></span>
                    <span className="h-4 w-4 rounded-full bg-green-500/50 border border-green-500"></span>
                </div>
                <div className="relative w-72">
                    <input
                        type="text"
                        placeholder={t('searchByProductOrCode')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-background border border-border rounded-md pl-10 pr-4 py-1.5 text-sm"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">
                        <Search size={18} />
                    </div>
                     <div className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary">
                        <Barcode size={18} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StockFilterHeader;
