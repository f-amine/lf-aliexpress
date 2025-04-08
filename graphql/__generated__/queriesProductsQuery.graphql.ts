/**
 * @generated SignedSource<<76851aa8aa3cdd44cae9e7792f321275>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type queriesProductsQuery$variables = {
  keyWord?: string | null | undefined;
  pageIndex?: number | null | undefined;
  pageSize?: number | null | undefined;
  sortBy?: string | null | undefined;
  status?: string | null | undefined;
};
export type queriesProductsQuery$data = {
  readonly getProducts: {
    readonly pageIndex: number;
    readonly pageSize: number;
    readonly products: ReadonlyArray<{
      readonly aliexpressItemId: string | null | undefined;
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
    } | null | undefined>;
    readonly totalCount: number;
  } | null | undefined;
};
export type queriesProductsQuery = {
  response: queriesProductsQuery$data;
  variables: queriesProductsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "keyWord"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "pageIndex"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "pageSize"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "sortBy"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "status"
},
v5 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "keyWord",
        "variableName": "keyWord"
      },
      {
        "kind": "Variable",
        "name": "pageIndex",
        "variableName": "pageIndex"
      },
      {
        "kind": "Variable",
        "name": "pageSize",
        "variableName": "pageSize"
      },
      {
        "kind": "Variable",
        "name": "sortBy",
        "variableName": "sortBy"
      },
      {
        "kind": "Variable",
        "name": "status",
        "variableName": "status"
      }
    ],
    "concreteType": "ProductsResult",
    "kind": "LinkedField",
    "name": "getProducts",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Product",
        "kind": "LinkedField",
        "name": "products",
        "plural": true,
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
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "aliexpressItemId",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "totalCount",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "pageIndex",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "pageSize",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "queriesProductsQuery",
    "selections": (v5/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v2/*: any*/),
      (v1/*: any*/),
      (v4/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Operation",
    "name": "queriesProductsQuery",
    "selections": (v5/*: any*/)
  },
  "params": {
    "cacheID": "793322fefb496a885833737b19827b90",
    "id": null,
    "metadata": {},
    "name": "queriesProductsQuery",
    "operationKind": "query",
    "text": "query queriesProductsQuery(\n  $keyWord: String\n  $pageSize: Int\n  $pageIndex: Int\n  $status: String\n  $sortBy: String\n) {\n  getProducts(keyWord: $keyWord, pageSize: $pageSize, pageIndex: $pageIndex, status: $status, sortBy: $sortBy) {\n    products {\n      id\n      title\n      description\n      price\n      salePrice\n      imageUrl\n      supplier\n      shipping\n      orders\n      rating\n      status\n      createdAt\n      updatedAt\n      aliexpressItemId\n    }\n    totalCount\n    pageIndex\n    pageSize\n  }\n}\n"
  }
};
})();

(node as any).hash = "92cc8b336c2ca961a2aa924c262fbdaa";

export default node;
