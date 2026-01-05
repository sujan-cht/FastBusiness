
import React from 'react';
import { useTranslations } from '../../i18n/useTranslations';
import { useReportingStore } from '../../state/reportingStore';
import FilterSelect from '../documents/FilterSelect';
import FilterInput from '../documents/FilterInput';
import { toBengaliNumber } from '../../utils/bengaliNumbers';
import { Search, Printer, FileSpreadsheet, FileText } from 'lucide-react';

const ReportFilters: React.FC = () => {
    const { t, language } = useTranslations();
    const { filters, setFilter } = useReportingStore();

    const today = new Date();
    const lastMonth = new Date();
    lastMonth.setMonth(today.getMonth() - 1);

    const formatDate = (date: Date) => {
        const d = date.getDate();
        const m = date.getMonth() + 1;
        const y = date.getFullYear();
        const formatted = `${d}/${m}/${y}`;
        return language === 'bn' ? toBengaliNumber(formatted) : formatted;
    };

    const dateRangeValue = `${formatDate(lastMonth)} - ${formatDate(today)}`;

    return (
        <div className="bg-card rounded-lg border border-border flex flex-col h-full p-4">
            <div className="flex-1 space-y-4">
                <FilterSelect 
                    label={t('customersAndSuppliers')} 
                    value={filters.customer} 
                    onChange={(e) => setFilter('customer', e.target.value)}
                >
                    <option value="">All</option>
                </FilterSelect>

                <FilterSelect 
                    label={t('user')} 
                    value={filters.user} 
                    onChange={(e) => setFilter('user', e.target.value)}
                >
                    <option value="">All</option>
                </FilterSelect>

                <FilterSelect 
                    label={t('cashRegister')} 
                    value={filters.cashRegister} 
                    onChange={(e) => setFilter('cashRegister', e.target.value)}
                >
                    <option value="">All</option>
                </FilterSelect>
                
                <FilterSelect 
                    label={t('product')} 
                    value={filters.product} 
                    onChange={(e) => setFilter('product', e.target.value)}
                >
                    <option value="">All</option>
                </FilterSelect>

                <FilterSelect 
                    label={t('productGroup')} 
                    value={filters.productGroup} 
                    onChange={(e) => setFilter('productGroup', e.target.value)}
                >
                    <option value="">All</option>
                </FilterSelect>

                <label className="flex items-center space-x-2 text-sm text-text-secondary cursor-pointer mt-2">
                    <input 
                        type="checkbox" 
                        checked={filters.includeSubgroups} 
                        onChange={(e) => setFilter('includeSubgroups', e.target.checked)}
                        className="form-checkbox h-4 w-4 rounded bg-background border-border text-primary focus:ring-primary" 
                    />
                    <span>{t('includeSubgroups')}</span>
                </label>
                
                <FilterInput 
                    label={t('dateRange')} 
                    value={dateRangeValue}
                    onChange={() => {}} 
                />
            </div>
            <div className="pt-4 mt-auto border-t border-border flex justify-end space-x-2">
                <button className="px-4 py-2 text-sm flex items-center space-x-2 bg-primary hover:bg-primary/80 text-white rounded-md font-semibold">
                    <Search size={16} />
                    <span>{t('showReport')}</span>
                </button>
                <button className="px-3 py-2 text-sm flex items-center space-x-2 bg-background/80 hover:bg-border/50 text-text-secondary rounded-md">
                    <Printer size={16} />
                    <span>{t('print')}</span>
                </button>
                 <button className="px-3 py-2 text-sm flex items-center space-x-2 bg-background/80 hover:bg-border/50 text-text-secondary rounded-md">
                    <FileSpreadsheet size={16} />
                    <span>{t('excel')}</span>
                </button>
                 <button className="px-3 py-2 text-sm flex items-center space-x-2 bg-background/80 hover:bg-border/50 text-text-secondary rounded-md">
                    <FileText size={16} />
                    <span>{t('saveAsPdf')}</span>
                </button>
            </div>
        </div>
    );
};

export default ReportFilters;
