import React from 'react';
import { TopProduct } from '../../types';
import Card from './Card';
import { toBengaliNumber } from '../../utils/bengaliNumbers';
import { useTranslations } from '../../i18n/useTranslations';

interface TopProductsTableProps {
  data: TopProduct[];
}

const TopProductsTable: React.FC<TopProductsTableProps> = ({ data }) => {
  const { t, language } = useTranslations();
  
  const formatNumber = (num: number) => {
    return language === 'bn' ? toBengaliNumber(num.toLocaleString()) : num.toLocaleString();
  };

  const currency = '৳';

  return (
    <Card title={t('topSellingProducts')} className="col-span-1 md:col-span-2">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-text-secondary">
          <thead className="bg-background text-xs uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">{t('product')}</th>
              <th scope="col" className="px-6 py-3">{t('group')}</th>
              <th scope="col" className="px-6 py-3">{t('price')}</th>
              <th scope="col" className="px-6 py-3">{t('sold')}</th>
              <th scope="col" className="px-6 py-3">{t('revenue')}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((product) => (
              <tr key={product.id} className="border-b border-border hover:bg-background">
                <th scope="row" className="px-6 py-4 font-medium text-text-primary whitespace-nowrap">
                  {product.name}
                </th>
                <td className="px-6 py-4">{product.group}</td>
                <td className="px-6 py-4">{currency}{formatNumber(product.price)}</td>
                <td className="px-6 py-4">{formatNumber(product.sold)}</td>
                <td className="px-6 py-4">{currency}{formatNumber(product.price * product.sold)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default TopProductsTable;