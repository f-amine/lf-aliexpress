import React from 'react';
import { Right } from '@/components/ui/icons';
import { useRouter, useSearchParams } from 'next/navigation';

const productTypes = [
  { id: 'listed', name: 'Listed Products' },
  { id: 'imported', name: 'Imported Products' },
  { id: 'saved', name: 'Saved Products' },
];

export function ProductSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedType = searchParams.get('type') || 'listed'; // Default to listed
  
  const handleTypeSelect = (typeId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('type', typeId);
    router.push(`/products?${params.toString()}`);
  };
  
  return (
    <div className='flex w-[204px] py-4 items-center gap-1'>
      <ul className="flex flex-col items-start gap-1 flex-1 w-full">
        {productTypes.map((type) => (
          <li
            className={`flex pl-2 pr-1.5 py-1.5 items-center cursor-pointer gap-3 self-stretch rounded-xl w-full ${
                selectedType === type.id ? 'text-blue-100 bg-blue-100/10' : 'text-gray-900'
              }`}
            onClick={() => handleTypeSelect(type.id)}
            key={type.id}
          >
            <span className="flex items-center gap-3 flex-1">
              <TypeIcon
                typeId={type.id}
                className={`w-5 h-5 ${selectedType === type.id ? "text-blue-100" : "text-gray-900"}`}
              />
              <span className="text-sm grow">{type.name}</span>
              { selectedType !== type.id && (
                <Right className="w-4 h-4" />
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TypeIcon({ typeId, className = '' }: { typeId: string, className?: string }) {
  switch (typeId) {
    case 'listed':
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path d="M16.6667 5L7.5 14.1667L3.33333 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case 'imported':
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path d="M15.8335 10.8334H11.6668V15.0001H15.8335V10.8334Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8.33317 10.8334H4.1665V15.0001H8.33317V10.8334Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M15.8335 3.33337H11.6668V7.50004H15.8335V3.33337Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8.33317 3.33337H4.1665V7.50004H8.33317V3.33337Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case 'saved':
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path d="M15.8334 17.5L10.0001 13.3333L4.16675 17.5V4.16667C4.16675 3.72464 4.34234 3.30072 4.6549 2.98816C4.96746 2.67559 5.39139 2.5 5.83341 2.5H14.1667C14.6088 2.5 15.0327 2.67559 15.3453 2.98816C15.6578 3.30072 15.8334 3.72464 15.8334 4.16667V17.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    default:
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path d="M10 3.33337V16.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3.33325 10H16.6666" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
  }
}
