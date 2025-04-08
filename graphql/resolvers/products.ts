import { ApiContext } from '../types';
import db from '@/lib/db';

interface ProductsQueryArgs {
  keyWord?: string;
  pageSize?: number;
  pageIndex?: number;
  status?: string;
  sortBy?: string;
  accountId?: number;
}

export const getProductsResolver = async (
  _: unknown,
  args: ProductsQueryArgs,
  ctx: ApiContext
) => {
  try {
    if (!ctx.account || !ctx.account.id) {
      throw new Error('Not authenticated');
    }

    const query = db('products')
      .where('account_id', ctx.account.id);
    
    if (args.status) {
      switch (args.status) {
        case 'active':
          query.where('status', 'active');
          break;
        case 'imported':
          query.whereNotNull('aliexpress_item_id');
          break;
        case 'draft':
          query.where('status', 'draft');
          break;
        case 'archived':
          query.where('status', 'archived');
          break;
        default:
          if (args.status !== 'all') {
            query.where('status', args.status);
          }
      }
    }
    
    if (args.keyWord) {
      query.where(function() {
        this.where('title', 'like', `%${args.keyWord}%`)
            .orWhere('description', 'like', `%${args.keyWord}%`);
      });
    }
    
    const countQuery = query.clone();
    const [{ count }] = await countQuery.count('* as count');
    const totalCount = parseInt(count as any, 10);
    
    if (args.sortBy) {
      const [field, direction] = args.sortBy.split(',');
      const validDirection = direction === 'asc' ? 'asc' : 'desc';
      
      const fieldMap: Record<string, string> = {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        salePrice: 'sale_price',
        imageUrl: 'image_url'
      };
      
      const dbField = fieldMap[field] || field;
      query.orderBy(dbField, validDirection);
    } else {
      query.orderBy('created_at', 'desc');
    }
    
    const pageSize = args.pageSize || 20;
    const pageIndex = args.pageIndex || 1;
    const offset = (pageIndex - 1) * pageSize;
    
    query.limit(pageSize).offset(offset);
    
    const products = await query.select('*');
    
    const transformedProducts = products.map(product => ({
      id: product.id.toString(),
      title: product.title,
      description: product.description || '',
      price: parseFloat(product.price),
      salePrice: product.sale_price ? parseFloat(product.sale_price) : null,
      imageUrl: product.image_url || '',
      aliexpressItemId: product.aliexpress_item_id || '',
      aliexpressUrl: product.aliexpress_url || '',
      supplier: product.supplier || '',
      shipping: product.shipping || '',
      orders: product.orders || '0',
      rating: product.rating || 0,
      status: product.status,
      createdAt: product.created_at,
      updatedAt: product.updated_at
    }));
    
    return {
      products: transformedProducts,
      totalCount,
      pageIndex,
      pageSize
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductByIdResolver = async (
  _: unknown,
  { id }: { id: string },
  ctx: ApiContext
) => {
  try {
    if (!ctx.account || !ctx.account.id) {
      throw new Error('Not authenticated');
    }
    
    const product = await db('products')
      .where({
        id: parseInt(id, 10),
        account_id: ctx.account.id
      })
      .first();
    
    if (!product) {
      return null;
    }
    
    return {
      id: product.id.toString(),
      title: product.title,
      description: product.description || '',
      price: parseFloat(product.price),
      salePrice: product.sale_price ? parseFloat(product.sale_price) : null,
      imageUrl: product.image_url || '',
      aliexpressItemId: product.aliexpress_item_id || '',
      aliexpressUrl: product.aliexpress_url || '',
      supplier: product.supplier || '',
      shipping: product.shipping || '',
      orders: product.orders || '0',
      rating: product.rating || 0,
      status: product.status,
      createdAt: product.created_at,
      updatedAt: product.updated_at
    };
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw error;
  }
};

export const favoriteProductResolver = async (
  _: unknown,
  args: { 
    aliexpressItemId: string;
    productData: string; 
  },
  ctx: ApiContext
) => {
  try {
    if (!ctx.account || !ctx.account.id) {
      return {
        success: false,
        error: 'Not authenticated'
      };
    }

    // Check if already in products table
    const existingProduct = await db('products')
      .where({
        account_id: ctx.account.id,
        aliexpress_item_id: args.aliexpressItemId
      })
      .first();

    if (existingProduct) {
      return {
        success: true,
        product: {
          id: `product_${existingProduct.id}`,
          title: existingProduct.title,
          price: parseFloat(existingProduct.price),
          salePrice: existingProduct.sale_price ? parseFloat(existingProduct.sale_price) : parseFloat(existingProduct.price),
          imageUrl: existingProduct.image_url,
          aliexpressItemId: existingProduct.aliexpress_item_id,
          aliexpressUrl: existingProduct.aliexpress_url,
          rating: existingProduct.rating,
          supplier: existingProduct.supplier,
          shipping: existingProduct.shipping,
          orders: existingProduct.orders,
          status: existingProduct.status,
          createdAt: existingProduct.created_at
        }
      };
    }

    const productData = JSON.parse(args.productData);
    
    const salePrice = parseFloat(productData.targetSalePrice || productData.salePrice || "0");
    const originalPrice = parseFloat(productData.targetOriginalPrice || productData.originalPrice || productData.price || "0");
    
    // Add product to database
    const [productId] = await db('products')
      .insert({
        account_id: ctx.account.id,
        title: productData.title,
        price: originalPrice || 0,
        sale_price: salePrice || 0,
        image_url: productData.itemMainPic || productData.imageUrl,
        aliexpress_item_id: args.aliexpressItemId,
        aliexpress_url: productData.itemUrl || productData.productUrl,
        supplier: 'AliExpress',
        shipping: productData.shipping || 'Varies',
        orders: productData.orders || '0',
        rating: parseFloat(productData.score || productData.rating || "0"),
        status: 'draft' // Default status for favorited products
      })
      .returning('id');

    const newProduct = await db('products')
      .where('id', productId)
      .first();

    return {
      success: true,
      product: {
        id: `product_${newProduct.id}`,
        title: newProduct.title,
        price: parseFloat(newProduct.price),
        salePrice: newProduct.sale_price ? parseFloat(newProduct.sale_price) : parseFloat(newProduct.price),
        imageUrl: newProduct.image_url,
        aliexpressItemId: newProduct.aliexpress_item_id,
        aliexpressUrl: newProduct.aliexpress_url,
        rating: newProduct.rating,
        supplier: newProduct.supplier,
        shipping: newProduct.shipping,
        orders: newProduct.orders,
        status: newProduct.status,
        createdAt: newProduct.created_at
      }
    };
  } catch (error) {
    console.error('Error adding product to favorites:', error);
    return {
      success: false,
      error: 'Failed to add product to favorites'
    };
  }
};export const unfavoriteProductResolver = async (
  _: unknown,
  { aliexpressItemId }: { aliexpressItemId: string },
  ctx: ApiContext
) => {
  try {
    if (!ctx.account || !ctx.account.id) {
      return {
        success: false,
        error: 'Not authenticated'
      };
    }

    // Check if product exists before removing
    const existingProduct = await db('products')
      .where({
        account_id: ctx.account.id,
        aliexpress_item_id: aliexpressItemId
      })
      .first();

    if (!existingProduct) {
      return {
        success: false,
        error: 'Product not found'
      };
    }

    // Remove product
    await db('products')
      .where({
        account_id: ctx.account.id,
        aliexpress_item_id: aliexpressItemId
      })
      .delete();

    return {
      success: true
    };
  } catch (error) {
    console.error('Error removing product:', error);
    return {
      success: false,
      error: 'Failed to remove product'
    };
  }
};

export const isFavoriteProductResolver = async (
  _: unknown,
  { aliexpressItemId }: { aliexpressItemId: string },
  ctx: ApiContext
) => {
  try {
    if (!ctx.account || !ctx.account.id) {
      return false;
    }

    const product = await db('products')
      .where({
        account_id: ctx.account.id,
        aliexpress_item_id: aliexpressItemId
      })
      .first();

    return !!product;
  } catch (error) {
    console.error('Error checking product exists:', error);
    return false;
  }
};
