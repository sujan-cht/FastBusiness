
import React from 'react';
import { useTranslations } from '../../i18n/useTranslations';

const ResetDatabaseTab: React.FC = () => {
    const { t } = useTranslations();
    
    return (
        <div className="p-6">
            <h3 className="text-lg font-semibold text-text-primary text-red-500">{t('resetDatabase')}</h3>
            <p className="text-text-secondary mt-2">
                This section provides options to reset or clear application data. This is a critical action and should be used with caution.
            </p>
        </div>
    );
};

export default ResetDatabaseTab;
