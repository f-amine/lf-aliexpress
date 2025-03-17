/**
 * @generated SignedSource<<ccfece4de8f324c2bcbcc94ad68fb4fa>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type mutationsLanguageUpdateMutation$variables = {
  language: string;
};
export type mutationsLanguageUpdateMutation$data = {
  readonly updateAliexpressSettings: {
    readonly success: boolean | null | undefined;
  } | null | undefined;
};
export type mutationsLanguageUpdateMutation = {
  response: mutationsLanguageUpdateMutation$data;
  variables: mutationsLanguageUpdateMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "language"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "language",
        "variableName": "language"
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
    "name": "mutationsLanguageUpdateMutation",
    "selections": (v1/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "mutationsLanguageUpdateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "2fde2dfeec0e5f6bce6c0d78b44b9041",
    "id": null,
    "metadata": {},
    "name": "mutationsLanguageUpdateMutation",
    "operationKind": "mutation",
    "text": "mutation mutationsLanguageUpdateMutation(\n  $language: String!\n) {\n  updateAliexpressSettings(language: $language) {\n    success\n  }\n}\n"
  }
};
})();

(node as any).hash = "3ffeaa5cee57d2c8c800a5449c871a56";

export default node;
