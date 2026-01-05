import React from 'react';
import { useTranslations } from '../i18n/useTranslations';
import { useDocumentStore } from '../state/documentStore';
import { DocumentType, PaidStatus } from '../types';
import { documentsData, productsData } from '../data/mockData';

import ActionButton from '../components/documents/ActionButton';
import FilterInput from '../components/documents/FilterInput';
import FilterSelect from '../components/documents/FilterSelect';
import DocumentsTable from '../components/documents/DocumentsTable';
import DocumentItemsTable from '../components/documents/DocumentItemsTable';
import AddDocumentModal from '../components/documents/AddDocumentModal';

import { PlusCircle, Printer, FileScan, FileText, Pencil, Trash2, Search, FilterX } from 'lucide-react';

const DocumentsScreen: React.FC = () => {
  const { t } = useTranslations();
  const { filters, setFilter, clearFilters, documents, toggleAddModal } = useDocumentStore();

  const handleInputChange = (filter: keyof typeof filters) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilter(filter, e.target.value);
  };

  // Create unique lists for dropdowns from the master data
  const uniqueProducts = [...new Set(productsData.map(p => p.name))];
  const uniqueCustomers = [...new Set(documentsData.map(d => d.customer))];
  const uniqueUsers = [...new Set(documentsData.map(d => d.user))];
  const uniqueCashRegisters = [...new Set(documentsData.map(d => d.pos))];

  const actionButtons = [
    { label: t('add'), icon: <PlusCircle size={16} />, onClick: () => toggleAddModal(true) },
    { label: t('print'), icon: <Printer size={16} /> },
    { label: t('printPreview'), icon: <FileScan size={16} /> },
    { label: t('saveAsPdf'), icon: <FileText size={16} /> },
    { label: t('edit'), icon: <Pencil size={16} /> },
    { label: t('delete'), icon: <Trash2 size={16} /> },
  ];

  return (
    <>
      <AddDocumentModal />
      <div className="p-6 flex flex-col h-full space-y-4">
        {/* Action Toolbar */}
        <div className="flex items-center space-x-2 bg-card p-2 rounded-lg border border-border">
          {actionButtons.map(btn => (
            <ActionButton key={btn.label} label={btn.label} icon={btn.icon} onClick={btn.onClick} />
          ))}
        </div>

        {/* Filter Section */}
        <div className="bg-card p-4 rounded-lg border border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <FilterSelect label={t('product')} value={filters.product} onChange={handleInputChange('product')}>
              <option value="">All</option>
              {uniqueProducts.map(p => <option key={p} value={p}>{p}</option>)}
            </FilterSelect>
            <FilterSelect label={t('customer')} value={filters.customer} onChange={handleInputChange('customer')}>
              <option value="">All</option>
              {uniqueCustomers.map(c => <option key={c} value={c}>{c}</option>)}
            </FilterSelect>
            <FilterSelect label={t('user')} value={filters.user} onChange={handleInputChange('user')}>
              <option value="">All</option>
              {uniqueUsers.map(u => <option key={u} value={u}>{u}</option>)}
            </FilterSelect>
            <FilterSelect label={t('documentType')} value={filters.documentType} onChange={handleInputChange('documentType')}>
              <option value="">All</option>
              {Object.values(DocumentType).map(type => <option key={type} value={type}>{type}</option>)}
            </FilterSelect>
            <FilterSelect label={t('cashRegister')} value={filters.cashRegister} onChange={handleInputChange('cashRegister')}>
              <option value="">All</option>
              {uniqueCashRegisters.map(cr => <option key={cr} value={cr}>{cr}</option>)}
            </FilterSelect>
            <FilterSelect label={t('paidStatus')} value={filters.paidStatus} onChange={handleInputChange('paidStatus')}>
              <option value="">All</option>
              {Object.values(PaidStatus).map(status => <option key={status} value={status}>{status}</option>)}
            </FilterSelect>
            <FilterInput label={t('documentNumber')} value={filters.documentNumber} onChange={handleInputChange('documentNumber')} />
            <FilterInput label={t('externalDocument')} value={filters.externalDocument} onChange={handleInputChange('externalDocument')} />
            <FilterInput label={t('period')} value={filters.period} onChange={handleInputChange('period')} placeholder='e.g., 5/1/2026' />
            <div className="flex items-end space-x-2">
              <button className="bg-primary text-white px-4 py-1.5 rounded-md flex items-center space-x-2 h-full text-sm">
                <Search size={16} />
                <span>{t('search')}</span>
              </button>
              <button onClick={clearFilters} className="bg-background/80 border border-border text-text-secondary px-4 py-1.5 rounded-md flex items-center space-x-2 h-full text-sm">
                <FilterX size={16} />
                <span>{t('clear')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Master-Detail Tables */}
        <div className="flex flex-col flex-1 space-y-4 min-h-0">
          <div className="flex-1 min-h-0">
              <DocumentsTable documents={documents} />
          </div>
          <div className="flex-1 min-h-0">
              <DocumentItemsTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default DocumentsScreen;