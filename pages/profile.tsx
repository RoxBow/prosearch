import Layout from '../src/components/Layout/Layout';
import useUser from '../hooks/useUser';
import { Flex, Image, Text } from '@chakra-ui/react';

const Profile = () => {
  const [user] = useUser();

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
