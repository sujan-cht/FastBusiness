import React, { useState, useEffect } from 'react';
import { useProductStore } from '../../state/productStore';
import { useTranslations } from '../../i18n/useTranslations';
import { ProductGroup } from '../../types';
import { Save, X } from 'lucide-react';

const ProductGroupModal: React.FC = () => {
    const { editingGroup, closeGroupModal, saveGroup, productGroups } = useProductStore();
    const { t } = useTranslations();
    const [groupData, setGroupData] = useState<Pick<ProductGroup, 'name' | 'parentId'> & { id?: string }>({ name: '', parentId: 'all' });

    useEffect(() => {
        if (editingGroup) {
            setGroupData({
                id: editingGroup.id,
                name: editingGroup.name,
                parentId: editingGroup.parentId
            });
        } else {
            setGroupData({ name: '', parentId: 'all' });
        }
    }, [editingGroup]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setGroupData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        saveGroup(groupData);
    };

    const title = editingGroup ? t('editGroup') : t('newGroup');

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-card w-full max-w-md rounded-lg border border-primary/50 shadow-2xl">
                <form onSubmit={handleSubmit}>
                    <div className="p-4 border-b border-border">
                        <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-1">{t('prodName')}</label>
                            <input type="text" name="name" value={groupData.name} onChange={handleChange} required className="w-full bg-background border border-border rounded-md px-3 py-1.5 text-sm" />
                        </div>
                        <div>
                           <label className="block text-sm font-medium text-text-secondary mb-1">Parent Group</label>
                            <select name="parentId" value={groupData.parentId || ''} onChange={handleChange} className="w-full bg-background border border-border rounded-md px-3 py-1.5 text-sm">
                                {productGroups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="p-4 bg-background/50 flex justify-end space-x-3 rounded-b-lg">
                        <button type="submit" className="px-4 py-1.5 text-sm flex items-center space-x-2 bg-primary/80 hover:bg-primary text-white rounded">
                            <Save size={16} />
                            <span>{t('save')}</span>
                        </button>
                        <button type="button" onClick={closeGroupModal} className="px-4 py-1.5 text-sm flex items-center space-x-2 bg-border/50 hover:bg-border/80 text-text-primary rounded">
                            <X size={16} />
                            <span>{t('cancel')}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductGroupModal;