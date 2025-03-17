import { connectAliexpressGetAuthUrlMutation } from "@/graphql/__generated__/connectAliexpressGetAuthUrlMutation.graphql";
import { Avatar } from "../ui/avatar";
import { Button } from "../ui/button";
import { Frame } from "../ui/frame";
import { Plus, Products } from "../ui/icons";
import { NativeLink } from "../ui/link";
import { Text } from "../ui/text";
import { useState } from "react";
import { useMutation } from "react-relay";
import { graphql } from "relay-runtime";

const GET_AUTH_URL_MUTATION = graphql`
  mutation connectAliexpressGetAuthUrlMutation {
    getAliexpressAuthUrl {
      authorizationUrl
    }
  }
`;

interface ConnectWithAliExpressProps {
  settings: {
    connected: boolean;
    currency: string;
    language: string;
  };
  updateSettings: (key: string, value: any) => void;
}

const ConnectWithAliExpress: React.FC<ConnectWithAliExpressProps> = ({ settings, updateSettings }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  
  const [getAuthUrl] = useMutation<connectAliexpressGetAuthUrlMutation>(GET_AUTH_URL_MUTATION);
  const handleConnect = () => {
    setIsConnecting(true);
    
    getAuthUrl({
      variables: {},
      onCompleted: (response) => {
        if (response.getAliexpressAuthUrl?.authorizationUrl) {
          window.location.href = response.getAliexpressAuthUrl.authorizationUrl;
        } else {
          console.error('Failed to get authorization URL');
          setIsConnecting(false);
        }
      },
      onError: (error) => {
        console.error('Error starting AliExpress connection process:', error);
        setIsConnecting(false);
      }
    });
  };
  
  return (
    <>
      <div className='flex flex-col items-start gap-3 self-stretch'>
        <Text variant='title'>1. Connect your suppliers</Text>
        <Text>Link your AliExpress account to start importing products and processing orders seamlessly.</Text>
      </div>
      
      <Frame direction='row' variant='white' size='large'>
        <Avatar className='w-8' src={'/Aliexpress.svg'} fallback="AE" />
        <div className='flex flex-col items-start gap-2 flex-1'>
          <Text className='text-gray-900 font-medium'>Connect with AliExpress</Text>
          <Text>Sync products, manage orders, and automate fulfillment.</Text>
        </div>
        <Button onClick={handleConnect} disabled={isConnecting || settings.connected}>
          {settings.connected ? 'Connected' : (
            <>
              <Plus className='w-5 h-5 my-auto'/>
              {isConnecting ? 'Connecting...' : 'Connect'}
            </>
          )}
        </Button>
      </Frame>
      
      <NativeLink href={'https://aliexpress.com/register'} target="_blank" className="flex items-center gap-2">
        <Products className='text-blue-200'/>
        <span className='leading-5 font-medium'>Don't have AliExpress account?</span>
      </NativeLink>
    </>
  );
};

export default ConnectWithAliExpress;
