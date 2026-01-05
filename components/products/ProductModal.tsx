import React, { useState, useEffect, useRef } from 'react';
import { useProductStore } from '../../state/productStore';
import { useCustomerStore } from '../../state/customerStore';
import { useTranslations } from '../../i18n/useTranslations';
import { Product, ProductGroup } from '../../types';
import { Save, X, ChevronRight, HelpCircle, Info, ChevronDown, Plus, Trash2 } from 'lucide-react';
import { toBengaliNumber } from '../../utils/bengaliNumbers';
import StyledToggleSwitch from '../common/StyledToggleSwitch';

// --- Helper Components ---
const InputField = ({ label, name, value, onChange, type = 'text', required = false, readOnly = false }: { label: string, name: string, value: any, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, type?: string, required?: boolean, readOnly?: boolean }) => (
    <div>
        <label className="block text-sm font-medium text-text-secondary mb-1">{label}</label>
        <input 
            type={type} 
            name={name} 
            value={value} 
            onChange={onChange} 
            required={required}
            readOnly={readOnly}
            className={`w-full bg-background border border-border rounded-md px-3 py-1.5 text-sm ${readOnly ? 'cursor-not-allowed opacity-70' : ''}`}
        />
    </div>
);

const TextAreaField = ({ label, name, value, onChange, rows = 3 }: { label: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; rows?: number; }) => (
    <div>
        <label className="block text-sm font-medium text-text-secondary mb-1">{label}</label>
        <textarea
            name={name}
            value={value}
            onChange={onChange}
            rows={rows}
            className="w-full bg-background border border-border rounded-md px-3 py-1.5 text-sm"
        />
    </div>
);


interface SelectFieldProps {
    label: string;
    name: string;
    value: any;
    onChange: any;
    children: React.ReactNode;
}

const SelectField: React.FC<SelectFieldProps> = ({ label, name, value, onChange, children }) => (
     <div>
        <label className="block text-sm font-medium text-text-secondary mb-1">{label}</label>
        <select 
            name={name} 
            value={value} 
            onChange={onChange} 
            className="w-full bg-background border border-border rounded-md px-3 py-1.5 text-sm"
        >
            {children}
        </select>
    </div>
);

const DetailsTab = ({ productData, handleChange, handleToggleChange, renderGroupOptions }) => {
    const { t, language } = useTranslations();
    const codeInBengali = language === 'bn' ? toBengaliNumber(productData.code) : productData.code;

    return (
        <div className="space-y-4">
            <InputField label={t('prodName')} name="name" value={productData.name} onChange={handleChange} required />
            <div className="grid grid-cols-2 gap-4">
                <InputField label={t('prodCode')} name="code" value={codeInBengali} onChange={() => {}} readOnly />
                <div>
                     <InputField label={t('prodBarcode')} name="barcode" value={productData.barcode} onChange={handleChange} />
                     <a href="#" onClick={e => e.preventDefault()} className="text-sm text-primary hover:underline mt-1 inline-block">{t('generateBarcode')}</a>
                </div>
                <InputField label={t('unitOfMeasurement')} name="unit" value={productData.unit} onChange={handleChange} />
                <SelectField label={t('prodGroup')} name="groupId" value={productData.groupId} onChange={handleChange}>
                    {renderGroupOptions}
                </SelectField>
            </div>
            <div className="space-y-3 pt-2">
                <StyledToggleSwitch label={t('prodActive')} checked={!!productData.active} onChange={handleToggleChange('active')} />
                <StyledToggleSwitch label={t('defaultQuantity')} checked={!!productData.hasDefaultQuantity} onChange={handleToggleChange('hasDefaultQuantity')} />
                <StyledToggleSwitch label={t('service')} checked={!!productData.isService} onChange={handleToggleChange('isService')} />
            </div>
             <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">{t('ageRestriction')}</label>
                <div className="flex items-center">
                    <input 
                        type="number" 
                        name="ageRestriction" 
                        value={productData.ageRestriction || ''} 
                        onChange={handleChange}
                        className="w-24 bg-background border border-border rounded-md px-3 py-1.5 text-sm" 
                    />
                    <span className="ml-2 text-text-secondary text-sm">{t('years')}</span>
                </div>
            </div>
            <TextAreaField label={t('description')} name="description" value={productData.description || ''} onChange={handleChange} />
        </div>
    );
};

