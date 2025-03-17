'use client';

import { Fragment, useEffect, useState, useRef } from 'react';
import { graphql } from 'relay-runtime';
import { useLazyLoadQuery, useMutation } from 'react-relay';
import { Title } from '@/components/ui/title';
import { Frame } from '@/components/ui/frame';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Section } from '@/components/ui/section';
import { Checkbox } from '@/components/ui/checkbox';
import { Divider } from '@/components/ui/divider';
import { useSearchParams } from 'next/navigation';
import { CONNECTION_STATUS_QUERY } from '@/lib/queries';
import { DISCONNECT_MUTATION, UPDATE_CURRENCY_MUTATION, UPDATE_LANGUAGE_MUTATION } from '@/lib/mutations';
import { queriesConnectionStatusQuery } from '@/graphql/__generated__/queriesConnectionStatusQuery.graphql';
import Image from 'next/image';
import { Check } from '@/components/ui/icons';
import { useLocalStore } from '@/lib/utils';
import { FormGroup } from '@/components/ui/form-group';

const currencyOptions = [
  { label: 'USD - US Dollar', value: 'USD' },
  { label: 'EUR - Euro', value: 'EUR' },
  { label: 'GBP - British Pound', value: 'GBP' },
  { label: 'CAD - Canadian Dollar', value: 'CAD' },
  { label: 'AUD - Australian Dollar', value: 'AUD' },
  { label: 'JPY - Japanese Yen', value: 'JPY' },
  { label: 'CNY - Chinese Yuan', value: 'CNY' },
];

