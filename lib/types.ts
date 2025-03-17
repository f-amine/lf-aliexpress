export interface Account {
  id: number;
  lightfunnels_account_id: string;
  email: string;
  lightfunnels_token: string;
  created_at: Date;
  updated_at: Date;
}

export interface SessionResult {
  account?: Account;
  error?: string;
  status: number;
}
