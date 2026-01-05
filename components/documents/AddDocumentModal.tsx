
import React, { useState } from 'react';
import { useDocumentStore } from '../../state/documentStore';
import { useTranslations } from '../../i18n/useTranslations';
import { documentTypeData } from '../../data/mockData';
import { DocumentMainType, DocumentSubType } from '../../types';
import { Check, X } from 'lucide-react';
import { toBengaliNumber } from '../../utils/bengaliNumbers';

const AddDocumentModal: React.FC = () => {
    const { isAddModalOpen, toggleAddModal } = useDocumentStore();
    const { t, language } = useTranslations();

    const [selectedMainType, setSelectedMainType] = useState<DocumentMainType | null>(documentTypeData[0]);
    const [selectedSubType, setSelectedSubType] = useState<DocumentSubType | null>(documentTypeData[0].subTypes[0] || null);
    
    if (!isAddModalOpen) {
        return null;
    }

    const handleMainTypeClick = (mainType: DocumentMainType) => {
        setSelectedMainType(mainType);
        setSelectedSubType(mainType.subTypes[0] || null);
    }

    const handleClose = () => {
        toggleAddModal(false);
    }

    const formatCode = (code: string) => {
        return language === 'bn' ? toBengaliNumber(code) : code;
    }

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-card w-full max-w-xl rounded-lg border border-primary/50 shadow-2xl">
                <div className="p-4 border-b border-border">
                    <h2 className="text-lg font-semibold text-text-primary">{t('selectDocumentType')}</h2>
                </div>
                <div className="p-4 flex h-80">
                    <ul className="w-1/3 border-r border-border pr-4 space-y-1">
                        {documentTypeData.map((mainType) => (
                            <li
                                key={mainType.name}
                                onClick={() => handleMainTypeClick(mainType)}
                                className={`px-3 py-1.5 text-sm rounded cursor-pointer transition-colors ${
                                    selectedMainType?.name === mainType.name
                                        ? 'bg-primary text-white'
                                        : 'hover:bg-background/80'
                                }`}
                            >
                                {t(mainType.name as any)}
                            </li>
                        ))}
                    </ul>
                    <ul className="w-2/3 pl-4 space-y-1">
                        {selectedMainType?.subTypes.map((subType) => (
                             <li
                                key={subType.code}
                                onClick={() => setSelectedSubType(subType)}
                                className={`flex justify-between px-3 py-1.5 text-sm rounded cursor-pointer transition-colors ${
                                    selectedSubType?.code === subType.code
                                    ? 'bg-primary text-white'
                                    : 'hover:bg-background/80'
                                }`}
                            >
                               <span>{t(subType.name as any)}</span>
                               <span className="text-text-secondary">{formatCode(subType.code)}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="p-4 bg-background/50 flex justify-end space-x-3 rounded-b-lg">
                    <button onClick={handleClose} className="px-4 py-1.5 text-sm flex items-center space-x-2 bg-primary/80 hover:bg-primary text-white rounded">
                        <Check size={16} />
                        <span>{t('ok')}</span>
                    </button>
                    <button onClick={handleClose} className="px-4 py-1.5 text-sm flex items-center space-x-2 bg-border/50 hover:bg-border/80 text-text-primary rounded">
                        <X size={16} />
                        <span>{t('cancel')}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddDocumentModal;
