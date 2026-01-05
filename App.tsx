import React from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import DashboardScreen from './screens/DashboardScreen';
import DocumentsScreen from './screens/DocumentsScreen';
import ProductsScreen from './screens/ProductsScreen';
import StockScreen from './screens/StockScreen';
import ReportingScreen from './screens/ReportingScreen';
import CustomersScreen from './screens/CustomersScreen';
import PromotionsScreen from './screens/PromotionsScreen';
import SecurityScreen from './screens/SecurityScreen';
import PaymentTypesScreen from './screens/PaymentTypesScreen';
import CountriesScreen from './screens/CountriesScreen';
import TaxRatesScreen from './screens/TaxRatesScreen';
import CompanyScreen from './screens/CompanyScreen';
import SalesScreen from './screens/SalesScreen';

import { Screen } from './types';
import { useAppStore } from './state/appStore';
import { useTranslations } from './i18n/useTranslations';

const ManagementLayout: React.FC = () => {
  const { activeScreen } = useAppStore();
  const { t } = useTranslations();

  const renderScreen = () => {
    switch (activeScreen) {
      case Screen.Dashboard:
        return <DashboardScreen />;
      case Screen.Documents:
        return <DocumentsScreen />;
      case Screen.Products:
        return <ProductsScreen />;
      case Screen.Stock:
        return <StockScreen />;
      case Screen.Reporting:
        return <ReportingScreen />;
      case Screen.CustomersAndSuppliers:
        return <CustomersScreen />;
      case Screen.Promotions:
        return <PromotionsScreen />;
      case Screen.UsersAndSecurity:
        return <SecurityScreen />;
      case Screen.PaymentTypes:
        return <PaymentTypesScreen />;
      case Screen.Countries:
        return <CountriesScreen />;
      case Screen.TaxRates:
        return <TaxRatesScreen />;
      case Screen.MyCompany:
        return <CompanyScreen />;
      default:
        return <DashboardScreen />;
    }
  };

  return (
    <div className="flex h-screen bg-background font-sans">
      <Sidebar />
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ease-in-out`}>
        <TopBar title={t(activeScreen)} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          {renderScreen()}
        </main>
      </div>
    </div>
  );
}


const App: React.FC = () => {
  const { view } = useAppStore();

  if (view === 'sales') {
    return <SalesScreen />;
  }

  return <ManagementLayout />;
};

export default App;