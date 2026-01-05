import React from 'react';
import { useTranslations } from '../i18n/useTranslations';
import { usePaymentTypeStore } from '../state/paymentTypeStore';
import PaymentTypesToolbar from '../components/paymenttypes/PaymentTypesToolbar';
import PaymentTypesTable from '../components/paymenttypes/PaymentTypesTable';
import PaymentTypeModal from '../components/paymenttypes/PaymentTypeModal';

const PaymentTypesScreen: React.FC = () => {
  const { paymentTypes } = usePaymentTypeStore();

  return (
    <>
      <PaymentTypeModal />
      <div className="p-4 flex flex-col h-full space-y-4">
        <PaymentTypesToolbar />
        <div className="flex-1 min-h-0">
            <PaymentTypesTable paymentTypes={paymentTypes} />
        </div>
      </div>
    </>
  );
};

export default PaymentTypesScreen;