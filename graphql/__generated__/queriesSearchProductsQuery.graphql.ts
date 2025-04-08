/**
 * @generated SignedSource<<3b5f3923b65369e79c7daea23de8fce0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type queriesSearchProductsQuery$variables = {
  categoryId?: number | null | undefined;
  countryCode?: string | null | undefined;
  keyWord?: string | null | undefined;
  pageIndex?: number | null | undefined;
  pageSize?: number | null | undefined;
  searchExtend?: string | null | undefined;
  selectionName?: string | null | undefined;
  sortBy?: string | null | undefined;
};
export type queriesSearchProductsQuery$data = {
  readonly searchAliexpressProducts: {
    readonly pageIndex: number | null | undefined;
    readonly pageSize: number | null | undefined;
    readonly products: ReadonlyArray<{
      readonly discount: string | null | undefined;
      readonly evaluateRate: string | null | undefined;
      readonly itemId: string | null | undefined;
      readonly itemMainPic: string | null | undefined;
      readonly itemUrl: string | null | undefined;
      readonly orders: string | null | undefined;
      readonly originalPrice: string | null | undefined;
      readonly originalPriceCurrency: string | null | undefined;
      readonly salePrice: string | null | undefined;
      readonly salePriceCurrency: string | null | undefined;
      readonly score: string | null | undefined;
      readonly targetOriginalPrice: string | null | undefined;
      readonly targetOriginalPriceCurrency: string | null | undefined;
      readonly targetSalePrice: string | null | undefined;
      readonly title: string | null | undefined;
      readonly type: string | null | undefined;
    } | null | undefined> | null | undefined;
    readonly totalCount: number | null | undefined;
  } | null | undefined;
};
export type queriesSearchProductsQuery = {
  response: queriesSearchProductsQuery$data;
  variables: queriesSearchProductsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "categoryId"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "countryCode"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "keyWord"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "pageIndex"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "pageSize"
},
v5 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "searchExtend"
},
v6 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "selectionName"
},
v7 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "sortBy"
},
v8 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "categoryId",
        "variableName": "categoryId"
      },
      {
        "kind": "Variable",
        "name": "countryCode",
        "variableName": "countryCode"
      },
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
        "name": "searchExtend",
        "variableName": "searchExtend"
      },
      {
        "kind": "Variable",
        "name": "selectionName",
        "variableName": "selectionName"
      },
      {
        "kind": "Variable",
        "name": "sortBy",
        "variableName": "sortBy"
      }
    ],
    "concreteType": "AliexpressProductSearchResult",
    "kind": "LinkedField",
    "name": "searchAliexpressProducts",
    "plural": false,
    "selections": [
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
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "AliexpressProduct",
        "kind": "LinkedField",
        "name": "products",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "itemId",
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
            "name": "itemMainPic",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "itemUrl",
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
            "name": "salePriceCurrency",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "originalPrice",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "originalPriceCurrency",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "discount",
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
            "name": "score",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "evaluateRate",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "targetSalePrice",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "targetOriginalPrice",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "targetOriginalPriceCurrency",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "type",
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/),
      (v5/*: any*/),
      (v6/*: any*/),
      (v7/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "queriesSearchProductsQuery",
    "selections": (v8/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v2/*: any*/),
      (v4/*: any*/),
      (v3/*: any*/),
      (v0/*: any*/),
      (v7/*: any*/),
      (v5/*: any*/),
      (v6/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "queriesSearchProductsQuery",
    "selections": (v8/*: any*/)
  },
  "params": {
    "cacheID": "07321030e377b82c9fcb06576a513f53",
    "id": null,
    "metadata": {},
    "name": "queriesSearchProductsQuery",
    "operationKind": "query",
    "text": "query queriesSearchProductsQuery(\n  $keyWord: String\n  $pageSize: Int\n  $pageIndex: Int\n  $categoryId: Int\n  $sortBy: String\n  $searchExtend: String\n  $selectionName: String\n  $countryCode: String\n) {\n  searchAliexpressProducts(keyWord: $keyWord, pageSize: $pageSize, pageIndex: $pageIndex, categoryId: $categoryId, sortBy: $sortBy, searchExtend: $searchExtend, selectionName: $selectionName, countryCode: $countryCode) {\n    totalCount\n    pageIndex\n    pageSize\n    products {\n      itemId\n      title\n      itemMainPic\n      itemUrl\n      salePrice\n      salePriceCurrency\n      originalPrice\n      originalPriceCurrency\n      discount\n      orders\n      score\n      evaluateRate\n      targetSalePrice\n      targetOriginalPrice\n      targetOriginalPriceCurrency\n      type\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "af0c3e0c69e62511bb0272b2259fd9d8";

export default node;
