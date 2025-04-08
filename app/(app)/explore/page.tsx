'use client';
import { Fragment, Suspense } from 'react';
import { Title } from '@/components/ui/title';
import { CategorySidebar } from '@/components/pages/explore/category-sidebar';
import { ProductFilters } from '@/components/pages/explore/product-filters';
import { ProductSection } from '@/components/pages/explore/product-section';
import { ProductGrid } from '@/components/pages/explore/product-grid';
import { Content } from '@/components/ui/content';
import { useSearchParams } from 'next/navigation';
import { ProductGridSkeleton, ProductSectionSkeleton} from '@/components/pages/explore/product-skeletons';

export default function ExplorePage() {
  const searchParams = useSearchParams();
  
  const selectedCategory = searchParams.get('category') || 'all';
  const keyword = searchParams.get('keyword') || '';
  
  const categoryMap: Record<string, number> = {
    furniture: 1503,
    accessories: 1511,
    clothing: 200000343,
    home: 13,
    kids: 1501,
    jewelry: 36,
    electronics: 44,
    toys: 26,
    computers: 7,
    luggage: 1524
  };
  
  const currentCategoryId = selectedCategory !== 'all' ? categoryMap[selectedCategory] : undefined;
  
  const getCategoryName = (categoryId: string): string => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Products';
  };
  
  return (
    <Fragment>
      <Title headingClassName='text-2xl leading-8'>
        Explore AliExpress Products
      </Title>
      <Content>
        <CategorySidebar />
        <div className="flex flex-col items-start flex-1">
          <ProductFilters />
          
          {keyword ? (
            <Suspense fallback={<ProductGridSkeleton title={`Search Results: ${keyword}`} />}>
              <ProductGrid 
                title={`Search Results: ${keyword}`} 
                keyWord={keyword}
              />
            </Suspense>
          ) : selectedCategory !== 'all' ? (
            <Suspense fallback={<ProductGridSkeleton title={getCategoryName(selectedCategory)} />}>
              <ProductGrid 
                title={getCategoryName(selectedCategory)} 
                categoryId={currentCategoryId}
              />
            </Suspense>
          ) : (
            <>
              {/* Display all categories instead of just three */}
              {categories
                .filter(category => category.id !== 'all') // Skip the "all" category itself
                .map(category => (
                  <Suspense key={category.id} fallback={<ProductSectionSkeleton title={category.name} />}>
                    <ProductSection 
                      title={category.name} 
                      categoryId={categoryMap[category.id]}
                    />
                  </Suspense>
                ))
              }
            </>
          )}
        </div>
      </Content>
    </Fragment>
  );
}

export const categories = [
  { id: 'all', name: 'All Categories' },
  { id: 'furniture', name: 'Home Furniture' },
  { id: 'accessories', name: 'Accessories' },
  { id: 'clothing', name: 'Men\'s clothing' },
  { id: 'home', name: 'Home Improvement' },
  { id: 'kids', name: 'Kids & Babies' },
  { id: 'jewelry', name: 'Jewelries' },
  { id: 'electronics', name: 'Electronics' },
  { id: 'toys', name: 'Toys & Games' },
  { id: 'computers', name: 'Computers' },
  { id: 'luggage', name: 'Luggage & Bags' },
];
