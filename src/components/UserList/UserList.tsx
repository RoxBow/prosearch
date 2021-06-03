import User from '../../../types/user';
import UserCard from '../UserCard/UserCard';
import { HStack } from '@chakra-ui/react';

type Props = {
  readonly users: User[];
};

const UserList = ({ users }: Props) => {
  return (
    <HStack spacing={4}>
      {users.map(user => (
        <UserCard user={user} key={user._id} />
      ))}
    </HStack>
  );
};

export default UserList;
