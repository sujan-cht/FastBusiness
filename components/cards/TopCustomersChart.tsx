import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import { TopCustomer } from '../../types';
import Card from './Card';
import { toBengaliNumber } from '../../utils/bengaliNumbers';
import { useTranslations } from '../../i18n/useTranslations';

interface TopCustomersChartProps {
  data: TopCustomer[];
}

const TopCustomersChart: React.FC<TopCustomersChartProps> = ({ data }) => {
  const { t, language } = useTranslations();
  
  const formatXAxis = (tickItem: number) => {
    const value = tickItem / 1000;
    const formattedValue = language === 'bn' ? toBengaliNumber(value) : value;
    return `৳${formattedValue}k`;
  }

  const formatTooltip = (value: number) => {
      const currency = '৳';
      const formattedValue = language === 'bn' 
        ? toBengaliNumber(value.toLocaleString()) 
        : value.toLocaleString();
      return [`${currency}${formattedValue}`, t('spent')];
  }

  const renderLabel = (value: number) => {
    const currency = '৳';
    const formattedValue = language === 'bn' 
        ? toBengaliNumber(value.toLocaleString()) 
        : value.toLocaleString();
    return `${currency}${formattedValue}`;
  }


  return (
    <Card title={t('topCustomers')}>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart layout="vertical" data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} strokeOpacity={0.2} stroke="#4B5563" />
            <XAxis type="number" tickFormatter={formatXAxis} tick={{ fill: '#9CA3AF' }} />
            <YAxis type="category" dataKey="name" width={80} tick={{ fill: '#9CA3AF' }} />
            <Tooltip 
                formatter={formatTooltip}
                cursor={{ fill: 'rgba(16, 185, 129, 0.1)' }}
                contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    borderColor: '#4B5563',
                    borderRadius: '0.5rem',
                }}
                labelStyle={{ color: '#F9FAFB' }}
            />
            <Bar dataKey="spent" fill="#10B981" barSize={20}>
              <LabelList dataKey="spent" position="right" formatter={renderLabel} fill="#F9FAFB" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default TopCustomersChart;