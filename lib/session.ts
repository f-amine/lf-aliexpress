import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import db from "@/lib/db";
import { Account, SessionResult } from "@/lib/types";
import { getServerSession } from "next-auth";

export async function getSessionAccount(): Promise<SessionResult> {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user?.email) {
    return { error: "User not authenticated", status: 401 };
  }
  
  const userEmail = session.user.email;
  
  // Get the account using the email from the session
  const account = await db<Account>('accounts')
    .where({ email: userEmail })
    .first();
  
  if (!account) {
    return { error: "Account not found", status: 404 };
  }
  
  return { account, status: 200 };
}
