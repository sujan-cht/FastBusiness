import React from 'react';
import { Screen } from '../types';
import { useAppStore } from '../state/appStore';
import { useTranslations } from '../i18n/useTranslations';

import DashboardIcon from './icons/DashboardIcon';
import DocumentIcon from './icons/DocumentIcon';
import ProductIcon from './icons/ProductIcon';
import StockIcon from './icons/StockIcon';
import ReportingIcon from './icons/ReportingIcon';
import CustomersIcon from './icons/CustomersIcon';
import PromotionsIcon from './icons/PromotionsIcon';
import SecurityIcon from './icons/SecurityIcon';
import PaymentIcon from './icons/PaymentIcon';
import CountriesIcon from './icons/CountriesIcon';
import TaxRatesIcon from './icons/TaxRatesIcon';
import CompanyIcon from './icons/CompanyIcon';
import { ChevronsLeft, ChevronsRight, MonitorPlay } from 'lucide-react';

const navItems = [
  { screen: Screen.Dashboard, icon: DashboardIcon },
  { screen: Screen.Documents, icon: DocumentIcon },
  { screen: Screen.Products, icon: ProductIcon },
  { screen: Screen.Stock, icon: StockIcon },
  { screen: Screen.Reporting, icon: ReportingIcon },
  { screen: Screen.CustomersAndSuppliers, icon: CustomersIcon },
  { screen: Screen.Promotions, icon: PromotionsIcon },
  { screen: Screen.UsersAndSecurity, icon: SecurityIcon },
  { screen: Screen.PaymentTypes, icon: PaymentIcon },
  { screen: Screen.Countries, icon: CountriesIcon },
  { screen: Screen.TaxRates, icon: TaxRatesIcon },
  { screen: Screen.MyCompany, icon: CompanyIcon },
];

const Sidebar: React.FC = () => {
  const { activeScreen, setActiveScreen, isSidebarCollapsed, toggleSidebar, setView } = useAppStore();
  const { t } = useTranslations();
  
  return (
    <aside className={`bg-card text-text-primary flex flex-col shadow-lg transition-all duration-300 ease-in-out h-full ${isSidebarCollapsed ? 'w-20' : 'w-64'}`}>
      {/* Non-scrolling top part */}
      <div>
        <div className={`p-4 flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
           {!isSidebarCollapsed && (
              <span className="text-2xl font-bold text-text-primary">FastBusiness</span>
           )}
        </div>
        <div className="px-2">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); setView('sales'); }}
            className={`flex items-center p-3 rounded-lg transition-colors duration-200 bg-primary/20 text-primary hover:bg-primary/30 ${isSidebarCollapsed ? 'justify-center' : ''}`}
            title={isSidebarCollapsed ? t(Screen.BackToSales) : ''}
          >
            <MonitorPlay className="w-6 h-6 flex-shrink-0" />
            {!isSidebarCollapsed && <span className="font-semibold text-sm ml-3">{t(Screen.BackToSales)}</span>}
          </a>
        </div>
        <div className="h-px bg-border my-2 mx-4"></div>
      </div>
      
      {/* Scrolling navigation */}
      <div className="flex-1 overflow-y-auto">
        <nav className="px-2 pt-0">
          <ul>
            {navItems.map((item) => (
              <li key={item.screen} className="mb-2">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveScreen(item.screen);
                  }}
                  className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${
                    activeScreen === item.screen
                      ? 'bg-primary text-white'
                      : 'hover:bg-background'
                  } ${isSidebarCollapsed ? 'justify-center' : ''}`}
                  title={isSidebarCollapsed ? t(item.screen) : ''}
                >
                  <item.icon className="w-6 h-6 flex-shrink-0" />
                  {!isSidebarCollapsed && <span className="font-semibold text-sm ml-3">{t(item.screen)}</span>}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Non-scrolling footer */}
      <div className="p-2 border-t border-border">
        <button onClick={toggleSidebar} className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-background text-text-secondary">
          {isSidebarCollapsed ? <ChevronsRight size={20} /> : <ChevronsLeft size={20} />}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;