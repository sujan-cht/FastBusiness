
import React, { useState } from 'react';
import { useTranslations } from '../i18n/useTranslations';
import CompanyToolbar from '../components/company/CompanyToolbar';
import CompanyDataTab from '../components/company/CompanyDataTab';
import VoidReasonsTab from '../components/company/VoidReasonsTab';
import ResetDatabaseTab from '../components/company/ResetDatabaseTab';

type ActiveTab = 'company' | 'void' | 'reset';

const TabButton = ({ label, isActive, onClick }: { label: string, isActive: boolean, onClick: () => void }) => (
    <button
        onClick={onClick}
        className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-colors ${
            isActive ? 'bg-primary text-white' : 'bg-transparent text-text-secondary hover:bg-background/80'
        }`}
    >
        {label}
    </button>
);

const CompanyScreen: React.FC = () => {
  const { t } = useTranslations();
  const [activeTab, setActiveTab] = useState<ActiveTab>('company');

  return (
    <div className="p-4 flex flex-col h-full space-y-4">
      <div className="flex-1 flex flex-col min-h-0 bg-card rounded-lg border border-border">
          <div className="p-2 border-b border-border flex justify-between items-center">
              <div className="flex items-center space-x-1">
                  <TabButton label={t('companyData')} isActive={activeTab === 'company'} onClick={() => setActiveTab('company')} />
                  <TabButton label={t('voidReasons')} isActive={activeTab === 'void'} onClick={() => setActiveTab('void')} />
                  <TabButton label={t('resetDatabase')} isActive={activeTab === 'reset'} onClick={() => setActiveTab('reset')} />
              </div>
              <CompanyToolbar />
          </div>
          <div className="flex-1 min-h-0 overflow-y-auto">
            {activeTab === 'company' && <CompanyDataTab />}
            {activeTab === 'void' && <VoidReasonsTab />}
            {activeTab === 'reset' && <ResetDatabaseTab />}
          </div>
      </div>
    </div>
  );
};

export default CompanyScreen;
