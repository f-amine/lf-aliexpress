/**
 * @generated SignedSource<<6e3071b07042d5ac92b3d6e92d34bb74>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type mutationsDisconnectAliexpressMutation$variables = Record<PropertyKey, never>;
export type mutationsDisconnectAliexpressMutation$data = {
  readonly disconnectAliexpress: {
    readonly success: boolean | null | undefined;
  } | null | undefined;
};
export type mutationsDisconnectAliexpressMutation = {
  response: mutationsDisconnectAliexpressMutation$data;
  variables: mutationsDisconnectAliexpressMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "DisconnectAliexpressResponse",
    "kind": "LinkedField",
    "name": "disconnectAliexpress",
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
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "mutationsDisconnectAliexpressMutation",
    "selections": (v0/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "mutationsDisconnectAliexpressMutation",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "21662312cf39b6996c1ba53119ae872d",
    "id": null,
    "metadata": {},
    "name": "mutationsDisconnectAliexpressMutation",
    "operationKind": "mutation",
    "text": "mutation mutationsDisconnectAliexpressMutation {\n  disconnectAliexpress {\n    success\n  }\n}\n"
  }
};
})();

(node as any).hash = "c63990fa1ed3184f6e344bad7ef3771a";

export default node;
