/**
 * @generated SignedSource<<3f3b15ab0be73b360938f0958e248359>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type queriesProductQuery$variables = {
  id: string;
};
export type queriesProductQuery$data = {
  readonly getProduct: {
    readonly aliexpressItemId: string | null | undefined;
    readonly aliexpressUrl: string | null | undefined;
    readonly createdAt: string | null | undefined;
    readonly description: string | null | undefined;
    readonly id: string;
    readonly imageUrl: string | null | undefined;
    readonly orders: string | null | undefined;
    readonly price: number;
    readonly rating: number | null | undefined;
    readonly salePrice: number | null | undefined;
    readonly shipping: string | null | undefined;
    readonly status: string | null | undefined;
    readonly supplier: string | null | undefined;
    readonly title: string;
    readonly updatedAt: string | null | undefined;
  } | null | undefined;
};
export type queriesProductQuery = {
  response: queriesProductQuery$data;
  variables: queriesProductQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "Product",
    "kind": "LinkedField",
    "name": "getProduct",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "title",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "description",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "price",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "salePrice",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "imageUrl",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "aliexpressItemId",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "aliexpressUrl",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "supplier",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "shipping",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "orders",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "rating",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "status",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "createdAt",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "updatedAt",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "queriesProductQuery",
    "selections": (v1/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "queriesProductQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "5cbf84c90b57a8237181cda2eaa8e7b9",
    "id": null,
    "metadata": {},
    "name": "queriesProductQuery",
    "operationKind": "query",
    "text": "query queriesProductQuery(\n  $id: String!\n) {\n  getProduct(id: $id) {\n    id\n    title\n    description\n    price\n    salePrice\n    imageUrl\n    aliexpressItemId\n    aliexpressUrl\n    supplier\n    shipping\n    orders\n    rating\n    status\n    createdAt\n    updatedAt\n  }\n}\n"
  }
};
})();

(node as any).hash = "c0a8916037c327b36c14315a397a9a92";

export default node;
