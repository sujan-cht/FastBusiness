import React from 'react';
import { useCountryStore } from '../state/countryStore';
import CountriesToolbar from '../components/countries/CountriesToolbar';
import CountriesTable from '../components/countries/CountriesTable';

const CountriesScreen: React.FC = () => {
  const { countries } = useCountryStore();

  return (
    <div className="p-4 flex flex-col h-full space-y-4">
      <CountriesToolbar />
      <div className="flex-1 min-h-0">
          <CountriesTable countries={countries} />
      </div>
    </div>
  );
};

export default CountriesScreen;