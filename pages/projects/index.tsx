import Layout from '@/components/Layout/Layout';
import { VStack } from '@chakra-ui/react';
import Project from '@/types/project';
import { server } from '../../config';
import ProjectsHeader from '@/components/ProjectsHeader/ProjectsHeader';
import ProjectList from '@/components/ProjectList/ProjectList';

type Props = {
  readonly projects: Project[];
};

const ProjectsPage = ({ projects }: Props) => {
  return (
    <Layout title="Projects">
      <VStack spacing={4} align="left">
        <ProjectsHeader projectCount={projects.length} />
        <ProjectList projects={projects} />
      </VStack>
    </Layout>
  );
};

export async function getServerSideProps() {
  const res = await fetch(`${server}/api/projects`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();

  if (!data && !data.projects) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      projects: data.projects,
    },
  };
}

export default ProjectsPage;
