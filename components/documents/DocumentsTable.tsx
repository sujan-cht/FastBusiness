
import React, { useState } from 'react';
import { Document } from '../../types';
import { useTranslations } from '../../i18n/useTranslations';
import { toBengaliNumber } from '../../utils/bengaliNumbers';
import { useDocumentStore } from '../../state/documentStore';
import { useResizableColumns } from '../../hooks/useResizableColumns';

interface DocumentsTableProps {
  documents: Document[];
}

const DocumentsTable: React.FC<DocumentsTableProps> = ({ documents }) => {
  const { t, language } = useTranslations();
  const { selectedDocumentId, setSelectedDocumentId } = useDocumentStore();
  const [allChecked, setAllChecked] = useState(false);
  
  const headers = [
    { key: 'docId', label: t('docId'), width: 60 },
    { key: 'docNumber', label: t('docNumber'), width: 150 },
    { key: 'docExternal', label: t('docExternal'), width: 120 },
    { key: 'docType', label: t('docType'), width: 100 },
    { key: 'docPaid', label: t('docPaid'), width: 100 },
    { key: 'docCustomer', label: t('docCustomer'), width: 150 },
    { key: 'docDate', label: t('docDate'), width: 120 },
    { key: 'docPos', label: t('docPos'), width: 100 },
    { key: 'docOrder', label: t('docOrder'), width: 100 },
    { key: 'docPaymentType', label: t('docPaymentType'), width: 120 },
    { key: 'docUser', label: t('docUser'), width: 100 },
    { key: 'docDiscount', label: t('docDiscount'), width: 120 },
    { key: 'docTotal', label: t('docTotal'), width: 120 }
  ];

  const { columns, resizerProps } = useResizableColumns(headers);

  const formatNumber = (num: number) => {
    return language === 'bn' ? toBengaliNumber(num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })) : num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };
  
  const formatDate = (date: string) => {
    return language === 'bn' ? toBengaliNumber(date) : date;
  }

  const currency = '৳';

  return (
    <div className="overflow-x-auto bg-card rounded-lg border border-border h-full">
      <table className="w-full text-sm text-left text-text-secondary whitespace-nowrap" style={{ tableLayout: 'fixed' }}>
        <thead className="bg-background/50 text-xs uppercase sticky top-0 z-10">
          <tr>
            <th scope="col" className="p-2.5" style={{ width: '40px' }}>
              <input type="checkbox" className="bg-background border-border" onChange={e => setAllChecked(e.target.checked)} />
            </th>
            {columns.map((col, index) => (
              <th 
                key={col.key} 
                scope="col" 
                className="px-4 py-2 font-semibold relative"
                style={{ width: col.width }}
              >
                {col.label}
                <div 
                  {...resizerProps(index)} 
                  className="absolute top-0 right-0 h-full w-1 cursor-col-resize bg-border opacity-0 hover:opacity-100"
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {documents.map((doc) => (
            <tr 
              key={doc.id} 
              className={`transition-colors duration-150 ${selectedDocumentId === doc.id ? 'bg-primary/20' : 'hover:bg-background/50'}`}
              onClick={() => setSelectedDocumentId(doc.id)}
            >
              <td className="p-2.5">
                <input type="checkbox" className="bg-background border-border" checked={allChecked} />
              </td>
              <td className="px-4 py-1.5 truncate">{doc.id}</td>
              <td className="px-4 py-1.5 text-text-primary font-medium truncate">{doc.number}</td>
              <td className="px-4 py-1.5 truncate">{doc.external}</td>
              <td className="px-4 py-1.5 truncate">{doc.documentType}</td>
              <td className="px-4 py-1.5 truncate">{doc.paid}</td>
              <td className="px-4 py-1.5 truncate">{doc.customer}</td>
              <td className="px-4 py-1.5 truncate">{formatDate(doc.date)}</td>
              <td className="px-4 py-1.5 truncate">{doc.pos}</td>
              <td className="px-4 py-1.5 truncate">{doc.order}</td>
              <td className="px-4 py-1.5 truncate">{doc.paymentType}</td>
              <td className="px-4 py-1.5 truncate">{doc.user}</td>
              <td className="px-4 py-1.5 text-right truncate">{currency}{formatNumber(doc.discount)}</td>
              <td className="px-4 py-1.5 text-right font-bold text-text-primary truncate">{currency}{formatNumber(doc.total)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentsTable;
