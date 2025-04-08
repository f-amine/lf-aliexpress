'use client';
import React from 'react';
import { useLazyLoadQuery } from 'react-relay';
import { Text } from '@/components/ui/text';
import { ProductCard } from '@/components/pages/explore/product-card';
import { SEARCH_PRODUCTS_QUERY } from '@/lib/queries';
import { queriesSearchProductsQuery } from '@/graphql/__generated__/queriesSearchProductsQuery.graphql';
import { Frame } from '@/components/ui/frame';
import { useSearchParams, useRouter } from 'next/navigation';
import { Pagination } from '@/components/pages/explore/pagination';

interface ProductGridProps {
  title: string;
  categoryId?: number;
  keyWord?: string;
}

export function ProductGrid({ title, categoryId, keyWord = '' }: ProductGridProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const shipToCountry = searchParams.get('shipToCountry') || 'US';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const pageSize = parseInt(searchParams.get('pageSize') || '50', 10);
  
  const queryParams = {
    keyWord: keyWord || '',
    pageSize,
    pageIndex: currentPage,
    sortBy: "orders,desc",
    countryCode: shipToCountry
  };
  
  if (!keyWord && categoryId) {
    Object.assign(queryParams, { categoryId });
  }
  
  const data = useLazyLoadQuery<queriesSearchProductsQuery>(
    SEARCH_PRODUCTS_QUERY,
    queryParams
  );
  
  const products = data?.searchAliexpressProducts?.products || [];
  const totalCount = data?.searchAliexpressProducts?.totalCount || 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`/explore?${params.toString()}`);
  };
  
  const handleRowsPerPageChange = (newPageSize: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('pageSize', newPageSize.toString());
    params.set('page', '1'); // Reset to first page when changing page size
    router.push(`/explore?${params.toString()}`);
  };
  
  if (products.length === 0) {
    return (
      <div className='flex pb-8 flex-col items-start self-stretch'>
        <div className='pb-6 flex items-start gap-2 self-stretch'>
          <Text className='grow text-[20px] !leading-5' variant={'title'}>{title}</Text>
        </div>
        <Frame className="w-full text-center p-8">
          <Text>No products found for {title}</Text>
        </Frame>
      </div>
    );
  }
  
  return (
    <div className='flex pb-8 flex-col items-start self-stretch'>
      <div className='pb-6 flex items-start gap-2 self-stretch'>
        <Text className='grow text-[20px] !leading-5' variant={'title'}>{title}</Text>
      </div>
      
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => {
          if (!product) return null;
          
          const parsePrice = (priceStr: string | null | undefined): number => {
            if (!priceStr) return 0;
            const parsed = parseFloat(priceStr);
            return isNaN(parsed) ? 0 : parsed;
          };
          
          const originalPrice = parsePrice(product.targetOriginalPrice);
          const salePrice = parsePrice(product.targetSalePrice);
          
          const rating = product.score 
            ? parsePrice(product.score) 
            : (product.evaluateRate 
              ? parseFloat(product.evaluateRate.replace('%', '')) / 20 
              : 0);
              
          const imageUrl = product.itemMainPic 
            ? (product.itemMainPic.startsWith('//') 
              ? 'https:' + product.itemMainPic 
              : product.itemMainPic) 
            : '';
            
          const productUrl = product.itemUrl 
            ? (product.itemUrl.startsWith('//') 
              ? 'https:' + product.itemUrl 
              : product.itemUrl) 
            : '';
            
          return (
            <ProductCard 
              key={product.itemId}
              product={{
                id: product.itemId || '',
                title: product.title || 'Product ' + product.itemId,
                price: originalPrice,
                salePrice: salePrice,
                rating: rating,
                imageUrl: imageUrl,
                supplier: 'AliExpress',
                shipping: 'Varies',
                orders: product.orders ? product.orders : '0',
                productUrl: productUrl
              }} 
            />
          );
        })}
      </div>
      
      <Pagination
        currentPage={currentPage} 
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        className="mt-8 w-full" 
      />
    </div>
  );
}
