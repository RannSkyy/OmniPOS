/**
 * Types definition for OmniPOS Landing Page and Transaction Workspace
 */

export interface Product {
  id: string;
  name: string;
  category: 'Shoes' | 'Clothing' | 'Others Product';
  stock: number;
  initialStock: number;
  price: number;
  image: string;
  description: string;
  colors?: string[];
  sizeOptions?: number[];
  rating?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: number;
  selectedColor?: string;
}

export interface Transaction {
  id: string;
  items: CartItem[];
  subTotal: number;
  tax: number;
  discount: number;
  total: number;
  timestamp: string;
  paymentMethod: string;
}

export interface ContactSubmission {
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}
