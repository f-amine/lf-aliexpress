import * as graphql from "graphql";
import { nodeField, nodesField, } from "../types";
import * as mutations from "./mutations";

const RootQueryType = new graphql.GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    node: nodeField,
    nodes: nodesField,
  }
});

const RootMutationType = new graphql.GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    getAliexpressAuthUrl: mutations.getAliexpressAuthUrl,
    exchangeAliexpressToken: mutations.exchangeAliexpressToken
  }
});

// Create the schema
const schema = new graphql.GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
});

export default schema;
