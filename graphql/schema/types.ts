import * as graphql from "graphql";
import { types, Node, ApiContext } from "../types";
import { getConnectionStatus } from "../resolvers/aliexpress";

types.ConnectionStatus = new graphql.GraphQLObjectType({
  name: 'ConnectionStatus',
  fields: {
    aliexpress: {
      type: new graphql.GraphQLObjectType({
        name: 'AliexpressConnectionStatus',
        fields: {
          connected: { type: new graphql.GraphQLNonNull(graphql.GraphQLBoolean) },
          currency: { type: graphql.GraphQLString },
          language: { type: graphql.GraphQLString }
        }
      })
    }
  }
});

types.AliexpressProduct = new graphql.GraphQLObjectType({
  name: 'AliexpressProduct',
  fields: {
    itemId: { type: graphql.GraphQLString },
    title: { type: graphql.GraphQLString },
    itemMainPic: { type: graphql.GraphQLString },
    itemUrl: { type: graphql.GraphQLString },
    salePrice: { type: graphql.GraphQLString },
    salePriceCurrency: { type: graphql.GraphQLString },
    originalPrice: { type: graphql.GraphQLString },
    originalPriceCurrency: { type: graphql.GraphQLString },
    discount: { type: graphql.GraphQLString },
    orders: { type: graphql.GraphQLString },
    score: { type: graphql.GraphQLString },
    evaluateRate: { type: graphql.GraphQLString },
    targetSalePrice: { type: graphql.GraphQLString },
    targetOriginalPrice: { type: graphql.GraphQLString },
    targetOriginalPriceCurrency: { type: graphql.GraphQLString },
    type: { type: graphql.GraphQLString }
  }
});

types.AliexpressProductSearchResult = new graphql.GraphQLObjectType({
  name: 'AliexpressProductSearchResult',
  fields: {
    products: { 
      type: new graphql.GraphQLList(types.AliexpressProduct),
      resolve: (source) => {
        return source.products?.selection_search_product || [];
      }
    },
    totalCount: { type: graphql.GraphQLInt },
    pageIndex: { type: graphql.GraphQLInt },
    pageSize: { type: graphql.GraphQLInt }
  }
});

types.Product = new graphql.GraphQLObjectType({
  name: 'Product',
  interfaces: [Node],
  fields: {
    id: { type: new graphql.GraphQLNonNull(graphql.GraphQLID) }, 
    title: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
    description: { type: graphql.GraphQLString },
    price: { type: new graphql.GraphQLNonNull(graphql.GraphQLFloat) },
    salePrice: { type: graphql.GraphQLFloat },
    imageUrl: { type: graphql.GraphQLString },
    aliexpressItemId: { type: graphql.GraphQLString },
    aliexpressUrl: { type: graphql.GraphQLString },
    supplier: { type: graphql.GraphQLString },
    shipping: { type: graphql.GraphQLString },
    orders: { type: graphql.GraphQLString },
    rating: { type: graphql.GraphQLFloat },
    status: { type: graphql.GraphQLString },
    createdAt: { type: graphql.GraphQLString },
    updatedAt: { type: graphql.GraphQLString }
  },
});

types.ProductsResult = new graphql.GraphQLObjectType({
  name: 'ProductsResult',
  fields: {
    products: { 
      type: new graphql.GraphQLNonNull(new graphql.GraphQLList(types.Product))
    },
    totalCount: { type: new graphql.GraphQLNonNull(graphql.GraphQLInt) },
    pageIndex: { type: new graphql.GraphQLNonNull(graphql.GraphQLInt) },
    pageSize: { type: new graphql.GraphQLNonNull(graphql.GraphQLInt) }
  }
});

types.FavoriteProductResponse = new graphql.GraphQLObjectType({
  name: 'FavoriteProductResponse',
  fields: {
    success: { type: new graphql.GraphQLNonNull(graphql.GraphQLBoolean) },
    product: { type: types.Product },
    error: { type: graphql.GraphQLString }
  }
});

