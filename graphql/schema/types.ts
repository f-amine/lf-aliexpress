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

export function connectionStatus(_: unknown, _args: unknown, ctx: ApiContext) {
  return getConnectionStatus(_, _args, ctx);
}
