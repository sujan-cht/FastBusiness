
import React from 'react';
import { useTranslations } from '../../i18n/useTranslations';
import {
    RefreshCw, History, Printer, FileText, FileSpreadsheet, ClipboardCheck, ListChecks, HelpCircle
} from 'lucide-react';

const ToolbarButton = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
    <div className="flex flex-col items-center space-y-1 px-2 py-1 rounded hover:bg-primary/20 cursor-pointer text-center">
        {icon}
        <span className="text-xs leading-tight">{label}</span>
    </div>
);

const ToolbarSeparator = () => (
    <div className="h-10 w-px bg-border mx-1"></div>
)

const StockToolbar: React.FC = () => {
    const { t } = useTranslations();
    const iconSize = 20;

    return (
        <div className="bg-card p-1 rounded-lg border border-border flex items-center text-text-secondary">
            <ToolbarButton icon={<RefreshCw size={iconSize} />} label={t('refresh')} />
            <ToolbarButton icon={<History size={iconSize} />} label={t('stockHistory')} />
            <ToolbarSeparator />
            <ToolbarButton icon={<Printer size={iconSize} />} label={t('print')} />
            <ToolbarButton icon={<FileText size={iconSize} />} label={t('saveAsPdf')} />
            <ToolbarButton icon={<FileSpreadsheet size={iconSize} />} label={t('excel')} />
            <ToolbarSeparator />
            <ToolbarButton icon={<ClipboardCheck size={iconSize} />} label={t('inventoryCountReport')} />
            <ToolbarButton icon={<ListChecks size={iconSize} />} label={t('quickInventory')} />
            <ToolbarSeparator />
            <ToolbarButton icon={<HelpCircle size={iconSize} />} label={t('help')} />
        </div>
    );
};

export default StockToolbar;
