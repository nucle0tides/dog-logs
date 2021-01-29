import { ApolloServer, gql } from 'apollo-server-express';
import FitBarkAPI from './sources/fitBark';
import context from './context';
import schema from './schema';

const server = new ApolloServer({
  schema,
  dataSources: () => ({
    fitBarkAPI: new FitBarkAPI(),
  }),
  context,
});

export default server;
