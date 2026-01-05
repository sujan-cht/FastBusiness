import React from 'react';
import { useTranslations } from '../../i18n/useTranslations';
import { useTaxRateStore } from '../../state/taxRateStore';
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

const TaxRatesToolbar: React.FC = () => {
    const { t } = useTranslations();
    const { selectedTaxRateId } = useTaxRateStore();
    const iconSize = 20;

    const mockAction = (action: string) => alert(`${action} functionality is not implemented.`);

    return (
        <div className="bg-card p-1 rounded-lg border border-border flex items-center text-text-secondary">
            <ToolbarButton icon={<PlusCircle size={iconSize} />} label={t('add')} onClick={() => mockAction('Add Tax Rate')} />
            <ToolbarButton icon={<Pencil size={iconSize} />} label={t('edit')} onClick={() => mockAction('Edit Tax Rate')} disabled={!selectedTaxRateId} />
            <ToolbarButton icon={<Trash2 size={iconSize} />} label={t('delete')} onClick={() => mockAction('Delete Tax Rate')} disabled={!selectedTaxRateId} />
            <ToolbarSeparator />
            <ToolbarButton icon={<HelpCircle size={iconSize} />} label={t('help')} />
        </div>
    );
};

export default TaxRatesToolbar;