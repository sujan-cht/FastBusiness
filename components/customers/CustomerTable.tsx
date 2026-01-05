import React from 'react';
import { Customer } from '../../types';
import { useTranslations } from '../../i18n/useTranslations';
import { toBengaliNumber } from '../../utils/bengaliNumbers';
import { useCustomerStore } from '../../state/customerStore';
import { useResizableColumns } from '../../hooks/useResizableColumns';

interface CustomerTableProps {
  customers: Customer[];
}

const CustomerTable: React.FC<CustomerTableProps> = ({ customers }) => {
  const { t, language } = useTranslations();
  const { selectedCustomerId, setSelectedCustomerId, openModal } = useCustomerStore();

  const headers = [
    { key: 'code', label: t('custCode'), width: 100 },
    { key: 'name', label: t('custName'), width: 250 },
    { key: 'taxNumber', label: t('custTaxNum'), width: 150 },
    { key: 'address', label: t('custAddress'), width: 300 },
    { key: 'phone', label: t('custPhone'), width: 150 },
    { key: 'active', label: t('custActive'), width: 80 },
    { key: 'isCustomer', label: t('isCustomer'), width: 100 },
  ];

  const { columns, resizerProps } = useResizableColumns(headers);

  const formatValue = (value: string | number | boolean) => {
    if (typeof value === 'string' && language === 'bn') {
        return toBengaliNumber(value);
    }
    return value;
  }

  return (
    <div className="overflow-auto bg-card rounded-lg border border-border h-full">
      <table className="w-full text-sm text-left text-text-secondary whitespace-nowrap" style={{ tableLayout: 'fixed' }}>
        <thead className="bg-background/50 text-xs uppercase sticky top-0 z-10">
          <tr>
            {columns.map((col, index) => (
              <th 
                key={col.key} 
                scope="col" 
                className="px-4 py-2 font-semibold relative"
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
          {customers.map((customer) => (
            <tr 
              key={customer.id} 
              className={`transition-colors duration-150 cursor-pointer ${selectedCustomerId === customer.id ? 'bg-primary/20' : 'hover:bg-background/50'}`}
              onClick={() => setSelectedCustomerId(customer.id)}
              onDoubleClick={() => openModal(customer)}
            >
              <td className="px-4 py-1.5 truncate font-medium text-text-primary">{formatValue(customer.code)}</td>
              <td className="px-4 py-1.5 truncate text-text-primary">{customer.name}</td>
              <td className="px-4 py-1.5 truncate">{formatValue(customer.taxNumber)}</td>
              <td className="px-4 py-1.5 truncate">{customer.address}</td>
              <td className="px-4 py-1.5 truncate">{formatValue(customer.phone)}</td>
              <td className="px-4 py-1.5 text-center">
                 <input type="checkbox" readOnly checked={customer.active} className="form-checkbox h-4 w-4 rounded bg-background border-border text-primary focus:ring-primary" />
              </td>
              <td className="px-4 py-1.5 text-center">
                 <input type="checkbox" readOnly checked={customer.isCustomer} className="form-checkbox h-4 w-4 rounded bg-background border-border text-primary focus:ring-primary" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;