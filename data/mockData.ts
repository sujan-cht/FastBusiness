import { MonthlySale, HourlySale, TopProduct, TopCustomer, Document, DocumentItem, DocumentType, PaidStatus, DocumentMainType, ProductGroup, Product, StockItem, ReportCategory, Customer, User, PaymentType, CompanyData, Promotion, TaxRate, Country } from '../types';

export const monthlySalesData: MonthlySale[] = [
  { month: 'Jan', sales: 4000 },
  { month: 'Feb', sales: 3000 },
  { month: 'Mar', sales: 5000 },
  { month: 'Apr', sales: 4500 },
  { month: 'May', sales: 6000 },
  { month: 'Jun', sales: 5500 },
  { month: 'Jul', sales: 7000 },
  { month: 'Aug', sales: 6500 },
  { month: 'Sep', sales: 7500 },
  { month: 'Oct', sales: 8000 },
  { month: 'Nov', sales: 9000 },
  { month: 'Dec', sales: 8500 },
];

export const hourlySalesData: HourlySale[] = [
    { hour: '9am', sales: 120 },
    { hour: '10am', sales: 200 },
    { hour: '11am', sales: 250 },
    { hour: '12pm', sales: 300 },
    { hour: '1pm', sales: 400 },
    { hour: '2pm', sales: 350 },
    { hour: '3pm', sales: 320 },
    { hour: '4pm', sales: 450 },
    { hour: '5pm', sales: 500 },
    { hour: '6pm', sales: 600 },
    { hour: '7pm', sales: 550 },
    { hour: '8pm', sales: 450 },
];

export const topProductsData: TopProduct[] = [
  { id: 'P001', name: 'Smartphone X', group: 'Electronics', price: 800, sold: 150 },
  { id: 'P002', name: 'Organic Apples', group: 'Groceries', price: 3, sold: 5000 },
  { id: 'P003', name: 'T-Shirt', group: 'Clothing', price: 20, sold: 1200 },
  { id: 'P004', name: 'Coffee Maker', group: 'Home Goods', price: 100, sold: 300 },
  { id: 'P005', name: 'Laptop Pro', group: 'Electronics', price: 1200, sold: 100 },
];

export const topCustomersData: TopCustomer[] = [
    { name: 'Abdur Rahim', spent: 12500 },
    { name: 'Fatima Begum', spent: 11200 },
    { name: 'Kamal Hossain', spent: 9800 },
    { name: 'Salma Akhtar', spent: 8500 },
    { name: 'Jamal Uddin', spent: 7600 },
];

export const productGroupsData = [
  { name: 'Electronics', value: 240000 },
  { name: 'Groceries', value: 15000 },
  { name: 'Clothing', value: 24000 },
  { name: 'Home Goods', value: 30000 },
];

export const documentsData: Document[] = [
    { id: 1, number: 'INV-2026-001', external: 'EXT-001', documentType: DocumentType.Invoice, paid: PaidStatus.Paid, customer: 'Abdur Rahim', date: '5/1/2026', pos: 'Main POS', order: 'ORD-001', paymentType: 'Credit Card', user: 'Admin', discount: 10, total: 2000 },
    { id: 2, number: 'INV-2026-002', external: 'EXT-002', documentType: DocumentType.Invoice, paid: PaidStatus.Unpaid, customer: 'Fatima Begum', date: '6/1/2026', pos: 'Main POS', order: 'ORD-002', paymentType: 'Cash', user: 'Admin', discount: 0, total: 150 },
    { id: 3, number: 'QT-2026-001', external: '', documentType: DocumentType.Quote, paid: PaidStatus.Unpaid, customer: 'Kamal Hossain', date: '7/1/2026', pos: 'Web POS', order: '', paymentType: '', user: 'Sales', discount: 5, total: 3000 },
    { id: 4, number: 'CN-2026-001', external: 'INV-2026-001', documentType: DocumentType.CreditNote, paid: PaidStatus.Paid, customer: 'Abdur Rahim', date: '8/1/2026', pos: 'Main POS', order: 'ORD-001', paymentType: 'Refund', user: 'Admin', discount: 0, total: -50 },
    { id: 5, number: 'INV-2026-003', external: 'EXT-003', documentType: DocumentType.Invoice, paid: PaidStatus.Partial, customer: 'Salma Akhtar', date: '9/1/2026', pos: 'Main POS', order: 'ORD-003', paymentType: 'Split', user: 'Admin', discount: 20, total: 500 },
];

