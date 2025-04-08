import { aliExpressApiRequest, createToken } from '@/lib/aliexpress';
import { img } from '@/lib/lightfunnels';
import knex from '@/lib/db';
import { ApiContext } from '../types';
import db from '@/lib/db';
import { ls } from '@/lib/lightfunnels';

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
    language: string;
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

export interface SearchProductsParams {
  keyWord: string;
  pageSize?: number;
  pageIndex?: number;
  categoryId?: number;
  sortBy?: string;
  searchExtend?: string;
  selectionName?: string;
  countryCode?: string
}

export const searchAliExpressProductsResolver = async (
  _: unknown,
  params: SearchProductsParams,
  ctx: ApiContext
) => {
  try {
    if (!ctx.account || !ctx.account.id) {
      throw new Error('Not authenticated');
    }
    
    const connection = await db('aliexpress_connections')
      .where({ account_id: ctx.account.id })
      .first();
      
    if (!connection) {
      throw new Error('No AliExpress connection found');
    }
    
    const searchParams: Record<string, any> = {
      local: connection.language || 'en_US',
      countryCode: params.countryCode || 'US',
      pageSize: params.pageSize || 20,
      pageIndex: params.pageIndex || 1,
      currency: connection.currency || 'USD'
    };

    if (params.keyWord && params.keyWord.trim() !== '') {
      searchParams.keyWord = params.keyWord;
    }

    else if (params.categoryId && categoryMap[params.categoryId]) {
      searchParams.keyWord = categoryMap[params.categoryId];
    }
    
    if (params.categoryId) searchParams.categoryId = params.categoryId;
    if (params.sortBy) searchParams.sortBy = params.sortBy;
    
    const response = await aliExpressApiRequest(
      'aliexpress.ds.text.search',
      searchParams,
      'GET',
      connection.access_token
    );
    console.dir(response, { depth: null }); 
    
    if (!response.success) {
      throw new Error(response.error || 'Failed to search products');
    }
    
    // Extract the data from the response structure
    const responseData = response.data?.aliexpress_ds_text_search_response?.data;
    
    if (!responseData) {
      return {
        products: [],
        totalCount: 0,
        pageIndex: 1,
        pageSize: 20
      };
    }
    
    return {
      products: responseData.products,
      totalCount: responseData.totalCount,
      pageIndex: responseData.pageIndex,
      pageSize: responseData.pageSize
    };
  } catch (error) {
    console.error('Error searching AliExpress products:', error);
    throw error;
  }
};

export const getAliexpressProductDetailsResolver = async (
  _: unknown,
  { productId, shipToCountry, targetLanguage }: { 
    productId: string; 
    shipToCountry?: string; 
    targetLanguage?: string 
  },
  ctx: ApiContext
): Promise<any> => {
  try {
    if (!ctx.account || !ctx.account.id) {
      throw new Error('Not authenticated');
    }
    
    // Get the AliExpress connection for the account
    const connection = await db('aliexpress_connections')
      .where({ account_id: ctx.account.id })
      .first();
    
    if (!connection) {
      throw new Error('No AliExpress connection found');
    }
    
    const response = await aliExpressApiRequest(
      'aliexpress.ds.product.get',
      {
        product_id: productId,
        ship_to_country: shipToCountry || 'US',
        target_language: targetLanguage || 'en_US',
        target_currency: connection.currency || 'USD',
      },
      'GET',
      connection.access_token
    );
    
    console.dir(response, { depth: null }); 
    if (!response.success) {
      throw new Error(response.error || 'Failed to fetch product details');
    }
    
    
    const productDetails = response.data?.aliexpress_ds_product_get_response;
    
    if (!productDetails) {
      throw new Error('Invalid API response format');
    }
    
    return productDetails;
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw error;
  }
};


// graphql/resolvers/products.ts

export const importProductToLightfunnelsResolver = async (
  _: unknown,
  { 
    productData, 
    options 
  }: { 
    productData: {
      title: string;
      description: string;
      price: number;
      variants: Array<{
        id: string;
        title: string;
        price: number;
        sku: string;
        inventory_quantity: number;
        options: string[];
      }>;
      images: string[];
      options: Array<{
        name: string;
        values: string[];
      }>;
    };
    options: {
      trackInventory: boolean;
      marginPercentage: number;
    };
  },
  ctx: ApiContext
) => {
  try {
    if (!ctx.account || !ctx.account.id) {
      throw new Error('Not authenticated');
    }
    
    const lfToken = ctx.account.lightfunnels_token;
    
    // Import images first
    const imageIds = [];
    if (productData.images && productData.images.length > 0) {
      for (const imageUrl of productData.images) {
        try {
          // Make sure the imageUrl is properly formatted (adding https: if needed)
          const fullImageUrl = imageUrl.startsWith('//') ? `https:${imageUrl}` : imageUrl;
          
          // Import the image to Lightfunnels
          const imageId = await img({ url: fullImageUrl, token: lfToken });
          if (imageId) {
            imageIds.push(imageId);
          }
        } catch (err) {
          console.error(`Error importing image: ${imageUrl}`, err);
        }
      }
    }
    
    // Create option entries for the product
    const productOptions = [];
    for (let i = 0; i < productData.options.length; i++) {
      const option = productData.options[i];
      const optionId = `option_${i + 1}`;
      
      productOptions.push({
        id: optionId,
        label: option.name,
        options: option.values,
        type: "text"
      });
    }
    
    // Create variant entries with properly formatted options
    const productVariants = [];
    for (let i = 0; i < productData.variants.length; i++) {
      const variant = productData.variants[i];
      const variantOptions = [];
      
      // For each option in this variant, create the correct format
      for (let j = 0; j < variant.options.length; j++) {
        const optionValue = variant.options[j];
        variantOptions.push({
          id: `option_${j + 1}`,
          value: optionValue
        });
      }
      
      productVariants.push({
        price: variant.price,
        compare_at_price: 0, // Use 0 instead of null
        sku: variant.sku,
        options: variantOptions,
        enable_inventory_limit: true,
        inventory_quantity: variant.inventory_quantity
      });
    }
    
    // Create the product in Lightfunnels
    const createProductInput = {
      title: productData.title,
      description: productData.description,
      price: productData.price,
      compare_at_price: 0,
      options: productOptions,
      variants: productVariants,
      product_type: 'physical_product',
      enable_inventory_limit: options.trackInventory,
      inventory_quantity: productData.variants.reduce((total, v) => total + v.inventory_quantity, 0),
      images: imageIds,
      tags: []
    };
    
    try {
      const response = await ls({
        token: lfToken,
        data: {
          query: `
            mutation createProduct($node: InputProduct!) {
              createProduct(node: $node) {
                _id
                title
              }
            }
          `,
          variables: {
            node: createProductInput
          }
        }
      });
      
      if (response.errors) {
        console.error("Lightfunnels API errors:", response.errors);
        throw new Error(response.errors.map(e => e.message).join(', '));
      }
      
      const productId = response.data?.createProduct?._id;
      
      return {
        success: true,
        productId: productId,
        product: {
          id: productId,
          title: response.data?.createProduct?.title
        },
        error: null
      };
    } catch (error) {
      console.error('Error creating product in Lightfunnels:', error);
      return {
        success: false,
        productId: null,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  } catch (error) {
    console.error('Error importing product:', error);
    return {
      success: false,
      productId: null,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

const categoryMap: Record<number, string> = {
  1503: 'Home Furniture',
  1511: 'Accessories',
  200000343: 'Men\'s clothing',
  13: 'Home Improvement',
  1501: 'Kids & Babies',
  36: 'Jewelries',
  44: 'Electronics',
  26: 'Toys & Games',
  7: 'Computers',
  1524: 'Luggage & Bags'
};
