import { ChakraProvider } from '@chakra-ui/react';
import '../styles/globals.css';

const App = ({ Component, pageProps }) => (
  <ChakraProvider>
    <Component {...pageProps} />
  </ChakraProvider>
);

export default App;
