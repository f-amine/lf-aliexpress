'use client';
import { Fragment, Suspense } from 'react';
import { Title } from '@/components/ui/title';
import { ProductCard } from '@/components/pages/explore/product-card';
import { ProductFilters } from '@/components/pages/explore/product-filters';
import { Content } from '@/components/ui/content';
import { useSearchParams } from 'next/navigation';
import { ProductGridSkeleton } from '@/components/pages/explore/product-skeletons';
import { useLazyLoadQuery } from 'react-relay';
import { Text } from '@/components/ui/text';
import { Frame } from '@/components/ui/frame';
import { Pagination } from '@/components/pages/explore/pagination';
import { useRouter } from 'next/navigation';
import { PRODUCTS_QUERY } from '@/lib/queries';
import { ProductSidebar } from '@/components/pages/product/product-sidebar';
import { queriesProductsQuery } from '@/graphql/__generated__/queriesProductsQuery.graphql';

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const type = searchParams.get('type') || 'listed'; 
  const keyword = searchParams.get('keyword') || '';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const pageSize = parseInt(searchParams.get('pageSize') || '20', 10);
  const sortBy = searchParams.get('sortBy') || 'createdAt,desc';
  
  const mapTypeToStatus = (type: string): string => {
    switch (type) {
      case 'listed':
        return 'active';
      case 'imported':
        return 'imported';
      case 'saved':
        return 'draft';
      default:
        return type;
    }
  };
  
  const queryParams = {
    keyWord: keyword,
    pageSize,
    pageIndex: currentPage,
    status: mapTypeToStatus(type),
    sortBy
  };

  const getPageTitle = () => {
    switch (type) {
      case 'listed':
        return 'Listed Products';
      case 'imported':
        return 'Imported Products';
      case 'saved':
        return 'Saved Products';
      default:
        return 'Products';
    }
  };

  const ProductsGrid = () => {
    const data = useLazyLoadQuery<queriesProductsQuery>(
      PRODUCTS_QUERY,
      queryParams
    );
    
    const products = data?.getProducts?.products || [];
    const totalCount = data?.getProducts?.totalCount || 0;
    const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
    
    const handlePageChange = (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', page.toString());
      router.push(`/products?${params.toString()}`);
    };
    
    const handleRowsPerPageChange = (newPageSize: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('pageSize', newPageSize.toString());
      params.set('page', '1');
      router.push(`/products?${params.toString()}`);
    };
    
    if (products.length === 0) {
      return (
        <Frame className="w-full text-center p-8">
          <Text>No products found</Text>
        </Frame>
      );
    }

    return (
      <>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => {
            console.log(product?.aliexpressItemId)
            if (!product) return null;
            
            return (
              <ProductCard
                key={product.id}
                product={{
                  id: product.id,
                  title: product.title,
                  price: product.price,
                  salePrice: product.salePrice || product.price,
                  rating: product.rating || 0,
                  imageUrl: product.imageUrl || '',
                  supplier: product.supplier || 'AliExpress',
                  shipping: product.shipping || 'Varies',
                  orders: product.orders || '0',
                  productUrl: `/products/${product.id}`,
                  aliexpressItemId: product.aliexpressItemId
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
      </>
    );
  };

  return (
    <Fragment>
      <Title headingClassName='text-2xl leading-8'>
        My Products
      </Title>
      <Content>
        <ProductSidebar />
        <div className="flex flex-col items-start flex-1">
          <ProductFilters />
          
          <div className='flex pb-8 flex-col items-start gap-2 self-stretch'>
            <div className='pb-6 flex items-start gap-2 self-stretch'>
              <Text className='grow text-[20px] !leading-5' variant={'title'}>
                {getPageTitle()}
              </Text>
            </div>
            
            <Suspense fallback={<ProductGridSkeleton title="Loading Products" />}>
              <ProductsGrid />
            </Suspense>
          </div>
        </div>
      </Content>
    </Fragment>
  );
}
