import React from 'react';
import { useTaxRateStore } from '../state/taxRateStore';
import TaxRatesToolbar from '../components/taxrates/TaxRatesToolbar';
import TaxRatesTable from '../components/taxrates/TaxRatesTable';

const TaxRatesScreen: React.FC = () => {
  const { taxRates } = useTaxRateStore();

  return (
    <div className="p-4 flex flex-col h-full space-y-4">
      <TaxRatesToolbar />
      <div className="flex-1 min-h-0">
          <TaxRatesTable taxRates={taxRates} />
      </div>
    </div>
  );
};

export default TaxRatesScreen;