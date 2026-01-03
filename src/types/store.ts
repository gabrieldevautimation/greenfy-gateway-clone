export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CheckoutData {
  email: string;
  products: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
}

export interface PaymentResponse {
  success: boolean;
  qrCode?: string;
  qrCodeBase64?: string;
  qrCodeSvg?: string;
  pixCopyPaste?: string;
  transactionId?: string;
  checkoutUrl?: string;
  error?: string;
}
