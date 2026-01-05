import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { HourlySale } from '../../types';
import Card from './Card';
import { toBengaliNumber } from '../../utils/bengaliNumbers';
import { useTranslations } from '../../i18n/useTranslations';

interface HourlySalesChartProps {
  data: HourlySale[];
}

const HourlySalesChart: React.FC<HourlySalesChartProps> = ({ data }) => {
  const { t, language } = useTranslations();

  const formatYAxis = (tickItem: number) => {
    const formattedTick = language === 'bn' ? toBengaliNumber(tickItem) : tickItem;
    return `৳${formattedTick}`;
  };

  const formatTooltip = (value: number) => {
      const currency = '৳';
      const formattedValue = language === 'bn' ? toBengaliNumber(value) : value;
      return [`${currency}${formattedValue}`, t('sales')];
  }
    
  return (
    <Card title={t('hourlySales')}>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} stroke="#4B5563" />
            <XAxis dataKey="hour" tick={{ fill: '#9CA3AF' }} />
            <YAxis tickFormatter={formatYAxis} tick={{ fill: '#9CA3AF' }} />
            <Tooltip 
                formatter={formatTooltip}
                cursor={{ fill: 'rgba(0, 140, 164, 0.1)' }}
                contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    borderColor: '#4B5563',
                    borderRadius: '0.5rem',
                }}
                labelStyle={{ color: '#F9FAFB' }}
            />
            <Bar dataKey="sales" name={t('sales')} fill="#008CA4" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default HourlySalesChart;