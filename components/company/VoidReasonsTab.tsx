
import React from 'react';
import { useTranslations } from '../../i18n/useTranslations';

const VoidReasonsTab: React.FC = () => {
    const { t } = useTranslations();
    
    return (
        <div className="p-6">
            <h3 className="text-lg font-semibold text-text-primary">{t('voidReasons')}</h3>
            <p className="text-text-secondary mt-2">
                Manage predefined reasons for voiding transactions.
            </p>
        </div>
    );
};

export default VoidReasonsTab;
