import { graphql } from "relay-runtime";

export const UPDATE_CURRENCY_MUTATION = graphql`
  mutation mutationsCurrencyUpdateMutation($currency: String!) {
    updateAliexpressSettings(currency: $currency) {
      success
    }
  }
`;

export const UPDATE_LANGUAGE_MUTATION = graphql`
  mutation mutationsLanguageUpdateMutation($language: String!) {
    updateAliexpressSettings(language: $language) {
      success
    }
  }
`;


export const DISCONNECT_MUTATION = graphql`
  mutation mutationsDisconnectAliexpressMutation {
    disconnectAliexpress {
      success
    }
  }
`;

export const FAVORITE_PRODUCT_MUTATION = graphql`
  mutation mutationsFavoriteProductMutation($aliexpressItemId: String!, $productData: String!) {
    favoriteProduct(aliexpressItemId: $aliexpressItemId, productData: $productData) {
      success
      error
      product {
        id
        title
        imageUrl
        price
        salePrice
      }
    }
  }
`;

export const UNFAVORITE_PRODUCT_MUTATION = graphql`
  mutation mutationsUnfavoriteProductMutation($aliexpressItemId: String!) {
    unfavoriteProduct(aliexpressItemId: $aliexpressItemId) {
      success
      error
    }
  }
`;


export const IMPORT_PRODUCT_TO_LIGHTFUNNELS = graphql`
  mutation mutationsImportProductToLightfunnelsMutation(
    $productData: ProductDataInput!,
    $options: ProductImportOptionsInput!
  ) {
    importProductToLightfunnels(
      productData: $productData,
      options: $options
    ) {
      success
      productId
      error
    }
  }
`;
