import React, { useState } from 'react';
import Image from 'next/image';
import { Checkbox } from '@/components/ui/checkbox';
import { Divider } from '@/components/ui/divider';
import { useMutation } from 'react-relay';
import { FAVORITE_PRODUCT_MUTATION, UNFAVORITE_PRODUCT_MUTATION } from '@/lib/mutations';
import { mutationsFavoriteProductMutation } from '@/graphql/__generated__/mutationsFavoriteProductMutation.graphql';
import { mutationsUnfavoriteProductMutation } from '@/graphql/__generated__/mutationsUnfavoriteProductMutation.graphql';
import ProductImportModal from './product-import-modal';

export type Product = {
  id: string;
  title: string;
  price: number;
  salePrice: number;
  rating: number;
  imageUrl: string;
  supplier?: string;
  shipping?: string;
  orders?: string | number;
  productUrl?: string;
  aliexpressItemId?: string;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [selected, setSelected] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // We use the aliexpressItemId if available, otherwise use the regular id
  const itemId = product.aliexpressItemId || product.id;
  
  // Set up mutations
  const [commitFavorite, isFavoriteInFlight] = useMutation<mutationsFavoriteProductMutation>(
    FAVORITE_PRODUCT_MUTATION
  );
  
  const [commitUnfavorite, isUnfavoriteInFlight] = useMutation<mutationsUnfavoriteProductMutation>(
    UNFAVORITE_PRODUCT_MUTATION
  );
  
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 ${
              star <= Math.floor(rating) 
                ? 'text-yellow-400' 
                : star - 0.5 <= rating 
                  ? 'text-yellow-300' 
                  : 'text-gray-300'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };
  
  const handleHeartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFavoriteInFlight || isUnfavoriteInFlight) return;
    
    if (favorite) {
      // Unfavorite the product
      commitUnfavorite({
        variables: {
          aliexpressItemId: itemId
        },
        onCompleted: (response) => {
          if (response.unfavoriteProduct?.success) {
            setFavorite(false);
          } else {
            console.error('Failed to unfavorite product:', response.unfavoriteProduct?.error);
          }
        },
        onError: (error) => {
          console.error('Error unfavoriting product:', error);
        }
      });
    } else {
      const productData = {
        title: product.title,
        imageUrl: product.imageUrl,
        itemMainPic: product.imageUrl,
        price: product.price,
        salePrice: product.salePrice,
        targetOriginalPrice: product.price.toString(),
        targetSalePrice: product.salePrice.toString(),
        orders: product.orders?.toString() || '0',
        rating: product.rating.toString(),
        score: product.rating.toString(),
        shipping: product.shipping || 'Varies',
        productUrl: product.productUrl,
        itemUrl: product.productUrl
      };
      
      commitFavorite({
        variables: {
          aliexpressItemId: itemId,
          productData: JSON.stringify(productData)
        },
        onCompleted: (response) => {
          if (response.favoriteProduct?.success) {
            setFavorite(true);
          } else {
            console.error('Failed to favorite product:', response.favoriteProduct?.error);
          }
        },
        onError: (error) => {
          console.error('Error favoriting product:', error);
        }
      });
    }
  };

  const handlePlusClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsModalOpen(true);
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setSelected(e.target.checked);
  };
  
  const handleCardClick = () => {
    if (product.productUrl) {
      window.open(product.productUrl, '_blank');
    }
  };

  // Dynamically set card styles based on selection state
  const cardContainerClasses = `
    flex w-full pb-[92px] flex-col items-start rounded-[20px] 
    relative overflow-hidden transition-all duration-200
    ${product.productUrl ? 'cursor-pointer' : ''}
    ${selected 
      ? 'border border-solid border-blue-200 shadow-[0px_0px_0px_1px_#0085FF,0px_0px_0px_5px_rgba(0,133,255,0.10)]' 
      : 'border border-solid border-neutral-100 shadow-[0px_1px_4px_0px_rgba(9,39,83,0.08)]'}
  `;

  return (
    <>
      <div 
        className={cardContainerClasses}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCardClick}
      >
        <div className='relative flex h-[206px] w-full'>
          <div className='absolute top-2 left-2 z-[1] inline-flex items-start gap-2'>
            <button
              onClick={handlePlusClick}
              className="flex p-1.5 items-start rounded-full bg-gray-900/70 shadow-[0px_0px_20px_0px_rgba(32,32,35,0.15)] cursor-pointer"
            >
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 20 20" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-white"
              >
                <path 
                  d="M10 5V15" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M5 10H15" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              onClick={handleHeartClick}
              className={`flex p-1.5 items-start rounded-full bg-gray-900/70 shadow-[0px_0px_20px_0px_rgba(32,32,35,0.15)] cursor-pointer ${
                isFavoriteInFlight || isUnfavoriteInFlight ? 'opacity-50' : ''
              }`}
              disabled={isFavoriteInFlight || isUnfavoriteInFlight}
            >
              <svg
                className={`w-5 h-5 ${favorite ? 'text-red-500' : 'text-white'}`}
                fill={favorite ? 'currentColor' : 'none'}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>
          
          <div className="absolute top-2 right-2 z-[1] flex space-x-2" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center">
              <Checkbox
                checked={selected}
                onChange={handleCheckboxChange}
                label={<span className="sr-only">Select product</span>}
              />
            </div>
          </div>
          
          {product.imageUrl && (
            <Image
              src={product.imageUrl}
              alt={product.title}
              fill
              className="object-cover rounded-t-[20px]"
              sizes="206px"
            />
          )}
        </div>
        
        <div className='flex py-4 px-3 flex-col items-center absolute bottom-0 border-t border-solid border-neutral-100 bg-white w-full'>
          <div className='flex flex-col items-start gap-2 self-stretch text-[13px] text-gray-900 leading-4'>
            <div className='flex items-center gap-1 self-stretch'>
              <Image src={'/Aliexpress.svg'} width={16} height={16} alt='aliexpress'/>
              <span className='flex-1 text-ellipsis overflow-hidden whitespace-nowrap'>{product.title}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className='font-medium'>${product.salePrice.toFixed(2)}</span>
              {product.price > product.salePrice && (
                <span className="text-gray-500 line-through text-xs">${product.price.toFixed(2)}</span>
              )}
            </div>
            {renderStars(product.rating)}
            
            {isHovered && (
              <>
                <Divider padding='py-3'/>
                <div className='flex flex-col items-start gap-2 w-full'>
                  <div className='flex items-center justify-between w-full'>
                    <span className="text-gray-500">Orders</span>
                    <span className="font-medium">{product.orders}</span>
                  </div>
                  <div className='flex items-center justify-between w-full'>
                    <span className="text-gray-500">Shipping</span>
                    <span className="font-medium">{product.shipping}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      
      <ProductImportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={product}
      />
    </>
  );
}
