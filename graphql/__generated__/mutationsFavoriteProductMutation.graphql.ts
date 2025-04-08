/**
 * @generated SignedSource<<5905574ac11f282876d56b7e018fcd6a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type mutationsFavoriteProductMutation$variables = {
  aliexpressItemId: string;
  productData: string;
};
export type mutationsFavoriteProductMutation$data = {
  readonly favoriteProduct: {
    readonly error: string | null | undefined;
    readonly product: {
      readonly id: string;
      readonly imageUrl: string | null | undefined;
      readonly price: number;
      readonly salePrice: number | null | undefined;
      readonly title: string;
    } | null | undefined;
    readonly success: boolean;
  } | null | undefined;
};
export type mutationsFavoriteProductMutation = {
  response: mutationsFavoriteProductMutation$data;
  variables: mutationsFavoriteProductMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "aliexpressItemId"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "productData"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "aliexpressItemId",
        "variableName": "aliexpressItemId"
      },
      {
        "kind": "Variable",
        "name": "productData",
        "variableName": "productData"
      }
    ],
    "concreteType": "FavoriteProductResponse",
    "kind": "LinkedField",
    "name": "favoriteProduct",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "success",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "error",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Product",
        "kind": "LinkedField",
        "name": "product",
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
            "name": "imageUrl",
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
          }
        ],
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
    "name": "mutationsFavoriteProductMutation",
    "selections": (v1/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "mutationsFavoriteProductMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "80f8129592103fc89f1ba257284fddf7",
    "id": null,
    "metadata": {},
    "name": "mutationsFavoriteProductMutation",
    "operationKind": "mutation",
    "text": "mutation mutationsFavoriteProductMutation(\n  $aliexpressItemId: String!\n  $productData: String!\n) {\n  favoriteProduct(aliexpressItemId: $aliexpressItemId, productData: $productData) {\n    success\n    error\n    product {\n      id\n      title\n      imageUrl\n      price\n      salePrice\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "ab1ce9e64fb1847f4933327e7d5bc5b3";

export default node;
