import React from 'react';
import { useSalesStore } from '../state/salesStore';
import { useAppStore } from '../state/appStore';
import { useTranslations } from '../i18n/useTranslations';
import { paymentTypesData } from '../data/mockData';
import { toBengaliNumber } from '../utils/bengaliNumbers';
import { Search, X, MoreVertical, Settings, Lock, Wrench, LogOut } from 'lucide-react';
import ReceiptItemEditModal from '../components/sales/ReceiptItemEditModal';

// --- Overlay Menu Component ---
const OverlayMenu: React.FC = () => {
    const { t } = useTranslations();
    const { setView } = useAppStore();
    const { toggleOverlay } = useSalesStore();

    const menuItems = [
        { label: t('management'), icon: <Wrench size={20}/>, action: () => setView('management') },
        { label: 'Settings', icon: <Settings size={20}/>, action: () => {} },
        { label: 'Lock Screen', icon: <Lock size={20}/>, action: () => {} },
        { label: 'Logout', icon: <LogOut size={20}/>, action: () => {} },
    ];

    return (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={() => toggleOverlay(false)}>
            <div 
                className="absolute top-0 right-0 h-full w-72 bg-card border-l border-border shadow-2xl p-4 flex flex-col z-50"
                onClick={e => e.stopPropagation()}
            >
                <h3 className="text-xl font-bold text-text-primary mb-4">Menu</h3>
                <nav>
                    <ul>
                        {menuItems.map(item => (
                            <li key={item.label}>
                                <button 
                                    onClick={() => { item.action(); toggleOverlay(false); }}
                                    className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-background text-text-secondary hover:text-text-primary"
                                >
                                    {item.icon}
                                    <span className="font-semibold">{item.label}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
};


// --- Sales Screen ---
const SalesScreen: React.FC = () => {
    const { t, language } = useTranslations();
    const { productsForSale, receiptItems, addItem, removeItem, calculateTotals, isOverlayOpen, toggleOverlay, isEditModalOpen, openEditModal } = useSalesStore();
    const quickPayments = paymentTypesData.filter(pt => pt.quickPayment && pt.enabled);

    const { subtotal, tax, total } = calculateTotals();
    
    const formatCurrency = (num: number) => {
        const val = num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        return language === 'bn' ? `৳${toBengaliNumber(val)}` : `৳${val}`;
    };

    return (
        <div className="h-screen w-screen bg-background flex text-text-primary overflow-hidden">
            {isOverlayOpen && <OverlayMenu />}
            {isEditModalOpen && <ReceiptItemEditModal />}
            {/* Main content */}
            <div className="flex-1 flex flex-col">
                <header className="bg-card p-3 flex items-center border-b border-border">
                    <div className="relative flex-1">
                        <input type="text" placeholder={t('searchOrScan')} className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-2 text-lg"/>
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary"/>
                    </div>
                </header>
                <main className="flex-1 p-3 grid grid-cols-3 gap-3 overflow-y-auto">
                    {productsForSale.map(product => (
                        <button key={product.id} onClick={() => addItem(product)} className="bg-card rounded-lg p-3 text-left hover:ring-2 ring-primary transition-all">
                            <p className="font-bold text-text-primary">{product.name}</p>
                            <p className="text-sm text-text-secondary">{formatCurrency(product.salePriceInclTax)}</p>
                        </button>
                    ))}
                </main>
            </div>

            {/* Receipt Panel */}
            <aside className="w-96 bg-card border-l border-border flex flex-col">
                <div className="p-4 border-b border-border">
                    <h2 className="text-xl font-bold">Receipt</h2>
                </div>
                <div className="flex-1 p-4 overflow-y-auto space-y-2">
                    {receiptItems.length === 0 ? (
                        <div className="flex items-center justify-center h-full text-text-secondary">
                            {t('noItems')}
                        </div>
                    ) : (
                        receiptItems.map(item => (
                            <div key={item.id} className="flex items-center p-2 rounded-lg hover:bg-background/50 cursor-pointer transition-colors" onClick={() => openEditModal(item)}>
                                <div className="flex-1">
                                    <p className="font-semibold text-text-primary">{item.name}</p>
                                    <p className="text-sm text-text-secondary">
                                        {language === 'bn' ? toBengaliNumber(item.quantity) : item.quantity} x {formatCurrency(item.price)}
                                    </p>
                                    {item.discount > 0 && (
                                        <p className="text-xs text-red-400">-{formatCurrency(item.discount)}</p>
                                    )}
                                </div>
                                <p className="w-24 text-right font-semibold text-lg">{formatCurrency(item.total)}</p>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); removeItem(item.id); }} 
                                    className="ml-2 p-1 text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded-full">
                                    <X size={16}/>
                                </button>
                            </div>
                        ))
                    )}
                </div>
                {/* Totals Section */}
                {receiptItems.length > 0 && (
                    <div className="p-4 border-t border-border space-y-2">
                        <div className="flex justify-between text-text-secondary"><p>{t('subtotal')}</p><p>{formatCurrency(subtotal)}</p></div>
                        <div className="flex justify-between text-text-secondary"><p>{t('tax')} (5%)</p><p>{formatCurrency(tax)}</p></div>
                        <div className="flex justify-between text-xl font-bold text-text-primary"><p>{t('total' as any)}</p><p>{formatCurrency(total)}</p></div>
                    </div>
                )}
                {/* Payment Section */}
                <div className="p-3 bg-background/50">
                     <div className="grid grid-cols-4 gap-2 mb-2">
                        {quickPayments.map(p => <button key={p.id} className="bg-card hover:bg-border p-2 rounded-lg text-sm font-semibold">{p.name}</button>)}
                    </div>
                    <div className="flex space-x-2">
                        <button className="flex-1 bg-secondary text-white font-bold py-3 rounded-lg text-lg">{t('charge')} {formatCurrency(total)}</button>
                        <button onClick={() => toggleOverlay(true)} className="p-3 bg-card hover:bg-border rounded-lg"><MoreVertical /></button>
                    </div>
                </div>
            </aside>
        </div>
    );
};

export default SalesScreen;