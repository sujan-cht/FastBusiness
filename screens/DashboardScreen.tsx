
import React from 'react';
import TotalSalesWidget from '../components/cards/TotalSalesWidget';
import MonthlySalesCard from '../components/cards/MonthlySalesCard';
import HourlySalesChart from '../components/cards/HourlySalesChart';
import ProductGroupsDonut from '../components/cards/ProductGroupsDonut';
import TopCustomersChart from '../components/cards/TopCustomersChart';
import TopProductsTable from '../components/cards/TopProductsTable';
import { monthlySalesData, hourlySalesData, productGroupsData, topCustomersData, topProductsData } from '../data/mockData';
import { toBengaliNumber } from '../utils/bengaliNumbers';
import { useTranslations } from '../i18n/useTranslations';

const DollarSignIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>
);
const UsersIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197m0 0A5.995 5.995 0 0012 13a5.995 5.995 0 00-3-5.197" /></svg>
);

const DashboardScreen: React.FC = () => {
  const { t, language } = useTranslations();
  const totalSales = monthlySalesData.reduce((sum, item) => sum + item.sales, 0);
  const topMonth = monthlySalesData.reduce((prev, current) => (prev.sales > current.sales) ? prev : current);
  
  const newCustomersSubtext = language === 'bn' 
    ? `+${toBengaliNumber(8.2)}% ${t('thisMonth')}` 
    : `+8.2% ${t('thisMonth')}`;

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <TotalSalesWidget
          title={t('totalSales')}
          amount={totalSales}
          subtext={`${t('topMonth')}: ${topMonth.month}`}
          icon={<DollarSignIcon />}
          className="md:col-span-2"
        />
        <TotalSalesWidget
          title={t('newCustomers')}
          amount={350}
          subtext={newCustomersSubtext}
          icon={<UsersIcon />}
          currency=""
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <MonthlySalesCard data={monthlySalesData} />
        <TopProductsTable data={topProductsData} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <HourlySalesChart data={hourlySalesData} />
        <ProductGroupsDonut data={productGroupsData} />
        <TopCustomersChart data={topCustomersData} />
      </div>
    </div>
  );
};

export default DashboardScreen;
