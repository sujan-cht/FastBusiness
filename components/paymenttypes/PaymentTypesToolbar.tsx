import React from 'react';
import { useTranslations } from '../../i18n/useTranslations';
import { usePaymentTypeStore } from '../../state/paymentTypeStore';
import {
    RefreshCw, Plus, Pencil, Trash2, HelpCircle
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

const PaymentTypesToolbar: React.FC = () => {
    const { t } = useTranslations();
    const { openModal, selectedPaymentTypeId, paymentTypes, deletePaymentType } = usePaymentTypeStore();
    const iconSize = 20;

    const selectedPaymentType = paymentTypes.find(pt => pt.id === selectedPaymentTypeId);
    const isSelected = !!selectedPaymentType;
    
    const handleEdit = () => {
        if(selectedPaymentType) {
            openModal(selectedPaymentType);
        }
    };
    
    const handleDelete = () => {
        if(selectedPaymentType && confirm(`Are you sure you want to delete ${selectedPaymentType.name}?`)) {
            deletePaymentType();
        }
    }

    return (
        <div className="bg-card p-1 rounded-lg border border-border flex items-center text-text-secondary">
            <ToolbarButton icon={<RefreshCw size={iconSize} />} label={t('refresh')} />
            <ToolbarSeparator />
            <ToolbarButton icon={<Plus size={iconSize} />} label={t('newPaymentType')} onClick={() => openModal()} />
            <ToolbarButton icon={<Pencil size={iconSize} />} label={t('edit')} onClick={handleEdit} disabled={!isSelected} />
            <ToolbarButton icon={<Trash2 size={iconSize} />} label={t('delete')} onClick={handleDelete} disabled={!isSelected} />
            <ToolbarSeparator />
            <ToolbarButton icon={<HelpCircle size={iconSize} />} label={t('help')} />
        </div>
    );
};

export default PaymentTypesToolbar;