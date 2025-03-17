import { createToken } from '@/lib/aliexpress';
import knex from '@/lib/db';
import { ApiContext } from '../types';
import db from '@/lib/db';

export const getAliexpressAuthUrlResolver = async (): Promise<{ authorizationUrl: string }> => {
  try {
    const APP_KEY = process.env.ALIEXPRESS_APP_KEY;
    const CALLBACK_URL = `${process.env.WEBHOOKS_URL}/api/aliexpress/callback`;
    
    if (!APP_KEY) {
      throw new Error('Missing APP_KEY in environment variables');
    }
    
    const authorizationUrl = `https://api-sg.aliexpress.com/oauth/authorize?response_type=code&force_auth=true&redirect_uri=${encodeURIComponent(CALLBACK_URL)}&client_id=${APP_KEY}`;
    
    return { authorizationUrl };
  } catch (error) {
    console.error('Error generating AliExpress authorization URL:', error);
    throw new Error('Failed to generate authorization URL');
  }
};

interface ExchangeTokenResult {
  success: boolean;
  error?: string;
}

export const exchangeAliexpressTokenResolver = async (
  _: unknown, 
  { code }: { code: string }, 
  ctx: ApiContext
): Promise<ExchangeTokenResult> => {
  try {
    const tokenResponse = await createToken(code);
    
    if (!tokenResponse.success) {
      console.error('Token exchange failed:', tokenResponse.error);
      return { success: false, error: tokenResponse.error };
    }
    
    const responseData = tokenResponse.data;
    
    // Check if connection already exists
    const existingConnection = await knex('aliexpress_connections')
      .where({ account_id: ctx.account.id })
      .first();
      
    if (existingConnection) {
      // Update existing connection
      await knex('aliexpress_connections')
        .where({ id: existingConnection.id })
        .update({
          access_token: responseData.access_token,
          refresh_token: responseData.refresh_token,
          token_expires_at: new Date(Date.now() + parseInt(responseData.expires_in) * 1000),
          updated_at: new Date()
        });
    } else {
      // Create new connection
      await knex('aliexpress_connections').insert({
        account_id: ctx.account.id,
        access_token: responseData.access_token,
        refresh_token: responseData.refresh_token,
        token_expires_at: new Date(Date.now() + parseInt(responseData.expires_in) * 1000),
        created_at: new Date(),
        updated_at: new Date()
      });
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error processing AliExpress callback:', error);
    return { success: false, error: 'Unexpected error occurred' };
  }
};

interface ConnectionStatus {
  aliexpress: {
    connected: boolean;
    currency: string;
    language:string;
  };
}

export const getConnectionStatus = async (
  _: unknown, 
  __: unknown, 
  ctx: ApiContext
): Promise<ConnectionStatus> => {
  try {
    if (!ctx.account || !ctx.account.id) {
      return {
        aliexpress: {
          connected: false,
          currency: '',
          language: '', 
        }
      };
    }

    const connection = await knex('aliexpress_connections')
      .where({ account_id: ctx.account.id })
      .first();
    
    return {
      aliexpress: {
        connected: !!connection,
        currency: connection?.currency || '',
        language: connection?.language || ''
      }
    };
  } catch (error) {
    console.error('Error fetching connection status:', error);
    return {
      aliexpress: {
        connected: false,
        currency: '',
        language: ''
      }
    };
  }
};


interface UpdateSettingsArgs {
  currency?: string;
  language?: string;
}

interface UpdateSettingsResult {
  success: boolean;
}

export const updateAliexpressSettingsResolver = async (
  _: unknown,
  args: UpdateSettingsArgs,
  ctx: ApiContext
): Promise<UpdateSettingsResult> => {
  try {
    if (!ctx.account || !ctx.account.id) {
      throw new Error('Not authenticated');
    }

    const connection = await knex('aliexpress_connections')
      .where({ account_id: ctx.account.id })
      .first();

    if (!connection) {
      throw new Error('No AliExpress connection found');
    }

    const updateData: Partial<{ currency: string; language: string }> = {};

    if (args.currency) {
      updateData.currency = args.currency;
    }

    if (args.language) {
      updateData.language = args.language;
    }

    // Only update if we have data to update
    if (Object.keys(updateData).length > 0) {
      await knex('aliexpress_connections')
        .where({ id: connection.id })
        .update(updateData);
    }

    return { success: true };
  } catch (error) {
    console.error('Error updating AliExpress settings:', error);
    return { success: false };
  }
};

export const disconnectAliexpressResolver = async (
  _: unknown,
  __: unknown,
  ctx: ApiContext
): Promise<{ success: boolean }> => {
  try {
    if (!ctx.account || !ctx.account.id) {
      throw new Error('Not authenticated');
    }
    
    const connection = await db('aliexpress_connections')
      .where({ account_id: ctx.account.id })
      .first();
      
    if (!connection) {
      return { success: true };
    }
    
    await db('aliexpress_connections')
      .where({ account_id: ctx.account.id })
      .delete();
      
    return { success: true };
  } catch (error) {
    console.error('Error disconnecting AliExpress:', error);
    return { success: false };
  }
};
