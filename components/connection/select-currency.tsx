'use client';

import React, { useState } from 'react';
import { Text } from '@/components/ui/text';
import { Select } from '@/components/ui/select';
import { useMutation } from 'react-relay';
import { UPDATE_CURRENCY_MUTATION } from '@/lib/mutations';
import { mutationsCurrencyUpdateMutation } from '@/graphql/__generated__/mutationsCurrencyUpdateMutation.graphql';

interface SelectCurrencyProps {
  settings: {
    connected: boolean;
    currency: string;
    language: string;
  };
  updateSettings: (key: string, value: any) => void;
}

const currencies = [
  { label: 'USD - US Dollar', value: 'USD' },
  { label: 'EUR - Euro', value: 'EUR' },
  { label: 'GBP - British Pound', value: 'GBP' },
  { label: 'CAD - Canadian Dollar', value: 'CAD' },
  { label: 'AUD - Australian Dollar', value: 'AUD' },
  { label: 'JPY - Japanese Yen', value: 'JPY' },
  { label: 'CNY - Chinese Yuan', value: 'CNY' },
];

const SelectCurrency: React.FC<SelectCurrencyProps> = ({ settings, updateSettings }) => {
  const [updating, setUpdating] = useState(false);
  const [updateCurrency] = useMutation<mutationsCurrencyUpdateMutation>(UPDATE_CURRENCY_MUTATION);

  const handleCurrencyChange = (value: string) => {
    setUpdating(true);
    
    updateSettings('currency', value);
    
    updateCurrency({
      variables: {
        currency: value
      },
      onCompleted: () => {
        setUpdating(false);
      },
      onError: (error) => {
        console.error('Error updating currency:', error);
        setUpdating(false);
      }
    });
  };

  return (
    <>
      <div className='flex flex-col items-start gap-3 self-stretch'>
        <Text variant={'title'}>2. Choose Your Store Currency</Text>
        <Text>
          Select the currency that will be used for your product prices and orders in your Lightfunnels store.
          Make sure it matches your store settings to avoid discrepancies.
        </Text>
      </div>
      
      <div className='flex flex-col gap-4 self-stretch'>
        <label className="block text-sm font-medium text-gray-700">
          Select currency
        </label>
        <Select
          options={currencies}
          value={settings.currency}
          onChange={handleCurrencyChange}
          className="w-full"
          disabled={updating}
        />
        
        <Text className="text-sm text-gray-500 italic">
          {updating ? 'Updating...' : 'You can update this at any time in your settings.'}
        </Text>
      </div>
    </>
  );
};

export default SelectCurrency;
