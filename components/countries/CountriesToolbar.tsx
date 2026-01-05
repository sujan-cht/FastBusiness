import React from 'react';
import { useTranslations } from '../../i18n/useTranslations';
import { useCountryStore } from '../../state/countryStore';
import { PlusCircle, Pencil, Trash2, HelpCircle } from 'lucide-react';

const ToolbarButton = ({ icon, label, onClick, disabled = false }: { icon: React.ReactNode, label: string, onClick?: () => void, disabled?: boolean }) => (
    <div 
        onClick={!disabled ? onClick : undefined}
        className={`flex flex-col items-center space-y-1 px-3 py-1 rounded transition-colors text-center ${
            disabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-primary/20 cursor-pointer'
        }`}
    >
        {icon}
        <span className="text-xs leading-tight">{label}</span>
    </div>
);

const ToolbarSeparator = () => <div className="h-10 w-px bg-border mx-1"></div>;

const CountriesToolbar: React.FC = () => {
    const { t } = useTranslations();
    const { selectedCountryId } = useCountryStore();
    const iconSize = 20;

    const mockAction = (action: string) => alert(`${action} functionality is not implemented.`);

    return (
        <div className="bg-card p-1 rounded-lg border border-border flex items-center text-text-secondary">
            <ToolbarButton icon={<PlusCircle size={iconSize} />} label={t('add')} onClick={() => mockAction('Add Country')} />
            <ToolbarButton icon={<Pencil size={iconSize} />} label={t('edit')} onClick={() => mockAction('Edit Country')} disabled={!selectedCountryId} />
            <ToolbarButton icon={<Trash2 size={iconSize} />} label={t('delete')} onClick={() => mockAction('Delete Country')} disabled={!selectedCountryId} />
            <ToolbarSeparator />
            <ToolbarButton icon={<HelpCircle size={iconSize} />} label={t('help')} />
        </div>
    );
};

export default CountriesToolbar;