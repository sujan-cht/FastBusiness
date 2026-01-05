
import React from 'react';
import { useAppStore } from '../state/appStore';
import { useTranslations } from '../i18n/useTranslations';
import LanguageIcon from './icons/LanguageIcon';

const SearchIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const BellIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
);


interface TopBarProps {
    title: string;
}

const TopBar: React.FC<TopBarProps> = ({ title }) => {
  const { language, setLanguage } = useAppStore();
  const { t } = useTranslations();

  return (
    <header className="bg-card shadow-sm p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-text-primary">{title}</h1>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder={t('search')}
            className="pl-10 pr-4 py-2 rounded-full bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <SearchIcon />
          </div>
        </div>

        <div className="relative">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as 'en' | 'bn')}
            className="appearance-none cursor-pointer bg-background border border-border text-text-primary text-sm rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="en">English</option>
            <option value="bn">বাংলা</option>
          </select>
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <LanguageIcon className="w-5 h-5" />
          </div>
        </div>

        <button className="p-2 rounded-full text-text-secondary hover:bg-background/80 relative">
          <BellIcon />
          <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
        </button>
      </div>
    </header>
  );
};

export default TopBar;
