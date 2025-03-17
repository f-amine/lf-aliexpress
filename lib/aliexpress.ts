import crypto from 'crypto';

const API_BASE_URL = 'https://api-sg.aliexpress.com/rest';
const APP_KEY = process.env.ALIEXPRESS_APP_KEY;
const APP_SECRET = process.env.ALIEXPRESS_SECRET || '';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export async function aliExpressApiRequest<T = any>(
  apiPath: string,
  params: Record<string, any> = {},
  method: 'GET' | 'POST' = 'GET',
  accessToken?: string
): Promise<ApiResponse<T>> {
  try {
    if (!APP_KEY || !APP_SECRET) {
      throw new Error('Missing APP_KEY or APP_SECRET in environment variables');
    }

    // Generate timestamp
    const timestamp = new Date().getTime().toString();
    
    // Combine all parameters
    const allParams: Record<string, any> = {
      app_key: APP_KEY,
      timestamp,
      sign_method: 'sha256',
      ...params
    };
    
    // Add access token if provided (for authenticated endpoints)
    if (accessToken) {
      allParams.access_token = accessToken;
    }
    
    // Generate signature
    const sign = generateSignature(apiPath, allParams);
    
    // Add signature to parameters
    allParams.sign = sign;
    
    let url = `${API_BASE_URL}${apiPath}`;
    
    let headers: Record<string, string> = {};
    let body: string | URLSearchParams | undefined;
    
    if (method === 'GET') {
      // For GET requests, append params to URL as query string
      const queryParams = new URLSearchParams();
      Object.entries(allParams).forEach(([key, value]) => {
        queryParams.append(key, String(value));
      });
      
      headers = {
        'Accept': 'application/json'
      };
      
      url += `?${queryParams.toString()}`;
    } else {
      // For POST requests, send params in the body
      if (accessToken) {
        headers = {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        };
        
        // Remove access_token from body when using Authorization header
        delete allParams.access_token;
        
        body = JSON.stringify(allParams);
      } else {
        headers = {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          'Accept': 'application/json'
        };
        
        const formData = new URLSearchParams();
        Object.entries(allParams).forEach(([key, value]) => {
          formData.append(key, String(value));
        });
        
        body = formData;
      }
    }
    
    const response = await fetch(url, {
      method,
      headers,
      body: body instanceof URLSearchParams ? body.toString() : body
    });
    
    const data = await response.json();
    
    if (!response.ok || (data.code && data.code !== '0')) {
      console.error(`AliExpress API error (${apiPath}):`, data);
      return {
        success: false,
        error: data.message || 'API request failed',
        data
      };
    }
    
    return {
      success: true,
      data
    };
  } catch (error) {
    console.error(`Error making AliExpress API request to ${apiPath}:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}


function generateSignature(apiPath: string, params: Record<string, any>): string {
  const sortedKeys = Object.keys(params).sort();
  
  let concatenatedString = "";
  for (const key of sortedKeys) {
    concatenatedString += `${key}${params[key]}`;
  }
  
  const stringToSign = apiPath + concatenatedString;
  
  return crypto
    .createHmac('sha256', APP_SECRET)
    .update(stringToSign)
    .digest('hex')
    .toUpperCase();
}


export async function createToken(code: string): Promise<ApiResponse> {
  return aliExpressApiRequest(
    '/auth/token/create',
    { code },
    'POST'
  );
}


export async function refreshToken(refreshToken: string): Promise<ApiResponse> {
  return aliExpressApiRequest(
    '/auth/token/refresh',
    { refresh_token: refreshToken },
    'POST'
  );
}