const PriceAndTaxTab = ({ productData, handleChange, handleToggleChange }) => {
    const { t, language } = useTranslations();

    const formatMarkup = (num: number | undefined) => {
        if (num === undefined || isNaN(num) || !isFinite(num)) return language === 'bn' ? toBengaliNumber('0.0000') : '0.0000';
        const options = { minimumFractionDigits: 4, maximumFractionDigits: 4 };
        const value = num.toLocaleString('en-US', options);
        return language === 'bn' ? toBengaliNumber(value) : value;
    };

    const cost = productData.cost || 0;
    const salePrice = productData.salePriceInclTax || 0;
    const markup = cost > 0 ? ((salePrice - cost) / cost) * 100 : 0;

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">{t('prodTaxes')}</label>
                <div className="flex items-center space-x-2">
                    <button type="button" className="px-3 py-1.5 text-sm bg-border/50 hover:bg-border/80 rounded-md text-text-primary">
                        {t('addTaxToProduct')}
                    </button>
                    <HelpCircle size={16} className="text-text-secondary cursor-help" />
                </div>
            </div>
            
            <InputField 
                label={t('maximumRetailPrice')} 
                name="originalPrice" 
                type="number"
                value={productData.originalPrice || ''} 
                onChange={handleChange} 
            />
            <InputField 
                label={t('prodCost')} 
                name="cost" 
                type="number"
                value={productData.cost || ''} 
                onChange={handleChange} 
            />

            <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">{t('markup')}</label>
                <div className="relative">
                    <input 
                        type="text"
                        readOnly
                        value={formatMarkup(markup)}
                        className="w-full bg-background border border-border rounded-md px-3 py-1.5 text-sm cursor-not-allowed opacity-70"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary">%</span>
                </div>
            </div>
            
            <InputField 
                label={t('salePrice')} 
                name="salePriceInclTax" 
                type="number"
                value={productData.salePriceInclTax || ''} 
                onChange={handleChange} 
            />

            <div className="space-y-3 pt-2">
                <StyledToggleSwitch 
                    label={t('priceIncludesTax')} 
                    checked={!!productData.priceIncludesTax} 
                    onChange={handleToggleChange('priceIncludesTax')} 
                />
                <StyledToggleSwitch 
                    label={t('priceChangeAllowed')} 
                    checked={!!productData.priceChangeAllowed} 
                    onChange={handleToggleChange('priceChangeAllowed')} 
                />
            </div>
        </div>
    );
};

const StockControlTab = ({ productData, handleChange, handleToggleChange }) => {
    const { t } = useTranslations();
    const { customers } = useCustomerStore();
    const suppliers = customers.filter(c => !c.isCustomer);

    return (
        <div className="space-y-4">
            <div className="bg-primary/20 border border-primary/50 text-primary-content p-3 rounded-lg flex items-start space-x-3">
                <Info size={20} className="flex-shrink-0 mt-0.5 text-primary" />
                <div>
                    <p className="text-sm text-text-primary">{t('stockControlInfo')}</p>
                    <a href="#" onClick={e => e.preventDefault()} className="text-sm text-primary font-semibold hover:underline">{t('learnMore')}</a>
                </div>
            </div>

            <SelectField label={t('supplier')} name="supplierId" value={productData.supplierId || ''} onChange={handleChange}>
                <option value="">None</option>
                {suppliers.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                ))}
            </SelectField>

            <InputField 
                label={t('reorderPoint')} 
                name="reorderPoint" 
                type="number"
                value={productData.reorderPoint || ''} 
                onChange={handleChange} 
            />
            <InputField 
                label={t('preferredQuantity')} 
                name="preferredQuantity" 
                type="number"
                value={productData.preferredQuantity || ''} 
                onChange={handleChange} 
            />

            <div className="space-y-3 pt-2">
                <StyledToggleSwitch 
                    label={t('lowStockWarning')} 
                    checked={!!productData.lowStockWarning} 
                    onChange={handleToggleChange('lowStockWarning')} 
                />
            </div>
            
            <div>
                <label className={`block text-sm font-medium mb-1 ${!productData.lowStockWarning ? 'text-text-secondary/50' : 'text-text-secondary'}`}>
                    {t('lowStockWarningQuantity')}
                </label>
                <input 
                    type="number"
                    name="lowStockWarningQuantity"
                    value={productData.lowStockWarningQuantity || ''}
                    onChange={handleChange}
                    disabled={!productData.lowStockWarning}
                    className={`w-full bg-background border border-border rounded-md px-3 py-1.5 text-sm ${!productData.lowStockWarning ? 'opacity-50 cursor-not-allowed' : ''}`}
                />
            </div>

            <a href="#" onClick={e => e.preventDefault()} className="text-sm text-primary hover:underline mt-1 inline-block">{t('resetToDefault')}</a>
        </div>
    );
};

