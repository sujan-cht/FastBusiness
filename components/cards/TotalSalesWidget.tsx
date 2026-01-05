import React from 'react';
import { toBengaliNumber, formatBengaliK } from '../../utils/bengaliNumbers';
import { useAppStore } from '../../state/appStore';

interface TotalSalesWidgetProps {
    title: string;
    amount: number;
    subtext: string;
    icon: React.ReactNode;
    currency?: string;
    className?: string;
    isNumeric?: boolean;
}

const formatEnglishK = (num: number): string => {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(2).replace(/\.0+$/, '') + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(2).replace(/\.0+$/, '') + 'K';
    }
    return num.toLocaleString();
};

const TotalSalesWidget: React.FC<TotalSalesWidgetProps> = ({ title, amount, subtext, icon, currency = '৳', className = '' }) => {
    const language = useAppStore((state) => state.language);
    
    const displayAmount = language === 'bn' ? formatBengaliK(amount) : formatEnglishK(amount);
    const displayCurrency = '৳';

    return (
        <div className={`bg-card p-6 rounded-lg shadow-md flex items-start justify-between ${className}`}>
            <div>
                <p className="text-text-secondary font-medium">{title}</p>
                <p className="text-4xl font-bold text-text-primary mt-2">
                    {currency === '' ? '' : displayCurrency}{displayAmount}
                </p>
                <p className="text-sm text-text-secondary mt-2">{subtext}</p>
            </div>
            <div className="p-3 bg-primary/20 rounded-full text-primary">
                {icon}
            </div>
        </div>
    )
}

export default TotalSalesWidget;