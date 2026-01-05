import React, { useState, useEffect } from 'react';
import { usePaymentTypeStore } from '../../state/paymentTypeStore';
import { useTranslations } from '../../i18n/useTranslations';
import { PaymentType } from '../../types';
import { Save, X } from 'lucide-react';
import ToggleSwitch from '../common/ToggleSwitch';

interface FormFieldProps {
    label: string;
    children: React.ReactNode;
}
const FormField: React.FC<FormFieldProps> = ({ label, children }) => (
    <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-text-secondary">{label}</label>
        {children}
    </div>
);

const PaymentTypeModal: React.FC = () => {
    const { isModalOpen, closeModal, editingPaymentType, savePaymentType } = usePaymentTypeStore();
    const { t } = useTranslations();
    const [data, setData] = useState<Partial<PaymentType>>({});

    useEffect(() => {
        if (editingPaymentType) {
            setData(editingPaymentType);
        } else {
            setData({
                name: '', position: 0, code: '', enabled: true, quickPayment: true,
                customerRequired: false, changeAllowed: true, markAsPaid: true,
                printReceipt: true, shortcutKey: ''
            });
        }
    }, [editingPaymentType, isModalOpen]);

    if (!isModalOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setData(prev => ({ ...prev, [name]: type === 'number' ? parseInt(value) || 0 : value }));
    };
    
    const handleToggle = (field: keyof PaymentType) => (value: boolean) => {
         setData(prev => ({ ...prev, [field]: value }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        savePaymentType(data);
    };

    const title = editingPaymentType ? t('editPaymentType') : t('newPaymentType');

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-card w-full max-w-md rounded-lg border border-primary/50 shadow-2xl">
                <form onSubmit={handleSubmit}>
                    <div className="p-4 border-b border-border">
                        <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
                    </div>
                    <div className="p-6 space-y-3 max-h-[70vh] overflow-y-auto">
                        <FormField label={t('payTypeName')}>
                            <input type="text" name="name" value={data.name || ''} onChange={handleChange} required className="w-1/2 bg-background border border-border rounded-md px-3 py-1.5 text-sm" />
                        </FormField>
                        <FormField label={t('payTypePosition')}>
                            <input type="number" name="position" value={data.position || 0} onChange={handleChange} className="w-1/2 bg-background border border-border rounded-md px-3 py-1.5 text-sm" />
                        </FormField>
                        <FormField label={t('payTypeCode')}>
                           <input type="text" name="code" value={data.code || ''} onChange={handleChange} className="w-1/2 bg-background border border-border rounded-md px-3 py-1.5 text-sm" />
                        </FormField>
                        <FormField label={t('payTypeShortcutKey')}>
                           <input type="text" name="shortcutKey" value={data.shortcutKey || ''} onChange={handleChange} className="w-1/2 bg-background border border-border rounded-md px-3 py-1.5 text-sm" />
                        </FormField>
                        
                        <div className="pt-3 mt-3 border-t border-border space-y-3">
                            <FormField label={t('payTypeEnabled')}><ToggleSwitch checked={data.enabled ?? true} onChange={handleToggle('enabled')} /></FormField>
                            <FormField label={t('payTypeQuickPayment')}><ToggleSwitch checked={data.quickPayment ?? false} onChange={handleToggle('quickPayment')} /></FormField>
                            <FormField label={t('payTypeCustomerRequired')}><ToggleSwitch checked={data.customerRequired ?? false} onChange={handleToggle('customerRequired')} /></FormField>
                            <FormField label={t('payTypeChangeAllowed')}><ToggleSwitch checked={data.changeAllowed ?? true} onChange={handleToggle('changeAllowed')} /></FormField>
                            <FormField label={t('payTypeMarkAsPaid')}><ToggleSwitch checked={data.markAsPaid ?? true} onChange={handleToggle('markAsPaid')} /></FormField>
                            <FormField label={t('payTypePrintReceipt')}><ToggleSwitch checked={data.printReceipt ?? true} onChange={handleToggle('printReceipt')} /></FormField>
                        </div>
                    </div>
                    <div className="p-4 bg-background/50 flex justify-end space-x-3 rounded-b-lg">
                        <button type="submit" className="px-4 py-1.5 text-sm flex items-center space-x-2 bg-primary/80 hover:bg-primary text-white rounded">
                            <Save size={16} />
                            <span>{t('save')}</span>
                        </button>
                        <button type="button" onClick={closeModal} className="px-4 py-1.5 text-sm flex items-center space-x-2 bg-border/50 hover:bg-border/80 text-text-primary rounded">
                            <X size={16} />
                            <span>{t('cancel')}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PaymentTypeModal;
