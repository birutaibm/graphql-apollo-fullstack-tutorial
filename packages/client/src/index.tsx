import {
  ApolloClient,
  NormalizedCacheObject,
  ApolloProvider,
  HttpLink,
  gql,
  useQuery,
} from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom';

import cache from './cache';
import { typeDefs, resolvers } from './resolvers';
import Pages from './pages';
import Login from './pages/login';
import injectStyles from './styles';

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
  resolvers,
});

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

function HomePage() {
  const { data } = useQuery(IS_LOGGED_IN);
  return data.isLoggedIn ? <Pages /> : <Login />;
}

injectStyles();
ReactDOM.render(
  <ApolloProvider client={client}>
    <HomePage />
  </ApolloProvider>,
  document.getElementById('root')
);
