'use client';
import React from 'react';
import { useLazyLoadQuery } from 'react-relay';
import { NativeLink } from '@/components/ui/link';
import { Text } from '@/components/ui/text';
import { ProductCard } from '@/components/pages/explore/product-card';
import { SEARCH_PRODUCTS_QUERY } from '@/lib/queries';
import { queriesSearchProductsQuery } from '@/graphql/__generated__/queriesSearchProductsQuery.graphql';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';
import { Frame } from '@/components/ui/frame';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { useSearchParams } from 'next/navigation';

interface ProductSectionProps {
  title: string;
  categoryId?: number;
  keyWord?: string;
}

export function ProductSection({ title, categoryId, keyWord = '' }: ProductSectionProps) {
  const searchParams = useSearchParams();
  const shipToCountry = searchParams.get('shipToCountry') || 'US';
  
  const queryParams = {
    keyWord: keyWord || '',
    pageSize: 20,
    pageIndex: 1,
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
        <NativeLink 
          href={`/explore?${keyWord ? `keyword=${encodeURIComponent(keyWord || '')}` : `category=${categoryId || ''}`}${shipToCountry ? `&shipToCountry=${shipToCountry}` : ''}`} 
          className='no-underline'
        >
          View more
        </NativeLink>
      </div>
      
      <div className="w-full relative">
        <Carousel className="w-full max-w-full" opts={{ align: "start" }}>
          <CarouselContent className='h-[300px]'>
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
                <CarouselItem key={product.itemId} className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <ProductCard 
                    product={{
                      id: product.itemId || '',
                      title: product.title || 'Product ' + product.itemId,
                      price: originalPrice,
                      salePrice: salePrice,
                      rating: rating,
                      imageUrl: imageUrl,
                      supplier: 'AliExpress',
                      shipping: 'Varies',
                      orders: product.orders ? product.orders: '0',
                      productUrl: productUrl
                    }} 
                  />
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="left-0 z-[1]" />
          <CarouselNext className="right-0 z-[1]" />
        </Carousel>
      </div>
    </div>
  );
}
