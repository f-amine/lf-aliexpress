/**
 * @generated SignedSource<<c1a1299e10f87a9d62307c2b25ad1650>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type queriesConnectionStatusQuery$variables = Record<PropertyKey, never>;
export type queriesConnectionStatusQuery$data = {
  readonly connectionStatus: {
    readonly aliexpress: {
      readonly connected: boolean;
      readonly currency: string | null | undefined;
      readonly language: string | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type queriesConnectionStatusQuery = {
  response: queriesConnectionStatusQuery$data;
  variables: queriesConnectionStatusQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "ConnectionStatus",
    "kind": "LinkedField",
    "name": "connectionStatus",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "AliexpressConnectionStatus",
        "kind": "LinkedField",
        "name": "aliexpress",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "connected",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "currency",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "language",
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
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "queriesConnectionStatusQuery",
    "selections": (v0/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "queriesConnectionStatusQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "aa38a218c1a9ded1095f3d5ec40f17f7",
    "id": null,
    "metadata": {},
    "name": "queriesConnectionStatusQuery",
    "operationKind": "query",
    "text": "query queriesConnectionStatusQuery {\n  connectionStatus {\n    aliexpress {\n      connected\n      currency\n      language\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "6750d7bb4fdc43eba5dd0dc8a799db1b";

export default node;
