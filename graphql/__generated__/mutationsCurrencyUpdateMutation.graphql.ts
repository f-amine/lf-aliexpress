/**
 * @generated SignedSource<<c771b65e8b8a4d0b0448ced8da491145>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type mutationsCurrencyUpdateMutation$variables = {
  currency: string;
};
export type mutationsCurrencyUpdateMutation$data = {
  readonly updateAliexpressSettings: {
    readonly success: boolean | null | undefined;
  } | null | undefined;
};
export type mutationsCurrencyUpdateMutation = {
  response: mutationsCurrencyUpdateMutation$data;
  variables: mutationsCurrencyUpdateMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "currency"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "currency",
        "variableName": "currency"
      }
    ],
    "concreteType": "UpdateAliexpressSettingsResponse",
    "kind": "LinkedField",
    "name": "updateAliexpressSettings",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "success",
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
    "name": "mutationsCurrencyUpdateMutation",
    "selections": (v1/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "mutationsCurrencyUpdateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "0d9bc342021cf337a60a87f89b99018f",
    "id": null,
    "metadata": {},
    "name": "mutationsCurrencyUpdateMutation",
    "operationKind": "mutation",
    "text": "mutation mutationsCurrencyUpdateMutation(\n  $currency: String!\n) {\n  updateAliexpressSettings(currency: $currency) {\n    success\n  }\n}\n"
  }
};
})();

(node as any).hash = "b66d48b3fdb487b8697534bce1daa6d4";

export default node;
