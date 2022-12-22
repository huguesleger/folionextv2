import { GraphQLClient } from "graphql-request";

export function request(query: string, variables?: any, preview?: boolean) {
  const endpoint = preview
    ? `https://graphql.datocms.com/preview`
    : `https://graphql.datocms.com/`;
  const client = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ce7a2e27926f3f19af073bb8d62868`,
    },
  });
  return client.request(query, variables);
}
