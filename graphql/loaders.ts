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

export default function setupLoaders() {
  const userLoader = new DataLoader<number | string, User | null>(async (userIds) => {
    const users = await db<User>('accounts')
      .whereIn('id', userIds as any[])
      .select('*');
    
    // Return users in the same order as the IDs requested (important!)
    return userIds.map(id => 
      users.find(user => user.id.toString() === id.toString()) || null
    );
  });

  return {
    userLoader,
  };
}

export type Loaders = ReturnType<typeof setupLoaders>;
