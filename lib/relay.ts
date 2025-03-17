// lib/relay.ts
import { Environment, Network, RecordSource, Store, RequestParameters, Variables } from 'relay-runtime';

async function fetchGraphQL(operation: RequestParameters, variables: Variables) {
  // Determine the full URL based on environment
  const baseUrl = typeof window === 'undefined' 
    ? process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000' // Server-side
    : ''; // Client-side uses relative URL
  
  const url = `${baseUrl}/api`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  });

  const json = await response.json();

  if (json.errors) {
    console.error('Error from GraphQL server:', json.errors);
  }

  return json;
}

// Create a relay environment factory function
function createRelayEnvironment() {
  return new Environment({
    network: Network.create(fetchGraphQL),
    store: new Store(new RecordSource()),
  });
}

// Create or get environment depending on client/server context
let relayEnvironment: Environment;

export function getRelayEnvironment() {
  // For SSR, always create a new environment
  if (typeof window === 'undefined') {
    return createRelayEnvironment();
  }
  
  // Create the environment once in the client
  if (!relayEnvironment) {
    relayEnvironment = createRelayEnvironment();
  }

  return relayEnvironment;
}

export default getRelayEnvironment();
