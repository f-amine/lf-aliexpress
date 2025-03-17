'use client';

import { Fragment, useState } from 'react';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Frame } from '@/components/ui/frame';
import { Select } from '@/components/ui/select';
import { Title } from '@/components/ui/title';
import { StatsCard } from '@/components/ui/stats-card';
import { AwaitingPaymentIcon, CanceledIcon, DeliveredIcon, FailedIcon, OrdersIcon, PaymentsIcon, PendingIcon, ProfitIcon, Refresh, ShippedIcon } from '@/components/ui/icons';
import { Section } from '@/components/ui/section';
import { TopSellingProducts } from '@/components/pages/overview/top-products';

// Define the time range options
const timeRangeOptions = [
  { label: 'Today', value: 'today' },
  { label: 'Yesterday', value: 'yesterday' },
  { label: 'Last 7 days', value: 'last_7_days' },
  { label: 'Last 30 days', value: 'last_30_days' },
  { label: 'This month', value: 'this_month' },
  { label: 'Last month', value: 'last_month' },
]

const mockProducts = [
  {
    id: '1',
    rank: 1,
    name: 'Trendy Infant Footwear - Soft and Cozy',
    imageUrl: '/products/infant-footwear.jpg',
    cost: 24.99,
    salesVolume: 9011.84,
    netProfit: 448.31
  },
  {
    id: '2',
    rank: 2,
    name: 'Warm Baby Booties - Ideal for Tiny Toes',
    imageUrl: '/products/baby-booties.jpg',
    cost: 19.99,
    salesVolume: 8593.96,
    netProfit: 412.90
  },
  {
    id: '3',
    rank: 3,
    name: 'Cute Infant Sandals - Soft and Fashionable',
    imageUrl: '/products/infant-sandals.jpg',
    cost: 25.00,
    salesVolume: 8421.02,
    netProfit: 408.71
  },
  {
    id: '4',
    rank: 4,
    name: 'Adorable Toddler Sandals - Perfect for Warm Days',
    imageUrl: '/products/toddler-sandals.jpg',
    cost: 28.99,
    salesVolume: 8402.04,
    netProfit: 400.06
  },
  {
    id: '5',
    rank: 5,
    name: 'Cozy Baby Slippers - Perfect for Infants',
    imageUrl: '/products/baby-slippers.jpg',
    cost: 22.50,
    salesVolume: 8284.26,
    netProfit: 393.11
  }
];
export default function OverviewPage() {
  const [timeRange, setTimeRange] = useState('today');
  
  const [products, setProducts] = useState<any[]>([]);
  const mainStats = [
    {
      name: 'Orders',
      icon: <OrdersIcon className="w-full h-full" />,
      color: 'text-blue-200',
      value: '0',
      growth: 0,
    },
    {
      name: 'Payments',
      icon: <PaymentsIcon className="w-full h-full" />,
      color: 'text-green-500',
      value: '0 USD',
      growth: 0,
    },
    {
      name: 'Net Profit',
      icon: <ProfitIcon className="w-full h-full" />,
      color: 'text-teal-400',
      value: '0 USD',
      growth: 0,
    }
  ];
  
  const orderStats = [
    {
      name: 'Pending',
      iconName: 'icon-clock',
      icon: <PendingIcon/>,
      color: 'text-blue-200',
      value: '0',
      growth: 0,
    },
    {
      name: 'Awaiting Payment',
      icon: <AwaitingPaymentIcon/>,
      color: 'text-orange-500',
      value: '0',
      growth: 0,
    },
    {
      name: 'Shipped',
      icon: <ShippedIcon/>,
      color: 'text-green-500',
      value: '0',
      growth: 0,
    }
  ];
  
  const additionalOrderStats = [
    {
      name: 'Delivered',
      icon: <DeliveredIcon/>,
      color: 'text-teal-400',
      value: '0',
      growth: 0,
    },
    {
      name: 'Canceled',
      icon: <CanceledIcon/>,
      color: 'text-gray-500',
      value: '0',
      growth: 0,
    },
    {
      name: 'Failed',
      icon: <FailedIcon/>,
      color: 'text-red-500',
      value: '0',
      growth: 0,
    }
  ];

  const toggleProductsView = () => {
    setProducts(products.length ? [] : mockProducts);
  };
  return (
    <Fragment>
      <Title 
        subTitle="👋 Here's what's happening with your account."
        actions={
          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              onClick={() => console.log('Refreshing data...')}
            >
              <Refresh className="w-5 h-5" />
              Refresh
            </Button>
            <Select
              value={timeRange}
              onChange={(value) => setTimeRange(value)}
              options={timeRangeOptions}
            />
          </div>
        }
      >
        Overview
      </Title>
      
      <div className='flex flex-col items-start gap-5 self-stretch'>
        <Frame size={'large'} className='px-6'>
          <StatsCard componentData={mainStats} />
        </Frame>
      
        <Section bodyClassName='!gap-8' title='Orders stats'>
          <StatsCard componentData={orderStats} />
          <StatsCard componentData={additionalOrderStats} />
        </Section>
        <Section title='Top selling products'>
                <div className="mb-4 flex justify-end">
        <Button variant="secondary" onClick={toggleProductsView}>
          {products.length ? 'Show Empty State' : 'Show Products'}
        </Button>
      </div>
          <TopSellingProducts products={products} />
        </Section>
      </div>
    </Fragment>
  );
}

// Icons
function RefreshIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
      <path d="M21 3v5h-5"></path>
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
      <path d="M8 16H3v5"></path>
    </svg>
  );
}

function Calendar(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
      <line x1="16" x2="16" y1="2" y2="6"></line>
      <line x1="8" x2="8" y1="2" y2="6"></line>
      <line x1="3" x2="21" y1="10" y2="10"></line>
    </svg>
  );
}

function DocumentIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <line x1="10" y1="9" x2="8" y2="9"></line>
    </svg>
  );
}
