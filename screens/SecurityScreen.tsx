import React, { useState } from 'react';
import { useTranslations } from '../i18n/useTranslations';
import { useSecurityStore } from '../state/securityStore';
import UserToolbar from '../components/security/UserToolbar';
import UserTable from '../components/security/UserTable';
import SecurityTab from '../components/security/SecurityTab';
import UserModal from '../components/security/UserModal';

type ActiveTab = 'users' | 'security';

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


const SecurityScreen: React.FC = () => {
  const { t } = useTranslations();
  const { filteredUsers } = useSecurityStore();
  const [activeTab, setActiveTab] = useState<ActiveTab>('users');

  return (
    <>
      <UserModal />
      <div className="p-4 flex flex-col h-full space-y-4">
        <UserToolbar />
        <div className="flex-1 flex flex-col min-h-0 bg-card rounded-lg border border-border">
            <div className="p-2 border-b border-border">
                <div className="flex items-center space-x-1">
                    <TabButton label={t('users')} isActive={activeTab === 'users'} onClick={() => setActiveTab('users')} />
                    <TabButton label={t('security')} isActive={activeTab === 'security'} onClick={() => setActiveTab('security')} />
                </div>
            </div>
            <div className="flex-1 min-h-0">
              {activeTab === 'users' ? (
                  <UserTable users={filteredUsers} />
              ) : (
                  <SecurityTab />
              )}
            </div>
        </div>
      </div>
    </>
  );
};

export default SecurityScreen;