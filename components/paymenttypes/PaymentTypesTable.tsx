import React from 'react';
import { PaymentType } from '../../types';
import { useTranslations } from '../../i18n/useTranslations';
import { toBengaliNumber } from '../../utils/bengaliNumbers';
import { usePaymentTypeStore } from '../../state/paymentTypeStore';
import { useResizableColumns } from '../../hooks/useResizableColumns';
import { Check } from 'lucide-react';

interface PaymentTypesTableProps {
  paymentTypes: PaymentType[];
}

const PaymentTypesTable: React.FC<PaymentTypesTableProps> = ({ paymentTypes }) => {
  const { t, language } = useTranslations();
  const { selectedPaymentTypeId, setSelectedPaymentTypeId, updatePaymentType, openModal } = usePaymentTypeStore();

  const headers = [
    { key: 'name', label: t('payTypeName'), width: 200 },
    { key: 'position', label: t('payTypePosition'), width: 100 },
    { key: 'code', label: t('payTypeCode'), width: 100 },
    { key: 'enabled', label: t('payTypeEnabled'), width: 120 },
    { key: 'quickPayment', label: t('payTypeQuickPayment'), width: 150 },
    { key: 'customerRequired', label: t('payTypeCustomerRequired'), width: 160 },
    { key: 'changeAllowed', label: t('payTypeChangeAllowed'), width: 150 },
    { key: 'markAsPaid', label: t('payTypeMarkAsPaid'), width: 200 },
    { key: 'printReceipt', label: t('payTypePrintReceipt'), width: 150 },
    { key: 'shortcutKey', label: t('payTypeShortcutKey'), width: 150 },
  ];

  const { columns, resizerProps } = useResizableColumns(headers);

  const formatValue = (value: string | number) => {
    return language === 'bn' ? toBengaliNumber(value) : value.toString();
  };

  const handleCheckboxChange = (id: string, key: keyof PaymentType, value: boolean) => {
    updatePaymentType(id, key, value);
  };
  
  const CheckboxCell: React.FC<{
    item: PaymentType,
    field: keyof PaymentType
  }> = ({ item, field }) => (
    <td className="px-4 py-2 text-center">
        <input
            type="checkbox"
            checked={Boolean(item[field])}
            onChange={(e) => {
                e.stopPropagation();
                handleCheckboxChange(item.id, field, e.target.checked);
            }}
            className="form-checkbox h-4 w-4 rounded bg-background border-border text-primary focus:ring-primary cursor-pointer"
        />
    </td>
);


  return (
    <div className="overflow-auto bg-card rounded-lg border border-border h-full">
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
          {paymentTypes.map((pt) => (
            <tr 
              key={pt.id} 
              className={`transition-colors duration-150 cursor-pointer ${selectedPaymentTypeId === pt.id ? 'bg-primary/20' : 'hover:bg-background/50'}`}
              onClick={() => setSelectedPaymentTypeId(pt.id)}
              onDoubleClick={() => openModal(pt)}
            >
              <td className="px-4 py-2 truncate text-text-primary font-semibold">{pt.name}</td>
              <td className="px-4 py-2 truncate text-center">{formatValue(pt.position)}</td>
              <td className="px-4 py-2 truncate">{pt.code}</td>
              <CheckboxCell item={pt} field="enabled" />
              <CheckboxCell item={pt} field="quickPayment" />
              <CheckboxCell item={pt} field="customerRequired" />
              <CheckboxCell item={pt} field="changeAllowed" />
              <CheckboxCell item={pt} field="markAsPaid" />
              <CheckboxCell item={pt} field="printReceipt" />
              <td className="px-4 py-2 truncate">{pt.shortcutKey}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentTypesTable;