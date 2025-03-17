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
