import React from 'react';
import { Promotion } from '../../types';
import { useTranslations } from '../../i18n/useTranslations';
import { usePromotionStore } from '../../state/promotionStore';
import { useResizableColumns } from '../../hooks/useResizableColumns';
import { toBengaliNumber } from '../../utils/bengaliNumbers';
import { Check, X } from 'lucide-react';

interface PromotionsTableProps {
  promotions: Promotion[];
}

const PromotionsTable: React.FC<PromotionsTableProps> = ({ promotions }) => {
  const { t, language } = useTranslations();
  const { selectedPromotionId, setSelectedPromotionId } = usePromotionStore();

  const headers = [
    { key: 'name', label: t('promoName'), width: 300 },
    { key: 'type', label: t('promoType'), width: 150 },
    { key: 'value', label: t('promoValue'), width: 120 },
    { key: 'active', label: t('promoActive'), width: 100 },
    { key: 'startDate', label: t('promoStartDate'), width: 150 },
    { key: 'endDate', label: t('promoEndDate'), width: 150 },
  ];

  const { columns, resizerProps } = useResizableColumns(headers);
  
  const formatDate = (date: string) => {
    return language === 'bn' ? toBengaliNumber(date) : date;
  }
  
  const formatValue = (type: 'Discount' | 'BOGO', value: number) => {
      const formatted = type === 'Discount' ? `${value}%` : `Buy 1 Get ${value}`;
      return language === 'bn' ? toBengaliNumber(formatted) : formatted;
  }

  return (
    <div className="overflow-auto bg-card rounded-lg border border-border h-full">
      <table className="w-full text-sm text-left text-text-secondary whitespace-nowrap" style={{ tableLayout: 'fixed' }}>
        <thead className="bg-background/50 text-xs uppercase sticky top-0 z-10">
          <tr>
            {columns.map((col, index) => (
              <th key={col.key} scope="col" className="px-4 py-2 font-semibold relative" style={{ width: col.width }}>
                {col.label}
                {index < columns.length - 1 && (
                  <div {...resizerProps(index)} className="absolute top-0 right-0 h-full w-1.5 cursor-col-resize bg-border opacity-0 hover:opacity-100" />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {promotions.map((promo) => (
            <tr 
              key={promo.id} 
              className={`transition-colors duration-150 cursor-pointer ${selectedPromotionId === promo.id ? 'bg-primary/20' : 'hover:bg-background/50'}`}
              onClick={() => setSelectedPromotionId(promo.id)}
            >
              <td className="px-4 py-2 truncate text-text-primary font-semibold">{promo.name}</td>
              <td className="px-4 py-2 truncate">{promo.type}</td>
              <td className="px-4 py-2 truncate">{formatValue(promo.type, promo.value)}</td>
              <td className="px-4 py-2 text-center">{promo.active ? <Check size={18} className="text-secondary mx-auto" /> : <X size={18} className="text-red-500 mx-auto" />}</td>
              <td className="px-4 py-2 truncate">{formatDate(promo.startDate)}</td>
              <td className="px-4 py-2 truncate">{formatDate(promo.endDate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PromotionsTable;