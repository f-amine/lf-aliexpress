import * as graphql from "graphql";
import { 
  getAliexpressAuthUrlResolver,
  exchangeAliexpressTokenResolver, 
  updateAliexpressSettingsResolver,
  disconnectAliexpressResolver
} from '../resolvers/aliexpress';

export const getAliexpressAuthUrl = {
  type: new graphql.GraphQLObjectType({
    name: 'AliexpressAuthUrlResponse',
    fields: {
      authorizationUrl: { type: graphql.GraphQLString }
    }
  }),
  resolve: getAliexpressAuthUrlResolver
};

export const exchangeAliexpressToken = {
  type: new graphql.GraphQLObjectType({
    name: 'AliexpressTokenResponse',
    fields: {
      success: { type: graphql.GraphQLBoolean },
      error: { type: graphql.GraphQLString }
    }
  }),
  args: {
    code: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) }
  },
  resolve: exchangeAliexpressTokenResolver
};

export const updateAliexpressSettings = {
  type: new graphql.GraphQLObjectType({
    name: 'UpdateAliexpressSettingsResponse',
    fields: {
      success: { type: graphql.GraphQLBoolean }
    }
  }),
  args: {
    currency: { type: graphql.GraphQLString },
    language: { type: graphql.GraphQLString }
  },
  resolve: updateAliexpressSettingsResolver
};

export const disconnectAliexpress = {
  type: new graphql.GraphQLObjectType({
    name: 'DisconnectAliexpressResponse',
    fields: {
      success: { type: graphql.GraphQLBoolean }
    }
  }),
  resolve: disconnectAliexpressResolver
};
