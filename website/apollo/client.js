import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  // obv don't hardcode this if you ever deploy this for real
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

export default client;
