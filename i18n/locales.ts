import { Screen } from '../types';

type Translations = {
  [key in Screen]: string;
} & {
  search: string;
  totalSales: string;
  newCustomers: string;
  topMonth: string;
  thisMonth: string;
  monthlySales: string;
  topSellingProducts: string;
  product: string;
  group: string;
  price: string;
  sold: string;
  revenue: string;
  hourlySales: string;
  productGroups: string;
  productGroup: string;
  topCustomers: string;
  sales: string;
  spent: string;
  documentsDescription: string;
  productsDescription: string;
  stockDescription: string;
  reportingDescription: string;
  customersDescription: string;
  promotionsDescription: string;
  securityDescription: string;
  paymentTypesDescription: string;
  countriesDescription: string;
  taxRatesDescription: string;
  companyDescription: string;
  // Documents Screen
  add: string;
  print: string;
  printPreview: string;
  saveAsPdf: string;
  edit: string;
  delete: string;
  customer: string;
  user: string;
  documentType: string;
  cashRegister: string;
  paidStatus: string;
  documentNumber: string;
  externalDocument: string;
  period: string;
  clear: string;
  // Documents Table
  docId: string;
  docNumber: string;
  docExternal: string;
  docType: string;
  docPaid: string;
  docCustomer: string;
  docDate: string;
  docPos: string;
  docOrder: string;
  docPaymentType: string;
  docUser: string;
  docDiscount: string;
  docTotal: string;
  // Document Items Table
  itemCode: string;
  itemName: string;
  itemUnit: string;
  itemQty: string;
  itemPriceBeforeTax: string;
  itemTax: string;
  itemPrice: string;
  itemTotalBeforeDiscount: string;
  itemDiscount: string;
  itemTotal: string;
  selectDocumentPrompt: string;
  // Add Document Modal
  selectDocumentType: string;
  ok: string;
  cancel: string;
  docTypeExpenses: string;
  docTypeInventory: string;
  docTypeLoss: string;
  docSubTypePurchase: string;
  docSubTypeStockReturn: string;
  // Products Screen
  refresh: string;
  newGroup: string;
  editGroup: string;
  deleteGroup: string;
  newProduct: string;
  editProduct: string;
  deleteProduct: string;
  priceTags: string;
  sorting: string;
  movAvgPrice: string;
  import: string;
  export: string;
  help: string;
  layout: string;
  productsCount: string;
  searchProducts: string;
  // Products Table
  prodCode: string;
  prodName: string;
  prodGroup: string;
  prodBarcode: string;
  prodCost: string;
  prodOriginalPrice: string;
  prodSalePriceExclTax: string;
  prodTaxes: string;
  prodSalePriceInclTax: string;
  prodActive: string;
  prodUnit: string;
  prodCreatedDate: string;
  prodUpdatedDate: string;
  // Product Modal
  editProductTitle: string;
  newProductTitle: string;
  details: string;
  priceAndTax: string;
  stockControl: string;
  comments: string;
  imageAndColor: string;
  generateBarcode: string;
  unitOfMeasurement: string;
  defaultQuantity: string;
  service: string;
  ageRestriction: string;
  years: string;
  description: string;
  addTaxToProduct: string;
  maximumRetailPrice: string;
  markup: string;
  salePrice: string;
  priceIncludesTax: string;
  priceChangeAllowed: string;
  supplier: string;
  reorderPoint: string;
  preferredQuantity: string;
  lowStockWarning: string;
  lowStockWarningQuantity: string;
  resetToDefault: string;
  stockControlInfo: string;
  learnMore: string;
  color: string;
  image: string;
  commentsKitchenTicketInfo: string;
  enterComment: string;
  // Stock Screen
  stockHistory: string;
  excel: string;
  inventoryCountReport: string;
  quickInventory: string;
  negativeQuantity: string;
  nonZeroQuantity: string;
  zeroQuantity: string;
  searchByProductOrCode: string;
  // Stock Table
  stockCode: string;
  stockName: string;
  stockQty: string;
  stockUnit: string;
  stockCostPrice: string;
  stockCost: string;
  stockCostInclTax: string;
  stockValue: string;
  stockValueInclTax: string;
  // Stock Summary
  costPrice: string;
  // salePrice: string; // Already defined in product modal
  totalCost: string;
  totalCostInclTax: string;
  totalValue: string;
  totalValueInclTax: string;
  // Reporting Screen
  searchReports: string;
  reportProducts: string;
  reportProductGroups: string;
  reportCustomers: string;
  reportTaxRates: string;
  reportUsers: string;
  reportItemList: string;
  reportPaymentTypes: string;
  reportRefunds: string;
  reportInvoiceList: string;
  reportDailySales: string;
  reportHourlySales: string;
  reportProfitMargin: string;
  customersAndSuppliers: string;
  includeSubgroups: string;
  dateRange: string;
  showReport: string;
  selectReportPrompt: string;
  // Customers & Suppliers Screen
  searchCustomers: string;
  searchByName: string;
  searchByCode: string;
  searchByPhone: string;
  searchByTaxNumber: string;
  // Customers Table
  custCode: string;
  custName: string;
  custTaxNum: string;
  custAddress: string;
  custPhone: string;
  custActive: string;
  isCustomer: string;
  // Users & Security Screen
  addUser: string;
  resetPassword: string;
  showInactiveUsers: string;
  security: string;
  users: string;
  addUserModalTitle: string;
  editUserModalTitle: string;
  // Users Table
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  userAccessLevel: string;
  userActive: string;
  // Payment Types Screen
  newPaymentType: string;
  editPaymentType: string;
  // Payment Types Table
  payTypeName: string;
  payTypePosition: string;
  payTypeCode: string;
  payTypeEnabled: string;
  payTypeQuickPayment: string;
  payTypeCustomerRequired: string;
  payTypeChangeAllowed: string;
  payTypeMarkAsPaid: string;
  payTypePrintReceipt: string;
  payTypeShortcutKey: string;
  // My Company Screen
  save: string;
  companyData: string;
  voidReasons: string;
  resetDatabase: string;
  myCompanyData: string;
  companyName: string;
  taxNumber: string;
  streetName: string;
  buildingNumber: string;
  additionalStreetName: string;
  plotIdentification: string;
  district: string;
  postalCode: string;
  city: string;
  stateProvince: string;
  country: string;
  phoneNumber: string;
  email: string;
  bankAccount: string;
  bankAccNumber: string;
  bankDetails: string;
  logo: string;
  databasePath: string;
  browse: string;
  // Sales Screen
  management: string;
  noItems: string;
  subtotal: string;
  tax: string;
  charge: string;
  total: string;
  searchOrScan: string;
  // Promotions Screen
  promoName: string;
  promoType: string;
  promoValue: string;
  promoActive: string;
  promoStartDate: string;
  promoEndDate: string;
  // Tax Rates Screen
  taxRateName: string;
  taxRate: string;
  taxRateDefault: string;
  // Countries Screen
  countryName: string;
  countryCode: string;
  countryCurrency: string;
};

