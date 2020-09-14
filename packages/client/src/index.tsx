import {
  ApolloClient,
  NormalizedCacheObject,
  ApolloProvider,
  HttpLink,
  gql,
} from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom';

import cache from './cache';
import Pages from './pages';
import injectStyles from './styles';

const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }
`;

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: 'http://localhost:4000/',
    headers: {
      authorization: localStorage.getItem('token') || '',
      'client-name': 'Space Explorer [web]',
      'client-version': '1.0.0',
    },
  }),
  typeDefs,
});

injectStyles();
ReactDOM.render(
  <ApolloProvider client={client}>
    <Pages />
  </ApolloProvider>,
  document.getElementById('root')
);
