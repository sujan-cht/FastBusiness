import React from 'react';
import { useTranslations } from '../../i18n/useTranslations';
import { useSecurityStore } from '../../state/securityStore';
import ToggleSwitch from '../common/ToggleSwitch';
import {
    RefreshCw, UserPlus, Pencil, Trash2, KeyRound, HelpCircle
} from 'lucide-react';

const ToolbarButton = ({ icon, label, onClick, vertical = false, disabled = false }: { icon: React.ReactNode, label: string, onClick?: () => void, vertical?: boolean, disabled?: boolean }) => (
    <div 
        onClick={!disabled ? onClick : undefined}
        className={`flex items-center space-x-2 px-2 py-1 rounded transition-colors ${
            disabled 
            ? 'cursor-not-allowed opacity-50' 
            : 'hover:bg-primary/20 cursor-pointer'
        } ${vertical ? 'flex-col !space-x-0 space-y-1' : ''}`}
    >
        {icon}
        <span className={`text-xs leading-tight ${vertical ? 'mt-1' : ''}`}>{label}</span>
    </div>
);


const ToolbarSeparator = () => (
    <div className="h-10 w-px bg-border mx-1"></div>
)

const UserToolbar: React.FC = () => {
    const { t } = useTranslations();
    const { showInactive, toggleShowInactive, openModal, selectedUserId, users, deleteUser } = useSecurityStore();
    const iconSize = 20;

    const selectedUser = users.find(u => u.id === selectedUserId);
    const isUserSelected = !!selectedUser;

    const handleEdit = () => {
        if (selectedUser) {
            openModal(selectedUser);
        }
    };
    
    const handleDelete = () => {
        if (selectedUser && confirm(`Are you sure you want to delete user ${selectedUser.firstName} ${selectedUser.lastName}?`)) {
            deleteUser();
        }
    }

    const handleResetPassword = () => {
        if (selectedUser) {
            alert(`Password reset link sent to ${selectedUser.email}`);
        }
    }

    return (
        <div className="bg-card p-1 rounded-lg border border-border flex items-center text-text-secondary">
            <ToolbarButton icon={<RefreshCw size={iconSize} />} label={t('refresh')} vertical />
            <ToolbarButton icon={<UserPlus size={iconSize} />} label={t('addUser')} vertical onClick={() => openModal()} />
            <ToolbarButton icon={<Pencil size={iconSize} />} label={t('edit')} vertical onClick={handleEdit} disabled={!isUserSelected} />
            <ToolbarButton icon={<Trash2 size={iconSize} />} label={t('delete')} vertical onClick={handleDelete} disabled={!isUserSelected} />
            <ToolbarSeparator />
            <ToolbarButton icon={<KeyRound size={iconSize} />} label={t('resetPassword')} vertical onClick={handleResetPassword} disabled={!isUserSelected} />
            <ToolbarSeparator />
             <div className="flex items-center space-x-2 px-2">
                 <ToggleSwitch checked={showInactive} onChange={toggleShowInactive} />
                 <span className="text-xs">{t('showInactiveUsers')}</span>
             </div>
            <ToolbarSeparator />
            <ToolbarButton icon={<HelpCircle size={iconSize} />} label={t('help')} vertical />
        </div>
    );
};

export default UserToolbar;