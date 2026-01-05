import React, { useState, useEffect } from 'react';
import { useSecurityStore } from '../../state/securityStore';
import { useTranslations } from '../../i18n/useTranslations';
import { User } from '../../types';
import { Save, X } from 'lucide-react';
import ToggleSwitch from '../common/ToggleSwitch';

const UserModal: React.FC = () => {
    const { isModalOpen, closeModal, editingUser, saveUser } = useSecurityStore();
    const { t } = useTranslations();
    const [userData, setUserData] = useState<Partial<User>>({});

    useEffect(() => {
        if (editingUser) {
            setUserData(editingUser);
        } else {
            setUserData({
                firstName: '',
                lastName: '',
                email: '',
                accessLevel: 10,
                active: true,
            });
        }
    }, [editingUser, isModalOpen]);

    if (!isModalOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData(prev => ({ ...prev, [name]: name === 'accessLevel' ? parseInt(value) || 0 : value }));
    };
    
    const handleToggleActive = (isActive: boolean) => {
         setUserData(prev => ({ ...prev, active: isActive }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        saveUser(userData);
    };

    const title = editingUser ? t('editUserModalTitle') : t('addUserModalTitle');

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-card w-full max-w-lg rounded-lg border border-primary/50 shadow-2xl">
                <form onSubmit={handleSubmit}>
                    <div className="p-4 border-b border-border">
                        <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="flex space-x-4">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-text-secondary mb-1">{t('userFirstName')}</label>
                                <input type="text" name="firstName" value={userData.firstName || ''} onChange={handleChange} required className="w-full bg-background border border-border rounded-md px-3 py-1.5 text-sm" />
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-text-secondary mb-1">{t('userLastName')}</label>
                                <input type="text" name="lastName" value={userData.lastName || ''} onChange={handleChange} required className="w-full bg-background border border-border rounded-md px-3 py-1.5 text-sm" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-1">{t('userEmail')}</label>
                            <input type="email" name="email" value={userData.email || ''} onChange={handleChange} required className="w-full bg-background border border-border rounded-md px-3 py-1.5 text-sm" />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-text-secondary mb-1">{t('userAccessLevel')}</label>
                            <input type="number" name="accessLevel" value={userData.accessLevel || ''} onChange={handleChange} required className="w-full bg-background border border-border rounded-md px-3 py-1.5 text-sm" />
                        </div>
                        <div className="flex items-center space-x-3">
                             <label className="block text-sm font-medium text-text-secondary">{t('userActive')}</label>
                             <ToggleSwitch checked={userData.active ?? true} onChange={handleToggleActive} />
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

export default UserModal;