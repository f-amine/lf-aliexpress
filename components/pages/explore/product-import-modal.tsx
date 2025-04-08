import React, { useState, useEffect, Suspense } from 'react';
import { Modal } from '@/components/ui/modal';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Divider } from '@/components/ui/divider';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from '@/components/ui/table';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { useLazyLoadQuery, useMutation } from 'react-relay';
import { GET_ALIEXPRESS_PRODUCT_DETAILS } from '@/lib/queries';
import { IMPORT_PRODUCT_TO_LIGHTFUNNELS } from '@/lib/mutations';
import { queriesAliexpressProductDetailsQuery } from '@/graphql/__generated__/queriesAliexpressProductDetailsQuery.graphql';
import { mutationsImportProductToLightfunnelsMutation } from '@/graphql/__generated__/mutationsImportProductToLightfunnelsMutation.graphql';
import { toast } from 'sonner';

interface Product {
  id: string;
  title: string;
  price: number;
  salePrice: number;
  rating: number;
  imageUrl: string;
  supplier?: string;
  shipping?: string;
  orders?: string | number;
  productUrl?: string;
  aliexpressItemId?: string;
}

interface Variant {
  id: string;
  title: string;
  price: number;
  cost: number;
  image?: string;
  isSelected: boolean;
  sku_attr?: string;
  inventory_quantity: number;
  options: string[];
}

interface ProductImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

const countries = [
  { label: 'United States', value: 'US' },
  { label: 'Canada', value: 'CA' },
  { label: 'United Kingdom', value: 'GB' },
  { label: 'Australia', value: 'AU' },
  { label: 'Germany', value: 'DE' },
  { label: 'France', value: 'FR' },
];

const languages = [
  { label: 'English', value: 'en_US' },
  { label: 'Spanish', value: 'es_ES' },
  { label: 'French', value: 'fr_FR' },
  { label: 'German', value: 'de_DE' },
  { label: 'Italian', value: 'it_IT' },
];

const shippingMethods = [
  { label: 'Standard Shipping', value: 'standard' },
  { label: 'Express Shipping', value: 'express' },
  { label: 'Economy Shipping', value: 'economy' },
];

