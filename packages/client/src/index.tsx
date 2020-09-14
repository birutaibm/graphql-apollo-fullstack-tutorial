import {
  ApolloClient,
  NormalizedCacheObject,
  ApolloProvider,
  HttpLink,
} from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom';

import cache from './cache';
import Pages from './pages';
import injectStyles from './styles';

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: 'http://localhost:4000/',
    headers: {
      authorization: localStorage.getItem('token'),
    },
  }),
});

injectStyles();
ReactDOM.render(
  <ApolloProvider client={client}>
    <Pages />
  </ApolloProvider>,
  document.getElementById('root')
);
