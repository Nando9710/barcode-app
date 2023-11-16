export interface BarcodeProductsData {
  products: Product[];
}

export interface Product {
  barcode_number: string;
  barcode_formats: string;
  mpn: string;
  model: string;
  asin: string;
  title: string;
  category: string;
  manufacturer: string;
  brand: string;
  contributors: any[];
  age_group: string;
  ingredients: string;
  nutrition_facts: string;
  energy_efficiency_class: string;
  color: string;
  gender: string;
  material: string;
  pattern: string;
  format: string;
  multipack: string;
  size: string;
  length: string;
  width: string;
  height: string;
  weight: string;
  release_date: string;
  description: string;
  features: any[];
  images: string[];
  last_update: Date | string;
  stores: Store[];
  reviews: any[];
}

export interface Store {
  name: string;
  country: string;
  currency: string;
  currency_symbol: string;
  price: string;
  sale_price: string;
  tax: any[];
  link: string;
  item_group_id: string;
  availability: string;
  condition: string;
  shipping: any[];
  last_update: Date | string;
}