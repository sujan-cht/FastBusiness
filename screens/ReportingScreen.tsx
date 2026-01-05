
import React from 'react';
import ReportList from '../components/reporting/ReportList';
import ReportFilters from '../components/reporting/ReportFilters';
import { useReportingStore } from '../state/reportingStore';
import { useTranslations } from '../i18n/useTranslations';

const ReportingScreen: React.FC = () => {
  const { selectedReportId } = useReportingStore();
  const { t } = useTranslations();

  return (
    <div className="p-4 flex h-full space-x-4">
      <div className="w-1/3">
        <ReportList />
      </div>
      <div className="w-2/3 flex flex-col">
          {selectedReportId ? (
              <ReportFilters />
          ) : (
              <div className="flex-1 flex items-center justify-center bg-card rounded-lg border border-border">
                  <p className="text-text-secondary">{t('selectReportPrompt')}</p>
              </div>
          )}
      </div>
    </div>
  );
};

export default ReportingScreen;