const ProductImportContent = ({ 
  product, 
  onClose,
  shippingCountry,
  language
}: { 
  product: Product; 
  onClose: () => void;
  shippingCountry: string;
  language: string;
}) => {
  const [useMarginPrice, setUseMarginPrice] = useState(true);
  const [useFixedPrice, setUseFixedPrice] = useState(false);
  const [marginPercentage, setMarginPercentage] = useState('50');
  const [trackInventory, setTrackInventory] = useState(true);
  const [autoPriceUpdate, setAutoPriceUpdate] = useState(true);
  const [importReviews, setImportReviews] = useState(false);
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [variants, setVariants] = useState<Variant[]>([]);

  const productData = useLazyLoadQuery<queriesAliexpressProductDetailsQuery>(
    GET_ALIEXPRESS_PRODUCT_DETAILS,
    {
      productId: product.id || '',
      shipToCountry: shippingCountry,
      targetLanguage: language
    }
  );
  
  // Import product mutation
  const [importProduct, isImportInFlight] = useMutation<mutationsImportProductToLightfunnelsMutation>(
    IMPORT_PRODUCT_TO_LIGHTFUNNELS
  );

  useEffect(() => {
    if (productData?.aliexpressProductDetails?.result) {
      const result = productData.aliexpressProductDetails.result;
      
      // Process variants - handle the nested structure correctly
      if (result.ae_item_sku_info_dtos?.ae_item_sku_info_d_t_o && 
          result.ae_item_sku_info_dtos.ae_item_sku_info_d_t_o.length > 0) {
        
        const processedVariants = result.ae_item_sku_info_dtos.ae_item_sku_info_d_t_o.map((sku: any) => {
          // Get variant title from sku properties
          const variantTitle = sku.ae_sku_property_dtos?.ae_sku_property_d_t_o?.map((prop: any) => 
            prop.property_value_definition_name || prop.sku_property_value
          ).join(' / ') || 'Default';
          
          // Get variant image
          const variantImage = sku.ae_sku_property_dtos?.ae_sku_property_d_t_o?.find((prop: any) => 
            prop.sku_image
          )?.sku_image;
          
          // Get price
          const price = parseFloat(sku.offer_sale_price || sku.sku_price || '0');
          const marginPrice = price * (1 + parseFloat(marginPercentage) / 100);
          
          return {
            id: sku.sku_id || '',
            title: variantTitle,
            price: marginPrice,
            cost: price,
            image: variantImage,
            isSelected: true,
            sku_attr: sku.sku_attr,
            inventory_quantity: parseInt(sku.sku_available_stock || '0', 10),
            options: sku.ae_sku_property_dtos?.ae_sku_property_d_t_o?.map((prop: any) => 
              prop.property_value_definition_name || prop.sku_property_value
            ) || []
          };
        });
        
        setVariants(processedVariants);
      } else {
        // Single variant product
        setVariants([{
          id: 'default',
          title: 'Default',
          price: product.salePrice * (1 + parseFloat(marginPercentage) / 100),
          cost: product.salePrice,
          image: product.imageUrl,
          isSelected: true,
          inventory_quantity: 100,
          options: []
        }]);
      }
    }
  }, [productData, marginPercentage, product]);

  const handleImport = () => {
    // Get selected variants
    const selectedVariants = variants.filter(v => v.isSelected);
    if (selectedVariants.length === 0) {
      toast.error('Please select at least one variant');
      return;
    }
    
    const result = productData?.aliexpressProductDetails?.result;
    if (!result || !result.ae_item_base_info_dto) {
      toast.error('Product details are missing');
      return;
    }
    
    // Extract option names and values
    const optionNamesSet = new Set<string>();
    const optionValuesMap: Record<string, Set<string>> = {};
    
    // If we have multiple variants with different properties
    if (selectedVariants.length > 1) {
      selectedVariants.forEach(variant => {
        if (variant.options && variant.options.length > 0) {
          // For each variant, get the option names and values
          variant.options.forEach((optionValue, index) => {
            // Use index as a fallback if we don't know the option name
            const optionName = `Option ${index + 1}`;
            
            optionNamesSet.add(optionName);
            
            if (!optionValuesMap[optionName]) {
              optionValuesMap[optionName] = new Set<string>();
            }
            
            optionValuesMap[optionName].add(optionValue);
          });
        }
      });
    }
    
    // Format options for Lightfunnels
    const options = Array.from(optionNamesSet).map(name => ({
      name,
      values: Array.from(optionValuesMap[name] || [])
    }));
    
    // Get images
    const images = result.ae_multimedia_info_dto?.image_urls?.split(';') || [];
    
    // Prepare input for the mutation
    const productDataInput = {
      title: result.ae_item_base_info_dto.subject || product.title,
      description: result.ae_item_base_info_dto.detail || result.ae_item_base_info_dto.mobile_detail || '',
      price: selectedVariants[0].price,
      variants: selectedVariants.map(v => ({
        id: v.id,
        title: v.title,
        price: v.price,
        sku: v.id,
        inventory_quantity: v.inventory_quantity,
        options: v.options
      })),
      images,
      options
    };
    
    // Execute the mutation
    importProduct({
      variables: {
        productData: productDataInput,
        options: {
          trackInventory,
          marginPercentage: parseFloat(marginPercentage)
        }
      },
      onCompleted: (response) => {
        if (response.importProductToLightfunnels?.success) {
          toast.success(`Product "${productDataInput.title}" has been successfully imported to your store.`);
          setTimeout(() => {
            onClose();
          }, 2000);
        } else {
          toast.error(response.importProductToLightfunnels?.error || 'Failed to import product');
        }
      },
      onError: (err) => {
        console.error('Error importing product:', err);
        toast.error(err.message || 'An unknown error occurred');
      }
    });
  };  

  const applyPriceChange = () => {
    if (useMarginPrice) {
      const margin = parseFloat(marginPercentage) / 100;
      
      setVariants(variants.map(variant => ({
        ...variant,
        price: Math.round((variant.cost * (1 + margin)) * 100) / 100
      })));
    }
  };

  const toggleVariantSelection = (variantId: string) => {
    setVariants(variants.map(v => 
      v.id === variantId ? { ...v, isSelected: !v.isSelected } : v
    ));
  };

  const updateVariantPrice = (variantId: string, newPrice: string) => {
    setVariants(variants.map(v => 
      v.id === variantId ? { ...v, price: parseFloat(newPrice) || 0 } : v
    ));
  };

  return (
    <>
      <div className="flex flex-col gap-6 w-full">
        <div>
          <Text variant="title" size="small" className="mb-2">SHIPPING</Text>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Text className="mb-1">Shipping to</Text>
              <Select
                options={countries}
                value={shippingCountry}
                onChange={() => {}} // Read-only in this context
                className="w-full"
                disabled={true}
              />
            </div>
            <div>
              <Text className="mb-1">Shipping method</Text>
              <Select
                options={shippingMethods}
                value={shippingMethod}
                onChange={(value) => setShippingMethod(value)}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <Divider />

        <div>
          <Text variant="title" size="small" className="mb-2">PRICING</Text>
          <div className="flex flex-col gap-4">
            <Checkbox
              checked={useMarginPrice}
              onChange={() => {
                setUseMarginPrice(true);
                setUseFixedPrice(false);
              }}
              label={<Text>Set a margin profit price (%)</Text>}
            />
            <Checkbox
              checked={useFixedPrice}
              onChange={() => {
                setUseMarginPrice(false);
                setUseFixedPrice(true);
              }}
              label={<Text>Set a fixed price</Text>}
            />
            
            <div className="flex">
              <Input
                value={marginPercentage}
                onChange={(e) => setMarginPercentage(e.target.value)}
                className="w-full"
              />
              <Button 
                className="ml-2" 
                variant="secondary"
                onClick={applyPriceChange}
              >
                Apply change
              </Button>
            </div>
          </div>
        </div>

        <Divider />

        <div>
          <Text variant="title" size="small" className="mb-2">ADVANCED</Text>
          <div className="flex flex-col gap-2">
            <Checkbox
              checked={trackInventory}
              onChange={(e) => setTrackInventory(e.target.checked)}
              label={<Text>Enable tracking inventory for this product</Text>}
            />
            <Text className="text-gray-500 ml-6 text-xs">Automatically update inventory for pushed product</Text>
            
            <Checkbox
              checked={autoPriceUpdate}
              onChange={(e) => setAutoPriceUpdate(e.target.checked)}
              label={<Text>Automatic price update</Text>}
            />
            <Text className="text-gray-500 ml-6 text-xs">Automatically update the price of the product when it changes on AliExpress</Text>
            
            <Checkbox
              checked={importReviews}
              onChange={(e) => setImportReviews(e.target.checked)}
              label={<Text>Import reviews for this product</Text>}
            />
          </div>
        </div>

        <Divider />

        <div>
          <Text variant="title" size="small" className="mb-2">LANGUAGE</Text>
          <div className="flex flex-col gap-2">
            <Text>Select the language you prefer for importing the product</Text>
            <Select
              options={languages}
              value={language}
              onChange={() => {}} // Read-only in this context
              className="w-full"
              disabled={true}
            />
          </div>
        </div>

        <Divider />

        <div>
          <Text variant="title" size="small" className="mb-2">ORDERED ITEMS LIST</Text>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead>ITEM</TableHead>
                  <TableHead>COST</TableHead>
                  <TableHead>SHIPPING FEE</TableHead>
                  <TableHead>TOTAL COST</TableHead>
                  <TableHead>YOUR PRICE</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {variants.map((variant) => (
                  <TableRow key={variant.id}>
                    <TableCell>
                      <Checkbox 
                        checked={variant.isSelected} 
                        onChange={() => toggleVariantSelection(variant.id)} 
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {variant.image ? (
                          <img 
                            src={variant.image} 
                            alt={variant.title} 
                            className="w-8 h-8 object-cover"
                          />
                        ) : (
                          <div className="w-8 h-8 bg-gray-200"></div>
                        )}
                        <Text>{variant.title}</Text>
                      </div>
                    </TableCell>
                    <TableCell>${variant.cost.toFixed(2)}</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>${variant.cost.toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Input 
                          value={variant.price.toFixed(2)} 
                          onChange={(e) => updateVariantPrice(variant.id, e.target.value)} 
                          className="w-16" 
                        />
                        <Text className="ml-2">USD</Text>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Text className="mt-2">{variants.filter(v => v.isSelected).length} items selected</Text>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button 
          onClick={handleImport} 
          disabled={isImportInFlight || variants.filter(v => v.isSelected).length === 0}
        >
          {isImportInFlight ? <LoadingSpinner /> : 'Push to Store'}
        </Button>
      </div>
    </>
  );
};

// Main modal component
const ProductImportModal: React.FC<ProductImportModalProps> = ({ isOpen, onClose, product }) => {
  const [shippingCountry, setShippingCountry] = useState('US');
  const [language, setLanguage] = useState('en_US');

  if (!isOpen) return null;

  const renderHeader = () => (
    <div className="flex justify-between items-center w-full">
      <Text variant="title" size="large">Import product to Store</Text>
      <button 
        onClick={onClose}
        className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 text-gray-600"
      >
        ×
      </button>
    </div>
  );

  const renderLoadingContent = () => (
    <div className="flex flex-col items-center justify-center py-20 w-full">
      <LoadingSpinner />
      <Text className="mt-4">Loading product details...</Text>
    </div>
  );

  return (
    <Modal
      close={onClose}
      header={renderHeader()}
      body={
        <Suspense fallback={renderLoadingContent()}>
          <ProductImportContent 
            product={product} 
            onClose={onClose}
            shippingCountry={shippingCountry}
            language={language}
          />
        </Suspense>
      }
      footer={null}
      variant="right"
    />
  );
};

export default ProductImportModal;
