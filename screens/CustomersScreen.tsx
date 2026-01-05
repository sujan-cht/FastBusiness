import React from 'react';
import { useTranslations } from '../i18n/useTranslations';
import { useCustomerStore } from '../state/customerStore';
import CustomerToolbar from '../components/customers/CustomerToolbar';
import CustomerTable from '../components/customers/CustomerTable';
import CustomerModal from '../components/customers/CustomerModal';
import { Search } from 'lucide-react';

const CustomersScreen: React.FC = () => {
  const { t } = useTranslations();
  const { 
    filteredCustomers, 
    searchTerm, 
    setSearchTerm, 
    searchCategory, 
    setSearchCategory 
  } = useCustomerStore();

  return (
    <>
      <CustomerModal />
      <div className="p-4 flex flex-col h-full space-y-4">
        <CustomerToolbar />
        <div className="bg-card p-2 rounded-lg border border-border">
            <div className="flex items-center">
                <div className="relative w-full">
                    <input
                        type="text"
                        placeholder={t('searchCustomers')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-background border border-border rounded-md pl-10 pr-4 py-1.5 text-sm"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">
                        <Search size={18} />
                    </div>
                </div>
                <select
                    value={searchCategory}
                    onChange={(e) => setSearchCategory(e.target.value as any)}
                    className="ml-2 bg-background border border-border rounded-md px-3 py-1.5 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-primary whitespace-nowrap"
                >
                    <option value="name">{t('searchByName')}</option>
                    <option value="code">{t('searchByCode')}</option>
                    <option value="phone">{t('searchByPhone')}</option>
                    <option value="taxNumber">{t('searchByTaxNumber')}</option>
                </select>
            </div>
        </div>
        <div className="flex-1 min-h-0">
            <CustomerTable customers={filteredCustomers} />
        </div>
      </div>
    </>
  );
};

export default CustomersScreen;