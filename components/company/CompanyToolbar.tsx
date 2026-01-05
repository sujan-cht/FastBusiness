
import React from 'react';
import { useTranslations } from '../../i18n/useTranslations';
import { useCompanyStore } from '../../state/companyStore';
import { Check, HelpCircle } from 'lucide-react';

const ToolbarButton = ({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick?: () => void }) => (
    <div 
        onClick={onClick}
        className="flex flex-col items-center space-y-1 px-3 py-1 rounded hover:bg-primary/20 cursor-pointer text-center"
    >
        {icon}
        <span className="text-xs leading-tight">{label}</span>
    </div>
);

const CompanyToolbar: React.FC = () => {
    const { t } = useTranslations();
    const { saveData } = useCompanyStore();
    const iconSize = 20;

    return (
        <div className="flex items-center text-text-secondary">
            <ToolbarButton icon={<Check size={iconSize} />} label={t('save')} onClick={saveData} />
            <ToolbarButton icon={<HelpCircle size={iconSize} />} label={t('help')} />
        </div>
    );
};

export default CompanyToolbar;
