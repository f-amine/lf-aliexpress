import { nodeDefinitions } from 'graphql-relay';
import { GraphQLObjectType } from 'graphql';
import { Account } from '@/lib/types';

export interface ApiContext {
  loaders: any;
  account: Account;
}

const { nodeInterface, nodeField, nodesField } = nodeDefinitions(
  async function (id, context: ApiContext) {
    const [type, idValue] = id.split("_");
    switch (type) {
      case "user": {
        return context.loaders.userLoader.load(idValue);
      }
      case "product": {
        return context.loaders.productLoader.load(idValue);
      }
      default: {
        throw new Error('invalid type:' + type);
      }
    }
    return;
  },
  (obj) => {
    const [type] = obj.id.split("_");
    switch(type) {
      case "user": {
        return "User";
      }
      case "product": {
        return "Product";
      }
      default: {
        throw new Error('missing type:' + type);
      }
    }
  }
);

export { nodeField, nodesField };
export const Node = nodeInterface;

export const types: Record<string, GraphQLObjectType> = {};
