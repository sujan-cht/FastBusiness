import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Card from './Card';
import { useTranslations } from '../../i18n/useTranslations';

// FIX: Update the data prop type to match what the Pie chart expects.
// The `ProductGroup` type is for the tree view and doesn't have the `value` property needed by the chart.
interface ProductGroupsDonutProps {
  data: { name: string; value: number }[];
}

const COLORS = ['#008CA4', '#10B981', '#F59E0B', '#6366F1'];

const ProductGroupsDonut: React.FC<ProductGroupsDonutProps> = ({ data }) => {
  const { t } = useTranslations();
  return (
    <Card title={t('productGroups')}>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              nameKey="name"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    borderColor: '#4B5563',
                    borderRadius: '0.5rem',
                }}
              labelStyle={{ color: '#F9FAFB' }}
            />
            <Legend wrapperStyle={{ color: '#F9FAFB' }}/>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default ProductGroupsDonut;