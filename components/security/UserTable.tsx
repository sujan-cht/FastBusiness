import React from 'react';
import { User } from '../../types';
import { useTranslations } from '../../i18n/useTranslations';
import { toBengaliNumber } from '../../utils/bengaliNumbers';
import { useSecurityStore } from '../../state/securityStore';
import { useResizableColumns } from '../../hooks/useResizableColumns';
import { Check } from 'lucide-react';

interface UserTableProps {
  users: User[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  const { t, language } = useTranslations();
  const { selectedUserId, setSelectedUserId, openModal } = useSecurityStore();

  const headers = [
    { key: 'firstName', label: t('userFirstName'), width: 200 },
    { key: 'lastName', label: t('userLastName'), width: 200 },
    { key: 'email', label: t('userEmail'), width: 300 },
    { key: 'accessLevel', label: t('userAccessLevel'), width: 150 },
    { key: 'active', label: t('userActive'), width: 100 },
  ];

  const { columns, resizerProps } = useResizableColumns(headers);

  const formatAccessLevel = (level: number) => {
    return language === 'bn' ? toBengaliNumber(level) : level.toString();
  };
  
  const handleDoubleClick = (user: User) => {
      openModal(user);
  }

  return (
    <div className="overflow-auto h-full">
      <table className="w-full text-sm text-left text-text-secondary whitespace-nowrap" style={{ tableLayout: 'fixed' }}>
        <thead className="bg-background/50 text-xs uppercase sticky top-0 z-10">
          <tr>
            {columns.map((col, index) => (
              <th 
                key={col.key} 
                scope="col" 
                className="px-4 py-2 font-semibold relative border-b border-t border-border"
                style={{ width: col.width }}
              >
                {col.label}
                {index < columns.length - 1 && (
                  <div 
                    {...resizerProps(index)} 
                    className="absolute top-0 right-0 h-full w-1.5 cursor-col-resize bg-border opacity-0 hover:opacity-100 transition-opacity"
                  />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {users.map((user) => (
            <tr 
              key={user.id} 
              className={`transition-colors duration-150 cursor-pointer ${selectedUserId === user.id ? 'bg-primary/20' : 'hover:bg-background/50'}`}
              onClick={() => setSelectedUserId(user.id)}
              onDoubleClick={() => handleDoubleClick(user)}
            >
              <td className="px-4 py-2 truncate text-text-primary">{user.firstName}</td>
              <td className="px-4 py-2 truncate text-text-primary">{user.lastName}</td>
              <td className="px-4 py-2 truncate">{user.email}</td>
              <td className="px-4 py-2 truncate">{formatAccessLevel(user.accessLevel)}</td>
              <td className="px-4 py-2 text-center">
                 {user.active && <Check size={18} className="text-secondary mx-auto" />}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;