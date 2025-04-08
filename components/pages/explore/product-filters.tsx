'use client';
import React, { useState, useCallback } from 'react';
import { Select } from '@/components/ui/select';
import { AddToList, PushToStore } from '@/components/ui/icons';
import { Frame } from '@/components/ui/frame';
import { Search } from '@/components/ui/search';
import { Divider } from '@/components/ui/divider';
import { Checkbox } from '@/components/ui/checkbox';
import { SubAction } from '@/components/ui/sub-action';
import { useRouter, useSearchParams } from 'next/navigation';

export function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('keyword') || '');
  const [shipToCountry, setShipToCountry] = useState<string>(searchParams.get('shipToCountry') || '');
  
  const debouncedUpdateSearch = useCallback(
    (() => {
      let timeout: NodeJS.Timeout;
      return (value: string) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          updateSearchParams('keyword', value);
        }, 500);
      };
    })(),
    [searchParams]
  );
  
  const shipToOptions = [
    { label: 'Ship To', value: '' },
    { label: 'United States', value: 'US' },
    { label: 'Morocco', value: 'MA'},
    { label: 'United Kingdom', value: 'GB' },
    { label: 'Canada', value: 'CA' },
    { label: 'Australia', value: 'AU' },
    { label: 'Germany', value: 'DE' },
  ];
  
  const handleSelectChange = (value: string, type: string) => {
    if (!value) return;
    
    if (type === 'Ship To') {
      setShipToCountry(value);
      updateSearchParams('shipToCountry', value);
    }
  };
  
  const updateSearchParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    
    // Keep any other existing params (category, etc)
    router.push(`/explore?${params.toString()}`);
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedUpdateSearch(value);
  };
  
  const handleSelectAll = (checked: boolean) => {
    setSelectedItems(checked ? ['all'] : []);
  };
  
  return (
    <div className="flex pb-8 flex-col items-start gap-1 self-stretch">
      <Frame variant={'thin'}>
        <div className='flex flex-col lg:flex-row items-start gap-4 self-stretch'>
          <Search
            className='grow self-stretch'
            placeholder="Enter keywords to search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          
          <Select
            options={shipToOptions}
            value={shipToCountry}
            onChange={(value) => handleSelectChange(value, 'Ship To')}
          />
        </div>
        <Divider/>
        <div className='flex py-1 items-center self-stretch'>
          <Checkbox
            checked={selectedItems.includes('all')}
            onChange={(e) => handleSelectAll(e.target.checked)}
          />
          <div className='flex py-0.5 px-4 items-center self-stretch'>
            <span className='w-px self-stretch bg-neutral-300' />
          </div>
          <div className='flex items-center gap-6 flex-1 self-stretch'>
            <SubAction text='Push to store' icon={<PushToStore/>}/>
            <SubAction text='Add to my list' icon={<AddToList/>}/>
          </div>
        </div>
      </Frame>
    </div>
  );
}
