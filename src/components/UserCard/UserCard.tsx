import { Avatar, Flex, Text } from '@chakra-ui/react';
import User from '../../../types/user';

type Props = {
  readonly user: User;
};

const UserCard = ({ user }: Props) => (
  <Flex direction="column" align="center" bg="white" p={4} borderRadius={4}>
    <Avatar size="md" name={user.username} src="https://bit.ly/tioluwani-kolawole" />
    <Text fontSize={18}>{user.username}</Text>
  </Flex>
);

export default UserCard;
