import { Skeleton } from '@/components/ui/skeleton';
import { Text } from '@/components/ui/text';
import React from 'react';

export function ProductCardSkeleton() {
  return (
    <div className='flex w-full pb-[112px] flex-col items-start rounded-[20px] border border-solid border-neutral-100 shadow-[0px_1px_4px_0px_rgba(9,39,83,0.08)] relative overflow-hidden'>
      <div className='relative flex h-[206px] w-full'>
        <Skeleton className="w-full h-full rounded-t-[20px]" />
      </div>
      <div className='flex py-4 px-3 flex-col items-center absolute bottom-0 border-t border-solid border-neutral-100 bg-white w-full'>
        <div className='flex flex-col items-start gap-2 self-stretch text-[13px] text-gray-900 leading-4 w-full'>
          <div className='flex items-center gap-1 self-stretch'>
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-full" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-3 w-12" />
          </div>
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </div>
  );
}

export function ProductSectionSkeleton({ title }: { title: string }) {
  return (
    <div className='flex pb-8 flex-col items-start self-stretch'>
      <div className='pb-6 flex items-start gap-2 self-stretch'>
        <span className='grow text-[20px] !leading-5 font-medium text-gray-900'>{title}</span>
        <Skeleton className="h-5 w-20" />
      </div>
      
      <div className="w-full relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array(4).fill(0).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ title }: { title: string }) {
  return (
    <div className='flex pb-8 flex-col items-start self-stretch'>
      <div className='pb-6 flex items-start gap-2 self-stretch'>
        <Text className='grow text-[20px] !leading-5' variant={'title'}>{title}</Text>
      </div>
      
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array(12).fill(0).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
      
      <div className="mt-8 self-center">
        <Skeleton className="h-10 w-72" />
      </div>
    </div>
  );
}
