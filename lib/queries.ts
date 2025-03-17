// lib/queries.ts
import { graphql } from 'relay-runtime';

export const CONNECTION_STATUS_QUERY = graphql`
  query queriesConnectionStatusQuery {
    connectionStatus {
      aliexpress {
        connected
        currency
        language
      }
    }
  }
`;
