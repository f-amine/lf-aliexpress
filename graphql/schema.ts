import * as graphql from "graphql";
import { nodeField, nodesField } from "./types";
import { disconnectAliexpress, exchangeAliexpressToken, getAliexpressAuthUrl, updateAliexpressSettings } from "./schema/mutations";
import { connectionStatus } from "./schema/types";
import { types } from "./types";

const RootQueryType = new graphql.GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    node: nodeField,
    nodes: nodesField,
    connectionStatus: {
      type: types.ConnectionStatus,
      resolve: connectionStatus
    }
  }
});

const RootMutationType = new graphql.GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    getAliexpressAuthUrl: getAliexpressAuthUrl,
    exchangeAliexpressToken: exchangeAliexpressToken,
    updateAliexpressSettings: updateAliexpressSettings,
    disconnectAliexpress: disconnectAliexpress
  }
});

// Create the schema
const schema = new graphql.GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
});

export default schema;