const ImageAndColorTab = ({ productData, handleChange }) => {
    const { t } = useTranslations();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(productData.image || null);

    const colorOptions = [
      { name: 'Default', hex: '#808080' }, { name: 'Red', hex: '#ff4d4d' },
      { name: 'Orange', hex: '#ff9a4d' }, { name: 'Yellow', hex: '#ffd54d' },
      { name: 'Green', hex: '#4dff88' }, { name: 'Blue', hex: '#4d9aff' },
      { name: 'Indigo', hex: '#884dff' }, { name: 'Violet', hex: '#a64dff' },
      { name: 'Pink', hex: '#ff4da6' }, { name: 'Black', hex: '#000000' },
      { name: 'White', hex: '#ffffff' },
    ];
    
    const selectedColor = colorOptions.find(opt => opt.name.toLowerCase() === (productData.color || 'default')) || colorOptions[0];
    
    useEffect(() => {
        setImagePreview(productData.image || null);
    }, [productData.image]);

    const handleBrowseClick = () => {
        fileInputRef.current?.click();
    };
    
    const handleClearClick = () => {
        setImagePreview(null);
        handleChange({ target: { name: 'image', value: '' } });
        if(fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setImagePreview(base64String);
                handleChange({ target: { name: 'image', value: base64String } });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">{t('color')}</label>
                <div className="relative">
                    <span
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-sm border border-border"
                        style={{ backgroundColor: selectedColor.hex }}
                    />
                    <select
                        name="color"
                        value={productData.color || 'default'}
                        onChange={handleChange}
                        className="w-full bg-background border border-border rounded-md pl-10 pr-8 py-1.5 text-sm appearance-none focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                        {colorOptions.map(opt => (
                            <option key={opt.name} value={opt.name.toLowerCase()}>{opt.name}</option>
                        ))}
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
                </div>
            </div>
            
            <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">{t('image')}</label>
                <div className="flex items-center space-x-3">
                    <button type="button" onClick={handleBrowseClick} className="px-4 py-1.5 text-sm bg-border/50 hover:bg-border/80 rounded-md">{t('browse')}</button>
                    <button type="button" onClick={handleClearClick} className="px-4 py-1.5 text-sm bg-border/50 hover:bg-border/80 rounded-md">{t('clear')}</button>
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*"/>
                </div>
            </div>

            {imagePreview && (
                <div>
                    <img src={imagePreview} alt="Product preview" className="max-w-xs max-h-48 rounded-md border border-border"/>
                </div>
            )}
        </div>
    );
};

