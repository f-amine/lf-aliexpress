import { Text } from '@/components/ui/text';
import { Tabs } from '@/components/ui/tabs';
import { Title } from '@/components/ui/title';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <div className="container mx-auto py-8 px-4">
      <Title subTitle='Import products, automate order fulfillment, and manage bulk
        orders within your Lightfunnels store.'
      >AliExpress</Title>
      <Text>
        
      </Text>
      <Tabs
        items={[
          {
            label: 'Overview',
            link: '/overview',
            exact: true,
          },
          {
            label: 'Explore',
            link: '/explore',
            exact: true,
          },
          {
            label: 'Products',
            link: '/products',
            exact: true,
          },
          {
            label: 'Orders',
            link: '/orders',
            exact: true,
          },
          {
            label: 'Settings',
            link: '/settings',
            exact: true,
          },
        ]}
      />
      <div className="mt-2">
        {children}
      </div>
    </div>
  );
}
