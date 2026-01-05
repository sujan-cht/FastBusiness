import React from 'react';
import { Country } from '../../types';
import { useTranslations } from '../../i18n/useTranslations';
import { useCountryStore } from '../../state/countryStore';
import { useResizableColumns } from '../../hooks/useResizableColumns';

interface CountriesTableProps {
  countries: Country[];
}

const CountriesTable: React.FC<CountriesTableProps> = ({ countries }) => {
  const { t } = useTranslations();
  const { selectedCountryId, setSelectedCountryId } = useCountryStore();

  const headers = [
    { key: 'name', label: t('countryName'), width: 400 },
    { key: 'code', label: t('countryCode'), width: 150 },
    { key: 'currency', label: t('countryCurrency'), width: 150 },
  ];

  const { columns, resizerProps } = useResizableColumns(headers);

  return (
    <div className="overflow-auto bg-card rounded-lg border border-border h-full">
      <table className="w-full text-sm text-left text-text-secondary whitespace-nowrap" style={{ tableLayout: 'fixed' }}>
        <thead className="bg-background/50 text-xs uppercase sticky top-0 z-10">
          <tr>
            {columns.map((col, index) => (
              <th key={col.key} scope="col" className="px-4 py-2 font-semibold relative" style={{ width: col.width }}>
                {col.label}
                {index < columns.length - 1 && (
                  <div {...resizerProps(index)} className="absolute top-0 right-0 h-full w-1.5 cursor-col-resize bg-border opacity-0 hover:opacity-100" />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {countries.map((country) => (
            <tr 
              key={country.id} 
              className={`transition-colors duration-150 cursor-pointer ${selectedCountryId === country.id ? 'bg-primary/20' : 'hover:bg-background/50'}`}
              onClick={() => setSelectedCountryId(country.id)}
            >
              <td className="px-4 py-2 truncate text-text-primary font-semibold">{country.name}</td>
              <td className="px-4 py-2 truncate">{country.code}</td>
              <td className="px-4 py-2 truncate">{country.currency}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CountriesTable;