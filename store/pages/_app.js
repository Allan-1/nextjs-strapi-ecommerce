import '../styles/globals.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import AppBar from '../components/appbar';
import CartProvider from '../context/CartContext';

const client = new ApolloClient({
  uri: 'http://localhost:1337/graphql/',
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <ApolloProvider client={client}>
      <CartProvider>
        <AppBar>
          <Component {...pageProps} />
        </AppBar>
      </CartProvider>
    </ApolloProvider>
  );
}

export default MyApp;
