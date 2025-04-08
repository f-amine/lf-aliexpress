/**
 * @generated SignedSource<<40512f046de8bd102e1e1d7915a917ba>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type ProductDataInput = {
  description: string;
  images?: ReadonlyArray<string | null | undefined> | null | undefined;
  options?: ReadonlyArray<ProductOptionInput | null | undefined> | null | undefined;
  price: number;
  title: string;
  variants?: ReadonlyArray<ProductVariantInput | null | undefined> | null | undefined;
};
export type ProductVariantInput = {
  id: string;
  inventory_quantity?: number | null | undefined;
  options?: ReadonlyArray<string | null | undefined> | null | undefined;
  price: number;
  sku?: string | null | undefined;
  title: string;
};
export type ProductOptionInput = {
  name: string;
  values?: ReadonlyArray<string | null | undefined> | null | undefined;
};
export type ProductImportOptionsInput = {
  marginPercentage?: number | null | undefined;
  trackInventory?: boolean | null | undefined;
};
export type mutationsImportProductToLightfunnelsMutation$variables = {
  options: ProductImportOptionsInput;
  productData: ProductDataInput;
};
export type mutationsImportProductToLightfunnelsMutation$data = {
  readonly importProductToLightfunnels: {
    readonly error: string | null | undefined;
    readonly productId: string | null | undefined;
    readonly success: boolean;
  } | null | undefined;
};
export type mutationsImportProductToLightfunnelsMutation = {
  response: mutationsImportProductToLightfunnelsMutation$data;
  variables: mutationsImportProductToLightfunnelsMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "options"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "productData"
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "options",
        "variableName": "options"
      },
      {
        "kind": "Variable",
        "name": "productData",
        "variableName": "productData"
      }
    ],
    "concreteType": "ProductImportResponse",
    "kind": "LinkedField",
    "name": "importProductToLightfunnels",
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
        "name": "productId",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "error",
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
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "mutationsImportProductToLightfunnelsMutation",
    "selections": (v2/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "mutationsImportProductToLightfunnelsMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "f039bbc2a9b32f411a94484b5e595e01",
    "id": null,
    "metadata": {},
    "name": "mutationsImportProductToLightfunnelsMutation",
    "operationKind": "mutation",
    "text": "mutation mutationsImportProductToLightfunnelsMutation(\n  $productData: ProductDataInput!\n  $options: ProductImportOptionsInput!\n) {\n  importProductToLightfunnels(productData: $productData, options: $options) {\n    success\n    productId\n    error\n  }\n}\n"
  }
};
})();

(node as any).hash = "a7d5e75a9d8f6c17c088cf4a7fada1af";

export default node;
