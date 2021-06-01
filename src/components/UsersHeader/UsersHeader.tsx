import { Heading, Flex, Text, HStack, Input } from '@chakra-ui/react';
import UsersFilter from '../UsersFilter/UsersFilter';

type Props = {
  readonly userCount: number;
};

const UsersHeader = ({ userCount }: Props) => (
  <Flex direction="row" justify="space-between" align="center">
    <HStack spacing={2}>
      <Heading as="h2" fontSize={24}>
        Users
        <Text as="span" color="gray.300" fontWeight="normal" fontSize={16}>
          {`(${userCount})`}
        </Text>
      </Heading>

      <UsersFilter />
    </HStack>

    <Input placeholder="Search someting…" size="sm" maxWidth="350px" />
  </Flex>
);

export default UsersHeader;
