import { ReactNode } from 'react';
import Head from 'next/head';
import NavBar from '../NavBar/NavBar';
import { Flex, VStack } from '@chakra-ui/react';
import Header from '../Header/Header';

type Props = {
  readonly title?: string;
  readonly description?: string;
  readonly children: ReactNode;
};

const Layout = ({ title, description, children }: Props) => (
  <>
    <Head>
      <title>{title ? `Devign - ${title}` : 'Devign'}</title>
      <meta name="description" content={description || 'Website deving'} />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Flex direction="row" bg="gray.100" w="100%" h="100%">
      <NavBar />

      <VStack spacing={4} p={6} w="100%" align="left">
        <Header />
        {children}
      </VStack>
    </Flex>
  </>
);

export default Layout;
