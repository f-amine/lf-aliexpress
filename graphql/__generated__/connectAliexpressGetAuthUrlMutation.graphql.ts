/**
 * @generated SignedSource<<ef36df5c0fea8ae3280dc40e26953add>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type connectAliexpressGetAuthUrlMutation$variables = Record<PropertyKey, never>;
export type connectAliexpressGetAuthUrlMutation$data = {
  readonly getAliexpressAuthUrl: {
    readonly authorizationUrl: string | null | undefined;
  } | null | undefined;
};
export type connectAliexpressGetAuthUrlMutation = {
  response: connectAliexpressGetAuthUrlMutation$data;
  variables: connectAliexpressGetAuthUrlMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "AliexpressAuthUrlResponse",
    "kind": "LinkedField",
    "name": "getAliexpressAuthUrl",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "authorizationUrl",
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
    "name": "connectAliexpressGetAuthUrlMutation",
    "selections": (v0/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "connectAliexpressGetAuthUrlMutation",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "d97ebd2a2645fc1e98dc1c14e7c9603c",
    "id": null,
    "metadata": {},
    "name": "connectAliexpressGetAuthUrlMutation",
    "operationKind": "mutation",
    "text": "mutation connectAliexpressGetAuthUrlMutation {\n  getAliexpressAuthUrl {\n    authorizationUrl\n  }\n}\n"
  }
};
})();

(node as any).hash = "c765396411665de5b327091591f24422";

export default node;
