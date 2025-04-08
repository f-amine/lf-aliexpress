import DataLoader from 'dataloader';
import db from '@/lib/db';

interface User {
  id: number;
  name: string;
  email: string;
  lightufnnels_token: string;
  created_at: Date;
  updated_at: Date;
}

interface Product {
  id: number;
  account_id: number;
  title: string;
  description: string | null;
  price: number;
  sale_price: number | null;
  image_url: string | null;
  aliexpress_item_id: string | null;
  aliexpress_url: string | null;
  supplier: string | null;
  shipping: string | null;
  orders: string | null;
  rating: number | null;
  status: 'active' | 'draft' | 'archived';
  created_at: Date;
  updated_at: Date;
}

export default function setupLoaders() {
  const userLoader = new DataLoader<number | string, User | null>(async (userIds) => {
    const users = await db<User>('accounts')
      .whereIn('id', userIds as any[])
      .select('*');
    
    return userIds.map(id => 
      users.find(user => user.id.toString() === id.toString()) || null
    );
  });
  const productLoader = new DataLoader<number | string, Product | null>(async (productIds) => {
    const products = await db<Product>('products')
      .whereIn('id', productIds as any[])
      .select('*');
    
    return productIds.map(id =>
      products.find(product => product.id.toString() === id.toString()) || null
    );
  });

  return {
    userLoader,
    productLoader
  };
}

export type Loaders = ReturnType<typeof setupLoaders>;
