
import React from 'react';
import { useStockStore } from '../state/stockStore';

import StockToolbar from '../components/stock/StockToolbar';
import StockFilterHeader from '../components/stock/StockFilterHeader';
import StockGroupTree from '../components/stock/StockGroupTree';
import StockTable from '../components/stock/StockTable';
import StockSummaryFooter from '../components/stock/StockSummaryFooter';


const StockScreen: React.FC = () => {
    const { filteredStockItems } = useStockStore();

    return (
        <div className="p-4 flex flex-col h-full space-y-4">
            <StockToolbar />
            
            <div className="flex flex-1 space-x-4 min-h-0">
                {/* Left Pane: Product Groups */}
                <StockGroupTree />

                {/* Right Pane: Filters, Table, and Summary */}
                <div className="flex-1 flex flex-col space-y-3 min-h-0">
                    <StockFilterHeader />
                    <StockTable items={filteredStockItems} />
                    <StockSummaryFooter />
                </div>
            </div>
        </div>
    );
};

export default StockScreen;
