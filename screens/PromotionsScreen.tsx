import React from 'react';
import { useTranslations } from '../i18n/useTranslations';
import { usePromotionStore } from '../state/promotionStore';
import PromotionsToolbar from '../components/promotions/PromotionsToolbar';
import PromotionsTable from '../components/promotions/PromotionsTable';

const PromotionsScreen: React.FC = () => {
  const { promotions } = usePromotionStore();

  return (
    <div className="p-4 flex flex-col h-full space-y-4">
      <PromotionsToolbar />
      <div className="flex-1 min-h-0">
          <PromotionsTable promotions={promotions} />
      </div>
    </div>
  );
};

export default PromotionsScreen;