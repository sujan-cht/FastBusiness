import React from 'react';
import { useTranslations } from '../../i18n/useTranslations';
import { useCustomerStore } from '../../state/customerStore';
import {
    PlusCircle, Pencil, Trash2, FileOutput, HelpCircle
} from 'lucide-react';

const ToolbarButton = ({ icon, label, onClick, disabled = false }: { icon: React.ReactNode, label: string, onClick?: () => void, disabled?: boolean }) => (
    <div 
        onClick={!disabled ? onClick : undefined}
        className={`flex flex-col items-center space-y-1 px-3 py-1 rounded transition-colors text-center ${
            disabled 
            ? 'cursor-not-allowed opacity-50' 
            : 'hover:bg-primary/20 cursor-pointer'
        }`}
    >
        {icon}
        <span className="text-xs leading-tight">{label}</span>
    </div>
);

const ToolbarSeparator = () => (
    <div className="h-10 w-px bg-border mx-1"></div>
)

const CustomerToolbar: React.FC = () => {
    const { t } = useTranslations();
    const { openModal, selectedCustomerId, customers, deleteCustomer } = useCustomerStore();
    const iconSize = 20;

    const selectedCustomer = customers.find(c => c.id === selectedCustomerId);
    const isCustomerSelected = !!selectedCustomer;

    const handleEdit = () => {
        if (selectedCustomer) {
            openModal(selectedCustomer);
        }
    };
    
    const handleDelete = () => {
        if (selectedCustomer && confirm(`Are you sure you want to delete ${selectedCustomer.name}?`)) {
            deleteCustomer();
        }
    }

    return (
        <div className="bg-card p-1 rounded-lg border border-border flex items-center text-text-secondary">
            <ToolbarButton icon={<PlusCircle size={iconSize} />} label={t('add')} onClick={() => openModal()} />
            <ToolbarButton icon={<Pencil size={iconSize} />} label={t('edit')} onClick={handleEdit} disabled={!isCustomerSelected} />
            <ToolbarButton icon={<Trash2 size={iconSize} />} label={t('delete')} onClick={handleDelete} disabled={!isCustomerSelected} />
            <ToolbarSeparator />
            <ToolbarButton icon={<FileOutput size={iconSize} />} label={t('export')} />
            <ToolbarSeparator />
            <ToolbarButton icon={<HelpCircle size={iconSize} />} label={t('help')} />
        </div>
    );
};

export default CustomerToolbar;