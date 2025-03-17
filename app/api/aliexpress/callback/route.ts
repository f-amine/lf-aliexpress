import { NextRequest, NextResponse } from 'next/server';
import { createToken } from '@/lib/aliexpress';
import db from '@/lib/db';
import { getSessionAccount } from '@/lib/session';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    
    if (!code) {
      return NextResponse.redirect(new URL('/connection', request.url));
    }
    
    const { account, error, status } = await getSessionAccount();
    
    if (error) {
      console.error('Authentication error:', error);
      return NextResponse.redirect(new URL('/connection', request.url));
    }
    
    const tokenResponse = await createToken(code);
    
    if (!tokenResponse.success) {
      console.error('Token exchange failed:', tokenResponse.error);
      return NextResponse.redirect(new URL('/connection', request.url));
    }
    
    const responseData = tokenResponse.data;
    
    const existingConnection = await db('aliexpress_connections')
      .where({ account_id: account?.id })
      .first();
      
    const now = new Date();
    const tokenExpiresAt = new Date(now.getTime() + parseInt(responseData.expires_in) * 1000);
    
    if (existingConnection) {
      await db('aliexpress_connections')
        .where({ id: existingConnection.id })
        .update({
          access_token: responseData.access_token,
          refresh_token: responseData.refresh_token,
          token_expires_at: tokenExpiresAt,
        });
    } else {
      await db('aliexpress_connections').insert({
        account_id: account?.id,
        access_token: responseData.access_token,
        refresh_token: responseData.refresh_token,
        token_expires_at: tokenExpiresAt,
      });
    }
    
    return NextResponse.redirect(new URL('/settings?connection=success', request.url));
  } catch (error) {
    console.error('Error processing AliExpress callback:', error);
    return NextResponse.redirect(new URL('/settings?error=unexpected', request.url));
  }
}
