'use client';

import React, { useState } from 'react';
import { Text } from '@/components/ui/text';
import { Select } from '@/components/ui/select';
import { useMutation } from 'react-relay';
import { UPDATE_LANGUAGE_MUTATION } from '@/lib/mutations';
import { mutationsLanguageUpdateMutation } from '@/graphql/__generated__/mutationsLanguageUpdateMutation.graphql';

interface ChooseLanguageProps {
  settings: {
    connected: boolean;
    currency: string;
    language: string;
  };
  updateSettings: (key: string, value: any) => void;
}

const languages = [
  { label: 'English', value: 'EN' },
  { label: 'Spanish', value: 'ES' },
  { label: 'French', value: 'FR' },
  { label: 'German', value: 'DE' },
  { label: 'Italian', value: 'IT' },
  { label: 'Portuguese', value: 'PT' },
  { label: 'Dutch', value: 'NL' },
  { label: 'Russian', value: 'RU' },
  { label: 'Chinese', value: 'ZH' },
];


const ChooseLanguage: React.FC<ChooseLanguageProps> = ({ settings, updateSettings }) => {
  const [updating, setUpdating] = useState(false);
  const [updateLanguage] = useMutation<mutationsLanguageUpdateMutation>(UPDATE_LANGUAGE_MUTATION);

  const handleLanguageChange = (value: string) => {
    setUpdating(true);
    
    updateSettings('language', value);
    
    updateLanguage({
      variables: {
        language: value
      },
      onCompleted: () => {
        setUpdating(false);
      },
      onError: (error) => {
        console.error('Error updating language:', error);
        setUpdating(false);
      }
    });
  };

  return (
    <>
      <div className='flex flex-col items-start gap-3 self-stretch'>
        <Text variant={'title'}>3. Set Your Default Language</Text>
        <Text>
          Select the language that will be used for your product descriptions and orders in your Lightfunnels store.
          Make sure it matches your store settings to avoid discrepancies.
        </Text>
      </div>
      
      <div className='flex flex-col gap-4 self-stretch'>
        <label className="block text-sm font-medium text-gray-700">
          Select language
        </label>
        <Select
          options={languages}
          value={settings.language}
          onChange={handleLanguageChange}
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

export default ChooseLanguage;

