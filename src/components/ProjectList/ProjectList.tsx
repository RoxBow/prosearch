import Project from '@/types/project';
import { HStack } from '@chakra-ui/react';
import ProjectCard from '../ProjectCard/ProjectCard';

type Props = {
  readonly projects: Project[];
};

const ProjectList = ({ projects }: Props) => {
  return (
    <HStack spacing={4}>
      {projects.map(project => (
        <ProjectCard project={project} key={project._id} />
      ))}
    </HStack>
  );
};

export default ProjectList;