export const translations: { en: Translations; bn: Translations } = {
  en: {
    [Screen.Dashboard]: 'Dashboard',
    [Screen.Documents]: 'Documents',
    [Screen.Products]: 'Products',
    [Screen.Stock]: 'Stock',
    [Screen.Reporting]: 'Reporting',
    [Screen.CustomersAndSuppliers]: 'Customers & Suppliers',
    [Screen.Promotions]: 'Promotions',
    [Screen.UsersAndSecurity]: 'Users & Security',
    [Screen.PaymentTypes]: 'Payment Types',
    [Screen.Countries]: 'Countries',
    [Screen.TaxRates]: 'Tax Rates',
    [Screen.MyCompany]: 'My Company',
    [Screen.BackToSales]: 'Back to Sales',
    search: 'Search...',
    totalSales: 'Total Sales',
    newCustomers: 'New Customers',
    topMonth: 'Top Month',
    thisMonth: 'this month',
    monthlySales: 'Monthly Sales (2026)',
    topSellingProducts: 'Top Selling Products',
    product: 'Product',
    group: 'Group',
    price: 'Price',
    sold: 'Sold',
    revenue: 'Revenue',
    hourlySales: 'Hourly Sales',
    productGroups: 'Product Groups',
    productGroup: 'Product Group',
    topCustomers: 'Top Customers',
    sales: 'Sales',
    spent: 'Spent',
    documentsDescription: 'Search, manage, and review all business documents like invoices, quotes, and credit notes.',
    productsDescription: 'Add, edit, and manage your product listings.',
    stockDescription: 'Track inventory levels, manage stock transfers, and view stock history.',
    reportingDescription: 'Generate and view detailed sales and inventory reports.',
    customersDescription: 'Manage customer profiles, purchase history, and supplier information.',
    promotionsDescription: 'Create and manage discounts, special offers, and loyalty programs.',
    securityDescription: 'Manage user accounts, roles, and access permissions.',
    paymentTypesDescription: 'Configure accepted payment methods (e.g., Cash, Credit Card, Mobile Banking).',
    countriesDescription: 'Manage country-specific settings, currencies, and formats.',
    taxRatesDescription: 'Configure multiple tax rates and rules for products and services.',
    companyDescription: "Manage your company's details, branding, and receipt information.",
    add: 'Add',
    print: 'Print',
    printPreview: 'Print Preview',
    saveAsPdf: 'Save as PDF',
    edit: 'Edit',
    delete: 'Delete',
    customer: 'Customer',
    user: 'User',
    documentType: 'Document Type',
    cashRegister: 'Cash Register',
    paidStatus: 'Paid Status',
    documentNumber: 'Document Number',
    externalDocument: 'External Document',
    period: 'Period',
    clear: 'Clear',
    docId: 'ID',
    docNumber: 'Number',
    docExternal: 'External',
    docType: 'Type',
    docPaid: 'Paid',
    docCustomer: 'Customer',
    docDate: 'Date',
    docPos: 'POS',
    docOrder: 'Order',
    docPaymentType: 'Payment Type',
    docUser: 'User',
    docDiscount: 'Discount',
    docTotal: 'Total',
    itemCode: 'Code',
    itemName: 'Name',
    itemUnit: 'Unit',
    itemQty: 'Quantity',
    itemPriceBeforeTax: 'Price Before Tax',
    itemTax: 'Tax',
    itemPrice: 'Price',
    itemTotalBeforeDiscount: 'Total Before Discount',
    itemDiscount: 'Discount',
    itemTotal: 'Total',
    selectDocumentPrompt: 'Select a document to see its items.',
    selectDocumentType: 'Select document type',
    ok: 'OK',
    cancel: 'Cancel',
    docTypeExpenses: 'Expenses',
    docTypeInventory: 'Inventory',
    docTypeLoss: 'Loss',
    docSubTypePurchase: 'Purchase',
    docSubTypeStockReturn: 'Stock return',
    refresh: 'Refresh',
    newGroup: 'New group',
    editGroup: 'Edit group',
    deleteGroup: 'Delete group',
    newProduct: 'New product',
    editProduct: 'Edit product',
    deleteProduct: 'Delete product',
    priceTags: 'Price tags',
    sorting: 'Sorting',
    movAvgPrice: 'Mov. avg. price',
    import: 'Import',
    export: 'Export',
    help: 'Help',
    layout: 'Layout',
    productsCount: 'Products count',
    searchProducts: 'Search products',
    prodCode: 'Code',
    prodName: 'Name',
    prodGroup: 'Group',
    prodBarcode: 'Barcode',
    prodCost: 'Cost',
    prodOriginalPrice: 'Original Price (MRP)',
    prodSalePriceExclTax: 'Sale price (excl. tax)',
    prodTaxes: 'Taxes',
    prodSalePriceInclTax: 'Sale price (incl. tax)',
    prodActive: 'Active',
    prodUnit: 'Unit of measure',
    prodCreatedDate: 'Created date',
    prodUpdatedDate: 'Updated date',
    editProductTitle: 'Edit product "{productName}"',
    newProductTitle: 'New product',
    details: 'Details',
    priceAndTax: 'Price & tax',
    stockControl: 'Stock control',
    comments: 'Comments',
    imageAndColor: 'Image & color',
    generateBarcode: 'Generate barcode',
    unitOfMeasurement: 'Unit of measurement',
    defaultQuantity: 'Default quantity',
    service: 'Service (not using stock)',
    ageRestriction: 'Age restriction',
    years: 'year(s)',
    description: 'Description',
    addTaxToProduct: 'Add tax to product',
    maximumRetailPrice: 'Maximum retail price (MRP)',
    markup: 'Markup',
    salePrice: 'Sale price',
    priceIncludesTax: 'Price includes tax',
    priceChangeAllowed: 'Price change allowed',
    supplier: 'Supplier',
    reorderPoint: 'Reorder point',
    preferredQuantity: 'Preferred quantity',
    lowStockWarning: 'Low stock warning',
    lowStockWarningQuantity: 'Low stock warning quantity',
    resetToDefault: 'Reset to default',
    stockControlInfo: 'Set low stock quantity rules that can be used as a stock reorder point.',
    learnMore: 'Learn more',
    color: 'Color',
    image: 'Image',
    commentsKitchenTicketInfo: 'Comments will be printed on kitchen tickets.',
    enterComment: 'Enter comment...',
    stockHistory: 'Stock history',
    excel: 'Excel',
    inventoryCountReport: 'Inventory count report',
    quickInventory: 'Quick inventory',
    negativeQuantity: 'Negative quantity',
    nonZeroQuantity: 'Non zero quantity',
    zeroQuantity: 'Zero quantity',
    searchByProductOrCode: 'Search by product or code',
    stockCode: 'Code',
    stockName: 'Name',
    stockQty: 'Quantity',
    stockUnit: 'Unit',
    stockCostPrice: 'Cost price',
    stockCost: 'Cost',
    stockCostInclTax: 'Cost incl. tax',
    stockValue: 'Value',
    stockValueInclTax: 'Value incl. tax',
    costPrice: 'Cost price',
    // salePrice: 'Sale price', // Defined
    totalCost: 'Total cost',
    totalCostInclTax: 'Total cost inc. tax',
    totalValue: 'Total',
    totalValueInclTax: 'Total inc. tax',
    searchReports: 'Search reports',
    reportProducts: 'Products',
    reportProductGroups: 'Product groups',
    reportCustomers: 'Customers',
    reportTaxRates: 'Tax rates',
    reportUsers: 'Users',
    reportItemList: 'Item list',
    reportPaymentTypes: 'Payment types',
    reportRefunds: 'Refunds',
    reportInvoiceList: 'Invoice list',
    reportDailySales: 'Daily sales',
    reportHourlySales: 'Hourly sales',
    reportProfitMargin: 'Profit & margin',
    customersAndSuppliers: 'Customers & suppliers',
    includeSubgroups: 'Include subgroups',
    dateRange: 'Date range',
    showReport: 'Show report',
    selectReportPrompt: 'Select a report to see its available filters.',
    searchCustomers: 'Search customers...',
    searchByName: 'Name',
    searchByCode: 'Code',
    searchByPhone: 'Phone',
    searchByTaxNumber: 'Tax number',
    custCode: 'Code',
    custName: 'Name',
    custTaxNum: 'Tax number',
    custAddress: 'Address',
    custPhone: 'Phone',
    custActive: 'Active',
    isCustomer: 'Customer',
    addUser: 'Add user',
    resetPassword: 'Reset password',
    showInactiveUsers: 'Show inactive users',
    security: 'Security',
    users: 'Users',
    addUserModalTitle: 'Add new user',
    editUserModalTitle: 'Edit user',
    userFirstName: 'First name',
    userLastName: 'Last name',
    userEmail: 'Email',
    userAccessLevel: 'Access level',
    userActive: 'Active',
    newPaymentType: 'New payment type',
    editPaymentType: 'Edit payment type',
    payTypeName: 'Name',
    payTypePosition: 'Position',
    payTypeCode: 'Code',
    payTypeEnabled: 'Enabled',
    payTypeQuickPayment: 'Quick payment',
    payTypeCustomerRequired: 'Customer required',
    payTypeChangeAllowed: 'Change allowed',
    payTypeMarkAsPaid: 'Mark transaction as paid',
    payTypePrintReceipt: 'Print receipt',
    payTypeShortcutKey: 'Shortcut key',
    save: 'Save',
    companyData: 'Company data',
    voidReasons: 'Void reasons',
    resetDatabase: 'Reset database',
    myCompanyData: 'My company data',
    companyName: 'Name',
    taxNumber: 'Tax number',
    streetName: 'Street name',
    buildingNumber: 'Building number',
    additionalStreetName: 'Additional street name',
    plotIdentification: 'Plot identification',
    district: 'District',
    postalCode: 'Postal code',
    city: 'City',
    stateProvince: 'State / Province',
    country: 'Country',
    phoneNumber: 'Phone number',
    email: 'Email',
    bankAccount: 'Bank account',
    bankAccNumber: 'Bank acc. number',
    bankDetails: 'Bank details',
    logo: 'Logo',
    databasePath: 'Database path',
    browse: 'Browse',
    management: 'Management',
    noItems: 'No items',
    subtotal: 'Subtotal',
    tax: 'Tax',
    charge: 'Charge',
    total: 'Total',
    searchOrScan: 'Search product or scan barcode',
    promoName: 'Name',
    promoType: 'Type',
    promoValue: 'Value',
    promoActive: 'Active',
    promoStartDate: 'Start date',
    promoEndDate: 'End date',
    taxRateName: 'Name',
    taxRate: 'Rate (%)',
    taxRateDefault: 'Default',
    countryName: 'Name',
    countryCode: 'Code',
    countryCurrency: 'Currency',
  },
  bn: {
    [Screen.Dashboard]: 'ড্যাশবোর্ড',
    [Screen.Documents]: 'নথিপত্র',
    [Screen.Products]: 'পণ্য',
    [Screen.Stock]: 'স্টক',
    [Screen.Reporting]: 'রিপোর্টিং',
    [Screen.CustomersAndSuppliers]: 'গ্রাহক ও সরবরাহকারী',
    [Screen.Promotions]: 'প্রচারণা',
    [Screen.UsersAndSecurity]: 'ব্যবহারকারী ও নিরাপত্তা',
    [Screen.PaymentTypes]: 'পেমেন্টের ধরন',
    [Screen.Countries]: 'দেশ',
    [Screen.TaxRates]: 'ট্যাক্স রেট',
    [Screen.MyCompany]: 'আমার কোম্পানি',
    [Screen.BackToSales]: 'বিক্রয় স্ক্রিনে ফিরুন',
    search: 'অনুসন্ধান...',
    totalSales: 'মোট বিক্রয়',
    newCustomers: 'নতুন গ্রাহক',
    topMonth: 'শীর্ষ মাস',
    thisMonth: 'এই মাসে',
    monthlySales: 'মাসিক বিক্রয় (২০২৬)',
    topSellingProducts: 'সেরা বিক্রিত পণ্য',
    product: 'পণ্য',
    group: 'গ্রুপ',
    price: 'মূল্য',
    sold: 'বিক্রি',
    revenue: 'রাজস্ব',
    hourlySales: 'ঘণ্টাভিত্তিক বিক্রয়',
    productGroups: 'পণ্য গ্রুপ',
    productGroup: 'পণ্য গ্রুপ',
    topCustomers: 'সেরা গ্রাহক',
    sales: 'বিক্রয়',
    spent: 'ব্যয়',
    documentsDescription: 'চালান, উদ্ধৃতি এবং ক্রেডিট নোটের মতো সমস্ত ব্যবসায়িক নথি খুঁজুন, পরিচালনা করুন এবং পর্যালোচনা করুন।',
    productsDescription: 'আপনার পণ্যের তালিকা যোগ, সম্পাদনা এবং পরিচালনা করুন।',
    stockDescription: 'ইনভেন্টরি লেভেল ট্র্যাক করুন, স্টক স্থানান্তর পরিচালনা করুন এবং স্টকের ইতিহাস দেখুন।',
    reportingDescription: 'বিস্তারিত বিক্রয় এবং ইনভেন্টরি রিপোর্ট তৈরি এবং দেখুন।',
    customersDescription: 'গ্রাহক প্রোফাইল, ক্রয়ের ইতিহাস এবং সরবরাহকারীর তথ্য পরিচালনা করুন।',
    promotionsDescription: 'ডিসকাউন্ট, বিশেষ অফার এবং লয়ালটি প্রোগ্রাম তৈরি ও পরিচালনা করুন।',
    securityDescription: 'ব্যবহারকারী অ্যাকাউন্ট, ভূমিকা এবং অ্যাক্সেস অনুমতি পরিচালনা করুন।',
    paymentTypesDescription: 'গৃহীত অর্থপ্রদানের পদ্ধতি কনফিগার করুন (যেমন, নগদ, ক্রেডিট কার্ড, মোবাইল ব্যাংকিং)।',
    countriesDescription: 'দেশ-নির্দিষ্ট সেটিংস, মুদ্রা এবং ফরম্যাট পরিচালনা করুন।',
    taxRatesDescription: 'পণ্য এবং পরিষেবাগুলির জন্য একাধিক ট্যাক্স হার এবং নিয়ম কনফিগার করুন।',
    companyDescription: 'আপনার কোম্পানির বিবরণ, ব্র্যান্ডিং এবং রসিদের তথ্য পরিচালনা করুন।',
    add: 'যোগ করুন',
    print: 'প্রিন্ট',
    printPreview: 'প্রিভিউ',
    saveAsPdf: 'পিডিএফ সংরক্ষণ',
    edit: 'সম্পাদনা',
    delete: 'মুছুন',
    customer: 'গ্রাহক',
    user: 'ব্যবহারকারী',
    documentType: 'নথির ধরন',
    cashRegister: 'ক্যাশ রেজিস্টার',
    paidStatus: 'পরিশোধ অবস্থা',
    documentNumber: 'নথি নম্বর',
    externalDocument: 'বহিরাগত নথি',
    period: 'সময়কাল',
    clear: 'পরিষ্কার',
    docId: 'আইডি',
    docNumber: 'নম্বর',
    docExternal: 'বহিরাগত',
    docType: 'ধরন',
    docPaid: 'পরিশোধিত',
    docCustomer: 'গ্রাহক',
    docDate: 'তারিখ',
    docPos: 'পিওএস',
    docOrder: 'অর্ডার',
    docPaymentType: 'পেমেন্ট ধরন',
    docUser: 'ব্যবহারকারী',
    docDiscount: 'ডিসকাউন্ট',
    docTotal: 'মোট',
    itemCode: 'কোড',
    itemName: 'নাম',
    itemUnit: 'একক',
    itemQty: 'পরিমাণ',
    itemPriceBeforeTax: 'ট্যাক্স ছাড়া মূল্য',
    itemTax: 'ট্যাক্স',
    itemPrice: 'মূল্য',
    itemTotalBeforeDiscount: 'ডিসকাউন্ট ছাড়া মোট',
    itemDiscount: 'ডিসকাউন্ট',
    itemTotal: 'মোট',
    selectDocumentPrompt: 'আইটেম দেখতে একটি নথি নির্বাচন করুন।',
    selectDocumentType: 'নথির ধরন নির্বাচন করুন',
    ok: 'ঠিক আছে',
    cancel: 'বাতিল',
    docTypeExpenses: 'খরচ',
    docTypeInventory: 'ইনভেন্টরি',
    docTypeLoss: 'ক্ষতি',
    docSubTypePurchase: 'ক্রয়',
    docSubTypeStockReturn: 'স্টক ফেরত',
    refresh: 'রিফ্রেশ',
    newGroup: 'নতুন গ্রুপ',
    editGroup: 'গ্রুপ সম্পাদনা',
    deleteGroup: 'গ্রুপ মুছুন',
    newProduct: 'নতুন পণ্য',
    editProduct: 'পণ্য সম্পাদনা',
    deleteProduct: 'পণ্য মুছুন',
    priceTags: 'মূল্য ট্যাগ',
    sorting: 'সাজানো',
    movAvgPrice: 'চলমান গড় মূল্য',
    import: 'ইম্পোর্ট',
    export: 'এক্সপোর্ট',
    help: 'সাহায্য',
    layout: 'বিন্যাস',
    productsCount: 'পণ্যের সংখ্যা',
    searchProducts: 'পণ্য খুঁজুন',
    prodCode: 'কোড',
    prodName: 'নাম',
    prodGroup: 'গ্রুপ',
    prodBarcode: 'বারকোড',
    prodCost: 'ক্রয়মূল্য',
    prodOriginalPrice: 'MRP',
    prodSalePriceExclTax: 'বিক্রয় মূল্য (ট্যাক্স ছাড়া)',
    prodTaxes: 'ট্যাক্স',
    prodSalePriceInclTax: 'বিক্রয়মূল্য',
    prodActive: 'সক্রিয়',
    prodUnit: 'একক',
    prodCreatedDate: 'তৈরি',
    prodUpdatedDate: 'আপডেট',
    editProductTitle: 'পণ্য সম্পাদনা "{productName}"',
    newProductTitle: 'নতুন পণ্য',
    details: 'বিস্তারিত',
    priceAndTax: 'মূল্য ও ট্যাক্স',
    stockControl: 'স্টক নিয়ন্ত্রণ',
    comments: 'মন্তব্য',
    imageAndColor: 'ছবি ও রঙ',
    generateBarcode: 'বারকোড তৈরি করুন',
    unitOfMeasurement: 'পরিমাপের একক',
    defaultQuantity: 'ডিফল্ট পরিমাণ',
    service: 'পরিষেবা (স্টক ব্যবহার করে না)',
    ageRestriction: 'বয়স সীমাবদ্ধতা',
    years: 'বছর',
    description: 'বিবরণ',
    addTaxToProduct: 'পণ্যে ট্যাক্স যোগ করুন',
    maximumRetailPrice: 'সর্বোচ্চ খুচরা মূল্য (MRP)',
    markup: 'মার্কআপ',
    salePrice: 'বিক্রয় মূল্য',
    priceIncludesTax: 'মূল্যে ট্যাক্স অন্তর্ভুক্ত',
    priceChangeAllowed: 'মূল্য পরিবর্তনের অনুমতি আছে',
    supplier: 'সরবরাহকারী',
    reorderPoint: 'পুনঃঅর্ডার পয়েন্ট',
    preferredQuantity: 'পছন্দের পরিমাণ',
    lowStockWarning: 'স্বল্প স্টক সতর্কতা',
    lowStockWarningQuantity: 'স্বল্প স্টক সতর্কতা পরিমাণ',
    resetToDefault: 'ডিফল্টে রিসেট করুন',
    stockControlInfo: 'স্বল্প স্টক পরিমাণের নিয়ম সেট করুন যা স্টক পুনঃঅর্ডার পয়েন্ট হিসাবে ব্যবহার করা যেতে পারে।',
    learnMore: 'আরও জানুন',
    color: 'রঙ',
    image: 'ছবি',
    commentsKitchenTicketInfo: 'মন্তব্যগুলি রান্নাঘরের টিকিটে প্রিন্ট করা হবে।',
    enterComment: 'মন্তব্য লিখুন...',
    stockHistory: 'স্টকের ইতিহাস',
    excel: 'এক্সেল',
    inventoryCountReport: 'ইনভেন্টরি রিপোর্ট',
    quickInventory: 'দ্রুত ইনভেন্টরি',
    negativeQuantity: 'নেতিবাচক পরিমাণ',
    nonZeroQuantity: 'অ-শূন্য পরিমাণ',
    zeroQuantity: 'শূন্য পরিমাণ',
    searchByProductOrCode: 'পণ্য বা কোড দিয়ে খুঁজুন',
    stockCode: 'কোড',
    stockName: 'নাম',
    stockQty: 'পরিমাণ',
    stockUnit: 'একক',
    stockCostPrice: 'ক্রয় মূল্য',
    stockCost: 'ক্রয়',
    stockCostInclTax: 'ট্যাক্স সহ ক্রয়',
    stockValue: 'মূল্য',
    stockValueInclTax: 'ট্যাক্স সহ মূল্য',
    costPrice: 'ক্রয় মূল্য',
    // salePrice: 'বিক্রয় মূল্য', // Defined
    totalCost: 'মোট ক্রয়',
    totalCostInclTax: 'মোট ক্রয় ট্যাক্স সহ',
    totalValue: 'মোট',
    totalValueInclTax: 'মোট ট্যাক্স সহ',
    searchReports: 'রিপোর্ট খুঁজুন',
    reportProducts: 'পণ্য',
    reportProductGroups: 'পণ্যের গ্রুপ',
    reportCustomers: 'গ্রাহক',
    reportTaxRates: 'ট্যাক্স রেট',
    reportUsers: 'ব্যবহারকারী',
    reportItemList: 'আইটেম তালিকা',
    reportPaymentTypes: 'পেমেন্টের ধরন',
    reportRefunds: 'ফেরত',
    reportInvoiceList: 'চালানের তালিকা',
    reportDailySales: 'দৈনিক বিক্রয়',
    reportHourlySales: 'ঘণ্টাভিত্তিক বিক্রয়',
    reportProfitMargin: 'লাভ ও মার্জিন',
    customersAndSuppliers: 'গ্রাহক ও সরবরাহকারী',
    includeSubgroups: 'সাবগ্রুপ অন্তর্ভুক্ত করুন',
    dateRange: 'তারিখ পরিসীমা',
    showReport: 'রিপোর্ট দেখুন',
    selectReportPrompt: 'ফিল্টার দেখতে একটি রিপোর্ট নির্বাচন করুন।',
    searchCustomers: 'গ্রাহক খুঁজুন...',
    searchByName: 'নাম',
    searchByCode: 'কোড',
    searchByPhone: 'ফোন',
    searchByTaxNumber: 'ট্যাক্স নম্বর',
    custCode: 'কোড',
    custName: 'নাম',
    custTaxNum: 'ট্যাক্স নম্বর',
    custAddress: 'ঠিকানা',
    custPhone: 'ফোন',
    custActive: 'সক্রিয়',
    isCustomer: 'গ্রাহক',
    addUser: 'ব্যবহারকারী যোগ',
    resetPassword: 'পাসওয়ার্ড রিসেট',
    showInactiveUsers: 'নিষ্ক্রিয় ব্যবহারকারী',
    security: 'নিরাপত্তা',
    users: 'ব্যবহারকারীগণ',
    addUserModalTitle: 'নতুন ব্যবহারকারী যোগ করুন',
    editUserModalTitle: 'ব্যবহারকারী সম্পাদনা করুন',
    userFirstName: 'নামের প্রথম অংশ',
    userLastName: 'নামের শেষাংশ',
    userEmail: 'ইমেইল',
    userAccessLevel: 'অ্যাক্সেস স্তর',
    userActive: 'সক্রিয়',
    newPaymentType: 'নতুন পেমেন্ট টাইপ',
    editPaymentType: 'পেমেন্ট টাইপ সম্পাদনা করুন',
    payTypeName: 'নাম',
    payTypePosition: 'পজিশন',
    payTypeCode: 'কোড',
    payTypeEnabled: 'সক্ষম',
    payTypeQuickPayment: 'দ্রুত পেমেন্ট',
    payTypeCustomerRequired: 'গ্রাহক আবশ্যক',
    payTypeChangeAllowed: 'পরিবর্তন অনুমোদিত',
    payTypeMarkAsPaid: 'পরিশোধিত হিসেবে চিহ্নিত',
    payTypePrintReceipt: 'রসিদ প্রিন্ট',
    payTypeShortcutKey: 'শর্টকাট কী',
    save: 'সংরক্ষণ',
    companyData: 'কোম্পানির ডেটা',
    voidReasons: 'বাতিলের কারণ',
    resetDatabase: 'ডেটাবেস রিসেট',
    myCompanyData: 'আমার কোম্পানির ডেটা',
    companyName: 'নাম',
    taxNumber: 'ট্যাক্স নম্বর',
    streetName: 'রাস্তার নাম',
    buildingNumber: 'বিল্ডিং নম্বর',
    additionalStreetName: 'অতিরিক্ত রাস্তার নাম',
    plotIdentification: 'প্লট সনাক্তকরণ',
    district: 'জেলা',
    postalCode: 'পোস্টাল কোড',
    city: 'শহর',
    stateProvince: 'রাজ্য / প্রদেশ',
    country: 'দেশ',
    phoneNumber: 'ফোন নম্বর',
    email: 'ইমেইল',
    bankAccount: 'ব্যাংক হিসাব',
    bankAccNumber: 'ব্যাংক অ্যাকাউন্ট নম্বর',
    bankDetails: 'ব্যাংকের বিবরণ',
    logo: 'লোগো',
    databasePath: 'ডেটাবেস পাথ',
    browse: 'ব্রাউজ',
    management: 'ব্যবস্থাপনা',
    noItems: 'কোনো আইটেম নেই',
    subtotal: 'উপমোট',
    tax: 'ট্যাক্স',
    charge: 'চার্জ',
    total: 'মোট',
    searchOrScan: 'পণ্য খুঁজুন বা বারকোড স্ক্যান করুন',
    promoName: 'নাম',
    promoType: 'ধরন',
    promoValue: 'মান',
    promoActive: 'সক্রিয়',
    promoStartDate: 'শুরুর তারিখ',
    promoEndDate: 'শেষ তারিখ',
    taxRateName: 'নাম',
    taxRate: 'হার (%)',
    taxRateDefault: 'ডিফল্ট',
    countryName: 'নাম',
    countryCode: 'কোড',
    countryCurrency: 'মুদ্রা',
  },
};