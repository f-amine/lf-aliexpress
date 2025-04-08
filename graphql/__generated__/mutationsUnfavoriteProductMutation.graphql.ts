/**
 * @generated SignedSource<<b14c06e3c88bd16f2b848a6da3616b12>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type mutationsUnfavoriteProductMutation$variables = {
  aliexpressItemId: string;
};
export type mutationsUnfavoriteProductMutation$data = {
  readonly unfavoriteProduct: {
    readonly error: string | null | undefined;
    readonly success: boolean;
  } | null | undefined;
};
export type mutationsUnfavoriteProductMutation = {
  response: mutationsUnfavoriteProductMutation$data;
  variables: mutationsUnfavoriteProductMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "aliexpressItemId"
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
      }
    ],
    "concreteType": "FavoriteProductResponse",
    "kind": "LinkedField",
    "name": "unfavoriteProduct",
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
    "name": "mutationsUnfavoriteProductMutation",
    "selections": (v1/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "mutationsUnfavoriteProductMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "ca070aeb9440558fa3758de46d0f8722",
    "id": null,
    "metadata": {},
    "name": "mutationsUnfavoriteProductMutation",
    "operationKind": "mutation",
    "text": "mutation mutationsUnfavoriteProductMutation(\n  $aliexpressItemId: String!\n) {\n  unfavoriteProduct(aliexpressItemId: $aliexpressItemId) {\n    success\n    error\n  }\n}\n"
  }
};
})();

(node as any).hash = "8eab1399c0ff8491025d99db5318a932";

export default node;
