export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: "coffee" | "cocoa";
  rating: number;
  inStock: boolean;
  origin: string;
  weight: string;
  tags: string[];
}

export interface FutureProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: "coffee" | "cocoa";
  rating: number;
  inStock: boolean;
  origin: string;
  weight: string;
  tags: string[];
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  billingAddress?: ShippingAddress;
  paymentMethod: PaymentMethod;
  paymentStatus: "pending" | "processing" | "succeeded" | "failed" | "cancelled";
  orderStatus: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  currency: string;
  paymentIntentId?: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
  specialInstructions?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  category: "coffee" | "cocoa";
  origin: string;
  weight: string;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface PaymentMethod {
  type: "card" | "paypal" | "bank";
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
}

export interface CreateOrderRequest {
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  billingAddress?: ShippingAddress;
  paymentMethod: PaymentMethod;
  paymentIntentId?: string;
  shippingMethod: string;
  specialInstructions?: string;
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
}
