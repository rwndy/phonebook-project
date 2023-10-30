import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://wpe-hiring.tokopedia.net/graphql',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
},
  cache: new InMemoryCache(),
});

export default client;