export const documentItemsData: { [key: number]: DocumentItem[] } = {
    1: [ { id: 101, documentId: 1, code: 'LP-PRO', name: 'Laptop Pro', unit: 'pcs', quantity: 1, priceBeforeTax: 1100, tax: 100, price: 1200, totalBeforeDiscount: 1200, discount: 10, total: 1190 }, { id: 102, documentId: 1, code: 'SM-X', name: 'Smartphone X', unit: 'pcs', quantity: 1, priceBeforeTax: 750, tax: 50, price: 800, totalBeforeDiscount: 800, discount: 0, total: 800 }, { id: 103, documentId: 1, code: 'CM-01', name: 'Coffee Maker', unit: 'pcs', quantity: 1, priceBeforeTax: 90, tax: 10, price: 100, totalBeforeDiscount: 100, discount: 0, total: 100 }, ],
    2: [ { id: 201, documentId: 2, code: 'ORG-APL', name: 'Organic Apples', unit: 'kg', quantity: 10, priceBeforeTax: 2.8, tax: 0.2, price: 3, totalBeforeDiscount: 30, discount: 0, total: 30 }, { id: 202, documentId: 2, code: 'TS-M', name: 'T-Shirt', unit: 'pcs', quantity: 6, priceBeforeTax: 18, tax: 2, price: 20, totalBeforeDiscount: 120, discount: 0, total: 120 }, ],
    3: [ { id: 301, documentId: 3, code: 'LP-PRO', name: 'Laptop Pro', unit: 'pcs', quantity: 2, priceBeforeTax: 1100, tax: 100, price: 1200, totalBeforeDiscount: 2400, discount: 5, total: 2395 }, { id: 302, documentId: 3, code: 'SM-X', name: 'Smartphone X', unit: 'pcs', quantity: 1, priceBeforeTax: 750, tax: 50, price: 800, totalBeforeDiscount: 800, discount: 0, total: 800 }, ],
    4: [ { id: 401, documentId: 4, code: 'CM-01', name: 'Coffee Maker', unit: 'pcs', quantity: -1, priceBeforeTax: -45, tax: -5, price: -50, totalBeforeDiscount: -50, discount: 0, total: -50 }, ],
    5: [ { id: 501, documentId: 5, code: 'TS-L', name: 'T-Shirt', unit: 'pcs', quantity: 26, priceBeforeTax: 18, tax: 2, price: 20, totalBeforeDiscount: 520, discount: 20, total: 500 }, ],
};

export const documentTypeData: DocumentMainType[] = [
    { name: 'docTypeExpenses', subTypes: [{ code: '100', name: 'docSubTypePurchase' }], },
    { name: 'sales', subTypes: [{ code: '120', name: 'docSubTypeStockReturn' }], },
    { name: 'docTypeInventory', subTypes: [], },
    { name: 'docTypeLoss', subTypes: [], },
]

// Data for Products & Stock Screens
const allProductGroups: ProductGroup[] = [
    { id: 'all', name: 'All products', parentId: null },
    { id: 'books', name: 'বই', parentId: 'all' },
    { id: 'translation', name: 'অনুবাদ', parentId: 'books' },
    { id: 'dictionary', name: 'অভিধান', parentId: 'books' },
    { id: 'economics', name: 'অর্থনীতি', parentId: 'books' },
    { id: 'history', name: 'ইতিহাস', parentId: 'books' },
    { id: 'poetry', name: 'কবিতা', parentId: 'books' },
    { id: 'electronics', name: 'Electronics', parentId: 'all' },
];

export const buildProductGroupTree = (): ProductGroup[] => {
    const map: { [key: string]: ProductGroup & { children: ProductGroup[] } } = {};
    const roots: ProductGroup[] = [];

    allProductGroups.forEach(group => {
        map[group.id] = { ...group, children: [] };
    });

    allProductGroups.forEach(group => {
        if (group.parentId && map[group.parentId]) {
            map[group.parentId].children.push(map[group.id]);
        } else {
            roots.push(map[group.id]);
        }
    });

    return roots;
};


