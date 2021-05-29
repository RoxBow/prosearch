import { ReactNode } from 'react';
import Head from 'next/head';
import NavBar from '../NavBar/NavBar';

type Props = {
  title?: string;
  description?: string;
  children: ReactNode;
};

const Layout = ({ title, description, children }: Props) => (
  <>
    <Head>
      <title>{title ? `Devign - ${title}` : 'Devign'}</title>
      <meta name="description" content={description || 'Website deving'} />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <NavBar />

    {children}
  </>
);

export default Layout;
