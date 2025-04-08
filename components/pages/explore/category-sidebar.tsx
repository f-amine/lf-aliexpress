import React, { useState } from 'react';
import { Right } from '@/components/ui/icons';
import { useRouter, useSearchParams } from 'next/navigation';
import { CategoryIcon } from './category-icons';
import { categories } from '@/app/(app)/explore/page';

export function CategorySidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('category') || 'all';
  
  const handleCategorySelect = (categoryId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('category', categoryId);
    router.push(`/explore?${params.toString()}`);
  };
  
  return (
    <div className='flex w-[204px] py-4 items-center gap-1'>
      <ul className="flex flex-col items-start gap-1 flex-1">
        {categories.map((category) => (
          <li
            className={`flex pl-2 pr-1.5 py-1.5 items-center cursor-pointer gap-3 self-stretch rounded-xl ${
                selectedCategory === category.id ? 'text-blue-100 bg-blue-100/10' : 'text-gray-900'
              }`}
            onClick={() => handleCategorySelect(category.id)}
            key={category.id}
          >
          <span className="flex items-center gap-3 flex-1">
            <CategoryIcon
              iconType={category.id}
              className={`w-5 h-5 ${selectedCategory === category.id ? "text-blue-100" : "text-gray-900"}`}
            />
            <span className="text-sm grow">{category.name}</span>
            { selectedCategory !== category.id && (
              <Right className="w-4 h-4" />
              )
            }
          </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
