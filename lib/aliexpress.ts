import crypto from 'crypto';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export function generateSignature(apiPath: string, params: Record<string, any>, appSecret: string): string {
  const paramsForSign = { ...params };
  delete paramsForSign.sign;
  
  const sortedKeys = Object.keys(paramsForSign).sort();
  
  let concatenatedString = "";
  for (const key of sortedKeys) {
    if (typeof paramsForSign[key] !== 'undefined' && paramsForSign[key] !== null) {
      concatenatedString += `${key}${paramsForSign[key]}`;
    }
  }
  
  const stringToSign = apiPath + concatenatedString;
  
  return crypto
    .createHmac('sha256', appSecret)
    .update(stringToSign)
    .digest('hex')
    .toUpperCase();
}

export async function aliExpressApiRequest<T = any>(
  apiPath: string,
  params: Record<string, any> = {},
  method: 'GET' | 'POST' = 'GET',
  accessToken?: string
): Promise<ApiResponse<T>> {
  const APP_KEY = process.env.ALIEXPRESS_APP_KEY;
  const APP_SECRET = process.env.ALIEXPRESS_SECRET || '';

  if (!APP_KEY || !APP_SECRET) {
    return {
      success: false,
      error: 'Missing APP_KEY or APP_SECRET in environment variables'
    };
  }
  
  try {
    const cleanApiPath = apiPath.startsWith('/') ? apiPath.substring(1) : apiPath;
    
    const isSystemInterface = cleanApiPath.startsWith('auth/');
    
    const allParams: Record<string, any> = {
      ...params,
      app_key: APP_KEY,
      timestamp: new Date().getTime().toString(),
      sign_method: 'sha256'
    };
    
    // session is aliexpress's name for access_token in their API
    if (accessToken) {
      allParams.session = accessToken;
    }
    
    if (!isSystemInterface) {
      allParams.method = cleanApiPath;
    }
    
    // Convert objects to strings
    for (const key in allParams) {
      if (typeof allParams[key] === 'object' && allParams[key] !== null) {
        allParams[key] = JSON.stringify(allParams[key]);
      }
    }
    
    const API_BASE_URL = isSystemInterface 
      ? 'https://api-sg.aliexpress.com/rest' 
      : 'https://api-sg.aliexpress.com/sync';
      
    const signApiPath = isSystemInterface ? `/${cleanApiPath}` : '';
    const sign = generateSignature(signApiPath, allParams, APP_SECRET);
    
    allParams.sign = sign;
    
    // Prepare query string or body
    const queryParams = new URLSearchParams();
    Object.entries(allParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, String(value));
      }
    });
    
    // Build the URL
    let url = API_BASE_URL;
    if (isSystemInterface) {
      url = `${API_BASE_URL}/${cleanApiPath}`;
    }
    
    console.log('Request URL:', `${url}?${queryParams.toString()}`);
    
    // Execute HTTP request
    let response;
    
    if (method === 'GET') {
      response = await fetch(`${url}?${queryParams.toString()}`, {
        headers: {
          'Accept': 'application/json'
        }
      });
    } else {
      response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          'Accept': 'application/json'
        },
        body: queryParams.toString()
      });
    }
    
    // Handle the response safely
    const responseText = await response.text();
    let data: any;
    
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Response parsing error:', parseError);
      console.error('Response text:', responseText);
      
      return {
        success: false,
        error: `Failed to parse response: ${responseText.substring(0, 100)}${responseText.length > 100 ? '...' : ''}`,
        data: responseText
      };
    }
    
    // Check for API-specific error responses
    if (data.error_response) {
      console.error(`AliExpress API error (${apiPath}):`, data.error_response);
      return {
        success: false,
        error: data.error_response.msg || 'API request failed',
        data
      };
    }
    
    // For nested business API responses
    const businessResponseKey = cleanApiPath.replace(/\./g, '_');
    const businessResponse = data[businessResponseKey];
    if (businessResponse && businessResponse.code !== '0' && businessResponse.code !== 0) {
      console.error(`AliExpress API error (${apiPath}):`, businessResponse);
      return {
        success: false,
        error: businessResponse.msg || 'API request failed',
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


