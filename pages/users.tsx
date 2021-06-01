import Layout from '../src/components/Layout/Layout';
import { VStack } from '@chakra-ui/react';
import User from '../types/user';
import { server } from '../config';
import UserList from '../src/components/UserList/UserList';
import UsersHeader from '../src/components/UsersHeader/UsersHeader';

type Props = {
  readonly users: User[];
};

const UsersPage = ({ users }: Props) => (
  <Layout title="Users">
    <VStack spacing={4} align="left">
      <UsersHeader userCount={users.length} />
      <UserList users={users} />
    </VStack>
  </Layout>
);

export async function getServerSideProps() {
  const res = await fetch(`${server}/api/users`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();

  if (!data && !data.users) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      users: data.users,
    },
  };
}

export default UsersPage;
