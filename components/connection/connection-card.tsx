'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Divider } from '@/components/ui/divider';
import { Text } from '@/components/ui/text';
import { Check, Plus } from '@/components/ui/icons';
import { useRouter } from 'next/navigation';
import { Avatar } from '../ui/avatar';
import ConnectWithAliExpress from './connect-aliexpress';
import SelectCurrency from './select-currency';
import { useLazyLoadQuery } from 'react-relay';
import { CONNECTION_STATUS_QUERY } from '@/lib/queries';
import { queriesConnectionStatusQuery } from '@/graphql/__generated__/queriesConnectionStatusQuery.graphql';
import ChooseLanguage from './select-language';

const SetupWizard = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [settings, setSettings] = useState({
    connected: false,
    currency: 'USD',
    language: 'EN'
  });

  const data = useLazyLoadQuery<queriesConnectionStatusQuery>(
    CONNECTION_STATUS_QUERY,
    {}
  );

  useEffect(() => {
    if (data?.connectionStatus?.aliexpress) {
      const aliSettings = data.connectionStatus.aliexpress;
      
      // Set connected status
      const isConnected = aliSettings.connected;
      
      setSettings(prev => ({
        ...prev,
        connected: isConnected,
        currency: aliSettings.currency || 'USD', 
        language: aliSettings.language || 'EN' 
      }));
      
      // Determine which step to show based on completion status
      if (isConnected) {
        if (aliSettings.currency && aliSettings.language) {
          setCurrentStep(3);
        } else if (aliSettings.currency) {
          setCurrentStep(3);
        } else {
          setCurrentStep(2);
        }
      }
    }
  }, [data]);

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // If on the last step and language is not null, redirect to /overview
      if (settings.language) {
        router.push('/overview');
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateSettings = (key: string, value: any) => {
    setSettings({
      ...settings,
      [key]: value
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <ConnectWithAliExpress settings={settings} updateSettings={updateSettings} />;
      case 2:
        return <SelectCurrency settings={settings} updateSettings={updateSettings} />;
      case 3:
        return <ChooseLanguage settings={settings} updateSettings={updateSettings} />;
      default:
        return null;
    }
  };

  const isNextDisabled = () => {
    switch (currentStep) {
      case 1:
        return !settings.connected;
      case 2:
        return !settings.currency;
      case 3:
        return !settings.language;
      default:
        return false;
    }
  };

  return (
    <div className="flex items-start rounded-3xl bg-white shadow-[0px_1px_4px_0px_rgba(9,39,83,0.12)]">
      <div className='flex w-[260px] py-8 px-5 flex-col items-start gap-8 self-stretch shadow-[1px_0px_0px_0px_#E6EAEF]'>
        <div className='flex flex-col items-start gap-3 self-stretch'>
          <div className='flex items-center gap-2'>
            <Avatar className='w-7' src={'/favIcon-lf.svg'} fallback="LF" />
            <Plus className='w-4 h-4' />
            <Avatar className='w-7' src={'/Aliexpress.svg'} fallback="AE" />
          </div>
          <Text>Import products, automate order fulfillment, and manage bulk orders within your Lightfunnels store.</Text>
        </div>
        <div className='flex flex-col items-start self-stretch'>
          {/* Step 1 */}
          <div className={`flex py-2 items-start gap-3 self-stretch ${currentStep > 1 ? 'opacity-50' : ''}`}>
            <div className={`flex w-5 h-5 p-1 self-stretch justify-center items-center rounded-3xl 
              ${currentStep > 1 
                ? 'bg-blue-100' 
                : currentStep === 1 
                  ? 'shadow-[0px_0px_0px_1px_#0085FF_inset,_0px_0px_0px_1px_#0085FF]' 
                  : 'shadow-[0px_0px_0px_1px_#D3DAE4_inset]'
              } 
              text-xs font-semibold leading-4 text-center`}>
              {currentStep > 1 ? <Check className='w-3 h-3 text-white' /> : '1'}
            </div>
            <span className={`text-[13px] font-medium ${currentStep > 1 ? '' : currentStep < 1 ? 'text-gray-500' : ''}`}>
              Connect with AliExpress
            </span>
          </div>
          
          {/* Step 2 */}
          <div className={`flex py-2 items-start gap-3 self-stretch ${currentStep > 2 ? 'opacity-50' : ''}`}>
            <div className={`flex w-5 h-5 self-stretch justify-center items-center rounded-3xl 
              ${currentStep > 2 
                ? 'bg-blue-100' 
                : currentStep === 2 
                  ? 'shadow-[0px_0px_0px_1px_#0085FF_inset,_0px_0px_0px_1px_#0085FF]' 
                  : 'shadow-[0px_0px_0px_1px_#D3DAE4_inset]'
              } 
              text-xs font-semibold leading-4 text-center`}>
              {currentStep > 2 ? <Check className='w-3 h-3 text-white' /> : '2'}
            </div>
            <span className={`text-[13px] font-medium ${currentStep > 2 ? '' : currentStep < 2 ? 'text-gray-500' : ''}`}>
              Select Currency
            </span>
          </div>
          
          {/* Step 3 */}
          <div className='flex py-2 items-start gap-3 self-stretch'>
            <div className={`flex w-5 h-5 self-stretch justify-center items-center rounded-3xl 
              ${currentStep > 3 
                ? 'bg-blue-100' 
                : currentStep === 3 
                  ? 'shadow-[0px_0px_0px_1px_#0085FF_inset,_0px_0px_0px_1px_#0085FF]' 
                  : 'shadow-[0px_0px_0px_1px_#D3DAE4_inset]'
              } 
              text-xs font-semibold leading-4 text-center`}>
              {currentStep > 3 ? <Check className='w-3 h-3 text-white' /> : '3'}
            </div>
            <span className={`text-[13px] font-medium ${currentStep > 3 ? '' : currentStep < 3 ? 'text-gray-500' : ''}`}>
              Choose Language
            </span>
          </div>
        </div>
      </div>
      
      <div className='flex w-[720px] pt-[60px] pb-8 px-8 flex-col items-start gap-8'>
        {renderStep()}
        
        <Divider />
        
        <div className='flex justify-between items-center self-stretch'>
          <Button 
            variant='secondary'
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          <Button 
            onClick={handleNext}
            disabled={isNextDisabled()}
          >
            {currentStep === 3 ? 'Finish' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SetupWizard;
