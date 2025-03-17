'use server';

import db from "./db";
import { getSessionAccount } from "./session";

export async function checkSetupComplete() {
  
  const { account } = await getSessionAccount();
  if (!account) {
    return false;
  }
  const connection = await db('aliexpress_connections')
    .where({ account_id: account.id })
    .first();
    
  return !!(connection?.access_token && connection?.currency && connection?.language);
}
