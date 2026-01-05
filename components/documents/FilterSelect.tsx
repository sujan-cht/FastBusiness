
import React from 'react';

interface FilterSelectProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
}

const FilterSelect: React.FC<FilterSelectProps> = ({ label, value, onChange, children }) => {
  return (
    <div>
      <label className="block text-xs font-medium text-text-secondary mb-1">{label}</label>
      <select
        value={value}
        onChange={onChange}
        className="w-full bg-background border border-border rounded-md px-3 py-1.5 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-primary"
      >
        {children}
      </select>
    </div>
  );
};

export default FilterSelect;
