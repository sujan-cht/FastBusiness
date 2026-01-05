import React from 'react';
import { useTranslations } from '../../i18n/useTranslations';
import { useStockStore } from '../../state/stockStore';
import { toBengaliNumber } from '../../utils/bengaliNumbers';

const SummaryItem: React.FC<{ label: string; value: string; isBold?: boolean }> = ({ label, value, isBold }) => (
    <div className="flex justify-between items-center text-sm">
        <span className="text-text-secondary">{label}:</span>
        <span className={`text-text-primary ${isBold ? 'font-bold' : ''}`}>{value}</span>
    </div>
);

const StockSummaryFooter: React.FC = () => {
    const { t, language } = useTranslations();
    const summary = useStockStore(state => state.summary);

    const formatCurrency = (num: number) => {
        const currency = '৳';
        const formattedNum = language === 'bn'
            ? toBengaliNumber(num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
            : num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        return `${currency}${formattedNum}`;
    };

    return (
        <div className="bg-card p-2 rounded-lg border border-border flex justify-end">
            <div className="flex space-x-8">
                {/* Cost Price Section */}
                <div className="w-64 space-y-1">
                    <h4 className="font-semibold text-text-primary mb-1">{t('costPrice')}</h4>
                    <SummaryItem label={t('totalCost')} value={formatCurrency(summary.totalCost)} />
                    <SummaryItem label={t('totalCostInclTax')} value={formatCurrency(summary.totalCostInclTax)} isBold />
                </div>
                {/* Sale Price Section */}
                <div className="w-64 space-y-1">
                    <h4 className="font-semibold text-text-primary mb-1">{t('salePrice')}</h4>
                    <SummaryItem label={t('totalValue')} value={formatCurrency(summary.totalValue)} />
                    <SummaryItem label={t('totalValueInclTax')} value={formatCurrency(summary.totalValueInclTax)} isBold />
                </div>
            </div>
        </div>
    );
};

export default StockSummaryFooter;