import React from 'react';
import { useCompanyStore } from '../../state/companyStore';
import { CompanyData } from '../../types';
import FormField from './FormField';
import { useTranslations } from '../../i18n/useTranslations';

const FormSection: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-8">
        <h3 className="text-lg font-semibold text-text-primary mb-4">{title}</h3>
        <div className="space-y-3">
            {children}
        </div>
    </div>
);

const CompanyDataTab: React.FC = () => {
    const { data, updateField } = useCompanyStore();
    const { t } = useTranslations();
    
    const handleChange = (field: keyof CompanyData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        updateField(field, e.target.value);
    };

    return (
        <div className="p-6">
            <FormSection title={t('myCompanyData')}>
                <FormField labelKey="name" value={data.name} onChange={handleChange('name')} />
                <FormField labelKey="taxNumber" value={data.taxNumber} onChange={handleChange('taxNumber')} />
                <FormField labelKey="streetName" value={data.streetName} onChange={handleChange('streetName')} />
                <FormField labelKey="buildingNumber" value={data.buildingNumber} onChange={handleChange('buildingNumber')} />
                <FormField labelKey="additionalStreetName" value={data.additionalStreetName} onChange={handleChange('additionalStreetName')} />
                <FormField labelKey="plotIdentification" value={data.plotIdentification} onChange={handleChange('plotIdentification')} />
                <FormField labelKey="district" value={data.district} onChange={handleChange('district')} />
                <FormField labelKey="postalCode" value={data.postalCode} onChange={handleChange('postalCode')} />
                <FormField labelKey="city" value={data.city} onChange={handleChange('city')} />
                <FormField labelKey="stateProvince" value={data.stateProvince} onChange={handleChange('stateProvince')} />
                <FormField 
                    labelKey="country" 
                    value={data.country} 
                    onChange={handleChange('country')} 
                    isSelect
                    options={['Bangladesh', 'USA', 'Canada', 'UK']}
                />
                <FormField labelKey="phoneNumber" value={data.phoneNumber} onChange={handleChange('phoneNumber')} type="tel"/>
                <FormField labelKey="email" value={data.email} onChange={handleChange('email')} type="email"/>
            </FormSection>

            <FormSection title={t('bankAccount')}>
                <FormField labelKey="bankAccountNumber" value={data.bankAccountNumber} onChange={handleChange('bankAccountNumber')} />
                <FormField labelKey="bankDetails" value={data.bankDetails} onChange={handleChange('bankDetails')} />
            </FormSection>
            
            <FormSection title={t('databasePath')}>
                 <div className="flex items-center space-x-4 w-full md:w-3/4">
                    <label htmlFor="databasePath" className="w-1/2 md:w-[33.33%] text-sm text-text-secondary text-right">
                        {t('databasePath')}
                    </label>
                    <div className="w-1/2 md:w-[66.67%] flex items-center space-x-2">
                        <input id="databasePath" name="databasePath" type="text" value={data.databasePath} onChange={handleChange('databasePath')} className="flex-1 bg-background border border-border rounded-md px-3 py-1.5 text-sm"/>
                        <button onClick={() => alert('File browser not implemented.')} className="px-3 py-1.5 text-sm bg-border/50 hover:bg-border/80 rounded-md">{t('browse')}</button>
                    </div>
                </div>
            </FormSection>

            <FormSection title={t('logo')}>
                {/* Placeholder for logo upload */}
                 <div className="flex items-center space-x-4 w-full md:w-1/2">
                    <div className="w-1/3"></div>
                    <div className="w-2/3">
                        <input
                            type="file"
                            className="text-sm text-text-secondary file:mr-4 file:py-1.5 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary/20 file:text-primary hover:file:bg-primary/30"
                        />
                    </div>
                </div>
            </FormSection>
        </div>
    );
};

export default CompanyDataTab;