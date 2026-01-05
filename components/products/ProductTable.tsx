import React from 'react';
import { Product } from '../../types';
import { useTranslations } from '../../i18n/useTranslations';
import { toBengaliNumber } from '../../utils/bengaliNumbers';
import { useProductStore } from '../../state/productStore';
import { useResizableColumns } from '../../hooks/useResizableColumns';

interface ProductTableProps {
  products: Product[];
}

const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
  const { t, language } = useTranslations();
  const { selectedProductId, setSelectedProductId, openProductModal } = useProductStore();

  const headers = [
    { key: 'prodCode', label: t('prodCode'), width: 120 },
    { key: 'prodName', label: t('prodName'), width: 250 },
    { key: 'prodGroup', label: t('prodGroup'), width: 150 },
    { key: 'prodBarcode', label: t('prodBarcode'), width: 150 },
    { key: 'prodCost', label: t('prodCost'), width: 120 },
    { key: 'prodOriginalPrice', label: t('prodOriginalPrice'), width: 150 },
    { key: 'prodSalePriceInclTax', label: t('prodSalePriceInclTax'), width: 180 },
    { key: 'prodActive', label: t('prodActive'), width: 80 },
    { key: 'prodUnit', label: t('prodUnit'), width: 120 },
    { key: 'prodCreatedDate', label: t('prodCreatedDate'), width: 150 },
    { key: 'prodUpdatedDate', label: t('prodUpdatedDate'), width: 150 },
  ];

  const { columns, resizerProps } = useResizableColumns(headers);

  const formatNumber = (num: number) => {
    if (num === null || num === undefined) return '';
    const options = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
    return language === 'bn' 
      ? toBengaliNumber(num.toLocaleString('en-US', options)) 
      : num.toLocaleString('en-US', options);
  };
  
  const formatDate = (dateStr: string | undefined) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const formatted = date.toLocaleDateString('en-GB', options);
    return language === 'bn' ? toBengaliNumber(formatted) : formatted;
  }

  const currency = '৳';

  return (
    <div className="overflow-auto flex-1 bg-card rounded-lg border border-border">
      <table className="min-w-full text-sm text-left text-text-secondary whitespace-nowrap" style={{ tableLayout: 'fixed' }}>
        <thead className="bg-background/50 text-xs uppercase sticky top-0 z-10">
          <tr>
            {columns.map((col, index) => (
               <th 
                key={col.key} 
                scope="col" 
                className="px-3 py-2 font-semibold relative"
                style={{ width: col.width }}
              >
                {col.label}
                {index < columns.length - 1 && (
                  <div 
                    {...resizerProps(index)} 
                    className="absolute top-0 right-0 h-full w-1.5 cursor-col-resize bg-border opacity-0 hover:opacity-100 transition-opacity"
                  />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {products.map((product) => (
            <tr 
              key={product.id} 
              className={`cursor-pointer transition-colors duration-150 ${
                  selectedProductId === product.id ? 'bg-primary/20' : 'hover:bg-background/50'
              }`}
              onClick={() => setSelectedProductId(product.id)}
              onDoubleClick={() => openProductModal(product)}
            >
              <td className="px-3 py-1.5 font-medium text-text-primary truncate">{product.code}</td>
              <td className="px-3 py-1.5 text-text-primary truncate">{product.name}</td>
              <td className="px-3 py-1.5 truncate">{product.groupName}</td>
              <td className="px-3 py-1.5 truncate">{product.barcode}</td>
              <td className="px-3 py-1.5 text-right truncate">{currency}{formatNumber(product.cost)}</td>
              <td className="px-3 py-1.5 text-right truncate">{currency}{formatNumber(product.originalPrice || 0)}</td>
              <td className="px-3 py-1.5 text-right font-bold text-text-primary truncate">{currency}{formatNumber(product.salePriceInclTax)}</td>
              <td className="px-3 py-1.5 text-center">
                <input type="checkbox" defaultChecked={product.active} className="bg-background border-border cursor-not-allowed" disabled />
              </td>
              <td className="px-3 py-1.5 truncate">{product.unit}</td>
              <td className="px-3 py-1.5 truncate">{formatDate(product.createdDate)}</td>
              <td className="px-3 py-1.5 truncate">{formatDate(product.updatedDate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;