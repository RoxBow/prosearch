import { useEffect } from 'react';
import Router from 'next/router';
import Layout from '../src/components/Layout/Layout';
import useUser from '../hooks/useUser';
import { Flex, Image, Text } from '@chakra-ui/react';

const Profile = () => {
  const [user, { loading }] = useUser();

  useEffect(() => {
    if (!user && !loading) {
      Router.push('/');
    }
  }, [user]);

  if (loading) return <p>Loading…</p>;

  return (
    <Layout title="Profile">
      <Flex direction="column" align="center">
        <Image
          boxSize="160px"
          objectFit="cover"
          src="https://bit.ly/sage-adebayo"
          alt="Segun Adebayo"
          borderRadius="full"
        />
        <Text fontWeight="bold">{user.username}</Text>
      </Flex>
    </Layout>
  );
};

export default Profile;
