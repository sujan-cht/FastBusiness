import React from 'react';
import { TaxRate } from '../../types';
import { useTranslations } from '../../i18n/useTranslations';
import { useTaxRateStore } from '../../state/taxRateStore';
import { useResizableColumns } from '../../hooks/useResizableColumns';
import { toBengaliNumber } from '../../utils/bengaliNumbers';
import { Check } from 'lucide-react';

interface TaxRatesTableProps {
  taxRates: TaxRate[];
}

const TaxRatesTable: React.FC<TaxRatesTableProps> = ({ taxRates }) => {
  const { t, language } = useTranslations();
  const { selectedTaxRateId, setSelectedTaxRateId } = useTaxRateStore();

  const headers = [
    { key: 'name', label: t('taxRateName'), width: 400 },
    { key: 'rate', label: t('taxRate'), width: 150 },
    { key: 'default', label: t('taxRateDefault'), width: 120 },
  ];

  const { columns, resizerProps } = useResizableColumns(headers);
  
  const formatRate = (rate: number) => {
    const formatted = rate.toFixed(2) + '%';
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
          {taxRates.map((rate) => (
            <tr 
              key={rate.id} 
              className={`transition-colors duration-150 cursor-pointer ${selectedTaxRateId === rate.id ? 'bg-primary/20' : 'hover:bg-background/50'}`}
              onClick={() => setSelectedTaxRateId(rate.id)}
            >
              <td className="px-4 py-2 truncate text-text-primary font-semibold">{rate.name}</td>
              <td className="px-4 py-2 truncate">{formatRate(rate.rate)}</td>
              <td className="px-4 py-2 text-center">{rate.isDefault && <Check size={18} className="text-secondary mx-auto" />}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaxRatesTable;