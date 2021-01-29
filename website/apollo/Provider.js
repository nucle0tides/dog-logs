import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './client';

const Provider = ({ children }) => (
  <ApolloProvider client={client}>
    {children}
  </ApolloProvider>
);

export default Provider;
