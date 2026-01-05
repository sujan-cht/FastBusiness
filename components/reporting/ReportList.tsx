
import React, { useMemo } from 'react';
import { useTranslations } from '../../i18n/useTranslations';
import { useReportingStore } from '../../state/reportingStore';
import { reportsData } from '../../data/mockData';
import { Search } from 'lucide-react';

const ReportList: React.FC = () => {
    const { t } = useTranslations();
    const { reportSearchTerm, setReportSearchTerm, selectedReportId, setSelectedReportId } = useReportingStore();

    const filteredReportData = useMemo(() => {
        if (!reportSearchTerm) {
            return reportsData;
        }
        const lowercasedTerm = reportSearchTerm.toLowerCase();
        return reportsData
            .map(category => ({
                ...category,
                reports: category.reports.filter(report =>
                    t(report.nameKey as any).toLowerCase().includes(lowercasedTerm)
                ),
            }))
            .filter(category => category.reports.length > 0);
    }, [reportSearchTerm, t]);

    return (
        <div className="bg-card rounded-lg border border-border flex flex-col h-full">
            <div className="p-4 border-b border-border">
                <div className="relative">
                    <input
                        type="text"
                        placeholder={t('searchReports')}
                        value={reportSearchTerm}
                        onChange={(e) => setReportSearchTerm(e.target.value)}
                        className="w-full bg-background border border-border rounded-md pl-10 pr-4 py-1.5 text-sm"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">
                        <Search size={18} />
                    </div>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
                {filteredReportData.map(category => (
                    <div key={category.nameKey} className="mb-4">
                        <h3 className="text-lg font-semibold text-text-primary mb-2">{t(category.nameKey as any)}</h3>
                        <ul>
                            {category.reports.map(report => (
                                <li key={report.id}>
                                    <button
                                        onClick={() => setSelectedReportId(report.id)}
                                        className={`w-full text-left px-3 py-2 text-sm rounded cursor-pointer transition-colors ${
                                            selectedReportId === report.id
                                                ? 'bg-primary text-white'
                                                : 'hover:bg-background/80 text-text-secondary'
                                        }`}
                                    >
                                        {t(report.nameKey as any)}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReportList;
