import React, { useState, useEffect } from 'react';
import { useCustomerStore } from '../../state/customerStore';
import { useTranslations } from '../../i18n/useTranslations';
import { Customer } from '../../types';
import { Save, X } from 'lucide-react';
import ToggleSwitch from '../common/ToggleSwitch';

const CustomerModal: React.FC = () => {
    const { isModalOpen, closeModal, editingCustomer, saveCustomer } = useCustomerStore();
    const { t } = useTranslations();
    const [customerData, setCustomerData] = useState<Partial<Customer>>({});

    useEffect(() => {
        if (editingCustomer) {
            setCustomerData(editingCustomer);
        } else {
            setCustomerData({
                code: '', name: '', taxNumber: '', address: '', phone: '', active: true, isCustomer: true,
            });
        }
    }, [editingCustomer, isModalOpen]);

    if (!isModalOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCustomerData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleToggle = (field: 'active' | 'isCustomer') => (value: boolean) => {
         setCustomerData(prev => ({ ...prev, [field]: value }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        saveCustomer(customerData);
    };

    const title = editingCustomer ? t('edit') : t('add');

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-card w-full max-w-lg rounded-lg border border-primary/50 shadow-2xl">
                <form onSubmit={handleSubmit}>
                    <div className="p-4 border-b border-border">
                        <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-1">{t('custName')}</label>
                            <input type="text" name="name" value={customerData.name || ''} onChange={handleChange} required className="w-full bg-background border border-border rounded-md px-3 py-1.5 text-sm" />
                        </div>
                        <div className="flex space-x-4">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-text-secondary mb-1">{t('custCode')}</label>
                                <input type="text" name="code" value={customerData.code || ''} onChange={handleChange} className="w-full bg-background border border-border rounded-md px-3 py-1.5 text-sm" />
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-text-secondary mb-1">{t('custTaxNum')}</label>
                                <input type="text" name="taxNumber" value={customerData.taxNumber || ''} onChange={handleChange} className="w-full bg-background border border-border rounded-md px-3 py-1.5 text-sm" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-1">{t('custAddress')}</label>
                            <input type="text" name="address" value={customerData.address || ''} onChange={handleChange} className="w-full bg-background border border-border rounded-md px-3 py-1.5 text-sm" />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-text-secondary mb-1">{t('custPhone')}</label>
                            <input type="tel" name="phone" value={customerData.phone || ''} onChange={handleChange} className="w-full bg-background border border-border rounded-md px-3 py-1.5 text-sm" />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <label className="block text-sm font-medium text-text-secondary">{t('custActive')}</label>
                                <ToggleSwitch checked={customerData.active ?? true} onChange={handleToggle('active')} />
                            </div>
                             <div className="flex items-center space-x-3">
                                <label className="block text-sm font-medium text-text-secondary">{t('isCustomer')}</label>
                                <ToggleSwitch checked={customerData.isCustomer ?? true} onChange={handleToggle('isCustomer')} />
                            </div>
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

export default CustomerModal;