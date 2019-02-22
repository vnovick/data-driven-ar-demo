import React from 'react';
import RootNavigator from './src/navigation/rootNavigator';
import ApolloClient from 'apollo-client';
import {ApolloProvider} from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink, concat } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { getMainDefinition } from 'apollo-utilities';
import { split } from 'apollo-link';

const GRAPHQL_ENDPOINT = "https://hackathon-ar-app.herokuapp.com/v1alpha1/graphql"


const mkWsLink = (uri) => {
  const splitUri = uri.split('//');
  const subClient = new SubscriptionClient(
    'wss://' + splitUri[1],
    { reconnect: true }
  );
  return new WebSocketLink(subClient);
}


const wsLink = mkWsLink(GRAPHQL_ENDPOINT)
const httpLink = new HttpLink({ uri: GRAPHQL_ENDPOINT });
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink
);

// Creating a client instance
const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    addTypename: false
  })
});

//Export the TodoApp component wrapped inside ApolloProvider
export default class AppScreen extends React.Component {
  render() {
    return(
      <ApolloProvider client={client}>
        <RootNavigator
          client={client}
          session={this.props.sessionInfo}
        />
      </ApolloProvider>
    )
  }
}