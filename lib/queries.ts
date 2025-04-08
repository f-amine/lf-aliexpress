// lib/queries.ts
import { graphql } from 'relay-runtime';

export const CONNECTION_STATUS_QUERY = graphql`
  query queriesConnectionStatusQuery {
    connectionStatus {
      aliexpress {
        connected
        currency
        language
      }
    }
  }
`;

// lib/queries.ts
export const SEARCH_PRODUCTS_QUERY = graphql`
  query queriesSearchProductsQuery(
    $keyWord: String,
    $pageSize: Int,
    $pageIndex: Int,
    $categoryId: Int,
    $sortBy: String,
    $searchExtend: String,
    $selectionName: String,
    $countryCode: String
  ) {
    searchAliexpressProducts(
      keyWord: $keyWord,
      pageSize: $pageSize,
      pageIndex: $pageIndex,
      categoryId: $categoryId,
      sortBy: $sortBy,
      searchExtend: $searchExtend,
      selectionName: $selectionName,
      countryCode: $countryCode
    ) {
      totalCount
      pageIndex
      pageSize
      products {
        itemId
        title
        itemMainPic
        itemUrl
        salePrice
        salePriceCurrency
        originalPrice
        originalPriceCurrency
        discount
        orders
        score
        evaluateRate
        targetSalePrice
        targetOriginalPrice
        targetOriginalPriceCurrency
        type
      }
    }
  }
`;

export const PRODUCTS_QUERY = graphql`
  query queriesProductsQuery(
    $keyWord: String,
    $pageSize: Int,
    $pageIndex: Int,
    $status: String,
    $sortBy: String
  ) {
    getProducts(
      keyWord: $keyWord,
      pageSize: $pageSize,
      pageIndex: $pageIndex,
      status: $status,
      sortBy: $sortBy
    ) {
      products {
        id
        title
        description
        price
        salePrice
        imageUrl
        supplier
        shipping
        orders
        rating
        status
        createdAt
        updatedAt
        aliexpressItemId
      }
      totalCount
      pageIndex
      pageSize
    }
  }
`;

export const PRODUCT_QUERY = graphql`
  query queriesProductQuery($id: String!) {
    getProduct(id: $id) {
      id
      title
      description
      price
      salePrice
      imageUrl
      aliexpressItemId
      aliexpressUrl
      supplier
      shipping
      orders
      rating
      status
      createdAt
      updatedAt
    }
  }
`;


export const GET_ALIEXPRESS_PRODUCT_DETAILS = graphql`
  query queriesAliexpressProductDetailsQuery(
    $productId: String!,
    $shipToCountry: String,
    $targetLanguage: String
  ) {
    aliexpressProductDetails(
      productId: $productId,
      shipToCountry: $shipToCountry,
      targetLanguage: $targetLanguage
    ) {
      result {
        ae_item_sku_info_dtos {
          ae_item_sku_info_d_t_o {
            sku_attr
            sku_id
            offer_sale_price
            sku_price
            sku_available_stock
            currency_code
            ipm_sku_stock
            sku_stock
            price_include_tax
            offer_bulk_sale_price
            id
            sku_code
            ae_sku_property_dtos {
              ae_sku_property_d_t_o {
                sku_property_name
                sku_property_value
                property_value_definition_name
                sku_image
                property_value_id
                sku_property_id
              }
            }
          }
        }
        ae_multimedia_info_dto {
          image_urls
          ae_video_dtos {
            ae_video_d_t_o {
              media_url
              poster_url
              media_status
              media_type
              media_id
            }
          }
        }
        ae_item_base_info_dto {
          subject
          detail
          mobile_detail
          category_id
          product_id
          currency_code
          sales_count
          avg_evaluation_rating
          evaluation_count
          product_status_type
        }
        ae_item_properties {
          ae_item_property {
            attr_name_id
            attr_value_id
            attr_name
            attr_value
          }
        }
        package_info_dto {
          package_width
          package_height
          package_length
          gross_weight
          package_type
          product_unit
        }
        logistics_info_dto {
          delivery_time
          ship_to_country
        }
        ae_store_info {
          store_id
          shipping_speed_rating
          communication_rating
          store_name
          store_country_code
          item_as_described_rating
        }
        has_whole_sale
      }
      rsp_code
      rsp_msg
      request_id
    }
  }
`;