const CommentsTab = ({ productData, setProductData }) => {
    const { t } = useTranslations();
    const [newComment, setNewComment] = useState('');
    const [selectedCommentIndex, setSelectedCommentIndex] = useState<number | null>(null);

    const handleAdd = () => {
        if (newComment.trim() !== '') {
            const updatedComments = [...(productData.comments || []), newComment.trim()];
            setProductData(prev => ({...prev, comments: updatedComments}));
            setNewComment('');
        }
    };

    const handleDelete = () => {
        if (selectedCommentIndex !== null) {
            const updatedComments = (productData.comments || []).filter((_, i) => i !== selectedCommentIndex);
            setProductData(prev => ({...prev, comments: updatedComments}));
            setSelectedCommentIndex(null);
        }
    };

    return (
        <div className="space-y-4 h-full flex flex-col">
             <div className="bg-primary/20 border border-primary/50 text-primary-content p-3 rounded-lg flex items-start space-x-3">
                <Info size={20} className="flex-shrink-0 mt-0.5 text-primary" />
                <div>
                    <p className="text-sm text-text-primary">{t('commentsKitchenTicketInfo')}</p>
                    <a href="#" onClick={e => e.preventDefault()} className="text-sm text-primary font-semibold hover:underline">{t('learnMore')}</a>
                </div>
            </div>
            
            <div className="flex items-center space-x-2">
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder={t('enterComment')}
                    className="flex-1 bg-background border border-border rounded-md px-3 py-1.5 text-sm"
                />
                <button type="button" onClick={handleAdd} className="px-3 py-1.5 text-sm flex items-center space-x-2 bg-border/50 hover:bg-border/80 rounded-md">
                    <Plus size={16} /> <span>{t('add')}</span>
                </button>
                 <button type="button" onClick={handleDelete} disabled={selectedCommentIndex === null} className="px-3 py-1.5 text-sm flex items-center space-x-2 bg-border/50 hover:bg-border/80 rounded-md disabled:opacity-50 disabled:cursor-not-allowed">
                    <Trash2 size={16} /> <span>{t('delete')}</span>
                </button>
            </div>

            <div className="flex-1 border border-border rounded-lg bg-background overflow-y-auto">
                {(productData.comments && productData.comments.length > 0) ? (
                    <ul>
                        {productData.comments.map((comment, index) => (
                            <li
                                key={index}
                                onClick={() => setSelectedCommentIndex(index)}
                                className={`px-3 py-2 cursor-pointer text-sm border-b border-border/50 last:border-b-0 ${
                                    selectedCommentIndex === index ? 'bg-primary/30' : 'hover:bg-border/30'
                                }`}
                            >
                                {comment}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="flex items-center justify-center h-full text-text-secondary text-sm">
                        No comments added.
                    </div>
                )}
            </div>
        </div>
    );
};

// --- Main Modal Component ---
const ProductModal: React.FC = () => {
    const { editingProduct, closeProductModal, saveProduct, productGroups } = useProductStore();
    const { t } = useTranslations();
    const [activeTab, setActiveTab] = useState('details');
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    
    const [productData, setProductData] = useState<Omit<Product, 'groupName'>>({
        id: '', code: '', name: '', groupId: '', barcode: '', cost: 0, originalPrice: 0, salePriceExclTax: 0,
        taxes: 0, salePriceInclTax: 0, active: true, unit: 'pcs', createdDate: new Date().toISOString().split('T')[0],
        description: '', ageRestriction: undefined, isService: false, hasDefaultQuantity: false,
        priceIncludesTax: true, priceChangeAllowed: false,
        supplierId: '', reorderPoint: 0, preferredQuantity: 0, lowStockWarning: false, lowStockWarningQuantity: 0,
        color: 'default', image: '', comments: [],
    });

    useEffect(() => {
        const timer = setTimeout(() => setDrawerOpen(true), 10);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (editingProduct) {
            setProductData(editingProduct);
        } else {
             setProductData({
                id: `P${Date.now()}`, code: `MZR-B-${Math.floor(Math.random()*1000)}`, name: '', groupId: 'translation', barcode: '', cost: 0, originalPrice: 0, salePriceExclTax: 0,
                taxes: 0, salePriceInclTax: 0, active: true, unit: 'pcs', createdDate: new Date().toISOString().split('T')[0],
                description: '', ageRestriction: undefined, isService: false, hasDefaultQuantity: false,
                priceIncludesTax: true, priceChangeAllowed: false,
                supplierId: '', reorderPoint: 0, preferredQuantity: 0, lowStockWarning: false, lowStockWarningQuantity: 0,
                color: 'default', image: '', comments: [],
            });
        }
    }, [editingProduct]);

    const handleClose = () => {
        setDrawerOpen(false);
        setTimeout(() => {
            closeProductModal();
        }, 300); // Match transition duration
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (type === 'number') {
            setProductData(prev => ({ ...prev, [name]: value === '' ? undefined : parseFloat(value) }));
        } else {
            setProductData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleToggleChange = (field: keyof Omit<Product, 'groupName'>) => (checked: boolean) => {
        setProductData(prev => ({ ...prev, [field]: checked }));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        saveProduct(productData);
    };
    
    const renderGroupOptions = (groups: ProductGroup[], level = 0): React.ReactElement[] => {
        let options: React.ReactElement[] = [];
        const prefix = '\u00A0\u00A0'.repeat(level);
        for (const group of groups) {
            if (group.id !== 'all') {
                options.push(<option key={group.id} value={group.id}>{prefix}{group.name}</option>);
            }
            if (group.children && group.children.length > 0) {
                const nextLevel = group.id === 'all' ? level : level + 1;
                options = options.concat(renderGroupOptions(group.children, nextLevel));
            }
        }
        return options;
    };

    const tabs = [
        { id: 'details', label: t('details') },
        { id: 'priceAndTax', label: t('priceAndTax') },
        { id: 'stockControl', label: t('stockControl') },
        { id: 'comments', label: t('comments') },
        { id: 'imageAndColor', label: t('imageAndColor') },
    ];
    
    const title = editingProduct 
        ? t('editProductTitle').replace('{productName}', `"${editingProduct.name}"`) 
        : t('newProductTitle');

    return (
        <div 
            className={`fixed inset-0 bg-black/60 z-50 transition-opacity duration-300 ${isDrawerOpen ? 'opacity-100' : 'opacity-0'}`}
            onClick={handleClose}
        >
            <div 
                onClick={e => e.stopPropagation()}
                className={`bg-[#2D2D2D] w-full max-w-2xl h-full absolute top-0 right-0 border-l border-border shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
                    <div className="p-4 border-b border-border flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
                        <button type="button" onClick={handleClose} className="p-1 text-text-secondary hover:text-text-primary">
                            <X size={20} />
                        </button>
                    </div>
                    
                    <div className="border-b border-border px-4 flex space-x-1">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-3 py-2 text-sm font-semibold border-b-2 outline-none focus:outline-none transition-colors duration-200 ${
                                    activeTab === tab.id
                                        ? 'border-primary text-primary'
                                        : 'border-transparent text-text-secondary hover:text-text-primary'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                    
                    <div className="p-6 overflow-y-auto flex-1">
                        {activeTab === 'details' && <DetailsTab productData={productData} handleChange={handleChange} handleToggleChange={handleToggleChange} renderGroupOptions={renderGroupOptions(productGroups)} />}
                        {activeTab === 'priceAndTax' && <PriceAndTaxTab productData={productData} handleChange={handleChange} handleToggleChange={handleToggleChange} />}
                        {activeTab === 'stockControl' && <StockControlTab productData={productData} handleChange={handleChange} handleToggleChange={handleToggleChange} />}
                        {activeTab === 'comments' && <CommentsTab productData={productData} setProductData={setProductData} />}
                        {activeTab === 'imageAndColor' && <ImageAndColorTab productData={productData} handleChange={handleChange} />}
                    </div>

                    <div className="p-4 bg-background/50 flex justify-end space-x-3 border-t border-border">
                        <button type="submit" className="px-5 py-2 text-sm flex items-center space-x-2 bg-primary/80 hover:bg-primary text-white rounded font-semibold">
                            <Save size={16} />
                            <span>{t('save')}</span>
                        </button>
                        <button type="button" onClick={handleClose} className="px-5 py-2 text-sm flex items-center space-x-2 bg-border/50 hover:bg-border/80 text-text-primary rounded font-semibold">
                            <X size={16} />
                            <span>{t('cancel')}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductModal;