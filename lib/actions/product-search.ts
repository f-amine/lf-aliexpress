// lib/actions/product-search.ts
'use server';

import db from '@/lib/db';
import { getSessionAccount } from '@/lib/session';
import { aliExpressApiRequest } from '../aliexpress';

export interface ProductSearchParams {
  keyword?: string;
  categoryId?: string;
  sortBy?: string;
  pageSize?: number;
  pageIndex?: number;
  filters?: Array<{
    searchKey?: string;
    searchValue?: string;
    min?: string;
    max?: string;
  }>;
  selectionName?: string;
}

export interface ProductSearchResult {
  totalCount: number;
  pageIndex: number;
  pageSize: number;
  products: Array<{
    itemId: string;
    title: string;
    itemMainPic: string;
    itemUrl: string;
    salePrice: string;
    salePriceCurrency: string;
    originalPrice: string;
    originalPriceCurrency: string;
    discount: string;
    orders: string;
    evaluateRate: string;
    productVideoUrl?: string;
  }>;
}

export async function searchProducts(params: ProductSearchParams): Promise<ProductSearchResult | null> {
  try {
    const { account, error } = await getSessionAccount();
    
    if (error || !account) {
      console.error('Authentication error:', error);
      return null;
    }
    
    // Get the AliExpress connection for the account
    const connection = await db('aliexpress_connections')
      .where({ account_id: account.id })
      .first();
    
    if (!connection) {
      console.error('No AliExpress connection found');
      return null;
    }
    
    // Set default values
    const {
      keyword = '',
      categoryId,
      sortBy = 'orders,desc',
      pageSize = 20,
      pageIndex = 1,
      filters = [],
      selectionName
    } = params;
    
    // Prepare API parameters
    const apiParams: Record<string, any> = {
      keyWord: keyword,
      local: connection.language || 'EN',
      countryCode: 'US',
      currency: connection.currency || 'USD',
      pageSize: pageSize.toString(),
      pageIndex: pageIndex.toString()
    };
    
    if (categoryId) {
      apiParams.categoryId = categoryId;
    }
    
    if (sortBy) {
      apiParams.sortBy = sortBy;
    }
    
    if (filters && filters.length > 0) {
      apiParams.searchExtend = JSON.stringify(filters);
    }
    
    if (selectionName) {
      apiParams.selectionName = selectionName;
    }
    
    // Call the AliExpress API 
    const response = await aliExpressApiRequest(
      'aliexpress.ds.text.search',
      apiParams,
      'POST',
      connection.access_token
    );
    
    if (!response.success) {
      console.error('AliExpress API error:', response.error);
      return null;
    }
    
    // Parse the response data
    const data = response.data?.aliexpress_ds_text_search?.data;
    
    if (!data) {
      console.error('Invalid API response format:', response);
      return null;
    }
    
    return {
      totalCount: parseInt(data.totalCount) || 0,
      pageIndex: parseInt(data.pageIndex) || 1,
      pageSize: parseInt(data.pageSize) || 20,
      products: Array.isArray(data.products) ? data.products : []
    };
    
  } catch (error) {
    console.error('Error searching products:', error);
    return null;
  }
}