export const productsData: Product[] = [
    { id: 'B001', code: 'MZR-B-143', name: 'অদ্ভুত লাইব্রেরি', groupId: 'translation', groupName: 'অনুবাদ', barcode: '9789849156963', cost: 120.00, originalPrice: 220.00, salePriceExclTax: 200.00, taxes: 10.00, salePriceInclTax: 210.00, active: true, unit: 'pcs', createdDate: '2023-01-15', updatedDate: '2023-03-20', description: '', ageRestriction: 0, isService: false, hasDefaultQuantity: true, priceIncludesTax: true, priceChangeAllowed: false, supplierId: 'S003', reorderPoint: 10, preferredQuantity: 20, lowStockWarning: true, lowStockWarningQuantity: 5, color: 'violet', image: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1482813959l/33644941.jpg', comments: [] },
    { id: 'B002', code: 'B002', name: 'এনিম্যাল ফার্ম', groupId: 'translation', groupName: 'অনুবাদ', barcode: '9789849156987', cost: 150.00, originalPrice: 280.00, salePriceExclTax: 250.00, taxes: 12.50, salePriceInclTax: 262.50, active: true, unit: 'pcs', createdDate: '2023-02-20', updatedDate: '2023-02-20', description: '', ageRestriction: 0, isService: false, hasDefaultQuantity: false, priceIncludesTax: true, priceChangeAllowed: false, supplierId: 'S001', reorderPoint: 5, preferredQuantity: 10, lowStockWarning: false, lowStockWarningQuantity: 0, color: 'default', comments: ['Special edition cover.', 'Handle with care.'] },
    { id: 'B003', code: 'B003', name: 'সংসদ বাংলা-ইংরেজি অভিধান', groupId: 'dictionary', groupName: 'অভিধান', barcode: '9788179552917', cost: 450.00, originalPrice: 650.00, salePriceExclTax: 600.00, taxes: 30.00, salePriceInclTax: 630.00, active: false, unit: 'pcs', createdDate: '2023-03-10', updatedDate: '2023-04-01', description: '', ageRestriction: 0, isService: false, hasDefaultQuantity: false, priceIncludesTax: true, priceChangeAllowed: false, supplierId: 'S001', reorderPoint: 2, preferredQuantity: 5, lowStockWarning: true, lowStockWarningQuantity: 1, comments: [] },
    { id: 'B004', code: 'B004', name: 'সঞ্চয়িতা', groupId: 'poetry', groupName: 'কবিতা', barcode: '9788179550197', cost: 250.00, originalPrice: 400.00, salePriceExclTax: 350.00, taxes: 15.00, salePriceInclTax: 365.00, active: true, unit: 'pcs', createdDate: '2023-04-01', updatedDate: '2023-04-01', description: '', ageRestriction: 0, isService: false, hasDefaultQuantity: false, priceIncludesTax: true, priceChangeAllowed: false, supplierId: 'S001', reorderPoint: 10, preferredQuantity: 25, lowStockWarning: true, lowStockWarningQuantity: 5, comments: [] },
    { id: 'B005', code: 'B005', name: 'অসমাপ্ত আত্মজীবনী', groupId: 'history', groupName: 'ইতিহাস', barcode: '9789848860105', cost: 300.00, originalPrice: 500.00, salePriceExclTax: 450.00, taxes: 20.00, salePriceInclTax: 470.00, active: true, unit: 'pcs', createdDate: '2023-05-12', updatedDate: '2023-05-12', description: '', ageRestriction: 0, isService: false, hasDefaultQuantity: false, priceIncludesTax: true, priceChangeAllowed: false, supplierId: 'S001', reorderPoint: 15, preferredQuantity: 30, lowStockWarning: false, lowStockWarningQuantity: 0, comments: [] },
    { id: 'B006', code: 'B006', name: 'অর্থনীতি পরিচয়', groupId: 'economics', groupName: 'অর্থনীতি', barcode: '9789844610115', cost: 180.00, originalPrice: 300.00, salePriceExclTax: 280.00, taxes: 14.00, salePriceInclTax: 294.00, active: true, unit: 'pcs', createdDate: '2023-06-18', updatedDate: '2023-06-25', description: '', ageRestriction: 0, isService: false, hasDefaultQuantity: false, priceIncludesTax: true, priceChangeAllowed: false, supplierId: 'S001', reorderPoint: 5, preferredQuantity: 15, lowStockWarning: true, lowStockWarningQuantity: 3, comments: [] },
    { id: 'E001', code: 'E001', name: 'Smartphone X', groupId: 'electronics', groupName: 'Electronics', barcode: '1234567890123', cost: 500.00, originalPrice: 850.00, salePriceExclTax: 750.00, taxes: 50.00, salePriceInclTax: 800.00, active: true, unit: 'pcs', createdDate: '2022-11-05', updatedDate: '2023-01-10', description: '', ageRestriction: 0, isService: false, hasDefaultQuantity: false, priceIncludesTax: true, priceChangeAllowed: false, supplierId: 'S002', reorderPoint: 20, preferredQuantity: 50, lowStockWarning: true, lowStockWarningQuantity: 10, color: 'blue', comments: [] },
    { id: 'E002', code: 'E002', name: 'Laptop Pro', groupId: 'electronics', groupName: 'Electronics', barcode: '2345678901234', cost: 900.00, originalPrice: 1200.00, salePriceExclTax: 1100.00, taxes: 100.00, salePriceInclTax: 1200.00, active: true, unit: 'pcs', createdDate: '2022-10-15', updatedDate: '2022-10-15', description: '', ageRestriction: 0, isService: false, hasDefaultQuantity: false, priceIncludesTax: true, priceChangeAllowed: false, supplierId: 'S002', reorderPoint: 10, preferredQuantity: 20, lowStockWarning: true, lowStockWarningQuantity: 5, color: 'red', comments: [] },
];

export const stockItemsData: StockItem[] = productsData.map(product => {
    let quantity = 0;
    if (product.id === 'B003') quantity = 0;
    else if (product.id === 'E002') quantity = -2;
    else quantity = Math.floor(Math.random() * 100) + 5;
    
    return { ...product, quantity };
});


// Data for Reporting Screen
export const reportsData: ReportCategory[] = [
    {
        nameKey: 'sales',
        reports: [
            { id: 'r1', nameKey: 'reportProducts' },
            { id: 'r2', nameKey: 'reportProductGroups' },
            { id: 'r3', nameKey: 'reportCustomers' },
            { id: 'r4', nameKey: 'reportTaxRates' },
            { id: 'r5', nameKey: 'reportUsers' },
            { id: 'r6', nameKey: 'reportItemList' },
            { id: 'r7', nameKey: 'reportPaymentTypes' },
            { id: 'r8', nameKey: 'reportRefunds' },
            { id: 'r9', nameKey: 'reportInvoiceList' },
            { id: 'r10', nameKey: 'reportDailySales' },
            { id: 'r11', nameKey: 'reportHourlySales' },
            { id: 'r12', nameKey: 'reportProfitMargin' },
        ]
    }
];

// Data for Customers Screen
export const customersData: Customer[] = [
    { id: 'C001', code: '1001', name: 'করিম ট্রেডার্স', taxNumber: '123456789', address: 'ধানমন্ডি, ঢাকা', phone: '01712345678', active: true, isCustomer: true },
    { id: 'C002', code: '1002', name: 'রহিম এন্টারপ্রাইজ', taxNumber: '987654321', address: 'গুলশান, ঢাকা', phone: '01812345679', active: true, isCustomer: true },
    { id: 'S001', code: '2001', name: 'বুকস সাপ্লায়ার বিডি', taxNumber: '555444333', address: 'বাংলাবাজার, ঢাকা', phone: '01912345680', active: true, isCustomer: false },
    { id: 'C003', code: '1003', name: 'সালমা ফ্যাশনস', taxNumber: '', address: 'উত্তরা, ঢাকা', phone: '01612345681', active: false, isCustomer: true },
    { id: 'S002', code: '2002', name: 'ইলেকট্রনিক্স সোর্স', taxNumber: '111222333', address: 'মিরপুর, ঢাকা', phone: '01512345682', active: true, isCustomer: false },
    { id: 'C004', code: '1004', name: 'জামাল স্টোর', taxNumber: '444555666', address: 'মোহাম্মদপুর, ঢাকা', phone: '01312345683', active: true, isCustomer: true },
    { id: 'S003', code: '2003', name: 'নটিলাস', taxNumber: '777888999', address: 'ঢাকা', phone: '01911111111', active: true, isCustomer: false },
];

// Data for Users & Security Screen
export const usersData: User[] = [
    { id: 'U001', firstName: 'Mazara', lastName: 'CHT', email: 'mazara.cht@gmail.com', accessLevel: 99, active: true },
    { id: 'U002', firstName: 'Sujan', lastName: 'Chakma', email: 'sujansakma.cht@gmail.com', accessLevel: 10, active: true },
    { id: 'U003', firstName: 'Toshita', lastName: 'Chakma', email: 'toshita.c@gmail.com', accessLevel: 10, active: false },
];

// Data for Payment Types Screen
export const paymentTypesData: PaymentType[] = [
    { id: 'PT01', name: 'bKash', position: 1, code: '', enabled: true, quickPayment: true, customerRequired: true, changeAllowed: true, markAsPaid: true, printReceipt: true, shortcutKey: 'B' },
    { id: 'PT02', name: 'Due', position: 1, code: '', enabled: true, quickPayment: false, customerRequired: true, changeAllowed: true, markAsPaid: false, printReceipt: true, shortcutKey: '' },
    { id: 'PT03', name: 'Advance', position: 1, code: '', enabled: true, quickPayment: false, customerRequired: true, changeAllowed: true, markAsPaid: true, printReceipt: true, shortcutKey: '' },
    { id: 'PT04', name: 'Nagad', position: 2, code: '', enabled: true, quickPayment: true, customerRequired: false, changeAllowed: true, markAsPaid: true, printReceipt: true, shortcutKey: 'N' },
    { id: 'PT05', name: 'Cash', position: 3, code: '', enabled: true, quickPayment: true, customerRequired: false, changeAllowed: true, markAsPaid: true, printReceipt: true, shortcutKey: '' },
    { id: 'PT06', name: 'Card', position: 4, code: '', enabled: true, quickPayment: true, customerRequired: false, changeAllowed: false, markAsPaid: true, printReceipt: true, shortcutKey: '' },
    { id: 'PT07', name: 'Check', position: 5, code: '', enabled: true, quickPayment: false, customerRequired: false, changeAllowed: false, markAsPaid: true, printReceipt: true, shortcutKey: '' },
];

// Data for My Company Screen
export const companyData: CompanyData = {
    name: 'Mazara CHT',
    taxNumber: '',
    streetName: 'TTC Road, Rangamati Sadar, Rangamati',
    buildingNumber: '',
    additionalStreetName: '',
    plotIdentification: '',
    district: '',
    postalCode: '৪৫০০',
    city: 'Rangamati',
    stateProvince: 'Chattagram',
    country: 'Bangladesh',
    phoneNumber: '০১৮১৯১৯১৮১৬',
    email: 'mazaracht.shop@gmail.com',
    bankAccountNumber: '',
    bankDetails: '',
    logo: '',
    databasePath: 'C:\\FastBusiness\\Data\\database.fdb',
};

// Data for Promotions Screen
export const promotionsData: Promotion[] = [
    { id: 'PROMO01', name: 'Eid Discount', type: 'Discount', value: 15, active: true, startDate: '2026-06-01', endDate: '2026-06-15' },
    { id: 'PROMO02', name: 'Boishakhi BOGO', type: 'BOGO', value: 1, active: true, startDate: '2026-04-01', endDate: '2026-04-14' },
    { id: 'PROMO03', name: 'Winter Sale', type: 'Discount', value: 20, active: false, startDate: '2025-12-15', endDate: '2026-01-15' },
];

// Data for Tax Rates Screen
export const taxRatesData: TaxRate[] = [
    { id: 'TAX01', name: 'Standard VAT', rate: 15.0, isDefault: true },
    { id: 'TAX02', name: 'Reduced Rate', rate: 5.0, isDefault: false },
    { id: 'TAX03', name: 'Zero Rate', rate: 0.0, isDefault: false },
];

// Data for Countries Screen
export const countriesData: Country[] = [
    { id: 'CTRY01', name: 'Bangladesh', code: 'BD', currency: 'BDT' },
    { id: 'CTRY02', name: 'United States', code: 'US', currency: 'USD' },
    { id: 'CTRY03', name: 'United Kingdom', code: 'GB', currency: 'GBP' },
];