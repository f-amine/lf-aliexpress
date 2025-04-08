import * as graphql from "graphql";
import { nodeField, nodesField } from "./types";
import { disconnectAliexpress, exchangeAliexpressToken, getAliexpressAuthUrl, updateAliexpressSettings } from "./schema/mutations";
import { connectionStatus } from "./schema/types";
import { types } from "./types";
import { getAliexpressProductDetailsResolver, importProductToLightfunnelsResolver, searchAliExpressProductsResolver } from "./resolvers/aliexpress";
import { favoriteProductResolver, getProductByIdResolver, getProductsResolver, unfavoriteProductResolver } from "./resolvers/products";

const RootQueryType = new graphql.GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    node: nodeField,
    nodes: nodesField,
    connectionStatus: {
      type: types.ConnectionStatus,
      resolve: connectionStatus
    },
    searchAliexpressProducts: {
      type: types.AliexpressProductSearchResult,
      args: {
        keyWord: { type: graphql.GraphQLString },
        pageSize: { type: graphql.GraphQLInt },
        pageIndex: { type: graphql.GraphQLInt },
        categoryId: { type: graphql.GraphQLInt },
        sortBy: { type: graphql.GraphQLString },
        searchExtend: { type: graphql.GraphQLString },
        selectionName: { type: graphql.GraphQLString },
        countryCode: { type: graphql.GraphQLString }
      },
      resolve: searchAliExpressProductsResolver
    },
    getProducts: {
      type: types.ProductsResult,
      args: {
        keyWord: { type: graphql.GraphQLString },
        pageSize: { type: graphql.GraphQLInt },
        pageIndex: { type: graphql.GraphQLInt },
        status: { type: graphql.GraphQLString },
        sortBy: { type: graphql.GraphQLString }
      },
      resolve: getProductsResolver
    },
    getProduct: {
      type: types.Product,
      args: {
        id: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) }
      },
      resolve: getProductByIdResolver
    },
    aliexpressProductDetails: {
      type: types.AliExpressProductDetail,
      args: {
        productId: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
        shipToCountry: { type: graphql.GraphQLString },
        targetLanguage: { type: graphql.GraphQLString }
      },
      resolve: getAliexpressProductDetailsResolver
    }
  }
});

const RootMutationType = new graphql.GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    getAliexpressAuthUrl: getAliexpressAuthUrl,
    exchangeAliexpressToken: exchangeAliexpressToken,
    updateAliexpressSettings: updateAliexpressSettings,
    disconnectAliexpress: disconnectAliexpress,
    favoriteProduct: {
      type: types.FavoriteProductResponse,
      args: {
        aliexpressItemId: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
        productData: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) }
      },
      resolve:favoriteProductResolver
    },
    unfavoriteProduct: {
      type: types.FavoriteProductResponse,
      args: {
        aliexpressItemId: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) }
      },
      resolve: unfavoriteProductResolver
    },
    importProductToLightfunnels: {
      type: types.ProductImportResponse,
      args: {
        productData: { 
          type: new graphql.GraphQLInputObjectType({
            name: 'ProductDataInput',
            fields: {
              title: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
              description: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
              price: { type: new graphql.GraphQLNonNull(graphql.GraphQLFloat) },
              variants: { 
                type: new graphql.GraphQLList(new graphql.GraphQLInputObjectType({
                  name: 'ProductVariantInput',
                  fields: {
                    id: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
                    title: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
                    price: { type: new graphql.GraphQLNonNull(graphql.GraphQLFloat) },
                    sku: { type: graphql.GraphQLString },
                    inventory_quantity: { type: graphql.GraphQLInt },
                    options: { type: new graphql.GraphQLList(graphql.GraphQLString) }
                  }
                }))
              },
              images: { type: new graphql.GraphQLList(graphql.GraphQLString) },
              options: { 
                type: new graphql.GraphQLList(new graphql.GraphQLInputObjectType({
                  name: 'ProductOptionInput',
                  fields: {
                    name: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
                    values: { type: new graphql.GraphQLList(graphql.GraphQLString) }
                  }
                }))
              }
            }
          })
        },
        options: {
          type: new graphql.GraphQLInputObjectType({
            name: 'ProductImportOptionsInput',
            fields: {
              trackInventory: { type: graphql.GraphQLBoolean },
              marginPercentage: { type: graphql.GraphQLFloat }
            }
          })
        }
      },
      resolve: importProductToLightfunnelsResolver
    }
  }
});

const schema = new graphql.GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
});

export default schema;
