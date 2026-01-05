
import React from 'react';
import { useTranslations } from '../../i18n/useTranslations';

const SecurityTab: React.FC = () => {
    const { t } = useTranslations();
    
    return (
        <div className="p-6">
            <h3 className="text-lg font-semibold text-text-primary">{t('security')}</h3>
            <p className="text-text-secondary mt-2">
                {/* A placeholder description for the security settings */}
                Configure security settings, access levels, and permissions for different user roles.
            </p>
        </div>
    );
};

export default SecurityTab;
