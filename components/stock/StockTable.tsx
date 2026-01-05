import React from 'react';
import { CalculatedStockItem } from '../../types';
import { useTranslations } from '../../i18n/useTranslations';
import { toBengaliNumber } from '../../utils/bengaliNumbers';

interface StockTableProps {
  items: CalculatedStockItem[];
}

const StockTable: React.FC<StockTableProps> = ({ items }) => {
  const { t, language } = useTranslations();

  const formatNumber = (num: number, options = { minimumFractionDigits: 2, maximumFractionDigits: 2 }) => {
    return language === 'bn' 
      ? toBengaliNumber(num.toLocaleString('en-US', options)) 
      : num.toLocaleString('en-US', options);
  };
  
  const currency = '৳';

  const headers = [
    'stockCode', 'stockName', 'stockQty', 'stockUnit', 'stockCostPrice', 
    'stockCost', 'stockCostInclTax', 'stockValue', 'stockValueInclTax'
  ];

  return (
    <div className="overflow-auto flex-1 bg-card rounded-lg border border-border">
      <table className="w-full text-sm text-left text-text-secondary whitespace-nowrap">
        <thead className="bg-background/50 text-xs uppercase sticky top-0">
          <tr>
            {headers.map(header => (
              <th key={header} scope="col" className="px-3 py-2 font-semibold">{t(header as any)}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {items.map((item) => (
            <tr key={item.id} className="hover:bg-background/50">
              <td className="px-3 py-1.5 font-medium text-text-primary">{item.code}</td>
              <td className="px-3 py-1.5 text-text-primary">{item.name}</td>
              <td className={`px-3 py-1.5 font-bold text-right ${item.quantity <= 0 ? 'text-red-500' : 'text-text-primary'}`}>
                  {/* FIX: Argument of type '{ minimumFractionDigits: number; }' is not assignable to parameter of type '{ minimumFractionDigits: number; maximumFractionDigits: number; }'. */}
                  {/* FIX: Add maximumFractionDigits to satisfy the type requirement for the options parameter. */}
                  {formatNumber(item.quantity, {minimumFractionDigits: 0, maximumFractionDigits: 0})}
              </td>
              <td className="px-3 py-1.5">{item.unit}</td>
              <td className="px-3 py-1.5 text-right">{currency}{formatNumber(item.costPrice)}</td>
              <td className="px-3 py-1.5 text-right">{currency}{formatNumber(item.cost)}</td>
              <td className="px-3 py-1.5 text-right text-text-primary font-semibold">{currency}{formatNumber(item.costInclTax)}</td>
              <td className="px-3 py-1.5 text-right">{currency}{formatNumber(item.value)}</td>
              <td className="px-3 py-1.5 text-right text-text-primary font-semibold">{currency}{formatNumber(item.valueInclTax)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockTable;
