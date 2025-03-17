import React from 'react';
import Image from 'next/image';
import { Text } from '@/components/ui/text';
import { Frame } from '@/components/ui/frame';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from '@/components/ui/table';

type Product = {
  id: string;
  rank: number;
  name: string;
  imageUrl: string;
  cost: number;
  salesVolume: number;
  netProfit: number;
};

type TopSellingProductsProps = {
  products: Product[];
  isLoading?: boolean;
};

export function TopSellingProducts({ products, isLoading = false }: TopSellingProductsProps) {
  const hasProducts = products.length > 0;

  return (
    <div className="w-full">
      {isLoading ? (
        <Frame variant="white" size="large" className="flex justify-center items-center min-h-[300px]">
          <div className="animate-spin w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full"></div>
        </Frame>
      ) : hasProducts ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]">Rank</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Cost</TableHead>
              <TableHead>Sales Volume</TableHead>
              <TableHead className="text-right">Net Profit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">#{product.rank}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <div className="relative w-12 h-12 rounded overflow-hidden mr-3 flex-shrink-0 border border-gray-200">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <span className="font-medium">{product.name}</span>
                  </div>
                </TableCell>
                <TableCell>${product.cost.toFixed(2)}</TableCell>
                <TableCell>{product.salesVolume.toLocaleString()} USD</TableCell>
                <TableCell className="text-right text-blue-100 font-medium">{product.netProfit.toFixed(2)} USD</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-6 text-center self-stretch">
          <Image
            src="/icons/empty-state-product.svg"
            alt="No products"
            width={156}
            height={156}
            priority
            className="mb-6"
          />
          <div className='flex max-w-[480px] flex-col items-center gap-3 self-stretch mx-auto'>
            <Text size={'large'} className="text-gray-900">Currently, no top-selling products are available.</Text>
            <Text className="text-center">
              Once you start receiving orders, you will be able to see which product are
              generating the most sales.
            </Text>
          </div>
        </div>
      )}
    </div>
  );
}
