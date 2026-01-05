import React, { useState, useEffect } from 'react';
import { useSalesStore } from '../../state/salesStore';
import { useTranslations } from '../../i18n/useTranslations';
import { Save, X } from 'lucide-react';

const ReceiptItemEditModal: React.FC = () => {
    const { isEditModalOpen, closeEditModal, editingItem, saveItemEdit } = useSalesStore();
    const { t } = useTranslations();

    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);

    useEffect(() => {
        if (editingItem) {
            setQuantity(editingItem.quantity);
            setPrice(editingItem.price);
            setDiscount(editingItem.discount || 0);
        }
    }, [editingItem]);

    if (!isEditModalOpen || !editingItem) {
        return null;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        saveItemEdit({
            id: editingItem.id,
            quantity: Number(quantity) || 1,
            price: Number(price) || 0,
            discount: Number(discount) || 0,
        });
    };

    const total = (price * quantity) - discount;

    const InputField: React.FC<{ label: string; value: number; onChange: (val: number) => void; }> = ({ label, value, onChange }) => (
         <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">{label}</label>
            <input 
                type="number" 
                value={value} 
                onChange={e => onChange(parseFloat(e.target.value))} 
                className="w-full bg-background border border-border rounded-md px-3 py-1.5 text-sm" 
            />
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-card w-full max-w-sm rounded-lg border border-primary/50 shadow-2xl">
                <form onSubmit={handleSubmit}>
                    <div className="p-4 border-b border-border">
                        <h2 className="text-lg font-semibold text-text-primary">{t('edit')} - {editingItem.name}</h2>
                    </div>
                    <div className="p-6 space-y-4">
                        <InputField label={t('itemQty')} value={quantity} onChange={setQuantity} />
                        <InputField label={t('itemPrice')} value={price} onChange={setPrice} />
                        <InputField label={t('itemDiscount')} value={discount} onChange={setDiscount} />

                        <div className="pt-3 mt-3 border-t border-border">
                            <div className="flex justify-between font-bold text-lg text-text-primary">
                                <span>{t('itemTotal')}</span>
                                <span>{total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 bg-background/50 flex justify-end space-x-3 rounded-b-lg">
                        <button type="submit" className="px-4 py-1.5 text-sm flex items-center space-x-2 bg-primary/80 hover:bg-primary text-white rounded">
                            <Save size={16} />
                            <span>{t('save')}</span>
                        </button>
                        <button type="button" onClick={closeEditModal} className="px-4 py-1.5 text-sm flex items-center space-x-2 bg-border/50 hover:bg-border/80 text-text-primary rounded">
                            <X size={16} />
                            <span>{t('cancel')}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReceiptItemEditModal;
