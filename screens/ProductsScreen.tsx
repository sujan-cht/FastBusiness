import React, { useState, useCallback, useRef } from 'react';
import { useTranslations } from '../i18n/useTranslations';
import { useProductStore } from '../state/productStore';
import { toBengaliNumber } from '../utils/bengaliNumbers';
import ProductToolbar from '../components/products/ProductToolbar';
import ProductGroupTree from '../components/products/ProductGroupTree';
import ProductTable from '../components/products/ProductTable';
import ProductModal from '../components/products/ProductModal';
import ProductGroupModal from '../components/products/ProductGroupModal';
import { Search } from 'lucide-react';

const ProductsScreen: React.FC = () => {
    const { t, language } = useTranslations();
    const { 
        filteredProducts, 
        searchTerm, 
        setSearchTerm, 
        isProductModalOpen, 
        isGroupModalOpen,
        productGroupLayout 
    } = useProductStore();

    const [treeWidth, setTreeWidth] = useState(256);

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        const startX = e.clientX;
        const startWidth = treeWidth;

        const handleMouseMove = (moveEvent: MouseEvent) => {
            const dx = moveEvent.clientX - startX;
            let newWidth = startWidth + dx;

            const minWidth = 50;
            const maxWidth = 500;

            if (newWidth < minWidth) newWidth = minWidth;
            if (newWidth > maxWidth) newWidth = maxWidth;
            
            setTreeWidth(newWidth);
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = 'default';
            document.body.style.userSelect = 'auto';
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
    }, [treeWidth]);


    const productCount = language === 'bn' ? toBengaliNumber(filteredProducts.length) : filteredProducts.length;

    const SearchAndTablePanel = (
        <div className="flex-1 flex flex-col space-y-3 min-h-0">
            <div className="flex justify-between items-center bg-card p-2 rounded-lg border border-border">
                <div className="relative flex-1">
                    <input
                        type="text"
                        placeholder={t('searchProducts')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-background border border-border rounded-md pl-10 pr-4 py-1.5 text-sm"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">
                        <Search size={18} />
                    </div>
                </div>
                <div className="text-sm text-text-secondary ml-4 whitespace-nowrap">
                    {t('productsCount')}: <span className="font-bold text-text-primary">{productCount}</span>
                </div>
            </div>
            
            <ProductTable products={filteredProducts} />
        </div>
    );

    return (
        <>
            {isProductModalOpen && <ProductModal />}
            {isGroupModalOpen && <ProductGroupModal />}
            <div className="p-4 flex flex-col h-full space-y-4">
                <ProductToolbar />

                {productGroupLayout === 'side' ? (
                    <div className="flex flex-1 min-h-0">
                        <div style={{ width: `${treeWidth}px` }} className="flex-shrink-0">
                            <ProductGroupTree />
                        </div>
                        <div
                            onMouseDown={handleMouseDown}
                            className="w-1.5 cursor-col-resize flex-shrink-0 bg-border/50 hover:bg-primary transition-colors duration-200"
                        />
                        <div className="flex-1 flex flex-col min-h-0 pl-2">
                           {SearchAndTablePanel}
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col flex-1 min-h-0">
                        <div className="flex-1 min-h-0 pb-2 flex flex-col">
                            {SearchAndTablePanel}
                        </div>
                        <div className="h-[250px] flex-shrink-0 pt-2">
                            <ProductGroupTree />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default ProductsScreen;