export type UserRole = 'SUPER_ADMIN' | 'ADMIN';

export interface Layer {
  id: string;
  name: string;
  productType: 'Epoxy' | 'Polyaspartic' | 'Top Coat' | 'Flakes' | 'Metallic Pigment' | 'Quartz';
  productId?: string; // Link to inventory product
  coverage: number; // sq ft
  unitSize: number; // e.g., 3 for a 3-gallon kit
  isOptional?: boolean;
}

export interface SystemFormula {
  id: string;
  name: string;
  description: string;
  layers: Layer[];
  adminId: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  adminId: string;
  type: 'Epoxy' | 'Polyaspartic' | 'Top Coat' | 'Flakes' | 'Metallic Pigment' | 'Quartz' | 'Other';
}

export interface Product {
  id: string;
  categoryId: string;
  name: string;
  unit: 'gallon' | 'lb' | 'container' | 'box';
  pricePerUnit: number;
  description: string;
  adminId: string;
  imageUrl?: string;
}

export interface ProjectQuote {
  id: string;
  installerId: string;
  installerName: string;
  companyName?: string;
  email: string;
  phone: string;
  location: string;
  squareFootage: number;
  systemType: 'Metallic' | 'Epoxy 2-Day' | 'Polyaspartic 1-Day';
  options: string[]; // e.g., ['Flakes', 'Quartz']
  estimatedCost: number;
  status: 'Pending' | 'Sent' | 'Completed';
  createdAt: string;
  beforeImage?: string;
  afterImage?: string;
}

export interface AdminAccount {
  id: string;
  name: string;
  email: string;
  companyName: string;
  location: string;
  subscriptionStatus: 'Active' | 'Inactive';
  createdAt: string;
}

export interface Installer {
  id: string;
  name: string;
  email: string;
  phone: string;
  companyName?: string;
  location: string;
  createdAt: string;
}
