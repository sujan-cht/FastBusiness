import React from 'react';
import { DocumentItem } from '../../types';
import { useTranslations } from '../../i18n/useTranslations';
import { toBengaliNumber } from '../../utils/bengaliNumbers';
import { useDocumentStore } from '../../state/documentStore';

const DocumentItemsTable: React.FC = () => {
  const { t, language } = useTranslations();
  const documentItems = useDocumentStore(state => state.documentItems);

  const formatNumber = (num: number) => {
    return language === 'bn' ? toBengaliNumber(num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })) : num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const currency = '৳';

  const headers = [
    'docId', 'itemCode', 'itemName', 'itemUnit', 'itemQty', 'itemPriceBeforeTax',
    'itemTax', 'itemPrice', 'itemTotalBeforeDiscount', 'itemDiscount', 'itemTotal'
  ];
  
  if (documentItems.length === 0) {
      return (
          <div className="flex-1 flex items-center justify-center bg-card rounded-lg border border-border min-h-[200px]">
              <p className="text-text-secondary">{t('selectDocumentPrompt')}</p>
          </div>
      )
  }

  return (
    <div className="overflow-x-auto bg-card rounded-lg border border-border flex-1">
      <table className="w-full text-sm text-left text-text-secondary whitespace-nowrap">
        <thead className="bg-background/50 text-xs uppercase">
          <tr>
            {headers.map(header => (
              <th key={header} scope="col" className="px-4 py-2 font-semibold">{t(header as any)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {documentItems.map((item) => (
            <tr key={item.id} className="border-b border-border last:border-b-0 hover:bg-background/50">
              <td className="px-4 py-1.5">{item.id}</td>
              <td className="px-4 py-1.5 text-text-primary font-medium">{item.code}</td>
              <td className="px-4 py-1.5">{item.name}</td>
              <td className="px-4 py-1.5">{item.unit}</td>
              <td className="px-4 py-1.5 text-right">{formatNumber(item.quantity)}</td>
              <td className="px-4 py-1.5 text-right">{currency}{formatNumber(item.priceBeforeTax)}</td>
              <td className="px-4 py-1.5 text-right">{currency}{formatNumber(item.tax)}</td>
              <td className="px-4 py-1.5 text-right">{currency}{formatNumber(item.price)}</td>
              <td className="px-4 py-1.5 text-right">{currency}{formatNumber(item.totalBeforeDiscount)}</td>
              <td className="px-4 py-1.5 text-right">{currency}{formatNumber(item.discount)}</td>
              <td className="px-4 py-1.5 text-right font-bold text-text-primary">{currency}{formatNumber(item.total)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentItemsTable;