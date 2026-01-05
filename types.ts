
export interface MonthlySale {
  month: string;
  sales: number;
}

export interface HourlySale {
  hour: string;

  sales: number;
}

export interface TopProduct {
  id: string;
  name: string;
  group: string;
  price: number;
  sold: number;
}

export interface TopCustomer {
  name: string;
  spent: number;
}

export enum Screen {
  Dashboard = 'Dashboard',
  Documents = 'Documents',
  Products = 'Products',
  Stock = 'Stock',
  Reporting = 'Reporting',
  CustomersAndSuppliers = 'Customers & Suppliers',
  Promotions = 'Promotions',
  UsersAndSecurity = 'Users & Security',
  PaymentTypes = 'Payment Types',
  Countries = 'Countries',
  TaxRates = 'Tax Rates',
  MyCompany = 'My Company',
  BackToSales = 'BackToSales',
}

export enum DocumentType {
  Invoice = 'Invoice',
  Quote = 'Quote',
  CreditNote = 'Credit Note',
}

export enum PaidStatus {
  Paid = 'Paid',
  Unpaid = 'Unpaid',
  Partial = 'Partial',
}

export interface Document {
  id: number;
  number: string;
  external: string;
  documentType: DocumentType;
  paid: PaidStatus;
  customer: string;
  date: string;
  pos: string;
  order: string;
  paymentType: string;
  user: string;
  discount: number;
  total: number;
}

export interface DocumentItem {
  id: number;
  documentId: number;
  code: string;
  name: string;
  unit: string;
  quantity: number;
  priceBeforeTax: number;
  tax: number;
  price: number;
  totalBeforeDiscount: number;
  discount: number;
  total: number;
}

export interface DocumentSubType {
  code: string;
  name: string; // This will be a translation key
}

export interface DocumentMainType {
  name: string; // This will be a translation key
  subTypes: DocumentSubType[];
}

// For Products Screen
export interface Product {
    id: string;
    code: string;
    name: string;
    groupId: string;
    groupName: string;
    barcode: string;
    cost: number;
    originalPrice?: number;
    salePriceExclTax: number;
    taxes: number;
    salePriceInclTax: number;
    active: boolean;
    unit: string;
    createdDate: string;
    updatedDate?: string;
    // New fields from screenshot
    description?: string;
    ageRestriction?: number;
    isService?: boolean;
    hasDefaultQuantity?: boolean;
    priceIncludesTax?: boolean;
    priceChangeAllowed?: boolean;
    supplierId?: string;
    reorderPoint?: number;
    preferredQuantity?: number;
    lowStockWarning?: boolean;
    lowStockWarningQuantity?: number;
    color?: string;
    image?: string;
    comments?: string[];
}

export interface ProductGroup {
    id: string;
    name: string;
    parentId: string | null;
    children?: ProductGroup[];
}

// For Stock Screen
export interface StockItem extends Product {
    quantity: number;
}

export interface CalculatedStockItem {
    id: string;
    code: string;
    name: string;
    quantity: number;
    unit: string;
    costPrice: number;
    cost: number;
    costInclTax: number;
    value: number;
    valueInclTax: number;
}

export interface StockSummary {
    totalCost: number;
    totalCostInclTax: number;
    totalValue: number;
    totalValueInclTax: number;
}

// For Reporting Screen
export interface Report {
    id: string;
    nameKey: string; // Translation key
}

export interface ReportCategory {
    nameKey: string; // Translation key
    reports: Report[];
}

// For Customers & Suppliers Screen
export interface Customer {
  id: string;
  code: string;
  name: string;
  taxNumber: string;
  address: string;
  phone: string;
  active: boolean;
  isCustomer: boolean;
}

// For Users & Security Screen
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  accessLevel: number;
  active: boolean;
}

// For Payment Types Screen
export interface PaymentType {
  id: string;
  name: string;
  position: number;
  code: string;
  enabled: boolean;
  quickPayment: boolean;
  customerRequired: boolean;
  changeAllowed: boolean;
  markAsPaid: boolean;
  printReceipt: boolean;
  shortcutKey: string;
}

// For My Company Screen
export interface CompanyData {
    name: string;
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
    bankAccountNumber: string;
    bankDetails: string;
    logo: string;
    databasePath: string;
}

// For Sales Screen
export interface ReceiptItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
    discount: number;
    total: number;
}

// For Promotions Screen
export interface Promotion {
  id: string;
  name: string;
  type: 'Discount' | 'BOGO'; // Buy One Get One
  value: number; // e.g., 20 for 20% or 1 for BOGO
  active: boolean;
  startDate: string;
  endDate: string;
}

// For Tax Rates Screen
export interface TaxRate {
    id: string;
    name: string;
    rate: number; // as percentage
    isDefault: boolean;
}

// For Countries Screen
export interface Country {
    id: string;
    name: string;
    code: string; // ISO code
    currency: string;
}