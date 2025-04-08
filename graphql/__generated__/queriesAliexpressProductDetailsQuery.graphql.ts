/**
 * @generated SignedSource<<911b777d0fc9d72f806a1a51f74d86e3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type queriesAliexpressProductDetailsQuery$variables = {
  productId: string;
  shipToCountry?: string | null | undefined;
  targetLanguage?: string | null | undefined;
};
export type queriesAliexpressProductDetailsQuery$data = {
  readonly aliexpressProductDetails: {
    readonly request_id: string | null | undefined;
    readonly result: {
      readonly ae_item_base_info_dto: {
        readonly avg_evaluation_rating: string | null | undefined;
        readonly category_id: number | null | undefined;
        readonly currency_code: string | null | undefined;
        readonly detail: string | null | undefined;
        readonly evaluation_count: string | null | undefined;
        readonly mobile_detail: string | null | undefined;
        readonly product_id: number | null | undefined;
        readonly product_status_type: string | null | undefined;
        readonly sales_count: string | null | undefined;
        readonly subject: string | null | undefined;
      } | null | undefined;
      readonly ae_item_properties: {
        readonly ae_item_property: ReadonlyArray<{
          readonly attr_name: string | null | undefined;
          readonly attr_name_id: number | null | undefined;
          readonly attr_value: string | null | undefined;
          readonly attr_value_id: number | null | undefined;
        } | null | undefined> | null | undefined;
      } | null | undefined;
      readonly ae_item_sku_info_dtos: {
        readonly ae_item_sku_info_d_t_o: ReadonlyArray<{
          readonly ae_sku_property_dtos: {
            readonly ae_sku_property_d_t_o: ReadonlyArray<{
              readonly property_value_definition_name: string | null | undefined;
              readonly property_value_id: number | null | undefined;
              readonly sku_image: string | null | undefined;
              readonly sku_property_id: number | null | undefined;
              readonly sku_property_name: string | null | undefined;
              readonly sku_property_value: string | null | undefined;
            } | null | undefined> | null | undefined;
          } | null | undefined;
          readonly currency_code: string | null | undefined;
          readonly id: string | null | undefined;
          readonly ipm_sku_stock: number | null | undefined;
          readonly offer_bulk_sale_price: string | null | undefined;
          readonly offer_sale_price: string | null | undefined;
          readonly price_include_tax: boolean | null | undefined;
          readonly sku_attr: string | null | undefined;
          readonly sku_available_stock: string | null | undefined;
          readonly sku_code: string | null | undefined;
          readonly sku_id: string | null | undefined;
          readonly sku_price: string | null | undefined;
          readonly sku_stock: boolean | null | undefined;
        } | null | undefined> | null | undefined;
      } | null | undefined;
      readonly ae_multimedia_info_dto: {
        readonly ae_video_dtos: {
          readonly ae_video_d_t_o: ReadonlyArray<{
            readonly media_id: string | null | undefined;
            readonly media_status: string | null | undefined;
            readonly media_type: string | null | undefined;
            readonly media_url: string | null | undefined;
            readonly poster_url: string | null | undefined;
          } | null | undefined> | null | undefined;
        } | null | undefined;
        readonly image_urls: string | null | undefined;
      } | null | undefined;
      readonly ae_store_info: {
        readonly communication_rating: string | null | undefined;
        readonly item_as_described_rating: string | null | undefined;
        readonly shipping_speed_rating: string | null | undefined;
        readonly store_country_code: string | null | undefined;
        readonly store_id: number | null | undefined;
        readonly store_name: string | null | undefined;
      } | null | undefined;
      readonly has_whole_sale: boolean | null | undefined;
      readonly logistics_info_dto: {
        readonly delivery_time: number | null | undefined;
        readonly ship_to_country: string | null | undefined;
      } | null | undefined;
      readonly package_info_dto: {
        readonly gross_weight: string | null | undefined;
        readonly package_height: number | null | undefined;
        readonly package_length: number | null | undefined;
        readonly package_type: boolean | null | undefined;
        readonly package_width: number | null | undefined;
        readonly product_unit: number | null | undefined;
      } | null | undefined;
    } | null | undefined;
    readonly rsp_code: number | null | undefined;
    readonly rsp_msg: string | null | undefined;
  } | null | undefined;
};
export type queriesAliexpressProductDetailsQuery = {
  response: queriesAliexpressProductDetailsQuery$data;
  variables: queriesAliexpressProductDetailsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "productId"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "shipToCountry"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "targetLanguage"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "currency_code",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "productId",
        "variableName": "productId"
      },
      {
        "kind": "Variable",
        "name": "shipToCountry",
        "variableName": "shipToCountry"
      },
      {
        "kind": "Variable",
        "name": "targetLanguage",
        "variableName": "targetLanguage"
      }
    ],
    "concreteType": "AliExpressProductDetail",
    "kind": "LinkedField",
    "name": "aliexpressProductDetails",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "AliExpressProductResult",
        "kind": "LinkedField",
        "name": "result",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "AliExpressSkuInfoContainer",
            "kind": "LinkedField",
            "name": "ae_item_sku_info_dtos",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "AliExpressSkuInfo",
                "kind": "LinkedField",
                "name": "ae_item_sku_info_d_t_o",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "sku_attr",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "sku_id",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "offer_sale_price",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "sku_price",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "sku_available_stock",
                    "storageKey": null
                  },
                  (v1/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "ipm_sku_stock",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "sku_stock",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "price_include_tax",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "offer_bulk_sale_price",
                    "storageKey": null
                  },
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
                    "name": "sku_code",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "AliExpressSkuPropertyContainer",
                    "kind": "LinkedField",
                    "name": "ae_sku_property_dtos",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "AliExpressSkuProperty",
                        "kind": "LinkedField",
                        "name": "ae_sku_property_d_t_o",
                        "plural": true,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "sku_property_name",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "sku_property_value",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "property_value_definition_name",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "sku_image",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "property_value_id",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "sku_property_id",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "AliExpressMultimediaInfo",
            "kind": "LinkedField",
            "name": "ae_multimedia_info_dto",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "image_urls",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "AliExpressVideoContainer",
                "kind": "LinkedField",
                "name": "ae_video_dtos",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "AliExpressVideoInfo",
                    "kind": "LinkedField",
                    "name": "ae_video_d_t_o",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "media_url",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "poster_url",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "media_status",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "media_type",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "media_id",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "AliExpressItemBaseInfo",
            "kind": "LinkedField",
            "name": "ae_item_base_info_dto",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "subject",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "detail",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "mobile_detail",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "category_id",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "product_id",
                "storageKey": null
              },
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "sales_count",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "avg_evaluation_rating",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "evaluation_count",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "product_status_type",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "AliExpressItemPropertyContainer",
            "kind": "LinkedField",
            "name": "ae_item_properties",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "AliExpressItemProperty",
                "kind": "LinkedField",
                "name": "ae_item_property",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "attr_name_id",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "attr_value_id",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "attr_name",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "attr_value",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "AliExpressPackageInfo",
            "kind": "LinkedField",
            "name": "package_info_dto",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "package_width",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "package_height",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "package_length",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "gross_weight",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "package_type",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "product_unit",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "AliExpressLogisticsInfo",
            "kind": "LinkedField",
            "name": "logistics_info_dto",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "delivery_time",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "ship_to_country",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "AliExpressStoreInfo",
            "kind": "LinkedField",
            "name": "ae_store_info",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "store_id",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "shipping_speed_rating",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "communication_rating",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "store_name",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "store_country_code",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "item_as_described_rating",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "has_whole_sale",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "rsp_code",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "rsp_msg",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "request_id",
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
    "name": "queriesAliexpressProductDetailsQuery",
    "selections": (v2/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "queriesAliexpressProductDetailsQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "e8dcb1dbe805c44da68b0427039d9d81",
    "id": null,
    "metadata": {},
    "name": "queriesAliexpressProductDetailsQuery",
    "operationKind": "query",
    "text": "query queriesAliexpressProductDetailsQuery(\n  $productId: String!\n  $shipToCountry: String\n  $targetLanguage: String\n) {\n  aliexpressProductDetails(productId: $productId, shipToCountry: $shipToCountry, targetLanguage: $targetLanguage) {\n    result {\n      ae_item_sku_info_dtos {\n        ae_item_sku_info_d_t_o {\n          sku_attr\n          sku_id\n          offer_sale_price\n          sku_price\n          sku_available_stock\n          currency_code\n          ipm_sku_stock\n          sku_stock\n          price_include_tax\n          offer_bulk_sale_price\n          id\n          sku_code\n          ae_sku_property_dtos {\n            ae_sku_property_d_t_o {\n              sku_property_name\n              sku_property_value\n              property_value_definition_name\n              sku_image\n              property_value_id\n              sku_property_id\n            }\n          }\n        }\n      }\n      ae_multimedia_info_dto {\n        image_urls\n        ae_video_dtos {\n          ae_video_d_t_o {\n            media_url\n            poster_url\n            media_status\n            media_type\n            media_id\n          }\n        }\n      }\n      ae_item_base_info_dto {\n        subject\n        detail\n        mobile_detail\n        category_id\n        product_id\n        currency_code\n        sales_count\n        avg_evaluation_rating\n        evaluation_count\n        product_status_type\n      }\n      ae_item_properties {\n        ae_item_property {\n          attr_name_id\n          attr_value_id\n          attr_name\n          attr_value\n        }\n      }\n      package_info_dto {\n        package_width\n        package_height\n        package_length\n        gross_weight\n        package_type\n        product_unit\n      }\n      logistics_info_dto {\n        delivery_time\n        ship_to_country\n      }\n      ae_store_info {\n        store_id\n        shipping_speed_rating\n        communication_rating\n        store_name\n        store_country_code\n        item_as_described_rating\n      }\n      has_whole_sale\n    }\n    rsp_code\n    rsp_msg\n    request_id\n  }\n}\n"
  }
};
})();

(node as any).hash = "6f5f00c0c23e21abbbdb51841797ede4";

export default node;
