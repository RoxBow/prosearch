import { Heading, Flex, Text, HStack, Button, Input, useDisclosure } from '@chakra-ui/react';
import ModalCreateProject from '../ModalCreateProject/ModalCreateProject';
import useUser from '@/hooks/useUser';

type Props = {
  readonly projectCount: number;
};

const ProjectsHeader = ({ projectCount }: Props) => {
  const [user] = useUser();

  return (
    <Flex direction="row" justify="space-between" align="center">
      <HStack spacing={2}>
        <Heading as="h2" fontSize={24}>
          Projects
          <Text as="span" color="gray.300" fontWeight="normal" fontSize={16}>
            {`(${projectCount})`}
          </Text>
        </Heading>
        {user && <ModalCreateProject />}
      </HStack>

      <Input placeholder="Search project…" size="sm" maxWidth="350px" />
    </Flex>
  );
};

export default ProjectsHeader;