types.AliExpressProductDetail = new graphql.GraphQLObjectType({
  name: 'AliExpressProductDetail',
  fields: {
    result: { 
      type: new graphql.GraphQLObjectType({
        name: 'AliExpressProductResult',
        fields: {
          ae_item_sku_info_dtos: { 
            type: new graphql.GraphQLObjectType({
              name: 'AliExpressSkuInfoContainer',
              fields: {
                ae_item_sku_info_d_t_o: {
                  type: new graphql.GraphQLList(new graphql.GraphQLObjectType({
                    name: 'AliExpressSkuInfo',
                    fields: {
                      sku_attr: { type: graphql.GraphQLString },
                      sku_id: { type: graphql.GraphQLString },
                      offer_sale_price: { type: graphql.GraphQLString },
                      sku_price: { type: graphql.GraphQLString },
                      sku_available_stock: { type: graphql.GraphQLString },
                      currency_code: { type: graphql.GraphQLString },
                      ipm_sku_stock: { type: graphql.GraphQLInt },
                      sku_stock: { type: graphql.GraphQLBoolean },
                      price_include_tax: { type: graphql.GraphQLBoolean },
                      offer_bulk_sale_price: { type: graphql.GraphQLString },
                      id: { type: graphql.GraphQLString },
                      sku_code: { type: graphql.GraphQLString },
                      ae_sku_property_dtos: { 
                        type: new graphql.GraphQLObjectType({
                          name: 'AliExpressSkuPropertyContainer',
                          fields: {
                            ae_sku_property_d_t_o: {
                              type: new graphql.GraphQLList(new graphql.GraphQLObjectType({
                                name: 'AliExpressSkuProperty',
                                fields: {
                                  sku_property_name: { type: graphql.GraphQLString },
                                  sku_property_value: { type: graphql.GraphQLString },
                                  property_value_definition_name: { type: graphql.GraphQLString },
                                  sku_image: { type: graphql.GraphQLString },
                                  property_value_id: { type: graphql.GraphQLInt },
                                  sku_property_id: { type: graphql.GraphQLInt }
                                }
                              }))
                            }
                          }
                        })
                      }
                    }
                  }))
                }
              }
            })
          },
          ae_multimedia_info_dto: { 
            type: new graphql.GraphQLObjectType({
              name: 'AliExpressMultimediaInfo',
              fields: {
                image_urls: { type: graphql.GraphQLString },
                ae_video_dtos: { 
                  type: new graphql.GraphQLObjectType({
                    name: 'AliExpressVideoContainer',
                    fields: {
                      ae_video_d_t_o: {
                        type: new graphql.GraphQLList(new graphql.GraphQLObjectType({
                          name: 'AliExpressVideoInfo',
                          fields: {
                            media_url: { type: graphql.GraphQLString },
                            poster_url: { type: graphql.GraphQLString },
                            media_status: { type: graphql.GraphQLString },
                            media_type: { type: graphql.GraphQLString },
                            media_id: { type: graphql.GraphQLString },
                            ali_member_id: { type: graphql.GraphQLString }
                          }
                        }))
                      }
                    }
                  })
                }
              }
            })
          },
          ae_item_base_info_dto: { 
            type: new graphql.GraphQLObjectType({
              name: 'AliExpressItemBaseInfo',
              fields: {
                subject: { type: graphql.GraphQLString },
                detail: { type: graphql.GraphQLString },
                mobile_detail: { type: graphql.GraphQLString },
                category_id: { type: graphql.GraphQLInt },
                product_id: { type: graphql.GraphQLFloat },
                currency_code: { type: graphql.GraphQLString },
                sales_count: { type: graphql.GraphQLString },
                avg_evaluation_rating: { type: graphql.GraphQLString },
                evaluation_count: { type: graphql.GraphQLString },
                product_status_type: { type: graphql.GraphQLString }
              }
            })
          },
          ae_item_properties: { 
            type: new graphql.GraphQLObjectType({
              name: 'AliExpressItemPropertyContainer',
              fields: {
                ae_item_property: {
                  type: new graphql.GraphQLList(new graphql.GraphQLObjectType({
                    name: 'AliExpressItemProperty',
                    fields: {
                      attr_name_id: { type: graphql.GraphQLInt },
                      attr_value_id: { type: graphql.GraphQLFloat },
                      attr_name: { type: graphql.GraphQLString },
                      attr_value: { type: graphql.GraphQLString }
                    }
                  }))
                }
              }
            })
          },
          package_info_dto: {
            type: new graphql.GraphQLObjectType({
              name: 'AliExpressPackageInfo',
              fields: {
                package_width: { type: graphql.GraphQLInt },
                package_height: { type: graphql.GraphQLInt },
                package_length: { type: graphql.GraphQLInt },
                gross_weight: { type: graphql.GraphQLString },
                package_type: { type: graphql.GraphQLBoolean },
                product_unit: { type: graphql.GraphQLInt }
              }
            })
          },
          logistics_info_dto: {
            type: new graphql.GraphQLObjectType({
              name: 'AliExpressLogisticsInfo',
              fields: {
                delivery_time: { type: graphql.GraphQLInt },
                ship_to_country: { type: graphql.GraphQLString }
              }
            })
          },
          ae_store_info: {
            type: new graphql.GraphQLObjectType({
              name: 'AliExpressStoreInfo',
              fields: {
                store_id: { type: graphql.GraphQLInt },
                shipping_speed_rating: { type: graphql.GraphQLString },
                communication_rating: { type: graphql.GraphQLString },
                store_name: { type: graphql.GraphQLString },
                store_country_code: { type: graphql.GraphQLString },
                item_as_described_rating: { type: graphql.GraphQLString }
              }
            })
          },
          has_whole_sale: { type: graphql.GraphQLBoolean }
        }
      })
    },
    rsp_code: { type: graphql.GraphQLInt },
    rsp_msg: { type: graphql.GraphQLString },
    request_id: { type: graphql.GraphQLString }
  }
});

types.ProductImportResponse = new graphql.GraphQLObjectType({
  name: 'ProductImportResponse',
  fields: {
    success: { type: new graphql.GraphQLNonNull(graphql.GraphQLBoolean) },
    productId: { type: graphql.GraphQLString },
    error: { type: graphql.GraphQLString }
  }
});

export function connectionStatus(_: unknown, _args: unknown, ctx: ApiContext) {
  return getConnectionStatus(_, _args, ctx);
}