const languageOptions = [
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

export default function SettingsPage() {
  const searchParams = useSearchParams();
  const data = useLazyLoadQuery<queriesConnectionStatusQuery>(CONNECTION_STATUS_QUERY, {});
  const initialDataLoaded = useRef(false);

  // Get initial values from the query
  const aliSettings = data?.connectionStatus?.aliexpress;
  const initialConnected = aliSettings?.connected || false;
  const initialCurrency = aliSettings?.currency || 'USD';
  const initialLanguage = aliSettings?.language || 'EN';

  const [state, onChange] = useLocalStore({
    notification: null as { type: 'success' | 'error'; message: string } | null,
    connected: initialConnected,
    inventoryTracking: true,
    autoPrice: true,
    currency: initialCurrency,
    language: initialLanguage,
    supplierAccountId: 'ma36259867363dgbae',
    initialValues: {
      currency: initialCurrency,
      language: initialLanguage,
      inventoryTracking: true,
      autoPrice: true
    }
  });

  const [updateLanguage, isUpdatingLanguage] = useMutation(UPDATE_LANGUAGE_MUTATION);
  const [updateCurrency, isUpdatingCurrency] = useMutation(UPDATE_CURRENCY_MUTATION);
  const [disconnect, isDisconnecting] = useMutation(DISCONNECT_MUTATION);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Handle notification params
    const connection = searchParams.get('connection');
    const error = searchParams.get('error');

    if (connection === 'success') {
      onChange('notification', {
        type: 'success',
        message: 'Successfully connected to AliExpress!',
      });
    } else if (error) {
      let errorMessage = 'Failed to connect to AliExpress.';

      switch (error) {
        case 'missing_code':
          errorMessage = 'Authorization code is missing from the callback.';
          break;
        case 'token_exchange':
          errorMessage = 'Failed to exchange authorization code for access token.';
          break;
        default:
          errorMessage = 'An unexpected error occurred during AliExpress connection.';
      }

      onChange('notification', {
        type: 'error',
        message: errorMessage,
      });
    }
  }, [searchParams, onChange]);

  const handleSaveChanges = () => {
    setIsSaving(true);
    const promises = [];

    // Check if language changed
    if (state.language !== state.initialValues.language) {
      promises.push(
        new Promise((resolve, reject) => {
          updateLanguage({
            variables: { language: state.language },
            onCompleted: () => {
              onChange(['initialValues', 'language'], state.language);
              resolve(true);
            },
            onError: (error) => {
              reject(error);
            }
          });
        })
      );
    }

    // Check if currency changed
    if (state.currency !== state.initialValues.currency) {
      promises.push(
        new Promise((resolve, reject) => {
          updateCurrency({
            variables: { currency: state.currency },
            onCompleted: () => {
              onChange(['initialValues', 'currency'], state.currency);
              resolve(true);
            },
            onError: (error) => {
              reject(error);
            }
          });
        })
      );
    }

    // Process all promises
    if (promises.length > 0) {
      Promise.all(promises)
        .then(() => {
          onChange('notification', {
            type: 'success',
            message: 'Settings updated successfully!'
          });
          setIsSaving(false);
        })
        .catch(() => {
          onChange('notification', {
            type: 'error',
            message: 'Failed to update settings.'
          });
          setIsSaving(false);
        });
    } else {
      setIsSaving(false);
    }
  };

  const handleDisconnect = () => {
    disconnect({
      variables: {},
      onCompleted: () => {
        onChange('connected', false);
        onChange('notification', {
          type: 'success',
          message: 'Successfully disconnected from AliExpress!'
        });
      },
      onError: () => {
        onChange('notification', {
          type: 'error',
          message: 'Failed to disconnect from AliExpress.'
        });
      }
    });
  };

  const hasChanges = 
    state.language !== state.initialValues.language || 
    state.currency !== state.initialValues.currency;

  return (
    <Fragment>
      <Title 
        actions={
          <Button
            onClick={handleSaveChanges}
            disabled={!hasChanges || isSaving}
            loading={isSaving}
          >
            Save Changes
          </Button>
        }
      >
        Settings
      </Title>

      {state.notification && (
        <div className={`mb-4 p-4 rounded-lg ${state.notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {state.notification.message}
        </div>
      )}

      <div className='flex flex-col items-start gap-5 self-stretch'>
        <Section title="AliExpress supplier">
          <Frame size="large" variant={'white'}>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-4">
                <Image src="/Aliexpress.svg" alt="AliExpress" height={32} width={32} />
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    {state.connected && (
                      <div className="w-5 h-5 rounded-full bg-teal-400 flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                    <Text size={'regular'} className='text-gray-900 font-medium'>AliExpress</Text>
                  </div>
                  {state.connected && (
                    <div className='flex items-center gap-2'>
                      <Text>Supplier account ID:</Text>
                      <Text className='text-gray-900 underline'>{state.supplierAccountId}</Text>
                    </div>
                  )}
                </div>
              </div>

              {state.connected ? (
                <Button
                  variant="destructive"
                  onClick={handleDisconnect}
                  loading={isDisconnecting}
                >
                  Disconnect
                </Button>
              ) : (
                <Button
                  variant="default"
                  onClick={() => window.location.href = "/connection"}
                >
                  Connect
                </Button>
              )}
            </div>

            {state.connected && (
              <Fragment>
                <Divider/>

                <div className="flex flex-col gap-4 w-full">
                  <Checkbox
                    checked={state.inventoryTracking}
                    onChange={(event) => {
                      onChange(['inventoryTracking'], event.target.checked);
                    }}
                    label={
                      <div className="flex flex-col">
                        <span className="font-medium">Enable tracking inventory for this product</span>
                        <span className="text-gray-500 text-sm">Automatically update inventory for pushed product</span>
                      </div>
                    }
                  />

                  <Checkbox
                    checked={state.autoPrice}
                    onChange={(event) => {
                      onChange(['autoPrice'], event.target.checked);
                    }}
                    label={
                      <div className="flex flex-col">
                        <span className="font-medium">Automatic price update</span>
                        <span className="text-gray-500 text-sm">Automatically update the price of the product when it changes on AliExpress</span>
                      </div>
                    }
                  />
                </div>
              </Fragment>
            )}
            <div className='flex flex-col items-start gap-2 self-stretch'>
              <FormGroup label="Default language">
                <Select
                  value={state.language}
                  onChange={value => onChange(['language'], value)}
                  options={languageOptions}
                  disabled={!state.connected || isUpdatingLanguage}
                />
              </FormGroup>
              <Text>Choose your preferred language to view and import your products from AliExpress.</Text>
            </div>
          </Frame>
        </Section>
        
        <Divider/>

        <Section title="Currency">
          <Text className='max-w-[620px]'>Select the currency that will be used for your product prices and orders in your Lightfunnels store settings to avoid discrepancies.</Text>
          <FormGroup title='Account currency'>
            <Select
              value={state.currency}
              onChange={value => onChange(['currency'], value)}
              options={currencyOptions}
              disabled={!state.connected || isUpdatingCurrency}
            />
          </FormGroup>
        </Section>
      </div>
    </Fragment>
  );
}
