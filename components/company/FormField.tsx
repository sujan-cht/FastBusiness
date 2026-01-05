
import React from 'react';
import { useTranslations } from '../../i18n/useTranslations';
import { CompanyData } from '../../types';

interface FormFieldProps {
  labelKey: keyof CompanyData;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  type?: 'text' | 'email' | 'tel';
  isSelect?: boolean;
  options?: string[];
  placeholder?: string;
  className?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  labelKey,
  value,
  onChange,
  type = 'text',
  isSelect = false,
  options = [],
  placeholder,
  className = 'w-full md:w-1/2',
}) => {
  const { t } = useTranslations();

  const commonProps = {
    id: labelKey,
    name: labelKey,
    value: value,
    onChange: onChange,
    className: "w-full bg-background border border-border rounded-md px-3 py-1.5 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-primary",
  };

  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      <label htmlFor={labelKey} className="w-1/3 text-sm text-text-secondary text-right">
        {t(labelKey as any)}
      </label>
      <div className="w-2/3">
        {isSelect ? (
          <select {...commonProps}>
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        ) : (
          <input type={type} {...commonProps} placeholder={placeholder} />
        )}
      </div>
    </div>
  );
};

export default FormField;
