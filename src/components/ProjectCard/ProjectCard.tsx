import Link from 'next/link';
import { Avatar, Flex, Text } from '@chakra-ui/react';
import Project from '@/types/project';

type Props = {
  readonly project: Project;
};

const ProjectCard = ({ project }: Props) => (
  <Link href={`/projects/${project.id}`}>
    <Flex direction="column" align="center" bg="white" p={4} borderRadius={4}>
      <Avatar size="md" name={project.name} src="https://bit.ly/tioluwani-kolawole" />
      <Text fontSize={18}>{project.name}</Text>
      <Text fontSize={18}>{project.author.username}</Text>
    </Flex>
  </Link>
);

export default ProjectCard;
